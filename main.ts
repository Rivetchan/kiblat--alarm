let frequency = 0
let distance = 0
let derajat = 0
let lastKiblatTime = 0

basic.forever(function () {
    derajat = input.compassHeading()

    // Jika menghadap Kiblat (292°–294°)
    if (derajat > 291 && derajat < 295) {
        basic.showArrow(ArrowNames.North)

        // Jika sudah lebih dari 2 detik sejak terakhir bunyi, bunyikan lagi
        if (input.runningTime() - lastKiblatTime > 2000) {
            distance = Math.abs(derajat - 293)
            frequency = 1000 + 100 * distance
            pins.analogSetPitchPin(AnalogPin.P0)
            music.ringTone(frequency)
            basic.pause(2000) // Buzzer berbunyi selama 2 detik
            music.stopAllSounds()
            lastKiblatTime = input.runningTime()
        }
    } else {
        basic.showIcon(IconNames.No)
        music.stopAllSounds() // Matikan suara jika tidak menghadap Kiblat
    }
})
