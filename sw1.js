const CACHE ='cache-1';
const CACHE_DINAMICO = 'dinamico-1';
const CACHE_ESTATICO = 'estatico-1';
const CACHE_INMUTABLE = 'inmutable-1';


self.addEventListener('install',evento=>{
    const promesa=caches.open(CACHE)
        .then(cache=>{
            return cache.addAll([
                '/',
                '/index.html',
                '/categories.html',
                '/contact.html',
                '/nosotros2.html',
                '/styles/bootstrap4/bootstrap.min.css',
                '/styles/bootstrap4/bootstrap.min.js',
                '/styles/bootstrap4/popper.js',
                '/styles/categories_responsive.css',
                '/styles/categories.css',
                '/styles/contact_responsive.css',
                '/styles/contact.css',
                '/styles/product_responsive.css',
                '/styles/product.css',
                '/styles/responsive.css',
                '/styles/main_styles.css',
                '/images/categories.jpg',
                '/images/product_1.jpg',
                '/images/product_2.jpg',
                '/images/product_3.jpeg',
                '/images/product_4.jpeg',
                '/images/product_5.jpeg',
                '/images/product_6.jpeg',
                '/images/product_8.jpeg',
                '/images/product_9.jpg',
                '/images/product_10.jpeg',
                '/images/product_11.jpeg',
                '/images/product_12.jpeg',
                '/images/promo_1.jpeg',
                '/images/promo_2.jpg',
                '/images/promo_3.jpg',
                '/images/testimonials.jpg',
                '/images/testimonio.jpg',
                '/images/testimonio_3.jpg',
                '/images/newsletter.jpg',
                '/images/newsletter.jpeg',
                '/images/newsletter1.jpg',
                '/images/newsletter2.jpg',
                '/images/newsletter3.jpeg',
                '/images/extra_1.jpg',
                '/images/extra_2.jpeg',
                '/images/gallery.jpg',
                '/images/gallery_1.jpeg',
                '/images/gallery_2.jpeg',
                '/images/gallery_3.jpeg',
                '/images/gallery_3.jpg',
                '/images/gallery_4.jpeg',
                '/images/gallery_5.jpeg',
                '/images/gallery_6.jpeg',
                '/images/gomitas.jpeg',
                '/js/app.js'
            ]);
        });
        const cacheInmutable = caches.open(CACHE_INMUTABLE,70)
        .then(cache=>{
            cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        });
        evento.waitUntil(Promise.all([promesa, cacheInmutable]));

    });

    self.addEventListener('fetch',evento=>{

        const respuesta=caches.open(CACHE)
            .then (cache=>{
                fetch(evento.request)
                    .then(resp=>{
                        cache.put(evento.request,resp);
                        
                    });
                return cache.match(evento.request);
            });

           
            if (evento.request.url.includes('bootstrap')){
                evento.respondWith(caches.match(evento.request));
            }

            evento.respondWith(respuesta);
});

        function limpiarCache(nombreCache, numeroItems){
            caches.open(nombreCache)
            .then(cache=>{
                return cache.keys()
                .then(keys=>{
                if (keys.length>numeroItems){
                    cache.delete(keys[0])
                    .then(limpiarCache(nombreCache, numeroItems));
                }
        });
    });
}
