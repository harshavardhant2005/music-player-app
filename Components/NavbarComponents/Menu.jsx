import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContextAPI } from "../../context/AuthContext"
import { signOut } from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import { UserContextAPI } from "../../context/UserContext";


let Menu = ()=>{
    let {authUser , setAuthuser } = useContext(AuthContextAPI);
     let {userDataFromDB}=useContext(UserContextAPI);
  console.log(userDataFromDB);
  
    
    let navigate = useNavigate();
    let handleLogout = async ()=>{
      try {
       await signOut(__AUTH)
       setAuthuser(null)
       window.localStorage.clear()
       toast.success("Logout Successfully");
       navigate("/")

      } catch (error) {
        toast.error(error.message)
      }
        
    }
  
    

    return <aside className="">

        <ul className="flex gap-4 items-center ">
       
            <li><NavLink to={"/"}  className={({isActive})=>`${isActive && "bg-blue-600"} px-4 py-2 rounded-md`}
              
            >Home</NavLink></li>

            {authUser ==null ? <>
                <li><NavLink to={"register"} className={({isActive})=>`${isActive && "bg-blue-600"} px-4 py-2 rounded-md`}
              
              >Register</NavLink></li>
              <li><NavLink to={"login"} className={({isActive})=>`${isActive && "bg-blue-600"} px-4 py-2 rounded-md`}
                >Login</NavLink></li>
            </>:<>
            <li><NavLink  onClick={handleLogout} className={"px-4 py-2 "}
              
              >Logout</NavLink></li>
              <li><NavLink to={"/user-profile"} >
                <picture>
                    <img src={authUser?.photoURL} alt="" className="h-[35px] w-[35px] rounded-full" />
                </picture>
                </NavLink></li>
            </>

            }

            
          
        </ul>
    </aside>
}

export default Menu