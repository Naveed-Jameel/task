var express = require("express");
var router = express.Router();
const CheckupVenueModel = require("./CheckupVenueModel");
const EmployeeSlotModel = require("./EmployeeSlotModel");

///////////// BELOW ARE EMPLOYEE END POINTS ////////////////////

// list all available venues
router.get("/", async function (req, res, next) {
  try {
    let availableVenue = await CheckupVenueModel.find();
    res.status(200).send({ availableVenue });
  } catch {
    res.status(400).send({ msg: "bad request" });
  }
});

// book a slot
router.post("/book", async function (req, res, next) {
  try {
    let book = new EmployeeSlotModel(req.body);
    await book.save();
    res.status(200).send({ availableVenue, msg: "successfully booked" });
  } catch {
    res.status(400).send({ msg: "bad request" });
  }
});

// reschedule a slot
router.put("/reschedule/:id", async function (req, res, next) {
  try {
    const newSchedule = req.body.schedule;
    let id = req.query.id;
    let reschedule = await EmployeeSlotModel.findByIdAndUpdate(
      id,
      {
        scheduledAt: newSchedule,
      },
      { new: true }
    );

    res.status(200).send({ reschedule, msg: "successfully reschedule" });
  } catch {
    res.status(400).send({ msg: "bad request" });
  }
});

// cancel already booked slot
router.put("/cancel/:id", async function (req, res, next) {
  try {
    let id = req.query.id;
    let status = req.body.status;
    let cancel = await EmployeeSlotModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    res.status(200).send({ msg: "cancel successfully" });
  } catch {
    res.status(400).send({ msg: "bad request" });
  }
});

///////////// BELOW ARE ORGANIZATION END POINTS ////////////////////

// book a venue
router.post("/", async function (req, res, next) {
  try {
    let newVenue = new CheckupVenueModel(req.body);
    await newVenue.save();
    res.status(200).send({ newVenue, msg: "successfully added" });
  } catch {
    res.status(400).send({ msg: "bad request" });
  }
});

// remove a venue
router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.query.id;
    await CheckupVenueModel.findByIdAndDelete(id);

    res.status(200).send({ msg: "deleted successfully" });
  } catch {
    res.status(400).send({ msg: "bad request" });
  }
});

// slots booked by employees
router.get("/", async function (req, res, next) {
  try {
    let slots = await EmployeeSlotModel.find().populate(
      "EmployeeSchemaName",
      "VenueSchemaName"
    );
    res.status(200).send({ slots });
  } catch {
    res.status(400).send({ msg: "bad request" });
  }
});

// mark slot complete
router.put("/:id", async function (req, res, next) {
  try {
    let id = req.query.id;
    let status = req.body.status;
    let changeStatus = await EmployeeSlotModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    res.status(200).send({ msg: "cancel successfully" });
  } catch {
    res.status(400).send({ msg: "bad request" });
  }
});

module.exports = router;
