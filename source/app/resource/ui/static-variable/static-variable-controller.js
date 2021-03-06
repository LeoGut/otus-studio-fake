(function () {
  'use strict';

  angular
    .module('resource.ui')
    .run(['$anchorScroll', function ($anchorScroll) {
      $anchorScroll.yOffset = 50;
    }])
    .controller('studioStaticVariableCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$mdDialog',
    '$mdToast',
    '$location',
    '$anchorScroll',
    'resources.business.StaticVariableService'
  ];

  function Controller($scope, $mdDialog, $mdToast, $location, $anchorScroll, StaticVariableService) {
    var MESSAGE_TO_REMOVE = 'Excluir variável';
    var MESSAGE_GENERIC = 'Você tem certeza que deseja realizar essa operação?';
    var _indexOfVariableInEdition = -1;
    var self = this;
    self.disabled = true;
    self.isEdition = false;
    self.variablesList = [];

    /* Public methods */
    self.$onInit = onInit;
    self.isCustomize = isCustomize;
    self.addCustom = addCustom;
    self.removeCustom = removeCustom;
    self.saveVariable = saveVariable;
    self.cancel = cancel;
    self.variablesListIsEmpty = variablesListIsEmpty;
    self.editVariable = editVariable;
    self.removeVariable = removeVariable;
    self.removeCustomFields = removeCustomFields;

    function onInit() {
      self.variable = StaticVariableService.createStructureToStaticVariable();
      _getStaticVariableList();
    }

    function isCustomize() {
      return self.variable.customized;
    }

    function addCustom() {
      if (_isFieldValidForCustom(self.customization, self.variable)) {
        var customization = angular.copy(self.customization);
        self.variable.customizations.push(customization);
        _clearCustomFields();
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Os campos de personalização não devem ser repetir.')
            .hideDelay(5000)
        );
      }
    }

    function removeCustom(index) {
      self.variable.customizations.splice(index, 1);
    }

    function saveVariable() {
      if (_isValidInputData()) {
        if (!self.isEdition)
          StaticVariableService.createVariable(angular.copy(self.variable));
        else {
          StaticVariableService.updateVariable(_indexOfVariableInEdition, angular.copy(self.variable));
          self.isEdition = false;
        }
        _clearAllFields();
        _getStaticVariableList();
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Os campos nome, descrição e envio correspondente são de preenchimento obrigatorio')
            .hideDelay(5000)
        );
      }
    }

    function cancel() {
      _clearAllFields();
      self.isEdition = false;
    }

    function variablesListIsEmpty() {
      if (self.variablesList)
        return !self.variablesList.length > 0;
      return true;
    }

    function editVariable(index) {
      var toEdition = self.variablesList.find(function (variable, i) {
        if (i === index)
          return variable;
      });
      self.variable = angular.copy(toEdition);
      _indexOfVariableInEdition = index;
      self.isEdition = true;
      _scrollToTop();
    }

    function removeVariable(index, event) {
      $mdDialog.show({
        controller: _DialogController,
        templateUrl: 'app/resource/ui/generic-dialog/generic-dialog-template.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen,
        locals: {
          title: MESSAGE_TO_REMOVE,
          body: MESSAGE_GENERIC
        }
      }).then(function () {
        StaticVariableService.removeVariable(index);
      }, function () { });
    }

    function removeCustomFields() {
      self.variable.customized = false;
      self.variable.customizations = [];
    }

    function _isFieldValidForCustom(newCustom, variable) {
      var isValid = true;
      variable.customizations.forEach(function (customizatio) {
        if (newCustom.value === customizatio.value)
          isValid = false;
      });
      return isValid;
    }

    function _isValidInputData() {
      return self.variable.name && self.variable.label && self.variable.sending;
    }

    function _clearCustomFields() {
      self.customization.value = '';
      self.customization.label = '';
    }

    function _DialogController($scope, $mdDialog, title, body) {
      $scope.title = '';
      $scope.body = '';
      /* Lifecycle hooks */
      _onInit();

      function _onInit() {
        $scope.title = title;
        $scope.body = body;
      }

      /* Public methods */
      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function () {
        $mdDialog.hide();
      };
    }

    function _scrollToTop() {
      var newHash = 'inputFields';
      if ($location.hash() !== newHash) {
        $location.hash('inputFields');
      } else {
        $anchorScroll();
      }
    };

    function _getStaticVariableList() {
      self.variablesList = StaticVariableService.getStaticVariableList();
    }

    function _clearAllFields() {
      self.variable = StaticVariableService.createStructureToStaticVariable();
    }

  }
}());
