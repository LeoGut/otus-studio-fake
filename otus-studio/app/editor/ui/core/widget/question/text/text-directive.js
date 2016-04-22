(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('textQuestion', textQuestion);

    textQuestion.$inject = ['editor.ui.mpath'];

    function textQuestion(mpath) {
        var ddo = {
            scope: {},
            templateUrl: mpath.getWidgetPath('text'),
            retrict: 'E'
        };

        return ddo;
    }

}());
