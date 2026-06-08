(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();const fu="modulepreload",xu=function(e){return"/automationexercise/"+e},fl={},vu=function(t,r,a){let i=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),o=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=Promise.allSettled(r.map(c=>{if(c=xu(c),c in fl)return;fl[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":fu,d||(m.as="script"),m.crossOrigin="",m.href=c,o&&m.setAttribute("nonce",o),document.head.appendChild(m),d)return new Promise((f,y)=>{m.addEventListener("load",f),m.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(l){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l}return i.then(l=>{for(const o of l||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})};var Oo={exports:{}},Na={},zo={exports:{}},D={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mn=Symbol.for("react.element"),bu=Symbol.for("react.portal"),ku=Symbol.for("react.fragment"),wu=Symbol.for("react.strict_mode"),Su=Symbol.for("react.profiler"),Eu=Symbol.for("react.provider"),Tu=Symbol.for("react.context"),Nu=Symbol.for("react.forward_ref"),ju=Symbol.for("react.suspense"),Pu=Symbol.for("react.memo"),Cu=Symbol.for("react.lazy"),xl=Symbol.iterator;function Ru(e){return e===null||typeof e!="object"?null:(e=xl&&e[xl]||e["@@iterator"],typeof e=="function"?e:null)}var Uo={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Bo=Object.assign,Mo={};function kr(e,t,r){this.props=e,this.context=t,this.refs=Mo,this.updater=r||Uo}kr.prototype.isReactComponent={};kr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};kr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Fo(){}Fo.prototype=kr.prototype;function hs(e,t,r){this.props=e,this.context=t,this.refs=Mo,this.updater=r||Uo}var ys=hs.prototype=new Fo;ys.constructor=hs;Bo(ys,kr.prototype);ys.isPureReactComponent=!0;var vl=Array.isArray,Ho=Object.prototype.hasOwnProperty,gs={current:null},qo={key:!0,ref:!0,__self:!0,__source:!0};function $o(e,t,r){var a,i={},s=null,l=null;if(t!=null)for(a in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(s=""+t.key),t)Ho.call(t,a)&&!qo.hasOwnProperty(a)&&(i[a]=t[a]);var o=arguments.length-2;if(o===1)i.children=r;else if(1<o){for(var c=Array(o),d=0;d<o;d++)c[d]=arguments[d+2];i.children=c}if(e&&e.defaultProps)for(a in o=e.defaultProps,o)i[a]===void 0&&(i[a]=o[a]);return{$$typeof:mn,type:e,key:s,ref:l,props:i,_owner:gs.current}}function _u(e,t){return{$$typeof:mn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function fs(e){return typeof e=="object"&&e!==null&&e.$$typeof===mn}function Au(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var bl=/\/+/g;function Wa(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Au(""+e.key):t.toString(36)}function Mn(e,t,r,a,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case mn:case bu:l=!0}}if(l)return l=e,i=i(l),e=a===""?"."+Wa(l,0):a,vl(i)?(r="",e!=null&&(r=e.replace(bl,"$&/")+"/"),Mn(i,t,r,"",function(d){return d})):i!=null&&(fs(i)&&(i=_u(i,r+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(bl,"$&/")+"/")+e)),t.push(i)),1;if(l=0,a=a===""?".":a+":",vl(e))for(var o=0;o<e.length;o++){s=e[o];var c=a+Wa(s,o);l+=Mn(s,t,r,c,i)}else if(c=Ru(e),typeof c=="function")for(e=c.call(e),o=0;!(s=e.next()).done;)s=s.value,c=a+Wa(s,o++),l+=Mn(s,t,r,c,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function wn(e,t,r){if(e==null)return e;var a=[],i=0;return Mn(e,a,"","",function(s){return t.call(r,s,i++)}),a}function Lu(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var me={current:null},Fn={transition:null},Iu={ReactCurrentDispatcher:me,ReactCurrentBatchConfig:Fn,ReactCurrentOwner:gs};function Wo(){throw Error("act(...) is not supported in production builds of React.")}D.Children={map:wn,forEach:function(e,t,r){wn(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return wn(e,function(){t++}),t},toArray:function(e){return wn(e,function(t){return t})||[]},only:function(e){if(!fs(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};D.Component=kr;D.Fragment=ku;D.Profiler=Su;D.PureComponent=hs;D.StrictMode=wu;D.Suspense=ju;D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Iu;D.act=Wo;D.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=Bo({},e.props),i=e.key,s=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,l=gs.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(c in t)Ho.call(t,c)&&!qo.hasOwnProperty(c)&&(a[c]=t[c]===void 0&&o!==void 0?o[c]:t[c])}var c=arguments.length-2;if(c===1)a.children=r;else if(1<c){o=Array(c);for(var d=0;d<c;d++)o[d]=arguments[d+2];a.children=o}return{$$typeof:mn,type:e.type,key:i,ref:s,props:a,_owner:l}};D.createContext=function(e){return e={$$typeof:Tu,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Eu,_context:e},e.Consumer=e};D.createElement=$o;D.createFactory=function(e){var t=$o.bind(null,e);return t.type=e,t};D.createRef=function(){return{current:null}};D.forwardRef=function(e){return{$$typeof:Nu,render:e}};D.isValidElement=fs;D.lazy=function(e){return{$$typeof:Cu,_payload:{_status:-1,_result:e},_init:Lu}};D.memo=function(e,t){return{$$typeof:Pu,type:e,compare:t===void 0?null:t}};D.startTransition=function(e){var t=Fn.transition;Fn.transition={};try{e()}finally{Fn.transition=t}};D.unstable_act=Wo;D.useCallback=function(e,t){return me.current.useCallback(e,t)};D.useContext=function(e){return me.current.useContext(e)};D.useDebugValue=function(){};D.useDeferredValue=function(e){return me.current.useDeferredValue(e)};D.useEffect=function(e,t){return me.current.useEffect(e,t)};D.useId=function(){return me.current.useId()};D.useImperativeHandle=function(e,t,r){return me.current.useImperativeHandle(e,t,r)};D.useInsertionEffect=function(e,t){return me.current.useInsertionEffect(e,t)};D.useLayoutEffect=function(e,t){return me.current.useLayoutEffect(e,t)};D.useMemo=function(e,t){return me.current.useMemo(e,t)};D.useReducer=function(e,t,r){return me.current.useReducer(e,t,r)};D.useRef=function(e){return me.current.useRef(e)};D.useState=function(e){return me.current.useState(e)};D.useSyncExternalStore=function(e,t,r){return me.current.useSyncExternalStore(e,t,r)};D.useTransition=function(){return me.current.useTransition()};D.version="18.3.1";zo.exports=D;var v=zo.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Du=v,Ou=Symbol.for("react.element"),zu=Symbol.for("react.fragment"),Uu=Object.prototype.hasOwnProperty,Bu=Du.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Mu={key:!0,ref:!0,__self:!0,__source:!0};function Jo(e,t,r){var a,i={},s=null,l=null;r!==void 0&&(s=""+r),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(l=t.ref);for(a in t)Uu.call(t,a)&&!Mu.hasOwnProperty(a)&&(i[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)i[a]===void 0&&(i[a]=t[a]);return{$$typeof:Ou,type:e,key:s,ref:l,props:i,_owner:Bu.current}}Na.Fragment=zu;Na.jsx=Jo;Na.jsxs=Jo;Oo.exports=Na;var n=Oo.exports,Go={exports:{}},Te={},Vo={exports:{}},Ko={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(C,A){var I=C.length;C.push(A);e:for(;0<I;){var U=I-1>>>1,E=C[U];if(0<i(E,A))C[U]=A,C[I]=E,I=U;else break e}}function r(C){return C.length===0?null:C[0]}function a(C){if(C.length===0)return null;var A=C[0],I=C.pop();if(I!==A){C[0]=I;e:for(var U=0,E=C.length,B=E>>>1;U<B;){var $=2*(U+1)-1,de=C[$],_t=$+1,kn=C[_t];if(0>i(de,I))_t<E&&0>i(kn,de)?(C[U]=kn,C[_t]=I,U=_t):(C[U]=de,C[$]=I,U=$);else if(_t<E&&0>i(kn,I))C[U]=kn,C[_t]=I,U=_t;else break e}}return A}function i(C,A){var I=C.sortIndex-A.sortIndex;return I!==0?I:C.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var l=Date,o=l.now();e.unstable_now=function(){return l.now()-o}}var c=[],d=[],h=1,m=null,f=3,y=!1,k=!1,x=!1,b=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(C){for(var A=r(d);A!==null;){if(A.callback===null)a(d);else if(A.startTime<=C)a(d),A.sortIndex=A.expirationTime,t(c,A);else break;A=r(d)}}function w(C){if(x=!1,g(C),!k)if(r(c)!==null)k=!0,Tr(S);else{var A=r(d);A!==null&&Gt(w,A.startTime-C)}}function S(C,A){k=!1,x&&(x=!1,p(P),P=-1),y=!0;var I=f;try{for(g(A),m=r(c);m!==null&&(!(m.expirationTime>A)||C&&!X());){var U=m.callback;if(typeof U=="function"){m.callback=null,f=m.priorityLevel;var E=U(m.expirationTime<=A);A=e.unstable_now(),typeof E=="function"?m.callback=E:m===r(c)&&a(c),g(A)}else a(c);m=r(c)}if(m!==null)var B=!0;else{var $=r(d);$!==null&&Gt(w,$.startTime-A),B=!1}return B}finally{m=null,f=I,y=!1}}var N=!1,j=null,P=-1,L=5,_=-1;function X(){return!(e.unstable_now()-_<L)}function Ye(){if(j!==null){var C=e.unstable_now();_=C;var A=!0;try{A=j(!0,C)}finally{A?Ie():(N=!1,j=null)}}else N=!1}var Ie;if(typeof u=="function")Ie=function(){u(Ye)};else if(typeof MessageChannel<"u"){var Qe=new MessageChannel,ye=Qe.port2;Qe.port1.onmessage=Ye,Ie=function(){ye.postMessage(null)}}else Ie=function(){b(Ye,0)};function Tr(C){j=C,N||(N=!0,Ie())}function Gt(C,A){P=b(function(){C(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){k||y||(k=!0,Tr(S))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return r(c)},e.unstable_next=function(C){switch(f){case 1:case 2:case 3:var A=3;break;default:A=f}var I=f;f=A;try{return C()}finally{f=I}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,A){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var I=f;f=C;try{return A()}finally{f=I}},e.unstable_scheduleCallback=function(C,A,I){var U=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?U+I:U):I=U,C){case 1:var E=-1;break;case 2:E=250;break;case 5:E=1073741823;break;case 4:E=1e4;break;default:E=5e3}return E=I+E,C={id:h++,callback:A,priorityLevel:C,startTime:I,expirationTime:E,sortIndex:-1},I>U?(C.sortIndex=I,t(d,C),r(c)===null&&C===r(d)&&(x?(p(P),P=-1):x=!0,Gt(w,I-U))):(C.sortIndex=E,t(c,C),k||y||(k=!0,Tr(S))),C},e.unstable_shouldYield=X,e.unstable_wrapCallback=function(C){var A=f;return function(){var I=f;f=A;try{return C.apply(this,arguments)}finally{f=I}}}})(Ko);Vo.exports=Ko;var Fu=Vo.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hu=v,Ee=Fu;function T(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Yo=new Set,Vr={};function $t(e,t){hr(e,t),hr(e+"Capture",t)}function hr(e,t){for(Vr[e]=t,e=0;e<t.length;e++)Yo.add(t[e])}var nt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),bi=Object.prototype.hasOwnProperty,qu=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,kl={},wl={};function $u(e){return bi.call(wl,e)?!0:bi.call(kl,e)?!1:qu.test(e)?wl[e]=!0:(kl[e]=!0,!1)}function Wu(e,t,r,a){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ju(e,t,r,a){if(t===null||typeof t>"u"||Wu(e,t,r,a))return!0;if(a)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function he(e,t,r,a,i,s,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=i,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=l}var ie={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ie[e]=new he(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ie[t]=new he(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ie[e]=new he(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ie[e]=new he(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ie[e]=new he(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ie[e]=new he(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ie[e]=new he(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ie[e]=new he(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ie[e]=new he(e,5,!1,e.toLowerCase(),null,!1,!1)});var xs=/[\-:]([a-z])/g;function vs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(xs,vs);ie[t]=new he(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(xs,vs);ie[t]=new he(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(xs,vs);ie[t]=new he(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ie[e]=new he(e,1,!1,e.toLowerCase(),null,!1,!1)});ie.xlinkHref=new he("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ie[e]=new he(e,1,!1,e.toLowerCase(),null,!0,!0)});function bs(e,t,r,a){var i=ie.hasOwnProperty(t)?ie[t]:null;(i!==null?i.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ju(t,r,i,a)&&(r=null),a||i===null?$u(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):i.mustUseProperty?e[i.propertyName]=r===null?i.type===3?!1:"":r:(t=i.attributeName,a=i.attributeNamespace,r===null?e.removeAttribute(t):(i=i.type,r=i===3||i===4&&r===!0?"":""+r,a?e.setAttributeNS(a,t,r):e.setAttribute(t,r))))}var ot=Hu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Sn=Symbol.for("react.element"),Yt=Symbol.for("react.portal"),Qt=Symbol.for("react.fragment"),ks=Symbol.for("react.strict_mode"),ki=Symbol.for("react.profiler"),Qo=Symbol.for("react.provider"),Xo=Symbol.for("react.context"),ws=Symbol.for("react.forward_ref"),wi=Symbol.for("react.suspense"),Si=Symbol.for("react.suspense_list"),Ss=Symbol.for("react.memo"),pt=Symbol.for("react.lazy"),Zo=Symbol.for("react.offscreen"),Sl=Symbol.iterator;function Nr(e){return e===null||typeof e!="object"?null:(e=Sl&&e[Sl]||e["@@iterator"],typeof e=="function"?e:null)}var V=Object.assign,Ja;function Dr(e){if(Ja===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Ja=t&&t[1]||""}return`
`+Ja+e}var Ga=!1;function Va(e,t){if(!e||Ga)return"";Ga=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var a=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){a=d}e.call(t.prototype)}else{try{throw Error()}catch(d){a=d}e()}}catch(d){if(d&&a&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),s=a.stack.split(`
`),l=i.length-1,o=s.length-1;1<=l&&0<=o&&i[l]!==s[o];)o--;for(;1<=l&&0<=o;l--,o--)if(i[l]!==s[o]){if(l!==1||o!==1)do if(l--,o--,0>o||i[l]!==s[o]){var c=`
`+i[l].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=l&&0<=o);break}}}finally{Ga=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?Dr(e):""}function Gu(e){switch(e.tag){case 5:return Dr(e.type);case 16:return Dr("Lazy");case 13:return Dr("Suspense");case 19:return Dr("SuspenseList");case 0:case 2:case 15:return e=Va(e.type,!1),e;case 11:return e=Va(e.type.render,!1),e;case 1:return e=Va(e.type,!0),e;default:return""}}function Ei(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Qt:return"Fragment";case Yt:return"Portal";case ki:return"Profiler";case ks:return"StrictMode";case wi:return"Suspense";case Si:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Xo:return(e.displayName||"Context")+".Consumer";case Qo:return(e._context.displayName||"Context")+".Provider";case ws:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ss:return t=e.displayName||null,t!==null?t:Ei(e.type)||"Memo";case pt:t=e._payload,e=e._init;try{return Ei(e(t))}catch{}}return null}function Vu(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ei(t);case 8:return t===ks?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Nt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ec(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ku(e){var t=ec(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var i=r.get,s=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(l){a=""+l,s.call(this,l)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(l){a=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function En(e){e._valueTracker||(e._valueTracker=Ku(e))}function tc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),a="";return e&&(a=ec(e)?e.checked?"true":"false":e.value),e=a,e!==r?(t.setValue(e),!0):!1}function ea(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ti(e,t){var r=t.checked;return V({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function El(e,t){var r=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;r=Nt(t.value!=null?t.value:r),e._wrapperState={initialChecked:a,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function rc(e,t){t=t.checked,t!=null&&bs(e,"checked",t,!1)}function Ni(e,t){rc(e,t);var r=Nt(t.value),a=t.type;if(r!=null)a==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ji(e,t.type,r):t.hasOwnProperty("defaultValue")&&ji(e,t.type,Nt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Tl(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function ji(e,t,r){(t!=="number"||ea(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Or=Array.isArray;function or(e,t,r,a){if(e=e.options,t){t={};for(var i=0;i<r.length;i++)t["$"+r[i]]=!0;for(r=0;r<e.length;r++)i=t.hasOwnProperty("$"+e[r].value),e[r].selected!==i&&(e[r].selected=i),i&&a&&(e[r].defaultSelected=!0)}else{for(r=""+Nt(r),t=null,i=0;i<e.length;i++){if(e[i].value===r){e[i].selected=!0,a&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Pi(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(T(91));return V({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Nl(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(T(92));if(Or(r)){if(1<r.length)throw Error(T(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Nt(r)}}function nc(e,t){var r=Nt(t.value),a=Nt(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),a!=null&&(e.defaultValue=""+a)}function jl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ac(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ci(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ac(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Tn,ic=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,a,i){MSApp.execUnsafeLocalFunction(function(){return e(t,r,a,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Tn=Tn||document.createElement("div"),Tn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Tn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Kr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Br={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Yu=["Webkit","ms","Moz","O"];Object.keys(Br).forEach(function(e){Yu.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Br[t]=Br[e]})});function sc(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Br.hasOwnProperty(e)&&Br[e]?(""+t).trim():t+"px"}function lc(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var a=r.indexOf("--")===0,i=sc(r,t[r],a);r==="float"&&(r="cssFloat"),a?e.setProperty(r,i):e[r]=i}}var Qu=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ri(e,t){if(t){if(Qu[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(T(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(T(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(T(61))}if(t.style!=null&&typeof t.style!="object")throw Error(T(62))}}function _i(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ai=null;function Es(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Li=null,cr=null,dr=null;function Pl(e){if(e=gn(e)){if(typeof Li!="function")throw Error(T(280));var t=e.stateNode;t&&(t=_a(t),Li(e.stateNode,e.type,t))}}function oc(e){cr?dr?dr.push(e):dr=[e]:cr=e}function cc(){if(cr){var e=cr,t=dr;if(dr=cr=null,Pl(e),t)for(e=0;e<t.length;e++)Pl(t[e])}}function dc(e,t){return e(t)}function uc(){}var Ka=!1;function pc(e,t,r){if(Ka)return e(t,r);Ka=!0;try{return dc(e,t,r)}finally{Ka=!1,(cr!==null||dr!==null)&&(uc(),cc())}}function Yr(e,t){var r=e.stateNode;if(r===null)return null;var a=_a(r);if(a===null)return null;r=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(T(231,t,typeof r));return r}var Ii=!1;if(nt)try{var jr={};Object.defineProperty(jr,"passive",{get:function(){Ii=!0}}),window.addEventListener("test",jr,jr),window.removeEventListener("test",jr,jr)}catch{Ii=!1}function Xu(e,t,r,a,i,s,l,o,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(h){this.onError(h)}}var Mr=!1,ta=null,ra=!1,Di=null,Zu={onError:function(e){Mr=!0,ta=e}};function ep(e,t,r,a,i,s,l,o,c){Mr=!1,ta=null,Xu.apply(Zu,arguments)}function tp(e,t,r,a,i,s,l,o,c){if(ep.apply(this,arguments),Mr){if(Mr){var d=ta;Mr=!1,ta=null}else throw Error(T(198));ra||(ra=!0,Di=d)}}function Wt(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function mc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Cl(e){if(Wt(e)!==e)throw Error(T(188))}function rp(e){var t=e.alternate;if(!t){if(t=Wt(e),t===null)throw Error(T(188));return t!==e?null:e}for(var r=e,a=t;;){var i=r.return;if(i===null)break;var s=i.alternate;if(s===null){if(a=i.return,a!==null){r=a;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===r)return Cl(i),e;if(s===a)return Cl(i),t;s=s.sibling}throw Error(T(188))}if(r.return!==a.return)r=i,a=s;else{for(var l=!1,o=i.child;o;){if(o===r){l=!0,r=i,a=s;break}if(o===a){l=!0,a=i,r=s;break}o=o.sibling}if(!l){for(o=s.child;o;){if(o===r){l=!0,r=s,a=i;break}if(o===a){l=!0,a=s,r=i;break}o=o.sibling}if(!l)throw Error(T(189))}}if(r.alternate!==a)throw Error(T(190))}if(r.tag!==3)throw Error(T(188));return r.stateNode.current===r?e:t}function hc(e){return e=rp(e),e!==null?yc(e):null}function yc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=yc(e);if(t!==null)return t;e=e.sibling}return null}var gc=Ee.unstable_scheduleCallback,Rl=Ee.unstable_cancelCallback,np=Ee.unstable_shouldYield,ap=Ee.unstable_requestPaint,Y=Ee.unstable_now,ip=Ee.unstable_getCurrentPriorityLevel,Ts=Ee.unstable_ImmediatePriority,fc=Ee.unstable_UserBlockingPriority,na=Ee.unstable_NormalPriority,sp=Ee.unstable_LowPriority,xc=Ee.unstable_IdlePriority,ja=null,Ve=null;function lp(e){if(Ve&&typeof Ve.onCommitFiberRoot=="function")try{Ve.onCommitFiberRoot(ja,e,void 0,(e.current.flags&128)===128)}catch{}}var Be=Math.clz32?Math.clz32:dp,op=Math.log,cp=Math.LN2;function dp(e){return e>>>=0,e===0?32:31-(op(e)/cp|0)|0}var Nn=64,jn=4194304;function zr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function aa(e,t){var r=e.pendingLanes;if(r===0)return 0;var a=0,i=e.suspendedLanes,s=e.pingedLanes,l=r&268435455;if(l!==0){var o=l&~i;o!==0?a=zr(o):(s&=l,s!==0&&(a=zr(s)))}else l=r&~i,l!==0?a=zr(l):s!==0&&(a=zr(s));if(a===0)return 0;if(t!==0&&t!==a&&!(t&i)&&(i=a&-a,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(a&4&&(a|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)r=31-Be(t),i=1<<r,a|=e[r],t&=~i;return a}function up(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pp(e,t){for(var r=e.suspendedLanes,a=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var l=31-Be(s),o=1<<l,c=i[l];c===-1?(!(o&r)||o&a)&&(i[l]=up(o,t)):c<=t&&(e.expiredLanes|=o),s&=~o}}function Oi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function vc(){var e=Nn;return Nn<<=1,!(Nn&4194240)&&(Nn=64),e}function Ya(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function hn(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Be(t),e[t]=r}function mp(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<r;){var i=31-Be(r),s=1<<i;t[i]=0,a[i]=-1,e[i]=-1,r&=~s}}function Ns(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var a=31-Be(r),i=1<<a;i&t|e[a]&t&&(e[a]|=t),r&=~i}}var z=0;function bc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var kc,js,wc,Sc,Ec,zi=!1,Pn=[],xt=null,vt=null,bt=null,Qr=new Map,Xr=new Map,ht=[],hp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _l(e,t){switch(e){case"focusin":case"focusout":xt=null;break;case"dragenter":case"dragleave":vt=null;break;case"mouseover":case"mouseout":bt=null;break;case"pointerover":case"pointerout":Qr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xr.delete(t.pointerId)}}function Pr(e,t,r,a,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:r,eventSystemFlags:a,nativeEvent:s,targetContainers:[i]},t!==null&&(t=gn(t),t!==null&&js(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function yp(e,t,r,a,i){switch(t){case"focusin":return xt=Pr(xt,e,t,r,a,i),!0;case"dragenter":return vt=Pr(vt,e,t,r,a,i),!0;case"mouseover":return bt=Pr(bt,e,t,r,a,i),!0;case"pointerover":var s=i.pointerId;return Qr.set(s,Pr(Qr.get(s)||null,e,t,r,a,i)),!0;case"gotpointercapture":return s=i.pointerId,Xr.set(s,Pr(Xr.get(s)||null,e,t,r,a,i)),!0}return!1}function Tc(e){var t=It(e.target);if(t!==null){var r=Wt(t);if(r!==null){if(t=r.tag,t===13){if(t=mc(r),t!==null){e.blockedOn=t,Ec(e.priority,function(){wc(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Hn(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Ui(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var a=new r.constructor(r.type,r);Ai=a,r.target.dispatchEvent(a),Ai=null}else return t=gn(r),t!==null&&js(t),e.blockedOn=r,!1;t.shift()}return!0}function Al(e,t,r){Hn(e)&&r.delete(t)}function gp(){zi=!1,xt!==null&&Hn(xt)&&(xt=null),vt!==null&&Hn(vt)&&(vt=null),bt!==null&&Hn(bt)&&(bt=null),Qr.forEach(Al),Xr.forEach(Al)}function Cr(e,t){e.blockedOn===t&&(e.blockedOn=null,zi||(zi=!0,Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority,gp)))}function Zr(e){function t(i){return Cr(i,e)}if(0<Pn.length){Cr(Pn[0],e);for(var r=1;r<Pn.length;r++){var a=Pn[r];a.blockedOn===e&&(a.blockedOn=null)}}for(xt!==null&&Cr(xt,e),vt!==null&&Cr(vt,e),bt!==null&&Cr(bt,e),Qr.forEach(t),Xr.forEach(t),r=0;r<ht.length;r++)a=ht[r],a.blockedOn===e&&(a.blockedOn=null);for(;0<ht.length&&(r=ht[0],r.blockedOn===null);)Tc(r),r.blockedOn===null&&ht.shift()}var ur=ot.ReactCurrentBatchConfig,ia=!0;function fp(e,t,r,a){var i=z,s=ur.transition;ur.transition=null;try{z=1,Ps(e,t,r,a)}finally{z=i,ur.transition=s}}function xp(e,t,r,a){var i=z,s=ur.transition;ur.transition=null;try{z=4,Ps(e,t,r,a)}finally{z=i,ur.transition=s}}function Ps(e,t,r,a){if(ia){var i=Ui(e,t,r,a);if(i===null)si(e,t,a,sa,r),_l(e,a);else if(yp(i,e,t,r,a))a.stopPropagation();else if(_l(e,a),t&4&&-1<hp.indexOf(e)){for(;i!==null;){var s=gn(i);if(s!==null&&kc(s),s=Ui(e,t,r,a),s===null&&si(e,t,a,sa,r),s===i)break;i=s}i!==null&&a.stopPropagation()}else si(e,t,a,null,r)}}var sa=null;function Ui(e,t,r,a){if(sa=null,e=Es(a),e=It(e),e!==null)if(t=Wt(e),t===null)e=null;else if(r=t.tag,r===13){if(e=mc(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return sa=e,null}function Nc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ip()){case Ts:return 1;case fc:return 4;case na:case sp:return 16;case xc:return 536870912;default:return 16}default:return 16}}var gt=null,Cs=null,qn=null;function jc(){if(qn)return qn;var e,t=Cs,r=t.length,a,i="value"in gt?gt.value:gt.textContent,s=i.length;for(e=0;e<r&&t[e]===i[e];e++);var l=r-e;for(a=1;a<=l&&t[r-a]===i[s-a];a++);return qn=i.slice(e,1<a?1-a:void 0)}function $n(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Cn(){return!0}function Ll(){return!1}function Ne(e){function t(r,a,i,s,l){this._reactName=r,this._targetInst=i,this.type=a,this.nativeEvent=s,this.target=l,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(r=e[o],this[o]=r?r(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Cn:Ll,this.isPropagationStopped=Ll,this}return V(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Cn)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Cn)},persist:function(){},isPersistent:Cn}),t}var wr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Rs=Ne(wr),yn=V({},wr,{view:0,detail:0}),vp=Ne(yn),Qa,Xa,Rr,Pa=V({},yn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_s,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Rr&&(Rr&&e.type==="mousemove"?(Qa=e.screenX-Rr.screenX,Xa=e.screenY-Rr.screenY):Xa=Qa=0,Rr=e),Qa)},movementY:function(e){return"movementY"in e?e.movementY:Xa}}),Il=Ne(Pa),bp=V({},Pa,{dataTransfer:0}),kp=Ne(bp),wp=V({},yn,{relatedTarget:0}),Za=Ne(wp),Sp=V({},wr,{animationName:0,elapsedTime:0,pseudoElement:0}),Ep=Ne(Sp),Tp=V({},wr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Np=Ne(Tp),jp=V({},wr,{data:0}),Dl=Ne(jp),Pp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Cp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Rp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _p(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Rp[e])?!!t[e]:!1}function _s(){return _p}var Ap=V({},yn,{key:function(e){if(e.key){var t=Pp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=$n(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Cp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_s,charCode:function(e){return e.type==="keypress"?$n(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?$n(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Lp=Ne(Ap),Ip=V({},Pa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ol=Ne(Ip),Dp=V({},yn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_s}),Op=Ne(Dp),zp=V({},wr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Up=Ne(zp),Bp=V({},Pa,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Mp=Ne(Bp),Fp=[9,13,27,32],As=nt&&"CompositionEvent"in window,Fr=null;nt&&"documentMode"in document&&(Fr=document.documentMode);var Hp=nt&&"TextEvent"in window&&!Fr,Pc=nt&&(!As||Fr&&8<Fr&&11>=Fr),zl=" ",Ul=!1;function Cc(e,t){switch(e){case"keyup":return Fp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Rc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xt=!1;function qp(e,t){switch(e){case"compositionend":return Rc(t);case"keypress":return t.which!==32?null:(Ul=!0,zl);case"textInput":return e=t.data,e===zl&&Ul?null:e;default:return null}}function $p(e,t){if(Xt)return e==="compositionend"||!As&&Cc(e,t)?(e=jc(),qn=Cs=gt=null,Xt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Pc&&t.locale!=="ko"?null:t.data;default:return null}}var Wp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Wp[e.type]:t==="textarea"}function _c(e,t,r,a){oc(a),t=la(t,"onChange"),0<t.length&&(r=new Rs("onChange","change",null,r,a),e.push({event:r,listeners:t}))}var Hr=null,en=null;function Jp(e){Hc(e,0)}function Ca(e){var t=tr(e);if(tc(t))return e}function Gp(e,t){if(e==="change")return t}var Ac=!1;if(nt){var ei;if(nt){var ti="oninput"in document;if(!ti){var Ml=document.createElement("div");Ml.setAttribute("oninput","return;"),ti=typeof Ml.oninput=="function"}ei=ti}else ei=!1;Ac=ei&&(!document.documentMode||9<document.documentMode)}function Fl(){Hr&&(Hr.detachEvent("onpropertychange",Lc),en=Hr=null)}function Lc(e){if(e.propertyName==="value"&&Ca(en)){var t=[];_c(t,en,e,Es(e)),pc(Jp,t)}}function Vp(e,t,r){e==="focusin"?(Fl(),Hr=t,en=r,Hr.attachEvent("onpropertychange",Lc)):e==="focusout"&&Fl()}function Kp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ca(en)}function Yp(e,t){if(e==="click")return Ca(t)}function Qp(e,t){if(e==="input"||e==="change")return Ca(t)}function Xp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var He=typeof Object.is=="function"?Object.is:Xp;function tn(e,t){if(He(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),a=Object.keys(t);if(r.length!==a.length)return!1;for(a=0;a<r.length;a++){var i=r[a];if(!bi.call(t,i)||!He(e[i],t[i]))return!1}return!0}function Hl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ql(e,t){var r=Hl(e);e=0;for(var a;r;){if(r.nodeType===3){if(a=e+r.textContent.length,e<=t&&a>=t)return{node:r,offset:t-e};e=a}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Hl(r)}}function Ic(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ic(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Dc(){for(var e=window,t=ea();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=ea(e.document)}return t}function Ls(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Zp(e){var t=Dc(),r=e.focusedElem,a=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Ic(r.ownerDocument.documentElement,r)){if(a!==null&&Ls(r)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=r.textContent.length,s=Math.min(a.start,i);a=a.end===void 0?s:Math.min(a.end,i),!e.extend&&s>a&&(i=a,a=s,s=i),i=ql(r,s);var l=ql(r,a);i&&l&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>a?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var em=nt&&"documentMode"in document&&11>=document.documentMode,Zt=null,Bi=null,qr=null,Mi=!1;function $l(e,t,r){var a=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Mi||Zt==null||Zt!==ea(a)||(a=Zt,"selectionStart"in a&&Ls(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),qr&&tn(qr,a)||(qr=a,a=la(Bi,"onSelect"),0<a.length&&(t=new Rs("onSelect","select",null,t,r),e.push({event:t,listeners:a}),t.target=Zt)))}function Rn(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var er={animationend:Rn("Animation","AnimationEnd"),animationiteration:Rn("Animation","AnimationIteration"),animationstart:Rn("Animation","AnimationStart"),transitionend:Rn("Transition","TransitionEnd")},ri={},Oc={};nt&&(Oc=document.createElement("div").style,"AnimationEvent"in window||(delete er.animationend.animation,delete er.animationiteration.animation,delete er.animationstart.animation),"TransitionEvent"in window||delete er.transitionend.transition);function Ra(e){if(ri[e])return ri[e];if(!er[e])return e;var t=er[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Oc)return ri[e]=t[r];return e}var zc=Ra("animationend"),Uc=Ra("animationiteration"),Bc=Ra("animationstart"),Mc=Ra("transitionend"),Fc=new Map,Wl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Pt(e,t){Fc.set(e,t),$t(t,[e])}for(var ni=0;ni<Wl.length;ni++){var ai=Wl[ni],tm=ai.toLowerCase(),rm=ai[0].toUpperCase()+ai.slice(1);Pt(tm,"on"+rm)}Pt(zc,"onAnimationEnd");Pt(Uc,"onAnimationIteration");Pt(Bc,"onAnimationStart");Pt("dblclick","onDoubleClick");Pt("focusin","onFocus");Pt("focusout","onBlur");Pt(Mc,"onTransitionEnd");hr("onMouseEnter",["mouseout","mouseover"]);hr("onMouseLeave",["mouseout","mouseover"]);hr("onPointerEnter",["pointerout","pointerover"]);hr("onPointerLeave",["pointerout","pointerover"]);$t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));$t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));$t("onBeforeInput",["compositionend","keypress","textInput","paste"]);$t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));$t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));$t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ur="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),nm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ur));function Jl(e,t,r){var a=e.type||"unknown-event";e.currentTarget=r,tp(a,t,void 0,e),e.currentTarget=null}function Hc(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var a=e[r],i=a.event;a=a.listeners;e:{var s=void 0;if(t)for(var l=a.length-1;0<=l;l--){var o=a[l],c=o.instance,d=o.currentTarget;if(o=o.listener,c!==s&&i.isPropagationStopped())break e;Jl(i,o,d),s=c}else for(l=0;l<a.length;l++){if(o=a[l],c=o.instance,d=o.currentTarget,o=o.listener,c!==s&&i.isPropagationStopped())break e;Jl(i,o,d),s=c}}}if(ra)throw e=Di,ra=!1,Di=null,e}function F(e,t){var r=t[Wi];r===void 0&&(r=t[Wi]=new Set);var a=e+"__bubble";r.has(a)||(qc(t,e,2,!1),r.add(a))}function ii(e,t,r){var a=0;t&&(a|=4),qc(r,e,a,t)}var _n="_reactListening"+Math.random().toString(36).slice(2);function rn(e){if(!e[_n]){e[_n]=!0,Yo.forEach(function(r){r!=="selectionchange"&&(nm.has(r)||ii(r,!1,e),ii(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[_n]||(t[_n]=!0,ii("selectionchange",!1,t))}}function qc(e,t,r,a){switch(Nc(t)){case 1:var i=fp;break;case 4:i=xp;break;default:i=Ps}r=i.bind(null,t,r,e),i=void 0,!Ii||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),a?i!==void 0?e.addEventListener(t,r,{capture:!0,passive:i}):e.addEventListener(t,r,!0):i!==void 0?e.addEventListener(t,r,{passive:i}):e.addEventListener(t,r,!1)}function si(e,t,r,a,i){var s=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var l=a.tag;if(l===3||l===4){var o=a.stateNode.containerInfo;if(o===i||o.nodeType===8&&o.parentNode===i)break;if(l===4)for(l=a.return;l!==null;){var c=l.tag;if((c===3||c===4)&&(c=l.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;l=l.return}for(;o!==null;){if(l=It(o),l===null)return;if(c=l.tag,c===5||c===6){a=s=l;continue e}o=o.parentNode}}a=a.return}pc(function(){var d=s,h=Es(r),m=[];e:{var f=Fc.get(e);if(f!==void 0){var y=Rs,k=e;switch(e){case"keypress":if($n(r)===0)break e;case"keydown":case"keyup":y=Lp;break;case"focusin":k="focus",y=Za;break;case"focusout":k="blur",y=Za;break;case"beforeblur":case"afterblur":y=Za;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Il;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=kp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Op;break;case zc:case Uc:case Bc:y=Ep;break;case Mc:y=Up;break;case"scroll":y=vp;break;case"wheel":y=Mp;break;case"copy":case"cut":case"paste":y=Np;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Ol}var x=(t&4)!==0,b=!x&&e==="scroll",p=x?f!==null?f+"Capture":null:f;x=[];for(var u=d,g;u!==null;){g=u;var w=g.stateNode;if(g.tag===5&&w!==null&&(g=w,p!==null&&(w=Yr(u,p),w!=null&&x.push(nn(u,w,g)))),b)break;u=u.return}0<x.length&&(f=new y(f,k,null,r,h),m.push({event:f,listeners:x}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",f&&r!==Ai&&(k=r.relatedTarget||r.fromElement)&&(It(k)||k[at]))break e;if((y||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,y?(k=r.relatedTarget||r.toElement,y=d,k=k?It(k):null,k!==null&&(b=Wt(k),k!==b||k.tag!==5&&k.tag!==6)&&(k=null)):(y=null,k=d),y!==k)){if(x=Il,w="onMouseLeave",p="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(x=Ol,w="onPointerLeave",p="onPointerEnter",u="pointer"),b=y==null?f:tr(y),g=k==null?f:tr(k),f=new x(w,u+"leave",y,r,h),f.target=b,f.relatedTarget=g,w=null,It(h)===d&&(x=new x(p,u+"enter",k,r,h),x.target=g,x.relatedTarget=b,w=x),b=w,y&&k)t:{for(x=y,p=k,u=0,g=x;g;g=Vt(g))u++;for(g=0,w=p;w;w=Vt(w))g++;for(;0<u-g;)x=Vt(x),u--;for(;0<g-u;)p=Vt(p),g--;for(;u--;){if(x===p||p!==null&&x===p.alternate)break t;x=Vt(x),p=Vt(p)}x=null}else x=null;y!==null&&Gl(m,f,y,x,!1),k!==null&&b!==null&&Gl(m,b,k,x,!0)}}e:{if(f=d?tr(d):window,y=f.nodeName&&f.nodeName.toLowerCase(),y==="select"||y==="input"&&f.type==="file")var S=Gp;else if(Bl(f))if(Ac)S=Qp;else{S=Kp;var N=Vp}else(y=f.nodeName)&&y.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(S=Yp);if(S&&(S=S(e,d))){_c(m,S,r,h);break e}N&&N(e,f,d),e==="focusout"&&(N=f._wrapperState)&&N.controlled&&f.type==="number"&&ji(f,"number",f.value)}switch(N=d?tr(d):window,e){case"focusin":(Bl(N)||N.contentEditable==="true")&&(Zt=N,Bi=d,qr=null);break;case"focusout":qr=Bi=Zt=null;break;case"mousedown":Mi=!0;break;case"contextmenu":case"mouseup":case"dragend":Mi=!1,$l(m,r,h);break;case"selectionchange":if(em)break;case"keydown":case"keyup":$l(m,r,h)}var j;if(As)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Xt?Cc(e,r)&&(P="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(P="onCompositionStart");P&&(Pc&&r.locale!=="ko"&&(Xt||P!=="onCompositionStart"?P==="onCompositionEnd"&&Xt&&(j=jc()):(gt=h,Cs="value"in gt?gt.value:gt.textContent,Xt=!0)),N=la(d,P),0<N.length&&(P=new Dl(P,e,null,r,h),m.push({event:P,listeners:N}),j?P.data=j:(j=Rc(r),j!==null&&(P.data=j)))),(j=Hp?qp(e,r):$p(e,r))&&(d=la(d,"onBeforeInput"),0<d.length&&(h=new Dl("onBeforeInput","beforeinput",null,r,h),m.push({event:h,listeners:d}),h.data=j))}Hc(m,t)})}function nn(e,t,r){return{instance:e,listener:t,currentTarget:r}}function la(e,t){for(var r=t+"Capture",a=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Yr(e,r),s!=null&&a.unshift(nn(e,s,i)),s=Yr(e,t),s!=null&&a.push(nn(e,s,i))),e=e.return}return a}function Vt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Gl(e,t,r,a,i){for(var s=t._reactName,l=[];r!==null&&r!==a;){var o=r,c=o.alternate,d=o.stateNode;if(c!==null&&c===a)break;o.tag===5&&d!==null&&(o=d,i?(c=Yr(r,s),c!=null&&l.unshift(nn(r,c,o))):i||(c=Yr(r,s),c!=null&&l.push(nn(r,c,o)))),r=r.return}l.length!==0&&e.push({event:t,listeners:l})}var am=/\r\n?/g,im=/\u0000|\uFFFD/g;function Vl(e){return(typeof e=="string"?e:""+e).replace(am,`
`).replace(im,"")}function An(e,t,r){if(t=Vl(t),Vl(e)!==t&&r)throw Error(T(425))}function oa(){}var Fi=null,Hi=null;function qi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var $i=typeof setTimeout=="function"?setTimeout:void 0,sm=typeof clearTimeout=="function"?clearTimeout:void 0,Kl=typeof Promise=="function"?Promise:void 0,lm=typeof queueMicrotask=="function"?queueMicrotask:typeof Kl<"u"?function(e){return Kl.resolve(null).then(e).catch(om)}:$i;function om(e){setTimeout(function(){throw e})}function li(e,t){var r=t,a=0;do{var i=r.nextSibling;if(e.removeChild(r),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(a===0){e.removeChild(i),Zr(t);return}a--}else r!=="$"&&r!=="$?"&&r!=="$!"||a++;r=i}while(r);Zr(t)}function kt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Yl(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Sr=Math.random().toString(36).slice(2),Ge="__reactFiber$"+Sr,an="__reactProps$"+Sr,at="__reactContainer$"+Sr,Wi="__reactEvents$"+Sr,cm="__reactListeners$"+Sr,dm="__reactHandles$"+Sr;function It(e){var t=e[Ge];if(t)return t;for(var r=e.parentNode;r;){if(t=r[at]||r[Ge]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Yl(e);e!==null;){if(r=e[Ge])return r;e=Yl(e)}return t}e=r,r=e.parentNode}return null}function gn(e){return e=e[Ge]||e[at],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function tr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(T(33))}function _a(e){return e[an]||null}var Ji=[],rr=-1;function Ct(e){return{current:e}}function H(e){0>rr||(e.current=Ji[rr],Ji[rr]=null,rr--)}function M(e,t){rr++,Ji[rr]=e.current,e.current=t}var jt={},ce=Ct(jt),xe=Ct(!1),Bt=jt;function yr(e,t){var r=e.type.contextTypes;if(!r)return jt;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in r)i[s]=t[s];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function ve(e){return e=e.childContextTypes,e!=null}function ca(){H(xe),H(ce)}function Ql(e,t,r){if(ce.current!==jt)throw Error(T(168));M(ce,t),M(xe,r)}function $c(e,t,r){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return r;a=a.getChildContext();for(var i in a)if(!(i in t))throw Error(T(108,Vu(e)||"Unknown",i));return V({},r,a)}function da(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||jt,Bt=ce.current,M(ce,e),M(xe,xe.current),!0}function Xl(e,t,r){var a=e.stateNode;if(!a)throw Error(T(169));r?(e=$c(e,t,Bt),a.__reactInternalMemoizedMergedChildContext=e,H(xe),H(ce),M(ce,e)):H(xe),M(xe,r)}var Ze=null,Aa=!1,oi=!1;function Wc(e){Ze===null?Ze=[e]:Ze.push(e)}function um(e){Aa=!0,Wc(e)}function Rt(){if(!oi&&Ze!==null){oi=!0;var e=0,t=z;try{var r=Ze;for(z=1;e<r.length;e++){var a=r[e];do a=a(!0);while(a!==null)}Ze=null,Aa=!1}catch(i){throw Ze!==null&&(Ze=Ze.slice(e+1)),gc(Ts,Rt),i}finally{z=t,oi=!1}}return null}var nr=[],ar=0,ua=null,pa=0,je=[],Pe=0,Mt=null,et=1,tt="";function At(e,t){nr[ar++]=pa,nr[ar++]=ua,ua=e,pa=t}function Jc(e,t,r){je[Pe++]=et,je[Pe++]=tt,je[Pe++]=Mt,Mt=e;var a=et;e=tt;var i=32-Be(a)-1;a&=~(1<<i),r+=1;var s=32-Be(t)+i;if(30<s){var l=i-i%5;s=(a&(1<<l)-1).toString(32),a>>=l,i-=l,et=1<<32-Be(t)+i|r<<i|a,tt=s+e}else et=1<<s|r<<i|a,tt=e}function Is(e){e.return!==null&&(At(e,1),Jc(e,1,0))}function Ds(e){for(;e===ua;)ua=nr[--ar],nr[ar]=null,pa=nr[--ar],nr[ar]=null;for(;e===Mt;)Mt=je[--Pe],je[Pe]=null,tt=je[--Pe],je[Pe]=null,et=je[--Pe],je[Pe]=null}var Se=null,we=null,q=!1,Ue=null;function Gc(e,t){var r=Ce(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Zl(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Se=e,we=kt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Se=e,we=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Mt!==null?{id:et,overflow:tt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Ce(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Se=e,we=null,!0):!1;default:return!1}}function Gi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Vi(e){if(q){var t=we;if(t){var r=t;if(!Zl(e,t)){if(Gi(e))throw Error(T(418));t=kt(r.nextSibling);var a=Se;t&&Zl(e,t)?Gc(a,r):(e.flags=e.flags&-4097|2,q=!1,Se=e)}}else{if(Gi(e))throw Error(T(418));e.flags=e.flags&-4097|2,q=!1,Se=e}}}function eo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Se=e}function Ln(e){if(e!==Se)return!1;if(!q)return eo(e),q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!qi(e.type,e.memoizedProps)),t&&(t=we)){if(Gi(e))throw Vc(),Error(T(418));for(;t;)Gc(e,t),t=kt(t.nextSibling)}if(eo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(T(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){we=kt(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}we=null}}else we=Se?kt(e.stateNode.nextSibling):null;return!0}function Vc(){for(var e=we;e;)e=kt(e.nextSibling)}function gr(){we=Se=null,q=!1}function Os(e){Ue===null?Ue=[e]:Ue.push(e)}var pm=ot.ReactCurrentBatchConfig;function _r(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(T(309));var a=r.stateNode}if(!a)throw Error(T(147,e));var i=a,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(l){var o=i.refs;l===null?delete o[s]:o[s]=l},t._stringRef=s,t)}if(typeof e!="string")throw Error(T(284));if(!r._owner)throw Error(T(290,e))}return e}function In(e,t){throw e=Object.prototype.toString.call(t),Error(T(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function to(e){var t=e._init;return t(e._payload)}function Kc(e){function t(p,u){if(e){var g=p.deletions;g===null?(p.deletions=[u],p.flags|=16):g.push(u)}}function r(p,u){if(!e)return null;for(;u!==null;)t(p,u),u=u.sibling;return null}function a(p,u){for(p=new Map;u!==null;)u.key!==null?p.set(u.key,u):p.set(u.index,u),u=u.sibling;return p}function i(p,u){return p=Tt(p,u),p.index=0,p.sibling=null,p}function s(p,u,g){return p.index=g,e?(g=p.alternate,g!==null?(g=g.index,g<u?(p.flags|=2,u):g):(p.flags|=2,u)):(p.flags|=1048576,u)}function l(p){return e&&p.alternate===null&&(p.flags|=2),p}function o(p,u,g,w){return u===null||u.tag!==6?(u=yi(g,p.mode,w),u.return=p,u):(u=i(u,g),u.return=p,u)}function c(p,u,g,w){var S=g.type;return S===Qt?h(p,u,g.props.children,w,g.key):u!==null&&(u.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===pt&&to(S)===u.type)?(w=i(u,g.props),w.ref=_r(p,u,g),w.return=p,w):(w=Qn(g.type,g.key,g.props,null,p.mode,w),w.ref=_r(p,u,g),w.return=p,w)}function d(p,u,g,w){return u===null||u.tag!==4||u.stateNode.containerInfo!==g.containerInfo||u.stateNode.implementation!==g.implementation?(u=gi(g,p.mode,w),u.return=p,u):(u=i(u,g.children||[]),u.return=p,u)}function h(p,u,g,w,S){return u===null||u.tag!==7?(u=Ut(g,p.mode,w,S),u.return=p,u):(u=i(u,g),u.return=p,u)}function m(p,u,g){if(typeof u=="string"&&u!==""||typeof u=="number")return u=yi(""+u,p.mode,g),u.return=p,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Sn:return g=Qn(u.type,u.key,u.props,null,p.mode,g),g.ref=_r(p,null,u),g.return=p,g;case Yt:return u=gi(u,p.mode,g),u.return=p,u;case pt:var w=u._init;return m(p,w(u._payload),g)}if(Or(u)||Nr(u))return u=Ut(u,p.mode,g,null),u.return=p,u;In(p,u)}return null}function f(p,u,g,w){var S=u!==null?u.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return S!==null?null:o(p,u,""+g,w);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Sn:return g.key===S?c(p,u,g,w):null;case Yt:return g.key===S?d(p,u,g,w):null;case pt:return S=g._init,f(p,u,S(g._payload),w)}if(Or(g)||Nr(g))return S!==null?null:h(p,u,g,w,null);In(p,g)}return null}function y(p,u,g,w,S){if(typeof w=="string"&&w!==""||typeof w=="number")return p=p.get(g)||null,o(u,p,""+w,S);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Sn:return p=p.get(w.key===null?g:w.key)||null,c(u,p,w,S);case Yt:return p=p.get(w.key===null?g:w.key)||null,d(u,p,w,S);case pt:var N=w._init;return y(p,u,g,N(w._payload),S)}if(Or(w)||Nr(w))return p=p.get(g)||null,h(u,p,w,S,null);In(u,w)}return null}function k(p,u,g,w){for(var S=null,N=null,j=u,P=u=0,L=null;j!==null&&P<g.length;P++){j.index>P?(L=j,j=null):L=j.sibling;var _=f(p,j,g[P],w);if(_===null){j===null&&(j=L);break}e&&j&&_.alternate===null&&t(p,j),u=s(_,u,P),N===null?S=_:N.sibling=_,N=_,j=L}if(P===g.length)return r(p,j),q&&At(p,P),S;if(j===null){for(;P<g.length;P++)j=m(p,g[P],w),j!==null&&(u=s(j,u,P),N===null?S=j:N.sibling=j,N=j);return q&&At(p,P),S}for(j=a(p,j);P<g.length;P++)L=y(j,p,P,g[P],w),L!==null&&(e&&L.alternate!==null&&j.delete(L.key===null?P:L.key),u=s(L,u,P),N===null?S=L:N.sibling=L,N=L);return e&&j.forEach(function(X){return t(p,X)}),q&&At(p,P),S}function x(p,u,g,w){var S=Nr(g);if(typeof S!="function")throw Error(T(150));if(g=S.call(g),g==null)throw Error(T(151));for(var N=S=null,j=u,P=u=0,L=null,_=g.next();j!==null&&!_.done;P++,_=g.next()){j.index>P?(L=j,j=null):L=j.sibling;var X=f(p,j,_.value,w);if(X===null){j===null&&(j=L);break}e&&j&&X.alternate===null&&t(p,j),u=s(X,u,P),N===null?S=X:N.sibling=X,N=X,j=L}if(_.done)return r(p,j),q&&At(p,P),S;if(j===null){for(;!_.done;P++,_=g.next())_=m(p,_.value,w),_!==null&&(u=s(_,u,P),N===null?S=_:N.sibling=_,N=_);return q&&At(p,P),S}for(j=a(p,j);!_.done;P++,_=g.next())_=y(j,p,P,_.value,w),_!==null&&(e&&_.alternate!==null&&j.delete(_.key===null?P:_.key),u=s(_,u,P),N===null?S=_:N.sibling=_,N=_);return e&&j.forEach(function(Ye){return t(p,Ye)}),q&&At(p,P),S}function b(p,u,g,w){if(typeof g=="object"&&g!==null&&g.type===Qt&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Sn:e:{for(var S=g.key,N=u;N!==null;){if(N.key===S){if(S=g.type,S===Qt){if(N.tag===7){r(p,N.sibling),u=i(N,g.props.children),u.return=p,p=u;break e}}else if(N.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===pt&&to(S)===N.type){r(p,N.sibling),u=i(N,g.props),u.ref=_r(p,N,g),u.return=p,p=u;break e}r(p,N);break}else t(p,N);N=N.sibling}g.type===Qt?(u=Ut(g.props.children,p.mode,w,g.key),u.return=p,p=u):(w=Qn(g.type,g.key,g.props,null,p.mode,w),w.ref=_r(p,u,g),w.return=p,p=w)}return l(p);case Yt:e:{for(N=g.key;u!==null;){if(u.key===N)if(u.tag===4&&u.stateNode.containerInfo===g.containerInfo&&u.stateNode.implementation===g.implementation){r(p,u.sibling),u=i(u,g.children||[]),u.return=p,p=u;break e}else{r(p,u);break}else t(p,u);u=u.sibling}u=gi(g,p.mode,w),u.return=p,p=u}return l(p);case pt:return N=g._init,b(p,u,N(g._payload),w)}if(Or(g))return k(p,u,g,w);if(Nr(g))return x(p,u,g,w);In(p,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,u!==null&&u.tag===6?(r(p,u.sibling),u=i(u,g),u.return=p,p=u):(r(p,u),u=yi(g,p.mode,w),u.return=p,p=u),l(p)):r(p,u)}return b}var fr=Kc(!0),Yc=Kc(!1),ma=Ct(null),ha=null,ir=null,zs=null;function Us(){zs=ir=ha=null}function Bs(e){var t=ma.current;H(ma),e._currentValue=t}function Ki(e,t,r){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===r)break;e=e.return}}function pr(e,t){ha=e,zs=ir=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(fe=!0),e.firstContext=null)}function _e(e){var t=e._currentValue;if(zs!==e)if(e={context:e,memoizedValue:t,next:null},ir===null){if(ha===null)throw Error(T(308));ir=e,ha.dependencies={lanes:0,firstContext:e}}else ir=ir.next=e;return t}var Dt=null;function Ms(e){Dt===null?Dt=[e]:Dt.push(e)}function Qc(e,t,r,a){var i=t.interleaved;return i===null?(r.next=r,Ms(t)):(r.next=i.next,i.next=r),t.interleaved=r,it(e,a)}function it(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var mt=!1;function Fs(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Xc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function rt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function wt(e,t,r){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,O&2){var i=a.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),a.pending=t,it(e,r)}return i=a.interleaved,i===null?(t.next=t,Ms(a)):(t.next=i.next,i.next=t),a.interleaved=t,it(e,r)}function Wn(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,r|=a,t.lanes=r,Ns(e,r)}}function ro(e,t){var r=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,r===a)){var i=null,s=null;if(r=r.firstBaseUpdate,r!==null){do{var l={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};s===null?i=s=l:s=s.next=l,r=r.next}while(r!==null);s===null?i=s=t:s=s.next=t}else i=s=t;r={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:a.shared,effects:a.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function ya(e,t,r,a){var i=e.updateQueue;mt=!1;var s=i.firstBaseUpdate,l=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var c=o,d=c.next;c.next=null,l===null?s=d:l.next=d,l=c;var h=e.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==l&&(o===null?h.firstBaseUpdate=d:o.next=d,h.lastBaseUpdate=c))}if(s!==null){var m=i.baseState;l=0,h=d=c=null,o=s;do{var f=o.lane,y=o.eventTime;if((a&f)===f){h!==null&&(h=h.next={eventTime:y,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var k=e,x=o;switch(f=t,y=r,x.tag){case 1:if(k=x.payload,typeof k=="function"){m=k.call(y,m,f);break e}m=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=x.payload,f=typeof k=="function"?k.call(y,m,f):k,f==null)break e;m=V({},m,f);break e;case 2:mt=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[o]:f.push(o))}else y={eventTime:y,lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(d=h=y,c=m):h=h.next=y,l|=f;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;f=o,o=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(h===null&&(c=m),i.baseState=c,i.firstBaseUpdate=d,i.lastBaseUpdate=h,t=i.shared.interleaved,t!==null){i=t;do l|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);Ht|=l,e.lanes=l,e.memoizedState=m}}function no(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],i=a.callback;if(i!==null){if(a.callback=null,a=r,typeof i!="function")throw Error(T(191,i));i.call(a)}}}var fn={},Ke=Ct(fn),sn=Ct(fn),ln=Ct(fn);function Ot(e){if(e===fn)throw Error(T(174));return e}function Hs(e,t){switch(M(ln,t),M(sn,e),M(Ke,fn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ci(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ci(t,e)}H(Ke),M(Ke,t)}function xr(){H(Ke),H(sn),H(ln)}function Zc(e){Ot(ln.current);var t=Ot(Ke.current),r=Ci(t,e.type);t!==r&&(M(sn,e),M(Ke,r))}function qs(e){sn.current===e&&(H(Ke),H(sn))}var W=Ct(0);function ga(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ci=[];function $s(){for(var e=0;e<ci.length;e++)ci[e]._workInProgressVersionPrimary=null;ci.length=0}var Jn=ot.ReactCurrentDispatcher,di=ot.ReactCurrentBatchConfig,Ft=0,J=null,Z=null,te=null,fa=!1,$r=!1,on=0,mm=0;function se(){throw Error(T(321))}function Ws(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!He(e[r],t[r]))return!1;return!0}function Js(e,t,r,a,i,s){if(Ft=s,J=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Jn.current=e===null||e.memoizedState===null?fm:xm,e=r(a,i),$r){s=0;do{if($r=!1,on=0,25<=s)throw Error(T(301));s+=1,te=Z=null,t.updateQueue=null,Jn.current=vm,e=r(a,i)}while($r)}if(Jn.current=xa,t=Z!==null&&Z.next!==null,Ft=0,te=Z=J=null,fa=!1,t)throw Error(T(300));return e}function Gs(){var e=on!==0;return on=0,e}function Je(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return te===null?J.memoizedState=te=e:te=te.next=e,te}function Ae(){if(Z===null){var e=J.alternate;e=e!==null?e.memoizedState:null}else e=Z.next;var t=te===null?J.memoizedState:te.next;if(t!==null)te=t,Z=e;else{if(e===null)throw Error(T(310));Z=e,e={memoizedState:Z.memoizedState,baseState:Z.baseState,baseQueue:Z.baseQueue,queue:Z.queue,next:null},te===null?J.memoizedState=te=e:te=te.next=e}return te}function cn(e,t){return typeof t=="function"?t(e):t}function ui(e){var t=Ae(),r=t.queue;if(r===null)throw Error(T(311));r.lastRenderedReducer=e;var a=Z,i=a.baseQueue,s=r.pending;if(s!==null){if(i!==null){var l=i.next;i.next=s.next,s.next=l}a.baseQueue=i=s,r.pending=null}if(i!==null){s=i.next,a=a.baseState;var o=l=null,c=null,d=s;do{var h=d.lane;if((Ft&h)===h)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),a=d.hasEagerState?d.eagerState:e(a,d.action);else{var m={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(o=c=m,l=a):c=c.next=m,J.lanes|=h,Ht|=h}d=d.next}while(d!==null&&d!==s);c===null?l=a:c.next=o,He(a,t.memoizedState)||(fe=!0),t.memoizedState=a,t.baseState=l,t.baseQueue=c,r.lastRenderedState=a}if(e=r.interleaved,e!==null){i=e;do s=i.lane,J.lanes|=s,Ht|=s,i=i.next;while(i!==e)}else i===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function pi(e){var t=Ae(),r=t.queue;if(r===null)throw Error(T(311));r.lastRenderedReducer=e;var a=r.dispatch,i=r.pending,s=t.memoizedState;if(i!==null){r.pending=null;var l=i=i.next;do s=e(s,l.action),l=l.next;while(l!==i);He(s,t.memoizedState)||(fe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),r.lastRenderedState=s}return[s,a]}function ed(){}function td(e,t){var r=J,a=Ae(),i=t(),s=!He(a.memoizedState,i);if(s&&(a.memoizedState=i,fe=!0),a=a.queue,Vs(ad.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||te!==null&&te.memoizedState.tag&1){if(r.flags|=2048,dn(9,nd.bind(null,r,a,i,t),void 0,null),re===null)throw Error(T(349));Ft&30||rd(r,t,i)}return i}function rd(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function nd(e,t,r,a){t.value=r,t.getSnapshot=a,id(t)&&sd(e)}function ad(e,t,r){return r(function(){id(t)&&sd(e)})}function id(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!He(e,r)}catch{return!0}}function sd(e){var t=it(e,1);t!==null&&Me(t,e,1,-1)}function ao(e){var t=Je();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:cn,lastRenderedState:e},t.queue=e,e=e.dispatch=gm.bind(null,J,e),[t.memoizedState,e]}function dn(e,t,r,a){return e={tag:e,create:t,destroy:r,deps:a,next:null},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(a=r.next,r.next=e,e.next=a,t.lastEffect=e)),e}function ld(){return Ae().memoizedState}function Gn(e,t,r,a){var i=Je();J.flags|=e,i.memoizedState=dn(1|t,r,void 0,a===void 0?null:a)}function La(e,t,r,a){var i=Ae();a=a===void 0?null:a;var s=void 0;if(Z!==null){var l=Z.memoizedState;if(s=l.destroy,a!==null&&Ws(a,l.deps)){i.memoizedState=dn(t,r,s,a);return}}J.flags|=e,i.memoizedState=dn(1|t,r,s,a)}function io(e,t){return Gn(8390656,8,e,t)}function Vs(e,t){return La(2048,8,e,t)}function od(e,t){return La(4,2,e,t)}function cd(e,t){return La(4,4,e,t)}function dd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ud(e,t,r){return r=r!=null?r.concat([e]):null,La(4,4,dd.bind(null,t,e),r)}function Ks(){}function pd(e,t){var r=Ae();t=t===void 0?null:t;var a=r.memoizedState;return a!==null&&t!==null&&Ws(t,a[1])?a[0]:(r.memoizedState=[e,t],e)}function md(e,t){var r=Ae();t=t===void 0?null:t;var a=r.memoizedState;return a!==null&&t!==null&&Ws(t,a[1])?a[0]:(e=e(),r.memoizedState=[e,t],e)}function hd(e,t,r){return Ft&21?(He(r,t)||(r=vc(),J.lanes|=r,Ht|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,fe=!0),e.memoizedState=r)}function hm(e,t){var r=z;z=r!==0&&4>r?r:4,e(!0);var a=di.transition;di.transition={};try{e(!1),t()}finally{z=r,di.transition=a}}function yd(){return Ae().memoizedState}function ym(e,t,r){var a=Et(e);if(r={lane:a,action:r,hasEagerState:!1,eagerState:null,next:null},gd(e))fd(t,r);else if(r=Qc(e,t,r,a),r!==null){var i=pe();Me(r,e,a,i),xd(r,t,a)}}function gm(e,t,r){var a=Et(e),i={lane:a,action:r,hasEagerState:!1,eagerState:null,next:null};if(gd(e))fd(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var l=t.lastRenderedState,o=s(l,r);if(i.hasEagerState=!0,i.eagerState=o,He(o,l)){var c=t.interleaved;c===null?(i.next=i,Ms(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}r=Qc(e,t,i,a),r!==null&&(i=pe(),Me(r,e,a,i),xd(r,t,a))}}function gd(e){var t=e.alternate;return e===J||t!==null&&t===J}function fd(e,t){$r=fa=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function xd(e,t,r){if(r&4194240){var a=t.lanes;a&=e.pendingLanes,r|=a,t.lanes=r,Ns(e,r)}}var xa={readContext:_e,useCallback:se,useContext:se,useEffect:se,useImperativeHandle:se,useInsertionEffect:se,useLayoutEffect:se,useMemo:se,useReducer:se,useRef:se,useState:se,useDebugValue:se,useDeferredValue:se,useTransition:se,useMutableSource:se,useSyncExternalStore:se,useId:se,unstable_isNewReconciler:!1},fm={readContext:_e,useCallback:function(e,t){return Je().memoizedState=[e,t===void 0?null:t],e},useContext:_e,useEffect:io,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Gn(4194308,4,dd.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Gn(4194308,4,e,t)},useInsertionEffect:function(e,t){return Gn(4,2,e,t)},useMemo:function(e,t){var r=Je();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var a=Je();return t=r!==void 0?r(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=ym.bind(null,J,e),[a.memoizedState,e]},useRef:function(e){var t=Je();return e={current:e},t.memoizedState=e},useState:ao,useDebugValue:Ks,useDeferredValue:function(e){return Je().memoizedState=e},useTransition:function(){var e=ao(!1),t=e[0];return e=hm.bind(null,e[1]),Je().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var a=J,i=Je();if(q){if(r===void 0)throw Error(T(407));r=r()}else{if(r=t(),re===null)throw Error(T(349));Ft&30||rd(a,t,r)}i.memoizedState=r;var s={value:r,getSnapshot:t};return i.queue=s,io(ad.bind(null,a,s,e),[e]),a.flags|=2048,dn(9,nd.bind(null,a,s,r,t),void 0,null),r},useId:function(){var e=Je(),t=re.identifierPrefix;if(q){var r=tt,a=et;r=(a&~(1<<32-Be(a)-1)).toString(32)+r,t=":"+t+"R"+r,r=on++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=mm++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},xm={readContext:_e,useCallback:pd,useContext:_e,useEffect:Vs,useImperativeHandle:ud,useInsertionEffect:od,useLayoutEffect:cd,useMemo:md,useReducer:ui,useRef:ld,useState:function(){return ui(cn)},useDebugValue:Ks,useDeferredValue:function(e){var t=Ae();return hd(t,Z.memoizedState,e)},useTransition:function(){var e=ui(cn)[0],t=Ae().memoizedState;return[e,t]},useMutableSource:ed,useSyncExternalStore:td,useId:yd,unstable_isNewReconciler:!1},vm={readContext:_e,useCallback:pd,useContext:_e,useEffect:Vs,useImperativeHandle:ud,useInsertionEffect:od,useLayoutEffect:cd,useMemo:md,useReducer:pi,useRef:ld,useState:function(){return pi(cn)},useDebugValue:Ks,useDeferredValue:function(e){var t=Ae();return Z===null?t.memoizedState=e:hd(t,Z.memoizedState,e)},useTransition:function(){var e=pi(cn)[0],t=Ae().memoizedState;return[e,t]},useMutableSource:ed,useSyncExternalStore:td,useId:yd,unstable_isNewReconciler:!1};function Oe(e,t){if(e&&e.defaultProps){t=V({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function Yi(e,t,r,a){t=e.memoizedState,r=r(a,t),r=r==null?t:V({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Ia={isMounted:function(e){return(e=e._reactInternals)?Wt(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var a=pe(),i=Et(e),s=rt(a,i);s.payload=t,r!=null&&(s.callback=r),t=wt(e,s,i),t!==null&&(Me(t,e,i,a),Wn(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var a=pe(),i=Et(e),s=rt(a,i);s.tag=1,s.payload=t,r!=null&&(s.callback=r),t=wt(e,s,i),t!==null&&(Me(t,e,i,a),Wn(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=pe(),a=Et(e),i=rt(r,a);i.tag=2,t!=null&&(i.callback=t),t=wt(e,i,a),t!==null&&(Me(t,e,a,r),Wn(t,e,a))}};function so(e,t,r,a,i,s,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,s,l):t.prototype&&t.prototype.isPureReactComponent?!tn(r,a)||!tn(i,s):!0}function vd(e,t,r){var a=!1,i=jt,s=t.contextType;return typeof s=="object"&&s!==null?s=_e(s):(i=ve(t)?Bt:ce.current,a=t.contextTypes,s=(a=a!=null)?yr(e,i):jt),t=new t(r,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ia,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function lo(e,t,r,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,a),t.state!==e&&Ia.enqueueReplaceState(t,t.state,null)}function Qi(e,t,r,a){var i=e.stateNode;i.props=r,i.state=e.memoizedState,i.refs={},Fs(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=_e(s):(s=ve(t)?Bt:ce.current,i.context=yr(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Yi(e,t,s,r),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Ia.enqueueReplaceState(i,i.state,null),ya(e,r,i,a),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function vr(e,t){try{var r="",a=t;do r+=Gu(a),a=a.return;while(a);var i=r}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function mi(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Xi(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var bm=typeof WeakMap=="function"?WeakMap:Map;function bd(e,t,r){r=rt(-1,r),r.tag=3,r.payload={element:null};var a=t.value;return r.callback=function(){ba||(ba=!0,os=a),Xi(e,t)},r}function kd(e,t,r){r=rt(-1,r),r.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var i=t.value;r.payload=function(){return a(i)},r.callback=function(){Xi(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(r.callback=function(){Xi(e,t),typeof a!="function"&&(St===null?St=new Set([this]):St.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),r}function oo(e,t,r){var a=e.pingCache;if(a===null){a=e.pingCache=new bm;var i=new Set;a.set(t,i)}else i=a.get(t),i===void 0&&(i=new Set,a.set(t,i));i.has(r)||(i.add(r),e=Im.bind(null,e,t,r),t.then(e,e))}function co(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function uo(e,t,r,a,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=rt(-1,1),t.tag=2,wt(r,t,1))),r.lanes|=1),e)}var km=ot.ReactCurrentOwner,fe=!1;function ue(e,t,r,a){t.child=e===null?Yc(t,null,r,a):fr(t,e.child,r,a)}function po(e,t,r,a,i){r=r.render;var s=t.ref;return pr(t,i),a=Js(e,t,r,a,s,i),r=Gs(),e!==null&&!fe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,st(e,t,i)):(q&&r&&Is(t),t.flags|=1,ue(e,t,a,i),t.child)}function mo(e,t,r,a,i){if(e===null){var s=r.type;return typeof s=="function"&&!nl(s)&&s.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=s,wd(e,t,s,a,i)):(e=Qn(r.type,null,a,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var l=s.memoizedProps;if(r=r.compare,r=r!==null?r:tn,r(l,a)&&e.ref===t.ref)return st(e,t,i)}return t.flags|=1,e=Tt(s,a),e.ref=t.ref,e.return=t,t.child=e}function wd(e,t,r,a,i){if(e!==null){var s=e.memoizedProps;if(tn(s,a)&&e.ref===t.ref)if(fe=!1,t.pendingProps=a=s,(e.lanes&i)!==0)e.flags&131072&&(fe=!0);else return t.lanes=e.lanes,st(e,t,i)}return Zi(e,t,r,a,i)}function Sd(e,t,r){var a=t.pendingProps,i=a.children,s=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},M(lr,ke),ke|=r;else{if(!(r&1073741824))return e=s!==null?s.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,M(lr,ke),ke|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=s!==null?s.baseLanes:r,M(lr,ke),ke|=a}else s!==null?(a=s.baseLanes|r,t.memoizedState=null):a=r,M(lr,ke),ke|=a;return ue(e,t,i,r),t.child}function Ed(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Zi(e,t,r,a,i){var s=ve(r)?Bt:ce.current;return s=yr(t,s),pr(t,i),r=Js(e,t,r,a,s,i),a=Gs(),e!==null&&!fe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,st(e,t,i)):(q&&a&&Is(t),t.flags|=1,ue(e,t,r,i),t.child)}function ho(e,t,r,a,i){if(ve(r)){var s=!0;da(t)}else s=!1;if(pr(t,i),t.stateNode===null)Vn(e,t),vd(t,r,a),Qi(t,r,a,i),a=!0;else if(e===null){var l=t.stateNode,o=t.memoizedProps;l.props=o;var c=l.context,d=r.contextType;typeof d=="object"&&d!==null?d=_e(d):(d=ve(r)?Bt:ce.current,d=yr(t,d));var h=r.getDerivedStateFromProps,m=typeof h=="function"||typeof l.getSnapshotBeforeUpdate=="function";m||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(o!==a||c!==d)&&lo(t,l,a,d),mt=!1;var f=t.memoizedState;l.state=f,ya(t,a,l,i),c=t.memoizedState,o!==a||f!==c||xe.current||mt?(typeof h=="function"&&(Yi(t,r,h,a),c=t.memoizedState),(o=mt||so(t,r,o,a,f,c,d))?(m||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=c),l.props=a,l.state=c,l.context=d,a=o):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{l=t.stateNode,Xc(e,t),o=t.memoizedProps,d=t.type===t.elementType?o:Oe(t.type,o),l.props=d,m=t.pendingProps,f=l.context,c=r.contextType,typeof c=="object"&&c!==null?c=_e(c):(c=ve(r)?Bt:ce.current,c=yr(t,c));var y=r.getDerivedStateFromProps;(h=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(o!==m||f!==c)&&lo(t,l,a,c),mt=!1,f=t.memoizedState,l.state=f,ya(t,a,l,i);var k=t.memoizedState;o!==m||f!==k||xe.current||mt?(typeof y=="function"&&(Yi(t,r,y,a),k=t.memoizedState),(d=mt||so(t,r,d,a,f,k,c)||!1)?(h||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(a,k,c),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(a,k,c)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=k),l.props=a,l.state=k,l.context=c,a=d):(typeof l.componentDidUpdate!="function"||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),a=!1)}return es(e,t,r,a,s,i)}function es(e,t,r,a,i,s){Ed(e,t);var l=(t.flags&128)!==0;if(!a&&!l)return i&&Xl(t,r,!1),st(e,t,s);a=t.stateNode,km.current=t;var o=l&&typeof r.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&l?(t.child=fr(t,e.child,null,s),t.child=fr(t,null,o,s)):ue(e,t,o,s),t.memoizedState=a.state,i&&Xl(t,r,!0),t.child}function Td(e){var t=e.stateNode;t.pendingContext?Ql(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ql(e,t.context,!1),Hs(e,t.containerInfo)}function yo(e,t,r,a,i){return gr(),Os(i),t.flags|=256,ue(e,t,r,a),t.child}var ts={dehydrated:null,treeContext:null,retryLane:0};function rs(e){return{baseLanes:e,cachePool:null,transitions:null}}function Nd(e,t,r){var a=t.pendingProps,i=W.current,s=!1,l=(t.flags&128)!==0,o;if((o=l)||(o=e!==null&&e.memoizedState===null?!1:(i&2)!==0),o?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),M(W,i&1),e===null)return Vi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=a.children,e=a.fallback,s?(a=t.mode,s=t.child,l={mode:"hidden",children:l},!(a&1)&&s!==null?(s.childLanes=0,s.pendingProps=l):s=za(l,a,0,null),e=Ut(e,a,r,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=rs(r),t.memoizedState=ts,e):Ys(t,l));if(i=e.memoizedState,i!==null&&(o=i.dehydrated,o!==null))return wm(e,t,l,a,o,i,r);if(s){s=a.fallback,l=t.mode,i=e.child,o=i.sibling;var c={mode:"hidden",children:a.children};return!(l&1)&&t.child!==i?(a=t.child,a.childLanes=0,a.pendingProps=c,t.deletions=null):(a=Tt(i,c),a.subtreeFlags=i.subtreeFlags&14680064),o!==null?s=Tt(o,s):(s=Ut(s,l,r,null),s.flags|=2),s.return=t,a.return=t,a.sibling=s,t.child=a,a=s,s=t.child,l=e.child.memoizedState,l=l===null?rs(r):{baseLanes:l.baseLanes|r,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~r,t.memoizedState=ts,a}return s=e.child,e=s.sibling,a=Tt(s,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=r),a.return=t,a.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=a,t.memoizedState=null,a}function Ys(e,t){return t=za({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Dn(e,t,r,a){return a!==null&&Os(a),fr(t,e.child,null,r),e=Ys(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wm(e,t,r,a,i,s,l){if(r)return t.flags&256?(t.flags&=-257,a=mi(Error(T(422))),Dn(e,t,l,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=a.fallback,i=t.mode,a=za({mode:"visible",children:a.children},i,0,null),s=Ut(s,i,l,null),s.flags|=2,a.return=t,s.return=t,a.sibling=s,t.child=a,t.mode&1&&fr(t,e.child,null,l),t.child.memoizedState=rs(l),t.memoizedState=ts,s);if(!(t.mode&1))return Dn(e,t,l,null);if(i.data==="$!"){if(a=i.nextSibling&&i.nextSibling.dataset,a)var o=a.dgst;return a=o,s=Error(T(419)),a=mi(s,a,void 0),Dn(e,t,l,a)}if(o=(l&e.childLanes)!==0,fe||o){if(a=re,a!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(a.suspendedLanes|l)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,it(e,i),Me(a,e,i,-1))}return rl(),a=mi(Error(T(421))),Dn(e,t,l,a)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Dm.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,we=kt(i.nextSibling),Se=t,q=!0,Ue=null,e!==null&&(je[Pe++]=et,je[Pe++]=tt,je[Pe++]=Mt,et=e.id,tt=e.overflow,Mt=t),t=Ys(t,a.children),t.flags|=4096,t)}function go(e,t,r){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Ki(e.return,t,r)}function hi(e,t,r,a,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:r,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=r,s.tailMode=i)}function jd(e,t,r){var a=t.pendingProps,i=a.revealOrder,s=a.tail;if(ue(e,t,a.children,r),a=W.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&go(e,r,t);else if(e.tag===19)go(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(M(W,a),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(r=t.child,i=null;r!==null;)e=r.alternate,e!==null&&ga(e)===null&&(i=r),r=r.sibling;r=i,r===null?(i=t.child,t.child=null):(i=r.sibling,r.sibling=null),hi(t,!1,i,r,s);break;case"backwards":for(r=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ga(e)===null){t.child=i;break}e=i.sibling,i.sibling=r,r=i,i=e}hi(t,!0,r,null,s);break;case"together":hi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Vn(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function st(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Ht|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(T(153));if(t.child!==null){for(e=t.child,r=Tt(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Tt(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function Sm(e,t,r){switch(t.tag){case 3:Td(t),gr();break;case 5:Zc(t);break;case 1:ve(t.type)&&da(t);break;case 4:Hs(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,i=t.memoizedProps.value;M(ma,a._currentValue),a._currentValue=i;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(M(W,W.current&1),t.flags|=128,null):r&t.child.childLanes?Nd(e,t,r):(M(W,W.current&1),e=st(e,t,r),e!==null?e.sibling:null);M(W,W.current&1);break;case 19:if(a=(r&t.childLanes)!==0,e.flags&128){if(a)return jd(e,t,r);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),M(W,W.current),a)break;return null;case 22:case 23:return t.lanes=0,Sd(e,t,r)}return st(e,t,r)}var Pd,ns,Cd,Rd;Pd=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};ns=function(){};Cd=function(e,t,r,a){var i=e.memoizedProps;if(i!==a){e=t.stateNode,Ot(Ke.current);var s=null;switch(r){case"input":i=Ti(e,i),a=Ti(e,a),s=[];break;case"select":i=V({},i,{value:void 0}),a=V({},a,{value:void 0}),s=[];break;case"textarea":i=Pi(e,i),a=Pi(e,a),s=[];break;default:typeof i.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=oa)}Ri(r,a);var l;r=null;for(d in i)if(!a.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var o=i[d];for(l in o)o.hasOwnProperty(l)&&(r||(r={}),r[l]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Vr.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in a){var c=a[d];if(o=i!=null?i[d]:void 0,a.hasOwnProperty(d)&&c!==o&&(c!=null||o!=null))if(d==="style")if(o){for(l in o)!o.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(r||(r={}),r[l]="");for(l in c)c.hasOwnProperty(l)&&o[l]!==c[l]&&(r||(r={}),r[l]=c[l])}else r||(s||(s=[]),s.push(d,r)),r=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,o=o?o.__html:void 0,c!=null&&o!==c&&(s=s||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Vr.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&F("scroll",e),s||o===c||(s=[])):(s=s||[]).push(d,c))}r&&(s=s||[]).push("style",r);var d=s;(t.updateQueue=d)&&(t.flags|=4)}};Rd=function(e,t,r,a){r!==a&&(t.flags|=4)};function Ar(e,t){if(!q)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var a=null;r!==null;)r.alternate!==null&&(a=r),r=r.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function le(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,a=0;if(t)for(var i=e.child;i!==null;)r|=i.lanes|i.childLanes,a|=i.subtreeFlags&14680064,a|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)r|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=a,e.childLanes=r,t}function Em(e,t,r){var a=t.pendingProps;switch(Ds(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return le(t),null;case 1:return ve(t.type)&&ca(),le(t),null;case 3:return a=t.stateNode,xr(),H(xe),H(ce),$s(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Ln(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ue!==null&&(us(Ue),Ue=null))),ns(e,t),le(t),null;case 5:qs(t);var i=Ot(ln.current);if(r=t.type,e!==null&&t.stateNode!=null)Cd(e,t,r,a,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(T(166));return le(t),null}if(e=Ot(Ke.current),Ln(t)){a=t.stateNode,r=t.type;var s=t.memoizedProps;switch(a[Ge]=t,a[an]=s,e=(t.mode&1)!==0,r){case"dialog":F("cancel",a),F("close",a);break;case"iframe":case"object":case"embed":F("load",a);break;case"video":case"audio":for(i=0;i<Ur.length;i++)F(Ur[i],a);break;case"source":F("error",a);break;case"img":case"image":case"link":F("error",a),F("load",a);break;case"details":F("toggle",a);break;case"input":El(a,s),F("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!s.multiple},F("invalid",a);break;case"textarea":Nl(a,s),F("invalid",a)}Ri(r,s),i=null;for(var l in s)if(s.hasOwnProperty(l)){var o=s[l];l==="children"?typeof o=="string"?a.textContent!==o&&(s.suppressHydrationWarning!==!0&&An(a.textContent,o,e),i=["children",o]):typeof o=="number"&&a.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&An(a.textContent,o,e),i=["children",""+o]):Vr.hasOwnProperty(l)&&o!=null&&l==="onScroll"&&F("scroll",a)}switch(r){case"input":En(a),Tl(a,s,!0);break;case"textarea":En(a),jl(a);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(a.onclick=oa)}a=i,t.updateQueue=a,a!==null&&(t.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ac(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=l.createElement(r,{is:a.is}):(e=l.createElement(r),r==="select"&&(l=e,a.multiple?l.multiple=!0:a.size&&(l.size=a.size))):e=l.createElementNS(e,r),e[Ge]=t,e[an]=a,Pd(e,t,!1,!1),t.stateNode=e;e:{switch(l=_i(r,a),r){case"dialog":F("cancel",e),F("close",e),i=a;break;case"iframe":case"object":case"embed":F("load",e),i=a;break;case"video":case"audio":for(i=0;i<Ur.length;i++)F(Ur[i],e);i=a;break;case"source":F("error",e),i=a;break;case"img":case"image":case"link":F("error",e),F("load",e),i=a;break;case"details":F("toggle",e),i=a;break;case"input":El(e,a),i=Ti(e,a),F("invalid",e);break;case"option":i=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},i=V({},a,{value:void 0}),F("invalid",e);break;case"textarea":Nl(e,a),i=Pi(e,a),F("invalid",e);break;default:i=a}Ri(r,i),o=i;for(s in o)if(o.hasOwnProperty(s)){var c=o[s];s==="style"?lc(e,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&ic(e,c)):s==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&Kr(e,c):typeof c=="number"&&Kr(e,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Vr.hasOwnProperty(s)?c!=null&&s==="onScroll"&&F("scroll",e):c!=null&&bs(e,s,c,l))}switch(r){case"input":En(e),Tl(e,a,!1);break;case"textarea":En(e),jl(e);break;case"option":a.value!=null&&e.setAttribute("value",""+Nt(a.value));break;case"select":e.multiple=!!a.multiple,s=a.value,s!=null?or(e,!!a.multiple,s,!1):a.defaultValue!=null&&or(e,!!a.multiple,a.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=oa)}switch(r){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return le(t),null;case 6:if(e&&t.stateNode!=null)Rd(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(T(166));if(r=Ot(ln.current),Ot(Ke.current),Ln(t)){if(a=t.stateNode,r=t.memoizedProps,a[Ge]=t,(s=a.nodeValue!==r)&&(e=Se,e!==null))switch(e.tag){case 3:An(a.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&An(a.nodeValue,r,(e.mode&1)!==0)}s&&(t.flags|=4)}else a=(r.nodeType===9?r:r.ownerDocument).createTextNode(a),a[Ge]=t,t.stateNode=a}return le(t),null;case 13:if(H(W),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(q&&we!==null&&t.mode&1&&!(t.flags&128))Vc(),gr(),t.flags|=98560,s=!1;else if(s=Ln(t),a!==null&&a.dehydrated!==null){if(e===null){if(!s)throw Error(T(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(T(317));s[Ge]=t}else gr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;le(t),s=!1}else Ue!==null&&(us(Ue),Ue=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||W.current&1?ee===0&&(ee=3):rl())),t.updateQueue!==null&&(t.flags|=4),le(t),null);case 4:return xr(),ns(e,t),e===null&&rn(t.stateNode.containerInfo),le(t),null;case 10:return Bs(t.type._context),le(t),null;case 17:return ve(t.type)&&ca(),le(t),null;case 19:if(H(W),s=t.memoizedState,s===null)return le(t),null;if(a=(t.flags&128)!==0,l=s.rendering,l===null)if(a)Ar(s,!1);else{if(ee!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=ga(e),l!==null){for(t.flags|=128,Ar(s,!1),a=l.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=r,r=t.child;r!==null;)s=r,e=a,s.flags&=14680066,l=s.alternate,l===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=l.childLanes,s.lanes=l.lanes,s.child=l.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=l.memoizedProps,s.memoizedState=l.memoizedState,s.updateQueue=l.updateQueue,s.type=l.type,e=l.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return M(W,W.current&1|2),t.child}e=e.sibling}s.tail!==null&&Y()>br&&(t.flags|=128,a=!0,Ar(s,!1),t.lanes=4194304)}else{if(!a)if(e=ga(l),e!==null){if(t.flags|=128,a=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Ar(s,!0),s.tail===null&&s.tailMode==="hidden"&&!l.alternate&&!q)return le(t),null}else 2*Y()-s.renderingStartTime>br&&r!==1073741824&&(t.flags|=128,a=!0,Ar(s,!1),t.lanes=4194304);s.isBackwards?(l.sibling=t.child,t.child=l):(r=s.last,r!==null?r.sibling=l:t.child=l,s.last=l)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Y(),t.sibling=null,r=W.current,M(W,a?r&1|2:r&1),t):(le(t),null);case 22:case 23:return tl(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?ke&1073741824&&(le(t),t.subtreeFlags&6&&(t.flags|=8192)):le(t),null;case 24:return null;case 25:return null}throw Error(T(156,t.tag))}function Tm(e,t){switch(Ds(t),t.tag){case 1:return ve(t.type)&&ca(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xr(),H(xe),H(ce),$s(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return qs(t),null;case 13:if(H(W),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(T(340));gr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(W),null;case 4:return xr(),null;case 10:return Bs(t.type._context),null;case 22:case 23:return tl(),null;case 24:return null;default:return null}}var On=!1,oe=!1,Nm=typeof WeakSet=="function"?WeakSet:Set,R=null;function sr(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(a){K(e,t,a)}else r.current=null}function as(e,t,r){try{r()}catch(a){K(e,t,a)}}var fo=!1;function jm(e,t){if(Fi=ia,e=Dc(),Ls(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var a=r.getSelection&&r.getSelection();if(a&&a.rangeCount!==0){r=a.anchorNode;var i=a.anchorOffset,s=a.focusNode;a=a.focusOffset;try{r.nodeType,s.nodeType}catch{r=null;break e}var l=0,o=-1,c=-1,d=0,h=0,m=e,f=null;t:for(;;){for(var y;m!==r||i!==0&&m.nodeType!==3||(o=l+i),m!==s||a!==0&&m.nodeType!==3||(c=l+a),m.nodeType===3&&(l+=m.nodeValue.length),(y=m.firstChild)!==null;)f=m,m=y;for(;;){if(m===e)break t;if(f===r&&++d===i&&(o=l),f===s&&++h===a&&(c=l),(y=m.nextSibling)!==null)break;m=f,f=m.parentNode}m=y}r=o===-1||c===-1?null:{start:o,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(Hi={focusedElem:e,selectionRange:r},ia=!1,R=t;R!==null;)if(t=R,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,R=e;else for(;R!==null;){t=R;try{var k=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var x=k.memoizedProps,b=k.memoizedState,p=t.stateNode,u=p.getSnapshotBeforeUpdate(t.elementType===t.type?x:Oe(t.type,x),b);p.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(T(163))}}catch(w){K(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,R=e;break}R=t.return}return k=fo,fo=!1,k}function Wr(e,t,r){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var i=a=a.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&as(t,r,s)}i=i.next}while(i!==a)}}function Da(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var a=r.create;r.destroy=a()}r=r.next}while(r!==t)}}function is(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function _d(e){var t=e.alternate;t!==null&&(e.alternate=null,_d(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ge],delete t[an],delete t[Wi],delete t[cm],delete t[dm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ad(e){return e.tag===5||e.tag===3||e.tag===4}function xo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ad(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ss(e,t,r){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=oa));else if(a!==4&&(e=e.child,e!==null))for(ss(e,t,r),e=e.sibling;e!==null;)ss(e,t,r),e=e.sibling}function ls(e,t,r){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(ls(e,t,r),e=e.sibling;e!==null;)ls(e,t,r),e=e.sibling}var ne=null,ze=!1;function ut(e,t,r){for(r=r.child;r!==null;)Ld(e,t,r),r=r.sibling}function Ld(e,t,r){if(Ve&&typeof Ve.onCommitFiberUnmount=="function")try{Ve.onCommitFiberUnmount(ja,r)}catch{}switch(r.tag){case 5:oe||sr(r,t);case 6:var a=ne,i=ze;ne=null,ut(e,t,r),ne=a,ze=i,ne!==null&&(ze?(e=ne,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):ne.removeChild(r.stateNode));break;case 18:ne!==null&&(ze?(e=ne,r=r.stateNode,e.nodeType===8?li(e.parentNode,r):e.nodeType===1&&li(e,r),Zr(e)):li(ne,r.stateNode));break;case 4:a=ne,i=ze,ne=r.stateNode.containerInfo,ze=!0,ut(e,t,r),ne=a,ze=i;break;case 0:case 11:case 14:case 15:if(!oe&&(a=r.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){i=a=a.next;do{var s=i,l=s.destroy;s=s.tag,l!==void 0&&(s&2||s&4)&&as(r,t,l),i=i.next}while(i!==a)}ut(e,t,r);break;case 1:if(!oe&&(sr(r,t),a=r.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=r.memoizedProps,a.state=r.memoizedState,a.componentWillUnmount()}catch(o){K(r,t,o)}ut(e,t,r);break;case 21:ut(e,t,r);break;case 22:r.mode&1?(oe=(a=oe)||r.memoizedState!==null,ut(e,t,r),oe=a):ut(e,t,r);break;default:ut(e,t,r)}}function vo(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new Nm),t.forEach(function(a){var i=Om.bind(null,e,a);r.has(a)||(r.add(a),a.then(i,i))})}}function De(e,t){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var i=r[a];try{var s=e,l=t,o=l;e:for(;o!==null;){switch(o.tag){case 5:ne=o.stateNode,ze=!1;break e;case 3:ne=o.stateNode.containerInfo,ze=!0;break e;case 4:ne=o.stateNode.containerInfo,ze=!0;break e}o=o.return}if(ne===null)throw Error(T(160));Ld(s,l,i),ne=null,ze=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(d){K(i,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Id(t,e),t=t.sibling}function Id(e,t){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(De(t,e),We(e),a&4){try{Wr(3,e,e.return),Da(3,e)}catch(x){K(e,e.return,x)}try{Wr(5,e,e.return)}catch(x){K(e,e.return,x)}}break;case 1:De(t,e),We(e),a&512&&r!==null&&sr(r,r.return);break;case 5:if(De(t,e),We(e),a&512&&r!==null&&sr(r,r.return),e.flags&32){var i=e.stateNode;try{Kr(i,"")}catch(x){K(e,e.return,x)}}if(a&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,l=r!==null?r.memoizedProps:s,o=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&rc(i,s),_i(o,l);var d=_i(o,s);for(l=0;l<c.length;l+=2){var h=c[l],m=c[l+1];h==="style"?lc(i,m):h==="dangerouslySetInnerHTML"?ic(i,m):h==="children"?Kr(i,m):bs(i,h,m,d)}switch(o){case"input":Ni(i,s);break;case"textarea":nc(i,s);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var y=s.value;y!=null?or(i,!!s.multiple,y,!1):f!==!!s.multiple&&(s.defaultValue!=null?or(i,!!s.multiple,s.defaultValue,!0):or(i,!!s.multiple,s.multiple?[]:"",!1))}i[an]=s}catch(x){K(e,e.return,x)}}break;case 6:if(De(t,e),We(e),a&4){if(e.stateNode===null)throw Error(T(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(x){K(e,e.return,x)}}break;case 3:if(De(t,e),We(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Zr(t.containerInfo)}catch(x){K(e,e.return,x)}break;case 4:De(t,e),We(e);break;case 13:De(t,e),We(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Zs=Y())),a&4&&vo(e);break;case 22:if(h=r!==null&&r.memoizedState!==null,e.mode&1?(oe=(d=oe)||h,De(t,e),oe=d):De(t,e),We(e),a&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(R=e,h=e.child;h!==null;){for(m=R=h;R!==null;){switch(f=R,y=f.child,f.tag){case 0:case 11:case 14:case 15:Wr(4,f,f.return);break;case 1:sr(f,f.return);var k=f.stateNode;if(typeof k.componentWillUnmount=="function"){a=f,r=f.return;try{t=a,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(x){K(a,r,x)}}break;case 5:sr(f,f.return);break;case 22:if(f.memoizedState!==null){ko(m);continue}}y!==null?(y.return=f,R=y):ko(m)}h=h.sibling}e:for(h=null,m=e;;){if(m.tag===5){if(h===null){h=m;try{i=m.stateNode,d?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=m.stateNode,c=m.memoizedProps.style,l=c!=null&&c.hasOwnProperty("display")?c.display:null,o.style.display=sc("display",l))}catch(x){K(e,e.return,x)}}}else if(m.tag===6){if(h===null)try{m.stateNode.nodeValue=d?"":m.memoizedProps}catch(x){K(e,e.return,x)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;h===m&&(h=null),m=m.return}h===m&&(h=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:De(t,e),We(e),a&4&&vo(e);break;case 21:break;default:De(t,e),We(e)}}function We(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Ad(r)){var a=r;break e}r=r.return}throw Error(T(160))}switch(a.tag){case 5:var i=a.stateNode;a.flags&32&&(Kr(i,""),a.flags&=-33);var s=xo(e);ls(e,s,i);break;case 3:case 4:var l=a.stateNode.containerInfo,o=xo(e);ss(e,o,l);break;default:throw Error(T(161))}}catch(c){K(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pm(e,t,r){R=e,Dd(e)}function Dd(e,t,r){for(var a=(e.mode&1)!==0;R!==null;){var i=R,s=i.child;if(i.tag===22&&a){var l=i.memoizedState!==null||On;if(!l){var o=i.alternate,c=o!==null&&o.memoizedState!==null||oe;o=On;var d=oe;if(On=l,(oe=c)&&!d)for(R=i;R!==null;)l=R,c=l.child,l.tag===22&&l.memoizedState!==null?wo(i):c!==null?(c.return=l,R=c):wo(i);for(;s!==null;)R=s,Dd(s),s=s.sibling;R=i,On=o,oe=d}bo(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,R=s):bo(e)}}function bo(e){for(;R!==null;){var t=R;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:oe||Da(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!oe)if(r===null)a.componentDidMount();else{var i=t.elementType===t.type?r.memoizedProps:Oe(t.type,r.memoizedProps);a.componentDidUpdate(i,r.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&no(t,s,a);break;case 3:var l=t.updateQueue;if(l!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}no(t,l,r)}break;case 5:var o=t.stateNode;if(r===null&&t.flags&4){r=o;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var m=h.dehydrated;m!==null&&Zr(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(T(163))}oe||t.flags&512&&is(t)}catch(f){K(t,t.return,f)}}if(t===e){R=null;break}if(r=t.sibling,r!==null){r.return=t.return,R=r;break}R=t.return}}function ko(e){for(;R!==null;){var t=R;if(t===e){R=null;break}var r=t.sibling;if(r!==null){r.return=t.return,R=r;break}R=t.return}}function wo(e){for(;R!==null;){var t=R;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Da(4,t)}catch(c){K(t,r,c)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var i=t.return;try{a.componentDidMount()}catch(c){K(t,i,c)}}var s=t.return;try{is(t)}catch(c){K(t,s,c)}break;case 5:var l=t.return;try{is(t)}catch(c){K(t,l,c)}}}catch(c){K(t,t.return,c)}if(t===e){R=null;break}var o=t.sibling;if(o!==null){o.return=t.return,R=o;break}R=t.return}}var Cm=Math.ceil,va=ot.ReactCurrentDispatcher,Qs=ot.ReactCurrentOwner,Re=ot.ReactCurrentBatchConfig,O=0,re=null,Q=null,ae=0,ke=0,lr=Ct(0),ee=0,un=null,Ht=0,Oa=0,Xs=0,Jr=null,ge=null,Zs=0,br=1/0,Xe=null,ba=!1,os=null,St=null,zn=!1,ft=null,ka=0,Gr=0,cs=null,Kn=-1,Yn=0;function pe(){return O&6?Y():Kn!==-1?Kn:Kn=Y()}function Et(e){return e.mode&1?O&2&&ae!==0?ae&-ae:pm.transition!==null?(Yn===0&&(Yn=vc()),Yn):(e=z,e!==0||(e=window.event,e=e===void 0?16:Nc(e.type)),e):1}function Me(e,t,r,a){if(50<Gr)throw Gr=0,cs=null,Error(T(185));hn(e,r,a),(!(O&2)||e!==re)&&(e===re&&(!(O&2)&&(Oa|=r),ee===4&&yt(e,ae)),be(e,a),r===1&&O===0&&!(t.mode&1)&&(br=Y()+500,Aa&&Rt()))}function be(e,t){var r=e.callbackNode;pp(e,t);var a=aa(e,e===re?ae:0);if(a===0)r!==null&&Rl(r),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(r!=null&&Rl(r),t===1)e.tag===0?um(So.bind(null,e)):Wc(So.bind(null,e)),lm(function(){!(O&6)&&Rt()}),r=null;else{switch(bc(a)){case 1:r=Ts;break;case 4:r=fc;break;case 16:r=na;break;case 536870912:r=xc;break;default:r=na}r=qd(r,Od.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Od(e,t){if(Kn=-1,Yn=0,O&6)throw Error(T(327));var r=e.callbackNode;if(mr()&&e.callbackNode!==r)return null;var a=aa(e,e===re?ae:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=wa(e,a);else{t=a;var i=O;O|=2;var s=Ud();(re!==e||ae!==t)&&(Xe=null,br=Y()+500,zt(e,t));do try{Am();break}catch(o){zd(e,o)}while(!0);Us(),va.current=s,O=i,Q!==null?t=0:(re=null,ae=0,t=ee)}if(t!==0){if(t===2&&(i=Oi(e),i!==0&&(a=i,t=ds(e,i))),t===1)throw r=un,zt(e,0),yt(e,a),be(e,Y()),r;if(t===6)yt(e,a);else{if(i=e.current.alternate,!(a&30)&&!Rm(i)&&(t=wa(e,a),t===2&&(s=Oi(e),s!==0&&(a=s,t=ds(e,s))),t===1))throw r=un,zt(e,0),yt(e,a),be(e,Y()),r;switch(e.finishedWork=i,e.finishedLanes=a,t){case 0:case 1:throw Error(T(345));case 2:Lt(e,ge,Xe);break;case 3:if(yt(e,a),(a&130023424)===a&&(t=Zs+500-Y(),10<t)){if(aa(e,0)!==0)break;if(i=e.suspendedLanes,(i&a)!==a){pe(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=$i(Lt.bind(null,e,ge,Xe),t);break}Lt(e,ge,Xe);break;case 4:if(yt(e,a),(a&4194240)===a)break;for(t=e.eventTimes,i=-1;0<a;){var l=31-Be(a);s=1<<l,l=t[l],l>i&&(i=l),a&=~s}if(a=i,a=Y()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Cm(a/1960))-a,10<a){e.timeoutHandle=$i(Lt.bind(null,e,ge,Xe),a);break}Lt(e,ge,Xe);break;case 5:Lt(e,ge,Xe);break;default:throw Error(T(329))}}}return be(e,Y()),e.callbackNode===r?Od.bind(null,e):null}function ds(e,t){var r=Jr;return e.current.memoizedState.isDehydrated&&(zt(e,t).flags|=256),e=wa(e,t),e!==2&&(t=ge,ge=r,t!==null&&us(t)),e}function us(e){ge===null?ge=e:ge.push.apply(ge,e)}function Rm(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var a=0;a<r.length;a++){var i=r[a],s=i.getSnapshot;i=i.value;try{if(!He(s(),i))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yt(e,t){for(t&=~Xs,t&=~Oa,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Be(t),a=1<<r;e[r]=-1,t&=~a}}function So(e){if(O&6)throw Error(T(327));mr();var t=aa(e,0);if(!(t&1))return be(e,Y()),null;var r=wa(e,t);if(e.tag!==0&&r===2){var a=Oi(e);a!==0&&(t=a,r=ds(e,a))}if(r===1)throw r=un,zt(e,0),yt(e,t),be(e,Y()),r;if(r===6)throw Error(T(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Lt(e,ge,Xe),be(e,Y()),null}function el(e,t){var r=O;O|=1;try{return e(t)}finally{O=r,O===0&&(br=Y()+500,Aa&&Rt())}}function qt(e){ft!==null&&ft.tag===0&&!(O&6)&&mr();var t=O;O|=1;var r=Re.transition,a=z;try{if(Re.transition=null,z=1,e)return e()}finally{z=a,Re.transition=r,O=t,!(O&6)&&Rt()}}function tl(){ke=lr.current,H(lr)}function zt(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,sm(r)),Q!==null)for(r=Q.return;r!==null;){var a=r;switch(Ds(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&ca();break;case 3:xr(),H(xe),H(ce),$s();break;case 5:qs(a);break;case 4:xr();break;case 13:H(W);break;case 19:H(W);break;case 10:Bs(a.type._context);break;case 22:case 23:tl()}r=r.return}if(re=e,Q=e=Tt(e.current,null),ae=ke=t,ee=0,un=null,Xs=Oa=Ht=0,ge=Jr=null,Dt!==null){for(t=0;t<Dt.length;t++)if(r=Dt[t],a=r.interleaved,a!==null){r.interleaved=null;var i=a.next,s=r.pending;if(s!==null){var l=s.next;s.next=i,a.next=l}r.pending=a}Dt=null}return e}function zd(e,t){do{var r=Q;try{if(Us(),Jn.current=xa,fa){for(var a=J.memoizedState;a!==null;){var i=a.queue;i!==null&&(i.pending=null),a=a.next}fa=!1}if(Ft=0,te=Z=J=null,$r=!1,on=0,Qs.current=null,r===null||r.return===null){ee=1,un=t,Q=null;break}e:{var s=e,l=r.return,o=r,c=t;if(t=ae,o.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,h=o,m=h.tag;if(!(h.mode&1)&&(m===0||m===11||m===15)){var f=h.alternate;f?(h.updateQueue=f.updateQueue,h.memoizedState=f.memoizedState,h.lanes=f.lanes):(h.updateQueue=null,h.memoizedState=null)}var y=co(l);if(y!==null){y.flags&=-257,uo(y,l,o,s,t),y.mode&1&&oo(s,d,t),t=y,c=d;var k=t.updateQueue;if(k===null){var x=new Set;x.add(c),t.updateQueue=x}else k.add(c);break e}else{if(!(t&1)){oo(s,d,t),rl();break e}c=Error(T(426))}}else if(q&&o.mode&1){var b=co(l);if(b!==null){!(b.flags&65536)&&(b.flags|=256),uo(b,l,o,s,t),Os(vr(c,o));break e}}s=c=vr(c,o),ee!==4&&(ee=2),Jr===null?Jr=[s]:Jr.push(s),s=l;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var p=bd(s,c,t);ro(s,p);break e;case 1:o=c;var u=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof u.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(St===null||!St.has(g)))){s.flags|=65536,t&=-t,s.lanes|=t;var w=kd(s,o,t);ro(s,w);break e}}s=s.return}while(s!==null)}Md(r)}catch(S){t=S,Q===r&&r!==null&&(Q=r=r.return);continue}break}while(!0)}function Ud(){var e=va.current;return va.current=xa,e===null?xa:e}function rl(){(ee===0||ee===3||ee===2)&&(ee=4),re===null||!(Ht&268435455)&&!(Oa&268435455)||yt(re,ae)}function wa(e,t){var r=O;O|=2;var a=Ud();(re!==e||ae!==t)&&(Xe=null,zt(e,t));do try{_m();break}catch(i){zd(e,i)}while(!0);if(Us(),O=r,va.current=a,Q!==null)throw Error(T(261));return re=null,ae=0,ee}function _m(){for(;Q!==null;)Bd(Q)}function Am(){for(;Q!==null&&!np();)Bd(Q)}function Bd(e){var t=Hd(e.alternate,e,ke);e.memoizedProps=e.pendingProps,t===null?Md(e):Q=t,Qs.current=null}function Md(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=Tm(r,t),r!==null){r.flags&=32767,Q=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ee=6,Q=null;return}}else if(r=Em(r,t,ke),r!==null){Q=r;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);ee===0&&(ee=5)}function Lt(e,t,r){var a=z,i=Re.transition;try{Re.transition=null,z=1,Lm(e,t,r,a)}finally{Re.transition=i,z=a}return null}function Lm(e,t,r,a){do mr();while(ft!==null);if(O&6)throw Error(T(327));r=e.finishedWork;var i=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(T(177));e.callbackNode=null,e.callbackPriority=0;var s=r.lanes|r.childLanes;if(mp(e,s),e===re&&(Q=re=null,ae=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||zn||(zn=!0,qd(na,function(){return mr(),null})),s=(r.flags&15990)!==0,r.subtreeFlags&15990||s){s=Re.transition,Re.transition=null;var l=z;z=1;var o=O;O|=4,Qs.current=null,jm(e,r),Id(r,e),Zp(Hi),ia=!!Fi,Hi=Fi=null,e.current=r,Pm(r),ap(),O=o,z=l,Re.transition=s}else e.current=r;if(zn&&(zn=!1,ft=e,ka=i),s=e.pendingLanes,s===0&&(St=null),lp(r.stateNode),be(e,Y()),t!==null)for(a=e.onRecoverableError,r=0;r<t.length;r++)i=t[r],a(i.value,{componentStack:i.stack,digest:i.digest});if(ba)throw ba=!1,e=os,os=null,e;return ka&1&&e.tag!==0&&mr(),s=e.pendingLanes,s&1?e===cs?Gr++:(Gr=0,cs=e):Gr=0,Rt(),null}function mr(){if(ft!==null){var e=bc(ka),t=Re.transition,r=z;try{if(Re.transition=null,z=16>e?16:e,ft===null)var a=!1;else{if(e=ft,ft=null,ka=0,O&6)throw Error(T(331));var i=O;for(O|=4,R=e.current;R!==null;){var s=R,l=s.child;if(R.flags&16){var o=s.deletions;if(o!==null){for(var c=0;c<o.length;c++){var d=o[c];for(R=d;R!==null;){var h=R;switch(h.tag){case 0:case 11:case 15:Wr(8,h,s)}var m=h.child;if(m!==null)m.return=h,R=m;else for(;R!==null;){h=R;var f=h.sibling,y=h.return;if(_d(h),h===d){R=null;break}if(f!==null){f.return=y,R=f;break}R=y}}}var k=s.alternate;if(k!==null){var x=k.child;if(x!==null){k.child=null;do{var b=x.sibling;x.sibling=null,x=b}while(x!==null)}}R=s}}if(s.subtreeFlags&2064&&l!==null)l.return=s,R=l;else e:for(;R!==null;){if(s=R,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Wr(9,s,s.return)}var p=s.sibling;if(p!==null){p.return=s.return,R=p;break e}R=s.return}}var u=e.current;for(R=u;R!==null;){l=R;var g=l.child;if(l.subtreeFlags&2064&&g!==null)g.return=l,R=g;else e:for(l=u;R!==null;){if(o=R,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Da(9,o)}}catch(S){K(o,o.return,S)}if(o===l){R=null;break e}var w=o.sibling;if(w!==null){w.return=o.return,R=w;break e}R=o.return}}if(O=i,Rt(),Ve&&typeof Ve.onPostCommitFiberRoot=="function")try{Ve.onPostCommitFiberRoot(ja,e)}catch{}a=!0}return a}finally{z=r,Re.transition=t}}return!1}function Eo(e,t,r){t=vr(r,t),t=bd(e,t,1),e=wt(e,t,1),t=pe(),e!==null&&(hn(e,1,t),be(e,t))}function K(e,t,r){if(e.tag===3)Eo(e,e,r);else for(;t!==null;){if(t.tag===3){Eo(t,e,r);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(St===null||!St.has(a))){e=vr(r,e),e=kd(t,e,1),t=wt(t,e,1),e=pe(),t!==null&&(hn(t,1,e),be(t,e));break}}t=t.return}}function Im(e,t,r){var a=e.pingCache;a!==null&&a.delete(t),t=pe(),e.pingedLanes|=e.suspendedLanes&r,re===e&&(ae&r)===r&&(ee===4||ee===3&&(ae&130023424)===ae&&500>Y()-Zs?zt(e,0):Xs|=r),be(e,t)}function Fd(e,t){t===0&&(e.mode&1?(t=jn,jn<<=1,!(jn&130023424)&&(jn=4194304)):t=1);var r=pe();e=it(e,t),e!==null&&(hn(e,t,r),be(e,r))}function Dm(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Fd(e,r)}function Om(e,t){var r=0;switch(e.tag){case 13:var a=e.stateNode,i=e.memoizedState;i!==null&&(r=i.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(T(314))}a!==null&&a.delete(t),Fd(e,r)}var Hd;Hd=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||xe.current)fe=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return fe=!1,Sm(e,t,r);fe=!!(e.flags&131072)}else fe=!1,q&&t.flags&1048576&&Jc(t,pa,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;Vn(e,t),e=t.pendingProps;var i=yr(t,ce.current);pr(t,r),i=Js(null,t,a,e,i,r);var s=Gs();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ve(a)?(s=!0,da(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Fs(t),i.updater=Ia,t.stateNode=i,i._reactInternals=t,Qi(t,a,e,r),t=es(null,t,a,!0,s,r)):(t.tag=0,q&&s&&Is(t),ue(null,t,i,r),t=t.child),t;case 16:a=t.elementType;e:{switch(Vn(e,t),e=t.pendingProps,i=a._init,a=i(a._payload),t.type=a,i=t.tag=Um(a),e=Oe(a,e),i){case 0:t=Zi(null,t,a,e,r);break e;case 1:t=ho(null,t,a,e,r);break e;case 11:t=po(null,t,a,e,r);break e;case 14:t=mo(null,t,a,Oe(a.type,e),r);break e}throw Error(T(306,a,""))}return t;case 0:return a=t.type,i=t.pendingProps,i=t.elementType===a?i:Oe(a,i),Zi(e,t,a,i,r);case 1:return a=t.type,i=t.pendingProps,i=t.elementType===a?i:Oe(a,i),ho(e,t,a,i,r);case 3:e:{if(Td(t),e===null)throw Error(T(387));a=t.pendingProps,s=t.memoizedState,i=s.element,Xc(e,t),ya(t,a,null,r);var l=t.memoizedState;if(a=l.element,s.isDehydrated)if(s={element:a,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=vr(Error(T(423)),t),t=yo(e,t,a,r,i);break e}else if(a!==i){i=vr(Error(T(424)),t),t=yo(e,t,a,r,i);break e}else for(we=kt(t.stateNode.containerInfo.firstChild),Se=t,q=!0,Ue=null,r=Yc(t,null,a,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(gr(),a===i){t=st(e,t,r);break e}ue(e,t,a,r)}t=t.child}return t;case 5:return Zc(t),e===null&&Vi(t),a=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,l=i.children,qi(a,i)?l=null:s!==null&&qi(a,s)&&(t.flags|=32),Ed(e,t),ue(e,t,l,r),t.child;case 6:return e===null&&Vi(t),null;case 13:return Nd(e,t,r);case 4:return Hs(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=fr(t,null,a,r):ue(e,t,a,r),t.child;case 11:return a=t.type,i=t.pendingProps,i=t.elementType===a?i:Oe(a,i),po(e,t,a,i,r);case 7:return ue(e,t,t.pendingProps,r),t.child;case 8:return ue(e,t,t.pendingProps.children,r),t.child;case 12:return ue(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(a=t.type._context,i=t.pendingProps,s=t.memoizedProps,l=i.value,M(ma,a._currentValue),a._currentValue=l,s!==null)if(He(s.value,l)){if(s.children===i.children&&!xe.current){t=st(e,t,r);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var o=s.dependencies;if(o!==null){l=s.child;for(var c=o.firstContext;c!==null;){if(c.context===a){if(s.tag===1){c=rt(-1,r&-r),c.tag=2;var d=s.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?c.next=c:(c.next=h.next,h.next=c),d.pending=c}}s.lanes|=r,c=s.alternate,c!==null&&(c.lanes|=r),Ki(s.return,r,t),o.lanes|=r;break}c=c.next}}else if(s.tag===10)l=s.type===t.type?null:s.child;else if(s.tag===18){if(l=s.return,l===null)throw Error(T(341));l.lanes|=r,o=l.alternate,o!==null&&(o.lanes|=r),Ki(l,r,t),l=s.sibling}else l=s.child;if(l!==null)l.return=s;else for(l=s;l!==null;){if(l===t){l=null;break}if(s=l.sibling,s!==null){s.return=l.return,l=s;break}l=l.return}s=l}ue(e,t,i.children,r),t=t.child}return t;case 9:return i=t.type,a=t.pendingProps.children,pr(t,r),i=_e(i),a=a(i),t.flags|=1,ue(e,t,a,r),t.child;case 14:return a=t.type,i=Oe(a,t.pendingProps),i=Oe(a.type,i),mo(e,t,a,i,r);case 15:return wd(e,t,t.type,t.pendingProps,r);case 17:return a=t.type,i=t.pendingProps,i=t.elementType===a?i:Oe(a,i),Vn(e,t),t.tag=1,ve(a)?(e=!0,da(t)):e=!1,pr(t,r),vd(t,a,i),Qi(t,a,i,r),es(null,t,a,!0,e,r);case 19:return jd(e,t,r);case 22:return Sd(e,t,r)}throw Error(T(156,t.tag))};function qd(e,t){return gc(e,t)}function zm(e,t,r,a){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ce(e,t,r,a){return new zm(e,t,r,a)}function nl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Um(e){if(typeof e=="function")return nl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ws)return 11;if(e===Ss)return 14}return 2}function Tt(e,t){var r=e.alternate;return r===null?(r=Ce(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Qn(e,t,r,a,i,s){var l=2;if(a=e,typeof e=="function")nl(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Qt:return Ut(r.children,i,s,t);case ks:l=8,i|=8;break;case ki:return e=Ce(12,r,t,i|2),e.elementType=ki,e.lanes=s,e;case wi:return e=Ce(13,r,t,i),e.elementType=wi,e.lanes=s,e;case Si:return e=Ce(19,r,t,i),e.elementType=Si,e.lanes=s,e;case Zo:return za(r,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Qo:l=10;break e;case Xo:l=9;break e;case ws:l=11;break e;case Ss:l=14;break e;case pt:l=16,a=null;break e}throw Error(T(130,e==null?e:typeof e,""))}return t=Ce(l,r,t,i),t.elementType=e,t.type=a,t.lanes=s,t}function Ut(e,t,r,a){return e=Ce(7,e,a,t),e.lanes=r,e}function za(e,t,r,a){return e=Ce(22,e,a,t),e.elementType=Zo,e.lanes=r,e.stateNode={isHidden:!1},e}function yi(e,t,r){return e=Ce(6,e,null,t),e.lanes=r,e}function gi(e,t,r){return t=Ce(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Bm(e,t,r,a,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ya(0),this.expirationTimes=Ya(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ya(0),this.identifierPrefix=a,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function al(e,t,r,a,i,s,l,o,c){return e=new Bm(e,t,r,o,c),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Ce(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:a,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fs(s),e}function Mm(e,t,r){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Yt,key:a==null?null:""+a,children:e,containerInfo:t,implementation:r}}function $d(e){if(!e)return jt;e=e._reactInternals;e:{if(Wt(e)!==e||e.tag!==1)throw Error(T(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(T(171))}if(e.tag===1){var r=e.type;if(ve(r))return $c(e,r,t)}return t}function Wd(e,t,r,a,i,s,l,o,c){return e=al(r,a,!0,e,i,s,l,o,c),e.context=$d(null),r=e.current,a=pe(),i=Et(r),s=rt(a,i),s.callback=t??null,wt(r,s,i),e.current.lanes=i,hn(e,i,a),be(e,a),e}function Ua(e,t,r,a){var i=t.current,s=pe(),l=Et(i);return r=$d(r),t.context===null?t.context=r:t.pendingContext=r,t=rt(s,l),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=wt(i,t,l),e!==null&&(Me(e,i,l,s),Wn(e,i,l)),l}function Sa(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function To(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function il(e,t){To(e,t),(e=e.alternate)&&To(e,t)}function Fm(){return null}var Jd=typeof reportError=="function"?reportError:function(e){console.error(e)};function sl(e){this._internalRoot=e}Ba.prototype.render=sl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(T(409));Ua(e,t,null,null)};Ba.prototype.unmount=sl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;qt(function(){Ua(null,e,null,null)}),t[at]=null}};function Ba(e){this._internalRoot=e}Ba.prototype.unstable_scheduleHydration=function(e){if(e){var t=Sc();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ht.length&&t!==0&&t<ht[r].priority;r++);ht.splice(r,0,e),r===0&&Tc(e)}};function ll(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ma(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function No(){}function Hm(e,t,r,a,i){if(i){if(typeof a=="function"){var s=a;a=function(){var d=Sa(l);s.call(d)}}var l=Wd(t,a,e,0,null,!1,!1,"",No);return e._reactRootContainer=l,e[at]=l.current,rn(e.nodeType===8?e.parentNode:e),qt(),l}for(;i=e.lastChild;)e.removeChild(i);if(typeof a=="function"){var o=a;a=function(){var d=Sa(c);o.call(d)}}var c=al(e,0,!1,null,null,!1,!1,"",No);return e._reactRootContainer=c,e[at]=c.current,rn(e.nodeType===8?e.parentNode:e),qt(function(){Ua(t,c,r,a)}),c}function Fa(e,t,r,a,i){var s=r._reactRootContainer;if(s){var l=s;if(typeof i=="function"){var o=i;i=function(){var c=Sa(l);o.call(c)}}Ua(t,l,e,i)}else l=Hm(r,t,e,i,a);return Sa(l)}kc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=zr(t.pendingLanes);r!==0&&(Ns(t,r|1),be(t,Y()),!(O&6)&&(br=Y()+500,Rt()))}break;case 13:qt(function(){var a=it(e,1);if(a!==null){var i=pe();Me(a,e,1,i)}}),il(e,1)}};js=function(e){if(e.tag===13){var t=it(e,134217728);if(t!==null){var r=pe();Me(t,e,134217728,r)}il(e,134217728)}};wc=function(e){if(e.tag===13){var t=Et(e),r=it(e,t);if(r!==null){var a=pe();Me(r,e,t,a)}il(e,t)}};Sc=function(){return z};Ec=function(e,t){var r=z;try{return z=e,t()}finally{z=r}};Li=function(e,t,r){switch(t){case"input":if(Ni(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var a=r[t];if(a!==e&&a.form===e.form){var i=_a(a);if(!i)throw Error(T(90));tc(a),Ni(a,i)}}}break;case"textarea":nc(e,r);break;case"select":t=r.value,t!=null&&or(e,!!r.multiple,t,!1)}};dc=el;uc=qt;var qm={usingClientEntryPoint:!1,Events:[gn,tr,_a,oc,cc,el]},Lr={findFiberByHostInstance:It,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},$m={bundleType:Lr.bundleType,version:Lr.version,rendererPackageName:Lr.rendererPackageName,rendererConfig:Lr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ot.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=hc(e),e===null?null:e.stateNode},findFiberByHostInstance:Lr.findFiberByHostInstance||Fm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Un=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Un.isDisabled&&Un.supportsFiber)try{ja=Un.inject($m),Ve=Un}catch{}}Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=qm;Te.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ll(t))throw Error(T(200));return Mm(e,t,null,r)};Te.createRoot=function(e,t){if(!ll(e))throw Error(T(299));var r=!1,a="",i=Jd;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=al(e,1,!1,null,null,r,!1,a,i),e[at]=t.current,rn(e.nodeType===8?e.parentNode:e),new sl(t)};Te.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(T(188)):(e=Object.keys(e).join(","),Error(T(268,e)));return e=hc(t),e=e===null?null:e.stateNode,e};Te.flushSync=function(e){return qt(e)};Te.hydrate=function(e,t,r){if(!Ma(t))throw Error(T(200));return Fa(null,e,t,!0,r)};Te.hydrateRoot=function(e,t,r){if(!ll(e))throw Error(T(405));var a=r!=null&&r.hydratedSources||null,i=!1,s="",l=Jd;if(r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(s=r.identifierPrefix),r.onRecoverableError!==void 0&&(l=r.onRecoverableError)),t=Wd(t,null,e,1,r??null,i,!1,s,l),e[at]=t.current,rn(e),a)for(e=0;e<a.length;e++)r=a[e],i=r._getVersion,i=i(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,i]:t.mutableSourceEagerHydrationData.push(r,i);return new Ba(t)};Te.render=function(e,t,r){if(!Ma(t))throw Error(T(200));return Fa(null,e,t,!1,r)};Te.unmountComponentAtNode=function(e){if(!Ma(e))throw Error(T(40));return e._reactRootContainer?(qt(function(){Fa(null,null,e,!1,function(){e._reactRootContainer=null,e[at]=null})}),!0):!1};Te.unstable_batchedUpdates=el;Te.unstable_renderSubtreeIntoContainer=function(e,t,r,a){if(!Ma(r))throw Error(T(200));if(e==null||e._reactInternals===void 0)throw Error(T(38));return Fa(e,t,r,!1,a)};Te.version="18.3.1-next-f1338f8080-20240426";function Gd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gd)}catch(e){console.error(e)}}Gd(),Go.exports=Te;var Wm=Go.exports,Vd,jo=Wm;Vd=jo.createRoot,jo.hydrateRoot;/**
 * react-router v7.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Po="popstate";function Co(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function Jm(e={}){function t(i,s){let{pathname:l="/",search:o="",hash:c=""}=Jt(i.location.hash.substring(1));return!l.startsWith("/")&&!l.startsWith(".")&&(l="/"+l),ps("",{pathname:l,search:o,hash:c},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function r(i,s){let l=i.document.querySelector("base"),o="";if(l&&l.getAttribute("href")){let c=i.location.href,d=c.indexOf("#");o=d===-1?c:c.slice(0,d)}return o+"#"+(typeof s=="string"?s:pn(s))}function a(i,s){qe(i.pathname.charAt(0)==="/",`relative pathnames are not supported in hash history.push(${JSON.stringify(s)})`)}return Vm(t,r,a,e)}function G(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function qe(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Gm(){return Math.random().toString(36).substring(2,10)}function Ro(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ps(e,t,r=null,a,i){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Jt(t):t,state:r,key:t&&t.key||a||Gm(),mask:i}}function pn({pathname:e="/",search:t="",hash:r=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Jt(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let a=e.indexOf("?");a>=0&&(t.search=e.substring(a),e=e.substring(0,a)),e&&(t.pathname=e)}return t}function Vm(e,t,r,a={}){let{window:i=document.defaultView,v5Compat:s=!1}=a,l=i.history,o="POP",c=null,d=h();d==null&&(d=0,l.replaceState({...l.state,idx:d},""));function h(){return(l.state||{idx:null}).idx}function m(){o="POP";let b=h(),p=b==null?null:b-d;d=b,c&&c({action:o,location:x.location,delta:p})}function f(b,p){o="PUSH";let u=Co(b)?b:ps(x.location,b,p);r&&r(u,b),d=h()+1;let g=Ro(u,d),w=x.createHref(u.mask||u);try{l.pushState(g,"",w)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;i.location.assign(w)}s&&c&&c({action:o,location:x.location,delta:1})}function y(b,p){o="REPLACE";let u=Co(b)?b:ps(x.location,b,p);r&&r(u,b),d=h();let g=Ro(u,d),w=x.createHref(u.mask||u);l.replaceState(g,"",w),s&&c&&c({action:o,location:x.location,delta:0})}function k(b){return Km(i,b)}let x={get action(){return o},get location(){return e(i,l)},listen(b){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(Po,m),c=b,()=>{i.removeEventListener(Po,m),c=null}},createHref(b){return t(i,b)},createURL:k,encodeLocation(b){let p=k(b);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:f,replace:y,go(b){return l.go(b)}};return x}function Km(e,t,r=!1){let a="http://localhost";e&&(a=e.location.origin!=="null"?e.location.origin:e.location.href),G(a,"No window.location.(origin|href) available to create URL");let i=typeof t=="string"?t:pn(t);return i=i.replace(/ $/,"%20"),!r&&i.startsWith("//")&&(i=a+i),new URL(i,a)}function Kd(e,t,r="/"){return Ym(e,t,r,!1)}function Ym(e,t,r,a,i){let s=typeof t=="string"?Jt(t):t,l=lt(s.pathname||"/",r);if(l==null)return null;let o=Qm(e),c=null,d=ch(l);for(let h=0;c==null&&h<o.length;++h)c=lh(o[h],d,a);return c}function Qm(e){let t=Yd(e);return Xm(t),t}function Yd(e,t=[],r=[],a="",i=!1){let s=(l,o,c=i,d)=>{let h={relativePath:d===void 0?l.path||"":d,caseSensitive:l.caseSensitive===!0,childrenIndex:o,route:l};if(h.relativePath.startsWith("/")){if(!h.relativePath.startsWith(a)&&c)return;G(h.relativePath.startsWith(a),`Absolute route path "${h.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),h.relativePath=h.relativePath.slice(a.length)}let m=Fe([a,h.relativePath]),f=r.concat(h);l.children&&l.children.length>0&&(G(l.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${m}".`),Yd(l.children,t,f,m,c)),!(l.path==null&&!l.index)&&t.push({path:m,score:ih(m,l.index),routesMeta:f})};return e.forEach((l,o)=>{var c;if(l.path===""||!((c=l.path)!=null&&c.includes("?")))s(l,o);else for(let d of Qd(l.path))s(l,o,!0,d)}),t}function Qd(e){let t=e.split("/");if(t.length===0)return[];let[r,...a]=t,i=r.endsWith("?"),s=r.replace(/\?$/,"");if(a.length===0)return i?[s,""]:[s];let l=Qd(a.join("/")),o=[];return o.push(...l.map(c=>c===""?s:[s,c].join("/"))),i&&o.push(...l),o.map(c=>e.startsWith("/")&&c===""?"/":c)}function Xm(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:sh(t.routesMeta.map(a=>a.childrenIndex),r.routesMeta.map(a=>a.childrenIndex)))}var Zm=/^:[\w-]+$/,eh=3,th=2,rh=1,nh=10,ah=-2,_o=e=>e==="*";function ih(e,t){let r=e.split("/"),a=r.length;return r.some(_o)&&(a+=ah),t&&(a+=th),r.filter(i=>!_o(i)).reduce((i,s)=>i+(Zm.test(s)?eh:s===""?rh:nh),a)}function sh(e,t){return e.length===t.length&&e.slice(0,-1).every((a,i)=>a===t[i])?e[e.length-1]-t[t.length-1]:0}function lh(e,t,r=!1){let{routesMeta:a}=e,i={},s="/",l=[];for(let o=0;o<a.length;++o){let c=a[o],d=o===a.length-1,h=s==="/"?t:t.slice(s.length)||"/",m=Ea({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},h),f=c.route;if(!m&&d&&r&&!a[a.length-1].route.index&&(m=Ea({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},h)),!m)return null;Object.assign(i,m.params),l.push({params:i,pathname:Fe([s,m.pathname]),pathnameBase:mh(Fe([s,m.pathnameBase])),route:f}),m.pathnameBase!=="/"&&(s=Fe([s,m.pathnameBase]))}return l}function Ea(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,a]=oh(e.path,e.caseSensitive,e.end),i=t.match(r);if(!i)return null;let s=i[0],l=s.replace(/(.)\/+$/,"$1"),o=i.slice(1);return{params:a.reduce((d,{paramName:h,isOptional:m},f)=>{if(h==="*"){let k=o[f]||"";l=s.slice(0,s.length-k.length).replace(/(.)\/+$/,"$1")}const y=o[f];return m&&!y?d[h]=void 0:d[h]=(y||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:l,pattern:e}}function oh(e,t=!1,r=!0){qe(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let a=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,o,c,d,h)=>{if(a.push({paramName:o,isOptional:c!=null}),c){let m=h.charAt(d+l.length);return m&&m!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(a.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),a]}function ch(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return qe(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function lt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,a=e.charAt(r);return a&&a!=="/"?null:e.slice(r)||"/"}var dh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function uh(e,t="/"){let{pathname:r,search:a="",hash:i=""}=typeof e=="string"?Jt(e):e,s;return r?(r=Zd(r),r.startsWith("/")?s=Ao(r.substring(1),"/"):s=Ao(r,t)):s=t,{pathname:s,search:hh(a),hash:yh(i)}}function Ao(e,t){let r=Ta(t).split("/");return e.split("/").forEach(i=>{i===".."?r.length>1&&r.pop():i!=="."&&r.push(i)}),r.length>1?r.join("/"):"/"}function fi(e,t,r,a){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ph(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Xd(e){let t=ph(e);return t.map((r,a)=>a===t.length-1?r.pathname:r.pathnameBase)}function ol(e,t,r,a=!1){let i;typeof e=="string"?i=Jt(e):(i={...e},G(!i.pathname||!i.pathname.includes("?"),fi("?","pathname","search",i)),G(!i.pathname||!i.pathname.includes("#"),fi("#","pathname","hash",i)),G(!i.search||!i.search.includes("#"),fi("#","search","hash",i)));let s=e===""||i.pathname==="",l=s?"/":i.pathname,o;if(l==null)o=r;else{let m=t.length-1;if(!a&&l.startsWith("..")){let f=l.split("/");for(;f[0]==="..";)f.shift(),m-=1;i.pathname=f.join("/")}o=m>=0?t[m]:"/"}let c=uh(i,o),d=l&&l!=="/"&&l.endsWith("/"),h=(s||l===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||h)&&(c.pathname+="/"),c}var Zd=e=>e.replace(/\/\/+/g,"/"),Fe=e=>Zd(e.join("/")),Ta=e=>e.replace(/\/+$/,""),mh=e=>Ta(e).replace(/^\/*/,"/"),hh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,yh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,gh=class{constructor(e,t,r,a=!1){this.status=e,this.statusText=t||"",this.internal=a,r instanceof Error?(this.data=r.toString(),this.error=r):this.data=r}};function fh(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function xh(e){let t=e.map(r=>r.route.path).filter(Boolean);return Fe(t)||"/"}var eu=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function tu(e,t){let r=e;if(typeof r!="string"||!dh.test(r))return{absoluteURL:void 0,isExternal:!1,to:r};let a=r,i=!1;if(eu)try{let s=new URL(window.location.href),l=r.startsWith("//")?new URL(s.protocol+r):new URL(r),o=lt(l.pathname,t);l.origin===s.origin&&o!=null?r=o+l.search+l.hash:i=!0}catch{qe(!1,`<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:a,isExternal:i,to:r}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var ru=["POST","PUT","PATCH","DELETE"];new Set(ru);var vh=["GET",...ru];new Set(vh);var Er=v.createContext(null);Er.displayName="DataRouter";var Ha=v.createContext(null);Ha.displayName="DataRouterState";var nu=v.createContext(!1);function bh(){return v.useContext(nu)}var au=v.createContext({isTransitioning:!1});au.displayName="ViewTransition";var kh=v.createContext(new Map);kh.displayName="Fetchers";var wh=v.createContext(null);wh.displayName="Await";var Le=v.createContext(null);Le.displayName="Navigation";var xn=v.createContext(null);xn.displayName="Location";var ct=v.createContext({outlet:null,matches:[],isDataRoute:!1});ct.displayName="Route";var cl=v.createContext(null);cl.displayName="RouteError";var iu="REACT_ROUTER_ERROR",Sh="REDIRECT",Eh="ROUTE_ERROR_RESPONSE";function Th(e){if(e.startsWith(`${iu}:${Sh}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function Nh(e){if(e.startsWith(`${iu}:${Eh}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new gh(t.status,t.statusText,t.data)}catch{}}function jh(e,{relative:t}={}){G(vn(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:a}=v.useContext(Le),{hash:i,pathname:s,search:l}=bn(e,{relative:t}),o=s;return r!=="/"&&(o=s==="/"?r:Fe([r,s])),a.createHref({pathname:o,search:l,hash:i})}function vn(){return v.useContext(xn)!=null}function dt(){return G(vn(),"useLocation() may be used only in the context of a <Router> component."),v.useContext(xn).location}var su="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function lu(e){v.useContext(Le).static||v.useLayoutEffect(e)}function dl(){let{isDataRoute:e}=v.useContext(ct);return e?Mh():Ph()}function Ph(){G(vn(),"useNavigate() may be used only in the context of a <Router> component.");let e=v.useContext(Er),{basename:t,navigator:r}=v.useContext(Le),{matches:a}=v.useContext(ct),{pathname:i}=dt(),s=JSON.stringify(Xd(a)),l=v.useRef(!1);return lu(()=>{l.current=!0}),v.useCallback((c,d={})=>{if(qe(l.current,su),!l.current)return;if(typeof c=="number"){r.go(c);return}let h=ol(c,JSON.parse(s),i,d.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:Fe([t,h.pathname])),(d.replace?r.replace:r.push)(h,d.state,d)},[t,r,s,i,e])}v.createContext(null);function bn(e,{relative:t}={}){let{matches:r}=v.useContext(ct),{pathname:a}=dt(),i=JSON.stringify(Xd(r));return v.useMemo(()=>ol(e,JSON.parse(i),a,t==="path"),[e,i,a,t])}function Ch(e,t){return ou(e,t)}function ou(e,t,r){var b;G(vn(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=v.useContext(Le),{matches:i}=v.useContext(ct),s=i[i.length-1],l=s?s.params:{},o=s?s.pathname:"/",c=s?s.pathnameBase:"/",d=s&&s.route;{let p=d&&d.path||"";du(o,!d||p.endsWith("*")||p.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${o}" (under <Route path="${p}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${p}"> to <Route path="${p==="/"?"*":`${p}/*`}">.`)}let h=dt(),m;if(t){let p=typeof t=="string"?Jt(t):t;G(c==="/"||((b=p.pathname)==null?void 0:b.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${p.pathname}" was given in the \`location\` prop.`),m=p}else m=h;let f=m.pathname||"/",y=f;if(c!=="/"){let p=c.replace(/^\//,"").split("/");y="/"+f.replace(/^\//,"").split("/").slice(p.length).join("/")}let k=r&&r.state.matches.length?r.state.matches.map(p=>Object.assign(p,{route:r.manifest[p.route.id]||p.route})):Kd(e,{pathname:y});qe(d||k!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),qe(k==null||k[k.length-1].route.element!==void 0||k[k.length-1].route.Component!==void 0||k[k.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let x=Ih(k&&k.map(p=>Object.assign({},p,{params:Object.assign({},l,p.params),pathname:Fe([c,a.encodeLocation?a.encodeLocation(p.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?c:Fe([c,a.encodeLocation?a.encodeLocation(p.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathnameBase])})),i,r);return t&&x?v.createElement(xn.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...m},navigationType:"POP"}},x):x}function Rh(){let e=Bh(),t=fh(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:a},s={padding:"2px 4px",backgroundColor:a},l=null;return console.error("Error handled by React Router default ErrorBoundary:",e),l=v.createElement(v.Fragment,null,v.createElement("p",null,"💿 Hey developer 👋"),v.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",v.createElement("code",{style:s},"ErrorBoundary")," or"," ",v.createElement("code",{style:s},"errorElement")," prop on your route.")),v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),r?v.createElement("pre",{style:i},r):null,l)}var _h=v.createElement(Rh,null),cu=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const r=Nh(e.digest);r&&(e=r)}let t=e!==void 0?v.createElement(ct.Provider,{value:this.props.routeContext},v.createElement(cl.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?v.createElement(Ah,{error:e},t):t}};cu.contextType=nu;var xi=new WeakMap;function Ah({children:e,error:t}){let{basename:r}=v.useContext(Le);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let a=Th(t.digest);if(a){let i=xi.get(t);if(i)throw i;let s=tu(a.location,r);if(eu&&!xi.get(t))if(s.isExternal||a.reloadDocument)window.location.href=s.absoluteURL||s.to;else{const l=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:a.replace}));throw xi.set(t,l),l}return v.createElement("meta",{httpEquiv:"refresh",content:`0;url=${s.absoluteURL||s.to}`})}}return e}function Lh({routeContext:e,match:t,children:r}){let a=v.useContext(Er);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),v.createElement(ct.Provider,{value:e},r)}function Ih(e,t=[],r){let a=r==null?void 0:r.state;if(e==null){if(!a)return null;if(a.errors)e=a.matches;else if(t.length===0&&!a.initialized&&a.matches.length>0)e=a.matches;else return null}let i=e,s=a==null?void 0:a.errors;if(s!=null){let h=i.findIndex(m=>m.route.id&&(s==null?void 0:s[m.route.id])!==void 0);G(h>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),i=i.slice(0,Math.min(i.length,h+1))}let l=!1,o=-1;if(r&&a){l=a.renderFallback;for(let h=0;h<i.length;h++){let m=i[h];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(o=h),m.route.id){let{loaderData:f,errors:y}=a,k=m.route.loader&&!f.hasOwnProperty(m.route.id)&&(!y||y[m.route.id]===void 0);if(m.route.lazy||k){r.isStatic&&(l=!0),o>=0?i=i.slice(0,o+1):i=[i[0]];break}}}}let c=r==null?void 0:r.onError,d=a&&c?(h,m)=>{var f,y;c(h,{location:a.location,params:((y=(f=a.matches)==null?void 0:f[0])==null?void 0:y.params)??{},pattern:xh(a.matches),errorInfo:m})}:void 0;return i.reduceRight((h,m,f)=>{let y,k=!1,x=null,b=null;a&&(y=s&&m.route.id?s[m.route.id]:void 0,x=m.route.errorElement||_h,l&&(o<0&&f===0?(du("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),k=!0,b=null):o===f&&(k=!0,b=m.route.hydrateFallbackElement||null)));let p=t.concat(i.slice(0,f+1)),u=()=>{let g;return y?g=x:k?g=b:m.route.Component?g=v.createElement(m.route.Component,null):m.route.element?g=m.route.element:g=h,v.createElement(Lh,{match:m,routeContext:{outlet:h,matches:p,isDataRoute:a!=null},children:g})};return a&&(m.route.ErrorBoundary||m.route.errorElement||f===0)?v.createElement(cu,{location:a.location,revalidation:a.revalidation,component:x,error:y,children:u(),routeContext:{outlet:null,matches:p,isDataRoute:!0},onError:d}):u()},null)}function ul(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Dh(e){let t=v.useContext(Er);return G(t,ul(e)),t}function Oh(e){let t=v.useContext(Ha);return G(t,ul(e)),t}function zh(e){let t=v.useContext(ct);return G(t,ul(e)),t}function pl(e){let t=zh(e),r=t.matches[t.matches.length-1];return G(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function Uh(){return pl("useRouteId")}function Bh(){var a;let e=v.useContext(cl),t=Oh("useRouteError"),r=pl("useRouteError");return e!==void 0?e:(a=t.errors)==null?void 0:a[r]}function Mh(){let{router:e}=Dh("useNavigate"),t=pl("useNavigate"),r=v.useRef(!1);return lu(()=>{r.current=!0}),v.useCallback(async(i,s={})=>{qe(r.current,su),r.current&&(typeof i=="number"?await e.navigate(i):await e.navigate(i,{fromRouteId:t,...s}))},[e,t])}var Lo={};function du(e,t,r){!t&&!Lo[e]&&(Lo[e]=!0,qe(!1,r))}v.memo(Fh);function Fh({routes:e,manifest:t,future:r,state:a,isStatic:i,onError:s}){return ou(e,void 0,{manifest:t,state:a,isStatic:i,onError:s})}function Kt(e){G(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Hh({basename:e="/",children:t=null,location:r,navigationType:a="POP",navigator:i,static:s=!1,useTransitions:l}){G(!vn(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=e.replace(/^\/*/,"/"),c=v.useMemo(()=>({basename:o,navigator:i,static:s,useTransitions:l,future:{}}),[o,i,s,l]);typeof r=="string"&&(r=Jt(r));let{pathname:d="/",search:h="",hash:m="",state:f=null,key:y="default",mask:k}=r,x=v.useMemo(()=>{let b=lt(d,o);return b==null?null:{location:{pathname:b,search:h,hash:m,state:f,key:y,mask:k},navigationType:a}},[o,d,h,m,f,y,a,k]);return qe(x!=null,`<Router basename="${o}"> is not able to match the URL "${d}${h}${m}" because it does not start with the basename, so the <Router> won't render anything.`),x==null?null:v.createElement(Le.Provider,{value:c},v.createElement(xn.Provider,{children:t,value:x}))}function qh({children:e,location:t}){return Ch(ms(e),t)}function ms(e,t=[]){let r=[];return v.Children.forEach(e,(a,i)=>{if(!v.isValidElement(a))return;let s=[...t,i];if(a.type===v.Fragment){r.push.apply(r,ms(a.props.children,s));return}G(a.type===Kt,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),G(!a.props.index||!a.props.children,"An index route cannot have child routes.");let l={id:a.props.id||s.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,middleware:a.props.middleware,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(l.children=ms(a.props.children,s)),r.push(l)}),r}var Xn="get",Zn="application/x-www-form-urlencoded";function qa(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function $h(e){return qa(e)&&e.tagName.toLowerCase()==="button"}function Wh(e){return qa(e)&&e.tagName.toLowerCase()==="form"}function Jh(e){return qa(e)&&e.tagName.toLowerCase()==="input"}function Gh(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Vh(e,t){return e.button===0&&(!t||t==="_self")&&!Gh(e)}var Bn=null;function Kh(){if(Bn===null)try{new FormData(document.createElement("form"),0),Bn=!1}catch{Bn=!0}return Bn}var Yh=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function vi(e){return e!=null&&!Yh.has(e)?(qe(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Zn}"`),null):e}function Qh(e,t){let r,a,i,s,l;if(Wh(e)){let o=e.getAttribute("action");a=o?lt(o,t):null,r=e.getAttribute("method")||Xn,i=vi(e.getAttribute("enctype"))||Zn,s=new FormData(e)}else if($h(e)||Jh(e)&&(e.type==="submit"||e.type==="image")){let o=e.form;if(o==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||o.getAttribute("action");if(a=c?lt(c,t):null,r=e.getAttribute("formmethod")||o.getAttribute("method")||Xn,i=vi(e.getAttribute("formenctype"))||vi(o.getAttribute("enctype"))||Zn,s=new FormData(o,e),!Kh()){let{name:d,type:h,value:m}=e;if(h==="image"){let f=d?`${d}.`:"";s.append(`${f}x`,"0"),s.append(`${f}y`,"0")}else d&&s.append(d,m)}}else{if(qa(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Xn,a=null,i=Zn,l=e}return s&&i==="text/plain"&&(l=s,s=void 0),{action:a,method:r.toLowerCase(),encType:i,formData:s,body:l}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function ml(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function uu(e,t,r,a){let i=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r?i.pathname.endsWith("/")?i.pathname=`${i.pathname}_.${a}`:i.pathname=`${i.pathname}.${a}`:i.pathname==="/"?i.pathname=`_root.${a}`:t&&lt(i.pathname,t)==="/"?i.pathname=`${Ta(t)}/_root.${a}`:i.pathname=`${Ta(i.pathname)}.${a}`,i}async function Xh(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Zh(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function ey(e,t,r){let a=await Promise.all(e.map(async i=>{let s=t.routes[i.route.id];if(s){let l=await Xh(s,r);return l.links?l.links():[]}return[]}));return ay(a.flat(1).filter(Zh).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function Io(e,t,r,a,i,s){let l=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,o=(c,d)=>{var h;return r[d].pathname!==c.pathname||((h=r[d].route.path)==null?void 0:h.endsWith("*"))&&r[d].params["*"]!==c.params["*"]};return s==="assets"?t.filter((c,d)=>l(c,d)||o(c,d)):s==="data"?t.filter((c,d)=>{var m;let h=a.routes[c.route.id];if(!h||!h.hasLoader)return!1;if(l(c,d)||o(c,d))return!0;if(c.route.shouldRevalidate){let f=c.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((m=r[0])==null?void 0:m.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof f=="boolean")return f}return!0}):[]}function ty(e,t,{includeHydrateFallback:r}={}){return ry(e.map(a=>{let i=t.routes[a.route.id];if(!i)return[];let s=[i.module];return i.clientActionModule&&(s=s.concat(i.clientActionModule)),i.clientLoaderModule&&(s=s.concat(i.clientLoaderModule)),r&&i.hydrateFallbackModule&&(s=s.concat(i.hydrateFallbackModule)),i.imports&&(s=s.concat(i.imports)),s}).flat(1))}function ry(e){return[...new Set(e)]}function ny(e){let t={},r=Object.keys(e).sort();for(let a of r)t[a]=e[a];return t}function ay(e,t){let r=new Set;return new Set(t),e.reduce((a,i)=>{let s=JSON.stringify(ny(i));return r.has(s)||(r.add(s),a.push({key:s,link:i})),a},[])}function hl(){let e=v.useContext(Er);return ml(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function iy(){let e=v.useContext(Ha);return ml(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var yl=v.createContext(void 0);yl.displayName="FrameworkContext";function gl(){let e=v.useContext(yl);return ml(e,"You must render this element inside a <HydratedRouter> element"),e}function sy(e,t){let r=v.useContext(yl),[a,i]=v.useState(!1),[s,l]=v.useState(!1),{onFocus:o,onBlur:c,onMouseEnter:d,onMouseLeave:h,onTouchStart:m}=t,f=v.useRef(null);v.useEffect(()=>{if(e==="render"&&l(!0),e==="viewport"){let x=p=>{p.forEach(u=>{l(u.isIntersecting)})},b=new IntersectionObserver(x,{threshold:.5});return f.current&&b.observe(f.current),()=>{b.disconnect()}}},[e]),v.useEffect(()=>{if(a){let x=setTimeout(()=>{l(!0)},100);return()=>{clearTimeout(x)}}},[a]);let y=()=>{i(!0)},k=()=>{i(!1),l(!1)};return r?e!=="intent"?[s,f,{}]:[s,f,{onFocus:Ir(o,y),onBlur:Ir(c,k),onMouseEnter:Ir(d,y),onMouseLeave:Ir(h,k),onTouchStart:Ir(m,y)}]:[!1,f,{}]}function Ir(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function ly({page:e,...t}){let r=bh(),{router:a}=hl(),i=v.useMemo(()=>Kd(a.routes,e,a.basename),[a.routes,e,a.basename]);return i?r?v.createElement(cy,{page:e,matches:i,...t}):v.createElement(dy,{page:e,matches:i,...t}):null}function oy(e){let{manifest:t,routeModules:r}=gl(),[a,i]=v.useState([]);return v.useEffect(()=>{let s=!1;return ey(e,t,r).then(l=>{s||i(l)}),()=>{s=!0}},[e,t,r]),a}function cy({page:e,matches:t,...r}){let a=dt(),{future:i}=gl(),{basename:s}=hl(),l=v.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let o=uu(e,s,i.v8_trailingSlashAwareDataRequests,"rsc"),c=!1,d=[];for(let h of t)typeof h.route.shouldRevalidate=="function"?c=!0:d.push(h.route.id);return c&&d.length>0&&o.searchParams.set("_routes",d.join(",")),[o.pathname+o.search]},[s,i.v8_trailingSlashAwareDataRequests,e,a,t]);return v.createElement(v.Fragment,null,l.map(o=>v.createElement("link",{key:o,rel:"prefetch",as:"fetch",href:o,...r})))}function dy({page:e,matches:t,...r}){let a=dt(),{future:i,manifest:s,routeModules:l}=gl(),{basename:o}=hl(),{loaderData:c,matches:d}=iy(),h=v.useMemo(()=>Io(e,t,d,s,a,"data"),[e,t,d,s,a]),m=v.useMemo(()=>Io(e,t,d,s,a,"assets"),[e,t,d,s,a]),f=v.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let x=new Set,b=!1;if(t.forEach(u=>{var w;let g=s.routes[u.route.id];!g||!g.hasLoader||(!h.some(S=>S.route.id===u.route.id)&&u.route.id in c&&((w=l[u.route.id])!=null&&w.shouldRevalidate)||g.hasClientLoader?b=!0:x.add(u.route.id))}),x.size===0)return[];let p=uu(e,o,i.v8_trailingSlashAwareDataRequests,"data");return b&&x.size>0&&p.searchParams.set("_routes",t.filter(u=>x.has(u.route.id)).map(u=>u.route.id).join(",")),[p.pathname+p.search]},[o,i.v8_trailingSlashAwareDataRequests,c,a,s,h,t,e,l]),y=v.useMemo(()=>ty(m,s),[m,s]),k=oy(m);return v.createElement(v.Fragment,null,f.map(x=>v.createElement("link",{key:x,rel:"prefetch",as:"fetch",href:x,...r})),y.map(x=>v.createElement("link",{key:x,rel:"modulepreload",href:x,...r})),k.map(({key:x,link:b})=>v.createElement("link",{key:x,nonce:r.nonce,...b,crossOrigin:b.crossOrigin??r.crossOrigin})))}function uy(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}var py=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{py&&(window.__reactRouterVersion="7.17.0")}catch{}function my({basename:e,children:t,useTransitions:r,window:a}){let i=v.useRef();i.current==null&&(i.current=Jm({window:a,v5Compat:!0}));let s=i.current,[l,o]=v.useState({action:s.action,location:s.location}),c=v.useCallback(d=>{r===!1?o(d):v.startTransition(()=>o(d))},[r]);return v.useLayoutEffect(()=>s.listen(c),[s,c]),v.createElement(Hh,{basename:e,children:t,location:l.location,navigationType:l.action,navigator:s,useTransitions:r})}var pu=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,mu=v.forwardRef(function({onClick:t,discover:r="render",prefetch:a="none",relative:i,reloadDocument:s,replace:l,mask:o,state:c,target:d,to:h,preventScrollReset:m,viewTransition:f,defaultShouldRevalidate:y,...k},x){let{basename:b,navigator:p,useTransitions:u}=v.useContext(Le),g=typeof h=="string"&&pu.test(h),w=tu(h,b);h=w.to;let S=jh(h,{relative:i}),N=dt(),j=null;if(o){let ye=ol(o,[],N.mask?N.mask.pathname:"/",!0);b!=="/"&&(ye.pathname=ye.pathname==="/"?b:Fe([b,ye.pathname])),j=p.createHref(ye)}let[P,L,_]=sy(a,k),X=fy(h,{replace:l,mask:o,state:c,target:d,preventScrollReset:m,relative:i,viewTransition:f,defaultShouldRevalidate:y,useTransitions:u});function Ye(ye){t&&t(ye),ye.defaultPrevented||X(ye)}let Ie=!(w.isExternal||s),Qe=v.createElement("a",{...k,..._,href:(Ie?j:void 0)||w.absoluteURL||S,onClick:Ie?Ye:t,ref:uy(x,L),target:d,"data-discover":!g&&r==="render"?"true":void 0});return P&&!g?v.createElement(v.Fragment,null,Qe,v.createElement(ly,{page:S})):Qe});mu.displayName="Link";var hy=v.forwardRef(function({"aria-current":t="page",caseSensitive:r=!1,className:a="",end:i=!1,style:s,to:l,viewTransition:o,children:c,...d},h){let m=bn(l,{relative:d.relative}),f=dt(),y=v.useContext(Ha),{navigator:k,basename:x}=v.useContext(Le),b=y!=null&&wy(m)&&o===!0,p=k.encodeLocation?k.encodeLocation(m).pathname:m.pathname,u=f.pathname,g=y&&y.navigation&&y.navigation.location?y.navigation.location.pathname:null;r||(u=u.toLowerCase(),g=g?g.toLowerCase():null,p=p.toLowerCase()),g&&x&&(g=lt(g,x)||g);const w=p!=="/"&&p.endsWith("/")?p.length-1:p.length;let S=u===p||!i&&u.startsWith(p)&&u.charAt(w)==="/",N=g!=null&&(g===p||!i&&g.startsWith(p)&&g.charAt(p.length)==="/"),j={isActive:S,isPending:N,isTransitioning:b},P=S?t:void 0,L;typeof a=="function"?L=a(j):L=[a,S?"active":null,N?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let _=typeof s=="function"?s(j):s;return v.createElement(mu,{...d,"aria-current":P,className:L,ref:h,style:_,to:l,viewTransition:o},typeof c=="function"?c(j):c)});hy.displayName="NavLink";var yy=v.forwardRef(({discover:e="render",fetcherKey:t,navigate:r,reloadDocument:a,replace:i,state:s,method:l=Xn,action:o,onSubmit:c,relative:d,preventScrollReset:h,viewTransition:m,defaultShouldRevalidate:f,...y},k)=>{let{useTransitions:x}=v.useContext(Le),b=by(),p=ky(o,{relative:d}),u=l.toLowerCase()==="get"?"get":"post",g=typeof o=="string"&&pu.test(o),w=S=>{if(c&&c(S),S.defaultPrevented)return;S.preventDefault();let N=S.nativeEvent.submitter,j=(N==null?void 0:N.getAttribute("formmethod"))||l,P=()=>b(N||S.currentTarget,{fetcherKey:t,method:j,navigate:r,replace:i,state:s,relative:d,preventScrollReset:h,viewTransition:m,defaultShouldRevalidate:f});x&&r!==!1?v.startTransition(()=>P()):P()};return v.createElement("form",{ref:k,method:u,action:p,onSubmit:a?c:w,...y,"data-discover":!g&&e==="render"?"true":void 0})});yy.displayName="Form";function gy(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function hu(e){let t=v.useContext(Er);return G(t,gy(e)),t}function fy(e,{target:t,replace:r,mask:a,state:i,preventScrollReset:s,relative:l,viewTransition:o,defaultShouldRevalidate:c,useTransitions:d}={}){let h=dl(),m=dt(),f=bn(e,{relative:l});return v.useCallback(y=>{if(Vh(y,t)){y.preventDefault();let k=r!==void 0?r:pn(m)===pn(f),x=()=>h(e,{replace:k,mask:a,state:i,preventScrollReset:s,relative:l,viewTransition:o,defaultShouldRevalidate:c});d?v.startTransition(()=>x()):x()}},[m,h,f,r,a,i,t,e,s,l,o,c,d])}var xy=0,vy=()=>`__${String(++xy)}__`;function by(){let{router:e}=hu("useSubmit"),{basename:t}=v.useContext(Le),r=Uh(),a=e.fetch,i=e.navigate;return v.useCallback(async(s,l={})=>{let{action:o,method:c,encType:d,formData:h,body:m}=Qh(s,t);if(l.navigate===!1){let f=l.fetcherKey||vy();await a(f,r,l.action||o,{defaultShouldRevalidate:l.defaultShouldRevalidate,preventScrollReset:l.preventScrollReset,formData:h,body:m,formMethod:l.method||c,formEncType:l.encType||d,flushSync:l.flushSync})}else await i(l.action||o,{defaultShouldRevalidate:l.defaultShouldRevalidate,preventScrollReset:l.preventScrollReset,formData:h,body:m,formMethod:l.method||c,formEncType:l.encType||d,replace:l.replace,state:l.state,fromRouteId:r,flushSync:l.flushSync,viewTransition:l.viewTransition})},[a,i,t,r])}function ky(e,{relative:t}={}){let{basename:r}=v.useContext(Le),a=v.useContext(ct);G(a,"useFormAction must be used inside a RouteContext");let[i]=a.matches.slice(-1),s={...bn(e||".",{relative:t})},l=dt();if(e==null){s.search=l.search;let o=new URLSearchParams(s.search),c=o.getAll("index");if(c.some(h=>h==="")){o.delete("index"),c.filter(m=>m).forEach(m=>o.append("index",m));let h=o.toString();s.search=h?`?${h}`:""}}return(!e||e===".")&&i.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),r!=="/"&&(s.pathname=s.pathname==="/"?r:Fe([r,s.pathname])),pn(s)}function wy(e,{relative:t}={}){let r=v.useContext(au);G(r!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=hu("useViewTransitionState"),i=bn(e,{relative:t});if(!r.isTransitioning)return!1;let s=lt(r.currentLocation.pathname,a)||r.currentLocation.pathname,l=lt(r.nextLocation.pathname,a)||r.nextLocation.pathname;return Ea(i.pathname,l)!=null||Ea(i.pathname,s)!=null}const Sy={title:"🧪 Automation Testing Playground",subtitle:"Practice automation with Selenium, Cypress, and Playwright"},Ey={darkMode:"Dark Mode",lightMode:"Light Mode",homeTooltip:"Back to top"},Ty={basic:"📝 Basic Elements",locatorGuide:"🎯 Locator",complex:"🎯 Complex Interactions",advanced:"🚀 Advanced Scenarios",table:"📊 Data Table",api:"🌐 API Simulation",comparison:"🔍 Test Tools Comparison",practice:"🛠️ Practice Playground"},Ny={text:"Created for Automation Testers • All elements have unique test IDs",hint:"Inspect elements to find data-testid attributes for your tests"},jy={title:"📝 Basic Elements",subtitle:"Practice basic form interactions and element selection",inputFields:"Input Fields",textInput:"Text Input",textPlaceholder:"Enter text here",emailInput:"Email Input",numberInput:"Number Input",passwordInput:"Password Input",checkboxes:"Checkboxes",singleCheckbox:"Single Checkbox (Terms & Conditions)",multiCheckboxes:"Multiple Checkboxes (Select interests):",radioButtons:"Radio Buttons",experienceLevel:"Select your experience level:",beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced",expert:"Expert",dropdowns:"Dropdowns (Select)",staticDropdown:"Static Dropdown",selectCountry:"Select a country",dynamicDropdown:"Dynamic Dropdown",loading:"Loading...",selectOption:"Select an option",selectedValues:"Selected Values:",text:"Text:",email:"Email:",number:"Number:",singleCheckboxLabel:"Single Checkbox:",multiCheckboxesLabel:"Multi Checkboxes:",radio:"Radio:",staticDropdownLabel:"Static Dropdown:",dynamicDropdownLabel:"Dynamic Dropdown:",empty:"(empty)",checked:"Checked",unchecked:"Unchecked",none:"None",noneSelected:"(none selected)"},Py={title:"🎯 Complex Interactions",subtitle:"Practice advanced interactions like drag-drop, hover menus, and modals",dragDrop:"Drag and Drop",zone1:"Zone 1",zone2:"Zone 2",hoverMenu:"Hover Menu",modalsAlerts:"Modals and Alerts",showAlert:"Show Alert",showConfirm:"Show Confirm",showPrompt:"Show Prompt",showCustomModal:"Show Custom Modal",customModal:"Custom Modal",modalText:"This is a custom HTML modal. It can contain any content you want!",cancel:"Cancel",confirm:"Confirm",iframeInteraction:"Iframe Interaction",iframeDescription:"The form below is inside an iframe (simulated with inline HTML)"},Cy={title:"🚀 Advanced Scenarios",subtitle:"Test complex scenarios including Shadow DOM, dynamic content, and file operations",shadowDOM:"Shadow DOM",shadowDescription:"Click the button inside the shadow root:",shadowButton:"Shadow Button",shadowClicked:"Shadow button clicked!",dynamicContent:"Dynamic Content",dynamicDescription:"Content will appear after 3-6 seconds delay:",loadContent:"Load Dynamic Content",waitingText:"Waiting for content to load...",infiniteScroll:"Infinite Scroll",scrollDescription:"Scroll to bottom to load more items:",itemsCount:"Items count:",scrollToLoad:"Scroll to load more...",fileUpload:"File Upload",chooseFile:"Choose File",noFileChosen:"No file chosen",uploadedFile:"Uploaded file:",fileDownload:"File Download",downloadSample:"Download Sample File"},Ry={title:"📊 Data Table",subtitle:"Practice table sorting, searching, and pagination",searchPlaceholder:"Search by name, email, or age...",name:"Name",email:"Email",age:"Age",country:"Country",showing:"Showing",to:"to",of:"of",entries:"entries",previous:"Previous",next:"Next",noResults:"No results found"},_y={title:"🌐 API Simulation",subtitle:"Practice API testing with different HTTP status codes",description:"Simulate different API responses by clicking the buttons below. Check the status code and response message.",successButton:"200 - Success",unauthorizedButton:"401 - Unauthorized",notFoundButton:"404 - Not Found",serverErrorButton:"500 - Server Error",statusCode:"Status Code:",responseMessage:"Response Message:",noRequestYet:"No request made yet",booksTag:"Books API",booksDescription:"Full CRUD operations for managing a digital library.",postmanGuide:"How to Trigger in Postman",postmanSteps:{step1:"1. Open Postman application",step2:"2. Select {{method}} method",step3:"3. Enter URL: {{url}}",step4:"4. Set Header: Content-Type: application/json",step5:"5. Go to Body > raw > JSON and paste the request body (if needed)",step6:"6. Click 'Send' button"},endpoints:{getBooks:{summary:"Get All Books",description:"Retrieves a list of all available books in the library."},getBookById:{summary:"Get Book by ID",description:"Retrieves a specific book using its unique ID."},createBook:{summary:"Create New Book",description:"Adds a new book to the library."},updateBook:{summary:"Update Book",description:"Updates an existing book's information by ID."},deleteBook:{summary:"Delete Book",description:"Removes a book from the library permanently."}}},Ay={title:"🔍 Cypress, Selenium, and Playwright Command Comparison",overview:"Overview",basicCommands:"Basic Commands - Navigation",elementFinding:"Element Finding and Verification",clickOperations:"Click Operations",formOperations:"Form Operations",waitOperations:"Wait Operations",performance:"Performance Comparison",recommendations:"When to Use Each Tool?",exampleScenario:"Example: Login Form Test",conclusion:"💡 Conclusion",conclusionText:"Each tool has its own strengths:",cypressStrength:"Developer-friendly, fast feedback, excellent debugging",seleniumStrength:"Mature, flexible, wide language and browser support",playwrightStrength:"Modern, fast, powerful API and network control",finalAdvice:"Choose the most suitable tool according to your project requirements, team skills, and test scope."},Ly={title:"🎯 Selenium vs Playwright Locator Guide",subtitle:"Migration from Java Selenium to TypeScript Playwright",tabs:{comparison:"📊 Comparison (20 Examples)",playwrightOnly:"🎭 Playwright Only (20 Examples)"},headers:{html:"📝 HTML Code:",selenium:"☕ Java Selenium",playwright:"🎭 TypeScript Playwright",playwrightOnlyFeatures:"🎭 The following features are only available in Playwright!",example:"Example",playwrightExample:"Playwright Example"},tips:{prefix:"💡 Tip:",comp1:"CSS selectors are default in Playwright. Use # for ID.",comp2:"Use . (dot) for Class.",comp3:"Use square brackets for Attribute selectors.",comp4:"Role-based selectors in Playwright are more accessible and reliable.",comp5:"Using getByRole is faster and more readable than XPath.",comp6:"CSS selectors work the same way in both frameworks.",comp7:"Playwright's getByPlaceholder method is much more practical.",comp8:"getByLabel is much cleaner than complex XPaths.",comp9:"Using role-based selectors for headings is best practice.",comp10:"Test IDs are the most reliable selectors in test environments.",comp11:"In Playwright, locator captures multiple elements automatically.",comp12:"You can do partial text search with getByText.",comp13:"getByAltText is the best option for images.",comp14:"Chained selectors are cleaner in Playwright.",comp15:"Using role for checkboxes is a more semantic approach.",comp16:"You can use selectOption() method for dropdowns.",comp17:"getByRole('cell') can also be used for tables.",comp18:"getByTitle is very practical for title attributes.",comp19:"Locator chaining is more readable in Playwright.",comp20:"Combining with dot is the same for multiple classes.",pw1:"You can select the first of multiple elements with first().",pw2:"last() selects the last element in the list.",pw3:"You can select the element at a specific index with nth(index). Index starts from 0.",pw4:"You can filter elements by text or other criteria with filter().",pw5:"You can find a parent containing a specific element with has.",pw6:"You can check element state with Playwright assertion methods.",pw7:"You can easily check element states (enabled/disabled).",pw8:"Special methods are available for checkbox operations.",pw9:"toHaveText checks exact match, toContainText checks partial match.",pw10:"Checking or getting input values is very easy.",pw11:"You can check class existence with string or regex.",pw12:"You can check any HTML attribute or get its value.",pw13:"You can check or get the count of found elements.",pw14:"You can easily check link href and page URL.",pw15:"Playwright automatically waits for elements to be ready!",pw16:"You can make more specific selections by chaining locators.",pw17:"You can select from dropdown in 3 different ways.",pw18:"You can easily access elements inside iframe with frameLocator.",pw19:"You can get all elements as array with all() and loop through them.",pw20:"You can upload files even to hidden file inputs."},actions:{firstElement:"🎭 Playwright - Select First Element:",lastElement:"🎭 Playwright - Select Last Element:",nthElement:"🎭 Playwright - Select Element by Index:",filtering:"🎭 Playwright - Filtering:",hasElement:"🎭 Playwright - Filtering by Child:",visibility:"🎭 Playwright - Visibility Check:",stateCheck:"🎭 Playwright - State Check:",checkboxCheck:"🎭 Playwright - Checkbox Check:",textContent:"🎭 Playwright - Text Content Check:",inputValue:"🎭 Playwright - Input Value Check:",classCheck:"🎭 Playwright - Class Check:",attributeCheck:"🎭 Playwright - Attribute Check:",elementCount:"🎭 Playwright - Element Count:",urlCheck:"🎭 Playwright - URL Check:",autoWait:"🎭 Playwright - Auto Wait:",chaining:"🎭 Playwright - Chained Locators:",dropdownSelection:"🎭 Playwright - Dropdown Selection:",frameElement:"🎭 Playwright - Element inside Frame:",allElements:"🎭 Playwright - Get All Elements:",fileUpload:"🎭 Playwright - File Upload:"}},Iy={backButton:"← Back to Automation Exercise Main Page"},Dy={navButton:"⚡ JMeter",title:"⚡ Apache JMeter",subtitle:"Performance & Load Testing Tool",intro:"Apache JMeter is a free, open-source Java application designed to load test and measure the performance of web applications, APIs, and services.",whatIs:"What is Apache JMeter?",whatIsDesc:"JMeter simulates heavy load on a server to test its strength and analyze overall performance under different load types. It is widely used for performance, load, stress, and functional testing.",whyUse:"Why Use JMeter?",whyUseItems:{free:"100% Free & Open Source",gui:"Powerful GUI + Command Line support",protocols:"Supports HTTP, HTTPS, FTP, SOAP, REST, JDBC and more",reports:"Detailed HTML Reports and Graphs",scalable:"Highly Scalable — Distributed Testing",plugins:"Rich Plugin Ecosystem"},installation:"Installation",installationDesc:"Download JMeter from apache.jmeter.net. Requires Java 8 or higher.",concepts:"Core Concepts",conceptsItems:{threadGroup:"Thread Group — Simulates virtual users",sampler:"Samplers — HTTP, JDBC, FTP requests",listener:"Listeners — View Results, Aggregate Report",assertion:"Assertions — Response validation",timer:"Timers — Think time between requests",config:"Config Elements — CSV Data Set, HTTP Defaults"},firstTest:"Your First Test Plan",firstTestDesc:"Step-by-step guide: Create Thread Group → Add HTTP Sampler → Add Listener → Configure & Run.",reports:"Reports & Analysis",reportsDesc:"Generate rich HTML reports with charts for Response Time, Throughput, Error Rate, Percentiles and more.",comingSoon:"Detailed content coming soon..."},Oy={navButton:"🗄️ SQL",title:"🗄️ SQL",subtitle:"Database Testing & Query Mastery",intro:"SQL (Structured Query Language) is the standard language for managing relational databases and is essential for backend and database testing in automation.",whatIs:"What is SQL?",whatIsDesc:"SQL is a domain-specific language for managing data held in relational databases. It enables creating, reading, updating, and deleting records (CRUD).",whyUse:"Why SQL in Test Automation?",whyUseItems:{verify:"Verify database state after UI/API actions",seed:"Seed test data before test execution",cleanup:"Clean up test data after tests",direct:"Directly query backend to validate business logic",perf:"Performance testing of database queries",integrity:"Data integrity and constraint validation"},select:"SELECT Queries",selectDesc:"Retrieve data with SELECT, FROM, WHERE, ORDER BY, LIMIT.",joins:"JOIN Operations",joinsDesc:"INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN — combining data from multiple tables.",aggregates:"Aggregate Functions",aggregatesDesc:"COUNT, SUM, AVG, MIN, MAX with GROUP BY and HAVING clauses.",subqueries:"Subqueries & CTEs",subqueriesDesc:"Nested queries and Common Table Expressions for complex data retrieval.",dml:"DML Operations",dmlDesc:"INSERT, UPDATE, DELETE — modifying database records for test setup and teardown.",testing:"Database Testing Strategies",testingDesc:"Schema validation, referential integrity, stored procedure testing, and data migration verification.",comingSoon:"Detailed content coming soon..."},zy={navButton:"📘 TypeScript",title:"📘 TypeScript",subtitle:"Typed JavaScript for Reliable Automation",intro:"TypeScript is a strongly typed superset of JavaScript that compiles to plain JS. It brings type safety, better tooling, and improved maintainability to your automation framework.",whatIs:"What is TypeScript?",whatIsDesc:"TypeScript adds optional static types to JavaScript. Catch bugs at compile time, get better IDE support, and write more maintainable automation code.",whyUse:"Why TypeScript for Automation?",whyUseItems:{types:"Catch type errors before runtime",intellisense:"Excellent IDE IntelliSense & autocomplete",playwright:"Native TypeScript support in Playwright",refactor:"Safe refactoring across large codebases",docs:"Types serve as living documentation",oop:"Full OOP support: interfaces, generics, decorators"},basics:"TypeScript Basics",basicsDesc:"Types, interfaces, enums, type aliases, union types, intersection types.",classes:"Classes & Interfaces",classesDesc:"Object-oriented patterns for Page Object Model, base classes, and service abstractions.",generics:"Generics",genericsDesc:"Write reusable, type-safe utility functions and helper classes.",async:"Async/Await & Promises",asyncDesc:"Modern async patterns essential for Playwright automation.",playwright:"TypeScript + Playwright",playwrightDesc:"Playwright was built TypeScript-first. Leverage full type safety for page interactions, fixtures, and assertions.",config:"tsconfig.json Configuration",configDesc:"Compiler options, module resolution, strict mode settings for automation projects.",comingSoon:"Detailed content coming soon..."},Uy={navButton:"🐍 Python",title:"🐍 Python",subtitle:"Versatile Automation with Python",intro:"Python is one of the most popular languages for test automation. Its clear syntax, rich libraries (pytest, Selenium, Requests), and large community make it ideal for all automation needs.",whatIs:"Why Python for Automation?",whatIsDesc:"Python's simplicity, readability, and extensive library ecosystem make it perfect for UI automation, API testing, data-driven testing, and CI/CD integration.",whyUse:"Python Automation Advantages",whyUseItems:{simple:"Simple, readable syntax — easy to learn",pytest:"pytest — powerful and extensible testing framework",selenium:"Selenium WebDriver support out of the box",requests:"requests library for API testing",pandas:"pandas for data-driven test scenarios",ci:"Excellent CI/CD integration (GitHub Actions, Jenkins)"},pytest:"pytest Framework",pytestDesc:"Fixtures, parametrize, markers, plugins — the gold standard for Python testing.",selenium:"Selenium + Python",seleniumDesc:"Browser automation with Selenium WebDriver, Page Object Model, and wait strategies.",requests:"Requests Library",requestsDesc:"HTTP requests for API testing: GET, POST, PUT, DELETE with headers and auth.",datadriven:"Data-Driven Testing",datadrivenDesc:"Parametrize tests with CSV, JSON, Excel data using pytest.mark.parametrize.",pom:"Page Object Model",pomDesc:"Design pattern for maintainable Selenium automation with Python.",bestpractices:"Best Practices",bestpracticesDesc:"Project structure, fixtures, conftest.py, environment management with .env files.",comingSoon:"Detailed content coming soon..."},By={title:"🛠️ Practice Playground",subtitle:"Practice automation with modern UI elements",homeTooltip:"Return to home",personalInfo:{title:"👤 Personal Information",name:"Full Name",namePlaceholder:"Enter your name",email:"Email",emailPlaceholder:"example@mail.com",phone:"Phone",phonePlaceholder:"5XX XXX XX XX",address:"Address",addressPlaceholder:"Enter your full address"},selections:{title:"🔘 Selection Elements",gender:"Gender",male:"Male",female:"Female",days:"Days",monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday",country:"Country",colors:"Color Selection (Multi)",selectedColors:"Selected Colors:"},datePickers:{title:"📅 Date Pickers",standard:"Standard Date",range:"Date Range"},tables:{title:"📊 Table Structures",static:"Static Table",pagination:"Pagination Table"},files:{title:"📁 File Operations",single:"Single File Upload",multiple:"Multiple File Upload"},interactions:{title:"🖱️ Interactive Tools",slider:"Slider",dragDrop:"Drag and Drop",doubleClick:"Double Click",dragMe:"Drag Me",dropHere:"Drop Here",doubleClickResult:"Double clicked!"}},My={header:Sy,buttons:Ey,nav:Ty,footer:Ny,basic:jy,complex:Py,advanced:Cy,table:Ry,api:_y,comparison:Ay,locator:Ly,pages:Iy,jmeter:Dy,sql:Oy,typescript:zy,python:Uy,practice:By},Fy={title:"🧪 Automation Testing Playground",subtitle:"Selenium, Cypress ve Playwright ile otomasyon pratiği yapın"},Hy={darkMode:"Karanlık Mod",lightMode:"Aydınlık Mod",homeTooltip:"Sayfanın başına dön"},qy={basic:"📝 Temel Elementler",locatorGuide:"🎯 Locate Alma",complex:"🎯 Karmaşık Etkileşimler",advanced:"🚀 Gelişmiş Senaryolar",table:"📊 Veri Tablosu",api:"🌐 API Simülasyonu",comparison:"🔍 Test Araçları Karşılaştırma",practice:"🛠️ Uygulama Bahçesi"},$y={text:"Otomasyon Test Mühendisleri İçin Hazırlandı • Tüm elementlerin benzersiz test ID'leri var",hint:"Test ID'lerini bulmak için elementleri inceleyin (data-testid)"},Wy={title:"📝 Temel Elementler",subtitle:"Temel form etkileşimleri ve element seçimi pratiği yapın",inputFields:"Giriş Alanları",textInput:"Text Input",textPlaceholder:"Buraya metin girin",emailInput:"Email Input",numberInput:"Number Input",passwordInput:"Password Input",checkboxes:"Checkbox'lar",singleCheckbox:"Tekli Checkbox (Şartlar ve Koşullar)",multiCheckboxes:"Çoklu Checkbox'lar (İlgi alanlarınızı seçin):",radioButtons:"Radio Button'lar",experienceLevel:"Deneyim seviyenizi seçin:",beginner:"Başlangıç",intermediate:"Orta Seviye",advanced:"İleri Seviye",expert:"Uzman",dropdowns:"Dropdown'lar (Select)",staticDropdown:"Statik Dropdown",selectCountry:"Ülke seçin",dynamicDropdown:"Dinamik Dropdown",loading:"Yükleniyor...",selectOption:"Seçenek seçin",selectedValues:"Seçilen Değerler:",text:"Text:",email:"Email:",number:"Number:",singleCheckboxLabel:"Tekli Checkbox:",multiCheckboxesLabel:"Çoklu Checkbox'lar:",radio:"Radio:",staticDropdownLabel:"Statik Dropdown:",dynamicDropdownLabel:"Dinamik Dropdown:",empty:"(boş)",checked:"İşaretli",unchecked:"İşaretsiz",none:"Hiçbiri",noneSelected:"(seçilmedi)"},Jy={title:"🎯 Karmaşık Etkileşimler",subtitle:"Drag-drop, hover menüler ve modal'lar gibi gelişmiş etkileşimler pratiği yapın",dragDrop:"Drag and Drop",zone1:"Zone 1",zone2:"Zone 2",hoverMenu:"Hover Menü",modalsAlerts:"Modal'lar ve Alert'ler",showAlert:"Alert Göster",showConfirm:"Confirm Göster",showPrompt:"Prompt Göster",showCustomModal:"Özel Modal Göster",customModal:"Özel Modal",modalText:"Bu özel bir HTML modal'dır. İstediğiniz içeriği barındırabilir!",cancel:"İptal",confirm:"Onayla",iframeInteraction:"Iframe Etkileşimi",iframeDescription:"Aşağıdaki form bir iframe içinde (inline HTML ile simüle edilmiş)"},Gy={title:"🚀 Gelişmiş Senaryolar",subtitle:"Shadow DOM, dinamik içerik ve dosya işlemleri gibi karmaşık senaryoları test edin",shadowDOM:"Shadow DOM",shadowDescription:"Shadow root içindeki butona tıklayın:",shadowButton:"Shadow Button",shadowClicked:"Shadow button'a tıklandı!",dynamicContent:"Dinamik İçerik",dynamicDescription:"İçerik 3-6 saniye gecikme sonrası görünecek:",loadContent:"Dinamik İçerik Yükle",waitingText:"İçeriğin yüklenmesi bekleniyor...",infiniteScroll:"Sonsuz Scroll",scrollDescription:"Daha fazla öğe yüklemek için aşağı kaydırın:",itemsCount:"Öğe sayısı:",scrollToLoad:"Daha fazla yüklemek için kaydırın...",fileUpload:"Dosya Yükleme",chooseFile:"Dosya Seç",noFileChosen:"Dosya seçilmedi",uploadedFile:"Yüklenen dosya:",fileDownload:"Dosya İndirme",downloadSample:"Örnek Dosya İndir"},Vy={title:"📊 Veri Tablosu",subtitle:"Tablo sıralama, arama ve sayfalama pratiği yapın",searchPlaceholder:"İsim, email veya yaşa göre ara...",name:"İsim",email:"Email",age:"Yaş",country:"Ülke",showing:"Gösterilen",to:"ile",of:"toplam",entries:"kayıt",previous:"Önceki",next:"Sonraki",noResults:"Sonuç bulunamadı"},Ky={title:"🌐 API Simülasyonu",subtitle:"Farklı HTTP durum kodları ile API testi pratiği yapın",description:"Aşağıdaki butonlara tıklayarak farklı API yanıtlarını simüle edin. Durum kodunu ve yanıt mesajını kontrol edin.",successButton:"200 - Başarılı",unauthorizedButton:"401 - Yetkisiz",notFoundButton:"404 - Bulunamadı",serverErrorButton:"500 - Sunucu Hatası",statusCode:"Durum Kodu:",responseMessage:"Yanıt Mesajı:",noRequestYet:"Henüz istek yapılmadı",booksTag:"Kitaplar API",booksDescription:"Dijital kütüphane yönetimi için tam CRUD işlemleri.",postmanGuide:"Postman ile Nasıl Tetiklenir",postmanSteps:{step1:"1. Postman uygulamasını açın",step2:"2. {{method}} metodunu seçin",step3:"3. URL: {{url}} girin",step4:"4. Header ekleyin: Content-Type: application/json",step5:"5. Body > raw > JSON sekmesine gidin ve veriyi yapıştırın (gerekliyse)",step6:"6. 'Send' butonuna tıklayın"},endpoints:{getBooks:{summary:"Tüm Kitapları Getir",description:"Kütüphanedeki tüm mevcut kitapların listesini getirir."},getBookById:{summary:"ID ile Kitap Getir",description:"Benzersiz ID'sini kullanarak belirli bir kitabı getirir."},createBook:{summary:"Yeni Kitap Ekle",description:"Kütüphaneye yeni bir kitap ekler."},updateBook:{summary:"Kitap Güncelle",description:"Mevcut bir kitabın bilgilerini ID ile günceller."},deleteBook:{summary:"Kitap Sil",description:"Bir kitabı kütüphaneden kalıcı olarak siler."}}},Yy={title:"🔍 Cypress, Selenium ve Playwright Komut Karşılaştırması",overview:"Genel Bakış",basicCommands:"Temel Komutlar - Sayfaya Gitme",elementFinding:"Element Bulma ve Doğrulama",clickOperations:"Tıklama İşlemleri",formOperations:"Form İşlemleri",waitOperations:"Bekleme İşlemleri",performance:"Performans Karşılaştırması",recommendations:"Ne Zaman Hangi Aracı Kullanmalı?",exampleScenario:"Örnek: Login Formu Testi",conclusion:"💡 Sonuç",conclusionText:"Her araç kendi güçlü yönlerine sahiptir:",cypressStrength:"Geliştirici dostu, hızlı feedback, mükemmel debugging",seleniumStrength:"Olgun, esnek, geniş dil ve tarayıcı desteği",playwrightStrength:"Modern, hızlı, güçlü API ve network kontrolü",finalAdvice:"Proje gereksinimlerinize, ekibinizin becerilerine ve test kapsamınıza göre en uygun aracı seçin."},Qy={title:"🎯 Selenium vs Playwright Locator Rehberi",subtitle:"Java Selenium'dan TypeScript Playwright'e Geçiş",tabs:{comparison:"📊 Karşılaştırma (20 Örnek)",playwrightOnly:"🎭 Sadece Playwright (20 Örnek)"},headers:{html:"📝 HTML Kodu:",selenium:"☕ Java Selenium",playwright:"🎭 TypeScript Playwright",playwrightOnlyFeatures:"🎭 Aşağıdaki özellikler sadece Playwright'ta mevcuttur!",example:"Örnek",playwrightExample:"Playwright Örnek"},tips:{prefix:"💡 İpucu:",comp1:"Playwright'ta CSS seçiciler varsayılandır. ID için # kullanırız.",comp2:"Class için . (nokta) kullanırız.",comp3:"Attribute seçiciler için köşeli parantez kullanırız.",comp4:"Playwright'ta role-based seçiciler daha erişilebilir ve güvenilirdir.",comp5:"XPath yerine getByRole kullanmak daha hızlı ve okunabilirdir.",comp6:"CSS seçiciler her iki frameworkte de aynı şekilde çalışır.",comp7:"Playwright'ın getByPlaceholder metodu çok daha pratiktir.",comp8:"getByLabel karmaşık XPath'lerden çok daha temizdir.",comp9:"Heading'ler için role-based seçici kullanmak best practice'tir.",comp10:"Test ID'leri test ortamında en güvenilir seçicidir.",comp11:"Playwright'ta locator birden fazla elementi otomatik yakalar.",comp12:"getByText ile partial text araması yapabilirsiniz.",comp13:"Görseller için getByAltText en iyi seçenektir.",comp14:"Playwright'ta zincirleme seçici daha temizdir.",comp15:"Checkbox için role kullanmak daha semantik bir yaklaşımdır.",comp16:"Dropdown'lar için selectOption() metodunu kullanabilirsiniz.",comp17:"Tablo için getByRole('cell') da kullanılabilir.",comp18:"Title attribute'u için getByTitle çok pratiktir.",comp19:"Playwright'ta locator zincirleme daha okunabilirdir.",comp20:"Birden fazla class için nokta ile birleştirme aynıdır.",pw1:"first() metodu ile birden fazla elementten ilkini seçebilirsiniz.",pw2:"last() metodu listedeki son elementi seçer.",pw3:"nth(index) ile belirli sıradaki elementi seçebilirsiniz. Index 0'dan başlar.",pw4:"filter() metodu ile elementleri metin veya başka kriterlere göre süzebilirsiniz.",pw5:"has ile belirli bir elementi içeren parent'ı bulabilirsiniz.",pw6:"Playwright'ın assertion metodları ile elementin durumunu kontrol edebilirsiniz.",pw7:"Element durumlarını (enabled/disabled) kolayca kontrol edebilirsiniz.",pw8:"Checkbox işlemleri için özel metodlar mevcuttur.",pw9:"toHaveText tam eşleşme, toContainText kısmi eşleşme kontrol eder.",pw10:"Input değerlerini kontrol etmek veya almak çok kolaydır.",pw11:"Class varlığını string veya regex ile kontrol edebilirsiniz.",pw12:"Herhangi bir HTML attribute'unu kontrol edebilir veya değerini alabilirsiniz.",pw13:"Bulunan element sayısını kontrol edebilir veya alabilirsiniz.",pw14:"Link href'ini ve sayfa URL'ini kolayca kontrol edebilirsiniz.",pw15:"Playwright elementlerin hazır olmasını otomatik bekler!",pw16:"Locator'ları zincirleyerek daha spesifik seçimler yapabilirsiniz.",pw17:"Dropdown'da 3 farklı şekilde seçim yapabilirsiniz.",pw18:"frameLocator ile iframe içindeki elementlere kolayca erişebilirsiniz.",pw19:"all() metodu ile tüm elementleri array olarak alıp loop yapabilirsiniz.",pw20:"Gizli file input'lara bile dosya yükleyebilirsiniz."},actions:{firstElement:"🎭 Playwright - İlk Elementi Seçme:",lastElement:"🎭 Playwright - Son Elementi Seçme:",nthElement:"🎭 Playwright - Index ile Element Seçme:",filtering:"🎭 Playwright - Filtreleme:",hasElement:"🎭 Playwright - İçinde Element Barındırma:",visibility:"🎭 Playwright - Görünürlük Kontrolü:",stateCheck:"🎭 Playwright - Durum Kontrolü:",checkboxCheck:"🎭 Playwright - Checkbox Kontrolü:",textContent:"🎭 Playwright - Metin İçeriği Kontrolü:",inputValue:"🎭 Playwright - Input Değeri Kontrolü:",classCheck:"🎭 Playwright - Class Kontrolü:",attributeCheck:"🎭 Playwright - Attribute Kontrolü:",elementCount:"🎭 Playwright - Element Sayısı:",urlCheck:"🎭 Playwright - URL Kontrolü:",autoWait:"🎭 Playwright - Otomatik Bekleme:",chaining:"🎭 Playwright - Zincirleme Locator:",dropdownSelection:"🎭 Playwright - Dropdown Seçimi:",frameElement:"🎭 Playwright - Frame İçi Element:",allElements:"🎭 Playwright - Tüm Elementleri Alma:",fileUpload:"🎭 Playwright - Dosya Yükleme:"}},Xy={backButton:"← Automation Exercise Ana Sayfasına Dön"},Zy={navButton:"⚡ JMeter",title:"⚡ Apache JMeter",subtitle:"Performans ve Yük Testi Aracı",intro:"Apache JMeter, web uygulamalarının, API'lerin ve servislerin performansını ölçmek için kullanılan ücretsiz, açık kaynaklı bir Java uygulamasıdır.",whatIs:"Apache JMeter Nedir?",whatIsDesc:"JMeter, bir sunucu üzerinde ağır yük simüle ederek gücünü test eder ve farklı yük tipleri altında genel performansı analiz eder. Performans, yük, stres ve fonksiyonel testlerde yaygın olarak kullanılır.",whyUse:"Neden JMeter Kullanmalı?",whyUseItems:{free:"%100 Ücretsiz & Açık Kaynak",gui:"Güçlü GUI + Komut Satırı desteği",protocols:"HTTP, HTTPS, FTP, SOAP, REST, JDBC ve daha fazlasını destekler",reports:"Detaylı HTML Raporları ve Grafikler",scalable:"Yüksek Ölçeklenebilirlik — Dağıtık Testler",plugins:"Zengin Eklenti Ekosistemi"},installation:"Kurulum",installationDesc:"JMeter'ı apache.jmeter.net adresinden indirin. Java 8 veya üstü gereklidir.",concepts:"Temel Kavramlar",conceptsItems:{threadGroup:"Thread Group — Sanal kullanıcıları simüle eder",sampler:"Sampler'lar — HTTP, JDBC, FTP istekleri",listener:"Listener'lar — View Results, Aggregate Report",assertion:"Assertion'lar — Yanıt doğrulama",timer:"Timer'lar — İstekler arası düşünme süresi",config:"Config Element'ler — CSV Data Set, HTTP Defaults"},firstTest:"İlk Test Planınız",firstTestDesc:"Adım adım rehber: Thread Group Oluştur → HTTP Sampler Ekle → Listener Ekle → Yapılandır & Çalıştır.",reports:"Raporlar & Analiz",reportsDesc:"Yanıt Süresi, Throughput, Hata Oranı, Persentiller ve daha fazlası için grafiklerle zengin HTML raporları oluşturun.",comingSoon:"Detaylı içerik yakında geliyor..."},eg={navButton:"🗄️ SQL",title:"🗄️ SQL",subtitle:"Veritabanı Testi & Sorgu Ustalığı",intro:"SQL (Structured Query Language — Yapılandırılmış Sorgu Dili), ilişkisel veritabanlarını yönetmek için standart dildir ve otomasyonda backend ve veritabanı testi için vazgeçilmezdir.",whatIs:"SQL Nedir?",whatIsDesc:"SQL, ilişkisel veritabanlarında tutulan verileri yönetmek için kullanılan bir alan-özel dildir. Kayıt oluşturma, okuma, güncelleme ve silme (CRUD) işlemlerini mümkün kılar.",whyUse:"Test Otomasyonunda Neden SQL?",whyUseItems:{verify:"UI/API işlemlerinden sonra veritabanı durumunu doğrulama",seed:"Test yürütmeden önce test verisi oluşturma",cleanup:"Testlerden sonra test verilerini temizleme",direct:"İş mantığını doğrulamak için backend'i doğrudan sorgulama",perf:"Veritabanı sorgularının performans testi",integrity:"Veri bütünlüğü ve kısıt doğrulama"},select:"SELECT Sorguları",selectDesc:"SELECT, FROM, WHERE, ORDER BY, LIMIT ile veri çekme.",joins:"JOIN İşlemleri",joinsDesc:"INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN — birden fazla tablodan veri birleştirme.",aggregates:"Toplama Fonksiyonları",aggregatesDesc:"GROUP BY ve HAVING ile COUNT, SUM, AVG, MIN, MAX.",subqueries:"Alt Sorgular & CTE'ler",subqueriesDesc:"Karmaşık veri çekme için iç içe sorgular ve Common Table Expression'lar.",dml:"DML İşlemleri",dmlDesc:"INSERT, UPDATE, DELETE — test kurulum ve temizleme için veritabanı kayıtlarını değiştirme.",testing:"Veritabanı Test Stratejileri",testingDesc:"Şema doğrulama, referans bütünlüğü, stored procedure testi ve veri migrasyon doğrulama.",comingSoon:"Detaylı içerik yakında geliyor..."},tg={navButton:"📘 TypeScript",title:"📘 TypeScript",subtitle:"Güvenilir Otomasyon için Tipli JavaScript",intro:"TypeScript, düz JS'ye derlenen, güçlü tipli bir JavaScript üst kümesidir. Otomasyon framework'ünüze tip güvenliği, daha iyi araç desteği ve gelişmiş sürdürülebilirlik kazandırır.",whatIs:"TypeScript Nedir?",whatIsDesc:"TypeScript, JavaScript'e isteğe bağlı statik tipler ekler. Derleme zamanında hataları yakalayın, daha iyi IDE desteği alın ve daha sürdürülebilir otomasyon kodu yazın.",whyUse:"Neden Otomasyonda TypeScript?",whyUseItems:{types:"Çalışma zamanından önce tip hatalarını yakalama",intellisense:"Mükemmel IDE IntelliSense & otomatik tamamlama",playwright:"Playwright'ta yerel TypeScript desteği",refactor:"Büyük kod tabanlarında güvenli yeniden düzenleme",docs:"Tipler yaşayan belgeler gibi hizmet eder",oop:"Tam OOP desteği: interface'ler, generic'ler, decorator'lar"},basics:"TypeScript Temelleri",basicsDesc:"Tipler, interface'ler, enum'lar, tip takma adları, birleşim tipleri, kesişim tipleri.",classes:"Sınıflar & Interface'ler",classesDesc:"Page Object Model, temel sınıflar ve servis soyutlamaları için nesne yönelimli kalıplar.",generics:"Generic'ler",genericsDesc:"Yeniden kullanılabilir, tip güvenli yardımcı fonksiyonlar ve yardımcı sınıflar yazma.",async:"Async/Await & Promise'ler",asyncDesc:"Playwright otomasyonu için vazgeçilmez modern async kalıpları.",playwright:"TypeScript + Playwright",playwrightDesc:"Playwright TypeScript-öncelikli olarak geliştirildi. Sayfa etkileşimleri, fixture'lar ve assertion'lar için tam tip güvenliğinden yararlanın.",config:"tsconfig.json Yapılandırması",configDesc:"Otomasyon projeleri için derleyici seçenekleri, modül çözümlemesi, strict mod ayarları.",comingSoon:"Detaylı içerik yakında geliyor..."},rg={navButton:"🐍 Python",title:"🐍 Python",subtitle:"Python ile Çok Yönlü Otomasyon",intro:"Python, test otomasyonu için en popüler dillerden biridir. Açık söz dizimi, zengin kütüphaneleri (pytest, Selenium, Requests) ve büyük topluluğu ile tüm otomasyon ihtiyaçları için idealdir.",whatIs:"Neden Otomasyonda Python?",whatIsDesc:"Python'un sadeliği, okunabilirliği ve kapsamlı kütüphane ekosistemi, UI otomasyonu, API testi, veri güdümlü test ve CI/CD entegrasyonu için mükemmeldir.",whyUse:"Python Otomasyon Avantajları",whyUseItems:{simple:"Basit, okunabilir söz dizimi — öğrenmesi kolay",pytest:"pytest — güçlü ve genişletilebilir test framework'ü",selenium:"Selenium WebDriver desteği dahili olarak",requests:"API testi için requests kütüphanesi",pandas:"Veri güdümlü test senaryoları için pandas",ci:"Mükemmel CI/CD entegrasyonu (GitHub Actions, Jenkins)"},pytest:"pytest Framework'ü",pytestDesc:"Fixture'lar, parametrize, marker'lar, plugin'ler — Python testi için altın standart.",selenium:"Selenium + Python",seleniumDesc:"Selenium WebDriver, Page Object Model ve bekleme stratejileri ile tarayıcı otomasyonu.",requests:"Requests Kütüphanesi",requestsDesc:"API testi için HTTP istekleri: header'lar ve kimlik doğrulama ile GET, POST, PUT, DELETE.",datadriven:"Veri Güdümlü Test",datadrivenDesc:"pytest.mark.parametrize kullanarak CSV, JSON, Excel verisiyle testleri parametrize etme.",pom:"Page Object Model",pomDesc:"Python ile sürdürülebilir Selenium otomasyonu için tasarım kalıbı.",bestpractices:"En İyi Uygulamalar",bestpracticesDesc:"Proje yapısı, fixture'lar, conftest.py, .env dosyaları ile ortam yönetimi.",comingSoon:"Detaylı içerik yakında geliyor..."},ng={title:"🛠️ Uygulama Bahçesi",subtitle:"Modern UI elementleri ile otomasyon pratikleri yapın",homeTooltip:"Ana sayfaya dön",personalInfo:{title:"👤 Kişisel Bilgiler",name:"Ad Soyad",namePlaceholder:"Adınızı giriniz",email:"E-posta",emailPlaceholder:"ornek@mail.com",phone:"Telefon",phonePlaceholder:"5XX XXX XX XX",address:"Adres",addressPlaceholder:"Açık adresinizi yazınız"},selections:{title:"🔘 Seçim Elemanları",gender:"Cinsiyet",male:"Erkek",female:"Kadın",days:"Günler",monday:"Pazartesi",tuesday:"Salı",wednesday:"Çarşamba",thursday:"Perşembe",friday:"Cuma",saturday:"Cumartesi",sunday:"Pazar",country:"Ülke",colors:"Renk Seçimi (Çoklu)",selectedColors:"Seçilen Renkler:"},datePickers:{title:"📅 Tarih Seçiciler",standard:"Standart Tarih",range:"Tarih Aralığı"},tables:{title:"📊 Tablo Yapıları",static:"Statik Tablo",pagination:"Sayfalamalı Tablo"},files:{title:"📁 Dosya İşlemleri",single:"Tekli Dosya Yükle",multiple:"Çoklu Dosya Yükle"},interactions:{title:"🖱️ Etkileşimli Araçlar",slider:"Sürgü (Slider)",dragDrop:"Sürükle ve Bırak",doubleClick:"Çift Tıklama",dragMe:"Beni Sürükle",dropHere:"Buraya Bırak",doubleClickResult:"Çift tıklandı!"}},ag={header:Fy,buttons:Hy,nav:qy,footer:$y,basic:Wy,complex:Jy,advanced:Gy,table:Vy,api:Ky,comparison:Yy,locator:Qy,pages:Xy,jmeter:Zy,sql:eg,typescript:tg,python:rg,practice:ng},yu=v.createContext(),ig={en:My,tr:ag};function sg({children:e}){const[t,r]=v.useState(()=>localStorage.getItem("language")||"en");v.useEffect(()=>{localStorage.setItem("language",t)},[t]);const a=s=>{const l=s.split(".");let o=ig[t];for(const c of l)o=o==null?void 0:o[c];return o||s},i=()=>{r(s=>s==="en"?"tr":"en")};return n.jsx(yu.Provider,{value:{language:t,t:a,toggleLanguage:i},children:e})}function $e(){const e=v.useContext(yu);if(!e)throw new Error("useLanguage must be used within LanguageProvider");return e}function Do({darkMode:e}){const{t}=$e(),[r,a]=v.useState([]),[i,s]=v.useState({textInput:"",emailInput:"",numberInput:"",passwordInput:"",singleCheckbox:!1,multiCheckboxes:[],radioButton:"",staticDropdown:"",dynamicDropdown:""});v.useEffect(()=>{const o=setTimeout(()=>{a([{value:"option1",label:"Dynamic Option 1"},{value:"option2",label:"Dynamic Option 2"},{value:"option3",label:"Dynamic Option 3"},{value:"option4",label:"Dynamic Option 4"}])},2e3);return()=>clearTimeout(o)},[]);const l=o=>{s(c=>({...c,multiCheckboxes:c.multiCheckboxes.includes(o)?c.multiCheckboxes.filter(d=>d!==o):[...c.multiCheckboxes,o]}))};return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"basic-elements-title",children:t("basic.title")}),n.jsx("p",{className:`mb-6 ${e?"text-gray-300":"text-gray-600"}`,children:t("basic.subtitle")}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("basic.inputFields")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[n.jsxs("div",{children:[n.jsx("label",{htmlFor:"text-input",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.textInput")}),n.jsx("input",{type:"text",id:"text-input","data-testid":"text-input",placeholder:t("basic.textPlaceholder"),value:i.textInput,onChange:o=>s({...i,textInput:o.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})]}),n.jsxs("div",{children:[n.jsx("label",{htmlFor:"email-input",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.emailInput")}),n.jsx("input",{type:"email",id:"email-input","data-testid":"email-input",placeholder:"email@example.com",value:i.emailInput,onChange:o=>s({...i,emailInput:o.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})]}),n.jsxs("div",{children:[n.jsx("label",{htmlFor:"number-input",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.numberInput")}),n.jsx("input",{type:"number",id:"number-input","data-testid":"number-input",placeholder:"123",value:i.numberInput,onChange:o=>s({...i,numberInput:o.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})]}),n.jsxs("div",{children:[n.jsx("label",{htmlFor:"password-input",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.passwordInput")}),n.jsx("input",{type:"password",id:"password-input","data-testid":"password-input",placeholder:"••••••••",value:i.passwordInput,onChange:o=>s({...i,passwordInput:o.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})]})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("basic.checkboxes")}),n.jsxs("div",{className:"mb-6 space-y-3",children:[n.jsxs("div",{className:"flex items-center",children:[n.jsx("input",{type:"checkbox",id:"single-checkbox","data-testid":"single-checkbox",checked:i.singleCheckbox,onChange:o=>s({...i,singleCheckbox:o.target.checked}),className:"w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"}),n.jsx("label",{htmlFor:"single-checkbox",className:`ml-2 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.singleCheckbox")})]}),n.jsxs("div",{className:"pl-4 border-l-2 border-gray-200",children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.multiCheckboxes")}),["JavaScript","Python","Java","C++"].map(o=>n.jsxs("div",{className:"flex items-center mb-2",children:[n.jsx("input",{type:"checkbox",id:`checkbox-${o.toLowerCase()}`,"data-testid":`checkbox-${o.toLowerCase()}`,checked:i.multiCheckboxes.includes(o),onChange:()=>l(o),className:"w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"}),n.jsx("label",{htmlFor:`checkbox-${o.toLowerCase()}`,className:`ml-2 ${e?"text-gray-300":"text-gray-700"}`,children:o})]},o))]})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("basic.radioButtons")}),n.jsxs("div",{className:"mb-6",children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.experienceLevel")}),n.jsx("div",{className:"space-y-2",children:[{value:"beginner",label:t("basic.beginner")},{value:"intermediate",label:t("basic.intermediate")},{value:"advanced",label:t("basic.advanced")},{value:"expert",label:t("basic.expert")}].map(o=>n.jsxs("div",{className:"flex items-center",children:[n.jsx("input",{type:"radio",id:`radio-${o.value}`,"data-testid":`radio-${o.value}`,name:"experience",value:o.value,checked:i.radioButton===o.value,onChange:c=>s({...i,radioButton:c.target.value}),className:"w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"}),n.jsx("label",{htmlFor:`radio-${o.value}`,className:`ml-2 ${e?"text-gray-300":"text-gray-700"}`,children:o.label})]},o.value))})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("basic.dropdowns")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[n.jsxs("div",{children:[n.jsx("label",{htmlFor:"static-dropdown",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:t("basic.staticDropdown")}),n.jsxs("select",{id:"static-dropdown","data-testid":"static-dropdown",value:i.staticDropdown,onChange:o=>s({...i,staticDropdown:o.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",children:[n.jsx("option",{value:"",children:t("basic.selectCountry")}),n.jsx("option",{value:"us",children:"United States"}),n.jsx("option",{value:"uk",children:"United Kingdom"}),n.jsx("option",{value:"ca",children:"Canada"}),n.jsx("option",{value:"au",children:"Australia"}),n.jsx("option",{value:"de",children:"Germany"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{htmlFor:"dynamic-dropdown",className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:[t("basic.dynamicDropdown")," ",r.length===0&&`(${t("basic.loading")})`]}),n.jsxs("select",{id:"dynamic-dropdown","data-testid":"dynamic-dropdown",value:i.dynamicDropdown,onChange:o=>s({...i,dynamicDropdown:o.target.value}),disabled:r.length===0,className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed",children:[n.jsx("option",{value:"",children:t("basic.selectOption")}),r.map(o=>n.jsx("option",{value:o.value,children:o.label},o.value))]})]})]}),n.jsxs("div",{className:`mt-8 p-4 rounded-lg border ${e?"bg-indigo-900 border-indigo-700":"bg-indigo-50 border-indigo-200"}`,children:[n.jsx("h3",{className:`font-semibold mb-2 ${e?"text-indigo-200":"text-indigo-900"}`,children:t("basic.selectedValues")}),n.jsxs("div",{className:`text-sm space-y-1 ${e?"text-indigo-300":"text-indigo-800"}`,"data-testid":"selected-values-display",children:[n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.text")})," ",i.textInput||t("basic.empty")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.email")})," ",i.emailInput||t("basic.empty")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.number")})," ",i.numberInput||t("basic.empty")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.singleCheckboxLabel")})," ",i.singleCheckbox?t("basic.checked"):t("basic.unchecked")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.multiCheckboxesLabel")})," ",i.multiCheckboxes.join(", ")||t("basic.none")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.radio")})," ",i.radioButton||t("basic.noneSelected")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.staticDropdownLabel")})," ",i.staticDropdown||t("basic.noneSelected")]}),n.jsxs("p",{children:[n.jsx("strong",{children:t("basic.dynamicDropdownLabel")})," ",i.dynamicDropdown||t("basic.noneSelected")]})]})]})]})}function lg({darkMode:e}){const{t}=$e(),[r,a]=v.useState(null),[i,s]=v.useState(["Item A","Item B","Item C"]),[l,o]=v.useState(["Item X","Item Y"]),[c,d]=v.useState(!1),h=(b,p,u)=>{a({item:p,zone:u}),b.dataTransfer.effectAllowed="move"},m=b=>{b.preventDefault(),b.dataTransfer.dropEffect="move"},f=(b,p)=>{if(b.preventDefault(),!r)return;const{item:u,zone:g}=r;g!==p&&(g==="zone1"&&p==="zone2"?(s(i.filter(w=>w!==u)),o([...l,u])):g==="zone2"&&p==="zone1"&&(o(l.filter(w=>w!==u)),s([...i,u])),a(null))},y=()=>{alert("This is an alert box!")},k=()=>{const b=confirm("Do you confirm this action?");alert(b?"You clicked OK":"You clicked Cancel")},x=()=>{const b=prompt("Please enter your name:");b!==null&&alert(`Hello, ${b||"Guest"}!`)};return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"complex-interactions-title",children:t("complex.title")}),n.jsx("p",{className:`mb-6 ${e?"text-gray-300":"text-gray-600"}`,children:t("complex.subtitle")}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("complex.dragDrop")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[n.jsxs("div",{"data-testid":"drop-zone-1",onDragOver:m,onDrop:b=>f(b,"zone1"),className:"p-6 border-2 border-dashed border-indigo-300 rounded-lg bg-indigo-50 min-h-[200px]",children:[n.jsx("h3",{className:"font-semibold text-indigo-900 mb-3",children:t("complex.zone1")}),n.jsx("div",{className:"space-y-2",children:i.map(b=>n.jsx("div",{draggable:!0,"data-testid":`drag-item-${b.toLowerCase().replace(" ","-")}`,onDragStart:p=>h(p,b,"zone1"),className:"px-4 py-2 bg-white border border-indigo-200 rounded cursor-move hover:shadow-md transition-shadow",children:b},b))})]}),n.jsxs("div",{"data-testid":"drop-zone-2",onDragOver:m,onDrop:b=>f(b,"zone2"),className:"p-6 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50 min-h-[200px]",children:[n.jsx("h3",{className:"font-semibold text-purple-900 mb-3",children:t("complex.zone2")}),n.jsx("div",{className:"space-y-2",children:l.map(b=>n.jsx("div",{draggable:!0,"data-testid":`drag-item-${b.toLowerCase().replace(" ","-")}`,onDragStart:p=>h(p,b,"zone2"),className:"px-4 py-2 bg-white border border-purple-200 rounded cursor-move hover:shadow-md transition-shadow",children:b},b))})]})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("complex.hoverMenu")}),n.jsx("div",{className:"mb-6",children:n.jsx("nav",{className:"inline-block bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg",children:n.jsx("ul",{className:"flex","data-testid":"hover-menu",children:["Products","Services","About"].map(b=>n.jsxs("li",{className:"relative group",children:[n.jsxs("button",{"data-testid":`menu-${b.toLowerCase()}`,className:"px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors",children:[b," ▼"]}),n.jsxs("ul",{"data-testid":`submenu-${b.toLowerCase()}`,className:"absolute left-0 top-full mt-1 bg-white rounded-lg shadow-xl w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10",children:[n.jsx("li",{children:n.jsxs("a",{href:"#","data-testid":`submenu-${b.toLowerCase()}-item-1`,className:"block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-t-lg",children:[b," Option 1"]})}),n.jsx("li",{children:n.jsxs("a",{href:"#","data-testid":`submenu-${b.toLowerCase()}-item-2`,className:"block px-4 py-2 text-gray-700 hover:bg-indigo-50",children:[b," Option 2"]})}),n.jsx("li",{children:n.jsxs("a",{href:"#","data-testid":`submenu-${b.toLowerCase()}-item-3`,className:"block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-b-lg",children:[b," Option 3"]})})]})]},b))})})}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("complex.modalsAlerts")}),n.jsxs("div",{className:"flex flex-wrap gap-3 mb-6",children:[n.jsx("button",{"data-testid":"alert-button",onClick:y,className:"px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all",children:t("complex.showAlert")}),n.jsx("button",{"data-testid":"confirm-button",onClick:k,className:"px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transition-all",children:t("complex.showConfirm")}),n.jsx("button",{"data-testid":"prompt-button",onClick:x,className:"px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 shadow-md hover:shadow-lg transition-all",children:t("complex.showPrompt")}),n.jsx("button",{"data-testid":"custom-modal-button",onClick:()=>d(!0),className:"px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 shadow-md hover:shadow-lg transition-all",children:t("complex.showCustomModal")})]}),c&&n.jsx("div",{"data-testid":"modal-backdrop",className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",onClick:()=>d(!1),children:n.jsxs("div",{"data-testid":"modal-content",className:"bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl",onClick:b=>b.stopPropagation(),children:[n.jsx("h3",{className:"text-2xl font-bold text-gray-800 mb-4","data-testid":"modal-title",children:t("complex.customModal")}),n.jsx("p",{className:"text-gray-600 mb-6","data-testid":"modal-text",children:t("complex.modalText")}),n.jsxs("div",{className:"flex gap-3 justify-end",children:[n.jsx("button",{"data-testid":"modal-cancel-button",onClick:()=>d(!1),className:"px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors",children:t("complex.cancel")}),n.jsx("button",{"data-testid":"modal-confirm-button",onClick:()=>{alert("Modal confirmed!"),d(!1)},className:"px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors",children:t("complex.confirm")})]})]})}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("complex.iframeInteraction")}),n.jsxs("div",{className:`p-4 rounded-lg border ${e?"bg-gray-700 border-gray-600":"bg-gray-50 border-gray-200"}`,children:[n.jsx("p",{className:`text-sm mb-3 ${e?"text-gray-300":"text-gray-600"}`,children:t("complex.iframeDescription")}),n.jsx("iframe",{"data-testid":"test-iframe",srcDoc:`
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
          `,className:"w-full h-64 border-2 border-gray-300 rounded-lg",title:"Test Iframe"})]})]})}function og({darkMode:e}){const{t}=$e(),[r,a]=v.useState(null),[i,s]=v.useState(Array.from({length:10},(x,b)=>`Item ${b+1}`)),[l,o]=v.useState(!1),[c,d]=v.useState(null),h=v.useRef(null);v.useEffect(()=>{const x=Math.random()*3e3+3e3,b=setTimeout(()=>{a("✅ Dynamic content loaded successfully after wait!")},x);return()=>clearTimeout(b)},[]),v.useEffect(()=>{class x extends HTMLElement{constructor(){super();const p=this.attachShadow({mode:"open"}),u=document.createElement("button");u.textContent="Shadow DOM Button",u.setAttribute("data-testid","shadow-button"),u.style.cssText="padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;",u.addEventListener("click",()=>{alert("You clicked the Shadow DOM button!")}),p.appendChild(u)}}customElements.get("shadow-component")||customElements.define("shadow-component",x)},[]);const m=()=>{const x=h.current;if(!x||l)return;const{scrollTop:b,scrollHeight:p,clientHeight:u}=x;b+u>=p-10&&f()},f=()=>{o(!0),setTimeout(()=>{const x=Array.from({length:10},(b,p)=>`Item ${i.length+p+1}`);s([...i,...x]),o(!1)},1e3)},y=x=>{const b=x.target.files[0];b&&d({name:b.name,size:`${(b.size/1024).toFixed(2)} KB`,type:b.type})},k=()=>{const x=`This is a sample file for download testing.
Automation Testing Playground
Date: `+new Date().toLocaleString(),b=new Blob([x],{type:"text/plain"}),p=URL.createObjectURL(b),u=document.createElement("a");u.href=p,u.download="sample-file.txt",u.click(),URL.revokeObjectURL(p)};return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"advanced-scenarios-title",children:t("advanced.title")}),n.jsx("p",{className:`mb-6 ${e?"text-gray-300":"text-gray-600"}`,children:t("advanced.subtitle")}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("advanced.shadowDOM")}),n.jsxs("div",{className:`mb-6 p-4 border rounded-lg ${e?"bg-purple-900 border-purple-700":"bg-purple-50 border-purple-200"}`,children:[n.jsx("p",{className:`text-sm mb-3 ${e?"text-purple-200":"text-purple-800"}`,children:t("advanced.shadowDescription")}),n.jsx("shadow-component",{"data-testid":"shadow-host"})]}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("advanced.dynamicContent")}),n.jsx("div",{className:`mb-6 p-6 rounded-lg border ${e?"bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-700":"bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"}`,children:r?n.jsx("div",{"data-testid":"dynamic-content",className:`text-xl font-bold animate-pulse ${e?"text-indigo-200":"text-indigo-900"}`,children:r}):n.jsxs("div",{className:"flex items-center gap-3","data-testid":"loading-indicator",children:[n.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"}),n.jsx("p",{className:`font-medium ${e?"text-indigo-300":"text-indigo-700"}`,children:t("advanced.waitingText")})]})}),n.jsx("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:t("advanced.infiniteScroll")}),n.jsxs("div",{className:"mb-6",children:[n.jsx("p",{className:`text-sm mb-3 ${e?"text-gray-300":"text-gray-600"}`,children:t("advanced.scrollDescription")}),n.jsxs("div",{ref:h,onScroll:m,"data-testid":"infinite-scroll-container",className:`h-80 overflow-y-auto border rounded-lg p-4 ${e?"bg-gray-700 border-gray-600":"bg-white border-gray-300"}`,children:[n.jsx("div",{className:"space-y-2",children:i.map((x,b)=>n.jsx("div",{"data-testid":`scroll-item-${b+1}`,className:"p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-indigo-200",children:x},b))}),l&&n.jsxs("div",{className:"text-center py-4","data-testid":"scroll-loading",children:[n.jsx("div",{className:"inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"}),n.jsx("p",{className:"text-gray-600 mt-2",children:"Loading more items..."})]})]}),n.jsxs("p",{className:`text-sm mt-2 ${e?"text-gray-400":"text-gray-500"}`,children:[t("advanced.itemsCount")," ",n.jsx("span",{"data-testid":"items-count",children:i.length})]})]}),n.jsxs("div",{className:`subsection-title ${e?"text-gray-200":"text-gray-700"}`,children:[t("advanced.fileUpload")," & ",t("advanced.fileDownload")]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[n.jsxs("div",{className:`p-4 border rounded-lg ${e?"bg-green-900 border-green-700":"bg-green-50 border-green-200"}`,children:[n.jsx("h4",{className:`font-semibold mb-3 ${e?"text-green-200":"text-green-900"}`,children:t("advanced.fileUpload")}),n.jsx("input",{type:"file",id:"file-upload","data-testid":"file-upload-input",onChange:y,className:"block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 file:cursor-pointer"}),c&&n.jsxs("div",{"data-testid":"uploaded-file-info",className:"mt-3 p-3 bg-white rounded border border-green-300",children:[n.jsxs("p",{className:"text-sm text-green-900",children:[n.jsx("strong",{children:"File:"})," ",c.name]}),n.jsxs("p",{className:"text-sm text-green-900",children:[n.jsx("strong",{children:"Size:"})," ",c.size]}),n.jsxs("p",{className:"text-sm text-green-900",children:[n.jsx("strong",{children:"Type:"})," ",c.type||"unknown"]})]})]}),n.jsxs("div",{className:`p-4 border rounded-lg ${e?"bg-blue-900 border-blue-700":"bg-blue-50 border-blue-200"}`,children:[n.jsx("h4",{className:`font-semibold mb-3 ${e?"text-blue-200":"text-blue-900"}`,children:t("advanced.fileDownload")}),n.jsxs("button",{"data-testid":"file-download-button",onClick:k,className:"w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all",children:["📥 ",t("advanced.downloadSample")]}),n.jsx("p",{className:"text-xs text-blue-700 mt-3",children:"Click to download a sample text file"})]})]})]})}if(typeof window<"u"&&!customElements.get("shadow-component")){class e extends HTMLElement{constructor(){super();const r=this.attachShadow({mode:"open"}),a=document.createElement("div");a.innerHTML=`
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
      `,r.appendChild(a),r.querySelector("#shadow-button").addEventListener("click",()=>{alert("You successfully clicked the Shadow DOM button!")})}}customElements.define("shadow-component",e)}function cg({darkMode:e}){const{t}=$e(),[r,a]=v.useState(""),[i,s]=v.useState({key:null,direction:"asc"}),[l,o]=v.useState(1),c=5,d=[{id:1,name:"Alice Johnson",email:"alice@example.com",role:"Admin",status:"Active"},{id:2,name:"Bob Smith",email:"bob@example.com",role:"User",status:"Active"},{id:3,name:"Charlie Brown",email:"charlie@example.com",role:"User",status:"Inactive"},{id:4,name:"Diana Prince",email:"diana@example.com",role:"Manager",status:"Active"},{id:5,name:"Edward Norton",email:"edward@example.com",role:"User",status:"Active"},{id:6,name:"Fiona Apple",email:"fiona@example.com",role:"User",status:"Inactive"},{id:7,name:"George Martin",email:"george@example.com",role:"Admin",status:"Active"},{id:8,name:"Helen Troy",email:"helen@example.com",role:"Manager",status:"Active"},{id:9,name:"Ivan Drago",email:"ivan@example.com",role:"User",status:"Inactive"},{id:10,name:"Julia Roberts",email:"julia@example.com",role:"User",status:"Active"}],h=x=>{let b="asc";i.key===x&&i.direction==="asc"&&(b="desc"),s({key:x,direction:b})},m=x=>i.key!==x?"↕":i.direction==="asc"?"↑":"↓",f=v.useMemo(()=>{let x=d.filter(b=>Object.values(b).some(p=>p.toString().toLowerCase().includes(r.toLowerCase())));return i.key&&x.sort((b,p)=>b[i.key]<p[i.key]?i.direction==="asc"?-1:1:b[i.key]>p[i.key]?i.direction==="asc"?1:-1:0),x},[r,i]),y=v.useMemo(()=>{const x=(l-1)*c;return f.slice(x,x+c)},[f,l]),k=Math.ceil(f.length/c);return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"data-table-title",children:t("table.title")}),n.jsx("p",{className:`mb-6 ${e?"text-gray-300":"text-gray-600"}`,children:t("table.subtitle")}),n.jsx("div",{className:"mb-4",children:n.jsx("input",{type:"text","data-testid":"table-search-input",placeholder:`🔍 ${t("table.searchPlaceholder")}`,value:r,onChange:x=>{a(x.target.value),o(1)},className:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"})}),n.jsx("div",{className:"overflow-x-auto rounded-lg border border-gray-200",children:n.jsxs("table",{className:"w-full bg-white","data-testid":"data-table",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsx("tr",{children:["id","name","email","role","status"].map(x=>n.jsx("th",{"data-testid":`table-header-${x}`,onClick:()=>h(x),className:"px-6 py-4 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors",children:n.jsxs("div",{className:"flex items-center gap-2",children:[x.charAt(0).toUpperCase()+x.slice(1),n.jsx("span",{className:"text-sm",children:m(x)})]})},x))})}),n.jsx("tbody",{children:y.length>0?y.map((x,b)=>n.jsxs("tr",{"data-testid":`table-row-${x.id}`,className:`border-b border-gray-200 hover:bg-indigo-50 transition-colors ${b%2===0?"bg-gray-50":"bg-white"}`,children:[n.jsx("td",{className:"px-6 py-4","data-testid":`table-cell-${x.id}-id`,children:x.id}),n.jsx("td",{className:"px-6 py-4 font-medium","data-testid":`table-cell-${x.id}-name`,children:x.name}),n.jsx("td",{className:"px-6 py-4 text-gray-600","data-testid":`table-cell-${x.id}-email`,children:x.email}),n.jsx("td",{className:"px-6 py-4","data-testid":`table-cell-${x.id}-role`,children:n.jsx("span",{className:"px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium",children:x.role})}),n.jsx("td",{className:"px-6 py-4","data-testid":`table-cell-${x.id}-status`,children:n.jsx("span",{className:`px-3 py-1 rounded-full text-sm font-medium ${x.status==="Active"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:x.status})})]},x.id)):n.jsx("tr",{children:n.jsx("td",{colSpan:"5",className:`px-6 py-8 text-center ${e?"text-gray-400":"text-gray-500"}`,"data-testid":"no-results",children:t("table.noResults")})})})]})}),n.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[n.jsxs("p",{className:`text-sm ${e?"text-gray-400":"text-gray-600"}`,"data-testid":"pagination-info",children:[t("table.showing")," ",y.length>0?(l-1)*c+1:0," ",t("table.to")," ",Math.min(l*c,f.length)," ",t("table.of")," ",f.length," ",t("table.entries")]}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("button",{"data-testid":"pagination-prev",onClick:()=>o(Math.max(1,l-1)),disabled:l===1,className:"px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors",children:t("table.previous")}),n.jsx("div",{className:"flex gap-1","data-testid":"pagination-numbers",children:Array.from({length:k},(x,b)=>b+1).map(x=>n.jsx("button",{"data-testid":`pagination-page-${x}`,onClick:()=>o(x),className:`px-4 py-2 font-semibold rounded-lg transition-colors ${l===x?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:x},x))}),n.jsx("button",{"data-testid":"pagination-next",onClick:()=>o(Math.min(k,l+1)),disabled:l===k,className:"px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors",children:"Next"})]})]})]})}const dg=[{id:"login",path:"/login",method:"POST",summary:"User Login",description:"Authenticates a user and returns a token.",tags:["Auth"],parameters:[],translationKey:"login",requestBody:{required:!0,content:{"application/json":{schema:{type:"object",properties:{email:{type:"string",example:"test@example.com"},password:{type:"string",example:"password123"}},required:["email","password"]},example:{email:"test@example.com",password:"password123"}}}},responses:{200:{description:"Login successful, returns user data."},400:{description:"Missing credentials."},404:{description:"User not found."}}},{id:"products",path:"/productsList",method:"GET",summary:"Get All Products",description:"Retrieves a list of all available products.",tags:["Products"],parameters:[],responses:{200:{description:"Returns a list of products."}}},{id:"createOrder",path:"/createOrder",method:"POST",summary:"Create Order",description:"Places a new order for a specific product.",tags:["Order"],parameters:[],requestBody:{required:!0,content:{"application/json":{schema:{type:"object",properties:{productId:{type:"integer",example:1},quantity:{type:"integer",example:2}},required:["productId","quantity"]},example:{productId:1,quantity:2}}}},responses:{201:{description:"Order created successfully."},400:{description:"Invalid input."},404:{description:"Product not found."}}},{id:"getBooks",path:"/books",method:"GET",summary:"Get All Books",description:"Retrieves a list of all available books in the library.",translationKey:"getBooks",tags:["Books"],parameters:[],responses:{200:{description:"List of books",example:[{id:1,title:"The Great Gatsby",author:"F. Scott Fitzgerald"},{id:2,title:"1984",author:"George Orwell"}]}}},{id:"getBookById",path:"/books/:id",method:"GET",summary:"Get Book by ID",description:"Retrieves a specific book using its unique ID.",translationKey:"getBookById",tags:["Books"],parameters:[{name:"id",in:"path",required:!0,description:"ID of the book to retrieve"}],responses:{200:{description:"Book details"},404:{description:"Book not found"}}},{id:"createBook",path:"/books",method:"POST",summary:"Create New Book",description:"Adds a new book to the library.",translationKey:"createBook",tags:["Books"],requestBody:{required:!0,content:{"application/json":{example:{title:"New Book Title",author:"Author Name"}}}},responses:{201:{description:"Book created"},400:{description:"Invalid input"}}},{id:"updateBook",path:"/books/:id",method:"PUT",summary:"Update Book",description:"Updates an existing book's information by ID.",translationKey:"updateBook",tags:["Books"],parameters:[{name:"id",in:"path",required:!0,description:"ID of the book to update"}],requestBody:{required:!0,content:{"application/json":{example:{title:"Updated Title",author:"Updated Author"}}}},responses:{200:{description:"Book updated"},404:{description:"Book not found"}}},{id:"deleteBook",path:"/books/:id",method:"DELETE",summary:"Delete Book",description:"Removes a book from the library permanently.",translationKey:"deleteBook",tags:["Books"],parameters:[{name:"id",in:"path",required:!0,description:"ID of the book to delete"}],responses:{200:{description:"Book deleted"},404:{description:"Book not found"}}}];function ug({onExecute:e,darkMode:t}){const{t:r}=$e(),[a,i]=v.useState(null),[s,l]=v.useState({}),o=y=>{i(a===y?null:y)},c=(y,k,x)=>{l(b=>{var p;return{...b,[y]:{...b[y],params:{...(p=b[y])==null?void 0:p.params,[k]:x}}}})},d=(y,k)=>{l(x=>({...x,[y]:{...x[y],body:k}}))},h=async y=>{const k=s[y.id]||{},x=k.params||{};let b=y.path;Object.keys(x).forEach(u=>{b=b.replace(`:${u}`,x[u]),b=b.replace(`{${u}}`,x[u])});let p=null;if(y.method!=="GET"&&y.requestBody){const u=k.body||JSON.stringify(y.requestBody.content["application/json"].example,null,2);try{p=JSON.parse(u)}catch{alert("Invalid JSON format");return}}e&&await e(y.summary,b,y.method,p)},m=(y,k)=>{var x,b;return((b=(x=s[y])==null?void 0:x.params)==null?void 0:b[k])||""},f=y=>{switch(y){case"GET":return"bg-blue-600";case"POST":return"bg-green-600";case"PUT":return"bg-orange-600";case"DELETE":return"bg-red-600";default:return"bg-gray-600"}};return n.jsxs("div",{className:`mt-8 rounded-xl overflow-hidden border ${t?"border-gray-700 bg-gray-800":"border-gray-200 bg-white"}`,children:[n.jsxs("div",{className:`p-4 border-b ${t?"border-gray-700":"border-gray-200"}`,children:[n.jsxs("h3",{className:`text-xl font-bold flex items-center gap-2 ${t?"text-white":"text-gray-900"}`,children:[n.jsx("span",{children:"📜 API Documentation & Playground"}),n.jsx("span",{className:"text-xs font-normal px-2 py-1 bg-green-100 text-green-800 rounded-full",children:"Swagger UI"}),n.jsx("span",{className:"text-xs font-normal px-2 py-1 bg-blue-100 text-blue-800 rounded-full",children:"v1.2"})]}),n.jsx("p",{className:`mt-1 text-sm ${t?"text-gray-400":"text-gray-600"}`,children:r("api.description")||"Use this interactive documentation to understand and test the API endpoints."})]}),n.jsx("div",{className:"divide-y divide-gray-200 dark:divide-gray-700",children:dg.map(y=>{var w;const k=a===y.id,x=t?"bg-gray-800":"bg-white",b=t?"bg-gray-900":"bg-gray-50",p=y.translationKey?r(`api.endpoints.${y.translationKey}.summary`):y.summary,u=y.translationKey?r(`api.endpoints.${y.translationKey}.description`):y.description,g=((w=s[y.id])==null?void 0:w.body)!==void 0?s[y.id].body:y.requestBody?JSON.stringify(y.requestBody.content["application/json"].example,null,2):"";return n.jsxs("div",{className:`${k?b:x}`,children:[n.jsxs("div",{onClick:()=>o(y.id),className:"flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",children:[n.jsx("span",{className:`px-3 py-1 text-xs font-bold text-white rounded w-20 text-center ${f(y.method)}`,children:y.method}),n.jsx("span",{className:`font-mono font-medium ${t?"text-gray-200":"text-gray-700"}`,children:y.path}),n.jsx("span",{className:`flex-1 text-sm ${t?"text-gray-400":"text-gray-500"}`,children:p}),n.jsx("span",{className:"text-gray-400",children:k?"▼":"▶"})]}),k&&n.jsxs("div",{className:`p-6 border-t ${t?"border-gray-700 text-gray-300":"border-gray-200 text-gray-700"}`,children:[n.jsx("p",{className:"mb-6 text-sm",children:u}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[n.jsx("div",{children:n.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm",children:[n.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider mb-4 border-b pb-2",children:"Parameters"}),y.parameters&&y.parameters.length>0&&n.jsxs("div",{className:"mb-4",children:[n.jsx("h5",{className:"text-xs font-semibold mb-2 text-blue-500",children:"Path Parameters"}),y.parameters.map(S=>n.jsxs("div",{className:"mb-2",children:[n.jsxs("label",{className:"block text-xs mb-1 font-mono",children:[S.name," ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsx("input",{type:"text",value:m(y.id,S.name),placeholder:S.description||`Enter ${S.name}`,className:`w-full px-3 py-1.5 text-sm border rounded ${t?"bg-gray-900 border-gray-600":"bg-gray-50 border-gray-300"}`,onChange:N=>c(y.id,S.name,N.target.value)})]},S.name))]}),y.requestBody?n.jsxs("div",{className:"mb-4",children:[n.jsx("h5",{className:"text-xs font-semibold mb-2 text-green-500",children:"Request Body (JSON)"}),n.jsx("textarea",{value:g,onChange:S=>d(y.id,S.target.value),className:`w-full h-40 font-mono text-sm p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${t?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`})]}):(!y.parameters||y.parameters.length===0)&&n.jsx("p",{className:"text-sm italic text-gray-500 mb-4",children:"No parameters required."}),n.jsx("button",{onClick:()=>h(y),className:`w-full py-2 font-semibold rounded transition shadow-md ${y.method==="GET"?"bg-blue-600 hover:bg-blue-700":y.method==="DELETE"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700"} text-white`,children:"Try it out!"})]})}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500",children:r("api.postmanGuide")}),n.jsx("div",{className:`p-4 rounded-lg text-sm border ${t?"bg-gray-800 border-gray-600":"bg-blue-50 border-blue-100"}`,children:n.jsxs("ul",{className:`space-y-1 ${t?"text-gray-300":"text-gray-700"}`,children:[n.jsx("li",{children:r("api.postmanSteps.step1")}),n.jsx("li",{children:r("api.postmanSteps.step2").replace("{{method}}",y.method)}),n.jsx("li",{children:r("api.postmanSteps.step3").replace("{{url}}",`https://api.automationexercise.com${y.path}`)}),y.requestBody&&n.jsxs(n.Fragment,{children:[n.jsx("li",{children:r("api.postmanSteps.step4")}),n.jsx("li",{children:r("api.postmanSteps.step5")})]}),n.jsx("li",{children:r("api.postmanSteps.step6")})]})})]}),n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500",children:"Example Request"}),n.jsx("div",{className:`p-4 rounded-lg text-sm font-mono overflow-x-auto ${t?"bg-black/40":"bg-slate-900 text-green-300"}`,children:n.jsxs("div",{className:"mb-2",children:[n.jsx("span",{className:"text-yellow-400",children:y.method})," ",n.jsxs("span",{className:"text-white",children:["https://api.automationexercise.com",y.path]})]})})]}),n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500",children:"Response Format"}),n.jsx("div",{className:`p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-60 ${t?"bg-black/40":"bg-gray-100 text-gray-800"}`,children:n.jsx("pre",{children:JSON.stringify(y.responses[200]||y.responses[201]||{},null,2)})})]})]})]})]})]},y.id)})})]})}function pg({darkMode:e}){const{t}=$e(),[r,a]=v.useState({email:"test@example.com",password:"password123"}),[i,s]=v.useState([]),[l,o]=v.useState(!1),[c,d]=v.useState(!1),h=v.useRef(null);v.useEffect(()=>{l&&h.current&&h.current.scrollIntoView({behavior:"smooth"})},[i,l]);const m=async(y,k,x,b=null)=>{d(!0);const p=new Date().toLocaleTimeString(),u="/automationexercise/";let g=k;if(k.startsWith("/")){const N=u.endsWith("/")?u:`${u}/`;k.startsWith(N)||(g=N+k.slice(1))}const w=Date.now(),S={id:w,time:p,name:y,url:g,method:x,body:b,status:"Pending...",response:null};s(N=>[...N,S]);try{const N={method:x,headers:{"Content-Type":"application/json"},body:b?JSON.stringify(b):null},j=await fetch(g,N),P=await j.json();s(L=>L.map(_=>_.id===w?{..._,status:j.status,statusText:j.statusText,response:P}:_)),l||o(!0)}catch(N){s(j=>j.map(P=>P.id===w?{...P,status:"Error",response:{message:N.message}}:P))}finally{d(!1)}},f=()=>s([]);return n.jsxs("div",{className:`section-card ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsxs("div",{className:"flex justify-between items-start mb-6",children:[n.jsxs("div",{children:[n.jsx("h2",{className:`section-title ${e?"text-white":"text-gray-800"}`,"data-testid":"api-simulation-title",children:t("api.title")}),n.jsx("p",{className:`mb-2 ${e?"text-gray-300":"text-gray-600"}`,children:t("api.subtitle")})]}),n.jsxs("button",{onClick:()=>o(!0),className:"flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors",children:[n.jsx("span",{children:"📊 View API Logs"}),i.length>0&&n.jsx("span",{className:"bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full",children:i.length})]})]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[n.jsxs("div",{className:`p-6 rounded-xl border ${e?"bg-gray-700/50 border-gray-600":"bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200"}`,children:[n.jsx("h3",{className:`text-lg font-semibold mb-4 ${e?"text-indigo-300":"text-indigo-900"}`,children:"🔐 User Login Simulation"}),n.jsxs("div",{className:"space-y-4 mb-4",children:[n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:"Email"}),n.jsx("input",{type:"text",value:r.email,onChange:y=>a({...r,email:y.target.value}),className:`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${e?"bg-gray-800 border-gray-600 text-white":"border-gray-300"}`})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:"Password"}),n.jsx("input",{type:"password",value:r.password,onChange:y=>a({...r,password:y.target.value}),className:`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${e?"bg-gray-800 border-gray-600 text-white":"border-gray-300"}`})]})]}),n.jsx("button",{onClick:()=>m("Login","/login","POST",r),disabled:c,className:"w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md",children:c?"Requesting...":"POST /login"})]}),n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{className:`p-6 rounded-xl border ${e?"bg-gray-700/50 border-gray-600":"bg-blue-50 border-blue-200"}`,children:[n.jsx("h3",{className:`text-lg font-semibold mb-2 ${e?"text-blue-300":"text-blue-900"}`,children:"📦 Get Products List"}),n.jsx("p",{className:`text-sm mb-4 ${e?"text-gray-400":"text-gray-600"}`,children:"Fetch all available products from the mock database."}),n.jsx("button",{onClick:()=>m("Get Products","/productsList","GET"),disabled:c,className:"w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md",children:"GET /productsList"})]}),n.jsxs("div",{className:`p-6 rounded-xl border ${e?"bg-gray-700/50 border-gray-600":"bg-emerald-50 border-emerald-200"}`,children:[n.jsx("h3",{className:`text-lg font-semibold mb-2 ${e?"text-emerald-300":"text-emerald-900"}`,children:"🛒 Create Order"}),n.jsx("p",{className:`text-sm mb-4 ${e?"text-gray-400":"text-gray-600"}`,children:"Simulate placing an order for 'Blue Top' (ID: 1)."}),n.jsx("button",{onClick:()=>m("Create Order","/createOrder","POST",{productId:1,quantity:2}),disabled:c,className:"w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-md",children:"POST /createOrder"})]})]})]}),n.jsx(ug,{darkMode:e,onExecute:m}),l&&n.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",children:n.jsxs("div",{className:`w-full max-w-4xl max-h-[80vh] flex flex-col rounded-xl shadow-2xl ${e?"bg-gray-900 text-gray-100":"bg-white text-gray-800"}`,children:[n.jsxs("div",{className:`flex items-center justify-between p-4 border-b ${e?"border-gray-700":"border-gray-200"}`,children:[n.jsxs("h3",{className:"text-xl font-bold flex items-center gap-2",children:["📡 Network Log",n.jsx("span",{className:"text-xs font-normal px-2 py-1 bg-gray-200 text-gray-800 rounded-full",children:"Live"})]}),n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("button",{onClick:f,className:"px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded transition",children:"Clear Logs"}),n.jsx("button",{onClick:()=>o(!1),className:"p-2 hover:bg-gray-200 rounded-full dark:hover:bg-gray-700 transition",children:"✕"})]})]}),n.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20",children:[i.length===0?n.jsx("div",{className:"text-center py-10 text-gray-400",children:"No requests yet. Click a button to simulate an API call."}):i.map(y=>n.jsxs("div",{className:`border rounded-lg overflow-hidden shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsxs("div",{className:`flex items-center justify-between px-4 py-3 border-b ${e?"bg-gray-700/50 border-gray-700":"bg-gray-50 border-gray-100"}`,children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("span",{className:`font-mono text-xs px-2 py-1 rounded ${y.method==="GET"?"bg-blue-100 text-blue-800":"bg-green-100 text-green-800"}`,children:y.method}),n.jsx("span",{className:"font-mono text-sm font-semibold",children:y.url}),n.jsxs("span",{className:"text-xs text-gray-500",children:["(",y.time,")"]})]}),n.jsx("div",{children:typeof y.status=="number"?n.jsxs("span",{className:`px-2 py-1 rounded text-xs font-bold ${y.status>=200&&y.status<300?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:[y.status," ",y.statusText]}):n.jsx("span",{className:"text-xs text-gray-500 animate-pulse",children:y.status})})]}),n.jsxs("div",{className:"p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono",children:[y.body&&n.jsxs("div",{className:"space-y-1",children:[n.jsx("p",{className:"text-xs font-bold text-gray-500 uppercase",children:"Request Body"}),n.jsx("pre",{className:`p-2 rounded overflow-x-auto ${e?"bg-black/30":"bg-gray-100"}`,children:JSON.stringify(y.body,null,2)})]}),y.response&&n.jsxs("div",{className:"space-y-1 md:col-span-2",children:[n.jsx("p",{className:"text-xs font-bold text-gray-500 uppercase",children:"Response Body"}),n.jsx("pre",{className:`p-2 rounded overflow-x-auto ${e?"bg-black/30":"bg-gray-100"}`,children:JSON.stringify(y.response,null,2)})]})]})]},y.id)),n.jsx("div",{ref:h})]})]})})]})}function mg({darkMode:e}){return n.jsxs("div",{className:`section-card max-w-7xl mx-auto transition-colors duration-300 ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx("h1",{className:`text-4xl font-bold mb-6 ${e?"text-white":"text-gray-900"}`,"data-testid":"comparison-title",children:"🔍 Cypress, Selenium ve Playwright Komut Karşılaştırması"}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:`text-3xl font-bold mb-6 ${e?"text-indigo-300":"text-indigo-900"}`,children:"1. Genel Bakış"}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[n.jsxs("div",{className:"p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-green-900 mb-3",children:"🌲 Cypress"}),n.jsxs("ul",{className:"text-sm text-green-800 space-y-2",children:[n.jsx("li",{children:"• Node.js tabanlı, JavaScript/TypeScript"}),n.jsx("li",{children:"• Chrome, Firefox, Edge, Electron destekler"}),n.jsx("li",{children:"• Real-time reload ve otomatik bekleme"}),n.jsx("li",{children:"• Screenshot ve video kaydı"})]})]}),n.jsxs("div",{className:"p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-orange-900 mb-3",children:"🔶 Selenium"}),n.jsxs("ul",{className:"text-sm text-orange-800 space-y-2",children:[n.jsx("li",{children:"• Çoklu dil desteği (Java, Python, C#, JS vb.)"}),n.jsx("li",{children:"• Geniş tarayıcı ve platform desteği"}),n.jsx("li",{children:"• WDIO, Selenium Grid gibi ekosistem"}),n.jsx("li",{children:"• Daha eski, olgun bir teknoloji"})]})]}),n.jsxs("div",{className:"p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-blue-900 mb-3",children:"🎭 Playwright"}),n.jsxs("ul",{className:"text-sm text-blue-800 space-y-2",children:[n.jsx("li",{children:"• Microsoft geliştiricisi"}),n.jsx("li",{children:"• Chrome, Firefox, WebKit destekler"}),n.jsx("li",{children:"• Otomatik bekleme ve network mocking"}),n.jsx("li",{children:"• Multi-tab, multi-origin desteği"})]})]})]})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:`text-3xl font-bold mb-6 ${e?"text-indigo-300":"text-indigo-900"}`,children:"2. Temel Komutlar - Sayfaya Gitme"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:`w-full border rounded-lg ${e?"bg-gray-700 border-gray-600":"bg-white border-gray-200"}`,children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"URL'ye git"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded",children:"cy.visit('/')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'driver.get("https://...")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.goto('https://...')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Geri git"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded",children:"cy.go('back')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"driver.navigate().back()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.goBack()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"İleri git"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded",children:"cy.go('forward')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"driver.navigate().forward()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.goForward()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Yenile"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded",children:"cy.reload()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"driver.navigate().refresh()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.reload()"})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"3. Element Bulma ve Doğrulama"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Element bul (CSS)"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'driver.findElement(By.css(".btn"))'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.locator('.btn')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"İç metinle bul"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.contains('Kaydet')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:`By.xpath("//*[text()='Kaydet']")`})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.getByText('Kaydet')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Görünür mü"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"should('be.visible')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"element.isDisplayed()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"toBeVisible()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Text kontrol"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"should('have.text', 'Başlık')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'getText().equals("Başlık")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"toHaveText('Başlık')"})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"4. Tıklama İşlemleri"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Normal tık"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn').click()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"element.click()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.click()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Sağ tık"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn').rightclick()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"Actions.contextClick()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["click(","{","button: 'right'","}",")"]})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Çift tık"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn').dblclick()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"Actions.doubleClick()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.dblclick()"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Checkbox işaretle"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:`cy.get('[type="checkbox"]').check()`})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"element.click()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.check()"})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"5. Form İşlemleri"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Text yaz"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('input').type('text')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'element.sendKeys("text")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.fill('text')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Temizle ve yaz"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"clear().type('yeni')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'element.clear(); sendKeys("yeni")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"locator.fill('yeni')"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Dropdown (value)"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"select('value')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'Select().selectByValue("value")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["selectOption(","{","value: 'value'","}",")"]})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Dropdown (text)"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"select('Metin')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:'selectByVisibleText("Metin")'})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["selectOption(","{","label: 'Metin'","}",")"]})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"6. Bekleme İşlemleri"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"İşlem"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Sabit bekleme"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.wait(1000)"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"Thread.sleep(1000)"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:"page.waitForTimeout(1000)"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Element görünene kadar"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"cy.get('.btn').should('be.visible')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"WebDriverWait.visibilityOf()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["waitFor(","{","state: 'visible'","}",")"]})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Element kaybolana kadar"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-green-100 text-green-800 px-2 py-1 rounded text-xs",children:"should('not.exist')"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("code",{className:"bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs",children:"invisibilityOf()"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsxs("code",{className:"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs",children:["waitFor(","{","state: 'hidden'","}",")"]})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"7. Performans Karşılaştırması"}),n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full bg-white border border-gray-200 rounded-lg",children:[n.jsx("thead",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Kriter"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Cypress"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Selenium"}),n.jsx("th",{className:"px-6 py-4 text-left font-semibold",children:"Playwright"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Hız"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Öğrenme kolaylığı"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Tarayıcı desteği"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"API test desteği"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})})]}),n.jsxs("tr",{className:"border-b border-gray-200 hover:bg-indigo-50",children:[n.jsx("td",{className:"px-6 py-4 font-medium",children:"Paralel test"}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐"})}),n.jsx("td",{className:"px-6 py-4",children:n.jsx("span",{className:"text-yellow-500",children:"⭐⭐⭐⭐⭐"})})]})]})]})})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"8. Ne Zaman Hangi Aracı Kullanmalı?"}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[n.jsxs("div",{className:"p-6 bg-green-50 border-2 border-green-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-green-900 mb-4",children:"🌲 Cypress Seçin Eğer:"}),n.jsxs("ul",{className:"text-sm text-green-800 space-y-2 list-disc list-inside",children:[n.jsx("li",{children:"Frontend odaklı proje (React, Vue, Angular)"}),n.jsx("li",{children:"Hızlı kurulum ve öğrenme istiyorsanız"}),n.jsx("li",{children:"Modern JavaScript/TypeScript stack"}),n.jsx("li",{children:"Chrome/Firefox testi yeterli ise"})]})]}),n.jsxs("div",{className:"p-6 bg-orange-50 border-2 border-orange-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-orange-900 mb-4",children:"🔶 Selenium Seçin Eğer:"}),n.jsxs("ul",{className:"text-sm text-orange-800 space-y-2 list-disc list-inside",children:[n.jsx("li",{children:"Çoklu dil desteği gerekiyorsa"}),n.jsx("li",{children:"Eski bir sistemle entegrasyon"}),n.jsx("li",{children:"Geniş tarayıcı/cihaz desteği"}),n.jsx("li",{children:"Selenium Grid ile dağıtık test"})]})]}),n.jsxs("div",{className:"p-6 bg-blue-50 border-2 border-blue-300 rounded-xl",children:[n.jsx("h3",{className:"text-xl font-bold text-blue-900 mb-4",children:"🎭 Playwright Seçin Eğer:"}),n.jsxs("ul",{className:"text-sm text-blue-800 space-y-2 list-disc list-inside",children:[n.jsx("li",{children:"Modern web uygulamaları"}),n.jsx("li",{children:"Multi-tab, iframe, service worker testi"}),n.jsx("li",{children:"Network mocking ve interception"}),n.jsx("li",{children:"Cross-browser (WebKit dahil) test"})]})]})]})]}),n.jsxs("section",{className:"mb-12",children:[n.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"9. Örnek: Login Formu Testi"}),n.jsxs("div",{className:"grid grid-cols-1 gap-6",children:[n.jsxs("div",{className:"p-6 bg-green-50 border-l-4 border-green-500 rounded-lg",children:[n.jsx("h4",{className:"font-bold text-green-900 mb-3",children:"🌲 Cypress"}),n.jsx("pre",{className:"bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm",children:`describe('Login Test', () => {
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
});`})]})]})]}),n.jsx("section",{className:"mb-8",children:n.jsxs("div",{className:"p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl",children:[n.jsx("h2",{className:"text-3xl font-bold mb-4",children:"💡 Sonuç"}),n.jsx("p",{className:"text-lg mb-4",children:"Her araç kendi güçlü yönlerine sahiptir:"}),n.jsxs("ul",{className:"space-y-2 text-indigo-100",children:[n.jsxs("li",{children:["• ",n.jsx("strong",{children:"Cypress:"})," Geliştirici dostu, hızlı feedback, mükemmel debugging"]}),n.jsxs("li",{children:["• ",n.jsx("strong",{children:"Selenium:"})," Olgun, esnek, geniş dil ve tarayıcı desteği"]}),n.jsxs("li",{children:["• ",n.jsx("strong",{children:"Playwright:"})," Modern, hızlı, güçlü API ve network kontrolü"]})]}),n.jsx("p",{className:"mt-4 text-indigo-100",children:"Proje gereksinimlerinize, ekibinizin becerilerine ve test kapsamınıza göre en uygun aracı seçin."})]})})]})}const hg=({darkMode:e})=>{const{t}=$e(),[r,a]=v.useState("comparison");return n.jsxs("div",{className:`locator-guide-container ${e?"dark-mode":""}`,children:[n.jsxs("header",{children:[n.jsx("h1",{children:t("locator.title")}),n.jsx("p",{className:"subtitle",children:t("locator.subtitle")})]}),n.jsxs("div",{className:"nav-tabs",children:[n.jsx("button",{className:`tab-btn ${r==="comparison"?"active":""}`,onClick:()=>a("comparison"),children:t("locator.tabs.comparison")}),n.jsx("button",{className:`tab-btn ${r==="playwright-only"?"active":""}`,onClick:()=>a("playwright-only"),children:t("locator.tabs.playwrightOnly")})]}),r==="comparison"&&n.jsxs("div",{id:"comparison",className:"content-section active",children:[n.jsxs("div",{className:"example-card",children:[n.jsxs("span",{className:"example-number",children:[t("locator.headers.example")," 1"]}),n.jsxs("div",{className:"html-section",children:[n.jsx("div",{className:"html-title",children:t("locator.headers.html")}),n.jsx("pre",{children:n.jsx("code",{children:'<input type="text" id="username" />'})})]}),n.jsxs("div",{className:"code-comparison",children:[n.jsxs("div",{className:"code-block",children:[n.jsx("div",{className:"code-header selenium-header",children:t("locator.headers.selenium")}),n.jsx("div",{className:"code-content",children:n.jsx("pre",{children:n.jsx("code",{children:`WebElement element = driver
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
]);`})})]}),n.jsxs("div",{className:"tip-box",children:[n.jsx("strong",{children:t("locator.tips.prefix")})," ",t("locator.tips.pw20")]})]})]})]})};function yg({darkMode:e,onHomeClick:t}){const{t:r}=$e(),a=(E,B)=>{const $=new Date().toLocaleTimeString("tr-TR");console.log(`[${$}] [${E.toUpperCase()}] ${B}`)},[i,s]=v.useState({name:"",email:"",phone:"",address:""}),[l,o]=v.useState({gender:"",days:[],country:"",colors:[]}),[c,d]=v.useState({standard:"",rangeStart:"",rangeEnd:""}),[h,m]=v.useState(50),[f,y]=v.useState(!1),[k,x]=v.useState(!1),[b,p]=v.useState(!1),[u,g]=v.useState([]),[w,S]=v.useState(1),[N,j]=v.useState({});v.useEffect(()=>{P("Uygulama Bahçesi (Practice Playground) Başlatıldı"),P("Test Tanıtım Bloğu: Bu sayfa UI otomasyon testleri için çeşitli senaryolar barındırır.")},[]);const P=E=>a("info",E),L=E=>a("step",E),_=(E,B)=>{s($=>({...$,[E]:B})),L(`Kişisel Bilgi güncellendi: ${E} = ${B}`)},X=(E,B)=>{if(E==="days"){const $=l.days.includes(B)?l.days.filter(de=>de!==B):[...l.days,B];o(de=>({...de,days:$})),L(`Gün seçimi güncellendi: ${$.join(", ")}`)}else if(E==="colors"){const $=Array.from(B).map(de=>de.value);o(de=>({...de,colors:$})),L(`Renk seçimi güncellendi: ${$.join(", ")}`)}else o($=>({...$,[E]:B})),L(`${E} seçimi güncellendi: ${B}`)},Ye=[{id:1,name:"Google",contact:"Maria Anders",country:"USA"},{id:2,name:"Meta",contact:"Francisco Chang",country:"Mexico"},{id:3,name:"Amazon",contact:"Roland Mendel",country:"Austria"}],Ie=Array.from({length:20},(E,B)=>({id:B+1,name:`Product ${B+1}`,price:`$${(B+1)*10}`})),Qe=5,ye=Math.ceil(Ie.length/Qe),Tr=Ie.slice((w-1)*Qe,w*Qe),Gt=(E,B)=>{const $=Array.from(E.target.files);g(de=>B?[...de,...$]:$),L(`${B?"Çoklu":"Tekli"} dosya yüklendi: ${$.map(de=>de.name).join(", ")}`)},C=E=>{y(!0),L("Sürükleme işlemi başladı")},A=E=>{E.preventDefault(),x(!0),y(!1),L("Öğe başarıyla bırakıldı (Drop)")},I=()=>{p(!0),L("Çift tıklama tetiklendi"),setTimeout(()=>p(!1),2e3)},U=()=>n.jsx("button",{onClick:t,title:r("practice.homeTooltip"),className:"absolute top-4 right-4 text-2xl hover:scale-120 transition-transform cursor-pointer opacity-70 hover:opacity-100","data-testid":"home-icon-nav",children:"🏠"});return n.jsxs("div",{className:"space-y-8 pb-20",children:[n.jsxs("div",{className:`text-center mb-12 p-8 rounded-2xl shadow-lg border ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-100"}`,children:[n.jsx("h1",{className:`text-3xl font-bold mb-2 ${e?"text-white":"text-gray-900"}`,children:r("practice.title")}),n.jsx("p",{className:`${e?"text-gray-400":"text-gray-600"}`,children:r("practice.subtitle")})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[n.jsxs("section",{className:`relative p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(U,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.personalInfo.title")}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.personalInfo.name")}),n.jsx("input",{type:"text","data-testid":"name",placeholder:r("practice.personalInfo.namePlaceholder"),className:`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:i.name,onChange:E=>_("name",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.personalInfo.email")}),n.jsx("input",{type:"email","data-testid":"email",placeholder:r("practice.personalInfo.emailPlaceholder"),className:`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:i.email,onChange:E=>_("email",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.personalInfo.phone")}),n.jsx("input",{type:"tel","data-testid":"phone",placeholder:r("practice.personalInfo.phonePlaceholder"),className:`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:i.phone,onChange:E=>_("phone",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.personalInfo.address")}),n.jsx("textarea",{"data-testid":"textarea",rows:"3",placeholder:r("practice.personalInfo.addressPlaceholder"),className:`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:i.address,onChange:E=>_("address",E.target.value)})]})]})]}),n.jsxs("section",{className:`relative p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(U,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.selections.title")}),n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.selections.gender")}),n.jsxs("div",{className:"flex gap-4",children:[n.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[n.jsx("input",{type:"radio",value:"male",checked:l.gender==="male",onChange:E=>X("gender",E.target.value),className:"w-4 h-4 text-blue-600","data-testid":"male",name:"gender"}),n.jsx("span",{className:`${e?"text-gray-300":"text-gray-600"}`,children:r("practice.selections.male")})]}),n.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[n.jsx("input",{type:"radio",value:"female",checked:l.gender==="female",onChange:E=>X("gender",E.target.value),className:"w-4 h-4 text-pink-600","data-testid":"female",name:"gender"}),n.jsx("span",{className:`${e?"text-gray-300":"text-gray-600"}`,children:r("practice.selections.female")})]})]})]}),n.jsxs("div",{children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.selections.days")}),n.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-2",children:["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(E=>n.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[n.jsx("input",{type:"checkbox",value:E,checked:l.days.includes(E),onChange:B=>X("days",B.target.value),className:"rounded text-blue-600","data-testid":E}),n.jsx("span",{className:`text-sm ${e?"text-gray-300":"text-gray-600"}`,children:r(`practice.selections.${E}`)})]},E))})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.selections.country")}),n.jsxs("select",{"data-testid":"country",className:`w-full px-4 py-2 rounded-lg border outline-none ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:l.country,onChange:E=>X("country",E.target.value),children:[n.jsx("option",{value:"",children:"---"}),n.jsx("option",{value:"tr",children:"Turkey"}),n.jsx("option",{value:"uk",children:"United Kingdom"}),n.jsx("option",{value:"us",children:"USA"}),n.jsx("option",{value:"ca",children:"Canada"}),n.jsx("option",{value:"de",children:"Germany"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.selections.colors")}),n.jsxs("select",{multiple:!0,"data-testid":"colors",className:`w-full h-32 px-2 py-1 rounded-lg border outline-none ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,onChange:E=>X("colors",E.target.selectedOptions),children:[n.jsx("option",{value:"red",children:"Red"}),n.jsx("option",{value:"blue",children:"Blue"}),n.jsx("option",{value:"green",children:"Green"}),n.jsx("option",{value:"yellow",children:"Yellow"}),n.jsx("option",{value:"purple",children:"Purple"}),n.jsx("option",{value:"white",children:"White"})]}),n.jsxs("p",{className:"mt-2 text-xs text-gray-500",children:[r("practice.selections.selectedColors")," ",l.colors.join(", ")]})]})]})]}),n.jsxs("section",{className:`relative p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(U,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.datePickers.title")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-1 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.datePickers.standard")}),n.jsx("input",{type:"date","data-testid":"datepicker",className:`w-full px-4 py-2 rounded-lg border ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,value:c.standard,onChange:E=>{d({...c,standard:E.target.value}),L(`Standart tarih seçildi: ${E.target.value}`)}})]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("label",{className:`block text-sm font-medium ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.datePickers.range")}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("input",{type:"date","data-testid":"start-date",className:`w-full px-2 py-1 rounded-lg border text-sm ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,onChange:E=>d({...c,rangeStart:E.target.value})}),n.jsx("input",{type:"date","data-testid":"end-date",className:`w-full px-2 py-1 rounded-lg border text-sm ${e?"bg-gray-900 border-gray-600 text-white":"bg-gray-50 border-gray-300"}`,onChange:E=>d({...c,rangeEnd:E.target.value})})]})]})]})]}),n.jsxs("section",{className:`relative p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(U,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.interactions.title")}),n.jsxs("div",{className:"space-y-8",children:[n.jsxs("div",{children:[n.jsxs("label",{className:`block text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:[r("practice.interactions.slider")," [Value: ",h,"]"]}),n.jsx("input",{type:"range","data-testid":"slider",min:"0",max:"100",value:h,onChange:E=>{m(E.target.value),L(`Slider değeri değişti: ${E.target.value}`)},className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[n.jsxs("div",{children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.interactions.dragDrop")}),n.jsxs("div",{className:"flex gap-4",children:[!k&&n.jsx("div",{draggable:!0,onDragStart:C,"data-testid":"draggable",className:"w-16 h-16 bg-blue-500 text-white text-[10px] rounded flex items-center justify-center cursor-move select-none animate-pulse",children:r("practice.interactions.dragMe")}),n.jsx("div",{onDragOver:E=>E.preventDefault(),onDrop:A,"data-testid":"droppable",className:`w-24 h-24 border-2 border-dashed rounded flex items-center justify-center text-xs text-center p-2 transition-all ${k?"bg-green-100 border-green-500 text-green-700":e?"border-gray-600 text-gray-500":"border-gray-300 text-gray-400"}`,children:k?"✅ Success!":r("practice.interactions.dropHere")})]})]}),n.jsxs("div",{children:[n.jsx("p",{className:`text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.interactions.doubleClick")}),n.jsx("button",{onDoubleClick:I,"data-testid":"double-click",className:`px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 ${b?"bg-purple-600 text-white":"bg-gray-200 text-gray-800 hover:bg-gray-300"}`,children:b?r("practice.interactions.doubleClickResult"):"Click x2"})]})]})]})]}),n.jsxs("section",{className:`relative lg:col-span-2 p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(U,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.tables.title")}),n.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-8",children:[n.jsxs("div",{children:[n.jsxs("p",{className:`text-sm font-bold mb-3 ${e?"text-gray-400":"text-gray-600 opacity-70"}`,children:["[STATIK] ",r("practice.tables.static")]}),n.jsx("div",{className:"overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",children:n.jsxs("table",{className:"w-full text-sm text-left","data-testid":"static-table",children:[n.jsx("thead",{className:`${e?"bg-gray-700 text-gray-200":"bg-gray-50 text-gray-700"}`,children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-4 py-2 border-b",children:"ID"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Name"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Contact"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Country"})]})}),n.jsx("tbody",{className:e?"text-gray-300":"text-gray-600",children:Ye.map(E=>n.jsxs("tr",{className:"border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",children:[n.jsx("td",{className:"px-4 py-2",children:E.id}),n.jsx("td",{className:"px-4 py-2",children:E.name}),n.jsx("td",{className:"px-4 py-2",children:E.contact}),n.jsx("td",{className:"px-4 py-2",children:E.country})]},E.id))})]})})]}),n.jsxs("div",{children:[n.jsxs("p",{className:`text-sm font-bold mb-3 ${e?"text-gray-400":"text-gray-600 opacity-70"}`,children:["[PAGINATION] ",r("practice.tables.pagination")]}),n.jsx("div",{className:"overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",children:n.jsxs("table",{className:"w-full text-sm text-left","data-testid":"pagination-table",children:[n.jsx("thead",{className:`${e?"bg-gray-700 text-gray-200":"bg-gray-50 text-gray-700"}`,children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-4 py-2 border-b",children:"#"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Product"}),n.jsx("th",{className:"px-4 py-2 border-b",children:"Price"})]})}),n.jsx("tbody",{className:e?"text-gray-300":"text-gray-600",children:Tr.map(E=>n.jsxs("tr",{className:"border-b dark:border-gray-700",children:[n.jsx("td",{className:"px-4 py-2",children:E.id}),n.jsx("td",{className:"px-4 py-2",children:E.name}),n.jsx("td",{className:"px-4 py-2 font-mono text-blue-600 dark:text-blue-400",children:E.price})]},E.id))})]})}),n.jsxs("div",{className:"flex items-center justify-between mt-4",children:[n.jsx("button",{onClick:()=>{S(E=>Math.max(1,E-1)),L(`Tablo sayfa değiştirildi: ${w-1}`)},disabled:w===1,className:"px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50 text-xs",children:"Previous"}),n.jsxs("span",{className:"text-xs font-medium",children:["Page ",w," of ",ye]}),n.jsx("button",{onClick:()=>{S(E=>Math.min(ye,E+1)),L(`Tablo sayfa değiştirildi: ${w+1}`)},disabled:w===ye,className:"px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50 text-xs",children:"Next"})]})]})]})]}),n.jsxs("section",{className:`relative lg:col-span-2 p-6 rounded-xl border shadow-sm ${e?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`,children:[n.jsx(U,{}),n.jsx("h2",{className:`text-xl font-bold mb-6 flex items-center gap-2 ${e?"text-white":"text-gray-800"}`,children:r("practice.files.title")}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.files.single")}),n.jsx("input",{type:"file","data-testid":"single-file-upload",className:"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer",onChange:E=>Gt(E,!1)})]}),n.jsxs("div",{children:[n.jsx("label",{className:`block text-sm font-medium mb-2 ${e?"text-gray-300":"text-gray-700"}`,children:r("practice.files.multiple")}),n.jsx("input",{type:"file",multiple:!0,"data-testid":"multi-file-upload",className:"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer",onChange:E=>Gt(E,!0)})]})]}),u.length>0&&n.jsxs("div",{className:"mt-4 p-4 rounded bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800",children:[n.jsx("p",{className:"text-xs font-bold mb-2 uppercase text-gray-400",children:"Yüklenen Dosyalar:"}),n.jsx("ul",{className:"text-xs space-y-1",children:u.map((E,B)=>n.jsxs("li",{className:"flex items-center gap-2 text-blue-600 dark:text-blue-400",children:["📄 ",E.name," (",(E.size/1024).toFixed(1)," KB)"]},B))})]})]})]})]})}function gg(){const{language:e,t,toggleLanguage:r}=$e(),a=dl(),[i,s]=v.useState("basic"),[l,o]=v.useState(()=>{const h=localStorage.getItem("darkMode");return h!==null?JSON.parse(h):!0});v.useEffect(()=>{localStorage.setItem("darkMode",JSON.stringify(l))},[l]);const c=[{id:"basic",name:t("nav.basic")},{id:"locator-guide",name:t("nav.locatorGuide")},{id:"complex",name:t("nav.complex")},{id:"advanced",name:t("nav.advanced")},{id:"table",name:t("nav.table")},{id:"api",name:t("nav.api")},{id:"comparison",name:t("nav.comparison")},{id:"practice",name:t("nav.practice")||"🛠️ Uygulama Bahçesi"}],d=()=>{switch(i){case"basic":return n.jsx(Do,{darkMode:l});case"locator-guide":return n.jsx(hg,{darkMode:l});case"complex":return n.jsx(lg,{darkMode:l});case"advanced":return n.jsx(og,{darkMode:l});case"table":return n.jsx(cg,{darkMode:l});case"api":return n.jsx(pg,{darkMode:l});case"comparison":return n.jsx(mg,{darkMode:l});case"practice":return n.jsx(yg,{darkMode:l,onHomeClick:()=>s("basic")});default:return n.jsx(Do,{darkMode:l})}};return n.jsxs("div",{className:`min-h-screen transition-colors duration-300 ${l?"dark-mode bg-gray-900":"bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"}`,children:[n.jsx("header",{className:`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${l?"bg-gray-800":"bg-gradient-to-r from-indigo-600 to-purple-600"}`,children:n.jsx("div",{className:"container mx-auto px-6 py-8",children:n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("div",{className:"flex flex-col items-center gap-2",children:n.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),title:t("buttons.homeTooltip"),className:`text-4xl hover:scale-110 transition-transform duration-200 cursor-pointer ${l?"hover:text-yellow-400":"hover:text-yellow-300"}`,children:"🏠"})}),n.jsxs("div",{className:"flex-1 text-center",children:[n.jsx("h1",{className:"text-4xl font-bold mb-2 text-white","data-testid":"main-title",children:t("header.title")}),n.jsx("p",{className:`text-lg ${l?"text-gray-300":"text-indigo-100"}`,children:t("header.subtitle")})]}),n.jsxs("div",{className:"flex gap-3",children:[n.jsxs("div",{className:"flex bg-white rounded-lg overflow-hidden","data-testid":"language-toggle",children:[n.jsx("button",{onClick:()=>e==="tr"&&r(),className:`px-4 py-2 font-semibold transition-all duration-300 ${e==="en"?"bg-indigo-600 text-white":"bg-white text-gray-800 hover:bg-gray-100"}`,children:"ENG"}),n.jsx("button",{onClick:()=>e==="en"&&r(),className:`px-4 py-2 font-semibold transition-all duration-300 ${e==="tr"?"bg-indigo-600 text-white":"bg-white text-gray-800 hover:bg-gray-100"}`,children:"TR"})]}),n.jsx("button",{onClick:()=>o(!l),"data-testid":"dark-mode-toggle",className:`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${l?"bg-yellow-400 text-gray-900 hover:bg-yellow-300":"bg-gray-800 text-white hover:bg-gray-700"}`,children:l?`☀️ ${t("buttons.lightMode")}`:`🌙 ${t("buttons.darkMode")}`})]})]})})}),n.jsx("nav",{className:`shadow-md sticky top-0 z-40 transition-colors duration-300 ${l?"bg-gray-800":"bg-white"}`,"data-testid":"main-navigation",children:n.jsx("div",{className:"container mx-auto px-6",children:n.jsxs("div",{className:"flex flex-wrap gap-2 justify-center py-4",children:[n.jsx("a",{href:"https://hasankocaman.github.io/teach-Cypress/",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${l?"bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"}`,children:e==="tr"?"Cypress Öğren":"Learn Cypress"}),n.jsx("a",{href:"https://hasankocaman.github.io/teachPlaywright/",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${l?"bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"}`,children:e==="tr"?"Playwright Öğren":"Learn Playwright"}),n.jsx("a",{href:"https://hasankocaman.github.io/boltJSTScompare/",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${l?"bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"}`,children:e==="tr"?"JavaScript ve TypeScript Karşılaştırma":"JavaScript and TypeScript compare"}),n.jsx("div",{className:`w-px h-8 self-center mx-1 ${l?"bg-gray-600":"bg-gray-300"}`}),n.jsx("button",{onClick:()=>a("/jmeter"),"data-testid":"nav-jmeter",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${l?"bg-gray-700 text-orange-300 hover:bg-orange-900 hover:text-orange-200 hover:scale-102":"bg-orange-50 text-orange-700 hover:bg-orange-100 hover:scale-102"}`,children:t("jmeter.navButton")}),n.jsx("button",{onClick:()=>a("/sql"),"data-testid":"nav-sql",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${l?"bg-gray-700 text-blue-300 hover:bg-blue-900 hover:text-blue-200 hover:scale-102":"bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-102"}`,children:t("sql.navButton")}),n.jsx("button",{onClick:()=>a("/typescript"),"data-testid":"nav-typescript",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${l?"bg-gray-700 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200 hover:scale-102":"bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:scale-102"}`,children:t("typescript.navButton")}),n.jsx("button",{onClick:()=>a("/python"),"data-testid":"nav-python",className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${l?"bg-gray-700 text-yellow-300 hover:bg-yellow-900 hover:text-yellow-200 hover:scale-102":"bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:scale-102"}`,children:t("python.navButton")}),n.jsx("div",{className:`w-px h-8 self-center mx-1 ${l?"bg-gray-600":"bg-gray-300"}`}),c.map(h=>n.jsx("button",{onClick:()=>s(h.id),"data-testid":`nav-${h.id}`,className:`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${i===h.id?"bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105":l?"bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"}`,children:h.name},h.id))]})})}),n.jsx("main",{className:"container mx-auto px-6 py-8",children:n.jsx("div",{className:"animate-fadeIn",children:d()})}),n.jsx("footer",{className:"bg-gray-800 text-white py-6 mt-12",children:n.jsxs("div",{className:"container mx-auto px-6 text-center",children:[n.jsx("p",{className:"text-gray-300","data-testid":"footer-text",children:t("footer.text")}),n.jsx("p",{className:"text-gray-400 text-sm mt-2",children:t("footer.hint")})]})})]})}function fg({darkMode:e,setDarkMode:t}){const{language:r,t:a,toggleLanguage:i}=$e(),s=dl();return n.jsx("header",{className:`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${e?"bg-gray-800":"bg-gradient-to-r from-indigo-600 to-purple-600"}`,children:n.jsx("div",{className:"container mx-auto px-6 py-4",children:n.jsxs("div",{className:"flex justify-between items-center flex-wrap gap-3",children:[n.jsx("button",{onClick:()=>s("/"),"data-testid":"topic-back-btn",className:`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${e?"bg-gray-700 text-gray-200 hover:bg-gray-600":"bg-white/20 text-white hover:bg-white/30 border border-white/30"}`,children:a("pages.backButton")}),n.jsxs("div",{className:"flex gap-3",children:[n.jsxs("div",{className:"flex bg-white rounded-lg overflow-hidden","data-testid":"language-toggle",children:[n.jsx("button",{onClick:()=>r==="tr"&&i(),className:`px-4 py-2 font-semibold transition-all duration-300 ${r==="en"?"bg-indigo-600 text-white":"bg-white text-gray-800 hover:bg-gray-100"}`,children:"ENG"}),n.jsx("button",{onClick:()=>r==="en"&&i(),className:`px-4 py-2 font-semibold transition-all duration-300 ${r==="tr"?"bg-indigo-600 text-white":"bg-white text-gray-800 hover:bg-gray-100"}`,children:"TR"})]}),n.jsx("button",{onClick:()=>t(!e),"data-testid":"dark-mode-toggle",className:`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${e?"bg-yellow-400 text-gray-900 hover:bg-yellow-300":"bg-gray-800 text-white hover:bg-gray-700"}`,children:e?`☀️ ${a("buttons.lightMode")}`:`🌙 ${a("buttons.darkMode")}`})]})]})})})}function gu({code:e,darkMode:t}){const[r,a]=v.useState(!1);return n.jsxs("div",{className:"relative mt-4 group",children:[n.jsx("pre",{className:"p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed bg-gray-950 text-green-400 border border-gray-700",children:n.jsx("code",{children:e.trim()})}),n.jsx("button",{onClick:()=>{navigator.clipboard.writeText(e.trim()),a(!0),setTimeout(()=>a(!1),2e3)},className:"absolute top-2 right-2 px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity",children:r?"✅ Kopyalandı":"📋 Kopyala"})]})}function xg({content:e,darkMode:t}){return n.jsxs("div",{className:`mt-4 p-4 rounded-lg border-l-4 border-green-500 text-sm ${t?"bg-green-900/20 text-green-300":"bg-green-50 text-green-800"}`,children:["💡 ",n.jsx("strong",{children:"İpucu / Tip: "}),e]})}function vg({content:e,darkMode:t}){return n.jsxs("div",{className:`mt-4 p-4 rounded-lg border-l-4 border-blue-500 text-sm ${t?"bg-blue-900/20 text-blue-300":"bg-blue-50 text-blue-800"}`,children:["ℹ️ ",e]})}function bg({content:e,darkMode:t}){return n.jsxs("div",{className:`mt-4 p-4 rounded-lg border-l-4 border-yellow-500 text-sm ${t?"bg-yellow-900/20 text-yellow-300":"bg-yellow-50 text-yellow-800"}`,children:["⚠️ ",n.jsx("strong",{children:"Dikkat: "}),e]})}function kg({question:e,answer:t,code:r,darkMode:a}){const[i,s]=v.useState(!1);return n.jsxs("div",{className:`rounded-xl border overflow-hidden mb-3 ${a?"border-gray-600":"border-gray-200"}`,children:[n.jsxs("button",{onClick:()=>s(!i),className:`w-full flex justify-between items-start text-left p-4 font-semibold text-sm transition-colors ${a?"bg-gray-750 text-white hover:bg-gray-700":"bg-gray-50 text-gray-800 hover:bg-gray-100"}`,children:[n.jsx("span",{className:"flex-1 pr-4",children:e}),n.jsx("span",{className:`text-2xl font-light transition-transform duration-300 flex-shrink-0 ${i?"rotate-45":""}`,children:"+"})]}),i&&n.jsxs("div",{className:`p-4 border-t text-sm ${a?"bg-gray-800 border-gray-700 text-gray-300":"bg-white border-gray-100 text-gray-600"}`,children:[n.jsx("p",{className:"leading-relaxed whitespace-pre-line",children:t}),r&&n.jsx(gu,{code:r,darkMode:a})]})]})}function wg(e,t,r){const a=`text-sm leading-relaxed mt-3 ${r?"text-gray-300":"text-gray-600"}`,i=`text-xl font-bold mt-8 mb-3 pb-2 border-b ${r?"text-white border-gray-700":"text-gray-800 border-gray-200"}`,s=`text-base font-semibold mt-5 mb-2 ${r?"text-gray-200":"text-gray-700"}`,l=e.accentColor||(r?"text-indigo-400":"text-indigo-600");switch(e.type){case"text":return n.jsx("p",{className:a,children:e.content},t);case"heading":return n.jsx("h3",{className:i,children:e.text},t);case"subheading":return n.jsx("h4",{className:s,children:e.text},t);case"code":return n.jsx(gu,{code:e.code,darkMode:r},t);case"tip":return n.jsx(xg,{content:e.content,darkMode:r},t);case"info":return n.jsx(vg,{content:e.content,darkMode:r},t);case"warning":return n.jsx(bg,{content:e.content,darkMode:r},t);case"divider":return n.jsx("hr",{className:`my-8 ${r?"border-gray-700":"border-gray-200"}`},t);case"list":return n.jsxs("div",{className:"mt-4",children:[e.title&&n.jsx("p",{className:`text-sm font-semibold mb-2 ${r?"text-gray-200":"text-gray-700"}`,children:e.title}),n.jsx("ul",{className:"space-y-2",children:e.items.map((o,c)=>n.jsxs("li",{className:`flex items-start gap-2 text-sm ${r?"text-gray-300":"text-gray-600"}`,children:[n.jsx("span",{className:`mt-0.5 flex-shrink-0 ${l}`,children:e.icon||"▸"}),typeof o=="string"?o:n.jsxs("span",{children:[n.jsx("strong",{className:r?"text-white":"text-gray-800",children:o.label}),o.desc&&n.jsxs("span",{className:"text-gray-400",children:[" — ",o.desc]})]})]},c))})]},t);case"steps":return n.jsx("div",{className:"mt-4 space-y-2",children:e.items.map((o,c)=>n.jsxs("div",{className:`flex items-start gap-3 p-3 rounded-lg text-sm ${r?"bg-gray-700 text-gray-300":"bg-gray-50 text-gray-700"}`,children:[n.jsx("span",{className:`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${r?"bg-indigo-800 text-indigo-300":"bg-indigo-100 text-indigo-700"}`,children:c+1}),n.jsx("span",{className:"leading-relaxed",children:typeof o=="string"?o:n.jsxs("span",{children:[n.jsx("strong",{children:o.label}),o.desc&&`: ${o.desc}`]})})]},c))},t);case"grid":return n.jsx("div",{className:`mt-4 grid grid-cols-1 md:grid-cols-${e.cols||2} gap-3`,children:e.items.map((o,c)=>n.jsxs("div",{className:`p-4 rounded-xl border text-sm ${r?"bg-gray-750 border-gray-600":"bg-gray-50 border-gray-200"}`,children:[o.icon&&n.jsx("div",{className:"text-2xl mb-2",children:o.icon}),n.jsx("div",{className:`font-bold mb-1 ${r?"text-white":"text-gray-800"}`,children:o.label}),o.desc&&n.jsx("div",{className:r?"text-gray-400":"text-gray-500",children:o.desc})]},c))},t);case"table":return n.jsx("div",{className:"mt-4 overflow-x-auto",children:n.jsxs("table",{className:`w-full text-sm border-collapse rounded-xl overflow-hidden ${r?"border-gray-700":"border-gray-200"}`,children:[n.jsx("thead",{children:n.jsx("tr",{className:r?"bg-gray-700 text-gray-200":"bg-gray-100 text-gray-700",children:e.headers.map((o,c)=>n.jsx("th",{className:"p-3 text-left font-semibold border-b border-gray-600",children:o},c))})}),n.jsx("tbody",{children:e.rows.map((o,c)=>n.jsx("tr",{className:`${r?"border-gray-700 hover:bg-gray-700":"border-gray-200 hover:bg-gray-50"} border-b`,children:o.map((d,h)=>n.jsx("td",{className:`p-3 ${r?"text-gray-300":"text-gray-600"}`,children:d},h))},c))})]})},t);case"qa":return n.jsx(kg,{question:e.question,answer:e.answer,code:e.code,darkMode:r},t);default:return null}}function $a({data:e,gradient:t,bgLight:r}){const{language:a}=$e(),[i,s]=v.useState(()=>{const f=localStorage.getItem("darkMode");return f!==null?JSON.parse(f):!0}),[l,o]=v.useState(0);v.useEffect(()=>{localStorage.setItem("darkMode",JSON.stringify(i)),window.scrollTo(0,0)},[i]),v.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[l]);const c=e[a]||e.en,{hero:d,tabs:h,sections:m}=c;return n.jsxs("div",{className:`min-h-screen transition-colors duration-300 ${i?"dark-mode bg-gray-900":r}`,children:[n.jsx(fg,{darkMode:i,setDarkMode:s}),n.jsxs("main",{className:"container mx-auto px-4 md:px-6 py-8 max-w-5xl",children:[n.jsxs("div",{className:`rounded-2xl p-8 mb-6 bg-gradient-to-r ${t} text-white shadow-xl`,children:[n.jsx("h1",{className:"text-4xl font-bold mb-2",children:d.title}),n.jsx("p",{className:"text-xl opacity-90",children:d.subtitle}),n.jsx("p",{className:"mt-3 opacity-80 max-w-3xl text-sm leading-relaxed",children:d.intro})]}),n.jsx("div",{className:`sticky top-0 z-30 rounded-xl mb-6 p-1.5 shadow-md ${i?"bg-gray-800":"bg-white border border-gray-200"}`,children:n.jsx("div",{className:"flex overflow-x-auto gap-1 pb-0.5",children:h.map((f,y)=>n.jsx("button",{onClick:()=>o(y),className:`flex-shrink-0 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${l===y?`bg-gradient-to-r ${t} text-white shadow-md scale-105`:i?"text-gray-400 hover:text-white hover:bg-gray-700":"text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`,children:f},y))})}),n.jsxs("div",{className:`rounded-2xl p-6 md:p-8 shadow-md ${i?"bg-gray-800":"bg-white"}`,children:[n.jsx("h2",{className:`text-2xl font-bold mb-6 ${i?"text-white":"text-gray-800"}`,children:m[l].title}),m[l].blocks.map((f,y)=>wg(f,y,i))]}),n.jsxs("div",{className:"flex justify-between mt-6 gap-4",children:[l>0&&n.jsxs("button",{onClick:()=>o(l-1),className:`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${i?"bg-gray-800 text-gray-300 hover:bg-gray-700":"bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`,children:["← ",h[l-1]]}),l<h.length-1&&n.jsxs("button",{onClick:()=>o(l+1),className:`ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r ${t} text-white hover:shadow-lg`,children:[h[l+1]," →"]})]})]})]})}const Sg={en:{hero:{title:"⚡ Apache JMeter",subtitle:"Performance & Load Testing Tool",intro:"Learn how to measure, analyse, and improve the performance of your web applications and APIs from scratch — no prior knowledge required."},tabs:["🎯 Introduction","📦 Installation","📚 Intermediate","🚀 Advanced","💼 Interview Q&A"],sections:[{title:"🎯 What is JMeter and Performance Testing?",blocks:[{type:"text",content:"Imagine your website works perfectly when only 5 people are using it. But what happens when 10,000 users visit at the same time — say during a flash sale? Does it crash? Slow down? This is exactly what performance testing answers."},{type:"text",content:"Performance testing is the process of evaluating a system's speed, stability, and scalability under different load conditions. It is NOT about finding bugs in functionality — it's about finding how the system BEHAVES under load."},{type:"heading",text:"Types of Performance Tests"},{type:"grid",cols:3,items:[{icon:"📈",label:"Load Testing",desc:'Simulate expected number of users. "Can we handle 1,000 users?" — the most common type.'},{icon:"💥",label:"Stress Testing",desc:"Push beyond limits until the system breaks. Find the breaking point."},{icon:"⚡",label:"Spike Testing",desc:'Sudden huge jump in users. "What if 5,000 users arrive in 10 seconds?"'},{icon:"📦",label:"Volume Testing",desc:'Test with large amounts of data. "What happens with 10 million DB records?"'},{icon:"⏳",label:"Endurance Testing",desc:"Run at moderate load for hours/days. Find memory leaks and slow degradation."},{icon:"📊",label:"Scalability Testing",desc:'Does the system scale horizontally? "Adding 2 servers — does throughput double?"'}]},{type:"heading",text:"What is Apache JMeter?"},{type:"text",content:"Apache JMeter is a free, open-source Java application specifically designed to load test and measure performance. Originally created in 1998 by Stefano Mazzocchi for web server testing, it has grown into the world's most widely used open-source performance testing tool."},{type:"list",icon:"✅",title:"JMeter Key Features:",items:["100% free and open-source (Apache License 2.0)","Supports HTTP/S, REST, SOAP, FTP, JDBC, LDAP, SMTP, JMS and more","Powerful GUI for test creation, Non-GUI for execution","Distributed testing: one controller, multiple load generators","Extensible via 600+ plugins","Generates beautiful HTML reports automatically","Runs on any OS (Windows, macOS, Linux) with Java"]},{type:"heading",text:"JMeter vs Other Tools"},{type:"table",headers:["Tool","Language","GUI","Free","Best For"],rows:[["JMeter","Java","✅ Yes","✅ Yes","Enterprise, many protocols"],["Locust","Python","❌ Web UI","✅ Yes","Python teams, real user code"],["k6","JavaScript","❌ CLI","✅ Yes","Developer-friendly, CI/CD"],["Gatling","Scala/JS","❌ CLI","✅ Yes","High-performance, code-first"],["LoadRunner","Various","✅ Yes","❌ Paid","Enterprise, strict compliance"]]},{type:"tip",content:"JMeter is the safest choice for beginners and teams without a programming background. Its GUI makes test creation visual and intuitive."},{type:"heading",text:"Real-World Use Cases"},{type:"list",icon:"🔹",items:["E-commerce: Test checkout flow under Black Friday traffic","Banking: Ensure login and transfer APIs handle peak morning load","Healthcare: Validate patient portal stays responsive at shift change","Gaming: Stress-test game servers before launch","Microservices: Identify which service is the bottleneck"]}]},{title:"📦 Installation & First Launch",blocks:[{type:"text",content:'JMeter is a Java application, so Java must be installed first. The installation is simple: download, extract, run. No "install wizard" required.'},{type:"heading",text:"Step 1: Install Java (JDK 8+)"},{type:"text",content:"JMeter 5.x requires Java 8 or higher. Java 11 or 17 LTS is recommended."},{type:"code",code:`# Check if Java is installed (run in terminal / command prompt)
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

Kural: İyi bir sunucu tek makinede ~300-500 HTTP thread'i kaldırabilir. Daha fazlası için Worker ekle.`}]}]}};function Eg(){return n.jsx($a,{data:Sg,gradient:"from-orange-500 to-red-600",bgLight:"bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"})}const Tg={en:{hero:{title:"🗄️ SQL",subtitle:"Database Testing & Query Mastery",intro:"Learn SQL from zero — understand databases, write queries, and use SQL to power your test automation for backend verification, data seeding, and cleanup."},tabs:["🎯 Introduction","📦 Installation","📚 Intermediate","🚀 Advanced","💼 Interview Q&A"],sections:[{title:"🎯 What is SQL and Why Does it Matter for Testers?",blocks:[{type:"text",content:`Imagine an online store. When a user registers, the data goes somewhere — a database. When you test that registration form, clicking "Submit" isn't enough. A thorough tester asks: "Was the data actually saved correctly in the database?" This is where SQL comes in.`},{type:"text",content:"SQL (Structured Query Language) is the universal language for talking to relational databases. Every major application — banking systems, e-commerce sites, healthcare platforms — stores its data in a relational database and uses SQL to manage it."},{type:"heading",text:"What is a Relational Database?"},{type:"text",content:"A relational database stores data in tables (like spreadsheets), where rows are individual records and columns are attributes. Tables are related to each other through keys."},{type:"code",code:`-- Example: A simple "users" table
+----+----------+--------------------+-----+----------+
| id | name     | email              | age | country  |
+----+----------+--------------------+-----+----------+
|  1 | Alice    | alice@example.com  |  28 | TR       |
|  2 | Bob      | bob@example.com    |  34 | US       |
|  3 | Charlie  | charlie@example.com|  22 | UK       |
+----+----------+--------------------+-----+----------+

-- id = Primary Key (unique identifier for each row)
-- email = could have a UNIQUE constraint
-- country = could be a Foreign Key to a "countries" table`},{type:"heading",text:"SQL in Test Automation — Why Every Tester Needs It"},{type:"grid",cols:2,items:[{icon:"✅",label:"Verify DB State",desc:"After a UI action, confirm the database record was created/updated correctly."},{icon:"🌱",label:"Seed Test Data",desc:"Insert test users, products, orders directly into DB before tests run."},{icon:"🧹",label:"Cleanup After Tests",desc:"DELETE test records so each test run starts with a clean state."},{icon:"🔍",label:"Backend Validation",desc:"Verify business logic: e.g., order totals match line items."},{icon:"⚡",label:"Faster than UI",desc:"Querying DB is 100x faster than navigating UI to find data."},{icon:"🐛",label:"Find Hidden Bugs",desc:"UI may show success but DB was not updated — SQL reveals the truth."}]},{type:"heading",text:"Key Terminology"},{type:"list",icon:"📌",items:[{label:"Table",desc:"A structured set of data organized in rows and columns (like a spreadsheet)."},{label:"Row / Record",desc:"A single data entry in a table (one user, one order)."},{label:"Column / Field",desc:"An attribute of the data (name, email, age)."},{label:"Primary Key (PK)",desc:"A unique identifier for each row — no two rows can have the same PK."},{label:"Foreign Key (FK)",desc:"A column that references the Primary Key of another table, creating a relationship."},{label:"Index",desc:"A data structure that speeds up searches on a column (like a book index)."},{label:"Schema",desc:"The structure/blueprint of a database: all tables, columns, types, and constraints."},{label:"Query",desc:"A request for data or action sent to the database using SQL."}]},{type:"heading",text:"Popular Relational Databases"},{type:"table",headers:["Database","Type","Best For","Free?"],rows:[["MySQL","Open-source","Web apps, WordPress, most common","✅ Yes"],["PostgreSQL","Open-source","Complex queries, JSON, enterprise","✅ Yes"],["SQLite","Embedded","Local dev, mobile apps, testing","✅ Yes"],["Microsoft SQL Server","Commercial","Windows/.NET enterprise","✅ Express edition"],["Oracle","Commercial","Large enterprise, banking","❌ Paid"],["MariaDB","Open-source","MySQL drop-in replacement","✅ Yes"]]},{type:"tip",content:"For learning SQL, start with SQLite (no server needed) or use a free online playground like sqlfiddle.com or db-fiddle.com."}]},{title:"📦 Setting Up Your SQL Environment",blocks:[{type:"text",content:"You have several options — from zero-install online playgrounds to full database servers. Choose based on your goal."},{type:"heading",text:"Option A: Online Playground (No Installation)"},{type:"list",icon:"🌐",items:[{label:"db-fiddle.com",desc:"Best option. Supports MySQL, PostgreSQL, SQLite. Free."},{label:"sqlfiddle.com",desc:"Classic option. Multiple DB types supported."},{label:"sqliteonline.com",desc:"SQLite in browser. Fast and simple."}]},{type:"info",content:"For learning SQL syntax and practicing queries, online playgrounds are perfect. No installation, no configuration."},{type:"heading",text:"Option B: SQLite (Lightest Local Option)"},{type:"text",content:"SQLite is a serverless database — just a single .db file. Perfect for learning, local development, and automated testing."},{type:"steps",items:["Download from sqlite.org/download.html (sqlite-tools-win32 for Windows)","Extract the zip to C:\\sqlite\\","Open terminal in that folder","Type: sqlite3 mytest.db to create/open a database","You're in! Type .help to see commands"]},{type:"code",code:`# SQLite CLI quick reference:
sqlite3 mytest.db     # Open (or create) a database

.tables               # List all tables
.schema users         # Show CREATE TABLE for "users"
.headers on           # Show column names in results
.mode column          # Pretty column-aligned output
.quit                 # Exit SQLite

# Run a query:
SELECT * FROM users;`},{type:"heading",text:"Option C: MySQL / MariaDB"},{type:"code",code:`# macOS (Homebrew):
brew install mysql
brew services start mysql
mysql -u root

# Windows: Download MySQL Installer from dev.mysql.com/downloads/installer/
# Choose "Developer Default" during setup

# Linux (Ubuntu/Debian):
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql -u root

# Verify installation:
mysql --version`},{type:"heading",text:"Option D: PostgreSQL"},{type:"code",code:`# macOS (Homebrew):
brew install postgresql@15
brew services start postgresql@15
psql postgres

# Windows: Download from postgresql.org/download/windows/
# Use the installer — includes pgAdmin GUI

# Linux (Ubuntu):
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql

# Verify:
psql --version`},{type:"heading",text:"GUI Tool: DBeaver (Recommended)"},{type:"text",content:"DBeaver is a free, universal database GUI that works with ALL databases (MySQL, PostgreSQL, SQLite, Oracle, etc.). Much easier than the command line for exploration."},{type:"steps",items:["Download DBeaver Community from dbeaver.io (free)","Install and launch DBeaver",'Click "New Database Connection" (the plug icon)',"Select your database type (SQLite, MySQL, PostgreSQL)","Fill in connection details (host, port, username, password)",'Click "Test Connection" → if green, click Finish',"Use the SQL Editor (Ctrl+]) to write and run queries"]},{type:"heading",text:"Using SQL in Python Automation"},{type:"code",code:`# SQLite (built into Python, no install needed):
import sqlite3

conn = sqlite3.connect('test.db')   # Connect (creates file if not exists)
cursor = conn.cursor()

# Execute a query:
cursor.execute("SELECT * FROM users WHERE age > 25")
rows = cursor.fetchall()
for row in rows:
    print(row)

conn.close()

# PostgreSQL (install: pip install psycopg2-binary):
import psycopg2

conn = psycopg2.connect(
    host="localhost", database="testdb",
    user="postgres", password="mypassword"
)
cursor = conn.cursor()
cursor.execute("SELECT count(*) FROM orders WHERE status = 'pending'")
count = cursor.fetchone()[0]
print(f"Pending orders: {count}")
conn.close()`}]},{title:"📚 Core SQL — Queries You Use Every Day",blocks:[{type:"heading",text:"CREATE TABLE — Defining Structure"},{type:"code",code:`-- Create a users table with common data types
CREATE TABLE users (
    id          INT           PRIMARY KEY AUTO_INCREMENT,  -- unique, auto-increments
    username    VARCHAR(50)   NOT NULL UNIQUE,             -- text, max 50 chars, must be unique
    email       VARCHAR(100)  NOT NULL,
    password    VARCHAR(255)  NOT NULL,
    age         INT           CHECK (age >= 0 AND age <= 150),
    country     CHAR(2)       DEFAULT 'TR',               -- fixed 2-char country code
    is_active   BOOLEAN       DEFAULT TRUE,
    created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      ON UPDATE CURRENT_TIMESTAMP
);

-- Common SQL data types:
-- INT / BIGINT        → whole numbers
-- DECIMAL(10,2)       → precise decimals (e.g., prices: 99.99)
-- VARCHAR(n)          → variable-length text up to n chars
-- TEXT                → unlimited text
-- CHAR(n)             → fixed-length text
-- BOOLEAN / TINYINT   → true/false
-- DATE                → 2024-01-15
-- DATETIME/TIMESTAMP  → 2024-01-15 14:30:00`},{type:"heading",text:"INSERT — Adding Data"},{type:"code",code:`-- Single row insert:
INSERT INTO users (username, email, password, age, country)
VALUES ('alice', 'alice@example.com', 'hashed_pw', 28, 'TR');

-- Multiple rows at once (much faster!):
INSERT INTO users (username, email, password, age, country) VALUES
    ('bob',     'bob@example.com',     'hash2', 34, 'US'),
    ('charlie', 'charlie@example.com', 'hash3', 22, 'UK'),
    ('diana',   'diana@example.com',   'hash4', 29, 'TR');

-- Insert with SELECT (copy data):
INSERT INTO users_archive
SELECT * FROM users WHERE created_at < '2023-01-01';`},{type:"heading",text:"SELECT — Reading Data"},{type:"code",code:`-- Select all columns:
SELECT * FROM users;

-- Select specific columns:
SELECT id, username, email FROM users;

-- WHERE — filtering:
SELECT * FROM users WHERE country = 'TR';
SELECT * FROM users WHERE age > 25 AND is_active = TRUE;
SELECT * FROM users WHERE country IN ('TR', 'US', 'UK');
SELECT * FROM users WHERE username LIKE 'a%';    -- starts with 'a'
SELECT * FROM users WHERE email LIKE '%@gmail%'; -- contains @gmail
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE country IS NULL;
SELECT * FROM users WHERE country IS NOT NULL;

-- ORDER BY — sorting:
SELECT * FROM users ORDER BY age ASC;       -- youngest first
SELECT * FROM users ORDER BY created_at DESC; -- newest first
SELECT * FROM users ORDER BY country, age DESC; -- multiple columns

-- LIMIT / OFFSET — pagination:
SELECT * FROM users LIMIT 10;              -- first 10 rows
SELECT * FROM users LIMIT 10 OFFSET 20;   -- rows 21-30 (page 3)

-- DISTINCT — remove duplicates:
SELECT DISTINCT country FROM users;

-- Aliases:
SELECT username AS 'User Name', email AS 'Email Address' FROM users;`},{type:"heading",text:"UPDATE and DELETE"},{type:"code",code:`-- UPDATE — modify existing rows:
UPDATE users SET is_active = FALSE WHERE id = 3;
UPDATE users SET country = 'TR', age = age + 1 WHERE username = 'alice';

-- DELETE — remove rows:
DELETE FROM users WHERE id = 5;
DELETE FROM users WHERE created_at < '2020-01-01';  -- old records

-- ⚠️ DANGER: Always use WHERE with UPDATE and DELETE!
-- DELETE FROM users;  ← deletes ALL rows!
-- UPDATE users SET password = 'x';  ← updates ALL rows!

-- Safe pattern: test your WHERE first with SELECT, then DELETE:
SELECT * FROM users WHERE email LIKE '%test%';  -- verify first
DELETE FROM users WHERE email LIKE '%test%';    -- then delete`},{type:"warning",content:"Always run a SELECT with your WHERE clause before executing UPDATE or DELETE to verify you're targeting the right rows. One wrong DELETE can wipe critical data."},{type:"heading",text:"JOINs — Combining Tables"},{type:"text",content:"JOINs are one of the most powerful SQL features. They let you combine data from multiple related tables in a single query."},{type:"code",code:`-- Our tables:
-- users:  id, username, email
-- orders: id, user_id, total, status, created_at
-- products: id, name, price
-- order_items: id, order_id, product_id, quantity

-- INNER JOIN: only rows that match in BOTH tables
SELECT u.username, o.id AS order_id, o.total, o.status
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
-- Result: only users who HAVE orders

-- LEFT JOIN: ALL rows from left table, matching from right (NULL if no match)
SELECT u.username, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username;
-- Result: ALL users, even those with 0 orders (order_count = 0)

-- RIGHT JOIN: ALL rows from right table, matching from left
SELECT o.id, u.username
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
-- Result: ALL orders (even orphaned ones without a user)

-- Multiple JOINs:
SELECT u.username, p.name AS product, oi.quantity, o.status
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'delivered';`},{type:"heading",text:"Aggregate Functions & GROUP BY"},{type:"code",code:`-- COUNT, SUM, AVG, MIN, MAX
SELECT COUNT(*) AS total_users FROM users;
SELECT COUNT(*) FROM users WHERE is_active = TRUE;
SELECT SUM(total) AS revenue FROM orders WHERE status = 'paid';
SELECT AVG(age) AS avg_age FROM users;
SELECT MIN(total), MAX(total) FROM orders;

-- GROUP BY — aggregate per group:
SELECT country, COUNT(*) AS user_count
FROM users
GROUP BY country
ORDER BY user_count DESC;

-- HAVING — filter AFTER grouping (WHERE can't use aggregate functions):
SELECT country, COUNT(*) AS user_count
FROM users
GROUP BY country
HAVING COUNT(*) > 5;   -- only countries with more than 5 users

-- Combined example:
SELECT status,
       COUNT(*)          AS order_count,
       SUM(total)        AS total_revenue,
       AVG(total)        AS avg_order_value,
       MAX(total)        AS biggest_order
FROM orders
WHERE created_at >= '2024-01-01'
GROUP BY status
HAVING COUNT(*) > 10
ORDER BY total_revenue DESC;`},{type:"heading",text:"Subqueries"},{type:"code",code:`-- Subquery in WHERE (scalar subquery):
SELECT * FROM users
WHERE id IN (
    SELECT DISTINCT user_id FROM orders WHERE total > 1000
);

-- Subquery in FROM (derived table):
SELECT country, avg_age
FROM (
    SELECT country, AVG(age) AS avg_age
    FROM users
    GROUP BY country
) AS country_stats
WHERE avg_age > 30;

-- Correlated subquery (references outer query):
SELECT u.username, u.email,
    (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count
FROM users u
WHERE u.is_active = TRUE;

-- EXISTS — check if a subquery returns any rows:
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id AND o.status = 'pending'
);`},{type:"heading",text:"NULL Handling"},{type:"code",code:`-- NULL means "no value / unknown" — NOT the same as 0 or empty string!
-- NULL comparisons must use IS NULL / IS NOT NULL, not = or !=

SELECT * FROM users WHERE phone IS NULL;          -- ✅ correct
SELECT * FROM users WHERE phone = NULL;           -- ❌ always returns 0 rows!

-- COALESCE: return first non-NULL value
SELECT username, COALESCE(phone, 'N/A') AS phone FROM users;

-- NULLIF: return NULL if two values are equal
SELECT NULLIF(discount, 0) AS discount FROM orders;  -- NULL instead of 0

-- IFNULL (MySQL): simpler COALESCE for 2 values
SELECT username, IFNULL(phone, 'Not provided') FROM users;`}]},{title:"🚀 Advanced SQL",blocks:[{type:"heading",text:"Window Functions — Powerful Analytics"},{type:"text",content:"Window functions perform calculations across a set of rows related to the current row — without collapsing rows like GROUP BY does."},{type:"code",code:`-- ROW_NUMBER: assign sequential row numbers
SELECT username, total,
       ROW_NUMBER() OVER (ORDER BY total DESC) AS rank
FROM orders;

-- RANK and DENSE_RANK (handles ties differently):
SELECT username, total,
       RANK()       OVER (ORDER BY total DESC) AS rank,       -- gaps after ties
       DENSE_RANK() OVER (ORDER BY total DESC) AS dense_rank  -- no gaps
FROM orders;

-- PARTITION BY: reset numbering per group
SELECT username, country, total,
       ROW_NUMBER() OVER (PARTITION BY country ORDER BY total DESC) AS country_rank
FROM users u JOIN orders o ON u.id = o.user_id;
-- → Rank 1 for each country's top spender

-- LAG / LEAD: access previous/next row
SELECT order_date, total,
       LAG(total)  OVER (ORDER BY order_date) AS prev_total,
       LEAD(total) OVER (ORDER BY order_date) AS next_total,
       total - LAG(total) OVER (ORDER BY order_date) AS change
FROM orders WHERE user_id = 1;

-- Running total with SUM OVER:
SELECT order_date, total,
       SUM(total) OVER (ORDER BY order_date) AS running_total
FROM orders;`},{type:"heading",text:"CTEs — Common Table Expressions"},{type:"text",content:"CTEs (WITH clause) make complex queries readable by breaking them into named, reusable sub-queries."},{type:"code",code:`-- Basic CTE:
WITH active_users AS (
    SELECT id, username, email
    FROM users
    WHERE is_active = TRUE
)
SELECT * FROM active_users WHERE username LIKE 'a%';

-- Multiple CTEs:
WITH
high_value_orders AS (
    SELECT user_id, SUM(total) AS lifetime_value
    FROM orders
    WHERE status = 'paid'
    GROUP BY user_id
    HAVING SUM(total) > 5000
),
vip_users AS (
    SELECT u.id, u.username, u.email, hvo.lifetime_value
    FROM users u
    JOIN high_value_orders hvo ON u.id = hvo.user_id
)
SELECT * FROM vip_users ORDER BY lifetime_value DESC;

-- Recursive CTE (for hierarchical data like org charts):
WITH RECURSIVE org_tree AS (
    SELECT id, name, manager_id, 0 AS level
    FROM employees
    WHERE manager_id IS NULL          -- start with CEO

    UNION ALL

    SELECT e.id, e.name, e.manager_id, ot.level + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT level, name FROM org_tree ORDER BY level, name;`},{type:"heading",text:"Indexes — Speed Up Queries"},{type:"code",code:`-- Create an index on a frequently searched column:
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status_date ON orders(status, created_at);  -- composite

-- Unique index (also enforces uniqueness constraint):
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- View existing indexes:
SHOW INDEX FROM users;           -- MySQL
di users                        -- PostgreSQL

-- Drop an index:
DROP INDEX idx_users_email ON users;

-- When to create indexes:
-- ✅ Columns used in WHERE clauses frequently
-- ✅ Columns used in JOIN conditions (foreign keys)
-- ✅ Columns used in ORDER BY frequently
-- ❌ Small tables (full scan is faster)
-- ❌ Columns updated very frequently (index maintenance overhead)
-- ❌ Columns with very low cardinality (e.g., boolean: only 2 values)`},{type:"heading",text:"Transactions & ACID"},{type:"code",code:`-- A transaction ensures ALL operations succeed or ALL are rolled back.
-- ACID = Atomicity, Consistency, Isolation, Durability

-- Example: Transfer money between accounts
START TRANSACTION;  -- or BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- debit
UPDATE accounts SET balance = balance + 500 WHERE id = 2;  -- credit

-- If everything is OK:
COMMIT;

-- If something went wrong:
ROLLBACK;  -- undo ALL changes in this transaction

-- Practical use in testing (Python):
import psycopg2

conn = psycopg2.connect(DSN)
try:
    cur = conn.cursor()
    cur.execute("INSERT INTO test_users (name) VALUES ('test_alice')")
    cur.execute("INSERT INTO test_orders (user_id) VALUES (LASTVAL())")
    conn.commit()  # both succeed → commit
except Exception as e:
    conn.rollback()  # any failure → undo both
    raise e
finally:
    conn.close()`},{type:"heading",text:"EXPLAIN — Query Optimization"},{type:"code",code:`-- EXPLAIN shows how the database plans to execute a query
-- Use it to find slow queries (full table scans = bad)

EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';

-- MySQL EXPLAIN output columns:
-- type: "ALL" (full scan, bad) vs "ref"/"eq_ref"/"const" (index, good)
-- key: which index is being used (NULL = no index!)
-- rows: estimated rows examined (lower = better)
-- Extra: "Using filesort", "Using temporary" = potential problems

-- EXPLAIN ANALYZE (PostgreSQL) actually runs the query:
EXPLAIN ANALYZE SELECT * FROM users WHERE country = 'TR';

-- Before adding index:
EXPLAIN SELECT * FROM orders WHERE user_id = 42;
-- → type: ALL, rows: 50000  ← full table scan!

-- After: CREATE INDEX idx_orders_user ON orders(user_id);
EXPLAIN SELECT * FROM orders WHERE user_id = 42;
-- → type: ref, rows: 3  ← uses index, much faster!`},{type:"heading",text:"SQL for Test Automation — Practical Patterns"},{type:"code",code:`# Pattern 1: Verify UI action in DB (pytest + SQLite)
import sqlite3, pytest

@pytest.fixture
def db():
    conn = sqlite3.connect('app.db')
    yield conn
    conn.close()

def test_user_registration_saves_to_db(browser, db):
    # UI: register a new user
    browser.goto('/register')
    browser.fill('[name=username]', 'testuser99')
    browser.fill('[name=email]', 'test99@example.com')
    browser.click('button[type=submit]')

    # DB: verify the record exists
    cur = db.cursor()
    cur.execute("SELECT * FROM users WHERE email = 'test99@example.com'")
    user = cur.fetchone()
    assert user is not None, "User was not saved to database!"
    assert user[2] == 'test99@example.com'

# Pattern 2: Seed data before test
@pytest.fixture
def test_user(db):
    cur = db.cursor()
    cur.execute("INSERT INTO users (username, email) VALUES (?, ?)",
                ('fixture_user', 'fixture@test.com'))
    db.commit()
    user_id = cur.lastrowid
    yield user_id
    # Cleanup:
    cur.execute("DELETE FROM users WHERE id = ?", (user_id,))
    db.commit()

# Pattern 3: Verify DB is clean after delete action
def test_delete_user_removes_from_db(browser, db, test_user):
    browser.goto(f'/users/{test_user}/delete')
    browser.click('button#confirm-delete')

    cur = db.cursor()
    cur.execute("SELECT COUNT(*) FROM users WHERE id = ?", (test_user,))
    count = cur.fetchone()[0]
    assert count == 0, "User was not deleted from database!"`}]},{title:"💼 SQL Interview Questions & Answers",blocks:[{type:"text",content:"The most frequently asked SQL interview questions for QA engineers and developers. Click each question to expand the answer."},{type:"qa",question:"Q1: What is the difference between WHERE and HAVING?",answer:`WHERE filters rows BEFORE grouping (used on individual row values).
HAVING filters groups AFTER grouping (used on aggregate function results).

Rule: If you need to filter based on COUNT, SUM, AVG etc. → use HAVING. Otherwise → use WHERE.`,code:`-- WHERE: filter before aggregation
SELECT * FROM orders WHERE total > 100;

-- HAVING: filter after aggregation
SELECT user_id, SUM(total) AS lifetime
FROM orders
GROUP BY user_id
HAVING SUM(total) > 5000;  -- only users who spent > 5000 total

-- Can combine both:
SELECT user_id, COUNT(*) AS order_count
FROM orders
WHERE status = 'paid'          -- filter rows first
GROUP BY user_id
HAVING COUNT(*) > 3;           -- then filter groups`},{type:"qa",question:"Q2: Explain the different types of JOINs.",answer:`INNER JOIN: Returns rows where there is a match in BOTH tables. Unmatched rows from either table are excluded.

LEFT (OUTER) JOIN: Returns ALL rows from the left table and matching rows from the right. NULLs for unmatched right-side columns.

RIGHT (OUTER) JOIN: Returns ALL rows from the right table and matching rows from the left.

FULL (OUTER) JOIN: Returns ALL rows from BOTH tables. NULLs where there is no match on either side.

CROSS JOIN: Cartesian product — every row from left combined with every row from right (rarely used).`,code:`SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;   -- only users WITH orders

SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;    -- ALL users, orders or NULL`},{type:"qa",question:"Q3: What is the difference between DELETE, TRUNCATE, and DROP?",answer:`DELETE: Removes specific rows matching a WHERE clause. Supports transactions (can ROLLBACK). Triggers fire. Slower for large datasets.

TRUNCATE: Removes ALL rows from a table instantly. Cannot be filtered. Cannot ROLLBACK in MySQL (can in PostgreSQL). Does not fire row-level triggers. Faster than DELETE.

DROP: Permanently deletes the ENTIRE table (structure + data). Cannot be rolled back (usually). Table ceases to exist.`,code:`DELETE FROM users WHERE id = 5;         -- remove 1 row, rollbackable
DELETE FROM users;                      -- remove all rows (slow, rollbackable)
TRUNCATE TABLE users;                   -- remove all rows (fast, not rollbackable in MySQL)
DROP TABLE users;                       -- delete entire table permanently`},{type:"qa",question:"Q4: What are ACID properties?",answer:`ACID properties guarantee that database transactions are processed reliably:

Atomicity: A transaction is "all or nothing" — either ALL operations succeed, or NONE do. No partial updates.

Consistency: A transaction moves the database from one valid state to another. All constraints, rules, and cascades are enforced.

Isolation: Concurrent transactions execute as if they were serial. One transaction's in-progress changes are invisible to others.

Durability: Once a transaction is committed, it remains committed even in the event of system failure (written to persistent storage).`},{type:"qa",question:"Q5: What is normalization? What are 1NF, 2NF, 3NF?",answer:`Normalization is the process of organizing a database to reduce redundancy and improve data integrity.

1NF (First Normal Form): Each column contains atomic (indivisible) values. No repeating groups. Each row is unique.

2NF (Second Normal Form): Must be 1NF + every non-key column must depend on the ENTIRE primary key (eliminates partial dependencies — important for composite keys).

3NF (Third Normal Form): Must be 2NF + no non-key column depends on another non-key column (eliminates transitive dependencies).

Practical rule: "Every non-key column must depend on the key, the whole key, and nothing but the key."`},{type:"qa",question:"Q6: What are indexes? When should you add one?",answer:`An index is a data structure (usually a B-tree) that allows the database to find rows matching a condition without scanning every row in the table — like a book index.

Add indexes when:
• Column is frequently used in WHERE clauses
• Column is used in JOIN conditions (foreign keys should always be indexed)
• Column is used in ORDER BY frequently

Avoid indexes when:
• Table is very small (full scan is faster)
• Column is updated very frequently (indexes slow writes)
• Column has low cardinality (boolean, status with 3 values)`,code:`CREATE INDEX idx_email ON users(email);       -- speed up WHERE email = ?
CREATE INDEX idx_fk_user ON orders(user_id);  -- speed up JOINs`},{type:"qa",question:"Q7: What is the difference between UNION and UNION ALL?",answer:`UNION: Combines results from two queries and removes duplicate rows. Slower because it must compare all rows to find duplicates.

UNION ALL: Combines results from two queries and keeps ALL rows including duplicates. Faster because no deduplication step.`,code:`-- UNION: removes duplicates
SELECT email FROM users
UNION
SELECT email FROM admins;

-- UNION ALL: keeps all rows (even duplicates)
SELECT email FROM users
UNION ALL
SELECT email FROM admins;  -- faster, use when duplicates don't matter`},{type:"qa",question:"Q8: What is a CTE (Common Table Expression)? Why use it?",answer:`A CTE (WITH clause) is a named, temporary result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. It exists only for the duration of the query.

Why use CTEs:
• Readability: Break complex queries into logical named steps
• Reusability: Reference the same subquery multiple times
• Recursion: CTEs can call themselves (for hierarchical data like org charts)
• Alternative to subqueries that are easier to read and debug`,code:`WITH monthly_revenue AS (
    SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total) AS revenue
    FROM orders WHERE status = 'paid'
    GROUP BY month
)
SELECT month, revenue,
       revenue - LAG(revenue) OVER (ORDER BY month) AS growth
FROM monthly_revenue;`},{type:"qa",question:"Q9: How do you find duplicate records in a table?",answer:'Use GROUP BY on the columns that define "duplicate" and HAVING to filter groups with count > 1.',code:`-- Find duplicate emails:
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Find all rows that have a duplicate email:
SELECT *
FROM users
WHERE email IN (
    SELECT email FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
)
ORDER BY email;

-- Delete duplicates, keep the one with lowest id:
DELETE FROM users
WHERE id NOT IN (
    SELECT MIN(id) FROM users GROUP BY email
);`},{type:"qa",question:"Q10: What are Window Functions? Give examples.",answer:`Window functions perform calculations across a "window" of rows related to the current row. Unlike GROUP BY, they don't collapse rows — each row keeps its own output plus the window calculation.

Common window functions:
• ROW_NUMBER(): sequential number per partition
• RANK() / DENSE_RANK(): ranking with/without gaps on ties
• LAG(col, n) / LEAD(col, n): access previous/next row's value
• SUM/AVG/COUNT OVER (): running totals, moving averages`,code:`-- Running total per user:
SELECT user_id, order_date, total,
       SUM(total) OVER (PARTITION BY user_id ORDER BY order_date) AS running_total
FROM orders;

-- Top spender per country:
SELECT * FROM (
    SELECT username, country, total_spent,
           RANK() OVER (PARTITION BY country ORDER BY total_spent DESC) AS rk
    FROM user_totals
) t WHERE rk = 1;`},{type:"qa",question:"Q11: What is a Primary Key vs Foreign Key vs Unique Key?",answer:`Primary Key (PK): Uniquely identifies each row in a table. Cannot be NULL. Only ONE per table. Often auto-incremented integer.

Foreign Key (FK): A column that references the Primary Key of another table. Enforces referential integrity — you can't insert a FK value that doesn't exist in the parent table. Can be NULL.

Unique Key: Ensures all values in a column are distinct (no duplicates allowed). Unlike PK, a table can have multiple unique keys, and they CAN be NULL (usually).`,code:`CREATE TABLE orders (
    id        INT PRIMARY KEY AUTO_INCREMENT,   -- PK
    user_id   INT NOT NULL,                     -- FK
    ref_code  VARCHAR(20) UNIQUE,               -- UNIQUE KEY
    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint
);`},{type:"qa",question:"Q12: What is the difference between CHAR, VARCHAR, and TEXT?",answer:`CHAR(n): Fixed-length. Always stores exactly n characters (pads with spaces). Fast for fixed-size values like country codes (CHAR(2)), status codes. Wastes space for variable-length data.

VARCHAR(n): Variable-length. Stores 1 to n characters. More space-efficient than CHAR for variable-length data. Maximum n depends on DB (MySQL: up to 65535).

TEXT: For very long text (articles, comments, descriptions). No length limit. Cannot have a DEFAULT value. Stored outside the main row in many databases.`},{type:"qa",question:'Q13: How do you write a "Top N per group" query?',answer:"Get the top N rows within each group (e.g., top 3 orders per user). The cleanest solution uses window functions.",code:`-- Top 3 orders per user using ROW_NUMBER():
SELECT *
FROM (
    SELECT user_id, id AS order_id, total,
           ROW_NUMBER() OVER (
               PARTITION BY user_id
               ORDER BY total DESC
           ) AS rn
    FROM orders
) ranked
WHERE rn <= 3;

-- Alternative with CTEs (more readable):
WITH ranked_orders AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY total DESC) AS rn
    FROM orders
)
SELECT user_id, order_id, total FROM ranked_orders WHERE rn <= 3;`},{type:"qa",question:"Q14: What is SQL injection? How do you prevent it in tests?",answer:`SQL injection is a security vulnerability where user input is inserted directly into SQL queries, allowing attackers to manipulate the query.

In testing: Always use parameterized queries (prepared statements) — NEVER string concatenation when building SQL with user-provided values.`,code:`# ❌ VULNERABLE — Never do this:
username = "admin' OR '1'='1"
cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")
# The query becomes: WHERE username = 'admin' OR '1'='1'
# This returns ALL users!

# ✅ SAFE — Use parameterized queries:
cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
# Python sqlite3:
cursor.execute("SELECT * FROM users WHERE username = ?", (username,))`},{type:"qa",question:"Q15: How do you use SQL in automated tests for data verification?",answer:`Three main patterns:

1. Post-action verification: UI/API action → SQL query → assert the expected DB state
2. Pre-test data seeding: INSERT test data via SQL → run test → DELETE cleanup
3. Data integrity checks: Query multiple tables to verify consistency (e.g., order total matches sum of line items)`,code:`# pytest + psycopg2 example:
@pytest.fixture(scope='session')
def db_conn():
    conn = psycopg2.connect(os.getenv('DATABASE_URL'))
    yield conn
    conn.close()

def test_registration_saves_user(page, db_conn):
    page.goto('/register')
    page.fill('#email', 'newuser@test.com')
    page.click('button[type=submit]')
    page.wait_for_url('/dashboard')

    cur = db_conn.cursor()
    cur.execute("SELECT id, email FROM users WHERE email = %s",
                ('newuser@test.com',))
    user = cur.fetchone()
    assert user is not None, "Registration: user not found in DB"
    assert user[1] == 'newuser@test.com'`}]}]},tr:{hero:{title:"🗄️ SQL",subtitle:"Veritabanı Testi ve Sorgu Ustalığı",intro:"SQL'i sıfırdan öğrenin — veritabanlarını anlayın, sorgular yazın ve backend doğrulama, veri oluşturma ve temizleme için SQL'i test otomasyonunuzda kullanın."},tabs:["🎯 Giriş","📦 Kurulum","📚 Orta Seviye","🚀 İleri Seviye","💼 Mülakat Soruları"],sections:[{title:"🎯 SQL Nedir ve Test Uzmanları İçin Neden Önemlidir?",blocks:[{type:"text",content:'Bir online mağaza düşünün. Kullanıcı kayıt olduğunda veri bir yere gider — bir veritabanına. O kayıt formunu test ettiğinizde "Gönder"e tıklamak yetmez. Kapsamlı bir tester şunu sorar: "Veri veritabanına doğru kaydedildi mi?" İşte burada SQL devreye girer.'},{type:"text",content:"SQL (Structured Query Language — Yapılandırılmış Sorgu Dili), ilişkisel veritabanlarıyla iletişim kurmak için evrensel dildir. Bankacılık sistemleri, e-ticaret siteleri, sağlık platformları gibi tüm büyük uygulamalar verilerini ilişkisel bir veritabanında saklar."},{type:"heading",text:"İlişkisel Veritabanı Nedir?"},{type:"text",content:"İlişkisel veritabanı, verileri tablolarda (elektronik tablo gibi) saklar; satırlar tekil kayıtları, sütunlar ise özellikleri temsil eder. Tablolar anahtarlar aracılığıyla birbirleriyle ilişkilendirilir."},{type:"code",code:`-- Örnek: "users" tablosu
+----+----------+--------------------+-----+-------+
| id | name     | email              | age |country|
+----+----------+--------------------+-----+-------+
|  1 | Ali      | ali@example.com    |  28 | TR    |
|  2 | Veli     | veli@example.com   |  34 | US    |
|  3 | Ayşe     | ayse@example.com   |  22 | TR    |
+----+----------+--------------------+-----+-------+

-- id = Primary Key (her satır için benzersiz tanımlayıcı)
-- email = UNIQUE kısıtlaması olabilir
-- country = bir "countries" tablosuna Foreign Key olabilir`},{type:"heading",text:"Test Otomasyonunda SQL — Her Tester'ın Bilmesi Gerekenler"},{type:"grid",cols:2,items:[{icon:"✅",label:"DB Durumunu Doğrula",desc:"UI işleminden sonra veritabanı kaydının doğru oluşturulduğunu/güncellendiğini doğrula."},{icon:"🌱",label:"Test Verisi Ekle",desc:"Testler çalışmadan önce doğrudan DB'ye test kullanıcıları, ürünler, siparişler ekle."},{icon:"🧹",label:"Test Sonrası Temizlik",desc:"Her test çalışmasının temiz durumla başlaması için test kayıtlarını sil."},{icon:"🔍",label:"Backend Doğrulama",desc:"İş mantığını doğrula: örn. sipariş toplamı kalem toplamlarıyla eşleşiyor mu?"},{icon:"⚡",label:"UI'dan Daha Hızlı",desc:"DB sorgulama, UI'da gezinmekten 100x daha hızlıdır."},{icon:"🐛",label:"Gizli Hataları Bul",desc:"UI başarı gösterebilir ama DB güncellenmemiş olabilir — SQL gerçeği ortaya çıkarır."}]},{type:"heading",text:"Temel Terimler"},{type:"list",icon:"📌",items:[{label:"Tablo (Table)",desc:"Satır ve sütunlarda düzenlenmiş yapılandırılmış veri kümesi (elektronik tablo gibi)."},{label:"Satır / Kayıt (Row / Record)",desc:"Tablodaki tek bir veri girişi (bir kullanıcı, bir sipariş)."},{label:"Sütun / Alan (Column / Field)",desc:"Verinin bir özelliği (isim, email, yaş)."},{label:"Birincil Anahtar (Primary Key)",desc:"Her satır için benzersiz tanımlayıcı — iki satır aynı PK'ya sahip olamaz."},{label:"Yabancı Anahtar (Foreign Key)",desc:"Başka bir tablonun Primary Key'ini referans alan sütun — tablolar arası ilişki oluşturur."},{label:"İndeks (Index)",desc:"Sütundaki aramaları hızlandıran veri yapısı (kitap indeksi gibi)."},{label:"Şema (Schema)",desc:"Veritabanının yapısı/planı: tüm tablolar, sütunlar, tipler ve kısıtlamalar."},{label:"Sorgu (Query)",desc:"SQL kullanılarak veritabanına gönderilen veri veya işlem talebi."}]},{type:"tip",content:"SQL öğrenmek için SQLite (sunucu gerekmez) veya sqlfiddle.com ya da db-fiddle.com gibi ücretsiz online oyun alanları ile başlayın."}]},{title:"📦 SQL Ortamı Kurulumu",blocks:[{type:"text",content:"Kurulum gerektirmeyen online oyun alanlarından tam veritabanı sunucularına kadar birkaç seçeneğiniz var."},{type:"heading",text:"Seçenek A: Online Oyun Alanı (Kurulum Yok)"},{type:"list",icon:"🌐",items:[{label:"db-fiddle.com",desc:"En iyi seçenek. MySQL, PostgreSQL, SQLite destekler. Ücretsiz."},{label:"sqlfiddle.com",desc:"Klasik seçenek. Birden fazla DB tipi destekler."},{label:"sqliteonline.com",desc:"Tarayıcıda SQLite. Hızlı ve basit."}]},{type:"heading",text:"Seçenek B: SQLite (En Hafif Yerel Seçenek)"},{type:"steps",items:["sqlite.org/download.html adresinden indir (Windows için sqlite-tools-win32)","C:\\sqlite\\ klasörüne çıkart","O klasörde terminal aç","sqlite3 benimveritabanim.db yaz (veritabanı oluşturur/açar)","Hazırsın! .help komutuyla yardımı görebilirsin"]},{type:"heading",text:"Seçenek C: MySQL / MariaDB"},{type:"code",code:`# macOS (Homebrew):
brew install mysql
brew services start mysql
mysql -u root

# Windows: dev.mysql.com/downloads/installer/ adresinden MySQL Installer indir
# Kurulum sırasında "Developer Default" seç

# Linux (Ubuntu/Debian):
sudo apt update && sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql -u root`},{type:"heading",text:"GUI Aracı: DBeaver (Önerilen)"},{type:"text",content:"DBeaver, TÜM veritabanlarıyla (MySQL, PostgreSQL, SQLite vb.) çalışan ücretsiz, evrensel bir veritabanı GUI'sidir. Komut satırından çok daha kolaydır."},{type:"steps",items:["dbeaver.io adresinden DBeaver Community'yi indir (ücretsiz)","Kur ve DBeaver'ı başlat",'"New Database Connection" düğmesine (fiş ikonu) tıkla',"Veritabanı tipini seç (SQLite, MySQL, PostgreSQL)","Bağlantı bilgilerini gir (host, port, kullanıcı adı, şifre)",`"Test Connection"a tıkla → yeşilse Finish'e bas`,"SQL sorgularını yazmak ve çalıştırmak için SQL Editörünü kullan"]}]},{title:"📚 Temel SQL — Her Gün Kullandığın Sorgular",blocks:[{type:"heading",text:"CREATE TABLE — Yapı Tanımlama"},{type:"code",code:`-- Yaygın veri tipleriyle kullanıcılar tablosu oluştur
CREATE TABLE kullanicilar (
    id          INT           PRIMARY KEY AUTO_INCREMENT,
    kullanici_adi VARCHAR(50) NOT NULL UNIQUE,
    email       VARCHAR(100)  NOT NULL,
    sifre       VARCHAR(255)  NOT NULL,
    yas         INT           CHECK (yas >= 0 AND yas <= 150),
    ulke        CHAR(2)       DEFAULT 'TR',
    aktif       BOOLEAN       DEFAULT TRUE,
    olusturulma DATETIME      DEFAULT CURRENT_TIMESTAMP
);`},{type:"heading",text:"INSERT, SELECT, UPDATE, DELETE"},{type:"code",code:`-- Veri ekleme:
INSERT INTO kullanicilar (kullanici_adi, email, sifre, yas)
VALUES ('ali_veli', 'ali@example.com', 'hash123', 28);

-- Birden fazla satır:
INSERT INTO kullanicilar (kullanici_adi, email, sifre, yas) VALUES
    ('ayse', 'ayse@example.com', 'hash2', 25),
    ('mehmet', 'mehmet@example.com', 'hash3', 32);

-- Veri okuma:
SELECT * FROM kullanicilar WHERE ulke = 'TR';
SELECT * FROM kullanicilar WHERE yas > 25 AND aktif = TRUE;
SELECT * FROM kullanicilar ORDER BY yas ASC LIMIT 10;

-- Güncelleme:
UPDATE kullanicilar SET aktif = FALSE WHERE id = 3;

-- Silme:
DELETE FROM kullanicilar WHERE id = 5;`},{type:"warning",content:"UPDATE ve DELETE'den önce WHERE koşulunuzu SELECT ile test edin! WHERE olmadan tüm tablo silinir veya güncellenir."},{type:"heading",text:"JOIN'ler — Tabloları Birleştirme"},{type:"code",code:`-- INNER JOIN: her iki tabloda da eşleşen satırlar
SELECT u.kullanici_adi, s.id AS siparis_id, s.toplam
FROM kullanicilar u
INNER JOIN siparisler s ON u.id = s.kullanici_id;
-- Sonuç: yalnızca SİPARİŞİ OLAN kullanıcılar

-- LEFT JOIN: sol tablodaki TÜM satırlar + eşleşenler
SELECT u.kullanici_adi, COUNT(s.id) AS siparis_sayisi
FROM kullanicilar u
LEFT JOIN siparisler s ON u.id = s.kullanici_id
GROUP BY u.id, u.kullanici_adi;
-- Sonuç: sipariş sayısı 0 olanlar dahil TÜM kullanıcılar`},{type:"heading",text:"GROUP BY ve Aggregate Fonksiyonlar"},{type:"code",code:`-- Ülkelere göre kullanıcı sayısı:
SELECT ulke, COUNT(*) AS kullanici_sayisi
FROM kullanicilar
GROUP BY ulke
ORDER BY kullanici_sayisi DESC;

-- HAVING: grupladıktan sonra filtrele
SELECT ulke, COUNT(*) AS kullanici_sayisi
FROM kullanicilar
GROUP BY ulke
HAVING COUNT(*) > 5;  -- 5'ten fazla kullanıcısı olan ülkeler`},{type:"heading",text:"NULL Yönetimi"},{type:"code",code:`-- NULL = "değer yok / bilinmiyor" — 0 veya boş string ile AYNI DEĞİL!
SELECT * FROM kullanicilar WHERE telefon IS NULL;      -- ✅ doğru
SELECT * FROM kullanicilar WHERE telefon = NULL;       -- ❌ her zaman 0 satır döner

-- COALESCE: ilk NULL olmayan değeri döndür
SELECT kullanici_adi, COALESCE(telefon, 'Belirtilmemiş') AS telefon
FROM kullanicilar;`}]},{title:"🚀 İleri Seviye SQL",blocks:[{type:"heading",text:"Window Fonksiyonları"},{type:"code",code:`-- ROW_NUMBER: sıra numarası ata
SELECT kullanici_adi, toplam,
       ROW_NUMBER() OVER (ORDER BY toplam DESC) AS sira
FROM siparisler;

-- Her ülkede en çok harcayan kullanıcı:
SELECT * FROM (
    SELECT kullanici_adi, ulke, toplam_harcama,
           RANK() OVER (PARTITION BY ulke ORDER BY toplam_harcama DESC) AS sira
    FROM kullanici_toplamlari
) t WHERE sira = 1;

-- Kümülatif toplam:
SELECT siparis_tarihi, toplam,
       SUM(toplam) OVER (ORDER BY siparis_tarihi) AS kumulatif_toplam
FROM siparisler;`},{type:"heading",text:"CTE — Ortak Tablo İfadeleri (WITH)"},{type:"code",code:`-- Temel CTE:
WITH aktif_kullanicilar AS (
    SELECT id, kullanici_adi, email
    FROM kullanicilar
    WHERE aktif = TRUE
)
SELECT * FROM aktif_kullanicilar WHERE kullanici_adi LIKE 'a%';

-- Birden fazla CTE:
WITH
yuksek_degerli_siparisler AS (
    SELECT kullanici_id, SUM(toplam) AS yasam_boyu_deger
    FROM siparisler WHERE durum = 'odendi'
    GROUP BY kullanici_id HAVING SUM(toplam) > 5000
),
vip_kullanicilar AS (
    SELECT u.id, u.kullanici_adi, yds.yasam_boyu_deger
    FROM kullanicilar u
    JOIN yuksek_degerli_siparisler yds ON u.id = yds.kullanici_id
)
SELECT * FROM vip_kullanicilar ORDER BY yasam_boyu_deger DESC;`},{type:"heading",text:"Transaction'lar ve ACID"},{type:"code",code:`-- Transaction: TÜM işlemler başarılı olur veya HİÇBİRİ olmaz
START TRANSACTION;

UPDATE hesaplar SET bakiye = bakiye - 500 WHERE id = 1;  -- borçlandır
UPDATE hesaplar SET bakiye = bakiye + 500 WHERE id = 2;  -- alacaklandır

-- Her şey yolundaysa:
COMMIT;

-- Bir şeyler yanlış giderse:
ROLLBACK;  -- bu transaction'daki TÜM değişiklikleri geri al`},{type:"heading",text:"EXPLAIN — Sorgu Optimizasyonu"},{type:"code",code:`-- EXPLAIN sorgunun nasıl çalıştırılacağını gösterir
EXPLAIN SELECT * FROM kullanicilar WHERE email = 'ali@example.com';

-- type = "ALL" → tam tablo taraması (kötü!)
-- type = "ref" veya "const" → index kullanıyor (iyi!)
-- key = NULL → index yok, ekle!

-- Index ekle:
CREATE INDEX idx_email ON kullanicilar(email);

-- Sonra tekrar kontrol et:
EXPLAIN SELECT * FROM kullanicilar WHERE email = 'ali@example.com';
-- Artık index kullanıyor!`},{type:"heading",text:"Test Otomasyonunda SQL Kalıpları"},{type:"code",code:`# Python + pytest örneği:
import sqlite3, pytest

@pytest.fixture
def veritabani():
    baglanti = sqlite3.connect('uygulama.db')
    yield baglanti
    baglanti.close()

def test_kayit_formu_db_ye_kaydeder(tarayici, veritabani):
    # UI: yeni kullanıcı kayıt ol
    tarayici.goto('/kayit')
    tarayici.fill('[name=email]', 'test99@example.com')
    tarayici.click('button[type=submit]')

    # DB: kayıt var mı doğrula
    cur = veritabani.cursor()
    cur.execute("SELECT * FROM kullanicilar WHERE email = ?",
                ('test99@example.com',))
    kullanici = cur.fetchone()
    assert kullanici is not None, "Kullanıcı veritabanına kaydedilmedi!"

@pytest.fixture
def test_kullanicisi(veritabani):
    cur = veritabani.cursor()
    cur.execute("INSERT INTO kullanicilar (email) VALUES (?)", ('fixture@test.com',))
    veritabani.commit()
    kullanici_id = cur.lastrowid
    yield kullanici_id
    # Temizlik:
    cur.execute("DELETE FROM kullanicilar WHERE id = ?", (kullanici_id,))
    veritabani.commit()`}]},{title:"💼 SQL Mülakat Soruları ve Cevapları",blocks:[{type:"text",content:"QA mühendisleri ve geliştiriciler için en sık sorulan SQL mülakat soruları. Cevabı görmek için her soruya tıklayın."},{type:"qa",question:"S1: WHERE ile HAVING arasındaki fark nedir?",answer:`WHERE, gruplama ÖNCE satırları filtreler (tekil satır değerlerine uygulanır).
HAVING, gruplama SONRA grupları filtreler (aggregate fonksiyon sonuçlarına uygulanır).

Kural: COUNT, SUM, AVG gibi fonksiyonlara göre filtreleme yapmak istiyorsanız → HAVING kullanın. Aksi takdirde → WHERE kullanın.`,code:`-- WHERE: bireysel satırları filtrele
SELECT * FROM siparisler WHERE toplam > 100;

-- HAVING: grupları aggregate sonucuna göre filtrele
SELECT kullanici_id, SUM(toplam) AS yasam_boyu
FROM siparisler
GROUP BY kullanici_id
HAVING SUM(toplam) > 5000;`},{type:"qa",question:"S2: JOIN türlerini açıklayın.",answer:`INNER JOIN: Her iki tabloda da eşleşme olan satırları döndürür. Eşleşmeyen satırlar hariç tutulur.

LEFT (OUTER) JOIN: Sol tablodaki TÜM satırları ve sağ taraftan eşleşen satırları döndürür. Eşleşmeyen sağ taraf sütunları için NULL.

RIGHT (OUTER) JOIN: Sağ tablodaki TÜM satırları ve sol taraftan eşleşen satırları döndürür.

FULL (OUTER) JOIN: Her iki tablodaki TÜM satırları döndürür. Eşleşme olmayan yerlerde NULL.`},{type:"qa",question:"S3: DELETE, TRUNCATE ve DROP arasındaki fark nedir?",answer:`DELETE: WHERE koşuluna uyan belirli satırları kaldırır. Transaction'ları destekler (ROLLBACK yapılabilir). Tetikleyiciler çalışır. Büyük veri setlerinde yavaştır.

TRUNCATE: Tablodaki TÜM satırları anında kaldırır. Filtrelenemez. MySQL'de ROLLBACK yapılamaz. Tetikleyicileri çalıştırmaz. DELETE'den çok daha hızlıdır.

DROP: Tüm tabloyu kalıcı olarak siler (yapı + veri). Genellikle geri alınamaz.`,code:`DELETE FROM kullanicilar WHERE id = 5;   -- 1 satırı sil, geri alınabilir
TRUNCATE TABLE kullanicilar;             -- tüm satırları hızla sil
DROP TABLE kullanicilar;                 -- tabloyu tamamen sil`},{type:"qa",question:"S4: ACID özellikleri nelerdir?",answer:`Atomicity (Bütünsellik): Transaction "ya hep ya hiç" — ya TÜM işlemler başarılı, ya da HİÇBİRİ.

Consistency (Tutarlılık): Transaction veritabanını bir geçerli durumdan diğerine taşır. Tüm kısıtlamalar ve kurallar uygulanır.

Isolation (Yalıtım): Eş zamanlı transactionlar birbirinden bağımsız çalışır. Birinin devam eden değişiklikleri diğerleri tarafından görülmez.

Durability (Kalıcılık): Commit edilen bir transaction sistem arızasında bile korunur (kalıcı depolamaya yazılır).`},{type:"qa",question:"S5: Normalizasyon nedir? 1NF, 2NF, 3NF nedir?",answer:`Normalizasyon, veri tekrarını azaltmak ve veri bütünlüğünü iyileştirmek için veritabanını düzenleme sürecidir.

1NF: Her sütun atomik değerler içerir. Tekrarlayan gruplar yok. Her satır benzersiz.

2NF: 1NF + her anahtar olmayan sütun BÜTÜNLEŞİK birincil anahtara bağlıdır (kısmi bağımlılıkları ortadan kaldırır).

3NF: 2NF + anahtar olmayan hiçbir sütun başka bir anahtar olmayan sütuna bağlı değildir (geçici bağımlılıkları ortadan kaldırır).`},{type:"qa",question:"S6: Index nedir? Ne zaman eklemelisiniz?",answer:`Index, veritabanının her satırı taramadan koşula uyan satırları bulmasını sağlayan veri yapısıdır (kitap indeksi gibi).

Index eklenecek durumlar:
• Sık WHERE koşullarında kullanılan sütunlar
• JOIN koşullarında kullanılan sütunlar (Foreign Key'ler her zaman index'lenmeli)
• Sık ORDER BY'da kullanılan sütunlar

Index eklememeniz gereken durumlar:
• Çok küçük tablolar
• Çok sık güncellenen sütunlar (index bakımı yazmaları yavaşlatır)
• Düşük kardinaliteli sütunlar (boolean, 3 değerli status)`},{type:"qa",question:"S7: UNION ile UNION ALL arasındaki fark nedir?",answer:`UNION: İki sorgunun sonuçlarını birleştirir ve tekrarlanan satırları kaldırır. Yavaştır çünkü tekrarları bulmak için tüm satırları karşılaştırması gerekir.

UNION ALL: İki sorgunun sonuçlarını birleştirir ve tekrarlar dahil TÜM satırları korur. Tekrar kaldırma adımı olmadığından daha hızlıdır.`,code:`-- UNION: tekrarları kaldır
SELECT email FROM kullanicilar
UNION
SELECT email FROM yoneticiler;

-- UNION ALL: tüm satırları koru (tekrarlar dahil)
SELECT email FROM kullanicilar
UNION ALL
SELECT email FROM yoneticiler;`},{type:"qa",question:"S8: Tabloda tekrarlayan kayıtları nasıl bulursunuz?",answer:`"Tekrar" tanımlayan sütunlara GROUP BY uygulayın ve 1'den fazla count olan grupları HAVING ile filtreleyin.`,code:`-- Tekrarlayan email'leri bul:
SELECT email, COUNT(*) AS sayi
FROM kullanicilar
GROUP BY email
HAVING COUNT(*) > 1;

-- Tüm tekrarlayan satırları al:
SELECT * FROM kullanicilar
WHERE email IN (
    SELECT email FROM kullanicilar
    GROUP BY email HAVING COUNT(*) > 1
)
ORDER BY email;`}]}]}};function Ng(){return n.jsx($a,{data:Tg,gradient:"from-blue-600 to-cyan-600",bgLight:"bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50"})}const jg={en:{hero:{title:"TypeScript for Automation Engineers",subtitle:"From Zero to Typed Playwright Tests",intro:"TypeScript is a strongly-typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and class-based object-oriented programming to the language. For automation engineers, TypeScript is the gold standard — Playwright is written in TypeScript and ships first-class type definitions out of the box."},tabs:["🎯 Introduction","📦 Installation","📚 Intermediate","🚀 Advanced","💼 Interview Q&A"],sections:[{title:"Introduction to TypeScript",blocks:[{type:"heading",text:"What is TypeScript?"},{type:"text",text:"TypeScript is an open-source programming language developed by Microsoft and first released in 2012. It is a strict syntactical superset of JavaScript — meaning every valid JavaScript program is also a valid TypeScript program. TypeScript adds optional static type annotations, interfaces, enums, generics, and modern ECMAScript features that compile down to clean, readable JavaScript."},{type:"heading",text:"Why Was TypeScript Created?"},{type:"text",text:"As JavaScript applications grew larger and more complex, developers at Microsoft (and across the industry) ran into serious problems: bugs that only appeared at runtime, no IDE autocomplete on custom objects, and codebases that became nearly impossible to refactor safely. Anders Hejlsberg — the designer of C# — led the TypeScript project to bring enterprise-grade tooling to JavaScript without abandoning its ecosystem."},{type:"list",title:"Problems TypeScript Solves",icon:"🛠️",items:[{label:"Runtime type errors",desc:"JS lets you call .toUpperCase() on a number — TypeScript catches this at compile time before you even run the code."},{label:"Missing autocomplete",desc:"Without types, your editor cannot know what properties an object has. TypeScript powers IntelliSense in VS Code."},{label:"Unsafe refactoring",desc:"Renaming a function in pure JS requires grep-and-hope. TypeScript tracks all usages and highlights every broken reference instantly."},{label:"Unclear function contracts",desc:"TS forces you to declare what a function accepts and returns, making code self-documenting."},{label:"Team-scale maintenance",desc:"Types act as living documentation that is always in sync with the code — unlike comments that get stale."}]},{type:"heading",text:"TypeScript Compilation: .ts → .js"},{type:"text",text:"TypeScript files use the .ts extension. The TypeScript compiler (tsc) reads these files, performs type checking, and emits plain .js files that any browser or Node.js runtime can execute. The types themselves are completely erased at runtime — they exist only to help you during development."},{type:"code",language:"typescript",code:`// hello.ts  (TypeScript source)
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
console.log(greet("TypeScript"));

// After tsc → hello.js  (compiled output)
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("TypeScript"));`},{type:"heading",text:"TypeScript in the Automation World"},{type:"text",text:"Playwright — the leading browser automation framework — is written entirely in TypeScript and ships TypeScript type definitions for every API. This means when you write a Playwright test in TypeScript you get autocomplete for every method on Page, Locator, BrowserContext, and more. You also get compile-time errors when you pass the wrong arguments, catching bugs before a single test runs."},{type:"info",text:"Playwright's official documentation shows all examples in TypeScript first. The Playwright VS Code extension is also powered by TypeScript language server features, giving you hover documentation and jump-to-definition on every API."},{type:"code",language:"typescript",code:`// Playwright test in TypeScript — full type safety
import { test, expect, Page } from '@playwright/test';

test('login page has title', async ({ page }: { page: Page }) => {
  await page.goto('https://example.com/login');
  // IDE autocomplete lists every method on 'page'
  await expect(page).toHaveTitle(/Login/);
});`},{type:"heading",text:"JavaScript vs TypeScript: Side-by-Side Comparison"},{type:"table",headers:["Feature","JavaScript","TypeScript"],rows:[["Type safety","None — types are dynamic","Static types checked at compile time"],["Autocomplete (IntelliSense)","Limited — depends on JSDoc","Full — powered by type definitions"],["Refactoring safety","Risky — no automated tracking","Safe — compiler tracks all usages"],["Error detection","Runtime only","Compile time + runtime"],["Learning curve","Lower","Slightly higher, pays off fast"],["Playwright support","Works but no type hints","First-class — full type definitions"],["tsconfig.json","Not applicable","Configures compilation behavior"],["Declaration files (.d.ts)","Not applicable","Describe types of JS libraries"],["Generics","Not available","Fully supported"],["Interfaces","Not available","Core language feature"]]},{type:"tip",text:"You do NOT need to be a TypeScript expert to start using it with Playwright. Even adding basic types to your Page Object Models dramatically improves maintainability and catches bugs early."}]},{title:"Installation & Setup",blocks:[{type:"heading",text:"Step 1 — Install Node.js"},{type:"text",text:"TypeScript runs on Node.js. Download the LTS release from nodejs.org. After installation, verify both node and npm are available in your terminal."},{type:"code",language:"bash",code:`node --version    # v20.x.x or higher recommended
npm --version     # 9.x or higher`},{type:"heading",text:"Step 2 — Install TypeScript Globally"},{type:"code",language:"bash",code:`npm install -g typescript
tsc --version    # Version 5.x.x`},{type:"info",text:"For project-level installations (recommended for teams), install TypeScript as a devDependency: npm install --save-dev typescript. This ensures everyone uses the same version."},{type:"heading",text:"Step 3 — Initialize tsconfig.json"},{type:"text",text:"tsconfig.json is the TypeScript configuration file. It tells the compiler which files to include, what JavaScript version to target, and which strict checks to enable."},{type:"code",language:"bash",code:"tsc --init    # Generates tsconfig.json with commented defaults"},{type:"heading",text:"Understanding tsconfig.json Key Options"},{type:"code",language:"json",code:`{
  "compilerOptions": {
    "target": "ES2020",         // Output JS version (ES5, ES2015, ES2020, ESNext)
    "module": "commonjs",       // Module system (commonjs for Node, ESNext for browser)
    "outDir": "./dist",         // Where compiled JS files go
    "rootDir": "./src",         // Where TypeScript source files live
    "strict": true,             // Enables all strict type checks (RECOMMENDED)
    "esModuleInterop": true,    // Allows default imports from CommonJS modules
    "skipLibCheck": true,       // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,  // Allow importing .json files
    "sourceMap": true           // Generate .map files for debugging
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`},{type:"table",headers:["Option","Purpose","Recommended Value"],rows:[["strict","Enables strictNullChecks, noImplicitAny, and more","true"],["target","JS version emitted by the compiler","ES2020"],["module","Module format in output files","commonjs (Node) / ESNext (browser)"],["outDir","Output directory for compiled files","./dist"],["esModuleInterop","Smoother import of CommonJS modules","true"],["sourceMap","Maps compiled JS back to TS for debugging","true"],["noUnusedLocals","Error on unused local variables","true"],["noImplicitReturns","Error when not all code paths return","true"]]},{type:"heading",text:"Step 4 — VS Code TypeScript Setup"},{type:"text",text:"VS Code has TypeScript support built in — no extension required. However, the following extensions greatly improve the experience:"},{type:"list",items:[{label:"ESLint",desc:"Linting for TypeScript code"},{label:"Prettier",desc:"Automatic code formatting"},{label:"Playwright Test for VS Code",desc:"Run and debug Playwright tests visually"},{label:"TypeScript Hero",desc:"Auto-organize imports"}]},{type:"heading",text:"Step 5 — Compile and Run Your First TypeScript File"},{type:"code",language:"typescript",code:'// src/index.ts\nconst message: string = "Hello from TypeScript!";\nconst year: number = new Date().getFullYear();\nconsole.log(`${message} Year: ${year}`);'},{type:"code",language:"bash",code:`tsc src/index.ts          # Compiles to src/index.js
node src/index.js         # Runs the compiled file`},{type:"heading",text:"Step 6 — ts-node: Run TypeScript Directly"},{type:"text",text:"ts-node is a TypeScript execution engine for Node.js. It compiles and runs .ts files on-the-fly without a separate compile step — perfect for scripts and quick prototyping."},{type:"code",language:"bash",code:`npm install -g ts-node
ts-node src/index.ts      # Compiles and runs in one step`},{type:"tip",text:"For Playwright projects, you don't need ts-node — Playwright handles TypeScript compilation internally via its built-in transform. Just run npx playwright test and it works."},{type:"heading",text:"Setting Up a Playwright TypeScript Project from Scratch"},{type:"steps",items:["mkdir my-automation && cd my-automation","npm init -y","npm install --save-dev @playwright/test typescript","npx playwright install","Create playwright.config.ts (see Advanced section)","Create tests/example.spec.ts","npx playwright test"]}]},{title:"Intermediate TypeScript",blocks:[{type:"heading",text:"Primitive Types"},{type:"code",language:"typescript",code:`// string
let username: string = "Alice";
let template: string = \`Hello \${username}\`;

// number (covers integers AND floats)
let age: number = 30;
let price: number = 9.99;
let hex: number = 0xff;

// boolean
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

// null and undefined
let nothing: null = null;
let notSet: undefined = undefined;

// any — AVOID: disables type checking
let wild: any = "anything";
wild = 42;
wild = true;

// unknown — safer alternative to any
let input: unknown = getUserInput();
if (typeof input === "string") {
  console.log(input.toUpperCase()); // safe — TS knows it's string here
}

// never — represents values that never occur
function throwError(msg: string): never {
  throw new Error(msg);
}

// void — function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
}`},{type:"table",headers:["Type","Description","Use Case"],rows:[["string","Text values","Names, URLs, messages"],["number","All numeric values","IDs, prices, counts"],["boolean","true / false","Flags, conditions"],["null","Intentional absence of value","Optional DB fields"],["undefined","Variable declared but not assigned","Uninitialized state"],["any","Disables type checking","Migration from JS (avoid in new code)"],["unknown","Type must be narrowed before use","External input, JSON.parse()"],["never","Code path that never completes","Exhaustive checks, throw functions"],["void","No meaningful return value","Event handlers, side-effect functions"]]},{type:"heading",text:"Type Inference"},{type:"text",text:"TypeScript can automatically infer types from the values you assign. You don't always need to write type annotations — the compiler is smart enough to figure it out."},{type:"code",language:"typescript",code:`let count = 10;          // inferred as number
let name = "Bob";        // inferred as string
let active = true;       // inferred as boolean

// TypeScript now knows count is a number:
count = "hello";         // Error: Type 'string' is not assignable to type 'number'

// Function return type is inferred too
function add(a: number, b: number) {
  return a + b;           // return type inferred as number
}`},{type:"heading",text:"Arrays and Tuples"},{type:"code",language:"typescript",code:`// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// Array of objects
const users: { id: number; name: string }[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Tuple — fixed length, fixed types at each position
let coordinate: [number, number] = [51.5, -0.1];
let entry: [string, number] = ["age", 30];

// Tuple with labels (TS 4+)
let point: [x: number, y: number] = [10, 20];

// Readonly array
const frozen: readonly string[] = ["a", "b", "c"];
// frozen.push("d"); // Error — cannot mutate readonly array`},{type:"heading",text:"Objects and Interfaces"},{type:"code",language:"typescript",code:`// Inline object type
let user: { id: number; name: string; email?: string } = {
  id: 1,
  name: "Alice",
  // email is optional — no error if omitted
};

// Interface — reusable, extendable
interface User {
  id: number;
  name: string;
  email?: string;          // optional property
  readonly createdAt: Date; // cannot be changed after creation
}

interface AdminUser extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}

const admin: AdminUser = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  role: "admin",
  permissions: ["read", "write", "delete"],
};`},{type:"heading",text:"Type Aliases vs Interfaces"},{type:"code",language:"typescript",code:`// Type alias — works for primitives, unions, tuples, and objects
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (error: Error | null, result: string) => void;

// Interface — for object shapes; supports declaration merging
interface Point {
  x: number;
  y: number;
}

// Extending
type Animal = { name: string };
type Dog = Animal & { breed: string };   // type — intersection

interface Animal { name: string }
interface Dog extends Animal { breed: string } // interface — extends

// Use interface for public APIs and class shapes
// Use type for unions, tuples, and complex type expressions`},{type:"tip",text:"Rule of thumb: use interface when describing the shape of an object or class. Use type when you need unions, tuples, or computed/mapped types."},{type:"heading",text:"Union Types and Intersection Types"},{type:"code",language:"typescript",code:`// Union — value can be one of several types
type Status = "active" | "inactive" | "pending";
type StringOrNumber = string | number;

function formatID(id: string | number): string {
  if (typeof id === "number") return id.toString();
  return id;
}

// Discriminated union — great for state machines
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: ApiState) {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return state.data.join(", ");
    case "error":   return \`Error: \${state.message}\`;
  }
}

// Intersection — value must satisfy ALL types
type WithTimestamps = { createdAt: Date; updatedAt: Date };
type UserWithTimestamps = User & WithTimestamps;`},{type:"heading",text:"Enums"},{type:"code",language:"typescript",code:`// Numeric enum (default — auto-increments)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
const move: Direction = Direction.Up;

// String enum — preferred for readability
enum Status {
  Active   = "ACTIVE",
  Inactive = "INACTIVE",
  Pending  = "PENDING",
}
const userStatus: Status = Status.Active; // "ACTIVE"

// Const enum — completely erased at compile time (best performance)
const enum Browser {
  Chrome = "chrome",
  Firefox = "firefox",
  Safari = "safari",
}
const browser: Browser = Browser.Chrome;
// Compiled output: const browser = "chrome"; — no enum object generated`},{type:"heading",text:"Functions: Types, Optional, and Default Parameters"},{type:"code",language:"typescript",code:`// Typed parameters and return type
function multiply(a: number, b: number): number {
  return a * b;
}

// Optional parameter (must come after required params)
function greet(name: string, title?: string): string {
  return title ? \`Hello, \${title} \${name}\` : \`Hello, \${name}\`;
}

// Default parameter
function createUser(name: string, role: string = "viewer"): User {
  return { id: Date.now(), name, role };
}

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// Function type annotation
type Transformer = (input: string) => string;
const toUpper: Transformer = (s) => s.toUpperCase();

// Arrow function with types
const divide = (a: number, b: number): number => a / b;

// Async function — return type is always Promise<T>
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json() as User;
}`},{type:"heading",text:"Generics — Introduction"},{type:"text",text:"Generics allow you to write reusable functions and types that work with any type while still maintaining type safety. Think of them as type parameters."},{type:"code",language:"typescript",code:`// Without generics — loses type info
function firstItem(arr: any[]): any {
  return arr[0];
}

// With generics — preserves type
function firstItem<T>(arr: T[]): T {
  return arr[0];
}

const num = firstItem([1, 2, 3]);       // inferred: number
const str = firstItem(["a", "b", "c"]); // inferred: string

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const response: ApiResponse<User[]> = {
  data: [{ id: 1, name: "Alice" }],
  status: 200,
  message: "OK",
};

// Generic with default type
interface Repository<T, ID = number> {
  findById(id: ID): Promise<T>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
}`},{type:"heading",text:"Type Assertions"},{type:"code",language:"typescript",code:`// Type assertion with 'as' — you tell TS what type it is
const input = document.getElementById("username") as HTMLInputElement;
input.value = "Alice"; // No error — TS trusts your assertion

// Double assertion (escape hatch — use sparingly)
const value = (someValue as unknown) as string;

// Non-null assertion operator (!)
const el = document.getElementById("app")!; // assert not null
el.innerHTML = "Hello";

// When to use: when you know more than TS does
// e.g., after checking at runtime, or when working with loose APIs
const data = JSON.parse(rawJson) as ApiResponse<User>;`},{type:"warning",text:"Type assertions bypass the compiler's safety checks. Only use them when you are absolutely sure about the type — a wrong assertion causes a runtime error, not a compile-time error."}]},{title:"Advanced TypeScript",blocks:[{type:"heading",text:"Utility Types"},{type:"text",text:"TypeScript ships a set of built-in generic types that let you transform existing types. These are indispensable in real-world projects."},{type:"code",language:"typescript",code:`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial<T> — all properties become optional
type UpdateUserDTO = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Required<T> — all properties become required
type StrictUser = Required<Partial<User>>;

// Readonly<T> — all properties become read-only
type FrozenUser = Readonly<User>;
// frozenUser.name = "Bob"; // Error!

// Pick<T, K> — keep only specified keys
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit<T, K> — remove specified keys
type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string; createdAt: Date }

// Record<K, V> — object with keys K and values V
type RoleMap = Record<string, string[]>;
const roles: RoleMap = { admin: ["read", "write"], viewer: ["read"] };

// Exclude<T, U> — remove from union
type NoNull = Exclude<string | null | undefined, null | undefined>;
// string

// Extract<T, U> — keep matching types from union
type OnlyStrings = Extract<string | number | boolean, string>;
// string

// NonNullable<T> — remove null and undefined
type SafeString = NonNullable<string | null | undefined>;
// string

// ReturnType<T> — extract return type of a function
function getUser() { return { id: 1, name: "Alice" }; }
type UserReturnType = ReturnType<typeof getUser>;
// { id: number; name: string }

// Parameters<T> — extract parameter types of a function
function createOrder(userId: number, items: string[]): void {}
type OrderParams = Parameters<typeof createOrder>;
// [userId: number, items: string[]]`},{type:"heading",text:"Advanced Generics"},{type:"code",language:"typescript",code:`// Generic constraints — T must have at least these properties
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice" };
const name = getProperty(user, "name");   // string
// getProperty(user, "age");              // Error — 'age' not in user

// Multiple type parameters
function merge<A, B>(obj1: A, obj2: B): A & B {
  return { ...obj1, ...obj2 } as A & B;
}

// Conditional types
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Infer in conditional types
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type Resolved = UnpackPromise<Promise<string>>; // string
type Plain    = UnpackPromise<number>;           // number

// Mapped types — transform every property
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // remove readonly
};
type Optional<T> = {
  [K in keyof T]?: T[K];          // make all optional
};`},{type:"heading",text:"Classes: Access Modifiers and Abstract Classes"},{type:"code",language:"typescript",code:`class BankAccount {
  public  readonly id: string;      // accessible everywhere, immutable
  private balance: number;           // only within this class
  protected owner: string;           // this class and subclasses

  constructor(owner: string, initialBalance: number) {
    this.id = crypto.randomUUID();
    this.owner = owner;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }

  // Shorthand constructor parameter declaration
  // constructor(private balance: number, readonly id: string) {}
}

// Abstract class — cannot be instantiated directly
abstract class BasePage {
  constructor(protected page: import("@playwright/test").Page) {}

  abstract waitForLoad(): Promise<void>; // subclass MUST implement

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForLoad();
  }
}

class LoginPage extends BasePage {
  private usernameInput = this.page.locator("#username");
  private passwordInput = this.page.locator("#password");
  private submitButton  = this.page.locator('button[type="submit"]');

  async waitForLoad(): Promise<void> {
    await this.usernameInput.waitFor({ state: "visible" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`},{type:"heading",text:"Decorators"},{type:"text",text:"Decorators are a stage-3 JavaScript proposal (enabled by default in TypeScript 5+). They are functions that can modify classes and their members at definition time."},{type:"code",language:"typescript",code:`// Enable in tsconfig: "experimentalDecorators": true (TS < 5)
// TS 5+ supports TC39 decorators natively

// Method decorator — adds logging
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    const result = original.apply(this, args);
    console.log(\`\${key} returned\`, result);
    return result;
  };
  return descriptor;
}

// Class decorator — adds metadata
function singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: T;
  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) return instance;
      super(...args);
      instance = this as any;
    }
  };
}

class UserService {
  @log
  findUser(id: number): string {
    return \`User \${id}\`;
  }
}

@singleton
class DatabaseConnection {
  connect() { console.log("Connected"); }
}`},{type:"heading",text:"TypeScript with Playwright: Typed Page Object Model"},{type:"code",language:"typescript",code:`// pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput    = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton   = page.locator('[data-testid="login-btn"]');
    this.errorMessage  = page.locator('[data-testid="error-msg"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}

// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");
  await expect(page).toHaveURL("/dashboard");
});`},{type:"heading",text:"Typed Fixtures with test.extend()"},{type:"code",language:"typescript",code:`// fixtures/index.ts
import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

// Define fixture types
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_EMAIL!,
      process.env.TEST_PASSWORD!
    );
    await use(page);
  },
});

export { expect } from "@playwright/test";

// tests/dashboard.spec.ts
import { test, expect } from "../fixtures";

test("dashboard loads after login", async ({ authenticatedPage }) => {
  await expect(authenticatedPage).toHaveURL("/dashboard");
});`},{type:"heading",text:"playwright.config.ts"},{type:"code",language:"typescript",code:`import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});`},{type:"heading",text:"Design Patterns in TypeScript"},{type:"code",language:"typescript",code:`// ── Builder Pattern ──────────────────────────────────────────
class RequestBuilder {
  private _method: string = "GET";
  private _url: string = "";
  private _headers: Record<string, string> = {};
  private _body?: unknown;

  method(m: string): this { this._method = m; return this; }
  url(u: string): this    { this._url = u;    return this; }
  header(k: string, v: string): this { this._headers[k] = v; return this; }
  body(b: unknown): this  { this._body = b;   return this; }

  build(): Request {
    return new Request(this._url, {
      method: this._method,
      headers: this._headers,
      body: this._body ? JSON.stringify(this._body) : undefined,
    });
  }
}

const req = new RequestBuilder()
  .url("/api/users")
  .method("POST")
  .header("Content-Type", "application/json")
  .body({ name: "Alice" })
  .build();

// ── Factory Pattern ───────────────────────────────────────────
interface Notification { send(message: string): void; }
class EmailNotification  implements Notification { send(m: string) { console.log("Email:", m); } }
class SlackNotification  implements Notification { send(m: string) { console.log("Slack:", m); } }

function createNotifier(type: "email" | "slack"): Notification {
  const map = { email: EmailNotification, slack: SlackNotification };
  return new map[type]();
}

// ── Strategy Pattern ──────────────────────────────────────────
interface SortStrategy { sort(data: number[]): number[]; }
class BubbleSort implements SortStrategy { sort(d: number[]) { return [...d].sort((a,b) => a-b); } }
class QuickSort  implements SortStrategy { sort(d: number[]) { return [...d].sort((a,b) => b-a); } }

class Sorter {
  constructor(private strategy: SortStrategy) {}
  setStrategy(s: SortStrategy) { this.strategy = s; }
  sort(data: number[]) { return this.strategy.sort(data); }
}`},{type:"heading",text:"Declaration Files (.d.ts) and Module Augmentation"},{type:"code",language:"typescript",code:`// my-library.d.ts — describes a JavaScript library
declare module "my-js-lib" {
  export function parseDate(input: string): Date;
  export interface Config {
    locale: string;
    timezone: string;
  }
}

// Module augmentation — add types to an existing module
declare module "@playwright/test" {
  interface Page {
    // Add a custom method to Playwright's Page type
    fillForm(fields: Record<string, string>): Promise<void>;
  }
}

// global.d.ts — extend global types
declare global {
  interface Window {
    __APP_CONFIG__: { apiUrl: string; version: string };
  }
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      TEST_EMAIL: string;
      TEST_PASSWORD: string;
      CI?: string;
    }
  }
}
export {}; // make this a module`}]},{title:"Interview Q&A",blocks:[{type:"heading",text:"TypeScript Interview Questions"},{type:"qa",question:"1. What is the difference between TypeScript and JavaScript?",answer:"TypeScript is a statically typed superset of JavaScript. It adds optional type annotations, interfaces, generics, enums, and access modifiers. TypeScript must be compiled to JavaScript before execution — browsers and Node.js run only JavaScript. The key benefit is that TypeScript catches type errors at compile time (during development), whereas JavaScript only reveals these errors at runtime in production."},{type:"qa",question:"2. What is type inference in TypeScript?",answer:"Type inference is the compiler's ability to automatically determine the type of a variable based on its initial value, without requiring an explicit type annotation. For example, `let x = 5` infers `x` as `number`. Inference also works for function return types and generic type parameters.",code:`let x = 5;           // inferred: number
let s = "hello";     // inferred: string
let arr = [1, 2, 3]; // inferred: number[]

function double(n: number) { return n * 2; }
// return type inferred as number`},{type:"qa",question:"3. What is the difference between interface and type?",answer:"Both describe object shapes, but they differ in capability. interface supports declaration merging (you can reopen and add to it), is preferred for OOP patterns, and is slightly more performant in the compiler. type supports union types, intersection, tuple types, and mapped types — use it when you need more expressive power. In practice: use interface for public APIs and class shapes, use type for unions, primitives, and computed types.",code:`// interface — can be extended and merged
interface Animal { name: string }
interface Animal { age: number } // merges — now has name AND age

// type — more expressive but no merging
type ID = string | number;
type Pair = [string, number];
type ReadonlyUser = Readonly<User>;`},{type:"qa",question:"4. What is the difference between any, unknown, and never?",answer:"`any` disables type checking entirely — you can do anything with it. Avoid it except during JS migration. `unknown` is the type-safe version of `any` — you must narrow the type (with typeof or instanceof) before using it, which forces you to handle it safely. `never` represents a value that can never exist — used for functions that always throw, infinite loops, or exhaustive type checks.",code:`let a: any     = "hello"; a.foo(); // OK — no type check
let u: unknown = "hello"; u.foo(); // Error — must narrow first
if (typeof u === "string") u.toUpperCase(); // OK after narrowing

function fail(msg: string): never { throw new Error(msg); }
function exhaustive(x: never): never { return fail("impossible"); }`},{type:"qa",question:"5. What are generics? Give a practical example.",answer:"Generics are type parameters that let you write functions, classes, and interfaces that work with any type while preserving type information. They are written inside angle brackets <T>. Without generics you either lose type info (using any) or duplicate code for each type.",code:`function identity<T>(value: T): T { return value; }
identity<string>("hello"); // returns string
identity<number>(42);      // returns number

// Practical: typed API wrapper
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as T;
}
const users = await fetchJson<User[]>("/api/users");
// users is User[] — fully typed`},{type:"qa",question:"6. Explain Partial, Pick, and Omit utility types.",answer:"These are built-in generic types that transform existing types. Partial<T> makes all properties optional — useful for update/patch DTOs. Pick<T, K> creates a new type with only the listed keys — useful for view models. Omit<T, K> creates a new type without the listed keys — useful for removing sensitive fields like passwords before sending to the client.",code:`interface User { id: number; name: string; email: string; password: string }

type UpdateUser = Partial<User>;
// { id?: number; name?: string; email?: string; password?: string }

type UserCard = Pick<User, "id" | "name">;
// { id: number; name: string }

type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string }`},{type:"qa",question:"7. What are union and intersection types?",answer:"A union type (A | B) means a value can be of type A or type B — at least one. An intersection type (A & B) means a value must satisfy both A and B simultaneously — all properties from both types. Unions are used for 'or' logic (string | number), intersections for combining types (User & Timestamped).",code:`type StringOrNum = string | number;
let val: StringOrNum = "hello"; val = 42; // both valid

type Named   = { name: string };
type Aged    = { age: number };
type Person  = Named & Aged;
const p: Person = { name: "Alice", age: 30 }; // must have both`},{type:"qa",question:"8. What is a decorator in TypeScript?",answer:"A decorator is a special function that can modify or annotate classes, methods, properties, or parameters at definition time. Decorators are written with an @ symbol. They are widely used in frameworks like Angular and NestJS for dependency injection, routing, and validation. Enable them with experimentalDecorators: true in tsconfig (TypeScript < 5) or use TypeScript 5+ which supports the TC39 standard decorators.",code:`function readonly(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Circle {
  @readonly
  getArea(radius: number): number {
    return Math.PI * radius ** 2;
  }
}`},{type:"qa",question:"9. What does strict mode enable in TypeScript?",answer:'Setting "strict": true in tsconfig.json enables a collection of strict type-checking flags: strictNullChecks (null/undefined are not assignable to other types), noImplicitAny (error when type is implicitly any), strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, and noImplicitThis. Together they eliminate entire categories of runtime bugs.',code:`// With strict: true
function greet(name: string) { return "Hello " + name; }
greet(null); // Error: Argument of type 'null' is not assignable to 'string'

// Without strict, this would silently pass and cause "Hello null" at runtime`},{type:"qa",question:"10. What are optional chaining and nullish coalescing?",answer:"Optional chaining (?.) short-circuits and returns undefined when accessing properties on null or undefined, instead of throwing. Nullish coalescing (??) returns the right-hand value only when the left side is null or undefined (unlike || which also triggers on 0 and empty string). Both are JavaScript features that TypeScript understands and type-checks.",code:`const user = getUser(); // User | null

// Without optional chaining
const city = user && user.address && user.address.city;

// With optional chaining
const city = user?.address?.city; // undefined if any step is null/undefined

// Nullish coalescing
const displayName = user?.name ?? "Anonymous"; // fallback only on null/undefined
const count = 0 ?? 10;  // 0 — because 0 is not null/undefined
const count2 = 0 || 10; // 10 — because 0 is falsy`},{type:"qa",question:"11. What is a declaration file (.d.ts)?",answer:"A declaration file describes the types of a JavaScript library without containing any runtime code. It uses the .d.ts extension. When you install @types/node or @types/jest, you are installing declaration files. They give TypeScript information about libraries written in plain JavaScript. You can also write custom .d.ts files to add type information to your own code or augment existing module types.",code:`// myLib.d.ts — no implementation, only type descriptions
declare function createUser(name: string): { id: number; name: string };
declare const VERSION: string;

declare module "csv-parser" {
  function parse(options?: { separator?: string }): NodeJS.ReadWriteStream;
  export = parse;
}`},{type:"qa",question:"12. How does TypeScript specifically help with Playwright automation?",answer:"Playwright ships complete TypeScript type definitions. This means: (1) Full autocomplete for every Playwright API — page methods, locator options, expect matchers. (2) Compile-time errors for wrong argument types — e.g., passing a number where a string is expected. (3) Typed Page Object Models with private/protected locators. (4) Typed custom fixtures via test.extend<MyFixtures>(). (5) Typed playwright.config.ts catches configuration errors before running. (6) Type-safe environment variables via global.d.ts."},{type:"qa",question:"13. What is the difference between compile-time and runtime errors in the TypeScript context?",answer:"A compile-time error is caught by the TypeScript compiler (tsc) while it is analyzing your source code — before any code executes. These are type errors, missing properties, wrong argument counts. A runtime error occurs when the program is actually running and the JavaScript engine encounters a problem — like calling .toLowerCase() on undefined. TypeScript eliminates most but not all runtime errors: it catches structural mistakes but cannot check things like network failures or user input values.",code:`// Compile-time error — tsc catches this immediately
const n: number = "hello"; // Error: Type 'string' not assignable to 'number'

// Runtime error — tsc cannot prevent this
const data = JSON.parse(userInput); // type is 'any' — TS cannot know the shape
data.user.name; // may throw at runtime if 'user' is undefined`},{type:"qa",question:"14. What is module resolution in TypeScript?",answer:"Module resolution is the algorithm TypeScript uses to find the file that a given import refers to. The two main strategies are: Classic (older, for AMD/SystemJS) and Node (mirrors Node.js resolution — looks for index.ts, package.json main, @types packages). TypeScript 5+ adds Bundler mode which mirrors modern bundler behavior. You configure it with moduleResolution in tsconfig.json. Path mapping (paths option) lets you create import aliases like @/components instead of ../../components.",code:`// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node16", // or "bundler" for Vite/webpack
    "paths": {
      "@/*": ["./src/*"],
      "@pages/*": ["./src/pages/*"]
    }
  }
}

// Now you can write:
import { LoginPage } from "@pages/LoginPage";
// instead of: import { LoginPage } from "../../pages/LoginPage";`},{type:"qa",question:"15. How do you type async functions in TypeScript?",answer:"An async function always returns a Promise. Its return type annotation must be Promise<T> where T is the resolved value type. TypeScript infers the return type automatically from the return statement, so explicit annotation is optional but recommended for public APIs. You can also use Awaited<T> to get the resolved type of a Promise.",code:`// Explicit return type
async function getUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("User not found");
  return res.json() as User;
}

// Inferred return type (also Promise<User>)
async function getCurrentUser() {
  return getUser(1); // TS infers Promise<User>
}

// Awaited utility type
type UserType = Awaited<ReturnType<typeof getUser>>; // User

// Async arrow function
const deleteUser = async (id: number): Promise<void> => {
  await fetch(\`/api/users/\${id}\`, { method: "DELETE" });
};

// Error handling pattern
async function safeGetUser(id: number): Promise<User | null> {
  try {
    return await getUser(id);
  } catch {
    return null;
  }
}`},{type:"divider"},{type:"tip",text:"Pro tip for Playwright interviews: mention that TypeScript's strict mode combined with Playwright's typed API makes it nearly impossible to write a test that calls a non-existent method or passes wrong argument types — the compiler rejects it before you even run the tests."}]}]},tr:{hero:{title:"Otomasyon Mühendisleri için TypeScript",subtitle:"Sıfırdan Tipli Playwright Testlerine",intro:"TypeScript, düz JavaScript'e derlenen, güçlü tipli bir JavaScript üst kümesidir. Dile isteğe bağlı statik tipleme ve sınıf tabanlı nesne yönelimli programlama ekler. Otomasyon mühendisleri için TypeScript altın standarttır — Playwright tamamen TypeScript ile yazılmıştır ve kutudan çıktığı gibi birinci sınıf tip tanımlarıyla gelir."},tabs:["🎯 Giriş","📦 Kurulum","📚 Orta Seviye","🚀 İleri Seviye","💼 Mülakat S&C"],sections:[{title:"TypeScript'e Giriş",blocks:[{type:"heading",text:"TypeScript Nedir?"},{type:"text",text:"TypeScript, Microsoft tarafından geliştirilen ve ilk olarak 2012 yılında yayımlanan açık kaynaklı bir programlama dilidir. JavaScript'in katı sözdizimsel bir üst kümesidir — yani her geçerli JavaScript programı aynı zamanda geçerli bir TypeScript programıdır. TypeScript; isteğe bağlı statik tür ek açıklamaları, interface'ler, enum'lar, generic'ler ve temiz, okunabilir JavaScript'e derlenen modern ECMAScript özellikleri ekler."},{type:"heading",text:"TypeScript Neden Oluşturuldu?"},{type:"text",text:"JavaScript uygulamaları büyüyüp karmaşıklaştıkça, Microsoft'taki (ve sektördeki) geliştiriciler ciddi sorunlarla karşılaştı: yalnızca çalışma zamanında ortaya çıkan hatalar, özel nesnelerde IDE otomatik tamamlaması olmaması ve güvenle yeniden düzenlemesi neredeyse imkânsız hale gelen kod tabanları. C# tasarımcısı olan Anders Hejlsberg, JavaScript ekosistemini terk etmeden enterprise düzeyinde araçları JavaScript'e getirmek için TypeScript projesini yönetti."},{type:"list",title:"TypeScript'in Çözdüğü Sorunlar",icon:"🛠️",items:[{label:"Çalışma zamanı tür hataları",desc:"JS, bir sayı üzerinde .toUpperCase() çağırmanıza izin verir — TypeScript bunu siz kodu çalıştırmadan derleme zamanında yakalar."},{label:"Eksik otomatik tamamlama",desc:"Tipler olmadan editörünüz bir nesnenin hangi özelliklere sahip olduğunu bilemez. TypeScript, VS Code'daki IntelliSense'i güçlendirir."},{label:"Güvensiz yeniden düzenleme",desc:"Saf JS'de bir fonksiyonu yeniden adlandırmak grep-ve-umut gerektirir. TypeScript tüm kullanımları izler ve her bozuk referansı anında vurgular."},{label:"Belirsiz fonksiyon sözleşmeleri",desc:"TS, bir fonksiyonun neyi kabul ettiğini ve ne döndürdüğünü bildirmenizi zorunlu kılar; bu da kodu kendi kendini belgeler hale getirir."},{label:"Ekip ölçeğinde bakım",desc:"Tipler, kodla her zaman senkronize olan canlı belgeler görevi görür — bayatlamaya mahkûm yorumların aksine."}]},{type:"heading",text:"TypeScript Derlemesi: .ts → .js"},{type:"text",text:"TypeScript dosyaları .ts uzantısını kullanır. TypeScript derleyicisi (tsc) bu dosyaları okur, tür denetimi gerçekleştirir ve herhangi bir tarayıcı veya Node.js çalışma ortamının çalıştırabileceği düz .js dosyaları oluşturur. Tipler çalışma zamanında tamamen silinir — yalnızca geliştirme aşamasında size yardımcı olmak için vardırlar."},{type:"code",language:"typescript",code:`// hello.ts  (TypeScript kaynağı)
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
console.log(greet("TypeScript"));

// tsc sonrası → hello.js  (derlenmiş çıktı)
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("TypeScript"));`},{type:"heading",text:"Otomasyon Dünyasında TypeScript"},{type:"text",text:"Önde gelen tarayıcı otomasyon çerçevesi olan Playwright, tamamen TypeScript ile yazılmıştır ve her API için TypeScript tip tanımları içerir. Bu, TypeScript ile bir Playwright testi yazarken Page, Locator, BrowserContext ve diğerleri üzerindeki her yöntem için otomatik tamamlama alacağınız anlamına gelir. Ayrıca yanlış argüman ilettiğinizde derleme zamanı hataları alırsınız; bu da tek bir test çalıştırmadan önce hataları yakalar."},{type:"info",text:"Playwright'ın resmi belgeleri tüm örnekleri önce TypeScript'te gösterir. Playwright VS Code uzantısı da her API'de üzerine gelme belgeleri ve tanıma atlama sağlayan TypeScript dil sunucusu özellikleriyle güçlendirilmiştir."},{type:"code",language:"typescript",code:`// TypeScript'te Playwright testi — tam tür güvenliği
import { test, expect, Page } from '@playwright/test';

test('login page has title', async ({ page }: { page: Page }) => {
  await page.goto('https://example.com/login');
  // IDE otomatik tamamlama 'page' üzerindeki her yöntemi listeler
  await expect(page).toHaveTitle(/Login/);
});`},{type:"heading",text:"JavaScript ve TypeScript: Yan Yana Karşılaştırma"},{type:"table",headers:["Özellik","JavaScript","TypeScript"],rows:[["Tür güvenliği","Yok — tipler dinamik","Derleme zamanında kontrol edilen statik tipler"],["Otomatik tamamlama (IntelliSense)","Sınırlı — JSDoc'a bağlı","Tam — tip tanımlarıyla desteklenir"],["Yeniden düzenleme güvenliği","Riskli — otomatik izleme yok","Güvenli — derleyici tüm kullanımları izler"],["Hata tespiti","Yalnızca çalışma zamanı","Derleme zamanı + çalışma zamanı"],["Öğrenme eğrisi","Daha düşük","Biraz daha yüksek, hızla karşılığını verir"],["Playwright desteği","Çalışır ama tip ipucu yok","Birinci sınıf — tam tip tanımları"],["tsconfig.json","Geçerli değil","Derleme davranışını yapılandırır"],["Bildirim dosyaları (.d.ts)","Geçerli değil","JS kütüphanelerinin tiplerini tanımlar"],["Generic'ler","Mevcut değil","Tam desteklenir"],["Interface'ler","Mevcut değil","Temel dil özelliği"]]},{type:"tip",text:"Playwright ile kullanmaya başlamak için TypeScript uzmanı olmanıza gerek yok. Page Object Model'larınıza temel tipler eklemek bile bakım kolaylığını önemli ölçüde artırır ve hataları erkenden yakalar."}]},{title:"Kurulum ve Yapılandırma",blocks:[{type:"heading",text:"Adım 1 — Node.js'i Yükle"},{type:"text",text:"TypeScript, Node.js üzerinde çalışır. nodejs.org adresinden LTS sürümünü indirin. Kurulumdan sonra terminalde hem node hem npm'in mevcut olduğunu doğrulayın."},{type:"code",language:"bash",code:`node --version    # v20.x.x veya üzeri önerilir
npm --version     # 9.x veya üzeri`},{type:"heading",text:"Adım 2 — TypeScript'i Global Olarak Yükle"},{type:"code",language:"bash",code:`npm install -g typescript
tsc --version    # Version 5.x.x`},{type:"info",text:"Proje düzeyinde kurulum için (ekipler için önerilir) TypeScript'i devDependency olarak kurun: npm install --save-dev typescript. Bu, herkesin aynı sürümü kullanmasını sağlar."},{type:"heading",text:"Adım 3 — tsconfig.json'u Başlat"},{type:"text",text:"tsconfig.json, TypeScript yapılandırma dosyasıdır. Derleyiciye hangi dosyaların dahil edileceğini, hangi JavaScript sürümünün hedefleneceğini ve hangi katı denetimlerin etkinleştirileceğini bildirir."},{type:"code",language:"bash",code:"tsc --init    # Yorumlu varsayılanlarla tsconfig.json oluşturur"},{type:"heading",text:"tsconfig.json Temel Seçenekleri"},{type:"code",language:"json",code:`{
  "compilerOptions": {
    "target": "ES2020",         // Çıktı JS sürümü (ES5, ES2015, ES2020, ESNext)
    "module": "commonjs",       // Modül sistemi (Node için commonjs, tarayıcı için ESNext)
    "outDir": "./dist",         // Derlenen JS dosyalarının gideceği yer
    "rootDir": "./src",         // TypeScript kaynak dosyalarının bulunduğu yer
    "strict": true,             // Tüm katı tür denetimlerini etkinleştirir (ÖNERİLEN)
    "esModuleInterop": true,    // CommonJS modüllerinden varsayılan içe aktarmaya izin verir
    "skipLibCheck": true,       // Bildirim dosyalarının tür denetimini atla
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,  // .json dosyalarını içe aktarmaya izin ver
    "sourceMap": true           // Hata ayıklama için .map dosyaları oluştur
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`},{type:"table",headers:["Seçenek","Amacı","Önerilen Değer"],rows:[["strict","strictNullChecks, noImplicitAny ve daha fazlasını etkinleştirir","true"],["target","Derleyicinin yaydığı JS sürümü","ES2020"],["module","Çıktı dosyalarındaki modül formatı","commonjs (Node) / ESNext (tarayıcı)"],["outDir","Derlenmiş dosyalar için çıktı dizini","./dist"],["esModuleInterop","CommonJS modüllerini daha kolay içe aktarma","true"],["sourceMap","Derlenmiş JS'yi hata ayıklama için TS'ye geri eşler","true"],["noUnusedLocals","Kullanılmayan yerel değişkenlerde hata","true"],["noImplicitReturns","Tüm kod yolları return etmediğinde hata","true"]]},{type:"heading",text:"Adım 4 — VS Code TypeScript Kurulumu"},{type:"text",text:"VS Code'da TypeScript desteği yerleşik olarak bulunur — uzantı gerekmez. Ancak aşağıdaki uzantılar deneyimi büyük ölçüde iyileştirir:"},{type:"list",items:[{label:"ESLint",desc:"TypeScript kodu için linting"},{label:"Prettier",desc:"Otomatik kod biçimlendirme"},{label:"Playwright Test for VS Code",desc:"Playwright testlerini görsel olarak çalıştırın ve hata ayıklayın"},{label:"TypeScript Hero",desc:"Otomatik import düzenleme"}]},{type:"heading",text:"Adım 5 — İlk TypeScript Dosyanızı Derleyin ve Çalıştırın"},{type:"code",language:"typescript",code:'// src/index.ts\nconst message: string = "Hello from TypeScript!";\nconst year: number = new Date().getFullYear();\nconsole.log(`${message} Year: ${year}`);'},{type:"code",language:"bash",code:`tsc src/index.ts          # src/index.js olarak derlenir
node src/index.js         # Derlenmiş dosyayı çalıştırır`},{type:"heading",text:"Adım 6 — ts-node: TypeScript'i Doğrudan Çalıştırın"},{type:"text",text:"ts-node, Node.js için bir TypeScript yürütme motorudur. .ts dosyalarını ayrı bir derleme adımı olmadan anında derler ve çalıştırır — betikler ve hızlı prototipleme için mükemmeldir."},{type:"code",language:"bash",code:`npm install -g ts-node
ts-node src/index.ts      # Tek adımda derler ve çalıştırır`},{type:"tip",text:"Playwright projeleri için ts-node'a ihtiyacınız yok — Playwright TypeScript derlemesini dahili dönüştürücüsü aracılığıyla halleder. Sadece npx playwright test çalıştırın, hepsi bu."},{type:"heading",text:"Sıfırdan Playwright TypeScript Projesi Kurma"},{type:"steps",items:["mkdir my-automation && cd my-automation","npm init -y","npm install --save-dev @playwright/test typescript","npx playwright install","playwright.config.ts oluştur (İleri Seviye bölümüne bakın)","tests/example.spec.ts oluştur","npx playwright test"]}]},{title:"Orta Seviye TypeScript",blocks:[{type:"heading",text:"İlkel Tipler"},{type:"code",language:"typescript",code:`// string
let username: string = "Alice";
let template: string = \`Hello \${username}\`;

// number (tam sayıları VE ondalıkları kapsar)
let age: number = 30;
let price: number = 9.99;
let hex: number = 0xff;

// boolean
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

// null ve undefined
let nothing: null = null;
let notSet: undefined = undefined;

// any — KAÇININ: tür denetimini devre dışı bırakır
let wild: any = "anything";
wild = 42;
wild = true;

// unknown — any'nin daha güvenli alternatifi
let input: unknown = getUserInput();
if (typeof input === "string") {
  console.log(input.toUpperCase()); // güvenli — TS burada string olduğunu bilir
}

// never — asla oluşmayan değerleri temsil eder
function throwError(msg: string): never {
  throw new Error(msg);
}

// void — fonksiyon hiçbir şey döndürmez
function logMessage(msg: string): void {
  console.log(msg);
}`},{type:"table",headers:["Tip","Açıklama","Kullanım Alanı"],rows:[["string","Metin değerleri","İsimler, URL'ler, mesajlar"],["number","Tüm sayısal değerler","ID'ler, fiyatlar, sayılar"],["boolean","true / false","Bayraklar, koşullar"],["null","Değerin kasıtlı yokluğu","İsteğe bağlı DB alanları"],["undefined","Bildirilmiş ama atanmamış değişken","Başlatılmamış durum"],["any","Tür denetimini devre dışı bırakır","JS'den geçiş (yeni kodda kaçının)"],["unknown","Kullanmadan önce tip daraltılmalı","Dış girdi, JSON.parse()"],["never","Hiçbir zaman tamamlanmayan kod yolu","Kapsamlı denetimler, throw fonksiyonları"],["void","Anlamlı dönüş değeri yok","Olay yöneticileri, yan etki fonksiyonları"]]},{type:"heading",text:"Tip Çıkarımı"},{type:"text",text:"TypeScript, atadığınız değerlerden tipleri otomatik olarak çıkarabilir. Her zaman tip ek açıklamaları yazmanıza gerek yoktur — derleyici bunu kendi başına anlayacak kadar zekidir."},{type:"code",language:"typescript",code:`let count = 10;          // number olarak çıkarıldı
let name = "Bob";        // string olarak çıkarıldı
let active = true;       // boolean olarak çıkarıldı

// TypeScript artık count'un number olduğunu biliyor:
count = "hello";         // Hata: 'string' tipi 'number' tipine atanamaz

// Fonksiyon dönüş tipi de çıkarılır
function add(a: number, b: number) {
  return a + b;           // dönüş tipi number olarak çıkarıldı
}`},{type:"heading",text:"Diziler ve Tuple'lar"},{type:"code",language:"typescript",code:`// Diziler
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// Nesne dizisi
const users: { id: number; name: string }[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Tuple — sabit uzunluk, her pozisyonda sabit tipler
let coordinate: [number, number] = [51.5, -0.1];
let entry: [string, number] = ["age", 30];

// Etiketli tuple (TS 4+)
let point: [x: number, y: number] = [10, 20];

// Salt okunur dizi
const frozen: readonly string[] = ["a", "b", "c"];
// frozen.push("d"); // Hata — salt okunur dizi değiştirilemez`},{type:"heading",text:"Nesneler ve Interface'ler"},{type:"code",language:"typescript",code:`// Satır içi nesne tipi
let user: { id: number; name: string; email?: string } = {
  id: 1,
  name: "Alice",
  // email isteğe bağlı — atlanırsa hata yok
};

// Interface — yeniden kullanılabilir, genişletilebilir
interface User {
  id: number;
  name: string;
  email?: string;          // isteğe bağlı özellik
  readonly createdAt: Date; // oluşturulduktan sonra değiştirilemez
}

interface AdminUser extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}

const admin: AdminUser = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  role: "admin",
  permissions: ["read", "write", "delete"],
};`},{type:"heading",text:"Type Alias ve Interface Farkı"},{type:"code",language:"typescript",code:`// Type alias — primitive'ler, union'lar, tuple'lar ve nesneler için çalışır
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (error: Error | null, result: string) => void;

// Interface — nesne şekilleri için; bildirim birleştirmeyi destekler
interface Point {
  x: number;
  y: number;
}

// Genişletme
type Animal = { name: string };
type Dog = Animal & { breed: string };   // type — kesişim

interface Animal { name: string }
interface Dog extends Animal { breed: string } // interface — extends

// Genel API'ler ve sınıf şekilleri için interface kullanın
// Union'lar, tuple'lar ve karmaşık tip ifadeleri için type kullanın`},{type:"tip",text:"Temel kural: bir nesnenin veya sınıfın şeklini tanımlarken interface kullanın. Union'lar, tuple'lar veya hesaplanmış/eşlenmiş tipler için type kullanın."},{type:"heading",text:"Union ve Intersection Tipleri"},{type:"code",language:"typescript",code:`// Union — değer birkaç tipten biri olabilir
type Status = "active" | "inactive" | "pending";
type StringOrNumber = string | number;

function formatID(id: string | number): string {
  if (typeof id === "number") return id.toString();
  return id;
}

// Ayrımcı union — durum makineleri için mükemmel
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: ApiState) {
  switch (state.status) {
    case "loading": return "Yükleniyor...";
    case "success": return state.data.join(", ");
    case "error":   return \`Hata: \${state.message}\`;
  }
}

// Intersection — değer TÜM tipleri karşılamalıdır
type WithTimestamps = { createdAt: Date; updatedAt: Date };
type UserWithTimestamps = User & WithTimestamps;`},{type:"heading",text:"Enum'lar"},{type:"code",language:"typescript",code:`// Sayısal enum (varsayılan — otomatik artış)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
const move: Direction = Direction.Up;

// String enum — okunabilirlik için tercih edilir
enum Status {
  Active   = "ACTIVE",
  Inactive = "INACTIVE",
  Pending  = "PENDING",
}
const userStatus: Status = Status.Active; // "ACTIVE"

// Const enum — derleme zamanında tamamen silinir (en iyi performans)
const enum Browser {
  Chrome = "chrome",
  Firefox = "firefox",
  Safari = "safari",
}
const browser: Browser = Browser.Chrome;
// Derlenmiş çıktı: const browser = "chrome"; — enum nesnesi oluşturulmaz`},{type:"heading",text:"Fonksiyonlar: Tipler, İsteğe Bağlı ve Varsayılan Parametreler"},{type:"code",language:"typescript",code:`// Tipli parametreler ve dönüş tipi
function multiply(a: number, b: number): number {
  return a * b;
}

// İsteğe bağlı parametre (zorunlu parametrelerden sonra gelmeli)
function greet(name: string, title?: string): string {
  return title ? \`Hello, \${title} \${name}\` : \`Hello, \${name}\`;
}

// Varsayılan parametre
function createUser(name: string, role: string = "viewer"): User {
  return { id: Date.now(), name, role };
}

// Rest parametreleri
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// Fonksiyon tipi ek açıklaması
type Transformer = (input: string) => string;
const toUpper: Transformer = (s) => s.toUpperCase();

// Tipli arrow function
const divide = (a: number, b: number): number => a / b;

// Async fonksiyon — dönüş tipi her zaman Promise<T>
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json() as User;
}`},{type:"heading",text:"Generic'ler — Giriş"},{type:"text",text:"Generic'ler, tür güvenliğini korurken herhangi bir tipte çalışan yeniden kullanılabilir fonksiyonlar ve tipler yazmanıza olanak tanır. Tip parametreleri olarak düşünün."},{type:"code",language:"typescript",code:`// Generic'siz — tip bilgisi kaybolur
function firstItem(arr: any[]): any {
  return arr[0];
}

// Generic ile — tipi korur
function firstItem<T>(arr: T[]): T {
  return arr[0];
}

const num = firstItem([1, 2, 3]);       // çıkarıldı: number
const str = firstItem(["a", "b", "c"]); // çıkarıldı: string

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const response: ApiResponse<User[]> = {
  data: [{ id: 1, name: "Alice" }],
  status: 200,
  message: "OK",
};`},{type:"heading",text:"Tip Doğrulaması (Type Assertions)"},{type:"code",language:"typescript",code:`// 'as' ile tip doğrulaması — TS'ye tipin ne olduğunu söylersiniz
const input = document.getElementById("username") as HTMLInputElement;
input.value = "Alice"; // Hata yok — TS doğrulamanıza güvenir

// Çift doğrulama (kaçış yolu — dikkatli kullanın)
const value = (someValue as unknown) as string;

// Non-null doğrulama operatörü (!)
const el = document.getElementById("app")!; // null olmadığını doğrula
el.innerHTML = "Hello";

// Ne zaman kullanılır: TS'den daha fazlasını bildiğinizde
// örn. çalışma zamanında kontrol ettikten sonra veya gevşek API'lerle çalışırken
const data = JSON.parse(rawJson) as ApiResponse<User>;`},{type:"warning",text:"Tip doğrulamaları derleyicinin güvenlik denetimlerini atlar. Yalnızca tip hakkında kesinlikle emin olduğunuzda kullanın — yanlış bir doğrulama derleme zamanı hatası değil, çalışma zamanı hatasına neden olur."}]},{title:"İleri Seviye TypeScript",blocks:[{type:"heading",text:"Utility Tipleri"},{type:"text",text:"TypeScript, mevcut tipleri dönüştürmenize olanak tanıyan bir dizi yerleşik generic tip içerir. Bunlar gerçek dünya projelerinde vazgeçilmezdir."},{type:"code",language:"typescript",code:`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial<T> — tüm özellikler isteğe bağlı hale gelir
type UpdateUserDTO = Partial<User>;

// Required<T> — tüm özellikler zorunlu hale gelir
type StrictUser = Required<Partial<User>>;

// Readonly<T> — tüm özellikler salt okunur hale gelir
type FrozenUser = Readonly<User>;

// Pick<T, K> — yalnızca belirtilen anahtarları tut
type UserPreview = Pick<User, "id" | "name">;

// Omit<T, K> — belirtilen anahtarları kaldır
type PublicUser = Omit<User, "password">;

// Record<K, V> — K anahtarları ve V değerleri olan nesne
type RoleMap = Record<string, string[]>;

// Exclude<T, U> — union'dan kaldır
type NoNull = Exclude<string | null | undefined, null | undefined>;

// Extract<T, U> — union'dan eşleşen tipleri tut
type OnlyStrings = Extract<string | number | boolean, string>;

// NonNullable<T> — null ve undefined'ı kaldır
type SafeString = NonNullable<string | null | undefined>;

// ReturnType<T> — bir fonksiyonun dönüş tipini çıkar
function getUser() { return { id: 1, name: "Alice" }; }
type UserReturnType = ReturnType<typeof getUser>;

// Parameters<T> — bir fonksiyonun parametre tiplerini çıkar
function createOrder(userId: number, items: string[]): void {}
type OrderParams = Parameters<typeof createOrder>;`},{type:"heading",text:"İleri Seviye Generic'ler"},{type:"code",language:"typescript",code:`// Generic kısıtlamalar — T en azından bu özelliklere sahip olmalı
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice" };
const name = getProperty(user, "name");   // string
// getProperty(user, "age");              // Hata — 'age' user'da yok

// Birden fazla tip parametresi
function merge<A, B>(obj1: A, obj2: B): A & B {
  return { ...obj1, ...obj2 } as A & B;
}

// Koşullu tipler
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Koşullu tiplerde infer
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type Resolved = UnpackPromise<Promise<string>>; // string

// Eşlenmiş tipler — her özelliği dönüştür
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // readonly'i kaldır
};`},{type:"heading",text:"Sınıflar: Erişim Belirteçleri ve Abstract Sınıflar"},{type:"code",language:"typescript",code:`class BankAccount {
  public  readonly id: string;      // her yerden erişilebilir, değiştirilemez
  private balance: number;           // yalnızca bu sınıf içinde
  protected owner: string;           // bu sınıf ve alt sınıflar

  constructor(owner: string, initialBalance: number) {
    this.id = crypto.randomUUID();
    this.owner = owner;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount <= 0) throw new Error("Miktar pozitif olmalı");
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

// Abstract sınıf — doğrudan örneklenemez
abstract class BasePage {
  constructor(protected page: import("@playwright/test").Page) {}

  abstract waitForLoad(): Promise<void>; // alt sınıf MUTLAKA uygulamalı

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForLoad();
  }
}

class LoginPage extends BasePage {
  private usernameInput = this.page.locator("#username");
  private passwordInput = this.page.locator("#password");
  private submitButton  = this.page.locator('button[type="submit"]');

  async waitForLoad(): Promise<void> {
    await this.usernameInput.waitFor({ state: "visible" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`},{type:"heading",text:"Decorator'lar"},{type:"text",text:"Decorator'lar, aşama-3 JavaScript önerisidir (TypeScript 5+'da varsayılan olarak etkin). Tanımlama zamanında sınıfları ve üyelerini değiştirebilen fonksiyonlardır."},{type:"code",language:"typescript",code:`// tsconfig'de etkinleştir: "experimentalDecorators": true (TS < 5)
// TS 5+ TC39 decorator'larını yerel olarak destekler

// Method decorator — loglama ekler
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    const result = original.apply(this, args);
    console.log(\`\${key} returned\`, result);
    return result;
  };
  return descriptor;
}

// Class decorator — metadata ekler
function singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: T;
  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) return instance;
      super(...args);
      instance = this as any;
    }
  };
}

class UserService {
  @log
  findUser(id: number): string {
    return \`User \${id}\`;
  }
}

@singleton
class DatabaseConnection {
  connect() { console.log("Bağlandı"); }
}`},{type:"heading",text:"TypeScript ile Playwright: Tipli Page Object Model"},{type:"code",language:"typescript",code:`// pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput    = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton   = page.locator('[data-testid="login-btn"]');
    this.errorMessage  = page.locator('[data-testid="error-msg"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}

// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("başarılı giriş", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");
  await expect(page).toHaveURL("/dashboard");
});`},{type:"heading",text:"test.extend() ile Tipli Fixture'lar"},{type:"code",language:"typescript",code:`// fixtures/index.ts
import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

// Fixture tiplerini tanımla
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_EMAIL!,
      process.env.TEST_PASSWORD!
    );
    await use(page);
  },
});

export { expect } from "@playwright/test";`},{type:"heading",text:"playwright.config.ts"},{type:"code",language:"typescript",code:`import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});`},{type:"heading",text:"TypeScript'te Tasarım Kalıpları"},{type:"code",language:"typescript",code:`// ── Builder Kalıbı ───────────────────────────────────────────
class RequestBuilder {
  private _method: string = "GET";
  private _url: string = "";
  private _headers: Record<string, string> = {};
  private _body?: unknown;

  method(m: string): this { this._method = m; return this; }
  url(u: string): this    { this._url = u;    return this; }
  header(k: string, v: string): this { this._headers[k] = v; return this; }
  body(b: unknown): this  { this._body = b;   return this; }

  build(): Request {
    return new Request(this._url, {
      method: this._method,
      headers: this._headers,
      body: this._body ? JSON.stringify(this._body) : undefined,
    });
  }
}

const req = new RequestBuilder()
  .url("/api/users")
  .method("POST")
  .header("Content-Type", "application/json")
  .body({ name: "Alice" })
  .build();

// ── Factory Kalıbı ────────────────────────────────────────────
interface Notification { send(message: string): void; }
class EmailNotification  implements Notification { send(m: string) { console.log("Email:", m); } }
class SlackNotification  implements Notification { send(m: string) { console.log("Slack:", m); } }

function createNotifier(type: "email" | "slack"): Notification {
  const map = { email: EmailNotification, slack: SlackNotification };
  return new map[type]();
}

// ── Strategy Kalıbı ───────────────────────────────────────────
interface SortStrategy { sort(data: number[]): number[]; }
class BubbleSort implements SortStrategy { sort(d: number[]) { return [...d].sort((a,b) => a-b); } }
class QuickSort  implements SortStrategy { sort(d: number[]) { return [...d].sort((a,b) => b-a); } }

class Sorter {
  constructor(private strategy: SortStrategy) {}
  setStrategy(s: SortStrategy) { this.strategy = s; }
  sort(data: number[]) { return this.strategy.sort(data); }
}`},{type:"heading",text:"Bildirim Dosyaları (.d.ts) ve Modül Genişletme"},{type:"code",language:"typescript",code:`// my-library.d.ts — bir JavaScript kütüphanesini tanımlar
declare module "my-js-lib" {
  export function parseDate(input: string): Date;
  export interface Config {
    locale: string;
    timezone: string;
  }
}

// Modül genişletme — mevcut bir modüle tip ekle
declare module "@playwright/test" {
  interface Page {
    // Playwright'ın Page tipine özel metod ekle
    fillForm(fields: Record<string, string>): Promise<void>;
  }
}

// global.d.ts — global tipleri genişlet
declare global {
  interface Window {
    __APP_CONFIG__: { apiUrl: string; version: string };
  }
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      TEST_EMAIL: string;
      TEST_PASSWORD: string;
      CI?: string;
    }
  }
}
export {};`}]},{title:"Mülakat Soruları ve Cevapları",blocks:[{type:"heading",text:"TypeScript Mülakat Soruları"},{type:"qa",question:"1. TypeScript ile JavaScript arasındaki fark nedir?",answer:"TypeScript, statik tipli bir JavaScript üst kümesidir. İsteğe bağlı tip ek açıklamaları, interface'ler, generic'ler, enum'lar ve erişim belirteçleri ekler. TypeScript yürütülmeden önce JavaScript'e derlenmesi gerekir — tarayıcılar ve Node.js yalnızca JavaScript çalıştırır. Temel fayda, TypeScript'in tip hatalarını derleme zamanında (geliştirme sırasında) yakalamasıdır; oysa JavaScript bu hataları yalnızca üretimdeki çalışma zamanında ortaya çıkarır."},{type:"qa",question:"2. TypeScript'te tip çıkarımı nedir?",answer:"Tip çıkarımı, derleyicinin açık bir tip ek açıklaması gerektirmeden bir değişkenin tipini başlangıç değerine göre otomatik olarak belirleme yeteneğidir. Örneğin `let x = 5` ifadesi `x`'i `number` olarak çıkarır. Çıkarım, fonksiyon dönüş tipleri ve generic tip parametrelerinde de çalışır.",code:`let x = 5;           // çıkarıldı: number
let s = "hello";     // çıkarıldı: string
let arr = [1, 2, 3]; // çıkarıldı: number[]

function double(n: number) { return n * 2; }
// dönüş tipi number olarak çıkarıldı`},{type:"qa",question:"3. interface ve type arasındaki fark nedir?",answer:"Her ikisi de nesne şekillerini tanımlar, ancak yetenekleri farklıdır. interface, bildirim birleştirmeyi destekler (açıp ekleme yapabilirsiniz), OOP kalıpları için tercih edilir ve derleyicide biraz daha performanslıdır. type, union tiplerini, kesişimi, tuple tiplerini ve eşlenmiş tipleri destekler — daha fazla ifade gücüne ihtiyaç duyduğunuzda kullanın. Pratikte: genel API'ler ve sınıf şekilleri için interface, union'lar, primitive'ler ve hesaplanmış tipler için type kullanın.",code:`// interface — genişletilebilir ve birleştirilebilir
interface Animal { name: string }
interface Animal { age: number } // birleşir — artık hem name hem age var

// type — daha ifadeli ama birleştirme yok
type ID = string | number;
type Pair = [string, number];
type ReadonlyUser = Readonly<User>;`},{type:"qa",question:"4. any, unknown ve never arasındaki fark nedir?",answer:"`any`, tür denetimini tamamen devre dışı bırakır — onunla her şeyi yapabilirsiniz. JS geçişi dışında kullanmaktan kaçının. `unknown`, `any`'nin tür güvenli versiyonudur — kullanmadan önce tipi daraltmanız (typeof veya instanceof ile) gerekir, bu da onu güvenli bir şekilde ele almaya zorlar. `never`, hiçbir zaman var olamayan bir değeri temsil eder — her zaman throw eden fonksiyonlar, sonsuz döngüler veya kapsamlı tür denetimleri için kullanılır.",code:`let a: any     = "hello"; a.foo(); // OK — tip denetimi yok
let u: unknown = "hello"; u.foo(); // Hata — önce daraltılmalı
if (typeof u === "string") u.toUpperCase(); // daraltma sonrası OK

function fail(msg: string): never { throw new Error(msg); }`},{type:"qa",question:"5. Generic'ler nedir? Pratik bir örnek verin.",answer:"Generic'ler, tip bilgisini korurken herhangi bir tipte çalışan fonksiyonlar, sınıflar ve interface'ler yazmanıza olanak tanıyan tip parametreleridir. Açı parantezleri içinde <T> şeklinde yazılırlar. Generic'ler olmadan ya tip bilgisi kaybolur (any kullanarak) ya da her tip için kod kopyalanır.",code:`function identity<T>(value: T): T { return value; }
identity<string>("hello"); // string döndürür
identity<number>(42);      // number döndürür

// Pratik: tipli API sarmalayıcı
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as T;
}
const users = await fetchJson<User[]>("/api/users");
// users tam tipli User[]`},{type:"qa",question:"6. Partial, Pick ve Omit utility tiplerini açıklayın.",answer:"Bunlar, mevcut tipleri dönüştüren yerleşik generic tiplerdir. Partial<T>, tüm özellikleri isteğe bağlı yapar — güncelleme/yama DTO'ları için kullanışlıdır. Pick<T, K>, yalnızca listelenen anahtarlarla yeni bir tip oluşturur — görünüm modelleri için kullanışlıdır. Omit<T, K>, listelenen anahtarlar olmadan yeni bir tip oluşturur — istemciye göndermeden önce şifre gibi hassas alanları kaldırmak için kullanışlıdır.",code:`interface User { id: number; name: string; email: string; password: string }

type UpdateUser = Partial<User>;
// { id?: number; name?: string; email?: string; password?: string }

type UserCard = Pick<User, "id" | "name">;
// { id: number; name: string }

type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string }`},{type:"qa",question:"7. Union ve intersection tipleri nedir?",answer:"Union tipi (A | B), bir değerin A veya B tipinde olabileceği anlamına gelir — en az biri. Intersection tipi (A & B), bir değerin hem A hem de B'yi aynı anda karşılaması gerektiği anlamına gelir — her iki tipten tüm özellikler. Union'lar 'veya' mantığı için (string | number), intersection'lar tipleri birleştirmek için (User & Timestamped) kullanılır.",code:`type StringOrNum = string | number;
let val: StringOrNum = "hello"; val = 42; // ikisi de geçerli

type Named   = { name: string };
type Aged    = { age: number };
type Person  = Named & Aged;
const p: Person = { name: "Alice", age: 30 }; // ikisi de olmalı`},{type:"qa",question:"8. TypeScript'te decorator nedir?",answer:"Decorator, tanımlama zamanında sınıfları, metodları, özellikleri veya parametreleri değiştirebilen ya da ek açıklama ekleyebilen özel bir fonksiyondur. @ sembolüyle yazılırlar. Bağımlılık enjeksiyonu, yönlendirme ve doğrulama için Angular ve NestJS gibi çerçevelerde yaygın olarak kullanılırlar. tsconfig'de experimentalDecorators: true ile etkinleştirin (TypeScript < 5) veya TC39 standart decorator'larını destekleyen TypeScript 5+ kullanın.",code:`function readonly(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Circle {
  @readonly
  getArea(radius: number): number {
    return Math.PI * radius ** 2;
  }
}`},{type:"qa",question:"9. TypeScript'te strict mod ne sağlar?",answer:`tsconfig.json'da "strict": true ayarlamak bir dizi katı tip denetim bayrağını etkinleştirir: strictNullChecks (null/undefined diğer tiplere atanamaz), noImplicitAny (tip örtük olarak any olduğunda hata), strictFunctionTypes, strictBindCallApply, strictPropertyInitialization ve noImplicitThis. Birlikte tüm çalışma zamanı hata kategorilerini ortadan kaldırırlar.`,code:`// strict: true ile
function greet(name: string) { return "Hello " + name; }
greet(null); // Hata: 'null' tipi 'string' tipine atanamaz

// Strict olmadan bu sessizce geçer ve çalışma zamanında "Hello null" üretir`},{type:"qa",question:"10. Optional chaining ve nullish coalescing nedir?",answer:"Optional chaining (?.), null veya undefined üzerindeki özelliklere erişirken throw etmek yerine undefined döndürerek kısa devre yapar. Nullish coalescing (??), yalnızca sol taraf null veya undefined olduğunda sağ taraftaki değeri döndürür (0 ve boş string'de de tetiklenen || operatörünün aksine). Her ikisi de TypeScript'in anladığı ve tip denetlediği JavaScript özellikleridir.",code:`const user = getUser(); // User | null

// Optional chaining ile
const city = user?.address?.city; // herhangi bir adım null/undefined ise undefined

// Nullish coalescing
const displayName = user?.name ?? "Anonim"; // yalnızca null/undefined'da geri dön
const count = 0 ?? 10;  // 0 — çünkü 0, null/undefined değil
const count2 = 0 || 10; // 10 — çünkü 0 falsy`},{type:"qa",question:"11. Bildirim dosyası (.d.ts) nedir?",answer:"Bildirim dosyası, herhangi bir çalışma zamanı kodu içermeden bir JavaScript kütüphanesinin tiplerini tanımlar. .d.ts uzantısını kullanır. @types/node veya @types/jest kurduğunuzda, bildirim dosyaları kuruyorsunuz demektir. TypeScript'e düz JavaScript ile yazılmış kütüphaneler hakkında bilgi verirler. Kendi kodunuza tip bilgisi eklemek veya mevcut modül tiplerini genişletmek için özel .d.ts dosyaları da yazabilirsiniz.",code:`// myLib.d.ts — uygulama yok, yalnızca tip tanımları
declare function createUser(name: string): { id: number; name: string };
declare const VERSION: string;

declare module "csv-parser" {
  function parse(options?: { separator?: string }): NodeJS.ReadWriteStream;
  export = parse;
}`},{type:"qa",question:"12. TypeScript, Playwright otomasyonuna özellikle nasıl yardımcı olur?",answer:"Playwright, eksiksiz TypeScript tip tanımlarıyla birlikte gelir. Bu şu anlama gelir: (1) Her Playwright API'si için tam otomatik tamamlama — page metodları, locator seçenekleri, expect eşleştiriciler. (2) Yanlış argüman tipleri için derleme zamanı hataları. (3) private/protected locator'larla tipli Page Object Model'lar. (4) test.extend<MyFixtures>() aracılığıyla tipli özel fixture'lar. (5) Yapılandırma hatalarını çalıştırmadan önce yakalayan tipli playwright.config.ts. (6) global.d.ts aracılığıyla tip güvenli ortam değişkenleri."},{type:"qa",question:"13. TypeScript bağlamında derleme zamanı ve çalışma zamanı hataları arasındaki fark nedir?",answer:"Derleme zamanı hatası, TypeScript derleyicisi (tsc) tarafından herhangi bir kod çalıştırılmadan önce kaynak kodunuzu analiz ederken yakalanır. Bunlar tip hataları, eksik özellikler, yanlış argüman sayılarıdır. Çalışma zamanı hatası, program gerçekten çalışırken ve JavaScript motoru bir sorunla karşılaştığında oluşur — undefined üzerinde .toLowerCase() çağırmak gibi. TypeScript çalışma zamanı hatalarının çoğunu ortadan kaldırır ama hepsini değil: yapısal hataları yakalar ama ağ hatalarını veya kullanıcı giriş değerlerini kontrol edemez.",code:`// Derleme zamanı hatası — tsc anında yakalar
const n: number = "hello"; // Hata: 'string' tipi 'number' tipine atanamaz

// Çalışma zamanı hatası — tsc bunu engelleyemez
const data = JSON.parse(userInput); // tipi 'any' — TS şekli bilemez
data.user.name; // 'user' undefined ise çalışma zamanında throw edebilir`},{type:"qa",question:"14. TypeScript'te modül çözümlemesi nedir?",answer:"Modül çözümlemesi, TypeScript'in belirli bir import'un hangi dosyaya atıfta bulunduğunu bulmak için kullandığı algoritmadır. İki ana strateji vardır: Classic (AMD/SystemJS için eski) ve Node (Node.js çözümlemesini yansıtır — index.ts, package.json main, @types paketlerini arar). TypeScript 5+, modern bundler davranışını yansıtan Bundler modunu ekler. tsconfig.json'daki moduleResolution ile yapılandırırsınız. Yol eşlemesi (paths seçeneği) ../../components yerine @/components gibi import takma adları oluşturmanıza olanak tanır.",code:`// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node16",
    "paths": {
      "@/*": ["./src/*"],
      "@pages/*": ["./src/pages/*"]
    }
  }
}

// Artık şunu yazabilirsiniz:
import { LoginPage } from "@pages/LoginPage";
// yerine: import { LoginPage } from "../../pages/LoginPage";`},{type:"qa",question:"15. TypeScript'te async fonksiyonları nasıl tiplendirilir?",answer:"Async fonksiyon her zaman bir Promise döndürür. Dönüş tipi ek açıklaması T'nin çözümlenen değer tipi olduğu Promise<T> olmalıdır. TypeScript, dönüş tipini return ifadesinden otomatik olarak çıkarır, bu nedenle açık ek açıklama isteğe bağlıdır ancak genel API'ler için önerilir. Bir Promise'in çözümlenen tipini almak için Awaited<T> da kullanabilirsiniz.",code:`// Açık dönüş tipi
async function getUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Kullanıcı bulunamadı");
  return res.json() as User;
}

// Çıkarılmış dönüş tipi (yine de Promise<User>)
async function getCurrentUser() {
  return getUser(1); // TS Promise<User> olarak çıkarır
}

// Awaited utility tipi
type UserType = Awaited<ReturnType<typeof getUser>>; // User

// Async arrow function
const deleteUser = async (id: number): Promise<void> => {
  await fetch(\`/api/users/\${id}\`, { method: "DELETE" });
};

// Hata yönetimi kalıbı
async function safeGetUser(id: number): Promise<User | null> {
  try {
    return await getUser(id);
  } catch {
    return null;
  }
}`},{type:"divider"},{type:"tip",text:"Playwright mülakataları için profesyonel ipucu: TypeScript'in strict modunun Playwright'ın tipli API'siyle birleştirilmesinin, var olmayan bir metodu çağıran veya yanlış argüman tipleri ileten bir test yazmayı neredeyse imkânsız hale getirdiğini belirtin — derleyici testleri çalıştırmadan önce reddeder."}]}]}};function Pg(){return n.jsx($a,{data:jg,gradient:"from-indigo-600 to-blue-700",bgLight:"bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"})}const Cg={en:{hero:{title:"Python for Test Automation",subtitle:"From Zero to Automation Engineer",intro:"Python is the most popular language for test automation in 2024. Its clean syntax, rich ecosystem, and massive community make it the go-to choice for QA engineers worldwide. Whether you're automating web UIs, testing REST APIs, or building full CI/CD pipelines — Python has you covered."},tabs:["🎯 Introduction","📦 Installation","📚 Intermediate","🚀 Advanced","💼 Interview Q&A"],sections:[{title:"Why Python for Test Automation?",blocks:[{type:"text",content:"Python has become the dominant language for test automation for good reasons. Its readable syntax means test code reads almost like plain English, making it easy for the whole team — including non-developers — to understand what a test does. The ecosystem is unmatched: pytest, Selenium, Playwright, Requests, Appium, and dozens more battle-tested libraries are just a pip install away."},{type:"heading",content:"Python vs Java vs JavaScript for Automation"},{type:"table",headers:["Feature","Python","Java","JavaScript"],rows:[["Learning curve","Very Low","High","Medium"],["Syntax readability","Excellent","Verbose","Good"],["Test framework","pytest","JUnit / TestNG","Jest / Mocha"],["Web automation","Selenium, Playwright","Selenium","Playwright, Cypress"],["API testing","requests, httpx","RestAssured","Axios, Supertest"],["Mobile automation","Appium","Appium","WebdriverIO"],["CI/CD integration","Excellent","Excellent","Excellent"],["Community (QA)","Largest","Large","Growing"],["Script execution speed","Fast (for tests)","Faster","Fast"]]},{type:"tip",content:"For most QA engineers starting from scratch, Python is the best investment. The time from 'zero knowledge' to writing real tests is dramatically shorter than with Java."},{type:"heading",content:"The Python Test Automation Ecosystem"},{type:"grid",cols:3,items:[{icon:"🧪",label:"pytest",desc:"The gold standard test framework. Fixtures, parametrize, plugins, hooks — everything you need."},{icon:"🌐",label:"Selenium",desc:"The classic browser automation library. Supports Chrome, Firefox, Edge, Safari via WebDriver."},{icon:"🎭",label:"Playwright",desc:"Microsoft's modern browser automation tool. Faster, more reliable, auto-waits built in."},{icon:"📡",label:"Requests",desc:"The most popular HTTP library for Python. Elegant API for GET, POST, PUT, DELETE calls."},{icon:"📱",label:"Appium",desc:"Mobile test automation for iOS and Android. Works with Python just like Selenium."},{icon:"📊",label:"Allure",desc:"Beautiful test reporting with steps, screenshots, and history tracking."},{icon:"⚡",label:"pytest-xdist",desc:"Run tests in parallel across multiple CPU cores or machines. 4x faster test suites."},{icon:"🔧",label:"python-dotenv",desc:"Load environment variables from .env files. Keep secrets out of your code."},{icon:"✅",label:"jsonschema",desc:"Validate API response structure. Ensure your API contracts never break."}]},{type:"heading",content:"Real-World Use Cases"},{type:"list",icon:"✅",items:[{label:"UI Automation",desc:"Automate browser interactions — login flows, form submissions, checkout processes, multi-step user journeys."},{label:"API Testing",desc:"Validate REST APIs — status codes, response schemas, authentication, performance."},{label:"Data-Driven Testing",desc:"Run the same test with dozens of input combinations from CSV, Excel, JSON, or databases."},{label:"CI/CD Integration",desc:"Run tests on every code push with GitHub Actions, Jenkins, GitLab CI, or Azure Pipelines."},{label:"Performance Testing",desc:"Combine with Locust for load testing HTTP endpoints written in pure Python."},{label:"Mobile Testing",desc:"Automate Android and iOS apps with Appium and the same pytest framework."}]},{type:"heading",content:"Automation Framework Comparison"},{type:"table",headers:["Framework","Type","Best For","Speed","Learning Curve"],rows:[["pytest + Selenium","UI","Traditional web automation","Medium","Low"],["pytest + Playwright","UI","Modern web apps, SPA","Fast","Low"],["pytest + Requests","API","REST API testing","Very Fast","Very Low"],["Robot Framework","UI/API","Keyword-driven, non-coders","Medium","Very Low"],["Cypress (JS)","UI","Frontend devs, component testing","Fast","Medium"],["Behave (BDD)","UI/API","BDD / Gherkin syntax teams","Medium","Medium"]]},{type:"info",content:"The most powerful combination for modern QA teams: pytest + Playwright for UI tests, pytest + Requests for API tests, Allure for reporting, and GitHub Actions for CI/CD."}]},{title:"Installing Python & Setting Up Your Environment",blocks:[{type:"heading",content:"Step 1: Install Python"},{type:"text",content:"Always download Python from the official website python.org. Choose Python 3.10 or newer. During installation on Windows, check the box 'Add Python to PATH' — this is critical."},{type:"steps",items:["Go to https://python.org/downloads and download the latest Python 3.x installer","Run the installer — on Windows, tick 'Add Python to PATH' before clicking Install","Open a terminal (PowerShell / Command Prompt / Terminal) and verify the installation","You should see the Python version printed — e.g., Python 3.12.0"]},{type:"code",language:"bash",content:`# Verify Python installation
python --version
# Python 3.12.0

# Verify pip (Python's package manager) is installed
pip --version
# pip 24.0 from ...`},{type:"heading",content:"Step 2: Virtual Environments"},{type:"text",content:"A virtual environment is an isolated Python environment for your project. It prevents dependency conflicts between projects. Always create a virtual environment before installing any packages."},{type:"code",language:"bash",content:`# Create a virtual environment named 'venv'
python -m venv venv

# Activate on Windows (PowerShell)
venv\\Scripts\\Activate.ps1

# Activate on Windows (Command Prompt)
venv\\Scripts\\activate.bat

# Activate on Mac/Linux
source venv/bin/activate

# You'll see (venv) in your terminal prompt — you're now inside
# (venv) PS C:\\myproject>

# Deactivate when done
deactivate`},{type:"tip",content:"Always activate your virtual environment before running pip install or python commands. Add the 'venv/' folder to your .gitignore — never commit it to version control."},{type:"heading",content:"Step 3: Install Core Testing Libraries"},{type:"code",language:"bash",content:`# Install pytest (test framework)
pip install pytest

# Install Selenium (browser automation)
pip install selenium

# Install Requests (HTTP/API testing)
pip install requests

# Install Playwright (modern browser automation)
pip install playwright
playwright install  # Downloads browser binaries

# Install all at once
pip install pytest selenium requests playwright pytest-playwright`},{type:"heading",content:"Step 4: Managing Dependencies with requirements.txt"},{type:"code",language:"bash",content:`# Save all installed packages to requirements.txt
pip freeze > requirements.txt

# Install all packages from requirements.txt (on a new machine)
pip install -r requirements.txt`},{type:"code",language:"text",content:`# requirements.txt example
pytest==8.2.0
selenium==4.21.0
requests==2.32.0
playwright==1.44.0
pytest-playwright==0.5.0
allure-pytest==2.13.5
pytest-xdist==3.5.0
python-dotenv==1.0.1
jsonschema==4.22.0`},{type:"heading",content:"Step 5: Recommended IDEs"},{type:"grid",cols:2,items:[{icon:"💙",label:"VS Code (Recommended)",desc:"Free, lightweight, powerful. Install the 'Python' extension by Microsoft and 'Pylance' for IntelliSense. Best for most QA engineers."},{icon:"🧠",label:"PyCharm Community",desc:"Free IDE by JetBrains built specifically for Python. Excellent pytest integration, built-in debugger, and refactoring tools."}]},{type:"heading",content:"Step 6: Your First Python File"},{type:"code",language:"python",content:`# hello.py
name = "Automation Engineer"
print(f"Hello, {name}!")

# Run it:
# python hello.py
# Output: Hello, Automation Engineer!`},{type:"heading",content:"Step 7: Your First pytest Test"},{type:"code",language:"python",content:`# test_first.py
def add(a, b):
    return a + b

def test_add():
    result = add(2, 3)
    assert result == 5

def test_add_negative():
    assert add(-1, -1) == -2`},{type:"code",language:"bash",content:`# Run tests
pytest test_first.py

# Run with verbose output
pytest test_first.py -v

# Output:
# test_first.py::test_add PASSED
# test_first.py::test_add_negative PASSED
# 2 passed in 0.12s`},{type:"info",content:"pytest automatically discovers test files named test_*.py or *_test.py, and test functions that start with test_. No configuration needed for basic usage."}]},{title:"Intermediate: pytest, Selenium & Requests",blocks:[{type:"heading",content:"Python Basics for Automation"},{type:"subheading",content:"Variables, Data Types, and Collections"},{type:"code",language:"python",content:`# Variables and data types
username = "admin"          # str
password = "secret123"      # str
timeout = 30                # int
is_logged_in = False        # bool
base_url = "https://api.example.com"

# Lists — ordered, mutable
browsers = ["chrome", "firefox", "edge"]
browsers.append("safari")
first = browsers[0]        # "chrome"

# Dictionaries — key-value pairs
user = {
    "name": "Alice",
    "role": "tester",
    "active": True
}
print(user["name"])         # Alice
print(user.get("email", "N/A"))  # N/A (default if key missing)

# f-strings — string interpolation
url = f"{base_url}/users/{user['name']}"
print(url)  # https://api.example.com/users/Alice`},{type:"subheading",content:"Control Flow and Loops"},{type:"code",language:"python",content:`# if/elif/else
status_code = 200
if status_code == 200:
    print("OK")
elif status_code == 404:
    print("Not Found")
else:
    print(f"Unexpected: {status_code}")

# for loop over a list
endpoints = ["/login", "/products", "/cart"]
for endpoint in endpoints:
    print(f"Testing: {base_url}{endpoint}")

# for loop with range
for i in range(5):
    print(f"Attempt {i + 1}")

# List comprehension (very Pythonic)
test_urls = [f"{base_url}{ep}" for ep in endpoints]`},{type:"subheading",content:"Functions"},{type:"code",language:"python",content:`# Basic function
def get_full_url(base, path):
    return f"{base}{path}"

# Function with default parameter
def login(username, password, remember=False):
    print(f"Logging in as {username}, remember={remember}")

# Function with type hints (recommended)
def create_user(name: str, age: int) -> dict:
    return {"name": name, "age": age}

# Usage
url = get_full_url("https://example.com", "/login")
login("admin", "pass123")
login("admin", "pass123", remember=True)`},{type:"heading",content:"pytest Fundamentals"},{type:"subheading",content:"Test Discovery Rules"},{type:"list",icon:"📁",items:[{label:"File names",desc:"Must match test_*.py or *_test.py patterns"},{label:"Function names",desc:"Must start with test_"},{label:"Class names",desc:"Must start with Test (and no __init__ method)"},{label:"Method names",desc:"Inside test classes, must start with test_"}]},{type:"code",language:"python",content:`# test_calculator.py
class TestCalculator:
    def test_addition(self):
        assert 2 + 2 == 4

    def test_subtraction(self):
        assert 10 - 3 == 7

    def test_division_by_zero(self):
        import pytest
        with pytest.raises(ZeroDivisionError):
            result = 1 / 0`},{type:"subheading",content:"pytest Fixtures"},{type:"text",content:"Fixtures are pytest's way of handling setup and teardown. They are functions that provide test data, set up connections, or configure the environment. Tests declare which fixtures they need as parameters."},{type:"code",language:"python",content:`import pytest

# A simple fixture — provides test data
@pytest.fixture
def sample_user():
    return {"username": "testuser", "email": "test@example.com"}

# A fixture with teardown using yield
@pytest.fixture
def db_connection():
    # SETUP: runs before the test
    conn = create_db_connection()
    yield conn
    # TEARDOWN: runs after the test (even if test fails)
    conn.close()

# Test uses fixture by name in its parameters
def test_user_has_email(sample_user):
    assert "email" in sample_user
    assert sample_user["email"] == "test@example.com"

def test_db_query(db_connection):
    result = db_connection.query("SELECT 1")
    assert result is not None`},{type:"subheading",content:"Fixture Scopes"},{type:"table",headers:["Scope","Runs Once Per...","Use Case"],rows:[["function (default)","Each test function","Fresh state per test — most common"],["class","Each test class","Shared setup for a group of related tests"],["module","Each test file (.py)","Shared DB/API connection per file"],["session","Entire test run","Browser instance, heavy setup shared across all tests"]]},{type:"code",language:"python",content:`# conftest.py — fixtures defined here are available to ALL tests
import pytest
from selenium import webdriver

@pytest.fixture(scope="session")
def browser():
    """Browser fixture — created once for entire test session"""
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()  # Cleanup after ALL tests finish

@pytest.fixture(scope="function")
def logged_in_browser(browser):
    """Each test gets a fresh logged-in state"""
    browser.get("https://example.com/login")
    browser.find_element(By.ID, "username").send_keys("admin")
    browser.find_element(By.ID, "password").send_keys("pass")
    browser.find_element(By.ID, "submit").click()
    yield browser
    # Logout after each test
    browser.get("https://example.com/logout")`},{type:"subheading",content:"Parametrize — Data-Driven Tests"},{type:"code",language:"python",content:`import pytest

# Run the same test with multiple inputs
@pytest.mark.parametrize("username, password, expected", [
    ("admin", "correct_pass", True),
    ("admin", "wrong_pass", False),
    ("", "any_pass", False),
    ("admin", "", False),
])
def test_login(username, password, expected):
    result = login(username, password)
    assert result == expected

# Parametrize with IDs for readable test names
@pytest.mark.parametrize("status_code", [200, 201, 204], ids=["ok", "created", "no-content"])
def test_success_codes(status_code):
    assert status_code < 300`},{type:"heading",content:"Selenium Basics"},{type:"code",language:"python",content:`from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup Chrome WebDriver
driver = webdriver.Chrome()
driver.maximize_window()

# Navigate to a URL
driver.get("https://automationexercise.com")

# Find elements using different locators
# By.ID
search_box = driver.find_element(By.ID, "search_product")

# By.NAME
username_field = driver.find_element(By.NAME, "email")

# By.CSS_SELECTOR
submit_btn = driver.find_element(By.CSS_SELECTOR, "button[data-qa='login-button']")

# By.XPATH
product_name = driver.find_element(By.XPATH, "//h2[@class='product-name']")

# By.CLASS_NAME
navbar = driver.find_element(By.CLASS_NAME, "navbar-nav")

# Interactions
search_box.send_keys("Blue Top")       # Type text
submit_btn.click()                      # Click
username_field.clear()                  # Clear field

# Get information
page_title = driver.title
current_url = driver.current_url
element_text = product_name.text
is_displayed = submit_btn.is_displayed()
is_enabled = submit_btn.is_enabled()

# Cleanup
driver.quit()`},{type:"subheading",content:"Explicit vs Implicit Waits"},{type:"code",language:"python",content:`from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ❌ IMPLICIT WAIT — Avoid this approach
# Applies globally to ALL find_element calls
# Mixes poorly with explicit waits
driver.implicitly_wait(10)

# ✅ EXPLICIT WAIT — Recommended
# Waits for a specific condition before continuing
wait = WebDriverWait(driver, timeout=10)

# Wait until element is visible
element = wait.until(
    EC.visibility_of_element_located((By.ID, "myElement"))
)

# Wait until element is clickable
button = wait.until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, ".submit-btn"))
)

# Wait until text appears
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Success"))

# Wait until URL changes
wait.until(EC.url_contains("/dashboard"))

# Wait until element disappears (loading spinner)
wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "spinner")))`},{type:"tip",content:"Always prefer Explicit Waits over Implicit Waits. They are more predictable, faster (stop as soon as condition is met), and don't interfere with each other."},{type:"heading",content:"Requests Library — API Testing"},{type:"code",language:"python",content:`import requests

BASE_URL = "https://automationexercise.com/api"

# GET request
response = requests.get(f"{BASE_URL}/productsList")
print(response.status_code)        # 200
print(response.json())             # Parsed JSON body
print(response.headers)            # Response headers
print(response.elapsed)            # Response time

# POST request with JSON body
payload = {
    "name": "Test User",
    "email": "test@example.com",
    "password": "pass123",
    "title": "Mr",
    "birth_date": "10",
    "birth_month": "5",
    "birth_year": "1990",
    "firstname": "Test",
    "lastname": "User",
    "company": "QA Corp",
    "address1": "123 Test St",
    "country": "India",
    "zipcode": "500001",
    "state": "Telangana",
    "city": "Hyderabad",
    "mobile_number": "9876543210"
}
response = requests.post(f"{BASE_URL}/createAccount", data=payload)

# PUT request
response = requests.put(f"{BASE_URL}/updateAccount", data={"email": "test@example.com", "name": "New Name"})

# DELETE request
response = requests.delete(f"{BASE_URL}/deleteAccount", data={"email": "test@example.com", "password": "pass123"})

# Assertions in pytest
def test_get_products():
    response = requests.get(f"{BASE_URL}/productsList")
    assert response.status_code == 200
    data = response.json()
    assert "products" in data
    assert len(data["products"]) > 0`}]},{title:"Advanced: POM, CI/CD, Parallel Tests & Reporting",blocks:[{type:"heading",content:"Page Object Model (POM)"},{type:"text",content:"The Page Object Model is a design pattern where each web page (or page component) is represented as a Python class. The class contains the locators and methods for that page. Tests interact with page objects instead of directly with Selenium. This makes tests readable, reusable, and easy to maintain."},{type:"code",language:"python",content:`# pages/base_page.py
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, timeout=10)

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def type(self, locator, text):
        element = self.wait.until(EC.visibility_of_element_located(locator))
        element.clear()
        element.send_keys(text)

    def get_text(self, locator):
        return self.wait.until(EC.visibility_of_element_located(locator)).text

    def is_visible(self, locator):
        try:
            return self.wait.until(EC.visibility_of_element_located(locator)).is_displayed()
        except:
            return False

    def navigate_to(self, url):
        self.driver.get(url)`},{type:"code",language:"python",content:`# pages/login_page.py
from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class LoginPage(BasePage):
    # Locators defined as class-level constants
    EMAIL_INPUT = (By.CSS_SELECTOR, "input[data-qa='login-email']")
    PASSWORD_INPUT = (By.CSS_SELECTOR, "input[data-qa='login-password']")
    LOGIN_BUTTON = (By.CSS_SELECTOR, "button[data-qa='login-button']")
    ERROR_MESSAGE = (By.CSS_SELECTOR, "p[style*='color: red']")
    SIGNUP_LINK = (By.LINK_TEXT, "Signup / Login")

    def open(self):
        self.navigate_to("https://automationexercise.com/login")
        return self

    def login(self, email, password):
        self.type(self.EMAIL_INPUT, email)
        self.type(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
        return self

    def get_error_message(self):
        return self.get_text(self.ERROR_MESSAGE)

    def is_error_visible(self):
        return self.is_visible(self.ERROR_MESSAGE)`},{type:"code",language:"python",content:`# tests/test_login.py
from pages.login_page import LoginPage
from pages.home_page import HomePage

def test_successful_login(browser):
    login_page = LoginPage(browser)
    login_page.open().login("valid@email.com", "validpass")
    home = HomePage(browser)
    assert home.is_logged_in()

def test_invalid_login_shows_error(browser):
    login_page = LoginPage(browser)
    login_page.open().login("wrong@email.com", "wrongpass")
    assert login_page.is_error_visible()
    assert "Your email or password is incorrect!" in login_page.get_error_message()`},{type:"heading",content:"conftest.py Patterns"},{type:"code",language:"python",content:`# conftest.py (project root)
import pytest
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

@pytest.fixture(scope="session")
def browser():
    options = Options()
    if os.getenv("HEADLESS", "false").lower() == "true":
        options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    yield driver
    driver.quit()

@pytest.fixture(scope="session")
def api_client():
    """Returns a requests Session with base URL and auth headers"""
    session = requests.Session()
    session.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('API_TOKEN')}"
    })
    return session

@pytest.fixture
def test_user():
    return {
        "email": os.getenv("TEST_EMAIL", "test@example.com"),
        "password": os.getenv("TEST_PASSWORD", "Test@1234"),
        "name": "Automation User"
    }`},{type:"heading",content:"pytest Markers"},{type:"code",language:"python",content:`# pytest.ini or pyproject.toml — register custom markers
# pytest.ini
[pytest]
markers =
    smoke: Fast, critical path tests — run on every commit
    regression: Full regression suite
    api: API tests only
    ui: UI/browser tests
    slow: Tests taking more than 10 seconds

# Using markers in tests
import pytest

@pytest.mark.smoke
@pytest.mark.api
def test_health_check(api_client):
    response = api_client.get("/health")
    assert response.status_code == 200

@pytest.mark.regression
@pytest.mark.ui
def test_full_checkout_flow(browser):
    pass

@pytest.mark.slow
def test_performance_benchmark():
    pass`},{type:"code",language:"bash",content:`# Run only smoke tests
pytest -m smoke

# Run only UI tests
pytest -m ui

# Run smoke OR api tests
pytest -m "smoke or api"

# Run regression but NOT slow tests
pytest -m "regression and not slow"`},{type:"heading",content:"pytest Hooks"},{type:"code",language:"python",content:`# conftest.py — pytest hooks
import pytest

def pytest_configure(config):
    """Called once at the start of the test session"""
    print("\\n=== Test Session Starting ===")

def pytest_runtest_setup(item):
    """Called before each test runs"""
    print(f"\\nSetting up: {item.name}")

def pytest_runtest_teardown(item, nextitem):
    """Called after each test runs"""
    print(f"Tearing down: {item.name}")

def pytest_runtest_makereport(item, call):
    """Called after each test phase — useful for screenshots on failure"""
    if call.when == "call" and call.excinfo is not None:
        # Test failed — take screenshot
        if hasattr(item, "funcargs") and "browser" in item.funcargs:
            driver = item.funcargs["browser"]
            driver.save_screenshot(f"screenshots/{item.name}.png")

def pytest_collection_modifyitems(config, items):
    """Reorder or filter collected tests"""
    # Run smoke tests first
    smoke_tests = [i for i in items if i.get_closest_marker("smoke")]
    other_tests = [i for i in items if not i.get_closest_marker("smoke")]
    items[:] = smoke_tests + other_tests`},{type:"heading",content:"Parallel Test Execution with pytest-xdist"},{type:"code",language:"bash",content:`# Install
pip install pytest-xdist

# Run tests using 4 CPU cores
pytest -n 4

# Run tests using all available CPU cores
pytest -n auto

# Distribute tests across workers
pytest -n 4 --dist=loadfile   # Keep tests from same file on same worker
pytest -n 4 --dist=load       # Balance load evenly (default)`},{type:"heading",content:"Allure Reporting"},{type:"code",language:"python",content:`# pip install allure-pytest
import allure
import pytest

@allure.feature("User Authentication")
@allure.story("Login")
class TestLogin:

    @allure.title("Successful login with valid credentials")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_successful_login(self, browser):
        with allure.step("Open login page"):
            browser.get("https://example.com/login")
        with allure.step("Enter credentials"):
            browser.find_element(By.ID, "email").send_keys("admin@test.com")
            browser.find_element(By.ID, "password").send_keys("pass123")
        with allure.step("Click login button"):
            browser.find_element(By.ID, "submit").click()
        with allure.step("Verify dashboard is visible"):
            assert "Dashboard" in browser.title

    @allure.title("Failed login shows error message")
    @allure.severity(allure.severity_level.NORMAL)
    def test_failed_login(self, browser):
        pass`},{type:"code",language:"bash",content:`# Run tests and generate Allure results
pytest --alluredir=allure-results

# Serve Allure report in browser
allure serve allure-results

# Generate static report
allure generate allure-results --clean -o allure-report`},{type:"heading",content:"Data-Driven Testing with CSV and JSON"},{type:"code",language:"python",content:`import csv
import json
import pytest

# Load test data from CSV
def load_csv_data(filepath):
    with open(filepath, newline="") as f:
        reader = csv.DictReader(f)
        return [(row["username"], row["password"], row["expected"]) for row in reader]

# Load test data from JSON
def load_json_data(filepath):
    with open(filepath) as f:
        return json.load(f)

# Use CSV data with parametrize
@pytest.mark.parametrize("username,password,expected", load_csv_data("test_data/login.csv"))
def test_login_csv(username, password, expected):
    result = login(username, password)
    assert str(result).lower() == expected.lower()

# JSON test data
users_data = load_json_data("test_data/users.json")

@pytest.mark.parametrize("user", users_data)
def test_create_user(api_client, user):
    response = api_client.post("/users", json=user)
    assert response.status_code == 201`},{type:"heading",content:"API Test Framework Structure"},{type:"code",language:"python",content:`# api/base_api.py
import requests

class BaseAPI:
    def __init__(self, base_url: str, token: str = None):
        self.base_url = base_url
        self.session = requests.Session()
        if token:
            self.session.headers["Authorization"] = f"Bearer {token}"

    def get(self, endpoint, **kwargs):
        return self.session.get(f"{self.base_url}{endpoint}", **kwargs)

    def post(self, endpoint, **kwargs):
        return self.session.post(f"{self.base_url}{endpoint}", **kwargs)

    def put(self, endpoint, **kwargs):
        return self.session.put(f"{self.base_url}{endpoint}", **kwargs)

    def delete(self, endpoint, **kwargs):
        return self.session.delete(f"{self.base_url}{endpoint}", **kwargs)

# api/users_api.py
from api.base_api import BaseAPI

class UsersAPI(BaseAPI):
    ENDPOINT = "/users"

    def get_all_users(self):
        return self.get(self.ENDPOINT)

    def get_user(self, user_id: int):
        return self.get(f"{self.ENDPOINT}/{user_id}")

    def create_user(self, payload: dict):
        return self.post(self.ENDPOINT, json=payload)`},{type:"code",language:"python",content:`# Schema validation with jsonschema
import jsonschema

USER_SCHEMA = {
    "type": "object",
    "required": ["id", "name", "email"],
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "email": {"type": "string", "format": "email"},
        "role": {"type": "string", "enum": ["admin", "user", "guest"]}
    }
}

def test_user_response_schema(api_client):
    response = api_client.get("/users/1")
    assert response.status_code == 200
    # Raises jsonschema.ValidationError if schema doesn't match
    jsonschema.validate(instance=response.json(), schema=USER_SCHEMA)`},{type:"heading",content:"Environment Management with .env"},{type:"code",language:"text",content:`# .env file (NEVER commit this to git!)
BASE_URL=https://staging.example.com
API_TOKEN=your_secret_token_here
TEST_EMAIL=testuser@example.com
TEST_PASSWORD=SecurePass123
HEADLESS=false
BROWSER=chrome`},{type:"code",language:"python",content:`# Load .env in conftest.py
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file from project root

BASE_URL = os.getenv("BASE_URL", "https://default.example.com")
API_TOKEN = os.getenv("API_TOKEN")
HEADLESS = os.getenv("HEADLESS", "false").lower() == "true"`},{type:"heading",content:"GitHub Actions CI/CD"},{type:"code",language:"yaml",content:`# .github/workflows/tests.yml
name: Run Automation Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Install Playwright browsers
        run: playwright install --with-deps chromium

      - name: Run tests
        env:
          BASE_URL: \${{ secrets.BASE_URL }}
          API_TOKEN: \${{ secrets.API_TOKEN }}
          HEADLESS: "true"
        run: pytest -m smoke -v --alluredir=allure-results

      - name: Upload Allure results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: allure-results
          path: allure-results/`},{type:"heading",content:"Playwright with Python"},{type:"code",language:"python",content:`# Synchronous Playwright (recommended for pytest)
from playwright.sync_api import Page, expect
import pytest

@pytest.fixture(scope="session")
def browser_context(playwright):
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    yield context
    context.close()
    browser.close()

@pytest.fixture
def page(browser_context):
    page = browser_context.new_page()
    yield page
    page.close()

def test_login_with_playwright(page: Page):
    page.goto("https://automationexercise.com/login")

    # Playwright auto-waits — no explicit waits needed!
    page.fill("input[data-qa='login-email']", "test@example.com")
    page.fill("input[data-qa='login-password']", "pass123")
    page.click("button[data-qa='login-button']")

    # Assertions using expect (built-in auto-retry)
    expect(page).to_have_url("https://automationexercise.com/")
    expect(page.locator(".loggedin-as")).to_be_visible()

def test_api_with_playwright(page: Page):
    # Playwright can intercept network requests
    with page.expect_response("**/api/users") as response_info:
        page.goto("/users")
    response = response_info.value
    assert response.status == 200`},{type:"info",content:"Playwright's key advantage over Selenium: built-in auto-waiting, network interception, multiple tabs/contexts, and significantly faster execution on modern single-page applications."}]},{title:"Interview Q&A",blocks:[{type:"qa",question:"1. What is the difference between pytest and unittest?",answer:"unittest is Python's built-in test framework, modeled after Java's JUnit. It requires test classes to inherit from unittest.TestCase and uses methods like setUp/tearDown. pytest is a third-party framework that is simpler, more powerful, and the industry standard. pytest uses plain functions (no class inheritance needed), fixtures instead of setUp/tearDown, and has a rich plugin ecosystem. pytest can also run unittest tests, so it's fully backward compatible.",code:`# unittest style
import unittest
class TestLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
    def test_login(self):
        self.assertEqual(1 + 1, 2)
    def tearDown(self):
        self.driver.quit()

# pytest style — much simpler
def test_login(browser):  # browser is a fixture
    assert 1 + 1 == 2`},{type:"qa",question:"2. What are fixtures? What is fixture scope?",answer:"Fixtures are pytest's dependency injection mechanism for test setup and teardown. A fixture is a function decorated with @pytest.fixture that sets up resources needed by tests. Tests declare fixtures as parameters and pytest automatically provides them. Fixture scope controls how often the fixture is created: 'function' (default) creates a new instance for each test, 'class' once per class, 'module' once per file, 'session' once for the entire test run."},{type:"qa",question:"3. How does @pytest.mark.parametrize work?",answer:"parametrize allows running the same test function with multiple sets of input data. pytest generates a separate test case for each set of parameters. This eliminates code duplication and enables data-driven testing directly in Python without external files.",code:`@pytest.mark.parametrize("email, valid", [
    ("user@example.com", True),
    ("not-an-email", False),
    ("", False),
])
def test_email_validation(email, valid):
    assert validate_email(email) == valid
# Generates 3 tests: test_email_validation[...] x3`},{type:"qa",question:"4. What is conftest.py and why is it important?",answer:"conftest.py is a special pytest file that is automatically loaded by pytest without needing to import it. Fixtures and hooks defined in conftest.py are available to all test files in the same directory and all subdirectories. You can have multiple conftest.py files at different directory levels, creating a hierarchy of fixtures. This is where you put your browser, API client, database, and test data fixtures."},{type:"qa",question:"5. What are the advantages of the Page Object Model?",answer:"POM provides: (1) Separation of concerns — locators and page interactions are in page classes, test logic is in test files. (2) Reusability — login() method written once, used in hundreds of tests. (3) Maintainability — when a locator changes, you update it in one place, not across 50 test files. (4) Readability — tests read like user stories. (5) Reduced duplication — DRY principle applied to test automation."},{type:"qa",question:"6. Implicit vs Explicit wait — which is better and why?",answer:"Explicit waits are always better. Implicit wait is a global setting that makes every find_element call wait up to N seconds for the element. Problems: (1) It applies to ALL element lookups even when you don't need waiting. (2) When combined with explicit waits, they interact unpredictably and can cause tests to wait twice as long. (3) It can mask real performance issues. Explicit wait uses WebDriverWait to wait for a specific condition on a specific element — predictable, precise, and fast."},{type:"qa",question:"7. How do you handle dynamic elements in Selenium?",answer:"Dynamic elements change their attributes across page loads. Strategies: (1) Use stable attributes like data-qa, aria-label, or name instead of auto-generated IDs. (2) Use relative XPath based on stable nearby elements. (3) Use CSS selectors with partial attribute matching ([id^='prefix'] or [id$='suffix']). (4) Use text-based locators (LINK_TEXT, PARTIAL_LINK_TEXT). (5) Use WebDriverWait to wait for the element to appear before interacting.",code:`# Avoid: auto-generated ID
driver.find_element(By.ID, "react-select-123-option-0")

# Better: stable data attribute
driver.find_element(By.CSS_SELECTOR, "[data-testid='dropdown-option-first']")

# Better: partial match
driver.find_element(By.CSS_SELECTOR, "[id^='react-select']")

# Better: text content
driver.find_element(By.XPATH, "//option[text()='United States']")`},{type:"qa",question:"8. How do you run tests in parallel?",answer:"Use pytest-xdist plugin: 'pip install pytest-xdist', then 'pytest -n auto' to use all CPU cores or 'pytest -n 4' for 4 workers. Important: tests must be independent — no shared state between tests. Use session-scoped fixtures carefully as they are shared. For browser tests, each worker gets its own browser instance. For maximum parallelization, use 'function'-scoped browser fixtures."},{type:"qa",question:"9. What is a pytest hook?",answer:"Hooks are special functions in conftest.py that pytest calls at specific points in the test lifecycle. Common hooks: pytest_configure (session start), pytest_collection_modifyitems (after test collection — reorder/filter), pytest_runtest_setup (before each test), pytest_runtest_teardown (after each test), pytest_runtest_makereport (after each test phase — useful for screenshots on failure)."},{type:"qa",question:"10. How do you mock in pytest?",answer:"Use pytest-mock (pip install pytest-mock) which wraps Python's unittest.mock. The 'mocker' fixture is provided automatically. Use mocker.patch() to replace real objects with mock objects during tests. This is useful for isolating units from external dependencies like APIs, databases, or file systems.",code:`from unittest.mock import patch

def test_api_call_mocked(mocker):
    # Replace the real requests.get with a mock
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"users": [{"id": 1}]}

    mocker.patch("requests.get", return_value=mock_response)

    result = get_users()  # This calls requests.get internally
    assert result[0]["id"] == 1  # No real network call was made`},{type:"qa",question:"11. How do you manage test data?",answer:"Multiple approaches: (1) Hardcoded in test (bad for large amounts). (2) pytest fixtures for simple structured data. (3) @pytest.mark.parametrize for multiple input sets. (4) External files: CSV, JSON, Excel read at test collection time. (5) Factories: functions that generate test data dynamically (faker library). (6) Environment variables via .env files for sensitive data. (7) Database seeding for integration tests. Best practice: keep test data close to tests, never hardcode credentials."},{type:"qa",question:"12. What is the difference between assert and pytest.raises()?",answer:"assert is used to verify that a condition is True — it's used when you expect the code to succeed. pytest.raises() is used when you expect the code to raise a specific exception — it's used for negative testing and error handling validation. Using plain assert to catch exceptions won't give meaningful error messages; pytest.raises() gives full control over exception testing.",code:`# assert — verify positive outcome
def test_add():
    assert add(2, 3) == 5

# pytest.raises — verify exception is raised
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# Verify exception message
def test_invalid_age():
    with pytest.raises(ValueError, match="Age must be positive"):
        create_user(name="Alice", age=-5)`},{type:"qa",question:"13. How do you generate test reports?",answer:"Several options: (1) pytest's built-in: 'pytest -v' for verbose terminal output, '--tb=short' for shorter tracebacks. (2) pytest-html: 'pip install pytest-html', run 'pytest --html=report.html' for a self-contained HTML report. (3) Allure: 'pip install allure-pytest', run 'pytest --alluredir=results', then 'allure serve results' for an interactive report with steps, screenshots, history, and trends. Allure is the industry standard for professional test reporting."},{type:"qa",question:"14. What is Selenium Grid?",answer:"Selenium Grid is a server that allows running tests on multiple machines and browsers simultaneously. It has a Hub (central coordinator) and Nodes (machines with browsers). Tests connect to the Hub which routes them to available Nodes. Use cases: cross-browser testing, parallel execution on multiple OS/browser combinations, reducing total test execution time. Modern alternative: Selenium Grid 4 uses Docker, or use cloud services like BrowserStack or Sauce Labs.",code:`# Connect to Selenium Grid
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

options = webdriver.ChromeOptions()
driver = webdriver.Remote(
    command_executor="http://selenium-hub:4444/wd/hub",
    options=options
)
driver.get("https://example.com")`},{type:"qa",question:"15. How do you handle iframes, alerts, and multiple windows in Selenium?",answer:"These are common interview topics. Iframes require switching context with driver.switch_to.frame(). Alerts use driver.switch_to.alert and then .accept(), .dismiss(), or .send_keys(). Multiple windows/tabs use driver.window_handles to get all open windows and driver.switch_to.window() to switch between them.",code:`# Handle iframes
driver.switch_to.frame("iframe_name")         # By name/id
driver.switch_to.frame(0)                     # By index
iframe = driver.find_element(By.TAG_NAME, "iframe")
driver.switch_to.frame(iframe)               # By element
driver.switch_to.default_content()          # Back to main page

# Handle alerts
alert = driver.switch_to.alert
print(alert.text)     # Read alert message
alert.accept()        # Click OK
alert.dismiss()       # Click Cancel
alert.send_keys("text")  # Type in prompt

# Handle multiple windows
main_window = driver.current_window_handle
driver.find_element(By.LINK_TEXT, "Open New Tab").click()
all_windows = driver.window_handles
new_window = [w for w in all_windows if w != main_window][0]
driver.switch_to.window(new_window)
# ... interact with new window
driver.close()
driver.switch_to.window(main_window)  # Return to main`},{type:"divider"},{type:"tip",content:"Pro interview tip: Always explain the 'why' behind your answers. Don't just say 'explicit waits are better' — explain that they prevent race conditions, don't globally slow down all element lookups, and interact predictably with other waits. This shows depth of understanding."}]}]},tr:{hero:{title:"Test Otomasyonu için Python",subtitle:"Sıfırdan Otomasyon Mühendisliğine",intro:"Python, 2024 yılında test otomasyonu için en popüler programlama dilidir. Temiz sözdizimi, zengin ekosistemi ve devasa topluluğu ile dünya genelindeki QA mühendisleri için vazgeçilmez tercihtir. Web arayüzlerini otomatikleştirmek, REST API'leri test etmek veya tam CI/CD pipeline'ları oluşturmak olsun — Python her konuda yanınızdadır."},tabs:["🎯 Giriş","📦 Kurulum","📚 Orta Seviye","🚀 İleri Seviye","💼 Mülakat S&C"],sections:[{title:"Test Otomasyonunda Neden Python?",blocks:[{type:"text",content:"Python, test otomasyonunda baskın dil haline gelmiştir ve bunun çok iyi nedenleri vardır. Okunabilir sözdizimi, test kodunun neredeyse düz İngilizce gibi okunmasını sağlar; bu da geliştiriciler dahil tüm ekibin bir testin ne yaptığını anlamasını kolaylaştırır. Ekosistem eşsizdir: pytest, Selenium, Playwright, Requests, Appium ve düzinelerce başka köklü kütüphane tek bir pip install komutuyla erişilebilir durumdadır."},{type:"heading",content:"Python vs Java vs JavaScript: Otomasyon Karşılaştırması"},{type:"table",headers:["Özellik","Python","Java","JavaScript"],rows:[["Öğrenme eğrisi","Çok Düşük","Yüksek","Orta"],["Sözdizimi okunabilirliği","Mükemmel","Ayrıntılı","İyi"],["Test framework'ü","pytest","JUnit / TestNG","Jest / Mocha"],["Web otomasyonu","Selenium, Playwright","Selenium","Playwright, Cypress"],["API testi","requests, httpx","RestAssured","Axios, Supertest"],["Mobil otomasyon","Appium","Appium","WebdriverIO"],["CI/CD entegrasyonu","Mükemmel","Mükemmel","Mükemmel"],["Topluluk (QA)","En Büyük","Büyük","Büyüyor"],["Script çalıştırma hızı","Hızlı (testler için)","Daha Hızlı","Hızlı"]]},{type:"tip",content:"Sıfırdan başlayan çoğu QA mühendisi için Python en iyi yatırımdır. 'Hiç bilgi yok'tan gerçek testler yazmaya geçiş süresi, Java'ya kıyasla dramatik biçimde daha kısadır."},{type:"heading",content:"Python Test Otomasyonu Ekosistemi"},{type:"grid",cols:3,items:[{icon:"🧪",label:"pytest",desc:"Altın standart test framework'ü. Fixture'lar, parametrize, plugin'ler, hook'lar — ihtiyacınız olan her şey."},{icon:"🌐",label:"Selenium",desc:"Klasik tarayıcı otomasyon kütüphanesi. WebDriver aracılığıyla Chrome, Firefox, Edge, Safari destekler."},{icon:"🎭",label:"Playwright",desc:"Microsoft'un modern tarayıcı otomasyon aracı. Daha hızlı, daha güvenilir, yerleşik otomatik bekleme."},{icon:"📡",label:"Requests",desc:"Python'ın en popüler HTTP kütüphanesi. GET, POST, PUT, DELETE çağrıları için zarif API."},{icon:"📱",label:"Appium",desc:"iOS ve Android için mobil test otomasyonu. Python ile Selenium gibi çalışır."},{icon:"📊",label:"Allure",desc:"Adımlar, ekran görüntüleri ve geçmiş takibi ile güzel test raporlaması."},{icon:"⚡",label:"pytest-xdist",desc:"Testleri birden fazla CPU çekirdeği veya makine genelinde paralel çalıştırın. 4x daha hızlı test süitleri."},{icon:"🔧",label:"python-dotenv",desc:".env dosyalarından ortam değişkenlerini yükleyin. Gizli bilgileri kodunuzun dışında tutun."},{icon:"✅",label:"jsonschema",desc:"API yanıt yapısını doğrulayın. API sözleşmelerinizin hiçbir zaman bozulmadığından emin olun."}]},{type:"heading",content:"Gerçek Dünya Kullanım Senaryoları"},{type:"list",icon:"✅",items:[{label:"UI Otomasyonu",desc:"Tarayıcı etkileşimlerini otomatikleştirin: giriş akışları, form gönderimi, ödeme süreçleri, çok adımlı kullanıcı yolculukları."},{label:"API Testi",desc:"REST API'leri doğrulayın: durum kodları, yanıt şemaları, kimlik doğrulama, performans."},{label:"Veriye Dayalı Test",desc:"Aynı testi CSV, Excel, JSON veya veritabanlarından gelen düzinelerce girdi kombinasyonuyla çalıştırın."},{label:"CI/CD Entegrasyonu",desc:"GitHub Actions, Jenkins, GitLab CI veya Azure Pipelines ile her kod push'unda testleri çalıştırın."},{label:"Performans Testi",desc:"Saf Python ile yazılmış HTTP uç noktalarını yük testi için Locust ile birleştirin."},{label:"Mobil Test",desc:"Aynı pytest framework'ü ile Appium kullanarak Android ve iOS uygulamalarını otomatikleştirin."}]},{type:"heading",content:"Otomasyon Framework Karşılaştırması"},{type:"table",headers:["Framework","Tür","En İyi Kullanım","Hız","Öğrenme Eğrisi"],rows:[["pytest + Selenium","UI","Geleneksel web otomasyonu","Orta","Düşük"],["pytest + Playwright","UI","Modern web uygulamaları, SPA","Hızlı","Düşük"],["pytest + Requests","API","REST API testi","Çok Hızlı","Çok Düşük"],["Robot Framework","UI/API","Anahtar kelime odaklı, geliştirici olmayanlar","Orta","Çok Düşük"],["Cypress (JS)","UI","Frontend geliştiriciler, bileşen testi","Hızlı","Orta"],["Behave (BDD)","UI/API","BDD / Gherkin sözdizimi ekipleri","Orta","Orta"]]},{type:"info",content:"Modern QA ekipleri için en güçlü kombinasyon: UI testleri için pytest + Playwright, API testleri için pytest + Requests, raporlama için Allure ve CI/CD için GitHub Actions."}]},{title:"Python Kurulumu ve Ortam Hazırlığı",blocks:[{type:"heading",content:"Adım 1: Python'ı Kur"},{type:"text",content:"Python'ı her zaman resmi python.org sitesinden indirin. Python 3.10 veya daha yenisini seçin. Windows'ta kurulum sırasında 'Add Python to PATH' kutusunu işaretleyin — bu kritik öneme sahiptir."},{type:"steps",items:["https://python.org/downloads adresine gidin ve en son Python 3.x yükleyicisini indirin","Yükleyiciyi çalıştırın — Windows'ta 'Yükle' butonuna tıklamadan önce 'Add Python to PATH' seçeneğini işaretleyin","Bir terminal (PowerShell / Komut İstemi / Terminal) açın ve kurulumu doğrulayın","Python sürümünün yazdırıldığını görmelisiniz — örneğin Python 3.12.0"]},{type:"code",language:"bash",content:`# Python kurulumunu doğrula
python --version
# Python 3.12.0

# pip'in (Python paket yöneticisi) kurulu olduğunu doğrula
pip --version
# pip 24.0 from ...`},{type:"heading",content:"Adım 2: Sanal Ortamlar (Virtual Environments)"},{type:"text",content:"Sanal ortam, projeniz için izole bir Python ortamıdır. Projeler arasındaki bağımlılık çakışmalarını önler. Herhangi bir paket kurmadan önce her zaman bir sanal ortam oluşturun."},{type:"code",language:"bash",content:`# 'venv' adlı bir sanal ortam oluştur
python -m venv venv

# Windows'ta etkinleştir (PowerShell)
venv\\Scripts\\Activate.ps1

# Windows'ta etkinleştir (Komut İstemi)
venv\\Scripts\\activate.bat

# Mac/Linux'ta etkinleştir
source venv/bin/activate

# Terminal isteminde (venv) göreceksiniz — artık içerisindesiniz
# (venv) PS C:\\myproject>

# İşiniz bittiğinde devre dışı bırakın
deactivate`},{type:"tip",content:"pip install veya python komutlarını çalıştırmadan önce her zaman sanal ortamınızı etkinleştirin. 'venv/' klasörünü .gitignore dosyanıza ekleyin — asla sürüm kontrolüne dahil etmeyin."},{type:"heading",content:"Adım 3: Temel Test Kütüphanelerini Kur"},{type:"code",language:"bash",content:`# pytest kur (test framework'ü)
pip install pytest

# Selenium kur (tarayıcı otomasyonu)
pip install selenium

# Requests kur (HTTP/API testi)
pip install requests

# Playwright kur (modern tarayıcı otomasyonu)
pip install playwright
playwright install  # Tarayıcı ikili dosyalarını indirir

# Hepsini bir arada kur
pip install pytest selenium requests playwright pytest-playwright`},{type:"heading",content:"Adım 4: requirements.txt ile Bağımlılık Yönetimi"},{type:"code",language:"bash",content:`# Tüm kurulu paketleri requirements.txt'e kaydet
pip freeze > requirements.txt

# Yeni bir makinede requirements.txt'ten tüm paketleri kur
pip install -r requirements.txt`},{type:"code",language:"text",content:`# requirements.txt örneği
pytest==8.2.0
selenium==4.21.0
requests==2.32.0
playwright==1.44.0
pytest-playwright==0.5.0
allure-pytest==2.13.5
pytest-xdist==3.5.0
python-dotenv==1.0.1
jsonschema==4.22.0`},{type:"heading",content:"Adım 5: Önerilen IDE'ler"},{type:"grid",cols:2,items:[{icon:"💙",label:"VS Code (Önerilen)",desc:"Ücretsiz, hafif, güçlü. Microsoft'un 'Python' eklentisini ve IntelliSense için 'Pylance'ı yükleyin. Çoğu QA mühendisi için en iyi seçenek."},{icon:"🧠",label:"PyCharm Community",desc:"JetBrains tarafından Python için özel olarak geliştirilmiş ücretsiz IDE. Mükemmel pytest entegrasyonu, dahili hata ayıklayıcı ve yeniden düzenleme araçları."}]},{type:"heading",content:"Adım 6: İlk Python Dosyanız"},{type:"code",language:"python",content:`# hello.py
name = "Otomasyon Mühendisi"
print(f"Merhaba, {name}!")

# Çalıştırmak için:
# python hello.py
# Çıktı: Merhaba, Otomasyon Mühendisi!`},{type:"heading",content:"Adım 7: İlk pytest Testiniz"},{type:"code",language:"python",content:`# test_first.py
def add(a, b):
    return a + b

def test_add():
    result = add(2, 3)
    assert result == 5

def test_add_negative():
    assert add(-1, -1) == -2`},{type:"code",language:"bash",content:`# Testleri çalıştır
pytest test_first.py

# Ayrıntılı çıktı ile çalıştır
pytest test_first.py -v

# Çıktı:
# test_first.py::test_add PASSED
# test_first.py::test_add_negative PASSED
# 2 passed in 0.12s`},{type:"info",content:"pytest, test_*.py veya *_test.py olarak adlandırılan test dosyalarını ve test_ ile başlayan test fonksiyonlarını otomatik olarak bulur. Temel kullanım için herhangi bir yapılandırma gerekmez."}]},{title:"Orta Seviye: pytest, Selenium ve Requests",blocks:[{type:"heading",content:"Otomasyon için Python Temelleri"},{type:"subheading",content:"Değişkenler, Veri Tipleri ve Koleksiyonlar"},{type:"code",language:"python",content:`# Değişkenler ve veri tipleri
username = "admin"          # str (metin)
password = "secret123"      # str
timeout = 30                # int (tam sayı)
is_logged_in = False        # bool (mantıksal)
base_url = "https://api.example.com"

# List — sıralı, değiştirilebilir
browsers = ["chrome", "firefox", "edge"]
browsers.append("safari")
first = browsers[0]        # "chrome"

# Dictionary — anahtar-değer çiftleri
user = {
    "name": "Alice",
    "role": "tester",
    "active": True
}
print(user["name"])         # Alice
print(user.get("email", "N/A"))  # N/A (anahtar yoksa varsayılan)

# f-string — metin içine değişken yerleştirme
url = f"{base_url}/users/{user['name']}"
print(url)  # https://api.example.com/users/Alice`},{type:"subheading",content:"Kontrol Akışı ve Döngüler"},{type:"code",language:"python",content:`# if/elif/else
status_code = 200
if status_code == 200:
    print("Tamam")
elif status_code == 404:
    print("Bulunamadı")
else:
    print(f"Beklenmeyen: {status_code}")

# for döngüsü
endpoints = ["/login", "/products", "/cart"]
for endpoint in endpoints:
    print(f"Test ediliyor: {base_url}{endpoint}")

# range ile for döngüsü
for i in range(5):
    print(f"Deneme {i + 1}")

# List comprehension (çok Pythonic bir yol)
test_urls = [f"{base_url}{ep}" for ep in endpoints]`},{type:"subheading",content:"Fonksiyonlar"},{type:"code",language:"python",content:`# Basit fonksiyon
def get_full_url(base, path):
    return f"{base}{path}"

# Varsayılan parametreli fonksiyon
def login(username, password, remember=False):
    print(f"{username} olarak giriş yapılıyor, remember={remember}")

# Tip ipuçlı fonksiyon (önerilen)
def create_user(name: str, age: int) -> dict:
    return {"name": name, "age": age}

# Kullanım
url = get_full_url("https://example.com", "/login")
login("admin", "pass123")
login("admin", "pass123", remember=True)`},{type:"heading",content:"pytest Temelleri"},{type:"subheading",content:"Test Keşfi Kuralları"},{type:"list",icon:"📁",items:[{label:"Dosya adları",desc:"test_*.py veya *_test.py desenlerine uymalıdır"},{label:"Fonksiyon adları",desc:"test_ ile başlamalıdır"},{label:"Sınıf adları",desc:"Test ile başlamalıdır (ve __init__ metodu olmamalıdır)"},{label:"Metod adları",desc:"Test sınıfları içinde test_ ile başlamalıdır"}]},{type:"code",language:"python",content:`# test_calculator.py
class TestCalculator:
    def test_toplama(self):
        assert 2 + 2 == 4

    def test_cikarma(self):
        assert 10 - 3 == 7

    def test_sifira_bolme(self):
        import pytest
        with pytest.raises(ZeroDivisionError):
            result = 1 / 0`},{type:"subheading",content:"pytest Fixture'ları"},{type:"text",content:"Fixture'lar, pytest'in kurulum ve temizleme işlemlerini yönetme biçimidir. Test verisi sağlayan, bağlantıları kuran veya ortamı yapılandıran fonksiyonlardır. Testler, hangi fixture'lara ihtiyaç duyduklarını parametre olarak belirtir."},{type:"code",language:"python",content:`import pytest

# Basit fixture — test verisi sağlar
@pytest.fixture
def sample_user():
    return {"username": "testuser", "email": "test@example.com"}

# yield ile temizleme yapan fixture
@pytest.fixture
def db_connection():
    # KURULUM: testten önce çalışır
    conn = create_db_connection()
    yield conn
    # TEMİZLEME: testten sonra çalışır (test başarısız olsa bile)
    conn.close()

# Test, fixture'ı adıyla parametre olarak alır
def test_user_has_email(sample_user):
    assert "email" in sample_user
    assert sample_user["email"] == "test@example.com"

def test_db_query(db_connection):
    result = db_connection.query("SELECT 1")
    assert result is not None`},{type:"subheading",content:"Fixture Scope'ları"},{type:"table",headers:["Scope","Ne Zaman Çalışır","Kullanım Senaryosu"],rows:[["function (varsayılan)","Her test fonksiyonu için","Test başına taze durum — en yaygın kullanım"],["class","Her test sınıfı için","İlgili testler grubu için paylaşılan kurulum"],["module","Her test dosyası (.py) için","Dosya başına paylaşılan DB/API bağlantısı"],["session","Tüm test çalışması için","Tüm testlerde paylaşılan tarayıcı örneği, ağır kurulum"]]},{type:"code",language:"python",content:`# conftest.py — burada tanımlanan fixture'lar TÜM testlere açıktır
import pytest
from selenium import webdriver

@pytest.fixture(scope="session")
def browser():
    """Browser fixture — tüm test oturumu için bir kez oluşturulur"""
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()  # TÜM testler bittikten sonra temizlik

@pytest.fixture(scope="function")
def logged_in_browser(browser):
    """Her test taze bir giriş yapmış durumda başlar"""
    browser.get("https://example.com/login")
    browser.find_element(By.ID, "username").send_keys("admin")
    browser.find_element(By.ID, "password").send_keys("pass")
    browser.find_element(By.ID, "submit").click()
    yield browser
    # Her testten sonra çıkış yap
    browser.get("https://example.com/logout")`},{type:"subheading",content:"Parametrize — Veriye Dayalı Testler"},{type:"code",language:"python",content:`import pytest

# Aynı testi birden fazla girdiyle çalıştır
@pytest.mark.parametrize("username, password, expected", [
    ("admin", "correct_pass", True),
    ("admin", "wrong_pass", False),
    ("", "any_pass", False),
    ("admin", "", False),
])
def test_login(username, password, expected):
    result = login(username, password)
    assert result == expected

# Okunabilir test adları için ID'li parametrize
@pytest.mark.parametrize("status_code", [200, 201, 204], ids=["ok", "created", "no-content"])
def test_success_codes(status_code):
    assert status_code < 300`},{type:"heading",content:"Selenium Temelleri"},{type:"code",language:"python",content:`from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Chrome WebDriver kurulumu
driver = webdriver.Chrome()
driver.maximize_window()

# URL'ye git
driver.get("https://automationexercise.com")

# Farklı locator'lar ile element bulma
search_box = driver.find_element(By.ID, "search_product")
username_field = driver.find_element(By.NAME, "email")
submit_btn = driver.find_element(By.CSS_SELECTOR, "button[data-qa='login-button']")
product_name = driver.find_element(By.XPATH, "//h2[@class='product-name']")

# Etkileşimler
search_box.send_keys("Blue Top")   # Metin yaz
submit_btn.click()                  # Tıkla
username_field.clear()              # Alanı temizle

# Bilgi alma
page_title = driver.title
current_url = driver.current_url
element_text = product_name.text

# Temizlik
driver.quit()`},{type:"subheading",content:"Explicit vs Implicit Wait"},{type:"code",language:"python",content:`from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ❌ IMPLICIT WAIT — Bu yaklaşımdan kaçının
# Tüm find_element çağrılarına küresel olarak uygulanır
driver.implicitly_wait(10)

# ✅ EXPLICIT WAIT — Önerilen yöntem
# Devam etmeden önce belirli bir koşulu bekler
wait = WebDriverWait(driver, timeout=10)

# Element görünür olana kadar bekle
element = wait.until(
    EC.visibility_of_element_located((By.ID, "myElement"))
)

# Element tıklanabilir olana kadar bekle
button = wait.until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, ".submit-btn"))
)

# Belirli metin görünene kadar bekle
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Başarılı"))

# URL değişene kadar bekle
wait.until(EC.url_contains("/dashboard"))`},{type:"tip",content:"Her zaman Implicit Wait yerine Explicit Wait'i tercih edin. Daha öngörülebilir, daha hızlı (koşul karşılandığında durur) ve diğer bekleme mekanizmalarıyla etkileşime girmez."},{type:"heading",content:"Requests Kütüphanesi — API Testi"},{type:"code",language:"python",content:`import requests

BASE_URL = "https://automationexercise.com/api"

# GET isteği
response = requests.get(f"{BASE_URL}/productsList")
print(response.status_code)        # 200
print(response.json())             # Ayrıştırılmış JSON gövdesi
print(response.headers)            # Yanıt başlıkları
print(response.elapsed)            # Yanıt süresi

# POST isteği
payload = {
    "name": "Test Kullanıcısı",
    "email": "test@example.com",
    "password": "pass123"
}
response = requests.post(f"{BASE_URL}/createAccount", data=payload)

# pytest'te assertions
def test_get_products():
    response = requests.get(f"{BASE_URL}/productsList")
    assert response.status_code == 200
    data = response.json()
    assert "products" in data
    assert len(data["products"]) > 0`}]},{title:"İleri Seviye: POM, CI/CD, Paralel Testler ve Raporlama",blocks:[{type:"heading",content:"Page Object Model (POM)"},{type:"text",content:"Page Object Model, her web sayfasının (veya sayfa bileşeninin) bir Python sınıfı olarak temsil edildiği bir tasarım desenidir. Sınıf, o sayfanın locator'larını ve metodlarını içerir. Testler, doğrudan Selenium yerine sayfa nesneleriyle etkileşime girer. Bu, testleri okunabilir, yeniden kullanılabilir ve bakımı kolay hale getirir."},{type:"code",language:"python",content:`# pages/base_page.py
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, timeout=10)

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def type(self, locator, text):
        element = self.wait.until(EC.visibility_of_element_located(locator))
        element.clear()
        element.send_keys(text)

    def get_text(self, locator):
        return self.wait.until(EC.visibility_of_element_located(locator)).text

    def is_visible(self, locator):
        try:
            return self.wait.until(EC.visibility_of_element_located(locator)).is_displayed()
        except:
            return False`},{type:"code",language:"python",content:`# pages/login_page.py
from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class LoginPage(BasePage):
    EMAIL_INPUT = (By.CSS_SELECTOR, "input[data-qa='login-email']")
    PASSWORD_INPUT = (By.CSS_SELECTOR, "input[data-qa='login-password']")
    LOGIN_BUTTON = (By.CSS_SELECTOR, "button[data-qa='login-button']")
    ERROR_MESSAGE = (By.CSS_SELECTOR, "p[style*='color: red']")

    def open(self):
        self.navigate_to("https://automationexercise.com/login")
        return self

    def login(self, email, password):
        self.type(self.EMAIL_INPUT, email)
        self.type(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
        return self

    def get_error_message(self):
        return self.get_text(self.ERROR_MESSAGE)`},{type:"heading",content:"conftest.py Desenleri"},{type:"code",language:"python",content:`# conftest.py (proje kök dizini)
import pytest
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv
import os

load_dotenv()  # .env dosyasını yükle

@pytest.fixture(scope="session")
def browser():
    options = Options()
    if os.getenv("HEADLESS", "false").lower() == "true":
        options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    yield driver
    driver.quit()

@pytest.fixture(scope="session")
def api_client():
    """Base URL ve auth başlıklarıyla requests Session döndürür"""
    session = requests.Session()
    session.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('API_TOKEN')}"
    })
    return session

@pytest.fixture
def test_user():
    return {
        "email": os.getenv("TEST_EMAIL", "test@example.com"),
        "password": os.getenv("TEST_PASSWORD", "Test@1234"),
        "name": "Otomasyon Kullanıcısı"
    }`},{type:"heading",content:"pytest Marker'ları"},{type:"code",language:"python",content:`# pytest.ini — özel marker'ları kaydet
[pytest]
markers =
    smoke: Hızlı, kritik yol testleri — her commit'te çalıştır
    regression: Tam regression suite'i
    api: Sadece API testleri
    ui: UI/tarayıcı testleri
    slow: 10 saniyeden uzun süren testler

# Testlerde marker kullanımı
import pytest

@pytest.mark.smoke
@pytest.mark.api
def test_health_check(api_client):
    response = api_client.get("/health")
    assert response.status_code == 200`},{type:"code",language:"bash",content:`# Sadece smoke testlerini çalıştır
pytest -m smoke

# Sadece UI testlerini çalıştır
pytest -m ui

# Smoke VEYA api testlerini çalıştır
pytest -m "smoke or api"

# Regression'dan slow olanları çıkararak çalıştır
pytest -m "regression and not slow"`},{type:"heading",content:"pytest Hook'ları"},{type:"code",language:"python",content:`# conftest.py — pytest hook'ları
import pytest

def pytest_configure(config):
    """Test oturumu başında bir kez çağrılır"""
    print("\\n=== Test Oturumu Başlıyor ===")

def pytest_runtest_makereport(item, call):
    """Her test aşamasından sonra çağrılır — hata durumunda ekran görüntüsü için kullanışlı"""
    if call.when == "call" and call.excinfo is not None:
        # Test başarısız oldu — ekran görüntüsü al
        if hasattr(item, "funcargs") and "browser" in item.funcargs:
            driver = item.funcargs["browser"]
            driver.save_screenshot(f"screenshots/{item.name}.png")

def pytest_collection_modifyitems(config, items):
    """Toplanan testleri yeniden sırala veya filtrele"""
    smoke_tests = [i for i in items if i.get_closest_marker("smoke")]
    other_tests = [i for i in items if not i.get_closest_marker("smoke")]
    items[:] = smoke_tests + other_tests`},{type:"heading",content:"pytest-xdist ile Paralel Test Çalıştırma"},{type:"code",language:"bash",content:`# Kur
pip install pytest-xdist

# 4 CPU çekirdeği kullanarak testleri çalıştır
pytest -n 4

# Mevcut tüm CPU çekirdeklerini kullanarak çalıştır
pytest -n auto

# Testleri worker'lara dağıt
pytest -n 4 --dist=loadfile   # Aynı dosyadan testleri aynı worker'da tut
pytest -n 4 --dist=load       # Yükü eşit dağıt (varsayılan)`},{type:"heading",content:"Allure Raporlama"},{type:"code",language:"python",content:`# pip install allure-pytest
import allure
import pytest

@allure.feature("Kullanıcı Kimlik Doğrulama")
@allure.story("Giriş")
class TestLogin:

    @allure.title("Geçerli kimlik bilgileriyle başarılı giriş")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_successful_login(self, browser):
        with allure.step("Giriş sayfasını aç"):
            browser.get("https://example.com/login")
        with allure.step("Kimlik bilgilerini gir"):
            browser.find_element(By.ID, "email").send_keys("admin@test.com")
            browser.find_element(By.ID, "password").send_keys("pass123")
        with allure.step("Giriş butonuna tıkla"):
            browser.find_element(By.ID, "submit").click()
        with allure.step("Dashboard'un görünür olduğunu doğrula"):
            assert "Dashboard" in browser.title`},{type:"code",language:"bash",content:`# Testleri çalıştır ve Allure sonuçlarını oluştur
pytest --alluredir=allure-results

# Tarayıcıda Allure raporunu sun
allure serve allure-results

# Statik rapor oluştur
allure generate allure-results --clean -o allure-report`},{type:"heading",content:"CSV ve JSON ile Veriye Dayalı Test"},{type:"code",language:"python",content:`import csv
import json
import pytest

# CSV'den test verisi yükle
def load_csv_data(filepath):
    with open(filepath, newline="") as f:
        reader = csv.DictReader(f)
        return [(row["username"], row["password"], row["expected"]) for row in reader]

# JSON'dan test verisi yükle
def load_json_data(filepath):
    with open(filepath) as f:
        return json.load(f)

# CSV verisi ile parametrize kullan
@pytest.mark.parametrize("username,password,expected", load_csv_data("test_data/login.csv"))
def test_login_csv(username, password, expected):
    result = login(username, password)
    assert str(result).lower() == expected.lower()`},{type:"heading",content:"API Test Framework Yapısı"},{type:"code",language:"python",content:`# api/base_api.py
import requests

class BaseAPI:
    def __init__(self, base_url: str, token: str = None):
        self.base_url = base_url
        self.session = requests.Session()
        if token:
            self.session.headers["Authorization"] = f"Bearer {token}"

    def get(self, endpoint, **kwargs):
        return self.session.get(f"{self.base_url}{endpoint}", **kwargs)

    def post(self, endpoint, **kwargs):
        return self.session.post(f"{self.base_url}{endpoint}", **kwargs)

# api/users_api.py
from api.base_api import BaseAPI

class UsersAPI(BaseAPI):
    ENDPOINT = "/users"

    def get_all_users(self):
        return self.get(self.ENDPOINT)

    def create_user(self, payload: dict):
        return self.post(self.ENDPOINT, json=payload)`},{type:"code",language:"python",content:`# jsonschema ile şema doğrulama
import jsonschema

USER_SCHEMA = {
    "type": "object",
    "required": ["id", "name", "email"],
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "email": {"type": "string", "format": "email"},
    }
}

def test_user_response_schema(api_client):
    response = api_client.get("/users/1")
    assert response.status_code == 200
    # Şema eşleşmezse jsonschema.ValidationError fırlatır
    jsonschema.validate(instance=response.json(), schema=USER_SCHEMA)`},{type:"heading",content:".env ile Ortam Yönetimi"},{type:"code",language:"text",content:`# .env dosyası (ASLA git'e commit etmeyin!)
BASE_URL=https://staging.example.com
API_TOKEN=gizli_token_buraya
TEST_EMAIL=testuser@example.com
TEST_PASSWORD=GucluSifre123
HEADLESS=false
BROWSER=chrome`},{type:"heading",content:"GitHub Actions CI/CD"},{type:"code",language:"yaml",content:`# .github/workflows/tests.yml
name: Otomasyon Testlerini Çalıştır

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Kodu al
        uses: actions/checkout@v4

      - name: Python kur
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Bağımlılıkları kur
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Playwright tarayıcılarını kur
        run: playwright install --with-deps chromium

      - name: Testleri çalıştır
        env:
          BASE_URL: \${{ secrets.BASE_URL }}
          API_TOKEN: \${{ secrets.API_TOKEN }}
          HEADLESS: "true"
        run: pytest -m smoke -v --alluredir=allure-results`},{type:"heading",content:"Python ile Playwright"},{type:"code",language:"python",content:`# pytest için Senkron Playwright (önerilen)
from playwright.sync_api import Page, expect
import pytest

@pytest.fixture(scope="session")
def browser_context(playwright):
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    yield context
    context.close()
    browser.close()

@pytest.fixture
def page(browser_context):
    page = browser_context.new_page()
    yield page
    page.close()

def test_login_with_playwright(page: Page):
    page.goto("https://automationexercise.com/login")

    # Playwright otomatik bekler — explicit wait gerekmez!
    page.fill("input[data-qa='login-email']", "test@example.com")
    page.fill("input[data-qa='login-password']", "pass123")
    page.click("button[data-qa='login-button']")

    # Otomatik yeniden deneme ile expect assertion'ları
    expect(page).to_have_url("https://automationexercise.com/")
    expect(page.locator(".loggedin-as")).to_be_visible()`},{type:"info",content:"Playwright'ın Selenium'a göre temel avantajı: yerleşik otomatik bekleme, ağ isteklerini yakalayabilme, çoklu sekme/bağlam desteği ve modern tek sayfalı uygulamalarda önemli ölçüde daha hızlı çalışma."}]},{title:"Mülakat Soruları ve Cevapları",blocks:[{type:"qa",question:"1. pytest ile unittest arasındaki fark nedir?",answer:"unittest, Java'nın JUnit'inden esinlenerek oluşturulmuş Python'ın yerleşik test framework'üdür. Test sınıflarının unittest.TestCase'den miras almasını ve setUp/tearDown gibi metodları kullanmasını gerektirir. pytest ise daha basit, daha güçlü ve sektör standardı olan üçüncü taraf bir framework'tür. pytest düz fonksiyonlar kullanır (sınıf kalıtımı gerekmez), setUp/tearDown yerine fixture'lar kullanır ve zengin bir plugin ekosistemine sahiptir. pytest ayrıca unittest testlerini de çalıştırabilir.",code:`# unittest stili
import unittest
class TestLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
    def test_login(self):
        self.assertEqual(1 + 1, 2)
    def tearDown(self):
        self.driver.quit()

# pytest stili — çok daha basit
def test_login(browser):  # browser bir fixture'dır
    assert 1 + 1 == 2`},{type:"qa",question:"2. Fixture nedir? Fixture scope'u ne anlama gelir?",answer:"Fixture'lar, pytest'in test kurulumu ve temizlemesi için bağımlılık enjeksiyon mekanizmasıdır. Fixture, testlerin ihtiyaç duyduğu kaynakları hazırlayan @pytest.fixture dekoratörlü bir fonksiyondur. Testler fixture'ları parametre olarak bildirdiğinde pytest onları otomatik olarak sağlar. Fixture scope'u fixture'ın ne sıklıkla oluşturulduğunu kontrol eder: 'function' (varsayılan) her test için yeni bir örnek oluşturur, 'class' sınıf başına bir kez, 'module' dosya başına bir kez, 'session' tüm test çalışması için bir kez."},{type:"qa",question:"3. @pytest.mark.parametrize nasıl çalışır?",answer:"parametrize, aynı test fonksiyonunu birden fazla girdi veri setiyle çalıştırmayı sağlar. pytest her parametre seti için ayrı bir test vakası oluşturur. Bu, kod tekrarını ortadan kaldırır ve dış dosyalara ihtiyaç duymadan doğrudan Python'da veriye dayalı test yapılmasını sağlar.",code:`@pytest.mark.parametrize("email, valid", [
    ("kullanici@example.com", True),
    ("gecersiz-email", False),
    ("", False),
])
def test_email_dogrulama(email, valid):
    assert validate_email(email) == valid
# 3 test oluşturur: test_email_dogrulama[...] x3`},{type:"qa",question:"4. conftest.py nedir ve neden önemlidir?",answer:"conftest.py, pytest tarafından import edilmeden otomatik olarak yüklenen özel bir pytest dosyasıdır. conftest.py içinde tanımlanan fixture'lar ve hook'lar, aynı dizindeki ve tüm alt dizinlerdeki test dosyalarına açıktır. Farklı dizin seviyelerinde birden fazla conftest.py dosyasına sahip olabilirsiniz. Tarayıcı, API istemcisi, veritabanı ve test verisi fixture'larınızı buraya koyarsınız."},{type:"qa",question:"5. Page Object Model'in avantajları nelerdir?",answer:"POM şu faydaları sağlar: (1) Sorumluluk ayrımı — locator'lar ve sayfa etkileşimleri sayfa sınıflarında, test mantığı test dosyalarındadır. (2) Yeniden kullanılabilirlik — login() metodu bir kez yazılır, yüzlerce testte kullanılır. (3) Bakım kolaylığı — locator değiştiğinde tek bir yerde güncellenir. (4) Okunabilirlik — testler kullanıcı hikayeleri gibi okunur. (5) Kod tekrarını azaltır — DRY prensibi uygulanır."},{type:"qa",question:"6. Implicit vs Explicit wait — hangisi daha iyidir ve neden?",answer:"Explicit wait her zaman daha iyidir. Implicit wait, her find_element çağrısının N saniyeye kadar beklemesini sağlayan global bir ayardır. Sorunları: (1) Beklemeye ihtiyaç duymadığınızda bile tüm element aramalarına uygulanır. (2) Explicit wait ile birlikte kullanıldığında tahmin edilemez şekilde etkileşir ve testlerin iki katı beklemesine neden olabilir. (3) Gerçek performans sorunlarını gizleyebilir. Explicit wait, belirli bir elementteki belirli bir koşul için bekler — öngörülebilir, hassas ve hızlı."},{type:"qa",question:"7. Selenium'da dinamik elementleri nasıl ele alırsınız?",answer:"Dinamik elementler sayfa yüklemelerinde niteliklerini değiştirir. Stratejiler: (1) Otomatik oluşturulan ID'ler yerine data-qa, aria-label veya name gibi kararlı nitelikleri kullanın. (2) Yakınındaki kararlı elementlere dayalı relative XPath kullanın. (3) Kısmi nitelik eşleşmesiyle CSS selector kullanın. (4) Metin tabanlı locator'lar kullanın. (5) Etkileşimden önce elementin görünmesini beklemek için WebDriverWait kullanın.",code:`# Kaçının: otomatik oluşturulan ID
driver.find_element(By.ID, "react-select-123-option-0")

# Daha iyi: kararlı data niteliği
driver.find_element(By.CSS_SELECTOR, "[data-testid='dropdown-option-first']")

# Daha iyi: kısmi eşleşme
driver.find_element(By.CSS_SELECTOR, "[id^='react-select']")`},{type:"qa",question:"8. Testleri paralel nasıl çalıştırırsınız?",answer:"pytest-xdist plugin'ini kullanın: 'pip install pytest-xdist', ardından tüm CPU çekirdeklerini kullanmak için 'pytest -n auto' veya 4 worker için 'pytest -n 4'. Önemli: testler bağımsız olmalıdır — testler arasında paylaşılan durum olmamalıdır. Session-scoped fixture'ları dikkatli kullanın. Tarayıcı testlerinde her worker kendi tarayıcı örneğini alır."},{type:"qa",question:"9. pytest hook nedir?",answer:"Hook'lar, pytest'in test yaşam döngüsünün belirli noktalarında çağırdığı conftest.py'deki özel fonksiyonlardır. Yaygın hook'lar: pytest_configure (oturum başlangıcı), pytest_collection_modifyitems (test toplamadan sonra — yeniden sıralama/filtreleme), pytest_runtest_setup (her testten önce), pytest_runtest_teardown (her testten sonra), pytest_runtest_makereport (her test aşamasından sonra — hata durumunda ekran görüntüsü için kullanışlı)."},{type:"qa",question:"10. pytest'te nasıl mock kullanırsınız?",answer:"pytest-mock kullanın (pip install pytest-mock) — Python'ın unittest.mock'unu sarmalayan bir araçtır. 'mocker' fixture'ı otomatik olarak sağlanır. Testler sırasında gerçek nesneleri mock nesnelerle değiştirmek için mocker.patch() kullanın. Bu, birimleri API'ler, veritabanları veya dosya sistemleri gibi dış bağımlılıklardan izole etmek için kullanışlıdır.",code:`from unittest.mock import patch

def test_api_call_mocked(mocker):
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"users": [{"id": 1}]}

    mocker.patch("requests.get", return_value=mock_response)

    result = get_users()  # Bu dahili olarak requests.get çağırır
    assert result[0]["id"] == 1  # Gerçek ağ çağrısı yapılmadı`},{type:"qa",question:"11. Test verisini nasıl yönetirsiniz?",answer:"Birden fazla yaklaşım: (1) Testte sabit kodlama (büyük miktarlar için kötü). (2) Basit yapılandırılmış veriler için pytest fixture'ları. (3) Birden fazla girdi seti için @pytest.mark.parametrize. (4) Dış dosyalar: test toplama zamanında okunan CSV, JSON, Excel. (5) Factory'ler: faker kütüphanesiyle test verisini dinamik olarak üreten fonksiyonlar. (6) Hassas veriler için .env dosyaları aracılığıyla ortam değişkenleri. En iyi uygulama: test verisini testlere yakın tutun, kimlik bilgilerini asla sabit kodlamayın."},{type:"qa",question:"12. assert ile pytest.raises() arasındaki fark nedir?",answer:"assert, bir koşulun True olduğunu doğrulamak için kullanılır — kodun başarılı olmasını beklediğinizde kullanılır. pytest.raises(), kodun belirli bir istisna fırlatmasını beklediğinizde kullanılır — negatif test ve hata yönetimi doğrulaması için kullanılır. İstisnaları yakalamak için düz assert kullanmak anlamlı hata mesajları vermez; pytest.raises() ise istisna testi üzerinde tam kontrol sağlar.",code:`# assert — olumlu sonucu doğrula
def test_add():
    assert add(2, 3) == 5

# pytest.raises — istisna fırlatıldığını doğrula
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# İstisna mesajını doğrula
def test_invalid_age():
    with pytest.raises(ValueError, match="Age must be positive"):
        create_user(name="Alice", age=-5)`},{type:"qa",question:"13. Test raporlarını nasıl oluşturursunuz?",answer:"Birkaç seçenek: (1) pytest'in yerleşik çıktısı: ayrıntılı terminal çıktısı için 'pytest -v'. (2) pytest-html: 'pip install pytest-html', HTML rapor için 'pytest --html=report.html'. (3) Allure: 'pip install allure-pytest', 'pytest --alluredir=results' çalıştırın, ardından interaktif rapor için 'allure serve results'. Allure, profesyonel test raporlaması için sektör standardıdır."},{type:"qa",question:"14. Selenium Grid nedir?",answer:"Selenium Grid, testlerin birden fazla makine ve tarayıcıda eş zamanlı olarak çalıştırılmasını sağlayan bir sunucudur. Hub (merkezi koordinatör) ve Node'lardan (tarayıcılı makineler) oluşur. Testler Hub'a bağlanır ve Hub onları uygun Node'lara yönlendirir. Kullanım senaryoları: çapraz tarayıcı testi, birden fazla OS/tarayıcı kombinasyonunda paralel çalıştırma, toplam test çalışma süresini azaltma.",code:`# Selenium Grid'e bağlan
from selenium import webdriver

options = webdriver.ChromeOptions()
driver = webdriver.Remote(
    command_executor="http://selenium-hub:4444/wd/hub",
    options=options
)
driver.get("https://example.com")`},{type:"qa",question:"15. Selenium'da iframe, alert ve çoklu pencereleri nasıl ele alırsınız?",answer:"Bunlar yaygın mülakat konularıdır. iframe'ler, driver.switch_to.frame() ile bağlam değiştirmeyi gerektirir. Alert'ler driver.switch_to.alert kullanır ve ardından .accept(), .dismiss() veya .send_keys() çağrılır. Çoklu pencereler/sekmeler için driver.window_handles tüm açık pencereleri alır, driver.switch_to.window() ise aralarında geçiş yapar.",code:`# iframe'leri ele al
driver.switch_to.frame("iframe_name")        # Ad/ID ile
driver.switch_to.frame(0)                    # İndeks ile
driver.switch_to.default_content()          # Ana sayfaya dön

# Alert'leri ele al
alert = driver.switch_to.alert
print(alert.text)     # Alert mesajını oku
alert.accept()        # Tamam'a tıkla
alert.dismiss()       # İptal'e tıkla

# Çoklu pencereleri ele al
main_window = driver.current_window_handle
driver.find_element(By.LINK_TEXT, "Yeni Sekme Aç").click()
all_windows = driver.window_handles
new_window = [w for w in all_windows if w != main_window][0]
driver.switch_to.window(new_window)
# ... yeni pencere ile etkileşim
driver.close()
driver.switch_to.window(main_window)  # Ana pencereye dön`},{type:"divider"},{type:"tip",content:"Profesyonel mülakat ipucu: Cevaplarınızın arkasındaki 'neden'i her zaman açıklayın. Sadece 'explicit wait daha iyidir' demeyin — yarış koşullarını önlediğini, tüm element aramalarını küresel olarak yavaşlatmadığını ve diğer bekleme mekanizmalarıyla öngörülebilir şekilde etkileşime girdiğini açıklayın. Bu, anlayışınızın derinliğini gösterir."}]}]}};function Rg(){return n.jsx($a,{data:Cg,gradient:"from-yellow-500 to-green-600",bgLight:"bg-gradient-to-br from-yellow-50 via-green-50 to-emerald-50"})}function _g(){return n.jsxs(qh,{children:[n.jsx(Kt,{path:"/",element:n.jsx(gg,{})}),n.jsx(Kt,{path:"/jmeter",element:n.jsx(Eg,{})}),n.jsx(Kt,{path:"/sql",element:n.jsx(Ng,{})}),n.jsx(Kt,{path:"/typescript",element:n.jsx(Pg,{})}),n.jsx(Kt,{path:"/python",element:n.jsx(Rg,{})})]})}async function Ag(){const{worker:e}=await vu(async()=>{const{worker:t}=await import("./browser-BWH0v1mm.js");return{worker:t}},[]);return e.start({onUnhandledRequest:"bypass",serviceWorker:{url:"/automationexercise/mockServiceWorker.js",options:{scope:"/automationexercise/"}}}).catch(t=>{console.error("Failed to start MSW:",t)})}Ag().catch(console.error).finally(()=>{Vd(document.getElementById("root")).render(n.jsx(v.StrictMode,{children:n.jsx(my,{children:n.jsx(sg,{children:n.jsx(_g,{})})})}))});
