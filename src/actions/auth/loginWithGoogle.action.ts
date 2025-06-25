import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async (credentials) => {
        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if(!credential){
            console.log(credential)
            throw new Error('google sign-in fail')
        }
        
        await signInWithCredential(firebase.auth, credential);

        return { ok: true }
    }
});