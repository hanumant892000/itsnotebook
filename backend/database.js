const mongoose = require("mongoose");

const connectToDB = async () => {

    // console.log(process.env.DB_URLS)

    try {
        await mongoose.connect(process.env.DB_URLS)
        console.log("Connected To Database")
    } catch (error) {
        console.log(error)
    }

}
module.exports = connectToDB;