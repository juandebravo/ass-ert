describe('should', function () {

  var ass = require('../');
  var assCheckShould = ass._(Object.prototype).prop('should').isa(ass.Chain).assert;
  var assCheckNotShould = ass._(Object.prototype).not.prop('should').assert;

  afterEach(function () {
    ass.should.restore();
    assCheckNotShould();
  });

  describe('installation', function () {
    it('install with default name', function () {

      assCheckNotShould();
      ass.should();
      assCheckShould();

    });

    it('install with a custom name', function () {

      ass.should('ass');
      ass(Object.prototype).prop('ass').isa(ass.Chain);

    });

    it('uninstall default', function () {
      ass.should();
      assCheckShould();

      ass.should.restore();
      assCheckNotShould();

      ass.should();
      assCheckShould();

      ass.should(null); // shortcut to restore
      assCheckNotShould();
    });

    it('uninstall custom name', function () {
      ass.should('ass');
      ass(Object.prototype).prop('ass').isa(ass.Chain);

      ass.should.restore('ass');
      ass(Object.prototype).not.prop('ass');
    });

    it('install already defined', function () {
      ass.should();
      assCheckShould();
      ass.should();
      assCheckShould();

      ass.should.restore();
      assCheckNotShould();
    });

    it('install name already used', function () {
      ass.checkmarks();
      try {
        Object.prototype.should = function () {};
        ass.should();
      } catch (e) {
        ass(e).error.mark;
      } finally {
        delete Object.prototype.should;
      }

      ass.checkmarks(1);
    });

  });

});