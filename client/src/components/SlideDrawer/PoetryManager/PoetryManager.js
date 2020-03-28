import React, {useState} from 'react';
import firebase from 'firebase';
import './PoetryManager.css';
/**
* @author
* @function PoetryManager
**/


const PoetryManager = (props) => {
//STATE
const [photoSrc, setPhotoSrc] = useState("");
const [theProgress, setTheProgress] = useState(0);

//Handler Functions
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
let photoContent = <p>{props.user} has not uploaded any photos yet</p>;
  return(
    <div className="container photos-container">
      
      <div className="row d-flex justify-content-between">
        <h1>Upload Photos of Yourself</h1>
        <div className="col-md-7 border p-1">
          {/* Flex-container that is creating a layout for all the files being uploaded */}
          {photoContent}
          <img src="user.png" />
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