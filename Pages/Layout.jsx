import { Outlet } from "react-router-dom"
import NavbarContainer from "../Components/NavbarComponents/NavbarContainer"
import AlbumSidebar from "../Components/AlbumComponents/AlbumSidebar"
import { useContext } from "react"
import { AudioPlayerContextAPI } from "../context/AudioPlayerContext"
import CustomAudioPlayer from "react-pro-audio-player"

let Layout = ()=>{

  let data = useContext(AudioPlayerContextAPI);
    let  {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex, setCurrentSongIndex} =useContext(AudioPlayerContextAPI);

  console.log(data);
  

    return <section className="w-[100%] min-h-[100vh] bg-slate-900">
      <header className="sticky top-0 shadow-2xl z-10"> <NavbarContainer/></header>
      <main className="flex min-h-[calc(100vh-71px)]">
        <aside  className=" sticky top-[70px] w-[16%] h-[calc(100vh-71px)] bg-slate-700"><AlbumSidebar/></aside>
        <aside className="w-[84%] min-h-[calc(100vh-71px)] p-6"><Outlet/></aside>
      </main>

     <section className="w-full fixed bottom-0">
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
      
       
    </section>
}
export default Layout