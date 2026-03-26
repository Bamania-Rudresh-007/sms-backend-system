import mongoose from "mongoose";

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_KEY)
            .then(() => console.log("succesfully mongodb connected"))
            .catch((error) => console.log(error))
    }
    catch(error){
        console.log("Failed connecting to mongoDb server Erorr: ", error)
    }
}

export default connectDb;