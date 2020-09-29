/* global describe: true, before: true */

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

        module.CareerPlanningApp.initialize();
    });
});
