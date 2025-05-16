import React from 'react'
import NavbarContainer from '../NavbarComponents/NavbarContainer'
import UserSideBar from './UserSideBar'
import { Outlet } from 'react-router-dom'

const UserMainContainer = () => {
  return (
    <section className='bg-slate-900 min-h-[100vh] w-[100%]'>
    <header className='sticky top-0 shadow-2xl z-5'>
        <NavbarContainer/>
    </header>
    <main className='flex'>
        <aside className='h-[calc(100vh-71px)] w-[16%] bg-slate-700 sticky top-[70px]'><UserSideBar/></aside>
        <aside className='w-[84%] min-h-[calc(100vh-71px)] '><Outlet/></aside>
    </main>
    </section>
  )
}

export default UserMainContainer
