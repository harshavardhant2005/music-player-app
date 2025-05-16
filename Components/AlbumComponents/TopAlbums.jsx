import React, { useContext } from 'react'
import { AlbumContextAPI } from '../../context/AlbumContext'
import { NavLink } from 'react-router-dom';

const TopAlbums = () => {

    let {allAlbums}= useContext(AlbumContextAPI);
   
    
  return (
    <section>
      <article>
        <header><h1 className='text-[24px] font-semibold'>Top Albums</h1></header>
        <main className='py-4 flex gap-6'>
            {allAlbums?.map((album , index)=>{
                return <div key={index} className='h-[260px] w-[200px] p-3 bg-slate-800 rounded-md'>
                    <NavLink to={"/album-details"} state={album}>
                    <picture>
                        <img src={album?.albumPoster} 
                        className='h-[200px] w-[180px] rounded-sm'
                        alt="" />
                    </picture>

                    <p className='text-[18px] font-semibold text-center py-2'>{album?.albumTitle}</p>
                    </NavLink>
                          
                </div>
            })}
        </main>
      </article>
    </section>
  )
}

export default TopAlbums
