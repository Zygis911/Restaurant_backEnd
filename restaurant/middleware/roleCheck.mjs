export function isAdmin(req,res,next) {
    if(req.user && req.user.role === admin) {
        return next()
    }
    res.status(403).json({error: 'you dont have permissions to perform on this site'})
}



export function isUser(req, res, next) {
    if(req.user && (req.user.role == 'user' || req.user.role === 'admin')) {
        return next()
    }

    res.status(403).json({error: 'you do not have permiosions to perform this action'})
}