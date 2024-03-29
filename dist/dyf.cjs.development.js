'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var web3 = require('@solana/web3.js');
var beet = require('@metaplex-foundation/beet');
var beetSolana = require('@metaplex-foundation/beet-solana');
var splToken = require('@solana/spl-token');
var base58 = _interopDefault(require('bs58'));
var BN = _interopDefault(require('bn.js'));
var randomstring = _interopDefault(require('randomstring'));
var axios = _interopDefault(require('axios'));
var tsMd5 = require('ts-md5');
var merkletreejs = require('merkletreejs');
var keccak256 = _interopDefault(require('keccak256'));
var _ = _interopDefault(require('lodash'));
var solRayz = require('@nfteyez/sol-rayz');

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
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
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (Tag) {
  Tag[Tag["Word"] = 0] = "Word";
  Tag[Tag["Sentence"] = 1] = "Sentence";
})(exports.Tag || (exports.Tag = {}));
/**
 * @category userTypes
 * @category generated
 */
var tagBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.Tag);

var campaignDiscriminator = [50, 40, 49, 11, 157, 220, 229, 192];
/**
 * Holds the data for the {@link Campaign} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var Campaign = /*#__PURE__*/function () {
  function Campaign(architect, domain /* size: 64 */, subject /* size: 64 */, industry /* size: 32 */, organizer /* size: 16 */, lang /* size: 16 */, title /* size: 16 */, tag, open, close, expire, stakeTvl, minStake, rewardCap, rewardTvl, claimedReward, unclaimedReward, rewardFinish, minPhrase, minValidate, rpuValidator, minGeneral, rpuGeneral, minSpecific, rpuSpecific, minCause, rpuCause, minEffect, rpuEffect, majorityQuorum, utterances, phraseApproved, payScale, timeLimit, finish, finishTime, architectClaim, overrunBuffer, bump) {
    this.architect = architect;
    this.domain = domain;
    this.subject = subject;
    this.industry = industry;
    this.organizer = organizer;
    this.lang = lang;
    this.title = title;
    this.tag = tag;
    this.open = open;
    this.close = close;
    this.expire = expire;
    this.stakeTvl = stakeTvl;
    this.minStake = minStake;
    this.rewardCap = rewardCap;
    this.rewardTvl = rewardTvl;
    this.claimedReward = claimedReward;
    this.unclaimedReward = unclaimedReward;
    this.rewardFinish = rewardFinish;
    this.minPhrase = minPhrase;
    this.minValidate = minValidate;
    this.rpuValidator = rpuValidator;
    this.minGeneral = minGeneral;
    this.rpuGeneral = rpuGeneral;
    this.minSpecific = minSpecific;
    this.rpuSpecific = rpuSpecific;
    this.minCause = minCause;
    this.rpuCause = rpuCause;
    this.minEffect = minEffect;
    this.rpuEffect = rpuEffect;
    this.majorityQuorum = majorityQuorum;
    this.utterances = utterances;
    this.phraseApproved = phraseApproved;
    this.payScale = payScale;
    this.timeLimit = timeLimit;
    this.finish = finish;
    this.finishTime = finishTime;
    this.architectClaim = architectClaim;
    this.overrunBuffer = overrunBuffer;
    this.bump = bump;
  }
  /**
   * Creates a {@link Campaign} instance from the provided args.
   */
  Campaign.fromArgs = function fromArgs(args) {
    return new Campaign(args.architect, args.domain, args.subject, args.industry, args.organizer, args.lang, args.title, args.tag, args.open, args.close, args.expire, args.stakeTvl, args.minStake, args.rewardCap, args.rewardTvl, args.claimedReward, args.unclaimedReward, args.rewardFinish, args.minPhrase, args.minValidate, args.rpuValidator, args.minGeneral, args.rpuGeneral, args.minSpecific, args.rpuSpecific, args.minCause, args.rpuCause, args.minEffect, args.rpuEffect, args.majorityQuorum, args.utterances, args.phraseApproved, args.payScale, args.timeLimit, args.finish, args.finishTime, args.architectClaim, args.overrunBuffer, args.bump);
  }
  /**
   * Deserializes the {@link Campaign} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Campaign.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return Campaign.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Campaign} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  Campaign.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find Campaign account at " + address);
          case 5:
            return _context.abrupt("return", Campaign.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  Campaign.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, campaignBeet);
  }
  /**
   * Deserializes the {@link Campaign} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Campaign.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return campaignBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link Campaign} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = Campaign.prototype;
  _proto.serialize = function serialize() {
    return campaignBeet.serialize(_extends({
      accountDiscriminator: campaignDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Campaign}
   */;
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Campaign} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  Campaign.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(Campaign.byteSize, commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link Campaign} data.
   */
  ;
  Campaign.hasCorrectByteSize = function hasCorrectByteSize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return buf.byteLength - offset === Campaign.byteSize;
  }
  /**
   * Returns a readable version of {@link Campaign} properties
   * and can be used to convert to JSON and/or logging
   */;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      architect: this.architect.toBase58(),
      domain: this.domain,
      subject: this.subject,
      industry: this.industry,
      organizer: this.organizer,
      lang: this.lang,
      title: this.title,
      tag: 'Tag.' + exports.Tag[this.tag],
      open: function () {
        var x = _this.open;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      close: function () {
        var x = _this.close;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      expire: function () {
        var x = _this.expire;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      stakeTvl: function () {
        var x = _this.stakeTvl;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      minStake: function () {
        var x = _this.minStake;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rewardCap: function () {
        var x = _this.rewardCap;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rewardTvl: function () {
        var x = _this.rewardTvl;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      claimedReward: function () {
        var x = _this.claimedReward;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      unclaimedReward: function () {
        var x = _this.unclaimedReward;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rewardFinish: function () {
        var x = _this.rewardFinish;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      minPhrase: this.minPhrase,
      minValidate: this.minValidate,
      rpuValidator: function () {
        var x = _this.rpuValidator;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      minGeneral: function () {
        var x = _this.minGeneral;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rpuGeneral: function () {
        var x = _this.rpuGeneral;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      minSpecific: function () {
        var x = _this.minSpecific;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rpuSpecific: function () {
        var x = _this.rpuSpecific;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      minCause: function () {
        var x = _this.minCause;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rpuCause: function () {
        var x = _this.rpuCause;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      minEffect: function () {
        var x = _this.minEffect;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rpuEffect: function () {
        var x = _this.rpuEffect;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      majorityQuorum: this.majorityQuorum,
      utterances: this.utterances,
      phraseApproved: this.phraseApproved,
      payScale: this.payScale,
      timeLimit: function () {
        var x = _this.timeLimit;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      finish: this.finish,
      finishTime: function () {
        var x = _this.finishTime;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      architectClaim: function () {
        var x = _this.architectClaim;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      overrunBuffer: this.overrunBuffer,
      bump: this.bump
    };
  };
  _createClass(Campaign, null, [{
    key: "byteSize",
    get: function get() {
      return campaignBeet.byteSize;
    }
  }]);
  return Campaign;
}();
/**
 * @category Accounts
 * @category generated
 */
var campaignBeet = /*#__PURE__*/new beet.BeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['architect', beetSolana.publicKey], ['domain', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 64)], ['subject', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 64)], ['industry', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 32)], ['organizer', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 16)], ['lang', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 16)], ['title', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 16)], ['tag', tagBeet], ['open', beet.u64], ['close', beet.u64], ['expire', beet.u64], ['stakeTvl', beet.u64], ['minStake', beet.u64], ['rewardCap', beet.u64], ['rewardTvl', beet.u64], ['claimedReward', beet.u64], ['unclaimedReward', beet.u64], ['rewardFinish', beet.u64], ['minPhrase', beet.u16], ['minValidate', beet.u16], ['rpuValidator', beet.u64], ['minGeneral', beet.u64], ['rpuGeneral', beet.u64], ['minSpecific', beet.u64], ['rpuSpecific', beet.u64], ['minCause', beet.u64], ['rpuCause', beet.u64], ['minEffect', beet.u64], ['rpuEffect', beet.u64], ['majorityQuorum', beet.u16], ['utterances', beet.u16], ['phraseApproved', beet.u16], ['payScale', beet.u8], ['timeLimit', beet.u64], ['finish', beet.bool], ['finishTime', beet.u64], ['architectClaim', beet.u64], ['overrunBuffer', beet.u8], ['bump', beet.u8]], Campaign.fromArgs, 'Campaign');

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (AccessMethod) {
  AccessMethod[AccessMethod["NFT"] = 0] = "NFT";
  AccessMethod[AccessMethod["SNS"] = 1] = "SNS";
  AccessMethod[AccessMethod["Free2Play"] = 2] = "Free2Play";
  AccessMethod[AccessMethod["PreStakedNFT"] = 3] = "PreStakedNFT";
  AccessMethod[AccessMethod["Scholar"] = 4] = "Scholar";
})(exports.AccessMethod || (exports.AccessMethod = {}));
/**
 * @category userTypes
 * @category generated
 */
var accessMethodBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.AccessMethod);

var campaignActivityDiscriminator = [202, 201, 143, 59, 254, 148, 87, 12];
/**
 * Holds the data for the {@link CampaignActivity} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var CampaignActivity = /*#__PURE__*/function () {
  function CampaignActivity(user, campaign, kind, stakeMint, stakeAmount, stakeStatus, unclaimedReward, claimedReward, numGeneralPhrases, numSpecificPhrases, numCausePhrases, numEffectPhrase, bump) {
    this.user = user;
    this.campaign = campaign;
    this.kind = kind;
    this.stakeMint = stakeMint;
    this.stakeAmount = stakeAmount;
    this.stakeStatus = stakeStatus;
    this.unclaimedReward = unclaimedReward;
    this.claimedReward = claimedReward;
    this.numGeneralPhrases = numGeneralPhrases;
    this.numSpecificPhrases = numSpecificPhrases;
    this.numCausePhrases = numCausePhrases;
    this.numEffectPhrase = numEffectPhrase;
    this.bump = bump;
  }
  /**
   * Creates a {@link CampaignActivity} instance from the provided args.
   */
  CampaignActivity.fromArgs = function fromArgs(args) {
    return new CampaignActivity(args.user, args.campaign, args.kind, args.stakeMint, args.stakeAmount, args.stakeStatus, args.unclaimedReward, args.claimedReward, args.numGeneralPhrases, args.numSpecificPhrases, args.numCausePhrases, args.numEffectPhrase, args.bump);
  }
  /**
   * Deserializes the {@link CampaignActivity} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  CampaignActivity.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return CampaignActivity.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link CampaignActivity} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  CampaignActivity.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find CampaignActivity account at " + address);
          case 5:
            return _context.abrupt("return", CampaignActivity.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  CampaignActivity.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, campaignActivityBeet);
  }
  /**
   * Deserializes the {@link CampaignActivity} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  CampaignActivity.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return campaignActivityBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link CampaignActivity} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = CampaignActivity.prototype;
  _proto.serialize = function serialize() {
    return campaignActivityBeet.serialize(_extends({
      accountDiscriminator: campaignActivityDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link CampaignActivity}
   */;
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link CampaignActivity} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  CampaignActivity.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(CampaignActivity.byteSize, commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link CampaignActivity} data.
   */
  ;
  CampaignActivity.hasCorrectByteSize = function hasCorrectByteSize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return buf.byteLength - offset === CampaignActivity.byteSize;
  }
  /**
   * Returns a readable version of {@link CampaignActivity} properties
   * and can be used to convert to JSON and/or logging
   */;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      user: this.user.toBase58(),
      campaign: this.campaign.toBase58(),
      kind: 'AccessMethod.' + exports.AccessMethod[this.kind],
      stakeMint: this.stakeMint.toBase58(),
      stakeAmount: function () {
        var x = _this.stakeAmount;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      stakeStatus: this.stakeStatus,
      unclaimedReward: function () {
        var x = _this.unclaimedReward;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      claimedReward: function () {
        var x = _this.claimedReward;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      numGeneralPhrases: function () {
        var x = _this.numGeneralPhrases;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      numSpecificPhrases: function () {
        var x = _this.numSpecificPhrases;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      numCausePhrases: function () {
        var x = _this.numCausePhrases;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      numEffectPhrase: function () {
        var x = _this.numEffectPhrase;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      bump: this.bump
    };
  };
  _createClass(CampaignActivity, null, [{
    key: "byteSize",
    get: function get() {
      return campaignActivityBeet.byteSize;
    }
  }]);
  return CampaignActivity;
}();
/**
 * @category Accounts
 * @category generated
 */
var campaignActivityBeet = /*#__PURE__*/new beet.BeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['user', beetSolana.publicKey], ['campaign', beetSolana.publicKey], ['kind', accessMethodBeet], ['stakeMint', beetSolana.publicKey], ['stakeAmount', beet.u64], ['stakeStatus', beet.bool], ['unclaimedReward', beet.u64], ['claimedReward', beet.u64], ['numGeneralPhrases', beet.u64], ['numSpecificPhrases', beet.u64], ['numCausePhrases', beet.u64], ['numEffectPhrase', beet.u64], ['bump', beet.u8]], CampaignActivity.fromArgs, 'CampaignActivity');

var farmConfigDiscriminator = [238, 176, 220, 164, 239, 135, 11, 78];
/**
 * Holds the data for the {@link FarmConfig} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var FarmConfig = /*#__PURE__*/function () {
  function FarmConfig(mint, nftCreator, stakingContract, nftTvl, snsTvl, claimPeriod, rpcClosePeriod, fundClaimPeriod, platformFee, platformOverrunBuffer, platformVault, burnWallet, platformRewardTires /* size: 4 */, authority, oracle, snsFeed, admin, rpc, campaigns, campaignsTables, penalty, promo, system, padding /* size: 64 */, bump) {
    this.mint = mint;
    this.nftCreator = nftCreator;
    this.stakingContract = stakingContract;
    this.nftTvl = nftTvl;
    this.snsTvl = snsTvl;
    this.claimPeriod = claimPeriod;
    this.rpcClosePeriod = rpcClosePeriod;
    this.fundClaimPeriod = fundClaimPeriod;
    this.platformFee = platformFee;
    this.platformOverrunBuffer = platformOverrunBuffer;
    this.platformVault = platformVault;
    this.burnWallet = burnWallet;
    this.platformRewardTires = platformRewardTires;
    this.authority = authority;
    this.oracle = oracle;
    this.snsFeed = snsFeed;
    this.admin = admin;
    this.rpc = rpc;
    this.campaigns = campaigns;
    this.campaignsTables = campaignsTables;
    this.penalty = penalty;
    this.promo = promo;
    this.system = system;
    this.padding = padding;
    this.bump = bump;
  }
  /**
   * Creates a {@link FarmConfig} instance from the provided args.
   */
  FarmConfig.fromArgs = function fromArgs(args) {
    return new FarmConfig(args.mint, args.nftCreator, args.stakingContract, args.nftTvl, args.snsTvl, args.claimPeriod, args.rpcClosePeriod, args.fundClaimPeriod, args.platformFee, args.platformOverrunBuffer, args.platformVault, args.burnWallet, args.platformRewardTires, args.authority, args.oracle, args.snsFeed, args.admin, args.rpc, args.campaigns, args.campaignsTables, args.penalty, args.promo, args.system, args.padding, args.bump);
  }
  /**
   * Deserializes the {@link FarmConfig} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  FarmConfig.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return FarmConfig.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link FarmConfig} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  FarmConfig.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find FarmConfig account at " + address);
          case 5:
            return _context.abrupt("return", FarmConfig.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  FarmConfig.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, farmConfigBeet);
  }
  /**
   * Deserializes the {@link FarmConfig} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  FarmConfig.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return farmConfigBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link FarmConfig} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = FarmConfig.prototype;
  _proto.serialize = function serialize() {
    return farmConfigBeet.serialize(_extends({
      accountDiscriminator: farmConfigDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link FarmConfig}
   */;
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link FarmConfig} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  FarmConfig.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(FarmConfig.byteSize, commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link FarmConfig} data.
   */
  ;
  FarmConfig.hasCorrectByteSize = function hasCorrectByteSize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return buf.byteLength - offset === FarmConfig.byteSize;
  }
  /**
   * Returns a readable version of {@link FarmConfig} properties
   * and can be used to convert to JSON and/or logging
   */;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      mint: this.mint.toBase58(),
      nftCreator: this.nftCreator.toBase58(),
      stakingContract: this.stakingContract.toBase58(),
      nftTvl: function () {
        var x = _this.nftTvl;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      snsTvl: function () {
        var x = _this.snsTvl;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      claimPeriod: function () {
        var x = _this.claimPeriod;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rpcClosePeriod: function () {
        var x = _this.rpcClosePeriod;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      fundClaimPeriod: function () {
        var x = _this.fundClaimPeriod;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      platformFee: this.platformFee,
      platformOverrunBuffer: this.platformOverrunBuffer,
      platformVault: this.platformVault.toBase58(),
      burnWallet: this.burnWallet.toBase58(),
      platformRewardTires: this.platformRewardTires,
      authority: this.authority.toBase58(),
      oracle: this.oracle.toBase58(),
      snsFeed: this.snsFeed.toBase58(),
      admin: this.admin.toBase58(),
      rpc: this.rpc.toBase58(),
      campaigns: function () {
        var x = _this.campaigns;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      campaignsTables: this.campaignsTables.toBase58(),
      penalty: function () {
        var x = _this.penalty;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      promo: this.promo,
      system: this.system,
      padding: this.padding,
      bump: this.bump
    };
  };
  _createClass(FarmConfig, null, [{
    key: "byteSize",
    get: function get() {
      return farmConfigBeet.byteSize;
    }
  }]);
  return FarmConfig;
}();
/**
 * @category Accounts
 * @category generated
 */
var farmConfigBeet = /*#__PURE__*/new beet.BeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['mint', beetSolana.publicKey], ['nftCreator', beetSolana.publicKey], ['stakingContract', beetSolana.publicKey], ['nftTvl', beet.u64], ['snsTvl', beet.u64], ['claimPeriod', beet.u64], ['rpcClosePeriod', beet.u64], ['fundClaimPeriod', beet.u64], ['platformFee', beet.u8], ['platformOverrunBuffer', beet.u8], ['platformVault', beetSolana.publicKey], ['burnWallet', beetSolana.publicKey], ['platformRewardTires', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 4)], ['authority', beetSolana.publicKey], ['oracle', beetSolana.publicKey], ['snsFeed', beetSolana.publicKey], ['admin', beetSolana.publicKey], ['rpc', beetSolana.publicKey], ['campaigns', beet.u64], ['campaignsTables', beetSolana.publicKey], ['penalty', beet.u64], ['promo', beet.u8], ['system', beet.u8], ['padding', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 64)], ['bump', beet.u8]], FarmConfig.fromArgs, 'FarmConfig');

var feedDiscriminator = [69, 191, 16, 227, 132, 187, 84, 227];
/**
 * Holds the data for the {@link Feed} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var Feed = /*#__PURE__*/function () {
  function Feed(name, authority, aggregator, price, lastUpdate, padding /* size: 64 */, bump) {
    this.name = name;
    this.authority = authority;
    this.aggregator = aggregator;
    this.price = price;
    this.lastUpdate = lastUpdate;
    this.padding = padding;
    this.bump = bump;
  }
  /**
   * Creates a {@link Feed} instance from the provided args.
   */
  Feed.fromArgs = function fromArgs(args) {
    return new Feed(args.name, args.authority, args.aggregator, args.price, args.lastUpdate, args.padding, args.bump);
  }
  /**
   * Deserializes the {@link Feed} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Feed.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return Feed.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Feed} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  Feed.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find Feed account at " + address);
          case 5:
            return _context.abrupt("return", Feed.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  Feed.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, feedBeet);
  }
  /**
   * Deserializes the {@link Feed} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Feed.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return feedBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link Feed} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = Feed.prototype;
  _proto.serialize = function serialize() {
    return feedBeet.serialize(_extends({
      accountDiscriminator: feedDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Feed} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */;
  Feed.byteSize = function byteSize(args) {
    var instance = Feed.fromArgs(args);
    return feedBeet.toFixedFromValue(_extends({
      accountDiscriminator: feedDiscriminator
    }, instance)).byteSize;
  }
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Feed} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */;
  Feed.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args, connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(Feed.byteSize(args), commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5, _x6) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Returns a readable version of {@link Feed} properties
   * and can be used to convert to JSON and/or logging
   */
  ;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      name: this.name,
      authority: this.authority.toBase58(),
      aggregator: this.aggregator.toBase58(),
      price: function () {
        var x = _this.price;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      lastUpdate: function () {
        var x = _this.lastUpdate;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      padding: this.padding,
      bump: this.bump
    };
  };
  return Feed;
}();
/**
 * @category Accounts
 * @category generated
 */
var feedBeet = /*#__PURE__*/new beet.FixableBeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['name', beet.utf8String], ['authority', beetSolana.publicKey], ['aggregator', beetSolana.publicKey], ['price', beet.u64], ['lastUpdate', beet.u64], ['padding', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 64)], ['bump', beet.u8]], Feed.fromArgs, 'Feed');

var guildDiscriminator = [74, 176, 57, 164, 195, 188, 156, 237];
/**
 * Holds the data for the {@link Guild} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var Guild = /*#__PURE__*/function () {
  function Guild(title /* size: 32 */, nftTable, scholarTable, owner, ownerShare, master, masterShare, scholarSlot, nftSlot, status) {
    this.title = title;
    this.nftTable = nftTable;
    this.scholarTable = scholarTable;
    this.owner = owner;
    this.ownerShare = ownerShare;
    this.master = master;
    this.masterShare = masterShare;
    this.scholarSlot = scholarSlot;
    this.nftSlot = nftSlot;
    this.status = status;
  }
  /**
   * Creates a {@link Guild} instance from the provided args.
   */
  Guild.fromArgs = function fromArgs(args) {
    return new Guild(args.title, args.nftTable, args.scholarTable, args.owner, args.ownerShare, args.master, args.masterShare, args.scholarSlot, args.nftSlot, args.status);
  }
  /**
   * Deserializes the {@link Guild} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Guild.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return Guild.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Guild} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  Guild.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find Guild account at " + address);
          case 5:
            return _context.abrupt("return", Guild.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  Guild.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, guildBeet);
  }
  /**
   * Deserializes the {@link Guild} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Guild.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return guildBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link Guild} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = Guild.prototype;
  _proto.serialize = function serialize() {
    return guildBeet.serialize(_extends({
      accountDiscriminator: guildDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Guild} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */;
  Guild.byteSize = function byteSize(args) {
    var instance = Guild.fromArgs(args);
    return guildBeet.toFixedFromValue(_extends({
      accountDiscriminator: guildDiscriminator
    }, instance)).byteSize;
  }
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Guild} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */;
  Guild.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args, connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(Guild.byteSize(args), commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5, _x6) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Returns a readable version of {@link Guild} properties
   * and can be used to convert to JSON and/or logging
   */
  ;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      title: this.title,
      nftTable: this.nftTable.toBase58(),
      scholarTable: this.scholarTable.toBase58(),
      owner: this.owner.toBase58(),
      ownerShare: this.ownerShare,
      master: this.master,
      masterShare: this.masterShare,
      scholarSlot: function () {
        var x = _this.scholarSlot;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      nftSlot: function () {
        var x = _this.nftSlot;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      status: this.status
    };
  };
  return Guild;
}();
/**
 * @category Accounts
 * @category generated
 */
var guildBeet = /*#__PURE__*/new beet.FixableBeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['title', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 32)], ['nftTable', beetSolana.publicKey], ['scholarTable', beetSolana.publicKey], ['owner', beetSolana.publicKey], ['ownerShare', beet.u8], ['master', /*#__PURE__*/beet.coption(beetSolana.publicKey)], ['masterShare', /*#__PURE__*/beet.coption(beet.u8)], ['scholarSlot', beet.u64], ['nftSlot', beet.u64], ['status', beet.bool]], Guild.fromArgs, 'Guild');

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (PhraseType) {
  PhraseType[PhraseType["General"] = 0] = "General";
  PhraseType[PhraseType["Specific"] = 1] = "Specific";
  PhraseType[PhraseType["Cause"] = 2] = "Cause";
  PhraseType[PhraseType["Effect"] = 3] = "Effect";
})(exports.PhraseType || (exports.PhraseType = {}));
/**
 * @category userTypes
 * @category generated
 */
var phraseTypeBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.PhraseType);

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (Offchain) {
  Offchain[Offchain["Synesis"] = 0] = "Synesis";
  Offchain[Offchain["IPFS"] = 1] = "IPFS";
  Offchain[Offchain["Arweave"] = 2] = "Arweave";
  Offchain[Offchain["S3"] = 3] = "S3";
})(exports.Offchain || (exports.Offchain = {}));
/**
 * @category userTypes
 * @category generated
 */
var offchainBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.Offchain);

var phraseDiscriminator = [229, 151, 148, 17, 77, 215, 48, 169];
/**
 * Holds the data for the {@link Phrase} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var Phrase = /*#__PURE__*/function () {
  function Phrase(campaign, builder, rentOwner, kind, timestamp, head, lastIndex, offchainUri /* size: 64 */, offchainType, correct, incorrect, isValid, finish, bump) {
    this.campaign = campaign;
    this.builder = builder;
    this.rentOwner = rentOwner;
    this.kind = kind;
    this.timestamp = timestamp;
    this.head = head;
    this.lastIndex = lastIndex;
    this.offchainUri = offchainUri;
    this.offchainType = offchainType;
    this.correct = correct;
    this.incorrect = incorrect;
    this.isValid = isValid;
    this.finish = finish;
    this.bump = bump;
  }
  /**
   * Creates a {@link Phrase} instance from the provided args.
   */
  Phrase.fromArgs = function fromArgs(args) {
    return new Phrase(args.campaign, args.builder, args.rentOwner, args.kind, args.timestamp, args.head, args.lastIndex, args.offchainUri, args.offchainType, args.correct, args.incorrect, args.isValid, args.finish, args.bump);
  }
  /**
   * Deserializes the {@link Phrase} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Phrase.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return Phrase.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Phrase} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  Phrase.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find Phrase account at " + address);
          case 5:
            return _context.abrupt("return", Phrase.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  Phrase.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, phraseBeet);
  }
  /**
   * Deserializes the {@link Phrase} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Phrase.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return phraseBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link Phrase} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = Phrase.prototype;
  _proto.serialize = function serialize() {
    return phraseBeet.serialize(_extends({
      accountDiscriminator: phraseDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Phrase}
   */;
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Phrase} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  Phrase.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(Phrase.byteSize, commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link Phrase} data.
   */
  ;
  Phrase.hasCorrectByteSize = function hasCorrectByteSize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return buf.byteLength - offset === Phrase.byteSize;
  }
  /**
   * Returns a readable version of {@link Phrase} properties
   * and can be used to convert to JSON and/or logging
   */;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      campaign: this.campaign.toBase58(),
      builder: this.builder.toBase58(),
      rentOwner: this.rentOwner.toBase58(),
      kind: 'PhraseType.' + exports.PhraseType[this.kind],
      timestamp: function () {
        var x = _this.timestamp;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      head: this.head,
      lastIndex: this.lastIndex,
      offchainUri: this.offchainUri,
      offchainType: 'Offchain.' + exports.Offchain[this.offchainType],
      correct: this.correct,
      incorrect: this.incorrect,
      isValid: this.isValid,
      finish: this.finish,
      bump: this.bump
    };
  };
  _createClass(Phrase, null, [{
    key: "byteSize",
    get: function get() {
      return phraseBeet.byteSize;
    }
  }]);
  return Phrase;
}();
/**
 * @category Accounts
 * @category generated
 */
var phraseBeet = /*#__PURE__*/new beet.BeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaign', beetSolana.publicKey], ['builder', beetSolana.publicKey], ['rentOwner', beetSolana.publicKey], ['kind', phraseTypeBeet], ['timestamp', beet.u64], ['head', beet.u16], ['lastIndex', beet.u16], ['offchainUri', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 64)], ['offchainType', offchainBeet], ['correct', beet.u16], ['incorrect', beet.u16], ['isValid', beet.bool], ['finish', beet.bool], ['bump', beet.u8]], Phrase.fromArgs, 'Phrase');

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (Role) {
  Role[Role["User"] = 0] = "User";
  Role[Role["Architect"] = 1] = "Architect";
  Role[Role["Builder"] = 2] = "Builder";
  Role[Role["Validator"] = 3] = "Validator";
})(exports.Role || (exports.Role = {}));
/**
 * @category userTypes
 * @category generated
 */
var roleBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.Role);

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (Tier) {
  Tier[Tier["Tier1"] = 0] = "Tier1";
  Tier[Tier["Tier2"] = 1] = "Tier2";
  Tier[Tier["Tier3"] = 2] = "Tier3";
  Tier[Tier["Tier4"] = 3] = "Tier4";
})(exports.Tier || (exports.Tier = {}));
/**
 * @category userTypes
 * @category generated
 */
var tierBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.Tier);

