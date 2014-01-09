/*
 *  sf2FormCollection - v0.2.0
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
                "addItem": "<a href=\"#\">Add an item</a>",
                "removeItem": "",
                "tokenIndex": "__NAME__",
                "sortable": false,
                "sortItem": "<a href=\"#\">Sort</a>"
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
                this.sf2FormCollection();
        }

        Plugin.prototype = {
                init: function () {
                        // Place initialization logic here
                        // You already have access to the DOM element and
                        // the options via the instance, e.g. this.element
                        // and this.settings
                        // you can add more functions like the one below and
                        // call them like so: this.yourOtherFunction(this.element, this.settings).
                        console.log("sf2FormCollection");
                },

                sf2FormCollection: function () {
                        // some logic
                        var that = this,
                        container = $(this.element),
                        containerAddElement = $("<div class=\"sf2fc-add\"></div>"),
                        addElement = $(this.settings.addItem),

                        /** Move Original items */
                        items = $("<div class=\"sf2fc-items\"></div>");
                        container.children("*").each( function() {
                            item = $("<div class=\"sf2fc-item\"></div>");
                            $(this).detach().appendTo(item);
                            item.appendTo(items);
                        });
                        items.appendTo(container);
                        container.data("index", items.contents().length);

                        /** AddElement */
                        addElement.attr("id","sf2fc-add");
                        addElement.appendTo(containerAddElement);
                        containerAddElement.appendTo($(this.element));

                        /** Click on AddElement */
                        containerAddElement.on("click", function(e) {
                            e.preventDefault();
                            var prototype = container.data("prototype"),
                                index = container.data("index"),
                                re = new RegExp(that.settings.tokenIndex, "g");
                            prototype = prototype.replace(re, index);
                            item = $("<div class=\"sf2fc-item\"></div>");
                            item.append(prototype);

                            link = $(that.settings.removeItem);
                            link.addClass("sf2fc-remove");
                            link.click(function() {
                                $(this).parent().remove();
                            });
                            item.append(link);

                            /** SortElement */
                            if (that.settings.sortable) {
                                link = $(that.settings.sortItem);
                                link.addClass("sf2fc-sort");
                                item.prepend(link);
                            }

                            container.find(".sf2fc-items").append(item);

                            container.data("index", index+1);
                        });

                        /** RemoveElement */
                        if (this.settings.removeItem !== "") {
                            container.find(".sf2fc-items").children("*").each(function () {
                                link = $(that.settings.removeItem);
                                link.addClass("sf2fc-remove");
                                $(this).append(link);
                                link.click(function() {
                                    $(this).parent().remove();
                                });
                            });
                        }

                        /** SortElement */
                        if (this.settings.sortable) {
                            container.find(".sf2fc-items").sortable({
                                cursor: "move",
                                handle: ".sf2fc-sort"
                            });
                            container.find(".sf2fc-items").children("*").each(function () {
                                link = $(that.settings.sortItem);
                                link.addClass("sf2fc-sort");
                                $(this).prepend(link);
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
