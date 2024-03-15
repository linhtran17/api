const express = require("express")

const deviceCtrl = require("./controller")

const router = express.Router();

// get list
router.get("/", async (req, res) => {
    const result = await deviceCtrl.find()
    res.json({ data: result })
})

//  get by id
router.get("/:id", async (req, res) => {
    const result = await deviceCtrl.findById(req.params.id)
    res.json({ data: result })
})
// add new
router.post("/", (req, res) => {
    const result = deviceCtrl.add(req.body || {})
    res.json({ data: result })
})

router.put("/:id", (req, res) => {
    const result = deviceCtrl.update(req.params.id, req.body || {})
    res.json({ data: result })
})


router.delete("/:id", (req, res) => {
    const result = deviceCtrl.delete(req.params.id)
    res.json({ data: result })
})



module.exports = router