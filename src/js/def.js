[].forEach.call(document.querySelector("toggle"), function (a) {
  a.addEventListener("click", function () {
    $(".item").hasClass("active") ?
      ($(".item").removeClass("active"), $(this).find("a").html("<i class='fas fa-bars'></i>")) :
      ($(".item").addClass("active"),
        document.querySelector("item").classList.add("wrap"),
        $(this).find("a").html("<i class='fas fa-times'></i>"))
  }, !1)
});

[].forEach.call(document.querySelector("toggle"), function (a) {
  a.addEventListener("click", function () {
    var elements = document.querySelectorAll(".item");
    elements.classList.contains("active") ?
      (elements.classList.remove("active"),
        elements.querySelectorAll(selector)
      $(this).find("a").html("<i class='fas fa-bars'></i>")) :
  ($(".item").addClass("active"),
    document.querySelector("item").classList.add("wrap"),
    $(this).find("a").html("<i class='fas fa-times'></i>"))
}, !1)
});