/**
 * Created by Netanel on 12/7/2016.
 */
export class CreateOrbitService {
  constructor(eventsHandlerService) {
    'ngInject';
    this.eventsHandlerService = eventsHandlerService;
    this.listModelOrbit = new Map();
    this.url = "";
    this.dataModel = ""
  }


  setUrl(url) {
    this.url = url
  }

  setDataModel(data) {
    this.setUrl(data.treeDModel);
    this.dataModel = data;
  }

  newOrbit(viewer) {
    this.setViewer(viewer);
    this.event = "";
    this.scene = this.viewer.scene;

    this.eventHandler();
  }

  setViewer(viewer) {
    this._viewer = viewer;
  }

  get viewer() {
    return this._viewer;
  }

  play(czml) {
    //let that = this;
    //this.viewer.dataSources.add(Cesium.CzmlDataSource.load(czml)).then(function (ds) {
    //_.each(czml, function (c) {
    //  if (c.id !== "document") {
    //    //that.viewer.trackedEntity = ds.entities.getById(c.id);
    //  }
    //});
    //})
    this.viewer.dataSources.add(Cesium.CzmlDataSource.load(czml))
  }

  drawModel(long, lat) {
    let scaleCBP = function () {
      return scale;
    };
    let scale = this.dataModel.scale;
    let name = this.dataModel.nameE;
    let position = Cesium.Cartesian3.fromDegrees(long, lat);
    let model = this.viewer.entities.add({
      name: name,
      position: position,
      model: {
        uri: this.url,
        scale: new Cesium.CallbackProperty(scaleCBP, false)
      }
    });

    this.listModelOrbit.set(model.id, {
      value: "model",
      data: this.dataModel,
      model: model,
      url: this.url,
      interimOrbit: [position],
      path: [{x: Number(long), y: Number(lat)}],
      staticOrbit: []
    });
    //this.viewer.trackedEntity = model;
  }

  disableCameraMotion(state) {
    this.viewer.scene.screenSpaceCameraController.enableRotate = state;
    this.viewer.scene.screenSpaceCameraController.enableZoom = state;
    this.viewer.scene.screenSpaceCameraController.enableLook = state;
    this.viewer.scene.screenSpaceCameraController.enableTilt = state;
    this.viewer.scene.screenSpaceCameraController.enableTranslate = state;
  }

  eventHandler() {
    let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //handler.setInputAction(()=>this.mouseLeftDoubleClick(), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    handler.setInputAction((click)=>this.mouseLeftClick(click), Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction((click)=>this.mouseLeftDown(click), Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction((movement)=>this.mouseMove(movement), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(()=>this.mouseUp(), Cesium.ScreenSpaceEventType.LEFT_UP);
  }

  selectSearch(entity) {
    let event = _.find(this.entitiesEvents, function (search) {
      return entity === search.entity;
    });
    return event;
  }

  mouseLeftClick(click) {

    if (this.url !== "") {

      let cartesian = this.viewer.camera.pickEllipsoid(click.position, this.scene.globe.ellipsoid);
      if (cartesian) {
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        let longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
        let latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
        this.drawModel(longitudeString, latitudeString);
      }
      this.url = "";
    }
    let pickedObject = this.viewer.scene.pick(click.position);
    if (Cesium.defined(pickedObject) && this.listModelOrbit.has(pickedObject.id.id)) {
      this.eventsHandlerService.evokeCallbacks('getData', {model: pickedObject.id, display: true});
    } else {
      this.eventsHandlerService.evokeCallbacks('getData', {model: '', display: false});
    }

  }

  drawPoyline(position) {
    let positionCBP = function () {
      return position;
    };
    this.viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(positionCBP, false),
        width: 0.2,
        material: Cesium.Color.RED
      }
    });
  }

  mouseMove(movement) {
    let that = this;
    // move the myEllipse around
    if (!this.picked) {
      return;
    }

    this.event.model.position = that.viewer.camera.pickEllipsoid(movement.endPosition, that.viewer.scene.globe.ellipsoid);

    if (this.event.interimOrbit.length < 2) {
      this.event.interimOrbit.push(this.event.model.position._value);
    } else {
      this.event.interimOrbit[1] = this.event.model.position._value;
    }
    this.drawPoyline(this.event.interimOrbit);
  }

  convertfromCartesian(positions) {

    let cartographic = Cesium.Cartographic.fromCartesian(positions);
    let longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
    let latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

    return {x: longitudeString, y: latitudeString};
  };

  mouseLeftDown(click) {
    let pickedObject = this.viewer.scene.pick(click.position);
    if (Cesium.defined(pickedObject) && this.listModelOrbit.has(pickedObject.id.id)) {

      this.event = this.listModelOrbit.get(pickedObject.id.id);
      this.picked = true;
      this.disableCameraMotion(false);
    }
  }

  mouseUp() {
    let that = this;
    if (this.event !== "") {
      _.each(this.event.interimOrbit, function (interim) {
        that.event.staticOrbit.push(interim);
        that.event.path.push(that.convertfromCartesian(interim));
      });

      this.event.interimOrbit = [];
      this.drawPoyline(this.event.staticOrbit);
      this.event = "";
    }
    this.picked = false;
    this.disableCameraMotion(true);
  }

}

class cesiumInstance {
  constructor(viewer) {
    this.viewer = viewer;
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
  }

  eventsHandlers() {
    this.handler.setInputAction((click)=>this.mouseClick(click), Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  mouseClick(click) {

  }

}

class modelEdit {
  constructor(viewer) {
    this.viewer = viewer;
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
  }

  eventsHandlers() {

    this.handler.setInputAction(()=>this.removeEvents(), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    this.handler.setInputAction((click)=>this.mouseLeftClick(click), Cesium.ScreenSpaceEventType.LEFT_DOWN);
    this.handler.setInputAction((movement)=>this.mouseMove(movement), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  removeEvents() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }

  mouseLeftClick() {
  }

  mouseMove() {
  }
}

