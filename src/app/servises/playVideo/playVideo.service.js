export class PlayVideoService {
  constructor(createOrbitService) {
    'ngInject';
    this.createOrbitService = createOrbitService;

  }

  initCzml() {
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

  pushPositionToCzml() {
    let that = this;
    this.initCzml();
    for (let value of this.createOrbitService.listModelOrbit.values()) {
      that.czml.push({
        "id": value.model.id,
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
          "gltf": value.data.treeDModel,//gltf
          "scale":value.data.scale,
          "minimumPixelSize": 1
        },
        "position": {
          "epoch": "2012-08-04T10:00:00Z",
          "cartographicDegrees": that.orderPath(value.path)//positions
        }
      })
    }
    ;
    return this.czml;
  }

  orderPath(path) {
    let paths = [];
    _.each(path, function (p, i) {
      paths.push([i * 10, p.x, p.y, 10]) // TODO :Height model
    });
    return _.flattenDeep(paths);
  }
}
