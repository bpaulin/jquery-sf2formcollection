(function($) {
    $.fn.sf2FormCollection=function(options)
    {
    	var container = $(this);

    	/** Load params */
        var defauts=
        {
            'addItem': '<a href="#">Add an item</a>',
        };
        params = $.extend(defauts, options);

        /** Move Original items */
        items = $('<div class="sf2fc-items"></div>');
        $(this).children('*').detach().appendTo(items);
        items.appendTo($(this));

    	/** AddElement */
    	var containerAddElement = $("<div class='sf2fc-add'></div>");
		var addElement = $(params['addItem']);

    	addElement.appendTo(containerAddElement);
    	containerAddElement.appendTo($(this));

    	containerAddElement.on('click', function(e) {
            e.preventDefault();
            var prototype = container.data('prototype');
            container.find('.sf2fc-items').append(prototype);
        });

    	/** return */
    	return $(this);
    };
})(jQuery);
