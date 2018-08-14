$(function() {
  $("#trails").click(function(e) {
    $.get("/trails.json", function(data) {
      $("#all_trails").html(" ");
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

  $("a.trail-details").click(function(e) {
    console.log(this);
    e.preventDefault();
  });
});

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

function trailDetails() {
  $("a.trail-details").click(function(e) {
    e.preventDefault();
    const trailId = $(this).data("trail");
    $.get(`/trails/${trailId}.json`, function(data) {
      const trailName = data.name;
      $(`#trail-info-${trailId}`).html(
        `
        <p><strong>Length: </strong> ${data.length}</p>
        <a href="#" id="hide-info-${trailId}">Hide Trail Info</a>
      `
      );
      hideDetails(trailId, trailName);
    });
  });
}

function hideDetails(id, name) {
  $("#hide-info-" + id).click(function(e) {
    e.preventDefault();
    $("#trail-info-" + id).html(
      `<a href="#" id="trail-${id}" data-trail="${id}" class="trail-details" >View ${name} Trail Info</a>`
    );
    trailDetails();
  });
}
