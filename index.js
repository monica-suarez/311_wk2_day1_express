
const express = require('express')
const uuid = require('uuid');
const app = express()
const port = process.env.PORT || 4000
const { users } = require('./state')

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* BEGIN - create routes here */

//access current data
app.get('/users', (req, res) =>{
  return res.json(users);
});
app.get('/users/1', (req, res)=>{
  return res.json(users[0]);
});
app.get('/users/:userId', (req, res)=>{
  const id = req.params.userId;
  console.log(id); //console.log for visual representation
  const filteredUsers = users.filter(user => user._id === Number(id))
  console.log(filteredUsers);
  res.json(filteredUsers);
});

//create new user
app.post('/users', (req, res)=>{
  const newUser = {
    _id: uuid.v4(), 
    name: req.body.name,
    occupation: req.body.occupation, 
    avatar: req.body.avatar
  }
  if(!newUser.name || !newUser.occupation || !newUser.avatar){
    return res.status(400).json({msg: 'Must include user name, occupation, and avatar.'});
  }
  users.push(newUser);
  res.json(newUser);
});

//update first user 
app.put('/users/1', (req, res)=>{
  if(users[0]){
    const updateUser = req.body;
    user.name = updateUser.name ? updateUser.name : user.name;
    user.occupation = updateUser.occupation ? updateUser.occupation : user.occupation;
    user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;
    res.json(updateUser);
  }
});

//delete first user
app.delete('/users/1', (req, res)=>{
  
})

//update current user -any user
// app.put('/users/:userId', (req, res)=>{
//   const id = req.params.userId;
//   const filteredUsers = users.filter(user => user._id === Number(id))
//   if(filteredUsers){
//     const updateUser = req.body;
//     users.forEach(user => {
//       if(user._id === Number(id)){
//         user.name = updateUser.name ? updateUser.name : user.name;
//         user.occupation = updateUser.email ? updateUser.email : user.email;
//         user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;
//         res.json(updateUser);
//       }else{
//         res.status(400).json({ msg: 'No member with the id of ${req.params.userId}' })
//       }
//     })
//   }
//   });

  //delete user - any user
//   app.delete('/users/:userId', (req, res)=>{
//     const id = req.params.userId;
//     const filteredUsers = users.filter(user => user._id === Number(id))
//     if(filteredUsers){
//       res.json(users.filter(user => user._id !== Number(id)))
//       res.send({ msg: 'Deleted' });
//     }
// });

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))