(function ($) {

	Drupal.behaviors.quickloc = function (context) {};

//	Our namespace
	Drupal.quickloc = {};
	
//	Define the function that will seek out our text strings
	Drupal.quickloc.remover = function() {
		$(document).ready( function() {
		// Reference the correct element so we can use it later
		var markup = $('#quickloc_original_markup').text();
		
		// Replace content using regexp that selects (globally, case insensitive) 
		// any word boundary followed by one of @|!|% followed by any combination of letters
		//  will match a hrefs and markup as well
		$('#quickloc_original_markup').html(markup.replace(/\B([@|!|%]{1}[\w]*)|(.lt.[/]{0,1}[\w]*&gt;)|(.lt.[\w]*[\s\w="]+)|("&gt;)/gi,
			'<span class="quicloc_insertable">'+"$1$2$3$4"+'</span>'));
		
		// When user clicks a token element
		$('.quicloc_insertable').live ('click', function() {
			// First save the textarea data
			var translatearea = $('#locale-translate-edit-form textarea'); 				// This is our target
			var translateareatxt = $('#locale-translate-edit-form textarea').val(); 	// do it once to save some ms
			var caretpos = $(translatearea).caret()+0; 									// make sure it is an int
			
			// Then split the textarea string and insert the token element text into the textarea string 
			var newareacontent = translateareatxt.substring(0, caretpos) 
								+ $(this).text() 
								+ translateareatxt.substring(caretpos, translateareatxt.length);

			// Last thing we do is update the textarea and set focus and caret pos where they should be
			$(translatearea).val(newareacontent);
			$(translatearea).focus();
			$(translatearea).caret(caretpos+$(this).text().length);
		});
		});
		
	};

//	Start the helper
	Drupal.quickloc.remover();

})(jQuery);
