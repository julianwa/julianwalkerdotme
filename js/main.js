
var currentPane = "";
var doingFadeOut = false;

function addClickHandler(linkName) {
	$("#" + linkName + "Link").click(function(e) {
		$.bbq.pushState({ pane: linkName });
		e.preventDefault();
	});
}

function displayPane(paneName, immediately) {

	if (currentPane == "") {

		$(".pane").fadeOut(0);
		$("#" + paneName + "Pane").fadeIn(0);
		
		$(".selectionDot").fadeTo(0, 0);
		$("#" + paneName + "SelectedDot").fadeTo(0, 1);

	} else if (currentPane != paneName) {

		if (!doingFadeOut) {

			doingFadeOut = true;

			$("#" + currentPane + "Pane").fadeOut("def", function() {
				$("#" + currentPane + "Pane").fadeIn("def");
				doingFadeOut = false;
			});
		}

		$("#" + currentPane + "SelectedDot").fadeTo(0, 0);
		$("#" + paneName + "SelectedDot").fadeTo(0, 1);
	}

	currentPane = paneName;
}

$(document).ready(function() {

    $(window).bind("hashchange", function(e) {

		var pane = $.bbq.getState("pane");

		if (pane == "about") {
			displayPane("about");
		} else if (pane == "projects") {
			displayPane("projects");
		} else {
			displayPane("findMe");
		}
	});

	$(window).trigger("hashchange");

	$("#homeLink").click(function(e) {
		$.bbq.removeState("pane");
		e.preventDefault();
	});

	addClickHandler("about");
	addClickHandler("findMe");
	addClickHandler("projects");
});
