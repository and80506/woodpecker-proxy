!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(t="undefined"!=typeof globalThis?globalThis:t||self).WoodpeckerProxy=r()}(this,(function(){"use strict";var t,r;!function(t){t.ERR_CONFIG_SDK_INIT_OPTION='[WoodpeckerProxy] Missing "sdkInit" option.',t.ERR_PATH_REWRITER_CONFIG="[WoodpeckerProxy] Invalid path config. Expecting object with path config or a rewrite function",t.ERR_HOST_CONFIG="[WoodpeckerProxy] Invalid host config. Expecting object or function or empty",t.ERR_PATCHING_SCRIPT="[WoodpeckerProxy] unable to prevent script execution for script src %s .\n",t.ERR_CONFIG_SDK_LOG_PROVIDER="[WoodpeckerProxy] Log provider config error. Expecting a function.",t.ERR_CONFIG_SDK_LOG_LEVEL="[WoodpeckerProxy] Log level error. Invalid logLevel."}(t||(t={})),function(t){t.MESSAGE_GOT_SCRIPT="[WoodpeckerProxy] got new script %s",t.MESSAGE_BLOCKED_SCRIPT="[WoodpeckerProxy] blocked and replace script %s to %s",t.MESSAGE_SCRIPT_LOADED="[WoodpeckerProxy] new script onload %s",t.MESSAGE_START_STATIC_SCRIPT="[WoodpeckerProxy] start load static new script %s",t.MESSAGE_START_DYNAMIC_SCRIPT="[WoodpeckerProxy] start load dynamic new script %s"}(r||(r={}));var e="data-wp-proxy";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function n(t,r){var e="function"==typeof Symbol&&t[Symbol.iterator];if(!e)return t;var n,o,c=e.call(t),i=[];try{for(;(void 0===r||r-- >0)&&!(n=c.next()).done;)i.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(e=c.return)&&e.call(c)}finally{if(o)throw o.error}}return i}function o(){for(var t=[],r=0;r<arguments.length;r++)t=t.concat(n(arguments[r]));return t}var c=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n&&!1!==r(t[e],e,t););return t};var i=function(t){return function(r,e,n){for(var o=-1,c=Object(r),i=n(r),u=i.length;u--;){var a=i[t?u:++o];if(!1===e(c[a],a,c))break}return r}}();var u=function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n},a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function f(t,r,e){return t(e={path:r,exports:{},require:function(t,r){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==r&&e.path)}},e.exports),e.exports}var l="object"==typeof a&&a&&a.Object===Object&&a,p="object"==typeof self&&self&&self.Object===Object&&self,s=l||p||Function("return this")(),v=s.Symbol,d=Object.prototype,y=d.hasOwnProperty,b=d.toString,h=v?v.toStringTag:void 0;var g=function(t){var r=y.call(t,h),e=t[h];try{t[h]=void 0;var n=!0}catch(t){}var o=b.call(t);return n&&(r?t[h]=e:delete t[h]),o},j=Object.prototype.toString;var E=function(t){return j.call(t)},_=v?v.toStringTag:void 0;var O=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":_&&_ in Object(t)?g(t):E(t)};var w=function(t){return null!=t&&"object"==typeof t};var S=function(t){return w(t)&&"[object Arguments]"==O(t)},R=Object.prototype,T=R.hasOwnProperty,m=R.propertyIsEnumerable,A=S(function(){return arguments}())?S:function(t){return w(t)&&T.call(t,"callee")&&!m.call(t,"callee")},P=Array.isArray;var I=function(){return!1},L=f((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?s.Buffer:void 0,c=(o?o.isBuffer:void 0)||I;t.exports=c})),x=/^(?:0|[1-9]\d*)$/;var C=function(t,r){var e=typeof t;return!!(r=null==r?9007199254740991:r)&&("number"==e||"symbol"!=e&&x.test(t))&&t>-1&&t%1==0&&t<r};var G=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},k={};k["[object Float32Array]"]=k["[object Float64Array]"]=k["[object Int8Array]"]=k["[object Int16Array]"]=k["[object Int32Array]"]=k["[object Uint8Array]"]=k["[object Uint8ClampedArray]"]=k["[object Uint16Array]"]=k["[object Uint32Array]"]=!0,k["[object Arguments]"]=k["[object Array]"]=k["[object ArrayBuffer]"]=k["[object Boolean]"]=k["[object DataView]"]=k["[object Date]"]=k["[object Error]"]=k["[object Function]"]=k["[object Map]"]=k["[object Number]"]=k["[object Object]"]=k["[object RegExp]"]=k["[object Set]"]=k["[object String]"]=k["[object WeakMap]"]=!1;var M=function(t){return w(t)&&G(t.length)&&!!k[O(t)]};var N=function(t){return function(r){return t(r)}},D=f((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e&&l.process,c=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=c})),F=D&&D.isTypedArray,W=F?N(F):M,V=Object.prototype.hasOwnProperty;var U=function(t,r){var e=P(t),n=!e&&A(t),o=!e&&!n&&L(t),c=!e&&!n&&!o&&W(t),i=e||n||o||c,a=i?u(t.length,String):[],f=a.length;for(var l in t)!r&&!V.call(t,l)||i&&("length"==l||o&&("offset"==l||"parent"==l)||c&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||C(l,f))||a.push(l);return a},B=Object.prototype;var H=function(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||B)};var K=function(t,r){return function(e){return t(r(e))}},$=K(Object.keys,Object),q=Object.prototype.hasOwnProperty;var z=function(t){if(!H(t))return $(t);var r=[];for(var e in Object(t))q.call(t,e)&&"constructor"!=e&&r.push(e);return r};var Y=function(t){var r=typeof t;return null!=t&&("object"==r||"function"==r)};var J=function(t){if(!Y(t))return!1;var r=O(t);return"[object Function]"==r||"[object GeneratorFunction]"==r||"[object AsyncFunction]"==r||"[object Proxy]"==r};var Q=function(t){return null!=t&&G(t.length)&&!J(t)};var X=function(t){return Q(t)?U(t):z(t)};var Z=function(t,r){return function(e,n){if(null==e)return e;if(!Q(e))return t(e,n);for(var o=e.length,c=r?o:-1,i=Object(e);(r?c--:++c<o)&&!1!==n(i[c],c,i););return e}}((function(t,r){return t&&i(t,r,X)}));var tt=function(t){return t};var rt=function(t){return"function"==typeof t?t:tt};var et=function(t,r){return(P(t)?c:Z)(t,rt(r))},nt="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";function ot(){}function ct(t){return/^(?:[a-z]+:)?\/\//i.test(t)}function it(t){return t.replace(/^(?:[a-z]+:)?\/\//,"").replace(/\/.*/,"")}function ut(r){if(function(r){if(P(r))return!0;throw new Error(t.ERR_PATH_REWRITER_CONFIG)}(r))return function(t){var e=function(t){var r;if(window.URL)r=ct(t)?new URL(t).pathname:new URL(t,location.href).pathname;else{var e=document.createElement("a");e.href=t,r=e.pathname,e=null}return r}(t),n=e,o=!1;return et(r,(function(t){if(t.regex.test(e))return o=!0,n=n.replace(t.regex,t.value),!1})),!!o&&n}}var at=K(Object.getPrototypeOf,Object),ft=Function.prototype,lt=Object.prototype,pt=ft.toString,st=lt.hasOwnProperty,vt=pt.call(Object);var dt,yt=function(t){if(!w(t)||"[object Object]"!=O(t))return!1;var r=at(t);if(null===r)return!0;var e=st.call(r,"constructor")&&r.constructor;return"function"==typeof e&&e instanceof e&&pt.call(e)==vt},bt=s["__core-js_shared__"],ht=(dt=/[^.]+$/.exec(bt&&bt.keys&&bt.keys.IE_PROTO||""))?"Symbol(src)_1."+dt:"";var gt=function(t){return!!ht&&ht in t},jt=Function.prototype.toString;var Et=function(t){if(null!=t){try{return jt.call(t)}catch(t){}try{return t+""}catch(t){}}return""},_t=/^\[object .+?Constructor\]$/,Ot=Function.prototype,wt=Object.prototype,St=Ot.toString,Rt=wt.hasOwnProperty,Tt=RegExp("^"+St.call(Rt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var mt=function(t){return!(!Y(t)||gt(t))&&(J(t)?Tt:_t).test(Et(t))};var At=function(t,r){return null==t?void 0:t[r]};var Pt=function(t,r){var e=At(t,r);return mt(e)?e:void 0},It=Pt(s,"DataView"),Lt=Pt(s,"Map"),xt=Pt(s,"Promise"),Ct=Pt(s,"Set"),Gt=Pt(s,"WeakMap"),kt="[object Map]",Mt="[object Promise]",Nt="[object Set]",Dt="[object WeakMap]",Ft="[object DataView]",Wt=Et(It),Vt=Et(Lt),Ut=Et(xt),Bt=Et(Ct),Ht=Et(Gt),Kt=O;(It&&Kt(new It(new ArrayBuffer(1)))!=Ft||Lt&&Kt(new Lt)!=kt||xt&&Kt(xt.resolve())!=Mt||Ct&&Kt(new Ct)!=Nt||Gt&&Kt(new Gt)!=Dt)&&(Kt=function(t){var r=O(t),e="[object Object]"==r?t.constructor:void 0,n=e?Et(e):"";if(n)switch(n){case Wt:return Ft;case Vt:return kt;case Ut:return Mt;case Bt:return Nt;case Ht:return Dt}return r});var $t=Kt,qt=Object.prototype.hasOwnProperty;var zt=function(t){if(null==t)return!0;if(Q(t)&&(P(t)||"string"==typeof t||"function"==typeof t.splice||L(t)||W(t)||A(t)))return!t.length;var r=$t(t);if("[object Map]"==r||"[object Set]"==r)return!t.size;if(H(t))return!z(t).length;for(var e in t)if(qt.call(t,e))return!1;return!0};var Yt=function(t){var r=[];if(null!=t)for(var e in Object(t))r.push(e);return r},Jt=Object.prototype.hasOwnProperty;var Qt=function(t){if(!Y(t))return Yt(t);var r=H(t),e=[];for(var n in t)("constructor"!=n||!r&&Jt.call(t,n))&&e.push(n);return e};var Xt=function(t){return Q(t)?U(t,!0):Qt(t)};var Zt=function(t,r){return null==t?t:i(t,rt(r),Xt)};function tr(r){if(function(r){if(yt(r)||J(r)||zt(r))return!0;throw new Error(t.ERR_HOST_CONFIG)}(r)){if(yt(r))return function(t){var e=rr(t),n=e;return Zt(r,(function(t,r){var o=it(r);if(e===o)return n=it(t),!1})),n};if(J(r)){var e=r;return function(t){var r=e(t);return r=it(r)}}return function(t){return rr(t)}}}function rr(t){var r;if(window.URL)r=ct(t)?new URL(t).host:location.host;else{var e=document.createElement("a");e.href=t,r=e.host,e=null}return r}var er,nr,or,cr={log:console.log,debug:console.log,info:console.info,warn:console.warn,error:console.error};function ir(){return er||(er=new ur),er}!function(t){t[t.debug=10]="debug",t[t.info=20]="info",t[t.warn=30]="warn",t[t.error=50]="error",t[t.silent=80]="silent"}(nr||(nr={})),function(t){t.debug="debug",t.info="info",t.warn="warn",t.error="error",t.silent="silent"}(or||(or={}));var ur=function(){function r(){this.setLevel(or.info),this.setProvider((function(){return cr}))}return r.prototype.log=function(){var t;(t=this.provider).log.apply(t,o(arguments))},r.prototype.debug=function(){var t;this._showLevel(or.debug)&&(t=this.provider).debug.apply(t,o(arguments))},r.prototype.info=function(){var t;this._showLevel(or.info)&&(t=this.provider).info.apply(t,o(arguments))},r.prototype.warn=function(){var t;this._showLevel(or.warn)&&(t=this.provider).warn.apply(t,o(arguments))},r.prototype.error=function(){var t;this._showLevel(or.error)&&(t=this.provider).error.apply(t,o(arguments))},r.prototype.setLevel=function(t){this.isValidLevel(t)&&(this.logLevel=t)},r.prototype.setProvider=function(t){t&&this.isValidProvider(t)&&(this.provider=t(cr))},r.prototype.isValidProvider=function(r){if(r&&!J(r))throw new Error(t.ERR_CONFIG_SDK_LOG_PROVIDER);return!0},r.prototype.isValidLevel=function(r){var e=Object.keys(nr).includes(r);if(!e)throw new Error(t.ERR_CONFIG_SDK_LOG_LEVEL);return e},r.prototype._showLevel=function(t){var r=!1,e=nr[this.logLevel];return e&&e<=nr[t]&&(r=!0),r},r}(),ar=ir();function fr(t,r,n,o){void 0===o&&(o=ot),console.log("createNewScript",r);var c=Document.prototype.createElement.call(document,"script");Object.keys(HTMLScriptElement.prototype).forEach((function(r){if("src"!==r&&"type"!==r&&t[r]&&"object"!=typeof t[r])try{c[r]=t[r]}catch(t){}})),c.setAttribute(e,n),c.src=r,c.type="text/javascript",c.onload=function(){J(t.onload)&&t.onload(),o()},c.onerror=t.onerror;var i=t.getAttribute("nonce");return i&&c.setAttribute("nonce",i),document.getElementsByTagName("head")[0].appendChild(c),t.parentElement.removeChild(t),c}function lr(t,n,o){void 0===o&&(o=ot);var c=t.defer||t.async,i=function(){for(var t=[],r=0,e=void 0;r<20;++r)e=Math.floor(Math.random()*nt.length),t.push(nt.charAt(e));return t.join("").toLowerCase()}();console.log(document.currentScript),c||"loading"!==document.readyState?(ar.debug(r.MESSAGE_START_DYNAMIC_SCRIPT,n),fr(t,n,i,o)):(ar.debug(r.MESSAGE_START_STATIC_SCRIPT,n),-1===navigator.userAgent.toLowerCase().indexOf("firefox")?function(t,r,n,o){void 0===o&&(o=ot),console.log("rewriteSrc",r),t.setAttribute(e,n),t.src=r,t.type="text/javascript";var c=t.onload;t.onload=function(){J(c)&&c(),o()}}(t,n,i,o):(t.async=!1,t.defer=!0,fr(t,n,i,o)))}var pr=ir();var sr=ir();var vr=function(n,c){var i,u;if(i=n.logLevel,u=n.logProvider,i&&sr.setLevel(i),u&&sr.setProvider(u),!n)throw new Error(t.ERR_CONFIG_SDK_INIT_OPTION);this._initiated=!0,function(n,c,i){var u=ut(n),a=tr(c),f=i||location.protocol;function l(t,r){return!!r&&!t.getAttribute(e)&&!!u(r)}new MutationObserver((function(t){t.forEach((function(t){t.addedNodes.forEach((function(t){if(1===t.nodeType&&"SCRIPT"===t.tagName){var e=t.src,n=l(t,e);if(pr.debug(r.MESSAGE_GOT_SCRIPT,n?'😇 matched "'+e+'"':'😈 not matched "'+e+'"'),l(t,e)){t.type="javascript/blocked";var o=function(r){"javascript/blocked"===t.getAttribute("type")&&r.preventDefault(),t.removeEventListener("beforescriptexecute",o)};t.addEventListener("beforescriptexecute",o);var c=f+"//"+a(e)+u(e);pr.debug(r.MESSAGE_BLOCKED_SCRIPT,e,c),lr(t,c,(function(){pr.debug(r.MESSAGE_SCRIPT_LOADED,c)}))}}}))}))})).observe(document.documentElement,{childList:!0,subtree:!0});var p=document.createElement;document.createElement=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];if("script"!==r[0].toLowerCase())return p.bind(document).apply(void 0,o(r));var n=p.bind(document).apply(void 0,o(r)),c=n.setAttribute.bind(n);try{Object.defineProperties(n,{src:{get:function(){return n.getAttribute("src")},set:function(t){return l(n,t)&&c("type","javascript/blocked"),c("src",t),!0}},type:{set:function(t){var r=t;return l(n,n.src)&&(r="javascript/blocked"),c("type",r),!0}}}),n.setAttribute=function(t,r){"type"===t||"src"===t?n[t]=r:HTMLScriptElement.prototype.setAttribute.call(n,t,r)}}catch(r){pr.error(t.ERR_PATCHING_SCRIPT,n.src,r)}return n}}(n.path,n.host,n.protocol),"function"==typeof c&&c()};return vr.version="0.1.0",vr._initiated=!1,vr.init=vr,vr}));
//# sourceMappingURL=wp-proxy.umd.js.map