//
// Central Config API
//
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Hoodie.Config = (function() {
  Config.prototype.type = '$config';

  Config.prototype.id = 'hoodie';

  function Config(hoodie, options) {
    var _this = this;
    this.hoodie = hoodie;
    if (options == null) {
      options = {};
    }
    this.clear = __bind(this.clear, this);
    this.cache = {};
    if (options.type) {
      this.type = options.type;
    }
    if (options.id) {
      this.id = options.id;
    }
    this.hoodie.store.find(this.type, this.id).done(function(obj) {
      return _this.cache = obj;
    });
    this.hoodie.on('account:signedOut', this.clear);
  }

  Config.prototype.set = function(key, value) {
    var isSilent, update;
    if (this.cache[key] === value) {
      return;
    }
    this.cache[key] = value;
    update = {};
    update[key] = value;
    isSilent = key.charAt(0) === '_';
    return this.hoodie.store.update(this.type, this.id, update, {
      silent: isSilent
    });
  };

  Config.prototype.get = function(key) {
    return this.cache[key];
  };

  Config.prototype.clear = function() {
    this.cache = {};
    return this.hoodie.store.remove(this.type, this.id);
  };

  Config.prototype.remove = function(key) {
    return this.set(key, void 0);
  };

  return Config;

})();
