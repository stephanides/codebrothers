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

// $(document).ready(function() {});

window.onload = function () {
  mixpanel.track("Page Visit");

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

  textTypingInterval = window.requestInterval(function () {
    activeText++;
    
    if (activeText === 3) {
      activeText = 0;
    }

    changeText(activeText);
  }, 8000); /*window.setInterval(function() {
    activeText++;
    
    if (activeText === 3) {
      activeText = 0;
    }

    changeText(activeText);
  }, 8000);*/
}

function stopTextTyping() {
  window.clearRequestInterval(textTypingInterval);
  // window.clearInterval(textTypingInterval);
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


// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
window.requestInterval = function(fn, delay) {
	if( !window.requestAnimationFrame       && 
		!window.webkitRequestAnimationFrame && 
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      && 
		!window.msRequestAnimationFrame)
			return window.setInterval(fn, delay);
			
	var start = new Date().getTime(),
		handle = new Object();
		
	function loop() {
		var current = new Date().getTime(),
			delta = current - start;
			
		if(delta >= delay) {
			fn.call();
			start = new Date().getTime();
		}

		handle.value = requestAnimFrame(loop);
	};
	
	handle.value = requestAnimFrame(loop);
	return handle;
}

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
    window.clearRequestInterval = function(handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearInterval(handle);
};

/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

window.requestTimeout = function(fn, delay) {
	if( !window.requestAnimationFrame      	&& 
		!window.webkitRequestAnimationFrame && 
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      && 
		!window.msRequestAnimationFrame)
			return window.setTimeout(fn, delay);
			
	var start = new Date().getTime(),
		handle = new Object();
		
	function loop(){
		var current = new Date().getTime(),
			delta = current - start;
			
		delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
	};
	
	handle.value = requestAnimFrame(loop);
	return handle;
};

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestTimeout = function(handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearTimeout(handle);
};
