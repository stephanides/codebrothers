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

      handleLink(el);
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

function handleLink(el) {
  var sectionNum = 0;

  if(el instanceof HTMLAnchorElement) {
    for(var i = 0; i < el.classList.length; i++) {
      if(el.classList[i].indexOf("section-") > -1) {
        sectionNum = parseInt(el.classList[i].split("-")[1]);
      }
    }
  
    if(sectionNum) {
      section(sectionNum);
    }
  } else {
    handleLink(el.parentElement);
  }
}

function section(e) {
  console.log("GOT TO SECTION: ", e);

  $("html, body").animate({
    scrollTop: document.querySelector("section.section-" + e).offsetTop - document.getElementsByTagName("header")[0].offsetHeight
  }, "slow");
}

function submitForm(e) {
  event.preventDefault();

  var data = {
    name: e.name.value,
    email: e.email.value,
    text: e.text.value
  };
  
  $.ajax({
    url: "/email/send",
    type: "POST",
    data: data,
    success: function(resp) {
      console.log(resp);
    },
    error: function(err) {
      console.log(err);
    }
  });
}
