const router = require("express").Router();
const db = require("../data/db");
// Routers
router.get("/", (req, res) => {
  // res.status(200).json({ router: "students router" });
  db.find(req.query)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "this is an error" });
    });
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  db.findById(id)
    .then((e) => {
      if (e) {
        res.status(200).json(e);
      } else {
        res.status(404).json({ message: "Hub not found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the e",
      });
    });
});

module.exports = router;
