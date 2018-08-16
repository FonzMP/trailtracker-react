function toggleDisplay(buttonClicked, showText, hideText, renderedForm) {
  $(buttonClicked).click(function(e) {
    if ($(this).text() === showText) {
      $(this).text(hideText);
      $(renderedForm).removeClass("hidden");
    } else {
      $(this).text(showText);
      $(renderedForm).addClass("hidden");
    }
  });
}

function clearMessage() {
  setTimeout(function() {
    $("#success_message").slideUp();
  }, 5000);
}

function attachListeners() {
  $("#trails").click(function() {
    $.get("/trails.json", function(data) {
      $("#all_trails").html("<h3>All trails on TrailTracker</h3>");
      data.forEach(function(trail) {
        $("#all_trails").append(
          `
          <p><strong>Name: </strong>${trail.name}</p>
          <div id="trail-info-${trail.id}">
          <a href="#" id="trail-${trail.id}" data-trail="${
            trail.id
          }" class="trail-details" >View ${trail.name} Trail Info</a>
          </div>
          <br>
          `
        );
      });
      trailDetails();
    });

    if ($(this).text() === "View All Trails") {
      $(this).text("Hide All Trails");
      $("#all_trails").removeClass("hidden");
    } else {
      $(this).text("View All Trails");
      $("#all_trails").addClass("hidden");
    }
  });

  toggleDisplay(
    "#user-trails",
    "View Trails You've Created",
    "Hide Your Trails",
    "#user_created_trails"
  );

  toggleDisplay(
    "#user-trail-ratings",
    "View Your Trail Ratings",
    "Hide Your Trail Ratings",
    "#user_tr_display"
  );

  toggleDisplay(
    "#add-trail",
    "Add a New Trail",
    "Hide New Trail Form",
    "#trail_form"
  );

  toggleDisplay(
    "#add-trail-rating",
    "Add a Trail Rating",
    "Hide Trail Rating Form",
    "#trail_ratings_form"
  );

  $("form#new_trail_rating").submit(function(e) {
    e.preventDefault();
    const values = $(this).serialize();
    const post = $.post("/trail_ratings", values);
    setMessageTrailRatings(post);
    clearMessage();
  });

  $("form#new_trail").submit(function(e) {
    e.preventDefault();
    const values = $(this).serialize();
    const post = $.post("/trails", values);
    setMessageTrails(post);
    clearMessage();
  });
}
