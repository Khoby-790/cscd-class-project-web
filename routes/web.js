import { Router } from 'express';
import passport from 'passport';
//controllers
import AuthController from '../app/controllers/Auth';
import HomeController from '../app/controllers/HomeController';
//middleware
import AuthMiddlewares from '../app/middlewares/auth';

const route = Router();


route.get('/',AuthMiddlewares.auth);
route.route('/login')
.post(passport.authenticate('local',{
    successFlash: true,
    failureFlash: true,
    failureRedirect:'/login',
    successRedirect:'/'
}))
.get(AuthController.index);

route.route('/register')
.get(AuthController.reqister)
.post(AuthController.registerAction);

route.get('/admin',AuthController.adminView);
route.get('/student',AuthController.studentView);
route.get('/hallregister',HomeController.hallRegistration);

export default route;