var profileDiscriminator = [184, 101, 165, 188, 95, 63, 127, 188];
/**
 * Holds the data for the {@link Profile} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var Profile = /*#__PURE__*/function () {
  function Profile(user, social, kind, nftStaked, nftMint, scholarAccess, scholarSign, scholarActivate, scholarSelfStake, nftOwner, nftOwnerShare, nftGuild, nftGuildMaster, nftGuildShare, role, durability, productivity, performance, tier, activity, reject, accept, rewardF2p, offchainPermit, offchainSigner, bump) {
    this.user = user;
    this.social = social;
    this.kind = kind;
    this.nftStaked = nftStaked;
    this.nftMint = nftMint;
    this.scholarAccess = scholarAccess;
    this.scholarSign = scholarSign;
    this.scholarActivate = scholarActivate;
    this.scholarSelfStake = scholarSelfStake;
    this.nftOwner = nftOwner;
    this.nftOwnerShare = nftOwnerShare;
    this.nftGuild = nftGuild;
    this.nftGuildMaster = nftGuildMaster;
    this.nftGuildShare = nftGuildShare;
    this.role = role;
    this.durability = durability;
    this.productivity = productivity;
    this.performance = performance;
    this.tier = tier;
    this.activity = activity;
    this.reject = reject;
    this.accept = accept;
    this.rewardF2p = rewardF2p;
    this.offchainPermit = offchainPermit;
    this.offchainSigner = offchainSigner;
    this.bump = bump;
  }
  /**
   * Creates a {@link Profile} instance from the provided args.
   */
  Profile.fromArgs = function fromArgs(args) {
    return new Profile(args.user, args.social, args.kind, args.nftStaked, args.nftMint, args.scholarAccess, args.scholarSign, args.scholarActivate, args.scholarSelfStake, args.nftOwner, args.nftOwnerShare, args.nftGuild, args.nftGuildMaster, args.nftGuildShare, args.role, args.durability, args.productivity, args.performance, args.tier, args.activity, args.reject, args.accept, args.rewardF2p, args.offchainPermit, args.offchainSigner, args.bump);
  }
  /**
   * Deserializes the {@link Profile} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Profile.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return Profile.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Profile} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  Profile.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find Profile account at " + address);
          case 5:
            return _context.abrupt("return", Profile.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  Profile.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, profileBeet);
  }
  /**
   * Deserializes the {@link Profile} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Profile.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return profileBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link Profile} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = Profile.prototype;
  _proto.serialize = function serialize() {
    return profileBeet.serialize(_extends({
      accountDiscriminator: profileDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Profile} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */;
  Profile.byteSize = function byteSize(args) {
    var instance = Profile.fromArgs(args);
    return profileBeet.toFixedFromValue(_extends({
      accountDiscriminator: profileDiscriminator
    }, instance)).byteSize;
  }
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Profile} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */;
  Profile.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args, connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(Profile.byteSize(args), commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5, _x6) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Returns a readable version of {@link Profile} properties
   * and can be used to convert to JSON and/or logging
   */
  ;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      user: this.user.toBase58(),
      social: this.social.toBase58(),
      kind: 'AccessMethod.' + exports.AccessMethod[this.kind],
      nftStaked: this.nftStaked,
      nftMint: this.nftMint.toBase58(),
      scholarAccess: this.scholarAccess,
      scholarSign: this.scholarSign,
      scholarActivate: function () {
        var x = _this.scholarActivate;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      scholarSelfStake: this.scholarSelfStake,
      nftOwner: this.nftOwner.toBase58(),
      nftOwnerShare: this.nftOwnerShare,
      nftGuild: this.nftGuild.toBase58(),
      nftGuildMaster: this.nftGuildMaster,
      nftGuildShare: this.nftGuildShare,
      role: 'Role.' + exports.Role[this.role],
      durability: this.durability,
      productivity: this.productivity,
      performance: this.performance,
      tier: 'Tier.' + exports.Tier[this.tier],
      activity: this.activity,
      reject: this.reject,
      accept: this.accept,
      rewardF2p: function () {
        var x = _this.rewardF2p;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      offchainPermit: this.offchainPermit,
      offchainSigner: this.offchainSigner.toBase58(),
      bump: this.bump
    };
  };
  return Profile;
}();
/**
 * @category Accounts
 * @category generated
 */
var profileBeet = /*#__PURE__*/new beet.FixableBeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['user', beetSolana.publicKey], ['social', beetSolana.publicKey], ['kind', accessMethodBeet], ['nftStaked', beet.bool], ['nftMint', beetSolana.publicKey], ['scholarAccess', beet.bool], ['scholarSign', beet.bool], ['scholarActivate', beet.u64], ['scholarSelfStake', beet.bool], ['nftOwner', beetSolana.publicKey], ['nftOwnerShare', beet.u8], ['nftGuild', beetSolana.publicKey], ['nftGuildMaster', /*#__PURE__*/beet.coption(beetSolana.publicKey)], ['nftGuildShare', /*#__PURE__*/beet.coption(beet.u8)], ['role', roleBeet], ['durability', beet.u8], ['productivity', beet.u8], ['performance', beet.u8], ['tier', tierBeet], ['activity', beet.u32], ['reject', beet.u32], ['accept', beet.u32], ['rewardF2p', beet.u64], ['offchainPermit', beet.bool], ['offchainSigner', beetSolana.publicKey], ['bump', beet.u8]], Profile.fromArgs, 'Profile');

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (StakingType) {
  StakingType[StakingType["SNS"] = 0] = "SNS";
  StakingType[StakingType["NFT"] = 1] = "NFT";
  StakingType[StakingType["Both"] = 2] = "Both";
})(exports.StakingType || (exports.StakingType = {}));
/**
 * @category userTypes
 * @category generated
 */
var stakingTypeBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.StakingType);

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (StakeAccountType) {
  StakeAccountType[StakeAccountType["POOL"] = 0] = "POOL";
  StakeAccountType[StakeAccountType["DAPP"] = 1] = "DAPP";
  StakeAccountType[StakeAccountType["NotDefined"] = 2] = "NotDefined";
})(exports.StakeAccountType || (exports.StakeAccountType = {}));
/**
 * @category userTypes
 * @category generated
 */
var stakeAccountTypeBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.StakeAccountType);

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
(function (StakeAccountRole) {
  StakeAccountRole[StakeAccountRole["User"] = 0] = "User";
  StakeAccountRole[StakeAccountRole["Architect"] = 1] = "Architect";
  StakeAccountRole[StakeAccountRole["Builder"] = 2] = "Builder";
  StakeAccountRole[StakeAccountRole["Validator"] = 3] = "Validator";
})(exports.StakeAccountRole || (exports.StakeAccountRole = {}));
/**
 * @category userTypes
 * @category generated
 */
var stakeAccountRoleBeet = /*#__PURE__*/beet.fixedScalarEnum(exports.StakeAccountRole);

var stakeAccountDiscriminator = [80, 158, 67, 124, 50, 189, 192, 255];
/**
 * Holds the data for the {@link StakeAccount} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var StakeAccount = /*#__PURE__*/function () {
  function StakeAccount(dapp, stakeType, accountType, token, user, userRole, delegateCampaign, tokenAmount, lockInTime, lastRewardClaim, lockOutTime, pendingReward, reward, cliffReward, unlockReward, rewarded, dyfUser, status, reserve) {
    this.dapp = dapp;
    this.stakeType = stakeType;
    this.accountType = accountType;
    this.token = token;
    this.user = user;
    this.userRole = userRole;
    this.delegateCampaign = delegateCampaign;
    this.tokenAmount = tokenAmount;
    this.lockInTime = lockInTime;
    this.lastRewardClaim = lastRewardClaim;
    this.lockOutTime = lockOutTime;
    this.pendingReward = pendingReward;
    this.reward = reward;
    this.cliffReward = cliffReward;
    this.unlockReward = unlockReward;
    this.rewarded = rewarded;
    this.dyfUser = dyfUser;
    this.status = status;
    this.reserve = reserve;
  }
  /**
   * Creates a {@link StakeAccount} instance from the provided args.
   */
  StakeAccount.fromArgs = function fromArgs(args) {
    return new StakeAccount(args.dapp, args.stakeType, args.accountType, args.token, args.user, args.userRole, args.delegateCampaign, args.tokenAmount, args.lockInTime, args.lastRewardClaim, args.lockOutTime, args.pendingReward, args.reward, args.cliffReward, args.unlockReward, args.rewarded, args.dyfUser, args.status, args.reserve);
  }
  /**
   * Deserializes the {@link StakeAccount} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  StakeAccount.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return StakeAccount.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link StakeAccount} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  StakeAccount.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find StakeAccount account at " + address);
          case 5:
            return _context.abrupt("return", StakeAccount.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  StakeAccount.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, stakeAccountBeet);
  }
  /**
   * Deserializes the {@link StakeAccount} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  StakeAccount.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return stakeAccountBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link StakeAccount} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = StakeAccount.prototype;
  _proto.serialize = function serialize() {
    return stakeAccountBeet.serialize(_extends({
      accountDiscriminator: stakeAccountDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link StakeAccount} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */;
  StakeAccount.byteSize = function byteSize(args) {
    var instance = StakeAccount.fromArgs(args);
    return stakeAccountBeet.toFixedFromValue(_extends({
      accountDiscriminator: stakeAccountDiscriminator
    }, instance)).byteSize;
  }
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link StakeAccount} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */;
  StakeAccount.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args, connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(StakeAccount.byteSize(args), commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5, _x6) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Returns a readable version of {@link StakeAccount} properties
   * and can be used to convert to JSON and/or logging
   */
  ;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      dapp: this.dapp.toBase58(),
      stakeType: 'StakingType.' + exports.StakingType[this.stakeType],
      accountType: 'StakeAccountType.' + exports.StakeAccountType[this.accountType],
      token: this.token.toBase58(),
      user: this.user.toBase58(),
      userRole: 'StakeAccountRole.' + exports.StakeAccountRole[this.userRole],
      delegateCampaign: this.delegateCampaign,
      tokenAmount: function () {
        var x = _this.tokenAmount;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      lockInTime: function () {
        var x = _this.lockInTime;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      lastRewardClaim: function () {
        var x = _this.lastRewardClaim;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      lockOutTime: function () {
        var x = _this.lockOutTime;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      pendingReward: function () {
        var x = _this.pendingReward;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      reward: function () {
        var x = _this.reward;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      cliffReward: function () {
        var x = _this.cliffReward;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      unlockReward: function () {
        var x = _this.unlockReward;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      rewarded: this.rewarded,
      dyfUser: this.dyfUser,
      status: this.status,
      reserve: function () {
        var x = _this.reserve;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }()
    };
  };
  return StakeAccount;
}();
/**
 * @category Accounts
 * @category generated
 */
var stakeAccountBeet = /*#__PURE__*/new beet.FixableBeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['dapp', beetSolana.publicKey], ['stakeType', stakingTypeBeet], ['accountType', stakeAccountTypeBeet], ['token', beetSolana.publicKey], ['user', beetSolana.publicKey], ['userRole', stakeAccountRoleBeet], ['delegateCampaign', /*#__PURE__*/beet.coption(beetSolana.publicKey)], ['tokenAmount', beet.u64], ['lockInTime', beet.i64], ['lastRewardClaim', beet.i64], ['lockOutTime', beet.i64], ['pendingReward', beet.u64], ['reward', beet.u64], ['cliffReward', beet.u64], ['unlockReward', beet.u64], ['rewarded', beet.bool], ['dyfUser', beet.bool], ['status', beet.bool], ['reserve', beet.u64]], StakeAccount.fromArgs, 'StakeAccount');

var validateDiscriminator = [58, 47, 243, 207, 154, 37, 77, 242];
/**
 * Holds the data for the {@link Validate} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var Validate = /*#__PURE__*/function () {
  function Validate(phrase, address, rentOwner, index, time, vote, confident, bump) {
    this.phrase = phrase;
    this.address = address;
    this.rentOwner = rentOwner;
    this.index = index;
    this.time = time;
    this.vote = vote;
    this.confident = confident;
    this.bump = bump;
  }
  /**
   * Creates a {@link Validate} instance from the provided args.
   */
  Validate.fromArgs = function fromArgs(args) {
    return new Validate(args.phrase, args.address, args.rentOwner, args.index, args.time, args.vote, args.confident, args.bump);
  }
  /**
   * Deserializes the {@link Validate} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Validate.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return Validate.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Validate} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  Validate.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find Validate account at " + address);
          case 5:
            return _context.abrupt("return", Validate.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  Validate.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, validateBeet);
  }
  /**
   * Deserializes the {@link Validate} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Validate.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return validateBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link Validate} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = Validate.prototype;
  _proto.serialize = function serialize() {
    return validateBeet.serialize(_extends({
      accountDiscriminator: validateDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Validate}
   */;
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Validate} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  Validate.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(Validate.byteSize, commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link Validate} data.
   */
  ;
  Validate.hasCorrectByteSize = function hasCorrectByteSize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return buf.byteLength - offset === Validate.byteSize;
  }
  /**
   * Returns a readable version of {@link Validate} properties
   * and can be used to convert to JSON and/or logging
   */;
  _proto.pretty = function pretty() {
    var _this = this;
    return {
      phrase: this.phrase.toBase58(),
      address: this.address.toBase58(),
      rentOwner: this.rentOwner.toBase58(),
      index: this.index,
      time: function () {
        var x = _this.time;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      }(),
      vote: this.vote,
      confident: this.confident,
      bump: this.bump
    };
  };
  _createClass(Validate, null, [{
    key: "byteSize",
    get: function get() {
      return validateBeet.byteSize;
    }
  }]);
  return Validate;
}();
/**
 * @category Accounts
 * @category generated
 */
var validateBeet = /*#__PURE__*/new beet.BeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['phrase', beetSolana.publicKey], ['address', beetSolana.publicKey], ['rentOwner', beetSolana.publicKey], ['index', beet.u16], ['time', beet.u64], ['vote', beet.bool], ['confident', beet.u8], ['bump', beet.u8]], Validate.fromArgs, 'Validate');

var validatorsDiscriminator = [249, 251, 155, 170, 211, 203, 178, 186];
/**
 * Holds the data for the {@link Validators} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
var Validators = /*#__PURE__*/function () {
  function Validators(phrase, list) {
    this.phrase = phrase;
    this.list = list;
  }
  /**
   * Creates a {@link Validators} instance from the provided args.
   */
  Validators.fromArgs = function fromArgs(args) {
    return new Validators(args.phrase, args.list);
  }
  /**
   * Deserializes the {@link Validators} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Validators.fromAccountInfo = function fromAccountInfo(accountInfo, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return Validators.deserialize(accountInfo.data, offset);
  }
  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Validators} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */;
  Validators.fromAccountAddress =
  /*#__PURE__*/
  function () {
    var _fromAccountAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(connection, address, commitmentOrConfig) {
      var accountInfo;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.getAccountInfo(address, commitmentOrConfig);
          case 2:
            accountInfo = _context.sent;
            if (!(accountInfo == null)) {
              _context.next = 5;
              break;
            }
            throw new Error("Unable to find Validators account at " + address);
          case 5:
            return _context.abrupt("return", Validators.fromAccountInfo(accountInfo, 0)[0]);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function fromAccountAddress(_x, _x2, _x3) {
      return _fromAccountAddress.apply(this, arguments);
    }
    return fromAccountAddress;
  }()
  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  ;
  Validators.gpaBuilder = function gpaBuilder(programId) {
    if (programId === void 0) {
      programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
    }
    return beetSolana.GpaBuilder.fromStruct(programId, validatorsBeet);
  }
  /**
   * Deserializes the {@link Validators} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */;
  Validators.deserialize = function deserialize(buf, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return validatorsBeet.deserialize(buf, offset);
  }
  /**
   * Serializes the {@link Validators} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */;
  var _proto = Validators.prototype;
  _proto.serialize = function serialize() {
    return validatorsBeet.serialize(_extends({
      accountDiscriminator: validatorsDiscriminator
    }, this));
  }
  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Validators} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */;
  Validators.byteSize = function byteSize(args) {
    var instance = Validators.fromArgs(args);
    return validatorsBeet.toFixedFromValue(_extends({
      accountDiscriminator: validatorsDiscriminator
    }, instance)).byteSize;
  }
  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Validators} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */;
  Validators.getMinimumBalanceForRentExemption =
  /*#__PURE__*/
  function () {
    var _getMinimumBalanceForRentExemption = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args, connection, commitment) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", connection.getMinimumBalanceForRentExemption(Validators.byteSize(args), commitment));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getMinimumBalanceForRentExemption(_x4, _x5, _x6) {
      return _getMinimumBalanceForRentExemption.apply(this, arguments);
    }
    return getMinimumBalanceForRentExemption;
  }()
  /**
   * Returns a readable version of {@link Validators} properties
   * and can be used to convert to JSON and/or logging
   */
  ;
  _proto.pretty = function pretty() {
    return {
      phrase: this.phrase.toBase58(),
      list: this.list
    };
  };
  return Validators;
}();
/**
 * @category Accounts
 * @category generated
 */
var validatorsBeet = /*#__PURE__*/new beet.FixableBeetStruct([['accountDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['phrase', beetSolana.publicKey], ['list', /*#__PURE__*/beet.array(beetSolana.publicKey)]], Validators.fromArgs, 'Validators');

var accountProviders = {
  FarmConfig: FarmConfig,
  Guild: Guild,
  Profile: Profile,
  CampaignActivity: CampaignActivity,
  Campaign: Campaign,
  Phrase: Phrase,
  Validate: Validate,
  Validators: Validators,
  Feed: Feed,
  StakeAccount: StakeAccount
};

/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
var createErrorFromCodeLookup = /*#__PURE__*/new Map();
var createErrorFromNameLookup = /*#__PURE__*/new Map();
/**
 * InvalidPDA: 'PDA Seed mismatch'
 *
 * @category Errors
 * @category generated
 */
var InvalidPDAError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InvalidPDAError, _Error);
  function InvalidPDAError() {
    var _this;
    _this = _Error.call(this, 'PDA Seed mismatch') || this;
    _this.code = 0x1770;
    _this.name = 'InvalidPDA';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this), InvalidPDAError);
    }
    return _this;
  }
  return InvalidPDAError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1770, function () {
  return new InvalidPDAError();
});
createErrorFromNameLookup.set('InvalidPDA', function () {
  return new InvalidPDAError();
});
/**
 * InvalidStakeAccount: 'Invalid Stake Account Type'
 *
 * @category Errors
 * @category generated
 */
var InvalidStakeAccountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InvalidStakeAccountError, _Error2);
  function InvalidStakeAccountError() {
    var _this2;
    _this2 = _Error2.call(this, 'Invalid Stake Account Type') || this;
    _this2.code = 0x1771;
    _this2.name = 'InvalidStakeAccount';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this2), InvalidStakeAccountError);
    }
    return _this2;
  }
  return InvalidStakeAccountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1771, function () {
  return new InvalidStakeAccountError();
});
createErrorFromNameLookup.set('InvalidStakeAccount', function () {
  return new InvalidStakeAccountError();
});
/**
 * InvalidStakeType: 'Invalid Stake Type'
 *
 * @category Errors
 * @category generated
 */
var InvalidStakeTypeError = /*#__PURE__*/function (_Error3) {
  _inheritsLoose(InvalidStakeTypeError, _Error3);
  function InvalidStakeTypeError() {
    var _this3;
    _this3 = _Error3.call(this, 'Invalid Stake Type') || this;
    _this3.code = 0x1772;
    _this3.name = 'InvalidStakeType';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this3), InvalidStakeTypeError);
    }
    return _this3;
  }
  return InvalidStakeTypeError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1772, function () {
  return new InvalidStakeTypeError();
});
createErrorFromNameLookup.set('InvalidStakeType', function () {
  return new InvalidStakeTypeError();
});
/**
 * InvalidStakeStatus: 'Invalid Stake Status'
 *
 * @category Errors
 * @category generated
 */
var InvalidStakeStatusError = /*#__PURE__*/function (_Error4) {
  _inheritsLoose(InvalidStakeStatusError, _Error4);
  function InvalidStakeStatusError() {
    var _this4;
    _this4 = _Error4.call(this, 'Invalid Stake Status') || this;
    _this4.code = 0x1773;
    _this4.name = 'InvalidStakeStatus';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this4), InvalidStakeStatusError);
    }
    return _this4;
  }
  return InvalidStakeStatusError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1773, function () {
  return new InvalidStakeStatusError();
});
createErrorFromNameLookup.set('InvalidStakeStatus', function () {
  return new InvalidStakeStatusError();
});
/**
 * InvalidStakeDelegate: 'Stake Account not belong to this campaign'
 *
 * @category Errors
 * @category generated
 */
var InvalidStakeDelegateError = /*#__PURE__*/function (_Error5) {
  _inheritsLoose(InvalidStakeDelegateError, _Error5);
  function InvalidStakeDelegateError() {
    var _this5;
    _this5 = _Error5.call(this, 'Stake Account not belong to this campaign') || this;
    _this5.code = 0x1774;
    _this5.name = 'InvalidStakeDelegate';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this5), InvalidStakeDelegateError);
    }
    return _this5;
  }
  return InvalidStakeDelegateError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1774, function () {
  return new InvalidStakeDelegateError();
});
createErrorFromNameLookup.set('InvalidStakeDelegate', function () {
  return new InvalidStakeDelegateError();
});
/**
 * InvalidTokenMint: 'Invalid Token Mint'
 *
 * @category Errors
 * @category generated
 */
var InvalidTokenMintError = /*#__PURE__*/function (_Error6) {
  _inheritsLoose(InvalidTokenMintError, _Error6);
  function InvalidTokenMintError() {
    var _this6;
    _this6 = _Error6.call(this, 'Invalid Token Mint') || this;
    _this6.code = 0x1775;
    _this6.name = 'InvalidTokenMint';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this6), InvalidTokenMintError);
    }
    return _this6;
  }
  return InvalidTokenMintError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1775, function () {
  return new InvalidTokenMintError();
});
createErrorFromNameLookup.set('InvalidTokenMint', function () {
  return new InvalidTokenMintError();
});
/**
 * InvalidTokenOwner: 'Passed token account is not owned by signer'
 *
 * @category Errors
 * @category generated
 */
var InvalidTokenOwnerError = /*#__PURE__*/function (_Error7) {
  _inheritsLoose(InvalidTokenOwnerError, _Error7);
  function InvalidTokenOwnerError() {
    var _this7;
    _this7 = _Error7.call(this, 'Passed token account is not owned by signer') || this;
    _this7.code = 0x1776;
    _this7.name = 'InvalidTokenOwner';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this7), InvalidTokenOwnerError);
    }
    return _this7;
  }
  return InvalidTokenOwnerError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1776, function () {
  return new InvalidTokenOwnerError();
});
createErrorFromNameLookup.set('InvalidTokenOwner', function () {
  return new InvalidTokenOwnerError();
});
/**
 * DoubleVoteDetect: 'Insufficient Token Balance'
 *
 * @category Errors
 * @category generated
 */
var DoubleVoteDetectError = /*#__PURE__*/function (_Error8) {
  _inheritsLoose(DoubleVoteDetectError, _Error8);
  function DoubleVoteDetectError() {
    var _this8;
    _this8 = _Error8.call(this, 'Insufficient Token Balance') || this;
    _this8.code = 0x1777;
    _this8.name = 'DoubleVoteDetect';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this8), DoubleVoteDetectError);
    }
    return _this8;
  }
  return DoubleVoteDetectError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1777, function () {
  return new DoubleVoteDetectError();
});
createErrorFromNameLookup.set('DoubleVoteDetect', function () {
  return new DoubleVoteDetectError();
});
/**
 * InsufficientTokenBalance: 'User tried to vote on utterance'
 *
 * @category Errors
 * @category generated
 */
var InsufficientTokenBalanceError = /*#__PURE__*/function (_Error9) {
  _inheritsLoose(InsufficientTokenBalanceError, _Error9);
  function InsufficientTokenBalanceError() {
    var _this9;
    _this9 = _Error9.call(this, 'User tried to vote on utterance') || this;
    _this9.code = 0x1778;
    _this9.name = 'InsufficientTokenBalance';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this9), InsufficientTokenBalanceError);
    }
    return _this9;
  }
  return InsufficientTokenBalanceError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1778, function () {
  return new InsufficientTokenBalanceError();
});
createErrorFromNameLookup.set('InsufficientTokenBalance', function () {
  return new InsufficientTokenBalanceError();
});
/**
 * RewardBalanceIsZero: 'There is no reward to claim'
 *
 * @category Errors
 * @category generated
 */
var RewardBalanceIsZeroError = /*#__PURE__*/function (_Error10) {
  _inheritsLoose(RewardBalanceIsZeroError, _Error10);
  function RewardBalanceIsZeroError() {
    var _this10;
    _this10 = _Error10.call(this, 'There is no reward to claim') || this;
    _this10.code = 0x1779;
    _this10.name = 'RewardBalanceIsZero';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this10), RewardBalanceIsZeroError);
    }
    return _this10;
  }
  return RewardBalanceIsZeroError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1779, function () {
  return new RewardBalanceIsZeroError();
});
createErrorFromNameLookup.set('RewardBalanceIsZero', function () {
  return new RewardBalanceIsZeroError();
});
/**
 * PhraseValidatedAlready: 'Phrase validation is finished'
 *
 * @category Errors
 * @category generated
 */
var PhraseValidatedAlreadyError = /*#__PURE__*/function (_Error11) {
  _inheritsLoose(PhraseValidatedAlreadyError, _Error11);
  function PhraseValidatedAlreadyError() {
    var _this11;
    _this11 = _Error11.call(this, 'Phrase validation is finished') || this;
    _this11.code = 0x177a;
    _this11.name = 'PhraseValidatedAlready';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this11), PhraseValidatedAlreadyError);
    }
    return _this11;
  }
  return PhraseValidatedAlreadyError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x177a, function () {
  return new PhraseValidatedAlreadyError();
});
createErrorFromNameLookup.set('PhraseValidatedAlready', function () {
  return new PhraseValidatedAlreadyError();
});
/**
 * CampaignFinishedAlready: 'Campaign is finished'
 *
 * @category Errors
 * @category generated
 */
var CampaignFinishedAlreadyError = /*#__PURE__*/function (_Error12) {
  _inheritsLoose(CampaignFinishedAlreadyError, _Error12);
  function CampaignFinishedAlreadyError() {
    var _this12;
    _this12 = _Error12.call(this, 'Campaign is finished') || this;
    _this12.code = 0x177b;
    _this12.name = 'CampaignFinishedAlready';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this12), CampaignFinishedAlreadyError);
    }
    return _this12;
  }
  return CampaignFinishedAlreadyError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x177b, function () {
  return new CampaignFinishedAlreadyError();
});
createErrorFromNameLookup.set('CampaignFinishedAlready', function () {
  return new CampaignFinishedAlreadyError();
});
/**
 * ProfileNotMatchWithAuthority: 'Profile is not match with authority Signer'
 *
 * @category Errors
 * @category generated
 */
var ProfileNotMatchWithAuthorityError = /*#__PURE__*/function (_Error13) {
  _inheritsLoose(ProfileNotMatchWithAuthorityError, _Error13);
  function ProfileNotMatchWithAuthorityError() {
    var _this13;
    _this13 = _Error13.call(this, 'Profile is not match with authority Signer') || this;
    _this13.code = 0x177c;
    _this13.name = 'ProfileNotMatchWithAuthority';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this13), ProfileNotMatchWithAuthorityError);
    }
    return _this13;
  }
  return ProfileNotMatchWithAuthorityError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x177c, function () {
  return new ProfileNotMatchWithAuthorityError();
});
createErrorFromNameLookup.set('ProfileNotMatchWithAuthority', function () {
  return new ProfileNotMatchWithAuthorityError();
});
/**
 * PermitRpcIsMissed: 'User have to set RPC permission to true'
 *
 * @category Errors
 * @category generated
 */
var PermitRpcIsMissedError = /*#__PURE__*/function (_Error14) {
  _inheritsLoose(PermitRpcIsMissedError, _Error14);
  function PermitRpcIsMissedError() {
    var _this14;
    _this14 = _Error14.call(this, 'User have to set RPC permission to true') || this;
    _this14.code = 0x177d;
    _this14.name = 'PermitRpcIsMissed';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this14), PermitRpcIsMissedError);
    }
    return _this14;
  }
  return PermitRpcIsMissedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x177d, function () {
  return new PermitRpcIsMissedError();
});
createErrorFromNameLookup.set('PermitRpcIsMissed', function () {
  return new PermitRpcIsMissedError();
});
/**
 * RoleMismatch: 'User Role is Mismatch'
 *
 * @category Errors
 * @category generated
 */
var RoleMismatchError = /*#__PURE__*/function (_Error15) {
  _inheritsLoose(RoleMismatchError, _Error15);
  function RoleMismatchError() {
    var _this15;
    _this15 = _Error15.call(this, 'User Role is Mismatch') || this;
    _this15.code = 0x177e;
    _this15.name = 'RoleMismatch';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this15), RoleMismatchError);
    }
    return _this15;
  }
  return RoleMismatchError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x177e, function () {
  return new RoleMismatchError();
});
createErrorFromNameLookup.set('RoleMismatch', function () {
  return new RoleMismatchError();
});
/**
 * RpcSignerMismatch: 'The RPC Signer is invalid'
 *
 * @category Errors
 * @category generated
 */
var RpcSignerMismatchError = /*#__PURE__*/function (_Error16) {
  _inheritsLoose(RpcSignerMismatchError, _Error16);
  function RpcSignerMismatchError() {
    var _this16;
    _this16 = _Error16.call(this, 'The RPC Signer is invalid') || this;
    _this16.code = 0x177f;
    _this16.name = 'RpcSignerMismatch';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this16), RpcSignerMismatchError);
    }
    return _this16;
  }
  return RpcSignerMismatchError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x177f, function () {
  return new RpcSignerMismatchError();
});
createErrorFromNameLookup.set('RpcSignerMismatch', function () {
  return new RpcSignerMismatchError();
});
/**
 * ConfidentIsInvalid: 'Confident level should be in range of 1~5'
 *
 * @category Errors
 * @category generated
 */
var ConfidentIsInvalidError = /*#__PURE__*/function (_Error17) {
  _inheritsLoose(ConfidentIsInvalidError, _Error17);
  function ConfidentIsInvalidError() {
    var _this17;
    _this17 = _Error17.call(this, 'Confident level should be in range of 1~5') || this;
    _this17.code = 0x1780;
    _this17.name = 'ConfidentIsInvalid';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this17), ConfidentIsInvalidError);
    }
    return _this17;
  }
  return ConfidentIsInvalidError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1780, function () {
  return new ConfidentIsInvalidError();
});
createErrorFromNameLookup.set('ConfidentIsInvalid', function () {
  return new ConfidentIsInvalidError();
});
/**
 * StakeLocked: 'Need to wait for unlock time'
 *
 * @category Errors
 * @category generated
 */
var StakeLockedError = /*#__PURE__*/function (_Error18) {
  _inheritsLoose(StakeLockedError, _Error18);
  function StakeLockedError() {
    var _this18;
    _this18 = _Error18.call(this, 'Need to wait for unlock time') || this;
    _this18.code = 0x1781;
    _this18.name = 'StakeLocked';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this18), StakeLockedError);
    }
    return _this18;
  }
  return StakeLockedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1781, function () {
  return new StakeLockedError();
});
createErrorFromNameLookup.set('StakeLocked', function () {
  return new StakeLockedError();
});
/**
 * InvalidMint: 'the mint account passed is different from NFT Mint'
 *
 * @category Errors
 * @category generated
 */
var InvalidMintError = /*#__PURE__*/function (_Error19) {
  _inheritsLoose(InvalidMintError, _Error19);
  function InvalidMintError() {
    var _this19;
    _this19 = _Error19.call(this, 'the mint account passed is different from NFT Mint') || this;
    _this19.code = 0x1782;
    _this19.name = 'InvalidMint';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this19), InvalidMintError);
    }
    return _this19;
  }
  return InvalidMintError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1782, function () {
  return new InvalidMintError();
});
createErrorFromNameLookup.set('InvalidMint', function () {
  return new InvalidMintError();
});
/**
 * InvalidGuildAdmin: 'the owner of NFT is invalid'
 *
 * @category Errors
 * @category generated
 */
