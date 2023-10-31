import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';

/**
 * Lidy listener for Gitlab files.
 */
class GitlabListener {
  /**
   * Default constructor.
   * @param {FileInformation} fileInformation - File information.
   * @param {ComponentDefinition[]} definitions - All component definitions.
   * @param {string} gitlabCiId - gitlabCi id.
   */
  constructor(fileInformation, definitions, gitlabCiId) {
    /**
     * File information.
     * @type {FileInformation}
     */
    this.fileInformation = fileInformation;
    /**
     * Array of component definitions.
     * @type {ComponentDefinition[]}
     */
    this.definitions = definitions;
    /**
     * Parsed components.
     * @type {Component[]}
     */
    this.components = [];
    /**
     * Current gitlab_ci.
     * @type {Component}
     */
    this.gitlabCi = null;
    /**
     * gitlab_ci id.
     * @type {string}
     */
    this.gitlabCiId = gitlabCiId;
    /**
     * Current jobCi.
     * @type {Component}
     */
    this.JobCi = null;
    /**
     * Current service.
     * @type {Component}
     */
    this.service = null;
  }

  /**
   * Create component except gitlabCi type component.
   * @param {string} id - Component id.
   * @param {ComponentDefinition} definition -  Component definition.
   * @param {ComponentAttribute[]} [attributes] - Component attributes.
   * @returns {Component} Created component with default attribute(s) and properties.
   */
  createComponent(id, definition, attributes) {
    return new Component({
      id,
      definition,
      path: this.fileInformation.path,
      attributes,
    });
  }

  /**
   * Create gitlabCi component .
   */

  enter_gitlabCi() {
    this.gitlabCi = new Component({
      id: this.gitlabCiId,
      definition: this.definitions.find(({ type }) => type === 'gitlabCi'),
      path: this.fileInformation.path,
    });
    this.components.push(this.gitlabCi);
  }

  /**
   * Enter gitlabCi Tags attribute.
   * @param {object} ctx
   */

  enter_gitlabCiTags(ctx) {
    this.gitlabCi.attributes.push(new ComponentAttribute({
      name: 'tags',
      value: ctx.items.map(({ value }) => value),
      type: 'Array',
      definition: this.gitlabCi.definition.definedAttributes.find(({ name }) => name === 'tags'),
    }));
  }

  /**
   * Enter gitlabCi stages attribute.
   * @param {object} ctx
   */

  enter_gitlabCiStages(ctx) {
    this.gitlabCi.attributes.push(new ComponentAttribute({
      name: 'stages',
      value: ctx.items.map(({ value }) => value),
      type: 'Array',
      definition: this.gitlabCi.definition.definedAttributes.find(({ name }) => name === 'stages'),
    }));
  }

  /**
   * Enter gitlabCi Variables attributes.
   * @param {object} ctx
   */

  enter_gitlabCiVariables(ctx) {
    this.gitlabCi.attributes.push(new ComponentAttribute({
      name: 'variables',
      value: ctx.items.map((item) => new ComponentAttribute({
        name: item.key.value,
        value: item.value.value,
        type: 'String',
      })),
      type: 'Object',
      definition: this.gitlabCi.definition.definedAttributes.find(({ name }) => name === 'variables'),
    }));
  }

  /**
   * Push gitlabCi name attribute.
   * @param {object} ctx
   */

  exit_gitlabCiName(ctx) {
    this.gitlabCi.name = ctx.current.value;
    this.gitlabCi.attributes.push(new ComponentAttribute({
      name: 'name',
      value: ctx.current.value,
      type: 'String',
      definition: this.gitlabCi.definition.definedAttributes.find(({ name }) => name === 'name'),
    }));
  }

  /**
   * Create service component .
   * @param {object} ctx
   */

