/* global jQuery: true, module: true */

jQuery = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var MapLayer = Backbone.Model.extend({
    defaults: {
        visible: false
    },
    toTemplate: function() {
        return _(this.attributes).clone();
    }
});

var MapLayerList = Backbone.Collection.extend({
    model: MapLayer,
    initialize: function(lst) {
        if (lst !== undefined && lst instanceof Array) {
            for (var i = 0; i < lst.length; i++) {
                var x = new MapLayer(lst[i]);
                this.add(x);
            }
        }
    },
    toTemplate: function() {
        var a = [];
        this.forEach(function(item) {
            a.push(item.toTemplate());
        });
        return a;
    }
});


module.exports.MapLayerList = MapLayerList;
