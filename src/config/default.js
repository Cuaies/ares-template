/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const { Locale } = require("discord.js");

module.exports = {
  /**
   * Client class configuration.
   */
  client: {
    /**
     * Token used to authenticate with.
     * @type {string}
     */
    token: null,
    /**
     * Client's partials.
     */
    partials: [],
    /**
     * Client's intents.
     */
    intents: [],
  },
  /**
   * Core modules configuration.
   */
  modules: {
    /**
     * Commands manager configuration.
     */
    commands: {
      /**
       * Whether to be used or not.
       * @type {boolean}
       */
      active: null,
    },
    /**
     * Events manager configuration.
     */
    events: {
      /**
       * Whether to be used or not.
       * @type {boolean}
       */
      active: null,
    },
    /**
     * Localizations manager configuration.
     */
    localization: {
      /**
       * Whether to be used or not.
       * @type {boolean}
       */
      active: null,
      /**
       * Represents the locale that the client should default to.
       * @type {Locale}
       */
      defaultLocale: null,
    },
  },
};
