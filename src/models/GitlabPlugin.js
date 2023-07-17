import {
  DefaultPlugin,
  DefaultData,
} from 'leto-modelizer-plugin-core';
import GitlabDrawer from 'src/draw/GitlabDrawer';
import GitlabMetadata from 'src/metadata/GitlabMetadata';
import GitlabParser from 'src/parser/GitlabParser';
import GitlabRenderer from 'src/render/GitlabRenderer';
import GitlabConfiguration from 'src/models/GitlabConfiguration';
import packageInfo from 'package.json';

/**
 * Gitlab plugin.
 */
class GitlabPlugin extends DefaultPlugin {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   * @param {object} [props.event] - Event manager.
   * @param {Function} [props.event.next] - Function to emit event.
   */
  constructor(props = {
    event: null,
  }) {
    const configuration = new GitlabConfiguration();
    const pluginData = new DefaultData(configuration, {
      name: packageInfo.name,
      version: packageInfo.version,
    }, props.event);

    super({
      pluginData,
      pluginDrawer: new GitlabDrawer(pluginData),
      pluginMetadata: new GitlabMetadata(pluginData),
      pluginParser: new GitlabParser(pluginData),
      pluginRenderer: new GitlabRenderer(pluginData),
      configuration,
    });
  }
}

export default GitlabPlugin;
