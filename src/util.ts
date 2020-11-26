// 随机数种子
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

/**
 *
 * @method 生成随机的uniqueID
 */
export function getRandUid(): string {
    const ret = [];
    for (let i = 0, n; i < 20; ++i) {
        n = Math.floor(Math.random() * chars.length);
        ret.push(chars.charAt(n));
    }
    return ret.join('').toLowerCase();
}

export const supportDocumentWrite = () => {
    return !/Edge|MSIE|rv:/i.test(navigator.userAgent);
};

export function noop(): void {
    // do nothing
}

/**
 * 判断绝对URL
 * @param url
 */
export function isAbsoluteUrl(url: string): Boolean {
    return /^(?:[a-z]+:)?\/\//i.test(url);
}

/**
 * 截取URL的host部分
 * @param url
 */
export function filterHost(url: string): string {
    return url.replace(/^(?:[a-z]+:)?\/\//, '').replace(/\/.*/, '');
}
