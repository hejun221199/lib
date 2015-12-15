

"use strict";

if (typeof Function.prototype.bind !== 'function') {
    Function.prototype.bind = function (thisArg) {
        var method = this,
            slice = Array.prototype.slice,
            args = slice.call(arguments, 1);
        if (arguments.length < 2 && thisArg === undefined) {
            return this;
        }
        return function () {
            var a = args.concat(slice.call(arguments, 0));
            return method.apply(thisArg, a);
        };
    };
}



if (typeof Array.isArray !== 'function') {
    Array.isArray = function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };
}

if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function (item, i) {
        var length = this.length;
        i = i || 0;
        if (i < 0) {
            i = length + i;
        }
        for (i; i < length; i += 1) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    };
}

if (typeof Array.prototype.lastIndexOf !== 'function') {
    Array.prototype.lastIndexOf = function (item, i) {
        var length = this.length;
        i = i || length;
        if (i < 0) {
            i = length + i;
        }
        i = Math.min(i, length - 1);
        for (i; i >= 0; i -= 1) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    };
}

if (typeof Array.prototype.every !== 'function') {
    Array.prototype.every = function (callbackfn, thisArg) {
        var i, len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] !== undefined && !callbackfn.call(thisArg, this[i], i, this)) {
                return false;
            }
        }
        return true;
    };
}


if (typeof Array.prototype.some !== 'function') {
    Array.prototype.some = function (callbackfn, thisArg) {
        var i, len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] !== undefined && callbackfn.call(thisArg, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}


if (typeof Array.prototype.forEach !== 'function') {
    Array.prototype.forEach = function (callbackfn, thisArg) {
        var i, len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] !== undefined) {
                callbackfn.call(thisArg, this[i], i, this);
            }
        }
    };
}

if (typeof Array.prototype.map !== 'function') {
    Array.prototype.map = function (callbackfn, thisArg) {
        var i,
            len = this.length,
            res = [];
        res.length = len;
        for (i = 0; i < len; i += 1) {
            if (this[i] !== undefined) {
                res[i] = callbackfn.call(thisArg, this[i], i, this);
            }
        }
        return res;
    };
}

if (typeof Array.prototype.filter !== 'function') {
    Array.prototype.filter = function (callbackfn, thisArg) {
        var res = [], i, len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] !== undefined && callbackfn.call(thisArg, this[i], i, this)) {
                res.push(this[i]);
            }
        }
        return res;
    };
}


if (typeof Array.prototype.reduce !== 'function') {
    Array.prototype.reduce = function (callbackfn, initialValue) {
        var len = this.length,
            k = 0,
            accumulator;
       
        if (typeof callbackfn !== 'function' || (len === 0 && arguments.length === 1)) {
            throw new TypeError();
        }

        if (arguments.length > 1) {
            accumulator = initialValue;
        } else {
            while (k < len) {
                if (this[k] !== undefined) {
                    accumulator = this[k];
                    k += 1;
                    break;
                }
                k += 1;
            }
            if (k === len) {
                throw new TypeError();
            }
        }

        while (k < len) {
            if (this[k] !== undefined) {
                accumulator = callbackfn.call(null, accumulator, this[k], k, this);
            }
            k += 1;
        }
        return accumulator;
    };
}


if (typeof Array.prototype.reduceRight !== 'function') {
    Array.prototype.reduceRight = function (callbackfn, initialValue) {

        var len = this.length,
            k = len - 1,
            accumulator;

       
        if (typeof callbackfn !== 'function' || (len === 0 && arguments.length === 1)) {
            throw new TypeError();
        }

        if (arguments.length > 1) {
            accumulator = initialValue;
        } else {
            while (k >= 0) {
                if (this[k] !== undefined) {
                    accumulator = this[k];
                    k -= 1;
                    break;
                }
                k -= 1;
            }
            if (k < 0) {
                throw new TypeError();
            }
        }

        while (k >= 0) {
            if (this[k] !== undefined) {
                accumulator = callbackfn.call(null, accumulator, this[k], k, this);
            }
            k -= 1;
        }

        return accumulator;
    };
}


if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
       
        var i = 0,
            j = this.length,
            //note: in IE6~8, '\v' !== '\u000b', '\v' === 'v'
            ws = /[\t\n\b\f\r\x0b\x20\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/;
        while (ws.test(this.charAt(i))) {
            i += 1;
        }
        while (ws.test(this.charAt(j - 1))) {
            j -= 1;
        }
        return this.slice(i, j);
    };
}


if (typeof Date.now !== 'function') {
    Date.now = function () {
        return new Date().getTime();
    };
}


if (typeof Date.prototype.toISOString !== 'function') {
    Date.prototype.toISOString = function () {
        function f(n, len) {   
            var i;
            len = len || 2;
            if (/[0-9]/.test(n)) {
                n = n.toString();
                for (i = n.length; i < len; i += 1) {
                    n = '0' + n;
                }
            }
            return n;
        }
        return this.getUTCFullYear()   + '-' +
            f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate())      + 'T' +
            f(this.getUTCHours())     + ':' +
            f(this.getUTCMinutes())   + ':' +
            f(this.getUTCSeconds())   + '.' +
            f(this.getUTCMilliseconds(), 3) + 'Z';
    };
}

if (typeof Object.keys !== 'function') {
    Object.keys = function(obj) {
        var keys = [];
        if ( typeof obj !== 'object' && (typeof obj !== 'function' || obj === null) ) {
            throw new TypeError('Object.keys called on non-object');
        } else {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }
        }
        return keys;
    };
}


if (typeof Object.create !== 'function') {
  
  Object.create = (function() {
   
    function Temp() {}

    
    var hasOwn = Object.prototype.hasOwnProperty;

    return function (O) {
     
      if (typeof O !== 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }

  
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; 

      
      if (arguments.length > 1) {
       
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }

     
      return obj;
    };
  })();
}
