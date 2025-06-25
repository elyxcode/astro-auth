// archivo no funciona por el nombre del archivo

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

// export const prerender = false

const privateRoutes = ["/protected"];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({url, request}, next) => {

    const authHeaders = request.headers.get('authorization') ?? '';

    if(privateRoutes.includes(url.pathname)){
        return checkLocalauth(authHeaders, next)
    }

    return next();
});


const checkLocalauth = (authHeaders: string, next: MiddlewareNext) => {
    if(authHeaders){
        const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass';
        const decodedValue = atob(authValue).split(':');

        const [user, password] = decodedValue;

        if(user === 'admin' && password === 'admin'){
            return next();
        }
        
    }

    return new Response('auth required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic real="Secure Area"'
        }
    })
}   