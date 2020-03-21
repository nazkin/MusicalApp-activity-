import React, {useState, useEffect} from 'react';
import './SlideDrawer.css';
import axios from 'axios';
/**
* @author
* @function SlideDrawer
**/

const SlideDrawer = (props) => {
    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [genre, setGenre] = useState("");

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

    let drawerClasses = 'side-drawer'
    if(props.show) {
       drawerClasses = 'side-drawer open'
    }
  return(
    <div className={drawerClasses}>
        <h3>Account Management for {props.username}</h3>
        <div className="container-fluid ">
            <div className="row d-flex justify-content-center acc-entry-row">
                <div className="col-md-6 border p-4 cont-acc-entry">
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
                    <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
                
            </div>
            <div className="row music-link-row">
                <button className="btn btn-info btn-lg d-flex justify-self-start">View Musical Uploads</button>
            </div>
        </div>
    </div>
   )

 }

export default SlideDrawer;