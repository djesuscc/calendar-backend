const { response } = require('express');
const Event = require('models/Event');


const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events
  });
}

const createEvent = async (req, res = response) => {
  try {
    const event = new Event(req.body);
    event.user = req.uid;
    const eventDB = await event.save();
    res.status(201).json({
      ok: true,
      event:eventDB
    });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact admin'
    })
  }
  
}
const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'The event does not exist'
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have the privilege to edit this event'
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const updated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.json({
      ok: true,
      event: updated
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    })
  }
  res.json({
    ok: true,
    eventId
  });
}

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'The event does not exist'
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have the privilege to delete this event'
      });
    }

    const response = await Event.findByIdAndDelete(eventId);
    res.json({
      ok: true,
      event: response.id
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    })
  }

  res.json({
    ok: true,
    msg:'Delete event'
  });
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}