require('!file-loader?name=[name].[ext]!../static/index.html');
require('./static.js');

// load and apply css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-arrow-buttons/dist/css/bootstrap-arrow-buttons.css';
import '../static/css/common.css';
import '../static/css/steps.css';
import '../static/css/careerplan.css';

import jQuery from 'jquery';
import module from './careerplan.js';

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

    if (!getUrlParameter('parent')) {
        jQuery('#cu-privacy-notice').addClass('required');
    }

    module.CareerPlanApp.initialize({
        actorIdx: actorIdx,
        quiet: quiet === '1',
        next: getUrlParameter('next')
    });
});
