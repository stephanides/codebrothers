var texts = [];
var activeText = 1;
var modal = document.getElementById("responseModal");
var textTypingInterval = 0;
var shapeBlock = document.getElementsByClassName("shape-block")[0];

$(document).ready(function() {
  var typingTexts = document.querySelectorAll(".typingText");
  var navLinks = document.querySelectorAll("a");
  var closeModalBtns = modal.querySelectorAll("button");

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
  [].forEach.call(closeModalBtns, function(closeModalBtn) {
    closeModalBtn.addEventListener("click", handleModalOff, false);
  });
  modal.addEventListener("click", handleModalOff, false);
  window.addEventListener("scroll", function() {
    if(shapeBlock.getBoundingClientRect().top < 200) {
      if(textTypingInterval > 0) {
        window.clearInterval(textTypingInterval);
        textTypingInterval = 0;
      }
    } else if(textTypingInterval === 0) {
      startTextTyping();
    }
  }, false);

  startTextTyping();
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

function handleModalOff() {
  modal.classList.replace("show", "hide");
  setTimeout(function() {
    modal.classList.remove("z-modal");
  }, 300);
}

function startTextTyping() {
  textTypingInterval = window.setInterval(function() {
    console.log("INTERVAL STARTED");
    changeText(activeText);
    
    activeText++;
    
    if (activeText === 3) {
      activeText = 0;
    }
  }, 8000);
}

function section(e) {
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
      if(modal && !modal.classList.contains("show")) {
        modal.querySelector("p").innerHTML = "Vaša správa bola úspešne odoslaná.\nČoskoro sa Vám ozveme s odpoveďou.";
        modal.classList.replace("hide", "show");
        modal.classList.add("z-modal");
      }
    },
    error: function(err) {
      if(modal && !modal.classList.contains("show")) {
        modal.querySelector("p").innerHTML = "Došlo k chybe. Vášu správa sa nepodarilo odoslať.\nSkúste neskôr prosím.";
        modal.classList.replace("hide", "show");
        modal.classList.add("z-modal");
      }
    }
  });
}
