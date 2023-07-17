import Plugin from 'src/index';

describe('Test index of project', () => {
  it('should return GitlabPlugin', () => {
    expect(new Plugin().constructor.name).toEqual('GitlabPlugin');
  });
});