var InvalidGuildAdminError = /*#__PURE__*/function (_Error20) {
  _inheritsLoose(InvalidGuildAdminError, _Error20);
  function InvalidGuildAdminError() {
    var _this20;
    _this20 = _Error20.call(this, 'the owner of NFT is invalid') || this;
    _this20.code = 0x1783;
    _this20.name = 'InvalidGuildAdmin';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this20), InvalidGuildAdminError);
    }
    return _this20;
  }
  return InvalidGuildAdminError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1783, function () {
  return new InvalidGuildAdminError();
});
createErrorFromNameLookup.set('InvalidGuildAdmin', function () {
  return new InvalidGuildAdminError();
});
/**
 * InvalidNFT: 'the creator of NFT is invalid'
 *
 * @category Errors
 * @category generated
 */
var InvalidNFTError = /*#__PURE__*/function (_Error21) {
  _inheritsLoose(InvalidNFTError, _Error21);
  function InvalidNFTError() {
    var _this21;
    _this21 = _Error21.call(this, 'the creator of NFT is invalid') || this;
    _this21.code = 0x1784;
    _this21.name = 'InvalidNFT';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this21), InvalidNFTError);
    }
    return _this21;
  }
  return InvalidNFTError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1784, function () {
  return new InvalidNFTError();
});
createErrorFromNameLookup.set('InvalidNFT', function () {
  return new InvalidNFTError();
});
/**
 * InvalidAccessMethod: 'You should have profile with NFT StakingType'
 *
 * @category Errors
 * @category generated
 */
var InvalidAccessMethodError = /*#__PURE__*/function (_Error22) {
  _inheritsLoose(InvalidAccessMethodError, _Error22);
  function InvalidAccessMethodError() {
    var _this22;
    _this22 = _Error22.call(this, 'You should have profile with NFT StakingType') || this;
    _this22.code = 0x1785;
    _this22.name = 'InvalidAccessMethod';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this22), InvalidAccessMethodError);
    }
    return _this22;
  }
  return InvalidAccessMethodError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1785, function () {
  return new InvalidAccessMethodError();
});
createErrorFromNameLookup.set('InvalidAccessMethod', function () {
  return new InvalidAccessMethodError();
});
/**
 * CampaignExpired: 'the campaign is expired'
 *
 * @category Errors
 * @category generated
 */
var CampaignExpiredError = /*#__PURE__*/function (_Error23) {
  _inheritsLoose(CampaignExpiredError, _Error23);
  function CampaignExpiredError() {
    var _this23;
    _this23 = _Error23.call(this, 'the campaign is expired') || this;
    _this23.code = 0x1786;
    _this23.name = 'CampaignExpired';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this23), CampaignExpiredError);
    }
    return _this23;
  }
  return CampaignExpiredError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1786, function () {
  return new CampaignExpiredError();
});
createErrorFromNameLookup.set('CampaignExpired', function () {
  return new CampaignExpiredError();
});
/**
 * CampaignNotFinished: 'the campaign is not finished'
 *
 * @category Errors
 * @category generated
 */
var CampaignNotFinishedError = /*#__PURE__*/function (_Error24) {
  _inheritsLoose(CampaignNotFinishedError, _Error24);
  function CampaignNotFinishedError() {
    var _this24;
    _this24 = _Error24.call(this, 'the campaign is not finished') || this;
    _this24.code = 0x1787;
    _this24.name = 'CampaignNotFinished';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this24), CampaignNotFinishedError);
    }
    return _this24;
  }
  return CampaignNotFinishedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1787, function () {
  return new CampaignNotFinishedError();
});
createErrorFromNameLookup.set('CampaignNotFinished', function () {
  return new CampaignNotFinishedError();
});
/**
 * RewardIsLow: 'Reward is low'
 *
 * @category Errors
 * @category generated
 */
var RewardIsLowError = /*#__PURE__*/function (_Error25) {
  _inheritsLoose(RewardIsLowError, _Error25);
  function RewardIsLowError() {
    var _this25;
    _this25 = _Error25.call(this, 'Reward is low') || this;
    _this25.code = 0x1788;
    _this25.name = 'RewardIsLow';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this25), RewardIsLowError);
    }
    return _this25;
  }
  return RewardIsLowError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1788, function () {
  return new RewardIsLowError();
});
createErrorFromNameLookup.set('RewardIsLow', function () {
  return new RewardIsLowError();
});
/**
 * InvalidMerkleProof: 'Invalid Merkle Proof'
 *
 * @category Errors
 * @category generated
 */
var InvalidMerkleProofError = /*#__PURE__*/function (_Error26) {
  _inheritsLoose(InvalidMerkleProofError, _Error26);
  function InvalidMerkleProofError() {
    var _this26;
    _this26 = _Error26.call(this, 'Invalid Merkle Proof') || this;
    _this26.code = 0x1789;
    _this26.name = 'InvalidMerkleProof';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this26), InvalidMerkleProofError);
    }
    return _this26;
  }
  return InvalidMerkleProofError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x1789, function () {
  return new InvalidMerkleProofError();
});
createErrorFromNameLookup.set('InvalidMerkleProof', function () {
  return new InvalidMerkleProofError();
});
/**
 * InvalidSignature: 'Invalid Signature'
 *
 * @category Errors
 * @category generated
 */
var InvalidSignatureError = /*#__PURE__*/function (_Error27) {
  _inheritsLoose(InvalidSignatureError, _Error27);
  function InvalidSignatureError() {
    var _this27;
    _this27 = _Error27.call(this, 'Invalid Signature') || this;
    _this27.code = 0x178a;
    _this27.name = 'InvalidSignature';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this27), InvalidSignatureError);
    }
    return _this27;
  }
  return InvalidSignatureError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x178a, function () {
  return new InvalidSignatureError();
});
createErrorFromNameLookup.set('InvalidSignature', function () {
  return new InvalidSignatureError();
});
/**
 * InvalidInput: 'Invalid Input on kind or phrase_type'
 *
 * @category Errors
 * @category generated
 */
var InvalidInputError = /*#__PURE__*/function (_Error28) {
  _inheritsLoose(InvalidInputError, _Error28);
  function InvalidInputError() {
    var _this28;
    _this28 = _Error28.call(this, 'Invalid Input on kind or phrase_type') || this;
    _this28.code = 0x178b;
    _this28.name = 'InvalidInput';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this28), InvalidInputError);
    }
    return _this28;
  }
  return InvalidInputError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x178b, function () {
  return new InvalidInputError();
});
createErrorFromNameLookup.set('InvalidInput', function () {
  return new InvalidInputError();
});
/**
 * InvalidPlatformTiers: 'Invalid Platform Percents for Tiers'
 *
 * @category Errors
 * @category generated
 */
var InvalidPlatformTiersError = /*#__PURE__*/function (_Error29) {
  _inheritsLoose(InvalidPlatformTiersError, _Error29);
  function InvalidPlatformTiersError() {
    var _this29;
    _this29 = _Error29.call(this, 'Invalid Platform Percents for Tiers') || this;
    _this29.code = 0x178c;
    _this29.name = 'InvalidPlatformTiers';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_assertThisInitialized(_this29), InvalidPlatformTiersError);
    }
    return _this29;
  }
  return InvalidPlatformTiersError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
createErrorFromCodeLookup.set(0x178c, function () {
  return new InvalidPlatformTiersError();
});
createErrorFromNameLookup.set('InvalidPlatformTiers', function () {
  return new InvalidPlatformTiersError();
});
/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
function errorFromCode(code) {
  var createError = createErrorFromCodeLookup.get(code);
  return createError != null ? createError() : null;
}
/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
function errorFromName(name) {
  var createError = createErrorFromNameLookup.get(name);
  return createError != null ? createError() : null;
}

/**
 * @category Instructions
 * @category AdjustCampaignPeriod
 * @category generated
 */
var adjustCampaignPeriodStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['claimPeriod', beet.u64], ['rpcClosePeriod', beet.u64], ['fundClaimPeriod', beet.u64]], 'AdjustCampaignPeriodInstructionArgs');
var adjustCampaignPeriodInstructionDiscriminator = [222, 191, 179, 253, 73, 163, 40, 55];
/**
 * Creates a _AdjustCampaignPeriod_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AdjustCampaignPeriod
 * @category generated
 */
function createAdjustCampaignPeriodInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _adjustCampaignPeriod = adjustCampaignPeriodStruct.serialize(_extends({
      instructionDiscriminator: adjustCampaignPeriodInstructionDiscriminator
    }, args)),
    data = _adjustCampaignPeriod[0];
  var keys = [{
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category AdjustOverrun
 * @category generated
 */
var adjustOverrunStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['overrunPercent', beet.u8]], 'AdjustOverrunInstructionArgs');
var adjustOverrunInstructionDiscriminator = [157, 21, 175, 82, 27, 52, 224, 140];
/**
 * Creates a _AdjustOverrun_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AdjustOverrun
 * @category generated
 */
function createAdjustOverrunInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _adjustOverrunStruct$ = adjustOverrunStruct.serialize(_extends({
      instructionDiscriminator: adjustOverrunInstructionDiscriminator
    }, args)),
    data = _adjustOverrunStruct$[0];
  var keys = [{
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category AdjustPlatformFee
 * @category generated
 */
var adjustPlatformFeeStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['fee', beet.u8]], 'AdjustPlatformFeeInstructionArgs');
var adjustPlatformFeeInstructionDiscriminator = [31, 136, 29, 173, 107, 36, 231, 228];
/**
 * Creates a _AdjustPlatformFee_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AdjustPlatformFee
 * @category generated
 */
function createAdjustPlatformFeeInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _adjustPlatformFeeStr = adjustPlatformFeeStruct.serialize(_extends({
      instructionDiscriminator: adjustPlatformFeeInstructionDiscriminator
    }, args)),
    data = _adjustPlatformFeeStr[0];
  var keys = [{
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category AdjustReward
 * @category generated
 */
var adjustRewardStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['promo', beet.u8], ['system', beet.u8]], 'AdjustRewardInstructionArgs');
var adjustRewardInstructionDiscriminator = [23, 3, 192, 117, 96, 198, 166, 215];
/**
 * Creates a _AdjustReward_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AdjustReward
 * @category generated
 */
function createAdjustRewardInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _adjustRewardStruct$s = adjustRewardStruct.serialize(_extends({
      instructionDiscriminator: adjustRewardInstructionDiscriminator
    }, args)),
    data = _adjustRewardStruct$s[0];
  var keys = [{
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category Airdrop
 * @category generated
 */
var airdropStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'AirdropInstructionArgs');
var airdropInstructionDiscriminator = [113, 173, 36, 238, 38, 152, 22, 117];
/**
 * Creates a _Airdrop_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category Airdrop
 * @category generated
 */
function createAirdropInstruction(accounts, programId) {
  var _accounts$tokenProgra;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _airdropStruct$serial = airdropStruct.serialize({
      instructionDiscriminator: airdropInstructionDiscriminator
    }),
    data = _airdropStruct$serial[0];
  var keys = [{
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.userToken,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.tokenVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category AllocateTable
 * @category generated
 */
var allocateTableStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['slot', beet.u64], ['scope', beet.utf8String]], 'AllocateTableInstructionArgs');
var allocateTableInstructionDiscriminator = [51, 148, 3, 2, 77, 128, 58, 80];
/**
 * Creates a _AllocateTable_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AllocateTable
 * @category generated
 */
function createAllocateTableInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _allocateTableStruct$ = allocateTableStruct.serialize(_extends({
      instructionDiscriminator: allocateTableInstructionDiscriminator
    }, args)),
    data = _allocateTableStruct$[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category CheckPrice
 * @category generated
 */
var checkPriceStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['pair', beet.utf8String]], 'CheckPriceInstructionArgs');
var checkPriceInstructionDiscriminator = [167, 85, 209, 192, 115, 173, 239, 176];
/**
 * Creates a _CheckPrice_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CheckPrice
 * @category generated
 */
function createCheckPriceInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _checkPriceStruct$ser = checkPriceStruct.serialize(_extends({
      instructionDiscriminator: checkPriceInstructionDiscriminator
    }, args)),
    data = _checkPriceStruct$ser[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.priceFeed,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category ClaimCampaign
 * @category generated
 */
var claimCampaignStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String]], 'ClaimCampaignInstructionArgs');
var claimCampaignInstructionDiscriminator = [118, 195, 170, 16, 78, 8, 26, 38];
/**
 * Creates a _ClaimCampaign_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ClaimCampaign
 * @category generated
 */
function createClaimCampaignInstruction(accounts, args, programId) {
  var _accounts$tokenProgra, _accounts$rent, _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _claimCampaignStruct$ = claimCampaignStruct.serialize(_extends({
      instructionDiscriminator: claimCampaignInstructionDiscriminator
    }, args)),
    data = _claimCampaignStruct$[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.burnWallet,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.platformVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userToken,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.mint,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category ClaimReward
 * @category generated
 */
var claimRewardStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String]], 'ClaimRewardInstructionArgs');
var claimRewardInstructionDiscriminator = [149, 95, 181, 242, 94, 90, 158, 162];
/**
 * Creates a _ClaimReward_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ClaimReward
 * @category generated
 */
function createClaimRewardInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _claimRewardStruct$se = claimRewardStruct.serialize(_extends({
      instructionDiscriminator: claimRewardInstructionDiscriminator
    }, args)),
    data = _claimRewardStruct$se[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userToken,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.dyfVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category CloseConfig
 * @category generated
 */
var closeConfigStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'CloseConfigInstructionArgs');
var closeConfigInstructionDiscriminator = [145, 9, 72, 157, 95, 125, 61, 85];
/**
 * Creates a _CloseConfig_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category CloseConfig
 * @category generated
 */
function createCloseConfigInstruction(accounts, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _closeConfigStruct$se = closeConfigStruct.serialize({
      instructionDiscriminator: closeConfigInstructionDiscriminator
    }),
    data = _closeConfigStruct$se[0];
  var keys = [{
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category CreateCampaign
 * @category generated
 */
var createCampaignStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String], ['pair', beet.utf8String], ['industry', beet.utf8String], ['domain', beet.utf8String], ['subject', beet.utf8String], ['organizer', beet.utf8String], ['lang', beet.utf8String], ['kind', beet.u8], ['open', beet.u64], ['close', beet.u64], ['expire', beet.u64], ['rpuValidator', beet.u64], ['minGeneral', beet.u64], ['rpuGeneral', beet.u64], ['minSpecific', beet.u64], ['rpuSpecific', beet.u64], ['minCause', beet.u64], ['rpuCause', beet.u64], ['minEffect', beet.u64], ['rpuEffect', beet.u64], ['minBuilder', beet.u16], ['minValidator', beet.u16], ['majorityQuorum', beet.u16], ['minimumStake', beet.u64], ['acceptRate', beet.u8]], 'CreateCampaignInstructionArgs');
var createCampaignInstructionDiscriminator = [111, 131, 187, 98, 160, 193, 114, 244];
/**
 * Creates a _CreateCampaign_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateCampaign
 * @category generated
 */
function createCreateCampaignInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _createCampaignStruct = createCampaignStruct.serialize(_extends({
      instructionDiscriminator: createCampaignInstructionDiscriminator
    }, args)),
    data = _createCampaignStruct[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.dyfVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userToken,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.mint,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.priceFeed,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignTableAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.oracle,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category CreateGuild
 * @category generated
 */
var createGuildStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['guildTitle', beet.utf8String], ['slot', beet.u64], ['ownerRate', beet.u8], ['master', /*#__PURE__*/beet.coption(beetSolana.publicKey)], ['masterRate', /*#__PURE__*/beet.coption(beet.u8)]], 'CreateGuildInstructionArgs');
var createGuildInstructionDiscriminator = [163, 27, 97, 167, 132, 198, 53, 168];
/**
 * Creates a _CreateGuild_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateGuild
 * @category generated
 */
function createCreateGuildInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _createGuildStruct$se = createGuildStruct.serialize(_extends({
      instructionDiscriminator: createGuildInstructionDiscriminator
    }, args)),
    data = _createGuildStruct$se[0];
  var keys = [{
    pubkey: accounts.owner,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.guildAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftTableAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.scholarTableAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category CreateProfile
 * @category generated
 */
var createProfileStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['role', beet.u8], ['access', beet.u8]], 'CreateProfileInstructionArgs');
var createProfileInstructionDiscriminator = [225, 205, 234, 143, 17, 186, 50, 220];
/**
 * Creates a _CreateProfile_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateProfile
 * @category generated
 */
function createCreateProfileInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _createProfileStruct$ = createProfileStruct.serialize(_extends({
      instructionDiscriminator: createProfileInstructionDiscriminator
    }, args)),
    data = _createProfileStruct$[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category DeactiveTable
 * @category generated
 */
var deactiveTableStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'DeactiveTableInstructionArgs');
var deactiveTableInstructionDiscriminator = [145, 99, 175, 188, 124, 217, 141, 71];
/**
 * Creates a _DeactiveTable_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category DeactiveTable
 * @category generated
 */
function createDeactiveTableInstruction(accounts, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _deactiveTableStruct$ = deactiveTableStruct.serialize({
      instructionDiscriminator: deactiveTableInstructionDiscriminator
    }),
    data = _deactiveTableStruct$[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.lookupAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category ExtendTable
 * @category generated
 */
var extendTableStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'ExtendTableInstructionArgs');
var extendTableInstructionDiscriminator = [181, 129, 37, 152, 188, 164, 212, 75];
/**
 * Creates a _ExtendTable_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category ExtendTable
 * @category generated
 */
function createExtendTableInstruction(accounts, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _extendTableStruct$se = extendTableStruct.serialize({
      instructionDiscriminator: extendTableInstructionDiscriminator
    }),
    data = _extendTableStruct$se[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.lookupAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category Free2play
 * @category generated
 */
var free2playStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'Free2playInstructionArgs');
var free2playInstructionDiscriminator = [14, 185, 90, 244, 62, 166, 71, 245];
/**
 * Creates a _Free2play_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category Free2play
 * @category generated
 */
function createFree2playInstruction(accounts, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _free2playStruct$seri = free2playStruct.serialize({
      instructionDiscriminator: free2playInstructionDiscriminator
    }),
    data = _free2playStruct$seri[0];
  var keys = [{
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.user,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category GuildClaimReward
 * @category generated
 */
var guildClaimRewardStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String], ['guildTitle', beet.utf8String]], 'GuildClaimRewardInstructionArgs');
var guildClaimRewardInstructionDiscriminator = [151, 61, 18, 77, 172, 55, 161, 81];
/**
 * Creates a _GuildClaimReward_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category GuildClaimReward
 * @category generated
 */
function createGuildClaimRewardInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _guildClaimRewardStru = guildClaimRewardStruct.serialize(_extends({
      instructionDiscriminator: guildClaimRewardInstructionDiscriminator
    }, args)),
    data = _guildClaimRewardStru[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.master,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userToken,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.guildAccount,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.guildAta,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.dyfVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category GuildDelete
 * @category generated
 */
var guildDeleteStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['guildTitle', beet.utf8String]], 'GuildDeleteInstructionArgs');
var guildDeleteInstructionDiscriminator = [156, 15, 205, 147, 171, 210, 90, 132];
/**
 * Creates a _GuildDelete_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category GuildDelete
 * @category generated
 */
function createGuildDeleteInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _guildDeleteStruct$se = guildDeleteStruct.serialize(_extends({
      instructionDiscriminator: guildDeleteInstructionDiscriminator
    }, args)),
    data = _guildDeleteStruct$se[0];
  var keys = [{
    pubkey: accounts.master,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.guildAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.scholarTable,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftTable,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category GuildGrantScholar
 * @category generated
 */
var guildGrantScholarStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['guildTitle', beet.utf8String]], 'GuildGrantScholarInstructionArgs');
var guildGrantScholarInstructionDiscriminator = [246, 74, 234, 202, 61, 146, 196, 35];
/**
 * Creates a _GuildGrantScholar_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category GuildGrantScholar
 * @category generated
 */
function createGuildGrantScholarInstruction(accounts, args, programId) {
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _guildGrantScholarStr = guildGrantScholarStruct.serialize(_extends({
      instructionDiscriminator: guildGrantScholarInstructionDiscriminator
    }, args)),
    data = _guildGrantScholarStr[0];
  var keys = [{
    pubkey: accounts.master,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.user,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.guildAccount,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category GuildStakeNft
 * @category generated
 */
var guildStakeNftStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['guildTitle', beet.utf8String], ['role', beet.u8]], 'GuildStakeNftInstructionArgs');
var guildStakeNftInstructionDiscriminator = [84, 239, 169, 71, 243, 35, 180, 158];
/**
 * Creates a _GuildStakeNft_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category GuildStakeNft
 * @category generated
 */
function createGuildStakeNftInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _guildStakeNftStruct$ = guildStakeNftStruct.serialize(_extends({
      instructionDiscriminator: guildStakeNftInstructionDiscriminator
    }, args)),
    data = _guildStakeNftStruct$[0];
  var keys = [{
    pubkey: accounts.master,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.guildAccount,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.user,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.masterNft,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftTableAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.scholarTableAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftMint,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftMetadata,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category GuildUnstakeNft
 * @category generated
 */
var guildUnstakeNftStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['guildTitle', beet.utf8String], ['newScholarSlot', beet.u64]], 'GuildUnstakeNftInstructionArgs');
var guildUnstakeNftInstructionDiscriminator = [131, 104, 220, 144, 180, 206, 25, 140];
/**
 * Creates a _GuildUnstakeNft_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category GuildUnstakeNft
 * @category generated
 */
function createGuildUnstakeNftInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _guildUnstakeNftStruc = guildUnstakeNftStruct.serialize(_extends({
      instructionDiscriminator: guildUnstakeNftInstructionDiscriminator
    }, args)),
    data = _guildUnstakeNftStruc[0];
  var keys = [{
    pubkey: accounts.master,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.guildAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.user,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.masterNft,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftMint,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.oldScholarTable,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.newScholarTable,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category Initialize
 * @category generated
 */
var initializeStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['rpcSigner', beetSolana.publicKey], ['adminSigner', beetSolana.publicKey], ['nftCreator', beetSolana.publicKey], ['stakingContract', beetSolana.publicKey], ['oracle', beetSolana.publicKey], ['snsFeed', beetSolana.publicKey], ['claimPeriod', beet.u64], ['rpcClosePeriod', beet.u64], ['fundClaimPeriod', beet.u64], ['platformTiers', beet.bytes], ['platformFee', beet.u8], ['platformOverrunBuffer', beet.u8], ['slot', beet.u64]], 'InitializeInstructionArgs');
var initializeInstructionDiscriminator = [175, 175, 109, 31, 13, 152, 155, 237];
/**
 * Creates a _Initialize_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Initialize
 * @category generated
 */
function createInitializeInstruction(accounts, args, programId) {
  var _accounts$tokenProgra, _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _initializeStruct$ser = initializeStruct.serialize(_extends({
      instructionDiscriminator: initializeInstructionDiscriminator
    }, args)),
    data = _initializeStruct$ser[0];
  var keys = [{
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.dyfVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.burnWallet,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.platformVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.mint,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignTableAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category RevokeScholar
 * @category generated
 */
var revokeScholarStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['guildTitle', beet.utf8String], ['newScholarSlot', beet.u64]], 'RevokeScholarInstructionArgs');
var revokeScholarInstructionDiscriminator = [47, 197, 48, 149, 14, 68, 39, 200];
/**
 * Creates a _RevokeScholar_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category RevokeScholar
 * @category generated
 */
function createRevokeScholarInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _revokeScholarStruct$ = revokeScholarStruct.serialize(_extends({
      instructionDiscriminator: revokeScholarInstructionDiscriminator
    }, args)),
    data = _revokeScholarStruct$[0];
  var keys = [{
    pubkey: accounts.master,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.user,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.guildAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.oldScholarTable,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.newScholarTable,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.lookupProgram,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category RpcCloseCampaign
 * @category generated
 */
var rpcCloseCampaignStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String]], 'RpcCloseCampaignInstructionArgs');
var rpcCloseCampaignInstructionDiscriminator = [67, 33, 43, 114, 123, 198, 81, 235];
/**
 * Creates a _RpcCloseCampaign_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category RpcCloseCampaign
 * @category generated
 */
function createRpcCloseCampaignInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _rpcCloseCampaignStru = rpcCloseCampaignStruct.serialize(_extends({
      instructionDiscriminator: rpcCloseCampaignInstructionDiscriminator
    }, args)),
    data = _rpcCloseCampaignStru[0];
  var keys = [{
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.rentOwner,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaign,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category RpcClosePhrase
 * @category generated
 */
var rpcClosePhraseStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'RpcClosePhraseInstructionArgs');
var rpcClosePhraseInstructionDiscriminator = [227, 100, 252, 19, 112, 191, 162, 85];
/**
 * Creates a _RpcClosePhrase_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category RpcClosePhrase
 * @category generated
 */
function createRpcClosePhraseInstruction(accounts, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _rpcClosePhraseStruct = rpcClosePhraseStruct.serialize({
      instructionDiscriminator: rpcClosePhraseInstructionDiscriminator
    }),
    data = _rpcClosePhraseStruct[0];
  var keys = [{
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.rentOwner,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.phrase,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category RpcCloseValidate
 * @category generated
 */
var rpcCloseValidateStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'RpcCloseValidateInstructionArgs');
var rpcCloseValidateInstructionDiscriminator = [57, 139, 225, 164, 199, 188, 164, 117];
/**
 * Creates a _RpcCloseValidate_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category RpcCloseValidate
 * @category generated
 */
function createRpcCloseValidateInstruction(accounts, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _rpcCloseValidateStru = rpcCloseValidateStruct.serialize({
      instructionDiscriminator: rpcCloseValidateInstructionDiscriminator
    }),
    data = _rpcCloseValidateStru[0];
  var keys = [{
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.rentOwner,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.validate,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category RpcPermit
 * @category generated
 */
var rpcPermitStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['status', beet.bool], ['role', beet.u8]], 'RpcPermitInstructionArgs');
var rpcPermitInstructionDiscriminator = [92, 83, 224, 31, 112, 83, 197, 55];
/**
 * Creates a _RpcPermit_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category RpcPermit
 * @category generated
 */
function createRpcPermitInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _rpcPermitStruct$seri = rpcPermitStruct.serialize(_extends({
      instructionDiscriminator: rpcPermitInstructionDiscriminator
    }, args)),
    data = _rpcPermitStruct$seri[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.authority,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.profile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category ScholarSign
 * @category generated
 */
var scholarSignStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['guildTitle', beet.utf8String]], 'ScholarSignInstructionArgs');
var scholarSignInstructionDiscriminator = [124, 192, 76, 227, 147, 194, 65, 121];
/**
 * Creates a _ScholarSign_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ScholarSign
 * @category generated
 */
function createScholarSignInstruction(accounts, args, programId) {
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _scholarSignStruct$se = scholarSignStruct.serialize(_extends({
      instructionDiscriminator: scholarSignInstructionDiscriminator
    }, args)),
    data = _scholarSignStruct$se[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.admin,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.guildAccount,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category StakeCampaign
 * @category generated
 */
var stakeCampaignStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String], ['amount', beet.u64]], 'StakeCampaignInstructionArgs');
var stakeCampaignInstructionDiscriminator = [147, 38, 195, 247, 115, 100, 125, 35];
/**
 * Creates a _StakeCampaign_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category StakeCampaign
 * @category generated
 */
function createStakeCampaignInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _stakeCampaignStruct$ = stakeCampaignStruct.serialize(_extends({
      instructionDiscriminator: stakeCampaignInstructionDiscriminator
    }, args)),
    data = _stakeCampaignStruct$[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userToken,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category StakeNft
 * @category generated
 */
var stakeNftStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'StakeNftInstructionArgs');
var stakeNftInstructionDiscriminator = [38, 27, 66, 46, 69, 65, 151, 219];
/**
 * Creates a _StakeNft_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category StakeNft
 * @category generated
 */
function createStakeNftInstruction(accounts, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _stakeNftStruct$seria = stakeNftStruct.serialize({
      instructionDiscriminator: stakeNftInstructionDiscriminator
    }),
    data = _stakeNftStruct$seria[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userNft,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftMint,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftMetadata,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category SubmitPhrase
 * @category generated
 */
var submitPhraseStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String], ['offchainRef', beet.utf8String], ['offchainType', beet.u8], ['kind', beet.u8]], 'SubmitPhraseInstructionArgs');
var submitPhraseInstructionDiscriminator = [201, 89, 230, 171, 244, 100, 6, 127];
/**
 * Creates a _SubmitPhrase_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category SubmitPhrase
 * @category generated
 */
function createSubmitPhraseInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _submitPhraseStruct$s = submitPhraseStruct.serialize(_extends({
      instructionDiscriminator: submitPhraseInstructionDiscriminator
    }, args)),
    data = _submitPhraseStruct$s[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.phraseAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category SubmitSignedPhrase
 * @category generated
 */
var submitSignedPhraseStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String], ['offchainRef', beet.utf8String], ['phrase', beet.utf8String], ['rawProof', beet.bytes]], 'SubmitSignedPhraseInstructionArgs');
var submitSignedPhraseInstructionDiscriminator = [3, 170, 96, 36, 90, 102, 203, 20];
/**
 * Creates a _SubmitSignedPhrase_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category SubmitSignedPhrase
 * @category generated
 */
function createSubmitSignedPhraseInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _submitSignedPhraseSt = submitSignedPhraseStruct.serialize(_extends({
      instructionDiscriminator: submitSignedPhraseInstructionDiscriminator
    }, args)),
    data = _submitSignedPhraseSt[0];
  var keys = [{
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.user,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.phraseAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.ixSysvar,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category UnstakeCampaign
 * @category generated
 */
var unstakeCampaignStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String]], 'UnstakeCampaignInstructionArgs');
var unstakeCampaignInstructionDiscriminator = [208, 3, 38, 137, 80, 29, 12, 75];
/**
 * Creates a _UnstakeCampaign_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category UnstakeCampaign
 * @category generated
 */
function createUnstakeCampaignInstruction(accounts, args, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _unstakeCampaignStruc = unstakeCampaignStruct.serialize(_extends({
      instructionDiscriminator: unstakeCampaignInstructionDiscriminator
    }, args)),
    data = _unstakeCampaignStruc[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userToken,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.dyfVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category UnstakeNft
 * @category generated
 */
var unstakeNftStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'UnstakeNftInstructionArgs');
var unstakeNftInstructionDiscriminator = [17, 182, 24, 211, 101, 138, 50, 163];
/**
 * Creates a _UnstakeNft_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category UnstakeNft
 * @category generated
 */
function createUnstakeNftInstruction(accounts, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _unstakeNftStruct$ser = unstakeNftStruct.serialize({
      instructionDiscriminator: unstakeNftInstructionDiscriminator
    }),
    data = _unstakeNftStruct$ser[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userNft,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftVault,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftMint,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category UpdateCampaign
 * @category generated
 */
var updateCampaignStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String], ['open', beet.u64], ['close', beet.u64], ['expire', beet.u64]], 'UpdateCampaignInstructionArgs');
var updateCampaignInstructionDiscriminator = [235, 31, 39, 49, 121, 173, 19, 92];
/**
 * Creates a _UpdateCampaign_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category UpdateCampaign
 * @category generated
 */
function createUpdateCampaignInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _updateCampaignStruct = updateCampaignStruct.serialize(_extends({
      instructionDiscriminator: updateCampaignInstructionDiscriminator
    }, args)),
    data = _updateCampaignStruct[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category ValidatePhrase
 * @category generated
 */
var validatePhraseStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String], ['offchainRef', beet.utf8String], ['confident', beet.u8], ['status', beet.bool]], 'ValidatePhraseInstructionArgs');
var validatePhraseInstructionDiscriminator = [131, 138, 249, 228, 211, 54, 251, 44];
/**
 * Creates a _ValidatePhrase_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ValidatePhrase
 * @category generated
 */
function createValidatePhraseInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _validatePhraseStruct = validatePhraseStruct.serialize(_extends({
      instructionDiscriminator: validatePhraseInstructionDiscriminator
    }, args)),
    data = _validatePhraseStruct[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.phraseAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.builderActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.logAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category ValidateSignedPhrase
 * @category generated
 */
var validateSignedPhraseStruct = /*#__PURE__*/new beet.FixableBeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)], ['campaignTitle', beet.utf8String], ['offchainRef', beet.utf8String], ['confident', beet.u8], ['status', beet.bool], ['validate', beet.utf8String], ['rawProof', beet.bytes]], 'ValidateSignedPhraseInstructionArgs');
var validateSignedPhraseInstructionDiscriminator = [51, 197, 7, 108, 252, 166, 131, 227];
/**
 * Creates a _ValidateSignedPhrase_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ValidateSignedPhrase
 * @category generated
 */
function createValidateSignedPhraseInstruction(accounts, args, programId) {
  var _accounts$systemProgr;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _validateSignedPhrase = validateSignedPhraseStruct.serialize(_extends({
      instructionDiscriminator: validateSignedPhraseInstructionDiscriminator
    }, args)),
    data = _validateSignedPhrase[0];
  var keys = [{
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.user,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.builder,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.phraseAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.builderProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.builderActivity,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.logAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.campaignAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.ixSysvar,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * @category Instructions
 * @category VerifyPreStakedNft
 * @category generated
 */
var verifyPreStakedNftStruct = /*#__PURE__*/new beet.BeetArgsStruct([['instructionDiscriminator', /*#__PURE__*/beet.uniformFixedSizeArray(beet.u8, 8)]], 'VerifyPreStakedNftInstructionArgs');
var verifyPreStakedNftInstructionDiscriminator = [147, 217, 55, 199, 25, 110, 241, 138];
/**
 * Creates a _VerifyPreStakedNft_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category VerifyPreStakedNft
 * @category generated
 */
function createVerifyPreStakedNftInstruction(accounts, programId) {
  var _accounts$systemProgr, _accounts$tokenProgra, _accounts$rent;
  if (programId === void 0) {
    programId = new web3.PublicKey('4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ');
  }
  var _verifyPreStakedNftSt = verifyPreStakedNftStruct.serialize({
      instructionDiscriminator: verifyPreStakedNftInstructionDiscriminator
    }),
    data = _verifyPreStakedNftSt[0];
  var keys = [{
    pubkey: accounts.user,
    isWritable: true,
    isSigner: true
  }, {
    pubkey: accounts.userProfile,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.userNftAccount,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.stakeAccount,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.farmConfig,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.pdaAccount,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftMint,
    isWritable: true,
    isSigner: false
  }, {
    pubkey: accounts.nftMetadata,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$systemProgr = accounts.systemProgram) != null ? _accounts$systemProgr : web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$tokenProgra = accounts.tokenProgram) != null ? _accounts$tokenProgra : splToken.TOKEN_PROGRAM_ID,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: accounts.clock,
    isWritable: false,
    isSigner: false
  }, {
    pubkey: (_accounts$rent = accounts.rent) != null ? _accounts$rent : web3.SYSVAR_RENT_PUBKEY,
    isWritable: false,
    isSigner: false
  }];
  if (accounts.anchorRemainingAccounts != null) {
    for (var _iterator = _createForOfIteratorHelperLoose(accounts.anchorRemainingAccounts), _step; !(_step = _iterator()).done;) {
      var acc = _step.value;
      keys.push(acc);
    }
  }
  var ix = new web3.TransactionInstruction({
    programId: programId,
    keys: keys,
    data: data
  });
  return ix;
}

/**
 * Program address
 *
 * @category constants
 * @category generated
 */
var PROGRAM_ADDRESS = '4HrvV9t73hKoNUmNLggM6MPca4dUYCiwtQqH5T6t5UdJ';
/**
 * Program public key
 *
 * @category constants
 * @category generated
 */
var PROGRAM_ID = /*#__PURE__*/new web3.PublicKey(PROGRAM_ADDRESS);

var encodeText = function encodeText(txt) {
  return new TextEncoder().encode(txt);
};
var decodeText = function decodeText(bytes) {
  return new TextDecoder('utf-8').decode(Uint8Array.from(bytes.filter(function (item) {
    return item !== 0;
  })));
};
var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};
function runPromisesSequentially(_x) {
  return _runPromisesSequentially.apply(this, arguments);
}
function _runPromisesSequentially() {
  _runPromisesSequentially = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(functions) {
    var first, rest;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(functions.length === 0)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", []);
        case 2:
          first = functions[0], rest = functions.slice(1);
          _context.next = 5;
          return first();
        case 5:
          _context.t1 = _context.sent;
          _context.t0 = [_context.t1];
          _context.next = 9;
          return runPromisesSequentially(rest);
        case 9:
          _context.t2 = _context.sent;
          return _context.abrupt("return", _context.t0.concat.call(_context.t0, _context.t2));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _runPromisesSequentially.apply(this, arguments);
}

var DEFAULT_TIMEOUT = 3 * 60 * 1000; // 3 minutes
function sendInstructions(_x, _x2, _x3, _x4, _x5, _x6) {
  return _sendInstructions.apply(this, arguments);
}
function _sendInstructions() {
  _sendInstructions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(connection, wallet, instructions, signers, commitment, payer) {
    var _tx;
    var tx, _tx2, _yield$sendAndConfirm, txid;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (commitment === void 0) {
            commitment = 'processed';
          }
          if (payer === void 0) {
            payer = wallet.publicKey;
          }
          tx = new web3.Transaction();
          _context6.next = 5;
          return connection.getRecentBlockhash();
        case 5:
          tx.recentBlockhash = _context6.sent.blockhash;
          tx.feePayer = payer || wallet.publicKey;
          (_tx = tx).add.apply(_tx, instructions);
          if (signers.length > 0) {
            (_tx2 = tx).partialSign.apply(_tx2, signers);
          }
          _context6.next = 11;
          return wallet.signTransaction(tx);
        case 11:
          tx = _context6.sent;
          _context6.prev = 12;
          _context6.next = 15;
          return sendAndConfirmWithRetry(connection, tx.serialize(), {
            skipPreflight: true
          }, commitment);
        case 15:
          _yield$sendAndConfirm = _context6.sent;
          txid = _yield$sendAndConfirm.txid;
          return _context6.abrupt("return", txid);
        case 20:
          _context6.prev = 20;
          _context6.t0 = _context6["catch"](12);
          console.error(_context6.t0);
          throw _context6.t0;
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[12, 20]]);
  }));
  return _sendInstructions.apply(this, arguments);
}
function getUnixTime() {
  return new Date().valueOf() / 1000;
}
var awaitTransactionSignatureConfirmation = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(txid, timeout, connection, commitment, queryStatus) {
    var done, status, subId;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (commitment === void 0) {
            commitment = 'recent';
          }
          if (queryStatus === void 0) {
            queryStatus = false;
          }
          done = false;
          status = {
            slot: 0,
            confirmations: 0,
            err: null
          };
          subId = 0; // eslint-disable-next-line no-async-promise-executor
          _context3.next = 7;
          return new Promise( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    setTimeout(function () {
                      if (done) {
                        return;
                      }
                      done = true;
                      console.log('Rejecting for timeout...');
                      reject({
                        timeout: true
                      });
                    }, timeout);
                    try {
                      console.log('COMMIMENT', commitment);
                      subId = connection.onSignature(txid, function (result, context) {
                        done = true;
                        status = {
                          err: result.err,
                          slot: context.slot,
                          confirmations: 0
                        };
                        if (result.err) {
                          console.log('Rejected via websocket', result.err);
                          reject(status);
                        } else {
                          console.log('Resolved via websocket', result);
                          resolve(status);
                        }
                      }, commitment);
                    } catch (e) {
                      done = true;
                      console.error('WS error in setup', txid, e);
                    }
                  case 2:
                    if (!(!done && queryStatus)) {
                      _context2.next = 9;
                      break;
                    }
                    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                      var signatureStatuses;
                      return _regeneratorRuntime().wrap(function _callee$(_context) {
                        while (1) switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return connection.getSignatureStatuses([txid]);
                          case 3:
                            signatureStatuses = _context.sent;
                            status = signatureStatuses && signatureStatuses.value[0];
                            if (!done) {
                              if (!status) {
                                console.log('REST null result for', txid, status);
                              } else if (status.err) {
                                console.log('REST error for', txid, status);
                                done = true;
                                reject(status.err);
                              } else if (!status.confirmations && !status.confirmationStatus) {
                                console.log('REST no confirmations for', txid, status);
                              } else {
                                console.log('REST confirmation for', txid, status);
                                if (!status.confirmationStatus || status.confirmationStatus == commitment) {
                                  done = true;
                                  resolve(status);
                                }
                              }
                            }
                            _context.next = 11;
                            break;
                          case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](0);
                            if (!done) {
                              console.log('REST connection error: txid', txid, _context.t0);
                            }
                          case 11:
                          case "end":
                            return _context.stop();
                        }
                      }, _callee, null, [[0, 8]]);
                    }))();
                    _context2.next = 7;
                    return sleep(2000);
                  case 7:
                    _context2.next = 2;
                    break;
                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x12, _x13) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 7:
          status = _context3.sent;
          if (
          //@ts-ignore
          connection._signatureSubscriptions &&
          //@ts-ignore
          connection._signatureSubscriptions[subId]) {
            connection.removeSignatureListener(subId);
          }
          done = true;
          console.log('Returning status ', status);
          return _context3.abrupt("return", status);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function awaitTransactionSignatureConfirmation(_x7, _x8, _x9, _x10, _x11) {
    return _ref.apply(this, arguments);
  };
}();
function simulateTransaction(_x14, _x15, _x16) {
  return _simulateTransaction.apply(this, arguments);
}
function _simulateTransaction() {
  _simulateTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(connection, transaction, commitment) {
    var signData, wireTransaction, encodedTransaction, config, args, res;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return connection._recentBlockhash(
          // @ts-ignore
          connection._disableBlockhashCaching);
        case 2:
          transaction.recentBlockhash = _context7.sent;
          signData = transaction.serializeMessage(); // @ts-ignore
          wireTransaction = transaction._serialize(signData);
          encodedTransaction = wireTransaction.toString('base64');
          config = {
            encoding: 'base64',
            commitment: commitment
          };
          args = [encodedTransaction, config]; // @ts-ignore
          _context7.next = 10;
          return connection._rpcRequest('simulateTransaction', args);
        case 10:
          res = _context7.sent;
          if (!res.error) {
            _context7.next = 13;
            break;
          }
          throw new Error('failed to simulate transaction: ' + res.error.message);
        case 13:
          return _context7.abrupt("return", res.result);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _simulateTransaction.apply(this, arguments);
}
function sendAndConfirmWithRetry(_x17, _x18, _x19, _x20, _x21) {
  return _sendAndConfirmWithRetry.apply(this, arguments);
}
function _sendAndConfirmWithRetry() {
  _sendAndConfirmWithRetry = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(connection, txn, sendOptions, commitment, timeout) {
    var done, txid, startTime, confirmation, _tx$meta, _tx$meta$logMessages, tx, simulateResult, _tx3$meta, _tx3$meta$logMessages, _tx3;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (timeout === void 0) {
            timeout = DEFAULT_TIMEOUT;
          }
          done = false; // let slot = 0;
          _context9.next = 4;
          return connection.sendRawTransaction(txn, sendOptions);
        case 4:
          txid = _context9.sent;
          startTime = getUnixTime();
          _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  if (!(!done && getUnixTime() - startTime < timeout)) {
                    _context8.next = 7;
                    break;
                  }
                  _context8.next = 3;
                  return connection.sendRawTransaction(txn, sendOptions);
                case 3:
                  _context8.next = 5;
                  return sleep(500);
                case 5:
                  _context8.next = 0;
                  break;
                case 7:
                case "end":
                  return _context8.stop();
              }
            }, _callee8);
          }))();
          _context9.prev = 7;
          _context9.next = 10;
          return awaitTransactionSignatureConfirmation(txid, timeout, connection, commitment, true);
        case 10:
          confirmation = _context9.sent;
          if (confirmation) {
            _context9.next = 13;
            break;
          }
          throw new Error('Timed out awaiting confirmation on transaction');
        case 13:
          if (!confirmation.err) {
            _context9.next = 20;
            break;
          }
          _context9.next = 16;
          return connection.getTransaction(txid);
        case 16:
          tx = _context9.sent;
          console.error(tx == null ? void 0 : (_tx$meta = tx.meta) == null ? void 0 : (_tx$meta$logMessages = _tx$meta.logMessages) == null ? void 0 : _tx$meta$logMessages.join('\n'));
          console.error(confirmation.err);
          throw new Error('Transaction failed: Custom instruction error');
        case 20:
          _context9.next = 44;
          break;
        case 22:
          _context9.prev = 22;
          _context9.t0 = _context9["catch"](7);
          console.error('Timeout Error caught', _context9.t0);
          if (!_context9.t0.timeout) {
            _context9.next = 27;
            break;
          }
          throw new Error('Timed out awaiting confirmation on transaction');
        case 27:
          simulateResult = null;
          _context9.prev = 28;
          _context9.next = 31;
          return simulateTransaction(connection, web3.Transaction.from(txn), 'single');
        case 31:
          simulateResult = _context9.sent.value;
          _context9.next = 40;
          break;
        case 34:
          _context9.prev = 34;
          _context9.t1 = _context9["catch"](28);
          _context9.next = 38;
          return connection.getTransaction(txid);
        case 38:
          _tx3 = _context9.sent;
          console.error(_tx3 == null ? void 0 : (_tx3$meta = _tx3.meta) == null ? void 0 : (_tx3$meta$logMessages = _tx3$meta.logMessages) == null ? void 0 : _tx3$meta$logMessages.join('\n'));
        case 40:
          if (simulateResult && simulateResult.err) {
            if (simulateResult.logs) {
              console.error(simulateResult.logs.join('\n'));
            }
          }
          if (!_context9.t0.err) {
            _context9.next = 43;
            break;
          }
          throw _context9.t0.err;
        case 43:
          throw _context9.t0;
        case 44:
          _context9.prev = 44;
          done = true;
          return _context9.finish(44);
        case 47:
          console.log('Latency', txid, getUnixTime() - startTime);
          return _context9.abrupt("return", {
            txid: txid
          });
        case 49:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[7, 22, 44, 47], [28, 34]]);
  }));
  return _sendAndConfirmWithRetry.apply(this, arguments);
}
var getAssociateTokenAccount = function getAssociateTokenAccount(mint, authority) {
  var _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([authority.toBuffer(), splToken.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], splToken.ASSOCIATED_TOKEN_PROGRAM_ID),
    address = _PublicKey$findProgra[0];
  return address;
};
var getOrCreateAssociateTokenAccount = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(connection, wallet, mint, authority) {
    var ata, accountInfo, instructions;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          ata = getAssociateTokenAccount(mint, authority);
          _context4.next = 3;
          return connection.getAccountInfo(ata);
        case 3:
          accountInfo = _context4.sent;
          if (!(accountInfo == null)) {
            _context4.next = 8;
            break;
          }
          instructions = [splToken.createAssociatedTokenAccountInstruction(wallet.publicKey, ata, authority, mint, splToken.TOKEN_PROGRAM_ID, splToken.ASSOCIATED_TOKEN_PROGRAM_ID)];
          _context4.next = 8;
          return sendInstructions(connection, wallet, instructions, []);
        case 8:
          return _context4.abrupt("return", ata);
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getOrCreateAssociateTokenAccount(_x22, _x23, _x24, _x25) {
    return _ref4.apply(this, arguments);
  };
}();
var isEqualAddress = function isEqualAddress(acc_st, acc_nd) {
  if (acc_st === null || acc_st === undefined || acc_nd === null || acc_nd === undefined) return false;
  var pubkey_st = typeof acc_st === 'string' ? acc_st : new web3.PublicKey(acc_st).toBase58();
  var pubkey_nd = typeof acc_nd === 'string' ? acc_nd : new web3.PublicKey(acc_nd).toBase58();
  return pubkey_st === pubkey_nd;
};
var isIncludingAddress = function isIncludingAddress(arr_addr, addr) {
  return arr_addr.filter(function (addr_st) {
    return isEqualAddress(addr, addr_st);
  }).length > 0;
};
var isValidAddress = function isValidAddress(acc) {
  var pubkey = typeof acc === 'string' ? new web3.PublicKey(acc) : acc;
  return web3.PublicKey.isOnCurve(pubkey.toBuffer());
};
var isEmptyAddress = function isEmptyAddress(acc) {
  var pubkey = typeof acc === 'string' ? new web3.PublicKey(acc) : acc;
  return pubkey.toBase58() === '11111111111111111111111111111111';
};
var getAccountsByDiscriminator = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(connection, discriminator, programId) {
    var accounts;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return connection.getProgramAccounts(programId, {
            filters: [{
              memcmp: {
                offset: 0,
                bytes: base58.encode(discriminator)
              }
            }]
          });
        case 2:
          accounts = _context5.sent;
          return _context5.abrupt("return", accounts);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getAccountsByDiscriminator(_x26, _x27, _x28) {
    return _ref5.apply(this, arguments);
  };
}();

var PHRASE_TYPE = {
  general: {
    val: 0,
    label: 'general'
  },
  specific: {
    val: 1,
    label: 'specific'
  },
  cause: {
    val: 2,
    label: 'cause'
  },
  effect: {
    val: 3,
    label: 'effect'
  }
};
(function (RpcTxnStatus) {
  RpcTxnStatus[RpcTxnStatus["Pending"] = 0] = "Pending";
  RpcTxnStatus[RpcTxnStatus["Finalized"] = 1] = "Finalized";
  RpcTxnStatus[RpcTxnStatus["Expired"] = 2] = "Expired";
})(exports.RpcTxnStatus || (exports.RpcTxnStatus = {}));
(function (CampaignStatus) {
  CampaignStatus[CampaignStatus["Upcoming"] = 0] = "Upcoming";
  CampaignStatus[CampaignStatus["Inprogress"] = 1] = "Inprogress";
  CampaignStatus[CampaignStatus["FinishedUnclaimable"] = 2] = "FinishedUnclaimable";
  CampaignStatus[CampaignStatus["FinishedClaimable"] = 3] = "FinishedClaimable";
  CampaignStatus[CampaignStatus["ClosingByRpc"] = 4] = "ClosingByRpc";
  CampaignStatus[CampaignStatus["ClosingByArchitect"] = 5] = "ClosingByArchitect";
  CampaignStatus[CampaignStatus["Closed"] = 6] = "Closed";
  CampaignStatus[CampaignStatus["Expired"] = 7] = "Expired";
})(exports.CampaignStatus || (exports.CampaignStatus = {}));
var METADATA_PROGRAM_ADDRESS = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
var SNS_PAIR = 'SNS/USD';
var LOOKUP_PROGRAM_ADDRESS = 'AddressLookupTab1e1111111111111111111111111';
var LAMPORTS_PER_USDC = 1000000;

var createAirdropSNSInstructions = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicKey, connection, args) {
    var instructions, signers, _PublicKey$findProgra, pdaAccount, _PublicKey$findProgra2, dyfVault, _tokenBalance, dyfVaultTokenAccount, userToken, accountInfo;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (publicKey) {
            _context.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra[0];
          _PublicKey$findProgra2 = web3.PublicKey.findProgramAddressSync([pdaAccount.toBuffer(), Buffer.from('DYF:VAULT')], args.programId), dyfVault = _PublicKey$findProgra2[0];
          _tokenBalance = null;
          _context.next = 11;
          return connection.getParsedAccountInfo(dyfVault);
        case 11:
          dyfVaultTokenAccount = _context.sent;
          if (dyfVaultTokenAccount.value) {
            // @ts-ignore
            _tokenBalance = dyfVaultTokenAccount.value.data.parsed.info.tokenAmount.uiAmount;
          }
          if (!(_tokenBalance === null || _tokenBalance < 100)) {
            _context.next = 15;
            break;
          }
          throw new Error('The token vault is empty. Please contact the administrator.');
        case 15:
          userToken = getAssociateTokenAccount(args.snsMint, publicKey);
          _context.next = 18;
          return connection.getAccountInfo(userToken);
        case 18:
          accountInfo = _context.sent;
          if (accountInfo == null) {
            instructions.push(splToken.createAssociatedTokenAccountInstruction(publicKey, userToken, publicKey, args.snsMint, splToken.TOKEN_PROGRAM_ID, splToken.ASSOCIATED_TOKEN_PROGRAM_ID));
          }
          instructions.push(createAirdropInstruction({
            authority: publicKey,
            userToken: userToken,
            tokenVault: dyfVault,
            pdaAccount: pdaAccount,
            clock: web3.SYSVAR_CLOCK_PUBKEY
          }, args.programId));
          return _context.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createAirdropSNSInstructions(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var submitOntology = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ontology, args) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", axios.post(args.apiHost + "/submit-ontology", [_extends({}, ontology, {
            mock: false
          })], {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (Array.isArray(response.data) && response.data.length >= 2 && Array.isArray(response.data[1])) {
              var submissionCount = response.data[0];
              var ret = response.data[1][0];
              if (ret.toLowerCase() === 'false') {
                return {
                  isSuccess: false,
                  data: 'DUPLICATTION',
                  submissionCount: submissionCount
                };
              } else if (ret.toLowerCase() === 'true') {
                return {
                  isSuccess: false,
                  data: 'CAP_LIMIT',
                  submissionCount: submissionCount
                };
              } else {
                return {
                  isSuccess: true,
                  data: ret,
                  submissionCount: submissionCount
                };
              }
            } else {
              return {
                isSuccess: false,
                data: 'NETWORK_ERROR',
                submissionCount: 0
              };
            }
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function submitOntology(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var deleteOntology = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(canonical, args) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", axios.post(args.apiHost + "/delete-ontology", [{
            reference_id: canonical
          }], {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (response.data && Array.isArray(response.data) && response.data[0] !== 'false' && response.data[0] !== false) {
              return true;
            } else {
              return false;
            }
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function deleteOntology(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var checkWhitelist = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(wallet, args) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", axios.post(args.apiHost + "/check-whitelist", {
            wallet: wallet
          }, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (response.data !== null && response.data !== 'null') {
              return response.data;
            } else {
              return null;
            }
          })["catch"](function (error) {
            console.log(error);
            return null;
          }));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function checkWhitelist(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var addCampaignMeta = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, args) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return axios.post(args.apiHost + "/add-campaign-meta", data, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (res) {
            if (res.data === true || res.data === 'true') return true;else return false;
          });
        case 2:
          return _context4.abrupt("return", _context4.sent);
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function addCampaignMeta(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var delCampaignMeta = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data, args) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", axios.post(args.apiHost + "/del-campaign-meta", data, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (res) {
            if (res.data === true || res.data === 'true') return true;else return false;
          }));
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function delCampaignMeta(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getAllCampaignsInfo = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(args) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", axios.get(args.apiHost + "/all-campaigns-info", {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (!!response.data && Array.isArray(response.data)) {
              return response.data.filter(function (campaignInfo) {
                return campaignInfo.stake_status === true;
              }).map(function (campaignInfo) {
                return {
                  campaignTitle: campaignInfo.title,
                  tag: campaignInfo.campaign_type,
                  pubkey: campaignInfo.campaign_acct,
                  industry: campaignInfo.industry,
                  domain: campaignInfo.domain,
                  subject: campaignInfo.subject,
                  explain: campaignInfo.explain,
                  organizer: campaignInfo.organizer,
                  language: campaignInfo.language,
                  specific: campaignInfo.phrase_specific,
                  general: campaignInfo.phrase_general,
                  cause: campaignInfo.phrase_cause,
                  effect: campaignInfo.phrase_effect,
                  open: Math.round(Date.parse(String(campaignInfo.dapp_open).concat('.000Z')) / 1000),
                  close: Math.round(Date.parse(String(campaignInfo.dapp_close).concat('.000Z')) / 1000),
                  expire: Math.round(Date.parse(String(campaignInfo.dapp_expire).concat('.000Z')) / 1000),
                  minPhrase: campaignInfo.min_phrase,
                  minValidate: campaignInfo.min_validate,
                  rpuSpecific: new BN(campaignInfo.rpu_specific).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                  rpuGeneral: new BN(campaignInfo.rpu_general).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                  rpuCause: new BN(campaignInfo.rpu_cause).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                  rpuEffect: new BN(campaignInfo.rpu_effect).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                  rpuValidator: new BN(campaignInfo.rpu_validator).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                  majorityQuorum: campaignInfo.majority_quorum,
                  minSpecific: campaignInfo.min_specific,
                  minGeneral: campaignInfo.min_general,
                  minCause: campaignInfo.min_cause,
                  minEffect: campaignInfo.min_effect,
                  architect: campaignInfo.architect,
                  finish: campaignInfo.finish_status,
                  progress: campaignInfo.progress,
                  submissions: campaignInfo.submissions,
                  rejections: campaignInfo.rejections,
                  timestamp: Math.round(Date.parse(String(campaignInfo.timestamp).concat('.000Z')) / 1000),
                  deployment: campaignInfo.deployment
                };
              });
            } else {
              return [];
            }
          })["catch"](function (error) {
            console.log(error);
            return [];
          }));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getAllCampaignsInfo(_x11) {
    return _ref6.apply(this, arguments);
  };
}();
var getCampaginMeta = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(dapp_title, args) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", axios.post(args.apiHost + "/campaign-info", {
            dapp_title: dapp_title
          }, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (!!response.data && Array.isArray(response.data)) {
              return {
                dapp_title: response.data[0].title,
                architect: response.data[0].architect,
                subject: response.data[0].subject,
                explain: response.data[0].explain,
                phrase_specific: response.data[0].phrase_specific,
                phrase_general: response.data[0].phrase_general,
                phrase_cause: response.data[0].phrase_cause,
                phrase_effect: response.data[0].phrase_effect
              };
            } else {
              return null;
            }
          })["catch"](function (error) {
            console.log(error);
            return null;
          }));
        case 1:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getCampaginMeta(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var getCampaignInfo = /*#__PURE__*/function () {
  var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(dapp_title, args) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", axios.post(args.apiHost + "/campaign-info", {
            dapp_title: dapp_title
          }, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (!!response.data && Array.isArray(response.data)) {
              if (response.data[0].stake_status !== true) return null;else return {
                campaignTitle: response.data[0].title,
                tag: response.data[0].campaign_type,
                pubkey: response.data[0].campaign_acct,
                industry: response.data[0].industry,
                domain: response.data[0].domain,
                subject: response.data[0].subject,
                explain: response.data[0].explain,
                organizer: response.data[0].organizer,
                language: response.data[0].language,
                specific: response.data[0].phrase_specific,
                general: response.data[0].phrase_general,
                cause: response.data[0].phrase_cause,
                effect: response.data[0].phrase_effect,
                open: Math.round(Date.parse(String(response.data[0].dapp_open).concat('.000Z')) / 1000),
                close: Math.round(Date.parse(String(response.data[0].dapp_close).concat('.000Z')) / 1000),
                expire: Math.round(Date.parse(String(response.data[0].dapp_expire).concat('.000Z')) / 1000),
                minPhrase: response.data[0].min_phrase,
                minValidate: response.data[0].min_validate,
                rpuSpecific: new BN(response.data[0].rpu_specific).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                rpuGeneral: new BN(response.data[0].rpu_general).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                rpuCause: new BN(response.data[0].rpu_cause).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                rpuEffect: new BN(response.data[0].rpu_effect).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                rpuValidator: new BN(response.data[0].rpu_validator).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
                majorityQuorum: response.data[0].majority_quorum,
                minSpecific: response.data[0].min_specific,
                minGeneral: response.data[0].min_general,
                minCause: response.data[0].min_cause,
                minEffect: response.data[0].min_effect,
                architect: response.data[0].architect,
                finish: response.data[0].finish_status,
                progress: response.data[0].progress,
                submissions: response.data[0].submissions,
                rejections: response.data[0].rejections,
                timestamp: Math.round(Date.parse(String(response.data[0].timestamp).concat('.000Z')) / 1000),
                deployment: response.data[0].deployment
              };
            } else {
              return null;
            }
          })["catch"](function (error) {
            console.log(error);
            return null;
          }));
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function getCampaignInfo(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var getSubmissionsValidationsInfo = /*#__PURE__*/function () {
  var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(campaign, wallet, args) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", axios.post(args.apiHost + "/submissions-validations-info", {
            campaign: campaign,
            wallet: wallet
          }, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (!!response.data && Array.isArray(response.data)) {
              return {
                submissions: response.data[0].map(function (submission) {
                  var _Object$values$find, _submission$utterance;
                  return {
                    timestamp: Math.round(Date.parse(String(submission.timestamp).concat('.000Z')) / 1000),
                    kind: ((_Object$values$find = Object.values(PHRASE_TYPE).find(function (row) {
                      return row.val === Number(submission.kind);
                    })) != null ? _Object$values$find : PHRASE_TYPE.specific)['label'],
                    data: submission.data,
                    canonical: submission.reference_id,
                    builder: submission.builder,
                    submitted: submission.utterance ? true : false,
                    pubkey: (_submission$utterance = submission.utterance) != null ? _submission$utterance : undefined,
                    finish: submission.finish,
                    correct: submission.correct,
                    incorrect: submission.incorrect
                  };
                }),
                validations: response.data[1].map(function (validation) {
                  return {
                    timestamp: Math.round(Date.parse(String(validation.timestamp).concat('.000Z')) / 1000),
                    utterance: validation.utterance,
                    validator: validation.validator,
                    vote: validation.vote,
                    confidence: validation.vote_confidence,
                    pubkey: validation.validation
                  };
                })
              };
            } else {
              return {
                submissions: [],
                validations: []
              };
            }
          })["catch"](function (error) {
            console.log(error);
            return {
              submissions: [],
              validations: []
            };
          }));
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function getSubmissionsValidationsInfo(_x16, _x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var getAllCampaignTitles = /*#__PURE__*/function () {
  var _ref10 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(args) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", axios.get(args.apiHost + "/all-campaign-titles", {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (!!response.data && Array.isArray(response.data)) {
              return response.data;
            } else {
              return [];
            }
          })["catch"](function (error) {
            console.log(error);
            return [];
          }));
        case 1:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function getAllCampaignTitles(_x19) {
    return _ref10.apply(this, arguments);
  };
}();
var getBuilderActivityInfo = /*#__PURE__*/function () {
  var _ref11 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(wallet, args) {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", axios.post(args.apiHost + "/get-builder-activity-info", {
            wallet: wallet
          }, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (response.data) {
              return response.data;
            } else {
              return null;
            }
          })["catch"](function (error) {
            console.log(error);
            return null;
          }));
        case 1:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function getBuilderActivityInfo(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();
var getValidatorActivityInfo = /*#__PURE__*/function () {
  var _ref12 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(wallet, args) {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          return _context12.abrupt("return", axios.post(args.apiHost + "/get-validator-activity-info", {
            wallet: wallet
          }, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (response.data) {
              return response.data;
            } else {
              return null;
            }
          })["catch"](function (error) {
            console.log(error);
            return null;
          }));
        case 1:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function getValidatorActivityInfo(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();
var getBuilderRecentSubmissions = /*#__PURE__*/function () {
  var _ref13 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(pubkey, utc_offset, args) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", axios.post(args.apiHost + "/get-builder-recent-submissions", {
            pubkey: pubkey,
            utc_offset: utc_offset
          }, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (response.data && Array.isArray(response.data)) {
              return response.data[0];
            } else {
              return 0;
            }
          })["catch"](function (error) {
            console.log(error);
            return 0;
          }));
        case 1:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function getBuilderRecentSubmissions(_x24, _x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var getValidatorRecentValidations = /*#__PURE__*/function () {
  var _ref14 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(pubkey, utc_offset, args) {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", axios.post(args.apiHost + "/get-validator-recent-submissions", {
            pubkey: pubkey,
            utc_offset: utc_offset
          }, {
            headers: {
              Authorization: args.apiAuth
            }
          }).then(function (response) {
            if (response.data) {
              return response.data;
            } else {
              return 0;
            }
          })["catch"](function (error) {
            console.log(error);
            return 0;
          }));
        case 1:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function getValidatorRecentValidations(_x27, _x28, _x29) {
    return _ref14.apply(this, arguments);
  };
}();

