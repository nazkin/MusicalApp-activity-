import React, {useState, useRef} from 'react';
import './MusicPlayer.css';
/**
* @author
* @function MusicPlayer
**/

const MusicPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrntTime] = useState(null);
  const [duration, setDuration] = useState(null);

  const player = useRef();


  const songStatusHandler = ()=> {
    setIsPlaying(!isPlaying);
    if(isPlaying){
      player.current.pause();
    } else {
      player.current.play();
    }
  }
  const songStopHandler = ()=> {
    setIsPlaying(false);
    player.current.pause();
    player.current.currentTime = 0;
 
  }
  const song = {
    title: props.songName,
    author: props.author, 
    source: props.downloadURL, 
    id: props.songID,
  }
  let songState = isPlaying ? "Pause" : "Play";
  const playerCore = (
            <div >
                <div className= "song-author my-2">
                  {song.author}
                </div>
                <div className= "song-name">
                  <p className="float-left">{song.title}</p>
                  <div className="song-menu">
                    <button onClick={songStatusHandler} className="btn btn-link">{songState}</button>
                    <button onClick={songStopHandler} className="btn btn-danger">Stop</button>
                  </div>

                </div>

            </div>
  )
  return(
    <div className = "player-core">
      {playerCore}
      <audio ref={player} src={song.source}/>

    </div>
   )

 }

export default MusicPlayer;