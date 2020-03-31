import React,{useState, useEffect} from 'react';
import './Artists.css';


/**
* @author
* @function Artists
**/

const Artists = (props) => {

    let artistDisplay = props.userInfo.map(usr=> {
        let photographs = [];
        props.photos.forEach(photo=> {
            if(photo.authorID == usr._id){
                photographs.push(photo.downloadURL); 
            }
        })  
        return(
            <div key={usr._id} className="col-md-5 my-1 p-1">
                <h4>{usr.name}</h4>
                <img className="artist-photo" src={photographs[0]} width="75%"/>
                <h6 className="mt-2 skills-section">{usr.skills}</h6>
                <h4 className="genre-section">{usr.genre}</h4>
            </div>
        )
    });
  return(
    <div className="col-md-6 border-right artists-column">
        <h3 className="my-2">Trending Artists</h3>
        <div className="row artists-row border-top border-bottom py-2">
           {artistDisplay}

        </div>
    </div>
   )

 }

export default Artists;