const {clearHash}=require('../services/cache')

module.exports=async ()=>{
    await next();
    //it will let router handler to run before middleware

    clearHash(req.user.id)
}
