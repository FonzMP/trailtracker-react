const TrailRating = function(trailRating) {
  this.name = trailRating.trail.name;
  this.length = trailRating.trail.length;
  this.username = trailRating.user.username;
  this.rating = trailRating.rating;
};

TrailRating.prototype.displayTrailRating = function() {
  return `<p><strong>Name: </strong>${this.name}</p>
  <p><strong>Length: </strong>${this.length}</p>
  <p><strong>Rating: </strong>${this.rating}</p>
  <hr>`;
};

function setMessageTrailRatings(post) {
  post.done(function(tr) {
    const newTrailRating = new TrailRating(tr);
    $("#success_message").html(`
      <h3>Successfully created a trail rating for ${
        newTrailRating.name
      } trail.</h3>
      <p><strong>Name: </strong>${newTrailRating.name}</p>
      <p><strong>Length: </strong>${newTrailRating.length}</p>
      <p><strong>Rating: </strong>${newTrailRating.rating}</p>
    `);
    $("#trail_ratings_form").addClass("hidden");
    $("#add-trail-rating").text("Add a Trail Rating");
    $("#add-trail-rating").removeClass("backing");
    $("#trail-rating-submit").prop("disabled", false);
  });
}

function setTrailRatings() {
  $.get("/trail_ratings", function(data) {
    if (data.length > 0) {
      $("#trail_rating_trail_id").html("");
      for (let i = 0; i < data.length; i++)
        $("#trail_rating_trail_id").append(`
          <option value="${data[i].id}">${data[i].name}</option>
          `);
    }
  });
}

function getTrailRatings() {
  $.get("/trails_rated.json", function(data) {
    if (data.length > 0) {
      data.forEach(function(tr) {
        let newTrailRating = new TrailRating(tr);
        $("#user_tr_display").append(newTrailRating.displayTrailRating());
      });
    } else {
      $("#user_tr_display").html("You have no trails currently rated!");
    }
  });
}
