import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useState } from "react"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { NavLink, useNavigate } from "react-router-dom"
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import Spinner from "../../utilities/Spinner";
import { AuthContextAPI } from "../../context/AuthContext";

let Login = ()=>{
    let [isLoading , setIsloading]= useState(false);

    let {setAuthuser}= useContext(AuthContextAPI);
 
    let [passwordEye , setPasswordEye]= useState(false);
    let navigate = useNavigate();


    let initialUserData = {
      
        email:"",
        password:"",
    
    }
    let [userData, setUserData] = useState(initialUserData);

    let { email , password }= userData;

let handleInputChange = (e)=>{
    let {name , value}= e.target;
    // console.log(name , value);
    setUserData({
        ...userData , [name]:value
    })
    
}

let handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(userData);

    try {
        setIsloading(true);

     let loginData =  await signInWithEmailAndPassword(__AUTH ,email ,password);
     console.log(loginData);

     if(loginData?.user?.emailVerified){
        toast.success("Logged in Successfully")
        setAuthuser(loginData?.user)

        navigate("/");
     }
     else{
        toast.error("Verify your email !!")
     }
      
    } catch (error) {
        toast.error(error.message)
        
    }finally{
        setIsloading(false);
    }
   
    
}



    return <section className="h-[calc(100vh-70px)] w-[100%] flex justify-center items-center">
        <article className=" w-[27%] bg-slate-700 py-4 px-6 rounded-md">
            <header><h1 className="text-center text-[24px]
            font-semibold">Login</h1></header>
            <main>
                <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
                   
                    <div>
                        <label htmlFor="email" className="block py-1">Email</label>
                        <input type="email" placeholder="Enter your email" name="email" 
                        value={email}
                        required
                        onChange={handleInputChange}className="outline-none border-1 w-[100%] rounded-md pl-2 py-1" />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block py-1">Password</label>
                        <input type={passwordEye?"text":"password"}
                        required 
                        value={password}
                        placeholder="Enter your password" name="password" 
                        onChange={handleInputChange}className="outline-none border-1 w-[100%] rounded-md pl-2 py-1" />

                        <span onClick={()=>setPasswordEye(!passwordEye)} className="absolute right-[15px] top-[39px] text-[20px]">
                        {passwordEye ? <IoMdEyeOff />:<IoMdEye />
                      }
                        </span>
                    </div>
                    
                    <div className="mt-3">
                        <button className="bg-blue-600 w-[100%] py-2 rounded-md cursor-pointer hover:bg-blue-800">Login</button>
                    </div>

                    <div className="flex flex-col items-center">
                        <NavLink to={"/register"}>Don't have an account ?</NavLink>
                        <NavLink to={"/reset-password"}>Forget Password ?</NavLink>
                    </div>
                </form>
            </main>
        </article>
       {isLoading && <Spinner/> }
    </section>
}
export default Login