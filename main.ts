enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy
}
enum ActionKind {
    Walking,
    Idle,
    Jumping,
    hopping,
    idle,
    hopLeft,
    idleLeft,
    hopRight,
    idleRight,
    hopDown,
    idleDown,
    dead
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.setAction(chicken, ActionKind.hopping)
    chicken.y += -15
    music.playTone(440, music.beat(BeatFraction.Sixteenth))
    music.playTone(392, music.beat(BeatFraction.Sixteenth))
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (chicken.y > 115) {
        animation.setAction(chicken, ActionKind.idle)
        chicken.y = 118
    } else if (chicken.y < 15) {
        animation.setAction(chicken, ActionKind.idleDown)
        chicken.y = 0
    } else {
        animation.setAction(chicken, ActionKind.idleDown)
    }
})
sprites.onOverlap(SpriteKindLegacy.Player, SpriteKindLegacy.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    animation.setAction(chicken, ActionKind.dead)
    music.playTone(131, music.beat(BeatFraction.Sixteenth))
    music.playTone(139, music.beat(BeatFraction.Sixteenth))
    pause(200)
    animation.setAction(chicken, ActionKind.idle)
    chicken.setPosition(82, 118)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.setAction(chicken, ActionKind.hopLeft)
    chicken.x += -11
    music.playTone(440, music.beat(BeatFraction.Sixteenth))
    music.playTone(392, music.beat(BeatFraction.Sixteenth))
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (chicken.y > 115) {
        animation.setAction(chicken, ActionKind.idle)
    } else if (chicken.y < 15) {
        animation.setAction(chicken, ActionKind.idleDown)
        chicken.y = 0
    } else {
        animation.setAction(chicken, ActionKind.idleRight)
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (chicken.y > 115) {
        animation.setAction(chicken, ActionKind.idle)
    } else if (chicken.y < 15) {
        animation.setAction(chicken, ActionKind.idleDown)
        chicken.y = 0
    } else {
        animation.setAction(chicken, ActionKind.idleLeft)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.setAction(chicken, ActionKind.hopRight)
    chicken.x += 11
    music.playTone(440, music.beat(BeatFraction.Sixteenth))
    music.playTone(392, music.beat(BeatFraction.Sixteenth))
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (chicken.y < 15) {
        animation.setAction(chicken, ActionKind.idleDown)
        chicken.y = 0
    } else {
        animation.setAction(chicken, ActionKind.idle)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.setAction(chicken, ActionKind.hopDown)
    chicken.y += 15
    music.playTone(440, music.beat(BeatFraction.Sixteenth))
    music.playTone(392, music.beat(BeatFraction.Sixteenth))
})
sprites.onDestroyed(SpriteKindLegacy.Food, function (sprite) {
    egg = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 1 1 1 1 . . . . . . . . 
        . . . 1 1 1 1 1 1 1 . . . . . . 
        . . 1 1 1 1 1 1 1 1 1 . . . . . 
        . . 1 1 1 1 1 1 1 1 1 1 . . . . 
        . . 1 1 1 1 1 1 1 1 1 . . . . . 
        . . . 1 1 1 1 1 1 1 . . . . . . 
        . . . . 1 1 1 1 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKindLegacy.Food)
    egg.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
})
sprites.onOverlap(SpriteKindLegacy.Player, SpriteKindLegacy.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    music.playTone(880, music.beat(BeatFraction.Sixteenth))
})
let egg: Sprite = null
let chicken: Sprite = null
let sprite: Sprite = null
let otherSprite: Sprite = null
otherSprite = null
sprite = null
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeefdeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeedeeeeeeeeeeeeeeeeeeefeeeedeeeeeeeeeeeeeeeeeeeeeeeeedeeefeeeeeeeeeeeeeeeeeeefeeeeeeefeeedeeeeeeefeeeeeeeee
    eeeefeeeeeeefedeeeeeeeefeeeefeefeeeedeeeeeeeeeeeefeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeeefeeeeedeeeeefeeeeeeeedeeeeefeefeeeedeeeeeedeeeeeeeeeeeeeeeeeeedeeeeee
    eeeeeeedeeeeeeeeeeeeeeeeeeeeeeeeeeedeeeefeeeeeeeeeeeeeeeeeeeefeeeeeeeeeedeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    11111fffff1111fffff1111fffff1111fffff1111fffff11111fffff1111fffff1111fffff1111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff1111fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    11111fffff1111fffff1111fffff1111fffff1111fffff11111fffff1111fffff1111fffff1111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff1111fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    11111fffff1111fffff1111fffff1111fffff1111fffff11111fffff1111fffff1111fffff1111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff1111fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    11111fffff1111fffff1111fffff1111fffff1111fffff11111fffff1111fffff1111fffff1111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff1111fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    11111fffff1111fffff1111fffff1111fffff1111fffff11111fffff1111fffff1111fffff1111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff1111fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    11111fffff1111fffff1111fffff1111fffff1111fffff11111fffff1111fffff1111fffff1111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff11111fffff1111fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeefeeeeeeeefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeedeeeeeeeeefeeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeedeeeeeeefeeeeeeeeeeeefeeeeeefeeeefeeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeedeeeeeeeeeeeeeeeeeeeeedeeeeeeeefeeeeeeeefee
    eeeeeefeeeefeeeeeeeeeefeeeeeeeeefeeeeedeeefeeeeeeeeeefeeeeeeeeeeeeeeedeeeeeeeeefeeeeeeeeeefeeeeeeeeefeedeefeeeeeeefeeeeeeedeeeefeeeefeeefeeeeeeeeeeeeeeeefeeeeee
    eeeeeeeeeeeeeeeeedeeeeeeeeeeeeeeeeeeeeeeeeeeeeedeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeedeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeedeeeeeeeeeeeeeeeeee
    `)
info.setLife(3)
info.setScore(0)
let anim = animation.createAnimation(ActionKind.hopping, 80)
let anim1 = animation.createAnimation(ActionKind.idle, 80)
let anim2 = animation.createAnimation(ActionKind.hopLeft, 20)
let anim3 = animation.createAnimation(ActionKind.idleLeft, 80)
let anim4 = animation.createAnimation(ActionKind.hopRight, 80)
let anim5 = animation.createAnimation(ActionKind.idleRight, 80)
let anim6 = animation.createAnimation(ActionKind.hopDown, 80)
let anim7 = animation.createAnimation(ActionKind.idleDown, 80)
let anim8 = animation.createAnimation(ActionKind.dead, 0)
chicken = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . e . . . . . . . . 
    . . . . . 4 . 4 . . . . . . . . 
    `, SpriteKindLegacy.Player)
