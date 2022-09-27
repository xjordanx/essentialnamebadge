namespace SpriteKind {
    export const marquee = SpriteKind.create()
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    menupdate = 1
    action = 1
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (menuitem > 4) {
        menuitem = 0
    } else {
        menuitem += 1
    }
    menupdate = 1
})
function invisibleClock () {
    seconds.setDigitColor(0)
    minutes.setDigitColor(0)
    hours.setDigitColor(0)
    ampm.setDigitColor(0)
}
function displayClock () {
    seconds.setDigitColor(7)
    minutes.setDigitColor(9)
    hours.setDigitColor(5)
    ampm.setDigitColor(2)
}
let led_pulse = 0
let hourAdjust = 0
let menupdate = 0
let ampm: SevenSegDigit = null
let hours: DigitCounter = null
let minutes: DigitCounter = null
let seconds: DigitCounter = null
let menuitem = 0
let action = 0
let hourFlag = 0
let minuteFlag = 0
let userNAME = "Jorge Garcia"
action = 0
scene.setBackgroundImage(assets.image`blank`)
scene.setBackgroundColor(15)
menuitem = 0
let ALogo_WhiteOnBlack = assets.image`ALogo_WhiteOnBlack`
let ALogo_BlackOnWhite = assets.image`ALogo_BlackOnWhite`
let F360QR = assets.image`F360QR`
let F360icon = assets.image`f360icon`
let F360QR120 = assets.image`F360QR120`
if (control.deviceDalVersion() != "sim") {
    pins.P23.setPull(PinPullMode.PullDown)
    pins.P24.setPull(PinPullMode.PullDown)
}
let time = 248 * 60
seconds = sevenseg.createCounter(SegmentStyle.Thick, SegmentScale.Half, 2)
minutes = sevenseg.createCounter(SegmentStyle.Thick, SegmentScale.Full, 2)
hours = sevenseg.createCounter(SegmentStyle.Thick, SegmentScale.Full, 2)
ampm = sevenseg.createDigit(SegmentStyle.Thick, 0)
ampm.setScale(SegmentScale.Half)
ampm.setRadix(DigitRadix.Alpha)
seconds.x += 58
seconds.y += 8
minutes.x += 22
hours.x += -36
ampm.x += -66
ampm.y += -8
let textSprite = textsprite.create(userNAME, 0, 9)
textSprite.setMaxFontHeight(10)
textSprite.setPosition(79, 9)
game.onUpdateInterval(1000, function () {
    if (time >= 24 * 60 * 60) {
        time = 0
    }
    seconds.count = time % 60
    minutes.count = time / 60 % 60
    hourAdjust = Math.floor(time / (60 * 60) % 60)
    if (hourAdjust > 11) {
        ampm.setDigitAlpha(SegmentCharacter.P)
    } else {
        ampm.setDigitAlpha(SegmentCharacter.A)
    }
    if (hourAdjust > 12) {
        hourAdjust += -12
    } else if (hourAdjust == 0) {
        hourAdjust = 12
    }
    hours.count = hourAdjust
    time += 1
})
forever(function () {
    if (led_pulse == 1) {
        pins.D10.digitalWrite(true)
        timer.after(200, function () {
            pins.D10.digitalWrite(false)
        })
    }
    if (menupdate) {
        if (menuitem == 0) {
            led_pulse = 1
            invisibleClock()
            scene.setBackgroundColor(15)
            scene.setBackgroundImage(assets.image`ALogo_WhiteOnBlack`)
        } else if (menuitem == 1) {
            textSprite.destroy(effects.clouds, 200)
            led_pulse = 1
            invisibleClock()
            scene.setBackgroundColor(15)
            scene.setBackgroundImage(assets.image`F360QR120`)
        } else if (menuitem == 2) {
            led_pulse = 1
            scene.setBackgroundImage(assets.image`blank`)
            scene.setBackgroundColor(15)
            if (action) {
                time += 360
                action = 0
            }
            displayClock()
        } else if (menuitem == 3) {
            led_pulse = 1
            scene.setBackgroundImage(assets.image`blank`)
            scene.setBackgroundColor(15)
            if (action) {
                time += 60
                action = 0
            }
            displayClock()
        } else if (menuitem == 4) {
            invisibleClock()
            scene.setBackgroundImage(assets.image`blank`)
            led_pulse = 0
            pins.D9.digitalWrite(false)
            scene.setBackgroundColor(15)
        } else {
            pins.D9.digitalWrite(true)
        }
        menupdate = 0
    }
})
