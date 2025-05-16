import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FaLock, FaUser } from 'react-icons/fa'
import { ImFilePicture } from 'react-icons/im'
import { IoIosAlbums } from 'react-icons/io'
import { MdAccountBalanceWallet, MdDeleteForever } from 'react-icons/md'
import { RiAlbumFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const AlbumSidebar = () => {
  return (
    <section className='p-7'>
     <article>
      <ul className='flex flex-col gap-4'>
        <li><NavLink end to={"/"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><AiOutlineDashboard /></span><span>Dashboard</span></NavLink></li>

        <li><NavLink to={"/favourites"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RiAlbumFill /></span><span>Favourites</span></NavLink></li>

      

       
      </ul>
     </article>
    </section>
  )
}

export default AlbumSidebar
