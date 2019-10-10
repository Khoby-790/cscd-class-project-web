import { Schema, model } from 'mongoose';


const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        min: 5
    }
})


export default model('Student',schema);


