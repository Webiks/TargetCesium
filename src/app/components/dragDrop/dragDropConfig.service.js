/**
 * Created by נתנאל מנצור on 11/26/2016.
 */
export class DragDropConfig {
  constructor() {
    'ngInject';
    this.initData();
  }

  initData() {
    this.data = [
      {
        nameH: 'צמח',
        nameE: 'plant',
        image: 'assets/images/tree.svg',
        treeDModel: 'assets/images/d3Model/Growing/plant/model.gltf',
        scale:1000
      },
      {
        nameH: 'בית',
        nameE: 'home',
        image: 'assets/images/home.svg',
        treeDModel: 'assets/images/d3Model/Inanimate/home/model.gltf',
        scale:2500
      },
      {
        nameH: 'כנסיה',
        nameE: 'Church',
        image: 'assets/images/church.svg',
        treeDModel: 'assets/images/d3Model/Inanimate/Church/model.gltf',
        scale:100
      }, {
        nameH: 'רובה צלפים',
        nameE: 'SniperRifle',
        image: 'assets/images/Weapon.svg',
        treeDModel: 'assets/images/d3Model/Inanimate/SniperRifle/model.gltf',
        scale:50
      }, {
        nameH: 'מחבל',
        nameE: 'terrorist',
        image: 'assets/images/terrorist.svg',
        treeDModel: 'assets/images/d3Model/Live/badPeople/terrorist/model.gltf',
        scale:3000
      }, {
        nameH: 'חייל',
        nameE: 'soldier',
        image: 'assets/images/soldier.svg',
        treeDModel: 'assets/images/d3Model/Live/goodPeople/Soldier/model.gltf',
        scale:70
      },
      {
        nameH: 'אישה',
        nameE: 'woman',
        image: 'assets/images/girl.svg',
        treeDModel: 'assets/images/d3Model/Live/goodPeople/woman/model.gltf',
        scale:1000
      },
      //{
      //  nameH: 'טייס',
      //  nameE: 'pilot',
      //  image: 'assets/images/pilot.svg',
      //  treeDModel: 'assets/images/d3Model/Live/goodPeople/Pilot/model.gltf'
      //},
      {
        nameH: 'שוטר',
        nameE: 'policeman',
        image: 'assets/images/policeman.svg',
        treeDModel: 'assets/images/d3Model/Live/goodPeople/policeman/model.gltf',
        scale:900
      },
      {
        nameH: 'משאית צבאית',
        nameE: 'armyTruck',
        image: 'assets/images/truck.svg',
        treeDModel: 'assets/images/d3Model/Vehicle/ArmyTruck/model.gltf',
        scale:2000
      },
      {
        nameH: 'מכונית',
        nameE: 'car',
        image: 'assets/images/redCar.svg',
        treeDModel: 'assets/images/d3Model/Vehicle/ChevroletCar/model.gltf',
        scale:2700
      }, {
        nameH: 'מטוס קרב',
        nameE: 'fighterJet',
        image: 'assets/images/FighterJet.svg',
        treeDModel: 'assets/images/d3Model/Vehicle/fighterJet/model.gltf',
        scale:2000
      }, {
        nameH: 'מטוס',
        nameE: 'plane',
        image: 'assets/images/plane.svg',
        treeDModel: 'assets/images/d3Model/Vehicle/plane/model.gltf',
        scale:2000
      }, {
        nameH: 'ספינה',
        nameE: 'ship',
        image: 'assets/images/ship.svg',
        treeDModel: 'assets/images/d3Model/Vehicle/ship/model.gltf',
        scale:40
      },
      {
        nameH: 'טנק',
        nameE: 'tank',
        image: 'assets/images/tank.svg',
        treeDModel: 'assets/images/d3Model/Vehicle/tank/model.gltf',
        scale:2700
      },
      {
        nameH: 'טרקטור',
        nameE: 'tractor',
        image: 'assets/images/tractor.svg',
        treeDModel: 'assets/images/d3Model/Vehicle/tractor/model.gltf',
        scale:40
      }]
  }
}
