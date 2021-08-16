/**
 * "Service Workers"  enables applications to control network requests, 
 * cache those requests to improve performance, and provide offline access
 *  to cached content.
*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js');

// Switch debug logging on/off here. Default is on in dev and off in prod.
workbox.setConfig({ debug: false });

// This clientsClaim() should be at the top level
// of your service worker, not inside of, e.g.,
// an event handler.
workbox.core.clientsClaim();

/**
 * We are not wrapping it in a 'message' event as per the new update.
 * @see https://developers.google.com/web/tools/workbox/modules/workbox-core
 */
self.skipWaiting();

/**
* Enable navigation preload.
*/

workbox.navigationPreload.enable();

/**
 * Use a stale-while-revalidate strategy for third party requests eg. mopinion and type kit.
 */
const matchCb = ({ url }) => {
    return (url.href.indexOf('mopinion') > 0 || url.href.indexOf('typekit') > 0);
};
workbox.routing.registerRoute(
    matchCb,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'waters_third_party',
    })
);