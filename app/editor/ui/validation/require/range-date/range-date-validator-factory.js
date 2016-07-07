(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RangeDateValidatorFactory', RangeDateValidatorFactory);

    function RangeDateValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RangeDateValidator();
        }

        return self;
    }

    function RangeDateValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:range-date-validator></otus:range-date-validator>';
        }
        //TODO
    }

}());
