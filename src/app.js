require('./dynamo');
const express = require('express');
const morgan = require('morgan');
const { PORT, isProduction } = require('./config');
const routes = require('./routes');
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(routes);

function mountApp() {
	if (isProduction()) {
		const sls = require('serverless-http')

		return sls(app);
	} else {
		app.listen(PORT, () => {
			console.log(`Express server started on port ${PORT}.`);
		});

		return app;
	}
}

module.exports = mountApp();