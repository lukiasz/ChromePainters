var chromePainters = chromePainters || {};

chromePainters.gui = function(game)
{
	var that = {};
	
	var menu = function()
	{
		var thats = {};
		var nowaGra = function(amountOfPlayers)
		{
			game.playersAmount = amountOfPlayers;
			game.init();
			document.getElementById('gui').setAttribute("style","display: none");
			game.animate();
		};
		
		var autorzy = function()
		{
			$('#Autorzy').show(600);
			$('#Autorzy .close').click(closeAuthors);
			//alert("Game made by: Justyna Barwiñska, £ukasz Olender,Wojciech Jaszczak, Grzegorz Faryna");
		}
		
		var init = function()
		{
			var options = document.getElementsByClassName('painter');
			options[0].onclick = function () {thats.nowaGra(2)};
			options[1].onclick = function () {thats.nowaGra(3)};
			options[2].onclick = function () {thats.nowaGra(4)};
			document.getElementsByClassName('openAuthors')[0].onclick = autorzy;
		}

		
		var closeAuthors = function()
		{
			$('#Autorzy').hide(300);
		}
		
		thats.init = init;
		thats.autorzy = autorzy;
		thats.nowaGra = nowaGra;
		return thats;
	};
	
	var statistics = function()
	{
		var thats = {};
		var display = function(params)
		{
			$('#statystki .inside').html("");
			for(var iterator in params)
			{
				var color;
				switch (params[iterator].color)
				{
					case "255.0.0" :
						color = "czerwony";
						break;
					case "0.128.0" :
						color = "zielony";
						break;
					case "0.0.255":
						color = "niebieski";
						break;
					case "255.255.0":
						color = "zolty";
						break;
				}
				$('#statystki .inside').append($("<p>Kolor <b>"+ color + "</b> posiada " + params[iterator].percentage.toFixed(3) +"% </p>"));
			}
			
			$('#statystki').show(500);
			$('#statystki .close').click(closeStats);
		}
		
		var closeStats = function()
		{
			$('#statystki').hide(1000);
			setTimeout(function() {location.reload() },2000);
		}
		thats.display = display;
		return thats;
	}
	
	
	that.statistics = new statistics();
	that.menu = new menu();	
	return that;	
}

