let frequency = 0
let distance = 0
let lastKiblatTime = 0
let lastAlarmTime = 0
let currentTime = 0
let derajat = 0
let fajrTime = 5 * 60 * 60
let dzuhurTime = 12 * 60 * 60
let asarTime = 15 * 60 * 60
let maghribTime = 18 * 60 * 60
let isyaTime = 19 * 60 * 60
basic.forever(function () {
    derajat = input.compassHeading()
    currentTime = input.runningTime() / 1000
    // Alarm untuk waktu sholat (berbunyi 5 detik)
    if (Math.abs(currentTime - fajrTime) < 60 || Math.abs(currentTime - dzuhurTime) < 60 || Math.abs(currentTime - asarTime) < 60 || Math.abs(currentTime - maghribTime) < 60 || Math.abs(currentTime - isyaTime) < 60) {
        if (currentTime - lastAlarmTime > 60) {
            pins.analogWritePin(AnalogPin.P0, 512)
            basic.pause(5000)
            pins.analogWritePin(AnalogPin.P0, 0)
            lastAlarmTime = currentTime
        }
    }
    // Deteksi arah Kiblat (293° ±10°)
    if (derajat > 283 && derajat < 303) {
        basic.showArrow(ArrowNames.North)
        if (currentTime - lastKiblatTime > 3) {
            distance = Math.abs(derajat - 293)
            frequency = 1000 + 100 * distance
            pins.analogSetPitchPin(AnalogPin.P0)
            music.ringTone(frequency)
            basic.pause(3000)
            music.stopAllSounds()
            lastKiblatTime = currentTime
        }
    } else {
        basic.showIcon(IconNames.No)
        music.stopAllSounds()
    }
})
