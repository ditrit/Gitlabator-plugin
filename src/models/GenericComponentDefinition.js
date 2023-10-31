import { ComponentDefinition } from 'leto-modelizer-plugin-core';

/**
 * Generic component definition.
 */
class GenericComponentDefinition extends ComponentDefinition {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   * @param {boolean} [props.available=false] - If this definition is available to be used by end
   * user(s).
   */

  constructor(props = { available: false }) {
    super(props);
    /**
     * If this definition is available to be used by end user(s).
     * @type {boolean}
     */
    this.available = !!props.available;
  }
}

export default GenericComponentDefinition;
