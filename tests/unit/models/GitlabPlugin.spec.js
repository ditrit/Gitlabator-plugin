import GitlabPlugin from 'src/models/GitlabPlugin';

describe('Test class: GitlabatorPlugin', () => {
  describe('Test constructor', () => {
    it('Check variable initialization', () => {
      const plugin = new GitlabPlugin();

      expect(plugin.data).not.toBeNull();
      expect(plugin.__drawer).not.toBeNull();
      expect(plugin.__parser).not.toBeNull();
      expect(plugin.__metadata).not.toBeNull();
      expect(plugin.__renderer).not.toBeNull();
    });
  });
});
