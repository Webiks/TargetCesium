export function FloatingWindowDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    scope: {
      config: '='
    },
    templateUrl: 'app/components/floatingWindow/floatingWindow.html',
    controller: FloatingWindowController,
    controllerAs: 'FWCtrl',
    bindToController: true
  };

  return directive;

}

class FloatingWindowController {
  constructor(dragDropConfig, calculatingVolumeShapeService, createOrbitService) {
    'ngInject';
    this.createOrbitService = createOrbitService;
    this.calculatingVolumeShapeService = calculatingVolumeShapeService;
    this.dragDropConfig = dragDropConfig;
    this.showForm = true;
    this.modelsSelected =[];
    this.total3D = 0;
    this.intiCalculatingVolumePolygon();
  }

  intiCalculatingVolumePolygon() {
    this.distantPointsPolygon = this.calculatingVolumeShapeService.getCoordinates(this.config.entity.coordinates);
  }

  setIcon(item) {
    if (_.isUndefined(item.number)) {
      item.number = 0;
    }
    this.modelsSelected.push(item);
    item.number += 1;
    this.total3D += 1;
  }

removeAllSelected(){
  _.each(this.dragDropConfig.data,(model)=>{
    model.number = undefined;
  });
  d3.select('.float-window').remove();
}
  ok() {
    this.removeAllSelected();
    this.createOrbitService.enableDrawPointsIntoPolygon(this.distantPointsPolygon,this.modelsSelected);
    this.showForm = false;
  }

  cancel() {
    this.removeAllSelected();
    this.showForm = false;
  }
}
