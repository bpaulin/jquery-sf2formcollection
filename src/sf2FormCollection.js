(function($) {
    $.fn.sf2FormCollection=function(options)
    {
        var defauts=
        {
            'addItem': '<a href="#">Add an item</a>',
        };
        params = $.extend(defauts, options);

    	$(this).children('*').each(function () {
		  $(this).addClass('sf2fc-item');
		});

    	var containerAddElement = $("<div class='sf2fc-add'></div>");
		var addElement = $(params['addItem']);

    	addElement.appendTo(containerAddElement);
    	containerAddElement.appendTo($(this));

    	return $(this);
    };
})(jQuery);
