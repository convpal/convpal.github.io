/*

 @param {object}   [options] The options object
 @param {object}   [options.rootElement=document] Root element to traverse for
                   <link> and <style> nodes.
 @param {string}   [options.include] CSS selector matching <link> and <style>
                   nodes to include
 @param {string}   [options.exclude] CSS selector matching <link> and <style>
                   nodes to exclude
 @param {object}   [options.filter] Regular expression used to filter node CSS
                   data. Each block of CSS data is tested against the filter,
                   and only matching data is included.
 @param {boolean}  [options.skipDisabled=true] Determines if disabled
                   stylesheets will be skipped while collecting CSS data.
 @param {boolean}  [options.useCSSOM=false] Determines if CSS data will be
                   collected from a stylesheet's runtime values instead of its
                   text content. This is required to get accurate CSS data
                   when a stylesheet has been modified using the deleteRule()
                   or insertRule() methods because these modifications will
                   not be reflected in the stylesheet's text content.
 @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
                   1) the XHR object, 2) source node reference, and 3) the
                   source URL as arguments.
 @param {function} [options.onSuccess] Callback on each CSS node read. Passes
                   1) CSS text, 2) source node reference, and 3) the source
                   URL as arguments.
 @param {function} [options.onError] Callback on each error. Passes 1) the XHR
                   object for inspection, 2) soure node reference, and 3) the
                   source URL that failed (either a <link> href or an @import)
                   as arguments
 @param {function} [options.onComplete] Callback after all nodes have been
                   processed. Passes 1) concatenated CSS text, 2) an array of
                   CSS text in DOM order, and 3) an array of nodes in DOM
                   order as arguments.

 @example

   getCssData({
     rootElement : document,
     include     : 'style,link[rel="stylesheet"]',
     exclude     : '[href="skip.css"]',
     filter      : /red/,
     skipDisabled: true,
     useCSSOM    : false,
     onBeforeSend(xhr, node, url) {
       // ...
     }
     onSuccess(cssText, node, url) {
       // ...
     }
     onError(xhr, node, url) {
       // ...
     },
     onComplete(cssText, cssArray, nodeArray) {
       // ...
     }
   });

 @param {object}   [options] Options object
 @param {object}   [options.rootElement=document] Root element to traverse for
                   <link> and <style> nodes
 @param {boolean}  [options.shadowDOM=false] Determines if shadow DOM <link>
                   and <style> nodes will be processed.
 @param {string}   [options.include="style,link[rel=stylesheet]"] CSS selector
                   matching <link re="stylesheet"> and <style> nodes to
                   process
 @param {string}   [options.exclude] CSS selector matching <link
                   rel="stylehseet"> and <style> nodes to exclude from those
                   matches by options.include
 @param {object}   [options.variables] A map of custom property name/value
                   pairs. Property names can omit or include the leading
                   double-hyphen (—), and values specified will override
                   previous values
 @param {boolean}  [options.onlyLegacy=true] Determines if the ponyfill will
                   only generate legacy-compatible CSS in browsers that lack
                   native support (i.e., legacy browsers)
 @param {boolean}  [options.preserveStatic=true] Determines if CSS
                   declarations that do not reference a custom property will
                   be preserved in the transformed CSS
 @param {boolean}  [options.preserveVars=false] Determines if CSS custom
                   property declarations will be preserved in the transformed
                   CSS
 @param {boolean}  [options.silent=false] Determines if warning and error
                   messages will be displayed on the console
 @param {boolean}  [options.updateDOM=true] Determines if the ponyfill will
                   update the DOM after processing CSS custom properties
 @param {boolean}  [options.updateURLs=true] Determines if relative url()
                   paths will be converted to absolute urls in external CSS
 @param {boolean}  [options.watch=false] Determines if a MutationObserver will
                   be created that will execute the ponyfill when a <link> or
                   <style> DOM mutation is observed
 @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
                   1) the XHR object, 2) source node reference, and 3) the
                   source URL as arguments
 @param {function} [options.onError] Callback after a CSS parsing error has
                   occurred or an XHR request has failed. Passes 1) an error
                   message, and 2) source node reference, 3) xhr, and 4 url as
                   arguments.
 @param {function} [options.onWarning] Callback after each CSS parsing warning
                   has occurred. Passes 1) a warning message as an argument.
 @param {function} [options.onSuccess] Callback after CSS data has been
                   collected from each node and before CSS custom properties
                   have been transformed. Allows modifying the CSS data before
                   it is transformed by returning any string value (or false
                   to skip). Passes 1) CSS text, 2) source node reference, and
                   3) the source URL as arguments.
 @param {function} [options.onComplete] Callback after all CSS has been
                   processed, legacy-compatible CSS has been generated, and
                   (optionally) the DOM has been updated. Passes 1) a CSS
                   string with CSS variable values resolved, 2) an array of
                   output <style> node references that have been appended to
                   the DOM, 3) an object containing all custom properies names
                   and values, and 4) the ponyfill execution time in
                   milliseconds.
 @param {function} [options.onFinally] Callback in modern and legacy browsers
                   after the ponyfill has finished all tasks. Passes 1) a
                   boolean indicating if the last ponyfill call resulted in a
                   style change, 2) a boolean indicating if the current
                   browser provides native support for CSS custom properties,
                   and 3) the ponyfill execution time in milliseconds.
 @example

   cssVars({
     rootElement   : document,
     shadowDOM     : false,
     include       : 'style,link[rel="stylesheet"]',
     exclude       : '',
     variables     : {},
     onlyLegacy    : true,
     preserveStatic: true,
     preserveVars  : false,
     silent        : false,
     updateDOM     : true,
     updateURLs    : true,
     watch         : false,
     onBeforeSend(xhr, node, url) {},
     onError(message, node, xhr, url) {},
     onWarning(message) {},
     onSuccess(cssText, node, url) {},
     onComplete(cssText, styleNode, cssVariables, benchmark) {},
     onFinally(hasChanged, hasNativeSupport, benchmark)
   });
 css-vars-ponyfill
 v2.4.6
 https://jhildenbiddle.github.io/css-vars-ponyfill/
 (c) 2018-2021 John Hildenbiddle <http://hildenbiddle.com>
 MIT license
 get-css-data
 v2.0.2
 https://github.com/jhildenbiddle/get-css-data
 (c) 2018-2021 John Hildenbiddle <http://hildenbiddle.com>
 MIT license
*/
(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{141:function(ha,V,ia){function p(){p=Object.assign||function(b){for(var e=1;e<arguments.length;e++){var d=arguments[e],a;for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&(b[a]=d[a])}return b};return p.apply(this,arguments)}function K(b){function e(a){var c="string"===typeof a;a=c&&"\x3c"===a.trim().charAt(0);return c&&!a}function d(a,c){f.onError(a,g[c],c)}function a(a,b){var d=f.onSuccess(a,g[b],b);c[b]=!1===d?"":d||a;if(-1===c.indexOf(null))f.onComplete(c)}
var h=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},f={mimeType:h.mimeType||null,onBeforeSend:h.onBeforeSend||Function.prototype,onSuccess:h.onSuccess||Function.prototype,onError:h.onError||Function.prototype,onComplete:h.onComplete||Function.prototype},g=Array.isArray(b)?b:[b],c=Array.apply(null,Array(g.length)).map(function(a){return null}),k=document.createElement("a");g.forEach(function(c,b){k.setAttribute("href",c);k.href=String(k.href);if(document.all&&!window.atob&&k.host.split(":")[0]!==
location.host.split(":")[0])if(k.protocol===location.protocol){var g=new XDomainRequest;g.open("GET",c);g.timeout=0;g.onprogress=Function.prototype;g.ontimeout=Function.prototype;g.onload=function(){var c=g.responseText;e(c)?a(c,b):d(g,b)};g.onerror=function(a){d(g,b)};setTimeout(function(){g.send()},0)}else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(c,")")),d(null,b);else{var l=new XMLHttpRequest;l.open("GET",c);f.mimeType&&l.overrideMimeType&&
l.overrideMimeType(f.mimeType);f.onBeforeSend(l,c,b);l.onreadystatechange=function(){if(4===l.readyState){var c=l.responseText;400>l.status&&e(c)?a(c,b):0===l.status&&e(c)?a(c,b):d(l,b)}};l.send()}})}function L(b){function e(){if(-1===k.indexOf(null)){k.reduce(function(a,c,b){""===c&&a.push(b);return a},[]).reverse().forEach(function(a){return[c,k].forEach(function(c){return c.splice(a,1)})});var a=k.join("");g.onComplete(a,k,c)}}function d(a,c,b,d){var f=g.onSuccess(a,b,d);h(void 0!==f&&!1===!!f?
"":f||a,b,d,function(a,d){null===k[c]&&(d.forEach(function(a){return g.onError(a.xhr,b,a.url)}),!g.filter||g.filter.test(a)?k[c]=a:k[c]="",e())})}function a(a,c){var b=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[],d={};d.rules=(a.replace(f.cssComments,"").match(f.cssImports)||[]).filter(function(a){return-1===b.indexOf(a)});d.urls=d.rules.map(function(a){return a.replace(f.cssImports,"$1")});d.absoluteUrls=d.urls.map(function(a){return E(a,c)});d.absoluteRules=d.rules.map(function(a,b){var f=
d.urls[b];b=E(d.absoluteUrls[b],c);return a.replace(f,b)});return d}function h(c,b,d,f){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:[],k=5<arguments.length&&void 0!==arguments[5]?arguments[5]:[],l=a(c,d,k);l.rules.length?K(l.absoluteUrls,{onBeforeSend:function(a,c,d){g.onBeforeSend(a,b,c)},onSuccess:function(c,d,f){f=g.onSuccess(c,b,d);c=!1===f?"":f||c;var e=a(c,d,k);e.rules.forEach(function(a,b){c=c.replace(a,e.absoluteRules[b])});return c},onError:function(a,g,W){e.push({xhr:a,
url:g});k.push(l.rules[W]);h(c,b,d,f,e,k)},onComplete:function(a){a.forEach(function(a,b){c=c.replace(l.rules[b],a)});h(c,b,d,f,e,k)}}):f(c,e)}var f={cssComments:/\/\*[\s\S]+?\*\//g,cssImports:/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g},g={rootElement:b.rootElement||document,include:b.include||'style,link[rel\x3d"stylesheet"]',exclude:b.exclude||null,filter:b.filter||null,skipDisabled:!1!==b.skipDisabled,useCSSOM:b.useCSSOM||!1,onBeforeSend:b.onBeforeSend||Function.prototype,
onSuccess:b.onSuccess||Function.prototype,onError:b.onError||Function.prototype,onComplete:b.onComplete||Function.prototype},c=Array.apply(null,g.rootElement.querySelectorAll(g.include)).filter(function(a){return!(a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector).call(a,g.exclude)}),k=Array.apply(null,Array(c.length)).map(function(a){return null});if(c.length)c.forEach(function(a,c){var b=a.getAttribute("href"),f=a.getAttribute("rel");
f="link"===a.nodeName.toLowerCase()&&b&&f&&-1!==f.toLowerCase().indexOf("stylesheet");var h=!1===g.skipDisabled?!1:a.disabled,l="style"===a.nodeName.toLowerCase();f&&!h?K(b,{mimeType:"text/css",onBeforeSend:function(c,b,d){g.onBeforeSend(c,a,b)},onSuccess:function(f,e,g){e=E(b);d(f,c,a,e)},onError:function(b,d,f){k[c]="";g.onError(b,a,d);e()}}):l&&!h?(f=a.textContent,g.useCSSOM&&(f=Array.apply(null,a.sheet.cssRules).map(function(a){return a.cssText}).join("")),d(f,c,a,location.href)):(k[c]="",e())});
else g.onComplete("",[])}function E(b,e){var d=document.implementation.createHTMLDocument(""),a=d.createElement("base"),h=d.createElement("a");d.head.appendChild(a);d.body.appendChild(h);a.href=e||document.baseURI||(document.querySelector("base")||{}).href||location.href;h.href=b;return h.href}function N(b,e,d){b instanceof RegExp&&(b=O(b,d));e instanceof RegExp&&(e=O(e,d));var a=P(b,e,d);return a&&{start:a[0],end:a[1],pre:d.slice(0,a[0]),body:d.slice(a[0]+b.length,a[1]),post:d.slice(a[1]+e.length)}}
function O(b,e){return(b=e.match(b))?b[0]:null}function P(b,e,d){var a,h=d.indexOf(b),f=d.indexOf(e,h+1),g=h;if(0<=h&&0<f){if(b===e)return[h,f];var c=[];for(a=d.length;0<=g&&!k;){if(g==h)c.push(g),h=d.indexOf(b,g+1);else if(1==c.length)var k=[c.pop(),f];else{var l=c.pop();if(l<a){a=l;var m=f}f=d.indexOf(e,g+1)}g=h<f&&0<=h?h:f}c.length&&(k=[a,m])}return k}function F(b){function e(a){throw Error("CSS parse error: ".concat(a));}function d(a){if(a=a.exec(b))return b=b.slice(a[0].length),a}function a(){d(/^\s*/);
if("/"===b[0]&&"*"===b[1]){for(var a=2;b[a]&&("*"!==b[a]||"/"!==b[a+1]);)a++;if(!b[a])return e("end of comment is missing");var c=b.slice(2,a);b=b.slice(a+2);return{type:"comment",comment:c}}}function h(){for(var c=[],b;b=a();)c.push(b);return x.removeComments?[]:c}function f(){for(d(/^\s*/);"}"===b[0];)e("extra closing bracket");var a=d(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(a){var c=a[0].trim();/\/\*/.test(c)&&(c=c.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,""));(a=/["']\w*,\w*["']/.test(c))&&
(c=c.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,function(a){return a.replace(/,/g,"\u200c")}));c=/,/.test(c)?c.split(/\s*(?![^(]*\)),\s*/):[c];a&&(c=c.map(function(a){return a.replace(/\u200C/g,",")}));return c}}function g(){if("@"===b[0])return M();d(/^([;\s]*)+/);var a=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,c=d(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);if(c){c=c[0].trim();if(!d(/^:\s*/))return e("property missing ':'");var f=d(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/);
a={type:"declaration",property:c.replace(a,""),value:f?f[0].replace(a,"").trim():""};d(/^[;\s]*/);return a}}function c(){if(!d(/^{\s*/))return e("missing '{'");for(var a,c=h();a=g();)c.push(a),c=c.concat(h());return d(/^}/)?c:e("missing '}'")}function k(){d(/^\s*/);for(var a=[],b;b=d(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)a.push(b[1]),d(/^,\s*/);if(a.length)return{type:"keyframe",values:a,declarations:c()}}function l(){var a=d(/^@([-\w]+)?keyframes\s*/);if(a){var c=a[1];a=d(/^([-\w]+)\s*/);if(!a)return e("@keyframes missing name");
a=a[1];if(!d(/^{\s*/))return e("@keyframes missing '{'");for(var b,f=h();b=k();)f.push(b),f=f.concat(h());return d(/^}/)?{type:"keyframes",name:a,vendor:c,keyframes:f}:e("@keyframes missing '}'")}}function m(){var a=d(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);if(a)return{type:"page-margin-box",name:"".concat(a[1],"-").concat(a[2])+(a[3]?"-".concat(a[3]):""),declarations:c()}}function n(){var a=d(/^@supports *([^{]+)/);if(a)return{type:"supports",supports:a[1].trim(),
rules:y()}}function t(){var a=d(/^@media([^{]+)*/);if(a)return{type:"media",media:(a[1]||"").trim(),rules:y()}}function q(){var a=d(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(a)return{type:"custom-media",name:a[1].trim(),media:a[2].trim()}}function w(){var a=d(/^@([-\w]+)?document *([^{]+)/);if(a)return{type:"document",document:a[2].trim(),vendor:a[1]?a[1].trim():null,rules:y()}}function u(){var a=d(/^@(import|charset|namespace)\s*([^;]+);/);if(a)return{type:a[1],name:a[2].trim()}}function M(){d(/^\s*/);
if("@"===b[0]){var a;(a=u())||(a=d(/^@font-face\s*/)?{type:"font-face",declarations:c()}:void 0);(a=a||t()||l()||n()||w()||q())||(a=d(/^@host\s*/)?{type:"host",rules:y()}:void 0);a||(a=d(/^@page */)?{type:"page",selectors:f()||[],declarations:c()}:void 0);if((a=a||m())&&!x.preserveStatic){var e=!1;return(e=a.declarations?a.declarations.some(function(a){return/var\(/.test(a.value)}):(a.keyframes||a.rules||[]).some(function(a){return(a.declarations||[]).some(function(a){return/var\(/.test(a.value)})}))?
a:{}}return a}}function X(){if(!x.preserveStatic){var a=Q("{","}",b);if(a){var d=/:(?:root|host)(?![.:#(])/.test(a.pre)&&/--\S*\s*:/.test(a.body),g=/var\(/.test(a.body);if(!d&&!g)return b=b.slice(a.end+1),{}}}var k=f()||[];a=x.preserveStatic?c():c().filter(function(a){var c=k.some(function(a){return/:(?:root|host)(?![.:#(])/.test(a)})&&/^--\S/.test(a.property);a=/var\(/.test(a.value);return c||a});k.length||e("selector missing");return{type:"rule",selectors:k,declarations:a}}function y(a){if(!a&&
!d(/^{\s*/))return e("missing '{'");for(var c,f=h();b.length&&(a||"}"!==b[0])&&(c=M()||X());)c.type&&f.push(c),f=f.concat(h());return a||d(/^}/)?f:e("missing '}'")}var x=p({},{preserveStatic:!0,removeComments:!1},1<arguments.length&&void 0!==arguments[1]?arguments[1]:{});return{type:"stylesheet",stylesheet:{rules:y(!0),errors:[]}}}function R(b){var e=p({},{parseHost:!1,store:{},onWarning:function(){}},1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}),d=new RegExp(":".concat(e.parseHost?"host":
"root","$"));"string"===typeof b&&(b=F(b,e));b.stylesheet.rules.forEach(function(a){"rule"===a.type&&a.selectors.some(function(a){return d.test(a)})&&a.declarations.forEach(function(a,b){b=a.property;a=a.value;b&&0===b.indexOf("--")&&(e.store[b]=a)})});return e.store}function S(b){function e(b){for(var f="",c=0;c<b.length;c++){var e=b[c];a&&a(e);var l=h[e.type](e);l&&(f+=l,l.length&&e.selectors&&(f+=d))}return f}var d=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",a=2<arguments.length?
arguments[2]:void 0,h={charset:function(a){return"@charset "+a.name+";"},comment:function(a){return 0===a.comment.indexOf("__CSSVARSPONYFILL")?"/*"+a.comment+"*/":""},"custom-media":function(a){return"@custom-media "+a.name+" "+a.media+";"},declaration:function(a){return a.property+":"+a.value+";"},document:function(a){return"@"+(a.vendor||"")+"document "+a.document+"{"+e(a.rules)+"}"},"font-face":function(a){return"@font-face{"+e(a.declarations)+"}"},host:function(a){return"@host{"+e(a.rules)+"}"},
import:function(a){return"@import "+a.name+";"},keyframe:function(a){return a.values.join(",")+"{"+e(a.declarations)+"}"},keyframes:function(a){return"@"+(a.vendor||"")+"keyframes "+a.name+"{"+e(a.keyframes)+"}"},media:function(a){return"@media "+a.media+"{"+e(a.rules)+"}"},namespace:function(a){return"@namespace "+a.name+";"},page:function(a){return"@page "+(a.selectors.length?a.selectors.join(", "):"")+"{"+e(a.declarations)+"}"},"page-margin-box":function(a){return"@"+a.name+"{"+e(a.declarations)+
"}"},rule:function(a){var b=a.declarations;if(b.length)return a.selectors.join(",")+"{"+e(b)+"}"},supports:function(a){return"@supports "+a.supports+"{"+e(a.rules)+"}"}};return e(b.stylesheet.rules)}function T(b,e){b.rules.forEach(function(d){d.rules?T(d,e):d.keyframes?d.keyframes.forEach(function(a){"keyframe"===a.type&&e(a.declarations,d)}):d.declarations&&e(d.declarations,b)})}function Z(b){var e=p({},{preserveStatic:!0,preserveVars:!1,variables:{},onWarning:function(){}},1<arguments.length&&void 0!==
arguments[1]?arguments[1]:{});"string"===typeof b&&(b=F(b,e));T(b.stylesheet,function(b,a){for(a=0;a<b.length;a++){var d=b[a],f=d.type,g=d.property,c=d.value;"declaration"===f&&(!e.preserveVars&&g&&0===g.indexOf("--")?(b.splice(a,1),a--):-1!==c.indexOf("var(")&&(c=v(c,e),c!==d.value&&(c=aa(c),e.preserveVars?(b.splice(a,0,{type:f,property:g,value:c}),a++):d.value=c)))}});return S(b)}function aa(b){(b.match(/calc\(([^)]+)\)/g)||[]).forEach(function(e){var d="calc".concat(e.split("calc").join(""));b=
b.replace(e,d)});return b}function v(b){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},d=2<arguments.length?arguments[2]:void 0;if(-1===b.indexOf("var("))return b;var a=Q("(",")",b);if(a){if("var"===a.pre.slice(-3)){if(0===a.body.trim().length)return e.onWarning("var() must contain a non-whitespace string"),b;var h=a.pre.slice(0,-3);var f=a.body;var g=f.split(",")[0].replace(/[\s\n\t]/g,"");var c=(f.match(/(?:\s*,\s*){1}(.*)?/)||[])[1],k=Object.prototype.hasOwnProperty.call(e.variables,
g)?String(e.variables[g]):void 0;c=k||(c?String(c):void 0);d=d||f;if(!k)e.onWarning('variable "'.concat(g,'" is undefined'));g=c&&"undefined"!==c&&0<c.length?v(c,e,d):"var(".concat(d,")");return h+g+v(a.post,e)}return a.pre+"(".concat(v(a.body,e),")")+v(a.post,e)}if(-1!==b.indexOf("var("))e.onWarning('missing closing ")" in the value "'.concat(b,'"'));return b}function q(){function b(c,b,d,e){!a.silent&&window.console&&console.error("".concat("cssVars(): ").concat(c,"\n"),b);a.onError(c,b,d,e)}function e(c){!a.silent&&
window.console&&console.warn("".concat("cssVars(): ").concat(c));a.onWarning(c)}var d=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},a=p({},A,d);if(B)if(a.watch)a.watch=A.watch,ba(a),q(a);else{!1===a.watch&&n&&(n.disconnect(),n=null);if(!a.__benchmark){if(C===a.rootElement){ca(d);return}var h=[].slice.call(a.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars\x3d"out"])'));a.__benchmark=D();a.exclude=[n?'[data-cssvars]:not([data-cssvars\x3d""])':'[data-cssvars\x3d"out"]',"link[disabled]:not([data-cssvars])",
a.exclude].filter(function(a){return a}).join(",");a.variables=da(a.variables);h.forEach(function(a){var c="style"===a.nodeName.toLowerCase()&&a.__cssVars.text,b=c&&a.textContent!==a.__cssVars.text;c&&b&&(a.sheet&&(a.sheet.disabled=!1),a.setAttribute("data-cssvars",""))});n||([].slice.call(a.rootElement.querySelectorAll('[data-cssvars\x3d"out"]')).forEach(function(c){var b=c.getAttribute("data-cssvars-group");b&&a.rootElement.querySelector('[data-cssvars\x3d"src"][data-cssvars-group\x3d"'.concat(b,
'"]'))||c.parentNode.removeChild(c)}),z&&h.length<z&&(z=h.length,m.dom={}))}if("loading"!==document.readyState)if(G&&a.onlyLegacy){var f=!1;if(a.updateDOM){var g=a.rootElement.host||(a.rootElement===document?document.documentElement:a.rootElement);Object.keys(a.variables).forEach(function(c){var b=a.variables[c];f=f||b!==getComputedStyle(g).getPropertyValue(c);g.style.setProperty(c,b)})}a.onFinally(!!f,G,D()-a.__benchmark)}else!H&&(a.shadowDOM||a.rootElement.shadowRoot||a.rootElement.host)?L({rootElement:A.rootElement,
include:A.include,exclude:a.exclude,skipDisabled:!1,onSuccess:function(a,b,d){if((b.sheet||{}).disabled&&!b.__cssVars)return!1;a=a.replace(t.cssComments,"").replace(t.cssMediaQueries,"");return(a=(a.match(t.cssVarDeclRules)||[]).join(""))||!1},onComplete:function(b,d,f){R(b,{store:m.dom,onWarning:e});H=!0;q(a)}}):(C=a.rootElement,L({rootElement:a.rootElement,include:a.include,exclude:a.exclude,skipDisabled:!1,onBeforeSend:a.onBeforeSend,onError:function(a,d,e){e=a.responseURL||U(e,location.href);
var c=a.statusText?"(".concat(a.statusText,")"):"Unspecified Error"+(0===a.status?" (possibly CORS related)":"");c="CSS XHR Error: ".concat(e," ").concat(a.status," ").concat(c);b(c,d,a,e)},onSuccess:function(b,d,e){if((d.sheet||{}).disabled&&!d.__cssVars)return!1;var c="link"===d.nodeName.toLowerCase(),f="style"===d.nodeName.toLowerCase()&&b!==d.textContent;d=a.onSuccess(b,d,e);b=void 0!==d&&!1===!!d?"":d||b;a.updateURLs&&(c||f)&&(b=ea(b,e));return b},onComplete:function(c,d){var f=2<arguments.length&&
void 0!==arguments[2]?arguments[2]:[],g=p({},m.dom,m.user),h=!1;m.job={};f.forEach(function(c,f){f=d[f];c.__cssVars=c.__cssVars||{};c.__cssVars.text=f;if(t.cssVars.test(f))try{var g=F(f,{preserveStatic:a.preserveStatic,removeComments:!0});R(g,{parseHost:!!a.rootElement.host,store:m.dom,onWarning:e});c.__cssVars.tree=g}catch(x){b(x.message,c)}});p(m.job,m.dom);a.updateDOM?(p(m.user,a.variables),p(m.job,m.user)):(p(m.job,m.user,a.variables),p(g,a.variables));if(h=0<w.job&&(Object.keys(m.job).length>
Object.keys(g).length||!(!Object.keys(g).length||!Object.keys(m.job).some(function(a){return m.job[a]!==g[a]}))))I(a.rootElement),q(a);else{var k=[],n=[],v=!1;a.updateDOM&&w.job++;f.forEach(function(c,f){var g=!c.__cssVars.tree;if(c.__cssVars.tree)try{Z(c.__cssVars.tree,p({},a,{variables:m.job,onWarning:e}));var h=S(c.__cssVars.tree);if(a.updateDOM){var l=t.cssVarFunc.test(d[f]);c.getAttribute("data-cssvars")||c.setAttribute("data-cssvars","src");if(h.length&&l){var q=c.getAttribute("data-cssvars-group")||
++w.group,u=h.replace(/\s/g,""),r=a.rootElement.querySelector('[data-cssvars\x3d"out"][data-cssvars-group\x3d"'.concat(q,'"]'))||document.createElement("style");v=v||t.cssKeyframes.test(h);a.preserveStatic&&c.sheet&&(c.sheet.disabled=!0);r.hasAttribute("data-cssvars")||r.setAttribute("data-cssvars","out");u===c.textContent.replace(/\s/g,"")?(g=!0,r&&r.parentNode&&(c.removeAttribute("data-cssvars-group"),r.parentNode.removeChild(r))):u!==r.textContent.replace(/\s/g,"")&&([c,r].forEach(function(a){a.setAttribute("data-cssvars-job",
w.job);a.setAttribute("data-cssvars-group",q)}),r.textContent=h,k.push(h),n.push(r),r.parentNode||c.parentNode.insertBefore(r,c.nextSibling))}}else c.textContent.replace(/\s/g,"")!==h&&k.push(h)}catch(Y){b(Y.message,c)}g&&c.setAttribute("data-cssvars","skip");c.hasAttribute("data-cssvars-job")||c.setAttribute("data-cssvars-job",w.job)});z=a.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars\x3d"out"])').length;if(a.shadowDOM){f=[].concat(a.rootElement).concat([].slice.call(a.rootElement.querySelectorAll("*")));
h=0;for(var u;u=f[h];++h)u.shadowRoot&&u.shadowRoot.querySelector("style")&&(u=p({},a,{rootElement:u.shadowRoot}),q(u))}a.updateDOM&&v&&fa(a.rootElement);C=!1;a.onComplete(k.join(""),n,JSON.parse(JSON.stringify(m.job)),D()-a.__benchmark);a.onFinally(!!n.length,G,D()-a.__benchmark)}}}));else document.addEventListener("DOMContentLoaded",function l(a){q(d);document.removeEventListener("DOMContentLoaded",l)})}}function ba(b){function e(a){var b=d(a)&&a.hasAttribute("disabled");a=(a.sheet||{}).disabled;
return b||a}function d(a){return"link"===a.nodeName.toLowerCase()&&-1!==(a.getAttribute("rel")||"").indexOf("stylesheet")}function a(a){var b=!1;"childList"===a.type&&(b=[].slice.call(a.addedNodes).some(function(a){var b=1===a.nodeType&&a.hasAttribute("data-cssvars"),c="style"===a.nodeName.toLowerCase()&&t.cssVars.test(a.textContent);return!b&&(d(a)||c)&&!e(a)}));return b}function h(a){var d=!1;"childList"===a.type&&(d=[].slice.call(a.removedNodes).some(function(a){var c=1===a.nodeType,d=c&&"out"===
a.getAttribute("data-cssvars");if((c=c&&"src"===a.getAttribute("data-cssvars"))||d)a=a.getAttribute("data-cssvars-group"),a=b.rootElement.querySelector('[data-cssvars-group\x3d"'.concat(a,'"]')),c&&I(b.rootElement,!0),a&&a.parentNode.removeChild(a);return c}));return d}window.MutationObserver&&(n&&(n.disconnect(),n=null),n=new MutationObserver(function(f){f.some(function(f){var c=!1;if("attributes"===f.type&&d(f.target)&&!e(f.target)){var g="disabled"===f.attributeName,l="href"===f.attributeName,
m="skip"===f.target.getAttribute("data-cssvars"),n="src"===f.target.getAttribute("data-cssvars");g?c=!m&&!n:l&&(m?f.target.setAttribute("data-cssvars",""):n&&I(b.rootElement,!0),c=!0)}c||(c=!1,"childList"===f.type&&(c="style"===f.target.nodeName.toLowerCase(),g="out"===f.target.getAttribute("data-cssvars"),c=c&&!g));return c||a(f)||h(f)})&&q(b)}),n.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","href"],childList:!0,subtree:!0}))}function ca(b){var e=1<arguments.length&&
void 0!==arguments[1]?arguments[1]:100;clearTimeout(J);J=setTimeout(function(){b.__benchmark=null;q(b)},e)}function fa(b){var e=["animation-name","-moz-animation-name","-webkit-animation-name"].filter(function(a){return getComputedStyle(document.body)[a]})[0];if(e){var d=b.getElementsByTagName("*");b=[];for(var a=0,h=d.length;a<h;a++){var f=d[a];"none"!==getComputedStyle(f)[e]&&(f.style[e]+="__CSSVARSPONYFILL-KEYFRAMES__",b.push(f))}void 0;d=0;for(a=b.length;d<a;d++)h=b[d].style,h[e]=h[e].replace("__CSSVARSPONYFILL-KEYFRAMES__",
"")}}function ea(b,e){(b.replace(t.cssComments,"").match(t.cssUrls)||[]).forEach(function(d){var a=d.replace(t.cssUrls,"$1"),h=U(a,e);b=b.replace(d,d.replace(a,h))});return b}function da(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=/^-{2}/;return Object.keys(b).reduce(function(d,a){var h=e.test(a)?a:"--".concat(a.replace(/^-+/,""));d[h]=b[a];return d},{})}function U(b){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:location.href,d=document.implementation.createHTMLDocument(""),
a=d.createElement("base"),h=d.createElement("a");d.head.appendChild(a);d.body.appendChild(h);a.href=e;h.href=b;return h.href}function D(){return B&&(window.performance||{}).now?window.performance.now():(new Date).getTime()}function I(b){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:!1;[].slice.call(b.querySelectorAll('[data-cssvars\x3d"skip"],[data-cssvars\x3d"src"]')).forEach(function(b){return b.setAttribute("data-cssvars","")});e&&(m.dom={})}var Q=N;N.range=P;var B="undefined"!==
typeof window,G=B&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)"),w={group:0,job:0},A={rootElement:B?document:null,shadowDOM:!1,include:"style,link[rel\x3dstylesheet]",exclude:"",variables:{},onlyLegacy:!0,preserveStatic:!0,preserveVars:!1,silent:!1,updateDOM:!0,updateURLs:!0,watch:null,onBeforeSend:function(){},onError:function(){},onWarning:function(){},onSuccess:function(){},onComplete:function(){},onFinally:function(){}},t={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,
cssMediaQueries:/@media[^{]+\{([\s\S]+?})\s*}/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVarDeclRules:/(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,cssVarDecls:/(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,cssVarFunc:/var\(\s*--[\w-]/,cssVars:/(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/},m={dom:{},job:{},user:{}},C=!1,n=null,z=0,J=null,H=!1;q.reset=function(){w.job=0;w.group=0;C=!1;n&&(n.disconnect(),n=null);z=0;
J=null;H=!1;for(var b in m)m[b]={}};V.a=q}}]);