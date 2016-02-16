(function() {

    angular
        .module('spec')
        .service('SurveyQuestionsUpdateService', SurveyQuestionsUpdateService);

    SurveyQuestionsUpdateService.$inject = ['QuestionFactory'];

    function SurveyQuestionsUpdateService(QuestionFactory) {
        var self = this,
            observers = [];

        /* Public interface */
        self.update = update;
        self.registerObserver = registerObserver;

        function update(editingEvent, survey) {
            if (editingEvent.type == 'ADD_DATA') {
                addQuestion(editingEvent.source.model, survey);
            } else {
                removeQuestion(questionIndex, survey);
            }
        }

        function addQuestion(questionType, survey) {
            var nextOID = survey.questions.length,
                newQuestion = QuestionFactory.create(questionType, nextOID);

            survey.questions.push(newQuestion);
            notifyObservers(newQuestion);
        }

        function removeQuestion(questionIndex, survey) {
            survey.questions.splice(questionIndex, 1);
        }

        function notifyObservers(question) {
            observers.forEach(function(observer) {
                observer.update(question);
            });
        }

        function registerObserver(observer) {
            observers.push(observer);
        }
    }

}());