chicken.setFlag(SpriteFlag.StayInScreen, false)
let carSprite = sprites.create(img`
    . c c c c c . . . c c c c c . . 
    . c c c c c . . . c c c c c . . 
    . . . c . . . . . . . c . . . . 
    . 7 7 7 7 7 7 a f f f f f f . . 
    a a a a a a a 7 7 6 6 6 6 7 f . 
    . 7 7 7 7 7 7 7 7 7 6 6 6 6 7 f 
    . 7 7 7 7 7 7 7 7 7 6 6 6 6 7 f 
    a a a a a a a 7 7 6 6 6 6 7 f . 
    . 7 7 7 7 7 7 a a f f f f f . . 
    . . . c . . . . . . . c . . . . 
    . c c c c c . . . c c c c c . . 
    . c c c c c . . . c c c c c . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKindLegacy.Enemy)
let carSprite2 = sprites.create(img`
    . . . 1 1 . . . . . 1 1 1 . . . 
    . 9 2 2 2 2 2 . . 2 2 2 2 2 . . 
    4 2 2 2 2 4 4 2 9 2 2 2 2 2 5 . 
    4 5 2 2 4 4 2 2 2 2 4 4 4 2 2 . 
    4 2 2 2 4 4 2 2 2 2 4 4 4 2 2 . 
    4 2 2 2 4 4 2 2 2 2 4 4 4 2 2 . 
    4 5 2 2 4 4 2 2 2 2 4 4 4 2 2 . 
    4 2 2 2 2 4 4 2 9 2 2 2 2 2 5 . 
    . 9 2 2 2 2 2 . . 2 2 2 2 2 . . 
    . . . 1 1 . . . . . 1 1 1 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKindLegacy.Enemy)
