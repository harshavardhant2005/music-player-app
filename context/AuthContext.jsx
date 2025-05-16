import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { __AUTH } from "../backend/firebase";


export let AuthContextAPI = createContext();

let AuthContext = ({children})=>{

    let [authUser , setAuthuser]= useState(null);

    useEffect(()=>{
    onAuthStateChanged(__AUTH, (user)=>{
        console.log(user);
        
if(user?.emailVerified && user?.accessToken){
    setAuthuser(user);
    window.localStorage.setItem("TOKEN", user?.accessToken);
}else{
    setAuthuser(null)
    window.localStorage.clear()
}

    })
    },[])



    return <AuthContextAPI.Provider value={{authUser , setAuthuser}}>
{children}
    </AuthContextAPI.Provider>
} 
export default AuthContext