!function(){"use strict";var e={913:function(){try{self["workbox:core:6.5.3"]&&_()}catch(e){}},550:function(){try{self["workbox:expiration:6.5.3"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:6.5.3"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}}},t={};function s(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}},n=!0;try{e[a](i,i.exports,s),n=!1}finally{n&&delete t[a]}return i.exports}!function(){var e;let t,a,r,i,n;s(913);let c=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class o extends Error{constructor(e,t){let s=c(e,t);super(s),this.name=e,this.details=t}}let l=new Set,h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),d=e=>{for(let t of Object.keys(h))e(t)},f={updateDetails:e=>{d(t=>{"string"==typeof e[t]&&(h[t]=e[t])})},getGoogleAnalyticsName:e=>e||u(h.googleAnalytics),getPrecacheName:e=>e||u(h.precache),getPrefix:()=>h.prefix,getRuntimeName:e=>e||u(h.runtime),getSuffix:()=>h.suffix};function p(e,t){let s=new URL(e);for(let e of t)s.searchParams.delete(e);return s.href}async function g(e,t,s,a){let r=p(t.url,s);if(t.url===r)return e.match(t,a);let i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),n=await e.keys(t,i);for(let t of n){let i=p(t.url,s);if(r===i)return e.match(t,a)}}function w(e){e.then(()=>{})}class m{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function y(){for(let e of l)await e()}let b=e=>{let t=new URL(String(e),location.href);return t.href.replace(RegExp(`^${location.origin}`),"")};function x(e){return new Promise(t=>setTimeout(t,e))}function v(e,t){let s=t();return e.waitUntil(s),s}async function R(e,s){let a=null;if(e.url){let t=new URL(e.url);a=t.origin}if(a!==self.location.origin)throw new o("cross-origin-copy-response",{origin:a});let r=e.clone(),i={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},n=s?s(i):i,c=!function(){if(void 0===t){let e=new Response("");if("body"in e)try{new Response(e.body),t=!0}catch(e){t=!1}t=!1}return t}()?await r.blob():r.body;return new Response(c,n)}let E=(e,t)=>t.some(t=>e instanceof t),C=new WeakMap,T=new WeakMap,k=new WeakMap,D=new WeakMap,L=new WeakMap,N={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return T.get(e);if("objectStoreNames"===t)return e.objectStoreNames||k.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return U(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function U(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,s)=>{let a=()=>{e.removeEventListener("success",r),e.removeEventListener("error",i)},r=()=>{t(U(e.result)),a()},i=()=>{s(e.error),a()};e.addEventListener("success",r),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&C.set(t,e)}).catch(()=>{}),L.set(t,e),t}(e);if(D.has(e))return D.get(e);let s="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(r||(r=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(S(this),e),U(C.get(this))}:function(...e){return U(t.apply(S(this),e))}:function(e,...s){let a=t.call(S(this),e,...s);return k.set(a,e.sort?e.sort():[e]),U(a)}:(t instanceof IDBTransaction&&function(e){if(T.has(e))return;let t=new Promise((t,s)=>{let a=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",i),e.removeEventListener("abort",i)},r=()=>{t(),a()},i=()=>{s(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",r),e.addEventListener("error",i),e.addEventListener("abort",i)});T.set(e,t)}(t),E(t,a||(a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,N):t;return s!==e&&(D.set(e,s),L.set(s,e)),s}let S=e=>L.get(e),P=["get","getKey","getAll","getAllKeys","count"],A=["put","add","delete","clear"],I=new Map;function q(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(I.get(t))return I.get(t);let s=t.replace(/FromIndex$/,""),a=t!==s,r=A.includes(s);if(!(s in(a?IDBIndex:IDBObjectStore).prototype)||!(r||P.includes(s)))return;let i=async function(e,...t){let i=this.transaction(e,r?"readwrite":"readonly"),n=i.store;return a&&(n=n.index(t.shift())),(await Promise.all([n[s](...t),r&&i.done]))[0]};return I.set(t,i),i}N={...e=N,get:(t,s,a)=>q(t,s)||e.get(t,s,a),has:(t,s)=>!!q(t,s)||e.has(t,s)},s(550);let M="cache-entries",K=e=>{let t=new URL(e,location.href);return t.hash="",t.href};class O{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){let t=e.createObjectStore(M,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){let s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",e=>t(e.oldVersion,e)),U(s).then(()=>void 0)}(this._cacheName)}async setTimestamp(e,t){e=K(e);let s={url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)},a=await this.getDb(),r=a.transaction(M,"readwrite",{durability:"relaxed"});await r.store.put(s),await r.done}async getTimestamp(e){let t=await this.getDb(),s=await t.get(M,this._getId(e));return null==s?void 0:s.timestamp}async expireEntries(e,t){let s=await this.getDb(),a=await s.transaction(M).store.index("timestamp").openCursor(null,"prev"),r=[],i=0;for(;a;){let s=a.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&i>=t?r.push(a.value):i++),a=await a.continue()}let n=[];for(let e of r)await s.delete(M,e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+K(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:a,blocking:r,terminated:i}={}){let n=indexedDB.open(e,1),c=U(n);return a&&n.addEventListener("upgradeneeded",e=>{a(U(n.result),e.oldVersion,e.newVersion,U(n.transaction),e)}),s&&n.addEventListener("blocked",e=>s(e.oldVersion,e.newVersion,e)),c.then(e=>{i&&e.addEventListener("close",()=>i()),r&&e.addEventListener("versionchange",e=>r(e.oldVersion,e.newVersion,e))}).catch(()=>{}),c}("workbox-expiration",0,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class W{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new O(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;let e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(let e of t)await s.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,w(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(!this._maxAgeSeconds)return!1;{let t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class j{constructor(e={}){if(this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:a})=>{if(!a)return null;let r=this._isResponseDateFresh(a),i=this._getCacheExpiration(s);w(i.expireEntries());let n=i.updateTimestamp(t.url);if(e)try{e.waitUntil(n)}catch(e){}return r?a:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{let s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError){var t;t=()=>this.deleteCacheAndMetadata(),l.add(t)}}_getCacheExpiration(e){if(e===f.getRuntimeName())throw new o("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new W(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;let t=this._getDateHeaderTimestamp(e);if(null===t)return!0;let s=Date.now();return t>=s-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;let t=e.headers.get("date"),s=new Date(t),a=s.getTime();return isNaN(a)?null:a}async deleteCacheAndMetadata(){for(let[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}function B(e){return"string"==typeof e?new Request(e):e}s(873);class H{constructor(e,t){for(let s of(this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new m,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map,this._plugins))this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,s=B(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){let e=await t.preloadResponse;if(e)return e}let a=this.hasCallback("fetchDidFail")?s.clone():null;try{for(let e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(e){if(e instanceof Error)throw new o("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}let r=s.clone();try{let e;for(let a of(e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions),this.iterateCallbacks("fetchDidSucceed")))e=await a({event:t,request:r,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:a.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){let t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){let t;let s=B(e),{cacheName:a,matchOptions:r}=this._strategy,i=await this.getCacheKey(s,"read"),n=Object.assign(Object.assign({},r),{cacheName:a});for(let e of(t=await caches.match(i,n),this.iterateCallbacks("cachedResponseWillBeUsed")))t=await e({cacheName:a,matchOptions:r,cachedResponse:t,request:i,event:this.event})||void 0;return t}async cachePut(e,t){let s=B(e);await x(0);let a=await this.getCacheKey(s,"write");if(!t)throw new o("cache-put-with-no-response",{url:b(a.url)});let r=await this._ensureResponseSafeToCache(t);if(!r)return!1;let{cacheName:i,matchOptions:n}=this._strategy,c=await self.caches.open(i),l=this.hasCallback("cacheDidUpdate"),h=l?await g(c,a.clone(),["__WB_REVISION__"],n):null;try{await c.put(a,l?r.clone():r)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await y(),e}for(let e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:i,oldResponse:h,newResponse:r.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){let s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(let e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=B(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if("function"==typeof t[e]){let s=this._pluginStateMap.get(t),a=a=>{let r=Object.assign(Object.assign({},a),{state:s});return t[e](r)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(let e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return!s&&t&&200!==t.status&&(t=void 0),t}}class F{constructor(e={}){this.cacheName=f.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,r=new H(this,{event:t,request:s,params:a}),i=this._getResponse(r,s,t),n=this._awaitComplete(i,r,s,t);return[i,n]}async _getResponse(e,t,s){let a;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(!(a=await this._handle(t,e))||"error"===a.type)throw new o("no-response",{url:t.url})}catch(r){if(r instanceof Error){for(let i of e.iterateCallbacks("handlerDidError"))if(a=await i({error:r,event:s,request:t}))break}if(a);else throw r}for(let r of e.iterateCallbacks("handlerWillRespond"))a=await r({event:s,request:t,response:a});return a}async _awaitComplete(e,t,s,a){let r,i;try{r=await e}catch(e){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:r}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:r,error:i}),t.destroy(),i)throw i}}let $={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class G extends F{constructor(e={}){super(e),this.plugins.some(e=>"cacheWillUpdate"in e)||this.plugins.unshift($),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let s;let a=[],r=[];if(this._networkTimeoutSeconds){let{id:i,promise:n}=this._getTimeoutPromise({request:e,logs:a,handler:t});s=i,r.push(n)}let i=this._getNetworkPromise({timeoutId:s,request:e,logs:a,handler:t});r.push(i);let n=await t.waitUntil((async()=>await t.waitUntil(Promise.race(r))||await i)());if(!n)throw new o("no-response",{url:e.url});return n}_getTimeoutPromise({request:e,logs:t,handler:s}){let a;let r=new Promise(t=>{let r=async()=>{t(await s.cacheMatch(e))};a=setTimeout(r,1e3*this._networkTimeoutSeconds)});return{promise:r,id:a}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:a}){let r,i;try{i=await a.fetchAndCachePut(t)}catch(e){e instanceof Error&&(r=e)}return e&&clearTimeout(e),(r||!i)&&(i=await a.cacheMatch(t)),i}}class Q extends F{constructor(e={}){super(e),this.plugins.some(e=>"cacheWillUpdate"in e)||this.plugins.unshift($)}async _handle(e,t){let s;let a=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(a);let r=await t.cacheMatch(e);if(r);else try{r=await a}catch(e){e instanceof Error&&(s=e)}if(!r)throw new o("no-response",{url:e.url,error:s});return r}}s(80);let V=e=>e&&"object"==typeof e?e:{handle:e};class J{constructor(e,t,s="GET"){this.handler=V(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=V(e)}}class z extends J{constructor(e,t,s){let a=({url:t})=>{let s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)};super(a,t,s)}}class X{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){let{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(t=>{"string"==typeof t&&(t=[t]);let s=new Request(...t);return this.handleRequest({request:s,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let s;let a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return;let r=a.origin===location.origin,{params:i,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:a}),c=n&&n.handler,o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;try{s=c.handle({url:a,request:e,event:t,params:i})}catch(e){s=Promise.reject(e)}let l=n&&n.catchHandler;return s instanceof Promise&&(this._catchHandler||l)&&(s=s.catch(async s=>{if(l)try{return await l.handle({url:a,request:e,event:t,params:i})}catch(e){e instanceof Error&&(s=e)}if(this._catchHandler)return this._catchHandler.handle({url:a,request:e,event:t});throw s})),s}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){let r=this._routes.get(s.method)||[];for(let i of r){let r;let n=i.match({url:e,sameOrigin:t,request:s,event:a});if(n)return Array.isArray(r=n)&&0===r.length?r=void 0:n.constructor===Object&&0===Object.keys(n).length?r=void 0:"boolean"==typeof n&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,V(e))}setCatchHandler(e){this._catchHandler=V(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new o("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new o("unregister-route-route-not-registered")}}let Y=()=>(i||((i=new X).addFetchListener(),i.addCacheListener()),i);function Z(e,t,s){let a;if("string"==typeof e){let r=new URL(e,location.href);a=new J(({url:e})=>e.href===r.href,t,s)}else if(e instanceof RegExp)a=new z(e,t,s);else if("function"==typeof e)a=new J(e,t,s);else if(e instanceof J)a=e;else throw new o("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});let r=Y();return r.registerRoute(a),a}s(977);class ee{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){let e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class et{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{let s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}class es extends F{constructor(e={}){e.cacheName=f.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(es.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){let s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;let a=t.params||{};if(this._fallbackToNetwork){let r=a.integrity,i=e.integrity;s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?i||r:void 0})),r&&(!i||i===r)&&"no-cors"!==e.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new o("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();let s=await t.fetch(e),a=await t.cachePut(e,s.clone());if(!a)throw new o("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(let[s,a]of this.plugins.entries())a!==es.copyRedirectedCacheableResponsesPlugin&&(a===es.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(es.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}es.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},es.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await R(e):e};class ea{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new es({cacheName:f.getPrecacheName(e),plugins:[...t,new et({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){let t=[];for(let s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);let{cacheKey:e,url:a}=function(e){if(!e)throw new o("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){let t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}let{revision:t,url:s}=e;if(!s)throw new o("add-to-cache-list-unexpected-type",{entry:e});if(!t){let e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}let a=new URL(s,location.href),r=new URL(s,location.href);return a.searchParams.set("__WB_REVISION__",t),{cacheKey:a.href,url:r.href}}(s),r="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new o("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new o("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,r),t.length>0){let e=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return v(e,async()=>{let t=new ee;for(let[s,a]of(this.strategy.plugins.push(t),this._urlsToCacheKeys)){let t=this._cacheKeysToIntegrities.get(a),r=this._urlsToCacheModes.get(s),i=new Request(s,{integrity:t,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:i,event:e}))}let{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}})}activate(e){return v(e,async()=>{let e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(let r of t)s.has(r.url)||(await e.delete(r),a.push(r.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){let t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){let t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){let e=await self.caches.open(this.strategy.cacheName);return e.match(s)}}createHandlerBoundToURL(e){let t=this.getCacheKeyForURL(e);if(!t)throw new o("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let er=()=>(n||(n=new ea),n);class ei extends J{constructor(e,t){let s=({request:s})=>{let a=e.getURLsToCacheKeys();for(let r of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:r}={}){let i=new URL(e,location.href);i.hash="",yield i.href;let n=function(e,t=[]){for(let s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield n.href,s&&n.pathname.endsWith("/")){let e=new URL(n.href);e.pathname+=s,yield e.href}if(a){let e=new URL(n.href);e.pathname+=".html",yield e.href}if(r){let e=r({url:i});for(let t of e)yield t.href}}(s.url,t)){let t=a.get(r);if(t){let s=e.getIntegrityForCacheKey(t);return{cacheKey:t,integrity:s}}}};super(s,e.strategy)}}let en=async(e,t="-precache-")=>{let s=await self.caches.keys(),a=s.filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(a.map(e=>self.caches.delete(e))),a};function ec(e){let t=er();return t.matchPrecache(e)}self.skipWaiting(),self.addEventListener("activate",()=>self.clients.claim());let eo=[{'revision':'da29936c56648af1506223c0c4e65b54','url':'/_next/static/Qdm9PcwWpigiq3K65Srow/_buildManifest.js'},{'revision':'b6652df95db52feb4daf4eca35380933','url':'/_next/static/Qdm9PcwWpigiq3K65Srow/_ssgManifest.js'},{'revision':'d8925e948ad00b83','url':'/_next/static/chunks/247-d8925e948ad00b83.js'},{'revision':'72a84b277ac0102b','url':'/_next/static/chunks/563.72a84b277ac0102b.js'},{'revision':'c1b1654791a7cb71','url':'/_next/static/chunks/790.c1b1654791a7cb71.js'},{'revision':'af23aed154a782a6','url':'/_next/static/chunks/844.af23aed154a782a6.js'},{'revision':'05eb79b5f9e129a5','url':'/_next/static/chunks/929.05eb79b5f9e129a5.js'},{'revision':'5f602e511cc6d794','url':'/_next/static/chunks/972-5f602e511cc6d794.js'},{'revision':'2c79e2a64abdb08b','url':'/_next/static/chunks/framework-2c79e2a64abdb08b.js'},{'revision':'400e9ac6681c82cc','url':'/_next/static/chunks/main-400e9ac6681c82cc.js'},{'revision':'59c173ce35dc3cf2','url':'/_next/static/chunks/pages/404-59c173ce35dc3cf2.js'},{'revision':'5db750fa995ca75c','url':'/_next/static/chunks/pages/_app-5db750fa995ca75c.js'},{'revision':'8353112a01355ec2','url':'/_next/static/chunks/pages/_error-8353112a01355ec2.js'},{'revision':'83fc688a35ae3606','url':'/_next/static/chunks/pages/fallback-83fc688a35ae3606.js'},{'revision':'847e38a34f9bbf7d','url':'/_next/static/chunks/pages/impressum-847e38a34f9bbf7d.js'},{'revision':'73670da8230d66b8','url':'/_next/static/chunks/pages/index-73670da8230d66b8.js'},{'revision':'b3384bedb22663de','url':'/_next/static/chunks/pages/ingredients-b3384bedb22663de.js'},{'revision':'e75b0b4e51e68959','url':'/_next/static/chunks/pages/more-e75b0b4e51e68959.js'},{'revision':'068550bb93609385','url':'/_next/static/chunks/pages/privacy-policy-068550bb93609385.js'},{'revision':'98db3b564a791b37','url':'/_next/static/chunks/pages/tos-98db3b564a791b37.js'},{'revision':'837c0df77fd5009c9e46d446188ecfd0','url':'/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js'},{'revision':'2b3e4a0faee48032','url':'/_next/static/chunks/webpack-2b3e4a0faee48032.js'},{'revision':'ad9659e0f237c26d','url':'/_next/static/css/ad9659e0f237c26d.css'},{'revision':'a8958d1a','url':'/_next/static/media/Montserrat-Bold.a8958d1a.ttf'},{'revision':'09cae4fd','url':'/_next/static/media/Montserrat-Regular.09cae4fd.ttf'},{'revision':'39bc7b11','url':'/_next/static/media/Montserrat-SemiBold.39bc7b11.ttf'},{'revision':'14d95e2f','url':'/_next/static/media/additional_icons.14d95e2f.eot'},{'revision':'5c265471','url':'/_next/static/media/additional_icons.5c265471.svg'},{'revision':'f4f7e240','url':'/_next/static/media/montserrat-italic.f4f7e240.ttf'},{'revision':'0d1ba41c','url':'/_next/static/media/nutriscore.0d1ba41c.woff2'},{'revision':'b50cb8bb','url':'/_next/static/media/nutriscore.b50cb8bb.svg'},{'revision':'b5ae6a47','url':'/_next/static/media/nutriscore.b5ae6a47.ttf'},{'revision':'c0a4e79b','url':'/_next/static/media/nutriscore.c0a4e79b.eot'},{'revision':'e51a4d8a','url':'/_next/static/media/nutriscore.e51a4d8a.woff'},{'revision':'00a7952f','url':'/_next/static/media/vegancheckicons.00a7952f.ttf'},{'revision':'683ffe4a','url':'/_next/static/media/vegancheckicons.683ffe4a.woff'},{'revision':'79fa926a','url':'/_next/static/media/vegancheckicons.79fa926a.woff2'},{'revision':'a3e1fe21','url':'/_next/static/media/vegancheckicons.a3e1fe21.svg'},{'revision':'ffc017e0','url':'/_next/static/media/vegancheckicons.ffc017e0.eot'},{'revision':'e99cdef28658360a292287482fd6c7d4','url':'/favicon.ico'},{'revision':'bddc3af0e8af4d6f3b29b05349f3b428','url':'/img/Hero.png'},{'revision':'966773465f8fde8fa21f777b3240cd39','url':'/img/Hero.svg'},{'revision':'28916057901f31c6362afbb210d807b8','url':'/img/VeganCheck.svg'},{'revision':'8d6732374aa92f42255c94e10f2b438b','url':'/img/VeganCheck_text.svg'},{'revision':'a1c8fc01ef6a0c2766d4fe93734afcdd','url':'/img/app_icon.afdesign'},{'revision':'e070367d4e5951defa78d924a9243ca4','url':'/img/computed_image.svg'},{'revision':'1013a162e73d36bc753c6ea8eab8f936','url':'/img/demo.gif'},{'revision':'1d972615e27e1cd32162635e4e801ee4','url':'/img/demo_new.gif'},{'revision':'4f09cad884cbcdc9e51fb7f7b8c381c4','url':'/img/donate_img.svg'},{'revision':'e99cdef28658360a292287482fd6c7d4','url':'/img/favicon.ico'},{'revision':'8d9a5efff74916e0dde541366a98120d','url':'/img/follow_img.svg'},{'revision':'9d8a77ac7fdc1e485f7abb09953ec9eb','url':'/img/grade_img.svg'},{'revision':'7df0872acb0bbf3df309d0549ad4cb2e','url':'/img/greenhosted.svg'},{'revision':'fcd03ad36f2c9390ff80bd068a43b626','url':'/img/hero_icon.png'},{'revision':'e130562e5a290b16600f67d5001aa482','url':'/img/icon-1024x1024.png'},{'revision':'d1aa77ef81e81b4e427b397bdbbeefe9','url':'/img/icon-192x192.png'},{'revision':'0cadaaec8fcb8b82d0531ad59e33e47d','url':'/img/icon-256x256.png'},{'revision':'85981c0709204cfc94b4b0cfec97147b','url':'/img/icon-512x512.png'},{'revision':'94c01663e017266d3d631d71b2320b2b','url':'/img/icon.png'},{'revision':'30fa2a62ae0414ab8ddd10ce3aa5d064','url':'/img/license_img.svg'},{'revision':'f570855a20a9780bdfc4b3d225ae75d0','url':'/img/manifest.webmanifest'},{'revision':'85981c0709204cfc94b4b0cfec97147b','url':'/img/maskable_icon.png'},{'revision':'d42e5ec6ba16d68a29b10b2d865b4458','url':'/img/nutriscore_image.svg'},{'revision':'515c03d151542db92f900be4dddac87f','url':'/img/opensource.svg'},{'revision':'e0ea4f21479072a1e88f3d29ef99d3e2','url':'/img/palmoil_img.svg'},{'revision':'3a7135d647202ce4caf3f6f28f4b48fc','url':'/img/pml.svg'},{'revision':'12ff17091c25c5cd4e9ca07199a910ce','url':'/img/pwa_share.svg'},{'revision':'44f95c80ef0d3723a02cb262fba61106','url':'/img/pwainstall_img.svg'},{'revision':'43c0063d0d95360f94ca1cc5685e543f','url':'/img/rotatedevice.svg'},{'revision':'7c90fdfcfe585b676dd85dcd54671241','url':'/img/safari-pinned-tab.svg'},{'revision':'d230a25cb974f8908871af04caad89a1','url':'/img/shortcuts.png'},{'revision':'ff61cc8bc361de7e361d2a00d50c9a61','url':'/img/shortcuts.svg'},{'revision':'3a47be31dd919d1b995f3e86a7fa7cd4','url':'/img/site.webmanifest'},{'revision':'1eea4fe33ae13db1d79181f8e28a683b','url':'/img/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png'},{'revision':'5d4ff9c1b42fcf518a6d762f052284de','url':'/img/splash_screens/iPhone_11__iPhone_XR_portrait.png'},{'revision':'34b3201788a1cb08e8a2d33920dc5aee','url':'/img/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png'},{'revision':'a6f0b4de7f26af96ccbff6f13d626568','url':'/img/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png'},{'revision':'329bf08b3191331bb433f0fabd72c8bf','url':'/img/splash_screens/iPhone_14_Pro_Max_portrait.png'},{'revision':'1b176c8c13e39afa6e5b910c4c97fccc','url':'/img/splash_screens/iPhone_14_Pro_portrait.png'},{'revision':'b059e86f727e0948be41a73bfaca4b8f','url':'/img/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png'},{'revision':'4c636db0ecc9b330aeaf87d5d7ec4cb2','url':'/img/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png'},{'revision':'451589bd32fb4ad5ad231c769ddcc020','url':'/img/treelabel.svg'},{'revision':'6e184311ed7f70fcabe96880a05b4ec4','url':'/img/veganuary.svg'},{'revision':'1e1d0481587e07eaf9c763e37854549a','url':'/manifest.json'},{'revision':'208610721cebc91c197769b3bc90ad80','url':'/sw.js'}];eo.push({url:"en/fallback",revision:"1234567890"}),function(e){let t=er();t.precache(e)}(eo),function(e){let t=er(),s=new ei(t,e);Z(s)}(void 0),self.addEventListener("activate",e=>{let t=f.getPrecacheName();e.waitUntil(en(t).then(e=>{}))}),Z("/",new G({cacheName:"start-url",plugins:[new j({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),Z(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new Q({cacheName:"static-font-assets",plugins:[new j({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),Z(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new class extends F{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let s,a;try{let a=[t.fetch(e)];if(this._networkTimeoutSeconds){let e=x(1e3*this._networkTimeoutSeconds);a.push(e)}if(!(s=await Promise.race(a)))throw Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(e){e instanceof Error&&(a=e)}if(!s)throw new o("no-response",{url:e.url,error:a});return s}}({cacheName:"static-image-assets",plugins:[new j({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),Z(/\.(?:js)$/i,new Q({cacheName:"static-js-assets",plugins:[new j({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),Z(/\.(?:css|scss)$/i,new Q({cacheName:"static-style-assets",plugins:[new j({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),Z(/\.(?:json|xml|csv)$/i,new G({cacheName:"static-data-assets",plugins:[new j({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),Z(/.*/i,new G({cacheName:"others",networkTimeoutSeconds:10,plugins:[new j({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),function(e){let t=Y();t.setDefaultHandler(e)}(new Q),function(e){let t=Y();t.setCatchHandler(e)}(e=>{let{event:t}=e;switch(t.request.destination){case"document":return ec("en/fallback");case"image":return ec("/static/images/fallback.png");default:return Response.error()}})}()}();