import {Schema, Types} from 'mongoose';


const PetSchema = new Schema({
    owner : {
        type : String,
        required : true
    },
    
    species : 
    {
        type : String,
        required : true
    },
    
    breed : 
        {
            type : String,
            required : true
        }
    ,
    name : 
        {
            type : String,
            required : true
        },

    age :     
        {
            type : Number,
            required : false
        },

    sex :
        {
            type : String,
            required : true
        },


    weight :
        {
            type : Number,
            required : true
        }, 

    medicalHistory : 
        {
            type : String,
            required : true
        },

    vaccination :
        {
            type : String,
            required : false
        },

    neutralized : 
        {
            type : String,
            required : false
        },

    image : 
        {
            type : String,
            required : false
        },
}, {
    collection : 'pets',
    timestamps : true
}

);

export {PetSchema}
