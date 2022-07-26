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
            required : false,
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
            required : false,
            default : "basic-user"
        },
               
        userStatus : {
            type : String,
            required : false,
            default : "normal"
        },

        InCaseOAuth : {
            type : String,
            required : false,
            default : 'byEmail'
        } 
        
  
},

{
    collection : 'users',
    timestamps : true
}
        
   
    
);

export {UserSchema};