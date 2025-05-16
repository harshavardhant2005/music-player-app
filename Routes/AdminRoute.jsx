import React, { useContext, useEffect } from 'react'

import { Navigate } from 'react-router-dom';
import { UserContextAPI } from '../context/UserContext';



const AdminRoute = ({children}) => {

 let {userDataFromDB}=useContext(UserContextAPI);

    console.log("data from admin route",userDataFromDB);
    

    if(userDataFromDB?.role ==="admin"){
        
return <>{children}</>
    }else{
        
        return <Navigate to={"/user-profile"}/>
    }

}

export default AdminRoute
