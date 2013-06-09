(function($) {
    $.fn.sf2FormCollection=function(options)
    {        
    	$(this).children('*').each(function () {
		  $(this).addClass('sf2fc-item');
		});

    	$("<div id='sf2fc-add'></div>").appendTo($(this));

    	return $(this);
    };
})(jQuery);
