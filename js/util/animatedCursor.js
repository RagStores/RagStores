jQuery(document).ready(function ($) {
	// https://www.cssscript.com/animated-cursor/
	// animated cursor:url()
	// simple script that sets the cursor image to an array that's looped through-- simulating animated frames, using cursor:url("...");

	// array of cursor frames
	// NOTE: all arrays must be of same length (they share cursorAnimationFrame)
	var arr_cursorAnimationFrames = ["main-cursor-frame-0.gif","main-cursor-frame-1.gif","main-cursor-frame-2.gif","main-cursor-frame-3.gif","main-cursor-frame-4.gif","main-cursor-frame-5.gif","main-cursor-frame-0.gif","main-cursor-frame-0.gif","main-cursor-frame-0.gif","main-cursor-frame-0.gif","main-cursor-frame-0.gif","main-cursor-frame-0.gif","main-cursor-frame-0.gif"];
	//var arr_buttonAnimationFrames = ["hand-cursor.gif","hand-cursor.gif"];
	// var arr_textAnimatedFrames = ["IMG_CURSOR_03_FRAME01.png", "IMG_CURSOR_03_FRAME02.png", "IMG_CURSOR_03_FRAME03.png", "IMG_CURSOR_03_FRAME04.png"];
	// var arr_miscAnimatedFrames = ["IMG_CURSOR_04_FRAME01.png", "IMG_CURSOR_04_FRAME02.png", "IMG_CURSOR_04_FRAME03.png", "IMG_CURSOR_04_FRAME04.png"];
	//path
	var str_cursorDirectory = "/wp-content/uploads/2021/01/"; // directory path (with cursor images)
	// interval
	//var cursorAnimationInt;
	// starting frame (current array element)
	var cursorAnimationFrame = 0;

	// called with setInterval...
	function animateCursor(){
		// set current animation
		document.body.style.cursor = 'url(' + str_cursorDirectory + arr_cursorAnimationFrames[cursorAnimationFrame] + '), auto';
		
		// see https://www.w3schools.com/tags/
		animatedCursorForElement('label', arr_cursorAnimationFrames);
		//animatedCursorForElement('a', arr_buttonAnimationFrames);
		//animatedCursorForElement('button', arr_buttonAnimationFrames);
		//animatedCursorForElement('input', arr_buttonAnimationFrames);
		// headers
		//animatedCursorForElement('h1', arr_miscAnimatedFrames);
		//animatedCursorForElement('h2', arr_miscAnimatedFrames);
		//animatedCursorForElement('h3', arr_miscAnimatedFrames);
		//animatedCursorForElement('h4', arr_miscAnimatedFrames);
		//animatedCursorForElement('h5', arr_miscAnimatedFrames);
		//animatedCursorForElement('h6', arr_miscAnimatedFrames);
					
		// increment
		cursorAnimationFrame += 1;
		// reached end of array, loop
		if(cursorAnimationFrame > arr_cursorAnimationFrames.length-1){
			cursorAnimationFrame = 0;
		}
	}

	// Chenge cursor on click, but it isn't work 'cause is difficult to specify the element
	/*$(document).on('click', 'a' ,function (event) {
        $(this).style.cursor = 'url(' + str_cursorDirectory + 'hand-press-cursor.gif), auto';
    });*/

	// special cursor for elements (buttons and links)
	// pass it the tag name of element and the desired animation array
	function animatedCursorForElement(str_tagName, arr){
		var _element = document.getElementsByTagName(str_tagName);
		for (var i=0; i<_element.length; ++i){
			_element[i].style.cursor = 'url(' + str_cursorDirectory + arr[cursorAnimationFrame] + '), auto';
		}
	}

	// call to start
	//function animatedCursor(){
		cursorAnimationInt = setInterval(animateCursor, 115);
	//}
});