let devices = [
    {
        "id": "device_floor_1",
        "name": "Area 1-01"
    },
    {
        "id": "device_floor_1_02",
        "name": "Area 1-02"
    },
]

module.exports = {
    find: async function () {
        return devices;
    },
    findById: async function (id) {
        for (let inx = 0; inx < devices.length; inx++) {
            const element = devices[inx];
            if (element.id === id) {
                return element;
            }
        }
        return null;
    },
    add: function (device) {
        const tmp = this.findById(device.id)
        if (tmp) {
            return { message: "DEVICE EXISTS" }
        }
        device.time = (new Date()).getTime()
        devices.push(device)
        return device;
    },
    update: function (id, device) {
        for (let index = 0; index < devices.length; index++) {
            const element = devices[index];
            if (element.id === id) {
                devices[index] = device
                return devices[index]
            }
        }
        return false;
    },
    delete: function (deviceId) {
        devices = devices.filter(({ id }) => id !== deviceId)
    },
    receive: async function (deviceId, data) {
        const item = await this.findById(deviceId);
        if (item) {
            item.logs = data
            this.update(deviceId, item);
            return item;
        }
        return null
    }
}