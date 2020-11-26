import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import { isAbsoluteUrl } from './util';
import { ERRORS } from './constants';

export type rewriteConfig = rule[];
export type rule = { regex: RegExp; value: string };

export function createPathRewriter(rewriteConfig: rewriteConfig) {
    if (!isValidRewriteConfig(rewriteConfig)) {
        return;
    }

    return function (hostAndPath: string) {
        const path = getPath(hostAndPath);
        let result = path;
        let validResult = false;

        forEach(rewriteConfig, (rule) => {
            if (rule.regex.test(path)) {
                validResult = true;
                result = result.replace(rule.regex, rule.value);
                // stop processing
                return false;
            }
        });
        // URL path未匹配
        if (!validResult) {
            return false;
        }

        return result;
    };
}

export function isValidRewriteConfig(rewriteConfig: rewriteConfig) {
    if (isArray(rewriteConfig)) {
        return true;
    } else {
        throw new Error(ERRORS.ERR_PATH_REWRITER_CONFIG);
    }
}

/**
 * 根据传入url获取path
 * @param url
 */
export function getPath(url: string) {
    let path: string;
    if (window.URL) {
        if (isAbsoluteUrl(url)) {
            path = new URL(url).pathname;
        }
        // path也可能是如./js/script-1.js这种相对地址
        else {
            path = new URL(url, location.href).pathname;
        }
    } else {
        let link = document.createElement('a');
        link.href = url;
        path = link.pathname;
        link = null;
    }
    return path;
}
