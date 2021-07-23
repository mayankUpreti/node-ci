const mongoose=require('mongoose');
const redis=require('redis');
const util=require('util');
const keys=require('../config/keys')
const client=redis.createClient(keys.redisUrl)

client.hget=util.promisify(client.hget)

const exec=mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache=function(options={}){
    this.useCache=true;
    this.hashKey=JSON.stringify(options.key||'');
    return this  //to make it chainable .cache()
}

mongoose.Query.prototype.exec=async function(){
 if(!this.useCache){
         return exec.apply(this,arguments)
    }

    
const key=JSON.stringify(Object.assign({},this.getQuery(),{
    collection:this.mongooseCollection.name
}))

//seee if we have value for key in redis
const cacheValue=await client.hget(this.hashKey,key)

//if we do return
if(cacheValue){
    //to attach the mongoose instance to a simple object as it was strigify
  const doc= JSON.parse(cacheValue)
  return Array.isArray(doc) ? doc.map(d=>new this.model(d)): new this.model(doc);

}

//otherwise issue query and store result in redis
 const result=await exec.apply(this,arguments);
 client.hset(this.hashKey,key,key,JSON.stringify(result),'EX',10);
    return result
}


module.exports={
    clearHash(hashKey){
     client.del(JSON.stringify(hashKey))
    }
}