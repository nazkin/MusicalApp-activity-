import React, {useState, useEffect} from 'react';
import './SlideDrawer.css';
import axios from 'axios';
import PoetryManager from './PoetryManager/PoetryManager';
import MusicManager from './SongManager/SongManager';
/**
* @author
* @function SlideDrawer
**/

const SlideDrawer = (props) => {
    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [genre, setGenre] = useState("");
    const [isBasicInfo, setIsBasicInfo] = useState(true);
    const [isMusic, setIsMusic] = useState(false);
    const [isPoetry, setIsPoetry] = useState(false);
    useEffect(()=> {
        setName(props.name);
        setSkills(props.skills);
        setGenre(props.genre);
    },[props.show])

    const updateFormHandler = (e)=> {
        e.preventDefault();
        const updateObj= {
            name: name,
            skills: skills,
            genre: genre
        }
        axios.post(`http://localhost:8080/api/update/${props.id}`, updateObj)
            .then(res=> {
                console.log(res.data);
                props.close();
            }).catch(err=> console.log(err));
    }
    const manageMusicHandler = ()=> {
        setIsBasicInfo(false);
        setIsPoetry(false);
        setIsMusic(true);

    }
    const managePoetryHandler = ()=> {
        setIsBasicInfo(false);
        setIsPoetry(true);
        setIsMusic(false);
    }
    const manageBasicsHandler = ()=> {
        setIsBasicInfo(true);
        setIsPoetry(false);
        setIsMusic(false);
    }
    let drawerClasses = 'side-drawer'
    if(props.show) {
       drawerClasses = 'side-drawer open'
    }
    let accountInfoType; 
    if(isBasicInfo && !isMusic && ! isPoetry){
        accountInfoType = (
            <div className="container center-text general-manager">
                <h3>General Account Management Form </h3>
                <div className="row d-flex justify-content-center acc-entry-row">
                
                    <div className="col-md-8 p-2 cont-acc-entry">
                    
                        <form onSubmit={updateFormHandler}>
                        <div className="form-group">
                            <label>Name (visible to other users)</label>
                            <input  onChange={(event)=> {setName(event.target.value)}} value={name}
                             type="text" className="form-control" id="" />
                        </div> 
                        <div className="form-group">
                            <label>Skills</label>
                            <input onChange={(event)=> {setSkills(event.target.value)}} value={skills}
                             type="text" className="form-control" id="" />
                        </div> 
                        <div className="form-group">
                            <label>Genre</label>
                            <input onChange={(event)=> {setGenre(event.target.value)}} value={genre}
                             type="text" className="form-control" id="" />
                        </div> 
                        <button type="submit" className="btn btn-outline-primary">Update</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        )
    }else if(!isBasicInfo && !isMusic && isPoetry){
        accountInfoType = <PoetryManager id={props.id} user={props.username} close={props.close}/>
    }else {
        accountInfoType = <MusicManager id={props.id} user={props.username} close={props.close}/>
    }
  return(
    <div className={drawerClasses}>
        
        {accountInfoType}
        <div className="account-control-panel">
            <button onClick={props.close} className="btn btn-link mx-3 float-left">Leave Account Management</button>
            <button onClick={manageBasicsHandler} className="btn btn-dark mx-3">Manage Basics</button>
            <button onClick={manageMusicHandler} className="btn btn-info mx-3">Manage Music</button>
            <button onClick={managePoetryHandler} className="btn btn-warning mx-3 ">Manage Poetry</button>
        </div>
       
    </div>
   )

 }

export default SlideDrawer;