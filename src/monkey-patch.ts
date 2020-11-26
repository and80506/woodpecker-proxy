import { ERRORS, MESSAGES, WP_LOG_ID } from './constants';
import { rewriteConfig, createPathRewriter } from './path-rewriter';
import { hostConfig, createHostRewriter } from './host-rewriter';
import { scriptRewrite } from './script-rewrite';
import { getInstance } from './logger';
const logger = getInstance();

export function patchScript(path: rewriteConfig, host: hostConfig, protocol: string) {
    const pathRewrite = createPathRewriter(path);
    const hostRewriter = createHostRewriter(host);
    // 不传则使用当前页面protocol
    const protocolRewrite = protocol || location.protocol;
    function filterSrc(node: HTMLScriptElement, src: string) {
        // 跳过内联Script标签
        if (!src) return false;
        // 跳过重写过的Script标签
        const wpLogId = node.getAttribute(WP_LOG_ID);
        if (wpLogId) return false;
        // 跳过未匹配到path的Script标签
        const newPath = pathRewrite(src);
        if (!newPath) return false;
        return true;
    }
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach((node: HTMLScriptElement) => {
                // 遍历所有Script标签
                if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
                    const src = node.src;
                    const isMatchScript = filterSrc(node, src);
                    logger.debug(
                        MESSAGES.MESSAGE_GOT_SCRIPT,
                        isMatchScript ? `😇 matched "${src}"` : `😈 not matched "${src}"`
                    );
                    if (filterSrc(node, src)) {
                        // If the src is inside your blacklist
                        // Do some stuff that will prevent the script tag loading ;)
                        // Blocks the script tag execution in Safari, Chrome, Edge & IE
                        node.type = 'javascript/blocked';

                        // Firefox has this additional event which prevents scripts from beeing executed
                        const beforeScriptExecuteListener = function (event: Event) {
                            // Prevent only marked scripts from executing
                            if (node.getAttribute('type') === 'javascript/blocked') {
                                event.preventDefault();
                            }
                            node.removeEventListener(
                                'beforescriptexecute',
                                beforeScriptExecuteListener
                            );
                        };
                        node.addEventListener('beforescriptexecute', beforeScriptExecuteListener);

                        const newUrl =
                            protocolRewrite + '//' + hostRewriter(src) + pathRewrite(src);
                        // write new url
                        logger.debug(MESSAGES.MESSAGE_BLOCKED_SCRIPT, src, newUrl);
                        scriptRewrite(node, newUrl, function () {
                            logger.debug(MESSAGES.MESSAGE_SCRIPT_LOADED, newUrl);
                        });
                    }
                }
            });
        });
    });
    // Starts the monitoring
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // 按需加载的js无法通过MutationObserver修改type阻止执行，需要单独处理
    const createElementBackup = document.createElement;
    document.createElement = function (...args: any[]) {
        // If this is not a script tag, bypass
        if (args[0].toLowerCase() !== 'script') {
            // Binding to document is essential
            return createElementBackup.bind(document)(...args);
        }

        const scriptElt = createElementBackup.bind(document)(...args);

        // Backup the original setAttribute function
        const originalSetAttribute = scriptElt.setAttribute.bind(scriptElt);

        // Define getters / setters to ensure that the script type is properly set

        try {
            Object.defineProperties(scriptElt, {
                src: {
                    get() {
                        return scriptElt.getAttribute('src');
                    },
                    set(value) {
                        if (filterSrc(scriptElt, value)) {
                            originalSetAttribute('type', 'javascript/blocked');
                        }
                        originalSetAttribute('src', value);
                        return true;
                    }
                },
                type: {
                    set(value) {
                        let typeValue = value;
                        if (filterSrc(scriptElt, scriptElt.src)) {
                            typeValue = 'javascript/blocked';
                        }
                        originalSetAttribute('type', typeValue);
                        return true;
                    }
                }
            });

            // Monkey patch the setAttribute function so that the setter is called instead.
            // Otherwise, setAttribute('type', 'whatever') will bypass our custom descriptors!
            scriptElt.setAttribute = function (name: string, value: string) {
                if (name === 'type' || name === 'src') scriptElt[name] = value;
                else HTMLScriptElement.prototype.setAttribute.call(scriptElt, name, value);
            };
        } catch (error) {
            logger.error(ERRORS.ERR_PATCHING_SCRIPT, scriptElt.src, error);
        }

        return scriptElt;
    };
}
