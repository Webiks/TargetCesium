/**
 * Created by netanel on 11/23/2016.
 */
export function SideBarDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/sideBar/sideBar.html',
    controller: SideBarController,
    controllerAs: 'sideBarCtrl',
    bindToController: true
  };

  return directive;

}

class SideBarController {
  constructor($element) {
    'ngInject';
    console.log($element);
    this.image = 'assets/open.svg';
    this.isPanelOpen = true;
  }

  togglePanel() {
    this.isPanelOpen =!this.isPanelOpen;
    if(this.isPanelOpen){
      this.image = 'assets/open.svg';
    }else {
      this.image = 'assets/close.svg';
    }
  }

}
