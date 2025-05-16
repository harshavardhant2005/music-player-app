import React from 'react'
import { FaLock, FaUser } from 'react-icons/fa'
import { ImFilePicture } from 'react-icons/im'
import { MdAccountBalanceWallet, MdDeleteForever } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const UserSideBar = () => {
  return (
    <section className='p-7'>
     <article>
      <ul className='flex flex-col gap-4'>
        <li><NavLink end to={"/user-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><MdAccountBalanceWallet /></span><span>My account</span></NavLink></li>

        <li><NavLink to={"update-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><ImFilePicture /></span><span>Update Profile</span></NavLink></li>

        <li><NavLink to={"add-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><FaUser /></span><span>Add Profile</span></NavLink></li>

        <li><NavLink to={"update-password"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><FaLock /></span><span>Update Password</span></NavLink></li>

        <li><NavLink to={"delete-account"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><MdDeleteForever /></span><span>Delete Account</span></NavLink></li>
      </ul>
     </article>
    </section>
  )
}

export default UserSideBar
