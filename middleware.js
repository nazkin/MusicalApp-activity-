//Middleware that verifies the token everytime a user wants to access a protected route

const verifyToken = (req, res, next)=> {
    //Contains the authorization header
    const bearerHeader = req.headers['authorization'];
    //check if the header is defined or not
    if(typeof bearerHeader !== 'undefined'){
        // Authorization: Bearer <token> 
        //Splitting the output so that i can access the <token> only
        const bearerElement = bearerHeader.split(" ");
        //Remove token from the array
        const token = bearerElement[1];
        //Set it as the token
        req.token = token;
        next()
    }else {
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken
}