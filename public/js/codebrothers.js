function section(e){
  	$('html, body').animate({scrollTop:$(`#section-${e}`).position().top}, 'slow');
}

var texts=[];
$(document).ready(function(){
    $(".typingText").each(function(){ texts.push($(this));}); 
    console.log(texts);
});

function changeText(param){
		for(i = 0; i < texts.length; i++){
			texts[i].removeClass('active');
		}
		texts[param].addClass('active');
}

var activeText = 1;
window.setInterval(function(){
	changeText(activeText);
	activeText++;
	if (activeText == 3) {
		activeText = 0;
	}
}, 8000);

function scroll(){
	var checkScroll = window.pageYOffset;
	if(checkScroll > 100){
		document.getElementById("section-0").classList.add("headerScroll");
	}
	else{
		document.getElementById("section-0").classList.remove("headerScroll");
	}
}

window.addEventListener("scroll", scroll, true);