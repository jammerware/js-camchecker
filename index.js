function loadVideoDevices() {
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            let videoDevices = [];
            let select = document.getElementsByTagName('select')[0];

            devices.forEach(function (device) {
                if (device.kind === 'videoinput') {
                    console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
                    videoDevices.push(device);

                    let option = document.createElement('option');
                    option.text = device.deviceId;
                    option.value = device.deviceId;
                    select.options.add(option)
                }
            });
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });
}

function displayDevice(id) {
    if (!id) {
        let select = document.getElementsByTagName('select')[0];
        id = select.value;
    }

    navigator.mediaDevices.getUserMedia({ video: { deviceId: id } })
        .then(function (stream) {

            let video = document.getElementsByTagName('video')[0];
            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
                video.play();
            }
        })
        .catch(function (err) {
            console.log('error', err);
        });
}

(function () {
    displayDevice();
    loadVideoDevices();
})();
