let right_line = 0
let left_line = 0
let hue = 0
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 25)
let line_seen = 0
basic.pause(1000)
basic.showIcon(IconNames.Happy)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
basic.forever(function () {
    strip.setPixelColor(0, neopixel.hsl(hue, 100, 50))
    strip.setPixelColor(1, neopixel.hsl(hue + 25, 100, 50))
    strip.setPixelColor(2, neopixel.hsl(hue + 50, 100, 50))
    strip.setPixelColor(3, neopixel.hsl(hue + 75, 100, 50))
    strip.show()
    hue += 1
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 5) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 27)
    } else {
        left_line = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
        right_line = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
        if (right_line == 0 || left_line == 0) {
            line_seen = 100
        }
        if (left_line == 0) {
            if (right_line == 0) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 25)
            } else {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 10)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 35)
            }
        } else {
            if (line_seen > 96) {
                line_seen += -1
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 35)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 10)
            } else if (line_seen > 0) {
                line_seen += -1
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 25)
            } else {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 28)
            }
        }
    }
})
