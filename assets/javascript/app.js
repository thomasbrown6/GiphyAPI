// Initial array of players
var players = [
	"Lebron+James",
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
$(".player").on("click", function () {

	var playerName = $(this).attr("data-name");

	// Constructing a queryURL using the player name
	var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + playerName + "&api_key=3cN0ojC8ek29YDso9Ljs7lSy2BJlgXOV&limit=10";

	// Performing an AJAX request with the queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})
		// After data comes back from the request
		.then(function (response) {

			var results = response.data;

			console.log(response);

			// Looping through each result item
			for (var i = 0; i < results.length; i++) {

				// Creating and storing a div tag
				var playerDiv = $("<div>");

				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + results[i].rating);

				// Creating and storing an image tag
				var playerImage = $("<img>");
				// Setting the src attribute of the image to a property pulled off the result item
				playerImage.attr("src", results[i].images.fixed_height.url);

				// Appending the paragraph and image tag to the playerDiv
				playerDiv.append(p);
				playerDiv.append(playerImage);

				// Prependng the playerDiv to the HTML page in the "#gifs-appear-here" div
				$("#gifs-appear-here").prepend(playerDiv);
			}
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

	// Function for displaying the player info
	// We're adding a click event listener to all elements with the class "player"
	// We're adding the event listener to the document because it will work for dynamically generated elements
	// $(".players").on("click") will only add listeners to elements that are on the page at that time

	// Calling the renderButtons function to display the intial buttons
	renderButtons();