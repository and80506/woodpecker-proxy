export const VERSION: string = '0.1.0';
export const STORAGE_KEY = {
    namespace: 'Woodpecker'
};
export enum ERRORS {
    ERR_CONFIG_SDK_INIT_OPTION = '[Woodpecker] Missing "sdkInit" option.',
    ERR_PATH_REWRITER_CONFIG = '[Woodpecker] Invalid path config. Expecting object with path config or a rewrite function',
    ERR_HOST_CONFIG = '[Woodpecker] Invalid host config. Expecting object or function or empty',
    ERR_PATCHING_SCRIPT = '[Woodpecker] unable to prevent script execution for script src %s .\n',
    ERR_CONFIG_SDK_LOG_PROVIDER = '[Woodpecker] Log provider config error. Expecting a function.',
    ERR_CONFIG_SDK_LOG_LEVEL = '[Woodpecker] Log level error. Invalid logLevel.'
}
export enum MESSAGES {
    MESSAGE_GOT_SCRIPT = '[woodpecker] got new script %s',
    MESSAGE_BLOCKED_SCRIPT = '[woodpecker] blocked and replace script %s to %s',
    MESSAGE_SCRIPT_LOADED = '[woodpecker] new script onload %s',
    MESSAGE_START_STATIC_SCRIPT = '[woodpecker] start load static new script %s',
    MESSAGE_START_DYNAMIC_SCRIPT = '[woodpecker] start load dynamic new script %s'
}
export const WP_LOG_ID = 'data-wp-log';
