import type { AstroCookies } from "astro";

export const saveCookies = (remember_me: boolean, cookies: AstroCookies, email: string) => {
    if(remember_me){
        cookies.set('email', email, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
            path: '/'
        });
    } else {
        cookies.delete('email' , {
            path: '/'
        });
    }
} 