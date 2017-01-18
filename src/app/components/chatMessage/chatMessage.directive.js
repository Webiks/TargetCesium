/**
 * Created by נתנאל מנצור on 12/31/2016.
 */

export function ChatMessageDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/chatMessage/chatMessage.html',
    controller: ChatMessageController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

}

class ChatMessageController {
  constructor() {
    'ngInject';

  }

}
