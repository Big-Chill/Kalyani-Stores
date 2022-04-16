import React,{useState,useEffect,createContext} from 'react';
import {auth} from '../Firebase';
import {RecaptchaVerifier, GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";


export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const[user,setUser]=useState("");
    const provider = new GoogleAuthProvider();

    const SignUp=(email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password);
    }

    const Login=(email,passowrd)=>{
        return auth.signInWithEmailAndPassword(email,passowrd);
    }

    const Logout=()=>{
        return auth.signOut();
    }

    const PhoneLogin=(phoneNumber)=>{
        const captcha=new RecaptchaVerifier('recaptcha-container', {}, auth);
        captcha.render();
        return auth.signInWithPhoneNumber(phoneNumber,captcha);
    }

    const GoogleLogin=()=>{
        return signInWithPopup(auth,provider);
    }

    const verifyEmail=()=>{
        return sendEmailVerification(auth.currentUser);
    }

    const resetEmail=(email)=>{
        return sendPasswordResetEmail(auth,email);
    }

    
    useEffect(()=>{
        const unsub=auth.onAuthStateChanged(user=>{setUser(user)});
        
        return()=>{
            unsub();
        }
    })

    return(
        <AuthContext.Provider value={{user,SignUp,Login,Logout,PhoneLogin,GoogleLogin,verifyEmail,resetEmail}}>
            {children}
        </AuthContext.Provider>
    )
}