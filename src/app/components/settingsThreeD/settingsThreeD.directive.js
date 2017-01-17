/**
 * Created by נתנאל מנצור on 1/1/2017.
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
  constructor(eventsHandlerService, $window,$scope) {
    'ngInject';
    this.$window = $window;
    let that = this;
    this.display = false;
    this.eventsHandlerService = eventsHandlerService;
    this.eventsHandlerService.setCallback('getData', (data)=> {
      that.model = data;
      if(data.display){
        this.display = true;
        that.size = data.model._model.scale.getValue();

        var heading = Cesium.Math.toRadians(135);
        var pitch = 10;
        var roll = 0;
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(data.model.position._value, heading, pitch, roll);

        data.model.orientation =orientation
      }

      $scope.$apply()
    });





    this.image = '';
    this.height = '';
    this.size = 0
  }

  select3D(model) {
    console.log()
  }

  heightSetting() {
  }

  sizeSetting(action) {
    var testNumber = this.size;
    this.size = Number(this.size.toString().replace(/\D/g, ''));
    if (this.size != testNumber) {
      alert('Please do not put words just a number')
    }
    this.model.model._model.scale = action === '+' ? this.size++ : this.size--;
  }

  rotateSetting() {
  }

  orbitSetting() {
  }

  rotateSideTop() {
    console.log('dsffdssf')
  }

  rotateSideLeft() {
  }

  rotateSideRight() {
  }

  rotateSideBottom() {
  }
}
