const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        console.log("try block")
        const conn = await mongoose.connect(process.env.MONGO_URI)
    

    console.log(`mongo connection ${conn.connection.host}`);
  } catch (err) {
      throw new Error("could not connect", err);
      process.exit(1);
  }  
};     

module.exports = connectDB;     
