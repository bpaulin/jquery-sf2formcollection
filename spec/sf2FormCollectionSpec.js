describe("sf2FormCollection", function() {
  beforeEach(function () {
    var collection = $('<div id="collection"></div>');
    collection.data('prototype','<div data-test="__NAME__">__NAME__</div>')
    for (var i=0; i < 5; i++) {
      $('<div>'+i+'</div>').data('test','__NAME__').appendTo(collection);
    };
    collection.appendTo('body');
  });

  afterEach(function () {
    $("#collection").remove();
  });

  it('should be testable', function () {
    var container = $("#collection");
    expect(container.sf2FormCollection).toBeDefined();
  });

  it('should move each original item in div.sf2fc-items', function () {
    var container = $("#collection");
    var orig = container.html();
    container.sf2FormCollection();
    expect(container.find('.sf2fc-items').html()).toEqual(orig);
  });

  it('should add an add element with default content', function () {
    var container = $("#collection");
    container.sf2FormCollection();
    expect(container.children('.sf2fc-add').html()).toEqual('<a href="#">Add an item</a>');
  });

  it('should add an add element with personalized content', function () {
    var container = $("#collection");
    var settings = {
      'addItem': '<a href="#">personalized link</a>'
    };
    container.sf2FormCollection(settings);
    expect(container.children('.sf2fc-add').html()).toEqual(settings['addItem']);
  });

  it('click on add element should append prototype', function () {
    var container = $("#collection");
    container.sf2FormCollection();
    orig = container.find('.sf2fc-items').contents().length;
    $('.sf2fc-add').click();
    expect(container.find('.sf2fc-items').contents().length).toEqual(orig+1);
  });

  it('should replace __NAME__ with new index in added elements', function () {
    var container = $("#collection");
    container.sf2FormCollection();
    orig = container.find('.sf2fc-items').contents().length;
    $('.sf2fc-add').click();
    expect(container.find('.sf2fc-items').children('*').last().data('test')).
      toEqual(orig);
  });

  // it('should add an remove element original item', function () {
  //   var container = $("#collection");
  //   var settings = {
  //     'removeItem': '<a href="#">Remove this item</a>'
  //   };
  //   container.sf2FormCollection(settings);
  //   //TODO
  // });
});