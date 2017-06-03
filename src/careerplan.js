/* global jQuery: true, module: true, alert: true */

jQuery = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var NumberedStepsView = require('./steps.js');
var models = require('./models.js');
window.jQuery = window.$ = jQuery;
require('bootstrap');

var BaseView = Backbone.View.extend({
    baseInitialize: function(options) {
        this.responses = options.responses;
        this.complete = false;
        this.actor = options.actor;
    },
    isFormComplete: function(form) {
        var self = this;
        var valid = true;

        var children = jQuery(form).find('input,textarea,select');
        jQuery.each(children, function() {
            if (valid && jQuery(this).is(':visible')) {
                var value;
                if (this.tagName === 'INPUT' && this.type === 'text' ||
                        this.tagName === 'TEXTAREA') {
                    value = jQuery(this).val().trim();
                    valid = value.length > 0;
                }

                if (this.tagName === 'SELECT') {
                    value = jQuery(this).val();
                    valid = value !== undefined && value.length > 0 &&
                        jQuery(this).val().trim() !== '-----';
                }

                if (this.type === 'checkbox' || this.type === 'radio') {
                    // one in the group needs to be checked
                    var selector =
                        'input[name=' + jQuery(this).attr('name') + ']:checked';
                    value = jQuery(selector).val();
                    valid = value !== undefined;
                }

                if (valid) {
                    self.responses[jQuery(this).attr('name')] = value;
                }
            }
        });

        if (!valid) {
            alert('Please complete all form fields before continuing.');
        }

        return valid;
    },
    onSubmit: function(evt) {
        evt.preventDefault();

        var form = jQuery(this.el).find('form');
        if (!this.isFormComplete(form)) {
            return;
        }

        this.complete = true;
        this.render();
        this.trigger('complete', this);
        window.parent.jQuery('body').animate({scrollTop: 0}, 'slow');
    },
    markAnswers: function(evt) {
        for (var key in this.responses) {
            if (this.responses.hasOwnProperty(key)) {
                var selected = this.responses[key];
                var elt = jQuery(this.el).find(
                    'select[name="' + key + '"]');

                if (elt.length) {
                    jQuery(elt).find('option[value="' + selected + '"]')
                        .attr('selected', 'selected');
                }
            }
        }
    }
});

var IntroView = BaseView.extend({
    events: {
        'click button#identify-factors': 'onSubmit',
    },
    initialize: function(options) {
        _.bindAll(this, 'render');

        this.template = require('../static/templates/page_one.html');
        this.baseInitialize(options);
    },
    render: function() {
        var markup = this.template({
            'complete': this.complete,
            'responses': this.responses,
            'actor': this.actor
        });
        this.$el.html(markup);
        this.$el.show();

        this.markAnswers();
    }
});

var AdviceView = BaseView.extend({
    events: {
        'click button#offer-advice': 'onSubmit',
    },
    initialize: function(options) {
        _.bindAll(this, 'render');

        this.baseInitialize(options);
        this.template = require('../static/templates/page_two.html');
    },
    render: function() {
        var markup = this.template({
            'complete': this.complete,
            'responses': this.responses,
            'actor': this.actor
        });
        this.$el.html(markup);
        this.$el.show();

        this.markAnswers();
    }
});

var SummaryView = BaseView.extend({
    events: {
        'click button#self-reflection': 'onSubmit',
        'click .nextpage': 'onNext'
    },
    initialize: function(options) {
        _.bindAll(this, 'render', 'onNext');

        this.baseInitialize(options);
        this.next = options.next;
        this.complete = !this.actor.reflect;
        this.template = require('../static/templates/page_three.html');
    },
    render: function() {
        var markup = this.template({
            'complete': this.complete,
            'responses': this.responses,
            'actor': this.actor,
            'next': this.next
        });
        this.$el.html(markup);
        this.$el.show();

        if (this.complete) {
            this.trigger('complete', this);
        }
    },
    onNext: function() {
        parent.jQuery(parent.document).trigger('nextpage');
    }
});

var MapView = BaseView.extend({
    events: {
        'change .select-base-map': 'onChangeBaseMap',
        'click .did-you-know .btn': 'render'
    },
    initialize: function(options) {
        _.bindAll(this, 'render', 'onChangeBaseMap');
        this.facts = require('../static/json/facts.json');
        this.idx = 0;
        this.render();
    },
    render: function() {
        jQuery(this.el).find('.fact-text').html(this.facts[this.idx].text);
        this.idx = (this.idx + 1) % this.facts.length;
    },
    onChangeBaseMap: function(evt) {
        jQuery('.base-layer').hide();
        var value = jQuery(evt.target).val();
        if (value.length > 0) {
            jQuery('.base-layer').attr('src', value).show();
        }
    }
});

var CareerPlanApp = {
    initialize: function(options) {
        var $parent = jQuery('.career-planning');

        var mapView = new MapView({
            el: jQuery('#map-layers-modal')
        });

        var actors = require('../static/json/actors.json');
        var responses = {};
        var views = [];

        // Step 1
        var page = jQuery('<div></div>');
        $parent.append(page);
        var view = new IntroView({
            el: page,
            actor: actors[options.actorIdx],
            responses: responses
        });
        views.push(view);

        // Step 2
        page = jQuery('<div></div>');
        $parent.append(page);
        view = new AdviceView({
            el: page,
            actor: actors[options.actorIdx],
            responses: responses
        });
        views.push(view);

        // Step 3
        page = jQuery('<div></div>');
        $parent.append(page);
        view = new SummaryView({
            el: page,
            actor:  actors[options.actorIdx],
            responses: responses,
            next: options.next
        });
        views.push(view);

        this.steps = new NumberedStepsView({
            el: jQuery('.steps'),
            views: views,
            quiet: options.quiet
        });

        jQuery('.interactive-container').show();
    }
};

module.exports.CareerPlanApp = CareerPlanApp;
