const { model, Schema } = require('dynamoose');

const UserSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    hashKey: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
});

module.exports = model('User', UserSchema);