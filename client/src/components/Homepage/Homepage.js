import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./Homepage.css";

/**
* @author
* @function Home
**/

const Home = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
//First useEffect Call authorizes the users web token through header
    useEffect(() => {
       axios.get('http://localhost:8080/listings', {
           headers:{
               "Content-Type": "application/x-www-form-urlencoded",
               "authorization": "Bearer "+sessionStorage.getItem("jwtToken")
           }
       }).then(res=> {
           const user = res.data.authData.user;
           setCurrentUser(user);

       }).catch(err=> console.log(err));
    },[]);
//Second useEffect Call will be used to check weather the user has a basic account or not
// useEffect(() => {
   
//  },[currentUser]);
const manageAccountHandler = ()=> {
    props.history.push("/account");
}
const viewTalentHandler = ()=> {
    props.history.push("/talents");
}

  return(
    <div>
        <h1>Hello, {currentUser}</h1>
        <h2>What would you like to do next ?</h2>
        <div className="container home-container">
            <div className = "row d-flex justify-content-around">
                <div className="col-md-5 account-col border p-1">
                   <div onClick={manageAccountHandler} className="next-link">
                        <p>Manage Account</p>
                   </div>
                </div>
                <div className="col-md-5 view-col border p-1">
                    <div onClick={viewTalentHandler} className="next-link">
                        <p>View Talent</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
   )

 }

export default Home;