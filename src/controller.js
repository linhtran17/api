const { firebase } = require("./connectors")

const connector = firebase;

module.exports = {
    find: function () {
        return connector.find();
    },
    findById: function (id) {
        return connector.findById(id);
    },
    add: function (device) {
        return connector.add(device)
    },
    update: function (id, device) {
        return connector.update(id, device)
    },
    delete: function (deviceId) {
        return connector.delete(deviceId)
    },
    receive: function (deviceId, data) {
        if (!data.time) {
            data.time = (new Date()).getTime()
        }
        return connector.receive(deviceId, data)
    },

}