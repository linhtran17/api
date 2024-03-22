const axios = require("axios")



module.exports = function (req, res) {
    const { name, status } = req.info
    if (status > 0)
    axios.default.get("https://api.telegram.org/bot7171527047:AAHlCTLaFa-OF8997Iq9eG8RtEc62whJhqE/sendMessage", { 
        params: {
            chat_id: "-4120505488", text: `${name} bat thuong lúc ${new Date().toLocaleString()}`
        }
     })
}