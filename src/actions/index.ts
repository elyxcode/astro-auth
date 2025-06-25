import { loginUser, loginWithGoogle, logoutUser, registerUser } from "./auth";


export const server = {
    registerUser,
    logoutUser,
    loginUser,
    loginWithGoogle,
}