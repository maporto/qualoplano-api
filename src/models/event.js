const { type, model, Schema } = require('dynamoose');
const uuid = require('uuid');

const EventSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuid.v1(),
    required: true
  },
  user_session: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    enum: ['compare']
  },
  value: {
    type: type.ANY
  }
},
{
  timestamps: true,
});

module.exports = model('Event', EventSchema);