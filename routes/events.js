/*
  Event Routes
  /api/events
*/
const { Router } = require("express");
const router = Router();

const { 
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/event');
const { validateJWT } = require('../middlewares/validate-jwt');

//Get events
router.get('/', validateJWT, getEvent);

//Create event
router.post('/', validateJWT, createEvent);

//Update event
router.put('/:id', validateJWT, updateEvent);

//Delete event
router.delete('/:id', validateJWT, deleteEvent);
