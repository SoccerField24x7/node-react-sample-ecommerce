import mongoose from 'mongoose';
import crypto from 'crypto';
import uuidv1 from 'uuidv1';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true });

// methods
userSchema.methods = {
    'authenticate': function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    'encryptPassword': function(password) {
        if (!password) {
            return '';
        }

        try {
            return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

// virtual field(s)
userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(() => {
        return this._password;
    });

//module.exports = mongoose.model('User', userSchema);

export const User = mongoose.model('User', userSchema);
