var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports, function(exports2) {
      "use strict";
      const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
      function noop2() {
        return void 0;
      }
      function getGlobals() {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function typeIsObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      const rethrowAssertionErrorRejection = noop2;
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseResolve = Promise.resolve.bind(originalPromise);
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return originalPromiseResolve(value);
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      const queueMicrotask = (() => {
        const globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === "function") {
          return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith(void 0);
        return (fn) => PerformPromiseThen(resolvedPromise, fn);
      })();
      function reflectCall(F2, V, args) {
        if (typeof F2 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F2, V, args);
      }
      function promiseCall(F2, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F2, V, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        forEach(callback) {
          let i2 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i2 !== elements.length || node._next !== void 0) {
            if (i2 === elements.length) {
              node = node._next;
              elements = node._elements;
              i2 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i2]);
            ++i2;
          }
        }
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve, reject) => {
          reader._closedPromise_resolve = resolve;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
      const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
      const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
      const PullSteps = SymbolPolyfill("[[PullSteps]]");
      const NumberIsFinite = Number.isFinite || function(x2) {
        return typeof x2 === "number" && isFinite(x2);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x2) {
        return typeof x2 === "object" || typeof x2 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x2, context) {
        if (typeof x2 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      function assertObject(x2, context) {
        if (!isObject(x2)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x2, position, context) {
        if (x2 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x2, field, context) {
        if (x2 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x2) {
        return x2 === 0 ? 0 : x2;
      }
      function integerPart(x2) {
        return censorNegativeZero(MathTrunc(x2));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x2 = Number(value);
        x2 = censorNegativeZero(x2);
        if (!NumberIsFinite(x2)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x2 = integerPart(x2);
        if (x2 < lowerBound || x2 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x2) || x2 === 0) {
          return 0;
        }
        return x2;
      }
      function assertReadableStream(x2, context) {
        if (!IsReadableStream(x2)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("iterate"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("finish iterating"));
          }
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      if (AsyncIteratorPrototype !== void 0) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      }
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x2) {
        return x2 !== x2;
      };
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      function TransferArrayBuffer(O) {
        return O;
      }
      function IsDetachedBuffer(O) {
        return false;
      }
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer))
            ;
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e2);
        }
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const entry = this._queue.shift();
            this._queueTotalSize -= entry.byteLength;
            ReadableByteStreamControllerHandleQueueDrain(this);
            const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
            readRequest._chunkSteps(view);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
          return false;
        }
        return x2 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }, (e2) => {
          ReadableByteStreamControllerError(controller, e2);
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        if (maxAlignedBytes > currentAlignedBytes) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
          elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        const buffer = TransferArrayBuffer(view.buffer);
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          bytesFilled: 0,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            readIntoRequest._errorSteps(e2);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled > 0) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            throw e2;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer))
            ;
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        if (ReadableStreamHasDefaultReader(stream)) {
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e2) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, (r2) => {
          ReadableByteStreamControllerError(controller, r2);
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readIntoRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
      }
      function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x2, context) {
        if (!IsWritableStream(x2)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal2(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
          return false;
        }
        return x2 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve, reject) => {
          const closeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve, reject) => {
          const writeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        error(e2 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e2);
        }
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (r2) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r2);
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let writeAlgorithm = () => promiseResolvedWith(void 0);
        let closeAlgorithm = () => promiseResolvedWith(void 0);
        let abortAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve, reject) => {
          writer._closedPromise_resolve = resolve;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve, reject) => {
          writer._readyPromise_resolve = resolve;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a) {
          return false;
        }
      }
      function createDOMExceptionPolyfill() {
        const ctor = function DOMException3(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = new DOMException$1("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve(void 0);
            }
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e2);
        }
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
        }, (e2) => {
          ReadableStreamDefaultControllerError(controller, e2);
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e2) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, (r2) => {
          ReadableStreamDefaultControllerError(controller, r2);
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r2) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r2) => {
            if (thisReader !== reader) {
              return;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r2);
            ReadableByteStreamControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal2(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
      }
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      if (typeof SymbolPolyfill.asyncIterator === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
          value: ReadableStream2.prototype.values,
          writable: true,
          configurable: true
        });
      }
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop2);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
          reader._readRequests = new SimpleQueue();
        }
      }
      function ReadableStreamError(stream, e2) {
        stream._state = "errored";
        stream._storedError = e2;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e2);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._errorSteps(e2);
          });
          reader._readRequests = new SimpleQueue();
        } else {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._errorSteps(e2);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
      }
      function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      Object.defineProperty(byteLengthSizeFunction, "name", {
        value: "size",
        configurable: true
      });
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      Object.defineProperty(countSizeFunction, "name", {
        value: "size",
        configurable: true
      });
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve) => {
            startPromise_resolve = resolve;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          TransformStreamErrorWritableAndUnblockWrite(stream, reason);
          return promiseResolvedWith(void 0);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
          return false;
        }
        return x2 instanceof TransformStream;
      }
      function TransformStreamError(stream, e2) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
        TransformStreamErrorWritableAndUnblockWrite(stream, e2);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve) => {
          stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
          return false;
        }
        return x2 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm = (chunk) => {
          try {
            TransformStreamDefaultControllerEnqueue(controller, chunk);
            return promiseResolvedWith(void 0);
          } catch (transformResultE) {
            return promiseRejectedWith(transformResultE);
          }
        };
        let flushAlgorithm = () => promiseResolvedWith(void 0);
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e2) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e2) {
        TransformStreamError(controller._controlledTransformStream, e2);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r2) => {
          TransformStreamError(controller._controlledTransformStream, r2);
          throw r2;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        TransformStreamError(stream, reason);
        return promiseResolvedWith(void 0);
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        return transformPromiseWith(flushPromise, () => {
          if (readable._state === "errored") {
            throw readable._storedError;
          }
          ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, (r2) => {
          TransformStreamError(stream, r2);
          throw readable._storedError;
        });
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports2.CountQueuingStrategy = CountQueuingStrategy;
      exports2.ReadableByteStreamController = ReadableByteStreamController;
      exports2.ReadableStream = ReadableStream2;
      exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports2.TransformStream = TransformStream;
      exports2.TransformStreamDefaultController = TransformStreamDefaultController;
      exports2.WritableStream = WritableStream;
      exports2.WritableStreamDefaultController = WritableStreamDefaultController;
      exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE2 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error) {
          process2.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE2));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// node_modules/fetch-blob/index.js
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _Blob, Blob2, fetch_blob_default;
var init_fetch_blob = __esm({
  "node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams(), 1);
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    fetch_blob_default = Blob2;
  }
});

// node_modules/fetch-blob/file.js
var _File, File2, file_default;
var init_file = __esm({
  "node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = class File extends fetch_blob_default {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File2 = _File;
    file_default = File2;
  }
});

// node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F2, B = fetch_blob_default) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
var t, i, h, r, m, f, e, x, FormData;
var init_esm_min = __esm({
  "node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new file_default([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
  }
});

// node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "node_modules/node-domexception/index.js"(exports, module2) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module2.exports = globalThis.DOMException;
  }
});

// node_modules/fetch-blob/from.js
var import_node_fs, import_node_domexception, stat, BlobDataItem;
var init_from = __esm({
  "node_modules/fetch-blob/from.js"() {
    import_node_fs = require("node:fs");
    import_node_domexception = __toESM(require_node_domexception(), 1);
    init_file();
    init_fetch_blob();
    ({ stat } = import_node_fs.promises);
    BlobDataItem = class {
      #path;
      #start;
      constructor(options) {
        this.#path = options.path;
        this.#start = options.start;
        this.size = options.size;
        this.lastModified = options.lastModified;
      }
      slice(start, end) {
        return new BlobDataItem({
          path: this.#path,
          lastModified: this.lastModified,
          size: end - start,
          start: this.#start + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat(this.#path);
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* (0, import_node_fs.createReadStream)(this.#path, {
          start: this.#start,
          end: this.#start + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
  }
});

// node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// src/latest.tsx
var latest_exports = {};
__export(latest_exports, {
  default: () => LatestSpin
});

// src/components/details-list/details-list.tsx
var import_api8 = require("@raycast/api");

// src/components/details-list/details-list-item.tsx
var import_react2 = require("react");
var import_api7 = require("@raycast/api");

// src/lib/spin/service/service.ts
var import_api2 = require("@raycast/api");

// src/lib/spin/helpers.ts
var import_child_process = require("child_process");

// node_modules/node-fetch/src/index.js
var import_node_http2 = __toESM(require("node:http"), 1);
var import_node_https = __toESM(require("node:https"), 1);
var import_node_zlib = __toESM(require("node:zlib"), 1);
var import_node_stream2 = __toESM(require("node:stream"), 1);
var import_node_buffer2 = require("node:buffer");

// node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default = dataUriToBuffer;

// node_modules/node-fetch/src/body.js
var import_node_stream = __toESM(require("node:stream"), 1);
var import_node_util = require("node:util");
var import_node_buffer = require("node:buffer");
init_fetch_blob();
init_esm_min();

// node_modules/node-fetch/src/errors/base.js
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};

// node_modules/node-fetch/src/errors/fetch-error.js
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};

// node_modules/node-fetch/src/utils/is.js
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var isDomainOrSubdomain = (destination, original) => {
  const orig = new URL(original).hostname;
  const dest = new URL(destination).hostname;
  return orig === dest || orig.endsWith(`.${dest}`);
};
var isSameProtocol = (destination, original) => {
  const orig = new URL(original).protocol;
  const dest = new URL(destination).protocol;
  return orig === dest;
};

// node_modules/node-fetch/src/body.js
var pipeline = (0, import_node_util.promisify)(import_node_stream.default.pipeline);
var INTERNALS = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = import_node_buffer.Buffer.from(body.toString());
    } else if (isBlob(body)) {
    } else if (import_node_buffer.Buffer.isBuffer(body)) {
    } else if (import_node_util.types.isAnyArrayBuffer(body)) {
      body = import_node_buffer.Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = import_node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_node_stream.default) {
    } else if (body instanceof FormData) {
      body = formDataToBlob(body);
      boundary = body.type.split("=")[1];
    } else {
      body = import_node_buffer.Buffer.from(String(body));
    }
    let stream = body;
    if (import_node_buffer.Buffer.isBuffer(body)) {
      stream = import_node_stream.default.Readable.from(body);
    } else if (isBlob(body)) {
      stream = import_node_stream.default.Readable.from(body.stream());
    }
    this[INTERNALS] = {
      body,
      stream,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_node_stream.default) {
      body.on("error", (error_) => {
        const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS].stream;
  }
  get bodyUsed() {
    return this[INTERNALS].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async formData() {
    const ct = this.headers.get("content-type");
    if (ct.startsWith("application/x-www-form-urlencoded")) {
      const formData = new FormData();
      const parameters = new URLSearchParams(await this.text());
      for (const [name, value] of parameters) {
        formData.append(name, value);
      }
      return formData;
    }
    const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
    return toFormData2(this.body, ct);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
    const buf = await this.arrayBuffer();
    return new fetch_blob_default([buf], {
      type: ct
    });
  }
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
  async text() {
    const buffer = await consumeBody(this);
    return new TextDecoder().decode(buffer);
  }
  buffer() {
    return consumeBody(this);
  }
};
Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true },
  data: { get: (0, import_node_util.deprecate)(() => {
  }, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
});
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance[INTERNALS];
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_node_stream.PassThrough({ highWaterMark });
    p2 = new import_node_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS].stream = p1;
    body = p2;
  }
  return body;
};
var getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (import_node_buffer.Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body instanceof FormData) {
    return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
  }
  if (body instanceof import_node_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request[INTERNALS];
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (import_node_buffer.Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  return null;
};
var writeToStream = async (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else {
    await pipeline(body, dest);
  }
};

// node_modules/node-fetch/src/headers.js
var import_node_util2 = require("node:util");
var import_node_http = __toESM(require("node:http"), 1);
var validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error;
  }
};
var validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
    throw error;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init) {
    let result = [];
    if (init instanceof Headers) {
      const raw = init.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init == null) {
    } else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
      const method = init[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init].map((pair) => {
          if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}

// node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};

// node_modules/node-fetch/src/response.js
var INTERNALS2 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status != null ? options.status : 200;
    const headers = new Headers(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS2] = {
      type: "default",
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS2].type;
  }
  get url() {
    return this[INTERNALS2].url || "";
  }
  get status() {
    return this[INTERNALS2].status;
  }
  get ok() {
    return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
  }
  get redirected() {
    return this[INTERNALS2].counter > 0;
  }
  get statusText() {
    return this[INTERNALS2].statusText;
  }
  get headers() {
    return this[INTERNALS2].headers;
  }
  get highWaterMark() {
    return this[INTERNALS2].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS2].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});

// node_modules/node-fetch/src/request.js
var import_node_url = require("node:url");
var import_node_util3 = require("node:util");

// node_modules/node-fetch/src/utils/get-search.js
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};

// node_modules/node-fetch/src/utils/referrer.js
var import_node_net = require("node:net");
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
var ReferrerPolicy = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]);
var DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}

// node_modules/node-fetch/src/request.js
var INTERNALS3 = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS3] === "object";
};
var doBadDataWarn = (0, import_node_util3.deprecate)(() => {
}, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
var Request = class extends Body {
  constructor(input, init = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== "" || parsedURL.password !== "") {
      throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
    }
    let method = init.method || input.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest(init) && "data" in init) {
      doBadDataWarn();
    }
    if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init.size || input.size || 0
    });
    const headers = new Headers(init.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init) {
      signal = init.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    let referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === "") {
      referrer = "no-referrer";
    } else if (referrer) {
      const parsedReferrer = new URL(referrer);
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
    } else {
      referrer = void 0;
    }
    this[INTERNALS3] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal,
      referrer
    };
    this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
    this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
    this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
    this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
  }
  get method() {
    return this[INTERNALS3].method;
  }
  get url() {
    return (0, import_node_url.format)(this[INTERNALS3].parsedURL);
  }
  get headers() {
    return this[INTERNALS3].headers;
  }
  get redirect() {
    return this[INTERNALS3].redirect;
  }
  get signal() {
    return this[INTERNALS3].signal;
  }
  get referrer() {
    if (this[INTERNALS3].referrer === "no-referrer") {
      return "";
    }
    if (this[INTERNALS3].referrer === "client") {
      return "about:client";
    }
    if (this[INTERNALS3].referrer) {
      return this[INTERNALS3].referrer.toString();
    }
    return void 0;
  }
  get referrerPolicy() {
    return this[INTERNALS3].referrerPolicy;
  }
  set referrerPolicy(referrerPolicy) {
    this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true },
  referrer: { enumerable: true },
  referrerPolicy: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS3];
  const headers = new Headers(request[INTERNALS3].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (request.referrerPolicy === "") {
    request.referrerPolicy = DEFAULT_REFERRER_POLICY;
  }
  if (request.referrer && request.referrer !== "no-referrer") {
    request[INTERNALS3].referrer = determineRequestsReferrer(request);
  } else {
    request[INTERNALS3].referrer = "no-referrer";
  }
  if (request[INTERNALS3].referrer instanceof URL) {
    headers.set("Referer", request.referrer);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip, deflate, br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const options = {
    path: parsedURL.pathname + search,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return {
    parsedURL,
    options
  };
};

// node_modules/node-fetch/src/errors/abort-error.js
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};

// node_modules/node-fetch/src/index.js
init_esm_min();
init_from();
var supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer2.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = import_node_buffer2.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer2.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer2.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}

// src/lib/spin/helpers.ts
var import_https = __toESM(require("https"));
var import_api = require("@raycast/api");

// src/lib/spin/types.ts
var ServiceState = /* @__PURE__ */ ((ServiceState3) => {
  ServiceState3["Active"] = "active";
  ServiceState3["Activating"] = "activating";
  ServiceState3["Unknown"] = "unknown";
  return ServiceState3;
})(ServiceState || {});

// src/lib/spin/helpers.ts
var httpsAgent = new import_https.default.Agent({
  rejectUnauthorized: false
});
async function fetchUnauthorized(url) {
  return await fetch(url, { agent: httpsAgent });
}
var execp = (command, env = {}) => {
  return new Promise((resolve, reject) => {
    (0, import_child_process.exec)(command, { env: __spreadProps(__spreadValues(__spreadValues({}, process.env), env), { SPIN_NO_UPDATE: "1", PATH: "/bin:/usr/bin:/usr/sbin:/usr/local/bin" }) }, (err, stdout, stderr) => {
      const resp = { stdout, stderr };
      if (err)
        reject(resp);
      else
        resolve(resp);
    });
  });
};
function iconFromSpinServiceState(state) {
  switch (state) {
    case "active" /* Active */: {
      return { source: import_api.Icon.Dot, tintColor: import_api.Color.Green };
    }
    case "activating" /* Activating */: {
      return { source: import_api.Icon.Dot, tintColor: import_api.Color.Blue };
    }
    default: {
      return { source: import_api.Icon.Dot };
    }
  }
}
async function spinCommand(command, instance, json = true) {
  const cmd = ["spin", command];
  if (json)
    cmd.push("--json");
  return execp(cmd.join(" "), { SPIN_INSTANCE: instance });
}
async function insomniaCommand(instance) {
  return execp("open /Applications/Insomnia.app", { SPIN_INSTANCE: instance });
}
async function spinShow(instance, latest) {
  let show;
  if (latest)
    show = (await spinCommand("show --latest", void 0)).stdout;
  else
    show = (await spinCommand("show", instance)).stdout;
  const showContent = JSON.parse(show);
  return showContent;
}
async function spinServiceStatus(spin, service) {
  let state = "unknown" /* Unknown */;
  const statusUrl = `https://spinnerama.${spin.fqdn}/api/v1/source/status?name=${service.slug.repo}`;
  try {
    const statusResponse = await (await fetchUnauthorized(statusUrl)).json();
    if (statusResponse.status) {
      const validStates = Object.values(ServiceState);
      if (validStates.includes(statusResponse.status))
        state = statusResponse.status;
    }
  } catch (e2) {
  }
  return state;
}

// src/lib/spin/constants.ts
var REFRESH_INTERVAL = 10;
var DEFAULT_SQL_PORT = 3306;

// src/lib/spin/util.ts
var importantShopifyServices = ["shopify", "web"];
var parseRepoSlug = (slug) => {
  const repositoryParts = slug.trim().split("--");
  return repositoryParts.length === 1 && repositoryParts[0] !== "" ? {
    owner: "Shopify",
    repo: repositoryParts[0]
  } : {
    owner: repositoryParts[0],
    repo: repositoryParts[1]
  };
};
var sortShopifyServiceNames = (a, b) => {
  const repoA = parseRepoSlug(a).repo;
  const repoB = parseRepoSlug(b).repo;
  const hasA = importantShopifyServices.indexOf(repoA) + 1;
  const hasB = importantShopifyServices.indexOf(repoB) + 1;
  if (hasA && hasB)
    return hasA - hasB;
  if (hasA)
    return -1;
  if (hasB)
    return 1;
  return a.localeCompare(b);
};

// src/lib/spin/service/service.ts
var Service = class {
  constructor(data, spin) {
    this.data = data;
    this.spin = spin;
    this.name = this.data.name;
    this.branch = this.data.branch;
    this.rev = this.data.revision;
    this.slug = parseRepoSlug(this.name);
  }
  async open() {
    await (0, import_api2.open)(`https://${this.fqdn}`);
  }
  async code() {
    const code = (await spinCommand(`code ${this.spin.name} ${this.name}`, this.spin.name, true)).stdout;
    const codeResp = JSON.parse(code);
    return codeResp;
  }
  async insomnia() {
    await insomniaCommand(this.spin.name);
  }
  async openSql() {
    const port = await this.sqlPort();
    const openUrl = `mysql://root@${this.fqdn}:${port}`;
    console.log(openUrl);
    await (0, import_api2.open)(openUrl);
  }
  async sqlPort() {
    return DEFAULT_SQL_PORT;
  }
};

// src/lib/spin/service/instance-service.ts
var InstanceService = class extends Service {
  constructor(data, spin) {
    super(data, spin);
  }
  get fqdn() {
    return `${this.slug.repo}.${this.spin.data.fqdn}`;
  }
  async getState() {
    return spinServiceStatus(this.spin, this);
  }
  async sqlPort() {
    const slug = this.name;
    const portNumberCmd = await this.spin.shellCommand(`cat /run/ports/${slug}/svc/mysql`).catch((e2) => e2);
    if (!portNumberCmd.stdout || isNaN(portNumberCmd.stdout)) {
      throw new Error("could not get mysql port");
    }
    return Number(portNumberCmd.stdout);
  }
};

// src/lib/spin/spin-type/spin.ts
var Spin = class {
  constructor(data) {
    this.data = data;
    this.name = data.name;
    this.fqdn = data.fqdn;
    this.services = this.getServices(data);
  }
  async destroy() {
    const destroy = (await spinCommand(`destroy`, this.name, true)).stdout;
    const destroyResp = JSON.parse(destroy);
    return destroyResp;
  }
  async shellCommand(cmd) {
    return await spinCommand(`shell -- "${cmd}"`, this.name, false);
  }
  async getSshCommand() {
    return (await spinCommand("shell --show", this.name, false)).stdout;
  }
  isReady() {
    return this.state === "available" /* Available */;
  }
};

// src/lib/spin/spin-type/instance.ts
var Instance = class extends Spin {
  constructor(data) {
    super(data);
  }
  get created() {
    const creationTime = this.data.created || this.data.created_at;
    if (creationTime)
      return new Date(creationTime);
  }
  get state() {
    if (this.data.suspended)
      return "suspended" /* Suspended */;
    return this.data.status;
  }
  get serviceName() {
    return this.services.map(({ slug: { repo } }) => repo).join(", ");
  }
  hasService(name) {
    return this.services.some((service) => service.slug.repo === name);
  }
  getServices(data) {
    const repos = (data?.repos || data?.repositories) ?? [];
    repos.sort(({ name: a }, { name: b }) => sortShopifyServiceNames(a, b));
    return repos.map((repo) => new InstanceService(repo, this));
  }
  async getSpinUrls() {
    let urls = [];
    if (this.hasService("shopify")) {
      const { fqdn } = this;
      urls = [
        { service: "Shopify", url: `https://shop1.shopify.${fqdn}/` },
        { service: "Shopify Admin", url: `https://shop1.shopify.${fqdn}/admin/` },
        { service: "Services Internal", url: `https://app.shopify.${fqdn}/services/internal/` },
        { service: "Shopify GraphiQL", url: `https://app.shopify.${fqdn}/services/internal/shops/1/graphql/` }
      ];
    }
    try {
      const spinneramaUrl = `https://spinnerama.${this.fqdn}/api/v1/spin/urls`;
      const resp = await (await fetchUnauthorized(spinneramaUrl)).json();
      urls = resp.urls;
    } catch (e2) {
    }
    return {
      fqdn: this.fqdn,
      urls
    };
  }
};

// src/components/actions.tsx
var import_api6 = require("@raycast/api");

// src/hooks/use-spin-urls.ts
var import_react = require("react");

// src/components/browser-list/browser-list.tsx
var import_api5 = require("@raycast/api");

// src/components/browser-list/browser-list-item.tsx
var import_api4 = require("@raycast/api");

// src/components/browser-list/open-url-in-browser-action.tsx
var import_api3 = require("@raycast/api");

// src/components/actions.tsx
var showError = async (action, message) => {
  await (0, import_api6.showToast)({
    style: import_api6.Toast.Style.Failure,
    title: `Could not ${action}`,
    message
  });
};
var ensureSpinReady = async (spin, action) => {
  if (!spin.isReady()) {
    await showError(action, 'Status is not "available"');
    return false;
  }
  return true;
};
function SpinOpenAction({ spin, service }) {
  const doOpen = async () => {
    if (await ensureSpinReady(spin, "open in browser")) {
      await service.open();
      await (0, import_api6.showHUD)(`Opened "${service.name}"`);
    }
  };
  return /* @__PURE__ */ _jsx(import_api6.Action, {
    icon: import_api6.Icon.Globe,
    title: "Open in Browser",
    onAction: doOpen
  });
}
function SpinCodeAction({ spin, service }) {
  const action = "open in VSCode";
  const doCode = async () => {
    if (await ensureSpinReady(spin, action)) {
      const loadingToast = await (0, import_api6.showToast)({
        style: import_api6.Toast.Style.Animated,
        title: "Opening with VSCode..."
      });
      const resp = await service.code();
      await loadingToast.hide();
      if (!resp.error) {
        await (0, import_api6.showHUD)(`Opened VSCode for "${service.name}"`);
      } else {
        await showError(action, resp.error);
      }
    }
  };
  return /* @__PURE__ */ _jsx(import_api6.Action, {
    icon: import_api6.Icon.Hammer,
    title: "Open in VSCode",
    onAction: doCode
  });
}
function OpenInsomniaAction({ spin, service }) {
  const action = "open in Insomnia";
  const doCode = async () => {
    if (await ensureSpinReady(spin, action)) {
      const loadingToast = await (0, import_api6.showToast)({
        style: import_api6.Toast.Style.Animated,
        title: "Opening with Insomnia..."
      });
      try {
        await service.insomnia();
      } catch (e2) {
        let msg;
        if (e2 instanceof Error)
          msg = e2.message;
        await loadingToast.hide();
        await (0, import_api6.showToast)({
          style: import_api6.Toast.Style.Failure,
          title: "Could not open Insomnia",
          message: msg
        });
        return;
      }
      await (0, import_api6.showHUD)(`Opened Insomnia for "${service.name}"`);
    }
  };
  return /* @__PURE__ */ _jsx(import_api6.Action, {
    icon: "insomnia-logo.png",
    shortcut: { modifiers: ["cmd"], key: "i" },
    title: "Open in Insomnia",
    onAction: doCode
  });
}
function OpenSQLClientAction({ service }) {
  const doOpen = async () => {
    const loadingToast = await (0, import_api6.showToast)({
      style: import_api6.Toast.Style.Animated,
      title: "Getting MySQL port..."
    });
    try {
      await service.openSql();
    } catch (e2) {
      let msg;
      if (e2 instanceof Error)
        msg = e2.message;
      await loadingToast.hide();
      await (0, import_api6.showToast)({
        style: import_api6.Toast.Style.Failure,
        title: "Could not open SQL client",
        message: msg
      });
      return;
    }
    await (0, import_api6.showHUD)(`Opened SQL Client for "${service.name}"`);
  };
  return /* @__PURE__ */ _jsx(import_api6.Action, {
    icon: "sequel_ace.png",
    title: "Open SQL Client",
    onAction: doOpen,
    shortcut: { modifiers: ["cmd"], key: "s" }
  });
}

// src/components/details-list/details-list-item.tsx
function SpinDetailsListItem({ spin, service }) {
  const subtitle = service.branch;
  const [status, setStatus] = (0, import_react2.useState)();
  (0, import_react2.useEffect)(() => {
    (async () => {
      setStatus(await service.getState());
    })();
  }, []);
  return /* @__PURE__ */ _jsx(import_api7.List.Item, __spreadProps(__spreadValues({
    title: service.name,
    subtitle
  }, status && { accessoryTitle: status, accessoryIcon: iconFromSpinServiceState(status) }), {
    actions: /* @__PURE__ */ _jsx(import_api7.ActionPanel, null, /* @__PURE__ */ _jsx(SpinCodeAction, {
      service,
      spin
    }), /* @__PURE__ */ _jsx(SpinOpenAction, {
      service,
      spin
    }), /* @__PURE__ */ _jsx(OpenSQLClientAction, {
      service,
      spin
    }), /* @__PURE__ */ _jsx(OpenInsomniaAction, {
      service,
      spin
    }))
  }));
}

// src/components/details-list/details-list.tsx
function SpinDetailsList({ spin, loading = false }) {
  return /* @__PURE__ */ _jsx(import_api8.List, __spreadProps(__spreadValues({}, spin?.name && { navigationTitle: `Spin "${spin.name}"` }), {
    isLoading: loading
  }), (spin?.services ?? []).map((service) => /* @__PURE__ */ _jsx(SpinDetailsListItem, {
    key: service.name,
    spin,
    service
  })));
}

// src/hooks/use-spin-show.ts
var import_react3 = require("react");
var import_api9 = require("@raycast/api");
function useSpinShow(instance, latest) {
  const [loading, setLoading] = (0, import_react3.useState)(true);
  const [spinData, setSpinData] = (0, import_react3.useState)();
  const { pop } = (0, import_api9.useNavigation)();
  async function errorAndQuit(msg) {
    await (0, import_api9.showToast)({
      style: import_api9.Toast.Style.Failure,
      title: "Could not get data",
      message: msg ?? ""
    });
    pop();
  }
  const updateSpinShow = async () => {
    setLoading(true);
    let spinShowResponse;
    try {
      spinShowResponse = await spinShow(instance, latest);
    } catch (e2) {
      await errorAndQuit();
      return;
    }
    if (spinShowResponse.error) {
      await errorAndQuit(spinShowResponse?.error);
      return;
    }
    setSpinData(new Instance(spinShowResponse));
    setLoading(false);
  };
  (0, import_react3.useEffect)(() => {
    const id = setInterval(() => updateSpinShow(), 1e3 * REFRESH_INTERVAL);
    updateSpinShow();
    return () => {
      clearInterval(id);
    };
  }, []);
  return { loading, data: spinData, update: updateSpinShow };
}

// src/latest.tsx
function LatestSpin() {
  const { data: spin, loading } = useSpinShow(void 0, true);
  return /* @__PURE__ */ _jsx(SpinDetailsList, {
    spin,
    loading
  });
}
module.exports = __toCommonJS(latest_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvc3R1Yi9zeW1ib2wudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvdXRpbHMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL2hlbHBlcnMvbWlzY2VsbGFuZW91cy50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvaGVscGVycy93ZWJpZGwudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3NpbXBsZS1xdWV1ZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtL2dlbmVyaWMtcmVhZGVyLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9hYnN0cmFjdC1vcHMvaW50ZXJuYWwtbWV0aG9kcy50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9zdHViL251bWJlci1pc2Zpbml0ZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9zdHViL21hdGgtdHJ1bmMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvYmFzaWMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvcmVhZGFibGUtc3RyZWFtLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9yZWFkYWJsZS1zdHJlYW0vZGVmYXVsdC1yZWFkZXIudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvdGFyZ2V0L2VzMjAxOC9zdHViL2FzeW5jLWl0ZXJhdG9yLXByb3RvdHlwZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtL2FzeW5jLWl0ZXJhdG9yLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL3N0dWIvbnVtYmVyLWlzbmFuLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9hYnN0cmFjdC1vcHMvZWNtYXNjcmlwdC50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvYWJzdHJhY3Qtb3BzL21pc2NlbGxhbmVvdXMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL2Fic3RyYWN0LW9wcy9xdWV1ZS13aXRoLXNpemVzLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9yZWFkYWJsZS1zdHJlYW0vYnl0ZS1zdHJlYW0tY29udHJvbGxlci50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtL2J5b2ItcmVhZGVyLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9hYnN0cmFjdC1vcHMvcXVldWluZy1zdHJhdGVneS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdmFsaWRhdG9ycy9xdWV1aW5nLXN0cmF0ZWd5LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi92YWxpZGF0b3JzL3VuZGVybHlpbmctc2luay50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdmFsaWRhdG9ycy93cml0YWJsZS1zdHJlYW0udHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL2Fib3J0LXNpZ25hbC50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvd3JpdGFibGUtc3RyZWFtLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL3N0dWIvbmF0aXZlLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL3N0dWIvZG9tLWV4Y2VwdGlvbi50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtL3BpcGUudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3JlYWRhYmxlLXN0cmVhbS9kZWZhdWx0LWNvbnRyb2xsZXIudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3JlYWRhYmxlLXN0cmVhbS90ZWUudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvdW5kZXJseWluZy1zb3VyY2UudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvcmVhZGVyLW9wdGlvbnMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvaXRlcmF0b3Itb3B0aW9ucy50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdmFsaWRhdG9ycy9waXBlLW9wdGlvbnMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvcmVhZGFibGUtd3JpdGFibGUtcGFpci50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi92YWxpZGF0b3JzL3F1ZXVpbmctc3RyYXRlZ3ktaW5pdC50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvYnl0ZS1sZW5ndGgtcXVldWluZy1zdHJhdGVneS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvY291bnQtcXVldWluZy1zdHJhdGVneS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdmFsaWRhdG9ycy90cmFuc2Zvcm1lci50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdHJhbnNmb3JtLXN0cmVhbS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL2ZldGNoLWJsb2Ivc3RyZWFtcy5janMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9mZXRjaC1ibG9iL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvZmV0Y2gtYmxvYi9maWxlLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvZm9ybWRhdGEtcG9seWZpbGwvZXNtLm1pbi5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZG9tZXhjZXB0aW9uL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvZmV0Y2gtYmxvYi9mcm9tLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9zcmMvdXRpbHMvbXVsdGlwYXJ0LXBhcnNlci5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2xhdGVzdC50c3giLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9jb21wb25lbnRzL2RldGFpbHMtbGlzdC9kZXRhaWxzLWxpc3QudHN4IiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvY29tcG9uZW50cy9kZXRhaWxzLWxpc3QvZGV0YWlscy1saXN0LWl0ZW0udHN4IiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvbGliL3NwaW4vc2VydmljZS9zZXJ2aWNlLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvbGliL3NwaW4vaGVscGVycy50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvZGF0YS11cmktdG8tYnVmZmVyL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL2JvZHkuanMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9ub2RlLWZldGNoL3NyYy9lcnJvcnMvYmFzZS5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL2Vycm9ycy9mZXRjaC1lcnJvci5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL3V0aWxzL2lzLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9zcmMvaGVhZGVycy5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL3V0aWxzL2lzLXJlZGlyZWN0LmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9zcmMvcmVzcG9uc2UuanMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9ub2RlLWZldGNoL3NyYy9yZXF1ZXN0LmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9zcmMvdXRpbHMvZ2V0LXNlYXJjaC5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL3V0aWxzL3JlZmVycmVyLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9zcmMvZXJyb3JzL2Fib3J0LWVycm9yLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvbGliL3NwaW4vdHlwZXMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9saWIvc3Bpbi9jb25zdGFudHMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9saWIvc3Bpbi91dGlsLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvbGliL3NwaW4vc2VydmljZS9pbnN0YW5jZS1zZXJ2aWNlLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvbGliL3NwaW4vc3Bpbi10eXBlL3NwaW4udHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9saWIvc3Bpbi9zcGluLXR5cGUvaW5zdGFuY2UudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9jb21wb25lbnRzL2FjdGlvbnMudHN4IiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvaG9va3MvdXNlLXNwaW4tdXJscy50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2NvbXBvbmVudHMvYnJvd3Nlci1saXN0L2Jyb3dzZXItbGlzdC50c3giLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9jb21wb25lbnRzL2Jyb3dzZXItbGlzdC9icm93c2VyLWxpc3QtaXRlbS50c3giLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9jb21wb25lbnRzL2Jyb3dzZXItbGlzdC9vcGVuLXVybC1pbi1icm93c2VyLWFjdGlvbi50c3giLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9ob29rcy91c2Utc3Bpbi1zaG93LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTUuc3ltYm9sXCIgLz5cblxuY29uc3QgU3ltYm9sUG9seWZpbGw6IChkZXNjcmlwdGlvbj86IHN0cmluZykgPT4gc3ltYm9sID1cbiAgdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJyA/XG4gICAgU3ltYm9sIDpcbiAgICBkZXNjcmlwdGlvbiA9PiBgU3ltYm9sKCR7ZGVzY3JpcHRpb259KWAgYXMgYW55IGFzIHN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sUG9seWZpbGw7XG4iLCAiLy8vIDxyZWZlcmVuY2UgbGliPVwiZG9tXCIgLz5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKTogdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0R2xvYmFscygpIHtcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBzZWxmO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBnbG9iYWw7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNvbnN0IGdsb2JhbHMgPSBnZXRHbG9iYWxzKCk7XG4iLCAiaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IEFzc2VydGlvbkVycm9yIH0gZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHlwZUlzT2JqZWN0KHg6IGFueSk6IHggaXMgb2JqZWN0IHtcbiAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbCkgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBjb25zdCByZXRocm93QXNzZXJ0aW9uRXJyb3JSZWplY3Rpb246IChlOiBhbnkpID0+IHZvaWQgPVxuICBERUJVRyA/IGUgPT4ge1xuICAgIC8vIFVzZWQgdGhyb3VnaG91dCB0aGUgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uLCBhcyBgLmNhdGNoKHJldGhyb3dBc3NlcnRpb25FcnJvclJlamVjdGlvbilgLCB0byBlbnN1cmUgYW55IGVycm9yc1xuICAgIC8vIGdldCBzaG93bi4gVGhlcmUgYXJlIHBsYWNlcyBpbiB0aGUgc3BlYyB3aGVyZSB3ZSBkbyBwcm9taXNlIHRyYW5zZm9ybWF0aW9ucyBhbmQgcHVycG9zZWZ1bGx5IGlnbm9yZSBvciBkb24ndFxuICAgIC8vIGV4cGVjdCBhbnkgZXJyb3JzLCBidXQgYXNzZXJ0aW9uIGVycm9ycyBhcmUgYWx3YXlzIHByb2JsZW1hdGljLlxuICAgIGlmIChlICYmIGUgaW5zdGFuY2VvZiBBc3NlcnRpb25FcnJvcikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH0gOiBub29wO1xuIiwgImltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyByZXRocm93QXNzZXJ0aW9uRXJyb3JSZWplY3Rpb24gfSBmcm9tICcuL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IGFzc2VydCBmcm9tICcuLi8uLi9zdHViL2Fzc2VydCc7XG5cbmNvbnN0IG9yaWdpbmFsUHJvbWlzZSA9IFByb21pc2U7XG5jb25zdCBvcmlnaW5hbFByb21pc2VUaGVuID0gUHJvbWlzZS5wcm90b3R5cGUudGhlbjtcbmNvbnN0IG9yaWdpbmFsUHJvbWlzZVJlc29sdmUgPSBQcm9taXNlLnJlc29sdmUuYmluZChvcmlnaW5hbFByb21pc2UpO1xuY29uc3Qgb3JpZ2luYWxQcm9taXNlUmVqZWN0ID0gUHJvbWlzZS5yZWplY3QuYmluZChvcmlnaW5hbFByb21pc2UpO1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3UHJvbWlzZTxUPihleGVjdXRvcjogKFxuICByZXNvbHZlOiAodmFsdWU6IFQgfCBQcm9taXNlTGlrZTxUPikgPT4gdm9pZCxcbiAgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkXG4pID0+IHZvaWQpOiBQcm9taXNlPFQ+IHtcbiAgcmV0dXJuIG5ldyBvcmlnaW5hbFByb21pc2UoZXhlY3V0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvbWlzZVJlc29sdmVkV2l0aDxUPih2YWx1ZTogVCB8IFByb21pc2VMaWtlPFQ+KTogUHJvbWlzZTxUPiB7XG4gIHJldHVybiBvcmlnaW5hbFByb21pc2VSZXNvbHZlKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb21pc2VSZWplY3RlZFdpdGg8VCA9IG5ldmVyPihyZWFzb246IGFueSk6IFByb21pc2U8VD4ge1xuICByZXR1cm4gb3JpZ2luYWxQcm9taXNlUmVqZWN0KHJlYXNvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQZXJmb3JtUHJvbWlzZVRoZW48VCwgVFJlc3VsdDEgPSBULCBUUmVzdWx0MiA9IG5ldmVyPihcbiAgcHJvbWlzZTogUHJvbWlzZTxUPixcbiAgb25GdWxmaWxsZWQ/OiAodmFsdWU6IFQpID0+IFRSZXN1bHQxIHwgUHJvbWlzZUxpa2U8VFJlc3VsdDE+LFxuICBvblJlamVjdGVkPzogKHJlYXNvbjogYW55KSA9PiBUUmVzdWx0MiB8IFByb21pc2VMaWtlPFRSZXN1bHQyPik6IFByb21pc2U8VFJlc3VsdDEgfCBUUmVzdWx0Mj4ge1xuICAvLyBUaGVyZSBkb2Vzbid0IGFwcGVhciB0byBiZSBhbnkgd2F5IHRvIGNvcnJlY3RseSBlbXVsYXRlIHRoZSBiZWhhdmlvdXIgZnJvbSBKYXZhU2NyaXB0LCBzbyB0aGlzIGlzIGp1c3QgYW5cbiAgLy8gYXBwcm94aW1hdGlvbi5cbiAgcmV0dXJuIG9yaWdpbmFsUHJvbWlzZVRoZW4uY2FsbChwcm9taXNlLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkgYXMgUHJvbWlzZTxUUmVzdWx0MSB8IFRSZXN1bHQyPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwb25Qcm9taXNlPFQ+KFxuICBwcm9taXNlOiBQcm9taXNlPFQ+LFxuICBvbkZ1bGZpbGxlZD86ICh2YWx1ZTogVCkgPT4gdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+LFxuICBvblJlamVjdGVkPzogKHJlYXNvbjogYW55KSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4pOiB2b2lkIHtcbiAgUGVyZm9ybVByb21pc2VUaGVuKFxuICAgIFBlcmZvcm1Qcm9taXNlVGhlbihwcm9taXNlLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCksXG4gICAgdW5kZWZpbmVkLFxuICAgIHJldGhyb3dBc3NlcnRpb25FcnJvclJlamVjdGlvblxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBvbkZ1bGZpbGxtZW50PFQ+KHByb21pc2U6IFByb21pc2U8VD4sIG9uRnVsZmlsbGVkOiAodmFsdWU6IFQpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPik6IHZvaWQge1xuICB1cG9uUHJvbWlzZShwcm9taXNlLCBvbkZ1bGZpbGxlZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cG9uUmVqZWN0aW9uKHByb21pc2U6IFByb21pc2U8dW5rbm93bj4sIG9uUmVqZWN0ZWQ6IChyZWFzb246IGFueSkgPT4gdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+KTogdm9pZCB7XG4gIHVwb25Qcm9taXNlKHByb21pc2UsIHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1Qcm9taXNlV2l0aDxULCBUUmVzdWx0MSA9IFQsIFRSZXN1bHQyID0gbmV2ZXI+KFxuICBwcm9taXNlOiBQcm9taXNlPFQ+LFxuICBmdWxmaWxsbWVudEhhbmRsZXI/OiAodmFsdWU6IFQpID0+IFRSZXN1bHQxIHwgUHJvbWlzZUxpa2U8VFJlc3VsdDE+LFxuICByZWplY3Rpb25IYW5kbGVyPzogKHJlYXNvbjogYW55KSA9PiBUUmVzdWx0MiB8IFByb21pc2VMaWtlPFRSZXN1bHQyPik6IFByb21pc2U8VFJlc3VsdDEgfCBUUmVzdWx0Mj4ge1xuICByZXR1cm4gUGVyZm9ybVByb21pc2VUaGVuKHByb21pc2UsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlKHByb21pc2U6IFByb21pc2U8dW5rbm93bj4pOiB2b2lkIHtcbiAgUGVyZm9ybVByb21pc2VUaGVuKHByb21pc2UsIHVuZGVmaW5lZCwgcmV0aHJvd0Fzc2VydGlvbkVycm9yUmVqZWN0aW9uKTtcbn1cblxuZXhwb3J0IGNvbnN0IHF1ZXVlTWljcm90YXNrOiAoZm46ICgpID0+IHZvaWQpID0+IHZvaWQgPSAoKCkgPT4ge1xuICBjb25zdCBnbG9iYWxRdWV1ZU1pY3JvdGFzayA9IGdsb2JhbHMgJiYgZ2xvYmFscy5xdWV1ZU1pY3JvdGFzaztcbiAgaWYgKHR5cGVvZiBnbG9iYWxRdWV1ZU1pY3JvdGFzayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBnbG9iYWxRdWV1ZU1pY3JvdGFzaztcbiAgfVxuXG4gIGNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgcmV0dXJuIChmbjogKCkgPT4gdm9pZCkgPT4gUGVyZm9ybVByb21pc2VUaGVuKHJlc29sdmVkUHJvbWlzZSwgZm4pO1xufSkoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZmxlY3RDYWxsPFQsIEEgZXh0ZW5kcyBhbnlbXSwgUj4oRjogKHRoaXM6IFQsIC4uLmZuQXJnczogQSkgPT4gUiwgVjogVCwgYXJnczogQSk6IFIge1xuICBpZiAodHlwZW9mIEYgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9XG4gIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChGLCBWLCBhcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb21pc2VDYWxsPFQsIEEgZXh0ZW5kcyBhbnlbXSwgUj4oRjogKHRoaXM6IFQsIC4uLmZuQXJnczogQSkgPT4gUiB8IFByb21pc2VMaWtlPFI+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVjogVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IEEpOiBQcm9taXNlPFI+IHtcbiAgYXNzZXJ0KHR5cGVvZiBGID09PSAnZnVuY3Rpb24nKTtcbiAgYXNzZXJ0KFYgIT09IHVuZGVmaW5lZCk7XG4gIGFzc2VydChBcnJheS5pc0FycmF5KGFyZ3MpKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aChyZWZsZWN0Q2FsbChGLCBWLCBhcmdzKSk7XG4gIH0gY2F0Y2ggKHZhbHVlKSB7XG4gICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgodmFsdWUpO1xuICB9XG59XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICcuLi9zdHViL2Fzc2VydCc7XG5cbi8vIE9yaWdpbmFsIGZyb20gQ2hyb21pdW1cbi8vIGh0dHBzOi8vY2hyb21pdW0uZ29vZ2xlc291cmNlLmNvbS9jaHJvbWl1bS9zcmMvKy8wYWVlNDQzNGE0ZGJhNDJhNDJhYmFlYTliZmJjMGNkMTk2YTYzYmMxL3RoaXJkX3BhcnR5L2JsaW5rL3JlbmRlcmVyL2NvcmUvc3RyZWFtcy9TaW1wbGVRdWV1ZS5qc1xuXG5jb25zdCBRVUVVRV9NQVhfQVJSQVlfU0laRSA9IDE2Mzg0O1xuXG5pbnRlcmZhY2UgTm9kZTxUPiB7XG4gIF9lbGVtZW50czogVFtdO1xuICBfbmV4dDogTm9kZTxUPiB8IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBTaW1wbGUgcXVldWUgc3RydWN0dXJlLlxuICpcbiAqIEF2b2lkcyBzY2FsYWJpbGl0eSBpc3N1ZXMgd2l0aCB1c2luZyBhIHBhY2tlZCBhcnJheSBkaXJlY3RseSBieSB1c2luZ1xuICogbXVsdGlwbGUgYXJyYXlzIGluIGEgbGlua2VkIGxpc3QgYW5kIGtlZXBpbmcgdGhlIGFycmF5IHNpemUgYm91bmRlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZVF1ZXVlPFQ+IHtcbiAgcHJpdmF0ZSBfZnJvbnQ6IE5vZGU8VD47XG4gIHByaXZhdGUgX2JhY2s6IE5vZGU8VD47XG4gIHByaXZhdGUgX2N1cnNvciA9IDA7XG4gIHByaXZhdGUgX3NpemUgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIF9mcm9udCBhbmQgX2JhY2sgYXJlIGFsd2F5cyBkZWZpbmVkLlxuICAgIHRoaXMuX2Zyb250ID0ge1xuICAgICAgX2VsZW1lbnRzOiBbXSxcbiAgICAgIF9uZXh0OiB1bmRlZmluZWRcbiAgICB9O1xuICAgIHRoaXMuX2JhY2sgPSB0aGlzLl9mcm9udDtcbiAgICAvLyBUaGUgY3Vyc29yIGlzIHVzZWQgdG8gYXZvaWQgY2FsbGluZyBBcnJheS5zaGlmdCgpLlxuICAgIC8vIEl0IGNvbnRhaW5zIHRoZSBpbmRleCBvZiB0aGUgZnJvbnQgZWxlbWVudCBvZiB0aGUgYXJyYXkgaW5zaWRlIHRoZVxuICAgIC8vIGZyb250LW1vc3Qgbm9kZS4gSXQgaXMgYWx3YXlzIGluIHRoZSByYW5nZSBbMCwgUVVFVUVfTUFYX0FSUkFZX1NJWkUpLlxuICAgIHRoaXMuX2N1cnNvciA9IDA7XG4gICAgLy8gV2hlbiB0aGVyZSBpcyBvbmx5IG9uZSBub2RlLCBzaXplID09PSBlbGVtZW50cy5sZW5ndGggLSBjdXJzb3IuXG4gICAgdGhpcy5fc2l6ZSA9IDA7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICAvLyBGb3IgZXhjZXB0aW9uIHNhZmV0eSwgdGhpcyBtZXRob2QgaXMgc3RydWN0dXJlZCBpbiBvcmRlcjpcbiAgLy8gMS4gUmVhZCBzdGF0ZVxuICAvLyAyLiBDYWxjdWxhdGUgcmVxdWlyZWQgc3RhdGUgbXV0YXRpb25zXG4gIC8vIDMuIFBlcmZvcm0gc3RhdGUgbXV0YXRpb25zXG4gIHB1c2goZWxlbWVudDogVCk6IHZvaWQge1xuICAgIGNvbnN0IG9sZEJhY2sgPSB0aGlzLl9iYWNrO1xuICAgIGxldCBuZXdCYWNrID0gb2xkQmFjaztcbiAgICBhc3NlcnQob2xkQmFjay5fbmV4dCA9PT0gdW5kZWZpbmVkKTtcbiAgICBpZiAob2xkQmFjay5fZWxlbWVudHMubGVuZ3RoID09PSBRVUVVRV9NQVhfQVJSQVlfU0laRSAtIDEpIHtcbiAgICAgIG5ld0JhY2sgPSB7XG4gICAgICAgIF9lbGVtZW50czogW10sXG4gICAgICAgIF9uZXh0OiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gcHVzaCgpIGlzIHRoZSBtdXRhdGlvbiBtb3N0IGxpa2VseSB0byB0aHJvdyBhbiBleGNlcHRpb24sIHNvIGl0XG4gICAgLy8gZ29lcyBmaXJzdC5cbiAgICBvbGRCYWNrLl9lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgIGlmIChuZXdCYWNrICE9PSBvbGRCYWNrKSB7XG4gICAgICB0aGlzLl9iYWNrID0gbmV3QmFjaztcbiAgICAgIG9sZEJhY2suX25leHQgPSBuZXdCYWNrO1xuICAgIH1cbiAgICArK3RoaXMuX3NpemU7XG4gIH1cblxuICAvLyBMaWtlIHB1c2goKSwgc2hpZnQoKSBmb2xsb3dzIHRoZSByZWFkIC0+IGNhbGN1bGF0ZSAtPiBtdXRhdGUgcGF0dGVybiBmb3JcbiAgLy8gZXhjZXB0aW9uIHNhZmV0eS5cbiAgc2hpZnQoKTogVCB7XG4gICAgYXNzZXJ0KHRoaXMuX3NpemUgPiAwKTsgLy8gbXVzdCBub3QgYmUgY2FsbGVkIG9uIGFuIGVtcHR5IHF1ZXVlXG5cbiAgICBjb25zdCBvbGRGcm9udCA9IHRoaXMuX2Zyb250O1xuICAgIGxldCBuZXdGcm9udCA9IG9sZEZyb250O1xuICAgIGNvbnN0IG9sZEN1cnNvciA9IHRoaXMuX2N1cnNvcjtcbiAgICBsZXQgbmV3Q3Vyc29yID0gb2xkQ3Vyc29yICsgMTtcblxuICAgIGNvbnN0IGVsZW1lbnRzID0gb2xkRnJvbnQuX2VsZW1lbnRzO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tvbGRDdXJzb3JdO1xuXG4gICAgaWYgKG5ld0N1cnNvciA9PT0gUVVFVUVfTUFYX0FSUkFZX1NJWkUpIHtcbiAgICAgIGFzc2VydChlbGVtZW50cy5sZW5ndGggPT09IFFVRVVFX01BWF9BUlJBWV9TSVpFKTtcbiAgICAgIGFzc2VydChvbGRGcm9udC5fbmV4dCAhPT0gdW5kZWZpbmVkKTtcbiAgICAgIG5ld0Zyb250ID0gb2xkRnJvbnQuX25leHQhO1xuICAgICAgbmV3Q3Vyc29yID0gMDtcbiAgICB9XG5cbiAgICAvLyBObyBtdXRhdGlvbnMgYmVmb3JlIHRoaXMgcG9pbnQuXG4gICAgLS10aGlzLl9zaXplO1xuICAgIHRoaXMuX2N1cnNvciA9IG5ld0N1cnNvcjtcbiAgICBpZiAob2xkRnJvbnQgIT09IG5ld0Zyb250KSB7XG4gICAgICB0aGlzLl9mcm9udCA9IG5ld0Zyb250O1xuICAgIH1cblxuICAgIC8vIFBlcm1pdCBzaGlmdGVkIGVsZW1lbnQgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAgZWxlbWVudHNbb2xkQ3Vyc29yXSA9IHVuZGVmaW5lZCE7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8vIFRoZSB0cmlja3kgdGhpbmcgYWJvdXQgZm9yRWFjaCgpIGlzIHRoYXQgaXQgY2FuIGJlIGNhbGxlZFxuICAvLyByZS1lbnRyYW50bHkuIFRoZSBxdWV1ZSBtYXkgYmUgbXV0YXRlZCBpbnNpZGUgdGhlIGNhbGxiYWNrLiBJdCBpcyBlYXN5IHRvXG4gIC8vIHNlZSB0aGF0IHB1c2goKSB3aXRoaW4gdGhlIGNhbGxiYWNrIGhhcyBubyBuZWdhdGl2ZSBlZmZlY3RzIHNpbmNlIHRoZSBlbmRcbiAgLy8gb2YgdGhlIHF1ZXVlIGlzIGNoZWNrZWQgZm9yIG9uIGV2ZXJ5IGl0ZXJhdGlvbi4gSWYgc2hpZnQoKSBpcyBjYWxsZWRcbiAgLy8gcmVwZWF0ZWRseSB3aXRoaW4gdGhlIGNhbGxiYWNrIHRoZW4gdGhlIG5leHQgaXRlcmF0aW9uIG1heSByZXR1cm4gYW5cbiAgLy8gZWxlbWVudCB0aGF0IGhhcyBiZWVuIHJlbW92ZWQuIEluIHRoaXMgY2FzZSB0aGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWRcbiAgLy8gd2l0aCB1bmRlZmluZWQgdmFsdWVzIHVudGlsIHdlIGVpdGhlciBcImNhdGNoIHVwXCIgd2l0aCBlbGVtZW50cyB0aGF0IHN0aWxsXG4gIC8vIGV4aXN0IG9yIHJlYWNoIHRoZSBiYWNrIG9mIHRoZSBxdWV1ZS5cbiAgZm9yRWFjaChjYWxsYmFjazogKGVsZW1lbnQ6IFQpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBsZXQgaSA9IHRoaXMuX2N1cnNvcjtcbiAgICBsZXQgbm9kZSA9IHRoaXMuX2Zyb250O1xuICAgIGxldCBlbGVtZW50cyA9IG5vZGUuX2VsZW1lbnRzO1xuICAgIHdoaWxlIChpICE9PSBlbGVtZW50cy5sZW5ndGggfHwgbm9kZS5fbmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoaSA9PT0gZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGFzc2VydChub2RlLl9uZXh0ICE9PSB1bmRlZmluZWQpO1xuICAgICAgICBhc3NlcnQoaSA9PT0gUVVFVUVfTUFYX0FSUkFZX1NJWkUpO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dCE7XG4gICAgICAgIGVsZW1lbnRzID0gbm9kZS5fZWxlbWVudHM7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVsZW1lbnRzW2ldKTtcbiAgICAgICsraTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIGVsZW1lbnQgdGhhdCB3b3VsZCBiZSByZXR1cm5lZCBpZiBzaGlmdCgpIHdhcyBjYWxsZWQgbm93LFxuICAvLyB3aXRob3V0IG1vZGlmeWluZyB0aGUgcXVldWUuXG4gIHBlZWsoKTogVCB7XG4gICAgYXNzZXJ0KHRoaXMuX3NpemUgPiAwKTsgLy8gbXVzdCBub3QgYmUgY2FsbGVkIG9uIGFuIGVtcHR5IHF1ZXVlXG5cbiAgICBjb25zdCBmcm9udCA9IHRoaXMuX2Zyb250O1xuICAgIGNvbnN0IGN1cnNvciA9IHRoaXMuX2N1cnNvcjtcbiAgICByZXR1cm4gZnJvbnQuX2VsZW1lbnRzW2N1cnNvcl07XG4gIH1cbn1cbiIsICJpbXBvcnQgYXNzZXJ0IGZyb20gJy4uLy4uL3N0dWIvYXNzZXJ0JztcbmltcG9ydCB7IFJlYWRhYmxlU3RyZWFtLCBSZWFkYWJsZVN0cmVhbUNhbmNlbCwgUmVhZGFibGVTdHJlYW1SZWFkZXIgfSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgbmV3UHJvbWlzZSwgc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZSB9IGZyb20gJy4uL2hlbHBlcnMvd2ViaWRsJztcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0luaXRpYWxpemU8Uj4ocmVhZGVyOiBSZWFkYWJsZVN0cmVhbVJlYWRlcjxSPiwgc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxSPikge1xuICByZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0gPSBzdHJlYW07XG4gIHN0cmVhbS5fcmVhZGVyID0gcmVhZGVyO1xuXG4gIGlmIChzdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnKSB7XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHJlYWRlcik7XG4gIH0gZWxzZSBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHJlYWRlcik7XG4gIH0gZWxzZSB7XG4gICAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmVkJyk7XG5cbiAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHJlYWRlciwgc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gIH1cbn1cblxuLy8gQSBjbGllbnQgb2YgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyIGFuZCBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIgbWF5IHVzZSB0aGVzZSBmdW5jdGlvbnMgZGlyZWN0bHkgdG8gYnlwYXNzIHN0YXRlXG4vLyBjaGVjay5cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0NhbmNlbChyZWFkZXI6IFJlYWRhYmxlU3RyZWFtUmVhZGVyPGFueT4sIHJlYXNvbjogYW55KTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgY29uc3Qgc3RyZWFtID0gcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtO1xuICBhc3NlcnQoc3RyZWFtICE9PSB1bmRlZmluZWQpO1xuICByZXR1cm4gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCByZWFzb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXI6IFJlYWRhYmxlU3RyZWFtUmVhZGVyPGFueT4pIHtcbiAgYXNzZXJ0KHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbSAhPT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbS5fcmVhZGVyID09PSByZWFkZXIpO1xuXG4gIGlmIChyZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnKSB7XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZWplY3QoXG4gICAgICByZWFkZXIsXG4gICAgICBuZXcgVHlwZUVycm9yKGBSZWFkZXIgd2FzIHJlbGVhc2VkIGFuZCBjYW4gbm8gbG9uZ2VyIGJlIHVzZWQgdG8gbW9uaXRvciB0aGUgc3RyZWFtJ3MgY2xvc2VkbmVzc2ApKTtcbiAgfSBlbHNlIHtcbiAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlc2V0VG9SZWplY3RlZChcbiAgICAgIHJlYWRlcixcbiAgICAgIG5ldyBUeXBlRXJyb3IoYFJlYWRlciB3YXMgcmVsZWFzZWQgYW5kIGNhbiBubyBsb25nZXIgYmUgdXNlZCB0byBtb25pdG9yIHRoZSBzdHJlYW0ncyBjbG9zZWRuZXNzYCkpO1xuICB9XG5cbiAgcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtLl9yZWFkZXIgPSB1bmRlZmluZWQ7XG4gIHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbSA9IHVuZGVmaW5lZCE7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSByZWFkZXJzLlxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZGVyTG9ja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcignQ2Fubm90ICcgKyBuYW1lICsgJyBhIHN0cmVhbSB1c2luZyBhIHJlbGVhc2VkIHJlYWRlcicpO1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLlxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHJlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8YW55Pikge1xuICByZWFkZXIuX2Nsb3NlZFByb21pc2UgPSBuZXdQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9IHJlamVjdDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHJlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8YW55PiwgcmVhc29uOiBhbnkpIHtcbiAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHJlYWRlcik7XG4gIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVqZWN0KHJlYWRlciwgcmVhc29uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVzb2x2ZWQocmVhZGVyOiBSZWFkYWJsZVN0cmVhbVJlYWRlcjxhbnk+KSB7XG4gIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZShyZWFkZXIpO1xuICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUocmVhZGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVqZWN0KHJlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8YW55PiwgcmVhc29uOiBhbnkpIHtcbiAgaWYgKHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUocmVhZGVyLl9jbG9zZWRQcm9taXNlKTtcbiAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdChyZWFzb24pO1xuICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVzZXRUb1JlamVjdGVkKHJlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8YW55PiwgcmVhc29uOiBhbnkpIHtcbiAgYXNzZXJ0KHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpO1xuICBhc3NlcnQocmVhZGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9PT0gdW5kZWZpbmVkKTtcblxuICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHJlYWRlciwgcmVhc29uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVzb2x2ZShyZWFkZXI6IFJlYWRhYmxlU3RyZWFtUmVhZGVyPGFueT4pIHtcbiAgaWYgKHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSh1bmRlZmluZWQpO1xuICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbn1cbiIsICJleHBvcnQgY29uc3QgQWJvcnRTdGVwcyA9IFN5bWJvbCgnW1tBYm9ydFN0ZXBzXV0nKTtcbmV4cG9ydCBjb25zdCBFcnJvclN0ZXBzID0gU3ltYm9sKCdbW0Vycm9yU3RlcHNdXScpO1xuZXhwb3J0IGNvbnN0IENhbmNlbFN0ZXBzID0gU3ltYm9sKCdbW0NhbmNlbFN0ZXBzXV0nKTtcbmV4cG9ydCBjb25zdCBQdWxsU3RlcHMgPSBTeW1ib2woJ1tbUHVsbFN0ZXBzXV0nKTtcbiIsICIvLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTUuY29yZVwiIC8+XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci9pc0Zpbml0ZSNQb2x5ZmlsbFxuY29uc3QgTnVtYmVySXNGaW5pdGU6IHR5cGVvZiBOdW1iZXIuaXNGaW5pdGUgPSBOdW1iZXIuaXNGaW5pdGUgfHwgZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh4KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlcklzRmluaXRlO1xuIiwgIi8vLyA8cmVmZXJlbmNlIGxpYj1cImVzMjAxNS5jb3JlXCIgLz5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWF0aC90cnVuYyNQb2x5ZmlsbFxuY29uc3QgTWF0aFRydW5jOiB0eXBlb2YgTWF0aC50cnVuYyA9IE1hdGgudHJ1bmMgfHwgZnVuY3Rpb24gKHYpIHtcbiAgcmV0dXJuIHYgPCAwID8gTWF0aC5jZWlsKHYpIDogTWF0aC5mbG9vcih2KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hdGhUcnVuYztcbiIsICJpbXBvcnQgTnVtYmVySXNGaW5pdGUgZnJvbSAnLi4vLi4vc3R1Yi9udW1iZXItaXNmaW5pdGUnO1xuaW1wb3J0IE1hdGhUcnVuYyBmcm9tICcuLi8uLi9zdHViL21hdGgtdHJ1bmMnO1xuXG4vLyBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtZGljdGlvbmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gaXNEaWN0aW9uYXJ5KHg6IGFueSk6IHggaXMgb2JqZWN0IHwgbnVsbCB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnREaWN0aW9uYXJ5KG9iajogdW5rbm93bixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHN0cmluZyk6IGFzc2VydHMgb2JqIGlzIG9iamVjdCB8IG51bGwgfCB1bmRlZmluZWQge1xuICBpZiAob2JqICE9PSB1bmRlZmluZWQgJiYgIWlzRGljdGlvbmFyeShvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYW4gb2JqZWN0LmApO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIEFueUZ1bmN0aW9uID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbi8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1jYWxsYmFjay1mdW5jdGlvbnNcbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRGdW5jdGlvbih4OiB1bmtub3duLCBjb250ZXh0OiBzdHJpbmcpOiBhc3NlcnRzIHggaXMgQW55RnVuY3Rpb24ge1xuICBpZiAodHlwZW9mIHggIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhIGZ1bmN0aW9uLmApO1xuICB9XG59XG5cbi8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1vYmplY3RcbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh4OiBhbnkpOiB4IGlzIG9iamVjdCB7XG4gIHJldHVybiAodHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGwpIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0T2JqZWN0KHg6IHVua25vd24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHN0cmluZyk6IGFzc2VydHMgeCBpcyBvYmplY3Qge1xuICBpZiAoIWlzT2JqZWN0KHgpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYW4gb2JqZWN0LmApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50PFQgZXh0ZW5kcyBhbnk+KHg6IFQgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogYXNzZXJ0cyB4IGlzIFQge1xuICBpZiAoeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUGFyYW1ldGVyICR7cG9zaXRpb259IGlzIHJlcXVpcmVkIGluICcke2NvbnRleHR9Jy5gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0UmVxdWlyZWRGaWVsZDxUIGV4dGVuZHMgYW55Pih4OiBUIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHN0cmluZyk6IGFzc2VydHMgeCBpcyBUIHtcbiAgaWYgKHggPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7ZmllbGR9IGlzIHJlcXVpcmVkIGluICcke2NvbnRleHR9Jy5gKTtcbiAgfVxufVxuXG4vLyBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtdW5yZXN0cmljdGVkLWRvdWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRVbnJlc3RyaWN0ZWREb3VibGUodmFsdWU6IHVua25vd24pOiBudW1iZXIge1xuICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gY2Vuc29yTmVnYXRpdmVaZXJvKHg6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiB4ID09PSAwID8gMCA6IHg7XG59XG5cbmZ1bmN0aW9uIGludGVnZXJQYXJ0KHg6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBjZW5zb3JOZWdhdGl2ZVplcm8oTWF0aFRydW5jKHgpKTtcbn1cblxuLy8gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLXVuc2lnbmVkLWxvbmctbG9uZ1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRVbnNpZ25lZExvbmdMb25nV2l0aEVuZm9yY2VSYW5nZSh2YWx1ZTogdW5rbm93biwgY29udGV4dDogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgbG93ZXJCb3VuZCA9IDA7XG4gIGNvbnN0IHVwcGVyQm91bmQgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICBsZXQgeCA9IE51bWJlcih2YWx1ZSk7XG4gIHggPSBjZW5zb3JOZWdhdGl2ZVplcm8oeCk7XG5cbiAgaWYgKCFOdW1iZXJJc0Zpbml0ZSh4KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gaXMgbm90IGEgZmluaXRlIG51bWJlcmApO1xuICB9XG5cbiAgeCA9IGludGVnZXJQYXJ0KHgpO1xuXG4gIGlmICh4IDwgbG93ZXJCb3VuZCB8fCB4ID4gdXBwZXJCb3VuZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gaXMgb3V0c2lkZSB0aGUgYWNjZXB0ZWQgcmFuZ2Ugb2YgJHtsb3dlckJvdW5kfSB0byAke3VwcGVyQm91bmR9LCBpbmNsdXNpdmVgKTtcbiAgfVxuXG4gIGlmICghTnVtYmVySXNGaW5pdGUoeCkgfHwgeCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLy8gVE9ETyBVc2UgQmlnSW50IGlmIHN1cHBvcnRlZD9cbiAgLy8gbGV0IHhCaWdJbnQgPSBCaWdJbnQoaW50ZWdlclBhcnQoeCkpO1xuICAvLyB4QmlnSW50ID0gQmlnSW50LmFzVWludE4oNjQsIHhCaWdJbnQpO1xuICAvLyByZXR1cm4gTnVtYmVyKHhCaWdJbnQpO1xuXG4gIHJldHVybiB4O1xufVxuIiwgImltcG9ydCB7IElzUmVhZGFibGVTdHJlYW0sIFJlYWRhYmxlU3RyZWFtIH0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFJlYWRhYmxlU3RyZWFtKHg6IHVua25vd24sIGNvbnRleHQ6IHN0cmluZyk6IGFzc2VydHMgeCBpcyBSZWFkYWJsZVN0cmVhbSB7XG4gIGlmICghSXNSZWFkYWJsZVN0cmVhbSh4KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gaXMgbm90IGEgUmVhZGFibGVTdHJlYW0uYCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgYXNzZXJ0IGZyb20gJy4uLy4uL3N0dWIvYXNzZXJ0JztcbmltcG9ydCB7IFNpbXBsZVF1ZXVlIH0gZnJvbSAnLi4vc2ltcGxlLXF1ZXVlJztcbmltcG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0NhbmNlbCxcbiAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljSW5pdGlhbGl6ZSxcbiAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZSxcbiAgcmVhZGVyTG9ja0V4Y2VwdGlvblxufSBmcm9tICcuL2dlbmVyaWMtcmVhZGVyJztcbmltcG9ydCB7IElzUmVhZGFibGVTdHJlYW1Mb2NrZWQsIFJlYWRhYmxlU3RyZWFtIH0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtJztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQgeyBQdWxsU3RlcHMgfSBmcm9tICcuLi9hYnN0cmFjdC1vcHMvaW50ZXJuYWwtbWV0aG9kcyc7XG5pbXBvcnQgeyBuZXdQcm9taXNlLCBwcm9taXNlUmVqZWN0ZWRXaXRoIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHsgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudCB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvYmFzaWMnO1xuaW1wb3J0IHsgYXNzZXJ0UmVhZGFibGVTdHJlYW0gfSBmcm9tICcuLi92YWxpZGF0b3JzL3JlYWRhYmxlLXN0cmVhbSc7XG5cbi8qKlxuICogQSByZXN1bHQgcmV0dXJuZWQgYnkge0BsaW5rIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5yZWFkfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB0eXBlIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8VD4gPSB7XG4gIGRvbmU6IGZhbHNlO1xuICB2YWx1ZTogVDtcbn0gfCB7XG4gIGRvbmU6IHRydWU7XG4gIHZhbHVlPzogdW5kZWZpbmVkO1xufVxuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5cbmV4cG9ydCBmdW5jdGlvbiBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW0pOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4ge1xuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihzdHJlYW0pO1xufVxuXG4vLyBSZWFkYWJsZVN0cmVhbSBBUEkgZXhwb3NlZCBmb3IgY29udHJvbGxlcnMuXG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUFkZFJlYWRSZXF1ZXN0PFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkUmVxdWVzdDogUmVhZFJlcXVlc3Q8Uj4pOiB2b2lkIHtcbiAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHN0cmVhbS5fcmVhZGVyKSk7XG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnKTtcblxuICAoc3RyZWFtLl9yZWFkZXIhIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPikuX3JlYWRSZXF1ZXN0cy5wdXNoKHJlYWRSZXF1ZXN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0PFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4sIGNodW5rOiBSIHwgdW5kZWZpbmVkLCBkb25lOiBib29sZWFuKSB7XG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPjtcblxuICBhc3NlcnQocmVhZGVyLl9yZWFkUmVxdWVzdHMubGVuZ3RoID4gMCk7XG5cbiAgY29uc3QgcmVhZFJlcXVlc3QgPSByZWFkZXIuX3JlYWRSZXF1ZXN0cy5zaGlmdCgpITtcbiAgaWYgKGRvbmUpIHtcbiAgICByZWFkUmVxdWVzdC5fY2xvc2VTdGVwcygpO1xuICB9IGVsc2Uge1xuICAgIHJlYWRSZXF1ZXN0Ll9jaHVua1N0ZXBzKGNodW5rISk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZFJlcXVlc3RzPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4pOiBudW1iZXIge1xuICByZXR1cm4gKHN0cmVhbS5fcmVhZGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPikuX3JlYWRSZXF1ZXN0cy5sZW5ndGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUhhc0RlZmF1bHRSZWFkZXIoc3RyZWFtOiBSZWFkYWJsZVN0cmVhbSk6IGJvb2xlYW4ge1xuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcblxuICBpZiAocmVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHJlYWRlcikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gUmVhZGVyc1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRSZXF1ZXN0PFI+IHtcbiAgX2NodW5rU3RlcHMoY2h1bms6IFIpOiB2b2lkO1xuXG4gIF9jbG9zZVN0ZXBzKCk6IHZvaWQ7XG5cbiAgX2Vycm9yU3RlcHMoZTogYW55KTogdm9pZDtcbn1cblxuLyoqXG4gKiBBIGRlZmF1bHQgcmVhZGVyIHZlbmRlZCBieSBhIHtAbGluayBSZWFkYWJsZVN0cmVhbX0uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY2xhc3MgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFIgPSBhbnk+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb3duZXJSZWFkYWJsZVN0cmVhbSE6IFJlYWRhYmxlU3RyZWFtPFI+O1xuICAvKiogQGludGVybmFsICovXG4gIF9jbG9zZWRQcm9taXNlITogUHJvbWlzZTx1bmRlZmluZWQ+O1xuICAvKiogQGludGVybmFsICovXG4gIF9jbG9zZWRQcm9taXNlX3Jlc29sdmU/OiAodmFsdWU/OiB1bmRlZmluZWQpID0+IHZvaWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlZFByb21pc2VfcmVqZWN0PzogKHJlYXNvbjogYW55KSA9PiB2b2lkO1xuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkUmVxdWVzdHM6IFNpbXBsZVF1ZXVlPFJlYWRSZXF1ZXN0PFI+PjtcblxuICBjb25zdHJ1Y3RvcihzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFI+KSB7XG4gICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChzdHJlYW0sIDEsICdSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXInKTtcbiAgICBhc3NlcnRSZWFkYWJsZVN0cmVhbShzdHJlYW0sICdGaXJzdCBwYXJhbWV0ZXInKTtcblxuICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgc3RyZWFtIGhhcyBhbHJlYWR5IGJlZW4gbG9ja2VkIGZvciBleGNsdXNpdmUgcmVhZGluZyBieSBhbm90aGVyIHJlYWRlcicpO1xuICAgIH1cblxuICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0luaXRpYWxpemUodGhpcywgc3RyZWFtKTtcblxuICAgIHRoaXMuX3JlYWRSZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgc3RyZWFtIGJlY29tZXMgY2xvc2VkLFxuICAgKiBvciByZWplY3RlZCBpZiB0aGUgc3RyZWFtIGV2ZXIgZXJyb3JzIG9yIHRoZSByZWFkZXIncyBsb2NrIGlzIHJlbGVhc2VkIGJlZm9yZSB0aGUgc3RyZWFtIGZpbmlzaGVzIGNsb3NpbmcuXG4gICAqL1xuICBnZXQgY2xvc2VkKCk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Nsb3NlZCcpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2xvc2VkUHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgcmVhZGVyIGlzIGFjdGl2ZSwgYmVoYXZlcyB0aGUgc2FtZSBhcyB7QGxpbmsgUmVhZGFibGVTdHJlYW0uY2FuY2VsIHwgc3RyZWFtLmNhbmNlbChyZWFzb24pfS5cbiAgICovXG4gIGNhbmNlbChyZWFzb246IGFueSA9IHVuZGVmaW5lZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjYW5jZWwnKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgocmVhZGVyTG9ja0V4Y2VwdGlvbignY2FuY2VsJykpO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNDYW5jZWwodGhpcywgcmVhc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGFsbG93cyBhY2Nlc3MgdG8gdGhlIG5leHQgY2h1bmsgZnJvbSB0aGUgc3RyZWFtJ3MgaW50ZXJuYWwgcXVldWUsIGlmIGF2YWlsYWJsZS5cbiAgICpcbiAgICogSWYgcmVhZGluZyBhIGNodW5rIGNhdXNlcyB0aGUgcXVldWUgdG8gYmVjb21lIGVtcHR5LCBtb3JlIGRhdGEgd2lsbCBiZSBwdWxsZWQgZnJvbSB0aGUgdW5kZXJseWluZyBzb3VyY2UuXG4gICAqL1xuICByZWFkKCk6IFByb21pc2U8UmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdDxSPj4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdyZWFkJykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ3JlYWQgZnJvbScpKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2UhOiAocmVzdWx0OiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PFI+KSA9PiB2b2lkO1xuICAgIGxldCByZWplY3RQcm9taXNlITogKHJlYXNvbjogYW55KSA9PiB2b2lkO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXdQcm9taXNlPFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8Uj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgIHJlamVjdFByb21pc2UgPSByZWplY3Q7XG4gICAgfSk7XG4gICAgY29uc3QgcmVhZFJlcXVlc3Q6IFJlYWRSZXF1ZXN0PFI+ID0ge1xuICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IGNodW5rLCBkb25lOiBmYWxzZSB9KSxcbiAgICAgIF9jbG9zZVN0ZXBzOiAoKSA9PiByZXNvbHZlUHJvbWlzZSh7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfSksXG4gICAgICBfZXJyb3JTdGVwczogZSA9PiByZWplY3RQcm9taXNlKGUpXG4gICAgfTtcbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHRoaXMsIHJlYWRSZXF1ZXN0KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgcmVhZGVyJ3MgbG9jayBvbiB0aGUgY29ycmVzcG9uZGluZyBzdHJlYW0uIEFmdGVyIHRoZSBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgcmVhZGVyIGlzIG5vIGxvbmdlciBhY3RpdmUuXG4gICAqIElmIHRoZSBhc3NvY2lhdGVkIHN0cmVhbSBpcyBlcnJvcmVkIHdoZW4gdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZWFkZXIgd2lsbCBhcHBlYXIgZXJyb3JlZCBpbiB0aGUgc2FtZSB3YXlcbiAgICogZnJvbSBub3cgb247IG90aGVyd2lzZSwgdGhlIHJlYWRlciB3aWxsIGFwcGVhciBjbG9zZWQuXG4gICAqXG4gICAqIEEgcmVhZGVyJ3MgbG9jayBjYW5ub3QgYmUgcmVsZWFzZWQgd2hpbGUgaXQgc3RpbGwgaGFzIGEgcGVuZGluZyByZWFkIHJlcXVlc3QsIGkuZS4sIGlmIGEgcHJvbWlzZSByZXR1cm5lZCBieVxuICAgKiB0aGUgcmVhZGVyJ3Mge0BsaW5rIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5yZWFkIHwgcmVhZCgpfSBtZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBzZXR0bGVkLiBBdHRlbXB0aW5nIHRvXG4gICAqIGRvIHNvIHdpbGwgdGhyb3cgYSBgVHlwZUVycm9yYCBhbmQgbGVhdmUgdGhlIHJlYWRlciBsb2NrZWQgdG8gdGhlIHN0cmVhbS5cbiAgICovXG4gIHJlbGVhc2VMb2NrKCk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIodGhpcykpIHtcbiAgICAgIHRocm93IGRlZmF1bHRSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdyZWxlYXNlTG9jaycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVhZFJlcXVlc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RyaWVkIHRvIHJlbGVhc2UgYSByZWFkZXIgbG9jayB3aGVuIHRoYXQgcmVhZGVyIGhhcyBwZW5kaW5nIHJlYWQoKSBjYWxscyB1bi1zZXR0bGVkJyk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZSh0aGlzKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIucHJvdG90eXBlLCB7XG4gIGNhbmNlbDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHJlYWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICByZWxlYXNlTG9jazogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGNsb3NlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcicsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgcmVhZGVycy5cblxuZXhwb3J0IGZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFIgPSBhbnk+KHg6IGFueSk6IHggaXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+IHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX3JlYWRSZXF1ZXN0cycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkPFI+KHJlYWRlcjogUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZFJlcXVlc3Q6IFJlYWRSZXF1ZXN0PFI+KTogdm9pZCB7XG4gIGNvbnN0IHN0cmVhbSA9IHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbTtcblxuICBhc3NlcnQoc3RyZWFtICE9PSB1bmRlZmluZWQpO1xuXG4gIHN0cmVhbS5fZGlzdHVyYmVkID0gdHJ1ZTtcblxuICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICByZWFkUmVxdWVzdC5fY2xvc2VTdGVwcygpO1xuICB9IGVsc2UgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgIHJlYWRSZXF1ZXN0Ll9lcnJvclN0ZXBzKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICB9IGVsc2Uge1xuICAgIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnKTtcbiAgICBzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcltQdWxsU3RlcHNdKHJlYWRSZXF1ZXN0IGFzIFJlYWRSZXF1ZXN0PGFueT4pO1xuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIuXG5cbmZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFxuICAgIGBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcmApO1xufVxuIiwgIi8vLyA8cmVmZXJlbmNlIGxpYj1cImVzMjAxOC5hc3luY2l0ZXJhYmxlXCIgLz5cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uICovXG5leHBvcnQgY29uc3QgQXN5bmNJdGVyYXRvclByb3RvdHlwZTogQXN5bmNJdGVyYWJsZTxhbnk+IHwgdW5kZWZpbmVkID1cbiAgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZihhc3luYyBmdW5jdGlvbiogKCk6IEFzeW5jSXRlcmFibGVJdGVyYXRvcjxhbnk+IHt9KS5wcm90b3R5cGUpO1xuIiwgIi8vLyA8cmVmZXJlbmNlIGxpYj1cImVzMjAxOC5hc3luY2l0ZXJhYmxlXCIgLz5cblxuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW0gfSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHtcbiAgQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcixcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0LFxuICBSZWFkUmVxdWVzdFxufSBmcm9tICcuL2RlZmF1bHQtcmVhZGVyJztcbmltcG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0NhbmNlbCxcbiAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZSxcbiAgcmVhZGVyTG9ja0V4Y2VwdGlvblxufSBmcm9tICcuL2dlbmVyaWMtcmVhZGVyJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuaW1wb3J0IHsgQXN5bmNJdGVyYXRvclByb3RvdHlwZSB9IGZyb20gJ0BAdGFyZ2V0L3N0dWIvYXN5bmMtaXRlcmF0b3ItcHJvdG90eXBlJztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQge1xuICBuZXdQcm9taXNlLFxuICBwcm9taXNlUmVqZWN0ZWRXaXRoLFxuICBwcm9taXNlUmVzb2x2ZWRXaXRoLFxuICBxdWV1ZU1pY3JvdGFzayxcbiAgdHJhbnNmb3JtUHJvbWlzZVdpdGhcbn0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuXG4vKipcbiAqIEFuIGFzeW5jIGl0ZXJhdG9yIHJldHVybmVkIGJ5IHtAbGluayBSZWFkYWJsZVN0cmVhbS52YWx1ZXN9LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8Uj4gZXh0ZW5kcyBBc3luY0l0ZXJhdG9yPFI+IHtcbiAgbmV4dCgpOiBQcm9taXNlPEl0ZXJhdG9yUmVzdWx0PFIsIHVuZGVmaW5lZD4+O1xuXG4gIHJldHVybih2YWx1ZT86IGFueSk6IFByb21pc2U8SXRlcmF0b3JSZXN1bHQ8YW55Pj47XG59XG5cbmV4cG9ydCBjbGFzcyBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JJbXBsPFI+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfcmVhZGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj47XG4gIHByaXZhdGUgcmVhZG9ubHkgX3ByZXZlbnRDYW5jZWw6IGJvb2xlYW47XG4gIHByaXZhdGUgX29uZ29pbmdQcm9taXNlOiBQcm9taXNlPFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8Uj4+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIF9pc0ZpbmlzaGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocmVhZGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4sIHByZXZlbnRDYW5jZWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkZXIgPSByZWFkZXI7XG4gICAgdGhpcy5fcHJldmVudENhbmNlbCA9IHByZXZlbnRDYW5jZWw7XG4gIH1cblxuICBuZXh0KCk6IFByb21pc2U8UmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdDxSPj4ge1xuICAgIGNvbnN0IG5leHRTdGVwcyA9ICgpID0+IHRoaXMuX25leHRTdGVwcygpO1xuICAgIHRoaXMuX29uZ29pbmdQcm9taXNlID0gdGhpcy5fb25nb2luZ1Byb21pc2UgP1xuICAgICAgdHJhbnNmb3JtUHJvbWlzZVdpdGgodGhpcy5fb25nb2luZ1Byb21pc2UsIG5leHRTdGVwcywgbmV4dFN0ZXBzKSA6XG4gICAgICBuZXh0U3RlcHMoKTtcbiAgICByZXR1cm4gdGhpcy5fb25nb2luZ1Byb21pc2U7XG4gIH1cblxuICByZXR1cm4odmFsdWU6IGFueSk6IFByb21pc2U8UmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdDxhbnk+PiB7XG4gICAgY29uc3QgcmV0dXJuU3RlcHMgPSAoKSA9PiB0aGlzLl9yZXR1cm5TdGVwcyh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX29uZ29pbmdQcm9taXNlID9cbiAgICAgIHRyYW5zZm9ybVByb21pc2VXaXRoKHRoaXMuX29uZ29pbmdQcm9taXNlLCByZXR1cm5TdGVwcywgcmV0dXJuU3RlcHMpIDpcbiAgICAgIHJldHVyblN0ZXBzKCk7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0U3RlcHMoKTogUHJvbWlzZTxSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PFI+PiB7XG4gICAgaWYgKHRoaXMuX2lzRmluaXNoZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlYWRlciA9IHRoaXMuX3JlYWRlcjtcbiAgICBpZiAocmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ2l0ZXJhdGUnKSk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlITogKHJlc3VsdDogUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdDxSPikgPT4gdm9pZDtcbiAgICBsZXQgcmVqZWN0UHJvbWlzZSE6IChyZWFzb246IGFueSkgPT4gdm9pZDtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZTxSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PFI+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICByZWplY3RQcm9taXNlID0gcmVqZWN0O1xuICAgIH0pO1xuICAgIGNvbnN0IHJlYWRSZXF1ZXN0OiBSZWFkUmVxdWVzdDxSPiA9IHtcbiAgICAgIF9jaHVua1N0ZXBzOiBjaHVuayA9PiB7XG4gICAgICAgIHRoaXMuX29uZ29pbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRlbGF5ZWQgYnkgb25lIG1pY3JvdGFzaywgb3RoZXJ3aXNlIHdlIHN0b3AgcHVsbGluZyB0b28gZWFybHkgd2hpY2ggYnJlYWtzIGEgdGVzdC5cbiAgICAgICAgLy8gRklYTUUgSXMgdGhpcyBhIGJ1ZyBpbiB0aGUgc3BlY2lmaWNhdGlvbiwgb3IgaW4gdGhlIHRlc3Q/XG4gICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IGNodW5rLCBkb25lOiBmYWxzZSB9KSk7XG4gICAgICB9LFxuICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHtcbiAgICAgICAgdGhpcy5fb25nb2luZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2lzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgICAgIHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9KTtcbiAgICAgIH0sXG4gICAgICBfZXJyb3JTdGVwczogcmVhc29uID0+IHtcbiAgICAgICAgdGhpcy5fb25nb2luZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2lzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgICAgIHJlamVjdFByb21pc2UocmVhc29uKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQocmVhZGVyLCByZWFkUmVxdWVzdCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwcml2YXRlIF9yZXR1cm5TdGVwcyh2YWx1ZTogYW55KTogUHJvbWlzZTxSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PGFueT4+IHtcbiAgICBpZiAodGhpcy5faXNGaW5pc2hlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHZhbHVlLCBkb25lOiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLl9pc0ZpbmlzaGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHJlYWRlciA9IHRoaXMuX3JlYWRlcjtcbiAgICBpZiAocmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ2ZpbmlzaCBpdGVyYXRpbmcnKSk7XG4gICAgfVxuXG4gICAgYXNzZXJ0KHJlYWRlci5fcmVhZFJlcXVlc3RzLmxlbmd0aCA9PT0gMCk7XG5cbiAgICBpZiAoIXRoaXMuX3ByZXZlbnRDYW5jZWwpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0NhbmNlbChyZWFkZXIsIHZhbHVlKTtcbiAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1Qcm9taXNlV2l0aChyZXN1bHQsICgpID0+ICh7IHZhbHVlLCBkb25lOiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgoeyB2YWx1ZSwgZG9uZTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5kZWNsYXJlIGNsYXNzIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckluc3RhbmNlPFI+IGltcGxlbWVudHMgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yPFI+IHtcbiAgLyoqIEBpbnRlcmFsICovXG4gIF9hc3luY0l0ZXJhdG9ySW1wbDogUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW1wbDxSPjtcblxuICBuZXh0KCk6IFByb21pc2U8SXRlcmF0b3JSZXN1bHQ8UiwgdW5kZWZpbmVkPj47XG5cbiAgcmV0dXJuKHZhbHVlPzogYW55KTogUHJvbWlzZTxJdGVyYXRvclJlc3VsdDxhbnk+Pjtcbn1cblxuY29uc3QgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yUHJvdG90eXBlOiBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JJbnN0YW5jZTxhbnk+ID0ge1xuICBuZXh0KHRoaXM6IFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckluc3RhbmNlPGFueT4pOiBQcm9taXNlPFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8YW55Pj4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbUFzeW5jSXRlcmF0b3JCcmFuZENoZWNrRXhjZXB0aW9uKCduZXh0JykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYXN5bmNJdGVyYXRvckltcGwubmV4dCgpO1xuICB9LFxuXG4gIHJldHVybih0aGlzOiBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JJbnN0YW5jZTxhbnk+LCB2YWx1ZTogYW55KTogUHJvbWlzZTxSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PGFueT4+IHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1Bc3luY0l0ZXJhdG9yQnJhbmRDaGVja0V4Y2VwdGlvbigncmV0dXJuJykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYXN5bmNJdGVyYXRvckltcGwucmV0dXJuKHZhbHVlKTtcbiAgfVxufSBhcyBhbnk7XG5pZiAoQXN5bmNJdGVyYXRvclByb3RvdHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JQcm90b3R5cGUsIEFzeW5jSXRlcmF0b3JQcm90b3R5cGUpO1xufVxuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5cbmV4cG9ydCBmdW5jdGlvbiBBY3F1aXJlUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50Q2FuY2VsOiBib29sZWFuKTogUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yPFI+IHtcbiAgY29uc3QgcmVhZGVyID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPihzdHJlYW0pO1xuICBjb25zdCBpbXBsID0gbmV3IFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckltcGwocmVhZGVyLCBwcmV2ZW50Q2FuY2VsKTtcbiAgY29uc3QgaXRlcmF0b3I6IFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckluc3RhbmNlPFI+ID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JQcm90b3R5cGUpO1xuICBpdGVyYXRvci5fYXN5bmNJdGVyYXRvckltcGwgPSBpbXBsO1xuICByZXR1cm4gaXRlcmF0b3I7XG59XG5cbmZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yPFIgPSBhbnk+KHg6IGFueSk6IHggaXMgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yPFI+IHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2FzeW5jSXRlcmF0b3JJbXBsJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIG5vaW5zcGVjdGlvbiBTdXNwaWNpb3VzVHlwZU9mR3VhcmRcbiAgICByZXR1cm4gKHggYXMgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW5zdGFuY2U8YW55PikuX2FzeW5jSXRlcmF0b3JJbXBsIGluc3RhbmNlb2ZcbiAgICAgIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckltcGw7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5cbmZ1bmN0aW9uIHN0cmVhbUFzeW5jSXRlcmF0b3JCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgUmVhZGFibGVTdGVhbUFzeW5jSXRlcmF0b3JgKTtcbn1cbiIsICIvLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTUuY29yZVwiIC8+XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci9pc05hTiNQb2x5ZmlsbFxuY29uc3QgTnVtYmVySXNOYU46IHR5cGVvZiBOdW1iZXIuaXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gKHgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICByZXR1cm4geCAhPT0geDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlcklzTmFOO1xuIiwgImV4cG9ydCBmdW5jdGlvbiBDcmVhdGVBcnJheUZyb21MaXN0PFQgZXh0ZW5kcyBhbnlbXT4oZWxlbWVudHM6IFQpOiBUIHtcbiAgLy8gV2UgdXNlIGFycmF5cyB0byByZXByZXNlbnQgbGlzdHMsIHNvIHRoaXMgaXMgYmFzaWNhbGx5IGEgbm8tb3AuXG4gIC8vIERvIGEgc2xpY2UgdGhvdWdoIGp1c3QgaW4gY2FzZSB3ZSBoYXBwZW4gdG8gZGVwZW5kIG9uIHRoZSB1bmlxdWUtbmVzcy5cbiAgcmV0dXJuIGVsZW1lbnRzLnNsaWNlKCkgYXMgVDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvcHlEYXRhQmxvY2tCeXRlcyhkZXN0OiBBcnJheUJ1ZmZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdE9mZnNldDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IEFycmF5QnVmZmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNPZmZzZXQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbjogbnVtYmVyKSB7XG4gIG5ldyBVaW50OEFycmF5KGRlc3QpLnNldChuZXcgVWludDhBcnJheShzcmMsIHNyY09mZnNldCwgbiksIGRlc3RPZmZzZXQpO1xufVxuXG4vLyBOb3QgaW1wbGVtZW50ZWQgY29ycmVjdGx5XG5leHBvcnQgZnVuY3Rpb24gVHJhbnNmZXJBcnJheUJ1ZmZlcjxUIGV4dGVuZHMgQXJyYXlCdWZmZXJMaWtlPihPOiBUKTogVCB7XG4gIHJldHVybiBPO1xufVxuXG4vLyBOb3QgaW1wbGVtZW50ZWQgY29ycmVjdGx5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5leHBvcnQgZnVuY3Rpb24gQ2FuVHJhbnNmZXJBcnJheUJ1ZmZlcihPOiBBcnJheUJ1ZmZlckxpa2UpOiBib29sZWFuIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIE5vdCBpbXBsZW1lbnRlZCBjb3JyZWN0bHlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmV4cG9ydCBmdW5jdGlvbiBJc0RldGFjaGVkQnVmZmVyKE86IEFycmF5QnVmZmVyTGlrZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcnJheUJ1ZmZlclNsaWNlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBiZWdpbjogbnVtYmVyLCBlbmQ6IG51bWJlcik6IEFycmF5QnVmZmVyTGlrZSB7XG4gIC8vIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSBpcyBub3QgYXZhaWxhYmxlIG9uIElFMTBcbiAgLy8gaHR0cHM6Ly93d3cuY2FuaXVzZS5jb20vbWRuLWphdmFzY3JpcHRfYnVpbHRpbnNfYXJyYXlidWZmZXJfc2xpY2VcbiAgaWYgKGJ1ZmZlci5zbGljZSkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoYmVnaW4sIGVuZCk7XG4gIH1cbiAgY29uc3QgbGVuZ3RoID0gZW5kIC0gYmVnaW47XG4gIGNvbnN0IHNsaWNlID0gbmV3IEFycmF5QnVmZmVyKGxlbmd0aCk7XG4gIENvcHlEYXRhQmxvY2tCeXRlcyhzbGljZSwgMCwgYnVmZmVyLCBiZWdpbiwgbGVuZ3RoKTtcbiAgcmV0dXJuIHNsaWNlO1xufVxuIiwgImltcG9ydCBOdW1iZXJJc05hTiBmcm9tICcuLi8uLi9zdHViL251bWJlci1pc25hbic7XG5pbXBvcnQgeyBBcnJheUJ1ZmZlclNsaWNlIH0gZnJvbSAnLi9lY21hc2NyaXB0JztcblxuZXhwb3J0IGZ1bmN0aW9uIElzTm9uTmVnYXRpdmVOdW1iZXIodjogbnVtYmVyKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgdiAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoTnVtYmVySXNOYU4odikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodiA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENsb25lQXNVaW50OEFycmF5KE86IEFycmF5QnVmZmVyVmlldyk6IFVpbnQ4QXJyYXkge1xuICBjb25zdCBidWZmZXIgPSBBcnJheUJ1ZmZlclNsaWNlKE8uYnVmZmVyLCBPLmJ5dGVPZmZzZXQsIE8uYnl0ZU9mZnNldCArIE8uYnl0ZUxlbmd0aCk7XG4gIHJldHVybiBuZXcgVWludDhBcnJheShidWZmZXIpO1xufVxuIiwgImltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuaW1wb3J0IHsgU2ltcGxlUXVldWUgfSBmcm9tICcuLi9zaW1wbGUtcXVldWUnO1xuaW1wb3J0IHsgSXNOb25OZWdhdGl2ZU51bWJlciB9IGZyb20gJy4vbWlzY2VsbGFuZW91cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVldWVDb250YWluZXI8VD4ge1xuICBfcXVldWU6IFNpbXBsZVF1ZXVlPFQ+O1xuICBfcXVldWVUb3RhbFNpemU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRdWV1ZVBhaXI8VD4ge1xuICB2YWx1ZTogVDtcbiAgc2l6ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRGVxdWV1ZVZhbHVlPFQ+KGNvbnRhaW5lcjogUXVldWVDb250YWluZXI8UXVldWVQYWlyPFQ+Pik6IFQge1xuICBhc3NlcnQoJ19xdWV1ZScgaW4gY29udGFpbmVyICYmICdfcXVldWVUb3RhbFNpemUnIGluIGNvbnRhaW5lcik7XG4gIGFzc2VydChjb250YWluZXIuX3F1ZXVlLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IHBhaXIgPSBjb250YWluZXIuX3F1ZXVlLnNoaWZ0KCkhO1xuICBjb250YWluZXIuX3F1ZXVlVG90YWxTaXplIC09IHBhaXIuc2l6ZTtcbiAgaWYgKGNvbnRhaW5lci5fcXVldWVUb3RhbFNpemUgPCAwKSB7XG4gICAgY29udGFpbmVyLl9xdWV1ZVRvdGFsU2l6ZSA9IDA7XG4gIH1cblxuICByZXR1cm4gcGFpci52YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVucXVldWVWYWx1ZVdpdGhTaXplPFQ+KGNvbnRhaW5lcjogUXVldWVDb250YWluZXI8UXVldWVQYWlyPFQ+PiwgdmFsdWU6IFQsIHNpemU6IG51bWJlcikge1xuICBhc3NlcnQoJ19xdWV1ZScgaW4gY29udGFpbmVyICYmICdfcXVldWVUb3RhbFNpemUnIGluIGNvbnRhaW5lcik7XG5cbiAgaWYgKCFJc05vbk5lZ2F0aXZlTnVtYmVyKHNpemUpIHx8IHNpemUgPT09IEluZmluaXR5KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1NpemUgbXVzdCBiZSBhIGZpbml0ZSwgbm9uLU5hTiwgbm9uLW5lZ2F0aXZlIG51bWJlci4nKTtcbiAgfVxuXG4gIGNvbnRhaW5lci5fcXVldWUucHVzaCh7IHZhbHVlLCBzaXplIH0pO1xuICBjb250YWluZXIuX3F1ZXVlVG90YWxTaXplICs9IHNpemU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQZWVrUXVldWVWYWx1ZTxUPihjb250YWluZXI6IFF1ZXVlQ29udGFpbmVyPFF1ZXVlUGFpcjxUPj4pOiBUIHtcbiAgYXNzZXJ0KCdfcXVldWUnIGluIGNvbnRhaW5lciAmJiAnX3F1ZXVlVG90YWxTaXplJyBpbiBjb250YWluZXIpO1xuICBhc3NlcnQoY29udGFpbmVyLl9xdWV1ZS5sZW5ndGggPiAwKTtcblxuICBjb25zdCBwYWlyID0gY29udGFpbmVyLl9xdWV1ZS5wZWVrKCk7XG4gIHJldHVybiBwYWlyLnZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVzZXRRdWV1ZTxUPihjb250YWluZXI6IFF1ZXVlQ29udGFpbmVyPFQ+KSB7XG4gIGFzc2VydCgnX3F1ZXVlJyBpbiBjb250YWluZXIgJiYgJ19xdWV1ZVRvdGFsU2l6ZScgaW4gY29udGFpbmVyKTtcblxuICBjb250YWluZXIuX3F1ZXVlID0gbmV3IFNpbXBsZVF1ZXVlPFQ+KCk7XG4gIGNvbnRhaW5lci5fcXVldWVUb3RhbFNpemUgPSAwO1xufVxuIiwgImltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuaW1wb3J0IHsgU2ltcGxlUXVldWUgfSBmcm9tICcuLi9zaW1wbGUtcXVldWUnO1xuaW1wb3J0IHsgUmVzZXRRdWV1ZSB9IGZyb20gJy4uL2Fic3RyYWN0LW9wcy9xdWV1ZS13aXRoLXNpemVzJztcbmltcG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtQWRkUmVhZFJlcXVlc3QsXG4gIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0LFxuICBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyxcbiAgUmVhZGFibGVTdHJlYW1IYXNEZWZhdWx0UmVhZGVyLFxuICBSZWFkUmVxdWVzdFxufSBmcm9tICcuL2RlZmF1bHQtcmVhZGVyJztcbmltcG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtQWRkUmVhZEludG9SZXF1ZXN0LFxuICBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkSW50b1JlcXVlc3QsXG4gIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZEludG9SZXF1ZXN0cyxcbiAgUmVhZGFibGVTdHJlYW1IYXNCWU9CUmVhZGVyLFxuICBSZWFkSW50b1JlcXVlc3Rcbn0gZnJvbSAnLi9ieW9iLXJlYWRlcic7XG5pbXBvcnQgTnVtYmVySXNJbnRlZ2VyIGZyb20gJy4uLy4uL3N0dWIvbnVtYmVyLWlzaW50ZWdlcic7XG5pbXBvcnQge1xuICBJc1JlYWRhYmxlU3RyZWFtTG9ja2VkLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW0sXG4gIFJlYWRhYmxlU3RyZWFtQ2xvc2UsXG4gIFJlYWRhYmxlU3RyZWFtRXJyb3Jcbn0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtJztcbmltcG9ydCB7IFZhbGlkYXRlZFVuZGVybHlpbmdCeXRlU291cmNlIH0gZnJvbSAnLi91bmRlcmx5aW5nLXNvdXJjZSc7XG5pbXBvcnQgeyB0eXBlSXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHtcbiAgQXJyYXlCdWZmZXJTbGljZSxcbiAgQ2FuVHJhbnNmZXJBcnJheUJ1ZmZlcixcbiAgQ29weURhdGFCbG9ja0J5dGVzLFxuICBJc0RldGFjaGVkQnVmZmVyLFxuICBUcmFuc2ZlckFycmF5QnVmZmVyXG59IGZyb20gJy4uL2Fic3RyYWN0LW9wcy9lY21hc2NyaXB0JztcbmltcG9ydCB7IENhbmNlbFN0ZXBzLCBQdWxsU3RlcHMgfSBmcm9tICcuLi9hYnN0cmFjdC1vcHMvaW50ZXJuYWwtbWV0aG9kcyc7XG5pbXBvcnQgeyBwcm9taXNlUmVzb2x2ZWRXaXRoLCB1cG9uUHJvbWlzZSB9IGZyb20gJy4uL2hlbHBlcnMvd2ViaWRsJztcbmltcG9ydCB7IGFzc2VydFJlcXVpcmVkQXJndW1lbnQsIGNvbnZlcnRVbnNpZ25lZExvbmdMb25nV2l0aEVuZm9yY2VSYW5nZSB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvYmFzaWMnO1xuXG4vKipcbiAqIEEgcHVsbC1pbnRvIHJlcXVlc3QgaW4gYSB7QGxpbmsgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcn0uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY2xhc3MgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Fzc29jaWF0ZWRSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyITogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdmlldyE6IEFycmF5QnVmZmVyVmlldyB8IG51bGw7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIGNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlldyBmb3Igd3JpdGluZyBpbiB0bywgb3IgYG51bGxgIGlmIHRoZSBCWU9CIHJlcXVlc3QgaGFzIGFscmVhZHkgYmVlbiByZXNwb25kZWQgdG8uXG4gICAqL1xuICBnZXQgdmlldygpOiBBcnJheUJ1ZmZlclZpZXcgfCBudWxsIHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCh0aGlzKSkge1xuICAgICAgdGhyb3cgYnlvYlJlcXVlc3RCcmFuZENoZWNrRXhjZXB0aW9uKCd2aWV3Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3ZpZXc7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRvIHRoZSBhc3NvY2lhdGVkIHJlYWRhYmxlIGJ5dGUgc3RyZWFtIHRoYXQgYGJ5dGVzV3JpdHRlbmAgYnl0ZXMgd2VyZSB3cml0dGVuIGludG9cbiAgICoge0BsaW5rIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QudmlldyB8IHZpZXd9LCBjYXVzaW5nIHRoZSByZXN1bHQgYmUgc3VyZmFjZWQgdG8gdGhlIGNvbnN1bWVyLlxuICAgKlxuICAgKiBBZnRlciB0aGlzIG1ldGhvZCBpcyBjYWxsZWQsIHtAbGluayBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnZpZXcgfCB2aWV3fSB3aWxsIGJlIHRyYW5zZmVycmVkIGFuZCBubyBsb25nZXJcbiAgICogbW9kaWZpYWJsZS5cbiAgICovXG4gIHJlc3BvbmQoYnl0ZXNXcml0dGVuOiBudW1iZXIpOiB2b2lkO1xuICByZXNwb25kKGJ5dGVzV3JpdHRlbjogbnVtYmVyIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QodGhpcykpIHtcbiAgICAgIHRocm93IGJ5b2JSZXF1ZXN0QnJhbmRDaGVja0V4Y2VwdGlvbigncmVzcG9uZCcpO1xuICAgIH1cbiAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KGJ5dGVzV3JpdHRlbiwgMSwgJ3Jlc3BvbmQnKTtcbiAgICBieXRlc1dyaXR0ZW4gPSBjb252ZXJ0VW5zaWduZWRMb25nTG9uZ1dpdGhFbmZvcmNlUmFuZ2UoYnl0ZXNXcml0dGVuLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG5cbiAgICBpZiAodGhpcy5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBCWU9CIHJlcXVlc3QgaGFzIGJlZW4gaW52YWxpZGF0ZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoSXNEZXRhY2hlZEJ1ZmZlcih0aGlzLl92aWV3IS5idWZmZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgQllPQiByZXF1ZXN0J3MgYnVmZmVyIGhhcyBiZWVuIGRldGFjaGVkIGFuZCBzbyBjYW5ub3QgYmUgdXNlZCBhcyBhIHJlc3BvbnNlYCk7XG4gICAgfVxuXG4gICAgYXNzZXJ0KHRoaXMuX3ZpZXchLmJ5dGVMZW5ndGggPiAwKTtcbiAgICBhc3NlcnQodGhpcy5fdmlldyEuYnVmZmVyLmJ5dGVMZW5ndGggPiAwKTtcblxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kKHRoaXMuX2Fzc29jaWF0ZWRSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLCBieXRlc1dyaXR0ZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0byB0aGUgYXNzb2NpYXRlZCByZWFkYWJsZSBieXRlIHN0cmVhbSB0aGF0IGluc3RlYWQgb2Ygd3JpdGluZyBpbnRvXG4gICAqIHtAbGluayBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnZpZXcgfCB2aWV3fSwgdGhlIHVuZGVybHlpbmcgYnl0ZSBzb3VyY2UgaXMgcHJvdmlkaW5nIGEgbmV3IGBBcnJheUJ1ZmZlclZpZXdgLFxuICAgKiB3aGljaCB3aWxsIGJlIGdpdmVuIHRvIHRoZSBjb25zdW1lciBvZiB0aGUgcmVhZGFibGUgYnl0ZSBzdHJlYW0uXG4gICAqXG4gICAqIEFmdGVyIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCwgYHZpZXdgIHdpbGwgYmUgdHJhbnNmZXJyZWQgYW5kIG5vIGxvbmdlciBtb2RpZmlhYmxlLlxuICAgKi9cbiAgcmVzcG9uZFdpdGhOZXdWaWV3KHZpZXc6IEFycmF5QnVmZmVyVmlldyk6IHZvaWQ7XG4gIHJlc3BvbmRXaXRoTmV3Vmlldyh2aWV3OiBBcnJheUJ1ZmZlclZpZXcgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCh0aGlzKSkge1xuICAgICAgdGhyb3cgYnlvYlJlcXVlc3RCcmFuZENoZWNrRXhjZXB0aW9uKCdyZXNwb25kV2l0aE5ld1ZpZXcnKTtcbiAgICB9XG4gICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudCh2aWV3LCAxLCAncmVzcG9uZFdpdGhOZXdWaWV3Jyk7XG5cbiAgICBpZiAoIUFycmF5QnVmZmVyLmlzVmlldyh2aWV3KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IGNhbiBvbmx5IHJlc3BvbmQgd2l0aCBhcnJheSBidWZmZXIgdmlld3MnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBCWU9CIHJlcXVlc3QgaGFzIGJlZW4gaW52YWxpZGF0ZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoSXNEZXRhY2hlZEJ1ZmZlcih2aWV3LmJ1ZmZlcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBnaXZlbiB2aWV3XFwncyBidWZmZXIgaGFzIGJlZW4gZGV0YWNoZWQgYW5kIHNvIGNhbm5vdCBiZSB1c2VkIGFzIGEgcmVzcG9uc2UnKTtcbiAgICB9XG5cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3KHRoaXMuX2Fzc29jaWF0ZWRSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLCB2aWV3KTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnByb3RvdHlwZSwge1xuICByZXNwb25kOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgcmVzcG9uZFdpdGhOZXdWaWV3OiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgdmlldzogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0JyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmludGVyZmFjZSBBcnJheUJ1ZmZlclZpZXdDb25zdHJ1Y3RvcjxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXJWaWV3PiB7XG4gIG5ldyhidWZmZXI6IEFycmF5QnVmZmVyTGlrZSwgYnl0ZU9mZnNldDogbnVtYmVyLCBsZW5ndGg/OiBudW1iZXIpOiBUO1xuXG4gIHJlYWRvbmx5IHByb3RvdHlwZTogVDtcbiAgcmVhZG9ubHkgQllURVNfUEVSX0VMRU1FTlQ6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIEJ5dGVRdWV1ZUVsZW1lbnQge1xuICBidWZmZXI6IEFycmF5QnVmZmVyTGlrZTtcbiAgYnl0ZU9mZnNldDogbnVtYmVyO1xuICBieXRlTGVuZ3RoOiBudW1iZXI7XG59XG5cbnR5cGUgUHVsbEludG9EZXNjcmlwdG9yPFQgZXh0ZW5kcyBBcnJheUJ1ZmZlclZpZXcgPSBBcnJheUJ1ZmZlclZpZXc+ID1cbiAgRGVmYXVsdFB1bGxJbnRvRGVzY3JpcHRvclxuICB8IEJZT0JQdWxsSW50b0Rlc2NyaXB0b3I8VD47XG5cbmludGVyZmFjZSBEZWZhdWx0UHVsbEludG9EZXNjcmlwdG9yIHtcbiAgYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2U7XG4gIGJ1ZmZlckJ5dGVMZW5ndGg6IG51bWJlcjtcbiAgYnl0ZU9mZnNldDogbnVtYmVyO1xuICBieXRlTGVuZ3RoOiBudW1iZXI7XG4gIGJ5dGVzRmlsbGVkOiBudW1iZXI7XG4gIGVsZW1lbnRTaXplOiBudW1iZXI7XG4gIHZpZXdDb25zdHJ1Y3RvcjogQXJyYXlCdWZmZXJWaWV3Q29uc3RydWN0b3I8VWludDhBcnJheT47XG4gIHJlYWRlclR5cGU6ICdkZWZhdWx0Jztcbn1cblxuaW50ZXJmYWNlIEJZT0JQdWxsSW50b0Rlc2NyaXB0b3I8VCBleHRlbmRzIEFycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyVmlldz4ge1xuICBidWZmZXI6IEFycmF5QnVmZmVyTGlrZTtcbiAgYnVmZmVyQnl0ZUxlbmd0aDogbnVtYmVyO1xuICBieXRlT2Zmc2V0OiBudW1iZXI7XG4gIGJ5dGVMZW5ndGg6IG51bWJlcjtcbiAgYnl0ZXNGaWxsZWQ6IG51bWJlcjtcbiAgZWxlbWVudFNpemU6IG51bWJlcjtcbiAgdmlld0NvbnN0cnVjdG9yOiBBcnJheUJ1ZmZlclZpZXdDb25zdHJ1Y3RvcjxUPjtcbiAgcmVhZGVyVHlwZTogJ2J5b2InO1xufVxuXG4vKipcbiAqIEFsbG93cyBjb250cm9sIG9mIGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtIHwgcmVhZGFibGUgYnl0ZSBzdHJlYW19J3Mgc3RhdGUgYW5kIGludGVybmFsIHF1ZXVlLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIge1xuICAvKiogQGludGVybmFsICovXG4gIF9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtITogUmVhZGFibGVCeXRlU3RyZWFtO1xuICAvKiogQGludGVybmFsICovXG4gIF9xdWV1ZSE6IFNpbXBsZVF1ZXVlPEJ5dGVRdWV1ZUVsZW1lbnQ+O1xuICAvKiogQGludGVybmFsICovXG4gIF9xdWV1ZVRvdGFsU2l6ZSE6IG51bWJlcjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RhcnRlZCE6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlUmVxdWVzdGVkITogYm9vbGVhbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHVsbEFnYWluITogYm9vbGVhbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHVsbGluZyAhOiBib29sZWFuO1xuICAvKiogQGludGVybmFsICovXG4gIF9zdHJhdGVneUhXTSE6IG51bWJlcjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHVsbEFsZ29yaXRobSE6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NhbmNlbEFsZ29yaXRobSE6IChyZWFzb246IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYXV0b0FsbG9jYXRlQ2h1bmtTaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2J5b2JSZXF1ZXN0OiBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0IHwgbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGVuZGluZ1B1bGxJbnRvcyE6IFNpbXBsZVF1ZXVlPFB1bGxJbnRvRGVzY3JpcHRvcj47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIGNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBCWU9CIHB1bGwgcmVxdWVzdCwgb3IgYG51bGxgIGlmIHRoZXJlIGlzbid0IG9uZS5cbiAgICovXG4gIGdldCBieW9iUmVxdWVzdCgpOiBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0IHwgbnVsbCB7XG4gICAgaWYgKCFJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGJ5dGVTdHJlYW1Db250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignYnlvYlJlcXVlc3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldEJZT0JSZXF1ZXN0KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlc2lyZWQgc2l6ZSB0byBmaWxsIHRoZSBjb250cm9sbGVkIHN0cmVhbSdzIGludGVybmFsIHF1ZXVlLiBJdCBjYW4gYmUgbmVnYXRpdmUsIGlmIHRoZSBxdWV1ZSBpc1xuICAgKiBvdmVyLWZ1bGwuIEFuIHVuZGVybHlpbmcgYnl0ZSBzb3VyY2Ugb3VnaHQgdG8gdXNlIHRoaXMgaW5mb3JtYXRpb24gdG8gZGV0ZXJtaW5lIHdoZW4gYW5kIGhvdyB0byBhcHBseSBiYWNrcHJlc3N1cmUuXG4gICAqL1xuICBnZXQgZGVzaXJlZFNpemUoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCFJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGJ5dGVTdHJlYW1Db250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZGVzaXJlZFNpemUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldERlc2lyZWRTaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgY29udHJvbGxlZCByZWFkYWJsZSBzdHJlYW0uIENvbnN1bWVycyB3aWxsIHN0aWxsIGJlIGFibGUgdG8gcmVhZCBhbnkgcHJldmlvdXNseS1lbnF1ZXVlZCBjaHVua3MgZnJvbVxuICAgKiB0aGUgc3RyZWFtLCBidXQgb25jZSB0aG9zZSBhcmUgcmVhZCwgdGhlIHN0cmVhbSB3aWxsIGJlY29tZSBjbG9zZWQuXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIUlzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgYnl0ZVN0cmVhbUNvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjbG9zZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jbG9zZVJlcXVlc3RlZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHN0cmVhbSBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZDsgZG8gbm90IGNsb3NlIGl0IGFnYWluIScpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgc3RyZWFtIChpbiAke3N0YXRlfSBzdGF0ZSkgaXMgbm90IGluIHRoZSByZWFkYWJsZSBzdGF0ZSBhbmQgY2Fubm90IGJlIGNsb3NlZGApO1xuICAgIH1cblxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbG9zZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlcyB0aGUgZ2l2ZW4gY2h1bmsgY2h1bmsgaW4gdGhlIGNvbnRyb2xsZWQgcmVhZGFibGUgc3RyZWFtLlxuICAgKiBUaGUgY2h1bmsgaGFzIHRvIGJlIGFuIGBBcnJheUJ1ZmZlclZpZXdgIGluc3RhbmNlLCBvciBlbHNlIGEgYFR5cGVFcnJvcmAgd2lsbCBiZSB0aHJvd24uXG4gICAqL1xuICBlbnF1ZXVlKGNodW5rOiBBcnJheUJ1ZmZlclZpZXcpOiB2b2lkO1xuICBlbnF1ZXVlKGNodW5rOiBBcnJheUJ1ZmZlclZpZXcgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoIUlzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgYnl0ZVN0cmVhbUNvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdlbnF1ZXVlJyk7XG4gICAgfVxuXG4gICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChjaHVuaywgMSwgJ2VucXVldWUnKTtcbiAgICBpZiAoIUFycmF5QnVmZmVyLmlzVmlldyhjaHVuaykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NodW5rIG11c3QgYmUgYW4gYXJyYXkgYnVmZmVyIHZpZXcnKTtcbiAgICB9XG4gICAgaWYgKGNodW5rLmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NodW5rIG11c3QgaGF2ZSBub24temVybyBieXRlTGVuZ3RoJyk7XG4gICAgfVxuICAgIGlmIChjaHVuay5idWZmZXIuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgY2h1bmsncyBidWZmZXIgbXVzdCBoYXZlIG5vbi16ZXJvIGJ5dGVMZW5ndGhgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2xvc2VSZXF1ZXN0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmVhbSBpcyBjbG9zZWQgb3IgZHJhaW5pbmcnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIHN0cmVhbSAoaW4gJHtzdGF0ZX0gc3RhdGUpIGlzIG5vdCBpbiB0aGUgcmVhZGFibGUgc3RhdGUgYW5kIGNhbm5vdCBiZSBlbnF1ZXVlZCB0b2ApO1xuICAgIH1cblxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlKHRoaXMsIGNodW5rKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFcnJvcnMgdGhlIGNvbnRyb2xsZWQgcmVhZGFibGUgc3RyZWFtLCBtYWtpbmcgYWxsIGZ1dHVyZSBpbnRlcmFjdGlvbnMgd2l0aCBpdCBmYWlsIHdpdGggdGhlIGdpdmVuIGVycm9yIGBlYC5cbiAgICovXG4gIGVycm9yKGU6IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBieXRlU3RyZWFtQ29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Vycm9yJyk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKHRoaXMsIGUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBbQ2FuY2VsU3RlcHNdKHJlYXNvbjogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyUGVuZGluZ1B1bGxJbnRvcyh0aGlzKTtcblxuICAgIFJlc2V0UXVldWUodGhpcyk7XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9jYW5jZWxBbGdvcml0aG0ocmVhc29uKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKHRoaXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIFtQdWxsU3RlcHNdKHJlYWRSZXF1ZXN0OiBSZWFkUmVxdWVzdDxVaW50OEFycmF5Pik6IHZvaWQge1xuICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW07XG4gICAgYXNzZXJ0KFJlYWRhYmxlU3RyZWFtSGFzRGVmYXVsdFJlYWRlcihzdHJlYW0pKTtcblxuICAgIGlmICh0aGlzLl9xdWV1ZVRvdGFsU2l6ZSA+IDApIHtcbiAgICAgIGFzc2VydChSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyhzdHJlYW0pID09PSAwKTtcblxuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLl9xdWV1ZS5zaGlmdCgpITtcbiAgICAgIHRoaXMuX3F1ZXVlVG90YWxTaXplIC09IGVudHJ5LmJ5dGVMZW5ndGg7XG5cbiAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJIYW5kbGVRdWV1ZURyYWluKHRoaXMpO1xuXG4gICAgICBjb25zdCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZW50cnkuYnVmZmVyLCBlbnRyeS5ieXRlT2Zmc2V0LCBlbnRyeS5ieXRlTGVuZ3RoKTtcblxuICAgICAgcmVhZFJlcXVlc3QuX2NodW5rU3RlcHModmlldyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXV0b0FsbG9jYXRlQ2h1bmtTaXplID0gdGhpcy5fYXV0b0FsbG9jYXRlQ2h1bmtTaXplO1xuICAgIGlmIChhdXRvQWxsb2NhdGVDaHVua1NpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGJ1ZmZlcjogQXJyYXlCdWZmZXI7XG4gICAgICB0cnkge1xuICAgICAgICBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYXV0b0FsbG9jYXRlQ2h1bmtTaXplKTtcbiAgICAgIH0gY2F0Y2ggKGJ1ZmZlckUpIHtcbiAgICAgICAgcmVhZFJlcXVlc3QuX2Vycm9yU3RlcHMoYnVmZmVyRSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHVsbEludG9EZXNjcmlwdG9yOiBEZWZhdWx0UHVsbEludG9EZXNjcmlwdG9yID0ge1xuICAgICAgICBidWZmZXIsXG4gICAgICAgIGJ1ZmZlckJ5dGVMZW5ndGg6IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSxcbiAgICAgICAgYnl0ZU9mZnNldDogMCxcbiAgICAgICAgYnl0ZUxlbmd0aDogYXV0b0FsbG9jYXRlQ2h1bmtTaXplLFxuICAgICAgICBieXRlc0ZpbGxlZDogMCxcbiAgICAgICAgZWxlbWVudFNpemU6IDEsXG4gICAgICAgIHZpZXdDb25zdHJ1Y3RvcjogVWludDhBcnJheSxcbiAgICAgICAgcmVhZGVyVHlwZTogJ2RlZmF1bHQnXG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9wZW5kaW5nUHVsbEludG9zLnB1c2gocHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICB9XG5cbiAgICBSZWFkYWJsZVN0cmVhbUFkZFJlYWRSZXF1ZXN0KHN0cmVhbSwgcmVhZFJlcXVlc3QpO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKHRoaXMpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gIGNsb3NlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgZW5xdWV1ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGVycm9yOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgYnlvYlJlcXVlc3Q6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBkZXNpcmVkU2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyJyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLlxuXG5leHBvcnQgZnVuY3Rpb24gSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHg6IGFueSk6IHggaXMgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXI7XG59XG5cbmZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCh4OiBhbnkpOiB4IGlzIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3Qge1xuICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXInKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdDtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcik6IHZvaWQge1xuICBjb25zdCBzaG91bGRQdWxsID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNob3VsZENhbGxQdWxsKGNvbnRyb2xsZXIpO1xuICBpZiAoIXNob3VsZFB1bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY29udHJvbGxlci5fcHVsbGluZykge1xuICAgIGNvbnRyb2xsZXIuX3B1bGxBZ2FpbiA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXNzZXJ0KCFjb250cm9sbGVyLl9wdWxsQWdhaW4pO1xuXG4gIGNvbnRyb2xsZXIuX3B1bGxpbmcgPSB0cnVlO1xuXG4gIC8vIFRPRE86IFRlc3QgY29udHJvbGxlciBhcmd1bWVudFxuICBjb25zdCBwdWxsUHJvbWlzZSA9IGNvbnRyb2xsZXIuX3B1bGxBbGdvcml0aG0oKTtcbiAgdXBvblByb21pc2UoXG4gICAgcHVsbFByb21pc2UsXG4gICAgKCkgPT4ge1xuICAgICAgY29udHJvbGxlci5fcHVsbGluZyA9IGZhbHNlO1xuXG4gICAgICBpZiAoY29udHJvbGxlci5fcHVsbEFnYWluKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX3B1bGxBZ2FpbiA9IGZhbHNlO1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGUgPT4ge1xuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGUpO1xuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyUGVuZGluZ1B1bGxJbnRvcyhjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKSB7XG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJJbnZhbGlkYXRlQllPQlJlcXVlc3QoY29udHJvbGxlcik7XG4gIGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MgPSBuZXcgU2ltcGxlUXVldWUoKTtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbW1pdFB1bGxJbnRvRGVzY3JpcHRvcjxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3PihcbiAgc3RyZWFtOiBSZWFkYWJsZUJ5dGVTdHJlYW0sXG4gIHB1bGxJbnRvRGVzY3JpcHRvcjogUHVsbEludG9EZXNjcmlwdG9yPFQ+XG4pIHtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgIT09ICdlcnJvcmVkJyk7XG5cbiAgbGV0IGRvbmUgPSBmYWxzZTtcbiAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgYXNzZXJ0KHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCA9PT0gMCk7XG4gICAgZG9uZSA9IHRydWU7XG4gIH1cblxuICBjb25zdCBmaWxsZWRWaWV3ID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbnZlcnRQdWxsSW50b0Rlc2NyaXB0b3I8VD4ocHVsbEludG9EZXNjcmlwdG9yKTtcbiAgaWYgKHB1bGxJbnRvRGVzY3JpcHRvci5yZWFkZXJUeXBlID09PSAnZGVmYXVsdCcpIHtcbiAgICBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkUmVxdWVzdChzdHJlYW0sIGZpbGxlZFZpZXcgYXMgdW5rbm93biBhcyBVaW50OEFycmF5LCBkb25lKTtcbiAgfSBlbHNlIHtcbiAgICBhc3NlcnQocHVsbEludG9EZXNjcmlwdG9yLnJlYWRlclR5cGUgPT09ICdieW9iJyk7XG4gICAgUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZEludG9SZXF1ZXN0KHN0cmVhbSwgZmlsbGVkVmlldywgZG9uZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbnZlcnRQdWxsSW50b0Rlc2NyaXB0b3I8VCBleHRlbmRzIEFycmF5QnVmZmVyVmlldz4oXG4gIHB1bGxJbnRvRGVzY3JpcHRvcjogUHVsbEludG9EZXNjcmlwdG9yPFQ+XG4pOiBUIHtcbiAgY29uc3QgYnl0ZXNGaWxsZWQgPSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQ7XG4gIGNvbnN0IGVsZW1lbnRTaXplID0gcHVsbEludG9EZXNjcmlwdG9yLmVsZW1lbnRTaXplO1xuXG4gIGFzc2VydChieXRlc0ZpbGxlZCA8PSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZUxlbmd0aCk7XG4gIGFzc2VydChieXRlc0ZpbGxlZCAlIGVsZW1lbnRTaXplID09PSAwKTtcblxuICByZXR1cm4gbmV3IHB1bGxJbnRvRGVzY3JpcHRvci52aWV3Q29uc3RydWN0b3IoXG4gICAgcHVsbEludG9EZXNjcmlwdG9yLmJ1ZmZlciwgcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVPZmZzZXQsIGJ5dGVzRmlsbGVkIC8gZWxlbWVudFNpemUpIGFzIFQ7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlQ2h1bmtUb1F1ZXVlKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXI6IEFycmF5QnVmZmVyTGlrZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IG51bWJlcikge1xuICBjb250cm9sbGVyLl9xdWV1ZS5wdXNoKHsgYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoIH0pO1xuICBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSArPSBieXRlTGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRmlsbFB1bGxJbnRvRGVzY3JpcHRvckZyb21RdWV1ZShjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVsbEludG9EZXNjcmlwdG9yOiBQdWxsSW50b0Rlc2NyaXB0b3IpIHtcbiAgY29uc3QgZWxlbWVudFNpemUgPSBwdWxsSW50b0Rlc2NyaXB0b3IuZWxlbWVudFNpemU7XG5cbiAgY29uc3QgY3VycmVudEFsaWduZWRCeXRlcyA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAtIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAlIGVsZW1lbnRTaXplO1xuXG4gIGNvbnN0IG1heEJ5dGVzVG9Db3B5ID0gTWF0aC5taW4oY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVMZW5ndGggLSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQpO1xuICBjb25zdCBtYXhCeXRlc0ZpbGxlZCA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCArIG1heEJ5dGVzVG9Db3B5O1xuICBjb25zdCBtYXhBbGlnbmVkQnl0ZXMgPSBtYXhCeXRlc0ZpbGxlZCAtIG1heEJ5dGVzRmlsbGVkICUgZWxlbWVudFNpemU7XG5cbiAgbGV0IHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcgPSBtYXhCeXRlc1RvQ29weTtcbiAgbGV0IHJlYWR5ID0gZmFsc2U7XG4gIGlmIChtYXhBbGlnbmVkQnl0ZXMgPiBjdXJyZW50QWxpZ25lZEJ5dGVzKSB7XG4gICAgdG90YWxCeXRlc1RvQ29weVJlbWFpbmluZyA9IG1heEFsaWduZWRCeXRlcyAtIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZDtcbiAgICByZWFkeSA9IHRydWU7XG4gIH1cblxuICBjb25zdCBxdWV1ZSA9IGNvbnRyb2xsZXIuX3F1ZXVlO1xuXG4gIHdoaWxlICh0b3RhbEJ5dGVzVG9Db3B5UmVtYWluaW5nID4gMCkge1xuICAgIGNvbnN0IGhlYWRPZlF1ZXVlID0gcXVldWUucGVlaygpO1xuXG4gICAgY29uc3QgYnl0ZXNUb0NvcHkgPSBNYXRoLm1pbih0b3RhbEJ5dGVzVG9Db3B5UmVtYWluaW5nLCBoZWFkT2ZRdWV1ZS5ieXRlTGVuZ3RoKTtcblxuICAgIGNvbnN0IGRlc3RTdGFydCA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlT2Zmc2V0ICsgcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkO1xuICAgIENvcHlEYXRhQmxvY2tCeXRlcyhwdWxsSW50b0Rlc2NyaXB0b3IuYnVmZmVyLCBkZXN0U3RhcnQsIGhlYWRPZlF1ZXVlLmJ1ZmZlciwgaGVhZE9mUXVldWUuYnl0ZU9mZnNldCwgYnl0ZXNUb0NvcHkpO1xuXG4gICAgaWYgKGhlYWRPZlF1ZXVlLmJ5dGVMZW5ndGggPT09IGJ5dGVzVG9Db3B5KSB7XG4gICAgICBxdWV1ZS5zaGlmdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkT2ZRdWV1ZS5ieXRlT2Zmc2V0ICs9IGJ5dGVzVG9Db3B5O1xuICAgICAgaGVhZE9mUXVldWUuYnl0ZUxlbmd0aCAtPSBieXRlc1RvQ29weTtcbiAgICB9XG4gICAgY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgLT0gYnl0ZXNUb0NvcHk7XG5cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRmlsbEhlYWRQdWxsSW50b0Rlc2NyaXB0b3IoY29udHJvbGxlciwgYnl0ZXNUb0NvcHksIHB1bGxJbnRvRGVzY3JpcHRvcik7XG5cbiAgICB0b3RhbEJ5dGVzVG9Db3B5UmVtYWluaW5nIC09IGJ5dGVzVG9Db3B5O1xuICB9XG5cbiAgaWYgKCFyZWFkeSkge1xuICAgIGFzc2VydChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9PT0gMCk7XG4gICAgYXNzZXJ0KHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCA+IDApO1xuICAgIGFzc2VydChwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgPCBwdWxsSW50b0Rlc2NyaXB0b3IuZWxlbWVudFNpemUpO1xuICB9XG5cbiAgcmV0dXJuIHJlYWR5O1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRmlsbEhlYWRQdWxsSW50b0Rlc2NyaXB0b3IoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVsbEludG9EZXNjcmlwdG9yOiBQdWxsSW50b0Rlc2NyaXB0b3IpIHtcbiAgYXNzZXJ0KGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID09PSAwIHx8IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpID09PSBwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICBhc3NlcnQoY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPT09IG51bGwpO1xuICBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgKz0gc2l6ZTtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckhhbmRsZVF1ZXVlRHJhaW4oY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcikge1xuICBhc3NlcnQoY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScpO1xuXG4gIGlmIChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9PT0gMCAmJiBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCkge1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gICAgUmVhZGFibGVTdHJlYW1DbG9zZShjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtKTtcbiAgfSBlbHNlIHtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVySW52YWxpZGF0ZUJZT0JSZXF1ZXN0KGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIpIHtcbiAgaWYgKGNvbnRyb2xsZXIuX2J5b2JSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QuX2Fzc29jaWF0ZWRSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyID0gdW5kZWZpbmVkITtcbiAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QuX3ZpZXcgPSBudWxsITtcbiAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUHJvY2Vzc1B1bGxJbnRvRGVzY3JpcHRvcnNVc2luZ1F1ZXVlKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIpIHtcbiAgYXNzZXJ0KCFjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCk7XG5cbiAgd2hpbGUgKGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgIGlmIChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHB1bGxJbnRvRGVzY3JpcHRvciA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuXG4gICAgaWYgKFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsUHVsbEludG9EZXNjcmlwdG9yRnJvbVF1ZXVlKGNvbnRyb2xsZXIsIHB1bGxJbnRvRGVzY3JpcHRvcikpIHtcbiAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaGlmdFBlbmRpbmdQdWxsSW50byhjb250cm9sbGVyKTtcblxuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbW1pdFB1bGxJbnRvRGVzY3JpcHRvcihcbiAgICAgICAgY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgICAgICAgcHVsbEludG9EZXNjcmlwdG9yXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclB1bGxJbnRvPFQgZXh0ZW5kcyBBcnJheUJ1ZmZlclZpZXc+KFxuICBjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICB2aWV3OiBULFxuICByZWFkSW50b1JlcXVlc3Q6IFJlYWRJbnRvUmVxdWVzdDxUPlxuKTogdm9pZCB7XG4gIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW07XG5cbiAgbGV0IGVsZW1lbnRTaXplID0gMTtcbiAgaWYgKHZpZXcuY29uc3RydWN0b3IgIT09IERhdGFWaWV3KSB7XG4gICAgZWxlbWVudFNpemUgPSAodmlldy5jb25zdHJ1Y3RvciBhcyBBcnJheUJ1ZmZlclZpZXdDb25zdHJ1Y3RvcjxUPikuQllURVNfUEVSX0VMRU1FTlQ7XG4gIH1cblxuICBjb25zdCBjdG9yID0gdmlldy5jb25zdHJ1Y3RvciBhcyBBcnJheUJ1ZmZlclZpZXdDb25zdHJ1Y3RvcjxUPjtcblxuICAvLyB0cnkge1xuICBjb25zdCBidWZmZXIgPSBUcmFuc2ZlckFycmF5QnVmZmVyKHZpZXcuYnVmZmVyKTtcbiAgLy8gfSBjYXRjaCAoZSkge1xuICAvLyAgIHJlYWRJbnRvUmVxdWVzdC5fZXJyb3JTdGVwcyhlKTtcbiAgLy8gICByZXR1cm47XG4gIC8vIH1cblxuICBjb25zdCBwdWxsSW50b0Rlc2NyaXB0b3I6IEJZT0JQdWxsSW50b0Rlc2NyaXB0b3I8VD4gPSB7XG4gICAgYnVmZmVyLFxuICAgIGJ1ZmZlckJ5dGVMZW5ndGg6IGJ1ZmZlci5ieXRlTGVuZ3RoLFxuICAgIGJ5dGVPZmZzZXQ6IHZpZXcuYnl0ZU9mZnNldCxcbiAgICBieXRlTGVuZ3RoOiB2aWV3LmJ5dGVMZW5ndGgsXG4gICAgYnl0ZXNGaWxsZWQ6IDAsXG4gICAgZWxlbWVudFNpemUsXG4gICAgdmlld0NvbnN0cnVjdG9yOiBjdG9yLFxuICAgIHJlYWRlclR5cGU6ICdieW9iJ1xuICB9O1xuXG4gIGlmIChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnB1c2gocHVsbEludG9EZXNjcmlwdG9yKTtcblxuICAgIC8vIE5vIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKCkgY2FsbCBzaW5jZTpcbiAgICAvLyAtIE5vIGNoYW5nZSBoYXBwZW5zIG9uIGRlc2lyZWRTaXplXG4gICAgLy8gLSBUaGUgc291cmNlIGhhcyBhbHJlYWR5IGJlZW4gbm90aWZpZWQgb2YgdGhhdCB0aGVyZSdzIGF0IGxlYXN0IDEgcGVuZGluZyByZWFkKHZpZXcpXG5cbiAgICBSZWFkYWJsZVN0cmVhbUFkZFJlYWRJbnRvUmVxdWVzdChzdHJlYW0sIHJlYWRJbnRvUmVxdWVzdCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgY29uc3QgZW1wdHlWaWV3ID0gbmV3IGN0b3IocHVsbEludG9EZXNjcmlwdG9yLmJ1ZmZlciwgcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVPZmZzZXQsIDApO1xuICAgIHJlYWRJbnRvUmVxdWVzdC5fY2xvc2VTdGVwcyhlbXB0eVZpZXcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA+IDApIHtcbiAgICBpZiAoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZpbGxQdWxsSW50b0Rlc2NyaXB0b3JGcm9tUXVldWUoY29udHJvbGxlciwgcHVsbEludG9EZXNjcmlwdG9yKSkge1xuICAgICAgY29uc3QgZmlsbGVkVmlldyA9IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDb252ZXJ0UHVsbEludG9EZXNjcmlwdG9yPFQ+KHB1bGxJbnRvRGVzY3JpcHRvcik7XG5cbiAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJIYW5kbGVRdWV1ZURyYWluKGNvbnRyb2xsZXIpO1xuXG4gICAgICByZWFkSW50b1JlcXVlc3QuX2NodW5rU3RlcHMoZmlsbGVkVmlldyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkKSB7XG4gICAgICBjb25zdCBlID0gbmV3IFR5cGVFcnJvcignSW5zdWZmaWNpZW50IGJ5dGVzIHRvIGZpbGwgZWxlbWVudHMgaW4gdGhlIGdpdmVuIGJ1ZmZlcicpO1xuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGUpO1xuXG4gICAgICByZWFkSW50b1JlcXVlc3QuX2Vycm9yU3RlcHMoZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wdXNoKHB1bGxJbnRvRGVzY3JpcHRvcik7XG5cbiAgUmVhZGFibGVTdHJlYW1BZGRSZWFkSW50b1JlcXVlc3Q8VD4oc3RyZWFtLCByZWFkSW50b1JlcXVlc3QpO1xuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJbkNsb3NlZFN0YXRlKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REZXNjcmlwdG9yOiBQdWxsSW50b0Rlc2NyaXB0b3IpIHtcbiAgYXNzZXJ0KGZpcnN0RGVzY3JpcHRvci5ieXRlc0ZpbGxlZCA9PT0gMCk7XG5cbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcbiAgaWYgKFJlYWRhYmxlU3RyZWFtSGFzQllPQlJlYWRlcihzdHJlYW0pKSB7XG4gICAgd2hpbGUgKFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZEludG9SZXF1ZXN0cyhzdHJlYW0pID4gMCkge1xuICAgICAgY29uc3QgcHVsbEludG9EZXNjcmlwdG9yID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNoaWZ0UGVuZGluZ1B1bGxJbnRvKGNvbnRyb2xsZXIpO1xuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbW1pdFB1bGxJbnRvRGVzY3JpcHRvcihzdHJlYW0sIHB1bGxJbnRvRGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW5SZWFkYWJsZVN0YXRlKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlc1dyaXR0ZW46IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1bGxJbnRvRGVzY3JpcHRvcjogUHVsbEludG9EZXNjcmlwdG9yKSB7XG4gIGFzc2VydChwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgKyBieXRlc1dyaXR0ZW4gPD0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVMZW5ndGgpO1xuXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsSGVhZFB1bGxJbnRvRGVzY3JpcHRvcihjb250cm9sbGVyLCBieXRlc1dyaXR0ZW4sIHB1bGxJbnRvRGVzY3JpcHRvcik7XG5cbiAgaWYgKHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCA8IHB1bGxJbnRvRGVzY3JpcHRvci5lbGVtZW50U2l6ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaGlmdFBlbmRpbmdQdWxsSW50byhjb250cm9sbGVyKTtcblxuICBjb25zdCByZW1haW5kZXJTaXplID0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkICUgcHVsbEludG9EZXNjcmlwdG9yLmVsZW1lbnRTaXplO1xuICBpZiAocmVtYWluZGVyU2l6ZSA+IDApIHtcbiAgICBjb25zdCBlbmQgPSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZU9mZnNldCArIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZDtcbiAgICBjb25zdCByZW1haW5kZXIgPSBBcnJheUJ1ZmZlclNsaWNlKHB1bGxJbnRvRGVzY3JpcHRvci5idWZmZXIsIGVuZCAtIHJlbWFpbmRlclNpemUsIGVuZCk7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlciwgcmVtYWluZGVyLCAwLCByZW1haW5kZXIuYnl0ZUxlbmd0aCk7XG4gIH1cblxuICBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgLT0gcmVtYWluZGVyU2l6ZTtcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbW1pdFB1bGxJbnRvRGVzY3JpcHRvcihjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLCBwdWxsSW50b0Rlc2NyaXB0b3IpO1xuXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJQcm9jZXNzUHVsbEludG9EZXNjcmlwdG9yc1VzaW5nUXVldWUoY29udHJvbGxlcik7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW50ZXJuYWwoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciwgYnl0ZXNXcml0dGVuOiBudW1iZXIpIHtcbiAgY29uc3QgZmlyc3REZXNjcmlwdG9yID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCk7XG4gIGFzc2VydChDYW5UcmFuc2ZlckFycmF5QnVmZmVyKGZpcnN0RGVzY3JpcHRvci5idWZmZXIpKTtcblxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVySW52YWxpZGF0ZUJZT0JSZXF1ZXN0KGNvbnRyb2xsZXIpO1xuXG4gIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG4gIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICBhc3NlcnQoYnl0ZXNXcml0dGVuID09PSAwKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZEluQ2xvc2VkU3RhdGUoY29udHJvbGxlciwgZmlyc3REZXNjcmlwdG9yKTtcbiAgfSBlbHNlIHtcbiAgICBhc3NlcnQoc3RhdGUgPT09ICdyZWFkYWJsZScpO1xuICAgIGFzc2VydChieXRlc1dyaXR0ZW4gPiAwKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZEluUmVhZGFibGVTdGF0ZShjb250cm9sbGVyLCBieXRlc1dyaXR0ZW4sIGZpcnN0RGVzY3JpcHRvcik7XG4gIH1cblxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNoaWZ0UGVuZGluZ1B1bGxJbnRvKFxuICBjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyXG4pOiBQdWxsSW50b0Rlc2NyaXB0b3Ige1xuICBhc3NlcnQoY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPT09IG51bGwpO1xuICBjb25zdCBkZXNjcmlwdG9yID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5zaGlmdCgpITtcbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaG91bGRDYWxsUHVsbChjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKTogYm9vbGVhbiB7XG4gIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW07XG5cbiAgaWYgKHN0cmVhbS5fc3RhdGUgIT09ICdyZWFkYWJsZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIWNvbnRyb2xsZXIuX3N0YXJ0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoUmVhZGFibGVTdHJlYW1IYXNEZWZhdWx0UmVhZGVyKHN0cmVhbSkgJiYgUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkUmVxdWVzdHMoc3RyZWFtKSA+IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChSZWFkYWJsZVN0cmVhbUhhc0JZT0JSZWFkZXIoc3RyZWFtKSAmJiBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRJbnRvUmVxdWVzdHMoc3RyZWFtKSA+IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IGRlc2lyZWRTaXplID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXIpO1xuICBhc3NlcnQoZGVzaXJlZFNpemUgIT09IG51bGwpO1xuICBpZiAoZGVzaXJlZFNpemUhID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIpIHtcbiAgY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSA9IHVuZGVmaW5lZCE7XG4gIGNvbnRyb2xsZXIuX2NhbmNlbEFsZ29yaXRobSA9IHVuZGVmaW5lZCE7XG59XG5cbi8vIEEgY2xpZW50IG9mIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgbWF5IHVzZSB0aGVzZSBmdW5jdGlvbnMgZGlyZWN0bHkgdG8gYnlwYXNzIHN0YXRlIGNoZWNrLlxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIpIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcblxuICBpZiAoY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQgfHwgc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA+IDApIHtcbiAgICBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCA9IHRydWU7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZmlyc3RQZW5kaW5nUHVsbEludG8gPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgICBpZiAoZmlyc3RQZW5kaW5nUHVsbEludG8uYnl0ZXNGaWxsZWQgPiAwKSB7XG4gICAgICBjb25zdCBlID0gbmV3IFR5cGVFcnJvcignSW5zdWZmaWNpZW50IGJ5dGVzIHRvIGZpbGwgZWxlbWVudHMgaW4gdGhlIGdpdmVuIGJ1ZmZlcicpO1xuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGUpO1xuXG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gIFJlYWRhYmxlU3RyZWFtQ2xvc2Uoc3RyZWFtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsIGNodW5rOiBBcnJheUJ1ZmZlclZpZXcpIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcblxuICBpZiAoY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQgfHwgc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGJ1ZmZlciA9IGNodW5rLmJ1ZmZlcjtcbiAgY29uc3QgYnl0ZU9mZnNldCA9IGNodW5rLmJ5dGVPZmZzZXQ7XG4gIGNvbnN0IGJ5dGVMZW5ndGggPSBjaHVuay5ieXRlTGVuZ3RoO1xuICBpZiAoSXNEZXRhY2hlZEJ1ZmZlcihidWZmZXIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2h1bmtcXCdzIGJ1ZmZlciBpcyBkZXRhY2hlZCBhbmQgc28gY2Fubm90IGJlIGVucXVldWVkJyk7XG4gIH1cbiAgY29uc3QgdHJhbnNmZXJyZWRCdWZmZXIgPSBUcmFuc2ZlckFycmF5QnVmZmVyKGJ1ZmZlcik7XG5cbiAgaWYgKGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGZpcnN0UGVuZGluZ1B1bGxJbnRvID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCk7XG4gICAgaWYgKElzRGV0YWNoZWRCdWZmZXIoZmlyc3RQZW5kaW5nUHVsbEludG8uYnVmZmVyKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ1RoZSBCWU9CIHJlcXVlc3RcXCdzIGJ1ZmZlciBoYXMgYmVlbiBkZXRhY2hlZCBhbmQgc28gY2Fubm90IGJlIGZpbGxlZCB3aXRoIGFuIGVucXVldWVkIGNodW5rJ1xuICAgICAgKTtcbiAgICB9XG4gICAgZmlyc3RQZW5kaW5nUHVsbEludG8uYnVmZmVyID0gVHJhbnNmZXJBcnJheUJ1ZmZlcihmaXJzdFBlbmRpbmdQdWxsSW50by5idWZmZXIpO1xuICB9XG5cbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckludmFsaWRhdGVCWU9CUmVxdWVzdChjb250cm9sbGVyKTtcblxuICBpZiAoUmVhZGFibGVTdHJlYW1IYXNEZWZhdWx0UmVhZGVyKHN0cmVhbSkpIHtcbiAgICBpZiAoUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkUmVxdWVzdHMoc3RyZWFtKSA9PT0gMCkge1xuICAgICAgYXNzZXJ0KGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID09PSAwKTtcbiAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlQ2h1bmtUb1F1ZXVlKGNvbnRyb2xsZXIsIHRyYW5zZmVycmVkQnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzZXJ0KGNvbnRyb2xsZXIuX3F1ZXVlLmxlbmd0aCA9PT0gMCk7XG4gICAgICBpZiAoY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFzc2VydChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKS5yZWFkZXJUeXBlID09PSAnZGVmYXVsdCcpO1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyU2hpZnRQZW5kaW5nUHVsbEludG8oY29udHJvbGxlcik7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmFuc2ZlcnJlZFZpZXcgPSBuZXcgVWludDhBcnJheSh0cmFuc2ZlcnJlZEJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgICBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkUmVxdWVzdChzdHJlYW0sIHRyYW5zZmVycmVkVmlldywgZmFsc2UpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFkYWJsZVN0cmVhbUhhc0JZT0JSZWFkZXIoc3RyZWFtKSkge1xuICAgIC8vIFRPRE86IElkZWFsbHkgaW4gdGhpcyBicmFuY2ggZGV0YWNoaW5nIHNob3VsZCBoYXBwZW4gb25seSBpZiB0aGUgYnVmZmVyIGlzIG5vdCBjb25zdW1lZCBmdWxseS5cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZUNodW5rVG9RdWV1ZShjb250cm9sbGVyLCB0cmFuc2ZlcnJlZEJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclByb2Nlc3NQdWxsSW50b0Rlc2NyaXB0b3JzVXNpbmdRdWV1ZShjb250cm9sbGVyKTtcbiAgfSBlbHNlIHtcbiAgICBhc3NlcnQoIUlzUmVhZGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSk7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlciwgdHJhbnNmZXJyZWRCdWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICB9XG5cbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciwgZTogYW55KSB7XG4gIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW07XG5cbiAgaWYgKHN0cmVhbS5fc3RhdGUgIT09ICdyZWFkYWJsZScpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJQZW5kaW5nUHVsbEludG9zKGNvbnRyb2xsZXIpO1xuXG4gIFJlc2V0UXVldWUoY29udHJvbGxlcik7XG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gIFJlYWRhYmxlU3RyZWFtRXJyb3Ioc3RyZWFtLCBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXRCWU9CUmVxdWVzdChcbiAgY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclxuKTogUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCB8IG51bGwge1xuICBpZiAoY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPT09IG51bGwgJiYgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZmlyc3REZXNjcmlwdG9yID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCk7XG4gICAgY29uc3QgdmlldyA9IG5ldyBVaW50OEFycmF5KGZpcnN0RGVzY3JpcHRvci5idWZmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGVzY3JpcHRvci5ieXRlT2Zmc2V0ICsgZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERlc2NyaXB0b3IuYnl0ZUxlbmd0aCAtIGZpcnN0RGVzY3JpcHRvci5ieXRlc0ZpbGxlZCk7XG5cbiAgICBjb25zdCBieW9iUmVxdWVzdDogUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdC5wcm90b3R5cGUpO1xuICAgIFNldFVwUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdChieW9iUmVxdWVzdCwgY29udHJvbGxlciwgdmlldyk7XG4gICAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPSBieW9iUmVxdWVzdDtcbiAgfVxuICByZXR1cm4gY29udHJvbGxlci5fYnlvYlJlcXVlc3Q7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZShjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKTogbnVtYmVyIHwgbnVsbCB7XG4gIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG5cbiAgaWYgKHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gY29udHJvbGxlci5fc3RyYXRlZ3lIV00gLSBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbjogbnVtYmVyKSB7XG4gIGFzc2VydChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IGZpcnN0RGVzY3JpcHRvciA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0uX3N0YXRlO1xuXG4gIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICBpZiAoYnl0ZXNXcml0dGVuICE9PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdieXRlc1dyaXR0ZW4gbXVzdCBiZSAwIHdoZW4gY2FsbGluZyByZXNwb25kKCkgb24gYSBjbG9zZWQgc3RyZWFtJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFzc2VydChzdGF0ZSA9PT0gJ3JlYWRhYmxlJyk7XG4gICAgaWYgKGJ5dGVzV3JpdHRlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYnl0ZXNXcml0dGVuIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAgd2hlbiBjYWxsaW5nIHJlc3BvbmQoKSBvbiBhIHJlYWRhYmxlIHN0cmVhbScpO1xuICAgIH1cbiAgICBpZiAoZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkICsgYnl0ZXNXcml0dGVuID4gZmlyc3REZXNjcmlwdG9yLmJ5dGVMZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdieXRlc1dyaXR0ZW4gb3V0IG9mIHJhbmdlJyk7XG4gICAgfVxuICB9XG5cbiAgZmlyc3REZXNjcmlwdG9yLmJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIoZmlyc3REZXNjcmlwdG9yLmJ1ZmZlcik7XG5cbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJbnRlcm5hbChjb250cm9sbGVyLCBieXRlc1dyaXR0ZW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRXaXRoTmV3Vmlldyhjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogQXJyYXlCdWZmZXJWaWV3KSB7XG4gIGFzc2VydChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApO1xuICBhc3NlcnQoIUlzRGV0YWNoZWRCdWZmZXIodmlldy5idWZmZXIpKTtcblxuICBjb25zdCBmaXJzdERlc2NyaXB0b3IgPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgY29uc3Qgc3RhdGUgPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLl9zdGF0ZTtcblxuICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgaWYgKHZpZXcuYnl0ZUxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZpZXdcXCdzIGxlbmd0aCBtdXN0IGJlIDAgd2hlbiBjYWxsaW5nIHJlc3BvbmRXaXRoTmV3VmlldygpIG9uIGEgY2xvc2VkIHN0cmVhbScpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhc3NlcnQoc3RhdGUgPT09ICdyZWFkYWJsZScpO1xuICAgIGlmICh2aWV3LmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdUaGUgdmlld1xcJ3MgbGVuZ3RoIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAgd2hlbiBjYWxsaW5nIHJlc3BvbmRXaXRoTmV3VmlldygpIG9uIGEgcmVhZGFibGUgc3RyZWFtJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZmlyc3REZXNjcmlwdG9yLmJ5dGVPZmZzZXQgKyBmaXJzdERlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgIT09IHZpZXcuYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgcmVnaW9uIHNwZWNpZmllZCBieSB2aWV3IGRvZXMgbm90IG1hdGNoIGJ5b2JSZXF1ZXN0Jyk7XG4gIH1cbiAgaWYgKGZpcnN0RGVzY3JpcHRvci5idWZmZXJCeXRlTGVuZ3RoICE9PSB2aWV3LmJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBidWZmZXIgb2YgdmlldyBoYXMgZGlmZmVyZW50IGNhcGFjaXR5IHRoYW4gYnlvYlJlcXVlc3QnKTtcbiAgfVxuICBpZiAoZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkICsgdmlldy5ieXRlTGVuZ3RoID4gZmlyc3REZXNjcmlwdG9yLmJ5dGVMZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHJlZ2lvbiBzcGVjaWZpZWQgYnkgdmlldyBpcyBsYXJnZXIgdGhhbiBieW9iUmVxdWVzdCcpO1xuICB9XG5cbiAgY29uc3Qgdmlld0J5dGVMZW5ndGggPSB2aWV3LmJ5dGVMZW5ndGg7XG4gIGZpcnN0RGVzY3JpcHRvci5idWZmZXIgPSBUcmFuc2ZlckFycmF5QnVmZmVyKHZpZXcuYnVmZmVyKTtcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJbnRlcm5hbChjb250cm9sbGVyLCB2aWV3Qnl0ZUxlbmd0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXRVcFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIoc3RyZWFtOiBSZWFkYWJsZUJ5dGVTdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QWxnb3JpdGhtOiAoKSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1bGxBbGdvcml0aG06ICgpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEFsZ29yaXRobTogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoV2F0ZXJNYXJrOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9BbGxvY2F0ZUNodW5rU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gIGFzc2VydChzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciA9PT0gdW5kZWZpbmVkKTtcbiAgaWYgKGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYXNzZXJ0KE51bWJlcklzSW50ZWdlcihhdXRvQWxsb2NhdGVDaHVua1NpemUpKTtcbiAgICBhc3NlcnQoYXV0b0FsbG9jYXRlQ2h1bmtTaXplID4gMCk7XG4gIH1cblxuICBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtID0gc3RyZWFtO1xuXG4gIGNvbnRyb2xsZXIuX3B1bGxBZ2FpbiA9IGZhbHNlO1xuICBjb250cm9sbGVyLl9wdWxsaW5nID0gZmFsc2U7XG5cbiAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPSBudWxsO1xuXG4gIC8vIE5lZWQgdG8gc2V0IHRoZSBzbG90cyBzbyB0aGF0IHRoZSBhc3NlcnQgZG9lc24ndCBmaXJlLiBJbiB0aGUgc3BlYyB0aGUgc2xvdHMgYWxyZWFkeSBleGlzdCBpbXBsaWNpdGx5LlxuICBjb250cm9sbGVyLl9xdWV1ZSA9IGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID0gdW5kZWZpbmVkITtcbiAgUmVzZXRRdWV1ZShjb250cm9sbGVyKTtcblxuICBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCA9IGZhbHNlO1xuICBjb250cm9sbGVyLl9zdGFydGVkID0gZmFsc2U7XG5cbiAgY29udHJvbGxlci5fc3RyYXRlZ3lIV00gPSBoaWdoV2F0ZXJNYXJrO1xuXG4gIGNvbnRyb2xsZXIuX3B1bGxBbGdvcml0aG0gPSBwdWxsQWxnb3JpdGhtO1xuICBjb250cm9sbGVyLl9jYW5jZWxBbGdvcml0aG0gPSBjYW5jZWxBbGdvcml0aG07XG5cbiAgY29udHJvbGxlci5fYXV0b0FsbG9jYXRlQ2h1bmtTaXplID0gYXV0b0FsbG9jYXRlQ2h1bmtTaXplO1xuXG4gIGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MgPSBuZXcgU2ltcGxlUXVldWUoKTtcblxuICBzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG5cbiAgY29uc3Qgc3RhcnRSZXN1bHQgPSBzdGFydEFsZ29yaXRobSgpO1xuICB1cG9uUHJvbWlzZShcbiAgICBwcm9taXNlUmVzb2x2ZWRXaXRoKHN0YXJ0UmVzdWx0KSxcbiAgICAoKSA9PiB7XG4gICAgICBjb250cm9sbGVyLl9zdGFydGVkID0gdHJ1ZTtcblxuICAgICAgYXNzZXJ0KCFjb250cm9sbGVyLl9wdWxsaW5nKTtcbiAgICAgIGFzc2VydCghY29udHJvbGxlci5fcHVsbEFnYWluKTtcblxuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG4gICAgfSxcbiAgICByID0+IHtcbiAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCByKTtcbiAgICB9XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXRVcFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NvdXJjZShcbiAgc3RyZWFtOiBSZWFkYWJsZUJ5dGVTdHJlYW0sXG4gIHVuZGVybHlpbmdCeXRlU291cmNlOiBWYWxpZGF0ZWRVbmRlcmx5aW5nQnl0ZVNvdXJjZSxcbiAgaGlnaFdhdGVyTWFyazogbnVtYmVyXG4pIHtcbiAgY29uc3QgY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlci5wcm90b3R5cGUpO1xuXG4gIGxldCBzdGFydEFsZ29yaXRobTogKCkgPT4gdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+ID0gKCkgPT4gdW5kZWZpbmVkO1xuICBsZXQgcHVsbEFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPiA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgbGV0IGNhbmNlbEFsZ29yaXRobTogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+ID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuXG4gIGlmICh1bmRlcmx5aW5nQnl0ZVNvdXJjZS5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnRBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nQnl0ZVNvdXJjZS5zdGFydCEoY29udHJvbGxlcik7XG4gIH1cbiAgaWYgKHVuZGVybHlpbmdCeXRlU291cmNlLnB1bGwgIT09IHVuZGVmaW5lZCkge1xuICAgIHB1bGxBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nQnl0ZVNvdXJjZS5wdWxsIShjb250cm9sbGVyKTtcbiAgfVxuICBpZiAodW5kZXJseWluZ0J5dGVTb3VyY2UuY2FuY2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICBjYW5jZWxBbGdvcml0aG0gPSByZWFzb24gPT4gdW5kZXJseWluZ0J5dGVTb3VyY2UuY2FuY2VsIShyZWFzb24pO1xuICB9XG5cbiAgY29uc3QgYXV0b0FsbG9jYXRlQ2h1bmtTaXplID0gdW5kZXJseWluZ0J5dGVTb3VyY2UuYXV0b0FsbG9jYXRlQ2h1bmtTaXplO1xuICBpZiAoYXV0b0FsbG9jYXRlQ2h1bmtTaXplID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXV0b0FsbG9jYXRlQ2h1bmtTaXplIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAnKTtcbiAgfVxuXG4gIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihcbiAgICBzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIGF1dG9BbGxvY2F0ZUNodW5rU2l6ZVxuICApO1xufVxuXG5mdW5jdGlvbiBTZXRVcFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QocmVxdWVzdDogUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IEFycmF5QnVmZmVyVmlldykge1xuICBhc3NlcnQoSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKGNvbnRyb2xsZXIpKTtcbiAgYXNzZXJ0KHR5cGVvZiB2aWV3ID09PSAnb2JqZWN0Jyk7XG4gIGFzc2VydChBcnJheUJ1ZmZlci5pc1ZpZXcodmlldykpO1xuICBhc3NlcnQoIUlzRGV0YWNoZWRCdWZmZXIodmlldy5idWZmZXIpKTtcbiAgcmVxdWVzdC5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICByZXF1ZXN0Ll92aWV3ID0gdmlldztcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QuXG5cbmZ1bmN0aW9uIGJ5b2JSZXF1ZXN0QnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcbiAgICBgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdC5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdGApO1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlci5cblxuZnVuY3Rpb24gYnl0ZVN0cmVhbUNvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFxuICAgIGBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyYCk7XG59XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICcuLi8uLi9zdHViL2Fzc2VydCc7XG5pbXBvcnQgeyBTaW1wbGVRdWV1ZSB9IGZyb20gJy4uL3NpbXBsZS1xdWV1ZSc7XG5pbXBvcnQge1xuICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNDYW5jZWwsXG4gIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0luaXRpYWxpemUsXG4gIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UsXG4gIHJlYWRlckxvY2tFeGNlcHRpb25cbn0gZnJvbSAnLi9nZW5lcmljLXJlYWRlcic7XG5pbXBvcnQgeyBJc1JlYWRhYmxlU3RyZWFtTG9ja2VkLCBSZWFkYWJsZUJ5dGVTdHJlYW0sIFJlYWRhYmxlU3RyZWFtIH0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtJztcbmltcG9ydCB7XG4gIElzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclB1bGxJbnRvXG59IGZyb20gJy4vYnl0ZS1zdHJlYW0tY29udHJvbGxlcic7XG5pbXBvcnQgeyB0eXBlSXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHsgbmV3UHJvbWlzZSwgcHJvbWlzZVJlamVjdGVkV2l0aCB9IGZyb20gJy4uL2hlbHBlcnMvd2ViaWRsJztcbmltcG9ydCB7IGFzc2VydFJlcXVpcmVkQXJndW1lbnQgfSBmcm9tICcuLi92YWxpZGF0b3JzL2Jhc2ljJztcbmltcG9ydCB7IGFzc2VydFJlYWRhYmxlU3RyZWFtIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgSXNEZXRhY2hlZEJ1ZmZlciB9IGZyb20gJy4uL2Fic3RyYWN0LW9wcy9lY21hc2NyaXB0JztcblxuLyoqXG4gKiBBIHJlc3VsdCByZXR1cm5lZCBieSB7QGxpbmsgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnJlYWR9LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgUmVhZGFibGVTdHJlYW1CWU9CUmVhZFJlc3VsdDxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3PiA9IHtcbiAgZG9uZTogZmFsc2U7XG4gIHZhbHVlOiBUO1xufSB8IHtcbiAgZG9uZTogdHJ1ZTtcbiAgdmFsdWU6IFQgfCB1bmRlZmluZWQ7XG59O1xuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5cbmV4cG9ydCBmdW5jdGlvbiBBY3F1aXJlUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHN0cmVhbTogUmVhZGFibGVCeXRlU3RyZWFtKTogUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyIHtcbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIoc3RyZWFtKTtcbn1cblxuLy8gUmVhZGFibGVTdHJlYW0gQVBJIGV4cG9zZWQgZm9yIGNvbnRyb2xsZXJzLlxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1BZGRSZWFkSW50b1JlcXVlc3Q8VCBleHRlbmRzIEFycmF5QnVmZmVyVmlldz4oc3RyZWFtOiBSZWFkYWJsZUJ5dGVTdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZEludG9SZXF1ZXN0OiBSZWFkSW50b1JlcXVlc3Q8VD4pOiB2b2lkIHtcbiAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHN0cmVhbS5fcmVhZGVyKSk7XG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnIHx8IHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnKTtcblxuICAoc3RyZWFtLl9yZWFkZXIhIGFzIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcikuX3JlYWRJbnRvUmVxdWVzdHMucHVzaChyZWFkSW50b1JlcXVlc3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZEludG9SZXF1ZXN0KHN0cmVhbTogUmVhZGFibGVCeXRlU3RyZWFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHVuazogQXJyYXlCdWZmZXJWaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lOiBib29sZWFuKSB7XG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyIGFzIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcjtcblxuICBhc3NlcnQocmVhZGVyLl9yZWFkSW50b1JlcXVlc3RzLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IHJlYWRJbnRvUmVxdWVzdCA9IHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cy5zaGlmdCgpITtcbiAgaWYgKGRvbmUpIHtcbiAgICByZWFkSW50b1JlcXVlc3QuX2Nsb3NlU3RlcHMoY2h1bmspO1xuICB9IGVsc2Uge1xuICAgIHJlYWRJbnRvUmVxdWVzdC5fY2h1bmtTdGVwcyhjaHVuayk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZEludG9SZXF1ZXN0cyhzdHJlYW06IFJlYWRhYmxlQnl0ZVN0cmVhbSk6IG51bWJlciB7XG4gIHJldHVybiAoc3RyZWFtLl9yZWFkZXIgYXMgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKS5fcmVhZEludG9SZXF1ZXN0cy5sZW5ndGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUhhc0JZT0JSZWFkZXIoc3RyZWFtOiBSZWFkYWJsZUJ5dGVTdHJlYW0pOiBib29sZWFuIHtcbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLl9yZWFkZXI7XG5cbiAgaWYgKHJlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihyZWFkZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIFJlYWRlcnNcblxuZXhwb3J0IGludGVyZmFjZSBSZWFkSW50b1JlcXVlc3Q8VCBleHRlbmRzIEFycmF5QnVmZmVyVmlldz4ge1xuICBfY2h1bmtTdGVwcyhjaHVuazogVCk6IHZvaWQ7XG5cbiAgX2Nsb3NlU3RlcHMoY2h1bms6IFQgfCB1bmRlZmluZWQpOiB2b2lkO1xuXG4gIF9lcnJvclN0ZXBzKGU6IGFueSk6IHZvaWQ7XG59XG5cbi8qKlxuICogQSBCWU9CIHJlYWRlciB2ZW5kZWQgYnkgYSB7QGxpbmsgUmVhZGFibGVTdHJlYW19LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX293bmVyUmVhZGFibGVTdHJlYW0hOiBSZWFkYWJsZUJ5dGVTdHJlYW07XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlZFByb21pc2UhOiBQcm9taXNlPHVuZGVmaW5lZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlZFByb21pc2VfcmVzb2x2ZT86ICh2YWx1ZT86IHVuZGVmaW5lZCkgPT4gdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VkUHJvbWlzZV9yZWplY3Q/OiAocmVhc29uOiBhbnkpID0+IHZvaWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRJbnRvUmVxdWVzdHM6IFNpbXBsZVF1ZXVlPFJlYWRJbnRvUmVxdWVzdDxhbnk+PjtcblxuICBjb25zdHJ1Y3RvcihzdHJlYW06IFJlYWRhYmxlQnl0ZVN0cmVhbSkge1xuICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQoc3RyZWFtLCAxLCAnUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyJyk7XG4gICAgYXNzZXJ0UmVhZGFibGVTdHJlYW0oc3RyZWFtLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG5cbiAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUxvY2tlZChzdHJlYW0pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIHN0cmVhbSBoYXMgYWxyZWFkeSBiZWVuIGxvY2tlZCBmb3IgZXhjbHVzaXZlIHJlYWRpbmcgYnkgYW5vdGhlciByZWFkZXInKTtcbiAgICB9XG5cbiAgICBpZiAoIUlzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb25zdHJ1Y3QgYSBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIgZm9yIGEgc3RyZWFtIG5vdCBjb25zdHJ1Y3RlZCB3aXRoIGEgYnl0ZSAnICtcbiAgICAgICAgJ3NvdXJjZScpO1xuICAgIH1cblxuICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0luaXRpYWxpemUodGhpcywgc3RyZWFtKTtcblxuICAgIHRoaXMuX3JlYWRJbnRvUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgZnVsZmlsbGVkIHdoZW4gdGhlIHN0cmVhbSBiZWNvbWVzIGNsb3NlZCwgb3IgcmVqZWN0ZWQgaWYgdGhlIHN0cmVhbSBldmVyIGVycm9ycyBvclxuICAgKiB0aGUgcmVhZGVyJ3MgbG9jayBpcyByZWxlYXNlZCBiZWZvcmUgdGhlIHN0cmVhbSBmaW5pc2hlcyBjbG9zaW5nLlxuICAgKi9cbiAgZ2V0IGNsb3NlZCgpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGJ5b2JSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjbG9zZWQnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2Nsb3NlZFByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHJlYWRlciBpcyBhY3RpdmUsIGJlaGF2ZXMgdGhlIHNhbWUgYXMge0BsaW5rIFJlYWRhYmxlU3RyZWFtLmNhbmNlbCB8IHN0cmVhbS5jYW5jZWwocmVhc29uKX0uXG4gICAqL1xuICBjYW5jZWwocmVhc29uOiBhbnkgPSB1bmRlZmluZWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChieW9iUmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2FuY2VsJykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ2NhbmNlbCcpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsKHRoaXMsIHJlYXNvbik7XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gcmVhZHMgYnl0ZXMgaW50byB2aWV3LCBhbmQgcmV0dXJucyBhIHByb21pc2UgcmVzb2x2ZWQgd2l0aCB0aGUgcmVzdWx0LlxuICAgKlxuICAgKiBJZiByZWFkaW5nIGEgY2h1bmsgY2F1c2VzIHRoZSBxdWV1ZSB0byBiZWNvbWUgZW1wdHksIG1vcmUgZGF0YSB3aWxsIGJlIHB1bGxlZCBmcm9tIHRoZSB1bmRlcmx5aW5nIHNvdXJjZS5cbiAgICovXG4gIHJlYWQ8VCBleHRlbmRzIEFycmF5QnVmZmVyVmlldz4odmlldzogVCk6IFByb21pc2U8UmVhZGFibGVTdHJlYW1CWU9CUmVhZFJlc3VsdDxUPj4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGJ5b2JSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdyZWFkJykpO1xuICAgIH1cblxuICAgIGlmICghQXJyYXlCdWZmZXIuaXNWaWV3KHZpZXcpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCd2aWV3IG11c3QgYmUgYW4gYXJyYXkgYnVmZmVyIHZpZXcnKSk7XG4gICAgfVxuICAgIGlmICh2aWV3LmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ3ZpZXcgbXVzdCBoYXZlIG5vbi16ZXJvIGJ5dGVMZW5ndGgnKSk7XG4gICAgfVxuICAgIGlmICh2aWV3LmJ1ZmZlci5ieXRlTGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKGB2aWV3J3MgYnVmZmVyIG11c3QgaGF2ZSBub24temVybyBieXRlTGVuZ3RoYCkpO1xuICAgIH1cbiAgICBpZiAoSXNEZXRhY2hlZEJ1ZmZlcih2aWV3LmJ1ZmZlcikpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ3ZpZXdcXCdzIGJ1ZmZlciBoYXMgYmVlbiBkZXRhY2hlZCcpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3duZXJSZWFkYWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChyZWFkZXJMb2NrRXhjZXB0aW9uKCdyZWFkIGZyb20nKSk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlITogKHJlc3VsdDogUmVhZGFibGVTdHJlYW1CWU9CUmVhZFJlc3VsdDxUPikgPT4gdm9pZDtcbiAgICBsZXQgcmVqZWN0UHJvbWlzZSE6IChyZWFzb246IGFueSkgPT4gdm9pZDtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZTxSZWFkYWJsZVN0cmVhbUJZT0JSZWFkUmVzdWx0PFQ+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICByZWplY3RQcm9taXNlID0gcmVqZWN0O1xuICAgIH0pO1xuICAgIGNvbnN0IHJlYWRJbnRvUmVxdWVzdDogUmVhZEludG9SZXF1ZXN0PFQ+ID0ge1xuICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IGNodW5rLCBkb25lOiBmYWxzZSB9KSxcbiAgICAgIF9jbG9zZVN0ZXBzOiBjaHVuayA9PiByZXNvbHZlUHJvbWlzZSh7IHZhbHVlOiBjaHVuaywgZG9uZTogdHJ1ZSB9KSxcbiAgICAgIF9lcnJvclN0ZXBzOiBlID0+IHJlamVjdFByb21pc2UoZSlcbiAgICB9O1xuICAgIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlclJlYWQodGhpcywgdmlldywgcmVhZEludG9SZXF1ZXN0KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgcmVhZGVyJ3MgbG9jayBvbiB0aGUgY29ycmVzcG9uZGluZyBzdHJlYW0uIEFmdGVyIHRoZSBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgcmVhZGVyIGlzIG5vIGxvbmdlciBhY3RpdmUuXG4gICAqIElmIHRoZSBhc3NvY2lhdGVkIHN0cmVhbSBpcyBlcnJvcmVkIHdoZW4gdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZWFkZXIgd2lsbCBhcHBlYXIgZXJyb3JlZCBpbiB0aGUgc2FtZSB3YXlcbiAgICogZnJvbSBub3cgb247IG90aGVyd2lzZSwgdGhlIHJlYWRlciB3aWxsIGFwcGVhciBjbG9zZWQuXG4gICAqXG4gICAqIEEgcmVhZGVyJ3MgbG9jayBjYW5ub3QgYmUgcmVsZWFzZWQgd2hpbGUgaXQgc3RpbGwgaGFzIGEgcGVuZGluZyByZWFkIHJlcXVlc3QsIGkuZS4sIGlmIGEgcHJvbWlzZSByZXR1cm5lZCBieVxuICAgKiB0aGUgcmVhZGVyJ3Mge0BsaW5rIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlci5yZWFkIHwgcmVhZCgpfSBtZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBzZXR0bGVkLiBBdHRlbXB0aW5nIHRvXG4gICAqIGRvIHNvIHdpbGwgdGhyb3cgYSBgVHlwZUVycm9yYCBhbmQgbGVhdmUgdGhlIHJlYWRlciBsb2NrZWQgdG8gdGhlIHN0cmVhbS5cbiAgICovXG4gIHJlbGVhc2VMb2NrKCk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIodGhpcykpIHtcbiAgICAgIHRocm93IGJ5b2JSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdyZWxlYXNlTG9jaycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVhZEludG9SZXF1ZXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUcmllZCB0byByZWxlYXNlIGEgcmVhZGVyIGxvY2sgd2hlbiB0aGF0IHJlYWRlciBoYXMgcGVuZGluZyByZWFkKCkgY2FsbHMgdW4tc2V0dGxlZCcpO1xuICAgIH1cblxuICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UodGhpcyk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnByb3RvdHlwZSwge1xuICBjYW5jZWw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICByZWFkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgcmVsZWFzZUxvY2s6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBjbG9zZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXInLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIHJlYWRlcnMuXG5cbmV4cG9ydCBmdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih4OiBhbnkpOiB4IGlzIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlciB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19yZWFkSW50b1JlcXVlc3RzJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlclJlYWQ8VCBleHRlbmRzIEFycmF5QnVmZmVyVmlldz4oXG4gIHJlYWRlcjogUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLFxuICB2aWV3OiBULFxuICByZWFkSW50b1JlcXVlc3Q6IFJlYWRJbnRvUmVxdWVzdDxUPlxuKTogdm9pZCB7XG4gIGNvbnN0IHN0cmVhbSA9IHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbTtcblxuICBhc3NlcnQoc3RyZWFtICE9PSB1bmRlZmluZWQpO1xuXG4gIHN0cmVhbS5fZGlzdHVyYmVkID0gdHJ1ZTtcblxuICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgcmVhZEludG9SZXF1ZXN0Ll9lcnJvclN0ZXBzKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICB9IGVsc2Uge1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJQdWxsSW50byhcbiAgICAgIHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gICAgICB2aWV3LFxuICAgICAgcmVhZEludG9SZXF1ZXN0XG4gICAgKTtcbiAgfVxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLlxuXG5mdW5jdGlvbiBieW9iUmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcbiAgICBgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXJgKTtcbn1cbiIsICJpbXBvcnQgeyBRdWV1aW5nU3RyYXRlZ3ksIFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjayB9IGZyb20gJy4uL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IE51bWJlcklzTmFOIGZyb20gJy4uLy4uL3N0dWIvbnVtYmVyLWlzbmFuJztcblxuZXhwb3J0IGZ1bmN0aW9uIEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHN0cmF0ZWd5OiBRdWV1aW5nU3RyYXRlZ3ksIGRlZmF1bHRIV006IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IHsgaGlnaFdhdGVyTWFyayB9ID0gc3RyYXRlZ3k7XG5cbiAgaWYgKGhpZ2hXYXRlck1hcmsgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBkZWZhdWx0SFdNO1xuICB9XG5cbiAgaWYgKE51bWJlcklzTmFOKGhpZ2hXYXRlck1hcmspIHx8IGhpZ2hXYXRlck1hcmsgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgaGlnaFdhdGVyTWFyaycpO1xuICB9XG5cbiAgcmV0dXJuIGhpZ2hXYXRlck1hcms7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFeHRyYWN0U2l6ZUFsZ29yaXRobTxUPihzdHJhdGVneTogUXVldWluZ1N0cmF0ZWd5PFQ+KTogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPFQ+IHtcbiAgY29uc3QgeyBzaXplIH0gPSBzdHJhdGVneTtcblxuICBpZiAoIXNpemUpIHtcbiAgICByZXR1cm4gKCkgPT4gMTtcbiAgfVxuXG4gIHJldHVybiBzaXplO1xufVxuIiwgImltcG9ydCB7IFF1ZXVpbmdTdHJhdGVneSwgUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrIH0gZnJvbSAnLi4vcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyBhc3NlcnREaWN0aW9uYXJ5LCBhc3NlcnRGdW5jdGlvbiwgY29udmVydFVucmVzdHJpY3RlZERvdWJsZSB9IGZyb20gJy4vYmFzaWMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFF1ZXVpbmdTdHJhdGVneTxUPihpbml0OiBRdWV1aW5nU3RyYXRlZ3k8VD4gfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogUXVldWluZ1N0cmF0ZWd5PFQ+IHtcbiAgYXNzZXJ0RGljdGlvbmFyeShpbml0LCBjb250ZXh0KTtcbiAgY29uc3QgaGlnaFdhdGVyTWFyayA9IGluaXQ/LmhpZ2hXYXRlck1hcms7XG4gIGNvbnN0IHNpemUgPSBpbml0Py5zaXplO1xuICByZXR1cm4ge1xuICAgIGhpZ2hXYXRlck1hcms6IGhpZ2hXYXRlck1hcmsgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGNvbnZlcnRVbnJlc3RyaWN0ZWREb3VibGUoaGlnaFdhdGVyTWFyayksXG4gICAgc2l6ZTogc2l6ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogY29udmVydFF1ZXVpbmdTdHJhdGVneVNpemUoc2l6ZSwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnc2l6ZScgdGhhdGApXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lTaXplPFQ+KGZuOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBzdHJpbmcpOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8VD4ge1xuICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gIHJldHVybiBjaHVuayA9PiBjb252ZXJ0VW5yZXN0cmljdGVkRG91YmxlKGZuKGNodW5rKSk7XG59XG4iLCAiaW1wb3J0IHsgYXNzZXJ0RGljdGlvbmFyeSwgYXNzZXJ0RnVuY3Rpb24gfSBmcm9tICcuL2Jhc2ljJztcbmltcG9ydCB7IHByb21pc2VDYWxsLCByZWZsZWN0Q2FsbCB9IGZyb20gJy4uL2hlbHBlcnMvd2ViaWRsJztcbmltcG9ydCB7XG4gIFVuZGVybHlpbmdTaW5rLFxuICBVbmRlcmx5aW5nU2lua0Fib3J0Q2FsbGJhY2ssXG4gIFVuZGVybHlpbmdTaW5rQ2xvc2VDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NpbmtTdGFydENhbGxiYWNrLFxuICBVbmRlcmx5aW5nU2lua1dyaXRlQ2FsbGJhY2ssXG4gIFZhbGlkYXRlZFVuZGVybHlpbmdTaW5rXG59IGZyb20gJy4uL3dyaXRhYmxlLXN0cmVhbS91bmRlcmx5aW5nLXNpbmsnO1xuaW1wb3J0IHsgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlciB9IGZyb20gJy4uL3dyaXRhYmxlLXN0cmVhbSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1Npbms8Vz4ob3JpZ2luYWw6IFVuZGVybHlpbmdTaW5rPFc+IHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogVmFsaWRhdGVkVW5kZXJseWluZ1Npbms8Vz4ge1xuICBhc3NlcnREaWN0aW9uYXJ5KG9yaWdpbmFsLCBjb250ZXh0KTtcbiAgY29uc3QgYWJvcnQgPSBvcmlnaW5hbD8uYWJvcnQ7XG4gIGNvbnN0IGNsb3NlID0gb3JpZ2luYWw/LmNsb3NlO1xuICBjb25zdCBzdGFydCA9IG9yaWdpbmFsPy5zdGFydDtcbiAgY29uc3QgdHlwZSA9IG9yaWdpbmFsPy50eXBlO1xuICBjb25zdCB3cml0ZSA9IG9yaWdpbmFsPy53cml0ZTtcbiAgcmV0dXJuIHtcbiAgICBhYm9ydDogYWJvcnQgPT09IHVuZGVmaW5lZCA/XG4gICAgICB1bmRlZmluZWQgOlxuICAgICAgY29udmVydFVuZGVybHlpbmdTaW5rQWJvcnRDYWxsYmFjayhhYm9ydCwgb3JpZ2luYWwhLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdhYm9ydCcgdGhhdGApLFxuICAgIGNsb3NlOiBjbG9zZSA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VW5kZXJseWluZ1NpbmtDbG9zZUNhbGxiYWNrKGNsb3NlLCBvcmlnaW5hbCEsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2Nsb3NlJyB0aGF0YCksXG4gICAgc3RhcnQ6IHN0YXJ0ID09PSB1bmRlZmluZWQgP1xuICAgICAgdW5kZWZpbmVkIDpcbiAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2soc3RhcnQsIG9yaWdpbmFsISwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnc3RhcnQnIHRoYXRgKSxcbiAgICB3cml0ZTogd3JpdGUgPT09IHVuZGVmaW5lZCA/XG4gICAgICB1bmRlZmluZWQgOlxuICAgICAgY29udmVydFVuZGVybHlpbmdTaW5rV3JpdGVDYWxsYmFjayh3cml0ZSwgb3JpZ2luYWwhLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICd3cml0ZScgdGhhdGApLFxuICAgIHR5cGVcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTaW5rQWJvcnRDYWxsYmFjayhcbiAgZm46IFVuZGVybHlpbmdTaW5rQWJvcnRDYWxsYmFjayxcbiAgb3JpZ2luYWw6IFVuZGVybHlpbmdTaW5rLFxuICBjb250ZXh0OiBzdHJpbmdcbik6IChyZWFzb246IGFueSkgPT4gUHJvbWlzZTx2b2lkPiB7XG4gIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgcmV0dXJuIChyZWFzb246IGFueSkgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbcmVhc29uXSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU2lua0Nsb3NlQ2FsbGJhY2soXG4gIGZuOiBVbmRlcmx5aW5nU2lua0Nsb3NlQ2FsbGJhY2ssXG4gIG9yaWdpbmFsOiBVbmRlcmx5aW5nU2luayxcbiAgY29udGV4dDogc3RyaW5nXG4pOiAoKSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICByZXR1cm4gKCkgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbXSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2soXG4gIGZuOiBVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2ssXG4gIG9yaWdpbmFsOiBVbmRlcmx5aW5nU2luayxcbiAgY29udGV4dDogc3RyaW5nXG4pOiBVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2sge1xuICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gIHJldHVybiAoY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcikgPT4gcmVmbGVjdENhbGwoZm4sIG9yaWdpbmFsLCBbY29udHJvbGxlcl0pO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1NpbmtXcml0ZUNhbGxiYWNrPFc+KFxuICBmbjogVW5kZXJseWluZ1NpbmtXcml0ZUNhbGxiYWNrPFc+LFxuICBvcmlnaW5hbDogVW5kZXJseWluZ1Npbms8Vz4sXG4gIGNvbnRleHQ6IHN0cmluZ1xuKTogKGNodW5rOiBXLCBjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICByZXR1cm4gKGNodW5rOiBXLCBjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtjaHVuaywgY29udHJvbGxlcl0pO1xufVxuIiwgImltcG9ydCB7IElzV3JpdGFibGVTdHJlYW0sIFdyaXRhYmxlU3RyZWFtIH0gZnJvbSAnLi4vd3JpdGFibGUtc3RyZWFtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFdyaXRhYmxlU3RyZWFtKHg6IHVua25vd24sIGNvbnRleHQ6IHN0cmluZyk6IGFzc2VydHMgeCBpcyBXcml0YWJsZVN0cmVhbSB7XG4gIGlmICghSXNXcml0YWJsZVN0cmVhbSh4KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gaXMgbm90IGEgV3JpdGFibGVTdHJlYW0uYCk7XG4gIH1cbn1cbiIsICIvKipcbiAqIEEgc2lnbmFsIG9iamVjdCB0aGF0IGFsbG93cyB5b3UgdG8gY29tbXVuaWNhdGUgd2l0aCBhIHJlcXVlc3QgYW5kIGFib3J0IGl0IGlmIHJlcXVpcmVkXG4gKiB2aWEgaXRzIGFzc29jaWF0ZWQgYEFib3J0Q29udHJvbGxlcmAgb2JqZWN0LlxuICpcbiAqIEByZW1hcmtzXG4gKiAgIFRoaXMgaW50ZXJmYWNlIGlzIGNvbXBhdGlibGUgd2l0aCB0aGUgYEFib3J0U2lnbmFsYCBpbnRlcmZhY2UgZGVmaW5lZCBpbiBUeXBlU2NyaXB0J3MgRE9NIHR5cGVzLlxuICogICBJdCBpcyByZWRlZmluZWQgaGVyZSwgc28gaXQgY2FuIGJlIHBvbHlmaWxsZWQgd2l0aG91dCBhIERPTSwgZm9yIGV4YW1wbGUgd2l0aFxuICogICB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsIHwgYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsfSBpbiBhIE5vZGUgZW52aXJvbm1lbnQuXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEFib3J0U2lnbmFsIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHJlcXVlc3QgaXMgYWJvcnRlZC5cbiAgICovXG4gIHJlYWRvbmx5IGFib3J0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGlzIHNpZ25hbCBiZWNvbWVzIGFib3J0ZWQuXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKHR5cGU6ICdhYm9ydCcsIGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogdm9pZDtcblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgd2FzIHByZXZpb3VzbHkgYWRkZWQgd2l0aCB7QGxpbmsgQWJvcnRTaWduYWwuYWRkRXZlbnRMaXN0ZW5lcn0uXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6ICdhYm9ydCcsIGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWJvcnRTaWduYWwodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBBYm9ydFNpZ25hbCB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIHR5cGVvZiAodmFsdWUgYXMgQWJvcnRTaWduYWwpLmFib3J0ZWQgPT09ICdib29sZWFuJztcbiAgfSBjYXRjaCB7XG4gICAgLy8gQWJvcnRTaWduYWwucHJvdG90eXBlLmFib3J0ZWQgdGhyb3dzIGlmIGl0cyBicmFuZCBjaGVjayBmYWlsc1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEEgY29udHJvbGxlciBvYmplY3QgdGhhdCBhbGxvd3MgeW91IHRvIGFib3J0IGFuIGBBYm9ydFNpZ25hbGAgd2hlbiBkZXNpcmVkLlxuICpcbiAqIEByZW1hcmtzXG4gKiAgIFRoaXMgaW50ZXJmYWNlIGlzIGNvbXBhdGlibGUgd2l0aCB0aGUgYEFib3J0Q29udHJvbGxlcmAgaW50ZXJmYWNlIGRlZmluZWQgaW4gVHlwZVNjcmlwdCdzIERPTSB0eXBlcy5cbiAqICAgSXQgaXMgcmVkZWZpbmVkIGhlcmUsIHNvIGl0IGNhbiBiZSBwb2x5ZmlsbGVkIHdpdGhvdXQgYSBET00sIGZvciBleGFtcGxlIHdpdGhcbiAqICAge0BsaW5rIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2Fib3J0Y29udHJvbGxlci1wb2x5ZmlsbCB8IGFib3J0Y29udHJvbGxlci1wb2x5ZmlsbH0gaW4gYSBOb2RlIGVudmlyb25tZW50LlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFib3J0Q29udHJvbGxlciB7XG4gIHJlYWRvbmx5IHNpZ25hbDogQWJvcnRTaWduYWw7XG5cbiAgYWJvcnQoKTogdm9pZDtcbn1cblxuaW50ZXJmYWNlIEFib3J0Q29udHJvbGxlckNvbnN0cnVjdG9yIHtcbiAgbmV3KCk6IEFib3J0Q29udHJvbGxlcjtcbn1cblxuY29uc3Qgc3VwcG9ydHNBYm9ydENvbnRyb2xsZXIgPSB0eXBlb2YgKEFib3J0Q29udHJvbGxlciBhcyBhbnkpID09PSAnZnVuY3Rpb24nO1xuXG4vKipcbiAqIENvbnN0cnVjdCBhIG5ldyBBYm9ydENvbnRyb2xsZXIsIGlmIHN1cHBvcnRlZCBieSB0aGUgcGxhdGZvcm0uXG4gKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBYm9ydENvbnRyb2xsZXIoKTogQWJvcnRDb250cm9sbGVyIHwgdW5kZWZpbmVkIHtcbiAgaWYgKHN1cHBvcnRzQWJvcnRDb250cm9sbGVyKSB7XG4gICAgcmV0dXJuIG5ldyAoQWJvcnRDb250cm9sbGVyIGFzIEFib3J0Q29udHJvbGxlckNvbnN0cnVjdG9yKSgpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICcuLi9zdHViL2Fzc2VydCc7XG5pbXBvcnQge1xuICBuZXdQcm9taXNlLFxuICBwcm9taXNlUmVqZWN0ZWRXaXRoLFxuICBwcm9taXNlUmVzb2x2ZWRXaXRoLFxuICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlLFxuICB1cG9uUHJvbWlzZVxufSBmcm9tICcuL2hlbHBlcnMvd2ViaWRsJztcbmltcG9ydCB7XG4gIERlcXVldWVWYWx1ZSxcbiAgRW5xdWV1ZVZhbHVlV2l0aFNpemUsXG4gIFBlZWtRdWV1ZVZhbHVlLFxuICBRdWV1ZVBhaXIsXG4gIFJlc2V0UXVldWVcbn0gZnJvbSAnLi9hYnN0cmFjdC1vcHMvcXVldWUtd2l0aC1zaXplcyc7XG5pbXBvcnQgeyBRdWV1aW5nU3RyYXRlZ3ksIFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjayB9IGZyb20gJy4vcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyBTaW1wbGVRdWV1ZSB9IGZyb20gJy4vc2ltcGxlLXF1ZXVlJztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4vaGVscGVycy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IEFib3J0U3RlcHMsIEVycm9yU3RlcHMgfSBmcm9tICcuL2Fic3RyYWN0LW9wcy9pbnRlcm5hbC1tZXRob2RzJztcbmltcG9ydCB7IElzTm9uTmVnYXRpdmVOdW1iZXIgfSBmcm9tICcuL2Fic3RyYWN0LW9wcy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IEV4dHJhY3RIaWdoV2F0ZXJNYXJrLCBFeHRyYWN0U2l6ZUFsZ29yaXRobSB9IGZyb20gJy4vYWJzdHJhY3Qtb3BzL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IHsgY29udmVydFF1ZXVpbmdTdHJhdGVneSB9IGZyb20gJy4vdmFsaWRhdG9ycy9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7XG4gIFVuZGVybHlpbmdTaW5rLFxuICBVbmRlcmx5aW5nU2lua0Fib3J0Q2FsbGJhY2ssXG4gIFVuZGVybHlpbmdTaW5rQ2xvc2VDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NpbmtTdGFydENhbGxiYWNrLFxuICBVbmRlcmx5aW5nU2lua1dyaXRlQ2FsbGJhY2ssXG4gIFZhbGlkYXRlZFVuZGVybHlpbmdTaW5rXG59IGZyb20gJy4vd3JpdGFibGUtc3RyZWFtL3VuZGVybHlpbmctc2luayc7XG5pbXBvcnQgeyBhc3NlcnRPYmplY3QsIGFzc2VydFJlcXVpcmVkQXJndW1lbnQgfSBmcm9tICcuL3ZhbGlkYXRvcnMvYmFzaWMnO1xuaW1wb3J0IHsgY29udmVydFVuZGVybHlpbmdTaW5rIH0gZnJvbSAnLi92YWxpZGF0b3JzL3VuZGVybHlpbmctc2luayc7XG5pbXBvcnQgeyBhc3NlcnRXcml0YWJsZVN0cmVhbSB9IGZyb20gJy4vdmFsaWRhdG9ycy93cml0YWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgQWJvcnRDb250cm9sbGVyLCBBYm9ydFNpZ25hbCwgY3JlYXRlQWJvcnRDb250cm9sbGVyIH0gZnJvbSAnLi9hYm9ydC1zaWduYWwnO1xuXG50eXBlIFdyaXRhYmxlU3RyZWFtU3RhdGUgPSAnd3JpdGFibGUnIHwgJ2Nsb3NlZCcgfCAnZXJyb3JpbmcnIHwgJ2Vycm9yZWQnO1xuXG5pbnRlcmZhY2UgV3JpdGVPckNsb3NlUmVxdWVzdCB7XG4gIF9yZXNvbHZlOiAodmFsdWU/OiB1bmRlZmluZWQpID0+IHZvaWQ7XG4gIF9yZWplY3Q6IChyZWFzb246IGFueSkgPT4gdm9pZDtcbn1cblxudHlwZSBXcml0ZVJlcXVlc3QgPSBXcml0ZU9yQ2xvc2VSZXF1ZXN0O1xudHlwZSBDbG9zZVJlcXVlc3QgPSBXcml0ZU9yQ2xvc2VSZXF1ZXN0O1xuXG5pbnRlcmZhY2UgUGVuZGluZ0Fib3J0UmVxdWVzdCB7XG4gIF9wcm9taXNlOiBQcm9taXNlPHVuZGVmaW5lZD47XG4gIF9yZXNvbHZlOiAodmFsdWU/OiB1bmRlZmluZWQpID0+IHZvaWQ7XG4gIF9yZWplY3Q6IChyZWFzb246IGFueSkgPT4gdm9pZDtcbiAgX3JlYXNvbjogYW55O1xuICBfd2FzQWxyZWFkeUVycm9yaW5nOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgd3JpdGFibGUgc3RyZWFtIHJlcHJlc2VudHMgYSBkZXN0aW5hdGlvbiBmb3IgZGF0YSwgaW50byB3aGljaCB5b3UgY2FuIHdyaXRlLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgV3JpdGFibGVTdHJlYW08VyA9IGFueT4ge1xuICAvKiogQGludGVybmFsICovXG4gIF9zdGF0ZSE6IFdyaXRhYmxlU3RyZWFtU3RhdGU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0b3JlZEVycm9yOiBhbnk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3dyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyPFc+IHwgdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIhOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFc+O1xuICAvKiogQGludGVybmFsICovXG4gIF93cml0ZVJlcXVlc3RzITogU2ltcGxlUXVldWU8V3JpdGVSZXF1ZXN0PjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5GbGlnaHRXcml0ZVJlcXVlc3Q6IFdyaXRlUmVxdWVzdCB8IHVuZGVmaW5lZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VSZXF1ZXN0OiBDbG9zZVJlcXVlc3QgfCB1bmRlZmluZWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0OiBDbG9zZVJlcXVlc3QgfCB1bmRlZmluZWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BlbmRpbmdBYm9ydFJlcXVlc3Q6IFBlbmRpbmdBYm9ydFJlcXVlc3QgfCB1bmRlZmluZWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2JhY2twcmVzc3VyZSE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IodW5kZXJseWluZ1Npbms/OiBVbmRlcmx5aW5nU2luazxXPiwgc3RyYXRlZ3k/OiBRdWV1aW5nU3RyYXRlZ3k8Vz4pO1xuICBjb25zdHJ1Y3RvcihyYXdVbmRlcmx5aW5nU2luazogVW5kZXJseWluZ1Npbms8Vz4gfCBudWxsIHwgdW5kZWZpbmVkID0ge30sXG4gICAgICAgICAgICAgIHJhd1N0cmF0ZWd5OiBRdWV1aW5nU3RyYXRlZ3k8Vz4gfCBudWxsIHwgdW5kZWZpbmVkID0ge30pIHtcbiAgICBpZiAocmF3VW5kZXJseWluZ1NpbmsgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmF3VW5kZXJseWluZ1NpbmsgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnRPYmplY3QocmF3VW5kZXJseWluZ1NpbmssICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHJhdGVneSA9IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3kocmF3U3RyYXRlZ3ksICdTZWNvbmQgcGFyYW1ldGVyJyk7XG4gICAgY29uc3QgdW5kZXJseWluZ1NpbmsgPSBjb252ZXJ0VW5kZXJseWluZ1NpbmsocmF3VW5kZXJseWluZ1NpbmssICdGaXJzdCBwYXJhbWV0ZXInKTtcblxuICAgIEluaXRpYWxpemVXcml0YWJsZVN0cmVhbSh0aGlzKTtcblxuICAgIGNvbnN0IHR5cGUgPSB1bmRlcmx5aW5nU2luay50eXBlO1xuICAgIGlmICh0eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGUgaXMgc3BlY2lmaWVkJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZUFsZ29yaXRobSA9IEV4dHJhY3RTaXplQWxnb3JpdGhtKHN0cmF0ZWd5KTtcbiAgICBjb25zdCBoaWdoV2F0ZXJNYXJrID0gRXh0cmFjdEhpZ2hXYXRlck1hcmsoc3RyYXRlZ3ksIDEpO1xuXG4gICAgU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRnJvbVVuZGVybHlpbmdTaW5rKHRoaXMsIHVuZGVybHlpbmdTaW5rLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB3cml0YWJsZSBzdHJlYW0gaXMgbG9ja2VkIHRvIGEgd3JpdGVyLlxuICAgKi9cbiAgZ2V0IGxvY2tlZCgpOiBib29sZWFuIHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ2xvY2tlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFib3J0cyB0aGUgc3RyZWFtLCBzaWduYWxpbmcgdGhhdCB0aGUgcHJvZHVjZXIgY2FuIG5vIGxvbmdlciBzdWNjZXNzZnVsbHkgd3JpdGUgdG8gdGhlIHN0cmVhbSBhbmQgaXQgaXMgdG8gYmVcbiAgICogaW1tZWRpYXRlbHkgbW92ZWQgdG8gYW4gZXJyb3JlZCBzdGF0ZSwgd2l0aCBhbnkgcXVldWVkLXVwIHdyaXRlcyBkaXNjYXJkZWQuIFRoaXMgd2lsbCBhbHNvIGV4ZWN1dGUgYW55IGFib3J0XG4gICAqIG1lY2hhbmlzbSBvZiB0aGUgdW5kZXJseWluZyBzaW5rLlxuICAgKlxuICAgKiBUaGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGZ1bGZpbGwgaWYgdGhlIHN0cmVhbSBzaHV0cyBkb3duIHN1Y2Nlc3NmdWxseSwgb3IgcmVqZWN0IGlmIHRoZSB1bmRlcmx5aW5nIHNpbmsgc2lnbmFsZWRcbiAgICogdGhhdCB0aGVyZSB3YXMgYW4gZXJyb3IgZG9pbmcgc28uIEFkZGl0aW9uYWxseSwgaXQgd2lsbCByZWplY3Qgd2l0aCBhIGBUeXBlRXJyb3JgICh3aXRob3V0IGF0dGVtcHRpbmcgdG8gY2FuY2VsXG4gICAqIHRoZSBzdHJlYW0pIGlmIHRoZSBzdHJlYW0gaXMgY3VycmVudGx5IGxvY2tlZC5cbiAgICovXG4gIGFib3J0KHJlYXNvbjogYW55ID0gdW5kZWZpbmVkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uKCdhYm9ydCcpKTtcbiAgICB9XG5cbiAgICBpZiAoSXNXcml0YWJsZVN0cmVhbUxvY2tlZCh0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignQ2Fubm90IGFib3J0IGEgc3RyZWFtIHRoYXQgYWxyZWFkeSBoYXMgYSB3cml0ZXInKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtQWJvcnQodGhpcywgcmVhc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHN0cmVhbS4gVGhlIHVuZGVybHlpbmcgc2luayB3aWxsIGZpbmlzaCBwcm9jZXNzaW5nIGFueSBwcmV2aW91c2x5LXdyaXR0ZW4gY2h1bmtzLCBiZWZvcmUgaW52b2tpbmcgaXRzXG4gICAqIGNsb3NlIGJlaGF2aW9yLiBEdXJpbmcgdGhpcyB0aW1lIGFueSBmdXJ0aGVyIGF0dGVtcHRzIHRvIHdyaXRlIHdpbGwgZmFpbCAod2l0aG91dCBlcnJvcmluZyB0aGUgc3RyZWFtKS5cbiAgICpcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgZnVsZmlsbCBpZiBhbGwgcmVtYWluaW5nIGNodW5rcyBhcmUgc3VjY2Vzc2Z1bGx5IHdyaXR0ZW4gYW5kIHRoZSBzdHJlYW1cbiAgICogc3VjY2Vzc2Z1bGx5IGNsb3Nlcywgb3IgcmVqZWN0cyBpZiBhbiBlcnJvciBpcyBlbmNvdW50ZXJlZCBkdXJpbmcgdGhpcyBwcm9jZXNzLiBBZGRpdGlvbmFsbHksIGl0IHdpbGwgcmVqZWN0IHdpdGhcbiAgICogYSBgVHlwZUVycm9yYCAod2l0aG91dCBhdHRlbXB0aW5nIHRvIGNhbmNlbCB0aGUgc3RyZWFtKSBpZiB0aGUgc3RyZWFtIGlzIGN1cnJlbnRseSBsb2NrZWQuXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Nsb3NlJykpO1xuICAgIH1cblxuICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2xvc2UgYSBzdHJlYW0gdGhhdCBhbHJlYWR5IGhhcyBhIHdyaXRlcicpKTtcbiAgICB9XG5cbiAgICBpZiAoV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjbG9zZSBhbiBhbHJlYWR5LWNsb3Npbmcgc3RyZWFtJykpO1xuICAgIH1cblxuICAgIHJldHVybiBXcml0YWJsZVN0cmVhbUNsb3NlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSB7QGxpbmsgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyIHwgd3JpdGVyfSBhbmQgbG9ja3MgdGhlIHN0cmVhbSB0byB0aGUgbmV3IHdyaXRlci4gV2hpbGUgdGhlIHN0cmVhbVxuICAgKiBpcyBsb2NrZWQsIG5vIG90aGVyIHdyaXRlciBjYW4gYmUgYWNxdWlyZWQgdW50aWwgdGhpcyBvbmUgaXMgcmVsZWFzZWQuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb25hbGl0eSBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBmb3IgY3JlYXRpbmcgYWJzdHJhY3Rpb25zIHRoYXQgZGVzaXJlIHRoZSBhYmlsaXR5IHRvIHdyaXRlIHRvIGEgc3RyZWFtXG4gICAqIHdpdGhvdXQgaW50ZXJydXB0aW9uIG9yIGludGVybGVhdmluZy4gQnkgZ2V0dGluZyBhIHdyaXRlciBmb3IgdGhlIHN0cmVhbSwgeW91IGNhbiBlbnN1cmUgbm9ib2R5IGVsc2UgY2FuIHdyaXRlIGF0XG4gICAqIHRoZSBzYW1lIHRpbWUsIHdoaWNoIHdvdWxkIGNhdXNlIHRoZSByZXN1bHRpbmcgd3JpdHRlbiBkYXRhIHRvIGJlIHVucHJlZGljdGFibGUgYW5kIHByb2JhYmx5IHVzZWxlc3MuXG4gICAqL1xuICBnZXRXcml0ZXIoKTogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyPFc+IHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ2dldFdyaXRlcicpO1xuICAgIH1cblxuICAgIHJldHVybiBBY3F1aXJlV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFdyaXRhYmxlU3RyZWFtLnByb3RvdHlwZSwge1xuICBhYm9ydDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGNsb3NlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgZ2V0V3JpdGVyOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgbG9ja2VkOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlU3RyZWFtLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdXcml0YWJsZVN0cmVhbScsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5leHBvcnQge1xuICBBY3F1aXJlV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLFxuICBDcmVhdGVXcml0YWJsZVN0cmVhbSxcbiAgSXNXcml0YWJsZVN0cmVhbSxcbiAgSXNXcml0YWJsZVN0cmVhbUxvY2tlZCxcbiAgV3JpdGFibGVTdHJlYW0sXG4gIFdyaXRhYmxlU3RyZWFtQWJvcnQsXG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkLFxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZVdpdGhFcnJvclByb3BhZ2F0aW9uLFxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJSZWxlYXNlLFxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJXcml0ZSxcbiAgV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQsXG4gIFVuZGVybHlpbmdTaW5rLFxuICBVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2ssXG4gIFVuZGVybHlpbmdTaW5rV3JpdGVDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NpbmtDbG9zZUNhbGxiYWNrLFxuICBVbmRlcmx5aW5nU2lua0Fib3J0Q2FsbGJhY2tcbn07XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBXcml0YWJsZVN0cmVhbS5cblxuZnVuY3Rpb24gQWNxdWlyZVdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcjxXPihzdHJlYW06IFdyaXRhYmxlU3RyZWFtPFc+KTogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyPFc+IHtcbiAgcmV0dXJuIG5ldyBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIoc3RyZWFtKTtcbn1cblxuLy8gVGhyb3dzIGlmIGFuZCBvbmx5IGlmIHN0YXJ0QWxnb3JpdGhtIHRocm93cy5cbmZ1bmN0aW9uIENyZWF0ZVdyaXRhYmxlU3RyZWFtPFc+KHN0YXJ0QWxnb3JpdGhtOiAoKSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUFsZ29yaXRobTogKGNodW5rOiBXKSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGdvcml0aG06ICgpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydEFsZ29yaXRobTogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaFdhdGVyTWFyayA9IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplQWxnb3JpdGhtOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8Vz4gPSAoKSA9PiAxKSB7XG4gIGFzc2VydChJc05vbk5lZ2F0aXZlTnVtYmVyKGhpZ2hXYXRlck1hcmspKTtcblxuICBjb25zdCBzdHJlYW06IFdyaXRhYmxlU3RyZWFtPFc+ID0gT2JqZWN0LmNyZWF0ZShXcml0YWJsZVN0cmVhbS5wcm90b3R5cGUpO1xuICBJbml0aWFsaXplV3JpdGFibGVTdHJlYW0oc3RyZWFtKTtcblxuICBjb25zdCBjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFc+ID0gT2JqZWN0LmNyZWF0ZShXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSk7XG5cbiAgU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHdyaXRlQWxnb3JpdGhtLCBjbG9zZUFsZ29yaXRobSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0QWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKTtcbiAgcmV0dXJuIHN0cmVhbTtcbn1cblxuZnVuY3Rpb24gSW5pdGlhbGl6ZVdyaXRhYmxlU3RyZWFtPFc+KHN0cmVhbTogV3JpdGFibGVTdHJlYW08Vz4pIHtcbiAgc3RyZWFtLl9zdGF0ZSA9ICd3cml0YWJsZSc7XG5cbiAgLy8gVGhlIGVycm9yIHRoYXQgd2lsbCBiZSByZXBvcnRlZCBieSBuZXcgbWV0aG9kIGNhbGxzIG9uY2UgdGhlIHN0YXRlIGJlY29tZXMgZXJyb3JlZC4gT25seSBzZXQgd2hlbiBbW3N0YXRlXV0gaXNcbiAgLy8gJ2Vycm9yaW5nJyBvciAnZXJyb3JlZCcuIE1heSBiZSBzZXQgdG8gYW4gdW5kZWZpbmVkIHZhbHVlLlxuICBzdHJlYW0uX3N0b3JlZEVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHN0cmVhbS5fd3JpdGVyID0gdW5kZWZpbmVkO1xuXG4gIC8vIEluaXRpYWxpemUgdG8gdW5kZWZpbmVkIGZpcnN0IGJlY2F1c2UgdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBjb250cm9sbGVyIGNoZWNrcyB0aGlzXG4gIC8vIHZhcmlhYmxlIHRvIHZhbGlkYXRlIHRoZSBjYWxsZXIuXG4gIHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyID0gdW5kZWZpbmVkITtcblxuICAvLyBUaGlzIHF1ZXVlIGlzIHBsYWNlZCBoZXJlIGluc3RlYWQgb2YgdGhlIHdyaXRlciBjbGFzcyBpbiBvcmRlciB0byBhbGxvdyBmb3IgcGFzc2luZyBhIHdyaXRlciB0byB0aGUgbmV4dCBkYXRhXG4gIC8vIHByb2R1Y2VyIHdpdGhvdXQgd2FpdGluZyBmb3IgdGhlIHF1ZXVlZCB3cml0ZXMgdG8gZmluaXNoLlxuICBzdHJlYW0uX3dyaXRlUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcblxuICAvLyBXcml0ZSByZXF1ZXN0cyBhcmUgcmVtb3ZlZCBmcm9tIF93cml0ZVJlcXVlc3RzIHdoZW4gd3JpdGUoKSBpcyBjYWxsZWQgb24gdGhlIHVuZGVybHlpbmcgc2luay4gVGhpcyBwcmV2ZW50c1xuICAvLyB0aGVtIGZyb20gYmVpbmcgZXJyb25lb3VzbHkgcmVqZWN0ZWQgb24gZXJyb3IuIElmIGEgd3JpdGUoKSBjYWxsIGlzIGluLWZsaWdodCwgdGhlIHJlcXVlc3QgaXMgc3RvcmVkIGhlcmUuXG4gIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG5cbiAgLy8gVGhlIHByb21pc2UgdGhhdCB3YXMgcmV0dXJuZWQgZnJvbSB3cml0ZXIuY2xvc2UoKS4gU3RvcmVkIGhlcmUgYmVjYXVzZSBpdCBtYXkgYmUgZnVsZmlsbGVkIGFmdGVyIHRoZSB3cml0ZXJcbiAgLy8gaGFzIGJlZW4gZGV0YWNoZWQuXG4gIHN0cmVhbS5fY2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuXG4gIC8vIENsb3NlIHJlcXVlc3QgaXMgcmVtb3ZlZCBmcm9tIF9jbG9zZVJlcXVlc3Qgd2hlbiBjbG9zZSgpIGlzIGNhbGxlZCBvbiB0aGUgdW5kZXJseWluZyBzaW5rLiBUaGlzIHByZXZlbnRzIGl0XG4gIC8vIGZyb20gYmVpbmcgZXJyb25lb3VzbHkgcmVqZWN0ZWQgb24gZXJyb3IuIElmIGEgY2xvc2UoKSBjYWxsIGlzIGluLWZsaWdodCwgdGhlIHJlcXVlc3QgaXMgc3RvcmVkIGhlcmUuXG4gIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG5cbiAgLy8gVGhlIHByb21pc2UgdGhhdCB3YXMgcmV0dXJuZWQgZnJvbSB3cml0ZXIuYWJvcnQoKS4gVGhpcyBtYXkgYWxzbyBiZSBmdWxmaWxsZWQgYWZ0ZXIgdGhlIHdyaXRlciBoYXMgZGV0YWNoZWQuXG4gIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCA9IHVuZGVmaW5lZDtcblxuICAvLyBUaGUgYmFja3ByZXNzdXJlIHNpZ25hbCBzZXQgYnkgdGhlIGNvbnRyb2xsZXIuXG4gIHN0cmVhbS5fYmFja3ByZXNzdXJlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIElzV3JpdGFibGVTdHJlYW0oeDogdW5rbm93bik6IHggaXMgV3JpdGFibGVTdHJlYW0ge1xuICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfd3JpdGFibGVTdHJlYW1Db250cm9sbGVyJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIFdyaXRhYmxlU3RyZWFtO1xufVxuXG5mdW5jdGlvbiBJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbTogV3JpdGFibGVTdHJlYW0pOiBib29sZWFuIHtcbiAgYXNzZXJ0KElzV3JpdGFibGVTdHJlYW0oc3RyZWFtKSk7XG5cbiAgaWYgKHN0cmVhbS5fd3JpdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1BYm9ydChzdHJlYW06IFdyaXRhYmxlU3RyZWFtLCByZWFzb246IGFueSk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJyB8fCBzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICB9XG4gIHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyLl9hYm9ydFJlYXNvbiA9IHJlYXNvbjtcbiAgc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIuX2Fib3J0Q29udHJvbGxlcj8uYWJvcnQoKTtcblxuICAvLyBUeXBlU2NyaXB0IG5hcnJvd3MgdGhlIHR5cGUgb2YgYHN0cmVhbS5fc3RhdGVgIGRvd24gdG8gJ3dyaXRhYmxlJyB8ICdlcnJvcmluZycsXG4gIC8vIGJ1dCBpdCBkb2Vzbid0IGtub3cgdGhhdCBzaWduYWxpbmcgYWJvcnQgcnVucyBhdXRob3IgY29kZSB0aGF0IG1pZ2h0IGhhdmUgY2hhbmdlZCB0aGUgc3RhdGUuXG4gIC8vIFdpZGVuIHRoZSB0eXBlIGFnYWluIGJ5IGNhc3RpbmcgdG8gV3JpdGFibGVTdHJlYW1TdGF0ZS5cbiAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlIGFzIFdyaXRhYmxlU3RyZWFtU3RhdGU7XG5cbiAgaWYgKHN0YXRlID09PSAnY2xvc2VkJyB8fCBzdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgfVxuICBpZiAoc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0Ll9wcm9taXNlO1xuICB9XG5cbiAgYXNzZXJ0KHN0YXRlID09PSAnd3JpdGFibGUnIHx8IHN0YXRlID09PSAnZXJyb3JpbmcnKTtcblxuICBsZXQgd2FzQWxyZWFkeUVycm9yaW5nID0gZmFsc2U7XG4gIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgIHdhc0FscmVhZHlFcnJvcmluZyA9IHRydWU7XG4gICAgLy8gcmVhc29uIHdpbGwgbm90IGJlIHVzZWQsIHNvIGRvbid0IGtlZXAgYSByZWZlcmVuY2UgdG8gaXQuXG4gICAgcmVhc29uID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgcHJvbWlzZSA9IG5ld1Byb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID0ge1xuICAgICAgX3Byb21pc2U6IHVuZGVmaW5lZCEsXG4gICAgICBfcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgIF9yZWplY3Q6IHJlamVjdCxcbiAgICAgIF9yZWFzb246IHJlYXNvbixcbiAgICAgIF93YXNBbHJlYWR5RXJyb3Jpbmc6IHdhc0FscmVhZHlFcnJvcmluZ1xuICAgIH07XG4gIH0pO1xuICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QhLl9wcm9taXNlID0gcHJvbWlzZTtcblxuICBpZiAoIXdhc0FscmVhZHlFcnJvcmluZykge1xuICAgIFdyaXRhYmxlU3RyZWFtU3RhcnRFcnJvcmluZyhzdHJlYW0sIHJlYXNvbik7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1DbG9zZShzdHJlYW06IFdyaXRhYmxlU3RyZWFtPGFueT4pOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcgfHwgc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoXG4gICAgICBgVGhlIHN0cmVhbSAoaW4gJHtzdGF0ZX0gc3RhdGUpIGlzIG5vdCBpbiB0aGUgd3JpdGFibGUgc3RhdGUgYW5kIGNhbm5vdCBiZSBjbG9zZWRgKSk7XG4gIH1cblxuICBhc3NlcnQoc3RhdGUgPT09ICd3cml0YWJsZScgfHwgc3RhdGUgPT09ICdlcnJvcmluZycpO1xuICBhc3NlcnQoIVdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkpO1xuXG4gIGNvbnN0IHByb21pc2UgPSBuZXdQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGNsb3NlUmVxdWVzdDogQ2xvc2VSZXF1ZXN0ID0ge1xuICAgICAgX3Jlc29sdmU6IHJlc29sdmUsXG4gICAgICBfcmVqZWN0OiByZWplY3RcbiAgICB9O1xuXG4gICAgc3RyZWFtLl9jbG9zZVJlcXVlc3QgPSBjbG9zZVJlcXVlc3Q7XG4gIH0pO1xuXG4gIGNvbnN0IHdyaXRlciA9IHN0cmVhbS5fd3JpdGVyO1xuICBpZiAod3JpdGVyICE9PSB1bmRlZmluZWQgJiYgc3RyZWFtLl9iYWNrcHJlc3N1cmUgJiYgc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzb2x2ZSh3cml0ZXIpO1xuICB9XG5cbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyKTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLy8gV3JpdGFibGVTdHJlYW0gQVBJIGV4cG9zZWQgZm9yIGNvbnRyb2xsZXJzLlxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUFkZFdyaXRlUmVxdWVzdChzdHJlYW06IFdyaXRhYmxlU3RyZWFtKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgYXNzZXJ0KElzV3JpdGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSk7XG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnKTtcblxuICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB3cml0ZVJlcXVlc3Q6IFdyaXRlUmVxdWVzdCA9IHtcbiAgICAgIF9yZXNvbHZlOiByZXNvbHZlLFxuICAgICAgX3JlamVjdDogcmVqZWN0XG4gICAgfTtcblxuICAgIHN0cmVhbS5fd3JpdGVSZXF1ZXN0cy5wdXNoKHdyaXRlUmVxdWVzdCk7XG4gIH0pO1xuXG4gIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlYWxXaXRoUmVqZWN0aW9uKHN0cmVhbTogV3JpdGFibGVTdHJlYW0sIGVycm9yOiBhbnkpIHtcbiAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuXG4gIGlmIChzdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgIFdyaXRhYmxlU3RyZWFtU3RhcnRFcnJvcmluZyhzdHJlYW0sIGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnQoc3RhdGUgPT09ICdlcnJvcmluZycpO1xuICBXcml0YWJsZVN0cmVhbUZpbmlzaEVycm9yaW5nKHN0cmVhbSk7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtU3RhcnRFcnJvcmluZyhzdHJlYW06IFdyaXRhYmxlU3RyZWFtLCByZWFzb246IGFueSkge1xuICBhc3NlcnQoc3RyZWFtLl9zdG9yZWRFcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICd3cml0YWJsZScpO1xuXG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlcjtcbiAgYXNzZXJ0KGNvbnRyb2xsZXIgIT09IHVuZGVmaW5lZCk7XG5cbiAgc3RyZWFtLl9zdGF0ZSA9ICdlcnJvcmluZyc7XG4gIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSByZWFzb247XG4gIGNvbnN0IHdyaXRlciA9IHN0cmVhbS5fd3JpdGVyO1xuICBpZiAod3JpdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJFbnN1cmVSZWFkeVByb21pc2VSZWplY3RlZCh3cml0ZXIsIHJlYXNvbik7XG4gIH1cblxuICBpZiAoIVdyaXRhYmxlU3RyZWFtSGFzT3BlcmF0aW9uTWFya2VkSW5GbGlnaHQoc3RyZWFtKSAmJiBjb250cm9sbGVyLl9zdGFydGVkKSB7XG4gICAgV3JpdGFibGVTdHJlYW1GaW5pc2hFcnJvcmluZyhzdHJlYW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRmluaXNoRXJyb3Jpbmcoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSkge1xuICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yaW5nJyk7XG4gIGFzc2VydCghV3JpdGFibGVTdHJlYW1IYXNPcGVyYXRpb25NYXJrZWRJbkZsaWdodChzdHJlYW0pKTtcbiAgc3RyZWFtLl9zdGF0ZSA9ICdlcnJvcmVkJztcbiAgc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXJbRXJyb3JTdGVwc10oKTtcblxuICBjb25zdCBzdG9yZWRFcnJvciA9IHN0cmVhbS5fc3RvcmVkRXJyb3I7XG4gIHN0cmVhbS5fd3JpdGVSZXF1ZXN0cy5mb3JFYWNoKHdyaXRlUmVxdWVzdCA9PiB7XG4gICAgd3JpdGVSZXF1ZXN0Ll9yZWplY3Qoc3RvcmVkRXJyb3IpO1xuICB9KTtcbiAgc3RyZWFtLl93cml0ZVJlcXVlc3RzID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG5cbiAgaWYgKHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgV3JpdGFibGVTdHJlYW1SZWplY3RDbG9zZUFuZENsb3NlZFByb21pc2VJZk5lZWRlZChzdHJlYW0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGFib3J0UmVxdWVzdCA9IHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdDtcbiAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuXG4gIGlmIChhYm9ydFJlcXVlc3QuX3dhc0FscmVhZHlFcnJvcmluZykge1xuICAgIGFib3J0UmVxdWVzdC5fcmVqZWN0KHN0b3JlZEVycm9yKTtcbiAgICBXcml0YWJsZVN0cmVhbVJlamVjdENsb3NlQW5kQ2xvc2VkUHJvbWlzZUlmTmVlZGVkKHN0cmVhbSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcHJvbWlzZSA9IHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyW0Fib3J0U3RlcHNdKGFib3J0UmVxdWVzdC5fcmVhc29uKTtcbiAgdXBvblByb21pc2UoXG4gICAgcHJvbWlzZSxcbiAgICAoKSA9PiB7XG4gICAgICBhYm9ydFJlcXVlc3QuX3Jlc29sdmUoKTtcbiAgICAgIFdyaXRhYmxlU3RyZWFtUmVqZWN0Q2xvc2VBbmRDbG9zZWRQcm9taXNlSWZOZWVkZWQoc3RyZWFtKTtcbiAgICB9LFxuICAgIChyZWFzb246IGFueSkgPT4ge1xuICAgICAgYWJvcnRSZXF1ZXN0Ll9yZWplY3QocmVhc29uKTtcbiAgICAgIFdyaXRhYmxlU3RyZWFtUmVqZWN0Q2xvc2VBbmRDbG9zZWRQcm9taXNlSWZOZWVkZWQoc3RyZWFtKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodFdyaXRlKHN0cmVhbTogV3JpdGFibGVTdHJlYW0pIHtcbiAgYXNzZXJ0KHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgIT09IHVuZGVmaW5lZCk7XG4gIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QhLl9yZXNvbHZlKHVuZGVmaW5lZCk7XG4gIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRXcml0ZVdpdGhFcnJvcihzdHJlYW06IFdyaXRhYmxlU3RyZWFtLCBlcnJvcjogYW55KSB7XG4gIGFzc2VydChzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0ICE9PSB1bmRlZmluZWQpO1xuICBzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0IS5fcmVqZWN0KGVycm9yKTtcbiAgc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9IHVuZGVmaW5lZDtcblxuICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyB8fCBzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JpbmcnKTtcblxuICBXcml0YWJsZVN0cmVhbURlYWxXaXRoUmVqZWN0aW9uKHN0cmVhbSwgZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0Q2xvc2Uoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSkge1xuICBhc3NlcnQoc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCAhPT0gdW5kZWZpbmVkKTtcbiAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCEuX3Jlc29sdmUodW5kZWZpbmVkKTtcbiAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcblxuICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG5cbiAgYXNzZXJ0KHN0YXRlID09PSAnd3JpdGFibGUnIHx8IHN0YXRlID09PSAnZXJyb3JpbmcnKTtcblxuICBpZiAoc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICAvLyBUaGUgZXJyb3Igd2FzIHRvbyBsYXRlIHRvIGRvIGFueXRoaW5nLCBzbyBpdCBpcyBpZ25vcmVkLlxuICAgIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QuX3Jlc29sdmUoKTtcbiAgICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBzdHJlYW0uX3N0YXRlID0gJ2Nsb3NlZCc7XG5cbiAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gIGlmICh3cml0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVzb2x2ZSh3cml0ZXIpO1xuICB9XG5cbiAgYXNzZXJ0KHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCA9PT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RvcmVkRXJyb3IgPT09IHVuZGVmaW5lZCk7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRDbG9zZVdpdGhFcnJvcihzdHJlYW06IFdyaXRhYmxlU3RyZWFtLCBlcnJvcjogYW55KSB7XG4gIGFzc2VydChzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ICE9PSB1bmRlZmluZWQpO1xuICBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0IS5fcmVqZWN0KGVycm9yKTtcbiAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcblxuICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyB8fCBzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JpbmcnKTtcblxuICAvLyBOZXZlciBleGVjdXRlIHNpbmsgYWJvcnQoKSBhZnRlciBzaW5rIGNsb3NlKCkuXG4gIGlmIChzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdC5fcmVqZWN0KGVycm9yKTtcbiAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gIH1cbiAgV3JpdGFibGVTdHJlYW1EZWFsV2l0aFJlamVjdGlvbihzdHJlYW0sIGVycm9yKTtcbn1cblxuLy8gVE9ETyhyaWNlYSk6IEZpeCBhbHBoYWJldGljYWwgb3JkZXIuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW06IFdyaXRhYmxlU3RyZWFtKTogYm9vbGVhbiB7XG4gIGlmIChzdHJlYW0uX2Nsb3NlUmVxdWVzdCA9PT0gdW5kZWZpbmVkICYmIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUhhc09wZXJhdGlvbk1hcmtlZEluRmxpZ2h0KHN0cmVhbTogV3JpdGFibGVTdHJlYW0pOiBib29sZWFuIHtcbiAgaWYgKHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgPT09IHVuZGVmaW5lZCAmJiBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1NYXJrQ2xvc2VSZXF1ZXN0SW5GbGlnaHQoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSkge1xuICBhc3NlcnQoc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9PT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHN0cmVhbS5fY2xvc2VSZXF1ZXN0ICE9PSB1bmRlZmluZWQpO1xuICBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID0gc3RyZWFtLl9jbG9zZVJlcXVlc3Q7XG4gIHN0cmVhbS5fY2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbU1hcmtGaXJzdFdyaXRlUmVxdWVzdEluRmxpZ2h0KHN0cmVhbTogV3JpdGFibGVTdHJlYW0pIHtcbiAgYXNzZXJ0KHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgPT09IHVuZGVmaW5lZCk7XG4gIGFzc2VydChzdHJlYW0uX3dyaXRlUmVxdWVzdHMubGVuZ3RoICE9PSAwKTtcbiAgc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9IHN0cmVhbS5fd3JpdGVSZXF1ZXN0cy5zaGlmdCgpO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbVJlamVjdENsb3NlQW5kQ2xvc2VkUHJvbWlzZUlmTmVlZGVkKHN0cmVhbTogV3JpdGFibGVTdHJlYW0pIHtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmVkJyk7XG4gIGlmIChzdHJlYW0uX2Nsb3NlUmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYXNzZXJ0KHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPT09IHVuZGVmaW5lZCk7XG5cbiAgICBzdHJlYW0uX2Nsb3NlUmVxdWVzdC5fcmVqZWN0KHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICAgIHN0cmVhbS5fY2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHdyaXRlciA9IHN0cmVhbS5fd3JpdGVyO1xuICBpZiAod3JpdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlamVjdCh3cml0ZXIsIHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtVXBkYXRlQmFja3ByZXNzdXJlKHN0cmVhbTogV3JpdGFibGVTdHJlYW0sIGJhY2twcmVzc3VyZTogYm9vbGVhbikge1xuICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyk7XG4gIGFzc2VydCghV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSk7XG5cbiAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gIGlmICh3cml0ZXIgIT09IHVuZGVmaW5lZCAmJiBiYWNrcHJlc3N1cmUgIT09IHN0cmVhbS5fYmFja3ByZXNzdXJlKSB7XG4gICAgaWYgKGJhY2twcmVzc3VyZSkge1xuICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlc2V0KHdyaXRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydCghYmFja3ByZXNzdXJlKTtcblxuICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlc29sdmUod3JpdGVyKTtcbiAgICB9XG4gIH1cblxuICBzdHJlYW0uX2JhY2twcmVzc3VyZSA9IGJhY2twcmVzc3VyZTtcbn1cblxuLyoqXG4gKiBBIGRlZmF1bHQgd3JpdGVyIHZlbmRlZCBieSBhIHtAbGluayBXcml0YWJsZVN0cmVhbX0uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY2xhc3MgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyPFcgPSBhbnk+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb3duZXJXcml0YWJsZVN0cmVhbTogV3JpdGFibGVTdHJlYW08Vz47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlZFByb21pc2UhOiBQcm9taXNlPHVuZGVmaW5lZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlZFByb21pc2VfcmVzb2x2ZT86ICh2YWx1ZT86IHVuZGVmaW5lZCkgPT4gdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VkUHJvbWlzZV9yZWplY3Q/OiAocmVhc29uOiBhbnkpID0+IHZvaWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlZFByb21pc2VTdGF0ZSE6ICdwZW5kaW5nJyB8ICdyZXNvbHZlZCcgfCAncmVqZWN0ZWQnO1xuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkeVByb21pc2UhOiBQcm9taXNlPHVuZGVmaW5lZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWR5UHJvbWlzZV9yZXNvbHZlPzogKHZhbHVlPzogdW5kZWZpbmVkKSA9PiB2b2lkO1xuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkeVByb21pc2VfcmVqZWN0PzogKHJlYXNvbjogYW55KSA9PiB2b2lkO1xuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkeVByb21pc2VTdGF0ZSE6ICdwZW5kaW5nJyB8ICdmdWxmaWxsZWQnIHwgJ3JlamVjdGVkJztcblxuICBjb25zdHJ1Y3RvcihzdHJlYW06IFdyaXRhYmxlU3RyZWFtPFc+KSB7XG4gICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChzdHJlYW0sIDEsICdXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXInKTtcbiAgICBhc3NlcnRXcml0YWJsZVN0cmVhbShzdHJlYW0sICdGaXJzdCBwYXJhbWV0ZXInKTtcblxuICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgc3RyZWFtIGhhcyBhbHJlYWR5IGJlZW4gbG9ja2VkIGZvciBleGNsdXNpdmUgd3JpdGluZyBieSBhbm90aGVyIHdyaXRlcicpO1xuICAgIH1cblxuICAgIHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW0gPSBzdHJlYW07XG4gICAgc3RyZWFtLl93cml0ZXIgPSB0aGlzO1xuXG4gICAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuXG4gICAgaWYgKHN0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICBpZiAoIVdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkgJiYgc3RyZWFtLl9iYWNrcHJlc3N1cmUpIHtcbiAgICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemUodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZUFzUmVzb2x2ZWQodGhpcyk7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQodGhpcywgc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUodGhpcyk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZCh0aGlzKTtcbiAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVzb2x2ZWQodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydChzdGF0ZSA9PT0gJ2Vycm9yZWQnKTtcblxuICAgICAgY29uc3Qgc3RvcmVkRXJyb3IgPSBzdHJlYW0uX3N0b3JlZEVycm9yO1xuICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHRoaXMsIHN0b3JlZEVycm9yKTtcbiAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQodGhpcywgc3RvcmVkRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgZnVsZmlsbGVkIHdoZW4gdGhlIHN0cmVhbSBiZWNvbWVzIGNsb3NlZCwgb3IgcmVqZWN0ZWQgaWYgdGhlIHN0cmVhbSBldmVyIGVycm9ycyBvclxuICAgKiB0aGUgd3JpdGVyXHUyMDE5cyBsb2NrIGlzIHJlbGVhc2VkIGJlZm9yZSB0aGUgc3RyZWFtIGZpbmlzaGVzIGNsb3NpbmcuXG4gICAqL1xuICBnZXQgY2xvc2VkKCk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Nsb3NlZCcpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2xvc2VkUHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBkZXNpcmVkIHNpemUgdG8gZmlsbCB0aGUgc3RyZWFtXHUyMDE5cyBpbnRlcm5hbCBxdWV1ZS4gSXQgY2FuIGJlIG5lZ2F0aXZlLCBpZiB0aGUgcXVldWUgaXMgb3Zlci1mdWxsLlxuICAgKiBBIHByb2R1Y2VyIGNhbiB1c2UgdGhpcyBpbmZvcm1hdGlvbiB0byBkZXRlcm1pbmUgdGhlIHJpZ2h0IGFtb3VudCBvZiBkYXRhIHRvIHdyaXRlLlxuICAgKlxuICAgKiBJdCB3aWxsIGJlIGBudWxsYCBpZiB0aGUgc3RyZWFtIGNhbm5vdCBiZSBzdWNjZXNzZnVsbHkgd3JpdHRlbiB0byAoZHVlIHRvIGVpdGhlciBiZWluZyBlcnJvcmVkLCBvciBoYXZpbmcgYW4gYWJvcnRcbiAgICogcXVldWVkIHVwKS4gSXQgd2lsbCByZXR1cm4gemVybyBpZiB0aGUgc3RyZWFtIGlzIGNsb3NlZC4gQW5kIHRoZSBnZXR0ZXIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgaW52b2tlZCB3aGVuXG4gICAqIHRoZSB3cml0ZXJcdTIwMTlzIGxvY2sgaXMgcmVsZWFzZWQuXG4gICAqL1xuICBnZXQgZGVzaXJlZFNpemUoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Rlc2lyZWRTaXplJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24oJ2Rlc2lyZWRTaXplJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckdldERlc2lyZWRTaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgZGVzaXJlZCBzaXplIHRvIGZpbGwgdGhlIHN0cmVhbVx1MjAxOXMgaW50ZXJuYWwgcXVldWUgdHJhbnNpdGlvbnNcbiAgICogZnJvbSBub24tcG9zaXRpdmUgdG8gcG9zaXRpdmUsIHNpZ25hbGluZyB0aGF0IGl0IGlzIG5vIGxvbmdlciBhcHBseWluZyBiYWNrcHJlc3N1cmUuIE9uY2UgdGhlIGRlc2lyZWQgc2l6ZSBkaXBzXG4gICAqIGJhY2sgdG8gemVybyBvciBiZWxvdywgdGhlIGdldHRlciB3aWxsIHJldHVybiBhIG5ldyBwcm9taXNlIHRoYXQgc3RheXMgcGVuZGluZyB1bnRpbCB0aGUgbmV4dCB0cmFuc2l0aW9uLlxuICAgKlxuICAgKiBJZiB0aGUgc3RyZWFtIGJlY29tZXMgZXJyb3JlZCBvciBhYm9ydGVkLCBvciB0aGUgd3JpdGVyXHUyMDE5cyBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlY29tZVxuICAgKiByZWplY3RlZC5cbiAgICovXG4gIGdldCByZWFkeSgpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdyZWFkeScpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVhZHlQcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSByZWFkZXIgaXMgYWN0aXZlLCBiZWhhdmVzIHRoZSBzYW1lIGFzIHtAbGluayBXcml0YWJsZVN0cmVhbS5hYm9ydCB8IHN0cmVhbS5hYm9ydChyZWFzb24pfS5cbiAgICovXG4gIGFib3J0KHJlYXNvbjogYW55ID0gdW5kZWZpbmVkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Fib3J0JykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vd25lcldyaXRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJMb2NrRXhjZXB0aW9uKCdhYm9ydCcpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyQWJvcnQodGhpcywgcmVhc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgcmVhZGVyIGlzIGFjdGl2ZSwgYmVoYXZlcyB0aGUgc2FtZSBhcyB7QGxpbmsgV3JpdGFibGVTdHJlYW0uY2xvc2UgfCBzdHJlYW0uY2xvc2UoKX0uXG4gICAqL1xuICBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyZWFtID0gdGhpcy5fb3duZXJXcml0YWJsZVN0cmVhbTtcblxuICAgIGlmIChzdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24oJ2Nsb3NlJykpO1xuICAgIH1cblxuICAgIGlmIChXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW0pKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2xvc2UgYW4gYWxyZWFkeS1jbG9zaW5nIHN0cmVhbScpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyQ2xvc2UodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVsZWFzZXMgdGhlIHdyaXRlclx1MjAxOXMgbG9jayBvbiB0aGUgY29ycmVzcG9uZGluZyBzdHJlYW0uIEFmdGVyIHRoZSBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgd3JpdGVyIGlzIG5vIGxvbmdlciBhY3RpdmUuXG4gICAqIElmIHRoZSBhc3NvY2lhdGVkIHN0cmVhbSBpcyBlcnJvcmVkIHdoZW4gdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSB3cml0ZXIgd2lsbCBhcHBlYXIgZXJyb3JlZCBpbiB0aGUgc2FtZSB3YXkgZnJvbVxuICAgKiBub3cgb247IG90aGVyd2lzZSwgdGhlIHdyaXRlciB3aWxsIGFwcGVhciBjbG9zZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgbG9jayBjYW4gc3RpbGwgYmUgcmVsZWFzZWQgZXZlbiBpZiBzb21lIG9uZ29pbmcgd3JpdGVzIGhhdmUgbm90IHlldCBmaW5pc2hlZCAoaS5lLiBldmVuIGlmIHRoZVxuICAgKiBwcm9taXNlcyByZXR1cm5lZCBmcm9tIHByZXZpb3VzIGNhbGxzIHRvIHtAbGluayBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIud3JpdGUgfCB3cml0ZSgpfSBoYXZlIG5vdCB5ZXQgc2V0dGxlZCkuXG4gICAqIEl0XHUyMDE5cyBub3QgbmVjZXNzYXJ5IHRvIGhvbGQgdGhlIGxvY2sgb24gdGhlIHdyaXRlciBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSB3cml0ZTsgdGhlIGxvY2sgaW5zdGVhZCBzaW1wbHkgcHJldmVudHNcbiAgICogb3RoZXIgcHJvZHVjZXJzIGZyb20gd3JpdGluZyBpbiBhbiBpbnRlcmxlYXZlZCBtYW5uZXIuXG4gICAqL1xuICByZWxlYXNlTG9jaygpOiB2b2lkIHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbigncmVsZWFzZUxvY2snKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuXG4gICAgaWYgKHN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXNzZXJ0KHN0cmVhbS5fd3JpdGVyICE9PSB1bmRlZmluZWQpO1xuXG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyUmVsZWFzZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgdGhlIGdpdmVuIGNodW5rIHRvIHRoZSB3cml0YWJsZSBzdHJlYW0sIGJ5IHdhaXRpbmcgdW50aWwgYW55IHByZXZpb3VzIHdyaXRlcyBoYXZlIGZpbmlzaGVkIHN1Y2Nlc3NmdWxseSxcbiAgICogYW5kIHRoZW4gc2VuZGluZyB0aGUgY2h1bmsgdG8gdGhlIHVuZGVybHlpbmcgc2luaydzIHtAbGluayBVbmRlcmx5aW5nU2luay53cml0ZSB8IHdyaXRlKCl9IG1ldGhvZC4gSXQgd2lsbCByZXR1cm5cbiAgICogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2l0aCB1bmRlZmluZWQgdXBvbiBhIHN1Y2Nlc3NmdWwgd3JpdGUsIG9yIHJlamVjdHMgaWYgdGhlIHdyaXRlIGZhaWxzIG9yIHN0cmVhbSBiZWNvbWVzXG4gICAqIGVycm9yZWQgYmVmb3JlIHRoZSB3cml0aW5nIHByb2Nlc3MgaXMgaW5pdGlhdGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hhdCBcInN1Y2Nlc3NcIiBtZWFucyBpcyB1cCB0byB0aGUgdW5kZXJseWluZyBzaW5rOyBpdCBtaWdodCBpbmRpY2F0ZSBzaW1wbHkgdGhhdCB0aGUgY2h1bmsgaGFzIGJlZW5cbiAgICogYWNjZXB0ZWQsIGFuZCBub3QgbmVjZXNzYXJpbHkgdGhhdCBpdCBpcyBzYWZlbHkgc2F2ZWQgdG8gaXRzIHVsdGltYXRlIGRlc3RpbmF0aW9uLlxuICAgKi9cbiAgd3JpdGUoY2h1bms6IFcpOiBQcm9taXNlPHZvaWQ+O1xuICB3cml0ZShjaHVuazogVyA9IHVuZGVmaW5lZCEpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignd3JpdGUnKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24oJ3dyaXRlIHRvJykpO1xuICAgIH1cblxuICAgIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJXcml0ZSh0aGlzLCBjaHVuayk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLnByb3RvdHlwZSwge1xuICBhYm9ydDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGNsb3NlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgcmVsZWFzZUxvY2s6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICB3cml0ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGNsb3NlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGRlc2lyZWRTaXplOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgcmVhZHk6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXInLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlci5cblxuZnVuY3Rpb24gSXNXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXI8VyA9IGFueT4oeDogYW55KTogeCBpcyBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXI8Vz4ge1xuICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfb3duZXJXcml0YWJsZVN0cmVhbScpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXI7XG59XG5cbi8vIEEgY2xpZW50IG9mIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlciBtYXkgdXNlIHRoZXNlIGZ1bmN0aW9ucyBkaXJlY3RseSB0byBieXBhc3Mgc3RhdGUgY2hlY2suXG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckFib3J0KHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLCByZWFzb246IGFueSkge1xuICBjb25zdCBzdHJlYW0gPSB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW07XG5cbiAgYXNzZXJ0KHN0cmVhbSAhPT0gdW5kZWZpbmVkKTtcblxuICByZXR1cm4gV3JpdGFibGVTdHJlYW1BYm9ydChzdHJlYW0sIHJlYXNvbik7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgY29uc3Qgc3RyZWFtID0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuXG4gIGFzc2VydChzdHJlYW0gIT09IHVuZGVmaW5lZCk7XG5cbiAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtQ2xvc2Uoc3RyZWFtKTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyQ2xvc2VXaXRoRXJyb3JQcm9wYWdhdGlvbih3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcik6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcblxuICBhc3NlcnQoc3RyZWFtICE9PSB1bmRlZmluZWQpO1xuXG4gIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgaWYgKFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkgfHwgc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGlmIChzdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gIH1cblxuICBhc3NlcnQoc3RhdGUgPT09ICd3cml0YWJsZScgfHwgc3RhdGUgPT09ICdlcnJvcmluZycpO1xuXG4gIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZSh3cml0ZXIpO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJFbnN1cmVDbG9zZWRQcm9taXNlUmVqZWN0ZWQod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIsIGVycm9yOiBhbnkpIHtcbiAgaWYgKHdyaXRlci5fY2xvc2VkUHJvbWlzZVN0YXRlID09PSAncGVuZGluZycpIHtcbiAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlamVjdCh3cml0ZXIsIGVycm9yKTtcbiAgfSBlbHNlIHtcbiAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlc2V0VG9SZWplY3RlZCh3cml0ZXIsIGVycm9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJFbnN1cmVSZWFkeVByb21pc2VSZWplY3RlZCh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlciwgZXJyb3I6IGFueSkge1xuICBpZiAod3JpdGVyLl9yZWFkeVByb21pc2VTdGF0ZSA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlamVjdCh3cml0ZXIsIGVycm9yKTtcbiAgfSBlbHNlIHtcbiAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzZXRUb1JlamVjdGVkKHdyaXRlciwgZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckdldERlc2lyZWRTaXplKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKTogbnVtYmVyIHwgbnVsbCB7XG4gIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuXG4gIGlmIChzdGF0ZSA9PT0gJ2Vycm9yZWQnIHx8IHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyKTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyUmVsZWFzZSh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcikge1xuICBjb25zdCBzdHJlYW0gPSB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW07XG4gIGFzc2VydChzdHJlYW0gIT09IHVuZGVmaW5lZCk7XG4gIGFzc2VydChzdHJlYW0uX3dyaXRlciA9PT0gd3JpdGVyKTtcblxuICBjb25zdCByZWxlYXNlZEVycm9yID0gbmV3IFR5cGVFcnJvcihcbiAgICBgV3JpdGVyIHdhcyByZWxlYXNlZCBhbmQgY2FuIG5vIGxvbmdlciBiZSB1c2VkIHRvIG1vbml0b3IgdGhlIHN0cmVhbSdzIGNsb3NlZG5lc3NgKTtcblxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJFbnN1cmVSZWFkeVByb21pc2VSZWplY3RlZCh3cml0ZXIsIHJlbGVhc2VkRXJyb3IpO1xuXG4gIC8vIFRoZSBzdGF0ZSB0cmFuc2l0aW9ucyB0byBcImVycm9yZWRcIiBiZWZvcmUgdGhlIHNpbmsgYWJvcnQoKSBtZXRob2QgcnVucywgYnV0IHRoZSB3cml0ZXIuY2xvc2VkIHByb21pc2UgaXMgbm90XG4gIC8vIHJlamVjdGVkIHVudGlsIGFmdGVyd2FyZHMuIFRoaXMgbWVhbnMgdGhhdCBzaW1wbHkgdGVzdGluZyBzdGF0ZSB3aWxsIG5vdCB3b3JrLlxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJFbnN1cmVDbG9zZWRQcm9taXNlUmVqZWN0ZWQod3JpdGVyLCByZWxlYXNlZEVycm9yKTtcblxuICBzdHJlYW0uX3dyaXRlciA9IHVuZGVmaW5lZDtcbiAgd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtID0gdW5kZWZpbmVkITtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyV3JpdGU8Vz4od3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXI8Vz4sIGNodW5rOiBXKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgY29uc3Qgc3RyZWFtID0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuXG4gIGFzc2VydChzdHJlYW0gIT09IHVuZGVmaW5lZCk7XG5cbiAgY29uc3QgY29udHJvbGxlciA9IHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyO1xuXG4gIGNvbnN0IGNodW5rU2l6ZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRDaHVua1NpemUoY29udHJvbGxlciwgY2h1bmspO1xuXG4gIGlmIChzdHJlYW0gIT09IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbSkge1xuICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJMb2NrRXhjZXB0aW9uKCd3cml0ZSB0bycpKTtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgaWYgKHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgfVxuICBpZiAoV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSB8fCBzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdUaGUgc3RyZWFtIGlzIGNsb3Npbmcgb3IgY2xvc2VkIGFuZCBjYW5ub3QgYmUgd3JpdHRlbiB0bycpKTtcbiAgfVxuICBpZiAoc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgfVxuXG4gIGFzc2VydChzdGF0ZSA9PT0gJ3dyaXRhYmxlJyk7XG5cbiAgY29uc3QgcHJvbWlzZSA9IFdyaXRhYmxlU3RyZWFtQWRkV3JpdGVSZXF1ZXN0KHN0cmVhbSk7XG5cbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcldyaXRlKGNvbnRyb2xsZXIsIGNodW5rLCBjaHVua1NpemUpO1xuXG4gIHJldHVybiBwcm9taXNlO1xufVxuXG5jb25zdCBjbG9zZVNlbnRpbmVsOiB1bmlxdWUgc3ltYm9sID0ge30gYXMgYW55O1xuXG50eXBlIFF1ZXVlUmVjb3JkPFc+ID0gVyB8IHR5cGVvZiBjbG9zZVNlbnRpbmVsO1xuXG4vKipcbiAqIEFsbG93cyBjb250cm9sIG9mIGEge0BsaW5rIFdyaXRhYmxlU3RyZWFtIHwgd3JpdGFibGUgc3RyZWFtfSdzIHN0YXRlIGFuZCBpbnRlcm5hbCBxdWV1ZS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjbGFzcyBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFcgPSBhbnk+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtITogV3JpdGFibGVTdHJlYW08Vz47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3F1ZXVlITogU2ltcGxlUXVldWU8UXVldWVQYWlyPFF1ZXVlUmVjb3JkPFc+Pj47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3F1ZXVlVG90YWxTaXplITogbnVtYmVyO1xuICAvKiogQGludGVybmFsICovXG4gIF9hYm9ydFJlYXNvbjogYW55O1xuICAvKiogQGludGVybmFsICovXG4gIF9hYm9ydENvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IHVuZGVmaW5lZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RhcnRlZCE6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobSE6IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxXPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RyYXRlZ3lIV00hOiBudW1iZXI7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3dyaXRlQWxnb3JpdGhtITogKGNodW5rOiBXKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAvKiogQGludGVybmFsICovXG4gIF9jbG9zZUFsZ29yaXRobSE6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Fib3J0QWxnb3JpdGhtITogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZWFzb24gd2hpY2ggd2FzIHBhc3NlZCB0byBgV3JpdGFibGVTdHJlYW0uYWJvcnQocmVhc29uKWAgd2hlbiB0aGUgc3RyZWFtIHdhcyBhYm9ydGVkLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKiAgVGhpcyBwcm9wZXJ0eSBoYXMgYmVlbiByZW1vdmVkIGZyb20gdGhlIHNwZWNpZmljYXRpb24sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2hhdHdnL3N0cmVhbXMvcHVsbC8xMTc3LlxuICAgKiAgVXNlIHtAbGluayBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnNpZ25hbH0ncyBgcmVhc29uYCBpbnN0ZWFkLlxuICAgKi9cbiAgZ2V0IGFib3J0UmVhc29uKCk6IGFueSB7XG4gICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignYWJvcnRSZWFzb24nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2Fib3J0UmVhc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIGBBYm9ydFNpZ25hbGAgdGhhdCBjYW4gYmUgdXNlZCB0byBhYm9ydCB0aGUgcGVuZGluZyB3cml0ZSBvciBjbG9zZSBvcGVyYXRpb24gd2hlbiB0aGUgc3RyZWFtIGlzIGFib3J0ZWQuXG4gICAqL1xuICBnZXQgc2lnbmFsKCk6IEFib3J0U2lnbmFsIHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdzaWduYWwnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2Fib3J0Q29udHJvbGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBPbGRlciBicm93c2VycyBvciBvbGRlciBOb2RlIHZlcnNpb25zIG1heSBub3Qgc3VwcG9ydCBgQWJvcnRDb250cm9sbGVyYCBvciBgQWJvcnRTaWduYWxgLlxuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBidW5kbGUgYW5kIHNoaXAgYW4gYEFib3J0Q29udHJvbGxlcmAgcG9seWZpbGwgdG9nZXRoZXIgd2l0aCBvdXIgcG9seWZpbGwsXG4gICAgICAvLyBzbyBpbnN0ZWFkIHdlIG9ubHkgaW1wbGVtZW50IHN1cHBvcnQgZm9yIGBzaWduYWxgIGlmIHdlIGZpbmQgYSBnbG9iYWwgYEFib3J0Q29udHJvbGxlcmAgY29uc3RydWN0b3IuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZS5zaWduYWwgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYWJvcnRDb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGNvbnRyb2xsZWQgd3JpdGFibGUgc3RyZWFtLCBtYWtpbmcgYWxsIGZ1dHVyZSBpbnRlcmFjdGlvbnMgd2l0aCBpdCBmYWlsIHdpdGggdGhlIGdpdmVuIGVycm9yIGBlYC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcmFyZWx5IHVzZWQsIHNpbmNlIHVzdWFsbHkgaXQgc3VmZmljZXMgdG8gcmV0dXJuIGEgcmVqZWN0ZWQgcHJvbWlzZSBmcm9tIG9uZSBvZiB0aGUgdW5kZXJseWluZ1xuICAgKiBzaW5rJ3MgbWV0aG9kcy4gSG93ZXZlciwgaXQgY2FuIGJlIHVzZWZ1bCBmb3Igc3VkZGVubHkgc2h1dHRpbmcgZG93biBhIHN0cmVhbSBpbiByZXNwb25zZSB0byBhbiBldmVudCBvdXRzaWRlIHRoZVxuICAgKiBub3JtYWwgbGlmZWN5Y2xlIG9mIGludGVyYWN0aW9ucyB3aXRoIHRoZSB1bmRlcmx5aW5nIHNpbmsuXG4gICAqL1xuICBlcnJvcihlOiBhbnkgPSB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdlcnJvcicpO1xuICAgIH1cbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlICE9PSAnd3JpdGFibGUnKSB7XG4gICAgICAvLyBUaGUgc3RyZWFtIGlzIGNsb3NlZCwgZXJyb3JlZCBvciB3aWxsIGJlIHNvb24uIFRoZSBzaW5rIGNhbid0IGRvIGFueXRoaW5nIHVzZWZ1bCBpZiBpdCBnZXRzIGFuIGVycm9yIGhlcmUsIHNvXG4gICAgICAvLyBqdXN0IHRyZWF0IGl0IGFzIGEgbm8tb3AuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKHRoaXMsIGUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBbQWJvcnRTdGVwc10ocmVhc29uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9hYm9ydEFsZ29yaXRobShyZWFzb24pO1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXModGhpcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgW0Vycm9yU3RlcHNdKCkge1xuICAgIFJlc2V0UXVldWUodGhpcyk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUsIHtcbiAgYWJvcnRSZWFzb246IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBzaWduYWw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBlcnJvcjogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyJyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgaW1wbGVtZW50aW5nIGludGVyZmFjZSByZXF1aXJlZCBieSB0aGUgV3JpdGFibGVTdHJlYW0uXG5cbmZ1bmN0aW9uIElzV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih4OiBhbnkpOiB4IGlzIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55PiB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19jb250cm9sbGVkV3JpdGFibGVTdHJlYW0nKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjtcbn1cblxuZnVuY3Rpb24gU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFc+KHN0cmVhbTogV3JpdGFibGVTdHJlYW08Vz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxXPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydEFsZ29yaXRobTogKCkgPT4gdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQWxnb3JpdGhtOiAoY2h1bms6IFcpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGdvcml0aG06ICgpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRBbGdvcml0aG06IChyZWFzb246IGFueSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoV2F0ZXJNYXJrOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZUFsZ29yaXRobTogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPFc+KSB7XG4gIGFzc2VydChJc1dyaXRhYmxlU3RyZWFtKHN0cmVhbSkpO1xuICBhc3NlcnQoc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIgPT09IHVuZGVmaW5lZCk7XG5cbiAgY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtID0gc3RyZWFtO1xuICBzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG5cbiAgLy8gTmVlZCB0byBzZXQgdGhlIHNsb3RzIHNvIHRoYXQgdGhlIGFzc2VydCBkb2Vzbid0IGZpcmUuIEluIHRoZSBzcGVjIHRoZSBzbG90cyBhbHJlYWR5IGV4aXN0IGltcGxpY2l0bHkuXG4gIGNvbnRyb2xsZXIuX3F1ZXVlID0gdW5kZWZpbmVkITtcbiAgY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgPSB1bmRlZmluZWQhO1xuICBSZXNldFF1ZXVlKGNvbnRyb2xsZXIpO1xuXG4gIGNvbnRyb2xsZXIuX2Fib3J0UmVhc29uID0gdW5kZWZpbmVkO1xuICBjb250cm9sbGVyLl9hYm9ydENvbnRyb2xsZXIgPSBjcmVhdGVBYm9ydENvbnRyb2xsZXIoKTtcbiAgY29udHJvbGxlci5fc3RhcnRlZCA9IGZhbHNlO1xuXG4gIGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobSA9IHNpemVBbGdvcml0aG07XG4gIGNvbnRyb2xsZXIuX3N0cmF0ZWd5SFdNID0gaGlnaFdhdGVyTWFyaztcblxuICBjb250cm9sbGVyLl93cml0ZUFsZ29yaXRobSA9IHdyaXRlQWxnb3JpdGhtO1xuICBjb250cm9sbGVyLl9jbG9zZUFsZ29yaXRobSA9IGNsb3NlQWxnb3JpdGhtO1xuICBjb250cm9sbGVyLl9hYm9ydEFsZ29yaXRobSA9IGFib3J0QWxnb3JpdGhtO1xuXG4gIGNvbnN0IGJhY2twcmVzc3VyZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRCYWNrcHJlc3N1cmUoY29udHJvbGxlcik7XG4gIFdyaXRhYmxlU3RyZWFtVXBkYXRlQmFja3ByZXNzdXJlKHN0cmVhbSwgYmFja3ByZXNzdXJlKTtcblxuICBjb25zdCBzdGFydFJlc3VsdCA9IHN0YXJ0QWxnb3JpdGhtKCk7XG4gIGNvbnN0IHN0YXJ0UHJvbWlzZSA9IHByb21pc2VSZXNvbHZlZFdpdGgoc3RhcnRSZXN1bHQpO1xuICB1cG9uUHJvbWlzZShcbiAgICBzdGFydFByb21pc2UsXG4gICAgKCkgPT4ge1xuICAgICAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICd3cml0YWJsZScgfHwgc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yaW5nJyk7XG4gICAgICBjb250cm9sbGVyLl9zdGFydGVkID0gdHJ1ZTtcbiAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJBZHZhbmNlUXVldWVJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICB9LFxuICAgIHIgPT4ge1xuICAgICAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICd3cml0YWJsZScgfHwgc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yaW5nJyk7XG4gICAgICBjb250cm9sbGVyLl9zdGFydGVkID0gdHJ1ZTtcbiAgICAgIFdyaXRhYmxlU3RyZWFtRGVhbFdpdGhSZWplY3Rpb24oc3RyZWFtLCByKTtcbiAgICB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIFNldFVwV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21VbmRlcmx5aW5nU2luazxXPihzdHJlYW06IFdyaXRhYmxlU3RyZWFtPFc+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdTaW5rOiBWYWxpZGF0ZWRVbmRlcmx5aW5nU2luazxXPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoV2F0ZXJNYXJrOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZUFsZ29yaXRobTogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPFc+KSB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBPYmplY3QuY3JlYXRlKFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlKTtcblxuICBsZXQgc3RhcnRBbGdvcml0aG06ICgpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPiA9ICgpID0+IHVuZGVmaW5lZDtcbiAgbGV0IHdyaXRlQWxnb3JpdGhtOiAoY2h1bms6IFcpID0+IFByb21pc2U8dm9pZD4gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gIGxldCBjbG9zZUFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPiA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgbGV0IGFib3J0QWxnb3JpdGhtOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD4gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG5cbiAgaWYgKHVuZGVybHlpbmdTaW5rLnN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydEFsZ29yaXRobSA9ICgpID0+IHVuZGVybHlpbmdTaW5rLnN0YXJ0IShjb250cm9sbGVyKTtcbiAgfVxuICBpZiAodW5kZXJseWluZ1Npbmsud3JpdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHdyaXRlQWxnb3JpdGhtID0gY2h1bmsgPT4gdW5kZXJseWluZ1Npbmsud3JpdGUhKGNodW5rLCBjb250cm9sbGVyKTtcbiAgfVxuICBpZiAodW5kZXJseWluZ1NpbmsuY2xvc2UgIT09IHVuZGVmaW5lZCkge1xuICAgIGNsb3NlQWxnb3JpdGhtID0gKCkgPT4gdW5kZXJseWluZ1NpbmsuY2xvc2UhKCk7XG4gIH1cbiAgaWYgKHVuZGVybHlpbmdTaW5rLmFib3J0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBhYm9ydEFsZ29yaXRobSA9IHJlYXNvbiA9PiB1bmRlcmx5aW5nU2luay5hYm9ydCEocmVhc29uKTtcbiAgfVxuXG4gIFNldFVwV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcihcbiAgICBzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCB3cml0ZUFsZ29yaXRobSwgY2xvc2VBbGdvcml0aG0sIGFib3J0QWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtXG4gICk7XG59XG5cbi8vIENsZWFyQWxnb3JpdGhtcyBtYXkgYmUgY2FsbGVkIHR3aWNlLiBFcnJvcmluZyB0aGUgc2FtZSBzdHJlYW0gaW4gbXVsdGlwbGUgd2F5cyB3aWxsIG9mdGVuIHJlc3VsdCBpbiByZWR1bmRhbnQgY2FsbHMuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55Pikge1xuICBjb250cm9sbGVyLl93cml0ZUFsZ29yaXRobSA9IHVuZGVmaW5lZCE7XG4gIGNvbnRyb2xsZXIuX2Nsb3NlQWxnb3JpdGhtID0gdW5kZWZpbmVkITtcbiAgY29udHJvbGxlci5fYWJvcnRBbGdvcml0aG0gPSB1bmRlZmluZWQhO1xuICBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0gPSB1bmRlZmluZWQhO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2U8Vz4oY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxXPikge1xuICBFbnF1ZXVlVmFsdWVXaXRoU2l6ZShjb250cm9sbGVyLCBjbG9zZVNlbnRpbmVsLCAwKTtcbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckFkdmFuY2VRdWV1ZUlmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0Q2h1bmtTaXplPFc+KGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Vz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rOiBXKTogbnVtYmVyIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY29udHJvbGxlci5fc3RyYXRlZ3lTaXplQWxnb3JpdGhtKGNodW5rKTtcbiAgfSBjYXRjaCAoY2h1bmtTaXplRSkge1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkKGNvbnRyb2xsZXIsIGNodW5rU2l6ZUUpO1xuICAgIHJldHVybiAxO1xuICB9XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZShjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT4pOiBudW1iZXIge1xuICByZXR1cm4gY29udHJvbGxlci5fc3RyYXRlZ3lIV00gLSBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcldyaXRlPFc+KGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Vz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2h1bms6IFcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmtTaXplOiBudW1iZXIpIHtcbiAgdHJ5IHtcbiAgICBFbnF1ZXVlVmFsdWVXaXRoU2l6ZShjb250cm9sbGVyLCBjaHVuaywgY2h1bmtTaXplKTtcbiAgfSBjYXRjaCAoZW5xdWV1ZUUpIHtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3JJZk5lZWRlZChjb250cm9sbGVyLCBlbnF1ZXVlRSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuICBpZiAoIVdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkgJiYgc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgIGNvbnN0IGJhY2twcmVzc3VyZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRCYWNrcHJlc3N1cmUoY29udHJvbGxlcik7XG4gICAgV3JpdGFibGVTdHJlYW1VcGRhdGVCYWNrcHJlc3N1cmUoc3RyZWFtLCBiYWNrcHJlc3N1cmUpO1xuICB9XG5cbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckFkdmFuY2VRdWV1ZUlmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckFkdmFuY2VRdWV1ZUlmTmVlZGVkPFc+KGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Vz4pIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuXG4gIGlmICghY29udHJvbGxlci5fc3RhcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gIGFzc2VydChzdGF0ZSAhPT0gJ2Nsb3NlZCcgJiYgc3RhdGUgIT09ICdlcnJvcmVkJyk7XG4gIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgIFdyaXRhYmxlU3RyZWFtRmluaXNoRXJyb3Jpbmcoc3RyZWFtKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY29udHJvbGxlci5fcXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdmFsdWUgPSBQZWVrUXVldWVWYWx1ZShjb250cm9sbGVyKTtcbiAgaWYgKHZhbHVlID09PSBjbG9zZVNlbnRpbmVsKSB7XG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclByb2Nlc3NDbG9zZShjb250cm9sbGVyKTtcbiAgfSBlbHNlIHtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyUHJvY2Vzc1dyaXRlKGNvbnRyb2xsZXIsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3JJZk5lZWRlZChjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT4sIGVycm9yOiBhbnkpIHtcbiAgaWYgKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbS5fc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQcm9jZXNzQ2xvc2UoY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+KSB7XG4gIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbTtcblxuICBXcml0YWJsZVN0cmVhbU1hcmtDbG9zZVJlcXVlc3RJbkZsaWdodChzdHJlYW0pO1xuXG4gIERlcXVldWVWYWx1ZShjb250cm9sbGVyKTtcbiAgYXNzZXJ0KGNvbnRyb2xsZXIuX3F1ZXVlLmxlbmd0aCA9PT0gMCk7XG5cbiAgY29uc3Qgc2lua0Nsb3NlUHJvbWlzZSA9IGNvbnRyb2xsZXIuX2Nsb3NlQWxnb3JpdGhtKCk7XG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gIHVwb25Qcm9taXNlKFxuICAgIHNpbmtDbG9zZVByb21pc2UsXG4gICAgKCkgPT4ge1xuICAgICAgV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodENsb3NlKHN0cmVhbSk7XG4gICAgfSxcbiAgICByZWFzb24gPT4ge1xuICAgICAgV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodENsb3NlV2l0aEVycm9yKHN0cmVhbSwgcmVhc29uKTtcbiAgICB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQcm9jZXNzV3JpdGU8Vz4oY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxXPiwgY2h1bms6IFcpIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuXG4gIFdyaXRhYmxlU3RyZWFtTWFya0ZpcnN0V3JpdGVSZXF1ZXN0SW5GbGlnaHQoc3RyZWFtKTtcblxuICBjb25zdCBzaW5rV3JpdGVQcm9taXNlID0gY29udHJvbGxlci5fd3JpdGVBbGdvcml0aG0oY2h1bmspO1xuICB1cG9uUHJvbWlzZShcbiAgICBzaW5rV3JpdGVQcm9taXNlLFxuICAgICgpID0+IHtcbiAgICAgIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRXcml0ZShzdHJlYW0pO1xuXG4gICAgICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gICAgICBhc3NlcnQoc3RhdGUgPT09ICd3cml0YWJsZScgfHwgc3RhdGUgPT09ICdlcnJvcmluZycpO1xuXG4gICAgICBEZXF1ZXVlVmFsdWUoY29udHJvbGxlcik7XG5cbiAgICAgIGlmICghV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSAmJiBzdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgICAgICBjb25zdCBiYWNrcHJlc3N1cmUgPSBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0QmFja3ByZXNzdXJlKGNvbnRyb2xsZXIpO1xuICAgICAgICBXcml0YWJsZVN0cmVhbVVwZGF0ZUJhY2twcmVzc3VyZShzdHJlYW0sIGJhY2twcmVzc3VyZSk7XG4gICAgICB9XG5cbiAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJBZHZhbmNlUXVldWVJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICB9LFxuICAgIHJlYXNvbiA9PiB7XG4gICAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgICAgfVxuICAgICAgV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodFdyaXRlV2l0aEVycm9yKHN0cmVhbSwgcmVhc29uKTtcbiAgICB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRCYWNrcHJlc3N1cmUoY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+KTogYm9vbGVhbiB7XG4gIGNvbnN0IGRlc2lyZWRTaXplID0gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXIpO1xuICByZXR1cm4gZGVzaXJlZFNpemUgPD0gMDtcbn1cblxuLy8gQSBjbGllbnQgb2YgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlciBtYXkgdXNlIHRoZXNlIGZ1bmN0aW9ucyBkaXJlY3RseSB0byBieXBhc3Mgc3RhdGUgY2hlY2suXG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT4sIGVycm9yOiBhbnkpIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuXG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnKTtcblxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICBXcml0YWJsZVN0cmVhbVN0YXJ0RXJyb3Jpbmcoc3RyZWFtLCBlcnJvcik7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBXcml0YWJsZVN0cmVhbS5cblxuZnVuY3Rpb24gc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihgV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFdyaXRhYmxlU3RyZWFtYCk7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLlxuXG5mdW5jdGlvbiBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXG4gICAgYFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJgKTtcbn1cblxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLlxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcbiAgICBgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJgKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCAnICsgbmFtZSArICcgYSBzdHJlYW0gdXNpbmcgYSByZWxlYXNlZCB3cml0ZXInKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKSB7XG4gIHdyaXRlci5fY2xvc2VkUHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gcmVqZWN0O1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZVN0YXRlID0gJ3BlbmRpbmcnO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlciwgcmVhc29uOiBhbnkpIHtcbiAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHdyaXRlcik7XG4gIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVqZWN0KHdyaXRlciwgcmVhc29uKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZCh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcikge1xuICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUod3JpdGVyKTtcbiAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZXNvbHZlKHdyaXRlcik7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVqZWN0KHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLCByZWFzb246IGFueSkge1xuICBpZiAod3JpdGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFzc2VydCh3cml0ZXIuX2Nsb3NlZFByb21pc2VTdGF0ZSA9PT0gJ3BlbmRpbmcnKTtcblxuICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlKHdyaXRlci5fY2xvc2VkUHJvbWlzZSk7XG4gIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QocmVhc29uKTtcbiAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPSB1bmRlZmluZWQ7XG4gIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPSB1bmRlZmluZWQ7XG4gIHdyaXRlci5fY2xvc2VkUHJvbWlzZVN0YXRlID0gJ3JlamVjdGVkJztcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZXNldFRvUmVqZWN0ZWQod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIsIHJlYXNvbjogYW55KSB7XG4gIGFzc2VydCh3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9PT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPT09IHVuZGVmaW5lZCk7XG4gIGFzc2VydCh3cml0ZXIuX2Nsb3NlZFByb21pc2VTdGF0ZSAhPT0gJ3BlbmRpbmcnKTtcblxuICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHdyaXRlciwgcmVhc29uKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZXNvbHZlKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKSB7XG4gIGlmICh3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFzc2VydCh3cml0ZXIuX2Nsb3NlZFByb21pc2VTdGF0ZSA9PT0gJ3BlbmRpbmcnKTtcblxuICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSh1bmRlZmluZWQpO1xuICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbiAgd3JpdGVyLl9jbG9zZWRQcm9taXNlU3RhdGUgPSAncmVzb2x2ZWQnO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcikge1xuICB3cml0ZXIuX3JlYWR5UHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdyaXRlci5fcmVhZHlQcm9taXNlX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9IHJlamVjdDtcbiAgfSk7XG4gIHdyaXRlci5fcmVhZHlQcm9taXNlU3RhdGUgPSAncGVuZGluZyc7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlciwgcmVhc29uOiBhbnkpIHtcbiAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemUod3JpdGVyKTtcbiAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlamVjdCh3cml0ZXIsIHJlYXNvbik7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZCh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcikge1xuICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xuICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzb2x2ZSh3cml0ZXIpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVqZWN0KHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLCByZWFzb246IGFueSkge1xuICBpZiAod3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlKHdyaXRlci5fcmVhZHlQcm9taXNlKTtcbiAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0KHJlYXNvbik7XG4gIHdyaXRlci5fcmVhZHlQcm9taXNlX3Jlc29sdmUgPSB1bmRlZmluZWQ7XG4gIHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbiAgd3JpdGVyLl9yZWFkeVByb21pc2VTdGF0ZSA9ICdyZWplY3RlZCc7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNldCh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcikge1xuICBhc3NlcnQod3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSA9PT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9PT0gdW5kZWZpbmVkKTtcblxuICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzZXRUb1JlamVjdGVkKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLCByZWFzb246IGFueSkge1xuICBhc3NlcnQod3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSA9PT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9PT0gdW5kZWZpbmVkKTtcblxuICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQod3JpdGVyLCByZWFzb24pO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzb2x2ZSh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcikge1xuICBpZiAod3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSh1bmRlZmluZWQpO1xuICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZWplY3QgPSB1bmRlZmluZWQ7XG4gIHdyaXRlci5fcmVhZHlQcm9taXNlU3RhdGUgPSAnZnVsZmlsbGVkJztcbn1cbiIsICIvLy8gPHJlZmVyZW5jZSBsaWI9XCJkb21cIiAvPlxuZXhwb3J0IGNvbnN0IE5hdGl2ZURPTUV4Y2VwdGlvbjogdHlwZW9mIERPTUV4Y2VwdGlvbiB8IHVuZGVmaW5lZCA9XG4gIHR5cGVvZiBET01FeGNlcHRpb24gIT09ICd1bmRlZmluZWQnID8gRE9NRXhjZXB0aW9uIDogdW5kZWZpbmVkO1xuIiwgIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwibm9kZVwiIC8+XG5pbXBvcnQgeyBOYXRpdmVET01FeGNlcHRpb24gfSBmcm9tICcuL25hdGl2ZSc7XG5cbmRlY2xhcmUgY2xhc3MgRE9NRXhjZXB0aW9uQ2xhc3MgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpO1xuXG4gIG5hbWU6IHN0cmluZztcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG50eXBlIERPTUV4Y2VwdGlvbiA9IERPTUV4Y2VwdGlvbkNsYXNzO1xudHlwZSBET01FeGNlcHRpb25Db25zdHJ1Y3RvciA9IHR5cGVvZiBET01FeGNlcHRpb25DbGFzcztcblxuZnVuY3Rpb24gaXNET01FeGNlcHRpb25Db25zdHJ1Y3RvcihjdG9yOiB1bmtub3duKTogY3RvciBpcyBET01FeGNlcHRpb25Db25zdHJ1Y3RvciB7XG4gIGlmICghKHR5cGVvZiBjdG9yID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBjdG9yID09PSAnb2JqZWN0JykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICBuZXcgKGN0b3IgYXMgRE9NRXhjZXB0aW9uQ29uc3RydWN0b3IpKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVET01FeGNlcHRpb25Qb2x5ZmlsbCgpOiBET01FeGNlcHRpb25Db25zdHJ1Y3RvciB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcbiAgY29uc3QgY3RvciA9IGZ1bmN0aW9uIERPTUV4Y2VwdGlvbih0aGlzOiBET01FeGNlcHRpb24sIG1lc3NhZ2U/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8ICcnO1xuICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgJ0Vycm9yJztcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cbiAgfSBhcyBhbnk7XG4gIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3Rvci5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIHsgdmFsdWU6IGN0b3IsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gIHJldHVybiBjdG9yO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5jb25zdCBET01FeGNlcHRpb246IERPTUV4Y2VwdGlvbkNvbnN0cnVjdG9yID1cbiAgaXNET01FeGNlcHRpb25Db25zdHJ1Y3RvcihOYXRpdmVET01FeGNlcHRpb24pID8gTmF0aXZlRE9NRXhjZXB0aW9uIDogY3JlYXRlRE9NRXhjZXB0aW9uUG9seWZpbGwoKTtcblxuZXhwb3J0IHsgRE9NRXhjZXB0aW9uIH07XG4iLCAiaW1wb3J0IHsgSXNSZWFkYWJsZVN0cmVhbSwgSXNSZWFkYWJsZVN0cmVhbUxvY2tlZCwgUmVhZGFibGVTdHJlYW0sIFJlYWRhYmxlU3RyZWFtQ2FuY2VsIH0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtJztcbmltcG9ydCB7IEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIsIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQgfSBmcm9tICcuL2RlZmF1bHQtcmVhZGVyJztcbmltcG9ydCB7IFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UgfSBmcm9tICcuL2dlbmVyaWMtcmVhZGVyJztcbmltcG9ydCB7XG4gIEFjcXVpcmVXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIsXG4gIElzV3JpdGFibGVTdHJlYW0sXG4gIElzV3JpdGFibGVTdHJlYW1Mb2NrZWQsXG4gIFdyaXRhYmxlU3RyZWFtLFxuICBXcml0YWJsZVN0cmVhbUFib3J0LFxuICBXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodCxcbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyQ2xvc2VXaXRoRXJyb3JQcm9wYWdhdGlvbixcbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyUmVsZWFzZSxcbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyV3JpdGVcbn0gZnJvbSAnLi4vd3JpdGFibGUtc3RyZWFtJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuaW1wb3J0IHtcbiAgbmV3UHJvbWlzZSxcbiAgUGVyZm9ybVByb21pc2VUaGVuLFxuICBwcm9taXNlUmVzb2x2ZWRXaXRoLFxuICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlLFxuICB1cG9uRnVsZmlsbG1lbnQsXG4gIHVwb25Qcm9taXNlLFxuICB1cG9uUmVqZWN0aW9uXG59IGZyb20gJy4uL2hlbHBlcnMvd2ViaWRsJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBBYm9ydFNpZ25hbCwgaXNBYm9ydFNpZ25hbCB9IGZyb20gJy4uL2Fib3J0LXNpZ25hbCc7XG5pbXBvcnQgeyBET01FeGNlcHRpb24gfSBmcm9tICcuLi8uLi9zdHViL2RvbS1leGNlcHRpb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1QaXBlVG88VD4oc291cmNlOiBSZWFkYWJsZVN0cmVhbTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0OiBXcml0YWJsZVN0cmVhbTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50Q2xvc2U6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVudEFib3J0OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnRDYW5jZWw6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbCB8IHVuZGVmaW5lZCk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gIGFzc2VydChJc1JlYWRhYmxlU3RyZWFtKHNvdXJjZSkpO1xuICBhc3NlcnQoSXNXcml0YWJsZVN0cmVhbShkZXN0KSk7XG4gIGFzc2VydCh0eXBlb2YgcHJldmVudENsb3NlID09PSAnYm9vbGVhbicpO1xuICBhc3NlcnQodHlwZW9mIHByZXZlbnRBYm9ydCA9PT0gJ2Jvb2xlYW4nKTtcbiAgYXNzZXJ0KHR5cGVvZiBwcmV2ZW50Q2FuY2VsID09PSAnYm9vbGVhbicpO1xuICBhc3NlcnQoc2lnbmFsID09PSB1bmRlZmluZWQgfHwgaXNBYm9ydFNpZ25hbChzaWduYWwpKTtcbiAgYXNzZXJ0KCFJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHNvdXJjZSkpO1xuICBhc3NlcnQoIUlzV3JpdGFibGVTdHJlYW1Mb2NrZWQoZGVzdCkpO1xuXG4gIGNvbnN0IHJlYWRlciA9IEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8VD4oc291cmNlKTtcbiAgY29uc3Qgd3JpdGVyID0gQWNxdWlyZVdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcjxUPihkZXN0KTtcblxuICBzb3VyY2UuX2Rpc3R1cmJlZCA9IHRydWU7XG5cbiAgbGV0IHNodXR0aW5nRG93biA9IGZhbHNlO1xuXG4gIC8vIFRoaXMgaXMgdXNlZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBzcGVjJ3MgcmVxdWlyZW1lbnQgdGhhdCB3ZSB3YWl0IGZvciBvbmdvaW5nIHdyaXRlcyBkdXJpbmcgc2h1dGRvd24uXG4gIGxldCBjdXJyZW50V3JpdGUgPSBwcm9taXNlUmVzb2x2ZWRXaXRoPHZvaWQ+KHVuZGVmaW5lZCk7XG5cbiAgcmV0dXJuIG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBhYm9ydEFsZ29yaXRobTogKCkgPT4gdm9pZDtcbiAgICBpZiAoc2lnbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFib3J0QWxnb3JpdGhtID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpO1xuICAgICAgICBjb25zdCBhY3Rpb25zOiBBcnJheTwoKSA9PiBQcm9taXNlPHZvaWQ+PiA9IFtdO1xuICAgICAgICBpZiAoIXByZXZlbnRBYm9ydCkge1xuICAgICAgICAgIGFjdGlvbnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVzdC5fc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtQWJvcnQoZGVzdCwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByZXZlbnRDYW5jZWwpIHtcbiAgICAgICAgICBhY3Rpb25zLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5fc3RhdGUgPT09ICdyZWFkYWJsZScpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHNvdXJjZSwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzaHV0ZG93bldpdGhBY3Rpb24oKCkgPT4gUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbigpKSksIHRydWUsIGVycm9yKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChzaWduYWwuYWJvcnRlZCkge1xuICAgICAgICBhYm9ydEFsZ29yaXRobSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QWxnb3JpdGhtKTtcbiAgICB9XG5cbiAgICAvLyBVc2luZyByZWFkZXIgYW5kIHdyaXRlciwgcmVhZCBhbGwgY2h1bmtzIGZyb20gdGhpcyBhbmQgd3JpdGUgdGhlbSB0byBkZXN0XG4gICAgLy8gLSBCYWNrcHJlc3N1cmUgbXVzdCBiZSBlbmZvcmNlZFxuICAgIC8vIC0gU2h1dGRvd24gbXVzdCBzdG9wIGFsbCBhY3Rpdml0eVxuICAgIGZ1bmN0aW9uIHBpcGVMb29wKCkge1xuICAgICAgcmV0dXJuIG5ld1Byb21pc2U8dm9pZD4oKHJlc29sdmVMb29wLCByZWplY3RMb29wKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoZG9uZTogYm9vbGVhbikge1xuICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICByZXNvbHZlTG9vcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBVc2UgYFBlcmZvcm1Qcm9taXNlVGhlbmAgaW5zdGVhZCBvZiBgdXBvblByb21pc2VgIHRvIGF2b2lkXG4gICAgICAgICAgICAvLyBhZGRpbmcgdW5uZWNlc3NhcnkgYC5jYXRjaChyZXRocm93QXNzZXJ0aW9uRXJyb3JSZWplY3Rpb24pYCBoYW5kbGVyc1xuICAgICAgICAgICAgUGVyZm9ybVByb21pc2VUaGVuKHBpcGVTdGVwKCksIG5leHQsIHJlamVjdExvb3ApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5leHQoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGlwZVN0ZXAoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICBpZiAoc2h1dHRpbmdEb3duKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHRydWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUGVyZm9ybVByb21pc2VUaGVuKHdyaXRlci5fcmVhZHlQcm9taXNlLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXdQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlUmVhZCwgcmVqZWN0UmVhZCkgPT4ge1xuICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQoXG4gICAgICAgICAgICByZWFkZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIF9jaHVua1N0ZXBzOiBjaHVuayA9PiB7XG4gICAgICAgICAgICAgICAgY3VycmVudFdyaXRlID0gUGVyZm9ybVByb21pc2VUaGVuKFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcldyaXRlKHdyaXRlciwgY2h1bmspLCB1bmRlZmluZWQsIG5vb3ApO1xuICAgICAgICAgICAgICAgIHJlc29sdmVSZWFkKGZhbHNlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHJlc29sdmVSZWFkKHRydWUpLFxuICAgICAgICAgICAgICBfZXJyb3JTdGVwczogcmVqZWN0UmVhZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRXJyb3JzIG11c3QgYmUgcHJvcGFnYXRlZCBmb3J3YXJkXG4gICAgaXNPckJlY29tZXNFcnJvcmVkKHNvdXJjZSwgcmVhZGVyLl9jbG9zZWRQcm9taXNlLCBzdG9yZWRFcnJvciA9PiB7XG4gICAgICBpZiAoIXByZXZlbnRBYm9ydCkge1xuICAgICAgICBzaHV0ZG93bldpdGhBY3Rpb24oKCkgPT4gV3JpdGFibGVTdHJlYW1BYm9ydChkZXN0LCBzdG9yZWRFcnJvciksIHRydWUsIHN0b3JlZEVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNodXRkb3duKHRydWUsIHN0b3JlZEVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEVycm9ycyBtdXN0IGJlIHByb3BhZ2F0ZWQgYmFja3dhcmRcbiAgICBpc09yQmVjb21lc0Vycm9yZWQoZGVzdCwgd3JpdGVyLl9jbG9zZWRQcm9taXNlLCBzdG9yZWRFcnJvciA9PiB7XG4gICAgICBpZiAoIXByZXZlbnRDYW5jZWwpIHtcbiAgICAgICAgc2h1dGRvd25XaXRoQWN0aW9uKCgpID0+IFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHNvdXJjZSwgc3RvcmVkRXJyb3IpLCB0cnVlLCBzdG9yZWRFcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaHV0ZG93bih0cnVlLCBzdG9yZWRFcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDbG9zaW5nIG11c3QgYmUgcHJvcGFnYXRlZCBmb3J3YXJkXG4gICAgaXNPckJlY29tZXNDbG9zZWQoc291cmNlLCByZWFkZXIuX2Nsb3NlZFByb21pc2UsICgpID0+IHtcbiAgICAgIGlmICghcHJldmVudENsb3NlKSB7XG4gICAgICAgIHNodXRkb3duV2l0aEFjdGlvbigoKSA9PiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZVdpdGhFcnJvclByb3BhZ2F0aW9uKHdyaXRlcikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2h1dGRvd24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENsb3NpbmcgbXVzdCBiZSBwcm9wYWdhdGVkIGJhY2t3YXJkXG4gICAgaWYgKFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KGRlc3QpIHx8IGRlc3QuX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgY29uc3QgZGVzdENsb3NlZCA9IG5ldyBUeXBlRXJyb3IoJ3RoZSBkZXN0aW5hdGlvbiB3cml0YWJsZSBzdHJlYW0gY2xvc2VkIGJlZm9yZSBhbGwgZGF0YSBjb3VsZCBiZSBwaXBlZCB0byBpdCcpO1xuXG4gICAgICBpZiAoIXByZXZlbnRDYW5jZWwpIHtcbiAgICAgICAgc2h1dGRvd25XaXRoQWN0aW9uKCgpID0+IFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHNvdXJjZSwgZGVzdENsb3NlZCksIHRydWUsIGRlc3RDbG9zZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2h1dGRvd24odHJ1ZSwgZGVzdENsb3NlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZShwaXBlTG9vcCgpKTtcblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JXcml0ZXNUb0ZpbmlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgIC8vIEFub3RoZXIgd3JpdGUgbWF5IGhhdmUgc3RhcnRlZCB3aGlsZSB3ZSB3ZXJlIHdhaXRpbmcgb24gdGhpcyBjdXJyZW50V3JpdGUsIHNvIHdlIGhhdmUgdG8gYmUgc3VyZSB0byB3YWl0XG4gICAgICAvLyBmb3IgdGhhdCB0b28uXG4gICAgICBjb25zdCBvbGRDdXJyZW50V3JpdGUgPSBjdXJyZW50V3JpdGU7XG4gICAgICByZXR1cm4gUGVyZm9ybVByb21pc2VUaGVuKFxuICAgICAgICBjdXJyZW50V3JpdGUsXG4gICAgICAgICgpID0+IG9sZEN1cnJlbnRXcml0ZSAhPT0gY3VycmVudFdyaXRlID8gd2FpdEZvcldyaXRlc1RvRmluaXNoKCkgOiB1bmRlZmluZWRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPckJlY29tZXNFcnJvcmVkKHN0cmVhbTogUmVhZGFibGVTdHJlYW0gfCBXcml0YWJsZVN0cmVhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZTogUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAocmVhc29uOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgYWN0aW9uKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBvblJlamVjdGlvbihwcm9taXNlLCBhY3Rpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzT3JCZWNvbWVzQ2xvc2VkKHN0cmVhbTogUmVhZGFibGVTdHJlYW0gfCBXcml0YWJsZVN0cmVhbSwgcHJvbWlzZTogUHJvbWlzZTx2b2lkPiwgYWN0aW9uOiAoKSA9PiB2b2lkKSB7XG4gICAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgYWN0aW9uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cG9uRnVsZmlsbG1lbnQocHJvbWlzZSwgYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHV0ZG93bldpdGhBY3Rpb24oYWN0aW9uOiAoKSA9PiBQcm9taXNlPHVua25vd24+LCBvcmlnaW5hbElzRXJyb3I/OiBib29sZWFuLCBvcmlnaW5hbEVycm9yPzogYW55KSB7XG4gICAgICBpZiAoc2h1dHRpbmdEb3duKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNodXR0aW5nRG93biA9IHRydWU7XG5cbiAgICAgIGlmIChkZXN0Ll9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyAmJiAhV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoZGVzdCkpIHtcbiAgICAgICAgdXBvbkZ1bGZpbGxtZW50KHdhaXRGb3JXcml0ZXNUb0ZpbmlzaCgpLCBkb1RoZVJlc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9UaGVSZXN0KCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRvVGhlUmVzdCgpIHtcbiAgICAgICAgdXBvblByb21pc2UoXG4gICAgICAgICAgYWN0aW9uKCksXG4gICAgICAgICAgKCkgPT4gZmluYWxpemUob3JpZ2luYWxJc0Vycm9yLCBvcmlnaW5hbEVycm9yKSxcbiAgICAgICAgICBuZXdFcnJvciA9PiBmaW5hbGl6ZSh0cnVlLCBuZXdFcnJvcilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHV0ZG93bihpc0Vycm9yPzogYm9vbGVhbiwgZXJyb3I/OiBhbnkpIHtcbiAgICAgIGlmIChzaHV0dGluZ0Rvd24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2h1dHRpbmdEb3duID0gdHJ1ZTtcblxuICAgICAgaWYgKGRlc3QuX3N0YXRlID09PSAnd3JpdGFibGUnICYmICFXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChkZXN0KSkge1xuICAgICAgICB1cG9uRnVsZmlsbG1lbnQod2FpdEZvcldyaXRlc1RvRmluaXNoKCksICgpID0+IGZpbmFsaXplKGlzRXJyb3IsIGVycm9yKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaW5hbGl6ZShpc0Vycm9yLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluYWxpemUoaXNFcnJvcj86IGJvb2xlYW4sIGVycm9yPzogYW55KSB7XG4gICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJSZWxlYXNlKHdyaXRlcik7XG4gICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG5cbiAgICAgIGlmIChzaWduYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFsZ29yaXRobSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNFcnJvcikge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrIH0gZnJvbSAnLi4vcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJy4uLy4uL3N0dWIvYXNzZXJ0JztcbmltcG9ydCB7IERlcXVldWVWYWx1ZSwgRW5xdWV1ZVZhbHVlV2l0aFNpemUsIFF1ZXVlUGFpciwgUmVzZXRRdWV1ZSB9IGZyb20gJy4uL2Fic3RyYWN0LW9wcy9xdWV1ZS13aXRoLXNpemVzJztcbmltcG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtQWRkUmVhZFJlcXVlc3QsXG4gIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0LFxuICBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyxcbiAgUmVhZFJlcXVlc3Rcbn0gZnJvbSAnLi9kZWZhdWx0LXJlYWRlcic7XG5pbXBvcnQgeyBTaW1wbGVRdWV1ZSB9IGZyb20gJy4uL3NpbXBsZS1xdWV1ZSc7XG5pbXBvcnQgeyBJc1JlYWRhYmxlU3RyZWFtTG9ja2VkLCBSZWFkYWJsZVN0cmVhbSwgUmVhZGFibGVTdHJlYW1DbG9zZSwgUmVhZGFibGVTdHJlYW1FcnJvciB9IGZyb20gJy4uL3JlYWRhYmxlLXN0cmVhbSc7XG5pbXBvcnQgeyBWYWxpZGF0ZWRVbmRlcmx5aW5nU291cmNlIH0gZnJvbSAnLi91bmRlcmx5aW5nLXNvdXJjZSc7XG5pbXBvcnQgeyB0eXBlSXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHsgQ2FuY2VsU3RlcHMsIFB1bGxTdGVwcyB9IGZyb20gJy4uL2Fic3RyYWN0LW9wcy9pbnRlcm5hbC1tZXRob2RzJztcbmltcG9ydCB7IHByb21pc2VSZXNvbHZlZFdpdGgsIHVwb25Qcm9taXNlIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuXG4vKipcbiAqIEFsbG93cyBjb250cm9sIG9mIGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtIHwgcmVhZGFibGUgc3RyZWFtfSdzIHN0YXRlIGFuZCBpbnRlcm5hbCBxdWV1ZS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtITogUmVhZGFibGVTdHJlYW08Uj47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3F1ZXVlITogU2ltcGxlUXVldWU8UXVldWVQYWlyPFI+PjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcXVldWVUb3RhbFNpemUhOiBudW1iZXI7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0YXJ0ZWQhOiBib29sZWFuO1xuICAvKiogQGludGVybmFsICovXG4gIF9jbG9zZVJlcXVlc3RlZCE6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3B1bGxBZ2FpbiE6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3B1bGxpbmcgITogYm9vbGVhbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RyYXRlZ3lTaXplQWxnb3JpdGhtITogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPFI+O1xuICAvKiogQGludGVybmFsICovXG4gIF9zdHJhdGVneUhXTSE6IG51bWJlcjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHVsbEFsZ29yaXRobSE6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NhbmNlbEFsZ29yaXRobSE6IChyZWFzb246IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBkZXNpcmVkIHNpemUgdG8gZmlsbCB0aGUgY29udHJvbGxlZCBzdHJlYW0ncyBpbnRlcm5hbCBxdWV1ZS4gSXQgY2FuIGJlIG5lZ2F0aXZlLCBpZiB0aGUgcXVldWUgaXNcbiAgICogb3Zlci1mdWxsLiBBbiB1bmRlcmx5aW5nIHNvdXJjZSBvdWdodCB0byB1c2UgdGhpcyBpbmZvcm1hdGlvbiB0byBkZXRlcm1pbmUgd2hlbiBhbmQgaG93IHRvIGFwcGx5IGJhY2twcmVzc3VyZS5cbiAgICovXG4gIGdldCBkZXNpcmVkU2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdkZXNpcmVkU2l6ZScpO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBjb250cm9sbGVkIHJlYWRhYmxlIHN0cmVhbS4gQ29uc3VtZXJzIHdpbGwgc3RpbGwgYmUgYWJsZSB0byByZWFkIGFueSBwcmV2aW91c2x5LWVucXVldWVkIGNodW5rcyBmcm9tXG4gICAqIHRoZSBzdHJlYW0sIGJ1dCBvbmNlIHRob3NlIGFyZSByZWFkLCB0aGUgc3RyZWFtIHdpbGwgYmVjb21lIGNsb3NlZC5cbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Nsb3NlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FuQ2xvc2VPckVucXVldWUodGhpcykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBzdHJlYW0gaXMgbm90IGluIGEgc3RhdGUgdGhhdCBwZXJtaXRzIGNsb3NlJyk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVucXVldWVzIHRoZSBnaXZlbiBjaHVuayBgY2h1bmtgIGluIHRoZSBjb250cm9sbGVkIHJlYWRhYmxlIHN0cmVhbS5cbiAgICovXG4gIGVucXVldWUoY2h1bms6IFIpOiB2b2lkO1xuICBlbnF1ZXVlKGNodW5rOiBSID0gdW5kZWZpbmVkISk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2VucXVldWUnKTtcbiAgICB9XG5cbiAgICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZSh0aGlzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHN0cmVhbSBpcyBub3QgaW4gYSBzdGF0ZSB0aGF0IHBlcm1pdHMgZW5xdWV1ZScpO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZSh0aGlzLCBjaHVuayk7XG4gIH1cblxuICAvKipcbiAgICogRXJyb3JzIHRoZSBjb250cm9sbGVkIHJlYWRhYmxlIHN0cmVhbSwgbWFraW5nIGFsbCBmdXR1cmUgaW50ZXJhY3Rpb25zIHdpdGggaXQgZmFpbCB3aXRoIHRoZSBnaXZlbiBlcnJvciBgZWAuXG4gICAqL1xuICBlcnJvcihlOiBhbnkgPSB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdlcnJvcicpO1xuICAgIH1cblxuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcih0aGlzLCBlKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgW0NhbmNlbFN0ZXBzXShyZWFzb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIFJlc2V0UXVldWUodGhpcyk7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fY2FuY2VsQWxnb3JpdGhtKHJlYXNvbik7XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyh0aGlzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBbUHVsbFN0ZXBzXShyZWFkUmVxdWVzdDogUmVhZFJlcXVlc3Q8Uj4pOiB2b2lkIHtcbiAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9jb250cm9sbGVkUmVhZGFibGVTdHJlYW07XG5cbiAgICBpZiAodGhpcy5fcXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2h1bmsgPSBEZXF1ZXVlVmFsdWUodGhpcyk7XG5cbiAgICAgIGlmICh0aGlzLl9jbG9zZVJlcXVlc3RlZCAmJiB0aGlzLl9xdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyh0aGlzKTtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1DbG9zZShzdHJlYW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQodGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHJlYWRSZXF1ZXN0Ll9jaHVua1N0ZXBzKGNodW5rKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUmVhZGFibGVTdHJlYW1BZGRSZWFkUmVxdWVzdChzdHJlYW0sIHJlYWRSZXF1ZXN0KTtcbiAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKHRoaXMpO1xuICAgIH1cbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSwge1xuICBjbG9zZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGVucXVldWU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBlcnJvcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGRlc2lyZWRTaXplOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXInLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIuXG5cbmZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxSID0gYW55Pih4OiBhbnkpOiB4IGlzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4ge1xuICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55Pik6IHZvaWQge1xuICBjb25zdCBzaG91bGRQdWxsID0gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclNob3VsZENhbGxQdWxsKGNvbnRyb2xsZXIpO1xuICBpZiAoIXNob3VsZFB1bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY29udHJvbGxlci5fcHVsbGluZykge1xuICAgIGNvbnRyb2xsZXIuX3B1bGxBZ2FpbiA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXNzZXJ0KCFjb250cm9sbGVyLl9wdWxsQWdhaW4pO1xuXG4gIGNvbnRyb2xsZXIuX3B1bGxpbmcgPSB0cnVlO1xuXG4gIGNvbnN0IHB1bGxQcm9taXNlID0gY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSgpO1xuICB1cG9uUHJvbWlzZShcbiAgICBwdWxsUHJvbWlzZSxcbiAgICAoKSA9PiB7XG4gICAgICBjb250cm9sbGVyLl9wdWxsaW5nID0gZmFsc2U7XG5cbiAgICAgIGlmIChjb250cm9sbGVyLl9wdWxsQWdhaW4pIHtcbiAgICAgICAgY29udHJvbGxlci5fcHVsbEFnYWluID0gZmFsc2U7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZSA9PiB7XG4gICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZSk7XG4gICAgfVxuICApO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyU2hvdWxkQ2FsbFB1bGwoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+KTogYm9vbGVhbiB7XG4gIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbTtcblxuICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZShjb250cm9sbGVyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghY29udHJvbGxlci5fc3RhcnRlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkgJiYgUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkUmVxdWVzdHMoc3RyZWFtKSA+IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IGRlc2lyZWRTaXplID0gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXIpO1xuICBhc3NlcnQoZGVzaXJlZFNpemUgIT09IG51bGwpO1xuICBpZiAoZGVzaXJlZFNpemUhID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55Pikge1xuICBjb250cm9sbGVyLl9wdWxsQWxnb3JpdGhtID0gdW5kZWZpbmVkITtcbiAgY29udHJvbGxlci5fY2FuY2VsQWxnb3JpdGhtID0gdW5kZWZpbmVkITtcbiAgY29udHJvbGxlci5fc3RyYXRlZ3lTaXplQWxnb3JpdGhtID0gdW5kZWZpbmVkITtcbn1cblxuLy8gQSBjbGllbnQgb2YgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlciBtYXkgdXNlIHRoZXNlIGZ1bmN0aW9ucyBkaXJlY3RseSB0byBieXBhc3Mgc3RhdGUgY2hlY2suXG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+KSB7XG4gIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKGNvbnRyb2xsZXIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuXG4gIGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkID0gdHJ1ZTtcblxuICBpZiAoY29udHJvbGxlci5fcXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgICBSZWFkYWJsZVN0cmVhbUNsb3NlKHN0cmVhbSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlPFI+KFxuICBjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+LFxuICBjaHVuazogUlxuKTogdm9pZCB7XG4gIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKGNvbnRyb2xsZXIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuXG4gIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkgJiYgUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkUmVxdWVzdHMoc3RyZWFtKSA+IDApIHtcbiAgICBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkUmVxdWVzdChzdHJlYW0sIGNodW5rLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IGNodW5rU2l6ZTtcbiAgICB0cnkge1xuICAgICAgY2h1bmtTaXplID0gY29udHJvbGxlci5fc3RyYXRlZ3lTaXplQWxnb3JpdGhtKGNodW5rKTtcbiAgICB9IGNhdGNoIChjaHVua1NpemVFKSB7XG4gICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgY2h1bmtTaXplRSk7XG4gICAgICB0aHJvdyBjaHVua1NpemVFO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBFbnF1ZXVlVmFsdWVXaXRoU2l6ZShjb250cm9sbGVyLCBjaHVuaywgY2h1bmtTaXplKTtcbiAgICB9IGNhdGNoIChlbnF1ZXVlRSkge1xuICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGVucXVldWVFKTtcbiAgICAgIHRocm93IGVucXVldWVFO1xuICAgIH1cbiAgfVxuXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55PiwgZTogYW55KSB7XG4gIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbTtcblxuICBpZiAoc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFJlc2V0UXVldWUoY29udHJvbGxlcik7XG5cbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgUmVhZGFibGVTdHJlYW1FcnJvcihzdHJlYW0sIGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKFxuICBjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT5cbik6IG51bWJlciB8IG51bGwge1xuICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbS5fc3RhdGU7XG5cbiAgaWYgKHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gY29udHJvbGxlci5fc3RyYXRlZ3lIV00gLSBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZTtcbn1cblxuLy8gVGhpcyBpcyB1c2VkIGluIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUcmFuc2Zvcm1TdHJlYW0uXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckhhc0JhY2twcmVzc3VyZShcbiAgY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+XG4pOiBib29sZWFuIHtcbiAgaWYgKFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJTaG91bGRDYWxsUHVsbChjb250cm9sbGVyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKFxuICBjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT5cbik6IGJvb2xlYW4ge1xuICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbS5fc3RhdGU7XG5cbiAgaWYgKCFjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCAmJiBzdGF0ZSA9PT0gJ3JlYWRhYmxlJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0VXBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QWxnb3JpdGhtOiAoKSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1bGxBbGdvcml0aG06ICgpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEFsZ29yaXRobTogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoV2F0ZXJNYXJrOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemVBbGdvcml0aG06IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxSPikge1xuICBhc3NlcnQoc3RyZWFtLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgPT09IHVuZGVmaW5lZCk7XG5cbiAgY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtID0gc3RyZWFtO1xuXG4gIGNvbnRyb2xsZXIuX3F1ZXVlID0gdW5kZWZpbmVkITtcbiAgY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgPSB1bmRlZmluZWQhO1xuICBSZXNldFF1ZXVlKGNvbnRyb2xsZXIpO1xuXG4gIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgY29udHJvbGxlci5fcHVsbEFnYWluID0gZmFsc2U7XG4gIGNvbnRyb2xsZXIuX3B1bGxpbmcgPSBmYWxzZTtcblxuICBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0gPSBzaXplQWxnb3JpdGhtO1xuICBjb250cm9sbGVyLl9zdHJhdGVneUhXTSA9IGhpZ2hXYXRlck1hcms7XG5cbiAgY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSA9IHB1bGxBbGdvcml0aG07XG4gIGNvbnRyb2xsZXIuX2NhbmNlbEFsZ29yaXRobSA9IGNhbmNlbEFsZ29yaXRobTtcblxuICBzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG5cbiAgY29uc3Qgc3RhcnRSZXN1bHQgPSBzdGFydEFsZ29yaXRobSgpO1xuICB1cG9uUHJvbWlzZShcbiAgICBwcm9taXNlUmVzb2x2ZWRXaXRoKHN0YXJ0UmVzdWx0KSxcbiAgICAoKSA9PiB7XG4gICAgICBjb250cm9sbGVyLl9zdGFydGVkID0gdHJ1ZTtcblxuICAgICAgYXNzZXJ0KCFjb250cm9sbGVyLl9wdWxsaW5nKTtcbiAgICAgIGFzc2VydCghY29udHJvbGxlci5fcHVsbEFnYWluKTtcblxuICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG4gICAgfSxcbiAgICByID0+IHtcbiAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCByKTtcbiAgICB9XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXRVcFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NvdXJjZTxSPihcbiAgc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxSPixcbiAgdW5kZXJseWluZ1NvdXJjZTogVmFsaWRhdGVkVW5kZXJseWluZ1NvdXJjZTxSPixcbiAgaGlnaFdhdGVyTWFyazogbnVtYmVyLFxuICBzaXplQWxnb3JpdGhtOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8Uj5cbikge1xuICBjb25zdCBjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+ID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSk7XG5cbiAgbGV0IHN0YXJ0QWxnb3JpdGhtOiAoKSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4gPSAoKSA9PiB1bmRlZmluZWQ7XG4gIGxldCBwdWxsQWxnb3JpdGhtOiAoKSA9PiBQcm9taXNlPHZvaWQ+ID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICBsZXQgY2FuY2VsQWxnb3JpdGhtOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD4gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG5cbiAgaWYgKHVuZGVybHlpbmdTb3VyY2Uuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0QWxnb3JpdGhtID0gKCkgPT4gdW5kZXJseWluZ1NvdXJjZS5zdGFydCEoY29udHJvbGxlcik7XG4gIH1cbiAgaWYgKHVuZGVybHlpbmdTb3VyY2UucHVsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHVsbEFsZ29yaXRobSA9ICgpID0+IHVuZGVybHlpbmdTb3VyY2UucHVsbCEoY29udHJvbGxlcik7XG4gIH1cbiAgaWYgKHVuZGVybHlpbmdTb3VyY2UuY2FuY2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICBjYW5jZWxBbGdvcml0aG0gPSByZWFzb24gPT4gdW5kZXJseWluZ1NvdXJjZS5jYW5jZWwhKHJlYXNvbik7XG4gIH1cblxuICBTZXRVcFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoXG4gICAgc3RyZWFtLCBjb250cm9sbGVyLCBzdGFydEFsZ29yaXRobSwgcHVsbEFsZ29yaXRobSwgY2FuY2VsQWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtXG4gICk7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLlxuXG5mdW5jdGlvbiBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXG4gICAgYFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJgKTtcbn1cbiIsICJpbXBvcnQge1xuICBDcmVhdGVSZWFkYWJsZUJ5dGVTdHJlYW0sXG4gIENyZWF0ZVJlYWRhYmxlU3RyZWFtLFxuICBJc1JlYWRhYmxlU3RyZWFtLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW0sXG4gIFJlYWRhYmxlU3RyZWFtLFxuICBSZWFkYWJsZVN0cmVhbUNhbmNlbCxcbiAgUmVhZGFibGVTdHJlYW1SZWFkZXJcbn0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtJztcbmltcG9ydCB7IFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UgfSBmcm9tICcuL2dlbmVyaWMtcmVhZGVyJztcbmltcG9ydCB7XG4gIEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIsXG4gIElzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkLFxuICBSZWFkUmVxdWVzdFxufSBmcm9tICcuL2RlZmF1bHQtcmVhZGVyJztcbmltcG9ydCB7XG4gIEFjcXVpcmVSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIsXG4gIElzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLFxuICBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXJSZWFkLFxuICBSZWFkSW50b1JlcXVlc3Rcbn0gZnJvbSAnLi9ieW9iLXJlYWRlcic7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJy4uLy4uL3N0dWIvYXNzZXJ0JztcbmltcG9ydCB7IG5ld1Byb21pc2UsIHByb21pc2VSZXNvbHZlZFdpdGgsIHF1ZXVlTWljcm90YXNrLCB1cG9uUmVqZWN0aW9uIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcixcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZSxcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yXG59IGZyb20gJy4vZGVmYXVsdC1jb250cm9sbGVyJztcbmltcG9ydCB7XG4gIElzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZSxcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0QllPQlJlcXVlc3QsXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3XG59IGZyb20gJy4vYnl0ZS1zdHJlYW0tY29udHJvbGxlcic7XG5pbXBvcnQgeyBDcmVhdGVBcnJheUZyb21MaXN0IH0gZnJvbSAnLi4vYWJzdHJhY3Qtb3BzL2VjbWFzY3JpcHQnO1xuaW1wb3J0IHsgQ2xvbmVBc1VpbnQ4QXJyYXkgfSBmcm9tICcuLi9hYnN0cmFjdC1vcHMvbWlzY2VsbGFuZW91cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbVRlZTxSPihzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFI+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lRm9yQnJhbmNoMjogYm9vbGVhbik6IFtSZWFkYWJsZVN0cmVhbTxSPiwgUmVhZGFibGVTdHJlYW08Uj5dIHtcbiAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW0oc3RyZWFtKSk7XG4gIGFzc2VydCh0eXBlb2YgY2xvbmVGb3JCcmFuY2gyID09PSAnYm9vbGVhbicpO1xuICBpZiAoSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKSkge1xuICAgIHJldHVybiBSZWFkYWJsZUJ5dGVTdHJlYW1UZWUoc3RyZWFtIGFzIHVua25vd24gYXMgUmVhZGFibGVCeXRlU3RyZWFtKSBhc1xuICAgICAgdW5rbm93biBhcyBbUmVhZGFibGVTdHJlYW08Uj4sIFJlYWRhYmxlU3RyZWFtPFI+XTtcbiAgfVxuICByZXR1cm4gUmVhZGFibGVTdHJlYW1EZWZhdWx0VGVlKHN0cmVhbSwgY2xvbmVGb3JCcmFuY2gyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFRlZTxSPihzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFI+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUZvckJyYW5jaDI6IGJvb2xlYW4pOiBbUmVhZGFibGVTdHJlYW08Uj4sIFJlYWRhYmxlU3RyZWFtPFI+XSB7XG4gIGFzc2VydChJc1JlYWRhYmxlU3RyZWFtKHN0cmVhbSkpO1xuICBhc3NlcnQodHlwZW9mIGNsb25lRm9yQnJhbmNoMiA9PT0gJ2Jvb2xlYW4nKTtcblxuICBjb25zdCByZWFkZXIgPSBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+KHN0cmVhbSk7XG5cbiAgbGV0IHJlYWRpbmcgPSBmYWxzZTtcbiAgbGV0IHJlYWRBZ2FpbiA9IGZhbHNlO1xuICBsZXQgY2FuY2VsZWQxID0gZmFsc2U7XG4gIGxldCBjYW5jZWxlZDIgPSBmYWxzZTtcbiAgbGV0IHJlYXNvbjE6IGFueTtcbiAgbGV0IHJlYXNvbjI6IGFueTtcbiAgbGV0IGJyYW5jaDE6IFJlYWRhYmxlU3RyZWFtPFI+O1xuICBsZXQgYnJhbmNoMjogUmVhZGFibGVTdHJlYW08Uj47XG5cbiAgbGV0IHJlc29sdmVDYW5jZWxQcm9taXNlOiAodmFsdWU6IHVuZGVmaW5lZCB8IFByb21pc2U8dW5kZWZpbmVkPikgPT4gdm9pZDtcbiAgY29uc3QgY2FuY2VsUHJvbWlzZSA9IG5ld1Byb21pc2U8dW5kZWZpbmVkPihyZXNvbHZlID0+IHtcbiAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHB1bGxBbGdvcml0aG0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHJlYWRpbmcpIHtcbiAgICAgIHJlYWRBZ2FpbiA9IHRydWU7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJlYWRpbmcgPSB0cnVlO1xuXG4gICAgY29uc3QgcmVhZFJlcXVlc3Q6IFJlYWRSZXF1ZXN0PFI+ID0ge1xuICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBkZWxheWVkIGEgbWljcm90YXNrIGJlY2F1c2UgaXQgdGFrZXMgYXQgbGVhc3QgYSBtaWNyb3Rhc2sgdG8gZGV0ZWN0IGVycm9ycyAodXNpbmdcbiAgICAgICAgLy8gcmVhZGVyLl9jbG9zZWRQcm9taXNlIGJlbG93KSwgYW5kIHdlIHdhbnQgZXJyb3JzIGluIHN0cmVhbSB0byBlcnJvciBib3RoIGJyYW5jaGVzIGltbWVkaWF0ZWx5LiBXZSBjYW5ub3QgbGV0XG4gICAgICAgIC8vIHN1Y2Nlc3NmdWwgc3luY2hyb25vdXNseS1hdmFpbGFibGUgcmVhZHMgZ2V0IGFoZWFkIG9mIGFzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSBlcnJvcnMuXG4gICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgICByZWFkQWdhaW4gPSBmYWxzZTtcbiAgICAgICAgICBjb25zdCBjaHVuazEgPSBjaHVuaztcbiAgICAgICAgICBjb25zdCBjaHVuazIgPSBjaHVuaztcblxuICAgICAgICAgIC8vIFRoZXJlIGlzIG5vIHdheSB0byBhY2Nlc3MgdGhlIGNsb25pbmcgY29kZSByaWdodCBub3cgaW4gdGhlIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICAvLyBJZiB3ZSBhZGQgb25lIHRoZW4gd2UnbGwgbmVlZCBhbiBpbXBsZW1lbnRhdGlvbiBmb3Igc2VyaWFsaXphYmxlIG9iamVjdHMuXG4gICAgICAgICAgLy8gaWYgKCFjYW5jZWxlZDIgJiYgY2xvbmVGb3JCcmFuY2gyKSB7XG4gICAgICAgICAgLy8gICBjaHVuazIgPSBTdHJ1Y3R1cmVkRGVzZXJpYWxpemUoU3RydWN0dXJlZFNlcmlhbGl6ZShjaHVuazIpKTtcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICBpZiAoIWNhbmNlbGVkMSkge1xuICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoXG4gICAgICAgICAgICAgIGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciBhcyBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+LFxuICAgICAgICAgICAgICBjaHVuazFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZShcbiAgICAgICAgICAgICAgYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4sXG4gICAgICAgICAgICAgIGNodW5rMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHJlYWRBZ2Fpbikge1xuICAgICAgICAgICAgcHVsbEFsZ29yaXRobSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHtcbiAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoIWNhbmNlbGVkMSkge1xuICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZShicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxSPik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5jZWxlZDIpIHtcbiAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjYW5jZWxlZDEgfHwgIWNhbmNlbGVkMikge1xuICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfZXJyb3JTdGVwczogKCkgPT4ge1xuICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHJlYWRlciwgcmVhZFJlcXVlc3QpO1xuXG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbDFBbGdvcml0aG0ocmVhc29uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjYW5jZWxlZDEgPSB0cnVlO1xuICAgIHJlYXNvbjEgPSByZWFzb247XG4gICAgaWYgKGNhbmNlbGVkMikge1xuICAgICAgY29uc3QgY29tcG9zaXRlUmVhc29uID0gQ3JlYXRlQXJyYXlGcm9tTGlzdChbcmVhc29uMSwgcmVhc29uMl0pO1xuICAgICAgY29uc3QgY2FuY2VsUmVzdWx0ID0gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCBjb21wb3NpdGVSZWFzb24pO1xuICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UoY2FuY2VsUmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbmNlbFByb21pc2U7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwyQWxnb3JpdGhtKHJlYXNvbjogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY2FuY2VsZWQyID0gdHJ1ZTtcbiAgICByZWFzb24yID0gcmVhc29uO1xuICAgIGlmIChjYW5jZWxlZDEpIHtcbiAgICAgIGNvbnN0IGNvbXBvc2l0ZVJlYXNvbiA9IENyZWF0ZUFycmF5RnJvbUxpc3QoW3JlYXNvbjEsIHJlYXNvbjJdKTtcbiAgICAgIGNvbnN0IGNhbmNlbFJlc3VsdCA9IFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHN0cmVhbSwgY29tcG9zaXRlUmVhc29uKTtcbiAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKGNhbmNlbFJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiBjYW5jZWxQcm9taXNlO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRBbGdvcml0aG0oKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG5cbiAgYnJhbmNoMSA9IENyZWF0ZVJlYWRhYmxlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWwxQWxnb3JpdGhtKTtcbiAgYnJhbmNoMiA9IENyZWF0ZVJlYWRhYmxlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWwyQWxnb3JpdGhtKTtcblxuICB1cG9uUmVqZWN0aW9uKHJlYWRlci5fY2xvc2VkUHJvbWlzZSwgKHI6IGFueSkgPT4ge1xuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxSPiwgcik7XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciBhcyBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+LCByKTtcbiAgICBpZiAoIWNhbmNlbGVkMSB8fCAhY2FuY2VsZWQyKSB7XG4gICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZSh1bmRlZmluZWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFticmFuY2gxLCBicmFuY2gyXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbVRlZShzdHJlYW06IFJlYWRhYmxlQnl0ZVN0cmVhbSk6IFtSZWFkYWJsZUJ5dGVTdHJlYW0sIFJlYWRhYmxlQnl0ZVN0cmVhbV0ge1xuICBhc3NlcnQoSXNSZWFkYWJsZVN0cmVhbShzdHJlYW0pKTtcbiAgYXNzZXJ0KElzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcikpO1xuXG4gIGxldCByZWFkZXI6IFJlYWRhYmxlU3RyZWFtUmVhZGVyPFVpbnQ4QXJyYXk+ID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihzdHJlYW0pO1xuICBsZXQgcmVhZGluZyA9IGZhbHNlO1xuICBsZXQgcmVhZEFnYWluRm9yQnJhbmNoMSA9IGZhbHNlO1xuICBsZXQgcmVhZEFnYWluRm9yQnJhbmNoMiA9IGZhbHNlO1xuICBsZXQgY2FuY2VsZWQxID0gZmFsc2U7XG4gIGxldCBjYW5jZWxlZDIgPSBmYWxzZTtcbiAgbGV0IHJlYXNvbjE6IGFueTtcbiAgbGV0IHJlYXNvbjI6IGFueTtcbiAgbGV0IGJyYW5jaDE6IFJlYWRhYmxlQnl0ZVN0cmVhbTtcbiAgbGV0IGJyYW5jaDI6IFJlYWRhYmxlQnl0ZVN0cmVhbTtcblxuICBsZXQgcmVzb2x2ZUNhbmNlbFByb21pc2U6ICh2YWx1ZTogdW5kZWZpbmVkIHwgUHJvbWlzZTx1bmRlZmluZWQ+KSA9PiB2b2lkO1xuICBjb25zdCBjYW5jZWxQcm9taXNlID0gbmV3UHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGZvcndhcmRSZWFkZXJFcnJvcih0aGlzUmVhZGVyOiBSZWFkYWJsZVN0cmVhbVJlYWRlcjxVaW50OEFycmF5Pikge1xuICAgIHVwb25SZWplY3Rpb24odGhpc1JlYWRlci5fY2xvc2VkUHJvbWlzZSwgciA9PiB7XG4gICAgICBpZiAodGhpc1JlYWRlciAhPT0gcmVhZGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIHIpO1xuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgcik7XG4gICAgICBpZiAoIWNhbmNlbGVkMSB8fCAhY2FuY2VsZWQyKSB7XG4gICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdWxsV2l0aERlZmF1bHRSZWFkZXIoKSB7XG4gICAgaWYgKElzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHJlYWRlcikpIHtcbiAgICAgIGFzc2VydChyZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMubGVuZ3RoID09PSAwKTtcbiAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcblxuICAgICAgcmVhZGVyID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihzdHJlYW0pO1xuICAgICAgZm9yd2FyZFJlYWRlckVycm9yKHJlYWRlcik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVhZFJlcXVlc3Q6IFJlYWRSZXF1ZXN0PFVpbnQ4QXJyYXk+ID0ge1xuICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBkZWxheWVkIGEgbWljcm90YXNrIGJlY2F1c2UgaXQgdGFrZXMgYXQgbGVhc3QgYSBtaWNyb3Rhc2sgdG8gZGV0ZWN0IGVycm9ycyAodXNpbmdcbiAgICAgICAgLy8gcmVhZGVyLl9jbG9zZWRQcm9taXNlIGJlbG93KSwgYW5kIHdlIHdhbnQgZXJyb3JzIGluIHN0cmVhbSB0byBlcnJvciBib3RoIGJyYW5jaGVzIGltbWVkaWF0ZWx5LiBXZSBjYW5ub3QgbGV0XG4gICAgICAgIC8vIHN1Y2Nlc3NmdWwgc3luY2hyb25vdXNseS1hdmFpbGFibGUgcmVhZHMgZ2V0IGFoZWFkIG9mIGFzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSBlcnJvcnMuXG4gICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgICByZWFkQWdhaW5Gb3JCcmFuY2gxID0gZmFsc2U7XG4gICAgICAgICAgcmVhZEFnYWluRm9yQnJhbmNoMiA9IGZhbHNlO1xuXG4gICAgICAgICAgY29uc3QgY2h1bmsxID0gY2h1bms7XG4gICAgICAgICAgbGV0IGNodW5rMiA9IGNodW5rO1xuICAgICAgICAgIGlmICghY2FuY2VsZWQxICYmICFjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNodW5rMiA9IENsb25lQXNVaW50OEFycmF5KGNodW5rKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGNsb25lRSkge1xuICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjbG9uZUUpO1xuICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjbG9uZUUpO1xuICAgICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNsb25lRSkpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFjYW5jZWxlZDEpIHtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmsxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmsyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHJlYWRBZ2FpbkZvckJyYW5jaDEpIHtcbiAgICAgICAgICAgIHB1bGwxQWxnb3JpdGhtKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZWFkQWdhaW5Gb3JCcmFuY2gyKSB7XG4gICAgICAgICAgICBwdWxsMkFsZ29yaXRobSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHtcbiAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoIWNhbmNlbGVkMSkge1xuICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbG9zZShicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FuY2VsZWQyKSB7XG4gICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmQoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZChicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIDApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FuY2VsZWQxIHx8ICFjYW5jZWxlZDIpIHtcbiAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX2Vycm9yU3RlcHM6ICgpID0+IHtcbiAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyUmVhZChyZWFkZXIsIHJlYWRSZXF1ZXN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1bGxXaXRoQllPQlJlYWRlcih2aWV3OiBBcnJheUJ1ZmZlclZpZXcsIGZvckJyYW5jaDI6IGJvb2xlYW4pIHtcbiAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8VWludDhBcnJheT4ocmVhZGVyKSkge1xuICAgICAgYXNzZXJ0KHJlYWRlci5fcmVhZFJlcXVlc3RzLmxlbmd0aCA9PT0gMCk7XG4gICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG5cbiAgICAgIHJlYWRlciA9IEFjcXVpcmVSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIoc3RyZWFtKTtcbiAgICAgIGZvcndhcmRSZWFkZXJFcnJvcihyZWFkZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ5b2JCcmFuY2ggPSBmb3JCcmFuY2gyID8gYnJhbmNoMiA6IGJyYW5jaDE7XG4gICAgY29uc3Qgb3RoZXJCcmFuY2ggPSBmb3JCcmFuY2gyID8gYnJhbmNoMSA6IGJyYW5jaDI7XG5cbiAgICBjb25zdCByZWFkSW50b1JlcXVlc3Q6IFJlYWRJbnRvUmVxdWVzdDxBcnJheUJ1ZmZlclZpZXc+ID0ge1xuICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBkZWxheWVkIGEgbWljcm90YXNrIGJlY2F1c2UgaXQgdGFrZXMgYXQgbGVhc3QgYSBtaWNyb3Rhc2sgdG8gZGV0ZWN0IGVycm9ycyAodXNpbmdcbiAgICAgICAgLy8gcmVhZGVyLl9jbG9zZWRQcm9taXNlIGJlbG93KSwgYW5kIHdlIHdhbnQgZXJyb3JzIGluIHN0cmVhbSB0byBlcnJvciBib3RoIGJyYW5jaGVzIGltbWVkaWF0ZWx5LiBXZSBjYW5ub3QgbGV0XG4gICAgICAgIC8vIHN1Y2Nlc3NmdWwgc3luY2hyb25vdXNseS1hdmFpbGFibGUgcmVhZHMgZ2V0IGFoZWFkIG9mIGFzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSBlcnJvcnMuXG4gICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgICByZWFkQWdhaW5Gb3JCcmFuY2gxID0gZmFsc2U7XG4gICAgICAgICAgcmVhZEFnYWluRm9yQnJhbmNoMiA9IGZhbHNlO1xuXG4gICAgICAgICAgY29uc3QgYnlvYkNhbmNlbGVkID0gZm9yQnJhbmNoMiA/IGNhbmNlbGVkMiA6IGNhbmNlbGVkMTtcbiAgICAgICAgICBjb25zdCBvdGhlckNhbmNlbGVkID0gZm9yQnJhbmNoMiA/IGNhbmNlbGVkMSA6IGNhbmNlbGVkMjtcblxuICAgICAgICAgIGlmICghb3RoZXJDYW5jZWxlZCkge1xuICAgICAgICAgICAgbGV0IGNsb25lZENodW5rO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY2xvbmVkQ2h1bmsgPSBDbG9uZUFzVWludDhBcnJheShjaHVuayk7XG4gICAgICAgICAgICB9IGNhdGNoIChjbG9uZUUpIHtcbiAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGJ5b2JCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2xvbmVFKTtcbiAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKG90aGVyQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNsb25lRSk7XG4gICAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHN0cmVhbSwgY2xvbmVFKSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYnlvYkNhbmNlbGVkKSB7XG4gICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kV2l0aE5ld1ZpZXcoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZShvdGhlckJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjbG9uZWRDaHVuayk7XG4gICAgICAgICAgfSBlbHNlIGlmICghYnlvYkNhbmNlbGVkKSB7XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3KGJ5b2JCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmspO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBpZiAocmVhZEFnYWluRm9yQnJhbmNoMSkge1xuICAgICAgICAgICAgcHVsbDFBbGdvcml0aG0oKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlYWRBZ2FpbkZvckJyYW5jaDIpIHtcbiAgICAgICAgICAgIHB1bGwyQWxnb3JpdGhtKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBfY2xvc2VTdGVwczogY2h1bmsgPT4ge1xuICAgICAgICByZWFkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgYnlvYkNhbmNlbGVkID0gZm9yQnJhbmNoMiA/IGNhbmNlbGVkMiA6IGNhbmNlbGVkMTtcbiAgICAgICAgY29uc3Qgb3RoZXJDYW5jZWxlZCA9IGZvckJyYW5jaDIgPyBjYW5jZWxlZDEgOiBjYW5jZWxlZDI7XG5cbiAgICAgICAgaWYgKCFieW9iQ2FuY2VsZWQpIHtcbiAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2UoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW90aGVyQ2FuY2VsZWQpIHtcbiAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2Uob3RoZXJCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2h1bmsgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFzc2VydChjaHVuay5ieXRlTGVuZ3RoID09PSAwKTtcblxuICAgICAgICAgIGlmICghYnlvYkNhbmNlbGVkKSB7XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3KGJ5b2JCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmspO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIW90aGVyQ2FuY2VsZWQgJiYgb3RoZXJCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZChvdGhlckJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJ5b2JDYW5jZWxlZCB8fCAhb3RoZXJDYW5jZWxlZCkge1xuICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfZXJyb3JTdGVwczogKCkgPT4ge1xuICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcbiAgICBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXJSZWFkKHJlYWRlciwgdmlldywgcmVhZEludG9SZXF1ZXN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1bGwxQWxnb3JpdGhtKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChyZWFkaW5nKSB7XG4gICAgICByZWFkQWdhaW5Gb3JCcmFuY2gxID0gdHJ1ZTtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcmVhZGluZyA9IHRydWU7XG5cbiAgICBjb25zdCBieW9iUmVxdWVzdCA9IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXRCWU9CUmVxdWVzdChicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgIGlmIChieW9iUmVxdWVzdCA9PT0gbnVsbCkge1xuICAgICAgcHVsbFdpdGhEZWZhdWx0UmVhZGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHB1bGxXaXRoQllPQlJlYWRlcihieW9iUmVxdWVzdC5fdmlldyEsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVsbDJBbGdvcml0aG0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHJlYWRpbmcpIHtcbiAgICAgIHJlYWRBZ2FpbkZvckJyYW5jaDIgPSB0cnVlO1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICByZWFkaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IGJ5b2JSZXF1ZXN0ID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldEJZT0JSZXF1ZXN0KGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgaWYgKGJ5b2JSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICBwdWxsV2l0aERlZmF1bHRSZWFkZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHVsbFdpdGhCWU9CUmVhZGVyKGJ5b2JSZXF1ZXN0Ll92aWV3ISwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbDFBbGdvcml0aG0ocmVhc29uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjYW5jZWxlZDEgPSB0cnVlO1xuICAgIHJlYXNvbjEgPSByZWFzb247XG4gICAgaWYgKGNhbmNlbGVkMikge1xuICAgICAgY29uc3QgY29tcG9zaXRlUmVhc29uID0gQ3JlYXRlQXJyYXlGcm9tTGlzdChbcmVhc29uMSwgcmVhc29uMl0pO1xuICAgICAgY29uc3QgY2FuY2VsUmVzdWx0ID0gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCBjb21wb3NpdGVSZWFzb24pO1xuICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UoY2FuY2VsUmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbmNlbFByb21pc2U7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwyQWxnb3JpdGhtKHJlYXNvbjogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY2FuY2VsZWQyID0gdHJ1ZTtcbiAgICByZWFzb24yID0gcmVhc29uO1xuICAgIGlmIChjYW5jZWxlZDEpIHtcbiAgICAgIGNvbnN0IGNvbXBvc2l0ZVJlYXNvbiA9IENyZWF0ZUFycmF5RnJvbUxpc3QoW3JlYXNvbjEsIHJlYXNvbjJdKTtcbiAgICAgIGNvbnN0IGNhbmNlbFJlc3VsdCA9IFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHN0cmVhbSwgY29tcG9zaXRlUmVhc29uKTtcbiAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKGNhbmNlbFJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiBjYW5jZWxQcm9taXNlO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRBbGdvcml0aG0oKTogdm9pZCB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYnJhbmNoMSA9IENyZWF0ZVJlYWRhYmxlQnl0ZVN0cmVhbShzdGFydEFsZ29yaXRobSwgcHVsbDFBbGdvcml0aG0sIGNhbmNlbDFBbGdvcml0aG0pO1xuICBicmFuY2gyID0gQ3JlYXRlUmVhZGFibGVCeXRlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsMkFsZ29yaXRobSwgY2FuY2VsMkFsZ29yaXRobSk7XG5cbiAgZm9yd2FyZFJlYWRlckVycm9yKHJlYWRlcik7XG5cbiAgcmV0dXJuIFticmFuY2gxLCBicmFuY2gyXTtcbn1cbiIsICJpbXBvcnQgeyBhc3NlcnREaWN0aW9uYXJ5LCBhc3NlcnRGdW5jdGlvbiwgY29udmVydFVuc2lnbmVkTG9uZ0xvbmdXaXRoRW5mb3JjZVJhbmdlIH0gZnJvbSAnLi9iYXNpYyc7XG5pbXBvcnQge1xuICBSZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsXG4gIFVuZGVybHlpbmdCeXRlU291cmNlLFxuICBVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZSxcbiAgVW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2VQdWxsQ2FsbGJhY2ssXG4gIFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlU3RhcnRDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NvdXJjZSxcbiAgVW5kZXJseWluZ1NvdXJjZUNhbmNlbENhbGxiYWNrLFxuICBWYWxpZGF0ZWRVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZVxufSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0vdW5kZXJseWluZy1zb3VyY2UnO1xuaW1wb3J0IHsgcHJvbWlzZUNhbGwsIHJlZmxlY3RDYWxsIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlPFI+KFxuICBzb3VyY2U6IFVuZGVybHlpbmdTb3VyY2U8Uj4gfCBVbmRlcmx5aW5nQnl0ZVNvdXJjZSB8IG51bGwsXG4gIGNvbnRleHQ6IHN0cmluZ1xuKTogVmFsaWRhdGVkVW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2U8Uj4ge1xuICBhc3NlcnREaWN0aW9uYXJ5KHNvdXJjZSwgY29udGV4dCk7XG4gIGNvbnN0IG9yaWdpbmFsID0gc291cmNlIGFzIChVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZTxSPiB8IG51bGwpO1xuICBjb25zdCBhdXRvQWxsb2NhdGVDaHVua1NpemUgPSBvcmlnaW5hbD8uYXV0b0FsbG9jYXRlQ2h1bmtTaXplO1xuICBjb25zdCBjYW5jZWwgPSBvcmlnaW5hbD8uY2FuY2VsO1xuICBjb25zdCBwdWxsID0gb3JpZ2luYWw/LnB1bGw7XG4gIGNvbnN0IHN0YXJ0ID0gb3JpZ2luYWw/LnN0YXJ0O1xuICBjb25zdCB0eXBlID0gb3JpZ2luYWw/LnR5cGU7XG4gIHJldHVybiB7XG4gICAgYXV0b0FsbG9jYXRlQ2h1bmtTaXplOiBhdXRvQWxsb2NhdGVDaHVua1NpemUgPT09IHVuZGVmaW5lZCA/XG4gICAgICB1bmRlZmluZWQgOlxuICAgICAgY29udmVydFVuc2lnbmVkTG9uZ0xvbmdXaXRoRW5mb3JjZVJhbmdlKFxuICAgICAgICBhdXRvQWxsb2NhdGVDaHVua1NpemUsXG4gICAgICAgIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2F1dG9BbGxvY2F0ZUNodW5rU2l6ZScgdGhhdGBcbiAgICAgICksXG4gICAgY2FuY2VsOiBjYW5jZWwgPT09IHVuZGVmaW5lZCA/XG4gICAgICB1bmRlZmluZWQgOlxuICAgICAgY29udmVydFVuZGVybHlpbmdTb3VyY2VDYW5jZWxDYWxsYmFjayhjYW5jZWwsIG9yaWdpbmFsISwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnY2FuY2VsJyB0aGF0YCksXG4gICAgcHVsbDogcHVsbCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZVB1bGxDYWxsYmFjayhwdWxsLCBvcmlnaW5hbCEsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3B1bGwnIHRoYXRgKSxcbiAgICBzdGFydDogc3RhcnQgPT09IHVuZGVmaW5lZCA/XG4gICAgICB1bmRlZmluZWQgOlxuICAgICAgY29udmVydFVuZGVybHlpbmdTb3VyY2VTdGFydENhbGxiYWNrKHN0YXJ0LCBvcmlnaW5hbCEsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3N0YXJ0JyB0aGF0YCksXG4gICAgdHlwZTogdHlwZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogY29udmVydFJlYWRhYmxlU3RyZWFtVHlwZSh0eXBlLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICd0eXBlJyB0aGF0YClcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTb3VyY2VDYW5jZWxDYWxsYmFjayhcbiAgZm46IFVuZGVybHlpbmdTb3VyY2VDYW5jZWxDYWxsYmFjayxcbiAgb3JpZ2luYWw6IFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlLFxuICBjb250ZXh0OiBzdHJpbmdcbik6IChyZWFzb246IGFueSkgPT4gUHJvbWlzZTx2b2lkPiB7XG4gIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgcmV0dXJuIChyZWFzb246IGFueSkgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbcmVhc29uXSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlUHVsbENhbGxiYWNrPFI+KFxuICBmbjogVW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2VQdWxsQ2FsbGJhY2s8Uj4sXG4gIG9yaWdpbmFsOiBVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZTxSPixcbiAgY29udGV4dDogc3RyaW5nXG4pOiAoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1Db250cm9sbGVyPFI+KSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICByZXR1cm4gKGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtQ29udHJvbGxlcjxSPikgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbY29udHJvbGxlcl0pO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZVN0YXJ0Q2FsbGJhY2s8Uj4oXG4gIGZuOiBVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZVN0YXJ0Q2FsbGJhY2s8Uj4sXG4gIG9yaWdpbmFsOiBVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZTxSPixcbiAgY29udGV4dDogc3RyaW5nXG4pOiBVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZVN0YXJ0Q2FsbGJhY2s8Uj4ge1xuICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gIHJldHVybiAoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1Db250cm9sbGVyPFI+KSA9PiByZWZsZWN0Q2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRSZWFkYWJsZVN0cmVhbVR5cGUodHlwZTogc3RyaW5nLCBjb250ZXh0OiBzdHJpbmcpOiAnYnl0ZXMnIHtcbiAgdHlwZSA9IGAke3R5cGV9YDtcbiAgaWYgKHR5cGUgIT09ICdieXRlcycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9ICcke3R5cGV9JyBpcyBub3QgYSB2YWxpZCBlbnVtZXJhdGlvbiB2YWx1ZSBmb3IgUmVhZGFibGVTdHJlYW1UeXBlYCk7XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59XG4iLCAiaW1wb3J0IHsgYXNzZXJ0RGljdGlvbmFyeSB9IGZyb20gJy4vYmFzaWMnO1xuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW1HZXRSZWFkZXJPcHRpb25zIH0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtL3JlYWRlci1vcHRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRSZWFkZXJPcHRpb25zKG9wdGlvbnM6IFJlYWRhYmxlU3RyZWFtR2V0UmVhZGVyT3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogUmVhZGFibGVTdHJlYW1HZXRSZWFkZXJPcHRpb25zIHtcbiAgYXNzZXJ0RGljdGlvbmFyeShvcHRpb25zLCBjb250ZXh0KTtcbiAgY29uc3QgbW9kZSA9IG9wdGlvbnM/Lm1vZGU7XG4gIHJldHVybiB7XG4gICAgbW9kZTogbW9kZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogY29udmVydFJlYWRhYmxlU3RyZWFtUmVhZGVyTW9kZShtb2RlLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdtb2RlJyB0aGF0YClcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29udmVydFJlYWRhYmxlU3RyZWFtUmVhZGVyTW9kZShtb2RlOiBzdHJpbmcsIGNvbnRleHQ6IHN0cmluZyk6ICdieW9iJyB7XG4gIG1vZGUgPSBgJHttb2RlfWA7XG4gIGlmIChtb2RlICE9PSAnYnlvYicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9ICcke21vZGV9JyBpcyBub3QgYSB2YWxpZCBlbnVtZXJhdGlvbiB2YWx1ZSBmb3IgUmVhZGFibGVTdHJlYW1SZWFkZXJNb2RlYCk7XG4gIH1cbiAgcmV0dXJuIG1vZGU7XG59XG4iLCAiaW1wb3J0IHsgYXNzZXJ0RGljdGlvbmFyeSB9IGZyb20gJy4vYmFzaWMnO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1JdGVyYXRvck9wdGlvbnMsXG4gIFZhbGlkYXRlZFJlYWRhYmxlU3RyZWFtSXRlcmF0b3JPcHRpb25zXG59IGZyb20gJy4uL3JlYWRhYmxlLXN0cmVhbS9pdGVyYXRvci1vcHRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRJdGVyYXRvck9wdGlvbnMob3B0aW9uczogUmVhZGFibGVTdHJlYW1JdGVyYXRvck9wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogVmFsaWRhdGVkUmVhZGFibGVTdHJlYW1JdGVyYXRvck9wdGlvbnMge1xuICBhc3NlcnREaWN0aW9uYXJ5KG9wdGlvbnMsIGNvbnRleHQpO1xuICBjb25zdCBwcmV2ZW50Q2FuY2VsID0gb3B0aW9ucz8ucHJldmVudENhbmNlbDtcbiAgcmV0dXJuIHsgcHJldmVudENhbmNlbDogQm9vbGVhbihwcmV2ZW50Q2FuY2VsKSB9O1xufVxuIiwgImltcG9ydCB7IGFzc2VydERpY3Rpb25hcnkgfSBmcm9tICcuL2Jhc2ljJztcbmltcG9ydCB7IFN0cmVhbVBpcGVPcHRpb25zLCBWYWxpZGF0ZWRTdHJlYW1QaXBlT3B0aW9ucyB9IGZyb20gJy4uL3JlYWRhYmxlLXN0cmVhbS9waXBlLW9wdGlvbnMnO1xuaW1wb3J0IHsgQWJvcnRTaWduYWwsIGlzQWJvcnRTaWduYWwgfSBmcm9tICcuLi9hYm9ydC1zaWduYWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFBpcGVPcHRpb25zKG9wdGlvbnM6IFN0cmVhbVBpcGVPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogVmFsaWRhdGVkU3RyZWFtUGlwZU9wdGlvbnMge1xuICBhc3NlcnREaWN0aW9uYXJ5KG9wdGlvbnMsIGNvbnRleHQpO1xuICBjb25zdCBwcmV2ZW50QWJvcnQgPSBvcHRpb25zPy5wcmV2ZW50QWJvcnQ7XG4gIGNvbnN0IHByZXZlbnRDYW5jZWwgPSBvcHRpb25zPy5wcmV2ZW50Q2FuY2VsO1xuICBjb25zdCBwcmV2ZW50Q2xvc2UgPSBvcHRpb25zPy5wcmV2ZW50Q2xvc2U7XG4gIGNvbnN0IHNpZ25hbCA9IG9wdGlvbnM/LnNpZ25hbDtcbiAgaWYgKHNpZ25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYXNzZXJ0QWJvcnRTaWduYWwoc2lnbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdzaWduYWwnIHRoYXRgKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHByZXZlbnRBYm9ydDogQm9vbGVhbihwcmV2ZW50QWJvcnQpLFxuICAgIHByZXZlbnRDYW5jZWw6IEJvb2xlYW4ocHJldmVudENhbmNlbCksXG4gICAgcHJldmVudENsb3NlOiBCb29sZWFuKHByZXZlbnRDbG9zZSksXG4gICAgc2lnbmFsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGFzc2VydEFib3J0U2lnbmFsKHNpZ25hbDogdW5rbm93biwgY29udGV4dDogc3RyaW5nKTogYXNzZXJ0cyBzaWduYWwgaXMgQWJvcnRTaWduYWwge1xuICBpZiAoIWlzQWJvcnRTaWduYWwoc2lnbmFsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gaXMgbm90IGFuIEFib3J0U2lnbmFsLmApO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgYXNzZXJ0RGljdGlvbmFyeSwgYXNzZXJ0UmVxdWlyZWRGaWVsZCB9IGZyb20gJy4vYmFzaWMnO1xuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW0gfSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgV3JpdGFibGVTdHJlYW0gfSBmcm9tICcuLi93cml0YWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgYXNzZXJ0UmVhZGFibGVTdHJlYW0gfSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbSc7XG5pbXBvcnQgeyBhc3NlcnRXcml0YWJsZVN0cmVhbSB9IGZyb20gJy4vd3JpdGFibGUtc3RyZWFtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRSZWFkYWJsZVdyaXRhYmxlUGFpcjxSUyBleHRlbmRzIFJlYWRhYmxlU3RyZWFtLCBXUyBleHRlbmRzIFdyaXRhYmxlU3RyZWFtPihcbiAgcGFpcjogeyByZWFkYWJsZTogUlM7IHdyaXRhYmxlOiBXUyB9IHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgY29udGV4dDogc3RyaW5nXG4pOiB7IHJlYWRhYmxlOiBSUzsgd3JpdGFibGU6IFdTIH0ge1xuICBhc3NlcnREaWN0aW9uYXJ5KHBhaXIsIGNvbnRleHQpO1xuXG4gIGNvbnN0IHJlYWRhYmxlID0gcGFpcj8ucmVhZGFibGU7XG4gIGFzc2VydFJlcXVpcmVkRmllbGQocmVhZGFibGUsICdyZWFkYWJsZScsICdSZWFkYWJsZVdyaXRhYmxlUGFpcicpO1xuICBhc3NlcnRSZWFkYWJsZVN0cmVhbShyZWFkYWJsZSwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAncmVhZGFibGUnIHRoYXRgKTtcblxuICBjb25zdCB3cml0YWJsZSA9IHBhaXI/LndyaXRhYmxlO1xuICBhc3NlcnRSZXF1aXJlZEZpZWxkKHdyaXRhYmxlLCAnd3JpdGFibGUnLCAnUmVhZGFibGVXcml0YWJsZVBhaXInKTtcbiAgYXNzZXJ0V3JpdGFibGVTdHJlYW0od3JpdGFibGUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3dyaXRhYmxlJyB0aGF0YCk7XG5cbiAgcmV0dXJuIHsgcmVhZGFibGUsIHdyaXRhYmxlIH07XG59XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICcuLi9zdHViL2Fzc2VydCc7XG5pbXBvcnQge1xuICBwcm9taXNlUmVqZWN0ZWRXaXRoLFxuICBwcm9taXNlUmVzb2x2ZWRXaXRoLFxuICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlLFxuICB0cmFuc2Zvcm1Qcm9taXNlV2l0aFxufSBmcm9tICcuL2hlbHBlcnMvd2ViaWRsJztcbmltcG9ydCB7IFF1ZXVpbmdTdHJhdGVneSwgUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrIH0gZnJvbSAnLi9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7IEFjcXVpcmVSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IsIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvciB9IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL2FzeW5jLWl0ZXJhdG9yJztcbmltcG9ydCB7IGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVqZWN0LCBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUgfSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbS9nZW5lcmljLXJlYWRlcic7XG5pbXBvcnQge1xuICBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLFxuICBJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcixcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0XG59IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL2RlZmF1bHQtcmVhZGVyJztcbmltcG9ydCB7XG4gIEFjcXVpcmVSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIsXG4gIElzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLFxuICBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIsXG4gIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRSZXN1bHRcbn0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vYnlvYi1yZWFkZXInO1xuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW1QaXBlVG8gfSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbS9waXBlJztcbmltcG9ydCB7IFJlYWRhYmxlU3RyZWFtVGVlIH0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vdGVlJztcbmltcG9ydCB7IElzV3JpdGFibGVTdHJlYW0sIElzV3JpdGFibGVTdHJlYW1Mb2NrZWQsIFdyaXRhYmxlU3RyZWFtIH0gZnJvbSAnLi93cml0YWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgU2ltcGxlUXVldWUgfSBmcm9tICcuL3NpbXBsZS1xdWV1ZSc7XG5pbXBvcnQge1xuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LFxuICBTZXRVcFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZyb21VbmRlcmx5aW5nU291cmNlXG59IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL2J5dGUtc3RyZWFtLWNvbnRyb2xsZXInO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcixcbiAgU2V0VXBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLFxuICBTZXRVcFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NvdXJjZVxufSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbS9kZWZhdWx0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHtcbiAgVW5kZXJseWluZ0J5dGVTb3VyY2UsXG4gIFVuZGVybHlpbmdCeXRlU291cmNlUHVsbENhbGxiYWNrLFxuICBVbmRlcmx5aW5nQnl0ZVNvdXJjZVN0YXJ0Q2FsbGJhY2ssXG4gIFVuZGVybHlpbmdTb3VyY2UsXG4gIFVuZGVybHlpbmdTb3VyY2VDYW5jZWxDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NvdXJjZVB1bGxDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NvdXJjZVN0YXJ0Q2FsbGJhY2tcbn0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vdW5kZXJseWluZy1zb3VyY2UnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4vaGVscGVycy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IENyZWF0ZUFycmF5RnJvbUxpc3QgfSBmcm9tICcuL2Fic3RyYWN0LW9wcy9lY21hc2NyaXB0JztcbmltcG9ydCB7IENhbmNlbFN0ZXBzIH0gZnJvbSAnLi9hYnN0cmFjdC1vcHMvaW50ZXJuYWwtbWV0aG9kcyc7XG5pbXBvcnQgeyBJc05vbk5lZ2F0aXZlTnVtYmVyIH0gZnJvbSAnLi9hYnN0cmFjdC1vcHMvbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQgeyBhc3NlcnRPYmplY3QsIGFzc2VydFJlcXVpcmVkQXJndW1lbnQgfSBmcm9tICcuL3ZhbGlkYXRvcnMvYmFzaWMnO1xuaW1wb3J0IHsgY29udmVydFF1ZXVpbmdTdHJhdGVneSB9IGZyb20gJy4vdmFsaWRhdG9ycy9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7IEV4dHJhY3RIaWdoV2F0ZXJNYXJrLCBFeHRyYWN0U2l6ZUFsZ29yaXRobSB9IGZyb20gJy4vYWJzdHJhY3Qtb3BzL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IHsgY29udmVydFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlIH0gZnJvbSAnLi92YWxpZGF0b3JzL3VuZGVybHlpbmctc291cmNlJztcbmltcG9ydCB7IFJlYWRhYmxlU3RyZWFtR2V0UmVhZGVyT3B0aW9ucyB9IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL3JlYWRlci1vcHRpb25zJztcbmltcG9ydCB7IGNvbnZlcnRSZWFkZXJPcHRpb25zIH0gZnJvbSAnLi92YWxpZGF0b3JzL3JlYWRlci1vcHRpb25zJztcbmltcG9ydCB7IFN0cmVhbVBpcGVPcHRpb25zLCBWYWxpZGF0ZWRTdHJlYW1QaXBlT3B0aW9ucyB9IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL3BpcGUtb3B0aW9ucyc7XG5pbXBvcnQgeyBSZWFkYWJsZVN0cmVhbUl0ZXJhdG9yT3B0aW9ucyB9IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL2l0ZXJhdG9yLW9wdGlvbnMnO1xuaW1wb3J0IHsgY29udmVydEl0ZXJhdG9yT3B0aW9ucyB9IGZyb20gJy4vdmFsaWRhdG9ycy9pdGVyYXRvci1vcHRpb25zJztcbmltcG9ydCB7IGNvbnZlcnRQaXBlT3B0aW9ucyB9IGZyb20gJy4vdmFsaWRhdG9ycy9waXBlLW9wdGlvbnMnO1xuaW1wb3J0IHsgUmVhZGFibGVXcml0YWJsZVBhaXIgfSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbS9yZWFkYWJsZS13cml0YWJsZS1wYWlyJztcbmltcG9ydCB7IGNvbnZlcnRSZWFkYWJsZVdyaXRhYmxlUGFpciB9IGZyb20gJy4vdmFsaWRhdG9ycy9yZWFkYWJsZS13cml0YWJsZS1wYWlyJztcblxuZXhwb3J0IHR5cGUgUmVhZGFibGVCeXRlU3RyZWFtID0gUmVhZGFibGVTdHJlYW08VWludDhBcnJheT4gJiB7XG4gIF9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJcbn07XG5cbnR5cGUgUmVhZGFibGVTdHJlYW1TdGF0ZSA9ICdyZWFkYWJsZScgfCAnY2xvc2VkJyB8ICdlcnJvcmVkJztcblxuLyoqXG4gKiBBIHJlYWRhYmxlIHN0cmVhbSByZXByZXNlbnRzIGEgc291cmNlIG9mIGRhdGEsIGZyb20gd2hpY2ggeW91IGNhbiByZWFkLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRhYmxlU3RyZWFtPFIgPSBhbnk+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RhdGUhOiBSZWFkYWJsZVN0cmVhbVN0YXRlO1xuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkZXI6IFJlYWRhYmxlU3RyZWFtUmVhZGVyPFI+IHwgdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF9zdG9yZWRFcnJvcjogYW55O1xuICAvKiogQGludGVybmFsICovXG4gIF9kaXN0dXJiZWQhOiBib29sZWFuO1xuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIhOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+IHwgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcjtcblxuICBjb25zdHJ1Y3Rvcih1bmRlcmx5aW5nU291cmNlOiBVbmRlcmx5aW5nQnl0ZVNvdXJjZSwgc3RyYXRlZ3k/OiB7IGhpZ2hXYXRlck1hcms/OiBudW1iZXI7IHNpemU/OiB1bmRlZmluZWQgfSk7XG4gIGNvbnN0cnVjdG9yKHVuZGVybHlpbmdTb3VyY2U/OiBVbmRlcmx5aW5nU291cmNlPFI+LCBzdHJhdGVneT86IFF1ZXVpbmdTdHJhdGVneTxSPik7XG4gIGNvbnN0cnVjdG9yKHJhd1VuZGVybHlpbmdTb3VyY2U6IFVuZGVybHlpbmdTb3VyY2U8Uj4gfCBVbmRlcmx5aW5nQnl0ZVNvdXJjZSB8IG51bGwgfCB1bmRlZmluZWQgPSB7fSxcbiAgICAgICAgICAgICAgcmF3U3RyYXRlZ3k6IFF1ZXVpbmdTdHJhdGVneTxSPiB8IG51bGwgfCB1bmRlZmluZWQgPSB7fSkge1xuICAgIGlmIChyYXdVbmRlcmx5aW5nU291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJhd1VuZGVybHlpbmdTb3VyY2UgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnRPYmplY3QocmF3VW5kZXJseWluZ1NvdXJjZSwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0cmF0ZWd5ID0gY29udmVydFF1ZXVpbmdTdHJhdGVneShyYXdTdHJhdGVneSwgJ1NlY29uZCBwYXJhbWV0ZXInKTtcbiAgICBjb25zdCB1bmRlcmx5aW5nU291cmNlID0gY29udmVydFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlKHJhd1VuZGVybHlpbmdTb3VyY2UsICdGaXJzdCBwYXJhbWV0ZXInKTtcblxuICAgIEluaXRpYWxpemVSZWFkYWJsZVN0cmVhbSh0aGlzKTtcblxuICAgIGlmICh1bmRlcmx5aW5nU291cmNlLnR5cGUgPT09ICdieXRlcycpIHtcbiAgICAgIGlmIChzdHJhdGVneS5zaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBzdHJhdGVneSBmb3IgYSBieXRlIHN0cmVhbSBjYW5ub3QgaGF2ZSBhIHNpemUgZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGhpZ2hXYXRlck1hcmsgPSBFeHRyYWN0SGlnaFdhdGVyTWFyayhzdHJhdGVneSwgMCk7XG4gICAgICBTZXRVcFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NvdXJjZShcbiAgICAgICAgdGhpcyBhcyB1bmtub3duIGFzIFJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgICAgICAgdW5kZXJseWluZ1NvdXJjZSxcbiAgICAgICAgaGlnaFdhdGVyTWFya1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzZXJ0KHVuZGVybHlpbmdTb3VyY2UudHlwZSA9PT0gdW5kZWZpbmVkKTtcbiAgICAgIGNvbnN0IHNpemVBbGdvcml0aG0gPSBFeHRyYWN0U2l6ZUFsZ29yaXRobShzdHJhdGVneSk7XG4gICAgICBjb25zdCBoaWdoV2F0ZXJNYXJrID0gRXh0cmFjdEhpZ2hXYXRlck1hcmsoc3RyYXRlZ3ksIDEpO1xuICAgICAgU2V0VXBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRnJvbVVuZGVybHlpbmdTb3VyY2UoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHVuZGVybHlpbmdTb3VyY2UsXG4gICAgICAgIGhpZ2hXYXRlck1hcmssXG4gICAgICAgIHNpemVBbGdvcml0aG1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSByZWFkYWJsZSBzdHJlYW0gaXMgbG9ja2VkIHRvIGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlciB8IHJlYWRlcn0uXG4gICAqL1xuICBnZXQgbG9ja2VkKCk6IGJvb2xlYW4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbignbG9ja2VkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIElzUmVhZGFibGVTdHJlYW1Mb2NrZWQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyB0aGUgc3RyZWFtLCBzaWduYWxpbmcgYSBsb3NzIG9mIGludGVyZXN0IGluIHRoZSBzdHJlYW0gYnkgYSBjb25zdW1lci5cbiAgICpcbiAgICogVGhlIHN1cHBsaWVkIGByZWFzb25gIGFyZ3VtZW50IHdpbGwgYmUgZ2l2ZW4gdG8gdGhlIHVuZGVybHlpbmcgc291cmNlJ3Mge0BsaW5rIFVuZGVybHlpbmdTb3VyY2UuY2FuY2VsIHwgY2FuY2VsKCl9XG4gICAqIG1ldGhvZCwgd2hpY2ggbWlnaHQgb3IgbWlnaHQgbm90IHVzZSBpdC5cbiAgICovXG4gIGNhbmNlbChyZWFzb246IGFueSA9IHVuZGVmaW5lZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbignY2FuY2VsJykpO1xuICAgIH1cblxuICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FuY2VsIGEgc3RyZWFtIHRoYXQgYWxyZWFkeSBoYXMgYSByZWFkZXInKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHRoaXMsIHJlYXNvbik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHtAbGluayBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXJ9IGFuZCBsb2NrcyB0aGUgc3RyZWFtIHRvIHRoZSBuZXcgcmVhZGVyLlxuICAgKlxuICAgKiBUaGlzIGNhbGwgYmVoYXZlcyB0aGUgc2FtZSB3YXkgYXMgdGhlIG5vLWFyZ3VtZW50IHZhcmlhbnQsIGV4Y2VwdCB0aGF0IGl0IG9ubHkgd29ya3Mgb24gcmVhZGFibGUgYnl0ZSBzdHJlYW1zLFxuICAgKiBpLmUuIHN0cmVhbXMgd2hpY2ggd2VyZSBjb25zdHJ1Y3RlZCBzcGVjaWZpY2FsbHkgd2l0aCB0aGUgYWJpbGl0eSB0byBoYW5kbGUgXCJicmluZyB5b3VyIG93biBidWZmZXJcIiByZWFkaW5nLlxuICAgKiBUaGUgcmV0dXJuZWQgQllPQiByZWFkZXIgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gZGlyZWN0bHkgcmVhZCBpbmRpdmlkdWFsIGNodW5rcyBmcm9tIHRoZSBzdHJlYW0gdmlhIGl0c1xuICAgKiB7QGxpbmsgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnJlYWQgfCByZWFkKCl9IG1ldGhvZCwgaW50byBkZXZlbG9wZXItc3VwcGxpZWQgYnVmZmVycywgYWxsb3dpbmcgbW9yZSBwcmVjaXNlXG4gICAqIGNvbnRyb2wgb3ZlciBhbGxvY2F0aW9uLlxuICAgKi9cbiAgZ2V0UmVhZGVyKHsgbW9kZSB9OiB7IG1vZGU6ICdieW9iJyB9KTogUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyO1xuICAvKipcbiAgICogQ3JlYXRlcyBhIHtAbGluayBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJ9IGFuZCBsb2NrcyB0aGUgc3RyZWFtIHRvIHRoZSBuZXcgcmVhZGVyLlxuICAgKiBXaGlsZSB0aGUgc3RyZWFtIGlzIGxvY2tlZCwgbm8gb3RoZXIgcmVhZGVyIGNhbiBiZSBhY3F1aXJlZCB1bnRpbCB0aGlzIG9uZSBpcyByZWxlYXNlZC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbmFsaXR5IGlzIGVzcGVjaWFsbHkgdXNlZnVsIGZvciBjcmVhdGluZyBhYnN0cmFjdGlvbnMgdGhhdCBkZXNpcmUgdGhlIGFiaWxpdHkgdG8gY29uc3VtZSBhIHN0cmVhbVxuICAgKiBpbiBpdHMgZW50aXJldHkuIEJ5IGdldHRpbmcgYSByZWFkZXIgZm9yIHRoZSBzdHJlYW0sIHlvdSBjYW4gZW5zdXJlIG5vYm9keSBlbHNlIGNhbiBpbnRlcmxlYXZlIHJlYWRzIHdpdGggeW91cnNcbiAgICogb3IgY2FuY2VsIHRoZSBzdHJlYW0sIHdoaWNoIHdvdWxkIGludGVyZmVyZSB3aXRoIHlvdXIgYWJzdHJhY3Rpb24uXG4gICAqL1xuICBnZXRSZWFkZXIoKTogUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+O1xuICBnZXRSZWFkZXIoXG4gICAgcmF3T3B0aW9uczogUmVhZGFibGVTdHJlYW1HZXRSZWFkZXJPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxuICApOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4gfCBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbignZ2V0UmVhZGVyJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IGNvbnZlcnRSZWFkZXJPcHRpb25zKHJhd09wdGlvbnMsICdGaXJzdCBwYXJhbWV0ZXInKTtcblxuICAgIGlmIChvcHRpb25zLm1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIodGhpcyk7XG4gICAgfVxuXG4gICAgYXNzZXJ0KG9wdGlvbnMubW9kZSA9PT0gJ2J5b2InKTtcbiAgICByZXR1cm4gQWNxdWlyZVJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih0aGlzIGFzIHVua25vd24gYXMgUmVhZGFibGVCeXRlU3RyZWFtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIGNvbnZlbmllbnQsIGNoYWluYWJsZSB3YXkgb2YgcGlwaW5nIHRoaXMgcmVhZGFibGUgc3RyZWFtIHRocm91Z2ggYSB0cmFuc2Zvcm0gc3RyZWFtXG4gICAqIChvciBhbnkgb3RoZXIgYHsgd3JpdGFibGUsIHJlYWRhYmxlIH1gIHBhaXIpLiBJdCBzaW1wbHkge0BsaW5rIFJlYWRhYmxlU3RyZWFtLnBpcGVUbyB8IHBpcGVzfSB0aGUgc3RyZWFtXG4gICAqIGludG8gdGhlIHdyaXRhYmxlIHNpZGUgb2YgdGhlIHN1cHBsaWVkIHBhaXIsIGFuZCByZXR1cm5zIHRoZSByZWFkYWJsZSBzaWRlIGZvciBmdXJ0aGVyIHVzZS5cbiAgICpcbiAgICogUGlwaW5nIGEgc3RyZWFtIHdpbGwgbG9jayBpdCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSBwaXBlLCBwcmV2ZW50aW5nIGFueSBvdGhlciBjb25zdW1lciBmcm9tIGFjcXVpcmluZyBhIHJlYWRlci5cbiAgICovXG4gIHBpcGVUaHJvdWdoPFJTIGV4dGVuZHMgUmVhZGFibGVTdHJlYW0+KFxuICAgIHRyYW5zZm9ybTogeyByZWFkYWJsZTogUlM7IHdyaXRhYmxlOiBXcml0YWJsZVN0cmVhbTxSPiB9LFxuICAgIG9wdGlvbnM/OiBTdHJlYW1QaXBlT3B0aW9uc1xuICApOiBSUztcbiAgcGlwZVRocm91Z2g8UlMgZXh0ZW5kcyBSZWFkYWJsZVN0cmVhbT4oXG4gICAgcmF3VHJhbnNmb3JtOiB7IHJlYWRhYmxlOiBSUzsgd3JpdGFibGU6IFdyaXRhYmxlU3RyZWFtPFI+IH0gfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIHJhd09wdGlvbnM6IFN0cmVhbVBpcGVPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9XG4gICk6IFJTIHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ3BpcGVUaHJvdWdoJyk7XG4gICAgfVxuICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQocmF3VHJhbnNmb3JtLCAxLCAncGlwZVRocm91Z2gnKTtcblxuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGNvbnZlcnRSZWFkYWJsZVdyaXRhYmxlUGFpcihyYXdUcmFuc2Zvcm0sICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICBjb25zdCBvcHRpb25zID0gY29udmVydFBpcGVPcHRpb25zKHJhd09wdGlvbnMsICdTZWNvbmQgcGFyYW1ldGVyJyk7XG5cbiAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUxvY2tlZCh0aGlzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnBpcGVUaHJvdWdoIGNhbm5vdCBiZSB1c2VkIG9uIGEgbG9ja2VkIFJlYWRhYmxlU3RyZWFtJyk7XG4gICAgfVxuICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHRyYW5zZm9ybS53cml0YWJsZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS5waXBlVGhyb3VnaCBjYW5ub3QgYmUgdXNlZCBvbiBhIGxvY2tlZCBXcml0YWJsZVN0cmVhbScpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2UgPSBSZWFkYWJsZVN0cmVhbVBpcGVUbyhcbiAgICAgIHRoaXMsIHRyYW5zZm9ybS53cml0YWJsZSwgb3B0aW9ucy5wcmV2ZW50Q2xvc2UsIG9wdGlvbnMucHJldmVudEFib3J0LCBvcHRpb25zLnByZXZlbnRDYW5jZWwsIG9wdGlvbnMuc2lnbmFsXG4gICAgKTtcblxuICAgIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtLnJlYWRhYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoaXMgcmVhZGFibGUgc3RyZWFtIHRvIGEgZ2l2ZW4gd3JpdGFibGUgc3RyZWFtLiBUaGUgd2F5IGluIHdoaWNoIHRoZSBwaXBpbmcgcHJvY2VzcyBiZWhhdmVzIHVuZGVyXG4gICAqIHZhcmlvdXMgZXJyb3IgY29uZGl0aW9ucyBjYW4gYmUgY3VzdG9taXplZCB3aXRoIGEgbnVtYmVyIG9mIHBhc3NlZCBvcHRpb25zLiBJdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGZ1bGZpbGxzXG4gICAqIHdoZW4gdGhlIHBpcGluZyBwcm9jZXNzIGNvbXBsZXRlcyBzdWNjZXNzZnVsbHksIG9yIHJlamVjdHMgaWYgYW55IGVycm9ycyB3ZXJlIGVuY291bnRlcmVkLlxuICAgKlxuICAgKiBQaXBpbmcgYSBzdHJlYW0gd2lsbCBsb2NrIGl0IGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIHBpcGUsIHByZXZlbnRpbmcgYW55IG90aGVyIGNvbnN1bWVyIGZyb20gYWNxdWlyaW5nIGEgcmVhZGVyLlxuICAgKi9cbiAgcGlwZVRvKGRlc3RpbmF0aW9uOiBXcml0YWJsZVN0cmVhbTxSPiwgb3B0aW9ucz86IFN0cmVhbVBpcGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgcGlwZVRvKGRlc3RpbmF0aW9uOiBXcml0YWJsZVN0cmVhbTxSPiB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgICAgICByYXdPcHRpb25zOiBTdHJlYW1QaXBlT3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWQgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbigncGlwZVRvJykpO1xuICAgIH1cblxuICAgIGlmIChkZXN0aW5hdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChgUGFyYW1ldGVyIDEgaXMgcmVxdWlyZWQgaW4gJ3BpcGVUbycuYCk7XG4gICAgfVxuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbShkZXN0aW5hdGlvbikpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKFxuICAgICAgICBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUucGlwZVRvJ3MgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIFdyaXRhYmxlU3RyZWFtYClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnM6IFZhbGlkYXRlZFN0cmVhbVBpcGVPcHRpb25zO1xuICAgIHRyeSB7XG4gICAgICBvcHRpb25zID0gY29udmVydFBpcGVPcHRpb25zKHJhd09wdGlvbnMsICdTZWNvbmQgcGFyYW1ldGVyJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZSk7XG4gICAgfVxuXG4gICAgaWYgKElzUmVhZGFibGVTdHJlYW1Mb2NrZWQodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKFxuICAgICAgICBuZXcgVHlwZUVycm9yKCdSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUucGlwZVRvIGNhbm5vdCBiZSB1c2VkIG9uIGEgbG9ja2VkIFJlYWRhYmxlU3RyZWFtJylcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKGRlc3RpbmF0aW9uKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoXG4gICAgICAgIG5ldyBUeXBlRXJyb3IoJ1JlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS5waXBlVG8gY2Fubm90IGJlIHVzZWQgb24gYSBsb2NrZWQgV3JpdGFibGVTdHJlYW0nKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1QaXBlVG88Uj4oXG4gICAgICB0aGlzLCBkZXN0aW5hdGlvbiwgb3B0aW9ucy5wcmV2ZW50Q2xvc2UsIG9wdGlvbnMucHJldmVudEFib3J0LCBvcHRpb25zLnByZXZlbnRDYW5jZWwsIG9wdGlvbnMuc2lnbmFsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWVzIHRoaXMgcmVhZGFibGUgc3RyZWFtLCByZXR1cm5pbmcgYSB0d28tZWxlbWVudCBhcnJheSBjb250YWluaW5nIHRoZSB0d28gcmVzdWx0aW5nIGJyYW5jaGVzIGFzXG4gICAqIG5ldyB7QGxpbmsgUmVhZGFibGVTdHJlYW19IGluc3RhbmNlcy5cbiAgICpcbiAgICogVGVlaW5nIGEgc3RyZWFtIHdpbGwgbG9jayBpdCwgcHJldmVudGluZyBhbnkgb3RoZXIgY29uc3VtZXIgZnJvbSBhY3F1aXJpbmcgYSByZWFkZXIuXG4gICAqIFRvIGNhbmNlbCB0aGUgc3RyZWFtLCBjYW5jZWwgYm90aCBvZiB0aGUgcmVzdWx0aW5nIGJyYW5jaGVzOyBhIGNvbXBvc2l0ZSBjYW5jZWxsYXRpb24gcmVhc29uIHdpbGwgdGhlbiBiZVxuICAgKiBwcm9wYWdhdGVkIHRvIHRoZSBzdHJlYW0ncyB1bmRlcmx5aW5nIHNvdXJjZS5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSBjaHVua3Mgc2VlbiBpbiBlYWNoIGJyYW5jaCB3aWxsIGJlIHRoZSBzYW1lIG9iamVjdC4gSWYgdGhlIGNodW5rcyBhcmUgbm90IGltbXV0YWJsZSxcbiAgICogdGhpcyBjb3VsZCBhbGxvdyBpbnRlcmZlcmVuY2UgYmV0d2VlbiB0aGUgdHdvIGJyYW5jaGVzLlxuICAgKi9cbiAgdGVlKCk6IFtSZWFkYWJsZVN0cmVhbTxSPiwgUmVhZGFibGVTdHJlYW08Uj5dIHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ3RlZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGJyYW5jaGVzID0gUmVhZGFibGVTdHJlYW1UZWUodGhpcywgZmFsc2UpO1xuICAgIHJldHVybiBDcmVhdGVBcnJheUZyb21MaXN0KGJyYW5jaGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3luY2hyb25vdXNseSBpdGVyYXRlcyBvdmVyIHRoZSBjaHVua3MgaW4gdGhlIHN0cmVhbSdzIGludGVybmFsIHF1ZXVlLlxuICAgKlxuICAgKiBBc3luY2hyb25vdXNseSBpdGVyYXRpbmcgb3ZlciB0aGUgc3RyZWFtIHdpbGwgbG9jayBpdCwgcHJldmVudGluZyBhbnkgb3RoZXIgY29uc3VtZXIgZnJvbSBhY3F1aXJpbmcgYSByZWFkZXIuXG4gICAqIFRoZSBsb2NrIHdpbGwgYmUgcmVsZWFzZWQgaWYgdGhlIGFzeW5jIGl0ZXJhdG9yJ3Mge0BsaW5rIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvci5yZXR1cm4gfCByZXR1cm4oKX0gbWV0aG9kXG4gICAqIGlzIGNhbGxlZCwgZS5nLiBieSBicmVha2luZyBvdXQgb2YgdGhlIGxvb3AuXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIGNhbGxpbmcgdGhlIGFzeW5jIGl0ZXJhdG9yJ3Mge0BsaW5rIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvci5yZXR1cm4gfCByZXR1cm4oKX0gbWV0aG9kIHdpbGwgYWxzb1xuICAgKiBjYW5jZWwgdGhlIHN0cmVhbS4gVG8gcHJldmVudCB0aGlzLCB1c2UgdGhlIHN0cmVhbSdzIHtAbGluayBSZWFkYWJsZVN0cmVhbS52YWx1ZXMgfCB2YWx1ZXMoKX0gbWV0aG9kLCBwYXNzaW5nXG4gICAqIGB0cnVlYCBmb3IgdGhlIGBwcmV2ZW50Q2FuY2VsYCBvcHRpb24uXG4gICAqL1xuICB2YWx1ZXMob3B0aW9ucz86IFJlYWRhYmxlU3RyZWFtSXRlcmF0b3JPcHRpb25zKTogUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yPFI+O1xuICB2YWx1ZXMocmF3T3B0aW9uczogUmVhZGFibGVTdHJlYW1JdGVyYXRvck9wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKTogUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yPFI+IHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ3ZhbHVlcycpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSBjb252ZXJ0SXRlcmF0b3JPcHRpb25zKHJhd09wdGlvbnMsICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICByZXR1cm4gQWNxdWlyZVJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvcjxSPih0aGlzLCBvcHRpb25zLnByZXZlbnRDYW5jZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBSZWFkYWJsZVN0cmVhbS52YWx1ZXN9XG4gICAqL1xuICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdOiAob3B0aW9ucz86IFJlYWRhYmxlU3RyZWFtSXRlcmF0b3JPcHRpb25zKSA9PiBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8Uj47XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSwge1xuICBjYW5jZWw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBnZXRSZWFkZXI6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBwaXBlVGhyb3VnaDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHBpcGVUbzogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHRlZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHZhbHVlczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGxvY2tlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgIHZhbHVlOiAnUmVhZGFibGVTdHJlYW0nLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cbmlmICh0eXBlb2YgU3ltYm9sLmFzeW5jSXRlcmF0b3IgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUsIFN5bWJvbC5hc3luY0l0ZXJhdG9yLCB7XG4gICAgdmFsdWU6IFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS52YWx1ZXMsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5leHBvcnQge1xuICBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQsXG4gIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRSZXN1bHQsXG4gIFVuZGVybHlpbmdCeXRlU291cmNlLFxuICBVbmRlcmx5aW5nU291cmNlLFxuICBVbmRlcmx5aW5nU291cmNlU3RhcnRDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NvdXJjZVB1bGxDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NvdXJjZUNhbmNlbENhbGxiYWNrLFxuICBVbmRlcmx5aW5nQnl0ZVNvdXJjZVN0YXJ0Q2FsbGJhY2ssXG4gIFVuZGVybHlpbmdCeXRlU291cmNlUHVsbENhbGxiYWNrLFxuICBTdHJlYW1QaXBlT3B0aW9ucyxcbiAgUmVhZGFibGVXcml0YWJsZVBhaXIsXG4gIFJlYWRhYmxlU3RyZWFtSXRlcmF0b3JPcHRpb25zXG59O1xuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5cbi8vIFRocm93cyBpZiBhbmQgb25seSBpZiBzdGFydEFsZ29yaXRobSB0aHJvd3MuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlUmVhZGFibGVTdHJlYW08Uj4oc3RhcnRBbGdvcml0aG06ICgpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWxsQWxnb3JpdGhtOiAoKSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEFsZ29yaXRobTogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hXYXRlck1hcmsgPSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemVBbGdvcml0aG06IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxSPiA9ICgpID0+IDEpOiBSZWFkYWJsZVN0cmVhbTxSPiB7XG4gIGFzc2VydChJc05vbk5lZ2F0aXZlTnVtYmVyKGhpZ2hXYXRlck1hcmspKTtcblxuICBjb25zdCBzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFI+ID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUpO1xuICBJbml0aWFsaXplUmVhZGFibGVTdHJlYW0oc3RyZWFtKTtcblxuICBjb25zdCBjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+ID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSk7XG4gIFNldFVwUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcihcbiAgICBzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG1cbiAgKTtcblxuICByZXR1cm4gc3RyZWFtO1xufVxuXG4vLyBUaHJvd3MgaWYgYW5kIG9ubHkgaWYgc3RhcnRBbGdvcml0aG0gdGhyb3dzLlxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZVJlYWRhYmxlQnl0ZVN0cmVhbShcbiAgc3RhcnRBbGdvcml0aG06ICgpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPixcbiAgcHVsbEFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPixcbiAgY2FuY2VsQWxnb3JpdGhtOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD5cbik6IFJlYWRhYmxlQnl0ZVN0cmVhbSB7XG4gIGNvbnN0IHN0cmVhbTogUmVhZGFibGVCeXRlU3RyZWFtID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUpO1xuICBJbml0aWFsaXplUmVhZGFibGVTdHJlYW0oc3RyZWFtKTtcblxuICBjb25zdCBjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLnByb3RvdHlwZSk7XG4gIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIDAsIHVuZGVmaW5lZCk7XG5cbiAgcmV0dXJuIHN0cmVhbTtcbn1cblxuZnVuY3Rpb24gSW5pdGlhbGl6ZVJlYWRhYmxlU3RyZWFtKHN0cmVhbTogUmVhZGFibGVTdHJlYW0pIHtcbiAgc3RyZWFtLl9zdGF0ZSA9ICdyZWFkYWJsZSc7XG4gIHN0cmVhbS5fcmVhZGVyID0gdW5kZWZpbmVkO1xuICBzdHJlYW0uX3N0b3JlZEVycm9yID0gdW5kZWZpbmVkO1xuICBzdHJlYW0uX2Rpc3R1cmJlZCA9IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbSh4OiB1bmtub3duKTogeCBpcyBSZWFkYWJsZVN0cmVhbSB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXInKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtRGlzdHVyYmVkKHN0cmVhbTogUmVhZGFibGVTdHJlYW0pOiBib29sZWFuIHtcbiAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW0oc3RyZWFtKSk7XG5cbiAgcmV0dXJuIHN0cmVhbS5fZGlzdHVyYmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbUxvY2tlZChzdHJlYW06IFJlYWRhYmxlU3RyZWFtKTogYm9vbGVhbiB7XG4gIGFzc2VydChJc1JlYWRhYmxlU3RyZWFtKHN0cmVhbSkpO1xuXG4gIGlmIChzdHJlYW0uX3JlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIFJlYWRhYmxlU3RyZWFtIEFQSSBleHBvc2VkIGZvciBjb250cm9sbGVycy5cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtQ2FuY2VsPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4sIHJlYXNvbjogYW55KTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgc3RyZWFtLl9kaXN0dXJiZWQgPSB0cnVlO1xuXG4gIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gIH1cbiAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICB9XG5cbiAgUmVhZGFibGVTdHJlYW1DbG9zZShzdHJlYW0pO1xuXG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuICBpZiAocmVhZGVyICE9PSB1bmRlZmluZWQgJiYgSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIocmVhZGVyKSkge1xuICAgIHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cy5mb3JFYWNoKHJlYWRJbnRvUmVxdWVzdCA9PiB7XG4gICAgICByZWFkSW50b1JlcXVlc3QuX2Nsb3NlU3RlcHModW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICByZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgfVxuXG4gIGNvbnN0IHNvdXJjZUNhbmNlbFByb21pc2UgPSBzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcltDYW5jZWxTdGVwc10ocmVhc29uKTtcbiAgcmV0dXJuIHRyYW5zZm9ybVByb21pc2VXaXRoKHNvdXJjZUNhbmNlbFByb21pc2UsIG5vb3ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1DbG9zZTxSPihzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFI+KTogdm9pZCB7XG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnKTtcblxuICBzdHJlYW0uX3N0YXRlID0gJ2Nsb3NlZCc7XG5cbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLl9yZWFkZXI7XG5cbiAgaWYgKHJlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZXNvbHZlKHJlYWRlcik7XG5cbiAgaWYgKElzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+KHJlYWRlcikpIHtcbiAgICByZWFkZXIuX3JlYWRSZXF1ZXN0cy5mb3JFYWNoKHJlYWRSZXF1ZXN0ID0+IHtcbiAgICAgIHJlYWRSZXF1ZXN0Ll9jbG9zZVN0ZXBzKCk7XG4gICAgfSk7XG4gICAgcmVhZGVyLl9yZWFkUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1FcnJvcjxSPihzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFI+LCBlOiBhbnkpOiB2b2lkIHtcbiAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW0oc3RyZWFtKSk7XG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnKTtcblxuICBzdHJlYW0uX3N0YXRlID0gJ2Vycm9yZWQnO1xuICBzdHJlYW0uX3N0b3JlZEVycm9yID0gZTtcblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcblxuICBpZiAocmVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlamVjdChyZWFkZXIsIGUpO1xuXG4gIGlmIChJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPihyZWFkZXIpKSB7XG4gICAgcmVhZGVyLl9yZWFkUmVxdWVzdHMuZm9yRWFjaChyZWFkUmVxdWVzdCA9PiB7XG4gICAgICByZWFkUmVxdWVzdC5fZXJyb3JTdGVwcyhlKTtcbiAgICB9KTtcblxuICAgIHJlYWRlci5fcmVhZFJlcXVlc3RzID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gIH0gZWxzZSB7XG4gICAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHJlYWRlcikpO1xuXG4gICAgcmVhZGVyLl9yZWFkSW50b1JlcXVlc3RzLmZvckVhY2gocmVhZEludG9SZXF1ZXN0ID0+IHtcbiAgICAgIHJlYWRJbnRvUmVxdWVzdC5fZXJyb3JTdGVwcyhlKTtcbiAgICB9KTtcblxuICAgIHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICB9XG59XG5cbi8vIFJlYWRlcnNcblxuZXhwb3J0IHR5cGUgUmVhZGFibGVTdHJlYW1SZWFkZXI8Uj4gPSBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4gfCBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXI7XG5cbmV4cG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcixcbiAgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyXG59O1xuXG4vLyBDb250cm9sbGVyc1xuXG5leHBvcnQge1xuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLFxuICBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LFxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyXG59O1xuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5cbmZ1bmN0aW9uIHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZVN0cmVhbWApO1xufVxuIiwgImltcG9ydCB7IFF1ZXVpbmdTdHJhdGVneUluaXQgfSBmcm9tICcuLi9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7IGFzc2VydERpY3Rpb25hcnksIGFzc2VydFJlcXVpcmVkRmllbGQsIGNvbnZlcnRVbnJlc3RyaWN0ZWREb3VibGUgfSBmcm9tICcuL2Jhc2ljJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lJbml0KGluaXQ6IFF1ZXVpbmdTdHJhdGVneUluaXQgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHN0cmluZyk6IFF1ZXVpbmdTdHJhdGVneUluaXQge1xuICBhc3NlcnREaWN0aW9uYXJ5KGluaXQsIGNvbnRleHQpO1xuICBjb25zdCBoaWdoV2F0ZXJNYXJrID0gaW5pdD8uaGlnaFdhdGVyTWFyaztcbiAgYXNzZXJ0UmVxdWlyZWRGaWVsZChoaWdoV2F0ZXJNYXJrLCAnaGlnaFdhdGVyTWFyaycsICdRdWV1aW5nU3RyYXRlZ3lJbml0Jyk7XG4gIHJldHVybiB7XG4gICAgaGlnaFdhdGVyTWFyazogY29udmVydFVucmVzdHJpY3RlZERvdWJsZShoaWdoV2F0ZXJNYXJrKVxuICB9O1xufVxuIiwgImltcG9ydCB7IFF1ZXVpbmdTdHJhdGVneSwgUXVldWluZ1N0cmF0ZWd5SW5pdCB9IGZyb20gJy4vcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyB0eXBlSXNPYmplY3QgfSBmcm9tICcuL2hlbHBlcnMvbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQgeyBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50IH0gZnJvbSAnLi92YWxpZGF0b3JzL2Jhc2ljJztcbmltcG9ydCB7IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lJbml0IH0gZnJvbSAnLi92YWxpZGF0b3JzL3F1ZXVpbmctc3RyYXRlZ3ktaW5pdCc7XG5cbi8vIFRoZSBzaXplIGZ1bmN0aW9uIG11c3Qgbm90IGhhdmUgYSBwcm90b3R5cGUgcHJvcGVydHkgbm9yIGJlIGEgY29uc3RydWN0b3JcbmNvbnN0IGJ5dGVMZW5ndGhTaXplRnVuY3Rpb24gPSAoY2h1bms6IEFycmF5QnVmZmVyVmlldyk6IG51bWJlciA9PiB7XG4gIHJldHVybiBjaHVuay5ieXRlTGVuZ3RoO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShieXRlTGVuZ3RoU2l6ZUZ1bmN0aW9uLCAnbmFtZScsIHtcbiAgdmFsdWU6ICdzaXplJyxcbiAgY29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuLyoqXG4gKiBBIHF1ZXVpbmcgc3RyYXRlZ3kgdGhhdCBjb3VudHMgdGhlIG51bWJlciBvZiBieXRlcyBpbiBlYWNoIGNodW5rLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneSBpbXBsZW1lbnRzIFF1ZXVpbmdTdHJhdGVneTxBcnJheUJ1ZmZlclZpZXc+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICByZWFkb25seSBfYnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneUhpZ2hXYXRlck1hcms6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBRdWV1aW5nU3RyYXRlZ3lJbml0KSB7XG4gICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChvcHRpb25zLCAxLCAnQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneScpO1xuICAgIG9wdGlvbnMgPSBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5SW5pdChvcHRpb25zLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgdGhpcy5fYnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneUhpZ2hXYXRlck1hcmsgPSBvcHRpb25zLmhpZ2hXYXRlck1hcms7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaGlnaCB3YXRlciBtYXJrIHByb3ZpZGVkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gIGdldCBoaWdoV2F0ZXJNYXJrKCk6IG51bWJlciB7XG4gICAgaWYgKCFJc0J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kodGhpcykpIHtcbiAgICAgIHRocm93IGJ5dGVMZW5ndGhCcmFuZENoZWNrRXhjZXB0aW9uKCdoaWdoV2F0ZXJNYXJrJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ieXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyaztcbiAgfVxuXG4gIC8qKlxuICAgKiBNZWFzdXJlcyB0aGUgc2l6ZSBvZiBgY2h1bmtgIGJ5IHJldHVybmluZyB0aGUgdmFsdWUgb2YgaXRzIGBieXRlTGVuZ3RoYCBwcm9wZXJ0eS5cbiAgICovXG4gIGdldCBzaXplKCk6IChjaHVuazogQXJyYXlCdWZmZXJWaWV3KSA9PiBudW1iZXIge1xuICAgIGlmICghSXNCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5KHRoaXMpKSB7XG4gICAgICB0aHJvdyBieXRlTGVuZ3RoQnJhbmRDaGVja0V4Y2VwdGlvbignc2l6ZScpO1xuICAgIH1cbiAgICByZXR1cm4gYnl0ZUxlbmd0aFNpemVGdW5jdGlvbjtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZSwge1xuICBoaWdoV2F0ZXJNYXJrOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgc2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5JyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5LlxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihgQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneS5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5KHg6IGFueSk6IHggaXMgQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneSB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19ieXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyaycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5O1xufVxuIiwgImltcG9ydCB7IFF1ZXVpbmdTdHJhdGVneSwgUXVldWluZ1N0cmF0ZWd5SW5pdCB9IGZyb20gJy4vcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyB0eXBlSXNPYmplY3QgfSBmcm9tICcuL2hlbHBlcnMvbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQgeyBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50IH0gZnJvbSAnLi92YWxpZGF0b3JzL2Jhc2ljJztcbmltcG9ydCB7IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lJbml0IH0gZnJvbSAnLi92YWxpZGF0b3JzL3F1ZXVpbmctc3RyYXRlZ3ktaW5pdCc7XG5cbi8vIFRoZSBzaXplIGZ1bmN0aW9uIG11c3Qgbm90IGhhdmUgYSBwcm90b3R5cGUgcHJvcGVydHkgbm9yIGJlIGEgY29uc3RydWN0b3JcbmNvbnN0IGNvdW50U2l6ZUZ1bmN0aW9uID0gKCk6IDEgPT4ge1xuICByZXR1cm4gMTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoY291bnRTaXplRnVuY3Rpb24sICduYW1lJywge1xuICB2YWx1ZTogJ3NpemUnLFxuICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG4vKipcbiAqIEEgcXVldWluZyBzdHJhdGVneSB0aGF0IGNvdW50cyB0aGUgbnVtYmVyIG9mIGNodW5rcy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50UXVldWluZ1N0cmF0ZWd5IGltcGxlbWVudHMgUXVldWluZ1N0cmF0ZWd5PGFueT4ge1xuICAvKiogQGludGVybmFsICovXG4gIHJlYWRvbmx5IF9jb3VudFF1ZXVpbmdTdHJhdGVneUhpZ2hXYXRlck1hcmshOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUXVldWluZ1N0cmF0ZWd5SW5pdCkge1xuICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQob3B0aW9ucywgMSwgJ0NvdW50UXVldWluZ1N0cmF0ZWd5Jyk7XG4gICAgb3B0aW9ucyA9IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lJbml0KG9wdGlvbnMsICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICB0aGlzLl9jb3VudFF1ZXVpbmdTdHJhdGVneUhpZ2hXYXRlck1hcmsgPSBvcHRpb25zLmhpZ2hXYXRlck1hcms7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaGlnaCB3YXRlciBtYXJrIHByb3ZpZGVkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gIGdldCBoaWdoV2F0ZXJNYXJrKCk6IG51bWJlciB7XG4gICAgaWYgKCFJc0NvdW50UXVldWluZ1N0cmF0ZWd5KHRoaXMpKSB7XG4gICAgICB0aHJvdyBjb3VudEJyYW5kQ2hlY2tFeGNlcHRpb24oJ2hpZ2hXYXRlck1hcmsnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvdW50UXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyaztcbiAgfVxuXG4gIC8qKlxuICAgKiBNZWFzdXJlcyB0aGUgc2l6ZSBvZiBgY2h1bmtgIGJ5IGFsd2F5cyByZXR1cm5pbmcgMS5cbiAgICogVGhpcyBlbnN1cmVzIHRoYXQgdGhlIHRvdGFsIHF1ZXVlIHNpemUgaXMgYSBjb3VudCBvZiB0aGUgbnVtYmVyIG9mIGNodW5rcyBpbiB0aGUgcXVldWUuXG4gICAqL1xuICBnZXQgc2l6ZSgpOiAoY2h1bms6IGFueSkgPT4gMSB7XG4gICAgaWYgKCFJc0NvdW50UXVldWluZ1N0cmF0ZWd5KHRoaXMpKSB7XG4gICAgICB0aHJvdyBjb3VudEJyYW5kQ2hlY2tFeGNlcHRpb24oJ3NpemUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50U2l6ZUZ1bmN0aW9uO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKENvdW50UXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZSwge1xuICBoaWdoV2F0ZXJNYXJrOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgc2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb3VudFF1ZXVpbmdTdHJhdGVneS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgIHZhbHVlOiAnQ291bnRRdWV1aW5nU3RyYXRlZ3knLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIENvdW50UXVldWluZ1N0cmF0ZWd5LlxuXG5mdW5jdGlvbiBjb3VudEJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYENvdW50UXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBDb3VudFF1ZXVpbmdTdHJhdGVneWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNDb3VudFF1ZXVpbmdTdHJhdGVneSh4OiBhbnkpOiB4IGlzIENvdW50UXVldWluZ1N0cmF0ZWd5IHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2NvdW50UXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyaycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBDb3VudFF1ZXVpbmdTdHJhdGVneTtcbn1cbiIsICJpbXBvcnQgeyBhc3NlcnREaWN0aW9uYXJ5LCBhc3NlcnRGdW5jdGlvbiB9IGZyb20gJy4vYmFzaWMnO1xuaW1wb3J0IHsgcHJvbWlzZUNhbGwsIHJlZmxlY3RDYWxsIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHtcbiAgVHJhbnNmb3JtZXIsXG4gIFRyYW5zZm9ybWVyRmx1c2hDYWxsYmFjayxcbiAgVHJhbnNmb3JtZXJTdGFydENhbGxiYWNrLFxuICBUcmFuc2Zvcm1lclRyYW5zZm9ybUNhbGxiYWNrLFxuICBWYWxpZGF0ZWRUcmFuc2Zvcm1lclxufSBmcm9tICcuLi90cmFuc2Zvcm0tc3RyZWFtL3RyYW5zZm9ybWVyJztcbmltcG9ydCB7IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyIH0gZnJvbSAnLi4vdHJhbnNmb3JtLXN0cmVhbSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VHJhbnNmb3JtZXI8SSwgTz4ob3JpZ2luYWw6IFRyYW5zZm9ybWVyPEksIE8+IHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogVmFsaWRhdGVkVHJhbnNmb3JtZXI8SSwgTz4ge1xuICBhc3NlcnREaWN0aW9uYXJ5KG9yaWdpbmFsLCBjb250ZXh0KTtcbiAgY29uc3QgZmx1c2ggPSBvcmlnaW5hbD8uZmx1c2g7XG4gIGNvbnN0IHJlYWRhYmxlVHlwZSA9IG9yaWdpbmFsPy5yZWFkYWJsZVR5cGU7XG4gIGNvbnN0IHN0YXJ0ID0gb3JpZ2luYWw/LnN0YXJ0O1xuICBjb25zdCB0cmFuc2Zvcm0gPSBvcmlnaW5hbD8udHJhbnNmb3JtO1xuICBjb25zdCB3cml0YWJsZVR5cGUgPSBvcmlnaW5hbD8ud3JpdGFibGVUeXBlO1xuICByZXR1cm4ge1xuICAgIGZsdXNoOiBmbHVzaCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VHJhbnNmb3JtZXJGbHVzaENhbGxiYWNrKGZsdXNoLCBvcmlnaW5hbCEsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2ZsdXNoJyB0aGF0YCksXG4gICAgcmVhZGFibGVUeXBlLFxuICAgIHN0YXJ0OiBzdGFydCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VHJhbnNmb3JtZXJTdGFydENhbGxiYWNrKHN0YXJ0LCBvcmlnaW5hbCEsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3N0YXJ0JyB0aGF0YCksXG4gICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0gPT09IHVuZGVmaW5lZCA/XG4gICAgICB1bmRlZmluZWQgOlxuICAgICAgY29udmVydFRyYW5zZm9ybWVyVHJhbnNmb3JtQ2FsbGJhY2sodHJhbnNmb3JtLCBvcmlnaW5hbCEsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3RyYW5zZm9ybScgdGhhdGApLFxuICAgIHdyaXRhYmxlVHlwZVxuICB9O1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VHJhbnNmb3JtZXJGbHVzaENhbGxiYWNrPEksIE8+KFxuICBmbjogVHJhbnNmb3JtZXJGbHVzaENhbGxiYWNrPE8+LFxuICBvcmlnaW5hbDogVHJhbnNmb3JtZXI8SSwgTz4sXG4gIGNvbnRleHQ6IHN0cmluZ1xuKTogKGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+KSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICByZXR1cm4gKGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+KSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRUcmFuc2Zvcm1lclN0YXJ0Q2FsbGJhY2s8SSwgTz4oXG4gIGZuOiBUcmFuc2Zvcm1lclN0YXJ0Q2FsbGJhY2s8Tz4sXG4gIG9yaWdpbmFsOiBUcmFuc2Zvcm1lcjxJLCBPPixcbiAgY29udGV4dDogc3RyaW5nXG4pOiBUcmFuc2Zvcm1lclN0YXJ0Q2FsbGJhY2s8Tz4ge1xuICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gIHJldHVybiAoY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4pID0+IHJlZmxlY3RDYWxsKGZuLCBvcmlnaW5hbCwgW2NvbnRyb2xsZXJdKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFRyYW5zZm9ybWVyVHJhbnNmb3JtQ2FsbGJhY2s8SSwgTz4oXG4gIGZuOiBUcmFuc2Zvcm1lclRyYW5zZm9ybUNhbGxiYWNrPEksIE8+LFxuICBvcmlnaW5hbDogVHJhbnNmb3JtZXI8SSwgTz4sXG4gIGNvbnRleHQ6IHN0cmluZ1xuKTogKGNodW5rOiBJLCBjb250cm9sbGVyOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPikgPT4gUHJvbWlzZTx2b2lkPiB7XG4gIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgcmV0dXJuIChjaHVuazogSSwgY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4pID0+IHByb21pc2VDYWxsKGZuLCBvcmlnaW5hbCwgW2NodW5rLCBjb250cm9sbGVyXSk7XG59XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICcuLi9zdHViL2Fzc2VydCc7XG5pbXBvcnQgeyBuZXdQcm9taXNlLCBwcm9taXNlUmVqZWN0ZWRXaXRoLCBwcm9taXNlUmVzb2x2ZWRXaXRoLCB0cmFuc2Zvcm1Qcm9taXNlV2l0aCB9IGZyb20gJy4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHsgQ3JlYXRlUmVhZGFibGVTdHJlYW0sIFJlYWRhYmxlU3RyZWFtLCBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyIH0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZSxcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckhhc0JhY2twcmVzc3VyZVxufSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbS9kZWZhdWx0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUXVldWluZ1N0cmF0ZWd5LCBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2sgfSBmcm9tICcuL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IHsgQ3JlYXRlV3JpdGFibGVTdHJlYW0sIFdyaXRhYmxlU3RyZWFtLCBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3JJZk5lZWRlZCB9IGZyb20gJy4vd3JpdGFibGUtc3RyZWFtJztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4vaGVscGVycy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IElzTm9uTmVnYXRpdmVOdW1iZXIgfSBmcm9tICcuL2Fic3RyYWN0LW9wcy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3kgfSBmcm9tICcuL3ZhbGlkYXRvcnMvcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyBFeHRyYWN0SGlnaFdhdGVyTWFyaywgRXh0cmFjdFNpemVBbGdvcml0aG0gfSBmcm9tICcuL2Fic3RyYWN0LW9wcy9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7XG4gIFRyYW5zZm9ybWVyLFxuICBUcmFuc2Zvcm1lckZsdXNoQ2FsbGJhY2ssXG4gIFRyYW5zZm9ybWVyU3RhcnRDYWxsYmFjayxcbiAgVHJhbnNmb3JtZXJUcmFuc2Zvcm1DYWxsYmFjayxcbiAgVmFsaWRhdGVkVHJhbnNmb3JtZXJcbn0gZnJvbSAnLi90cmFuc2Zvcm0tc3RyZWFtL3RyYW5zZm9ybWVyJztcbmltcG9ydCB7IGNvbnZlcnRUcmFuc2Zvcm1lciB9IGZyb20gJy4vdmFsaWRhdG9ycy90cmFuc2Zvcm1lcic7XG5cbi8vIENsYXNzIFRyYW5zZm9ybVN0cmVhbVxuXG4vKipcbiAqIEEgdHJhbnNmb3JtIHN0cmVhbSBjb25zaXN0cyBvZiBhIHBhaXIgb2Ygc3RyZWFtczogYSB7QGxpbmsgV3JpdGFibGVTdHJlYW0gfCB3cml0YWJsZSBzdHJlYW19LFxuICoga25vd24gYXMgaXRzIHdyaXRhYmxlIHNpZGUsIGFuZCBhIHtAbGluayBSZWFkYWJsZVN0cmVhbSB8IHJlYWRhYmxlIHN0cmVhbX0sIGtub3duIGFzIGl0cyByZWFkYWJsZSBzaWRlLlxuICogSW4gYSBtYW5uZXIgc3BlY2lmaWMgdG8gdGhlIHRyYW5zZm9ybSBzdHJlYW0gaW4gcXVlc3Rpb24sIHdyaXRlcyB0byB0aGUgd3JpdGFibGUgc2lkZSByZXN1bHQgaW4gbmV3IGRhdGEgYmVpbmdcbiAqIG1hZGUgYXZhaWxhYmxlIGZvciByZWFkaW5nIGZyb20gdGhlIHJlYWRhYmxlIHNpZGUuXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtU3RyZWFtPEkgPSBhbnksIE8gPSBhbnk+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfd3JpdGFibGUhOiBXcml0YWJsZVN0cmVhbTxJPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVhZGFibGUhOiBSZWFkYWJsZVN0cmVhbTxPPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYmFja3ByZXNzdXJlITogYm9vbGVhbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZSE6IFByb21pc2U8dm9pZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2VfcmVzb2x2ZSE6ICgpID0+IHZvaWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXIhOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB0cmFuc2Zvcm1lcj86IFRyYW5zZm9ybWVyPEksIE8+LFxuICAgIHdyaXRhYmxlU3RyYXRlZ3k/OiBRdWV1aW5nU3RyYXRlZ3k8ST4sXG4gICAgcmVhZGFibGVTdHJhdGVneT86IFF1ZXVpbmdTdHJhdGVneTxPPlxuICApO1xuICBjb25zdHJ1Y3RvcihyYXdUcmFuc2Zvcm1lcjogVHJhbnNmb3JtZXI8SSwgTz4gfCBudWxsIHwgdW5kZWZpbmVkID0ge30sXG4gICAgICAgICAgICAgIHJhd1dyaXRhYmxlU3RyYXRlZ3k6IFF1ZXVpbmdTdHJhdGVneTxJPiB8IG51bGwgfCB1bmRlZmluZWQgPSB7fSxcbiAgICAgICAgICAgICAgcmF3UmVhZGFibGVTdHJhdGVneTogUXVldWluZ1N0cmF0ZWd5PE8+IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9KSB7XG4gICAgaWYgKHJhd1RyYW5zZm9ybWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJhd1RyYW5zZm9ybWVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB3cml0YWJsZVN0cmF0ZWd5ID0gY29udmVydFF1ZXVpbmdTdHJhdGVneShyYXdXcml0YWJsZVN0cmF0ZWd5LCAnU2Vjb25kIHBhcmFtZXRlcicpO1xuICAgIGNvbnN0IHJlYWRhYmxlU3RyYXRlZ3kgPSBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5KHJhd1JlYWRhYmxlU3RyYXRlZ3ksICdUaGlyZCBwYXJhbWV0ZXInKTtcblxuICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gY29udmVydFRyYW5zZm9ybWVyKHJhd1RyYW5zZm9ybWVyLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgaWYgKHRyYW5zZm9ybWVyLnJlYWRhYmxlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCByZWFkYWJsZVR5cGUgc3BlY2lmaWVkJyk7XG4gICAgfVxuICAgIGlmICh0cmFuc2Zvcm1lci53cml0YWJsZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgd3JpdGFibGVUeXBlIHNwZWNpZmllZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlYWRhYmxlSGlnaFdhdGVyTWFyayA9IEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHJlYWRhYmxlU3RyYXRlZ3ksIDApO1xuICAgIGNvbnN0IHJlYWRhYmxlU2l6ZUFsZ29yaXRobSA9IEV4dHJhY3RTaXplQWxnb3JpdGhtKHJlYWRhYmxlU3RyYXRlZ3kpO1xuICAgIGNvbnN0IHdyaXRhYmxlSGlnaFdhdGVyTWFyayA9IEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHdyaXRhYmxlU3RyYXRlZ3ksIDEpO1xuICAgIGNvbnN0IHdyaXRhYmxlU2l6ZUFsZ29yaXRobSA9IEV4dHJhY3RTaXplQWxnb3JpdGhtKHdyaXRhYmxlU3RyYXRlZ3kpO1xuXG4gICAgbGV0IHN0YXJ0UHJvbWlzZV9yZXNvbHZlITogKHZhbHVlOiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4pID0+IHZvaWQ7XG4gICAgY29uc3Qgc3RhcnRQcm9taXNlID0gbmV3UHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIHN0YXJ0UHJvbWlzZV9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIEluaXRpYWxpemVUcmFuc2Zvcm1TdHJlYW0oXG4gICAgICB0aGlzLCBzdGFydFByb21pc2UsIHdyaXRhYmxlSGlnaFdhdGVyTWFyaywgd3JpdGFibGVTaXplQWxnb3JpdGhtLCByZWFkYWJsZUhpZ2hXYXRlck1hcmssIHJlYWRhYmxlU2l6ZUFsZ29yaXRobVxuICAgICk7XG4gICAgU2V0VXBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21UcmFuc2Zvcm1lcih0aGlzLCB0cmFuc2Zvcm1lcik7XG5cbiAgICBpZiAodHJhbnNmb3JtZXIuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3RhcnRQcm9taXNlX3Jlc29sdmUodHJhbnNmb3JtZXIuc3RhcnQodGhpcy5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlcikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFByb21pc2VfcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVhZGFibGUgc2lkZSBvZiB0aGUgdHJhbnNmb3JtIHN0cmVhbS5cbiAgICovXG4gIGdldCByZWFkYWJsZSgpOiBSZWFkYWJsZVN0cmVhbTxPPiB7XG4gICAgaWYgKCFJc1RyYW5zZm9ybVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbigncmVhZGFibGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVhZGFibGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdyaXRhYmxlIHNpZGUgb2YgdGhlIHRyYW5zZm9ybSBzdHJlYW0uXG4gICAqL1xuICBnZXQgd3JpdGFibGUoKTogV3JpdGFibGVTdHJlYW08ST4ge1xuICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW0odGhpcykpIHtcbiAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ3dyaXRhYmxlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3dyaXRhYmxlO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFRyYW5zZm9ybVN0cmVhbS5wcm90b3R5cGUsIHtcbiAgcmVhZGFibGU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICB3cml0YWJsZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUcmFuc2Zvcm1TdHJlYW0ucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1RyYW5zZm9ybVN0cmVhbScsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5leHBvcnQge1xuICBUcmFuc2Zvcm1lcixcbiAgVHJhbnNmb3JtZXJTdGFydENhbGxiYWNrLFxuICBUcmFuc2Zvcm1lckZsdXNoQ2FsbGJhY2ssXG4gIFRyYW5zZm9ybWVyVHJhbnNmb3JtQ2FsbGJhY2tcbn07XG5cbi8vIFRyYW5zZm9ybSBTdHJlYW0gQWJzdHJhY3QgT3BlcmF0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlVHJhbnNmb3JtU3RyZWFtPEksIE8+KHN0YXJ0QWxnb3JpdGhtOiAoKSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybUFsZ29yaXRobTogKGNodW5rOiBJKSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbHVzaEFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGVIaWdoV2F0ZXJNYXJrID0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGVTaXplQWxnb3JpdGhtOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8ST4gPSAoKSA9PiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkYWJsZUhpZ2hXYXRlck1hcmsgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkYWJsZVNpemVBbGdvcml0aG06IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxPPiA9ICgpID0+IDEpIHtcbiAgYXNzZXJ0KElzTm9uTmVnYXRpdmVOdW1iZXIod3JpdGFibGVIaWdoV2F0ZXJNYXJrKSk7XG4gIGFzc2VydChJc05vbk5lZ2F0aXZlTnVtYmVyKHJlYWRhYmxlSGlnaFdhdGVyTWFyaykpO1xuXG4gIGNvbnN0IHN0cmVhbTogVHJhbnNmb3JtU3RyZWFtPEksIE8+ID0gT2JqZWN0LmNyZWF0ZShUcmFuc2Zvcm1TdHJlYW0ucHJvdG90eXBlKTtcblxuICBsZXQgc3RhcnRQcm9taXNlX3Jlc29sdmUhOiAodmFsdWU6IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPikgPT4gdm9pZDtcbiAgY29uc3Qgc3RhcnRQcm9taXNlID0gbmV3UHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICBzdGFydFByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIEluaXRpYWxpemVUcmFuc2Zvcm1TdHJlYW0oc3RyZWFtLCBzdGFydFByb21pc2UsIHdyaXRhYmxlSGlnaFdhdGVyTWFyaywgd3JpdGFibGVTaXplQWxnb3JpdGhtLCByZWFkYWJsZUhpZ2hXYXRlck1hcmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGFibGVTaXplQWxnb3JpdGhtKTtcblxuICBjb25zdCBjb250cm9sbGVyOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPiA9IE9iamVjdC5jcmVhdGUoVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlKTtcblxuICBTZXRVcFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgdHJhbnNmb3JtQWxnb3JpdGhtLCBmbHVzaEFsZ29yaXRobSk7XG5cbiAgY29uc3Qgc3RhcnRSZXN1bHQgPSBzdGFydEFsZ29yaXRobSgpO1xuICBzdGFydFByb21pc2VfcmVzb2x2ZShzdGFydFJlc3VsdCk7XG4gIHJldHVybiBzdHJlYW07XG59XG5cbmZ1bmN0aW9uIEluaXRpYWxpemVUcmFuc2Zvcm1TdHJlYW08SSwgTz4oc3RyZWFtOiBUcmFuc2Zvcm1TdHJlYW08SSwgTz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UHJvbWlzZTogUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGVIaWdoV2F0ZXJNYXJrOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlU2l6ZUFsZ29yaXRobTogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPEk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkYWJsZUhpZ2hXYXRlck1hcms6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGFibGVTaXplQWxnb3JpdGhtOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8Tz4pIHtcbiAgZnVuY3Rpb24gc3RhcnRBbGdvcml0aG0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHN0YXJ0UHJvbWlzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlQWxnb3JpdGhtKGNodW5rOiBJKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rV3JpdGVBbGdvcml0aG0oc3RyZWFtLCBjaHVuayk7XG4gIH1cblxuICBmdW5jdGlvbiBhYm9ydEFsZ29yaXRobShyZWFzb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U2lua0Fib3J0QWxnb3JpdGhtKHN0cmVhbSwgcmVhc29uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlQWxnb3JpdGhtKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U2lua0Nsb3NlQWxnb3JpdGhtKHN0cmVhbSk7XG4gIH1cblxuICBzdHJlYW0uX3dyaXRhYmxlID0gQ3JlYXRlV3JpdGFibGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHdyaXRlQWxnb3JpdGhtLCBjbG9zZUFsZ29yaXRobSwgYWJvcnRBbGdvcml0aG0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZUhpZ2hXYXRlck1hcmssIHdyaXRhYmxlU2l6ZUFsZ29yaXRobSk7XG5cbiAgZnVuY3Rpb24gcHVsbEFsZ29yaXRobSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNvdXJjZVB1bGxBbGdvcml0aG0oc3RyZWFtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbEFsZ29yaXRobShyZWFzb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yV3JpdGFibGVBbmRVbmJsb2NrV3JpdGUoc3RyZWFtLCByZWFzb24pO1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gIH1cblxuICBzdHJlYW0uX3JlYWRhYmxlID0gQ3JlYXRlUmVhZGFibGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgcmVhZGFibGVIaWdoV2F0ZXJNYXJrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGFibGVTaXplQWxnb3JpdGhtKTtcblxuICAvLyBUaGUgW1tiYWNrcHJlc3N1cmVdXSBzbG90IGlzIHNldCB0byB1bmRlZmluZWQgc28gdGhhdCBpdCBjYW4gYmUgaW5pdGlhbGlzZWQgYnkgVHJhbnNmb3JtU3RyZWFtU2V0QmFja3ByZXNzdXJlLlxuICBzdHJlYW0uX2JhY2twcmVzc3VyZSA9IHVuZGVmaW5lZCE7XG4gIHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZSA9IHVuZGVmaW5lZCE7XG4gIHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkITtcbiAgVHJhbnNmb3JtU3RyZWFtU2V0QmFja3ByZXNzdXJlKHN0cmVhbSwgdHJ1ZSk7XG5cbiAgc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyID0gdW5kZWZpbmVkITtcbn1cblxuZnVuY3Rpb24gSXNUcmFuc2Zvcm1TdHJlYW0oeDogdW5rbm93bik6IHggaXMgVHJhbnNmb3JtU3RyZWFtIHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXInKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgVHJhbnNmb3JtU3RyZWFtO1xufVxuXG4vLyBUaGlzIGlzIGEgbm8tb3AgaWYgYm90aCBzaWRlcyBhcmUgYWxyZWFkeSBlcnJvcmVkLlxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRXJyb3Ioc3RyZWFtOiBUcmFuc2Zvcm1TdHJlYW0sIGU6IGFueSkge1xuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoXG4gICAgc3RyZWFtLl9yZWFkYWJsZS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55PixcbiAgICBlXG4gICk7XG4gIFRyYW5zZm9ybVN0cmVhbUVycm9yV3JpdGFibGVBbmRVbmJsb2NrV3JpdGUoc3RyZWFtLCBlKTtcbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRXJyb3JXcml0YWJsZUFuZFVuYmxvY2tXcml0ZShzdHJlYW06IFRyYW5zZm9ybVN0cmVhbSwgZTogYW55KSB7XG4gIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKHN0cmVhbS5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlcik7XG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkKHN0cmVhbS5fd3JpdGFibGUuX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlciwgZSk7XG4gIGlmIChzdHJlYW0uX2JhY2twcmVzc3VyZSkge1xuICAgIC8vIFByZXRlbmQgdGhhdCBwdWxsKCkgd2FzIGNhbGxlZCB0byBwZXJtaXQgYW55IHBlbmRpbmcgd3JpdGUoKSBjYWxscyB0byBjb21wbGV0ZS4gVHJhbnNmb3JtU3RyZWFtU2V0QmFja3ByZXNzdXJlKClcbiAgICAvLyBjYW5ub3QgYmUgY2FsbGVkIGZyb20gZW5xdWV1ZSgpIG9yIHB1bGwoKSBvbmNlIHRoZSBSZWFkYWJsZVN0cmVhbSBpcyBlcnJvcmVkLCBzbyB0aGlzIHdpbGwgd2lsbCBiZSB0aGUgZmluYWwgdGltZVxuICAgIC8vIF9iYWNrcHJlc3N1cmUgaXMgc2V0LlxuICAgIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZShzdHJlYW0sIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoc3RyZWFtOiBUcmFuc2Zvcm1TdHJlYW0sIGJhY2twcmVzc3VyZTogYm9vbGVhbikge1xuICAvLyBQYXNzZXMgYWxzbyB3aGVuIGNhbGxlZCBkdXJpbmcgY29uc3RydWN0aW9uLlxuICBhc3NlcnQoc3RyZWFtLl9iYWNrcHJlc3N1cmUgIT09IGJhY2twcmVzc3VyZSk7XG5cbiAgaWYgKHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlX3Jlc29sdmUoKTtcbiAgfVxuXG4gIHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZSA9IG5ld1Byb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlX3Jlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBzdHJlYW0uX2JhY2twcmVzc3VyZSA9IGJhY2twcmVzc3VyZTtcbn1cblxuLy8gQ2xhc3MgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJcblxuLyoqXG4gKiBBbGxvd3MgY29udHJvbCBvZiB0aGUge0BsaW5rIFJlYWRhYmxlU3RyZWFtfSBhbmQge0BsaW5rIFdyaXRhYmxlU3RyZWFtfSBvZiB0aGUgYXNzb2NpYXRlZCB7QGxpbmsgVHJhbnNmb3JtU3RyZWFtfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW06IFRyYW5zZm9ybVN0cmVhbTxhbnksIE8+O1xuICAvKiogQGludGVybmFsICovXG4gIF90cmFuc2Zvcm1BbGdvcml0aG06IChjaHVuazogYW55KSA9PiBQcm9taXNlPHZvaWQ+O1xuICAvKiogQGludGVybmFsICovXG4gIF9mbHVzaEFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBkZXNpcmVkIHNpemUgdG8gZmlsbCB0aGUgcmVhZGFibGUgc2lkZVx1MjAxOXMgaW50ZXJuYWwgcXVldWUuIEl0IGNhbiBiZSBuZWdhdGl2ZSwgaWYgdGhlIHF1ZXVlIGlzIG92ZXItZnVsbC5cbiAgICovXG4gIGdldCBkZXNpcmVkU2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIUlzVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZGVzaXJlZFNpemUnKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWFkYWJsZUNvbnRyb2xsZXIgPSB0aGlzLl9jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtLl9yZWFkYWJsZS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyO1xuICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUocmVhZGFibGVDb250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEVucXVldWVzIHRoZSBnaXZlbiBjaHVuayBgY2h1bmtgIGluIHRoZSByZWFkYWJsZSBzaWRlIG9mIHRoZSBjb250cm9sbGVkIHRyYW5zZm9ybSBzdHJlYW0uXG4gICAqL1xuICBlbnF1ZXVlKGNodW5rOiBPKTogdm9pZDtcbiAgZW5xdWV1ZShjaHVuazogTyA9IHVuZGVmaW5lZCEpOiB2b2lkIHtcbiAgICBpZiAoIUlzVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZW5xdWV1ZScpO1xuICAgIH1cblxuICAgIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZSh0aGlzLCBjaHVuayk7XG4gIH1cblxuICAvKipcbiAgICogRXJyb3JzIGJvdGggdGhlIHJlYWRhYmxlIHNpZGUgYW5kIHRoZSB3cml0YWJsZSBzaWRlIG9mIHRoZSBjb250cm9sbGVkIHRyYW5zZm9ybSBzdHJlYW0sIG1ha2luZyBhbGwgZnV0dXJlXG4gICAqIGludGVyYWN0aW9ucyB3aXRoIGl0IGZhaWwgd2l0aCB0aGUgZ2l2ZW4gZXJyb3IgYGVgLiBBbnkgY2h1bmtzIHF1ZXVlZCBmb3IgdHJhbnNmb3JtYXRpb24gd2lsbCBiZSBkaXNjYXJkZWQuXG4gICAqL1xuICBlcnJvcihyZWFzb246IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdlcnJvcicpO1xuICAgIH1cblxuICAgIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IodGhpcywgcmVhc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHJlYWRhYmxlIHNpZGUgYW5kIGVycm9ycyB0aGUgd3JpdGFibGUgc2lkZSBvZiB0aGUgY29udHJvbGxlZCB0cmFuc2Zvcm0gc3RyZWFtLiBUaGlzIGlzIHVzZWZ1bCB3aGVuIHRoZVxuICAgKiB0cmFuc2Zvcm1lciBvbmx5IG5lZWRzIHRvIGNvbnN1bWUgYSBwb3J0aW9uIG9mIHRoZSBjaHVua3Mgd3JpdHRlbiB0byB0aGUgd3JpdGFibGUgc2lkZS5cbiAgICovXG4gIHRlcm1pbmF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoIUlzVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbigndGVybWluYXRlJyk7XG4gICAgfVxuXG4gICAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJUZXJtaW5hdGUodGhpcyk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gIGVucXVldWU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBlcnJvcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHRlcm1pbmF0ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGRlc2lyZWRTaXplOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcicsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vLyBUcmFuc2Zvcm0gU3RyZWFtIERlZmF1bHQgQ29udHJvbGxlciBBYnN0cmFjdCBPcGVyYXRpb25zXG5cbmZ1bmN0aW9uIElzVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8TyA9IGFueT4oeDogYW55KTogeCBpcyBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPiB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyO1xufVxuXG5mdW5jdGlvbiBTZXRVcFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPEksIE8+KHN0cmVhbTogVHJhbnNmb3JtU3RyZWFtPEksIE8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtQWxnb3JpdGhtOiAoY2h1bms6IEkpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsdXNoQWxnb3JpdGhtOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gIGFzc2VydChJc1RyYW5zZm9ybVN0cmVhbShzdHJlYW0pKTtcbiAgYXNzZXJ0KHN0cmVhbS5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlciA9PT0gdW5kZWZpbmVkKTtcblxuICBjb250cm9sbGVyLl9jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtID0gc3RyZWFtO1xuICBzdHJlYW0uX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuXG4gIGNvbnRyb2xsZXIuX3RyYW5zZm9ybUFsZ29yaXRobSA9IHRyYW5zZm9ybUFsZ29yaXRobTtcbiAgY29udHJvbGxlci5fZmx1c2hBbGdvcml0aG0gPSBmbHVzaEFsZ29yaXRobTtcbn1cblxuZnVuY3Rpb24gU2V0VXBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21UcmFuc2Zvcm1lcjxJLCBPPihzdHJlYW06IFRyYW5zZm9ybVN0cmVhbTxJLCBPPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtZXI6IFZhbGlkYXRlZFRyYW5zZm9ybWVyPEksIE8+KSB7XG4gIGNvbnN0IGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+ID0gT2JqZWN0LmNyZWF0ZShUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUpO1xuXG4gIGxldCB0cmFuc2Zvcm1BbGdvcml0aG0gPSAoY2h1bms6IEkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKGNvbnRyb2xsZXIsIGNodW5rIGFzIHVua25vd24gYXMgTyk7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH0gY2F0Y2ggKHRyYW5zZm9ybVJlc3VsdEUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHRyYW5zZm9ybVJlc3VsdEUpO1xuICAgIH1cbiAgfTtcblxuICBsZXQgZmx1c2hBbGdvcml0aG06ICgpID0+IFByb21pc2U8dm9pZD4gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG5cbiAgaWYgKHRyYW5zZm9ybWVyLnRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdHJhbnNmb3JtQWxnb3JpdGhtID0gY2h1bmsgPT4gdHJhbnNmb3JtZXIudHJhbnNmb3JtIShjaHVuaywgY29udHJvbGxlcik7XG4gIH1cbiAgaWYgKHRyYW5zZm9ybWVyLmZsdXNoICE9PSB1bmRlZmluZWQpIHtcbiAgICBmbHVzaEFsZ29yaXRobSA9ICgpID0+IHRyYW5zZm9ybWVyLmZsdXNoIShjb250cm9sbGVyKTtcbiAgfVxuXG4gIFNldFVwVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoc3RyZWFtLCBjb250cm9sbGVyLCB0cmFuc2Zvcm1BbGdvcml0aG0sIGZsdXNoQWxnb3JpdGhtKTtcbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55Pikge1xuICBjb250cm9sbGVyLl90cmFuc2Zvcm1BbGdvcml0aG0gPSB1bmRlZmluZWQhO1xuICBjb250cm9sbGVyLl9mbHVzaEFsZ29yaXRobSA9IHVuZGVmaW5lZCE7XG59XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZTxPPihjb250cm9sbGVyOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPiwgY2h1bms6IE8pIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFRyYW5zZm9ybVN0cmVhbTtcbiAgY29uc3QgcmVhZGFibGVDb250cm9sbGVyID0gc3RyZWFtLl9yZWFkYWJsZS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz47XG4gIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKHJlYWRhYmxlQ29udHJvbGxlcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWFkYWJsZSBzaWRlIGlzIG5vdCBpbiBhIHN0YXRlIHRoYXQgcGVybWl0cyBlbnF1ZXVlJyk7XG4gIH1cblxuICAvLyBXZSB0aHJvdHRsZSB0cmFuc2Zvcm0gaW52b2NhdGlvbnMgYmFzZWQgb24gdGhlIGJhY2twcmVzc3VyZSBvZiB0aGUgUmVhZGFibGVTdHJlYW0sIGJ1dCB3ZSBzdGlsbFxuICAvLyBhY2NlcHQgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKCkgY2FsbHMuXG5cbiAgdHJ5IHtcbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZShyZWFkYWJsZUNvbnRyb2xsZXIsIGNodW5rKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHJlYWRhYmxlU3RyYXRlZ3kuc2l6ZSgpIHRocm93cy5cbiAgICBUcmFuc2Zvcm1TdHJlYW1FcnJvcldyaXRhYmxlQW5kVW5ibG9ja1dyaXRlKHN0cmVhbSwgZSk7XG5cbiAgICB0aHJvdyBzdHJlYW0uX3JlYWRhYmxlLl9zdG9yZWRFcnJvcjtcbiAgfVxuXG4gIGNvbnN0IGJhY2twcmVzc3VyZSA9IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJIYXNCYWNrcHJlc3N1cmUocmVhZGFibGVDb250cm9sbGVyKTtcbiAgaWYgKGJhY2twcmVzc3VyZSAhPT0gc3RyZWFtLl9iYWNrcHJlc3N1cmUpIHtcbiAgICBhc3NlcnQoYmFja3ByZXNzdXJlKTtcbiAgICBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoc3RyZWFtLCB0cnVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT4sIGU6IGFueSkge1xuICBUcmFuc2Zvcm1TdHJlYW1FcnJvcihjb250cm9sbGVyLl9jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtLCBlKTtcbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQZXJmb3JtVHJhbnNmb3JtPEksIE8+KGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rOiBJKSB7XG4gIGNvbnN0IHRyYW5zZm9ybVByb21pc2UgPSBjb250cm9sbGVyLl90cmFuc2Zvcm1BbGdvcml0aG0oY2h1bmspO1xuICByZXR1cm4gdHJhbnNmb3JtUHJvbWlzZVdpdGgodHJhbnNmb3JtUHJvbWlzZSwgdW5kZWZpbmVkLCByID0+IHtcbiAgICBUcmFuc2Zvcm1TdHJlYW1FcnJvcihjb250cm9sbGVyLl9jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtLCByKTtcbiAgICB0aHJvdyByO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJUZXJtaW5hdGU8Tz4oY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4pIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFRyYW5zZm9ybVN0cmVhbTtcbiAgY29uc3QgcmVhZGFibGVDb250cm9sbGVyID0gc3RyZWFtLl9yZWFkYWJsZS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz47XG5cbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKHJlYWRhYmxlQ29udHJvbGxlcik7XG5cbiAgY29uc3QgZXJyb3IgPSBuZXcgVHlwZUVycm9yKCdUcmFuc2Zvcm1TdHJlYW0gdGVybWluYXRlZCcpO1xuICBUcmFuc2Zvcm1TdHJlYW1FcnJvcldyaXRhYmxlQW5kVW5ibG9ja1dyaXRlKHN0cmVhbSwgZXJyb3IpO1xufVxuXG4vLyBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U2luayBBbGdvcml0aG1zXG5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rV3JpdGVBbGdvcml0aG08SSwgTz4oc3RyZWFtOiBUcmFuc2Zvcm1TdHJlYW08SSwgTz4sIGNodW5rOiBJKTogUHJvbWlzZTx2b2lkPiB7XG4gIGFzc2VydChzdHJlYW0uX3dyaXRhYmxlLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyk7XG5cbiAgY29uc3QgY29udHJvbGxlciA9IHN0cmVhbS5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlcjtcblxuICBpZiAoc3RyZWFtLl9iYWNrcHJlc3N1cmUpIHtcbiAgICBjb25zdCBiYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlID0gc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlO1xuICAgIGFzc2VydChiYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlICE9PSB1bmRlZmluZWQpO1xuICAgIHJldHVybiB0cmFuc2Zvcm1Qcm9taXNlV2l0aChiYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cml0YWJsZSA9IHN0cmVhbS5fd3JpdGFibGU7XG4gICAgICBjb25zdCBzdGF0ZSA9IHdyaXRhYmxlLl9zdGF0ZTtcbiAgICAgIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgICAgICB0aHJvdyB3cml0YWJsZS5fc3RvcmVkRXJyb3I7XG4gICAgICB9XG4gICAgICBhc3NlcnQoc3RhdGUgPT09ICd3cml0YWJsZScpO1xuICAgICAgcmV0dXJuIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyUGVyZm9ybVRyYW5zZm9ybTxJLCBPPihjb250cm9sbGVyLCBjaHVuayk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQZXJmb3JtVHJhbnNmb3JtPEksIE8+KGNvbnRyb2xsZXIsIGNodW5rKTtcbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtBYm9ydEFsZ29yaXRobShzdHJlYW06IFRyYW5zZm9ybVN0cmVhbSwgcmVhc29uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gYWJvcnQoKSBpcyBub3QgY2FsbGVkIHN5bmNocm9ub3VzbHksIHNvIGl0IGlzIHBvc3NpYmxlIGZvciBhYm9ydCgpIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBzdHJlYW0gaXMgYWxyZWFkeVxuICAvLyBlcnJvcmVkLlxuICBUcmFuc2Zvcm1TdHJlYW1FcnJvcihzdHJlYW0sIHJlYXNvbik7XG4gIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG59XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rQ2xvc2VBbGdvcml0aG08SSwgTz4oc3RyZWFtOiBUcmFuc2Zvcm1TdHJlYW08SSwgTz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gc3RyZWFtLl9yZWFkYWJsZSBjYW5ub3QgY2hhbmdlIGFmdGVyIGNvbnN0cnVjdGlvbiwgc28gY2FjaGluZyBpdCBhY3Jvc3MgYSBjYWxsIHRvIHVzZXIgY29kZSBpcyBzYWZlLlxuICBjb25zdCByZWFkYWJsZSA9IHN0cmVhbS5fcmVhZGFibGU7XG5cbiAgY29uc3QgY29udHJvbGxlciA9IHN0cmVhbS5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlcjtcbiAgY29uc3QgZmx1c2hQcm9taXNlID0gY29udHJvbGxlci5fZmx1c2hBbGdvcml0aG0oKTtcbiAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG5cbiAgLy8gUmV0dXJuIGEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIHVuZGVmaW5lZCBvbiBzdWNjZXNzLlxuICByZXR1cm4gdHJhbnNmb3JtUHJvbWlzZVdpdGgoZmx1c2hQcm9taXNlLCAoKSA9PiB7XG4gICAgaWYgKHJlYWRhYmxlLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICB0aHJvdyByZWFkYWJsZS5fc3RvcmVkRXJyb3I7XG4gICAgfVxuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZShyZWFkYWJsZS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4pO1xuICB9LCByID0+IHtcbiAgICBUcmFuc2Zvcm1TdHJlYW1FcnJvcihzdHJlYW0sIHIpO1xuICAgIHRocm93IHJlYWRhYmxlLl9zdG9yZWRFcnJvcjtcbiAgfSk7XG59XG5cbi8vIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTb3VyY2UgQWxnb3JpdGhtc1xuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U291cmNlUHVsbEFsZ29yaXRobShzdHJlYW06IFRyYW5zZm9ybVN0cmVhbSk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBJbnZhcmlhbnQuIEVuZm9yY2VkIGJ5IHRoZSBwcm9taXNlcyByZXR1cm5lZCBieSBzdGFydCgpIGFuZCBwdWxsKCkuXG4gIGFzc2VydChzdHJlYW0uX2JhY2twcmVzc3VyZSk7XG5cbiAgYXNzZXJ0KHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZSAhPT0gdW5kZWZpbmVkKTtcblxuICBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoc3RyZWFtLCBmYWxzZSk7XG5cbiAgLy8gUHJldmVudCB0aGUgbmV4dCBwdWxsKCkgY2FsbCB1bnRpbCB0aGVyZSBpcyBiYWNrcHJlc3N1cmUuXG4gIHJldHVybiBzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2U7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlci5cblxuZnVuY3Rpb24gZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFxuICAgIGBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJgKTtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFRyYW5zZm9ybVN0cmVhbS5cblxuZnVuY3Rpb24gc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcbiAgICBgVHJhbnNmb3JtU3RyZWFtLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBUcmFuc2Zvcm1TdHJlYW1gKTtcbn1cbiIsICIvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbi8vIDY0IEtpQiAoc2FtZSBzaXplIGNocm9tZSBzbGljZSB0aGVpcnMgYmxvYiBpbnRvIFVpbnQ4YXJyYXkncylcbmNvbnN0IFBPT0xfU0laRSA9IDY1NTM2XG5cbmlmICghZ2xvYmFsVGhpcy5SZWFkYWJsZVN0cmVhbSkge1xuICAvLyBgbm9kZTpzdHJlYW0vd2ViYCBnb3QgaW50cm9kdWNlZCBpbiB2MTYuNS4wIGFzIGV4cGVyaW1lbnRhbFxuICAvLyBhbmQgaXQncyBwcmVmZXJyZWQgb3ZlciB0aGUgcG9seWZpbGxlZCB2ZXJzaW9uLiBTbyB3ZSBhbHNvXG4gIC8vIHN1cHByZXNzIHRoZSB3YXJuaW5nIHRoYXQgZ2V0cyBlbWl0dGVkIGJ5IE5vZGVKUyBmb3IgdXNpbmcgaXQuXG4gIHRyeSB7XG4gICAgY29uc3QgcHJvY2VzcyA9IHJlcXVpcmUoJ25vZGU6cHJvY2VzcycpXG4gICAgY29uc3QgeyBlbWl0V2FybmluZyB9ID0gcHJvY2Vzc1xuICAgIHRyeSB7XG4gICAgICBwcm9jZXNzLmVtaXRXYXJuaW5nID0gKCkgPT4ge31cbiAgICAgIE9iamVjdC5hc3NpZ24oZ2xvYmFsVGhpcywgcmVxdWlyZSgnbm9kZTpzdHJlYW0vd2ViJykpXG4gICAgICBwcm9jZXNzLmVtaXRXYXJuaW5nID0gZW1pdFdhcm5pbmdcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcHJvY2Vzcy5lbWl0V2FybmluZyA9IGVtaXRXYXJuaW5nXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBmYWxsYmFjayB0byBwb2x5ZmlsbCBpbXBsZW1lbnRhdGlvblxuICAgIE9iamVjdC5hc3NpZ24oZ2xvYmFsVGhpcywgcmVxdWlyZSgnd2ViLXN0cmVhbXMtcG9seWZpbGwvZGlzdC9wb255ZmlsbC5lczIwMTguanMnKSlcbiAgfVxufVxuXG50cnkge1xuICAvLyBEb24ndCB1c2Ugbm9kZTogcHJlZml4IGZvciB0aGlzLCByZXF1aXJlK25vZGU6IGlzIG5vdCBzdXBwb3J0ZWQgdW50aWwgbm9kZSB2MTQuMTRcbiAgLy8gT25seSBgaW1wb3J0KClgIGNhbiB1c2UgcHJlZml4IGluIDEyLjIwIGFuZCBsYXRlclxuICBjb25zdCB7IEJsb2IgfSA9IHJlcXVpcmUoJ2J1ZmZlcicpXG4gIGlmIChCbG9iICYmICFCbG9iLnByb3RvdHlwZS5zdHJlYW0pIHtcbiAgICBCbG9iLnByb3RvdHlwZS5zdHJlYW0gPSBmdW5jdGlvbiBuYW1lIChwYXJhbXMpIHtcbiAgICAgIGxldCBwb3NpdGlvbiA9IDBcbiAgICAgIGNvbnN0IGJsb2IgPSB0aGlzXG5cbiAgICAgIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgICAgICB0eXBlOiAnYnl0ZXMnLFxuICAgICAgICBhc3luYyBwdWxsIChjdHJsKSB7XG4gICAgICAgICAgY29uc3QgY2h1bmsgPSBibG9iLnNsaWNlKHBvc2l0aW9uLCBNYXRoLm1pbihibG9iLnNpemUsIHBvc2l0aW9uICsgUE9PTF9TSVpFKSlcbiAgICAgICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBjaHVuay5hcnJheUJ1ZmZlcigpXG4gICAgICAgICAgcG9zaXRpb24gKz0gYnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICAgICBjdHJsLmVucXVldWUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcblxuICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gYmxvYi5zaXplKSB7XG4gICAgICAgICAgICBjdHJsLmNsb3NlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59IGNhdGNoIChlcnJvcikge31cbi8qIGM4IGlnbm9yZSBlbmQgKi9cbiIsICIvKiEgZmV0Y2gtYmxvYi4gTUlUIExpY2Vuc2UuIEppbW15IFdcdTAwRTRydGluZyA8aHR0cHM6Ly9qaW1teS53YXJ0aW5nLnNlL29wZW5zb3VyY2U+ICovXG5cbi8vIFRPRE8gKGppbW15d2FydGluZyk6IGluIHRoZSBmZWF0dXJlIHVzZSBjb25kaXRpb25hbCBsb2FkaW5nIHdpdGggdG9wIGxldmVsIGF3YWl0IChyZXF1aXJlcyAxNC54KVxuLy8gTm9kZSBoYXMgcmVjZW50bHkgYWRkZWQgd2hhdHdnIHN0cmVhbSBpbnRvIGNvcmVcblxuaW1wb3J0ICcuL3N0cmVhbXMuY2pzJ1xuXG4vLyA2NCBLaUIgKHNhbWUgc2l6ZSBjaHJvbWUgc2xpY2UgdGhlaXJzIGJsb2IgaW50byBVaW50OGFycmF5J3MpXG5jb25zdCBQT09MX1NJWkUgPSA2NTUzNlxuXG4vKiogQHBhcmFtIHsoQmxvYiB8IFVpbnQ4QXJyYXkpW119IHBhcnRzICovXG5hc3luYyBmdW5jdGlvbiAqIHRvSXRlcmF0b3IgKHBhcnRzLCBjbG9uZSA9IHRydWUpIHtcbiAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgaWYgKCdzdHJlYW0nIGluIHBhcnQpIHtcbiAgICAgIHlpZWxkICogKC8qKiBAdHlwZSB7QXN5bmNJdGVyYWJsZUl0ZXJhdG9yPFVpbnQ4QXJyYXk+fSAqLyAocGFydC5zdHJlYW0oKSkpXG4gICAgfSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcocGFydCkpIHtcbiAgICAgIGlmIChjbG9uZSkge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBwYXJ0LmJ5dGVPZmZzZXRcbiAgICAgICAgY29uc3QgZW5kID0gcGFydC5ieXRlT2Zmc2V0ICsgcGFydC5ieXRlTGVuZ3RoXG4gICAgICAgIHdoaWxlIChwb3NpdGlvbiAhPT0gZW5kKSB7XG4gICAgICAgICAgY29uc3Qgc2l6ZSA9IE1hdGgubWluKGVuZCAtIHBvc2l0aW9uLCBQT09MX1NJWkUpXG4gICAgICAgICAgY29uc3QgY2h1bmsgPSBwYXJ0LmJ1ZmZlci5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyBzaXplKVxuICAgICAgICAgIHBvc2l0aW9uICs9IGNodW5rLmJ5dGVMZW5ndGhcbiAgICAgICAgICB5aWVsZCBuZXcgVWludDhBcnJheShjaHVuaylcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeWllbGQgcGFydFxuICAgICAgfVxuICAgIC8qIGM4IGlnbm9yZSBuZXh0IDEwICovXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZvciBibG9icyB0aGF0IGhhdmUgYXJyYXlCdWZmZXIgYnV0IG5vIHN0cmVhbSBtZXRob2QgKG5vZGVzIGJ1ZmZlci5CbG9iKVxuICAgICAgbGV0IHBvc2l0aW9uID0gMCwgYiA9ICgvKiogQHR5cGUge0Jsb2J9ICovIChwYXJ0KSlcbiAgICAgIHdoaWxlIChwb3NpdGlvbiAhPT0gYi5zaXplKSB7XG4gICAgICAgIGNvbnN0IGNodW5rID0gYi5zbGljZShwb3NpdGlvbiwgTWF0aC5taW4oYi5zaXplLCBwb3NpdGlvbiArIFBPT0xfU0laRSkpXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGNodW5rLmFycmF5QnVmZmVyKClcbiAgICAgICAgcG9zaXRpb24gKz0gYnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICAgeWllbGQgbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBfQmxvYiA9IGNsYXNzIEJsb2Ige1xuICAvKiogQHR5cGUge0FycmF5LjwoQmxvYnxVaW50OEFycmF5KT59ICovXG4gICNwYXJ0cyA9IFtdXG4gICN0eXBlID0gJydcbiAgI3NpemUgPSAwXG4gICNlbmRpbmdzID0gJ3RyYW5zcGFyZW50J1xuXG4gIC8qKlxuICAgKiBUaGUgQmxvYigpIGNvbnN0cnVjdG9yIHJldHVybnMgYSBuZXcgQmxvYiBvYmplY3QuIFRoZSBjb250ZW50XG4gICAqIG9mIHRoZSBibG9iIGNvbnNpc3RzIG9mIHRoZSBjb25jYXRlbmF0aW9uIG9mIHRoZSB2YWx1ZXMgZ2l2ZW5cbiAgICogaW4gdGhlIHBhcmFtZXRlciBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBibG9iUGFydHNcbiAgICogQHBhcmFtIHt7IHR5cGU/OiBzdHJpbmcsIGVuZGluZ3M/OiBzdHJpbmcgfX0gW29wdGlvbnNdXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoYmxvYlBhcnRzID0gW10sIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgYmxvYlBhcnRzICE9PSAnb2JqZWN0JyB8fCBibG9iUGFydHMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgXFwnQmxvYlxcJzogVGhlIHByb3ZpZGVkIHZhbHVlIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gYSBzZXF1ZW5jZS4nKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYmxvYlBhcnRzW1N5bWJvbC5pdGVyYXRvcl0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgXFwnQmxvYlxcJzogVGhlIG9iamVjdCBtdXN0IGhhdmUgYSBjYWxsYWJsZSBAQGl0ZXJhdG9yIHByb3BlcnR5LicpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0aW9ucyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdCbG9iXFwnOiBwYXJhbWV0ZXIgMiBjYW5ub3QgY29udmVydCB0byBkaWN0aW9uYXJ5LicpXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwpIG9wdGlvbnMgPSB7fVxuXG4gICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGJsb2JQYXJ0cykge1xuICAgICAgbGV0IHBhcnRcbiAgICAgIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZWxlbWVudCkpIHtcbiAgICAgICAgcGFydCA9IG5ldyBVaW50OEFycmF5KGVsZW1lbnQuYnVmZmVyLnNsaWNlKGVsZW1lbnQuYnl0ZU9mZnNldCwgZWxlbWVudC5ieXRlT2Zmc2V0ICsgZWxlbWVudC5ieXRlTGVuZ3RoKSlcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHBhcnQgPSBuZXcgVWludDhBcnJheShlbGVtZW50LnNsaWNlKDApKVxuICAgICAgfSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBwYXJ0ID0gZWxlbWVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydCA9IGVuY29kZXIuZW5jb2RlKGAke2VsZW1lbnR9YClcbiAgICAgIH1cblxuICAgICAgdGhpcy4jc2l6ZSArPSBBcnJheUJ1ZmZlci5pc1ZpZXcocGFydCkgPyBwYXJ0LmJ5dGVMZW5ndGggOiBwYXJ0LnNpemVcbiAgICAgIHRoaXMuI3BhcnRzLnB1c2gocGFydClcbiAgICB9XG5cbiAgICB0aGlzLiNlbmRpbmdzID0gYCR7b3B0aW9ucy5lbmRpbmdzID09PSB1bmRlZmluZWQgPyAndHJhbnNwYXJlbnQnIDogb3B0aW9ucy5lbmRpbmdzfWBcbiAgICBjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyhvcHRpb25zLnR5cGUpXG4gICAgdGhpcy4jdHlwZSA9IC9eW1xceDIwLVxceDdFXSokLy50ZXN0KHR5cGUpID8gdHlwZSA6ICcnXG4gIH1cblxuICAvKipcbiAgICogVGhlIEJsb2IgaW50ZXJmYWNlJ3Mgc2l6ZSBwcm9wZXJ0eSByZXR1cm5zIHRoZVxuICAgKiBzaXplIG9mIHRoZSBCbG9iIGluIGJ5dGVzLlxuICAgKi9cbiAgZ2V0IHNpemUgKCkge1xuICAgIHJldHVybiB0aGlzLiNzaXplXG4gIH1cblxuICAvKipcbiAgICogVGhlIHR5cGUgcHJvcGVydHkgb2YgYSBCbG9iIG9iamVjdCByZXR1cm5zIHRoZSBNSU1FIHR5cGUgb2YgdGhlIGZpbGUuXG4gICAqL1xuICBnZXQgdHlwZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3R5cGVcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdGV4dCgpIG1ldGhvZCBpbiB0aGUgQmxvYiBpbnRlcmZhY2UgcmV0dXJucyBhIFByb21pc2VcbiAgICogdGhhdCByZXNvbHZlcyB3aXRoIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnRzIG9mXG4gICAqIHRoZSBibG9iLCBpbnRlcnByZXRlZCBhcyBVVEYtOC5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fVxuICAgKi9cbiAgYXN5bmMgdGV4dCAoKSB7XG4gICAgLy8gTW9yZSBvcHRpbWl6ZWQgdGhhbiB1c2luZyB0aGlzLmFycmF5QnVmZmVyKClcbiAgICAvLyB0aGF0IHJlcXVpcmVzIHR3aWNlIGFzIG11Y2ggcmFtXG4gICAgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgZm9yIGF3YWl0IChjb25zdCBwYXJ0IG9mIHRvSXRlcmF0b3IodGhpcy4jcGFydHMsIGZhbHNlKSkge1xuICAgICAgc3RyICs9IGRlY29kZXIuZGVjb2RlKHBhcnQsIHsgc3RyZWFtOiB0cnVlIH0pXG4gICAgfVxuICAgIC8vIFJlbWFpbmluZ1xuICAgIHN0ciArPSBkZWNvZGVyLmRlY29kZSgpXG4gICAgcmV0dXJuIHN0clxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhcnJheUJ1ZmZlcigpIG1ldGhvZCBpbiB0aGUgQmxvYiBpbnRlcmZhY2UgcmV0dXJucyBhXG4gICAqIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjb250ZW50cyBvZiB0aGUgYmxvYiBhc1xuICAgKiBiaW5hcnkgZGF0YSBjb250YWluZWQgaW4gYW4gQXJyYXlCdWZmZXIuXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXlCdWZmZXI+fVxuICAgKi9cbiAgYXN5bmMgYXJyYXlCdWZmZXIgKCkge1xuICAgIC8vIEVhc2llciB3YXkuLi4gSnVzdCBhIHVubmVjZXNzYXJ5IG92ZXJoZWFkXG4gICAgLy8gY29uc3QgdmlldyA9IG5ldyBVaW50OEFycmF5KHRoaXMuc2l6ZSk7XG4gICAgLy8gYXdhaXQgdGhpcy5zdHJlYW0oKS5nZXRSZWFkZXIoe21vZGU6ICdieW9iJ30pLnJlYWQodmlldyk7XG4gICAgLy8gcmV0dXJuIHZpZXcuYnVmZmVyO1xuXG4gICAgY29uc3QgZGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuc2l6ZSlcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgdG9JdGVyYXRvcih0aGlzLiNwYXJ0cywgZmFsc2UpKSB7XG4gICAgICBkYXRhLnNldChjaHVuaywgb2Zmc2V0KVxuICAgICAgb2Zmc2V0ICs9IGNodW5rLmxlbmd0aFxuICAgIH1cblxuICAgIHJldHVybiBkYXRhLmJ1ZmZlclxuICB9XG5cbiAgc3RyZWFtICgpIHtcbiAgICBjb25zdCBpdCA9IHRvSXRlcmF0b3IodGhpcy4jcGFydHMsIHRydWUpXG5cbiAgICByZXR1cm4gbmV3IGdsb2JhbFRoaXMuUmVhZGFibGVTdHJlYW0oe1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdHlwZTogJ2J5dGVzJyxcbiAgICAgIGFzeW5jIHB1bGwgKGN0cmwpIHtcbiAgICAgICAgY29uc3QgY2h1bmsgPSBhd2FpdCBpdC5uZXh0KClcbiAgICAgICAgY2h1bmsuZG9uZSA/IGN0cmwuY2xvc2UoKSA6IGN0cmwuZW5xdWV1ZShjaHVuay52YWx1ZSlcbiAgICAgIH0sXG5cbiAgICAgIGFzeW5jIGNhbmNlbCAoKSB7XG4gICAgICAgIGF3YWl0IGl0LnJldHVybigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgQmxvYiBpbnRlcmZhY2UncyBzbGljZSgpIG1ldGhvZCBjcmVhdGVzIGFuZCByZXR1cm5zIGFcbiAgICogbmV3IEJsb2Igb2JqZWN0IHdoaWNoIGNvbnRhaW5zIGRhdGEgZnJvbSBhIHN1YnNldCBvZiB0aGVcbiAgICogYmxvYiBvbiB3aGljaCBpdCdzIGNhbGxlZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydF1cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtlbmRdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV1cbiAgICovXG4gIHNsaWNlIChzdGFydCA9IDAsIGVuZCA9IHRoaXMuc2l6ZSwgdHlwZSA9ICcnKSB7XG4gICAgY29uc3QgeyBzaXplIH0gPSB0aGlzXG5cbiAgICBsZXQgcmVsYXRpdmVTdGFydCA9IHN0YXJ0IDwgMCA/IE1hdGgubWF4KHNpemUgKyBzdGFydCwgMCkgOiBNYXRoLm1pbihzdGFydCwgc2l6ZSlcbiAgICBsZXQgcmVsYXRpdmVFbmQgPSBlbmQgPCAwID8gTWF0aC5tYXgoc2l6ZSArIGVuZCwgMCkgOiBNYXRoLm1pbihlbmQsIHNpemUpXG5cbiAgICBjb25zdCBzcGFuID0gTWF0aC5tYXgocmVsYXRpdmVFbmQgLSByZWxhdGl2ZVN0YXJ0LCAwKVxuICAgIGNvbnN0IHBhcnRzID0gdGhpcy4jcGFydHNcbiAgICBjb25zdCBibG9iUGFydHMgPSBbXVxuICAgIGxldCBhZGRlZCA9IDBcblxuICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuICAgICAgLy8gZG9uJ3QgYWRkIHRoZSBvdmVyZmxvdyB0byBuZXcgYmxvYlBhcnRzXG4gICAgICBpZiAoYWRkZWQgPj0gc3Bhbikge1xuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzaXplID0gQXJyYXlCdWZmZXIuaXNWaWV3KHBhcnQpID8gcGFydC5ieXRlTGVuZ3RoIDogcGFydC5zaXplXG4gICAgICBpZiAocmVsYXRpdmVTdGFydCAmJiBzaXplIDw9IHJlbGF0aXZlU3RhcnQpIHtcbiAgICAgICAgLy8gU2tpcCB0aGUgYmVnaW5uaW5nIGFuZCBjaGFuZ2UgdGhlIHJlbGF0aXZlXG4gICAgICAgIC8vIHN0YXJ0ICYgZW5kIHBvc2l0aW9uIGFzIHdlIHNraXAgdGhlIHVud2FudGVkIHBhcnRzXG4gICAgICAgIHJlbGF0aXZlU3RhcnQgLT0gc2l6ZVxuICAgICAgICByZWxhdGl2ZUVuZCAtPSBzaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgY2h1bmtcbiAgICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhwYXJ0KSkge1xuICAgICAgICAgIGNodW5rID0gcGFydC5zdWJhcnJheShyZWxhdGl2ZVN0YXJ0LCBNYXRoLm1pbihzaXplLCByZWxhdGl2ZUVuZCkpXG4gICAgICAgICAgYWRkZWQgKz0gY2h1bmsuYnl0ZUxlbmd0aFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNodW5rID0gcGFydC5zbGljZShyZWxhdGl2ZVN0YXJ0LCBNYXRoLm1pbihzaXplLCByZWxhdGl2ZUVuZCkpXG4gICAgICAgICAgYWRkZWQgKz0gY2h1bmsuc2l6ZVxuICAgICAgICB9XG4gICAgICAgIHJlbGF0aXZlRW5kIC09IHNpemVcbiAgICAgICAgYmxvYlBhcnRzLnB1c2goY2h1bmspXG4gICAgICAgIHJlbGF0aXZlU3RhcnQgPSAwIC8vIEFsbCBuZXh0IHNlcXVlbnRpYWwgcGFydHMgc2hvdWxkIHN0YXJ0IGF0IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW10sIHsgdHlwZTogU3RyaW5nKHR5cGUpLnRvTG93ZXJDYXNlKCkgfSlcbiAgICBibG9iLiNzaXplID0gc3BhblxuICAgIGJsb2IuI3BhcnRzID0gYmxvYlBhcnRzXG5cbiAgICByZXR1cm4gYmxvYlxuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddICgpIHtcbiAgICByZXR1cm4gJ0Jsb2InXG4gIH1cblxuICBzdGF0aWMgW1N5bWJvbC5oYXNJbnN0YW5jZV0gKG9iamVjdCkge1xuICAgIHJldHVybiAoXG4gICAgICBvYmplY3QgJiZcbiAgICAgIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoXG4gICAgICAgIHR5cGVvZiBvYmplY3Quc3RyZWFtID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgIHR5cGVvZiBvYmplY3QuYXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICkgJiZcbiAgICAgIC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9iamVjdFtTeW1ib2wudG9TdHJpbmdUYWddKVxuICAgIClcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhfQmxvYi5wcm90b3R5cGUsIHtcbiAgc2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHR5cGU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBzbGljZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pXG5cbi8qKiBAdHlwZSB7dHlwZW9mIGdsb2JhbFRoaXMuQmxvYn0gKi9cbmV4cG9ydCBjb25zdCBCbG9iID0gX0Jsb2JcbmV4cG9ydCBkZWZhdWx0IEJsb2JcbiIsICJpbXBvcnQgQmxvYiBmcm9tICcuL2luZGV4LmpzJ1xuXG5jb25zdCBfRmlsZSA9IGNsYXNzIEZpbGUgZXh0ZW5kcyBCbG9iIHtcbiAgI2xhc3RNb2RpZmllZCA9IDBcbiAgI25hbWUgPSAnJ1xuXG4gIC8qKlxuICAgKiBAcGFyYW0geypbXX0gZmlsZUJpdHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lXG4gICAqIEBwYXJhbSB7e2xhc3RNb2RpZmllZD86IG51bWJlciwgdHlwZT86IHN0cmluZ319IG9wdGlvbnNcbiAgICovLy8gQHRzLWlnbm9yZVxuICBjb25zdHJ1Y3RvciAoZmlsZUJpdHMsIGZpbGVOYW1lLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEZhaWxlZCB0byBjb25zdHJ1Y3QgJ0ZpbGUnOiAyIGFyZ3VtZW50cyByZXF1aXJlZCwgYnV0IG9ubHkgJHthcmd1bWVudHMubGVuZ3RofSBwcmVzZW50LmApXG4gICAgfVxuICAgIHN1cGVyKGZpbGVCaXRzLCBvcHRpb25zKVxuXG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwpIG9wdGlvbnMgPSB7fVxuXG4gICAgLy8gU2ltdWxhdGUgV2ViSURMIHR5cGUgY2FzdGluZyBmb3IgTmFOIHZhbHVlIGluIGxhc3RNb2RpZmllZCBvcHRpb24uXG4gICAgY29uc3QgbGFzdE1vZGlmaWVkID0gb3B0aW9ucy5sYXN0TW9kaWZpZWQgPT09IHVuZGVmaW5lZCA/IERhdGUubm93KCkgOiBOdW1iZXIob3B0aW9ucy5sYXN0TW9kaWZpZWQpXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4obGFzdE1vZGlmaWVkKSkge1xuICAgICAgdGhpcy4jbGFzdE1vZGlmaWVkID0gbGFzdE1vZGlmaWVkXG4gICAgfVxuXG4gICAgdGhpcy4jbmFtZSA9IFN0cmluZyhmaWxlTmFtZSlcbiAgfVxuXG4gIGdldCBuYW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy4jbmFtZVxuICB9XG5cbiAgZ2V0IGxhc3RNb2RpZmllZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2xhc3RNb2RpZmllZFxuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddICgpIHtcbiAgICByZXR1cm4gJ0ZpbGUnXG4gIH1cblxuICBzdGF0aWMgW1N5bWJvbC5oYXNJbnN0YW5jZV0gKG9iamVjdCkge1xuICAgIHJldHVybiAhIW9iamVjdCAmJiBvYmplY3QgaW5zdGFuY2VvZiBCbG9iICYmXG4gICAgICAvXihGaWxlKSQvLnRlc3Qob2JqZWN0W1N5bWJvbC50b1N0cmluZ1RhZ10pXG4gIH1cbn1cblxuLyoqIEB0eXBlIHt0eXBlb2YgZ2xvYmFsVGhpcy5GaWxlfSAqLy8vIEB0cy1pZ25vcmVcbmV4cG9ydCBjb25zdCBGaWxlID0gX0ZpbGVcbmV4cG9ydCBkZWZhdWx0IEZpbGVcbiIsICIvKiEgZm9ybWRhdGEtcG9seWZpbGwuIE1JVCBMaWNlbnNlLiBKaW1teSBXXHUwMEU0cnRpbmcgPGh0dHBzOi8vamltbXkud2FydGluZy5zZS9vcGVuc291cmNlPiAqL1xuXG5pbXBvcnQgQyBmcm9tICdmZXRjaC1ibG9iJ1xuaW1wb3J0IEYgZnJvbSAnZmV0Y2gtYmxvYi9maWxlLmpzJ1xuXG52YXIge3RvU3RyaW5nVGFnOnQsaXRlcmF0b3I6aSxoYXNJbnN0YW5jZTpofT1TeW1ib2wsXG5yPU1hdGgucmFuZG9tLFxubT0nYXBwZW5kLHNldCxnZXQsZ2V0QWxsLGRlbGV0ZSxrZXlzLHZhbHVlcyxlbnRyaWVzLGZvckVhY2gsY29uc3RydWN0b3InLnNwbGl0KCcsJyksXG5mPShhLGIsYyk9PihhKz0nJywvXihCbG9ifEZpbGUpJC8udGVzdChiICYmIGJbdF0pP1soYz1jIT09dm9pZCAwP2MrJyc6Ylt0XT09J0ZpbGUnP2IubmFtZTonYmxvYicsYSksYi5uYW1lIT09Y3x8Ylt0XT09J2Jsb2InP25ldyBGKFtiXSxjLGIpOmJdOlthLGIrJyddKSxcbmU9KGMsZik9PihmP2M6Yy5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCdcXHJcXG4nKSkucmVwbGFjZSgvXFxuL2csJyUwQScpLnJlcGxhY2UoL1xcci9nLCclMEQnKS5yZXBsYWNlKC9cIi9nLCclMjInKSxcbng9KG4sIGEsIGUpPT57aWYoYS5sZW5ndGg8ZSl7dGhyb3cgbmV3IFR5cGVFcnJvcihgRmFpbGVkIHRvIGV4ZWN1dGUgJyR7bn0nIG9uICdGb3JtRGF0YSc6ICR7ZX0gYXJndW1lbnRzIHJlcXVpcmVkLCBidXQgb25seSAke2EubGVuZ3RofSBwcmVzZW50LmApfX1cblxuZXhwb3J0IGNvbnN0IEZpbGUgPSBGXG5cbi8qKiBAdHlwZSB7dHlwZW9mIGdsb2JhbFRoaXMuRm9ybURhdGF9ICovXG5leHBvcnQgY29uc3QgRm9ybURhdGEgPSBjbGFzcyBGb3JtRGF0YSB7XG4jZD1bXTtcbmNvbnN0cnVjdG9yKC4uLmEpe2lmKGEubGVuZ3RoKXRocm93IG5ldyBUeXBlRXJyb3IoYEZhaWxlZCB0byBjb25zdHJ1Y3QgJ0Zvcm1EYXRhJzogcGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgJ0hUTUxGb3JtRWxlbWVudCcuYCl9XG5nZXQgW3RdKCkge3JldHVybiAnRm9ybURhdGEnfVxuW2ldKCl7cmV0dXJuIHRoaXMuZW50cmllcygpfVxuc3RhdGljIFtoXShvKSB7cmV0dXJuIG8mJnR5cGVvZiBvPT09J29iamVjdCcmJm9bdF09PT0nRm9ybURhdGEnJiYhbS5zb21lKG09PnR5cGVvZiBvW21dIT0nZnVuY3Rpb24nKX1cbmFwcGVuZCguLi5hKXt4KCdhcHBlbmQnLGFyZ3VtZW50cywyKTt0aGlzLiNkLnB1c2goZiguLi5hKSl9XG5kZWxldGUoYSl7eCgnZGVsZXRlJyxhcmd1bWVudHMsMSk7YSs9Jyc7dGhpcy4jZD10aGlzLiNkLmZpbHRlcigoW2JdKT0+YiE9PWEpfVxuZ2V0KGEpe3goJ2dldCcsYXJndW1lbnRzLDEpO2ErPScnO2Zvcih2YXIgYj10aGlzLiNkLGw9Yi5sZW5ndGgsYz0wO2M8bDtjKyspaWYoYltjXVswXT09PWEpcmV0dXJuIGJbY11bMV07cmV0dXJuIG51bGx9XG5nZXRBbGwoYSxiKXt4KCdnZXRBbGwnLGFyZ3VtZW50cywxKTtiPVtdO2ErPScnO3RoaXMuI2QuZm9yRWFjaChjPT5jWzBdPT09YSYmYi5wdXNoKGNbMV0pKTtyZXR1cm4gYn1cbmhhcyhhKXt4KCdoYXMnLGFyZ3VtZW50cywxKTthKz0nJztyZXR1cm4gdGhpcy4jZC5zb21lKGI9PmJbMF09PT1hKX1cbmZvckVhY2goYSxiKXt4KCdmb3JFYWNoJyxhcmd1bWVudHMsMSk7Zm9yKHZhciBbYyxkXW9mIHRoaXMpYS5jYWxsKGIsZCxjLHRoaXMpfVxuc2V0KC4uLmEpe3goJ3NldCcsYXJndW1lbnRzLDIpO3ZhciBiPVtdLGM9ITA7YT1mKC4uLmEpO3RoaXMuI2QuZm9yRWFjaChkPT57ZFswXT09PWFbMF0/YyYmKGM9IWIucHVzaChhKSk6Yi5wdXNoKGQpfSk7YyYmYi5wdXNoKGEpO3RoaXMuI2Q9Yn1cbiplbnRyaWVzKCl7eWllbGQqdGhpcy4jZH1cbiprZXlzKCl7Zm9yKHZhclthXW9mIHRoaXMpeWllbGQgYX1cbip2YWx1ZXMoKXtmb3IodmFyWyxhXW9mIHRoaXMpeWllbGQgYX19XG5cbi8qKiBAcGFyYW0ge0Zvcm1EYXRhfSBGICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybURhdGFUb0Jsb2IgKEYsQj1DKXtcbnZhciBiPWAke3IoKX0ke3IoKX1gLnJlcGxhY2UoL1xcLi9nLCAnJykuc2xpY2UoLTI4KS5wYWRTdGFydCgzMiwgJy0nKSxjPVtdLHA9YC0tJHtifVxcclxcbkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT1cImBcbkYuZm9yRWFjaCgodixuKT0+dHlwZW9mIHY9PSdzdHJpbmcnXG4/Yy5wdXNoKHArZShuKStgXCJcXHJcXG5cXHJcXG4ke3YucmVwbGFjZSgvXFxyKD8hXFxuKXwoPzwhXFxyKVxcbi9nLCAnXFxyXFxuJyl9XFxyXFxuYClcbjpjLnB1c2gocCtlKG4pK2BcIjsgZmlsZW5hbWU9XCIke2Uodi5uYW1lLCAxKX1cIlxcclxcbkNvbnRlbnQtVHlwZTogJHt2LnR5cGV8fFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCJ9XFxyXFxuXFxyXFxuYCwgdiwgJ1xcclxcbicpKVxuYy5wdXNoKGAtLSR7Yn0tLWApXG5yZXR1cm4gbmV3IEIoYyx7dHlwZTpcIm11bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PVwiK2J9KX1cbiIsICIvKiEgbm9kZS1kb21leGNlcHRpb24uIE1JVCBMaWNlbnNlLiBKaW1teSBXXHUwMEU0cnRpbmcgPGh0dHBzOi8vamltbXkud2FydGluZy5zZS9vcGVuc291cmNlPiAqL1xuXG5pZiAoIWdsb2JhbFRoaXMuRE9NRXhjZXB0aW9uKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBNZXNzYWdlQ2hhbm5lbCB9ID0gcmVxdWlyZSgnd29ya2VyX3RocmVhZHMnKSxcbiAgICBwb3J0ID0gbmV3IE1lc3NhZ2VDaGFubmVsKCkucG9ydDEsXG4gICAgYWIgPSBuZXcgQXJyYXlCdWZmZXIoKVxuICAgIHBvcnQucG9zdE1lc3NhZ2UoYWIsIFthYiwgYWJdKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnIuY29uc3RydWN0b3IubmFtZSA9PT0gJ0RPTUV4Y2VwdGlvbicgJiYgKFxuICAgICAgZ2xvYmFsVGhpcy5ET01FeGNlcHRpb24gPSBlcnIuY29uc3RydWN0b3JcbiAgICApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLkRPTUV4Y2VwdGlvblxuIiwgImltcG9ydCB7IHN0YXRTeW5jLCBjcmVhdGVSZWFkU3RyZWFtLCBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyBiYXNlbmFtZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBET01FeGNlcHRpb24gZnJvbSAnbm9kZS1kb21leGNlcHRpb24nXG5cbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vaW5kZXguanMnXG5cbmNvbnN0IHsgc3RhdCB9ID0gZnNcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBmaWxlcGF0aCBvbiB0aGUgZGlza1xuICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXSBtaW1ldHlwZSB0byB1c2VcbiAqL1xuY29uc3QgYmxvYkZyb21TeW5jID0gKHBhdGgsIHR5cGUpID0+IGZyb21CbG9iKHN0YXRTeW5jKHBhdGgpLCBwYXRoLCB0eXBlKVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIGZpbGVwYXRoIG9uIHRoZSBkaXNrXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIG1pbWV0eXBlIHRvIHVzZVxuICogQHJldHVybnMge1Byb21pc2U8QmxvYj59XG4gKi9cbmNvbnN0IGJsb2JGcm9tID0gKHBhdGgsIHR5cGUpID0+IHN0YXQocGF0aCkudGhlbihzdGF0ID0+IGZyb21CbG9iKHN0YXQsIHBhdGgsIHR5cGUpKVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIGZpbGVwYXRoIG9uIHRoZSBkaXNrXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIG1pbWV0eXBlIHRvIHVzZVxuICogQHJldHVybnMge1Byb21pc2U8RmlsZT59XG4gKi9cbmNvbnN0IGZpbGVGcm9tID0gKHBhdGgsIHR5cGUpID0+IHN0YXQocGF0aCkudGhlbihzdGF0ID0+IGZyb21GaWxlKHN0YXQsIHBhdGgsIHR5cGUpKVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIGZpbGVwYXRoIG9uIHRoZSBkaXNrXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIG1pbWV0eXBlIHRvIHVzZVxuICovXG5jb25zdCBmaWxlRnJvbVN5bmMgPSAocGF0aCwgdHlwZSkgPT4gZnJvbUZpbGUoc3RhdFN5bmMocGF0aCksIHBhdGgsIHR5cGUpXG5cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IGZyb21CbG9iID0gKHN0YXQsIHBhdGgsIHR5cGUgPSAnJykgPT4gbmV3IEJsb2IoW25ldyBCbG9iRGF0YUl0ZW0oe1xuICBwYXRoLFxuICBzaXplOiBzdGF0LnNpemUsXG4gIGxhc3RNb2RpZmllZDogc3RhdC5tdGltZU1zLFxuICBzdGFydDogMFxufSldLCB7IHR5cGUgfSlcblxuLy8gQHRzLWlnbm9yZVxuY29uc3QgZnJvbUZpbGUgPSAoc3RhdCwgcGF0aCwgdHlwZSA9ICcnKSA9PiBuZXcgRmlsZShbbmV3IEJsb2JEYXRhSXRlbSh7XG4gIHBhdGgsXG4gIHNpemU6IHN0YXQuc2l6ZSxcbiAgbGFzdE1vZGlmaWVkOiBzdGF0Lm10aW1lTXMsXG4gIHN0YXJ0OiAwXG59KV0sIGJhc2VuYW1lKHBhdGgpLCB7IHR5cGUsIGxhc3RNb2RpZmllZDogc3RhdC5tdGltZU1zIH0pXG5cbi8qKlxuICogVGhpcyBpcyBhIGJsb2IgYmFja2VkIHVwIGJ5IGEgZmlsZSBvbiB0aGUgZGlza1xuICogd2l0aCBtaW5pdW0gcmVxdWlyZW1lbnQuIEl0cyB3cmFwcGVkIGFyb3VuZCBhIEJsb2IgYXMgYSBibG9iUGFydFxuICogc28geW91IGhhdmUgbm8gZGlyZWN0IGFjY2VzcyB0byB0aGlzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIEJsb2JEYXRhSXRlbSB7XG4gICNwYXRoXG4gICNzdGFydFxuXG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgdGhpcy4jcGF0aCA9IG9wdGlvbnMucGF0aFxuICAgIHRoaXMuI3N0YXJ0ID0gb3B0aW9ucy5zdGFydFxuICAgIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZVxuICAgIHRoaXMubGFzdE1vZGlmaWVkID0gb3B0aW9ucy5sYXN0TW9kaWZpZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBTbGljaW5nIGFyZ3VtZW50cyBpcyBmaXJzdCB2YWxpZGF0ZWQgYW5kIGZvcm1hdHRlZFxuICAgKiB0byBub3QgYmUgb3V0IG9mIHJhbmdlIGJ5IEJsb2IucHJvdG90eXBlLnNsaWNlXG4gICAqL1xuICBzbGljZSAoc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBuZXcgQmxvYkRhdGFJdGVtKHtcbiAgICAgIHBhdGg6IHRoaXMuI3BhdGgsXG4gICAgICBsYXN0TW9kaWZpZWQ6IHRoaXMubGFzdE1vZGlmaWVkLFxuICAgICAgc2l6ZTogZW5kIC0gc3RhcnQsXG4gICAgICBzdGFydDogdGhpcy4jc3RhcnQgKyBzdGFydFxuICAgIH0pXG4gIH1cblxuICBhc3luYyAqIHN0cmVhbSAoKSB7XG4gICAgY29uc3QgeyBtdGltZU1zIH0gPSBhd2FpdCBzdGF0KHRoaXMuI3BhdGgpXG4gICAgaWYgKG10aW1lTXMgPiB0aGlzLmxhc3RNb2RpZmllZCkge1xuICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVGhlIHJlcXVlc3RlZCBmaWxlIGNvdWxkIG5vdCBiZSByZWFkLCB0eXBpY2FsbHkgZHVlIHRvIHBlcm1pc3Npb24gcHJvYmxlbXMgdGhhdCBoYXZlIG9jY3VycmVkIGFmdGVyIGEgcmVmZXJlbmNlIHRvIGEgZmlsZSB3YXMgYWNxdWlyZWQuJywgJ05vdFJlYWRhYmxlRXJyb3InKVxuICAgIH1cbiAgICB5aWVsZCAqIGNyZWF0ZVJlYWRTdHJlYW0odGhpcy4jcGF0aCwge1xuICAgICAgc3RhcnQ6IHRoaXMuI3N0YXJ0LFxuICAgICAgZW5kOiB0aGlzLiNzdGFydCArIHRoaXMuc2l6ZSAtIDFcbiAgICB9KVxuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddICgpIHtcbiAgICByZXR1cm4gJ0Jsb2InXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYmxvYkZyb21TeW5jXG5leHBvcnQgeyBGaWxlLCBCbG9iLCBibG9iRnJvbSwgYmxvYkZyb21TeW5jLCBmaWxlRnJvbSwgZmlsZUZyb21TeW5jIH1cbiIsICJpbXBvcnQge0ZpbGV9IGZyb20gJ2ZldGNoLWJsb2IvZnJvbS5qcyc7XG5pbXBvcnQge0Zvcm1EYXRhfSBmcm9tICdmb3JtZGF0YS1wb2x5ZmlsbC9lc20ubWluLmpzJztcblxubGV0IHMgPSAwO1xuY29uc3QgUyA9IHtcblx0U1RBUlRfQk9VTkRBUlk6IHMrKyxcblx0SEVBREVSX0ZJRUxEX1NUQVJUOiBzKyssXG5cdEhFQURFUl9GSUVMRDogcysrLFxuXHRIRUFERVJfVkFMVUVfU1RBUlQ6IHMrKyxcblx0SEVBREVSX1ZBTFVFOiBzKyssXG5cdEhFQURFUl9WQUxVRV9BTE1PU1RfRE9ORTogcysrLFxuXHRIRUFERVJTX0FMTU9TVF9ET05FOiBzKyssXG5cdFBBUlRfREFUQV9TVEFSVDogcysrLFxuXHRQQVJUX0RBVEE6IHMrKyxcblx0RU5EOiBzKytcbn07XG5cbmxldCBmID0gMTtcbmNvbnN0IEYgPSB7XG5cdFBBUlRfQk9VTkRBUlk6IGYsXG5cdExBU1RfQk9VTkRBUlk6IGYgKj0gMlxufTtcblxuY29uc3QgTEYgPSAxMDtcbmNvbnN0IENSID0gMTM7XG5jb25zdCBTUEFDRSA9IDMyO1xuY29uc3QgSFlQSEVOID0gNDU7XG5jb25zdCBDT0xPTiA9IDU4O1xuY29uc3QgQSA9IDk3O1xuY29uc3QgWiA9IDEyMjtcblxuY29uc3QgbG93ZXIgPSBjID0+IGMgfCAweDIwO1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNsYXNzIE11bHRpcGFydFBhcnNlciB7XG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYm91bmRhcnlcblx0ICovXG5cdGNvbnN0cnVjdG9yKGJvdW5kYXJ5KSB7XG5cdFx0dGhpcy5pbmRleCA9IDA7XG5cdFx0dGhpcy5mbGFncyA9IDA7XG5cblx0XHR0aGlzLm9uSGVhZGVyRW5kID0gbm9vcDtcblx0XHR0aGlzLm9uSGVhZGVyRmllbGQgPSBub29wO1xuXHRcdHRoaXMub25IZWFkZXJzRW5kID0gbm9vcDtcblx0XHR0aGlzLm9uSGVhZGVyVmFsdWUgPSBub29wO1xuXHRcdHRoaXMub25QYXJ0QmVnaW4gPSBub29wO1xuXHRcdHRoaXMub25QYXJ0RGF0YSA9IG5vb3A7XG5cdFx0dGhpcy5vblBhcnRFbmQgPSBub29wO1xuXG5cdFx0dGhpcy5ib3VuZGFyeUNoYXJzID0ge307XG5cblx0XHRib3VuZGFyeSA9ICdcXHJcXG4tLScgKyBib3VuZGFyeTtcblx0XHRjb25zdCB1aThhID0gbmV3IFVpbnQ4QXJyYXkoYm91bmRhcnkubGVuZ3RoKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJvdW5kYXJ5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR1aThhW2ldID0gYm91bmRhcnkuY2hhckNvZGVBdChpKTtcblx0XHRcdHRoaXMuYm91bmRhcnlDaGFyc1t1aThhW2ldXSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0dGhpcy5ib3VuZGFyeSA9IHVpOGE7XG5cdFx0dGhpcy5sb29rYmVoaW5kID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5ib3VuZGFyeS5sZW5ndGggKyA4KTtcblx0XHR0aGlzLnN0YXRlID0gUy5TVEFSVF9CT1VOREFSWTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGRhdGFcblx0ICovXG5cdHdyaXRlKGRhdGEpIHtcblx0XHRsZXQgaSA9IDA7XG5cdFx0Y29uc3QgbGVuZ3RoXyA9IGRhdGEubGVuZ3RoO1xuXHRcdGxldCBwcmV2aW91c0luZGV4ID0gdGhpcy5pbmRleDtcblx0XHRsZXQge2xvb2tiZWhpbmQsIGJvdW5kYXJ5LCBib3VuZGFyeUNoYXJzLCBpbmRleCwgc3RhdGUsIGZsYWdzfSA9IHRoaXM7XG5cdFx0Y29uc3QgYm91bmRhcnlMZW5ndGggPSB0aGlzLmJvdW5kYXJ5Lmxlbmd0aDtcblx0XHRjb25zdCBib3VuZGFyeUVuZCA9IGJvdW5kYXJ5TGVuZ3RoIC0gMTtcblx0XHRjb25zdCBidWZmZXJMZW5ndGggPSBkYXRhLmxlbmd0aDtcblx0XHRsZXQgYztcblx0XHRsZXQgY2w7XG5cblx0XHRjb25zdCBtYXJrID0gbmFtZSA9PiB7XG5cdFx0XHR0aGlzW25hbWUgKyAnTWFyayddID0gaTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgY2xlYXIgPSBuYW1lID0+IHtcblx0XHRcdGRlbGV0ZSB0aGlzW25hbWUgKyAnTWFyayddO1xuXHRcdH07XG5cblx0XHRjb25zdCBjYWxsYmFjayA9IChjYWxsYmFja1N5bWJvbCwgc3RhcnQsIGVuZCwgdWk4YSkgPT4ge1xuXHRcdFx0aWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgIT09IGVuZCkge1xuXHRcdFx0XHR0aGlzW2NhbGxiYWNrU3ltYm9sXSh1aThhICYmIHVpOGEuc3ViYXJyYXkoc3RhcnQsIGVuZCkpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRjb25zdCBkYXRhQ2FsbGJhY2sgPSAobmFtZSwgY2xlYXIpID0+IHtcblx0XHRcdGNvbnN0IG1hcmtTeW1ib2wgPSBuYW1lICsgJ01hcmsnO1xuXHRcdFx0aWYgKCEobWFya1N5bWJvbCBpbiB0aGlzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjbGVhcikge1xuXHRcdFx0XHRjYWxsYmFjayhuYW1lLCB0aGlzW21hcmtTeW1ib2xdLCBpLCBkYXRhKTtcblx0XHRcdFx0ZGVsZXRlIHRoaXNbbWFya1N5bWJvbF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjYWxsYmFjayhuYW1lLCB0aGlzW21hcmtTeW1ib2xdLCBkYXRhLmxlbmd0aCwgZGF0YSk7XG5cdFx0XHRcdHRoaXNbbWFya1N5bWJvbF0gPSAwO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoXzsgaSsrKSB7XG5cdFx0XHRjID0gZGF0YVtpXTtcblxuXHRcdFx0c3dpdGNoIChzdGF0ZSkge1xuXHRcdFx0XHRjYXNlIFMuU1RBUlRfQk9VTkRBUlk6XG5cdFx0XHRcdFx0aWYgKGluZGV4ID09PSBib3VuZGFyeS5sZW5ndGggLSAyKSB7XG5cdFx0XHRcdFx0XHRpZiAoYyA9PT0gSFlQSEVOKSB7XG5cdFx0XHRcdFx0XHRcdGZsYWdzIHw9IEYuTEFTVF9CT1VOREFSWTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoYyAhPT0gQ1IpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbmRleCAtIDEgPT09IGJvdW5kYXJ5Lmxlbmd0aCAtIDIpIHtcblx0XHRcdFx0XHRcdGlmIChmbGFncyAmIEYuTEFTVF9CT1VOREFSWSAmJiBjID09PSBIWVBIRU4pIHtcblx0XHRcdFx0XHRcdFx0c3RhdGUgPSBTLkVORDtcblx0XHRcdFx0XHRcdFx0ZmxhZ3MgPSAwO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICghKGZsYWdzICYgRi5MQVNUX0JPVU5EQVJZKSAmJiBjID09PSBMRikge1xuXHRcdFx0XHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrKCdvblBhcnRCZWdpbicpO1xuXHRcdFx0XHRcdFx0XHRzdGF0ZSA9IFMuSEVBREVSX0ZJRUxEX1NUQVJUO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoYyAhPT0gYm91bmRhcnlbaW5kZXggKyAyXSkge1xuXHRcdFx0XHRcdFx0aW5kZXggPSAtMjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoYyA9PT0gYm91bmRhcnlbaW5kZXggKyAyXSkge1xuXHRcdFx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBTLkhFQURFUl9GSUVMRF9TVEFSVDpcblx0XHRcdFx0XHRzdGF0ZSA9IFMuSEVBREVSX0ZJRUxEO1xuXHRcdFx0XHRcdG1hcmsoJ29uSGVhZGVyRmllbGQnKTtcblx0XHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcdFx0Ly8gZmFsbHMgdGhyb3VnaFxuXHRcdFx0XHRjYXNlIFMuSEVBREVSX0ZJRUxEOlxuXHRcdFx0XHRcdGlmIChjID09PSBDUikge1xuXHRcdFx0XHRcdFx0Y2xlYXIoJ29uSGVhZGVyRmllbGQnKTtcblx0XHRcdFx0XHRcdHN0YXRlID0gUy5IRUFERVJTX0FMTU9TVF9ET05FO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0XHRpZiAoYyA9PT0gSFlQSEVOKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoYyA9PT0gQ09MT04pIHtcblx0XHRcdFx0XHRcdGlmIChpbmRleCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0XHQvLyBlbXB0eSBoZWFkZXIgZmllbGRcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRkYXRhQ2FsbGJhY2soJ29uSGVhZGVyRmllbGQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdHN0YXRlID0gUy5IRUFERVJfVkFMVUVfU1RBUlQ7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjbCA9IGxvd2VyKGMpO1xuXHRcdFx0XHRcdGlmIChjbCA8IEEgfHwgY2wgPiBaKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgUy5IRUFERVJfVkFMVUVfU1RBUlQ6XG5cdFx0XHRcdFx0aWYgKGMgPT09IFNQQUNFKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRtYXJrKCdvbkhlYWRlclZhbHVlJyk7XG5cdFx0XHRcdFx0c3RhdGUgPSBTLkhFQURFUl9WQUxVRTtcblx0XHRcdFx0XHQvLyBmYWxscyB0aHJvdWdoXG5cdFx0XHRcdGNhc2UgUy5IRUFERVJfVkFMVUU6XG5cdFx0XHRcdFx0aWYgKGMgPT09IENSKSB7XG5cdFx0XHRcdFx0XHRkYXRhQ2FsbGJhY2soJ29uSGVhZGVyVmFsdWUnLCB0cnVlKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCdvbkhlYWRlckVuZCcpO1xuXHRcdFx0XHRcdFx0c3RhdGUgPSBTLkhFQURFUl9WQUxVRV9BTE1PU1RfRE9ORTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBTLkhFQURFUl9WQUxVRV9BTE1PU1RfRE9ORTpcblx0XHRcdFx0XHRpZiAoYyAhPT0gTEYpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGF0ZSA9IFMuSEVBREVSX0ZJRUxEX1NUQVJUO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFMuSEVBREVSU19BTE1PU1RfRE9ORTpcblx0XHRcdFx0XHRpZiAoYyAhPT0gTEYpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjYWxsYmFjaygnb25IZWFkZXJzRW5kJyk7XG5cdFx0XHRcdFx0c3RhdGUgPSBTLlBBUlRfREFUQV9TVEFSVDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBTLlBBUlRfREFUQV9TVEFSVDpcblx0XHRcdFx0XHRzdGF0ZSA9IFMuUEFSVF9EQVRBO1xuXHRcdFx0XHRcdG1hcmsoJ29uUGFydERhdGEnKTtcblx0XHRcdFx0XHQvLyBmYWxscyB0aHJvdWdoXG5cdFx0XHRcdGNhc2UgUy5QQVJUX0RBVEE6XG5cdFx0XHRcdFx0cHJldmlvdXNJbmRleCA9IGluZGV4O1xuXG5cdFx0XHRcdFx0aWYgKGluZGV4ID09PSAwKSB7XG5cdFx0XHRcdFx0XHQvLyBib3llci1tb29yZSBkZXJyaXZlZCBhbGdvcml0aG0gdG8gc2FmZWx5IHNraXAgbm9uLWJvdW5kYXJ5IGRhdGFcblx0XHRcdFx0XHRcdGkgKz0gYm91bmRhcnlFbmQ7XG5cdFx0XHRcdFx0XHR3aGlsZSAoaSA8IGJ1ZmZlckxlbmd0aCAmJiAhKGRhdGFbaV0gaW4gYm91bmRhcnlDaGFycykpIHtcblx0XHRcdFx0XHRcdFx0aSArPSBib3VuZGFyeUxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aSAtPSBib3VuZGFyeUVuZDtcblx0XHRcdFx0XHRcdGMgPSBkYXRhW2ldO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChpbmRleCA8IGJvdW5kYXJ5Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0aWYgKGJvdW5kYXJ5W2luZGV4XSA9PT0gYykge1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5kZXggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRkYXRhQ2FsbGJhY2soJ29uUGFydERhdGEnLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGluZGV4Kys7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbmRleCA9PT0gYm91bmRhcnkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRcdFx0aWYgKGMgPT09IENSKSB7XG5cdFx0XHRcdFx0XHRcdC8vIENSID0gcGFydCBib3VuZGFyeVxuXHRcdFx0XHRcdFx0XHRmbGFncyB8PSBGLlBBUlRfQk9VTkRBUlk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09IEhZUEhFTikge1xuXHRcdFx0XHRcdFx0XHQvLyBIWVBIRU4gPSBlbmQgYm91bmRhcnlcblx0XHRcdFx0XHRcdFx0ZmxhZ3MgfD0gRi5MQVNUX0JPVU5EQVJZO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aW5kZXggPSAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW5kZXggLSAxID09PSBib3VuZGFyeS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGlmIChmbGFncyAmIEYuUEFSVF9CT1VOREFSWSkge1xuXHRcdFx0XHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHRcdGlmIChjID09PSBMRikge1xuXHRcdFx0XHRcdFx0XHRcdC8vIHVuc2V0IHRoZSBQQVJUX0JPVU5EQVJZIGZsYWdcblx0XHRcdFx0XHRcdFx0XHRmbGFncyAmPSB+Ri5QQVJUX0JPVU5EQVJZO1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrKCdvblBhcnRFbmQnKTtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjaygnb25QYXJ0QmVnaW4nKTtcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZSA9IFMuSEVBREVSX0ZJRUxEX1NUQVJUO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGZsYWdzICYgRi5MQVNUX0JPVU5EQVJZKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChjID09PSBIWVBIRU4pIHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjaygnb25QYXJ0RW5kJyk7XG5cdFx0XHRcdFx0XHRcdFx0c3RhdGUgPSBTLkVORDtcblx0XHRcdFx0XHRcdFx0XHRmbGFncyA9IDA7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0aW5kZXggPSAwO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGluZGV4ID4gMCkge1xuXHRcdFx0XHRcdFx0Ly8gd2hlbiBtYXRjaGluZyBhIHBvc3NpYmxlIGJvdW5kYXJ5LCBrZWVwIGEgbG9va2JlaGluZCByZWZlcmVuY2Vcblx0XHRcdFx0XHRcdC8vIGluIGNhc2UgaXQgdHVybnMgb3V0IHRvIGJlIGEgZmFsc2UgbGVhZFxuXHRcdFx0XHRcdFx0bG9va2JlaGluZFtpbmRleCAtIDFdID0gYztcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByZXZpb3VzSW5kZXggPiAwKSB7XG5cdFx0XHRcdFx0XHQvLyBpZiBvdXIgYm91bmRhcnkgdHVybmVkIG91dCB0byBiZSBydWJiaXNoLCB0aGUgY2FwdHVyZWQgbG9va2JlaGluZFxuXHRcdFx0XHRcdFx0Ly8gYmVsb25ncyB0byBwYXJ0RGF0YVxuXHRcdFx0XHRcdFx0Y29uc3QgX2xvb2tiZWhpbmQgPSBuZXcgVWludDhBcnJheShsb29rYmVoaW5kLmJ1ZmZlciwgbG9va2JlaGluZC5ieXRlT2Zmc2V0LCBsb29rYmVoaW5kLmJ5dGVMZW5ndGgpO1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2soJ29uUGFydERhdGEnLCAwLCBwcmV2aW91c0luZGV4LCBfbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0XHRwcmV2aW91c0luZGV4ID0gMDtcblx0XHRcdFx0XHRcdG1hcmsoJ29uUGFydERhdGEnKTtcblxuXHRcdFx0XHRcdFx0Ly8gcmVjb25zaWRlciB0aGUgY3VycmVudCBjaGFyYWN0ZXIgZXZlbiBzbyBpdCBpbnRlcnJ1cHRlZCB0aGUgc2VxdWVuY2Vcblx0XHRcdFx0XHRcdC8vIGl0IGNvdWxkIGJlIHRoZSBiZWdpbm5pbmcgb2YgYSBuZXcgc2VxdWVuY2Vcblx0XHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBTLkVORDpcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgc3RhdGUgZW50ZXJlZDogJHtzdGF0ZX1gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkYXRhQ2FsbGJhY2soJ29uSGVhZGVyRmllbGQnKTtcblx0XHRkYXRhQ2FsbGJhY2soJ29uSGVhZGVyVmFsdWUnKTtcblx0XHRkYXRhQ2FsbGJhY2soJ29uUGFydERhdGEnKTtcblxuXHRcdC8vIFVwZGF0ZSBwcm9wZXJ0aWVzIGZvciB0aGUgbmV4dCBjYWxsXG5cdFx0dGhpcy5pbmRleCA9IGluZGV4O1xuXHRcdHRoaXMuc3RhdGUgPSBzdGF0ZTtcblx0XHR0aGlzLmZsYWdzID0gZmxhZ3M7XG5cdH1cblxuXHRlbmQoKSB7XG5cdFx0aWYgKCh0aGlzLnN0YXRlID09PSBTLkhFQURFUl9GSUVMRF9TVEFSVCAmJiB0aGlzLmluZGV4ID09PSAwKSB8fFxuXHRcdFx0KHRoaXMuc3RhdGUgPT09IFMuUEFSVF9EQVRBICYmIHRoaXMuaW5kZXggPT09IHRoaXMuYm91bmRhcnkubGVuZ3RoKSkge1xuXHRcdFx0dGhpcy5vblBhcnRFbmQoKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdGUgIT09IFMuRU5EKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ011bHRpcGFydFBhcnNlci5lbmQoKTogc3RyZWFtIGVuZGVkIHVuZXhwZWN0ZWRseScpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBfZmlsZU5hbWUoaGVhZGVyVmFsdWUpIHtcblx0Ly8gbWF0Y2hlcyBlaXRoZXIgYSBxdW90ZWQtc3RyaW5nIG9yIGEgdG9rZW4gKFJGQyAyNjE2IHNlY3Rpb24gMTkuNS4xKVxuXHRjb25zdCBtID0gaGVhZGVyVmFsdWUubWF0Y2goL1xcYmZpbGVuYW1lPShcIiguKj8pXCJ8KFteKCk8PkAsOzpcXFxcXCIvW1xcXT89e31cXHNcXHRdKykpKCR8O1xccykvaSk7XG5cdGlmICghbSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IG1hdGNoID0gbVsyXSB8fCBtWzNdIHx8ICcnO1xuXHRsZXQgZmlsZW5hbWUgPSBtYXRjaC5zbGljZShtYXRjaC5sYXN0SW5kZXhPZignXFxcXCcpICsgMSk7XG5cdGZpbGVuYW1lID0gZmlsZW5hbWUucmVwbGFjZSgvJTIyL2csICdcIicpO1xuXHRmaWxlbmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoLyYjKFxcZHs0fSk7L2csIChtLCBjb2RlKSA9PiB7XG5cdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG5cdH0pO1xuXHRyZXR1cm4gZmlsZW5hbWU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b0Zvcm1EYXRhKEJvZHksIGN0KSB7XG5cdGlmICghL211bHRpcGFydC9pLnRlc3QoY3QpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGZldGNoJyk7XG5cdH1cblxuXHRjb25zdCBtID0gY3QubWF0Y2goL2JvdW5kYXJ5PSg/OlwiKFteXCJdKylcInwoW147XSspKS9pKTtcblxuXHRpZiAoIW0pIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdubyBvciBiYWQgY29udGVudC10eXBlIGhlYWRlciwgbm8gbXVsdGlwYXJ0IGJvdW5kYXJ5Jyk7XG5cdH1cblxuXHRjb25zdCBwYXJzZXIgPSBuZXcgTXVsdGlwYXJ0UGFyc2VyKG1bMV0gfHwgbVsyXSk7XG5cblx0bGV0IGhlYWRlckZpZWxkO1xuXHRsZXQgaGVhZGVyVmFsdWU7XG5cdGxldCBlbnRyeVZhbHVlO1xuXHRsZXQgZW50cnlOYW1lO1xuXHRsZXQgY29udGVudFR5cGU7XG5cdGxldCBmaWxlbmFtZTtcblx0Y29uc3QgZW50cnlDaHVua3MgPSBbXTtcblx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuXHRjb25zdCBvblBhcnREYXRhID0gdWk4YSA9PiB7XG5cdFx0ZW50cnlWYWx1ZSArPSBkZWNvZGVyLmRlY29kZSh1aThhLCB7c3RyZWFtOiB0cnVlfSk7XG5cdH07XG5cblx0Y29uc3QgYXBwZW5kVG9GaWxlID0gdWk4YSA9PiB7XG5cdFx0ZW50cnlDaHVua3MucHVzaCh1aThhKTtcblx0fTtcblxuXHRjb25zdCBhcHBlbmRGaWxlVG9Gb3JtRGF0YSA9ICgpID0+IHtcblx0XHRjb25zdCBmaWxlID0gbmV3IEZpbGUoZW50cnlDaHVua3MsIGZpbGVuYW1lLCB7dHlwZTogY29udGVudFR5cGV9KTtcblx0XHRmb3JtRGF0YS5hcHBlbmQoZW50cnlOYW1lLCBmaWxlKTtcblx0fTtcblxuXHRjb25zdCBhcHBlbmRFbnRyeVRvRm9ybURhdGEgPSAoKSA9PiB7XG5cdFx0Zm9ybURhdGEuYXBwZW5kKGVudHJ5TmFtZSwgZW50cnlWYWx1ZSk7XG5cdH07XG5cblx0Y29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcblx0ZGVjb2Rlci5kZWNvZGUoKTtcblxuXHRwYXJzZXIub25QYXJ0QmVnaW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cGFyc2VyLm9uUGFydERhdGEgPSBvblBhcnREYXRhO1xuXHRcdHBhcnNlci5vblBhcnRFbmQgPSBhcHBlbmRFbnRyeVRvRm9ybURhdGE7XG5cblx0XHRoZWFkZXJGaWVsZCA9ICcnO1xuXHRcdGhlYWRlclZhbHVlID0gJyc7XG5cdFx0ZW50cnlWYWx1ZSA9ICcnO1xuXHRcdGVudHJ5TmFtZSA9ICcnO1xuXHRcdGNvbnRlbnRUeXBlID0gJyc7XG5cdFx0ZmlsZW5hbWUgPSBudWxsO1xuXHRcdGVudHJ5Q2h1bmtzLmxlbmd0aCA9IDA7XG5cdH07XG5cblx0cGFyc2VyLm9uSGVhZGVyRmllbGQgPSBmdW5jdGlvbiAodWk4YSkge1xuXHRcdGhlYWRlckZpZWxkICs9IGRlY29kZXIuZGVjb2RlKHVpOGEsIHtzdHJlYW06IHRydWV9KTtcblx0fTtcblxuXHRwYXJzZXIub25IZWFkZXJWYWx1ZSA9IGZ1bmN0aW9uICh1aThhKSB7XG5cdFx0aGVhZGVyVmFsdWUgKz0gZGVjb2Rlci5kZWNvZGUodWk4YSwge3N0cmVhbTogdHJ1ZX0pO1xuXHR9O1xuXG5cdHBhcnNlci5vbkhlYWRlckVuZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRoZWFkZXJWYWx1ZSArPSBkZWNvZGVyLmRlY29kZSgpO1xuXHRcdGhlYWRlckZpZWxkID0gaGVhZGVyRmllbGQudG9Mb3dlckNhc2UoKTtcblxuXHRcdGlmIChoZWFkZXJGaWVsZCA9PT0gJ2NvbnRlbnQtZGlzcG9zaXRpb24nKSB7XG5cdFx0XHQvLyBtYXRjaGVzIGVpdGhlciBhIHF1b3RlZC1zdHJpbmcgb3IgYSB0b2tlbiAoUkZDIDI2MTYgc2VjdGlvbiAxOS41LjEpXG5cdFx0XHRjb25zdCBtID0gaGVhZGVyVmFsdWUubWF0Y2goL1xcYm5hbWU9KFwiKFteXCJdKilcInwoW14oKTw+QCw7OlxcXFxcIi9bXFxdPz17fVxcc1xcdF0rKSkvaSk7XG5cblx0XHRcdGlmIChtKSB7XG5cdFx0XHRcdGVudHJ5TmFtZSA9IG1bMl0gfHwgbVszXSB8fCAnJztcblx0XHRcdH1cblxuXHRcdFx0ZmlsZW5hbWUgPSBfZmlsZU5hbWUoaGVhZGVyVmFsdWUpO1xuXG5cdFx0XHRpZiAoZmlsZW5hbWUpIHtcblx0XHRcdFx0cGFyc2VyLm9uUGFydERhdGEgPSBhcHBlbmRUb0ZpbGU7XG5cdFx0XHRcdHBhcnNlci5vblBhcnRFbmQgPSBhcHBlbmRGaWxlVG9Gb3JtRGF0YTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGhlYWRlckZpZWxkID09PSAnY29udGVudC10eXBlJykge1xuXHRcdFx0Y29udGVudFR5cGUgPSBoZWFkZXJWYWx1ZTtcblx0XHR9XG5cblx0XHRoZWFkZXJWYWx1ZSA9ICcnO1xuXHRcdGhlYWRlckZpZWxkID0gJyc7XG5cdH07XG5cblx0Zm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBCb2R5KSB7XG5cdFx0cGFyc2VyLndyaXRlKGNodW5rKTtcblx0fVxuXG5cdHBhcnNlci5lbmQoKTtcblxuXHRyZXR1cm4gZm9ybURhdGE7XG59XG4iLCAiaW1wb3J0IFNwaW5EZXRhaWxzTGlzdCBmcm9tIFwiLi9jb21wb25lbnRzL2RldGFpbHMtbGlzdC9kZXRhaWxzLWxpc3RcIjtcblxuaW1wb3J0IHVzZVNwaW5TaG93IGZyb20gXCIuL2hvb2tzL3VzZS1zcGluLXNob3dcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGF0ZXN0U3BpbigpIHtcbiAgY29uc3QgeyBkYXRhOiBzcGluLCBsb2FkaW5nIH0gPSB1c2VTcGluU2hvdyh1bmRlZmluZWQsIHRydWUpO1xuXG4gIHJldHVybiA8U3BpbkRldGFpbHNMaXN0IHNwaW49e3NwaW59IGxvYWRpbmc9e2xvYWRpbmd9IC8+O1xufVxuIiwgImltcG9ydCB7IExpc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBTcGluVHlwZXMgfSBmcm9tIFwiLi4vLi4vbGliL3NwaW5cIjtcblxuaW1wb3J0IFNwaW5EZXRhaWxzTGlzdEl0ZW0gZnJvbSBcIi4vZGV0YWlscy1saXN0LWl0ZW1cIjtcblxuaW50ZXJmYWNlIFNwaW5EZXRhaWxzTGlzdFByb3BzIHtcbiAgc3Bpbj86IFNwaW5UeXBlcztcbiAgbG9hZGluZz86IGJvb2xlYW47XG59XG5cbi8vIHRoaXMgdmlldyB3aWxsIG5vdCB1cGRhdGUgc2luY2UgdGhlIHByb3BzIG9mIHRoaXMgY29tcG9uZW50XG4vLyBhcmUgbm90IHVwZGF0ZWQgb25jZSB0aGlzIHZpZXcgaXMgcHVzaGVkIHRvIHRoZSBzdGFja1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3BpbkRldGFpbHNMaXN0KHsgc3BpbiwgbG9hZGluZyA9IGZhbHNlIH06IFNwaW5EZXRhaWxzTGlzdFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPExpc3Qgey4uLihzcGluPy5uYW1lICYmIHsgbmF2aWdhdGlvblRpdGxlOiBgU3BpbiBcIiR7c3Bpbi5uYW1lfVwiYCB9KX0gaXNMb2FkaW5nPXtsb2FkaW5nfT5cbiAgICAgIHsoc3Bpbj8uc2VydmljZXMgPz8gW10pLm1hcCgoc2VydmljZSkgPT4gKFxuICAgICAgICA8U3BpbkRldGFpbHNMaXN0SXRlbSBrZXk9e3NlcnZpY2UubmFtZX0gc3Bpbj17c3BpbiBhcyBTcGluVHlwZXN9IHNlcnZpY2U9e3NlcnZpY2V9IC8+XG4gICAgICApKX1cbiAgICA8L0xpc3Q+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBMaXN0LCBBY3Rpb25QYW5lbCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcblxuaW1wb3J0IHsgU3BpblR5cGVzLCBTZXJ2aWNlVHlwZXMsIFNlcnZpY2VTdGF0ZSwgaWNvbkZyb21TcGluU2VydmljZVN0YXRlIH0gZnJvbSBcIi4uLy4uL2xpYi9zcGluXCI7XG5cbmltcG9ydCB7IFNwaW5Db2RlQWN0aW9uLCBTcGluT3BlbkFjdGlvbiwgT3BlblNRTENsaWVudEFjdGlvbiwgT3Blbkluc29tbmlhQWN0aW9uIH0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcblxuaW50ZXJmYWNlIFNwaW5EZXRhaWxzTGlzdEl0ZW1Qcm9wcyB7XG4gIHNlcnZpY2U6IFNlcnZpY2VUeXBlcztcbiAgc3BpbjogU3BpblR5cGVzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTcGluRGV0YWlsc0xpc3RJdGVtKHsgc3Bpbiwgc2VydmljZSB9OiBTcGluRGV0YWlsc0xpc3RJdGVtUHJvcHMpIHtcbiAgY29uc3Qgc3VidGl0bGUgPSBzZXJ2aWNlLmJyYW5jaDtcblxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGU8U2VydmljZVN0YXRlIHwgdW5kZWZpbmVkPigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIHNldFN0YXR1cyhhd2FpdCBzZXJ2aWNlLmdldFN0YXRlKCkpO1xuICAgIH0pKCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxMaXN0Lkl0ZW1cbiAgICAgIHRpdGxlPXtzZXJ2aWNlLm5hbWV9XG4gICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XG4gICAgICB7Li4uKHN0YXR1cyAmJiB7IGFjY2Vzc29yeVRpdGxlOiBzdGF0dXMsIGFjY2Vzc29yeUljb246IGljb25Gcm9tU3BpblNlcnZpY2VTdGF0ZShzdGF0dXMpIH0pfVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8U3BpbkNvZGVBY3Rpb24gc2VydmljZT17c2VydmljZX0gc3Bpbj17c3Bpbn0gLz5cbiAgICAgICAgICA8U3Bpbk9wZW5BY3Rpb24gc2VydmljZT17c2VydmljZX0gc3Bpbj17c3Bpbn0gLz5cbiAgICAgICAgICA8T3BlblNRTENsaWVudEFjdGlvbiBzZXJ2aWNlPXtzZXJ2aWNlfSBzcGluPXtzcGlufSAvPlxuICAgICAgICAgIDxPcGVuSW5zb21uaWFBY3Rpb24gc2VydmljZT17c2VydmljZX0gc3Bpbj17c3Bpbn0gLz5cbiAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgIH1cbiAgICAvPlxuICApO1xufVxuIiwgImltcG9ydCB7IG9wZW4gfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbmltcG9ydCB7IGluc29tbmlhQ29tbWFuZCwgc3BpbkNvbW1hbmQgfSBmcm9tIFwiLi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgU2VydmljZURhdGFUeXBlcywgU2VydmljZVN0YXRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBTcGluVHlwZXMgfSBmcm9tIFwiLi4vc3Bpbi10eXBlXCI7XG5cbmltcG9ydCB7IERFRkFVTFRfU1FMX1BPUlQgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBwYXJzZVJlcG9TbHVnLCBTbHVnIH0gZnJvbSBcIi4uL3V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU2VydmljZTxEIGV4dGVuZHMgU2VydmljZURhdGFUeXBlcywgVCBleHRlbmRzIFNwaW5UeXBlcz4ge1xuICBwdWJsaWMgZGF0YTogRDtcbiAgcHJvdGVjdGVkIHNwaW46IFQ7XG5cbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIHNsdWc6IFNsdWc7XG4gIHB1YmxpYyBicmFuY2g6IHN0cmluZztcbiAgcHVibGljIHJldjogc3RyaW5nO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBmcWRuOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogRCwgc3BpbjogVCkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5zcGluID0gc3BpbjtcblxuICAgIHRoaXMubmFtZSA9IHRoaXMuZGF0YS5uYW1lO1xuICAgIHRoaXMuYnJhbmNoID0gdGhpcy5kYXRhLmJyYW5jaDtcbiAgICB0aGlzLnJldiA9IHRoaXMuZGF0YS5yZXZpc2lvbjtcblxuICAgIHRoaXMuc2x1ZyA9IHBhcnNlUmVwb1NsdWcodGhpcy5uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRTdGF0ZSgpOiBQcm9taXNlPFNlcnZpY2VTdGF0ZT47XG5cbiAgcHVibGljIGFzeW5jIG9wZW4oKSB7XG4gICAgLy8gc3BpbkNvbW1hbmQoYG9wZW5gLCB0aGlzLnNwaW4ubmFtZSk7XG4gICAgLy8gc2FtZSBsb2dpYyBhcyBzcGluIG9wZW5cbiAgICBhd2FpdCBvcGVuKGBodHRwczovLyR7dGhpcy5mcWRufWApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvZGUoKSB7XG4gICAgY29uc3QgY29kZSA9IChhd2FpdCBzcGluQ29tbWFuZChgY29kZSAke3RoaXMuc3Bpbi5uYW1lfSAke3RoaXMubmFtZX1gLCB0aGlzLnNwaW4ubmFtZSwgdHJ1ZSkpLnN0ZG91dDtcbiAgICBjb25zdCBjb2RlUmVzcCA9IEpTT04ucGFyc2UoY29kZSk7XG4gICAgcmV0dXJuIGNvZGVSZXNwO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGluc29tbmlhKCkge1xuICAgIGF3YWl0IGluc29tbmlhQ29tbWFuZCh0aGlzLnNwaW4ubmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb3BlblNxbCgpIHtcbiAgICBjb25zdCBwb3J0ID0gYXdhaXQgdGhpcy5zcWxQb3J0KCk7XG4gICAgY29uc3Qgb3BlblVybCA9IGBteXNxbDovL3Jvb3RAJHt0aGlzLmZxZG59OiR7cG9ydH1gO1xuICAgIGNvbnNvbGUubG9nKG9wZW5VcmwpO1xuICAgIC8vIGF3YWl0IGV4ZWNwKGBvcGVuIFwiJHtvcGVuVXJsfVwiYCk7XG4gICAgYXdhaXQgb3BlbihvcGVuVXJsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBzcWxQb3J0KCkge1xuICAgIHJldHVybiBERUZBVUxUX1NRTF9QT1JUO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCBmZXRjaCBmcm9tIFwibm9kZS1mZXRjaFwiO1xuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuXG5pbXBvcnQgeyBJY29uLCBDb2xvciwgSW1hZ2UgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBTdGF0ZSwgU3Bpbkxpc3RSZXNwb25zZSwgU3BpblNob3dSZXNwb25zZSwgU3BpbkNyZWF0ZVJlc3BvbnNlLCBTZXJ2aWNlU3RhdGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgU2VydmljZVR5cGVzLCBTcGluVHlwZXMgfSBmcm9tIFwiLlwiO1xuXG4vLyB0aGUgb25seSB3YXkgdG8gdXNlIHRoZSBzcGluIGNlcnQgaXMgdG8gbGF1bmNoIFJheWNhc3Qgd2l0aCBhbiBlbnYgdmFyIHdpdGggTk9ERV9FWFRSQV9DQV9DRVJUUy4uLlxuLy8ganVzdCBieXBhc3NpbmcgZm9yIG5vdy5cbmNvbnN0IGh0dHBzQWdlbnQgPSBuZXcgaHR0cHMuQWdlbnQoe1xuICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxufSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFVuYXV0aG9yaXplZCh1cmw6IHN0cmluZykge1xuICByZXR1cm4gYXdhaXQgZmV0Y2godXJsLCB7IGFnZW50OiBodHRwc0FnZW50IH0pO1xufVxuXG5pbnRlcmZhY2UgRXhlY1Byb21pc2VSZXNwb25zZSB7XG4gIHN0ZG91dDogc3RyaW5nO1xuICBzdGRlcnI6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWNwID0gKGNvbW1hbmQ6IHN0cmluZywgZW52OiBOb2RlSlMuUHJvY2Vzc0VudiA9IHt9KTogUHJvbWlzZTxFeGVjUHJvbWlzZVJlc3BvbnNlPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gcmF5Y2FzdCBkb2VzIG5vdCBhZGQgdGhlIFBBVEggZW52IHZhclxuICAgIGV4ZWMoXG4gICAgICBjb21tYW5kLFxuICAgICAgeyBlbnY6IHsgLi4ucHJvY2Vzcy5lbnYsIC4uLmVudiwgU1BJTl9OT19VUERBVEU6IFwiMVwiLCBQQVRIOiBcIi9iaW46L3Vzci9iaW46L3Vzci9zYmluOi91c3IvbG9jYWwvYmluXCIgfSB9LFxuICAgICAgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcCA9IHsgc3Rkb3V0LCBzdGRlcnIgfTtcblxuICAgICAgICBpZiAoZXJyKSByZWplY3QocmVzcCk7XG4gICAgICAgIGVsc2UgcmVzb2x2ZShyZXNwKTtcbiAgICAgIH1cbiAgICApO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpY29uRnJvbVNwaW5TdGF0ZShzdGF0ZTogU3RhdGUpOiBJbWFnZS5JbWFnZUxpa2Uge1xuICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgY2FzZSBTdGF0ZS5BdmFpbGFibGU6IHtcbiAgICAgIHJldHVybiB7IHNvdXJjZTogSWNvbi5Eb3QsIHRpbnRDb2xvcjogQ29sb3IuR3JlZW4gfTtcbiAgICB9XG4gICAgY2FzZSBTdGF0ZS5DcmVhdGluZzoge1xuICAgICAgcmV0dXJuIHsgc291cmNlOiBJY29uLkRvdCwgdGludENvbG9yOiBDb2xvci5CbHVlIH07XG4gICAgfVxuICAgIGNhc2UgU3RhdGUuU3VzcGVuZGVkOiB7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IEljb24uRXhjbGFtYXRpb25NYXJrLCB0aW50Q29sb3I6IENvbG9yLk9yYW5nZSB9O1xuICAgIH1cbiAgICBjYXNlIFN0YXRlLkNyYXNoaW5nOiB7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IEljb24uRXhjbGFtYXRpb25NYXJrLCB0aW50Q29sb3I6IENvbG9yLlJlZCB9O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaWNvbkZyb21TcGluU2VydmljZVN0YXRlKHN0YXRlOiBTZXJ2aWNlU3RhdGUpOiBJbWFnZS5JbWFnZUxpa2Uge1xuICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgY2FzZSBTZXJ2aWNlU3RhdGUuQWN0aXZlOiB7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IEljb24uRG90LCB0aW50Q29sb3I6IENvbG9yLkdyZWVuIH07XG4gICAgfVxuICAgIGNhc2UgU2VydmljZVN0YXRlLkFjdGl2YXRpbmc6IHtcbiAgICAgIHJldHVybiB7IHNvdXJjZTogSWNvbi5Eb3QsIHRpbnRDb2xvcjogQ29sb3IuQmx1ZSB9O1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IEljb24uRG90IH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzcGluQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIGluc3RhbmNlPzogc3RyaW5nLCBqc29uID0gdHJ1ZSkge1xuICAvLyBjb25zdCBjbWQgPSBbXCIvdXNyL2xvY2FsL2Jpbi9zcGluXCIsIGNvbW1hbmRdO1xuICBjb25zdCBjbWQgPSBbXCJzcGluXCIsIGNvbW1hbmRdO1xuICBpZiAoanNvbikgY21kLnB1c2goXCItLWpzb25cIik7XG4gIHJldHVybiBleGVjcChjbWQuam9pbihcIiBcIiksIHsgU1BJTl9JTlNUQU5DRTogaW5zdGFuY2UgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnNvbW5pYUNvbW1hbmQoaW5zdGFuY2U/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGV4ZWNwKFwib3BlbiAvQXBwbGljYXRpb25zL0luc29tbmlhLmFwcFwiLCB7IFNQSU5fSU5TVEFOQ0U6IGluc3RhbmNlIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3Bpbkxpc3QoKTogUHJvbWlzZTxTcGluTGlzdFJlc3BvbnNlPiB7XG4gIGNvbnN0IGxpc3QgPSAoYXdhaXQgc3BpbkNvbW1hbmQoXCJsaXN0IC0tYWxsXCIpKS5zdGRvdXQ7XG4gIGNvbnN0IGxpc3RDb250ZW50OiBTcGluTGlzdFJlc3BvbnNlID0gSlNPTi5wYXJzZShsaXN0KTtcbiAgcmV0dXJuIGxpc3RDb250ZW50O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3BpblNob3coaW5zdGFuY2U/OiBzdHJpbmcsIGxhdGVzdD86IGJvb2xlYW4pOiBQcm9taXNlPFNwaW5TaG93UmVzcG9uc2U+IHtcbiAgbGV0IHNob3c7XG4gIGlmIChsYXRlc3QpIHNob3cgPSAoYXdhaXQgc3BpbkNvbW1hbmQoXCJzaG93IC0tbGF0ZXN0XCIsIHVuZGVmaW5lZCkpLnN0ZG91dDtcbiAgZWxzZSBzaG93ID0gKGF3YWl0IHNwaW5Db21tYW5kKFwic2hvd1wiLCBpbnN0YW5jZSkpLnN0ZG91dDtcblxuICBjb25zdCBzaG93Q29udGVudDogU3BpblNob3dSZXNwb25zZSA9IEpTT04ucGFyc2Uoc2hvdyk7XG4gIHJldHVybiBzaG93Q29udGVudDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNwaW5DcmVhdGUocmVwbzogc3RyaW5nLCBuYW1lPzogc3RyaW5nLCBmbGFncz86IHN0cmluZyk6IFByb21pc2U8U3BpbkNyZWF0ZVJlc3BvbnNlPiB7XG4gIGNvbnN0IGNtZFBhcnRzID0gW2B1cCAke3JlcG99YCwgXCItLXdhaXRcIl07XG4gIGlmIChuYW1lKSBjbWRQYXJ0cy5wdXNoKGAtLW5hbWUgXCIke25hbWV9XCJgKTtcbiAgaWYgKGZsYWdzKSBjbWRQYXJ0cy5wdXNoKGZsYWdzKTtcblxuICBjb25zdCBjb21tYW5kID0gY21kUGFydHMuam9pbihcIiBcIik7XG4gIGNvbnN0IGNyZWF0ZSA9IChhd2FpdCBzcGluQ29tbWFuZChjb21tYW5kKSkuc3Rkb3V0O1xuICBjb25zdCBjcmVhdGVDb250ZW50OiBTcGluQ3JlYXRlUmVzcG9uc2UgPSBKU09OLnBhcnNlKGNyZWF0ZSk7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNyZWF0ZUNvbnRlbnQpKTtcblxuICByZXR1cm4gY3JlYXRlQ29udGVudDtcbn1cblxuaW50ZXJmYWNlIFN0YXR1c1Jlc3BvbnNlIHtcbiAgc3RhdHVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzcGluU2VydmljZVN0YXR1cyhzcGluOiBTcGluVHlwZXMsIHNlcnZpY2U6IFNlcnZpY2VUeXBlcykge1xuICBsZXQgc3RhdGUgPSBTZXJ2aWNlU3RhdGUuVW5rbm93bjtcbiAgLy8gaHR0cHM6Ly9zcGlubmVyYW1hLihmcWRuKS9hcGkvdjEvc291cmNlL2xpc3QgZm9yIGxpc3Qgb2Ygc2VydmljZXNcbiAgLy8gaHR0cHM6Ly9zcGlubmVyYW1hLihmcWRuKS9hcGkvdjEvc291cmNlL3N0YXR1cz9uYW1lPShzZXJ2aWNlKSBmb3Igc3RhdHVzIG9mIHNlcnZpY2VcbiAgY29uc3Qgc3RhdHVzVXJsID0gYGh0dHBzOi8vc3Bpbm5lcmFtYS4ke3NwaW4uZnFkbn0vYXBpL3YxL3NvdXJjZS9zdGF0dXM/bmFtZT0ke3NlcnZpY2Uuc2x1Zy5yZXBvfWA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzdGF0dXNSZXNwb25zZSA9IChhd2FpdCAoYXdhaXQgZmV0Y2hVbmF1dGhvcml6ZWQoc3RhdHVzVXJsKSkuanNvbigpKSBhcyBTdGF0dXNSZXNwb25zZTtcbiAgICBpZiAoc3RhdHVzUmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICBjb25zdCB2YWxpZFN0YXRlcyA9IE9iamVjdC52YWx1ZXMoU2VydmljZVN0YXRlKTtcbiAgICAgIGlmICh2YWxpZFN0YXRlcy5pbmNsdWRlcyhzdGF0dXNSZXNwb25zZS5zdGF0dXMgYXMgU2VydmljZVN0YXRlKSkgc3RhdGUgPSBzdGF0dXNSZXNwb25zZS5zdGF0dXMgYXMgU2VydmljZVN0YXRlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKGUpO1xuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cbiIsICIvKipcbiAqIEluZGV4LmpzXG4gKlxuICogYSByZXF1ZXN0IEFQSSBjb21wYXRpYmxlIHdpdGggd2luZG93LmZldGNoXG4gKlxuICogQWxsIHNwZWMgYWxnb3JpdGhtIHN0ZXAgbnVtYmVycyBhcmUgYmFzZWQgb24gaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvY29tbWl0LXNuYXBzaG90cy9hZTcxNjgyMmNiM2E2MTg0MzIyNmNkMDkwZWVmYzY1ODk0NDZjMWQyLy5cbiAqL1xuXG5pbXBvcnQgaHR0cCBmcm9tICdub2RlOmh0dHAnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ25vZGU6aHR0cHMnO1xuaW1wb3J0IHpsaWIgZnJvbSAnbm9kZTp6bGliJztcbmltcG9ydCBTdHJlYW0sIHtQYXNzVGhyb3VnaCwgcGlwZWxpbmUgYXMgcHVtcH0gZnJvbSAnbm9kZTpzdHJlYW0nO1xuaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ25vZGU6YnVmZmVyJztcblxuaW1wb3J0IGRhdGFVcmlUb0J1ZmZlciBmcm9tICdkYXRhLXVyaS10by1idWZmZXInO1xuXG5pbXBvcnQge3dyaXRlVG9TdHJlYW0sIGNsb25lfSBmcm9tICcuL2JvZHkuanMnO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vcmVzcG9uc2UuanMnO1xuaW1wb3J0IEhlYWRlcnMsIHtmcm9tUmF3SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzLmpzJztcbmltcG9ydCBSZXF1ZXN0LCB7Z2V0Tm9kZVJlcXVlc3RPcHRpb25zfSBmcm9tICcuL3JlcXVlc3QuanMnO1xuaW1wb3J0IHtGZXRjaEVycm9yfSBmcm9tICcuL2Vycm9ycy9mZXRjaC1lcnJvci5qcyc7XG5pbXBvcnQge0Fib3J0RXJyb3J9IGZyb20gJy4vZXJyb3JzL2Fib3J0LWVycm9yLmpzJztcbmltcG9ydCB7aXNSZWRpcmVjdH0gZnJvbSAnLi91dGlscy9pcy1yZWRpcmVjdC5qcyc7XG5pbXBvcnQge0Zvcm1EYXRhfSBmcm9tICdmb3JtZGF0YS1wb2x5ZmlsbC9lc20ubWluLmpzJztcbmltcG9ydCB7aXNEb21haW5PclN1YmRvbWFpbiwgaXNTYW1lUHJvdG9jb2x9IGZyb20gJy4vdXRpbHMvaXMuanMnO1xuaW1wb3J0IHtwYXJzZVJlZmVycmVyUG9saWN5RnJvbUhlYWRlcn0gZnJvbSAnLi91dGlscy9yZWZlcnJlci5qcyc7XG5pbXBvcnQge1xuXHRCbG9iLFxuXHRGaWxlLFxuXHRmaWxlRnJvbVN5bmMsXG5cdGZpbGVGcm9tLFxuXHRibG9iRnJvbVN5bmMsXG5cdGJsb2JGcm9tXG59IGZyb20gJ2ZldGNoLWJsb2IvZnJvbS5qcyc7XG5cbmV4cG9ydCB7Rm9ybURhdGEsIEhlYWRlcnMsIFJlcXVlc3QsIFJlc3BvbnNlLCBGZXRjaEVycm9yLCBBYm9ydEVycm9yLCBpc1JlZGlyZWN0fTtcbmV4cG9ydCB7QmxvYiwgRmlsZSwgZmlsZUZyb21TeW5jLCBmaWxlRnJvbSwgYmxvYkZyb21TeW5jLCBibG9iRnJvbX07XG5cbmNvbnN0IHN1cHBvcnRlZFNjaGVtYXMgPSBuZXcgU2V0KFsnZGF0YTonLCAnaHR0cDonLCAnaHR0cHM6J10pO1xuXG4vKipcbiAqIEZldGNoIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICAge3N0cmluZyB8IFVSTCB8IGltcG9ydCgnLi9yZXF1ZXN0JykuZGVmYXVsdH0gdXJsIC0gQWJzb2x1dGUgdXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsqfSBbb3B0aW9uc19dIC0gRmV0Y2ggb3B0aW9uc1xuICogQHJldHVybiAge1Byb21pc2U8aW1wb3J0KCcuL3Jlc3BvbnNlJykuZGVmYXVsdD59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGZldGNoKHVybCwgb3B0aW9uc18pIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHQvLyBCdWlsZCByZXF1ZXN0IG9iamVjdFxuXHRcdGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIG9wdGlvbnNfKTtcblx0XHRjb25zdCB7cGFyc2VkVVJMLCBvcHRpb25zfSA9IGdldE5vZGVSZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0KTtcblx0XHRpZiAoIXN1cHBvcnRlZFNjaGVtYXMuaGFzKHBhcnNlZFVSTC5wcm90b2NvbCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYG5vZGUtZmV0Y2ggY2Fubm90IGxvYWQgJHt1cmx9LiBVUkwgc2NoZW1lIFwiJHtwYXJzZWRVUkwucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJyl9XCIgaXMgbm90IHN1cHBvcnRlZC5gKTtcblx0XHR9XG5cblx0XHRpZiAocGFyc2VkVVJMLnByb3RvY29sID09PSAnZGF0YTonKSB7XG5cdFx0XHRjb25zdCBkYXRhID0gZGF0YVVyaVRvQnVmZmVyKHJlcXVlc3QudXJsKTtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGRhdGEsIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6IGRhdGEudHlwZUZ1bGx9fSk7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBXcmFwIGh0dHAucmVxdWVzdCBpbnRvIGZldGNoXG5cdFx0Y29uc3Qgc2VuZCA9IChwYXJzZWRVUkwucHJvdG9jb2wgPT09ICdodHRwczonID8gaHR0cHMgOiBodHRwKS5yZXF1ZXN0O1xuXHRcdGNvbnN0IHtzaWduYWx9ID0gcmVxdWVzdDtcblx0XHRsZXQgcmVzcG9uc2UgPSBudWxsO1xuXG5cdFx0Y29uc3QgYWJvcnQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBlcnJvciA9IG5ldyBBYm9ydEVycm9yKCdUaGUgb3BlcmF0aW9uIHdhcyBhYm9ydGVkLicpO1xuXHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdGlmIChyZXF1ZXN0LmJvZHkgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgU3RyZWFtLlJlYWRhYmxlKSB7XG5cdFx0XHRcdHJlcXVlc3QuYm9keS5kZXN0cm95KGVycm9yKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFyZXNwb25zZSB8fCAhcmVzcG9uc2UuYm9keSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJlc3BvbnNlLmJvZHkuZW1pdCgnZXJyb3InLCBlcnJvcik7XG5cdFx0fTtcblxuXHRcdGlmIChzaWduYWwgJiYgc2lnbmFsLmFib3J0ZWQpIHtcblx0XHRcdGFib3J0KCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWJvcnRBbmRGaW5hbGl6ZSA9ICgpID0+IHtcblx0XHRcdGFib3J0KCk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH07XG5cblx0XHQvLyBTZW5kIHJlcXVlc3Rcblx0XHRjb25zdCByZXF1ZXN0XyA9IHNlbmQocGFyc2VkVVJMLnRvU3RyaW5nKCksIG9wdGlvbnMpO1xuXG5cdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0c2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZmluYWxpemUgPSAoKSA9PiB7XG5cdFx0XHRyZXF1ZXN0Xy5hYm9ydCgpO1xuXHRcdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0XHRzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmVxdWVzdF8ub24oJ2Vycm9yJywgZXJyb3IgPT4ge1xuXHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGByZXF1ZXN0IHRvICR7cmVxdWVzdC51cmx9IGZhaWxlZCwgcmVhc29uOiAke2Vycm9yLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycm9yKSk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH0pO1xuXG5cdFx0Zml4UmVzcG9uc2VDaHVua2VkVHJhbnNmZXJCYWRFbmRpbmcocmVxdWVzdF8sIGVycm9yID0+IHtcblx0XHRcdGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5ib2R5KSB7XG5cdFx0XHRcdHJlc3BvbnNlLmJvZHkuZGVzdHJveShlcnJvcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKiBjOCBpZ25vcmUgbmV4dCAxOCAqL1xuXHRcdGlmIChwcm9jZXNzLnZlcnNpb24gPCAndjE0Jykge1xuXHRcdFx0Ly8gQmVmb3JlIE5vZGUuanMgMTQsIHBpcGVsaW5lKCkgZG9lcyBub3QgZnVsbHkgc3VwcG9ydCBhc3luYyBpdGVyYXRvcnMgYW5kIGRvZXMgbm90IGFsd2F5c1xuXHRcdFx0Ly8gcHJvcGVybHkgaGFuZGxlIHdoZW4gdGhlIHNvY2tldCBjbG9zZS9lbmQgZXZlbnRzIGFyZSBvdXQgb2Ygb3JkZXIuXG5cdFx0XHRyZXF1ZXN0Xy5vbignc29ja2V0JywgcyA9PiB7XG5cdFx0XHRcdGxldCBlbmRlZFdpdGhFdmVudHNDb3VudDtcblx0XHRcdFx0cy5wcmVwZW5kTGlzdGVuZXIoJ2VuZCcsICgpID0+IHtcblx0XHRcdFx0XHRlbmRlZFdpdGhFdmVudHNDb3VudCA9IHMuX2V2ZW50c0NvdW50O1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cy5wcmVwZW5kTGlzdGVuZXIoJ2Nsb3NlJywgaGFkRXJyb3IgPT4ge1xuXHRcdFx0XHRcdC8vIGlmIGVuZCBoYXBwZW5lZCBiZWZvcmUgY2xvc2UgYnV0IHRoZSBzb2NrZXQgZGlkbid0IGVtaXQgYW4gZXJyb3IsIGRvIGl0IG5vd1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZSAmJiBlbmRlZFdpdGhFdmVudHNDb3VudCA8IHMuX2V2ZW50c0NvdW50ICYmICFoYWRFcnJvcikge1xuXHRcdFx0XHRcdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoJ1ByZW1hdHVyZSBjbG9zZScpO1xuXHRcdFx0XHRcdFx0ZXJyb3IuY29kZSA9ICdFUlJfU1RSRUFNX1BSRU1BVFVSRV9DTE9TRSc7XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5ib2R5LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXF1ZXN0Xy5vbigncmVzcG9uc2UnLCByZXNwb25zZV8gPT4ge1xuXHRcdFx0cmVxdWVzdF8uc2V0VGltZW91dCgwKTtcblx0XHRcdGNvbnN0IGhlYWRlcnMgPSBmcm9tUmF3SGVhZGVycyhyZXNwb25zZV8ucmF3SGVhZGVycyk7XG5cblx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1XG5cdFx0XHRpZiAoaXNSZWRpcmVjdChyZXNwb25zZV8uc3RhdHVzQ29kZSkpIHtcblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuMlxuXHRcdFx0XHRjb25zdCBsb2NhdGlvbiA9IGhlYWRlcnMuZ2V0KCdMb2NhdGlvbicpO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjNcblx0XHRcdFx0bGV0IGxvY2F0aW9uVVJMID0gbnVsbDtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRsb2NhdGlvblVSTCA9IGxvY2F0aW9uID09PSBudWxsID8gbnVsbCA6IG5ldyBVUkwobG9jYXRpb24sIHJlcXVlc3QudXJsKTtcblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0Ly8gZXJyb3IgaGVyZSBjYW4gb25seSBiZSBpbnZhbGlkIFVSTCBpbiBMb2NhdGlvbjogaGVhZGVyXG5cdFx0XHRcdFx0Ly8gZG8gbm90IHRocm93IHdoZW4gb3B0aW9ucy5yZWRpcmVjdCA9PSBtYW51YWxcblx0XHRcdFx0XHQvLyBsZXQgdGhlIHVzZXIgZXh0cmFjdCB0aGUgZXJyb3JuZW91cyByZWRpcmVjdCBVUkxcblx0XHRcdFx0XHRpZiAocmVxdWVzdC5yZWRpcmVjdCAhPT0gJ21hbnVhbCcpIHtcblx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgdXJpIHJlcXVlc3RlZCByZXNwb25kcyB3aXRoIGFuIGludmFsaWQgcmVkaXJlY3QgVVJMOiAke2xvY2F0aW9ufWAsICdpbnZhbGlkLXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS41XG5cdFx0XHRcdHN3aXRjaCAocmVxdWVzdC5yZWRpcmVjdCkge1xuXHRcdFx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgdXJpIHJlcXVlc3RlZCByZXNwb25kcyB3aXRoIGEgcmVkaXJlY3QsIHJlZGlyZWN0IG1vZGUgaXMgc2V0IHRvIGVycm9yOiAke3JlcXVlc3QudXJsfWAsICduby1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0Y2FzZSAnbWFudWFsJzpcblx0XHRcdFx0XHRcdC8vIE5vdGhpbmcgdG8gZG9cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2ZvbGxvdyc6IHtcblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAyXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA1XG5cdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5jb3VudGVyID49IHJlcXVlc3QuZm9sbG93KSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgbWF4aW11bSByZWRpcmVjdCByZWFjaGVkIGF0OiAke3JlcXVlc3QudXJsfWAsICdtYXgtcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDYgKGNvdW50ZXIgaW5jcmVtZW50KVxuXHRcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IFJlcXVlc3Qgb2JqZWN0LlxuXHRcdFx0XHRcdFx0Y29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHJlcXVlc3QuaGVhZGVycyksXG5cdFx0XHRcdFx0XHRcdGZvbGxvdzogcmVxdWVzdC5mb2xsb3csXG5cdFx0XHRcdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlciArIDEsXG5cdFx0XHRcdFx0XHRcdGFnZW50OiByZXF1ZXN0LmFnZW50LFxuXHRcdFx0XHRcdFx0XHRjb21wcmVzczogcmVxdWVzdC5jb21wcmVzcyxcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0Ym9keTogY2xvbmUocmVxdWVzdCksXG5cdFx0XHRcdFx0XHRcdHNpZ25hbDogcmVxdWVzdC5zaWduYWwsXG5cdFx0XHRcdFx0XHRcdHNpemU6IHJlcXVlc3Quc2l6ZSxcblx0XHRcdFx0XHRcdFx0cmVmZXJyZXI6IHJlcXVlc3QucmVmZXJyZXIsXG5cdFx0XHRcdFx0XHRcdHJlZmVycmVyUG9saWN5OiByZXF1ZXN0LnJlZmVycmVyUG9saWN5XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHQvLyB3aGVuIGZvcndhcmRpbmcgc2Vuc2l0aXZlIGhlYWRlcnMgbGlrZSBcIkF1dGhvcml6YXRpb25cIixcblx0XHRcdFx0XHRcdC8vIFwiV1dXLUF1dGhlbnRpY2F0ZVwiLCBhbmQgXCJDb29raWVcIiB0byB1bnRydXN0ZWQgdGFyZ2V0cyxcblx0XHRcdFx0XHRcdC8vIGhlYWRlcnMgd2lsbCBiZSBpZ25vcmVkIHdoZW4gZm9sbG93aW5nIGEgcmVkaXJlY3QgdG8gYSBkb21haW5cblx0XHRcdFx0XHRcdC8vIHRoYXQgaXMgbm90IGEgc3ViZG9tYWluIG1hdGNoIG9yIGV4YWN0IG1hdGNoIG9mIHRoZSBpbml0aWFsIGRvbWFpbi5cblx0XHRcdFx0XHRcdC8vIEZvciBleGFtcGxlLCBhIHJlZGlyZWN0IGZyb20gXCJmb28uY29tXCIgdG8gZWl0aGVyIFwiZm9vLmNvbVwiIG9yIFwic3ViLmZvby5jb21cIlxuXHRcdFx0XHRcdFx0Ly8gd2lsbCBmb3J3YXJkIHRoZSBzZW5zaXRpdmUgaGVhZGVycywgYnV0IGEgcmVkaXJlY3QgdG8gXCJiYXIuY29tXCIgd2lsbCBub3QuXG5cdFx0XHRcdFx0XHQvLyBoZWFkZXJzIHdpbGwgYWxzbyBiZSBpZ25vcmVkIHdoZW4gZm9sbG93aW5nIGEgcmVkaXJlY3QgdG8gYSBkb21haW4gdXNpbmdcblx0XHRcdFx0XHRcdC8vIGEgZGlmZmVyZW50IHByb3RvY29sLiBGb3IgZXhhbXBsZSwgYSByZWRpcmVjdCBmcm9tIFwiaHR0cHM6Ly9mb28uY29tXCIgdG8gXCJodHRwOi8vZm9vLmNvbVwiXG5cdFx0XHRcdFx0XHQvLyB3aWxsIG5vdCBmb3J3YXJkIHRoZSBzZW5zaXRpdmUgaGVhZGVyc1xuXHRcdFx0XHRcdFx0aWYgKCFpc0RvbWFpbk9yU3ViZG9tYWluKHJlcXVlc3QudXJsLCBsb2NhdGlvblVSTCkgfHwgIWlzU2FtZVByb3RvY29sKHJlcXVlc3QudXJsLCBsb2NhdGlvblVSTCkpIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCBuYW1lIG9mIFsnYXV0aG9yaXphdGlvbicsICd3d3ctYXV0aGVudGljYXRlJywgJ2Nvb2tpZScsICdjb29raWUyJ10pIHtcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5oZWFkZXJzLmRlbGV0ZShuYW1lKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgOVxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlXy5zdGF0dXNDb2RlICE9PSAzMDMgJiYgcmVxdWVzdC5ib2R5ICYmIG9wdGlvbnNfLmJvZHkgaW5zdGFuY2VvZiBTdHJlYW0uUmVhZGFibGUpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKCdDYW5ub3QgZm9sbG93IHJlZGlyZWN0IHdpdGggYm9keSBiZWluZyBhIHJlYWRhYmxlIHN0cmVhbScsICd1bnN1cHBvcnRlZC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTFcblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMzAzIHx8ICgocmVzcG9uc2VfLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMzAyKSAmJiByZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BPU1QnKSkge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5tZXRob2QgPSAnR0VUJztcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMuYm9keSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMuaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtbGVuZ3RoJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxNFxuXHRcdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2VSZWZlcnJlclBvbGljeSA9IHBhcnNlUmVmZXJyZXJQb2xpY3lGcm9tSGVhZGVyKGhlYWRlcnMpO1xuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlUmVmZXJyZXJQb2xpY3kpIHtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMucmVmZXJyZXJQb2xpY3kgPSByZXNwb25zZVJlZmVycmVyUG9saWN5O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTVcblx0XHRcdFx0XHRcdHJlc29sdmUoZmV0Y2gobmV3IFJlcXVlc3QobG9jYXRpb25VUkwsIHJlcXVlc3RPcHRpb25zKSkpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgVHlwZUVycm9yKGBSZWRpcmVjdCBvcHRpb24gJyR7cmVxdWVzdC5yZWRpcmVjdH0nIGlzIG5vdCBhIHZhbGlkIHZhbHVlIG9mIFJlcXVlc3RSZWRpcmVjdGApKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBQcmVwYXJlIHJlc3BvbnNlXG5cdFx0XHRpZiAoc2lnbmFsKSB7XG5cdFx0XHRcdHJlc3BvbnNlXy5vbmNlKCdlbmQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0c2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgYm9keSA9IHB1bXAocmVzcG9uc2VfLCBuZXcgUGFzc1Rocm91Z2goKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvcHVsbC8yOTM3NlxuXHRcdFx0LyogYzggaWdub3JlIG5leHQgMyAqL1xuXHRcdFx0aWYgKHByb2Nlc3MudmVyc2lvbiA8ICd2MTIuMTAnKSB7XG5cdFx0XHRcdHJlc3BvbnNlXy5vbignYWJvcnRlZCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCByZXNwb25zZU9wdGlvbnMgPSB7XG5cdFx0XHRcdHVybDogcmVxdWVzdC51cmwsXG5cdFx0XHRcdHN0YXR1czogcmVzcG9uc2VfLnN0YXR1c0NvZGUsXG5cdFx0XHRcdHN0YXR1c1RleHQ6IHJlc3BvbnNlXy5zdGF0dXNNZXNzYWdlLFxuXHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRzaXplOiByZXF1ZXN0LnNpemUsXG5cdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlcixcblx0XHRcdFx0aGlnaFdhdGVyTWFyazogcmVxdWVzdC5oaWdoV2F0ZXJNYXJrXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuM1xuXHRcdFx0Y29uc3QgY29kaW5ncyA9IGhlYWRlcnMuZ2V0KCdDb250ZW50LUVuY29kaW5nJyk7XG5cblx0XHRcdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDEyLjEuMS40OiBoYW5kbGUgY29udGVudCBjb2RpbmdzXG5cblx0XHRcdC8vIGluIGZvbGxvd2luZyBzY2VuYXJpb3Mgd2UgaWdub3JlIGNvbXByZXNzaW9uIHN1cHBvcnRcblx0XHRcdC8vIDEuIGNvbXByZXNzaW9uIHN1cHBvcnQgaXMgZGlzYWJsZWRcblx0XHRcdC8vIDIuIEhFQUQgcmVxdWVzdFxuXHRcdFx0Ly8gMy4gbm8gQ29udGVudC1FbmNvZGluZyBoZWFkZXJcblx0XHRcdC8vIDQuIG5vIGNvbnRlbnQgcmVzcG9uc2UgKDIwNClcblx0XHRcdC8vIDUuIGNvbnRlbnQgbm90IG1vZGlmaWVkIHJlc3BvbnNlICgzMDQpXG5cdFx0XHRpZiAoIXJlcXVlc3QuY29tcHJlc3MgfHwgcmVxdWVzdC5tZXRob2QgPT09ICdIRUFEJyB8fCBjb2RpbmdzID09PSBudWxsIHx8IHJlc3BvbnNlXy5zdGF0dXNDb2RlID09PSAyMDQgfHwgcmVzcG9uc2VfLnN0YXR1c0NvZGUgPT09IDMwNCkge1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZU9wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3IgTm9kZSB2Nitcblx0XHRcdC8vIEJlIGxlc3Mgc3RyaWN0IHdoZW4gZGVjb2RpbmcgY29tcHJlc3NlZCByZXNwb25zZXMsIHNpbmNlIHNvbWV0aW1lc1xuXHRcdFx0Ly8gc2VydmVycyBzZW5kIHNsaWdodGx5IGludmFsaWQgcmVzcG9uc2VzIHRoYXQgYXJlIHN0aWxsIGFjY2VwdGVkXG5cdFx0XHQvLyBieSBjb21tb24gYnJvd3NlcnMuXG5cdFx0XHQvLyBBbHdheXMgdXNpbmcgWl9TWU5DX0ZMVVNIIGlzIHdoYXQgY1VSTCBkb2VzLlxuXHRcdFx0Y29uc3QgemxpYk9wdGlvbnMgPSB7XG5cdFx0XHRcdGZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSCxcblx0XHRcdFx0ZmluaXNoRmx1c2g6IHpsaWIuWl9TWU5DX0ZMVVNIXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBGb3IgZ3ppcFxuXHRcdFx0aWYgKGNvZGluZ3MgPT09ICdnemlwJyB8fCBjb2RpbmdzID09PSAneC1nemlwJykge1xuXHRcdFx0XHRib2R5ID0gcHVtcChib2R5LCB6bGliLmNyZWF0ZUd1bnppcCh6bGliT3B0aW9ucyksIGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIGRlZmxhdGVcblx0XHRcdGlmIChjb2RpbmdzID09PSAnZGVmbGF0ZScgfHwgY29kaW5ncyA9PT0gJ3gtZGVmbGF0ZScpIHtcblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBpbmZhbW91cyByYXcgZGVmbGF0ZSByZXNwb25zZSBmcm9tIG9sZCBzZXJ2ZXJzXG5cdFx0XHRcdC8vIGEgaGFjayBmb3Igb2xkIElJUyBhbmQgQXBhY2hlIHNlcnZlcnNcblx0XHRcdFx0Y29uc3QgcmF3ID0gcHVtcChyZXNwb25zZV8sIG5ldyBQYXNzVGhyb3VnaCgpLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJhdy5vbmNlKCdkYXRhJywgY2h1bmsgPT4ge1xuXHRcdFx0XHRcdC8vIFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTE5ODI4XG5cdFx0XHRcdFx0aWYgKChjaHVua1swXSAmIDB4MEYpID09PSAweDA4KSB7XG5cdFx0XHRcdFx0XHRib2R5ID0gcHVtcChib2R5LCB6bGliLmNyZWF0ZUluZmxhdGUoKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ym9keSA9IHB1bXAoYm9keSwgemxpYi5jcmVhdGVJbmZsYXRlUmF3KCksIGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJhdy5vbmNlKCdlbmQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gU29tZSBvbGQgSUlTIHNlcnZlcnMgcmV0dXJuIHplcm8tbGVuZ3RoIE9LIGRlZmxhdGUgcmVzcG9uc2VzLCBzb1xuXHRcdFx0XHRcdC8vICdkYXRhJyBpcyBuZXZlciBlbWl0dGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL25vZGUtZmV0Y2gvbm9kZS1mZXRjaC9wdWxsLzkwM1xuXHRcdFx0XHRcdGlmICghcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlT3B0aW9ucyk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBiclxuXHRcdFx0aWYgKGNvZGluZ3MgPT09ICdicicpIHtcblx0XHRcdFx0Ym9keSA9IHB1bXAoYm9keSwgemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzKCksIGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCB1c2UgcmVzcG9uc2UgYXMtaXNcblx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlT3B0aW9ucyk7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHR9KTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by10aGVuXG5cdFx0d3JpdGVUb1N0cmVhbShyZXF1ZXN0XywgcmVxdWVzdCkuY2F0Y2gocmVqZWN0KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGZpeFJlc3BvbnNlQ2h1bmtlZFRyYW5zZmVyQmFkRW5kaW5nKHJlcXVlc3QsIGVycm9yQ2FsbGJhY2spIHtcblx0Y29uc3QgTEFTVF9DSFVOSyA9IEJ1ZmZlci5mcm9tKCcwXFxyXFxuXFxyXFxuJyk7XG5cblx0bGV0IGlzQ2h1bmtlZFRyYW5zZmVyID0gZmFsc2U7XG5cdGxldCBwcm9wZXJMYXN0Q2h1bmtSZWNlaXZlZCA9IGZhbHNlO1xuXHRsZXQgcHJldmlvdXNDaHVuaztcblxuXHRyZXF1ZXN0Lm9uKCdyZXNwb25zZScsIHJlc3BvbnNlID0+IHtcblx0XHRjb25zdCB7aGVhZGVyc30gPSByZXNwb25zZTtcblx0XHRpc0NodW5rZWRUcmFuc2ZlciA9IGhlYWRlcnNbJ3RyYW5zZmVyLWVuY29kaW5nJ10gPT09ICdjaHVua2VkJyAmJiAhaGVhZGVyc1snY29udGVudC1sZW5ndGgnXTtcblx0fSk7XG5cblx0cmVxdWVzdC5vbignc29ja2V0Jywgc29ja2V0ID0+IHtcblx0XHRjb25zdCBvblNvY2tldENsb3NlID0gKCkgPT4ge1xuXHRcdFx0aWYgKGlzQ2h1bmtlZFRyYW5zZmVyICYmICFwcm9wZXJMYXN0Q2h1bmtSZWNlaXZlZCkge1xuXHRcdFx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcignUHJlbWF0dXJlIGNsb3NlJyk7XG5cdFx0XHRcdGVycm9yLmNvZGUgPSAnRVJSX1NUUkVBTV9QUkVNQVRVUkVfQ0xPU0UnO1xuXHRcdFx0XHRlcnJvckNhbGxiYWNrKGVycm9yKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Y29uc3Qgb25EYXRhID0gYnVmID0+IHtcblx0XHRcdHByb3Blckxhc3RDaHVua1JlY2VpdmVkID0gQnVmZmVyLmNvbXBhcmUoYnVmLnNsaWNlKC01KSwgTEFTVF9DSFVOSykgPT09IDA7XG5cblx0XHRcdC8vIFNvbWV0aW1lcyBmaW5hbCAwLWxlbmd0aCBjaHVuayBhbmQgZW5kIG9mIG1lc3NhZ2UgY29kZSBhcmUgaW4gc2VwYXJhdGUgcGFja2V0c1xuXHRcdFx0aWYgKCFwcm9wZXJMYXN0Q2h1bmtSZWNlaXZlZCAmJiBwcmV2aW91c0NodW5rKSB7XG5cdFx0XHRcdHByb3Blckxhc3RDaHVua1JlY2VpdmVkID0gKFxuXHRcdFx0XHRcdEJ1ZmZlci5jb21wYXJlKHByZXZpb3VzQ2h1bmsuc2xpY2UoLTMpLCBMQVNUX0NIVU5LLnNsaWNlKDAsIDMpKSA9PT0gMCAmJlxuXHRcdFx0XHRcdEJ1ZmZlci5jb21wYXJlKGJ1Zi5zbGljZSgtMiksIExBU1RfQ0hVTksuc2xpY2UoMykpID09PSAwXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHByZXZpb3VzQ2h1bmsgPSBidWY7XG5cdFx0fTtcblxuXHRcdHNvY2tldC5wcmVwZW5kTGlzdGVuZXIoJ2Nsb3NlJywgb25Tb2NrZXRDbG9zZSk7XG5cdFx0c29ja2V0Lm9uKCdkYXRhJywgb25EYXRhKTtcblxuXHRcdHJlcXVlc3Qub24oJ2Nsb3NlJywgKCkgPT4ge1xuXHRcdFx0c29ja2V0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uU29ja2V0Q2xvc2UpO1xuXHRcdFx0c29ja2V0LnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgb25EYXRhKTtcblx0XHR9KTtcblx0fSk7XG59XG4iLCBudWxsLCAiXG4vKipcbiAqIEJvZHkuanNcbiAqXG4gKiBCb2R5IGludGVyZmFjZSBwcm92aWRlcyBjb21tb24gbWV0aG9kcyBmb3IgUmVxdWVzdCBhbmQgUmVzcG9uc2VcbiAqL1xuXG5pbXBvcnQgU3RyZWFtLCB7UGFzc1Rocm91Z2h9IGZyb20gJ25vZGU6c3RyZWFtJztcbmltcG9ydCB7dHlwZXMsIGRlcHJlY2F0ZSwgcHJvbWlzaWZ5fSBmcm9tICdub2RlOnV0aWwnO1xuaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ25vZGU6YnVmZmVyJztcblxuaW1wb3J0IEJsb2IgZnJvbSAnZmV0Y2gtYmxvYic7XG5pbXBvcnQge0Zvcm1EYXRhLCBmb3JtRGF0YVRvQmxvYn0gZnJvbSAnZm9ybWRhdGEtcG9seWZpbGwvZXNtLm1pbi5qcyc7XG5cbmltcG9ydCB7RmV0Y2hFcnJvcn0gZnJvbSAnLi9lcnJvcnMvZmV0Y2gtZXJyb3IuanMnO1xuaW1wb3J0IHtGZXRjaEJhc2VFcnJvcn0gZnJvbSAnLi9lcnJvcnMvYmFzZS5qcyc7XG5pbXBvcnQge2lzQmxvYiwgaXNVUkxTZWFyY2hQYXJhbWV0ZXJzfSBmcm9tICcuL3V0aWxzL2lzLmpzJztcblxuY29uc3QgcGlwZWxpbmUgPSBwcm9taXNpZnkoU3RyZWFtLnBpcGVsaW5lKTtcbmNvbnN0IElOVEVSTkFMUyA9IFN5bWJvbCgnQm9keSBpbnRlcm5hbHMnKTtcblxuLyoqXG4gKiBCb2R5IG1peGluXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jYm9keVxuICpcbiAqIEBwYXJhbSAgIFN0cmVhbSAgYm9keSAgUmVhZGFibGUgc3RyZWFtXG4gKiBAcGFyYW0gICBPYmplY3QgIG9wdHMgIFJlc3BvbnNlIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9keSB7XG5cdGNvbnN0cnVjdG9yKGJvZHksIHtcblx0XHRzaXplID0gMFxuXHR9ID0ge30pIHtcblx0XHRsZXQgYm91bmRhcnkgPSBudWxsO1xuXG5cdFx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHRcdC8vIEJvZHkgaXMgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRcdGJvZHkgPSBudWxsO1xuXHRcdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbWV0ZXJzKGJvZHkpKSB7XG5cdFx0XHQvLyBCb2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS50b1N0cmluZygpKTtcblx0XHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdFx0Ly8gQm9keSBpcyBibG9iXG5cdFx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHRcdC8vIEJvZHkgaXMgQnVmZmVyXG5cdFx0fSBlbHNlIGlmICh0eXBlcy5pc0FueUFycmF5QnVmZmVyKGJvZHkpKSB7XG5cdFx0XHQvLyBCb2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keSk7XG5cdFx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoYm9keSkpIHtcblx0XHRcdC8vIEJvZHkgaXMgQXJyYXlCdWZmZXJWaWV3XG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS5idWZmZXIsIGJvZHkuYnl0ZU9mZnNldCwgYm9keS5ieXRlTGVuZ3RoKTtcblx0XHR9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcblx0XHRcdC8vIEJvZHkgaXMgc3RyZWFtXG5cdFx0fSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcblx0XHRcdC8vIEJvZHkgaXMgRm9ybURhdGFcblx0XHRcdGJvZHkgPSBmb3JtRGF0YVRvQmxvYihib2R5KTtcblx0XHRcdGJvdW5kYXJ5ID0gYm9keS50eXBlLnNwbGl0KCc9JylbMV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIE5vbmUgb2YgdGhlIGFib3ZlXG5cdFx0XHQvLyBjb2VyY2UgdG8gc3RyaW5nIHRoZW4gYnVmZmVyXG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oU3RyaW5nKGJvZHkpKTtcblx0XHR9XG5cblx0XHRsZXQgc3RyZWFtID0gYm9keTtcblxuXHRcdGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHRcdHN0cmVhbSA9IFN0cmVhbS5SZWFkYWJsZS5mcm9tKGJvZHkpO1xuXHRcdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0XHRzdHJlYW0gPSBTdHJlYW0uUmVhZGFibGUuZnJvbShib2R5LnN0cmVhbSgpKTtcblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMU10gPSB7XG5cdFx0XHRib2R5LFxuXHRcdFx0c3RyZWFtLFxuXHRcdFx0Ym91bmRhcnksXG5cdFx0XHRkaXN0dXJiZWQ6IGZhbHNlLFxuXHRcdFx0ZXJyb3I6IG51bGxcblx0XHR9O1xuXHRcdHRoaXMuc2l6ZSA9IHNpemU7XG5cblx0XHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdFx0Ym9keS5vbignZXJyb3InLCBlcnJvcl8gPT4ge1xuXHRcdFx0XHRjb25zdCBlcnJvciA9IGVycm9yXyBpbnN0YW5jZW9mIEZldGNoQmFzZUVycm9yID9cblx0XHRcdFx0XHRlcnJvcl8gOlxuXHRcdFx0XHRcdG5ldyBGZXRjaEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGJvZHkgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7dGhpcy51cmx9OiAke2Vycm9yXy5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnJvcl8pO1xuXHRcdFx0XHR0aGlzW0lOVEVSTkFMU10uZXJyb3IgPSBlcnJvcjtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGdldCBib2R5KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uc3RyZWFtO1xuXHR9XG5cblx0Z2V0IGJvZHlVc2VkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlY29kZSByZXNwb25zZSBhcyBBcnJheUJ1ZmZlclxuXHQgKlxuXHQgKiBAcmV0dXJuICBQcm9taXNlXG5cdCAqL1xuXHRhc3luYyBhcnJheUJ1ZmZlcigpIHtcblx0XHRjb25zdCB7YnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RofSA9IGF3YWl0IGNvbnN1bWVCb2R5KHRoaXMpO1xuXHRcdHJldHVybiBidWZmZXIuc2xpY2UoYnl0ZU9mZnNldCwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGgpO1xuXHR9XG5cblx0YXN5bmMgZm9ybURhdGEoKSB7XG5cdFx0Y29uc3QgY3QgPSB0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcblxuXHRcdGlmIChjdC5zdGFydHNXaXRoKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSkge1xuXHRcdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdGNvbnN0IHBhcmFtZXRlcnMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGF3YWl0IHRoaXMudGV4dCgpKTtcblxuXHRcdFx0Zm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIHBhcmFtZXRlcnMpIHtcblx0XHRcdFx0Zm9ybURhdGEuYXBwZW5kKG5hbWUsIHZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZvcm1EYXRhO1xuXHRcdH1cblxuXHRcdGNvbnN0IHt0b0Zvcm1EYXRhfSA9IGF3YWl0IGltcG9ydCgnLi91dGlscy9tdWx0aXBhcnQtcGFyc2VyLmpzJyk7XG5cdFx0cmV0dXJuIHRvRm9ybURhdGEodGhpcy5ib2R5LCBjdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHJhdyByZXNwb25zZSBhcyBCbG9iXG5cdCAqXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxuXHQgKi9cblx0YXN5bmMgYmxvYigpIHtcblx0XHRjb25zdCBjdCA9ICh0aGlzLmhlYWRlcnMgJiYgdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHx8ICh0aGlzW0lOVEVSTkFMU10uYm9keSAmJiB0aGlzW0lOVEVSTkFMU10uYm9keS50eXBlKSB8fCAnJztcblx0XHRjb25zdCBidWYgPSBhd2FpdCB0aGlzLmFycmF5QnVmZmVyKCk7XG5cblx0XHRyZXR1cm4gbmV3IEJsb2IoW2J1Zl0sIHtcblx0XHRcdHR5cGU6IGN0XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogRGVjb2RlIHJlc3BvbnNlIGFzIGpzb25cblx0ICpcblx0ICogQHJldHVybiAgUHJvbWlzZVxuXHQgKi9cblx0YXN5bmMganNvbigpIHtcblx0XHRjb25zdCB0ZXh0ID0gYXdhaXQgdGhpcy50ZXh0KCk7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVjb2RlIHJlc3BvbnNlIGFzIHRleHRcblx0ICpcblx0ICogQHJldHVybiAgUHJvbWlzZVxuXHQgKi9cblx0YXN5bmMgdGV4dCgpIHtcblx0XHRjb25zdCBidWZmZXIgPSBhd2FpdCBjb25zdW1lQm9keSh0aGlzKTtcblx0XHRyZXR1cm4gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGJ1ZmZlcik7XG5cdH1cblxuXHQvKipcblx0ICogRGVjb2RlIHJlc3BvbnNlIGFzIGJ1ZmZlciAobm9uLXNwZWMgYXBpKVxuXHQgKlxuXHQgKiBAcmV0dXJuICBQcm9taXNlXG5cdCAqL1xuXHRidWZmZXIoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5KHRoaXMpO1xuXHR9XG59XG5cbkJvZHkucHJvdG90eXBlLmJ1ZmZlciA9IGRlcHJlY2F0ZShCb2R5LnByb3RvdHlwZS5idWZmZXIsICdQbGVhc2UgdXNlIFxcJ3Jlc3BvbnNlLmFycmF5QnVmZmVyKClcXCcgaW5zdGVhZCBvZiBcXCdyZXNwb25zZS5idWZmZXIoKVxcJycsICdub2RlLWZldGNoI2J1ZmZlcicpO1xuXG4vLyBJbiBicm93c2VycywgYWxsIHByb3BlcnRpZXMgYXJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCb2R5LnByb3RvdHlwZSwge1xuXHRib2R5OiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGJvZHlVc2VkOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGFycmF5QnVmZmVyOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGJsb2I6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0anNvbjoge2VudW1lcmFibGU6IHRydWV9LFxuXHR0ZXh0OiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGRhdGE6IHtnZXQ6IGRlcHJlY2F0ZSgoKSA9PiB7fSxcblx0XHQnZGF0YSBkb2VzblxcJ3QgZXhpc3QsIHVzZSBqc29uKCksIHRleHQoKSwgYXJyYXlCdWZmZXIoKSwgb3IgYm9keSBpbnN0ZWFkJyxcblx0XHQnaHR0cHM6Ly9naXRodWIuY29tL25vZGUtZmV0Y2gvbm9kZS1mZXRjaC9pc3N1ZXMvMTAwMCAocmVzcG9uc2UpJyl9XG59KTtcblxuLyoqXG4gKiBDb25zdW1lIGFuZCBjb252ZXJ0IGFuIGVudGlyZSBCb2R5IHRvIGEgQnVmZmVyLlxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS1jb25zdW1lLWJvZHlcbiAqXG4gKiBAcmV0dXJuIFByb21pc2VcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY29uc3VtZUJvZHkoZGF0YSkge1xuXHRpZiAoZGF0YVtJTlRFUk5BTFNdLmRpc3R1cmJlZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGJvZHkgdXNlZCBhbHJlYWR5IGZvcjogJHtkYXRhLnVybH1gKTtcblx0fVxuXG5cdGRhdGFbSU5URVJOQUxTXS5kaXN0dXJiZWQgPSB0cnVlO1xuXG5cdGlmIChkYXRhW0lOVEVSTkFMU10uZXJyb3IpIHtcblx0XHR0aHJvdyBkYXRhW0lOVEVSTkFMU10uZXJyb3I7XG5cdH1cblxuXHRjb25zdCB7Ym9keX0gPSBkYXRhO1xuXG5cdC8vIEJvZHkgaXMgbnVsbFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBCdWZmZXIuYWxsb2MoMCk7XG5cdH1cblxuXHQvKiBjOCBpZ25vcmUgbmV4dCAzICovXG5cdGlmICghKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pKSB7XG5cdFx0cmV0dXJuIEJ1ZmZlci5hbGxvYygwKTtcblx0fVxuXG5cdC8vIEJvZHkgaXMgc3RyZWFtXG5cdC8vIGdldCByZWFkeSB0byBhY3R1YWxseSBjb25zdW1lIHRoZSBib2R5XG5cdGNvbnN0IGFjY3VtID0gW107XG5cdGxldCBhY2N1bUJ5dGVzID0gMDtcblxuXHR0cnkge1xuXHRcdGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgYm9keSkge1xuXHRcdFx0aWYgKGRhdGEuc2l6ZSA+IDAgJiYgYWNjdW1CeXRlcyArIGNodW5rLmxlbmd0aCA+IGRhdGEuc2l6ZSkge1xuXHRcdFx0XHRjb25zdCBlcnJvciA9IG5ldyBGZXRjaEVycm9yKGBjb250ZW50IHNpemUgYXQgJHtkYXRhLnVybH0gb3ZlciBsaW1pdDogJHtkYXRhLnNpemV9YCwgJ21heC1zaXplJyk7XG5cdFx0XHRcdGJvZHkuZGVzdHJveShlcnJvcik7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXG5cdFx0XHRhY2N1bUJ5dGVzICs9IGNodW5rLmxlbmd0aDtcblx0XHRcdGFjY3VtLnB1c2goY2h1bmspO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zdCBlcnJvcl8gPSBlcnJvciBpbnN0YW5jZW9mIEZldGNoQmFzZUVycm9yID8gZXJyb3IgOiBuZXcgRmV0Y2hFcnJvcihgSW52YWxpZCByZXNwb25zZSBib2R5IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke2RhdGEudXJsfTogJHtlcnJvci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnJvcik7XG5cdFx0dGhyb3cgZXJyb3JfO1xuXHR9XG5cblx0aWYgKGJvZHkucmVhZGFibGVFbmRlZCA9PT0gdHJ1ZSB8fCBib2R5Ll9yZWFkYWJsZVN0YXRlLmVuZGVkID09PSB0cnVlKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChhY2N1bS5ldmVyeShjID0+IHR5cGVvZiBjID09PSAnc3RyaW5nJykpIHtcblx0XHRcdFx0cmV0dXJuIEJ1ZmZlci5mcm9tKGFjY3VtLmpvaW4oJycpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEJ1ZmZlci5jb25jYXQoYWNjdW0sIGFjY3VtQnl0ZXMpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aHJvdyBuZXcgRmV0Y2hFcnJvcihgQ291bGQgbm90IGNyZWF0ZSBCdWZmZXIgZnJvbSByZXNwb25zZSBib2R5IGZvciAke2RhdGEudXJsfTogJHtlcnJvci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnJvcik7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBGZXRjaEVycm9yKGBQcmVtYXR1cmUgY2xvc2Ugb2Ygc2VydmVyIHJlc3BvbnNlIHdoaWxlIHRyeWluZyB0byBmZXRjaCAke2RhdGEudXJsfWApO1xuXHR9XG59XG5cbi8qKlxuICogQ2xvbmUgYm9keSBnaXZlbiBSZXMvUmVxIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnN0YW5jZSAgICAgICBSZXNwb25zZSBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICBTdHJpbmcgIGhpZ2hXYXRlck1hcmsgIGhpZ2hXYXRlck1hcmsgZm9yIGJvdGggUGFzc1Rocm91Z2ggYm9keSBzdHJlYW1zXG4gKiBAcmV0dXJuICBNaXhlZFxuICovXG5leHBvcnQgY29uc3QgY2xvbmUgPSAoaW5zdGFuY2UsIGhpZ2hXYXRlck1hcmspID0+IHtcblx0bGV0IHAxO1xuXHRsZXQgcDI7XG5cdGxldCB7Ym9keX0gPSBpbnN0YW5jZVtJTlRFUk5BTFNdO1xuXG5cdC8vIERvbid0IGFsbG93IGNsb25pbmcgYSB1c2VkIGJvZHlcblx0aWYgKGluc3RhbmNlLmJvZHlVc2VkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgY2xvbmUgYm9keSBhZnRlciBpdCBpcyB1c2VkJyk7XG5cdH1cblxuXHQvLyBDaGVjayB0aGF0IGJvZHkgaXMgYSBzdHJlYW0gYW5kIG5vdCBmb3JtLWRhdGEgb2JqZWN0XG5cdC8vIG5vdGU6IHdlIGNhbid0IGNsb25lIHRoZSBmb3JtLWRhdGEgb2JqZWN0IHdpdGhvdXQgaGF2aW5nIGl0IGFzIGEgZGVwZW5kZW5jeVxuXHRpZiAoKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pICYmICh0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHQvLyBUZWUgaW5zdGFuY2UgYm9keVxuXHRcdHAxID0gbmV3IFBhc3NUaHJvdWdoKHtoaWdoV2F0ZXJNYXJrfSk7XG5cdFx0cDIgPSBuZXcgUGFzc1Rocm91Z2goe2hpZ2hXYXRlck1hcmt9KTtcblx0XHRib2R5LnBpcGUocDEpO1xuXHRcdGJvZHkucGlwZShwMik7XG5cdFx0Ly8gU2V0IGluc3RhbmNlIGJvZHkgdG8gdGVlZCBib2R5IGFuZCByZXR1cm4gdGhlIG90aGVyIHRlZWQgYm9keVxuXHRcdGluc3RhbmNlW0lOVEVSTkFMU10uc3RyZWFtID0gcDE7XG5cdFx0Ym9keSA9IHAyO1xuXHR9XG5cblx0cmV0dXJuIGJvZHk7XG59O1xuXG5jb25zdCBnZXROb25TcGVjRm9ybURhdGFCb3VuZGFyeSA9IGRlcHJlY2F0ZShcblx0Ym9keSA9PiBib2R5LmdldEJvdW5kYXJ5KCksXG5cdCdmb3JtLWRhdGEgZG9lc25cXCd0IGZvbGxvdyB0aGUgc3BlYyBhbmQgcmVxdWlyZXMgc3BlY2lhbCB0cmVhdG1lbnQuIFVzZSBhbHRlcm5hdGl2ZSBwYWNrYWdlJyxcblx0J2h0dHBzOi8vZ2l0aHViLmNvbS9ub2RlLWZldGNoL25vZGUtZmV0Y2gvaXNzdWVzLzExNjcnXG4pO1xuXG4vKipcbiAqIFBlcmZvcm1zIHRoZSBvcGVyYXRpb24gXCJleHRyYWN0IGEgYENvbnRlbnQtVHlwZWAgdmFsdWUgZnJvbSB8b2JqZWN0fFwiIGFzXG4gKiBzcGVjaWZpZWQgaW4gdGhlIHNwZWNpZmljYXRpb246XG4gKiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5aW5pdC1leHRyYWN0XG4gKlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgaW5zdGFuY2UuYm9keSBpcyBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7YW55fSBib2R5IEFueSBvcHRpb25zLmJvZHkgaW5wdXRcbiAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfVxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdENvbnRlbnRUeXBlID0gKGJvZHksIHJlcXVlc3QpID0+IHtcblx0Ly8gQm9keSBpcyBudWxsIG9yIHVuZGVmaW5lZFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBzdHJpbmdcblx0aWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcblx0fVxuXG5cdC8vIEJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcblx0aWYgKGlzVVJMU2VhcmNoUGFyYW1ldGVycyhib2R5KSkge1xuXHRcdHJldHVybiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBibG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRyZXR1cm4gYm9keS50eXBlIHx8IG51bGw7XG5cdH1cblxuXHQvLyBCb2R5IGlzIGEgQnVmZmVyIChCdWZmZXIsIEFycmF5QnVmZmVyIG9yIEFycmF5QnVmZmVyVmlldylcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSB8fCB0eXBlcy5pc0FueUFycmF5QnVmZmVyKGJvZHkpIHx8IEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0aWYgKGJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuXHRcdHJldHVybiBgbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9JHtyZXF1ZXN0W0lOVEVSTkFMU10uYm91bmRhcnl9YDtcblx0fVxuXG5cdC8vIERldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdGlmIChib2R5ICYmIHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGBtdWx0aXBhcnQvZm9ybS1kYXRhO2JvdW5kYXJ5PSR7Z2V0Tm9uU3BlY0Zvcm1EYXRhQm91bmRhcnkoYm9keSl9YDtcblx0fVxuXG5cdC8vIEJvZHkgaXMgc3RyZWFtIC0gY2FuJ3QgcmVhbGx5IGRvIG11Y2ggYWJvdXQgdGhpc1xuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gQm9keSBjb25zdHJ1Y3RvciBkZWZhdWx0cyBvdGhlciB0aGluZ3MgdG8gc3RyaW5nXG5cdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcbn07XG5cbi8qKlxuICogVGhlIEZldGNoIFN0YW5kYXJkIHRyZWF0cyB0aGlzIGFzIGlmIFwidG90YWwgYnl0ZXNcIiBpcyBhIHByb3BlcnR5IG9uIHRoZSBib2R5LlxuICogRm9yIHVzLCB3ZSBoYXZlIHRvIGV4cGxpY2l0bHkgZ2V0IGl0IHdpdGggYSBmdW5jdGlvbi5cbiAqXG4gKiByZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHktdG90YWwtYnl0ZXNcbiAqXG4gKiBAcGFyYW0ge2FueX0gb2JqLmJvZHkgQm9keSBvYmplY3QgZnJvbSB0aGUgQm9keSBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIHtudW1iZXIgfCBudWxsfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VG90YWxCeXRlcyA9IHJlcXVlc3QgPT4ge1xuXHRjb25zdCB7Ym9keX0gPSByZXF1ZXN0W0lOVEVSTkFMU107XG5cblx0Ly8gQm9keSBpcyBudWxsIG9yIHVuZGVmaW5lZFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBCbG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRyZXR1cm4gYm9keS5zaXplO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBCdWZmZXJcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdHJldHVybiBib2R5Lmxlbmd0aDtcblx0fVxuXG5cdC8vIERldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdGlmIChib2R5ICYmIHR5cGVvZiBib2R5LmdldExlbmd0aFN5bmMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gYm9keS5oYXNLbm93bkxlbmd0aCAmJiBib2R5Lmhhc0tub3duTGVuZ3RoKCkgPyBib2R5LmdldExlbmd0aFN5bmMoKSA6IG51bGw7XG5cdH1cblxuXHQvLyBCb2R5IGlzIHN0cmVhbVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogV3JpdGUgYSBCb2R5IHRvIGEgTm9kZS5qcyBXcml0YWJsZVN0cmVhbSAoZS5nLiBodHRwLlJlcXVlc3QpIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmVhbS5Xcml0YWJsZX0gZGVzdCBUaGUgc3RyZWFtIHRvIHdyaXRlIHRvLlxuICogQHBhcmFtIG9iai5ib2R5IEJvZHkgb2JqZWN0IGZyb20gdGhlIEJvZHkgaW5zdGFuY2UuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdyaXRlVG9TdHJlYW0gPSBhc3luYyAoZGVzdCwge2JvZHl9KSA9PiB7XG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gQm9keSBpcyBudWxsXG5cdFx0ZGVzdC5lbmQoKTtcblx0fSBlbHNlIHtcblx0XHQvLyBCb2R5IGlzIHN0cmVhbVxuXHRcdGF3YWl0IHBpcGVsaW5lKGJvZHksIGRlc3QpO1xuXHR9XG59O1xuIiwgImV4cG9ydCBjbGFzcyBGZXRjaEJhc2VFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IobWVzc2FnZSwgdHlwZSkge1xuXHRcdHN1cGVyKG1lc3NhZ2UpO1xuXHRcdC8vIEhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcblx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcblxuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXHR9XG5cblx0Z2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG5cdH1cbn1cbiIsICJcbmltcG9ydCB7RmV0Y2hCYXNlRXJyb3J9IGZyb20gJy4vYmFzZS5qcyc7XG5cbi8qKlxuICogQHR5cGVkZWYge3sgYWRkcmVzcz86IHN0cmluZywgY29kZTogc3RyaW5nLCBkZXN0Pzogc3RyaW5nLCBlcnJubzogbnVtYmVyLCBpbmZvPzogb2JqZWN0LCBtZXNzYWdlOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcsIHBvcnQ/OiBudW1iZXIsIHN5c2NhbGw6IHN0cmluZ319IFN5c3RlbUVycm9yXG4qL1xuXG4vKipcbiAqIEZldGNoRXJyb3IgaW50ZXJmYWNlIGZvciBvcGVyYXRpb25hbCBlcnJvcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEZldGNoRXJyb3IgZXh0ZW5kcyBGZXRjaEJhc2VFcnJvciB7XG5cdC8qKlxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IG1lc3NhZ2UgLSAgICAgIEVycm9yIG1lc3NhZ2UgZm9yIGh1bWFuXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gW3R5cGVdIC0gICAgICAgIEVycm9yIHR5cGUgZm9yIG1hY2hpbmVcblx0ICogQHBhcmFtICB7U3lzdGVtRXJyb3J9IFtzeXN0ZW1FcnJvcl0gLSBGb3IgTm9kZS5qcyBzeXN0ZW0gZXJyb3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHR5cGUsIHN5c3RlbUVycm9yKSB7XG5cdFx0c3VwZXIobWVzc2FnZSwgdHlwZSk7XG5cdFx0Ly8gV2hlbiBlcnIudHlwZSBpcyBgc3lzdGVtYCwgZXJyLmVycm9yZWRTeXNDYWxsIGNvbnRhaW5zIHN5c3RlbSBlcnJvciBhbmQgZXJyLmNvZGUgY29udGFpbnMgc3lzdGVtIGVycm9yIGNvZGVcblx0XHRpZiAoc3lzdGVtRXJyb3IpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1tdWx0aS1hc3NpZ25cblx0XHRcdHRoaXMuY29kZSA9IHRoaXMuZXJybm8gPSBzeXN0ZW1FcnJvci5jb2RlO1xuXHRcdFx0dGhpcy5lcnJvcmVkU3lzQ2FsbCA9IHN5c3RlbUVycm9yLnN5c2NhbGw7XG5cdFx0fVxuXHR9XG59XG4iLCAiLyoqXG4gKiBJcy5qc1xuICpcbiAqIE9iamVjdCB0eXBlIGNoZWNrcy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sLnRvU3RyaW5nVGFnO1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICogcmVmOiBodHRwczovL2dpdGh1Yi5jb20vbm9kZS1mZXRjaC9ub2RlLWZldGNoL2lzc3Vlcy8yOTYjaXNzdWVjb21tZW50LTMwNzU5ODE0M1xuICogQHBhcmFtIHsqfSBvYmplY3QgLSBPYmplY3QgdG8gY2hlY2sgZm9yXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNVUkxTZWFyY2hQYXJhbWV0ZXJzID0gb2JqZWN0ID0+IHtcblx0cmV0dXJuIChcblx0XHR0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuYXBwZW5kID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5kZWxldGUgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmdldCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuZ2V0QWxsID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5oYXMgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LnNldCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3Quc29ydCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdG9iamVjdFtOQU1FXSA9PT0gJ1VSTFNlYXJjaFBhcmFtcydcblx0KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamVjdGAgaXMgYSBXM0MgYEJsb2JgIG9iamVjdCAod2hpY2ggYEZpbGVgIGluaGVyaXRzIGZyb20pXG4gKiBAcGFyYW0geyp9IG9iamVjdCAtIE9iamVjdCB0byBjaGVjayBmb3JcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBpc0Jsb2IgPSBvYmplY3QgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdG9iamVjdCAmJlxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIG9iamVjdC5hcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QudHlwZSA9PT0gJ3N0cmluZycgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LnN0cmVhbSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiZcblx0XHQvXihCbG9ifEZpbGUpJC8udGVzdChvYmplY3RbTkFNRV0pXG5cdCk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIGluc3RhbmNlIG9mIEFib3J0U2lnbmFsLlxuICogQHBhcmFtIHsqfSBvYmplY3QgLSBPYmplY3QgdG8gY2hlY2sgZm9yXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNBYm9ydFNpZ25hbCA9IG9iamVjdCA9PiB7XG5cdHJldHVybiAoXG5cdFx0dHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgKFxuXHRcdFx0b2JqZWN0W05BTUVdID09PSAnQWJvcnRTaWduYWwnIHx8XG5cdFx0XHRvYmplY3RbTkFNRV0gPT09ICdFdmVudFRhcmdldCdcblx0XHQpXG5cdCk7XG59O1xuXG4vKipcbiAqIGlzRG9tYWluT3JTdWJkb21haW4gcmVwb3J0cyB3aGV0aGVyIHN1YiBpcyBhIHN1YmRvbWFpbiAob3IgZXhhY3QgbWF0Y2gpIG9mXG4gKiB0aGUgcGFyZW50IGRvbWFpbi5cbiAqXG4gKiBCb3RoIGRvbWFpbnMgbXVzdCBhbHJlYWR5IGJlIGluIGNhbm9uaWNhbCBmb3JtLlxuICogQHBhcmFtIHtzdHJpbmd8VVJMfSBvcmlnaW5hbFxuICogQHBhcmFtIHtzdHJpbmd8VVJMfSBkZXN0aW5hdGlvblxuICovXG5leHBvcnQgY29uc3QgaXNEb21haW5PclN1YmRvbWFpbiA9IChkZXN0aW5hdGlvbiwgb3JpZ2luYWwpID0+IHtcblx0Y29uc3Qgb3JpZyA9IG5ldyBVUkwob3JpZ2luYWwpLmhvc3RuYW1lO1xuXHRjb25zdCBkZXN0ID0gbmV3IFVSTChkZXN0aW5hdGlvbikuaG9zdG5hbWU7XG5cblx0cmV0dXJuIG9yaWcgPT09IGRlc3QgfHwgb3JpZy5lbmRzV2l0aChgLiR7ZGVzdH1gKTtcbn07XG5cbi8qKlxuICogaXNTYW1lUHJvdG9jb2wgcmVwb3J0cyB3aGV0aGVyIHRoZSB0d28gcHJvdmlkZWQgVVJMcyB1c2UgdGhlIHNhbWUgcHJvdG9jb2wuXG4gKlxuICogQm90aCBkb21haW5zIG11c3QgYWxyZWFkeSBiZSBpbiBjYW5vbmljYWwgZm9ybS5cbiAqIEBwYXJhbSB7c3RyaW5nfFVSTH0gb3JpZ2luYWxcbiAqIEBwYXJhbSB7c3RyaW5nfFVSTH0gZGVzdGluYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2FtZVByb3RvY29sID0gKGRlc3RpbmF0aW9uLCBvcmlnaW5hbCkgPT4ge1xuXHRjb25zdCBvcmlnID0gbmV3IFVSTChvcmlnaW5hbCkucHJvdG9jb2w7XG5cdGNvbnN0IGRlc3QgPSBuZXcgVVJMKGRlc3RpbmF0aW9uKS5wcm90b2NvbDtcblxuXHRyZXR1cm4gb3JpZyA9PT0gZGVzdDtcbn07XG4iLCAiLyoqXG4gKiBIZWFkZXJzLmpzXG4gKlxuICogSGVhZGVycyBjbGFzcyBvZmZlcnMgY29udmVuaWVudCBoZWxwZXJzXG4gKi9cblxuaW1wb3J0IHt0eXBlc30gZnJvbSAnbm9kZTp1dGlsJztcbmltcG9ydCBodHRwIGZyb20gJ25vZGU6aHR0cCc7XG5cbi8qIGM4IGlnbm9yZSBuZXh0IDkgKi9cbmNvbnN0IHZhbGlkYXRlSGVhZGVyTmFtZSA9IHR5cGVvZiBodHRwLnZhbGlkYXRlSGVhZGVyTmFtZSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdGh0dHAudmFsaWRhdGVIZWFkZXJOYW1lIDpcblx0bmFtZSA9PiB7XG5cdFx0aWYgKCEvXltcXF5gXFwtXFx3ISMkJSYnKisufH5dKyQvLnRlc3QobmFtZSkpIHtcblx0XHRcdGNvbnN0IGVycm9yID0gbmV3IFR5cGVFcnJvcihgSGVhZGVyIG5hbWUgbXVzdCBiZSBhIHZhbGlkIEhUVFAgdG9rZW4gWyR7bmFtZX1dYCk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyb3IsICdjb2RlJywge3ZhbHVlOiAnRVJSX0lOVkFMSURfSFRUUF9UT0tFTid9KTtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblx0fTtcblxuLyogYzggaWdub3JlIG5leHQgOSAqL1xuY29uc3QgdmFsaWRhdGVIZWFkZXJWYWx1ZSA9IHR5cGVvZiBodHRwLnZhbGlkYXRlSGVhZGVyVmFsdWUgPT09ICdmdW5jdGlvbicgP1xuXHRodHRwLnZhbGlkYXRlSGVhZGVyVmFsdWUgOlxuXHQobmFtZSwgdmFsdWUpID0+IHtcblx0XHRpZiAoL1teXFx0XFx1MDAyMC1cXHUwMDdFXFx1MDA4MC1cXHUwMEZGXS8udGVzdCh2YWx1ZSkpIHtcblx0XHRcdGNvbnN0IGVycm9yID0gbmV3IFR5cGVFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGNvbnRlbnQgW1wiJHtuYW1lfVwiXWApO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGVycm9yLCAnY29kZScsIHt2YWx1ZTogJ0VSUl9JTlZBTElEX0NIQVInfSk7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cdH07XG5cbi8qKlxuICogQHR5cGVkZWYge0hlYWRlcnMgfCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgSXRlcmFibGU8cmVhZG9ubHkgW3N0cmluZywgc3RyaW5nXT4gfCBJdGVyYWJsZTxJdGVyYWJsZTxzdHJpbmc+Pn0gSGVhZGVyc0luaXRcbiAqL1xuXG4vKipcbiAqIFRoaXMgRmV0Y2ggQVBJIGludGVyZmFjZSBhbGxvd3MgeW91IHRvIHBlcmZvcm0gdmFyaW91cyBhY3Rpb25zIG9uIEhUVFAgcmVxdWVzdCBhbmQgcmVzcG9uc2UgaGVhZGVycy5cbiAqIFRoZXNlIGFjdGlvbnMgaW5jbHVkZSByZXRyaWV2aW5nLCBzZXR0aW5nLCBhZGRpbmcgdG8sIGFuZCByZW1vdmluZy5cbiAqIEEgSGVhZGVycyBvYmplY3QgaGFzIGFuIGFzc29jaWF0ZWQgaGVhZGVyIGxpc3QsIHdoaWNoIGlzIGluaXRpYWxseSBlbXB0eSBhbmQgY29uc2lzdHMgb2YgemVybyBvciBtb3JlIG5hbWUgYW5kIHZhbHVlIHBhaXJzLlxuICogWW91IGNhbiBhZGQgdG8gdGhpcyB1c2luZyBtZXRob2RzIGxpa2UgYXBwZW5kKCkgKHNlZSBFeGFtcGxlcy4pXG4gKiBJbiBhbGwgbWV0aG9kcyBvZiB0aGlzIGludGVyZmFjZSwgaGVhZGVyIG5hbWVzIGFyZSBtYXRjaGVkIGJ5IGNhc2UtaW5zZW5zaXRpdmUgYnl0ZSBzZXF1ZW5jZS5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlcnMgZXh0ZW5kcyBVUkxTZWFyY2hQYXJhbXMge1xuXHQvKipcblx0ICogSGVhZGVycyBjbGFzc1xuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtIZWFkZXJzSW5pdH0gW2luaXRdIC0gUmVzcG9uc2UgaGVhZGVyc1xuXHQgKi9cblx0Y29uc3RydWN0b3IoaW5pdCkge1xuXHRcdC8vIFZhbGlkYXRlIGFuZCBub3JtYWxpemUgaW5pdCBvYmplY3QgaW4gW25hbWUsIHZhbHVlKHMpXVtdXG5cdFx0LyoqIEB0eXBlIHtzdHJpbmdbXVtdfSAqL1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAoaW5pdCBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcblx0XHRcdGNvbnN0IHJhdyA9IGluaXQucmF3KCk7XG5cdFx0XHRmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZXNdIG9mIE9iamVjdC5lbnRyaWVzKHJhdykpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLi4udmFsdWVzLm1hcCh2YWx1ZSA9PiBbbmFtZSwgdmFsdWVdKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChpbml0ID09IG51bGwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lcS1udWxsLCBlcWVxZXFcblx0XHRcdC8vIE5vIG9wXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgaW5pdCA9PT0gJ29iamVjdCcgJiYgIXR5cGVzLmlzQm94ZWRQcmltaXRpdmUoaW5pdCkpIHtcblx0XHRcdGNvbnN0IG1ldGhvZCA9IGluaXRbU3ltYm9sLml0ZXJhdG9yXTtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLCBlcWVxZXFcblx0XHRcdGlmIChtZXRob2QgPT0gbnVsbCkge1xuXHRcdFx0XHQvLyBSZWNvcmQ8Qnl0ZVN0cmluZywgQnl0ZVN0cmluZz5cblx0XHRcdFx0cmVzdWx0LnB1c2goLi4uT2JqZWN0LmVudHJpZXMoaW5pdCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdIZWFkZXIgcGFpcnMgbXVzdCBiZSBpdGVyYWJsZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2VxdWVuY2U8c2VxdWVuY2U8Qnl0ZVN0cmluZz4+XG5cdFx0XHRcdC8vIE5vdGU6IHBlciBzcGVjIHdlIGhhdmUgdG8gZmlyc3QgZXhoYXVzdCB0aGUgbGlzdHMgdGhlbiBwcm9jZXNzIHRoZW1cblx0XHRcdFx0cmVzdWx0ID0gWy4uLmluaXRdXG5cdFx0XHRcdFx0Lm1hcChwYWlyID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0dHlwZW9mIHBhaXIgIT09ICdvYmplY3QnIHx8IHR5cGVzLmlzQm94ZWRQcmltaXRpdmUocGFpcilcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgYW4gaXRlcmFibGUgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBbLi4ucGFpcl07XG5cdFx0XHRcdFx0fSkubWFwKHBhaXIgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHBhaXIubGVuZ3RoICE9PSAyKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0VhY2ggaGVhZGVyIHBhaXIgbXVzdCBiZSBhIG5hbWUvdmFsdWUgdHVwbGUnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIFsuLi5wYWlyXTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdIZWFkZXJzXFwnOiBUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IG9mIHR5cGUgXFwnKHNlcXVlbmNlPHNlcXVlbmNlPEJ5dGVTdHJpbmc+PiBvciByZWNvcmQ8Qnl0ZVN0cmluZywgQnl0ZVN0cmluZz4pJyk7XG5cdFx0fVxuXG5cdFx0Ly8gVmFsaWRhdGUgYW5kIGxvd2VyY2FzZVxuXHRcdHJlc3VsdCA9XG5cdFx0XHRyZXN1bHQubGVuZ3RoID4gMCA/XG5cdFx0XHRcdHJlc3VsdC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IHtcblx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlck5hbWUobmFtZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJWYWx1ZShuYW1lLCBTdHJpbmcodmFsdWUpKTtcblx0XHRcdFx0XHRyZXR1cm4gW1N0cmluZyhuYW1lKS50b0xvd2VyQ2FzZSgpLCBTdHJpbmcodmFsdWUpXTtcblx0XHRcdFx0fSkgOlxuXHRcdFx0XHR1bmRlZmluZWQ7XG5cblx0XHRzdXBlcihyZXN1bHQpO1xuXG5cdFx0Ly8gUmV0dXJuaW5nIGEgUHJveHkgdGhhdCB3aWxsIGxvd2VyY2FzZSBrZXkgbmFtZXMsIHZhbGlkYXRlIHBhcmFtZXRlcnMgYW5kIHNvcnQga2V5c1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKSB7XG5cdFx0XHRcdHN3aXRjaCAocCkge1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6XG5cdFx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0XHRcdHJldHVybiAobmFtZSwgdmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJOYW1lKG5hbWUpO1xuXHRcdFx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlclZhbHVlKG5hbWUsIFN0cmluZyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZVtwXS5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdHRhcmdldCxcblx0XHRcdFx0XHRcdFx0XHRTdHJpbmcobmFtZSkudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdFx0XHRTdHJpbmcodmFsdWUpXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y2FzZSAnZGVsZXRlJzpcblx0XHRcdFx0XHRjYXNlICdoYXMnOlxuXHRcdFx0XHRcdGNhc2UgJ2dldEFsbCc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRcdHZhbGlkYXRlSGVhZGVyTmFtZShuYW1lKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGVbcF0uY2FsbChcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXQsXG5cdFx0XHRcdFx0XHRcdFx0U3RyaW5nKG5hbWUpLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjYXNlICdrZXlzJzpcblx0XHRcdFx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRhcmdldC5zb3J0KCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXcgU2V0KFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUua2V5cy5jYWxsKHRhcmdldCkpLmtleXMoKTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0LyogYzggaWdub3JlIG5leHQgKi9cblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXHR9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzKTtcblx0fVxuXG5cdGdldChuYW1lKSB7XG5cdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5nZXRBbGwobmFtZSk7XG5cdFx0aWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGxldCB2YWx1ZSA9IHZhbHVlcy5qb2luKCcsICcpO1xuXHRcdGlmICgvXmNvbnRlbnQtZW5jb2RpbmckL2kudGVzdChuYW1lKSkge1xuXHRcdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcgPSB1bmRlZmluZWQpIHtcblx0XHRmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5rZXlzKCkpIHtcblx0XHRcdFJlZmxlY3QuYXBwbHkoY2FsbGJhY2ssIHRoaXNBcmcsIFt0aGlzLmdldChuYW1lKSwgbmFtZSwgdGhpc10pO1xuXHRcdH1cblx0fVxuXG5cdCogdmFsdWVzKCkge1xuXHRcdGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLmtleXMoKSkge1xuXHRcdFx0eWllbGQgdGhpcy5nZXQobmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlIHsoKSA9PiBJdGVyYWJsZUl0ZXJhdG9yPFtzdHJpbmcsIHN0cmluZ10+fVxuXHQgKi9cblx0KiBlbnRyaWVzKCkge1xuXHRcdGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLmtleXMoKSkge1xuXHRcdFx0eWllbGQgW25hbWUsIHRoaXMuZ2V0KG5hbWUpXTtcblx0XHR9XG5cdH1cblxuXHRbU3ltYm9sLml0ZXJhdG9yXSgpIHtcblx0XHRyZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG5cdH1cblxuXHQvKipcblx0ICogTm9kZS1mZXRjaCBub24tc3BlYyBtZXRob2Rcblx0ICogcmV0dXJuaW5nIGFsbCBoZWFkZXJzIGFuZCB0aGVpciB2YWx1ZXMgYXMgYXJyYXlcblx0ICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIHN0cmluZ1tdPn1cblx0ICovXG5cdHJhdygpIHtcblx0XHRyZXR1cm4gWy4uLnRoaXMua2V5cygpXS5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMuZ2V0QWxsKGtleSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3IgYmV0dGVyIGNvbnNvbGUubG9nKGhlYWRlcnMpIGFuZCBhbHNvIHRvIGNvbnZlcnQgSGVhZGVycyBpbnRvIE5vZGUuanMgUmVxdWVzdCBjb21wYXRpYmxlIGZvcm1hdFxuXHQgKi9cblx0W1N5bWJvbC5mb3IoJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJyldKCkge1xuXHRcdHJldHVybiBbLi4udGhpcy5rZXlzKCldLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcblx0XHRcdGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0QWxsKGtleSk7XG5cdFx0XHQvLyBIdHRwLnJlcXVlc3QoKSBvbmx5IHN1cHBvcnRzIHN0cmluZyBhcyBIb3N0IGhlYWRlci5cblx0XHRcdC8vIFRoaXMgaGFjayBtYWtlcyBzcGVjaWZ5aW5nIGN1c3RvbSBIb3N0IGhlYWRlciBwb3NzaWJsZS5cblx0XHRcdGlmIChrZXkgPT09ICdob3N0Jykge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHZhbHVlc1swXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdmFsdWVzLmxlbmd0aCA+IDEgPyB2YWx1ZXMgOiB2YWx1ZXNbMF07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSwge30pO1xuXHR9XG59XG5cbi8qKlxuICogUmUtc2hhcGluZyBvYmplY3QgZm9yIFdlYiBJREwgdGVzdHNcbiAqIE9ubHkgbmVlZCB0byBkbyBpdCBmb3Igb3ZlcnJpZGRlbiBtZXRob2RzXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFxuXHRIZWFkZXJzLnByb3RvdHlwZSxcblx0WydnZXQnLCAnZW50cmllcycsICdmb3JFYWNoJywgJ3ZhbHVlcyddLnJlZHVjZSgocmVzdWx0LCBwcm9wZXJ0eSkgPT4ge1xuXHRcdHJlc3VsdFtwcm9wZXJ0eV0gPSB7ZW51bWVyYWJsZTogdHJ1ZX07XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSwge30pXG4pO1xuXG4vKipcbiAqIENyZWF0ZSBhIEhlYWRlcnMgb2JqZWN0IGZyb20gYW4gaHR0cC5JbmNvbWluZ01lc3NhZ2UucmF3SGVhZGVycywgaWdub3JpbmcgdGhvc2UgdGhhdCBkb1xuICogbm90IGNvbmZvcm0gdG8gSFRUUCBncmFtbWFyIHByb2R1Y3Rpb25zLlxuICogQHBhcmFtIHtpbXBvcnQoJ2h0dHAnKS5JbmNvbWluZ01lc3NhZ2VbJ3Jhd0hlYWRlcnMnXX0gaGVhZGVyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJhd0hlYWRlcnMoaGVhZGVycyA9IFtdKSB7XG5cdHJldHVybiBuZXcgSGVhZGVycyhcblx0XHRoZWFkZXJzXG5cdFx0XHQvLyBTcGxpdCBpbnRvIHBhaXJzXG5cdFx0XHQucmVkdWNlKChyZXN1bHQsIHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcblx0XHRcdFx0aWYgKGluZGV4ICUgMiA9PT0gMCkge1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGFycmF5LnNsaWNlKGluZGV4LCBpbmRleCArIDIpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LCBbXSlcblx0XHRcdC5maWx0ZXIoKFtuYW1lLCB2YWx1ZV0pID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlck5hbWUobmFtZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJWYWx1ZShuYW1lLCBTdHJpbmcodmFsdWUpKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdCk7XG59XG4iLCAiY29uc3QgcmVkaXJlY3RTdGF0dXMgPSBuZXcgU2V0KFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF0pO1xuXG4vKipcbiAqIFJlZGlyZWN0IGNvZGUgbWF0Y2hpbmdcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZSAtIFN0YXR1cyBjb2RlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNSZWRpcmVjdCA9IGNvZGUgPT4ge1xuXHRyZXR1cm4gcmVkaXJlY3RTdGF0dXMuaGFzKGNvZGUpO1xufTtcbiIsICIvKipcbiAqIFJlc3BvbnNlLmpzXG4gKlxuICogUmVzcG9uc2UgY2xhc3MgcHJvdmlkZXMgY29udGVudCBkZWNvZGluZ1xuICovXG5cbmltcG9ydCBIZWFkZXJzIGZyb20gJy4vaGVhZGVycy5qcyc7XG5pbXBvcnQgQm9keSwge2Nsb25lLCBleHRyYWN0Q29udGVudFR5cGV9IGZyb20gJy4vYm9keS5qcyc7XG5pbXBvcnQge2lzUmVkaXJlY3R9IGZyb20gJy4vdXRpbHMvaXMtcmVkaXJlY3QuanMnO1xuXG5jb25zdCBJTlRFUk5BTFMgPSBTeW1ib2woJ1Jlc3BvbnNlIGludGVybmFscycpO1xuXG4vKipcbiAqIFJlc3BvbnNlIGNsYXNzXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2UtY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIGV4dGVuZHMgQm9keSB7XG5cdGNvbnN0cnVjdG9yKGJvZHkgPSBudWxsLCBvcHRpb25zID0ge30pIHtcblx0XHRzdXBlcihib2R5LCBvcHRpb25zKTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLCBlcWVxZXEsIG5vLW5lZ2F0ZWQtY29uZGl0aW9uXG5cdFx0Y29uc3Qgc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgIT0gbnVsbCA/IG9wdGlvbnMuc3RhdHVzIDogMjAwO1xuXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG5cblx0XHRpZiAoYm9keSAhPT0gbnVsbCAmJiAhaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShib2R5LCB0aGlzKTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTXSA9IHtcblx0XHRcdHR5cGU6ICdkZWZhdWx0Jyxcblx0XHRcdHVybDogb3B0aW9ucy51cmwsXG5cdFx0XHRzdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiBvcHRpb25zLnN0YXR1c1RleHQgfHwgJycsXG5cdFx0XHRoZWFkZXJzLFxuXHRcdFx0Y291bnRlcjogb3B0aW9ucy5jb3VudGVyLFxuXHRcdFx0aGlnaFdhdGVyTWFyazogb3B0aW9ucy5oaWdoV2F0ZXJNYXJrXG5cdFx0fTtcblx0fVxuXG5cdGdldCB0eXBlKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10udHlwZTtcblx0fVxuXG5cdGdldCB1cmwoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS51cmwgfHwgJyc7XG5cdH1cblxuXHRnZXQgc3RhdHVzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uc3RhdHVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlbmllbmNlIHByb3BlcnR5IHJlcHJlc2VudGluZyBpZiB0aGUgcmVxdWVzdCBlbmRlZCBub3JtYWxseVxuXHQgKi9cblx0Z2V0IG9rKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uc3RhdHVzID49IDIwMCAmJiB0aGlzW0lOVEVSTkFMU10uc3RhdHVzIDwgMzAwO1xuXHR9XG5cblx0Z2V0IHJlZGlyZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5jb3VudGVyID4gMDtcblx0fVxuXG5cdGdldCBzdGF0dXNUZXh0KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uc3RhdHVzVGV4dDtcblx0fVxuXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uaGVhZGVycztcblx0fVxuXG5cdGdldCBoaWdoV2F0ZXJNYXJrKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uaGlnaFdhdGVyTWFyaztcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZSB0aGlzIHJlc3BvbnNlXG5cdCAqXG5cdCAqIEByZXR1cm4gIFJlc3BvbnNlXG5cdCAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKGNsb25lKHRoaXMsIHRoaXMuaGlnaFdhdGVyTWFyayksIHtcblx0XHRcdHR5cGU6IHRoaXMudHlwZSxcblx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzLFxuXHRcdFx0b2s6IHRoaXMub2ssXG5cdFx0XHRyZWRpcmVjdGVkOiB0aGlzLnJlZGlyZWN0ZWQsXG5cdFx0XHRzaXplOiB0aGlzLnNpemUsXG5cdFx0XHRoaWdoV2F0ZXJNYXJrOiB0aGlzLmhpZ2hXYXRlck1hcmtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdXJsICAgIFRoZSBVUkwgdGhhdCB0aGUgbmV3IHJlc3BvbnNlIGlzIHRvIG9yaWdpbmF0ZSBmcm9tLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzIEFuIG9wdGlvbmFsIHN0YXR1cyBjb2RlIGZvciB0aGUgcmVzcG9uc2UgKGUuZy4sIDMwMi4pXG5cdCAqIEByZXR1cm5zIHtSZXNwb25zZX0gICAgQSBSZXNwb25zZSBvYmplY3QuXG5cdCAqL1xuXHRzdGF0aWMgcmVkaXJlY3QodXJsLCBzdGF0dXMgPSAzMDIpIHtcblx0XHRpZiAoIWlzUmVkaXJlY3Qoc3RhdHVzKSkge1xuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ZhaWxlZCB0byBleGVjdXRlIFwicmVkaXJlY3RcIiBvbiBcInJlc3BvbnNlXCI6IEludmFsaWQgc3RhdHVzIGNvZGUnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0bG9jYXRpb246IG5ldyBVUkwodXJsKS50b1N0cmluZygpXG5cdFx0XHR9LFxuXHRcdFx0c3RhdHVzXG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgZXJyb3IoKSB7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KTtcblx0XHRyZXNwb25zZVtJTlRFUk5BTFNdLnR5cGUgPSAnZXJyb3InO1xuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gJ1Jlc3BvbnNlJztcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXNwb25zZS5wcm90b3R5cGUsIHtcblx0dHlwZToge2VudW1lcmFibGU6IHRydWV9LFxuXHR1cmw6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0c3RhdHVzOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdG9rOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHJlZGlyZWN0ZWQ6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0c3RhdHVzVGV4dDoge2VudW1lcmFibGU6IHRydWV9LFxuXHRoZWFkZXJzOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGNsb25lOiB7ZW51bWVyYWJsZTogdHJ1ZX1cbn0pO1xuIiwgIi8qKlxuICogUmVxdWVzdC5qc1xuICpcbiAqIFJlcXVlc3QgY2xhc3MgY29udGFpbnMgc2VydmVyIG9ubHkgb3B0aW9uc1xuICpcbiAqIEFsbCBzcGVjIGFsZ29yaXRobSBzdGVwIG51bWJlcnMgYXJlIGJhc2VkIG9uIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnL2NvbW1pdC1zbmFwc2hvdHMvYWU3MTY4MjJjYjNhNjE4NDMyMjZjZDA5MGVlZmM2NTg5NDQ2YzFkMi8uXG4gKi9cblxuaW1wb3J0IHtmb3JtYXQgYXMgZm9ybWF0VXJsfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQge2RlcHJlY2F0ZX0gZnJvbSAnbm9kZTp1dGlsJztcbmltcG9ydCBIZWFkZXJzIGZyb20gJy4vaGVhZGVycy5qcyc7XG5pbXBvcnQgQm9keSwge2Nsb25lLCBleHRyYWN0Q29udGVudFR5cGUsIGdldFRvdGFsQnl0ZXN9IGZyb20gJy4vYm9keS5qcyc7XG5pbXBvcnQge2lzQWJvcnRTaWduYWx9IGZyb20gJy4vdXRpbHMvaXMuanMnO1xuaW1wb3J0IHtnZXRTZWFyY2h9IGZyb20gJy4vdXRpbHMvZ2V0LXNlYXJjaC5qcyc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZVJlZmVycmVyUG9saWN5LCBkZXRlcm1pbmVSZXF1ZXN0c1JlZmVycmVyLCBERUZBVUxUX1JFRkVSUkVSX1BPTElDWVxufSBmcm9tICcuL3V0aWxzL3JlZmVycmVyLmpzJztcblxuY29uc3QgSU5URVJOQUxTID0gU3ltYm9sKCdSZXF1ZXN0IGludGVybmFscycpO1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIGluc3RhbmNlIG9mIFJlcXVlc3QuXG4gKlxuICogQHBhcmFtICB7Kn0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc1JlcXVlc3QgPSBvYmplY3QgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIG9iamVjdFtJTlRFUk5BTFNdID09PSAnb2JqZWN0J1xuXHQpO1xufTtcblxuY29uc3QgZG9CYWREYXRhV2FybiA9IGRlcHJlY2F0ZSgoKSA9PiB7fSxcblx0Jy5kYXRhIGlzIG5vdCBhIHZhbGlkIFJlcXVlc3RJbml0IHByb3BlcnR5LCB1c2UgLmJvZHkgaW5zdGVhZCcsXG5cdCdodHRwczovL2dpdGh1Yi5jb20vbm9kZS1mZXRjaC9ub2RlLWZldGNoL2lzc3Vlcy8xMDAwIChyZXF1ZXN0KScpO1xuXG4vKipcbiAqIFJlcXVlc3QgY2xhc3NcbiAqXG4gKiBSZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXF1ZXN0LWNsYXNzXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dCAgVXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIE9iamVjdCAgaW5pdCAgIEN1c3RvbSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBCb2R5IHtcblx0Y29uc3RydWN0b3IoaW5wdXQsIGluaXQgPSB7fSkge1xuXHRcdGxldCBwYXJzZWRVUkw7XG5cblx0XHQvLyBOb3JtYWxpemUgaW5wdXQgYW5kIGZvcmNlIFVSTCB0byBiZSBlbmNvZGVkIGFzIFVURi04IChodHRwczovL2dpdGh1Yi5jb20vbm9kZS1mZXRjaC9ub2RlLWZldGNoL2lzc3Vlcy8yNDUpXG5cdFx0aWYgKGlzUmVxdWVzdChpbnB1dCkpIHtcblx0XHRcdHBhcnNlZFVSTCA9IG5ldyBVUkwoaW5wdXQudXJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyc2VkVVJMID0gbmV3IFVSTChpbnB1dCk7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblxuXHRcdGlmIChwYXJzZWRVUkwudXNlcm5hbWUgIT09ICcnIHx8IHBhcnNlZFVSTC5wYXNzd29yZCAhPT0gJycpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7cGFyc2VkVVJMfSBpcyBhbiB1cmwgd2l0aCBlbWJlZGRlZCBjcmVkZW50aWFscy5gKTtcblx0XHR9XG5cblx0XHRsZXQgbWV0aG9kID0gaW5pdC5tZXRob2QgfHwgaW5wdXQubWV0aG9kIHx8ICdHRVQnO1xuXHRcdGlmICgvXihkZWxldGV8Z2V0fGhlYWR8b3B0aW9uc3xwb3N0fHB1dCkkL2kudGVzdChtZXRob2QpKSB7XG5cdFx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cblx0XHRpZiAoIWlzUmVxdWVzdChpbml0KSAmJiAnZGF0YScgaW4gaW5pdCkge1xuXHRcdFx0ZG9CYWREYXRhV2FybigpO1xuXHRcdH1cblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLCBlcWVxZXFcblx0XHRpZiAoKGluaXQuYm9keSAhPSBudWxsIHx8IChpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwpKSAmJlxuXHRcdFx0KG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnSEVBRCcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdSZXF1ZXN0IHdpdGggR0VUL0hFQUQgbWV0aG9kIGNhbm5vdCBoYXZlIGJvZHknKTtcblx0XHR9XG5cblx0XHRjb25zdCBpbnB1dEJvZHkgPSBpbml0LmJvZHkgP1xuXHRcdFx0aW5pdC5ib2R5IDpcblx0XHRcdChpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwgP1xuXHRcdFx0XHRjbG9uZShpbnB1dCkgOlxuXHRcdFx0XHRudWxsKTtcblxuXHRcdHN1cGVyKGlucHV0Qm9keSwge1xuXHRcdFx0c2l6ZTogaW5pdC5zaXplIHx8IGlucHV0LnNpemUgfHwgMFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKGluaXQuaGVhZGVycyB8fCBpbnB1dC5oZWFkZXJzIHx8IHt9KTtcblxuXHRcdGlmIChpbnB1dEJvZHkgIT09IG51bGwgJiYgIWhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKSkge1xuXHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSBleHRyYWN0Q29udGVudFR5cGUoaW5wdXRCb2R5LCB0aGlzKTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBzaWduYWwgPSBpc1JlcXVlc3QoaW5wdXQpID9cblx0XHRcdGlucHV0LnNpZ25hbCA6XG5cdFx0XHRudWxsO1xuXHRcdGlmICgnc2lnbmFsJyBpbiBpbml0KSB7XG5cdFx0XHRzaWduYWwgPSBpbml0LnNpZ25hbDtcblx0XHR9XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCwgZXFlcWVxXG5cdFx0aWYgKHNpZ25hbCAhPSBudWxsICYmICFpc0Fib3J0U2lnbmFsKHNpZ25hbCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNpZ25hbCB0byBiZSBhbiBpbnN0YW5jZW9mIEFib3J0U2lnbmFsIG9yIEV2ZW50VGFyZ2V0Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gXHUwMEE3NS40LCBSZXF1ZXN0IGNvbnN0cnVjdG9yIHN0ZXBzLCBzdGVwIDE1LjFcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCwgZXFlcWVxXG5cdFx0bGV0IHJlZmVycmVyID0gaW5pdC5yZWZlcnJlciA9PSBudWxsID8gaW5wdXQucmVmZXJyZXIgOiBpbml0LnJlZmVycmVyO1xuXHRcdGlmIChyZWZlcnJlciA9PT0gJycpIHtcblx0XHRcdC8vIFx1MDBBNzUuNCwgUmVxdWVzdCBjb25zdHJ1Y3RvciBzdGVwcywgc3RlcCAxNS4yXG5cdFx0XHRyZWZlcnJlciA9ICduby1yZWZlcnJlcic7XG5cdFx0fSBlbHNlIGlmIChyZWZlcnJlcikge1xuXHRcdFx0Ly8gXHUwMEE3NS40LCBSZXF1ZXN0IGNvbnN0cnVjdG9yIHN0ZXBzLCBzdGVwIDE1LjMuMSwgMTUuMy4yXG5cdFx0XHRjb25zdCBwYXJzZWRSZWZlcnJlciA9IG5ldyBVUkwocmVmZXJyZXIpO1xuXHRcdFx0Ly8gXHUwMEE3NS40LCBSZXF1ZXN0IGNvbnN0cnVjdG9yIHN0ZXBzLCBzdGVwIDE1LjMuMywgMTUuMy40XG5cdFx0XHRyZWZlcnJlciA9IC9eYWJvdXQ6KFxcL1xcLyk/Y2xpZW50JC8udGVzdChwYXJzZWRSZWZlcnJlcikgPyAnY2xpZW50JyA6IHBhcnNlZFJlZmVycmVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWZlcnJlciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMU10gPSB7XG5cdFx0XHRtZXRob2QsXG5cdFx0XHRyZWRpcmVjdDogaW5pdC5yZWRpcmVjdCB8fCBpbnB1dC5yZWRpcmVjdCB8fCAnZm9sbG93Jyxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRwYXJzZWRVUkwsXG5cdFx0XHRzaWduYWwsXG5cdFx0XHRyZWZlcnJlclxuXHRcdH07XG5cblx0XHQvLyBOb2RlLWZldGNoLW9ubHkgb3B0aW9uc1xuXHRcdHRoaXMuZm9sbG93ID0gaW5pdC5mb2xsb3cgPT09IHVuZGVmaW5lZCA/IChpbnB1dC5mb2xsb3cgPT09IHVuZGVmaW5lZCA/IDIwIDogaW5wdXQuZm9sbG93KSA6IGluaXQuZm9sbG93O1xuXHRcdHRoaXMuY29tcHJlc3MgPSBpbml0LmNvbXByZXNzID09PSB1bmRlZmluZWQgPyAoaW5wdXQuY29tcHJlc3MgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5jb21wcmVzcykgOiBpbml0LmNvbXByZXNzO1xuXHRcdHRoaXMuY291bnRlciA9IGluaXQuY291bnRlciB8fCBpbnB1dC5jb3VudGVyIHx8IDA7XG5cdFx0dGhpcy5hZ2VudCA9IGluaXQuYWdlbnQgfHwgaW5wdXQuYWdlbnQ7XG5cdFx0dGhpcy5oaWdoV2F0ZXJNYXJrID0gaW5pdC5oaWdoV2F0ZXJNYXJrIHx8IGlucHV0LmhpZ2hXYXRlck1hcmsgfHwgMTYzODQ7XG5cdFx0dGhpcy5pbnNlY3VyZUhUVFBQYXJzZXIgPSBpbml0Lmluc2VjdXJlSFRUUFBhcnNlciB8fCBpbnB1dC5pbnNlY3VyZUhUVFBQYXJzZXIgfHwgZmFsc2U7XG5cblx0XHQvLyBcdTAwQTc1LjQsIFJlcXVlc3QgY29uc3RydWN0b3Igc3RlcHMsIHN0ZXAgMTYuXG5cdFx0Ly8gRGVmYXVsdCBpcyBlbXB0eSBzdHJpbmcgcGVyIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LXJlcXVlc3QtcmVmZXJyZXItcG9saWN5XG5cdFx0dGhpcy5yZWZlcnJlclBvbGljeSA9IGluaXQucmVmZXJyZXJQb2xpY3kgfHwgaW5wdXQucmVmZXJyZXJQb2xpY3kgfHwgJyc7XG5cdH1cblxuXHQvKiogQHJldHVybnMge3N0cmluZ30gKi9cblx0Z2V0IG1ldGhvZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLm1ldGhvZDtcblx0fVxuXG5cdC8qKiBAcmV0dXJucyB7c3RyaW5nfSAqL1xuXHRnZXQgdXJsKCkge1xuXHRcdHJldHVybiBmb3JtYXRVcmwodGhpc1tJTlRFUk5BTFNdLnBhcnNlZFVSTCk7XG5cdH1cblxuXHQvKiogQHJldHVybnMge0hlYWRlcnN9ICovXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uaGVhZGVycztcblx0fVxuXG5cdGdldCByZWRpcmVjdCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLnJlZGlyZWN0O1xuXHR9XG5cblx0LyoqIEByZXR1cm5zIHtBYm9ydFNpZ25hbH0gKi9cblx0Z2V0IHNpZ25hbCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLnNpZ25hbDtcblx0fVxuXG5cdC8vIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNkb20tcmVxdWVzdC1yZWZlcnJlclxuXHRnZXQgcmVmZXJyZXIoKSB7XG5cdFx0aWYgKHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlciA9PT0gJ25vLXJlZmVycmVyJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzW0lOVEVSTkFMU10ucmVmZXJyZXIgPT09ICdjbGllbnQnKSB7XG5cdFx0XHRyZXR1cm4gJ2Fib3V0OmNsaWVudCc7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlcikge1xuXHRcdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlci50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRnZXQgcmVmZXJyZXJQb2xpY3koKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlclBvbGljeTtcblx0fVxuXG5cdHNldCByZWZlcnJlclBvbGljeShyZWZlcnJlclBvbGljeSkge1xuXHRcdHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlclBvbGljeSA9IHZhbGlkYXRlUmVmZXJyZXJQb2xpY3kocmVmZXJyZXJQb2xpY3kpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lIHRoaXMgcmVxdWVzdFxuXHQgKlxuXHQgKiBAcmV0dXJuICBSZXF1ZXN0XG5cdCAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlcXVlc3QodGhpcyk7XG5cdH1cblxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG5cdFx0cmV0dXJuICdSZXF1ZXN0Jztcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHRtZXRob2Q6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0dXJsOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGhlYWRlcnM6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0cmVkaXJlY3Q6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0Y2xvbmU6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0c2lnbmFsOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHJlZmVycmVyOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHJlZmVycmVyUG9saWN5OiB7ZW51bWVyYWJsZTogdHJ1ZX1cbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBSZXF1ZXN0IHRvIE5vZGUuanMgaHR0cCByZXF1ZXN0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0IC0gQSBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuIFRoZSBvcHRpb25zIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gaHR0cC5yZXF1ZXN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXROb2RlUmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0ID0+IHtcblx0Y29uc3Qge3BhcnNlZFVSTH0gPSByZXF1ZXN0W0lOVEVSTkFMU107XG5cdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXF1ZXN0W0lOVEVSTkFMU10uaGVhZGVycyk7XG5cblx0Ly8gRmV0Y2ggc3RlcCAxLjNcblx0aWYgKCFoZWFkZXJzLmhhcygnQWNjZXB0JykpIHtcblx0XHRoZWFkZXJzLnNldCgnQWNjZXB0JywgJyovKicpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXBzIDIuNC0yLjdcblx0bGV0IGNvbnRlbnRMZW5ndGhWYWx1ZSA9IG51bGw7XG5cdGlmIChyZXF1ZXN0LmJvZHkgPT09IG51bGwgJiYgL14ocG9zdHxwdXQpJC9pLnRlc3QocmVxdWVzdC5tZXRob2QpKSB7XG5cdFx0Y29udGVudExlbmd0aFZhbHVlID0gJzAnO1xuXHR9XG5cblx0aWYgKHJlcXVlc3QuYm9keSAhPT0gbnVsbCkge1xuXHRcdGNvbnN0IHRvdGFsQnl0ZXMgPSBnZXRUb3RhbEJ5dGVzKHJlcXVlc3QpO1xuXHRcdC8vIFNldCBDb250ZW50LUxlbmd0aCBpZiB0b3RhbEJ5dGVzIGlzIGEgbnVtYmVyICh0aGF0IGlzIG5vdCBOYU4pXG5cdFx0aWYgKHR5cGVvZiB0b3RhbEJ5dGVzID09PSAnbnVtYmVyJyAmJiAhTnVtYmVyLmlzTmFOKHRvdGFsQnl0ZXMpKSB7XG5cdFx0XHRjb250ZW50TGVuZ3RoVmFsdWUgPSBTdHJpbmcodG90YWxCeXRlcyk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGNvbnRlbnRMZW5ndGhWYWx1ZSkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb250ZW50LUxlbmd0aCcsIGNvbnRlbnRMZW5ndGhWYWx1ZSk7XG5cdH1cblxuXHQvLyA0LjEuIE1haW4gZmV0Y2gsIHN0ZXAgMi42XG5cdC8vID4gSWYgcmVxdWVzdCdzIHJlZmVycmVyIHBvbGljeSBpcyB0aGUgZW1wdHkgc3RyaW5nLCB0aGVuIHNldCByZXF1ZXN0J3MgcmVmZXJyZXIgcG9saWN5IHRvIHRoZVxuXHQvLyA+IGRlZmF1bHQgcmVmZXJyZXIgcG9saWN5LlxuXHRpZiAocmVxdWVzdC5yZWZlcnJlclBvbGljeSA9PT0gJycpIHtcblx0XHRyZXF1ZXN0LnJlZmVycmVyUG9saWN5ID0gREVGQVVMVF9SRUZFUlJFUl9QT0xJQ1k7XG5cdH1cblxuXHQvLyA0LjEuIE1haW4gZmV0Y2gsIHN0ZXAgMi43XG5cdC8vID4gSWYgcmVxdWVzdCdzIHJlZmVycmVyIGlzIG5vdCBcIm5vLXJlZmVycmVyXCIsIHNldCByZXF1ZXN0J3MgcmVmZXJyZXIgdG8gdGhlIHJlc3VsdCBvZiBpbnZva2luZ1xuXHQvLyA+IGRldGVybWluZSByZXF1ZXN0J3MgcmVmZXJyZXIuXG5cdGlmIChyZXF1ZXN0LnJlZmVycmVyICYmIHJlcXVlc3QucmVmZXJyZXIgIT09ICduby1yZWZlcnJlcicpIHtcblx0XHRyZXF1ZXN0W0lOVEVSTkFMU10ucmVmZXJyZXIgPSBkZXRlcm1pbmVSZXF1ZXN0c1JlZmVycmVyKHJlcXVlc3QpO1xuXHR9IGVsc2Uge1xuXHRcdHJlcXVlc3RbSU5URVJOQUxTXS5yZWZlcnJlciA9ICduby1yZWZlcnJlcic7XG5cdH1cblxuXHQvLyA0LjUuIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCwgc3RlcCA2Ljlcblx0Ly8gPiBJZiBodHRwUmVxdWVzdCdzIHJlZmVycmVyIGlzIGEgVVJMLCB0aGVuIGFwcGVuZCBgUmVmZXJlcmAvaHR0cFJlcXVlc3QncyByZWZlcnJlciwgc2VyaWFsaXplZFxuXHQvLyA+ICBhbmQgaXNvbW9ycGhpYyBlbmNvZGVkLCB0byBodHRwUmVxdWVzdCdzIGhlYWRlciBsaXN0LlxuXHRpZiAocmVxdWVzdFtJTlRFUk5BTFNdLnJlZmVycmVyIGluc3RhbmNlb2YgVVJMKSB7XG5cdFx0aGVhZGVycy5zZXQoJ1JlZmVyZXInLCByZXF1ZXN0LnJlZmVycmVyKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwIDIuMTFcblx0aWYgKCFoZWFkZXJzLmhhcygnVXNlci1BZ2VudCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnbm9kZS1mZXRjaCcpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xNVxuXHRpZiAocmVxdWVzdC5jb21wcmVzcyAmJiAhaGVhZGVycy5oYXMoJ0FjY2VwdC1FbmNvZGluZycpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdC1FbmNvZGluZycsICdnemlwLCBkZWZsYXRlLCBicicpO1xuXHR9XG5cblx0bGV0IHthZ2VudH0gPSByZXF1ZXN0O1xuXHRpZiAodHlwZW9mIGFnZW50ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0YWdlbnQgPSBhZ2VudChwYXJzZWRVUkwpO1xuXHR9XG5cblx0aWYgKCFoZWFkZXJzLmhhcygnQ29ubmVjdGlvbicpICYmICFhZ2VudCkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb25uZWN0aW9uJywgJ2Nsb3NlJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCA0LjJcblx0Ly8gY2h1bmtlZCBlbmNvZGluZyBpcyBoYW5kbGVkIGJ5IE5vZGUuanNcblxuXHRjb25zdCBzZWFyY2ggPSBnZXRTZWFyY2gocGFyc2VkVVJMKTtcblxuXHQvLyBQYXNzIHRoZSBmdWxsIFVSTCBkaXJlY3RseSB0byByZXF1ZXN0KCksIGJ1dCBvdmVyd3JpdGUgdGhlIGZvbGxvd2luZ1xuXHQvLyBvcHRpb25zOlxuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdC8vIE92ZXJ3cml0ZSBzZWFyY2ggdG8gcmV0YWluIHRyYWlsaW5nID8gKGlzc3VlICM3NzYpXG5cdFx0cGF0aDogcGFyc2VkVVJMLnBhdGhuYW1lICsgc2VhcmNoLFxuXHRcdC8vIFRoZSBmb2xsb3dpbmcgb3B0aW9ucyBhcmUgbm90IGV4cHJlc3NlZCBpbiB0aGUgVVJMXG5cdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRoZWFkZXJzOiBoZWFkZXJzW1N5bWJvbC5mb3IoJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJyldKCksXG5cdFx0aW5zZWN1cmVIVFRQUGFyc2VyOiByZXF1ZXN0Lmluc2VjdXJlSFRUUFBhcnNlcixcblx0XHRhZ2VudFxuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0LyoqIEB0eXBlIHtVUkx9ICovXG5cdFx0cGFyc2VkVVJMLFxuXHRcdG9wdGlvbnNcblx0fTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGdldFNlYXJjaCA9IHBhcnNlZFVSTCA9PiB7XG5cdGlmIChwYXJzZWRVUkwuc2VhcmNoKSB7XG5cdFx0cmV0dXJuIHBhcnNlZFVSTC5zZWFyY2g7XG5cdH1cblxuXHRjb25zdCBsYXN0T2Zmc2V0ID0gcGFyc2VkVVJMLmhyZWYubGVuZ3RoIC0gMTtcblx0Y29uc3QgaGFzaCA9IHBhcnNlZFVSTC5oYXNoIHx8IChwYXJzZWRVUkwuaHJlZltsYXN0T2Zmc2V0XSA9PT0gJyMnID8gJyMnIDogJycpO1xuXHRyZXR1cm4gcGFyc2VkVVJMLmhyZWZbbGFzdE9mZnNldCAtIGhhc2gubGVuZ3RoXSA9PT0gJz8nID8gJz8nIDogJyc7XG59O1xuIiwgImltcG9ydCB7aXNJUH0gZnJvbSAnbm9kZTpuZXQnO1xuXG4vKipcbiAqIEBleHRlcm5hbCBVUkxcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkx8VVJMfVxuICovXG5cbi8qKlxuICogQG1vZHVsZSB1dGlscy9yZWZlcnJlclxuICogQHByaXZhdGVcbiAqL1xuXG4vKipcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJhcHBzZWMtcmVmZXJyZXItcG9saWN5LyNzdHJpcC11cmx8UmVmZXJyZXIgUG9saWN5IFx1MDBBNzguNC4gU3RyaXAgdXJsIGZvciB1c2UgYXMgYSByZWZlcnJlcn1cbiAqIEBwYXJhbSB7c3RyaW5nfSBVUkxcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29yaWdpbk9ubHk9ZmFsc2VdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcFVSTEZvclVzZUFzQVJlZmVycmVyKHVybCwgb3JpZ2luT25seSA9IGZhbHNlKSB7XG5cdC8vIDEuIElmIHVybCBpcyBudWxsLCByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdGlmICh1cmwgPT0gbnVsbCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVxLW51bGwsIGVxZXFlcVxuXHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHR9XG5cblx0dXJsID0gbmV3IFVSTCh1cmwpO1xuXG5cdC8vIDIuIElmIHVybCdzIHNjaGVtZSBpcyBhIGxvY2FsIHNjaGVtZSwgdGhlbiByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdGlmICgvXihhYm91dHxibG9ifGRhdGEpOiQvLnRlc3QodXJsLnByb3RvY29sKSkge1xuXHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHR9XG5cblx0Ly8gMy4gU2V0IHVybCdzIHVzZXJuYW1lIHRvIHRoZSBlbXB0eSBzdHJpbmcuXG5cdHVybC51c2VybmFtZSA9ICcnO1xuXG5cdC8vIDQuIFNldCB1cmwncyBwYXNzd29yZCB0byBudWxsLlxuXHQvLyBOb3RlOiBgbnVsbGAgYXBwZWFycyB0byBiZSBhIG1pc3Rha2UgYXMgdGhpcyBhY3R1YWxseSByZXN1bHRzIGluIHRoZSBwYXNzd29yZCBiZWluZyBgXCJudWxsXCJgLlxuXHR1cmwucGFzc3dvcmQgPSAnJztcblxuXHQvLyA1LiBTZXQgdXJsJ3MgZnJhZ21lbnQgdG8gbnVsbC5cblx0Ly8gTm90ZTogYG51bGxgIGFwcGVhcnMgdG8gYmUgYSBtaXN0YWtlIGFzIHRoaXMgYWN0dWFsbHkgcmVzdWx0cyBpbiB0aGUgZnJhZ21lbnQgYmVpbmcgYFwiI251bGxcImAuXG5cdHVybC5oYXNoID0gJyc7XG5cblx0Ly8gNi4gSWYgdGhlIG9yaWdpbi1vbmx5IGZsYWcgaXMgdHJ1ZSwgdGhlbjpcblx0aWYgKG9yaWdpbk9ubHkpIHtcblx0XHQvLyA2LjEuIFNldCB1cmwncyBwYXRoIHRvIG51bGwuXG5cdFx0Ly8gTm90ZTogYG51bGxgIGFwcGVhcnMgdG8gYmUgYSBtaXN0YWtlIGFzIHRoaXMgYWN0dWFsbHkgcmVzdWx0cyBpbiB0aGUgcGF0aCBiZWluZyBgXCIvbnVsbFwiYC5cblx0XHR1cmwucGF0aG5hbWUgPSAnJztcblxuXHRcdC8vIDYuMi4gU2V0IHVybCdzIHF1ZXJ5IHRvIG51bGwuXG5cdFx0Ly8gTm90ZTogYG51bGxgIGFwcGVhcnMgdG8gYmUgYSBtaXN0YWtlIGFzIHRoaXMgYWN0dWFsbHkgcmVzdWx0cyBpbiB0aGUgcXVlcnkgYmVpbmcgYFwiP251bGxcImAuXG5cdFx0dXJsLnNlYXJjaCA9ICcnO1xuXHR9XG5cblx0Ly8gNy4gUmV0dXJuIHVybC5cblx0cmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjLXJlZmVycmVyLXBvbGljeS8jZW51bWRlZi1yZWZlcnJlcnBvbGljeXxlbnVtIFJlZmVycmVyUG9saWN5fVxuICovXG5leHBvcnQgY29uc3QgUmVmZXJyZXJQb2xpY3kgPSBuZXcgU2V0KFtcblx0JycsXG5cdCduby1yZWZlcnJlcicsXG5cdCduby1yZWZlcnJlci13aGVuLWRvd25ncmFkZScsXG5cdCdzYW1lLW9yaWdpbicsXG5cdCdvcmlnaW4nLFxuXHQnc3RyaWN0LW9yaWdpbicsXG5cdCdvcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nLFxuXHQnc3RyaWN0LW9yaWdpbi13aGVuLWNyb3NzLW9yaWdpbicsXG5cdCd1bnNhZmUtdXJsJ1xuXSk7XG5cbi8qKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmFwcHNlYy1yZWZlcnJlci1wb2xpY3kvI2RlZmF1bHQtcmVmZXJyZXItcG9saWN5fGRlZmF1bHQgcmVmZXJyZXIgcG9saWN5fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9SRUZFUlJFUl9QT0xJQ1kgPSAnc3RyaWN0LW9yaWdpbi13aGVuLWNyb3NzLW9yaWdpbic7XG5cbi8qKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmFwcHNlYy1yZWZlcnJlci1wb2xpY3kvI3JlZmVycmVyLXBvbGljaWVzfFJlZmVycmVyIFBvbGljeSBcdTAwQTczLiBSZWZlcnJlciBQb2xpY2llc31cbiAqIEBwYXJhbSB7c3RyaW5nfSByZWZlcnJlclBvbGljeVxuICogQHJldHVybnMge3N0cmluZ30gcmVmZXJyZXJQb2xpY3lcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUmVmZXJyZXJQb2xpY3kocmVmZXJyZXJQb2xpY3kpIHtcblx0aWYgKCFSZWZlcnJlclBvbGljeS5oYXMocmVmZXJyZXJQb2xpY3kpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCByZWZlcnJlclBvbGljeTogJHtyZWZlcnJlclBvbGljeX1gKTtcblx0fVxuXG5cdHJldHVybiByZWZlcnJlclBvbGljeTtcbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjLXNlY3VyZS1jb250ZXh0cy8jaXMtb3JpZ2luLXRydXN0d29ydGh5fFJlZmVycmVyIFBvbGljeSBcdTAwQTczLjIuIElzIG9yaWdpbiBwb3RlbnRpYWxseSB0cnVzdHdvcnRoeT99XG4gKiBAcGFyYW0ge2V4dGVybmFsOlVSTH0gdXJsXG4gKiBAcmV0dXJucyBgdHJ1ZWA6IFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIiwgYGZhbHNlYDogXCJOb3QgVHJ1c3R3b3J0aHlcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPcmlnaW5Qb3RlbnRpYWxseVRydXN0d29ydGh5KHVybCkge1xuXHQvLyAxLiBJZiBvcmlnaW4gaXMgYW4gb3BhcXVlIG9yaWdpbiwgcmV0dXJuIFwiTm90IFRydXN0d29ydGh5XCIuXG5cdC8vIE5vdCBhcHBsaWNhYmxlXG5cblx0Ly8gMi4gQXNzZXJ0OiBvcmlnaW4gaXMgYSB0dXBsZSBvcmlnaW4uXG5cdC8vIE5vdCBmb3IgaW1wbGVtZW50YXRpb25zXG5cblx0Ly8gMy4gSWYgb3JpZ2luJ3Mgc2NoZW1lIGlzIGVpdGhlciBcImh0dHBzXCIgb3IgXCJ3c3NcIiwgcmV0dXJuIFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIi5cblx0aWYgKC9eKGh0dHB8d3MpczokLy50ZXN0KHVybC5wcm90b2NvbCkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIDQuIElmIG9yaWdpbidzIGhvc3QgY29tcG9uZW50IG1hdGNoZXMgb25lIG9mIHRoZSBDSURSIG5vdGF0aW9ucyAxMjcuMC4wLjAvOCBvciA6OjEvMTI4IFtSRkM0NjMyXSwgcmV0dXJuIFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIi5cblx0Y29uc3QgaG9zdElwID0gdXJsLmhvc3QucmVwbGFjZSgvKF5cXFspfChdJCkvZywgJycpO1xuXHRjb25zdCBob3N0SVBWZXJzaW9uID0gaXNJUChob3N0SXApO1xuXG5cdGlmIChob3N0SVBWZXJzaW9uID09PSA0ICYmIC9eMTI3XFwuLy50ZXN0KGhvc3RJcCkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlmIChob3N0SVBWZXJzaW9uID09PSA2ICYmIC9eKCgoMCs6KXs3fSl8KDo6KDArOil7MCw2fSkpMCoxJC8udGVzdChob3N0SXApKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyA1LiBJZiBvcmlnaW4ncyBob3N0IGNvbXBvbmVudCBpcyBcImxvY2FsaG9zdFwiIG9yIGZhbGxzIHdpdGhpbiBcIi5sb2NhbGhvc3RcIiwgYW5kIHRoZSB1c2VyIGFnZW50IGNvbmZvcm1zIHRvIHRoZSBuYW1lIHJlc29sdXRpb24gcnVsZXMgaW4gW2xldC1sb2NhbGhvc3QtYmUtbG9jYWxob3N0XSwgcmV0dXJuIFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIi5cblx0Ly8gV2UgYXJlIHJldHVybmluZyBGQUxTRSBoZXJlIGJlY2F1c2Ugd2UgY2Fubm90IGVuc3VyZSBjb25mb3JtYW5jZSB0b1xuXHQvLyBsZXQtbG9jYWxob3N0LWJlLWxvYWxob3N0IChodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtd2VzdC1sZXQtbG9jYWxob3N0LWJlLWxvY2FsaG9zdClcblx0aWYgKHVybC5ob3N0ID09PSAnbG9jYWxob3N0JyB8fCB1cmwuaG9zdC5lbmRzV2l0aCgnLmxvY2FsaG9zdCcpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gNi4gSWYgb3JpZ2luJ3Mgc2NoZW1lIGNvbXBvbmVudCBpcyBmaWxlLCByZXR1cm4gXCJQb3RlbnRpYWxseSBUcnVzdHdvcnRoeVwiLlxuXHRpZiAodXJsLnByb3RvY29sID09PSAnZmlsZTonKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyA3LiBJZiBvcmlnaW4ncyBzY2hlbWUgY29tcG9uZW50IGlzIG9uZSB3aGljaCB0aGUgdXNlciBhZ2VudCBjb25zaWRlcnMgdG8gYmUgYXV0aGVudGljYXRlZCwgcmV0dXJuIFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIi5cblx0Ly8gTm90IHN1cHBvcnRlZFxuXG5cdC8vIDguIElmIG9yaWdpbiBoYXMgYmVlbiBjb25maWd1cmVkIGFzIGEgdHJ1c3R3b3J0aHkgb3JpZ2luLCByZXR1cm4gXCJQb3RlbnRpYWxseSBUcnVzdHdvcnRoeVwiLlxuXHQvLyBOb3Qgc3VwcG9ydGVkXG5cblx0Ly8gOS4gUmV0dXJuIFwiTm90IFRydXN0d29ydGh5XCIuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjLXNlY3VyZS1jb250ZXh0cy8jaXMtdXJsLXRydXN0d29ydGh5fFJlZmVycmVyIFBvbGljeSBcdTAwQTczLjMuIElzIHVybCBwb3RlbnRpYWxseSB0cnVzdHdvcnRoeT99XG4gKiBAcGFyYW0ge2V4dGVybmFsOlVSTH0gdXJsXG4gKiBAcmV0dXJucyBgdHJ1ZWA6IFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIiwgYGZhbHNlYDogXCJOb3QgVHJ1c3R3b3J0aHlcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KHVybCkge1xuXHQvLyAxLiBJZiB1cmwgaXMgXCJhYm91dDpibGFua1wiIG9yIFwiYWJvdXQ6c3JjZG9jXCIsIHJldHVybiBcIlBvdGVudGlhbGx5IFRydXN0d29ydGh5XCIuXG5cdGlmICgvXmFib3V0OihibGFua3xzcmNkb2MpJC8udGVzdCh1cmwpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyAyLiBJZiB1cmwncyBzY2hlbWUgaXMgXCJkYXRhXCIsIHJldHVybiBcIlBvdGVudGlhbGx5IFRydXN0d29ydGh5XCIuXG5cdGlmICh1cmwucHJvdG9jb2wgPT09ICdkYXRhOicpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIE5vdGU6IFRoZSBvcmlnaW4gb2YgYmxvYjogYW5kIGZpbGVzeXN0ZW06IFVSTHMgaXMgdGhlIG9yaWdpbiBvZiB0aGUgY29udGV4dCBpbiB3aGljaCB0aGV5IHdlcmVcblx0Ly8gY3JlYXRlZC4gVGhlcmVmb3JlLCBibG9icyBjcmVhdGVkIGluIGEgdHJ1c3R3b3J0aHkgb3JpZ2luIHdpbGwgdGhlbXNlbHZlcyBiZSBwb3RlbnRpYWxseVxuXHQvLyB0cnVzdHdvcnRoeS5cblx0aWYgKC9eKGJsb2J8ZmlsZXN5c3RlbSk6JC8udGVzdCh1cmwucHJvdG9jb2wpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyAzLiBSZXR1cm4gdGhlIHJlc3VsdCBvZiBleGVjdXRpbmcgXHUwMEE3My4yIElzIG9yaWdpbiBwb3RlbnRpYWxseSB0cnVzdHdvcnRoeT8gb24gdXJsJ3Mgb3JpZ2luLlxuXHRyZXR1cm4gaXNPcmlnaW5Qb3RlbnRpYWxseVRydXN0d29ydGh5KHVybCk7XG59XG5cbi8qKlxuICogTW9kaWZpZXMgdGhlIHJlZmVycmVyVVJMIHRvIGVuZm9yY2UgYW55IGV4dHJhIHNlY3VyaXR5IHBvbGljeSBjb25zaWRlcmF0aW9ucy5cbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJhcHBzZWMtcmVmZXJyZXItcG9saWN5LyNkZXRlcm1pbmUtcmVxdWVzdHMtcmVmZXJyZXJ8UmVmZXJyZXIgUG9saWN5IFx1MDBBNzguMy4gRGV0ZXJtaW5lIHJlcXVlc3QncyBSZWZlcnJlcn0sIHN0ZXAgN1xuICogQGNhbGxiYWNrIG1vZHVsZTp1dGlscy9yZWZlcnJlcn5yZWZlcnJlclVSTENhbGxiYWNrXG4gKiBAcGFyYW0ge2V4dGVybmFsOlVSTH0gcmVmZXJyZXJVUkxcbiAqIEByZXR1cm5zIHtleHRlcm5hbDpVUkx9IG1vZGlmaWVkIHJlZmVycmVyVVJMXG4gKi9cblxuLyoqXG4gKiBNb2RpZmllcyB0aGUgcmVmZXJyZXJPcmlnaW4gdG8gZW5mb3JjZSBhbnkgZXh0cmEgc2VjdXJpdHkgcG9saWN5IGNvbnNpZGVyYXRpb25zLlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmFwcHNlYy1yZWZlcnJlci1wb2xpY3kvI2RldGVybWluZS1yZXF1ZXN0cy1yZWZlcnJlcnxSZWZlcnJlciBQb2xpY3kgXHUwMEE3OC4zLiBEZXRlcm1pbmUgcmVxdWVzdCdzIFJlZmVycmVyfSwgc3RlcCA3XG4gKiBAY2FsbGJhY2sgbW9kdWxlOnV0aWxzL3JlZmVycmVyfnJlZmVycmVyT3JpZ2luQ2FsbGJhY2tcbiAqIEBwYXJhbSB7ZXh0ZXJuYWw6VVJMfSByZWZlcnJlck9yaWdpblxuICogQHJldHVybnMge2V4dGVybmFsOlVSTH0gbW9kaWZpZWQgcmVmZXJyZXJPcmlnaW5cbiAqL1xuXG4vKipcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJhcHBzZWMtcmVmZXJyZXItcG9saWN5LyNkZXRlcm1pbmUtcmVxdWVzdHMtcmVmZXJyZXJ8UmVmZXJyZXIgUG9saWN5IFx1MDBBNzguMy4gRGV0ZXJtaW5lIHJlcXVlc3QncyBSZWZlcnJlcn1cbiAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxdWVzdFxuICogQHBhcmFtIHtvYmplY3R9IG9cbiAqIEBwYXJhbSB7bW9kdWxlOnV0aWxzL3JlZmVycmVyfnJlZmVycmVyVVJMQ2FsbGJhY2t9IG8ucmVmZXJyZXJVUkxDYWxsYmFja1xuICogQHBhcmFtIHttb2R1bGU6dXRpbHMvcmVmZXJyZXJ+cmVmZXJyZXJPcmlnaW5DYWxsYmFja30gby5yZWZlcnJlck9yaWdpbkNhbGxiYWNrXG4gKiBAcmV0dXJucyB7ZXh0ZXJuYWw6VVJMfSBSZXF1ZXN0J3MgcmVmZXJyZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluZVJlcXVlc3RzUmVmZXJyZXIocmVxdWVzdCwge3JlZmVycmVyVVJMQ2FsbGJhY2ssIHJlZmVycmVyT3JpZ2luQ2FsbGJhY2t9ID0ge30pIHtcblx0Ly8gVGhlcmUgYXJlIDIgbm90ZXMgaW4gdGhlIHNwZWNpZmljYXRpb24gYWJvdXQgaW52YWxpZCBwcmUtY29uZGl0aW9ucy4gIFdlIHJldHVybiBudWxsLCBoZXJlLCBmb3Jcblx0Ly8gdGhlc2UgY2FzZXM6XG5cdC8vID4gTm90ZTogSWYgcmVxdWVzdCdzIHJlZmVycmVyIGlzIFwibm8tcmVmZXJyZXJcIiwgRmV0Y2ggd2lsbCBub3QgY2FsbCBpbnRvIHRoaXMgYWxnb3JpdGhtLlxuXHQvLyA+IE5vdGU6IElmIHJlcXVlc3QncyByZWZlcnJlciBwb2xpY3kgaXMgdGhlIGVtcHR5IHN0cmluZywgRmV0Y2ggd2lsbCBub3QgY2FsbCBpbnRvIHRoaXNcblx0Ly8gPiBhbGdvcml0aG0uXG5cdGlmIChyZXF1ZXN0LnJlZmVycmVyID09PSAnbm8tcmVmZXJyZXInIHx8IHJlcXVlc3QucmVmZXJyZXJQb2xpY3kgPT09ICcnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyAxLiBMZXQgcG9saWN5IGJlIHJlcXVlc3QncyBhc3NvY2lhdGVkIHJlZmVycmVyIHBvbGljeS5cblx0Y29uc3QgcG9saWN5ID0gcmVxdWVzdC5yZWZlcnJlclBvbGljeTtcblxuXHQvLyAyLiBMZXQgZW52aXJvbm1lbnQgYmUgcmVxdWVzdCdzIGNsaWVudC5cblx0Ly8gbm90IGFwcGxpY2FibGUgdG8gbm9kZS5qc1xuXG5cdC8vIDMuIFN3aXRjaCBvbiByZXF1ZXN0J3MgcmVmZXJyZXI6XG5cdGlmIChyZXF1ZXN0LnJlZmVycmVyID09PSAnYWJvdXQ6Y2xpZW50Jykge1xuXHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHR9XG5cblx0Ly8gXCJhIFVSTFwiOiBMZXQgcmVmZXJyZXJTb3VyY2UgYmUgcmVxdWVzdCdzIHJlZmVycmVyLlxuXHRjb25zdCByZWZlcnJlclNvdXJjZSA9IHJlcXVlc3QucmVmZXJyZXI7XG5cblx0Ly8gNC4gTGV0IHJlcXVlc3QncyByZWZlcnJlclVSTCBiZSB0aGUgcmVzdWx0IG9mIHN0cmlwcGluZyByZWZlcnJlclNvdXJjZSBmb3IgdXNlIGFzIGEgcmVmZXJyZXIuXG5cdGxldCByZWZlcnJlclVSTCA9IHN0cmlwVVJMRm9yVXNlQXNBUmVmZXJyZXIocmVmZXJyZXJTb3VyY2UpO1xuXG5cdC8vIDUuIExldCByZWZlcnJlck9yaWdpbiBiZSB0aGUgcmVzdWx0IG9mIHN0cmlwcGluZyByZWZlcnJlclNvdXJjZSBmb3IgdXNlIGFzIGEgcmVmZXJyZXIsIHdpdGggdGhlXG5cdC8vICAgIG9yaWdpbi1vbmx5IGZsYWcgc2V0IHRvIHRydWUuXG5cdGxldCByZWZlcnJlck9yaWdpbiA9IHN0cmlwVVJMRm9yVXNlQXNBUmVmZXJyZXIocmVmZXJyZXJTb3VyY2UsIHRydWUpO1xuXG5cdC8vIDYuIElmIHRoZSByZXN1bHQgb2Ygc2VyaWFsaXppbmcgcmVmZXJyZXJVUkwgaXMgYSBzdHJpbmcgd2hvc2UgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiA0MDk2LCBzZXRcblx0Ly8gICAgcmVmZXJyZXJVUkwgdG8gcmVmZXJyZXJPcmlnaW4uXG5cdGlmIChyZWZlcnJlclVSTC50b1N0cmluZygpLmxlbmd0aCA+IDQwOTYpIHtcblx0XHRyZWZlcnJlclVSTCA9IHJlZmVycmVyT3JpZ2luO1xuXHR9XG5cblx0Ly8gNy4gVGhlIHVzZXIgYWdlbnQgTUFZIGFsdGVyIHJlZmVycmVyVVJMIG9yIHJlZmVycmVyT3JpZ2luIGF0IHRoaXMgcG9pbnQgdG8gZW5mb3JjZSBhcmJpdHJhcnlcblx0Ly8gICAgcG9saWN5IGNvbnNpZGVyYXRpb25zIGluIHRoZSBpbnRlcmVzdHMgb2YgbWluaW1pemluZyBkYXRhIGxlYWthZ2UuIEZvciBleGFtcGxlLCB0aGUgdXNlclxuXHQvLyAgICBhZ2VudCBjb3VsZCBzdHJpcCB0aGUgVVJMIGRvd24gdG8gYW4gb3JpZ2luLCBtb2RpZnkgaXRzIGhvc3QsIHJlcGxhY2UgaXQgd2l0aCBhbiBlbXB0eVxuXHQvLyAgICBzdHJpbmcsIGV0Yy5cblx0aWYgKHJlZmVycmVyVVJMQ2FsbGJhY2spIHtcblx0XHRyZWZlcnJlclVSTCA9IHJlZmVycmVyVVJMQ2FsbGJhY2socmVmZXJyZXJVUkwpO1xuXHR9XG5cblx0aWYgKHJlZmVycmVyT3JpZ2luQ2FsbGJhY2spIHtcblx0XHRyZWZlcnJlck9yaWdpbiA9IHJlZmVycmVyT3JpZ2luQ2FsbGJhY2socmVmZXJyZXJPcmlnaW4pO1xuXHR9XG5cblx0Ly8gOC5FeGVjdXRlIHRoZSBzdGF0ZW1lbnRzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHZhbHVlIG9mIHBvbGljeTpcblx0Y29uc3QgY3VycmVudFVSTCA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xuXG5cdHN3aXRjaCAocG9saWN5KSB7XG5cdFx0Y2FzZSAnbm8tcmVmZXJyZXInOlxuXHRcdFx0cmV0dXJuICduby1yZWZlcnJlcic7XG5cblx0XHRjYXNlICdvcmlnaW4nOlxuXHRcdFx0cmV0dXJuIHJlZmVycmVyT3JpZ2luO1xuXG5cdFx0Y2FzZSAndW5zYWZlLXVybCc6XG5cdFx0XHRyZXR1cm4gcmVmZXJyZXJVUkw7XG5cblx0XHRjYXNlICdzdHJpY3Qtb3JpZ2luJzpcblx0XHRcdC8vIDEuIElmIHJlZmVycmVyVVJMIGlzIGEgcG90ZW50aWFsbHkgdHJ1c3R3b3J0aHkgVVJMIGFuZCByZXF1ZXN0J3MgY3VycmVudCBVUkwgaXMgbm90IGFcblx0XHRcdC8vICAgIHBvdGVudGlhbGx5IHRydXN0d29ydGh5IFVSTCwgdGhlbiByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdFx0XHRpZiAoaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KHJlZmVycmVyVVJMKSAmJiAhaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KGN1cnJlbnRVUkwpKSB7XG5cdFx0XHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAyLiBSZXR1cm4gcmVmZXJyZXJPcmlnaW4uXG5cdFx0XHRyZXR1cm4gcmVmZXJyZXJPcmlnaW4udG9TdHJpbmcoKTtcblxuXHRcdGNhc2UgJ3N0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nOlxuXHRcdFx0Ly8gMS4gSWYgdGhlIG9yaWdpbiBvZiByZWZlcnJlclVSTCBhbmQgdGhlIG9yaWdpbiBvZiByZXF1ZXN0J3MgY3VycmVudCBVUkwgYXJlIHRoZSBzYW1lLCB0aGVuXG5cdFx0XHQvLyAgICByZXR1cm4gcmVmZXJyZXJVUkwuXG5cdFx0XHRpZiAocmVmZXJyZXJVUkwub3JpZ2luID09PSBjdXJyZW50VVJMLm9yaWdpbikge1xuXHRcdFx0XHRyZXR1cm4gcmVmZXJyZXJVUkw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIDIuIElmIHJlZmVycmVyVVJMIGlzIGEgcG90ZW50aWFsbHkgdHJ1c3R3b3J0aHkgVVJMIGFuZCByZXF1ZXN0J3MgY3VycmVudCBVUkwgaXMgbm90IGFcblx0XHRcdC8vICAgIHBvdGVudGlhbGx5IHRydXN0d29ydGh5IFVSTCwgdGhlbiByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdFx0XHRpZiAoaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KHJlZmVycmVyVVJMKSAmJiAhaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KGN1cnJlbnRVUkwpKSB7XG5cdFx0XHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAzLiBSZXR1cm4gcmVmZXJyZXJPcmlnaW4uXG5cdFx0XHRyZXR1cm4gcmVmZXJyZXJPcmlnaW47XG5cblx0XHRjYXNlICdzYW1lLW9yaWdpbic6XG5cdFx0XHQvLyAxLiBJZiB0aGUgb3JpZ2luIG9mIHJlZmVycmVyVVJMIGFuZCB0aGUgb3JpZ2luIG9mIHJlcXVlc3QncyBjdXJyZW50IFVSTCBhcmUgdGhlIHNhbWUsIHRoZW5cblx0XHRcdC8vICAgIHJldHVybiByZWZlcnJlclVSTC5cblx0XHRcdGlmIChyZWZlcnJlclVSTC5vcmlnaW4gPT09IGN1cnJlbnRVUkwub3JpZ2luKSB7XG5cdFx0XHRcdHJldHVybiByZWZlcnJlclVSTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gMi4gUmV0dXJuIG5vIHJlZmVycmVyLlxuXHRcdFx0cmV0dXJuICduby1yZWZlcnJlcic7XG5cblx0XHRjYXNlICdvcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nOlxuXHRcdFx0Ly8gMS4gSWYgdGhlIG9yaWdpbiBvZiByZWZlcnJlclVSTCBhbmQgdGhlIG9yaWdpbiBvZiByZXF1ZXN0J3MgY3VycmVudCBVUkwgYXJlIHRoZSBzYW1lLCB0aGVuXG5cdFx0XHQvLyAgICByZXR1cm4gcmVmZXJyZXJVUkwuXG5cdFx0XHRpZiAocmVmZXJyZXJVUkwub3JpZ2luID09PSBjdXJyZW50VVJMLm9yaWdpbikge1xuXHRcdFx0XHRyZXR1cm4gcmVmZXJyZXJVUkw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiByZWZlcnJlck9yaWdpbi5cblx0XHRcdHJldHVybiByZWZlcnJlck9yaWdpbjtcblxuXHRcdGNhc2UgJ25vLXJlZmVycmVyLXdoZW4tZG93bmdyYWRlJzpcblx0XHRcdC8vIDEuIElmIHJlZmVycmVyVVJMIGlzIGEgcG90ZW50aWFsbHkgdHJ1c3R3b3J0aHkgVVJMIGFuZCByZXF1ZXN0J3MgY3VycmVudCBVUkwgaXMgbm90IGFcblx0XHRcdC8vICAgIHBvdGVudGlhbGx5IHRydXN0d29ydGh5IFVSTCwgdGhlbiByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdFx0XHRpZiAoaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KHJlZmVycmVyVVJMKSAmJiAhaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KGN1cnJlbnRVUkwpKSB7XG5cdFx0XHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAyLiBSZXR1cm4gcmVmZXJyZXJVUkwuXG5cdFx0XHRyZXR1cm4gcmVmZXJyZXJVUkw7XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCByZWZlcnJlclBvbGljeTogJHtwb2xpY3l9YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjLXJlZmVycmVyLXBvbGljeS8jcGFyc2UtcmVmZXJyZXItcG9saWN5LWZyb20taGVhZGVyfFJlZmVycmVyIFBvbGljeSBcdTAwQTc4LjEuIFBhcnNlIGEgcmVmZXJyZXIgcG9saWN5IGZyb20gYSBSZWZlcnJlci1Qb2xpY3kgaGVhZGVyfVxuICogQHBhcmFtIHtIZWFkZXJzfSBoZWFkZXJzIFJlc3BvbnNlIGhlYWRlcnNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBvbGljeVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSZWZlcnJlclBvbGljeUZyb21IZWFkZXIoaGVhZGVycykge1xuXHQvLyAxLiBMZXQgcG9saWN5LXRva2VucyBiZSB0aGUgcmVzdWx0IG9mIGV4dHJhY3RpbmcgaGVhZGVyIGxpc3QgdmFsdWVzIGdpdmVuIGBSZWZlcnJlci1Qb2xpY3lgXG5cdC8vICAgIGFuZCByZXNwb25zZVx1MjAxOXMgaGVhZGVyIGxpc3QuXG5cdGNvbnN0IHBvbGljeVRva2VucyA9IChoZWFkZXJzLmdldCgncmVmZXJyZXItcG9saWN5JykgfHwgJycpLnNwbGl0KC9bLFxcc10rLyk7XG5cblx0Ly8gMi4gTGV0IHBvbGljeSBiZSB0aGUgZW1wdHkgc3RyaW5nLlxuXHRsZXQgcG9saWN5ID0gJyc7XG5cblx0Ly8gMy4gRm9yIGVhY2ggdG9rZW4gaW4gcG9saWN5LXRva2VucywgaWYgdG9rZW4gaXMgYSByZWZlcnJlciBwb2xpY3kgYW5kIHRva2VuIGlzIG5vdCB0aGUgZW1wdHlcblx0Ly8gICAgc3RyaW5nLCB0aGVuIHNldCBwb2xpY3kgdG8gdG9rZW4uXG5cdC8vIE5vdGU6IFRoaXMgYWxnb3JpdGhtIGxvb3BzIG92ZXIgbXVsdGlwbGUgcG9saWN5IHZhbHVlcyB0byBhbGxvdyBkZXBsb3ltZW50IG9mIG5ldyBwb2xpY3lcblx0Ly8gdmFsdWVzIHdpdGggZmFsbGJhY2tzIGZvciBvbGRlciB1c2VyIGFnZW50cywgYXMgZGVzY3JpYmVkIGluIFx1MDBBNyAxMS4xIFVua25vd24gUG9saWN5IFZhbHVlcy5cblx0Zm9yIChjb25zdCB0b2tlbiBvZiBwb2xpY3lUb2tlbnMpIHtcblx0XHRpZiAodG9rZW4gJiYgUmVmZXJyZXJQb2xpY3kuaGFzKHRva2VuKSkge1xuXHRcdFx0cG9saWN5ID0gdG9rZW47XG5cdFx0fVxuXHR9XG5cblx0Ly8gNC4gUmV0dXJuIHBvbGljeS5cblx0cmV0dXJuIHBvbGljeTtcbn1cbiIsICJpbXBvcnQge0ZldGNoQmFzZUVycm9yfSBmcm9tICcuL2Jhc2UuanMnO1xuXG4vKipcbiAqIEFib3J0RXJyb3IgaW50ZXJmYWNlIGZvciBjYW5jZWxsZWQgcmVxdWVzdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEFib3J0RXJyb3IgZXh0ZW5kcyBGZXRjaEJhc2VFcnJvciB7XG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHR5cGUgPSAnYWJvcnRlZCcpIHtcblx0XHRzdXBlcihtZXNzYWdlLCB0eXBlKTtcblx0fVxufVxuIiwgImltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbmV4cG9ydCBlbnVtIFN0YXRlIHtcbiAgQXZhaWxhYmxlID0gXCJhdmFpbGFibGVcIixcbiAgQ3Jhc2hpbmcgPSBcImNyYXNoaW5nXCIsXG4gIENyZWF0aW5nID0gXCJjcmVhdGluZ1wiLFxuICBTdXNwZW5kZWQgPSBcInN1c3BlbmRlZFwiLFxufVxuXG5leHBvcnQgZW51bSBTZXJ2aWNlU3RhdGUge1xuICBBY3RpdmUgPSBcImFjdGl2ZVwiLFxuICBBY3RpdmF0aW5nID0gXCJhY3RpdmF0aW5nXCIsXG4gIFVua25vd24gPSBcInVua25vd25cIixcbn1cblxuZXhwb3J0IGVudW0gU3Bpbkluc3RhbmNlVHlwZSB7XG4gIEluc3RhbmNlID0gXCJJbnN0YW5jZVwiLFxufVxuXG5leHBvcnQgZW51bSBJbnN0YW5jZURhdGFTb3VyY2Uge1xuICBMaXN0ID0gXCJsaXN0XCIsXG4gIFNob3cgPSBcInNob3dcIixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXBvIHtcbiAgbmFtZTogc3RyaW5nO1xuICBicmFuY2g6IHN0cmluZztcbiAgcmVtb3RlX3VybDogc3RyaW5nO1xuICByZXZpc2lvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbmNlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHN1c3BlbmRlZDogYm9vbGVhbjtcbiAgZnFkbjogc3RyaW5nO1xuICBzdGF0dXM6IFN0YXRlO1xuICB0aW1lem9uZT86IHN0cmluZztcbiAgcmVwb3M6IFJlcG9bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaXN0SW5zdGFuY2Uge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcG9zaXRvcmllczogUmVwb1tdO1xuICBzdGF0dXM6IFN0YXRlO1xuICBhZ2U6IHN0cmluZztcbiAgZnFkbjogc3RyaW5nO1xuICBzdXNwZW5kZWQ6IGJvb2xlYW47XG4gIGNyZWF0ZWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTcGluVXJsQ29uZmlnIHtcbiAgZnFkbj86IHN0cmluZztcbiAgdXJsczogU3BpblVybFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNwaW5Vcmwge1xuICBzZXJ2aWNlOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xuICBzaG9ydGN1dD86IEtleWJvYXJkU2hvcnRjdXQ7XG4gIHBvc2l0aW9uPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJbnN0YW5jZURhdGFUeXBlQnlTb3VyY2U8UyBleHRlbmRzIEluc3RhbmNlRGF0YVNvdXJjZT4gPSB7XG4gIFtJbnN0YW5jZURhdGFTb3VyY2UuTGlzdF06IExpc3RJbnN0YW5jZTtcbiAgW0luc3RhbmNlRGF0YVNvdXJjZS5TaG93XTogSW5zdGFuY2U7XG59W1NdO1xuXG5leHBvcnQgdHlwZSBJbnN0YW5jZURhdGFUeXBlcyA9IEluc3RhbmNlIHwgTGlzdEluc3RhbmNlO1xuZXhwb3J0IHR5cGUgU2VydmljZURhdGFUeXBlcyA9IFJlcG87XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BpbkVycm9yIHtcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFNwaW5MaXN0UmVzcG9uc2UgPSBMaXN0SW5zdGFuY2VbXTtcblxuZXhwb3J0IHR5cGUgU3BpblNob3dSZXNwb25zZSA9IEluc3RhbmNlO1xuXG5leHBvcnQgdHlwZSBTcGluQ3JlYXRlUmVzcG9uc2UgPSBJbnN0YW5jZTtcbiIsICJleHBvcnQgY29uc3QgUkVGUkVTSF9JTlRFUlZBTCA9IDEwOyAvLyAxMCBzZWNzXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NRTF9QT1JUID0gMzMwNjtcbiIsICJpbXBvcnQgeyBMaXN0SW5zdGFuY2UgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBpbXBvcnRhbnRTaG9waWZ5U2VydmljZXMgPSBbXCJzaG9waWZ5XCIsIFwid2ViXCJdO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNsdWcge1xuICBvd25lcjogc3RyaW5nO1xuICByZXBvOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBwYXJzZVJlcG9TbHVnID0gKHNsdWc6IHN0cmluZyk6IFNsdWcgPT4ge1xuICBjb25zdCByZXBvc2l0b3J5UGFydHMgPSBzbHVnLnRyaW0oKS5zcGxpdChcIi0tXCIpO1xuXG4gIHJldHVybiByZXBvc2l0b3J5UGFydHMubGVuZ3RoID09PSAxICYmIHJlcG9zaXRvcnlQYXJ0c1swXSAhPT0gXCJcIlxuICAgID8ge1xuICAgICAgICBvd25lcjogXCJTaG9waWZ5XCIsXG4gICAgICAgIHJlcG86IHJlcG9zaXRvcnlQYXJ0c1swXSxcbiAgICAgIH1cbiAgICA6IHtcbiAgICAgICAgb3duZXI6IHJlcG9zaXRvcnlQYXJ0c1swXSxcbiAgICAgICAgcmVwbzogcmVwb3NpdG9yeVBhcnRzWzFdLFxuICAgICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBzbHVnVG9OYW1lID0gKHNsdWc6IFNsdWcpID0+IHtcbiAgcmV0dXJuIGAke3NsdWcub3duZXJ9LS0ke3NsdWcucmVwb31gLnRvTG93ZXJDYXNlKCk7XG59O1xuXG4vLyBzb3J0IGZpcnN0IGlmIGltcG9ydGFudCBhbmQgdGhlbiBhbHBoYWJldGljYWxseVxuZXhwb3J0IGNvbnN0IHNvcnRTaG9waWZ5U2VydmljZU5hbWVzID0gKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiB7XG4gIC8vIHJlbW92ZSB0aGUgYHNob3BpZnktLWAgZnJvbSBgc2hvcGlmeS0td2ViYGBcbiAgY29uc3QgcmVwb0EgPSBwYXJzZVJlcG9TbHVnKGEpLnJlcG87XG4gIGNvbnN0IHJlcG9CID0gcGFyc2VSZXBvU2x1ZyhiKS5yZXBvO1xuXG4gIGNvbnN0IGhhc0EgPSBpbXBvcnRhbnRTaG9waWZ5U2VydmljZXMuaW5kZXhPZihyZXBvQSkgKyAxO1xuICBjb25zdCBoYXNCID0gaW1wb3J0YW50U2hvcGlmeVNlcnZpY2VzLmluZGV4T2YocmVwb0IpICsgMTtcbiAgaWYgKGhhc0EgJiYgaGFzQikgcmV0dXJuIGhhc0EgLSBoYXNCO1xuXG4gIGlmIChoYXNBKSByZXR1cm4gLTE7XG4gIGlmIChoYXNCKSByZXR1cm4gMTtcbiAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzb3J0U3BpbnNCeURhdGUgPSAoYTogTGlzdEluc3RhbmNlLCBiOiBMaXN0SW5zdGFuY2UpID0+ICtuZXcgRGF0ZShiLmNyZWF0ZWQpIC0gK25ldyBEYXRlKGEuY3JlYXRlZCk7XG4iLCAiaW1wb3J0IFNlcnZpY2UgZnJvbSBcIi4vc2VydmljZVwiO1xuXG5pbXBvcnQgdHlwZSB7IFJlcG8gYXMgUmVwb0RhdGEgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IEluc3RhbmNlIH0gZnJvbSBcIi4uL3NwaW4tdHlwZVwiO1xuaW1wb3J0IHsgc3BpblNlcnZpY2VTdGF0dXMgfSBmcm9tIFwiLi4vaGVscGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnN0YW5jZVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlPFJlcG9EYXRhLCBJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihkYXRhOiBSZXBvRGF0YSwgc3BpbjogSW5zdGFuY2UpIHtcbiAgICBzdXBlcihkYXRhLCBzcGluKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZnFkbigpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zbHVnLnJlcG99LiR7dGhpcy5zcGluLmRhdGEuZnFkbn1gO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBzcGluU2VydmljZVN0YXR1cyh0aGlzLnNwaW4sIHRoaXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHNxbFBvcnQoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBzbHVnID0gdGhpcy5uYW1lO1xuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi9ibG9iL21hc3Rlci9kb2NzL2lzb3NwaW4vY29uY2VwdC5tZCNwb3J0LXNlbGVjdGlvblxuICAgIGNvbnN0IHBvcnROdW1iZXJDbWQgPSBhd2FpdCB0aGlzLnNwaW4uc2hlbGxDb21tYW5kKGBjYXQgL3J1bi9wb3J0cy8ke3NsdWd9L3N2Yy9teXNxbGApLmNhdGNoKChlKSA9PiBlKTtcblxuICAgIGlmICghcG9ydE51bWJlckNtZC5zdGRvdXQgfHwgaXNOYU4ocG9ydE51bWJlckNtZC5zdGRvdXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb3VsZCBub3QgZ2V0IG15c3FsIHBvcnRcIik7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIocG9ydE51bWJlckNtZC5zdGRvdXQpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgc3BpbkNvbW1hbmQgfSBmcm9tIFwiLi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSW5zdGFuY2VEYXRhVHlwZXMsIFN0YXRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZpY2VUeXBlcyB9IGZyb20gXCIuLi9zZXJ2aWNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFNwaW48RCBleHRlbmRzIEluc3RhbmNlRGF0YVR5cGVzLCBTIGV4dGVuZHMgU2VydmljZVR5cGVzPiB7XG4gIHB1YmxpYyBkYXRhOiBEO1xuXG4gIHB1YmxpYyBzZXJ2aWNlczogU1tdO1xuXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBmcWRuOiBzdHJpbmc7XG4gIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGVkPzogRGF0ZTtcblxuICBwdWJsaWMgYWJzdHJhY3Qgc2VydmljZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGFic3RyYWN0IHN0YXRlOiBTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBEKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLmZxZG4gPSBkYXRhLmZxZG47XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHRoaXMuZ2V0U2VydmljZXMoZGF0YSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0U2VydmljZXMoZGF0YTogRCk6IFNbXTtcblxuICAvLyBwdWJsaWMgYXN5bmMgdXNlKCkge1xuICAvLyAgIGF3YWl0IGV4ZWNwKGBzcGluIHVzZSAke3RoaXMubmFtZX1gKTtcbiAgLy8gfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGNvbnN0IGRlc3Ryb3kgPSAoYXdhaXQgc3BpbkNvbW1hbmQoYGRlc3Ryb3lgLCB0aGlzLm5hbWUsIHRydWUpKS5zdGRvdXQ7XG4gICAgY29uc3QgZGVzdHJveVJlc3AgPSBKU09OLnBhcnNlKGRlc3Ryb3kpO1xuICAgIHJldHVybiBkZXN0cm95UmVzcDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaGVsbENvbW1hbmQoY21kOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYXdhaXQgc3BpbkNvbW1hbmQoYHNoZWxsIC0tIFwiJHtjbWR9XCJgLCB0aGlzLm5hbWUsIGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRTc2hDb21tYW5kKCkge1xuICAgIHJldHVybiAoYXdhaXQgc3BpbkNvbW1hbmQoXCJzaGVsbCAtLXNob3dcIiwgdGhpcy5uYW1lLCBmYWxzZSkpLnN0ZG91dDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBoYXNTZXJ2aWNlKG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgcHVibGljIGlzUmVhZHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IFN0YXRlLkF2YWlsYWJsZTtcbiAgfVxufVxuIiwgImltcG9ydCBTcGluIGZyb20gXCIuL3NwaW5cIjtcblxuaW1wb3J0IHtcbiAgSW5zdGFuY2UgYXMgSW5zdGFuY2VUeXBlLFxuICBMaXN0SW5zdGFuY2UgYXMgTGlzdEluc3RhbmNlVHlwZSxcbiAgSW5zdGFuY2VEYXRhVHlwZXMsXG4gIFNwaW5VcmwsXG4gIFNwaW5VcmxDb25maWcsXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgSW5zdGFuY2VTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VcIjtcbmltcG9ydCB7IHNvcnRTaG9waWZ5U2VydmljZU5hbWVzIH0gZnJvbSBcIi4uL3V0aWxcIjtcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBmZXRjaFVuYXV0aG9yaXplZCB9IGZyb20gXCIuLi9oZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc3RhbmNlIGV4dGVuZHMgU3BpbjxJbnN0YW5jZURhdGFUeXBlcywgSW5zdGFuY2VTZXJ2aWNlPiB7XG4gIGNvbnN0cnVjdG9yKGRhdGE6IEluc3RhbmNlRGF0YVR5cGVzKSB7XG4gICAgc3VwZXIoZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNyZWF0ZWQoKSB7XG4gICAgY29uc3QgY3JlYXRpb25UaW1lID0gKHRoaXMuZGF0YSBhcyBMaXN0SW5zdGFuY2VUeXBlKS5jcmVhdGVkIHx8ICh0aGlzLmRhdGEgYXMgSW5zdGFuY2VUeXBlKS5jcmVhdGVkX2F0O1xuICAgIGlmIChjcmVhdGlvblRpbWUpIHJldHVybiBuZXcgRGF0ZShjcmVhdGlvblRpbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5kYXRhLnN1c3BlbmRlZCkgcmV0dXJuIFN0YXRlLlN1c3BlbmRlZDtcbiAgICByZXR1cm4gdGhpcy5kYXRhLnN0YXR1cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMubWFwKCh7IHNsdWc6IHsgcmVwbyB9IH0pID0+IHJlcG8pLmpvaW4oXCIsIFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNTZXJ2aWNlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLnNvbWUoKHNlcnZpY2UpID0+IHNlcnZpY2Uuc2x1Zy5yZXBvID09PSBuYW1lKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZXJ2aWNlcyhkYXRhOiBJbnN0YW5jZURhdGFUeXBlcykge1xuICAgIGNvbnN0IHJlcG9zID0gKChkYXRhIGFzIEluc3RhbmNlVHlwZSk/LnJlcG9zIHx8IChkYXRhIGFzIExpc3RJbnN0YW5jZVR5cGUpPy5yZXBvc2l0b3JpZXMpID8/IFtdO1xuICAgIHJlcG9zLnNvcnQoKHsgbmFtZTogYSB9LCB7IG5hbWU6IGIgfSkgPT4gc29ydFNob3BpZnlTZXJ2aWNlTmFtZXMoYSwgYikpO1xuICAgIHJldHVybiByZXBvcy5tYXAoKHJlcG8pID0+IG5ldyBJbnN0YW5jZVNlcnZpY2UocmVwbywgdGhpcykpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFNwaW5VcmxzKCk6IFByb21pc2U8U3BpblVybENvbmZpZz4ge1xuICAgIGxldCB1cmxzOiBTcGluVXJsW10gPSBbXTtcblxuICAgIC8vIGRlZmF1bHQgdXJsc1xuICAgIGlmICh0aGlzLmhhc1NlcnZpY2UoXCJzaG9waWZ5XCIpKSB7XG4gICAgICBjb25zdCB7IGZxZG4gfSA9IHRoaXM7XG4gICAgICB1cmxzID0gW1xuICAgICAgICB7IHNlcnZpY2U6IFwiU2hvcGlmeVwiLCB1cmw6IGBodHRwczovL3Nob3AxLnNob3BpZnkuJHtmcWRufS9gIH0sXG4gICAgICAgIHsgc2VydmljZTogXCJTaG9waWZ5IEFkbWluXCIsIHVybDogYGh0dHBzOi8vc2hvcDEuc2hvcGlmeS4ke2ZxZG59L2FkbWluL2AgfSxcbiAgICAgICAgeyBzZXJ2aWNlOiBcIlNlcnZpY2VzIEludGVybmFsXCIsIHVybDogYGh0dHBzOi8vYXBwLnNob3BpZnkuJHtmcWRufS9zZXJ2aWNlcy9pbnRlcm5hbC9gIH0sXG4gICAgICAgIHsgc2VydmljZTogXCJTaG9waWZ5IEdyYXBoaVFMXCIsIHVybDogYGh0dHBzOi8vYXBwLnNob3BpZnkuJHtmcWRufS9zZXJ2aWNlcy9pbnRlcm5hbC9zaG9wcy8xL2dyYXBocWwvYCB9LFxuICAgICAgXTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3Bpbm5lcmFtYVVybCA9IGBodHRwczovL3NwaW5uZXJhbWEuJHt0aGlzLmZxZG59L2FwaS92MS9zcGluL3VybHNgO1xuICAgICAgY29uc3QgcmVzcCA9IChhd2FpdCAoYXdhaXQgZmV0Y2hVbmF1dGhvcml6ZWQoc3Bpbm5lcmFtYVVybCkpLmpzb24oKSkgYXMgeyB1cmxzOiBTcGluVXJsW10gfTtcbiAgICAgIHVybHMgPSByZXNwLnVybHM7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZnFkbjogdGhpcy5mcWRuLFxuICAgICAgdXJsczogdXJscyxcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgSWNvbiwgQWN0aW9uUGFuZWwsIHNob3dUb2FzdCwgQ29sb3IsIHNob3dIVUQsIGNvbmZpcm1BbGVydCwgQWN0aW9uLCBBbGVydCwgVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCB7IFNwaW5UeXBlcywgU2VydmljZVR5cGVzIH0gZnJvbSBcIi4uL2xpYi9zcGluXCI7XG5pbXBvcnQgdXNlU3BpblVybHMgZnJvbSBcIi4uL2hvb2tzL3VzZS1zcGluLXVybHNcIjtcblxuaW1wb3J0IFNwaW5EZXRhaWxzTGlzdCBmcm9tIFwiLi9kZXRhaWxzLWxpc3RcIjtcbmltcG9ydCBTcGluQnJvd3Nlckxpc3QgZnJvbSBcIi4vYnJvd3Nlci1saXN0XCI7XG5cbmltcG9ydCB7IFNwaW5PcGVuVXJsSW5Ccm93c2VyQWN0aW9uIH0gZnJvbSBcIi4vYnJvd3Nlci1saXN0L29wZW4tdXJsLWluLWJyb3dzZXItYWN0aW9uXCI7XG5cbmNvbnN0IHNob3dFcnJvciA9IGFzeW5jIChhY3Rpb246IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgdGl0bGU6IGBDb3VsZCBub3QgJHthY3Rpb259YCxcbiAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICB9KTtcbn07XG5cbmNvbnN0IGVuc3VyZVNwaW5SZWFkeSA9IGFzeW5jIChzcGluOiBTcGluVHlwZXMsIGFjdGlvbjogc3RyaW5nKSA9PiB7XG4gIGlmICghc3Bpbi5pc1JlYWR5KCkpIHtcbiAgICBhd2FpdCBzaG93RXJyb3IoYWN0aW9uLCAnU3RhdHVzIGlzIG5vdCBcImF2YWlsYWJsZVwiJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuaW50ZXJmYWNlIFNwaW5BY3Rpb25Qcm9wcyB7XG4gIHNwaW46IFNwaW5UeXBlcztcbn1cblxuaW50ZXJmYWNlIFNwaW5BY3Rpb25XaXRoU2VydmljZVByb3BzIGV4dGVuZHMgU3BpbkFjdGlvblByb3BzIHtcbiAgc2VydmljZTogU2VydmljZVR5cGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3Bpbk9wZW5BY3Rpb24oeyBzcGluLCBzZXJ2aWNlIH06IFNwaW5BY3Rpb25XaXRoU2VydmljZVByb3BzKSB7XG4gIGNvbnN0IGRvT3BlbiA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoYXdhaXQgZW5zdXJlU3BpblJlYWR5KHNwaW4sIFwib3BlbiBpbiBicm93c2VyXCIpKSB7XG4gICAgICBhd2FpdCBzZXJ2aWNlLm9wZW4oKTtcbiAgICAgIGF3YWl0IHNob3dIVUQoYE9wZW5lZCBcIiR7c2VydmljZS5uYW1lfVwiYCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiA8QWN0aW9uIGljb249e0ljb24uR2xvYmV9IHRpdGxlPXtcIk9wZW4gaW4gQnJvd3NlclwifSBvbkFjdGlvbj17ZG9PcGVufSAvPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5Db2RlQWN0aW9uKHsgc3Bpbiwgc2VydmljZSB9OiBTcGluQWN0aW9uV2l0aFNlcnZpY2VQcm9wcykge1xuICBjb25zdCBhY3Rpb24gPSBcIm9wZW4gaW4gVlNDb2RlXCI7XG4gIGNvbnN0IGRvQ29kZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoYXdhaXQgZW5zdXJlU3BpblJlYWR5KHNwaW4sIGFjdGlvbikpIHtcbiAgICAgIGNvbnN0IGxvYWRpbmdUb2FzdCA9IGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5BbmltYXRlZCxcbiAgICAgICAgdGl0bGU6IFwiT3BlbmluZyB3aXRoIFZTQ29kZS4uLlwiLFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgc2VydmljZS5jb2RlKCk7XG4gICAgICBhd2FpdCBsb2FkaW5nVG9hc3QuaGlkZSgpO1xuICAgICAgaWYgKCFyZXNwLmVycm9yKSB7XG4gICAgICAgIGF3YWl0IHNob3dIVUQoYE9wZW5lZCBWU0NvZGUgZm9yIFwiJHtzZXJ2aWNlLm5hbWV9XCJgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHNob3dFcnJvcihhY3Rpb24sIHJlc3AuZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gPEFjdGlvbiBpY29uPXtJY29uLkhhbW1lcn0gdGl0bGU9e1wiT3BlbiBpbiBWU0NvZGVcIn0gb25BY3Rpb249e2RvQ29kZX0gLz47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPcGVuSW5zb21uaWFBY3Rpb24oeyBzcGluLCBzZXJ2aWNlIH06IFNwaW5BY3Rpb25XaXRoU2VydmljZVByb3BzKSB7XG4gIGNvbnN0IGFjdGlvbiA9IFwib3BlbiBpbiBJbnNvbW5pYVwiO1xuICBjb25zdCBkb0NvZGUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGF3YWl0IGVuc3VyZVNwaW5SZWFkeShzcGluLCBhY3Rpb24pKSB7XG4gICAgICBjb25zdCBsb2FkaW5nVG9hc3QgPSBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuQW5pbWF0ZWQsXG4gICAgICAgIHRpdGxlOiBcIk9wZW5pbmcgd2l0aCBJbnNvbW5pYS4uLlwiLFxuICAgICAgfSk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBzZXJ2aWNlLmluc29tbmlhKCk7XG4gICAgICB9IGNhdGNoIChlOiB1bmtub3duKSB7XG4gICAgICAgIGxldCBtc2c7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIG1zZyA9IGUubWVzc2FnZTtcblxuICAgICAgICBhd2FpdCBsb2FkaW5nVG9hc3QuaGlkZSgpO1xuICAgICAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgICAgIHRpdGxlOiBcIkNvdWxkIG5vdCBvcGVuIEluc29tbmlhXCIsXG4gICAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBzaG93SFVEKGBPcGVuZWQgSW5zb21uaWEgZm9yIFwiJHtzZXJ2aWNlLm5hbWV9XCJgKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QWN0aW9uXG4gICAgICBpY29uPXtcImluc29tbmlhLWxvZ28ucG5nXCJ9XG4gICAgICBzaG9ydGN1dD17eyBtb2RpZmllcnM6IFtcImNtZFwiXSwga2V5OiBcImlcIiB9fVxuICAgICAgdGl0bGU9e1wiT3BlbiBpbiBJbnNvbW5pYVwifVxuICAgICAgb25BY3Rpb249e2RvQ29kZX1cbiAgICAvPlxuICApO1xufVxuXG5pbnRlcmZhY2UgU3BpbkRlc3Ryb3lBY3Rpb25Qcm9wcyBleHRlbmRzIFNwaW5BY3Rpb25Qcm9wcyB7XG4gIG9uRGVzdHJveTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5EZXN0cm95QWN0aW9uKHsgc3Bpbiwgb25EZXN0cm95IH06IFNwaW5EZXN0cm95QWN0aW9uUHJvcHMpIHtcbiAgY29uc3QgZG9EZXN0cm95ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGFsZXJ0T3B0aW9uczogQWxlcnQuT3B0aW9ucyA9IHtcbiAgICAgIHRpdGxlOiBcIkRlc3Ryb3kgU3Bpbj9cIixcbiAgICAgIGljb246IHsgc291cmNlOiBJY29uLlRyYXNoLCB0aW50Q29sb3I6IENvbG9yLlJlZCB9LFxuICAgICAgbWVzc2FnZTogYFNwaW4gXCIke3NwaW4ubmFtZX1cIiB3aWxsIGJlIGRlc3Ryb3llZGAsXG4gICAgICBwcmltYXJ5QWN0aW9uOiB7IHRpdGxlOiBcIkRlc3Ryb3lcIiB9LFxuICAgIH07XG4gICAgaWYgKGF3YWl0IGNvbmZpcm1BbGVydChhbGVydE9wdGlvbnMpKSB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgc3Bpbi5kZXN0cm95KCk7XG4gICAgICBpZiAoIXJlc3AuZXJyb3IpIHtcbiAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuU3VjY2VzcyxcbiAgICAgICAgICB0aXRsZTogYERlc3Ryb3llZCBTcGluIFwiJHtzcGluLm5hbWV9XCJgLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgb25EZXN0cm95KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBzaG93RXJyb3IoXCJkZXN0cm95IHNwaW5cIiwgcmVzcC5lcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEFjdGlvblxuICAgICAgaWNvbj17eyBzb3VyY2U6IEljb24uVHJhc2gsIHRpbnRDb2xvcjogQ29sb3IuUmVkIH19XG4gICAgICB0aXRsZT17XCJEZXN0cm95IFNwaW5cIn1cbiAgICAgIG9uQWN0aW9uPXtkb0Rlc3Ryb3l9XG4gICAgICBzaG9ydGN1dD17eyBtb2RpZmllcnM6IFtcImNtZFwiXSwga2V5OiBcImRlbGV0ZVwiIH19XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9wZW5TUUxDbGllbnRBY3Rpb24oeyBzZXJ2aWNlIH06IFNwaW5BY3Rpb25XaXRoU2VydmljZVByb3BzKSB7XG4gIGNvbnN0IGRvT3BlbiA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBsb2FkaW5nVG9hc3QgPSBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkFuaW1hdGVkLFxuICAgICAgdGl0bGU6IFwiR2V0dGluZyBNeVNRTCBwb3J0Li4uXCIsXG4gICAgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNlcnZpY2Uub3BlblNxbCgpO1xuICAgIH0gY2F0Y2ggKGU6IHVua25vd24pIHtcbiAgICAgIGxldCBtc2c7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSBtc2cgPSBlLm1lc3NhZ2U7XG5cbiAgICAgIGF3YWl0IGxvYWRpbmdUb2FzdC5oaWRlKCk7XG4gICAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgICAgdGl0bGU6IFwiQ291bGQgbm90IG9wZW4gU1FMIGNsaWVudFwiLFxuICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgc2hvd0hVRChgT3BlbmVkIFNRTCBDbGllbnQgZm9yIFwiJHtzZXJ2aWNlLm5hbWV9XCJgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBY3Rpb25cbiAgICAgIGljb249e1wic2VxdWVsX2FjZS5wbmdcIn1cbiAgICAgIHRpdGxlPXtcIk9wZW4gU1FMIENsaWVudFwifVxuICAgICAgb25BY3Rpb249e2RvT3Blbn1cbiAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwic1wiIH19XG4gICAgLz5cbiAgKTtcbn1cblxuaW50ZXJmYWNlIFNwaW5EZXRhaWxzQWN0aW9uc1Byb3BzIGV4dGVuZHMgU3BpbkFjdGlvblByb3BzIHtcbiAgdXBkYXRlTGlzdDogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5EZXRhaWxzQWN0aW9uKHsgc3BpbiB9OiBTcGluRGV0YWlsc0FjdGlvbnNQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxBY3Rpb24uUHVzaFxuICAgICAgaWNvbj17eyBzb3VyY2U6IEljb24uUXVlc3Rpb25NYXJrIH19XG4gICAgICB0aXRsZT17XCJWaWV3IERldGFpbHNcIn1cbiAgICAgIHRhcmdldD17PFNwaW5EZXRhaWxzTGlzdCBzcGluPXtzcGlufSAvPn1cbiAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwiZFwiIH19XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5Ccm93c2VyTGlzdEFjdGlvbih7IHNwaW4gfTogU3BpbkRldGFpbHNBY3Rpb25zUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8QWN0aW9uLlB1c2hcbiAgICAgIHRpdGxlPXtcIlZpZXcgQnJvd3NlciBMaW5rc1wifVxuICAgICAgaWNvbj17SWNvbi5HbG9iZX1cbiAgICAgIHRhcmdldD17PFNwaW5Ccm93c2VyTGlzdCBzcGluPXtzcGlufSAvPn1cbiAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwiYlwiIH19XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5Ccm93c2VyQWN0aW9ucyh7IHNwaW4gfTogU3BpbkFjdGlvblByb3BzKSB7XG4gIGNvbnN0IHsgdXJscyB9ID0gdXNlU3BpblVybHMoc3Bpbik7XG5cbiAgcmV0dXJuIChcbiAgICA8QWN0aW9uUGFuZWwuU2VjdGlvbiB0aXRsZT1cIkJyb3dzZXIgQWN0aW9uc1wiPlxuICAgICAge3VybHMubWFwKCh1cmwpID0+IHtcbiAgICAgICAgcmV0dXJuIDxTcGluT3BlblVybEluQnJvd3NlckFjdGlvbiBrZXk9e2BzZXJ2aWNlLSR7dXJsLnNlcnZpY2V9YH0gdXJsPXt1cmx9IC8+O1xuICAgICAgfSl9XG4gICAgPC9BY3Rpb25QYW5lbC5TZWN0aW9uPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3BpblNoZWxsQWN0aW9uKHsgc3BpbiB9OiBTcGluQWN0aW9uUHJvcHMpIHtcbiAgY29uc3Qgb3BlbldpdGhJdGVybSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29tbWFuZCA9IGBzcGluIHNoZWxsIFxcXFxcIiR7c3Bpbi5uYW1lfVxcXFxcImA7XG4gICAgICBleGVjU3luYyhgXG5vc2FzY3JpcHQgPDxFTkRcbnRlbGwgYXBwbGljYXRpb24gXCJpVGVybVwiXG4gIHNldCBuZXdXaW5kb3cgdG8gKGNyZWF0ZSB3aW5kb3cgd2l0aCBkZWZhdWx0IHByb2ZpbGUpXG4gIHRlbGwgY3VycmVudCBzZXNzaW9uIG9mIG5ld1dpbmRvd1xuICAgIHdyaXRlIHRleHQgXCIke2NvbW1hbmR9XCJcbiAgZW5kIHRlbGxcbmVuZCB0ZWxsXG5FTkRgKTtcbiAgICAgIGF3YWl0IHNob3dIVUQoXCJPcGVuZWQgaVRlcm1cIik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICAgIHRpdGxlOiBcIkNvdWxkIG5vdCBvcGVuIGlUZXJtXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QWN0aW9uXG4gICAgICBpY29uPXt7IHNvdXJjZTogSWNvbi5UZXJtaW5hbCB9fVxuICAgICAgc2hvcnRjdXQ9e3sgbW9kaWZpZXJzOiBbXCJjbWRcIl0sIGtleTogXCJzXCIgfX1cbiAgICAgIHRpdGxlPXtcIk9wZW4gc2hlbGwgd2l0aCBpVGVybVwifVxuICAgICAgb25BY3Rpb249e29wZW5XaXRoSXRlcm19XG4gICAgLz5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgU3BpblR5cGVzLCBTcGluVXJsIH0gZnJvbSBcIi4uL2xpYi9zcGluXCI7XG5pbXBvcnQgeyBTcGluVXJsQ29uZmlnIH0gZnJvbSBcIi4uL2xpYi9zcGluL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVNwaW5VcmxzKHNwaW4/OiBTcGluVHlwZXMpIHtcbiAgY29uc3QgW3VybHMsIHNldFVybHNdID0gdXNlU3RhdGU8U3BpblVybFtdPihbXSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGZ1bmN0aW9uIGlzU3RvcmVmcm9udFVybChzcGluVXJsOiBTcGluVXJsLCBmcWRuPzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHNwaW5VcmwudXJsID09PSBgaHR0cHM6Ly9zaG9wMS5zaG9waWZ5LiR7ZnFkbn0vYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQWRtaW5Vcmwoc3BpblVybDogU3BpblVybCwgZnFkbj86IHN0cmluZykge1xuICAgIHJldHVybiBzcGluVXJsLnVybC5zdGFydHNXaXRoKGBodHRwczovL3Nob3AxLnNob3BpZnkuJHtmcWRufS9hZG1pbmApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTZXJ2aWNlc0ludGVybmFsVXJsKHNwaW5Vcmw6IFNwaW5VcmwsIGZxZG4/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgc3BpblVybC51cmwuc3RhcnRzV2l0aChgaHR0cHM6Ly9hcHAuc2hvcGlmeS4ke2ZxZG59L3NlcnZpY2VzL2ludGVybmFsYCkgJiZcbiAgICAgICFzcGluVXJsLnVybC5lbmRzV2l0aChcIm1haWxcIikgJiZcbiAgICAgICFzcGluVXJsLnVybC5lbmRzV2l0aChcImdyYXBocWxcIilcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNYWlsUHJldmlld1VybChzcGluVXJsOiBTcGluVXJsLCBmcWRuPzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHNwaW5VcmwudXJsLnN0YXJ0c1dpdGgoYGh0dHBzOi8vYXBwLnNob3BpZnkuJHtmcWRufS9zZXJ2aWNlcy9pbnRlcm5hbC9tYWlsYCk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0dyYXBocWxVcmwoc3BpblVybDogU3BpblVybCwgZnFkbj86IHN0cmluZykge1xuICAgIHJldHVybiBzcGluVXJsLnVybC5zdGFydHNXaXRoKGBodHRwczovL2FwcC5zaG9waWZ5LiR7ZnFkbn0vc2VydmljZXMvaW50ZXJuYWwvc2hvcHMvMS9ncmFwaHFsYCk7XG4gIH1cblxuICBmdW5jdGlvbiBhdWdtZW50VXJscyh1cmxDb25maWc6IFNwaW5VcmxDb25maWcpIHtcbiAgICBjb25zdCBhdWdtZW50ZWRVcmxzID0gdXJsQ29uZmlnLnVybHMubWFwKChzcGluVXJsKSA9PiB7XG4gICAgICBpZiAoaXNTdG9yZWZyb250VXJsKHNwaW5VcmwsIHVybENvbmZpZy5mcWRuKSkge1xuICAgICAgICBjb25zdCBzaG9ydGN1dDogS2V5Ym9hcmQuU2hvcnRjdXQgPSB7XG4gICAgICAgICAgbW9kaWZpZXJzOiBbXCJjbWRcIl0sXG4gICAgICAgICAga2V5OiBcImZcIixcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3BpblVybCwgaWNvbjogXCJzaG9waWZ5LnN2Z1wiLCBzaG9ydGN1dDogc2hvcnRjdXQsIHBvc2l0aW9uOiAxIH07XG4gICAgICB9IGVsc2UgaWYgKGlzQWRtaW5Vcmwoc3BpblVybCwgdXJsQ29uZmlnLmZxZG4pKSB7XG4gICAgICAgIGNvbnN0IHNob3J0Y3V0OiBLZXlib2FyZC5TaG9ydGN1dCA9IHtcbiAgICAgICAgICBtb2RpZmllcnM6IFtcImNtZFwiXSxcbiAgICAgICAgICBrZXk6IFwiblwiLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4geyAuLi5zcGluVXJsLCBpY29uOiBcImFkbWluLnN2Z1wiLCBzaG9ydGN1dDogc2hvcnRjdXQsIHBvc2l0aW9uOiAyIH07XG4gICAgICB9IGVsc2UgaWYgKGlzU2VydmljZXNJbnRlcm5hbFVybChzcGluVXJsLCB1cmxDb25maWcuZnFkbikpIHtcbiAgICAgICAgY29uc3Qgc2hvcnRjdXQ6IEtleWJvYXJkLlNob3J0Y3V0ID0ge1xuICAgICAgICAgIG1vZGlmaWVyczogW1wiY21kXCJdLFxuICAgICAgICAgIGtleTogXCJpXCIsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7IC4uLnNwaW5VcmwsIGljb246IFwibWFnbmlmeWluZ19nbGFzcy5zdmdcIiwgc2hvcnRjdXQ6IHNob3J0Y3V0LCBwb3NpdGlvbjogMyB9O1xuICAgICAgfSBlbHNlIGlmIChpc01haWxQcmV2aWV3VXJsKHNwaW5VcmwsIHVybENvbmZpZy5mcWRuKSkge1xuICAgICAgICBjb25zdCBzaG9ydGN1dDogS2V5Ym9hcmQuU2hvcnRjdXQgPSB7XG4gICAgICAgICAgbW9kaWZpZXJzOiBbXCJjbWRcIl0sXG4gICAgICAgICAga2V5OiBcIm1cIixcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3BpblVybCwgaWNvbjogXCJtYWlsYm94LnN2Z1wiLCBzaG9ydGN1dDogc2hvcnRjdXQsIHBvc2l0aW9uOiA0IH07XG4gICAgICB9IGVsc2UgaWYgKGlzR3JhcGhxbFVybChzcGluVXJsLCB1cmxDb25maWcuZnFkbikpIHtcbiAgICAgICAgY29uc3Qgc2hvcnRjdXQ6IEtleWJvYXJkLlNob3J0Y3V0ID0ge1xuICAgICAgICAgIG1vZGlmaWVyczogW1wiY21kXCJdLFxuICAgICAgICAgIGtleTogXCJnXCIsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7IC4uLnNwaW5VcmwsIGljb246IFwiZ3JhcGhxbC5zdmdcIiwgc2hvcnRjdXQ6IHNob3J0Y3V0LCBwb3NpdGlvbjogNSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3BpblVybCwgcG9zaXRpb246IDYgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBhdWdtZW50ZWRVcmxzLnNvcnQoKGEsIGIpID0+IChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbiA/IDEgOiAtMSkpO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgICAgaWYgKHNwaW4pIHtcbiAgICAgICAgY29uc3QgdXJsQ29uZmlnID0gYXdhaXQgc3Bpbi5nZXRTcGluVXJscygpO1xuICAgICAgICBzZXRVcmxzKGF1Z21lbnRVcmxzKHVybENvbmZpZykpO1xuICAgICAgfVxuXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9KSgpO1xuICB9LCBbc3Bpbl0pO1xuXG4gIHJldHVybiB7IHVybHMsIGxvYWRpbmcgfTtcbn1cbiIsICJpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5pbXBvcnQgdXNlU3BpblVybHMgZnJvbSBcIi4uLy4uL2hvb2tzL3VzZS1zcGluLXVybHNcIjtcbmltcG9ydCB7IFNwaW5UeXBlcyB9IGZyb20gXCIuLi8uLi9saWIvc3BpblwiO1xuXG5pbXBvcnQgU3BpbkJyb3dzZXJMaXN0SXRlbSBmcm9tIFwiLi9icm93c2VyLWxpc3QtaXRlbVwiO1xuXG5pbnRlcmZhY2UgU3BpbkJyb3dzZXJMaXN0UHJvcHMge1xuICBzcGluPzogU3BpblR5cGVzO1xuICBsb2FkaW5nPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3BpbkJyb3dzZXJMaXN0KHsgc3BpbiwgbG9hZGluZyA9IGZhbHNlIH06IFNwaW5Ccm93c2VyTGlzdFByb3BzKSB7XG4gIGNvbnN0IHsgdXJscywgbG9hZGluZzogdXJsc0xvYWRpbmcgfSA9IHVzZVNwaW5VcmxzKHNwaW4pO1xuXG4gIHJldHVybiAoXG4gICAgPExpc3RcbiAgICAgIGlzTG9hZGluZz17bG9hZGluZyB8fCB1cmxzTG9hZGluZ31cbiAgICAgIHsuLi4oc3Bpbj8ubmFtZSAmJiB7IG5hdmlnYXRpb25UaXRsZTogYFNwaW4gXCIke3NwaW4ubmFtZX1cIiBCcm93c2VyIExpbmtzYCB9KX1cbiAgICA+XG4gICAgICB7dXJscy5tYXAoKHVybCkgPT4ge1xuICAgICAgICByZXR1cm4gPFNwaW5Ccm93c2VyTGlzdEl0ZW0ga2V5PXtgaXRlbS0ke3VybC5zZXJ2aWNlfWB9IHVybD17dXJsfSAvPjtcbiAgICAgIH0pfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBMaXN0LCBBY3Rpb24sIEFjdGlvblBhbmVsIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5pbXBvcnQgeyBTcGluVXJsIH0gZnJvbSBcIi4uLy4uL2xpYi9zcGluXCI7XG5cbmltcG9ydCB7IFNwaW5PcGVuVXJsSW5Ccm93c2VyQWN0aW9uIH0gZnJvbSBcIi4vb3Blbi11cmwtaW4tYnJvd3Nlci1hY3Rpb25cIjtcblxuaW50ZXJmYWNlIEJyb3dzZXJMaXN0SXRlbVByb3BzIHtcbiAgdXJsOiBTcGluVXJsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTcGluQnJvd3Nlckxpc3RJdGVtKHsgdXJsIH06IEJyb3dzZXJMaXN0SXRlbVByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPExpc3QuSXRlbVxuICAgICAgdGl0bGU9e3VybC5zZXJ2aWNlfVxuICAgICAga2V5PXtgc2VydmljZS0ke3VybC5zZXJ2aWNlfWB9XG4gICAgICB7Li4uKHVybC5pY29uICYmIHsgaWNvbjogdXJsLmljb24gfSl9XG4gICAgICBhY3Rpb25zPXtcbiAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgIDxTcGluT3BlblVybEluQnJvd3NlckFjdGlvbiBrZXk9e2BzZXJ2aWNlLSR7dXJsLnNlcnZpY2V9YH0gdXJsPXt1cmx9IC8+XG4gICAgICAgICAgPEFjdGlvbi5Db3B5VG9DbGlwYm9hcmQgdGl0bGU9XCJDb3B5IFVSTCB0byBDbGlwYm9hcmRcIiBjb250ZW50PXt1cmwudXJsfSAvPlxuICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgfVxuICAgIC8+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5pbXBvcnQgeyBTcGluVXJsIH0gZnJvbSBcIi4uLy4uL2xpYi9zcGluXCI7XG5cbmludGVyZmFjZSBTcGluT3BlblVybEluQnJvd3NlckFjdGlvblByb3BzIHtcbiAgdXJsOiBTcGluVXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3Bpbk9wZW5VcmxJbkJyb3dzZXJBY3Rpb24oeyB1cmwgfTogU3Bpbk9wZW5VcmxJbkJyb3dzZXJBY3Rpb25Qcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxBY3Rpb24uT3BlbkluQnJvd3NlclxuICAgICAgdGl0bGU9e2BPcGVuICR7dXJsLnNlcnZpY2V9YH1cbiAgICAgIHVybD17dXJsLnVybH1cbiAgICAgIHsuLi4odXJsLnNob3J0Y3V0ICYmIHsgc2hvcnRjdXQ6IHVybC5zaG9ydGN1dCB9KX1cbiAgICAgIHsuLi4odXJsLmljb24gJiYgeyBpY29uOiB1cmwuaWNvbiB9KX1cbiAgICAvPlxuICApO1xufVxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgc2hvd1RvYXN0LCB1c2VOYXZpZ2F0aW9uLCBUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcblxuaW1wb3J0IHsgU3BpblR5cGVzLCBJbnN0YW5jZSwgc3BpblNob3csIFNwaW5TaG93UmVzcG9uc2UsIFNwaW5FcnJvciB9IGZyb20gXCIuLi9saWIvc3BpblwiO1xuaW1wb3J0IHsgUkVGUkVTSF9JTlRFUlZBTCB9IGZyb20gXCIuLi9saWIvc3Bpbi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlU3BpblNob3coaW5zdGFuY2U/OiBzdHJpbmcsIGxhdGVzdD86IGJvb2xlYW4pIHtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtzcGluRGF0YSwgc2V0U3BpbkRhdGFdID0gdXNlU3RhdGU8U3BpblR5cGVzPigpO1xuXG4gIGNvbnN0IHsgcG9wIH0gPSB1c2VOYXZpZ2F0aW9uKCk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZXJyb3JBbmRRdWl0KG1zZz86IHN0cmluZykge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBcIkNvdWxkIG5vdCBnZXQgZGF0YVwiLFxuICAgICAgbWVzc2FnZTogbXNnID8/IFwiXCIsXG4gICAgfSk7XG4gICAgLy8gcG9wIHRoZSBjdXJyZW50IHZpZXcgb2ZmIG9mIHRoZSBzdGFja1xuICAgIHBvcCgpO1xuICB9XG5cbiAgY29uc3QgdXBkYXRlU3BpblNob3cgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgIGxldCBzcGluU2hvd1Jlc3BvbnNlOiBTcGluU2hvd1Jlc3BvbnNlIHwgdW5kZWZpbmVkO1xuICAgIHRyeSB7XG4gICAgICBzcGluU2hvd1Jlc3BvbnNlID0gYXdhaXQgc3BpblNob3coaW5zdGFuY2UsIGxhdGVzdCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYXdhaXQgZXJyb3JBbmRRdWl0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKChzcGluU2hvd1Jlc3BvbnNlIGFzIFNwaW5FcnJvcikuZXJyb3IpIHtcbiAgICAgIGF3YWl0IGVycm9yQW5kUXVpdCgoc3BpblNob3dSZXNwb25zZSBhcyBTcGluRXJyb3IpPy5lcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0U3BpbkRhdGEobmV3IEluc3RhbmNlKHNwaW5TaG93UmVzcG9uc2UpKTtcblxuICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB1cGRhdGVTcGluU2hvdygpLCAxMDAwICogUkVGUkVTSF9JTlRFUlZBTCk7XG4gICAgdXBkYXRlU3BpblNob3coKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHsgbG9hZGluZywgZGF0YTogc3BpbkRhdGEsIHVwZGF0ZTogdXBkYXRlU3BpblNob3cgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxZQUFNLGlCQUNKLE9BQU8sV0FBVyxjQUFjLE9BQU8sT0FBTyxhQUFhLFdBQ3pELFNBQ0EsaUJBQWUsVUFBVTt1QkNIVDtBQUNsQixlQUFPOztBQUdULDRCQUFtQjtBQUNqQixZQUFJLE9BQU8sU0FBUyxhQUFhO0FBQy9CLGlCQUFPO21CQUNFLE9BQU8sV0FBVyxhQUFhO0FBQ3hDLGlCQUFPO21CQUNFLE9BQU8sV0FBVyxhQUFhO0FBQ3hDLGlCQUFPOztBQUVULGVBQU87O0FBR0YsWUFBTSxVQUFVOzRCQ2RNLElBQU07QUFDakMsZUFBUSxPQUFPLE9BQU0sWUFBWSxPQUFNLFFBQVMsT0FBTyxPQUFNOztBQUd4RCxZQUFNLGlDQVVQO0FDYk4sWUFBTSxrQkFBa0I7QUFDeEIsWUFBTSxzQkFBc0IsUUFBUSxVQUFVO0FBQzlDLFlBQU0seUJBQXlCLFFBQVEsUUFBUSxLQUFLO0FBQ3BELFlBQU0sd0JBQXdCLFFBQVEsT0FBTyxLQUFLOzBCQUVwQixVQUdyQjtBQUNQLGVBQU8sSUFBSSxnQkFBZ0I7O21DQUdVLE9BQXlCO0FBQzlELGVBQU8sdUJBQXVCOzttQ0FHZSxRQUFXO0FBQ3hELGVBQU8sc0JBQXNCOztrQ0FJN0IsU0FDQSxhQUNBLFlBQThEO0FBRzlELGVBQU8sb0JBQW9CLEtBQUssU0FBUyxhQUFhOzsyQkFJdEQsU0FDQSxhQUNBLFlBQXNEO0FBQ3RELDJCQUNFLG1CQUFtQixTQUFTLGFBQWEsYUFDekMsUUFDQTs7K0JBSStCLFNBQXFCLGFBQW1EO0FBQ3pHLG9CQUFZLFNBQVM7OzZCQUdPLFNBQTJCLFlBQXFEO0FBQzVHLG9CQUFZLFNBQVMsUUFBVzs7b0NBSWhDLFNBQ0Esb0JBQ0Esa0JBQW9FO0FBQ3BFLGVBQU8sbUJBQW1CLFNBQVMs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
