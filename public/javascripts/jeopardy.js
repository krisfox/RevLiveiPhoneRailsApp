(function( $ ){

	var methods = {
		init : function( options ) {

			return this.each(function(){

				$(this).find('.points').bind('click', function() {
					question = $(this).parent().find('.text');
					question.css('opacity',0).css('visibility','visible')
					question.css('width', $(this).width()).css('height', $(this).height())
					question.css('top', $(this).offset().top).css('left', $(this).offset().left)
					question.animate({'opacity': 1, 'left':0, 'top':0, 'width':$(document).width(), 'height':$(document).height()}, 500)
					console.log(question)
				})
				
				
			});

		},
		close_question: function(elem) {
			console.log($(elem).closest('.text'))
			$(elem).closest('.text').fadeOut();
		},
		reposition : function( ) { // ... },
		show : function( ) { // ... },
		hide : function( ) { // ... },
		update : function( content ) { // ...}
	};

	$.fn.tooltip = function( method ) {

		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}    

	};

	})( jQuery );