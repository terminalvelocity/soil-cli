var assert = require('assert');
var Soil = require('../index');

describe('Array', function(){
  describe('#indexOf()', function(){

    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });

    it('should return the proper index when the value is present', function(){
      assert.equal(0, [1,2,3].indexOf(1));
    });
  });

});

describe('Soil', function() {
  it('should return a function', function() {
    assert.equal(typeof Soil, typeof Function);
  });
});
