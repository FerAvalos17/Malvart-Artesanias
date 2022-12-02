const CACHE ='cache-2';
const CACHE_DINAMICO = 'dinamico-1';
const CACHE_INMUTABLE = 'inmutable-1';


self.addEventListener('install',evento=>{
    const promesa=caches.open(CACHE)
        .then(cache=>{
            return cache.addAll([
            // '/',
                'index.html',
                'categories.html',
                'contact.html',
                'nosotros2.html',
                'styles/bootstrap4/bootstrap.min.css',
                'styles/bootstrap4/bootstrap.min.js',
                'styles/bootstrap4/popper.js',
                'styles/categories_responsive.css',
                'styles/londinium-theme.css',
                'styles/styles.css',
                'styles/icons.css',
                'styles/googleapi.css',
                'styles/categories.css',
                'styles/contact_responsive.css',
                'styles/contact.css',
                'styles/product_responsive.css',
                'styles/product.css',
                'styles/responsive.css',
                'styles/main_styles.css',
                'images/categories.jpg',
                'images/imagen1.jpg',
                'images/product_1.jpg',
                'images/product_2.jpg',
                'images/product_3.jpeg',
                'images/product_4.jpeg',
                'images/product_5.jpeg',
                'images/product_6.jpeg',
                'images/product_7.jpg',
                'images/product_8.jpeg',
                'images/product_9.jpg',
                'images/product_10.jpeg',
                'images/product_11.jpeg',
                'images/product_12.jpeg',
                'images/promo_1.jpeg',
                'images/promo_2.jpg',
                'images/promo_3.jpg',
                'images/sidebar_4.jpg',
                'images/testimonials.jpg',
                'images/testimonio.jpg',
                'images/testimonio_3.jpg',
                'images/newsletter.jpg',
                'images/newsletter.jpeg',
                'images/newsletter1.jpg',
                'images/newsletter2.jpg',
                'images/newsletter3.jpg',
                'images/extra_1.jpg',
                'images/extra_2.jpeg',
                'images/gallery.jpg',
                'images/gallery_1.jpeg',
                'images/gallery_2.jpeg',
                'images/gallery_3.jpeg',
                'images/gallery_3.jpg',
                'images/gallery_4.jpeg',
                'images/gallery_5.jpeg',
                'images/gallery_6.jpeg',
                'images/gomitas.jpeg',
                'pages/offline.html',
                'images/offline.jpg',
                'js/app.js'
            ]);
        });
    const cacheInmutable = caches.open(CACHE_INMUTABLE)
        .then(cache=>{
        cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        });
        
        //Indicamos que la instalación espere hasta que las promesas se cumplan
        evento.waitUntil(Promise.all([promesa, cacheInmutable]));
       });

    self.addEventListener('activate', evento=>{
        const respuesta=caches.keys().then(keys=>{
            keys.forEach(key =>{
                if(key !== CACHE && key.includes('cache')){
                    return caches.delete(key);
            }
        });
    });
    evento.waitUntil(respuesta);
});
       
    self.addEventListener('fetch', evento =>{
        //Estrategia 2 CACHE WITH NETWORK FALLBACK
    const respuesta=caches.match(evento.request)
        .then(res=>{
        //si el archivo existe en cache retornalo
        if (res) return res;
        //si no existe deberá ir a la web
        //Imprimos en consola para saber que no se encontro en cache
        console.log('No existe', evento.request.url);
        
        //Procesamos la respuesta a la petición localizada en la web
        return fetch(evento.request)
        .then(resWeb=>{//el archivo recuperado se almacena en resWeb
        //se abre nuestro cache
        caches.open(CACHE_DINAMICO)
        .then(cache=>{
        //se sube el archivo descargado de la web
            cache.put(evento.request,resWeb);
        //Mandamos llamar la limpieza al cargar un nuevo archivo
       //estamos indicando que se limpiará el cache dinamico y que 
       //solo debe haber 2 archivos
        limpiarCache(CACHE_DINAMICO,100);
        })
        //se retorna el archivo recuperado para visualizar la página
            return resWeb.clone(); 
        });
    })
        .catch(err => {
        //si ocurre un error, en nuestro caso no hay conexión
            if(evento.request.headers.get('accept').includes('text/html')){
            //si lo que se pide es un archivo html muestra nuestra página offline que esta en cache
            return caches.match('/pages/offline.html');
            }
    });
            evento.respondWith(respuesta); 
    });
            //recibimos el nombre del espacio de cache a limpiar y el número de archivos permitido
            function limpiarCache(nombreCache, numeroItems){
        //abrimos el cache
        caches.open(nombreCache)
        .then(cache=>{
    //recuperamos el arreglo de archivos existentes en el espacio de cache
        return cache.keys()
        .then(keys=>{
        //si el número de archivos supera el limite permitido
        if (keys.length>numeroItems){
    //eliminamos el más antiguo y repetimos el proceso
        cache.delete(keys[0])
        .then(limpiarCache(nombreCache, numeroItems));
        }
        });
    });
}
   