import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import storage from '../../../Firebase/index';
import './SongManager.css';
import FileUploader from 'react-firebase-file-uploader';
import axios from 'axios';
/**
* @author
* @function SongManager
**/

const SongManager = (props) => {
  const [src, setSrc] = useState(null);
  const [url, setURL] = useState("");
  const [progress, setProgress] = useState(0);
  const [songName, setSongName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [allSongs, setAllSongs] = useState([]);
  const [songUpload, setSongUpload] = useState(false)


  useEffect(()=> {
    axios.get(`http://localhost:8080/api/accountInfo/${props.id}`)
      .then(res=> {
        console.log(res.data);
        const accId = res.data.data._id; 
        setAccountId(accId);
        //Below I will also have to update the song list from the back end after I populate
        const songArr = [...res.data.data.songs];
        setAllSongs([...songArr]);
      
      })
      .catch(err=> console.log(err));
  }, []);
  
  const handleChange = (e)=> {
    if(e.target.files[0]){
      const file = e.target.files[0];
      setSrc(file);
    }
  }
  const saveSongDownload = (songUrl, nameOfSong)=> {
    const obj = {
     name: nameOfSong,
     downloadURL: songUrl,
     id: props.id
    }
    axios.post(`http://localhost:8080/api/upload/song/${accountId}`,obj)
      .then(res=> {
        console.log(res);
        setSrc("");
      })
      .catch(err=> console.log(err));
  }
  const uploadHandler = (e)=> {
    e.preventDefault();
    const song = src;
    const nameofSong = song.name.toString();
    const metadata = {
      contentType: 'audio/mp3'
    }
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child("music/"+song.name).put(song, metadata);
    uploadTask.on(
      'state_changed',
      snapshot=> {
        //progress of upload
        const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        setProgress(progress);
      },
      error => console.log(error),
      ()=> {
        uploadTask.snapshot.ref.getDownloadURL().then(url=> {
          const linkURL = url.toString()
          console.log('File can be retrieved at the following URL =>', url);
          setURL(linkURL);
          //Now here we are going to call the function that will store the song for us
          saveSongDownload(url,nameofSong);
        });
      }
    )
  }
    let songsDOM = (
      <div className="aSong">
         Currently there are no songs on your account
      </div>
    )
    if(allSongs.length > 0){
      songsDOM = allSongs.map(song => {
        let title = song.name.substring(0, song.name.length-4);
        let download = song.downloadURL;
        return (
          <div className="aSong">
          <a className="float-left mx-1 d-inline" href="#">{title}</a> 
          <audio controls>
            <source type="audio/mpeg" src={download}/>
          </audio>
          </div>
        )
      });
    }

  return(
    <div className="container p-1 mb-4 songs-account">
      <div id="songpage-title">
      <h3 className="mb-5 mt-2">Song Manager {props.user}</h3>
      </div>
        <div className="row songs-list">
        
          <div className="col-md-6 p-1 songs-list-column">
            {songsDOM}
            {/* <audio controls>
            <source type="audio/mpeg" src=""/>
            </audio> */}

          </div>
          <div className="col-md-6 p-1 songs-upload-column">
            <div className="song-upload-title">
              Upload Your New Hit
            </div>
            <div className="mt-2">
              {progress === 0 ? null : <p>Uploading... {progress}%</p> }
              
              <form onSubmit={uploadHandler} className="mp3-form">
                <div className="form-group">
                  <label>Upload mp3</label>
                  <input  onChange={handleChange}
                   type="file" className="form-control-file" id="mp3-input"/>
                </div>
                <button type="submit" className="btn btn-outline-primary my-4">Upload</button>
              </form>
            </div>
          </div>
        </div>
    </div>
   )

 }

export default SongManager