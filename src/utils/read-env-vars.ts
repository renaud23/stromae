declare global {
  interface Window {
    _env_: Record<string, string>;
  }
}

export enum SavingStrategyEnum {
  Complete = "complete",
  Partial = "partial",
}

export enum SavingTimeEnum {
  Sequence = "sequence",
  Page = "page",
}

export enum AuthTypeEnum {
  None = "none",
  Oidc = "oidc",
}

/**
 * This function reads environment variables in the order: (If a value is found, it stops.)
 *  - variables defined inside object window._env_ (env variable injected by environnment, docker)
 * @param varName : the variable name
 * @returns the value of variable name
 */
export const getEnvVar = (varName: string) => {
  if (window._env_ && varName in window._env_) {
    return window?._env_[varName];
  } else if (import.meta.env && varName in import.meta.env) {
    return import.meta.env[varName];
  }
  return "";
};

export const environment = {
  DOMAIN: getEnvVar("VITE_SURVEY_API_BASE_URL"),
  DEFAULT_SURVEY: getEnvVar("VITE_DEFAULT_SURVEY") || "recensement",
  AUTH_TYPE: getEnvVar("VITE_AUTH_TYPE") || AuthTypeEnum.Oidc,
  DEBUG: Boolean(getEnvVar("VITE_DEBUG") === "true"),
  PUBLIC_URL: getEnvVar("PUBLIC_URL"),
  DEPOSIT_PROOF_FILE_NAME:
    getEnvVar("VITE_DEPOSIT_PROOF_FILE_NAME") || "deposit-proof",
};
