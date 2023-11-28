// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'test-technique',
      // URL to the GraphQL API
      url: process.env.VUE_APP_GRAPHQL_URL,
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.ts'],
  },
};
