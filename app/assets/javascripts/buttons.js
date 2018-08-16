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

function applyHidden(clicked) {
  const buttons = [
    "trails",
    "user-trails",
    "user-trail-ratings",
    "add-trail",
    "add-trail-rating"
  ];
  const views = [
    "#all_trails",
    "#user_created_trails",
    "#user_tr_display",
    "#trail_form",
    "#trail_ratings_form"
  ];

  if ($(clicked).hasClass("backing")) {
    $(clicked).removeClass("backing");
    $(views[jQuery.inArray(clicked.id, buttons)]).addClass("hidden");
  } else {
    for (let i = 0; i < buttons.length; i++) {
      if (clicked.id === buttons[i]) {
        $(views[jQuery.inArray(buttons[i], buttons)]).removeClass("hidden");
        $("#" + buttons[i]).addClass("backing");
        if (buttons[i] === "trails") {
          getTrails();
        } else if (buttons[i] === "add-trail-rating") {
          setTrailRatings();
        } else if (buttons[i] === "user-trail-ratings") {
          getTrailRatings();
        }
      } else {
        $(views[jQuery.inArray(buttons[i], buttons)]).addClass("hidden");
        $("#" + buttons[i]).removeClass("backing");
      }
    }
  }
}

function clearMessage() {
  setTimeout(function() {
    $("#success_message").slideUp();
  }, 5000);
}

function attachListeners() {
  $("button.user-nav").click(function() {
    applyHidden(this);
  });

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
