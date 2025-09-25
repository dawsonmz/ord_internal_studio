import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vh55mhjn',
    dataset: 'internal',
  },
  studioHost: 'ord-internal',
  server: {
    hostname: "localhost",
    port: 3333,
  },
  deployment: {
    appId: 'gy893evwg6fdshlcoug6qjid',
    autoUpdates: true,
  },
});
