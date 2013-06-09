describe("sf2FormCollection", function() {
  beforeEach(function () {
    $('<div id="container"></div>').appendTo('body');
    for (var i=0; i < 5; i++) {
      $('<div></div>').appendTo('#container');
    };
  });

  afterEach(function () {
    $("#container").remove();
  });

  it('should be testable', function () {
    var container = $("#container");
    expect(container.sf2FormCollection).toBeDefined();
  });

  it('should add a class to each original item', function () {
    var container = $("#container");
    var orig = container.children('*');
    container.sf2FormCollection();
    orig.each(function () {
      expect($(this).hasClass('sf2fc-item')).toBeTruthy();
    });
  });

  it('should add an add element with default content', function () {
    var container = $("#container");
    container.sf2FormCollection();
    expect(container.children('.sf2fc-add').html()).toEqual('<a href="#">Add an item</a>');
  });

  it('should add an add element with personalized content', function () {
    var container = $("#container");
    var settings = {
      'addItem': '<a href="#">personalized link</a>'
    };
    container.sf2FormCollection(settings);
    expect(container.children('.sf2fc-add').html()).toEqual(settings['addItem']);
  });
});