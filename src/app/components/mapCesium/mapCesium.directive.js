/**
 * Created by נתנאל מנצור on 11/23/2016.
 */
/**
 * Created by netanel on 11/23/2016.
 */
export function MapCesiumDirective() {
  'ngInject';
  let directive = {
    restrict: 'E',
    template: '<div id="cesiumContainer"></div>',
    scope: {},
    controller: MapCesiumController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class MapCesiumController {
  constructor(createOrbitService) {
    'ngInject';
    this.createOrbitService = createOrbitService;
    this.initMap();
  }

  //init map cesium
  initMap() {
    Cesium.BingMapsApi.defaultKey = 'AroazdWsTmTcIx4ZE3SIicDXX00yEp9vuRZyn6pagjyjgS-VdRBfBNAVkvrucbqr';
    this.viewer = new Cesium.Viewer('cesiumContainer',{
      selectionIndicator : false
    });
    this.createOrbitService.newOrbit(this.viewer);
  }


}

