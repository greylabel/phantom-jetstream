var EventDispatcher = function () {
  if (!this instanceof arguments.callee) {
    return new arguments.callee(page);
  }


};

EventDispatcher.prototype = {
  callbacks : {},

  emit : function (event) {
    if (!this.callbacks[event]) {
      return this;
    }

    for (var i = 0, len = this.callbacks[event].length; i < len; i++) {
      if (this.callbacks[event][i].scope) {
        this.callbacks[event][i].callback.call(this.callbacks[event][i].scope, event);
      } else {
        this.callbacks[event][i].callback(event);
      }
    }
  },

  bind : function (event, callback, scope) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    cbobj = {
      callback : callback,
      scope : scope
    };

    this.callbacks[event].push(cbobj);
    return this;
  }
};

EventDispatcher._instance = null;
EventDispatcher.getInstance = function () {
  if (!EventDispatcher._instance) {
    EventDispatcher._instance = new EventDispatcher();
  }

  return EventDispatcher._instance;
};

module.exports.EventDispatcher = EventDispatcher;
