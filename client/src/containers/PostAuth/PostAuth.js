import React, {useState, useEffect} from 'react'
import axios from 'axios';
import SlideDrawer from '../../components/SlideDrawer/SlideDrawer';
import Backdrop from '../../components/Backdrop/Backdrop';
/**
* @author
* @function PostAuth
**/

const PostAuth = (props) => {
const [userId, setUserId] = useState("");
const [userName, setUserName] = useState("");
const [drawerOpen, setDrawerOpen] = useState(false);
const [fullName, setFullName] = useState("");
const [skills, setSkills] = useState("");
const [genre, setGenre] = useState("");


    useEffect(() => {
       axios.get('http://localhost:8080/api/enter', {
           headers: {
             "Content-Type":"application/x-www-form-urlencoded" ,
             "authorization": "Bearer "+sessionStorage.getItem('jwtToken')
           }
       }).then(res=> {
           const userObject = res.data.authData;
           console.log(userObject);
           setUserId(userObject.id);
           setUserName(userObject.user);
       }).catch(err=> console.log(err));
    }, []);
    //Handling the opening of the drawer for account management
    const drawerToggleHandler = ()=> {
       
            axios.get(`http://localhost:8080/api/find/${userId}`, {
                headers: {
                  "Content-Type":"application/x-www-form-urlencoded" ,
                  "authorization": "Bearer "+sessionStorage.getItem('jwtToken')
                }
            }).then(result => {
                const usrObj = result.data.userData;
                setFullName(usrObj.name);
                setSkills(usrObj.skills);
                setGenre(usrObj.genre);
                console.log(result.data);
                setDrawerOpen(!drawerOpen);
            }).catch(err=> console.log(err));
        
       
    }
    //If the user clicks on the backdrop the sidedrawer will close
    const backDropClickHandler = ()=> {
        setDrawerOpen(false);
    }
    let backdrop = null;
    if(drawerOpen){
        backdrop = <Backdrop closeDrawer = {backDropClickHandler}/>
    }
  return(
    <div>
        <SlideDrawer name={fullName} skills={skills} genre={genre} id={userId} username={userName} show={drawerOpen} close ={backDropClickHandler}/>
        {backdrop}
        <h1>Welcome, {userName}</h1>
        
        <div className="container">
            <h4>What would you like to do next?</h4>
            <div className="row">
                
                <div className="col-md-6 d-flex justify-content-center align-items-center p-5">
                    <button onClick={drawerToggleHandler} className="btn btn-warning btn-lg my-5">Manage Your Account</button>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center p-5">
                    <button className="btn btn-success btn-lg my-5">View Local Talent</button>
                </div>
            </div>
        </div>
    </div>
   )

 }

export default PostAuth;