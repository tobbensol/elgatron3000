Elgatron3000
elgatron300 is a discord bot that was primarily built for me to try out Node.js and discord.js and secondarily built for me to make something to play pokémon with my friends like twith plays pokémon

the bot is not well-made, and this is the first time I am using Node, so it is quite amteurish and built upon an unfinished emulator

commands:
the button commands are quite self-explanatory   
a -> A  
b -> B  
n -> North  
s -> South  
w -> West  
e -> East  
start -> Start  
select -> Select

these commands need a bit more explaination  
save:  
- to save progress you need to use this command, this is because the emulator I'm using doesn't support battery saving, so to save progress you have to use the save command **THIS IS NOT A SAVE STATE**  

state:
- sends a picture of the current game state, this does not forward game time, and the game won't be deleted, great to save funny moments  

data:
- shows you how many moves you have made and how many commands you have done them in. it also tells you the average amount of moves per command  

how to write commands
you write these commands like this:  
command command command  
you can put a number behind a command to show how many times you are going to do it, so that could be simpified to command 3  
you can mix and match this however many times you want
an example of how to do write a command would be "a 3 b 2 start 2 n 3"
you could also write this as "a a a b b start start n n n", but the first example would clearly be easier
