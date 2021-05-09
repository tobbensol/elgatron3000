const Gameboy = require("serverboy")
const PNG = require('pngjs').PNG;
const gameboy = new Gameboy();
const fs = require('fs');

try {
    const sram = JSON.parse(fs.readFileSync("./data/saveData"))
    gameboy.loadRom(fs.readFileSync('./data/roms/red.gb'), sram);
}
catch (err){
    gameboy.loadRom(fs.readFileSync('./data/roms/red.gb'));
}

emulatorLoop(3200)
savePNG()

function doMove(command){
    switch(command){
        case "n":
            press(Gameboy.KEYMAP.UP ,150 , true)
            break;
        case "s":
            press(Gameboy.KEYMAP.DOWN ,150 , true)
            break;
        case "e":
            press(Gameboy.KEYMAP.RIGHT ,150 , true)
            break;
        case "w":
            press(Gameboy.KEYMAP.LEFT ,150 , true)
            break;
        case "a":
            press(Gameboy.KEYMAP.A , 700, true)
            break;
        case "b":
            press(Gameboy.KEYMAP.B ,500 , true)
            break;
        case "start":
            press(Gameboy.KEYMAP.START, 50, true)
            break;
        case "select":
            press(Gameboy.KEYMAP.SELECT ,50 , true)
            break;
        case "save":
            press(Gameboy.KEYMAP.A, 450, false)
            press(Gameboy.KEYMAP.A, 450, false)
            press(Gameboy.KEYMAP.A, 450, true)
            fs.writeFile("./data/saveData",JSON.stringify(gameboy.getSaveData()), (err) => {
                console.log("error:", err)
            })
            break;
        case "wait":
            emulatorLoop(1000)
            savePNG()
            break;
    }
}

function press(key, wait, png){
    for (var i = 0; i < 20; i++){
        gameboy.pressKey(key)
        gameboy.doFrame()
    }
    emulatorLoop(wait)
    if (png){
        savePNG()
    }
}

function emulatorLoop(time) {
    for(var i = 0; i < time; i++ ) {
        gameboy.doFrame()
    }
};

function savePNG(){
    var screen = gameboy.getScreen();

    var png = new PNG({ width: 160, height: 144 });
    for (let i=0; i<screen.length; i++) {
        png.data[i] = screen[i];
    }

    var buffer = PNG.sync.write(png);
    fs.writeFile("./data/current.png", buffer, (err) => {
        console.log("error:", err)
    })
}

module.exports = {doMove};