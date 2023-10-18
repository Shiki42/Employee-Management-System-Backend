const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          });
    } catch (error) {
        console.log(error);
    }
};

connectDB();

