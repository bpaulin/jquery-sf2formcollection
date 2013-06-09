(function($) {
    $.fn.sf2FormCollection=function(options)
    {
    	var container = $(this);

    	/** Load params */
        var defauts=
        {
            'addItem': '<a href="#">Add an item</a>',
            'removeItem': '<a href="#">Remove this item</a>',
        };
        params = $.extend(defauts, options);

        /** Move Original items */
        items = $('<div class="sf2fc-items"></div>');
        $(this).children('*').detach().appendTo(items);
        items.appendTo($(this));
		$(this).data('index', items.contents().length);

    	/** AddElement */
    	var containerAddElement = $("<div class='sf2fc-add'></div>");
		var addElement = $(params['addItem']);

    	addElement.appendTo(containerAddElement);
    	containerAddElement.appendTo($(this));

    	containerAddElement.on('click', function(e) {
            e.preventDefault();
            var prototype = container.data('prototype');
            var index = container.data('index');
			
			prototype = prototype.replace(/__NAME__/g, index);
            container.find('.sf2fc-items').append(prototype);

			container.data('index', index+1);
        });

    	/** return */
    	return $(this);
    };
})(jQuery);
