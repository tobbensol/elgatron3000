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

wait:
- lets some in game time pass, this can be great in cutscenes where they don't really make sense without animations*_****_*

how to write commands:
the basic syntax is that you can write a command, and if you want to repeat it you can write the number of times you want it repeated behid, so:
command command command can be written as command 3
you can mix and match this however many times you want
a 3 b 4 start 2 n 3 == a a a b b b b start start n n n
