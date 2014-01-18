describe("sf2FormCollection", function() {
  beforeEach(function () {
    var collection = $('<div id="collection"></div>'),
        link = $('<div id="link_add"></div>');
    collection.data('prototype','<div data-test="__NAME__"><span class="index"></span>__NAME__</div>');
    for (var i=0; i < 5; i++) {
      $('<div>'+i+'</div>').data('test','__NAME__').appendTo(collection);
    }
    link.appendTo('body');
    collection.appendTo('body');
  });

  afterEach(function () {
    $("#collection").remove();
  });

  it('should be testable', function () {
    var container = $("#collection");

    expect(container.sf2FormCollection).toBeDefined();
  });

  it('should move each original item in a div.sf2fc-item, all in a div.sf2fc-items', function () {
    var container = $("#collection");
    container.sf2FormCollection();

    expect(container.find('.sf2fc-items>*').length).toEqual(5);
    container.find('.sf2fc-items>*').each(function () {
      expect($(this).is('div.sf2fc-item')).toBeTruthy();
    });
  });

  it('should add an add element with default content', function () {
    var container = $("#collection");
    container.sf2FormCollection();

    expect(container.children('.sf2fc-add').html()).toEqual('Add an item');
    expect(container.children().last().hasClass('sf2fc-add')).toBeTruthy();
  });

  it('should add an add element with personalized content', function () {
    var container = $("#collection");
    var settings = {
      'addItem': 'test <a href="#">personalized link</a>'
    };
    container.sf2FormCollection(settings);

    expect(container.children('.sf2fc-add').html()).toEqual('test <a href="#">personalized link</a>');
  });

  it('should add an add element before collection', function () {
    var container = $("#collection");
    var settings = {
      'prependAddItem': true
    };
    container.sf2FormCollection(settings);

    expect(container.children().first().hasClass('sf2fc-add')).toBeTruthy();
    expect(container.children('.sf2fc-add').html()).toEqual('Add an item');
  });

  it('should use an existant object as add link', function () {
    var container = $("#collection"),
        orig;
    var settings = {
      'addItem': '#link_add'
    };
    container.sf2FormCollection(settings);
    orig = container.find('.sf2fc-items').contents().length;
    $('#link_add').click();

    expect(container.find('.sf2fc-items').contents().length).toEqual(orig+1);
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
        orig,
        last;
    container.sf2FormCollection();
    orig = container.find('.sf2fc-items').contents().length;
    $('.sf2fc-add').click();

    last = container.find('.sf2fc-items>*').last();

    expect(
      $('<div>').append(last.clone()).html()
    ).toEqual("<div class=\"sf2fc-item\"><div data-test=\"5\"><span class=\"index\"></span>5</div></div>");
  });

  it('should replace personnalized token with new index in added elements', function () {
    var container = $("#collection"),
        orig,
        last;
    container.data('prototype','<div data-other-test="__token__"><span>__token__</span></div>');
    var settings = {
      'tokenIndex': '__token__'
    };
    container.sf2FormCollection(settings);
    orig = container.find('.sf2fc-items').contents().length;
    $('.sf2fc-add').click();

    last = container.find('.sf2fc-items>*').last();

    expect(
      $('<div>').append(last.clone()).html()
    ).toEqual("<div class=\"sf2fc-item\"><div data-other-test=\"5\"><span>5</span></div></div>");
  });

  it('should add a remove element at the end of each item', function () {
    var container = $("#collection");
    var settings = {
      'removeItem': 'test <a href="#">Remove this item</a>'
    };
    container.sf2FormCollection(settings);
    $('.sf2fc-add').click();

    container.find('.sf2fc-items').children('*').each(function (){
      expect($(this).children().last().hasClass('sf2fc-remove')).toBeTruthy();
    });
  });

  it('should add a remove element at the begin of each item', function () {
    var container = $("#collection");
    var settings = {
      'removeItem': 'test <a href="#">Remove this item</a>',
      'prependRemoveItem': true
    };
    container.sf2FormCollection(settings);
    $('.sf2fc-add').click();

    container.find('.sf2fc-items').children('*').each(function (){
      expect($(this).children().first().hasClass('sf2fc-remove')).toBeTruthy();
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

  it('should make collection sortable if sortItem is set', function () {
    var container = $("#collection");
    var settings = {
      'sortItem': 'test <a href="#">Sort this item</a>'
    };
    container.sf2FormCollection(settings);

    expect(container.find('.sf2fc-items').hasClass('ui-sortable')).toBeTruthy();
  });

  it('should not make collection sortable if sortItem is notset', function () {
    var container = $("#collection");
    var settings = {};
    container.sf2FormCollection(settings);

    expect(container.find('.sf2fc-items').hasClass('ui-sortable')).toBeFalsy();
  });

  it('should add a sort element at the end of each item', function () {
    var container = $("#collection");
    var settings = {
      'sortItem': 'test <a href="#">Sort this item</a>',
      'prependSortItem': false
    };
    container.sf2FormCollection(settings);

    expect(container.find('.sf2fc-items').hasClass('ui-sortable')).toBeTruthy();

    $('.sf2fc-add').click();

    container.find('.sf2fc-items').children('*').each(function (){
      expect($(this).children().last().hasClass('sf2fc-sort')).toBeTruthy();
    });
  });

  it('should add a sort element at the begin of each item', function () {
    var container = $("#collection");
    var settings = {
      'sortItem': 'test <a href="#">Sort this item</a>'
    };
    container.sf2FormCollection(settings);
    $('.sf2fc-add').click();

    container.find('.sf2fc-items').children('*').each(function (){
      expect($(this).children().first().hasClass('sf2fc-sort')).toBeTruthy();
    });
  });
});
