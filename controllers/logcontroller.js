let express = require('express');
let router = express.Router();
let Log = require('../db').import('../models/log');
let validateSession = require('../middleware/validate-session');

// create route for practice route
// assignment
// localhost:3000/log/practice

router.get('/practice',validateSession ,function(req, res){
    res.send('practice route works')
});

// Create Workout
router.post("/", validateSession, function (req, res) {
    const workoutEntry = {
      description: req.body.description,
      definition: req.body.definition,
      result: req.body.result,
      owner_id: req.user.id,
    };
    Log.create(workoutEntry)
      .then((log) => res.json(log))
      .catch((err) => res.json({ error: err }));
  });

// get all logs of user logged in
router.get('/', validateSession, (req, res) => {
    Log.findAll()
      .then(logs => res.status(200).json(logs))
      .catch(err => res.status(500).json({ error: err}))

});

router.put('/update/:entryId',validateSession, function (req, res) {
  const updatelog = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner_id: req.user.id,
  };
const query = {where: { id: req.params.entryId, owner_id: req.user.id } };
Log.update(req.body,  query)
  .then((workoutEntry) => res.status(200).json(workoutEntry))
  .catch((err) => res.status(500).json({ error: err}));

  });
 router.delete('/delete/:entryId', validateSession, function (req, res) {
   const query = { where: {id: req.params.entryId, owner_id: req.user.id } }

Log.destroy(query)
   .then(() => res.status(200).json({ message: "Log entry Removed"}))
   .catch((err) => res.status(500).json({ error: err}) );
   });

module.exports = router;

