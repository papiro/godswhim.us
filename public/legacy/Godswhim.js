//BEGIN JQUERY
jQuery(document).ready(function() {

	//Preload "SPLASH" images
	(new Image()).src = "img/bg/waterbeads_optimized.jpg";
	(new Image()).src = "img/bg/treelight_optimized.jpg";
	(new Image()).src = "img/bg/night.jpg";
	(new Image()).src = "img/bg/London.jpg";
	(new Image()).src = "img/bg/dustyedit.jpg";

	//Create variables for commonly used selectors, where possible
	var $body_html = $('body, html'),

		//playspace===false if play-space has not yet been initialized.  playspace===true, otherwise.
		playspace = false;

	//Get the user's available screen width and height
	(function setSize(){
		$scrnWidth = $(window).innerWidth();
		$scrnHeight = $(window).innerHeight();
		$('#mainBody').width($scrnWidth).height($scrnHeight);
	})();

	//Detect if the window is resized, and if it is, get the new available screen width and height
	$(window).resize(function() {
		setSize();
	});
	
$('#info').click(function(){
	$('.info').css("display", "block");
	$('#instructions').hide();
});  //end of info click function

$('.info').click(function(){
	$('.info').css("display", "none");
	$('#instructions').show();
});

	//Function to capture key presses on the window object
	$(this).keydown(function(key) {

		//if key is equal to 'a'
		if (key.which == 65) {
			$('.a').fadeToggle(1000);
		}

		//if key is equal to 'b'
		else if (key.which == 66) {
			$('.b').fadeToggle(1000);
		}

		//if key is equal to 'd'
		else if (key.which == 68) {
			$body_html.animate({
				'scrollLeft': 0,
				'scrollTop': 0
			}, 3000, 'swing');
		} //end else if "d"

	}); //end keydown function

	$('.a img').click(function() {

		//Get source of clicked image
		$src = $(this).attr("src");
		$src = $src.replace(/png/, "jpg");

		//Load background image
		$('#mainBody').css({
			"background-image": 'url(' + $src + ')'			
		});

		//Fade out the "Choose a background" instruction
		$('.clickHere').fadeOut(2000);

	});

	$('.b img:not(.external)').click(function() {


		if (playspace !== true) {

			//BEGIN page SETUP

			//Effectively double the height and width of the playspace
			$body_html.css({
				"width": $scrnWidth * 2,
				"height": $scrnHeight * 2
			});

			//Append the iframe into the playspace
			$('body').append('<iframe id="mainframe" name="mainframe" src="about:blank"></iframe>');

			//Resize the iframe to user's current screen size
			$('#mainframe').css({
				"width": $scrnWidth,
				"height": $scrnHeight
			});

			//Set the iframe offscreen
			$('#mainframe').css({
				"left": $scrnWidth,
				"top": $scrnHeight
			});

			//Fix scroll-bar memory "feature" (bug) 
			(function() {
				$body_html.scrollLeft(0).scrollTop(0);
			})();

			//playspace initialized
			playspace = true;

			//END page SETUP

		} //end if statement to initialize SETUP

		$(this).addClass('animate');

		//Retrieve the id value of the image that is clicked, which contains a URL
		if ($(this).attr("id") != "refresh") {
			$link = $(this).attr("id");
		}

		//Retrieve the current value of the src attribute of the iframe
		$src = $('iframe').attr("src");

		//Set the src of the iframe to the new URL
		$('iframe').attr("src", $link);

		//If the window has not yet been scrolled to the iframe
		if ($body_html.scrollTop() < $scrnHeight && $link != "refresh") {
			$body_html.animate({
				'scrollLeft': $scrnWidth,
				'scrollTop': $scrnHeight
			}, 5000, 'swing'); //end animate	

		} //end if at home-base

	}); //end (img)click function

	$('.external').click(function() {
		window.open($(this).attr("id"));

	});

}); //end Document-ready
//END JQUERY