let carSprite3 = sprites.create(img`
    ...eee..eee.........eee.........
    .caaaa.aaaaaaaaaaaaaaaaa........
    aa5aaa.aaaaaaaaaaaaaaaa5........
    aa5aaacaaaaaaaaaaaaaaaaa........
    aa5aaa2aaaaaaaaaaaaaaaaa........
    aa5aaa2aaaaaaaaaaaaeaaaa........
    aa5aaacaaaaaaaaaaafefaaa........
    aa5aaa.aaaaaaaaaaeefeea5........
    .caaaa.aaaaaaaaaaafafaaa........
    ...eee..eee......ff.ffe.........
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    `, SpriteKindLegacy.Enemy)
let carSprite4 = sprites.create(img`
    . c c c c c . . . c c c c c . . 
    . c c c c c . . . c c c c c . . 
    . . . c . . . . . . . c . . . . 
    . 7 7 7 7 7 7 a f f f f f f . . 
    a a a a a a a 7 7 6 6 6 6 7 f . 
    . 7 7 7 7 7 7 7 7 7 6 6 6 6 7 f 
    . 7 7 7 7 7 7 7 7 7 6 6 6 6 7 f 
    a a a a a a a 7 7 6 6 6 6 7 f . 
    . 7 7 7 7 7 7 a a f f f f f . . 
    . . . c . . . . . . . c . . . . 
    . c c c c c . . . c c c c c . . 
    . c c c c c . . . c c c c c . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKindLegacy.Enemy)
let carSprite5 = sprites.create(img`
    . . . . . f f . . . . . . . . . 
    . . . . 4 f 1 f . . . . . . . . 
    . . . . . f 1 f . . . . . . . . 
    . . . . 4 f 1 1 f . . . . . . . 
    . . . . . f 1 1 1 f . . . . . . 
    f f f f f f f f f f f f f f . . 
    f 1 1 1 1 1 1 1 1 1 1 1 9 1 f . 
    f 1 1 1 1 1 1 1 1 1 1 1 1 9 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 9 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 9 1 f . 
    f f f f f f f f f f f f f f . . 
    . . . . . f 1 1 1 f . . . . . . 
    . . . . 4 f 1 1 f . . . . . . . 
    . . . . . f 1 f . . . . . . . . 
    . . . . 4 f 1 f . . . . . . . . 
    . . . . . f f . . . . . . . . . 
    `, SpriteKindLegacy.Enemy)
let carSprite6 = sprites.create(img`
    . . . . . f f . . . . . . . . . 
    . . . . 4 f 1 f . . . . . . . . 
    . . . . . f 1 f . . . . . . . . 
    . . . . 4 f 1 1 f . . . . . . . 
    . . . . . f 1 1 1 f . . . . . . 
    f f f f f f f f f f f f f f . . 
    f 1 1 1 1 1 1 1 1 1 1 1 9 1 f . 
    f 1 1 1 1 1 1 1 1 1 1 1 1 9 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 9 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 9 1 f . 
    f f f f f f f f f f f f f f . . 
    . . . . . f 1 1 1 f . . . . . . 
    . . . . 4 f 1 1 f . . . . . . . 
    . . . . . f 1 f . . . . . . . . 
    . . . . 4 f 1 f . . . . . . . . 
    . . . . . f f . . . . . . . . . 
    `, SpriteKindLegacy.Enemy)
let carSprite7 = sprites.create(img`
    . . . 1 1 . . . . . 1 1 1 . . . 
    . 9 2 2 2 2 2 . . 2 2 2 2 2 . . 
    4 2 2 2 2 4 4 2 9 2 2 2 2 2 5 . 
    4 5 2 2 4 4 2 2 2 2 4 4 4 2 2 . 
    4 2 2 2 4 4 2 2 2 2 4 4 4 2 2 . 
    4 2 2 2 4 4 2 2 2 2 4 4 4 2 2 . 
    4 5 2 2 4 4 2 2 2 2 4 4 4 2 2 . 
    4 2 2 2 2 4 4 2 9 2 2 2 2 2 5 . 
    . 9 2 2 2 2 2 . . 2 2 2 2 2 . . 
    . . . 1 1 . . . . . 1 1 1 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKindLegacy.Enemy)
let carSprite8 = sprites.create(img`
    .........eee.........eee..eee...
    ........aaaaaaaaaaaaaaaaa.aaaac.
    ........5aaaaaaaaaaaaaaaa.aaa5aa
    ........aaaaaaaaaaaaaaaaacaaa5aa
    ........aaaaaaaaaaaaaaaaa2aaa5aa
    ........aaaaeaaaaaaaaaaaa2aaa5aa
    ........aaafefaaaaaaaaaaacaaa5aa
    ........5aeefeeaaaaaaaaaa.aaa5aa
    ........aaafafaaaaaaaaaaa.aaaac.
    .........eff.ff......eee..eee...
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    `, SpriteKindLegacy.Enemy)
egg = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 1 1 1 1 . . . . . . . . 
    . . . 1 1 1 1 1 1 1 . . . . . . 
    . . 1 1 1 1 1 1 1 1 1 . . . . . 
    . . 1 1 1 1 1 1 1 1 1 1 . . . . 
    . . 1 1 1 1 1 1 1 1 1 . . . . . 
    . . . 1 1 1 1 1 1 1 . . . . . . 
    . . . . 1 1 1 1 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKindLegacy.Food)
