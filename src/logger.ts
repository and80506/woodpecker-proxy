import isFunction from 'lodash/isFunction';
import { ERRORS } from './constants';

type LoggerFn = (...args: any[]) => void;

export interface logProviderOptions {
    log: LoggerFn;
    debug?: LoggerFn;
    info?: LoggerFn;
    warn?: LoggerFn;
    error?: LoggerFn;
}

const defaultProvider: logProviderOptions = {
    // tslint:disable: no-console
    log: console.log,
    debug: console.log, // use .log(); since console does not have .debug()
    info: console.info,
    warn: console.warn,
    error: console.error
};

interface loggerOptions {
    log: LoggerFn;
    debug: LoggerFn;
    info: LoggerFn;
    warn: LoggerFn;
    error: LoggerFn;
    setLevel: (v: logLevelOptions) => void;
    setProvider: (fn: (d: logProviderOptions) => logProviderOptions) => void;
}

let loggerInstance: loggerOptions;

// log level 'weight'
enum LEVELS {
    debug = 10,
    info = 20,
    warn = 30,
    error = 50,
    silent = 80
}

export enum logLevelOptions {
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
    silent = 'silent'
}

export function getInstance() {
    if (!loggerInstance) {
        loggerInstance = new Logger();
    }

    return loggerInstance;
}

class Logger {
    public logLevel: logLevelOptions;
    public provider: logProviderOptions;

    constructor() {
        this.setLevel(logLevelOptions.info);
        this.setProvider(() => defaultProvider);
    }

    // log will log messages, regardless of logLevels
    public log() {
        this.provider.log(...arguments);
    }

    public debug() {
        if (this._showLevel(logLevelOptions.debug)) {
            this.provider.debug(...arguments);
        }
    }

    public info() {
        if (this._showLevel(logLevelOptions.info)) {
            this.provider.info(...arguments);
        }
    }

    public warn() {
        if (this._showLevel(logLevelOptions.warn)) {
            this.provider.warn(...arguments);
        }
    }

    public error() {
        if (this._showLevel(logLevelOptions.error)) {
            this.provider.error(...arguments);
        }
    }

    public setLevel(v: logLevelOptions) {
        if (this.isValidLevel(v)) {
            this.logLevel = v;
        }
    }

    public setProvider(fn: (defaultProvider: logProviderOptions) => logProviderOptions) {
        if (fn && this.isValidProvider(fn)) {
            this.provider = fn(defaultProvider);
        }
    }

    public isValidProvider(
        fnProvider: (defaultProvider: logProviderOptions) => logProviderOptions
    ) {
        const result = true;

        if (fnProvider && !isFunction(fnProvider)) {
            throw new Error(ERRORS.ERR_CONFIG_SDK_LOG_PROVIDER);
        }

        return result;
    }

    public isValidLevel(levelName: logLevelOptions) {
        const validLevels = Object.keys(LEVELS);
        const isValid = validLevels.includes(levelName);

        if (!isValid) {
            throw new Error(ERRORS.ERR_CONFIG_SDK_LOG_LEVEL);
        }

        return isValid;
    }

    /**
     * Decide to log or not to log, based on the log levels 'weight'
     * @param  {String}  showLevel [debug, info, warn, error, silent]
     * @return {Boolean}
     */
    private _showLevel(showLevel: logLevelOptions) {
        let result = false;
        const currentLogLevel = LEVELS[this.logLevel];

        if (currentLogLevel && currentLogLevel <= LEVELS[showLevel]) {
            result = true;
        }

        return result;
    }
}
