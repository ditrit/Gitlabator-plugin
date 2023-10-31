import GitlabMetadata from 'src/metadata/GitlabMetadata';
import { DefaultData } from 'leto-modelizer-plugin-core';
import fs from 'fs';

describe('Test GitlabMetadata', () => {
  describe('Test methods', () => {
    describe('Test method: parse', () => {
      it('Should return valid content when parsing default metadata', () => {
        const expectedDefinitions = JSON.parse(fs.readFileSync('tests/resources/metadata/default.json', 'utf8'));
        const pluginData = new DefaultData();
        const metadata = new GitlabMetadata(pluginData);
        metadata.parse();
        expect(expectedDefinitions).toEqual(
          JSON.parse(JSON.stringify(pluginData.definitions.components)),
        );
      });
    });
  });
});
