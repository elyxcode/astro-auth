import { firebase } from "@/firebase/config";
import { saveCookies } from "@/helpers/saveCookies";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const loginUser = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string(),
        password: z.string(),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ email, password, remember_me}, { cookies }) => {
        // if(remember_me){
        //     cookies.set('email', email, {
        //         expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
        //         path: '/'
        //     });
        // } else {
        //     cookies.delete('email' , {
        //         path: '/'
        //     });
        // }

        saveCookies(!!remember_me, cookies, email)

        try {
            const {user} = await signInWithEmailAndPassword(firebase.auth, email, password);
            
            return {
                id: user.uid,
                email: user.email,
            }

        } catch (error) {

            console.log(error)
            const firebaseError = error as AuthError;

            if(firebaseError.code === 'auth/email-already-in-use'){
                throw new Error('email already used');
            }

            throw new Error('Something went wrong!');
        }
    }
});