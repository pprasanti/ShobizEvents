import firebase from '../config/firebase-config.js';

class Middleware {
    async decodeToken(req, res, next) {
        console.log(req);
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            try{
                const decodeValue = await firebase.auth().verifyIdToken(token);
                if(decodeValue){
                    console.log(decodeValue);
                    return next();
                }
                return res.json({message: 'Unauthorized'});
            } catch(e) {
                console.log(e);
            }
        }
        return res.json({message: 'Internal Error'});
    }
}

// module.exports =  new Middleware();
export default   new Middleware();