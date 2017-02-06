export class CreateOrbitService {
  constructor(eventsHandlerService, $rootScope, $compile) {
    'ngInject';
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.eventsHandlerService = eventsHandlerService;
    this.listModelOrbit = new Map();
    this.url = "";
    this.dataModel = ""
  }

  enableDrawPointsIntoPolyline(model, coordinates) {
    this.dataModel = model[0];
    this.url = this.dataModel.treeDModel;
    let cartesian = [];
    let latLng = [];
    _.each(coordinates, (coordinate)=> {
      cartesian.push(Cesium.Cartesian3.fromDegrees(coordinate.longitude, coordinate.latitude));
    });
    _.each(coordinates, (coordinate)=> {
      latLng.push({x :coordinate.longitude, y :coordinate.latitude});
    });
    this.dataModel.path = latLng;
    this.drawPoyline(cartesian);
    this.drawModel(coordinates[coordinates.length - 1].longitude, coordinates[coordinates.length - 1].latitude);
  }

  enableDrawPointsIntoPolygon(distantPointsPolygon, modelsSelected) {
    _.each(modelsSelected, (model)=> {
      this.dataModel = model;
      this.url = this.dataModel.treeDModel;
      let lat = distantPointsPolygon.southern + (Math.random() * (distantPointsPolygon.northern - distantPointsPolygon.southern));
      let lng = distantPointsPolygon.western + (Math.random() * (distantPointsPolygon.eastern - distantPointsPolygon.western));
      this.drawModel(lat, lng);
    });

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
      path: this.dataModel.path === undefined ?[{x: Number(long), y: Number(lat)}]:this.dataModel.path,
      staticOrbit: []
    });
    //this.viewer.trackedEntity = model;
    this.url = "";
  }

  removeById(id) {
    this.viewer.entities.removeById(id);
  }

  enableDrawPolygon(shape) {
    this.classDrawPolygon = new polygonDraw(this.viewer);

    return this.classDrawPolygon.setDraw(this.showPopup.bind(this), shape);
  }

  showPopup(entity) {
    let scope = this.$rootScope.$new();
    scope.config = {
      entity: entity,
      viewer: this.viewer
    };
    let child = this.$compile('<floating-window class="float-window" config="config"></floating-window>')(scope);
    scope.$digest();
    let body = document.getElementsByTagName('BODY')[0];
    body.appendChild(child[0]);
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

class polygonDraw {
  constructor(viewer) {
    this._viewer = viewer;
    this.entityDraw = false;
    this._eventHandler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas);
  }

  get eventHandler() {
    return this._eventHandler;
  }

  set eventHandler(eventHandler) {
    this._eventHandler = eventHandler;
  }

  initDraw(shape) {
    this._setupEvents();
    this.typeShape = shape;
    this.drawingEntitiy = this.viewer.entities.getOrCreateEntity('drawingEntity');
    this.polygonPositions = [];
    const positionCBP = new Cesium.CallbackProperty(()=> {
      return this.polygonPositions;
    }, false);
    this.drawingEntitiy.show = true;
    this.drawingEntitiy.polyline = {
      positions: positionCBP
    };
    //this.drawingEntitiy[shape].material = Cesium.Color.BLUE;
  }

  _setupEvents() {
    this._eventHandler.setInputAction((click)=>this.mouseLeft(click), Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this._eventHandler.setInputAction((movement)=>this.mouseMove(movement), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this._eventHandler.setInputAction(()=>this.drawEnd(), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  get viewer() {
    return this._viewer;
  }

  drawEnd() {
    this.viewer.trackedEntity = undefined;
    this.entityDraw = false;
    if (this.typeShape === 'polygon') {
      this.polygonPositions.splice(this.polygonPositions.length - 2, 2, this.polygonPositions[0]);
    }

    this.showPopup(this.convertToGeoJson(this.pointsToCartographicArray(this.polygonPositions)));
    this.disableCameraMotion(true, this.viewer);
    this._eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this._eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this._eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  }

  convertToGeoJson(coordinates) {
    return {
      type: this.typeShape,
      coordinates: coordinates
    }
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

  removeEntity(entity) {
    this.viewer.entities.remove(entity);
  }


  disableCameraMotion(state, viewer) {
    viewer.scene.screenSpaceCameraController.enableRotate = state;
    viewer.scene.screenSpaceCameraController.enableZoom = state;
    viewer.scene.screenSpaceCameraController.enableLook = state;
    viewer.scene.screenSpaceCameraController.enableTilt = state;
    viewer.scene.screenSpaceCameraController.enableTranslate = state;
  }

  setDraw(showPopup, shape) {
    this.initDraw(shape);
    this.showPopup = showPopup;
    //this.onDrawUpdate = _.isFunction(_onDrawUpdate) ? _onDrawUpdate : ()=> {};
    this.disableCameraMotion(false, this.viewer);
    return this;
  }

  mouseLeft(click) {
    let position = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
    if (_.isUndefined(position)) {
      return;
    }

    this.polygonPositions.push(position);
    if (this.polygonPositions.length === 1) {
      this.polygonPositions.push(position);
    }
    //const geoJson = this.convertToGeoJson(this.pointsToCartographicArray(this.polygonPositions));
    //this.onDrawUpdate(geoJson);
    this.entityDraw = true;
    return this;
  }

  mouseMove(movement) {
    if (!this.entityDraw) {
      return;
    }

    const endPoint = this.viewer.camera.pickEllipsoid(movement.endPosition, this.viewer.scene.globe.ellipsoid);

    if (_.isUndefined(endPoint)) {
      return;
    }
    this.polygonPositions[this.polygonPositions.length - 1] = endPoint;
    return this;
  }
}


