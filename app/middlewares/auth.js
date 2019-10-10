

class AuthMiddleware {
    static admin(req, res, next){
        if(req.isAuthenticated() && req.user.userType == "Admin"){
            next();
        }
        res.redirect('/login');
    }

    static student(req, res, next){
        if(req.isAuthenticated() && req.user.userType == "Admin"){
            next();
        }
        res.redirect('/login');
    }

    static auth(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.userType == "Admin"){
                res.redirect('/admin');
            }

            if(req.user.userType == "Admin"){
                res.redirect('/student');
            }
        }
        res.redirect('/login');
    }
}


export default AuthMiddleware;