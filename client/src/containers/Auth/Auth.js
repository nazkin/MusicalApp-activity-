import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Auth.css';

/**
* @author
* @function SignIn
**/

const SignIn = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasAccount, setHasAccount] = useState(false);

    const authTypeHandler = () => {
        setHasAccount(!hasAccount);
    }

    const submitFormHandler = (event)=> {
        event.preventDefault();
        const user = {
            username, 
            password
        }
        //Controlling the path of my POST request depending on login or sign-in situation
        let url;
        if(hasAccount){
            url = "/api/login";
        } else {
            url = "/api/add";
        }
        //Sending out the post request that generates the JWT
        axios.post(url, user)
            .then(res=> {
                sessionStorage.setItem('jwtToken', res.data.token);
                setUsername("");
                setPassword("");
                props.history.push('/enter');
            }).catch(err=> {
                console.log(err);
            });
    }
    let authTitle = hasAccount ? 'Login' : 'Sign-up';
    let authControl = hasAccount ? 'Do not have an account yet?' : 'Already have an account?';
  return(
    <div className="container p-2">
    <h1 className="mt-1"> Hey, {authTitle} to enter</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 ">
        <form onSubmit={submitFormHandler}>
            <div className="form-group">
              <label>Email address</label>
              <input  onChange={(event)=> setUsername(event.target.value)}
                      value = {username}
               type="email" className="form-control" name="username" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label >Password</label>
              <input onChange={(event)=> setPassword(event.target.value)}
                     value= {password}
               type="password" className="form-control" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <p className="auth-control">{authControl} Click here! <button className="p-1" onClick={authTypeHandler}><img src="user.png" /></button></p>
        </div>
      </div>
    </div>
   
   )

 }

export default SignIn;