import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import './PoetryManager.css';
import axios from 'axios';
/**
* @author
* @function PoetryManager
**/


const PoetryManager = (props) => {
//STATE
const [photoSrc, setPhotoSrc] = useState(null);
const [theProgress, setTheProgress] = useState(0);
const [idAccount, setIdAccount] = useState("");
const [images, setImages] = useState([]);

useEffect(()=> {
  axios.get(`http://localhost:8080/api/accountInfo/photos/${props.id}`)
  .then(res=> {
    console.log(res.data.data.images);
    const accId = res.data.data._id; 
    
    setImages([...res.data.data.images]);
    setIdAccount(accId);
 
  
  })
  .catch(err=> console.log(err));
}, [props.close]);

//Handler Functions
const saveImageDownload = (download, name)=> {
  const object = {
    name: name,
    url: download,
    id: props.id
  }
  axios.post(`http://localhost:8080/api/upload/image/${idAccount}`, object)
    .then(res=> {
      setPhotoSrc(null);
      props.close();

    })
    .catch(err=> console.log(err));
}

//Handling our 
const uploadFileHandler = (e) => {
  e.preventDefault();
  const photo = photoSrc;
  const photoName = photo.name.toString();
  const photoMeta = photo.type.toString();

  const metadata = {
    contentType: photoMeta
  }
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child("photos/"+photo.name).put(photo, metadata);
  uploadTask.on(
    'state_changed',
    snapshot=> {
      //progress of upload
      const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
      setTheProgress(progress);
    },
    error => console.log(error),
    ()=> {
      uploadTask.snapshot.ref.getDownloadURL().then(url=> {
        const linkURL = url.toString();
        console.log('File can be retrieved at the following URL =>', url);
        saveImageDownload(linkURL, photoName);
      });
    }
  )   
  console.log(photoSrc);
}
const inputChangeHandler = (e) => {
  if(e.target.files[0]){
    const file = e.target.files[0];
    setPhotoSrc(file);
  }
}
//Layout variables 
let photoContent =<div className="ml-5"><img src="user.png" width="40px" /><p>{props.user} has not uploaded any photos yet</p></div> ;
if(images.length != 0){
  photoContent = images.map(img=> {
   return (
     <div className="col-md-4 my-1">
       <img src={img.downloadURL} width="100%" />
     </div>
   )
  })
}

  return(
    <div className="container photos-container">
      
      <div className="row d-flex justify-content-between">
        <h1>Upload Photos of Yourself</h1>
        <div className="col-md-7 border p-1">
          <div className = "row image-row">
          {/* Flex-container that is creating a layout for all the files being uploaded */}
          {photoContent}
          </div>
        </div>
        <div className="col-md-4 p-1">
            <form onSubmit={uploadFileHandler} className="photo-form">
                <div className="form-group">
                  <label>Upload Here</label>
                  <input onChange={inputChangeHandler}
                   type="file" className="form-control-file" id="photo-input"/>
                </div>
                <button type="submit" className="btn btn-outline-primary my-4">Upload</button>
            </form>
            <p>Uploading Rate {theProgress}%</p>
        </div>
      </div>
    </div>
   )

 }

export default PoetryManager;