import GitlabRenderer from 'src/render/GitlabRenderer';
import { DefaultData, FileInput, FileInformation } from 'leto-modelizer-plugin-core';
import fs from 'fs';
import GitlabParser from 'src/parser/GitlabParser';
import GitlabMetadata from 'src/metadata/GitlabMetadata';

describe('Test GitlabMetadata', () => {
  describe('Test method: render', () => {
    it('Should render completeCI', () => {
      const pluginData = new DefaultData();
      const metadata = new GitlabMetadata(pluginData);
      const parser = new GitlabParser(pluginData);
      const render = new GitlabRenderer(pluginData);
      const fileToParse = new FileInput({
        path: './completeCI.yml',
        content: fs.readFileSync('tests/resources/yml/completeCI.yml', 'utf8'),
      });

      metadata.parse();
      parser.parse(new FileInformation({ path: './completeCI.yml' }), [fileToParse]);

      const [file] = render.render([]);

      expect(file).toEqual(fileToParse);
    });
  });
});
