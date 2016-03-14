describe('NumericQuestionFactory', function() {
    var Mock = {},

        OID = 'OID';

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            /* @Mock */
            mockQuestion(_$injector_);

            factory = _$injector_.get('NumericQuestionFactory');
        });
    });

    describe('NumericQuestion', function() {

        xit('returned object should extends Question', function() {
            var question = factory.create(OID, Mock.Question);

            expect(question.extends).toBe('Question');
        });

        it('returned object should have objectType equal to NumericQuestion', function() {
            var question = factory.create(OID, Mock.Question);

            expect(question.objectType).toBe('NumericQuestion');
        });

        it('returned object should have a not null oid', function() {
            var question = factory.create(OID, Mock.Question);

            expect(question.oid).toBe(OID);
        });

        it('returned object should have dataType equal to Integer', function() {
            var question = factory.create(OID, Mock.Question);

            expect(question.dataType).toBe('Integer');
        });

        it('returned object should have a label object for ptBR locale', function() {
            var question = factory.create(OID, Mock.Question);

            expect(question.label.ptBR).not.toBeNull();
            expect(question.label.ptBR).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            var question = factory.create(OID, Mock.Question);

            expect(question.label.enUS).not.toBeNull();
            expect(question.label.enUS).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            var question = factory.create(OID, Mock.Question);

            expect(question.label.esES).not.toBeNull();
            expect(question.label.esES).not.toBeUndefined();
        });

    });

    function mockQuestion($injector) {
        Mock.Question = $injector.get('QuestionFactory').create('numeric-question', OID);
    }

});