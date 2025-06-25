import { firebase } from "@/firebase/config";
import { defineMiddleware } from "astro:middleware";

// export const prerender = false

const privateRoutes = ["/protected"];
const noAuthenticatedRoutes = ["/login", "/register"];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({url, request, locals, redirect}, next) => {

    const isLoggedIn = !!firebase.auth.currentUser;

    const user = firebase.auth.currentUser;

    if(user){
        locals.user = {
            avatar: user.photoURL ?? '',
            name: user.displayName ?? '',
            email: user.email ?? '',
            emailVerified: user.emailVerified
        }
    }

    locals.isLoggedIn = isLoggedIn;

    if(!isLoggedIn && privateRoutes.includes(url.pathname)){
        return redirect('/');
    }
    
    if(isLoggedIn && noAuthenticatedRoutes.includes(url.pathname)){
        return redirect('/')
    }

    return next();
});
   