import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AudioPlayerContextAPI } from '../../context/AudioPlayerContext';
import CustomAudioPlayer from 'react-pro-audio-player';

const AlbumDetails = () => {

  let  {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex, setCurrentSongIndex} =useContext(AudioPlayerContextAPI);

    let data = useLocation();

    let Album = data?.state;
    console.log(Album);
    
    
    
  return (
    <section className='h-full w-full '>
    <article className='h-full w-full'>
       <header>
       <header className='h-[370px] w-full bg-slate-800 rounded-md flex p-6 gap-10'>
            <aside className='w-[50%]'><picture>
                <img src={Album?.albumPoster} alt=""  className='h-[280px]  rounded-sm'/>
                </picture></aside>
            <aside className='flex flex-col gap-2'>
                <h1 className='text-[24px] font-thin'>{Album?.albumTitle}</h1>
                <p className='flex gap-2 items-center'><span >No Of Tracks :</span><span className='bg-blue-600 py-1 px-4 rounded-md'>{}</span></p>

                <p className='flex gap-2 items-center'><span >Languages :</span><span >{Album?.albumLanguages}</span></p>

                <p className='flex gap-2 items-center'><span >Release date :</span><span >{Album?.albumReleaseDate}</span></p>

                <div className='flex gap-2 '><span >Description  </span>
                <p className=''>{Album?.albumDescription}</p>
                </div>
                
                </aside>
        </header>
       </header>

       <main className='mt-20'>
        <table className='w-full text-left'>
            <thead className='bg-slate-700'>
               <tr>
               <th className='px-2'></th>
                <th className='px-1 py-3'></th>
                <th className='px-1 py-3'>song name</th>
                <th className='px-1 py-3'>singers</th>
                <th className='px-1 py-3'>Music director</th>
                <th className='px-1 py-3'>Mood</th>
                <th className='px-1 py-3'>Duration</th>
               </tr>
            </thead>

            <tbody>
               {Album?.AllSongs?.map((song, index)=>{
                return (
                    <tr  key={index} className='bg-slate-800 cursor-pointer' onClick={()=>{
                       setSongs(Album?.AllSongs); setCurrentSongIndex(index);
                       setIsPlaying(!isPlaying);
                    }}>
                        <td className='py-1 text-center'>{index+1}</td>

                        <td  className=' w-[100px] py-2 pl-6 '><img src={song?.songThumbnail}alt="" className='h-[60px] rounded-sm' /></td>

                        <td className='py-1 pl-4'>{song?.songName}</td>
                        <td className='py-1'>{song?.songSingers}</td>
                        <td className='py-1'>{song?.songMusicDirector}</td>
                        <td className='py-1'>{song?.songMood}</td>
                        <td className='py-1'>{song?.songDuration}</td>
                    </tr>
                )

               })} 
            </tbody>
        </table>
       </main>
    </article>
    {currentSongIndex !== null && (
        <CustomAudioPlayer
          songs={songs}
          isPlaying={isPlaying}
          currentSongIndex={currentSongIndex}
          onPlayPauseChange={setIsPlaying}
          onSongChange={setCurrentSongIndex}
          songUrlKey="songUrl"
          songNameKey="songName"
          songThumbnailKey="songThumbnail" 
          songSingerKey="songSingers"
        />
      )}

    </section>
  )
}

export default AlbumDetails
