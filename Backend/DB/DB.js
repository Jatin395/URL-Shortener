const mongoose = require('mongoose');

const connection = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO)
            .then(() => {
                console.log("Mongoose Connected");
            })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection