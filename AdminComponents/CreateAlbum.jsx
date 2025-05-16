import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../utilities/Spinner';
import { addDoc, collection } from 'firebase/firestore';
import { __DB } from '../backend/firebase';

const CreateAlbum = () => {
 
  let initialAlbumState = {
    albumTitle:"",
    albumPoster:"",
    albumReleaseDate:"",
    albumLanguages:"",
    albumDescription:""
  }

  let initialSongState = {
    songName:"",
    songUrl:"",
    songThumbnail:"",
    songSingers:"",
    songMood:"",
    songMusicDirector:""
  }

  let [albumState , setAlbumState]= useState(initialAlbumState);
  let [songsState , setSongsState]= useState([initialSongState]);
  let [isLoading , setIsLoading]= useState(false);
  let [albumThumbnailPoster , setAlbumThumbnailPoster]= useState(null);

  let {albumTitle , albumPoster , albumReleaseDate , albumLanguages , albumDescription}= albumState;

  // handling album {Poster}
  let handleAlbumPoster = (e)=>{
    let file  = e.target.files[0];
    if(file){
      setAlbumThumbnailPoster(file)
    }
  }

  // Handling input changes in album form
  let handleAlbumInputChange = (e)=>{
    let {name , value}= e.target;
    setAlbumState({
      ...albumState, [name]:value
    })
  }

  // Add section method for song
  let addSongSection = (e)=>{
    e.preventDefault();
    setSongsState([
      ...songsState,{
        songName:"",
        songUrl:"",
        songThumbnail:"",
        songSingers:"",
        songMood:"",
        songMusicDirector:""
      }
    ])
  }

  // Remove Song Section
  let removeSongSection = (index,e)=>{
    e.preventDefault();
    if(index>0){
      setSongsState(songsState.filter((el, ind)=> ind !== index));
    }
  }

  // Handling the Songs Input 
  let handleSongsInputChange = (index, e)=>{
    let {name , value}= e.target;
    let updatedState  = [...songsState];
    updatedState[index][name]=value;
    setSongsState(updatedState);
  }

  // handling files of songs Section
  let handleSongsFilesInput = (index, inpName, e)=>{
    let updatedSongs = [...songsState];
    updatedSongs[index][inpName] = e.target.files[0];
    setSongsState(updatedSongs);
  }

  // Form Submit Method
  let handleFormSubmit= async(e)=>{
    e.preventDefault();

    try {
      setIsLoading(true);

      // Upload Album Poster
      let AlbumPosterFormData = new FormData();
      AlbumPosterFormData.append("file", albumThumbnailPoster);
      AlbumPosterFormData.append("upload_preset", "tech_haven_music_333");

      let cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dsohtv4dk/image/upload", {
        method:"POST",
        body:AlbumPosterFormData
      });

      let AlbumPosterUrlFromDB = await cloudinaryResponse.json();

      // Upload Songs (thumbnail and song files)
      let SongsUrl = songsState.map(async(song, index)=>{

        // Upload song thumbnail
        let songThumbnailFormdata = new FormData();
        songThumbnailFormdata.append("file", song?.songThumbnail);
        songThumbnailFormdata.append("upload_preset", "tech_haven_music_333");

        let cloudinaryResponseOfSongThumbnailData = await fetch("https://api.cloudinary.com/v1_1/dsohtv4dk/image/upload", {
          method:"POST",
          body:songThumbnailFormdata
        });

        let SongPosterUrlFromDB = await cloudinaryResponseOfSongThumbnailData.json();

        // Upload song file (audio/video)
        let songURLFormdata = new FormData();
        songURLFormdata.append("file", song?.songUrl);
        songURLFormdata.append("upload_preset", "tech_haven_music_333");

        let cloudinaryResponseOfSongURLData = await fetch("https://api.cloudinary.com/v1_1/dsohtv4dk/video/upload", {
          method:"POST",
          body:songURLFormdata
        });

        let SongMP3UrlFromDB = await cloudinaryResponseOfSongURLData.json();

        return {
          ...song, 
          songThumbnail: SongPosterUrlFromDB?.url,
          songUrl: SongMP3UrlFromDB?.url,
          songDuration: SongMP3UrlFromDB?.duration
        };
      });

      let SongsDataFromCloudinaryResponse = await Promise.all(SongsUrl);

      let Payload = {...albumState, albumPoster: AlbumPosterUrlFromDB?.url, AllSongs: [...SongsDataFromCloudinaryResponse]}

      let album_collection_ref = collection(__DB,"album_collections");
      await addDoc(album_collection_ref , Payload);

      toast.success("Data Stored successfully")

    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='h-full w-full flex justify-center '>
      <article className='min-h-[400px] w-[65%] bg-slate-800 rounded-md mt-12 pt-4 px-8'>
        <header><h1 className='text-[24px] font-semibold text-center'>Create Album</h1></header>
        <hr  className='my-2'/>

        {/* Form Starting  */}
        <main>
          {/* album form starting */}
          <header className='my-4'>
            <h1 className='text-[20px] font-semibold'>Album Details</h1>
          </header>

          <article>
            <form action="" onSubmit={handleFormSubmit}>
              {/* album starts */}

              <header className='flex flex-wrap justify-between gap-y-4'>

                {/* first row album */}
                <div className='flex flex-col gap-2 w-[48%]'>
                  <label htmlFor="albumTitle">Album Title</label>
                  <input type="text" 
                    placeholder='Enter Album Title'
                    name='albumTitle'
                    value={albumTitle}
                    onChange={handleAlbumInputChange}
                    className='outline-none py-2 px-2 border rounded-md' />
                </div>

                <div className='flex flex-col gap-2 w-[48%]'>
                  <label htmlFor="albumTitle">Album Poster</label>
                  <input type="file" 
                    name='albumPoster'
                    onChange={handleAlbumPoster}
                    className='outline-none py-2 px-2 border rounded-md file:bg-blue-600 file:px-1 file:rounded-sm' />
                </div>

                {/* second row */}

                <div className='flex flex-col gap-2 w-[48%]'>
                  <label htmlFor="albumTitle">Album Release date</label>
                  <input type="date" 
                    name='albumReleaseDate'
                    value={albumReleaseDate}
                    onChange={handleAlbumInputChange}
                    className='outline-none py-2 px-2 border rounded-md' />
                </div>
                <div className='flex flex-col gap-2 w-[48%]'>
                  <label htmlFor="albumTitle">Album Languages</label>
                  <input type="text" 
                    placeholder='Enter languages'
                    onChange={handleAlbumInputChange}
                    name='albumLanguages'
                    value={albumLanguages}
                    className='outline-none py-2 px-2 border rounded-md' />
                </div>
                {/* third row */}

                <div className='flex flex-col gap-2 w-[100%]'>
                  <label htmlFor="albumTitle">Album Description</label>
                  <textarea className='py-2 px-2 border rounded-md' placeholder='Enter the Description' name='albumDescription' onChange={handleAlbumInputChange} value={albumDescription}>
                  </textarea>
                </div>
              </header>
              {/* album ends */}

              {/* songs Form Starts here */}
              <main className='py-4'>
                <header><h1 className='text-[20px] font-semibold'>Songs Section</h1></header>

                {/* iterating the songsState */}
                {songsState?.map((song , index)=>{
                  return (
                    <section key={index} className=' py-2 px-6 bg-slate-700 w-[100%] min-h-[250px] rounded-md my-4'>
                      <header><h1 className='text-[18px] font-semibold text-center '>Song {index+1}</h1></header>

                      {/* This is Songs divs section */}
                      <main className='flex justify-between flex-wrap gap-y-4'>
                        {/* First row songs Section */}
                        <div className='flex flex-col gap-2 w-[32%]'>
                          <label htmlFor="">Song Name</label>
                          <input type="text" 
                            name='songName'
                            onChange={(e)=>handleSongsInputChange(index,e)}
                            value={song?.songName}
                            placeholder='Enter song name'
                            className='outline-none border py-2 px-2 rounded-md' />
                        </div>

                        <div className='flex flex-col gap-2 w-[32%]'>
                          <label htmlFor="">Song Url</label>
                          <input type="file" 
                            name='songUrl'
                            onChange={(e)=>handleSongsFilesInput(index ,"songUrl",e )}
                            className='outline-none border py-2 px-2 rounded-md file:bg-blue-600 file:px-1 file:rounded-md ' />
                        </div>

                        <div className='flex flex-col gap-2 w-[32%]'>
                          <label htmlFor="">Song Poster</label>
                          <input type="file" 
                            name='songThumbnail'
                            onChange={(e)=>handleSongsFilesInput(index ,"songThumbnail",e )}
                            className='outline-none border py-2 px-2 rounded-md' />
                        </div>

                        {/* Second Row Songs Section */}

                        <div className='flex flex-col gap-2 w-[32%]'>
                          <label htmlFor="">Song Singers</label>
                          <input type="text" 
                            placeholder='Enter singers'
                            name='songSingers'
                            onChange={(e)=>handleSongsInputChange(index,e)}
                            value={song?.songSingers}
                            className='outline-none border py-2 px-2 rounded-md' />
                        </div>

                        <div className='flex flex-col gap-2 w-[32%]'>
                          <label htmlFor="">Song Mood</label>
                          <input type="text" 
                            placeholder='Enter song mood'
                            name='songMood'
                            onChange={(e)=>handleSongsInputChange(index,e)}
                            value={song?.songMood}
                            className='outline-none border py-2 px-2 rounded-md' />
                        </div>

                        <div className='flex flex-col gap-2 w-[32%]'>
                          <label htmlFor="">Song Music Director</label>
                          <input type="text" 
                            placeholder='Enter music director'
                            name='songMusicDirector'
                            onChange={(e)=>handleSongsInputChange(index,e)}
                            value={song?.songMusicDirector}
                            className='outline-none border py-2 px-2 rounded-md' />
                        </div>

                      </main>

                      <footer className='flex justify-between py-6'>
                        <button className='py-2 px-4 bg-red-600 rounded-md' onClick={(e)=>removeSongSection(index ,e)}>Remove Section</button>

                        {index === songsState.length-1 &&  
                          <button onClick={addSongSection} className='py-2 px-4 bg-blue-600 rounded-md'>Add Section</button>
                        }
                      </footer>
                    </section>
                  )
                })}
              </main>
              {/* songs Form Ends here */}

              {/* Submit part starts */}
              <footer>
                <button className='bg-blue-600 hover:bg-blue-800 w-[100%] py-2 rounded-md'>submit</button>
              </footer>
              {/* Submit part ends */}
            </form>
          </article>
          {/* album form ending */}
        </main>
        {/* Form Ending here  */}
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default CreateAlbum
