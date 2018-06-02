var texts = [];
var activeText = 1;

$(document).ready(function() {
  var typingTexts = document.querySelectorAll(".typingText");
  var svgImgs = document.querySelectorAll(".svg");
  
  for(var i = 0; i < typingTexts.length; i++) {
    texts.push(typingTexts[i]);
  }

  console.log(texts);

  [].forEach.call(svgImgs, function(img) {
    var _img = img;
    var url = img.src;
 
    myFetch(url, function(data) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, "text/xml");
      var svg = xmlDoc.getElementsByTagName("svg")[0];
      
      if(_img.id) {
        svg.setAttribute("id", _img.id);
      }
      if(_img.className) {
        svg.setAttribute("class", _img.className + " replaced-svg");
      }
      
      for(var k = 0; k < svg.attributes.length; k++) {
        if (svg.attributes[k].name.indexOf("xmlns") > -1) {
          svg.removeAttribute(svg.attributes[k].name);
        }
      }
      
      _img.parentElement.replaceChild(svg, _img);
    });
  });

  window.setInterval(function() {
    changeText(activeText);
    
    activeText++;
    
    if (activeText === 3) {
      activeText = 0;
    }
  }, 8000);
  
  window.addEventListener("scroll", scroll, true);
});

function changeText(param) {
  for(var i = 0; i < texts.length; i++) {
    texts[i].classList.remove('active');
  }
  
  texts[param].classList.add('active');
}

function myFetch(url, callback) {
  var req = new XMLHttpRequest();
  
  req.addEventListener("load", reqListener);
  req.open("GET", url);
  req.send();

  function reqListener () {
    if(typeof callback === "function") {
      callback(this.responseText);
    }
  }
}

function scroll() {
  var checkScroll = window.pageYOffset;
  
	if(checkScroll > 100){
		document.getElementById("section-0").classList.add("headerScroll");
	} else{
		document.getElementById("section-0").classList.remove("headerScroll");
	}
}

function section(e) {
  $('html, body').animate({
    scrollTop:$("#section-" + e).position().top
  }, 'slow');
}
