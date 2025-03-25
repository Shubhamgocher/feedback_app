import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:Number

}
const connection:ConnectionObject={};
async function ConnectDb(){
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }

    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || '');
        console.log(db);
        connection.isConnected=db.connections[0].readyState
        console.log("Db is connected sucessfully");
    } catch (error) {
        console.log(`Failed to connect db error:${error}`);
        process.exit(1);
        
    }
}
export default ConnectDb;