var rpcRequestAuth = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(wallet, args) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", axios.post(args.rpcHost, {
            jsonrpc: '2.0',
            method: 'requestAuth',
            params: [wallet],
            id: 1
          }).then(function (response) {
            if (response.data.error) {
              throw new Error(response.data.error.message);
            }
            if (response.status === 200 && response.data.result) {
              return response.data.result;
            } else {
              return null;
            }
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function rpcRequestAuth(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var rpcVerifyAuth = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(wallet, signature, args) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", axios.post(args.rpcHost, {
            jsonrpc: '2.0',
            method: 'verifyAuth',
            params: [wallet, signature],
            id: 1
          }).then(function (response) {
            if (response.data.error) {
              throw new Error(response.data.error.message);
            }
            if (response.status === 200 && response.data.result) {
              return response.data.result;
            } else {
              return null;
            }
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function rpcVerifyAuth(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var rpcSubmitPhrase = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(token, dyfarmContract, campaignTitle, wallet, offchainReference, offchainType, kind, id, args) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", axios.post(args.rpcHost, {
            jsonrpc: '2.0',
            method: 'SubmitPhrase',
            params: [token, dyfarmContract, campaignTitle, wallet, offchainReference, offchainType, kind],
            id: id
          }).then(function (response) {
            if (response.data.error) {
              throw new Error(response.data.error.message);
            }
            if (response.status === 200 && response.data.result) {
              return response.data.result;
            } else {
              return null;
            }
          }));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function rpcSubmitPhrase(_x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14) {
    return _ref3.apply(this, arguments);
  };
}();
var rpcBatchSubmitPhrases = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(token, dyfarmContract, campaignTitle, wallet, offchainReferences, offchainTypes, kinds, args) {
    var data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(offchainReferences.length !== offchainTypes.length || offchainReferences.length !== kinds.length)) {
            _context4.next = 2;
            break;
          }
          throw new Error('Something is wrong. Invalid data.');
        case 2:
          data = offchainReferences.map(function (offchainReference, idx) {
            return {
              jsonrpc: '2.0',
              method: 'SubmitPhrase',
              params: [token, dyfarmContract, campaignTitle, wallet, offchainReference, offchainTypes[idx], kinds[idx]],
              id: idx + 1
            };
          });
          return _context4.abrupt("return", axios.post(args.rpcHost, data).then(function (response) {
            return response.data.map(function (row) {
              if (row.error) {
                return {
                  isFailed: true,
                  error: row.error.message
                };
              }
              return {
                isFailed: false,
                uuid: row.result
              };
            });
          }));
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function rpcBatchSubmitPhrases(_x15, _x16, _x17, _x18, _x19, _x20, _x21, _x22) {
    return _ref4.apply(this, arguments);
  };
}();
var rpcBatchSubmitVerifiablePhrases = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(params, args) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", axios.post(args.rpcHost, params.map(function (param, idx) {
            return {
              jsonrpc: '2.0',
              method: 'SubmitPhrase',
              params: param,
              id: idx
            };
          })).then(function (response) {
            return response.data.map(function (row) {
              if (row.error) {
                return {
                  isFailed: true,
                  error: row.error.message
                };
              }
              return {
                isFailed: false,
                uuid: row.result
              };
            });
          }));
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function rpcBatchSubmitVerifiablePhrases(_x23, _x24) {
    return _ref5.apply(this, arguments);
  };
}();
var rpcValidatePhrase = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(token, dyfarmContract, campaignTitle, wallet, builder, phraseAccount, canonical, value, confidence, id, args) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", axios.post(args.rpcHost, {
            jsonrpc: '2.0',
            method: 'ValidatePhrase',
            params: [token, dyfarmContract, campaignTitle, wallet, builder, phraseAccount, canonical, confidence, value],
            id: id
          }).then(function (response) {
            if (response.data.error) {
              throw new Error(response.data.error.message);
            }
            if (response.status === 200 && response.data.result) {
              return response.data.result;
            } else {
              return null;
            }
          }));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function rpcValidatePhrase(_x25, _x26, _x27, _x28, _x29, _x30, _x31, _x32, _x33, _x34, _x35) {
    return _ref6.apply(this, arguments);
  };
}();
var rpcBatchValidatePhrase = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(token, dyfarmContract, campaignTitle, wallet, builders, phraseAccounts, canonicals, values, confidences, args) {
    var data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!(phraseAccounts.length !== canonicals.length || phraseAccounts.length !== values.length)) {
            _context7.next = 2;
            break;
          }
          throw new Error('Something is wrong. Invalid data.');
        case 2:
          data = phraseAccounts.map(function (phraseAccount, idx) {
            return {
              jsonrpc: '2.0',
              method: 'ValidatePhrase',
              params: [token, dyfarmContract, campaignTitle, wallet, builders[idx], phraseAccount, canonicals[idx], confidences[idx], values[idx]],
              id: idx + 1
            };
          });
          return _context7.abrupt("return", axios.post(args.rpcHost, data).then(function (response) {
            return response.data.map(function (row) {
              if (row.error) {
                return {
                  isFailed: true,
                  error: row.error.message
                };
              }
              return {
                isFailed: false,
                uuid: row.result
              };
            });
          }));
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function rpcBatchValidatePhrase(_x36, _x37, _x38, _x39, _x40, _x41, _x42, _x43, _x44, _x45) {
    return _ref7.apply(this, arguments);
  };
}();
var rpcBatchValidateVerifiablePhrases = /*#__PURE__*/function () {
  var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(params, args) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", axios.post(args.rpcHost, params.map(function (param, idx) {
            return {
              jsonrpc: '2.0',
              method: 'ValidatePhrase',
              params: param,
              id: idx
            };
          })).then(function (response) {
            return response.data.map(function (row) {
              if (row.error) {
                return {
                  isFailed: true,
                  error: row.error.message
                };
              }
              return {
                isFailed: false,
                uuid: row.result
              };
            });
          }));
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function rpcBatchValidateVerifiablePhrases(_x46, _x47) {
    return _ref8.apply(this, arguments);
  };
}();
var getRpcSubmissionStatus = /*#__PURE__*/function () {
  var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(wallet, campaign, args) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", axios.post(args.rpcHost, {
            jsonrpc: '2.0',
            method: 'getSubmitStatus',
            params: [wallet, campaign],
            id: 1
          }).then(function (response) {
            if (response.status === 200 && response.data && response.data.result && Array.isArray(response.data.result)) {
              return response.data.result.map(function (submission) {
                return {
                  uuid: submission.uid,
                  canonical: submission.reference,
                  status: submission.state === 'Expired' ? exports.RpcTxnStatus.Expired : submission.state === 'Finalized' ? exports.RpcTxnStatus.Finalized : exports.RpcTxnStatus.Pending
                };
              });
            } else {
              return [];
            }
          }));
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function getRpcSubmissionStatus(_x48, _x49, _x50) {
    return _ref9.apply(this, arguments);
  };
}();
var getRpcValidationStatus = /*#__PURE__*/function () {
  var _ref10 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(wallet, campaign, args) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", axios.post(args.rpcHost, {
            jsonrpc: '2.0',
            method: 'getValidateStatus',
            params: [wallet, campaign],
            id: 1
          }).then(function (response) {
            if (response.status === 200 && response.data && response.data.result && Array.isArray(response.data.result)) {
              return response.data.result.map(function (validation) {
                return {
                  uuid: validation.uid,
                  utterance: validation.reference,
                  status: validation.state === 'Expired' ? exports.RpcTxnStatus.Expired : validation.state === 'Finalized' ? exports.RpcTxnStatus.Finalized : exports.RpcTxnStatus.Pending
                };
              });
            } else {
              return [];
            }
          }));
        case 1:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function getRpcValidationStatus(_x51, _x52, _x53) {
    return _ref10.apply(this, arguments);
  };
}();
var getRpcListActivity = /*#__PURE__*/function () {
  var _ref11 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(dyfarmContract, wallet, args) {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", axios.post(args.rpcHost, {
            jsonrpc: '2.0',
            method: 'ListActivity',
            params: [dyfarmContract, wallet],
            id: 1
          }).then(function (response) {
            if (response.status === 200 && response.data && response.data.result && Array.isArray(response.data.result)) {
              return response.data.result.filter(function (row) {
                return row.stake_status === true && row.campaign !== null && row.campaign !== '';
              }).map(function (row) {
                return String(row.campaign);
              });
            } else {
              return [];
            }
          }));
        case 1:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function getRpcListActivity(_x54, _x55, _x56) {
    return _ref11.apply(this, arguments);
  };
}();

