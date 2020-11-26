import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import forIn from 'lodash/forIn';
import { isAbsoluteUrl, filterHost } from './util';
import { ERRORS } from './constants';

export type hostConfig =
    | { [hostOrPath: string]: string }
    | ((hostOrPath: string) => string)
    | undefined
    | null;

export function createHostRewriter(hostConfig: hostConfig) {
    if (!isValidHostConfig(hostConfig)) {
        return;
    }
    if (isPlainObject(hostConfig)) {
        return function (hostAndPath: string) {
            let host: string = getHost(hostAndPath);
            let result = host;

            forIn(hostConfig, (value, key) => {
                // filter host to match 'http://localhost:5000'、'localhost:5000/api'、'localhost:5000'
                const keyHost = filterHost(key);
                if (host === keyHost) {
                    result = filterHost(value);
                    return false;
                }
            });

            return result;
        };
    } else if (isFunction(hostConfig)) {
        const customRewriteFn = hostConfig;
        return function (hostAndPath: string) {
            let rewriteHost = customRewriteFn(hostAndPath);
            rewriteHost = filterHost(rewriteHost);
            return rewriteHost;
        };
    }
    // isEmpty
    else {
        return function (hostAndPath: string) {
            const host = getHost(hostAndPath);
            return host;
        };
    }
}

export function isValidHostConfig(hostConfig: hostConfig) {
    if (isPlainObject(hostConfig) || isFunction(hostConfig) || isEmpty(hostConfig)) {
        return true;
    } else {
        throw new Error(ERRORS.ERR_HOST_CONFIG);
    }
}

/**
 * 根据传入url获取host
 * @param url './js/script-1.js' or 'http://localhost:5000/demo/js/script-1.js'
 */
export function getHost(url: string) {
    let host: string;
    if (window.URL) {
        if (isAbsoluteUrl(url)) {
            host = new URL(url).host;
        }
        // path也可能是如./js/script-1.js这种相对地址
        else {
            host = location.host;
        }
    } else {
        let link = document.createElement('a');
        link.href = url;
        host = link.host;
        link = null;
    }
    return host;
}
