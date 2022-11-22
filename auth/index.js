const auth=(req,res,next)=>{

    try {
        console.log("Middleware");
        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports=auth;