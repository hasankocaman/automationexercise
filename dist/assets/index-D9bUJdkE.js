(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=r(a);fetch(a.href,i)}})();const bu="modulepreload",wu=function(e){return"/automationexercise/"+e},vo={},Su=function(t,r,s){let a=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));a=Promise.allSettled(r.map(c=>{if(c=wu(c),c in vo)return;vo[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":bu,d||(m.as="script"),m.crossOrigin="",m.href=c,l&&m.setAttribute("nonce",l),document.head.appendChild(m),d)return new Promise((x,f)=>{m.addEventListener("load",x),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return a.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};var Bl={exports:{}},ks={},$l={exports:{}},O={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mn=Symbol.for("react.element"),Eu=Symbol.for("react.portal"),Tu=Symbol.for("react.fragment"),Nu=Symbol.for("react.strict_mode"),ku=Symbol.for("react.profiler"),ju=Symbol.for("react.provider"),Cu=Symbol.for("react.context"),Pu=Symbol.for("react.forward_ref"),Ru=Symbol.for("react.suspense"),Au=Symbol.for("react.memo"),Lu=Symbol.for("react.lazy"),bo=Symbol.iterator;function Iu(e){return e===null||typeof e!="object"?null:(e=bo&&e[bo]||e["@@iterator"],typeof e=="function"?e:null)}var Hl={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},zl=Object.assign,Wl={};function wr(e,t,r){this.props=e,this.context=t,this.refs=Wl,this.updater=r||Hl}wr.prototype.isReactComponent={};wr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};wr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ql(){}ql.prototype=wr.prototype;function hi(e,t,r){this.props=e,this.context=t,this.refs=Wl,this.updater=r||Hl}var fi=hi.prototype=new ql;fi.constructor=hi;zl(fi,wr.prototype);fi.isPureReactComponent=!0;var wo=Array.isArray,Gl=Object.prototype.hasOwnProperty,gi={current:null},Vl={key:!0,ref:!0,__self:!0,__source:!0};function Jl(e,t,r){var s,a={},i=null,o=null;if(t!=null)for(s in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)Gl.call(t,s)&&!Vl.hasOwnProperty(s)&&(a[s]=t[s]);var l=arguments.length-2;if(l===1)a.children=r;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}if(e&&e.defaultProps)for(s in l=e.defaultProps,l)a[s]===void 0&&(a[s]=l[s]);return{$$typeof:mn,type:e,key:i,ref:o,props:a,_owner:gi.current}}function _u(e,t){return{$$typeof:mn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function yi(e){return typeof e=="object"&&e!==null&&e.$$typeof===mn}function Ou(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var So=/\/+/g;function qs(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ou(""+e.key):t.toString(36)}function Bn(e,t,r,s,a){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case mn:case Eu:o=!0}}if(o)return o=e,a=a(o),e=s===""?"."+qs(o,0):s,wo(a)?(r="",e!=null&&(r=e.replace(So,"$&/")+"/"),Bn(a,t,r,"",function(d){return d})):a!=null&&(yi(a)&&(a=_u(a,r+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(So,"$&/")+"/")+e)),t.push(a)),1;if(o=0,s=s===""?".":s+":",wo(e))for(var l=0;l<e.length;l++){i=e[l];var c=s+qs(i,l);o+=Bn(i,t,r,c,a)}else if(c=Iu(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=s+qs(i,l++),o+=Bn(i,t,r,c,a);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Sn(e,t,r){if(e==null)return e;var s=[],a=0;return Bn(e,s,"","",function(i){return t.call(r,i,a++)}),s}function Du(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var me={current:null},$n={transition:null},Uu={ReactCurrentDispatcher:me,ReactCurrentBatchConfig:$n,ReactCurrentOwner:gi};function Kl(){throw Error("act(...) is not supported in production builds of React.")}O.Children={map:Sn,forEach:function(e,t,r){Sn(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return Sn(e,function(){t++}),t},toArray:function(e){return Sn(e,function(t){return t})||[]},only:function(e){if(!yi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};O.Component=wr;O.Fragment=Tu;O.Profiler=ku;O.PureComponent=hi;O.StrictMode=Nu;O.Suspense=Ru;O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Uu;O.act=Kl;O.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=zl({},e.props),a=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=gi.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Gl.call(t,c)&&!Vl.hasOwnProperty(c)&&(s[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)s.children=r;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}return{$$typeof:mn,type:e.type,key:a,ref:i,props:s,_owner:o}};O.createContext=function(e){return e={$$typeof:Cu,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ju,_context:e},e.Consumer=e};O.createElement=Jl;O.createFactory=function(e){var t=Jl.bind(null,e);return t.type=e,t};O.createRef=function(){return{current:null}};O.forwardRef=function(e){return{$$typeof:Pu,render:e}};O.isValidElement=yi;O.lazy=function(e){return{$$typeof:Lu,_payload:{_status:-1,_result:e},_init:Du}};O.memo=function(e,t){return{$$typeof:Au,type:e,compare:t===void 0?null:t}};O.startTransition=function(e){var t=$n.transition;$n.transition={};try{e()}finally{$n.transition=t}};O.unstable_act=Kl;O.useCallback=function(e,t){return me.current.useCallback(e,t)};O.useContext=function(e){return me.current.useContext(e)};O.useDebugValue=function(){};O.useDeferredValue=function(e){return me.current.useDeferredValue(e)};O.useEffect=function(e,t){return me.current.useEffect(e,t)};O.useId=function(){return me.current.useId()};O.useImperativeHandle=function(e,t,r){return me.current.useImperativeHandle(e,t,r)};O.useInsertionEffect=function(e,t){return me.current.useInsertionEffect(e,t)};O.useLayoutEffect=function(e,t){return me.current.useLayoutEffect(e,t)};O.useMemo=function(e,t){return me.current.useMemo(e,t)};O.useReducer=function(e,t,r){return me.current.useReducer(e,t,r)};O.useRef=function(e){return me.current.useRef(e)};O.useState=function(e){return me.current.useState(e)};O.useSyncExternalStore=function(e,t,r){return me.current.useSyncExternalStore(e,t,r)};O.useTransition=function(){return me.current.useTransition()};O.version="18.3.1";$l.exports=O;var v=$l.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fu=v,Mu=Symbol.for("react.element"),Bu=Symbol.for("react.fragment"),$u=Object.prototype.hasOwnProperty,Hu=Fu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,zu={key:!0,ref:!0,__self:!0,__source:!0};function Yl(e,t,r){var s,a={},i=null,o=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(s in t)$u.call(t,s)&&!zu.hasOwnProperty(s)&&(a[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)a[s]===void 0&&(a[s]=t[s]);return{$$typeof:Mu,type:e,key:i,ref:o,props:a,_owner:Hu.current}}ks.Fragment=Bu;ks.jsx=Yl;ks.jsxs=Yl;Bl.exports=ks;var n=Bl.exports,Ql={exports:{}},Ne={},Xl={exports:{}},Zl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,L){var _=P.length;P.push(L);e:for(;0<_;){var F=_-1>>>1,T=P[F];if(0<a(T,L))P[F]=L,P[_]=T,_=F;else break e}}function r(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var L=P[0],_=P.pop();if(_!==L){P[0]=_;e:for(var F=0,T=P.length,M=T>>>1;F<M;){var W=2*(F+1)-1,de=P[W],At=W+1,wn=P[At];if(0>a(de,_))At<T&&0>a(wn,de)?(P[F]=wn,P[At]=_,F=At):(P[F]=de,P[W]=_,F=W);else if(At<T&&0>a(wn,_))P[F]=wn,P[At]=_,F=At;else break e}}return L}function a(P,L){var _=P.sortIndex-L.sortIndex;return _!==0?_:P.id-L.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var c=[],d=[],h=1,m=null,x=3,f=!1,w=!1,y=!1,b=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(P){for(var L=r(d);L!==null;){if(L.callback===null)s(d);else if(L.startTime<=P)s(d),L.sortIndex=L.expirationTime,t(c,L);else break;L=r(d)}}function S(P){if(y=!1,g(P),!w)if(r(c)!==null)w=!0,Nr(E);else{var L=r(d);L!==null&&Vt(S,L.startTime-P)}}function E(P,L){w=!1,y&&(y=!1,p(C),C=-1),f=!0;var _=x;try{for(g(L),m=r(c);m!==null&&(!(m.expirationTime>L)||P&&!X());){var F=m.callback;if(typeof F=="function"){m.callback=null,x=m.priorityLevel;var T=F(m.expirationTime<=L);L=e.unstable_now(),typeof T=="function"?m.callback=T:m===r(c)&&s(c),g(L)}else s(c);m=r(c)}if(m!==null)var M=!0;else{var W=r(d);W!==null&&Vt(S,W.startTime-L),M=!1}return M}finally{m=null,x=_,f=!1}}var k=!1,j=null,C=-1,I=5,A=-1;function X(){return!(e.unstable_now()-A<I)}function Ye(){if(j!==null){var P=e.unstable_now();A=P;var L=!0;try{L=j(!0,P)}finally{L?_e():(k=!1,j=null)}}else k=!1}var _e;if(typeof u=="function")_e=function(){u(Ye)};else if(typeof MessageChannel<"u"){var Qe=new MessageChannel,fe=Qe.port2;Qe.port1.onmessage=Ye,_e=function(){fe.postMessage(null)}}else _e=function(){b(Ye,0)};function Nr(P){j=P,k||(k=!0,_e())}function Vt(P,L){C=b(function(){P(e.unstable_now())},L)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){w||f||(w=!0,Nr(E))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return x},e.unstable_getFirstCallbackNode=function(){return r(c)},e.unstable_next=function(P){switch(x){case 1:case 2:case 3:var L=3;break;default:L=x}var _=x;x=L;try{return P()}finally{x=_}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,L){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var _=x;x=P;try{return L()}finally{x=_}},e.unstable_scheduleCallback=function(P,L,_){var F=e.unstable_now();switch(typeof _=="object"&&_!==null?(_=_.delay,_=typeof _=="number"&&0<_?F+_:F):_=F,P){case 1:var T=-1;break;case 2:T=250;break;case 5:T=1073741823;break;case 4:T=1e4;break;default:T=5e3}return T=_+T,P={id:h++,callback:L,priorityLevel:P,startTime:_,expirationTime:T,sortIndex:-1},_>F?(P.sortIndex=_,t(d,P),r(c)===null&&P===r(d)&&(y?(p(C),C=-1):y=!0,Vt(S,_-F))):(P.sortIndex=T,t(c,P),w||f||(w=!0,Nr(E))),P},e.unstable_shouldYield=X,e.unstable_wrapCallback=function(P){var L=x;return function(){var _=x;x=L;try{return P.apply(this,arguments)}finally{x=_}}}})(Zl);Xl.exports=Zl;var Wu=Xl.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qu=v,Te=Wu;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ec=new Set,Jr={};function Wt(e,t){hr(e,t),hr(e+"Capture",t)}function hr(e,t){for(Jr[e]=t,e=0;e<t.length;e++)ec.add(t[e])}var nt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ba=Object.prototype.hasOwnProperty,Gu=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Eo={},To={};function Vu(e){return ba.call(To,e)?!0:ba.call(Eo,e)?!1:Gu.test(e)?To[e]=!0:(Eo[e]=!0,!1)}function Ju(e,t,r,s){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ku(e,t,r,s){if(t===null||typeof t>"u"||Ju(e,t,r,s))return!0;if(s)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function he(e,t,r,s,a,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=a,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var ae={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ae[e]=new he(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ae[t]=new he(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ae[e]=new he(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ae[e]=new he(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ae[e]=new he(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ae[e]=new he(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ae[e]=new he(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ae[e]=new he(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ae[e]=new he(e,5,!1,e.toLowerCase(),null,!1,!1)});var xi=/[\-:]([a-z])/g;function vi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(xi,vi);ae[t]=new he(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(xi,vi);ae[t]=new he(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(xi,vi);ae[t]=new he(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ae[e]=new he(e,1,!1,e.toLowerCase(),null,!1,!1)});ae.xlinkHref=new he("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ae[e]=new he(e,1,!1,e.toLowerCase(),null,!0,!0)});function bi(e,t,r,s){var a=ae.hasOwnProperty(t)?ae[t]:null;(a!==null?a.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ku(t,r,a,s)&&(r=null),s||a===null?Vu(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):a.mustUseProperty?e[a.propertyName]=r===null?a.type===3?!1:"":r:(t=a.attributeName,s=a.attributeNamespace,r===null?e.removeAttribute(t):(a=a.type,r=a===3||a===4&&r===!0?"":""+r,s?e.setAttributeNS(s,t,r):e.setAttribute(t,r))))}var lt=qu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,En=Symbol.for("react.element"),Yt=Symbol.for("react.portal"),Qt=Symbol.for("react.fragment"),wi=Symbol.for("react.strict_mode"),wa=Symbol.for("react.profiler"),tc=Symbol.for("react.provider"),rc=Symbol.for("react.context"),Si=Symbol.for("react.forward_ref"),Sa=Symbol.for("react.suspense"),Ea=Symbol.for("react.suspense_list"),Ei=Symbol.for("react.memo"),pt=Symbol.for("react.lazy"),nc=Symbol.for("react.offscreen"),No=Symbol.iterator;function kr(e){return e===null||typeof e!="object"?null:(e=No&&e[No]||e["@@iterator"],typeof e=="function"?e:null)}var J=Object.assign,Gs;function Or(e){if(Gs===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Gs=t&&t[1]||""}return`
`+Gs+e}var Vs=!1;function Js(e,t){if(!e||Vs)return"";Vs=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var s=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){s=d}e.call(t.prototype)}else{try{throw Error()}catch(d){s=d}e()}}catch(d){if(d&&s&&typeof d.stack=="string"){for(var a=d.stack.split(`
`),i=s.stack.split(`
`),o=a.length-1,l=i.length-1;1<=o&&0<=l&&a[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(a[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||a[o]!==i[l]){var c=`
`+a[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=l);break}}}finally{Vs=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?Or(e):""}function Yu(e){switch(e.tag){case 5:return Or(e.type);case 16:return Or("Lazy");case 13:return Or("Suspense");case 19:return Or("SuspenseList");case 0:case 2:case 15:return e=Js(e.type,!1),e;case 11:return e=Js(e.type.render,!1),e;case 1:return e=Js(e.type,!0),e;default:return""}}function Ta(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Qt:return"Fragment";case Yt:return"Portal";case wa:return"Profiler";case wi:return"StrictMode";case Sa:return"Suspense";case Ea:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case rc:return(e.displayName||"Context")+".Consumer";case tc:return(e._context.displayName||"Context")+".Provider";case Si:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ei:return t=e.displayName||null,t!==null?t:Ta(e.type)||"Memo";case pt:t=e._payload,e=e._init;try{return Ta(e(t))}catch{}}return null}function Qu(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ta(t);case 8:return t===wi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function kt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function sc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Xu(e){var t=sc(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var a=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){s=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return s},setValue:function(o){s=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Tn(e){e._valueTracker||(e._valueTracker=Xu(e))}function ac(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),s="";return e&&(s=sc(e)?e.checked?"true":"false":e.value),e=s,e!==r?(t.setValue(e),!0):!1}function es(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Na(e,t){var r=t.checked;return J({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function ko(e,t){var r=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;r=kt(t.value!=null?t.value:r),e._wrapperState={initialChecked:s,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ic(e,t){t=t.checked,t!=null&&bi(e,"checked",t,!1)}function ka(e,t){ic(e,t);var r=kt(t.value),s=t.type;if(r!=null)s==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ja(e,t.type,r):t.hasOwnProperty("defaultValue")&&ja(e,t.type,kt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function jo(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function ja(e,t,r){(t!=="number"||es(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Dr=Array.isArray;function lr(e,t,r,s){if(e=e.options,t){t={};for(var a=0;a<r.length;a++)t["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=t.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&s&&(e[r].defaultSelected=!0)}else{for(r=""+kt(r),t=null,a=0;a<e.length;a++){if(e[a].value===r){e[a].selected=!0,s&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Ca(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return J({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Co(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(N(92));if(Dr(r)){if(1<r.length)throw Error(N(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:kt(r)}}function oc(e,t){var r=kt(t.value),s=kt(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),s!=null&&(e.defaultValue=""+s)}function Po(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function lc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Pa(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?lc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Nn,cc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,s,a){MSApp.execUnsafeLocalFunction(function(){return e(t,r,s,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Nn=Nn||document.createElement("div"),Nn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Nn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Kr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Mr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Zu=["Webkit","ms","Moz","O"];Object.keys(Mr).forEach(function(e){Zu.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Mr[t]=Mr[e]})});function dc(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Mr.hasOwnProperty(e)&&Mr[e]?(""+t).trim():t+"px"}function uc(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var s=r.indexOf("--")===0,a=dc(r,t[r],s);r==="float"&&(r="cssFloat"),s?e.setProperty(r,a):e[r]=a}}var ep=J({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ra(e,t){if(t){if(ep[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function Aa(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var La=null;function Ti(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ia=null,cr=null,dr=null;function Ro(e){if(e=gn(e)){if(typeof Ia!="function")throw Error(N(280));var t=e.stateNode;t&&(t=As(t),Ia(e.stateNode,e.type,t))}}function pc(e){cr?dr?dr.push(e):dr=[e]:cr=e}function mc(){if(cr){var e=cr,t=dr;if(dr=cr=null,Ro(e),t)for(e=0;e<t.length;e++)Ro(t[e])}}function hc(e,t){return e(t)}function fc(){}var Ks=!1;function gc(e,t,r){if(Ks)return e(t,r);Ks=!0;try{return hc(e,t,r)}finally{Ks=!1,(cr!==null||dr!==null)&&(fc(),mc())}}function Yr(e,t){var r=e.stateNode;if(r===null)return null;var s=As(r);if(s===null)return null;r=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(N(231,t,typeof r));return r}var _a=!1;if(nt)try{var jr={};Object.defineProperty(jr,"passive",{get:function(){_a=!0}}),window.addEventListener("test",jr,jr),window.removeEventListener("test",jr,jr)}catch{_a=!1}function tp(e,t,r,s,a,i,o,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(h){this.onError(h)}}var Br=!1,ts=null,rs=!1,Oa=null,rp={onError:function(e){Br=!0,ts=e}};function np(e,t,r,s,a,i,o,l,c){Br=!1,ts=null,tp.apply(rp,arguments)}function sp(e,t,r,s,a,i,o,l,c){if(np.apply(this,arguments),Br){if(Br){var d=ts;Br=!1,ts=null}else throw Error(N(198));rs||(rs=!0,Oa=d)}}function qt(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function yc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ao(e){if(qt(e)!==e)throw Error(N(188))}function ap(e){var t=e.alternate;if(!t){if(t=qt(e),t===null)throw Error(N(188));return t!==e?null:e}for(var r=e,s=t;;){var a=r.return;if(a===null)break;var i=a.alternate;if(i===null){if(s=a.return,s!==null){r=s;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===r)return Ao(a),e;if(i===s)return Ao(a),t;i=i.sibling}throw Error(N(188))}if(r.return!==s.return)r=a,s=i;else{for(var o=!1,l=a.child;l;){if(l===r){o=!0,r=a,s=i;break}if(l===s){o=!0,s=a,r=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===r){o=!0,r=i,s=a;break}if(l===s){o=!0,s=i,r=a;break}l=l.sibling}if(!o)throw Error(N(189))}}if(r.alternate!==s)throw Error(N(190))}if(r.tag!==3)throw Error(N(188));return r.stateNode.current===r?e:t}function xc(e){return e=ap(e),e!==null?vc(e):null}function vc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=vc(e);if(t!==null)return t;e=e.sibling}return null}var bc=Te.unstable_scheduleCallback,Lo=Te.unstable_cancelCallback,ip=Te.unstable_shouldYield,op=Te.unstable_requestPaint,Y=Te.unstable_now,lp=Te.unstable_getCurrentPriorityLevel,Ni=Te.unstable_ImmediatePriority,wc=Te.unstable_UserBlockingPriority,ns=Te.unstable_NormalPriority,cp=Te.unstable_LowPriority,Sc=Te.unstable_IdlePriority,js=null,Je=null;function dp(e){if(Je&&typeof Je.onCommitFiberRoot=="function")try{Je.onCommitFiberRoot(js,e,void 0,(e.current.flags&128)===128)}catch{}}var Me=Math.clz32?Math.clz32:mp,up=Math.log,pp=Math.LN2;function mp(e){return e>>>=0,e===0?32:31-(up(e)/pp|0)|0}var kn=64,jn=4194304;function Ur(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ss(e,t){var r=e.pendingLanes;if(r===0)return 0;var s=0,a=e.suspendedLanes,i=e.pingedLanes,o=r&268435455;if(o!==0){var l=o&~a;l!==0?s=Ur(l):(i&=o,i!==0&&(s=Ur(i)))}else o=r&~a,o!==0?s=Ur(o):i!==0&&(s=Ur(i));if(s===0)return 0;if(t!==0&&t!==s&&!(t&a)&&(a=s&-s,i=t&-t,a>=i||a===16&&(i&4194240)!==0))return t;if(s&4&&(s|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)r=31-Me(t),a=1<<r,s|=e[r],t&=~a;return s}function hp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function fp(e,t){for(var r=e.suspendedLanes,s=e.pingedLanes,a=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Me(i),l=1<<o,c=a[o];c===-1?(!(l&r)||l&s)&&(a[o]=hp(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function Da(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ec(){var e=kn;return kn<<=1,!(kn&4194240)&&(kn=64),e}function Ys(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function hn(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Me(t),e[t]=r}function gp(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<r;){var a=31-Me(r),i=1<<a;t[a]=0,s[a]=-1,e[a]=-1,r&=~i}}function ki(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var s=31-Me(r),a=1<<s;a&t|e[s]&t&&(e[s]|=t),r&=~a}}var U=0;function Tc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Nc,ji,kc,jc,Cc,Ua=!1,Cn=[],xt=null,vt=null,bt=null,Qr=new Map,Xr=new Map,ht=[],yp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Io(e,t){switch(e){case"focusin":case"focusout":xt=null;break;case"dragenter":case"dragleave":vt=null;break;case"mouseover":case"mouseout":bt=null;break;case"pointerover":case"pointerout":Qr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xr.delete(t.pointerId)}}function Cr(e,t,r,s,a,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:s,nativeEvent:i,targetContainers:[a]},t!==null&&(t=gn(t),t!==null&&ji(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function xp(e,t,r,s,a){switch(t){case"focusin":return xt=Cr(xt,e,t,r,s,a),!0;case"dragenter":return vt=Cr(vt,e,t,r,s,a),!0;case"mouseover":return bt=Cr(bt,e,t,r,s,a),!0;case"pointerover":var i=a.pointerId;return Qr.set(i,Cr(Qr.get(i)||null,e,t,r,s,a)),!0;case"gotpointercapture":return i=a.pointerId,Xr.set(i,Cr(Xr.get(i)||null,e,t,r,s,a)),!0}return!1}function Pc(e){var t=_t(e.target);if(t!==null){var r=qt(t);if(r!==null){if(t=r.tag,t===13){if(t=yc(r),t!==null){e.blockedOn=t,Cc(e.priority,function(){kc(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Hn(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Fa(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);La=s,r.target.dispatchEvent(s),La=null}else return t=gn(r),t!==null&&ji(t),e.blockedOn=r,!1;t.shift()}return!0}function _o(e,t,r){Hn(e)&&r.delete(t)}function vp(){Ua=!1,xt!==null&&Hn(xt)&&(xt=null),vt!==null&&Hn(vt)&&(vt=null),bt!==null&&Hn(bt)&&(bt=null),Qr.forEach(_o),Xr.forEach(_o)}function Pr(e,t){e.blockedOn===t&&(e.blockedOn=null,Ua||(Ua=!0,Te.unstable_scheduleCallback(Te.unstable_NormalPriority,vp)))}function Zr(e){function t(a){return Pr(a,e)}if(0<Cn.length){Pr(Cn[0],e);for(var r=1;r<Cn.length;r++){var s=Cn[r];s.blockedOn===e&&(s.blockedOn=null)}}for(xt!==null&&Pr(xt,e),vt!==null&&Pr(vt,e),bt!==null&&Pr(bt,e),Qr.forEach(t),Xr.forEach(t),r=0;r<ht.length;r++)s=ht[r],s.blockedOn===e&&(s.blockedOn=null);for(;0<ht.length&&(r=ht[0],r.blockedOn===null);)Pc(r),r.blockedOn===null&&ht.shift()}var ur=lt.ReactCurrentBatchConfig,as=!0;function bp(e,t,r,s){var a=U,i=ur.transition;ur.transition=null;try{U=1,Ci(e,t,r,s)}finally{U=a,ur.transition=i}}function wp(e,t,r,s){var a=U,i=ur.transition;ur.transition=null;try{U=4,Ci(e,t,r,s)}finally{U=a,ur.transition=i}}function Ci(e,t,r,s){if(as){var a=Fa(e,t,r,s);if(a===null)ia(e,t,s,is,r),Io(e,s);else if(xp(a,e,t,r,s))s.stopPropagation();else if(Io(e,s),t&4&&-1<yp.indexOf(e)){for(;a!==null;){var i=gn(a);if(i!==null&&Nc(i),i=Fa(e,t,r,s),i===null&&ia(e,t,s,is,r),i===a)break;a=i}a!==null&&s.stopPropagation()}else ia(e,t,s,null,r)}}var is=null;function Fa(e,t,r,s){if(is=null,e=Ti(s),e=_t(e),e!==null)if(t=qt(e),t===null)e=null;else if(r=t.tag,r===13){if(e=yc(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return is=e,null}function Rc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(lp()){case Ni:return 1;case wc:return 4;case ns:case cp:return 16;case Sc:return 536870912;default:return 16}default:return 16}}var gt=null,Pi=null,zn=null;function Ac(){if(zn)return zn;var e,t=Pi,r=t.length,s,a="value"in gt?gt.value:gt.textContent,i=a.length;for(e=0;e<r&&t[e]===a[e];e++);var o=r-e;for(s=1;s<=o&&t[r-s]===a[i-s];s++);return zn=a.slice(e,1<s?1-s:void 0)}function Wn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Pn(){return!0}function Oo(){return!1}function ke(e){function t(r,s,a,i,o){this._reactName=r,this._targetInst=a,this.type=s,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(r=e[l],this[l]=r?r(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Pn:Oo,this.isPropagationStopped=Oo,this}return J(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Pn)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Pn)},persist:function(){},isPersistent:Pn}),t}var Sr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ri=ke(Sr),fn=J({},Sr,{view:0,detail:0}),Sp=ke(fn),Qs,Xs,Rr,Cs=J({},fn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ai,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Rr&&(Rr&&e.type==="mousemove"?(Qs=e.screenX-Rr.screenX,Xs=e.screenY-Rr.screenY):Xs=Qs=0,Rr=e),Qs)},movementY:function(e){return"movementY"in e?e.movementY:Xs}}),Do=ke(Cs),Ep=J({},Cs,{dataTransfer:0}),Tp=ke(Ep),Np=J({},fn,{relatedTarget:0}),Zs=ke(Np),kp=J({},Sr,{animationName:0,elapsedTime:0,pseudoElement:0}),jp=ke(kp),Cp=J({},Sr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Pp=ke(Cp),Rp=J({},Sr,{data:0}),Uo=ke(Rp),Ap={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Lp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ip={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _p(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ip[e])?!!t[e]:!1}function Ai(){return _p}var Op=J({},fn,{key:function(e){if(e.key){var t=Ap[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Lp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ai,charCode:function(e){return e.type==="keypress"?Wn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Dp=ke(Op),Up=J({},Cs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Fo=ke(Up),Fp=J({},fn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ai}),Mp=ke(Fp),Bp=J({},Sr,{propertyName:0,elapsedTime:0,pseudoElement:0}),$p=ke(Bp),Hp=J({},Cs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),zp=ke(Hp),Wp=[9,13,27,32],Li=nt&&"CompositionEvent"in window,$r=null;nt&&"documentMode"in document&&($r=document.documentMode);var qp=nt&&"TextEvent"in window&&!$r,Lc=nt&&(!Li||$r&&8<$r&&11>=$r),Mo=" ",Bo=!1;function Ic(e,t){switch(e){case"keyup":return Wp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _c(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xt=!1;function Gp(e,t){switch(e){case"compositionend":return _c(t);case"keypress":return t.which!==32?null:(Bo=!0,Mo);case"textInput":return e=t.data,e===Mo&&Bo?null:e;default:return null}}function Vp(e,t){if(Xt)return e==="compositionend"||!Li&&Ic(e,t)?(e=Ac(),zn=Pi=gt=null,Xt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Lc&&t.locale!=="ko"?null:t.data;default:return null}}var Jp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $o(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Jp[e.type]:t==="textarea"}function Oc(e,t,r,s){pc(s),t=os(t,"onChange"),0<t.length&&(r=new Ri("onChange","change",null,r,s),e.push({event:r,listeners:t}))}var Hr=null,en=null;function Kp(e){Gc(e,0)}function Ps(e){var t=tr(e);if(ac(t))return e}function Yp(e,t){if(e==="change")return t}var Dc=!1;if(nt){var ea;if(nt){var ta="oninput"in document;if(!ta){var Ho=document.createElement("div");Ho.setAttribute("oninput","return;"),ta=typeof Ho.oninput=="function"}ea=ta}else ea=!1;Dc=ea&&(!document.documentMode||9<document.documentMode)}function zo(){Hr&&(Hr.detachEvent("onpropertychange",Uc),en=Hr=null)}function Uc(e){if(e.propertyName==="value"&&Ps(en)){var t=[];Oc(t,en,e,Ti(e)),gc(Kp,t)}}function Qp(e,t,r){e==="focusin"?(zo(),Hr=t,en=r,Hr.attachEvent("onpropertychange",Uc)):e==="focusout"&&zo()}function Xp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ps(en)}function Zp(e,t){if(e==="click")return Ps(t)}function em(e,t){if(e==="input"||e==="change")return Ps(t)}function tm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var He=typeof Object.is=="function"?Object.is:tm;function tn(e,t){if(He(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),s=Object.keys(t);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var a=r[s];if(!ba.call(t,a)||!He(e[a],t[a]))return!1}return!0}function Wo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function qo(e,t){var r=Wo(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=t&&s>=t)return{node:r,offset:t-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Wo(r)}}function Fc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Fc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Mc(){for(var e=window,t=es();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=es(e.document)}return t}function Ii(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function rm(e){var t=Mc(),r=e.focusedElem,s=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Fc(r.ownerDocument.documentElement,r)){if(s!==null&&Ii(r)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=r.textContent.length,i=Math.min(s.start,a);s=s.end===void 0?i:Math.min(s.end,a),!e.extend&&i>s&&(a=s,s=i,i=a),a=qo(r,i);var o=qo(r,s);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),i>s?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var nm=nt&&"documentMode"in document&&11>=document.documentMode,Zt=null,Ma=null,zr=null,Ba=!1;function Go(e,t,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Ba||Zt==null||Zt!==es(s)||(s=Zt,"selectionStart"in s&&Ii(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),zr&&tn(zr,s)||(zr=s,s=os(Ma,"onSelect"),0<s.length&&(t=new Ri("onSelect","select",null,t,r),e.push({event:t,listeners:s}),t.target=Zt)))}function Rn(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var er={animationend:Rn("Animation","AnimationEnd"),animationiteration:Rn("Animation","AnimationIteration"),animationstart:Rn("Animation","AnimationStart"),transitionend:Rn("Transition","TransitionEnd")},ra={},Bc={};nt&&(Bc=document.createElement("div").style,"AnimationEvent"in window||(delete er.animationend.animation,delete er.animationiteration.animation,delete er.animationstart.animation),"TransitionEvent"in window||delete er.transitionend.transition);function Rs(e){if(ra[e])return ra[e];if(!er[e])return e;var t=er[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Bc)return ra[e]=t[r];return e}var $c=Rs("animationend"),Hc=Rs("animationiteration"),zc=Rs("animationstart"),Wc=Rs("transitionend"),qc=new Map,Vo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ct(e,t){qc.set(e,t),Wt(t,[e])}for(var na=0;na<Vo.length;na++){var sa=Vo[na],sm=sa.toLowerCase(),am=sa[0].toUpperCase()+sa.slice(1);Ct(sm,"on"+am)}Ct($c,"onAnimationEnd");Ct(Hc,"onAnimationIteration");Ct(zc,"onAnimationStart");Ct("dblclick","onDoubleClick");Ct("focusin","onFocus");Ct("focusout","onBlur");Ct(Wc,"onTransitionEnd");hr("onMouseEnter",["mouseout","mouseover"]);hr("onMouseLeave",["mouseout","mouseover"]);hr("onPointerEnter",["pointerout","pointerover"]);hr("onPointerLeave",["pointerout","pointerover"]);Wt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),im=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fr));function Jo(e,t,r){var s=e.type||"unknown-event";e.currentTarget=r,sp(s,t,void 0,e),e.currentTarget=null}function Gc(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],a=s.event;s=s.listeners;e:{var i=void 0;if(t)for(var o=s.length-1;0<=o;o--){var l=s[o],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==i&&a.isPropagationStopped())break e;Jo(a,l,d),i=c}else for(o=0;o<s.length;o++){if(l=s[o],c=l.instance,d=l.currentTarget,l=l.listener,c!==i&&a.isPropagationStopped())break e;Jo(a,l,d),i=c}}}if(rs)throw e=Oa,rs=!1,Oa=null,e}function $(e,t){var r=t[qa];r===void 0&&(r=t[qa]=new Set);var s=e+"__bubble";r.has(s)||(Vc(t,e,2,!1),r.add(s))}function aa(e,t,r){var s=0;t&&(s|=4),Vc(r,e,s,t)}var An="_reactListening"+Math.random().toString(36).slice(2);function rn(e){if(!e[An]){e[An]=!0,ec.forEach(function(r){r!=="selectionchange"&&(im.has(r)||aa(r,!1,e),aa(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[An]||(t[An]=!0,aa("selectionchange",!1,t))}}function Vc(e,t,r,s){switch(Rc(t)){case 1:var a=bp;break;case 4:a=wp;break;default:a=Ci}r=a.bind(null,t,r,e),a=void 0,!_a||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),s?a!==void 0?e.addEventListener(t,r,{capture:!0,passive:a}):e.addEventListener(t,r,!0):a!==void 0?e.addEventListener(t,r,{passive:a}):e.addEventListener(t,r,!1)}function ia(e,t,r,s,a){var i=s;if(!(t&1)&&!(t&2)&&s!==null)e:for(;;){if(s===null)return;var o=s.tag;if(o===3||o===4){var l=s.stateNode.containerInfo;if(l===a||l.nodeType===8&&l.parentNode===a)break;if(o===4)for(o=s.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===a||c.nodeType===8&&c.parentNode===a))return;o=o.return}for(;l!==null;){if(o=_t(l),o===null)return;if(c=o.tag,c===5||c===6){s=i=o;continue e}l=l.parentNode}}s=s.return}gc(function(){var d=i,h=Ti(r),m=[];e:{var x=qc.get(e);if(x!==void 0){var f=Ri,w=e;switch(e){case"keypress":if(Wn(r)===0)break e;case"keydown":case"keyup":f=Dp;break;case"focusin":w="focus",f=Zs;break;case"focusout":w="blur",f=Zs;break;case"beforeblur":case"afterblur":f=Zs;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=Do;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=Tp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=Mp;break;case $c:case Hc:case zc:f=jp;break;case Wc:f=$p;break;case"scroll":f=Sp;break;case"wheel":f=zp;break;case"copy":case"cut":case"paste":f=Pp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=Fo}var y=(t&4)!==0,b=!y&&e==="scroll",p=y?x!==null?x+"Capture":null:x;y=[];for(var u=d,g;u!==null;){g=u;var S=g.stateNode;if(g.tag===5&&S!==null&&(g=S,p!==null&&(S=Yr(u,p),S!=null&&y.push(nn(u,S,g)))),b)break;u=u.return}0<y.length&&(x=new f(x,w,null,r,h),m.push({event:x,listeners:y}))}}if(!(t&7)){e:{if(x=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",x&&r!==La&&(w=r.relatedTarget||r.fromElement)&&(_t(w)||w[st]))break e;if((f||x)&&(x=h.window===h?h:(x=h.ownerDocument)?x.defaultView||x.parentWindow:window,f?(w=r.relatedTarget||r.toElement,f=d,w=w?_t(w):null,w!==null&&(b=qt(w),w!==b||w.tag!==5&&w.tag!==6)&&(w=null)):(f=null,w=d),f!==w)){if(y=Do,S="onMouseLeave",p="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(y=Fo,S="onPointerLeave",p="onPointerEnter",u="pointer"),b=f==null?x:tr(f),g=w==null?x:tr(w),x=new y(S,u+"leave",f,r,h),x.target=b,x.relatedTarget=g,S=null,_t(h)===d&&(y=new y(p,u+"enter",w,r,h),y.target=g,y.relatedTarget=b,S=y),b=S,f&&w)t:{for(y=f,p=w,u=0,g=y;g;g=Jt(g))u++;for(g=0,S=p;S;S=Jt(S))g++;for(;0<u-g;)y=Jt(y),u--;for(;0<g-u;)p=Jt(p),g--;for(;u--;){if(y===p||p!==null&&y===p.alternate)break t;y=Jt(y),p=Jt(p)}y=null}else y=null;f!==null&&Ko(m,x,f,y,!1),w!==null&&b!==null&&Ko(m,b,w,y,!0)}}e:{if(x=d?tr(d):window,f=x.nodeName&&x.nodeName.toLowerCase(),f==="select"||f==="input"&&x.type==="file")var E=Yp;else if($o(x))if(Dc)E=em;else{E=Xp;var k=Qp}else(f=x.nodeName)&&f.toLowerCase()==="input"&&(x.type==="checkbox"||x.type==="radio")&&(E=Zp);if(E&&(E=E(e,d))){Oc(m,E,r,h);break e}k&&k(e,x,d),e==="focusout"&&(k=x._wrapperState)&&k.controlled&&x.type==="number"&&ja(x,"number",x.value)}switch(k=d?tr(d):window,e){case"focusin":($o(k)||k.contentEditable==="true")&&(Zt=k,Ma=d,zr=null);break;case"focusout":zr=Ma=Zt=null;break;case"mousedown":Ba=!0;break;case"contextmenu":case"mouseup":case"dragend":Ba=!1,Go(m,r,h);break;case"selectionchange":if(nm)break;case"keydown":case"keyup":Go(m,r,h)}var j;if(Li)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Xt?Ic(e,r)&&(C="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(C="onCompositionStart");C&&(Lc&&r.locale!=="ko"&&(Xt||C!=="onCompositionStart"?C==="onCompositionEnd"&&Xt&&(j=Ac()):(gt=h,Pi="value"in gt?gt.value:gt.textContent,Xt=!0)),k=os(d,C),0<k.length&&(C=new Uo(C,e,null,r,h),m.push({event:C,listeners:k}),j?C.data=j:(j=_c(r),j!==null&&(C.data=j)))),(j=qp?Gp(e,r):Vp(e,r))&&(d=os(d,"onBeforeInput"),0<d.length&&(h=new Uo("onBeforeInput","beforeinput",null,r,h),m.push({event:h,listeners:d}),h.data=j))}Gc(m,t)})}function nn(e,t,r){return{instance:e,listener:t,currentTarget:r}}function os(e,t){for(var r=t+"Capture",s=[];e!==null;){var a=e,i=a.stateNode;a.tag===5&&i!==null&&(a=i,i=Yr(e,r),i!=null&&s.unshift(nn(e,i,a)),i=Yr(e,t),i!=null&&s.push(nn(e,i,a))),e=e.return}return s}function Jt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ko(e,t,r,s,a){for(var i=t._reactName,o=[];r!==null&&r!==s;){var l=r,c=l.alternate,d=l.stateNode;if(c!==null&&c===s)break;l.tag===5&&d!==null&&(l=d,a?(c=Yr(r,i),c!=null&&o.unshift(nn(r,c,l))):a||(c=Yr(r,i),c!=null&&o.push(nn(r,c,l)))),r=r.return}o.length!==0&&e.push({event:t,listeners:o})}var om=/\r\n?/g,lm=/\u0000|\uFFFD/g;function Yo(e){return(typeof e=="string"?e:""+e).replace(om,`
`).replace(lm,"")}function Ln(e,t,r){if(t=Yo(t),Yo(e)!==t&&r)throw Error(N(425))}function ls(){}var $a=null,Ha=null;function za(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wa=typeof setTimeout=="function"?setTimeout:void 0,cm=typeof clearTimeout=="function"?clearTimeout:void 0,Qo=typeof Promise=="function"?Promise:void 0,dm=typeof queueMicrotask=="function"?queueMicrotask:typeof Qo<"u"?function(e){return Qo.resolve(null).then(e).catch(um)}:Wa;function um(e){setTimeout(function(){throw e})}function oa(e,t){var r=t,s=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&a.nodeType===8)if(r=a.data,r==="/$"){if(s===0){e.removeChild(a),Zr(t);return}s--}else r!=="$"&&r!=="$?"&&r!=="$!"||s++;r=a}while(r);Zr(t)}function wt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Xo(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Er=Math.random().toString(36).slice(2),Ve="__reactFiber$"+Er,sn="__reactProps$"+Er,st="__reactContainer$"+Er,qa="__reactEvents$"+Er,pm="__reactListeners$"+Er,mm="__reactHandles$"+Er;function _t(e){var t=e[Ve];if(t)return t;for(var r=e.parentNode;r;){if(t=r[st]||r[Ve]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Xo(e);e!==null;){if(r=e[Ve])return r;e=Xo(e)}return t}e=r,r=e.parentNode}return null}function gn(e){return e=e[Ve]||e[st],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function tr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function As(e){return e[sn]||null}var Ga=[],rr=-1;function Pt(e){return{current:e}}function H(e){0>rr||(e.current=Ga[rr],Ga[rr]=null,rr--)}function B(e,t){rr++,Ga[rr]=e.current,e.current=t}var jt={},ce=Pt(jt),xe=Pt(!1),Mt=jt;function fr(e,t){var r=e.type.contextTypes;if(!r)return jt;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var a={},i;for(i in r)a[i]=t[i];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ve(e){return e=e.childContextTypes,e!=null}function cs(){H(xe),H(ce)}function Zo(e,t,r){if(ce.current!==jt)throw Error(N(168));B(ce,t),B(xe,r)}function Jc(e,t,r){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return r;s=s.getChildContext();for(var a in s)if(!(a in t))throw Error(N(108,Qu(e)||"Unknown",a));return J({},r,s)}function ds(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||jt,Mt=ce.current,B(ce,e),B(xe,xe.current),!0}function el(e,t,r){var s=e.stateNode;if(!s)throw Error(N(169));r?(e=Jc(e,t,Mt),s.__reactInternalMemoizedMergedChildContext=e,H(xe),H(ce),B(ce,e)):H(xe),B(xe,r)}var Ze=null,Ls=!1,la=!1;function Kc(e){Ze===null?Ze=[e]:Ze.push(e)}function hm(e){Ls=!0,Kc(e)}function Rt(){if(!la&&Ze!==null){la=!0;var e=0,t=U;try{var r=Ze;for(U=1;e<r.length;e++){var s=r[e];do s=s(!0);while(s!==null)}Ze=null,Ls=!1}catch(a){throw Ze!==null&&(Ze=Ze.slice(e+1)),bc(Ni,Rt),a}finally{U=t,la=!1}}return null}var nr=[],sr=0,us=null,ps=0,je=[],Ce=0,Bt=null,et=1,tt="";function Lt(e,t){nr[sr++]=ps,nr[sr++]=us,us=e,ps=t}function Yc(e,t,r){je[Ce++]=et,je[Ce++]=tt,je[Ce++]=Bt,Bt=e;var s=et;e=tt;var a=32-Me(s)-1;s&=~(1<<a),r+=1;var i=32-Me(t)+a;if(30<i){var o=a-a%5;i=(s&(1<<o)-1).toString(32),s>>=o,a-=o,et=1<<32-Me(t)+a|r<<a|s,tt=i+e}else et=1<<i|r<<a|s,tt=e}function _i(e){e.return!==null&&(Lt(e,1),Yc(e,1,0))}function Oi(e){for(;e===us;)us=nr[--sr],nr[sr]=null,ps=nr[--sr],nr[sr]=null;for(;e===Bt;)Bt=je[--Ce],je[Ce]=null,tt=je[--Ce],je[Ce]=null,et=je[--Ce],je[Ce]=null}var Ee=null,Se=null,z=!1,Fe=null;function Qc(e,t){var r=Pe(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function tl(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ee=e,Se=wt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ee=e,Se=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Bt!==null?{id:et,overflow:tt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Pe(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Ee=e,Se=null,!0):!1;default:return!1}}function Va(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ja(e){if(z){var t=Se;if(t){var r=t;if(!tl(e,t)){if(Va(e))throw Error(N(418));t=wt(r.nextSibling);var s=Ee;t&&tl(e,t)?Qc(s,r):(e.flags=e.flags&-4097|2,z=!1,Ee=e)}}else{if(Va(e))throw Error(N(418));e.flags=e.flags&-4097|2,z=!1,Ee=e}}}function rl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ee=e}function In(e){if(e!==Ee)return!1;if(!z)return rl(e),z=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!za(e.type,e.memoizedProps)),t&&(t=Se)){if(Va(e))throw Xc(),Error(N(418));for(;t;)Qc(e,t),t=wt(t.nextSibling)}if(rl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Se=wt(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Se=null}}else Se=Ee?wt(e.stateNode.nextSibling):null;return!0}function Xc(){for(var e=Se;e;)e=wt(e.nextSibling)}function gr(){Se=Ee=null,z=!1}function Di(e){Fe===null?Fe=[e]:Fe.push(e)}var fm=lt.ReactCurrentBatchConfig;function Ar(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(N(309));var s=r.stateNode}if(!s)throw Error(N(147,e));var a=s,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var l=a.refs;o===null?delete l[i]:l[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(N(284));if(!r._owner)throw Error(N(290,e))}return e}function _n(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function nl(e){var t=e._init;return t(e._payload)}function Zc(e){function t(p,u){if(e){var g=p.deletions;g===null?(p.deletions=[u],p.flags|=16):g.push(u)}}function r(p,u){if(!e)return null;for(;u!==null;)t(p,u),u=u.sibling;return null}function s(p,u){for(p=new Map;u!==null;)u.key!==null?p.set(u.key,u):p.set(u.index,u),u=u.sibling;return p}function a(p,u){return p=Nt(p,u),p.index=0,p.sibling=null,p}function i(p,u,g){return p.index=g,e?(g=p.alternate,g!==null?(g=g.index,g<u?(p.flags|=2,u):g):(p.flags|=2,u)):(p.flags|=1048576,u)}function o(p){return e&&p.alternate===null&&(p.flags|=2),p}function l(p,u,g,S){return u===null||u.tag!==6?(u=fa(g,p.mode,S),u.return=p,u):(u=a(u,g),u.return=p,u)}function c(p,u,g,S){var E=g.type;return E===Qt?h(p,u,g.props.children,S,g.key):u!==null&&(u.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===pt&&nl(E)===u.type)?(S=a(u,g.props),S.ref=Ar(p,u,g),S.return=p,S):(S=Qn(g.type,g.key,g.props,null,p.mode,S),S.ref=Ar(p,u,g),S.return=p,S)}function d(p,u,g,S){return u===null||u.tag!==4||u.stateNode.containerInfo!==g.containerInfo||u.stateNode.implementation!==g.implementation?(u=ga(g,p.mode,S),u.return=p,u):(u=a(u,g.children||[]),u.return=p,u)}function h(p,u,g,S,E){return u===null||u.tag!==7?(u=Ft(g,p.mode,S,E),u.return=p,u):(u=a(u,g),u.return=p,u)}function m(p,u,g){if(typeof u=="string"&&u!==""||typeof u=="number")return u=fa(""+u,p.mode,g),u.return=p,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case En:return g=Qn(u.type,u.key,u.props,null,p.mode,g),g.ref=Ar(p,null,u),g.return=p,g;case Yt:return u=ga(u,p.mode,g),u.return=p,u;case pt:var S=u._init;return m(p,S(u._payload),g)}if(Dr(u)||kr(u))return u=Ft(u,p.mode,g,null),u.return=p,u;_n(p,u)}return null}function x(p,u,g,S){var E=u!==null?u.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return E!==null?null:l(p,u,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case En:return g.key===E?c(p,u,g,S):null;case Yt:return g.key===E?d(p,u,g,S):null;case pt:return E=g._init,x(p,u,E(g._payload),S)}if(Dr(g)||kr(g))return E!==null?null:h(p,u,g,S,null);_n(p,g)}return null}function f(p,u,g,S,E){if(typeof S=="string"&&S!==""||typeof S=="number")return p=p.get(g)||null,l(u,p,""+S,E);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case En:return p=p.get(S.key===null?g:S.key)||null,c(u,p,S,E);case Yt:return p=p.get(S.key===null?g:S.key)||null,d(u,p,S,E);case pt:var k=S._init;return f(p,u,g,k(S._payload),E)}if(Dr(S)||kr(S))return p=p.get(g)||null,h(u,p,S,E,null);_n(u,S)}return null}function w(p,u,g,S){for(var E=null,k=null,j=u,C=u=0,I=null;j!==null&&C<g.length;C++){j.index>C?(I=j,j=null):I=j.sibling;var A=x(p,j,g[C],S);if(A===null){j===null&&(j=I);break}e&&j&&A.alternate===null&&t(p,j),u=i(A,u,C),k===null?E=A:k.sibling=A,k=A,j=I}if(C===g.length)return r(p,j),z&&Lt(p,C),E;if(j===null){for(;C<g.length;C++)j=m(p,g[C],S),j!==null&&(u=i(j,u,C),k===null?E=j:k.sibling=j,k=j);return z&&Lt(p,C),E}for(j=s(p,j);C<g.length;C++)I=f(j,p,C,g[C],S),I!==null&&(e&&I.alternate!==null&&j.delete(I.key===null?C:I.key),u=i(I,u,C),k===null?E=I:k.sibling=I,k=I);return e&&j.forEach(function(X){return t(p,X)}),z&&Lt(p,C),E}function y(p,u,g,S){var E=kr(g);if(typeof E!="function")throw Error(N(150));if(g=E.call(g),g==null)throw Error(N(151));for(var k=E=null,j=u,C=u=0,I=null,A=g.next();j!==null&&!A.done;C++,A=g.next()){j.index>C?(I=j,j=null):I=j.sibling;var X=x(p,j,A.value,S);if(X===null){j===null&&(j=I);break}e&&j&&X.alternate===null&&t(p,j),u=i(X,u,C),k===null?E=X:k.sibling=X,k=X,j=I}if(A.done)return r(p,j),z&&Lt(p,C),E;if(j===null){for(;!A.done;C++,A=g.next())A=m(p,A.value,S),A!==null&&(u=i(A,u,C),k===null?E=A:k.sibling=A,k=A);return z&&Lt(p,C),E}for(j=s(p,j);!A.done;C++,A=g.next())A=f(j,p,C,A.value,S),A!==null&&(e&&A.alternate!==null&&j.delete(A.key===null?C:A.key),u=i(A,u,C),k===null?E=A:k.sibling=A,k=A);return e&&j.forEach(function(Ye){return t(p,Ye)}),z&&Lt(p,C),E}function b(p,u,g,S){if(typeof g=="object"&&g!==null&&g.type===Qt&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case En:e:{for(var E=g.key,k=u;k!==null;){if(k.key===E){if(E=g.type,E===Qt){if(k.tag===7){r(p,k.sibling),u=a(k,g.props.children),u.return=p,p=u;break e}}else if(k.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===pt&&nl(E)===k.type){r(p,k.sibling),u=a(k,g.props),u.ref=Ar(p,k,g),u.return=p,p=u;break e}r(p,k);break}else t(p,k);k=k.sibling}g.type===Qt?(u=Ft(g.props.children,p.mode,S,g.key),u.return=p,p=u):(S=Qn(g.type,g.key,g.props,null,p.mode,S),S.ref=Ar(p,u,g),S.return=p,p=S)}return o(p);case Yt:e:{for(k=g.key;u!==null;){if(u.key===k)if(u.tag===4&&u.stateNode.containerInfo===g.containerInfo&&u.stateNode.implementation===g.implementation){r(p,u.sibling),u=a(u,g.children||[]),u.return=p,p=u;break e}else{r(p,u);break}else t(p,u);u=u.sibling}u=ga(g,p.mode,S),u.return=p,p=u}return o(p);case pt:return k=g._init,b(p,u,k(g._payload),S)}if(Dr(g))return w(p,u,g,S);if(kr(g))return y(p,u,g,S);_n(p,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,u!==null&&u.tag===6?(r(p,u.sibling),u=a(u,g),u.return=p,p=u):(r(p,u),u=fa(g,p.mode,S),u.return=p,p=u),o(p)):r(p,u)}return b}var yr=Zc(!0),ed=Zc(!1),ms=Pt(null),hs=null,ar=null,Ui=null;function Fi(){Ui=ar=hs=null}function Mi(e){var t=ms.current;H(ms),e._currentValue=t}function Ka(e,t,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===r)break;e=e.return}}function pr(e,t){hs=e,Ui=ar=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ye=!0),e.firstContext=null)}function Ae(e){var t=e._currentValue;if(Ui!==e)if(e={context:e,memoizedValue:t,next:null},ar===null){if(hs===null)throw Error(N(308));ar=e,hs.dependencies={lanes:0,firstContext:e}}else ar=ar.next=e;return t}var Ot=null;function Bi(e){Ot===null?Ot=[e]:Ot.push(e)}function td(e,t,r,s){var a=t.interleaved;return a===null?(r.next=r,Bi(t)):(r.next=a.next,a.next=r),t.interleaved=r,at(e,s)}function at(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var mt=!1;function $i(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function rd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function rt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function St(e,t,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,D&2){var a=s.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),s.pending=t,at(e,r)}return a=s.interleaved,a===null?(t.next=t,Bi(s)):(t.next=a.next,a.next=t),s.interleaved=t,at(e,r)}function qn(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,ki(e,r)}}function sl(e,t){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var a=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var o={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?a=i=o:i=i.next=o,r=r.next}while(r!==null);i===null?a=i=t:i=i.next=t}else a=i=t;r={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:s.shared,effects:s.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function fs(e,t,r,s){var a=e.updateQueue;mt=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var c=l,d=c.next;c.next=null,o===null?i=d:o.next=d,o=c;var h=e.alternate;h!==null&&(h=h.updateQueue,l=h.lastBaseUpdate,l!==o&&(l===null?h.firstBaseUpdate=d:l.next=d,h.lastBaseUpdate=c))}if(i!==null){var m=a.baseState;o=0,h=d=c=null,l=i;do{var x=l.lane,f=l.eventTime;if((s&x)===x){h!==null&&(h=h.next={eventTime:f,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var w=e,y=l;switch(x=t,f=r,y.tag){case 1:if(w=y.payload,typeof w=="function"){m=w.call(f,m,x);break e}m=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=y.payload,x=typeof w=="function"?w.call(f,m,x):w,x==null)break e;m=J({},m,x);break e;case 2:mt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,x=a.effects,x===null?a.effects=[l]:x.push(l))}else f={eventTime:f,lane:x,tag:l.tag,payload:l.payload,callback:l.callback,next:null},h===null?(d=h=f,c=m):h=h.next=f,o|=x;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;x=l,l=x.next,x.next=null,a.lastBaseUpdate=x,a.shared.pending=null}}while(!0);if(h===null&&(c=m),a.baseState=c,a.firstBaseUpdate=d,a.lastBaseUpdate=h,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else i===null&&(a.shared.lanes=0);Ht|=o,e.lanes=o,e.memoizedState=m}}function al(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],a=s.callback;if(a!==null){if(s.callback=null,s=r,typeof a!="function")throw Error(N(191,a));a.call(s)}}}var yn={},Ke=Pt(yn),an=Pt(yn),on=Pt(yn);function Dt(e){if(e===yn)throw Error(N(174));return e}function Hi(e,t){switch(B(on,t),B(an,e),B(Ke,yn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Pa(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Pa(t,e)}H(Ke),B(Ke,t)}function xr(){H(Ke),H(an),H(on)}function nd(e){Dt(on.current);var t=Dt(Ke.current),r=Pa(t,e.type);t!==r&&(B(an,e),B(Ke,r))}function zi(e){an.current===e&&(H(Ke),H(an))}var q=Pt(0);function gs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ca=[];function Wi(){for(var e=0;e<ca.length;e++)ca[e]._workInProgressVersionPrimary=null;ca.length=0}var Gn=lt.ReactCurrentDispatcher,da=lt.ReactCurrentBatchConfig,$t=0,G=null,Z=null,te=null,ys=!1,Wr=!1,ln=0,gm=0;function ie(){throw Error(N(321))}function qi(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!He(e[r],t[r]))return!1;return!0}function Gi(e,t,r,s,a,i){if($t=i,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Gn.current=e===null||e.memoizedState===null?bm:wm,e=r(s,a),Wr){i=0;do{if(Wr=!1,ln=0,25<=i)throw Error(N(301));i+=1,te=Z=null,t.updateQueue=null,Gn.current=Sm,e=r(s,a)}while(Wr)}if(Gn.current=xs,t=Z!==null&&Z.next!==null,$t=0,te=Z=G=null,ys=!1,t)throw Error(N(300));return e}function Vi(){var e=ln!==0;return ln=0,e}function Ge(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return te===null?G.memoizedState=te=e:te=te.next=e,te}function Le(){if(Z===null){var e=G.alternate;e=e!==null?e.memoizedState:null}else e=Z.next;var t=te===null?G.memoizedState:te.next;if(t!==null)te=t,Z=e;else{if(e===null)throw Error(N(310));Z=e,e={memoizedState:Z.memoizedState,baseState:Z.baseState,baseQueue:Z.baseQueue,queue:Z.queue,next:null},te===null?G.memoizedState=te=e:te=te.next=e}return te}function cn(e,t){return typeof t=="function"?t(e):t}function ua(e){var t=Le(),r=t.queue;if(r===null)throw Error(N(311));r.lastRenderedReducer=e;var s=Z,a=s.baseQueue,i=r.pending;if(i!==null){if(a!==null){var o=a.next;a.next=i.next,i.next=o}s.baseQueue=a=i,r.pending=null}if(a!==null){i=a.next,s=s.baseState;var l=o=null,c=null,d=i;do{var h=d.lane;if(($t&h)===h)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),s=d.hasEagerState?d.eagerState:e(s,d.action);else{var m={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=m,o=s):c=c.next=m,G.lanes|=h,Ht|=h}d=d.next}while(d!==null&&d!==i);c===null?o=s:c.next=l,He(s,t.memoizedState)||(ye=!0),t.memoizedState=s,t.baseState=o,t.baseQueue=c,r.lastRenderedState=s}if(e=r.interleaved,e!==null){a=e;do i=a.lane,G.lanes|=i,Ht|=i,a=a.next;while(a!==e)}else a===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function pa(e){var t=Le(),r=t.queue;if(r===null)throw Error(N(311));r.lastRenderedReducer=e;var s=r.dispatch,a=r.pending,i=t.memoizedState;if(a!==null){r.pending=null;var o=a=a.next;do i=e(i,o.action),o=o.next;while(o!==a);He(i,t.memoizedState)||(ye=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),r.lastRenderedState=i}return[i,s]}function sd(){}function ad(e,t){var r=G,s=Le(),a=t(),i=!He(s.memoizedState,a);if(i&&(s.memoizedState=a,ye=!0),s=s.queue,Ji(ld.bind(null,r,s,e),[e]),s.getSnapshot!==t||i||te!==null&&te.memoizedState.tag&1){if(r.flags|=2048,dn(9,od.bind(null,r,s,a,t),void 0,null),re===null)throw Error(N(349));$t&30||id(r,t,a)}return a}function id(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=G.updateQueue,t===null?(t={lastEffect:null,stores:null},G.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function od(e,t,r,s){t.value=r,t.getSnapshot=s,cd(t)&&dd(e)}function ld(e,t,r){return r(function(){cd(t)&&dd(e)})}function cd(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!He(e,r)}catch{return!0}}function dd(e){var t=at(e,1);t!==null&&Be(t,e,1,-1)}function il(e){var t=Ge();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:cn,lastRenderedState:e},t.queue=e,e=e.dispatch=vm.bind(null,G,e),[t.memoizedState,e]}function dn(e,t,r,s){return e={tag:e,create:t,destroy:r,deps:s,next:null},t=G.updateQueue,t===null?(t={lastEffect:null,stores:null},G.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,t.lastEffect=e)),e}function ud(){return Le().memoizedState}function Vn(e,t,r,s){var a=Ge();G.flags|=e,a.memoizedState=dn(1|t,r,void 0,s===void 0?null:s)}function Is(e,t,r,s){var a=Le();s=s===void 0?null:s;var i=void 0;if(Z!==null){var o=Z.memoizedState;if(i=o.destroy,s!==null&&qi(s,o.deps)){a.memoizedState=dn(t,r,i,s);return}}G.flags|=e,a.memoizedState=dn(1|t,r,i,s)}function ol(e,t){return Vn(8390656,8,e,t)}function Ji(e,t){return Is(2048,8,e,t)}function pd(e,t){return Is(4,2,e,t)}function md(e,t){return Is(4,4,e,t)}function hd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function fd(e,t,r){return r=r!=null?r.concat([e]):null,Is(4,4,hd.bind(null,t,e),r)}function Ki(){}function gd(e,t){var r=Le();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&qi(t,s[1])?s[0]:(r.memoizedState=[e,t],e)}function yd(e,t){var r=Le();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&qi(t,s[1])?s[0]:(e=e(),r.memoizedState=[e,t],e)}function xd(e,t,r){return $t&21?(He(r,t)||(r=Ec(),G.lanes|=r,Ht|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ye=!0),e.memoizedState=r)}function ym(e,t){var r=U;U=r!==0&&4>r?r:4,e(!0);var s=da.transition;da.transition={};try{e(!1),t()}finally{U=r,da.transition=s}}function vd(){return Le().memoizedState}function xm(e,t,r){var s=Tt(e);if(r={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null},bd(e))wd(t,r);else if(r=td(e,t,r,s),r!==null){var a=pe();Be(r,e,s,a),Sd(r,t,s)}}function vm(e,t,r){var s=Tt(e),a={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null};if(bd(e))wd(t,a);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,l=i(o,r);if(a.hasEagerState=!0,a.eagerState=l,He(l,o)){var c=t.interleaved;c===null?(a.next=a,Bi(t)):(a.next=c.next,c.next=a),t.interleaved=a;return}}catch{}finally{}r=td(e,t,a,s),r!==null&&(a=pe(),Be(r,e,s,a),Sd(r,t,s))}}function bd(e){var t=e.alternate;return e===G||t!==null&&t===G}function wd(e,t){Wr=ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Sd(e,t,r){if(r&4194240){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,ki(e,r)}}var xs={readContext:Ae,useCallback:ie,useContext:ie,useEffect:ie,useImperativeHandle:ie,useInsertionEffect:ie,useLayoutEffect:ie,useMemo:ie,useReducer:ie,useRef:ie,useState:ie,useDebugValue:ie,useDeferredValue:ie,useTransition:ie,useMutableSource:ie,useSyncExternalStore:ie,useId:ie,unstable_isNewReconciler:!1},bm={readContext:Ae,useCallback:function(e,t){return Ge().memoizedState=[e,t===void 0?null:t],e},useContext:Ae,useEffect:ol,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Vn(4194308,4,hd.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Vn(4194308,4,e,t)},useInsertionEffect:function(e,t){return Vn(4,2,e,t)},useMemo:function(e,t){var r=Ge();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var s=Ge();return t=r!==void 0?r(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=xm.bind(null,G,e),[s.memoizedState,e]},useRef:function(e){var t=Ge();return e={current:e},t.memoizedState=e},useState:il,useDebugValue:Ki,useDeferredValue:function(e){return Ge().memoizedState=e},useTransition:function(){var e=il(!1),t=e[0];return e=ym.bind(null,e[1]),Ge().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var s=G,a=Ge();if(z){if(r===void 0)throw Error(N(407));r=r()}else{if(r=t(),re===null)throw Error(N(349));$t&30||id(s,t,r)}a.memoizedState=r;var i={value:r,getSnapshot:t};return a.queue=i,ol(ld.bind(null,s,i,e),[e]),s.flags|=2048,dn(9,od.bind(null,s,i,r,t),void 0,null),r},useId:function(){var e=Ge(),t=re.identifierPrefix;if(z){var r=tt,s=et;r=(s&~(1<<32-Me(s)-1)).toString(32)+r,t=":"+t+"R"+r,r=ln++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=gm++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},wm={readContext:Ae,useCallback:gd,useContext:Ae,useEffect:Ji,useImperativeHandle:fd,useInsertionEffect:pd,useLayoutEffect:md,useMemo:yd,useReducer:ua,useRef:ud,useState:function(){return ua(cn)},useDebugValue:Ki,useDeferredValue:function(e){var t=Le();return xd(t,Z.memoizedState,e)},useTransition:function(){var e=ua(cn)[0],t=Le().memoizedState;return[e,t]},useMutableSource:sd,useSyncExternalStore:ad,useId:vd,unstable_isNewReconciler:!1},Sm={readContext:Ae,useCallback:gd,useContext:Ae,useEffect:Ji,useImperativeHandle:fd,useInsertionEffect:pd,useLayoutEffect:md,useMemo:yd,useReducer:pa,useRef:ud,useState:function(){return pa(cn)},useDebugValue:Ki,useDeferredValue:function(e){var t=Le();return Z===null?t.memoizedState=e:xd(t,Z.memoizedState,e)},useTransition:function(){var e=pa(cn)[0],t=Le().memoizedState;return[e,t]},useMutableSource:sd,useSyncExternalStore:ad,useId:vd,unstable_isNewReconciler:!1};function De(e,t){if(e&&e.defaultProps){t=J({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function Ya(e,t,r,s){t=e.memoizedState,r=r(s,t),r=r==null?t:J({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var _s={isMounted:function(e){return(e=e._reactInternals)?qt(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var s=pe(),a=Tt(e),i=rt(s,a);i.payload=t,r!=null&&(i.callback=r),t=St(e,i,a),t!==null&&(Be(t,e,a,s),qn(t,e,a))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var s=pe(),a=Tt(e),i=rt(s,a);i.tag=1,i.payload=t,r!=null&&(i.callback=r),t=St(e,i,a),t!==null&&(Be(t,e,a,s),qn(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=pe(),s=Tt(e),a=rt(r,s);a.tag=2,t!=null&&(a.callback=t),t=St(e,a,s),t!==null&&(Be(t,e,s,r),qn(t,e,s))}};function ll(e,t,r,s,a,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,i,o):t.prototype&&t.prototype.isPureReactComponent?!tn(r,s)||!tn(a,i):!0}function Ed(e,t,r){var s=!1,a=jt,i=t.contextType;return typeof i=="object"&&i!==null?i=Ae(i):(a=ve(t)?Mt:ce.current,s=t.contextTypes,i=(s=s!=null)?fr(e,a):jt),t=new t(r,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=_s,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=i),t}function cl(e,t,r,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,s),t.state!==e&&_s.enqueueReplaceState(t,t.state,null)}function Qa(e,t,r,s){var a=e.stateNode;a.props=r,a.state=e.memoizedState,a.refs={},$i(e);var i=t.contextType;typeof i=="object"&&i!==null?a.context=Ae(i):(i=ve(t)?Mt:ce.current,a.context=fr(e,i)),a.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Ya(e,t,i,r),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&_s.enqueueReplaceState(a,a.state,null),fs(e,r,a,s),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function vr(e,t){try{var r="",s=t;do r+=Yu(s),s=s.return;while(s);var a=r}catch(i){a=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:a,digest:null}}function ma(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Xa(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var Em=typeof WeakMap=="function"?WeakMap:Map;function Td(e,t,r){r=rt(-1,r),r.tag=3,r.payload={element:null};var s=t.value;return r.callback=function(){bs||(bs=!0,li=s),Xa(e,t)},r}function Nd(e,t,r){r=rt(-1,r),r.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var a=t.value;r.payload=function(){return s(a)},r.callback=function(){Xa(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){Xa(e,t),typeof s!="function"&&(Et===null?Et=new Set([this]):Et.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),r}function dl(e,t,r){var s=e.pingCache;if(s===null){s=e.pingCache=new Em;var a=new Set;s.set(t,a)}else a=s.get(t),a===void 0&&(a=new Set,s.set(t,a));a.has(r)||(a.add(r),e=Um.bind(null,e,t,r),t.then(e,e))}function ul(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function pl(e,t,r,s,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=rt(-1,1),t.tag=2,St(r,t,1))),r.lanes|=1),e)}var Tm=lt.ReactCurrentOwner,ye=!1;function ue(e,t,r,s){t.child=e===null?ed(t,null,r,s):yr(t,e.child,r,s)}function ml(e,t,r,s,a){r=r.render;var i=t.ref;return pr(t,a),s=Gi(e,t,r,s,i,a),r=Vi(),e!==null&&!ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,it(e,t,a)):(z&&r&&_i(t),t.flags|=1,ue(e,t,s,a),t.child)}function hl(e,t,r,s,a){if(e===null){var i=r.type;return typeof i=="function"&&!no(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=i,kd(e,t,i,s,a)):(e=Qn(r.type,null,s,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&a)){var o=i.memoizedProps;if(r=r.compare,r=r!==null?r:tn,r(o,s)&&e.ref===t.ref)return it(e,t,a)}return t.flags|=1,e=Nt(i,s),e.ref=t.ref,e.return=t,t.child=e}function kd(e,t,r,s,a){if(e!==null){var i=e.memoizedProps;if(tn(i,s)&&e.ref===t.ref)if(ye=!1,t.pendingProps=s=i,(e.lanes&a)!==0)e.flags&131072&&(ye=!0);else return t.lanes=e.lanes,it(e,t,a)}return Za(e,t,r,s,a)}function jd(e,t,r){var s=t.pendingProps,a=s.children,i=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},B(or,we),we|=r;else{if(!(r&1073741824))return e=i!==null?i.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,B(or,we),we|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=i!==null?i.baseLanes:r,B(or,we),we|=s}else i!==null?(s=i.baseLanes|r,t.memoizedState=null):s=r,B(or,we),we|=s;return ue(e,t,a,r),t.child}function Cd(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Za(e,t,r,s,a){var i=ve(r)?Mt:ce.current;return i=fr(t,i),pr(t,a),r=Gi(e,t,r,s,i,a),s=Vi(),e!==null&&!ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,it(e,t,a)):(z&&s&&_i(t),t.flags|=1,ue(e,t,r,a),t.child)}function fl(e,t,r,s,a){if(ve(r)){var i=!0;ds(t)}else i=!1;if(pr(t,a),t.stateNode===null)Jn(e,t),Ed(t,r,s),Qa(t,r,s,a),s=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var c=o.context,d=r.contextType;typeof d=="object"&&d!==null?d=Ae(d):(d=ve(r)?Mt:ce.current,d=fr(t,d));var h=r.getDerivedStateFromProps,m=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==s||c!==d)&&cl(t,o,s,d),mt=!1;var x=t.memoizedState;o.state=x,fs(t,s,o,a),c=t.memoizedState,l!==s||x!==c||xe.current||mt?(typeof h=="function"&&(Ya(t,r,h,s),c=t.memoizedState),(l=mt||ll(t,r,l,s,x,c,d))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=c),o.props=s,o.state=c,o.context=d,s=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{o=t.stateNode,rd(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:De(t.type,l),o.props=d,m=t.pendingProps,x=o.context,c=r.contextType,typeof c=="object"&&c!==null?c=Ae(c):(c=ve(r)?Mt:ce.current,c=fr(t,c));var f=r.getDerivedStateFromProps;(h=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||x!==c)&&cl(t,o,s,c),mt=!1,x=t.memoizedState,o.state=x,fs(t,s,o,a);var w=t.memoizedState;l!==m||x!==w||xe.current||mt?(typeof f=="function"&&(Ya(t,r,f,s),w=t.memoizedState),(d=mt||ll(t,r,d,s,x,w,c)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(s,w,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(s,w,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=w),o.props=s,o.state=w,o.context=c,s=d):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),s=!1)}return ei(e,t,r,s,i,a)}function ei(e,t,r,s,a,i){Cd(e,t);var o=(t.flags&128)!==0;if(!s&&!o)return a&&el(t,r,!1),it(e,t,i);s=t.stateNode,Tm.current=t;var l=o&&typeof r.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&o?(t.child=yr(t,e.child,null,i),t.child=yr(t,null,l,i)):ue(e,t,l,i),t.memoizedState=s.state,a&&el(t,r,!0),t.child}function Pd(e){var t=e.stateNode;t.pendingContext?Zo(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Zo(e,t.context,!1),Hi(e,t.containerInfo)}function gl(e,t,r,s,a){return gr(),Di(a),t.flags|=256,ue(e,t,r,s),t.child}var ti={dehydrated:null,treeContext:null,retryLane:0};function ri(e){return{baseLanes:e,cachePool:null,transitions:null}}function Rd(e,t,r){var s=t.pendingProps,a=q.current,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(a&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),B(q,a&1),e===null)return Ja(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=s.children,e=s.fallback,i?(s=t.mode,i=t.child,o={mode:"hidden",children:o},!(s&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Us(o,s,0,null),e=Ft(e,s,r,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=ri(r),t.memoizedState=ti,e):Yi(t,o));if(a=e.memoizedState,a!==null&&(l=a.dehydrated,l!==null))return Nm(e,t,o,s,l,a,r);if(i){i=s.fallback,o=t.mode,a=e.child,l=a.sibling;var c={mode:"hidden",children:s.children};return!(o&1)&&t.child!==a?(s=t.child,s.childLanes=0,s.pendingProps=c,t.deletions=null):(s=Nt(a,c),s.subtreeFlags=a.subtreeFlags&14680064),l!==null?i=Nt(l,i):(i=Ft(i,o,r,null),i.flags|=2),i.return=t,s.return=t,s.sibling=i,t.child=s,s=i,i=t.child,o=e.child.memoizedState,o=o===null?ri(r):{baseLanes:o.baseLanes|r,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~r,t.memoizedState=ti,s}return i=e.child,e=i.sibling,s=Nt(i,{mode:"visible",children:s.children}),!(t.mode&1)&&(s.lanes=r),s.return=t,s.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=s,t.memoizedState=null,s}function Yi(e,t){return t=Us({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function On(e,t,r,s){return s!==null&&Di(s),yr(t,e.child,null,r),e=Yi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Nm(e,t,r,s,a,i,o){if(r)return t.flags&256?(t.flags&=-257,s=ma(Error(N(422))),On(e,t,o,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=s.fallback,a=t.mode,s=Us({mode:"visible",children:s.children},a,0,null),i=Ft(i,a,o,null),i.flags|=2,s.return=t,i.return=t,s.sibling=i,t.child=s,t.mode&1&&yr(t,e.child,null,o),t.child.memoizedState=ri(o),t.memoizedState=ti,i);if(!(t.mode&1))return On(e,t,o,null);if(a.data==="$!"){if(s=a.nextSibling&&a.nextSibling.dataset,s)var l=s.dgst;return s=l,i=Error(N(419)),s=ma(i,s,void 0),On(e,t,o,s)}if(l=(o&e.childLanes)!==0,ye||l){if(s=re,s!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(s.suspendedLanes|o)?0:a,a!==0&&a!==i.retryLane&&(i.retryLane=a,at(e,a),Be(s,e,a,-1))}return ro(),s=ma(Error(N(421))),On(e,t,o,s)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Fm.bind(null,e),a._reactRetry=t,null):(e=i.treeContext,Se=wt(a.nextSibling),Ee=t,z=!0,Fe=null,e!==null&&(je[Ce++]=et,je[Ce++]=tt,je[Ce++]=Bt,et=e.id,tt=e.overflow,Bt=t),t=Yi(t,s.children),t.flags|=4096,t)}function yl(e,t,r){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),Ka(e.return,t,r)}function ha(e,t,r,s,a){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:a}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=s,i.tail=r,i.tailMode=a)}function Ad(e,t,r){var s=t.pendingProps,a=s.revealOrder,i=s.tail;if(ue(e,t,s.children,r),s=q.current,s&2)s=s&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&yl(e,r,t);else if(e.tag===19)yl(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(B(q,s),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(r=t.child,a=null;r!==null;)e=r.alternate,e!==null&&gs(e)===null&&(a=r),r=r.sibling;r=a,r===null?(a=t.child,t.child=null):(a=r.sibling,r.sibling=null),ha(t,!1,a,r,i);break;case"backwards":for(r=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&gs(e)===null){t.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}ha(t,!0,r,null,i);break;case"together":ha(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Jn(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function it(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Ht|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,r=Nt(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Nt(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function km(e,t,r){switch(t.tag){case 3:Pd(t),gr();break;case 5:nd(t);break;case 1:ve(t.type)&&ds(t);break;case 4:Hi(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,a=t.memoizedProps.value;B(ms,s._currentValue),s._currentValue=a;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(B(q,q.current&1),t.flags|=128,null):r&t.child.childLanes?Rd(e,t,r):(B(q,q.current&1),e=it(e,t,r),e!==null?e.sibling:null);B(q,q.current&1);break;case 19:if(s=(r&t.childLanes)!==0,e.flags&128){if(s)return Ad(e,t,r);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),B(q,q.current),s)break;return null;case 22:case 23:return t.lanes=0,jd(e,t,r)}return it(e,t,r)}var Ld,ni,Id,_d;Ld=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};ni=function(){};Id=function(e,t,r,s){var a=e.memoizedProps;if(a!==s){e=t.stateNode,Dt(Ke.current);var i=null;switch(r){case"input":a=Na(e,a),s=Na(e,s),i=[];break;case"select":a=J({},a,{value:void 0}),s=J({},s,{value:void 0}),i=[];break;case"textarea":a=Ca(e,a),s=Ca(e,s),i=[];break;default:typeof a.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=ls)}Ra(r,s);var o;r=null;for(d in a)if(!s.hasOwnProperty(d)&&a.hasOwnProperty(d)&&a[d]!=null)if(d==="style"){var l=a[d];for(o in l)l.hasOwnProperty(o)&&(r||(r={}),r[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Jr.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in s){var c=s[d];if(l=a!=null?a[d]:void 0,s.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(r||(r={}),r[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(r||(r={}),r[o]=c[o])}else r||(i||(i=[]),i.push(d,r)),r=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Jr.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&$("scroll",e),i||l===c||(i=[])):(i=i||[]).push(d,c))}r&&(i=i||[]).push("style",r);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};_d=function(e,t,r,s){r!==s&&(t.flags|=4)};function Lr(e,t){if(!z)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function oe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(t)for(var a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags&14680064,s|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=s,e.childLanes=r,t}function jm(e,t,r){var s=t.pendingProps;switch(Oi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(t),null;case 1:return ve(t.type)&&cs(),oe(t),null;case 3:return s=t.stateNode,xr(),H(xe),H(ce),Wi(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(In(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Fe!==null&&(ui(Fe),Fe=null))),ni(e,t),oe(t),null;case 5:zi(t);var a=Dt(on.current);if(r=t.type,e!==null&&t.stateNode!=null)Id(e,t,r,s,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(N(166));return oe(t),null}if(e=Dt(Ke.current),In(t)){s=t.stateNode,r=t.type;var i=t.memoizedProps;switch(s[Ve]=t,s[sn]=i,e=(t.mode&1)!==0,r){case"dialog":$("cancel",s),$("close",s);break;case"iframe":case"object":case"embed":$("load",s);break;case"video":case"audio":for(a=0;a<Fr.length;a++)$(Fr[a],s);break;case"source":$("error",s);break;case"img":case"image":case"link":$("error",s),$("load",s);break;case"details":$("toggle",s);break;case"input":ko(s,i),$("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!i.multiple},$("invalid",s);break;case"textarea":Co(s,i),$("invalid",s)}Ra(r,i),a=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?s.textContent!==l&&(i.suppressHydrationWarning!==!0&&Ln(s.textContent,l,e),a=["children",l]):typeof l=="number"&&s.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Ln(s.textContent,l,e),a=["children",""+l]):Jr.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&$("scroll",s)}switch(r){case"input":Tn(s),jo(s,i,!0);break;case"textarea":Tn(s),Po(s);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(s.onclick=ls)}s=a,t.updateQueue=s,s!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=lc(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=o.createElement(r,{is:s.is}):(e=o.createElement(r),r==="select"&&(o=e,s.multiple?o.multiple=!0:s.size&&(o.size=s.size))):e=o.createElementNS(e,r),e[Ve]=t,e[sn]=s,Ld(e,t,!1,!1),t.stateNode=e;e:{switch(o=Aa(r,s),r){case"dialog":$("cancel",e),$("close",e),a=s;break;case"iframe":case"object":case"embed":$("load",e),a=s;break;case"video":case"audio":for(a=0;a<Fr.length;a++)$(Fr[a],e);a=s;break;case"source":$("error",e),a=s;break;case"img":case"image":case"link":$("error",e),$("load",e),a=s;break;case"details":$("toggle",e),a=s;break;case"input":ko(e,s),a=Na(e,s),$("invalid",e);break;case"option":a=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},a=J({},s,{value:void 0}),$("invalid",e);break;case"textarea":Co(e,s),a=Ca(e,s),$("invalid",e);break;default:a=s}Ra(r,a),l=a;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?uc(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&cc(e,c)):i==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&Kr(e,c):typeof c=="number"&&Kr(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Jr.hasOwnProperty(i)?c!=null&&i==="onScroll"&&$("scroll",e):c!=null&&bi(e,i,c,o))}switch(r){case"input":Tn(e),jo(e,s,!1);break;case"textarea":Tn(e),Po(e);break;case"option":s.value!=null&&e.setAttribute("value",""+kt(s.value));break;case"select":e.multiple=!!s.multiple,i=s.value,i!=null?lr(e,!!s.multiple,i,!1):s.defaultValue!=null&&lr(e,!!s.multiple,s.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=ls)}switch(r){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return oe(t),null;case 6:if(e&&t.stateNode!=null)_d(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(N(166));if(r=Dt(on.current),Dt(Ke.current),In(t)){if(s=t.stateNode,r=t.memoizedProps,s[Ve]=t,(i=s.nodeValue!==r)&&(e=Ee,e!==null))switch(e.tag){case 3:Ln(s.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ln(s.nodeValue,r,(e.mode&1)!==0)}i&&(t.flags|=4)}else s=(r.nodeType===9?r:r.ownerDocument).createTextNode(s),s[Ve]=t,t.stateNode=s}return oe(t),null;case 13:if(H(q),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(z&&Se!==null&&t.mode&1&&!(t.flags&128))Xc(),gr(),t.flags|=98560,i=!1;else if(i=In(t),s!==null&&s.dehydrated!==null){if(e===null){if(!i)throw Error(N(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(N(317));i[Ve]=t}else gr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;oe(t),i=!1}else Fe!==null&&(ui(Fe),Fe=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,t.mode&1&&(e===null||q.current&1?ee===0&&(ee=3):ro())),t.updateQueue!==null&&(t.flags|=4),oe(t),null);case 4:return xr(),ni(e,t),e===null&&rn(t.stateNode.containerInfo),oe(t),null;case 10:return Mi(t.type._context),oe(t),null;case 17:return ve(t.type)&&cs(),oe(t),null;case 19:if(H(q),i=t.memoizedState,i===null)return oe(t),null;if(s=(t.flags&128)!==0,o=i.rendering,o===null)if(s)Lr(i,!1);else{if(ee!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=gs(e),o!==null){for(t.flags|=128,Lr(i,!1),s=o.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=r,r=t.child;r!==null;)i=r,e=s,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return B(q,q.current&1|2),t.child}e=e.sibling}i.tail!==null&&Y()>br&&(t.flags|=128,s=!0,Lr(i,!1),t.lanes=4194304)}else{if(!s)if(e=gs(o),e!==null){if(t.flags|=128,s=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Lr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!z)return oe(t),null}else 2*Y()-i.renderingStartTime>br&&r!==1073741824&&(t.flags|=128,s=!0,Lr(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(r=i.last,r!==null?r.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Y(),t.sibling=null,r=q.current,B(q,s?r&1|2:r&1),t):(oe(t),null);case 22:case 23:return to(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&t.mode&1?we&1073741824&&(oe(t),t.subtreeFlags&6&&(t.flags|=8192)):oe(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function Cm(e,t){switch(Oi(t),t.tag){case 1:return ve(t.type)&&cs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xr(),H(xe),H(ce),Wi(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return zi(t),null;case 13:if(H(q),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));gr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(q),null;case 4:return xr(),null;case 10:return Mi(t.type._context),null;case 22:case 23:return to(),null;case 24:return null;default:return null}}var Dn=!1,le=!1,Pm=typeof WeakSet=="function"?WeakSet:Set,R=null;function ir(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(s){K(e,t,s)}else r.current=null}function si(e,t,r){try{r()}catch(s){K(e,t,s)}}var xl=!1;function Rm(e,t){if($a=as,e=Mc(),Ii(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var a=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var o=0,l=-1,c=-1,d=0,h=0,m=e,x=null;t:for(;;){for(var f;m!==r||a!==0&&m.nodeType!==3||(l=o+a),m!==i||s!==0&&m.nodeType!==3||(c=o+s),m.nodeType===3&&(o+=m.nodeValue.length),(f=m.firstChild)!==null;)x=m,m=f;for(;;){if(m===e)break t;if(x===r&&++d===a&&(l=o),x===i&&++h===s&&(c=o),(f=m.nextSibling)!==null)break;m=x,x=m.parentNode}m=f}r=l===-1||c===-1?null:{start:l,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(Ha={focusedElem:e,selectionRange:r},as=!1,R=t;R!==null;)if(t=R,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,R=e;else for(;R!==null;){t=R;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var y=w.memoizedProps,b=w.memoizedState,p=t.stateNode,u=p.getSnapshotBeforeUpdate(t.elementType===t.type?y:De(t.type,y),b);p.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(S){K(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,R=e;break}R=t.return}return w=xl,xl=!1,w}function qr(e,t,r){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&e)===e){var i=a.destroy;a.destroy=void 0,i!==void 0&&si(t,r,i)}a=a.next}while(a!==s)}}function Os(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var s=r.create;r.destroy=s()}r=r.next}while(r!==t)}}function ai(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Od(e){var t=e.alternate;t!==null&&(e.alternate=null,Od(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ve],delete t[sn],delete t[qa],delete t[pm],delete t[mm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Dd(e){return e.tag===5||e.tag===3||e.tag===4}function vl(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Dd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ii(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=ls));else if(s!==4&&(e=e.child,e!==null))for(ii(e,t,r),e=e.sibling;e!==null;)ii(e,t,r),e=e.sibling}function oi(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(oi(e,t,r),e=e.sibling;e!==null;)oi(e,t,r),e=e.sibling}var ne=null,Ue=!1;function ut(e,t,r){for(r=r.child;r!==null;)Ud(e,t,r),r=r.sibling}function Ud(e,t,r){if(Je&&typeof Je.onCommitFiberUnmount=="function")try{Je.onCommitFiberUnmount(js,r)}catch{}switch(r.tag){case 5:le||ir(r,t);case 6:var s=ne,a=Ue;ne=null,ut(e,t,r),ne=s,Ue=a,ne!==null&&(Ue?(e=ne,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):ne.removeChild(r.stateNode));break;case 18:ne!==null&&(Ue?(e=ne,r=r.stateNode,e.nodeType===8?oa(e.parentNode,r):e.nodeType===1&&oa(e,r),Zr(e)):oa(ne,r.stateNode));break;case 4:s=ne,a=Ue,ne=r.stateNode.containerInfo,Ue=!0,ut(e,t,r),ne=s,Ue=a;break;case 0:case 11:case 14:case 15:if(!le&&(s=r.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){a=s=s.next;do{var i=a,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&si(r,t,o),a=a.next}while(a!==s)}ut(e,t,r);break;case 1:if(!le&&(ir(r,t),s=r.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=r.memoizedProps,s.state=r.memoizedState,s.componentWillUnmount()}catch(l){K(r,t,l)}ut(e,t,r);break;case 21:ut(e,t,r);break;case 22:r.mode&1?(le=(s=le)||r.memoizedState!==null,ut(e,t,r),le=s):ut(e,t,r);break;default:ut(e,t,r)}}function bl(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new Pm),t.forEach(function(s){var a=Mm.bind(null,e,s);r.has(s)||(r.add(s),s.then(a,a))})}}function Oe(e,t){var r=t.deletions;if(r!==null)for(var s=0;s<r.length;s++){var a=r[s];try{var i=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:ne=l.stateNode,Ue=!1;break e;case 3:ne=l.stateNode.containerInfo,Ue=!0;break e;case 4:ne=l.stateNode.containerInfo,Ue=!0;break e}l=l.return}if(ne===null)throw Error(N(160));Ud(i,o,a),ne=null,Ue=!1;var c=a.alternate;c!==null&&(c.return=null),a.return=null}catch(d){K(a,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Fd(t,e),t=t.sibling}function Fd(e,t){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Oe(t,e),qe(e),s&4){try{qr(3,e,e.return),Os(3,e)}catch(y){K(e,e.return,y)}try{qr(5,e,e.return)}catch(y){K(e,e.return,y)}}break;case 1:Oe(t,e),qe(e),s&512&&r!==null&&ir(r,r.return);break;case 5:if(Oe(t,e),qe(e),s&512&&r!==null&&ir(r,r.return),e.flags&32){var a=e.stateNode;try{Kr(a,"")}catch(y){K(e,e.return,y)}}if(s&4&&(a=e.stateNode,a!=null)){var i=e.memoizedProps,o=r!==null?r.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&ic(a,i),Aa(l,o);var d=Aa(l,i);for(o=0;o<c.length;o+=2){var h=c[o],m=c[o+1];h==="style"?uc(a,m):h==="dangerouslySetInnerHTML"?cc(a,m):h==="children"?Kr(a,m):bi(a,h,m,d)}switch(l){case"input":ka(a,i);break;case"textarea":oc(a,i);break;case"select":var x=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!i.multiple;var f=i.value;f!=null?lr(a,!!i.multiple,f,!1):x!==!!i.multiple&&(i.defaultValue!=null?lr(a,!!i.multiple,i.defaultValue,!0):lr(a,!!i.multiple,i.multiple?[]:"",!1))}a[sn]=i}catch(y){K(e,e.return,y)}}break;case 6:if(Oe(t,e),qe(e),s&4){if(e.stateNode===null)throw Error(N(162));a=e.stateNode,i=e.memoizedProps;try{a.nodeValue=i}catch(y){K(e,e.return,y)}}break;case 3:if(Oe(t,e),qe(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{Zr(t.containerInfo)}catch(y){K(e,e.return,y)}break;case 4:Oe(t,e),qe(e);break;case 13:Oe(t,e),qe(e),a=e.child,a.flags&8192&&(i=a.memoizedState!==null,a.stateNode.isHidden=i,!i||a.alternate!==null&&a.alternate.memoizedState!==null||(Zi=Y())),s&4&&bl(e);break;case 22:if(h=r!==null&&r.memoizedState!==null,e.mode&1?(le=(d=le)||h,Oe(t,e),le=d):Oe(t,e),qe(e),s&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(R=e,h=e.child;h!==null;){for(m=R=h;R!==null;){switch(x=R,f=x.child,x.tag){case 0:case 11:case 14:case 15:qr(4,x,x.return);break;case 1:ir(x,x.return);var w=x.stateNode;if(typeof w.componentWillUnmount=="function"){s=x,r=x.return;try{t=s,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(y){K(s,r,y)}}break;case 5:ir(x,x.return);break;case 22:if(x.memoizedState!==null){Sl(m);continue}}f!==null?(f.return=x,R=f):Sl(m)}h=h.sibling}e:for(h=null,m=e;;){if(m.tag===5){if(h===null){h=m;try{a=m.stateNode,d?(i=a.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=m.stateNode,c=m.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=dc("display",o))}catch(y){K(e,e.return,y)}}}else if(m.tag===6){if(h===null)try{m.stateNode.nodeValue=d?"":m.memoizedProps}catch(y){K(e,e.return,y)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;h===m&&(h=null),m=m.return}h===m&&(h=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Oe(t,e),qe(e),s&4&&bl(e);break;case 21:break;default:Oe(t,e),qe(e)}}function qe(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Dd(r)){var s=r;break e}r=r.return}throw Error(N(160))}switch(s.tag){case 5:var a=s.stateNode;s.flags&32&&(Kr(a,""),s.flags&=-33);var i=vl(e);oi(e,i,a);break;case 3:case 4:var o=s.stateNode.containerInfo,l=vl(e);ii(e,l,o);break;default:throw Error(N(161))}}catch(c){K(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Am(e,t,r){R=e,Md(e)}function Md(e,t,r){for(var s=(e.mode&1)!==0;R!==null;){var a=R,i=a.child;if(a.tag===22&&s){var o=a.memoizedState!==null||Dn;if(!o){var l=a.alternate,c=l!==null&&l.memoizedState!==null||le;l=Dn;var d=le;if(Dn=o,(le=c)&&!d)for(R=a;R!==null;)o=R,c=o.child,o.tag===22&&o.memoizedState!==null?El(a):c!==null?(c.return=o,R=c):El(a);for(;i!==null;)R=i,Md(i),i=i.sibling;R=a,Dn=l,le=d}wl(e)}else a.subtreeFlags&8772&&i!==null?(i.return=a,R=i):wl(e)}}function wl(e){for(;R!==null;){var t=R;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:le||Os(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!le)if(r===null)s.componentDidMount();else{var a=t.elementType===t.type?r.memoizedProps:De(t.type,r.memoizedProps);s.componentDidUpdate(a,r.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&al(t,i,s);break;case 3:var o=t.updateQueue;if(o!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}al(t,o,r)}break;case 5:var l=t.stateNode;if(r===null&&t.flags&4){r=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var m=h.dehydrated;m!==null&&Zr(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}le||t.flags&512&&ai(t)}catch(x){K(t,t.return,x)}}if(t===e){R=null;break}if(r=t.sibling,r!==null){r.return=t.return,R=r;break}R=t.return}}function Sl(e){for(;R!==null;){var t=R;if(t===e){R=null;break}var r=t.sibling;if(r!==null){r.return=t.return,R=r;break}R=t.return}}function El(e){for(;R!==null;){var t=R;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Os(4,t)}catch(c){K(t,r,c)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var a=t.return;try{s.componentDidMount()}catch(c){K(t,a,c)}}var i=t.return;try{ai(t)}catch(c){K(t,i,c)}break;case 5:var o=t.return;try{ai(t)}catch(c){K(t,o,c)}}}catch(c){K(t,t.return,c)}if(t===e){R=null;break}var l=t.sibling;if(l!==null){l.return=t.return,R=l;break}R=t.return}}var Lm=Math.ceil,vs=lt.ReactCurrentDispatcher,Qi=lt.ReactCurrentOwner,Re=lt.ReactCurrentBatchConfig,D=0,re=null,Q=null,se=0,we=0,or=Pt(0),ee=0,un=null,Ht=0,Ds=0,Xi=0,Gr=null,ge=null,Zi=0,br=1/0,Xe=null,bs=!1,li=null,Et=null,Un=!1,yt=null,ws=0,Vr=0,ci=null,Kn=-1,Yn=0;function pe(){return D&6?Y():Kn!==-1?Kn:Kn=Y()}function Tt(e){return e.mode&1?D&2&&se!==0?se&-se:fm.transition!==null?(Yn===0&&(Yn=Ec()),Yn):(e=U,e!==0||(e=window.event,e=e===void 0?16:Rc(e.type)),e):1}function Be(e,t,r,s){if(50<Vr)throw Vr=0,ci=null,Error(N(185));hn(e,r,s),(!(D&2)||e!==re)&&(e===re&&(!(D&2)&&(Ds|=r),ee===4&&ft(e,se)),be(e,s),r===1&&D===0&&!(t.mode&1)&&(br=Y()+500,Ls&&Rt()))}function be(e,t){var r=e.callbackNode;fp(e,t);var s=ss(e,e===re?se:0);if(s===0)r!==null&&Lo(r),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(r!=null&&Lo(r),t===1)e.tag===0?hm(Tl.bind(null,e)):Kc(Tl.bind(null,e)),dm(function(){!(D&6)&&Rt()}),r=null;else{switch(Tc(s)){case 1:r=Ni;break;case 4:r=wc;break;case 16:r=ns;break;case 536870912:r=Sc;break;default:r=ns}r=Vd(r,Bd.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Bd(e,t){if(Kn=-1,Yn=0,D&6)throw Error(N(327));var r=e.callbackNode;if(mr()&&e.callbackNode!==r)return null;var s=ss(e,e===re?se:0);if(s===0)return null;if(s&30||s&e.expiredLanes||t)t=Ss(e,s);else{t=s;var a=D;D|=2;var i=Hd();(re!==e||se!==t)&&(Xe=null,br=Y()+500,Ut(e,t));do try{Om();break}catch(l){$d(e,l)}while(!0);Fi(),vs.current=i,D=a,Q!==null?t=0:(re=null,se=0,t=ee)}if(t!==0){if(t===2&&(a=Da(e),a!==0&&(s=a,t=di(e,a))),t===1)throw r=un,Ut(e,0),ft(e,s),be(e,Y()),r;if(t===6)ft(e,s);else{if(a=e.current.alternate,!(s&30)&&!Im(a)&&(t=Ss(e,s),t===2&&(i=Da(e),i!==0&&(s=i,t=di(e,i))),t===1))throw r=un,Ut(e,0),ft(e,s),be(e,Y()),r;switch(e.finishedWork=a,e.finishedLanes=s,t){case 0:case 1:throw Error(N(345));case 2:It(e,ge,Xe);break;case 3:if(ft(e,s),(s&130023424)===s&&(t=Zi+500-Y(),10<t)){if(ss(e,0)!==0)break;if(a=e.suspendedLanes,(a&s)!==s){pe(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Wa(It.bind(null,e,ge,Xe),t);break}It(e,ge,Xe);break;case 4:if(ft(e,s),(s&4194240)===s)break;for(t=e.eventTimes,a=-1;0<s;){var o=31-Me(s);i=1<<o,o=t[o],o>a&&(a=o),s&=~i}if(s=a,s=Y()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*Lm(s/1960))-s,10<s){e.timeoutHandle=Wa(It.bind(null,e,ge,Xe),s);break}It(e,ge,Xe);break;case 5:It(e,ge,Xe);break;default:throw Error(N(329))}}}return be(e,Y()),e.callbackNode===r?Bd.bind(null,e):null}function di(e,t){var r=Gr;return e.current.memoizedState.isDehydrated&&(Ut(e,t).flags|=256),e=Ss(e,t),e!==2&&(t=ge,ge=r,t!==null&&ui(t)),e}function ui(e){ge===null?ge=e:ge.push.apply(ge,e)}function Im(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var s=0;s<r.length;s++){var a=r[s],i=a.getSnapshot;a=a.value;try{if(!He(i(),a))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ft(e,t){for(t&=~Xi,t&=~Ds,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Me(t),s=1<<r;e[r]=-1,t&=~s}}function Tl(e){if(D&6)throw Error(N(327));mr();var t=ss(e,0);if(!(t&1))return be(e,Y()),null;var r=Ss(e,t);if(e.tag!==0&&r===2){var s=Da(e);s!==0&&(t=s,r=di(e,s))}if(r===1)throw r=un,Ut(e,0),ft(e,t),be(e,Y()),r;if(r===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,It(e,ge,Xe),be(e,Y()),null}function eo(e,t){var r=D;D|=1;try{return e(t)}finally{D=r,D===0&&(br=Y()+500,Ls&&Rt())}}function zt(e){yt!==null&&yt.tag===0&&!(D&6)&&mr();var t=D;D|=1;var r=Re.transition,s=U;try{if(Re.transition=null,U=1,e)return e()}finally{U=s,Re.transition=r,D=t,!(D&6)&&Rt()}}function to(){we=or.current,H(or)}function Ut(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,cm(r)),Q!==null)for(r=Q.return;r!==null;){var s=r;switch(Oi(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&cs();break;case 3:xr(),H(xe),H(ce),Wi();break;case 5:zi(s);break;case 4:xr();break;case 13:H(q);break;case 19:H(q);break;case 10:Mi(s.type._context);break;case 22:case 23:to()}r=r.return}if(re=e,Q=e=Nt(e.current,null),se=we=t,ee=0,un=null,Xi=Ds=Ht=0,ge=Gr=null,Ot!==null){for(t=0;t<Ot.length;t++)if(r=Ot[t],s=r.interleaved,s!==null){r.interleaved=null;var a=s.next,i=r.pending;if(i!==null){var o=i.next;i.next=a,s.next=o}r.pending=s}Ot=null}return e}function $d(e,t){do{var r=Q;try{if(Fi(),Gn.current=xs,ys){for(var s=G.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}ys=!1}if($t=0,te=Z=G=null,Wr=!1,ln=0,Qi.current=null,r===null||r.return===null){ee=1,un=t,Q=null;break}e:{var i=e,o=r.return,l=r,c=t;if(t=se,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,h=l,m=h.tag;if(!(h.mode&1)&&(m===0||m===11||m===15)){var x=h.alternate;x?(h.updateQueue=x.updateQueue,h.memoizedState=x.memoizedState,h.lanes=x.lanes):(h.updateQueue=null,h.memoizedState=null)}var f=ul(o);if(f!==null){f.flags&=-257,pl(f,o,l,i,t),f.mode&1&&dl(i,d,t),t=f,c=d;var w=t.updateQueue;if(w===null){var y=new Set;y.add(c),t.updateQueue=y}else w.add(c);break e}else{if(!(t&1)){dl(i,d,t),ro();break e}c=Error(N(426))}}else if(z&&l.mode&1){var b=ul(o);if(b!==null){!(b.flags&65536)&&(b.flags|=256),pl(b,o,l,i,t),Di(vr(c,l));break e}}i=c=vr(c,l),ee!==4&&(ee=2),Gr===null?Gr=[i]:Gr.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var p=Td(i,c,t);sl(i,p);break e;case 1:l=c;var u=i.type,g=i.stateNode;if(!(i.flags&128)&&(typeof u.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Et===null||!Et.has(g)))){i.flags|=65536,t&=-t,i.lanes|=t;var S=Nd(i,l,t);sl(i,S);break e}}i=i.return}while(i!==null)}Wd(r)}catch(E){t=E,Q===r&&r!==null&&(Q=r=r.return);continue}break}while(!0)}function Hd(){var e=vs.current;return vs.current=xs,e===null?xs:e}function ro(){(ee===0||ee===3||ee===2)&&(ee=4),re===null||!(Ht&268435455)&&!(Ds&268435455)||ft(re,se)}function Ss(e,t){var r=D;D|=2;var s=Hd();(re!==e||se!==t)&&(Xe=null,Ut(e,t));do try{_m();break}catch(a){$d(e,a)}while(!0);if(Fi(),D=r,vs.current=s,Q!==null)throw Error(N(261));return re=null,se=0,ee}function _m(){for(;Q!==null;)zd(Q)}function Om(){for(;Q!==null&&!ip();)zd(Q)}function zd(e){var t=Gd(e.alternate,e,we);e.memoizedProps=e.pendingProps,t===null?Wd(e):Q=t,Qi.current=null}function Wd(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=Cm(r,t),r!==null){r.flags&=32767,Q=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ee=6,Q=null;return}}else if(r=jm(r,t,we),r!==null){Q=r;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);ee===0&&(ee=5)}function It(e,t,r){var s=U,a=Re.transition;try{Re.transition=null,U=1,Dm(e,t,r,s)}finally{Re.transition=a,U=s}return null}function Dm(e,t,r,s){do mr();while(yt!==null);if(D&6)throw Error(N(327));r=e.finishedWork;var a=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var i=r.lanes|r.childLanes;if(gp(e,i),e===re&&(Q=re=null,se=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Un||(Un=!0,Vd(ns,function(){return mr(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=Re.transition,Re.transition=null;var o=U;U=1;var l=D;D|=4,Qi.current=null,Rm(e,r),Fd(r,e),rm(Ha),as=!!$a,Ha=$a=null,e.current=r,Am(r),op(),D=l,U=o,Re.transition=i}else e.current=r;if(Un&&(Un=!1,yt=e,ws=a),i=e.pendingLanes,i===0&&(Et=null),dp(r.stateNode),be(e,Y()),t!==null)for(s=e.onRecoverableError,r=0;r<t.length;r++)a=t[r],s(a.value,{componentStack:a.stack,digest:a.digest});if(bs)throw bs=!1,e=li,li=null,e;return ws&1&&e.tag!==0&&mr(),i=e.pendingLanes,i&1?e===ci?Vr++:(Vr=0,ci=e):Vr=0,Rt(),null}function mr(){if(yt!==null){var e=Tc(ws),t=Re.transition,r=U;try{if(Re.transition=null,U=16>e?16:e,yt===null)var s=!1;else{if(e=yt,yt=null,ws=0,D&6)throw Error(N(331));var a=D;for(D|=4,R=e.current;R!==null;){var i=R,o=i.child;if(R.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(R=d;R!==null;){var h=R;switch(h.tag){case 0:case 11:case 15:qr(8,h,i)}var m=h.child;if(m!==null)m.return=h,R=m;else for(;R!==null;){h=R;var x=h.sibling,f=h.return;if(Od(h),h===d){R=null;break}if(x!==null){x.return=f,R=x;break}R=f}}}var w=i.alternate;if(w!==null){var y=w.child;if(y!==null){w.child=null;do{var b=y.sibling;y.sibling=null,y=b}while(y!==null)}}R=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,R=o;else e:for(;R!==null;){if(i=R,i.flags&2048)switch(i.tag){case 0:case 11:case 15:qr(9,i,i.return)}var p=i.sibling;if(p!==null){p.return=i.return,R=p;break e}R=i.return}}var u=e.current;for(R=u;R!==null;){o=R;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,R=g;else e:for(o=u;R!==null;){if(l=R,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Os(9,l)}}catch(E){K(l,l.return,E)}if(l===o){R=null;break e}var S=l.sibling;if(S!==null){S.return=l.return,R=S;break e}R=l.return}}if(D=a,Rt(),Je&&typeof Je.onPostCommitFiberRoot=="function")try{Je.onPostCommitFiberRoot(js,e)}catch{}s=!0}return s}finally{U=r,Re.transition=t}}return!1}function Nl(e,t,r){t=vr(r,t),t=Td(e,t,1),e=St(e,t,1),t=pe(),e!==null&&(hn(e,1,t),be(e,t))}function K(e,t,r){if(e.tag===3)Nl(e,e,r);else for(;t!==null;){if(t.tag===3){Nl(t,e,r);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Et===null||!Et.has(s))){e=vr(r,e),e=Nd(t,e,1),t=St(t,e,1),e=pe(),t!==null&&(hn(t,1,e),be(t,e));break}}t=t.return}}function Um(e,t,r){var s=e.pingCache;s!==null&&s.delete(t),t=pe(),e.pingedLanes|=e.suspendedLanes&r,re===e&&(se&r)===r&&(ee===4||ee===3&&(se&130023424)===se&&500>Y()-Zi?Ut(e,0):Xi|=r),be(e,t)}function qd(e,t){t===0&&(e.mode&1?(t=jn,jn<<=1,!(jn&130023424)&&(jn=4194304)):t=1);var r=pe();e=at(e,t),e!==null&&(hn(e,t,r),be(e,r))}function Fm(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),qd(e,r)}function Mm(e,t){var r=0;switch(e.tag){case 13:var s=e.stateNode,a=e.memoizedState;a!==null&&(r=a.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(N(314))}s!==null&&s.delete(t),qd(e,r)}var Gd;Gd=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||xe.current)ye=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return ye=!1,km(e,t,r);ye=!!(e.flags&131072)}else ye=!1,z&&t.flags&1048576&&Yc(t,ps,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;Jn(e,t),e=t.pendingProps;var a=fr(t,ce.current);pr(t,r),a=Gi(null,t,s,e,a,r);var i=Vi();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ve(s)?(i=!0,ds(t)):i=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,$i(t),a.updater=_s,t.stateNode=a,a._reactInternals=t,Qa(t,s,e,r),t=ei(null,t,s,!0,i,r)):(t.tag=0,z&&i&&_i(t),ue(null,t,a,r),t=t.child),t;case 16:s=t.elementType;e:{switch(Jn(e,t),e=t.pendingProps,a=s._init,s=a(s._payload),t.type=s,a=t.tag=$m(s),e=De(s,e),a){case 0:t=Za(null,t,s,e,r);break e;case 1:t=fl(null,t,s,e,r);break e;case 11:t=ml(null,t,s,e,r);break e;case 14:t=hl(null,t,s,De(s.type,e),r);break e}throw Error(N(306,s,""))}return t;case 0:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:De(s,a),Za(e,t,s,a,r);case 1:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:De(s,a),fl(e,t,s,a,r);case 3:e:{if(Pd(t),e===null)throw Error(N(387));s=t.pendingProps,i=t.memoizedState,a=i.element,rd(e,t),fs(t,s,null,r);var o=t.memoizedState;if(s=o.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){a=vr(Error(N(423)),t),t=gl(e,t,s,r,a);break e}else if(s!==a){a=vr(Error(N(424)),t),t=gl(e,t,s,r,a);break e}else for(Se=wt(t.stateNode.containerInfo.firstChild),Ee=t,z=!0,Fe=null,r=ed(t,null,s,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(gr(),s===a){t=it(e,t,r);break e}ue(e,t,s,r)}t=t.child}return t;case 5:return nd(t),e===null&&Ja(t),s=t.type,a=t.pendingProps,i=e!==null?e.memoizedProps:null,o=a.children,za(s,a)?o=null:i!==null&&za(s,i)&&(t.flags|=32),Cd(e,t),ue(e,t,o,r),t.child;case 6:return e===null&&Ja(t),null;case 13:return Rd(e,t,r);case 4:return Hi(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=yr(t,null,s,r):ue(e,t,s,r),t.child;case 11:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:De(s,a),ml(e,t,s,a,r);case 7:return ue(e,t,t.pendingProps,r),t.child;case 8:return ue(e,t,t.pendingProps.children,r),t.child;case 12:return ue(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(s=t.type._context,a=t.pendingProps,i=t.memoizedProps,o=a.value,B(ms,s._currentValue),s._currentValue=o,i!==null)if(He(i.value,o)){if(i.children===a.children&&!xe.current){t=it(e,t,r);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var c=l.firstContext;c!==null;){if(c.context===s){if(i.tag===1){c=rt(-1,r&-r),c.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?c.next=c:(c.next=h.next,h.next=c),d.pending=c}}i.lanes|=r,c=i.alternate,c!==null&&(c.lanes|=r),Ka(i.return,r,t),l.lanes|=r;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(N(341));o.lanes|=r,l=o.alternate,l!==null&&(l.lanes|=r),Ka(o,r,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ue(e,t,a.children,r),t=t.child}return t;case 9:return a=t.type,s=t.pendingProps.children,pr(t,r),a=Ae(a),s=s(a),t.flags|=1,ue(e,t,s,r),t.child;case 14:return s=t.type,a=De(s,t.pendingProps),a=De(s.type,a),hl(e,t,s,a,r);case 15:return kd(e,t,t.type,t.pendingProps,r);case 17:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:De(s,a),Jn(e,t),t.tag=1,ve(s)?(e=!0,ds(t)):e=!1,pr(t,r),Ed(t,s,a),Qa(t,s,a,r),ei(null,t,s,!0,e,r);case 19:return Ad(e,t,r);case 22:return jd(e,t,r)}throw Error(N(156,t.tag))};function Vd(e,t){return bc(e,t)}function Bm(e,t,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(e,t,r,s){return new Bm(e,t,r,s)}function no(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $m(e){if(typeof e=="function")return no(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Si)return 11;if(e===Ei)return 14}return 2}function Nt(e,t){var r=e.alternate;return r===null?(r=Pe(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Qn(e,t,r,s,a,i){var o=2;if(s=e,typeof e=="function")no(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Qt:return Ft(r.children,a,i,t);case wi:o=8,a|=8;break;case wa:return e=Pe(12,r,t,a|2),e.elementType=wa,e.lanes=i,e;case Sa:return e=Pe(13,r,t,a),e.elementType=Sa,e.lanes=i,e;case Ea:return e=Pe(19,r,t,a),e.elementType=Ea,e.lanes=i,e;case nc:return Us(r,a,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case tc:o=10;break e;case rc:o=9;break e;case Si:o=11;break e;case Ei:o=14;break e;case pt:o=16,s=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=Pe(o,r,t,a),t.elementType=e,t.type=s,t.lanes=i,t}function Ft(e,t,r,s){return e=Pe(7,e,s,t),e.lanes=r,e}function Us(e,t,r,s){return e=Pe(22,e,s,t),e.elementType=nc,e.lanes=r,e.stateNode={isHidden:!1},e}function fa(e,t,r){return e=Pe(6,e,null,t),e.lanes=r,e}function ga(e,t,r){return t=Pe(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Hm(e,t,r,s,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ys(0),this.expirationTimes=Ys(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ys(0),this.identifierPrefix=s,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function so(e,t,r,s,a,i,o,l,c){return e=new Hm(e,t,r,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Pe(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:s,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},$i(i),e}function zm(e,t,r){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Yt,key:s==null?null:""+s,children:e,containerInfo:t,implementation:r}}function Jd(e){if(!e)return jt;e=e._reactInternals;e:{if(qt(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var r=e.type;if(ve(r))return Jc(e,r,t)}return t}function Kd(e,t,r,s,a,i,o,l,c){return e=so(r,s,!0,e,a,i,o,l,c),e.context=Jd(null),r=e.current,s=pe(),a=Tt(r),i=rt(s,a),i.callback=t??null,St(r,i,a),e.current.lanes=a,hn(e,a,s),be(e,s),e}function Fs(e,t,r,s){var a=t.current,i=pe(),o=Tt(a);return r=Jd(r),t.context===null?t.context=r:t.pendingContext=r,t=rt(i,o),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=St(a,t,o),e!==null&&(Be(e,a,o,i),qn(e,a,o)),o}function Es(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function kl(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function ao(e,t){kl(e,t),(e=e.alternate)&&kl(e,t)}function Wm(){return null}var Yd=typeof reportError=="function"?reportError:function(e){console.error(e)};function io(e){this._internalRoot=e}Ms.prototype.render=io.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));Fs(e,t,null,null)};Ms.prototype.unmount=io.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;zt(function(){Fs(null,e,null,null)}),t[st]=null}};function Ms(e){this._internalRoot=e}Ms.prototype.unstable_scheduleHydration=function(e){if(e){var t=jc();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ht.length&&t!==0&&t<ht[r].priority;r++);ht.splice(r,0,e),r===0&&Pc(e)}};function oo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Bs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function jl(){}function qm(e,t,r,s,a){if(a){if(typeof s=="function"){var i=s;s=function(){var d=Es(o);i.call(d)}}var o=Kd(t,s,e,0,null,!1,!1,"",jl);return e._reactRootContainer=o,e[st]=o.current,rn(e.nodeType===8?e.parentNode:e),zt(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof s=="function"){var l=s;s=function(){var d=Es(c);l.call(d)}}var c=so(e,0,!1,null,null,!1,!1,"",jl);return e._reactRootContainer=c,e[st]=c.current,rn(e.nodeType===8?e.parentNode:e),zt(function(){Fs(t,c,r,s)}),c}function $s(e,t,r,s,a){var i=r._reactRootContainer;if(i){var o=i;if(typeof a=="function"){var l=a;a=function(){var c=Es(o);l.call(c)}}Fs(t,o,e,a)}else o=qm(r,t,e,a,s);return Es(o)}Nc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Ur(t.pendingLanes);r!==0&&(ki(t,r|1),be(t,Y()),!(D&6)&&(br=Y()+500,Rt()))}break;case 13:zt(function(){var s=at(e,1);if(s!==null){var a=pe();Be(s,e,1,a)}}),ao(e,1)}};ji=function(e){if(e.tag===13){var t=at(e,134217728);if(t!==null){var r=pe();Be(t,e,134217728,r)}ao(e,134217728)}};kc=function(e){if(e.tag===13){var t=Tt(e),r=at(e,t);if(r!==null){var s=pe();Be(r,e,t,s)}ao(e,t)}};jc=function(){return U};Cc=function(e,t){var r=U;try{return U=e,t()}finally{U=r}};Ia=function(e,t,r){switch(t){case"input":if(ka(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var s=r[t];if(s!==e&&s.form===e.form){var a=As(s);if(!a)throw Error(N(90));ac(s),ka(s,a)}}}break;case"textarea":oc(e,r);break;case"select":t=r.value,t!=null&&lr(e,!!r.multiple,t,!1)}};hc=eo;fc=zt;var Gm={usingClientEntryPoint:!1,Events:[gn,tr,As,pc,mc,eo]},Ir={findFiberByHostInstance:_t,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Vm={bundleType:Ir.bundleType,version:Ir.version,rendererPackageName:Ir.rendererPackageName,rendererConfig:Ir.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xc(e),e===null?null:e.stateNode},findFiberByHostInstance:Ir.findFiberByHostInstance||Wm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fn=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fn.isDisabled&&Fn.supportsFiber)try{js=Fn.inject(Vm),Je=Fn}catch{}}Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gm;Ne.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!oo(t))throw Error(N(200));return zm(e,t,null,r)};Ne.createRoot=function(e,t){if(!oo(e))throw Error(N(299));var r=!1,s="",a=Yd;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=so(e,1,!1,null,null,r,!1,s,a),e[st]=t.current,rn(e.nodeType===8?e.parentNode:e),new io(t)};Ne.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=xc(t),e=e===null?null:e.stateNode,e};Ne.flushSync=function(e){return zt(e)};Ne.hydrate=function(e,t,r){if(!Bs(t))throw Error(N(200));return $s(null,e,t,!0,r)};Ne.hydrateRoot=function(e,t,r){if(!oo(e))throw Error(N(405));var s=r!=null&&r.hydratedSources||null,a=!1,i="",o=Yd;if(r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(o=r.onRecoverableError)),t=Kd(t,null,e,1,r??null,a,!1,i,o),e[st]=t.current,rn(e),s)for(e=0;e<s.length;e++)r=s[e],a=r._getVersion,a=a(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,a]:t.mutableSourceEagerHydrationData.push(r,a);return new Ms(t)};Ne.render=function(e,t,r){if(!Bs(t))throw Error(N(200));return $s(null,e,t,!1,r)};Ne.unmountComponentAtNode=function(e){if(!Bs(e))throw Error(N(40));return e._reactRootContainer?(zt(function(){$s(null,null,e,!1,function(){e._reactRootContainer=null,e[st]=null})}),!0):!1};Ne.unstable_batchedUpdates=eo;Ne.unstable_renderSubtreeIntoContainer=function(e,t,r,s){if(!Bs(r))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return $s(e,t,r,!1,s)};Ne.version="18.3.1-next-f1338f8080-20240426";function Qd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Qd)}catch(e){console.error(e)}}Qd(),Ql.exports=Ne;var Jm=Ql.exports,Xd,Cl=Jm;Xd=Cl.createRoot,Cl.hydrateRoot;/**
 * react-router v7.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Pl="popstate";function Rl(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function Km(e={}){function t(a,i){let{pathname:o="/",search:l="",hash:c=""}=Gt(a.location.hash.substring(1));return!o.startsWith("/")&&!o.startsWith(".")&&(o="/"+o),pi("",{pathname:o,search:l,hash:c},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function r(a,i){let o=a.document.querySelector("base"),l="";if(o&&o.getAttribute("href")){let c=a.location.href,d=c.indexOf("#");l=d===-1?c:c.slice(0,d)}return l+"#"+(typeof i=="string"?i:pn(i))}function s(a,i){ze(a.pathname.charAt(0)==="/",`relative pathnames are not supported in hash history.push(${JSON.stringify(i)})`)}return Qm(t,r,s,e)}function V(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ze(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ym(){return Math.random().toString(36).substring(2,10)}function Al(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function pi(e,t,r=null,s,a){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Gt(t):t,state:r,key:t&&t.key||s||Ym(),mask:a}}function pn({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Gt(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let s=e.indexOf("?");s>=0&&(t.search=e.substring(s),e=e.substring(0,s)),e&&(t.pathname=e)}return t}function Qm(e,t,r,s={}){let{window:a=document.defaultView,v5Compat:i=!1}=s,o=a.history,l="POP",c=null,d=h();d==null&&(d=0,o.replaceState({...o.state,idx:d},""));function h(){return(o.state||{idx:null}).idx}function m(){l="POP";let b=h(),p=b==null?null:b-d;d=b,c&&c({action:l,location:y.location,delta:p})}function x(b,p){l="PUSH";let u=Rl(b)?b:pi(y.location,b,p);r&&r(u,b),d=h()+1;let g=Al(u,d),S=y.createHref(u.mask||u);try{o.pushState(g,"",S)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;a.location.assign(S)}i&&c&&c({action:l,location:y.location,delta:1})}function f(b,p){l="REPLACE";let u=Rl(b)?b:pi(y.location,b,p);r&&r(u,b),d=h();let g=Al(u,d),S=y.createHref(u.mask||u);o.replaceState(g,"",S),i&&c&&c({action:l,location:y.location,delta:0})}function w(b){return Xm(a,b)}let y={get action(){return l},get location(){return e(a,o)},listen(b){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(Pl,m),c=b,()=>{a.removeEventListener(Pl,m),c=null}},createHref(b){return t(a,b)},createURL:w,encodeLocation(b){let p=w(b);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:x,replace:f,go(b){return o.go(b)}};return y}function Xm(e,t,r=!1){let s="http://localhost";e&&(s=e.location.origin!=="null"?e.location.origin:e.location.href),V(s,"No window.location.(origin|href) available to create URL");let a=typeof t=="string"?t:pn(t);return a=a.replace(/ $/,"%20"),!r&&a.startsWith("//")&&(a=s+a),new URL(a,s)}function Zd(e,t,r="/"){return Zm(e,t,r,!1)}function Zm(e,t,r,s,a){let i=typeof t=="string"?Gt(t):t,o=ot(i.pathname||"/",r);if(o==null)return null;let l=eh(e),c=null,d=ph(o);for(let h=0;c==null&&h<l.length;++h)c=dh(l[h],d,s);return c}function eh(e){let t=eu(e);return th(t),t}function eu(e,t=[],r=[],s="",a=!1){let i=(o,l,c=a,d)=>{let h={relativePath:d===void 0?o.path||"":d,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};if(h.relativePath.startsWith("/")){if(!h.relativePath.startsWith(s)&&c)return;V(h.relativePath.startsWith(s),`Absolute route path "${h.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),h.relativePath=h.relativePath.slice(s.length)}let m=$e([s,h.relativePath]),x=r.concat(h);o.children&&o.children.length>0&&(V(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${m}".`),eu(o.children,t,x,m,c)),!(o.path==null&&!o.index)&&t.push({path:m,score:lh(m,o.index),routesMeta:x})};return e.forEach((o,l)=>{var c;if(o.path===""||!((c=o.path)!=null&&c.includes("?")))i(o,l);else for(let d of tu(o.path))i(o,l,!0,d)}),t}function tu(e){let t=e.split("/");if(t.length===0)return[];let[r,...s]=t,a=r.endsWith("?"),i=r.replace(/\?$/,"");if(s.length===0)return a?[i,""]:[i];let o=tu(s.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),a&&l.push(...o),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function th(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:ch(t.routesMeta.map(s=>s.childrenIndex),r.routesMeta.map(s=>s.childrenIndex)))}var rh=/^:[\w-]+$/,nh=3,sh=2,ah=1,ih=10,oh=-2,Ll=e=>e==="*";function lh(e,t){let r=e.split("/"),s=r.length;return r.some(Ll)&&(s+=oh),t&&(s+=sh),r.filter(a=>!Ll(a)).reduce((a,i)=>a+(rh.test(i)?nh:i===""?ah:ih),s)}function ch(e,t){return e.length===t.length&&e.slice(0,-1).every((s,a)=>s===t[a])?e[e.length-1]-t[t.length-1]:0}function dh(e,t,r=!1){let{routesMeta:s}=e,a={},i="/",o=[];for(let l=0;l<s.length;++l){let c=s[l],d=l===s.length-1,h=i==="/"?t:t.slice(i.length)||"/",m=Ts({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},h),x=c.route;if(!m&&d&&r&&!s[s.length-1].route.index&&(m=Ts({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},h)),!m)return null;Object.assign(a,m.params),o.push({params:a,pathname:$e([i,m.pathname]),pathnameBase:gh($e([i,m.pathnameBase])),route:x}),m.pathnameBase!=="/"&&(i=$e([i,m.pathnameBase]))}return o}function Ts(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,s]=uh(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:s.reduce((d,{paramName:h,isOptional:m},x)=>{if(h==="*"){let w=l[x]||"";o=i.slice(0,i.length-w.length).replace(/(.)\/+$/,"$1")}const f=l[x];return m&&!f?d[h]=void 0:d[h]=(f||"").replace(/%2F/g,"/"),d},{}),pathname:i,pathnameBase:o,pattern:e}}function uh(e,t=!1,r=!0){ze(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let s=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c,d,h)=>{if(s.push({paramName:l,isOptional:c!=null}),c){let m=h.charAt(d+o.length);return m&&m!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(s.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),s]}function ph(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ze(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ot(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,s=e.charAt(r);return s&&s!=="/"?null:e.slice(r)||"/"}var mh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function hh(e,t="/"){let{pathname:r,search:s="",hash:a=""}=typeof e=="string"?Gt(e):e,i;return r?(r=nu(r),r.startsWith("/")?i=Il(r.substring(1),"/"):i=Il(r,t)):i=t,{pathname:i,search:yh(s),hash:xh(a)}}function Il(e,t){let r=Ns(t).split("/");return e.split("/").forEach(a=>{a===".."?r.length>1&&r.pop():a!=="."&&r.push(a)}),r.length>1?r.join("/"):"/"}function ya(e,t,r,s){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function fh(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function ru(e){let t=fh(e);return t.map((r,s)=>s===t.length-1?r.pathname:r.pathnameBase)}function lo(e,t,r,s=!1){let a;typeof e=="string"?a=Gt(e):(a={...e},V(!a.pathname||!a.pathname.includes("?"),ya("?","pathname","search",a)),V(!a.pathname||!a.pathname.includes("#"),ya("#","pathname","hash",a)),V(!a.search||!a.search.includes("#"),ya("#","search","hash",a)));let i=e===""||a.pathname==="",o=i?"/":a.pathname,l;if(o==null)l=r;else{let m=t.length-1;if(!s&&o.startsWith("..")){let x=o.split("/");for(;x[0]==="..";)x.shift(),m-=1;a.pathname=x.join("/")}l=m>=0?t[m]:"/"}let c=hh(a,l),d=o&&o!=="/"&&o.endsWith("/"),h=(i||o===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||h)&&(c.pathname+="/"),c}var nu=e=>e.replace(/\/\/+/g,"/"),$e=e=>nu(e.join("/")),Ns=e=>e.replace(/\/+$/,""),gh=e=>Ns(e).replace(/^\/*/,"/"),yh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,xh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,vh=class{constructor(e,t,r,s=!1){this.status=e,this.statusText=t||"",this.internal=s,r instanceof Error?(this.data=r.toString(),this.error=r):this.data=r}};function bh(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function wh(e){let t=e.map(r=>r.route.path).filter(Boolean);return $e(t)||"/"}var su=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function au(e,t){let r=e;if(typeof r!="string"||!mh.test(r))return{absoluteURL:void 0,isExternal:!1,to:r};let s=r,a=!1;if(su)try{let i=new URL(window.location.href),o=r.startsWith("//")?new URL(i.protocol+r):new URL(r),l=ot(o.pathname,t);o.origin===i.origin&&l!=null?r=l+o.search+o.hash:a=!0}catch{ze(!1,`<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:s,isExternal:a,to:r}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var iu=["POST","PUT","PATCH","DELETE"];new Set(iu);var Sh=["GET",...iu];new Set(Sh);var Tr=v.createContext(null);Tr.displayName="DataRouter";var Hs=v.createContext(null);Hs.displayName="DataRouterState";var ou=v.createContext(!1);function Eh(){return v.useContext(ou)}var lu=v.createContext({isTransitioning:!1});lu.displayName="ViewTransition";var Th=v.createContext(new Map);Th.displayName="Fetchers";var Nh=v.createContext(null);Nh.displayName="Await";var Ie=v.createContext(null);Ie.displayName="Navigation";var xn=v.createContext(null);xn.displayName="Location";var ct=v.createContext({outlet:null,matches:[],isDataRoute:!1});ct.displayName="Route";var co=v.createContext(null);co.displayName="RouteError";var cu="REACT_ROUTER_ERROR",kh="REDIRECT",jh="ROUTE_ERROR_RESPONSE";function Ch(e){if(e.startsWith(`${cu}:${kh}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function Ph(e){if(e.startsWith(`${cu}:${jh}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new vh(t.status,t.statusText,t.data)}catch{}}function Rh(e,{relative:t}={}){V(vn(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:s}=v.useContext(Ie),{hash:a,pathname:i,search:o}=bn(e,{relative:t}),l=i;return r!=="/"&&(l=i==="/"?r:$e([r,i])),s.createHref({pathname:l,search:o,hash:a})}function vn(){return v.useContext(xn)!=null}function dt(){return V(vn(),"useLocation() may be used only in the context of a <Router> component."),v.useContext(xn).location}var du="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function uu(e){v.useContext(Ie).static||v.useLayoutEffect(e)}function uo(){let{isDataRoute:e}=v.useContext(ct);return e?zh():Ah()}function Ah(){V(vn(),"useNavigate() may be used only in the context of a <Router> component.");let e=v.useContext(Tr),{basename:t,navigator:r}=v.useContext(Ie),{matches:s}=v.useContext(ct),{pathname:a}=dt(),i=JSON.stringify(ru(s)),o=v.useRef(!1);return uu(()=>{o.current=!0}),v.useCallback((c,d={})=>{if(ze(o.current,du),!o.current)return;if(typeof c=="number"){r.go(c);return}let h=lo(c,JSON.parse(i),a,d.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:$e([t,h.pathname])),(d.replace?r.replace:r.push)(h,d.state,d)},[t,r,i,a,e])}v.createContext(null);function bn(e,{relative:t}={}){let{matches:r}=v.useContext(ct),{pathname:s}=dt(),a=JSON.stringify(ru(r));return v.useMemo(()=>lo(e,JSON.parse(a),s,t==="path"),[e,a,s,t])}function Lh(e,t){return pu(e,t)}function pu(e,t,r){var b;V(vn(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=v.useContext(Ie),{matches:a}=v.useContext(ct),i=a[a.length-1],o=i?i.params:{},l=i?i.pathname:"/",c=i?i.pathnameBase:"/",d=i&&i.route;{let p=d&&d.path||"";hu(l,!d||p.endsWith("*")||p.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${p}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${p}"> to <Route path="${p==="/"?"*":`${p}/*`}">.`)}let h=dt(),m;if(t){let p=typeof t=="string"?Gt(t):t;V(c==="/"||((b=p.pathname)==null?void 0:b.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${p.pathname}" was given in the \`location\` prop.`),m=p}else m=h;let x=m.pathname||"/",f=x;if(c!=="/"){let p=c.replace(/^\//,"").split("/");f="/"+x.replace(/^\//,"").split("/").slice(p.length).join("/")}let w=r&&r.state.matches.length?r.state.matches.map(p=>Object.assign(p,{route:r.manifest[p.route.id]||p.route})):Zd(e,{pathname:f});ze(d||w!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),ze(w==null||w[w.length-1].route.element!==void 0||w[w.length-1].route.Component!==void 0||w[w.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let y=Uh(w&&w.map(p=>Object.assign({},p,{params:Object.assign({},o,p.params),pathname:$e([c,s.encodeLocation?s.encodeLocation(p.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?c:$e([c,s.encodeLocation?s.encodeLocation(p.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathnameBase])})),a,r);return t&&y?v.createElement(xn.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...m},navigationType:"POP"}},y):y}function Ih(){let e=Hh(),t=bh(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,s="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:s},i={padding:"2px 4px",backgroundColor:s},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=v.createElement(v.Fragment,null,v.createElement("p",null,"💿 Hey developer 👋"),v.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",v.createElement("code",{style:i},"ErrorBoundary")," or"," ",v.createElement("code",{style:i},"errorElement")," prop on your route.")),v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),r?v.createElement("pre",{style:a},r):null,o)}var _h=v.createElement(Ih,null),mu=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const r=Ph(e.digest);r&&(e=r)}let t=e!==void 0?v.createElement(ct.Provider,{value:this.props.routeContext},v.createElement(co.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?v.createElement(Oh,{error:e},t):t}};mu.contextType=ou;var xa=new WeakMap;function Oh({children:e,error:t}){let{basename:r}=v.useContext(Ie);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let s=Ch(t.digest);if(s){let a=xa.get(t);if(a)throw a;let i=au(s.location,r);if(su&&!xa.get(t))if(i.isExternal||s.reloadDocument)window.location.href=i.absoluteURL||i.to;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:s.replace}));throw xa.set(t,o),o}return v.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return e}function Dh({routeContext:e,match:t,children:r}){let s=v.useContext(Tr);return s&&s.static&&s.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=t.route.id),v.createElement(ct.Provider,{value:e},r)}function Uh(e,t=[],r){let s=r==null?void 0:r.state;if(e==null){if(!s)return null;if(s.errors)e=s.matches;else if(t.length===0&&!s.initialized&&s.matches.length>0)e=s.matches;else return null}let a=e,i=s==null?void 0:s.errors;if(i!=null){let h=a.findIndex(m=>m.route.id&&(i==null?void 0:i[m.route.id])!==void 0);V(h>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),a=a.slice(0,Math.min(a.length,h+1))}let o=!1,l=-1;if(r&&s){o=s.renderFallback;for(let h=0;h<a.length;h++){let m=a[h];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(l=h),m.route.id){let{loaderData:x,errors:f}=s,w=m.route.loader&&!x.hasOwnProperty(m.route.id)&&(!f||f[m.route.id]===void 0);if(m.route.lazy||w){r.isStatic&&(o=!0),l>=0?a=a.slice(0,l+1):a=[a[0]];break}}}}let c=r==null?void 0:r.onError,d=s&&c?(h,m)=>{var x,f;c(h,{location:s.location,params:((f=(x=s.matches)==null?void 0:x[0])==null?void 0:f.params)??{},pattern:wh(s.matches),errorInfo:m})}:void 0;return a.reduceRight((h,m,x)=>{let f,w=!1,y=null,b=null;s&&(f=i&&m.route.id?i[m.route.id]:void 0,y=m.route.errorElement||_h,o&&(l<0&&x===0?(hu("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),w=!0,b=null):l===x&&(w=!0,b=m.route.hydrateFallbackElement||null)));let p=t.concat(a.slice(0,x+1)),u=()=>{let g;return f?g=y:w?g=b:m.route.Component?g=v.createElement(m.route.Component,null):m.route.element?g=m.route.element:g=h,v.createElement(Dh,{match:m,routeContext:{outlet:h,matches:p,isDataRoute:s!=null},children:g})};return s&&(m.route.ErrorBoundary||m.route.errorElement||x===0)?v.createElement(mu,{location:s.location,revalidation:s.revalidation,component:y,error:f,children:u(),routeContext:{outlet:null,matches:p,isDataRoute:!0},onError:d}):u()},null)}function po(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Fh(e){let t=v.useContext(Tr);return V(t,po(e)),t}function Mh(e){let t=v.useContext(Hs);return V(t,po(e)),t}function Bh(e){let t=v.useContext(ct);return V(t,po(e)),t}function mo(e){let t=Bh(e),r=t.matches[t.matches.length-1];return V(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function $h(){return mo("useRouteId")}function Hh(){var s;let e=v.useContext(co),t=Mh("useRouteError"),r=mo("useRouteError");return e!==void 0?e:(s=t.errors)==null?void 0:s[r]}function zh(){let{router:e}=Fh("useNavigate"),t=mo("useNavigate"),r=v.useRef(!1);return uu(()=>{r.current=!0}),v.useCallback(async(a,i={})=>{ze(r.current,du),r.current&&(typeof a=="number"?await e.navigate(a):await e.navigate(a,{fromRouteId:t,...i}))},[e,t])}var _l={};function hu(e,t,r){!t&&!_l[e]&&(_l[e]=!0,ze(!1,r))}v.memo(Wh);function Wh({routes:e,manifest:t,future:r,state:s,isStatic:a,onError:i}){return pu(e,void 0,{manifest:t,state:s,isStatic:a,onError:i})}function Kt(e){V(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function qh({basename:e="/",children:t=null,location:r,navigationType:s="POP",navigator:a,static:i=!1,useTransitions:o}){V(!vn(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=e.replace(/^\/*/,"/"),c=v.useMemo(()=>({basename:l,navigator:a,static:i,useTransitions:o,future:{}}),[l,a,i,o]);typeof r=="string"&&(r=Gt(r));let{pathname:d="/",search:h="",hash:m="",state:x=null,key:f="default",mask:w}=r,y=v.useMemo(()=>{let b=ot(d,l);return b==null?null:{location:{pathname:b,search:h,hash:m,state:x,key:f,mask:w},navigationType:s}},[l,d,h,m,x,f,s,w]);return ze(y!=null,`<Router basename="${l}"> is not able to match the URL "${d}${h}${m}" because it does not start with the basename, so the <Router> won't render anything.`),y==null?null:v.createElement(Ie.Provider,{value:c},v.createElement(xn.Provider,{children:t,value:y}))}function Gh({children:e,location:t}){return Lh(mi(e),t)}function mi(e,t=[]){let r=[];return v.Children.forEach(e,(s,a)=>{if(!v.isValidElement(s))return;let i=[...t,a];if(s.type===v.Fragment){r.push.apply(r,mi(s.props.children,i));return}V(s.type===Kt,`[${typeof s.type=="string"?s.type:s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),V(!s.props.index||!s.props.children,"An index route cannot have child routes.");let o={id:s.props.id||i.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,middleware:s.props.middleware,loader:s.props.loader,action:s.props.action,hydrateFallbackElement:s.props.hydrateFallbackElement,HydrateFallback:s.props.HydrateFallback,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.hasErrorBoundary===!0||s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(o.children=mi(s.props.children,i)),r.push(o)}),r}var Xn="get",Zn="application/x-www-form-urlencoded";function zs(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function Vh(e){return zs(e)&&e.tagName.toLowerCase()==="button"}function Jh(e){return zs(e)&&e.tagName.toLowerCase()==="form"}function Kh(e){return zs(e)&&e.tagName.toLowerCase()==="input"}function Yh(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Qh(e,t){return e.button===0&&(!t||t==="_self")&&!Yh(e)}var Mn=null;function Xh(){if(Mn===null)try{new FormData(document.createElement("form"),0),Mn=!1}catch{Mn=!0}return Mn}var Zh=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function va(e){return e!=null&&!Zh.has(e)?(ze(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Zn}"`),null):e}function ef(e,t){let r,s,a,i,o;if(Jh(e)){let l=e.getAttribute("action");s=l?ot(l,t):null,r=e.getAttribute("method")||Xn,a=va(e.getAttribute("enctype"))||Zn,i=new FormData(e)}else if(Vh(e)||Kh(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||l.getAttribute("action");if(s=c?ot(c,t):null,r=e.getAttribute("formmethod")||l.getAttribute("method")||Xn,a=va(e.getAttribute("formenctype"))||va(l.getAttribute("enctype"))||Zn,i=new FormData(l,e),!Xh()){let{name:d,type:h,value:m}=e;if(h==="image"){let x=d?`${d}.`:"";i.append(`${x}x`,"0"),i.append(`${x}y`,"0")}else d&&i.append(d,m)}}else{if(zs(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Xn,s=null,a=Zn,o=e}return i&&a==="text/plain"&&(o=i,i=void 0),{action:s,method:r.toLowerCase(),encType:a,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function ho(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function fu(e,t,r,s){let a=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${s}`:a.pathname=`${a.pathname}.${s}`:a.pathname==="/"?a.pathname=`_root.${s}`:t&&ot(a.pathname,t)==="/"?a.pathname=`${Ns(t)}/_root.${s}`:a.pathname=`${Ns(a.pathname)}.${s}`,a}async function tf(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function rf(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function nf(e,t,r){let s=await Promise.all(e.map(async a=>{let i=t.routes[a.route.id];if(i){let o=await tf(i,r);return o.links?o.links():[]}return[]}));return lf(s.flat(1).filter(rf).filter(a=>a.rel==="stylesheet"||a.rel==="preload").map(a=>a.rel==="stylesheet"?{...a,rel:"prefetch",as:"style"}:{...a,rel:"prefetch"}))}function Ol(e,t,r,s,a,i){let o=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,l=(c,d)=>{var h;return r[d].pathname!==c.pathname||((h=r[d].route.path)==null?void 0:h.endsWith("*"))&&r[d].params["*"]!==c.params["*"]};return i==="assets"?t.filter((c,d)=>o(c,d)||l(c,d)):i==="data"?t.filter((c,d)=>{var m;let h=s.routes[c.route.id];if(!h||!h.hasLoader)return!1;if(o(c,d)||l(c,d))return!0;if(c.route.shouldRevalidate){let x=c.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:((m=r[0])==null?void 0:m.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof x=="boolean")return x}return!0}):[]}function sf(e,t,{includeHydrateFallback:r}={}){return af(e.map(s=>{let a=t.routes[s.route.id];if(!a)return[];let i=[a.module];return a.clientActionModule&&(i=i.concat(a.clientActionModule)),a.clientLoaderModule&&(i=i.concat(a.clientLoaderModule)),r&&a.hydrateFallbackModule&&(i=i.concat(a.hydrateFallbackModule)),a.imports&&(i=i.concat(a.imports)),i}).flat(1))}function af(e){return[...new Set(e)]}function of(e){let t={},r=Object.keys(e).sort();for(let s of r)t[s]=e[s];return t}function lf(e,t){let r=new Set;return new Set(t),e.reduce((s,a)=>{let i=JSON.stringify(of(a));return r.has(i)||(r.add(i),s.push({key:i,link:a})),s},[])}function fo(){let e=v.useContext(Tr);return ho(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function cf(){let e=v.useContext(Hs);return ho(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var go=v.createContext(void 0);go.displayName="FrameworkContext";function yo(){let e=v.useContext(go);return ho(e,"You must render this element inside a <HydratedRouter> element"),e}function df(e,t){let r=v.useContext(go),[s,a]=v.useState(!1),[i,o]=v.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:d,onMouseLeave:h,onTouchStart:m}=t,x=v.useRef(null);v.useEffect(()=>{if(e==="render"&&o(!0),e==="viewport"){let y=p=>{p.forEach(u=>{o(u.isIntersecting)})},b=new IntersectionObserver(y,{threshold:.5});return x.current&&b.observe(x.current),()=>{b.disconnect()}}},[e]),v.useEffect(()=>{if(s){let y=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(y)}}},[s]);let f=()=>{a(!0)},w=()=>{a(!1),o(!1)};return r?e!=="intent"?[i,x,{}]:[i,x,{onFocus:_r(l,f),onBlur:_r(c,w),onMouseEnter:_r(d,f),onMouseLeave:_r(h,w),onTouchStart:_r(m,f)}]:[!1,x,{}]}function _r(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function uf({page:e,...t}){let r=Eh(),{router:s}=fo(),a=v.useMemo(()=>Zd(s.routes,e,s.basename),[s.routes,e,s.basename]);return a?r?v.createElement(mf,{page:e,matches:a,...t}):v.createElement(hf,{page:e,matches:a,...t}):null}function pf(e){let{manifest:t,routeModules:r}=yo(),[s,a]=v.useState([]);return v.useEffect(()=>{let i=!1;return nf(e,t,r).then(o=>{i||a(o)}),()=>{i=!0}},[e,t,r]),s}function mf({page:e,matches:t,...r}){let s=dt(),{future:a}=yo(),{basename:i}=fo(),o=v.useMemo(()=>{if(e===s.pathname+s.search+s.hash)return[];let l=fu(e,i,a.v8_trailingSlashAwareDataRequests,"rsc"),c=!1,d=[];for(let h of t)typeof h.route.shouldRevalidate=="function"?c=!0:d.push(h.route.id);return c&&d.length>0&&l.searchParams.set("_routes",d.join(",")),[l.pathname+l.search]},[i,a.v8_trailingSlashAwareDataRequests,e,s,t]);return v.createElement(v.Fragment,null,o.map(l=>v.createElement("link",{key:l,rel:"prefetch",as:"fetch",href:l,...r})))}function hf({page:e,matches:t,...r}){let s=dt(),{future:a,manifest:i,routeModules:o}=yo(),{basename:l}=fo(),{loaderData:c,matches:d}=cf(),h=v.useMemo(()=>Ol(e,t,d,i,s,"data"),[e,t,d,i,s]),m=v.useMemo(()=>Ol(e,t,d,i,s,"assets"),[e,t,d,i,s]),x=v.useMemo(()=>{if(e===s.pathname+s.search+s.hash)return[];let y=new Set,b=!1;if(t.forEach(u=>{var S;let g=i.routes[u.route.id];!g||!g.hasLoader||(!h.some(E=>E.route.id===u.route.id)&&u.route.id in c&&((S=o[u.route.id])!=null&&S.shouldRevalidate)||g.hasClientLoader?b=!0:y.add(u.route.id))}),y.size===0)return[];let p=fu(e,l,a.v8_trailingSlashAwareDataRequests,"data");return b&&y.size>0&&p.searchParams.set("_routes",t.filter(u=>y.has(u.route.id)).map(u=>u.route.id).join(",")),[p.pathname+p.search]},[l,a.v8_trailingSlashAwareDataRequests,c,s,i,h,t,e,o]),f=v.useMemo(()=>sf(m,i),[m,i]),w=pf(m);return v.createElement(v.Fragment,null,x.map(y=>v.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...r})),f.map(y=>v.createElement("link",{key:y,rel:"modulepreload",href:y,...r})),w.map(({key:y,link:b})=>v.createElement("link",{key:y,nonce:r.nonce,...b,crossOrigin:b.crossOrigin??r.crossOrigin})))}function ff(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var gf=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{gf&&(window.__reactRouterVersion="7.17.0")}catch{}function yf({basename:e,children:t,useTransitions:r,window:s}){let a=v.useRef();a.current==null&&(a.current=Km({window:s,v5Compat:!0}));let i=a.current,[o,l]=v.useState({action:i.action,location:i.location}),c=v.useCallback(d=>{r===!1?l(d):v.startTransition(()=>l(d))},[r]);return v.useLayoutEffect(()=>i.listen(c),[i,c]),v.createElement(qh,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:i,useTransitions:r})}var gu=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,yu=v.forwardRef(function({onClick:t,discover:r="render",prefetch:s="none",relative:a,reloadDocument:i,replace:o,mask:l,state:c,target:d,to:h,preventScrollReset:m,viewTransition:x,defaultShouldRevalidate:f,...w},y){let{basename:b,navigator:p,useTransitions:u}=v.useContext(Ie),g=typeof h=="string"&&gu.test(h),S=au(h,b);h=S.to;let E=Rh(h,{relative:a}),k=dt(),j=null;if(l){let fe=lo(l,[],k.mask?k.mask.pathname:"/",!0);b!=="/"&&(fe.pathname=fe.pathname==="/"?b:$e([b,fe.pathname])),j=p.createHref(fe)}let[C,I,A]=df(s,w),X=wf(h,{replace:o,mask:l,state:c,target:d,preventScrollReset:m,relative:a,viewTransition:x,defaultShouldRevalidate:f,useTransitions:u});function Ye(fe){t&&t(fe),fe.defaultPrevented||X(fe)}let _e=!(S.isExternal||i),Qe=v.createElement("a",{...w,...A,href:(_e?j:void 0)||S.absoluteURL||E,onClick:_e?Ye:t,ref:ff(y,I),target:d,"data-discover":!g&&r==="render"?"true":void 0});return C&&!g?v.createElement(v.Fragment,null,Qe,v.createElement(uf,{page:E})):Qe});yu.displayName="Link";var xf=v.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:s="",end:a=!1,style:i,to:o,viewTransition:l,children:c,...d},h){let m=bn(o,{relative:d.relative}),x=dt(),f=v.useContext(Hs),{navigator:w,basename:y}=v.useContext(Ie),b=f!=null&&kf(m)&&l===!0,p=w.encodeLocation?w.encodeLocation(m).pathname:m.pathname,u=x.pathname,g=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;r||(u=u.toLowerCase(),g=g?g.toLowerCase():null,p=p.toLowerCase()),g&&y&&(g=ot(g,y)||g);const S=p!=="/"&&p.endsWith("/")?p.length-1:p.length;let E=u===p||!a&&u.startsWith(p)&&u.charAt(S)==="/",k=g!=null&&(g===p||!a&&g.startsWith(p)&&g.charAt(p.length)==="/"),j={isActive:E,isPending:k,isTransitioning:b},C=E?t:void 0,I;typeof s=="function"?I=s(j):I=[s,E?"active":null,k?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let A=typeof i=="function"?i(j):i;return v.createElement(yu,{...d,"aria-current":C,className:I,ref:h,style:A,to:o,viewTransition:l},typeof c=="function"?c(j):c)});xf.displayName="NavLink";var vf=v.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:s,replace:a,state:i,method:o=Xn,action:l,onSubmit:c,relative:d,preventScrollReset:h,viewTransition:m,defaultShouldRevalidate:x,...f},w)=>{let{useTransitions:y}=v.useContext(Ie),b=Tf(),p=Nf(l,{relative:d}),u=o.toLowerCase()==="get"?"get":"post",g=typeof l=="string"&&gu.test(l),S=E=>{if(c&&c(E),E.defaultPrevented)return;E.preventDefault();let k=E.nativeEvent.submitter,j=(k==null?void 0:k.getAttribute("formmethod"))||o,C=()=>b(k||E.currentTarget,{fetcherKey:t,method:j,navigate:r,replace:a,state:i,relative:d,preventScrollReset:h,viewTransition:m,defaultShouldRevalidate:x});y&&r!==!1?v.startTransition(()=>C()):C()};return v.createElement("form",{ref:w,method:u,action:p,onSubmit:s?c:S,...f,"data-discover":!g&&e==="render"?"true":void 0})});vf.displayName="Form";function bf(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function xu(e){let t=v.useContext(Tr);return V(t,bf(e)),t}function wf(e,{target:t,replace:r,mask:s,state:a,preventScrollReset:i,relative:o,viewTransition:l,defaultShouldRevalidate:c,useTransitions:d}={}){let h=uo(),m=dt(),x=bn(e,{relative:o});return v.useCallback(f=>{if(Qh(f,t)){f.preventDefault();let w=r!==void 0?r:pn(m)===pn(x),y=()=>h(e,{replace:w,mask:s,state:a,preventScrollReset:i,relative:o,viewTransition:l,defaultShouldRevalidate:c});d?v.startTransition(()=>y()):y()}},[m,h,x,r,s,a,t,e,i,o,l,c,d])}var Sf=0,Ef=()=>`__${String(++Sf)}__`;function Tf(){let{router:e}=xu("useSubmit"),{basename:t}=v.useContext(Ie),r=$h(),s=e.fetch,a=e.navigate;return v.useCallback(async(i,o={})=>{let{action:l,method:c,encType:d,formData:h,body:m}=ef(i,t);if(o.navigate===!1){let x=o.fetcherKey||Ef();await s(x,r,o.action||l,{defaultShouldRevalidate:o.defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:h,body:m,formMethod:o.method||c,formEncType:o.encType||d,flushSync:o.flushSync})}else await a(o.action||l,{defaultShouldRevalidate:o.defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:h,body:m,formMethod:o.method||c,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[s,a,t,r])}function Nf(e,{relative:t}={}){let{basename:r}=v.useContext(Ie),s=v.useContext(ct);V(s,"useFormAction must be used inside a RouteContext");let[a]=s.matches.slice(-1),i={...bn(e||".",{relative:t})},o=dt();if(e==null){i.search=o.search;let l=new URLSearchParams(i.search),c=l.getAll("index");if(c.some(h=>h==="")){l.delete("index"),c.filter(m=>m).forEach(m=>l.append("index",m));let h=l.toString();i.search=h?`?${h}`:""}}return(!e||e===".")&&a.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(i.pathname=i.pathname==="/"?r:$e([r,i.pathname])),pn(i)}function kf(e,{relative:t}={}){let r=v.useContext(lu);V(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:s}=xu("useViewTransitionState"),a=bn(e,{relative:t});if(!r.isTransitioning)return!1;let i=ot(r.currentLocation.pathname,s)||r.currentLocation.pathname,o=ot(r.nextLocation.pathname,s)||r.nextLocation.pathname;return Ts(a.pathname,o)!=null||Ts(a.pathname,i)!=null}const jf={title:"🧪 Automation Testing Playground",subtitle:"Practice automation with Selenium, Cypress, and Playwright"},Cf={darkMode:"Dark Mode",lightMode:"Light Mode",homeTooltip:"Back to top"},Pf={basic:"📝 Basic Elements",locatorGuide:"🎯 Locator",complex:"🎯 Complex Interactions",advanced:"🚀 Advanced Scenarios",table:"📊 Data Table",api:"🌐 API Simulation",comparison:"🔍 Test Tools Comparison",practice:"🛠️ Practice Playground"},Rf={text:"Created for Automation Testers • All elements have unique test IDs",hint:"Inspect elements to find data-testid attributes for your tests"},Af={title:"📝 Basic Elements",subtitle:"Practice basic form interactions and element selection",inputFields:"Input Fields",textInput:"Text Input",textPlaceholder:"Enter text here",emailInput:"Email Input",numberInput:"Number Input",passwordInput:"Password Input",checkboxes:"Checkboxes",singleCheckbox:"Single Checkbox (Terms & Conditions)",multiCheckboxes:"Multiple Checkboxes (Select interests):",radioButtons:"Radio Buttons",experienceLevel:"Select your experience level:",beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced",expert:"Expert",dropdowns:"Dropdowns (Select)",staticDropdown:"Static Dropdown",selectCountry:"Select a country",dynamicDropdown:"Dynamic Dropdown",loading:"Loading...",selectOption:"Select an option",selectedValues:"Selected Values:",text:"Text:",email:"Email:",number:"Number:",singleCheckboxLabel:"Single Checkbox:",multiCheckboxesLabel:"Multi Checkboxes:",radio:"Radio:",staticDropdownLabel:"Static Dropdown:",dynamicDropdownLabel:"Dynamic Dropdown:",empty:"(empty)",checked:"Checked",unchecked:"Unchecked",none:"None",noneSelected:"(none selected)"},Lf={title:"🎯 Complex Interactions",subtitle:"Practice advanced interactions like drag-drop, hover menus, and modals",dragDrop:"Drag and Drop",zone1:"Zone 1",zone2:"Zone 2",hoverMenu:"Hover Menu",modalsAlerts:"Modals and Alerts",showAlert:"Show Alert",showConfirm:"Show Confirm",showPrompt:"Show Prompt",showCustomModal:"Show Custom Modal",customModal:"Custom Modal",modalText:"This is a custom HTML modal. It can contain any content you want!",cancel:"Cancel",confirm:"Confirm",iframeInteraction:"Iframe Interaction",iframeDescription:"The form below is inside an iframe (simulated with inline HTML)"},If={title:"🚀 Advanced Scenarios",subtitle:"Test complex scenarios including Shadow DOM, dynamic content, and file operations",shadowDOM:"Shadow DOM",shadowDescription:"Click the button inside the shadow root:",shadowButton:"Shadow Button",shadowClicked:"Shadow button clicked!",dynamicContent:"Dynamic Content",dynamicDescription:"Content will appear after 3-6 seconds delay:",loadContent:"Load Dynamic Content",waitingText:"Waiting for content to load...",infiniteScroll:"Infinite Scroll",scrollDescription:"Scroll to bottom to load more items:",itemsCount:"Items count:",scrollToLoad:"Scroll to load more...",fileUpload:"File Upload",chooseFile:"Choose File",noFileChosen:"No file chosen",uploadedFile:"Uploaded file:",fileDownload:"File Download",downloadSample:"Download Sample File"},_f={title:"📊 Data Table",subtitle:"Practice table sorting, searching, and pagination",searchPlaceholder:"Search by name, email, or age...",name:"Name",email:"Email",age:"Age",country:"Country",showing:"Showing",to:"to",of:"of",entries:"entries",previous:"Previous",next:"Next",noResults:"No results found"},Of={title:"🌐 API Simulation",subtitle:"Practice API testing with different HTTP status codes",description:"Simulate different API responses by clicking the buttons below. Check the status code and response message.",successButton:"200 - Success",unauthorizedButton:"401 - Unauthorized",notFoundButton:"404 - Not Found",serverErrorButton:"500 - Server Error",statusCode:"Status Code:",responseMessage:"Response Message:",noRequestYet:"No request made yet",booksTag:"Books API",booksDescription:"Full CRUD operations for managing a digital library.",postmanGuide:"How to Trigger in Postman",postmanSteps:{step1:"1. Open Postman application",step2:"2. Select {{method}} method",step3:"3. Enter URL: {{url}}",step4:"4. Set Header: Content-Type: application/json",step5:"5. Go to Body > raw > JSON and paste the request body (if needed)",step6:"6. Click 'Send' button"},endpoints:{getBooks:{summary:"Get All Books",description:"Retrieves a list of all available books in the library."},getBookById:{summary:"Get Book by ID",description:"Retrieves a specific book using its unique ID."},createBook:{summary:"Create New Book",description:"Adds a new book to the library."},updateBook:{summary:"Update Book",description:"Updates an existing book's information by ID."},deleteBook:{summary:"Delete Book",description:"Removes a book from the library permanently."}}},Df={title:"🔍 Cypress, Selenium, and Playwright Command Comparison",overview:"Overview",basicCommands:"Basic Commands - Navigation",elementFinding:"Element Finding and Verification",clickOperations:"Click Operations",formOperations:"Form Operations",waitOperations:"Wait Operations",performance:"Performance Comparison",recommendations:"When to Use Each Tool?",exampleScenario:"Example: Login Form Test",conclusion:"💡 Conclusion",conclusionText:"Each tool has its own strengths:",cypressStrength:"Developer-friendly, fast feedback, excellent debugging",seleniumStrength:"Mature, flexible, wide language and browser support",playwrightStrength:"Modern, fast, powerful API and network control",finalAdvice:"Choose the most suitable tool according to your project requirements, team skills, and test scope."},Uf={title:"🎯 Selenium vs Playwright Locator Guide",subtitle:"Migration from Java Selenium to TypeScript Playwright",tabs:{comparison:"📊 Comparison (20 Examples)",playwrightOnly:"🎭 Playwright Only (20 Examples)"},headers:{html:"📝 HTML Code:",selenium:"☕ Java Selenium",playwright:"🎭 TypeScript Playwright",playwrightOnlyFeatures:"🎭 The following features are only available in Playwright!",example:"Example",playwrightExample:"Playwright Example"},tips:{prefix:"💡 Tip:",comp1:"CSS selectors are default in Playwright. Use # for ID.",comp2:"Use . (dot) for Class.",comp3:"Use square brackets for Attribute selectors.",comp4:"Role-based selectors in Playwright are more accessible and reliable.",comp5:"Using getByRole is faster and more readable than XPath.",comp6:"CSS selectors work the same way in both frameworks.",comp7:"Playwright's getByPlaceholder method is much more practical.",comp8:"getByLabel is much cleaner than complex XPaths.",comp9:"Using role-based selectors for headings is best practice.",comp10:"Test IDs are the most reliable selectors in test environments.",comp11:"In Playwright, locator captures multiple elements automatically.",comp12:"You can do partial text search with getByText.",comp13:"getByAltText is the best option for images.",comp14:"Chained selectors are cleaner in Playwright.",comp15:"Using role for checkboxes is a more semantic approach.",comp16:"You can use selectOption() method for dropdowns.",comp17:"getByRole('cell') can also be used for tables.",comp18:"getByTitle is very practical for title attributes.",comp19:"Locator chaining is more readable in Playwright.",comp20:"Combining with dot is the same for multiple classes.",pw1:"You can select the first of multiple elements with first().",pw2:"last() selects the last element in the list.",pw3:"You can select the element at a specific index with nth(index). Index starts from 0.",pw4:"You can filter elements by text or other criteria with filter().",pw5:"You can find a parent containing a specific element with has.",pw6:"You can check element state with Playwright assertion methods.",pw7:"You can easily check element states (enabled/disabled).",pw8:"Special methods are available for checkbox operations.",pw9:"toHaveText checks exact match, toContainText checks partial match.",pw10:"Checking or getting input values is very easy.",pw11:"You can check class existence with string or regex.",pw12:"You can check any HTML attribute or get its value.",pw13:"You can check or get the count of found elements.",pw14:"You can easily check link href and page URL.",pw15:"Playwright automatically waits for elements to be ready!",pw16:"You can make more specific selections by chaining locators.",pw17:"You can select from dropdown in 3 different ways.",pw18:"You can easily access elements inside iframe with frameLocator.",pw19:"You can get all elements as array with all() and loop through them.",pw20:"You can upload files even to hidden file inputs."},actions:{firstElement:"🎭 Playwright - Select First Element:",lastElement:"🎭 Playwright - Select Last Element:",nthElement:"🎭 Playwright - Select Element by Index:",filtering:"🎭 Playwright - Filtering:",hasElement:"🎭 Playwright - Filtering by Child:",visibility:"🎭 Playwright - Visibility Check:",stateCheck:"🎭 Playwright - State Check:",checkboxCheck:"🎭 Playwright - Checkbox Check:",textContent:"🎭 Playwright - Text Content Check:",inputValue:"🎭 Playwright - Input Value Check:",classCheck:"🎭 Playwright - Class Check:",attributeCheck:"🎭 Playwright - Attribute Check:",elementCount:"🎭 Playwright - Element Count:",urlCheck:"🎭 Playwright - URL Check:",autoWait:"🎭 Playwright - Auto Wait:",chaining:"🎭 Playwright - Chained Locators:",dropdownSelection:"🎭 Playwright - Dropdown Selection:",frameElement:"🎭 Playwright - Element inside Frame:",allElements:"🎭 Playwright - Get All Elements:",fileUpload:"🎭 Playwright - File Upload:"}},Ff={backButton:"← Back to Automation Exercise Main Page"},Mf={navButton:"⚡ JMeter",title:"⚡ Apache JMeter",subtitle:"Performance & Load Testing Tool",intro:"Apache JMeter is a free, open-source Java application designed to load test and measure the performance of web applications, APIs, and services.",whatIs:"What is Apache JMeter?",whatIsDesc:"JMeter simulates heavy load on a server to test its strength and analyze overall performance under different load types. It is widely used for performance, load, stress, and functional testing.",whyUse:"Why Use JMeter?",whyUseItems:{free:"100% Free & Open Source",gui:"Powerful GUI + Command Line support",protocols:"Supports HTTP, HTTPS, FTP, SOAP, REST, JDBC and more",reports:"Detailed HTML Reports and Graphs",scalable:"Highly Scalable — Distributed Testing",plugins:"Rich Plugin Ecosystem"},installation:"Installation",installationDesc:"Download JMeter from apache.jmeter.net. Requires Java 8 or higher.",concepts:"Core Concepts",conceptsItems:{threadGroup:"Thread Group — Simulates virtual users",sampler:"Samplers — HTTP, JDBC, FTP requests",listener:"Listeners — View Results, Aggregate Report",assertion:"Assertions — Response validation",timer:"Timers — Think time between requests",config:"Config Elements — CSV Data Set, HTTP Defaults"},firstTest:"Your First Test Plan",firstTestDesc:"Step-by-step guide: Create Thread Group → Add HTTP Sampler → Add Listener → Configure & Run.",reports:"Reports & Analysis",reportsDesc:"Generate rich HTML reports with charts for Response Time, Throughput, Error Rate, Percentiles and more.",comingSoon:"Detailed content coming soon..."},Bf={navButton:"🗄️ SQL",title:"🗄️ SQL",subtitle:"Database Testing & Query Mastery",intro:"SQL (Structured Query Language) is the standard language for managing relational databases and is essential for backend and database testing in automation.",whatIs:"What is SQL?",whatIsDesc:"SQL is a domain-specific language for managing data held in relational databases. It enables creating, reading, updating, and deleting records (CRUD).",whyUse:"Why SQL in Test Automation?",whyUseItems:{verify:"Verify database state after UI/API actions",seed:"Seed test data before test execution",cleanup:"Clean up test data after tests",direct:"Directly query backend to validate business logic",perf:"Performance testing of database queries",integrity:"Data integrity and constraint validation"},select:"SELECT Queries",selectDesc:"Retrieve data with SELECT, FROM, WHERE, ORDER BY, LIMIT.",joins:"JOIN Operations",joinsDesc:"INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN — combining data from multiple tables.",aggregates:"Aggregate Functions",aggregatesDesc:"COUNT, SUM, AVG, MIN, MAX with GROUP BY and HAVING clauses.",subqueries:"Subqueries & CTEs",subqueriesDesc:"Nested queries and Common Table Expressions for complex data retrieval.",dml:"DML Operations",dmlDesc:"INSERT, UPDATE, DELETE — modifying database records for test setup and teardown.",testing:"Database Testing Strategies",testingDesc:"Schema validation, referential integrity, stored procedure testing, and data migration verification.",comingSoon:"Detailed content coming soon..."},$f={navButton:"📘 TypeScript",title:"📘 TypeScript",subtitle:"Typed JavaScript for Reliable Automation",intro:"TypeScript is a strongly typed superset of JavaScript that compiles to plain JS. It brings type safety, better tooling, and improved maintainability to your automation framework.",whatIs:"What is TypeScript?",whatIsDesc:"TypeScript adds optional static types to JavaScript. Catch bugs at compile time, get better IDE support, and write more maintainable automation code.",whyUse:"Why TypeScript for Automation?",whyUseItems:{types:"Catch type errors before runtime",intellisense:"Excellent IDE IntelliSense & autocomplete",playwright:"Native TypeScript support in Playwright",refactor:"Safe refactoring across large codebases",docs:"Types serve as living documentation",oop:"Full OOP support: interfaces, generics, decorators"},basics:"TypeScript Basics",basicsDesc:"Types, interfaces, enums, type aliases, union types, intersection types.",classes:"Classes & Interfaces",classesDesc:"Object-oriented patterns for Page Object Model, base classes, and service abstractions.",generics:"Generics",genericsDesc:"Write reusable, type-safe utility functions and helper classes.",async:"Async/Await & Promises",asyncDesc:"Modern async patterns essential for Playwright automation.",playwright:"TypeScript + Playwright",playwrightDesc:"Playwright was built TypeScript-first. Leverage full type safety for page interactions, fixtures, and assertions.",config:"tsconfig.json Configuration",configDesc:"Compiler options, module resolution, strict mode settings for automation projects.",comingSoon:"Detailed content coming soon..."},Hf={navButton:"🐍 Python",title:"🐍 Python",subtitle:"Versatile Automation with Python",intro:"Python is one of the most popular languages for test automation. Its clear syntax, rich libraries (pytest, Selenium, Requests), and large community make it ideal for all automation needs.",whatIs:"Why Python for Automation?",whatIsDesc:"Python's simplicity, readability, and extensive library ecosystem make it perfect for UI automation, API testing, data-driven testing, and CI/CD integration.",whyUse:"Python Automation Advantages",whyUseItems:{simple:"Simple, readable syntax — easy to learn",pytest:"pytest — powerful and extensible testing framework",selenium:"Selenium WebDriver support out of the box",requests:"requests library for API testing",pandas:"pandas for data-driven test scenarios",ci:"Excellent CI/CD integration (GitHub Actions, Jenkins)"},pytest:"pytest Framework",pytestDesc:"Fixtures, parametrize, markers, plugins — the gold standard for Python testing.",selenium:"Selenium + Python",seleniumDesc:"Browser automation with Selenium WebDriver, Page Object Model, and wait strategies.",requests:"Requests Library",requestsDesc:"HTTP requests for API testing: GET, POST, PUT, DELETE with headers and auth.",datadriven:"Data-Driven Testing",datadrivenDesc:"Parametrize tests with CSV, JSON, Excel data using pytest.mark.parametrize.",pom:"Page Object Model",pomDesc:"Design pattern for maintainable Selenium automation with Python.",bestpractices:"Best Practices",bestpracticesDesc:"Project structure, fixtures, conftest.py, environment management with .env files.",comingSoon:"Detailed content coming soon..."},zf={title:"🛠️ Practice Playground",subtitle:"Practice automation with modern UI elements",homeTooltip:"Return to home",personalInfo:{title:"👤 Personal Information",name:"Full Name",namePlaceholder:"Enter your name",email:"Email",emailPlaceholder:"example@mail.com",phone:"Phone",phonePlaceholder:"5XX XXX XX XX",address:"Address",addressPlaceholder:"Enter your full address"},selections:{title:"🔘 Selection Elements",gender:"Gender",male:"Male",female:"Female",days:"Days",monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday",country:"Country",colors:"Color Selection (Multi)",selectedColors:"Selected Colors:"},datePickers:{title:"📅 Date Pickers",standard:"Standard Date",range:"Date Range"},tables:{title:"📊 Table Structures",static:"Static Table",pagination:"Pagination Table"},files:{title:"📁 File Operations",single:"Single File Upload",multiple:"Multiple File Upload"},interactions:{title:"🖱️ Interactive Tools",slider:"Slider",dragDrop:"Drag and Drop",doubleClick:"Double Click",dragMe:"Drag Me",dropHere:"Drop Here",doubleClickResult:"Double clicked!"}},Wf={header:jf,buttons:Cf,nav:Pf,footer:Rf,basic:Af,complex:Lf,advanced:If,table:_f,api:Of,comparison:Df,locator:Uf,pages:Ff,jmeter:Mf,sql:Bf,typescript:$f,python:Hf,practice:zf},qf={title:"🧪 Automation Testing Playground",subtitle:"Selenium, Cypress ve Playwright ile otomasyon pratiği yapın"},Gf={darkMode:"Karanlık Mod",lightMode:"Aydınlık Mod",homeTooltip:"Sayfanın başına dön"},Vf={basic:"📝 Temel Elementler",locatorGuide:"🎯 Locate Alma",complex:"🎯 Karmaşık Etkileşimler",advanced:"🚀 Gelişmiş Senaryolar",table:"📊 Veri Tablosu",api:"🌐 API Simülasyonu",comparison:"🔍 Test Araçları Karşılaştırma",practice:"🛠️ Uygulama Bahçesi"},Jf={text:"Otomasyon Test Mühendisleri İçin Hazırlandı • Tüm elementlerin benzersiz test ID'leri var",hint:"Test ID'lerini bulmak için elementleri inceleyin (data-testid)"},Kf={title:"📝 Temel Elementler",subtitle:"Temel form etkileşimleri ve element seçimi pratiği yapın",inputFields:"Giriş Alanları",textInput:"Text Input",textPlaceholder:"Buraya metin girin",emailInput:"Email Input",numberInput:"Number Input",passwordInput:"Password Input",checkboxes:"Checkbox'lar",singleCheckbox:"Tekli Checkbox (Şartlar ve Koşullar)",multiCheckboxes:"Çoklu Checkbox'lar (İlgi alanlarınızı seçin):",radioButtons:"Radio Button'lar",experienceLevel:"Deneyim seviyenizi seçin:",beginner:"Başlangıç",intermediate:"Orta Seviye",advanced:"İleri Seviye",expert:"Uzman",dropdowns:"Dropdown'lar (Select)",staticDropdown:"Statik Dropdown",selectCountry:"Ülke seçin",dynamicDropdown:"Dinamik Dropdown",loading:"Yükleniyor...",selectOption:"Seçenek seçin",selectedValues:"Seçilen Değerler:",text:"Text:",email:"Email:",number:"Number:",singleCheckboxLabel:"Tekli Checkbox:",multiCheckboxesLabel:"Çoklu Checkbox'lar:",radio:"Radio:",staticDropdownLabel:"Statik Dropdown:",dynamicDropdownLabel:"Dinamik Dropdown:",empty:"(boş)",checked:"İşaretli",unchecked:"İşaretsiz",none:"Hiçbiri",noneSelected:"(seçilmedi)"},Yf={title:"🎯 Karmaşık Etkileşimler",subtitle:"Drag-drop, hover menüler ve modal'lar gibi gelişmiş etkileşimler pratiği yapın",dragDrop:"Drag and Drop",zone1:"Zone 1",zone2:"Zone 2",hoverMenu:"Hover Menü",modalsAlerts:"Modal'lar ve Alert'ler",showAlert:"Alert Göster",showConfirm:"Confirm Göster",showPrompt:"Prompt Göster",showCustomModal:"Özel Modal Göster",customModal:"Özel Modal",modalText:"Bu özel bir HTML modal'dır. İstediğiniz içeriği barındırabilir!",cancel:"İptal",confirm:"Onayla",iframeInteraction:"Iframe Etkileşimi",iframeDescription:"Aşağıdaki form bir iframe içinde (inline HTML ile simüle edilmiş)"},Qf={title:"🚀 Gelişmiş Senaryolar",subtitle:"Shadow DOM, dinamik içerik ve dosya işlemleri gibi karmaşık senaryoları test edin",shadowDOM:"Shadow DOM",shadowDescription:"Shadow root içindeki butona tıklayın:",shadowButton:"Shadow Button",shadowClicked:"Shadow button'a tıklandı!",dynamicContent:"Dinamik İçerik",dynamicDescription:"İçerik 3-6 saniye gecikme sonrası görünecek:",loadContent:"Dinamik İçerik Yükle",waitingText:"İçeriğin yüklenmesi bekleniyor...",infiniteScroll:"Sonsuz Scroll",scrollDescription:"Daha fazla öğe yüklemek için aşağı kaydırın:",itemsCount:"Öğe sayısı:",scrollToLoad:"Daha fazla yüklemek için kaydırın...",fileUpload:"Dosya Yükleme",chooseFile:"Dosya Seç",noFileChosen:"Dosya seçilmedi",uploadedFile:"Yüklenen dosya:",fileDownload:"Dosya İndirme",downloadSample:"Örnek Dosya İndir"},Xf={title:"📊 Veri Tablosu",subtitle:"Tablo sıralama, arama ve sayfalama pratiği yapın",searchPlaceholder:"İsim, email veya yaşa göre ara...",name:"İsim",email:"Email",age:"Yaş",country:"Ülke",showing:"Gösterilen",to:"ile",of:"toplam",entries:"kayıt",previous:"Önceki",next:"Sonraki",noResults:"Sonuç bulunamadı"},Zf={title:"🌐 API Simülasyonu",subtitle:"Farklı HTTP durum kodları ile API testi pratiği yapın",description:"Aşağıdaki butonlara tıklayarak farklı API yanıtlarını simüle edin. Durum kodunu ve yanıt mesajını kontrol edin.",successButton:"200 - Başarılı",unauthorizedButton:"401 - Yetkisiz",notFoundButton:"404 - Bulunamadı",serverErrorButton:"500 - Sunucu Hatası",statusCode:"Durum Kodu:",responseMessage:"Yanıt Mesajı:",noRequestYet:"Henüz istek yapılmadı",booksTag:"Kitaplar API",booksDescription:"Dijital kütüphane yönetimi için tam CRUD işlemleri.",postmanGuide:"Postman ile Nasıl Tetiklenir",postmanSteps:{step1:"1. Postman uygulamasını açın",step2:"2. {{method}} metodunu seçin",step3:"3. URL: {{url}} girin",step4:"4. Header ekleyin: Content-Type: application/json",step5:"5. Body > raw > JSON sekmesine gidin ve veriyi yapıştırın (gerekliyse)",step6:"6. 'Send' butonuna tıklayın"},endpoints:{getBooks:{summary:"Tüm Kitapları Getir",description:"Kütüphanedeki tüm mevcut kitapların listesini getirir."},getBookById:{summary:"ID ile Kitap Getir",description:"Benzersiz ID'sini kullanarak belirli bir kitabı getirir."},createBook:{summary:"Yeni Kitap Ekle",description:"Kütüphaneye yeni bir kitap ekler."},updateBook:{summary:"Kitap Güncelle",description:"Mevcut bir kitabın bilgilerini ID ile günceller."},deleteBook:{summary:"Kitap Sil",description:"Bir kitabı kütüphaneden kalıcı olarak siler."}}},eg={title:"🔍 Cypress, Selenium ve Playwright Komut Karşılaştırması",overview:"Genel Bakış",basicCommands:"Temel Komutlar - Sayfaya Gitme",elementFinding:"Element Bulma ve Doğrulama",clickOperations:"Tıklama İşlemleri",formOperations:"Form İşlemleri",waitOperations:"Bekleme İşlemleri",performance:"Performans Karşılaştırması",recommendations:"Ne Zaman Hangi Aracı Kullanmalı?",exampleScenario:"Örnek: Login Formu Testi",conclusion:"💡 Sonuç",conclusionText:"Her araç kendi güçlü yönlerine sahiptir:",cypressStrength:"Geliştirici dostu, hızlı feedback, mükemmel debugging",seleniumStrength:"Olgun, esnek, geniş dil ve tarayıcı desteği",playwrightStrength:"Modern, hızlı, güçlü API ve network kontrolü",finalAdvice:"Proje gereksinimlerinize, ekibinizin becerilerine ve test kapsamınıza göre en uygun aracı seçin."},tg={title:"🎯 Selenium vs Playwright Locator Rehberi",subtitle:"Java Selenium'dan TypeScript Playwright'e Geçiş",tabs:{comparison:"📊 Karşılaştırma (20 Örnek)",playwrightOnly:"🎭 Sadece Playwright (20 Örnek)"},headers:{html:"📝 HTML Kodu:",selenium:"☕ Java Selenium",playwright:"🎭 TypeScript Playwright",playwrightOnlyFeatures:"🎭 Aşağıdaki özellikler sadece Playwright'ta mevcuttur!",example:"Örnek",playwrightExample:"Playwright Örnek"},tips:{prefix:"💡 İpucu:",comp1:"Playwright'ta CSS seçiciler varsayılandır. ID için # kullanırız.",comp2:"Class için . (nokta) kullanırız.",comp3:"Attribute seçiciler için köşeli parantez kullanırız.",comp4:"Playwright'ta role-based seçiciler daha erişilebilir ve güvenilirdir.",comp5:"XPath yerine getByRole kullanmak daha hızlı ve okunabilirdir.",comp6:"CSS seçiciler her iki frameworkte de aynı şekilde çalışır.",comp7:"Playwright'ın getByPlaceholder metodu çok daha pratiktir.",comp8:"getByLabel karmaşık XPath'lerden çok daha temizdir.",comp9:"Heading'ler için role-based seçici kullanmak best practice'tir.",comp10:"Test ID'leri test ortamında en güvenilir seçicidir.",comp11:"Playwright'ta locator birden fazla elementi otomatik yakalar.",comp12:"getByText ile partial text araması yapabilirsiniz.",comp13:"Görseller için getByAltText en iyi seçenektir.",comp14:"Playwright'ta zincirleme seçici daha temizdir.",comp15:"Checkbox için role kullanmak daha semantik bir yaklaşımdır.",comp16:"Dropdown'lar için selectOption() metodunu kullanabilirsiniz.",comp17:"Tablo için getByRole('cell') da kullanılabilir.",comp18:"Title attribute'u için getByTitle çok pratiktir.",comp19:"Playwright'ta locator zincirleme daha okunabilirdir.",comp20:"Birden fazla class için nokta ile birleştirme aynıdır.",pw1:"first() metodu ile birden fazla elementten ilkini seçebilirsiniz.",pw2:"last() metodu listedeki son elementi seçer.",pw3:"nth(index) ile belirli sıradaki elementi seçebilirsiniz. Index 0'dan başlar.",pw4:"filter() metodu ile elementleri metin veya başka kriterlere göre süzebilirsiniz.",pw5:"has ile belirli bir elementi içeren parent'ı bulabilirsiniz.",pw6:"Playwright'ın assertion metodları ile elementin durumunu kontrol edebilirsiniz.",pw7:"Element durumlarını (enabled/disabled) kolayca kontrol edebilirsiniz.",pw8:"Checkbox işlemleri için özel metodlar mevcuttur.",pw9:"toHaveText tam eşleşme, toContainText kısmi eşleşme kontrol eder.",pw10:"Input değerlerini kontrol etmek veya almak çok kolaydır.",pw11:"Class varlığını string veya regex ile kontrol edebilirsiniz.",pw12:"Herhangi bir HTML attribute'unu kontrol edebilir veya değerini alabilirsiniz.",pw13:"Bulunan element sayısını kontrol edebilir veya alabilirsiniz.",pw14:"Link href'ini ve sayfa URL'ini kolayca kontrol edebilirsiniz.",pw15:"Playwright elementlerin hazır olmasını otomatik bekler!",pw16:"Locator'ları zincirleyerek daha spesifik seçimler yapabilirsiniz.",pw17:"Dropdown'da 3 farklı şekilde seçim yapabilirsiniz.",pw18:"frameLocator ile iframe içindeki elementlere kolayca erişebilirsiniz.",pw19:"all() metodu ile tüm elementleri array olarak alıp loop yapabilirsiniz.",pw20:"Gizli file input'lara bile dosya yükleyebilirsiniz."},actions:{firstElement:"🎭 Playwright - İlk Elementi Seçme:",lastElement:"🎭 Playwright - Son Elementi Seçme:",nthElement:"🎭 Playwright - Index ile Element Seçme:",filtering:"🎭 Playwright - Filtreleme:",hasElement:"🎭 Playwright - İçinde Element Barındırma:",visibility:"🎭 Playwright - Görünürlük Kontrolü:",stateCheck:"🎭 Playwright - Durum Kontrolü:",checkboxCheck:"🎭 Playwright - Checkbox Kontrolü:",textContent:"🎭 Playwright - Metin İçeriği Kontrolü:",inputValue:"🎭 Playwright - Input Değeri Kontrolü:",classCheck:"🎭 Playwright - Class Kontrolü:",attributeCheck:"🎭 Playwright - Attribute Kontrolü:",elementCount:"🎭 Playwright - Element Sayısı:",urlCheck:"🎭 Playwright - URL Kontrolü:",autoWait:"🎭 Playwright - Otomatik Bekleme:",chaining:"🎭 Playwright - Zincirleme Locator:",dropdownSelection:"🎭 Playwright - Dropdown Seçimi:",frameElement:"🎭 Playwright - Frame İçi Element:",allElements:"🎭 Playwright - Tüm Elementleri Alma:",fileUpload:"🎭 Playwright - Dosya Yükleme:"}},rg={backButton:"← Automation Exercise Ana Sayfasına Dön"},ng={navButton:"⚡ JMeter",title:"⚡ Apache JMeter",subtitle:"Performans ve Yük Testi Aracı",intro:"Apache JMeter, web uygulamalarının, API'lerin ve servislerin performansını ölçmek için kullanılan ücretsiz, açık kaynaklı bir Java uygulamasıdır.",whatIs:"Apache JMeter Nedir?",whatIsDesc:"JMeter, bir sunucu üzerinde ağır yük simüle ederek gücünü test eder ve farklı yük tipleri altında genel performansı analiz eder. Performans, yük, stres ve fonksiyonel testlerde yaygın olarak kullanılır.",whyUse:"Neden JMeter Kullanmalı?",whyUseItems:{free:"%100 Ücretsiz & Açık Kaynak",gui:"Güçlü GUI + Komut Satırı desteği",protocols:"HTTP, HTTPS, FTP, SOAP, REST, JDBC ve daha fazlasını destekler",reports:"Detaylı HTML Raporları ve Grafikler",scalable:"Yüksek Ölçeklenebilirlik — Dağıtık Testler",plugins:"Zengin Eklenti Ekosistemi"},installation:"Kurulum",installationDesc:"JMeter'ı apache.jmeter.net adresinden indirin. Java 8 veya üstü gereklidir.",concepts:"Temel Kavramlar",conceptsItems:{threadGroup:"Thread Group — Sanal kullanıcıları simüle eder",sampler:"Sampler'lar — HTTP, JDBC, FTP istekleri",listener:"Listener'lar — View Results, Aggregate Report",assertion:"Assertion'lar — Yanıt doğrulama",timer:"Timer'lar — İstekler arası düşünme süresi",config:"Config Element'ler — CSV Data Set, HTTP Defaults"},firstTest:"İlk Test Planınız",firstTestDesc:"Adım adım rehber: Thread Group Oluştur → HTTP Sampler Ekle → Listener Ekle → Yapılandır & Çalıştır.",reports:"Raporlar & Analiz",reportsDesc:"Yanıt Süresi, Throughput, Hata Oranı, Persentiller ve daha fazlası için grafiklerle zengin HTML raporları oluşturun.",comingSoon:"Detaylı içerik yakında geliyor..."},sg={navButton:"🗄️ SQL",title:"🗄️ SQL",subtitle:"Veritabanı Testi & Sorgu Ustalığı",intro:"SQL (Structured Query Language — Yapılandırılmış Sorgu Dili), ilişkisel veritabanlarını yönetmek için standart dildir ve otomasyonda backend ve veritabanı testi için vazgeçilmezdir.",whatIs:"SQL Nedir?",whatIsDesc:"SQL, ilişkisel veritabanlarında tutulan verileri yönetmek için kullanılan bir alan-özel dildir. Kayıt oluşturma, okuma, güncelleme ve silme (CRUD) işlemlerini mümkün kılar.",whyUse:"Test Otomasyonunda Neden SQL?",whyUseItems:{verify:"UI/API işlemlerinden sonra veritabanı durumunu doğrulama",seed:"Test yürütmeden önce test verisi oluşturma",cleanup:"Testlerden sonra test verilerini temizleme",direct:"İş mantığını doğrulamak için backend'i doğrudan sorgulama",perf:"Veritabanı sorgularının performans testi",integrity:"Veri bütünlüğü ve kısıt doğrulama"},select:"SELECT Sorguları",selectDesc:"SELECT, FROM, WHERE, ORDER BY, LIMIT ile veri çekme.",joins:"JOIN İşlemleri",joinsDesc:"INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN — birden fazla tablodan veri birleştirme.",aggregates:"Toplama Fonksiyonları",aggregatesDesc:"GROUP BY ve HAVING ile COUNT, SUM, AVG, MIN, MAX.",subqueries:"Alt Sorgular & CTE'ler",subqueriesDesc:"Karmaşık veri çekme için iç içe sorgular ve Common Table Expression'lar.",dml:"DML İşlemleri",dmlDesc:"INSERT, UPDATE, DELETE — test kurulum ve temizleme için veritabanı kayıtlarını değiştirme.",testing:"Veritabanı Test Stratejileri",testingDesc:"Şema doğrulama, referans bütünlüğü, stored procedure testi ve veri migrasyon doğrulama.",comingSoon:"Detaylı içerik yakında geliyor..."},ag={navButton:"📘 TypeScript",title:"📘 TypeScript",subtitle:"Güvenilir Otomasyon için Tipli JavaScript",intro:"TypeScript, düz JS'ye derlenen, güçlü tipli bir JavaScript üst kümesidir. Otomasyon framework'ünüze tip güvenliği, daha iyi araç desteği ve gelişmiş sürdürülebilirlik kazandırır.",whatIs:"TypeScript Nedir?",whatIsDesc:"TypeScript, JavaScript'e isteğe bağlı statik tipler ekler. Derleme zamanında hataları yakalayın, daha iyi IDE desteği alın ve daha sürdürülebilir otomasyon kodu yazın.",whyUse:"Neden Otomasyonda TypeScript?",whyUseItems:{types:"Çalışma zamanından önce tip hatalarını yakalama",intellisense:"Mükemmel IDE IntelliSense & otomatik tamamlama",playwright:"Playwright'ta yerel TypeScript desteği",refactor:"Büyük kod tabanlarında güvenli yeniden düzenleme",docs:"Tipler yaşayan belgeler gibi hizmet eder",oop:"Tam OOP desteği: interface'ler, generic'ler, decorator'lar"},basics:"TypeScript Temelleri",basicsDesc:"Tipler, interface'ler, enum'lar, tip takma adları, birleşim tipleri, kesişim tipleri.",classes:"Sınıflar & Interface'ler",classesDesc:"Page Object Model, temel sınıflar ve servis soyutlamaları için nesne yönelimli kalıplar.",generics:"Generic'ler",genericsDesc:"Yeniden kullanılabilir, tip güvenli yardımcı fonksiyonlar ve yardımcı sınıflar yazma.",async:"Async/Await & Promise'ler",asyncDesc:"Playwright otomasyonu için vazgeçilmez modern async kalıpları.",playwright:"TypeScript + Playwright",playwrightDesc:"Playwright TypeScript-öncelikli olarak geliştirildi. Sayfa etkileşimleri, fixture'lar ve assertion'lar için tam tip güvenliğinden yararlanın.",config:"tsconfig.json Yapılandırması",configDesc:"Otomasyon projeleri için derleyici seçenekleri, modül çözümlemesi, strict mod ayarları.",comingSoon:"Detaylı içerik yakında geliyor..."},ig={navButton:"🐍 Python",title:"🐍 Python",subtitle:"Python ile Çok Yönlü Otomasyon",intro:"Python, test otomasyonu için en popüler dillerden biridir. Açık söz dizimi, zengin kütüphaneleri (pytest, Selenium, Requests) ve büyük topluluğu ile tüm otomasyon ihtiyaçları için idealdir.",whatIs:"Neden Otomasyonda Python?",whatIsDesc:"Python'un sadeliği, okunabilirliği ve kapsamlı kütüphane ekosistemi, UI otomasyonu, API testi, veri güdümlü test ve CI/CD entegrasyonu için mükemmeldir.",whyUse:"Python Otomasyon Avantajları",whyUseItems:{simple:"Basit, okunabilir söz dizimi — öğrenmesi kolay",pytest:"pytest — güçlü ve genişletilebilir test framework'ü",selenium:"Selenium WebDriver desteği dahili olarak",requests:"API testi için requests kütüphanesi",pandas:"Veri güdümlü test senaryoları için pandas",ci:"Mükemmel CI/CD entegrasyonu (GitHub Actions, Jenkins)"},pytest:"pytest Framework'ü",pytestDesc:"Fixture'lar, parametrize, marker'lar, plugin'ler — Python testi için altın standart.",selenium:"Selenium + Python",seleniumDesc:"Selenium WebDriver, Page Object Model ve bekleme stratejileri ile tarayıcı otomasyonu.",requests:"Requests Kütüphanesi",requestsDesc:"API testi için HTTP istekleri: header'lar ve kimlik doğrulama ile GET, POST, PUT, DELETE.",datadriven:"Veri Güdümlü Test",datadrivenDesc:"pytest.mark.parametrize kullanarak CSV, JSON, Excel verisiyle testleri parametrize etme.",pom:"Page Object Model",pomDesc:"Python ile sürdürülebilir Selenium otomasyonu için tasarım kalıbı.",bestpractices:"En İyi Uygulamalar",bestpracticesDesc:"Proje yapısı, fixture'lar, conftest.py, .env dosyaları ile ortam yönetimi.",comingSoon:"Detaylı içerik yakında geliyor..."},og={title:"🛠️ Uygulama Bahçesi",subtitle:"Modern UI elementleri ile otomasyon pratikleri yapın",homeTooltip:"Ana sayfaya dön",personalInfo:{title:"👤 Kişisel Bilgiler",name:"Ad Soyad",namePlaceholder:"Adınızı giriniz",email:"E-posta",emailPlaceholder:"ornek@mail.com",phone:"Telefon",phonePlaceholder:"5XX XXX XX XX",address:"Adres",addressPlaceholder:"Açık adresinizi yazınız"},selections:{title:"🔘 Seçim Elemanları",gender:"Cinsiyet",male:"Erkek",female:"Kadın",days:"Günler",monday:"Pazartesi",tuesday:"Salı",wednesday:"Çarşamba",thursday:"Perşembe",friday:"Cuma",saturday:"Cumartesi",sunday:"Pazar",country:"Ülke",colors:"Renk Seçimi (Çoklu)",selectedColors:"Seçilen Renkler:"},datePickers:{title:"📅 Tarih Seçiciler",standard:"Standart Tarih",range:"Tarih Aralığı"},tables:{title:"📊 Tablo Yapıları",static:"Statik Tablo",pagination:"Sayfalamalı Tablo"},files:{title:"📁 Dosya İşlemleri",single:"Tekli Dosya Yükle",multiple:"Çoklu Dosya Yükle"},interactions:{title:"🖱️ Etkileşimli Araçlar",slider:"Sürgü (Slider)",dragDrop:"Sürükle ve Bırak",doubleClick:"Çift Tıklama",dragMe:"Beni Sürükle",dropHere:"Buraya Bırak",doubleClickResult:"Çift tıklandı!"}},lg={header:qf,buttons:Gf,nav:Vf,footer:Jf,basic:Kf,complex:Yf,advanced:Qf,table:Xf,api:Zf,comparison:eg,locator:tg,pages:rg,jmeter:ng,sql:sg,typescript:ag,python:ig,practice:og},vu=v.createContext(),cg={en:Wf,tr:lg};function dg({children:e}){const[t,r]=v.useState(()=>localStorage.getItem("language")||"en");v.useEffect(()=>{localStorage.setItem("language",t)},[t]);const s=i=>{const o=i.split(".");let l=cg[t];for(const c of o)l=l==null?void 0:l[c];return l||i},a=()=>{r(i=>i==="en"?"tr":"en")};return n.jsx(vu.Provider,{value:{language:t,t:s,toggleLanguage:a},children:e})}function We(){const e=v.useContext(vu);if(!e)throw new Error("useLanguage must be used within LanguageProvider");return e}function Dl({darkMode:e}){const{t}=We(),[r,s]=v.useState([]),[a,i]=v.useState({textInput:"",emailInput:"",numberInput:"",passwordInput:"",singleCheckbox:!1,multiCheckboxes:[],radioButton:"",staticDropdown:"",dynamicDropdown:""});v.useEffect(()=>{const l=setTimeout(()=>{s([{value:"option1",label:"Dynamic Option 1"},{value:"option2",label:"Dynamic Option 2"},{value:"option3",label:"Dynamic Option 3"},{value:"option4",label:"Dynamic Option 4"}])},2e3);return()=>clearTimeout(l)},[]);const o=l=>{i(c=>({...c,multiCheckboxes:c.multiCheckboxes.includes(l)?c.multiCheckboxes.filter(d=>d!==l):[...c.multiCheckboxes,l]}))};return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"basic-elements-title",children:t("basic.title")}),n.jsx("p",{className:`mb-6 ${e?"text-gray-300":"text-gray-600"}`,children:t("basic.subtitle")}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("basic.inputFields")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[n.jsxs("div",{children:[n.jsx("label",{htmlFor:"text-input",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.textInput")}),n.jsx("input",{type:"text",id:"text-input","data-testid":"text-input",placeholder:t("basic.textPlaceholder"),value:a.textInput,onChange:l=>i({...a,textInput:l.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})]}),n.jsxs("div",{children:[n.jsx("label",{htmlFor:"email-input",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.emailInput")}),n.jsx("input",{type:"email",id:"email-input","data-testid":"email-input",placeholder:"email@example.com",value:a.emailInput,onChange:l=>i({...a,emailInput:l.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})]}),n.jsxs("div",{children:[n.jsx("label",{htmlFor:"number-input",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.numberInput")}),n.jsx("input",{type:"number",id:"number-input","data-testid":"number-input",placeholder:"123",value:a.numberInput,onChange:l=>i({...a,numberInput:l.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})]}),n.jsxs("div",{children:[n.jsx("label",{htmlFor:"password-input",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.passwordInput")}),n.jsx("input",{type:"password",id:"password-input","data-testid":"password-input",placeholder:"••••••••",value:a.passwordInput,onChange:l=>i({...a,passwordInput:l.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})]})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("basic.checkboxes")}),n.jsxs("div",{className:"mb-6 space-y-3",children:[n.jsxs("div",{className:"flex items-center",children:[n.jsx("input",{type:"checkbox",id:"single-checkbox","data-testid":"single-checkbox",checked:a.singleCheckbox,onChange:l=>i({...a,singleCheckbox:l.target.checked}),className:"w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"}),n.jsx("label",{htmlFor:"single-checkbox",className:`ml-2 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.singleCheckbox")})]}),n.jsxs("div",{className:"pl-4 border-l-2 border-gray-200",children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.multiCheckboxes")}),["JavaScript","Python","Java","C++"].map(l=>n.jsxs("div",{className:"flex items-center mb-2",children:[n.jsx("input",{type:"checkbox",id:`checkbox-${l.toLowerCase()}`,"data-testid":`checkbox-${l.toLowerCase()}`,checked:a.multiCheckboxes.includes(l),onChange:()=>o(l),className:"w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"}),n.jsx("label",{htmlFor:`checkbox-${l.toLowerCase()}`,className:`ml-2 ${e?"text-gray-300":"text-gray-700"}`,children:l})]},l))]})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("basic.radioButtons")}),n.jsxs("div",{className:"mb-6",children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.experienceLevel")}),n.jsx("div",{className:"space-y-2",children:[{value:"beginner",label:t("basic.beginner")},{value:"intermediate",label:t("basic.intermediate")},{value:"advanced",label:t("basic.advanced")},{value:"expert",label:t("basic.expert")}].map(l=>n.jsxs("div",{className:"flex items-center",children:[n.jsx("input",{type:"radio",id:`radio-${l.value}`,"data-testid":`radio-${l.value}`,name:"experience",value:l.value,checked:a.radioButton===l.value,onChange:c=>i({...a,radioButton:c.target.value}),className:"w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"}),n.jsx("label",{htmlFor:`radio-${l.value}`,className:`ml-2 ${e?"text-gray-300":"text-gray-700"}`,children:l.label})]},l.value))})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("basic.dropdowns")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[n.jsxs("div",{children:[n.jsx("label",{htmlFor:"static-dropdown",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.staticDropdown")}),n.jsxs("select",{id:"static-dropdown","data-testid":"static-dropdown",value:a.staticDropdown,onChange:l=>i({...a,staticDropdown:l.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",children:[n.jsx("option",{value:"",children:t("basic.selectCountry")}),n.jsx("option",{value:"us",children:"United States"}),n.jsx("option",{value:"uk",children:"United Kingdom"}),n.jsx("option",{value:"ca",children:"Canada"}),n.jsx("option",{value:"au",children:"Australia"}),n.jsx("option",{value:"de",children:"Germany"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{htmlFor:"dynamic-dropdown",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:[t("basic.dynamicDropdown")," ",r.length===0&&`(${t("basic.loading")})`]}),n.jsxs("select",{id:"dynamic-dropdown","data-testid":"dynamic-dropdown",value:a.dynamicDropdown,onChange:l=>i({...a,dynamicDropdown:l.target.value}),disabled:r.length===0,className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed",children:[n.jsx("option",{value:"",children:t("basic.selectOption")}),r.map(l=>n.jsx("option",{value:l.value,children:l.label},l.value))]})]})]}),n.jsxs("div",{className:`mt-8 p-4 rounded-lg border ${e?"bg-indigo-900 border-indigo-700":"bg-indigo-50 border-indigo-200"}`,children:[n.jsx("h3",{className:`font-semibold mb-2 ${e?"text-indigo-200":"text-indigo-900"}`,children:t("basic.selectedValues")}),n.jsxs("div",{className:`text-sm space-y-1 ${e?"text-indigo-300":"text-indigo-800"}`,"data-testid":"selected-values-display",children:[n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.text")})," ",a.textInput||t("basic.empty")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.email")})," ",a.emailInput||t("basic.empty")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.number")})," ",a.numberInput||t("basic.empty")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.singleCheckboxLabel")})," ",a.singleCheckbox?t("basic.checked"):t("basic.unchecked")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.multiCheckboxesLabel")})," ",a.multiCheckboxes.join(", ")||t("basic.none")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.radio")})," ",a.radioButton||t("basic.noneSelected")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.staticDropdownLabel")})," ",a.staticDropdown||t("basic.noneSelected")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.dynamicDropdownLabel")})," ",a.dynamicDropdown||t("basic.noneSelected")]})]})]})]})}function ug({darkMode:e}){const{t}=We(),[r,s]=v.useState(null),[a,i]=v.useState(["Item A","Item B","Item C"]),[o,l]=v.useState(["Item X","Item Y"]),[c,d]=v.useState(!1),h=(b,p,u)=>{s({item:p,zone:u}),b.dataTransfer.effectAllowed="move"},m=b=>{b.preventDefault(),b.dataTransfer.dropEffect="move"},x=(b,p)=>{if(b.preventDefault(),!r)return;const{item:u,zone:g}=r;g!==p&&(g==="zone1"&&p==="zone2"?(i(a.filter(S=>S!==u)),l([...o,u])):g==="zone2"&&p==="zone1"&&(l(o.filter(S=>S!==u)),i([...a,u])),s(null))},f=()=>{alert("This is an alert box!")},w=()=>{const b=confirm("Do you confirm this action?");alert(b?"You clicked OK":"You clicked Cancel")},y=()=>{const b=prompt("Please enter your name:");b!==null&&alert(`Hello, ${b||"Guest"}!`)};return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"complex-interactions-title",children:t("complex.title")}),n.jsx("p",{className:`mb-6 ${e?"text-gray-300":"text-gray-600"}`,children:t("complex.subtitle")}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("complex.dragDrop")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[n.jsxs("div",{"data-testid":"drop-zone-1",onDragOver:m,onDrop:b=>x(b,"zone1"),className:"p-6 border-2 border-dashed border-indigo-300 rounded-lg bg-indigo-50 min-h-[200px]",children:[n.jsx("h3",{className:"font-semibold text-indigo-900 mb-3",children:t("complex.zone1")}),n.jsx("div",{className:"space-y-2",children:a.map(b=>n.jsx("div",{draggable:!0,"data-testid":`drag-item-${b.toLowerCase().replace(" ","-")}`,onDragStart:p=>h(p,b,"zone1"),className:"px-4 py-2 bg-white border border-indigo-200 rounded cursor-move hover:shadow-md transition-shadow",children:b},b))})]}),n.jsxs("div",{"data-testid":"drop-zone-2",onDragOver:m,onDrop:b=>x(b,"zone2"),className:"p-6 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50 min-h-[200px]",children:[n.jsx("h3",{className:"font-semibold text-purple-900 mb-3",children:t("complex.zone2")}),n.jsx("div",{className:"space-y-2",children:o.map(b=>n.jsx("div",{draggable:!0,"data-testid":`drag-item-${b.toLowerCase().replace(" ","-")}`,onDragStart:p=>h(p,b,"zone2"),className:"px-4 py-2 bg-white border border-purple-200 rounded cursor-move hover:shadow-md transition-shadow",children:b},b))})]})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("complex.hoverMenu")}),n.jsx("div",{className:"mb-6",children:n.jsx("nav",{className:"inline-block bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg",children:n.jsx("ul",{className:"flex","data-testid":"hover-menu",children:["Products","Services","About"].map(b=>n.jsxs("li",{className:"relative group",children:[n.jsxs("button",{"data-testid":`menu-${b.toLowerCase()}`,className:"px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors",children:[b," ▼"]}),n.jsxs("ul",{"data-testid":`submenu-${b.toLowerCase()}`,className:"absolute left-0 top-full mt-1 bg-white rounded-lg shadow-xl w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10",children:[n.jsx("li",{children:n.jsxs("a",{href:"#","data-testid":`submenu-${b.toLowerCase()}-item-1`,className:"block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-t-lg",children:[b," Option 1"]})}),n.jsx("li",{children:n.jsxs("a",{href:"#","data-testid":`submenu-${b.toLowerCase()}-item-2`,className:"block px-4 py-2 text-gray-700 hover:bg-indigo-50",children:[b," Option 2"]})}),n.jsx("li",{children:n.jsxs("a",{href:"#","data-testid":`submenu-${b.toLowerCase()}-item-3`,className:"block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-b-lg",children:[b," Option 3"]})})]})]},b))})})}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("complex.modalsAlerts")}),n.jsxs("div",{className:"flex flex-wrap gap-3 mb-6",children:[n.jsx("button",{"data-testid":"alert-button",onClick:f,className:"px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all",children:t("complex.showAlert")}),n.jsx("button",{"data-testid":"confirm-button",onClick:w,className:"px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transition-all",children:t("complex.showConfirm")}),n.jsx("button",{"data-testid":"prompt-button",onClick:y,className:"px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 shadow-md hover:shadow-lg transition-all",children:t("complex.showPrompt")}),n.jsx("button",{"data-testid":"custom-modal-button",onClick:()=>d(!0),className:"px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 shadow-md hover:shadow-lg transition-all",children:t("complex.showCustomModal")})]}),c&&n.jsx("div",{"data-testid":"modal-backdrop",className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",onClick:()=>d(!1),children:n.jsxs("div",{"data-testid":"modal-content",className:"bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl",onClick:b=>b.stopPropagation(),children:[n.jsx("h3",{className:"text-2xl font-bold text-gray-800 mb-4","data-testid":"modal-title",children:t("complex.customModal")}),n.jsx("p",{className:"text-gray-600 mb-6","data-testid":"modal-text",children:t("complex.modalText")}),n.jsxs("div",{className:"flex gap-3 justify-end",children:[n.jsx("button",{"data-testid":"modal-cancel-button",onClick:()=>d(!1),className:"px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors",children:t("complex.cancel")}),n.jsx("button",{"data-testid":"modal-confirm-button",onClick:()=>{alert("Modal confirmed!"),d(!1)},className:"px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors",children:t("complex.confirm")})]})]})}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("complex.iframeInteraction")}),n.jsxs("div",{className:`p-4 rounded-lg border ${e?"bg-gray-700 border-gray-600":"bg-gray-50 border-gray-200"}`,children:[n.jsx("p",{className:`text-sm mb-3 ${e?"text-gray-300":"text-gray-600"}`,children:t("complex.iframeDescription")}),n.jsx("iframe",{"data-testid":"test-iframe",srcDoc:`
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: sans-serif; padding: 20px; background: #f9fafb; }
                  input, button { 
                    width: 100%; 
                    padding: 10px; 
                    margin: 8px 0; 
                    border: 1px solid #d1d5db; 
                    border-radius: 6px; 
                    box-sizing: border-box;
                  }
                  button { 
                    background: #6366f1; 
                    color: white; 
                    font-weight: bold; 
                    cursor: pointer; 
                    border: none;
                  }
                  button:hover { background: #4f46e5; }
                </style>
              </head>
              <body>
                <h3 style="color: #1f2937; margin-top: 0;">Iframe Form</h3>
                <input type="text" id="iframe-name" placeholder="Enter name" />
                <input type="email" id="iframe-email" placeholder="Enter email" />
                <button id="iframe-submit" onclick="alert('Form submitted from iframe!')">Submit</button>
              </body>
            </html>
          `,className:"w-full h-64 border-2 border-gray-300 rounded-lg",title:"Test Iframe"})]})]})}function pg({darkMode:e}){const{t}=We(),[r,s]=v.useState(null),[a,i]=v.useState(Array.from({length:10},(y,b)=>`Item ${b+1}`)),[o,l]=v.useState(!1),[c,d]=v.useState(null),h=v.useRef(null);v.useEffect(()=>{const y=Math.random()*3e3+3e3,b=setTimeout(()=>{s("✅ Dynamic content loaded successfully after wait!")},y);return()=>clearTimeout(b)},[]),v.useEffect(()=>{class y extends HTMLElement{constructor(){super();const p=this.attachShadow({mode:"open"}),u=document.createElement("button");u.textContent="Shadow DOM Button",u.setAttribute("data-testid","shadow-button"),u.style.cssText="padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;",u.addEventListener("click",()=>{alert("You clicked the Shadow DOM button!")}),p.appendChild(u)}}customElements.get("shadow-component")||customElements.define("shadow-component",y)},[]);const m=()=>{const y=h.current;if(!y||o)return;const{scrollTop:b,scrollHeight:p,clientHeight:u}=y;b+u>=p-10&&x()},x=()=>{l(!0),setTimeout(()=>{const y=Array.from({length:10},(b,p)=>`Item ${a.length+p+1}`);i([...a,...y]),l(!1)},1e3)},f=y=>{const b=y.target.files[0];b&&d({name:b.name,size:`${(b.size/1024).toFixed(2)} KB`,type:b.type})},w=()=>{const y=`This is a sample file for download testing.
Automation Testing Playground
Date: `+new Date().toLocaleString(),b=new Blob([y],{type:"text/plain"}),p=URL.createObjectURL(b),u=document.createElement("a");u.href=p,u.download="sample-file.txt",u.click(),URL.revokeObjectURL(p)};return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"advanced-scenarios-title",children:t("advanced.title")}),n.jsx("p",{className:`mb-6 ${e?"text-gray-300":"text-gray-600"}`,children:t("advanced.subtitle")}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("advanced.shadowDOM")}),n.jsxs("div",{className:`mb-6 p-4 border rounded-lg ${e?"bg-purple-900 border-purple-700":"bg-purple-50 border-purple-200"}`,children:[n.jsx("p",{className:`text-sm mb-3 ${e?"text-purple-200":"text-purple-800"}`,children:t("advanced.shadowDescription")}),n.jsx("shadow-component",{"data-testid":"shadow-host"})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("advanced.dynamicContent")}),n.jsx("div",{className:`mb-6 p-6 rounded-lg border ${e?"bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-700":"bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"}`,children:r?n.jsx("div",{"data-testid":"dynamic-content",className:`text-xl font-bold animate-pulse ${e?"text-indigo-200":"text-indigo-900"}`,children:r}):n.jsxs("div",{className:"flex items-center gap-3","data-testid":"loading-indicator",children:[n.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"}),n.jsx("p",{className:`font-medium ${e?"text-indigo-300":"text-indigo-700"}`,children:t("advanced.waitingText")})]})}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("advanced.infiniteScroll")}),n.jsxs("div",{className:"mb-6",children:[n.jsx("p",{className:`text-sm mb-3 ${e?"text-gray-300":"text-gray-600"}`,children:t("advanced.scrollDescription")}),n.jsxs("div",{ref:h,onScroll:m,"data-testid":"infinite-scroll-container",className:`h-80 overflow-y-auto border rounded-lg p-4 ${e?"bg-gray-700 border-gray-600":"bg-white border-gray-300"}`,children:[n.jsx("div",{className:"space-y-2",children:a.map((y,b)=>n.jsx("div",{"data-testid":`scroll-item-${b+1}`,className:"p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-indigo-200",children:y},b))}),o&&n.jsxs("div",{className:"text-center py-4","data-testid":"scroll-loading",children:[n.jsx("div",{className:"inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"}),n.jsx("p",{className:"text-gray-600 mt-2",children:"Loading more items..."})]})]}),n.jsxs("p",{className:`text-sm mt-2 ${e?"text-gray-400":"text-gray-500"}`,children:[t("advanced.itemsCount")," ",n.jsx("span",{"data-testid":"items-count",children:a.length})]})]}),n.jsxs("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:[t("advanced.fileUpload")," & ",t("advanced.fileDownload")]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[n.jsxs("div",{className:`p-4 border rounded-lg ${e?"bg-green-900 border-green-700":"bg-green-50 border-green-200"}`,children:[n.jsx("h4",{className:`font-semibold mb-3 ${e?"text-green-200":"text-green-900"}`,children:t("advanced.fileUpload")}),n.jsx("input",{type:"file",id:"file-upload","data-testid":"file-upload-input",onChange:f,className:"block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 file:cursor-pointer"}),c&&n.jsxs("div",{"data-testid":"uploaded-file-info",className:"mt-3 p-3 bg-white rounded border border-green-300",children:[n.jsxs("p",{className:"text-sm text-green-900",children:[n.jsx("strong",{children:"File:"})," ",c.name]}),n.jsxs("p",{className:"text-sm text-green-900",children:[n.jsx("strong",{children:"Size:"})," ",c.size]}),n.jsxs("p",{className:"text-sm text-green-900",children:[n.jsx("strong",{children:"Type:"})," ",c.type||"unknown"]})]})]}),n.jsxs("div",{className:`p-4 border rounded-lg ${e?"bg-blue-900 border-blue-700":"bg-blue-50 border-blue-200"}`,children:[n.jsx("h4",{className:`font-semibold mb-3 ${e?"text-blue-200":"text-blue-900"}`,children:t("advanced.fileDownload")}),n.jsxs("button",{"data-testid":"file-download-button",onClick:w,className:"w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all",children:["📥 ",t("advanced.downloadSample")]}),n.jsx("p",{className:"text-xs text-blue-700 mt-3",children:"Click to download a sample text file"})]})]})]})}if(typeof window<"u"&&!customElements.get("shadow-component")){class e extends HTMLElement{constructor(){super();const r=this.attachShadow({mode:"open"}),s=document.createElement("div");s.innerHTML=`
        <style>
          button {
            padding: 12px 24px;
            background: linear-gradient(to right, #8b5cf6, #6366f1);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
          }
          button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
          }
        </style>
        <button id="shadow-button" data-testid="shadow-button">
          Click Me (I'm in Shadow DOM!)
        </button>
      `,r.appendChild(s),r.querySelector("#shadow-button").addEventListener("click",()=>{alert("You successfully clicked the Shadow DOM button!")})}}customElements.define("shadow-component",e)}function mg({darkMode:e}){const{t}=We(),[r,s]=v.useState(""),[a,i]=v.useState({key:null,direction:"asc"}),[o,l]=v.useState(1),c=5,d=[{id:1,name:"Alice Johnson",email:"alice@example.com",role:"Admin",status:"Active"},{id:2,name:"Bob Smith",email:"bob@example.com",role:"User",status:"Active"},{id:3,name:"Charlie Brown",email:"charlie@example.com",role:"User",status:"Inactive"},{id:4,name:"Diana Prince",email:"diana@example.com",role:"Manager",status:"Active"},{id:5,name:"Edward Norton",email:"edward@example.com",role:"User",status:"Active"},{id:6,name:"Fiona Apple",email:"fiona@example.com",role:"User",status:"Inactive"},{id:7,name:"George Martin",email:"george@example.com",role:"Admin",status:"Active"},{id:8,name:"Helen Troy",email:"helen@example.com",role:"Manager",status:"Active"},{id:9,name:"Ivan Drago",email:"ivan@example.com",role:"User",status:"Inactive"},{id:10,name:"Julia Roberts",email:"julia@example.com",role:"User",status:"Active"}],h=y=>{let b="asc";a.key===y&&a.direction==="asc"&&(b="desc"),i({key:y,direction:b})},m=y=>a.key!==y?"↕":a.direction==="asc"?"↑":"↓",x=v.useMemo(()=>{let y=d.filter(b=>Object.values(b).some(p=>p.toString().toLowerCase().includes(r.toLowerCase())));return a.key&&y.sort((b,p)=>b[a.key]<p[a.key]?a.direction==="asc"?-1:1:b[a.key]>p[a.key]?a.direction==="asc"?1:-1:0),y},[r,a]),f=v.useMemo(()=>{const y=(o-1)*c;return x.slice(y,y+c)},[x,o]),w=Math.ceil(x.length/c);return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"data-table-title",children:t("table.title")}),n.jsx("p",{className:`mb-6 ${e?"text-gray-300":"text-gray-600"}`,children:t("table.subtitle")}),n.jsx("div",{className:"mb-4",children:n.jsx("input",{type:"text","data-testid":"table-search-input",placeholder:`🔍 ${t("table.searchPlaceholder")}`,value:r,onChange:y=>{s(y.target.value),l(1)},className:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})}),n.jsx("div",{className:"overflow-x-auto rounded-lg border border-gray-200",children:n.jsxs("table",{className:"w-full bg-white","data-testid":"data-table",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsx("tr",{children:["id","name","email","role","status"].map(y=>n.jsx("th",{"data-testid":`table-header-${y}`,onClick:()=>h(y),className:"px-6 py-4 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors",children:n.jsxs("div",{className:"flex items-center gap-2",children:[y.charAt(0).toUpperCase()+y.slice(1),n.jsx("span",{className:"text-sm",children:m(y)})]})},y))})}),n.jsx("tbody",{children:f.length>0?f.map((y,b)=>n.jsxs("tr",{"data-testid":`table-row-${y.id}`,className:`border-b border-gray-200 hover:bg-indigo-50 transition-colors ${b%2===0?"bg-gray-50":"bg-white"}`,children:[n.jsx("td",{className:"px-6 py-4","data-testid":`table-cell-${y.id}-id`,children:y.id}),n.jsx("td",{className:"px-6 py-4 font-medium","data-testid":`table-cell-${y.id}-name`,children:y.name}),n.jsx("td",{className:"px-6 py-4 text-gray-600","data-testid":`table-cell-${y.id}-email`,children:y.email}),n.jsx("td",{className:"px-6 py-4","data-testid":`table-cell-${y.id}-role`,children:n.jsx("span",{className:"px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium",children:y.role})}),n.jsx("td",{className:"px-6 py-4","data-testid":`table-cell-${y.id}-status`,children:n.jsx("span",{className:`px-3 py-1 rounded-full text-sm font-medium ${y.status==="Active"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:y.status})})]},y.id)):n.jsx("tr",{children:n.jsx("td",{colSpan:"5",className:`px-6 py-8 text-center ${e?"text-gray-400":"text-gray-500"}`,"data-testid":"no-results",children:t("table.noResults")})})})]})}),n.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[n.jsxs("p",{className:`text-sm ${e?"text-gray-400":"text-gray-600"}`,"data-testid":"pagination-info",children:[t("table.showing")," ",f.length>0?(o-1)*c+1:0," ",t("table.to")," ",Math.min(o*c,x.length)," ",t("table.of")," ",x.length," ",t("table.entries")]}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("button",{"data-testid":"pagination-prev",onClick:()=>l(Math.max(1,o-1)),disabled:o===1,className:"px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors",children:t("table.previous")}),n.jsx("div",{className:"flex gap-1","data-testid":"pagination-numbers",children:Array.from({length:w},(y,b)=>b+1).map(y=>n.jsx("button",{"data-testid":`pagination-page-${y}`,onClick:()=>l(y),className:`px-4 py-2 font-semibold rounded-lg transition-colors ${o===y?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:y},y))}),n.jsx("button",{"data-testid":"pagination-next",onClick:()=>l(Math.min(w,o+1)),disabled:o===w,className:"px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors",children:"Next"})]})]})]})}const hg=[{id:"login",path:"/login",method:"POST",summary:"User Login",description:"Authenticates a user and returns a token.",tags:["Auth"],parameters:[],translationKey:"login",requestBody:{required:!0,content:{"application/json":{schema:{type:"object",properties:{email:{type:"string",example:"test@example.com"},password:{type:"string",example:"password123"}},required:["email","password"]},example:{email:"test@example.com",password:"password123"}}}},responses:{200:{description:"Login successful, returns user data."},400:{description:"Missing credentials."},404:{description:"User not found."}}},{id:"products",path:"/productsList",method:"GET",summary:"Get All Products",description:"Retrieves a list of all available products.",tags:["Products"],parameters:[],responses:{200:{description:"Returns a list of products."}}},{id:"createOrder",path:"/createOrder",method:"POST",summary:"Create Order",description:"Places a new order for a specific product.",tags:["Order"],parameters:[],requestBody:{required:!0,content:{"application/json":{schema:{type:"object",properties:{productId:{type:"integer",example:1},quantity:{type:"integer",example:2}},required:["productId","quantity"]},example:{productId:1,quantity:2}}}},responses:{201:{description:"Order created successfully."},400:{description:"Invalid input."},404:{description:"Product not found."}}},{id:"getBooks",path:"/books",method:"GET",summary:"Get All Books",description:"Retrieves a list of all available books in the library.",translationKey:"getBooks",tags:["Books"],parameters:[],responses:{200:{description:"List of books",example:[{id:1,title:"The Great Gatsby",author:"F. Scott Fitzgerald"},{id:2,title:"1984",author:"George Orwell"}]}}},{id:"getBookById",path:"/books/:id",method:"GET",summary:"Get Book by ID",description:"Retrieves a specific book using its unique ID.",translationKey:"getBookById",tags:["Books"],parameters:[{name:"id",in:"path",required:!0,description:"ID of the book to retrieve"}],responses:{200:{description:"Book details"},404:{description:"Book not found"}}},{id:"createBook",path:"/books",method:"POST",summary:"Create New Book",description:"Adds a new book to the library.",translationKey:"createBook",tags:["Books"],requestBody:{required:!0,content:{"application/json":{example:{title:"New Book Title",author:"Author Name"}}}},responses:{201:{description:"Book created"},400:{description:"Invalid input"}}},{id:"updateBook",path:"/books/:id",method:"PUT",summary:"Update Book",description:"Updates an existing book's information by ID.",translationKey:"updateBook",tags:["Books"],parameters:[{name:"id",in:"path",required:!0,description:"ID of the book to update"}],requestBody:{required:!0,content:{"application/json":{example:{title:"Updated Title",author:"Updated Author"}}}},responses:{200:{description:"Book updated"},404:{description:"Book not found"}}},{id:"deleteBook",path:"/books/:id",method:"DELETE",summary:"Delete Book",description:"Removes a book from the library permanently.",translationKey:"deleteBook",tags:["Books"],parameters:[{name:"id",in:"path",required:!0,description:"ID of the book to delete"}],responses:{200:{description:"Book deleted"},404:{description:"Book not found"}}}];function fg({onExecute:e,darkMode:t}){const{t:r}=We(),[s,a]=v.useState(null),[i,o]=v.useState({}),l=f=>{a(s===f?null:f)},c=(f,w,y)=>{o(b=>{var p;return{...b,[f]:{...b[f],params:{...(p=b[f])==null?void 0:p.params,[w]:y}}}})},d=(f,w)=>{o(y=>({...y,[f]:{...y[f],body:w}}))},h=async f=>{const w=i[f.id]||{},y=w.params||{};let b=f.path;Object.keys(y).forEach(u=>{b=b.replace(`:${u}`,y[u]),b=b.replace(`{${u}}`,y[u])});let p=null;if(f.method!=="GET"&&f.requestBody){const u=w.body||JSON.stringify(f.requestBody.content["application/json"].example,null,2);try{p=JSON.parse(u)}catch{alert("Invalid JSON format");return}}e&&await e(f.summary,b,f.method,p)},m=(f,w)=>{var y,b;return((b=(y=i[f])==null?void 0:y.params)==null?void 0:b[w])||""},x=f=>{switch(f){case"GET":return"bg-blue-600";case"POST":return"bg-green-600";case"PUT":return"bg-orange-600";case"DELETE":return"bg-red-600";default:return"bg-gray-600"}};return n.jsxs("div",{className:`mt-8 rounded-xl overflow-hidden border ${t?"border-gray-700 bg-gray-800":"border-gray-200 bg-white"}`,children:[n.jsxs("div",{className:`p-4 border-b ${t?"border-gray-700":"border-gray-200"}`,children:[n.jsxs("h3",{className:`text-xl font-bold flex items-center gap-2 ${t?"text-white":"text-gray-900"}`,children:[n.jsx("span",{children:"📜 API Documentation & Playground"}),n.jsx("span",{className:"text-xs font-normal px-2 py-1 bg-green-100 text-green-800 rounded-full",children:"Swagger UI"}),n.jsx("span",{className:"text-xs font-normal px-2 py-1 bg-blue-100 text-blue-800 rounded-full",children:"v1.2"})]}),n.jsx("p",{className:`mt-1 text-sm ${t?"text-gray-400":"text-gray-600"}`,children:r("api.description")||"Use this interactive documentation to understand and test the API endpoints."})]}),n.jsx("div",{className:"divide-y divide-gray-200 dark:divide-gray-700",children:hg.map(f=>{var S;const w=s===f.id,y=t?"bg-gray-800":"bg-white",b=t?"bg-gray-900":"bg-gray-50",p=f.translationKey?r(`api.endpoints.${f.translationKey}.summary`):f.summary,u=f.translationKey?r(`api.endpoints.${f.translationKey}.description`):f.description,g=((S=i[f.id])==null?void 0:S.body)!==void 0?i[f.id].body:f.requestBody?JSON.stringify(f.requestBody.content["application/json"].example,null,2):"";return n.jsxs("div",{className:`${w?b:y}`,children:[n.jsxs("div",{onClick:()=>l(f.id),className:"flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",children:[n.jsx("span",{className:`px-3 py-1 text-xs font-bold text-white rounded w-20 text-center ${x(f.method)}`,children:f.method}),n.jsx("span",{className:`font-mono font-medium ${t?"text-gray-200":"text-gray-700"}`,children:f.path}),n.jsx("span",{className:`flex-1 text-sm ${t?"text-gray-400":"text-gray-500"}`,children:p}),n.jsx("span",{className:"text-gray-400",children:w?"▼":"▶"})]}),w&&n.jsxs("div",{className:`p-6 border-t ${t?"border-gray-700 text-gray-300":"border-gray-200 text-gray-700"}`,children:[n.jsx("p",{className:"mb-6 text-sm",children:u}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[n.jsx("div",{children:n.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm",children:[n.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider mb-4 border-b pb-2",children:"Parameters"}),f.parameters&&f.parameters.length>0&&n.jsxs("div",{className:"mb-4",children:[n.jsx("h5",{className:"text-xs font-semibold mb-2 text-blue-500",children:"Path Parameters"}),f.parameters.map(E=>n.jsxs("div",{className:"mb-2",children:[n.jsxs("label",{className:"block text-xs mb-1 font-mono",children:[E.name," ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsx("input",{type:"text",value:m(f.id,E.name),placeholder:E.description||`Enter ${E.name}`,className:`w-full px-3 py-1.5 text-sm border rounded ${t?"bg-gray-900 border-gray-600":"bg-gray-50 border-gray-300"}`,onChange:k=>c(f.id,E.name,k.target.value)})]},E.name))]}),f.requestBody?n.jsxs("div",{className:"mb-4",children:[n.jsx("h5",{className:"text-xs font-semibold mb-2 text-green-500",children:"Request Body (JSON)"}),n.jsx("textarea",{value:g,onChange:E=>d(f.id,E.target.value),className:`w-full h-40 font-mono text-sm p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${t?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`})]}):(!f.parameters||f.parameters.length===0)&&n.jsx("p",{className:"text-sm italic text-gray-500 mb-4",children:"No parameters required."}),n.jsx("button",{onClick:()=>h(f),className:`w-full py-2 font-semibold rounded transition shadow-md ${f.method==="GET"?"bg-blue-600 hover:bg-blue-700":f.method==="DELETE"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700"} text-white`,children:"Try it out!"})]})}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500",children:r("api.postmanGuide")}),n.jsx("div",{className:`p-4 rounded-lg text-sm border ${t?"bg-gray-800 border-gray-600":"bg-blue-50 border-blue-100"}`,children:n.jsxs("ul",{className:`space-y-1 ${t?"text-gray-300":"text-gray-700"}`,children:[n.jsx("li",{children:r("api.postmanSteps.step1")}),n.jsx("li",{children:r("api.postmanSteps.step2").replace("{{method}}",f.method)}),n.jsx("li",{children:r("api.postmanSteps.step3").replace("{{url}}",`https://api.automationexercise.com${f.path}`)}),f.requestBody&&n.jsxs(n.Fragment,{children:[n.jsx("li",{children:r("api.postmanSteps.step4")}),n.jsx("li",{children:r("api.postmanSteps.step5")})]}),n.jsx("li",{children:r("api.postmanSteps.step6")})]})})]}),n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500",children:"Example Request"}),n.jsx("div",{className:`p-4 rounded-lg text-sm font-mono overflow-x-auto ${t?"bg-black/40":"bg-slate-900 text-green-300"}`,children:n.jsxs("div",{className:"mb-2",children:[n.jsx("span",{className:"text-yellow-400",children:f.method})," ",n.jsxs("span",{className:"text-white",children:["https://api.automationexercise.com",f.path]})]})})]}),n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500",children:"Response Format"}),n.jsx("div",{className:`p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-60 ${t?"bg-black/40":"bg-gray-100 text-gray-800"}`,children:n.jsx("pre",{children:JSON.stringify(f.responses[200]||f.responses[201]||{},null,2)})})]})]})]})]})]},f.id)})})]})}function gg({darkMode:e}){const{t}=We(),[r,s]=v.useState({email:"test@example.com",password:"password123"}),[a,i]=v.useState([]),[o,l]=v.useState(!1),[c,d]=v.useState(!1),h=v.useRef(null);v.useEffect(()=>{o&&h.current&&h.current.scrollIntoView({behavior:"smooth"})},[a,o]);const m=async(f,w,y,b=null)=>{d(!0);const p=new Date().toLocaleTimeString(),u="/automationexercise/";let g=w;if(w.startsWith("/")){const k=u.endsWith("/")?u:`${u}/`;w.startsWith(k)||(g=k+w.slice(1))}const S=Date.now(),E={id:S,time:p,name:f,url:g,method:y,body:b,status:"Pending...",response:null};i(k=>[...k,E]);try{const k={method:y,headers:{"Content-Type":"application/json"},body:b?JSON.stringify(b):null},j=await fetch(g,k),C=await j.json();i(I=>I.map(A=>A.id===S?{...A,status:j.status,statusText:j.statusText,response:C}:A)),o||l(!0)}catch(k){i(j=>j.map(C=>C.id===S?{...C,status:"Error",response:{message:k.message}}:C))}finally{d(!1)}},x=()=>i([]);return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsxs("div",{className:"flex justify-between items-start mb-6",children:[n.jsxs("div",{children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"api-simulation-title",children:t("api.title")}),n.jsx("p",{className:`mb-2 ${e?"text-gray-300":"text-gray-600"}`,children:t("api.subtitle")})]}),n.jsxs("button",{onClick:()=>l(!0),className:"flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors",children:[n.jsx("span",{children:"📊 View API Logs"}),a.length>0&&n.jsx("span",{className:"bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full",children:a.length})]})]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[n.jsxs("div",{className:`p-6 rounded-xl border ${e?"bg-gray-700/50 border-gray-600":"bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200"}`,children:[n.jsx("h3",{className:`text-lg font-semibold mb-4 ${e?"text-indigo-300":"text-indigo-900"}`,children:"🔐 User Login Simulation"}),n.jsxs("div",{className:"space-y-4 mb-4",children:[n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:"Email"}),n.jsx("input",{type:"text",value:r.email,onChange:f=>s({...r,email:f.target.value}),className:`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${e?"bg-gray-800 border-gray-600 text-white":"border-gray-300"}`})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:"Password"}),n.jsx("input",{type:"password",value:r.password,onChange:f=>s({...r,password:f.target.value}),className:`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${e?"bg-gray-800 border-gray-600 text-white":"border-gray-300"}`})]})]}),n.jsx("button",{onClick:()=>m("Login","/login","POST",r),disabled:c,className:"w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md",children:c?"Requesting...":"POST /login"})]}),n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{className:`p-6 rounded-xl border ${e?"bg-gray-700/50 border-gray-600":"bg-blue-50 border-blue-200"}`,children:[n.jsx("h3",{className:`text-lg font-semibold mb-2 ${e?"text-blue-300":"text-blue-900"}`,children:"📦 Get Products List"}),n.jsx("p",{className:`text-sm mb-4 ${e?"text-gray-400":"text-gray-600"}`,children:"Fetch all available products from the mock database."}),n.jsx("button",{onClick:()=>m("Get Products","/productsList","GET"),disabled:c,className:"w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md",children:"GET /productsList"})]}),n.jsxs("div",{className:`p-6 rounded-xl border ${e?"bg-gray-700/50 border-gray-600":"bg-emerald-50 border-emerald-200"}`,children:[n.jsx("h3",{className:`text-lg font-semibold mb-2 ${e?"text-emerald-300":"text-emerald-900"}`,children:"🛒 Create Order"}),n.jsx("p",{className:`text-sm mb-4 ${e?"text-gray-400":"text-gray-600"}`,children:"Simulate placing an order for 'Blue Top' (ID: 1)."}),n.jsx("button",{onClick:()=>m("Create Order","/createOrder","POST",{productId:1,quantity:2}),disabled:c,className:"w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-md",children:"POST /createOrder"})]})]})]}),n.jsx(fg,{darkMode:e,onExecute:m}),o&&n.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",children:n.jsxs("div",{className:`w-full max-w-4xl max-h-[80vh] flex flex-col rounded-xl shadow-2xl ${e?"bg-gray-900 text-gray-100":"bg-white text-gray-800"}`,children:[n.jsxs("div",{className:`flex items-center justify-between p-4 border-b ${e?"border-gray-700":"border-gray-200"}`,children:[n.jsxs("h3",{className:"text-xl font-bold flex items-center gap-2",children:["📡 Network Log",n.jsx("span",{className:"text-xs font-normal px-2 py-1 bg-gray-200 text-gray-800 rounded-full",children:"Live"})]}),n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("button",{onClick:x,className:"px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded transition",children:"Clear Logs"}),n.jsx("button",{onClick:()=>l(!1),className:"p-2 hover:bg-gray-200 rounded-full dark:hover:bg-gray-700 transition",children:"✕"})]})]}),n.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20",children:[a.length===0?n.jsx("div",{className:"text-center py-10 text-gray-400",children:"No requests yet. Click a button to simulate an API call."}):a.map(f=>n.jsxs("div",{className:`border rounded-lg overflow-hidden shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsxs("div",{className:`flex items-center justify-between px-4 py-3 border-b ${e?"bg-gray-700/50 border-gray-700":"bg-gray-50 border-gray-100"}`,children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("span",{className:`font-mono text-xs px-2 py-1 rounded ${f.method==="GET"?"bg-blue-100 text-blue-800":"bg-green-100 text-green-800"}`,children:f.method}),n.jsx("span",{className:"font-mono text-sm font-semibold",children:f.url}),n.jsxs("span",{className:"text-xs text-gray-500",children:["(",f.time,")"]})]}),n.jsx("div",{children:typeof f.status=="number"?n.jsxs("span",{className:`px-2 py-1 rounded text-xs font-bold ${f.status>=200&&f.status<300?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:[f.status," ",f.statusText]}):n.jsx("span",{className:"text-xs text-gray-500 animate-pulse",children:f.status})})]}),n.jsxs("div",{className:"p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono",children:[f.body&&n.jsxs("div",{className:"space-y-1",children:[n.jsx("p",{className:"text-xs font-bold text-gray-500 uppercase",children:"Request Body"}),n.jsx("pre",{className:`p-2 rounded overflow-x-auto ${e?"bg-black/30":"bg-gray-100"}`,children:JSON.stringify(f.body,null,2)})]}),f.response&&n.jsxs("div",{className:"space-y-1 md:col-span-2",children:[n.jsx("p",{className:"text-xs font-bold text-gray-500 uppercase",children:"Response Body"}),n.jsx("pre",{className:`p-2 rounded overflow-x-auto ${e?"bg-black/30":"bg-gray-100"}`,children:JSON.stringify(f.response,null,2)})]})]})]},f.id)),n.jsx("div",{ref:h})]})]})})]})}function yg({darkMode:e}){return n.jsxs("div",{className:`section-card max-w-7xl mx-auto transition-colors duration-300 ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h1",{className:`text-4xl font-bold mb-6 ${e?"text-white":"text-gray-900"}`,"data-testid":"comparison-title",children:"🔍 Cypress, Selenium ve Playwright Komut Karşılaştırması"}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:`text-3xl font-bold mb-6 ${e?"text-indigo-300":"text-indigo-900"}`,children:"1. Genel Bakış"}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[n.jsxs("div",{className:"p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-green-900 mb-3",children:"🌲 Cypress"}),n.jsxs("ul",{className:"text-sm text-green-800 space-y-2",children:[n.jsx("li",{children:"• Node.js tabanlı, JavaScript/TypeScript"}),n.jsx("li",{children:"• Chrome, Firefox, Edge, Electron destekler"}),n.jsx("li",{children:"• Real-time reload ve otomatik bekleme"}),n.jsx("li",{children:"• Screenshot ve video kaydı"})]})]}),n.jsxs("div",{className:"p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-orange-900 mb-3",children:"🔶 Selenium"}),n.jsxs("ul",{className:"text-sm text-orange-800 space-y-2",children:[n.jsx("li",{children:"• Çoklu dil desteği (Java, Python, C#, JS vb.)"}),n.jsx("li",{children:"• Geniş tarayıcı ve platform desteği"}),n.jsx("li",{children:"• WDIO, Selenium Grid gibi ekosistem"}),n.jsx("li",{children:"• Daha eski, olgun bir teknoloji"})]})]}),n.jsxs("div",{className:"p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-blue-900 mb-3",children:"🎭 Playwright"}),n.jsxs("ul",{className:"text-sm text-blue-800 space-y-2",children:[n.jsx("li",{children:"• Microsoft geliştiricisi"}),n.jsx("li",{children:"• Chrome, Firefox, WebKit destekler"}),n.jsx("li",{children:"• Otomatik bekleme ve network mocking"}),n.jsx("li",{children:"• Multi-tab, multi-origin desteği"})]})]})]})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:`text-3xl font-bold mb-6 ${e?"text-indigo-300":"text-indigo-900"}`,children:"2. Temel Komutlar - Sayfaya Gitme"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:`w-full border rounded-lg ${e?"bg-gray-700 border-gray-600":"bg-white border-gray-200"}`,children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"URL'ye git"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded",children:"cy.visit('/')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'driver.get("https://...")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.goto('https://...')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Geri git"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded",children:"cy.go('back')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"driver.navigate().back()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.goBack()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"İleri git"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded",children:"cy.go('forward')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"driver.navigate().forward()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.goForward()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Yenile"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded",children:"cy.reload()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"driver.navigate().refresh()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.reload()"})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"3. Element Bulma ve Doğrulama"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Element bul (CSS)"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'driver.findElement(By.css(".btn"))'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.locator('.btn')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"İç metinle bul"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.contains('Kaydet')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:`By.xpath("//*[text()='Kaydet']")`})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.getByText('Kaydet')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Görünür mü"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"should('be.visible')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"element.isDisplayed()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"toBeVisible()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Text kontrol"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"should('have.text', 'Başlık')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'getText().equals("Başlık")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"toHaveText('Başlık')"})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"4. Tıklama İşlemleri"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Normal tık"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn').click()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"element.click()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.click()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Sağ tık"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn').rightclick()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"Actions.contextClick()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["click(","{","button: 'right'","}",")"]})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Çift tık"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn').dblclick()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"Actions.doubleClick()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.dblclick()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Checkbox işaretle"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:`cy.get('[type="checkbox"]').check()`})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"element.click()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.check()"})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"5. Form İşlemleri"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Text yaz"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('input').type('text')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'element.sendKeys("text")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.fill('text')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Temizle ve yaz"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"clear().type('yeni')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'element.clear(); sendKeys("yeni")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.fill('yeni')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Dropdown (value)"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"select('value')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'Select().selectByValue("value")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["selectOption(","{","value: 'value'","}",")"]})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Dropdown (text)"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"select('Metin')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'selectByVisibleText("Metin")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["selectOption(","{","label: 'Metin'","}",")"]})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"6. Bekleme İşlemleri"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Sabit bekleme"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.wait(1000)"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"Thread.sleep(1000)"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.waitForTimeout(1000)"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Element görünene kadar"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn').should('be.visible')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"WebDriverWait.visibilityOf()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["waitFor(","{","state: 'visible'","}",")"]})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Element kaybolana kadar"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"should('not.exist')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"invisibilityOf()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["waitFor(","{","state: 'hidden'","}",")"]})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"7. Performans Karşılaştırması"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Kriter"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Hız"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Öğrenme kolaylığı"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Tarayıcı desteği"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"API test desteği"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Paralel test"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"8. Ne Zaman Hangi Aracı Kullanmalı?"}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[n.jsxs("div",{className:"p-6 bg-green-50 border-2 border-green-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-green-900 mb-4",children:"🌲 Cypress Seçin Eğer:"}),n.jsxs("ul",{className:"text-sm text-green-800 space-y-2 list-disc list-inside",children:[n.jsx("li",{children:"Frontend odaklı proje (React, Vue, Angular)"}),n.jsx("li",{children:"Hızlı kurulum ve öğrenme istiyorsanız"}),n.jsx("li",{children:"Modern JavaScript/TypeScript stack"}),n.jsx("li",{children:"Chrome/Firefox testi yeterli ise"})]})]}),n.jsxs("div",{className:"p-6 bg-orange-50 border-2 border-orange-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-orange-900 mb-4",children:"🔶 Selenium Seçin Eğer:"}),n.jsxs("ul",{className:"text-sm text-orange-800 space-y-2 list-disc list-inside",children:[n.jsx("li",{children:"Çoklu dil desteği gerekiyorsa"}),n.jsx("li",{children:"Eski bir sistemle entegrasyon"}),n.jsx("li",{children:"Geniş tarayıcı/cihaz desteği"}),n.jsx("li",{children:"Selenium Grid ile dağıtık test"})]})]}),n.jsxs("div",{className:"p-6 bg-blue-50 border-2 border-blue-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-blue-900 mb-4",children:"🎭 Playwright Seçin Eğer:"}),n.jsxs("ul",{className:"text-sm text-blue-800 space-y-2 list-disc list-inside",children:[n.jsx("li",{children:"Modern web uygulamaları"}),n.jsx("li",{children:"Multi-tab, iframe, service worker testi"}),n.jsx("li",{children:"Network mocking ve interception"}),n.jsx("li",{children:"Cross-browser (WebKit dahil) test"})]})]})]})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"9. Örnek: Login Formu Testi"}),n.jsxs("div",{className:"grid grid-cols-1 gap-6",children:[n.jsxs("div",{className:"p-6 bg-green-50 border-l-4 border-green-500 rounded-lg",children:[n.jsx("h4",{className:"font-bold text-green-900 mb-3",children:"🌲 Cypress"}),n.jsx("pre",{className:"bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm",children:`describe('Login Test', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('#username').type('testuser');
    cy.get('#password').type('password123');
    cy.get('form').submit();
    cy.url().should('include', '/dashboard');
    cy.get('.welcome-message').should('contain', 'Hoşgeldin');
  });
});`})]}),n.jsxs("div",{className:"p-6 bg-orange-50 border-l-4 border-orange-500 rounded-lg",children:[n.jsx("h4",{className:"font-bold text-orange-900 mb-3",children:"🔶 Selenium (Java)"}),n.jsx("pre",{className:"bg-gray-900 text-orange-400 p-4 rounded-lg overflow-x-auto text-sm",children:`@Test
public void testLogin() {
    driver.get("https://example.com/login");
    driver.findElement(By.id("username")).sendKeys("testuser");
    driver.findElement(By.id("password")).sendKeys("password123");
    driver.findElement(By.tagName("form")).submit();
    assert driver.getCurrentUrl().contains("/dashboard");
    assert driver.findElement(By.className("welcome-message"))
           .getText().contains("Hoşgeldin");
}`})]}),n.jsxs("div",{className:"p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg",children:[n.jsx("h4",{className:"font-bold text-blue-900 mb-3",children:"🎭 Playwright"}),n.jsx("pre",{className:"bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto text-sm",children:`test('Login Test', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').fill('testuser');
  await page.locator('#password').fill('password123');
  await page.locator('form').click();
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('.welcome-message'))
       .toContainText('Hoşgeldin');
});`})]})]})]}),n.jsx("section",{className:"mb-8",children:n.jsxs("div",{className:"p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl",children:[n.jsx("h2",{className:"text-3xl font-bold mb-4",children:"💡 Sonuç"}),n.jsx("p",{className:"text-lg mb-4",children:"Her araç kendi güçlü yönlerine sahiptir:"}),n.jsxs("ul",{className:"space-y-2 text-indigo-100",children:[n.jsxs("li",{children:["• ",n.jsx("strong",{children:"Cypress:"})," Geliştirici dostu, hızlı feedback, mükemmel debugging"]}),n.jsxs("li",{children:["• ",n.jsx("strong",{children:"Selenium:"})," Olgun, esnek, geniş dil ve tarayıcı desteği"]}),n.jsxs("li",{children:["• ",n.jsx("strong",{children:"Playwright:"})," Modern, hızlı, güçlü API ve network kontrolü"]})]}),n.jsx("p",{className:"mt-4 text-indigo-100",children:"Proje gereksinimlerinize, ekibinizin becerilerine ve test kapsamınıza göre en uygun aracı seçin."})]})})]})}const xg=({darkMode:e})=>{const{t}=We(),[r,s]=v.useState("comparison");return n.jsxs("div",{className:`locator-guide-container ${e?"dark-mode":""}`,children:[n.jsxs("header",{children:[n.jsx("h1",{children:t("locator.title")}),n.jsx("p",{className:"subtitle",children:t("locator.subtitle")})]}),n.jsxs("div",{className:"nav-tabs",children:[n.jsx("button",{className:`tab-btn ${r==="comparison"?"active":""}`,onClick:()=>s("comparison"),children:t("locator.tabs.comparison")}),n.jsx("button",{className:`tab-btn ${r==="playwright-only"?"active":""}`,onClick:()=>s("playwright-only"),children:t("locator.tabs.playwrightOnly")})]}),r==="comparison"&&n.jsxs("div",{id:"comparison",className:"content-section active",children:[n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 1"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<input type="text" id="username" />'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement element = driver
  .findElement(By.id("username"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const element = page
  .locator('#username');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp1")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 2"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<button class="btn-primary">Gönder</button>'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement button = driver
  .findElement(By.className("btn-primary"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const button = page
  .locator('.btn-primary');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp2")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 3"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<input name="email" type="email" />'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement email = driver
  .findElement(By.name("email"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const email = page
  .locator('[name="email"]');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp3")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 4"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<a href="/home">Ana Sayfa</a>'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement link = driver
  .findElement(By.linkText("Ana Sayfa"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const link = page
  .getByRole('link', { name: 'Ana Sayfa' });`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp4")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 5"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:"<button>Kaydet</button>"})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement btn = driver
  .findElement(By.xpath("//button[text()='Kaydet']"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const btn = page
  .getByRole('button', { name: 'Kaydet' });`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp5")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 6"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<div class="container">
  <p>Merhaba Dünya</p>
</div>`})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement text = driver
  .findElement(By.cssSelector(".container p"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const text = page
  .locator('.container p');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp6")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 7"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<input type="text" placeholder="Adınızı girin" />'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement input = driver.findElement(
  By.cssSelector("[placeholder='Adınızı girin']")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const input = page
  .getByPlaceholder('Adınızı girin');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp7")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 8"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<label>E-posta:</label>
<input type="email" />`})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement input = driver.findElement(
  By.xpath("//label[text()='E-posta:']/following-sibling::input")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const input = page
  .getByLabel('E-posta:');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp8")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 9"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:"<h1>Hoş Geldiniz</h1>"})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement heading = driver
  .findElement(By.tagName("h1"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const heading = page
  .getByRole('heading', { name: 'Hoş Geldiniz' });`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp9")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 10"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<div data-testid="user-profile">Profil</div>'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement profile = driver.findElement(
  By.cssSelector("[data-testid='user-profile']")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const profile = page
  .getByTestId('user-profile');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp10")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 11"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<ul>
  <li>Elma</li>
  <li>Armut</li>
</ul>`})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`List<WebElement> items = driver
  .findElements(By.tagName("li"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const items = page
  .locator('li');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp11")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 12"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:"<p>Toplam: 150 TL</p>"})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement price = driver.findElement(
  By.xpath("//p[contains(text(),'Toplam')]")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const price = page
  .getByText('Toplam:', { exact: false });`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp12")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 13"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<img src="logo.png" alt="Şirket Logosu" />'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement logo = driver.findElement(
  By.cssSelector("[alt='Şirket Logosu']")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const logo = page
  .getByAltText('Şirket Logosu');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp13")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 14"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<div id="main">
  <button>Tıkla</button>
</div>`})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement parent = driver.findElement(By.id("main"));
WebElement button = parent.findElement(By.tagName("button"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const button = page
  .locator('#main button');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp14")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 15"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<input type="checkbox" id="terms" />'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement checkbox = driver
  .findElement(By.id("terms"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const checkbox = page
  .getByRole('checkbox');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp15")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 16"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<select id="country">
  <option>Türkiye</option>
</select>`})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement select = driver
  .findElement(By.id("country"));`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const select = page
  .locator('#country');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp16")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 17"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<table>
  <tr>
    <td>Ahmet</td>
  </tr>
</table>`})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement cell = driver.findElement(
  By.xpath("//table/tr/td")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const cell = page
  .locator('table tr td');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp17")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 18"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<div title="Yardım İpucu">?</div>'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement help = driver.findElement(
  By.cssSelector("[title='Yardım İpucu']")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const help = page
  .getByTitle('Yardım İpucu');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp18")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 19"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<form>
  <input type="text" />
  <button type="submit">Gönder</button>
</form>`})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement form = driver.findElement(By.tagName("form"));
WebElement submit = form.findElement(
  By.cssSelector("[type='submit']")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const submit = page
  .locator('form')
  .getByRole('button', { name: 'Gönder' });`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp19")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 20"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<div class="card active">
  <span>Aktif Kart</span>
</div>`})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement card = driver.findElement(
  By.cssSelector(".card.active span")
);`})})})]}),n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header playwright-header",children:t("locator.headers.playwright")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`const card = page
  .locator('.card.active span');`})})})]})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.comp20")]})]})]}),r==="playwright-only"&&n.jsxs("div",{id:"playwright-only",className:"content-section active",children:[n.jsx("div",{className:"playwright-only",children:t("locator.headers.playwrightOnlyFeatures")}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 1"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<button>Kaydet</button>
<button>İptal</button>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.firstElement")}),n.jsx("pre",{children:n.jsx("code",{children:"const firstButton = page.locator('button').first();"})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw1")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 2"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<ul>
  <li>Birinci</li>
  <li>İkinci</li>
  <li>Üçüncü</li>
</ul>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.lastElement")}),n.jsx("pre",{children:n.jsx("code",{children:"const lastItem = page.locator('li').last();"})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw2")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 3"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<div class="item">1</div>
<div class="item">2</div>
<div class="item">3</div>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.nthElement")}),n.jsx("pre",{children:n.jsx("code",{children:"const secondItem = page.locator('.item').nth(1); // 0'dan başlar"})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw3")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 4"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<div>
  <p>Aktif olmayan metin</p>
  <p class="active">Aktif metin</p>
</div>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.filtering")}),n.jsx("pre",{children:n.jsx("code",{children:`const activeParagraph = page
  .locator('p')
  .filter({ hasText: 'Aktif' });`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw4")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 5"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<article>
  <h2>Başlık</h2>
  <button>Oku</button>
</article>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.hasElement")}),n.jsx("pre",{children:n.jsx("code",{children:`const article = page
  .locator('article')
  .filter({ has: page.locator('button') });`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw5")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 6"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<div class="container">
  <p>Test metni</p>
</div>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.visibility")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.locator('.container')).toBeVisible();
await expect(page.locator('.container')).toBeHidden();`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw6")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 7"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:"<button disabled>Gönder</button>"})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.stateCheck")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.getByRole('button')).toBeDisabled();
await expect(page.getByRole('button')).toBeEnabled();`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw7")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 8"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<input type="checkbox" checked />'})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.checkboxCheck")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.getByRole('checkbox')).toBeChecked();
await page.getByRole('checkbox').check();
await page.getByRole('checkbox').uncheck();`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw8")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 9"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:"<p>Hoş geldiniz!</p>"})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.textContent")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.locator('p')).toHaveText('Hoş geldiniz!');
await expect(page.locator('p')).toContainText('Hoş');`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw9")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 10"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<input type="text" value="Merhaba" />'})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.inputValue")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.locator('input')).toHaveValue('Merhaba');
const value = await page.locator('input').inputValue();`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw10")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 11"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<div class="box active">Kutu</div>'})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.classCheck")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.locator('.box')).toHaveClass('box active');
await expect(page.locator('.box')).toHaveClass(/active/);`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw11")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 12"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<div id="myDiv" data-value="123">İçerik</div>'})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.attributeCheck")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.locator('#myDiv')).toHaveAttribute('data-value', '123');
const attrValue = await page.locator('#myDiv').getAttribute('data-value');`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw12")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 13"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<ul>
  <li>Öğe 1</li>
  <li>Öğe 2</li>
  <li>Öğe 3</li>
</ul>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.elementCount")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.locator('li')).toHaveCount(3);
const count = await page.locator('li').count();`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw13")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 14"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<a href="https://example.com">Link</a>'})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.urlCheck")}),n.jsx("pre",{children:n.jsx("code",{children:`await expect(page.getByRole('link')).toHaveAttribute('href', 'https://example.com');
await page.getByRole('link').click();
await expect(page).toHaveURL('https://example.com');`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw14")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 15"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<button id="delayed">Yavaş Yüklenen Buton</button>'})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.autoWait")}),n.jsx("pre",{children:n.jsx("code",{children:`// Playwright otomatik bekler, ekstra wait gerekmez
await page.locator('#delayed').click();

// Manuel bekleme gerekirse:
await page.locator('#delayed').waitFor({ state: 'visible' });`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw15")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 16"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<div>
  <input placeholder="Ara..." />
  <button>Gönder</button>
</div>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.chaining")}),n.jsx("pre",{children:n.jsx("code",{children:`const searchBox = page
  .locator('div')
  .getByPlaceholder('Ara...');

const submitBtn = page
  .locator('div')
  .getByRole('button', { name: 'Gönder' });`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw16")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 17"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<select id="country">
  <option value="tr">Türkiye</option>
  <option value="us">ABD</option>
</select>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.dropdownSelection")}),n.jsx("pre",{children:n.jsx("code",{children:`// Label ile seçim
await page.locator('#country').selectOption('Türkiye');

// Value ile seçim
await page.locator('#country').selectOption({ value: 'tr' });

// Index ile seçim
await page.locator('#country').selectOption({ index: 0 });`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw17")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 18"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<iframe src="content.html">
  <button>İçerideki Buton</button>
</iframe>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.frameElement")}),n.jsx("pre",{children:n.jsx("code",{children:`const frame = page.frameLocator('iframe');
await frame.getByRole('button', { name: 'İçerideki Buton' }).click();`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw18")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 19"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<div>
  <p>Başlık</p>
  <p>İçerik</p>
</div>`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.allElements")}),n.jsx("pre",{children:n.jsx("code",{children:`const paragraphs = await page.locator('p').all();

for (const p of paragraphs) {
  const text = await p.textContent();
  console.log(text);
}`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw19")]})]}),n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.playwrightExample")," 20"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:`<button>Dosya Yükle</button>
<input type="file" style="display:none" />`})})]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.actions.fileUpload")}),n.jsx("pre",{children:n.jsx("code",{children:`// Dosya input'unu bul
const fileInput = page.locator('input[type="file"]');

// Dosya yükle (görünmez olsa bile çalışır)
await fileInput.setInputFiles('path/to/file.pdf');

// Birden fazla dosya yükleme
await fileInput.setInputFiles([
  'file1.pdf',
  'file2.pdf'
]);`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw20")]})]})]})]})};function vg({darkMode:e,onHomeClick:t}){const{t:r}=We(),s=(T,M)=>{const W=new Date().toLocaleTimeString("tr-TR");console.log(`[${W}] [${T.toUpperCase()}] ${M}`)},[a,i]=v.useState({name:"",email:"",phone:"",address:""}),[o,l]=v.useState({gender:"",days:[],country:"",colors:[]}),[c,d]=v.useState({standard:"",rangeStart:"",rangeEnd:""}),[h,m]=v.useState(50),[x,f]=v.useState(!1),[w,y]=v.useState(!1),[b,p]=v.useState(!1),[u,g]=v.useState([]),[S,E]=v.useState(1),[k,j]=v.useState({});v.useEffect(()=>{C("Uygulama Bahçesi (Practice Playground) Başlatıldı"),C("Test Tanıtım Bloğu: Bu sayfa UI otomasyon testleri için çeşitli senaryolar barındırır.")},[]);const C=T=>s("info",T),I=T=>s("step",T),A=(T,M)=>{i(W=>({...W,[T]:M})),I(`Kişisel Bilgi güncellendi: ${T} = ${M}`)},X=(T,M)=>{if(T==="days"){const W=o.days.includes(M)?o.days.filter(de=>de!==M):[...o.days,M];l(de=>({...de,days:W})),I(`Gün seçimi güncellendi: ${W.join(", ")}`)}else if(T==="colors"){const W=Array.from(M).map(de=>de.value);l(de=>({...de,colors:W})),I(`Renk seçimi güncellendi: ${W.join(", ")}`)}else l(W=>({...W,[T]:M})),I(`${T} seçimi güncellendi: ${M}`)},Ye=[{id:1,name:"Google",contact:"Maria Anders",country:"USA"},{id:2,name:"Meta",contact:"Francisco Chang",country:"Mexico"},{id:3,name:"Amazon",contact:"Roland Mendel",country:"Austria"}],_e=Array.from({length:20},(T,M)=>({id:M+1,name:`Product ${M+1}`,price:`$${(M+1)*10}`})),Qe=5,fe=Math.ceil(_e.length/Qe),Nr=_e.slice((S-1)*Qe,S*Qe),Vt=(T,M)=>{const W=Array.from(T.target.files);g(de=>M?[...de,...W]:W),I(`${M?"Çoklu":"Tekli"} dosya yüklendi: ${W.map(de=>de.name).join(", ")}`)},P=T=>{f(!0),I("Sürükleme işlemi başladı")},L=T=>{T.preventDefault(),y(!0),f(!1),I("Öğe başarıyla bırakıldı (Drop)")},_=()=>{p(!0),I("Çift tıklama tetiklendi"),setTimeout(()=>p(!1),2e3)},F=()=>n.jsx("button",{onClick:t,title:r("practice.homeTooltip"),className:"absolute top-4 right-4 text-2xl hover:scale-120 transition-transform cursor-pointer opacity-70 hover:opacity-100","data-testid":"home-icon-nav",children:"🏠"});return n.jsxs("div",{className:"space-y-8 pb-20",children:[n.jsxs("div",{className:`text-center mb-12 p-8 rounded-2xl shadow-lg border ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-100"}`,children:[n.jsx("h1",{className:`text-3xl font-bold mb-2 ${e?"text-white":"text-gray-900"}`,children:r("practice.title")}),n.jsx("p",{className:`${e?"text-gray-400":"text-gray-600"}`,children:r("practice.subtitle")})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[n.jsxs("section",{className:`relative p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(F,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.personalInfo.title")}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.personalInfo.name")}),n.jsx("input",{type:"text","data-testid":"name",placeholder:r("practice.personalInfo.namePlaceholder"),className:`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:a.name,onChange:T=>A("name",T.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.personalInfo.email")}),n.jsx("input",{type:"email","data-testid":"email",placeholder:r("practice.personalInfo.emailPlaceholder"),className:`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:a.email,onChange:T=>A("email",T.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.personalInfo.phone")}),n.jsx("input",{type:"tel","data-testid":"phone",placeholder:r("practice.personalInfo.phonePlaceholder"),className:`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:a.phone,onChange:T=>A("phone",T.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.personalInfo.address")}),n.jsx("textarea",{"data-testid":"textarea",rows:"3",placeholder:r("practice.personalInfo.addressPlaceholder"),className:`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:a.address,onChange:T=>A("address",T.target.value)})]})]})]}),n.jsxs("section",{className:`relative p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(F,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.selections.title")}),n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.selections.gender")}),n.jsxs("div",{className:"flex gap-4",children:[n.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[n.jsx("input",{type:"radio",value:"male",checked:o.gender==="male",onChange:T=>X("gender",T.target.value),className:"w-4 h-4 text-blue-600","data-testid":"male",name:"gender"}),n.jsx("span",{className:`${e?"text-gray-300":"text-gray-600"}`,children:r("practice.selections.male")})]}),n.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[n.jsx("input",{type:"radio",value:"female",checked:o.gender==="female",onChange:T=>X("gender",T.target.value),className:"w-4 h-4 text-pink-600","data-testid":"female",name:"gender"}),n.jsx("span",{className:`${e?"text-gray-300":"text-gray-600"}`,children:r("practice.selections.female")})]})]})]}),n.jsxs("div",{children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.selections.days")}),n.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-2",children:["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(T=>n.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[n.jsx("input",{type:"checkbox",value:T,checked:o.days.includes(T),onChange:M=>X("days",M.target.value),className:"rounded text-blue-600","data-testid":T}),n.jsx("span",{className:`text-sm ${e?"text-gray-300":"text-gray-600"}`,children:r(`practice.selections.${T}`)})]},T))})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.selections.country")}),n.jsxs("select",{"data-testid":"country",className:`w-full px-4 py-2 rounded-lg border outline-none ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:o.country,onChange:T=>X("country",T.target.value),children:[n.jsx("option",{value:"",children:"---"}),n.jsx("option",{value:"tr",children:"Turkey"}),n.jsx("option",{value:"uk",children:"United Kingdom"}),n.jsx("option",{value:"us",children:"USA"}),n.jsx("option",{value:"ca",children:"Canada"}),n.jsx("option",{value:"de",children:"Germany"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.selections.colors")}),n.jsxs("select",{multiple:!0,"data-testid":"colors",className:`w-full h-32 px-2 py-1 rounded-lg border outline-none ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,onChange:T=>X("colors",T.target.selectedOptions),children:[n.jsx("option",{value:"red",children:"Red"}),n.jsx("option",{value:"blue",children:"Blue"}),n.jsx("option",{value:"green",children:"Green"}),n.jsx("option",{value:"yellow",children:"Yellow"}),n.jsx("option",{value:"purple",children:"Purple"}),n.jsx("option",{value:"white",children:"White"})]}),n.jsxs("p",{className:"mt-2 text-xs text-gray-500",children:[r("practice.selections.selectedColors")," ",o.colors.join(", ")]})]})]})]}),n.jsxs("section",{className:`relative p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(F,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.datePickers.title")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.datePickers.standard")}),n.jsx("input",{type:"date","data-testid":"datepicker",className:`w-full px-4 py-2 rounded-lg border ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:c.standard,onChange:T=>{d({...c,standard:T.target.value}),I(`Standart tarih seçildi: ${T.target.value}`)}})]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("label",{className:`block text-sm font-medium ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.datePickers.range")}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("input",{type:"date","data-testid":"start-date",className:`w-full px-2 py-1 rounded-lg border text-sm ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,onChange:T=>d({...c,rangeStart:T.target.value})}),n.jsx("input",{type:"date","data-testid":"end-date",className:`w-full px-2 py-1 rounded-lg border text-sm ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,onChange:T=>d({...c,rangeEnd:T.target.value})})]})]})]})]}),n.jsxs("section",{className:`relative p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(F,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.interactions.title")}),n.jsxs("div",{className:"space-y-8",children:[n.jsxs("div",{children:[n.jsxs("label",{className:`block text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:[r("practice.interactions.slider")," [Value: ",h,"]"]}),n.jsx("input",{type:"range","data-testid":"slider",min:"0",max:"100",value:h,onChange:T=>{m(T.target.value),I(`Slider değeri değişti: ${T.target.value}`)},className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[n.jsxs("div",{children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.interactions.dragDrop")}),n.jsxs("div",{className:"flex gap-4",children:[!w&&n.jsx("div",{draggable:!0,onDragStart:P,"data-testid":"draggable",className:"w-16 h-16 bg-blue-500 text-white text-[10px] rounded flex items-center justify-center cursor-move select-none animate-pulse",children:r("practice.interactions.dragMe")}),n.jsx("div",{onDragOver:T=>T.preventDefault(),onDrop:L,"data-testid":"droppable",className:`w-24 h-24 border-2 border-dashed rounded flex items-center justify-center text-xs text-center p-2 transition-all ${w?"bg-green-100 border-green-500 text-green-700":e?"border-gray-600 text-gray-500":"border-gray-300 text-gray-400"}`,children:w?"✅ Success!":r("practice.interactions.dropHere")})]})]}),n.jsxs("div",{children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.interactions.doubleClick")}),n.jsx("button",{onDoubleClick:_,"data-testid":"double-click",className:`px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 ${b?"bg-purple-600 text-white":"bg-gray-200 text-gray-800 hover:bg-gray-300"}`,children:b?r("practice.interactions.doubleClickResult"):"Click x2"})]})]})]})]}),n.jsxs("section",{className:`relative lg:col-span-2 p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(F,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.tables.title")}),n.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-8",children:[n.jsxs("div",{children:[n.jsxs("p",{className:`text-sm font-bold mb-3 ${e?"text-gray-400":"text-gray-600 opacity-70"}`,children:["[STATIK] ",r("practice.tables.static")]}),n.jsx("div",{className:"overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",children:n.jsxs("table",{className:"w-full text-sm text-left","data-testid":"static-table",children:[n.jsx("thead",{className:`${e?"bg-gray-700 text-gray-200":"bg-gray-50 text-gray-700"}`,children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-4 py-2 border-b",children:"ID"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Name"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Contact"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Country"})]})}),n.jsx("tbody",{className:e?"text-gray-300":"text-gray-600",children:Ye.map(T=>n.jsxs("tr",{className:"border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",children:[n.jsx("td",{className:"px-4 py-2",children:T.id}),n.jsx("td",{className:"px-4 py-2",children:T.name}),n.jsx("td",{className:"px-4 py-2",children:T.contact}),n.jsx("td",{className:"px-4 py-2",children:T.country})]},T.id))})]})})]}),n.jsxs("div",{children:[n.jsxs("p",{className:`text-sm font-bold mb-3 ${e?"text-gray-400":"text-gray-600 opacity-70"}`,children:["[PAGINATION] ",r("practice.tables.pagination")]}),n.jsx("div",{className:"overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",children:n.jsxs("table",{className:"w-full text-sm text-left","data-testid":"pagination-table",children:[n.jsx("thead",{className:`${e?"bg-gray-700 text-gray-200":"bg-gray-50 text-gray-700"}`,children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-4 py-2 border-b",children:"#"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Product"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Price"})]})}),n.jsx("tbody",{className:e?"text-gray-300":"text-gray-600",children:Nr.map(T=>n.jsxs("tr",{className:"border-b dark:border-gray-700",children:[n.jsx("td",{className:"px-4 py-2",children:T.id}),n.jsx("td",{className:"px-4 py-2",children:T.name}),n.jsx("td",{className:"px-4 py-2 font-mono text-blue-600 dark:text-blue-400",children:T.price})]},T.id))})]})}),n.jsxs("div",{className:"flex items-center justify-between mt-4",children:[n.jsx("button",{onClick:()=>{E(T=>Math.max(1,T-1)),I(`Tablo sayfa değiştirildi: ${S-1}`)},disabled:S===1,className:"px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50 text-xs",children:"Previous"}),n.jsxs("span",{className:"text-xs font-medium",children:["Page ",S," of ",fe]}),n.jsx("button",{onClick:()=>{E(T=>Math.min(fe,T+1)),I(`Tablo sayfa değiştirildi: ${S+1}`)},disabled:S===fe,className:"px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50 text-xs",children:"Next"})]})]})]})]}),n.jsxs("section",{className:`relative lg:col-span-2 p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(F,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.files.title")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.files.single")}),n.jsx("input",{type:"file","data-testid":"single-file-upload",className:"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer",onChange:T=>Vt(T,!1)})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.files.multiple")}),n.jsx("input",{type:"file",multiple:!0,"data-testid":"multi-file-upload",className:"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer",onChange:T=>Vt(T,!0)})]})]}),u.length>0&&n.jsxs("div",{className:"mt-4 p-4 rounded bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800",children:[n.jsx("p",{className:"text-xs font-bold mb-2 uppercase text-gray-400",children:"Yüklenen Dosyalar:"}),n.jsx("ul",{className:"text-xs space-y-1",children:u.map((T,M)=>n.jsxs("li",{className:"flex items-center gap-2 text-blue-600 dark:text-blue-400",children:["📄 ",T.name," (",(T.size/1024).toFixed(1)," KB)"]},M))})]})]})]})]})}function bg(){const{language:e,t,toggleLanguage:r}=We(),s=uo(),[a,i]=v.useState("basic"),[o,l]=v.useState(()=>{const h=localStorage.getItem("darkMode");return h!==null?JSON.parse(h):!0});v.useEffect(()=>{localStorage.setItem("darkMode",JSON.stringify(o))},[o]);const c=[{id:"basic",name:t("nav.basic")},{id:"locator-guide",name:t("nav.locatorGuide")},{id:"complex",name:t("nav.complex")},{id:"advanced",name:t("nav.advanced")},{id:"table",name:t("nav.table")},{id:"api",name:t("nav.api")},{id:"comparison",name:t("nav.comparison")},{id:"practice",name:t("nav.practice")||"🛠️ Uygulama Bahçesi"}],d=()=>{switch(a){case"basic":return n.jsx(Dl,{darkMode:o});case"locator-guide":return n.jsx(xg,{darkMode:o});case"complex":return n.jsx(ug,{darkMode:o});case"advanced":return n.jsx(pg,{darkMode:o});case"table":return n.jsx(mg,{darkMode:o});case"api":return n.jsx(gg,{darkMode:o});case"comparison":return n.jsx(yg,{darkMode:o});case"practice":return n.jsx(vg,{darkMode:o,onHomeClick:()=>i("basic")});default:return n.jsx(Dl,{darkMode:o})}};return n.jsxs("div",{className:`min-h-screen transition-colors duration-300 ${o?"dark-mode bg-gray-900":"bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"}`,children:[n.jsx("header",{className:`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${o?"bg-gray-800":"bg-gradient-to-r from-indigo-600 to-purple-600"}`,children:n.jsx("div",{className:"container mx-auto px-6 py-8",children:n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("div",{className:"flex flex-col items-center gap-2",children:n.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),title:t("buttons.homeTooltip"),className:`text-4xl hover:scale-110 transition-transform duration-200 cursor-pointer ${o?"hover:text-yellow-400":"hover:text-yellow-300"}`,children:"🏠"})}),n.jsxs("div",{className:"flex-1 text-center",children:[n.jsx("h1",{className:"text-4xl font-bold mb-2 text-white","data-testid":"main-title",children:t("header.title")}),n.jsx("p",{className:`text-lg ${o?"text-gray-300":"text-indigo-100"}`,children:t("header.subtitle")})]}),n.jsxs("div",{className:"flex gap-3",children:[n.jsxs("div",{className:"flex bg-white rounded-lg overflow-hidden","data-testid":"language-toggle",children:[n.jsx("button",{onClick:()=>e==="tr"&&r(),className:`px-4 py-2 font-semibold transition-all duration-300 ${e==="en"?"bg-indigo-600 text-white":"bg-white text-gray-800 hover:bg-gray-100"}`,children:"ENG"}),n.jsx("button",{onClick:()=>e==="en"&&r(),className:`px-4 py-2 font-semibold transition-all duration-300 ${e==="tr"?"bg-indigo-600 text-white":"bg-white text-gray-800 hover:bg-gray-100"}`,children:"TR"})]}),n.jsx("button",{onClick:()=>l(!o),"data-testid":"dark-mode-toggle",className:`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${o?"bg-yellow-400 text-gray-900 hover:bg-yellow-300":"bg-gray-800 text-white hover:bg-gray-700"}`,children:o?`☀️ ${t("buttons.lightMode")}`:`🌙 ${t("buttons.darkMode")}`})]})]})})}),n.jsx("nav",{className:`shadow-md sticky top-0 z-40 transition-colors duration-300 ${o?"bg-gray-800":"bg-white"}`,"data-testid":"main-navigation",children:n.jsx("div",{className:"container mx-auto px-6",children:n.jsxs("div",{className:"flex flex-wrap gap-2 justify-center py-4",children:[n.jsx("a",{href:"https://hasankocaman.github.io/teach-Cypress/",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${o?"bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"}`,children:e==="tr"?"Cypress Öğren":"Learn Cypress"}),n.jsx("a",{href:"https://hasankocaman.github.io/teachPlaywright/",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${o?"bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"}`,children:e==="tr"?"Playwright Öğren":"Learn Playwright"}),n.jsx("a",{href:"https://hasankocaman.github.io/boltJSTScompare/",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${o?"bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"}`,children:e==="tr"?"JavaScript ve TypeScript Karşılaştırma":"JavaScript and TypeScript compare"}),n.jsx("div",{className:`w-px h-8 self-center mx-1 ${o?"bg-gray-600":"bg-gray-300"}`}),n.jsx("button",{onClick:()=>s("/jmeter"),"data-testid":"nav-jmeter",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${o?"bg-gray-700 text-orange-300 hover:bg-orange-900 hover:text-orange-200 hover:scale-102":"bg-orange-50 text-orange-700 hover:bg-orange-100 hover:scale-102"}`,children:t("jmeter.navButton")}),n.jsx("button",{onClick:()=>s("/sql"),"data-testid":"nav-sql",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${o?"bg-gray-700 text-blue-300 hover:bg-blue-900 hover:text-blue-200 hover:scale-102":"bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-102"}`,children:t("sql.navButton")}),n.jsx("button",{onClick:()=>s("/typescript"),"data-testid":"nav-typescript",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${o?"bg-gray-700 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200 hover:scale-102":"bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:scale-102"}`,children:t("typescript.navButton")}),n.jsx("button",{onClick:()=>s("/python"),"data-testid":"nav-python",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${o?"bg-gray-700 text-yellow-300 hover:bg-yellow-900 hover:text-yellow-200 hover:scale-102":"bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:scale-102"}`,children:t("python.navButton")}),n.jsx("div",{className:`w-px h-8 self-center mx-1 ${o?"bg-gray-600":"bg-gray-300"}`}),c.map(h=>n.jsx("button",{onClick:()=>i(h.id),"data-testid":`nav-${h.id}`,className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${a===h.id?"bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105":o?"bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"}`,children:h.name},h.id))]})})}),n.jsx("main",{className:"container mx-auto px-6 py-8",children:n.jsx("div",{className:"animate-fadeIn",children:d()})}),n.jsx("footer",{className:"bg-gray-800 text-white py-6 mt-12",children:n.jsxs("div",{className:"container mx-auto px-6 text-center",children:[n.jsx("p",{className:"text-gray-300","data-testid":"footer-text",children:t("footer.text")}),n.jsx("p",{className:"text-gray-400 text-sm mt-2",children:t("footer.hint")})]})})]})}function wg({darkMode:e,setDarkMode:t}){const{language:r,t:s,toggleLanguage:a}=We(),i=uo();return n.jsx("header",{className:`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${e?"bg-gray-800":"bg-gradient-to-r from-indigo-600 to-purple-600"}`,children:n.jsx("div",{className:"container mx-auto px-6 py-4",children:n.jsxs("div",{className:"flex justify-between items-center flex-wrap gap-3",children:[n.jsx("button",{onClick:()=>i("/"),"data-testid":"topic-back-btn",className:`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${e?"bg-gray-700 text-gray-200 hover:bg-gray-600":"bg-white/20 text-white hover:bg-white/30 border border-white/30"}`,children:s("pages.backButton")}),n.jsxs("div",{className:"flex gap-3",children:[n.jsxs("div",{className:"flex bg-white rounded-lg overflow-hidden","data-testid":"language-toggle",children:[n.jsx("button",{onClick:()=>r==="tr"&&a(),className:`px-4 py-2 font-semibold transition-all duration-300 ${r==="en"?"bg-indigo-600 text-white":"bg-white text-gray-800 hover:bg-gray-100"}`,children:"ENG"}),n.jsx("button",{onClick:()=>r==="en"&&a(),className:`px-4 py-2 font-semibold transition-all duration-300 ${r==="tr"?"bg-indigo-600 text-white":"bg-white text-gray-800 hover:bg-gray-100"}`,children:"TR"})]}),n.jsx("button",{onClick:()=>t(!e),"data-testid":"dark-mode-toggle",className:`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${e?"bg-yellow-400 text-gray-900 hover:bg-yellow-300":"bg-gray-800 text-white hover:bg-gray-700"}`,children:e?`☀️ ${s("buttons.lightMode")}`:`🌙 ${s("buttons.darkMode")}`})]})]})})})}function xo({code:e,darkMode:t}){const[r,s]=v.useState(!1);return n.jsxs("div",{className:"relative mt-3 group",children:[n.jsx("pre",{className:"p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed bg-gray-950 text-green-400 border border-gray-700",children:n.jsx("code",{children:e.trim()})}),n.jsx("button",{onClick:()=>{navigator.clipboard.writeText(e.trim()),s(!0),setTimeout(()=>s(!1),2e3)},className:"absolute top-2 right-2 px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity",children:r?"✅ Copied":"📋 Copy"})]})}function Sg({block:e,darkMode:t}){var l,c;const[r,s]=v.useState(!1),[a,i]=v.useState(!1),o=(l=e.difficulty)!=null&&l.startsWith("🟢")?t?"bg-green-900/30 border-green-700":"bg-green-50 border-green-300":(c=e.difficulty)!=null&&c.startsWith("🟡")?t?"bg-yellow-900/30 border-yellow-700":"bg-yellow-50 border-yellow-300":t?"bg-red-900/30 border-red-700":"bg-red-50 border-red-300";return n.jsxs("div",{className:`mt-6 rounded-xl border-2 p-5 ${t?"bg-gray-800":"bg-white"} ${o}`,children:[n.jsxs("div",{className:"flex items-center gap-2 flex-wrap mb-3",children:[n.jsx("span",{className:`text-xs font-bold px-2 py-0.5 rounded-full border ${o}`,children:e.difficulty}),n.jsx("span",{className:`font-bold text-sm ${t?"text-white":"text-gray-800"}`,children:e.title})]}),n.jsx("p",{className:`text-sm mb-3 leading-relaxed ${t?"text-gray-300":"text-gray-600"}`,children:e.description}),e.hint&&n.jsxs("div",{className:"mb-3",children:[n.jsx("button",{onClick:()=>i(!a),className:"text-xs text-blue-400 hover:underline",children:a?"🙈 Hide hint":"💡 Show hint"}),a&&n.jsx("p",{className:`mt-2 text-xs p-3 rounded-lg ${t?"bg-blue-900/20 text-blue-300":"bg-blue-50 text-blue-700"}`,children:e.hint})]}),n.jsx("button",{onClick:()=>s(!r),className:`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${r?t?"bg-gray-600 text-white":"bg-gray-300 text-gray-700":"bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md"}`,children:r?"🙈 Hide Solution":"👁 Show Solution"}),r&&n.jsxs("div",{className:"mt-3",children:[n.jsx(xo,{code:e.solution,darkMode:t}),e.explanation&&n.jsxs("p",{className:`mt-3 text-xs leading-relaxed italic ${t?"text-gray-400":"text-gray-500"}`,children:["💡 ",e.explanation]})]})]})}function Eg(e,t,r){const s=`text-sm leading-relaxed mt-3 ${r?"text-gray-300":"text-gray-600"}`,a=`text-xl font-bold mt-8 mb-3 pb-2 border-b ${r?"text-white border-gray-700":"text-gray-800 border-gray-200"}`,i=`text-base font-semibold mt-5 mb-2 ${r?"text-gray-200":"text-gray-700"}`,o=e.accentColor||(r?"text-indigo-400":"text-indigo-600");switch(e.type){case"text":return n.jsx("p",{className:s,children:e.content},t);case"heading":return n.jsxs("h3",{className:a,children:[e.text,e.difficulty&&n.jsx("span",{className:`ml-3 text-xs font-normal px-2 py-0.5 rounded-full align-middle ${e.difficulty.startsWith("🟢")?r?"bg-green-900 text-green-300":"bg-green-100 text-green-700":e.difficulty.startsWith("🟡")?r?"bg-yellow-900 text-yellow-300":"bg-yellow-100 text-yellow-700":r?"bg-red-900 text-red-300":"bg-red-100 text-red-700"}`,children:e.difficulty})]},t);case"subheading":return n.jsx("h4",{className:i,children:e.text},t);case"code":return n.jsxs("div",{children:[e.label&&n.jsx("div",{className:`mt-4 mb-1 text-xs font-semibold uppercase tracking-wide ${r?"text-gray-400":"text-gray-500"}`,children:e.label}),n.jsx(xo,{code:e.code,darkMode:r}),e.expected&&n.jsxs("div",{className:`mt-1 p-3 rounded-b-lg font-mono text-xs border-l-4 border-emerald-500 ${r?"bg-gray-900 text-emerald-400":"bg-emerald-50 text-emerald-800"}`,children:[n.jsx("div",{className:`text-xs font-sans mb-1 ${r?"opacity-50":"opacity-60"}`,children:"▶ Expected Output:"}),n.jsx("pre",{className:"whitespace-pre-wrap",children:e.expected})]})]},t);case"tip":return n.jsxs("div",{className:`mt-4 p-4 rounded-lg border-l-4 border-green-500 text-sm ${r?"bg-green-900/20 text-green-300":"bg-green-50 text-green-800"}`,children:["💡 ",n.jsx("strong",{children:"Tip: "}),e.content]},t);case"info":return n.jsxs("div",{className:`mt-4 p-4 rounded-lg border-l-4 border-blue-500 text-sm ${r?"bg-blue-900/20 text-blue-300":"bg-blue-50 text-blue-800"}`,children:["ℹ️ ",e.content]},t);case"warning":return n.jsxs("div",{className:`mt-4 p-4 rounded-lg border-l-4 border-yellow-500 text-sm ${r?"bg-yellow-900/20 text-yellow-300":"bg-yellow-50 text-yellow-800"}`,children:["⚠️ ",n.jsx("strong",{children:"Warning: "}),e.content]},t);case"divider":return n.jsx("hr",{className:`my-8 ${r?"border-gray-700":"border-gray-200"}`},t);case"list":return n.jsxs("div",{className:"mt-4",children:[e.title&&n.jsx("p",{className:`text-sm font-semibold mb-2 ${r?"text-gray-200":"text-gray-700"}`,children:e.title}),n.jsx("ul",{className:"space-y-2",children:e.items.map((l,c)=>n.jsxs("li",{className:`flex items-start gap-2 text-sm ${r?"text-gray-300":"text-gray-600"}`,children:[n.jsx("span",{className:`mt-0.5 flex-shrink-0 ${o}`,children:e.icon||"▸"}),typeof l=="string"?l:n.jsxs("span",{children:[n.jsx("strong",{className:r?"text-white":"text-gray-800",children:l.label}),l.desc&&n.jsxs("span",{className:r?"text-gray-400":"text-gray-500",children:[" — ",l.desc]})]})]},c))})]},t);case"steps":return n.jsx("div",{className:"mt-4 space-y-2",children:e.items.map((l,c)=>n.jsxs("div",{className:`flex items-start gap-3 p-3 rounded-lg text-sm ${r?"bg-gray-700 text-gray-300":"bg-gray-50 text-gray-700"}`,children:[n.jsx("span",{className:`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${r?"bg-indigo-800 text-indigo-300":"bg-indigo-100 text-indigo-700"}`,children:c+1}),n.jsx("span",{className:"leading-relaxed",children:typeof l=="string"?l:n.jsxs("span",{children:[n.jsx("strong",{children:l.label}),l.desc&&`: ${l.desc}`]})})]},c))},t);case"grid":return n.jsx("div",{className:`mt-4 grid grid-cols-1 md:grid-cols-${e.cols||2} gap-3`,children:e.items.map((l,c)=>n.jsxs("div",{className:`p-4 rounded-xl border text-sm ${r?"bg-gray-750 border-gray-600":"bg-gray-50 border-gray-200"}`,children:[l.icon&&n.jsx("div",{className:"text-2xl mb-2",children:l.icon}),n.jsx("div",{className:`font-bold mb-1 ${r?"text-white":"text-gray-800"}`,children:l.label}),l.desc&&n.jsx("div",{className:r?"text-gray-400":"text-gray-500",children:l.desc})]},c))},t);case"table":return n.jsx("div",{className:"mt-4 overflow-x-auto",children:n.jsxs("table",{className:"w-full text-sm border-collapse rounded-xl overflow-hidden",children:[n.jsx("thead",{children:n.jsx("tr",{className:r?"bg-gray-700 text-gray-200":"bg-gray-100 text-gray-700",children:e.headers.map((l,c)=>n.jsx("th",{className:`p-3 text-left font-semibold border-b ${r?"border-gray-600":"border-gray-300"}`,children:l},c))})}),n.jsx("tbody",{children:e.rows.map((l,c)=>n.jsx("tr",{className:`border-b ${r?"border-gray-700 hover:bg-gray-700":"border-gray-200 hover:bg-gray-50"}`,children:l.map((d,h)=>n.jsx("td",{className:`p-3 ${r?"text-gray-300":"text-gray-600"}`,children:d},h))},c))})]})},t);case"qa":return n.jsx(Tg,{question:e.question,answer:e.answer,code:e.code,darkMode:r},t);case"exercise":return n.jsx(Sg,{block:e,darkMode:r},t);default:return null}}function Tg({question:e,answer:t,code:r,darkMode:s}){const[a,i]=v.useState(!1);return n.jsxs("div",{className:`rounded-xl border overflow-hidden mb-3 ${s?"border-gray-600":"border-gray-200"}`,children:[n.jsxs("button",{onClick:()=>i(!a),className:`w-full flex justify-between items-start text-left p-4 font-semibold text-sm transition-colors ${s?"bg-gray-750 text-white hover:bg-gray-700":"bg-gray-50 text-gray-800 hover:bg-gray-100"}`,children:[n.jsx("span",{className:"flex-1 pr-4",children:e}),n.jsx("span",{className:`text-2xl font-light transition-transform duration-300 flex-shrink-0 ${a?"rotate-45":""}`,children:"+"})]}),a&&n.jsxs("div",{className:`p-4 border-t text-sm ${s?"bg-gray-800 border-gray-700 text-gray-300":"bg-white border-gray-100 text-gray-600"}`,children:[n.jsx("p",{className:"leading-relaxed whitespace-pre-line",children:t}),r&&n.jsx(xo,{code:r,darkMode:s})]})]})}function Ws({data:e,gradient:t,bgLight:r}){var x,f,w;const{language:s}=We(),[a,i]=v.useState(()=>{const y=localStorage.getItem("darkMode");return y!==null?JSON.parse(y):!0}),[o,l]=v.useState(0);v.useEffect(()=>{localStorage.setItem("darkMode",JSON.stringify(a)),window.scrollTo(0,0)},[a]),v.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[o]);const c=e[s]||e.en,{hero:d,tabs:h,sections:m}=c;return n.jsxs("div",{className:`min-h-screen transition-colors duration-300 ${a?"dark-mode bg-gray-900":r}`,children:[n.jsx(wg,{darkMode:a,setDarkMode:i}),n.jsxs("main",{className:"container mx-auto px-4 md:px-6 py-8 max-w-5xl",children:[n.jsxs("div",{className:`rounded-2xl p-8 mb-6 bg-gradient-to-r ${t} text-white shadow-xl`,children:[n.jsx("h1",{className:"text-4xl font-bold mb-2",children:d.title}),n.jsx("p",{className:"text-xl opacity-90",children:d.subtitle}),n.jsx("p",{className:"mt-3 opacity-80 max-w-3xl text-sm leading-relaxed",children:d.intro})]}),n.jsx("div",{className:`sticky top-0 z-30 rounded-xl mb-6 p-1.5 shadow-md ${a?"bg-gray-800":"bg-white border border-gray-200"}`,children:n.jsx("div",{className:"flex overflow-x-auto gap-1 pb-0.5",children:h.map((y,b)=>n.jsx("button",{onClick:()=>l(b),className:`flex-shrink-0 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${o===b?`bg-gradient-to-r ${t} text-white shadow-md scale-105`:a?"text-gray-400 hover:text-white hover:bg-gray-700":"text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`,children:y},b))})}),n.jsxs("div",{className:`rounded-2xl p-6 md:p-8 shadow-md ${a?"bg-gray-800":"bg-white"}`,children:[n.jsx("h2",{className:`text-2xl font-bold mb-6 ${a?"text-white":"text-gray-800"}`,children:(x=m[o])==null?void 0:x.title}),(w=(f=m[o])==null?void 0:f.blocks)==null?void 0:w.map((y,b)=>Eg(y,b,a))]}),n.jsxs("div",{className:"flex justify-between mt-6 gap-4",children:[o>0&&n.jsxs("button",{onClick:()=>l(o-1),className:`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${a?"bg-gray-800 text-gray-300 hover:bg-gray-700":"bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`,children:["← ",h[o-1]]}),o<h.length-1&&n.jsxs("button",{onClick:()=>l(o+1),className:`ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r ${t} text-white hover:shadow-lg`,children:[h[o+1]," →"]})]})]})]})}const Ng={en:{hero:{title:"⚡ Apache JMeter",subtitle:"Performance & Load Testing Tool",intro:"Learn how to measure, analyse, and improve the performance of your web applications and APIs from scratch — no prior knowledge required."},tabs:["🎯 Introduction","📦 Installation","📚 Intermediate","🚀 Advanced","💼 Interview Q&A"],sections:[{title:"🎯 What is JMeter and Performance Testing?",blocks:[{type:"text",content:"Imagine your website works perfectly when only 5 people are using it. But what happens when 10,000 users visit at the same time — say during a flash sale? Does it crash? Slow down? This is exactly what performance testing answers."},{type:"text",content:"Performance testing is the process of evaluating a system's speed, stability, and scalability under different load conditions. It is NOT about finding bugs in functionality — it's about finding how the system BEHAVES under load."},{type:"heading",text:"Types of Performance Tests"},{type:"grid",cols:3,items:[{icon:"📈",label:"Load Testing",desc:'Simulate expected number of users. "Can we handle 1,000 users?" — the most common type.'},{icon:"💥",label:"Stress Testing",desc:"Push beyond limits until the system breaks. Find the breaking point."},{icon:"⚡",label:"Spike Testing",desc:'Sudden huge jump in users. "What if 5,000 users arrive in 10 seconds?"'},{icon:"📦",label:"Volume Testing",desc:'Test with large amounts of data. "What happens with 10 million DB records?"'},{icon:"⏳",label:"Endurance Testing",desc:"Run at moderate load for hours/days. Find memory leaks and slow degradation."},{icon:"📊",label:"Scalability Testing",desc:'Does the system scale horizontally? "Adding 2 servers — does throughput double?"'}]},{type:"heading",text:"What is Apache JMeter?"},{type:"text",content:"Apache JMeter is a free, open-source Java application specifically designed to load test and measure performance. Originally created in 1998 by Stefano Mazzocchi for web server testing, it has grown into the world's most widely used open-source performance testing tool."},{type:"list",icon:"✅",title:"JMeter Key Features:",items:["100% free and open-source (Apache License 2.0)","Supports HTTP/S, REST, SOAP, FTP, JDBC, LDAP, SMTP, JMS and more","Powerful GUI for test creation, Non-GUI for execution","Distributed testing: one controller, multiple load generators","Extensible via 600+ plugins","Generates beautiful HTML reports automatically","Runs on any OS (Windows, macOS, Linux) with Java"]},{type:"heading",text:"JMeter vs Other Tools"},{type:"table",headers:["Tool","Language","GUI","Free","Best For"],rows:[["JMeter","Java","✅ Yes","✅ Yes","Enterprise, many protocols"],["Locust","Python","❌ Web UI","✅ Yes","Python teams, real user code"],["k6","JavaScript","❌ CLI","✅ Yes","Developer-friendly, CI/CD"],["Gatling","Scala/JS","❌ CLI","✅ Yes","High-performance, code-first"],["LoadRunner","Various","✅ Yes","❌ Paid","Enterprise, strict compliance"]]},{type:"tip",content:"JMeter is the safest choice for beginners and teams without a programming background. Its GUI makes test creation visual and intuitive."},{type:"heading",text:"Real-World Use Cases"},{type:"list",icon:"🔹",items:["E-commerce: Test checkout flow under Black Friday traffic","Banking: Ensure login and transfer APIs handle peak morning load","Healthcare: Validate patient portal stays responsive at shift change","Gaming: Stress-test game servers before launch","Microservices: Identify which service is the bottleneck"]}]},{title:"📦 Installation & First Launch",blocks:[{type:"text",content:'JMeter is a Java application, so Java must be installed first. The installation is simple: download, extract, run. No "install wizard" required.'},{type:"heading",text:"Step 1: Install Java (JDK 8+)"},{type:"text",content:"JMeter 5.x requires Java 8 or higher. Java 11 or 17 LTS is recommended."},{type:"code",code:`# Check if Java is installed (run in terminal / command prompt)
java -version

# Expected output:
openjdk version "17.0.9" 2023-10-17
OpenJDK Runtime Environment (build 17.0.9+9)

# If not installed, download from:
# https://adoptium.net  (free, open-source OpenJDK)
# or https://www.oracle.com/java/technologies/downloads/`},{type:"heading",text:"Step 2: Download JMeter"},{type:"steps",items:["Go to https://jmeter.apache.org/download_jmeter.cgi",'Under "Binaries", download apache-jmeter-X.X.zip (Windows) or apache-jmeter-X.X.tgz (macOS/Linux)',"Extract to a location like C:\\JMeter\\ or ~/Applications/jmeter/","No installation needed — it's ready to run!"]},{type:"heading",text:"Step 3: Launch JMeter GUI"},{type:"code",code:`# Windows (double-click or run in cmd):
C:\\JMeter\\apache-jmeter-5.6\\bin\\jmeter.bat

# macOS / Linux:
cd ~/Applications/jmeter/apache-jmeter-5.6/bin
./jmeter.sh

# Or just double-click jmeter.bat (Windows) / jmeter (Mac/Linux)`},{type:"info",content:"The first launch may take 10-20 seconds. JMeter opens with an empty Test Plan. The GUI is for building tests only — never run large tests in GUI mode (use CLI instead)."},{type:"heading",text:"JMeter GUI Overview"},{type:"list",icon:"📌",title:"Key areas of the JMeter interface:",items:[{label:"Test Plan (tree on left)",desc:"Hierarchical view of your test components"},{label:"Properties panel (right)",desc:"Configure the selected element"},{label:"Run button (green ▶)",desc:"Start the test"},{label:"Status bar (bottom)",desc:"Active threads, elapsed time, error %"},{label:"Log panel (bottom)",desc:"JMeter logs and errors"}]},{type:"heading",text:"Set JAVA_HOME (if needed)"},{type:"code",code:`# Windows (set in System Environment Variables):
JAVA_HOME = C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.9.9-hotspot

# macOS / Linux (add to ~/.bash_profile or ~/.zshrc):
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH

# Verify:
echo $JAVA_HOME`},{type:"tip",content:"Create a shortcut on your desktop to jmeter.bat/jmeter.sh for quick access. You'll be opening JMeter often!"}]},{title:"📚 Core Concepts & Building Your First Test",blocks:[{type:"text",content:"JMeter tests are organized in a hierarchy. Understanding this hierarchy is the foundation of everything else."},{type:"heading",text:"Test Plan Hierarchy"},{type:"code",code:`Test Plan
└── Thread Group              ← simulates virtual users
    ├── HTTP Request Sampler  ← what to test
    ├── HTTP Header Manager   ← set headers (e.g. auth)
    ├── CSV Data Set Config   ← load test data from file
    ├── Regular Expr. Extractor ← extract dynamic values
    ├── Response Assertion    ← verify responses
    └── Listeners             ← collect & display results
        ├── View Results Tree
        └── Aggregate Report`},{type:"heading",text:"1. Thread Group — Virtual Users"},{type:"text",content:"A Thread Group defines how many virtual users (threads) run, how fast they start, and how many times they repeat. It is the heart of every JMeter test."},{type:"list",icon:"🔸",title:"Thread Group parameters:",items:[{label:"Number of Threads",desc:"Total virtual users. Start with 10-50 while building the test."},{label:"Ramp-Up Period (sec)",desc:"How many seconds to start all users. 10 users, 10 sec ramp-up = 1 user/second."},{label:"Loop Count",desc:"How many times each user repeats the requests. Use -1 for infinite (with duration)."},{label:"Duration (sec)",desc:"Total test run time. Better than Loop Count for sustained tests."}]},{type:"tip",content:"For a 10-minute test with 100 users ramping up over 60 seconds: Number of Threads=100, Ramp-Up=60, Duration=600."},{type:"heading",text:"2. HTTP Request Sampler"},{type:"text",content:"The HTTP Request Sampler is what sends the actual HTTP request. Add it with: Right-click Thread Group → Add → Sampler → HTTP Request"},{type:"list",icon:"📋",title:"Key fields to configure:",items:[{label:"Protocol",desc:"http or https"},{label:"Server Name",desc:"e.g. api.example.com (no http://)"},{label:"Port",desc:"80 (http), 443 (https), or your custom port"},{label:"Method",desc:"GET, POST, PUT, DELETE, PATCH"},{label:"Path",desc:"e.g. /api/users or /login"},{label:"Body Data",desc:"JSON body for POST/PUT requests"}]},{type:"code",code:`# Example: Testing a REST API POST request
# In HTTP Request Sampler:
#   Method: POST
#   Path:   /api/v1/login
#   Body Data (JSON):

{
  "username": "testuser",
  "password": "Password123"
}

# Add HTTP Header Manager with:
#   Content-Type: application/json
#   Accept: application/json`},{type:"heading",text:"3. CSV Data Set Config — Parameterization"},{type:"text",content:"Real tests don't use the same username 100 times. CSV Data Set Config lets you read test data from a CSV file and use different values for each virtual user."},{type:"code",code:`# 1. Create a file: testdata/users.csv
username,password
alice,pass1
bob,pass2
charlie,pass3
diana,pass4

# 2. Add CSV Data Set Config (Right-click Thread Group → Config Element)
#    Filename: testdata/users.csv
#    Variable Names: username,password
#    Sharing Mode: All threads

# 3. Use variables in HTTP Request Body:
{
  "username": "\${username}",
  "password": "\${password}"
}`},{type:"heading",text:"4. Regular Expression Extractor — Correlation"},{type:"text",content:"Many applications use dynamic values like CSRF tokens, session IDs, or auth tokens that change every request. You must extract these values and reuse them — this is called correlation."},{type:"code",code:`# Scenario: Login returns an auth token, use it in the next request

# Step 1: Add Regular Expression Extractor to the Login request
#   Reference Name:    authToken
#   Regular Expression: "token":"([^"]+)"
#   Template:          $1$
#   Match No.:         1

# Step 2: Use the extracted token in the next request's header
#   HTTP Header Manager → Authorization: Bearer \${authToken}

# Alternative: Use JSON Extractor for JSON responses
#   JSON Path Expression: $.data.token
#   Reference Name: authToken`},{type:"heading",text:"5. Assertions — Validating Responses"},{type:"text",content:"Without assertions, JMeter marks every response as a success — even if the server returns an error page. Assertions validate that the response is correct."},{type:"code",code:`# Response Assertion (most common):
#   Field to test: Response Code
#   Pattern:       200
#   → Fails if status code is not 200

#   Field to test: Response Body
#   Contains:      "success":true
#   → Fails if body doesn't contain this string

# Duration Assertion:
#   Duration in ms: 2000
#   → Fails if response takes more than 2 seconds

# JSON Assertion:
#   JSON Path:     $.status
#   Expected:      "ok"
#   → Validates specific JSON fields`},{type:"heading",text:"6. Listeners — Viewing Results"},{type:"list",icon:"📊",title:"Most useful listeners:",items:[{label:"View Results Tree",desc:"See every request/response. Great for debugging. Disable in load tests (heavy memory use)."},{label:"Aggregate Report",desc:"Summary table: Avg, Min, Max, 90th/95th/99th percentile, Error%, Throughput."},{label:"Summary Report",desc:"Lightweight version of Aggregate Report. Good for large tests."},{label:"Response Time Graph",desc:"Visual graph of response times over test duration."},{label:"Active Threads Over Time",desc:"Shows user ramp-up/ramp-down visually."}]},{type:"warning",content:"Remove or disable all listeners before running large load tests. Listeners write every result to disk and memory, which can skew results and slow down JMeter itself."},{type:"heading",text:"Running Your First Test — Step by Step"},{type:"steps",items:["Create a new Test Plan: File → New","Add Thread Group: Right-click Test Plan → Add → Threads → Thread Group. Set: 10 users, 10 sec ramp-up, 1 loop","Add HTTP Request: Right-click Thread Group → Add → Sampler → HTTP Request. Set: GET https://jsonplaceholder.typicode.com/posts","Add Response Assertion: Right-click HTTP Request → Add → Assertions → Response Assertion. Set: Response Code = 200","Add View Results Tree: Right-click Thread Group → Add → Listener → View Results Tree","Save the test: Ctrl+S (saves as .jmx file)","Run: Ctrl+R or green ▶ button","Check results in View Results Tree (green = pass, red = fail)"]}]},{title:"🚀 Advanced JMeter",blocks:[{type:"heading",text:"Non-GUI Mode (CLI) — For Real Tests"},{type:"text",content:"Never run load tests in the JMeter GUI. The GUI consumes extra CPU and memory, which affects test results. For any real performance test, use the command line (Non-GUI mode)."},{type:"code",code:`# Basic non-GUI execution:
jmeter -n -t my_test.jmx -l results.jtl

# Full command with HTML report generation:
jmeter -n -t my_test.jmx -l results.jtl -e -o ./report

# Parameters explained:
#  -n           Non-GUI mode
#  -t           Path to test plan (.jmx file)
#  -l           Path to results file (.jtl or .csv)
#  -e           Generate HTML report after test
#  -o           Output folder for HTML report (must be empty!)
#  -Jproperty   Override a JMeter property
#  -Gfile       Specify global properties file

# Override properties from command line:
jmeter -n -t test.jmx -l res.jtl \\
       -Jusers=500 \\
       -Jrampup=60 \\
       -Jduration=300`},{type:"info",content:"The -e -o flags generate a beautiful interactive HTML dashboard report in the specified folder. Open ./report/index.html in your browser after the test."},{type:"heading",text:"Parameterize Tests with User-Defined Variables"},{type:"code",code:`# In Test Plan → User Defined Variables:
#   BASE_URL = https://api.example.com
#   USERS    = 100
#   RAMPUP   = 60
#   DURATION = 300

# Use in Thread Group:
#   Number of Threads: \${USERS}
#   Ramp-Up:           \${RAMPUP}
#   Duration:          \${DURATION}

# Use in HTTP Request:
#   Server: \${BASE_URL}  (JMeter strips the protocol automatically)

# Override from CLI:
jmeter -n -t test.jmx -l res.jtl \\
       -JBASE_URL=https://staging.example.com \\
       -JUSERS=200`},{type:"heading",text:"JSR223 Sampler — Groovy Scripting"},{type:"text",content:"For complex logic (custom authentication, dynamic data generation, conditional flows), use the JSR223 Sampler with Groovy. It's compiled and cached, making it much faster than BeanShell."},{type:"code",code:`// JSR223 Sampler — Generate a random UUID and timestamp
import java.util.UUID

def uuid = UUID.randomUUID().toString()
def timestamp = System.currentTimeMillis()
def randomInt = (int)(Math.random() * 1000) + 1

// Store as JMeter variables for use in subsequent requests
vars.put("requestId", uuid)
vars.put("timestamp", String.valueOf(timestamp))
vars.put("randomUserId", String.valueOf(randomInt))

log.info("Generated requestId: " + uuid)

// Example: Generate HMAC-SHA256 signature
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.util.Base64

def secret = "my-secret-key"
def message = timestamp + ":" + uuid
Mac mac = Mac.getInstance("HmacSHA256")
mac.init(new SecretKeySpec(secret.getBytes(), "HmacSHA256"))
def signature = Base64.getEncoder().encodeToString(mac.doFinal(message.getBytes()))
vars.put("signature", signature)`},{type:"heading",text:"JMeter Built-in Functions"},{type:"code",code:`# JMeter has 50+ built-in functions — use them in any field with \${__functionName()}

\${__Random(1,1000)}          # Random number between 1 and 1000
\${__time(yyyy-MM-dd)}        # Current date formatted
\${__time()}                  # Current epoch milliseconds
\${__UUID()}                  # Random UUID
\${__threadNum}               # Current thread number (1, 2, 3...)
\${__CSVRead(file.csv,0)}     # Read column 0 from CSV
\${__base64Encode(text)}      # Base64 encode a string
\${__urlencode(text)}         # URL-encode a string
\${__P(property,default)}     # Read a JMeter property
\${__env(VAR_NAME)}           # Read an environment variable

# Example: Unique username per thread
{
  "username": "user_\${__threadNum}_\${__Random(100,999)}",
  "email": "test_\${__time()}\${__Random(1,99)}@example.com"
}`},{type:"heading",text:"Distributed Load Testing"},{type:"text",content:"A single machine can only generate so much load. For high concurrency (1000+ users), use JMeter's distributed mode: one controller machine, multiple worker (injector) machines."},{type:"code",code:`# ── Controller Machine Setup ──────────────────────────────
# File: jmeter.properties (in JMeter /bin/ directory)
remote_hosts=192.168.1.101,192.168.1.102,192.168.1.103
server.rmi.ssl.disable=true  # (for internal network only)

# ── Worker Machine Setup (run on each worker) ──────────────
# Start the JMeter server (worker mode):
jmeter-server.bat           # Windows
./jmeter-server             # macOS/Linux

# ── Run distributed test from Controller ───────────────────
# CLI: run on ALL remote hosts:
jmeter -n -t test.jmx -r -l results.jtl -e -o report/

# CLI: run on SPECIFIC hosts:
jmeter -n -t test.jmx -R 192.168.1.101,192.168.1.102 -l results.jtl

# GUI: Run → Start Remote All (Ctrl+Shift+R)`},{type:"info",content:"In distributed mode, the Thread Group user count is multiplied by the number of workers. 100 users on 5 workers = 500 total virtual users."},{type:"heading",text:"CI/CD Integration — GitHub Actions"},{type:"code",code:`# .github/workflows/performance-test.yml
name: Performance Test

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'  # Every Monday at 6am

jobs:
  jmeter:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Java
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Download JMeter
        run: |
          wget https://downloads.apache.org/jmeter/binaries/apache-jmeter-5.6.3.tgz
          tar -xzf apache-jmeter-5.6.3.tgz

      - name: Run Performance Test
        run: |
          apache-jmeter-5.6.3/bin/jmeter \\
            -n -t tests/performance/load_test.jmx \\
            -l results/results.jtl \\
            -e -o results/html-report \\
            -JBASE_URL=\${{ secrets.STAGING_URL }} \\
            -JUSERS=100 \\
            -JDURATION=300

      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: jmeter-report
          path: results/html-report/

      - name: Check Error Rate
        run: |
          ERROR_RATE=$(grep -o '"fail":[0-9]*' results/results.jtl | tail -1 | grep -o '[0-9]*')
          if [ "$ERROR_RATE" -gt "1" ]; then
            echo "Error rate too high: $ERROR_RATE%"
            exit 1
          fi`},{type:"heading",text:"Understanding HTML Report Metrics"},{type:"table",headers:["Metric","Good Value","Meaning"],rows:[["Average Response Time","< 2000ms","Mean time across all requests"],["90th Percentile (P90)","< 3000ms","90% of requests faster than this"],["99th Percentile (P99)","< 5000ms","Worst-case for most users"],["Error Rate","< 1%","Percentage of failed requests"],["Throughput","Depends on target","Requests per second the system handles"],["Apdex Score","> 0.7 (good)","0-1 scale: user satisfaction based on response times"]]},{type:"heading",text:"Performance Tuning JMeter Itself"},{type:"code",code:`# jmeter.bat / jmeter.sh — increase heap memory for large tests:
# Default is 1GB. For 500+ users, increase to 4-8GB.

# Windows (jmeter.bat):
set HEAP=-Xms4g -Xmx4g -XX:MaxMetaspaceSize=512m

# macOS/Linux (jmeter.sh):
HEAP="-Xms4g -Xmx4g -XX:MaxMetaspaceSize=512m"

# jmeter.properties optimizations:
jmeter.save.saveservice.output_format=csv    # CSV faster than XML
jmeter.save.saveservice.response_data=false  # Don't save response data
jmeter.save.saveservice.samplerData=false    # Save only what you need
jmeter.save.saveservice.requestHeaders=false
summariser.interval=30                        # Log summary every 30 sec`}]},{title:"💼 JMeter Interview Questions & Answers",blocks:[{type:"text",content:"These are the most frequently asked JMeter interview questions. Click each question to see the detailed answer."},{type:"qa",question:"Q1: What is JMeter? What is it used for? What protocols does it support?",answer:`Apache JMeter is an open-source Java-based performance testing tool. It is used to load test functional behavior and measure performance of web applications, APIs, and services.

Primary use cases:
• Load testing: Simulate multiple concurrent users
• Performance testing: Measure response times and throughput
• Stress testing: Find the breaking point
• API testing: Test REST and SOAP services

Supported protocols: HTTP/HTTPS, FTP, JDBC (database), LDAP, SMTP, TCP, JMS, WebSocket (via plugin)`},{type:"qa",question:"Q2: What is the difference between Load Testing, Stress Testing, and Spike Testing?",answer:`Load Testing: Tests the system under expected (normal and peak) load conditions. Goal: Verify performance meets SLAs (e.g., response time < 2s for 1000 users).

Stress Testing: Deliberately pushes the system beyond its capacity limits until it fails. Goal: Find the breaking point and understand failure behavior.

Spike Testing: Suddenly applies a very large load for a short time, then removes it. Goal: Verify the system can handle sudden traffic surges (e.g., news goes viral, flash sale starts).`},{type:"qa",question:"Q3: Explain the Thread Group parameters: Number of Threads, Ramp-Up Period, and Loop Count.",answer:`Number of Threads: Total number of virtual users (concurrent users) that JMeter will simulate. Each thread runs independently and simulates one real user.

Ramp-Up Period: The time (in seconds) JMeter takes to start all threads. Example: 100 threads with 50-second ramp-up starts 2 users/second. This prevents a "thundering herd" that would overwhelm the server immediately.

Loop Count: How many times each thread executes the test scenario. Set to -1 for infinite (use with a Duration setting instead).`},{type:"qa",question:"Q4: What is Correlation in JMeter? How do you implement it?",answer:`Correlation is the process of extracting dynamic values from server responses and using them in subsequent requests. Without correlation, tests fail because dynamic values (CSRF tokens, session IDs, auth tokens) change per session.

Example: Login returns {"token": "abc123xyz"}. The next API call needs this token in the Authorization header.

Implementation:
1. Add Regular Expression Extractor or JSON Extractor to the Login request
2. Set Reference Name: authToken
3. Set JSON Path: $.token
4. Use \${authToken} in subsequent request headers`,code:`# JSON Extractor configuration:
Reference Name: authToken
JSON Path:      $.data.token
Match No.:      1
Default:        EXTRACTION_FAILED

# Use in HTTP Header Manager:
Authorization: Bearer \${authToken}`},{type:"qa",question:"Q5: Why should you use Non-GUI mode for load tests? How do you run it?",answer:`The GUI consumes significant CPU and memory resources, which:
• Reduces the load JMeter can generate
• Skews performance metrics (JMeter machine becomes the bottleneck)
• Makes results unreliable

For any test with 50+ users, use Non-GUI (CLI) mode.`,code:`# Basic run:
jmeter -n -t test.jmx -l results.jtl

# With HTML report:
jmeter -n -t test.jmx -l results.jtl -e -o ./html-report

# Override properties:
jmeter -n -t test.jmx -l results.jtl -Jusers=500 -Jduration=300`},{type:"qa",question:"Q6: What are Timers in JMeter? Why are they important?",answer:`Timers introduce a delay (think time / pacing) between requests within a thread. They simulate real user behavior — real users don't fire requests as fast as possible.

Without timers, JMeter generates unrealistic load and can saturate the server with requests that a real user would never generate.

Common timers:
• Constant Timer: Fixed delay (e.g., 1000ms between requests)
• Gaussian Random Timer: Variable delay around an average (more realistic)
• Uniform Random Timer: Random delay within a range
• Throughput Shaping Timer (plugin): Control exact requests/second`,code:`# Gaussian Random Timer settings for realistic think time:
# Constant Delay Offset: 1000ms
# Deviation: 500ms
# → Actual delay: 1000 ± 500ms (500ms to 1500ms, normally distributed)`},{type:"qa",question:"Q7: What are the most important metrics in a JMeter report? What values are acceptable?",answer:`Key metrics and acceptable thresholds:

• Average Response Time: Mean response time. Target < 2000ms for web apps.
• 90th Percentile (P90): 90% of users get this response time or faster. Target < 3000ms.
• 99th Percentile (P99): Worst case for 99% of users. Target < 5000ms.
• Error Rate %: Percentage of failed requests. Target < 1% for healthy systems.
• Throughput: Requests per second the system processes. Higher = better.
• Apdex Score: User satisfaction score (0-1). Satisfied > 0.85, Tolerating 0.5-0.85, Frustrated < 0.5.`},{type:"qa",question:"Q8: How do you handle authentication in JMeter? (Basic Auth, OAuth2, Session-based)",answer:`Basic Authentication:
• Use HTTP Authorization Manager (Add → Config Element → HTTP Authorization Manager)
• Set Base URL, username, password, domain

OAuth2 / Bearer Token:
• First request: Login API → extract token with JSON Extractor
• Subsequent requests: HTTP Header Manager with "Authorization: Bearer \${token}"

Cookie/Session-based:
• Add HTTP Cookie Manager (Config Element)
• JMeter automatically handles Set-Cookie headers and sends them back`,code:`# HTTP Header Manager for Bearer Token:
Authorization: Bearer \${authToken}
Content-Type:  application/json

# Or for Basic Auth inline:
Authorization: Basic \${__base64Encode(username:password)}`},{type:"qa",question:"Q9: What is the difference between Throughput and Response Time?",answer:`Throughput: The number of requests the system processes per unit time (requests/second or transactions/second - TPS). It measures the server's capacity.

Response Time: The time it takes for a single request to complete (from send to receive). It measures the user's experience.

The relationship: As you increase users, throughput increases until the server saturates. After saturation, throughput plateaus but response times increase significantly. The "knee" of this curve is your system's optimal operating point.`},{type:"qa",question:"Q10: How do you integrate JMeter with Jenkins/CI CD pipelines?",answer:`Option 1: Jenkins JMeter Plugin
• Install the "Performance Plugin" in Jenkins
• Add a "Publish Performance Test Result Report" post-build action
• Point to the .jtl results file
• Set thresholds: fail build if error rate > X% or avg response > Yms

Option 2: Shell/Bat step
• Use a "Execute Shell" build step
• Run JMeter CLI and check exit code
• Parse the .jtl file for error rates

Option 3: GitHub Actions
• Use actions/setup-java, download JMeter, run CLI, upload HTML report as artifact`,code:`# Jenkins Pipeline:
stage('Performance Test') {
    steps {
        sh '''
            jmeter -n -t tests/load.jmx \\
                   -l results.jtl \\
                   -e -o html-report
        '''
    }
    post {
        always {
            perfReport 'results.jtl'
            publishHTML([reportDir: 'html-report', reportFiles: 'index.html'])
        }
    }
}`},{type:"qa",question:"Q11: How do you record a JMeter test from browser actions?",answer:`Method 1: JMeter's HTTP(S) Test Script Recorder
1. Add Recording Controller to Thread Group
2. Add HTTP(S) Test Script Recorder to WorkBench
3. Set port to 8888
4. Configure browser proxy to localhost:8888
5. Start recording → browse → stop → clean up recorded steps

Method 2: BlazeMeter Chrome Extension
• Free Chrome extension that records and exports as .jmx
• Much easier than manual proxy recording

Method 3: Convert Postman collection to JMX
• Record in Postman → export → convert with postman2jmx tool`},{type:"qa",question:"Q12: What is a Sampler? Name and describe at least 5 types.",answer:`A Sampler is the component that actually sends a request and collects the response. It is the core "worker" of a test.

Types:
• HTTP Request: Send HTTP/HTTPS requests (most common)
• JDBC Request: Execute SQL queries against a database
• FTP Request: Upload/download files via FTP
• SMTP Sampler: Send emails and test mail servers
• TCP Sampler: Raw TCP socket communication
• JSR223 Sampler: Execute custom Groovy/Python/JS code
• Debug Sampler: Show JMeter variables in results (for debugging)`},{type:"qa",question:"Q13: What is Parameterization? Name different methods.",answer:`Parameterization is using different data values across test iterations instead of hardcoded values.

Methods:
1. CSV Data Set Config: Read data from CSV files. Best for large datasets.
2. User Defined Variables: Define test-level variables, override from CLI with -J.
3. Random functions: \${__Random(1,1000)} for random numbers.
4. Counter Config: Incrementing counter for sequential IDs.
5. JSR223 / BeanShell: Programmatic data generation.`},{type:"qa",question:"Q14: What is Distributed Testing? When do you need it?",answer:`Distributed testing uses multiple machines to generate load in coordination. One Controller machine manages multiple Worker (Injector) machines.

When to use:
• A single machine cannot generate enough load (e.g., need 5000+ users)
• More realistic geographic distribution of users
• CPU/network limitations on test machine

Rule of thumb: A decent server can handle ~300-500 HTTP threads on a single machine. For more, add workers.

Setup: Start jmeter-server on each worker, add their IPs to remote_hosts in jmeter.properties, run with -r flag.`},{type:"qa",question:"Q15: What is the Aggregate Report? What does each column mean?",answer:`# Samples: Total number of requests sent
Average: Mean response time (ms)
Min: Fastest request
Max: Slowest request
90% Line: 90th percentile — 90% of requests were faster than this
95% Line: 95th percentile
99% Line: 99th percentile (catches most outliers)
Error %: Percentage of failed requests
Throughput: Requests per second
Received KB/sec: Network bandwidth received
Sent KB/sec: Network bandwidth sent

Focus on P90, P99, and Error% — these give the most meaningful picture of user experience.`}]}]},tr:{hero:{title:"⚡ Apache JMeter",subtitle:"Performans ve Yük Testi Aracı",intro:"Sıfırdan başlayarak web uygulamalarınızın ve API'lerinizin performansını nasıl ölçeceğinizi, analiz edeceğinizi ve iyileştireceğinizi öğrenin — ön bilgi gerekmez."},tabs:["🎯 Giriş","📦 Kurulum","📚 Orta Seviye","🚀 İleri Seviye","💼 Mülakat Soruları"],sections:[{title:"🎯 JMeter ve Performans Testi Nedir?",blocks:[{type:"text",content:"Web siteniz sadece 5 kişi kullanırken mükemmel çalışıyor. Peki aynı anda 10.000 kişi ziyaret ettiğinde ne olur — mesela indirim kampanyası sırasında? Çöküyor mu? Yavaşlıyor mu? Performans testi tam olarak buna cevap verir."},{type:"text",content:"Performans testi, bir sistemin farklı yük koşulları altında hız, kararlılık ve ölçeklenebilirlik açısından değerlendirilmesi sürecidir. Fonksiyonel hata bulmakla değil, sistemin yük altındaki DAVRANIŞIYLA ilgilenir."},{type:"heading",text:"Performans Testi Türleri"},{type:"grid",cols:3,items:[{icon:"📈",label:"Yük Testi (Load)",desc:'Beklenen kullanıcı sayısını simüle eder. "1000 kullanıcıyı kaldırabilir miyiz?" — en yaygın tür.'},{icon:"💥",label:"Stres Testi",desc:"Sistem çöküne kadar limitin ötesine iter. Kırılma noktasını bulur."},{icon:"⚡",label:"Spike Testi",desc:'Ani kullanıcı artışı. "10 saniyede 5000 kullanıcı gelirse ne olur?"'},{icon:"📦",label:"Hacim Testi",desc:'Büyük veri miktarlarını test eder. "10 milyon DB kaydıyla ne olur?"'},{icon:"⏳",label:"Dayanıklılık Testi",desc:"Saatler/günler boyunca orta yük. Bellek sızıntısı ve yavaş çöküşü bulur."},{icon:"📊",label:"Ölçeklenebilirlik",desc:'Sistem yatay ölçekleniyor mu? "2 sunucu ekleyince throughput iki katına çıkıyor mu?"'}]},{type:"heading",text:"Apache JMeter Nedir?"},{type:"text",content:"Apache JMeter, yük testi ve performans ölçümü için tasarlanmış ücretsiz, açık kaynaklı bir Java uygulamasıdır. 1998'de Stefano Mazzocchi tarafından web sunucusu testi için yaratılan JMeter, bugün dünyanın en yaygın kullanılan açık kaynaklı performans test aracı haline gelmiştir."},{type:"list",icon:"✅",title:"JMeter'ın Öne Çıkan Özellikleri:",items:["%100 ücretsiz ve açık kaynak (Apache Lisansı 2.0)","HTTP/S, REST, SOAP, FTP, JDBC, LDAP, SMTP, JMS ve daha fazlasını destekler","Test oluşturma için güçlü GUI, çalıştırma için Non-GUI modu","Dağıtık test: bir kontrolcü, birden fazla yük üreteci","600+ eklenti ile genişletilebilir","Otomatik olarak güzel HTML raporları üretir","Java olan her işletim sisteminde çalışır"]},{type:"heading",text:"JMeter vs Diğer Araçlar"},{type:"table",headers:["Araç","Dil","GUI","Ücretsiz","En İyi Kullanım"],rows:[["JMeter","Java","✅ Evet","✅ Evet","Kurumsal, çok protokol"],["Locust","Python","❌ Web UI","✅ Evet","Python ekipleri"],["k6","JavaScript","❌ CLI","✅ Evet","Geliştirici dostu, CI/CD"],["Gatling","Scala/JS","❌ CLI","✅ Evet","Yüksek performans, kod odaklı"],["LoadRunner","Çeşitli","✅ Evet","❌ Ücretli","Kurumsal, uyumluluk"]]},{type:"tip",content:"JMeter, programlama geçmişi olmayan başlangıç seviyesi ve ekipler için en güvenli seçimdir. GUI'si test oluşturmayı görsel ve sezgisel hale getirir."},{type:"heading",text:"Gerçek Dünya Kullanım Örnekleri"},{type:"list",icon:"🔹",items:["E-ticaret: Kara Cuma trafiği altında ödeme akışını test etme","Bankacılık: Giriş ve transfer API'lerinin sabah yoğun saatini kaldırıp kaldırmadığını doğrulama","Sağlık: Vardiya değişiminde hasta portalının yanıt verebildiğini doğrulama","Oyun: Lansmandan önce oyun sunucularını stres testine tabi tutma","Mikro servisler: Hangi servisin darboğaz olduğunu belirleme"]}]},{title:"📦 Kurulum ve İlk Başlatma",blocks:[{type:"text",content:'JMeter bir Java uygulamasıdır, bu nedenle önce Java kurulu olmalıdır. Kurulum basittir: indir, çıkart, çalıştır. "Kurulum sihirbazı" gerekmez.'},{type:"heading",text:"Adım 1: Java Kurulumu (JDK 8+)"},{type:"text",content:"JMeter 5.x için Java 8 veya üstü gereklidir. Java 11 veya 17 LTS önerilir."},{type:"code",code:`# Java kurulu mu kontrol et (terminal / komut istemcisinde çalıştır):
java -version

# Beklenen çıktı:
openjdk version "17.0.9" 2023-10-17

# Kurulu değilse, şuradan indir:
# https://adoptium.net  (ücretsiz, açık kaynak OpenJDK)
# veya https://www.oracle.com/java/technologies/downloads/`},{type:"heading",text:"Adım 2: JMeter İndir"},{type:"steps",items:["https://jmeter.apache.org/download_jmeter.cgi adresine git",'"Binaries" altında apache-jmeter-X.X.zip (Windows) veya .tgz (macOS/Linux) indir',"C:\\JMeter\\ veya ~/Applications/jmeter/ gibi bir konuma çıkart","Kurulum gerekmez — hazır!"]},{type:"heading",text:"Adım 3: JMeter GUI'yi Başlat"},{type:"code",code:`# Windows (çift tıkla veya cmd'de çalıştır):
C:\\JMeter\\apache-jmeter-5.6\\bin\\jmeter.bat

# macOS / Linux:
cd ~/Applications/jmeter/apache-jmeter-5.6/bin
./jmeter.sh`},{type:"info",content:"İlk başlatma 10-20 saniye sürebilir. JMeter boş bir Test Planıyla açılır. GUI yalnızca test oluşturmak içindir — büyük testleri asla GUI modunda çalıştırma (bunun yerine CLI kullan)."},{type:"heading",text:"JAVA_HOME Ayarı (gerekirse)"},{type:"code",code:`# Windows (Sistem Ortam Değişkenlerinde ayarla):
JAVA_HOME = C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.9.9-hotspot

# macOS / Linux (~/. zshrc veya ~/.bash_profile'e ekle):
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH

# Doğrula:
echo $JAVA_HOME`},{type:"tip",content:"Masaüstünüzde jmeter.bat/jmeter.sh için bir kısayol oluşturun. JMeter'ı sık açacaksınız!"}]},{title:"📚 Temel Kavramlar ve İlk Testini Oluşturma",blocks:[{type:"text",content:"JMeter testleri bir hiyerarşide düzenlenir. Bu hiyerarşiyi anlamak her şeyin temelidir."},{type:"heading",text:"Test Planı Hiyerarşisi"},{type:"code",code:`Test Planı
└── Thread Group              ← sanal kullanıcıları simüle eder
    ├── HTTP Request Sampler  ← neyi test edeceğiz
    ├── HTTP Header Manager   ← başlıkları ayarla (örn. auth)
    ├── CSV Data Set Config   ← dosyadan test verisi yükle
    ├── Regular Expr. Extractor ← dinamik değerleri çıkart
    ├── Response Assertion    ← yanıtları doğrula
    └── Listener'lar          ← sonuçları topla ve göster
        ├── View Results Tree
        └── Aggregate Report`},{type:"heading",text:"1. Thread Group — Sanal Kullanıcılar"},{type:"list",icon:"🔸",title:"Thread Group parametreleri:",items:[{label:"Number of Threads (Kullanıcı Sayısı)",desc:"Toplam sanal kullanıcı. Test oluştururken 10-50 ile başla."},{label:"Ramp-Up Period (sn)",desc:"Tüm kullanıcıları başlatmak için kaç saniye. 10 kullanıcı, 10 sn ramp-up = saniyede 1 kullanıcı."},{label:"Loop Count",desc:"Her kullanıcının isteği kaç kez tekrarlayacağı. Sonsuz için -1 (Duration ile birlikte kullan)."},{label:"Duration (sn)",desc:"Toplam test süresi. Sürdürülebilir testler için Loop Count'tan daha iyidir."}]},{type:"heading",text:"2. HTTP Request Sampler"},{type:"code",code:`# Örnek: REST API POST isteği test etme
# HTTP Request Sampler'da:
#   Metot: POST
#   Yol:   /api/v1/login
#   Body Data (JSON):

{
  "username": "testkullanici",
  "password": "Sifre123"
}

# HTTP Header Manager'a şunları ekle:
#   Content-Type: application/json
#   Accept: application/json`},{type:"heading",text:"3. CSV Data Set Config — Parameterizasyon"},{type:"code",code:`# 1. Dosya oluştur: testdata/kullanicilar.csv
kullanici_adi,sifre
ali,sifre1
veli,sifre2
ayse,sifre3

# 2. CSV Data Set Config ekle
#    Dosya Adı: testdata/kullanicilar.csv
#    Değişken İsimleri: kullanici_adi,sifre

# 3. HTTP Request Body'de değişkenleri kullan:
{
  "username": "\${kullanici_adi}",
  "password": "\${sifre}"
}`},{type:"heading",text:"4. Response Assertion — Yanıt Doğrulama"},{type:"code",code:`# Response Assertion (en yaygın):
#   Test edilecek alan: Response Code
#   Şablon:            200
#   → Durum kodu 200 değilse başarısız sayar

#   Test edilecek alan: Response Body
#   İçerir:            "success":true
#   → Body bu metni içermiyorsa başarısız sayar

# Duration Assertion:
#   Süre (ms): 2000
#   → Yanıt 2 saniyeden uzun sürerse başarısız sayar`},{type:"heading",text:"İlk Testini Çalıştır — Adım Adım"},{type:"steps",items:["Yeni Test Planı oluştur: Dosya → Yeni","Thread Group ekle: Test Planı'na sağ tıkla → Ekle → Threads → Thread Group. 10 kullanıcı, 10 sn ramp-up, 1 döngü ayarla","HTTP Request ekle: Thread Group'a sağ tıkla → Ekle → Sampler → HTTP Request. GET https://jsonplaceholder.typicode.com/posts yaz","Response Assertion ekle: HTTP Request'e sağ tıkla → Ekle → Assertions → Response Assertion. Durum Kodu = 200 ayarla","View Results Tree ekle: Thread Group'a sağ tıkla → Ekle → Listener → View Results Tree","Kaydet: Ctrl+S (.jmx dosyası olarak kaydeder)","Çalıştır: Ctrl+R veya yeşil ▶ düğmesi","Sonuçları View Results Tree'de kontrol et (yeşil = başarılı, kırmızı = başarısız)"]}]},{title:"🚀 İleri Seviye JMeter",blocks:[{type:"heading",text:"Non-GUI Modu (CLI) — Gerçek Testler İçin"},{type:"text",content:"Yük testlerini asla JMeter GUI'sinde çalıştırma. GUI ekstra CPU ve bellek tüketir, bu da test sonuçlarını etkiler. Gerçek performans testleri için komut satırını (Non-GUI modu) kullan."},{type:"code",code:`# Temel non-GUI çalıştırma:
jmeter -n -t test.jmx -l sonuclar.jtl

# HTML raporu ile tam komut:
jmeter -n -t test.jmx -l sonuclar.jtl -e -o ./rapor

# Parametreler:
#  -n           Non-GUI modu
#  -t           Test planı yolu (.jmx dosyası)
#  -l           Sonuç dosyası yolu (.jtl veya .csv)
#  -e           Testten sonra HTML raporu oluştur
#  -o           HTML raporu için çıktı klasörü (boş olmalı!)

# Komut satırından özellikleri geçersiz kıl:
jmeter -n -t test.jmx -l sonuc.jtl -Jkullanici=500 -Jsure=300`},{type:"heading",text:"JSR223 Sampler — Groovy Scripting"},{type:"code",code:`// Dinamik veri üretme örneği
import java.util.UUID

def uuid = UUID.randomUUID().toString()
def zaman = System.currentTimeMillis()
def rastgeleId = (int)(Math.random() * 1000) + 1

// JMeter değişkeni olarak kaydet
vars.put("istekId", uuid)
vars.put("zaman", String.valueOf(zaman))
vars.put("rastgeleKullaniciId", String.valueOf(rastgeleId))

log.info("Oluşturulan istekId: " + uuid)`},{type:"heading",text:"CI/CD Entegrasyonu — GitHub Actions"},{type:"code",code:`# .github/workflows/performans-testi.yml
name: Performans Testi

on:
  push:
    branches: [main]

jobs:
  jmeter:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: JMeter İndir
        run: |
          wget https://downloads.apache.org/jmeter/binaries/apache-jmeter-5.6.3.tgz
          tar -xzf apache-jmeter-5.6.3.tgz
      - name: Performans Testini Çalıştır
        run: |
          apache-jmeter-5.6.3/bin/jmeter \\
            -n -t tests/load_test.jmx \\
            -l sonuclar/results.jtl \\
            -e -o sonuclar/html-rapor \\
            -JBASE_URL=\${{ secrets.STAGING_URL }}
      - name: Raporu Yükle
        uses: actions/upload-artifact@v3
        with:
          name: jmeter-raporu
          path: sonuclar/html-rapor/`},{type:"heading",text:"HTML Rapor Metrikleri"},{type:"table",headers:["Metrik","İyi Değer","Anlamı"],rows:[["Ortalama Yanıt Süresi","< 2000ms","Tüm isteklerde ortalama süre"],["90. Persentil (P90)","< 3000ms","İsteklerin %90'ı bu sürenin altında"],["99. Persentil (P99)","< 5000ms","Çoğu kullanıcı için en kötü durum"],["Hata Oranı","< %1","Başarısız isteklerin yüzdesi"],["Throughput","Hedefe göre","Sistemin saniyede işlediği istek sayısı"],["Apdex Skoru","> 0.7 (iyi)","0-1 ölçeği: yanıt sürelerine göre kullanıcı memnuniyeti"]]}]},{title:"💼 JMeter Mülakat Soruları ve Cevapları",blocks:[{type:"text",content:"En sık sorulan JMeter mülakat soruları. Her soruya tıklayarak detaylı cevabı görebilirsiniz."},{type:"qa",question:"S1: JMeter nedir? Ne için kullanılır? Hangi protokolleri destekler?",answer:`Apache JMeter, açık kaynaklı Java tabanlı bir performans test aracıdır. Web uygulamalarının, API'lerin ve servislerin yük altındaki performansını ölçmek için kullanılır.

Temel kullanım alanları:
• Yük testi: Birden fazla eş zamanlı kullanıcıyı simüle etme
• Performans testi: Yanıt sürelerini ve throughput'u ölçme
• Stres testi: Kırılma noktasını bulma
• API testi: REST ve SOAP servislerini test etme

Desteklenen protokoller: HTTP/HTTPS, FTP, JDBC (veritabanı), LDAP, SMTP, TCP, JMS, WebSocket (eklenti ile)`},{type:"qa",question:"S2: Yük Testi, Stres Testi ve Spike Testi arasındaki fark nedir?",answer:`Yük Testi: Sistemin beklenen (normal ve yoğun) yük koşulları altında test edilmesidir. Amaç: Performansın SLA'ları karşıladığını doğrulamak (örn. 1000 kullanıcı için yanıt süresi < 2sn).

Stres Testi: Sistemi kapasitesinin ötesine çöküne kadar kasıtlı olarak iter. Amaç: Kırılma noktasını bulmak ve arıza davranışını anlamak.

Spike Testi: Kısa süreliğine çok büyük yük uygular, sonra kaldırır. Amaç: Ani trafik artışlarını kaldırıp kaldıramadığını doğrulamak (örn. haber viral oldu, flaş indirim başladı).`},{type:"qa",question:"S3: Thread Group parametrelerini açıkla: Kullanıcı Sayısı, Ramp-Up, Loop Count",answer:`Kullanıcı Sayısı (Number of Threads): JMeter'ın simüle edeceği toplam sanal kullanıcı (eş zamanlı kullanıcı) sayısı. Her thread bağımsız çalışır ve gerçek bir kullanıcıyı temsil eder.

Ramp-Up Period: JMeter'ın tüm thread'leri başlatması için geçen süre (saniye). Örnek: 100 thread, 50 saniyelik ramp-up = saniyede 2 kullanıcı başlatılır. Sunucuyu hemen bunaltabilecek "thundering herd"i önler.

Loop Count: Her thread'in test senaryosunu kaç kez çalıştıracağı. Süre ayarı ile birlikte kullanmak için -1 (sonsuz) olarak ayarla.`},{type:"qa",question:"S4: JMeter'da Korelasyon nedir? Nasıl uygulanır?",answer:`Korelasyon, sunucu yanıtlarından dinamik değerlerin (CSRF token, session ID, auth token) çıkarılması ve sonraki isteklerde kullanılması sürecidir. Korelasyon olmadan, oturum başına değişen değerler nedeniyle testler başarısız olur.

Örnek: Giriş {"token": "abc123xyz"} döndürür. Sonraki API çağrısının bu token'ı Authorization başlığında göndermesi gerekir.

Uygulama:
1. Giriş isteğine JSON Extractor ekle
2. Referans Adı: authToken
3. JSON Path: $.token
4. Sonraki isteklerin başlığında \${authToken} kullan`,code:`# JSON Extractor yapılandırması:
Referans Adı: authToken
JSON Path:    $.data.token

# HTTP Header Manager'da kullan:
Authorization: Bearer \${authToken}`},{type:"qa",question:"S5: Neden Non-GUI modu kullanmalısın? Nasıl çalıştırılır?",answer:`GUI önemli miktarda CPU ve bellek tüketir, bu da:
• JMeter'ın üretebileceği yükü azaltır
• Performans metriklerini bozar (JMeter makinesi darboğaz haline gelir)
• Sonuçları güvenilmez kılar

50'den fazla kullanıcı içeren herhangi bir test için Non-GUI (CLI) modu kullan.`,code:`# Temel çalıştırma:
jmeter -n -t test.jmx -l sonuclar.jtl

# HTML raporu ile:
jmeter -n -t test.jmx -l sonuclar.jtl -e -o ./html-raporu`},{type:"qa",question:"S6: Rapordaki en önemli metrikler nelerdir? Kabul edilebilir değerler nedir?",answer:`Temel metrikler ve kabul edilebilir eşikler:

• Ortalama Yanıt Süresi: Ortalama yanıt süresi. Web uygulamaları için hedef < 2000ms.
• 90. Persentil (P90): Kullanıcıların %90'ı bu yanıt süresini veya daha hızlısını alır. Hedef < 3000ms.
• 99. Persentil (P99): Kullanıcıların %99'u için en kötü durum. Hedef < 5000ms.
• Hata Oranı %: Başarısız isteklerin yüzdesi. Sağlıklı sistemler için hedef < %1.
• Throughput: Sistemin saniyede işlediği istek sayısı. Ne kadar yüksekse o kadar iyi.
• Apdex Skoru: Kullanıcı memnuniyeti skoru (0-1). Memnun > 0.85, Tolere edebilir 0.5-0.85, Memnuniyetsiz < 0.5.`},{type:"qa",question:"S7: JMeter'ı Jenkins/CI CD ile nasıl entegre edersiniz?",answer:`Seçenek 1: Jenkins JMeter Eklentisi
• Jenkins'e "Performance Plugin" kur
• .jtl sonuç dosyasına işaret eden "Publish Performance Test Result Report" post-build eylemi ekle
• Eşikler belirle: hata oranı > X% veya ortalama yanıt > Yms ise build'i başarısız say

Seçenek 2: Shell/Bat adımı
• "Execute Shell" build adımı kullan
• JMeter CLI çalıştır ve çıkış kodunu kontrol et

Seçenek 3: GitHub Actions
• actions/setup-java kullan, JMeter'ı indir, CLI çalıştır, HTML raporu artifact olarak yükle`},{type:"qa",question:"S8: Dağıtık test nedir? Ne zaman ihtiyaç duyulur?",answer:`Dağıtık test, yükü koordineli olarak üretmek için birden fazla makine kullanır. Bir Controller makinesi birden fazla Worker (Injector) makinesini yönetir.

Ne zaman kullanılır:
• Tek bir makine yeterli yük üretemiyor (örn. 5000+ kullanıcı gerekiyor)
• Daha gerçekçi coğrafi kullanıcı dağılımı
• Test makinesinde CPU/ağ kısıtlamaları var

Kural: İyi bir sunucu tek makinede ~300-500 HTTP thread'i kaldırabilir. Daha fazlası için Worker ekle.`}]}]}};function kg(){return n.jsx(Ws,{data:Ng,gradient:"from-orange-500 to-red-600",bgLight:"bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"})}const Ul=[{title:"🎯 What is SQL & Why Does Every QA Engineer Need It?",blocks:[{type:"heading",text:"What is a Database?"},{type:"text",content:"A database is an organized collection of structured data stored electronically. Think of it as a super-powered spreadsheet that can store millions of rows, link related data together, and answer complex questions in milliseconds. Every app you test stores its data somewhere — that somewhere is almost always a database."},{type:"heading",text:"What is SQL?"},{type:"text",content:`SQL (Structured Query Language) is the standard language for communicating with relational databases. You use it to ask questions ("which users signed up today?"), add data ("create this new order"), update records, and delete them. It's been the industry standard since the 1970s and works across MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and more.`},{type:"heading",text:"Why QA Engineers Must Know SQL"},{type:"grid",cols:3,items:[{icon:"✅",label:"Verify Backend State",desc:"After a UI action, query the DB to confirm data was saved correctly — not just the UI says so."},{icon:"🌱",label:"Seed Test Data",desc:"INSERT test users, products, orders directly before tests run — no manual setup."},{icon:"🧹",label:"Cleanup After Tests",desc:"DELETE test records after each run so the next run starts clean."},{icon:"🔍",label:"Backend Validation",desc:"Verify business rules: order total = sum of line items, FK constraints, data integrity."},{icon:"⚡",label:"Faster Than UI",desc:"A DB query takes milliseconds. Clicking through UI to find the same data takes minutes."},{icon:"🐛",label:"Find Hidden Bugs",desc:"UI shows success but DB was not updated — SQL exposes the truth."}]},{type:"heading",text:"Key Database Terminology"},{type:"table",headers:["Term","Meaning","Example"],rows:[["Table","Stores data in rows and columns (like a spreadsheet)",'"users" table with columns: id, email, age'],["Row / Record","One entry in a table",'A single user: {id:1, email:"alice@test.com"}'],["Column / Field","An attribute/property stored per row",'"email", "created_at", "is_active"'],["Primary Key","Unique identifier for each row — never NULL, never repeated",'"id" column with AUTO_INCREMENT'],["Foreign Key","Column that references a PK in another table — creates a relationship",'"orders.user_id" → "users.id"'],["Index","Data structure that speeds up searches on a column",'INDEX on "email" column → fast WHERE email=?'],["Schema","The blueprint of a database — all tables, columns, types, constraints","CREATE TABLE definitions"],["Query","A request sent to the database using SQL","SELECT * FROM users WHERE age > 25"]]},{type:"heading",text:"Popular Databases Compared"},{type:"table",headers:["Database","Type","Best For","Free?"],rows:[["MySQL","Open-source","Web apps, most common in industry","✅ Yes"],["PostgreSQL","Open-source","Complex queries, JSON, enterprise apps","✅ Yes"],["SQLite","Embedded / serverless","Local dev, testing, mobile apps","✅ Yes"],["SQL Server","Microsoft commercial","Windows/.NET enterprise","✅ Express edition"],["Oracle","Commercial enterprise","Large-scale banking/finance","❌ Paid"]]},{type:"tip",content:"Start learning with SQLiteOnline.com — runs in your browser, zero installation. For a real environment, install DBeaver (free GUI) and connect to SQLite or MySQL."}]},{title:"📦 Setting Up Your SQL Environment",blocks:[{type:"heading",text:"Option A: Zero-Install Online Editors (Start Here)"},{type:"list",icon:"🌐",items:[{label:"db-fiddle.com",desc:"Best option. MySQL, PostgreSQL, SQLite. Schema + query split view."},{label:"sqliteonline.com",desc:"Runs SQLite in your browser. Upload a .db file or create tables."},{label:"sqlfiddle.com",desc:"Classic. Multiple DB engines. Good for sharing examples."}]},{type:"heading",text:"Option B: SQLite CLI (Lightest Local Option)"},{type:"steps",items:['Windows: Download "sqlite-tools-win32" from sqlite.org/download.html and extract to C:\\sqlite\\',"Mac: Already installed! Run: sqlite3 —— or install via Homebrew: brew install sqlite","Linux: sudo apt install sqlite3","Create a database: sqlite3 mytest.db","Verify: SELECT sqlite_version();"]},{type:"code",code:`-- SQLite CLI quick reference:
sqlite3 mytest.db        -- open or create database

.tables                  -- list all tables
.schema users            -- show CREATE TABLE for "users"
.headers on              -- show column headers in output
.mode column             -- aligned column output
.quit                    -- exit SQLite

SELECT sqlite_version();`,expected:"3.43.0"},{type:"heading",text:"Option C: MySQL Community Server"},{type:"steps",items:['Windows: Download MySQL Installer from dev.mysql.com/downloads/installer/ → choose "Developer Default"',"Mac: brew install mysql → brew services start mysql → mysql -u root","Linux: sudo apt install mysql-server → sudo systemctl start mysql → sudo mysql -u root","Verify installation: SELECT VERSION();"]},{type:"code",code:`-- Connect and verify:
mysql -u root -p          -- connect with root user (enter password)

SELECT VERSION();         -- check MySQL version`,expected:`+-----------+
| VERSION() |
+-----------+
| 8.0.35    |
+-----------+`},{type:"heading",text:"Option D: DBeaver GUI (Recommended for Beginners)"},{type:"text",content:"DBeaver is a free universal database GUI that works with ALL databases. Much easier than the command line — you can browse tables visually and run queries with autocomplete."},{type:"steps",items:["Download DBeaver Community from dbeaver.io (free)","Install and launch DBeaver",'Click "New Database Connection" (the plug icon, top left)',"Select your DB type: SQLite, MySQL, or PostgreSQL","SQLite: click Browse → select your .db file (or create new)","MySQL/PostgreSQL: enter host, port, database name, username, password",'Click "Test Connection" — must show green "Connected" before Finish',"Open SQL Editor with Ctrl+] and start writing queries"]},{type:"heading",text:"Using SQL in Python (for Test Automation)"},{type:"code",code:`# SQLite — built into Python, no install needed:
import sqlite3

conn   = sqlite3.connect("test.db")   # connect (creates file if not exists)
cursor = conn.cursor()

cursor.execute("SELECT * FROM users WHERE age > 25")
rows = cursor.fetchall()              # get all results as list of tuples

for row in rows:
    print(row)

conn.close()

# PostgreSQL — install: pip install psycopg2-binary
import psycopg2

conn = psycopg2.connect(
    host="localhost", database="testdb",
    user="postgres",  password="mypassword"
)
cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) FROM orders WHERE status = 'pending'")
count = cursor.fetchone()[0]
print(f"Pending orders: {count}")
conn.close()`}]},{title:"🟢 Level 1: SQL Foundations",blocks:[{type:"heading",text:"CREATE TABLE — Defining Structure",difficulty:"🟢 Beginner"},{type:"code",code:`-- Create a test_results table to store automation run data:
CREATE TABLE test_results (
    id          INT           PRIMARY KEY AUTO_INCREMENT,  -- unique ID, auto-increments
    test_name   VARCHAR(100)  NOT NULL,                    -- text up to 100 chars, required
    status      VARCHAR(10)   NOT NULL,                    -- 'PASS', 'FAIL', 'SKIP'
    duration_ms INT           DEFAULT 0,                   -- test duration in milliseconds
    run_date    DATETIME      DEFAULT CURRENT_TIMESTAMP,   -- auto-set to now
    environment VARCHAR(20)   DEFAULT 'staging',           -- which env was tested
    is_flaky    BOOLEAN       DEFAULT FALSE                 -- marks known flaky tests
);

-- Common SQL data types:
-- INT / BIGINT        → whole numbers (28, 1000000)
-- DECIMAL(10,2)       → precise decimals, e.g. prices (99.99)
-- VARCHAR(n)          → variable text up to n characters
-- TEXT                → unlimited text (descriptions, logs)
-- BOOLEAN / TINYINT   → true/false
-- DATE                → 2024-01-15
-- DATETIME/TIMESTAMP  → 2024-01-15 14:30:00`},{type:"heading",text:"INSERT INTO — Adding Data",difficulty:"🟢 Beginner"},{type:"code",code:`-- Single row insert:
INSERT INTO test_results (test_name, status, duration_ms, environment)
VALUES ('Login Test', 'PASS', 1234, 'staging');

-- Multiple rows at once (much faster than one at a time!):
INSERT INTO test_results (test_name, status, duration_ms) VALUES
    ('Signup Test',    'PASS', 890),
    ('Checkout Flow',  'FAIL', 5400),
    ('Profile Update', 'SKIP', 0),
    ('Password Reset', 'PASS', 1100),
    ('Search Feature', 'FAIL', 8200);

-- Copy rows from one table to another:
INSERT INTO test_archive
SELECT * FROM test_results WHERE run_date < '2023-01-01';`},{type:"heading",text:"SELECT — Reading Data",difficulty:"🟢 Beginner"},{type:"code",code:`-- Select all columns and all rows:
SELECT * FROM test_results;

-- Select specific columns only:
SELECT test_name, status, duration_ms FROM test_results;

-- WHERE — filter rows:
SELECT * FROM test_results WHERE status = 'FAIL';
SELECT * FROM test_results WHERE duration_ms > 3000;        -- slow tests
SELECT * FROM test_results WHERE status = 'FAIL' AND duration_ms > 5000;
SELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');

-- LIKE — pattern matching:
SELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains "Login"
SELECT * FROM test_results WHERE test_name LIKE 'Sign%';    -- starts with "Sign"

-- ORDER BY — sort results:
SELECT * FROM test_results ORDER BY duration_ms DESC;       -- slowest first
SELECT * FROM test_results ORDER BY run_date DESC LIMIT 10; -- last 10 runs

-- LIMIT + OFFSET — pagination:
SELECT * FROM test_results LIMIT 10;            -- first 10 rows
SELECT * FROM test_results LIMIT 10 OFFSET 20;  -- rows 21-30 (page 3)

-- DISTINCT — unique values only:
SELECT DISTINCT environment FROM test_results;`,expected:`+----+----------------+--------+-------------+
| id | test_name      | status | duration_ms |
+----+----------------+--------+-------------+
|  3 | Checkout Flow  | FAIL   |        5400 |
|  5 | Search Feature | FAIL   |        8200 |
+----+----------------+--------+-------------+`},{type:"heading",text:"UPDATE and DELETE",difficulty:"🟢 Beginner"},{type:"code",code:`-- UPDATE — modify existing rows:
UPDATE test_results SET status = 'PASS' WHERE id = 3;
UPDATE test_results SET is_flaky = TRUE WHERE test_name = 'Search Feature';

-- DELETE — remove rows:
DELETE FROM test_results WHERE status = 'SKIP';
DELETE FROM test_results WHERE run_date < NOW() - INTERVAL 30 DAY;

-- SAFE PATTERN: always SELECT first to verify, THEN DELETE:
SELECT * FROM test_results WHERE environment = 'test-cleanup';  -- verify
DELETE FROM test_results WHERE environment = 'test-cleanup';    -- then delete`},{type:"warning",content:"ALWAYS include WHERE with UPDATE and DELETE! Without WHERE, every row in the table is affected. Run a SELECT with the same WHERE first to verify which rows will be changed."},{type:"heading",text:"NULL Values",difficulty:"🟢 Beginner"},{type:"code",code:`-- NULL means "no value / unknown" — NOT the same as 0 or empty string!
-- You CANNOT use = to check for NULL — it always returns false:

SELECT * FROM test_results WHERE error_msg IS NULL;      -- correct
SELECT * FROM test_results WHERE error_msg IS NOT NULL;  -- has an error
-- SELECT * WHERE error_msg = NULL;   WRONG — always returns 0 rows!

-- COALESCE: return first non-NULL value:
SELECT test_name,
       COALESCE(error_msg, 'No error') AS error_display
FROM test_results;

-- NULLIF: return NULL if two values are equal (avoid division by zero!):
SELECT test_name, NULLIF(duration_ms, 0) AS duration
FROM test_results;`},{type:"heading",text:"Interactive Example: test_results Table",difficulty:"🟢 Beginner"},{type:"code",code:`-- Copy this into db-fiddle.com and run it!
-- Select MySQL 8.0 as the engine.

-- 1. Create the table:
CREATE TABLE test_results (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    test_name   VARCHAR(100) NOT NULL,
    status      VARCHAR(10)  NOT NULL,
    duration_ms INT DEFAULT 0
);

-- 2. Insert test data:
INSERT INTO test_results (test_name, status, duration_ms) VALUES
    ('Login Test',      'PASS',  1200),
    ('Checkout Flow',   'FAIL',  5400),
    ('Signup Test',     'PASS',   890),
    ('Profile Update',  'FAIL',  3100),
    ('Search Feature',  'PASS',  2200),
    ('Logout Test',     'SKIP',     0);

-- 3. Query it:
SELECT * FROM test_results ORDER BY duration_ms DESC;
SELECT * FROM test_results WHERE status = 'FAIL';
SELECT COUNT(*) AS total, status FROM test_results GROUP BY status;`,expected:`+----+----------------+--------+
| id | test_name      | status |
+----+----------------+--------+
|  2 | Checkout Flow  | FAIL   |
|  4 | Profile Update | FAIL   |
+----+----------------+--------+`}]},{title:"🟡 Level 2: Intermediate SQL",blocks:[{type:"heading",text:"Aggregate Functions",difficulty:"🟡 Intermediate"},{type:"code",code:`-- Aggregate functions summarize multiple rows into one value:
SELECT COUNT(*)                 AS total_tests    FROM test_results;
SELECT COUNT(*) FILTER (WHERE status='PASS') AS passed FROM test_results;  -- PostgreSQL
SELECT SUM(duration_ms)         AS total_ms       FROM test_results;
SELECT AVG(duration_ms)         AS avg_ms         FROM test_results;
SELECT MIN(duration_ms)         AS fastest_ms     FROM test_results;
SELECT MAX(duration_ms)         AS slowest_ms     FROM test_results;

-- Round decimals:
SELECT ROUND(AVG(duration_ms), 0) AS avg_ms FROM test_results;`,expected:`+-------------+
| total_tests |
+-------------+
|           6 |
+-------------+`},{type:"heading",text:"GROUP BY and HAVING",difficulty:"🟡 Intermediate"},{type:"text",content:"GROUP BY groups rows with the same value in a column. HAVING filters those groups (like WHERE but for aggregate results). You CANNOT use COUNT/SUM/etc. in a WHERE clause — use HAVING instead."},{type:"code",code:`-- Count tests by status:
SELECT status, COUNT(*) AS count
FROM test_results
GROUP BY status
ORDER BY count DESC;

-- Average duration per environment (only envs with > 3 tests):
SELECT environment,
       COUNT(*)            AS total,
       ROUND(AVG(duration_ms), 0) AS avg_ms
FROM test_results
GROUP BY environment
HAVING COUNT(*) > 3          -- HAVING filters groups (not rows!)
ORDER BY avg_ms DESC;

-- WHERE (filter before grouping) + HAVING (filter after):
SELECT test_name, COUNT(*) AS run_count
FROM test_results
WHERE status = 'FAIL'        -- only FAIL rows
GROUP BY test_name
HAVING COUNT(*) > 2;         -- tests that failed more than 2 times`,expected:`+--------+-------+
| status | count |
+--------+-------+
| PASS   |     3 |
| FAIL   |     2 |
| SKIP   |     1 |
+--------+-------+`},{type:"heading",text:"JOINs — Combining Tables",difficulty:"🟡 Intermediate"},{type:"text",content:"JOINs let you query data from multiple related tables in one go. Essential for any real-world database where data is split across tables."},{type:"code",code:`-- Our tables:
-- testers:  id, name, email
-- bugs:     id, title, status, tester_id (FK → testers.id), project_id (FK → projects.id)
-- projects: id, name, deadline

-- INNER JOIN: only rows matching in BOTH tables
SELECT t.name AS tester, b.title AS bug, b.status
FROM testers t
INNER JOIN bugs b ON t.id = b.tester_id;
-- Rows with no matching tester OR no matching bug are EXCLUDED

-- LEFT JOIN: ALL rows from left table + matching from right (NULL if no match)
SELECT t.name, COUNT(b.id) AS assigned_bugs
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;
-- Testers with 0 bugs still appear (assigned_bugs = 0)

-- RIGHT JOIN: ALL rows from right table + matching from left
-- (rarely used — usually rewrite as LEFT JOIN with tables swapped)

-- Multi-table JOIN:
SELECT t.name AS tester, p.name AS project, b.title AS bug, b.status
FROM testers t
JOIN bugs b      ON t.id = b.tester_id
JOIN projects p  ON b.project_id = p.id
WHERE b.status = 'OPEN'
ORDER BY p.name, t.name;`},{type:"heading",text:"Subqueries",difficulty:"🟡 Intermediate"},{type:"code",code:`-- Subquery in WHERE (scalar subquery):
SELECT test_name, duration_ms
FROM test_results
WHERE duration_ms > (SELECT AVG(duration_ms) FROM test_results);
-- tests that are slower than average

-- Subquery with IN:
SELECT t.name
FROM testers t
WHERE t.id IN (
    SELECT DISTINCT tester_id FROM bugs WHERE status = 'OPEN'
);
-- testers who have at least one open bug

-- Subquery in FROM (derived table — must be aliased):
SELECT environment, avg_ms
FROM (
    SELECT environment, AVG(duration_ms) AS avg_ms
    FROM test_results
    GROUP BY environment
) AS env_stats
WHERE avg_ms > 2000;`},{type:"heading",text:"LIKE, BETWEEN, IN",difficulty:"🟡 Intermediate"},{type:"code",code:`-- LIKE: pattern matching
-- % = any number of characters, _ = exactly one character
SELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains
SELECT * FROM test_results WHERE test_name LIKE 'Sign_p%';  -- starts with Sign?p

-- BETWEEN: inclusive range
SELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;
SELECT * FROM test_results WHERE run_date BETWEEN '2024-01-01' AND '2024-01-31';

-- IN: matches any value in a list
SELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');
SELECT * FROM test_results WHERE environment NOT IN ('prod', 'staging');

-- Aliases make output readable:
SELECT
    t.test_name  AS "Test Name",
    t.duration_ms / 1000.0 AS "Duration (sec)",
    t.status
FROM test_results AS t
WHERE t.status != 'SKIP';`},{type:"heading",text:"Bug Tracking DB — Interactive Example",difficulty:"🟡 Intermediate"},{type:"code",code:`-- Paste this into db-fiddle.com (MySQL 8.0)

CREATE TABLE testers  (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE projects (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE bugs (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    title      VARCHAR(100),
    status     VARCHAR(20) DEFAULT 'OPEN',
    priority   VARCHAR(10) DEFAULT 'MEDIUM',
    tester_id  INT, project_id INT,
    FOREIGN KEY (tester_id)  REFERENCES testers(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

INSERT INTO testers  VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');
INSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');
INSERT INTO bugs (title, status, priority, tester_id, project_id) VALUES
    ('Login fails on Safari',   'OPEN',   'HIGH',   1, 1),
    ('Broken image on profile', 'CLOSED', 'LOW',    1, 1),
    ('API timeout on checkout', 'OPEN',   'HIGH',   2, 3),
    ('Wrong error message',     'OPEN',   'MEDIUM', 2, 2),
    ('Crash on empty search',   'OPEN',   'HIGH',   3, 1);

-- Who has the most open bugs?
SELECT te.name, COUNT(*) AS open_bugs
FROM testers te
JOIN bugs b ON te.id = b.tester_id
WHERE b.status = 'OPEN'
GROUP BY te.id, te.name
ORDER BY open_bugs DESC;`,expected:`+-------+-----------+
| name  | open_bugs |
+-------+-----------+
| Alice |         2 |
| Bob   |         2 |
| Carol |         1 |
+-------+-----------+`}]},{title:"🔴 Level 3: Advanced SQL",blocks:[{type:"heading",text:"Window Functions",difficulty:"🔴 Advanced"},{type:"text",content:'Window functions perform calculations across a "window" of related rows WITHOUT collapsing them like GROUP BY does. Each row gets its own result while also knowing about surrounding rows.'},{type:"code",code:`-- ROW_NUMBER: sequential number (ties each get unique numbers)
-- RANK:       ties get same number, then GAPS (1,1,3)
-- DENSE_RANK: ties get same number, NO gaps (1,1,2)

SELECT test_name, duration_ms,
       ROW_NUMBER()  OVER (ORDER BY duration_ms DESC) AS rn,
       RANK()        OVER (ORDER BY duration_ms DESC) AS rnk,
       DENSE_RANK()  OVER (ORDER BY duration_ms DESC) AS dense_rnk
FROM test_results;

-- PARTITION BY: reset numbering per group (like GROUP BY without collapsing)
SELECT tester_name, project, bug_count,
       RANK() OVER (PARTITION BY project ORDER BY bug_count DESC) AS rank_in_project
FROM tester_project_bugs;
-- → Rank 1 per project's top bug-finder

-- LAG / LEAD: access previous/next row values
SELECT run_date, total_failures,
       LAG(total_failures)  OVER (ORDER BY run_date) AS prev_failures,
       total_failures - LAG(total_failures) OVER (ORDER BY run_date) AS change
FROM daily_test_stats;

-- Running total:
SELECT run_date, new_tests,
       SUM(new_tests) OVER (ORDER BY run_date) AS cumulative_tests
FROM daily_stats;`},{type:"heading",text:"CTEs — Common Table Expressions",difficulty:"🔴 Advanced"},{type:"code",code:`-- CTE: a named subquery at the top of your statement.
-- Makes complex queries readable by breaking into named steps.

WITH failed_tests AS (
    SELECT test_name, COUNT(*) AS fail_count
    FROM test_results
    WHERE status = 'FAIL'
    GROUP BY test_name
),
recent_passes AS (
    SELECT test_name, MAX(run_date) AS last_pass_date
    FROM test_results
    WHERE status = 'PASS'
    GROUP BY test_name
)
-- Now use both CTEs together:
SELECT f.test_name, f.fail_count, p.last_pass_date
FROM failed_tests f
LEFT JOIN recent_passes p ON f.test_name = p.test_name
ORDER BY f.fail_count DESC;

-- Recursive CTE (for hierarchical data like org charts, nested categories):
WITH RECURSIVE org AS (
    SELECT id, name, manager_id, 0 AS level
    FROM employees WHERE manager_id IS NULL          -- start: CEO

    UNION ALL

    SELECT e.id, e.name, e.manager_id, o.level + 1
    FROM employees e
    JOIN org o ON e.manager_id = o.id
)
SELECT level, name FROM org ORDER BY level;`},{type:"heading",text:"Transactions — ACID Properties",difficulty:"🔴 Advanced"},{type:"code",code:`-- A transaction is a group of SQL statements that execute as ONE unit.
-- Either ALL succeed (COMMIT) or ALL are undone (ROLLBACK).
-- ACID: Atomicity, Consistency, Isolation, Durability

-- Example: Transfer test case from one project to another
START TRANSACTION;

UPDATE test_cases SET project_id = 2 WHERE id = 42;  -- move test case
INSERT INTO audit_log (action, test_id)              -- log the action
       VALUES ('moved_to_project_2', 42);

-- If everything looks good:
COMMIT;

-- If something went wrong:
-- ROLLBACK;   -- undo BOTH statements

-- SAVEPOINT: partial rollback
START TRANSACTION;
INSERT INTO test_results (test_name, status) VALUES ('Test A', 'PASS');
SAVEPOINT after_a;
INSERT INTO test_results (test_name, status) VALUES ('Test B', 'FAIL');
ROLLBACK TO SAVEPOINT after_a;  -- undo Test B, keep Test A
COMMIT;                          -- commits only Test A`},{type:"heading",text:"Indexes — Speed Up Queries",difficulty:"🔴 Advanced"},{type:"code",code:`-- Create indexes on columns used frequently in WHERE/JOIN:
CREATE INDEX idx_results_status  ON test_results(status);
CREATE INDEX idx_results_run_date ON test_results(run_date);
CREATE INDEX idx_bugs_tester     ON bugs(tester_id);       -- FK columns always!
CREATE INDEX idx_results_env_status ON test_results(environment, status);  -- composite

-- Unique index (also enforces uniqueness):
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- View indexes on a table:
SHOW INDEX FROM test_results;      -- MySQL
di test_results                   -- PostgreSQL

-- EXPLAIN: see how MySQL plans to execute a query
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';
-- "type: ALL" = full table scan (slow, needs index)
-- "type: ref" = using index (fast!)

-- Add index and check improvement:
CREATE INDEX idx_status ON test_results(status);
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';
-- Now shows: key: idx_status, rows: ~10 (not all rows)`},{type:"heading",text:"Views",difficulty:"🔴 Advanced"},{type:"code",code:`-- A VIEW is a saved SQL query that acts like a virtual table.
-- Great for: reusable complex queries, hiding complexity, security.

CREATE VIEW active_failures AS
    SELECT t.name AS tester, b.title, b.priority, p.name AS project
    FROM bugs b
    JOIN testers t  ON b.tester_id  = t.id
    JOIN projects p ON b.project_id = p.id
    WHERE b.status = 'OPEN';

-- Use the view like a table:
SELECT * FROM active_failures WHERE priority = 'HIGH';
SELECT tester, COUNT(*) AS high_priority FROM active_failures
GROUP BY tester;

-- Drop a view:
DROP VIEW active_failures;`},{type:"heading",text:"SQL Injection & Parameterized Queries",difficulty:"🔴 Advanced"},{type:"code",code:`# SQL INJECTION: attacker injects SQL code through user input.
# Classic example:
username = "admin' OR '1'='1"
# Vulnerable query becomes:
# WHERE username = 'admin' OR '1'='1' -- true for ALL users!

# ❌ VULNERABLE (never do this in tests or apps):
query = f"SELECT * FROM users WHERE username = '{username}'"
cursor.execute(query)

# ✅ SAFE: Use parameterized queries (placeholders):
# Python sqlite3:
cursor.execute(
    "SELECT * FROM users WHERE username = ?",
    (username,)              # value is passed separately — SQL engine escapes it
)

# Python psycopg2 (PostgreSQL):
cursor.execute(
    "SELECT * FROM users WHERE username = %s AND role = %s",
    (username, "admin")
)

# Why safe? The DB engine handles the values as DATA, never as SQL code.
# 'admin' OR '1'='1' becomes a literal string to match, not executable SQL.`}]},{title:"🧪 SQL for QA — Real Testing Scenarios",blocks:[{type:"heading",text:"Use Case 1: Find All Failed Tests in Last 7 Days"},{type:"code",code:`-- Find failed tests from the last 7 days with details:
SELECT
    test_name,
    status,
    duration_ms,
    environment,
    run_date
FROM test_results
WHERE status = 'FAIL'
  AND run_date >= NOW() - INTERVAL 7 DAY  -- MySQL
-- AND run_date >= CURRENT_TIMESTAMP - INTERVAL '7 days'  -- PostgreSQL
ORDER BY run_date DESC;

-- Count failures per test in last 7 days:
SELECT test_name, COUNT(*) AS fail_count
FROM test_results
WHERE status = 'FAIL'
  AND run_date >= NOW() - INTERVAL 7 DAY
GROUP BY test_name
ORDER BY fail_count DESC;`,expected:`+-----------------+--------+-------------+
| test_name       | status | duration_ms |
+-----------------+--------+-------------+
| Checkout Flow   | FAIL   |        5400 |
| Search Feature  | FAIL   |        8200 |
+-----------------+--------+-------------+`},{type:"heading",text:"Use Case 2: Find Duplicate Test Data Entries"},{type:"code",code:`-- Find duplicate email addresses in a users table:
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- See ALL rows that have a duplicate email:
SELECT *
FROM users
WHERE email IN (
    SELECT email FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
)
ORDER BY email;

-- Find duplicates across multiple columns (exact duplicate records):
SELECT test_name, environment, run_date, COUNT(*) AS count
FROM test_results
GROUP BY test_name, environment, run_date
HAVING COUNT(*) > 1;`},{type:"heading",text:"Use Case 3: Verify Foreign Key Relationships (Find Orphaned Records)"},{type:"code",code:`-- Find orders whose user_id doesn't exist in the users table (orphaned records):
SELECT o.id AS order_id, o.user_id, o.total
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;      -- user_id exists in orders but NOT in users = orphan!

-- Find test results whose test_case_id doesn't exist:
SELECT r.id, r.test_case_id
FROM test_results r
LEFT JOIN test_cases tc ON r.test_case_id = tc.id
WHERE tc.id IS NULL;

-- Count valid vs orphaned records:
SELECT
    SUM(CASE WHEN u.id IS NOT NULL THEN 1 ELSE 0 END) AS valid_orders,
    SUM(CASE WHEN u.id IS NULL     THEN 1 ELSE 0 END) AS orphaned_orders
FROM orders o
LEFT JOIN users u ON o.user_id = u.id;`},{type:"heading",text:"Use Case 4: Count Test Results by Status with Percentages"},{type:"code",code:`-- Count and percentage per status:
SELECT
    status,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage
FROM test_results
WHERE run_date >= NOW() - INTERVAL 7 DAY
GROUP BY status
ORDER BY count DESC;

-- MySQL alternative (no window function needed):
SELECT
    status,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM test_results), 1) AS pct
FROM test_results
GROUP BY status
ORDER BY count DESC;`,expected:`+--------+-------+------------+
| status | count | percentage |
+--------+-------+------------+
| PASS   |    30 |       60.0 |
| FAIL   |    12 |       24.0 |
| SKIP   |     8 |       16.0 |
+--------+-------+------------+`},{type:"heading",text:"Use Case 5: Clean Up Test Data Older Than 30 Days"},{type:"code",code:`-- SAFE PATTERN: ALWAYS SELECT first to verify what will be deleted!

-- Step 1: see what will be deleted:
SELECT COUNT(*), MIN(run_date), MAX(run_date)
FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
  AND environment = 'staging';        -- only delete staging data, not prod!

-- Step 2: if the count looks right, delete:
DELETE FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
  AND environment = 'staging';

-- To be extra safe, delete in batches (avoids locking the table):
DELETE FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
LIMIT 1000;         -- delete max 1000 rows per run
-- Repeat until 0 rows affected.`},{type:"heading",text:"Use Case 6: EXPLAIN — Find and Fix Slow Queries"},{type:"code",code:`-- 1. Identify a slow query and add EXPLAIN before it:
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';

-- Look for:
-- type: "ALL" = full table scan (bad — reads every row)
-- key: NULL   = no index being used (bad)
-- rows: high  = many rows examined

-- 2. Create a composite index:
CREATE INDEX idx_status_env ON test_results(status, environment);

-- 3. Run EXPLAIN again:
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';
-- Now see: type: "ref", key: idx_status_env, rows: much lower

-- EXPLAIN ANALYZE (PostgreSQL — actually runs the query):
EXPLAIN ANALYZE SELECT * FROM test_results WHERE status = 'FAIL';`,expected:`Before index: type=ALL, rows=50000, key=NULL
After index:  type=ref, rows=120, key=idx_status_env`}]},{title:"💼 SQL Interview Questions & Answers",blocks:[{type:"text",content:"Click each question to expand the model answer. Includes code examples."},{type:"subheading",text:"🟢 Basic Questions"},{type:"qa",question:"Q1: What is the difference between WHERE and HAVING?",answer:`WHERE filters individual ROWS before any grouping happens — it works on raw column values.
HAVING filters GROUPS after GROUP BY has run — it works on aggregate function results.

Rule: If you need COUNT, SUM, AVG, etc. in your filter → HAVING. Otherwise → WHERE.`,code:`-- WHERE: filter rows before grouping
SELECT * FROM test_results WHERE status = 'FAIL';

-- HAVING: filter groups after aggregation
SELECT test_name, COUNT(*) AS fails
FROM test_results
WHERE status = 'FAIL'          -- first filter rows (only FAIL rows)
GROUP BY test_name
HAVING COUNT(*) > 5;           -- then filter groups (only frequent failures)`},{type:"qa",question:"Q2: Explain the different types of JOINs.",answer:`INNER JOIN: Returns rows where there is a match in BOTH tables. Rows with no match on either side are excluded.

LEFT (OUTER) JOIN: Returns ALL rows from the left table. For right-side rows with no match → NULL in right columns.

RIGHT (OUTER) JOIN: Returns ALL rows from the right table. Left-side NULLs where no match.

FULL OUTER JOIN: Returns ALL rows from BOTH tables. NULLs where no match on either side.

CROSS JOIN: Cartesian product — every row from left combined with every row from right.`,code:`-- Find testers WITH open bugs (INNER JOIN):
SELECT t.name, COUNT(b.id) AS open_bugs
FROM testers t
INNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'
GROUP BY t.id, t.name;

-- Find ALL testers, even those with no bugs (LEFT JOIN):
SELECT t.name, COUNT(b.id) AS bug_count
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;`},{type:"qa",question:"Q3: What is a PRIMARY KEY vs FOREIGN KEY?",answer:`PRIMARY KEY (PK): Uniquely identifies each row in a table. Cannot be NULL. Only one per table. Usually an auto-incrementing integer.

FOREIGN KEY (FK): A column that references the PRIMARY KEY of another table, creating a relationship and enforcing referential integrity — you cannot insert a FK value that doesn't exist in the parent table.`,code:`CREATE TABLE users (
    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE orders (
    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK
    user_id INT NOT NULL,                    -- FK column
    total   DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint
    -- → cannot insert user_id = 999 if no user with id=999 exists
);`},{type:"qa",question:"Q4: What is NULL and how do you check for it?",answer:`NULL means "no value" or "unknown". It's not the same as 0, empty string "", or false. NULL is its own type — any comparison to NULL returns NULL (not true or false).

You CANNOT use = or != to check for NULL. Must use IS NULL or IS NOT NULL. Use COALESCE() to provide a default value when something is NULL.`,code:`-- Wrong:
SELECT * FROM users WHERE phone = NULL;    -- returns 0 rows! Always false.
SELECT * FROM users WHERE phone != NULL;   -- same problem

-- Correct:
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- Provide default with COALESCE:
SELECT name, COALESCE(phone, 'N/A') AS phone FROM users;`},{type:"qa",question:"Q5: What is the difference between DELETE, TRUNCATE, and DROP?",answer:`DELETE: Removes rows matching a WHERE clause. Supports WHERE (can target specific rows). Supports ROLLBACK. Fires row-level triggers. Slower for large tables.

TRUNCATE: Removes ALL rows instantly without a WHERE clause. Cannot be ROLLBACKed in MySQL. Much faster than DELETE for large tables. Does not fire triggers.

DROP: Permanently removes the ENTIRE TABLE including its structure and data. The table no longer exists after DROP.`,code:`DELETE FROM test_results WHERE status = 'SKIP';    -- remove specific rows
DELETE FROM test_results;                           -- remove all rows (slow)

TRUNCATE TABLE test_results;                        -- remove all rows (fast)

DROP TABLE test_results;                            -- delete entire table!`},{type:"subheading",text:"🟡 Intermediate Questions"},{type:"qa",question:"Q6: What is the difference between UNION and UNION ALL?",answer:`UNION: Combines results of two queries and removes duplicate rows. Slower because it must scan and compare all rows.

UNION ALL: Combines results and keeps ALL rows including duplicates. Faster because no deduplication step.

Both queries must have the same number of columns with compatible data types.`,code:`-- UNION: removes duplicates (slower):
SELECT email FROM users WHERE role = 'admin'
UNION
SELECT email FROM users WHERE is_verified = TRUE;

-- UNION ALL: keeps duplicates (faster):
SELECT test_name FROM test_results WHERE status = 'FAIL'
UNION ALL
SELECT test_name FROM archived_results WHERE status = 'FAIL';`},{type:"qa",question:"Q7: How do subqueries work? What is a correlated subquery?",answer:`A subquery is a SELECT inside another query. Can appear in WHERE (returns a value or set), FROM (acts as a table), or SELECT (returns one value per row).

A CORRELATED subquery references a column from the outer query — it runs once per outer row (can be slow!). Use JOINs when possible instead of correlated subqueries for better performance.`,code:`-- Simple subquery (runs ONCE):
SELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);

-- Correlated subquery (runs once per outer row — slow on large tables!):
SELECT t.name,
    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count
FROM testers t;
-- Better: use LEFT JOIN + GROUP BY instead`},{type:"qa",question:"Q8: What are indexes and how do they affect performance?",answer:`An index is a data structure (usually B-tree) that lets the database find rows matching a condition WITHOUT scanning every row. Like a book's index — jump directly to the page instead of reading cover-to-cover.

Speeds up: SELECT with WHERE, JOIN ON, ORDER BY.
Slows down: INSERT, UPDATE, DELETE (indexes must be updated too).
Add indexes on: columns in WHERE clauses, FK columns, frequently sorted columns.
Don't index: small tables, columns with very few distinct values (boolean, status with 3 values), frequently updated columns.`,code:`-- Before index: EXPLAIN shows type=ALL (reads ALL 50,000 rows)
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';

-- Add index:
CREATE INDEX idx_status ON test_results(status);

-- After index: EXPLAIN shows type=ref (uses index, reads ~5000 rows)
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';`},{type:"qa",question:"Q9: Write a query to find the second highest value in a table.",answer:"Classic interview question. Multiple approaches — using LIMIT/OFFSET, subquery, or window functions.",code:`-- Option 1: LIMIT + OFFSET (simplest):
SELECT DISTINCT duration_ms
FROM test_results
ORDER BY duration_ms DESC
LIMIT 1 OFFSET 1;         -- skip the highest, take the next one

-- Option 2: Subquery:
SELECT MAX(duration_ms) AS second_highest
FROM test_results
WHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);

-- Option 3: Window function (most robust, handles ties correctly):
SELECT duration_ms
FROM (
    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) AS rnk
    FROM test_results
) ranked
WHERE rnk = 2
LIMIT 1;`},{type:"qa",question:"Q10: GROUP BY — what rules apply to SELECT columns?",answer:`RULE: Every column in the SELECT list must EITHER be in the GROUP BY clause OR be wrapped in an aggregate function (COUNT, SUM, AVG, etc.).

Why? When you GROUP BY, multiple rows collapse into one group. For non-aggregated columns, the DB doesn't know WHICH row's value to show — so you must either include it in GROUP BY (every value in the group must be the same) or aggregate it.`,code:`-- CORRECT: group_col in GROUP BY, aggregated cols use SUM/COUNT
SELECT environment, COUNT(*) AS total, MAX(duration_ms) AS max_ms
FROM test_results
GROUP BY environment;

-- WRONG: test_name is not in GROUP BY and not aggregated
-- SELECT environment, test_name, COUNT(*)
-- FROM test_results GROUP BY environment;
-- → Error: 'test_name' is not in GROUP BY`},{type:"subheading",text:"🔴 Advanced Questions"},{type:"qa",question:"Q11: Explain window functions with a practical example.",answer:`Window functions perform calculations across a "window" of related rows without collapsing them. Unlike GROUP BY, each row keeps its own identity plus the window calculation result.

OVER() defines the window. PARTITION BY groups (like GROUP BY but doesn't collapse). ORDER BY within OVER() creates a sequence. Use cases: ranking, running totals, comparing to previous/next row.`,code:`SELECT tester_name, test_date, tests_run,
    -- Rank each tester within their team by tests run:
    RANK() OVER (PARTITION BY team ORDER BY tests_run DESC) AS team_rank,
    -- Running total of tests for the tester:
    SUM(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS cumulative,
    -- Compare to previous day:
    LAG(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS prev_day,
    tests_run - LAG(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS delta
FROM daily_tester_stats;`},{type:"qa",question:"Q12: What is a CTE and when would you use it over a subquery?",answer:`A CTE (WITH clause) is a named temporary result set. It's evaluated once and can be referenced multiple times.

Use CTEs over subqueries when: the query has multiple steps that are clearer as named sub-steps, you need to reference the same subquery multiple times, you want recursive queries (hierarchical data). Subqueries are fine for simple, single-use derivations.`,code:`-- Hard to read with subqueries:
SELECT * FROM (
    SELECT tester_id, COUNT(*) fails FROM bugs WHERE status='FAIL' GROUP BY tester_id
) f JOIN (
    SELECT id, name FROM testers
) t ON f.tester_id = t.id WHERE f.fails > 3;

-- Same query, much clearer with CTE:
WITH bug_counts AS (
    SELECT tester_id, COUNT(*) AS fails
    FROM bugs WHERE status = 'FAIL'
    GROUP BY tester_id
)
SELECT t.name, bc.fails
FROM bug_counts bc
JOIN testers t ON bc.tester_id = t.id
WHERE bc.fails > 3;`},{type:"qa",question:"Q13: How does a transaction work? What are ACID properties?",answer:`A transaction is a sequence of operations treated as a single unit — either ALL succeed or NONE do.

ACID:
Atomicity: All or nothing — one failure rolls back everything.
Consistency: Transaction moves DB from one valid state to another.
Isolation: Concurrent transactions don't see each other's in-progress changes.
Durability: Committed data survives crashes (written to disk).`,code:`-- Transfer money example (classic ACID test):
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;   -- debit
UPDATE accounts SET balance = balance + 500 WHERE id = 2;   -- credit

-- Verify (within transaction):
SELECT balance FROM accounts WHERE id IN (1, 2);

COMMIT;   -- persist if OK
-- ROLLBACK; -- undo both updates if something went wrong`},{type:"qa",question:"Q14: What is SQL injection and how do parameterized queries prevent it?",answer:`SQL injection: user-supplied input is interpreted as SQL code, allowing attackers to bypass authentication, read all data, or drop tables.

Parameterized queries (prepared statements) pass values as DATA separately from the SQL structure. The DB engine escapes the values automatically — they can never be interpreted as SQL code regardless of content.`,code:`# VULNERABLE — username input directly in SQL string:
username = "' OR '1'='1"
query = f"SELECT * FROM users WHERE username = '{username}'"
# Becomes: WHERE username = '' OR '1'='1' → returns ALL users!

# SAFE — parameterized query:
cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
# The ? placeholder means username is always treated as a string value,
# never as SQL code. Injection is impossible.`},{type:"qa",question:"Q15: How would you optimize a slow query?",answer:`1. Run EXPLAIN/EXPLAIN ANALYZE to see the query plan — look for "full table scan" (type:ALL) and NULL indexes.
2. Add appropriate indexes on WHERE columns, JOIN columns.
3. Rewrite subqueries as JOINs when possible.
4. Select only needed columns instead of SELECT *.
5. Use LIMIT to reduce result size.
6. For aggregations, ensure GROUP BY columns are indexed.
7. For complex queries, use CTEs for clarity and potential query plan hints.
8. Check for missing FK indexes.
9. Consider EXPLAIN output after each change to verify improvement.`,code:`-- Step 1: Identify slow query
EXPLAIN SELECT t.name, COUNT(b.id) bugs
FROM testers t LEFT JOIN bugs b ON t.id = b.tester_id
WHERE b.created_at > '2024-01-01'
GROUP BY t.id, t.name;
-- Shows: type=ALL on bugs table, key=NULL

-- Step 2: Add missing indexes
CREATE INDEX idx_bugs_tester  ON bugs(tester_id);
CREATE INDEX idx_bugs_created ON bugs(created_at);

-- Step 3: Re-check
EXPLAIN SELECT ...  -- Now shows type=ref, using indexes`}]},{title:"📝 Practice Exercises & Quick Reference",blocks:[{type:"heading",text:"Practice Exercises"},{type:"exercise",difficulty:"🟢 Beginner",title:"Exercise 1: Query Failed Test Runs",description:"Given a test_runs table with columns: id, test_name, status (PASS/FAIL/SKIP), duration_ms, run_date. Write THREE queries: (a) all failed runs today, (b) count of each status, (c) slowest 3 tests.",hint:'Use WHERE status="FAIL" AND DATE(run_date)=CURDATE(). For counts use GROUP BY status. For slowest use ORDER BY duration_ms DESC LIMIT 3.',solution:`-- (a) Failed runs today:
SELECT test_name, duration_ms, run_date
FROM test_runs
WHERE status = 'FAIL'
  AND DATE(run_date) = CURDATE()
ORDER BY duration_ms DESC;

-- (b) Count by status:
SELECT status, COUNT(*) AS count
FROM test_runs
GROUP BY status
ORDER BY count DESC;

-- (c) Slowest 3 tests:
SELECT test_name, duration_ms
FROM test_runs
ORDER BY duration_ms DESC
LIMIT 3;`,explanation:"DATE() extracts just the date part of a DATETIME. CURDATE() returns today. These are MySQL functions — PostgreSQL uses CURRENT_DATE."},{type:"exercise",difficulty:"🟡 Intermediate",title:"Exercise 2: Multi-Table Join",description:"You have three tables: users (id, name, email), test_cases (id, title, category), results (id, user_id, test_case_id, status, run_date). Write a query showing: tester name, test case title, status, and run_date — only for tests run in the last 30 days, ordered by most recent first.",hint:"JOIN all 3 tables. users→results on user_id, test_cases→results on test_case_id. Use WHERE run_date >= NOW() - INTERVAL 30 DAY.",solution:`SELECT
    u.name         AS tester,
    tc.title       AS test_case,
    tc.category,
    r.status,
    r.run_date
FROM results r
JOIN users      u  ON r.user_id      = u.id
JOIN test_cases tc ON r.test_case_id = tc.id
WHERE r.run_date >= NOW() - INTERVAL 30 DAY
ORDER BY r.run_date DESC;`,explanation:'Start from the "results" table (the junction table linking users and test_cases) and JOIN outward. This avoids accidental cartesian products.'},{type:"exercise",difficulty:"🔴 Advanced",title:"Exercise 3: CTE + Window Function — Rank Testers by Pass Rate",description:"Using the results table (user_id, status, sprint), write a query that ranks testers by their pass rate PER SPRINT using a CTE to calculate stats and RANK() window function. Show: sprint, tester name, total tests, pass count, pass rate %, rank within sprint.",hint:"CTE: GROUP BY sprint, user_id to get counts. Then JOIN users for names. Then add RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC).",solution:`WITH sprint_stats AS (
    SELECT
        sprint,
        user_id,
        COUNT(*)                                  AS total,
        SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) AS passed
    FROM results
    GROUP BY sprint, user_id
),
sprint_rates AS (
    SELECT
        s.sprint,
        u.name    AS tester,
        s.total,
        s.passed,
        ROUND(s.passed * 100.0 / s.total, 1) AS pass_rate
    FROM sprint_stats s
    JOIN users u ON s.user_id = u.id
)
SELECT
    sprint,
    tester,
    total,
    passed,
    pass_rate,
    RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) AS rank_in_sprint
FROM sprint_rates
ORDER BY sprint, rank_in_sprint;`,explanation:"Two CTEs: first aggregates raw counts, second calculates rate and joins user names. The final SELECT adds the window function. Splitting into CTEs makes each step debuggable."},{type:"heading",text:"Quick Reference Card"},{type:"table",headers:["Command","Syntax","Purpose"],rows:[["SELECT","SELECT col FROM tbl WHERE cond","Read data from table"],["INSERT","INSERT INTO tbl (cols) VALUES (...)","Add new rows"],["UPDATE","UPDATE tbl SET col=val WHERE cond","Modify existing rows"],["DELETE","DELETE FROM tbl WHERE cond","Remove rows"],["CREATE TABLE","CREATE TABLE t (id INT PRIMARY KEY, ...)","Define a new table"],["JOIN (INNER)","JOIN t2 ON t1.id = t2.fk","Match rows in both tables"],["LEFT JOIN","LEFT JOIN t2 ON t1.id = t2.fk","All left rows + matched right"],["GROUP BY","GROUP BY col HAVING COUNT(*) > N","Aggregate + filter groups"],["ORDER BY","ORDER BY col DESC LIMIT N","Sort and limit results"],["COUNT/SUM/AVG","SELECT COUNT(*), AVG(col)","Aggregate functions"],["NULL check","WHERE col IS NULL","Find missing values"],["COALESCE","COALESCE(col, default)","Replace NULL with default"],["CTE","WITH name AS (SELECT ...) SELECT ...","Named temp subquery"],["Window RANK","RANK() OVER (PARTITION BY ... ORDER BY ...)","Rank within groups"],["EXPLAIN","EXPLAIN SELECT ...","Show query execution plan"]]},{type:"tip",content:"Bookmark db-fiddle.com for quick experiments. Always test your WHERE clause with a SELECT before running DELETE or UPDATE — one missing WHERE can wipe your entire table."}]}],jg={title:"🗄️ SQL",subtitle:"Sıfırdan Veritabanı Test Uzmanına",intro:"SQL'i test otomasyonu için öğrenin — backend durumunu doğrulamak, test verisi eklemek, bütünlüğü kontrol etmek ve her SQL mülakatını geçmek için. Önceden veritabanı deneyimi gerekmez."},Cg=["🎯 Giriş","📦 Kurulum","🟢 Temeller","🟡 Orta Seviye","🔴 İleri Seviye","🧪 QA Kullanım","💼 Mülakat","📝 Pratik & Referans"],Pg={title:"🗄️ SQL",subtitle:"From Zero to Database Testing Expert",intro:"Master SQL for test automation — query databases to verify backend state, seed test data, validate integrity, and pass any SQL interview. No prior database experience needed."},Rg=["🎯 Intro & Why","📦 Installation","🟢 Foundations","🟡 Intermediate","🔴 Advanced","🧪 QA Use Cases","💼 Interview Q&A","📝 Practice & Reference"],Ag={en:{hero:Pg,tabs:Rg,sections:Ul},tr:{hero:jg,tabs:Cg,sections:Ul}};function Lg(){return n.jsx(Ws,{data:Ag,gradient:"from-blue-600 to-cyan-600",bgLight:"bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50"})}const Fl=[{title:"Intro & Why TypeScript",blocks:[{type:"heading",content:"TypeScript vs JavaScript"},{type:"text",content:"TypeScript is a statically typed superset of JavaScript developed by Microsoft. Every valid JavaScript file is also valid TypeScript — you adopt it incrementally without rewriting your entire codebase. TypeScript adds a compile step that catches type errors, undefined property accesses, and wrong argument types before your code ever runs, turning runtime surprises into development-time feedback."},{type:"heading",content:"Why TypeScript for Test Automation?",difficulty:"🟢 Beginner"},{type:"grid",cols:3,items:[{icon:"🐛",label:"Catch Errors Early",desc:"Type errors surface at compile time in your IDE — not at 2 AM when a test suite fails in CI."},{icon:"💡",label:"IDE Autocomplete",desc:"Full IntelliSense for Playwright's Page, Locator, Browser, and your own Page Objects — no more guessing method names."},{icon:"🔧",label:"Safe Refactoring",desc:"Rename a method or change a selector type and TypeScript instantly highlights every affected call site."},{icon:"📖",label:"Self-Documenting Code",desc:"Type signatures act as inline documentation. A function typed `(user: User): Promise<void>` explains itself without comments."},{icon:"👥",label:"Team Scale",desc:"Large QA teams benefit most — typed interfaces enforce contracts between page objects, fixtures, and test data factories."},{icon:"🎭",label:"Playwright Native",desc:"Playwright is written in TypeScript and ships first-class .d.ts definitions. TypeScript is the officially recommended language for Playwright."}]},{type:"heading",content:"TypeScript vs JavaScript: Feature Comparison"},{type:"table",headers:["Feature","JavaScript","TypeScript"],rows:[["Type safety","None (dynamic)","Static, optional"],["IDE support","Basic","Full IntelliSense + autocomplete"],["Compile step","None — runs directly","tsc compiles to .js"],["Learning curve","Low","Low→Medium (types add concepts)"],["Playwright support","Supported","First-class, recommended"],["Error detection time","Runtime (tests fail)","Compile time (before running)"]]},{type:"heading",content:"TypeScript in the Testing Ecosystem"},{type:"table",headers:["Tool","TS Support","Notes"],rows:[["Playwright","First-class","Written in TS; all types ship in the package"],["Jest","Excellent (via ts-jest)","Install ts-jest + @types/jest"],["Cypress","Good","Include tsconfig; some any-heavy internals"],["Vitest","Native","Built on Vite; zero-config TypeScript"]]},{type:"tip",content:"If you're starting a new Playwright project today, choose TypeScript from the first `npm init playwright@latest` prompt. Retrofitting types into a large JS test suite is far harder than starting typed."}]},{title:"Installation & Setup",blocks:[{type:"heading",content:"Step 1 — Install Node.js LTS",difficulty:"🟢 Beginner"},{type:"text",content:"TypeScript runs on Node.js. Always install the LTS (Long-Term Support) release — it is the most stable version and is what CI/CD environments use. Download from https://nodejs.org and choose the 'LTS' button."},{type:"steps",items:["Windows: download the .msi installer from nodejs.org, run it, leave all defaults, tick 'Add to PATH'","macOS: use Homebrew — `brew install node` — or download the .pkg from nodejs.org","Linux (Ubuntu/Debian): `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`","Verify both tools are installed by running the commands below"]},{type:"code",language:"bash",label:"Verify Node.js and npm",content:`# Check Node.js version (should be 18.x or 20.x LTS)
node --version
# Expected: v20.11.0

# Check npm (Node Package Manager) version
npm --version
# Expected: 10.2.4`,expected:`v20.11.0
10.2.4`},{type:"heading",content:"Step 2 — Install TypeScript Globally"},{type:"code",language:"bash",label:"Global TypeScript install",content:`# Install TypeScript compiler globally (available everywhere on your machine)
npm install -g typescript

# Verify the TypeScript compiler is installed
tsc --version
# Expected: Version 5.4.5`,expected:"Version 5.4.5"},{type:"heading",content:"Step 3 — Create tsconfig.json"},{type:"text",content:"tsconfig.json tells the TypeScript compiler how to compile your project. Every TypeScript project needs one. You can generate a starter with `tsc --init`, or use the annotated template below which is optimised for Playwright."},{type:"code",language:"json",label:"tsconfig.json — fully annotated",content:`{
  "compilerOptions": {
    // ── Output ──────────────────────────────────
    "target": "ES2022",          // Compile to modern JS (Node 18+ understands this)
    "module": "commonjs",        // Use require() style modules (Node default)
    "outDir": "./dist",          // Compiled .js files go into the dist/ folder
    "rootDir": "./src",          // Where your .ts source files live

    // ── Type Checking ────────────────────────────
    "strict": true,              // Enable ALL strict type checks (recommended)
    "noImplicitAny": true,       // Error on variables that implicitly get type 'any'
    "strictNullChecks": true,    // null and undefined are not assignable to other types
    "noUnusedLocals": true,      // Error on variables declared but never used
    "noUnusedParameters": true,  // Error on function parameters never used

    // ── Module Resolution ────────────────────────
    "moduleResolution": "node",  // Use Node.js module resolution algorithm
    "esModuleInterop": true,     // Allow default imports from CommonJS modules
    "resolveJsonModule": true,   // Allow import of .json files with type safety
    "baseUrl": ".",              // Base path for non-relative imports

    // ── Source Maps ──────────────────────────────
    "sourceMap": true,           // Generate .js.map files for debugging

    // ── Miscellaneous ────────────────────────────
    "lib": ["ES2022"],           // Include built-in type definitions for ES2022
    "skipLibCheck": true,        // Skip type checking of .d.ts files in node_modules
    "forceConsistentCasingInFileNames": true  // Prevent cross-OS import case bugs
  },
  "include": ["src/**/*", "tests/**/*"],   // Which files to compile
  "exclude": ["node_modules", "dist"]       // Which files to skip
}`},{type:"heading",content:"Step 4 — VS Code Extensions"},{type:"list",items:[{label:"TypeScript Language Features",desc:"Extension ID: vscode.typescript-language-features — built in to VS Code, provides IntelliSense, go-to-definition, and refactoring."},{label:"ESLint",desc:"Extension ID: dbaeumer.vscode-eslint — lint TypeScript for code quality issues beyond type errors."},{label:"Prettier",desc:"Extension ID: esbenp.prettier-vscode — auto-format TypeScript on save."},{label:"Playwright Test for VS Code",desc:"Extension ID: ms-playwright.playwright — run and debug Playwright tests with a GUI directly inside VS Code."}]},{type:"heading",content:"Step 5 — Hello World in TypeScript"},{type:"code",language:"typescript",label:"index.ts — your first typed program",content:`// index.ts
// Typed 'Hello World' — note the explicit type annotations

// A function that takes a name (must be a string) and returns a string
function greet(name: string): string {
  return \`Hello, \${name}! Welcome to TypeScript.\`;
}

// TypeScript catches this before you run it:
// greet(42);  // Error: Argument of type 'number' is not assignable to 'string'

const message: string = greet("QA Engineer");
console.log(message);`,expected:"Hello, QA Engineer! Welcome to TypeScript."},{type:"code",language:"bash",label:"Compile and run",content:`# Step 1: Compile TypeScript to JavaScript
tsc index.ts
# This creates index.js in the same folder

# Step 2: Run the compiled JavaScript
node index.js
# Expected: Hello, QA Engineer! Welcome to TypeScript.`,expected:"Hello, QA Engineer! Welcome to TypeScript."},{type:"heading",content:"Step 6 — ts-node: Skip the Compile Step"},{type:"code",language:"bash",label:"Run TypeScript directly with ts-node",content:`# ts-node compiles and runs in one command — great for scripts and debugging
npx ts-node index.ts
# Expected: Hello, QA Engineer! Welcome to TypeScript.

# Install ts-node globally to avoid npx each time
npm install -g ts-node`,expected:"Hello, QA Engineer! Welcome to TypeScript."},{type:"heading",content:"Step 7 — Create a Playwright TypeScript Project"},{type:"steps",items:["Create a new folder: `mkdir my-playwright-project && cd my-playwright-project`","Run the Playwright installer: `npm init playwright@latest`","Prompt: 'Do you want to use TypeScript or JavaScript?' → Choose: TypeScript","Prompt: 'Where to put your end-to-end tests?' → Accept default: tests","Prompt: 'Add a GitHub Actions workflow?' → Choose: true (recommended)","Prompt: 'Install Playwright browsers?' → Choose: true","Wait for install — Playwright downloads Chromium, Firefox, and WebKit","Run the example test: `npx playwright test`","Open the HTML report: `npx playwright show-report`"]},{type:"code",language:"bash",label:"Full Playwright TypeScript setup from scratch",content:`# 1. Create project folder
mkdir my-playwright-project
cd my-playwright-project

# 2. Initialize Playwright (follow prompts: TypeScript, tests/, yes, yes)
npm init playwright@latest

# 3. Verify project structure was created
ls
# node_modules/   package.json   playwright.config.ts   tests/

# 4. Run the bundled example tests
npx playwright test

# 5. Open the rich HTML report in your browser
npx playwright show-report`},{type:"tip",content:"After `npm init playwright@latest`, open `playwright.config.ts` — it is already fully typed. Your tests in `tests/` will be `.spec.ts` files. You get full autocomplete for `page`, `expect`, `browser`, and every Playwright API immediately."}]},{title:"TypeScript Foundations",blocks:[{type:"heading",content:"TypeScript vs JavaScript: The Same Bug, Two Outcomes",difficulty:"🟢 Beginner"},{type:"code",language:"javascript",label:"JavaScript — error only visible at runtime",content:`// JavaScript: no compile step — this bug runs silently until tests fail
function getTestName(test) {
  return test.name.toUpperCase();   // What if test is null? Runtime crash!
}

getTestName(null);
// Runtime Error: Cannot read properties of null (reading 'name')
// You find this bug only when CI fails at 3 AM`,expected:"TypeError: Cannot read properties of null (reading 'name')"},{type:"code",language:"typescript",label:"TypeScript — error caught before you run",content:`// TypeScript: compile-time check catches the bug immediately in your editor
interface Test {
  name: string;   // name is required and must be a string
  id: number;
}

function getTestName(test: Test): string {
  return test.name.toUpperCase();   // Safe: TypeScript guarantees 'name' exists
}

// getTestName(null);
// Compile Error: Argument of type 'null' is not assignable to parameter of type 'Test'
// Your IDE shows a red squiggle — before you even save the file

getTestName({ name: "Login Test", id: 1 });`,expected:"LOGIN TEST"},{type:"heading",content:"Basic Types"},{type:"code",language:"typescript",label:"All fundamental TypeScript types with automation context",content:`// ── Primitive Types ─────────────────────────────────────────────

let testName: string = "Login flow test";         // text values
let retryCount: number = 3;                        // integers and floats
let headless: boolean = true;                      // true or false
let timeout: number = 30_000;                      // 30000ms — underscore separator for readability

// ── Avoid: any ───────────────────────────────────────────────────
// 'any' disables ALL type checking — it is the escape hatch that defeats the purpose of TypeScript
let dangerous: any = "I could be anything";        // compiler trusts you blindly
dangerous = 42;                                    // no error — types not checked
dangerous.nonExistentMethod();                     // no error at compile time — WILL crash at runtime
// Rule: Never use 'any' in production test code. Use 'unknown' instead if you truly don't know the type.

// ── void ─────────────────────────────────────────────────────────
// Used for functions that don't return a value
async function clickLoginButton(): Promise<void> { // returns nothing — just performs action
  // await page.click('#login');
}

// ── null and undefined ────────────────────────────────────────────
let pageTitle: string | null = null;               // could be a string OR null
let optionalSelector: string | undefined;          // declared but not yet assigned

// ── never ─────────────────────────────────────────────────────────
// A function that ALWAYS throws — it never returns normally
function failTest(message: string): never {
  throw new Error(\`Test failed: \${message}\`);       // always throws, never returns
}

console.log(testName);       // "Login flow test"
console.log(retryCount);     // 3
console.log(headless);       // true`,expected:`Login flow test
3
true`},{type:"heading",content:"Type Inference"},{type:"code",language:"typescript",label:"TypeScript infers types from initial values",content:`// Type inference — TypeScript figures out the type from the initial value
let testCount = 5;            // TypeScript infers: number
let suiteName = "Smoke";      // TypeScript infers: string
let isPassing = true;         // TypeScript infers: boolean
let durations = [120, 340];   // TypeScript infers: number[]

// Once inferred, the type is locked — same as explicit annotation
// testCount = "five";         // Error: Type 'string' is not assignable to type 'number'

// Explicit annotation — use when the initial value doesn't carry the right type
let baseUrl: string;          // declared without value — MUST annotate explicitly
baseUrl = "https://staging.example.com";

// Function return type inference
function add(a: number, b: number) {
  return a + b;               // TypeScript infers return type: number
}

const result = add(2, 3);     // result is inferred as: number
console.log(result);`,expected:"5"},{type:"heading",content:"Arrays"},{type:"code",language:"typescript",label:"Typed arrays in test automation",content:`// Two equivalent syntaxes for typed arrays
const browsers: string[] = ["chromium", "firefox", "webkit"];   // syntax 1
const retries: Array<number> = [1, 2, 3];                       // syntax 2 (generic)

// Arrays are typed — wrong element type is caught at compile time
// browsers.push(42);   // Error: Argument of type 'number' not assignable to 'string'

// Array of objects — typed with an interface
interface TestCase {
  id: number;
  title: string;
  passed: boolean;
}

const testResults: TestCase[] = [
  { id: 1, title: "Login", passed: true },
  { id: 2, title: "Checkout", passed: false },
];

// Iterate with full type safety — IDE knows every property on 'test'
testResults.forEach((test) => {
  console.log(\`\${test.id}: \${test.title} — \${test.passed ? "PASS" : "FAIL"}\`);
});`,expected:`1: Login — PASS
2: Checkout — FAIL`},{type:"heading",content:"Tuples"},{type:"code",language:"typescript",label:"Tuples — fixed-length, mixed-type arrays",content:`// A tuple is an array with a FIXED number of elements and FIXED types at each position
// Use case 1: CSV row (column values in known order)
type CsvRow = [string, number, boolean];   // name, score, passed
const row: CsvRow = ["Test Login", 95, true];

// Use case 2: test data pair — input and expected output
type TestPair = [string, string];           // [input, expectedOutput]
const loginPair: TestPair = ["admin@test.com", "Dashboard"];

// Use case 3: coordinate-style — environment + URL
type EnvConfig = [string, string, number]; // [envName, baseUrl, port]
const staging: EnvConfig = ["staging", "https://staging.myapp.com", 443];

// Destructuring tuples — name each position for readability
const [envName, baseUrl, port] = staging;
console.log(\`Environment: \${envName}\`);  // Environment: staging
console.log(\`URL: \${baseUrl}:\${port}\`);  // URL: https://staging.myapp.com:443`,expected:`Environment: staging
URL: https://staging.myapp.com:443`},{type:"heading",content:"Enums — String Enums Are Best for Tests"},{type:"code",language:"typescript",label:"String enums vs number enums — why string enums win in testing",content:`// ── Number Enum (avoid in tests) ─────────────────────────────────
enum StatusNum {
  PASS,   // 0
  FAIL,   // 1
  SKIP,   // 2
}
console.log(StatusNum.PASS);   // 0  — meaningless in test logs and reports

// ── String Enum (prefer in tests) ─────────────────────────────────
// String enums produce human-readable output in logs, reports, and error messages
enum TestStatus {
  PASS = "PASS",
  FAIL = "FAIL",
  SKIP = "SKIP",
  BLOCKED = "BLOCKED",
}

enum Browser {
  CHROMIUM = "chromium",
  FIREFOX = "firefox",
  WEBKIT = "webkit",
}

enum Environment {
  DEV = "development",
  STAGING = "staging",
  PROD = "production",
}

// Usage — these read clearly in test output
const result: TestStatus = TestStatus.PASS;
const env: Environment = Environment.STAGING;

console.log(\`Status: \${result}\`);    // Status: PASS   (readable!)
console.log(\`Env: \${env}\`);          // Env: staging   (readable!)

// Enum as parameter type — prevents typos
function runTests(browser: Browser): void {
  console.log(\`Running on \${browser}\`);
}
runTests(Browser.CHROMIUM);          // Running on chromium
// runTests("chrome");               // Error! 'chrome' is not assignable to type 'Browser'`,expected:`Status: PASS
Env: staging
Running on chromium`},{type:"heading",content:"Interfaces"},{type:"code",language:"typescript",label:"Interfaces — defining shapes for test data and page objects",content:`// An interface defines the SHAPE of an object — what properties it must have
interface User {
  id: number;           // required — every User must have an id
  email: string;        // required
  password: string;     // required
  role?: string;        // optional — the '?' means it might not exist
  readonly token: string; // readonly — can be set once, never mutated
}

// Using the interface — TypeScript validates the object matches the shape
const testUser: User = {
  id: 1,
  email: "admin@example.com",
  password: "Secret123",
  token: "abc-xyz-789",
  // role is optional — fine to omit
};

// testUser.token = "new-token";  // Error: Cannot assign to 'token' — it is read-only

// Interfaces can extend other interfaces (inheritance)
interface AdminUser extends User {
  permissions: string[];   // AdminUser has everything User has, plus permissions
  department: string;
}

const admin: AdminUser = {
  id: 2,
  email: "admin@corp.com",
  password: "Admin456",
  token: "admin-token",
  permissions: ["read", "write", "delete"],
  department: "QA",
};

console.log(\`User: \${testUser.email}\`);
console.log(\`Admin dept: \${admin.department}\`);`,expected:`User: admin@example.com
Admin dept: QA`},{type:"heading",content:"Type Aliases vs Interfaces"},{type:"code",language:"typescript",label:"type vs interface — when to use which",content:`// ── Type Alias ─────────────────────────────────────────────────────
// 'type' is more flexible — supports unions, intersections, tuples, primitives
type TestId = string | number;             // union — can be either
type Coordinates = [number, number];        // tuple
type Status = "pass" | "fail" | "skip";    // string literal union

// 'type' cannot be reopened / merged
type Config = { baseUrl: string };
// type Config = { timeout: number };       // Error: Duplicate identifier 'Config'

// ── Interface ───────────────────────────────────────────────────────
// 'interface' supports declaration merging — reopen and add properties
interface TestConfig {
  baseUrl: string;
}
interface TestConfig {
  timeout: number;   // Merged! TestConfig now has BOTH baseUrl AND timeout
}
const config: TestConfig = { baseUrl: "https://example.com", timeout: 30000 };

// ── Rule of Thumb ────────────────────────────────────────────────────
// Use 'interface' for: object shapes, class contracts, public API types
// Use 'type' for: unions, intersections, primitives, tuples, computed types

type BrowserName = "chromium" | "firefox" | "webkit";   // literal union — use type
interface PageObject {                                    // class shape — use interface
  navigate(url: string): Promise<void>;
}

console.log(config.baseUrl);    // https://example.com
console.log(config.timeout);    // 30000`,expected:`https://example.com
30000`},{type:"heading",content:"Interactive Example: TestResult Interface + TestCase Enum"},{type:"code",language:"typescript",label:"Full typed test result object",content:`// Putting it all together — enum + interface + typed array

// Enum for test case status (string values for readable output)
enum TestStatus {
  PASS = "PASS",
  FAIL = "FAIL",
  SKIP = "SKIP",
}

// Interface defining the shape of a test result
interface TestResult {
  readonly id: number;        // immutable after creation
  title: string;              // test case title
  status: TestStatus;         // must be one of the enum values
  duration: number;           // execution time in ms
  errorMessage?: string;      // optional — only present when status is FAIL
}

// Create strongly typed test results
const results: TestResult[] = [
  { id: 1, title: "Login with valid credentials", status: TestStatus.PASS, duration: 1240 },
  { id: 2, title: "Login with invalid password",  status: TestStatus.FAIL, duration: 890, errorMessage: "Expected URL /dashboard, got /login" },
  { id: 3, title: "Register new user",            status: TestStatus.SKIP, duration: 0 },
];

// Type-safe iteration — IDE knows every field
results.forEach((r) => {
  const err = r.errorMessage ? \` — \${r.errorMessage}\` : "";
  console.log(\`[\${r.status}] \${r.title} (\${r.duration}ms)\${err}\`);
});`,expected:`[PASS] Login with valid credentials (1240ms)
[FAIL] Login with invalid password (890ms) — Expected URL /dashboard, got /login
[SKIP] Register new user (0ms)`}]},{title:"Intermediate TypeScript",blocks:[{type:"heading",content:"Typed Functions",difficulty:"🟡 Intermediate"},{type:"code",language:"typescript",label:"Function type annotations — params, return type, optional, default",content:`// ── Basic typed function ─────────────────────────────────────────
function navigateTo(url: string): Promise<void> {   // param type, return type
  console.log(\`Navigating to: \${url}\`);
  return Promise.resolve();
}

// ── Optional parameter (?) ────────────────────────────────────────
function login(email: string, password: string, remember?: boolean): void {
  const rememberMe = remember ?? false;   // use ?? to handle undefined
  console.log(\`Login: \${email}, remember: \${rememberMe}\`);
}
login("user@test.com", "pass");           // 'remember' is undefined — OK
login("user@test.com", "pass", true);     // 'remember' is true

// ── Default parameter ─────────────────────────────────────────────
function retry(action: () => Promise<void>, times: number = 3): void {
  console.log(\`Will retry up to \${times} times\`);
}
retry(async () => {});          // uses default 3
retry(async () => {}, 5);       // overrides to 5

// ── Arrow function with types ─────────────────────────────────────
const getTitle = async (url: string): Promise<string> => {
  return \`Page title for \${url}\`;
};

// ── Function type as a variable type ─────────────────────────────
type TestStep = (page: string) => Promise<void>;   // describes a function shape
const clickLogin: TestStep = async (page) => {
  console.log(\`Clicking login on \${page}\`);
};

login("user@test.com", "pass");`,expected:"Login: user@test.com, remember: false"},{type:"heading",content:"Union and Intersection Types"},{type:"code",language:"typescript",label:"Union (|) and intersection (&) types",content:`// ── Union Types — value can be ONE of several types ──────────────
type TestId = string | number;            // can be "TC-001" or 1
type Status = "pass" | "fail" | "skip";   // literal string union
type MaybeString = string | null;         // string or null

function formatId(id: TestId): string {
  // Union forces you to handle both cases
  if (typeof id === "number") {
    return \`TC-\${id.toString().padStart(3, "0")}\`;  // TC-001
  }
  return id;   // already a string
}

console.log(formatId(1));       // TC-001
console.log(formatId("TC-99")); // TC-99

// ── Intersection Types — value must satisfy ALL types simultaneously ──
interface HasId    { id: number }
interface HasTitle { title: string }
interface HasStatus { status: Status }

// TestCase must have id AND title AND status
type TestCase = HasId & HasTitle & HasStatus;

const tc: TestCase = { id: 1, title: "Checkout flow", status: "pass" };
console.log(\`\${tc.id}: \${tc.title} [\${tc.status}]\`);  // 1: Checkout flow [pass]

// ── Nullable types in function return ──────────────────────────────
function findTest(id: number, tests: TestCase[]): TestCase | null {
  return tests.find(t => t.id === id) ?? null;   // null if not found
}`,expected:`TC-001
TC-99
1: Checkout flow [pass]`},{type:"heading",content:"Type Guards"},{type:"code",language:"typescript",label:"typeof, instanceof, and 'in' type guards",content:`// Type guards narrow a union type to a specific type inside a branch

// ── typeof guard — for primitives ────────────────────────────────
function printTestId(id: string | number): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());   // TypeScript knows: id is string here
  } else {
    console.log(id.toFixed(0));      // TypeScript knows: id is number here
  }
}
printTestId("tc-001");   // TC-001
printTestId(42);         // 42

// ── instanceof guard — for class instances ─────────────────────────
class NetworkError extends Error {
  statusCode: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.statusCode = code;
  }
}
class TimeoutError extends Error {
  timeoutMs: number;
  constructor(msg: string, ms: number) {
    super(msg);
    this.timeoutMs = ms;
  }
}

function handleTestError(err: NetworkError | TimeoutError): void {
  if (err instanceof NetworkError) {
    console.log(\`Network error \${err.statusCode}: \${err.message}\`);
  } else {
    console.log(\`Timeout after \${err.timeoutMs}ms: \${err.message}\`);
  }
}

handleTestError(new NetworkError("Not Found", 404));   // Network error 404: Not Found

// ── 'in' guard — check if property exists ─────────────────────────
interface UITest   { selector: string; page: string }
interface ApiTest  { endpoint: string; method: string }

function describeTest(test: UITest | ApiTest): void {
  if ("selector" in test) {
    console.log(\`UI test: \${test.selector} on \${test.page}\`);
  } else {
    console.log(\`API test: \${test.method} \${test.endpoint}\`);
  }
}`,expected:`TC-001
42
Network error 404: Not Found`},{type:"heading",content:"Generics"},{type:"code",language:"typescript",label:"Generic functions and interfaces for reusable test utilities",content:`// Generics let you write ONE function/interface that works with ANY type
// while preserving full type information (unlike 'any' which throws it away)

// ── Generic function ───────────────────────────────────────────────
function first<T>(items: T[]): T | undefined {
  return items[0];   // T is preserved — return type matches input element type
}

const firstBrowser = first(["chromium", "firefox"]);   // inferred: string | undefined
const firstId      = first([1, 2, 3]);                  // inferred: number | undefined

// ── Generic interface ──────────────────────────────────────────────
interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
  timestamp: string;
}

interface UserData { id: number; name: string; email: string }
const userResponse: ApiResponse<UserData> = {
  data: { id: 1, name: "Alice", email: "alice@test.com" },
  status: 200,
  ok: true,
  timestamp: "2024-01-01T00:00:00Z",
};

console.log(userResponse.data.name);   // Alice — typed correctly

// ── Generic constraints (T extends ...) ────────────────────────────
// Constrain T so we know it has at least the properties we need
interface HasId { id: number }

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const found = findById(users, 1);
console.log(found?.name);   // Alice`,expected:`Alice
Alice`},{type:"heading",content:"Classes with Access Modifiers"},{type:"code",language:"typescript",label:"TypeScript class modifiers in a Page Object context",content:`// Access modifiers control visibility:
// public    — accessible anywhere (default)
// private   — only accessible inside this class
// protected — accessible inside this class and subclasses
// readonly  — can be set in constructor, never changed after

class BasePage {
  protected readonly baseUrl: string;    // subclasses can read it, no one can change it
  private _isLoaded: boolean = false;    // internal state — no outside access
  public readonly name: string;          // public + readonly — visible, immutable

  constructor(baseUrl: string, name: string) {
    this.baseUrl = baseUrl;   // set in constructor — readonly allows this
    this.name = name;
  }

  // private method — only this class can call it
  private log(message: string): void {
    console.log(\`[\${this.name}] \${message}\`);
  }

  // protected method — this class and subclasses can call it
  protected async waitForLoad(): Promise<void> {
    this._isLoaded = true;
    this.log("Page loaded");
  }

  // public method — anyone can call it
  public async navigate(): Promise<void> {
    this.log(\`Navigating to \${this.baseUrl}\`);
    await this.waitForLoad();
  }
}

class LoginPage extends BasePage {
  constructor(baseUrl: string) {
    super(baseUrl, "LoginPage");
  }

  async login(email: string, password: string): Promise<void> {
    console.log(\`Logging in as \${email}\`);
    await this.waitForLoad();    // protected — OK from subclass
    // this._isLoaded;           // Error — private, not accessible here
    // this.log("test");         // Error — private, not accessible here
  }
}

const page = new LoginPage("https://example.com");
page.navigate();
// page._isLoaded;               // Error — private
// page.waitForLoad();           // Error — protected`,expected:`[LoginPage] Navigating to https://example.com
[LoginPage] Page loaded`},{type:"heading",content:"Abstract Classes — Base POM Pattern"},{type:"code",language:"typescript",label:"Abstract class as reusable Page Object base",content:`// Abstract classes define shared structure but CANNOT be instantiated directly
// Perfect for Page Object base classes — every page shares navigate() but implements getTitle() differently

abstract class PageBase {
  constructor(protected readonly url: string) {}

  // Concrete method — shared by all pages
  async navigate(): Promise<void> {
    console.log(\`Navigating to: \${this.url}\`);
  }

  // Abstract method — each subclass MUST implement this
  abstract getTitle(): string;

  // Abstract method — each page has a different heading selector
  abstract getHeadingSelector(): string;
}

class HomePage extends PageBase {
  constructor() {
    super("/");
  }

  getTitle(): string {
    return "Home — My App";   // must implement — or TypeScript compile error
  }

  getHeadingSelector(): string {
    return "h1.hero-title";
  }
}

class LoginPage2 extends PageBase {
  constructor() {
    super("/login");
  }

  getTitle(): string {
    return "Login — My App";
  }

  getHeadingSelector(): string {
    return "h1.login-heading";
  }
}

// const base = new PageBase("/");   // Error: Cannot create an instance of an abstract class
const home = new HomePage();
console.log(home.getTitle());          // Home — My App
console.log(home.getHeadingSelector()); // h1.hero-title`,expected:`Home — My App
h1.hero-title`},{type:"heading",content:"Modules: Export, Import, and Barrel Files"},{type:"code",language:"typescript",label:"Module patterns for Playwright test projects",content:`// ── Named exports (pages/LoginPage.ts) ──────────────────────────────
export interface LoginCredentials {
  email: string;
  password: string;
}

export class LoginPage {
  async login(creds: LoginCredentials): Promise<void> {
    console.log(\`Logging in: \${creds.email}\`);
  }
}

// ── Default export (pages/HomePage.ts) ───────────────────────────────
// export default class HomePage { ... }

// ── Re-exports / Barrel file (pages/index.ts) ────────────────────────
// A barrel file re-exports everything so callers import from one place:
// export { LoginPage, LoginCredentials } from './LoginPage';
// export { default as HomePage } from './HomePage';
// export { ProductPage } from './ProductPage';

// ── Importing ────────────────────────────────────────────────────────
// import { LoginPage, LoginCredentials } from './pages';     // from barrel
// import { LoginPage } from './pages/LoginPage';             // direct
// import type { LoginCredentials } from './pages/LoginPage'; // type-only import (no runtime code)

const creds: LoginCredentials = { email: "qa@test.com", password: "Pass123" };
const login = new LoginPage();
login.login(creds);`,expected:"Logging in: qa@test.com"},{type:"heading",content:"Interactive Example: Typed Page Object with Interface"},{type:"code",language:"typescript",label:"Full typed Page Object base class",content:`// A production-ready, fully typed Page Object base class

interface IPage {
  navigate(): Promise<void>;
  isLoaded(): Promise<boolean>;
}

class TypedPageBase implements IPage {
  // private: internal locator strings — only this class accesses them
  private readonly loadedSelector: string;

  // constructor shorthand: 'protected' creates + assigns in one line
  constructor(
    protected readonly baseUrl: string,
    protected readonly path: string,
    loadedSelector: string
  ) {
    this.loadedSelector = loadedSelector;
  }

  // Satisfies IPage contract
  async navigate(): Promise<void> {
    const fullUrl = \`\${this.baseUrl}\${this.path}\`;
    console.log(\`→ Navigate to: \${fullUrl}\`);
  }

  // Satisfies IPage contract
  async isLoaded(): Promise<boolean> {
    console.log(\`→ Checking selector: \${this.loadedSelector}\`);
    return true;   // would be: await page.locator(this.loadedSelector).isVisible()
  }

  // Reusable helper for all pages
  protected async waitAndVerify(): Promise<void> {
    const loaded = await this.isLoaded();
    if (!loaded) throw new Error(\`Page not loaded: \${this.path}\`);
    console.log(\`→ Page verified: \${this.path}\`);
  }
}

class CheckoutPage extends TypedPageBase {
  constructor(baseUrl: string) {
    super(baseUrl, "/checkout", "h1.checkout-title");
  }

  async fillShippingForm(name: string, address: string): Promise<void> {
    console.log(\`→ Filling shipping: \${name}, \${address}\`);
    await this.waitAndVerify();
  }
}

const checkout = new CheckoutPage("https://staging.example.com");
checkout.navigate();
checkout.fillShippingForm("Alice", "123 Main St");`,expected:`→ Navigate to: https://staging.example.com/checkout
→ Filling shipping: Alice, 123 Main St
→ Checking selector: h1.checkout-title
→ Page verified: /checkout`}]},{title:"Advanced TypeScript",blocks:[{type:"heading",content:"Utility Types",difficulty:"🔴 Advanced"},{type:"code",language:"typescript",label:"Built-in utility types for test automation patterns",content:`// TypeScript ships utility types that transform existing types
// — these are the most useful ones for test automation

interface TestConfig {
  baseUrl: string;
  timeout: number;
  headless: boolean;
  retries: number;
  reporter: string;
}

// Partial<T> — all properties become optional (great for config overrides)
type PartialConfig = Partial<TestConfig>;
const devOverride: PartialConfig = { headless: false };   // only override what you need

// Required<T> — all optional properties become required
interface MaybeUser { name?: string; email?: string }
type FullUser = Required<MaybeUser>;   // name and email are now required

// Pick<T, K> — pick only specific properties
type NetworkConfig = Pick<TestConfig, "baseUrl" | "timeout">;
const net: NetworkConfig = { baseUrl: "https://api.example.com", timeout: 5000 };

// Omit<T, K> — remove specific properties
type ConfigWithoutRetries = Omit<TestConfig, "retries" | "reporter">;

// Record<K, V> — typed key-value map
type BrowserTimeouts = Record<string, number>;
const timeouts: BrowserTimeouts = { chromium: 30000, firefox: 45000, webkit: 30000 };

// Readonly<T> — all properties become readonly (immutable)
type FrozenConfig = Readonly<TestConfig>;
const cfg: FrozenConfig = { baseUrl: "https://prod.com", timeout: 30000, headless: true, retries: 2, reporter: "html" };
// cfg.baseUrl = "changed";   // Error: Cannot assign to 'baseUrl' — it is read-only

// ReturnType<F> — extract the return type of a function
async function fetchUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "Alice" };
}
type UserResult = Awaited<ReturnType<typeof fetchUser>>;   // { id: number; name: string }

// Parameters<F> — extract the parameter types of a function
function createTest(title: string, tags: string[], timeout: number): void {}
type CreateTestParams = Parameters<typeof createTest>;     // [string, string[], number]

console.log(net.baseUrl);   // https://api.example.com`,expected:"https://api.example.com"},{type:"heading",content:"Conditional Types"},{type:"code",language:"typescript",label:"Conditional types — T extends U ? X : Y",content:`// Conditional types let you choose a type based on a condition
// Syntax: T extends U ? TrueType : FalseType

// ── Basic conditional type ────────────────────────────────────────
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>;   // "yes"
type B = IsString<number>;   // "no"

// ── NonNullable — built-in utility built with conditional types ───
type NonNullableT<T> = T extends null | undefined ? never : T;
type SafeString = NonNullableT<string | null>;   // string (null removed)

// ── Practical: IsAsync — detect if a function returns a Promise ──
type IsAsync<T> = T extends (...args: any[]) => Promise<any> ? true : false;
type CheckNav   = IsAsync<(url: string) => Promise<void>>;   // true
type CheckSync  = IsAsync<(x: number) => number>;             // false

// ── Unwrap a Promise type ────────────────────────────────────────
type Unwrap<T> = T extends Promise<infer U> ? U : T;
type StringResult = Unwrap<Promise<string>>;   // string
type NumberResult = Unwrap<number>;             // number (not a promise — passthrough)

// ── TestResponse — conditional return based on input ─────────────
type ApiResult<T, E extends boolean = false> =
  E extends true
    ? { error: string; data: null }
    : { error: null; data: T };

type SuccessResult = ApiResult<{ id: number }, false>;   // { error: null; data: { id: number } }
type ErrorResult   = ApiResult<never, true>;              // { error: string; data: null }

const ok: SuccessResult  = { error: null, data: { id: 1 } };
const err: ErrorResult   = { error: "Not Found", data: null };
console.log(ok.data.id);    // 1
console.log(err.error);     // Not Found`,expected:`1
Not Found`},{type:"heading",content:"Mapped Types"},{type:"code",language:"typescript",label:"Mapped types — transform every property of a type",content:`// Mapped types iterate over the keys of a type and produce a new type
// Syntax: { [K in keyof T]: NewType }

interface TestCase {
  title: string;
  timeout: number;
  tags: string[];
}

// Make every property a string (e.g. for serialization)
type Stringified<T> = { [K in keyof T]: string };
type StringTestCase = Stringified<TestCase>;
// Result: { title: string; timeout: string; tags: string; }

// Add readonly to every property
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] };
type ReadonlyTestCase = DeepReadonly<TestCase>;

// Make every property optional (same as built-in Partial<T>)
type Optional<T> = { [K in keyof T]?: T[K] };

// Make every property nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableTestCase = Nullable<TestCase>;

// ── Practical: form field validation types ────────────────────────
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Map each field to its validation error (string) or null (no error)
type FormErrors<T> = { [K in keyof T]: string | null };
type LoginErrors = FormErrors<LoginForm>;

const errors: LoginErrors = {
  email: "Invalid email format",
  password: null,               // no error
  rememberMe: null,
};

console.log(errors.email);      // Invalid email format
console.log(errors.password);   // null`,expected:`Invalid email format
null`},{type:"heading",content:"Template Literal Types"},{type:"code",language:"typescript",label:"Template literal types for typed string patterns",content:`// Template literal types use backtick syntax to build string types from other types
// They are like template literals but at the TYPE level

// ── Basic template literal type ───────────────────────────────────
type EventName = \`on\${string}\`;   // must start with "on"
const click: EventName = "onClick";
const hover: EventName = "onHover";
// const bad: EventName = "click";   // Error: "click" doesn't start with "on"

// ── Combining string literal unions ───────────────────────────────
type Action   = "click" | "fill" | "check";
type Target   = "Button" | "Input" | "Checkbox";
type StepName = \`\${Action}\${Target}\`;
// StepName = "clickButton" | "clickInput" | "clickCheckbox" | "fillButton" | ...

// ── API route typing ──────────────────────────────────────────────
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiPath    = \`/api/\${string}\`;
type ApiRoute   = \`\${HttpMethod} \${ApiPath}\`;

const route: ApiRoute = "GET /api/users";
// const bad2: ApiRoute = "PATCH /api/users";  // Error: PATCH not in HttpMethod

// ── CSS selector validation ────────────────────────────────────────
type DataTestId  = \`[data-testid="\${string}"]\`;
const sel: DataTestId = '[data-testid="login-button"]';

// ── Environment-aware URL builder ─────────────────────────────────
type Env      = "dev" | "staging" | "prod";
type BaseUrl  = \`https://\${Env}.myapp.com\`;
const staging: BaseUrl = "https://staging.myapp.com";

console.log(route);    // GET /api/users
console.log(sel);      // [data-testid="login-button"]
console.log(staging);  // https://staging.myapp.com`,expected:`GET /api/users
[data-testid="login-button"]
https://staging.myapp.com`},{type:"heading",content:"Type Assertions and Non-Null Assertion"},{type:"code",language:"typescript",label:"as, non-null assertion (!), and when to use each",content:`// ── Type assertion with 'as' ─────────────────────────────────────
// You tell TypeScript "trust me, I know this is type X"
// Use when: you have info the compiler doesn't (e.g. API response)

const rawResponse: unknown = { id: 1, name: "Alice", email: "alice@test.com" };
interface UserRecord { id: number; name: string; email: string }

const user = rawResponse as UserRecord;   // assert the shape
console.log(user.name);   // Alice — TypeScript trusts the assertion

// ── Double assertion for incompatible types ────────────────────────
// When TS won't accept a direct assertion: first assert to 'unknown'
// const x = someValue as unknown as TargetType;

// ── Non-null assertion operator (!) ────────────────────────────────
// Tells TypeScript "this value is NOT null/undefined — trust me"
// Use sparingly — it disables null safety for that expression

function getElementText(selector: string): string | null {
  // In tests, locators can return null if element not found
  return selector ? "Login" : null;
}

const text1 = getElementText("#btn");     // type: string | null
const text2 = getElementText("#btn")!;    // type: string  (non-null asserted)

// !! DANGER: if the value IS null/undefined, you get a runtime crash
// Only use (!) when you have VERIFIED the value is not null at this point

// ── Safer alternative: optional chaining + nullish coalescing ─────
const safe = getElementText("#btn")?.toUpperCase() ?? "NOT FOUND";
console.log(safe);   // LOGIN

// ── satisfies operator (TS 4.9+) ─────────────────────────────────
// Validates type without widening — best of both worlds
const config = {
  baseUrl: "https://example.com",
  timeout: 30000,
} satisfies { baseUrl: string; timeout: number };
// config.baseUrl is still typed as string literal (not widened to string)`,expected:`Alice
LOGIN`},{type:"heading",content:"Declaration Files (.d.ts) and Module Augmentation"},{type:"code",language:"typescript",label:".d.ts files and augmenting Playwright types",content:`// .d.ts files contain ONLY type information — no runtime code
// Purpose: add types for JavaScript libraries that have no types built in
// OR extend existing types from third-party packages

// ── Example: augmenting Playwright's test fixtures ────────────────
// In a file like: src/types/playwright.d.ts

// import { Page } from '@playwright/test';
//
// declare module '@playwright/test' {
//   interface TestFixtures {
//     // Add custom fixture types — now available in every test file
//     loginPage: import('../pages/LoginPage').LoginPage;
//     testUser: { email: string; password: string; role: string };
//   }
// }

// ── Example: global type augmentation ─────────────────────────────
// In src/types/global.d.ts:
//
// declare global {
//   // Add a global type available without importing
//   interface Window {
//     __testMode: boolean;    // custom window property for test helpers
//   }
// }

// ── Why .d.ts matters for automation ──────────────────────────────
// When you install: npm install some-js-lib
// And TS complains: "Could not find a declaration file for module 'some-js-lib'"
// Solution: npm install @types/some-js-lib  (the DefinitelyTyped types package)

// You'll often install these for Playwright projects:
// npm install -D @types/node              // Node.js built-in types (fs, path, etc.)
// @playwright/test includes its own types — no separate install needed

console.log("Declaration files provide types — no runtime output");`,expected:"Declaration files provide types — no runtime output"},{type:"heading",content:"Advanced Generics: Multiple Type Params and Defaults"},{type:"code",language:"typescript",label:"Multiple generic parameters with defaults",content:`// Multiple type parameters — like multiple generic slots
interface Repository<T, ID = number> {   // ID defaults to number
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
}

interface Product { id: number; name: string; price: number }
interface TestRun { id: string; status: string; startedAt: Date }   // string ID

// Both satisfy Repository with different type params
// class ProductRepo implements Repository<Product> { ... }
// class TestRunRepo implements Repository<TestRun, string> { ... }

// ── Generic with multiple constraints ─────────────────────────────
interface HasId    { id: number }
interface HasTitle { title: string }

// T must have BOTH id AND title
function logItem<T extends HasId & HasTitle>(item: T): void {
  console.log(\`[#\${item.id}] \${item.title}\`);
}

logItem({ id: 1, title: "Login test", status: "pass" });  // extra props OK

// ── Conditional generic return type ────────────────────────────────
function parse<T>(json: string): T {
  return JSON.parse(json) as T;   // cast after parsing
}

interface ApiUser { id: number; name: string }
const parsed = parse<ApiUser>('{"id":1,"name":"Alice"}');
console.log(parsed.name);   // Alice — typed correctly`,expected:`[#1] Login test
Alice`},{type:"heading",content:"Interactive Example: Generic ApiResponse<T> and Test Data Factory"},{type:"code",language:"typescript",label:"Generic API response wrapper + typed test data factory",content:`// ── Generic API response wrapper ──────────────────────────────────
interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
  error: string | null;
  timestamp: string;
}

// Factory function — create properly typed API response objects
function createApiResponse<T>(data: T, status: number): ApiResponse<T> {
  return {
    data,
    status,
    ok: status >= 200 && status < 300,
    error: status >= 400 ? \`HTTP \${status}\` : null,
    timestamp: new Date().toISOString(),
  };
}

interface UserApiData { id: number; name: string; email: string }
const userResp = createApiResponse<UserApiData>(
  { id: 1, name: "Alice", email: "alice@test.com" },
  200
);
console.log(\`OK: \${userResp.ok}, User: \${userResp.data.name}\`);   // OK: true, User: Alice

// ── Generic test data factory ──────────────────────────────────────
function createTestData<T>(defaults: T, overrides?: Partial<T>): T {
  return { ...defaults, ...overrides };   // spread: overrides win over defaults
}

interface TestUser {
  id: number;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

const defaultUser: TestUser = {
  id: 1,
  email: "test@example.com",
  password: "TestPass123",
  role: "viewer",
  isActive: true,
};

// Create variations without repeating the full object
const adminUser = createTestData(defaultUser, { role: "admin", id: 99 });
const inactiveUser = createTestData(defaultUser, { isActive: false, email: "inactive@test.com" });

console.log(\`Admin role: \${adminUser.role}, id: \${adminUser.id}\`);
console.log(\`Inactive: \${inactiveUser.isActive}, email: \${inactiveUser.email}\`);`,expected:`OK: true, User: Alice
Admin role: admin, id: 99
Inactive: false, email: inactive@test.com`}]},{title:"QA Use Cases",blocks:[{type:"heading",content:"1. Fully Typed Page Object Model",difficulty:"🟡 Intermediate"},{type:"code",language:"typescript",label:"Production-ready TypeScript POM class",content:`// pages/LoginPage.ts
// Full TypeScript Page Object Model using Playwright types

import { type Page, type Locator } from "@playwright/test";

// Interface defines the public contract — what callers can do with this page
export interface ILoginPage {
  navigate(): Promise<void>;
  login(email: string, password: string): Promise<void>;
  getErrorMessage(): Promise<string>;
  isLoggedIn(): Promise<boolean>;
}

export class LoginPage implements ILoginPage {
  // private Locators — callers cannot access selectors directly
  // Using Playwright's 'Locator' type for full IDE support
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;
  private readonly userMenu: Locator;

  // Page is injected — dependency injection pattern
  constructor(private readonly page: Page) {
    // Define all locators in the constructor (fail fast if selectors change)
    this.emailInput     = page.locator('[data-testid="email-input"]');
    this.passwordInput  = page.locator('[data-testid="password-input"]');
    this.submitButton   = page.locator('[data-testid="login-submit"]');
    this.errorMessage   = page.locator('[data-testid="error-message"]');
    this.userMenu       = page.locator('[data-testid="user-menu"]');
  }

  // Typed method — returns Promise<void> (performs action, returns nothing)
  async navigate(): Promise<void> {
    await this.page.goto("/login");
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Typed params — TypeScript catches if caller passes wrong types
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // Returns a string — caller knows they'll always get a string back
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: "visible" });
    return await this.errorMessage.innerText();
  }

  // Returns boolean — clean API for assertions
  async isLoggedIn(): Promise<boolean> {
    return await this.userMenu.isVisible();
  }
}

// Usage in test:
// test("login with valid credentials", async ({ page }) => {
//   const loginPage = new LoginPage(page);   // page is typed as Page
//   await loginPage.navigate();
//   await loginPage.login("user@test.com", "pass123");
//   expect(await loginPage.isLoggedIn()).toBe(true);
// });`},{type:"heading",content:"2. Enums for Environments, Browsers, and Test Status",difficulty:"🟢 Beginner"},{type:"code",language:"typescript",label:"String enums for type-safe configuration",content:`// enums/index.ts
// String enums for every configuration choice — prevents typos and invalid values

export enum TestStatus {
  PASS    = "PASS",
  FAIL    = "FAIL",
  SKIP    = "SKIP",
  BLOCKED = "BLOCKED",
  FLAKY   = "FLAKY",
}

export enum Environment {
  DEV     = "development",
  STAGING = "staging",
  PROD    = "production",
}

export enum Browser {
  CHROMIUM = "chromium",
  FIREFOX  = "firefox",
  WEBKIT   = "webkit",
}

export enum LogLevel {
  DEBUG   = "debug",
  INFO    = "info",
  WARN    = "warn",
  ERROR   = "error",
}

// Config interface uses the enums — values are constrained
interface RunConfig {
  environment: Environment;
  browser: Browser;
  logLevel: LogLevel;
  workers: number;
}

const config: RunConfig = {
  environment: Environment.STAGING,   // must be a valid Environment
  browser: Browser.CHROMIUM,          // must be a valid Browser
  logLevel: LogLevel.INFO,
  workers: 4,
};

// config.browser = "chrome";          // Error: 'chrome' is not assignable to type 'Browser'
// config.environment = "staging";     // Error: use Environment.STAGING

console.log(\`Running \${config.browser} on \${config.environment}\`);
// Running chromium on staging`,expected:"Running chromium on staging"},{type:"heading",content:"3. Interface for API Response Validation",difficulty:"🟡 Intermediate"},{type:"code",language:"typescript",label:"Type-safe API response interface with validation function",content:`// types/api.ts
// Typed interfaces for API testing with runtime validation

// The shape we expect from the API
interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer" | "editor";
  createdAt: string;
}

// Generic API wrapper — wraps any response data
interface ApiEnvelope<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
  errors: string[] | null;
}

// Runtime type guard — validates that an unknown response matches UserResponse
// Returns type predicate: 'value is UserResponse'
function isUserResponse(value: unknown): value is UserResponse {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id         === "number"   &&
    typeof obj.name       === "string"   &&
    typeof obj.email      === "string"   &&
    typeof obj.role       === "string"   &&
    ["admin", "viewer", "editor"].includes(obj.role as string) &&
    typeof obj.createdAt  === "string"
  );
}

// Usage in a test
async function fetchAndValidateUser(userId: number): Promise<UserResponse> {
  // const response = await fetch(\`/api/users/\${userId}\`);
  // const json: unknown = await response.json();

  const json: unknown = {            // simulate API response
    id: userId,
    name: "Alice",
    email: "alice@test.com",
    role: "admin",
    createdAt: "2024-01-01",
  };

  if (!isUserResponse(json)) {
    throw new Error(\`API response does not match UserResponse shape\`);
  }

  // After the guard, TypeScript knows 'json' is UserResponse
  return json;
}

fetchAndValidateUser(1).then((u) => {
  console.log(\`Validated user: \${u.name} (\${u.role})\`);
});`,expected:"Validated user: Alice (admin)"},{type:"heading",content:"4. Generic Test Data Factory",difficulty:"🟡 Intermediate"},{type:"code",language:"typescript",label:"Generic factory for creating test fixtures with overrides",content:`// utils/factory.ts
// A generic factory that creates test data with sensible defaults
// Supports partial overrides so tests only specify what's relevant

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  sku: string;
}

interface Order {
  id: number;
  userId: number;
  products: Product[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}

// Generic factory function — T is any object type
function createTestData<T>(defaults: T, overrides?: Partial<T>): T {
  return { ...defaults, ...overrides };
}

// Default test product
const defaultProduct: Product = {
  id: 1,
  name: "Test Widget",
  price: 29.99,
  inStock: true,
  category: "electronics",
  sku: "WIDGET-001",
};

// Create variants for specific test scenarios
const outOfStockProduct = createTestData(defaultProduct, {
  inStock: false,
  name: "Sold Out Widget",
});

const premiumProduct = createTestData(defaultProduct, {
  id: 2,
  price: 299.99,
  name: "Premium Widget",
  sku: "WIDGET-PREMIUM",
});

// ── Builder pattern variant — chain overrides ─────────────────────
function productFactory(overrides?: Partial<Product>): Product {
  return createTestData(defaultProduct, overrides);
}

const cheapProduct   = productFactory({ price: 1.99, name: "Budget Widget" });
const electronicItem = productFactory({ category: "computers", id: 99 });

console.log(\`Out of stock: \${outOfStockProduct.name} — \${outOfStockProduct.inStock}\`);
console.log(\`Premium price: $\${premiumProduct.price}\`);
console.log(\`Budget price: $\${cheapProduct.price}\`);`,expected:`Out of stock: Sold Out Widget — false
Premium price: $299.99
Budget price: $1.99`},{type:"heading",content:"5. Type-Safe Config with Partial Overrides",difficulty:"🟡 Intermediate"},{type:"code",language:"typescript",label:"Environment-specific Playwright config using Partial<Config>",content:`// config/index.ts
// Type-safe configuration management for multi-environment test suites

interface TestSuiteConfig {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
  workers: number;
  screenshotOnFailure: boolean;
  videoOnFailure: boolean;
  reporter: "html" | "json" | "junit" | "dot";
  credentials: {
    adminEmail: string;
    adminPassword: string;
  };
}

// Base (default) config — used as fallback for everything
const baseConfig: TestSuiteConfig = {
  baseUrl: "http://localhost:3000",
  apiUrl: "http://localhost:3001/api",
  timeout: 30_000,
  retries: 0,
  headless: true,
  workers: 4,
  screenshotOnFailure: true,
  videoOnFailure: false,
  reporter: "html",
  credentials: {
    adminEmail: "admin@localhost.com",
    adminPassword: "DevPass123",
  },
};

// Environment-specific partial overrides — only specify what changes
const envConfigs: Record<string, Partial<TestSuiteConfig>> = {
  staging: {
    baseUrl: "https://staging.myapp.com",
    apiUrl: "https://api.staging.myapp.com",
    retries: 1,
    credentials: { adminEmail: "admin@staging.myapp.com", adminPassword: "StagingPass456" },
  },
  prod: {
    baseUrl: "https://myapp.com",
    apiUrl: "https://api.myapp.com",
    retries: 2,
    headless: true,
    workers: 8,
    videoOnFailure: true,
    credentials: { adminEmail: "qa@myapp.com", adminPassword: "ProdPass789" },
  },
};

// Merge: base config + environment override
function getConfig(env: string): TestSuiteConfig {
  const override = envConfigs[env] ?? {};
  return { ...baseConfig, ...override };
}

const stagingConfig = getConfig("staging");
console.log(\`Staging URL: \${stagingConfig.baseUrl}\`);    // https://staging.myapp.com
console.log(\`Staging retries: \${stagingConfig.retries}\`);  // 1
console.log(\`Workers: \${stagingConfig.workers}\`);          // 4 (from base — not overridden)`,expected:`Staging URL: https://staging.myapp.com
Staging retries: 1
Workers: 4`},{type:"heading",content:"6. Typed Playwright Fixtures",difficulty:"🔴 Advanced"},{type:"code",language:"typescript",label:"Custom Playwright fixtures with full TypeScript types",content:`// fixtures/index.ts
// Typed Playwright test fixtures — extend the base 'test' with your own fixtures

import { test as base, type Page } from "@playwright/test";

// Import your page objects
// import { LoginPage }    from "../pages/LoginPage";
// import { DashboardPage } from "../pages/DashboardPage";

// 1. Define the SHAPE of your custom fixtures
interface MyFixtures {
  loginPage:     { navigate: () => Promise<void>; login: (e: string, p: string) => Promise<void> };
  dashboardPage: { isVisible: () => Promise<boolean> };
  testUser:      { email: string; password: string; role: string };
  adminUser:     { email: string; password: string; role: string };
  apiBaseUrl:    string;
}

// 2. Extend the base test with your fixture types
export const test = base.extend<MyFixtures>({

  // Fixture: loginPage — creates a new LoginPage instance per test
  loginPage: async ({ page }, use) => {
    // const lp = new LoginPage(page);   // real: use your POM class
    const lp = {                         // simplified for demo
      navigate: async () => { console.log("navigating to /login"); },
      login: async (e: string, p: string) => { console.log(\`login: \${e}\`); },
    };
    await use(lp);   // pass to the test
  },

  // Fixture: testUser — provides default test credentials
  testUser: async ({}, use) => {
    await use({
      email: "user@test.com",
      password: "TestPass123",
      role: "viewer",
    });
  },

  // Fixture: adminUser — provides admin credentials
  adminUser: async ({}, use) => {
    await use({
      email: "admin@test.com",
      password: "AdminPass456",
      role: "admin",
    });
  },

  // Fixture: apiBaseUrl — environment-aware API URL
  apiBaseUrl: async ({}, use) => {
    const env = process.env.TEST_ENV ?? "staging";
    const urls: Record<string, string> = {
      staging: "https://api.staging.myapp.com",
      prod:    "https://api.myapp.com",
    };
    await use(urls[env] ?? urls.staging);
  },

  // dashboardPage omitted for brevity
  dashboardPage: async ({ page }, use) => {
    await use({ isVisible: async () => true });
  },
});

// 3. Usage in tests — full autocomplete for loginPage, testUser, etc.
// test("login as regular user", async ({ loginPage, testUser }) => {
//   await loginPage.navigate();
//   await loginPage.login(testUser.email, testUser.password);
//   expect(await loginPage.isLoggedIn()).toBe(true);
// });

export { expect } from "@playwright/test";`},{type:"heading",content:"7. Utility Types for Partial Override Testing",difficulty:"🔴 Advanced"},{type:"code",language:"typescript",label:"Making fixture fields optional for flexible test setups",content:`// Using TypeScript utility types to make test fixtures flexible

// Full fixture interface — all fields required
interface TestFixtures {
  email: string;
  password: string;
  role: string;
  permissions: string[];
  teamId: number;
  locale: string;
  timezone: string;
}

// Partial<T> — ALL fields become optional
// Use for test helpers that accept partial overrides
type PartialFixtures = Partial<TestFixtures>;

// Required<T> — ALL optional become required
type StrictFixtures = Required<TestFixtures>;

// Readonly<T> — no one can mutate fixture data (prevents accidental shared state)
type ImmutableFixtures = Readonly<TestFixtures>;

// Pick — only the authentication-relevant fields
type AuthFixture = Pick<TestFixtures, "email" | "password" | "role">;

// Omit — everything except sensitive credentials
type SafeFixture = Omit<TestFixtures, "password">;

// ── createFixture: merge defaults + partial overrides ─────────────
const defaultFixtures: TestFixtures = {
  email:       "default@test.com",
  password:    "DefaultPass123",
  role:        "viewer",
  permissions: ["read"],
  teamId:      1,
  locale:      "en-US",
  timezone:    "UTC",
};

function createFixture(overrides: Partial<TestFixtures>): Readonly<TestFixtures> {
  const merged = { ...defaultFixtures, ...overrides };
  return Object.freeze(merged);   // freeze = runtime + compile-time immutability
}

const adminFixture   = createFixture({ role: "admin", permissions: ["read", "write", "delete"] });
const euFixture      = createFixture({ locale: "de-DE", timezone: "Europe/Berlin" });
const minimalFixture: AuthFixture = { email: "qa@test.com", password: "pass", role: "editor" };

console.log(\`Admin: \${adminFixture.role}, perms: \${adminFixture.permissions.join(", ")}\`);
console.log(\`EU locale: \${euFixture.locale}, tz: \${euFixture.timezone}\`);
console.log(\`Auth only: \${minimalFixture.email}\`);`,expected:`Admin: admin, perms: read, write, delete
EU locale: de-DE, tz: Europe/Berlin
Auth only: qa@test.com`}]},{title:"Interview Q&A",blocks:[{type:"heading",content:"Basic Questions (1–5)",difficulty:"🟢 Beginner"},{type:"qa",question:"1. What is the main difference between TypeScript and JavaScript for test automation?",answer:"TypeScript is a statically typed superset of JavaScript that adds a compile step. For test automation, the key advantages are: type errors are caught before tests run (not during CI failure at 3 AM); IDE autocomplete works on all Playwright APIs, page objects, and fixtures; refactoring is safe because the compiler immediately shows every broken call site. JavaScript has no compile step — all type errors become runtime surprises. Playwright itself is written in TypeScript and TypeScript is the officially recommended language for Playwright projects."},{type:"qa",question:"2. What is the difference between interface and type alias in TypeScript?",answer:"Both describe object shapes, but they have key differences. interface supports declaration merging — you can reopen an interface and add properties, which is useful for augmenting third-party types (like extending Playwright's TestFixtures). interface is preferred for OOP patterns and class contracts. type supports union types (`string | number`), intersection types (`A & B`), tuple types, and mapped types — it is more expressive when you need computed or composite types. Rule of thumb: use interface for class shapes and public APIs; use type for unions, primitives, and complex computed types.",code:`interface Config { url: string }
interface Config { timeout: number }   // merged — now has url AND timeout

type Status = "pass" | "fail" | "skip";  // union — only possible with type
type ID     = string | number;           // union`},{type:"qa",question:"3. What is 'any' and why should you avoid it in test automation?",answer:"any is an escape hatch that completely disables TypeScript's type checking for a variable. You can assign anything to it and call any method on it without errors — but those errors surface at runtime instead of compile time. In test automation, using any defeats the entire purpose of TypeScript: you lose autocomplete, lose compile-time safety, and introduce the same class of runtime bugs that TypeScript is designed to prevent. Use unknown instead when you genuinely don't know the type — it forces you to narrow the type with a type guard before using it. Use explicit types, type assertions (as), or generics instead of any.",code:`// WRONG — any disables all safety
let data: any = await response.json();
data.nonExistentField.toUpperCase(); // No error — crashes at runtime

// RIGHT — unknown forces you to validate first
let safe: unknown = await response.json();
if (typeof safe === "object" && safe !== null && "name" in safe) {
  console.log((safe as { name: string }).name);  // safe to use
}`},{type:"qa",question:"4. What is type inference and when does it work?",answer:"Type inference is TypeScript's ability to automatically determine a variable's type from its initial value or context, without requiring an explicit annotation. It works for: variable declarations with an initial value (`let x = 5` → x is number), function return types (inferred from the return statement), generic type parameters (inferred from arguments), and array/object literals. When to annotate explicitly: when the variable is declared without a value, when the inferred type is too broad (e.g., you want `string[]` not `(string | number)[]`), and in function parameters which are never inferred.",code:`let count = 5;            // inferred: number
let name  = "Alice";       // inferred: string
let arr   = [1, 2, 3];     // inferred: number[]

function double(n: number) { return n * 2; }  // return: number (inferred)

let url: string;            // MUST annotate — no initial value
url = "https://example.com";`},{type:"qa",question:"5. What are enums and give a testing-specific use case?",answer:"Enums are named constant sets. String enums (where each member has an explicit string value) are strongly preferred in test automation because they produce readable output in logs and test reports. A number enum with value `0` is meaningless in a test failure message; a string enum with value 'FAIL' is immediately understandable. Common testing use cases: test status (PASS/FAIL/SKIP/BLOCKED), browser target (chromium/firefox/webkit), environment (staging/production), HTTP methods, and log levels. Using enums instead of raw strings means the compiler catches typos like `'pase'` instantly.",code:`enum TestStatus { PASS = "PASS", FAIL = "FAIL", SKIP = "SKIP" }
enum Browser    { CHROMIUM = "chromium", FIREFOX = "firefox" }

function reportResult(status: TestStatus, browser: Browser) {
  console.log(\`[\${browser}] \${status}\`);   // [chromium] PASS — readable!
}
reportResult(TestStatus.PASS, Browser.CHROMIUM);
// reportResult("pass", "chrome");  // Error — prevents typos`},{type:"heading",content:"Intermediate Questions (6–10)",difficulty:"🟡 Intermediate"},{type:"qa",question:"6. What is the difference between union types and intersection types?",answer:"A union type (`A | B`) means a value can be one OR the other type — you must handle both cases (usually with a type guard). An intersection type (`A & B`) means a value must satisfy ALL listed types simultaneously — it combines properties from multiple types into one. Union is for 'or' scenarios (a parameter that accepts multiple forms), intersection is for 'and' scenarios (composing multiple interfaces into one complete type). In test automation: union types are common for function parameters that accept multiple formats (string | number); intersection types are common for composed page objects or config types.",code:`type StringOrNumber = string | number;  // can be EITHER

interface HasId    { id: number }
interface HasTitle { title: string }
type TestItem = HasId & HasTitle;  // must have BOTH id AND title

const item: TestItem = { id: 1, title: "Login test" };  // OK
// const bad: TestItem = { id: 1 };  // Error: missing 'title'`},{type:"qa",question:"7. What are generics and why are they useful in test automation?",answer:"Generics are type parameters (written as `<T>`) that let you write functions, classes, and interfaces that work with any type while preserving that type's information throughout the code. Without generics, you use `any` (and lose all type safety) or duplicate code for each type. In test automation, generics are most useful for: API response wrappers that preserve the data's type (`ApiResponse<User>` vs `ApiResponse<Product>`), test data factories that create typed objects with partial overrides (`createTestData<T>(defaults: T, overrides?: Partial<T>): T`), repository patterns for typed data access, and utility functions that must work across multiple fixture types.",code:`// Generic wrapper preserves type through the chain
interface ApiResponse<T> { data: T; status: number; ok: boolean }

function createResponse<T>(data: T, status: number): ApiResponse<T> {
  return { data, status, ok: status < 400 };
}

const userResp = createResponse({ id: 1, name: "Alice" }, 200);
console.log(userResp.data.name);  // 'name' is correctly typed as string`},{type:"qa",question:"8. How do access modifiers (public/private/protected/readonly) help in Page Object Model?",answer:"Access modifiers enforce encapsulation in POM classes, which prevents test code from depending on implementation details. private on locator properties means test files cannot access selectors directly — only the page object's methods interact with the DOM, so selector changes don't ripple into every test file. protected allows subclasses to use methods (like `waitForLoad()`) that base classes provide without exposing them to test code. readonly on baseUrl or constructorinjected dependencies prevents accidental mutation between tests. public marks the methods that are the page object's public API — the only things test code should call.",code:`class LoginPage {
  private readonly emailInput: Locator;   // tests cannot use selectors directly
  protected readonly page: Page;          // accessible to subclasses
  public readonly url = "/login";         // tests can read url, not change it

  async login(e: string, p: string): Promise<void> {  // public API
    await this.emailInput.fill(e);   // private — only this class
  }
}`},{type:"qa",question:"9. What are type guards and when do you use them in test automation?",answer:"Type guards are runtime checks that narrow a union type to a specific member inside a code branch. TypeScript recognizes `typeof`, `instanceof`, the `in` operator, and custom type predicate functions (`value is T`) as type guards. In test automation, type guards appear most often when: validating API responses of unknown shape (the response is typed as `unknown` until validated), handling errors that could be multiple error types (NetworkError vs TimeoutError), processing test results that come in multiple formats (UI test vs API test), and working with optional properties that may be undefined.",code:`function handleError(err: NetworkError | TimeoutError): void {
  if (err instanceof NetworkError) {
    console.log(\`HTTP \${err.statusCode}\`);  // statusCode only on NetworkError
  } else {
    console.log(\`Timed out after \${err.timeoutMs}ms\`);
  }
}

// Custom type predicate
function isUser(val: unknown): val is { id: number; name: string } {
  return typeof val === "object" && val !== null && "id" in val;
}`},{type:"qa",question:"10. What does 'readonly' do and when should you use it in test automation?",answer:"readonly prevents a property from being reassigned after initialization. At the type level it is a compile-time guarantee; combined with `Object.freeze()` it also works at runtime. In test automation, readonly is most important for: page object locators (selectors should never change after construction), configuration objects (prevent tests from mutating shared config), environment URLs and credentials passed into fixtures, and test data objects created by factories (tests should receive immutable data to prevent inter-test contamination). `Readonly<T>` is the utility type equivalent — it makes every property of an existing type readonly without rewriting the interface.",code:`interface TestConfig {
  baseUrl: string;
  retries: number;
}
type FrozenConfig = Readonly<TestConfig>;
const cfg: FrozenConfig = { baseUrl: "https://app.com", retries: 2 };
// cfg.baseUrl = "changed";  // Compile Error: cannot assign to 'baseUrl'`},{type:"heading",content:"Advanced Questions (11–15)",difficulty:"🔴 Advanced"},{type:"qa",question:"11. What are utility types and give concrete automation examples for at least four?",answer:"Utility types are built-in generic types that transform existing types. The most useful in test automation: Partial<T> — makes all properties optional, used for config overrides and test data factories so you only specify what changes. Pick<T,K> — selects specific properties, useful for creating auth-only fixture types from a full user interface. Omit<T,K> — removes properties, useful for creating safe fixture types without passwords. Record<K,V> — typed key-value map, used for environment URL maps or browser timeout configs. Readonly<T> — freezes a type for immutable test config and fixture data. ReturnType<F> and Awaited<ReturnType<F>> — extracts the resolved return type of async functions, useful for typing variables that hold fetched data.",code:`type PartialConfig  = Partial<TestConfig>;                          // for overrides
type AuthOnly       = Pick<User, "email" | "password" | "role">;    // for login tests
type SafeUser       = Omit<User, "password">;                       // no credentials
type BrowserMap     = Record<Browser, number>;                       // { chromium: 30000, ... }
type FetchedUser    = Awaited<ReturnType<typeof fetchUser>>;         // resolved type`},{type:"qa",question:"12. How do you correctly type async functions with possible error states in TypeScript?",answer:"TypeScript does not have a built-in Result/Either type, but you can model it explicitly. The three main patterns are: (1) Union return type — `Promise<Data | null>` or `Promise<{ data: T } | { error: string }>`, which forces callers to handle both cases. (2) Typed exceptions — declare custom error classes and use them consistently; callers can check with instanceof. (3) Generic Result type — `type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E }`, a discriminated union where the `ok` boolean is the type guard. Pattern 3 is the most explicit and is popular in large Playwright frameworks. Always annotate async function return types explicitly as `Promise<T>` rather than relying on inference — it makes the contract clear to all callers.",code:`type Result<T, E extends Error = Error> =
  | { ok: true;  data:  T }
  | { ok: false; error: E };

async function fetchUser(id: number): Promise<Result<User>> {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) return { ok: false, error: new Error(\`HTTP \${res.status}\`) };
    return { ok: true, data: await res.json() as User };
  } catch (e) {
    return { ok: false, error: e as Error };
  }
}`},{type:"qa",question:"13. What are mapped types and how would you use them in a test framework?",answer:"Mapped types iterate over the keys of an existing type and produce a new type by transforming each property. Syntax: `{ [K in keyof T]: NewType }`. In a test framework, mapped types are useful for: creating form validation error types (`{ [K in keyof Form]: string | null }` — one error slot per field), creating mock/spy wrapper types that replace every method with a Jest spy, generating serialized string versions of a config interface for env-var parsing, and building partial-with-defaults helpers. Mapped types are the foundation of most built-in utility types (Partial, Readonly, Required, Record are all implemented as mapped types in TypeScript's lib).",code:`// Form error type — one validation message per field
type FormErrors<T> = { [K in keyof T]: string | null };
interface LoginForm { email: string; password: string; rememberMe: boolean }
type LoginErrors = FormErrors<LoginForm>;
// { email: string|null; password: string|null; rememberMe: string|null }

// Serialized env-vars — all values become strings
type EnvVarMap<T> = { [K in keyof T]: string };`},{type:"qa",question:"14. What does enabling 'strict' mode in tsconfig.json do and why does it matter for test automation?",answer:"strict: true enables a group of strictness checks simultaneously: noImplicitAny (parameters cannot silently become any), strictNullChecks (null and undefined are their own types — you must handle them explicitly), strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, and noImplicitThis. For test automation, strictNullChecks is the most impactful — it forces you to handle cases where locators might not find elements, API responses might be null, or optional config values might be undefined. Without strict mode, TypeScript is very permissive and many of the runtime bugs it's supposed to prevent will still occur. Always start new Playwright projects with strict: true. On legacy JS-to-TS migrations, enable strict flags incrementally."},{type:"qa",question:"15. How do you structure TypeScript types in a large Playwright framework?",answer:"A scalable structure separates types by responsibility: (1) `src/types/` or `types/` directory for shared interfaces and type aliases — split by domain: `user.types.ts`, `api.types.ts`, `config.types.ts`. (2) `src/enums/` for string enums (Browser, Environment, TestStatus). (3) Each page object file exports its own interface alongside the class (ILoginPage + LoginPage). (4) A barrel file (`types/index.ts`) re-exports everything so imports stay clean. (5) `playwright.d.ts` or `fixtures.d.ts` for augmenting Playwright's TestFixtures interface with custom fixture types. (6) Never put types in test files — they belong in the shared layer. (7) Use `import type { ... }` (not `import { ... }`) for type-only imports — they are removed at compile time and don't create circular dependencies.",code:`// types/index.ts — barrel exports
export type { User, AdminUser } from "./user.types";
export type { ApiResponse, ApiError } from "./api.types";
export { TestStatus, Browser, Environment } from "../enums";

// In test file:
import type { User } from "../types";             // type-only import
import { TestStatus, Browser } from "../types";   // value import (enum)`}]},{title:"Practice & Reference",blocks:[{type:"heading",content:"Exercise 1 — Define TestCase Interface",difficulty:"🟢 Beginner"},{type:"exercise",difficulty:"🟢 Beginner",title:"Build a TestCase Interface with Enum",description:"Define a string enum `Priority` with values LOW, MEDIUM, HIGH, CRITICAL. Define a string enum `TestStatus` with PASS, FAIL, SKIP, BLOCKED. Define an interface `TestCase` with: id (number, readonly), title (string), description (optional string), status (TestStatus), priority (Priority), tags (string array), durationMs (number), and assignee (optional string). Create two TestCase objects: one for a passing login test and one for a failing payment test.",hint:"Use readonly for id, ? for optional properties, and string enum values like Status.PASS = 'PASS'. Remember both enums must be string enums for readable test output.",solution:`// ── Enums ────────────────────────────────────────────────────────
enum Priority {
  LOW      = "LOW",
  MEDIUM   = "MEDIUM",
  HIGH     = "HIGH",
  CRITICAL = "CRITICAL",
}

enum TestStatus {
  PASS    = "PASS",
  FAIL    = "FAIL",
  SKIP    = "SKIP",
  BLOCKED = "BLOCKED",
}

// ── Interface ─────────────────────────────────────────────────────
interface TestCase {
  readonly id:    number;          // immutable after creation
  title:          string;          // test case title
  description?:   string;          // optional detailed description
  status:         TestStatus;      // must be a valid TestStatus value
  priority:       Priority;        // must be a valid Priority value
  tags:           string[];        // array of tag strings
  durationMs:     number;          // execution time in milliseconds
  assignee?:      string;          // optional QA engineer name
}

// ── Create typed test cases ────────────────────────────────────────
const loginTest: TestCase = {
  id:          1,
  title:       "Login with valid credentials",
  description: "Verify that a registered user can log in with correct email and password",
  status:      TestStatus.PASS,
  priority:    Priority.CRITICAL,
  tags:        ["smoke", "auth", "regression"],
  durationMs:  1240,
  assignee:    "Alice",
};

const paymentTest: TestCase = {
  id:        2,
  title:     "Complete checkout with credit card",
  status:    TestStatus.FAIL,
  priority:  Priority.HIGH,
  tags:      ["e2e", "payment"],
  durationMs: 3800,
  // description and assignee omitted — they are optional
};

// ── Print summary ─────────────────────────────────────────────────
[loginTest, paymentTest].forEach((tc) => {
  console.log(\`[\${tc.status}] \${tc.priority} — \${tc.title} (\${tc.durationMs}ms)\`);
});`,explanation:"String enums produce readable values ('PASS', 'CRITICAL') in logs and reports instead of opaque numbers. The readonly modifier on id prevents tests from accidentally changing an identifier. Optional fields (?) let you create minimal test objects without boilerplate, while required fields enforce a complete, valid contract."},{type:"divider"},{type:"heading",content:"Exercise 2 — Generic ApiResponse<T> Wrapper",difficulty:"🟡 Intermediate"},{type:"exercise",difficulty:"🟡 Intermediate",title:"Generic API Response Wrapper with Type Guards",description:"Create a generic interface `ApiResponse<T>` with fields: data (T | null), status (number), ok (boolean), error (string | null), requestId (string). Write a generic factory function `createApiResponse<T>` that takes data and status code and returns a correctly filled ApiResponse<T>. Write a type guard function `isSuccessResponse<T>` that returns true if ok is true and data is not null. Write a `parseUserResponse` function that takes `ApiResponse<unknown>` and validates it is a user (has id: number, name: string, email: string). Test with a 200 user response and a 404 error response.",hint:"The type guard should have the signature `(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>>`. For the user validation function use the 'in' operator and typeof checks to validate the unknown data shape.",solution:`// ── Generic response interface ────────────────────────────────────
interface ApiResponse<T> {
  data:      T | null;   // null on error responses
  status:    number;     // HTTP status code
  ok:        boolean;    // true for 2xx
  error:     string | null;
  requestId: string;
}

// ── Factory function ─────────────────────────────────────────────
let reqCounter = 0;

function createApiResponse<T>(data: T | null, status: number): ApiResponse<T> {
  return {
    data,
    status,
    ok:        status >= 200 && status < 300,
    error:     status >= 400 ? \`HTTP Error \${status}\` : null,
    requestId: \`req-\${++reqCounter}\`,
  };
}

// ── Type guard ───────────────────────────────────────────────────
// Narrows ApiResponse<T> to ApiResponse<NonNullable<T>> — data is guaranteed non-null
function isSuccessResponse<T>(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>> {
  return res.ok === true && res.data !== null;
}

// ── Interfaces ───────────────────────────────────────────────────
interface ApiUser { id: number; name: string; email: string }

// ── Validation function ───────────────────────────────────────────
function parseUserResponse(res: ApiResponse<unknown>): ApiUser {
  if (!isSuccessResponse(res)) {
    throw new Error(\`Request failed: \${res.error ?? "unknown error"}\`);
  }
  const d = res.data;                          // narrowed: not null/undefined
  if (
    typeof d !== "object"           ||
    d === null                      ||
    !("id"    in d) || typeof (d as any).id    !== "number" ||
    !("name"  in d) || typeof (d as any).name  !== "string" ||
    !("email" in d) || typeof (d as any).email !== "string"
  ) {
    throw new Error("Response does not match ApiUser shape");
  }
  return d as ApiUser;
}

// ── Test it ──────────────────────────────────────────────────────
const userResp  = createApiResponse({ id: 1, name: "Alice", email: "alice@test.com" }, 200);
const errorResp = createApiResponse<ApiUser>(null, 404);

console.log(\`OK response: \${userResp.ok}, id: \${userResp.data?.id}\`);   // OK response: true, id: 1
console.log(\`Error:       \${errorResp.error}\`);                          // Error: HTTP Error 404

const user = parseUserResponse(userResp);
console.log(\`Parsed user: \${user.name} <\${user.email}>\`);               // Parsed user: Alice <alice@test.com>

try {
  parseUserResponse(errorResp);
} catch (e) {
  console.log(\`Caught: \${(e as Error).message}\`);                        // Caught: Request failed: HTTP Error 404
}`,explanation:"Generics allow one `ApiResponse<T>` interface to correctly type the data field as User, Product, Order, or any other type. The type guard narrows the type so TypeScript knows data is non-null after the check. The runtime validation function bridges the gap between 'unknown API data' and your typed interface — essential for safe API test assertions."},{type:"divider"},{type:"heading",content:"Exercise 3 — Typed Playwright POM Base Class",difficulty:"🔴 Advanced"},{type:"exercise",difficulty:"🔴 Advanced",title:"Generic Playwright POM Base Class with Fixtures",description:"Create an abstract class `PageObjectBase` that accepts `Page` from Playwright in its constructor. It should have: a protected abstract `path` property (string), a `navigate()` method that calls `page.goto`, a generic `getElement<T extends Locator>(selector: string): T` method, a protected `waitForSelector(selector: string, state?: 'visible'|'hidden'|'attached'|'detached')` helper, and an `expectUrl(expected: string)` assertion helper. Then create a concrete `LoginPage` that extends it with typed `login(creds: {email:string, password:string})`, `getErrorText()`, and `isLoggedIn()` methods. Finally show a typed fixture extension using `test.extend<{loginPage: LoginPage}>`.",hint:"Use `import { type Page, type Locator, test as base } from '@playwright/test'`. The abstract path property forces every page to declare its route. The generic getElement method preserves Locator subtype information.",solution:`// ── Import types from Playwright ─────────────────────────────────
// import { type Page, type Locator, test as base, expect } from "@playwright/test";

// ── Interfaces ───────────────────────────────────────────────────
interface LoginCredentials {
  email:    string;
  password: string;
}

// ── Abstract base class ───────────────────────────────────────────
abstract class PageObjectBase {
  // Every concrete page must declare its path
  protected abstract readonly path: string;

  constructor(
    protected readonly page: any,   // Page — typed as any for demo (use Playwright's Page in real code)
    protected readonly baseUrl: string = "https://staging.myapp.com"
  ) {}

  // Navigate to this page's path
  async navigate(): Promise<void> {
    const fullUrl = \`\${this.baseUrl}\${this.path}\`;
    console.log(\`→ goto: \${fullUrl}\`);
    // await this.page.goto(fullUrl);
    // await this.page.waitForLoadState("domcontentloaded");
  }

  // Generic element getter — preserves Locator subtype
  protected getElement<T = any>(selector: string): T {
    // return this.page.locator(selector) as T;
    console.log(\`→ locator: \${selector}\`);
    return { selector } as T;
  }

  // Protected helper — only page objects and subclasses can call this
  protected async waitForSelector(
    selector: string,
    state: "visible" | "hidden" | "attached" | "detached" = "visible"
  ): Promise<void> {
    console.log(\`→ wait for \${selector} to be \${state}\`);
    // await this.page.locator(selector).waitFor({ state });
  }

  // Assertion helper — usable in any page object
  async expectUrl(expected: string): Promise<void> {
    const current = \`\${this.baseUrl}\${this.path}\`;
    const ok = current.includes(expected);
    console.log(\`→ URL check: \${ok ? "PASS" : "FAIL"} (expected to include: \${expected})\`);
    // await expect(this.page).toHaveURL(new RegExp(expected));
  }
}

// ── Concrete LoginPage ────────────────────────────────────────────
class LoginPage extends PageObjectBase {
  protected readonly path = "/login";   // must implement abstract property

  // Private typed locators — selectors are an implementation detail
  private get emailInput()    { return this.getElement('[data-testid="email-input"]'); }
  private get passwordInput() { return this.getElement('[data-testid="password-input"]'); }
  private get submitButton()  { return this.getElement('[data-testid="login-submit"]'); }
  private get errorMsg()      { return this.getElement('[data-testid="error-message"]'); }
  private get userMenu()      { return this.getElement('[data-testid="user-menu"]'); }

  // Typed login method — accepts our LoginCredentials interface
  async login(creds: LoginCredentials): Promise<void> {
    console.log(\`→ fill email: \${creds.email}\`);
    console.log(\`→ fill password: ***\`);
    console.log(\`→ click submit\`);
    // await this.emailInput.fill(creds.email);
    // await this.passwordInput.fill(creds.password);
    // await this.submitButton.click();
  }

  // Returns string — callers always get a string (no null handling needed)
  async getErrorText(): Promise<string> {
    await this.waitForSelector('[data-testid="error-message"]');
    return "Invalid email or password";   // would be: await this.errorMsg.innerText()
  }

  // Returns boolean — clean assertion-ready API
  async isLoggedIn(): Promise<boolean> {
    return true;   // would be: await this.userMenu.isVisible()
  }
}

// ── Typed Playwright fixture extension ────────────────────────────
// const test = base.extend<{ loginPage: LoginPage }>({
//   loginPage: async ({ page }, use) => {
//     const lp = new LoginPage(page);
//     await use(lp);
//   },
// });
//
// Usage in tests:
// test("login flow", async ({ loginPage }) => {
//   await loginPage.navigate();
//   await loginPage.login({ email: "qa@test.com", password: "Pass123" });
//   expect(await loginPage.isLoggedIn()).toBe(true);
// });

// ── Demo output ───────────────────────────────────────────────────
const demoPage = new LoginPage(null);
demoPage.navigate().then(async () => {
  await demoPage.login({ email: "qa@test.com", password: "Pass123" });
  const loggedIn = await demoPage.isLoggedIn();
  console.log(\`→ isLoggedIn: \${loggedIn}\`);
  await demoPage.expectUrl("/login");
});`,explanation:"Abstract classes enforce that every page declares its own path, preventing forgetting to set the route. Protected access on helpers and locators keeps the public API clean — test code only sees navigate, login, getErrorText, isLoggedIn. The generic getElement preserves type information from Playwright's Locator hierarchy. The fixture extension pattern makes the typed page object available in every test that needs it without manually constructing it — this is the standard Playwright TypeScript pattern for large projects."},{type:"heading",content:"Quick Reference: TypeScript Features",difficulty:"🟢 Beginner"},{type:"table",headers:["Feature","Syntax","When to Use"],rows:[["String enum","enum E { A = 'A' }","Status, browser, env constants — readable in logs"],["Interface","interface Foo { x: string }","Object shapes, class contracts, POM types"],["Type alias","type ID = string | number","Unions, primitives, computed/complex types"],["Optional prop","{ x?: string }","Config overrides, partial test data objects"],["Readonly prop","{ readonly id: number }","IDs, URLs, tokens that must not change"],["Generic function","function f<T>(x: T): T","Factories, wrappers, utility functions"],["Generic interface","interface R<T> { data: T }","API responses, repositories, collections"],["Partial<T>","Partial<Config>","Config overrides, optional test data factories"],["Pick<T,K>","Pick<User, 'email'|'role'>","Auth-only fixtures, slim DTO types"],["Omit<T,K>","Omit<User, 'password'>","Safe fixture types without sensitive fields"],["Record<K,V>","Record<Browser, number>","Typed maps: timeout per browser, URL per env"],["Type guard","x is MyType","Validate unknown API responses at runtime"],["Non-null assert","value!","Only when you are certain value is not null/undefined"],["Satisfies","obj satisfies Type","Validate config without losing literal types (TS 4.9+)"],["Template literal type","`${Env}.myapp.com`","Type-safe URL patterns, event names, route strings"]]},{type:"tip",content:"Bookmark the TypeScript Playground at typescriptlang.org/play — paste any snippet and see the compiled JavaScript, type errors, and hover types instantly. It is the fastest way to experiment with TypeScript concepts without setting up a project."}]}],Ig={title:"🔷 TypeScript",subtitle:"Playwright ve Test Otomasyonu için TypeScript",intro:"Modern test otomasyonu için TypeScript öğrenin. Tür temellerinden ileri düzey Playwright desenlerine kadar — tam IDE desteği, otomatik tamamlama ve derleme zamanı hata yakalama ile daha güvenli, daha kolay bakım yapılabilir testler yazın."},_g=["🎯 Giriş","📦 Kurulum","🟢 Temeller","🟡 Orta Seviye","🔴 İleri Seviye","🧪 QA Kullanım","💼 Mülakat","📝 Pratik & Referans"],Og={en:{hero:{title:"🔷 TypeScript",subtitle:"TypeScript for Playwright & Test Automation",intro:"Learn TypeScript for modern test automation. From type basics to advanced Playwright patterns — write safer, more maintainable tests with full IDE support, autocomplete, and compile-time error catching."},tabs:["🎯 Intro & Why","📦 Installation","🟢 Foundations","🟡 Intermediate","🔴 Advanced","🧪 QA Use Cases","💼 Interview Q&A","📝 Practice & Reference"],sections:Fl},tr:{hero:Ig,tabs:_g,sections:Fl}};function Dg(){return n.jsx(Ws,{data:Og,gradient:"from-indigo-600 to-blue-700",bgLight:"bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"})}const Ml=[{title:"🎯 What is Python & Why Do QA Engineers Need It?",blocks:[{type:"text",content:"Python is a high-level, interpreted programming language known for its clean, readable syntax — it reads almost like plain English. Created in 1991, it has become the world's most popular language for automation, data science, and web development."},{type:"text",content:"For QA engineers, Python is the Swiss Army knife: you can write UI tests with Selenium/Playwright, API tests with requests, performance tests, data validation scripts, and CI/CD pipelines — all with the same language."},{type:"heading",text:"Why Python for Test Automation?"},{type:"grid",cols:3,items:[{icon:"📖",label:"Readable Syntax",desc:"Tests read like documentation — even non-developers can understand what's being tested."},{icon:"🧰",label:"Huge Ecosystem",desc:"pytest, Selenium, Playwright, requests, Faker, pandas — thousands of testing libraries."},{icon:"⚡",label:"Rapid Scripting",desc:"Write a data-generation script or API test in minutes, not hours."},{icon:"🔗",label:"API Testing",desc:"requests library makes HTTP calls trivial. Great for REST API validation."},{icon:"📊",label:"Data Manipulation",desc:"pandas, csv, json — read test data from any format."},{icon:"🔄",label:"CI/CD Native",desc:"Python scripts integrate with Jenkins, GitHub Actions, Docker without friction."}]},{type:"heading",text:"Python vs Other Languages for Testing"},{type:"table",headers:["Language","Pros","Cons","Best For"],rows:[["Python","Readable, fast to write, huge ecosystem","Slower execution than compiled","Automation scripts, API tests, pytest"],["Java","Enterprise scale, strong typing","Verbose, slower to write","Selenium WebDriver, legacy enterprise"],["JavaScript","Same language as web apps, async native","Callback complexity","Playwright, Cypress, frontend testing"],["C#","Microsoft stack, strong typing","Windows-centric, less OSS",".NET apps, SpecFlow, NUnit"]]},{type:"heading",text:"Popular Python Testing Libraries"},{type:"table",headers:["Library","Purpose","Install Command"],rows:[["pytest","Test runner, fixtures, assertions","pip install pytest"],["selenium","Browser UI automation","pip install selenium"],["playwright","Modern browser automation","pip install playwright"],["requests","HTTP/API testing","pip install requests"],["pandas","Read CSV/Excel test data","pip install pandas"],["faker","Generate realistic test data","pip install faker"],["allure-pytest","Beautiful test reports","pip install allure-pytest"]]}]},{title:"📦 Installing Python & Setting Up Your Environment",blocks:[{type:"heading",text:"Step 1: Download and Install Python 3"},{type:"steps",items:["Go to python.org/downloads and download the latest Python 3.x (NOT Python 2)",'Windows: Run the installer — CRITICAL: check "Add Python to PATH" before clicking Install!',"Mac: Use the .pkg installer from python.org, or: brew install python3","Linux (Ubuntu/Debian): sudo apt update && sudo apt install python3 python3-pip"]},{type:"warning",content:'Windows users: If you forget to check "Add Python to PATH", the `python` command won\'t work in the terminal. Re-run the installer and choose "Modify", then check PATH.'},{type:"heading",text:"Step 2: Verify Installation"},{type:"code",code:`# In your terminal/command prompt:
python --version       # Windows (usually)
python3 --version      # Mac/Linux

# Why both? On Mac/Linux, "python" may point to Python 2 (legacy).
# "python3" always points to Python 3. Use whichever works on your system.

pip --version          # package manager
pip3 --version         # Mac/Linux alternative`,expected:`Python 3.12.0
pip 23.3.1 from /usr/local/lib/python3.12/site-packages/pip (python 3.12)`},{type:"heading",text:"Step 3: Virtual Environments (Critical!)"},{type:"text",content:"A virtual environment is an isolated Python installation for your project. It prevents dependency conflicts between projects. Project A needs requests==2.28 but Project B needs requests==2.31? Virtual environments solve this."},{type:"code",code:`# Create a virtual environment (run inside your project folder):
python -m venv venv          # creates a "venv" folder

# Activate it:
# Windows:
venv\\Scripts\\activate

# Mac/Linux:
source venv/bin/activate

# Your prompt changes to show (venv) when active.
# Now install packages — they go INTO venv, not system Python:
pip install pytest requests playwright

# Deactivate when done:
deactivate`,expected:"(venv) C:\\projects\\mytest>"},{type:"tip",content:"Always create a venv for every new project. Add the `venv/` folder to .gitignore — never commit it."},{type:"heading",text:"Step 4: requirements.txt Pattern"},{type:"code",code:`# Save current dependencies to a file:
pip freeze > requirements.txt

# Contents of requirements.txt:
# pytest==7.4.3
# requests==2.31.0
# playwright==1.40.0

# Install from requirements.txt on another machine or CI:
pip install -r requirements.txt`},{type:"heading",text:"Step 5: First Program"},{type:"code",label:"hello_world.py",code:`# Your first Python program
name = "QA Engineer"              # variable assignment
print(f"Hello, {name}!")          # f-string: embed variable in string
print("Python version check:", end=" ")
import sys                         # import a built-in module
print(sys.version)                 # print Python version`,expected:`Hello, QA Engineer!
Python version check: 3.12.0 (main, ...) [GCC ...]`}]},{title:"🟢 Level 1: Python Foundations",blocks:[{type:"heading",text:"Variables and Data Types",difficulty:"🟢 Beginner"},{type:"code",code:`# Python has dynamic typing — no need to declare types
name    = "Alice"          # str  (string)
age     = 28               # int  (integer)
score   = 98.5             # float (decimal)
passed  = True             # bool (True or False)
nothing = None             # NoneType (absence of value)

# Check the type of any variable:
print(type(name))          # <class 'str'>
print(type(age))           # <class 'int'>
print(type(passed))        # <class 'bool'>

# Type conversion:
str_age = str(age)         # "28"  (int to str)
int_str = int("42")        # 42    (str to int)
flt_str = float("3.14")    # 3.14  (str to float)`,expected:`<class 'str'>
<class 'int'>
<class 'bool'>`},{type:"heading",text:"Strings and F-Strings",difficulty:"🟢 Beginner"},{type:"code",code:`test_name = "Login Test"
status    = "FAILED"
duration  = 2.347

# f-strings (Python 3.6+) — the preferred way:
msg = f"{test_name} {status} in {duration:.2f}s"
print(msg)

# Common string methods:
print(test_name.upper())              # "LOGIN TEST"
print(test_name.lower())              # "login test"
print("  hello  ".strip())            # "hello"
print(test_name.replace("Login", "Logout"))  # "Logout Test"
print(test_name.startswith("Login")) # True
print(", ".join(["pass", "fail", "skip"])) # "pass, fail, skip"

# String slicing:
url = "https://example.com/login"
print(url[8:])       # "example.com/login"
print(url[-5:])      # "login"`,expected:`Login Test FAILED in 2.35s
LOGIN TEST
login test
hello
Logout Test
True
pass, fail, skip
example.com/login
login`},{type:"heading",text:"Lists",difficulty:"🟢 Beginner"},{type:"code",code:`# Lists: ordered, mutable collections
test_cases = ["login", "signup", "checkout", "logout"]

print(test_cases[0])    # "login"   — index 0
print(test_cases[-1])   # "logout"  — last item

test_cases.append("profile")      # add to end
test_cases.insert(1, "home")      # insert at index 1
test_cases.remove("signup")       # remove by value
popped = test_cases.pop()         # remove and return last item

print(len(test_cases))            # count
print("login" in test_cases)      # True — membership check
test_cases.sort()                  # sort alphabetically in-place
print(test_cases)

# Slicing [start:stop:step]:
first_two = test_cases[:2]        # first 2 items`,expected:`login
logout
4
True
['checkout', 'home', 'login', 'logout']`},{type:"heading",text:"Dictionaries",difficulty:"🟢 Beginner"},{type:"code",code:`# Dictionaries: key-value pairs (like a JSON object)
test_result = {
    "id":       "TC-001",
    "name":     "Login Test",
    "status":   "PASS",
    "duration": 1.23,
    "tags":     ["smoke", "auth"]
}

# Access values:
print(test_result["status"])              # "PASS"
print(test_result.get("browser", "N/A")) # "N/A" — safe, no KeyError

# Modify:
test_result["status"] = "FAIL"            # update value
test_result["retry"]  = True              # add new key

# Iterate:
for key, value in test_result.items():
    print(f"  {key}: {value}")

print("tags" in test_result)             # True`,expected:`PASS
N/A
  id: TC-001
  name: Login Test
  status: FAIL
  duration: 1.23
  tags: ['smoke', 'auth']
  retry: True
True`},{type:"heading",text:"Conditions and Loops",difficulty:"🟢 Beginner"},{type:"code",code:`results = [
    {"test": "login",    "status": "PASS"},
    {"test": "checkout", "status": "FAIL"},
    {"test": "profile",  "status": "PASS"},
    {"test": "logout",   "status": "SKIP"},
]

# if/elif/else:
pass_count = 0
for result in results:
    if result["status"] == "PASS":
        pass_count += 1
    elif result["status"] == "FAIL":
        print(f"  FAILED: {result['test']}")
    else:
        print(f"  Skipped: {result['test']}")

print(f"Passed: {pass_count}/{len(results)}")

# while loop:
retries = 0
while retries < 3:
    retries += 1
    print(f"Attempt {retries}")`,expected:`  FAILED: checkout
  Skipped: logout
Passed: 2/4
Attempt 1
Attempt 2
Attempt 3`},{type:"heading",text:"Functions",difficulty:"🟢 Beginner"},{type:"code",code:`# def keyword defines a function:
def calculate_pass_rate(passed: int, total: int) -> float:
    """Calculate the pass rate as a percentage."""
    if total == 0:
        return 0.0                       # avoid division by zero
    return (passed / total) * 100.0     # return computed value

rate = calculate_pass_rate(42, 50)
print(f"Pass rate: {rate:.1f}%")        # 84.0%

# Default parameter values:
def log_result(test_name, status="UNKNOWN", level="INFO"):
    print(f"[{level}] {test_name}: {status}")

log_result("Login Test", "PASS")
log_result("Signup Test")                # uses defaults`,expected:`Pass rate: 84.0%
[INFO] Login Test: PASS
[INFO] Signup Test: UNKNOWN`},{type:"heading",text:"Reading CSV Files",difficulty:"🟢 Beginner"},{type:"code",label:"read_test_results.py",code:`import csv                              # built-in CSV module — no install needed

# test_results.csv:
# test_name,status,duration_ms
# Login Test,PASS,1200
# Signup Test,FAIL,3400

results = []                            # empty list to hold rows

with open("test_results.csv", "r") as f:     # open file (auto-closes)
    reader = csv.DictReader(f)               # headers become dict keys
    for row in reader:
        results.append(row)

# Count by status:
pass_count = sum(1 for r in results if r["status"] == "PASS")
fail_count = sum(1 for r in results if r["status"] == "FAIL")

print(f"Total: {len(results)}, PASS: {pass_count}, FAIL: {fail_count}")`,expected:"Total: 3, PASS: 2, FAIL: 1"}]},{title:"🟡 Level 2: Intermediate Python",blocks:[{type:"heading",text:"List Comprehensions",difficulty:"🟡 Intermediate"},{type:"code",code:`results = [
    {"name": "Login",    "status": "PASS", "duration": 1200},
    {"name": "Checkout", "status": "FAIL", "duration": 5400},
    {"name": "Profile",  "status": "PASS", "duration": 800},
    {"name": "Logout",   "status": "SKIP", "duration": 0},
]

# List comprehension: [expression for item in iterable if condition]
failed = [r["name"] for r in results if r["status"] == "FAIL"]
print(failed)                     # ['Checkout']

# Transform all values:
durations_sec = [r["duration"] / 1000 for r in results]
print(durations_sec)              # [1.2, 5.4, 0.8, 0.0]

# Nested: list of dicts → list of strings
summaries = [f"{r['name']}:{r['status']}" for r in results]
print(summaries)`,expected:`['Checkout']
[1.2, 5.4, 0.8, 0.0]
['Login:PASS', 'Checkout:FAIL', 'Profile:PASS', 'Logout:SKIP']`},{type:"heading",text:"Exception Handling",difficulty:"🟡 Intermediate"},{type:"code",code:`import requests

def get_user(user_id: int) -> dict:
    """Fetch user from API with full error handling."""
    try:
        response = requests.get(
            f"https://api.example.com/users/{user_id}",
            timeout=5
        )
        response.raise_for_status()      # raises HTTPError if status >= 400
        return response.json()

    except requests.exceptions.ConnectionError:
        print("Cannot connect to server — is it running?")
        return {}

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: {e}")
        return {}

    except requests.exceptions.Timeout:
        print("Request timed out")
        return {}

    except Exception as e:               # unexpected errors
        print(f"Unexpected error: {e}")
        raise                            # re-raise — we want to know about this

    finally:
        print("get_user() call complete") # ALWAYS runs`},{type:"heading",text:"Classes and OOP",difficulty:"🟡 Intermediate"},{type:"code",code:`class TestResult:
    """Represents a single test execution result."""
    total_runs = 0                          # class variable: shared by ALL instances

    def __init__(self, name: str, status: str, duration_ms: int = 0):
        """Constructor — called when you create a TestResult()."""
        self.name        = name             # instance variables (unique per object)
        self.status      = status
        self.duration_ms = duration_ms
        TestResult.total_runs += 1

    def is_passed(self) -> bool:
        return self.status == "PASS"

    def __repr__(self) -> str:
        return f"TestResult({self.name!r}, {self.status!r})"


class TimedTestResult(TestResult):
    """Extends TestResult with SLA checking."""

    def __init__(self, name, status, duration_ms, sla_ms=3000):
        super().__init__(name, status, duration_ms)  # call parent __init__
        self.sla_ms = sla_ms

    def is_within_sla(self) -> bool:
        return self.duration_ms <= self.sla_ms


r1 = TestResult("Login Test", "PASS", 1200)
r2 = TimedTestResult("Checkout", "PASS", 4500, sla_ms=3000)
print(r1)
print(r1.is_passed())
print(r2.is_within_sla())
print(f"Total runs: {TestResult.total_runs}")`,expected:`TestResult('Login Test', 'PASS')
True
False
Total runs: 2`},{type:"heading",text:"Regular Expressions",difficulty:"🟡 Intermediate"},{type:"code",code:`import re

EMAIL_PATTERN = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
DATE_PATTERN  = r'^\\d{4}-\\d{2}-\\d{2}$'    # YYYY-MM-DD

def validate_email(email: str) -> bool:
    return bool(re.match(EMAIL_PATTERN, email))

def find_all_urls(text: str) -> list:
    url_pattern = r'https?://[^\\s"]+'
    return re.findall(url_pattern, text)

def sanitize_name(name: str) -> str:
    return re.sub(r'[^a-z0-9_]', '_', name.lower())

print(validate_email("alice@example.com"))   # True
print(validate_email("not-an-email"))        # False

text = 'See https://example.com and http://test.io/docs for more'
print(find_all_urls(text))

print(sanitize_name("Login Test #1 (Mobile)"))`,expected:`True
False
['https://example.com', 'http://test.io/docs']
login_test__1__mobile_`},{type:"heading",text:"Working with JSON",difficulty:"🟡 Intermediate"},{type:"code",code:`import json

# JSON string -> Python dict:
api_response = '{"user": {"id": 42, "email": "alice@test.com"}, "status": "active"}'
data = json.loads(api_response)          # parse JSON string
print(data["user"]["email"])             # alice@test.com

# Python dict -> JSON string:
test_report = {"run_id": "2024-01-15", "total": 50, "passed": 45}
json_str = json.dumps(test_report, indent=2)
print(json_str)

# Read/write JSON file:
with open("report.json", "w") as f:
    json.dump(test_report, f, indent=2)

with open("report.json", "r") as f:
    loaded = json.load(f)`,expected:`alice@test.com
{
  "run_id": "2024-01-15",
  "total": 50,
  "passed": 45
}`},{type:"heading",text:"Page Object Model (Intermediate Example)",difficulty:"🟡 Intermediate"},{type:"code",label:"pages/login_page.py",code:`from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    """Base class for all Page Objects."""

    def __init__(self, driver):
        self.driver = driver
        self.wait   = WebDriverWait(driver, timeout=10)

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def fill(self, locator, text):
        el = self.wait.until(EC.visibility_of_element_located(locator))
        el.clear()
        el.send_keys(text)

    def get_text(self, locator) -> str:
        return self.wait.until(EC.visibility_of_element_located(locator)).text


class LoginPage(BasePage):
    """Page Object for the login page — inherits BasePage."""

    URL            = "https://example.com/login"
    USERNAME_INPUT = (By.ID, "username")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON   = (By.CSS_SELECTOR, "button[type='submit']")
    ERROR_MSG      = (By.CLASS_NAME, "error-message")

    def navigate(self):
        self.driver.get(self.URL)

    def login(self, username: str, password: str):
        self.fill(self.USERNAME_INPUT, username)
        self.fill(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)

    def get_error_message(self) -> str:
        return self.get_text(self.ERROR_MSG)`}]},{title:"🔴 Level 3: Advanced Python",blocks:[{type:"heading",text:"Decorators",difficulty:"🔴 Advanced"},{type:"text",content:'A decorator is a function that wraps another function to add behavior — without modifying the original. Applied with @ syntax. Think of it as "pre-processing + post-processing" around any function call.'},{type:"code",code:`import time
import functools

# How decorators work — step by step:
def timer(func):
    @functools.wraps(func)            # preserves original function metadata
    def wrapper(*args, **kwargs):     # accepts any args
        start  = time.perf_counter()
        result = func(*args, **kwargs)  # call the original function
        end    = time.perf_counter()
        print(f"{func.__name__} took {(end - start) * 1000:.1f}ms")
        return result
    return wrapper

@timer                                # equivalent to: load_data = timer(load_data)
def load_data(path: str) -> list:
    # ... reads CSV ...
    return []

load_data("results.csv")
# Output: load_data took 12.3ms

# Retry decorator — critical for flaky tests:
def retry(max_attempts: int = 3, delay: float = 1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise          # last attempt — re-raise
                    print(f"Attempt {attempt} failed: {e}. Retrying in {delay}s...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def unstable_api_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Intermittent failure")
    return {"status": "ok"}`,expected:"load_data took 12.3ms"},{type:"heading",text:"Context Managers",difficulty:"🔴 Advanced"},{type:"code",code:`import sqlite3
from contextlib import contextmanager

# Custom context manager for DB connections:
@contextmanager
def get_db_connection(db_path: str):
    """Opens, yields, and auto-closes a DB connection."""
    conn = sqlite3.connect(db_path)    # setup
    try:
        yield conn                      # code inside "with" runs here
        conn.commit()                   # commit on success
    except Exception:
        conn.rollback()                 # rollback on any error
        raise
    finally:
        conn.close()                    # ALWAYS closes

# Usage:
with get_db_connection("test.db") as db:
    db.execute("CREATE TABLE IF NOT EXISTS runs (id INT, name TEXT)")
    db.execute("INSERT INTO runs VALUES (1, 'Login Test')")
# committed and closed automatically

print("DB operations complete")`,expected:"DB operations complete"},{type:"heading",text:"Type Hints",difficulty:"🔴 Advanced"},{type:"code",code:`from typing import Optional, List, Dict, Union, Callable

# Type hints document intent and catch bugs with mypy:
def parse_results(
    raw_data: List[Dict[str, str]],    # list of string-keyed dicts
    filter_status: Optional[str] = None,
) -> Dict[str, int]:                    # returns str->int dict
    counts: Dict[str, int] = {"PASS": 0, "FAIL": 0, "SKIP": 0}
    for result in raw_data:
        status = result.get("status", "UNKNOWN")
        if filter_status and status != filter_status:
            continue
        counts[status] = counts.get(status, 0) + 1
    return counts

# Union: accepts multiple types:
def get_test_id(identifier: Union[int, str]) -> str:
    if isinstance(identifier, int):
        return f"TC-{identifier:04d}"
    return identifier

print(get_test_id(42))    # TC-0042
print(get_test_id("TC-007"))  # TC-007`,expected:`TC-0042
TC-007`},{type:"heading",text:"Pytest Fundamentals",difficulty:"🔴 Advanced"},{type:"code",label:"conftest.py",code:`import pytest
import sqlite3

# conftest.py — shared fixtures for all tests in the folder

@pytest.fixture(scope="session")       # ONE connection for entire test session
def db_conn():
    conn = sqlite3.connect(":memory:") # in-memory DB
    conn.execute("""
        CREATE TABLE users (
            id    INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT    NOT NULL UNIQUE,
            role  TEXT    DEFAULT 'user'
        )
    """)
    conn.commit()
    yield conn
    conn.close()

@pytest.fixture(scope="function")      # fresh user for EACH test
def test_user(db_conn):
    db_conn.execute("INSERT INTO users (email, role) VALUES (?,?)",
                    ("test@example.com", "user"))
    db_conn.commit()
    yield {"email": "test@example.com", "role": "user"}
    db_conn.execute("DELETE FROM users WHERE email = ?", ("test@example.com",))
    db_conn.commit()`},{type:"code",label:"test_users.py",code:`import pytest
import re

def test_user_exists_in_db(db_conn, test_user):
    cursor = db_conn.execute(
        "SELECT email FROM users WHERE email = ?",
        (test_user["email"],)
    )
    row = cursor.fetchone()
    assert row is not None, "User not found in DB after insert"
    assert row[0] == test_user["email"]

@pytest.mark.parametrize("email,should_be_valid", [
    ("alice@example.com", True),      # valid
    ("not-an-email",      False),     # missing @
    ("@nodomain.com",     False),     # missing local part
    ("user@.com",         False),     # missing domain
])
def test_email_validation(email, should_be_valid):
    """parametrize: runs once per tuple."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    result  = bool(re.match(pattern, email))
    assert result == should_be_valid

@pytest.mark.skip(reason="Feature not implemented yet")
def test_future_feature():
    pass

@pytest.mark.xfail(reason="Known bug #123 — pending fix")
def test_known_failing():
    assert False`}]},{title:"🧪 Python in QA — Real Automation Scenarios",blocks:[{type:"heading",text:"Use Case 1: Parse JSON API Response & Assert Values"},{type:"code",code:`import requests

def test_user_api():
    """Validate API response structure and data types."""
    response = requests.get(
        "https://jsonplaceholder.typicode.com/users/1",
        timeout=10
    )

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    data = response.json()

    # Assert required fields exist:
    assert "id"    in data, "Response missing 'id'"
    assert "name"  in data, "Response missing 'name'"
    assert "email" in data, "Response missing 'email'"

    # Assert correct data types:
    assert isinstance(data["id"],    int), "id must be integer"
    assert isinstance(data["name"],  str), "name must be string"

    # Assert business rules:
    assert data["id"] == 1
    assert "@" in data["email"], "email must contain @"

    print(f"OK: {data['name']} ({data['email']})")`},{type:"heading",text:"Use Case 2: Data-Driven Tests from CSV"},{type:"code",code:`import csv, pytest

def load_credentials(filepath: str) -> list:
    """Load test data from CSV for parametrize."""
    with open(filepath) as f:
        # CSV: username,password,expected_result
        return [(r["username"], r["password"], r["expected_result"])
                for r in csv.DictReader(f)]

@pytest.mark.parametrize(
    "username, password, expected",
    load_credentials("test_data/credentials.csv")
)
def test_login(username, password, expected, page):
    page.goto("/login")
    page.fill("#username", username)
    page.fill("#password", password)
    page.click("button[type='submit']")

    if expected == "PASS":
        assert page.url.endswith("/dashboard"), "Expected dashboard URL"
    else:
        assert page.locator(".error-msg").is_visible(), "Expected error message"`},{type:"heading",text:"Use Case 3: Retry Decorator for Flaky Tests"},{type:"code",code:`import functools, time

def retry(max_retries=3, delay=1.0, exceptions=(Exception,)):
    """Retry a function on specified exceptions with configurable delay."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_retries + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_retries:
                        raise           # exhausted retries
                    print(f"Attempt {attempt}/{max_retries} failed: {e}")
                    time.sleep(delay * attempt)   # exponential backoff
        return wrapper
    return decorator

@retry(max_retries=3, delay=1.0, exceptions=(ConnectionError, TimeoutError))
def fetch_auth_token() -> str:
    """Fetch auth token — may be slow on staging."""
    response = requests.post("/auth/token", json={"grant_type": "client_credentials"})
    response.raise_for_status()
    return response.json()["access_token"]`},{type:"heading",text:"Use Case 4: Compare Two API Responses"},{type:"code",code:`import requests

def compare_responses(url_v1: str, url_v2: str) -> dict:
    """Diff two API endpoints — returns dict of differences."""
    r1 = requests.get(url_v1).json()
    r2 = requests.get(url_v2).json()
    diffs = {}

    for key in set(r1.keys()) | set(r2.keys()):
        val1 = r1.get(key, "<MISSING>")
        val2 = r2.get(key, "<MISSING>")
        if val1 != val2:
            diffs[key] = {"v1": val1, "v2": val2}

    return diffs

diffs = compare_responses(
    "https://api.example.com/v1/config",
    "https://api.example.com/v2/config"
)

if diffs:
    print("Differences found between v1 and v2:")
    for field, values in diffs.items():
        print(f"  {field}: v1={values['v1']}  v2={values['v2']}")
else:
    print("APIs return identical responses")`},{type:"heading",text:"Use Case 5: Pytest DB Fixture with Setup/Teardown"},{type:"code",code:`import pytest, sqlite3

@pytest.fixture(scope="session")
def db():
    """Session-scoped SQLite DB — one connection for all tests."""
    conn = sqlite3.connect(":memory:")
    conn.execute("""CREATE TABLE orders (
        id     INTEGER PRIMARY KEY AUTOINCREMENT,
        user   TEXT    NOT NULL,
        amount REAL    NOT NULL,
        status TEXT    DEFAULT 'pending'
    )""")
    conn.commit()
    yield conn
    conn.close()

@pytest.fixture
def sample_order(db):
    """Insert a test order before each test, delete after."""
    cursor = db.execute(
        "INSERT INTO orders (user, amount, status) VALUES (?,?,?)",
        ("alice", 99.99, "pending")
    )
    db.commit()
    order_id = cursor.lastrowid
    yield order_id                 # test receives the order ID
    db.execute("DELETE FROM orders WHERE id = ?", (order_id,))
    db.commit()

def test_order_exists(db, sample_order):
    row = db.execute("SELECT status FROM orders WHERE id=?",
                     (sample_order,)).fetchone()
    assert row is not None
    assert row[0] == "pending"`},{type:"heading",text:"Use Case 6: Validate Test Data with Regex"},{type:"code",code:`import re, csv

VALIDATORS = {
    "email": re.compile(r'^[^@]+@[^@]+\\.[a-zA-Z]{2,}$'),
    "phone": re.compile(r'^[+]?[\\d\\s\\-()]{7,15}$'),
    "date":  re.compile(r'^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$'),
}

def validate_row(row: dict) -> list:
    errors = []
    for field, pattern in VALIDATORS.items():
        value = row.get(field, "")
        if not pattern.match(value):
            errors.append(f"Invalid {field}: '{value}'")
    return errors

# Validate entire CSV:
all_errors = []
with open("test_users.csv") as f:
    for i, row in enumerate(csv.DictReader(f), 1):
        row_errors = validate_row(row)
        if row_errors:
            all_errors.append({"row": i, "errors": row_errors})

if all_errors:
    for e in all_errors:
        print(f"Row {e['row']}: {', '.join(e['errors'])}")
else:
    print("All test data is valid")`},{type:"heading",text:"Use Case 7: Generate Test Report with Timestamp"},{type:"code",code:`import json
from datetime import datetime
from pathlib import Path

def generate_report(results: list, output_dir: str = "reports") -> str:
    Path(output_dir).mkdir(exist_ok=True)

    report = {
        "generated_at": datetime.now().isoformat(),
        "total":   len(results),
        "passed":  sum(1 for r in results if r["status"] == "PASS"),
        "failed":  sum(1 for r in results if r["status"] == "FAIL"),
        "skipped": sum(1 for r in results if r["status"] == "SKIP"),
        "results": results
    }
    if report["total"]:
        report["pass_rate"] = round(report["passed"] / report["total"] * 100, 1)

    filename = f"{output_dir}/report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filename, "w") as f:
        json.dump(report, f, indent=2)

    print(f"Report: {filename} | Pass rate: {report.get('pass_rate', 0)}%")
    return filename`}]},{title:"💼 Python Interview Questions & Answers",blocks:[{type:"text",content:"Click each question to expand the model answer. Organized by difficulty."},{type:"subheading",text:"🟢 Basic Questions"},{type:"qa",question:"Q1: What is the difference between a list and a tuple?",answer:`Lists are MUTABLE (can change after creation) and use []. Tuples are IMMUTABLE (cannot change) and use ().

Use lists when the collection changes (appending results). Use tuples when data should be fixed — allowed status values, a (x,y) coordinate, a Selenium locator.`,code:`results = ["PASS", "FAIL"]
results.append("SKIP")        # OK — lists are mutable

STATUS_OPTIONS = ("PASS", "FAIL", "SKIP")
# STATUS_OPTIONS.append("x")  # TypeError: tuple does not support append

# Tuples also unpack cleanly:
def get_viewport() -> tuple:
    return (1920, 1080)
width, height = get_viewport()`},{type:"qa",question:"Q2: What is None in Python?",answer:`None is Python's null — the absence of a value. It's its own type (NoneType). All functions without a return statement implicitly return None.

Always check with "is None" or "is not None" — never use == None.`,code:`value = None
print(value is None)        # True  ← correct
print(value == None)        # True  — works but wrong style

def log(event):
    print(event)
    # no return → implicitly returns None

result = log("click")
print(result is None)       # True

# Safe default with "or":
name = user.get("name") or "Anonymous"`},{type:"qa",question:"Q3: What is the difference between == and is?",answer:`== checks VALUE equality. "is" checks IDENTITY — whether two variables point to the SAME object in memory.

Rule: use "is" only for None, True, False. Use == for everything else.`,code:`a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True  — equal values
print(a is b)   # False — different objects
print(a is c)   # True  — same reference

# Correct None check:
result = None
print(result is None)    # True`},{type:"qa",question:"Q4: What does *args and **kwargs mean?",answer:"*args collects extra POSITIONAL arguments into a tuple. **kwargs collects extra KEYWORD arguments into a dict. They let functions accept any number of arguments — essential for writing decorators that wrap any function.",code:`def log_event(*args, **kwargs):
    print("args:", args)      # tuple of positional args
    print("kwargs:", kwargs)  # dict of keyword args

log_event("test_login", "FAIL", duration=2.3, retry=True)
# args: ('test_login', 'FAIL')
# kwargs: {'duration': 2.3, 'retry': True}

# Decorator must pass all args through:
def decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)  # pass everything through
    return wrapper`},{type:"qa",question:"Q5: What is a list comprehension?",answer:"A concise one-line way to create a list: [expression for item in iterable if condition]. More readable than a for loop for simple transformations. Avoid nested comprehensions — use regular loops when logic is complex.",code:`results = [
    {"name": "Login",  "status": "FAIL"},
    {"name": "Signup", "status": "PASS"},
]

failed = [r["name"] for r in results if r["status"] == "FAIL"]
print(failed)   # ['Login']`},{type:"subheading",text:"🟡 Intermediate Questions"},{type:"qa",question:"Q6: What is a decorator and how do you write one?",answer:"A decorator is a function that takes a function, wraps it with behavior, and returns the wrapped version. In test automation: @retry, @timer, @pytest.fixture, @allure.step are all decorators. functools.wraps preserves the wrapped function's metadata.",code:`import functools, time

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start  = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {(time.time()-start)*1000:.0f}ms")
        return result
    return wrapper

@timer
def load_test_data(path):
    return []

load_test_data("results.csv")
# Output: load_test_data took 12ms`},{type:"qa",question:"Q7: Explain pytest fixture scopes.",answer:`function (default): new fixture per test. Use for isolation (create/delete user per test).
class: shared across all tests in one class.
module: shared across all tests in one file.
session: shared across entire test session. Use for expensive setup — DB connections, browser instances, auth tokens.`,code:`@pytest.fixture(scope="session")
def db():
    conn = create_connection()  # expensive — create ONCE
    yield conn
    conn.close()

@pytest.fixture(scope="function")
def test_user(db):              # cheap — recreate per test
    user = db.create_user("test@test.com")
    yield user
    db.delete_user(user.id)     # cleanup after each test`},{type:"qa",question:"Q8: What is exception handling in test automation?",answer:"try/except/finally catches runtime errors. In automation: catch network errors so one failed API call doesn't crash the test runner. Use finally for cleanup (browser/connection always closes). Raise custom exceptions for better error messages.",code:`def safe_get(url: str):
    try:
        r = requests.get(url, timeout=5)
        r.raise_for_status()    # raises on 4xx/5xx
        return r.json()
    except requests.Timeout:
        pytest.fail(f"Timeout: {url}")
    except requests.HTTPError as e:
        pytest.fail(f"HTTP {e.response.status_code}")
    finally:
        pass  # cleanup, logging, etc.`},{type:"qa",question:"Q9: Difference between instance, class, and static methods?",answer:`Instance method: first param is self — accesses instance state. Most common.
Class method (@classmethod): first param is cls — accesses class state. Use for alternative constructors.
Static method (@staticmethod): no self/cls — pure utility function in the class namespace.`,code:`class TestData:
    registry = []

    def __init__(self, name, status):
        self.name   = name
        self.status = status

    def is_passed(self):              # instance method
        return self.status == "PASS"

    @classmethod
    def from_dict(cls, data: dict):   # class method — alt constructor
        return cls(data["name"], data["status"])

    @staticmethod
    def valid_statuses() -> list:     # static utility
        return ["PASS", "FAIL", "SKIP"]`},{type:"qa",question:"Q10: How would you structure a Python test automation framework?",answer:`Key layers: pages/ (Page Objects, one per page), tests/ (pytest files per feature), fixtures/ (conftest.py hierarchy), test_data/ (CSV, JSON files), utils/ (API clients, DB helpers), reports/ (git-ignored output), config/ (.env + config.py).

Principles: DRY (no repeated locators), fixtures handle setup/teardown, parametrize drives data-driven tests, CI runs everything headless.`,code:`# Recommended project structure:
# project/
# ├── conftest.py          <- session-scoped fixtures
# ├── pytest.ini           <- marks, base URL, reporters
# ├── requirements.txt
# ├── pages/
# │   ├── base_page.py
# │   └── login_page.py
# ├── tests/
# │   ├── conftest.py      <- test-level fixtures
# │   └── test_login.py
# ├── utils/
# │   └── api_client.py
# └── test_data/
#     └── users.csv`},{type:"subheading",text:"🔴 Advanced Questions"},{type:"qa",question:"Q11: What is a generator? When to use in testing?",answer:"A generator produces values one at a time using yield — lazy evaluation. Unlike a list, it doesn't store all values in memory. Use in testing for: generating large test datasets without memory issues, processing huge log files line-by-line.",code:`# List — 1M strings in memory upfront:
ids_list = [f"TC-{i:06d}" for i in range(1_000_000)]  # ~50MB RAM

# Generator — compute ONE at a time:
def id_generator(count: int):
    for i in range(count):
        yield f"TC-{i:06d}"   # pauses here, resumes on next()

gen = id_generator(1_000_000)   # almost no memory
print(next(gen))   # TC-000000
print(next(gen))   # TC-000001`},{type:"qa",question:"Q12: How do you write a retry decorator for flaky tests?",answer:"Key elements: functools.wraps to preserve metadata, configurable max_retries + delay + exception types, exponential backoff between attempts, re-raise the last exception when all retries exhausted.",code:`def retry(max_attempts=3, delay=1.0, exceptions=(Exception,)):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
                    time.sleep(delay * attempt)  # exponential backoff
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5, exceptions=(ConnectionError,))
def fetch_token() -> str:
    return requests.post("/auth").json()["token"]`},{type:"qa",question:"Q13: What is a context manager and how do you write a custom one?",answer:'A context manager ensures setup and cleanup always happen — even if an exception occurs. Behind "with open(file) as f:". Write custom ones with @contextmanager decorator or __enter__/__exit__ methods.',code:`from contextlib import contextmanager

@contextmanager
def managed_page(browser):
    page = browser.new_page()
    try:
        yield page          # code inside "with" block runs here
    finally:
        page.close()        # ALWAYS executes

with managed_page(browser) as page:
    page.goto("/login")
    # page.close() called automatically even if assertion fails`}]},{title:"📝 Practice Exercises & Quick Reference",blocks:[{type:"heading",text:"Practice Exercises"},{type:"exercise",difficulty:"🟢 Beginner",title:"Exercise 1: Parse Test Results",description:'Write a function parse_results(results) that takes a list of dicts (each with a "status" key: "PASS", "FAIL", or "SKIP") and returns a dict with counts: {"PASS": N, "FAIL": N, "SKIP": N, "total": N}.',hint:'Initialize counts dict before the loop. Use .get(status, "UNKNOWN") for safety.',solution:`def parse_results(results: list) -> dict:
    counts = {"PASS": 0, "FAIL": 0, "SKIP": 0}

    for result in results:
        status = result.get("status", "UNKNOWN")
        if status in counts:
            counts[status] += 1

    counts["total"] = len(results)
    return counts

# Test it:
data = [
    {"test": "login",    "status": "PASS"},
    {"test": "checkout", "status": "FAIL"},
    {"test": "signup",   "status": "PASS"},
    {"test": "profile",  "status": "SKIP"},
]
print(parse_results(data))
# {'PASS': 2, 'FAIL': 1, 'SKIP': 1, 'total': 4}`,explanation:'Initialize counts before the loop. .get() with default avoids KeyError. Add "total" at the end so it reflects all items including unknowns.'},{type:"exercise",difficulty:"🟡 Intermediate",title:"Exercise 2: APIClient Class",description:"Create class APIClient with base_url, and get(path) / post(path, data) methods returning parsed JSON. Handle ConnectionError (return None), Timeout (return None), HTTPError (raise). Use requests.Session for connection reuse.",hint:"Use requests.Session() in __init__. response.raise_for_status() auto-raises on 4xx/5xx.",solution:`import requests

class APIClient:
    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout  = timeout
        self.session  = requests.Session()

    def get(self, path: str) -> dict | None:
        try:
            r = self.session.get(
                f"{self.base_url}/{path.lstrip('/')}",
                timeout=self.timeout
            )
            r.raise_for_status()
            return r.json()
        except requests.ConnectionError:
            print(f"Cannot connect to {self.base_url}")
            return None
        except requests.Timeout:
            print(f"Request timed out after {self.timeout}s")
            return None
        except requests.HTTPError as e:
            raise RuntimeError(f"HTTP {e.response.status_code}: {path}")

    def post(self, path: str, data: dict) -> dict | None:
        try:
            r = self.session.post(
                f"{self.base_url}/{path.lstrip('/')}",
                json=data, timeout=self.timeout
            )
            r.raise_for_status()
            return r.json()
        except requests.ConnectionError:
            return None

# Usage:
client = APIClient("https://jsonplaceholder.typicode.com")
user = client.get("/users/1")
print(user["name"])   # Leanne Graham`,explanation:"Session reuses TCP connections reducing overhead. Separating network errors (return None) from HTTP errors (raise) gives callers different options."},{type:"exercise",difficulty:"🔴 Advanced",title:"Exercise 3: pytest conftest with Session DB + CSV Parametrize",description:"Write conftest.py with session-scoped SQLite fixture (creates users table). Write test_users.py that loads test data from CSV via parametrize and validates each user's email in the DB.",hint:'conftest.py scope="session". Use load_csv() inside @pytest.mark.parametrize([...]).',solution:`# conftest.py
import pytest, sqlite3, csv

def load_user_csv():
    with open("test_data/users.csv") as f:
        return [(r["email"], r["role"]) for r in csv.DictReader(f)]

@pytest.fixture(scope="session")
def db():
    conn = sqlite3.connect(":memory:")
    conn.execute("""CREATE TABLE users (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT    NOT NULL UNIQUE,
        role  TEXT    DEFAULT 'user'
    )""")
    conn.commit()
    yield conn
    conn.close()

# test_users.py
import re

EMAIL_RE = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')

@pytest.mark.parametrize("email,role", [
    ("alice@test.com", "admin"),
    ("bob@test.com",   "user"),
])
def test_user_validation(db, email, role):
    assert EMAIL_RE.match(email), f"Invalid email: {email}"

    db.execute("INSERT INTO users (email, role) VALUES (?,?)", (email, role))
    db.commit()

    row = db.execute("SELECT role FROM users WHERE email=?", (email,)).fetchone()
    assert row is not None
    assert row[0] == role

    db.execute("DELETE FROM users WHERE email=?", (email,))
    db.commit()`,explanation:"Session scope: DB persists across all tests (efficient). Each test cleans up its own data to avoid state leaking between tests. parametrize drives multiple scenarios from one function."},{type:"heading",text:"Quick Reference Card"},{type:"table",headers:["Concept","Syntax","Example"],rows:[["f-string",'f"{var}"','f"Test {name}: {status}"'],["List comprehension","[expr for x in lst if cond]",'[r["name"] for r in res if r["status"]=="FAIL"]'],["Dict safe get","dict.get(key, default)",'row.get("status", "UNKNOWN")'],["Unpacking","a, b = iterable","width, height = (1920, 1080)"],["Type hint","param: type","def fn(name: str) -> bool:"],["Optional","Optional[T]","def fn(x: Optional[str] = None)"],["Decorator","@decorator","@retry(max_attempts=3)"],["Context manager","with expr as var:",'with open("f.txt") as f:'],["Generator","yield value","def gen(): yield item"],["Fixture (pytest)","@pytest.fixture(scope=...)",'@pytest.fixture(scope="session")'],["Parametrize","@pytest.mark.parametrize()",'@pytest.mark.parametrize("x,y", [(1,2)])'],["Assert with msg",'assert expr, "msg"','assert status == "PASS", f"Got {status}"'],["Regex match","re.match(pattern, s)",'re.match(r"^\\d+$", "123")'],["JSON parse","json.loads(str)","data = json.loads(response.text)"],["CSV read","csv.DictReader(f)","for row in csv.DictReader(f):"]]},{type:"tip",content:'Run "python -m pytest -v --tb=short" for verbose output with compact tracebacks. Add "--headed" to Playwright to see the browser while debugging.'}]}],Ug={title:"🐍 Python",subtitle:"QA Mühendisleri için Python ve Test Otomasyonu",intro:"Python'u sıfırdan öğrenin, test otomasyonuna odaklanın. Temel kodlamadan gelişmiş pytest çerçevelerine kadar — modern bir QA mühendisinin ihtiyaç duyduğu her şey burada."},Fg=["🎯 Giriş","📦 Kurulum","🟢 Temeller","🟡 Orta Seviye","🔴 İleri Seviye","🧪 QA Kullanım","💼 Mülakat","📝 Pratik & Referans"],Mg={title:"🐍 Python",subtitle:"Python for QA Engineers & Test Automation",intro:"Learn Python from scratch with a focus on test automation. From basic scripting to advanced pytest frameworks — everything a modern QA engineer needs to write reliable, maintainable tests."},Bg=["🎯 Intro & Why","📦 Installation","🟢 Foundations","🟡 Intermediate","🔴 Advanced","🧪 QA Use Cases","💼 Interview Q&A","📝 Practice & Reference"],$g={en:{hero:Mg,tabs:Bg,sections:Ml},tr:{hero:Ug,tabs:Fg,sections:Ml}};function Hg(){return n.jsx(Ws,{data:$g,gradient:"from-yellow-500 to-green-600",bgLight:"bg-gradient-to-br from-yellow-50 via-green-50 to-emerald-50"})}function zg(){return n.jsxs(Gh,{children:[n.jsx(Kt,{path:"/",element:n.jsx(bg,{})}),n.jsx(Kt,{path:"/jmeter",element:n.jsx(kg,{})}),n.jsx(Kt,{path:"/sql",element:n.jsx(Lg,{})}),n.jsx(Kt,{path:"/typescript",element:n.jsx(Dg,{})}),n.jsx(Kt,{path:"/python",element:n.jsx(Hg,{})})]})}async function Wg(){const{worker:e}=await Su(async()=>{const{worker:t}=await import("./browser-BWH0v1mm.js");return{worker:t}},[]);return e.start({onUnhandledRequest:"bypass",serviceWorker:{url:"/automationexercise/mockServiceWorker.js",options:{scope:"/automationexercise/"}}}).catch(t=>{console.error("Failed to start MSW:",t)})}Wg().catch(console.error).finally(()=>{Xd(document.getElementById("root")).render(n.jsx(v.StrictMode,{children:n.jsx(yf,{children:n.jsx(dg,{children:n.jsx(zg,{})})})}))});
