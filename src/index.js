/* global jQuery: true */

require('!file-loader?name=[name].[ext]!../static/index.html');
require('./static.js');

// load and apply css
require('!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
// eslint-disable-next-line security/detect-non-literal-require
require('!style-loader!css-loader!bootstrap-arrow-buttons/dist/css/' +
        'bootstrap-arrow-buttons.css');
require('!style-loader!css-loader!../static/css/common.css');
require('!style-loader!css-loader!../static/css/steps.css');
require('!style-loader!css-loader!../static/css/careerplan.css');

var jQuery = require('jquery');
var module = require('./careerplan.js');

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

jQuery(document).ready(function() {
    var actorIdx = getUrlParameter('actorIdx') || 0;
    var quiet = getUrlParameter('quiet');

    module.CareerPlanApp.initialize({
        actorIdx: actorIdx,
        quiet: quiet === '1',
        next: getUrlParameter('next')
    });
});
