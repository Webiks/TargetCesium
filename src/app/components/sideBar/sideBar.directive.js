/**
 * Created by נתנאל מנצור on 12/31/2016.
 */
/**
 * Created by netanel on 11/23/2016.
 */
export function SideBarDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/sideBar/sideBar.html',
    controller: SideBarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

}

class SideBarController {
  constructor() {
    'ngInject';

  }

}
