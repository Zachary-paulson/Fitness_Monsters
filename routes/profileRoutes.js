const authCheck = (req, res, next) => {
    if(!req.user){
        //if the user is not logged in.
        res.redirect('/auth/login');
    }else{
        next();
    }
};


module.exports = app => {
    app.get('/profile', authCheck, (req, res) => {
        res.render('profile');
    })
}