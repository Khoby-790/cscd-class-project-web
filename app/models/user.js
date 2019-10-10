import { Schema, model, Types } from 'mongoose';


const schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    pin: {
        type: String,
        required: true,
        min: 5
    },
    user: {
        type: Types.ObjectId,
        ref:'Student'
    }
})


export default model('User',schema);


