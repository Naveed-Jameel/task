var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send([1, 2, 3, 4, 5]);
});

module.exports = router;
