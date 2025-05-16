import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextAPI } from "./AuthContext";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { __DB } from "../backend/firebase";


export let UserContextAPI = createContext(null);

let UserContext  = ({children})=>{
    let {authUser} = useContext(AuthContextAPI);
    console.log(authUser);
    

    let [userDataFromDB , setUserDataFromDB]= useState(null);

    let fetchDataFromDB = async()=>{
     
        console.log(userDataFromDB);
        
        

        if(authUser !=null){
           
            
            try {
                
                let userDataRefrence = doc(__DB ,"user_profile" , authUser?.uid );
                
                onSnapshot(userDataRefrence , (user)=>{

                    if(user.exists){
                        setUserDataFromDB(user?.data())

                        // console.log(user?.data());
                        
                    }

                });

            } catch (error) {
                toast.error(error.message)
                console.log(error);
                
            }
        }


    }

    useEffect(()=>{
fetchDataFromDB()
    },[authUser])

    return <UserContextAPI.Provider value={{userDataFromDB}}>
        {children}

    </UserContextAPI.Provider>


}
export default UserContext