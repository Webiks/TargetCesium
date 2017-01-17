/**
 * Created by netanel on 11/23/2016.
 */
export function VideoMapDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    template: '<div class="video-map"></div>',
    scope: {
      creationDate: '='
    },
    controller: VideoMapController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

}

class VideoMapController {
  constructor(playVideoService, createOrbitService) {
    'ngInject';
    this.createOrbitService =createOrbitService;
    this.playVideoService = playVideoService;
    this.init();
  }

  init() {
    let that = this;
    d3.select('.video-map')
      .style('display', 'block')
      .append('svg')
      .attr("height", 80)
      .attr("width", 80)
      .append("svg:image")
      .attr("height", 80)
      .attr("width", 80)
      .attr("xlink:href", 'assets/images/video/play-button.svg').on('click', function () {
      that.createOrbitService.play(that.playVideoService.pushPositionToCzml());
    });
  }
}
