import { DefaultRender, FileInput } from 'leto-modelizer-plugin-core';
import nunjucks from 'nunjucks';
import templates from 'src/render/GitlabTemplate';

/**
 * Class to render Gitlab ci/cd files from components.
 */
class GitalbPluginRenderer extends DefaultRender {
  /**
   * Default constructor, initialize nunjucks library and template.
   * @param {object} pluginData - Plugin data with components
   */
  constructor(pluginData) {
    super(pluginData);

    const Loader = nunjucks.Loader.extend({
    });
    const env = new nunjucks.Environment(new Loader(), {
      autoescape: false,
      trimBlocks: true,
      lstripBlocks: true,
    });
    this.template = nunjucks.compile(templates.root, env);
  }

  /**
   * Convert all provided components and links in Gitlab ci/cd files.
   * @returns {FileInput[]} Array of generated files from components and links.
   */
  renderFiles() {
    return this.generateFilesFromComponentsMap(
      this.pluginData.components.reduce(
        (map, component) => {
          if (!map.has(component.path)) {
            map.set(component.path, [component]);
          } else {
            map.get(component.path).push(component);
          }

          return map;
        },
        new Map(),
      ),
    );
  }

  /**
   * Render files from related components.
   * @param {Map<string,Component>} map - Component mapped by file name.
   * @param {string} [parentEventId=null] - Parent event id.
   * @returns {FileInput[]} Render files array.
   */
  generateFilesFromComponentsMap(map, parentEventId = null) {
    const files = [];

    map.forEach((components, path) => {
      const id = this.pluginData.emitEvent({
        parent: parentEventId,
        type: 'Render',
        action: 'write',
        status: 'running',
        files: [path],
        data: {
          global: false,
        },
      });
      const gitlabCi = components.find(({ definition }) => definition.type === 'gitlabCi');
      const jobCi = components.filter(({ definition }) => definition.type === 'jobCi');
      let stages = 0;
      for (let i = 0; i < jobCi.length; i += 1) {
        stages += jobCi[i].attributes.filter((attr) => attr.name === 'stage').length > 0;
      }
      const service = components.filter(({ definition }) => definition.type === 'service');
      const content = `${this.template.render({
        gitlabCi,
        gitlabCiName: gitlabCi?.attributes.find(({ name }) => name === 'name'),
        gitlabCiVariables: gitlabCi?.attributes.find(({ name }) => name === 'variables'),
        gitlabCiStages: gitlabCi?.attributes.find(({ name }) => name === 'stages'),
        service,
        jobCi,
        stages,
        getAttributes: (component) => component.attributes.filter(({ name }) => name !== 'gitlabCi_id'),
      }).trim()}\n`;
      files.push(new FileInput({
        path,
        content,
      }));

      this.pluginData.emitEvent({ id, status: 'success' });
    });

    return files;
  }
}

export default GitalbPluginRenderer;
