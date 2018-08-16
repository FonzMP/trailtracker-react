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
    $("#trail-rating-submit").prop("disabled", false);
  });
}
