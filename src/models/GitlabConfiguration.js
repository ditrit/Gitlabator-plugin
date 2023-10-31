/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-restricted-imports */
import { DefaultConfiguration, Tag } from 'leto-modelizer-plugin-core';
import syntax from 'src/configuration/syntax';

/**
 * Gitlabator configuration.
 */
class GitlabConfiguration extends DefaultConfiguration {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   */
  constructor(props) {
    super({
      ...props,
      editor: {
        ...props.editor,
        syntax,
      },
      tags: [
        new Tag({ type: 'language', value: 'Gitlab' }),
        new Tag({ type: 'category', value: 'CI' }),
        new Tag({ type: 'category', value: 'CD' }),
        new Tag({ type: 'category', value: 'Pipeline' }),
      ],
    });
  }
}

export default GitlabConfiguration;
