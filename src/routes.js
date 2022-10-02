const routes = require('express').Router();
const Event = require('./models/event.js');
const { middlewareToken: authMiddleware, signin } = require('./auth');
const { createUser, getUsers } = require('./controllers/user');

routes.post('/events', async(req, res)=>{
  const event = await Event.create(req.body);
  return res.json(event);
});

routes.get('/users', authMiddleware, getUsers);

routes.post('/users', createUser);

routes.post('/login', signin, async(req, res) => {
  return res.json(req.user);
});

module.exports = routes;
