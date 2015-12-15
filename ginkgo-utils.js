
if ('\v' === 'v' && typeof ScriptEngineMinorVersion === 'function' && ScriptEngineMinorVersion() === 6) {
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch (err) {}
}

if (window.Ginkgo === undefined) {
    var Ginkgo = {};
}

(function (Alias) {

    //closure
    var constSingleton = (function () {
        var obj = {};
        return {
            setter: function (name, value) {
                if (typeof name === 'string') {
                    if (obj[name] === undefined && value !== undefined) {
                        obj[name] = value;
                        return true;
                    }
                }
                return false;
            },
            getter: function (name) {
                if (typeof name === 'string' && obj[name] !== undefined) {
                    return obj[name];
                }
                return null;
            }
        };
    }());

    Alias.util = {
		//namespace('a.b.c');  namespace('aa.b.c', 'aa.b.d');
        namespace: function () {
            var a = arguments, o, i, j, d;
            for (i = 0; i < a.length; i = i + 1) {
                o = window;
                d = a[i].split(".");
                for (j = 0; j < d.length; j = j + 1) {
                    o[d[j]] = o[d[j]] || {};
                    o = o[d[j]];
                }
            }
            return o;
        },
        supplant: function (template, o, fn) { //fn: a 
            return template.replace(/\{([^{}]*)\}/g, function (a, b) {  
                    var r = typeof fn === 'function' ? fn(o[b]) : o[b];
                    return typeof r === 'string' ? r : a; 
                }
            );
        },
        isSet: function (s, obj) {
            var n, arr, o;
            if (typeof s === "string") {
                arr = s.split(".");
                o = obj || window;
                for ( n = 0; n < arr.length; n += 1) {
                    if (typeof o[arr[n]] === "undefined") {
                        return false;
                    } else {
                        o = o[arr[n]];
                    }
                }
                return true;
            }
            throw new Error("Missing or invalid argument passed to isSet");
        },
        arrReduce: function (arr, value) {
            for (var i = 0, len = arr.length; i < len; i += 1) {
                if (arr[i] === value) {
                    arr.splice(i, 1);
                    return true;
                }
            }
            return false;
        },

        
        arrUnique: function (arr, fn) {
            var i, j, k, m, len, len2, arrSort = arr.slice(0),
                arrDup = [],
                nMatches,
                value;
            arrSort.sort();
            for (i = 0, len = arrSort.length; i < len; i += 1) {
                if (arrSort[i] === arrSort[i + 1]) {
                    if (arrDup.length === 0 || (arrDup.length > 0 && arrDup[len - 1] !== arrSort[i])) {
                        arrDup.push(arrSort[i]);
                    }
                }
            }
            for (j = 0, len2 = arrDup.length; j < len2; j += 1) {
                nMatches = 0;
                value = arrDup[j];
                for (k = 0; k < arr.length; k += 1) {
                    if (value === arr[k]) {
                        nMatches += 1;
                        if (nMatches > 1) {
                            arr.splice(k, 1);
                            k -= 1;
                        }
                    }
                }
            }
            if (fn && (Object.prototype.toString.call(fn) === "[object Function]")) {
                for (m = 0; m < arr.length; m += 1) {
                    arr[m] = fn(arr[m]);  
                }
            }
            return arrDup;
        },

        scriptFilter: function (oConditions, fn) {
            var i, n, j, arr, o, b = false;
            if (typeof oConditions === "object") {
                if (oConditions.ids && oConditions.ids.length) {
                    for (j = 0; j < oConditions.ids.length; j += 1) {
                        if (typeof oConditions.ids[j] === "string" && document.getElementById(oConditions.ids[j]) !== null) {
                            b = true;
                            break;
                        }
                    }
                }
                if (b && oConditions.variables && oConditions.variables.length) {
                    for (i = 0; i < oConditions.variables.length; i += 1) {
                        arr = oConditions.variables[i].split(".");
                        o = window;
                        for (n = (arr[0] === "window") ? 1 : 0; n < arr.length; n += 1) {
                            if (typeof o[arr[n]] === "undefined") {
                                b = false;
                                break;
                            } else {
                                o = o[arr[n]];
                            }
                        }
                    }
                }
                if (b && Object.prototype.toString.call(fn) === "[object Function]") {
                    fn();
                }
            } else {
                throw new Error("Missing or invalid argument passed to scriptFilter");
            }
        },
        isControlKey : function (k) {
            return (k > 8 && k < 46) || (k > 90 && k < 96) || (k > 111 && k < 186);  
        },
       
        toHtmlEntities : function (str) {
            return str.replace(/[<>&"']/g, function (s) {
                return '&#x' + s.charCodeAt(0).toString(16) + ';';
            });
        },
       
        once: function (fn, argus) {
            if (Object.prototype.toString.call(fn) === "[object Function]") {
                if (typeof fn.iInvoke === 'undefined') {
                    fn(argus);
                    fn.iInvoke = 1;
                }
                fn.iInvoke += 1;
            }
        },
        genId: function (prefix) {
            var f = arguments.callee;    
            prefix = prefix || 'guid_';
            if (typeof f.i === 'undefined') {
                f.i = 0;
                f.t = new Date().getTime();
            }
            f.i += 1;
            return prefix + f.t + '_' + f.i;
        },
        fillForm: function (form, json){
            var els = {}, tmp, key, len, setVal, buildEls, i;
            setVal = function (el, val){
                var tagName = el.tagName.toLowerCase();
                var value = (val === undefined) ? '' : val;
                switch(tagName){            
                    case 'textarea':
                        el.value = value;
                    break;
                    case 'input':
                        switch (el.type){
                            case 'radio':
                                el.checked = (el.value == value)?true:false;
                            break;
                            case 'checkbox':
                                if(typeof value == 'string'){
                                    el.checked = (el.value == value)?true:false;
                                }else{
                                    if(!value){ value = []; }
                                    tmp = false;
                                    for(i = 0, len = value.length; i < len; i +=1){
                                        if(el.value == value[i]){tmp = true; break;}
                                    }
                                    el.checked = tmp;
                                }
                            break;
                            default :
                                el.value = value;
                            break;
                        }
                    break;
                    case 'select':
                        len = el.options.length;
                        for(i = 0; i < len; i += 1){
                            el.options[i].selected = (el.options[i].value == value) ? true : false;
                        }
                    break;
                }
            }; 
            
            buildEls = function (arr){
                var name;
                for(i = 0; i < arr.length; i += 1){
                    name = arr[i].name;
                    if(name !== ''){
                        els[name + '_' + i] = arr[i];
                        
                    }
                    
                }
            };
            
            buildEls(form.getElementsByTagName("input"));
            buildEls(form.getElementsByTagName("select"));
            buildEls(form.getElementsByTagName("textarea"));
            
            for(i = 0; i < els.length; i += 1){
                tmp = els[i];
                if(!tmp.tagName){ continue; }
                key = els[i].replace(/\_\d+$/,'').replace(/\[.*\]$/,'');
                if (typeof json[key] !== 'undefined') {
                    setVal(tmp, json[key]);
                }
            }
                   
        },
        saveUrlInSession: function () {
            window.name = location.href;	
        },
        getUrlInSession: function () {
            return window.name;	
        },

      
        define: function (name, value) {
            return constSingleton.setter(name, value);    //true | false
        },
        constant: function (name) {
            return constSingleton.getter(name);    //value | null
        },

        wrapper: function (strNamespace, fn) {
            var o;
            if (typeof strNamespace === 'string') {
                o = Alias.util.namespace(strNamespace);
                if (Object.prototype.toString.call(fn) === "[object Function]") {
                    fn(o);
                } else {
                    throw new Error("Missing or invalid argument passed to wrapper");
                }
            } else {
                throw new Error("Missing or invalid argument passed to wrapper");
            }
        },

        getParamObj: function (strParams) {
            var o = {};
            strParams = typeof strParams === 'string' ? strParams : '';
            strParams.replace(/([^?=&]+)=([^&]*)/g, function (m, key, value) {
                o[key] = value;
            });
            return o;
        },

        hexdec: function (strHex) {
            if (typeof strHex === 'number') {
                strHex = strHex.toString(16);
            }
            strHex = strHex.replace(/[^a-f0-9]/gi, '');
            return parseInt(strHex, 16);
        },

        
        gObj: function () {
            //private
            var _setter = function (obj, name, value) {
                    if (typeof name === 'string') {
                        if (typeof value !== 'undefined' && obj[name] !== value ) {
                            obj[name] = value;
                            return true;
                        }
                        return false;
                    }
                    return false;
                },
                _getter = function (obj, name) {
                    if (typeof name === 'string' && typeof obj[name] !== 'undefined') {
                        return obj[name];
                    }
                    return null;
                },
                _trigger = function (that, fn, name, value) {
                    if (Object.prototype.toString.call(fn) === "[object Function]") {
                        fn.apply(that, [name, value]);
                    }
                };

            //closure
            return function () {
                var _o = {},
                    _length = 0;
                return {
                    set: function (name, value) {
                        var that = this,
                            isNameExist = (_getter(_o, name) === null) ? false : true,
                            isUpdated = false;
						value = this.formatterForSet(value);
                        _trigger(that, that.b4Change, name, value);

                        //only allow specific value matching the rules
                        if (this.rules === null || (this.rules instanceof RegExp && this.rules.test(value))) {
                            isUpdated = _setter(_o, name, value);
                        }

                        if (isUpdated) {
                            if (!isNameExist) {
                                _length += 1;
                            }
                            _trigger(that, that.onChange, name, value);
                        }
                        return isUpdated;
                    },
                    get: function (name) {
                        var value = _getter(_o, name);
                        return this.formatterForGet(value);
                    },
                    count: function () {
                        return _length;
                    },
                    rules: null,    //RegExp Pattern, null by default
                    formatterForGet: function (value) {return value;},
                    formatterForSet: function (value) {return value;},
                    b4Change: function (name, value) {},
                    onChange: function (name, value) {}
                };

            }();

        },
		// order array, o = "asc"||"desc"
		arraySort: function (arr, o) {
			var arrSort, compare;
			if (arr.length < 2 || typeof arr[0] === 'string' || arr[0][0]) {
				return false;
			}
			if (o !== 'asc' && o !== 'desc') {
				o = 'desc'; 
			}
			compare = function (a, b) { 
				if (o === 'asc') {
					return a - b; 
				}
				else {
					return b - a;	
				}
			};
			
			arrSort = arr.slice(0);
			
			return arrSort.sort(compare);  
			
		},
		//order json ,[{'id':1,'title':'title'},{'id':2,'title':'title'}]
		jsonSort: function (s, o, k) {
			var compare, arrSort = [], json = {}, i;
			if (s.length < 2 || typeof s[0] === 'string' || s[0][0]) {
				return false;
			}
			if (o !== 'asc' && o !== 'desc') {
				o = 'desc'; 
			}
			if (typeof k !== 'string' || k.length <= 0) {
				return false;
			}
			compare = function (a, b) { 
				if (o === 'asc') {
					return a[k] - b[k]; 
				}
				else {
					return b[k] - a[k];	
				}
			};
			for (i = 0; i < s.length; i += 1) {
				arrSort[i] = s[i];
			}
			arrSort.sort(compare);
			for (i = 0; i < arrSort.length; i += 1) {
				json[i] = arrSort[i];
			}	
			return json;
		}

    };

}(Ginkgo));
