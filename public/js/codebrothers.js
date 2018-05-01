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

jQuery('img.svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });