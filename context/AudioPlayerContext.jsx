import React, { createContext, useState } from 'react'

 export let AudioPlayerContextAPI = createContext(null);

const AudioPlayerContext = ({children}) => {
    const [songs, setSongs] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);

  return (
    <AudioPlayerContextAPI.Provider value={{songs,setSongs,isPlaying,setIsPlaying,currentSongIndex, setCurrentSongIndex} }>
        {children}
      
    </AudioPlayerContextAPI.Provider>
  )
}

export default AudioPlayerContext
