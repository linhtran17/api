const express = require("express")
const cors = require("cors")
const boderParser = require("body-parser")
const deviceRouter = require("./router")
const controller = require("./controller")

const log = console.log

const app = express();

app.use(cors())
app.use(boderParser.json())


app.get("/", (req, res) => {
    res.json({
        message: "Wellcome FireAlert API ",
        status: true,
    })
})

app.use("/api/device", deviceRouter)

app.post("/api/receive/:id", async function (req, res) {
    try {
        const temp = await controller.findById(req.params.id);
        if (!temp) {
            return res.json({ status: false, message: "Faild" })
        }
        controller.receive(req.params.id, req.body)
        res.json({ status: true, message: "Successful" })
    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
})

app.listen(3000, function (rs) {
    log("App listening port http://localhost:3000");
})