animation.attachAnimation(chicken, anim)
animation.attachAnimation(chicken, anim1)
animation.attachAnimation(chicken, anim2)
animation.attachAnimation(chicken, anim3)
animation.attachAnimation(chicken, anim4)
animation.attachAnimation(chicken, anim5)
animation.attachAnimation(chicken, anim6)
animation.attachAnimation(chicken, anim7)
animation.attachAnimation(chicken, anim8)
chicken.setPosition(82, 118)
carSprite.setPosition(0, 108)
carSprite2.setPosition(160, 95)
carSprite3.setPosition(160, 89)
carSprite4.setPosition(0, 64)
carSprite5.setPosition(-7, 109)
carSprite6.setPosition(15, 50)
carSprite7.setPosition(160, 38)
carSprite8.setPosition(-10, 31)
egg.setPosition(83, 10)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . e . . . . . . . . 
    . . . . . 4 . 4 . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . 4 . . . . . . . . 
    . . . . . 4 . . . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . 4 . e . . . . . . . . 
    . . . . . 4 . e . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . 4 . e . . . . . . . . 
    . . . . . . . 4 . . . . . . . . 
    `)
anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . 4 . . . . . . . . 
    . . . . . e . 4 . . . . . . . . 
    `)
anim1.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . e . . . . . . . . 
    . . . . . 4 . 4 . . . . . . . . 
    `)
anim1.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . e . . . . . . . . 
    . . . . . 4 . 4 . . . . . . . . 
    `)
anim1.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . e . . . . . . . . 
    . . . . . 4 . 4 . . . . . . . . 
    `)
anim1.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d 1 d . . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d d 1 1 1 d d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . e . . . . . . . . 
    . . . . . 4 . 4 . . . . . . . . 
    `)
anim2.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 2 d . . . . . . . . . . . 
    . 2 2 2 2 d . . . . . . . . . . 
    4 2 4 2 2 d . . . . . . . . . . 
    . 2 2 2 1 d . . . . . . . . . . 
    . . . d 1 d . . . d . . . . . . 
    . . . d 1 1 d d d 1 d . . . . . 
    . . . d 1 1 1 1 d 1 d . . . . . 
    . . . d 1 1 d d 1 1 d . . . . . 
    . . . . d 1 1 1 1 d . . . . . . 
    . . . . . d d d d . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    . . . . . 4 4 e . . . . . . . . 
    `)
anim2.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 2 d . . . . . . . . . . . . 
    . 2 2 2 d . . . . . . . . . . . 
    4 2 4 2 d d . . . d . . . . . . 
    . 2 2 1 1 1 d d d 1 d . . . . . 
    . . . d 1 1 1 1 d 1 d . . . . . 
    . . . d 1 1 d d 1 1 d . . . . . 
    . . . . d 1 1 1 1 d . . . . . . 
    . . . . . d d d d . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    . . . . . 4 . . e . . . . . . . 
    `)
anim2.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 2 d . . . . . . . . . . . . 
    . 2 2 2 d d . . . d . . . . . . 
    4 2 4 2 1 1 d d d 1 d . . . . . 
    . 2 2 1 1 1 1 1 d 1 d . . . . . 
    . . . d 1 1 d d 1 1 d . . . . . 
    . . . . d 1 1 1 1 d . . . . . . 
    . . . . . d d d d . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    `)
anim2.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 2 d . . . . . . . . . . . . 
    . 2 2 2 d d . . . d . . . . . . 
    4 2 4 2 1 1 d d d 1 d . . . . . 
    . 2 2 1 1 1 1 1 d 1 d . . . . . 
    . . . d 1 1 d d 1 1 d . . . . . 
    . . . . d 1 1 1 1 d . . . . . . 
    . . . . . d d d d . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    `)
