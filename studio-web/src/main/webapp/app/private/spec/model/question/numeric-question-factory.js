(function() {
    'use strict';

    angular
        .module('spec')
        .factory('NumericQuestionFactory', NumericQuestionFactory);

    NumericQuestionFactory.$inject = ['UnitFactory'];

    function NumericQuestionFactory(UnitFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new NumericQuestion(oid, prototype, UnitFactory);
        }

        return self;
    }

    function NumericQuestion(oid, prototype, UnitFactory) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'NumericQuestion',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'LocalDate',
            writable: false
        });

        Object.defineProperty(this, 'label', {
            value: prototype.label,
            writable: true
        });

        Object.defineProperty(this, 'unit', {
            value: {
                'ptBR': UnitFactory.create(),
                'enUS': UnitFactory.create(),
                'esES': UnitFactory.create()
            },
            writable: true
        });
    }

}());
