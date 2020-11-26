import isFunction from 'lodash/isFunction';
import { noop, getRandUid } from './util';
import { WP_LOG_ID, MESSAGES } from './constants';
import { getInstance } from './logger';
const logger = getInstance();

/**
 * 创建动态script
 * @param node
 * @param newSrc
 * @param wpLogId
 * @param onload
 */
function createNewScript(node: HTMLScriptElement, newSrc: string, wpLogId: string, onload = noop) {
    console.log('createNewScript', newSrc);
    // 不需要再走monkey patch过程
    const toBeAddedScript = Document.prototype.createElement.call(document, 'script');
    // copy script properties except src:
    // type, noModule, charset, async, defer,
    // crossOrigin, text, referrerPolicy, event,
    // htmlFor, integrity (chrome)
    Object.keys(HTMLScriptElement.prototype).forEach(function (key: string) {
        // 复制除src和type之外的属性
        if (
            key !== 'src' &&
            key !== 'type' &&
            (node as any)[key] &&
            typeof (node as any)[key] !== 'object'
        ) {
            try {
                toBeAddedScript[key] = (node as any)[key];
            } catch (error) {
                // do nothing
            }
        }
    });
    // 需要先设置标识位，赋值src和type会检查WP_LOG_ID
    toBeAddedScript.setAttribute(WP_LOG_ID, wpLogId);
    toBeAddedScript.src = newSrc;
    toBeAddedScript.type = 'text/javascript';
    toBeAddedScript.onload = function () {
        if (isFunction(node.onload)) {
            node.onload();
        }
        onload();
    };
    toBeAddedScript.onerror = node.onerror;
    const nonce = node.getAttribute('nonce');
    if (nonce) {
        toBeAddedScript.setAttribute('nonce', nonce);
    }
    document.getElementsByTagName('head')[0].appendChild(toBeAddedScript);
    // Unnecessary, but cleaner: remove the node from the DOM
    node.parentElement.removeChild(node);
    return toBeAddedScript;
}

function rewriteSrc(node: HTMLScriptElement, newSrc: string, wpLogId: string, onload = noop) {
    console.log('rewriteSrc', newSrc);
    // 需要先设置标识位，赋值src和type会检查WP_LOG_ID
    node.setAttribute(WP_LOG_ID, wpLogId);
    node.src = newSrc;
    node.type = 'text/javascript';
    const originOnload = node.onload;
    node.onload = function () {
        if (isFunction(originOnload)) {
            originOnload();
        }
        onload();
    };
    return node;
}

/**
 * <script> => <script>
 * <script async> => <script async>
 * <script defer> => <script defer>
 * @param node
 * @param newSrc
 * @param onload
 */
export function scriptRewrite(node: HTMLScriptElement, newSrc: string, onload = noop) {
    const isAsyncScript = node.defer || node.async;
    const wpLogId = getRandUid();
    console.log(document.currentScript);
    // 同步Script标签
    if (!isAsyncScript && document.readyState === 'loading') {
        logger.debug(MESSAGES.MESSAGE_START_STATIC_SCRIPT, newSrc);
        // Replace the script tag execution in Safari, Chrome, Edge? & IE?
        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
            // Firefox无效
            // FIXME: 动态插入的async=false scrip标签，修改src后不执行，怎么检测？
            rewriteSrc(node, newSrc, wpLogId, onload);
        }
        // Firefox or Others
        else {
            // FIXME: 同步script转为异步时，可能丢失DOMContentLoaded事件回调
            // newScript(node, newSrc, wpLogId, onload);
            node.async = false;
            node.defer = true;
            createNewScript(node, newSrc, wpLogId, onload);
        }
    }
    // 动态加载的异步script标签
    else {
        logger.debug(MESSAGES.MESSAGE_START_DYNAMIC_SCRIPT, newSrc);
        // 动态脚本默认情况下表现为“async”。如果我们显式设置，则可以更改script.async=false。然后，脚本将按照文档顺序执行，就像defer。
        createNewScript(node, newSrc, wpLogId, onload);
    }
}
