describe('RemoveStaticVariableEventFactory suite', function () {
  var Mock = {};
  var Injections = [];
  var factory;

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_, _$rootScope_) {
      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.RemoveStaticVariableTaskService = _$injector_.get('otusjs.staticVariable.RemoveStaticVariableTaskService');
      Injections.WorkspaceService.workspace = mockWorkspace();

      mockData();
      factory = _$injector_.get('resources.core.RemoveStaticVariableEventFactory', Injections);
      spyOn(Injections.RemoveStaticVariableTaskService, "execute");
      spyOn(Injections.WorkspaceService, "saveWork");
    });
  });

  describe('basic suit unit test', function () {
    it('factoryExistence check', function () {
      expect(factory).toBeDefined();
    });

    it('factoryMethodsExistence check', function () {
      expect(factory.create).toBeDefined();
    });

    it('create method should instantiate AddStaticVariableEvent', function () {
      expect(factory.create().execute).toBeDefined();

    });
  });

  describe('execute method', function () {
    it('Instance of RemoveStaticVariableTaskService shold evoke internalMethods', function () {
      factory.create().execute(Mock.variable);
      expect(Injections.RemoveStaticVariableTaskService.execute).toHaveBeenCalledTimes(1);
      expect(Injections.WorkspaceService.saveWork).toHaveBeenCalledTimes(1);
    });
  });

  function mockWorkspace() {
    return Mock.workspace = {
      isdb: {
        userEdits: {
          store: jasmine.createSpy()
        }
      },
      project: {
        survey: jasmine.createSpy()
      },
      sessions: {
        workspaceOwner: jasmine.createSpy()
      }
    }
  }

  function mockData() {
    Mock.variable = {
      name: 'CSJ10',
      label: 'Participante com diabetes:',
      sending: 1,
      customized: false,
      customizations: [
        {
          value: 1,
          label: 'Sim'
        },
        {
          value: 0,
          label: 'Não'
        }
      ]
    };
  }
});
