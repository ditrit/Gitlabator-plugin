import { DefaultRender } from 'leto-modelizer-plugin-core';

/**
 * Class to render Gitlab files from components/links.
 */
class GitlabRenderer extends DefaultRender {
  /**
   * Convert all provided components and links in Gitlab files.
   * @returns {FileInput[]} Array of generated files from components and links.
   */
  renderFiles() {
    return [];
  }
}

export default GitlabRenderer;
