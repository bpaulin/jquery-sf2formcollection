jasmine.getFixtures().fixturesPath = 'spec/fixtures';
describe("sf2FormCollection can sort items", function() {
  beforeEach(function () {
    loadFixtures('exemple1.html');
  });

  afterEach(function () {
    $("#collection").remove();
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

  it('should not update $(selectorIndex) if not supplied', function () {
    var container = $("#collection");
    var settings = {
      'sortItem': 'test <a href="#">Sort this item</a>'
    };
    container.sf2FormCollection(settings);
    $('.sf2fc-add').click();

    container.find('.sf2fc-items').find('.sf2fc-item').each(
      function (index) {
        expect(
          $(this).find('span.index').html()
        ).not.toEqual(index.toString());
      }
    );
  });

  it('should update $(selectorIndex) if supplied after init and add', function () {
    var container = $("#collection");
    var settings = {
      'sortItem': 'test <a href="#">Sort this item</a>',
      "selectorIndex": "span.index"
    };
    container.sf2FormCollection(settings);
    $('.sf2fc-add').click();

    container.find('.sf2fc-items').find('.sf2fc-item').each(
      function (index) {
        expect(
          $(this).find('span.index').html()
        ).toEqual(index.toString());
      }
    );
  });

  it('should update $(selectorIndex) if supplied after sort', function () {
    var container = $("#collection");
    var settings = {
      'sortItem': 'test <a href="#">Sort this item</a>',
      "selectorIndex": "span.index"
    };
    container.sf2FormCollection(settings);
    $('.sf2fc-add').click();
    container.find('.sf2fc-items').find('.sf2fc-item').first().appendTo(
      container.find('.sf2fc-items')
    );
    container.find('.sf2fc-items').trigger('update');
    container.find('.sf2fc-items').find('.sf2fc-item').each(
      function (index) {
        expect(
          $(this).find('span.index').html()
        ).toEqual(index.toString());
      }
    );
  });

  it('should update $(selectorIndex) if supplied after remove', function () {
    var container = $("#collection");
    var settings = {
      'sortItem': 'test <a href="#">Sort this item</a>',
      "selectorIndex": "span.index"
    };
    container.sf2FormCollection(settings);

    container.find('.sf2fc-items .sf2fc-item:eq(2) .sf2fc-remove').click();
    container.find('.sf2fc-items').trigger('update');
    container.find('.sf2fc-items').find('.sf2fc-item').each(
      function (index) {
        expect(
          $(this).find('span.index').html()
        ).toEqual(index.toString());
      }
    );
  });
});