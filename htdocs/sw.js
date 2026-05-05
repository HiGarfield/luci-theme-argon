var CACHE_NAME = 'argon-v1';
var STATIC_ASSETS = [
    '/luci-static/argon/css/cascade.css',
    '/luci-static/argon/css/fonts.css',
    '/luci-static/argon/css/pure-min.css',
    '/luci-static/argon/js/jquery.min.js',
    '/luci-static/argon/js/menu-argon.js',
    '/luci-static/argon/js/sidebar-argon.js',
    '/luci-static/argon/js/styles-argon.js',
    '/luci-static/argon/js/color_calc-argon.js',
    '/luci-static/argon/fonts/argon.ttf',
    '/luci-static/argon/fonts/argon.woff',
    '/luci-static/argon/img/argon.svg',
    '/luci-static/argon/img/blank.png',
    '/luci-static/argon/img/trafficbar.png',
    '/luci-static/argon/img/volume_high.svg',
    '/luci-static/argon/img/volume_off.svg'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(STATIC_ASSETS);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (key) {
                    return key !== CACHE_NAME;
                }).map(function (key) {
                    return caches.delete(key);
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function (event) {
    var url = new URL(event.request.url);
    if (url.pathname.indexOf('/luci-static/argon/') === 0) {
        event.respondWith(
            caches.match(event.request).then(function (cached) {
                if (cached) {
                    return cached;
                }
                return fetch(event.request).then(function (response) {
                    if (response && response.ok) {
                        var clone = response.clone();
                        caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(event.request, clone);
                        });
                    }
                    return response;
                }).catch(function () {
                    return new Response('', { status: 503, statusText: 'Service Unavailable' });
                });
            })
        );
    }
});
