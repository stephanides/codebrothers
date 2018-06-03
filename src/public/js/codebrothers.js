var texts = [];
var activeText = 1;

$(document).ready(function() {
  var typingTexts = document.querySelectorAll(".typingText");
  var navLinks = document.querySelectorAll("a");

  $(".lazy").lazy();
  
  for(var i = 0; i < typingTexts.length; i++) {
    texts.push(typingTexts[i]);
  }

  [].forEach.call(navLinks, function(navLink) {
    navLink.addEventListener("click", function(e) {
      var el = e.target;
      var sectionNum = 0;
      
      for(var i = 0; i < el.classList.length; i++) {
        if(el.classList[i].indexOf("section-") > -1) {
          sectionNum = parseInt(el.classList[i].split("-")[1]);
        }
      }
      
      if(sectionNum) {
        section(sectionNum);
      }
    }, false);
  });

  window.setInterval(function() {
    changeText(activeText);
    
    activeText++;
    
    if (activeText === 3) {
      activeText = 0;
    }
  }, 8000);
});

function changeText(param) {
  for(var i = 0; i < texts.length; i++) {
    texts[i].classList.remove("active");
  }
  
  texts[param].classList.add("active");
}

function section(e) {
  $("html, body").animate({
    scrollTop: $("section.section-" + e).position().top - $("header").height()
  }, "slow");
}
