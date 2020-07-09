const router = require("express").Router();

const Data = require("../data/db");
// Routers
router.get("/", (req, res) => {
  // res.status(200).json({ router: "students router" });
  Data.find(req.query)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Data.findById(id)
    .then((comment) => {
      const [commentNew] = comment;
      if (commentNew) {
        res.status(200).json(commentNew);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Data.findById(id)
    .then((comment) => {
      const [commentNew] = comment;
      if (commentNew) {
        Data.findPostComments(id)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: "The comments information could not be retrieved.",
            });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// POST
router.post("/", (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Data.insert(newPost)
      .then(() => {
        res.status(201).json(newPost);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error Posting the data",
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const updatedComment = req.body;
  const id = req.params.id;
  updatedComment.post_id = id;

  if (!updatedComment.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Data.findById(id).then((comment) => {
      const [commentN] = comment;
      if (commentN) {
        Data.insertComment(updatedComment)
          .then(() => {
            res.status(201).json(updatedComment);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database",
            });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Data.findById(id)
    .then((comment) => {
      const [commentN] = comment;
      if (commentN) {
        Data.remove(id)
          .then(() => {
            res.status(200).json(commentN);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "The post could not be removed." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed." });
    });
});

// PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedComment = req.body;
  if (!updatedComment.title || !updatedComment.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
  Data.findById(id)
    .then((comment) => {
      const [commentN] = comment;
      if (commentN) {
        Data.update(id, updatedComment)
          .then(() => {
            res.status(200).json(updatedComment);
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

module.exports = router;
