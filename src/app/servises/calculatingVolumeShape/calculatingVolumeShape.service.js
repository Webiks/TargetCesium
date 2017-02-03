export class CalculatingVolumeShapeService {
  constructor() {
    'ngInject';
  }

  getCoordinates(coordinates) {
    this.coordinates = coordinates;

    this.calculationAxis();
     return this.calculationDistantPoints();

  }

  calculationAxis() {
    this.axisY = [];
    this.axisX = [];
    _.each(this.coordinates, (coordinate)=> {
      this.axisY.push(coordinate.longitude);
      this.axisX.push(coordinate.latitude);
    })

  }

  // Calculation distant points
  calculationDistantPoints() {
    let northern = _.max(this.axisY);
    let southern = _.min(this.axisY);
    let western = _.min(this.axisX);
    let eastern = _.max(this.axisX);
    return {
      northern: northern,
      southern: southern,
      western: western,
      eastern: eastern
    }
  }


}
