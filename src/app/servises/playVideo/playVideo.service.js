export class PlayVideoService {
  constructor(createOrbitService) {
    'ngInject';
    this.createOrbitService = createOrbitService;
    this.viewer = this.createOrbitService.viewer;
  }

  initCzmlNormal() {
    this.czml = [{
      "id": "document",
      "name": "CZML Path",
      "version": "1.0",
      "clock": {
        "interval": "2012-08-04T10:00:00Z/2012-08-04T15:00:00Z",
        "currentTime": "2012-08-04T10:00:00Z",
        "multiplier": 10
      }
    }];

  }

  //initCzmlLoop(){
  //  this.czmlLoop = [{
  //    "id": "document",
  //    "name": "CZML Path",
  //    "version": "1.0",
  //    "clock": {
  //      "interval": "2012-08-04T10:00:00Z/2012-08-04T10:01:00Z",
  //      "currentTime": "2012-08-04T10:00:00Z",
  //      "multiplier": 10
  //    }
  //  }];
  //}
  //
  //orbitLoopCzml(id){
  //  let that = this;
  //  this.initCzmlLoop();
  // let entity =  this.viewer.entities.getOrCreateEntity(id);
  //    if(entity.polyline !== undefined && entity.model !== undefined){
  //      that.czmlLoop.push({
  //        "id": entity.id,
  //        "availability": "2012-08-04T10:00:00Z/2012-08-04T10:01:00Z",
  //        "path": {
  //          "material": {
  //            "polylineOutline": {
  //              "color": {
  //                "rgba": [255, 1, 255, 255]
  //              },
  //              "outlineColor": {
  //                "rgba": [0, 225, 255, 255]
  //              },
  //              "outlineWidth": 5
  //            }
  //          },
  //          "width": 8,
  //          "leadTime": 0,
  //          "trailTime": 0,
  //          "resolution": 5
  //        },
  //        "model": {
  //          "gltf": entity.model.uri._value,//gltf
  //          "scale": entity.model.scale.getValue(),//
  //          "minimumPixelSize": 1
  //        },
  //        "position": {
  //          "epoch": "2012-08-04T10:00:00Z",
  //          "cartographicDegrees": that.orderPath(that.pointsToCartographicArray(entity.polyline.positions.getValue()), that.pointsToCartographicArray([entity.position.getValue()])[0].height)//positions
  //        }
  //      })
  //    }
  //
  //
  //  return this.czmlLoop;
  //}

  pushPositionToCzml() {
    let that = this;
    this.initCzmlNormal();
    this.createOrbitService.removeById('drawingEntity');
    _.each(this.viewer.entities._entities._array,(entity)=>{
      if(entity.polyline !== undefined && entity.model !== undefined){
        that.czml.push({
          "id": entity.id,
          "availability": "2012-08-04T10:00:00Z/2012-08-04T15:00:00Z",
          "path": {
            "material": {
              "polylineOutline": {
                "color": {
                  "rgba": [255, 1, 255, 255]
                },
                "outlineColor": {
                  "rgba": [0, 225, 255, 255]
                },
                "outlineWidth": 5
              }
            },
            "width": 8,
            "leadTime": 0,
            "trailTime": 0,
            "resolution": 5
          },
          "model": {
            "gltf": entity.model.uri._value,//gltf
            "scale": entity.model.scale.getValue(),//
            "minimumPixelSize": 1
          },
          "position": {
            "epoch": "2012-08-04T10:00:00Z",
            "cartographicDegrees": that.orderPath(that.pointsToCartographicArray(entity.polyline.positions.getValue()), that.pointsToCartographicArray([entity.position.getValue()])[0].height)//positions
          }
        })
      }

    });
    return this.czml;
  }

  orderPath(path, height) {
    let paths = [];
    _.each(path, function (p, i) {
      paths.push([i * 10, p.longitude, p.latitude, height]);
    });
    return _.flattenDeep(paths);
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
}
