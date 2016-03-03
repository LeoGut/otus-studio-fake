describe('Survey suite:', function() {
    beforeEach(module('otusjs.modelBuilder'));
    beforeEach(module('otusjs.model'));

    var SurveyFactory,
        actual;

    beforeEach(inject(function(_SurveyFactory_) {
        SurveyFactory = _SurveyFactory_;
        actual = SurveyFactory.create(jasmine.any(String), jasmine.any(String), jasmine.any(String));
    }));

    describe('SurveyFactory.create()', function() {
        it('should return an Survey that extends from StudioObject', function() {
            expect(actual.extends).toBe('StudioObject');
        });

        it('should return an Survey object type', function() {
            expect(actual.objectType).toBe('Survey');
        });

        it('should return an Survey with a SurveyMetaInfo object type', function() {
            expect(actual.metainfo.objectType).toBe('SurveyMetaInfo');
        });

        it('should return an Survey with a not null SurveyMetaInfo', function() {
            expect(actual.metainfo).not.toBeNull();
        });

        it('should return an Survey with a not null SurveyIdentity', function() {
            expect(actual.identity).not.toBeNull();
        });

        it('should return an Survey with a SurveyIdentity object type', function() {
            expect(actual.identity.objectType).toBe('SurveyIdentity');
        });

        it('should return an Survey with a literal object in question property', function() {
            expect(actual.question).toEqual({});
        });
    });

});
