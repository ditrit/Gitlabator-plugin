import { DefaultConfiguration, Tag } from 'leto-modelizer-plugin-core';

/**
 * Gitlab configuration.
 */
class GitlabConfiguration extends DefaultConfiguration {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   */
  constructor(props) {
    super({
      ...props,
      defaultFileName: '.gitlab-ci.yml',
      defaultFileExtension: 'yml',
      editor: {
        ...props?.editor,
      },
      tags: [
        new Tag({ type: 'language', value: 'Gitlab' }),
        new Tag({ type: 'category', value: 'CI' }),
        new Tag({ type: 'category', value: 'CD' }),
      ],
    });
  }
}

export default GitlabConfiguration;
