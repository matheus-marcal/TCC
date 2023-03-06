const express = require("express");
const router = express.Router();
const kafkaPublisherService = require("./kafkaPublisherService")

router.get("/", function (req, res) {
    res.send("You are in Kafka Get");
  });

router.post("/", async function(req, res){
    const data = await kafkaPublisherService.save(req.body)
    res.status(200)
    res.send(data)
})

module.exports = router;