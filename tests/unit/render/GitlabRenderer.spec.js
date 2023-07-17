import GitlabRender from 'src/render/GitlabRenderer';
import { DefaultData } from 'leto-modelizer-plugin-core';

describe('Test GitlabRenderer', () => {
  describe('Test method: renderFiles', () => {
    it('should render an empty array', () => {
      const pluginData = new DefaultData();

      expect(new GitlabRender(pluginData).renderFiles()).toEqual([]);
    });
  });
});
