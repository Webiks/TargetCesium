/**
 * Created by netanel on 11/23/2016.
 */
export function DragDropDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    template: '<div  class="open-3D-model"></div><div class="options-3d-models"></div>',
    scope: {
      creationDate: '='
    },
    controller: DragDropController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

}

class DragDropController {
  constructor(dragDropConfig,createOrbitService) {
    'ngInject';
    this.openModels = true;
    this.createOrbitService=createOrbitService;
    this.dragDropConfig = dragDropConfig;
    //this.initDragDrop();
    this.initOptions3DModels()
  }

  initOptions3DModels() {
    let that = this;
    //Show options 3D models
    d3.select('.open-3D-model')
      .style('display', 'block')
      .append('svg')
      .attr("height", 40)
      .attr("width", 40)
      .append("svg:image")
      .attr("height", 40)
      .attr("width", 40)
      .attr("xlink:href", 'assets/3d-printer.svg').on('click', function () {
      that.openModels = !that.openModels;
      if (!that.openModels) {
        d3.select('.open-3D-model').style('display', 'none');
        d3.select('.options-3d-models').style('display', 'block');
      }
    });

    let options = d3.select('.options-3d-models')
      .style('display', 'none');

    let header = options.append('div')
      .attr("class", 'header');

    //hidden options 3D models
    header.append('div')
      .attr("class", 'close')
      .append('svg')
      .attr("height", 30)
      .attr("width", 30)
      .append("svg:image")
      .attr("height", 30)
      .attr("width", 30)
      .attr("xlink:href", 'assets/close.svg')
      .on('click', function () {
        that.openModels = !that.openModels;
        if (that.openModels) {
          d3.select('.open-3D-model').style('display', 'block');
          d3.select('.options-3d-models').style('display', 'none');
        }
      });


    let treeDModel = options.append('div')
      .attr("class", 'models-3d');

    let div = treeDModel.selectAll('div')
      .data(this.dragDropConfig.data)
      .enter();

    let scope = div.append('div')
      .attr('class', 'model')
      .on('click', function (d) {
        that.createOrbitService.enableDrawModel(d);
      });

    scope.append('div')
      .attr('class', 'name')
      .text(function (d) {
        return d.nameE;
      });
    scope.append('svg')
      .attr('class', 'image-3D-model')
      .attr("height", 20)
      .attr("width", 20)

      .append("svg:image")
      .attr("height", 20)
      .attr("width", 20)
      .attr("xlink:href", function (d) {
        return d.image;
      })
  }

}
