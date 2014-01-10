describe("sf2FormCollection", function() {
  beforeEach(function () {
    var collection = $('<div id="collection"></div>');
    collection.data('prototype','<div data-test="__NAME__">__NAME__</div>');
    for (var i=0; i < 5; i++) {
      $('<div>'+i+'</div>').data('test','__NAME__').appendTo(collection);
    }
    collection.appendTo('body');
  });

  afterEach(function () {
    $("#collection").remove();
  });

  it('should be testable', function () {
    var container = $("#collection");

    expect(container.sf2FormCollection).toBeDefined();
  });

  xit('should move each original item in div.sf2fc-items', function () {
    var container = $("#collection");
    var orig = container.html();
    container.sf2FormCollection();

    expect(container.find('.sf2fc-items').html()).toEqual(orig);
  });

  it('should add an add element with default content', function () {
    var container = $("#collection");
    container.sf2FormCollection();

    expect(container.children('.sf2fc-add').html()).toEqual('<a href="#" id="sf2fc-add">Add an item</a>');
  });

  it('should add an add element with personalized content', function () {
    var container = $("#collection");
    var settings = {
      'addItem': '<a href="#">personalized link</a>'
    };
    container.sf2FormCollection(settings);

    expect(container.children('.sf2fc-add').html()).toEqual('<a href="#" id="sf2fc-add">personalized link</a>');
  });

  it('should append prototype when click on add element', function () {
    var container = $("#collection"),
        orig;
    container.sf2FormCollection();
    orig = container.find('.sf2fc-items').contents().length;
    $('.sf2fc-add').click();

    expect(container.find('.sf2fc-items').contents().length).toEqual(orig+1);
  });

  it('should replace default token with new index in added elements', function () {
    var container = $("#collection"),
        orig;
    container.sf2FormCollection();
    orig = container.find('.sf2fc-items').contents().length;
    $('.sf2fc-add').click();

    expect(container.find('.sf2fc-items').children('*').last().find('div').data('test')).
      toEqual(orig);
  });

  it('should replace personnalized token with new index in added elements', function () {
    var container = $("#collection"),
        orig;
    container.data('prototype','<div data-test="__token__">__token__</div>');
    var settings = {
      'tokenIndex': '__token__'
    };
    container.sf2FormCollection(settings);
    orig = container.find('.sf2fc-items').contents().length;
    $('.sf2fc-add').click();

    expect(container.find('.sf2fc-items').children('*').last().find('div').data('test')).
      toEqual(orig);
  });

  it('should add an remove element to each item', function () {
    var container = $("#collection");
    var settings = {
      'removeItem': '<a href="#">Remove this item</a>'
    };
    container.sf2FormCollection(settings);
    $('.sf2fc-add').click();

    container.find('.sf2fc-items').children('*').each(function (){
      var link = $(settings['removeItem']);
      link.addClass('sf2fc-remove');
      expect(
        $(this).html()).toContain(link.html());
    });
  });

  it('should remove item when click on remove element', function () {
    var container = $("#collection");
    var settings = {
      'removeItem': '<a href="#">Remove this item</a>'
    };
    container.sf2FormCollection(settings);

    container.find('.sf2fc-items .sf2fc-item').each(function (){
      $(this).children('.sf2fc-remove').click();
      expect(container.html()).not.toContain($(this).html());
    });
  });
});
