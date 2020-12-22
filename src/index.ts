import { VERSION, ERRORS } from './constants';
import { rewriteConfig } from './path-rewriter';
import { hostConfig } from './host-rewriter';
import { patchScript } from './monkey-patch';
import { getInstance, logLevelOptions, logProviderOptions } from './logger';

interface sdkInitOptions {
    path: rewriteConfig;
    host?: hostConfig;
    protocol?: string;
    logLevel?: logLevelOptions;
    logProvider?: (d: logProviderOptions) => logProviderOptions;
}

const logger = getInstance();
function configureLogger(
    logLevel: logLevelOptions,
    logProvider: (d: logProviderOptions) => logProviderOptions
) {
    if (logLevel) {
        logger.setLevel(logLevel);
    }
    if (logProvider) {
        logger.setProvider(logProvider);
    }
}
/**
 *
 * @public
 * @method 写入配置
 * @param  {Object} options              - 配置信息
 * @param  {String} options.path         - URL path重写
 * @param  {String} options.host         - 根据传入hostOrPath重写host
 * @param  {String} options.protocol     - 重写后的protocol
 * @param  {String} options.logLevel     - debug、info、warn、error、silent，默认info
 * @param  {String} options.logProvider  - logProviderOptions，默认window.console
 */
const WoodpeckerProxy = function (options: sdkInitOptions, callback: () => any): void {
    configureLogger(options.logLevel, options.logProvider);
    if (!options) {
        throw new Error(ERRORS.ERR_CONFIG_SDK_INIT_OPTION);
    }
    this._initiated = true;
    patchScript(options.path, options.host, options.protocol);
    if (typeof callback === 'function') {
        callback();
    }
};
WoodpeckerProxy.version = VERSION;
// SDK初始化标记
WoodpeckerProxy._initiated = false;
/* ============================外部接口===================================*/

WoodpeckerProxy.init = WoodpeckerProxy;
export default WoodpeckerProxy;
