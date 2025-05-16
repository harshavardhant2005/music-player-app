import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { NavLink, useNavigate } from "react-router-dom"
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import Spinner from "../../utilities/Spinner";

let Register = ()=>{
    let [isLoading , setIsloading]= useState(false);
    let navigate= useNavigate();
 
    let [passwordEye , setPasswordEye]= useState(false);
    let [confirmPasswordEye , setconfirmPasswordEye]= useState(false);

    let initialUserData = {
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    }
    let [userData, setUserData] = useState(initialUserData);

    let {username , email , password , confirmPassword}= userData;

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
   
    // ? npm install react-hot-toast
   if(password==confirmPassword){
    setIsloading(true);
    try {
        let registerData =  await createUserWithEmailAndPassword(__AUTH,email, password)

        toast.success("user Registered Successfully")

      await  sendEmailVerification(registerData.user)
      toast.success(`Email verification link has been sent to ${email}`);



      updateProfile(registerData.user ,{
        displayName:username,
        photoURL:"https://i.ibb.co/fdjdkDLz/user-White.png"
      } )

      navigate("/login")

        setUserData(initialUserData)
        console.log(registerData);
       
          
      } catch (error) {
        toast.error(error.message)
         
      }finally{
        setIsloading(false)
      }
   }else{
    toast.error("Password mismatch")
   }
   



   
    
}



    return <section className="h-[calc(100vh-70px)] w-[100%] flex justify-center items-center">
        <article className=" w-[27%] bg-slate-700 py-4 px-6 rounded-md">
            <header><h1 className="text-center text-[24px]
            font-semibold">Register</h1></header>
            <main>
                <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
                    <div>
                        <label htmlFor="username" className="block py-1">Name</label>
                        <input type="text" placeholder="Enter your name" name="username" 
                        value={username}
                        required
                        onChange={handleInputChange}
                        className="outline-none border-1 w-[100%] rounded-md pl-2 py-1" />
                    </div>
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
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block py-1">Confirm Password</label>
                        <input type={confirmPasswordEye?"text":"password"} 
                        required
                        value={confirmPassword}
                        placeholder="Confirm your 
                        password" name="confirmPassword" 
                        onChange={handleInputChange}className="outline-none border-1 w-[100%] rounded-md pl-2 py-1" />

                        <span onClick={()=>setconfirmPasswordEye(!confirmPasswordEye)} className="absolute right-[15px] top-[39px] text-[20px]">
                        {confirmPasswordEye ? <IoMdEyeOff />:<IoMdEye />
                      }
                        </span>
                    </div>
                    <div className="mt-3">
                        <button className="bg-blue-600 w-[100%] py-2 rounded-md cursor-pointer hover:bg-blue-800">Register</button>
                    </div>

                    <div className="flex justify-center">
                        <NavLink to={"/login"}>Already have an account ?</NavLink>
                    </div>
                </form>
            </main>
        </article>
       {isLoading && <Spinner/> }
    </section>
}
export default Register