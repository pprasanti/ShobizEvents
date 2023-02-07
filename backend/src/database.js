import mongoose from 'mongoose';
import 'dotenv/config';

async function dbConnect() {
    mongoose.set('strictQuery', false);
    mongoose
        .connect(
            'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD
            + '@cluster0.gaazwqw.mongodb.net/shobizevents?retryWrites=true&w=majority'
        )
        .then(() => {
            console.log('Successfully connected to MongoDB Atlas!')
        })
        .catch((error) => {
            console.log('Unable to connect to MongoDB Atlas!');
            console.error(error);
        });
    mongoose.Collection = "shobizevents";
}

export default dbConnect;