anim2.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 2 d . . . . . . . . . . . . 
    . 2 2 2 d d . . . d . . . . . . 
    4 2 4 2 1 1 d d d 1 d . . . . . 
    . 2 2 1 1 1 1 1 d 1 d . . . . . 
    . . . d 1 1 d d 1 1 d . . . . . 
    . . . . d 1 1 1 1 d . . . . . . 
    . . . . . d d d d . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    `)
anim4.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . d 2 . . . . . 
    . . . d . . . d d 2 2 2 . . . . 
    . . d 1 d d d 1 1 2 4 2 4 . . . 
    . . d 1 d 1 1 1 1 d 2 2 . . . . 
    . . d 1 1 d d 1 1 d . . . . . . 
    . . . d 1 1 1 1 d . . . . . . . 
    . . . . d d d d . . . . . . . . 
    . . . . . e 4 . . . . . . . . . 
    . . . . . e 4 . . . . . . . . . 
    `)
anim4.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . d 2 . . . . . 
    . . . . . . . . d 2 2 2 . . . . 
    . . . d . . . d d 2 4 2 4 . . . 
    . . d 1 d d d 1 1 1 2 2 . . . . 
    . . d 1 d 1 1 1 1 d . . . . . . 
    . . d 1 1 d d 1 1 d . . . . . . 
    . . . d 1 1 1 1 d . . . . . . . 
    . . . . d d d d . . . . . . . . 
    . . . . . 4 e . . . . . . . . . 
    . . . . 4 . . e . . . . . . . . 
    `)
anim4.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . d 2 . . . . . 
    . . . d . . . d d 2 2 2 . . . . 
    . . d 1 d d d 1 1 2 4 2 4 . . . 
    . . d 1 d 1 1 1 1 d 2 2 . . . . 
    . . d 1 1 d d 1 1 d . . . . . . 
    . . . d 1 1 1 1 d . . . . . . . 
    . . . . d d d d . . . . . . . . 
    . . . . . 4 e . . . . . . . . . 
    . . . . . 4 e . . . . . . . . . 
    `)
anim5.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . d . . . . . . . . . . . . 
    . . d 1 d d d d . . . . . . . . 
    . . d 1 d 1 1 1 d d . . . . . . 
    . . d 1 1 d d 1 1 d 2 . . . . . 
    . . . d 1 1 1 1 d 2 2 2 . . . . 
    . . . . d d d d d 2 4 2 2 . . . 
    . . . . . e 4 . . d 2 2 . . . . 
    . . . . . e 4 4 . . . 4 . . . . 
    `)
anim5.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . d . . . . . . . . . . . . 
    . . d 1 d d d d d d 2 . . . . . 
    . . d 1 d 1 1 1 1 2 2 2 . . . . 
    . . d 1 1 d d 1 1 2 4 2 2 . . . 
    . . . d 1 1 1 1 d d 2 2 . . . . 
    . . . . d d d d . . . 4 . . . . 
    . . . . . e 4 . . . . . . . . . 
    . . . . . e 4 4 . . . . . . . . 
    `)
anim6.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . 2 2 2 . . . . . . . . 
    . . . . . 4 2 4 . . . . . . . . 
    . . . . . 2 e 2 . . . . . . . . 
    . . . . d d 2 d d . . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . e . . . . . . . . 
    . . . . . 4 . 4 . . . . . . . . 
    `)
anim6.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . 2 2 2 . . . . . . . . 
    . . . . . 4 2 4 . . . . . . . . 
    . . . . d 2 e 2 d . . . . . . . 
    . . . d 1 d 2 d 1 d . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . 4 . . . . . . . . 
    . . . . . 4 . . . . . . . . . . 
    `)
anim6.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . 2 2 2 . . . . . . . . 
    . . . . d 4 2 4 d . . . . . . . 
    . . . d 1 2 e 2 1 d . . . . . . 
    . . . d 1 d 2 d 1 d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . 4 . e . . . . . . . . 
    . . . . . 4 . e . . . . . . . . 
    `)
anim6.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . 2 2 2 . . . . . . . . 
    . . . . . 4 2 4 . . . . . . . . 
    . . . . d 2 e 2 d . . . . . . . 
    . . . d 1 d 2 d 1 d . . . . . . 
    . . . d 1 d 1 d 1 d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . 4 . e . . . . . . . . 
    . . . . . . . 4 . . . . . . . . 
    `)
anim6.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . 2 2 2 . . . . . . . . 
    . . . . d 4 2 4 d . . . . . . . 
    . . . d 1 2 e 2 1 d . . . . . . 
    . . . d 1 d 2 d 1 d . . . . . . 
    . . . . d 1 1 1 d . . . . . . . 
    . . . . . d d d . . . . . . . . 
    . . . . . e . 4 . . . . . . . . 
    . . . . . e . 4 . . . . . . . . 
    `)
anim7.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . d . . . . . . . . . 
    . . . . d d 2 d d . . . . . . . 
    . . . d 1 2 2 2 1 d . . . . . . 
    . . . d 1 4 2 4 1 d . . . . . . 
    . . . . d 2 2 2 d . . . . . . . 
    . . . . . d e d . . . . . . . . 
    . . . . . e . e . . . . . . . . 
    . . . . . 4 . 4 . . . . . . . . 
    `)
