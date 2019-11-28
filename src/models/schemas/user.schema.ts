// import * as mongoose from 'mongoose';
// // import * as bcrypt from 'bcrypt';

// export const UserSchema = new mongoose.Schema({
//     id: {
//         type: String,
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     role: {
//         type: String,
//         required: true,
//     },
//     active: {
//         type: Boolean,
//         required: true,
//     },
//     cypher: {
//         type: String,
//     },
// });

// UserSchema.pre('save', function(next) {

//     const user = this;
//     if (!user.isModified('password')) {return next(); }

//     bcrypt.genSalt(10, (err, salt) => {

//         if (err) {return next(err);
// }
//         bcrypt.hash(user.password, salt, (err, hash) => {

//             if (err) {return next(err); }
//             user.password = hash;
//             next();

//         });
//     });
// });

// UserSchema.methods.checkPassword = function(attempt, callback) {

//     const user = this;

//     bcrypt.compare(attempt, user.password, (err, isMatch) => {
//         if (err) {return callback(err); }
//         callback(null, isMatch);
//     });

// };
