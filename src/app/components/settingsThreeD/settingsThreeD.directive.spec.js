
describe('SettingsThreeDDirective', () => {
  let vm, element, ctrl, $compile, $rootScope, scope;

  beforeEach(angular.mock.module('goals'));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();

    element = angular.element('<settings-three-d></settings-three-d>');
    $compile(element)(scope);

    scope.$digest();
    ctrl = element.isolateScope();
    console.log(ctrl)
  }));
  describe('constructor', () => {
    it('should ', () => {
      expect(1).toEqual(3);
    });
  });
});
