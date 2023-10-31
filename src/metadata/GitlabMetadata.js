import {
  ComponentDefinition,
  ComponentAttributeDefinition,
  DefaultMetadata,
} from 'leto-modelizer-plugin-core';
import metadata from 'src/assets/metadata/gitlab-ci.json';

/*
 * Metadata is used to generate definition of Component and ComponentAttribute.
 *
 * In our plugin managing Terraform, we use [Ajv](https://ajv.js.org/) to validate metadata.
 * And we provide a `metadata.json` to define all metadata.
 *
 * Feel free to manage your metadata as you wish.
 */
class GitlabMetadata extends DefaultMetadata {
  /**
   * Validate the provided metadata with a schemas.
   * @returns {boolean} True if metadata is valid.
   */
  /**
   * Parse all component definitions from metadata.
   */
  parse() {
    const componentDefs = metadata.map(this.getComponentDefinition, this);
    this.setChildrenTypes(componentDefs);
    this.pluginData.definitions.components = componentDefs;
  }

  /**
   * Convert a JSON component definition object to a ComponentDefinition.
   * @param {object} component - JSON component definition object to parse.
   * @returns {ComponentDefinition} Parsed component definition.
   */

  getComponentDefinition(component) {
    const { attributes } = component;
    return new ComponentDefinition({
      ...component,
      definedAttributes: attributes.map(this.getAttributeDefinition, this),
    });
  }

  /**
   * Convert a JSON attribute object to a ComponentAttributeDefinition.
   * @param {object} attribute - JSON attribute definition object to parse.
   * @returns {ComponentAttributeDefinition} Parsed attribute definition.
   */
  getAttributeDefinition(attribute) {
    const subAttributes = attribute.attributes || [];
    const attributeDef = new ComponentAttributeDefinition({
      ...attribute,
      definedAttributes: subAttributes.map(this.getAttributeDefinition, this),
    });
    attributeDef.displayType = attribute.displayType || null;
    attributeDef.expanded = attribute.expanded || false;
    return attributeDef;
  }

  /**
   * Set the childrenTypes of all containers from children's parentType.
   * @param {ComponentDefinition[]} componentDefinitions - Array of component definitions.
   */
  setChildrenTypes(componentDefinitions) {
    const children = componentDefinitions
      .filter((def) => def.parentTypes.length > 0)
      .reduce((acc, def) => {
        def.parentTypes.forEach((parentType) => {
          acc[parentType] = [...(acc[parentType] || []), def.type];
        });
        return acc;
      }, {});
    componentDefinitions.filter((def) => children[def.type])
      .forEach((def) => {
        def.childrenTypes = children[def.type];
      });
  }
}
export default GitlabMetadata;
