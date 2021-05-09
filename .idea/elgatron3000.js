const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("dotenv").config();
const pokemon = require("./gameboy")
const fs = require('fs');

let Token = process.env.TOKEN;
let checker = (arr, target) => target.every(v => arr.includes(v));

var pokemonCommands = ["n", "s", "w", "e", "a", "b", "start", "select", "save", "wait", "state", "data"];
var actionqueue = []
var lastMsgID;
var totalCommands;
var moves;

fs.readFile("./data/commands", (err, data) => {
    var newData = parseInt(data.toString());
    totalCommands = newData
})

fs.readFile("./data/moves", (err, data) => {
    var newData = parseInt(data.toString());
    moves = newData
})

refreshData();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.id == "837784141663043695"){return;}

    if (msg.channel.id === "508394694368034837" || msg.channel.id === "839100318893211669") {
        var finalmsg = []
        var content = msg.content.split(" ")
        for (element in content) {
            if (!isNaN(content[element])) {
                for (var i = 0; i < parseInt(content[element] - 1); i++) {
                    finalmsg.push(finalmsg[finalmsg.length - 1])
                }
            } else {
                finalmsg.push(content[element])
            }
        }
        msg.content = finalmsg.join(",")

        if (checker(pokemonCommands, msg.content.split(","))) {
            actionqueue.push(msg)
            msg.delete();
            totalCommands += 1;
        }
    }
});

function refreshData() {
    if(actionqueue.length != 0){
        var msg = actionqueue[0]
        var commands = msg.content.split(",")
        var command = commands[0]
        moves += 1
        commands.shift()
        msg.content = commands.join(",")
        actionqueue[0] = msg
        perform(command)
        if(actionqueue[0].content == ''){
            actionqueue.shift()
        }
    }
    setTimeout(refreshData, 1300);
}

function sendstate(currentmove){
    sleep(25)
    msg = actionqueue[0]

    msg.channel.messages.fetch(lastMsgID)
        .then(msg => msg.delete())
        .catch(console.error);

    if(actionqueue.length == 1 && msg.toString().length == 0){
        msg.channel.send( "**"+currentmove+"**"+ actionqueue.join(","), { files: ["./data/current.png"]})
            .then(msg => lastMsgID = msg.id)
    }
    else{
        msg.channel.send( "**"+currentmove+"**,"+ actionqueue.join(","), { files: ["./data/current.png"]})
            .then(msg => lastMsgID = msg.id)
    }
}

function perform(command){
    switch (command){
        case "state":
            msg.channel.send(" ", {files: ["./data/current.png"]});
            break;
        case "save":
            pokemon.doMove(command)
            sendstate(command)

            fs.writeFile("./data/moves", moves.toString(), (err) => {
                console.log("error:", err)
            });
            fs.writeFile("./data/commands", totalCommands.toString(), (err) => {
                console.log("error:", err)
            });
            break;
        case "data":
            msg.channel.send("we have made " + moves + " moves in " + totalCommands + " commands, that is an avergage of " + Math.round(moves/totalCommands*100)/100 + " moves per command");
            break;
        case "n":
        case "s":
        case "e":
        case "w":
        case "a":
        case "b":
        case "start":
        case "select":
        case "wait":
            pokemon.doMove(command)
            sendstate(command)
            break;
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

client.login(Token);
