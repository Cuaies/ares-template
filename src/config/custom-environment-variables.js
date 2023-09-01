module.exports = {
  client: {
    token: "CLIENT_TOKEN",
  },
  modules: {
    commands: {
      active: {
        __name: "COMMANDS_MANAGER_ACTIVE",
        __format: "boolean",
      },
    },
    events: {
      active: {
        __name: "EVENTS_MANAGER_ACTIVE",
        __format: "boolean",
      },
    },
    localizations: {
      active: {
        __name: "LOCALIZATIONS_MANAGER_ACTIVE",
        __format: "boolean",
      },
    },
  },
};
