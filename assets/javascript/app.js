// Initial array of players
var players = [
	"Lebron James",
	"Carmelo Anthony",
	"Allen Iverson",
	"Michael Jordan",
	"Steph Curry",
	"Magic Johnson",
	"Kyrie Irving",
	"Kevin Durant",
	"Klay Thompson",
	"Ben Simmons",
	"JR Smith",
	"Scottie Pippen",
	"Larry Bird",
	"Dwyane Wade",
	"Paul George",
	"Russel Westbrook",
	"Kobe Bryant",
	"Chris Paul"];

// Generic function for capturing the player name from the data-attribute
$(document).on("click", ".player", function () {

	var playerName = $(this).attr("data-name");

	// Constructing a queryURL using the player name
	var queryURL = "https://api.giphy.com/v1/gifs/search?&q="
	 + playerName + "&api_key=3cN0ojC8ek29YDso9Ljs7lSy2BJlgXOV&limit=10";

	// Performing an AJAX request with the queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})
		// After data comes back from the request
		.then(function (response) {

			var results = response.data;

			console.log(response.data);

			// Looping through each result item
			for (var i = 0; i < results.length; i++) {

				// Creating and storing a div tag
				var playerDiv = $("<div class='col-6'>");

				playerDiv.addClass("results");

				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + results[i].rating);

				// Creating and storing an image tag
				var playerImage = $("<img>")
				// Setting the src attribute of the image to a property pulled off the result item
				playerImage.attr("src", results[i].images.fixed_height_still.url);
				// Setting the data-still attribute to tell the gif to freeze
				playerImage.attr("data-still", results[i].images.fixed_height_still.url);
				// Setting the data-animate attribute to tell the gif to play
				playerImage.attr("data-animate", results[i].images.fixed_height.url);
				// Setting all the images to the still attribute
				playerImage.attr("data-state", "still");
				// Adding a class to all the images named 'gif'
				playerImage.addClass("gif");


				

				// Appending the paragraph and image tag to the playerDiv
				playerDiv.append(p);
				playerDiv.append(playerImage);

				// Prependng the playerDiv to the HTML page in the "#gifs-appear-here" div
				$("#gifs-appear-here").prepend(playerDiv);
			}

			$(".gif").on("click", function() {
				// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
				var state = $(this).attr("data-state");
				// If the clicked image's state is still, update its src attribute to what its data-animate value is.
				// Then, set the image's data-state to animate
				// Else set src to the data-still value
				if (state === "still") {
				  $(this).attr("src", $(this).attr("data-animate"));
				  $(this).attr("data-state", "animate");
				} else {
				  $(this).attr("src", $(this).attr("data-still"));
				  $(this).attr("data-state", "still");
				}
			  });

		});

	});


	// Function for displaying player data
	function renderButtons() {

		// Deleting the players prior to adding new players
		// (this is necessary otherwise we will have repeat buttons)
		$("#buttons-view").empty();

		// Looping through the array of players
		for (var i = 0; i < players.length; i++) {

			// Then dynamicaly generating buttons for each player in the array
			// This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
			var a = $("<button>");
			// Adding a class of player to our button
			a.addClass("player");
			// Adding a data-attribute
			a.attr("data-name", players[i]);
			// Adding a data-attribute to determine whether image is still or animated
			a.attr("data-state", "still");
			// Providing the initial button text
			a.text(players[i]);
			// Adding the button to the HTML
			$("#buttons-view").append(a);
		}
	}

	// This function handles events where one button is clicked
	$("#add-player").on("click", function (event) {
		// Preventing the buttons default behavior when clicked (which is submitting a form)
		event.preventDefault();
		// This line grabs the input from the textbox
		var player = $("#player-input").val().trim();

		// Adding the player from the textbox to our array
		players.push(player);

		// Calling renderButtons which handles the processing of our player array
		renderButtons();

	});

	// Calling the renderButtons function to display the intial buttons
	renderButtons();