anim7.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . d . . . . . . . . . 
    . . . . d d 1 d d . . . . . . . 
    . . . d 1 d d d 1 d . . . . . . 
    . . . d 1 d 2 d 1 d . . . . . . 
    . . . . d 2 2 2 d . . . . . . . 
    . . . . . 4 2 4 . . . . . . . . 
    . . . . . 2 2 2 . . . . . . . . 
    . . . . . 4 e 4 . . . . . . . . 
    `)
anim2.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 2 d . . . . . . . . . . . . 
    . 2 2 2 d d . . . d . . . . . . 
    4 2 4 2 1 1 d d d 1 d . . . . . 
    . 2 2 1 1 1 1 1 d 1 d . . . . . 
    . . . d 1 1 d d 1 1 d . . . . . 
    . . . . d 1 1 1 1 d . . . . . . 
    . . . . . d d d d . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    `)
anim3.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . d . . . . . . 
    . . 2 d d d d d d 1 d . . . . . 
    . 2 2 2 1 1 1 1 d 1 d . . . . . 
    2 2 4 2 1 1 d d 1 1 d . . . . . 
    . 2 2 d d 1 1 1 1 d . . . . . . 
    . 4 . . . d d d d . . . . . . . 
    . . . . . . 4 e . . . . . . . . 
    . . . . . 4 4 e . . . . . . . . 
    `)
anim3.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . d . . . . . . 
    . . . . . d d d d 1 d . . . . . 
    . . . d d 1 1 1 d 1 d . . . . . 
    . . 2 d 1 1 d d 1 1 d . . . . . 
    . 2 2 2 d 1 1 1 1 d . . . . . . 
    2 2 4 2 d d d d d . . . . . . . 
    . 2 2 d . . 4 e . . . . . . . . 
    . 4 . . . 4 4 e . . . . . . . . 
    `)
anim4.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . d 2 . . . . . . 
    . . . . . . . d 2 2 2 . . . . . 
    . . . . . . . d 2 4 2 4 . . . . 
    . . . d . . . d 1 2 2 . . . . . 
    . . d 1 d d d 1 1 d . . . . . . 
    . . d 1 d 1 1 1 1 d . . . . . . 
    . . d 1 1 d d 1 1 d . . . . . . 
    . . . d 1 1 1 1 d . . . . . . . 
    . . . . d d d d . . . . . . . . 
    . . . . . e 4 . . . . . . . . . 
    . . . . . e 4 4 . . . . . . . . 
    `)
anim4.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . d 2 . . . . . 
    . . . . . . . . d 2 2 2 . . . . 
    . . . d . . . d d 2 4 2 4 . . . 
    . . d 1 d d d 1 1 1 2 2 . . . . 
    . . d 1 d 1 1 1 1 d . . . . . . 
    . . d 1 1 d d 1 1 d . . . . . . 
    . . . d 1 1 1 1 d . . . . . . . 
    . . . . d d d d . . . . . . . . 
    . . . . . e 4 . . . . . . . . . 
    . . . . e . . 4 . . . . . . . . 
    `)
forever(function () {
    carSprite.x += 1
    carSprite2.x += -2
    carSprite3.x += -1
    carSprite4.x += 2
    carSprite6.x += 1.25
    carSprite7.x += -1.2
    carSprite8.x += 1
    if (carSprite.x > 70 || carSprite5.x > 40) {
        carSprite5.x += 1
    }
    if (carSprite.x > 167) {
        carSprite.setPosition(0, 108)
    }
    if (carSprite2.x < 0) {
        carSprite2.setPosition(162, 95)
    }
    if (carSprite3.x < -10) {
        carSprite3.setPosition(165, 89)
    }
    if (carSprite4.x > 167) {
        carSprite4.setPosition(0, 64)
    }
    if (carSprite5.x > 167) {
        carSprite5.setPosition(0, 109)
    }
    if (carSprite6.x > 167) {
        carSprite6.setPosition(0, 50)
    }
    if (carSprite7.x < 0) {
        carSprite7.setPosition(160, 36)
    }
    if (carSprite8.x > 160) {
        carSprite8.setPosition(-10, 31)
    }
})
