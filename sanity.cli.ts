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
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
});