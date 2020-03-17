import React from 'react';

/**
* @author
* @function SignIn
**/

const SignIn = (props) => {
  return(
    <div className="container p-5">
    <h1 className="mt-5"> Hey, sign-up to enter</h1>

      <div className="row d-flex justify-content-center">
        <div className="col-md-6 ">
            <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
   
   )

 }

export default SignIn;