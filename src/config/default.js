module.exports = {
  /**
   * Client class configuration.
   */
  client: {
    /**
     * Token used to authenticate with.
     * @type string
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
       * @type boolean
       */
      active: null,
    },
    /**
     * Events manager configuration.
     */
    events: {
      /**
       * Whether to be used or not.
       * @type boolean
       */
      active: null,
    },
  },
};
