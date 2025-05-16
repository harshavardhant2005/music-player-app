import React, { useContext } from 'react'
import { AuthContextAPI } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { UserContextAPI } from '../../context/UserContext';
import { FaUserEdit } from 'react-icons/fa';

const MyAccount = () => {

  let {authUser} = useContext(AuthContextAPI);
  let {userDataFromDB} = useContext(UserContextAPI);
  console.log(userDataFromDB);
  
  let data = useContext(UserContextAPI);
  console.log(data);
  

  return (
    <section className='h-[100%] w-[100%] flex justify-center items-center'>
      <article className=' h-[420px] w-[50%]  bg-slate-800 rounded-md'>
     <header className='  h-[120px] w-[95%] mt-3 m-auto bg-slate-700 rounded-md relative'>
      <picture className='absolute top-[-55px] left-[220px]'>
        <img src={authUser?.photoURL} alt="" className='h-[100px] w-[100px] rounded-full border' />
      </picture>

      <p className='flex flex-col gap-1 items-center pt-14'>
        <span>{authUser?.displayName}</span>
        <span>{authUser?.email}</span>
      </p>

     </header>

 <main >
  {userDataFromDB == null? <div className='h-full  w-[100%]  flex flex-col items-center gap-2 mt-4'>
    <picture>
      <img src="https://i.ibb.co/0j5wgtMv/person.png"
      className='h-[200px]' alt="" />
    </picture>

   <NavLink to={"/user-profile/add-profile"}><button className='bg-blue-600 py-2 px-10 rounded-md hover:bg-blue-800 cursor-pointer'>Add Profile</button></NavLink>
  </div>:
  
  <section className='h-[290px] w-full py-2 px-4 '>
    <header className='flex items-center justify-between'><h1 className='text-[24px] font-semibold'>Personal Details</h1> <NavLink to={"/user-profile/add-profile"} state={userDataFromDB}><span className='text-[24px]'><FaUserEdit />
    </span></NavLink></header>
    <article className='flex gap-y-4 gap-x-6 mt-2 flex-wrap'>
      <div className='flex flex-col bg-slate-700 py-1 px-2 rounded-md w-[46%]'>
        <span className='text-[18px] font-semibold'>Dob</span>
        <span>{userDataFromDB?.dob}</span>

      </div>
      <div className='flex flex-col bg-slate-700 py-1 px-2 rounded-md w-[48%]'>
        <span className='text-[18px] font-semibold'>Contact</span>
        <span>{userDataFromDB?.contact}</span>

      </div>

      {/* second row div */}

      <div className='flex flex-col bg-slate-700 py-1 px-2 rounded-md w-[46%]'>
        <span className='text-[18px] font-semibold'>Gender</span>
        <span>{userDataFromDB?.gender}</span>

      </div>
      <div className='flex flex-col bg-slate-700 py-1 px-2 rounded-md w-[48%]'>
        <span className='text-[18px] font-semibold'>Languages</span>
        <span>{userDataFromDB?.languages}</span>

      </div>
      <div className='flex flex-col bg-slate-700 py-1 px-2 rounded-md w-[99%]'>
        <span className='text-[18px] font-semibold'>Address</span>
        <span>{userDataFromDB?.address}</span>

      </div>
    </article>

  </section>
  
  }
 </main>

      </article>
    </section>
  )
}

export default MyAccount
