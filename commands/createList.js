const mongo = require("mongodb");
let mongoClient = mongo.MongoClient;
let url = "mongodb://localhost:27017/arcane-bot";
let db;
let index = require('../index');
mongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
    db = client.db("arcane-bot");
    if(err){
        throw err;
    }
})
module.exports = {
	name: 'createlist',
	description: 'creates an empty list of insults for your server',
	execute(msg, args) {
        db.collection("LinkServerToCollection").findOne({ServerID: msg.guild.id}, (err, document)=>{
            if(err) throw err;
            if(document){
                msg.channel.send("Limit one collection per server rn(i'll change it to allow more later i just need this to work rn)")
            }else{
                db.listCollections({name: `${args}`})
                .next((err, collection)=>{
                    if (collection) {
                        msg.react("❌");
                        msg.channel.send("this collection name already exists; pick another name");
                        return;
                    }else{
                        if(args == ""){
                            msg.react("❌");
                            msg.channel.send("give it a name bro; like this: $createlist *yournamehere*");
                            return;
                        }else if(args[0].toString().length < 2){
                            msg.react("❌");
                            msg.channel.send("make your name longer, like at least 3 letters. gotta make it look good y'know?");
                        }else{
                            msg.react("✅");
                            msg.channel.send(`***${args}*** has been created`);
                            db.collection("LinkServerToCollection").insertOne({ServerID: msg.guild.id, collectionName: `${args}`, currentCollection: "insults", target:"437808476106784770".toString()});
                            db.createCollection(`${args}`, (err,res)=>{
                                if(err){
                                    throw err;
                                }
                                console.log("collection created");
                            })
                        }
                    }
                });
            }
        })
    },
}