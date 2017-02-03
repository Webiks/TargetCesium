/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { DragDropConfig } from './components/dragDrop/dragDropConfig.service';
import { PlayVideoService } from'./servises/playVideo/playVideo.service';
import { CreateOrbitService } from './servises/createOrbit/createOrbit.service';
import { EventsHandlerService } from './servises/eventsHandler/eventsHandler.service';
import { CalculatingVolumeShapeService } from './servises/calculatingVolumeShape/calculatingVolumeShape.service';

import { AppDirective } from  './components/app/app.directive';
import { MapCesiumDirective } from './components/mapCesium/mapCesium.directive';
import { DragDropDirective } from './components/dragDrop/dragDrop.directive';
import { VideoMapDirective } from './components/videoMap/videoMap.directive';
import { SideBarDirective } from './components/sideBar/sideBar.directive';
import { ChatMessageDirective } from './components/chatMessage/chatMessage.directive';
import { SettingsThreeDDirective } from './components/settingsThreeD/settingsThreeD.directive';
import { DrawingToolsDirective } from './components/drawingTools/drawingTools.directive';
import { LeftSidebarDirective } from './components/leftSidebar/leftSidebar.directive';
import { FloatingWindowDirective } from './components/floatingWindow/floatingWindow.directive';

angular.module('goals', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('dragDropConfig', DragDropConfig)
  .service('createOrbitService', CreateOrbitService)
  .service('playVideoService', PlayVideoService)
  .service('eventsHandlerService', EventsHandlerService)
  .service('calculatingVolumeShapeService', CalculatingVolumeShapeService)
  .directive('mapCesium', MapCesiumDirective)
  .directive('videoMap', VideoMapDirective)
  .directive('sideBar', SideBarDirective)
  .directive('leftSidebar', LeftSidebarDirective)
  .directive('chatMessage', ChatMessageDirective)
  .directive('app', AppDirective)
  .directive('settingsThreeD', SettingsThreeDDirective)
  .directive('dragDrop', DragDropDirective)
  .directive('floatingWindow', FloatingWindowDirective)
  .directive('drawingTools', DrawingToolsDirective);
