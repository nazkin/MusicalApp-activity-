import React from 'react';
import './Songs.css';
/**
* @author
* @function Songs
**/

const Songs = (props) => {
    let trendingSong = props.songs.map(song => {
        let image = [];
        let user = null;
        props.photos.forEach(photo => {
            if(photo.authorID == song.authorID){
                image.push(photo.downloadURL);
            }
        });
        props.userInfo.forEach(usr=> {
            if(usr._id === song.authorID){
                user = usr.name;
                return;
            }
        })
        return(
            <div className="col-10 song-full">
                <div className="song-title">
                    <h6 id="name-song">{song.name}</h6>
                    <h5 id="author-song">{user}</h5>
                </div>
                <div className="media-player">
                    <audio className="player" controls>
                        <source type="audio/mpeg" src={song.downloadURL}/>
                    </audio>
                </div>
            </div>
        )
    })
  return(
    <div className="col-md-6 trending-song-title">
        <h3 className="my-2 ">Trending Songs</h3>
        <div className="row border-top trending-song-row">
            {trendingSong}
        </div>
    </div>
   )

 }

export default Songs;