  enter_service(ctx) {
    const definition = this.definitions.find(({ type }) => type === 'service');
    const serviceName = ctx.items.find((item) => item.key.value === 'name')?.value.value;
    this.service = this.createComponent(
      serviceName,
      definition,
      [
        new ComponentAttribute({
          name: 'gitlabCi_id',
          value: this.gitlabCiId,
          type: 'String',
          definition: definition.definedAttributes.find(({ name }) => name === 'gitlabCi_id'),
        }),
        new ComponentAttribute({
          name: 'name',
          value: serviceName,
          type: 'String',
          definition: definition.definedAttributes.find(({ name }) => name === 'name'),
        }),
        new ComponentAttribute({
          name: 'alias',
          value: ctx.items.find((item) => item.key.value === 'alias')?.value.value,
          type: 'String',
          definition: definition.definedAttributes.find(({ name }) => name === 'alias'),
        }),
        new ComponentAttribute({
          name: 'entrypoint',
          value: ctx.items.find((item) => item.key.value === 'entrypoint')?.value.value,
          type: 'String',
          definition: definition.definedAttributes.find(({ name }) => name === 'entrypoint'),
        }),
      ],
    );
  }

  /**
   * exit service component .
   */

  exit_service() {
    this.components.push(this.service);
    this.service = null;
  }

  /**
   * Create JobCI component .
   * @param {object} ctx
   */

  enter_jobCiId(ctx) {
    const definition = this.definitions.find(({ type }) => type === 'jobCi');
    this.JobCi = this.createComponent(
      ctx.value,
      definition,
      [
        new ComponentAttribute({
          name: 'gitlabCi_id',
          value: this.gitlabCiId,
          type: 'String',
          definition: definition.definedAttributes.find(({ name }) => name === 'gitlabCi_id'),
        }),
      ],
    );
  }

  /**
   * Push jobCi tags attribute.
   * @param {object} ctx
   */

  enter_jobCiTags(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'tags',
      value: ctx.items.map(({ value }) => value),
      type: 'Array',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'tags'),
    }));
  }

  /**
   * Push jobCi image attribute.
   * @param {object} ctx
   */

  enter_jobCiImage(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'image',
      value: ctx.value,
      type: 'String',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'image'),
    }));
  }

  /**
   * Push jobCi stage attribute.
   * @param {object} ctx
   */

  enter_jobCiStage(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'stage',
      value: ctx.value,
      type: 'String',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'stage'),
    }));
  }

  /**
   * Push jobCi script attribute.
   * @param {object} ctx
   */

  enter_jobCiScript(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'script',
      value: ctx.items.map(({ value }) => value),
      type: 'Array',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'script'),
    }));
  }

  /**
   * Push jobCi Beforescript attribute.
   * @param {object} ctx
   */

  enter_jobCiBeforescript(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'beforescript',
      value: ctx.items.map(({ value }) => value),
      type: 'Array',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'beforescript'),
    }));
  }

  /**
   * Push jobCi Afterscript attribute.
   * @param {object} ctx
   */

  enter_jobCiAfterscript(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'afterscript',
      value: ctx.items.map(({ value }) => value),
      type: 'Array',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'afterscript'),
    }));
  }

  /**
   * Push jobCi only attribute.
   * @param {object} ctx
   */

  enter_jobCiOnly(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'only',
      value: ctx.value,
      type: 'String',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'only'),
    }));
  }

  /**
   * Push jobCi when attribute.
   * @param {object} ctx
   */

  enter_jobCiWhen(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'when',
      value: ctx.value,
      type: 'String',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'when'),
    }));
  }

  /**
   * Push jobCi environnement attribute.
   * @param {object} ctx
   */

  enter_jobCiEnvironment(ctx) {
    this.JobCi.attributes.push(new ComponentAttribute({
      name: 'environment',
      value: ctx.value,
      type: 'String',
      definition: this.JobCi.definition.definedAttributes.find(({ name }) => name === 'environment'),
    }));
  }

  /**
   * exit jobCi component.
   */

  exit_jobCi() {
    this.components.push(this.JobCi);
    this.JobCi = null;
  }
}

export default GitlabListener;
