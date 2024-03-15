const { ref, set, onValue, get, child } = require("firebase/database");
const databse = require("../../firebase-config")

const ROOT = "devices"

function getPathWithId(id) {
    return `${ROOT}/${id}`
}

const refDevice = ref(databse, ROOT)

module.exports = {
    find: function () {
        return new Promise((resolve, reject) => {
            get(refDevice).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const list = []
                    for (let key in data) {
                        list.push(data[key])
                    }
                    resolve(list)
                } else {
                    resolve([])
                }
            }).catch((error) => {
                reject(error)
            });
        });
    },
    findById: function (id) {
        return new Promise((resolve, reject) => {
            const refItem = child(refDevice, `${id}`)
            get(refItem).then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val())
                } else {
                    resolve(null)
                }
            }).catch((error) => {
                reject(error)
            });
        });
    },
    add: function (device) {
        const refItem = child(refDevice, `${device.id}`)
        set(refItem, device);
    },
    update: function (id, device) {
        const refItem = child(refDevice, `${id}`)
        set(refItem, device);
    },
    delete: function (id) {
        set(ref(databse, getPathWithId(id)), null);
    },
    receive: async function (deviceId, data) {
        const refItem = child(refDevice, `${deviceId}/logs`)
        if (!refItem)
            return null
        set(refItem, data);
        return data
    }
}
