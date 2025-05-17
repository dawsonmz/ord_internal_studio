import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schema';
import { singletonActions, singletonTypes, structure } from './src/structure';

export default defineConfig({
  name: 'default',
  title: 'ORD Internal',

  projectId: 'vh55mhjn',
  dataset: 'internal',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates:
        (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions:
    (input, context) =>
        singletonTypes.has(context.schemaType)
            ? input.filter(({ action }) => action && singletonActions.has(action))
            : input,
  },
});
