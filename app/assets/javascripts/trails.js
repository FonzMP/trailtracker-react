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

function setMessageTrails(post) {
  post.done(function(trail) {
    $("#success_message").html(`
    <h3>You've successfully created ${trail.name} trail</h3>
    <p><strong>Name: </strong>${trail.name}</p>
    <p><strong>Length: </strong>${trail.length}</p>
    `);
    $("#trail_name").val("");
    $("#trail_length").val("");
    $("input#new-trail-submit").prop("disabled", false);
  });
}

$("form#new_trail").submit(function(e) {
  e.preventDefault();
  const values = $(this).serialize();
  const post = $.post("/trails", values);
  setMessageTrails(post);
  clearMessage();
});
