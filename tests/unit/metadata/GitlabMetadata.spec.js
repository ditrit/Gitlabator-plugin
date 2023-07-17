import GitlabMetadata from 'src/metadata/GitlabMetadata';
import { DefaultData } from 'leto-modelizer-plugin-core';

describe('Test class: GitlabMetadata', () => {
  describe('Test method: validate', () => {
    it('should return true', () => {
      expect(new GitlabMetadata().validate()).toEqual(true);
    });
  });

  describe('Test method: parse', () => {
    it('should set components definitions to empty array', () => {
      const pluginData = new DefaultData();
      pluginData.definitions.components = ['a'];

      new GitlabMetadata(pluginData).parse();

      expect(pluginData.definitions.components).toEqual([]);
    });
  });
});
