import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schema';
import { structure } from './src/structure';

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
    },
});
