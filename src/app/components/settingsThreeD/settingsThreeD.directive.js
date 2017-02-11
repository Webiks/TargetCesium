/**
 * Created by Netanel on 1/1/2017.
 */
export function SettingsThreeDDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/settingsThreeD/settingsThreeD.html',
    controller: SettingsThreeDController,
    controllerAs: 'threeDCtrl',
    bindToController: true
  };

  return directive;

}

class SettingsThreeDController {
  constructor(eventsHandlerService, $window, $scope, createOrbitService) {
    'ngInject';
    this.createOrbitService = createOrbitService;
    this.$window = $window;
    let that = this;
    this.display = false;
    this.eventsHandlerService = eventsHandlerService;
    this.eventsHandlerService.setCallback('getData', (data)=> {
      that.model = data;
      if (data.display && data.model.id !== 'drawingEntity') {
        this.display = true;
        that.size = data.model._model.scale.getValue();
        that.height = this.pointsToCartographicArray([this.model.model.position.getValue()])[0].height;
        //var heading = Cesium.Math.toRadians(135);
        //var pitch = 0;
        //var roll = 0;
        //var orientation = Cesium.Transforms.headingPitchRollQuaternion(data.model.position._value, heading, pitch, roll);

        //data.model.orientation =orientation
      }

      $scope.$evalAsync()
    });

    this.image = '';
    this.height = '';
    this.size = 0
  }


  pointsToCartographicArray(carteians) {
    if (!_.isArray(carteians) || !_.isObject(carteians[0]) || !carteians[0].x) {
      return [];
    }
    return _.map(carteians, (carteian)=> {
      let cartographics = Cesium.Cartographic.fromCartesian(carteian);
      cartographics.longitude = Cesium.Math.toDegrees(cartographics.longitude);
      cartographics.latitude = Cesium.Math.toDegrees(cartographics.latitude);
      return cartographics;
    });

  }

  heightSetting(keyEvent) {
    if (keyEvent.which === 13) {
      var testNumber = this.height;
      this.height = Number(this.height.toString().replace(/[^0-9\.]/g, ''));
      if (this.height != testNumber) {
        alert('Please do not put words just a number')
      }
      let cartograph = this.pointsToCartographicArray([this.model.model.position.getValue()]);
      this.model.model.position = Cesium.Cartesian3.fromDegrees(cartograph[0].longitude, cartograph[0].latitude, this.height)
    }
  }

  sizeSetting(keyEvent) {
    if (keyEvent.which === 13) {
      var testNumber = this.size;
      this.size = Number(this.size.toString().replace(/[^0-9\.]/g, ''));
      if (this.size != testNumber) {
        alert('Please do not put words just a number')
      }
      this.model.model._model.scale = this.size;
    }
  }

  drawModelTrack() {
    if(this.model.model.id !== undefined){
      this.createOrbitService.enableDrawModelTrack(this.model.model.id)
    }

  }


}
