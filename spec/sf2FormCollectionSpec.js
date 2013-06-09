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

  it('should add a class to each item', function () {
    var container = $("#container");
    container.sf2FormCollection();
    container.children('*').each(function () {
      expect($(this).hasClass('sf2fc-item')).toBeTruthy();
    });
  });
});