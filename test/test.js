var assert = require('assert');
var pricing = require("../controllers/pricing_controller.js");


describe('Get the streaming rates based on years of term', function() {
  describe('Test success use cases', function() {
    it('should return the value in the first year when a one year term', function() {
        range = {one_year_rate: 100}
        assert.equal(pricing.getStreamingRate(1, range), 100);
    })
    it('should return the value in the second year when a two year term', function() {
        range = {two_year_rate: 200}
        assert.equal(pricing.getStreamingRate(2, range), 200);
    })
    it('should return the value in the third year when a three year term', function() {
        range = {three_year_rate: 300}
        assert.equal(pricing.getStreamingRate(3, range), 300);
    })
  });
describe('Test failure use cases', function() {
    it('should return 0 if there is no price for year one but a one year term', function() {
        range = {}
        assert.equal(pricing.getStreamingRate(1, range), 0);
    })
    it('should return 0 if there is a NULL price for year one but a one year term', function() {
        range = {one_year_rate: null}
        assert.equal(pricing.getStreamingRate(1, range), 0);
    })
    it('should return 0 if there is no price for year two but a two year term', function() {
        range = {}
        assert.equal(pricing.getStreamingRate(2, range), 0);
    })
    it('should return 0 if there is a NULL price for year two but a two year term', function() {
        range = {two_year_rate: null}
        assert.equal(pricing.getStreamingRate(2, range), 0);
    })
    it('should return 0 if there is no price for year three but a three year term', function() {
        range = {}
        assert.equal(pricing.getStreamingRate(3, range), 0);
    })
    it('should return 0 if there is a NULL price for year three but a three year term', function() {
        range = {three_year_rate: null}
        assert.equal(pricing.getStreamingRate(3, range), 0);
    })
  });
})
