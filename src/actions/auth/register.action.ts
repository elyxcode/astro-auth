import { firebase } from "@/firebase/config";
import { saveCookies } from "@/helpers/saveCookies";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth";

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ name, email, password, remember_me }, { cookies }) => {

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
            const {user} = await createUserWithEmailAndPassword(firebase.auth, email, password);

            // if(firebase.auth.currentUser){
            //     throw new Error('no user available')
            // }

            // show display name
            updateProfile(firebase.auth.currentUser!, {
                displayName: name
            });

            // verify email
            await sendEmailVerification(firebase.auth.currentUser!, {
                // url: `http://localhost:4321/protected?emailVerified=true`
                url: `${import.meta.env.WEB_URL}/protected?emailVerified=true`
            })

            
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