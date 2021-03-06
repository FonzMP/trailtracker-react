const Trail = function(trail) {
  this.id = trail.id;
  this.name = trail.name;
  this.length = trail.length;
  this.rating = trail.average_rating;
  this.creator = trail.created_by_username;
  this.user_page = trail.created_by_page;
};

Trail.prototype.displayTrail = function() {
  return `<p><strong>Length: </strong> ${this.length}</p>
        <p><strong>Average Rating: </strong> ${this.rating}</p>
        <p><strong>Contributed by: </strong> <a href="/users/${
          this.user_page
        }">${this.creator}</a></p>
        <a href="#" id="hide-info-${this.id}">Hide Trail Info</a>`;
};

function trailDetails() {
  $("a.trail-details").click(function(e) {
    e.preventDefault();
    const trailId = $(this).data("trail");
    $.get(`/trails/${trailId}.json`, function(data) {
      const trailName = data.name;
      const trail = new Trail(data);
      $(`#trail-info-${trail.id}`).html(trail.displayTrail());
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
    appendTrails(data);
    trailDetails();
  });
}

function appendTrails(data) {
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
}
