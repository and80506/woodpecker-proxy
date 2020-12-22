export const VERSION: string = '0.1.0';
export const STORAGE_KEY = {
    namespace: 'WoodpeckerProxy'
};
export enum ERRORS {
    ERR_CONFIG_SDK_INIT_OPTION = '[WoodpeckerProxy] Missing "sdkInit" option.',
    ERR_PATH_REWRITER_CONFIG = '[WoodpeckerProxy] Invalid path config. Expecting object with path config or a rewrite function',
    ERR_HOST_CONFIG = '[WoodpeckerProxy] Invalid host config. Expecting object or function or empty',
    ERR_PATCHING_SCRIPT = '[WoodpeckerProxy] unable to prevent script execution for script src %s .\n',
    ERR_CONFIG_SDK_LOG_PROVIDER = '[WoodpeckerProxy] Log provider config error. Expecting a function.',
    ERR_CONFIG_SDK_LOG_LEVEL = '[WoodpeckerProxy] Log level error. Invalid logLevel.'
}
export enum MESSAGES {
    MESSAGE_GOT_SCRIPT = '[WoodpeckerProxy] got new script %s',
    MESSAGE_BLOCKED_SCRIPT = '[WoodpeckerProxy] blocked and replace script %s to %s',
    MESSAGE_SCRIPT_LOADED = '[WoodpeckerProxy] new script onload %s',
    MESSAGE_START_STATIC_SCRIPT = '[WoodpeckerProxy] start load static new script %s',
    MESSAGE_START_DYNAMIC_SCRIPT = '[WoodpeckerProxy] start load dynamic new script %s'
}
export const WP_PROXY_ID = 'data-wp-proxy';
