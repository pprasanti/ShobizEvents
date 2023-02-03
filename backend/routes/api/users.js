import express from "express";
import { v1 as uuid } from "uuid";
import users from "../../data/Users.js";

const router = express.Router();

//get all users
router.get('/', (req, res) => {
  const usersDtls = users.map(o => ({ id: o.id, name: o.name, email: o.email }));
  res.json(usersDtls);
})

//get user by id
router.get('/:id', (req, res) => {
  const user = users.filter(user => user.id === parseInt(req.params.id))

  if (user.length) {
    const picked = user.map(o => ({ id: o.id, name: o.name, email: o.email }));
    res.json(picked);
  } else {
    res.sendStatus(400);
  }
})

//add new user
router.post('/', (req, res) => {
  const newUser = {
    id: uuid(),
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  }

  if (!newUser.name || !newUser.password || !newUser.email) {
    return res.sendStatus(400);
  }

  users.push(newUser)
  const usersDtls = users.map(o => ({ id: o.id, name: o.name, email: o.email }));
  res.json(usersDtls);
})

//update an user
router.put('/:id', (req, res) => {
  const user = users.some(user => user.id === parseInt(req.params.id))

  if (user) {
    const updateUser = req.body;
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name
        user.password = updateUser.password ? updateUser.password : user.password
        user.email = updateUser.email ? updateUser.email : user.email
        res.json({ msg: 'User updated', user })
      }
    })
  } else {
    res.json({ msg: 'User Not found' })
  }

})

//Delete an user
router.delete('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))

  if (found) {
    const user1 = users.filter(user => user.id !== parseInt(req.params.id))
    const picked = user1.map(o => ({ id: o.id, name: o.name, email: o.email }));
    res.json({ msg: 'User deleted', picked })
  } else {
    res.sendStatus(400)
  }

})

export default router