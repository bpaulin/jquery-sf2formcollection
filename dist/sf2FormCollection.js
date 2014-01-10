/*
 *  sf2FormCollection - v0.3.0
 *  sf2FormCollection
 *  https://github.com/bpaulin/jquery-sf2formcollection
 *
 *  Made by Bruno Paulin
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "sf2FormCollection",
        defaults = {
            // If addItem is a matching selector, object will be used as link
            // If not, the link will be created containing "addItem" value
            "addItem": "Add an item",
            // If addItem is not a matching selector
            // false(default): link will be added AFTER items
            // true: link will be added BEFORE items
            "prependAddItem": false,
            // "tokenIndex" value will be replaced in prototype by an unique number
            "tokenIndex": "__NAME__",
            // false(default): can't remove item
            // string: the remove link will be created containing "removeItem" value
            "removeItem": false,
            // false(default): link will be added AFTER item
            // true: link will be added BEFORE item
            "prependRemoveItem": false,
            // false(default): link will be added AFTER item
            // string: the remove link will be created containing "sortItem" value
            "sortItem": false,
            // false: link will be added AFTER item
            // true(default): link will be added BEFORE item
            "prependSortItem": true
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).

            function processItem() {
                if (that.settings.removeItem) {
                    containerRemoveElement = $("<div>").addClass("sf2fc-remove");
                    removeElement = $.parseHTML(that.settings.removeItem);
                    $.each( removeElement, function(i, el ) {
                        containerRemoveElement.append(el);
                    });


                    if (that.settings.prependRemoveItem) {
                        containerRemoveElement.prependTo(this);
                    } else {
                        containerRemoveElement.appendTo(this);
                    }

                    containerRemoveElement.click(function() {
                        $(this).parent().remove();
                    });
                }

                if (that.settings.sortItem) {
                    containerSortElement = $("<div>").addClass("sf2fc-sort");
                    sortElement = $.parseHTML(that.settings.sortItem);
                    $.each( sortElement, function(i, el ) {
                        containerSortElement.append(el);
                    });


                    if (that.settings.prependSortItem) {
                        containerSortElement.prependTo(this);
                    } else {
                        containerSortElement.appendTo(this);
                    }
                }
            }

            var that = this,
                containerAddElement,
                addElement,
                items = $("<div>").addClass("sf2fc-items");

            /** Move Original items */
            $(this.element).children("*").each( function() {
                var item = $("<div>").addClass("sf2fc-item");
                $(this).detach().appendTo(item);
                item.appendTo(items);
            });
            items.appendTo($(this.element));
            $(this.element).data("index", items.contents().length);

            /** process items */
            $(this.element).find(".sf2fc-items").children("*").each(processItem);

            /** AddElement */
            try {
                containerAddElement = $("body").find(this.settings.addItem);
                if (containerAddElement.length === 0) {
                    throw "addItem not found";
                }
            }
            catch (e) {
                containerAddElement = $("<div>").addClass("sf2fc-add");
                addElement = $.parseHTML(this.settings.addItem);
                $.each( addElement, function(i, el ) {
                    containerAddElement.append(el);
                });
                if (this.settings.prependAddItem) {
                    containerAddElement.prependTo($(this.element));
                } else {
                    containerAddElement.appendTo($(this.element));
                }
            }

            /** Click on AddElement */
            containerAddElement.on("click", function(e) {
                e.preventDefault();
                var prototype = $(that.element).data("prototype"),
                    index = $(that.element).data("index"),
                    re = new RegExp(that.settings.tokenIndex, "g");
                prototype = prototype.replace(re, index);
                item = $("<div>").addClass("sf2fc-item");
                item.append(prototype);
                item.each(processItem);

                $(that.element).find(".sf2fc-items").append(item);

                $(that.element).data("index", index+1);
            });

            /** SortElement */
            if (this.settings.sortItem) {
                $(this.element).find(".sf2fc-items").sortable({
                    cursor: "move",
                    handle: ".sf2fc-sort"
                });

            }

            /** return */
            return $(this);
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };
})( jQuery, window, document );
