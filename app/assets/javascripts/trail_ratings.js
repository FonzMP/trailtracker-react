function setMessageTrailRatings(post) {
  post.done(function(tr) {
    $("#success_message").html(`
      <h3>Successfully created a trail rating for ${tr.trail.name} trail.</h3>
      <p><strong>Name: </strong>${tr.trail.name}</p>
      <p><strong>Length: </strong>${tr.trail.length}</p>
      <p><strong>Rating: </strong>${tr.rating}</p>
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
      $("#trail_rating_trail_id").append(
        `<option value="${data[0].id}">${data[0].name}</option>`
      );
      if (data.length > 0) {
        for (let i = 1; i < data.length; i++)
          $("#trail_rating_trail_id").append(`
          <option value="${data[i].id}">${data[i].name}</option>
          `);
      }
    }
  });
}

function getTrailRatings() {
  $.get("/trails_rated.json", function(data) {
    if (data.length > 0) {
      let i = 1;
      data.forEach(function(tr) {
        $("#user_tr_display").append(`
          <h4>Trail Rating - ${i}</h4>
          <p><strong>Name: </strong>${tr.trail.name}</p>
          <p><strong>Length: </strong>${tr.trail.length}</p>
          <p><strong>Rating: </strong>${tr.rating}</p>
          <a href="/trail_ratings/${tr.id}">Delete this Trail Rating</a>
        `);
        i++;
      });
    } else {
      $("#user_tr_display").html("You have no trails currently rated!");
    }
  });
}
