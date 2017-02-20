export function ItemsListDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/itemsList/itemsList.html',
    controller: ItemsListController,
    controllerAs: 'itemsListCtrl',
    bindToController: true
  };

  return directive;

}

class ItemsListController {
  constructor($scope,eventsHandlerService,createOrbitService) {
    'ngInject';
    this.createOrbitService = createOrbitService;
    this.eventsHandlerService = eventsHandlerService;
    this.toggle = false;

   this.entities = this.createOrbitService.viewer.entities._entities._array;
    this.eventsHandlerService.setCallback('toggleTable',(data)=> {
      this.toggle = data.toggle;
      $scope.$evalAsync();
    });
  }

  flyToModel(id){
    this.createOrbitService.flyToModel(id)
  }

}
