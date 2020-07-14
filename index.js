
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('./users', (req, res) =>{
  return res.json(users);
});
app.get('./users/1', (req, res)=>{
  return res.json(users[0]);
})
app.get('./users/:userId', (req, res)=>{
  const id = req.params.userId;
  console.log(id); //console.log for visual representation
  const filteredUsers = users.filter(user => user._id === Number(id))
  console.log(filteredUsers);
  res.json(filteredUsers);
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))