import express from "express";
import { v1 as uuid } from "uuid";
import venues from "../../data/Venues.js";

const router = express.Router();

//get all venues
router.get('/', (req, res) => {
  res.json(venues);
})

//get venue by id
router.get('/:id', (req, res) => {
  const venue = venues.filter(venue => venue.id === parseInt(req.params.id))

  if (venue.length) {
    res.json(venue);
  } else {
    res.sendStatus(400);
  }
})

//add new venue
router.post('/', (req, res) => {
  const newVenue = {
    id: uuid(),
    name: req.body.name,
    address: req.body.address,
  }

  console.log(newVenue);
  if (!newVenue.name || !newVenue.address) {
    return res.sendStatus(400);
  }

  venues.push(newVenue)
  res.json(venues);
})

//update an venue
router.put('/:id', (req, res) => {
  const venue = venues.some(venue => venue.id === parseInt(req.params.id))

  if (venue) {
    const updateVenue = req.body;
    venues.forEach(venue => {
      if (venue.id === parseInt(req.params.id)) {
        venue.name = updateVenue.name ? updateVenue.name : venue.name
        venue.address = updateVenue.address ? updateVenue.address : venue.address
        res.json({ msg: 'Venue updated', venue })
      }
    })
  } else {
    res.json({ msg: 'Venue not found' })
  }

})

//Delete an venue
router.delete('/:id', (req, res) => {
  const found = venues.some(venue => venue.id === parseInt(req.params.id))

  if (found) {
    const venue1 = venues.filter(venue => venue.id !== parseInt(req.params.id))
    res.json({ msg: 'Venue deleted', venue1 })
  } else {
    // res.sendStatus(400)
    res.status(400).json({msg: 'Venue not found'})
  }

})

export default router