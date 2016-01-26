var stSheet = (function() {

    var module = angular.module('sheet', ['survey.questions']);

    module.controller('SheetController', ['$scope', '$compile', '$templateRequest', '$templateCache', 'QuestionContainerButton',
        function($scope, $compile, $templateRequest, $templateCache, QuestionContainerButton) {
            var self = this;
            self.buttonManager = {};

            self.changeContainer = changeContainer;

            function changeContainer(event) {
                var buttonElement = angular.element(event.srcElement).parent();
                var clickedButton = new QuestionContainerButton(buttonElement);

                if (!self.buttonManager[clickedButton.id])
                    self.buttonManager[clickedButton.id] = clickedButton;

                clickedButton = self.buttonManager[clickedButton.id];

                if (clickedButton.status == 'collapsed') {
                    loadQuestion(clickedButton, function() {
                        clickedButton.status = 'opened';
                        clickedButton.alreadyLoaded = true;
                        clickedButton.addClass('rotate180');
                        clickedButton.removeClass('revert-rotate180');
                    });
                } else {
                    hideQuestion(clickedButton, function() {
                        clickedButton.status = 'collapsed';
                        clickedButton.removeClass('rotate180');
                        clickedButton.addClass('revert-rotate180');
                    });
                }
            }

            function loadQuestion(button, callback) {
                var container = angular.element(button.reference.parent().parent());
                var questionTemplateContainer = angular.element(container[0].lastElementChild);

                if (button.alreadyLoaded) {
                    questionTemplateContainer.removeClass('hide');
                    callback();
                } else {
                    loadTemplate('private/studio/edit/sheet/editing/question/question-container.html', function(html) {
                        questionTemplateContainer.append(html);
                        callback();
                    });
                }
            }

            function hideQuestion(button, callback) {
                var container = angular.element(button.reference).parent().parent(),
                    questionTemplateContainer = angular.element(container[0].lastElementChild);

                console.log(questionTemplateContainer);

                questionTemplateContainer.addClass('hide');
                callback();
            }

            function loadTemplate(templateUrl, callback) {
                $templateRequest(templateUrl).then(function(html) {
                    var compileResult = $compile(html)($scope),
                        template = angular.element(compileResult);

                    callback(template);
                });
            };
        }
    ]);

    module.factory('QuestionContainerButton', [
        function() {
            return function(element) {
                this.reference = element;
                this.id = element.attr('id');
                this.status = 'collapsed';
                this.alreadyLoaded = false;

                this.addClass = function(className) {
                    this.reference.addClass(className);
                };
                this.removeClass = function(className) {
                    this.reference.removeClass(className);
                };
            };
        }
    ]);

    return {
        module: module
    };

}());