

class AuthController {


    static index(req, res, next){
        res.render('login');
    }


    static reqister(req, res, next){
        res.render('register');
    }

    static adminView(req, res, next){
        res.render('admin/index');
    }


    static studentView(req, res, next){
        res.render('student/student');
    }

    static registerAction(req, res, next){
        const { name, email, pin , id} = req.body;
        let errors = [];
        if(name.length < 1){
            errors.push("You haven't provided a name yet");
        }

        if(email.length < 1 && !AuthController.validateEmail(email)){
            errors.push("Provide a valid email address");
        }

        if(pin.length < 5){
            errors.push("Provide a valid pin number");
        }

        if(id.length < 8){
            errors.push("Provide a valid Student Identification number")
        }

        if(errors.length > 0){
            req.flash('errors',errors);
            res.redirect('back');
        }else{
            req.flash('')
        }

    }

    static validateEmail(email){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}

export default AuthController;