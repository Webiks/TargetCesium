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
    this.modelsSelected = [];
    this.total3D = 0;
    this.intiCalculatingVolumePolygon();
  }

  intiCalculatingVolumePolygon() {
    this.distantPointsPolygon = this.calculatingVolumeShapeService.getCoordinates(this.config.entity.coordinates);
  }

  setModel_polyline(item) {
    item.selected = true;
    this.modelsSelected =[item];
    _.each(this.dragDropConfig.data, (model)=> {
      if (model.id !== item.id) {
        model.selected = false;
      }
    });
  }

  setModels_polygon(item) {
    if (_.isUndefined(item.number)) {
      item.number = 0;
    }
    this.modelsSelected.push(item);
    item.number += 1;
    this.total3D += 1;
  }

  removeAllSelected() {
    _.each(this.dragDropConfig.data, (model)=> {
      model.number = undefined;
      model.selected = false;
    });
    d3.select('.float-window').remove();
    this.createOrbitService.removeById('drawingEntity');
  }

  ok() {
    this.removeAllSelected();

    if(this.config.entity.type === 'polyline'){
      this.createOrbitService.enableDrawPointsIntoPolyline(this.modelsSelected,this.config.entity.polylinePositions);
    }else {
      this.createOrbitService.enableDrawPointsIntoPolygon(this.distantPointsPolygon, this.modelsSelected);
    }

    this.showForm = false;
  }

  cancel() {
    this.removeAllSelected();
    this.showForm = false;
  }
}
