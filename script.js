		var params =
		{
			pc_score : 0,
			user_score: 0,
			counter: 1,
			game_over: false,
			round_number: 0,
			progress: []

		}


		var paper = document.getElementById('paper');
		var stone = document.getElementById('stone');
		var scissors = document.getElementById('scissors');
		var output = document.getElementById('output');
		var result = document.getElementById('result');
		var game = document.getElementById('start_btn');
		var round = document.getElementById('round'); 

		paper.disabled = true;
		stone.disabled = true;
		scissors.disabled = true;

		result.innerHTML = "PC : USER"
		result.innerHTML += "</br>" + params.pc_score + " - " + params.user_score;


		/*alert(params.progress.nr_round = 1);*/

		function new_game()
		{	
			params.progress = [];
			params.pc_score = 0;
			params.user_score = 0;
			params.round_number = 0;
			params.game_over = false;
			params.counter = prompt("Set number of round");
		
			round.innerHTML = "NUMBER OF ROUND TO WIN : " + params.counter;
			params.counter = parseInt(params.counter);
			return params.counter;
		}

		function end_game(text)
		{
				showModal();
				hideModal();
				message.innerHTML += text;
				params.game_over = true;
		}

			
		function lottery()
		{
			var ran = Math.floor(Math.random()*3+1);
			
			 if(ran == 1)
			{
				return 'paper';
			}
			else if(ran == 2)
			{
				return 'stone';
			}
			else if(ran == 3)
			{
				return 'scissors';
			}
		}

		function roundStatus(text,user, pc, rd,round_number)
		{
			output.innerHTML = "</br>" + text  + "you played " +  user + ", computer played " +  pc; 
			result.innerHTML = "PC : USER"
			result.innerHTML += "</br>" + params.pc_score + " - " + params.user_score;
			roundWinner = rd;
			params.progress['user'] = user;
			params.progress['pc'] = pc;
			params.progress['winner'] = roundWinner;
			message.innerHTML += "Round: " + round_number + " ";
			message.innerHTML += "Player: " + params.progress['user'] + " ";
			message.innerHTML += "PC: " + params.progress['pc']  + " ";
			message.innerHTML += "Winner: " + params.progress['winner']  + " ";
			message.innerHTML += "</br>" + "PC : USER ";
			message.innerHTML += "</br>" + params.pc_score + " - " + params.user_score;
			message.innerHTML += "</br></br>";
		}

		function playerMove(choice)
		{	
			var user = choice;

	
			pc = lottery();
			
			var msg = document.getElementById("message");
			//console.log('przed', params.pc_score, params.user_score);
			 if(params.pc_score < params.counter &&  params.user_score < params.counter)
			 {

			 	var roundWinner;

				if(user == 'paper' && pc == 'stone' || user == 'stone' && pc == 'scissors' || user == 'scissors' && pc == 'paper')
				{	
					params.round_number++;
					params.user_score++;
					roundWinner = "Player";
					roundStatus("YOU WIN: ", user, pc,roundWinner,params.round_number);
					

				}

				else if(user == 'paper' && pc == 'scissors' || user == 'stone' && pc == 'paper' || user == 'scissors' && pc == 'stone')
				{
					/*output.innerHTML = "</br>YOU LOSE: you played " +  user + ", computer played " +  pc;
					params.pc_score++;
					result.innerHTML = "PC : USER"
					result.innerHTML += "</br>" + params.pc_score + " - " + params.user_score;*/
					params.round_number++;
					params.pc_score++;
					roundWinner = "PC";
					roundStatus("YOU LOSE: ", user, pc, roundWinner,params.round_number);
					
				}

				else if(user == pc)
				{
					/*output.innerHTML = "</br>DRAW: you played " +  user + ", computer played " +  pc;
					result.innerHTML = "PC : USER"
					result.innerHTML += "</br>" + params.pc_score + " - " + params.user_score;*/
					params.round_number++;
					roundWinner = "DRAW";
					roundStatus("</br> DRAW:  ", user, pc, roundWinner,params.round_number);
					
				}
				
				
				//console.log(params.progress);
			}	

			params.progress.push({'user': user, 'pc': pc, 'winner': roundWinner});
			//console.log('po', params.pc_score, params.user_score);
			if(params.user_score == params.counter)
			{
				end_game("YOU WON THE ENTIRE GAME!!!");
			}

			else if(params.pc_score == params.counter)
			{
				end_game("YOU LOSE THE ENTIRE GAME!!!");
			}

		}

		var pm = document.querySelectorAll(".player-move");

				
		for(var a = 0; a < pm.length; a++)
		{
			pm[a].addEventListener('click', function(){
			var name = event.target.getAttribute("data-move");

				if(params.game_over == false)
				{
					playerMove(name);
				}
				else
				{
					output.innerHTML = "Game over, please press the new game button!";
				}

				
			});
		}
				
		
		game.addEventListener('click', function(){ 
				params.counter = new_game();
				params.game_over = false;
				paper.disabled = false;
				stone.disabled = false;
				scissors.disabled = false;
		});

		
		var close = document.querySelectorAll(".modal .close");

		


	function  showModal()
	{
		document.querySelector(".modal").classList.add('show');
		document.querySelector('.overlay').classList.add('show');
		document.querySelector("*").classList.add('bg');
		
	}

	
	function hideModal()
	{	
		var close = document.getElementById("close");
		close.addEventListener("click", function(){
		document.querySelector(".modal").classList.remove('show');
		document.querySelector('.overlay').classList.remove('show');
		document.querySelector("*").classList.remove('bg');
		message.innerHTML = "";
		});
	}

	

	
