const express = require("express");
const router = express.Router();
var uniqid = require("uniqid");

// Database
let users = [];

// Get all users
router.get("/", (req, res) => {
  res.status(200).send(users);
});

// Get a specific user
router.get("/:id", (req, res) => {
  let selectedUser = users.find((user) => user.id == req.params.id);
  if (!selectedUser) {
    res.status(500).send(`User with id ${req.params.id} not found`);
  } else {
    res.status(200).send(selectedUser);
  }
});

// Add a user
router.post("/", (req, res) => {
  users.push({ id: uniqid(), ...req.body });
  res.status(200).send("User has been added!");
});

// Update a specific user
router.patch("/:id", (req, res) => {
  let selectedUser = users.find((user) => user.id == req.params.id);

  if (selectedUser) {
    if (req.body.firstName) selectedUser.firstName = req.body.firstName;
    if (req.body.lastName) selectedUser.lastName = req.body.lastName;
    if (req.body.age) selectedUser.age = req.body.age;

    res.status(200).send(`User with id ${req.params.id} has been updated!`);
  } else {
    res.status(500).send(`User with id ${req.params.id} not found`);
  }
});

// Delete a specific user
router.delete("/:id", (req, res) => {
  filteredUsers = users.filter((user) => user.id != req.params.id);

  if (filteredUsers.length === users.length) {
    res.status(500).send(`User with id ${req.params.id} not found`);
  } else {
    res.status(200).send(`User with id ${req.params.id} has been deleted!`);
  }
});

module.exports = router;
