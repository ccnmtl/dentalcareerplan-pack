/* global describe: true, before: true, it: true */
require('!file-loader?name=[name].[ext]!../test/view-test.html');

require('../src/static.js');

var chai = require('chai');
var assert = chai.assert;

var jQuery = require('jquery');
var module = require('../src/careerplan.js');

describe('CareerPlanningApp', function() {
    before(function() {
        var elt = jQuery('.career-planning');
        assert.isDefined(elt);
        jQuery(elt).html('');

        module.CareerPlanApp.initialize({
            actorIdx: 0
        });
    });

    describe('step1 interaction', function() {
        it('initialized', function() {
            assert.equal(jQuery('.btn-step').length, 3);
        });
    });
});
