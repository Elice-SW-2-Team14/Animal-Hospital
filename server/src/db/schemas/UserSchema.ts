import {Schema, Types} from 'mongoose';



const UserSchema = new Schema (
    {
        userName : {
            type :String,
            required : true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
        
        phoneNumber : {
            type : String,
            required : true,
        },  
        
        address: {
            type: new Schema(
            {
                postalCode: String,
                address1: String,
                address2: String,
            },
            {
                _id: false,
            }
            ),
            required: true,
        },
    
        pet : [
            {
            type : Types.ObjectId,
            ref : 'pets',
            required : false
        }
        ],

        role : {
            type : String,
            required : true,
            default : "basic-user"
        },
               
        userStatus : {
            type : String,
            required : true,
            default : "normal"
        }
        
  
},

{
    collection : 'users',
    timestamps : true
}
        
   
    
);

export {UserSchema};