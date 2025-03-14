import { SERVICES_CONFIG } from "../generators/services/index.js";

export const SERVICES = {
  MODEL: {
    imports: SERVICES_CONFIG.MODEL.IMPORTS,
    find_one: SERVICES_CONFIG.MODEL.FIND_ONE,
    return_find_one: SERVICES_CONFIG.MODEL.RETURN_FIND_ONE,
  },
};

// Keep the old export for backward compatibility
export const servicesConfig = {
  MODEL: {
    imports: {
      SOCKETIO: {
        NAME: "../../models",
        DEFAULT: {},
        NAMED: {
          EXAMPLE: "Example",
        },
      },
    },
  },
};
