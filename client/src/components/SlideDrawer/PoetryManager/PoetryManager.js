import React from 'react'

/**
* @author
* @function PoetryManager
**/

const PoetryManager = (props) => {
  return(
    <div className="container p-1">
      <div className="row text-center mt-2 p-2">
        <h1>Upload Your Lyrics and other Poetry</h1>
        <div className="col-8 border p-3">
          {/* Flex-container that is creating a layout for all the files being uploaded */}
        </div>
        <div className="col-3 border p-3">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
      </div>
    </div>
   )

 }

export default PoetryManager;