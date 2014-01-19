jasmine.getFixtures().fixturesPath = 'spec/fixtures';
describe("sf2FormCollection initialisation", function() {
  beforeEach(function () {
    loadFixtures('exemple1.html');
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
});
