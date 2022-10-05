const routes = require('express').Router();
const Event = require('./models/event.js');
const { middlewareToken: authMiddleware, signin } = require('./auth');
const { createUser, getUsers } = require('./controllers/user');

routes.post('/events', async ({
  body
}, res) => {
  const event = await Event.create({
    user_session: body.user_session,
    name: body.name,
    value: body.value,
  });

  return res.json(event);
});

routes.get('/events', authMiddleware, async (req, res) => {
  const events = await Event.scan().exec();

  return res.json(events);
});

routes.get('/users', authMiddleware, getUsers);

routes.post('/users', createUser);

routes.post('/login', signin, async(req, res) => {
  return res.json(req.user);
});

module.exports = routes;
