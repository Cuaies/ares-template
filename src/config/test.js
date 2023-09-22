/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const { Locale } = require("discord.js");

module.exports = {
  client: {
    intents: [],
  },
  modules: {
    commands: {
      active: true,
    },
    events: {
      active: true,
    },
    localization: {
      active: true,
      defaultLocale: Locale.EnglishUS,
    },
  },
};