var getUtterancesAndHistoriesForArchitect = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicKey, connection, campaignAccountPubkey, args) {
    var campaignAccount, submissionsAndValidationsInfo, submissionsInfo, validationsInfo, objValidationsInfo, submissionsChecked, utterances;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (publicKey) {
            _context.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          campaignAccount = new web3.PublicKey(campaignAccountPubkey);
          _context.next = 7;
          return getSubmissionsValidationsInfo(campaignAccount.toBase58(), publicKey.toBase58(), {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 7:
          submissionsAndValidationsInfo = _context.sent;
          submissionsInfo = submissionsAndValidationsInfo.submissions;
          validationsInfo = submissionsAndValidationsInfo.validations;
          objValidationsInfo = validationsInfo.reduce(function (all, validation) {
            var _all$validation$utter, _extends2;
            var validations = (_all$validation$utter = all[validation.utterance]) != null ? _all$validation$utter : [];
            return _extends({}, all, (_extends2 = {}, _extends2[validation.utterance] = validations.slice().concat(validation), _extends2));
          }, {});
          submissionsChecked = submissionsInfo.filter(function (submission) {
            return submission.submitted;
          });
          utterances = submissionsChecked.map(function (submission) {
            var _objValidationsInfo$s;
            var histories = submission.pubkey ? (_objValidationsInfo$s = objValidationsInfo[submission.pubkey]) != null ? _objValidationsInfo$s : [] : [];
            var history = histories.find(function (history) {
              return isEqualAddress(history.validator, publicKey);
            });
            return {
              timestamp: submission.timestamp,
              kind: submission.kind,
              data: submission.data,
              canonical: submission.canonical,
              builder: submission.builder,
              submitted: true,
              pubkey: submission.pubkey,
              finish: submission.finish,
              correct: submission.correct,
              incorrect: submission.incorrect,
              head: submission.correct + submission.incorrect,
              history: histories,
              validated: history ? history.vote : undefined
            };
          }).sort(function (a, b) {
            return a.timestamp - b.timestamp || a.data.localeCompare(b.data);
          }).reverse();
          return _context.abrupt("return", utterances);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getUtterancesAndHistoriesForArchitect(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var createArchitectCreateCampaignInstructions = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(publicKey, connection, data, args) {
    var instructions, signers, campaignTitle, tag, open, close, expire, minimumStake, rpuValidator, minPhrase, minValidate, majorityQuorum, rpuGeneral, rpuSpecific, rpuCause, rpuEffect, organizer, language, industry, domain, subject, minSpecific, minGeneral, minCause, minEffect, acceptRate, _PublicKey$findProgra, campaignAccount, _PublicKey$findProgra2, campaignVault, _PublicKey$findProgra3, farmConfigAccount, farmConfig, userToken, _PublicKey$findProgra4, pdaAccount, _PublicKey$findProgra5, priceFeed, _PublicKey$findProgra6, dyfVault;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (publicKey) {
            _context2.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context2.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          campaignTitle = data.campaignTitle;
          tag = data.tag;
          open = new BN(data.open);
          close = new BN(data.close);
          expire = new BN(data.expire);
          minimumStake = new BN(100);
          rpuValidator = new BN(data.rpuValidator * LAMPORTS_PER_USDC);
          minPhrase = data.minPhrase;
          minValidate = data.minValidate;
          majorityQuorum = data.majorityQuorum;
          rpuGeneral = new BN(data.rpuGeneral * LAMPORTS_PER_USDC);
          rpuSpecific = new BN(data.rpuSpecific * LAMPORTS_PER_USDC);
          rpuCause = new BN(data.rpuCause * LAMPORTS_PER_USDC);
          rpuEffect = new BN(data.rpuEffect * LAMPORTS_PER_USDC);
          organizer = data.organizer;
          language = data.language;
          industry = data.industry;
          domain = data.domain;
          subject = data.subject;
          minSpecific = new BN(data.minSpecific);
          minGeneral = new BN(data.minGeneral);
          minCause = new BN(data.minCause);
          minEffect = new BN(data.minEffect);
          acceptRate = 60;
          _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId), campaignAccount = _PublicKey$findProgra[0];
          _PublicKey$findProgra2 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:VAULT'), Buffer.from(campaignTitle)], args.programId), campaignVault = _PublicKey$findProgra2[0];
          _PublicKey$findProgra3 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfigAccount = _PublicKey$findProgra3[0];
          _context2.next = 35;
          return FarmConfig.fromAccountAddress(connection, farmConfigAccount, 'processed');
        case 35:
          farmConfig = _context2.sent;
          userToken = getAssociateTokenAccount(args.snsMint, publicKey);
          _PublicKey$findProgra4 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra4[0];
          _PublicKey$findProgra5 = web3.PublicKey.findProgramAddressSync([Buffer.from('PRICE:FEED:CONFIG'), Buffer.from(SNS_PAIR)], farmConfig.oracle), priceFeed = _PublicKey$findProgra5[0];
          _PublicKey$findProgra6 = web3.PublicKey.findProgramAddressSync([pdaAccount.toBuffer(), Buffer.from('DYF:VAULT')], args.programId), dyfVault = _PublicKey$findProgra6[0];
          instructions.push(createCreateCampaignInstruction({
            user: publicKey,
            campaignAccount: campaignAccount,
            campaignVault: campaignVault,
            dyfVault: dyfVault,
            userToken: userToken,
            mint: args.snsMint,
            farmConfig: farmConfigAccount,
            priceFeed: priceFeed,
            pdaAccount: pdaAccount,
            campaignTableAccount: farmConfig.campaignsTables,
            lookupProgram: new web3.PublicKey(LOOKUP_PROGRAM_ADDRESS),
            oracle: farmConfig.oracle,
            clock: web3.SYSVAR_CLOCK_PUBKEY,
            rent: web3.SYSVAR_RENT_PUBKEY
          }, {
            campaignTitle: campaignTitle,
            pair: SNS_PAIR,
            industry: industry,
            domain: domain,
            subject: subject,
            organizer: organizer,
            lang: language,
            kind: tag,
            open: open,
            close: close,
            expire: expire,
            rpuValidator: rpuValidator,
            rpuGeneral: rpuGeneral,
            rpuSpecific: rpuSpecific,
            rpuCause: rpuCause,
            rpuEffect: rpuEffect,
            minBuilder: minPhrase,
            minValidator: minValidate,
            majorityQuorum: majorityQuorum,
            minimumStake: minimumStake,
            minGeneral: minGeneral,
            minSpecific: minSpecific,
            minCause: minCause,
            minEffect: minEffect,
            acceptRate: acceptRate
          }, args.programId));
          return _context2.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 42:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createArchitectCreateCampaignInstructions(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
var createArchitectUpdateCampaignInstructions = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(publicKey, connection, data, args) {
    var instructions, signers, campaignTitle, open, close, expire, _PublicKey$findProgra7, campaignAccount, _PublicKey$findProgra8, farmConfig;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (publicKey) {
            _context3.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context3.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          campaignTitle = data.campaignTitle;
          open = new BN(data.open);
          close = new BN(data.close);
          expire = new BN(data.expire);
          _PublicKey$findProgra7 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(data.campaignTitle)], args.programId), campaignAccount = _PublicKey$findProgra7[0];
          _PublicKey$findProgra8 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfig = _PublicKey$findProgra8[0];
          instructions.push(createUpdateCampaignInstruction({
            user: publicKey,
            campaignAccount: campaignAccount,
            farmConfig: farmConfig
          }, {
            campaignTitle: campaignTitle,
            open: open,
            close: close,
            expire: expire
          }, args.programId));
          return _context3.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createArchitectUpdateCampaignInstructions(_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();
var createArchitectClaimCampaignInstructions = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(publicKey, connection, campaignTitle, args) {
    var instructions, signers, _PublicKey$findProgra9, campaignAccount, _PublicKey$findProgra10, campaignVault, _PublicKey$findProgra11, farmConfigAccount, farmConfig, userToken, _PublicKey$findProgra12, pdaAccount;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (publicKey) {
            _context4.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context4.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra9 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId), campaignAccount = _PublicKey$findProgra9[0];
          _PublicKey$findProgra10 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:VAULT'), Buffer.from(campaignTitle)], args.programId), campaignVault = _PublicKey$findProgra10[0];
          _PublicKey$findProgra11 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfigAccount = _PublicKey$findProgra11[0];
          _context4.next = 11;
          return FarmConfig.fromAccountAddress(connection, farmConfigAccount, 'processed');
        case 11:
          farmConfig = _context4.sent;
          userToken = getAssociateTokenAccount(args.snsMint, publicKey);
          _PublicKey$findProgra12 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra12[0];
          instructions.push(createClaimCampaignInstruction({
            user: publicKey,
            campaignAccount: campaignAccount,
            campaignVault: campaignVault,
            burnWallet: farmConfig.burnWallet,
            platformVault: farmConfig.platformVault,
            userToken: userToken,
            pdaAccount: pdaAccount,
            mint: args.snsMint,
            farmConfig: farmConfigAccount,
            clock: web3.SYSVAR_CLOCK_PUBKEY,
            rent: web3.SYSVAR_RENT_PUBKEY
          }, {
            campaignTitle: campaignTitle
          }, args.programId));
          return _context4.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function createArchitectClaimCampaignInstructions(_x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();
var getUnusedCampaignTitle = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(publicKey, connection, args) {
    var campaignTitle, ret, str, campaignTitles, _PublicKey$findProgra13, campaignAccount, campaignAccountInfo;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (publicKey) {
            _context5.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context5.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          campaignTitle = '';
          ret = 1;
        case 6:
          if (!(ret !== 2)) {
            _context5.next = 24;
            break;
          }
          if (!(ret === 1)) {
            _context5.next = 22;
            break;
          }
          ret = 0;
          str = randomstring.generate(16);
          _context5.next = 12;
          return getAllCampaignTitles({
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 12:
          campaignTitles = _context5.sent;
          if (!campaignTitles.includes(str)) {
            _context5.next = 17;
            break;
          }
          ret = 1;
          _context5.next = 22;
          break;
        case 17:
          _PublicKey$findProgra13 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(str)], args.programId), campaignAccount = _PublicKey$findProgra13[0];
          _context5.next = 20;
          return connection.getParsedAccountInfo(campaignAccount);
        case 20:
          campaignAccountInfo = _context5.sent;
          if (!campaignAccountInfo || !campaignAccountInfo.value) {
            ret = 2;
            campaignTitle = str;
          } else {
            ret = 1;
          }
        case 22:
          _context5.next = 6;
          break;
        case 24:
          return _context5.abrupt("return", campaignTitle);
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getUnusedCampaignTitle(_x17, _x18, _x19) {
    return _ref5.apply(this, arguments);
  };
}();

var bootstrapDev = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicKey, connection, args) {
    var _PublicKey$findProgra, farmConfigAccount, farmConfig;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (publicKey) {
            _context.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfigAccount = _PublicKey$findProgra[0];
          _context.next = 7;
          return FarmConfig.fromAccountAddress(connection, farmConfigAccount, 'processed');
        case 7:
          farmConfig = _context.sent;
          console.log(farmConfig.pretty(), 'farmConfig');
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function bootstrapDev(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getUtterancesAndHistoriesForBuilder = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(publicKey, connection, campaignAccountPubkey, latestSubmittedUuids, args) {
    var campaignAccount, submissionsAndValidationsInfo, submissionsInfo, validationsInfo, rpcSubmissions, objSubmissionsInfo, objValidationsInfo, objRpcSubmissions, utterancesChecked, utterancesPre, utterancesQueued, utterancesExpired, submissionsChecked, submissionsPre, submissionsNotSubmittedButRpcFinalizedOrExpired, submissionsNotSubmittedAndRpcPending, utterances;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (publicKey) {
            _context2.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context2.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          campaignAccount = new web3.PublicKey(campaignAccountPubkey);
          _context2.next = 7;
          return getSubmissionsValidationsInfo(campaignAccount.toBase58(), publicKey.toBase58(), {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 7:
          submissionsAndValidationsInfo = _context2.sent;
          submissionsInfo = submissionsAndValidationsInfo.submissions;
          validationsInfo = submissionsAndValidationsInfo.validations;
          _context2.next = 12;
          return getRpcSubmissionStatus(publicKey.toBase58(), campaignAccount.toBase58(), {
            rpcHost: args.rpcHost
          });
        case 12:
          rpcSubmissions = _context2.sent;
          objSubmissionsInfo = submissionsInfo.reduce(function (all, submission) {
            var _extends2;
            return _extends({}, all, (_extends2 = {}, _extends2[submission.canonical] = submission, _extends2));
          }, {});
          objValidationsInfo = validationsInfo.reduce(function (all, validation) {
            var _all$validation$utter, _extends3;
            var validations = (_all$validation$utter = all[validation.utterance]) != null ? _all$validation$utter : [];
            return _extends({}, all, (_extends3 = {}, _extends3[validation.utterance] = validations.slice().concat(validation), _extends3));
          }, {});
          objRpcSubmissions = rpcSubmissions.reduce(function (all, submission) {
            var _extends4;
            return _extends({}, all, (_extends4 = {}, _extends4[submission.canonical] = submission, _extends4));
          }, {});
          utterancesChecked = [];
          utterancesPre = [];
          utterancesQueued = [];
          utterancesExpired = [];
          submissionsChecked = [];
          submissionsInfo.forEach(function (submission) {
            if (submission.submitted) submissionsChecked.push(submission);
          });
          submissionsChecked.forEach(function (submission) {
            var _objValidationsInfo$s;
            var histories = submission.pubkey ? (_objValidationsInfo$s = objValidationsInfo[submission.pubkey]) != null ? _objValidationsInfo$s : [] : [];
            var history = histories.find(function (history) {
              return isEqualAddress(history.validator, publicKey);
            });
            utterancesChecked.push({
              timestamp: submission.timestamp,
              kind: submission.kind,
              data: submission.data,
              canonical: submission.canonical,
              builder: submission.builder,
              submitted: true,
              pubkey: submission.pubkey,
              finish: submission.finish,
              correct: submission.correct,
              incorrect: submission.incorrect,
              head: submission.correct + submission.incorrect,
              history: histories,
              validated: history ? history.vote : undefined
            });
          });
          submissionsPre = [];
          submissionsInfo.forEach(function (submission) {
            if (!submission.submitted && !objRpcSubmissions[submission.canonical]) submissionsPre.push(submission);
          });
          submissionsPre.forEach(function (submission) {
            utterancesPre.push({
              timestamp: submission.timestamp,
              kind: submission.kind,
              data: submission.data,
              canonical: submission.canonical,
              builder: submission.builder,
              submitted: false
            });
          });
          submissionsNotSubmittedButRpcFinalizedOrExpired = [];
          submissionsInfo.forEach(function (submission) {
            if (!submission.submitted && objRpcSubmissions[submission.canonical] && (objRpcSubmissions[submission.canonical].status === exports.RpcTxnStatus.Finalized || objRpcSubmissions[submission.canonical].status === exports.RpcTxnStatus.Expired)) submissionsNotSubmittedButRpcFinalizedOrExpired.push(submission);
          });
          _context2.next = 30;
          return Promise.all(submissionsNotSubmittedButRpcFinalizedOrExpired.map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(submission) {
              var _PublicKey$findProgra, phraseAccount, phrase, _objValidationsInfo$p, _Object$values$find, histories, history;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:PHRASE'), campaignAccount.toBuffer(), Buffer.from(submission.canonical)], args.programId), phraseAccount = _PublicKey$findProgra[0];
                    _context.prev = 1;
                    _context.next = 4;
                    return Phrase.fromAccountAddress(connection, phraseAccount, 'processed');
                  case 4:
                    phrase = _context.sent;
                    if (isEqualAddress(phrase.builder, publicKey)) {
                      _context.next = 9;
                      break;
                    }
                    throw new Error('RPC Submission Expired');
                  case 9:
                    histories = (_objValidationsInfo$p = objValidationsInfo[phraseAccount.toBase58()]) != null ? _objValidationsInfo$p : [];
                    history = histories.find(function (history) {
                      return isEqualAddress(history.validator, publicKey);
                    });
                    utterancesChecked.push({
                      timestamp: new BN(phrase.timestamp).toNumber(),
                      kind: ((_Object$values$find = Object.values(PHRASE_TYPE).find(function (row) {
                        return row.val === Number(phrase.kind);
                      })) != null ? _Object$values$find : PHRASE_TYPE.specific)['label'],
                      data: objSubmissionsInfo[submission.canonical].data,
                      canonical: submission.canonical,
                      builder: phrase.builder.toBase58(),
                      submitted: true,
                      pubkey: phraseAccount.toBase58(),
                      finish: phrase.finish,
                      correct: phrase.correct,
                      incorrect: phrase.incorrect,
                      head: phrase.head,
                      history: histories,
                      validated: history ? history.vote : undefined
                    });
                  case 12:
                    _context.next = 17;
                    break;
                  case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](1);
                    if (latestSubmittedUuids.includes(objRpcSubmissions[submission.canonical].uuid)) {
                      utterancesExpired.push({
                        timestamp: submission.timestamp,
                        kind: submission.kind,
                        data: submission.data,
                        canonical: submission.canonical,
                        builder: submission.builder,
                        submitted: false,
                        expired: true
                      });
                    } else {
                      utterancesPre.push({
                        timestamp: submission.timestamp,
                        kind: submission.kind,
                        data: submission.data,
                        canonical: submission.canonical,
                        builder: submission.builder,
                        submitted: false
                      });
                    }
                  case 17:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[1, 14]]);
            }));
            return function (_x6) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 30:
          submissionsNotSubmittedAndRpcPending = [];
          submissionsInfo.forEach(function (submission) {
            if (!submission.submitted && objRpcSubmissions[submission.canonical] && objRpcSubmissions[submission.canonical].status === exports.RpcTxnStatus.Pending) submissionsNotSubmittedAndRpcPending.push(submission);
          });
          submissionsNotSubmittedAndRpcPending.forEach(function (submission) {
            utterancesQueued.push({
              timestamp: submission.timestamp,
              kind: submission.kind,
              data: submission.data,
              canonical: submission.canonical,
              builder: submission.builder,
              submitted: false,
              uuid: objRpcSubmissions[submission.canonical].uuid
            });
          });
          utterances = utterancesChecked.concat(utterancesQueued).concat(utterancesPre).concat(utterancesExpired).sort(function (a, b) {
            return a.timestamp - b.timestamp || a.data.localeCompare(b.data);
          }).reverse();
          return _context2.abrupt("return", utterances);
        case 35:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getUtterancesAndHistoriesForBuilder(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var createUtteranceByOntology = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(publicKey, ontology, args) {
    var resp, canonical, utterance;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (publicKey) {
            _context3.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          _context3.next = 4;
          return submitOntology(ontology, {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 4:
          resp = _context3.sent;
          if (resp.isSuccess) {
            _context3.next = 19;
            break;
          }
          if (!(resp.data === 'NETWORK_ERROR')) {
            _context3.next = 10;
            break;
          }
          throw new Error('Network Error.');
        case 10:
          if (!(resp.data === 'DUPLICATTION')) {
            _context3.next = 14;
            break;
          }
          throw new Error("This utterance already exists in the organizer's knowledge base.");
        case 14:
          if (!(resp.data === 'CAP_LIMIT')) {
            _context3.next = 18;
            break;
          }
          throw new Error(resp.submissionCount + " Submissions for " + ontology.utterance_type + " already exists. No more are allowed under the submissions cap.");
        case 18:
          throw new Error('Something went wrong. Please reload page.');
        case 19:
          canonical = resp.data;
          utterance = {
            timestamp: Date.now(),
            kind: ontology.utterance_type,
            data: ontology.utterance,
            canonical: canonical,
            builder: publicKey.toBase58(),
            submitted: false
          };
          return _context3.abrupt("return", utterance);
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createUtteranceByOntology(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteOntologyByCanonical = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(canonical, args) {
    var ret;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(!canonical || canonical === '')) {
            _context4.next = 2;
            break;
          }
          throw new Error('Invalid canonical.');
        case 2:
          _context4.next = 4;
          return deleteOntology(canonical, {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 4:
          ret = _context4.sent;
          if (ret) {
            _context4.next = 7;
            break;
          }
          throw new Error('Ontology submission failed.');
        case 7:
          return _context4.abrupt("return", ret);
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function deleteOntologyByCanonical(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
var createBuilderSubmitUtterancesInstructions = function createBuilderSubmitUtterancesInstructions(publicKey, connection, campaignTitle, utterances, args) {
  if (!publicKey) throw new Error('PublicKey is undefined');
  if (!connection) throw new Error('Connection is undefined');
  var instructions = [];
  var signers = [];
  var _PublicKey$findProgra2 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId),
    campaignAccount = _PublicKey$findProgra2[0];
  var _PublicKey$findProgra3 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId),
    farmConfig = _PublicKey$findProgra3[0];
  var _PublicKey$findProgra4 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId),
    userProfile = _PublicKey$findProgra4[0];
  var _PublicKey$findProgra5 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignTitle), publicKey.toBuffer()], args.programId),
    campaignActivity = _PublicKey$findProgra5[0];
  instructions = utterances.map(function (utterance) {
    var _PublicKey$findProgra6 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:PHRASE'), campaignAccount.toBuffer(), Buffer.from(utterance.canonical)], args.programId),
      phraseAccount = _PublicKey$findProgra6[0];
    return createSubmitPhraseInstruction({
      user: publicKey,
      phraseAccount: phraseAccount,
      userProfile: userProfile,
      campaignActivity: campaignActivity,
      campaignAccount: campaignAccount,
      farmConfig: farmConfig,
      clock: web3.SYSVAR_CLOCK_PUBKEY
    }, {
      campaignTitle: campaignTitle,
      offchainRef: utterance.canonical,
      offchainType: exports.Offchain.S3,
      kind: PHRASE_TYPE[utterance.kind.toLowerCase()].val
    }, args.programId);
  });
  return {
    instructions: instructions,
    signers: signers
  };
};
var createRpcSubmitUtterancesPromises = function createRpcSubmitUtterancesPromises(publicKey, connection, rpcAuthToken, campaignTitle, batchUtterances, args) {
  if (!publicKey) throw new Error('PublicKey is undefined');
  if (!connection) throw new Error('Connection is undefined');
  if (!rpcAuthToken || rpcAuthToken === '') throw new Error('RPC Auth Token is undefined');
  var returnArgs = batchUtterances.map(function (_utterances) {
    return [rpcAuthToken, args.programId.toBase58(), campaignTitle, publicKey.toBase58(), _utterances.map(function (utterance) {
      return utterance.canonical;
    }), _utterances.map(function () {
      return exports.Offchain.S3;
    }), _utterances.map(function (utterance) {
      return PHRASE_TYPE[String(utterance.kind).toLowerCase()].val;
    }), {
      rpcHost: args.rpcHost
    }];
  });
  return {
    promise: rpcBatchSubmitPhrases,
    args: returnArgs
  };
};
var createRpcSubmitVerifiableUtterancesPromise = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(publicKey, signMessage, rpcAuthToken, campaignTitle, utterances, args) {
    var messages, hashes, tree, merkleRaw, merkleRoot, signed, ixBases;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (publicKey) {
            _context5.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (signMessage) {
            _context5.next = 4;
            break;
          }
          throw new Error('signMessage is undefined');
        case 4:
          if (!(!rpcAuthToken || rpcAuthToken === '')) {
            _context5.next = 6;
            break;
          }
          throw new Error('RPC Auth Token is undefined');
        case 6:
          messages = utterances.map(function (utterance) {
            return [args.programId.toBase58(), campaignTitle, publicKey.toBase58(), utterance.canonical, exports.Offchain.S3, PHRASE_TYPE[String(utterance.kind).toLowerCase()].val];
          });
          hashes = messages.map(function (message) {
            return tsMd5.Md5.hashStr(JSON.stringify(message));
          });
          tree = new merkletreejs.MerkleTree(hashes, keccak256, {
            sortPairs: true,
            hashLeaves: true
          });
          merkleRaw = tree.getRoot();
          merkleRoot = Buffer.from(merkleRaw.toString('hex'));
          _context5.next = 13;
          return signMessage(merkleRoot);
        case 13:
          signed = _context5.sent;
          ixBases = hashes.map(function (hash, idx) {
            var leaf = keccak256(hash);
            var proof = tree.getProof(leaf, idx);
            var merkleProof = proof.map(function (p) {
              return p.data;
            });
            var proofBuffer = Buffer.from('');
            for (var i = 0; i < merkleProof.length; i++) {
              proofBuffer = Buffer.concat([proofBuffer, merkleProof[i]]);
            }
            var ixData = Buffer.concat([merkleRoot, signed, proofBuffer]);
            console.log('ixData: ', ixData.length);
            return Buffer.from(ixData).toString('base64');
          });
          return _context5.abrupt("return", messages.map(function (message, idx) {
            return [rpcAuthToken].concat(message, [ixBases[idx]]);
          }));
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function createRpcSubmitVerifiableUtterancesPromise(_x12, _x13, _x14, _x15, _x16, _x17) {
    return _ref5.apply(this, arguments);
  };
}();

var getCampaignFromCampaignAccount = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicKey, connection, campaignTitle, args) {
    var _role;
    var campaignMeta, _PublicKey$findProgra, campaignAccount, campaign, _PublicKey$findProgra2, campaignActivityAccount, stakeStatus, role, campaignActivity, _PublicKey$findProgra3, userProfile, profile, status;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (publicKey) {
            _context.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _context.next = 6;
          return getCampaginMeta(campaignTitle, {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 6:
          campaignMeta = _context.sent;
          if (campaignMeta) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return");
        case 9:
          _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignMeta.dapp_title)], args.programId), campaignAccount = _PublicKey$findProgra[0]; // @ts-ignore
          campaign = undefined;
          _context.prev = 11;
          _context.next = 14;
          return Campaign.fromAccountAddress(connection, campaignAccount, 'processed');
        case 14:
          campaign = _context.sent;
          _context.next = 19;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](11);
        case 19:
          if (!(campaign === undefined)) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return");
        case 21:
          _PublicKey$findProgra2 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignMeta.dapp_title), publicKey.toBuffer()], args.programId), campaignActivityAccount = _PublicKey$findProgra2[0];
          stakeStatus = false;
          role = undefined;
          _context.prev = 24;
          _context.next = 27;
          return CampaignActivity.fromAccountAddress(connection, campaignActivityAccount, 'processed');
        case 27:
          campaignActivity = _context.sent;
          _PublicKey$findProgra3 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra3[0];
          _context.next = 31;
          return Profile.fromAccountAddress(connection, userProfile, 'processed');
        case 31:
          profile = _context.sent;
          role = profile.role;
          if (!new BN(campaignActivity.stakeAmount).eqn(0)) stakeStatus = true;
          _context.next = 38;
          break;
        case 36:
          _context.prev = 36;
          _context.t1 = _context["catch"](24);
        case 38:
          _context.next = 40;
          return getCampaignStatusFromCampaignTitle(publicKey, connection, (_role = role) != null ? _role : exports.Role.Architect, campaignTitle, {
            programId: args.programId,
            stopOffset: args.stopOffset
          });
        case 40:
          status = _context.sent;
          return _context.abrupt("return", {
            campaignTitle: campaignMeta.dapp_title,
            tag: campaign.tag,
            pubkey: campaignAccount.toBase58(),
            industry: decodeText(campaign.industry),
            domain: decodeText(campaign.domain),
            subject: decodeText(campaign.subject),
            explain: campaignMeta.explain,
            organizer: decodeText(campaign.organizer),
            language: decodeText(campaign.lang),
            specific: campaignMeta.phrase_specific,
            general: campaignMeta.phrase_general,
            cause: campaignMeta.phrase_cause,
            effect: campaignMeta.phrase_effect,
            open: new BN(campaign.open).toNumber(),
            stop: new BN(campaign.close).toNumber() - args.stopOffset,
            close: new BN(campaign.close).toNumber(),
            expire: new BN(campaign.expire).toNumber(),
            minStake: new BN(campaign.minStake).toNumber(),
            minPhrase: Number(campaign.minPhrase),
            minValidate: Number(campaign.minValidate),
            rpuSpecific: new BN(campaign.rpuSpecific).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
            rpuGeneral: new BN(campaign.rpuGeneral).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
            rpuCause: new BN(campaign.rpuCause).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
            rpuEffect: new BN(campaign.rpuEffect).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
            rpuValidator: new BN(campaign.rpuValidator).divn(web3.LAMPORTS_PER_SOL / 100).toNumber() / 100,
            minSpecific: new BN(campaign.minSpecific).toNumber(),
            minGeneral: new BN(campaign.minGeneral).toNumber(),
            minCause: new BN(campaign.minCause).toNumber(),
            minEffect: new BN(campaign.minEffect).toNumber(),
            majorityQuorum: Number(campaign.majorityQuorum),
            architect: campaign.architect.toBase58(),
            finish: campaign.finish,
            utterances: [],
            progress: 0,
            submissions: 0,
            rejections: 0,
            timestamp: Math.round(Date.now() / 1000),
            deployment: args.deployment,
            status: status,
            stakeStatus: stakeStatus
          });
        case 42:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[11, 17], [24, 36]]);
  }));
  return function getCampaignFromCampaignAccount(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var getCampaignFromCampaignInfo = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(publicKey, connection, campaignTitle, role, args) {
    var campaignInfo, _PublicKey$findProgra4, campaignActivityAccount, stakeStatus, campaignActivity, status;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (publicKey) {
            _context2.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context2.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _context2.next = 6;
          return getCampaignInfo(campaignTitle, {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 6:
          campaignInfo = _context2.sent;
          if (campaignInfo) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return");
        case 9:
          _PublicKey$findProgra4 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignInfo.campaignTitle), publicKey.toBuffer()], args.programId), campaignActivityAccount = _PublicKey$findProgra4[0];
          stakeStatus = false;
          _context2.prev = 11;
          _context2.next = 14;
          return CampaignActivity.fromAccountAddress(connection, campaignActivityAccount, 'processed');
        case 14:
          campaignActivity = _context2.sent;
          if (!new BN(campaignActivity.stakeAmount).eqn(0)) stakeStatus = true;
          _context2.next = 20;
          break;
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](11);
        case 20:
          _context2.next = 22;
          return getCampaignStatusFromCampaignTitle(publicKey, connection, role != null ? role : exports.Role.Architect, campaignTitle, {
            programId: args.programId,
            stopOffset: args.stopOffset
          });
        case 22:
          status = _context2.sent;
          return _context2.abrupt("return", _extends({}, campaignInfo, {
            stop: campaignInfo.close - args.stopOffset,
            minStake: 100,
            utterances: [],
            status: status,
            stakeStatus: stakeStatus
          }));
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[11, 18]]);
  }));
  return function getCampaignFromCampaignInfo(_x5, _x6, _x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllCampaigns = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(publicKey, connection, args) {
    var _role2;
    var campaignsInfo, role, _PublicKey$findProgra5, userProfile, profile, campaignTitles, campaignsStatus, campaignActivityAccountsInfo, campaignActivities, campaigns;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (publicKey) {
            _context3.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context3.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _context3.next = 6;
          return getAllCampaignsInfo({
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 6:
          campaignsInfo = _context3.sent;
          role = undefined;
          _context3.prev = 8;
          _PublicKey$findProgra5 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra5[0];
          _context3.next = 12;
          return Profile.fromAccountAddress(connection, userProfile, 'processed');
        case 12:
          profile = _context3.sent;
          role = profile.role;
          _context3.next = 18;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](8);
        case 18:
          campaignTitles = campaignsInfo.map(function (campaignInfo) {
            return campaignInfo.campaignTitle;
          });
          _context3.next = 21;
          return getCampaignStatusFromCampaignTitles(publicKey, connection, (_role2 = role) != null ? _role2 : exports.Role.Architect, campaignTitles, {
            programId: args.programId,
            stopOffset: args.stopOffset
          });
        case 21:
          campaignsStatus = _context3.sent;
          _context3.next = 24;
          return connection.getProgramAccounts(args.programId, {
            filters: [{
              memcmp: {
                offset: 0,
                bytes: base58.encode(campaignActivityDiscriminator)
              }
            }, {
              memcmp: {
                offset: 8,
                bytes: base58.encode(publicKey.toBytes())
              }
            }]
          });
        case 24:
          campaignActivityAccountsInfo = _context3.sent;
          campaignActivities = campaignActivityAccountsInfo.map(function (accountInfo) {
            return CampaignActivity.deserialize(accountInfo.account.data)[0];
          });
          campaigns = campaignsInfo.map(function (campaignInfo) {
            var campaignActivity = campaignActivities.find(function (row) {
              return isEqualAddress(row.campaign, campaignInfo.pubkey);
            });
            var stakeStatus = campaignActivity ? !new BN(campaignActivity.stakeAmount).eqn(0) : false;
            return _extends({}, campaignInfo, {
              stop: campaignInfo.close - args.stopOffset,
              minStake: 100,
              utterances: [],
              status: campaignsStatus.find(function (row) {
                return row.campaignTitle === campaignInfo.campaignTitle;
              }).status,
              stakeStatus: role === undefined ? false : stakeStatus
            });
          });
          return _context3.abrupt("return", campaigns);
        case 28:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[8, 16]]);
  }));
  return function getAllCampaigns(_x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();
var getAppRole = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(publicKey, args) {
    var role;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (publicKey) {
            _context4.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          _context4.next = 4;
          return checkWhitelist(publicKey.toBase58(), {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 4:
          role = _context4.sent;
          return _context4.abrupt("return", role === null ? undefined : exports.Role[_.capitalize(role)] ? exports.Role[_.capitalize(role)] : exports.Role.Builder);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getAppRole(_x13, _x14) {
    return _ref4.apply(this, arguments);
  };
}();
var getCampaignStatusFromCampaignTitle = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(publicKey, connection, role, campaignTitle, args) {
    var _PublicKey$findProgra6, farmConfigAccount, farmConfig, _PublicKey$findProgra7, campaignAccount, campaign;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (publicKey) {
            _context5.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context5.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _PublicKey$findProgra6 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfigAccount = _PublicKey$findProgra6[0];
          _context5.next = 7;
          return FarmConfig.fromAccountAddress(connection, farmConfigAccount, 'processed');
        case 7:
          farmConfig = _context5.sent;
          _PublicKey$findProgra7 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId), campaignAccount = _PublicKey$findProgra7[0];
          _context5.prev = 9;
          _context5.next = 12;
          return Campaign.fromAccountAddress(connection, campaignAccount, 'processed');
        case 12:
          campaign = _context5.sent;
          return _context5.abrupt("return", getCampaignStatusFromCampaignAccount(campaign, farmConfig, role, {
            stopOffset: args.stopOffset
          }));
        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](9);
          return _context5.abrupt("return", exports.CampaignStatus.Closed);
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[9, 16]]);
  }));
  return function getCampaignStatusFromCampaignTitle(_x15, _x16, _x17, _x18, _x19) {
    return _ref5.apply(this, arguments);
  };
}();
var getCampaignStatusFromCampaignTitles = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(publicKey, connection, role, campaignTitles, args) {
    var _PublicKey$findProgra8, farmConfigAccount, farmConfig, campaignAccountsInfo, liveCampaigns, liveCampaignsStatus;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (publicKey) {
            _context6.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context6.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _PublicKey$findProgra8 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfigAccount = _PublicKey$findProgra8[0];
          _context6.next = 7;
          return FarmConfig.fromAccountAddress(connection, farmConfigAccount, 'processed');
        case 7:
          farmConfig = _context6.sent;
          _context6.next = 10;
          return getAccountsByDiscriminator(connection, new Uint8Array(campaignDiscriminator), args.programId);
        case 10:
          campaignAccountsInfo = _context6.sent;
          liveCampaigns = campaignAccountsInfo.map(function (accountInfo) {
            try {
              return Campaign.deserialize(accountInfo.account.data)[0];
            } catch (e) {
              return null;
            }
          }).filter(function (row) {
            return !_.isNull(row);
          });
          liveCampaignsStatus = liveCampaigns.map(function (campaign) {
            return {
              campaignTitle: decodeText(campaign.title),
              status: getCampaignStatusFromCampaignAccount(campaign, farmConfig, role, {
                stopOffset: args.stopOffset
              })
            };
          });
          return _context6.abrupt("return", campaignTitles.map(function (campaignTitle) {
            var live = liveCampaignsStatus.find(function (row) {
              return row.campaignTitle === campaignTitle;
            });
            if (live) return live;else return {
              campaignTitle: campaignTitle,
              status: exports.CampaignStatus.Closed
            };
          }));
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getCampaignStatusFromCampaignTitles(_x20, _x21, _x22, _x23, _x24) {
    return _ref6.apply(this, arguments);
  };
}();
var getCampaignStatusFromCampaignAccount = function getCampaignStatusFromCampaignAccount(campaign, farmConfig, role, args) {
  var timenow = Math.floor(Date.now() / 1000);
  var open = new BN(campaign.open).toNumber();
  var stop = new BN(campaign.close).toNumber() - args.stopOffset;
  var close = new BN(campaign.close).toNumber();
  var finish = campaign.finish;
  var finishTime = new BN(campaign.finishTime).toNumber();
  var claimPeriod = new BN(farmConfig.claimPeriod).toNumber();
  var rpcClosePeriod = new BN(farmConfig.rpcClosePeriod).toNumber();
  if (timenow <= open) {
    return exports.CampaignStatus.Upcoming;
  }
  if (finish && finishTime < close) {
    // Completed_Campaign
    if (timenow <= finishTime + claimPeriod) {
      return exports.CampaignStatus.FinishedClaimable;
    } else if (timenow <= finishTime + claimPeriod + rpcClosePeriod) {
      return exports.CampaignStatus.ClosingByRpc;
    } else {
      return exports.CampaignStatus.ClosingByArchitect;
    }
  } else if (!finish) {
    // Incompleted_Campaign
    if (timenow <= close) {
      if (role === exports.Role.Builder) {
        if (timenow <= stop) {
          return exports.CampaignStatus.Inprogress;
        } else {
          return exports.CampaignStatus.FinishedUnclaimable;
        }
      } else {
        return exports.CampaignStatus.Inprogress;
      }
    } else {
      return exports.CampaignStatus.FinishedClaimable;
    }
  } else {
    // Incompleted_Campaign
    if (timenow <= finishTime + claimPeriod) {
      return exports.CampaignStatus.FinishedClaimable;
    } else if (timenow <= finishTime + claimPeriod + rpcClosePeriod) {
      return exports.CampaignStatus.ClosingByRpc;
    } else {
      return exports.CampaignStatus.ClosingByArchitect;
    }
  }
};

var createStakeCampaignInstructions = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicKey, connection, amount, campaignTitle, args) {
    var instructions, signers, _PublicKey$findProgra, userProfile, _PublicKey$findProgra2, farmConfig, _PublicKey$findProgra3, campaignAccount, userToken, _PublicKey$findProgra4, campaignActivity, _PublicKey$findProgra5, campaignVault, accountInfo;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (publicKey) {
            _context.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra[0];
          _PublicKey$findProgra2 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfig = _PublicKey$findProgra2[0];
          _PublicKey$findProgra3 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId), campaignAccount = _PublicKey$findProgra3[0];
          userToken = getAssociateTokenAccount(args.snsMint, publicKey);
          _PublicKey$findProgra4 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignTitle), publicKey.toBuffer()], args.programId), campaignActivity = _PublicKey$findProgra4[0];
          _PublicKey$findProgra5 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:VAULT'), Buffer.from(campaignTitle)], args.programId), campaignVault = _PublicKey$findProgra5[0];
          _context.next = 14;
          return connection.getAccountInfo(userToken, 'processed');
        case 14:
          accountInfo = _context.sent;
          if (accountInfo == null) {
            instructions.push(splToken.createAssociatedTokenAccountInstruction(publicKey, userToken, publicKey, args.snsMint, splToken.TOKEN_PROGRAM_ID, splToken.ASSOCIATED_TOKEN_PROGRAM_ID));
          }
          instructions.push(createStakeCampaignInstruction({
            user: publicKey,
            userProfile: userProfile,
            campaignActivity: campaignActivity,
            userToken: userToken,
            campaignAccount: campaignAccount,
            campaignVault: campaignVault,
            farmConfig: farmConfig,
            clock: web3.SYSVAR_CLOCK_PUBKEY
          }, {
            campaignTitle: campaignTitle,
            amount: new BN(amount)
          }, args.programId));
          return _context.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createStakeCampaignInstructions(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var createUnstakeCampaignInstructions = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(publicKey, connection, campaignTitle, args) {
    var instructions, signers, _PublicKey$findProgra6, userProfile, _PublicKey$findProgra7, campaignAccount, _PublicKey$findProgra8, campaignVault, _PublicKey$findProgra9, pdaAccount, _PublicKey$findProgra10, dyfVault, _PublicKey$findProgra11, campaignActivity, _PublicKey$findProgra12, farmConfig, userToken;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (publicKey) {
            _context2.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context2.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra6 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra6[0];
          _PublicKey$findProgra7 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId), campaignAccount = _PublicKey$findProgra7[0];
          _PublicKey$findProgra8 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:VAULT'), Buffer.from(campaignTitle)], args.programId), campaignVault = _PublicKey$findProgra8[0];
          _PublicKey$findProgra9 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra9[0];
          _PublicKey$findProgra10 = web3.PublicKey.findProgramAddressSync([pdaAccount.toBuffer(), Buffer.from('DYF:VAULT')], args.programId), dyfVault = _PublicKey$findProgra10[0];
          _PublicKey$findProgra11 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignTitle), publicKey.toBuffer()], args.programId), campaignActivity = _PublicKey$findProgra11[0];
          _PublicKey$findProgra12 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfig = _PublicKey$findProgra12[0];
          userToken = getAssociateTokenAccount(args.snsMint, publicKey);
          instructions.push(createUnstakeCampaignInstruction({
            user: publicKey,
            userProfile: userProfile,
            userToken: userToken,
            campaignAccount: campaignAccount,
            campaignVault: campaignVault,
            dyfVault: dyfVault,
            campaignActivity: campaignActivity,
            farmConfig: farmConfig,
            pdaAccount: pdaAccount,
            clock: web3.SYSVAR_CLOCK_PUBKEY
          }, {
            campaignTitle: campaignTitle
          }, args.programId));
          return _context2.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createUnstakeCampaignInstructions(_x6, _x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();
var createClaimRewardInstructions = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(publicKey, connection, campaignTitle, args) {
    var instructions, signers, _PublicKey$findProgra13, userProfile, userToken, _PublicKey$findProgra14, campaignAccount, _PublicKey$findProgra15, campaignActivity, _PublicKey$findProgra16, campaignVault, _PublicKey$findProgra17, farmConfig, _PublicKey$findProgra18, pdaAccount, _PublicKey$findProgra19, dyfVault;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (publicKey) {
            _context3.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context3.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra13 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra13[0];
          userToken = getAssociateTokenAccount(args.snsMint, publicKey);
          _PublicKey$findProgra14 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId), campaignAccount = _PublicKey$findProgra14[0];
          _PublicKey$findProgra15 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignTitle), publicKey.toBuffer()], args.programId), campaignActivity = _PublicKey$findProgra15[0];
          _PublicKey$findProgra16 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:VAULT'), Buffer.from(campaignTitle)], args.programId), campaignVault = _PublicKey$findProgra16[0];
          _PublicKey$findProgra17 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfig = _PublicKey$findProgra17[0];
          _PublicKey$findProgra18 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra18[0];
          _PublicKey$findProgra19 = web3.PublicKey.findProgramAddressSync([pdaAccount.toBuffer(), Buffer.from('DYF:VAULT')], args.programId), dyfVault = _PublicKey$findProgra19[0];
          instructions.push(createClaimRewardInstruction({
            user: publicKey,
            userProfile: userProfile,
            userToken: userToken,
            campaignAccount: campaignAccount,
            campaignActivity: campaignActivity,
            campaignVault: campaignVault,
            farmConfig: farmConfig,
            pdaAccount: pdaAccount,
            dyfVault: dyfVault,
            clock: web3.SYSVAR_CLOCK_PUBKEY
          }, {
            campaignTitle: campaignTitle
          }, args.programId));
          return _context3.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createClaimRewardInstructions(_x10, _x11, _x12, _x13) {
    return _ref3.apply(this, arguments);
  };
}();
var createBatchClaimRewardInstructions = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(publicKey, connection, campaignTitles, args) {
    var _PublicKey$findProgra20, userProfile, userToken, _PublicKey$findProgra21, farmConfig, _PublicKey$findProgra22, pdaAccount, _PublicKey$findProgra23, dyfVault, instructions, signers;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (publicKey) {
            _context4.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context4.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _PublicKey$findProgra20 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra20[0];
          userToken = getAssociateTokenAccount(args.snsMint, publicKey);
          _PublicKey$findProgra21 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfig = _PublicKey$findProgra21[0];
          _PublicKey$findProgra22 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra22[0];
          _PublicKey$findProgra23 = web3.PublicKey.findProgramAddressSync([pdaAccount.toBuffer(), Buffer.from('DYF:VAULT')], args.programId), dyfVault = _PublicKey$findProgra23[0];
          instructions = campaignTitles.map(function (campaignTitle) {
            var _PublicKey$findProgra24 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId),
              campaignAccount = _PublicKey$findProgra24[0];
            var _PublicKey$findProgra25 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignTitle), publicKey.toBuffer()], args.programId),
              campaignActivity = _PublicKey$findProgra25[0];
            var _PublicKey$findProgra26 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:VAULT'), Buffer.from(campaignTitle)], args.programId),
              campaignVault = _PublicKey$findProgra26[0];
            return createClaimRewardInstruction({
              user: publicKey,
              userProfile: userProfile,
              userToken: userToken,
              campaignAccount: campaignAccount,
              campaignActivity: campaignActivity,
              campaignVault: campaignVault,
              farmConfig: farmConfig,
              pdaAccount: pdaAccount,
              dyfVault: dyfVault,
              clock: web3.SYSVAR_CLOCK_PUBKEY
            }, {
              campaignTitle: campaignTitle
            }, args.programId);
          });
          signers = [];
          return _context4.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function createBatchClaimRewardInstructions(_x14, _x15, _x16, _x17) {
    return _ref4.apply(this, arguments);
  };
}();
var createStakeCampaignWithNFTInstructions = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(publicKey, connection, role, access, mint, args) {
    var instructions, signers, _PublicKey$findProgra27, userProfile, _PublicKey$findProgra28, farmConfigAccount, userNft, _PublicKey$findProgra29, nftVault, _PublicKey$findProgra30, nftMetadata, _PublicKey$findProgra31, pdaAccount, profile;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (publicKey) {
            _context5.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context5.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra27 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra27[0];
          _PublicKey$findProgra28 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfigAccount = _PublicKey$findProgra28[0];
          userNft = getAssociateTokenAccount(new web3.PublicKey(mint), publicKey);
          _PublicKey$findProgra29 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:VAULT'), userNft.toBuffer()], args.programId), nftVault = _PublicKey$findProgra29[0];
          _PublicKey$findProgra30 = web3.PublicKey.findProgramAddressSync([Buffer.from('metadata'), new web3.PublicKey(METADATA_PROGRAM_ADDRESS).toBuffer(), new web3.PublicKey(mint).toBuffer()], new web3.PublicKey(METADATA_PROGRAM_ADDRESS)), nftMetadata = _PublicKey$findProgra30[0];
          _PublicKey$findProgra31 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra31[0];
          _context5.next = 14;
          return connection.getParsedAccountInfo(userProfile, 'processed');
        case 14:
          profile = _context5.sent;
          if (!profile || !profile.value) {
            instructions.push(createCreateProfileInstruction({
              user: publicKey,
              userProfile: userProfile,
              farmConfig: farmConfigAccount,
              clock: web3.SYSVAR_CLOCK_PUBKEY
            }, {
              role: role,
              access: access
            }, args.programId));
          }
          instructions.push(createStakeNftInstruction({
            user: publicKey,
            userProfile: userProfile,
            userNft: userNft,
            nftVault: nftVault,
            farmConfig: farmConfigAccount,
            pdaAccount: pdaAccount,
            nftMint: new web3.PublicKey(mint),
            nftMetadata: nftMetadata,
            clock: web3.SYSVAR_CLOCK_PUBKEY
          }, args.programId));
          return _context5.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function createStakeCampaignWithNFTInstructions(_x18, _x19, _x20, _x21, _x22, _x23) {
    return _ref5.apply(this, arguments);
  };
}();
var getTotalAvailableRewards = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(publicKey, connection, args) {
    var _PublicKey$findProgra32, farmConfigAccount, farmConfig, _PublicKey$findProgra33, userProfile, profile, campaignActivityAccountsInfo, campaignActivities, campaignAccountsInfo, campaignTitles, totalRewards, totalClaimed;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (publicKey) {
            _context6.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context6.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _PublicKey$findProgra32 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfigAccount = _PublicKey$findProgra32[0];
          _context6.next = 7;
          return FarmConfig.fromAccountAddress(connection, farmConfigAccount, 'processed');
        case 7:
          farmConfig = _context6.sent;
          _PublicKey$findProgra33 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra33[0];
          _context6.next = 11;
          return Profile.fromAccountAddress(connection, userProfile, 'processed');
        case 11:
          profile = _context6.sent;
          _context6.next = 14;
          return connection.getProgramAccounts(args.programId, {
            filters: [{
              memcmp: {
                offset: 0,
                bytes: base58.encode(campaignActivityDiscriminator)
              }
            }, {
              memcmp: {
                offset: 8,
                bytes: base58.encode(publicKey.toBytes())
              }
            }]
          });
        case 14:
          campaignActivityAccountsInfo = _context6.sent;
          campaignActivities = campaignActivityAccountsInfo.map(function (accountInfo) {
            return CampaignActivity.deserialize(accountInfo.account.data)[0];
          });
          _context6.next = 18;
          return getAccountsByDiscriminator(connection, new Uint8Array(campaignDiscriminator), args.programId);
        case 18:
          campaignAccountsInfo = _context6.sent;
          campaignTitles = [];
          totalRewards = 0;
          totalClaimed = 0;
          campaignActivities.forEach(function (campaignActivity) {
            var campaignAccountInfo = campaignAccountsInfo.find(function (accountInfo) {
              return isEqualAddress(accountInfo.pubkey, campaignActivity.campaign);
            });
            if (campaignAccountInfo) {
              try {
                var campaign = Campaign.deserialize(campaignAccountInfo.account.data)[0];
                var status = getCampaignStatusFromCampaignAccount(campaign, farmConfig, profile.role, {
                  stopOffset: args.stopOffset
                });
                if (status > exports.CampaignStatus.Inprogress) {
                  var unclaimedReward = new BN(campaignActivity.unclaimedReward).toNumber();
                  var claimedReward = new BN(campaignActivity.claimedReward).toNumber();
                  if (unclaimedReward > claimedReward) {
                    campaignTitles.push(decodeText(campaign.title));
                    totalRewards += unclaimedReward;
                    totalClaimed += claimedReward;
                  } else return;
                } else return;
              } catch (e) {
                return;
              }
            } else {
              return;
            }
          });
          return _context6.abrupt("return", {
            rewards: totalRewards,
            claimed: totalClaimed,
            campaignTitles: campaignTitles
          });
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getTotalAvailableRewards(_x24, _x25, _x26) {
    return _ref6.apply(this, arguments);
  };
}();
var getBuilderActivity = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(publicKey, args) {
    var activityInfo;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (publicKey) {
            _context7.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          _context7.next = 4;
          return getBuilderActivityInfo(publicKey.toBase58(), {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 4:
          activityInfo = _context7.sent;
          return _context7.abrupt("return", activityInfo);
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getBuilderActivity(_x27, _x28) {
    return _ref7.apply(this, arguments);
  };
}();
var getValidatorActivity = /*#__PURE__*/function () {
  var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(publicKey, args) {
    var activityInfo;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (publicKey) {
            _context8.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          _context8.next = 4;
          return getValidatorActivityInfo(publicKey.toBase58(), {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 4:
          activityInfo = _context8.sent;
          return _context8.abrupt("return", activityInfo);
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function getValidatorActivity(_x29, _x30) {
    return _ref8.apply(this, arguments);
  };
}();
var getBuilderSubmissionsToday = /*#__PURE__*/function () {
  var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(publicKey, args) {
    var recentSubmissions;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (publicKey) {
            _context9.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          _context9.next = 4;
          return getBuilderRecentSubmissions(publicKey.toBase58(), 0, {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 4:
          recentSubmissions = _context9.sent;
          return _context9.abrupt("return", recentSubmissions);
        case 6:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function getBuilderSubmissionsToday(_x31, _x32) {
    return _ref9.apply(this, arguments);
  };
}();
var getValidatorValidationsToday = /*#__PURE__*/function () {
  var _ref10 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(publicKey, args) {
    var recentValidations;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          if (publicKey) {
            _context10.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          _context10.next = 4;
          return getValidatorRecentValidations(publicKey.toBase58(), 0, {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 4:
          recentValidations = _context10.sent;
          return _context10.abrupt("return", recentValidations);
        case 6:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function getValidatorValidationsToday(_x33, _x34) {
    return _ref10.apply(this, arguments);
  };
}();

var createCreateGuildInstructions = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(admin, connection, guildTitle, ownerRate, masterRate, args) {
    var instructions, signers, _PublicKey$findProgra, pdaAccount, _PublicKey$findProgra2, guildAccount, slot, nftTableAccount, scholarTableAccount;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (admin) {
            _context.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra[0];
          _PublicKey$findProgra2 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:GUILD'), admin.toBuffer(), Buffer.from(guildTitle)], args.programId), guildAccount = _PublicKey$findProgra2[0];
          _context.next = 10;
          return connection.getSlot();
        case 10:
          slot = _context.sent;
          nftTableAccount = web3.AddressLookupTableProgram.createLookupTable({
            authority: pdaAccount,
            payer: admin,
            recentSlot: slot - 5
          })[1];
          scholarTableAccount = web3.AddressLookupTableProgram.createLookupTable({
            authority: pdaAccount,
            payer: admin,
            recentSlot: slot - 3
          })[1];
          instructions.push(createCreateGuildInstruction({
            owner: admin,
            guildAccount: guildAccount,
            pdaAccount: pdaAccount,
            nftTableAccount: nftTableAccount,
            scholarTableAccount: scholarTableAccount,
            lookupProgram: new web3.PublicKey(LOOKUP_PROGRAM_ADDRESS),
            clock: web3.SYSVAR_CLOCK_PUBKEY,
            rent: web3.SYSVAR_RENT_PUBKEY
          }, {
            guildTitle: guildTitle,
            slot: new BN(slot),
            ownerRate: ownerRate,
            master: admin,
            masterRate: masterRate
          }, args.programId));
          return _context.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createCreateGuildInstructions(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
var createGuildStakeNftInstructions = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(admin, user, connection, guildTitle, nftMint, role, args) {
    var instructions, signers, _PublicKey$findProgra3, pdaAccount, _PublicKey$findProgra4, guildAccount, guild, _PublicKey$findProgra5, userProfile, masterNft, _PublicKey$findProgra6, nftVault, _PublicKey$findProgra7, farmConfig, _PublicKey$findProgra8, nftMetadata, nftTableAccount, scholarTableAccount;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (admin) {
            _context2.next = 2;
            break;
          }
          throw new Error('Admin is undefined');
        case 2:
          if (user) {
            _context2.next = 4;
            break;
          }
          throw new Error('User is undefined');
        case 4:
          if (connection) {
            _context2.next = 6;
            break;
          }
          throw new Error('Connection is undefined');
        case 6:
          instructions = [];
          signers = [];
          _PublicKey$findProgra3 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra3[0];
          _PublicKey$findProgra4 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:GUILD'), admin.toBuffer(), Buffer.from(guildTitle)], args.programId), guildAccount = _PublicKey$findProgra4[0];
          _context2.next = 12;
          return Guild.fromAccountAddress(connection, guildAccount, 'processed');
        case 12:
          guild = _context2.sent;
          _PublicKey$findProgra5 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), user.toBuffer()], args.programId), userProfile = _PublicKey$findProgra5[0];
          masterNft = getAssociateTokenAccount(new web3.PublicKey(nftMint), admin);
          _PublicKey$findProgra6 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:VAULT'), nftMint.toBuffer()], args.programId), nftVault = _PublicKey$findProgra6[0];
          _PublicKey$findProgra7 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfig = _PublicKey$findProgra7[0];
          _PublicKey$findProgra8 = web3.PublicKey.findProgramAddressSync([Buffer.from('metadata'), new web3.PublicKey(METADATA_PROGRAM_ADDRESS).toBuffer(), nftMint.toBuffer()], new web3.PublicKey(METADATA_PROGRAM_ADDRESS)), nftMetadata = _PublicKey$findProgra8[0];
          nftTableAccount = web3.AddressLookupTableProgram.createLookupTable({
            authority: pdaAccount,
            payer: admin,
            recentSlot: Number(guild.nftSlot)
          })[1];
          scholarTableAccount = web3.AddressLookupTableProgram.createLookupTable({
            authority: pdaAccount,
            payer: admin,
            recentSlot: Number(guild.scholarSlot)
          })[1];
          instructions.push(createGuildStakeNftInstruction({
            master: admin,
            guildAccount: guildAccount,
            user: user,
            userProfile: userProfile,
            masterNft: masterNft,
            nftTableAccount: nftTableAccount,
            scholarTableAccount: scholarTableAccount,
            nftVault: nftVault,
            farmConfig: farmConfig,
            pdaAccount: pdaAccount,
            nftMint: nftMint,
            nftMetadata: nftMetadata,
            lookupProgram: new web3.PublicKey(LOOKUP_PROGRAM_ADDRESS),
            clock: web3.SYSVAR_CLOCK_PUBKEY,
            rent: web3.SYSVAR_RENT_PUBKEY
          }, {
            guildTitle: guildTitle,
            role: role
          }, args.programId));
          return _context2.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createGuildStakeNftInstructions(_x7, _x8, _x9, _x10, _x11, _x12, _x13) {
    return _ref2.apply(this, arguments);
  };
}();
var createScholarSignInstructions = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(admin, user, connection, guildTitle, args) {
    var instructions, signers, _PublicKey$findProgra9, pdaAccount, _PublicKey$findProgra10, guildAccount, _PublicKey$findProgra11, userProfile;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (admin) {
            _context3.next = 2;
            break;
          }
          throw new Error('Admin is undefined');
        case 2:
          if (user) {
            _context3.next = 4;
            break;
          }
          throw new Error('User is undefined');
        case 4:
          if (connection) {
            _context3.next = 6;
            break;
          }
          throw new Error('Connection is undefined');
        case 6:
          instructions = [];
          signers = [];
          _PublicKey$findProgra9 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF')], args.programId), pdaAccount = _PublicKey$findProgra9[0];
          _PublicKey$findProgra10 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:GUILD'), admin.toBuffer(), Buffer.from(guildTitle)], args.programId), guildAccount = _PublicKey$findProgra10[0];
          _PublicKey$findProgra11 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), user.toBuffer()], args.programId), userProfile = _PublicKey$findProgra11[0];
          instructions.push(createScholarSignInstruction({
            user: user,
            admin: admin,
            userProfile: userProfile,
            guildAccount: guildAccount,
            pdaAccount: pdaAccount
          }, {
            guildTitle: guildTitle
          }, args.programId));
          return _context3.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createScholarSignInstructions(_x14, _x15, _x16, _x17, _x18) {
    return _ref3.apply(this, arguments);
  };
}();
var getGuild = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(admin, connection, guildTitle, args) {
    var _PublicKey$findProgra12, guildAccount, guild;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (admin) {
            _context4.next = 2;
            break;
          }
          throw new Error('Admin is undefined');
        case 2:
          if (connection) {
            _context4.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _PublicKey$findProgra12 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:GUILD'), admin.toBuffer(), Buffer.from(guildTitle)], args.programId), guildAccount = _PublicKey$findProgra12[0];
          _context4.next = 7;
          return Guild.fromAccountAddress(connection, guildAccount, 'processed');
        case 7:
          guild = _context4.sent;
          return _context4.abrupt("return", guild);
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getGuild(_x19, _x20, _x21, _x22) {
    return _ref4.apply(this, arguments);
  };
}();

var createGlobalProfileInstructions = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicKey, connection, role, access, args) {
    var instructions, signers, _PublicKey$findProgra, farmConfig, _PublicKey$findProgra2, userProfile;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (publicKey) {
            _context.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfig = _PublicKey$findProgra[0];
          _PublicKey$findProgra2 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra2[0];
          instructions.push(createCreateProfileInstruction({
            user: publicKey,
            userProfile: userProfile,
            farmConfig: farmConfig,
            clock: web3.SYSVAR_CLOCK_PUBKEY
          }, {
            role: role,
            access: access
          }, args.programId));
          return _context.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createGlobalProfileInstructions(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var getProfileStatus = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(publicKey, connection, args) {
    var _PublicKey$findProgra3, userProfile, profile;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (publicKey) {
            _context2.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context2.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _context2.prev = 4;
          _PublicKey$findProgra3 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra3[0];
          _context2.next = 8;
          return Profile.fromAccountAddress(connection, userProfile, 'processed');
        case 8:
          profile = _context2.sent;
          return _context2.abrupt("return", {
            isCreated: true,
            isNftStaked: profile.nftStaked,
            isRpcPermitted: profile.offchainPermit,
            isScholarSign: profile.scholarSign,
            isScholarAccess: profile.scholarAccess,
            role: profile.role,
            access: profile.kind
          });
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](4);
          return _context2.abrupt("return", {
            isCreated: false
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 12]]);
  }));
  return function getProfileStatus(_x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
var createRpcPermitInstructions = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(publicKey, connection, role, args) {
    var instructions, signers, _PublicKey$findProgra4, userProfile, _PublicKey$findProgra5, farmConfigAccount, farmConfig;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (publicKey) {
            _context3.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context3.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          instructions = [];
          signers = [];
          _PublicKey$findProgra4 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId), userProfile = _PublicKey$findProgra4[0];
          _PublicKey$findProgra5 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId), farmConfigAccount = _PublicKey$findProgra5[0];
          _context3.next = 10;
          return FarmConfig.fromAccountAddress(connection, farmConfigAccount, 'processed');
        case 10:
          farmConfig = _context3.sent;
          instructions.push(createRpcPermitInstruction({
            user: publicKey,
            authority: farmConfig.rpc,
            profile: userProfile
          }, {
            status: true,
            role: role
          }, args.programId));
          return _context3.abrupt("return", {
            instructions: instructions,
            signers: signers
          });
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createRpcPermitInstructions(_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();
var getRpcAuthToken = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(publicKey, signMessage, args) {
    var preToken, encodedPreToken, signedMessage, signature, token;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (publicKey) {
            _context4.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (signMessage) {
            _context4.next = 4;
            break;
          }
          throw new Error('signMessage is undefined');
        case 4:
          _context4.next = 6;
          return rpcRequestAuth(publicKey.toBase58(), {
            rpcHost: args.rpcHost
          });
        case 6:
          preToken = _context4.sent;
          if (preToken) {
            _context4.next = 9;
            break;
          }
          throw new Error('Request RPC Auth is failed');
        case 9:
          encodedPreToken = encodeText(preToken);
          _context4.next = 12;
          return signMessage(encodedPreToken);
        case 12:
          signedMessage = _context4.sent;
          signature = base58.encode(signedMessage);
          _context4.next = 16;
          return rpcVerifyAuth(publicKey.toBase58(), signature, {
            rpcHost: args.rpcHost
          });
        case 16:
          token = _context4.sent;
          if (token) {
            _context4.next = 19;
            break;
          }
          throw new Error('Verify RPC Auth is failed');
        case 19:
          return _context4.abrupt("return", token);
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getRpcAuthToken(_x13, _x14, _x15) {
    return _ref4.apply(this, arguments);
  };
}();

var getUtterancesAndHistoriesForValidator = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(publicKey, connection, campaignTitle, campaignAccountPubkey, latestSubmittedUuids, args) {
    var campaignAccount, submissionsAndValidationsInfo, submissionsInfo, validationsInfo, rpcValidations, objValidationsInfo, objRpcValidations, utterancesChecked, utterancesQueued, utterancesExpired, submissionsChecked, submissionsNotValidatedButRpcFinalizedOrExpired, submissionsNotValidatedButRpcPending, utterances;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (publicKey) {
            _context2.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context2.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          campaignAccount = new web3.PublicKey(campaignAccountPubkey);
          _context2.next = 7;
          return getSubmissionsValidationsInfo(campaignAccount.toBase58(), publicKey.toBase58(), {
            apiHost: args.apiHost,
            apiAuth: args.apiAuth
          });
        case 7:
          submissionsAndValidationsInfo = _context2.sent;
          submissionsInfo = submissionsAndValidationsInfo.submissions.filter(function (submission) {
            return submission.pubkey && submission.submitted;
          });
          validationsInfo = submissionsAndValidationsInfo.validations;
          _context2.next = 12;
          return getRpcValidationStatus(publicKey.toBase58(), campaignAccount.toBase58(), {
            rpcHost: args.rpcHost
          });
        case 12:
          rpcValidations = _context2.sent;
          objValidationsInfo = validationsInfo.reduce(function (all, validation) {
            var _all$validation$utter, _extends2;
            var validations = (_all$validation$utter = all[validation.utterance]) != null ? _all$validation$utter : [];
            return _extends({}, all, (_extends2 = {}, _extends2[validation.utterance] = validations.slice().concat(validation), _extends2));
          }, {});
          objRpcValidations = rpcValidations.reduce(function (all, validation) {
            var _extends3;
            return _extends({}, all, (_extends3 = {}, _extends3[validation.utterance] = validation, _extends3));
          }, {});
          utterancesChecked = [];
          utterancesQueued = [];
          utterancesExpired = [];
          submissionsChecked = [];
          submissionsInfo.forEach(function (submission) {
            var _objValidationsInfo$s;
            if (!submission.pubkey) return;
            var histories = (_objValidationsInfo$s = objValidationsInfo[submission.pubkey]) != null ? _objValidationsInfo$s : [];
            var history = histories.find(function (history) {
              return isEqualAddress(history.validator, publicKey);
            });
            if (!objRpcValidations[submission.pubkey] || history) {
              submissionsChecked.push(submission);
            }
          });
          submissionsChecked.forEach(function (submission) {
            var _objValidationsInfo$s2;
            var histories = submission.pubkey ? (_objValidationsInfo$s2 = objValidationsInfo[submission.pubkey]) != null ? _objValidationsInfo$s2 : [] : [];
            var history = histories.find(function (history) {
              return isEqualAddress(history.validator, publicKey);
            });
            utterancesChecked.push({
              timestamp: submission.timestamp,
              kind: submission.kind,
              data: submission.data,
              canonical: submission.canonical,
              builder: submission.builder,
              submitted: true,
              pubkey: submission.pubkey,
              finish: submission.finish,
              correct: submission.correct,
              incorrect: submission.incorrect,
              head: submission.correct + submission.incorrect,
              history: histories,
              validated: history ? history.vote : undefined,
              confidence: history ? history.confidence : undefined
            });
          });
          submissionsNotValidatedButRpcFinalizedOrExpired = [];
          submissionsInfo.forEach(function (submission) {
            var _objValidationsInfo$s3;
            if (!submission.pubkey) return;
            var histories = (_objValidationsInfo$s3 = objValidationsInfo[submission.pubkey]) != null ? _objValidationsInfo$s3 : [];
            var history = histories.find(function (history) {
              return isEqualAddress(history.validator, publicKey);
            });
            if (objRpcValidations[submission.pubkey] && (objRpcValidations[submission.pubkey].status === exports.RpcTxnStatus.Finalized || objRpcValidations[submission.pubkey].status === exports.RpcTxnStatus.Expired) && !history) {
              submissionsNotValidatedButRpcFinalizedOrExpired.push(submission);
            }
          });
          _context2.next = 25;
          return Promise.all(submissionsNotValidatedButRpcFinalizedOrExpired.map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(submission) {
              var _objValidationsInfo$s4;
              var _PublicKey$findProgra, historyAccount, histories, utterance, history;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (submission.pubkey) {
                      _context.next = 2;
                      break;
                    }
                    return _context.abrupt("return");
                  case 2:
                    _PublicKey$findProgra = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:PHRASE:LOG'), Buffer.from(campaignTitle), new web3.PublicKey(submission.pubkey).toBuffer(), publicKey.toBuffer()], args.programId), historyAccount = _PublicKey$findProgra[0];
                    histories = (_objValidationsInfo$s4 = objValidationsInfo[submission.pubkey]) != null ? _objValidationsInfo$s4 : [];
                    utterance = {
                      timestamp: submission.timestamp,
                      kind: submission.kind,
                      data: submission.data,
                      canonical: submission.canonical,
                      builder: submission.builder,
                      submitted: true,
                      pubkey: submission.pubkey,
                      finish: submission.finish,
                      correct: submission.correct,
                      incorrect: submission.incorrect,
                      head: submission.correct + submission.incorrect,
                      history: histories
                    };
                    _context.prev = 5;
                    _context.next = 8;
                    return Validate.fromAccountAddress(connection, historyAccount, 'processed');
                  case 8:
                    history = _context.sent;
                    utterancesChecked.push(_extends({}, utterance, {
                      history: histories.concat({
                        timestamp: new BN(history.time).toNumber(),
                        utterance: history.phrase.toBase58(),
                        validator: history.address.toBase58(),
                        vote: history.vote,
                        confidence: history.confident,
                        pubkey: historyAccount.toBase58()
                      }),
                      validated: history ? history.vote : undefined,
                      confidence: history ? history.confident : undefined
                    }));
                    _context.next = 15;
                    break;
                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context["catch"](5);
                    if (latestSubmittedUuids.includes(objRpcValidations[submission.pubkey].uuid)) {
                      utterancesExpired.push(_extends({}, utterance, {
                        expired: true
                      }));
                    } else {
                      utterancesChecked.push(utterance);
                    }
                  case 15:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[5, 12]]);
            }));
            return function (_x7) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 25:
          submissionsNotValidatedButRpcPending = [];
          submissionsInfo.forEach(function (submission) {
            var _objValidationsInfo$s5;
            if (!submission.pubkey) return;
            var histories = (_objValidationsInfo$s5 = objValidationsInfo[submission.pubkey]) != null ? _objValidationsInfo$s5 : [];
            var history = histories.find(function (history) {
              return isEqualAddress(history.validator, publicKey);
            });
            if (objRpcValidations[submission.pubkey] && objRpcValidations[submission.pubkey].status === exports.RpcTxnStatus.Pending && !history) {
              submissionsNotValidatedButRpcPending.push(submission);
            }
          });
          submissionsNotValidatedButRpcPending.forEach(function (submission) {
            var _objValidationsInfo$s6;
            if (!submission.pubkey) return;
            var histories = submission.pubkey ? (_objValidationsInfo$s6 = objValidationsInfo[submission.pubkey]) != null ? _objValidationsInfo$s6 : [] : [];
            utterancesQueued.push({
              timestamp: submission.timestamp,
              kind: submission.kind,
              data: submission.data,
              canonical: submission.canonical,
              builder: submission.builder,
              submitted: true,
              pubkey: submission.pubkey,
              finish: submission.finish,
              correct: submission.correct,
              incorrect: submission.incorrect,
              head: submission.correct + submission.incorrect,
              history: histories,
              uuid: objRpcValidations[submission.pubkey].uuid
            });
          });
          utterances = utterancesChecked.concat(utterancesQueued).concat(utterancesExpired).sort(function (a, b) {
            return b.timestamp - a.timestamp || b.data.localeCompare(a.data);
          }).reverse();
          return _context2.abrupt("return", utterances);
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getUtterancesAndHistoriesForValidator(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
var createValidatorValidateUtterancesInstructions = function createValidatorValidateUtterancesInstructions(publicKey, connection, campaignTitle, validations, args) {
  if (!publicKey) throw new Error('PublicKey is undefined');
  if (!connection) throw new Error('Connection is undefined');
  var instructions = [];
  var signers = [];
  var _PublicKey$findProgra2 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN'), Buffer.from(campaignTitle)], args.programId),
    campaignAccount = _PublicKey$findProgra2[0];
  var _PublicKey$findProgra3 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CONFIG')], args.programId),
    farmConfig = _PublicKey$findProgra3[0];
  var _PublicKey$findProgra4 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:PROFILE'), publicKey.toBuffer()], args.programId),
    userProfile = _PublicKey$findProgra4[0];
  var _PublicKey$findProgra5 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignTitle), publicKey.toBuffer()], args.programId),
    campaignActivity = _PublicKey$findProgra5[0];
  instructions = validations.map(function (validation) {
    var phraseAccount = new web3.PublicKey(validation.utterance);
    var _PublicKey$findProgra6 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:PHRASE:LOG'), Buffer.from(campaignTitle), phraseAccount.toBuffer(), publicKey.toBuffer()], args.programId),
      logAccount = _PublicKey$findProgra6[0];
    var _PublicKey$findProgra7 = web3.PublicKey.findProgramAddressSync([Buffer.from('DYF:CAMPAIGN:ACTIVITY'), Buffer.from(campaignTitle), new web3.PublicKey(validation.builder).toBuffer()], args.programId),
      builderActivity = _PublicKey$findProgra7[0];
    return createValidatePhraseInstruction({
      user: publicKey,
      phraseAccount: phraseAccount,
      userProfile: userProfile,
      campaignActivity: campaignActivity,
      builderActivity: builderActivity,
      logAccount: logAccount,
      campaignAccount: campaignAccount,
      farmConfig: farmConfig,
      clock: web3.SYSVAR_CLOCK_PUBKEY
    }, {
      campaignTitle: campaignTitle,
      offchainRef: validation.canonical,
      confident: validation.confidence,
      status: validation.vote
    }, args.programId);
  });
  return {
    instructions: instructions,
    signers: signers
  };
};
var createRpcValidateUtterancesPromises = function createRpcValidateUtterancesPromises(publicKey, connection, rpcAuthToken, campaignTitle, batchValidations, args) {
  if (!publicKey) throw new Error('PublicKey is undefined');
  if (!connection) throw new Error('Connection is undefined');
  if (!rpcAuthToken || rpcAuthToken === '') throw new Error('RPC Auth Token is undefined');
  var returnArgs = batchValidations.map(function (_validations) {
    return [rpcAuthToken, args.programId.toBase58(), campaignTitle, publicKey.toBase58(), _validations.map(function (validation) {
      return validation.builder;
    }), _validations.map(function (validation) {
      return validation.utterance;
    }), _validations.map(function (validation) {
      return validation.canonical;
    }), _validations.map(function (validation) {
      return validation.vote;
    }), _validations.map(function (validation) {
      return validation.confidence;
    }), {
      rpcHost: args.rpcHost
    }];
  });
  return {
    promise: rpcBatchValidatePhrase,
    args: returnArgs
  };
};
var createRpcValidateVerifiableUtterancesPromise = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(publicKey, signMessage, rpcAuthToken, campaignTitle, validations, args) {
    var messages, hashes, tree, merkleRaw, merkleRoot, signed, ixBases;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (publicKey) {
            _context3.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (signMessage) {
            _context3.next = 4;
            break;
          }
          throw new Error('signMessage is undefined');
        case 4:
          if (!(!rpcAuthToken || rpcAuthToken === '')) {
            _context3.next = 6;
            break;
          }
          throw new Error('RPC Auth Token is undefined');
        case 6:
          messages = validations.map(function (validation) {
            return [args.programId.toBase58(), campaignTitle, publicKey.toBase58(), validation.canonical, validation.confidence, validation.vote];
          });
          hashes = messages.map(function (message) {
            return tsMd5.Md5.hashStr(JSON.stringify(message));
          });
          tree = new merkletreejs.MerkleTree(hashes, keccak256, {
            sortPairs: true,
            hashLeaves: true
          });
          merkleRaw = tree.getRoot();
          merkleRoot = Buffer.from(merkleRaw.toString('hex'));
          _context3.next = 13;
          return signMessage(merkleRoot);
        case 13:
          signed = _context3.sent;
          ixBases = hashes.map(function (hash, idx) {
            var leaf = keccak256(hash);
            var proof = tree.getProof(leaf, idx);
            var merkleProof = proof.map(function (p) {
              return p.data;
            });
            var proofBuffer = Buffer.from('');
            for (var i = 0; i < merkleProof.length; i++) {
              proofBuffer = Buffer.concat([proofBuffer, merkleProof[i]]);
            }
            var ixData = Buffer.concat([merkleRoot, signed, proofBuffer]);
            console.log('ixData: ', ixData.length);
            return Buffer.from(ixData).toString('base64');
          });
          return _context3.abrupt("return", messages.map(function (message, idx) {
            return [rpcAuthToken, message[0], message[1], message[2], validations[idx].builder, validations[idx].utterance, message[3], message[4], message[5], ixBases[idx]];
          }));
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createRpcValidateVerifiableUtterancesPromise(_x8, _x9, _x10, _x11, _x12, _x13) {
    return _ref3.apply(this, arguments);
  };
}();

var getSolBalance = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicKey, connection) {
    var balance;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (publicKey) {
            _context.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _context.next = 6;
          return connection.getBalance(publicKey);
        case 6:
          balance = _context.sent;
          return _context.abrupt("return", balance / web3.LAMPORTS_PER_SOL);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getSolBalance(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getTokenBalance = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(publicKey, connection, args) {
    var _tokenBalance, ata, tokenAccount;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (publicKey) {
            _context2.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context2.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _tokenBalance = 0;
          ata = getAssociateTokenAccount(args.snsMint, publicKey);
          _context2.next = 8;
          return connection.getParsedAccountInfo(ata);
        case 8:
          tokenAccount = _context2.sent;
          if (tokenAccount.value) _tokenBalance =
          // @ts-ignore
          tokenAccount.value.data.parsed.info.tokenAmount.uiAmount;
          return _context2.abrupt("return", Number(_tokenBalance));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getTokenBalance(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var getKanonNfts = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(publicKey, connection, args) {
    var nftData, parsedNfts, parsedKanonNftData, arrMetadata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (publicKey) {
            _context4.next = 2;
            break;
          }
          throw new Error('PublicKey is undefined');
        case 2:
          if (connection) {
            _context4.next = 4;
            break;
          }
          throw new Error('Connection is undefined');
        case 4:
          _context4.next = 6;
          return solRayz.getParsedNftAccountsByOwner({
            publicAddress: publicKey.toBase58(),
            connection: connection
          });
        case 6:
          nftData = _context4.sent;
          parsedNfts = Object.keys(nftData).map(function (key) {
            return nftData[key];
          });
          parsedKanonNftData = parsedNfts.filter(function (nft) {
            return nft.data.creators.length === 1 && isEqualAddress(nft.data.creators[0].address, args.kanonNftCharity) && nft.data.creators[0].share === 100;
          });
          arrMetadata = [];
          _context4.next = 12;
          return Promise.all(parsedKanonNftData.map( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(nft) {
              var resp;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return axios.get(nft.data.uri);
                  case 3:
                    resp = _context3.sent;
                    arrMetadata.push(resp.data.image);
                    _context3.next = 11;
                    break;
                  case 7:
                    _context3.prev = 7;
                    _context3.t0 = _context3["catch"](0);
                    console.log(_context3.t0);
                    arrMetadata.push('');
                  case 11:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[0, 7]]);
            }));
            return function (_x9) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 12:
          return _context4.abrupt("return", parsedKanonNftData.map(function (nft, idx) {
            return {
              mint: nft.mint,
              updateAuthority: nft.updateAuthority,
              name: nft.data.name,
              symbol: nft.data.symbol,
              metadataUri: nft.data.uri,
              imageUri: arrMetadata[idx]
            };
          }));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getKanonNfts(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var SNS_ADDRESS = 'SNSNkV9zfG5ZKWQs6x4hxvBRV6s8SqMfSGCtECDvdMd';
var KANON_NFT_CHARITY_ADDRESS = 'CRTegTRWPceXBc7ywwP9NKHXavjcW5HYaN4AxR3AcH9H';
var DYF_API_HOST = 'https://dyf-dev.synesis.xyz';
var DYF_API_AUTH = 'Basic YXBpdXNlcjphYmNkZWZnaDEyMzQ1Njc4'; // "apiuser:abcdefgh12345678"
var DYF_RPC_HOST = 'https://dyf-rpc-dev.synesis.xyz/';
var DYF_DEPLOYMENT = 'dev';
var Dyfarm = /*#__PURE__*/function () {
  function Dyfarm(args) {
    this.PROGRAM_ID = PROGRAM_ID;
    this.SNS_MINT = new web3.PublicKey(SNS_ADDRESS);
    this.KANON_NFT_CHARITY = new web3.PublicKey(KANON_NFT_CHARITY_ADDRESS);
    this.API_HOST = DYF_API_HOST;
    this.API_AUTH = DYF_API_AUTH;
    this.RPC_HOST = DYF_RPC_HOST;
    this.DEPLOYMENT = DYF_DEPLOYMENT;
    this.STOP_OFFSET = 7;
    this.PROGRAM_ID = args.programId;
    this.SNS_MINT = args.snsMint;
    this.KANON_NFT_CHARITY = args.nftCharity;
    this.API_HOST = args.apiHost;
    this.API_AUTH = args.apiAuth;
    this.RPC_HOST = args.rpcHost;
    this.STOP_OFFSET = args.stopOffset;
    this.DEPLOYMENT = args.deployment;
  }
  // airdrop
  var _proto = Dyfarm.prototype;
  _proto.createAirdropSNSInstructions = function createAirdropSNSInstructions$1(publicKey, connection) {
    return createAirdropSNSInstructions(publicKey, connection, {
      programId: this.PROGRAM_ID,
      snsMint: this.SNS_MINT
    });
  }
  // architect
  ;
  _proto.getUtterancesAndHistoriesForArchitect = function getUtterancesAndHistoriesForArchitect$1(publicKey, connection, campaignAccountPubkey) {
    return getUtterancesAndHistoriesForArchitect(publicKey, connection, campaignAccountPubkey, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  };
  _proto.createArchitectCreateCampaignInstructions = function createArchitectCreateCampaignInstructions$1(publicKey, connection, data) {
    return createArchitectCreateCampaignInstructions(publicKey, connection, data, {
      programId: this.PROGRAM_ID,
      snsMint: this.SNS_MINT
    });
  };
  _proto.createArchitectUpdateCampaignInstructions = function createArchitectUpdateCampaignInstructions$1(publicKey, connection, data) {
    return createArchitectUpdateCampaignInstructions(publicKey, connection, data, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.createArchitectClaimCampaignInstructions = function createArchitectClaimCampaignInstructions$1(publicKey, connection, campaignTitle) {
    return createArchitectClaimCampaignInstructions(publicKey, connection, campaignTitle, {
      programId: this.PROGRAM_ID,
      snsMint: this.SNS_MINT
    });
  };
  _proto.getUnusedCampaignTitle = function getUnusedCampaignTitle$1(publicKey, connection) {
    return getUnusedCampaignTitle(publicKey, connection, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH,
      programId: this.PROGRAM_ID
    });
  }
  // builder
  ;
  _proto.getUtterancesAndHistoriesForBuilder = function getUtterancesAndHistoriesForBuilder$1(publicKey, connection, campaignAccountPubkey, latestSubmittedUuids) {
    return getUtterancesAndHistoriesForBuilder(publicKey, connection, campaignAccountPubkey, latestSubmittedUuids, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH,
      rpcHost: this.RPC_HOST,
      programId: this.PROGRAM_ID
    });
  };
  _proto.createUtteranceByOntology = function createUtteranceByOntology$1(publicKey, ontology) {
    return createUtteranceByOntology(publicKey, ontology, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  };
  _proto.deleteOntologyByCanonical = function deleteOntologyByCanonical$1(canonical) {
    return deleteOntologyByCanonical(canonical, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  };
  _proto.createBuilderSubmitUtterancesInstructions = function createBuilderSubmitUtterancesInstructions$1(publicKey, connection, campaignTitle, utterances) {
    return createBuilderSubmitUtterancesInstructions(publicKey, connection, campaignTitle, utterances, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.createRpcSubmitUtterancesPromises = function createRpcSubmitUtterancesPromises$1(publicKey, connection, rpcAuthToken, campaignTitle, batchUtterances) {
    return createRpcSubmitUtterancesPromises(publicKey, connection, rpcAuthToken, campaignTitle, batchUtterances, {
      programId: this.PROGRAM_ID,
      rpcHost: this.RPC_HOST
    });
  };
  _proto.createRpcSubmitVerifiableUtterancesPromise = function createRpcSubmitVerifiableUtterancesPromise$1(publicKey, signMessage, rpcAuthToken, campaignTitle, batchUtterances) {
    return createRpcSubmitVerifiableUtterancesPromise(publicKey, signMessage, rpcAuthToken, campaignTitle, batchUtterances, {
      programId: this.PROGRAM_ID
    });
  }
  // campaignActivities
  ;
  _proto.createStakeCampaignInstructions = function createStakeCampaignInstructions$1(publicKey, connection, amount, campaignTitle) {
    return createStakeCampaignInstructions(publicKey, connection, amount, campaignTitle, {
      programId: this.PROGRAM_ID,
      snsMint: this.SNS_MINT
    });
  };
  _proto.createUnstakeCampaignInstructions = function createUnstakeCampaignInstructions$1(publicKey, connection, campaignTitle) {
    return createUnstakeCampaignInstructions(publicKey, connection, campaignTitle, {
      programId: this.PROGRAM_ID,
      snsMint: this.SNS_MINT
    });
  };
  _proto.createClaimRewardInstructions = function createClaimRewardInstructions$1(publicKey, connection, campaignTitle) {
    return createClaimRewardInstructions(publicKey, connection, campaignTitle, {
      programId: this.PROGRAM_ID,
      snsMint: this.SNS_MINT
    });
  };
  _proto.createBatchClaimRewardInstructions = function createBatchClaimRewardInstructions$1(publicKey, connection, campaignTitles) {
    return createBatchClaimRewardInstructions(publicKey, connection, campaignTitles, {
      programId: this.PROGRAM_ID,
      snsMint: this.SNS_MINT
    });
  };
  _proto.createStakeCampaignWithNFTInstructions = function createStakeCampaignWithNFTInstructions$1(publicKey, connection, role, access, mint) {
    return createStakeCampaignWithNFTInstructions(publicKey, connection, role, access, mint, {
      programId: this.PROGRAM_ID,
      snsMint: this.SNS_MINT
    });
  };
  _proto.getTotalAvailableRewards = function getTotalAvailableRewards$1(publicKey, connection) {
    return getTotalAvailableRewards(publicKey, connection, {
      programId: this.PROGRAM_ID,
      stopOffset: this.STOP_OFFSET
    });
  };
  _proto.getBuilderActivity = function getBuilderActivity$1(publicKey) {
    return getBuilderActivity(publicKey, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  };
  _proto.getValidatorActivity = function getValidatorActivity$1(publicKey) {
    return getValidatorActivity(publicKey, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  };
  _proto.getBuilderSubmissionsToday = function getBuilderSubmissionsToday$1(publicKey) {
    return getBuilderSubmissionsToday(publicKey, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  };
  _proto.getValidatorValidationsToday = function getValidatorValidationsToday$1(publicKey) {
    return getValidatorValidationsToday(publicKey, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  }
  // campaigns
  ;
  _proto.getCampaignFromCampaignAccount = function getCampaignFromCampaignAccount$1(publicKey, connection, campaignTitle) {
    return getCampaignFromCampaignAccount(publicKey, connection, campaignTitle, {
      programId: this.PROGRAM_ID,
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH,
      stopOffset: this.STOP_OFFSET,
      deployment: this.DEPLOYMENT
    });
  };
  _proto.getCampaignFromCampaignInfo = function getCampaignFromCampaignInfo$1(publicKey, connection, campaignTitle, role) {
    return getCampaignFromCampaignInfo(publicKey, connection, campaignTitle, role, {
      programId: this.PROGRAM_ID,
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH,
      stopOffset: this.STOP_OFFSET
    });
  };
  _proto.getAllCampaigns = function getAllCampaigns$1(publicKey, connection) {
    return getAllCampaigns(publicKey, connection, {
      programId: this.PROGRAM_ID,
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH,
      rpcHost: this.RPC_HOST,
      stopOffset: this.STOP_OFFSET
    });
  };
  _proto.getAppRole = function getAppRole$1(publicKey) {
    return getAppRole(publicKey, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  };
  _proto.getCampaignStatusFromCampaignTitles = function getCampaignStatusFromCampaignTitles$1(publicKey, connection, role, campaignTitles) {
    return getCampaignStatusFromCampaignTitles(publicKey, connection, role, campaignTitles, {
      programId: this.PROGRAM_ID,
      stopOffset: this.STOP_OFFSET
    });
  };
  _proto.bootstrapDev = function bootstrapDev$1(publicKey, connection) {
    return bootstrapDev(publicKey, connection, {
      programId: this.PROGRAM_ID,
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH,
      stopOffset: this.STOP_OFFSET,
      deployment: this.DEPLOYMENT
    });
  }
  // rpcToken
  ;
  _proto.createGlobalProfileInstructions = function createGlobalProfileInstructions$1(publicKey, connection, role, access) {
    return createGlobalProfileInstructions(publicKey, connection, role, access, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.getProfileStatus = function getProfileStatus$1(publicKey, connection) {
    return getProfileStatus(publicKey, connection, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.createRpcPermitInstructions = function createRpcPermitInstructions$1(publicKey, connection, role) {
    return createRpcPermitInstructions(publicKey, connection, role, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.getRpcAuthToken = function getRpcAuthToken$1(publicKey, signMessage) {
    return getRpcAuthToken(publicKey, signMessage, {
      rpcHost: this.RPC_HOST
    });
  }
  // validator
  ;
  _proto.getUtterancesAndHistoriesForValidator = function getUtterancesAndHistoriesForValidator$1(publicKey, connection, campaignTitle, campaignAccountPubkey, latestSubmittedUuids) {
    return getUtterancesAndHistoriesForValidator(publicKey, connection, campaignTitle, campaignAccountPubkey, latestSubmittedUuids, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH,
      rpcHost: this.RPC_HOST,
      programId: this.PROGRAM_ID
    });
  };
  _proto.createValidatorValidateUtterancesInstructions = function createValidatorValidateUtterancesInstructions$1(publicKey, connection, campaignTitle, validations) {
    return createValidatorValidateUtterancesInstructions(publicKey, connection, campaignTitle, validations, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.createRpcValidateUtterancesPromises = function createRpcValidateUtterancesPromises$1(publicKey, connection, rpcAuthToken, campaignTitle, batchValidations) {
    return createRpcValidateUtterancesPromises(publicKey, connection, rpcAuthToken, campaignTitle, batchValidations, {
      programId: this.PROGRAM_ID,
      rpcHost: this.RPC_HOST
    });
  };
  _proto.createRpcValidateVerifiableUtterancesPromise = function createRpcValidateVerifiableUtterancesPromise$1(publicKey, signMessage, rpcAuthToken, campaignTitle, validations) {
    return createRpcValidateVerifiableUtterancesPromise(publicKey, signMessage, rpcAuthToken, campaignTitle, validations, {
      programId: this.PROGRAM_ID
    });
  }
  // walletBalance
  ;
  _proto.getSolBalance = function getSolBalance$1(publicKey, connection) {
    return getSolBalance(publicKey, connection);
  };
  _proto.getTokenBalance = function getTokenBalance$1(publicKey, connection) {
    return getTokenBalance(publicKey, connection, {
      snsMint: this.SNS_MINT
    });
  };
  _proto.getKanonNfts = function getKanonNfts$1(publicKey, connection) {
    return getKanonNfts(publicKey, connection, {
      kanonNftCharity: this.KANON_NFT_CHARITY
    });
  }
  // services
  ;
  _proto.addCampaignMeta = function addCampaignMeta$1(data) {
    return addCampaignMeta(data, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  };
  _proto.delCampaignMeta = function delCampaignMeta$1(data) {
    return delCampaignMeta(data, {
      apiHost: this.API_HOST,
      apiAuth: this.API_AUTH
    });
  }
  // Guild
  ;
  _proto.createCreateGuildInstructions = function createCreateGuildInstructions$1(admin, connection, guildTitle, ownerRate, masterRate) {
    return createCreateGuildInstructions(admin, connection, guildTitle, ownerRate, masterRate, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.createGuildStakeNftInstructions = function createGuildStakeNftInstructions$1(admin, user, connection, guildTitle, nftMint, role) {
    return createGuildStakeNftInstructions(admin, user, connection, guildTitle, nftMint, role, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.createScholarSignInstructions = function createScholarSignInstructions$1(admin, user, connection, guildTitle) {
    return createScholarSignInstructions(admin, user, connection, guildTitle, {
      programId: this.PROGRAM_ID
    });
  };
  _proto.getGuild = function getGuild$1(admin, connection, guildTitle) {
    return getGuild(admin, connection, guildTitle, {
      programId: this.PROGRAM_ID
    });
  };
  return Dyfarm;
}();

exports.Campaign = Campaign;
exports.CampaignActivity = CampaignActivity;
exports.CampaignExpiredError = CampaignExpiredError;
exports.CampaignFinishedAlreadyError = CampaignFinishedAlreadyError;
exports.CampaignNotFinishedError = CampaignNotFinishedError;
exports.ConfidentIsInvalidError = ConfidentIsInvalidError;
exports.DoubleVoteDetectError = DoubleVoteDetectError;
exports.Dyfarm = Dyfarm;
exports.FarmConfig = FarmConfig;
exports.Feed = Feed;
exports.Guild = Guild;
exports.InsufficientTokenBalanceError = InsufficientTokenBalanceError;
exports.InvalidAccessMethodError = InvalidAccessMethodError;
exports.InvalidGuildAdminError = InvalidGuildAdminError;
exports.InvalidInputError = InvalidInputError;
exports.InvalidMerkleProofError = InvalidMerkleProofError;
exports.InvalidMintError = InvalidMintError;
exports.InvalidNFTError = InvalidNFTError;
exports.InvalidPDAError = InvalidPDAError;
exports.InvalidPlatformTiersError = InvalidPlatformTiersError;
exports.InvalidSignatureError = InvalidSignatureError;
exports.InvalidStakeAccountError = InvalidStakeAccountError;
exports.InvalidStakeDelegateError = InvalidStakeDelegateError;
exports.InvalidStakeStatusError = InvalidStakeStatusError;
exports.InvalidStakeTypeError = InvalidStakeTypeError;
exports.InvalidTokenMintError = InvalidTokenMintError;
exports.InvalidTokenOwnerError = InvalidTokenOwnerError;
exports.LAMPORTS_PER_USDC = LAMPORTS_PER_USDC;
exports.LOOKUP_PROGRAM_ADDRESS = LOOKUP_PROGRAM_ADDRESS;
exports.METADATA_PROGRAM_ADDRESS = METADATA_PROGRAM_ADDRESS;
exports.PHRASE_TYPE = PHRASE_TYPE;
exports.PROGRAM_ADDRESS = PROGRAM_ADDRESS;
exports.PROGRAM_ID = PROGRAM_ID;
exports.PermitRpcIsMissedError = PermitRpcIsMissedError;
exports.Phrase = Phrase;
exports.PhraseValidatedAlreadyError = PhraseValidatedAlreadyError;
exports.Profile = Profile;
exports.ProfileNotMatchWithAuthorityError = ProfileNotMatchWithAuthorityError;
exports.RewardBalanceIsZeroError = RewardBalanceIsZeroError;
exports.RewardIsLowError = RewardIsLowError;
exports.RoleMismatchError = RoleMismatchError;
exports.RpcSignerMismatchError = RpcSignerMismatchError;
exports.SNS_PAIR = SNS_PAIR;
exports.StakeAccount = StakeAccount;
exports.StakeLockedError = StakeLockedError;
exports.Validate = Validate;
exports.Validators = Validators;
exports.accessMethodBeet = accessMethodBeet;
exports.accountProviders = accountProviders;
exports.addCampaignMeta = addCampaignMeta;
exports.adjustCampaignPeriodInstructionDiscriminator = adjustCampaignPeriodInstructionDiscriminator;
exports.adjustCampaignPeriodStruct = adjustCampaignPeriodStruct;
exports.adjustOverrunInstructionDiscriminator = adjustOverrunInstructionDiscriminator;
exports.adjustOverrunStruct = adjustOverrunStruct;
exports.adjustPlatformFeeInstructionDiscriminator = adjustPlatformFeeInstructionDiscriminator;
exports.adjustPlatformFeeStruct = adjustPlatformFeeStruct;
exports.adjustRewardInstructionDiscriminator = adjustRewardInstructionDiscriminator;
exports.adjustRewardStruct = adjustRewardStruct;
exports.airdropInstructionDiscriminator = airdropInstructionDiscriminator;
exports.airdropStruct = airdropStruct;
exports.allocateTableInstructionDiscriminator = allocateTableInstructionDiscriminator;
exports.allocateTableStruct = allocateTableStruct;
exports.awaitTransactionSignatureConfirmation = awaitTransactionSignatureConfirmation;
exports.campaignActivityBeet = campaignActivityBeet;
exports.campaignActivityDiscriminator = campaignActivityDiscriminator;
exports.campaignBeet = campaignBeet;
exports.campaignDiscriminator = campaignDiscriminator;
exports.checkPriceInstructionDiscriminator = checkPriceInstructionDiscriminator;
exports.checkPriceStruct = checkPriceStruct;
exports.checkWhitelist = checkWhitelist;
exports.claimCampaignInstructionDiscriminator = claimCampaignInstructionDiscriminator;
exports.claimCampaignStruct = claimCampaignStruct;
exports.claimRewardInstructionDiscriminator = claimRewardInstructionDiscriminator;
exports.claimRewardStruct = claimRewardStruct;
exports.closeConfigInstructionDiscriminator = closeConfigInstructionDiscriminator;
exports.closeConfigStruct = closeConfigStruct;
exports.createAdjustCampaignPeriodInstruction = createAdjustCampaignPeriodInstruction;
exports.createAdjustOverrunInstruction = createAdjustOverrunInstruction;
exports.createAdjustPlatformFeeInstruction = createAdjustPlatformFeeInstruction;
exports.createAdjustRewardInstruction = createAdjustRewardInstruction;
exports.createAirdropInstruction = createAirdropInstruction;
exports.createAirdropSNSInstructions = createAirdropSNSInstructions;
exports.createAllocateTableInstruction = createAllocateTableInstruction;
exports.createArchitectClaimCampaignInstructions = createArchitectClaimCampaignInstructions;
exports.createArchitectCreateCampaignInstructions = createArchitectCreateCampaignInstructions;
exports.createArchitectUpdateCampaignInstructions = createArchitectUpdateCampaignInstructions;
exports.createBatchClaimRewardInstructions = createBatchClaimRewardInstructions;
exports.createBuilderSubmitUtterancesInstructions = createBuilderSubmitUtterancesInstructions;
exports.createCampaignInstructionDiscriminator = createCampaignInstructionDiscriminator;
exports.createCampaignStruct = createCampaignStruct;
exports.createCheckPriceInstruction = createCheckPriceInstruction;
exports.createClaimCampaignInstruction = createClaimCampaignInstruction;
exports.createClaimRewardInstruction = createClaimRewardInstruction;
exports.createClaimRewardInstructions = createClaimRewardInstructions;
exports.createCloseConfigInstruction = createCloseConfigInstruction;
exports.createCreateCampaignInstruction = createCreateCampaignInstruction;
exports.createCreateGuildInstruction = createCreateGuildInstruction;
exports.createCreateProfileInstruction = createCreateProfileInstruction;
exports.createDeactiveTableInstruction = createDeactiveTableInstruction;
exports.createExtendTableInstruction = createExtendTableInstruction;
exports.createFree2playInstruction = createFree2playInstruction;
exports.createGlobalProfileInstructions = createGlobalProfileInstructions;
exports.createGuildClaimRewardInstruction = createGuildClaimRewardInstruction;
exports.createGuildDeleteInstruction = createGuildDeleteInstruction;
exports.createGuildGrantScholarInstruction = createGuildGrantScholarInstruction;
exports.createGuildInstructionDiscriminator = createGuildInstructionDiscriminator;
exports.createGuildStakeNftInstruction = createGuildStakeNftInstruction;
exports.createGuildStruct = createGuildStruct;
exports.createGuildUnstakeNftInstruction = createGuildUnstakeNftInstruction;
exports.createInitializeInstruction = createInitializeInstruction;
exports.createProfileInstructionDiscriminator = createProfileInstructionDiscriminator;
exports.createProfileStruct = createProfileStruct;
exports.createRevokeScholarInstruction = createRevokeScholarInstruction;
exports.createRpcCloseCampaignInstruction = createRpcCloseCampaignInstruction;
exports.createRpcClosePhraseInstruction = createRpcClosePhraseInstruction;
exports.createRpcCloseValidateInstruction = createRpcCloseValidateInstruction;
exports.createRpcPermitInstruction = createRpcPermitInstruction;
exports.createRpcPermitInstructions = createRpcPermitInstructions;
exports.createRpcSubmitUtterancesPromises = createRpcSubmitUtterancesPromises;
exports.createRpcSubmitVerifiableUtterancesPromise = createRpcSubmitVerifiableUtterancesPromise;
exports.createRpcValidateUtterancesPromises = createRpcValidateUtterancesPromises;
exports.createRpcValidateVerifiableUtterancesPromise = createRpcValidateVerifiableUtterancesPromise;
exports.createScholarSignInstruction = createScholarSignInstruction;
exports.createStakeCampaignInstruction = createStakeCampaignInstruction;
exports.createStakeCampaignInstructions = createStakeCampaignInstructions;
exports.createStakeCampaignWithNFTInstructions = createStakeCampaignWithNFTInstructions;
exports.createStakeNftInstruction = createStakeNftInstruction;
exports.createSubmitPhraseInstruction = createSubmitPhraseInstruction;
exports.createSubmitSignedPhraseInstruction = createSubmitSignedPhraseInstruction;
exports.createUnstakeCampaignInstruction = createUnstakeCampaignInstruction;
exports.createUnstakeCampaignInstructions = createUnstakeCampaignInstructions;
exports.createUnstakeNftInstruction = createUnstakeNftInstruction;
exports.createUpdateCampaignInstruction = createUpdateCampaignInstruction;
exports.createUtteranceByOntology = createUtteranceByOntology;
exports.createValidatePhraseInstruction = createValidatePhraseInstruction;
exports.createValidateSignedPhraseInstruction = createValidateSignedPhraseInstruction;
exports.createValidatorValidateUtterancesInstructions = createValidatorValidateUtterancesInstructions;
exports.createVerifyPreStakedNftInstruction = createVerifyPreStakedNftInstruction;
exports.deactiveTableInstructionDiscriminator = deactiveTableInstructionDiscriminator;
exports.deactiveTableStruct = deactiveTableStruct;
exports.decodeText = decodeText;
exports.delCampaignMeta = delCampaignMeta;
exports.deleteOntology = deleteOntology;
exports.deleteOntologyByCanonical = deleteOntologyByCanonical;
exports.encodeText = encodeText;
exports.errorFromCode = errorFromCode;
exports.errorFromName = errorFromName;
exports.extendTableInstructionDiscriminator = extendTableInstructionDiscriminator;
exports.extendTableStruct = extendTableStruct;
exports.farmConfigBeet = farmConfigBeet;
exports.farmConfigDiscriminator = farmConfigDiscriminator;
exports.feedBeet = feedBeet;
exports.feedDiscriminator = feedDiscriminator;
exports.free2playInstructionDiscriminator = free2playInstructionDiscriminator;
exports.free2playStruct = free2playStruct;
exports.getAccountsByDiscriminator = getAccountsByDiscriminator;
exports.getAllCampaignTitles = getAllCampaignTitles;
exports.getAllCampaigns = getAllCampaigns;
exports.getAllCampaignsInfo = getAllCampaignsInfo;
exports.getAppRole = getAppRole;
exports.getAssociateTokenAccount = getAssociateTokenAccount;
exports.getBuilderActivity = getBuilderActivity;
exports.getBuilderActivityInfo = getBuilderActivityInfo;
exports.getBuilderRecentSubmissions = getBuilderRecentSubmissions;
exports.getBuilderSubmissionsToday = getBuilderSubmissionsToday;
exports.getCampaginMeta = getCampaginMeta;
exports.getCampaignFromCampaignAccount = getCampaignFromCampaignAccount;
exports.getCampaignFromCampaignInfo = getCampaignFromCampaignInfo;
exports.getCampaignInfo = getCampaignInfo;
exports.getCampaignStatusFromCampaignAccount = getCampaignStatusFromCampaignAccount;
exports.getCampaignStatusFromCampaignTitle = getCampaignStatusFromCampaignTitle;
exports.getCampaignStatusFromCampaignTitles = getCampaignStatusFromCampaignTitles;
exports.getKanonNfts = getKanonNfts;
exports.getOrCreateAssociateTokenAccount = getOrCreateAssociateTokenAccount;
exports.getProfileStatus = getProfileStatus;
exports.getRpcAuthToken = getRpcAuthToken;
exports.getRpcListActivity = getRpcListActivity;
exports.getRpcSubmissionStatus = getRpcSubmissionStatus;
exports.getRpcValidationStatus = getRpcValidationStatus;
exports.getSolBalance = getSolBalance;
exports.getSubmissionsValidationsInfo = getSubmissionsValidationsInfo;
exports.getTokenBalance = getTokenBalance;
exports.getTotalAvailableRewards = getTotalAvailableRewards;
exports.getUnusedCampaignTitle = getUnusedCampaignTitle;
exports.getUtterancesAndHistoriesForArchitect = getUtterancesAndHistoriesForArchitect;
exports.getUtterancesAndHistoriesForBuilder = getUtterancesAndHistoriesForBuilder;
exports.getUtterancesAndHistoriesForValidator = getUtterancesAndHistoriesForValidator;
exports.getValidatorActivity = getValidatorActivity;
exports.getValidatorActivityInfo = getValidatorActivityInfo;
exports.getValidatorRecentValidations = getValidatorRecentValidations;
exports.getValidatorValidationsToday = getValidatorValidationsToday;
exports.guildBeet = guildBeet;
exports.guildClaimRewardInstructionDiscriminator = guildClaimRewardInstructionDiscriminator;
exports.guildClaimRewardStruct = guildClaimRewardStruct;
exports.guildDeleteInstructionDiscriminator = guildDeleteInstructionDiscriminator;
exports.guildDeleteStruct = guildDeleteStruct;
exports.guildDiscriminator = guildDiscriminator;
exports.guildGrantScholarInstructionDiscriminator = guildGrantScholarInstructionDiscriminator;
exports.guildGrantScholarStruct = guildGrantScholarStruct;
exports.guildStakeNftInstructionDiscriminator = guildStakeNftInstructionDiscriminator;
exports.guildStakeNftStruct = guildStakeNftStruct;
exports.guildUnstakeNftInstructionDiscriminator = guildUnstakeNftInstructionDiscriminator;
exports.guildUnstakeNftStruct = guildUnstakeNftStruct;
exports.initializeInstructionDiscriminator = initializeInstructionDiscriminator;
exports.initializeStruct = initializeStruct;
exports.isEmptyAddress = isEmptyAddress;
exports.isEqualAddress = isEqualAddress;
exports.isIncludingAddress = isIncludingAddress;
exports.isValidAddress = isValidAddress;
exports.offchainBeet = offchainBeet;
exports.phraseBeet = phraseBeet;
exports.phraseDiscriminator = phraseDiscriminator;
exports.phraseTypeBeet = phraseTypeBeet;
exports.profileBeet = profileBeet;
exports.profileDiscriminator = profileDiscriminator;
exports.revokeScholarInstructionDiscriminator = revokeScholarInstructionDiscriminator;
exports.revokeScholarStruct = revokeScholarStruct;
exports.roleBeet = roleBeet;
exports.rpcBatchSubmitPhrases = rpcBatchSubmitPhrases;
exports.rpcBatchSubmitVerifiablePhrases = rpcBatchSubmitVerifiablePhrases;
exports.rpcBatchValidatePhrase = rpcBatchValidatePhrase;
exports.rpcBatchValidateVerifiablePhrases = rpcBatchValidateVerifiablePhrases;
exports.rpcCloseCampaignInstructionDiscriminator = rpcCloseCampaignInstructionDiscriminator;
exports.rpcCloseCampaignStruct = rpcCloseCampaignStruct;
exports.rpcClosePhraseInstructionDiscriminator = rpcClosePhraseInstructionDiscriminator;
exports.rpcClosePhraseStruct = rpcClosePhraseStruct;
exports.rpcCloseValidateInstructionDiscriminator = rpcCloseValidateInstructionDiscriminator;
exports.rpcCloseValidateStruct = rpcCloseValidateStruct;
exports.rpcPermitInstructionDiscriminator = rpcPermitInstructionDiscriminator;
exports.rpcPermitStruct = rpcPermitStruct;
exports.rpcRequestAuth = rpcRequestAuth;
exports.rpcSubmitPhrase = rpcSubmitPhrase;
exports.rpcValidatePhrase = rpcValidatePhrase;
exports.rpcVerifyAuth = rpcVerifyAuth;
exports.runPromisesSequentially = runPromisesSequentially;
exports.scholarSignInstructionDiscriminator = scholarSignInstructionDiscriminator;
exports.scholarSignStruct = scholarSignStruct;
exports.sendAndConfirmWithRetry = sendAndConfirmWithRetry;
exports.sendInstructions = sendInstructions;
exports.sleep = sleep;
exports.stakeAccountBeet = stakeAccountBeet;
exports.stakeAccountDiscriminator = stakeAccountDiscriminator;
exports.stakeAccountRoleBeet = stakeAccountRoleBeet;
exports.stakeAccountTypeBeet = stakeAccountTypeBeet;
exports.stakeCampaignInstructionDiscriminator = stakeCampaignInstructionDiscriminator;
exports.stakeCampaignStruct = stakeCampaignStruct;
exports.stakeNftInstructionDiscriminator = stakeNftInstructionDiscriminator;
exports.stakeNftStruct = stakeNftStruct;
exports.stakingTypeBeet = stakingTypeBeet;
exports.submitOntology = submitOntology;
exports.submitPhraseInstructionDiscriminator = submitPhraseInstructionDiscriminator;
exports.submitPhraseStruct = submitPhraseStruct;
exports.submitSignedPhraseInstructionDiscriminator = submitSignedPhraseInstructionDiscriminator;
exports.submitSignedPhraseStruct = submitSignedPhraseStruct;
exports.tagBeet = tagBeet;
exports.tierBeet = tierBeet;
exports.unstakeCampaignInstructionDiscriminator = unstakeCampaignInstructionDiscriminator;
exports.unstakeCampaignStruct = unstakeCampaignStruct;
exports.unstakeNftInstructionDiscriminator = unstakeNftInstructionDiscriminator;
exports.unstakeNftStruct = unstakeNftStruct;
exports.updateCampaignInstructionDiscriminator = updateCampaignInstructionDiscriminator;
exports.updateCampaignStruct = updateCampaignStruct;
exports.validateBeet = validateBeet;
exports.validateDiscriminator = validateDiscriminator;
exports.validatePhraseInstructionDiscriminator = validatePhraseInstructionDiscriminator;
exports.validatePhraseStruct = validatePhraseStruct;
exports.validateSignedPhraseInstructionDiscriminator = validateSignedPhraseInstructionDiscriminator;
exports.validateSignedPhraseStruct = validateSignedPhraseStruct;
exports.validatorsBeet = validatorsBeet;
exports.validatorsDiscriminator = validatorsDiscriminator;
exports.verifyPreStakedNftInstructionDiscriminator = verifyPreStakedNftInstructionDiscriminator;
exports.verifyPreStakedNftStruct = verifyPreStakedNftStruct;
//# sourceMappingURL=dyf.cjs.development.js.map
