jasmine.getFixtures().fixturesPath = 'spec/fixtures';
describe("sf2FormCollection can add an item", function() {
  beforeEach(function () {
    loadFixtures('exemple1.html');
  });

  afterEach(function () {
    $("#collection").remove();
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
});
