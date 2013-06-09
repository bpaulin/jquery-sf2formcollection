describe("sf2FormCollection", function() {
  beforeEach(function () {
    $('<div id="container"></div>').appendTo('body');
  });

  afterEach(function () {
      $("#container").remove();
  });

  it('should be testable', function () {
    var div = $("container");
    expect(div.sf2FormCollection).toBeDefined();
  });
});