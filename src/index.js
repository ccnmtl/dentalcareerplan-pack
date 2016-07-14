/* global jQuery: true */

require('!file?name=[name].[ext]!../static/index.html');
require('./static.js');

// load and apply css
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/bootstrap-arrow-buttons/dist/' +
        'css/bootstrap-arrow-buttons.css');
require('../static/css/common.css');
require('../static/css/steps.css');
require('../static/css/careerplan.css');

var jQuery = require('jquery');
var module = require('./careerplan.js');

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

jQuery(document).ready(function() {
    var actorIdx = getUrlParameter('actorIdx') || 0;
    module.CareerPlanApp.initialize({
        actorIdx: actorIdx
    });
});
