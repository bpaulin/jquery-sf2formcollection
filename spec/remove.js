jasmine.getFixtures().fixturesPath = 'spec/fixtures';
describe("sf2FormCollection can remove an item", function() {
  beforeEach(function () {
    loadFixtures('exemple1.html');
  });

  afterEach(function () {
    $("#collection").remove();
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
});
