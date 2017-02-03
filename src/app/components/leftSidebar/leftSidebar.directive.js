export function LeftSidebarDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/leftSidebar/leftSidebar.html',
    controller: LeftSidebarController,
    controllerAs: 'leftSidebarCtrl',
    bindToController: true
  };

  return directive;

}

class LeftSidebarController {
  constructor() {
    'ngInject';
  }



}
