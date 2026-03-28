import jwt from "jsonwebtoken";
const protect = (req, res, next) => {
    try{
        const headersAuthorization = req.headers.authorization;

        if(!headersAuthorization){
            return res.status(401).json({
                message: "No token access denied"
            })
        }

        const token = headersAuthorization.split(" ")[0];
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = token;
        next()
    }   
    catch(error){
        res.status(401).json({
            message: "Invalid token",
            error: error.message
        })
    }
}

export default protect;