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


    let cesiumTerrainProviderMeshes = new Cesium.CesiumTerrainProvider({
      url : 'https://assets.agi.com/stk-terrain/world',
      requestWaterMask : true,
      requestVertexNormals : true
    });
    this.viewer.terrainProvider = cesiumTerrainProviderMeshes;
    this.createOrbitService.newOrbit(this.viewer);
  }


}

