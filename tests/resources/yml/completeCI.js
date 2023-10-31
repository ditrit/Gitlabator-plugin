import GitlabMetadata from 'src/metadata/GitlabMetadata';
import { Component, ComponentAttribute, DefaultData } from 'leto-modelizer-plugin-core';

const pluginData = new DefaultData();
const metadata = new GitlabMetadata(pluginData);

metadata.parse();

const gitlabCi = pluginData.definitions.components
  .find(({ type }) => type === 'gitlabCi');
const jobCi = pluginData.definitions.components
  .find(({ type }) => type === 'jobCi');
const service = pluginData.definitions.components
  .find(({ type }) => type === 'service');

const beforeScript = jobCi.definedAttributes.find(({ name }) => name === 'beforescript');

export default [
  new Component({
    id: 'gitlabCi_1',
    name: 'CI',
    definition: gitlabCi,
    path: './completeCI.yml',
    attributes: [new ComponentAttribute({
      name: 'name',
      value: 'CI',
      type: 'String',
      definition: gitlabCi.definedAttributes.find(({ name }) => name === 'name'),
    }),
    new ComponentAttribute({
      name: 'stages',
      value: ['test','build'],
      type: 'Array',
      definition: gitlabCi.definedAttributes.find(({ name }) => name === 'stages'),
    }),
    new ComponentAttribute({
      name: 'tags',
      value: ['tags','runner'],
      type: 'Array',
      definition: gitlabCi.definedAttributes.find(({ name }) => name === 'tags'),
    }),
    new ComponentAttribute({
      name: 'variables',
      value: [
        new ComponentAttribute({
          name: 'image_name',
          value: 'docker-dind',
          type: 'String',
        }),
      ],
      type: 'Object',
      definition: gitlabCi.definedAttributes.find(({ name }) => name === 'variables'),
    })
],
  }),

  new Component({
    id: 'my-postgres',
    definition: service,
    path: './completeCI.yml',
    attributes: [new ComponentAttribute({
      name: 'gitlabCi_id',
      value: 'gitlabCi_1',
      type: 'String',
      definition: service.definedAttributes.find(({ name }) => name === 'gitlabCi_id'),
    }), new ComponentAttribute({
      name: 'name',
      value: 'my-postgres',
      type: 'String',
      definition: service.definedAttributes.find(({ name }) => name === 'name'),
    }),
    new ComponentAttribute({
      name: 'alias',
      value: 'db-postgres',
      type: 'String',
      definition: service.definedAttributes.find(({ name }) => name === 'alias'),
    }),
    new ComponentAttribute({
      name: 'entrypoint',
      value: 'test',
      type: 'String',
      definition: service.definedAttributes.find(({ name }) => name === 'entrypoint'),
    }),
  ],
  }),
  new Component({
    id: 'test_job',
    definition: jobCi,
    path: './completeCI.yml',
    attributes: [new ComponentAttribute({
      name: 'gitlabCi_id',
      value: 'gitlabCi_1',
      type: 'String',
      definition: jobCi.definedAttributes.find(({ name }) => name === 'gitlabCi_id'),
    }), new ComponentAttribute({
      name: 'image',
      value: 'test',
      type: 'String',
      definition: jobCi.definedAttributes.find(({ name }) => name === 'image'),
    }),
    new ComponentAttribute({
      name: 'stage',
      value: 'test',
      type: 'String',
      definition: jobCi.definedAttributes.find(({ name }) => name === 'stage'),
    }),
    new ComponentAttribute({
      name: 'beforescript',
      value: ['echo "start"', 'run cleanup'],
      type: 'Array',
      definition: beforeScript,
    }),
    new ComponentAttribute({
      name: 'script',
      value: ['make tests'],
      type: 'Array',
      definition: jobCi.definedAttributes.find(({ name }) => name === 'script'),
    }),
    new ComponentAttribute({
      name: 'afterscript',
      value: ['echo "done"'],
      type: 'Array',
      definition: jobCi.definedAttributes.find(({ name }) => name === 'afterscript'),
    }),
    new ComponentAttribute({
      name: 'only',
      value: 'master',
      type: 'String',
      definition: jobCi.definedAttributes.find(({ name }) => name === 'only'),
    }),
    new ComponentAttribute({
      name: 'when',
      value: 'success',
      type: 'String',
      definition: jobCi.definedAttributes.find(({ name }) => name === 'when'),
    }),
    new ComponentAttribute({
      name: 'environment',
      value: 'test2',
      type: 'String',
      definition: jobCi.definedAttributes.find(({ name }) => name === 'environment'),
    }),
    ]}),
    new Component({
      id: 'build_job',
      definition: jobCi,
      path: './completeCI.yml',
      attributes: [new ComponentAttribute({
        name: 'gitlabCi_id',
        value: 'gitlabCi_1',
        type: 'String',
        definition: jobCi.definedAttributes.find(({ name }) => name === 'gitlabCi_id'),
      }),
       new ComponentAttribute({
        name: 'tags',
        value: ['build','test'],
        type: 'Array',
        definition: jobCi.definedAttributes.find(({ name }) => name === 'tags'),
      }), 
        new ComponentAttribute({
        name: 'image',
        value: 'maven:8.6',
        type: 'String',
        definition: jobCi.definedAttributes.find(({ name }) => name === 'image'),
      }),
      new ComponentAttribute({
        name: 'stage',
        value: 'build',
        type: 'String',
        definition: jobCi.definedAttributes.find(({ name }) => name === 'stage'),
      }),
      new ComponentAttribute({
        name: 'beforescript',
        value: ['echo "start"', 'run cleanup'],
        type: 'Array',
        definition: jobCi.definedAttributes.find(({ name }) => name === 'beforescript'),
      }),
      new ComponentAttribute({
        name: 'script',
        value: ['mvn clean install'],
        type: 'Array',
        definition: jobCi.definedAttributes.find(({ name }) => name === 'script'),
      }),
      new ComponentAttribute({
        name: 'afterscript',
        value: ['echo "done"'],
        type: 'Array',
        definition: jobCi.definedAttributes.find(({ name }) => name === 'afterscript'),
      }),
      new ComponentAttribute({
        name: 'only',
        value: 'main',
        type: 'String',
        definition: jobCi.definedAttributes.find(({ name }) => name === 'only'),
      }),
      ]})
];
