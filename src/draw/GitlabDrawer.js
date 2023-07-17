import { DefaultDrawer } from 'leto-modelizer-plugin-core';

/**
 * Class to draw Gitlab components.
 */
class GitlabDrawer extends DefaultDrawer {
  /**
   * Default constructor.
   * @param {DefaultData} pluginData - Plugin data storage.
   * @param {object} [resources] - Object that contains resources.
   * @param {string} [rootId] - Id of HTML element where we want to draw.
   * @param {object} [options] - Rendering options.
   * @param {number} [options.minWidth] - Minimum width of a component.
   * @param {number} [options.minHeight] - Minimum height of a component.
   * @param {number} [options.padding] - Padding around a component.
   * @param {number} [options.margin] - Component margin thickness.
   * @param {number[]} [options.lineLengthPerDepth] - Number of components
   * per line at a given depth. Valid values: 1 - Infinity.
   * @param {number} [options.actionMenuButtonSize] - The size of each action menu button.
   */
  constructor(pluginData, resources, rootId, options) {
    super(pluginData, resources, rootId, {
      ...options,
      minHeight: 80,
      minWidth: 110,
      margin: 5,
    });
  }
}

export default GitlabDrawer;
