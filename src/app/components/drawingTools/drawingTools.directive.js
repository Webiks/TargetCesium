export function DrawingToolsDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    template: '<div class="drawing-tools"></div>',
    controller: DrawingToolsController,
    controllerAs: 'drawToolCtrl',
    bindToController: true
  };

  return directive;

}

class DrawingToolsController {
  constructor(createOrbitService, eventsHandlerService) {
    'ngInject';
    this.eventsHandlerService = eventsHandlerService;
    this.createOrbitService = createOrbitService;
    this.toggleT = false;
    this.initDrawingTools();
    this.initEntities();
  }

  initDrawingTools() {
    let that = this;
    let drawingTools = d3.select('drawing-tools');
    drawingTools.append('div')
      .attr("class", "draw-polygon")
      .append('svg')
      .attr("height", 30)
      .attr("width", 30)
      .append("svg:image")
      .attr("height", 30)
      .attr("width", 30)
      .attr("xlink:href", 'assets/images/polygon.svg').on('click', () => {
      that.drawPolygon();
    });
    drawingTools.append('div')
      .attr("class", "draw-polyline")
      .append('svg')
      .attr("height", 30)
      .attr("width", 30)
      .append("svg:image")
      .attr("height", 30)
      .attr("width", 30)
      .attr("xlink:href", 'assets/images/polyline.svg').on('click', () => {
      that.drawPolyline();
    });

    drawingTools.append('div')
      .attr("class", "items-list")
      .append('svg')
      .attr("height", 30)
      .attr("width", 30)
      .append("svg:image")
      .attr("height", 30)
      .attr("width", 30)
      .attr("xlink:href", 'assets/itemsList.svg').on('click', () => {
      that.toggleTable();
    });

    drawingTools.append('div')
      .attr("class", "remove-shape")
      .append('svg')
      .attr("height", 30)
      .attr("width", 30)
      .append("svg:image")
      .attr("height", 30)
      .attr("width", 30)
      .attr("xlink:href", 'assets/dustbin.svg').on('click', () => {
      that.removeShape();
    });
  }


  initEntities() {
    this.entity = this.createOrbitService.viewer.entities.getOrCreateEntity('drawingEntity');
    this.entity.polygon = new Cesium.PolygonGraphics({});
    this.entity.polygon.hierarchy = null;
    this.entity.polyline = new Cesium.PolylineGraphics({});
    this.entity.polyline.positions = null;
  }

  drawPolygon() {
    this.entity.position = null;
    this.entity.polyline.positions = null;
    this.createOrbitService.enableDrawPolygon('polygon');
  }

  drawPolyline() {
    this.entity.position = null;
    this.entity.polygon.hierarchy = null;
    this.createOrbitService.enableDrawPolygon('polyline');

  }

  removeShape() {
    this.createOrbitService.removeById('drawingEntity')
  }

  toggleTable() {
    this.toggleT = !this.toggleT;
    this.eventsHandlerService.evokeCallbacks('toggleTable', {toggle: this.toggleT});
  }
}
