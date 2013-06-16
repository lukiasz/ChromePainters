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
			document.getElementsByClassName('painter');
			game.animate();
		};
		
		var autorzy = function()
		{
			$('#Autorzy').show(600);
			//alert("Game made by: Justyna Barwiñska, £ukasz Olender,Wojciech Jaszczak, Grzegorz Faryna");
		}
		
		var init = function()
		{
			var options = document.getElementsByClassName('painter');
			options[0].onclick = function () {thats.nowaGra(2)};
			options[1].onclick = function () {thats.nowaGra(3)};
			options[2].onclick = function () {thats.nowaGra(4)};
		}

		
		var zamknij = function(caller)
		{
			$($(caller).parent()).hide(300);
			setTimeout(function() {location.reload() },5000);
		}
		
		thats.init = init;
		thats.zamknij = zamknij;
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
		}

		thats.display = display;
		return thats;
	}
	
	
	that.statistics = new statistics();
	that.menu = new menu();	
	return that;	
}

