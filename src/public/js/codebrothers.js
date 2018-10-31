var texts = [];
var typingTexts = document.querySelectorAll(".typingText");
var activeText = 0;
var textTypingInterval = 0;
var modal = document.getElementById("responseModal");
var shapeBlock = document.getElementsByClassName("shape-block")[0];
var navLinks = document.querySelectorAll("a");
var closeModalBtns = modal.querySelectorAll("button");
var mobileNav = document.querySelector(".mobile");
var mobileNavBtn = mobileNav.querySelector(".nav-btn button");
var mobileNavLinks = mobileNav.querySelectorAll("nav ul li a");

// timer variables
var timer = 0;
var start = true;     // flags that you want the countdown to start
var stopIn = 8000;    // how long the timer should run
var stopTime = 0;     // used to hold the stop time
var stop = false;     // flag to indicate that stop time has been reached
var timeTillStop = 0; // holds the display time

window.onload = function () {
  // mixpanel.track("Page Visit");

  for(var i = 0; i < typingTexts.length; i++) {
    texts.push(typingTexts[i]);
  }

  if (document.getElementsByClassName("typingText").length > 0) {
    startTextTyping();
  }

  [].forEach.call(navLinks, function(navLink) {   
    navLink.addEventListener("click", function(e) {
      var el = e.target;

      if($(el).closest(".mobile")) {
        mobileNavBtn.classList.remove("active");
        mobileNavBtn.querySelector("i").classList.replace("fa-align-left", "fa-align-right");
        document.querySelector(".mobile nav").classList.replace("d-block", "d-none");
      }

      handleLink(el);
    }, false);
  });
  
  [].forEach.call(closeModalBtns, function(closeModalBtn) {
    closeModalBtn.addEventListener("click", handleModalOff, false);
  });
  
  modal.addEventListener("click", handleModalOff, false);

  mobileNavBtn.addEventListener("click", function(e) {
    if(!mobileNavBtn.classList.contains("active")) {
      mobileNavBtn.classList.add("active");
      mobileNavBtn.querySelector("i").classList.replace("fa-align-right", "fa-align-left");
      document.querySelector(".mobile nav").classList.replace("d-none", "d-block");
    } else {
      mobileNavBtn.classList.remove("active");
      mobileNavBtn.querySelector("i").classList.replace("fa-align-left", "fa-align-right");
      document.querySelector(".mobile nav").classList.replace("d-block", "d-none");
    }
  }, false);

  if (shapeBlock) {
    window.addEventListener("scroll", function() {
      if(shapeBlock.getBoundingClientRect().top < 200) {
        if(textTypingInterval > 0) {
          stopTextTyping();
        }
      } else if(textTypingInterval === 0) {
        startTextTyping();
      }
    }, false);
  }
};

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
  window.requestTimeout(function () {
    modal.classList.remove("z-modal");
  }, 300);
  /*setTimeout(function() {
    modal.classList.remove("z-modal");
  }, 300);*/
}

function startTextTyping() {
  typingTexts[activeText].classList.add("active");

  /*textTypingInterval = setInterval(function() {
    activeText++;
    
    if (activeText === 3) {
      activeText = 0;
    }

    changeText(activeText);
  }, 8000);*/
  // var now = new Date().getTime();
  // textTypingInterval = draw(now);

  // main update function
  function update(timer) {
    timer = timer;
    if (start) {
      stopTime = timer + stopIn;
      
      activeText++;
    
      if (activeText === 3) {
        activeText = 0;
      }

      changeText(activeText);

      start = false;
    } else {
      if(timer >= stopTime) {
        stop = true;
      }
    }

    timeTillStop = stopTime - timer;

    if(!stop){
      requestAnimationFrame(update); // continue animation until stop
    } else {
      start = true;
      stop = false;
      stopTime = 0;
      timeTillStop = 0;
      textTypingInterval = requestAnimationFrame(update);
    }
  }
  textTypingInterval = requestAnimationFrame(update);  // start the animation
}

function stopTextTyping() {
  start = true;
  stop = true;
  stopTime = timer + stopIn;
  timeTillStop = stopTime - timer;
  cancelAnimationFrame(textTypingInterval);
  textTypingInterval = 0;
  
  if(typingTexts[activeText].classList.contains("active")) {
    typingTexts[activeText].classList.remove("active");
  }
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
