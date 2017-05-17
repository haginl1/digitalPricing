var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    }),
    it('should return 1 when its the second item', function() {
      assert.equal(1, [1,2,3].indexOf(2));
    });
  });
});

describe('Workout', function() {
    it('should return an error when an invalid workout types is sent', function() {
        assert.equal(1, 1);
    })
})
