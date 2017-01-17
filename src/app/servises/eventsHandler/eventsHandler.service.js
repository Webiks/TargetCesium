/**
 * Created by נתנאל מנצור on 1/4/2017.
 */

export class EventsHandlerService {
  constructor() {
    'ngInject';
    this.callbacks = {};
    return this;
  }

  isUndefined(item) {
    return (typeof item) === 'undefined'
  }

  setCallback(cbName, cb) {
    function removeCallback() {
      const index = this.index;
      const events = this.events;
    }

    if (this.isUndefined(this.callbacks[cbName])) {
      this.callbacks[cbName] = [];
    }
    return removeCallback.bind({
      index: this.callbacks[cbName].push(cb) - 1,
      events: this.callbacks[cbName]
    })
  }

  evokeCallbacks(cbName,data){
    if(this.isUndefined(this.callbacks[cbName])){
      return;
    }
    this.callbacks[cbName].forEach((cb)=>cb(data))
  }
  destroy(eventName){
    if(typeof eventName === 'undefined'){
      this.callbacks = {};
      return
    }
    this.callbacks[eventName] = undefined
  }
}


