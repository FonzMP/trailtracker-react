function Trail(trail) {
  this.id = trail.id;
  this.name = trail.name;
  this.length = trail.length;
  this.rating = trail.average_rating;
  this.creator = trail.created_by_username;
  this.user_page = trail.created_by_page;
}

function trailDetails() {
  $("a.trail-details").click(function(e) {
    e.preventDefault();
    const trailId = $(this).data("trail");
    $.get(`/trails/${trailId}.json`, function(data) {
      const trailName = data.name;
      const trail = new Trail(data);
      $(`#trail-info-${trail.id}`).html(
        `
        <p><strong>Length: </strong> ${trail.length}</p>
        <p><strong>Average Rating: </strong> ${trail.rating}</p>
        <p><strong>Contributed by: </strong> <a href="/users/${
          trail.user_page
        }">${trail.creator}</a></p>
        <a href="#" id="hide-info-${trail.id}">Hide Trail Info</a>
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

function setMessageTrails(post) {
  post.done(function(trail) {
    let newTrail = new Trail(trail);
    $("#success_message").html(`
    <h3>You've successfully created ${newTrail.name} trail</h3>
    <p><strong>Name: </strong>${newTrail.name}</p>
    <p><strong>Length: </strong>${newTrail.length}</p>
    `);
    $("#trail_name").val("");
    $("#trail_length").val("");
    $("#add-trail").removeClass("backing");
    $("#trail_form").addClass("hidden");
    $("input#new-trail-submit").prop("disabled", false);
  });
}

function getTrails() {
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
}
