import GitlabPlugin from 'src/index';

describe('Test index of project', () => {
  it('Should return GitlabPlugin', () => {
    expect(new GitlabPlugin().constructor.name).toEqual('GitlabPlugin');
  });
});
