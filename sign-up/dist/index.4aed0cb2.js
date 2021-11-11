// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"dxsXP":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "e2bc6aa84aed0cb2";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"a8BgZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _app = require("./app");
var _appDefault = parcelHelpers.interopDefault(_app);
const app = new _appDefault.default('#root', {
    title: 'Javascript & TypeScript Essential Chapter 5 - Sign up'
});
app.render();

},{"./app":"lwGdm","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lwGdm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>App
);
var _appTemplate = require("./app.template");
var _appTemplateDefault = parcelHelpers.interopDefault(_appTemplate);
var _constant = require("./constant");
var _views = require("./views");
class App {
    constructor(container, data = {
    }){
        this.template = _appTemplateDefault.default;
        this.active = false;
        this.initialize = ()=>{
            const nameField = new _views.TextField('#required-fields', {
                id: 'name',
                label: '이름',
                type: 'text',
                placeholder: '이름을 입력해주세요',
                require: true
            });
            const idField = new _views.TextField('#required-fields', {
                id: 'id',
                label: '아이디',
                type: 'text',
                placeholder: '아이디를 입력해주세요',
                require: true
            });
            const emailField = new _views.TextField('#required-fields', {
                id: 'email',
                label: '이메일',
                type: 'email',
                placeholder: '이메일을 입력해주세요',
                require: true
            });
            const passwordField = new _views.PasswordField('#required-fields', {
                id: 'password',
                label: '비밀번호',
                placeholder: '비밀번호를 입력해주세요'
            });
            const addressField = new _views.AddressField('#optional-fields', {
                id: 'address',
                label: '배송지 주소'
            });
            idField.addValidateRule(_constant.CantContainWhitespace);
            idField.addValidateRule(_constant.CantStartNumber);
            idField.addValidateRule(_constant.MinimumLengthLimit(3));
            emailField.addValidateRule(_constant.CantContainWhitespace);
            this.fields.push(nameField);
            this.fields.push(idField);
            this.fields.push(emailField);
            this.fields.push(passwordField);
            this.fields.push(addressField);
        };
        this.validFieldMonitor = ()=>{
            const btnJoin = this.container.querySelector('#btn-join');
            if (this.fields.filter((field)=>field.isValid
            ).length === this.fields.length) {
                this.active = true;
                btnJoin.classList.remove('bg-gray-300');
                btnJoin.classList.add('bg-green-500');
            } else {
                this.active = true;
                btnJoin.classList.remove('bg-green-500');
                btnJoin.classList.add('bg-gray-300');
            }
        };
        this.onSubmit = (e)=>{
            e.preventDefault();
            const submitData = this.fields.map((field)=>({
                    [field.name]: field.value
                })
            ).reduce((a, b)=>({
                    ...a,
                    ...b
                })
            , {
            });
            console.log(submitData);
        };
        this.render = ()=>{
            this.container.innerHTML = this.template(this.data);
            this.fields.forEach((field)=>{
                field.render(true);
            });
            this.container.addEventListener('submit', this.onSubmit);
        };
        this.container = document.querySelector(container);
        this.data = data;
        this.fields = [];
        this.initialize();
        setInterval(this.validFieldMonitor, 1000 / 30);
    }
}

},{"./app.template":"2pFiI","./constant":"jPMhr","./views":"lJdn7","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2pFiI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const template = `
<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">

    <div class="leading-loose">
        <form id="sign-up-form" class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
            <p class="text-gray-800 font-medium mb-5 text-center">{{title}}</p>
            <div id="required-fields">
            
            </div>
            
            <p class="mt-8 text-gray-300 text-sm">Additional information</p>

            <div id="optional-fields">
            
            </div>

            <div class="mt-4">
                <button id="btn-join" class="px-4 py-1 text-white font-light tracking-wider bg-gray-300 rounded" type="submit">회원 가입</button>
            </div>    
        </form>
    </div>

    </div>
</div>
`;
exports.default = window.Handlebars.compile(template);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"jPMhr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RequireRule", ()=>RequireRule
);
parcelHelpers.export(exports, "CantContainWhitespace", ()=>CantContainWhitespace
);
parcelHelpers.export(exports, "CantStartNumber", ()=>CantStartNumber
);
parcelHelpers.export(exports, "MinimumLengthLimit", ()=>MinimumLengthLimit
);
const RequireRule = {
    rule: /.+/,
    match: true,
    message: '필수 입력 항목입니다.'
};
const CantContainWhitespace = {
    rule: /\s/,
    match: false,
    message: '공백을 포함할 수 없습니다.'
};
const CantStartNumber = {
    rule: /^\d/,
    match: false,
    message: '숫자로 시작하는 아이디는 사용할 수 없습니다.'
};
const MinimumLengthLimit = (limit)=>({
        rule: new RegExp(`(.){${limit}}`),
        match: true,
        message: `최소한 ${limit}글자 이상 이어야 합니다.`
    })
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lJdn7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TextField", ()=>_textFieldDefault.default
);
parcelHelpers.export(exports, "PasswordField", ()=>_passwordFieldDefault.default
);
parcelHelpers.export(exports, "AddressField", ()=>_addressFieldDefault.default
);
var _textField = require("./text-field");
var _textFieldDefault = parcelHelpers.interopDefault(_textField);
var _passwordField = require("./password-field");
var _passwordFieldDefault = parcelHelpers.interopDefault(_passwordField);
var _addressField = require("./address-field");
var _addressFieldDefault = parcelHelpers.interopDefault(_addressField);

},{"./text-field":"3yPyM","./password-field":"7pLRw","./address-field":"g1iJB","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3yPyM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>TextField
);
var _utils = require("../utils");
var _textFieldTemplate = require("./text-field.template");
var _textFieldTemplateDefault = parcelHelpers.interopDefault(_textFieldTemplate);
var _constant = require("../constant");
const DefaultProps = {
    id: "",
    text: "",
    label: "label",
    type: "text",
    placeholder: "",
    require: false
};
class TextField {
    constructor(container, data){
        this.template = _textFieldTemplateDefault.default;
        this.updated = false;
        this.validateRules = [];
        this.validate = ()=>{
            const target = this.data.text ? this.data.text.trim() : "";
            const invalidateRules = this.validateRules.filter((validateRule)=>validateRule.rule.test(target) !== validateRule.match
            );
            return invalidateRules.length > 0 ? invalidateRules[0] : null;
        };
        this.buildData = ()=>{
            const isInvalid = this.validate();
            if (this.updated) return {
                ...this.data,
                updated: this.updated,
                valid: !isInvalid,
                validateMessage: !!isInvalid ? isInvalid.message : ""
            };
            else return {
                ...this.data,
                updated: this.updated,
                valid: true,
                validateMessage: ""
            };
        };
        this.onChange = (e)=>{
            const { value , id  } = e.target;
            if (id === this.data.id) {
                this.updated = true;
                this.data.text = value;
                this.update();
            }
        };
        this.attachEventHandler = ()=>{
            document.querySelector(this.container)?.addEventListener("change", this.onChange);
        };
        this.update = ()=>{
            const container = document.querySelector(`#field-${this.data.id}`);
            const docFrag = document.createElement("div");
            docFrag.innerHTML = this.template(this.buildData());
            container.innerHTML = docFrag.children[0].innerHTML;
        };
        this.addValidateRule = (rule)=>{
            this.validateRules.push(rule);
        };
        this.render = (append = false)=>{
            const container = document.querySelector(this.container);
            if (append) {
                const divFragment = document.createElement("div");
                divFragment.innerHTML = this.template(this.buildData());
                container.appendChild(divFragment.children[0]);
            } else container.innerHTML = this.template(this.buildData());
        };
        this.container = container;
        this.data = {
            ...DefaultProps,
            ...data
        };
        if (this.data.require) this.addValidateRule(_constant.RequireRule);
        _utils.nextTick(this.attachEventHandler);
    }
    get name() {
        return this.data.id;
    }
    get value() {
        return this.data.text || "";
    }
    get isValid() {
        return !this.validate();
    }
}

},{"../utils":"2OwJi","./text-field.template":"fTVbL","../constant":"jPMhr","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2OwJi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "nextTick", ()=>nextTick
);
const nextTick = (fn)=>setTimeout(fn, 16)
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fTVbL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const template = `
    <div id="field-{{id}}" class="mt-4">
        <div class="flex items-start mb-1">
            <span class="flex items-center">
                <svg class="flex-shrink-0 h-5 w-5 {{#if valid}}{{#if updated}}text-green-500{{else}}text-gray-200{{/if}}{{else}}text-gray-200{{/if}}" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
            </span>
            <label class="block text-sm" for="name">{{label}}</label>
        </div>
        <input id="{{id}}" name="{{id}}" type="{{type}}" value="{{text}}" {{#if require}}required{{/if}} 
            placeholder="{{placeholder}}" aria-label="Name" class="w-full px-5 py-1 text-gray-700 {{#if valid}}bg-gray-200{{else}}bg-red-200{{/if}} rounded">
        {{#unless valid}}
        <div class="flex items-start mb-1">
            <label class="block text-sm text-red-300" for="cus_email">{{validateMessage}}</label>
        </div>
        {{/unless}}
    </div>
`;
exports.default = window.Handlebars.compile(template);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7pLRw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>PasswordField
);
var _utils = require("../utils");
var _passwordFieldTemplate = require("./password-field.template");
var _passwordFieldTemplateDefault = parcelHelpers.interopDefault(_passwordFieldTemplate);
var _constant = require("../constant");
var StrongLevel;
(function(StrongLevel) {
    StrongLevel[StrongLevel["None"] = 0] = "None";
    StrongLevel[StrongLevel["Light"] = 1] = "Light";
    StrongLevel[StrongLevel["Medium"] = 2] = "Medium";
    StrongLevel[StrongLevel["Havey"] = 3] = "Havey";
})(StrongLevel || (StrongLevel = {
}));
const StrongMessage = [
    '금지된 수준',
    '심각한 수준',
    '보통 수준',
    '강력한 암호', 
];
const DefaultProps = {
    id: '',
    label: 'label',
    text: '',
    require: true,
    placeholder: '',
    strong: StrongLevel.None
};
class PasswordField {
    constructor(container, data){
        this.template = _passwordFieldTemplateDefault.default;
        this.updated = false;
        this.validateRules = [];
        this.onChange = (e)=>{
            const { value , id  } = e.target;
            if (id === this.data.id) {
                this.updated = true;
                this.data.text = value;
                this.update();
            }
        };
        this.attachEventHandler = ()=>{
            document.querySelector(this.container)?.addEventListener('change', this.onChange);
        };
        this.buildData = ()=>{
            let strongLevel = -1;
            const isInvalid = this.validate();
            if (this.data.text.length > 0) strongLevel++;
            if (this.data.text.length > 12) strongLevel++;
            if (/[!@#$%^&*()]/.test(this.data.text)) strongLevel++;
            if (/\d/.test(this.data.text)) strongLevel++;
            return {
                ...this.data,
                updated: this.updated,
                valid: this.updated ? !isInvalid : true,
                strongMessage: strongLevel < 0 ? '' : StrongMessage[strongLevel],
                strongLevel0: strongLevel >= 1,
                strongLevel1: strongLevel >= 2,
                strongLevel2: strongLevel >= 3,
                strongLevel3: strongLevel >= 4
            };
        };
        this.validate = ()=>{
            const target = this.data.text ? this.data.text.trim() : '';
            const invalidateRules = this.validateRules.filter((validateRule)=>validateRule.rule.test(target) !== validateRule.match
            );
            return invalidateRules.length > 0 ? invalidateRules[0] : null;
        };
        this.update = ()=>{
            const container = document.querySelector(`#field-${this.data.id}`);
            const docFrag = document.createElement('div');
            docFrag.innerHTML = this.template(this.buildData());
            container.innerHTML = docFrag.children[0].innerHTML;
        };
        this.addValidateRule = (rule)=>{
            this.validateRules.push(rule);
        };
        this.render = (append = false)=>{
            const container = document.querySelector(this.container);
            if (append) {
                const divFragment = document.createElement('div');
                divFragment.innerHTML = this.template(this.buildData());
                container.appendChild(divFragment.firstElementChild);
            } else container.innerHTML = this.template(this.buildData());
        };
        this.container = container;
        this.data = {
            ...DefaultProps,
            ...data
        };
        if (this.data.require) this.addValidateRule(_constant.RequireRule);
        _utils.nextTick(this.attachEventHandler);
    }
    get name() {
        return this.data.id;
    }
    get value() {
        return this.data.text || '';
    }
    get isValid() {
        return !this.validate();
    }
}

},{"../utils":"2OwJi","./password-field.template":"bTCCr","../constant":"jPMhr","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bTCCr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const template = `
<div id="field-{{id}}">
  <div class="mt-4">
    <div class="flex items-start mb-1">
        <span class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 {{#if valid}}{{#if updated}}text-green-500{{else}}text-gray-200{{/if}}{{else}}text-gray-200{{/if}}" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </span>        
        <label class="block text-sm" for="password">{{label}}</label>
    </div>
    <input id="{{id}}" name="{{id}}" type="password" value="{{text}}" placeholder="{{placeholder}}" {{#if require}}required{{/if}} aria-label="Password" class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
    </div>

    <div class="mt-1">
    <div class="flex items-start mb-1">
        {{#if strongLevel0}}
        <span class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-green-100" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </span>        
        {{/if}}

        {{#if strongLevel1}}
        <span class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </span>        
        {{/if}}

        {{#if strongLevel2}}
        <span class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </span>        
        {{/if}}

        <label class="block text-sm text-gray-300" for="cus_email">{{strongMessage}}</label>
    </div>
  </div>
</div>
`;
exports.default = window.Handlebars.compile(template);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"g1iJB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>AddressField
);
var _addressFieldTemplate = require("./address-field.template");
var _addressFieldTemplateDefault = parcelHelpers.interopDefault(_addressFieldTemplate);
const DefaultProps = {
    id: '',
    label: 'label',
    require: false
};
class AddressField {
    constructor(cotainer, data){
        this.template = _addressFieldTemplateDefault.default;
        this.render = (append = false)=>{
            const container = document.querySelector(this.container);
            if (append) {
                const divFragment = document.createElement('div');
                divFragment.innerHTML = this.template({
                    ...this.data
                });
                container.appendChild(divFragment.firstElementChild);
            } else container.innerHTML = this.template({
                ...this.data
            });
            container.querySelector(`#search-address`)?.addEventListener('click', ()=>{
                new window.daum.Postcode({
                    oncomplete: (data)=>{
                        this.address1 = data.roadAddress;
                        this.zipcode = data.sigunguCode;
                        container.querySelector('#address1').value = `(${this.zipcode}) ${this.address1}`;
                    }
                }).open();
            });
        };
        this.container = cotainer;
        this.data = {
            ...DefaultProps,
            ...data
        };
    }
    get isValid() {
        return true;
    }
    get name() {
        return this.data.id;
    }
    get value() {
        const container = document.querySelector(this.container);
        const address2 = container.querySelector('#address2')?.value;
        return `${this.zipcode}|${this.address1} ${address2 || ''}`;
    }
}

},{"./address-field.template":"9bCSt","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9bCSt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const template = `
<div id="field-{{id}}">

    <div class="mt-2">
        <label class="block text-sm" for="cus_email">{{label}}</label>
        <div class="flex items-center">
            <input id="address1" name="address1" type="text" value="{{displayAddress}}" placeholder="주소를 검색해 주세요" class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded">
            <button id="search-address" class="bg-gray-300 text-gray-500 px-1 py-1 rounded shadow " style="margin-left: -3rem;">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </div>
    </div>

    <div class="mt-2">
        <label class="hidden text-sm block text-gray-600" for="address2">상세 주소</label>
        <input id="address2" name="address2" type="text" placeholder="상세 주소" aria-label="Address 2" class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" >
    </div>

</div>
`;
exports.default = window.Handlebars.compile(template);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["dxsXP","a8BgZ"], "a8BgZ", "parcelRequire5d2d")

//# sourceMappingURL=index.4aed0cb2.js.map
