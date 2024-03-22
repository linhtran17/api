const express = require("express")
const cors = require("cors")
const boderParser = require("body-parser")
const deviceRouter = require("./router")
const controller = require("./controller")
const alert = require("./alert")

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

app.post("/api/receive/:id", async function (req, res, next) {
    try {
        const temp = await controller.findById(req.params.id);
        if (!temp) {
            return res.json({ status: false, message: "NOT_EXISTS" })
        }
        controller.receive(req.params.id, req.body)

        const { logs, name }  = temp
        let status = -1;

        for(let key in logs) {
            if (logs[key].status > status) {
                status = logs[key].status;
            }
        }

        if (status > 0) {
            req.info = { name, status  };
            next()
        }

        res.json({ status: true, message: "Successful" })
    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}, alert)

app.listen(3000, function (rs) {
    log("App listening port http://localhost:3000");
})