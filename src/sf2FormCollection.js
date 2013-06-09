(function($) {
    $.fn.sf2FormCollection=function(options)
    {        
    	$(this).children('*').each(function () {
		  $(this).addClass('sf2fc-item');
		});

    	return $(this);
    };
})(jQuery);
