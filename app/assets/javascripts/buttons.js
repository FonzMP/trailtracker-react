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
