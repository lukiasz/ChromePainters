var chromePainters = chromePainters || {};

chromePainters.gui = function()
{
	var that = {};
	
	var menu = function()
	{
		var thats = {};
		var nowaGra = function()
		{
			g.init();
			g.animate();
			document.getElementById('gui').setAttribute("style","display: none");
		};
		
		thats.nowaGra = nowaGra;
		return thats;
	};
	
	that.menu = new menu();	
	return that;	
}

