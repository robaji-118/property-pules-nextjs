const { Schema, model, models } = require('mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, `email is required`],
        unique: true,
    },

    username:{
        type: String,
        required: [true, `username is required`],
    },

    images:{
        type: String,
    },

    bookmarks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
}, {
    timestamps: true
})

const User = models.User || model(`User`, userSchema);
export default User;