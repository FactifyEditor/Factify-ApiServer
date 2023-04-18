import mongoose from 'mongoose';

const Language = mongoose.model(
     "Language",
     new mongoose.Schema({
        language: {
            required: true,
            type: String
        },
        value:{
            required: false,
            type: String  
        },
        font:{
            required: false,
            type: String  
        }

        
    })
);

export default Language;