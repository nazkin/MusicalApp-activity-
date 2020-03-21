import React, {useState,useEffect} from 'react'
import axios from 'axios';
/**
* @author
* @function Account
**/

const Account = (props) => {
    const [currentUser, setCurrentUser] = useState("");
    const [hasAccount, setHasAccount] = useState(false);
    const [userName, setUserName] = useState("");
    const [userSkills, setUserSkills] = useState("");
    const [userCountry, setUserCountry] = useState("");
    const [userCity, setUserCity] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/listings', {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": "Bearer "+sessionStorage.getItem("jwtToken")
            }
        }).then(res=> {
            const user = res.data.authData.user.toString();
            setCurrentUser(user);
 
        }).catch(err=> console.log(err));
     },[]);

     useEffect(()=> {
         axios.get(`http://localhost:8080/api/findAccount/${currentUser}`, {
             headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": "Bearer "+sessionStorage.getItem("jwtToken")
             }
         }).then(result=> {
             if(!result.data.account && result.status === 200){
                 console.log(`Sorry but this Users Account Doesnt Exist`)
             }else {
                 setHasAccount(true);
                 console.log(result);
             }
             
         }).catch(err=> console.log(err));
     },[currentUser]);

     const accountSubmissionHandler =(event)=> {
         event.preventDefault();
         const acc = {
             email: currentUser,
             name: userName,
             skills: userSkills,
             country: userCountry,
             city: userCity

         }
        axios.post('http://localhost:8080/api/createAccount',acc).then(res=> {
            console.log(res.data);
        }).catch(err=> console.log(err));
     }
  return(
    <div>
        <h1 className="mb-5">Manage Your Personal Information</h1>
        <form onSubmit={accountSubmissionHandler}>
            <label>Email :</label>
            <input type="text" onChange={(event)=>setCurrentUser(event.target.value)} value={currentUser} name="email" />
            <label>Name :</label>
            <input type="text" onChange={(event)=>setUserName(event.target.value)} value={userName} name="name" />
            <label>Skills :</label>
            <input type="text" onChange={(event)=>setUserSkills(event.target.value)} value={userSkills} name="skills" />
            <label>City :</label>
            <input type="text" onChange={(event)=>setUserCountry(event.target.value)} value={userCountry} name="city" />
            <label>Country :</label>
            <input type="text" onChange={(event)=>setUserCity(event.target.value)} value={userCity} name="country" />
            <button className="btn btn-success">Update</button>
        </form>
    </div>
   )

 }

export default Account