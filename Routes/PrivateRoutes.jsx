import React, { useContext } from 'react'
import { AuthContextAPI } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    let {authUser}= useContext(AuthContextAPI);
    if(authUser ==null){
        return <Navigate to={"/login"}/>
    }else{
return <>{children}</>
    }
 
}

export default PrivateRoutes
