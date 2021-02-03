let express = require('express');
let app = express();
let sequelize = require('./db');
let logController = require('./controllers/logcontroller');
let userController = require('./controllers/usercontroller')

sequelize.sync();

app.use(express.json());
app.use('/user', userController);
app.use('/log', logController);


app.listen(3000, function() {
    console.log('App is listening on port 3000 dudeman');
});