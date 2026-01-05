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

// src/list.tsx
var list_exports = {};
__export(list_exports, {
  default: () => SpinList
});
var import_api11 = require("@raycast/api");

// src/components/list-item/list-item.tsx
var import_api9 = require("@raycast/api");

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
function iconFromSpinState(state) {
  switch (state) {
    case "available" /* Available */: {
      return { source: import_api.Icon.Dot, tintColor: import_api.Color.Green };
    }
    case "creating" /* Creating */: {
      return { source: import_api.Icon.Dot, tintColor: import_api.Color.Blue };
    }
    case "suspended" /* Suspended */: {
      return { source: import_api.Icon.ExclamationMark, tintColor: import_api.Color.Orange };
    }
    case "crashing" /* Crashing */: {
      return { source: import_api.Icon.ExclamationMark, tintColor: import_api.Color.Red };
    }
  }
}
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
async function spinList() {
  const list = (await spinCommand("list --all")).stdout;
  const listContent = JSON.parse(list);
  return listContent;
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
var sortSpinsByDate = (a, b) => +new Date(b.created) - +new Date(a.created);

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
var import_api8 = require("@raycast/api");
var import_child_process2 = require("child_process");

// src/hooks/use-spin-urls.ts
var import_react = require("react");
function useSpinUrls(spin) {
  const [urls, setUrls] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(true);
  function isStorefrontUrl(spinUrl, fqdn) {
    return spinUrl.url === `https://shop1.shopify.${fqdn}/`;
  }
  function isAdminUrl(spinUrl, fqdn) {
    return spinUrl.url.startsWith(`https://shop1.shopify.${fqdn}/admin`);
  }
  function isServicesInternalUrl(spinUrl, fqdn) {
    return spinUrl.url.startsWith(`https://app.shopify.${fqdn}/services/internal`) && !spinUrl.url.endsWith("mail") && !spinUrl.url.endsWith("graphql");
  }
  function isMailPreviewUrl(spinUrl, fqdn) {
    return spinUrl.url.startsWith(`https://app.shopify.${fqdn}/services/internal/mail`);
  }
  function isGraphqlUrl(spinUrl, fqdn) {
    return spinUrl.url.startsWith(`https://app.shopify.${fqdn}/services/internal/shops/1/graphql`);
  }
  function augmentUrls(urlConfig) {
    const augmentedUrls = urlConfig.urls.map((spinUrl) => {
      if (isStorefrontUrl(spinUrl, urlConfig.fqdn)) {
        const shortcut = {
          modifiers: ["cmd"],
          key: "f"
        };
        return __spreadProps(__spreadValues({}, spinUrl), { icon: "shopify.svg", shortcut, position: 1 });
      } else if (isAdminUrl(spinUrl, urlConfig.fqdn)) {
        const shortcut = {
          modifiers: ["cmd"],
          key: "n"
        };
        return __spreadProps(__spreadValues({}, spinUrl), { icon: "admin.svg", shortcut, position: 2 });
      } else if (isServicesInternalUrl(spinUrl, urlConfig.fqdn)) {
        const shortcut = {
          modifiers: ["cmd"],
          key: "i"
        };
        return __spreadProps(__spreadValues({}, spinUrl), { icon: "magnifying_glass.svg", shortcut, position: 3 });
      } else if (isMailPreviewUrl(spinUrl, urlConfig.fqdn)) {
        const shortcut = {
          modifiers: ["cmd"],
          key: "m"
        };
        return __spreadProps(__spreadValues({}, spinUrl), { icon: "mailbox.svg", shortcut, position: 4 });
      } else if (isGraphqlUrl(spinUrl, urlConfig.fqdn)) {
        const shortcut = {
          modifiers: ["cmd"],
          key: "g"
        };
        return __spreadProps(__spreadValues({}, spinUrl), { icon: "graphql.svg", shortcut, position: 5 });
      } else {
        return __spreadProps(__spreadValues({}, spinUrl), { position: 6 });
      }
    });
    return augmentedUrls.sort((a, b) => a.position > b.position ? 1 : -1);
  }
  (0, import_react.useEffect)(() => {
    (async () => {
      setLoading(true);
      if (spin) {
        const urlConfig = await spin.getSpinUrls();
        setUrls(augmentUrls(urlConfig));
      }
      setLoading(false);
    })();
  }, [spin]);
  return { urls, loading };
}

// src/components/details-list/details-list.tsx
var import_api4 = require("@raycast/api");

// src/components/details-list/details-list-item.tsx
var import_react2 = require("react");
var import_api3 = require("@raycast/api");
function SpinDetailsListItem({ spin, service }) {
  const subtitle = service.branch;
  const [status, setStatus] = (0, import_react2.useState)();
  (0, import_react2.useEffect)(() => {
    (async () => {
      setStatus(await service.getState());
    })();
  }, []);
  return /* @__PURE__ */ _jsx(import_api3.List.Item, __spreadProps(__spreadValues({
    title: service.name,
    subtitle
  }, status && { accessoryTitle: status, accessoryIcon: iconFromSpinServiceState(status) }), {
    actions: /* @__PURE__ */ _jsx(import_api3.ActionPanel, null, /* @__PURE__ */ _jsx(SpinCodeAction, {
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
  return /* @__PURE__ */ _jsx(import_api4.List, __spreadProps(__spreadValues({}, spin?.name && { navigationTitle: `Spin "${spin.name}"` }), {
    isLoading: loading
  }), (spin?.services ?? []).map((service) => /* @__PURE__ */ _jsx(SpinDetailsListItem, {
    key: service.name,
    spin,
    service
  })));
}

// src/components/browser-list/browser-list.tsx
var import_api7 = require("@raycast/api");

// src/components/browser-list/browser-list-item.tsx
var import_api6 = require("@raycast/api");

// src/components/browser-list/open-url-in-browser-action.tsx
var import_api5 = require("@raycast/api");
function SpinOpenUrlInBrowserAction({ url }) {
  return /* @__PURE__ */ _jsx(import_api5.Action.OpenInBrowser, __spreadValues(__spreadValues({
    title: `Open ${url.service}`,
    url: url.url
  }, url.shortcut && { shortcut: url.shortcut }), url.icon && { icon: url.icon }));
}

// src/components/browser-list/browser-list-item.tsx
function SpinBrowserListItem({ url }) {
  return /* @__PURE__ */ _jsx(import_api6.List.Item, __spreadProps(__spreadValues({
    title: url.service,
    key: `service-${url.service}`
  }, url.icon && { icon: url.icon }), {
    actions: /* @__PURE__ */ _jsx(import_api6.ActionPanel, null, /* @__PURE__ */ _jsx(SpinOpenUrlInBrowserAction, {
      key: `service-${url.service}`,
      url
    }), /* @__PURE__ */ _jsx(import_api6.Action.CopyToClipboard, {
      title: "Copy URL to Clipboard",
      content: url.url
    }))
  }));
}

// src/components/browser-list/browser-list.tsx
function SpinBrowserList({ spin, loading = false }) {
  const { urls, loading: urlsLoading } = useSpinUrls(spin);
  return /* @__PURE__ */ _jsx(import_api7.List, __spreadValues({
    isLoading: loading || urlsLoading
  }, spin?.name && { navigationTitle: `Spin "${spin.name}" Browser Links` }), urls.map((url) => {
    return /* @__PURE__ */ _jsx(SpinBrowserListItem, {
      key: `item-${url.service}`,
      url
    });
  }));
}

// src/components/actions.tsx
var showError = async (action, message) => {
  await (0, import_api8.showToast)({
    style: import_api8.Toast.Style.Failure,
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
      await (0, import_api8.showHUD)(`Opened "${service.name}"`);
    }
  };
  return /* @__PURE__ */ _jsx(import_api8.Action, {
    icon: import_api8.Icon.Globe,
    title: "Open in Browser",
    onAction: doOpen
  });
}
function SpinCodeAction({ spin, service }) {
  const action = "open in VSCode";
  const doCode = async () => {
    if (await ensureSpinReady(spin, action)) {
      const loadingToast = await (0, import_api8.showToast)({
        style: import_api8.Toast.Style.Animated,
        title: "Opening with VSCode..."
      });
      const resp = await service.code();
      await loadingToast.hide();
      if (!resp.error) {
        await (0, import_api8.showHUD)(`Opened VSCode for "${service.name}"`);
      } else {
        await showError(action, resp.error);
      }
    }
  };
  return /* @__PURE__ */ _jsx(import_api8.Action, {
    icon: import_api8.Icon.Hammer,
    title: "Open in VSCode",
    onAction: doCode
  });
}
function OpenInsomniaAction({ spin, service }) {
  const action = "open in Insomnia";
  const doCode = async () => {
    if (await ensureSpinReady(spin, action)) {
      const loadingToast = await (0, import_api8.showToast)({
        style: import_api8.Toast.Style.Animated,
        title: "Opening with Insomnia..."
      });
      try {
        await service.insomnia();
      } catch (e2) {
        let msg;
        if (e2 instanceof Error)
          msg = e2.message;
        await loadingToast.hide();
        await (0, import_api8.showToast)({
          style: import_api8.Toast.Style.Failure,
          title: "Could not open Insomnia",
          message: msg
        });
        return;
      }
      await (0, import_api8.showHUD)(`Opened Insomnia for "${service.name}"`);
    }
  };
  return /* @__PURE__ */ _jsx(import_api8.Action, {
    icon: "insomnia-logo.png",
    shortcut: { modifiers: ["cmd"], key: "i" },
    title: "Open in Insomnia",
    onAction: doCode
  });
}
function SpinDestroyAction({ spin, onDestroy }) {
  const doDestroy = async () => {
    const alertOptions = {
      title: "Destroy Spin?",
      icon: { source: import_api8.Icon.Trash, tintColor: import_api8.Color.Red },
      message: `Spin "${spin.name}" will be destroyed`,
      primaryAction: { title: "Destroy" }
    };
    if (await (0, import_api8.confirmAlert)(alertOptions)) {
      const resp = await spin.destroy();
      if (!resp.error) {
        await (0, import_api8.showToast)({
          style: import_api8.Toast.Style.Success,
          title: `Destroyed Spin "${spin.name}"`
        });
        await onDestroy();
      } else {
        await showError("destroy spin", resp.error);
      }
    }
  };
  return /* @__PURE__ */ _jsx(import_api8.Action, {
    icon: { source: import_api8.Icon.Trash, tintColor: import_api8.Color.Red },
    title: "Destroy Spin",
    onAction: doDestroy,
    shortcut: { modifiers: ["cmd"], key: "delete" }
  });
}
function OpenSQLClientAction({ service }) {
  const doOpen = async () => {
    const loadingToast = await (0, import_api8.showToast)({
      style: import_api8.Toast.Style.Animated,
      title: "Getting MySQL port..."
    });
    try {
      await service.openSql();
    } catch (e2) {
      let msg;
      if (e2 instanceof Error)
        msg = e2.message;
      await loadingToast.hide();
      await (0, import_api8.showToast)({
        style: import_api8.Toast.Style.Failure,
        title: "Could not open SQL client",
        message: msg
      });
      return;
    }
    await (0, import_api8.showHUD)(`Opened SQL Client for "${service.name}"`);
  };
  return /* @__PURE__ */ _jsx(import_api8.Action, {
    icon: "sequel_ace.png",
    title: "Open SQL Client",
    onAction: doOpen,
    shortcut: { modifiers: ["cmd"], key: "s" }
  });
}
function SpinDetailsAction({ spin }) {
  return /* @__PURE__ */ _jsx(import_api8.Action.Push, {
    icon: { source: import_api8.Icon.QuestionMark },
    title: "View Details",
    target: /* @__PURE__ */ _jsx(SpinDetailsList, {
      spin
    }),
    shortcut: { modifiers: ["cmd"], key: "d" }
  });
}
function SpinBrowserListAction({ spin }) {
  return /* @__PURE__ */ _jsx(import_api8.Action.Push, {
    title: "View Browser Links",
    icon: import_api8.Icon.Globe,
    target: /* @__PURE__ */ _jsx(SpinBrowserList, {
      spin
    }),
    shortcut: { modifiers: ["cmd"], key: "b" }
  });
}
function SpinBrowserActions({ spin }) {
  const { urls } = useSpinUrls(spin);
  return /* @__PURE__ */ _jsx(import_api8.ActionPanel.Section, {
    title: "Browser Actions"
  }, urls.map((url) => {
    return /* @__PURE__ */ _jsx(SpinOpenUrlInBrowserAction, {
      key: `service-${url.service}`,
      url
    });
  }));
}
function SpinShellAction({ spin }) {
  const openWithIterm = async () => {
    try {
      const command = `spin shell \\"${spin.name}\\"`;
      (0, import_child_process2.execSync)(`
osascript <<END
tell application "iTerm"
  set newWindow to (create window with default profile)
  tell current session of newWindow
    write text "${command}"
  end tell
end tell
END`);
      await (0, import_api8.showHUD)("Opened iTerm");
    } catch (e2) {
      await (0, import_api8.showToast)({
        style: import_api8.Toast.Style.Failure,
        title: "Could not open iTerm"
      });
    }
  };
  return /* @__PURE__ */ _jsx(import_api8.Action, {
    icon: { source: import_api8.Icon.Terminal },
    shortcut: { modifiers: ["cmd"], key: "s" },
    title: "Open shell with iTerm",
    onAction: openWithIterm
  });
}

// src/components/list-item/list-item.tsx
function listItemAccessory(state) {
  return state && { accessoryTitle: state, accessoryIcon: iconFromSpinState(state) };
}
function SpinListItem({ spin, updateList }) {
  return /* @__PURE__ */ _jsx(import_api9.List.Item, __spreadProps(__spreadValues({
    title: spin.name,
    subtitle: spin.serviceName
  }, listItemAccessory(spin.state)), {
    actions: /* @__PURE__ */ _jsx(import_api9.ActionPanel, null, /* @__PURE__ */ _jsx(import_api9.ActionPanel.Section, {
      title: "Manage"
    }, /* @__PURE__ */ _jsx(SpinDetailsAction, {
      spin,
      updateList
    }), /* @__PURE__ */ _jsx(SpinBrowserListAction, {
      spin,
      updateList
    }), /* @__PURE__ */ _jsx(SpinDestroyAction, {
      spin,
      onDestroy: updateList
    }), /* @__PURE__ */ _jsx(SpinShellAction, {
      spin
    })), spin.isReady() && /* @__PURE__ */ _jsx(SpinBrowserActions, {
      spin
    }))
  }));
}

// src/hooks/use-spin-list.ts
var import_react3 = require("react");
var import_api10 = require("@raycast/api");
function useSpinList() {
  const [loading, setLoading] = (0, import_react3.useState)(true);
  const [spinListData, setSpinListData] = (0, import_react3.useState)(null);
  const { pop } = (0, import_api10.useNavigation)();
  async function errorAndQuit(msg) {
    await (0, import_api10.showToast)({
      style: import_api10.Toast.Style.Failure,
      title: "Could not get Spin data",
      message: msg ?? ""
    });
    pop();
  }
  const updateSpinList = async () => {
    setLoading(true);
    let spinListResponse = null;
    try {
      spinListResponse = await spinList();
    } catch (e2) {
      await errorAndQuit();
      return;
    }
    if (spinListResponse.error) {
      await errorAndQuit(spinListResponse?.error);
    } else {
      spinListResponse.sort((a, b) => sortSpinsByDate(a, b));
      const instances = spinListResponse.map((instance) => new Instance(instance));
      setSpinListData(instances);
    }
    setLoading(false);
  };
  (0, import_react3.useEffect)(() => {
    const id = setInterval(() => updateSpinList(), 1e3 * REFRESH_INTERVAL);
    updateSpinList();
    return () => {
      clearInterval(id);
    };
  }, []);
  return { loading, data: spinListData, update: updateSpinList };
}

// src/list.tsx
function SpinList() {
  const { data, loading, update } = useSpinList();
  const instances = data ?? [];
  return /* @__PURE__ */ _jsx(import_api11.List, {
    isLoading: loading
  }, instances.map((instance) => {
    return /* @__PURE__ */ _jsx(SpinListItem, {
      key: instance.name,
      isCurrent: true,
      spin: instance,
      updateList: update
    });
  }));
}
module.exports = __toCommonJS(list_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvc3R1Yi9zeW1ib2wudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvdXRpbHMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL2hlbHBlcnMvbWlzY2VsbGFuZW91cy50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvaGVscGVycy93ZWJpZGwudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3NpbXBsZS1xdWV1ZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtL2dlbmVyaWMtcmVhZGVyLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9hYnN0cmFjdC1vcHMvaW50ZXJuYWwtbWV0aG9kcy50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9zdHViL251bWJlci1pc2Zpbml0ZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9zdHViL21hdGgtdHJ1bmMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvYmFzaWMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvcmVhZGFibGUtc3RyZWFtLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9yZWFkYWJsZS1zdHJlYW0vZGVmYXVsdC1yZWFkZXIudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvdGFyZ2V0L2VzMjAxOC9zdHViL2FzeW5jLWl0ZXJhdG9yLXByb3RvdHlwZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtL2FzeW5jLWl0ZXJhdG9yLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL3N0dWIvbnVtYmVyLWlzbmFuLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9hYnN0cmFjdC1vcHMvZWNtYXNjcmlwdC50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvYWJzdHJhY3Qtb3BzL21pc2NlbGxhbmVvdXMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL2Fic3RyYWN0LW9wcy9xdWV1ZS13aXRoLXNpemVzLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9yZWFkYWJsZS1zdHJlYW0vYnl0ZS1zdHJlYW0tY29udHJvbGxlci50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtL2J5b2ItcmVhZGVyLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi9hYnN0cmFjdC1vcHMvcXVldWluZy1zdHJhdGVneS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdmFsaWRhdG9ycy9xdWV1aW5nLXN0cmF0ZWd5LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi92YWxpZGF0b3JzL3VuZGVybHlpbmctc2luay50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdmFsaWRhdG9ycy93cml0YWJsZS1zdHJlYW0udHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL2Fib3J0LXNpZ25hbC50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvd3JpdGFibGUtc3RyZWFtLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL3N0dWIvbmF0aXZlLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL3N0dWIvZG9tLWV4Y2VwdGlvbi50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtL3BpcGUudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3JlYWRhYmxlLXN0cmVhbS9kZWZhdWx0LWNvbnRyb2xsZXIudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3JlYWRhYmxlLXN0cmVhbS90ZWUudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvdW5kZXJseWluZy1zb3VyY2UudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvcmVhZGVyLW9wdGlvbnMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvaXRlcmF0b3Itb3B0aW9ucy50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdmFsaWRhdG9ycy9waXBlLW9wdGlvbnMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9zcmMvbGliL3ZhbGlkYXRvcnMvcmVhZGFibGUtd3JpdGFibGUtcGFpci50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvcmVhZGFibGUtc3RyZWFtLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvd2ViLXN0cmVhbXMtcG9seWZpbGwvc3JjL2xpYi92YWxpZGF0b3JzL3F1ZXVpbmctc3RyYXRlZ3ktaW5pdC50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvYnl0ZS1sZW5ndGgtcXVldWluZy1zdHJhdGVneS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvY291bnQtcXVldWluZy1zdHJhdGVneS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdmFsaWRhdG9ycy90cmFuc2Zvcm1lci50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL3NyYy9saWIvdHJhbnNmb3JtLXN0cmVhbS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL2ZldGNoLWJsb2Ivc3RyZWFtcy5janMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9mZXRjaC1ibG9iL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvZmV0Y2gtYmxvYi9maWxlLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvZm9ybWRhdGEtcG9seWZpbGwvZXNtLm1pbi5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZG9tZXhjZXB0aW9uL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvZmV0Y2gtYmxvYi9mcm9tLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9zcmMvdXRpbHMvbXVsdGlwYXJ0LXBhcnNlci5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2xpc3QudHN4IiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvY29tcG9uZW50cy9saXN0LWl0ZW0vbGlzdC1pdGVtLnRzeCIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2xpYi9zcGluL3NlcnZpY2Uvc2VydmljZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2xpYi9zcGluL2hlbHBlcnMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9ub2RlLWZldGNoL3NyYy9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL2RhdGEtdXJpLXRvLWJ1ZmZlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9ub2RlLWZldGNoL3NyYy9ib2R5LmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9zcmMvZXJyb3JzL2Jhc2UuanMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9ub2RlLWZldGNoL3NyYy9lcnJvcnMvZmV0Y2gtZXJyb3IuanMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9ub2RlLWZldGNoL3NyYy91dGlscy9pcy5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL2hlYWRlcnMuanMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9ub2RlLWZldGNoL3NyYy91dGlscy9pcy1yZWRpcmVjdC5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL3Jlc3BvbnNlLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9zcmMvcmVxdWVzdC5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL3V0aWxzL2dldC1zZWFyY2guanMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL25vZGVfbW9kdWxlcy9ub2RlLWZldGNoL3NyYy91dGlscy9yZWZlcnJlci5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vbm9kZV9tb2R1bGVzL25vZGUtZmV0Y2gvc3JjL2Vycm9ycy9hYm9ydC1lcnJvci5qcyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2xpYi9zcGluL3R5cGVzLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvbGliL3NwaW4vY29uc3RhbnRzLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvbGliL3NwaW4vdXRpbC50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2xpYi9zcGluL3NlcnZpY2UvaW5zdGFuY2Utc2VydmljZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2xpYi9zcGluL3NwaW4tdHlwZS9zcGluLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvbGliL3NwaW4vc3Bpbi10eXBlL2luc3RhbmNlLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvY29tcG9uZW50cy9hY3Rpb25zLnRzeCIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2hvb2tzL3VzZS1zcGluLXVybHMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2dpdGh1Yi5jb20vU2hvcGlmeS9zcGluLXJheWNhc3QtZXh0ZW5zaW9uL3NyYy9jb21wb25lbnRzL2RldGFpbHMtbGlzdC9kZXRhaWxzLWxpc3QudHN4IiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvY29tcG9uZW50cy9kZXRhaWxzLWxpc3QvZGV0YWlscy1saXN0LWl0ZW0udHN4IiwgIi4uLy4uLy4uLy4uL3NyYy9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi1yYXljYXN0LWV4dGVuc2lvbi9zcmMvY29tcG9uZW50cy9icm93c2VyLWxpc3QvYnJvd3Nlci1saXN0LnRzeCIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2NvbXBvbmVudHMvYnJvd3Nlci1saXN0L2Jyb3dzZXItbGlzdC1pdGVtLnRzeCIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2NvbXBvbmVudHMvYnJvd3Nlci1saXN0L29wZW4tdXJsLWluLWJyb3dzZXItYWN0aW9uLnRzeCIsICIuLi8uLi8uLi8uLi9zcmMvZ2l0aHViLmNvbS9TaG9waWZ5L3NwaW4tcmF5Y2FzdC1leHRlbnNpb24vc3JjL2hvb2tzL3VzZS1zcGluLWxpc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vLyA8cmVmZXJlbmNlIGxpYj1cImVzMjAxNS5zeW1ib2xcIiAvPlxuXG5jb25zdCBTeW1ib2xQb2x5ZmlsbDogKGRlc2NyaXB0aW9uPzogc3RyaW5nKSA9PiBzeW1ib2wgPVxuICB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09ICdzeW1ib2wnID9cbiAgICBTeW1ib2wgOlxuICAgIGRlc2NyaXB0aW9uID0+IGBTeW1ib2woJHtkZXNjcmlwdGlvbn0pYCBhcyBhbnkgYXMgc3ltYm9sO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2xQb2x5ZmlsbDtcbiIsICIvLy8gPHJlZmVyZW5jZSBsaWI9XCJkb21cIiAvPlxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpOiB1bmRlZmluZWQge1xuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRHbG9iYWxzKCkge1xuICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGdsb2JhbDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgZ2xvYmFscyA9IGdldEdsb2JhbHMoKTtcbiIsICJpbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgQXNzZXJ0aW9uRXJyb3IgfSBmcm9tICcuLi8uLi9zdHViL2Fzc2VydCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlSXNPYmplY3QoeDogYW55KTogeCBpcyBvYmplY3Qge1xuICByZXR1cm4gKHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsKSB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGNvbnN0IHJldGhyb3dBc3NlcnRpb25FcnJvclJlamVjdGlvbjogKGU6IGFueSkgPT4gdm9pZCA9XG4gIERFQlVHID8gZSA9PiB7XG4gICAgLy8gVXNlZCB0aHJvdWdob3V0IHRoZSByZWZlcmVuY2UgaW1wbGVtZW50YXRpb24sIGFzIGAuY2F0Y2gocmV0aHJvd0Fzc2VydGlvbkVycm9yUmVqZWN0aW9uKWAsIHRvIGVuc3VyZSBhbnkgZXJyb3JzXG4gICAgLy8gZ2V0IHNob3duLiBUaGVyZSBhcmUgcGxhY2VzIGluIHRoZSBzcGVjIHdoZXJlIHdlIGRvIHByb21pc2UgdHJhbnNmb3JtYXRpb25zIGFuZCBwdXJwb3NlZnVsbHkgaWdub3JlIG9yIGRvbid0XG4gICAgLy8gZXhwZWN0IGFueSBlcnJvcnMsIGJ1dCBhc3NlcnRpb24gZXJyb3JzIGFyZSBhbHdheXMgcHJvYmxlbWF0aWMuXG4gICAgaWYgKGUgJiYgZSBpbnN0YW5jZW9mIEFzc2VydGlvbkVycm9yKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfSA6IG5vb3A7XG4iLCAiaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IHJldGhyb3dBc3NlcnRpb25FcnJvclJlamVjdGlvbiB9IGZyb20gJy4vbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJy4uLy4uL3N0dWIvYXNzZXJ0JztcblxuY29uc3Qgb3JpZ2luYWxQcm9taXNlID0gUHJvbWlzZTtcbmNvbnN0IG9yaWdpbmFsUHJvbWlzZVRoZW4gPSBQcm9taXNlLnByb3RvdHlwZS50aGVuO1xuY29uc3Qgb3JpZ2luYWxQcm9taXNlUmVzb2x2ZSA9IFByb21pc2UucmVzb2x2ZS5iaW5kKG9yaWdpbmFsUHJvbWlzZSk7XG5jb25zdCBvcmlnaW5hbFByb21pc2VSZWplY3QgPSBQcm9taXNlLnJlamVjdC5iaW5kKG9yaWdpbmFsUHJvbWlzZSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQcm9taXNlPFQ+KGV4ZWN1dG9yOiAoXG4gIHJlc29sdmU6ICh2YWx1ZTogVCB8IFByb21pc2VMaWtlPFQ+KSA9PiB2b2lkLFxuICByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWRcbikgPT4gdm9pZCk6IFByb21pc2U8VD4ge1xuICByZXR1cm4gbmV3IG9yaWdpbmFsUHJvbWlzZShleGVjdXRvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9taXNlUmVzb2x2ZWRXaXRoPFQ+KHZhbHVlOiBUIHwgUHJvbWlzZUxpa2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgcmV0dXJuIG9yaWdpbmFsUHJvbWlzZVJlc29sdmUodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvbWlzZVJlamVjdGVkV2l0aDxUID0gbmV2ZXI+KHJlYXNvbjogYW55KTogUHJvbWlzZTxUPiB7XG4gIHJldHVybiBvcmlnaW5hbFByb21pc2VSZWplY3QocmVhc29uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBlcmZvcm1Qcm9taXNlVGhlbjxULCBUUmVzdWx0MSA9IFQsIFRSZXN1bHQyID0gbmV2ZXI+KFxuICBwcm9taXNlOiBQcm9taXNlPFQ+LFxuICBvbkZ1bGZpbGxlZD86ICh2YWx1ZTogVCkgPT4gVFJlc3VsdDEgfCBQcm9taXNlTGlrZTxUUmVzdWx0MT4sXG4gIG9uUmVqZWN0ZWQ/OiAocmVhc29uOiBhbnkpID0+IFRSZXN1bHQyIHwgUHJvbWlzZUxpa2U8VFJlc3VsdDI+KTogUHJvbWlzZTxUUmVzdWx0MSB8IFRSZXN1bHQyPiB7XG4gIC8vIFRoZXJlIGRvZXNuJ3QgYXBwZWFyIHRvIGJlIGFueSB3YXkgdG8gY29ycmVjdGx5IGVtdWxhdGUgdGhlIGJlaGF2aW91ciBmcm9tIEphdmFTY3JpcHQsIHNvIHRoaXMgaXMganVzdCBhblxuICAvLyBhcHByb3hpbWF0aW9uLlxuICByZXR1cm4gb3JpZ2luYWxQcm9taXNlVGhlbi5jYWxsKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSBhcyBQcm9taXNlPFRSZXN1bHQxIHwgVFJlc3VsdDI+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBvblByb21pc2U8VD4oXG4gIHByb21pc2U6IFByb21pc2U8VD4sXG4gIG9uRnVsZmlsbGVkPzogKHZhbHVlOiBUKSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4sXG4gIG9uUmVqZWN0ZWQ/OiAocmVhc29uOiBhbnkpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPik6IHZvaWQge1xuICBQZXJmb3JtUHJvbWlzZVRoZW4oXG4gICAgUGVyZm9ybVByb21pc2VUaGVuKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSxcbiAgICB1bmRlZmluZWQsXG4gICAgcmV0aHJvd0Fzc2VydGlvbkVycm9yUmVqZWN0aW9uXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cG9uRnVsZmlsbG1lbnQ8VD4ocHJvbWlzZTogUHJvbWlzZTxUPiwgb25GdWxmaWxsZWQ6ICh2YWx1ZTogVCkgPT4gdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+KTogdm9pZCB7XG4gIHVwb25Qcm9taXNlKHByb21pc2UsIG9uRnVsZmlsbGVkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwb25SZWplY3Rpb24ocHJvbWlzZTogUHJvbWlzZTx1bmtub3duPiwgb25SZWplY3RlZDogKHJlYXNvbjogYW55KSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4pOiB2b2lkIHtcbiAgdXBvblByb21pc2UocHJvbWlzZSwgdW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVByb21pc2VXaXRoPFQsIFRSZXN1bHQxID0gVCwgVFJlc3VsdDIgPSBuZXZlcj4oXG4gIHByb21pc2U6IFByb21pc2U8VD4sXG4gIGZ1bGZpbGxtZW50SGFuZGxlcj86ICh2YWx1ZTogVCkgPT4gVFJlc3VsdDEgfCBQcm9taXNlTGlrZTxUUmVzdWx0MT4sXG4gIHJlamVjdGlvbkhhbmRsZXI/OiAocmVhc29uOiBhbnkpID0+IFRSZXN1bHQyIHwgUHJvbWlzZUxpa2U8VFJlc3VsdDI+KTogUHJvbWlzZTxUUmVzdWx0MSB8IFRSZXN1bHQyPiB7XG4gIHJldHVybiBQZXJmb3JtUHJvbWlzZVRoZW4ocHJvbWlzZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUocHJvbWlzZTogUHJvbWlzZTx1bmtub3duPik6IHZvaWQge1xuICBQZXJmb3JtUHJvbWlzZVRoZW4ocHJvbWlzZSwgdW5kZWZpbmVkLCByZXRocm93QXNzZXJ0aW9uRXJyb3JSZWplY3Rpb24pO1xufVxuXG5leHBvcnQgY29uc3QgcXVldWVNaWNyb3Rhc2s6IChmbjogKCkgPT4gdm9pZCkgPT4gdm9pZCA9ICgoKSA9PiB7XG4gIGNvbnN0IGdsb2JhbFF1ZXVlTWljcm90YXNrID0gZ2xvYmFscyAmJiBnbG9iYWxzLnF1ZXVlTWljcm90YXNrO1xuICBpZiAodHlwZW9mIGdsb2JhbFF1ZXVlTWljcm90YXNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGdsb2JhbFF1ZXVlTWljcm90YXNrO1xuICB9XG5cbiAgY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICByZXR1cm4gKGZuOiAoKSA9PiB2b2lkKSA9PiBQZXJmb3JtUHJvbWlzZVRoZW4ocmVzb2x2ZWRQcm9taXNlLCBmbik7XG59KSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVmbGVjdENhbGw8VCwgQSBleHRlbmRzIGFueVtdLCBSPihGOiAodGhpczogVCwgLi4uZm5BcmdzOiBBKSA9PiBSLCBWOiBULCBhcmdzOiBBKTogUiB7XG4gIGlmICh0eXBlb2YgRiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH1cbiAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKEYsIFYsIGFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvbWlzZUNhbGw8VCwgQSBleHRlbmRzIGFueVtdLCBSPihGOiAodGhpczogVCwgLi4uZm5BcmdzOiBBKSA9PiBSIHwgUHJvbWlzZUxpa2U8Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWOiBULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogQSk6IFByb21pc2U8Uj4ge1xuICBhc3NlcnQodHlwZW9mIEYgPT09ICdmdW5jdGlvbicpO1xuICBhc3NlcnQoViAhPT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KEFycmF5LmlzQXJyYXkoYXJncykpO1xuICB0cnkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHJlZmxlY3RDYWxsKEYsIFYsIGFyZ3MpKTtcbiAgfSBjYXRjaCAodmFsdWUpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aCh2YWx1ZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgYXNzZXJ0IGZyb20gJy4uL3N0dWIvYXNzZXJ0JztcblxuLy8gT3JpZ2luYWwgZnJvbSBDaHJvbWl1bVxuLy8gaHR0cHM6Ly9jaHJvbWl1bS5nb29nbGVzb3VyY2UuY29tL2Nocm9taXVtL3NyYy8rLzBhZWU0NDM0YTRkYmE0MmE0MmFiYWVhOWJmYmMwY2QxOTZhNjNiYzEvdGhpcmRfcGFydHkvYmxpbmsvcmVuZGVyZXIvY29yZS9zdHJlYW1zL1NpbXBsZVF1ZXVlLmpzXG5cbmNvbnN0IFFVRVVFX01BWF9BUlJBWV9TSVpFID0gMTYzODQ7XG5cbmludGVyZmFjZSBOb2RlPFQ+IHtcbiAgX2VsZW1lbnRzOiBUW107XG4gIF9uZXh0OiBOb2RlPFQ+IHwgdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFNpbXBsZSBxdWV1ZSBzdHJ1Y3R1cmUuXG4gKlxuICogQXZvaWRzIHNjYWxhYmlsaXR5IGlzc3VlcyB3aXRoIHVzaW5nIGEgcGFja2VkIGFycmF5IGRpcmVjdGx5IGJ5IHVzaW5nXG4gKiBtdWx0aXBsZSBhcnJheXMgaW4gYSBsaW5rZWQgbGlzdCBhbmQga2VlcGluZyB0aGUgYXJyYXkgc2l6ZSBib3VuZGVkLlxuICovXG5leHBvcnQgY2xhc3MgU2ltcGxlUXVldWU8VD4ge1xuICBwcml2YXRlIF9mcm9udDogTm9kZTxUPjtcbiAgcHJpdmF0ZSBfYmFjazogTm9kZTxUPjtcbiAgcHJpdmF0ZSBfY3Vyc29yID0gMDtcbiAgcHJpdmF0ZSBfc2l6ZSA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gX2Zyb250IGFuZCBfYmFjayBhcmUgYWx3YXlzIGRlZmluZWQuXG4gICAgdGhpcy5fZnJvbnQgPSB7XG4gICAgICBfZWxlbWVudHM6IFtdLFxuICAgICAgX25leHQ6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgdGhpcy5fYmFjayA9IHRoaXMuX2Zyb250O1xuICAgIC8vIFRoZSBjdXJzb3IgaXMgdXNlZCB0byBhdm9pZCBjYWxsaW5nIEFycmF5LnNoaWZ0KCkuXG4gICAgLy8gSXQgY29udGFpbnMgdGhlIGluZGV4IG9mIHRoZSBmcm9udCBlbGVtZW50IG9mIHRoZSBhcnJheSBpbnNpZGUgdGhlXG4gICAgLy8gZnJvbnQtbW9zdCBub2RlLiBJdCBpcyBhbHdheXMgaW4gdGhlIHJhbmdlIFswLCBRVUVVRV9NQVhfQVJSQVlfU0laRSkuXG4gICAgdGhpcy5fY3Vyc29yID0gMDtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG9ubHkgb25lIG5vZGUsIHNpemUgPT09IGVsZW1lbnRzLmxlbmd0aCAtIGN1cnNvci5cbiAgICB0aGlzLl9zaXplID0gMDtcbiAgfVxuXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIC8vIEZvciBleGNlcHRpb24gc2FmZXR5LCB0aGlzIG1ldGhvZCBpcyBzdHJ1Y3R1cmVkIGluIG9yZGVyOlxuICAvLyAxLiBSZWFkIHN0YXRlXG4gIC8vIDIuIENhbGN1bGF0ZSByZXF1aXJlZCBzdGF0ZSBtdXRhdGlvbnNcbiAgLy8gMy4gUGVyZm9ybSBzdGF0ZSBtdXRhdGlvbnNcbiAgcHVzaChlbGVtZW50OiBUKTogdm9pZCB7XG4gICAgY29uc3Qgb2xkQmFjayA9IHRoaXMuX2JhY2s7XG4gICAgbGV0IG5ld0JhY2sgPSBvbGRCYWNrO1xuICAgIGFzc2VydChvbGRCYWNrLl9uZXh0ID09PSB1bmRlZmluZWQpO1xuICAgIGlmIChvbGRCYWNrLl9lbGVtZW50cy5sZW5ndGggPT09IFFVRVVFX01BWF9BUlJBWV9TSVpFIC0gMSkge1xuICAgICAgbmV3QmFjayA9IHtcbiAgICAgICAgX2VsZW1lbnRzOiBbXSxcbiAgICAgICAgX25leHQ6IHVuZGVmaW5lZFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBwdXNoKCkgaXMgdGhlIG11dGF0aW9uIG1vc3QgbGlrZWx5IHRvIHRocm93IGFuIGV4Y2VwdGlvbiwgc28gaXRcbiAgICAvLyBnb2VzIGZpcnN0LlxuICAgIG9sZEJhY2suX2VsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgaWYgKG5ld0JhY2sgIT09IG9sZEJhY2spIHtcbiAgICAgIHRoaXMuX2JhY2sgPSBuZXdCYWNrO1xuICAgICAgb2xkQmFjay5fbmV4dCA9IG5ld0JhY2s7XG4gICAgfVxuICAgICsrdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIC8vIExpa2UgcHVzaCgpLCBzaGlmdCgpIGZvbGxvd3MgdGhlIHJlYWQgLT4gY2FsY3VsYXRlIC0+IG11dGF0ZSBwYXR0ZXJuIGZvclxuICAvLyBleGNlcHRpb24gc2FmZXR5LlxuICBzaGlmdCgpOiBUIHtcbiAgICBhc3NlcnQodGhpcy5fc2l6ZSA+IDApOyAvLyBtdXN0IG5vdCBiZSBjYWxsZWQgb24gYW4gZW1wdHkgcXVldWVcblxuICAgIGNvbnN0IG9sZEZyb250ID0gdGhpcy5fZnJvbnQ7XG4gICAgbGV0IG5ld0Zyb250ID0gb2xkRnJvbnQ7XG4gICAgY29uc3Qgb2xkQ3Vyc29yID0gdGhpcy5fY3Vyc29yO1xuICAgIGxldCBuZXdDdXJzb3IgPSBvbGRDdXJzb3IgKyAxO1xuXG4gICAgY29uc3QgZWxlbWVudHMgPSBvbGRGcm9udC5fZWxlbWVudHM7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW29sZEN1cnNvcl07XG5cbiAgICBpZiAobmV3Q3Vyc29yID09PSBRVUVVRV9NQVhfQVJSQVlfU0laRSkge1xuICAgICAgYXNzZXJ0KGVsZW1lbnRzLmxlbmd0aCA9PT0gUVVFVUVfTUFYX0FSUkFZX1NJWkUpO1xuICAgICAgYXNzZXJ0KG9sZEZyb250Ll9uZXh0ICE9PSB1bmRlZmluZWQpO1xuICAgICAgbmV3RnJvbnQgPSBvbGRGcm9udC5fbmV4dCE7XG4gICAgICBuZXdDdXJzb3IgPSAwO1xuICAgIH1cblxuICAgIC8vIE5vIG11dGF0aW9ucyBiZWZvcmUgdGhpcyBwb2ludC5cbiAgICAtLXRoaXMuX3NpemU7XG4gICAgdGhpcy5fY3Vyc29yID0gbmV3Q3Vyc29yO1xuICAgIGlmIChvbGRGcm9udCAhPT0gbmV3RnJvbnQpIHtcbiAgICAgIHRoaXMuX2Zyb250ID0gbmV3RnJvbnQ7XG4gICAgfVxuXG4gICAgLy8gUGVybWl0IHNoaWZ0ZWQgZWxlbWVudCB0byBiZSBnYXJiYWdlIGNvbGxlY3RlZC5cbiAgICBlbGVtZW50c1tvbGRDdXJzb3JdID0gdW5kZWZpbmVkITtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLy8gVGhlIHRyaWNreSB0aGluZyBhYm91dCBmb3JFYWNoKCkgaXMgdGhhdCBpdCBjYW4gYmUgY2FsbGVkXG4gIC8vIHJlLWVudHJhbnRseS4gVGhlIHF1ZXVlIG1heSBiZSBtdXRhdGVkIGluc2lkZSB0aGUgY2FsbGJhY2suIEl0IGlzIGVhc3kgdG9cbiAgLy8gc2VlIHRoYXQgcHVzaCgpIHdpdGhpbiB0aGUgY2FsbGJhY2sgaGFzIG5vIG5lZ2F0aXZlIGVmZmVjdHMgc2luY2UgdGhlIGVuZFxuICAvLyBvZiB0aGUgcXVldWUgaXMgY2hlY2tlZCBmb3Igb24gZXZlcnkgaXRlcmF0aW9uLiBJZiBzaGlmdCgpIGlzIGNhbGxlZFxuICAvLyByZXBlYXRlZGx5IHdpdGhpbiB0aGUgY2FsbGJhY2sgdGhlbiB0aGUgbmV4dCBpdGVyYXRpb24gbWF5IHJldHVybiBhblxuICAvLyBlbGVtZW50IHRoYXQgaGFzIGJlZW4gcmVtb3ZlZC4gSW4gdGhpcyBjYXNlIHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZFxuICAvLyB3aXRoIHVuZGVmaW5lZCB2YWx1ZXMgdW50aWwgd2UgZWl0aGVyIFwiY2F0Y2ggdXBcIiB3aXRoIGVsZW1lbnRzIHRoYXQgc3RpbGxcbiAgLy8gZXhpc3Qgb3IgcmVhY2ggdGhlIGJhY2sgb2YgdGhlIHF1ZXVlLlxuICBmb3JFYWNoKGNhbGxiYWNrOiAoZWxlbWVudDogVCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGxldCBpID0gdGhpcy5fY3Vyc29yO1xuICAgIGxldCBub2RlID0gdGhpcy5fZnJvbnQ7XG4gICAgbGV0IGVsZW1lbnRzID0gbm9kZS5fZWxlbWVudHM7XG4gICAgd2hpbGUgKGkgIT09IGVsZW1lbnRzLmxlbmd0aCB8fCBub2RlLl9uZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChpID09PSBlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgYXNzZXJ0KG5vZGUuX25leHQgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIGFzc2VydChpID09PSBRVUVVRV9NQVhfQVJSQVlfU0laRSk7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0ITtcbiAgICAgICAgZWxlbWVudHMgPSBub2RlLl9lbGVtZW50cztcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZWxlbWVudHNbaV0pO1xuICAgICAgKytpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgZWxlbWVudCB0aGF0IHdvdWxkIGJlIHJldHVybmVkIGlmIHNoaWZ0KCkgd2FzIGNhbGxlZCBub3csXG4gIC8vIHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSBxdWV1ZS5cbiAgcGVlaygpOiBUIHtcbiAgICBhc3NlcnQodGhpcy5fc2l6ZSA+IDApOyAvLyBtdXN0IG5vdCBiZSBjYWxsZWQgb24gYW4gZW1wdHkgcXVldWVcblxuICAgIGNvbnN0IGZyb250ID0gdGhpcy5fZnJvbnQ7XG4gICAgY29uc3QgY3Vyc29yID0gdGhpcy5fY3Vyc29yO1xuICAgIHJldHVybiBmcm9udC5fZWxlbWVudHNbY3Vyc29yXTtcbiAgfVxufVxuIiwgImltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW0sIFJlYWRhYmxlU3RyZWFtQ2FuY2VsLCBSZWFkYWJsZVN0cmVhbVJlYWRlciB9IGZyb20gJy4uL3JlYWRhYmxlLXN0cmVhbSc7XG5pbXBvcnQgeyBuZXdQcm9taXNlLCBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljSW5pdGlhbGl6ZTxSPihyZWFkZXI6IFJlYWRhYmxlU3RyZWFtUmVhZGVyPFI+LCBzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFI+KSB7XG4gIHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbSA9IHN0cmVhbTtcbiAgc3RyZWFtLl9yZWFkZXIgPSByZWFkZXI7XG5cbiAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScpIHtcbiAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUocmVhZGVyKTtcbiAgfSBlbHNlIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVzb2x2ZWQocmVhZGVyKTtcbiAgfSBlbHNlIHtcbiAgICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKTtcblxuICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQocmVhZGVyLCBzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgfVxufVxuXG4vLyBBIGNsaWVudCBvZiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIgYW5kIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlciBtYXkgdXNlIHRoZXNlIGZ1bmN0aW9ucyBkaXJlY3RseSB0byBieXBhc3Mgc3RhdGVcbi8vIGNoZWNrLlxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsKHJlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8YW55PiwgcmVhc29uOiBhbnkpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICBjb25zdCBzdHJlYW0gPSByZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW07XG4gIGFzc2VydChzdHJlYW0gIT09IHVuZGVmaW5lZCk7XG4gIHJldHVybiBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIHJlYXNvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8YW55Pikge1xuICBhc3NlcnQocmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtICE9PSB1bmRlZmluZWQpO1xuICBhc3NlcnQocmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtLl9yZWFkZXIgPT09IHJlYWRlcik7XG5cbiAgaWYgKHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScpIHtcbiAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlamVjdChcbiAgICAgIHJlYWRlcixcbiAgICAgIG5ldyBUeXBlRXJyb3IoYFJlYWRlciB3YXMgcmVsZWFzZWQgYW5kIGNhbiBubyBsb25nZXIgYmUgdXNlZCB0byBtb25pdG9yIHRoZSBzdHJlYW0ncyBjbG9zZWRuZXNzYCkpO1xuICB9IGVsc2Uge1xuICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVzZXRUb1JlamVjdGVkKFxuICAgICAgcmVhZGVyLFxuICAgICAgbmV3IFR5cGVFcnJvcihgUmVhZGVyIHdhcyByZWxlYXNlZCBhbmQgY2FuIG5vIGxvbmdlciBiZSB1c2VkIHRvIG1vbml0b3IgdGhlIHN0cmVhbSdzIGNsb3NlZG5lc3NgKSk7XG4gIH1cblxuICByZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0uX3JlYWRlciA9IHVuZGVmaW5lZDtcbiAgcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtID0gdW5kZWZpbmVkITtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIHJlYWRlcnMuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkZXJMb2NrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKCdDYW5ub3QgJyArIG5hbWUgKyAnIGEgc3RyZWFtIHVzaW5nIGEgcmVsZWFzZWQgcmVhZGVyJyk7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIuXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUocmVhZGVyOiBSZWFkYWJsZVN0cmVhbVJlYWRlcjxhbnk+KSB7XG4gIHJlYWRlci5fY2xvc2VkUHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gcmVqZWN0O1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQocmVhZGVyOiBSZWFkYWJsZVN0cmVhbVJlYWRlcjxhbnk+LCByZWFzb246IGFueSkge1xuICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUocmVhZGVyKTtcbiAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZWplY3QocmVhZGVyLCByZWFzb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZChyZWFkZXI6IFJlYWRhYmxlU3RyZWFtUmVhZGVyPGFueT4pIHtcbiAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHJlYWRlcik7XG4gIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVzb2x2ZShyZWFkZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZWplY3QocmVhZGVyOiBSZWFkYWJsZVN0cmVhbVJlYWRlcjxhbnk+LCByZWFzb246IGFueSkge1xuICBpZiAocmVhZGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZShyZWFkZXIuX2Nsb3NlZFByb21pc2UpO1xuICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0KHJlYXNvbik7XG4gIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZXNldFRvUmVqZWN0ZWQocmVhZGVyOiBSZWFkYWJsZVN0cmVhbVJlYWRlcjxhbnk+LCByZWFzb246IGFueSkge1xuICBhc3NlcnQocmVhZGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPT09IHVuZGVmaW5lZCk7XG4gIGFzc2VydChyZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID09PSB1bmRlZmluZWQpO1xuXG4gIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQocmVhZGVyLCByZWFzb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZXNvbHZlKHJlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8YW55Pikge1xuICBpZiAocmVhZGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlKHVuZGVmaW5lZCk7XG4gIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gdW5kZWZpbmVkO1xufVxuIiwgImV4cG9ydCBjb25zdCBBYm9ydFN0ZXBzID0gU3ltYm9sKCdbW0Fib3J0U3RlcHNdXScpO1xuZXhwb3J0IGNvbnN0IEVycm9yU3RlcHMgPSBTeW1ib2woJ1tbRXJyb3JTdGVwc11dJyk7XG5leHBvcnQgY29uc3QgQ2FuY2VsU3RlcHMgPSBTeW1ib2woJ1tbQ2FuY2VsU3RlcHNdXScpO1xuZXhwb3J0IGNvbnN0IFB1bGxTdGVwcyA9IFN5bWJvbCgnW1tQdWxsU3RlcHNdXScpO1xuIiwgIi8vLyA8cmVmZXJlbmNlIGxpYj1cImVzMjAxNS5jb3JlXCIgLz5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyL2lzRmluaXRlI1BvbHlmaWxsXG5jb25zdCBOdW1iZXJJc0Zpbml0ZTogdHlwZW9mIE51bWJlci5pc0Zpbml0ZSA9IE51bWJlci5pc0Zpbml0ZSB8fCBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdudW1iZXInICYmIGlzRmluaXRlKHgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTnVtYmVySXNGaW5pdGU7XG4iLCAiLy8vIDxyZWZlcmVuY2UgbGliPVwiZXMyMDE1LmNvcmVcIiAvPlxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXRoL3RydW5jI1BvbHlmaWxsXG5jb25zdCBNYXRoVHJ1bmM6IHR5cGVvZiBNYXRoLnRydW5jID0gTWF0aC50cnVuYyB8fCBmdW5jdGlvbiAodikge1xuICByZXR1cm4gdiA8IDAgPyBNYXRoLmNlaWwodikgOiBNYXRoLmZsb29yKHYpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0aFRydW5jO1xuIiwgImltcG9ydCBOdW1iZXJJc0Zpbml0ZSBmcm9tICcuLi8uLi9zdHViL251bWJlci1pc2Zpbml0ZSc7XG5pbXBvcnQgTWF0aFRydW5jIGZyb20gJy4uLy4uL3N0dWIvbWF0aC10cnVuYyc7XG5cbi8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1kaWN0aW9uYXJpZXNcbmV4cG9ydCBmdW5jdGlvbiBpc0RpY3Rpb25hcnkoeDogYW55KTogeCBpcyBvYmplY3QgfCBudWxsIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydERpY3Rpb25hcnkob2JqOiB1bmtub3duLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogYXNzZXJ0cyBvYmogaXMgb2JqZWN0IHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gIGlmIChvYmogIT09IHVuZGVmaW5lZCAmJiAhaXNEaWN0aW9uYXJ5KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhbiBvYmplY3QuYCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgQW55RnVuY3Rpb24gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcblxuLy8gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLWNhbGxiYWNrLWZ1bmN0aW9uc1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEZ1bmN0aW9uKHg6IHVua25vd24sIGNvbnRleHQ6IHN0cmluZyk6IGFzc2VydHMgeCBpcyBBbnlGdW5jdGlvbiB7XG4gIGlmICh0eXBlb2YgeCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gaXMgbm90IGEgZnVuY3Rpb24uYCk7XG4gIH1cbn1cblxuLy8gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLW9iamVjdFxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHg6IGFueSk6IHggaXMgb2JqZWN0IHtcbiAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbCkgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRPYmplY3QoeDogdW5rbm93bixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogYXNzZXJ0cyB4IGlzIG9iamVjdCB7XG4gIGlmICghaXNPYmplY3QoeCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhbiBvYmplY3QuYCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFJlcXVpcmVkQXJndW1lbnQ8VCBleHRlbmRzIGFueT4oeDogVCB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBzdHJpbmcpOiBhc3NlcnRzIHggaXMgVCB7XG4gIGlmICh4ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBQYXJhbWV0ZXIgJHtwb3NpdGlvbn0gaXMgcmVxdWlyZWQgaW4gJyR7Y29udGV4dH0nLmApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRSZXF1aXJlZEZpZWxkPFQgZXh0ZW5kcyBhbnk+KHg6IFQgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogYXNzZXJ0cyB4IGlzIFQge1xuICBpZiAoeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtmaWVsZH0gaXMgcmVxdWlyZWQgaW4gJyR7Y29udGV4dH0nLmApO1xuICB9XG59XG5cbi8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC11bnJlc3RyaWN0ZWQtZG91YmxlXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFVucmVzdHJpY3RlZERvdWJsZSh2YWx1ZTogdW5rbm93bik6IG51bWJlciB7XG4gIHJldHVybiBOdW1iZXIodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBjZW5zb3JOZWdhdGl2ZVplcm8oeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIHggPT09IDAgPyAwIDogeDtcbn1cblxuZnVuY3Rpb24gaW50ZWdlclBhcnQoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIGNlbnNvck5lZ2F0aXZlWmVybyhNYXRoVHJ1bmMoeCkpO1xufVxuXG4vLyBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtdW5zaWduZWQtbG9uZy1sb25nXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFVuc2lnbmVkTG9uZ0xvbmdXaXRoRW5mb3JjZVJhbmdlKHZhbHVlOiB1bmtub3duLCBjb250ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBsb3dlckJvdW5kID0gMDtcbiAgY29uc3QgdXBwZXJCb3VuZCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG4gIGxldCB4ID0gTnVtYmVyKHZhbHVlKTtcbiAgeCA9IGNlbnNvck5lZ2F0aXZlWmVybyh4KTtcblxuICBpZiAoIU51bWJlcklzRmluaXRlKHgpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYSBmaW5pdGUgbnVtYmVyYCk7XG4gIH1cblxuICB4ID0gaW50ZWdlclBhcnQoeCk7XG5cbiAgaWYgKHggPCBsb3dlckJvdW5kIHx8IHggPiB1cHBlckJvdW5kKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBvdXRzaWRlIHRoZSBhY2NlcHRlZCByYW5nZSBvZiAke2xvd2VyQm91bmR9IHRvICR7dXBwZXJCb3VuZH0sIGluY2x1c2l2ZWApO1xuICB9XG5cbiAgaWYgKCFOdW1iZXJJc0Zpbml0ZSh4KSB8fCB4ID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvLyBUT0RPIFVzZSBCaWdJbnQgaWYgc3VwcG9ydGVkP1xuICAvLyBsZXQgeEJpZ0ludCA9IEJpZ0ludChpbnRlZ2VyUGFydCh4KSk7XG4gIC8vIHhCaWdJbnQgPSBCaWdJbnQuYXNVaW50Tig2NCwgeEJpZ0ludCk7XG4gIC8vIHJldHVybiBOdW1iZXIoeEJpZ0ludCk7XG5cbiAgcmV0dXJuIHg7XG59XG4iLCAiaW1wb3J0IHsgSXNSZWFkYWJsZVN0cmVhbSwgUmVhZGFibGVTdHJlYW0gfSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0UmVhZGFibGVTdHJlYW0oeDogdW5rbm93biwgY29udGV4dDogc3RyaW5nKTogYXNzZXJ0cyB4IGlzIFJlYWRhYmxlU3RyZWFtIHtcbiAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHgpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYSBSZWFkYWJsZVN0cmVhbS5gKTtcbiAgfVxufVxuIiwgImltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuaW1wb3J0IHsgU2ltcGxlUXVldWUgfSBmcm9tICcuLi9zaW1wbGUtcXVldWUnO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsLFxuICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNJbml0aWFsaXplLFxuICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlLFxuICByZWFkZXJMb2NrRXhjZXB0aW9uXG59IGZyb20gJy4vZ2VuZXJpYy1yZWFkZXInO1xuaW1wb3J0IHsgSXNSZWFkYWJsZVN0cmVhbUxvY2tlZCwgUmVhZGFibGVTdHJlYW0gfSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgdHlwZUlzT2JqZWN0IH0gZnJvbSAnLi4vaGVscGVycy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IFB1bGxTdGVwcyB9IGZyb20gJy4uL2Fic3RyYWN0LW9wcy9pbnRlcm5hbC1tZXRob2RzJztcbmltcG9ydCB7IG5ld1Byb21pc2UsIHByb21pc2VSZWplY3RlZFdpdGggfSBmcm9tICcuLi9oZWxwZXJzL3dlYmlkbCc7XG5pbXBvcnQgeyBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50IH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9iYXNpYyc7XG5pbXBvcnQgeyBhc3NlcnRSZWFkYWJsZVN0cmVhbSB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvcmVhZGFibGUtc3RyZWFtJztcblxuLyoqXG4gKiBBIHJlc3VsdCByZXR1cm5lZCBieSB7QGxpbmsgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLnJlYWR9LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdDxUPiA9IHtcbiAgZG9uZTogZmFsc2U7XG4gIHZhbHVlOiBUO1xufSB8IHtcbiAgZG9uZTogdHJ1ZTtcbiAgdmFsdWU/OiB1bmRlZmluZWQ7XG59XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cblxuZXhwb3J0IGZ1bmN0aW9uIEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbSk6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPiB7XG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHN0cmVhbSk7XG59XG5cbi8vIFJlYWRhYmxlU3RyZWFtIEFQSSBleHBvc2VkIGZvciBjb250cm9sbGVycy5cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtQWRkUmVhZFJlcXVlc3Q8Uj4oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxSPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRSZXF1ZXN0OiBSZWFkUmVxdWVzdDxSPik6IHZvaWQge1xuICBhc3NlcnQoSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIoc3RyZWFtLl9yZWFkZXIpKTtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScpO1xuXG4gIChzdHJlYW0uX3JlYWRlciEgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+KS5fcmVhZFJlcXVlc3RzLnB1c2gocmVhZFJlcXVlc3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZFJlcXVlc3Q8Uj4oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxSPiwgY2h1bms6IFIgfCB1bmRlZmluZWQsIGRvbmU6IGJvb2xlYW4pIHtcbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLl9yZWFkZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+O1xuXG4gIGFzc2VydChyZWFkZXIuX3JlYWRSZXF1ZXN0cy5sZW5ndGggPiAwKTtcblxuICBjb25zdCByZWFkUmVxdWVzdCA9IHJlYWRlci5fcmVhZFJlcXVlc3RzLnNoaWZ0KCkhO1xuICBpZiAoZG9uZSkge1xuICAgIHJlYWRSZXF1ZXN0Ll9jbG9zZVN0ZXBzKCk7XG4gIH0gZWxzZSB7XG4gICAgcmVhZFJlcXVlc3QuX2NodW5rU3RlcHMoY2h1bmshKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkUmVxdWVzdHM8Uj4oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxSPik6IG51bWJlciB7XG4gIHJldHVybiAoc3RyZWFtLl9yZWFkZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+KS5fcmVhZFJlcXVlc3RzLmxlbmd0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtSGFzRGVmYXVsdFJlYWRlcihzdHJlYW06IFJlYWRhYmxlU3RyZWFtKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuXG4gIGlmIChyZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIocmVhZGVyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBSZWFkZXJzXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZFJlcXVlc3Q8Uj4ge1xuICBfY2h1bmtTdGVwcyhjaHVuazogUik6IHZvaWQ7XG5cbiAgX2Nsb3NlU3RlcHMoKTogdm9pZDtcblxuICBfZXJyb3JTdGVwcyhlOiBhbnkpOiB2b2lkO1xufVxuXG4vKipcbiAqIEEgZGVmYXVsdCByZWFkZXIgdmVuZGVkIGJ5IGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8UiA9IGFueT4ge1xuICAvKiogQGludGVybmFsICovXG4gIF9vd25lclJlYWRhYmxlU3RyZWFtITogUmVhZGFibGVTdHJlYW08Uj47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlZFByb21pc2UhOiBQcm9taXNlPHVuZGVmaW5lZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlZFByb21pc2VfcmVzb2x2ZT86ICh2YWx1ZT86IHVuZGVmaW5lZCkgPT4gdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VkUHJvbWlzZV9yZWplY3Q/OiAocmVhc29uOiBhbnkpID0+IHZvaWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRSZXF1ZXN0czogU2ltcGxlUXVldWU8UmVhZFJlcXVlc3Q8Uj4+O1xuXG4gIGNvbnN0cnVjdG9yKHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4pIHtcbiAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KHN0cmVhbSwgMSwgJ1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcicpO1xuICAgIGFzc2VydFJlYWRhYmxlU3RyZWFtKHN0cmVhbSwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuXG4gICAgaWYgKElzUmVhZGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBzdHJlYW0gaGFzIGFscmVhZHkgYmVlbiBsb2NrZWQgZm9yIGV4Y2x1c2l2ZSByZWFkaW5nIGJ5IGFub3RoZXIgcmVhZGVyJyk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljSW5pdGlhbGl6ZSh0aGlzLCBzdHJlYW0pO1xuXG4gICAgdGhpcy5fcmVhZFJlcXVlc3RzID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlIGZ1bGZpbGxlZCB3aGVuIHRoZSBzdHJlYW0gYmVjb21lcyBjbG9zZWQsXG4gICAqIG9yIHJlamVjdGVkIGlmIHRoZSBzdHJlYW0gZXZlciBlcnJvcnMgb3IgdGhlIHJlYWRlcidzIGxvY2sgaXMgcmVsZWFzZWQgYmVmb3JlIHRoZSBzdHJlYW0gZmluaXNoZXMgY2xvc2luZy5cbiAgICovXG4gIGdldCBjbG9zZWQoKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0UmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2VkJykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jbG9zZWRQcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSByZWFkZXIgaXMgYWN0aXZlLCBiZWhhdmVzIHRoZSBzYW1lIGFzIHtAbGluayBSZWFkYWJsZVN0cmVhbS5jYW5jZWwgfCBzdHJlYW0uY2FuY2VsKHJlYXNvbil9LlxuICAgKi9cbiAgY2FuY2VsKHJlYXNvbjogYW55ID0gdW5kZWZpbmVkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2NhbmNlbCcpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3duZXJSZWFkYWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChyZWFkZXJMb2NrRXhjZXB0aW9uKCdjYW5jZWwnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0NhbmNlbCh0aGlzLCByZWFzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGFjY2VzcyB0byB0aGUgbmV4dCBjaHVuayBmcm9tIHRoZSBzdHJlYW0ncyBpbnRlcm5hbCBxdWV1ZSwgaWYgYXZhaWxhYmxlLlxuICAgKlxuICAgKiBJZiByZWFkaW5nIGEgY2h1bmsgY2F1c2VzIHRoZSBxdWV1ZSB0byBiZWNvbWUgZW1wdHksIG1vcmUgZGF0YSB3aWxsIGJlIHB1bGxlZCBmcm9tIHRoZSB1bmRlcmx5aW5nIHNvdXJjZS5cbiAgICovXG4gIHJlYWQoKTogUHJvbWlzZTxSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PFI+PiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlYWQnKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgocmVhZGVyTG9ja0V4Y2VwdGlvbigncmVhZCBmcm9tJykpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZSE6IChyZXN1bHQ6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8Uj4pID0+IHZvaWQ7XG4gICAgbGV0IHJlamVjdFByb21pc2UhOiAocmVhc29uOiBhbnkpID0+IHZvaWQ7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ld1Byb21pc2U8UmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdDxSPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgICAgcmVqZWN0UHJvbWlzZSA9IHJlamVjdDtcbiAgICB9KTtcbiAgICBjb25zdCByZWFkUmVxdWVzdDogUmVhZFJlcXVlc3Q8Uj4gPSB7XG4gICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4gcmVzb2x2ZVByb21pc2UoeyB2YWx1ZTogY2h1bmssIGRvbmU6IGZhbHNlIH0pLFxuICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9KSxcbiAgICAgIF9lcnJvclN0ZXBzOiBlID0+IHJlamVjdFByb21pc2UoZSlcbiAgICB9O1xuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQodGhpcywgcmVhZFJlcXVlc3QpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIHRoZSByZWFkZXIncyBsb2NrIG9uIHRoZSBjb3JyZXNwb25kaW5nIHN0cmVhbS4gQWZ0ZXIgdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZWFkZXIgaXMgbm8gbG9uZ2VyIGFjdGl2ZS5cbiAgICogSWYgdGhlIGFzc29jaWF0ZWQgc3RyZWFtIGlzIGVycm9yZWQgd2hlbiB0aGUgbG9jayBpcyByZWxlYXNlZCwgdGhlIHJlYWRlciB3aWxsIGFwcGVhciBlcnJvcmVkIGluIHRoZSBzYW1lIHdheVxuICAgKiBmcm9tIG5vdyBvbjsgb3RoZXJ3aXNlLCB0aGUgcmVhZGVyIHdpbGwgYXBwZWFyIGNsb3NlZC5cbiAgICpcbiAgICogQSByZWFkZXIncyBsb2NrIGNhbm5vdCBiZSByZWxlYXNlZCB3aGlsZSBpdCBzdGlsbCBoYXMgYSBwZW5kaW5nIHJlYWQgcmVxdWVzdCwgaS5lLiwgaWYgYSBwcm9taXNlIHJldHVybmVkIGJ5XG4gICAqIHRoZSByZWFkZXIncyB7QGxpbmsgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLnJlYWQgfCByZWFkKCl9IG1ldGhvZCBoYXMgbm90IHlldCBiZWVuIHNldHRsZWQuIEF0dGVtcHRpbmcgdG9cbiAgICogZG8gc28gd2lsbCB0aHJvdyBhIGBUeXBlRXJyb3JgIGFuZCBsZWF2ZSB0aGUgcmVhZGVyIGxvY2tlZCB0byB0aGUgc3RyZWFtLlxuICAgKi9cbiAgcmVsZWFzZUxvY2soKTogdm9pZCB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdFJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlbGVhc2VMb2NrJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9yZWFkUmVxdWVzdHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHJpZWQgdG8gcmVsZWFzZSBhIHJlYWRlciBsb2NrIHdoZW4gdGhhdCByZWFkZXIgaGFzIHBlbmRpbmcgcmVhZCgpIGNhbGxzIHVuLXNldHRsZWQnKTtcbiAgICB9XG5cbiAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHRoaXMpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5wcm90b3R5cGUsIHtcbiAgY2FuY2VsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgcmVhZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHJlbGVhc2VMb2NrOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgY2xvc2VkOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgIHZhbHVlOiAnUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyJyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSByZWFkZXJzLlxuXG5leHBvcnQgZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8UiA9IGFueT4oeDogYW55KTogeCBpcyBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4ge1xuICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfcmVhZFJlcXVlc3RzJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQ8Uj4ocmVhZGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkUmVxdWVzdDogUmVhZFJlcXVlc3Q8Uj4pOiB2b2lkIHtcbiAgY29uc3Qgc3RyZWFtID0gcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtO1xuXG4gIGFzc2VydChzdHJlYW0gIT09IHVuZGVmaW5lZCk7XG5cbiAgc3RyZWFtLl9kaXN0dXJiZWQgPSB0cnVlO1xuXG4gIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgIHJlYWRSZXF1ZXN0Ll9jbG9zZVN0ZXBzKCk7XG4gIH0gZWxzZSBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgcmVhZFJlcXVlc3QuX2Vycm9yU3RlcHMoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gIH0gZWxzZSB7XG4gICAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScpO1xuICAgIHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyW1B1bGxTdGVwc10ocmVhZFJlcXVlc3QgYXMgUmVhZFJlcXVlc3Q8YW55Pik7XG4gIH1cbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5cblxuZnVuY3Rpb24gZGVmYXVsdFJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXG4gICAgYFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyYCk7XG59XG4iLCAiLy8vIDxyZWZlcmVuY2UgbGliPVwiZXMyMDE4LmFzeW5jaXRlcmFibGVcIiAvPlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmV4cG9ydCBjb25zdCBBc3luY0l0ZXJhdG9yUHJvdG90eXBlOiBBc3luY0l0ZXJhYmxlPGFueT4gfCB1bmRlZmluZWQgPVxuICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0LmdldFByb3RvdHlwZU9mKGFzeW5jIGZ1bmN0aW9uKiAoKTogQXN5bmNJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge30pLnByb3RvdHlwZSk7XG4iLCAiLy8vIDxyZWZlcmVuY2UgbGliPVwiZXMyMDE4LmFzeW5jaXRlcmFibGVcIiAvPlxuXG5pbXBvcnQgeyBSZWFkYWJsZVN0cmVhbSB9IGZyb20gJy4uL3JlYWRhYmxlLXN0cmVhbSc7XG5pbXBvcnQge1xuICBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQsXG4gIFJlYWRSZXF1ZXN0XG59IGZyb20gJy4vZGVmYXVsdC1yZWFkZXInO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsLFxuICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlLFxuICByZWFkZXJMb2NrRXhjZXB0aW9uXG59IGZyb20gJy4vZ2VuZXJpYy1yZWFkZXInO1xuaW1wb3J0IGFzc2VydCBmcm9tICcuLi8uLi9zdHViL2Fzc2VydCc7XG5pbXBvcnQgeyBBc3luY0l0ZXJhdG9yUHJvdG90eXBlIH0gZnJvbSAnQEB0YXJnZXQvc3R1Yi9hc3luYy1pdGVyYXRvci1wcm90b3R5cGUnO1xuaW1wb3J0IHsgdHlwZUlzT2JqZWN0IH0gZnJvbSAnLi4vaGVscGVycy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7XG4gIG5ld1Byb21pc2UsXG4gIHByb21pc2VSZWplY3RlZFdpdGgsXG4gIHByb21pc2VSZXNvbHZlZFdpdGgsXG4gIHF1ZXVlTWljcm90YXNrLFxuICB0cmFuc2Zvcm1Qcm9taXNlV2l0aFxufSBmcm9tICcuLi9oZWxwZXJzL3dlYmlkbCc7XG5cbi8qKlxuICogQW4gYXN5bmMgaXRlcmF0b3IgcmV0dXJuZWQgYnkge0BsaW5rIFJlYWRhYmxlU3RyZWFtLnZhbHVlc30uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvcjxSPiBleHRlbmRzIEFzeW5jSXRlcmF0b3I8Uj4ge1xuICBuZXh0KCk6IFByb21pc2U8SXRlcmF0b3JSZXN1bHQ8UiwgdW5kZWZpbmVkPj47XG5cbiAgcmV0dXJuKHZhbHVlPzogYW55KTogUHJvbWlzZTxJdGVyYXRvclJlc3VsdDxhbnk+Pjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckltcGw8Uj4ge1xuICBwcml2YXRlIHJlYWRvbmx5IF9yZWFkZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPjtcbiAgcHJpdmF0ZSByZWFkb25seSBfcHJldmVudENhbmNlbDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfb25nb2luZ1Byb21pc2U6IFByb21pc2U8UmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdDxSPj4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2lzRmluaXNoZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihyZWFkZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPiwgcHJldmVudENhbmNlbDogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRlciA9IHJlYWRlcjtcbiAgICB0aGlzLl9wcmV2ZW50Q2FuY2VsID0gcHJldmVudENhbmNlbDtcbiAgfVxuXG4gIG5leHQoKTogUHJvbWlzZTxSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PFI+PiB7XG4gICAgY29uc3QgbmV4dFN0ZXBzID0gKCkgPT4gdGhpcy5fbmV4dFN0ZXBzKCk7XG4gICAgdGhpcy5fb25nb2luZ1Byb21pc2UgPSB0aGlzLl9vbmdvaW5nUHJvbWlzZSA/XG4gICAgICB0cmFuc2Zvcm1Qcm9taXNlV2l0aCh0aGlzLl9vbmdvaW5nUHJvbWlzZSwgbmV4dFN0ZXBzLCBuZXh0U3RlcHMpIDpcbiAgICAgIG5leHRTdGVwcygpO1xuICAgIHJldHVybiB0aGlzLl9vbmdvaW5nUHJvbWlzZTtcbiAgfVxuXG4gIHJldHVybih2YWx1ZTogYW55KTogUHJvbWlzZTxSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PGFueT4+IHtcbiAgICBjb25zdCByZXR1cm5TdGVwcyA9ICgpID0+IHRoaXMuX3JldHVyblN0ZXBzKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5fb25nb2luZ1Byb21pc2UgP1xuICAgICAgdHJhbnNmb3JtUHJvbWlzZVdpdGgodGhpcy5fb25nb2luZ1Byb21pc2UsIHJldHVyblN0ZXBzLCByZXR1cm5TdGVwcykgOlxuICAgICAgcmV0dXJuU3RlcHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRTdGVwcygpOiBQcm9taXNlPFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8Uj4+IHtcbiAgICBpZiAodGhpcy5faXNGaW5pc2hlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVhZGVyID0gdGhpcy5fcmVhZGVyO1xuICAgIGlmIChyZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgocmVhZGVyTG9ja0V4Y2VwdGlvbignaXRlcmF0ZScpKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2UhOiAocmVzdWx0OiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkUmVzdWx0PFI+KSA9PiB2b2lkO1xuICAgIGxldCByZWplY3RQcm9taXNlITogKHJlYXNvbjogYW55KSA9PiB2b2lkO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXdQcm9taXNlPFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8Uj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgIHJlamVjdFByb21pc2UgPSByZWplY3Q7XG4gICAgfSk7XG4gICAgY29uc3QgcmVhZFJlcXVlc3Q6IFJlYWRSZXF1ZXN0PFI+ID0ge1xuICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgdGhpcy5fb25nb2luZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVsYXllZCBieSBvbmUgbWljcm90YXNrLCBvdGhlcndpc2Ugd2Ugc3RvcCBwdWxsaW5nIHRvbyBlYXJseSB3aGljaCBicmVha3MgYSB0ZXN0LlxuICAgICAgICAvLyBGSVhNRSBJcyB0aGlzIGEgYnVnIGluIHRoZSBzcGVjaWZpY2F0aW9uLCBvciBpbiB0aGUgdGVzdD9cbiAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4gcmVzb2x2ZVByb21pc2UoeyB2YWx1ZTogY2h1bmssIGRvbmU6IGZhbHNlIH0pKTtcbiAgICAgIH0sXG4gICAgICBfY2xvc2VTdGVwczogKCkgPT4ge1xuICAgICAgICB0aGlzLl9vbmdvaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5faXNGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcbiAgICAgICAgcmVzb2x2ZVByb21pc2UoeyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH0pO1xuICAgICAgfSxcbiAgICAgIF9lcnJvclN0ZXBzOiByZWFzb24gPT4ge1xuICAgICAgICB0aGlzLl9vbmdvaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5faXNGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcbiAgICAgICAgcmVqZWN0UHJvbWlzZShyZWFzb24pO1xuICAgICAgfVxuICAgIH07XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyUmVhZChyZWFkZXIsIHJlYWRSZXF1ZXN0KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JldHVyblN0ZXBzKHZhbHVlOiBhbnkpOiBQcm9taXNlPFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8YW55Pj4ge1xuICAgIGlmICh0aGlzLl9pc0ZpbmlzaGVkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgdmFsdWUsIGRvbmU6IHRydWUgfSk7XG4gICAgfVxuICAgIHRoaXMuX2lzRmluaXNoZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgcmVhZGVyID0gdGhpcy5fcmVhZGVyO1xuICAgIGlmIChyZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgocmVhZGVyTG9ja0V4Y2VwdGlvbignZmluaXNoIGl0ZXJhdGluZycpKTtcbiAgICB9XG5cbiAgICBhc3NlcnQocmVhZGVyLl9yZWFkUmVxdWVzdHMubGVuZ3RoID09PSAwKTtcblxuICAgIGlmICghdGhpcy5fcHJldmVudENhbmNlbCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsKHJlYWRlciwgdmFsdWUpO1xuICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpO1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybVByb21pc2VXaXRoKHJlc3VsdCwgKCkgPT4gKHsgdmFsdWUsIGRvbmU6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh7IHZhbHVlLCBkb25lOiB0cnVlIH0pO1xuICB9XG59XG5cbmRlY2xhcmUgY2xhc3MgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW5zdGFuY2U8Uj4gaW1wbGVtZW50cyBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8Uj4ge1xuICAvKiogQGludGVyYWwgKi9cbiAgX2FzeW5jSXRlcmF0b3JJbXBsOiBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JJbXBsPFI+O1xuXG4gIG5leHQoKTogUHJvbWlzZTxJdGVyYXRvclJlc3VsdDxSLCB1bmRlZmluZWQ+PjtcblxuICByZXR1cm4odmFsdWU/OiBhbnkpOiBQcm9taXNlPEl0ZXJhdG9yUmVzdWx0PGFueT4+O1xufVxuXG5jb25zdCBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JQcm90b3R5cGU6IFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckluc3RhbmNlPGFueT4gPSB7XG4gIG5leHQodGhpczogUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW5zdGFuY2U8YW55Pik6IFByb21pc2U8UmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdDxhbnk+PiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtQXN5bmNJdGVyYXRvckJyYW5kQ2hlY2tFeGNlcHRpb24oJ25leHQnKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hc3luY0l0ZXJhdG9ySW1wbC5uZXh0KCk7XG4gIH0sXG5cbiAgcmV0dXJuKHRoaXM6IFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckluc3RhbmNlPGFueT4sIHZhbHVlOiBhbnkpOiBQcm9taXNlPFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHQ8YW55Pj4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbUFzeW5jSXRlcmF0b3JCcmFuZENoZWNrRXhjZXB0aW9uKCdyZXR1cm4nKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hc3luY0l0ZXJhdG9ySW1wbC5yZXR1cm4odmFsdWUpO1xuICB9XG59IGFzIGFueTtcbmlmIChBc3luY0l0ZXJhdG9yUHJvdG90eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvclByb3RvdHlwZSwgQXN5bmNJdGVyYXRvclByb3RvdHlwZSk7XG59XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cblxuZXhwb3J0IGZ1bmN0aW9uIEFjcXVpcmVSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8Uj4oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxSPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnRDYW5jZWw6IGJvb2xlYW4pOiBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8Uj4ge1xuICBjb25zdCByZWFkZXIgPSBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+KHN0cmVhbSk7XG4gIGNvbnN0IGltcGwgPSBuZXcgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW1wbChyZWFkZXIsIHByZXZlbnRDYW5jZWwpO1xuICBjb25zdCBpdGVyYXRvcjogUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW5zdGFuY2U8Uj4gPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvclByb3RvdHlwZSk7XG4gIGl0ZXJhdG9yLl9hc3luY0l0ZXJhdG9ySW1wbCA9IGltcGw7XG4gIHJldHVybiBpdGVyYXRvcjtcbn1cblxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8UiA9IGFueT4oeDogYW55KTogeCBpcyBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8Uj4ge1xuICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfYXN5bmNJdGVyYXRvckltcGwnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gbm9pbnNwZWN0aW9uIFN1c3BpY2lvdXNUeXBlT2ZHdWFyZFxuICAgIHJldHVybiAoeCBhcyBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JJbnN0YW5jZTxhbnk+KS5fYXN5bmNJdGVyYXRvckltcGwgaW5zdGFuY2VvZlxuICAgICAgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW1wbDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cblxuZnVuY3Rpb24gc3RyZWFtQXN5bmNJdGVyYXRvckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvci4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZVN0ZWFtQXN5bmNJdGVyYXRvcmApO1xufVxuIiwgIi8vLyA8cmVmZXJlbmNlIGxpYj1cImVzMjAxNS5jb3JlXCIgLz5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyL2lzTmFOI1BvbHlmaWxsXG5jb25zdCBOdW1iZXJJc05hTjogdHlwZW9mIE51bWJlci5pc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiAoeCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gIHJldHVybiB4ICE9PSB4O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTnVtYmVySXNOYU47XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUFycmF5RnJvbUxpc3Q8VCBleHRlbmRzIGFueVtdPihlbGVtZW50czogVCk6IFQge1xuICAvLyBXZSB1c2UgYXJyYXlzIHRvIHJlcHJlc2VudCBsaXN0cywgc28gdGhpcyBpcyBiYXNpY2FsbHkgYSBuby1vcC5cbiAgLy8gRG8gYSBzbGljZSB0aG91Z2gganVzdCBpbiBjYXNlIHdlIGhhcHBlbiB0byBkZXBlbmQgb24gdGhlIHVuaXF1ZS1uZXNzLlxuICByZXR1cm4gZWxlbWVudHMuc2xpY2UoKSBhcyBUO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29weURhdGFCbG9ja0J5dGVzKGRlc3Q6IEFycmF5QnVmZmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0T2Zmc2V0OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogQXJyYXlCdWZmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY09mZnNldDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuOiBudW1iZXIpIHtcbiAgbmV3IFVpbnQ4QXJyYXkoZGVzdCkuc2V0KG5ldyBVaW50OEFycmF5KHNyYywgc3JjT2Zmc2V0LCBuKSwgZGVzdE9mZnNldCk7XG59XG5cbi8vIE5vdCBpbXBsZW1lbnRlZCBjb3JyZWN0bHlcbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2ZlckFycmF5QnVmZmVyPFQgZXh0ZW5kcyBBcnJheUJ1ZmZlckxpa2U+KE86IFQpOiBUIHtcbiAgcmV0dXJuIE87XG59XG5cbi8vIE5vdCBpbXBsZW1lbnRlZCBjb3JyZWN0bHlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmV4cG9ydCBmdW5jdGlvbiBDYW5UcmFuc2ZlckFycmF5QnVmZmVyKE86IEFycmF5QnVmZmVyTGlrZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gTm90IGltcGxlbWVudGVkIGNvcnJlY3RseVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuZXhwb3J0IGZ1bmN0aW9uIElzRGV0YWNoZWRCdWZmZXIoTzogQXJyYXlCdWZmZXJMaWtlKTogYm9vbGVhbiB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFycmF5QnVmZmVyU2xpY2UoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIGJlZ2luOiBudW1iZXIsIGVuZDogbnVtYmVyKTogQXJyYXlCdWZmZXJMaWtlIHtcbiAgLy8gQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlIGlzIG5vdCBhdmFpbGFibGUgb24gSUUxMFxuICAvLyBodHRwczovL3d3dy5jYW5pdXNlLmNvbS9tZG4tamF2YXNjcmlwdF9idWlsdGluc19hcnJheWJ1ZmZlcl9zbGljZVxuICBpZiAoYnVmZmVyLnNsaWNlKSB7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZShiZWdpbiwgZW5kKTtcbiAgfVxuICBjb25zdCBsZW5ndGggPSBlbmQgLSBiZWdpbjtcbiAgY29uc3Qgc2xpY2UgPSBuZXcgQXJyYXlCdWZmZXIobGVuZ3RoKTtcbiAgQ29weURhdGFCbG9ja0J5dGVzKHNsaWNlLCAwLCBidWZmZXIsIGJlZ2luLCBsZW5ndGgpO1xuICByZXR1cm4gc2xpY2U7XG59XG4iLCAiaW1wb3J0IE51bWJlcklzTmFOIGZyb20gJy4uLy4uL3N0dWIvbnVtYmVyLWlzbmFuJztcbmltcG9ydCB7IEFycmF5QnVmZmVyU2xpY2UgfSBmcm9tICcuL2VjbWFzY3JpcHQnO1xuXG5leHBvcnQgZnVuY3Rpb24gSXNOb25OZWdhdGl2ZU51bWJlcih2OiBudW1iZXIpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB2ICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChOdW1iZXJJc05hTih2KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh2IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2xvbmVBc1VpbnQ4QXJyYXkoTzogQXJyYXlCdWZmZXJWaWV3KTogVWludDhBcnJheSB7XG4gIGNvbnN0IGJ1ZmZlciA9IEFycmF5QnVmZmVyU2xpY2UoTy5idWZmZXIsIE8uYnl0ZU9mZnNldCwgTy5ieXRlT2Zmc2V0ICsgTy5ieXRlTGVuZ3RoKTtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG59XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICcuLi8uLi9zdHViL2Fzc2VydCc7XG5pbXBvcnQgeyBTaW1wbGVRdWV1ZSB9IGZyb20gJy4uL3NpbXBsZS1xdWV1ZSc7XG5pbXBvcnQgeyBJc05vbk5lZ2F0aXZlTnVtYmVyIH0gZnJvbSAnLi9taXNjZWxsYW5lb3VzJztcblxuZXhwb3J0IGludGVyZmFjZSBRdWV1ZUNvbnRhaW5lcjxUPiB7XG4gIF9xdWV1ZTogU2ltcGxlUXVldWU8VD47XG4gIF9xdWV1ZVRvdGFsU2l6ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXVlUGFpcjxUPiB7XG4gIHZhbHVlOiBUO1xuICBzaXplOiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEZXF1ZXVlVmFsdWU8VD4oY29udGFpbmVyOiBRdWV1ZUNvbnRhaW5lcjxRdWV1ZVBhaXI8VD4+KTogVCB7XG4gIGFzc2VydCgnX3F1ZXVlJyBpbiBjb250YWluZXIgJiYgJ19xdWV1ZVRvdGFsU2l6ZScgaW4gY29udGFpbmVyKTtcbiAgYXNzZXJ0KGNvbnRhaW5lci5fcXVldWUubGVuZ3RoID4gMCk7XG5cbiAgY29uc3QgcGFpciA9IGNvbnRhaW5lci5fcXVldWUuc2hpZnQoKSE7XG4gIGNvbnRhaW5lci5fcXVldWVUb3RhbFNpemUgLT0gcGFpci5zaXplO1xuICBpZiAoY29udGFpbmVyLl9xdWV1ZVRvdGFsU2l6ZSA8IDApIHtcbiAgICBjb250YWluZXIuX3F1ZXVlVG90YWxTaXplID0gMDtcbiAgfVxuXG4gIHJldHVybiBwYWlyLnZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRW5xdWV1ZVZhbHVlV2l0aFNpemU8VD4oY29udGFpbmVyOiBRdWV1ZUNvbnRhaW5lcjxRdWV1ZVBhaXI8VD4+LCB2YWx1ZTogVCwgc2l6ZTogbnVtYmVyKSB7XG4gIGFzc2VydCgnX3F1ZXVlJyBpbiBjb250YWluZXIgJiYgJ19xdWV1ZVRvdGFsU2l6ZScgaW4gY29udGFpbmVyKTtcblxuICBpZiAoIUlzTm9uTmVnYXRpdmVOdW1iZXIoc2l6ZSkgfHwgc2l6ZSA9PT0gSW5maW5pdHkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignU2l6ZSBtdXN0IGJlIGEgZmluaXRlLCBub24tTmFOLCBub24tbmVnYXRpdmUgbnVtYmVyLicpO1xuICB9XG5cbiAgY29udGFpbmVyLl9xdWV1ZS5wdXNoKHsgdmFsdWUsIHNpemUgfSk7XG4gIGNvbnRhaW5lci5fcXVldWVUb3RhbFNpemUgKz0gc2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBlZWtRdWV1ZVZhbHVlPFQ+KGNvbnRhaW5lcjogUXVldWVDb250YWluZXI8UXVldWVQYWlyPFQ+Pik6IFQge1xuICBhc3NlcnQoJ19xdWV1ZScgaW4gY29udGFpbmVyICYmICdfcXVldWVUb3RhbFNpemUnIGluIGNvbnRhaW5lcik7XG4gIGFzc2VydChjb250YWluZXIuX3F1ZXVlLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IHBhaXIgPSBjb250YWluZXIuX3F1ZXVlLnBlZWsoKTtcbiAgcmV0dXJuIHBhaXIudmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXNldFF1ZXVlPFQ+KGNvbnRhaW5lcjogUXVldWVDb250YWluZXI8VD4pIHtcbiAgYXNzZXJ0KCdfcXVldWUnIGluIGNvbnRhaW5lciAmJiAnX3F1ZXVlVG90YWxTaXplJyBpbiBjb250YWluZXIpO1xuXG4gIGNvbnRhaW5lci5fcXVldWUgPSBuZXcgU2ltcGxlUXVldWU8VD4oKTtcbiAgY29udGFpbmVyLl9xdWV1ZVRvdGFsU2l6ZSA9IDA7XG59XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICcuLi8uLi9zdHViL2Fzc2VydCc7XG5pbXBvcnQgeyBTaW1wbGVRdWV1ZSB9IGZyb20gJy4uL3NpbXBsZS1xdWV1ZSc7XG5pbXBvcnQgeyBSZXNldFF1ZXVlIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb3BzL3F1ZXVlLXdpdGgtc2l6ZXMnO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1BZGRSZWFkUmVxdWVzdCxcbiAgUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZFJlcXVlc3QsXG4gIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZFJlcXVlc3RzLFxuICBSZWFkYWJsZVN0cmVhbUhhc0RlZmF1bHRSZWFkZXIsXG4gIFJlYWRSZXF1ZXN0XG59IGZyb20gJy4vZGVmYXVsdC1yZWFkZXInO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1BZGRSZWFkSW50b1JlcXVlc3QsXG4gIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRJbnRvUmVxdWVzdCxcbiAgUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkSW50b1JlcXVlc3RzLFxuICBSZWFkYWJsZVN0cmVhbUhhc0JZT0JSZWFkZXIsXG4gIFJlYWRJbnRvUmVxdWVzdFxufSBmcm9tICcuL2J5b2ItcmVhZGVyJztcbmltcG9ydCBOdW1iZXJJc0ludGVnZXIgZnJvbSAnLi4vLi4vc3R1Yi9udW1iZXItaXNpbnRlZ2VyJztcbmltcG9ydCB7XG4gIElzUmVhZGFibGVTdHJlYW1Mb2NrZWQsXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgUmVhZGFibGVTdHJlYW1DbG9zZSxcbiAgUmVhZGFibGVTdHJlYW1FcnJvclxufSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgVmFsaWRhdGVkVW5kZXJseWluZ0J5dGVTb3VyY2UgfSBmcm9tICcuL3VuZGVybHlpbmctc291cmNlJztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQge1xuICBBcnJheUJ1ZmZlclNsaWNlLFxuICBDYW5UcmFuc2ZlckFycmF5QnVmZmVyLFxuICBDb3B5RGF0YUJsb2NrQnl0ZXMsXG4gIElzRGV0YWNoZWRCdWZmZXIsXG4gIFRyYW5zZmVyQXJyYXlCdWZmZXJcbn0gZnJvbSAnLi4vYWJzdHJhY3Qtb3BzL2VjbWFzY3JpcHQnO1xuaW1wb3J0IHsgQ2FuY2VsU3RlcHMsIFB1bGxTdGVwcyB9IGZyb20gJy4uL2Fic3RyYWN0LW9wcy9pbnRlcm5hbC1tZXRob2RzJztcbmltcG9ydCB7IHByb21pc2VSZXNvbHZlZFdpdGgsIHVwb25Qcm9taXNlIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHsgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudCwgY29udmVydFVuc2lnbmVkTG9uZ0xvbmdXaXRoRW5mb3JjZVJhbmdlIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9iYXNpYyc7XG5cbi8qKlxuICogQSBwdWxsLWludG8gcmVxdWVzdCBpbiBhIHtAbGluayBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIhOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyO1xuICAvKiogQGludGVybmFsICovXG4gIF92aWV3ITogQXJyYXlCdWZmZXJWaWV3IHwgbnVsbDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aWV3IGZvciB3cml0aW5nIGluIHRvLCBvciBgbnVsbGAgaWYgdGhlIEJZT0IgcmVxdWVzdCBoYXMgYWxyZWFkeSBiZWVuIHJlc3BvbmRlZCB0by5cbiAgICovXG4gIGdldCB2aWV3KCk6IEFycmF5QnVmZmVyVmlldyB8IG51bGwge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KHRoaXMpKSB7XG4gICAgICB0aHJvdyBieW9iUmVxdWVzdEJyYW5kQ2hlY2tFeGNlcHRpb24oJ3ZpZXcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fdmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdG8gdGhlIGFzc29jaWF0ZWQgcmVhZGFibGUgYnl0ZSBzdHJlYW0gdGhhdCBgYnl0ZXNXcml0dGVuYCBieXRlcyB3ZXJlIHdyaXR0ZW4gaW50b1xuICAgKiB7QGxpbmsgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdC52aWV3IHwgdmlld30sIGNhdXNpbmcgdGhlIHJlc3VsdCBiZSBzdXJmYWNlZCB0byB0aGUgY29uc3VtZXIuXG4gICAqXG4gICAqIEFmdGVyIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCwge0BsaW5rIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QudmlldyB8IHZpZXd9IHdpbGwgYmUgdHJhbnNmZXJyZWQgYW5kIG5vIGxvbmdlclxuICAgKiBtb2RpZmlhYmxlLlxuICAgKi9cbiAgcmVzcG9uZChieXRlc1dyaXR0ZW46IG51bWJlcik6IHZvaWQ7XG4gIHJlc3BvbmQoYnl0ZXNXcml0dGVuOiBudW1iZXIgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCh0aGlzKSkge1xuICAgICAgdGhyb3cgYnlvYlJlcXVlc3RCcmFuZENoZWNrRXhjZXB0aW9uKCdyZXNwb25kJyk7XG4gICAgfVxuICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQoYnl0ZXNXcml0dGVuLCAxLCAncmVzcG9uZCcpO1xuICAgIGJ5dGVzV3JpdHRlbiA9IGNvbnZlcnRVbnNpZ25lZExvbmdMb25nV2l0aEVuZm9yY2VSYW5nZShieXRlc1dyaXR0ZW4sICdGaXJzdCBwYXJhbWV0ZXInKTtcblxuICAgIGlmICh0aGlzLl9hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIEJZT0IgcmVxdWVzdCBoYXMgYmVlbiBpbnZhbGlkYXRlZCcpO1xuICAgIH1cblxuICAgIGlmIChJc0RldGFjaGVkQnVmZmVyKHRoaXMuX3ZpZXchLmJ1ZmZlcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBCWU9CIHJlcXVlc3QncyBidWZmZXIgaGFzIGJlZW4gZGV0YWNoZWQgYW5kIHNvIGNhbm5vdCBiZSB1c2VkIGFzIGEgcmVzcG9uc2VgKTtcbiAgICB9XG5cbiAgICBhc3NlcnQodGhpcy5fdmlldyEuYnl0ZUxlbmd0aCA+IDApO1xuICAgIGFzc2VydCh0aGlzLl92aWV3IS5idWZmZXIuYnl0ZUxlbmd0aCA+IDApO1xuXG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmQodGhpcy5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbik7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRvIHRoZSBhc3NvY2lhdGVkIHJlYWRhYmxlIGJ5dGUgc3RyZWFtIHRoYXQgaW5zdGVhZCBvZiB3cml0aW5nIGludG9cbiAgICoge0BsaW5rIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QudmlldyB8IHZpZXd9LCB0aGUgdW5kZXJseWluZyBieXRlIHNvdXJjZSBpcyBwcm92aWRpbmcgYSBuZXcgYEFycmF5QnVmZmVyVmlld2AsXG4gICAqIHdoaWNoIHdpbGwgYmUgZ2l2ZW4gdG8gdGhlIGNvbnN1bWVyIG9mIHRoZSByZWFkYWJsZSBieXRlIHN0cmVhbS5cbiAgICpcbiAgICogQWZ0ZXIgdGhpcyBtZXRob2QgaXMgY2FsbGVkLCBgdmlld2Agd2lsbCBiZSB0cmFuc2ZlcnJlZCBhbmQgbm8gbG9uZ2VyIG1vZGlmaWFibGUuXG4gICAqL1xuICByZXNwb25kV2l0aE5ld1ZpZXcodmlldzogQXJyYXlCdWZmZXJWaWV3KTogdm9pZDtcbiAgcmVzcG9uZFdpdGhOZXdWaWV3KHZpZXc6IEFycmF5QnVmZmVyVmlldyB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KHRoaXMpKSB7XG4gICAgICB0aHJvdyBieW9iUmVxdWVzdEJyYW5kQ2hlY2tFeGNlcHRpb24oJ3Jlc3BvbmRXaXRoTmV3VmlldycpO1xuICAgIH1cbiAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KHZpZXcsIDEsICdyZXNwb25kV2l0aE5ld1ZpZXcnKTtcblxuICAgIGlmICghQXJyYXlCdWZmZXIuaXNWaWV3KHZpZXcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgY2FuIG9ubHkgcmVzcG9uZCB3aXRoIGFycmF5IGJ1ZmZlciB2aWV3cycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIEJZT0IgcmVxdWVzdCBoYXMgYmVlbiBpbnZhbGlkYXRlZCcpO1xuICAgIH1cblxuICAgIGlmIChJc0RldGFjaGVkQnVmZmVyKHZpZXcuYnVmZmVyKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGdpdmVuIHZpZXdcXCdzIGJ1ZmZlciBoYXMgYmVlbiBkZXRhY2hlZCBhbmQgc28gY2Fubm90IGJlIHVzZWQgYXMgYSByZXNwb25zZScpO1xuICAgIH1cblxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kV2l0aE5ld1ZpZXcodGhpcy5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsIHZpZXcpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QucHJvdG90eXBlLCB7XG4gIHJlc3BvbmQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICByZXNwb25kV2l0aE5ld1ZpZXc6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICB2aWV3OiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1JlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QnLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuaW50ZXJmYWNlIEFycmF5QnVmZmVyVmlld0NvbnN0cnVjdG9yPFQgZXh0ZW5kcyBBcnJheUJ1ZmZlclZpZXcgPSBBcnJheUJ1ZmZlclZpZXc+IHtcbiAgbmV3KGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBieXRlT2Zmc2V0OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IFQ7XG5cbiAgcmVhZG9ubHkgcHJvdG90eXBlOiBUO1xuICByZWFkb25seSBCWVRFU19QRVJfRUxFTUVOVDogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgQnl0ZVF1ZXVlRWxlbWVudCB7XG4gIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlO1xuICBieXRlT2Zmc2V0OiBudW1iZXI7XG4gIGJ5dGVMZW5ndGg6IG51bWJlcjtcbn1cblxudHlwZSBQdWxsSW50b0Rlc2NyaXB0b3I8VCBleHRlbmRzIEFycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyVmlldz4gPVxuICBEZWZhdWx0UHVsbEludG9EZXNjcmlwdG9yXG4gIHwgQllPQlB1bGxJbnRvRGVzY3JpcHRvcjxUPjtcblxuaW50ZXJmYWNlIERlZmF1bHRQdWxsSW50b0Rlc2NyaXB0b3Ige1xuICBidWZmZXI6IEFycmF5QnVmZmVyTGlrZTtcbiAgYnVmZmVyQnl0ZUxlbmd0aDogbnVtYmVyO1xuICBieXRlT2Zmc2V0OiBudW1iZXI7XG4gIGJ5dGVMZW5ndGg6IG51bWJlcjtcbiAgYnl0ZXNGaWxsZWQ6IG51bWJlcjtcbiAgZWxlbWVudFNpemU6IG51bWJlcjtcbiAgdmlld0NvbnN0cnVjdG9yOiBBcnJheUJ1ZmZlclZpZXdDb25zdHJ1Y3RvcjxVaW50OEFycmF5PjtcbiAgcmVhZGVyVHlwZTogJ2RlZmF1bHQnO1xufVxuXG5pbnRlcmZhY2UgQllPQlB1bGxJbnRvRGVzY3JpcHRvcjxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXJWaWV3PiB7XG4gIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlO1xuICBidWZmZXJCeXRlTGVuZ3RoOiBudW1iZXI7XG4gIGJ5dGVPZmZzZXQ6IG51bWJlcjtcbiAgYnl0ZUxlbmd0aDogbnVtYmVyO1xuICBieXRlc0ZpbGxlZDogbnVtYmVyO1xuICBlbGVtZW50U2l6ZTogbnVtYmVyO1xuICB2aWV3Q29uc3RydWN0b3I6IEFycmF5QnVmZmVyVmlld0NvbnN0cnVjdG9yPFQ+O1xuICByZWFkZXJUeXBlOiAnYnlvYic7XG59XG5cbi8qKlxuICogQWxsb3dzIGNvbnRyb2wgb2YgYSB7QGxpbmsgUmVhZGFibGVTdHJlYW0gfCByZWFkYWJsZSBieXRlIHN0cmVhbX0ncyBzdGF0ZSBhbmQgaW50ZXJuYWwgcXVldWUuXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY2xhc3MgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0hOiBSZWFkYWJsZUJ5dGVTdHJlYW07XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3F1ZXVlITogU2ltcGxlUXVldWU8Qnl0ZVF1ZXVlRWxlbWVudD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3F1ZXVlVG90YWxTaXplITogbnVtYmVyO1xuICAvKiogQGludGVybmFsICovXG4gIF9zdGFydGVkITogYm9vbGVhbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VSZXF1ZXN0ZWQhOiBib29sZWFuO1xuICAvKiogQGludGVybmFsICovXG4gIF9wdWxsQWdhaW4hOiBib29sZWFuO1xuICAvKiogQGludGVybmFsICovXG4gIF9wdWxsaW5nICE6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0cmF0ZWd5SFdNITogbnVtYmVyO1xuICAvKiogQGludGVybmFsICovXG4gIF9wdWxsQWxnb3JpdGhtITogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2FuY2VsQWxnb3JpdGhtITogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+O1xuICAvKiogQGludGVybmFsICovXG4gIF9hdXRvQWxsb2NhdGVDaHVua1NpemU6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYnlvYlJlcXVlc3Q6IFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QgfCBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9wZW5kaW5nUHVsbEludG9zITogU2ltcGxlUXVldWU8UHVsbEludG9EZXNjcmlwdG9yPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IEJZT0IgcHVsbCByZXF1ZXN0LCBvciBgbnVsbGAgaWYgdGhlcmUgaXNuJ3Qgb25lLlxuICAgKi9cbiAgZ2V0IGJ5b2JSZXF1ZXN0KCk6IFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QgfCBudWxsIHtcbiAgICBpZiAoIUlzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgYnl0ZVN0cmVhbUNvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdieW9iUmVxdWVzdCcpO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0QllPQlJlcXVlc3QodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVzaXJlZCBzaXplIHRvIGZpbGwgdGhlIGNvbnRyb2xsZWQgc3RyZWFtJ3MgaW50ZXJuYWwgcXVldWUuIEl0IGNhbiBiZSBuZWdhdGl2ZSwgaWYgdGhlIHF1ZXVlIGlzXG4gICAqIG92ZXItZnVsbC4gQW4gdW5kZXJseWluZyBieXRlIHNvdXJjZSBvdWdodCB0byB1c2UgdGhpcyBpbmZvcm1hdGlvbiB0byBkZXRlcm1pbmUgd2hlbiBhbmQgaG93IHRvIGFwcGx5IGJhY2twcmVzc3VyZS5cbiAgICovXG4gIGdldCBkZXNpcmVkU2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIUlzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgYnl0ZVN0cmVhbUNvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdkZXNpcmVkU2l6ZScpO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0RGVzaXJlZFNpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBjb250cm9sbGVkIHJlYWRhYmxlIHN0cmVhbS4gQ29uc3VtZXJzIHdpbGwgc3RpbGwgYmUgYWJsZSB0byByZWFkIGFueSBwcmV2aW91c2x5LWVucXVldWVkIGNodW5rcyBmcm9tXG4gICAqIHRoZSBzdHJlYW0sIGJ1dCBvbmNlIHRob3NlIGFyZSByZWFkLCB0aGUgc3RyZWFtIHdpbGwgYmVjb21lIGNsb3NlZC5cbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBieXRlU3RyZWFtQ29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Nsb3NlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2Nsb3NlUmVxdWVzdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc3RyZWFtIGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkOyBkbyBub3QgY2xvc2UgaXQgYWdhaW4hJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgIT09ICdyZWFkYWJsZScpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBzdHJlYW0gKGluICR7c3RhdGV9IHN0YXRlKSBpcyBub3QgaW4gdGhlIHJlYWRhYmxlIHN0YXRlIGFuZCBjYW5ub3QgYmUgY2xvc2VkYCk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVucXVldWVzIHRoZSBnaXZlbiBjaHVuayBjaHVuayBpbiB0aGUgY29udHJvbGxlZCByZWFkYWJsZSBzdHJlYW0uXG4gICAqIFRoZSBjaHVuayBoYXMgdG8gYmUgYW4gYEFycmF5QnVmZmVyVmlld2AgaW5zdGFuY2UsIG9yIGVsc2UgYSBgVHlwZUVycm9yYCB3aWxsIGJlIHRocm93bi5cbiAgICovXG4gIGVucXVldWUoY2h1bms6IEFycmF5QnVmZmVyVmlldyk6IHZvaWQ7XG4gIGVucXVldWUoY2h1bms6IEFycmF5QnVmZmVyVmlldyB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBieXRlU3RyZWFtQ29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2VucXVldWUnKTtcbiAgICB9XG5cbiAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KGNodW5rLCAxLCAnZW5xdWV1ZScpO1xuICAgIGlmICghQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2h1bmsgbXVzdCBiZSBhbiBhcnJheSBidWZmZXIgdmlldycpO1xuICAgIH1cbiAgICBpZiAoY2h1bmsuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2h1bmsgbXVzdCBoYXZlIG5vbi16ZXJvIGJ5dGVMZW5ndGgnKTtcbiAgICB9XG4gICAgaWYgKGNodW5rLmJ1ZmZlci5ieXRlTGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBjaHVuaydzIGJ1ZmZlciBtdXN0IGhhdmUgbm9uLXplcm8gYnl0ZUxlbmd0aGApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jbG9zZVJlcXVlc3RlZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc3RyZWFtIGlzIGNsb3NlZCBvciBkcmFpbmluZycpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgc3RyZWFtIChpbiAke3N0YXRlfSBzdGF0ZSkgaXMgbm90IGluIHRoZSByZWFkYWJsZSBzdGF0ZSBhbmQgY2Fubm90IGJlIGVucXVldWVkIHRvYCk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWUodGhpcywgY2h1bmspO1xuICB9XG5cbiAgLyoqXG4gICAqIEVycm9ycyB0aGUgY29udHJvbGxlZCByZWFkYWJsZSBzdHJlYW0sIG1ha2luZyBhbGwgZnV0dXJlIGludGVyYWN0aW9ucyB3aXRoIGl0IGZhaWwgd2l0aCB0aGUgZ2l2ZW4gZXJyb3IgYGVgLlxuICAgKi9cbiAgZXJyb3IoZTogYW55ID0gdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKCFJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGJ5dGVTdHJlYW1Db250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZXJyb3InKTtcbiAgICB9XG5cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IodGhpcywgZSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIFtDYW5jZWxTdGVwc10ocmVhc29uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJQZW5kaW5nUHVsbEludG9zKHRoaXMpO1xuXG4gICAgUmVzZXRRdWV1ZSh0aGlzKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2NhbmNlbEFsZ29yaXRobShyZWFzb24pO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhckFsZ29yaXRobXModGhpcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgW1B1bGxTdGVwc10ocmVhZFJlcXVlc3Q6IFJlYWRSZXF1ZXN0PFVpbnQ4QXJyYXk+KTogdm9pZCB7XG4gICAgY29uc3Qgc3RyZWFtID0gdGhpcy5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcbiAgICBhc3NlcnQoUmVhZGFibGVTdHJlYW1IYXNEZWZhdWx0UmVhZGVyKHN0cmVhbSkpO1xuXG4gICAgaWYgKHRoaXMuX3F1ZXVlVG90YWxTaXplID4gMCkge1xuICAgICAgYXNzZXJ0KFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZFJlcXVlc3RzKHN0cmVhbSkgPT09IDApO1xuXG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuX3F1ZXVlLnNoaWZ0KCkhO1xuICAgICAgdGhpcy5fcXVldWVUb3RhbFNpemUgLT0gZW50cnkuYnl0ZUxlbmd0aDtcblxuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckhhbmRsZVF1ZXVlRHJhaW4odGhpcyk7XG5cbiAgICAgIGNvbnN0IHZpZXcgPSBuZXcgVWludDhBcnJheShlbnRyeS5idWZmZXIsIGVudHJ5LmJ5dGVPZmZzZXQsIGVudHJ5LmJ5dGVMZW5ndGgpO1xuXG4gICAgICByZWFkUmVxdWVzdC5fY2h1bmtTdGVwcyh2aWV3KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhdXRvQWxsb2NhdGVDaHVua1NpemUgPSB0aGlzLl9hdXRvQWxsb2NhdGVDaHVua1NpemU7XG4gICAgaWYgKGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgYnVmZmVyOiBBcnJheUJ1ZmZlcjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihhdXRvQWxsb2NhdGVDaHVua1NpemUpO1xuICAgICAgfSBjYXRjaCAoYnVmZmVyRSkge1xuICAgICAgICByZWFkUmVxdWVzdC5fZXJyb3JTdGVwcyhidWZmZXJFKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwdWxsSW50b0Rlc2NyaXB0b3I6IERlZmF1bHRQdWxsSW50b0Rlc2NyaXB0b3IgPSB7XG4gICAgICAgIGJ1ZmZlcixcbiAgICAgICAgYnVmZmVyQnl0ZUxlbmd0aDogYXV0b0FsbG9jYXRlQ2h1bmtTaXplLFxuICAgICAgICBieXRlT2Zmc2V0OiAwLFxuICAgICAgICBieXRlTGVuZ3RoOiBhdXRvQWxsb2NhdGVDaHVua1NpemUsXG4gICAgICAgIGJ5dGVzRmlsbGVkOiAwLFxuICAgICAgICBlbGVtZW50U2l6ZTogMSxcbiAgICAgICAgdmlld0NvbnN0cnVjdG9yOiBVaW50OEFycmF5LFxuICAgICAgICByZWFkZXJUeXBlOiAnZGVmYXVsdCdcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX3BlbmRpbmdQdWxsSW50b3MucHVzaChwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICAgIH1cblxuICAgIFJlYWRhYmxlU3RyZWFtQWRkUmVhZFJlcXVlc3Qoc3RyZWFtLCByZWFkUmVxdWVzdCk7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQodGhpcyk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlci5wcm90b3R5cGUsIHtcbiAgY2xvc2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBlbnF1ZXVlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgZXJyb3I6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBieW9iUmVxdWVzdDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGRlc2lyZWRTaXplOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXInLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIuXG5cbmV4cG9ydCBmdW5jdGlvbiBJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIoeDogYW55KTogeCBpcyBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyIHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0nKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcjtcbn1cblxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KHg6IGFueSk6IHggaXMgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcicpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0O1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKTogdm9pZCB7XG4gIGNvbnN0IHNob3VsZFB1bGwgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyU2hvdWxkQ2FsbFB1bGwoY29udHJvbGxlcik7XG4gIGlmICghc2hvdWxkUHVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb250cm9sbGVyLl9wdWxsaW5nKSB7XG4gICAgY29udHJvbGxlci5fcHVsbEFnYWluID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnQoIWNvbnRyb2xsZXIuX3B1bGxBZ2Fpbik7XG5cbiAgY29udHJvbGxlci5fcHVsbGluZyA9IHRydWU7XG5cbiAgLy8gVE9ETzogVGVzdCBjb250cm9sbGVyIGFyZ3VtZW50XG4gIGNvbnN0IHB1bGxQcm9taXNlID0gY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSgpO1xuICB1cG9uUHJvbWlzZShcbiAgICBwdWxsUHJvbWlzZSxcbiAgICAoKSA9PiB7XG4gICAgICBjb250cm9sbGVyLl9wdWxsaW5nID0gZmFsc2U7XG5cbiAgICAgIGlmIChjb250cm9sbGVyLl9wdWxsQWdhaW4pIHtcbiAgICAgICAgY29udHJvbGxlci5fcHVsbEFnYWluID0gZmFsc2U7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZSA9PiB7XG4gICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZSk7XG4gICAgfVxuICApO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJQZW5kaW5nUHVsbEludG9zKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIpIHtcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckludmFsaWRhdGVCWU9CUmVxdWVzdChjb250cm9sbGVyKTtcbiAgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29tbWl0UHVsbEludG9EZXNjcmlwdG9yPFQgZXh0ZW5kcyBBcnJheUJ1ZmZlclZpZXc+KFxuICBzdHJlYW06IFJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgcHVsbEludG9EZXNjcmlwdG9yOiBQdWxsSW50b0Rlc2NyaXB0b3I8VD5cbikge1xuICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSAhPT0gJ2Vycm9yZWQnKTtcblxuICBsZXQgZG9uZSA9IGZhbHNlO1xuICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICBhc3NlcnQocHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkID09PSAwKTtcbiAgICBkb25lID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IGZpbGxlZFZpZXcgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29udmVydFB1bGxJbnRvRGVzY3JpcHRvcjxUPihwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICBpZiAocHVsbEludG9EZXNjcmlwdG9yLnJlYWRlclR5cGUgPT09ICdkZWZhdWx0Jykge1xuICAgIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0KHN0cmVhbSwgZmlsbGVkVmlldyBhcyB1bmtub3duIGFzIFVpbnQ4QXJyYXksIGRvbmUpO1xuICB9IGVsc2Uge1xuICAgIGFzc2VydChwdWxsSW50b0Rlc2NyaXB0b3IucmVhZGVyVHlwZSA9PT0gJ2J5b2InKTtcbiAgICBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkSW50b1JlcXVlc3Qoc3RyZWFtLCBmaWxsZWRWaWV3LCBkb25lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29udmVydFB1bGxJbnRvRGVzY3JpcHRvcjxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3PihcbiAgcHVsbEludG9EZXNjcmlwdG9yOiBQdWxsSW50b0Rlc2NyaXB0b3I8VD5cbik6IFQge1xuICBjb25zdCBieXRlc0ZpbGxlZCA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZDtcbiAgY29uc3QgZWxlbWVudFNpemUgPSBwdWxsSW50b0Rlc2NyaXB0b3IuZWxlbWVudFNpemU7XG5cbiAgYXNzZXJ0KGJ5dGVzRmlsbGVkIDw9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlTGVuZ3RoKTtcbiAgYXNzZXJ0KGJ5dGVzRmlsbGVkICUgZWxlbWVudFNpemUgPT09IDApO1xuXG4gIHJldHVybiBuZXcgcHVsbEludG9EZXNjcmlwdG9yLnZpZXdDb25zdHJ1Y3RvcihcbiAgICBwdWxsSW50b0Rlc2NyaXB0b3IuYnVmZmVyLCBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZU9mZnNldCwgYnl0ZXNGaWxsZWQgLyBlbGVtZW50U2l6ZSkgYXMgVDtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogbnVtYmVyKSB7XG4gIGNvbnRyb2xsZXIuX3F1ZXVlLnB1c2goeyBidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGggfSk7XG4gIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplICs9IGJ5dGVMZW5ndGg7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsUHVsbEludG9EZXNjcmlwdG9yRnJvbVF1ZXVlKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWxsSW50b0Rlc2NyaXB0b3I6IFB1bGxJbnRvRGVzY3JpcHRvcikge1xuICBjb25zdCBlbGVtZW50U2l6ZSA9IHB1bGxJbnRvRGVzY3JpcHRvci5lbGVtZW50U2l6ZTtcblxuICBjb25zdCBjdXJyZW50QWxpZ25lZEJ5dGVzID0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkIC0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkICUgZWxlbWVudFNpemU7XG5cbiAgY29uc3QgbWF4Qnl0ZXNUb0NvcHkgPSBNYXRoLm1pbihjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZUxlbmd0aCAtIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCk7XG4gIGNvbnN0IG1heEJ5dGVzRmlsbGVkID0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkICsgbWF4Qnl0ZXNUb0NvcHk7XG4gIGNvbnN0IG1heEFsaWduZWRCeXRlcyA9IG1heEJ5dGVzRmlsbGVkIC0gbWF4Qnl0ZXNGaWxsZWQgJSBlbGVtZW50U2l6ZTtcblxuICBsZXQgdG90YWxCeXRlc1RvQ29weVJlbWFpbmluZyA9IG1heEJ5dGVzVG9Db3B5O1xuICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgaWYgKG1heEFsaWduZWRCeXRlcyA+IGN1cnJlbnRBbGlnbmVkQnl0ZXMpIHtcbiAgICB0b3RhbEJ5dGVzVG9Db3B5UmVtYWluaW5nID0gbWF4QWxpZ25lZEJ5dGVzIC0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkO1xuICAgIHJlYWR5ID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHF1ZXVlID0gY29udHJvbGxlci5fcXVldWU7XG5cbiAgd2hpbGUgKHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcgPiAwKSB7XG4gICAgY29uc3QgaGVhZE9mUXVldWUgPSBxdWV1ZS5wZWVrKCk7XG5cbiAgICBjb25zdCBieXRlc1RvQ29weSA9IE1hdGgubWluKHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcsIGhlYWRPZlF1ZXVlLmJ5dGVMZW5ndGgpO1xuXG4gICAgY29uc3QgZGVzdFN0YXJ0ID0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVPZmZzZXQgKyBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQ7XG4gICAgQ29weURhdGFCbG9ja0J5dGVzKHB1bGxJbnRvRGVzY3JpcHRvci5idWZmZXIsIGRlc3RTdGFydCwgaGVhZE9mUXVldWUuYnVmZmVyLCBoZWFkT2ZRdWV1ZS5ieXRlT2Zmc2V0LCBieXRlc1RvQ29weSk7XG5cbiAgICBpZiAoaGVhZE9mUXVldWUuYnl0ZUxlbmd0aCA9PT0gYnl0ZXNUb0NvcHkpIHtcbiAgICAgIHF1ZXVlLnNoaWZ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRPZlF1ZXVlLmJ5dGVPZmZzZXQgKz0gYnl0ZXNUb0NvcHk7XG4gICAgICBoZWFkT2ZRdWV1ZS5ieXRlTGVuZ3RoIC09IGJ5dGVzVG9Db3B5O1xuICAgIH1cbiAgICBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSAtPSBieXRlc1RvQ29weTtcblxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsSGVhZFB1bGxJbnRvRGVzY3JpcHRvcihjb250cm9sbGVyLCBieXRlc1RvQ29weSwgcHVsbEludG9EZXNjcmlwdG9yKTtcblxuICAgIHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcgLT0gYnl0ZXNUb0NvcHk7XG4gIH1cblxuICBpZiAoIXJlYWR5KSB7XG4gICAgYXNzZXJ0KGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID09PSAwKTtcbiAgICBhc3NlcnQocHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkID4gMCk7XG4gICAgYXNzZXJ0KHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCA8IHB1bGxJbnRvRGVzY3JpcHRvci5lbGVtZW50U2l6ZSk7XG4gIH1cblxuICByZXR1cm4gcmVhZHk7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsSGVhZFB1bGxJbnRvRGVzY3JpcHRvcihjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWxsSW50b0Rlc2NyaXB0b3I6IFB1bGxJbnRvRGVzY3JpcHRvcikge1xuICBhc3NlcnQoY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPT09IDAgfHwgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCkgPT09IHB1bGxJbnRvRGVzY3JpcHRvcik7XG4gIGFzc2VydChjb250cm9sbGVyLl9ieW9iUmVxdWVzdCA9PT0gbnVsbCk7XG4gIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCArPSBzaXplO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVySGFuZGxlUXVldWVEcmFpbihjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKSB7XG4gIGFzc2VydChjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLl9zdGF0ZSA9PT0gJ3JlYWRhYmxlJyk7XG5cbiAgaWYgKGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID09PSAwICYmIGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkKSB7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgICBSZWFkYWJsZVN0cmVhbUNsb3NlKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0pO1xuICB9IGVsc2Uge1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJJbnZhbGlkYXRlQllPQlJlcXVlc3QoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcikge1xuICBpZiAoY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb250cm9sbGVyLl9ieW9iUmVxdWVzdC5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgPSB1bmRlZmluZWQhO1xuICBjb250cm9sbGVyLl9ieW9iUmVxdWVzdC5fdmlldyA9IG51bGwhO1xuICBjb250cm9sbGVyLl9ieW9iUmVxdWVzdCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJQcm9jZXNzUHVsbEludG9EZXNjcmlwdG9yc1VzaW5nUXVldWUoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcikge1xuICBhc3NlcnQoIWNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkKTtcblxuICB3aGlsZSAoY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgaWYgKGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHVsbEludG9EZXNjcmlwdG9yID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCk7XG5cbiAgICBpZiAoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZpbGxQdWxsSW50b0Rlc2NyaXB0b3JGcm9tUXVldWUoY29udHJvbGxlciwgcHVsbEludG9EZXNjcmlwdG9yKSkge1xuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNoaWZ0UGVuZGluZ1B1bGxJbnRvKGNvbnRyb2xsZXIpO1xuXG4gICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29tbWl0UHVsbEludG9EZXNjcmlwdG9yKFxuICAgICAgICBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLFxuICAgICAgICBwdWxsSW50b0Rlc2NyaXB0b3JcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUHVsbEludG88VCBleHRlbmRzIEFycmF5QnVmZmVyVmlldz4oXG4gIGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gIHZpZXc6IFQsXG4gIHJlYWRJbnRvUmVxdWVzdDogUmVhZEludG9SZXF1ZXN0PFQ+XG4pOiB2b2lkIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcblxuICBsZXQgZWxlbWVudFNpemUgPSAxO1xuICBpZiAodmlldy5jb25zdHJ1Y3RvciAhPT0gRGF0YVZpZXcpIHtcbiAgICBlbGVtZW50U2l6ZSA9ICh2aWV3LmNvbnN0cnVjdG9yIGFzIEFycmF5QnVmZmVyVmlld0NvbnN0cnVjdG9yPFQ+KS5CWVRFU19QRVJfRUxFTUVOVDtcbiAgfVxuXG4gIGNvbnN0IGN0b3IgPSB2aWV3LmNvbnN0cnVjdG9yIGFzIEFycmF5QnVmZmVyVmlld0NvbnN0cnVjdG9yPFQ+O1xuXG4gIC8vIHRyeSB7XG4gIGNvbnN0IGJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIodmlldy5idWZmZXIpO1xuICAvLyB9IGNhdGNoIChlKSB7XG4gIC8vICAgcmVhZEludG9SZXF1ZXN0Ll9lcnJvclN0ZXBzKGUpO1xuICAvLyAgIHJldHVybjtcbiAgLy8gfVxuXG4gIGNvbnN0IHB1bGxJbnRvRGVzY3JpcHRvcjogQllPQlB1bGxJbnRvRGVzY3JpcHRvcjxUPiA9IHtcbiAgICBidWZmZXIsXG4gICAgYnVmZmVyQnl0ZUxlbmd0aDogYnVmZmVyLmJ5dGVMZW5ndGgsXG4gICAgYnl0ZU9mZnNldDogdmlldy5ieXRlT2Zmc2V0LFxuICAgIGJ5dGVMZW5ndGg6IHZpZXcuYnl0ZUxlbmd0aCxcbiAgICBieXRlc0ZpbGxlZDogMCxcbiAgICBlbGVtZW50U2l6ZSxcbiAgICB2aWV3Q29uc3RydWN0b3I6IGN0b3IsXG4gICAgcmVhZGVyVHlwZTogJ2J5b2InXG4gIH07XG5cbiAgaWYgKGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgIGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucHVzaChwdWxsSW50b0Rlc2NyaXB0b3IpO1xuXG4gICAgLy8gTm8gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoKSBjYWxsIHNpbmNlOlxuICAgIC8vIC0gTm8gY2hhbmdlIGhhcHBlbnMgb24gZGVzaXJlZFNpemVcbiAgICAvLyAtIFRoZSBzb3VyY2UgaGFzIGFscmVhZHkgYmVlbiBub3RpZmllZCBvZiB0aGF0IHRoZXJlJ3MgYXQgbGVhc3QgMSBwZW5kaW5nIHJlYWQodmlldylcblxuICAgIFJlYWRhYmxlU3RyZWFtQWRkUmVhZEludG9SZXF1ZXN0KHN0cmVhbSwgcmVhZEludG9SZXF1ZXN0KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICBjb25zdCBlbXB0eVZpZXcgPSBuZXcgY3RvcihwdWxsSW50b0Rlc2NyaXB0b3IuYnVmZmVyLCBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZU9mZnNldCwgMCk7XG4gICAgcmVhZEludG9SZXF1ZXN0Ll9jbG9zZVN0ZXBzKGVtcHR5Vmlldyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID4gMCkge1xuICAgIGlmIChSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRmlsbFB1bGxJbnRvRGVzY3JpcHRvckZyb21RdWV1ZShjb250cm9sbGVyLCBwdWxsSW50b0Rlc2NyaXB0b3IpKSB7XG4gICAgICBjb25zdCBmaWxsZWRWaWV3ID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbnZlcnRQdWxsSW50b0Rlc2NyaXB0b3I8VD4ocHVsbEludG9EZXNjcmlwdG9yKTtcblxuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckhhbmRsZVF1ZXVlRHJhaW4oY29udHJvbGxlcik7XG5cbiAgICAgIHJlYWRJbnRvUmVxdWVzdC5fY2h1bmtTdGVwcyhmaWxsZWRWaWV3KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQpIHtcbiAgICAgIGNvbnN0IGUgPSBuZXcgVHlwZUVycm9yKCdJbnN1ZmZpY2llbnQgYnl0ZXMgdG8gZmlsbCBlbGVtZW50cyBpbiB0aGUgZ2l2ZW4gYnVmZmVyJyk7XG4gICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZSk7XG5cbiAgICAgIHJlYWRJbnRvUmVxdWVzdC5fZXJyb3JTdGVwcyhlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnB1c2gocHVsbEludG9EZXNjcmlwdG9yKTtcblxuICBSZWFkYWJsZVN0cmVhbUFkZFJlYWRJbnRvUmVxdWVzdDxUPihzdHJlYW0sIHJlYWRJbnRvUmVxdWVzdCk7XG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZEluQ2xvc2VkU3RhdGUoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERlc2NyaXB0b3I6IFB1bGxJbnRvRGVzY3JpcHRvcikge1xuICBhc3NlcnQoZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkID09PSAwKTtcblxuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuICBpZiAoUmVhZGFibGVTdHJlYW1IYXNCWU9CUmVhZGVyKHN0cmVhbSkpIHtcbiAgICB3aGlsZSAoUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkSW50b1JlcXVlc3RzKHN0cmVhbSkgPiAwKSB7XG4gICAgICBjb25zdCBwdWxsSW50b0Rlc2NyaXB0b3IgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyU2hpZnRQZW5kaW5nUHVsbEludG8oY29udHJvbGxlcik7XG4gICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29tbWl0UHVsbEludG9EZXNjcmlwdG9yKHN0cmVhbSwgcHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJblJlYWRhYmxlU3RhdGUoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzV3JpdHRlbjogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVsbEludG9EZXNjcmlwdG9yOiBQdWxsSW50b0Rlc2NyaXB0b3IpIHtcbiAgYXNzZXJ0KHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCArIGJ5dGVzV3JpdHRlbiA8PSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZUxlbmd0aCk7XG5cbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZpbGxIZWFkUHVsbEludG9EZXNjcmlwdG9yKGNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbiwgcHVsbEludG9EZXNjcmlwdG9yKTtcblxuICBpZiAocHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkIDwgcHVsbEludG9EZXNjcmlwdG9yLmVsZW1lbnRTaXplKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNoaWZ0UGVuZGluZ1B1bGxJbnRvKGNvbnRyb2xsZXIpO1xuXG4gIGNvbnN0IHJlbWFpbmRlclNpemUgPSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgJSBwdWxsSW50b0Rlc2NyaXB0b3IuZWxlbWVudFNpemU7XG4gIGlmIChyZW1haW5kZXJTaXplID4gMCkge1xuICAgIGNvbnN0IGVuZCA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlT2Zmc2V0ICsgcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkO1xuICAgIGNvbnN0IHJlbWFpbmRlciA9IEFycmF5QnVmZmVyU2xpY2UocHVsbEludG9EZXNjcmlwdG9yLmJ1ZmZlciwgZW5kIC0gcmVtYWluZGVyU2l6ZSwgZW5kKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZUNodW5rVG9RdWV1ZShjb250cm9sbGVyLCByZW1haW5kZXIsIDAsIHJlbWFpbmRlci5ieXRlTGVuZ3RoKTtcbiAgfVxuXG4gIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAtPSByZW1haW5kZXJTaXplO1xuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29tbWl0UHVsbEludG9EZXNjcmlwdG9yKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0sIHB1bGxJbnRvRGVzY3JpcHRvcik7XG5cbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclByb2Nlc3NQdWxsSW50b0Rlc2NyaXB0b3JzVXNpbmdRdWV1ZShjb250cm9sbGVyKTtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJbnRlcm5hbChjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLCBieXRlc1dyaXR0ZW46IG51bWJlcikge1xuICBjb25zdCBmaXJzdERlc2NyaXB0b3IgPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgYXNzZXJ0KENhblRyYW5zZmVyQXJyYXlCdWZmZXIoZmlyc3REZXNjcmlwdG9yLmJ1ZmZlcikpO1xuXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJJbnZhbGlkYXRlQllPQlJlcXVlc3QoY29udHJvbGxlcik7XG5cbiAgY29uc3Qgc3RhdGUgPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLl9zdGF0ZTtcbiAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgIGFzc2VydChieXRlc1dyaXR0ZW4gPT09IDApO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW5DbG9zZWRTdGF0ZShjb250cm9sbGVyLCBmaXJzdERlc2NyaXB0b3IpO1xuICB9IGVsc2Uge1xuICAgIGFzc2VydChzdGF0ZSA9PT0gJ3JlYWRhYmxlJyk7XG4gICAgYXNzZXJ0KGJ5dGVzV3JpdHRlbiA+IDApO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW5SZWFkYWJsZVN0YXRlKGNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbiwgZmlyc3REZXNjcmlwdG9yKTtcbiAgfVxuXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuXG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyU2hpZnRQZW5kaW5nUHVsbEludG8oXG4gIGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJcbik6IFB1bGxJbnRvRGVzY3JpcHRvciB7XG4gIGFzc2VydChjb250cm9sbGVyLl9ieW9iUmVxdWVzdCA9PT0gbnVsbCk7XG4gIGNvbnN0IGRlc2NyaXB0b3IgPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnNoaWZ0KCkhO1xuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNob3VsZENhbGxQdWxsKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIpOiBib29sZWFuIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcblxuICBpZiAoc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghY29udHJvbGxlci5fc3RhcnRlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChSZWFkYWJsZVN0cmVhbUhhc0RlZmF1bHRSZWFkZXIoc3RyZWFtKSAmJiBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyhzdHJlYW0pID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKFJlYWRhYmxlU3RyZWFtSGFzQllPQlJlYWRlcihzdHJlYW0pICYmIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZEludG9SZXF1ZXN0cyhzdHJlYW0pID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgZGVzaXJlZFNpemUgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0RGVzaXJlZFNpemUoY29udHJvbGxlcik7XG4gIGFzc2VydChkZXNpcmVkU2l6ZSAhPT0gbnVsbCk7XG4gIGlmIChkZXNpcmVkU2l6ZSEgPiAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcikge1xuICBjb250cm9sbGVyLl9wdWxsQWxnb3JpdGhtID0gdW5kZWZpbmVkITtcbiAgY29udHJvbGxlci5fY2FuY2VsQWxnb3JpdGhtID0gdW5kZWZpbmVkITtcbn1cblxuLy8gQSBjbGllbnQgb2YgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciBtYXkgdXNlIHRoZXNlIGZ1bmN0aW9ucyBkaXJlY3RseSB0byBieXBhc3Mgc3RhdGUgY2hlY2suXG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2UoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcikge1xuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuXG4gIGlmIChjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCB8fCBzdHJlYW0uX3N0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID4gMCkge1xuICAgIGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkID0gdHJ1ZTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBmaXJzdFBlbmRpbmdQdWxsSW50byA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICAgIGlmIChmaXJzdFBlbmRpbmdQdWxsSW50by5ieXRlc0ZpbGxlZCA+IDApIHtcbiAgICAgIGNvbnN0IGUgPSBuZXcgVHlwZUVycm9yKCdJbnN1ZmZpY2llbnQgYnl0ZXMgdG8gZmlsbCBlbGVtZW50cyBpbiB0aGUgZ2l2ZW4gYnVmZmVyJyk7XG4gICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZSk7XG5cbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgUmVhZGFibGVTdHJlYW1DbG9zZShzdHJlYW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWUoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciwgY2h1bms6IEFycmF5QnVmZmVyVmlldykge1xuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuXG4gIGlmIChjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCB8fCBzdHJlYW0uX3N0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gY2h1bmsuYnVmZmVyO1xuICBjb25zdCBieXRlT2Zmc2V0ID0gY2h1bmsuYnl0ZU9mZnNldDtcbiAgY29uc3QgYnl0ZUxlbmd0aCA9IGNodW5rLmJ5dGVMZW5ndGg7XG4gIGlmIChJc0RldGFjaGVkQnVmZmVyKGJ1ZmZlcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjaHVua1xcJ3MgYnVmZmVyIGlzIGRldGFjaGVkIGFuZCBzbyBjYW5ub3QgYmUgZW5xdWV1ZWQnKTtcbiAgfVxuICBjb25zdCB0cmFuc2ZlcnJlZEJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIoYnVmZmVyKTtcblxuICBpZiAoY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZmlyc3RQZW5kaW5nUHVsbEludG8gPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgICBpZiAoSXNEZXRhY2hlZEJ1ZmZlcihmaXJzdFBlbmRpbmdQdWxsSW50by5idWZmZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIEJZT0IgcmVxdWVzdFxcJ3MgYnVmZmVyIGhhcyBiZWVuIGRldGFjaGVkIGFuZCBzbyBjYW5ub3QgYmUgZmlsbGVkIHdpdGggYW4gZW5xdWV1ZWQgY2h1bmsnXG4gICAgICApO1xuICAgIH1cbiAgICBmaXJzdFBlbmRpbmdQdWxsSW50by5idWZmZXIgPSBUcmFuc2ZlckFycmF5QnVmZmVyKGZpcnN0UGVuZGluZ1B1bGxJbnRvLmJ1ZmZlcik7XG4gIH1cblxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVySW52YWxpZGF0ZUJZT0JSZXF1ZXN0KGNvbnRyb2xsZXIpO1xuXG4gIGlmIChSZWFkYWJsZVN0cmVhbUhhc0RlZmF1bHRSZWFkZXIoc3RyZWFtKSkge1xuICAgIGlmIChSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyhzdHJlYW0pID09PSAwKSB7XG4gICAgICBhc3NlcnQoY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPT09IDApO1xuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlciwgdHJhbnNmZXJyZWRCdWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQoY29udHJvbGxlci5fcXVldWUubGVuZ3RoID09PSAwKTtcbiAgICAgIGlmIChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYXNzZXJ0KGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpLnJlYWRlclR5cGUgPT09ICdkZWZhdWx0Jyk7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaGlmdFBlbmRpbmdQdWxsSW50byhjb250cm9sbGVyKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zZmVycmVkVmlldyA9IG5ldyBVaW50OEFycmF5KHRyYW5zZmVycmVkQnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcbiAgICAgIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0KHN0cmVhbSwgdHJhbnNmZXJyZWRWaWV3LCBmYWxzZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKFJlYWRhYmxlU3RyZWFtSGFzQllPQlJlYWRlcihzdHJlYW0pKSB7XG4gICAgLy8gVE9ETzogSWRlYWxseSBpbiB0aGlzIGJyYW5jaCBkZXRhY2hpbmcgc2hvdWxkIGhhcHBlbiBvbmx5IGlmIHRoZSBidWZmZXIgaXMgbm90IGNvbnN1bWVkIGZ1bGx5LlxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlQ2h1bmtUb1F1ZXVlKGNvbnRyb2xsZXIsIHRyYW5zZmVycmVkQnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUHJvY2Vzc1B1bGxJbnRvRGVzY3JpcHRvcnNVc2luZ1F1ZXVlKGNvbnRyb2xsZXIpO1xuICB9IGVsc2Uge1xuICAgIGFzc2VydCghSXNSZWFkYWJsZVN0cmVhbUxvY2tlZChzdHJlYW0pKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZUNodW5rVG9RdWV1ZShjb250cm9sbGVyLCB0cmFuc2ZlcnJlZEJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gIH1cblxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLCBlOiBhbnkpIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcblxuICBpZiAoc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhclBlbmRpbmdQdWxsSW50b3MoY29udHJvbGxlcik7XG5cbiAgUmVzZXRRdWV1ZShjb250cm9sbGVyKTtcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgUmVhZGFibGVTdHJlYW1FcnJvcihzdHJlYW0sIGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldEJZT0JSZXF1ZXN0KFxuICBjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyXG4pOiBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0IHwgbnVsbCB7XG4gIGlmIChjb250cm9sbGVyLl9ieW9iUmVxdWVzdCA9PT0gbnVsbCAmJiBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBmaXJzdERlc2NyaXB0b3IgPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgICBjb25zdCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZmlyc3REZXNjcmlwdG9yLmJ1ZmZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REZXNjcmlwdG9yLmJ5dGVPZmZzZXQgKyBmaXJzdERlc2NyaXB0b3IuYnl0ZXNGaWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGVzY3JpcHRvci5ieXRlTGVuZ3RoIC0gZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkKTtcblxuICAgIGNvbnN0IGJ5b2JSZXF1ZXN0OiBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0ID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnByb3RvdHlwZSk7XG4gICAgU2V0VXBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KGJ5b2JSZXF1ZXN0LCBjb250cm9sbGVyLCB2aWV3KTtcbiAgICBjb250cm9sbGVyLl9ieW9iUmVxdWVzdCA9IGJ5b2JSZXF1ZXN0O1xuICB9XG4gIHJldHVybiBjb250cm9sbGVyLl9ieW9iUmVxdWVzdDtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIpOiBudW1iZXIgfCBudWxsIHtcbiAgY29uc3Qgc3RhdGUgPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLl9zdGF0ZTtcblxuICBpZiAoc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiBjb250cm9sbGVyLl9zdHJhdGVneUhXTSAtIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmQoY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciwgYnl0ZXNXcml0dGVuOiBudW1iZXIpIHtcbiAgYXNzZXJ0KGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCk7XG5cbiAgY29uc3QgZmlyc3REZXNjcmlwdG9yID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCk7XG4gIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG5cbiAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgIGlmIChieXRlc1dyaXR0ZW4gIT09IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2J5dGVzV3JpdHRlbiBtdXN0IGJlIDAgd2hlbiBjYWxsaW5nIHJlc3BvbmQoKSBvbiBhIGNsb3NlZCBzdHJlYW0nKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYXNzZXJ0KHN0YXRlID09PSAncmVhZGFibGUnKTtcbiAgICBpZiAoYnl0ZXNXcml0dGVuID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdieXRlc1dyaXR0ZW4gbXVzdCBiZSBncmVhdGVyIHRoYW4gMCB3aGVuIGNhbGxpbmcgcmVzcG9uZCgpIG9uIGEgcmVhZGFibGUgc3RyZWFtJyk7XG4gICAgfVxuICAgIGlmIChmaXJzdERlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgKyBieXRlc1dyaXR0ZW4gPiBmaXJzdERlc2NyaXB0b3IuYnl0ZUxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2J5dGVzV3JpdHRlbiBvdXQgb2YgcmFuZ2UnKTtcbiAgICB9XG4gIH1cblxuICBmaXJzdERlc2NyaXB0b3IuYnVmZmVyID0gVHJhbnNmZXJBcnJheUJ1ZmZlcihmaXJzdERlc2NyaXB0b3IuYnVmZmVyKTtcblxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZEludGVybmFsKGNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3KGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBBcnJheUJ1ZmZlclZpZXcpIHtcbiAgYXNzZXJ0KGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCk7XG4gIGFzc2VydCghSXNEZXRhY2hlZEJ1ZmZlcih2aWV3LmJ1ZmZlcikpO1xuXG4gIGNvbnN0IGZpcnN0RGVzY3JpcHRvciA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0uX3N0YXRlO1xuXG4gIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICBpZiAodmlldy5ieXRlTGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgdmlld1xcJ3MgbGVuZ3RoIG11c3QgYmUgMCB3aGVuIGNhbGxpbmcgcmVzcG9uZFdpdGhOZXdWaWV3KCkgb24gYSBjbG9zZWQgc3RyZWFtJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFzc2VydChzdGF0ZSA9PT0gJ3JlYWRhYmxlJyk7XG4gICAgaWYgKHZpZXcuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ1RoZSB2aWV3XFwncyBsZW5ndGggbXVzdCBiZSBncmVhdGVyIHRoYW4gMCB3aGVuIGNhbGxpbmcgcmVzcG9uZFdpdGhOZXdWaWV3KCkgb24gYSByZWFkYWJsZSBzdHJlYW0nXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmaXJzdERlc2NyaXB0b3IuYnl0ZU9mZnNldCArIGZpcnN0RGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAhPT0gdmlldy5ieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSByZWdpb24gc3BlY2lmaWVkIGJ5IHZpZXcgZG9lcyBub3QgbWF0Y2ggYnlvYlJlcXVlc3QnKTtcbiAgfVxuICBpZiAoZmlyc3REZXNjcmlwdG9yLmJ1ZmZlckJ5dGVMZW5ndGggIT09IHZpZXcuYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIGJ1ZmZlciBvZiB2aWV3IGhhcyBkaWZmZXJlbnQgY2FwYWNpdHkgdGhhbiBieW9iUmVxdWVzdCcpO1xuICB9XG4gIGlmIChmaXJzdERlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgKyB2aWV3LmJ5dGVMZW5ndGggPiBmaXJzdERlc2NyaXB0b3IuYnl0ZUxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgcmVnaW9uIHNwZWNpZmllZCBieSB2aWV3IGlzIGxhcmdlciB0aGFuIGJ5b2JSZXF1ZXN0Jyk7XG4gIH1cblxuICBjb25zdCB2aWV3Qnl0ZUxlbmd0aCA9IHZpZXcuYnl0ZUxlbmd0aDtcbiAgZmlyc3REZXNjcmlwdG9yLmJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIodmlldy5idWZmZXIpO1xuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZEludGVybmFsKGNvbnRyb2xsZXIsIHZpZXdCeXRlTGVuZ3RoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihzdHJlYW06IFJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBbGdvcml0aG06ICgpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVsbEFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWxnb3JpdGhtOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hXYXRlck1hcms6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0FsbG9jYXRlQ2h1bmtTaXplOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgYXNzZXJ0KHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyID09PSB1bmRlZmluZWQpO1xuICBpZiAoYXV0b0FsbG9jYXRlQ2h1bmtTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICBhc3NlcnQoTnVtYmVySXNJbnRlZ2VyKGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSkpO1xuICAgIGFzc2VydChhdXRvQWxsb2NhdGVDaHVua1NpemUgPiAwKTtcbiAgfVxuXG4gIGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0gPSBzdHJlYW07XG5cbiAgY29udHJvbGxlci5fcHVsbEFnYWluID0gZmFsc2U7XG4gIGNvbnRyb2xsZXIuX3B1bGxpbmcgPSBmYWxzZTtcblxuICBjb250cm9sbGVyLl9ieW9iUmVxdWVzdCA9IG51bGw7XG5cbiAgLy8gTmVlZCB0byBzZXQgdGhlIHNsb3RzIHNvIHRoYXQgdGhlIGFzc2VydCBkb2Vzbid0IGZpcmUuIEluIHRoZSBzcGVjIHRoZSBzbG90cyBhbHJlYWR5IGV4aXN0IGltcGxpY2l0bHkuXG4gIGNvbnRyb2xsZXIuX3F1ZXVlID0gY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgPSB1bmRlZmluZWQhO1xuICBSZXNldFF1ZXVlKGNvbnRyb2xsZXIpO1xuXG4gIGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkID0gZmFsc2U7XG4gIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSBmYWxzZTtcblxuICBjb250cm9sbGVyLl9zdHJhdGVneUhXTSA9IGhpZ2hXYXRlck1hcms7XG5cbiAgY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSA9IHB1bGxBbGdvcml0aG07XG4gIGNvbnRyb2xsZXIuX2NhbmNlbEFsZ29yaXRobSA9IGNhbmNlbEFsZ29yaXRobTtcblxuICBjb250cm9sbGVyLl9hdXRvQWxsb2NhdGVDaHVua1NpemUgPSBhdXRvQWxsb2NhdGVDaHVua1NpemU7XG5cbiAgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuXG4gIHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyID0gY29udHJvbGxlcjtcblxuICBjb25zdCBzdGFydFJlc3VsdCA9IHN0YXJ0QWxnb3JpdGhtKCk7XG4gIHVwb25Qcm9taXNlKFxuICAgIHByb21pc2VSZXNvbHZlZFdpdGgoc3RhcnRSZXN1bHQpLFxuICAgICgpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICBhc3NlcnQoIWNvbnRyb2xsZXIuX3B1bGxpbmcpO1xuICAgICAgYXNzZXJ0KCFjb250cm9sbGVyLl9wdWxsQWdhaW4pO1xuXG4gICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICB9LFxuICAgIHIgPT4ge1xuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIHIpO1xuICAgIH1cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZyb21VbmRlcmx5aW5nU291cmNlKFxuICBzdHJlYW06IFJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgdW5kZXJseWluZ0J5dGVTb3VyY2U6IFZhbGlkYXRlZFVuZGVybHlpbmdCeXRlU291cmNlLFxuICBoaWdoV2F0ZXJNYXJrOiBudW1iZXJcbikge1xuICBjb25zdCBjb250cm9sbGVyOiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLnByb3RvdHlwZSk7XG5cbiAgbGV0IHN0YXJ0QWxnb3JpdGhtOiAoKSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4gPSAoKSA9PiB1bmRlZmluZWQ7XG4gIGxldCBwdWxsQWxnb3JpdGhtOiAoKSA9PiBQcm9taXNlPHZvaWQ+ID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICBsZXQgY2FuY2VsQWxnb3JpdGhtOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD4gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG5cbiAgaWYgKHVuZGVybHlpbmdCeXRlU291cmNlLnN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydEFsZ29yaXRobSA9ICgpID0+IHVuZGVybHlpbmdCeXRlU291cmNlLnN0YXJ0IShjb250cm9sbGVyKTtcbiAgfVxuICBpZiAodW5kZXJseWluZ0J5dGVTb3VyY2UucHVsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHVsbEFsZ29yaXRobSA9ICgpID0+IHVuZGVybHlpbmdCeXRlU291cmNlLnB1bGwhKGNvbnRyb2xsZXIpO1xuICB9XG4gIGlmICh1bmRlcmx5aW5nQnl0ZVNvdXJjZS5jYW5jZWwgIT09IHVuZGVmaW5lZCkge1xuICAgIGNhbmNlbEFsZ29yaXRobSA9IHJlYXNvbiA9PiB1bmRlcmx5aW5nQnl0ZVNvdXJjZS5jYW5jZWwhKHJlYXNvbik7XG4gIH1cblxuICBjb25zdCBhdXRvQWxsb2NhdGVDaHVua1NpemUgPSB1bmRlcmx5aW5nQnl0ZVNvdXJjZS5hdXRvQWxsb2NhdGVDaHVua1NpemU7XG4gIGlmIChhdXRvQWxsb2NhdGVDaHVua1NpemUgPT09IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhdXRvQWxsb2NhdGVDaHVua1NpemUgbXVzdCBiZSBncmVhdGVyIHRoYW4gMCcpO1xuICB9XG5cbiAgU2V0VXBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKFxuICAgIHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgaGlnaFdhdGVyTWFyaywgYXV0b0FsbG9jYXRlQ2h1bmtTaXplXG4gICk7XG59XG5cbmZ1bmN0aW9uIFNldFVwUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdChyZXF1ZXN0OiBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogQXJyYXlCdWZmZXJWaWV3KSB7XG4gIGFzc2VydChJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIoY29udHJvbGxlcikpO1xuICBhc3NlcnQodHlwZW9mIHZpZXcgPT09ICdvYmplY3QnKTtcbiAgYXNzZXJ0KEFycmF5QnVmZmVyLmlzVmlldyh2aWV3KSk7XG4gIGFzc2VydCghSXNEZXRhY2hlZEJ1ZmZlcih2aWV3LmJ1ZmZlcikpO1xuICByZXF1ZXN0Ll9hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG4gIHJlcXVlc3QuX3ZpZXcgPSB2aWV3O1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdC5cblxuZnVuY3Rpb24gYnlvYlJlcXVlc3RCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFxuICAgIGBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0YCk7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLlxuXG5mdW5jdGlvbiBieXRlU3RyZWFtQ29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXG4gICAgYFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJgKTtcbn1cbiIsICJpbXBvcnQgYXNzZXJ0IGZyb20gJy4uLy4uL3N0dWIvYXNzZXJ0JztcbmltcG9ydCB7IFNpbXBsZVF1ZXVlIH0gZnJvbSAnLi4vc2ltcGxlLXF1ZXVlJztcbmltcG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0NhbmNlbCxcbiAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljSW5pdGlhbGl6ZSxcbiAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZSxcbiAgcmVhZGVyTG9ja0V4Y2VwdGlvblxufSBmcm9tICcuL2dlbmVyaWMtcmVhZGVyJztcbmltcG9ydCB7IElzUmVhZGFibGVTdHJlYW1Mb2NrZWQsIFJlYWRhYmxlQnl0ZVN0cmVhbSwgUmVhZGFibGVTdHJlYW0gfSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHtcbiAgSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUHVsbEludG9cbn0gZnJvbSAnLi9ieXRlLXN0cmVhbS1jb250cm9sbGVyJztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQgeyBuZXdQcm9taXNlLCBwcm9taXNlUmVqZWN0ZWRXaXRoIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHsgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudCB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvYmFzaWMnO1xuaW1wb3J0IHsgYXNzZXJ0UmVhZGFibGVTdHJlYW0gfSBmcm9tICcuLi92YWxpZGF0b3JzL3JlYWRhYmxlLXN0cmVhbSc7XG5pbXBvcnQgeyBJc0RldGFjaGVkQnVmZmVyIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb3BzL2VjbWFzY3JpcHQnO1xuXG4vKipcbiAqIEEgcmVzdWx0IHJldHVybmVkIGJ5IHtAbGluayBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIucmVhZH0uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgdHlwZSBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkUmVzdWx0PFQgZXh0ZW5kcyBBcnJheUJ1ZmZlclZpZXc+ID0ge1xuICBkb25lOiBmYWxzZTtcbiAgdmFsdWU6IFQ7XG59IHwge1xuICBkb25lOiB0cnVlO1xuICB2YWx1ZTogVCB8IHVuZGVmaW5lZDtcbn07XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cblxuZXhwb3J0IGZ1bmN0aW9uIEFjcXVpcmVSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIoc3RyZWFtOiBSZWFkYWJsZUJ5dGVTdHJlYW0pOiBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIge1xuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihzdHJlYW0pO1xufVxuXG4vLyBSZWFkYWJsZVN0cmVhbSBBUEkgZXhwb3NlZCBmb3IgY29udHJvbGxlcnMuXG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUFkZFJlYWRJbnRvUmVxdWVzdDxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3PihzdHJlYW06IFJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkSW50b1JlcXVlc3Q6IFJlYWRJbnRvUmVxdWVzdDxUPik6IHZvaWQge1xuICBhc3NlcnQoSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIoc3RyZWFtLl9yZWFkZXIpKTtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScgfHwgc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpO1xuXG4gIChzdHJlYW0uX3JlYWRlciEgYXMgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKS5fcmVhZEludG9SZXF1ZXN0cy5wdXNoKHJlYWRJbnRvUmVxdWVzdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkSW50b1JlcXVlc3Qoc3RyZWFtOiBSZWFkYWJsZUJ5dGVTdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rOiBBcnJheUJ1ZmZlclZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6IGJvb2xlYW4pIHtcbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLl9yZWFkZXIgYXMgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyO1xuXG4gIGFzc2VydChyZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMubGVuZ3RoID4gMCk7XG5cbiAgY29uc3QgcmVhZEludG9SZXF1ZXN0ID0gcmVhZGVyLl9yZWFkSW50b1JlcXVlc3RzLnNoaWZ0KCkhO1xuICBpZiAoZG9uZSkge1xuICAgIHJlYWRJbnRvUmVxdWVzdC5fY2xvc2VTdGVwcyhjaHVuayk7XG4gIH0gZWxzZSB7XG4gICAgcmVhZEludG9SZXF1ZXN0Ll9jaHVua1N0ZXBzKGNodW5rKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkSW50b1JlcXVlc3RzKHN0cmVhbTogUmVhZGFibGVCeXRlU3RyZWFtKTogbnVtYmVyIHtcbiAgcmV0dXJuIChzdHJlYW0uX3JlYWRlciBhcyBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIpLl9yZWFkSW50b1JlcXVlc3RzLmxlbmd0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtSGFzQllPQlJlYWRlcihzdHJlYW06IFJlYWRhYmxlQnl0ZVN0cmVhbSk6IGJvb2xlYW4ge1xuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcblxuICBpZiAocmVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHJlYWRlcikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gUmVhZGVyc1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRJbnRvUmVxdWVzdDxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3PiB7XG4gIF9jaHVua1N0ZXBzKGNodW5rOiBUKTogdm9pZDtcblxuICBfY2xvc2VTdGVwcyhjaHVuazogVCB8IHVuZGVmaW5lZCk6IHZvaWQ7XG5cbiAgX2Vycm9yU3RlcHMoZTogYW55KTogdm9pZDtcbn1cblxuLyoqXG4gKiBBIEJZT0IgcmVhZGVyIHZlbmRlZCBieSBhIHtAbGluayBSZWFkYWJsZVN0cmVhbX0uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY2xhc3MgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb3duZXJSZWFkYWJsZVN0cmVhbSE6IFJlYWRhYmxlQnl0ZVN0cmVhbTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VkUHJvbWlzZSE6IFByb21pc2U8dW5kZWZpbmVkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VkUHJvbWlzZV9yZXNvbHZlPzogKHZhbHVlPzogdW5kZWZpbmVkKSA9PiB2b2lkO1xuICAvKiogQGludGVybmFsICovXG4gIF9jbG9zZWRQcm9taXNlX3JlamVjdD86IChyZWFzb246IGFueSkgPT4gdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVhZEludG9SZXF1ZXN0czogU2ltcGxlUXVldWU8UmVhZEludG9SZXF1ZXN0PGFueT4+O1xuXG4gIGNvbnN0cnVjdG9yKHN0cmVhbTogUmVhZGFibGVCeXRlU3RyZWFtKSB7XG4gICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChzdHJlYW0sIDEsICdSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXInKTtcbiAgICBhc3NlcnRSZWFkYWJsZVN0cmVhbShzdHJlYW0sICdGaXJzdCBwYXJhbWV0ZXInKTtcblxuICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgc3RyZWFtIGhhcyBhbHJlYWR5IGJlZW4gbG9ja2VkIGZvciBleGNsdXNpdmUgcmVhZGluZyBieSBhbm90aGVyIHJlYWRlcicpO1xuICAgIH1cblxuICAgIGlmICghSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnN0cnVjdCBhIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlciBmb3IgYSBzdHJlYW0gbm90IGNvbnN0cnVjdGVkIHdpdGggYSBieXRlICcgK1xuICAgICAgICAnc291cmNlJyk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljSW5pdGlhbGl6ZSh0aGlzLCBzdHJlYW0pO1xuXG4gICAgdGhpcy5fcmVhZEludG9SZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgc3RyZWFtIGJlY29tZXMgY2xvc2VkLCBvciByZWplY3RlZCBpZiB0aGUgc3RyZWFtIGV2ZXIgZXJyb3JzIG9yXG4gICAqIHRoZSByZWFkZXIncyBsb2NrIGlzIHJlbGVhc2VkIGJlZm9yZSB0aGUgc3RyZWFtIGZpbmlzaGVzIGNsb3NpbmcuXG4gICAqL1xuICBnZXQgY2xvc2VkKCk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoYnlvYlJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Nsb3NlZCcpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2xvc2VkUHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgcmVhZGVyIGlzIGFjdGl2ZSwgYmVoYXZlcyB0aGUgc2FtZSBhcyB7QGxpbmsgUmVhZGFibGVTdHJlYW0uY2FuY2VsIHwgc3RyZWFtLmNhbmNlbChyZWFzb24pfS5cbiAgICovXG4gIGNhbmNlbChyZWFzb246IGFueSA9IHVuZGVmaW5lZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGJ5b2JSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjYW5jZWwnKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgocmVhZGVyTG9ja0V4Y2VwdGlvbignY2FuY2VsJykpO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNDYW5jZWwodGhpcywgcmVhc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byByZWFkcyBieXRlcyBpbnRvIHZpZXcsIGFuZCByZXR1cm5zIGEgcHJvbWlzZSByZXNvbHZlZCB3aXRoIHRoZSByZXN1bHQuXG4gICAqXG4gICAqIElmIHJlYWRpbmcgYSBjaHVuayBjYXVzZXMgdGhlIHF1ZXVlIHRvIGJlY29tZSBlbXB0eSwgbW9yZSBkYXRhIHdpbGwgYmUgcHVsbGVkIGZyb20gdGhlIHVuZGVybHlpbmcgc291cmNlLlxuICAgKi9cbiAgcmVhZDxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3Pih2aWV3OiBUKTogUHJvbWlzZTxSZWFkYWJsZVN0cmVhbUJZT0JSZWFkUmVzdWx0PFQ+PiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoYnlvYlJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlYWQnKSk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheUJ1ZmZlci5pc1ZpZXcodmlldykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ3ZpZXcgbXVzdCBiZSBhbiBhcnJheSBidWZmZXIgdmlldycpKTtcbiAgICB9XG4gICAgaWYgKHZpZXcuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcigndmlldyBtdXN0IGhhdmUgbm9uLXplcm8gYnl0ZUxlbmd0aCcpKTtcbiAgICB9XG4gICAgaWYgKHZpZXcuYnVmZmVyLmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoYHZpZXcncyBidWZmZXIgbXVzdCBoYXZlIG5vbi16ZXJvIGJ5dGVMZW5ndGhgKSk7XG4gICAgfVxuICAgIGlmIChJc0RldGFjaGVkQnVmZmVyKHZpZXcuYnVmZmVyKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcigndmlld1xcJ3MgYnVmZmVyIGhhcyBiZWVuIGRldGFjaGVkJykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ3JlYWQgZnJvbScpKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2UhOiAocmVzdWx0OiBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkUmVzdWx0PFQ+KSA9PiB2b2lkO1xuICAgIGxldCByZWplY3RQcm9taXNlITogKHJlYXNvbjogYW55KSA9PiB2b2lkO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXdQcm9taXNlPFJlYWRhYmxlU3RyZWFtQllPQlJlYWRSZXN1bHQ8VD4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgIHJlamVjdFByb21pc2UgPSByZWplY3Q7XG4gICAgfSk7XG4gICAgY29uc3QgcmVhZEludG9SZXF1ZXN0OiBSZWFkSW50b1JlcXVlc3Q8VD4gPSB7XG4gICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4gcmVzb2x2ZVByb21pc2UoeyB2YWx1ZTogY2h1bmssIGRvbmU6IGZhbHNlIH0pLFxuICAgICAgX2Nsb3NlU3RlcHM6IGNodW5rID0+IHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IGNodW5rLCBkb25lOiB0cnVlIH0pLFxuICAgICAgX2Vycm9yU3RlcHM6IGUgPT4gcmVqZWN0UHJvbWlzZShlKVxuICAgIH07XG4gICAgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyUmVhZCh0aGlzLCB2aWV3LCByZWFkSW50b1JlcXVlc3QpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIHRoZSByZWFkZXIncyBsb2NrIG9uIHRoZSBjb3JyZXNwb25kaW5nIHN0cmVhbS4gQWZ0ZXIgdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZWFkZXIgaXMgbm8gbG9uZ2VyIGFjdGl2ZS5cbiAgICogSWYgdGhlIGFzc29jaWF0ZWQgc3RyZWFtIGlzIGVycm9yZWQgd2hlbiB0aGUgbG9jayBpcyByZWxlYXNlZCwgdGhlIHJlYWRlciB3aWxsIGFwcGVhciBlcnJvcmVkIGluIHRoZSBzYW1lIHdheVxuICAgKiBmcm9tIG5vdyBvbjsgb3RoZXJ3aXNlLCB0aGUgcmVhZGVyIHdpbGwgYXBwZWFyIGNsb3NlZC5cbiAgICpcbiAgICogQSByZWFkZXIncyBsb2NrIGNhbm5vdCBiZSByZWxlYXNlZCB3aGlsZSBpdCBzdGlsbCBoYXMgYSBwZW5kaW5nIHJlYWQgcmVxdWVzdCwgaS5lLiwgaWYgYSBwcm9taXNlIHJldHVybmVkIGJ5XG4gICAqIHRoZSByZWFkZXIncyB7QGxpbmsgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnJlYWQgfCByZWFkKCl9IG1ldGhvZCBoYXMgbm90IHlldCBiZWVuIHNldHRsZWQuIEF0dGVtcHRpbmcgdG9cbiAgICogZG8gc28gd2lsbCB0aHJvdyBhIGBUeXBlRXJyb3JgIGFuZCBsZWF2ZSB0aGUgcmVhZGVyIGxvY2tlZCB0byB0aGUgc3RyZWFtLlxuICAgKi9cbiAgcmVsZWFzZUxvY2soKTogdm9pZCB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih0aGlzKSkge1xuICAgICAgdGhyb3cgYnlvYlJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlbGVhc2VMb2NrJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9yZWFkSW50b1JlcXVlc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RyaWVkIHRvIHJlbGVhc2UgYSByZWFkZXIgbG9jayB3aGVuIHRoYXQgcmVhZGVyIGhhcyBwZW5kaW5nIHJlYWQoKSBjYWxscyB1bi1zZXR0bGVkJyk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZSh0aGlzKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIucHJvdG90eXBlLCB7XG4gIGNhbmNlbDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHJlYWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICByZWxlYXNlTG9jazogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGNsb3NlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcicsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgcmVhZGVycy5cblxuZXhwb3J0IGZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHg6IGFueSk6IHggaXMgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyIHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX3JlYWRJbnRvUmVxdWVzdHMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyUmVhZDxUIGV4dGVuZHMgQXJyYXlCdWZmZXJWaWV3PihcbiAgcmVhZGVyOiBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIsXG4gIHZpZXc6IFQsXG4gIHJlYWRJbnRvUmVxdWVzdDogUmVhZEludG9SZXF1ZXN0PFQ+XG4pOiB2b2lkIHtcbiAgY29uc3Qgc3RyZWFtID0gcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtO1xuXG4gIGFzc2VydChzdHJlYW0gIT09IHVuZGVmaW5lZCk7XG5cbiAgc3RyZWFtLl9kaXN0dXJiZWQgPSB0cnVlO1xuXG4gIGlmIChzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICByZWFkSW50b1JlcXVlc3QuX2Vycm9yU3RlcHMoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gIH0gZWxzZSB7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclB1bGxJbnRvKFxuICAgICAgc3RyZWFtLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgICAgIHZpZXcsXG4gICAgICByZWFkSW50b1JlcXVlc3RcbiAgICApO1xuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIuXG5cbmZ1bmN0aW9uIGJ5b2JSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFxuICAgIGBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcmApO1xufVxuIiwgImltcG9ydCB7IFF1ZXVpbmdTdHJhdGVneSwgUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrIH0gZnJvbSAnLi4vcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgTnVtYmVySXNOYU4gZnJvbSAnLi4vLi4vc3R1Yi9udW1iZXItaXNuYW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gRXh0cmFjdEhpZ2hXYXRlck1hcmsoc3RyYXRlZ3k6IFF1ZXVpbmdTdHJhdGVneSwgZGVmYXVsdEhXTTogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3QgeyBoaWdoV2F0ZXJNYXJrIH0gPSBzdHJhdGVneTtcblxuICBpZiAoaGlnaFdhdGVyTWFyayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRIV007XG4gIH1cblxuICBpZiAoTnVtYmVySXNOYU4oaGlnaFdhdGVyTWFyaykgfHwgaGlnaFdhdGVyTWFyayA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBoaWdoV2F0ZXJNYXJrJyk7XG4gIH1cblxuICByZXR1cm4gaGlnaFdhdGVyTWFyaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV4dHJhY3RTaXplQWxnb3JpdGhtPFQ+KHN0cmF0ZWd5OiBRdWV1aW5nU3RyYXRlZ3k8VD4pOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8VD4ge1xuICBjb25zdCB7IHNpemUgfSA9IHN0cmF0ZWd5O1xuXG4gIGlmICghc2l6ZSkge1xuICAgIHJldHVybiAoKSA9PiAxO1xuICB9XG5cbiAgcmV0dXJuIHNpemU7XG59XG4iLCAiaW1wb3J0IHsgUXVldWluZ1N0cmF0ZWd5LCBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2sgfSBmcm9tICcuLi9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7IGFzc2VydERpY3Rpb25hcnksIGFzc2VydEZ1bmN0aW9uLCBjb252ZXJ0VW5yZXN0cmljdGVkRG91YmxlIH0gZnJvbSAnLi9iYXNpYyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5PFQ+KGluaXQ6IFF1ZXVpbmdTdHJhdGVneTxUPiB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBzdHJpbmcpOiBRdWV1aW5nU3RyYXRlZ3k8VD4ge1xuICBhc3NlcnREaWN0aW9uYXJ5KGluaXQsIGNvbnRleHQpO1xuICBjb25zdCBoaWdoV2F0ZXJNYXJrID0gaW5pdD8uaGlnaFdhdGVyTWFyaztcbiAgY29uc3Qgc2l6ZSA9IGluaXQ/LnNpemU7XG4gIHJldHVybiB7XG4gICAgaGlnaFdhdGVyTWFyazogaGlnaFdhdGVyTWFyayA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogY29udmVydFVucmVzdHJpY3RlZERvdWJsZShoaWdoV2F0ZXJNYXJrKSxcbiAgICBzaXplOiBzaXplID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5U2l6ZShzaXplLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdzaXplJyB0aGF0YClcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29udmVydFF1ZXVpbmdTdHJhdGVneVNpemU8VD4oZm46IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHN0cmluZyk6IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxUPiB7XG4gIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgcmV0dXJuIGNodW5rID0+IGNvbnZlcnRVbnJlc3RyaWN0ZWREb3VibGUoZm4oY2h1bmspKTtcbn1cbiIsICJpbXBvcnQgeyBhc3NlcnREaWN0aW9uYXJ5LCBhc3NlcnRGdW5jdGlvbiB9IGZyb20gJy4vYmFzaWMnO1xuaW1wb3J0IHsgcHJvbWlzZUNhbGwsIHJlZmxlY3RDYWxsIH0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHtcbiAgVW5kZXJseWluZ1NpbmssXG4gIFVuZGVybHlpbmdTaW5rQWJvcnRDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NpbmtDbG9zZUNhbGxiYWNrLFxuICBVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2ssXG4gIFVuZGVybHlpbmdTaW5rV3JpdGVDYWxsYmFjayxcbiAgVmFsaWRhdGVkVW5kZXJseWluZ1Npbmtcbn0gZnJvbSAnLi4vd3JpdGFibGUtc3RyZWFtL3VuZGVybHlpbmctc2luayc7XG5pbXBvcnQgeyBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyIH0gZnJvbSAnLi4vd3JpdGFibGUtc3RyZWFtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU2luazxXPihvcmlnaW5hbDogVW5kZXJseWluZ1Npbms8Vz4gfCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBzdHJpbmcpOiBWYWxpZGF0ZWRVbmRlcmx5aW5nU2luazxXPiB7XG4gIGFzc2VydERpY3Rpb25hcnkob3JpZ2luYWwsIGNvbnRleHQpO1xuICBjb25zdCBhYm9ydCA9IG9yaWdpbmFsPy5hYm9ydDtcbiAgY29uc3QgY2xvc2UgPSBvcmlnaW5hbD8uY2xvc2U7XG4gIGNvbnN0IHN0YXJ0ID0gb3JpZ2luYWw/LnN0YXJ0O1xuICBjb25zdCB0eXBlID0gb3JpZ2luYWw/LnR5cGU7XG4gIGNvbnN0IHdyaXRlID0gb3JpZ2luYWw/LndyaXRlO1xuICByZXR1cm4ge1xuICAgIGFib3J0OiBhYm9ydCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VW5kZXJseWluZ1NpbmtBYm9ydENhbGxiYWNrKGFib3J0LCBvcmlnaW5hbCEsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2Fib3J0JyB0aGF0YCksXG4gICAgY2xvc2U6IGNsb3NlID09PSB1bmRlZmluZWQgP1xuICAgICAgdW5kZWZpbmVkIDpcbiAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU2lua0Nsb3NlQ2FsbGJhY2soY2xvc2UsIG9yaWdpbmFsISwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnY2xvc2UnIHRoYXRgKSxcbiAgICBzdGFydDogc3RhcnQgPT09IHVuZGVmaW5lZCA/XG4gICAgICB1bmRlZmluZWQgOlxuICAgICAgY29udmVydFVuZGVybHlpbmdTaW5rU3RhcnRDYWxsYmFjayhzdGFydCwgb3JpZ2luYWwhLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdzdGFydCcgdGhhdGApLFxuICAgIHdyaXRlOiB3cml0ZSA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VW5kZXJseWluZ1NpbmtXcml0ZUNhbGxiYWNrKHdyaXRlLCBvcmlnaW5hbCEsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3dyaXRlJyB0aGF0YCksXG4gICAgdHlwZVxuICB9O1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1NpbmtBYm9ydENhbGxiYWNrKFxuICBmbjogVW5kZXJseWluZ1NpbmtBYm9ydENhbGxiYWNrLFxuICBvcmlnaW5hbDogVW5kZXJseWluZ1NpbmssXG4gIGNvbnRleHQ6IHN0cmluZ1xuKTogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICByZXR1cm4gKHJlYXNvbjogYW55KSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtyZWFzb25dKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTaW5rQ2xvc2VDYWxsYmFjayhcbiAgZm46IFVuZGVybHlpbmdTaW5rQ2xvc2VDYWxsYmFjayxcbiAgb3JpZ2luYWw6IFVuZGVybHlpbmdTaW5rLFxuICBjb250ZXh0OiBzdHJpbmdcbik6ICgpID0+IFByb21pc2U8dm9pZD4ge1xuICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gIHJldHVybiAoKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtdKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTaW5rU3RhcnRDYWxsYmFjayhcbiAgZm46IFVuZGVybHlpbmdTaW5rU3RhcnRDYWxsYmFjayxcbiAgb3JpZ2luYWw6IFVuZGVybHlpbmdTaW5rLFxuICBjb250ZXh0OiBzdHJpbmdcbik6IFVuZGVybHlpbmdTaW5rU3RhcnRDYWxsYmFjayB7XG4gIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgcmV0dXJuIChjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKSA9PiByZWZsZWN0Q2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU2lua1dyaXRlQ2FsbGJhY2s8Vz4oXG4gIGZuOiBVbmRlcmx5aW5nU2lua1dyaXRlQ2FsbGJhY2s8Vz4sXG4gIG9yaWdpbmFsOiBVbmRlcmx5aW5nU2luazxXPixcbiAgY29udGV4dDogc3RyaW5nXG4pOiAoY2h1bms6IFcsIGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIpID0+IFByb21pc2U8dm9pZD4ge1xuICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gIHJldHVybiAoY2h1bms6IFcsIGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIpID0+IHByb21pc2VDYWxsKGZuLCBvcmlnaW5hbCwgW2NodW5rLCBjb250cm9sbGVyXSk7XG59XG4iLCAiaW1wb3J0IHsgSXNXcml0YWJsZVN0cmVhbSwgV3JpdGFibGVTdHJlYW0gfSBmcm9tICcuLi93cml0YWJsZS1zdHJlYW0nO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0V3JpdGFibGVTdHJlYW0oeDogdW5rbm93biwgY29udGV4dDogc3RyaW5nKTogYXNzZXJ0cyB4IGlzIFdyaXRhYmxlU3RyZWFtIHtcbiAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtKHgpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYSBXcml0YWJsZVN0cmVhbS5gKTtcbiAgfVxufVxuIiwgIi8qKlxuICogQSBzaWduYWwgb2JqZWN0IHRoYXQgYWxsb3dzIHlvdSB0byBjb21tdW5pY2F0ZSB3aXRoIGEgcmVxdWVzdCBhbmQgYWJvcnQgaXQgaWYgcmVxdWlyZWRcbiAqIHZpYSBpdHMgYXNzb2NpYXRlZCBgQWJvcnRDb250cm9sbGVyYCBvYmplY3QuXG4gKlxuICogQHJlbWFya3NcbiAqICAgVGhpcyBpbnRlcmZhY2UgaXMgY29tcGF0aWJsZSB3aXRoIHRoZSBgQWJvcnRTaWduYWxgIGludGVyZmFjZSBkZWZpbmVkIGluIFR5cGVTY3JpcHQncyBET00gdHlwZXMuXG4gKiAgIEl0IGlzIHJlZGVmaW5lZCBoZXJlLCBzbyBpdCBjYW4gYmUgcG9seWZpbGxlZCB3aXRob3V0IGEgRE9NLCBmb3IgZXhhbXBsZSB3aXRoXG4gKiAgIHtAbGluayBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9hYm9ydGNvbnRyb2xsZXItcG9seWZpbGwgfCBhYm9ydGNvbnRyb2xsZXItcG9seWZpbGx9IGluIGEgTm9kZSBlbnZpcm9ubWVudC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWJvcnRTaWduYWwge1xuICAvKipcbiAgICogV2hldGhlciB0aGUgcmVxdWVzdCBpcyBhYm9ydGVkLlxuICAgKi9cbiAgcmVhZG9ubHkgYWJvcnRlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoaXMgc2lnbmFsIGJlY29tZXMgYWJvcnRlZC5cbiAgICovXG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogJ2Fib3J0JywgbGlzdGVuZXI6ICgpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCB3YXMgcHJldmlvdXNseSBhZGRlZCB3aXRoIHtAbGluayBBYm9ydFNpZ25hbC5hZGRFdmVudExpc3RlbmVyfS5cbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogJ2Fib3J0JywgbGlzdGVuZXI6ICgpID0+IHZvaWQpOiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBYm9ydFNpZ25hbCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEFib3J0U2lnbmFsIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gdHlwZW9mICh2YWx1ZSBhcyBBYm9ydFNpZ25hbCkuYWJvcnRlZCA9PT0gJ2Jvb2xlYW4nO1xuICB9IGNhdGNoIHtcbiAgICAvLyBBYm9ydFNpZ25hbC5wcm90b3R5cGUuYWJvcnRlZCB0aHJvd3MgaWYgaXRzIGJyYW5kIGNoZWNrIGZhaWxzXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogQSBjb250cm9sbGVyIG9iamVjdCB0aGF0IGFsbG93cyB5b3UgdG8gYWJvcnQgYW4gYEFib3J0U2lnbmFsYCB3aGVuIGRlc2lyZWQuXG4gKlxuICogQHJlbWFya3NcbiAqICAgVGhpcyBpbnRlcmZhY2UgaXMgY29tcGF0aWJsZSB3aXRoIHRoZSBgQWJvcnRDb250cm9sbGVyYCBpbnRlcmZhY2UgZGVmaW5lZCBpbiBUeXBlU2NyaXB0J3MgRE9NIHR5cGVzLlxuICogICBJdCBpcyByZWRlZmluZWQgaGVyZSwgc28gaXQgY2FuIGJlIHBvbHlmaWxsZWQgd2l0aG91dCBhIERPTSwgZm9yIGV4YW1wbGUgd2l0aFxuICogICB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsIHwgYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsfSBpbiBhIE5vZGUgZW52aXJvbm1lbnQuXG4gKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWJvcnRDb250cm9sbGVyIHtcbiAgcmVhZG9ubHkgc2lnbmFsOiBBYm9ydFNpZ25hbDtcblxuICBhYm9ydCgpOiB2b2lkO1xufVxuXG5pbnRlcmZhY2UgQWJvcnRDb250cm9sbGVyQ29uc3RydWN0b3Ige1xuICBuZXcoKTogQWJvcnRDb250cm9sbGVyO1xufVxuXG5jb25zdCBzdXBwb3J0c0Fib3J0Q29udHJvbGxlciA9IHR5cGVvZiAoQWJvcnRDb250cm9sbGVyIGFzIGFueSkgPT09ICdmdW5jdGlvbic7XG5cbi8qKlxuICogQ29uc3RydWN0IGEgbmV3IEFib3J0Q29udHJvbGxlciwgaWYgc3VwcG9ydGVkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFib3J0Q29udHJvbGxlcigpOiBBYm9ydENvbnRyb2xsZXIgfCB1bmRlZmluZWQge1xuICBpZiAoc3VwcG9ydHNBYm9ydENvbnRyb2xsZXIpIHtcbiAgICByZXR1cm4gbmV3IChBYm9ydENvbnRyb2xsZXIgYXMgQWJvcnRDb250cm9sbGVyQ29uc3RydWN0b3IpKCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsICJpbXBvcnQgYXNzZXJ0IGZyb20gJy4uL3N0dWIvYXNzZXJ0JztcbmltcG9ydCB7XG4gIG5ld1Byb21pc2UsXG4gIHByb21pc2VSZWplY3RlZFdpdGgsXG4gIHByb21pc2VSZXNvbHZlZFdpdGgsXG4gIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUsXG4gIHVwb25Qcm9taXNlXG59IGZyb20gJy4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHtcbiAgRGVxdWV1ZVZhbHVlLFxuICBFbnF1ZXVlVmFsdWVXaXRoU2l6ZSxcbiAgUGVla1F1ZXVlVmFsdWUsXG4gIFF1ZXVlUGFpcixcbiAgUmVzZXRRdWV1ZVxufSBmcm9tICcuL2Fic3RyYWN0LW9wcy9xdWV1ZS13aXRoLXNpemVzJztcbmltcG9ydCB7IFF1ZXVpbmdTdHJhdGVneSwgUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrIH0gZnJvbSAnLi9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7IFNpbXBsZVF1ZXVlIH0gZnJvbSAnLi9zaW1wbGUtcXVldWUnO1xuaW1wb3J0IHsgdHlwZUlzT2JqZWN0IH0gZnJvbSAnLi9oZWxwZXJzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHsgQWJvcnRTdGVwcywgRXJyb3JTdGVwcyB9IGZyb20gJy4vYWJzdHJhY3Qtb3BzL2ludGVybmFsLW1ldGhvZHMnO1xuaW1wb3J0IHsgSXNOb25OZWdhdGl2ZU51bWJlciB9IGZyb20gJy4vYWJzdHJhY3Qtb3BzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHsgRXh0cmFjdEhpZ2hXYXRlck1hcmssIEV4dHJhY3RTaXplQWxnb3JpdGhtIH0gZnJvbSAnLi9hYnN0cmFjdC1vcHMvcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5IH0gZnJvbSAnLi92YWxpZGF0b3JzL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IHtcbiAgVW5kZXJseWluZ1NpbmssXG4gIFVuZGVybHlpbmdTaW5rQWJvcnRDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NpbmtDbG9zZUNhbGxiYWNrLFxuICBVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2ssXG4gIFVuZGVybHlpbmdTaW5rV3JpdGVDYWxsYmFjayxcbiAgVmFsaWRhdGVkVW5kZXJseWluZ1Npbmtcbn0gZnJvbSAnLi93cml0YWJsZS1zdHJlYW0vdW5kZXJseWluZy1zaW5rJztcbmltcG9ydCB7IGFzc2VydE9iamVjdCwgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudCB9IGZyb20gJy4vdmFsaWRhdG9ycy9iYXNpYyc7XG5pbXBvcnQgeyBjb252ZXJ0VW5kZXJseWluZ1NpbmsgfSBmcm9tICcuL3ZhbGlkYXRvcnMvdW5kZXJseWluZy1zaW5rJztcbmltcG9ydCB7IGFzc2VydFdyaXRhYmxlU3RyZWFtIH0gZnJvbSAnLi92YWxpZGF0b3JzL3dyaXRhYmxlLXN0cmVhbSc7XG5pbXBvcnQgeyBBYm9ydENvbnRyb2xsZXIsIEFib3J0U2lnbmFsLCBjcmVhdGVBYm9ydENvbnRyb2xsZXIgfSBmcm9tICcuL2Fib3J0LXNpZ25hbCc7XG5cbnR5cGUgV3JpdGFibGVTdHJlYW1TdGF0ZSA9ICd3cml0YWJsZScgfCAnY2xvc2VkJyB8ICdlcnJvcmluZycgfCAnZXJyb3JlZCc7XG5cbmludGVyZmFjZSBXcml0ZU9yQ2xvc2VSZXF1ZXN0IHtcbiAgX3Jlc29sdmU6ICh2YWx1ZT86IHVuZGVmaW5lZCkgPT4gdm9pZDtcbiAgX3JlamVjdDogKHJlYXNvbjogYW55KSA9PiB2b2lkO1xufVxuXG50eXBlIFdyaXRlUmVxdWVzdCA9IFdyaXRlT3JDbG9zZVJlcXVlc3Q7XG50eXBlIENsb3NlUmVxdWVzdCA9IFdyaXRlT3JDbG9zZVJlcXVlc3Q7XG5cbmludGVyZmFjZSBQZW5kaW5nQWJvcnRSZXF1ZXN0IHtcbiAgX3Byb21pc2U6IFByb21pc2U8dW5kZWZpbmVkPjtcbiAgX3Jlc29sdmU6ICh2YWx1ZT86IHVuZGVmaW5lZCkgPT4gdm9pZDtcbiAgX3JlamVjdDogKHJlYXNvbjogYW55KSA9PiB2b2lkO1xuICBfcmVhc29uOiBhbnk7XG4gIF93YXNBbHJlYWR5RXJyb3Jpbmc6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSB3cml0YWJsZSBzdHJlYW0gcmVwcmVzZW50cyBhIGRlc3RpbmF0aW9uIGZvciBkYXRhLCBpbnRvIHdoaWNoIHlvdSBjYW4gd3JpdGUuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBXcml0YWJsZVN0cmVhbTxXID0gYW55PiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0YXRlITogV3JpdGFibGVTdHJlYW1TdGF0ZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RvcmVkRXJyb3I6IGFueTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfd3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXI8Vz4gfCB1bmRlZmluZWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlciE6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Vz47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3dyaXRlUmVxdWVzdHMhOiBTaW1wbGVRdWV1ZTxXcml0ZVJlcXVlc3Q+O1xuICAvKiogQGludGVybmFsICovXG4gIF9pbkZsaWdodFdyaXRlUmVxdWVzdDogV3JpdGVSZXF1ZXN0IHwgdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF9jbG9zZVJlcXVlc3Q6IENsb3NlUmVxdWVzdCB8IHVuZGVmaW5lZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5GbGlnaHRDbG9zZVJlcXVlc3Q6IENsb3NlUmVxdWVzdCB8IHVuZGVmaW5lZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGVuZGluZ0Fib3J0UmVxdWVzdDogUGVuZGluZ0Fib3J0UmVxdWVzdCB8IHVuZGVmaW5lZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYmFja3ByZXNzdXJlITogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih1bmRlcmx5aW5nU2luaz86IFVuZGVybHlpbmdTaW5rPFc+LCBzdHJhdGVneT86IFF1ZXVpbmdTdHJhdGVneTxXPik7XG4gIGNvbnN0cnVjdG9yKHJhd1VuZGVybHlpbmdTaW5rOiBVbmRlcmx5aW5nU2luazxXPiB8IG51bGwgfCB1bmRlZmluZWQgPSB7fSxcbiAgICAgICAgICAgICAgcmF3U3RyYXRlZ3k6IFF1ZXVpbmdTdHJhdGVneTxXPiB8IG51bGwgfCB1bmRlZmluZWQgPSB7fSkge1xuICAgIGlmIChyYXdVbmRlcmx5aW5nU2luayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByYXdVbmRlcmx5aW5nU2luayA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydE9iamVjdChyYXdVbmRlcmx5aW5nU2luaywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0cmF0ZWd5ID0gY29udmVydFF1ZXVpbmdTdHJhdGVneShyYXdTdHJhdGVneSwgJ1NlY29uZCBwYXJhbWV0ZXInKTtcbiAgICBjb25zdCB1bmRlcmx5aW5nU2luayA9IGNvbnZlcnRVbmRlcmx5aW5nU2luayhyYXdVbmRlcmx5aW5nU2luaywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuXG4gICAgSW5pdGlhbGl6ZVdyaXRhYmxlU3RyZWFtKHRoaXMpO1xuXG4gICAgY29uc3QgdHlwZSA9IHVuZGVybHlpbmdTaW5rLnR5cGU7XG4gICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZSBpcyBzcGVjaWZpZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplQWxnb3JpdGhtID0gRXh0cmFjdFNpemVBbGdvcml0aG0oc3RyYXRlZ3kpO1xuICAgIGNvbnN0IGhpZ2hXYXRlck1hcmsgPSBFeHRyYWN0SGlnaFdhdGVyTWFyayhzdHJhdGVneSwgMSk7XG5cbiAgICBTZXRVcFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NpbmsodGhpcywgdW5kZXJseWluZ1NpbmssIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHdyaXRhYmxlIHN0cmVhbSBpcyBsb2NrZWQgdG8gYSB3cml0ZXIuXG4gICAqL1xuICBnZXQgbG9ja2VkKCk6IGJvb2xlYW4ge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbignbG9ja2VkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIElzV3JpdGFibGVTdHJlYW1Mb2NrZWQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQWJvcnRzIHRoZSBzdHJlYW0sIHNpZ25hbGluZyB0aGF0IHRoZSBwcm9kdWNlciBjYW4gbm8gbG9uZ2VyIHN1Y2Nlc3NmdWxseSB3cml0ZSB0byB0aGUgc3RyZWFtIGFuZCBpdCBpcyB0byBiZVxuICAgKiBpbW1lZGlhdGVseSBtb3ZlZCB0byBhbiBlcnJvcmVkIHN0YXRlLCB3aXRoIGFueSBxdWV1ZWQtdXAgd3JpdGVzIGRpc2NhcmRlZC4gVGhpcyB3aWxsIGFsc28gZXhlY3V0ZSBhbnkgYWJvcnRcbiAgICogbWVjaGFuaXNtIG9mIHRoZSB1bmRlcmx5aW5nIHNpbmsuXG4gICAqXG4gICAqIFRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgZnVsZmlsbCBpZiB0aGUgc3RyZWFtIHNodXRzIGRvd24gc3VjY2Vzc2Z1bGx5LCBvciByZWplY3QgaWYgdGhlIHVuZGVybHlpbmcgc2luayBzaWduYWxlZFxuICAgKiB0aGF0IHRoZXJlIHdhcyBhbiBlcnJvciBkb2luZyBzby4gQWRkaXRpb25hbGx5LCBpdCB3aWxsIHJlamVjdCB3aXRoIGEgYFR5cGVFcnJvcmAgKHdpdGhvdXQgYXR0ZW1wdGluZyB0byBjYW5jZWxcbiAgICogdGhlIHN0cmVhbSkgaWYgdGhlIHN0cmVhbSBpcyBjdXJyZW50bHkgbG9ja2VkLlxuICAgKi9cbiAgYWJvcnQocmVhc29uOiBhbnkgPSB1bmRlZmluZWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Fib3J0JykpO1xuICAgIH1cblxuICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdDYW5ub3QgYWJvcnQgYSBzdHJlYW0gdGhhdCBhbHJlYWR5IGhhcyBhIHdyaXRlcicpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1BYm9ydCh0aGlzLCByZWFzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgc3RyZWFtLiBUaGUgdW5kZXJseWluZyBzaW5rIHdpbGwgZmluaXNoIHByb2Nlc3NpbmcgYW55IHByZXZpb3VzbHktd3JpdHRlbiBjaHVua3MsIGJlZm9yZSBpbnZva2luZyBpdHNcbiAgICogY2xvc2UgYmVoYXZpb3IuIER1cmluZyB0aGlzIHRpbWUgYW55IGZ1cnRoZXIgYXR0ZW1wdHMgdG8gd3JpdGUgd2lsbCBmYWlsICh3aXRob3V0IGVycm9yaW5nIHRoZSBzdHJlYW0pLlxuICAgKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBmdWxmaWxsIGlmIGFsbCByZW1haW5pbmcgY2h1bmtzIGFyZSBzdWNjZXNzZnVsbHkgd3JpdHRlbiBhbmQgdGhlIHN0cmVhbVxuICAgKiBzdWNjZXNzZnVsbHkgY2xvc2VzLCBvciByZWplY3RzIGlmIGFuIGVycm9yIGlzIGVuY291bnRlcmVkIGR1cmluZyB0aGlzIHByb2Nlc3MuIEFkZGl0aW9uYWxseSwgaXQgd2lsbCByZWplY3Qgd2l0aFxuICAgKiBhIGBUeXBlRXJyb3JgICh3aXRob3V0IGF0dGVtcHRpbmcgdG8gY2FuY2VsIHRoZSBzdHJlYW0pIGlmIHRoZSBzdHJlYW0gaXMgY3VycmVudGx5IGxvY2tlZC5cbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgaWYgKElzV3JpdGFibGVTdHJlYW1Mb2NrZWQodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjbG9zZSBhIHN0cmVhbSB0aGF0IGFscmVhZHkgaGFzIGEgd3JpdGVyJykpO1xuICAgIH1cblxuICAgIGlmIChXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodCh0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignQ2Fubm90IGNsb3NlIGFuIGFscmVhZHktY2xvc2luZyBzdHJlYW0nKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtQ2xvc2UodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHtAbGluayBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIgfCB3cml0ZXJ9IGFuZCBsb2NrcyB0aGUgc3RyZWFtIHRvIHRoZSBuZXcgd3JpdGVyLiBXaGlsZSB0aGUgc3RyZWFtXG4gICAqIGlzIGxvY2tlZCwgbm8gb3RoZXIgd3JpdGVyIGNhbiBiZSBhY3F1aXJlZCB1bnRpbCB0aGlzIG9uZSBpcyByZWxlYXNlZC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbmFsaXR5IGlzIGVzcGVjaWFsbHkgdXNlZnVsIGZvciBjcmVhdGluZyBhYnN0cmFjdGlvbnMgdGhhdCBkZXNpcmUgdGhlIGFiaWxpdHkgdG8gd3JpdGUgdG8gYSBzdHJlYW1cbiAgICogd2l0aG91dCBpbnRlcnJ1cHRpb24gb3IgaW50ZXJsZWF2aW5nLiBCeSBnZXR0aW5nIGEgd3JpdGVyIGZvciB0aGUgc3RyZWFtLCB5b3UgY2FuIGVuc3VyZSBub2JvZHkgZWxzZSBjYW4gd3JpdGUgYXRcbiAgICogdGhlIHNhbWUgdGltZSwgd2hpY2ggd291bGQgY2F1c2UgdGhlIHJlc3VsdGluZyB3cml0dGVuIGRhdGEgdG8gYmUgdW5wcmVkaWN0YWJsZSBhbmQgcHJvYmFibHkgdXNlbGVzcy5cbiAgICovXG4gIGdldFdyaXRlcigpOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXI8Vz4ge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbignZ2V0V3JpdGVyJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEFjcXVpcmVXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIodGhpcyk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLCB7XG4gIGFib3J0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgY2xvc2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBnZXRXcml0ZXI6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBsb2NrZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1dyaXRhYmxlU3RyZWFtJyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIEFjcXVpcmVXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIsXG4gIENyZWF0ZVdyaXRhYmxlU3RyZWFtLFxuICBJc1dyaXRhYmxlU3RyZWFtLFxuICBJc1dyaXRhYmxlU3RyZWFtTG9ja2VkLFxuICBXcml0YWJsZVN0cmVhbSxcbiAgV3JpdGFibGVTdHJlYW1BYm9ydCxcbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9ySWZOZWVkZWQsXG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlV2l0aEVycm9yUHJvcGFnYXRpb24sXG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlclJlbGVhc2UsXG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcldyaXRlLFxuICBXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodCxcbiAgVW5kZXJseWluZ1NpbmssXG4gIFVuZGVybHlpbmdTaW5rU3RhcnRDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NpbmtXcml0ZUNhbGxiYWNrLFxuICBVbmRlcmx5aW5nU2lua0Nsb3NlQ2FsbGJhY2ssXG4gIFVuZGVybHlpbmdTaW5rQWJvcnRDYWxsYmFja1xufTtcblxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtLlxuXG5mdW5jdGlvbiBBY3F1aXJlV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyPFc+KHN0cmVhbTogV3JpdGFibGVTdHJlYW08Vz4pOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXI8Vz4ge1xuICByZXR1cm4gbmV3IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcihzdHJlYW0pO1xufVxuXG4vLyBUaHJvd3MgaWYgYW5kIG9ubHkgaWYgc3RhcnRBbGdvcml0aG0gdGhyb3dzLlxuZnVuY3Rpb24gQ3JlYXRlV3JpdGFibGVTdHJlYW08Vz4oc3RhcnRBbGdvcml0aG06ICgpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQWxnb3JpdGhtOiAoY2h1bms6IFcpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0QWxnb3JpdGhtOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoV2F0ZXJNYXJrID0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemVBbGdvcml0aG06IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxXPiA9ICgpID0+IDEpIHtcbiAgYXNzZXJ0KElzTm9uTmVnYXRpdmVOdW1iZXIoaGlnaFdhdGVyTWFyaykpO1xuXG4gIGNvbnN0IHN0cmVhbTogV3JpdGFibGVTdHJlYW08Vz4gPSBPYmplY3QuY3JlYXRlKFdyaXRhYmxlU3RyZWFtLnByb3RvdHlwZSk7XG4gIEluaXRpYWxpemVXcml0YWJsZVN0cmVhbShzdHJlYW0pO1xuXG4gIGNvbnN0IGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Vz4gPSBPYmplY3QuY3JlYXRlKFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlKTtcblxuICBTZXRVcFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoc3RyZWFtLCBjb250cm9sbGVyLCBzdGFydEFsZ29yaXRobSwgd3JpdGVBbGdvcml0aG0sIGNsb3NlQWxnb3JpdGhtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pO1xuICByZXR1cm4gc3RyZWFtO1xufVxuXG5mdW5jdGlvbiBJbml0aWFsaXplV3JpdGFibGVTdHJlYW08Vz4oc3RyZWFtOiBXcml0YWJsZVN0cmVhbTxXPikge1xuICBzdHJlYW0uX3N0YXRlID0gJ3dyaXRhYmxlJztcblxuICAvLyBUaGUgZXJyb3IgdGhhdCB3aWxsIGJlIHJlcG9ydGVkIGJ5IG5ldyBtZXRob2QgY2FsbHMgb25jZSB0aGUgc3RhdGUgYmVjb21lcyBlcnJvcmVkLiBPbmx5IHNldCB3aGVuIFtbc3RhdGVdXSBpc1xuICAvLyAnZXJyb3JpbmcnIG9yICdlcnJvcmVkJy4gTWF5IGJlIHNldCB0byBhbiB1bmRlZmluZWQgdmFsdWUuXG4gIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgc3RyZWFtLl93cml0ZXIgPSB1bmRlZmluZWQ7XG5cbiAgLy8gSW5pdGlhbGl6ZSB0byB1bmRlZmluZWQgZmlyc3QgYmVjYXVzZSB0aGUgY29uc3RydWN0b3Igb2YgdGhlIGNvbnRyb2xsZXIgY2hlY2tzIHRoaXNcbiAgLy8gdmFyaWFibGUgdG8gdmFsaWRhdGUgdGhlIGNhbGxlci5cbiAgc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIgPSB1bmRlZmluZWQhO1xuXG4gIC8vIFRoaXMgcXVldWUgaXMgcGxhY2VkIGhlcmUgaW5zdGVhZCBvZiB0aGUgd3JpdGVyIGNsYXNzIGluIG9yZGVyIHRvIGFsbG93IGZvciBwYXNzaW5nIGEgd3JpdGVyIHRvIHRoZSBuZXh0IGRhdGFcbiAgLy8gcHJvZHVjZXIgd2l0aG91dCB3YWl0aW5nIGZvciB0aGUgcXVldWVkIHdyaXRlcyB0byBmaW5pc2guXG4gIHN0cmVhbS5fd3JpdGVSZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuXG4gIC8vIFdyaXRlIHJlcXVlc3RzIGFyZSByZW1vdmVkIGZyb20gX3dyaXRlUmVxdWVzdHMgd2hlbiB3cml0ZSgpIGlzIGNhbGxlZCBvbiB0aGUgdW5kZXJseWluZyBzaW5rLiBUaGlzIHByZXZlbnRzXG4gIC8vIHRoZW0gZnJvbSBiZWluZyBlcnJvbmVvdXNseSByZWplY3RlZCBvbiBlcnJvci4gSWYgYSB3cml0ZSgpIGNhbGwgaXMgaW4tZmxpZ2h0LCB0aGUgcmVxdWVzdCBpcyBzdG9yZWQgaGVyZS5cbiAgc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9IHVuZGVmaW5lZDtcblxuICAvLyBUaGUgcHJvbWlzZSB0aGF0IHdhcyByZXR1cm5lZCBmcm9tIHdyaXRlci5jbG9zZSgpLiBTdG9yZWQgaGVyZSBiZWNhdXNlIGl0IG1heSBiZSBmdWxmaWxsZWQgYWZ0ZXIgdGhlIHdyaXRlclxuICAvLyBoYXMgYmVlbiBkZXRhY2hlZC5cbiAgc3RyZWFtLl9jbG9zZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG5cbiAgLy8gQ2xvc2UgcmVxdWVzdCBpcyByZW1vdmVkIGZyb20gX2Nsb3NlUmVxdWVzdCB3aGVuIGNsb3NlKCkgaXMgY2FsbGVkIG9uIHRoZSB1bmRlcmx5aW5nIHNpbmsuIFRoaXMgcHJldmVudHMgaXRcbiAgLy8gZnJvbSBiZWluZyBlcnJvbmVvdXNseSByZWplY3RlZCBvbiBlcnJvci4gSWYgYSBjbG9zZSgpIGNhbGwgaXMgaW4tZmxpZ2h0LCB0aGUgcmVxdWVzdCBpcyBzdG9yZWQgaGVyZS5cbiAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcblxuICAvLyBUaGUgcHJvbWlzZSB0aGF0IHdhcyByZXR1cm5lZCBmcm9tIHdyaXRlci5hYm9ydCgpLiBUaGlzIG1heSBhbHNvIGJlIGZ1bGZpbGxlZCBhZnRlciB0aGUgd3JpdGVyIGhhcyBkZXRhY2hlZC5cbiAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuXG4gIC8vIFRoZSBiYWNrcHJlc3N1cmUgc2lnbmFsIHNldCBieSB0aGUgY29udHJvbGxlci5cbiAgc3RyZWFtLl9iYWNrcHJlc3N1cmUgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gSXNXcml0YWJsZVN0cmVhbSh4OiB1bmtub3duKTogeCBpcyBXcml0YWJsZVN0cmVhbSB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ193cml0YWJsZVN0cmVhbUNvbnRyb2xsZXInKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgV3JpdGFibGVTdHJlYW07XG59XG5cbmZ1bmN0aW9uIElzV3JpdGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSk6IGJvb2xlYW4ge1xuICBhc3NlcnQoSXNXcml0YWJsZVN0cmVhbShzdHJlYW0pKTtcblxuICBpZiAoc3RyZWFtLl93cml0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUFib3J0KHN0cmVhbTogV3JpdGFibGVTdHJlYW0sIHJlYXNvbjogYW55KTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnIHx8IHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gIH1cbiAgc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIuX2Fib3J0UmVhc29uID0gcmVhc29uO1xuICBzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlci5fYWJvcnRDb250cm9sbGVyPy5hYm9ydCgpO1xuXG4gIC8vIFR5cGVTY3JpcHQgbmFycm93cyB0aGUgdHlwZSBvZiBgc3RyZWFtLl9zdGF0ZWAgZG93biB0byAnd3JpdGFibGUnIHwgJ2Vycm9yaW5nJyxcbiAgLy8gYnV0IGl0IGRvZXNuJ3Qga25vdyB0aGF0IHNpZ25hbGluZyBhYm9ydCBydW5zIGF1dGhvciBjb2RlIHRoYXQgbWlnaHQgaGF2ZSBjaGFuZ2VkIHRoZSBzdGF0ZS5cbiAgLy8gV2lkZW4gdGhlIHR5cGUgYWdhaW4gYnkgY2FzdGluZyB0byBXcml0YWJsZVN0cmVhbVN0YXRlLlxuICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGUgYXMgV3JpdGFibGVTdHJlYW1TdGF0ZTtcblxuICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnIHx8IHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICB9XG4gIGlmIChzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QuX3Byb21pc2U7XG4gIH1cblxuICBhc3NlcnQoc3RhdGUgPT09ICd3cml0YWJsZScgfHwgc3RhdGUgPT09ICdlcnJvcmluZycpO1xuXG4gIGxldCB3YXNBbHJlYWR5RXJyb3JpbmcgPSBmYWxzZTtcbiAgaWYgKHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgd2FzQWxyZWFkeUVycm9yaW5nID0gdHJ1ZTtcbiAgICAvLyByZWFzb24gd2lsbCBub3QgYmUgdXNlZCwgc28gZG9uJ3Qga2VlcCBhIHJlZmVyZW5jZSB0byBpdC5cbiAgICByZWFzb24gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPSB7XG4gICAgICBfcHJvbWlzZTogdW5kZWZpbmVkISxcbiAgICAgIF9yZXNvbHZlOiByZXNvbHZlLFxuICAgICAgX3JlamVjdDogcmVqZWN0LFxuICAgICAgX3JlYXNvbjogcmVhc29uLFxuICAgICAgX3dhc0FscmVhZHlFcnJvcmluZzogd2FzQWxyZWFkeUVycm9yaW5nXG4gICAgfTtcbiAgfSk7XG4gIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCEuX3Byb21pc2UgPSBwcm9taXNlO1xuXG4gIGlmICghd2FzQWxyZWFkeUVycm9yaW5nKSB7XG4gICAgV3JpdGFibGVTdHJlYW1TdGFydEVycm9yaW5nKHN0cmVhbSwgcmVhc29uKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUNsb3NlKHN0cmVhbTogV3JpdGFibGVTdHJlYW08YW55Pik6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgaWYgKHN0YXRlID09PSAnY2xvc2VkJyB8fCBzdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcihcbiAgICAgIGBUaGUgc3RyZWFtIChpbiAke3N0YXRlfSBzdGF0ZSkgaXMgbm90IGluIHRoZSB3cml0YWJsZSBzdGF0ZSBhbmQgY2Fubm90IGJlIGNsb3NlZGApKTtcbiAgfVxuXG4gIGFzc2VydChzdGF0ZSA9PT0gJ3dyaXRhYmxlJyB8fCBzdGF0ZSA9PT0gJ2Vycm9yaW5nJyk7XG4gIGFzc2VydCghV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSk7XG5cbiAgY29uc3QgcHJvbWlzZSA9IG5ld1Byb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgY2xvc2VSZXF1ZXN0OiBDbG9zZVJlcXVlc3QgPSB7XG4gICAgICBfcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgIF9yZWplY3Q6IHJlamVjdFxuICAgIH07XG5cbiAgICBzdHJlYW0uX2Nsb3NlUmVxdWVzdCA9IGNsb3NlUmVxdWVzdDtcbiAgfSk7XG5cbiAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gIGlmICh3cml0ZXIgIT09IHVuZGVmaW5lZCAmJiBzdHJlYW0uX2JhY2twcmVzc3VyZSAmJiBzdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNvbHZlKHdyaXRlcik7XG4gIH1cblxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2Uoc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuXG4gIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBXcml0YWJsZVN0cmVhbSBBUEkgZXhwb3NlZCBmb3IgY29udHJvbGxlcnMuXG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtQWRkV3JpdGVSZXF1ZXN0KHN0cmVhbTogV3JpdGFibGVTdHJlYW0pOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICBhc3NlcnQoSXNXcml0YWJsZVN0cmVhbUxvY2tlZChzdHJlYW0pKTtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICd3cml0YWJsZScpO1xuXG4gIGNvbnN0IHByb21pc2UgPSBuZXdQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHdyaXRlUmVxdWVzdDogV3JpdGVSZXF1ZXN0ID0ge1xuICAgICAgX3Jlc29sdmU6IHJlc29sdmUsXG4gICAgICBfcmVqZWN0OiByZWplY3RcbiAgICB9O1xuXG4gICAgc3RyZWFtLl93cml0ZVJlcXVlc3RzLnB1c2god3JpdGVSZXF1ZXN0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVhbFdpdGhSZWplY3Rpb24oc3RyZWFtOiBXcml0YWJsZVN0cmVhbSwgZXJyb3I6IGFueSkge1xuICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG5cbiAgaWYgKHN0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgV3JpdGFibGVTdHJlYW1TdGFydEVycm9yaW5nKHN0cmVhbSwgZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzc2VydChzdGF0ZSA9PT0gJ2Vycm9yaW5nJyk7XG4gIFdyaXRhYmxlU3RyZWFtRmluaXNoRXJyb3Jpbmcoc3RyZWFtKTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1TdGFydEVycm9yaW5nKHN0cmVhbTogV3JpdGFibGVTdHJlYW0sIHJlYXNvbjogYW55KSB7XG4gIGFzc2VydChzdHJlYW0uX3N0b3JlZEVycm9yID09PSB1bmRlZmluZWQpO1xuICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyk7XG5cbiAgY29uc3QgY29udHJvbGxlciA9IHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyO1xuICBhc3NlcnQoY29udHJvbGxlciAhPT0gdW5kZWZpbmVkKTtcblxuICBzdHJlYW0uX3N0YXRlID0gJ2Vycm9yaW5nJztcbiAgc3RyZWFtLl9zdG9yZWRFcnJvciA9IHJlYXNvbjtcbiAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gIGlmICh3cml0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckVuc3VyZVJlYWR5UHJvbWlzZVJlamVjdGVkKHdyaXRlciwgcmVhc29uKTtcbiAgfVxuXG4gIGlmICghV3JpdGFibGVTdHJlYW1IYXNPcGVyYXRpb25NYXJrZWRJbkZsaWdodChzdHJlYW0pICYmIGNvbnRyb2xsZXIuX3N0YXJ0ZWQpIHtcbiAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEVycm9yaW5nKHN0cmVhbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1GaW5pc2hFcnJvcmluZyhzdHJlYW06IFdyaXRhYmxlU3RyZWFtKSB7XG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JpbmcnKTtcbiAgYXNzZXJ0KCFXcml0YWJsZVN0cmVhbUhhc09wZXJhdGlvbk1hcmtlZEluRmxpZ2h0KHN0cmVhbSkpO1xuICBzdHJlYW0uX3N0YXRlID0gJ2Vycm9yZWQnO1xuICBzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlcltFcnJvclN0ZXBzXSgpO1xuXG4gIGNvbnN0IHN0b3JlZEVycm9yID0gc3RyZWFtLl9zdG9yZWRFcnJvcjtcbiAgc3RyZWFtLl93cml0ZVJlcXVlc3RzLmZvckVhY2god3JpdGVSZXF1ZXN0ID0+IHtcbiAgICB3cml0ZVJlcXVlc3QuX3JlamVjdChzdG9yZWRFcnJvcik7XG4gIH0pO1xuICBzdHJlYW0uX3dyaXRlUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcblxuICBpZiAoc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBXcml0YWJsZVN0cmVhbVJlamVjdENsb3NlQW5kQ2xvc2VkUHJvbWlzZUlmTmVlZGVkKHN0cmVhbSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYWJvcnRSZXF1ZXN0ID0gc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0O1xuICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPSB1bmRlZmluZWQ7XG5cbiAgaWYgKGFib3J0UmVxdWVzdC5fd2FzQWxyZWFkeUVycm9yaW5nKSB7XG4gICAgYWJvcnRSZXF1ZXN0Ll9yZWplY3Qoc3RvcmVkRXJyb3IpO1xuICAgIFdyaXRhYmxlU3RyZWFtUmVqZWN0Q2xvc2VBbmRDbG9zZWRQcm9taXNlSWZOZWVkZWQoc3RyZWFtKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwcm9taXNlID0gc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXJbQWJvcnRTdGVwc10oYWJvcnRSZXF1ZXN0Ll9yZWFzb24pO1xuICB1cG9uUHJvbWlzZShcbiAgICBwcm9taXNlLFxuICAgICgpID0+IHtcbiAgICAgIGFib3J0UmVxdWVzdC5fcmVzb2x2ZSgpO1xuICAgICAgV3JpdGFibGVTdHJlYW1SZWplY3RDbG9zZUFuZENsb3NlZFByb21pc2VJZk5lZWRlZChzdHJlYW0pO1xuICAgIH0sXG4gICAgKHJlYXNvbjogYW55KSA9PiB7XG4gICAgICBhYm9ydFJlcXVlc3QuX3JlamVjdChyZWFzb24pO1xuICAgICAgV3JpdGFibGVTdHJlYW1SZWplY3RDbG9zZUFuZENsb3NlZFByb21pc2VJZk5lZWRlZChzdHJlYW0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0V3JpdGUoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSkge1xuICBhc3NlcnQoc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCAhPT0gdW5kZWZpbmVkKTtcbiAgc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCEuX3Jlc29sdmUodW5kZWZpbmVkKTtcbiAgc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodFdyaXRlV2l0aEVycm9yKHN0cmVhbTogV3JpdGFibGVTdHJlYW0sIGVycm9yOiBhbnkpIHtcbiAgYXNzZXJ0KHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgIT09IHVuZGVmaW5lZCk7XG4gIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QhLl9yZWplY3QoZXJyb3IpO1xuICBzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuXG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnIHx8IHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmluZycpO1xuXG4gIFdyaXRhYmxlU3RyZWFtRGVhbFdpdGhSZWplY3Rpb24oc3RyZWFtLCBlcnJvcik7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRDbG9zZShzdHJlYW06IFdyaXRhYmxlU3RyZWFtKSB7XG4gIGFzc2VydChzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ICE9PSB1bmRlZmluZWQpO1xuICBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0IS5fcmVzb2x2ZSh1bmRlZmluZWQpO1xuICBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcblxuICBhc3NlcnQoc3RhdGUgPT09ICd3cml0YWJsZScgfHwgc3RhdGUgPT09ICdlcnJvcmluZycpO1xuXG4gIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgIC8vIFRoZSBlcnJvciB3YXMgdG9vIGxhdGUgdG8gZG8gYW55dGhpbmcsIHNvIGl0IGlzIGlnbm9yZWQuXG4gICAgc3RyZWFtLl9zdG9yZWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICBpZiAoc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdC5fcmVzb2x2ZSgpO1xuICAgICAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHN0cmVhbS5fc3RhdGUgPSAnY2xvc2VkJztcblxuICBjb25zdCB3cml0ZXIgPSBzdHJlYW0uX3dyaXRlcjtcbiAgaWYgKHdyaXRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZXNvbHZlKHdyaXRlcik7XG4gIH1cblxuICBhc3NlcnQoc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID09PSB1bmRlZmluZWQpO1xuICBhc3NlcnQoc3RyZWFtLl9zdG9yZWRFcnJvciA9PT0gdW5kZWZpbmVkKTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodENsb3NlV2l0aEVycm9yKHN0cmVhbTogV3JpdGFibGVTdHJlYW0sIGVycm9yOiBhbnkpIHtcbiAgYXNzZXJ0KHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgIT09IHVuZGVmaW5lZCk7XG4gIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QhLl9yZWplY3QoZXJyb3IpO1xuICBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuXG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnIHx8IHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmluZycpO1xuXG4gIC8vIE5ldmVyIGV4ZWN1dGUgc2luayBhYm9ydCgpIGFmdGVyIHNpbmsgY2xvc2UoKS5cbiAgaWYgKHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0Ll9yZWplY3QoZXJyb3IpO1xuICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgfVxuICBXcml0YWJsZVN0cmVhbURlYWxXaXRoUmVqZWN0aW9uKHN0cmVhbSwgZXJyb3IpO1xufVxuXG4vLyBUT0RPKHJpY2VhKTogRml4IGFscGhhYmV0aWNhbCBvcmRlci5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbTogV3JpdGFibGVTdHJlYW0pOiBib29sZWFuIHtcbiAgaWYgKHN0cmVhbS5fY2xvc2VSZXF1ZXN0ID09PSB1bmRlZmluZWQgJiYgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtSGFzT3BlcmF0aW9uTWFya2VkSW5GbGlnaHQoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSk6IGJvb2xlYW4ge1xuICBpZiAoc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9PT0gdW5kZWZpbmVkICYmIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbU1hcmtDbG9zZVJlcXVlc3RJbkZsaWdodChzdHJlYW06IFdyaXRhYmxlU3RyZWFtKSB7XG4gIGFzc2VydChzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID09PSB1bmRlZmluZWQpO1xuICBhc3NlcnQoc3RyZWFtLl9jbG9zZVJlcXVlc3QgIT09IHVuZGVmaW5lZCk7XG4gIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPSBzdHJlYW0uX2Nsb3NlUmVxdWVzdDtcbiAgc3RyZWFtLl9jbG9zZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtTWFya0ZpcnN0V3JpdGVSZXF1ZXN0SW5GbGlnaHQoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSkge1xuICBhc3NlcnQoc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9PT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHN0cmVhbS5fd3JpdGVSZXF1ZXN0cy5sZW5ndGggIT09IDApO1xuICBzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0ID0gc3RyZWFtLl93cml0ZVJlcXVlc3RzLnNoaWZ0KCk7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtUmVqZWN0Q2xvc2VBbmRDbG9zZWRQcm9taXNlSWZOZWVkZWQoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSkge1xuICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKTtcbiAgaWYgKHN0cmVhbS5fY2xvc2VSZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBhc3NlcnQoc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9PT0gdW5kZWZpbmVkKTtcblxuICAgIHN0cmVhbS5fY2xvc2VSZXF1ZXN0Ll9yZWplY3Qoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgc3RyZWFtLl9jbG9zZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gIGlmICh3cml0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVqZWN0KHdyaXRlciwgc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1VcGRhdGVCYWNrcHJlc3N1cmUoc3RyZWFtOiBXcml0YWJsZVN0cmVhbSwgYmFja3ByZXNzdXJlOiBib29sZWFuKSB7XG4gIGFzc2VydChzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnKTtcbiAgYXNzZXJ0KCFXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW0pKTtcblxuICBjb25zdCB3cml0ZXIgPSBzdHJlYW0uX3dyaXRlcjtcbiAgaWYgKHdyaXRlciAhPT0gdW5kZWZpbmVkICYmIGJhY2twcmVzc3VyZSAhPT0gc3RyZWFtLl9iYWNrcHJlc3N1cmUpIHtcbiAgICBpZiAoYmFja3ByZXNzdXJlKSB7XG4gICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzZXQod3JpdGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzZXJ0KCFiYWNrcHJlc3N1cmUpO1xuXG4gICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzb2x2ZSh3cml0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIHN0cmVhbS5fYmFja3ByZXNzdXJlID0gYmFja3ByZXNzdXJlO1xufVxuXG4vKipcbiAqIEEgZGVmYXVsdCB3cml0ZXIgdmVuZGVkIGJ5IGEge0BsaW5rIFdyaXRhYmxlU3RyZWFtfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjbGFzcyBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXI8VyA9IGFueT4ge1xuICAvKiogQGludGVybmFsICovXG4gIF9vd25lcldyaXRhYmxlU3RyZWFtOiBXcml0YWJsZVN0cmVhbTxXPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VkUHJvbWlzZSE6IFByb21pc2U8dW5kZWZpbmVkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VkUHJvbWlzZV9yZXNvbHZlPzogKHZhbHVlPzogdW5kZWZpbmVkKSA9PiB2b2lkO1xuICAvKiogQGludGVybmFsICovXG4gIF9jbG9zZWRQcm9taXNlX3JlamVjdD86IChyZWFzb246IGFueSkgPT4gdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvc2VkUHJvbWlzZVN0YXRlITogJ3BlbmRpbmcnIHwgJ3Jlc29sdmVkJyB8ICdyZWplY3RlZCc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWR5UHJvbWlzZSE6IFByb21pc2U8dW5kZWZpbmVkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVhZHlQcm9taXNlX3Jlc29sdmU/OiAodmFsdWU/OiB1bmRlZmluZWQpID0+IHZvaWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWR5UHJvbWlzZV9yZWplY3Q/OiAocmVhc29uOiBhbnkpID0+IHZvaWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWR5UHJvbWlzZVN0YXRlITogJ3BlbmRpbmcnIHwgJ2Z1bGZpbGxlZCcgfCAncmVqZWN0ZWQnO1xuXG4gIGNvbnN0cnVjdG9yKHN0cmVhbTogV3JpdGFibGVTdHJlYW08Vz4pIHtcbiAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KHN0cmVhbSwgMSwgJ1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcicpO1xuICAgIGFzc2VydFdyaXRhYmxlU3RyZWFtKHN0cmVhbSwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuXG4gICAgaWYgKElzV3JpdGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBzdHJlYW0gaGFzIGFscmVhZHkgYmVlbiBsb2NrZWQgZm9yIGV4Y2x1c2l2ZSB3cml0aW5nIGJ5IGFub3RoZXIgd3JpdGVyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fb3duZXJXcml0YWJsZVN0cmVhbSA9IHN0cmVhbTtcbiAgICBzdHJlYW0uX3dyaXRlciA9IHRoaXM7XG5cbiAgICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG5cbiAgICBpZiAoc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICAgIGlmICghV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSAmJiBzdHJlYW0uX2JhY2twcmVzc3VyZSkge1xuICAgICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZCh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh0aGlzLCBzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZSh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHRoaXMpO1xuICAgICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzZXJ0KHN0YXRlID09PSAnZXJyb3JlZCcpO1xuXG4gICAgICBjb25zdCBzdG9yZWRFcnJvciA9IHN0cmVhbS5fc3RvcmVkRXJyb3I7XG4gICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQodGhpcywgc3RvcmVkRXJyb3IpO1xuICAgICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh0aGlzLCBzdG9yZWRFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgc3RyZWFtIGJlY29tZXMgY2xvc2VkLCBvciByZWplY3RlZCBpZiB0aGUgc3RyZWFtIGV2ZXIgZXJyb3JzIG9yXG4gICAqIHRoZSB3cml0ZXJcdTIwMTlzIGxvY2sgaXMgcmVsZWFzZWQgYmVmb3JlIHRoZSBzdHJlYW0gZmluaXNoZXMgY2xvc2luZy5cbiAgICovXG4gIGdldCBjbG9zZWQoKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2VkJykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jbG9zZWRQcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlc2lyZWQgc2l6ZSB0byBmaWxsIHRoZSBzdHJlYW1cdTIwMTlzIGludGVybmFsIHF1ZXVlLiBJdCBjYW4gYmUgbmVnYXRpdmUsIGlmIHRoZSBxdWV1ZSBpcyBvdmVyLWZ1bGwuXG4gICAqIEEgcHJvZHVjZXIgY2FuIHVzZSB0aGlzIGluZm9ybWF0aW9uIHRvIGRldGVybWluZSB0aGUgcmlnaHQgYW1vdW50IG9mIGRhdGEgdG8gd3JpdGUuXG4gICAqXG4gICAqIEl0IHdpbGwgYmUgYG51bGxgIGlmIHRoZSBzdHJlYW0gY2Fubm90IGJlIHN1Y2Nlc3NmdWxseSB3cml0dGVuIHRvIChkdWUgdG8gZWl0aGVyIGJlaW5nIGVycm9yZWQsIG9yIGhhdmluZyBhbiBhYm9ydFxuICAgKiBxdWV1ZWQgdXApLiBJdCB3aWxsIHJldHVybiB6ZXJvIGlmIHRoZSBzdHJlYW0gaXMgY2xvc2VkLiBBbmQgdGhlIGdldHRlciB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBpbnZva2VkIHdoZW5cbiAgICogdGhlIHdyaXRlclx1MjAxOXMgbG9jayBpcyByZWxlYXNlZC5cbiAgICovXG4gIGdldCBkZXNpcmVkU2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZGVzaXJlZFNpemUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3duZXJXcml0YWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0V3JpdGVyTG9ja0V4Y2VwdGlvbignZGVzaXJlZFNpemUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyR2V0RGVzaXJlZFNpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlIGZ1bGZpbGxlZCB3aGVuIHRoZSBkZXNpcmVkIHNpemUgdG8gZmlsbCB0aGUgc3RyZWFtXHUyMDE5cyBpbnRlcm5hbCBxdWV1ZSB0cmFuc2l0aW9uc1xuICAgKiBmcm9tIG5vbi1wb3NpdGl2ZSB0byBwb3NpdGl2ZSwgc2lnbmFsaW5nIHRoYXQgaXQgaXMgbm8gbG9uZ2VyIGFwcGx5aW5nIGJhY2twcmVzc3VyZS4gT25jZSB0aGUgZGVzaXJlZCBzaXplIGRpcHNcbiAgICogYmFjayB0byB6ZXJvIG9yIGJlbG93LCB0aGUgZ2V0dGVyIHdpbGwgcmV0dXJuIGEgbmV3IHByb21pc2UgdGhhdCBzdGF5cyBwZW5kaW5nIHVudGlsIHRoZSBuZXh0IHRyYW5zaXRpb24uXG4gICAqXG4gICAqIElmIHRoZSBzdHJlYW0gYmVjb21lcyBlcnJvcmVkIG9yIGFib3J0ZWQsIG9yIHRoZSB3cml0ZXJcdTIwMTlzIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmVjb21lXG4gICAqIHJlamVjdGVkLlxuICAgKi9cbiAgZ2V0IHJlYWR5KCk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlYWR5JykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZWFkeVByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHJlYWRlciBpcyBhY3RpdmUsIGJlaGF2ZXMgdGhlIHNhbWUgYXMge0BsaW5rIFdyaXRhYmxlU3RyZWFtLmFib3J0IHwgc3RyZWFtLmFib3J0KHJlYXNvbil9LlxuICAgKi9cbiAgYWJvcnQocmVhc29uOiBhbnkgPSB1bmRlZmluZWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignYWJvcnQnKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24oJ2Fib3J0JykpO1xuICAgIH1cblxuICAgIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJBYm9ydCh0aGlzLCByZWFzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSByZWFkZXIgaXMgYWN0aXZlLCBiZWhhdmVzIHRoZSBzYW1lIGFzIHtAbGluayBXcml0YWJsZVN0cmVhbS5jbG9zZSB8IHN0cmVhbS5jbG9zZSgpfS5cbiAgICovXG4gIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjbG9zZScpKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuXG4gICAgaWYgKHN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyTG9ja0V4Y2VwdGlvbignY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgaWYgKFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjbG9zZSBhbiBhbHJlYWR5LWNsb3Npbmcgc3RyZWFtJykpO1xuICAgIH1cblxuICAgIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgd3JpdGVyXHUyMDE5cyBsb2NrIG9uIHRoZSBjb3JyZXNwb25kaW5nIHN0cmVhbS4gQWZ0ZXIgdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSB3cml0ZXIgaXMgbm8gbG9uZ2VyIGFjdGl2ZS5cbiAgICogSWYgdGhlIGFzc29jaWF0ZWQgc3RyZWFtIGlzIGVycm9yZWQgd2hlbiB0aGUgbG9jayBpcyByZWxlYXNlZCwgdGhlIHdyaXRlciB3aWxsIGFwcGVhciBlcnJvcmVkIGluIHRoZSBzYW1lIHdheSBmcm9tXG4gICAqIG5vdyBvbjsgb3RoZXJ3aXNlLCB0aGUgd3JpdGVyIHdpbGwgYXBwZWFyIGNsb3NlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSBsb2NrIGNhbiBzdGlsbCBiZSByZWxlYXNlZCBldmVuIGlmIHNvbWUgb25nb2luZyB3cml0ZXMgaGF2ZSBub3QgeWV0IGZpbmlzaGVkIChpLmUuIGV2ZW4gaWYgdGhlXG4gICAqIHByb21pc2VzIHJldHVybmVkIGZyb20gcHJldmlvdXMgY2FsbHMgdG8ge0BsaW5rIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlci53cml0ZSB8IHdyaXRlKCl9IGhhdmUgbm90IHlldCBzZXR0bGVkKS5cbiAgICogSXRcdTIwMTlzIG5vdCBuZWNlc3NhcnkgdG8gaG9sZCB0aGUgbG9jayBvbiB0aGUgd3JpdGVyIGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIHdyaXRlOyB0aGUgbG9jayBpbnN0ZWFkIHNpbXBseSBwcmV2ZW50c1xuICAgKiBvdGhlciBwcm9kdWNlcnMgZnJvbSB3cml0aW5nIGluIGFuIGludGVybGVhdmVkIG1hbm5lci5cbiAgICovXG4gIHJlbGVhc2VMb2NrKCk6IHZvaWQge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIodGhpcykpIHtcbiAgICAgIHRocm93IGRlZmF1bHRXcml0ZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdyZWxlYXNlTG9jaycpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW07XG5cbiAgICBpZiAoc3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhc3NlcnQoc3RyZWFtLl93cml0ZXIgIT09IHVuZGVmaW5lZCk7XG5cbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJSZWxlYXNlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyB0aGUgZ2l2ZW4gY2h1bmsgdG8gdGhlIHdyaXRhYmxlIHN0cmVhbSwgYnkgd2FpdGluZyB1bnRpbCBhbnkgcHJldmlvdXMgd3JpdGVzIGhhdmUgZmluaXNoZWQgc3VjY2Vzc2Z1bGx5LFxuICAgKiBhbmQgdGhlbiBzZW5kaW5nIHRoZSBjaHVuayB0byB0aGUgdW5kZXJseWluZyBzaW5rJ3Mge0BsaW5rIFVuZGVybHlpbmdTaW5rLndyaXRlIHwgd3JpdGUoKX0gbWV0aG9kLiBJdCB3aWxsIHJldHVyblxuICAgKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aXRoIHVuZGVmaW5lZCB1cG9uIGEgc3VjY2Vzc2Z1bCB3cml0ZSwgb3IgcmVqZWN0cyBpZiB0aGUgd3JpdGUgZmFpbHMgb3Igc3RyZWFtIGJlY29tZXNcbiAgICogZXJyb3JlZCBiZWZvcmUgdGhlIHdyaXRpbmcgcHJvY2VzcyBpcyBpbml0aWF0ZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGF0IFwic3VjY2Vzc1wiIG1lYW5zIGlzIHVwIHRvIHRoZSB1bmRlcmx5aW5nIHNpbms7IGl0IG1pZ2h0IGluZGljYXRlIHNpbXBseSB0aGF0IHRoZSBjaHVuayBoYXMgYmVlblxuICAgKiBhY2NlcHRlZCwgYW5kIG5vdCBuZWNlc3NhcmlseSB0aGF0IGl0IGlzIHNhZmVseSBzYXZlZCB0byBpdHMgdWx0aW1hdGUgZGVzdGluYXRpb24uXG4gICAqL1xuICB3cml0ZShjaHVuazogVyk6IFByb21pc2U8dm9pZD47XG4gIHdyaXRlKGNodW5rOiBXID0gdW5kZWZpbmVkISk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJCcmFuZENoZWNrRXhjZXB0aW9uKCd3cml0ZScpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3duZXJXcml0YWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyTG9ja0V4Y2VwdGlvbignd3JpdGUgdG8nKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcldyaXRlKHRoaXMsIGNodW5rKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIucHJvdG90eXBlLCB7XG4gIGFib3J0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgY2xvc2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICByZWxlYXNlTG9jazogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHdyaXRlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgY2xvc2VkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgZGVzaXJlZFNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICByZWFkeTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcicsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLlxuXG5mdW5jdGlvbiBJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcjxXID0gYW55Pih4OiBhbnkpOiB4IGlzIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcjxXPiB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19vd25lcldyaXRhYmxlU3RyZWFtJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcjtcbn1cblxuLy8gQSBjbGllbnQgb2YgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyIG1heSB1c2UgdGhlc2UgZnVuY3Rpb25zIGRpcmVjdGx5IHRvIGJ5cGFzcyBzdGF0ZSBjaGVjay5cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyQWJvcnQod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIsIHJlYXNvbjogYW55KSB7XG4gIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcblxuICBhc3NlcnQoc3RyZWFtICE9PSB1bmRlZmluZWQpO1xuXG4gIHJldHVybiBXcml0YWJsZVN0cmVhbUFib3J0KHN0cmVhbSwgcmVhc29uKTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyQ2xvc2Uod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICBjb25zdCBzdHJlYW0gPSB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW07XG5cbiAgYXNzZXJ0KHN0cmVhbSAhPT0gdW5kZWZpbmVkKTtcblxuICByZXR1cm4gV3JpdGFibGVTdHJlYW1DbG9zZShzdHJlYW0pO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZVdpdGhFcnJvclByb3BhZ2F0aW9uKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgY29uc3Qgc3RyZWFtID0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuXG4gIGFzc2VydChzdHJlYW0gIT09IHVuZGVmaW5lZCk7XG5cbiAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuICBpZiAoV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSB8fCBzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICB9XG5cbiAgaWYgKHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgfVxuXG4gIGFzc2VydChzdGF0ZSA9PT0gJ3dyaXRhYmxlJyB8fCBzdGF0ZSA9PT0gJ2Vycm9yaW5nJyk7XG5cbiAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlKHdyaXRlcik7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckVuc3VyZUNsb3NlZFByb21pc2VSZWplY3RlZCh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlciwgZXJyb3I6IGFueSkge1xuICBpZiAod3JpdGVyLl9jbG9zZWRQcm9taXNlU3RhdGUgPT09ICdwZW5kaW5nJykge1xuICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVqZWN0KHdyaXRlciwgZXJyb3IpO1xuICB9IGVsc2Uge1xuICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVzZXRUb1JlamVjdGVkKHdyaXRlciwgZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckVuc3VyZVJlYWR5UHJvbWlzZVJlamVjdGVkKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLCBlcnJvcjogYW55KSB7XG4gIGlmICh3cml0ZXIuX3JlYWR5UHJvbWlzZVN0YXRlID09PSAncGVuZGluZycpIHtcbiAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVqZWN0KHdyaXRlciwgZXJyb3IpO1xuICB9IGVsc2Uge1xuICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNldFRvUmVqZWN0ZWQod3JpdGVyLCBlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyR2V0RGVzaXJlZFNpemUod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIpOiBudW1iZXIgfCBudWxsIHtcbiAgY29uc3Qgc3RyZWFtID0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG5cbiAgaWYgKHN0YXRlID09PSAnZXJyb3JlZCcgfHwgc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUoc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJSZWxlYXNlKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKSB7XG4gIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgYXNzZXJ0KHN0cmVhbSAhPT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHN0cmVhbS5fd3JpdGVyID09PSB3cml0ZXIpO1xuXG4gIGNvbnN0IHJlbGVhc2VkRXJyb3IgPSBuZXcgVHlwZUVycm9yKFxuICAgIGBXcml0ZXIgd2FzIHJlbGVhc2VkIGFuZCBjYW4gbm8gbG9uZ2VyIGJlIHVzZWQgdG8gbW9uaXRvciB0aGUgc3RyZWFtJ3MgY2xvc2VkbmVzc2ApO1xuXG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckVuc3VyZVJlYWR5UHJvbWlzZVJlamVjdGVkKHdyaXRlciwgcmVsZWFzZWRFcnJvcik7XG5cbiAgLy8gVGhlIHN0YXRlIHRyYW5zaXRpb25zIHRvIFwiZXJyb3JlZFwiIGJlZm9yZSB0aGUgc2luayBhYm9ydCgpIG1ldGhvZCBydW5zLCBidXQgdGhlIHdyaXRlci5jbG9zZWQgcHJvbWlzZSBpcyBub3RcbiAgLy8gcmVqZWN0ZWQgdW50aWwgYWZ0ZXJ3YXJkcy4gVGhpcyBtZWFucyB0aGF0IHNpbXBseSB0ZXN0aW5nIHN0YXRlIHdpbGwgbm90IHdvcmsuXG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckVuc3VyZUNsb3NlZFByb21pc2VSZWplY3RlZCh3cml0ZXIsIHJlbGVhc2VkRXJyb3IpO1xuXG4gIHN0cmVhbS5fd3JpdGVyID0gdW5kZWZpbmVkO1xuICB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW0gPSB1bmRlZmluZWQhO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJXcml0ZTxXPih3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcjxXPiwgY2h1bms6IFcpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICBjb25zdCBzdHJlYW0gPSB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW07XG5cbiAgYXNzZXJ0KHN0cmVhbSAhPT0gdW5kZWZpbmVkKTtcblxuICBjb25zdCBjb250cm9sbGVyID0gc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXI7XG5cbiAgY29uc3QgY2h1bmtTaXplID0gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldENodW5rU2l6ZShjb250cm9sbGVyLCBjaHVuayk7XG5cbiAgaWYgKHN0cmVhbSAhPT0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtKSB7XG4gICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24oJ3dyaXRlIHRvJykpO1xuICB9XG5cbiAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuICBpZiAoc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICB9XG4gIGlmIChXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW0pIHx8IHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ1RoZSBzdHJlYW0gaXMgY2xvc2luZyBvciBjbG9zZWQgYW5kIGNhbm5vdCBiZSB3cml0dGVuIHRvJykpO1xuICB9XG4gIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICB9XG5cbiAgYXNzZXJ0KHN0YXRlID09PSAnd3JpdGFibGUnKTtcblxuICBjb25zdCBwcm9taXNlID0gV3JpdGFibGVTdHJlYW1BZGRXcml0ZVJlcXVlc3Qoc3RyZWFtKTtcblxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyV3JpdGUoY29udHJvbGxlciwgY2h1bmssIGNodW5rU2l6ZSk7XG5cbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmNvbnN0IGNsb3NlU2VudGluZWw6IHVuaXF1ZSBzeW1ib2wgPSB7fSBhcyBhbnk7XG5cbnR5cGUgUXVldWVSZWNvcmQ8Vz4gPSBXIHwgdHlwZW9mIGNsb3NlU2VudGluZWw7XG5cbi8qKlxuICogQWxsb3dzIGNvbnRyb2wgb2YgYSB7QGxpbmsgV3JpdGFibGVTdHJlYW0gfCB3cml0YWJsZSBzdHJlYW19J3Mgc3RhdGUgYW5kIGludGVybmFsIHF1ZXVlLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNsYXNzIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8VyA9IGFueT4ge1xuICAvKiogQGludGVybmFsICovXG4gIF9jb250cm9sbGVkV3JpdGFibGVTdHJlYW0hOiBXcml0YWJsZVN0cmVhbTxXPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcXVldWUhOiBTaW1wbGVRdWV1ZTxRdWV1ZVBhaXI8UXVldWVSZWNvcmQ8Vz4+PjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcXVldWVUb3RhbFNpemUhOiBudW1iZXI7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Fib3J0UmVhc29uOiBhbnk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Fib3J0Q29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF9zdGFydGVkITogYm9vbGVhbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RyYXRlZ3lTaXplQWxnb3JpdGhtITogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPFc+O1xuICAvKiogQGludGVybmFsICovXG4gIF9zdHJhdGVneUhXTSE6IG51bWJlcjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfd3JpdGVBbGdvcml0aG0hOiAoY2h1bms6IFcpID0+IFByb21pc2U8dm9pZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlQWxnb3JpdGhtITogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYWJvcnRBbGdvcml0aG0hOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIGNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJlYXNvbiB3aGljaCB3YXMgcGFzc2VkIHRvIGBXcml0YWJsZVN0cmVhbS5hYm9ydChyZWFzb24pYCB3aGVuIHRoZSBzdHJlYW0gd2FzIGFib3J0ZWQuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkXG4gICAqICBUaGlzIHByb3BlcnR5IGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgc3BlY2lmaWNhdGlvbiwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93aGF0d2cvc3RyZWFtcy9wdWxsLzExNzcuXG4gICAqICBVc2Uge0BsaW5rIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIuc2lnbmFsfSdzIGByZWFzb25gIGluc3RlYWQuXG4gICAqL1xuICBnZXQgYWJvcnRSZWFzb24oKTogYW55IHtcbiAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdhYm9ydFJlYXNvbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYWJvcnRSZWFzb247XG4gIH1cblxuICAvKipcbiAgICogQW4gYEFib3J0U2lnbmFsYCB0aGF0IGNhbiBiZSB1c2VkIHRvIGFib3J0IHRoZSBwZW5kaW5nIHdyaXRlIG9yIGNsb3NlIG9wZXJhdGlvbiB3aGVuIHRoZSBzdHJlYW0gaXMgYWJvcnRlZC5cbiAgICovXG4gIGdldCBzaWduYWwoKTogQWJvcnRTaWduYWwge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3NpZ25hbCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYWJvcnRDb250cm9sbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIE9sZGVyIGJyb3dzZXJzIG9yIG9sZGVyIE5vZGUgdmVyc2lvbnMgbWF5IG5vdCBzdXBwb3J0IGBBYm9ydENvbnRyb2xsZXJgIG9yIGBBYm9ydFNpZ25hbGAuXG4gICAgICAvLyBXZSBkb24ndCB3YW50IHRvIGJ1bmRsZSBhbmQgc2hpcCBhbiBgQWJvcnRDb250cm9sbGVyYCBwb2x5ZmlsbCB0b2dldGhlciB3aXRoIG91ciBwb2x5ZmlsbCxcbiAgICAgIC8vIHNvIGluc3RlYWQgd2Ugb25seSBpbXBsZW1lbnQgc3VwcG9ydCBmb3IgYHNpZ25hbGAgaWYgd2UgZmluZCBhIGdsb2JhbCBgQWJvcnRDb250cm9sbGVyYCBjb25zdHJ1Y3Rvci5cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLnNpZ25hbCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hYm9ydENvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgY29udHJvbGxlZCB3cml0YWJsZSBzdHJlYW0sIG1ha2luZyBhbGwgZnV0dXJlIGludGVyYWN0aW9ucyB3aXRoIGl0IGZhaWwgd2l0aCB0aGUgZ2l2ZW4gZXJyb3IgYGVgLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyByYXJlbHkgdXNlZCwgc2luY2UgdXN1YWxseSBpdCBzdWZmaWNlcyB0byByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlIGZyb20gb25lIG9mIHRoZSB1bmRlcmx5aW5nXG4gICAqIHNpbmsncyBtZXRob2RzLiBIb3dldmVyLCBpdCBjYW4gYmUgdXNlZnVsIGZvciBzdWRkZW5seSBzaHV0dGluZyBkb3duIGEgc3RyZWFtIGluIHJlc3BvbnNlIHRvIGFuIGV2ZW50IG91dHNpZGUgdGhlXG4gICAqIG5vcm1hbCBsaWZlY3ljbGUgb2YgaW50ZXJhY3Rpb25zIHdpdGggdGhlIHVuZGVybHlpbmcgc2luay5cbiAgICovXG4gIGVycm9yKGU6IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Vycm9yJyk7XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgIT09ICd3cml0YWJsZScpIHtcbiAgICAgIC8vIFRoZSBzdHJlYW0gaXMgY2xvc2VkLCBlcnJvcmVkIG9yIHdpbGwgYmUgc29vbi4gVGhlIHNpbmsgY2FuJ3QgZG8gYW55dGhpbmcgdXNlZnVsIGlmIGl0IGdldHMgYW4gZXJyb3IgaGVyZSwgc29cbiAgICAgIC8vIGp1c3QgdHJlYXQgaXQgYXMgYSBuby1vcC5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IodGhpcywgZSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIFtBYm9ydFN0ZXBzXShyZWFzb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2Fib3J0QWxnb3JpdGhtKHJlYXNvbik7XG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyh0aGlzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBbRXJyb3JTdGVwc10oKSB7XG4gICAgUmVzZXRRdWV1ZSh0aGlzKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSwge1xuICBhYm9ydFJlYXNvbjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHNpZ25hbDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGVycm9yOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXInLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBpbXBsZW1lbnRpbmcgaW50ZXJmYWNlIHJlcXVpcmVkIGJ5IHRoZSBXcml0YWJsZVN0cmVhbS5cblxuZnVuY3Rpb24gSXNXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHg6IGFueSk6IHggaXMgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+IHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbScpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyO1xufVxuXG5mdW5jdGlvbiBTZXRVcFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Vz4oc3RyZWFtOiBXcml0YWJsZVN0cmVhbTxXPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFc+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QWxnb3JpdGhtOiAoKSA9PiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVBbGdvcml0aG06IChjaHVuazogVykgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydEFsZ29yaXRobTogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hXYXRlck1hcms6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplQWxnb3JpdGhtOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8Vz4pIHtcbiAgYXNzZXJ0KElzV3JpdGFibGVTdHJlYW0oc3RyZWFtKSk7XG4gIGFzc2VydChzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlciA9PT0gdW5kZWZpbmVkKTtcblxuICBjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW0gPSBzdHJlYW07XG4gIHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyID0gY29udHJvbGxlcjtcblxuICAvLyBOZWVkIHRvIHNldCB0aGUgc2xvdHMgc28gdGhhdCB0aGUgYXNzZXJ0IGRvZXNuJ3QgZmlyZS4gSW4gdGhlIHNwZWMgdGhlIHNsb3RzIGFscmVhZHkgZXhpc3QgaW1wbGljaXRseS5cbiAgY29udHJvbGxlci5fcXVldWUgPSB1bmRlZmluZWQhO1xuICBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9IHVuZGVmaW5lZCE7XG4gIFJlc2V0UXVldWUoY29udHJvbGxlcik7XG5cbiAgY29udHJvbGxlci5fYWJvcnRSZWFzb24gPSB1bmRlZmluZWQ7XG4gIGNvbnRyb2xsZXIuX2Fib3J0Q29udHJvbGxlciA9IGNyZWF0ZUFib3J0Q29udHJvbGxlcigpO1xuICBjb250cm9sbGVyLl9zdGFydGVkID0gZmFsc2U7XG5cbiAgY29udHJvbGxlci5fc3RyYXRlZ3lTaXplQWxnb3JpdGhtID0gc2l6ZUFsZ29yaXRobTtcbiAgY29udHJvbGxlci5fc3RyYXRlZ3lIV00gPSBoaWdoV2F0ZXJNYXJrO1xuXG4gIGNvbnRyb2xsZXIuX3dyaXRlQWxnb3JpdGhtID0gd3JpdGVBbGdvcml0aG07XG4gIGNvbnRyb2xsZXIuX2Nsb3NlQWxnb3JpdGhtID0gY2xvc2VBbGdvcml0aG07XG4gIGNvbnRyb2xsZXIuX2Fib3J0QWxnb3JpdGhtID0gYWJvcnRBbGdvcml0aG07XG5cbiAgY29uc3QgYmFja3ByZXNzdXJlID0gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldEJhY2twcmVzc3VyZShjb250cm9sbGVyKTtcbiAgV3JpdGFibGVTdHJlYW1VcGRhdGVCYWNrcHJlc3N1cmUoc3RyZWFtLCBiYWNrcHJlc3N1cmUpO1xuXG4gIGNvbnN0IHN0YXJ0UmVzdWx0ID0gc3RhcnRBbGdvcml0aG0oKTtcbiAgY29uc3Qgc3RhcnRQcm9taXNlID0gcHJvbWlzZVJlc29sdmVkV2l0aChzdGFydFJlc3VsdCk7XG4gIHVwb25Qcm9taXNlKFxuICAgIHN0YXJ0UHJvbWlzZSxcbiAgICAoKSA9PiB7XG4gICAgICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyB8fCBzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JpbmcnKTtcbiAgICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckFkdmFuY2VRdWV1ZUlmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgIH0sXG4gICAgciA9PiB7XG4gICAgICBhc3NlcnQoc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyB8fCBzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JpbmcnKTtcbiAgICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgV3JpdGFibGVTdHJlYW1EZWFsV2l0aFJlamVjdGlvbihzdHJlYW0sIHIpO1xuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRnJvbVVuZGVybHlpbmdTaW5rPFc+KHN0cmVhbTogV3JpdGFibGVTdHJlYW08Vz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJseWluZ1Npbms6IFZhbGlkYXRlZFVuZGVybHlpbmdTaW5rPFc+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hXYXRlck1hcms6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplQWxnb3JpdGhtOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8Vz4pIHtcbiAgY29uc3QgY29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUpO1xuXG4gIGxldCBzdGFydEFsZ29yaXRobTogKCkgPT4gdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+ID0gKCkgPT4gdW5kZWZpbmVkO1xuICBsZXQgd3JpdGVBbGdvcml0aG06IChjaHVuazogVykgPT4gUHJvbWlzZTx2b2lkPiA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgbGV0IGNsb3NlQWxnb3JpdGhtOiAoKSA9PiBQcm9taXNlPHZvaWQ+ID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICBsZXQgYWJvcnRBbGdvcml0aG06IChyZWFzb246IGFueSkgPT4gUHJvbWlzZTx2b2lkPiA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcblxuICBpZiAodW5kZXJseWluZ1Npbmsuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0QWxnb3JpdGhtID0gKCkgPT4gdW5kZXJseWluZ1Npbmsuc3RhcnQhKGNvbnRyb2xsZXIpO1xuICB9XG4gIGlmICh1bmRlcmx5aW5nU2luay53cml0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgd3JpdGVBbGdvcml0aG0gPSBjaHVuayA9PiB1bmRlcmx5aW5nU2luay53cml0ZSEoY2h1bmssIGNvbnRyb2xsZXIpO1xuICB9XG4gIGlmICh1bmRlcmx5aW5nU2luay5jbG9zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvc2VBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nU2luay5jbG9zZSEoKTtcbiAgfVxuICBpZiAodW5kZXJseWluZ1NpbmsuYWJvcnQgIT09IHVuZGVmaW5lZCkge1xuICAgIGFib3J0QWxnb3JpdGhtID0gcmVhc29uID0+IHVuZGVybHlpbmdTaW5rLmFib3J0IShyZWFzb24pO1xuICB9XG5cbiAgU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKFxuICAgIHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHdyaXRlQWxnb3JpdGhtLCBjbG9zZUFsZ29yaXRobSwgYWJvcnRBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG1cbiAgKTtcbn1cblxuLy8gQ2xlYXJBbGdvcml0aG1zIG1heSBiZSBjYWxsZWQgdHdpY2UuIEVycm9yaW5nIHRoZSBzYW1lIHN0cmVhbSBpbiBtdWx0aXBsZSB3YXlzIHdpbGwgb2Z0ZW4gcmVzdWx0IGluIHJlZHVuZGFudCBjYWxscy5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+KSB7XG4gIGNvbnRyb2xsZXIuX3dyaXRlQWxnb3JpdGhtID0gdW5kZWZpbmVkITtcbiAgY29udHJvbGxlci5fY2xvc2VBbGdvcml0aG0gPSB1bmRlZmluZWQhO1xuICBjb250cm9sbGVyLl9hYm9ydEFsZ29yaXRobSA9IHVuZGVmaW5lZCE7XG4gIGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobSA9IHVuZGVmaW5lZCE7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZTxXPihjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFc+KSB7XG4gIEVucXVldWVWYWx1ZVdpdGhTaXplKGNvbnRyb2xsZXIsIGNsb3NlU2VudGluZWwsIDApO1xuICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQWR2YW5jZVF1ZXVlSWZOZWVkZWQoY29udHJvbGxlcik7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRDaHVua1NpemU8Vz4oY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxXPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2h1bms6IFcpOiBudW1iZXIge1xuICB0cnkge1xuICAgIHJldHVybiBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0oY2h1bmspO1xuICB9IGNhdGNoIChjaHVua1NpemVFKSB7XG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9ySWZOZWVkZWQoY29udHJvbGxlciwgY2h1bmtTaXplRSk7XG4gICAgcmV0dXJuIDE7XG4gIH1cbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55Pik6IG51bWJlciB7XG4gIHJldHVybiBjb250cm9sbGVyLl9zdHJhdGVneUhXTSAtIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplO1xufVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyV3JpdGU8Vz4oY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxXPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHVuazogVyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHVua1NpemU6IG51bWJlcikge1xuICB0cnkge1xuICAgIEVucXVldWVWYWx1ZVdpdGhTaXplKGNvbnRyb2xsZXIsIGNodW5rLCBjaHVua1NpemUpO1xuICB9IGNhdGNoIChlbnF1ZXVlRSkge1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkKGNvbnRyb2xsZXIsIGVucXVldWVFKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW07XG4gIGlmICghV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSAmJiBzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgY29uc3QgYmFja3ByZXNzdXJlID0gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldEJhY2twcmVzc3VyZShjb250cm9sbGVyKTtcbiAgICBXcml0YWJsZVN0cmVhbVVwZGF0ZUJhY2twcmVzc3VyZShzdHJlYW0sIGJhY2twcmVzc3VyZSk7XG4gIH1cblxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQWR2YW5jZVF1ZXVlSWZOZWVkZWQoY29udHJvbGxlcik7XG59XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLlxuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQWR2YW5jZVF1ZXVlSWZOZWVkZWQ8Vz4oY29udHJvbGxlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxXPikge1xuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW07XG5cbiAgaWYgKCFjb250cm9sbGVyLl9zdGFydGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgYXNzZXJ0KHN0YXRlICE9PSAnY2xvc2VkJyAmJiBzdGF0ZSAhPT0gJ2Vycm9yZWQnKTtcbiAgaWYgKHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgV3JpdGFibGVTdHJlYW1GaW5pc2hFcnJvcmluZyhzdHJlYW0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb250cm9sbGVyLl9xdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB2YWx1ZSA9IFBlZWtRdWV1ZVZhbHVlKGNvbnRyb2xsZXIpO1xuICBpZiAodmFsdWUgPT09IGNsb3NlU2VudGluZWwpIHtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyUHJvY2Vzc0Nsb3NlKGNvbnRyb2xsZXIpO1xuICB9IGVsc2Uge1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQcm9jZXNzV3JpdGUoY29udHJvbGxlciwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkKGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55PiwgZXJyb3I6IGFueSkge1xuICBpZiAoY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclByb2Nlc3NDbG9zZShjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT4pIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuXG4gIFdyaXRhYmxlU3RyZWFtTWFya0Nsb3NlUmVxdWVzdEluRmxpZ2h0KHN0cmVhbSk7XG5cbiAgRGVxdWV1ZVZhbHVlKGNvbnRyb2xsZXIpO1xuICBhc3NlcnQoY29udHJvbGxlci5fcXVldWUubGVuZ3RoID09PSAwKTtcblxuICBjb25zdCBzaW5rQ2xvc2VQcm9taXNlID0gY29udHJvbGxlci5fY2xvc2VBbGdvcml0aG0oKTtcbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgdXBvblByb21pc2UoXG4gICAgc2lua0Nsb3NlUHJvbWlzZSxcbiAgICAoKSA9PiB7XG4gICAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0Q2xvc2Uoc3RyZWFtKTtcbiAgICB9LFxuICAgIHJlYXNvbiA9PiB7XG4gICAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0Q2xvc2VXaXRoRXJyb3Ioc3RyZWFtLCByZWFzb24pO1xuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclByb2Nlc3NXcml0ZTxXPihjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFc+LCBjaHVuazogVykge1xuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW07XG5cbiAgV3JpdGFibGVTdHJlYW1NYXJrRmlyc3RXcml0ZVJlcXVlc3RJbkZsaWdodChzdHJlYW0pO1xuXG4gIGNvbnN0IHNpbmtXcml0ZVByb21pc2UgPSBjb250cm9sbGVyLl93cml0ZUFsZ29yaXRobShjaHVuayk7XG4gIHVwb25Qcm9taXNlKFxuICAgIHNpbmtXcml0ZVByb21pc2UsXG4gICAgKCkgPT4ge1xuICAgICAgV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodFdyaXRlKHN0cmVhbSk7XG5cbiAgICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICAgIGFzc2VydChzdGF0ZSA9PT0gJ3dyaXRhYmxlJyB8fCBzdGF0ZSA9PT0gJ2Vycm9yaW5nJyk7XG5cbiAgICAgIERlcXVldWVWYWx1ZShjb250cm9sbGVyKTtcblxuICAgICAgaWYgKCFXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW0pICYmIHN0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgIGNvbnN0IGJhY2twcmVzc3VyZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRCYWNrcHJlc3N1cmUoY29udHJvbGxlcik7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtVXBkYXRlQmFja3ByZXNzdXJlKHN0cmVhbSwgYmFja3ByZXNzdXJlKTtcbiAgICAgIH1cblxuICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckFkdmFuY2VRdWV1ZUlmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgIH0sXG4gICAgcmVhc29uID0+IHtcbiAgICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gICAgICB9XG4gICAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0V3JpdGVXaXRoRXJyb3Ioc3RyZWFtLCByZWFzb24pO1xuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldEJhY2twcmVzc3VyZShjb250cm9sbGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT4pOiBib29sZWFuIHtcbiAgY29uc3QgZGVzaXJlZFNpemUgPSBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUoY29udHJvbGxlcik7XG4gIHJldHVybiBkZXNpcmVkU2l6ZSA8PSAwO1xufVxuXG4vLyBBIGNsaWVudCBvZiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyIG1heSB1c2UgdGhlc2UgZnVuY3Rpb25zIGRpcmVjdGx5IHRvIGJ5cGFzcyBzdGF0ZSBjaGVjay5cblxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55PiwgZXJyb3I6IGFueSkge1xuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW07XG5cbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICd3cml0YWJsZScpO1xuXG4gIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gIFdyaXRhYmxlU3RyZWFtU3RhcnRFcnJvcmluZyhzdHJlYW0sIGVycm9yKTtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtLlxuXG5mdW5jdGlvbiBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKGBXcml0YWJsZVN0cmVhbS5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgV3JpdGFibGVTdHJlYW1gKTtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIuXG5cbmZ1bmN0aW9uIGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcbiAgICBgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcmApO1xufVxuXG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIuXG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFxuICAgIGBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcmApO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyTG9ja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcignQ2Fubm90ICcgKyBuYW1lICsgJyBhIHN0cmVhbSB1c2luZyBhIHJlbGVhc2VkIHdyaXRlcicpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIpIHtcbiAgd3JpdGVyLl9jbG9zZWRQcm9taXNlID0gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPSByZWplY3Q7XG4gICAgd3JpdGVyLl9jbG9zZWRQcm9taXNlU3RhdGUgPSAncGVuZGluZyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLCByZWFzb246IGFueSkge1xuICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUod3JpdGVyKTtcbiAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZWplY3Qod3JpdGVyLCByZWFzb24pO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKSB7XG4gIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xuICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUod3JpdGVyKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZWplY3Qod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIsIHJlYXNvbjogYW55KSB7XG4gIGlmICh3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgYXNzZXJ0KHdyaXRlci5fY2xvc2VkUHJvbWlzZVN0YXRlID09PSAncGVuZGluZycpO1xuXG4gIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUod3JpdGVyLl9jbG9zZWRQcm9taXNlKTtcbiAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdChyZWFzb24pO1xuICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbiAgd3JpdGVyLl9jbG9zZWRQcm9taXNlU3RhdGUgPSAncmVqZWN0ZWQnO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlc2V0VG9SZWplY3RlZCh3cml0ZXI6IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlciwgcmVhc29uOiBhbnkpIHtcbiAgYXNzZXJ0KHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpO1xuICBhc3NlcnQod3JpdGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9PT0gdW5kZWZpbmVkKTtcbiAgYXNzZXJ0KHdyaXRlci5fY2xvc2VkUHJvbWlzZVN0YXRlICE9PSAncGVuZGluZycpO1xuXG4gIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQod3JpdGVyLCByZWFzb24pO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIpIHtcbiAgaWYgKHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgYXNzZXJ0KHdyaXRlci5fY2xvc2VkUHJvbWlzZVN0YXRlID09PSAncGVuZGluZycpO1xuXG4gIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlKHVuZGVmaW5lZCk7XG4gIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gdW5kZWZpbmVkO1xuICB3cml0ZXIuX2Nsb3NlZFByb21pc2VTdGF0ZSA9ICdyZXNvbHZlZCc7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKSB7XG4gIHdyaXRlci5fcmVhZHlQcm9taXNlID0gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0ID0gcmVqZWN0O1xuICB9KTtcbiAgd3JpdGVyLl9yZWFkeVByb21pc2VTdGF0ZSA9ICdwZW5kaW5nJztcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLCByZWFzb246IGFueSkge1xuICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xuICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVqZWN0KHdyaXRlciwgcmVhc29uKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKSB7XG4gIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplKHdyaXRlcik7XG4gIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNvbHZlKHdyaXRlcik7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZWplY3Qod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIsIHJlYXNvbjogYW55KSB7XG4gIGlmICh3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZWplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUod3JpdGVyLl9yZWFkeVByb21pc2UpO1xuICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZWplY3QocmVhc29uKTtcbiAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0ID0gdW5kZWZpbmVkO1xuICB3cml0ZXIuX3JlYWR5UHJvbWlzZVN0YXRlID0gJ3JlamVjdGVkJztcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlc2V0KHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKSB7XG4gIGFzc2VydCh3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpO1xuICBhc3NlcnQod3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0ID09PSB1bmRlZmluZWQpO1xuXG4gIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplKHdyaXRlcik7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNldFRvUmVqZWN0ZWQod3JpdGVyOiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIsIHJlYXNvbjogYW55KSB7XG4gIGFzc2VydCh3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpO1xuICBhc3NlcnQod3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0ID09PSB1bmRlZmluZWQpO1xuXG4gIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh3cml0ZXIsIHJlYXNvbik7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNvbHZlKHdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKSB7XG4gIGlmICh3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZXNvbHZlKHVuZGVmaW5lZCk7XG4gIHdyaXRlci5fcmVhZHlQcm9taXNlX3Jlc29sdmUgPSB1bmRlZmluZWQ7XG4gIHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbiAgd3JpdGVyLl9yZWFkeVByb21pc2VTdGF0ZSA9ICdmdWxmaWxsZWQnO1xufVxuIiwgIi8vLyA8cmVmZXJlbmNlIGxpYj1cImRvbVwiIC8+XG5leHBvcnQgY29uc3QgTmF0aXZlRE9NRXhjZXB0aW9uOiB0eXBlb2YgRE9NRXhjZXB0aW9uIHwgdW5kZWZpbmVkID1cbiAgdHlwZW9mIERPTUV4Y2VwdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyBET01FeGNlcHRpb24gOiB1bmRlZmluZWQ7XG4iLCAiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJub2RlXCIgLz5cbmltcG9ydCB7IE5hdGl2ZURPTUV4Y2VwdGlvbiB9IGZyb20gJy4vbmF0aXZlJztcblxuZGVjbGFyZSBjbGFzcyBET01FeGNlcHRpb25DbGFzcyBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZT86IHN0cmluZywgbmFtZT86IHN0cmluZyk7XG5cbiAgbmFtZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbnR5cGUgRE9NRXhjZXB0aW9uID0gRE9NRXhjZXB0aW9uQ2xhc3M7XG50eXBlIERPTUV4Y2VwdGlvbkNvbnN0cnVjdG9yID0gdHlwZW9mIERPTUV4Y2VwdGlvbkNsYXNzO1xuXG5mdW5jdGlvbiBpc0RPTUV4Y2VwdGlvbkNvbnN0cnVjdG9yKGN0b3I6IHVua25vd24pOiBjdG9yIGlzIERPTUV4Y2VwdGlvbkNvbnN0cnVjdG9yIHtcbiAgaWYgKCEodHlwZW9mIGN0b3IgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGN0b3IgPT09ICdvYmplY3QnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB0cnkge1xuICAgIG5ldyAoY3RvciBhcyBET01FeGNlcHRpb25Db25zdHJ1Y3RvcikoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURPTUV4Y2VwdGlvblBvbHlmaWxsKCk6IERPTUV4Y2VwdGlvbkNvbnN0cnVjdG9yIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICBjb25zdCBjdG9yID0gZnVuY3Rpb24gRE9NRXhjZXB0aW9uKHRoaXM6IERPTUV4Y2VwdGlvbiwgbWVzc2FnZT86IHN0cmluZywgbmFtZT86IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJyc7XG4gICAgdGhpcy5uYW1lID0gbmFtZSB8fCAnRXJyb3InO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICB9IGFzIGFueTtcbiAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdG9yLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgeyB2YWx1ZTogY3Rvciwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgcmV0dXJuIGN0b3I7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcbmNvbnN0IERPTUV4Y2VwdGlvbjogRE9NRXhjZXB0aW9uQ29uc3RydWN0b3IgPVxuICBpc0RPTUV4Y2VwdGlvbkNvbnN0cnVjdG9yKE5hdGl2ZURPTUV4Y2VwdGlvbikgPyBOYXRpdmVET01FeGNlcHRpb24gOiBjcmVhdGVET01FeGNlcHRpb25Qb2x5ZmlsbCgpO1xuXG5leHBvcnQgeyBET01FeGNlcHRpb24gfTtcbiIsICJpbXBvcnQgeyBJc1JlYWRhYmxlU3RyZWFtLCBJc1JlYWRhYmxlU3RyZWFtTG9ja2VkLCBSZWFkYWJsZVN0cmVhbSwgUmVhZGFibGVTdHJlYW1DYW5jZWwgfSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlciwgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyUmVhZCB9IGZyb20gJy4vZGVmYXVsdC1yZWFkZXInO1xuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZSB9IGZyb20gJy4vZ2VuZXJpYy1yZWFkZXInO1xuaW1wb3J0IHtcbiAgQWNxdWlyZVdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcixcbiAgSXNXcml0YWJsZVN0cmVhbSxcbiAgSXNXcml0YWJsZVN0cmVhbUxvY2tlZCxcbiAgV3JpdGFibGVTdHJlYW0sXG4gIFdyaXRhYmxlU3RyZWFtQWJvcnQsXG4gIFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0LFxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZVdpdGhFcnJvclByb3BhZ2F0aW9uLFxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJSZWxlYXNlLFxuICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJXcml0ZVxufSBmcm9tICcuLi93cml0YWJsZS1zdHJlYW0nO1xuaW1wb3J0IGFzc2VydCBmcm9tICcuLi8uLi9zdHViL2Fzc2VydCc7XG5pbXBvcnQge1xuICBuZXdQcm9taXNlLFxuICBQZXJmb3JtUHJvbWlzZVRoZW4sXG4gIHByb21pc2VSZXNvbHZlZFdpdGgsXG4gIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUsXG4gIHVwb25GdWxmaWxsbWVudCxcbiAgdXBvblByb21pc2UsXG4gIHVwb25SZWplY3Rpb25cbn0gZnJvbSAnLi4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IEFib3J0U2lnbmFsLCBpc0Fib3J0U2lnbmFsIH0gZnJvbSAnLi4vYWJvcnQtc2lnbmFsJztcbmltcG9ydCB7IERPTUV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uL3N0dWIvZG9tLWV4Y2VwdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbVBpcGVUbzxUPihzb3VyY2U6IFJlYWRhYmxlU3RyZWFtPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3Q6IFdyaXRhYmxlU3RyZWFtPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnRDbG9zZTogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50QWJvcnQ6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVudENhbmNlbDogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsIHwgdW5kZWZpbmVkKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW0oc291cmNlKSk7XG4gIGFzc2VydChJc1dyaXRhYmxlU3RyZWFtKGRlc3QpKTtcbiAgYXNzZXJ0KHR5cGVvZiBwcmV2ZW50Q2xvc2UgPT09ICdib29sZWFuJyk7XG4gIGFzc2VydCh0eXBlb2YgcHJldmVudEFib3J0ID09PSAnYm9vbGVhbicpO1xuICBhc3NlcnQodHlwZW9mIHByZXZlbnRDYW5jZWwgPT09ICdib29sZWFuJyk7XG4gIGFzc2VydChzaWduYWwgPT09IHVuZGVmaW5lZCB8fCBpc0Fib3J0U2lnbmFsKHNpZ25hbCkpO1xuICBhc3NlcnQoIUlzUmVhZGFibGVTdHJlYW1Mb2NrZWQoc291cmNlKSk7XG4gIGFzc2VydCghSXNXcml0YWJsZVN0cmVhbUxvY2tlZChkZXN0KSk7XG5cbiAgY29uc3QgcmVhZGVyID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxUPihzb3VyY2UpO1xuICBjb25zdCB3cml0ZXIgPSBBY3F1aXJlV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyPFQ+KGRlc3QpO1xuXG4gIHNvdXJjZS5fZGlzdHVyYmVkID0gdHJ1ZTtcblxuICBsZXQgc2h1dHRpbmdEb3duID0gZmFsc2U7XG5cbiAgLy8gVGhpcyBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIHNwZWMncyByZXF1aXJlbWVudCB0aGF0IHdlIHdhaXQgZm9yIG9uZ29pbmcgd3JpdGVzIGR1cmluZyBzaHV0ZG93bi5cbiAgbGV0IGN1cnJlbnRXcml0ZSA9IHByb21pc2VSZXNvbHZlZFdpdGg8dm9pZD4odW5kZWZpbmVkKTtcblxuICByZXR1cm4gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGFib3J0QWxnb3JpdGhtOiAoKSA9PiB2b2lkO1xuICAgIGlmIChzaWduYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWJvcnRBbGdvcml0aG0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJyk7XG4gICAgICAgIGNvbnN0IGFjdGlvbnM6IEFycmF5PCgpID0+IFByb21pc2U8dm9pZD4+ID0gW107XG4gICAgICAgIGlmICghcHJldmVudEFib3J0KSB7XG4gICAgICAgICAgYWN0aW9ucy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChkZXN0Ll9zdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgICAgICAgICAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1BYm9ydChkZXN0LCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcHJldmVudENhbmNlbCkge1xuICAgICAgICAgIGFjdGlvbnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlLl9zdGF0ZSA9PT0gJ3JlYWRhYmxlJykge1xuICAgICAgICAgICAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1DYW5jZWwoc291cmNlLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNodXRkb3duV2l0aEFjdGlvbigoKSA9PiBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uKCkpKSwgdHJ1ZSwgZXJyb3IpO1xuICAgICAgfTtcblxuICAgICAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICAgIGFib3J0QWxnb3JpdGhtKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbGdvcml0aG0pO1xuICAgIH1cblxuICAgIC8vIFVzaW5nIHJlYWRlciBhbmQgd3JpdGVyLCByZWFkIGFsbCBjaHVua3MgZnJvbSB0aGlzIGFuZCB3cml0ZSB0aGVtIHRvIGRlc3RcbiAgICAvLyAtIEJhY2twcmVzc3VyZSBtdXN0IGJlIGVuZm9yY2VkXG4gICAgLy8gLSBTaHV0ZG93biBtdXN0IHN0b3AgYWxsIGFjdGl2aXR5XG4gICAgZnVuY3Rpb24gcGlwZUxvb3AoKSB7XG4gICAgICByZXR1cm4gbmV3UHJvbWlzZTx2b2lkPigocmVzb2x2ZUxvb3AsIHJlamVjdExvb3ApID0+IHtcbiAgICAgICAgZnVuY3Rpb24gbmV4dChkb25lOiBib29sZWFuKSB7XG4gICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgIHJlc29sdmVMb29wKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFVzZSBgUGVyZm9ybVByb21pc2VUaGVuYCBpbnN0ZWFkIG9mIGB1cG9uUHJvbWlzZWAgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIGFkZGluZyB1bm5lY2Vzc2FyeSBgLmNhdGNoKHJldGhyb3dBc3NlcnRpb25FcnJvclJlamVjdGlvbilgIGhhbmRsZXJzXG4gICAgICAgICAgICBQZXJmb3JtUHJvbWlzZVRoZW4ocGlwZVN0ZXAoKSwgbmV4dCwgcmVqZWN0TG9vcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dChmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwaXBlU3RlcCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgIGlmIChzaHV0dGluZ0Rvd24pIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQZXJmb3JtUHJvbWlzZVRoZW4od3JpdGVyLl9yZWFkeVByb21pc2UsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ld1Byb21pc2U8Ym9vbGVhbj4oKHJlc29sdmVSZWFkLCByZWplY3RSZWFkKSA9PiB7XG4gICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyUmVhZChcbiAgICAgICAgICAgIHJlYWRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50V3JpdGUgPSBQZXJmb3JtUHJvbWlzZVRoZW4oV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyV3JpdGUod3JpdGVyLCBjaHVuayksIHVuZGVmaW5lZCwgbm9vcCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZVJlYWQoZmFsc2UpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBfY2xvc2VTdGVwczogKCkgPT4gcmVzb2x2ZVJlYWQodHJ1ZSksXG4gICAgICAgICAgICAgIF9lcnJvclN0ZXBzOiByZWplY3RSZWFkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBFcnJvcnMgbXVzdCBiZSBwcm9wYWdhdGVkIGZvcndhcmRcbiAgICBpc09yQmVjb21lc0Vycm9yZWQoc291cmNlLCByZWFkZXIuX2Nsb3NlZFByb21pc2UsIHN0b3JlZEVycm9yID0+IHtcbiAgICAgIGlmICghcHJldmVudEFib3J0KSB7XG4gICAgICAgIHNodXRkb3duV2l0aEFjdGlvbigoKSA9PiBXcml0YWJsZVN0cmVhbUFib3J0KGRlc3QsIHN0b3JlZEVycm9yKSwgdHJ1ZSwgc3RvcmVkRXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2h1dGRvd24odHJ1ZSwgc3RvcmVkRXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRXJyb3JzIG11c3QgYmUgcHJvcGFnYXRlZCBiYWNrd2FyZFxuICAgIGlzT3JCZWNvbWVzRXJyb3JlZChkZXN0LCB3cml0ZXIuX2Nsb3NlZFByb21pc2UsIHN0b3JlZEVycm9yID0+IHtcbiAgICAgIGlmICghcHJldmVudENhbmNlbCkge1xuICAgICAgICBzaHV0ZG93bldpdGhBY3Rpb24oKCkgPT4gUmVhZGFibGVTdHJlYW1DYW5jZWwoc291cmNlLCBzdG9yZWRFcnJvciksIHRydWUsIHN0b3JlZEVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNodXRkb3duKHRydWUsIHN0b3JlZEVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENsb3NpbmcgbXVzdCBiZSBwcm9wYWdhdGVkIGZvcndhcmRcbiAgICBpc09yQmVjb21lc0Nsb3NlZChzb3VyY2UsIHJlYWRlci5fY2xvc2VkUHJvbWlzZSwgKCkgPT4ge1xuICAgICAgaWYgKCFwcmV2ZW50Q2xvc2UpIHtcbiAgICAgICAgc2h1dGRvd25XaXRoQWN0aW9uKCgpID0+IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlV2l0aEVycm9yUHJvcGFnYXRpb24od3JpdGVyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaHV0ZG93bigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ2xvc2luZyBtdXN0IGJlIHByb3BhZ2F0ZWQgYmFja3dhcmRcbiAgICBpZiAoV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoZGVzdCkgfHwgZGVzdC5fc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICBjb25zdCBkZXN0Q2xvc2VkID0gbmV3IFR5cGVFcnJvcigndGhlIGRlc3RpbmF0aW9uIHdyaXRhYmxlIHN0cmVhbSBjbG9zZWQgYmVmb3JlIGFsbCBkYXRhIGNvdWxkIGJlIHBpcGVkIHRvIGl0Jyk7XG5cbiAgICAgIGlmICghcHJldmVudENhbmNlbCkge1xuICAgICAgICBzaHV0ZG93bldpdGhBY3Rpb24oKCkgPT4gUmVhZGFibGVTdHJlYW1DYW5jZWwoc291cmNlLCBkZXN0Q2xvc2VkKSwgdHJ1ZSwgZGVzdENsb3NlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaHV0ZG93bih0cnVlLCBkZXN0Q2xvc2VkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlKHBpcGVMb29wKCkpO1xuXG4gICAgZnVuY3Rpb24gd2FpdEZvcldyaXRlc1RvRmluaXNoKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgLy8gQW5vdGhlciB3cml0ZSBtYXkgaGF2ZSBzdGFydGVkIHdoaWxlIHdlIHdlcmUgd2FpdGluZyBvbiB0aGlzIGN1cnJlbnRXcml0ZSwgc28gd2UgaGF2ZSB0byBiZSBzdXJlIHRvIHdhaXRcbiAgICAgIC8vIGZvciB0aGF0IHRvby5cbiAgICAgIGNvbnN0IG9sZEN1cnJlbnRXcml0ZSA9IGN1cnJlbnRXcml0ZTtcbiAgICAgIHJldHVybiBQZXJmb3JtUHJvbWlzZVRoZW4oXG4gICAgICAgIGN1cnJlbnRXcml0ZSxcbiAgICAgICAgKCkgPT4gb2xkQ3VycmVudFdyaXRlICE9PSBjdXJyZW50V3JpdGUgPyB3YWl0Rm9yV3JpdGVzVG9GaW5pc2goKSA6IHVuZGVmaW5lZFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09yQmVjb21lc0Vycm9yZWQoc3RyZWFtOiBSZWFkYWJsZVN0cmVhbSB8IFdyaXRhYmxlU3RyZWFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlOiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IChyZWFzb246IGFueSkgPT4gdm9pZCkge1xuICAgICAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgICAgICBhY3Rpb24oc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cG9uUmVqZWN0aW9uKHByb21pc2UsIGFjdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPckJlY29tZXNDbG9zZWQoc3RyZWFtOiBSZWFkYWJsZVN0cmVhbSB8IFdyaXRhYmxlU3RyZWFtLCBwcm9taXNlOiBQcm9taXNlPHZvaWQ+LCBhY3Rpb246ICgpID0+IHZvaWQpIHtcbiAgICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICBhY3Rpb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwb25GdWxmaWxsbWVudChwcm9taXNlLCBhY3Rpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodXRkb3duV2l0aEFjdGlvbihhY3Rpb246ICgpID0+IFByb21pc2U8dW5rbm93bj4sIG9yaWdpbmFsSXNFcnJvcj86IGJvb2xlYW4sIG9yaWdpbmFsRXJyb3I/OiBhbnkpIHtcbiAgICAgIGlmIChzaHV0dGluZ0Rvd24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2h1dHRpbmdEb3duID0gdHJ1ZTtcblxuICAgICAgaWYgKGRlc3QuX3N0YXRlID09PSAnd3JpdGFibGUnICYmICFXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChkZXN0KSkge1xuICAgICAgICB1cG9uRnVsZmlsbG1lbnQod2FpdEZvcldyaXRlc1RvRmluaXNoKCksIGRvVGhlUmVzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb1RoZVJlc3QoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZG9UaGVSZXN0KCkge1xuICAgICAgICB1cG9uUHJvbWlzZShcbiAgICAgICAgICBhY3Rpb24oKSxcbiAgICAgICAgICAoKSA9PiBmaW5hbGl6ZShvcmlnaW5hbElzRXJyb3IsIG9yaWdpbmFsRXJyb3IpLFxuICAgICAgICAgIG5ld0Vycm9yID0+IGZpbmFsaXplKHRydWUsIG5ld0Vycm9yKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodXRkb3duKGlzRXJyb3I/OiBib29sZWFuLCBlcnJvcj86IGFueSkge1xuICAgICAgaWYgKHNodXR0aW5nRG93bikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzaHV0dGluZ0Rvd24gPSB0cnVlO1xuXG4gICAgICBpZiAoZGVzdC5fc3RhdGUgPT09ICd3cml0YWJsZScgJiYgIVdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KGRlc3QpKSB7XG4gICAgICAgIHVwb25GdWxmaWxsbWVudCh3YWl0Rm9yV3JpdGVzVG9GaW5pc2goKSwgKCkgPT4gZmluYWxpemUoaXNFcnJvciwgZXJyb3IpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbmFsaXplKGlzRXJyb3IsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5hbGl6ZShpc0Vycm9yPzogYm9vbGVhbiwgZXJyb3I/OiBhbnkpIHtcbiAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlclJlbGVhc2Uod3JpdGVyKTtcbiAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcblxuICAgICAgaWYgKHNpZ25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QWxnb3JpdGhtKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0Vycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2sgfSBmcm9tICcuLi9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuaW1wb3J0IHsgRGVxdWV1ZVZhbHVlLCBFbnF1ZXVlVmFsdWVXaXRoU2l6ZSwgUXVldWVQYWlyLCBSZXNldFF1ZXVlIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb3BzL3F1ZXVlLXdpdGgtc2l6ZXMnO1xuaW1wb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1BZGRSZWFkUmVxdWVzdCxcbiAgUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZFJlcXVlc3QsXG4gIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZFJlcXVlc3RzLFxuICBSZWFkUmVxdWVzdFxufSBmcm9tICcuL2RlZmF1bHQtcmVhZGVyJztcbmltcG9ydCB7IFNpbXBsZVF1ZXVlIH0gZnJvbSAnLi4vc2ltcGxlLXF1ZXVlJztcbmltcG9ydCB7IElzUmVhZGFibGVTdHJlYW1Mb2NrZWQsIFJlYWRhYmxlU3RyZWFtLCBSZWFkYWJsZVN0cmVhbUNsb3NlLCBSZWFkYWJsZVN0cmVhbUVycm9yIH0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtJztcbmltcG9ydCB7IFZhbGlkYXRlZFVuZGVybHlpbmdTb3VyY2UgfSBmcm9tICcuL3VuZGVybHlpbmctc291cmNlJztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvbWlzY2VsbGFuZW91cyc7XG5pbXBvcnQgeyBDYW5jZWxTdGVwcywgUHVsbFN0ZXBzIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb3BzL2ludGVybmFsLW1ldGhvZHMnO1xuaW1wb3J0IHsgcHJvbWlzZVJlc29sdmVkV2l0aCwgdXBvblByb21pc2UgfSBmcm9tICcuLi9oZWxwZXJzL3dlYmlkbCc7XG5cbi8qKlxuICogQWxsb3dzIGNvbnRyb2wgb2YgYSB7QGxpbmsgUmVhZGFibGVTdHJlYW0gfCByZWFkYWJsZSBzdHJlYW19J3Mgc3RhdGUgYW5kIGludGVybmFsIHF1ZXVlLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4ge1xuICAvKiogQGludGVybmFsICovXG4gIF9jb250cm9sbGVkUmVhZGFibGVTdHJlYW0hOiBSZWFkYWJsZVN0cmVhbTxSPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcXVldWUhOiBTaW1wbGVRdWV1ZTxRdWV1ZVBhaXI8Uj4+O1xuICAvKiogQGludGVybmFsICovXG4gIF9xdWV1ZVRvdGFsU2l6ZSE6IG51bWJlcjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RhcnRlZCE6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Nsb3NlUmVxdWVzdGVkITogYm9vbGVhbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHVsbEFnYWluITogYm9vbGVhbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHVsbGluZyAhOiBib29sZWFuO1xuICAvKiogQGludGVybmFsICovXG4gIF9zdHJhdGVneVNpemVBbGdvcml0aG0hOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8Uj47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0cmF0ZWd5SFdNITogbnVtYmVyO1xuICAvKiogQGludGVybmFsICovXG4gIF9wdWxsQWxnb3JpdGhtITogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2FuY2VsQWxnb3JpdGhtITogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlc2lyZWQgc2l6ZSB0byBmaWxsIHRoZSBjb250cm9sbGVkIHN0cmVhbSdzIGludGVybmFsIHF1ZXVlLiBJdCBjYW4gYmUgbmVnYXRpdmUsIGlmIHRoZSBxdWV1ZSBpc1xuICAgKiBvdmVyLWZ1bGwuIEFuIHVuZGVybHlpbmcgc291cmNlIG91Z2h0IHRvIHVzZSB0aGlzIGluZm9ybWF0aW9uIHRvIGRldGVybWluZSB3aGVuIGFuZCBob3cgdG8gYXBwbHkgYmFja3ByZXNzdXJlLlxuICAgKi9cbiAgZ2V0IGRlc2lyZWRTaXplKCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Rlc2lyZWRTaXplJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGNvbnRyb2xsZWQgcmVhZGFibGUgc3RyZWFtLiBDb25zdW1lcnMgd2lsbCBzdGlsbCBiZSBhYmxlIHRvIHJlYWQgYW55IHByZXZpb3VzbHktZW5xdWV1ZWQgY2h1bmtzIGZyb21cbiAgICogdGhlIHN0cmVhbSwgYnV0IG9uY2UgdGhvc2UgYXJlIHJlYWQsIHRoZSBzdHJlYW0gd2lsbCBiZWNvbWUgY2xvc2VkLlxuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2UnKTtcbiAgICB9XG5cbiAgICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZSh0aGlzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHN0cmVhbSBpcyBub3QgaW4gYSBzdGF0ZSB0aGF0IHBlcm1pdHMgY2xvc2UnKTtcbiAgICB9XG5cbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogRW5xdWV1ZXMgdGhlIGdpdmVuIGNodW5rIGBjaHVua2AgaW4gdGhlIGNvbnRyb2xsZWQgcmVhZGFibGUgc3RyZWFtLlxuICAgKi9cbiAgZW5xdWV1ZShjaHVuazogUik6IHZvaWQ7XG4gIGVucXVldWUoY2h1bms6IFIgPSB1bmRlZmluZWQhKTogdm9pZCB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZW5xdWV1ZScpO1xuICAgIH1cblxuICAgIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKHRoaXMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc3RyZWFtIGlzIG5vdCBpbiBhIHN0YXRlIHRoYXQgcGVybWl0cyBlbnF1ZXVlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKHRoaXMsIGNodW5rKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFcnJvcnMgdGhlIGNvbnRyb2xsZWQgcmVhZGFibGUgc3RyZWFtLCBtYWtpbmcgYWxsIGZ1dHVyZSBpbnRlcmFjdGlvbnMgd2l0aCBpdCBmYWlsIHdpdGggdGhlIGdpdmVuIGVycm9yIGBlYC5cbiAgICovXG4gIGVycm9yKGU6IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Vycm9yJyk7XG4gICAgfVxuXG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKHRoaXMsIGUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBbQ2FuY2VsU3RlcHNdKHJlYXNvbjogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgUmVzZXRRdWV1ZSh0aGlzKTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9jYW5jZWxBbGdvcml0aG0ocmVhc29uKTtcbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKHRoaXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIFtQdWxsU3RlcHNdKHJlYWRSZXF1ZXN0OiBSZWFkUmVxdWVzdDxSPik6IHZvaWQge1xuICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbTtcblxuICAgIGlmICh0aGlzLl9xdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjaHVuayA9IERlcXVldWVWYWx1ZSh0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuX2Nsb3NlUmVxdWVzdGVkICYmIHRoaXMuX3F1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKHRoaXMpO1xuICAgICAgICBSZWFkYWJsZVN0cmVhbUNsb3NlKHN0cmVhbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZCh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgcmVhZFJlcXVlc3QuX2NodW5rU3RlcHMoY2h1bmspO1xuICAgIH0gZWxzZSB7XG4gICAgICBSZWFkYWJsZVN0cmVhbUFkZFJlYWRSZXF1ZXN0KHN0cmVhbSwgcmVhZFJlcXVlc3QpO1xuICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQodGhpcyk7XG4gICAgfVxuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gIGNsb3NlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgZW5xdWV1ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGVycm9yOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgZGVzaXJlZFNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgIHZhbHVlOiAnUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcicsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5cblxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFIgPSBhbnk+KHg6IGFueSk6IHggaXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxSPiB7XG4gIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19jb250cm9sbGVkUmVhZGFibGVTdHJlYW0nKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+KTogdm9pZCB7XG4gIGNvbnN0IHNob3VsZFB1bGwgPSBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyU2hvdWxkQ2FsbFB1bGwoY29udHJvbGxlcik7XG4gIGlmICghc2hvdWxkUHVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb250cm9sbGVyLl9wdWxsaW5nKSB7XG4gICAgY29udHJvbGxlci5fcHVsbEFnYWluID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnQoIWNvbnRyb2xsZXIuX3B1bGxBZ2Fpbik7XG5cbiAgY29udHJvbGxlci5fcHVsbGluZyA9IHRydWU7XG5cbiAgY29uc3QgcHVsbFByb21pc2UgPSBjb250cm9sbGVyLl9wdWxsQWxnb3JpdGhtKCk7XG4gIHVwb25Qcm9taXNlKFxuICAgIHB1bGxQcm9taXNlLFxuICAgICgpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIuX3B1bGxpbmcgPSBmYWxzZTtcblxuICAgICAgaWYgKGNvbnRyb2xsZXIuX3B1bGxBZ2Fpbikge1xuICAgICAgICBjb250cm9sbGVyLl9wdWxsQWdhaW4gPSBmYWxzZTtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBlID0+IHtcbiAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlKTtcbiAgICB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJTaG91bGRDYWxsUHVsbChjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT4pOiBib29sZWFuIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuXG4gIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKGNvbnRyb2xsZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFjb250cm9sbGVyLl9zdGFydGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKElzUmVhZGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSAmJiBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyhzdHJlYW0pID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgZGVzaXJlZFNpemUgPSBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUoY29udHJvbGxlcik7XG4gIGFzc2VydChkZXNpcmVkU2l6ZSAhPT0gbnVsbCk7XG4gIGlmIChkZXNpcmVkU2l6ZSEgPiAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+KSB7XG4gIGNvbnRyb2xsZXIuX3B1bGxBbGdvcml0aG0gPSB1bmRlZmluZWQhO1xuICBjb250cm9sbGVyLl9jYW5jZWxBbGdvcml0aG0gPSB1bmRlZmluZWQhO1xuICBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0gPSB1bmRlZmluZWQhO1xufVxuXG4vLyBBIGNsaWVudCBvZiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyIG1heSB1c2UgdGhlc2UgZnVuY3Rpb25zIGRpcmVjdGx5IHRvIGJ5cGFzcyBzdGF0ZSBjaGVjay5cblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZShjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT4pIHtcbiAgaWYgKCFSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FuQ2xvc2VPckVucXVldWUoY29udHJvbGxlcikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVTdHJlYW07XG5cbiAgY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQgPSB0cnVlO1xuXG4gIGlmIChjb250cm9sbGVyLl9xdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgIFJlYWRhYmxlU3RyZWFtQ2xvc2Uoc3RyZWFtKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWU8Uj4oXG4gIGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4sXG4gIGNodW5rOiBSXG4pOiB2b2lkIHtcbiAgaWYgKCFSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FuQ2xvc2VPckVucXVldWUoY29udHJvbGxlcikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVTdHJlYW07XG5cbiAgaWYgKElzUmVhZGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSAmJiBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyhzdHJlYW0pID4gMCkge1xuICAgIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0KHN0cmVhbSwgY2h1bmssIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgY2h1bmtTaXplO1xuICAgIHRyeSB7XG4gICAgICBjaHVua1NpemUgPSBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0oY2h1bmspO1xuICAgIH0gY2F0Y2ggKGNodW5rU2l6ZUUpIHtcbiAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBjaHVua1NpemVFKTtcbiAgICAgIHRocm93IGNodW5rU2l6ZUU7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIEVucXVldWVWYWx1ZVdpdGhTaXplKGNvbnRyb2xsZXIsIGNodW5rLCBjaHVua1NpemUpO1xuICAgIH0gY2F0Y2ggKGVucXVldWVFKSB7XG4gICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZW5xdWV1ZUUpO1xuICAgICAgdGhyb3cgZW5xdWV1ZUU7XG4gICAgfVxuICB9XG5cbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+LCBlOiBhbnkpIHtcbiAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuXG4gIGlmIChzdHJlYW0uX3N0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgUmVzZXRRdWV1ZShjb250cm9sbGVyKTtcblxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICBSZWFkYWJsZVN0cmVhbUVycm9yKHN0cmVhbSwgZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUoXG4gIGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55PlxuKTogbnVtYmVyIHwgbnVsbCB7XG4gIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtLl9zdGF0ZTtcblxuICBpZiAoc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiBjb250cm9sbGVyLl9zdHJhdGVneUhXTSAtIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplO1xufVxuXG4vLyBUaGlzIGlzIHVzZWQgaW4gdGhlIGltcGxlbWVudGF0aW9uIG9mIFRyYW5zZm9ybVN0cmVhbS5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVySGFzQmFja3ByZXNzdXJlKFxuICBjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPGFueT5cbik6IGJvb2xlYW4ge1xuICBpZiAoUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclNob3VsZENhbGxQdWxsKGNvbnRyb2xsZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FuQ2xvc2VPckVucXVldWUoXG4gIGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55PlxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtLl9zdGF0ZTtcblxuICBpZiAoIWNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkICYmIHN0YXRlID09PSAncmVhZGFibGUnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXRVcFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxSPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxSPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBbGdvcml0aG06ICgpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVsbEFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWxnb3JpdGhtOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hXYXRlck1hcms6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZUFsZ29yaXRobTogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPFI+KSB7XG4gIGFzc2VydChzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciA9PT0gdW5kZWZpbmVkKTtcblxuICBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVTdHJlYW0gPSBzdHJlYW07XG5cbiAgY29udHJvbGxlci5fcXVldWUgPSB1bmRlZmluZWQhO1xuICBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9IHVuZGVmaW5lZCE7XG4gIFJlc2V0UXVldWUoY29udHJvbGxlcik7XG5cbiAgY29udHJvbGxlci5fc3RhcnRlZCA9IGZhbHNlO1xuICBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCA9IGZhbHNlO1xuICBjb250cm9sbGVyLl9wdWxsQWdhaW4gPSBmYWxzZTtcbiAgY29udHJvbGxlci5fcHVsbGluZyA9IGZhbHNlO1xuXG4gIGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobSA9IHNpemVBbGdvcml0aG07XG4gIGNvbnRyb2xsZXIuX3N0cmF0ZWd5SFdNID0gaGlnaFdhdGVyTWFyaztcblxuICBjb250cm9sbGVyLl9wdWxsQWxnb3JpdGhtID0gcHVsbEFsZ29yaXRobTtcbiAgY29udHJvbGxlci5fY2FuY2VsQWxnb3JpdGhtID0gY2FuY2VsQWxnb3JpdGhtO1xuXG4gIHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyID0gY29udHJvbGxlcjtcblxuICBjb25zdCBzdGFydFJlc3VsdCA9IHN0YXJ0QWxnb3JpdGhtKCk7XG4gIHVwb25Qcm9taXNlKFxuICAgIHByb21pc2VSZXNvbHZlZFdpdGgoc3RhcnRSZXN1bHQpLFxuICAgICgpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICBhc3NlcnQoIWNvbnRyb2xsZXIuX3B1bGxpbmcpO1xuICAgICAgYXNzZXJ0KCFjb250cm9sbGVyLl9wdWxsQWdhaW4pO1xuXG4gICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICB9LFxuICAgIHIgPT4ge1xuICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIHIpO1xuICAgIH1cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNldFVwUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21VbmRlcmx5aW5nU291cmNlPFI+KFxuICBzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFI+LFxuICB1bmRlcmx5aW5nU291cmNlOiBWYWxpZGF0ZWRVbmRlcmx5aW5nU291cmNlPFI+LFxuICBoaWdoV2F0ZXJNYXJrOiBudW1iZXIsXG4gIHNpemVBbGdvcml0aG06IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxSPlxuKSB7XG4gIGNvbnN0IGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4gPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlKTtcblxuICBsZXQgc3RhcnRBbGdvcml0aG06ICgpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPiA9ICgpID0+IHVuZGVmaW5lZDtcbiAgbGV0IHB1bGxBbGdvcml0aG06ICgpID0+IFByb21pc2U8dm9pZD4gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gIGxldCBjYW5jZWxBbGdvcml0aG06IChyZWFzb246IGFueSkgPT4gUHJvbWlzZTx2b2lkPiA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcblxuICBpZiAodW5kZXJseWluZ1NvdXJjZS5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnRBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nU291cmNlLnN0YXJ0IShjb250cm9sbGVyKTtcbiAgfVxuICBpZiAodW5kZXJseWluZ1NvdXJjZS5wdWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdWxsQWxnb3JpdGhtID0gKCkgPT4gdW5kZXJseWluZ1NvdXJjZS5wdWxsIShjb250cm9sbGVyKTtcbiAgfVxuICBpZiAodW5kZXJseWluZ1NvdXJjZS5jYW5jZWwgIT09IHVuZGVmaW5lZCkge1xuICAgIGNhbmNlbEFsZ29yaXRobSA9IHJlYXNvbiA9PiB1bmRlcmx5aW5nU291cmNlLmNhbmNlbCEocmVhc29uKTtcbiAgfVxuXG4gIFNldFVwUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcihcbiAgICBzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG1cbiAgKTtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIuXG5cbmZ1bmN0aW9uIGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcbiAgICBgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcmApO1xufVxuIiwgImltcG9ydCB7XG4gIENyZWF0ZVJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgQ3JlYXRlUmVhZGFibGVTdHJlYW0sXG4gIElzUmVhZGFibGVTdHJlYW0sXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbSxcbiAgUmVhZGFibGVTdHJlYW0sXG4gIFJlYWRhYmxlU3RyZWFtQ2FuY2VsLFxuICBSZWFkYWJsZVN0cmVhbVJlYWRlclxufSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZSB9IGZyb20gJy4vZ2VuZXJpYy1yZWFkZXInO1xuaW1wb3J0IHtcbiAgQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcixcbiAgSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQsXG4gIFJlYWRSZXF1ZXN0XG59IGZyb20gJy4vZGVmYXVsdC1yZWFkZXInO1xuaW1wb3J0IHtcbiAgQWNxdWlyZVJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcixcbiAgSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIsXG4gIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlclJlYWQsXG4gIFJlYWRJbnRvUmVxdWVzdFxufSBmcm9tICcuL2J5b2ItcmVhZGVyJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vc3R1Yi9hc3NlcnQnO1xuaW1wb3J0IHsgbmV3UHJvbWlzZSwgcHJvbWlzZVJlc29sdmVkV2l0aCwgcXVldWVNaWNyb3Rhc2ssIHVwb25SZWplY3Rpb24gfSBmcm9tICcuLi9oZWxwZXJzL3dlYmlkbCc7XG5pbXBvcnQge1xuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3Jcbn0gZnJvbSAnLi9kZWZhdWx0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHtcbiAgSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2UsXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlLFxuICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IsXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXRCWU9CUmVxdWVzdCxcbiAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmQsXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kV2l0aE5ld1ZpZXdcbn0gZnJvbSAnLi9ieXRlLXN0cmVhbS1jb250cm9sbGVyJztcbmltcG9ydCB7IENyZWF0ZUFycmF5RnJvbUxpc3QgfSBmcm9tICcuLi9hYnN0cmFjdC1vcHMvZWNtYXNjcmlwdCc7XG5pbXBvcnQgeyBDbG9uZUFzVWludDhBcnJheSB9IGZyb20gJy4uL2Fic3RyYWN0LW9wcy9taXNjZWxsYW5lb3VzJztcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtVGVlPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVGb3JCcmFuY2gyOiBib29sZWFuKTogW1JlYWRhYmxlU3RyZWFtPFI+LCBSZWFkYWJsZVN0cmVhbTxSPl0ge1xuICBhc3NlcnQoSXNSZWFkYWJsZVN0cmVhbShzdHJlYW0pKTtcbiAgYXNzZXJ0KHR5cGVvZiBjbG9uZUZvckJyYW5jaDIgPT09ICdib29sZWFuJyk7XG4gIGlmIChJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIoc3RyZWFtLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpKSB7XG4gICAgcmV0dXJuIFJlYWRhYmxlQnl0ZVN0cmVhbVRlZShzdHJlYW0gYXMgdW5rbm93biBhcyBSZWFkYWJsZUJ5dGVTdHJlYW0pIGFzXG4gICAgICB1bmtub3duIGFzIFtSZWFkYWJsZVN0cmVhbTxSPiwgUmVhZGFibGVTdHJlYW08Uj5dO1xuICB9XG4gIHJldHVybiBSZWFkYWJsZVN0cmVhbURlZmF1bHRUZWUoc3RyZWFtLCBjbG9uZUZvckJyYW5jaDIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0VGVlPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lRm9yQnJhbmNoMjogYm9vbGVhbik6IFtSZWFkYWJsZVN0cmVhbTxSPiwgUmVhZGFibGVTdHJlYW08Uj5dIHtcbiAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW0oc3RyZWFtKSk7XG4gIGFzc2VydCh0eXBlb2YgY2xvbmVGb3JCcmFuY2gyID09PSAnYm9vbGVhbicpO1xuXG4gIGNvbnN0IHJlYWRlciA9IEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4oc3RyZWFtKTtcblxuICBsZXQgcmVhZGluZyA9IGZhbHNlO1xuICBsZXQgcmVhZEFnYWluID0gZmFsc2U7XG4gIGxldCBjYW5jZWxlZDEgPSBmYWxzZTtcbiAgbGV0IGNhbmNlbGVkMiA9IGZhbHNlO1xuICBsZXQgcmVhc29uMTogYW55O1xuICBsZXQgcmVhc29uMjogYW55O1xuICBsZXQgYnJhbmNoMTogUmVhZGFibGVTdHJlYW08Uj47XG4gIGxldCBicmFuY2gyOiBSZWFkYWJsZVN0cmVhbTxSPjtcblxuICBsZXQgcmVzb2x2ZUNhbmNlbFByb21pc2U6ICh2YWx1ZTogdW5kZWZpbmVkIHwgUHJvbWlzZTx1bmRlZmluZWQ+KSA9PiB2b2lkO1xuICBjb25zdCBjYW5jZWxQcm9taXNlID0gbmV3UHJvbWlzZTx1bmRlZmluZWQ+KHJlc29sdmUgPT4ge1xuICAgIHJlc29sdmVDYW5jZWxQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVsbEFsZ29yaXRobSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAocmVhZGluZykge1xuICAgICAgcmVhZEFnYWluID0gdHJ1ZTtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcmVhZGluZyA9IHRydWU7XG5cbiAgICBjb25zdCByZWFkUmVxdWVzdDogUmVhZFJlcXVlc3Q8Uj4gPSB7XG4gICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4ge1xuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRlbGF5ZWQgYSBtaWNyb3Rhc2sgYmVjYXVzZSBpdCB0YWtlcyBhdCBsZWFzdCBhIG1pY3JvdGFzayB0byBkZXRlY3QgZXJyb3JzICh1c2luZ1xuICAgICAgICAvLyByZWFkZXIuX2Nsb3NlZFByb21pc2UgYmVsb3cpLCBhbmQgd2Ugd2FudCBlcnJvcnMgaW4gc3RyZWFtIHRvIGVycm9yIGJvdGggYnJhbmNoZXMgaW1tZWRpYXRlbHkuIFdlIGNhbm5vdCBsZXRcbiAgICAgICAgLy8gc3VjY2Vzc2Z1bCBzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSByZWFkcyBnZXQgYWhlYWQgb2YgYXN5bmNocm9ub3VzbHktYXZhaWxhYmxlIGVycm9ycy5cbiAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICAgIHJlYWRBZ2FpbiA9IGZhbHNlO1xuICAgICAgICAgIGNvbnN0IGNodW5rMSA9IGNodW5rO1xuICAgICAgICAgIGNvbnN0IGNodW5rMiA9IGNodW5rO1xuXG4gICAgICAgICAgLy8gVGhlcmUgaXMgbm8gd2F5IHRvIGFjY2VzcyB0aGUgY2xvbmluZyBjb2RlIHJpZ2h0IG5vdyBpbiB0aGUgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIC8vIElmIHdlIGFkZCBvbmUgdGhlbiB3ZSdsbCBuZWVkIGFuIGltcGxlbWVudGF0aW9uIGZvciBzZXJpYWxpemFibGUgb2JqZWN0cy5cbiAgICAgICAgICAvLyBpZiAoIWNhbmNlbGVkMiAmJiBjbG9uZUZvckJyYW5jaDIpIHtcbiAgICAgICAgICAvLyAgIGNodW5rMiA9IFN0cnVjdHVyZWREZXNlcmlhbGl6ZShTdHJ1Y3R1cmVkU2VyaWFsaXplKGNodW5rMikpO1xuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIGlmICghY2FuY2VsZWQxKSB7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZShcbiAgICAgICAgICAgICAgYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4sXG4gICAgICAgICAgICAgIGNodW5rMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKFxuICAgICAgICAgICAgICBicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxSPixcbiAgICAgICAgICAgICAgY2h1bmsyXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBpZiAocmVhZEFnYWluKSB7XG4gICAgICAgICAgICBwdWxsQWxnb3JpdGhtKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBfY2xvc2VTdGVwczogKCkgPT4ge1xuICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICghY2FuY2VsZWQxKSB7XG4gICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciBhcyBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbmNlbGVkMikge1xuICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZShicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxSPik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNhbmNlbGVkMSB8fCAhY2FuY2VsZWQyKSB7XG4gICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIF9lcnJvclN0ZXBzOiAoKSA9PiB7XG4gICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQocmVhZGVyLCByZWFkUmVxdWVzdCk7XG5cbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsMUFsZ29yaXRobShyZWFzb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNhbmNlbGVkMSA9IHRydWU7XG4gICAgcmVhc29uMSA9IHJlYXNvbjtcbiAgICBpZiAoY2FuY2VsZWQyKSB7XG4gICAgICBjb25zdCBjb21wb3NpdGVSZWFzb24gPSBDcmVhdGVBcnJheUZyb21MaXN0KFtyZWFzb24xLCByZWFzb24yXSk7XG4gICAgICBjb25zdCBjYW5jZWxSZXN1bHQgPSBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNvbXBvc2l0ZVJlYXNvbik7XG4gICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShjYW5jZWxSZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gY2FuY2VsUHJvbWlzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbDJBbGdvcml0aG0ocmVhc29uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjYW5jZWxlZDIgPSB0cnVlO1xuICAgIHJlYXNvbjIgPSByZWFzb247XG4gICAgaWYgKGNhbmNlbGVkMSkge1xuICAgICAgY29uc3QgY29tcG9zaXRlUmVhc29uID0gQ3JlYXRlQXJyYXlGcm9tTGlzdChbcmVhc29uMSwgcmVhc29uMl0pO1xuICAgICAgY29uc3QgY2FuY2VsUmVzdWx0ID0gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCBjb21wb3NpdGVSZWFzb24pO1xuICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UoY2FuY2VsUmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbmNlbFByb21pc2U7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEFsZ29yaXRobSgpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cblxuICBicmFuY2gxID0gQ3JlYXRlUmVhZGFibGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbDFBbGdvcml0aG0pO1xuICBicmFuY2gyID0gQ3JlYXRlUmVhZGFibGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbDJBbGdvcml0aG0pO1xuXG4gIHVwb25SZWplY3Rpb24ocmVhZGVyLl9jbG9zZWRQcm9taXNlLCAocjogYW55KSA9PiB7XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciBhcyBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyPFI+LCByKTtcbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGFzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4sIHIpO1xuICAgIGlmICghY2FuY2VsZWQxIHx8ICFjYW5jZWxlZDIpIHtcbiAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gW2JyYW5jaDEsIGJyYW5jaDJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtVGVlKHN0cmVhbTogUmVhZGFibGVCeXRlU3RyZWFtKTogW1JlYWRhYmxlQnl0ZVN0cmVhbSwgUmVhZGFibGVCeXRlU3RyZWFtXSB7XG4gIGFzc2VydChJc1JlYWRhYmxlU3RyZWFtKHN0cmVhbSkpO1xuICBhc3NlcnQoSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKSk7XG5cbiAgbGV0IHJlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8VWludDhBcnJheT4gPSBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHN0cmVhbSk7XG4gIGxldCByZWFkaW5nID0gZmFsc2U7XG4gIGxldCByZWFkQWdhaW5Gb3JCcmFuY2gxID0gZmFsc2U7XG4gIGxldCByZWFkQWdhaW5Gb3JCcmFuY2gyID0gZmFsc2U7XG4gIGxldCBjYW5jZWxlZDEgPSBmYWxzZTtcbiAgbGV0IGNhbmNlbGVkMiA9IGZhbHNlO1xuICBsZXQgcmVhc29uMTogYW55O1xuICBsZXQgcmVhc29uMjogYW55O1xuICBsZXQgYnJhbmNoMTogUmVhZGFibGVCeXRlU3RyZWFtO1xuICBsZXQgYnJhbmNoMjogUmVhZGFibGVCeXRlU3RyZWFtO1xuXG4gIGxldCByZXNvbHZlQ2FuY2VsUHJvbWlzZTogKHZhbHVlOiB1bmRlZmluZWQgfCBQcm9taXNlPHVuZGVmaW5lZD4pID0+IHZvaWQ7XG4gIGNvbnN0IGNhbmNlbFByb21pc2UgPSBuZXdQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgIHJlc29sdmVDYW5jZWxQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZm9yd2FyZFJlYWRlckVycm9yKHRoaXNSZWFkZXI6IFJlYWRhYmxlU3RyZWFtUmVhZGVyPFVpbnQ4QXJyYXk+KSB7XG4gICAgdXBvblJlamVjdGlvbih0aGlzUmVhZGVyLl9jbG9zZWRQcm9taXNlLCByID0+IHtcbiAgICAgIGlmICh0aGlzUmVhZGVyICE9PSByZWFkZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgcik7XG4gICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCByKTtcbiAgICAgIGlmICghY2FuY2VsZWQxIHx8ICFjYW5jZWxlZDIpIHtcbiAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1bGxXaXRoRGVmYXVsdFJlYWRlcigpIHtcbiAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIocmVhZGVyKSkge1xuICAgICAgYXNzZXJ0KHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cy5sZW5ndGggPT09IDApO1xuICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpO1xuXG4gICAgICByZWFkZXIgPSBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHN0cmVhbSk7XG4gICAgICBmb3J3YXJkUmVhZGVyRXJyb3IocmVhZGVyKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWFkUmVxdWVzdDogUmVhZFJlcXVlc3Q8VWludDhBcnJheT4gPSB7XG4gICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4ge1xuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRlbGF5ZWQgYSBtaWNyb3Rhc2sgYmVjYXVzZSBpdCB0YWtlcyBhdCBsZWFzdCBhIG1pY3JvdGFzayB0byBkZXRlY3QgZXJyb3JzICh1c2luZ1xuICAgICAgICAvLyByZWFkZXIuX2Nsb3NlZFByb21pc2UgYmVsb3cpLCBhbmQgd2Ugd2FudCBlcnJvcnMgaW4gc3RyZWFtIHRvIGVycm9yIGJvdGggYnJhbmNoZXMgaW1tZWRpYXRlbHkuIFdlIGNhbm5vdCBsZXRcbiAgICAgICAgLy8gc3VjY2Vzc2Z1bCBzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSByZWFkcyBnZXQgYWhlYWQgb2YgYXN5bmNocm9ub3VzbHktYXZhaWxhYmxlIGVycm9ycy5cbiAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICAgIHJlYWRBZ2FpbkZvckJyYW5jaDEgPSBmYWxzZTtcbiAgICAgICAgICByZWFkQWdhaW5Gb3JCcmFuY2gyID0gZmFsc2U7XG5cbiAgICAgICAgICBjb25zdCBjaHVuazEgPSBjaHVuaztcbiAgICAgICAgICBsZXQgY2h1bmsyID0gY2h1bms7XG4gICAgICAgICAgaWYgKCFjYW5jZWxlZDEgJiYgIWNhbmNlbGVkMikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY2h1bmsyID0gQ2xvbmVBc1VpbnQ4QXJyYXkoY2h1bmspO1xuICAgICAgICAgICAgfSBjYXRjaCAoY2xvbmVFKSB7XG4gICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNsb25lRSk7XG4gICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNsb25lRSk7XG4gICAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHN0cmVhbSwgY2xvbmVFKSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWNhbmNlbGVkMSkge1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWUoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuazEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWNhbmNlbGVkMikge1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWUoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuazIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBpZiAocmVhZEFnYWluRm9yQnJhbmNoMSkge1xuICAgICAgICAgICAgcHVsbDFBbGdvcml0aG0oKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlYWRBZ2FpbkZvckJyYW5jaDIpIHtcbiAgICAgICAgICAgIHB1bGwyQWxnb3JpdGhtKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBfY2xvc2VTdGVwczogKCkgPT4ge1xuICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICghY2FuY2VsZWQxKSB7XG4gICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5jZWxlZDIpIHtcbiAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2UoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZChicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIDApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5jZWxlZDEgfHwgIWNhbmNlbGVkMikge1xuICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfZXJyb3JTdGVwczogKCkgPT4ge1xuICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHJlYWRlciwgcmVhZFJlcXVlc3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVsbFdpdGhCWU9CUmVhZGVyKHZpZXc6IEFycmF5QnVmZmVyVmlldywgZm9yQnJhbmNoMjogYm9vbGVhbikge1xuICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxVaW50OEFycmF5PihyZWFkZXIpKSB7XG4gICAgICBhc3NlcnQocmVhZGVyLl9yZWFkUmVxdWVzdHMubGVuZ3RoID09PSAwKTtcbiAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcblxuICAgICAgcmVhZGVyID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihzdHJlYW0pO1xuICAgICAgZm9yd2FyZFJlYWRlckVycm9yKHJlYWRlcik7XG4gICAgfVxuXG4gICAgY29uc3QgYnlvYkJyYW5jaCA9IGZvckJyYW5jaDIgPyBicmFuY2gyIDogYnJhbmNoMTtcbiAgICBjb25zdCBvdGhlckJyYW5jaCA9IGZvckJyYW5jaDIgPyBicmFuY2gxIDogYnJhbmNoMjtcblxuICAgIGNvbnN0IHJlYWRJbnRvUmVxdWVzdDogUmVhZEludG9SZXF1ZXN0PEFycmF5QnVmZmVyVmlldz4gPSB7XG4gICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4ge1xuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRlbGF5ZWQgYSBtaWNyb3Rhc2sgYmVjYXVzZSBpdCB0YWtlcyBhdCBsZWFzdCBhIG1pY3JvdGFzayB0byBkZXRlY3QgZXJyb3JzICh1c2luZ1xuICAgICAgICAvLyByZWFkZXIuX2Nsb3NlZFByb21pc2UgYmVsb3cpLCBhbmQgd2Ugd2FudCBlcnJvcnMgaW4gc3RyZWFtIHRvIGVycm9yIGJvdGggYnJhbmNoZXMgaW1tZWRpYXRlbHkuIFdlIGNhbm5vdCBsZXRcbiAgICAgICAgLy8gc3VjY2Vzc2Z1bCBzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSByZWFkcyBnZXQgYWhlYWQgb2YgYXN5bmNocm9ub3VzbHktYXZhaWxhYmxlIGVycm9ycy5cbiAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICAgIHJlYWRBZ2FpbkZvckJyYW5jaDEgPSBmYWxzZTtcbiAgICAgICAgICByZWFkQWdhaW5Gb3JCcmFuY2gyID0gZmFsc2U7XG5cbiAgICAgICAgICBjb25zdCBieW9iQ2FuY2VsZWQgPSBmb3JCcmFuY2gyID8gY2FuY2VsZWQyIDogY2FuY2VsZWQxO1xuICAgICAgICAgIGNvbnN0IG90aGVyQ2FuY2VsZWQgPSBmb3JCcmFuY2gyID8gY2FuY2VsZWQxIDogY2FuY2VsZWQyO1xuXG4gICAgICAgICAgaWYgKCFvdGhlckNhbmNlbGVkKSB7XG4gICAgICAgICAgICBsZXQgY2xvbmVkQ2h1bms7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjbG9uZWRDaHVuayA9IENsb25lQXNVaW50OEFycmF5KGNodW5rKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGNsb25lRSkge1xuICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjbG9uZUUpO1xuICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3Iob3RoZXJCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2xvbmVFKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UoUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCBjbG9uZUUpKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFieW9iQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRXaXRoTmV3VmlldyhieW9iQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNodW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlKG90aGVyQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNsb25lZENodW5rKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFieW9iQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kV2l0aE5ld1ZpZXcoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuayk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChyZWFkQWdhaW5Gb3JCcmFuY2gxKSB7XG4gICAgICAgICAgICBwdWxsMUFsZ29yaXRobSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVhZEFnYWluRm9yQnJhbmNoMikge1xuICAgICAgICAgICAgcHVsbDJBbGdvcml0aG0oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIF9jbG9zZVN0ZXBzOiBjaHVuayA9PiB7XG4gICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBieW9iQ2FuY2VsZWQgPSBmb3JCcmFuY2gyID8gY2FuY2VsZWQyIDogY2FuY2VsZWQxO1xuICAgICAgICBjb25zdCBvdGhlckNhbmNlbGVkID0gZm9yQnJhbmNoMiA/IGNhbmNlbGVkMSA6IGNhbmNlbGVkMjtcblxuICAgICAgICBpZiAoIWJ5b2JDYW5jZWxlZCkge1xuICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbG9zZShieW9iQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3RoZXJDYW5jZWxlZCkge1xuICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbG9zZShvdGhlckJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaHVuayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXNzZXJ0KGNodW5rLmJ5dGVMZW5ndGggPT09IDApO1xuXG4gICAgICAgICAgaWYgKCFieW9iQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kV2l0aE5ld1ZpZXcoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghb3RoZXJDYW5jZWxlZCAmJiBvdGhlckJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kKG90aGVyQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYnlvYkNhbmNlbGVkIHx8ICFvdGhlckNhbmNlbGVkKSB7XG4gICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIF9lcnJvclN0ZXBzOiAoKSA9PiB7XG4gICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlclJlYWQocmVhZGVyLCB2aWV3LCByZWFkSW50b1JlcXVlc3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVsbDFBbGdvcml0aG0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHJlYWRpbmcpIHtcbiAgICAgIHJlYWRBZ2FpbkZvckJyYW5jaDEgPSB0cnVlO1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICByZWFkaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IGJ5b2JSZXF1ZXN0ID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldEJZT0JSZXF1ZXN0KGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgaWYgKGJ5b2JSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICBwdWxsV2l0aERlZmF1bHRSZWFkZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHVsbFdpdGhCWU9CUmVhZGVyKGJ5b2JSZXF1ZXN0Ll92aWV3ISwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gIH1cblxuICBmdW5jdGlvbiBwdWxsMkFsZ29yaXRobSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAocmVhZGluZykge1xuICAgICAgcmVhZEFnYWluRm9yQnJhbmNoMiA9IHRydWU7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJlYWRpbmcgPSB0cnVlO1xuXG4gICAgY29uc3QgYnlvYlJlcXVlc3QgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0QllPQlJlcXVlc3QoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICBpZiAoYnlvYlJlcXVlc3QgPT09IG51bGwpIHtcbiAgICAgIHB1bGxXaXRoRGVmYXVsdFJlYWRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwdWxsV2l0aEJZT0JSZWFkZXIoYnlvYlJlcXVlc3QuX3ZpZXchLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsMUFsZ29yaXRobShyZWFzb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNhbmNlbGVkMSA9IHRydWU7XG4gICAgcmVhc29uMSA9IHJlYXNvbjtcbiAgICBpZiAoY2FuY2VsZWQyKSB7XG4gICAgICBjb25zdCBjb21wb3NpdGVSZWFzb24gPSBDcmVhdGVBcnJheUZyb21MaXN0KFtyZWFzb24xLCByZWFzb24yXSk7XG4gICAgICBjb25zdCBjYW5jZWxSZXN1bHQgPSBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNvbXBvc2l0ZVJlYXNvbik7XG4gICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShjYW5jZWxSZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gY2FuY2VsUHJvbWlzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbDJBbGdvcml0aG0ocmVhc29uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjYW5jZWxlZDIgPSB0cnVlO1xuICAgIHJlYXNvbjIgPSByZWFzb247XG4gICAgaWYgKGNhbmNlbGVkMSkge1xuICAgICAgY29uc3QgY29tcG9zaXRlUmVhc29uID0gQ3JlYXRlQXJyYXlGcm9tTGlzdChbcmVhc29uMSwgcmVhc29uMl0pO1xuICAgICAgY29uc3QgY2FuY2VsUmVzdWx0ID0gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCBjb21wb3NpdGVSZWFzb24pO1xuICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UoY2FuY2VsUmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbmNlbFByb21pc2U7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEFsZ29yaXRobSgpOiB2b2lkIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBicmFuY2gxID0gQ3JlYXRlUmVhZGFibGVCeXRlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsMUFsZ29yaXRobSwgY2FuY2VsMUFsZ29yaXRobSk7XG4gIGJyYW5jaDIgPSBDcmVhdGVSZWFkYWJsZUJ5dGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHB1bGwyQWxnb3JpdGhtLCBjYW5jZWwyQWxnb3JpdGhtKTtcblxuICBmb3J3YXJkUmVhZGVyRXJyb3IocmVhZGVyKTtcblxuICByZXR1cm4gW2JyYW5jaDEsIGJyYW5jaDJdO1xufVxuIiwgImltcG9ydCB7IGFzc2VydERpY3Rpb25hcnksIGFzc2VydEZ1bmN0aW9uLCBjb252ZXJ0VW5zaWduZWRMb25nTG9uZ1dpdGhFbmZvcmNlUmFuZ2UgfSBmcm9tICcuL2Jhc2ljJztcbmltcG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtQ29udHJvbGxlcixcbiAgVW5kZXJseWluZ0J5dGVTb3VyY2UsXG4gIFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlLFxuICBVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZVB1bGxDYWxsYmFjayxcbiAgVW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2VTdGFydENhbGxiYWNrLFxuICBVbmRlcmx5aW5nU291cmNlLFxuICBVbmRlcmx5aW5nU291cmNlQ2FuY2VsQ2FsbGJhY2ssXG4gIFZhbGlkYXRlZFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlXG59IGZyb20gJy4uL3JlYWRhYmxlLXN0cmVhbS91bmRlcmx5aW5nLXNvdXJjZSc7XG5pbXBvcnQgeyBwcm9taXNlQ2FsbCwgcmVmbGVjdENhbGwgfSBmcm9tICcuLi9oZWxwZXJzL3dlYmlkbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2U8Uj4oXG4gIHNvdXJjZTogVW5kZXJseWluZ1NvdXJjZTxSPiB8IFVuZGVybHlpbmdCeXRlU291cmNlIHwgbnVsbCxcbiAgY29udGV4dDogc3RyaW5nXG4pOiBWYWxpZGF0ZWRVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZTxSPiB7XG4gIGFzc2VydERpY3Rpb25hcnkoc291cmNlLCBjb250ZXh0KTtcbiAgY29uc3Qgb3JpZ2luYWwgPSBzb3VyY2UgYXMgKFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlPFI+IHwgbnVsbCk7XG4gIGNvbnN0IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSA9IG9yaWdpbmFsPy5hdXRvQWxsb2NhdGVDaHVua1NpemU7XG4gIGNvbnN0IGNhbmNlbCA9IG9yaWdpbmFsPy5jYW5jZWw7XG4gIGNvbnN0IHB1bGwgPSBvcmlnaW5hbD8ucHVsbDtcbiAgY29uc3Qgc3RhcnQgPSBvcmlnaW5hbD8uc3RhcnQ7XG4gIGNvbnN0IHR5cGUgPSBvcmlnaW5hbD8udHlwZTtcbiAgcmV0dXJuIHtcbiAgICBhdXRvQWxsb2NhdGVDaHVua1NpemU6IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VW5zaWduZWRMb25nTG9uZ1dpdGhFbmZvcmNlUmFuZ2UoXG4gICAgICAgIGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSxcbiAgICAgICAgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnYXV0b0FsbG9jYXRlQ2h1bmtTaXplJyB0aGF0YFxuICAgICAgKSxcbiAgICBjYW5jZWw6IGNhbmNlbCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZUNhbmNlbENhbGxiYWNrKGNhbmNlbCwgb3JpZ2luYWwhLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdjYW5jZWwnIHRoYXRgKSxcbiAgICBwdWxsOiBwdWxsID09PSB1bmRlZmluZWQgP1xuICAgICAgdW5kZWZpbmVkIDpcbiAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlUHVsbENhbGxiYWNrKHB1bGwsIG9yaWdpbmFsISwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAncHVsbCcgdGhhdGApLFxuICAgIHN0YXJ0OiBzdGFydCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZVN0YXJ0Q2FsbGJhY2soc3RhcnQsIG9yaWdpbmFsISwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnc3RhcnQnIHRoYXRgKSxcbiAgICB0eXBlOiB0eXBlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBjb252ZXJ0UmVhZGFibGVTdHJlYW1UeXBlKHR5cGUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3R5cGUnIHRoYXRgKVxuICB9O1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZUNhbmNlbENhbGxiYWNrKFxuICBmbjogVW5kZXJseWluZ1NvdXJjZUNhbmNlbENhbGxiYWNrLFxuICBvcmlnaW5hbDogVW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2UsXG4gIGNvbnRleHQ6IHN0cmluZ1xuKTogKHJlYXNvbjogYW55KSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICByZXR1cm4gKHJlYXNvbjogYW55KSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtyZWFzb25dKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTb3VyY2VQdWxsQ2FsbGJhY2s8Uj4oXG4gIGZuOiBVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZVB1bGxDYWxsYmFjazxSPixcbiAgb3JpZ2luYWw6IFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlPFI+LFxuICBjb250ZXh0OiBzdHJpbmdcbik6IChjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXI8Uj4pID0+IFByb21pc2U8dm9pZD4ge1xuICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gIHJldHVybiAoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1Db250cm9sbGVyPFI+KSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlU3RhcnRDYWxsYmFjazxSPihcbiAgZm46IFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlU3RhcnRDYWxsYmFjazxSPixcbiAgb3JpZ2luYWw6IFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlPFI+LFxuICBjb250ZXh0OiBzdHJpbmdcbik6IFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlU3RhcnRDYWxsYmFjazxSPiB7XG4gIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgcmV0dXJuIChjb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXI8Uj4pID0+IHJlZmxlY3RDYWxsKGZuLCBvcmlnaW5hbCwgW2NvbnRyb2xsZXJdKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFJlYWRhYmxlU3RyZWFtVHlwZSh0eXBlOiBzdHJpbmcsIGNvbnRleHQ6IHN0cmluZyk6ICdieXRlcycge1xuICB0eXBlID0gYCR7dHlwZX1gO1xuICBpZiAodHlwZSAhPT0gJ2J5dGVzJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gJyR7dHlwZX0nIGlzIG5vdCBhIHZhbGlkIGVudW1lcmF0aW9uIHZhbHVlIGZvciBSZWFkYWJsZVN0cmVhbVR5cGVgKTtcbiAgfVxuICByZXR1cm4gdHlwZTtcbn1cbiIsICJpbXBvcnQgeyBhc3NlcnREaWN0aW9uYXJ5IH0gZnJvbSAnLi9iYXNpYyc7XG5pbXBvcnQgeyBSZWFkYWJsZVN0cmVhbUdldFJlYWRlck9wdGlvbnMgfSBmcm9tICcuLi9yZWFkYWJsZS1zdHJlYW0vcmVhZGVyLW9wdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFJlYWRlck9wdGlvbnMob3B0aW9uczogUmVhZGFibGVTdHJlYW1HZXRSZWFkZXJPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBzdHJpbmcpOiBSZWFkYWJsZVN0cmVhbUdldFJlYWRlck9wdGlvbnMge1xuICBhc3NlcnREaWN0aW9uYXJ5KG9wdGlvbnMsIGNvbnRleHQpO1xuICBjb25zdCBtb2RlID0gb3B0aW9ucz8ubW9kZTtcbiAgcmV0dXJuIHtcbiAgICBtb2RlOiBtb2RlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBjb252ZXJ0UmVhZGFibGVTdHJlYW1SZWFkZXJNb2RlKG1vZGUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ21vZGUnIHRoYXRgKVxuICB9O1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0UmVhZGFibGVTdHJlYW1SZWFkZXJNb2RlKG1vZGU6IHN0cmluZywgY29udGV4dDogc3RyaW5nKTogJ2J5b2InIHtcbiAgbW9kZSA9IGAke21vZGV9YDtcbiAgaWYgKG1vZGUgIT09ICdieW9iJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gJyR7bW9kZX0nIGlzIG5vdCBhIHZhbGlkIGVudW1lcmF0aW9uIHZhbHVlIGZvciBSZWFkYWJsZVN0cmVhbVJlYWRlck1vZGVgKTtcbiAgfVxuICByZXR1cm4gbW9kZTtcbn1cbiIsICJpbXBvcnQgeyBhc3NlcnREaWN0aW9uYXJ5IH0gZnJvbSAnLi9iYXNpYyc7XG5pbXBvcnQge1xuICBSZWFkYWJsZVN0cmVhbUl0ZXJhdG9yT3B0aW9ucyxcbiAgVmFsaWRhdGVkUmVhZGFibGVTdHJlYW1JdGVyYXRvck9wdGlvbnNcbn0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtL2l0ZXJhdG9yLW9wdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEl0ZXJhdG9yT3B0aW9ucyhvcHRpb25zOiBSZWFkYWJsZVN0cmVhbUl0ZXJhdG9yT3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBzdHJpbmcpOiBWYWxpZGF0ZWRSZWFkYWJsZVN0cmVhbUl0ZXJhdG9yT3B0aW9ucyB7XG4gIGFzc2VydERpY3Rpb25hcnkob3B0aW9ucywgY29udGV4dCk7XG4gIGNvbnN0IHByZXZlbnRDYW5jZWwgPSBvcHRpb25zPy5wcmV2ZW50Q2FuY2VsO1xuICByZXR1cm4geyBwcmV2ZW50Q2FuY2VsOiBCb29sZWFuKHByZXZlbnRDYW5jZWwpIH07XG59XG4iLCAiaW1wb3J0IHsgYXNzZXJ0RGljdGlvbmFyeSB9IGZyb20gJy4vYmFzaWMnO1xuaW1wb3J0IHsgU3RyZWFtUGlwZU9wdGlvbnMsIFZhbGlkYXRlZFN0cmVhbVBpcGVPcHRpb25zIH0gZnJvbSAnLi4vcmVhZGFibGUtc3RyZWFtL3BpcGUtb3B0aW9ucyc7XG5pbXBvcnQgeyBBYm9ydFNpZ25hbCwgaXNBYm9ydFNpZ25hbCB9IGZyb20gJy4uL2Fib3J0LXNpZ25hbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0UGlwZU9wdGlvbnMob3B0aW9uczogU3RyZWFtUGlwZU9wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBzdHJpbmcpOiBWYWxpZGF0ZWRTdHJlYW1QaXBlT3B0aW9ucyB7XG4gIGFzc2VydERpY3Rpb25hcnkob3B0aW9ucywgY29udGV4dCk7XG4gIGNvbnN0IHByZXZlbnRBYm9ydCA9IG9wdGlvbnM/LnByZXZlbnRBYm9ydDtcbiAgY29uc3QgcHJldmVudENhbmNlbCA9IG9wdGlvbnM/LnByZXZlbnRDYW5jZWw7XG4gIGNvbnN0IHByZXZlbnRDbG9zZSA9IG9wdGlvbnM/LnByZXZlbnRDbG9zZTtcbiAgY29uc3Qgc2lnbmFsID0gb3B0aW9ucz8uc2lnbmFsO1xuICBpZiAoc2lnbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICBhc3NlcnRBYm9ydFNpZ25hbChzaWduYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3NpZ25hbCcgdGhhdGApO1xuICB9XG4gIHJldHVybiB7XG4gICAgcHJldmVudEFib3J0OiBCb29sZWFuKHByZXZlbnRBYm9ydCksXG4gICAgcHJldmVudENhbmNlbDogQm9vbGVhbihwcmV2ZW50Q2FuY2VsKSxcbiAgICBwcmV2ZW50Q2xvc2U6IEJvb2xlYW4ocHJldmVudENsb3NlKSxcbiAgICBzaWduYWxcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0QWJvcnRTaWduYWwoc2lnbmFsOiB1bmtub3duLCBjb250ZXh0OiBzdHJpbmcpOiBhc3NlcnRzIHNpZ25hbCBpcyBBYm9ydFNpZ25hbCB7XG4gIGlmICghaXNBYm9ydFNpZ25hbChzaWduYWwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYW4gQWJvcnRTaWduYWwuYCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBhc3NlcnREaWN0aW9uYXJ5LCBhc3NlcnRSZXF1aXJlZEZpZWxkIH0gZnJvbSAnLi9iYXNpYyc7XG5pbXBvcnQgeyBSZWFkYWJsZVN0cmVhbSB9IGZyb20gJy4uL3JlYWRhYmxlLXN0cmVhbSc7XG5pbXBvcnQgeyBXcml0YWJsZVN0cmVhbSB9IGZyb20gJy4uL3dyaXRhYmxlLXN0cmVhbSc7XG5pbXBvcnQgeyBhc3NlcnRSZWFkYWJsZVN0cmVhbSB9IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtJztcbmltcG9ydCB7IGFzc2VydFdyaXRhYmxlU3RyZWFtIH0gZnJvbSAnLi93cml0YWJsZS1zdHJlYW0nO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFJlYWRhYmxlV3JpdGFibGVQYWlyPFJTIGV4dGVuZHMgUmVhZGFibGVTdHJlYW0sIFdTIGV4dGVuZHMgV3JpdGFibGVTdHJlYW0+KFxuICBwYWlyOiB7IHJlYWRhYmxlOiBSUzsgd3JpdGFibGU6IFdTIH0gfCBudWxsIHwgdW5kZWZpbmVkLFxuICBjb250ZXh0OiBzdHJpbmdcbik6IHsgcmVhZGFibGU6IFJTOyB3cml0YWJsZTogV1MgfSB7XG4gIGFzc2VydERpY3Rpb25hcnkocGFpciwgY29udGV4dCk7XG5cbiAgY29uc3QgcmVhZGFibGUgPSBwYWlyPy5yZWFkYWJsZTtcbiAgYXNzZXJ0UmVxdWlyZWRGaWVsZChyZWFkYWJsZSwgJ3JlYWRhYmxlJywgJ1JlYWRhYmxlV3JpdGFibGVQYWlyJyk7XG4gIGFzc2VydFJlYWRhYmxlU3RyZWFtKHJlYWRhYmxlLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdyZWFkYWJsZScgdGhhdGApO1xuXG4gIGNvbnN0IHdyaXRhYmxlID0gcGFpcj8ud3JpdGFibGU7XG4gIGFzc2VydFJlcXVpcmVkRmllbGQod3JpdGFibGUsICd3cml0YWJsZScsICdSZWFkYWJsZVdyaXRhYmxlUGFpcicpO1xuICBhc3NlcnRXcml0YWJsZVN0cmVhbSh3cml0YWJsZSwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnd3JpdGFibGUnIHRoYXRgKTtcblxuICByZXR1cm4geyByZWFkYWJsZSwgd3JpdGFibGUgfTtcbn1cbiIsICJpbXBvcnQgYXNzZXJ0IGZyb20gJy4uL3N0dWIvYXNzZXJ0JztcbmltcG9ydCB7XG4gIHByb21pc2VSZWplY3RlZFdpdGgsXG4gIHByb21pc2VSZXNvbHZlZFdpdGgsXG4gIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUsXG4gIHRyYW5zZm9ybVByb21pc2VXaXRoXG59IGZyb20gJy4vaGVscGVycy93ZWJpZGwnO1xuaW1wb3J0IHsgUXVldWluZ1N0cmF0ZWd5LCBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2sgfSBmcm9tICcuL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IHsgQWNxdWlyZVJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvciwgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yIH0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vYXN5bmMtaXRlcmF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZWplY3QsIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVzb2x2ZSB9IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL2dlbmVyaWMtcmVhZGVyJztcbmltcG9ydCB7XG4gIEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIsXG4gIElzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRSZXN1bHRcbn0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vZGVmYXVsdC1yZWFkZXInO1xuaW1wb3J0IHtcbiAgQWNxdWlyZVJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcixcbiAgSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIsXG4gIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcixcbiAgUmVhZGFibGVTdHJlYW1CWU9CUmVhZFJlc3VsdFxufSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbS9ieW9iLXJlYWRlcic7XG5pbXBvcnQgeyBSZWFkYWJsZVN0cmVhbVBpcGVUbyB9IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL3BpcGUnO1xuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW1UZWUgfSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbS90ZWUnO1xuaW1wb3J0IHsgSXNXcml0YWJsZVN0cmVhbSwgSXNXcml0YWJsZVN0cmVhbUxvY2tlZCwgV3JpdGFibGVTdHJlYW0gfSBmcm9tICcuL3dyaXRhYmxlLXN0cmVhbSc7XG5pbXBvcnQgeyBTaW1wbGVRdWV1ZSB9IGZyb20gJy4vc2ltcGxlLXF1ZXVlJztcbmltcG9ydCB7XG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsXG4gIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QsXG4gIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcixcbiAgU2V0VXBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRnJvbVVuZGVybHlpbmdTb3VyY2Vcbn0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vYnl0ZS1zdHJlYW0tY29udHJvbGxlcic7XG5pbXBvcnQge1xuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLFxuICBTZXRVcFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIsXG4gIFNldFVwUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21VbmRlcmx5aW5nU291cmNlXG59IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL2RlZmF1bHQtY29udHJvbGxlcic7XG5pbXBvcnQge1xuICBVbmRlcmx5aW5nQnl0ZVNvdXJjZSxcbiAgVW5kZXJseWluZ0J5dGVTb3VyY2VQdWxsQ2FsbGJhY2ssXG4gIFVuZGVybHlpbmdCeXRlU291cmNlU3RhcnRDYWxsYmFjayxcbiAgVW5kZXJseWluZ1NvdXJjZSxcbiAgVW5kZXJseWluZ1NvdXJjZUNhbmNlbENhbGxiYWNrLFxuICBVbmRlcmx5aW5nU291cmNlUHVsbENhbGxiYWNrLFxuICBVbmRlcmx5aW5nU291cmNlU3RhcnRDYWxsYmFja1xufSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbS91bmRlcmx5aW5nLXNvdXJjZSc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgdHlwZUlzT2JqZWN0IH0gZnJvbSAnLi9oZWxwZXJzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHsgQ3JlYXRlQXJyYXlGcm9tTGlzdCB9IGZyb20gJy4vYWJzdHJhY3Qtb3BzL2VjbWFzY3JpcHQnO1xuaW1wb3J0IHsgQ2FuY2VsU3RlcHMgfSBmcm9tICcuL2Fic3RyYWN0LW9wcy9pbnRlcm5hbC1tZXRob2RzJztcbmltcG9ydCB7IElzTm9uTmVnYXRpdmVOdW1iZXIgfSBmcm9tICcuL2Fic3RyYWN0LW9wcy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IGFzc2VydE9iamVjdCwgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudCB9IGZyb20gJy4vdmFsaWRhdG9ycy9iYXNpYyc7XG5pbXBvcnQgeyBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5IH0gZnJvbSAnLi92YWxpZGF0b3JzL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IHsgRXh0cmFjdEhpZ2hXYXRlck1hcmssIEV4dHJhY3RTaXplQWxnb3JpdGhtIH0gZnJvbSAnLi9hYnN0cmFjdC1vcHMvcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyBjb252ZXJ0VW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2UgfSBmcm9tICcuL3ZhbGlkYXRvcnMvdW5kZXJseWluZy1zb3VyY2UnO1xuaW1wb3J0IHsgUmVhZGFibGVTdHJlYW1HZXRSZWFkZXJPcHRpb25zIH0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vcmVhZGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgY29udmVydFJlYWRlck9wdGlvbnMgfSBmcm9tICcuL3ZhbGlkYXRvcnMvcmVhZGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgU3RyZWFtUGlwZU9wdGlvbnMsIFZhbGlkYXRlZFN0cmVhbVBpcGVPcHRpb25zIH0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vcGlwZS1vcHRpb25zJztcbmltcG9ydCB7IFJlYWRhYmxlU3RyZWFtSXRlcmF0b3JPcHRpb25zIH0gZnJvbSAnLi9yZWFkYWJsZS1zdHJlYW0vaXRlcmF0b3Itb3B0aW9ucyc7XG5pbXBvcnQgeyBjb252ZXJ0SXRlcmF0b3JPcHRpb25zIH0gZnJvbSAnLi92YWxpZGF0b3JzL2l0ZXJhdG9yLW9wdGlvbnMnO1xuaW1wb3J0IHsgY29udmVydFBpcGVPcHRpb25zIH0gZnJvbSAnLi92YWxpZGF0b3JzL3BpcGUtb3B0aW9ucyc7XG5pbXBvcnQgeyBSZWFkYWJsZVdyaXRhYmxlUGFpciB9IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL3JlYWRhYmxlLXdyaXRhYmxlLXBhaXInO1xuaW1wb3J0IHsgY29udmVydFJlYWRhYmxlV3JpdGFibGVQYWlyIH0gZnJvbSAnLi92YWxpZGF0b3JzL3JlYWRhYmxlLXdyaXRhYmxlLXBhaXInO1xuXG5leHBvcnQgdHlwZSBSZWFkYWJsZUJ5dGVTdHJlYW0gPSBSZWFkYWJsZVN0cmVhbTxVaW50OEFycmF5PiAmIHtcbiAgX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcjogUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclxufTtcblxudHlwZSBSZWFkYWJsZVN0cmVhbVN0YXRlID0gJ3JlYWRhYmxlJyB8ICdjbG9zZWQnIHwgJ2Vycm9yZWQnO1xuXG4vKipcbiAqIEEgcmVhZGFibGUgc3RyZWFtIHJlcHJlc2VudHMgYSBzb3VyY2Ugb2YgZGF0YSwgZnJvbSB3aGljaCB5b3UgY2FuIHJlYWQuXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY2xhc3MgUmVhZGFibGVTdHJlYW08UiA9IGFueT4ge1xuICAvKiogQGludGVybmFsICovXG4gIF9zdGF0ZSE6IFJlYWRhYmxlU3RyZWFtU3RhdGU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRlcjogUmVhZGFibGVTdHJlYW1SZWFkZXI8Uj4gfCB1bmRlZmluZWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0b3JlZEVycm9yOiBhbnk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Rpc3R1cmJlZCE6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciE6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4gfCBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKHVuZGVybHlpbmdTb3VyY2U6IFVuZGVybHlpbmdCeXRlU291cmNlLCBzdHJhdGVneT86IHsgaGlnaFdhdGVyTWFyaz86IG51bWJlcjsgc2l6ZT86IHVuZGVmaW5lZCB9KTtcbiAgY29uc3RydWN0b3IodW5kZXJseWluZ1NvdXJjZT86IFVuZGVybHlpbmdTb3VyY2U8Uj4sIHN0cmF0ZWd5PzogUXVldWluZ1N0cmF0ZWd5PFI+KTtcbiAgY29uc3RydWN0b3IocmF3VW5kZXJseWluZ1NvdXJjZTogVW5kZXJseWluZ1NvdXJjZTxSPiB8IFVuZGVybHlpbmdCeXRlU291cmNlIHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9LFxuICAgICAgICAgICAgICByYXdTdHJhdGVneTogUXVldWluZ1N0cmF0ZWd5PFI+IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9KSB7XG4gICAgaWYgKHJhd1VuZGVybHlpbmdTb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmF3VW5kZXJseWluZ1NvdXJjZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydE9iamVjdChyYXdVbmRlcmx5aW5nU291cmNlLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyYXRlZ3kgPSBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5KHJhd1N0cmF0ZWd5LCAnU2Vjb25kIHBhcmFtZXRlcicpO1xuICAgIGNvbnN0IHVuZGVybHlpbmdTb3VyY2UgPSBjb252ZXJ0VW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2UocmF3VW5kZXJseWluZ1NvdXJjZSwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuXG4gICAgSW5pdGlhbGl6ZVJlYWRhYmxlU3RyZWFtKHRoaXMpO1xuXG4gICAgaWYgKHVuZGVybHlpbmdTb3VyY2UudHlwZSA9PT0gJ2J5dGVzJykge1xuICAgICAgaWYgKHN0cmF0ZWd5LnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHN0cmF0ZWd5IGZvciBhIGJ5dGUgc3RyZWFtIGNhbm5vdCBoYXZlIGEgc2l6ZSBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgICAgY29uc3QgaGlnaFdhdGVyTWFyayA9IEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHN0cmF0ZWd5LCAwKTtcbiAgICAgIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZyb21VbmRlcmx5aW5nU291cmNlKFxuICAgICAgICB0aGlzIGFzIHVua25vd24gYXMgUmVhZGFibGVCeXRlU3RyZWFtLFxuICAgICAgICB1bmRlcmx5aW5nU291cmNlLFxuICAgICAgICBoaWdoV2F0ZXJNYXJrXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQodW5kZXJseWluZ1NvdXJjZS50eXBlID09PSB1bmRlZmluZWQpO1xuICAgICAgY29uc3Qgc2l6ZUFsZ29yaXRobSA9IEV4dHJhY3RTaXplQWxnb3JpdGhtKHN0cmF0ZWd5KTtcbiAgICAgIGNvbnN0IGhpZ2hXYXRlck1hcmsgPSBFeHRyYWN0SGlnaFdhdGVyTWFyayhzdHJhdGVneSwgMSk7XG4gICAgICBTZXRVcFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NvdXJjZShcbiAgICAgICAgdGhpcyxcbiAgICAgICAgdW5kZXJseWluZ1NvdXJjZSxcbiAgICAgICAgaGlnaFdhdGVyTWFyayxcbiAgICAgICAgc2l6ZUFsZ29yaXRobVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIHJlYWRhYmxlIHN0cmVhbSBpcyBsb2NrZWQgdG8gYSB7QGxpbmsgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyIHwgcmVhZGVyfS5cbiAgICovXG4gIGdldCBsb2NrZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICB0aHJvdyBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uKCdsb2NrZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSXNSZWFkYWJsZVN0cmVhbUxvY2tlZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIHRoZSBzdHJlYW0sIHNpZ25hbGluZyBhIGxvc3Mgb2YgaW50ZXJlc3QgaW4gdGhlIHN0cmVhbSBieSBhIGNvbnN1bWVyLlxuICAgKlxuICAgKiBUaGUgc3VwcGxpZWQgYHJlYXNvbmAgYXJndW1lbnQgd2lsbCBiZSBnaXZlbiB0byB0aGUgdW5kZXJseWluZyBzb3VyY2UncyB7QGxpbmsgVW5kZXJseWluZ1NvdXJjZS5jYW5jZWwgfCBjYW5jZWwoKX1cbiAgICogbWV0aG9kLCB3aGljaCBtaWdodCBvciBtaWdodCBub3QgdXNlIGl0LlxuICAgKi9cbiAgY2FuY2VsKHJlYXNvbjogYW55ID0gdW5kZWZpbmVkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uKCdjYW5jZWwnKSk7XG4gICAgfVxuXG4gICAgaWYgKElzUmVhZGFibGVTdHJlYW1Mb2NrZWQodGhpcykpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYW5jZWwgYSBzdHJlYW0gdGhhdCBhbHJlYWR5IGhhcyBhIHJlYWRlcicpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1DYW5jZWwodGhpcywgcmVhc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcn0gYW5kIGxvY2tzIHRoZSBzdHJlYW0gdG8gdGhlIG5ldyByZWFkZXIuXG4gICAqXG4gICAqIFRoaXMgY2FsbCBiZWhhdmVzIHRoZSBzYW1lIHdheSBhcyB0aGUgbm8tYXJndW1lbnQgdmFyaWFudCwgZXhjZXB0IHRoYXQgaXQgb25seSB3b3JrcyBvbiByZWFkYWJsZSBieXRlIHN0cmVhbXMsXG4gICAqIGkuZS4gc3RyZWFtcyB3aGljaCB3ZXJlIGNvbnN0cnVjdGVkIHNwZWNpZmljYWxseSB3aXRoIHRoZSBhYmlsaXR5IHRvIGhhbmRsZSBcImJyaW5nIHlvdXIgb3duIGJ1ZmZlclwiIHJlYWRpbmcuXG4gICAqIFRoZSByZXR1cm5lZCBCWU9CIHJlYWRlciBwcm92aWRlcyB0aGUgYWJpbGl0eSB0byBkaXJlY3RseSByZWFkIGluZGl2aWR1YWwgY2h1bmtzIGZyb20gdGhlIHN0cmVhbSB2aWEgaXRzXG4gICAqIHtAbGluayBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIucmVhZCB8IHJlYWQoKX0gbWV0aG9kLCBpbnRvIGRldmVsb3Blci1zdXBwbGllZCBidWZmZXJzLCBhbGxvd2luZyBtb3JlIHByZWNpc2VcbiAgICogY29udHJvbCBvdmVyIGFsbG9jYXRpb24uXG4gICAqL1xuICBnZXRSZWFkZXIoeyBtb2RlIH06IHsgbW9kZTogJ2J5b2InIH0pOiBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXI7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcn0gYW5kIGxvY2tzIHRoZSBzdHJlYW0gdG8gdGhlIG5ldyByZWFkZXIuXG4gICAqIFdoaWxlIHRoZSBzdHJlYW0gaXMgbG9ja2VkLCBubyBvdGhlciByZWFkZXIgY2FuIGJlIGFjcXVpcmVkIHVudGlsIHRoaXMgb25lIGlzIHJlbGVhc2VkLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uYWxpdHkgaXMgZXNwZWNpYWxseSB1c2VmdWwgZm9yIGNyZWF0aW5nIGFic3RyYWN0aW9ucyB0aGF0IGRlc2lyZSB0aGUgYWJpbGl0eSB0byBjb25zdW1lIGEgc3RyZWFtXG4gICAqIGluIGl0cyBlbnRpcmV0eS4gQnkgZ2V0dGluZyBhIHJlYWRlciBmb3IgdGhlIHN0cmVhbSwgeW91IGNhbiBlbnN1cmUgbm9ib2R5IGVsc2UgY2FuIGludGVybGVhdmUgcmVhZHMgd2l0aCB5b3Vyc1xuICAgKiBvciBjYW5jZWwgdGhlIHN0cmVhbSwgd2hpY2ggd291bGQgaW50ZXJmZXJlIHdpdGggeW91ciBhYnN0cmFjdGlvbi5cbiAgICovXG4gIGdldFJlYWRlcigpOiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj47XG4gIGdldFJlYWRlcihcbiAgICByYXdPcHRpb25zOiBSZWFkYWJsZVN0cmVhbUdldFJlYWRlck9wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG4gICk6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPiB8IFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlciB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICB0aHJvdyBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uKCdnZXRSZWFkZXInKTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0gY29udmVydFJlYWRlck9wdGlvbnMocmF3T3B0aW9ucywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuXG4gICAgaWYgKG9wdGlvbnMubW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih0aGlzKTtcbiAgICB9XG5cbiAgICBhc3NlcnQob3B0aW9ucy5tb2RlID09PSAnYnlvYicpO1xuICAgIHJldHVybiBBY3F1aXJlUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHRoaXMgYXMgdW5rbm93biBhcyBSZWFkYWJsZUJ5dGVTdHJlYW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGEgY29udmVuaWVudCwgY2hhaW5hYmxlIHdheSBvZiBwaXBpbmcgdGhpcyByZWFkYWJsZSBzdHJlYW0gdGhyb3VnaCBhIHRyYW5zZm9ybSBzdHJlYW1cbiAgICogKG9yIGFueSBvdGhlciBgeyB3cml0YWJsZSwgcmVhZGFibGUgfWAgcGFpcikuIEl0IHNpbXBseSB7QGxpbmsgUmVhZGFibGVTdHJlYW0ucGlwZVRvIHwgcGlwZXN9IHRoZSBzdHJlYW1cbiAgICogaW50byB0aGUgd3JpdGFibGUgc2lkZSBvZiB0aGUgc3VwcGxpZWQgcGFpciwgYW5kIHJldHVybnMgdGhlIHJlYWRhYmxlIHNpZGUgZm9yIGZ1cnRoZXIgdXNlLlxuICAgKlxuICAgKiBQaXBpbmcgYSBzdHJlYW0gd2lsbCBsb2NrIGl0IGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIHBpcGUsIHByZXZlbnRpbmcgYW55IG90aGVyIGNvbnN1bWVyIGZyb20gYWNxdWlyaW5nIGEgcmVhZGVyLlxuICAgKi9cbiAgcGlwZVRocm91Z2g8UlMgZXh0ZW5kcyBSZWFkYWJsZVN0cmVhbT4oXG4gICAgdHJhbnNmb3JtOiB7IHJlYWRhYmxlOiBSUzsgd3JpdGFibGU6IFdyaXRhYmxlU3RyZWFtPFI+IH0sXG4gICAgb3B0aW9ucz86IFN0cmVhbVBpcGVPcHRpb25zXG4gICk6IFJTO1xuICBwaXBlVGhyb3VnaDxSUyBleHRlbmRzIFJlYWRhYmxlU3RyZWFtPihcbiAgICByYXdUcmFuc2Zvcm06IHsgcmVhZGFibGU6IFJTOyB3cml0YWJsZTogV3JpdGFibGVTdHJlYW08Uj4gfSB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgcmF3T3B0aW9uczogU3RyZWFtUGlwZU9wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkID0ge31cbiAgKTogUlMge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbigncGlwZVRocm91Z2gnKTtcbiAgICB9XG4gICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChyYXdUcmFuc2Zvcm0sIDEsICdwaXBlVGhyb3VnaCcpO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtID0gY29udmVydFJlYWRhYmxlV3JpdGFibGVQYWlyKHJhd1RyYW5zZm9ybSwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb252ZXJ0UGlwZU9wdGlvbnMocmF3T3B0aW9ucywgJ1NlY29uZCBwYXJhbWV0ZXInKTtcblxuICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUucGlwZVRocm91Z2ggY2Fubm90IGJlIHVzZWQgb24gYSBsb2NrZWQgUmVhZGFibGVTdHJlYW0nKTtcbiAgICB9XG4gICAgaWYgKElzV3JpdGFibGVTdHJlYW1Mb2NrZWQodHJhbnNmb3JtLndyaXRhYmxlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnBpcGVUaHJvdWdoIGNhbm5vdCBiZSB1c2VkIG9uIGEgbG9ja2VkIFdyaXRhYmxlU3RyZWFtJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IFJlYWRhYmxlU3RyZWFtUGlwZVRvKFxuICAgICAgdGhpcywgdHJhbnNmb3JtLndyaXRhYmxlLCBvcHRpb25zLnByZXZlbnRDbG9zZSwgb3B0aW9ucy5wcmV2ZW50QWJvcnQsIG9wdGlvbnMucHJldmVudENhbmNlbCwgb3B0aW9ucy5zaWduYWxcbiAgICApO1xuXG4gICAgc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZShwcm9taXNlKTtcblxuICAgIHJldHVybiB0cmFuc2Zvcm0ucmVhZGFibGU7XG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgdGhpcyByZWFkYWJsZSBzdHJlYW0gdG8gYSBnaXZlbiB3cml0YWJsZSBzdHJlYW0uIFRoZSB3YXkgaW4gd2hpY2ggdGhlIHBpcGluZyBwcm9jZXNzIGJlaGF2ZXMgdW5kZXJcbiAgICogdmFyaW91cyBlcnJvciBjb25kaXRpb25zIGNhbiBiZSBjdXN0b21pemVkIHdpdGggYSBudW1iZXIgb2YgcGFzc2VkIG9wdGlvbnMuIEl0IHJldHVybnMgYSBwcm9taXNlIHRoYXQgZnVsZmlsbHNcbiAgICogd2hlbiB0aGUgcGlwaW5nIHByb2Nlc3MgY29tcGxldGVzIHN1Y2Nlc3NmdWxseSwgb3IgcmVqZWN0cyBpZiBhbnkgZXJyb3JzIHdlcmUgZW5jb3VudGVyZWQuXG4gICAqXG4gICAqIFBpcGluZyBhIHN0cmVhbSB3aWxsIGxvY2sgaXQgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgcGlwZSwgcHJldmVudGluZyBhbnkgb3RoZXIgY29uc3VtZXIgZnJvbSBhY3F1aXJpbmcgYSByZWFkZXIuXG4gICAqL1xuICBwaXBlVG8oZGVzdGluYXRpb246IFdyaXRhYmxlU3RyZWFtPFI+LCBvcHRpb25zPzogU3RyZWFtUGlwZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuICBwaXBlVG8oZGVzdGluYXRpb246IFdyaXRhYmxlU3RyZWFtPFI+IHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICAgICAgIHJhd09wdGlvbnM6IFN0cmVhbVBpcGVPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uKCdwaXBlVG8nKSk7XG4gICAgfVxuXG4gICAgaWYgKGRlc3RpbmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGBQYXJhbWV0ZXIgMSBpcyByZXF1aXJlZCBpbiAncGlwZVRvJy5gKTtcbiAgICB9XG4gICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtKGRlc3RpbmF0aW9uKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoXG4gICAgICAgIG5ldyBUeXBlRXJyb3IoYFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS5waXBlVG8ncyBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgV3JpdGFibGVTdHJlYW1gKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0aW9uczogVmFsaWRhdGVkU3RyZWFtUGlwZU9wdGlvbnM7XG4gICAgdHJ5IHtcbiAgICAgIG9wdGlvbnMgPSBjb252ZXJ0UGlwZU9wdGlvbnMocmF3T3B0aW9ucywgJ1NlY29uZCBwYXJhbWV0ZXInKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChlKTtcbiAgICB9XG5cbiAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUxvY2tlZCh0aGlzKSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoXG4gICAgICAgIG5ldyBUeXBlRXJyb3IoJ1JlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS5waXBlVG8gY2Fubm90IGJlIHVzZWQgb24gYSBsb2NrZWQgUmVhZGFibGVTdHJlYW0nKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKElzV3JpdGFibGVTdHJlYW1Mb2NrZWQoZGVzdGluYXRpb24pKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChcbiAgICAgICAgbmV3IFR5cGVFcnJvcignUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnBpcGVUbyBjYW5ub3QgYmUgdXNlZCBvbiBhIGxvY2tlZCBXcml0YWJsZVN0cmVhbScpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbVBpcGVUbzxSPihcbiAgICAgIHRoaXMsIGRlc3RpbmF0aW9uLCBvcHRpb25zLnByZXZlbnRDbG9zZSwgb3B0aW9ucy5wcmV2ZW50QWJvcnQsIG9wdGlvbnMucHJldmVudENhbmNlbCwgb3B0aW9ucy5zaWduYWxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlZXMgdGhpcyByZWFkYWJsZSBzdHJlYW0sIHJldHVybmluZyBhIHR3by1lbGVtZW50IGFycmF5IGNvbnRhaW5pbmcgdGhlIHR3byByZXN1bHRpbmcgYnJhbmNoZXMgYXNcbiAgICogbmV3IHtAbGluayBSZWFkYWJsZVN0cmVhbX0gaW5zdGFuY2VzLlxuICAgKlxuICAgKiBUZWVpbmcgYSBzdHJlYW0gd2lsbCBsb2NrIGl0LCBwcmV2ZW50aW5nIGFueSBvdGhlciBjb25zdW1lciBmcm9tIGFjcXVpcmluZyBhIHJlYWRlci5cbiAgICogVG8gY2FuY2VsIHRoZSBzdHJlYW0sIGNhbmNlbCBib3RoIG9mIHRoZSByZXN1bHRpbmcgYnJhbmNoZXM7IGEgY29tcG9zaXRlIGNhbmNlbGxhdGlvbiByZWFzb24gd2lsbCB0aGVuIGJlXG4gICAqIHByb3BhZ2F0ZWQgdG8gdGhlIHN0cmVhbSdzIHVuZGVybHlpbmcgc291cmNlLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIGNodW5rcyBzZWVuIGluIGVhY2ggYnJhbmNoIHdpbGwgYmUgdGhlIHNhbWUgb2JqZWN0LiBJZiB0aGUgY2h1bmtzIGFyZSBub3QgaW1tdXRhYmxlLFxuICAgKiB0aGlzIGNvdWxkIGFsbG93IGludGVyZmVyZW5jZSBiZXR3ZWVuIHRoZSB0d28gYnJhbmNoZXMuXG4gICAqL1xuICB0ZWUoKTogW1JlYWRhYmxlU3RyZWFtPFI+LCBSZWFkYWJsZVN0cmVhbTxSPl0ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbigndGVlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgYnJhbmNoZXMgPSBSZWFkYWJsZVN0cmVhbVRlZSh0aGlzLCBmYWxzZSk7XG4gICAgcmV0dXJuIENyZWF0ZUFycmF5RnJvbUxpc3QoYnJhbmNoZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzeW5jaHJvbm91c2x5IGl0ZXJhdGVzIG92ZXIgdGhlIGNodW5rcyBpbiB0aGUgc3RyZWFtJ3MgaW50ZXJuYWwgcXVldWUuXG4gICAqXG4gICAqIEFzeW5jaHJvbm91c2x5IGl0ZXJhdGluZyBvdmVyIHRoZSBzdHJlYW0gd2lsbCBsb2NrIGl0LCBwcmV2ZW50aW5nIGFueSBvdGhlciBjb25zdW1lciBmcm9tIGFjcXVpcmluZyBhIHJlYWRlci5cbiAgICogVGhlIGxvY2sgd2lsbCBiZSByZWxlYXNlZCBpZiB0aGUgYXN5bmMgaXRlcmF0b3IncyB7QGxpbmsgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yLnJldHVybiB8IHJldHVybigpfSBtZXRob2RcbiAgICogaXMgY2FsbGVkLCBlLmcuIGJ5IGJyZWFraW5nIG91dCBvZiB0aGUgbG9vcC5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgY2FsbGluZyB0aGUgYXN5bmMgaXRlcmF0b3IncyB7QGxpbmsgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yLnJldHVybiB8IHJldHVybigpfSBtZXRob2Qgd2lsbCBhbHNvXG4gICAqIGNhbmNlbCB0aGUgc3RyZWFtLiBUbyBwcmV2ZW50IHRoaXMsIHVzZSB0aGUgc3RyZWFtJ3Mge0BsaW5rIFJlYWRhYmxlU3RyZWFtLnZhbHVlcyB8IHZhbHVlcygpfSBtZXRob2QsIHBhc3NpbmdcbiAgICogYHRydWVgIGZvciB0aGUgYHByZXZlbnRDYW5jZWxgIG9wdGlvbi5cbiAgICovXG4gIHZhbHVlcyhvcHRpb25zPzogUmVhZGFibGVTdHJlYW1JdGVyYXRvck9wdGlvbnMpOiBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8Uj47XG4gIHZhbHVlcyhyYXdPcHRpb25zOiBSZWFkYWJsZVN0cmVhbUl0ZXJhdG9yT3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I8Uj4ge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbigndmFsdWVzJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IGNvbnZlcnRJdGVyYXRvck9wdGlvbnMocmF3T3B0aW9ucywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgIHJldHVybiBBY3F1aXJlUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yPFI+KHRoaXMsIG9wdGlvbnMucHJldmVudENhbmNlbCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFJlYWRhYmxlU3RyZWFtLnZhbHVlc31cbiAgICovXG4gIFtTeW1ib2wuYXN5bmNJdGVyYXRvcl06IChvcHRpb25zPzogUmVhZGFibGVTdHJlYW1JdGVyYXRvck9wdGlvbnMpID0+IFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvcjxSPjtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLCB7XG4gIGNhbmNlbDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGdldFJlYWRlcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHBpcGVUaHJvdWdoOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgcGlwZVRvOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgdGVlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgdmFsdWVzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgbG9ja2VkOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdSZWFkYWJsZVN0cmVhbScsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuaWYgKHR5cGVvZiBTeW1ib2wuYXN5bmNJdGVyYXRvciA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSwgU3ltYm9sLmFzeW5jSXRlcmF0b3IsIHtcbiAgICB2YWx1ZTogUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnZhbHVlcyxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvcixcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZFJlc3VsdCxcbiAgUmVhZGFibGVTdHJlYW1CWU9CUmVhZFJlc3VsdCxcbiAgVW5kZXJseWluZ0J5dGVTb3VyY2UsXG4gIFVuZGVybHlpbmdTb3VyY2UsXG4gIFVuZGVybHlpbmdTb3VyY2VTdGFydENhbGxiYWNrLFxuICBVbmRlcmx5aW5nU291cmNlUHVsbENhbGxiYWNrLFxuICBVbmRlcmx5aW5nU291cmNlQ2FuY2VsQ2FsbGJhY2ssXG4gIFVuZGVybHlpbmdCeXRlU291cmNlU3RhcnRDYWxsYmFjayxcbiAgVW5kZXJseWluZ0J5dGVTb3VyY2VQdWxsQ2FsbGJhY2ssXG4gIFN0cmVhbVBpcGVPcHRpb25zLFxuICBSZWFkYWJsZVdyaXRhYmxlUGFpcixcbiAgUmVhZGFibGVTdHJlYW1JdGVyYXRvck9wdGlvbnNcbn07XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cblxuLy8gVGhyb3dzIGlmIGFuZCBvbmx5IGlmIHN0YXJ0QWxnb3JpdGhtIHRocm93cy5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVSZWFkYWJsZVN0cmVhbTxSPihzdGFydEFsZ29yaXRobTogKCkgPT4gdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1bGxBbGdvcml0aG06ICgpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWxnb3JpdGhtOiAocmVhc29uOiBhbnkpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaFdhdGVyTWFyayA9IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZUFsZ29yaXRobTogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPFI+ID0gKCkgPT4gMSk6IFJlYWRhYmxlU3RyZWFtPFI+IHtcbiAgYXNzZXJ0KElzTm9uTmVnYXRpdmVOdW1iZXIoaGlnaFdhdGVyTWFyaykpO1xuXG4gIGNvbnN0IHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4gPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSk7XG4gIEluaXRpYWxpemVSZWFkYWJsZVN0cmVhbShzdHJlYW0pO1xuXG4gIGNvbnN0IGNvbnRyb2xsZXI6IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Uj4gPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlKTtcbiAgU2V0VXBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKFxuICAgIHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgaGlnaFdhdGVyTWFyaywgc2l6ZUFsZ29yaXRobVxuICApO1xuXG4gIHJldHVybiBzdHJlYW07XG59XG5cbi8vIFRocm93cyBpZiBhbmQgb25seSBpZiBzdGFydEFsZ29yaXRobSB0aHJvd3MuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlUmVhZGFibGVCeXRlU3RyZWFtKFxuICBzdGFydEFsZ29yaXRobTogKCkgPT4gdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+LFxuICBwdWxsQWxnb3JpdGhtOiAoKSA9PiBQcm9taXNlPHZvaWQ+LFxuICBjYW5jZWxBbGdvcml0aG06IChyZWFzb246IGFueSkgPT4gUHJvbWlzZTx2b2lkPlxuKTogUmVhZGFibGVCeXRlU3RyZWFtIHtcbiAgY29uc3Qgc3RyZWFtOiBSZWFkYWJsZUJ5dGVTdHJlYW0gPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSk7XG4gIEluaXRpYWxpemVSZWFkYWJsZVN0cmVhbShzdHJlYW0pO1xuXG4gIGNvbnN0IGNvbnRyb2xsZXI6IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIucHJvdG90eXBlKTtcbiAgU2V0VXBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgMCwgdW5kZWZpbmVkKTtcblxuICByZXR1cm4gc3RyZWFtO1xufVxuXG5mdW5jdGlvbiBJbml0aWFsaXplUmVhZGFibGVTdHJlYW0oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbSkge1xuICBzdHJlYW0uX3N0YXRlID0gJ3JlYWRhYmxlJztcbiAgc3RyZWFtLl9yZWFkZXIgPSB1bmRlZmluZWQ7XG4gIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSB1bmRlZmluZWQ7XG4gIHN0cmVhbS5fZGlzdHVyYmVkID0gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtKHg6IHVua25vd24pOiB4IGlzIFJlYWRhYmxlU3RyZWFtIHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcicpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW1EaXN0dXJiZWQoc3RyZWFtOiBSZWFkYWJsZVN0cmVhbSk6IGJvb2xlYW4ge1xuICBhc3NlcnQoSXNSZWFkYWJsZVN0cmVhbShzdHJlYW0pKTtcblxuICByZXR1cm4gc3RyZWFtLl9kaXN0dXJiZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbTogUmVhZGFibGVTdHJlYW0pOiBib29sZWFuIHtcbiAgYXNzZXJ0KElzUmVhZGFibGVTdHJlYW0oc3RyZWFtKSk7XG5cbiAgaWYgKHN0cmVhbS5fcmVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gUmVhZGFibGVTdHJlYW0gQVBJIGV4cG9zZWQgZm9yIGNvbnRyb2xsZXJzLlxuXG5leHBvcnQgZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1DYW5jZWw8Uj4oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxSPiwgcmVhc29uOiBhbnkpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICBzdHJlYW0uX2Rpc3R1cmJlZCA9IHRydWU7XG5cbiAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgfVxuICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gIH1cblxuICBSZWFkYWJsZVN0cmVhbUNsb3NlKHN0cmVhbSk7XG5cbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLl9yZWFkZXI7XG4gIGlmIChyZWFkZXIgIT09IHVuZGVmaW5lZCAmJiBJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihyZWFkZXIpKSB7XG4gICAgcmVhZGVyLl9yZWFkSW50b1JlcXVlc3RzLmZvckVhY2gocmVhZEludG9SZXF1ZXN0ID0+IHtcbiAgICAgIHJlYWRJbnRvUmVxdWVzdC5fY2xvc2VTdGVwcyh1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICB9XG5cbiAgY29uc3Qgc291cmNlQ2FuY2VsUHJvbWlzZSA9IHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyW0NhbmNlbFN0ZXBzXShyZWFzb24pO1xuICByZXR1cm4gdHJhbnNmb3JtUHJvbWlzZVdpdGgoc291cmNlQ2FuY2VsUHJvbWlzZSwgbm9vcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUNsb3NlPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4pOiB2b2lkIHtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScpO1xuXG4gIHN0cmVhbS5fc3RhdGUgPSAnY2xvc2VkJztcblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcblxuICBpZiAocmVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUocmVhZGVyKTtcblxuICBpZiAoSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI8Uj4ocmVhZGVyKSkge1xuICAgIHJlYWRlci5fcmVhZFJlcXVlc3RzLmZvckVhY2gocmVhZFJlcXVlc3QgPT4ge1xuICAgICAgcmVhZFJlcXVlc3QuX2Nsb3NlU3RlcHMoKTtcbiAgICB9KTtcbiAgICByZWFkZXIuX3JlYWRSZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUVycm9yPFI+KHN0cmVhbTogUmVhZGFibGVTdHJlYW08Uj4sIGU6IGFueSk6IHZvaWQge1xuICBhc3NlcnQoSXNSZWFkYWJsZVN0cmVhbShzdHJlYW0pKTtcbiAgYXNzZXJ0KHN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScpO1xuXG4gIHN0cmVhbS5fc3RhdGUgPSAnZXJyb3JlZCc7XG4gIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSBlO1xuXG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuXG4gIGlmIChyZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVqZWN0KHJlYWRlciwgZSk7XG5cbiAgaWYgKElzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyPFI+KHJlYWRlcikpIHtcbiAgICByZWFkZXIuX3JlYWRSZXF1ZXN0cy5mb3JFYWNoKHJlYWRSZXF1ZXN0ID0+IHtcbiAgICAgIHJlYWRSZXF1ZXN0Ll9lcnJvclN0ZXBzKGUpO1xuICAgIH0pO1xuXG4gICAgcmVhZGVyLl9yZWFkUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgfSBlbHNlIHtcbiAgICBhc3NlcnQoSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIocmVhZGVyKSk7XG5cbiAgICByZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMuZm9yRWFjaChyZWFkSW50b1JlcXVlc3QgPT4ge1xuICAgICAgcmVhZEludG9SZXF1ZXN0Ll9lcnJvclN0ZXBzKGUpO1xuICAgIH0pO1xuXG4gICAgcmVhZGVyLl9yZWFkSW50b1JlcXVlc3RzID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gIH1cbn1cblxuLy8gUmVhZGVyc1xuXG5leHBvcnQgdHlwZSBSZWFkYWJsZVN0cmVhbVJlYWRlcjxSPiA9IFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcjxSPiB8IFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcjtcblxuZXhwb3J0IHtcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLFxuICBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXJcbn07XG5cbi8vIENvbnRyb2xsZXJzXG5cbmV4cG9ydCB7XG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIsXG4gIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QsXG4gIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJcbn07XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cblxuZnVuY3Rpb24gc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihgUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlU3RyZWFtYCk7XG59XG4iLCAiaW1wb3J0IHsgUXVldWluZ1N0cmF0ZWd5SW5pdCB9IGZyb20gJy4uL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IHsgYXNzZXJ0RGljdGlvbmFyeSwgYXNzZXJ0UmVxdWlyZWRGaWVsZCwgY29udmVydFVucmVzdHJpY3RlZERvdWJsZSB9IGZyb20gJy4vYmFzaWMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFF1ZXVpbmdTdHJhdGVneUluaXQoaW5pdDogUXVldWluZ1N0cmF0ZWd5SW5pdCB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogc3RyaW5nKTogUXVldWluZ1N0cmF0ZWd5SW5pdCB7XG4gIGFzc2VydERpY3Rpb25hcnkoaW5pdCwgY29udGV4dCk7XG4gIGNvbnN0IGhpZ2hXYXRlck1hcmsgPSBpbml0Py5oaWdoV2F0ZXJNYXJrO1xuICBhc3NlcnRSZXF1aXJlZEZpZWxkKGhpZ2hXYXRlck1hcmssICdoaWdoV2F0ZXJNYXJrJywgJ1F1ZXVpbmdTdHJhdGVneUluaXQnKTtcbiAgcmV0dXJuIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiBjb252ZXJ0VW5yZXN0cmljdGVkRG91YmxlKGhpZ2hXYXRlck1hcmspXG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUXVldWluZ1N0cmF0ZWd5LCBRdWV1aW5nU3RyYXRlZ3lJbml0IH0gZnJvbSAnLi9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4vaGVscGVycy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IGFzc2VydFJlcXVpcmVkQXJndW1lbnQgfSBmcm9tICcuL3ZhbGlkYXRvcnMvYmFzaWMnO1xuaW1wb3J0IHsgY29udmVydFF1ZXVpbmdTdHJhdGVneUluaXQgfSBmcm9tICcuL3ZhbGlkYXRvcnMvcXVldWluZy1zdHJhdGVneS1pbml0JztcblxuLy8gVGhlIHNpemUgZnVuY3Rpb24gbXVzdCBub3QgaGF2ZSBhIHByb3RvdHlwZSBwcm9wZXJ0eSBub3IgYmUgYSBjb25zdHJ1Y3RvclxuY29uc3QgYnl0ZUxlbmd0aFNpemVGdW5jdGlvbiA9IChjaHVuazogQXJyYXlCdWZmZXJWaWV3KTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIGNodW5rLmJ5dGVMZW5ndGg7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGJ5dGVMZW5ndGhTaXplRnVuY3Rpb24sICduYW1lJywge1xuICB2YWx1ZTogJ3NpemUnLFxuICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG4vKipcbiAqIEEgcXVldWluZyBzdHJhdGVneSB0aGF0IGNvdW50cyB0aGUgbnVtYmVyIG9mIGJ5dGVzIGluIGVhY2ggY2h1bmsuXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5IGltcGxlbWVudHMgUXVldWluZ1N0cmF0ZWd5PEFycmF5QnVmZmVyVmlldz4ge1xuICAvKiogQGludGVybmFsICovXG4gIHJlYWRvbmx5IF9ieXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyazogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFF1ZXVpbmdTdHJhdGVneUluaXQpIHtcbiAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KG9wdGlvbnMsIDEsICdCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5Jyk7XG4gICAgb3B0aW9ucyA9IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lJbml0KG9wdGlvbnMsICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICB0aGlzLl9ieXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyayA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoaWdoIHdhdGVyIG1hcmsgcHJvdmlkZWQgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgZ2V0IGhpZ2hXYXRlck1hcmsoKTogbnVtYmVyIHtcbiAgICBpZiAoIUlzQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneSh0aGlzKSkge1xuICAgICAgdGhyb3cgYnl0ZUxlbmd0aEJyYW5kQ2hlY2tFeGNlcHRpb24oJ2hpZ2hXYXRlck1hcmsnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3lIaWdoV2F0ZXJNYXJrO1xuICB9XG5cbiAgLyoqXG4gICAqIE1lYXN1cmVzIHRoZSBzaXplIG9mIGBjaHVua2AgYnkgcmV0dXJuaW5nIHRoZSB2YWx1ZSBvZiBpdHMgYGJ5dGVMZW5ndGhgIHByb3BlcnR5LlxuICAgKi9cbiAgZ2V0IHNpemUoKTogKGNodW5rOiBBcnJheUJ1ZmZlclZpZXcpID0+IG51bWJlciB7XG4gICAgaWYgKCFJc0J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kodGhpcykpIHtcbiAgICAgIHRocm93IGJ5dGVMZW5ndGhCcmFuZENoZWNrRXhjZXB0aW9uKCdzaXplJyk7XG4gICAgfVxuICAgIHJldHVybiBieXRlTGVuZ3RoU2l6ZUZ1bmN0aW9uO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLCB7XG4gIGhpZ2hXYXRlck1hcms6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBzaXplOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ0J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3knLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kuXG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGhCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKGBCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc0J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3koeDogYW55KTogeCBpcyBCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5IHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3lIaWdoV2F0ZXJNYXJrJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3k7XG59XG4iLCAiaW1wb3J0IHsgUXVldWluZ1N0cmF0ZWd5LCBRdWV1aW5nU3RyYXRlZ3lJbml0IH0gZnJvbSAnLi9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7IHR5cGVJc09iamVjdCB9IGZyb20gJy4vaGVscGVycy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB7IGFzc2VydFJlcXVpcmVkQXJndW1lbnQgfSBmcm9tICcuL3ZhbGlkYXRvcnMvYmFzaWMnO1xuaW1wb3J0IHsgY29udmVydFF1ZXVpbmdTdHJhdGVneUluaXQgfSBmcm9tICcuL3ZhbGlkYXRvcnMvcXVldWluZy1zdHJhdGVneS1pbml0JztcblxuLy8gVGhlIHNpemUgZnVuY3Rpb24gbXVzdCBub3QgaGF2ZSBhIHByb3RvdHlwZSBwcm9wZXJ0eSBub3IgYmUgYSBjb25zdHJ1Y3RvclxuY29uc3QgY291bnRTaXplRnVuY3Rpb24gPSAoKTogMSA9PiB7XG4gIHJldHVybiAxO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb3VudFNpemVGdW5jdGlvbiwgJ25hbWUnLCB7XG4gIHZhbHVlOiAnc2l6ZScsXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogQSBxdWV1aW5nIHN0cmF0ZWd5IHRoYXQgY291bnRzIHRoZSBudW1iZXIgb2YgY2h1bmtzLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRRdWV1aW5nU3RyYXRlZ3kgaW1wbGVtZW50cyBRdWV1aW5nU3RyYXRlZ3k8YW55PiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcmVhZG9ubHkgX2NvdW50UXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyayE6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBRdWV1aW5nU3RyYXRlZ3lJbml0KSB7XG4gICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChvcHRpb25zLCAxLCAnQ291bnRRdWV1aW5nU3RyYXRlZ3knKTtcbiAgICBvcHRpb25zID0gY29udmVydFF1ZXVpbmdTdHJhdGVneUluaXQob3B0aW9ucywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgIHRoaXMuX2NvdW50UXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyayA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoaWdoIHdhdGVyIG1hcmsgcHJvdmlkZWQgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgZ2V0IGhpZ2hXYXRlck1hcmsoKTogbnVtYmVyIHtcbiAgICBpZiAoIUlzQ291bnRRdWV1aW5nU3RyYXRlZ3kodGhpcykpIHtcbiAgICAgIHRocm93IGNvdW50QnJhbmRDaGVja0V4Y2VwdGlvbignaGlnaFdhdGVyTWFyaycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY291bnRRdWV1aW5nU3RyYXRlZ3lIaWdoV2F0ZXJNYXJrO1xuICB9XG5cbiAgLyoqXG4gICAqIE1lYXN1cmVzIHRoZSBzaXplIG9mIGBjaHVua2AgYnkgYWx3YXlzIHJldHVybmluZyAxLlxuICAgKiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgdG90YWwgcXVldWUgc2l6ZSBpcyBhIGNvdW50IG9mIHRoZSBudW1iZXIgb2YgY2h1bmtzIGluIHRoZSBxdWV1ZS5cbiAgICovXG4gIGdldCBzaXplKCk6IChjaHVuazogYW55KSA9PiAxIHtcbiAgICBpZiAoIUlzQ291bnRRdWV1aW5nU3RyYXRlZ3kodGhpcykpIHtcbiAgICAgIHRocm93IGNvdW50QnJhbmRDaGVja0V4Y2VwdGlvbignc2l6ZScpO1xuICAgIH1cbiAgICByZXR1cm4gY291bnRTaXplRnVuY3Rpb247XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ291bnRRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLCB7XG4gIGhpZ2hXYXRlck1hcms6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICBzaXplOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvdW50UXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdDb3VudFF1ZXVpbmdTdHJhdGVneScsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgQ291bnRRdWV1aW5nU3RyYXRlZ3kuXG5cbmZ1bmN0aW9uIGNvdW50QnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lOiBzdHJpbmcpOiBUeXBlRXJyb3Ige1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihgQ291bnRRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIENvdW50UXVldWluZ1N0cmF0ZWd5YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc0NvdW50UXVldWluZ1N0cmF0ZWd5KHg6IGFueSk6IHggaXMgQ291bnRRdWV1aW5nU3RyYXRlZ3kge1xuICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfY291bnRRdWV1aW5nU3RyYXRlZ3lIaWdoV2F0ZXJNYXJrJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geCBpbnN0YW5jZW9mIENvdW50UXVldWluZ1N0cmF0ZWd5O1xufVxuIiwgImltcG9ydCB7IGFzc2VydERpY3Rpb25hcnksIGFzc2VydEZ1bmN0aW9uIH0gZnJvbSAnLi9iYXNpYyc7XG5pbXBvcnQgeyBwcm9taXNlQ2FsbCwgcmVmbGVjdENhbGwgfSBmcm9tICcuLi9oZWxwZXJzL3dlYmlkbCc7XG5pbXBvcnQge1xuICBUcmFuc2Zvcm1lcixcbiAgVHJhbnNmb3JtZXJGbHVzaENhbGxiYWNrLFxuICBUcmFuc2Zvcm1lclN0YXJ0Q2FsbGJhY2ssXG4gIFRyYW5zZm9ybWVyVHJhbnNmb3JtQ2FsbGJhY2ssXG4gIFZhbGlkYXRlZFRyYW5zZm9ybWVyXG59IGZyb20gJy4uL3RyYW5zZm9ybS1zdHJlYW0vdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIgfSBmcm9tICcuLi90cmFuc2Zvcm0tc3RyZWFtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUcmFuc2Zvcm1lcjxJLCBPPihvcmlnaW5hbDogVHJhbnNmb3JtZXI8SSwgTz4gfCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBzdHJpbmcpOiBWYWxpZGF0ZWRUcmFuc2Zvcm1lcjxJLCBPPiB7XG4gIGFzc2VydERpY3Rpb25hcnkob3JpZ2luYWwsIGNvbnRleHQpO1xuICBjb25zdCBmbHVzaCA9IG9yaWdpbmFsPy5mbHVzaDtcbiAgY29uc3QgcmVhZGFibGVUeXBlID0gb3JpZ2luYWw/LnJlYWRhYmxlVHlwZTtcbiAgY29uc3Qgc3RhcnQgPSBvcmlnaW5hbD8uc3RhcnQ7XG4gIGNvbnN0IHRyYW5zZm9ybSA9IG9yaWdpbmFsPy50cmFuc2Zvcm07XG4gIGNvbnN0IHdyaXRhYmxlVHlwZSA9IG9yaWdpbmFsPy53cml0YWJsZVR5cGU7XG4gIHJldHVybiB7XG4gICAgZmx1c2g6IGZsdXNoID09PSB1bmRlZmluZWQgP1xuICAgICAgdW5kZWZpbmVkIDpcbiAgICAgIGNvbnZlcnRUcmFuc2Zvcm1lckZsdXNoQ2FsbGJhY2soZmx1c2gsIG9yaWdpbmFsISwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnZmx1c2gnIHRoYXRgKSxcbiAgICByZWFkYWJsZVR5cGUsXG4gICAgc3RhcnQ6IHN0YXJ0ID09PSB1bmRlZmluZWQgP1xuICAgICAgdW5kZWZpbmVkIDpcbiAgICAgIGNvbnZlcnRUcmFuc2Zvcm1lclN0YXJ0Q2FsbGJhY2soc3RhcnQsIG9yaWdpbmFsISwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnc3RhcnQnIHRoYXRgKSxcbiAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHVuZGVmaW5lZCA6XG4gICAgICBjb252ZXJ0VHJhbnNmb3JtZXJUcmFuc2Zvcm1DYWxsYmFjayh0cmFuc2Zvcm0sIG9yaWdpbmFsISwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAndHJhbnNmb3JtJyB0aGF0YCksXG4gICAgd3JpdGFibGVUeXBlXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRUcmFuc2Zvcm1lckZsdXNoQ2FsbGJhY2s8SSwgTz4oXG4gIGZuOiBUcmFuc2Zvcm1lckZsdXNoQ2FsbGJhY2s8Tz4sXG4gIG9yaWdpbmFsOiBUcmFuc2Zvcm1lcjxJLCBPPixcbiAgY29udGV4dDogc3RyaW5nXG4pOiAoY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4pID0+IFByb21pc2U8dm9pZD4ge1xuICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gIHJldHVybiAoY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4pID0+IHByb21pc2VDYWxsKGZuLCBvcmlnaW5hbCwgW2NvbnRyb2xsZXJdKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFRyYW5zZm9ybWVyU3RhcnRDYWxsYmFjazxJLCBPPihcbiAgZm46IFRyYW5zZm9ybWVyU3RhcnRDYWxsYmFjazxPPixcbiAgb3JpZ2luYWw6IFRyYW5zZm9ybWVyPEksIE8+LFxuICBjb250ZXh0OiBzdHJpbmdcbik6IFRyYW5zZm9ybWVyU3RhcnRDYWxsYmFjazxPPiB7XG4gIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgcmV0dXJuIChjb250cm9sbGVyOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPikgPT4gcmVmbGVjdENhbGwoZm4sIG9yaWdpbmFsLCBbY29udHJvbGxlcl0pO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VHJhbnNmb3JtZXJUcmFuc2Zvcm1DYWxsYmFjazxJLCBPPihcbiAgZm46IFRyYW5zZm9ybWVyVHJhbnNmb3JtQ2FsbGJhY2s8SSwgTz4sXG4gIG9yaWdpbmFsOiBUcmFuc2Zvcm1lcjxJLCBPPixcbiAgY29udGV4dDogc3RyaW5nXG4pOiAoY2h1bms6IEksIGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+KSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICByZXR1cm4gKGNodW5rOiBJLCBjb250cm9sbGVyOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPikgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbY2h1bmssIGNvbnRyb2xsZXJdKTtcbn1cbiIsICJpbXBvcnQgYXNzZXJ0IGZyb20gJy4uL3N0dWIvYXNzZXJ0JztcbmltcG9ydCB7IG5ld1Byb21pc2UsIHByb21pc2VSZWplY3RlZFdpdGgsIHByb21pc2VSZXNvbHZlZFdpdGgsIHRyYW5zZm9ybVByb21pc2VXaXRoIH0gZnJvbSAnLi9oZWxwZXJzL3dlYmlkbCc7XG5pbXBvcnQgeyBDcmVhdGVSZWFkYWJsZVN0cmVhbSwgUmVhZGFibGVTdHJlYW0sIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIgfSBmcm9tICcuL3JlYWRhYmxlLXN0cmVhbSc7XG5pbXBvcnQge1xuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FuQ2xvc2VPckVucXVldWUsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZSxcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUsXG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcixcbiAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplLFxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVySGFzQmFja3ByZXNzdXJlXG59IGZyb20gJy4vcmVhZGFibGUtc3RyZWFtL2RlZmF1bHQtY29udHJvbGxlcic7XG5pbXBvcnQgeyBRdWV1aW5nU3RyYXRlZ3ksIFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjayB9IGZyb20gJy4vcXVldWluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyBDcmVhdGVXcml0YWJsZVN0cmVhbSwgV3JpdGFibGVTdHJlYW0sIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkIH0gZnJvbSAnLi93cml0YWJsZS1zdHJlYW0nO1xuaW1wb3J0IHsgdHlwZUlzT2JqZWN0IH0gZnJvbSAnLi9oZWxwZXJzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHsgSXNOb25OZWdhdGl2ZU51bWJlciB9IGZyb20gJy4vYWJzdHJhY3Qtb3BzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHsgY29udmVydFF1ZXVpbmdTdHJhdGVneSB9IGZyb20gJy4vdmFsaWRhdG9ycy9xdWV1aW5nLXN0cmF0ZWd5JztcbmltcG9ydCB7IEV4dHJhY3RIaWdoV2F0ZXJNYXJrLCBFeHRyYWN0U2l6ZUFsZ29yaXRobSB9IGZyb20gJy4vYWJzdHJhY3Qtb3BzL3F1ZXVpbmctc3RyYXRlZ3knO1xuaW1wb3J0IHtcbiAgVHJhbnNmb3JtZXIsXG4gIFRyYW5zZm9ybWVyRmx1c2hDYWxsYmFjayxcbiAgVHJhbnNmb3JtZXJTdGFydENhbGxiYWNrLFxuICBUcmFuc2Zvcm1lclRyYW5zZm9ybUNhbGxiYWNrLFxuICBWYWxpZGF0ZWRUcmFuc2Zvcm1lclxufSBmcm9tICcuL3RyYW5zZm9ybS1zdHJlYW0vdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgY29udmVydFRyYW5zZm9ybWVyIH0gZnJvbSAnLi92YWxpZGF0b3JzL3RyYW5zZm9ybWVyJztcblxuLy8gQ2xhc3MgVHJhbnNmb3JtU3RyZWFtXG5cbi8qKlxuICogQSB0cmFuc2Zvcm0gc3RyZWFtIGNvbnNpc3RzIG9mIGEgcGFpciBvZiBzdHJlYW1zOiBhIHtAbGluayBXcml0YWJsZVN0cmVhbSB8IHdyaXRhYmxlIHN0cmVhbX0sXG4gKiBrbm93biBhcyBpdHMgd3JpdGFibGUgc2lkZSwgYW5kIGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtIHwgcmVhZGFibGUgc3RyZWFtfSwga25vd24gYXMgaXRzIHJlYWRhYmxlIHNpZGUuXG4gKiBJbiBhIG1hbm5lciBzcGVjaWZpYyB0byB0aGUgdHJhbnNmb3JtIHN0cmVhbSBpbiBxdWVzdGlvbiwgd3JpdGVzIHRvIHRoZSB3cml0YWJsZSBzaWRlIHJlc3VsdCBpbiBuZXcgZGF0YSBiZWluZ1xuICogbWFkZSBhdmFpbGFibGUgZm9yIHJlYWRpbmcgZnJvbSB0aGUgcmVhZGFibGUgc2lkZS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm1TdHJlYW08SSA9IGFueSwgTyA9IGFueT4ge1xuICAvKiogQGludGVybmFsICovXG4gIF93cml0YWJsZSE6IFdyaXRhYmxlU3RyZWFtPEk+O1xuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkYWJsZSE6IFJlYWRhYmxlU3RyZWFtPE8+O1xuICAvKiogQGludGVybmFsICovXG4gIF9iYWNrcHJlc3N1cmUhOiBib29sZWFuO1xuICAvKiogQGludGVybmFsICovXG4gIF9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlITogUHJvbWlzZTx2b2lkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZV9yZXNvbHZlITogKCkgPT4gdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlciE6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRyYW5zZm9ybWVyPzogVHJhbnNmb3JtZXI8SSwgTz4sXG4gICAgd3JpdGFibGVTdHJhdGVneT86IFF1ZXVpbmdTdHJhdGVneTxJPixcbiAgICByZWFkYWJsZVN0cmF0ZWd5PzogUXVldWluZ1N0cmF0ZWd5PE8+XG4gICk7XG4gIGNvbnN0cnVjdG9yKHJhd1RyYW5zZm9ybWVyOiBUcmFuc2Zvcm1lcjxJLCBPPiB8IG51bGwgfCB1bmRlZmluZWQgPSB7fSxcbiAgICAgICAgICAgICAgcmF3V3JpdGFibGVTdHJhdGVneTogUXVldWluZ1N0cmF0ZWd5PEk+IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9LFxuICAgICAgICAgICAgICByYXdSZWFkYWJsZVN0cmF0ZWd5OiBRdWV1aW5nU3RyYXRlZ3k8Tz4gfCBudWxsIHwgdW5kZWZpbmVkID0ge30pIHtcbiAgICBpZiAocmF3VHJhbnNmb3JtZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmF3VHJhbnNmb3JtZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHdyaXRhYmxlU3RyYXRlZ3kgPSBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5KHJhd1dyaXRhYmxlU3RyYXRlZ3ksICdTZWNvbmQgcGFyYW1ldGVyJyk7XG4gICAgY29uc3QgcmVhZGFibGVTdHJhdGVneSA9IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3kocmF3UmVhZGFibGVTdHJhdGVneSwgJ1RoaXJkIHBhcmFtZXRlcicpO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtZXIgPSBjb252ZXJ0VHJhbnNmb3JtZXIocmF3VHJhbnNmb3JtZXIsICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICBpZiAodHJhbnNmb3JtZXIucmVhZGFibGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHJlYWRhYmxlVHlwZSBzcGVjaWZpZWQnKTtcbiAgICB9XG4gICAgaWYgKHRyYW5zZm9ybWVyLndyaXRhYmxlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB3cml0YWJsZVR5cGUgc3BlY2lmaWVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVhZGFibGVIaWdoV2F0ZXJNYXJrID0gRXh0cmFjdEhpZ2hXYXRlck1hcmsocmVhZGFibGVTdHJhdGVneSwgMCk7XG4gICAgY29uc3QgcmVhZGFibGVTaXplQWxnb3JpdGhtID0gRXh0cmFjdFNpemVBbGdvcml0aG0ocmVhZGFibGVTdHJhdGVneSk7XG4gICAgY29uc3Qgd3JpdGFibGVIaWdoV2F0ZXJNYXJrID0gRXh0cmFjdEhpZ2hXYXRlck1hcmsod3JpdGFibGVTdHJhdGVneSwgMSk7XG4gICAgY29uc3Qgd3JpdGFibGVTaXplQWxnb3JpdGhtID0gRXh0cmFjdFNpemVBbGdvcml0aG0od3JpdGFibGVTdHJhdGVneSk7XG5cbiAgICBsZXQgc3RhcnRQcm9taXNlX3Jlc29sdmUhOiAodmFsdWU6IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPikgPT4gdm9pZDtcbiAgICBjb25zdCBzdGFydFByb21pc2UgPSBuZXdQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgc3RhcnRQcm9taXNlX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgSW5pdGlhbGl6ZVRyYW5zZm9ybVN0cmVhbShcbiAgICAgIHRoaXMsIHN0YXJ0UHJvbWlzZSwgd3JpdGFibGVIaWdoV2F0ZXJNYXJrLCB3cml0YWJsZVNpemVBbGdvcml0aG0sIHJlYWRhYmxlSGlnaFdhdGVyTWFyaywgcmVhZGFibGVTaXplQWxnb3JpdGhtXG4gICAgKTtcbiAgICBTZXRVcFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRnJvbVRyYW5zZm9ybWVyKHRoaXMsIHRyYW5zZm9ybWVyKTtcblxuICAgIGlmICh0cmFuc2Zvcm1lci5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzdGFydFByb21pc2VfcmVzb2x2ZSh0cmFuc2Zvcm1lci5zdGFydCh0aGlzLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UHJvbWlzZV9yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZWFkYWJsZSBzaWRlIG9mIHRoZSB0cmFuc2Zvcm0gc3RyZWFtLlxuICAgKi9cbiAgZ2V0IHJlYWRhYmxlKCk6IFJlYWRhYmxlU3RyZWFtPE8+IHtcbiAgICBpZiAoIUlzVHJhbnNmb3JtU3RyZWFtKHRoaXMpKSB7XG4gICAgICB0aHJvdyBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uKCdyZWFkYWJsZScpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZWFkYWJsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd3JpdGFibGUgc2lkZSBvZiB0aGUgdHJhbnNmb3JtIHN0cmVhbS5cbiAgICovXG4gIGdldCB3cml0YWJsZSgpOiBXcml0YWJsZVN0cmVhbTxJPiB7XG4gICAgaWYgKCFJc1RyYW5zZm9ybVN0cmVhbSh0aGlzKSkge1xuICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbignd3JpdGFibGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fd3JpdGFibGU7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVHJhbnNmb3JtU3RyZWFtLnByb3RvdHlwZSwge1xuICByZWFkYWJsZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHdyaXRhYmxlOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYW5zZm9ybVN0cmVhbS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgIHZhbHVlOiAnVHJhbnNmb3JtU3RyZWFtJyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIFRyYW5zZm9ybWVyLFxuICBUcmFuc2Zvcm1lclN0YXJ0Q2FsbGJhY2ssXG4gIFRyYW5zZm9ybWVyRmx1c2hDYWxsYmFjayxcbiAgVHJhbnNmb3JtZXJUcmFuc2Zvcm1DYWxsYmFja1xufTtcblxuLy8gVHJhbnNmb3JtIFN0cmVhbSBBYnN0cmFjdCBPcGVyYXRpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVUcmFuc2Zvcm1TdHJlYW08SSwgTz4oc3RhcnRBbGdvcml0aG06ICgpID0+IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtQWxnb3JpdGhtOiAoY2h1bms6IEkpID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsdXNoQWxnb3JpdGhtOiAoKSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZUhpZ2hXYXRlck1hcmsgPSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZVNpemVBbGdvcml0aG06IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxJPiA9ICgpID0+IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRhYmxlSGlnaFdhdGVyTWFyayA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRhYmxlU2l6ZUFsZ29yaXRobTogUXVldWluZ1N0cmF0ZWd5U2l6ZUNhbGxiYWNrPE8+ID0gKCkgPT4gMSkge1xuICBhc3NlcnQoSXNOb25OZWdhdGl2ZU51bWJlcih3cml0YWJsZUhpZ2hXYXRlck1hcmspKTtcbiAgYXNzZXJ0KElzTm9uTmVnYXRpdmVOdW1iZXIocmVhZGFibGVIaWdoV2F0ZXJNYXJrKSk7XG5cbiAgY29uc3Qgc3RyZWFtOiBUcmFuc2Zvcm1TdHJlYW08SSwgTz4gPSBPYmplY3QuY3JlYXRlKFRyYW5zZm9ybVN0cmVhbS5wcm90b3R5cGUpO1xuXG4gIGxldCBzdGFydFByb21pc2VfcmVzb2x2ZSE6ICh2YWx1ZTogdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+KSA9PiB2b2lkO1xuICBjb25zdCBzdGFydFByb21pc2UgPSBuZXdQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgIHN0YXJ0UHJvbWlzZV9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgSW5pdGlhbGl6ZVRyYW5zZm9ybVN0cmVhbShzdHJlYW0sIHN0YXJ0UHJvbWlzZSwgd3JpdGFibGVIaWdoV2F0ZXJNYXJrLCB3cml0YWJsZVNpemVBbGdvcml0aG0sIHJlYWRhYmxlSGlnaFdhdGVyTWFyayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkYWJsZVNpemVBbGdvcml0aG0pO1xuXG4gIGNvbnN0IGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+ID0gT2JqZWN0LmNyZWF0ZShUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUpO1xuXG4gIFNldFVwVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoc3RyZWFtLCBjb250cm9sbGVyLCB0cmFuc2Zvcm1BbGdvcml0aG0sIGZsdXNoQWxnb3JpdGhtKTtcblxuICBjb25zdCBzdGFydFJlc3VsdCA9IHN0YXJ0QWxnb3JpdGhtKCk7XG4gIHN0YXJ0UHJvbWlzZV9yZXNvbHZlKHN0YXJ0UmVzdWx0KTtcbiAgcmV0dXJuIHN0cmVhbTtcbn1cblxuZnVuY3Rpb24gSW5pdGlhbGl6ZVRyYW5zZm9ybVN0cmVhbTxJLCBPPihzdHJlYW06IFRyYW5zZm9ybVN0cmVhbTxJLCBPPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQcm9taXNlOiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZUhpZ2hXYXRlck1hcms6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGVTaXplQWxnb3JpdGhtOiBRdWV1aW5nU3RyYXRlZ3lTaXplQ2FsbGJhY2s8ST4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRhYmxlSGlnaFdhdGVyTWFyazogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkYWJsZVNpemVBbGdvcml0aG06IFF1ZXVpbmdTdHJhdGVneVNpemVDYWxsYmFjazxPPikge1xuICBmdW5jdGlvbiBzdGFydEFsZ29yaXRobSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gc3RhcnRQcm9taXNlO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVBbGdvcml0aG0oY2h1bms6IEkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtXcml0ZUFsZ29yaXRobShzdHJlYW0sIGNodW5rKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFib3J0QWxnb3JpdGhtKHJlYXNvbjogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rQWJvcnRBbGdvcml0aG0oc3RyZWFtLCByZWFzb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VBbGdvcml0aG0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rQ2xvc2VBbGdvcml0aG0oc3RyZWFtKTtcbiAgfVxuXG4gIHN0cmVhbS5fd3JpdGFibGUgPSBDcmVhdGVXcml0YWJsZVN0cmVhbShzdGFydEFsZ29yaXRobSwgd3JpdGVBbGdvcml0aG0sIGNsb3NlQWxnb3JpdGhtLCBhYm9ydEFsZ29yaXRobSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlSGlnaFdhdGVyTWFyaywgd3JpdGFibGVTaXplQWxnb3JpdGhtKTtcblxuICBmdW5jdGlvbiBwdWxsQWxnb3JpdGhtKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U291cmNlUHVsbEFsZ29yaXRobShzdHJlYW0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsQWxnb3JpdGhtKHJlYXNvbjogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgVHJhbnNmb3JtU3RyZWFtRXJyb3JXcml0YWJsZUFuZFVuYmxvY2tXcml0ZShzdHJlYW0sIHJlYXNvbik7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgfVxuXG4gIHN0cmVhbS5fcmVhZGFibGUgPSBDcmVhdGVSZWFkYWJsZVN0cmVhbShzdGFydEFsZ29yaXRobSwgcHVsbEFsZ29yaXRobSwgY2FuY2VsQWxnb3JpdGhtLCByZWFkYWJsZUhpZ2hXYXRlck1hcmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkYWJsZVNpemVBbGdvcml0aG0pO1xuXG4gIC8vIFRoZSBbW2JhY2twcmVzc3VyZV1dIHNsb3QgaXMgc2V0IHRvIHVuZGVmaW5lZCBzbyB0aGF0IGl0IGNhbiBiZSBpbml0aWFsaXNlZCBieSBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUuXG4gIHN0cmVhbS5fYmFja3ByZXNzdXJlID0gdW5kZWZpbmVkITtcbiAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlID0gdW5kZWZpbmVkITtcbiAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlX3Jlc29sdmUgPSB1bmRlZmluZWQhO1xuICBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoc3RyZWFtLCB0cnVlKTtcblxuICBzdHJlYW0uX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXIgPSB1bmRlZmluZWQhO1xufVxuXG5mdW5jdGlvbiBJc1RyYW5zZm9ybVN0cmVhbSh4OiB1bmtub3duKTogeCBpcyBUcmFuc2Zvcm1TdHJlYW0ge1xuICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlcicpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBUcmFuc2Zvcm1TdHJlYW07XG59XG5cbi8vIFRoaXMgaXMgYSBuby1vcCBpZiBib3RoIHNpZGVzIGFyZSBhbHJlYWR5IGVycm9yZWQuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1FcnJvcihzdHJlYW06IFRyYW5zZm9ybVN0cmVhbSwgZTogYW55KSB7XG4gIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihcbiAgICBzdHJlYW0uX3JlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+LFxuICAgIGVcbiAgKTtcbiAgVHJhbnNmb3JtU3RyZWFtRXJyb3JXcml0YWJsZUFuZFVuYmxvY2tXcml0ZShzdHJlYW0sIGUpO1xufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1FcnJvcldyaXRhYmxlQW5kVW5ibG9ja1dyaXRlKHN0cmVhbTogVHJhbnNmb3JtU3RyZWFtLCBlOiBhbnkpIHtcbiAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyKTtcbiAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9ySWZOZWVkZWQoc3RyZWFtLl93cml0YWJsZS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyLCBlKTtcbiAgaWYgKHN0cmVhbS5fYmFja3ByZXNzdXJlKSB7XG4gICAgLy8gUHJldGVuZCB0aGF0IHB1bGwoKSB3YXMgY2FsbGVkIHRvIHBlcm1pdCBhbnkgcGVuZGluZyB3cml0ZSgpIGNhbGxzIHRvIGNvbXBsZXRlLiBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoKVxuICAgIC8vIGNhbm5vdCBiZSBjYWxsZWQgZnJvbSBlbnF1ZXVlKCkgb3IgcHVsbCgpIG9uY2UgdGhlIFJlYWRhYmxlU3RyZWFtIGlzIGVycm9yZWQsIHNvIHRoaXMgd2lsbCB3aWxsIGJlIHRoZSBmaW5hbCB0aW1lXG4gICAgLy8gX2JhY2twcmVzc3VyZSBpcyBzZXQuXG4gICAgVHJhbnNmb3JtU3RyZWFtU2V0QmFja3ByZXNzdXJlKHN0cmVhbSwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZShzdHJlYW06IFRyYW5zZm9ybVN0cmVhbSwgYmFja3ByZXNzdXJlOiBib29sZWFuKSB7XG4gIC8vIFBhc3NlcyBhbHNvIHdoZW4gY2FsbGVkIGR1cmluZyBjb25zdHJ1Y3Rpb24uXG4gIGFzc2VydChzdHJlYW0uX2JhY2twcmVzc3VyZSAhPT0gYmFja3ByZXNzdXJlKTtcblxuICBpZiAoc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICBzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2VfcmVzb2x2ZSgpO1xuICB9XG5cbiAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlID0gbmV3UHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHN0cmVhbS5fYmFja3ByZXNzdXJlID0gYmFja3ByZXNzdXJlO1xufVxuXG4vLyBDbGFzcyBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclxuXG4vKipcbiAqIEFsbG93cyBjb250cm9sIG9mIHRoZSB7QGxpbmsgUmVhZGFibGVTdHJlYW19IGFuZCB7QGxpbmsgV3JpdGFibGVTdHJlYW19IG9mIHRoZSBhc3NvY2lhdGVkIHtAbGluayBUcmFuc2Zvcm1TdHJlYW19LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29udHJvbGxlZFRyYW5zZm9ybVN0cmVhbTogVHJhbnNmb3JtU3RyZWFtPGFueSwgTz47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3RyYW5zZm9ybUFsZ29yaXRobTogKGNodW5rOiBhbnkpID0+IFByb21pc2U8dm9pZD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2ZsdXNoQWxnb3JpdGhtOiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlc2lyZWQgc2l6ZSB0byBmaWxsIHRoZSByZWFkYWJsZSBzaWRlXHUyMDE5cyBpbnRlcm5hbCBxdWV1ZS4gSXQgY2FuIGJlIG5lZ2F0aXZlLCBpZiB0aGUgcXVldWUgaXMgb3Zlci1mdWxsLlxuICAgKi9cbiAgZ2V0IGRlc2lyZWRTaXplKCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdkZXNpcmVkU2l6ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlYWRhYmxlQ29udHJvbGxlciA9IHRoaXMuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0uX3JlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXI7XG4gICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZShyZWFkYWJsZUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPik7XG4gIH1cblxuICAvKipcbiAgICogRW5xdWV1ZXMgdGhlIGdpdmVuIGNodW5rIGBjaHVua2AgaW4gdGhlIHJlYWRhYmxlIHNpZGUgb2YgdGhlIGNvbnRyb2xsZWQgdHJhbnNmb3JtIHN0cmVhbS5cbiAgICovXG4gIGVucXVldWUoY2h1bms6IE8pOiB2b2lkO1xuICBlbnF1ZXVlKGNodW5rOiBPID0gdW5kZWZpbmVkISk6IHZvaWQge1xuICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdlbnF1ZXVlJyk7XG4gICAgfVxuXG4gICAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKHRoaXMsIGNodW5rKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFcnJvcnMgYm90aCB0aGUgcmVhZGFibGUgc2lkZSBhbmQgdGhlIHdyaXRhYmxlIHNpZGUgb2YgdGhlIGNvbnRyb2xsZWQgdHJhbnNmb3JtIHN0cmVhbSwgbWFraW5nIGFsbCBmdXR1cmVcbiAgICogaW50ZXJhY3Rpb25zIHdpdGggaXQgZmFpbCB3aXRoIHRoZSBnaXZlbiBlcnJvciBgZWAuIEFueSBjaHVua3MgcXVldWVkIGZvciB0cmFuc2Zvcm1hdGlvbiB3aWxsIGJlIGRpc2NhcmRlZC5cbiAgICovXG4gIGVycm9yKHJlYXNvbjogYW55ID0gdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKCFJc1RyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Vycm9yJyk7XG4gICAgfVxuXG4gICAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcih0aGlzLCByZWFzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgcmVhZGFibGUgc2lkZSBhbmQgZXJyb3JzIHRoZSB3cml0YWJsZSBzaWRlIG9mIHRoZSBjb250cm9sbGVkIHRyYW5zZm9ybSBzdHJlYW0uIFRoaXMgaXMgdXNlZnVsIHdoZW4gdGhlXG4gICAqIHRyYW5zZm9ybWVyIG9ubHkgbmVlZHMgdG8gY29uc3VtZSBhIHBvcnRpb24gb2YgdGhlIGNodW5rcyB3cml0dGVuIHRvIHRoZSB3cml0YWJsZSBzaWRlLlxuICAgKi9cbiAgdGVybWluYXRlKCk6IHZvaWQge1xuICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCd0ZXJtaW5hdGUnKTtcbiAgICB9XG5cbiAgICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclRlcm1pbmF0ZSh0aGlzKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUsIHtcbiAgZW5xdWV1ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIGVycm9yOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgdGVybWluYXRlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgZGVzaXJlZFNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICB2YWx1ZTogJ1RyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyJyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8vIFRyYW5zZm9ybSBTdHJlYW0gRGVmYXVsdCBDb250cm9sbGVyIEFic3RyYWN0IE9wZXJhdGlvbnNcblxuZnVuY3Rpb24gSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPID0gYW55Pih4OiBhbnkpOiB4IGlzIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+IHtcbiAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0nKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB4IGluc3RhbmNlb2YgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI7XG59XG5cbmZ1bmN0aW9uIFNldFVwVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8SSwgTz4oc3RyZWFtOiBUcmFuc2Zvcm1TdHJlYW08SSwgTz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1BbGdvcml0aG06IChjaHVuazogSSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmx1c2hBbGdvcml0aG06ICgpID0+IFByb21pc2U8dm9pZD4pIHtcbiAgYXNzZXJ0KElzVHJhbnNmb3JtU3RyZWFtKHN0cmVhbSkpO1xuICBhc3NlcnQoc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyID09PSB1bmRlZmluZWQpO1xuXG4gIGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0gPSBzdHJlYW07XG4gIHN0cmVhbS5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG5cbiAgY29udHJvbGxlci5fdHJhbnNmb3JtQWxnb3JpdGhtID0gdHJhbnNmb3JtQWxnb3JpdGhtO1xuICBjb250cm9sbGVyLl9mbHVzaEFsZ29yaXRobSA9IGZsdXNoQWxnb3JpdGhtO1xufVxuXG5mdW5jdGlvbiBTZXRVcFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRnJvbVRyYW5zZm9ybWVyPEksIE8+KHN0cmVhbTogVHJhbnNmb3JtU3RyZWFtPEksIE8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lcjogVmFsaWRhdGVkVHJhbnNmb3JtZXI8SSwgTz4pIHtcbiAgY29uc3QgY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4gPSBPYmplY3QuY3JlYXRlKFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSk7XG5cbiAgbGV0IHRyYW5zZm9ybUFsZ29yaXRobSA9IChjaHVuazogSSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoY29udHJvbGxlciwgY2h1bmsgYXMgdW5rbm93biBhcyBPKTtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgfSBjYXRjaCAodHJhbnNmb3JtUmVzdWx0RSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgodHJhbnNmb3JtUmVzdWx0RSk7XG4gICAgfVxuICB9O1xuXG4gIGxldCBmbHVzaEFsZ29yaXRobTogKCkgPT4gUHJvbWlzZTx2b2lkPiA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcblxuICBpZiAodHJhbnNmb3JtZXIudHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICB0cmFuc2Zvcm1BbGdvcml0aG0gPSBjaHVuayA9PiB0cmFuc2Zvcm1lci50cmFuc2Zvcm0hKGNodW5rLCBjb250cm9sbGVyKTtcbiAgfVxuICBpZiAodHJhbnNmb3JtZXIuZmx1c2ggIT09IHVuZGVmaW5lZCkge1xuICAgIGZsdXNoQWxnb3JpdGhtID0gKCkgPT4gdHJhbnNmb3JtZXIuZmx1c2ghKGNvbnRyb2xsZXIpO1xuICB9XG5cbiAgU2V0VXBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHRyYW5zZm9ybUFsZ29yaXRobSwgZmx1c2hBbGdvcml0aG0pO1xufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxhbnk+KSB7XG4gIGNvbnRyb2xsZXIuX3RyYW5zZm9ybUFsZ29yaXRobSA9IHVuZGVmaW5lZCE7XG4gIGNvbnRyb2xsZXIuX2ZsdXNoQWxnb3JpdGhtID0gdW5kZWZpbmVkITtcbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlPE8+KGNvbnRyb2xsZXI6IFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyPE8+LCBjaHVuazogTykge1xuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtO1xuICBjb25zdCByZWFkYWJsZUNvbnRyb2xsZXIgPSBzdHJlYW0uX3JlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPjtcbiAgaWYgKCFSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FuQ2xvc2VPckVucXVldWUocmVhZGFibGVDb250cm9sbGVyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlYWRhYmxlIHNpZGUgaXMgbm90IGluIGEgc3RhdGUgdGhhdCBwZXJtaXRzIGVucXVldWUnKTtcbiAgfVxuXG4gIC8vIFdlIHRocm90dGxlIHRyYW5zZm9ybSBpbnZvY2F0aW9ucyBiYXNlZCBvbiB0aGUgYmFja3ByZXNzdXJlIG9mIHRoZSBSZWFkYWJsZVN0cmVhbSwgYnV0IHdlIHN0aWxsXG4gIC8vIGFjY2VwdCBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoKSBjYWxscy5cblxuICB0cnkge1xuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKHJlYWRhYmxlQ29udHJvbGxlciwgY2h1bmspO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gcmVhZGFibGVTdHJhdGVneS5zaXplKCkgdGhyb3dzLlxuICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yV3JpdGFibGVBbmRVbmJsb2NrV3JpdGUoc3RyZWFtLCBlKTtcblxuICAgIHRocm93IHN0cmVhbS5fcmVhZGFibGUuX3N0b3JlZEVycm9yO1xuICB9XG5cbiAgY29uc3QgYmFja3ByZXNzdXJlID0gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckhhc0JhY2twcmVzc3VyZShyZWFkYWJsZUNvbnRyb2xsZXIpO1xuICBpZiAoYmFja3ByZXNzdXJlICE9PSBzdHJlYW0uX2JhY2twcmVzc3VyZSkge1xuICAgIGFzc2VydChiYWNrcHJlc3N1cmUpO1xuICAgIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZShzdHJlYW0sIHRydWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8YW55PiwgZTogYW55KSB7XG4gIFRyYW5zZm9ybVN0cmVhbUVycm9yKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0sIGUpO1xufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclBlcmZvcm1UcmFuc2Zvcm08SSwgTz4oY29udHJvbGxlcjogVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI8Tz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2h1bms6IEkpIHtcbiAgY29uc3QgdHJhbnNmb3JtUHJvbWlzZSA9IGNvbnRyb2xsZXIuX3RyYW5zZm9ybUFsZ29yaXRobShjaHVuayk7XG4gIHJldHVybiB0cmFuc2Zvcm1Qcm9taXNlV2l0aCh0cmFuc2Zvcm1Qcm9taXNlLCB1bmRlZmluZWQsIHIgPT4ge1xuICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0sIHIpO1xuICAgIHRocm93IHI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclRlcm1pbmF0ZTxPPihjb250cm9sbGVyOiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPikge1xuICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtO1xuICBjb25zdCByZWFkYWJsZUNvbnRyb2xsZXIgPSBzdHJlYW0uX3JlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPjtcblxuICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UocmVhZGFibGVDb250cm9sbGVyKTtcblxuICBjb25zdCBlcnJvciA9IG5ldyBUeXBlRXJyb3IoJ1RyYW5zZm9ybVN0cmVhbSB0ZXJtaW5hdGVkJyk7XG4gIFRyYW5zZm9ybVN0cmVhbUVycm9yV3JpdGFibGVBbmRVbmJsb2NrV3JpdGUoc3RyZWFtLCBlcnJvcik7XG59XG5cbi8vIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rIEFsZ29yaXRobXNcblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtXcml0ZUFsZ29yaXRobTxJLCBPPihzdHJlYW06IFRyYW5zZm9ybVN0cmVhbTxJLCBPPiwgY2h1bms6IEkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXNzZXJ0KHN0cmVhbS5fd3JpdGFibGUuX3N0YXRlID09PSAnd3JpdGFibGUnKTtcblxuICBjb25zdCBjb250cm9sbGVyID0gc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyO1xuXG4gIGlmIChzdHJlYW0uX2JhY2twcmVzc3VyZSkge1xuICAgIGNvbnN0IGJhY2twcmVzc3VyZUNoYW5nZVByb21pc2UgPSBzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2U7XG4gICAgYXNzZXJ0KGJhY2twcmVzc3VyZUNoYW5nZVByb21pc2UgIT09IHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybVByb21pc2VXaXRoKGJhY2twcmVzc3VyZUNoYW5nZVByb21pc2UsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyaXRhYmxlID0gc3RyZWFtLl93cml0YWJsZTtcbiAgICAgIGNvbnN0IHN0YXRlID0gd3JpdGFibGUuX3N0YXRlO1xuICAgICAgaWYgKHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgICAgIHRocm93IHdyaXRhYmxlLl9zdG9yZWRFcnJvcjtcbiAgICAgIH1cbiAgICAgIGFzc2VydChzdGF0ZSA9PT0gJ3dyaXRhYmxlJyk7XG4gICAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQZXJmb3JtVHJhbnNmb3JtPEksIE8+KGNvbnRyb2xsZXIsIGNodW5rKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclBlcmZvcm1UcmFuc2Zvcm08SSwgTz4oY29udHJvbGxlciwgY2h1bmspO1xufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U2lua0Fib3J0QWxnb3JpdGhtKHN0cmVhbTogVHJhbnNmb3JtU3RyZWFtLCByZWFzb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBhYm9ydCgpIGlzIG5vdCBjYWxsZWQgc3luY2hyb25vdXNseSwgc28gaXQgaXMgcG9zc2libGUgZm9yIGFib3J0KCkgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHN0cmVhbSBpcyBhbHJlYWR5XG4gIC8vIGVycm9yZWQuXG4gIFRyYW5zZm9ybVN0cmVhbUVycm9yKHN0cmVhbSwgcmVhc29uKTtcbiAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtDbG9zZUFsZ29yaXRobTxJLCBPPihzdHJlYW06IFRyYW5zZm9ybVN0cmVhbTxJLCBPPik6IFByb21pc2U8dm9pZD4ge1xuICAvLyBzdHJlYW0uX3JlYWRhYmxlIGNhbm5vdCBjaGFuZ2UgYWZ0ZXIgY29uc3RydWN0aW9uLCBzbyBjYWNoaW5nIGl0IGFjcm9zcyBhIGNhbGwgdG8gdXNlciBjb2RlIGlzIHNhZmUuXG4gIGNvbnN0IHJlYWRhYmxlID0gc3RyZWFtLl9yZWFkYWJsZTtcblxuICBjb25zdCBjb250cm9sbGVyID0gc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyO1xuICBjb25zdCBmbHVzaFByb21pc2UgPSBjb250cm9sbGVyLl9mbHVzaEFsZ29yaXRobSgpO1xuICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcblxuICAvLyBSZXR1cm4gYSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggdW5kZWZpbmVkIG9uIHN1Y2Nlc3MuXG4gIHJldHVybiB0cmFuc2Zvcm1Qcm9taXNlV2l0aChmbHVzaFByb21pc2UsICgpID0+IHtcbiAgICBpZiAocmVhZGFibGUuX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgIHRocm93IHJlYWRhYmxlLl9zdG9yZWRFcnJvcjtcbiAgICB9XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKHJlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgYXMgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjxPPik7XG4gIH0sIHIgPT4ge1xuICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yKHN0cmVhbSwgcik7XG4gICAgdGhyb3cgcmVhZGFibGUuX3N0b3JlZEVycm9yO1xuICB9KTtcbn1cblxuLy8gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNvdXJjZSBBbGdvcml0aG1zXG5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTb3VyY2VQdWxsQWxnb3JpdGhtKHN0cmVhbTogVHJhbnNmb3JtU3RyZWFtKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIEludmFyaWFudC4gRW5mb3JjZWQgYnkgdGhlIHByb21pc2VzIHJldHVybmVkIGJ5IHN0YXJ0KCkgYW5kIHB1bGwoKS5cbiAgYXNzZXJ0KHN0cmVhbS5fYmFja3ByZXNzdXJlKTtcblxuICBhc3NlcnQoc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlICE9PSB1bmRlZmluZWQpO1xuXG4gIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZShzdHJlYW0sIGZhbHNlKTtcblxuICAvLyBQcmV2ZW50IHRoZSBuZXh0IHB1bGwoKSBjYWxsIHVudGlsIHRoZXJlIGlzIGJhY2twcmVzc3VyZS5cbiAgcmV0dXJuIHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZTtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLlxuXG5mdW5jdGlvbiBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZTogc3RyaW5nKTogVHlwZUVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXG4gICAgYFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcmApO1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgVHJhbnNmb3JtU3RyZWFtLlxuXG5mdW5jdGlvbiBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uKG5hbWU6IHN0cmluZyk6IFR5cGVFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFxuICAgIGBUcmFuc2Zvcm1TdHJlYW0ucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFRyYW5zZm9ybVN0cmVhbWApO1xufVxuIiwgIi8qIGM4IGlnbm9yZSBzdGFydCAqL1xuLy8gNjQgS2lCIChzYW1lIHNpemUgY2hyb21lIHNsaWNlIHRoZWlycyBibG9iIGludG8gVWludDhhcnJheSdzKVxuY29uc3QgUE9PTF9TSVpFID0gNjU1MzZcblxuaWYgKCFnbG9iYWxUaGlzLlJlYWRhYmxlU3RyZWFtKSB7XG4gIC8vIGBub2RlOnN0cmVhbS93ZWJgIGdvdCBpbnRyb2R1Y2VkIGluIHYxNi41LjAgYXMgZXhwZXJpbWVudGFsXG4gIC8vIGFuZCBpdCdzIHByZWZlcnJlZCBvdmVyIHRoZSBwb2x5ZmlsbGVkIHZlcnNpb24uIFNvIHdlIGFsc29cbiAgLy8gc3VwcHJlc3MgdGhlIHdhcm5pbmcgdGhhdCBnZXRzIGVtaXR0ZWQgYnkgTm9kZUpTIGZvciB1c2luZyBpdC5cbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9jZXNzID0gcmVxdWlyZSgnbm9kZTpwcm9jZXNzJylcbiAgICBjb25zdCB7IGVtaXRXYXJuaW5nIH0gPSBwcm9jZXNzXG4gICAgdHJ5IHtcbiAgICAgIHByb2Nlc3MuZW1pdFdhcm5pbmcgPSAoKSA9PiB7fVxuICAgICAgT2JqZWN0LmFzc2lnbihnbG9iYWxUaGlzLCByZXF1aXJlKCdub2RlOnN0cmVhbS93ZWInKSlcbiAgICAgIHByb2Nlc3MuZW1pdFdhcm5pbmcgPSBlbWl0V2FybmluZ1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBwcm9jZXNzLmVtaXRXYXJuaW5nID0gZW1pdFdhcm5pbmdcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIGZhbGxiYWNrIHRvIHBvbHlmaWxsIGltcGxlbWVudGF0aW9uXG4gICAgT2JqZWN0LmFzc2lnbihnbG9iYWxUaGlzLCByZXF1aXJlKCd3ZWItc3RyZWFtcy1wb2x5ZmlsbC9kaXN0L3BvbnlmaWxsLmVzMjAxOC5qcycpKVxuICB9XG59XG5cbnRyeSB7XG4gIC8vIERvbid0IHVzZSBub2RlOiBwcmVmaXggZm9yIHRoaXMsIHJlcXVpcmUrbm9kZTogaXMgbm90IHN1cHBvcnRlZCB1bnRpbCBub2RlIHYxNC4xNFxuICAvLyBPbmx5IGBpbXBvcnQoKWAgY2FuIHVzZSBwcmVmaXggaW4gMTIuMjAgYW5kIGxhdGVyXG4gIGNvbnN0IHsgQmxvYiB9ID0gcmVxdWlyZSgnYnVmZmVyJylcbiAgaWYgKEJsb2IgJiYgIUJsb2IucHJvdG90eXBlLnN0cmVhbSkge1xuICAgIEJsb2IucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uIG5hbWUgKHBhcmFtcykge1xuICAgICAgbGV0IHBvc2l0aW9uID0gMFxuICAgICAgY29uc3QgYmxvYiA9IHRoaXNcblxuICAgICAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgICAgIHR5cGU6ICdieXRlcycsXG4gICAgICAgIGFzeW5jIHB1bGwgKGN0cmwpIHtcbiAgICAgICAgICBjb25zdCBjaHVuayA9IGJsb2Iuc2xpY2UocG9zaXRpb24sIE1hdGgubWluKGJsb2Iuc2l6ZSwgcG9zaXRpb24gKyBQT09MX1NJWkUpKVxuICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGNodW5rLmFycmF5QnVmZmVyKClcbiAgICAgICAgICBwb3NpdGlvbiArPSBidWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICAgIGN0cmwuZW5xdWV1ZShuZXcgVWludDhBcnJheShidWZmZXIpKVxuXG4gICAgICAgICAgaWYgKHBvc2l0aW9uID09PSBibG9iLnNpemUpIHtcbiAgICAgICAgICAgIGN0cmwuY2xvc2UoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0gY2F0Y2ggKGVycm9yKSB7fVxuLyogYzggaWdub3JlIGVuZCAqL1xuIiwgIi8qISBmZXRjaC1ibG9iLiBNSVQgTGljZW5zZS4gSmltbXkgV1x1MDBFNHJ0aW5nIDxodHRwczovL2ppbW15LndhcnRpbmcuc2Uvb3BlbnNvdXJjZT4gKi9cblxuLy8gVE9ETyAoamltbXl3YXJ0aW5nKTogaW4gdGhlIGZlYXR1cmUgdXNlIGNvbmRpdGlvbmFsIGxvYWRpbmcgd2l0aCB0b3AgbGV2ZWwgYXdhaXQgKHJlcXVpcmVzIDE0LngpXG4vLyBOb2RlIGhhcyByZWNlbnRseSBhZGRlZCB3aGF0d2cgc3RyZWFtIGludG8gY29yZVxuXG5pbXBvcnQgJy4vc3RyZWFtcy5janMnXG5cbi8vIDY0IEtpQiAoc2FtZSBzaXplIGNocm9tZSBzbGljZSB0aGVpcnMgYmxvYiBpbnRvIFVpbnQ4YXJyYXkncylcbmNvbnN0IFBPT0xfU0laRSA9IDY1NTM2XG5cbi8qKiBAcGFyYW0geyhCbG9iIHwgVWludDhBcnJheSlbXX0gcGFydHMgKi9cbmFzeW5jIGZ1bmN0aW9uICogdG9JdGVyYXRvciAocGFydHMsIGNsb25lID0gdHJ1ZSkge1xuICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbiAgICBpZiAoJ3N0cmVhbScgaW4gcGFydCkge1xuICAgICAgeWllbGQgKiAoLyoqIEB0eXBlIHtBc3luY0l0ZXJhYmxlSXRlcmF0b3I8VWludDhBcnJheT59ICovIChwYXJ0LnN0cmVhbSgpKSlcbiAgICB9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhwYXJ0KSkge1xuICAgICAgaWYgKGNsb25lKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHBhcnQuYnl0ZU9mZnNldFxuICAgICAgICBjb25zdCBlbmQgPSBwYXJ0LmJ5dGVPZmZzZXQgKyBwYXJ0LmJ5dGVMZW5ndGhcbiAgICAgICAgd2hpbGUgKHBvc2l0aW9uICE9PSBlbmQpIHtcbiAgICAgICAgICBjb25zdCBzaXplID0gTWF0aC5taW4oZW5kIC0gcG9zaXRpb24sIFBPT0xfU0laRSlcbiAgICAgICAgICBjb25zdCBjaHVuayA9IHBhcnQuYnVmZmVyLnNsaWNlKHBvc2l0aW9uLCBwb3NpdGlvbiArIHNpemUpXG4gICAgICAgICAgcG9zaXRpb24gKz0gY2h1bmsuYnl0ZUxlbmd0aFxuICAgICAgICAgIHlpZWxkIG5ldyBVaW50OEFycmF5KGNodW5rKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5aWVsZCBwYXJ0XG4gICAgICB9XG4gICAgLyogYzggaWdub3JlIG5leHQgMTAgKi9cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRm9yIGJsb2JzIHRoYXQgaGF2ZSBhcnJheUJ1ZmZlciBidXQgbm8gc3RyZWFtIG1ldGhvZCAobm9kZXMgYnVmZmVyLkJsb2IpXG4gICAgICBsZXQgcG9zaXRpb24gPSAwLCBiID0gKC8qKiBAdHlwZSB7QmxvYn0gKi8gKHBhcnQpKVxuICAgICAgd2hpbGUgKHBvc2l0aW9uICE9PSBiLnNpemUpIHtcbiAgICAgICAgY29uc3QgY2h1bmsgPSBiLnNsaWNlKHBvc2l0aW9uLCBNYXRoLm1pbihiLnNpemUsIHBvc2l0aW9uICsgUE9PTF9TSVpFKSlcbiAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgY2h1bmsuYXJyYXlCdWZmZXIoKVxuICAgICAgICBwb3NpdGlvbiArPSBidWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICB5aWVsZCBuZXcgVWludDhBcnJheShidWZmZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IF9CbG9iID0gY2xhc3MgQmxvYiB7XG4gIC8qKiBAdHlwZSB7QXJyYXkuPChCbG9ifFVpbnQ4QXJyYXkpPn0gKi9cbiAgI3BhcnRzID0gW11cbiAgI3R5cGUgPSAnJ1xuICAjc2l6ZSA9IDBcbiAgI2VuZGluZ3MgPSAndHJhbnNwYXJlbnQnXG5cbiAgLyoqXG4gICAqIFRoZSBCbG9iKCkgY29uc3RydWN0b3IgcmV0dXJucyBhIG5ldyBCbG9iIG9iamVjdC4gVGhlIGNvbnRlbnRcbiAgICogb2YgdGhlIGJsb2IgY29uc2lzdHMgb2YgdGhlIGNvbmNhdGVuYXRpb24gb2YgdGhlIHZhbHVlcyBnaXZlblxuICAgKiBpbiB0aGUgcGFyYW1ldGVyIGFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGJsb2JQYXJ0c1xuICAgKiBAcGFyYW0ge3sgdHlwZT86IHN0cmluZywgZW5kaW5ncz86IHN0cmluZyB9fSBbb3B0aW9uc11cbiAgICovXG4gIGNvbnN0cnVjdG9yIChibG9iUGFydHMgPSBbXSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBibG9iUGFydHMgIT09ICdvYmplY3QnIHx8IGJsb2JQYXJ0cyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdCbG9iXFwnOiBUaGUgcHJvdmlkZWQgdmFsdWUgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhIHNlcXVlbmNlLicpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBibG9iUGFydHNbU3ltYm9sLml0ZXJhdG9yXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdCbG9iXFwnOiBUaGUgb2JqZWN0IG11c3QgaGF2ZSBhIGNhbGxhYmxlIEBAaXRlcmF0b3IgcHJvcGVydHkuJylcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IFxcJ0Jsb2JcXCc6IHBhcmFtZXRlciAyIGNhbm5vdCBjb252ZXJ0IHRvIGRpY3Rpb25hcnkuJylcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCkgb3B0aW9ucyA9IHt9XG5cbiAgICBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKClcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgYmxvYlBhcnRzKSB7XG4gICAgICBsZXQgcGFydFxuICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhlbGVtZW50KSkge1xuICAgICAgICBwYXJ0ID0gbmV3IFVpbnQ4QXJyYXkoZWxlbWVudC5idWZmZXIuc2xpY2UoZWxlbWVudC5ieXRlT2Zmc2V0LCBlbGVtZW50LmJ5dGVPZmZzZXQgKyBlbGVtZW50LmJ5dGVMZW5ndGgpKVxuICAgICAgfSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcGFydCA9IG5ldyBVaW50OEFycmF5KGVsZW1lbnQuc2xpY2UoMCkpXG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIHBhcnQgPSBlbGVtZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0ID0gZW5jb2Rlci5lbmNvZGUoYCR7ZWxlbWVudH1gKVxuICAgICAgfVxuXG4gICAgICB0aGlzLiNzaXplICs9IEFycmF5QnVmZmVyLmlzVmlldyhwYXJ0KSA/IHBhcnQuYnl0ZUxlbmd0aCA6IHBhcnQuc2l6ZVxuICAgICAgdGhpcy4jcGFydHMucHVzaChwYXJ0KVxuICAgIH1cblxuICAgIHRoaXMuI2VuZGluZ3MgPSBgJHtvcHRpb25zLmVuZGluZ3MgPT09IHVuZGVmaW5lZCA/ICd0cmFuc3BhcmVudCcgOiBvcHRpb25zLmVuZGluZ3N9YFxuICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgPT09IHVuZGVmaW5lZCA/ICcnIDogU3RyaW5nKG9wdGlvbnMudHlwZSlcbiAgICB0aGlzLiN0eXBlID0gL15bXFx4MjAtXFx4N0VdKiQvLnRlc3QodHlwZSkgPyB0eXBlIDogJydcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgQmxvYiBpbnRlcmZhY2UncyBzaXplIHByb3BlcnR5IHJldHVybnMgdGhlXG4gICAqIHNpemUgb2YgdGhlIEJsb2IgaW4gYnl0ZXMuXG4gICAqL1xuICBnZXQgc2l6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3NpemVcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBwcm9wZXJ0eSBvZiBhIEJsb2Igb2JqZWN0IHJldHVybnMgdGhlIE1JTUUgdHlwZSBvZiB0aGUgZmlsZS5cbiAgICovXG4gIGdldCB0eXBlICgpIHtcbiAgICByZXR1cm4gdGhpcy4jdHlwZVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0ZXh0KCkgbWV0aG9kIGluIHRoZSBCbG9iIGludGVyZmFjZSByZXR1cm5zIGEgUHJvbWlzZVxuICAgKiB0aGF0IHJlc29sdmVzIHdpdGggYSBzdHJpbmcgY29udGFpbmluZyB0aGUgY29udGVudHMgb2ZcbiAgICogdGhlIGJsb2IsIGludGVycHJldGVkIGFzIFVURi04LlxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZz59XG4gICAqL1xuICBhc3luYyB0ZXh0ICgpIHtcbiAgICAvLyBNb3JlIG9wdGltaXplZCB0aGFuIHVzaW5nIHRoaXMuYXJyYXlCdWZmZXIoKVxuICAgIC8vIHRoYXQgcmVxdWlyZXMgdHdpY2UgYXMgbXVjaCByYW1cbiAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKClcbiAgICBsZXQgc3RyID0gJydcbiAgICBmb3IgYXdhaXQgKGNvbnN0IHBhcnQgb2YgdG9JdGVyYXRvcih0aGlzLiNwYXJ0cywgZmFsc2UpKSB7XG4gICAgICBzdHIgKz0gZGVjb2Rlci5kZWNvZGUocGFydCwgeyBzdHJlYW06IHRydWUgfSlcbiAgICB9XG4gICAgLy8gUmVtYWluaW5nXG4gICAgc3RyICs9IGRlY29kZXIuZGVjb2RlKClcbiAgICByZXR1cm4gc3RyXG4gIH1cblxuICAvKipcbiAgICogVGhlIGFycmF5QnVmZmVyKCkgbWV0aG9kIGluIHRoZSBCbG9iIGludGVyZmFjZSByZXR1cm5zIGFcbiAgICogUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZSBibG9iIGFzXG4gICAqIGJpbmFyeSBkYXRhIGNvbnRhaW5lZCBpbiBhbiBBcnJheUJ1ZmZlci5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxBcnJheUJ1ZmZlcj59XG4gICAqL1xuICBhc3luYyBhcnJheUJ1ZmZlciAoKSB7XG4gICAgLy8gRWFzaWVyIHdheS4uLiBKdXN0IGEgdW5uZWNlc3Nhcnkgb3ZlcmhlYWRcbiAgICAvLyBjb25zdCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5zaXplKTtcbiAgICAvLyBhd2FpdCB0aGlzLnN0cmVhbSgpLmdldFJlYWRlcih7bW9kZTogJ2J5b2InfSkucmVhZCh2aWV3KTtcbiAgICAvLyByZXR1cm4gdmlldy5idWZmZXI7XG5cbiAgICBjb25zdCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5zaXplKVxuICAgIGxldCBvZmZzZXQgPSAwXG4gICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiB0b0l0ZXJhdG9yKHRoaXMuI3BhcnRzLCBmYWxzZSkpIHtcbiAgICAgIGRhdGEuc2V0KGNodW5rLCBvZmZzZXQpXG4gICAgICBvZmZzZXQgKz0gY2h1bmsubGVuZ3RoXG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGEuYnVmZmVyXG4gIH1cblxuICBzdHJlYW0gKCkge1xuICAgIGNvbnN0IGl0ID0gdG9JdGVyYXRvcih0aGlzLiNwYXJ0cywgdHJ1ZSlcblxuICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpcy5SZWFkYWJsZVN0cmVhbSh7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0eXBlOiAnYnl0ZXMnLFxuICAgICAgYXN5bmMgcHVsbCAoY3RybCkge1xuICAgICAgICBjb25zdCBjaHVuayA9IGF3YWl0IGl0Lm5leHQoKVxuICAgICAgICBjaHVuay5kb25lID8gY3RybC5jbG9zZSgpIDogY3RybC5lbnF1ZXVlKGNodW5rLnZhbHVlKVxuICAgICAgfSxcblxuICAgICAgYXN5bmMgY2FuY2VsICgpIHtcbiAgICAgICAgYXdhaXQgaXQucmV0dXJuKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBCbG9iIGludGVyZmFjZSdzIHNsaWNlKCkgbWV0aG9kIGNyZWF0ZXMgYW5kIHJldHVybnMgYVxuICAgKiBuZXcgQmxvYiBvYmplY3Qgd2hpY2ggY29udGFpbnMgZGF0YSBmcm9tIGEgc3Vic2V0IG9mIHRoZVxuICAgKiBibG9iIG9uIHdoaWNoIGl0J3MgY2FsbGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0XVxuICAgKiBAcGFyYW0ge251bWJlcn0gW2VuZF1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXVxuICAgKi9cbiAgc2xpY2UgKHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5zaXplLCB0eXBlID0gJycpIHtcbiAgICBjb25zdCB7IHNpemUgfSA9IHRoaXNcblxuICAgIGxldCByZWxhdGl2ZVN0YXJ0ID0gc3RhcnQgPCAwID8gTWF0aC5tYXgoc2l6ZSArIHN0YXJ0LCAwKSA6IE1hdGgubWluKHN0YXJ0LCBzaXplKVxuICAgIGxldCByZWxhdGl2ZUVuZCA9IGVuZCA8IDAgPyBNYXRoLm1heChzaXplICsgZW5kLCAwKSA6IE1hdGgubWluKGVuZCwgc2l6ZSlcblxuICAgIGNvbnN0IHNwYW4gPSBNYXRoLm1heChyZWxhdGl2ZUVuZCAtIHJlbGF0aXZlU3RhcnQsIDApXG4gICAgY29uc3QgcGFydHMgPSB0aGlzLiNwYXJ0c1xuICAgIGNvbnN0IGJsb2JQYXJ0cyA9IFtdXG4gICAgbGV0IGFkZGVkID0gMFxuXG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgICAvLyBkb24ndCBhZGQgdGhlIG92ZXJmbG93IHRvIG5ldyBibG9iUGFydHNcbiAgICAgIGlmIChhZGRlZCA+PSBzcGFuKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNpemUgPSBBcnJheUJ1ZmZlci5pc1ZpZXcocGFydCkgPyBwYXJ0LmJ5dGVMZW5ndGggOiBwYXJ0LnNpemVcbiAgICAgIGlmIChyZWxhdGl2ZVN0YXJ0ICYmIHNpemUgPD0gcmVsYXRpdmVTdGFydCkge1xuICAgICAgICAvLyBTa2lwIHRoZSBiZWdpbm5pbmcgYW5kIGNoYW5nZSB0aGUgcmVsYXRpdmVcbiAgICAgICAgLy8gc3RhcnQgJiBlbmQgcG9zaXRpb24gYXMgd2Ugc2tpcCB0aGUgdW53YW50ZWQgcGFydHNcbiAgICAgICAgcmVsYXRpdmVTdGFydCAtPSBzaXplXG4gICAgICAgIHJlbGF0aXZlRW5kIC09IHNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjaHVua1xuICAgICAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHBhcnQpKSB7XG4gICAgICAgICAgY2h1bmsgPSBwYXJ0LnN1YmFycmF5KHJlbGF0aXZlU3RhcnQsIE1hdGgubWluKHNpemUsIHJlbGF0aXZlRW5kKSlcbiAgICAgICAgICBhZGRlZCArPSBjaHVuay5ieXRlTGVuZ3RoXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2h1bmsgPSBwYXJ0LnNsaWNlKHJlbGF0aXZlU3RhcnQsIE1hdGgubWluKHNpemUsIHJlbGF0aXZlRW5kKSlcbiAgICAgICAgICBhZGRlZCArPSBjaHVuay5zaXplXG4gICAgICAgIH1cbiAgICAgICAgcmVsYXRpdmVFbmQgLT0gc2l6ZVxuICAgICAgICBibG9iUGFydHMucHVzaChjaHVuaylcbiAgICAgICAgcmVsYXRpdmVTdGFydCA9IDAgLy8gQWxsIG5leHQgc2VxdWVudGlhbCBwYXJ0cyBzaG91bGQgc3RhcnQgYXQgMFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbXSwgeyB0eXBlOiBTdHJpbmcodHlwZSkudG9Mb3dlckNhc2UoKSB9KVxuICAgIGJsb2IuI3NpemUgPSBzcGFuXG4gICAgYmxvYi4jcGFydHMgPSBibG9iUGFydHNcblxuICAgIHJldHVybiBibG9iXG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkge1xuICAgIHJldHVybiAnQmxvYidcbiAgfVxuXG4gIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXSAob2JqZWN0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIG9iamVjdCAmJlxuICAgICAgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChcbiAgICAgICAgdHlwZW9mIG9iamVjdC5zdHJlYW0gPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgdHlwZW9mIG9iamVjdC5hcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSAmJlxuICAgICAgL14oQmxvYnxGaWxlKSQvLnRlc3Qob2JqZWN0W1N5bWJvbC50b1N0cmluZ1RhZ10pXG4gICAgKVxuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKF9CbG9iLnByb3RvdHlwZSwge1xuICBzaXplOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgdHlwZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gIHNsaWNlOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSlcblxuLyoqIEB0eXBlIHt0eXBlb2YgZ2xvYmFsVGhpcy5CbG9ifSAqL1xuZXhwb3J0IGNvbnN0IEJsb2IgPSBfQmxvYlxuZXhwb3J0IGRlZmF1bHQgQmxvYlxuIiwgImltcG9ydCBCbG9iIGZyb20gJy4vaW5kZXguanMnXG5cbmNvbnN0IF9GaWxlID0gY2xhc3MgRmlsZSBleHRlbmRzIEJsb2Ige1xuICAjbGFzdE1vZGlmaWVkID0gMFxuICAjbmFtZSA9ICcnXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7KltdfSBmaWxlQml0c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWVcbiAgICogQHBhcmFtIHt7bGFzdE1vZGlmaWVkPzogbnVtYmVyLCB0eXBlPzogc3RyaW5nfX0gb3B0aW9uc1xuICAgKi8vLyBAdHMtaWdub3JlXG4gIGNvbnN0cnVjdG9yIChmaWxlQml0cywgZmlsZU5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRmFpbGVkIHRvIGNvbnN0cnVjdCAnRmlsZSc6IDIgYXJndW1lbnRzIHJlcXVpcmVkLCBidXQgb25seSAke2FyZ3VtZW50cy5sZW5ndGh9IHByZXNlbnQuYClcbiAgICB9XG4gICAgc3VwZXIoZmlsZUJpdHMsIG9wdGlvbnMpXG5cbiAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCkgb3B0aW9ucyA9IHt9XG5cbiAgICAvLyBTaW11bGF0ZSBXZWJJREwgdHlwZSBjYXN0aW5nIGZvciBOYU4gdmFsdWUgaW4gbGFzdE1vZGlmaWVkIG9wdGlvbi5cbiAgICBjb25zdCBsYXN0TW9kaWZpZWQgPSBvcHRpb25zLmxhc3RNb2RpZmllZCA9PT0gdW5kZWZpbmVkID8gRGF0ZS5ub3coKSA6IE51bWJlcihvcHRpb25zLmxhc3RNb2RpZmllZClcbiAgICBpZiAoIU51bWJlci5pc05hTihsYXN0TW9kaWZpZWQpKSB7XG4gICAgICB0aGlzLiNsYXN0TW9kaWZpZWQgPSBsYXN0TW9kaWZpZWRcbiAgICB9XG5cbiAgICB0aGlzLiNuYW1lID0gU3RyaW5nKGZpbGVOYW1lKVxuICB9XG5cbiAgZ2V0IG5hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLiNuYW1lXG4gIH1cblxuICBnZXQgbGFzdE1vZGlmaWVkICgpIHtcbiAgICByZXR1cm4gdGhpcy4jbGFzdE1vZGlmaWVkXG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkge1xuICAgIHJldHVybiAnRmlsZSdcbiAgfVxuXG4gIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXSAob2JqZWN0KSB7XG4gICAgcmV0dXJuICEhb2JqZWN0ICYmIG9iamVjdCBpbnN0YW5jZW9mIEJsb2IgJiZcbiAgICAgIC9eKEZpbGUpJC8udGVzdChvYmplY3RbU3ltYm9sLnRvU3RyaW5nVGFnXSlcbiAgfVxufVxuXG4vKiogQHR5cGUge3R5cGVvZiBnbG9iYWxUaGlzLkZpbGV9ICovLy8gQHRzLWlnbm9yZVxuZXhwb3J0IGNvbnN0IEZpbGUgPSBfRmlsZVxuZXhwb3J0IGRlZmF1bHQgRmlsZVxuIiwgIi8qISBmb3JtZGF0YS1wb2x5ZmlsbC4gTUlUIExpY2Vuc2UuIEppbW15IFdcdTAwRTRydGluZyA8aHR0cHM6Ly9qaW1teS53YXJ0aW5nLnNlL29wZW5zb3VyY2U+ICovXG5cbmltcG9ydCBDIGZyb20gJ2ZldGNoLWJsb2InXG5pbXBvcnQgRiBmcm9tICdmZXRjaC1ibG9iL2ZpbGUuanMnXG5cbnZhciB7dG9TdHJpbmdUYWc6dCxpdGVyYXRvcjppLGhhc0luc3RhbmNlOmh9PVN5bWJvbCxcbnI9TWF0aC5yYW5kb20sXG5tPSdhcHBlbmQsc2V0LGdldCxnZXRBbGwsZGVsZXRlLGtleXMsdmFsdWVzLGVudHJpZXMsZm9yRWFjaCxjb25zdHJ1Y3Rvcicuc3BsaXQoJywnKSxcbmY9KGEsYixjKT0+KGErPScnLC9eKEJsb2J8RmlsZSkkLy50ZXN0KGIgJiYgYlt0XSk/WyhjPWMhPT12b2lkIDA/YysnJzpiW3RdPT0nRmlsZSc/Yi5uYW1lOidibG9iJyxhKSxiLm5hbWUhPT1jfHxiW3RdPT0nYmxvYic/bmV3IEYoW2JdLGMsYik6Yl06W2EsYisnJ10pLFxuZT0oYyxmKT0+KGY/YzpjLnJlcGxhY2UoL1xccj9cXG58XFxyL2csJ1xcclxcbicpKS5yZXBsYWNlKC9cXG4vZywnJTBBJykucmVwbGFjZSgvXFxyL2csJyUwRCcpLnJlcGxhY2UoL1wiL2csJyUyMicpLFxueD0obiwgYSwgZSk9PntpZihhLmxlbmd0aDxlKXt0aHJvdyBuZXcgVHlwZUVycm9yKGBGYWlsZWQgdG8gZXhlY3V0ZSAnJHtufScgb24gJ0Zvcm1EYXRhJzogJHtlfSBhcmd1bWVudHMgcmVxdWlyZWQsIGJ1dCBvbmx5ICR7YS5sZW5ndGh9IHByZXNlbnQuYCl9fVxuXG5leHBvcnQgY29uc3QgRmlsZSA9IEZcblxuLyoqIEB0eXBlIHt0eXBlb2YgZ2xvYmFsVGhpcy5Gb3JtRGF0YX0gKi9cbmV4cG9ydCBjb25zdCBGb3JtRGF0YSA9IGNsYXNzIEZvcm1EYXRhIHtcbiNkPVtdO1xuY29uc3RydWN0b3IoLi4uYSl7aWYoYS5sZW5ndGgpdGhyb3cgbmV3IFR5cGVFcnJvcihgRmFpbGVkIHRvIGNvbnN0cnVjdCAnRm9ybURhdGEnOiBwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSAnSFRNTEZvcm1FbGVtZW50Jy5gKX1cbmdldCBbdF0oKSB7cmV0dXJuICdGb3JtRGF0YSd9XG5baV0oKXtyZXR1cm4gdGhpcy5lbnRyaWVzKCl9XG5zdGF0aWMgW2hdKG8pIHtyZXR1cm4gbyYmdHlwZW9mIG89PT0nb2JqZWN0JyYmb1t0XT09PSdGb3JtRGF0YScmJiFtLnNvbWUobT0+dHlwZW9mIG9bbV0hPSdmdW5jdGlvbicpfVxuYXBwZW5kKC4uLmEpe3goJ2FwcGVuZCcsYXJndW1lbnRzLDIpO3RoaXMuI2QucHVzaChmKC4uLmEpKX1cbmRlbGV0ZShhKXt4KCdkZWxldGUnLGFyZ3VtZW50cywxKTthKz0nJzt0aGlzLiNkPXRoaXMuI2QuZmlsdGVyKChbYl0pPT5iIT09YSl9XG5nZXQoYSl7eCgnZ2V0Jyxhcmd1bWVudHMsMSk7YSs9Jyc7Zm9yKHZhciBiPXRoaXMuI2QsbD1iLmxlbmd0aCxjPTA7YzxsO2MrKylpZihiW2NdWzBdPT09YSlyZXR1cm4gYltjXVsxXTtyZXR1cm4gbnVsbH1cbmdldEFsbChhLGIpe3goJ2dldEFsbCcsYXJndW1lbnRzLDEpO2I9W107YSs9Jyc7dGhpcy4jZC5mb3JFYWNoKGM9PmNbMF09PT1hJiZiLnB1c2goY1sxXSkpO3JldHVybiBifVxuaGFzKGEpe3goJ2hhcycsYXJndW1lbnRzLDEpO2ErPScnO3JldHVybiB0aGlzLiNkLnNvbWUoYj0+YlswXT09PWEpfVxuZm9yRWFjaChhLGIpe3goJ2ZvckVhY2gnLGFyZ3VtZW50cywxKTtmb3IodmFyIFtjLGRdb2YgdGhpcylhLmNhbGwoYixkLGMsdGhpcyl9XG5zZXQoLi4uYSl7eCgnc2V0Jyxhcmd1bWVudHMsMik7dmFyIGI9W10sYz0hMDthPWYoLi4uYSk7dGhpcy4jZC5mb3JFYWNoKGQ9PntkWzBdPT09YVswXT9jJiYoYz0hYi5wdXNoKGEpKTpiLnB1c2goZCl9KTtjJiZiLnB1c2goYSk7dGhpcy4jZD1ifVxuKmVudHJpZXMoKXt5aWVsZCp0aGlzLiNkfVxuKmtleXMoKXtmb3IodmFyW2Fdb2YgdGhpcyl5aWVsZCBhfVxuKnZhbHVlcygpe2Zvcih2YXJbLGFdb2YgdGhpcyl5aWVsZCBhfX1cblxuLyoqIEBwYXJhbSB7Rm9ybURhdGF9IEYgKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtRGF0YVRvQmxvYiAoRixCPUMpe1xudmFyIGI9YCR7cigpfSR7cigpfWAucmVwbGFjZSgvXFwuL2csICcnKS5zbGljZSgtMjgpLnBhZFN0YXJ0KDMyLCAnLScpLGM9W10scD1gLS0ke2J9XFxyXFxuQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPVwiYFxuRi5mb3JFYWNoKCh2LG4pPT50eXBlb2Ygdj09J3N0cmluZydcbj9jLnB1c2gocCtlKG4pK2BcIlxcclxcblxcclxcbiR7di5yZXBsYWNlKC9cXHIoPyFcXG4pfCg/PCFcXHIpXFxuL2csICdcXHJcXG4nKX1cXHJcXG5gKVxuOmMucHVzaChwK2UobikrYFwiOyBmaWxlbmFtZT1cIiR7ZSh2Lm5hbWUsIDEpfVwiXFxyXFxuQ29udGVudC1UeXBlOiAke3YudHlwZXx8XCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIn1cXHJcXG5cXHJcXG5gLCB2LCAnXFxyXFxuJykpXG5jLnB1c2goYC0tJHtifS0tYClcbnJldHVybiBuZXcgQihjLHt0eXBlOlwibXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9XCIrYn0pfVxuIiwgIi8qISBub2RlLWRvbWV4Y2VwdGlvbi4gTUlUIExpY2Vuc2UuIEppbW15IFdcdTAwRTRydGluZyA8aHR0cHM6Ly9qaW1teS53YXJ0aW5nLnNlL29wZW5zb3VyY2U+ICovXG5cbmlmICghZ2xvYmFsVGhpcy5ET01FeGNlcHRpb24pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IE1lc3NhZ2VDaGFubmVsIH0gPSByZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpLFxuICAgIHBvcnQgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKS5wb3J0MSxcbiAgICBhYiA9IG5ldyBBcnJheUJ1ZmZlcigpXG4gICAgcG9ydC5wb3N0TWVzc2FnZShhYiwgW2FiLCBhYl0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVyci5jb25zdHJ1Y3Rvci5uYW1lID09PSAnRE9NRXhjZXB0aW9uJyAmJiAoXG4gICAgICBnbG9iYWxUaGlzLkRPTUV4Y2VwdGlvbiA9IGVyci5jb25zdHJ1Y3RvclxuICAgIClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFRoaXMuRE9NRXhjZXB0aW9uXG4iLCAiaW1wb3J0IHsgc3RhdFN5bmMsIGNyZWF0ZVJlYWRTdHJlYW0sIHByb21pc2VzIGFzIGZzIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IGJhc2VuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IERPTUV4Y2VwdGlvbiBmcm9tICdub2RlLWRvbWV4Y2VwdGlvbidcblxuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJ1xuaW1wb3J0IEJsb2IgZnJvbSAnLi9pbmRleC5qcydcblxuY29uc3QgeyBzdGF0IH0gPSBmc1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIGZpbGVwYXRoIG9uIHRoZSBkaXNrXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIG1pbWV0eXBlIHRvIHVzZVxuICovXG5jb25zdCBibG9iRnJvbVN5bmMgPSAocGF0aCwgdHlwZSkgPT4gZnJvbUJsb2Ioc3RhdFN5bmMocGF0aCksIHBhdGgsIHR5cGUpXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggZmlsZXBhdGggb24gdGhlIGRpc2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV0gbWltZXR5cGUgdG8gdXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxCbG9iPn1cbiAqL1xuY29uc3QgYmxvYkZyb20gPSAocGF0aCwgdHlwZSkgPT4gc3RhdChwYXRoKS50aGVuKHN0YXQgPT4gZnJvbUJsb2Ioc3RhdCwgcGF0aCwgdHlwZSkpXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggZmlsZXBhdGggb24gdGhlIGRpc2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV0gbWltZXR5cGUgdG8gdXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxGaWxlPn1cbiAqL1xuY29uc3QgZmlsZUZyb20gPSAocGF0aCwgdHlwZSkgPT4gc3RhdChwYXRoKS50aGVuKHN0YXQgPT4gZnJvbUZpbGUoc3RhdCwgcGF0aCwgdHlwZSkpXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggZmlsZXBhdGggb24gdGhlIGRpc2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV0gbWltZXR5cGUgdG8gdXNlXG4gKi9cbmNvbnN0IGZpbGVGcm9tU3luYyA9IChwYXRoLCB0eXBlKSA9PiBmcm9tRmlsZShzdGF0U3luYyhwYXRoKSwgcGF0aCwgdHlwZSlcblxuLy8gQHRzLWlnbm9yZVxuY29uc3QgZnJvbUJsb2IgPSAoc3RhdCwgcGF0aCwgdHlwZSA9ICcnKSA9PiBuZXcgQmxvYihbbmV3IEJsb2JEYXRhSXRlbSh7XG4gIHBhdGgsXG4gIHNpemU6IHN0YXQuc2l6ZSxcbiAgbGFzdE1vZGlmaWVkOiBzdGF0Lm10aW1lTXMsXG4gIHN0YXJ0OiAwXG59KV0sIHsgdHlwZSB9KVxuXG4vLyBAdHMtaWdub3JlXG5jb25zdCBmcm9tRmlsZSA9IChzdGF0LCBwYXRoLCB0eXBlID0gJycpID0+IG5ldyBGaWxlKFtuZXcgQmxvYkRhdGFJdGVtKHtcbiAgcGF0aCxcbiAgc2l6ZTogc3RhdC5zaXplLFxuICBsYXN0TW9kaWZpZWQ6IHN0YXQubXRpbWVNcyxcbiAgc3RhcnQ6IDBcbn0pXSwgYmFzZW5hbWUocGF0aCksIHsgdHlwZSwgbGFzdE1vZGlmaWVkOiBzdGF0Lm10aW1lTXMgfSlcblxuLyoqXG4gKiBUaGlzIGlzIGEgYmxvYiBiYWNrZWQgdXAgYnkgYSBmaWxlIG9uIHRoZSBkaXNrXG4gKiB3aXRoIG1pbml1bSByZXF1aXJlbWVudC4gSXRzIHdyYXBwZWQgYXJvdW5kIGEgQmxvYiBhcyBhIGJsb2JQYXJ0XG4gKiBzbyB5b3UgaGF2ZSBubyBkaXJlY3QgYWNjZXNzIHRvIHRoaXMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgQmxvYkRhdGFJdGVtIHtcbiAgI3BhdGhcbiAgI3N0YXJ0XG5cbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICB0aGlzLiNwYXRoID0gb3B0aW9ucy5wYXRoXG4gICAgdGhpcy4jc3RhcnQgPSBvcHRpb25zLnN0YXJ0XG4gICAgdGhpcy5zaXplID0gb3B0aW9ucy5zaXplXG4gICAgdGhpcy5sYXN0TW9kaWZpZWQgPSBvcHRpb25zLmxhc3RNb2RpZmllZFxuICB9XG5cbiAgLyoqXG4gICAqIFNsaWNpbmcgYXJndW1lbnRzIGlzIGZpcnN0IHZhbGlkYXRlZCBhbmQgZm9ybWF0dGVkXG4gICAqIHRvIG5vdCBiZSBvdXQgb2YgcmFuZ2UgYnkgQmxvYi5wcm90b3R5cGUuc2xpY2VcbiAgICovXG4gIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIG5ldyBCbG9iRGF0YUl0ZW0oe1xuICAgICAgcGF0aDogdGhpcy4jcGF0aCxcbiAgICAgIGxhc3RNb2RpZmllZDogdGhpcy5sYXN0TW9kaWZpZWQsXG4gICAgICBzaXplOiBlbmQgLSBzdGFydCxcbiAgICAgIHN0YXJ0OiB0aGlzLiNzdGFydCArIHN0YXJ0XG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jICogc3RyZWFtICgpIHtcbiAgICBjb25zdCB7IG10aW1lTXMgfSA9IGF3YWl0IHN0YXQodGhpcy4jcGF0aClcbiAgICBpZiAobXRpbWVNcyA+IHRoaXMubGFzdE1vZGlmaWVkKSB7XG4gICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUaGUgcmVxdWVzdGVkIGZpbGUgY291bGQgbm90IGJlIHJlYWQsIHR5cGljYWxseSBkdWUgdG8gcGVybWlzc2lvbiBwcm9ibGVtcyB0aGF0IGhhdmUgb2NjdXJyZWQgYWZ0ZXIgYSByZWZlcmVuY2UgdG8gYSBmaWxlIHdhcyBhY3F1aXJlZC4nLCAnTm90UmVhZGFibGVFcnJvcicpXG4gICAgfVxuICAgIHlpZWxkICogY3JlYXRlUmVhZFN0cmVhbSh0aGlzLiNwYXRoLCB7XG4gICAgICBzdGFydDogdGhpcy4jc3RhcnQsXG4gICAgICBlbmQ6IHRoaXMuI3N0YXJ0ICsgdGhpcy5zaXplIC0gMVxuICAgIH0pXG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkge1xuICAgIHJldHVybiAnQmxvYidcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBibG9iRnJvbVN5bmNcbmV4cG9ydCB7IEZpbGUsIEJsb2IsIGJsb2JGcm9tLCBibG9iRnJvbVN5bmMsIGZpbGVGcm9tLCBmaWxlRnJvbVN5bmMgfVxuIiwgImltcG9ydCB7RmlsZX0gZnJvbSAnZmV0Y2gtYmxvYi9mcm9tLmpzJztcbmltcG9ydCB7Rm9ybURhdGF9IGZyb20gJ2Zvcm1kYXRhLXBvbHlmaWxsL2VzbS5taW4uanMnO1xuXG5sZXQgcyA9IDA7XG5jb25zdCBTID0ge1xuXHRTVEFSVF9CT1VOREFSWTogcysrLFxuXHRIRUFERVJfRklFTERfU1RBUlQ6IHMrKyxcblx0SEVBREVSX0ZJRUxEOiBzKyssXG5cdEhFQURFUl9WQUxVRV9TVEFSVDogcysrLFxuXHRIRUFERVJfVkFMVUU6IHMrKyxcblx0SEVBREVSX1ZBTFVFX0FMTU9TVF9ET05FOiBzKyssXG5cdEhFQURFUlNfQUxNT1NUX0RPTkU6IHMrKyxcblx0UEFSVF9EQVRBX1NUQVJUOiBzKyssXG5cdFBBUlRfREFUQTogcysrLFxuXHRFTkQ6IHMrK1xufTtcblxubGV0IGYgPSAxO1xuY29uc3QgRiA9IHtcblx0UEFSVF9CT1VOREFSWTogZixcblx0TEFTVF9CT1VOREFSWTogZiAqPSAyXG59O1xuXG5jb25zdCBMRiA9IDEwO1xuY29uc3QgQ1IgPSAxMztcbmNvbnN0IFNQQUNFID0gMzI7XG5jb25zdCBIWVBIRU4gPSA0NTtcbmNvbnN0IENPTE9OID0gNTg7XG5jb25zdCBBID0gOTc7XG5jb25zdCBaID0gMTIyO1xuXG5jb25zdCBsb3dlciA9IGMgPT4gYyB8IDB4MjA7XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuY2xhc3MgTXVsdGlwYXJ0UGFyc2VyIHtcblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGFyeVxuXHQgKi9cblx0Y29uc3RydWN0b3IoYm91bmRhcnkpIHtcblx0XHR0aGlzLmluZGV4ID0gMDtcblx0XHR0aGlzLmZsYWdzID0gMDtcblxuXHRcdHRoaXMub25IZWFkZXJFbmQgPSBub29wO1xuXHRcdHRoaXMub25IZWFkZXJGaWVsZCA9IG5vb3A7XG5cdFx0dGhpcy5vbkhlYWRlcnNFbmQgPSBub29wO1xuXHRcdHRoaXMub25IZWFkZXJWYWx1ZSA9IG5vb3A7XG5cdFx0dGhpcy5vblBhcnRCZWdpbiA9IG5vb3A7XG5cdFx0dGhpcy5vblBhcnREYXRhID0gbm9vcDtcblx0XHR0aGlzLm9uUGFydEVuZCA9IG5vb3A7XG5cblx0XHR0aGlzLmJvdW5kYXJ5Q2hhcnMgPSB7fTtcblxuXHRcdGJvdW5kYXJ5ID0gJ1xcclxcbi0tJyArIGJvdW5kYXJ5O1xuXHRcdGNvbnN0IHVpOGEgPSBuZXcgVWludDhBcnJheShib3VuZGFyeS5sZW5ndGgpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYm91bmRhcnkubGVuZ3RoOyBpKyspIHtcblx0XHRcdHVpOGFbaV0gPSBib3VuZGFyeS5jaGFyQ29kZUF0KGkpO1xuXHRcdFx0dGhpcy5ib3VuZGFyeUNoYXJzW3VpOGFbaV1dID0gdHJ1ZTtcblx0XHR9XG5cblx0XHR0aGlzLmJvdW5kYXJ5ID0gdWk4YTtcblx0XHR0aGlzLmxvb2tiZWhpbmQgPSBuZXcgVWludDhBcnJheSh0aGlzLmJvdW5kYXJ5Lmxlbmd0aCArIDgpO1xuXHRcdHRoaXMuc3RhdGUgPSBTLlNUQVJUX0JPVU5EQVJZO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7VWludDhBcnJheX0gZGF0YVxuXHQgKi9cblx0d3JpdGUoZGF0YSkge1xuXHRcdGxldCBpID0gMDtcblx0XHRjb25zdCBsZW5ndGhfID0gZGF0YS5sZW5ndGg7XG5cdFx0bGV0IHByZXZpb3VzSW5kZXggPSB0aGlzLmluZGV4O1xuXHRcdGxldCB7bG9va2JlaGluZCwgYm91bmRhcnksIGJvdW5kYXJ5Q2hhcnMsIGluZGV4LCBzdGF0ZSwgZmxhZ3N9ID0gdGhpcztcblx0XHRjb25zdCBib3VuZGFyeUxlbmd0aCA9IHRoaXMuYm91bmRhcnkubGVuZ3RoO1xuXHRcdGNvbnN0IGJvdW5kYXJ5RW5kID0gYm91bmRhcnlMZW5ndGggLSAxO1xuXHRcdGNvbnN0IGJ1ZmZlckxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXHRcdGxldCBjO1xuXHRcdGxldCBjbDtcblxuXHRcdGNvbnN0IG1hcmsgPSBuYW1lID0+IHtcblx0XHRcdHRoaXNbbmFtZSArICdNYXJrJ10gPSBpO1xuXHRcdH07XG5cblx0XHRjb25zdCBjbGVhciA9IG5hbWUgPT4ge1xuXHRcdFx0ZGVsZXRlIHRoaXNbbmFtZSArICdNYXJrJ107XG5cdFx0fTtcblxuXHRcdGNvbnN0IGNhbGxiYWNrID0gKGNhbGxiYWNrU3ltYm9sLCBzdGFydCwgZW5kLCB1aThhKSA9PiB7XG5cdFx0XHRpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCAhPT0gZW5kKSB7XG5cdFx0XHRcdHRoaXNbY2FsbGJhY2tTeW1ib2xdKHVpOGEgJiYgdWk4YS5zdWJhcnJheShzdGFydCwgZW5kKSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGNvbnN0IGRhdGFDYWxsYmFjayA9IChuYW1lLCBjbGVhcikgPT4ge1xuXHRcdFx0Y29uc3QgbWFya1N5bWJvbCA9IG5hbWUgKyAnTWFyayc7XG5cdFx0XHRpZiAoIShtYXJrU3ltYm9sIGluIHRoaXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNsZWFyKSB7XG5cdFx0XHRcdGNhbGxiYWNrKG5hbWUsIHRoaXNbbWFya1N5bWJvbF0sIGksIGRhdGEpO1xuXHRcdFx0XHRkZWxldGUgdGhpc1ttYXJrU3ltYm9sXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNhbGxiYWNrKG5hbWUsIHRoaXNbbWFya1N5bWJvbF0sIGRhdGEubGVuZ3RoLCBkYXRhKTtcblx0XHRcdFx0dGhpc1ttYXJrU3ltYm9sXSA9IDA7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW5ndGhfOyBpKyspIHtcblx0XHRcdGMgPSBkYXRhW2ldO1xuXG5cdFx0XHRzd2l0Y2ggKHN0YXRlKSB7XG5cdFx0XHRcdGNhc2UgUy5TVEFSVF9CT1VOREFSWTpcblx0XHRcdFx0XHRpZiAoaW5kZXggPT09IGJvdW5kYXJ5Lmxlbmd0aCAtIDIpIHtcblx0XHRcdFx0XHRcdGlmIChjID09PSBIWVBIRU4pIHtcblx0XHRcdFx0XHRcdFx0ZmxhZ3MgfD0gRi5MQVNUX0JPVU5EQVJZO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChjICE9PSBDUikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGluZGV4Kys7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGluZGV4IC0gMSA9PT0gYm91bmRhcnkubGVuZ3RoIC0gMikge1xuXHRcdFx0XHRcdFx0aWYgKGZsYWdzICYgRi5MQVNUX0JPVU5EQVJZICYmIGMgPT09IEhZUEhFTikge1xuXHRcdFx0XHRcdFx0XHRzdGF0ZSA9IFMuRU5EO1xuXHRcdFx0XHRcdFx0XHRmbGFncyA9IDA7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCEoZmxhZ3MgJiBGLkxBU1RfQk9VTkRBUlkpICYmIGMgPT09IExGKSB7XG5cdFx0XHRcdFx0XHRcdGluZGV4ID0gMDtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soJ29uUGFydEJlZ2luJyk7XG5cdFx0XHRcdFx0XHRcdHN0YXRlID0gUy5IRUFERVJfRklFTERfU1RBUlQ7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChjICE9PSBib3VuZGFyeVtpbmRleCArIDJdKSB7XG5cdFx0XHRcdFx0XHRpbmRleCA9IC0yO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChjID09PSBib3VuZGFyeVtpbmRleCArIDJdKSB7XG5cdFx0XHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFMuSEVBREVSX0ZJRUxEX1NUQVJUOlxuXHRcdFx0XHRcdHN0YXRlID0gUy5IRUFERVJfRklFTEQ7XG5cdFx0XHRcdFx0bWFyaygnb25IZWFkZXJGaWVsZCcpO1xuXHRcdFx0XHRcdGluZGV4ID0gMDtcblx0XHRcdFx0XHQvLyBmYWxscyB0aHJvdWdoXG5cdFx0XHRcdGNhc2UgUy5IRUFERVJfRklFTEQ6XG5cdFx0XHRcdFx0aWYgKGMgPT09IENSKSB7XG5cdFx0XHRcdFx0XHRjbGVhcignb25IZWFkZXJGaWVsZCcpO1xuXHRcdFx0XHRcdFx0c3RhdGUgPSBTLkhFQURFUlNfQUxNT1NUX0RPTkU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRcdGlmIChjID09PSBIWVBIRU4pIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChjID09PSBDT0xPTikge1xuXHRcdFx0XHRcdFx0aWYgKGluZGV4ID09PSAxKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGVtcHR5IGhlYWRlciBmaWVsZFxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGRhdGFDYWxsYmFjaygnb25IZWFkZXJGaWVsZCcsIHRydWUpO1xuXHRcdFx0XHRcdFx0c3RhdGUgPSBTLkhFQURFUl9WQUxVRV9TVEFSVDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNsID0gbG93ZXIoYyk7XG5cdFx0XHRcdFx0aWYgKGNsIDwgQSB8fCBjbCA+IFopIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBTLkhFQURFUl9WQUxVRV9TVEFSVDpcblx0XHRcdFx0XHRpZiAoYyA9PT0gU1BBQ0UpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG1hcmsoJ29uSGVhZGVyVmFsdWUnKTtcblx0XHRcdFx0XHRzdGF0ZSA9IFMuSEVBREVSX1ZBTFVFO1xuXHRcdFx0XHRcdC8vIGZhbGxzIHRocm91Z2hcblx0XHRcdFx0Y2FzZSBTLkhFQURFUl9WQUxVRTpcblx0XHRcdFx0XHRpZiAoYyA9PT0gQ1IpIHtcblx0XHRcdFx0XHRcdGRhdGFDYWxsYmFjaygnb25IZWFkZXJWYWx1ZScsIHRydWUpO1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2soJ29uSGVhZGVyRW5kJyk7XG5cdFx0XHRcdFx0XHRzdGF0ZSA9IFMuSEVBREVSX1ZBTFVFX0FMTU9TVF9ET05FO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFMuSEVBREVSX1ZBTFVFX0FMTU9TVF9ET05FOlxuXHRcdFx0XHRcdGlmIChjICE9PSBMRikge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YXRlID0gUy5IRUFERVJfRklFTERfU1RBUlQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgUy5IRUFERVJTX0FMTU9TVF9ET05FOlxuXHRcdFx0XHRcdGlmIChjICE9PSBMRikge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNhbGxiYWNrKCdvbkhlYWRlcnNFbmQnKTtcblx0XHRcdFx0XHRzdGF0ZSA9IFMuUEFSVF9EQVRBX1NUQVJUO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFMuUEFSVF9EQVRBX1NUQVJUOlxuXHRcdFx0XHRcdHN0YXRlID0gUy5QQVJUX0RBVEE7XG5cdFx0XHRcdFx0bWFyaygnb25QYXJ0RGF0YScpO1xuXHRcdFx0XHRcdC8vIGZhbGxzIHRocm91Z2hcblx0XHRcdFx0Y2FzZSBTLlBBUlRfREFUQTpcblx0XHRcdFx0XHRwcmV2aW91c0luZGV4ID0gaW5kZXg7XG5cblx0XHRcdFx0XHRpZiAoaW5kZXggPT09IDApIHtcblx0XHRcdFx0XHRcdC8vIGJveWVyLW1vb3JlIGRlcnJpdmVkIGFsZ29yaXRobSB0byBzYWZlbHkgc2tpcCBub24tYm91bmRhcnkgZGF0YVxuXHRcdFx0XHRcdFx0aSArPSBib3VuZGFyeUVuZDtcblx0XHRcdFx0XHRcdHdoaWxlIChpIDwgYnVmZmVyTGVuZ3RoICYmICEoZGF0YVtpXSBpbiBib3VuZGFyeUNoYXJzKSkge1xuXHRcdFx0XHRcdFx0XHRpICs9IGJvdW5kYXJ5TGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpIC09IGJvdW5kYXJ5RW5kO1xuXHRcdFx0XHRcdFx0YyA9IGRhdGFbaV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGluZGV4IDwgYm91bmRhcnkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRpZiAoYm91bmRhcnlbaW5kZXhdID09PSBjKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChpbmRleCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFDYWxsYmFjaygnb25QYXJ0RGF0YScsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGluZGV4ID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGluZGV4ID09PSBib3VuZGFyeS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGluZGV4Kys7XG5cdFx0XHRcdFx0XHRpZiAoYyA9PT0gQ1IpIHtcblx0XHRcdFx0XHRcdFx0Ly8gQ1IgPSBwYXJ0IGJvdW5kYXJ5XG5cdFx0XHRcdFx0XHRcdGZsYWdzIHw9IEYuUEFSVF9CT1VOREFSWTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoYyA9PT0gSFlQSEVOKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEhZUEhFTiA9IGVuZCBib3VuZGFyeVxuXHRcdFx0XHRcdFx0XHRmbGFncyB8PSBGLkxBU1RfQk9VTkRBUlk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbmRleCAtIDEgPT09IGJvdW5kYXJ5Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0aWYgKGZsYWdzICYgRi5QQVJUX0JPVU5EQVJZKSB7XG5cdFx0XHRcdFx0XHRcdGluZGV4ID0gMDtcblx0XHRcdFx0XHRcdFx0aWYgKGMgPT09IExGKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gdW5zZXQgdGhlIFBBUlRfQk9VTkRBUlkgZmxhZ1xuXHRcdFx0XHRcdFx0XHRcdGZsYWdzICY9IH5GLlBBUlRfQk9VTkRBUlk7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soJ29uUGFydEVuZCcpO1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrKCdvblBhcnRCZWdpbicpO1xuXHRcdFx0XHRcdFx0XHRcdHN0YXRlID0gUy5IRUFERVJfRklFTERfU1RBUlQ7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZmxhZ3MgJiBGLkxBU1RfQk9VTkRBUlkpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGMgPT09IEhZUEhFTikge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrKCdvblBhcnRFbmQnKTtcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZSA9IFMuRU5EO1xuXHRcdFx0XHRcdFx0XHRcdGZsYWdzID0gMDtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGluZGV4ID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaW5kZXggPiAwKSB7XG5cdFx0XHRcdFx0XHQvLyB3aGVuIG1hdGNoaW5nIGEgcG9zc2libGUgYm91bmRhcnksIGtlZXAgYSBsb29rYmVoaW5kIHJlZmVyZW5jZVxuXHRcdFx0XHRcdFx0Ly8gaW4gY2FzZSBpdCB0dXJucyBvdXQgdG8gYmUgYSBmYWxzZSBsZWFkXG5cdFx0XHRcdFx0XHRsb29rYmVoaW5kW2luZGV4IC0gMV0gPSBjO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJldmlvdXNJbmRleCA+IDApIHtcblx0XHRcdFx0XHRcdC8vIGlmIG91ciBib3VuZGFyeSB0dXJuZWQgb3V0IHRvIGJlIHJ1YmJpc2gsIHRoZSBjYXB0dXJlZCBsb29rYmVoaW5kXG5cdFx0XHRcdFx0XHQvLyBiZWxvbmdzIHRvIHBhcnREYXRhXG5cdFx0XHRcdFx0XHRjb25zdCBfbG9va2JlaGluZCA9IG5ldyBVaW50OEFycmF5KGxvb2tiZWhpbmQuYnVmZmVyLCBsb29rYmVoaW5kLmJ5dGVPZmZzZXQsIGxvb2tiZWhpbmQuYnl0ZUxlbmd0aCk7XG5cdFx0XHRcdFx0XHRjYWxsYmFjaygnb25QYXJ0RGF0YScsIDAsIHByZXZpb3VzSW5kZXgsIF9sb29rYmVoaW5kKTtcblx0XHRcdFx0XHRcdHByZXZpb3VzSW5kZXggPSAwO1xuXHRcdFx0XHRcdFx0bWFyaygnb25QYXJ0RGF0YScpO1xuXG5cdFx0XHRcdFx0XHQvLyByZWNvbnNpZGVyIHRoZSBjdXJyZW50IGNoYXJhY3RlciBldmVuIHNvIGl0IGludGVycnVwdGVkIHRoZSBzZXF1ZW5jZVxuXHRcdFx0XHRcdFx0Ly8gaXQgY291bGQgYmUgdGhlIGJlZ2lubmluZyBvZiBhIG5ldyBzZXF1ZW5jZVxuXHRcdFx0XHRcdFx0aS0tO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFMuRU5EOlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBzdGF0ZSBlbnRlcmVkOiAke3N0YXRlfWApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRhdGFDYWxsYmFjaygnb25IZWFkZXJGaWVsZCcpO1xuXHRcdGRhdGFDYWxsYmFjaygnb25IZWFkZXJWYWx1ZScpO1xuXHRcdGRhdGFDYWxsYmFjaygnb25QYXJ0RGF0YScpO1xuXG5cdFx0Ly8gVXBkYXRlIHByb3BlcnRpZXMgZm9yIHRoZSBuZXh0IGNhbGxcblx0XHR0aGlzLmluZGV4ID0gaW5kZXg7XG5cdFx0dGhpcy5zdGF0ZSA9IHN0YXRlO1xuXHRcdHRoaXMuZmxhZ3MgPSBmbGFncztcblx0fVxuXG5cdGVuZCgpIHtcblx0XHRpZiAoKHRoaXMuc3RhdGUgPT09IFMuSEVBREVSX0ZJRUxEX1NUQVJUICYmIHRoaXMuaW5kZXggPT09IDApIHx8XG5cdFx0XHQodGhpcy5zdGF0ZSA9PT0gUy5QQVJUX0RBVEEgJiYgdGhpcy5pbmRleCA9PT0gdGhpcy5ib3VuZGFyeS5sZW5ndGgpKSB7XG5cdFx0XHR0aGlzLm9uUGFydEVuZCgpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0ZSAhPT0gUy5FTkQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTXVsdGlwYXJ0UGFyc2VyLmVuZCgpOiBzdHJlYW0gZW5kZWQgdW5leHBlY3RlZGx5Jyk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIF9maWxlTmFtZShoZWFkZXJWYWx1ZSkge1xuXHQvLyBtYXRjaGVzIGVpdGhlciBhIHF1b3RlZC1zdHJpbmcgb3IgYSB0b2tlbiAoUkZDIDI2MTYgc2VjdGlvbiAxOS41LjEpXG5cdGNvbnN0IG0gPSBoZWFkZXJWYWx1ZS5tYXRjaCgvXFxiZmlsZW5hbWU9KFwiKC4qPylcInwoW14oKTw+QCw7OlxcXFxcIi9bXFxdPz17fVxcc1xcdF0rKSkoJHw7XFxzKS9pKTtcblx0aWYgKCFtKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgbWF0Y2ggPSBtWzJdIHx8IG1bM10gfHwgJyc7XG5cdGxldCBmaWxlbmFtZSA9IG1hdGNoLnNsaWNlKG1hdGNoLmxhc3RJbmRleE9mKCdcXFxcJykgKyAxKTtcblx0ZmlsZW5hbWUgPSBmaWxlbmFtZS5yZXBsYWNlKC8lMjIvZywgJ1wiJyk7XG5cdGZpbGVuYW1lID0gZmlsZW5hbWUucmVwbGFjZSgvJiMoXFxkezR9KTsvZywgKG0sIGNvZGUpID0+IHtcblx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcblx0fSk7XG5cdHJldHVybiBmaWxlbmFtZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRvRm9ybURhdGEoQm9keSwgY3QpIHtcblx0aWYgKCEvbXVsdGlwYXJ0L2kudGVzdChjdCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gZmV0Y2gnKTtcblx0fVxuXG5cdGNvbnN0IG0gPSBjdC5tYXRjaCgvYm91bmRhcnk9KD86XCIoW15cIl0rKVwifChbXjtdKykpL2kpO1xuXG5cdGlmICghbSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ25vIG9yIGJhZCBjb250ZW50LXR5cGUgaGVhZGVyLCBubyBtdWx0aXBhcnQgYm91bmRhcnknKTtcblx0fVxuXG5cdGNvbnN0IHBhcnNlciA9IG5ldyBNdWx0aXBhcnRQYXJzZXIobVsxXSB8fCBtWzJdKTtcblxuXHRsZXQgaGVhZGVyRmllbGQ7XG5cdGxldCBoZWFkZXJWYWx1ZTtcblx0bGV0IGVudHJ5VmFsdWU7XG5cdGxldCBlbnRyeU5hbWU7XG5cdGxldCBjb250ZW50VHlwZTtcblx0bGV0IGZpbGVuYW1lO1xuXHRjb25zdCBlbnRyeUNodW5rcyA9IFtdO1xuXHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG5cdGNvbnN0IG9uUGFydERhdGEgPSB1aThhID0+IHtcblx0XHRlbnRyeVZhbHVlICs9IGRlY29kZXIuZGVjb2RlKHVpOGEsIHtzdHJlYW06IHRydWV9KTtcblx0fTtcblxuXHRjb25zdCBhcHBlbmRUb0ZpbGUgPSB1aThhID0+IHtcblx0XHRlbnRyeUNodW5rcy5wdXNoKHVpOGEpO1xuXHR9O1xuXG5cdGNvbnN0IGFwcGVuZEZpbGVUb0Zvcm1EYXRhID0gKCkgPT4ge1xuXHRcdGNvbnN0IGZpbGUgPSBuZXcgRmlsZShlbnRyeUNodW5rcywgZmlsZW5hbWUsIHt0eXBlOiBjb250ZW50VHlwZX0pO1xuXHRcdGZvcm1EYXRhLmFwcGVuZChlbnRyeU5hbWUsIGZpbGUpO1xuXHR9O1xuXG5cdGNvbnN0IGFwcGVuZEVudHJ5VG9Gb3JtRGF0YSA9ICgpID0+IHtcblx0XHRmb3JtRGF0YS5hcHBlbmQoZW50cnlOYW1lLCBlbnRyeVZhbHVlKTtcblx0fTtcblxuXHRjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuXHRkZWNvZGVyLmRlY29kZSgpO1xuXG5cdHBhcnNlci5vblBhcnRCZWdpbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRwYXJzZXIub25QYXJ0RGF0YSA9IG9uUGFydERhdGE7XG5cdFx0cGFyc2VyLm9uUGFydEVuZCA9IGFwcGVuZEVudHJ5VG9Gb3JtRGF0YTtcblxuXHRcdGhlYWRlckZpZWxkID0gJyc7XG5cdFx0aGVhZGVyVmFsdWUgPSAnJztcblx0XHRlbnRyeVZhbHVlID0gJyc7XG5cdFx0ZW50cnlOYW1lID0gJyc7XG5cdFx0Y29udGVudFR5cGUgPSAnJztcblx0XHRmaWxlbmFtZSA9IG51bGw7XG5cdFx0ZW50cnlDaHVua3MubGVuZ3RoID0gMDtcblx0fTtcblxuXHRwYXJzZXIub25IZWFkZXJGaWVsZCA9IGZ1bmN0aW9uICh1aThhKSB7XG5cdFx0aGVhZGVyRmllbGQgKz0gZGVjb2Rlci5kZWNvZGUodWk4YSwge3N0cmVhbTogdHJ1ZX0pO1xuXHR9O1xuXG5cdHBhcnNlci5vbkhlYWRlclZhbHVlID0gZnVuY3Rpb24gKHVpOGEpIHtcblx0XHRoZWFkZXJWYWx1ZSArPSBkZWNvZGVyLmRlY29kZSh1aThhLCB7c3RyZWFtOiB0cnVlfSk7XG5cdH07XG5cblx0cGFyc2VyLm9uSGVhZGVyRW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdGhlYWRlclZhbHVlICs9IGRlY29kZXIuZGVjb2RlKCk7XG5cdFx0aGVhZGVyRmllbGQgPSBoZWFkZXJGaWVsZC50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0aWYgKGhlYWRlckZpZWxkID09PSAnY29udGVudC1kaXNwb3NpdGlvbicpIHtcblx0XHRcdC8vIG1hdGNoZXMgZWl0aGVyIGEgcXVvdGVkLXN0cmluZyBvciBhIHRva2VuIChSRkMgMjYxNiBzZWN0aW9uIDE5LjUuMSlcblx0XHRcdGNvbnN0IG0gPSBoZWFkZXJWYWx1ZS5tYXRjaCgvXFxibmFtZT0oXCIoW15cIl0qKVwifChbXigpPD5ALDs6XFxcXFwiL1tcXF0/PXt9XFxzXFx0XSspKS9pKTtcblxuXHRcdFx0aWYgKG0pIHtcblx0XHRcdFx0ZW50cnlOYW1lID0gbVsyXSB8fCBtWzNdIHx8ICcnO1xuXHRcdFx0fVxuXG5cdFx0XHRmaWxlbmFtZSA9IF9maWxlTmFtZShoZWFkZXJWYWx1ZSk7XG5cblx0XHRcdGlmIChmaWxlbmFtZSkge1xuXHRcdFx0XHRwYXJzZXIub25QYXJ0RGF0YSA9IGFwcGVuZFRvRmlsZTtcblx0XHRcdFx0cGFyc2VyLm9uUGFydEVuZCA9IGFwcGVuZEZpbGVUb0Zvcm1EYXRhO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoaGVhZGVyRmllbGQgPT09ICdjb250ZW50LXR5cGUnKSB7XG5cdFx0XHRjb250ZW50VHlwZSA9IGhlYWRlclZhbHVlO1xuXHRcdH1cblxuXHRcdGhlYWRlclZhbHVlID0gJyc7XG5cdFx0aGVhZGVyRmllbGQgPSAnJztcblx0fTtcblxuXHRmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIEJvZHkpIHtcblx0XHRwYXJzZXIud3JpdGUoY2h1bmspO1xuXHR9XG5cblx0cGFyc2VyLmVuZCgpO1xuXG5cdHJldHVybiBmb3JtRGF0YTtcbn1cbiIsICJpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5pbXBvcnQgU3Bpbkxpc3RJdGVtIGZyb20gXCIuL2NvbXBvbmVudHMvbGlzdC1pdGVtXCI7XG5cbmltcG9ydCB1c2VTcGluTGlzdCBmcm9tIFwiLi9ob29rcy91c2Utc3Bpbi1saXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNwaW5MaXN0KCkge1xuICBjb25zdCB7IGRhdGEsIGxvYWRpbmcsIHVwZGF0ZSB9ID0gdXNlU3Bpbkxpc3QoKTtcbiAgY29uc3QgaW5zdGFuY2VzID0gZGF0YSA/PyBbXTtcblxuICByZXR1cm4gKFxuICAgIDxMaXN0IGlzTG9hZGluZz17bG9hZGluZ30+XG4gICAgICB7aW5zdGFuY2VzLm1hcCgoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgcmV0dXJuIDxTcGluTGlzdEl0ZW0ga2V5PXtpbnN0YW5jZS5uYW1lfSBpc0N1cnJlbnQ9e3RydWV9IHNwaW49e2luc3RhbmNlfSB1cGRhdGVMaXN0PXt1cGRhdGV9IC8+O1xuICAgICAgfSl9XG4gICAgPC9MaXN0PlxuICApO1xufVxuIiwgImltcG9ydCB7IExpc3QsIEFjdGlvblBhbmVsIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5pbXBvcnQgeyBTcGluVHlwZXMsIFN0YXRlLCBpY29uRnJvbVNwaW5TdGF0ZSB9IGZyb20gXCIuLi8uLi9saWIvc3BpblwiO1xuXG5pbXBvcnQge1xuICBTcGluRGV0YWlsc0FjdGlvbixcbiAgU3BpbkJyb3dzZXJMaXN0QWN0aW9uLFxuICBTcGluRGVzdHJveUFjdGlvbixcbiAgU3BpbkJyb3dzZXJBY3Rpb25zLFxuICBTcGluU2hlbGxBY3Rpb24sXG59IGZyb20gXCIuLi9hY3Rpb25zXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0SXRlbUFjY2Vzc29yeShzdGF0ZT86IFN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZSAmJiB7IGFjY2Vzc29yeVRpdGxlOiBzdGF0ZSwgYWNjZXNzb3J5SWNvbjogaWNvbkZyb21TcGluU3RhdGUoc3RhdGUpIH07XG59XG5cbmludGVyZmFjZSBMaXN0SXRlbVByb3BzIHtcbiAgc3BpbjogU3BpblR5cGVzO1xuICBpc0N1cnJlbnQ/OiBib29sZWFuO1xuICAvLyBzaW5jZSByYXljYXN0IHJlbmRlcnMgdGhlIHBhbmVsIGluIGEgZGlmZmVyZW50IHJvb3QsIGNvbnRleHQgaXMgbm90IHNoYXJlZFxuICAvLyBzbyB0aGlzIHByb3AgbmVlZHMgdG8gYmUgZHJpbGxlZCBkb3duLi4uXG4gIC8vIHJheWNhc3QgdGVhbSBoYXMgc3RhdGVkIHRoZXkgd2lsbCB3b3JrIG9uIGNvbnRleHQgaW4gdGhlIGZ1dHVyZVxuICB1cGRhdGVMaXN0OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTcGluTGlzdEl0ZW0oeyBzcGluLCB1cGRhdGVMaXN0IH06IExpc3RJdGVtUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8TGlzdC5JdGVtXG4gICAgICB0aXRsZT17c3Bpbi5uYW1lfVxuICAgICAgc3VidGl0bGU9e3NwaW4uc2VydmljZU5hbWV9XG4gICAgICAvLyBpY29uPXtpc0N1cnJlbnQgPyB7IHNvdXJjZTogSWNvbi5DaGVja21hcmssIHRpbnRDb2xvcjogQ29sb3IuR3JlZW4gfSA6IHsgc291cmNlOiBJY29uLkNpcmNsZSB9fVxuICAgICAgey4uLmxpc3RJdGVtQWNjZXNzb3J5KHNwaW4uc3RhdGUpfVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8QWN0aW9uUGFuZWwuU2VjdGlvbiB0aXRsZT1cIk1hbmFnZVwiPlxuICAgICAgICAgICAgPFNwaW5EZXRhaWxzQWN0aW9uIHNwaW49e3NwaW59IHVwZGF0ZUxpc3Q9e3VwZGF0ZUxpc3R9IC8+XG4gICAgICAgICAgICA8U3BpbkJyb3dzZXJMaXN0QWN0aW9uIHNwaW49e3NwaW59IHVwZGF0ZUxpc3Q9e3VwZGF0ZUxpc3R9IC8+XG4gICAgICAgICAgICA8U3BpbkRlc3Ryb3lBY3Rpb24gc3Bpbj17c3Bpbn0gb25EZXN0cm95PXt1cGRhdGVMaXN0fSAvPlxuICAgICAgICAgICAgPFNwaW5TaGVsbEFjdGlvbiBzcGluPXtzcGlufSAvPlxuICAgICAgICAgIDwvQWN0aW9uUGFuZWwuU2VjdGlvbj5cbiAgICAgICAgICB7c3Bpbi5pc1JlYWR5KCkgJiYgPFNwaW5Ccm93c2VyQWN0aW9ucyBzcGluPXtzcGlufSAvPn1cbiAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgIH1cbiAgICAvPlxuICApO1xufVxuIiwgImltcG9ydCB7IG9wZW4gfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbmltcG9ydCB7IGluc29tbmlhQ29tbWFuZCwgc3BpbkNvbW1hbmQgfSBmcm9tIFwiLi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgU2VydmljZURhdGFUeXBlcywgU2VydmljZVN0YXRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBTcGluVHlwZXMgfSBmcm9tIFwiLi4vc3Bpbi10eXBlXCI7XG5cbmltcG9ydCB7IERFRkFVTFRfU1FMX1BPUlQgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBwYXJzZVJlcG9TbHVnLCBTbHVnIH0gZnJvbSBcIi4uL3V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU2VydmljZTxEIGV4dGVuZHMgU2VydmljZURhdGFUeXBlcywgVCBleHRlbmRzIFNwaW5UeXBlcz4ge1xuICBwdWJsaWMgZGF0YTogRDtcbiAgcHJvdGVjdGVkIHNwaW46IFQ7XG5cbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIHNsdWc6IFNsdWc7XG4gIHB1YmxpYyBicmFuY2g6IHN0cmluZztcbiAgcHVibGljIHJldjogc3RyaW5nO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBmcWRuOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogRCwgc3BpbjogVCkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5zcGluID0gc3BpbjtcblxuICAgIHRoaXMubmFtZSA9IHRoaXMuZGF0YS5uYW1lO1xuICAgIHRoaXMuYnJhbmNoID0gdGhpcy5kYXRhLmJyYW5jaDtcbiAgICB0aGlzLnJldiA9IHRoaXMuZGF0YS5yZXZpc2lvbjtcblxuICAgIHRoaXMuc2x1ZyA9IHBhcnNlUmVwb1NsdWcodGhpcy5uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRTdGF0ZSgpOiBQcm9taXNlPFNlcnZpY2VTdGF0ZT47XG5cbiAgcHVibGljIGFzeW5jIG9wZW4oKSB7XG4gICAgLy8gc3BpbkNvbW1hbmQoYG9wZW5gLCB0aGlzLnNwaW4ubmFtZSk7XG4gICAgLy8gc2FtZSBsb2dpYyBhcyBzcGluIG9wZW5cbiAgICBhd2FpdCBvcGVuKGBodHRwczovLyR7dGhpcy5mcWRufWApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvZGUoKSB7XG4gICAgY29uc3QgY29kZSA9IChhd2FpdCBzcGluQ29tbWFuZChgY29kZSAke3RoaXMuc3Bpbi5uYW1lfSAke3RoaXMubmFtZX1gLCB0aGlzLnNwaW4ubmFtZSwgdHJ1ZSkpLnN0ZG91dDtcbiAgICBjb25zdCBjb2RlUmVzcCA9IEpTT04ucGFyc2UoY29kZSk7XG4gICAgcmV0dXJuIGNvZGVSZXNwO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGluc29tbmlhKCkge1xuICAgIGF3YWl0IGluc29tbmlhQ29tbWFuZCh0aGlzLnNwaW4ubmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb3BlblNxbCgpIHtcbiAgICBjb25zdCBwb3J0ID0gYXdhaXQgdGhpcy5zcWxQb3J0KCk7XG4gICAgY29uc3Qgb3BlblVybCA9IGBteXNxbDovL3Jvb3RAJHt0aGlzLmZxZG59OiR7cG9ydH1gO1xuICAgIGNvbnNvbGUubG9nKG9wZW5VcmwpO1xuICAgIC8vIGF3YWl0IGV4ZWNwKGBvcGVuIFwiJHtvcGVuVXJsfVwiYCk7XG4gICAgYXdhaXQgb3BlbihvcGVuVXJsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBzcWxQb3J0KCkge1xuICAgIHJldHVybiBERUZBVUxUX1NRTF9QT1JUO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCBmZXRjaCBmcm9tIFwibm9kZS1mZXRjaFwiO1xuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuXG5pbXBvcnQgeyBJY29uLCBDb2xvciwgSW1hZ2UgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBTdGF0ZSwgU3Bpbkxpc3RSZXNwb25zZSwgU3BpblNob3dSZXNwb25zZSwgU3BpbkNyZWF0ZVJlc3BvbnNlLCBTZXJ2aWNlU3RhdGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgU2VydmljZVR5cGVzLCBTcGluVHlwZXMgfSBmcm9tIFwiLlwiO1xuXG4vLyB0aGUgb25seSB3YXkgdG8gdXNlIHRoZSBzcGluIGNlcnQgaXMgdG8gbGF1bmNoIFJheWNhc3Qgd2l0aCBhbiBlbnYgdmFyIHdpdGggTk9ERV9FWFRSQV9DQV9DRVJUUy4uLlxuLy8ganVzdCBieXBhc3NpbmcgZm9yIG5vdy5cbmNvbnN0IGh0dHBzQWdlbnQgPSBuZXcgaHR0cHMuQWdlbnQoe1xuICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxufSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFVuYXV0aG9yaXplZCh1cmw6IHN0cmluZykge1xuICByZXR1cm4gYXdhaXQgZmV0Y2godXJsLCB7IGFnZW50OiBodHRwc0FnZW50IH0pO1xufVxuXG5pbnRlcmZhY2UgRXhlY1Byb21pc2VSZXNwb25zZSB7XG4gIHN0ZG91dDogc3RyaW5nO1xuICBzdGRlcnI6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWNwID0gKGNvbW1hbmQ6IHN0cmluZywgZW52OiBOb2RlSlMuUHJvY2Vzc0VudiA9IHt9KTogUHJvbWlzZTxFeGVjUHJvbWlzZVJlc3BvbnNlPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gcmF5Y2FzdCBkb2VzIG5vdCBhZGQgdGhlIFBBVEggZW52IHZhclxuICAgIGV4ZWMoXG4gICAgICBjb21tYW5kLFxuICAgICAgeyBlbnY6IHsgLi4ucHJvY2Vzcy5lbnYsIC4uLmVudiwgU1BJTl9OT19VUERBVEU6IFwiMVwiLCBQQVRIOiBcIi9iaW46L3Vzci9iaW46L3Vzci9zYmluOi91c3IvbG9jYWwvYmluXCIgfSB9LFxuICAgICAgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcCA9IHsgc3Rkb3V0LCBzdGRlcnIgfTtcblxuICAgICAgICBpZiAoZXJyKSByZWplY3QocmVzcCk7XG4gICAgICAgIGVsc2UgcmVzb2x2ZShyZXNwKTtcbiAgICAgIH1cbiAgICApO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpY29uRnJvbVNwaW5TdGF0ZShzdGF0ZTogU3RhdGUpOiBJbWFnZS5JbWFnZUxpa2Uge1xuICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgY2FzZSBTdGF0ZS5BdmFpbGFibGU6IHtcbiAgICAgIHJldHVybiB7IHNvdXJjZTogSWNvbi5Eb3QsIHRpbnRDb2xvcjogQ29sb3IuR3JlZW4gfTtcbiAgICB9XG4gICAgY2FzZSBTdGF0ZS5DcmVhdGluZzoge1xuICAgICAgcmV0dXJuIHsgc291cmNlOiBJY29uLkRvdCwgdGludENvbG9yOiBDb2xvci5CbHVlIH07XG4gICAgfVxuICAgIGNhc2UgU3RhdGUuU3VzcGVuZGVkOiB7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IEljb24uRXhjbGFtYXRpb25NYXJrLCB0aW50Q29sb3I6IENvbG9yLk9yYW5nZSB9O1xuICAgIH1cbiAgICBjYXNlIFN0YXRlLkNyYXNoaW5nOiB7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IEljb24uRXhjbGFtYXRpb25NYXJrLCB0aW50Q29sb3I6IENvbG9yLlJlZCB9O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaWNvbkZyb21TcGluU2VydmljZVN0YXRlKHN0YXRlOiBTZXJ2aWNlU3RhdGUpOiBJbWFnZS5JbWFnZUxpa2Uge1xuICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgY2FzZSBTZXJ2aWNlU3RhdGUuQWN0aXZlOiB7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IEljb24uRG90LCB0aW50Q29sb3I6IENvbG9yLkdyZWVuIH07XG4gICAgfVxuICAgIGNhc2UgU2VydmljZVN0YXRlLkFjdGl2YXRpbmc6IHtcbiAgICAgIHJldHVybiB7IHNvdXJjZTogSWNvbi5Eb3QsIHRpbnRDb2xvcjogQ29sb3IuQmx1ZSB9O1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IEljb24uRG90IH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzcGluQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIGluc3RhbmNlPzogc3RyaW5nLCBqc29uID0gdHJ1ZSkge1xuICAvLyBjb25zdCBjbWQgPSBbXCIvdXNyL2xvY2FsL2Jpbi9zcGluXCIsIGNvbW1hbmRdO1xuICBjb25zdCBjbWQgPSBbXCJzcGluXCIsIGNvbW1hbmRdO1xuICBpZiAoanNvbikgY21kLnB1c2goXCItLWpzb25cIik7XG4gIHJldHVybiBleGVjcChjbWQuam9pbihcIiBcIiksIHsgU1BJTl9JTlNUQU5DRTogaW5zdGFuY2UgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnNvbW5pYUNvbW1hbmQoaW5zdGFuY2U/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGV4ZWNwKFwib3BlbiAvQXBwbGljYXRpb25zL0luc29tbmlhLmFwcFwiLCB7IFNQSU5fSU5TVEFOQ0U6IGluc3RhbmNlIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3Bpbkxpc3QoKTogUHJvbWlzZTxTcGluTGlzdFJlc3BvbnNlPiB7XG4gIGNvbnN0IGxpc3QgPSAoYXdhaXQgc3BpbkNvbW1hbmQoXCJsaXN0IC0tYWxsXCIpKS5zdGRvdXQ7XG4gIGNvbnN0IGxpc3RDb250ZW50OiBTcGluTGlzdFJlc3BvbnNlID0gSlNPTi5wYXJzZShsaXN0KTtcbiAgcmV0dXJuIGxpc3RDb250ZW50O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3BpblNob3coaW5zdGFuY2U/OiBzdHJpbmcsIGxhdGVzdD86IGJvb2xlYW4pOiBQcm9taXNlPFNwaW5TaG93UmVzcG9uc2U+IHtcbiAgbGV0IHNob3c7XG4gIGlmIChsYXRlc3QpIHNob3cgPSAoYXdhaXQgc3BpbkNvbW1hbmQoXCJzaG93IC0tbGF0ZXN0XCIsIHVuZGVmaW5lZCkpLnN0ZG91dDtcbiAgZWxzZSBzaG93ID0gKGF3YWl0IHNwaW5Db21tYW5kKFwic2hvd1wiLCBpbnN0YW5jZSkpLnN0ZG91dDtcblxuICBjb25zdCBzaG93Q29udGVudDogU3BpblNob3dSZXNwb25zZSA9IEpTT04ucGFyc2Uoc2hvdyk7XG4gIHJldHVybiBzaG93Q29udGVudDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNwaW5DcmVhdGUocmVwbzogc3RyaW5nLCBuYW1lPzogc3RyaW5nLCBmbGFncz86IHN0cmluZyk6IFByb21pc2U8U3BpbkNyZWF0ZVJlc3BvbnNlPiB7XG4gIGNvbnN0IGNtZFBhcnRzID0gW2B1cCAke3JlcG99YCwgXCItLXdhaXRcIl07XG4gIGlmIChuYW1lKSBjbWRQYXJ0cy5wdXNoKGAtLW5hbWUgXCIke25hbWV9XCJgKTtcbiAgaWYgKGZsYWdzKSBjbWRQYXJ0cy5wdXNoKGZsYWdzKTtcblxuICBjb25zdCBjb21tYW5kID0gY21kUGFydHMuam9pbihcIiBcIik7XG4gIGNvbnN0IGNyZWF0ZSA9IChhd2FpdCBzcGluQ29tbWFuZChjb21tYW5kKSkuc3Rkb3V0O1xuICBjb25zdCBjcmVhdGVDb250ZW50OiBTcGluQ3JlYXRlUmVzcG9uc2UgPSBKU09OLnBhcnNlKGNyZWF0ZSk7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNyZWF0ZUNvbnRlbnQpKTtcblxuICByZXR1cm4gY3JlYXRlQ29udGVudDtcbn1cblxuaW50ZXJmYWNlIFN0YXR1c1Jlc3BvbnNlIHtcbiAgc3RhdHVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzcGluU2VydmljZVN0YXR1cyhzcGluOiBTcGluVHlwZXMsIHNlcnZpY2U6IFNlcnZpY2VUeXBlcykge1xuICBsZXQgc3RhdGUgPSBTZXJ2aWNlU3RhdGUuVW5rbm93bjtcbiAgLy8gaHR0cHM6Ly9zcGlubmVyYW1hLihmcWRuKS9hcGkvdjEvc291cmNlL2xpc3QgZm9yIGxpc3Qgb2Ygc2VydmljZXNcbiAgLy8gaHR0cHM6Ly9zcGlubmVyYW1hLihmcWRuKS9hcGkvdjEvc291cmNlL3N0YXR1cz9uYW1lPShzZXJ2aWNlKSBmb3Igc3RhdHVzIG9mIHNlcnZpY2VcbiAgY29uc3Qgc3RhdHVzVXJsID0gYGh0dHBzOi8vc3Bpbm5lcmFtYS4ke3NwaW4uZnFkbn0vYXBpL3YxL3NvdXJjZS9zdGF0dXM/bmFtZT0ke3NlcnZpY2Uuc2x1Zy5yZXBvfWA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzdGF0dXNSZXNwb25zZSA9IChhd2FpdCAoYXdhaXQgZmV0Y2hVbmF1dGhvcml6ZWQoc3RhdHVzVXJsKSkuanNvbigpKSBhcyBTdGF0dXNSZXNwb25zZTtcbiAgICBpZiAoc3RhdHVzUmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICBjb25zdCB2YWxpZFN0YXRlcyA9IE9iamVjdC52YWx1ZXMoU2VydmljZVN0YXRlKTtcbiAgICAgIGlmICh2YWxpZFN0YXRlcy5pbmNsdWRlcyhzdGF0dXNSZXNwb25zZS5zdGF0dXMgYXMgU2VydmljZVN0YXRlKSkgc3RhdGUgPSBzdGF0dXNSZXNwb25zZS5zdGF0dXMgYXMgU2VydmljZVN0YXRlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKGUpO1xuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cbiIsICIvKipcbiAqIEluZGV4LmpzXG4gKlxuICogYSByZXF1ZXN0IEFQSSBjb21wYXRpYmxlIHdpdGggd2luZG93LmZldGNoXG4gKlxuICogQWxsIHNwZWMgYWxnb3JpdGhtIHN0ZXAgbnVtYmVycyBhcmUgYmFzZWQgb24gaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvY29tbWl0LXNuYXBzaG90cy9hZTcxNjgyMmNiM2E2MTg0MzIyNmNkMDkwZWVmYzY1ODk0NDZjMWQyLy5cbiAqL1xuXG5pbXBvcnQgaHR0cCBmcm9tICdub2RlOmh0dHAnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ25vZGU6aHR0cHMnO1xuaW1wb3J0IHpsaWIgZnJvbSAnbm9kZTp6bGliJztcbmltcG9ydCBTdHJlYW0sIHtQYXNzVGhyb3VnaCwgcGlwZWxpbmUgYXMgcHVtcH0gZnJvbSAnbm9kZTpzdHJlYW0nO1xuaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ25vZGU6YnVmZmVyJztcblxuaW1wb3J0IGRhdGFVcmlUb0J1ZmZlciBmcm9tICdkYXRhLXVyaS10by1idWZmZXInO1xuXG5pbXBvcnQge3dyaXRlVG9TdHJlYW0sIGNsb25lfSBmcm9tICcuL2JvZHkuanMnO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vcmVzcG9uc2UuanMnO1xuaW1wb3J0IEhlYWRlcnMsIHtmcm9tUmF3SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzLmpzJztcbmltcG9ydCBSZXF1ZXN0LCB7Z2V0Tm9kZVJlcXVlc3RPcHRpb25zfSBmcm9tICcuL3JlcXVlc3QuanMnO1xuaW1wb3J0IHtGZXRjaEVycm9yfSBmcm9tICcuL2Vycm9ycy9mZXRjaC1lcnJvci5qcyc7XG5pbXBvcnQge0Fib3J0RXJyb3J9IGZyb20gJy4vZXJyb3JzL2Fib3J0LWVycm9yLmpzJztcbmltcG9ydCB7aXNSZWRpcmVjdH0gZnJvbSAnLi91dGlscy9pcy1yZWRpcmVjdC5qcyc7XG5pbXBvcnQge0Zvcm1EYXRhfSBmcm9tICdmb3JtZGF0YS1wb2x5ZmlsbC9lc20ubWluLmpzJztcbmltcG9ydCB7aXNEb21haW5PclN1YmRvbWFpbiwgaXNTYW1lUHJvdG9jb2x9IGZyb20gJy4vdXRpbHMvaXMuanMnO1xuaW1wb3J0IHtwYXJzZVJlZmVycmVyUG9saWN5RnJvbUhlYWRlcn0gZnJvbSAnLi91dGlscy9yZWZlcnJlci5qcyc7XG5pbXBvcnQge1xuXHRCbG9iLFxuXHRGaWxlLFxuXHRmaWxlRnJvbVN5bmMsXG5cdGZpbGVGcm9tLFxuXHRibG9iRnJvbVN5bmMsXG5cdGJsb2JGcm9tXG59IGZyb20gJ2ZldGNoLWJsb2IvZnJvbS5qcyc7XG5cbmV4cG9ydCB7Rm9ybURhdGEsIEhlYWRlcnMsIFJlcXVlc3QsIFJlc3BvbnNlLCBGZXRjaEVycm9yLCBBYm9ydEVycm9yLCBpc1JlZGlyZWN0fTtcbmV4cG9ydCB7QmxvYiwgRmlsZSwgZmlsZUZyb21TeW5jLCBmaWxlRnJvbSwgYmxvYkZyb21TeW5jLCBibG9iRnJvbX07XG5cbmNvbnN0IHN1cHBvcnRlZFNjaGVtYXMgPSBuZXcgU2V0KFsnZGF0YTonLCAnaHR0cDonLCAnaHR0cHM6J10pO1xuXG4vKipcbiAqIEZldGNoIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICAge3N0cmluZyB8IFVSTCB8IGltcG9ydCgnLi9yZXF1ZXN0JykuZGVmYXVsdH0gdXJsIC0gQWJzb2x1dGUgdXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsqfSBbb3B0aW9uc19dIC0gRmV0Y2ggb3B0aW9uc1xuICogQHJldHVybiAge1Byb21pc2U8aW1wb3J0KCcuL3Jlc3BvbnNlJykuZGVmYXVsdD59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGZldGNoKHVybCwgb3B0aW9uc18pIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHQvLyBCdWlsZCByZXF1ZXN0IG9iamVjdFxuXHRcdGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIG9wdGlvbnNfKTtcblx0XHRjb25zdCB7cGFyc2VkVVJMLCBvcHRpb25zfSA9IGdldE5vZGVSZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0KTtcblx0XHRpZiAoIXN1cHBvcnRlZFNjaGVtYXMuaGFzKHBhcnNlZFVSTC5wcm90b2NvbCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYG5vZGUtZmV0Y2ggY2Fubm90IGxvYWQgJHt1cmx9LiBVUkwgc2NoZW1lIFwiJHtwYXJzZWRVUkwucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJyl9XCIgaXMgbm90IHN1cHBvcnRlZC5gKTtcblx0XHR9XG5cblx0XHRpZiAocGFyc2VkVVJMLnByb3RvY29sID09PSAnZGF0YTonKSB7XG5cdFx0XHRjb25zdCBkYXRhID0gZGF0YVVyaVRvQnVmZmVyKHJlcXVlc3QudXJsKTtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGRhdGEsIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6IGRhdGEudHlwZUZ1bGx9fSk7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBXcmFwIGh0dHAucmVxdWVzdCBpbnRvIGZldGNoXG5cdFx0Y29uc3Qgc2VuZCA9IChwYXJzZWRVUkwucHJvdG9jb2wgPT09ICdodHRwczonID8gaHR0cHMgOiBodHRwKS5yZXF1ZXN0O1xuXHRcdGNvbnN0IHtzaWduYWx9ID0gcmVxdWVzdDtcblx0XHRsZXQgcmVzcG9uc2UgPSBudWxsO1xuXG5cdFx0Y29uc3QgYWJvcnQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBlcnJvciA9IG5ldyBBYm9ydEVycm9yKCdUaGUgb3BlcmF0aW9uIHdhcyBhYm9ydGVkLicpO1xuXHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdGlmIChyZXF1ZXN0LmJvZHkgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgU3RyZWFtLlJlYWRhYmxlKSB7XG5cdFx0XHRcdHJlcXVlc3QuYm9keS5kZXN0cm95KGVycm9yKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFyZXNwb25zZSB8fCAhcmVzcG9uc2UuYm9keSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJlc3BvbnNlLmJvZHkuZW1pdCgnZXJyb3InLCBlcnJvcik7XG5cdFx0fTtcblxuXHRcdGlmIChzaWduYWwgJiYgc2lnbmFsLmFib3J0ZWQpIHtcblx0XHRcdGFib3J0KCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWJvcnRBbmRGaW5hbGl6ZSA9ICgpID0+IHtcblx0XHRcdGFib3J0KCk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH07XG5cblx0XHQvLyBTZW5kIHJlcXVlc3Rcblx0XHRjb25zdCByZXF1ZXN0XyA9IHNlbmQocGFyc2VkVVJMLnRvU3RyaW5nKCksIG9wdGlvbnMpO1xuXG5cdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0c2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZmluYWxpemUgPSAoKSA9PiB7XG5cdFx0XHRyZXF1ZXN0Xy5hYm9ydCgpO1xuXHRcdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0XHRzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmVxdWVzdF8ub24oJ2Vycm9yJywgZXJyb3IgPT4ge1xuXHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGByZXF1ZXN0IHRvICR7cmVxdWVzdC51cmx9IGZhaWxlZCwgcmVhc29uOiAke2Vycm9yLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycm9yKSk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH0pO1xuXG5cdFx0Zml4UmVzcG9uc2VDaHVua2VkVHJhbnNmZXJCYWRFbmRpbmcocmVxdWVzdF8sIGVycm9yID0+IHtcblx0XHRcdGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5ib2R5KSB7XG5cdFx0XHRcdHJlc3BvbnNlLmJvZHkuZGVzdHJveShlcnJvcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKiBjOCBpZ25vcmUgbmV4dCAxOCAqL1xuXHRcdGlmIChwcm9jZXNzLnZlcnNpb24gPCAndjE0Jykge1xuXHRcdFx0Ly8gQmVmb3JlIE5vZGUuanMgMTQsIHBpcGVsaW5lKCkgZG9lcyBub3QgZnVsbHkgc3VwcG9ydCBhc3luYyBpdGVyYXRvcnMgYW5kIGRvZXMgbm90IGFsd2F5c1xuXHRcdFx0Ly8gcHJvcGVybHkgaGFuZGxlIHdoZW4gdGhlIHNvY2tldCBjbG9zZS9lbmQgZXZlbnRzIGFyZSBvdXQgb2Ygb3JkZXIuXG5cdFx0XHRyZXF1ZXN0Xy5vbignc29ja2V0JywgcyA9PiB7XG5cdFx0XHRcdGxldCBlbmRlZFdpdGhFdmVudHNDb3VudDtcblx0XHRcdFx0cy5wcmVwZW5kTGlzdGVuZXIoJ2VuZCcsICgpID0+IHtcblx0XHRcdFx0XHRlbmRlZFdpdGhFdmVudHNDb3VudCA9IHMuX2V2ZW50c0NvdW50O1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cy5wcmVwZW5kTGlzdGVuZXIoJ2Nsb3NlJywgaGFkRXJyb3IgPT4ge1xuXHRcdFx0XHRcdC8vIGlmIGVuZCBoYXBwZW5lZCBiZWZvcmUgY2xvc2UgYnV0IHRoZSBzb2NrZXQgZGlkbid0IGVtaXQgYW4gZXJyb3IsIGRvIGl0IG5vd1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZSAmJiBlbmRlZFdpdGhFdmVudHNDb3VudCA8IHMuX2V2ZW50c0NvdW50ICYmICFoYWRFcnJvcikge1xuXHRcdFx0XHRcdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoJ1ByZW1hdHVyZSBjbG9zZScpO1xuXHRcdFx0XHRcdFx0ZXJyb3IuY29kZSA9ICdFUlJfU1RSRUFNX1BSRU1BVFVSRV9DTE9TRSc7XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5ib2R5LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXF1ZXN0Xy5vbigncmVzcG9uc2UnLCByZXNwb25zZV8gPT4ge1xuXHRcdFx0cmVxdWVzdF8uc2V0VGltZW91dCgwKTtcblx0XHRcdGNvbnN0IGhlYWRlcnMgPSBmcm9tUmF3SGVhZGVycyhyZXNwb25zZV8ucmF3SGVhZGVycyk7XG5cblx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1XG5cdFx0XHRpZiAoaXNSZWRpcmVjdChyZXNwb25zZV8uc3RhdHVzQ29kZSkpIHtcblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuMlxuXHRcdFx0XHRjb25zdCBsb2NhdGlvbiA9IGhlYWRlcnMuZ2V0KCdMb2NhdGlvbicpO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjNcblx0XHRcdFx0bGV0IGxvY2F0aW9uVVJMID0gbnVsbDtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRsb2NhdGlvblVSTCA9IGxvY2F0aW9uID09PSBudWxsID8gbnVsbCA6IG5ldyBVUkwobG9jYXRpb24sIHJlcXVlc3QudXJsKTtcblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0Ly8gZXJyb3IgaGVyZSBjYW4gb25seSBiZSBpbnZhbGlkIFVSTCBpbiBMb2NhdGlvbjogaGVhZGVyXG5cdFx0XHRcdFx0Ly8gZG8gbm90IHRocm93IHdoZW4gb3B0aW9ucy5yZWRpcmVjdCA9PSBtYW51YWxcblx0XHRcdFx0XHQvLyBsZXQgdGhlIHVzZXIgZXh0cmFjdCB0aGUgZXJyb3JuZW91cyByZWRpcmVjdCBVUkxcblx0XHRcdFx0XHRpZiAocmVxdWVzdC5yZWRpcmVjdCAhPT0gJ21hbnVhbCcpIHtcblx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgdXJpIHJlcXVlc3RlZCByZXNwb25kcyB3aXRoIGFuIGludmFsaWQgcmVkaXJlY3QgVVJMOiAke2xvY2F0aW9ufWAsICdpbnZhbGlkLXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS41XG5cdFx0XHRcdHN3aXRjaCAocmVxdWVzdC5yZWRpcmVjdCkge1xuXHRcdFx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgdXJpIHJlcXVlc3RlZCByZXNwb25kcyB3aXRoIGEgcmVkaXJlY3QsIHJlZGlyZWN0IG1vZGUgaXMgc2V0IHRvIGVycm9yOiAke3JlcXVlc3QudXJsfWAsICduby1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0Y2FzZSAnbWFudWFsJzpcblx0XHRcdFx0XHRcdC8vIE5vdGhpbmcgdG8gZG9cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2ZvbGxvdyc6IHtcblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAyXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA1XG5cdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5jb3VudGVyID49IHJlcXVlc3QuZm9sbG93KSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgbWF4aW11bSByZWRpcmVjdCByZWFjaGVkIGF0OiAke3JlcXVlc3QudXJsfWAsICdtYXgtcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDYgKGNvdW50ZXIgaW5jcmVtZW50KVxuXHRcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IFJlcXVlc3Qgb2JqZWN0LlxuXHRcdFx0XHRcdFx0Y29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHJlcXVlc3QuaGVhZGVycyksXG5cdFx0XHRcdFx0XHRcdGZvbGxvdzogcmVxdWVzdC5mb2xsb3csXG5cdFx0XHRcdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlciArIDEsXG5cdFx0XHRcdFx0XHRcdGFnZW50OiByZXF1ZXN0LmFnZW50LFxuXHRcdFx0XHRcdFx0XHRjb21wcmVzczogcmVxdWVzdC5jb21wcmVzcyxcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0Ym9keTogY2xvbmUocmVxdWVzdCksXG5cdFx0XHRcdFx0XHRcdHNpZ25hbDogcmVxdWVzdC5zaWduYWwsXG5cdFx0XHRcdFx0XHRcdHNpemU6IHJlcXVlc3Quc2l6ZSxcblx0XHRcdFx0XHRcdFx0cmVmZXJyZXI6IHJlcXVlc3QucmVmZXJyZXIsXG5cdFx0XHRcdFx0XHRcdHJlZmVycmVyUG9saWN5OiByZXF1ZXN0LnJlZmVycmVyUG9saWN5XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHQvLyB3aGVuIGZvcndhcmRpbmcgc2Vuc2l0aXZlIGhlYWRlcnMgbGlrZSBcIkF1dGhvcml6YXRpb25cIixcblx0XHRcdFx0XHRcdC8vIFwiV1dXLUF1dGhlbnRpY2F0ZVwiLCBhbmQgXCJDb29raWVcIiB0byB1bnRydXN0ZWQgdGFyZ2V0cyxcblx0XHRcdFx0XHRcdC8vIGhlYWRlcnMgd2lsbCBiZSBpZ25vcmVkIHdoZW4gZm9sbG93aW5nIGEgcmVkaXJlY3QgdG8gYSBkb21haW5cblx0XHRcdFx0XHRcdC8vIHRoYXQgaXMgbm90IGEgc3ViZG9tYWluIG1hdGNoIG9yIGV4YWN0IG1hdGNoIG9mIHRoZSBpbml0aWFsIGRvbWFpbi5cblx0XHRcdFx0XHRcdC8vIEZvciBleGFtcGxlLCBhIHJlZGlyZWN0IGZyb20gXCJmb28uY29tXCIgdG8gZWl0aGVyIFwiZm9vLmNvbVwiIG9yIFwic3ViLmZvby5jb21cIlxuXHRcdFx0XHRcdFx0Ly8gd2lsbCBmb3J3YXJkIHRoZSBzZW5zaXRpdmUgaGVhZGVycywgYnV0IGEgcmVkaXJlY3QgdG8gXCJiYXIuY29tXCIgd2lsbCBub3QuXG5cdFx0XHRcdFx0XHQvLyBoZWFkZXJzIHdpbGwgYWxzbyBiZSBpZ25vcmVkIHdoZW4gZm9sbG93aW5nIGEgcmVkaXJlY3QgdG8gYSBkb21haW4gdXNpbmdcblx0XHRcdFx0XHRcdC8vIGEgZGlmZmVyZW50IHByb3RvY29sLiBGb3IgZXhhbXBsZSwgYSByZWRpcmVjdCBmcm9tIFwiaHR0cHM6Ly9mb28uY29tXCIgdG8gXCJodHRwOi8vZm9vLmNvbVwiXG5cdFx0XHRcdFx0XHQvLyB3aWxsIG5vdCBmb3J3YXJkIHRoZSBzZW5zaXRpdmUgaGVhZGVyc1xuXHRcdFx0XHRcdFx0aWYgKCFpc0RvbWFpbk9yU3ViZG9tYWluKHJlcXVlc3QudXJsLCBsb2NhdGlvblVSTCkgfHwgIWlzU2FtZVByb3RvY29sKHJlcXVlc3QudXJsLCBsb2NhdGlvblVSTCkpIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCBuYW1lIG9mIFsnYXV0aG9yaXphdGlvbicsICd3d3ctYXV0aGVudGljYXRlJywgJ2Nvb2tpZScsICdjb29raWUyJ10pIHtcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5oZWFkZXJzLmRlbGV0ZShuYW1lKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgOVxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlXy5zdGF0dXNDb2RlICE9PSAzMDMgJiYgcmVxdWVzdC5ib2R5ICYmIG9wdGlvbnNfLmJvZHkgaW5zdGFuY2VvZiBTdHJlYW0uUmVhZGFibGUpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKCdDYW5ub3QgZm9sbG93IHJlZGlyZWN0IHdpdGggYm9keSBiZWluZyBhIHJlYWRhYmxlIHN0cmVhbScsICd1bnN1cHBvcnRlZC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTFcblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMzAzIHx8ICgocmVzcG9uc2VfLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMzAyKSAmJiByZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BPU1QnKSkge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5tZXRob2QgPSAnR0VUJztcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMuYm9keSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMuaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtbGVuZ3RoJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxNFxuXHRcdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2VSZWZlcnJlclBvbGljeSA9IHBhcnNlUmVmZXJyZXJQb2xpY3lGcm9tSGVhZGVyKGhlYWRlcnMpO1xuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlUmVmZXJyZXJQb2xpY3kpIHtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMucmVmZXJyZXJQb2xpY3kgPSByZXNwb25zZVJlZmVycmVyUG9saWN5O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTVcblx0XHRcdFx0XHRcdHJlc29sdmUoZmV0Y2gobmV3IFJlcXVlc3QobG9jYXRpb25VUkwsIHJlcXVlc3RPcHRpb25zKSkpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgVHlwZUVycm9yKGBSZWRpcmVjdCBvcHRpb24gJyR7cmVxdWVzdC5yZWRpcmVjdH0nIGlzIG5vdCBhIHZhbGlkIHZhbHVlIG9mIFJlcXVlc3RSZWRpcmVjdGApKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBQcmVwYXJlIHJlc3BvbnNlXG5cdFx0XHRpZiAoc2lnbmFsKSB7XG5cdFx0XHRcdHJlc3BvbnNlXy5vbmNlKCdlbmQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0c2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgYm9keSA9IHB1bXAocmVzcG9uc2VfLCBuZXcgUGFzc1Rocm91Z2goKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvcHVsbC8yOTM3NlxuXHRcdFx0LyogYzggaWdub3JlIG5leHQgMyAqL1xuXHRcdFx0aWYgKHByb2Nlc3MudmVyc2lvbiA8ICd2MTIuMTAnKSB7XG5cdFx0XHRcdHJlc3BvbnNlXy5vbignYWJvcnRlZCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCByZXNwb25zZU9wdGlvbnMgPSB7XG5cdFx0XHRcdHVybDogcmVxdWVzdC51cmwsXG5cdFx0XHRcdHN0YXR1czogcmVzcG9uc2VfLnN0YXR1c0NvZGUsXG5cdFx0XHRcdHN0YXR1c1RleHQ6IHJlc3BvbnNlXy5zdGF0dXNNZXNzYWdlLFxuXHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRzaXplOiByZXF1ZXN0LnNpemUsXG5cdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlcixcblx0XHRcdFx0aGlnaFdhdGVyTWFyazogcmVxdWVzdC5oaWdoV2F0ZXJNYXJrXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuM1xuXHRcdFx0Y29uc3QgY29kaW5ncyA9IGhlYWRlcnMuZ2V0KCdDb250ZW50LUVuY29kaW5nJyk7XG5cblx0XHRcdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDEyLjEuMS40OiBoYW5kbGUgY29udGVudCBjb2RpbmdzXG5cblx0XHRcdC8vIGluIGZvbGxvd2luZyBzY2VuYXJpb3Mgd2UgaWdub3JlIGNvbXByZXNzaW9uIHN1cHBvcnRcblx0XHRcdC8vIDEuIGNvbXByZXNzaW9uIHN1cHBvcnQgaXMgZGlzYWJsZWRcblx0XHRcdC8vIDIuIEhFQUQgcmVxdWVzdFxuXHRcdFx0Ly8gMy4gbm8gQ29udGVudC1FbmNvZGluZyBoZWFkZXJcblx0XHRcdC8vIDQuIG5vIGNvbnRlbnQgcmVzcG9uc2UgKDIwNClcblx0XHRcdC8vIDUuIGNvbnRlbnQgbm90IG1vZGlmaWVkIHJlc3BvbnNlICgzMDQpXG5cdFx0XHRpZiAoIXJlcXVlc3QuY29tcHJlc3MgfHwgcmVxdWVzdC5tZXRob2QgPT09ICdIRUFEJyB8fCBjb2RpbmdzID09PSBudWxsIHx8IHJlc3BvbnNlXy5zdGF0dXNDb2RlID09PSAyMDQgfHwgcmVzcG9uc2VfLnN0YXR1c0NvZGUgPT09IDMwNCkge1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZU9wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3IgTm9kZSB2Nitcblx0XHRcdC8vIEJlIGxlc3Mgc3RyaWN0IHdoZW4gZGVjb2RpbmcgY29tcHJlc3NlZCByZXNwb25zZXMsIHNpbmNlIHNvbWV0aW1lc1xuXHRcdFx0Ly8gc2VydmVycyBzZW5kIHNsaWdodGx5IGludmFsaWQgcmVzcG9uc2VzIHRoYXQgYXJlIHN0aWxsIGFjY2VwdGVkXG5cdFx0XHQvLyBieSBjb21tb24gYnJvd3NlcnMuXG5cdFx0XHQvLyBBbHdheXMgdXNpbmcgWl9TWU5DX0ZMVVNIIGlzIHdoYXQgY1VSTCBkb2VzLlxuXHRcdFx0Y29uc3QgemxpYk9wdGlvbnMgPSB7XG5cdFx0XHRcdGZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSCxcblx0XHRcdFx0ZmluaXNoRmx1c2g6IHpsaWIuWl9TWU5DX0ZMVVNIXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBGb3IgZ3ppcFxuXHRcdFx0aWYgKGNvZGluZ3MgPT09ICdnemlwJyB8fCBjb2RpbmdzID09PSAneC1nemlwJykge1xuXHRcdFx0XHRib2R5ID0gcHVtcChib2R5LCB6bGliLmNyZWF0ZUd1bnppcCh6bGliT3B0aW9ucyksIGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIGRlZmxhdGVcblx0XHRcdGlmIChjb2RpbmdzID09PSAnZGVmbGF0ZScgfHwgY29kaW5ncyA9PT0gJ3gtZGVmbGF0ZScpIHtcblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBpbmZhbW91cyByYXcgZGVmbGF0ZSByZXNwb25zZSBmcm9tIG9sZCBzZXJ2ZXJzXG5cdFx0XHRcdC8vIGEgaGFjayBmb3Igb2xkIElJUyBhbmQgQXBhY2hlIHNlcnZlcnNcblx0XHRcdFx0Y29uc3QgcmF3ID0gcHVtcChyZXNwb25zZV8sIG5ldyBQYXNzVGhyb3VnaCgpLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJhdy5vbmNlKCdkYXRhJywgY2h1bmsgPT4ge1xuXHRcdFx0XHRcdC8vIFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTE5ODI4XG5cdFx0XHRcdFx0aWYgKChjaHVua1swXSAmIDB4MEYpID09PSAweDA4KSB7XG5cdFx0XHRcdFx0XHRib2R5ID0gcHVtcChib2R5LCB6bGliLmNyZWF0ZUluZmxhdGUoKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ym9keSA9IHB1bXAoYm9keSwgemxpYi5jcmVhdGVJbmZsYXRlUmF3KCksIGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJhdy5vbmNlKCdlbmQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gU29tZSBvbGQgSUlTIHNlcnZlcnMgcmV0dXJuIHplcm8tbGVuZ3RoIE9LIGRlZmxhdGUgcmVzcG9uc2VzLCBzb1xuXHRcdFx0XHRcdC8vICdkYXRhJyBpcyBuZXZlciBlbWl0dGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL25vZGUtZmV0Y2gvbm9kZS1mZXRjaC9wdWxsLzkwM1xuXHRcdFx0XHRcdGlmICghcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlT3B0aW9ucyk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBiclxuXHRcdFx0aWYgKGNvZGluZ3MgPT09ICdicicpIHtcblx0XHRcdFx0Ym9keSA9IHB1bXAoYm9keSwgemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzKCksIGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCB1c2UgcmVzcG9uc2UgYXMtaXNcblx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlT3B0aW9ucyk7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHR9KTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by10aGVuXG5cdFx0d3JpdGVUb1N0cmVhbShyZXF1ZXN0XywgcmVxdWVzdCkuY2F0Y2gocmVqZWN0KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGZpeFJlc3BvbnNlQ2h1bmtlZFRyYW5zZmVyQmFkRW5kaW5nKHJlcXVlc3QsIGVycm9yQ2FsbGJhY2spIHtcblx0Y29uc3QgTEFTVF9DSFVOSyA9IEJ1ZmZlci5mcm9tKCcwXFxyXFxuXFxyXFxuJyk7XG5cblx0bGV0IGlzQ2h1bmtlZFRyYW5zZmVyID0gZmFsc2U7XG5cdGxldCBwcm9wZXJMYXN0Q2h1bmtSZWNlaXZlZCA9IGZhbHNlO1xuXHRsZXQgcHJldmlvdXNDaHVuaztcblxuXHRyZXF1ZXN0Lm9uKCdyZXNwb25zZScsIHJlc3BvbnNlID0+IHtcblx0XHRjb25zdCB7aGVhZGVyc30gPSByZXNwb25zZTtcblx0XHRpc0NodW5rZWRUcmFuc2ZlciA9IGhlYWRlcnNbJ3RyYW5zZmVyLWVuY29kaW5nJ10gPT09ICdjaHVua2VkJyAmJiAhaGVhZGVyc1snY29udGVudC1sZW5ndGgnXTtcblx0fSk7XG5cblx0cmVxdWVzdC5vbignc29ja2V0Jywgc29ja2V0ID0+IHtcblx0XHRjb25zdCBvblNvY2tldENsb3NlID0gKCkgPT4ge1xuXHRcdFx0aWYgKGlzQ2h1bmtlZFRyYW5zZmVyICYmICFwcm9wZXJMYXN0Q2h1bmtSZWNlaXZlZCkge1xuXHRcdFx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcignUHJlbWF0dXJlIGNsb3NlJyk7XG5cdFx0XHRcdGVycm9yLmNvZGUgPSAnRVJSX1NUUkVBTV9QUkVNQVRVUkVfQ0xPU0UnO1xuXHRcdFx0XHRlcnJvckNhbGxiYWNrKGVycm9yKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Y29uc3Qgb25EYXRhID0gYnVmID0+IHtcblx0XHRcdHByb3Blckxhc3RDaHVua1JlY2VpdmVkID0gQnVmZmVyLmNvbXBhcmUoYnVmLnNsaWNlKC01KSwgTEFTVF9DSFVOSykgPT09IDA7XG5cblx0XHRcdC8vIFNvbWV0aW1lcyBmaW5hbCAwLWxlbmd0aCBjaHVuayBhbmQgZW5kIG9mIG1lc3NhZ2UgY29kZSBhcmUgaW4gc2VwYXJhdGUgcGFja2V0c1xuXHRcdFx0aWYgKCFwcm9wZXJMYXN0Q2h1bmtSZWNlaXZlZCAmJiBwcmV2aW91c0NodW5rKSB7XG5cdFx0XHRcdHByb3Blckxhc3RDaHVua1JlY2VpdmVkID0gKFxuXHRcdFx0XHRcdEJ1ZmZlci5jb21wYXJlKHByZXZpb3VzQ2h1bmsuc2xpY2UoLTMpLCBMQVNUX0NIVU5LLnNsaWNlKDAsIDMpKSA9PT0gMCAmJlxuXHRcdFx0XHRcdEJ1ZmZlci5jb21wYXJlKGJ1Zi5zbGljZSgtMiksIExBU1RfQ0hVTksuc2xpY2UoMykpID09PSAwXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHByZXZpb3VzQ2h1bmsgPSBidWY7XG5cdFx0fTtcblxuXHRcdHNvY2tldC5wcmVwZW5kTGlzdGVuZXIoJ2Nsb3NlJywgb25Tb2NrZXRDbG9zZSk7XG5cdFx0c29ja2V0Lm9uKCdkYXRhJywgb25EYXRhKTtcblxuXHRcdHJlcXVlc3Qub24oJ2Nsb3NlJywgKCkgPT4ge1xuXHRcdFx0c29ja2V0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uU29ja2V0Q2xvc2UpO1xuXHRcdFx0c29ja2V0LnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgb25EYXRhKTtcblx0XHR9KTtcblx0fSk7XG59XG4iLCBudWxsLCAiXG4vKipcbiAqIEJvZHkuanNcbiAqXG4gKiBCb2R5IGludGVyZmFjZSBwcm92aWRlcyBjb21tb24gbWV0aG9kcyBmb3IgUmVxdWVzdCBhbmQgUmVzcG9uc2VcbiAqL1xuXG5pbXBvcnQgU3RyZWFtLCB7UGFzc1Rocm91Z2h9IGZyb20gJ25vZGU6c3RyZWFtJztcbmltcG9ydCB7dHlwZXMsIGRlcHJlY2F0ZSwgcHJvbWlzaWZ5fSBmcm9tICdub2RlOnV0aWwnO1xuaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ25vZGU6YnVmZmVyJztcblxuaW1wb3J0IEJsb2IgZnJvbSAnZmV0Y2gtYmxvYic7XG5pbXBvcnQge0Zvcm1EYXRhLCBmb3JtRGF0YVRvQmxvYn0gZnJvbSAnZm9ybWRhdGEtcG9seWZpbGwvZXNtLm1pbi5qcyc7XG5cbmltcG9ydCB7RmV0Y2hFcnJvcn0gZnJvbSAnLi9lcnJvcnMvZmV0Y2gtZXJyb3IuanMnO1xuaW1wb3J0IHtGZXRjaEJhc2VFcnJvcn0gZnJvbSAnLi9lcnJvcnMvYmFzZS5qcyc7XG5pbXBvcnQge2lzQmxvYiwgaXNVUkxTZWFyY2hQYXJhbWV0ZXJzfSBmcm9tICcuL3V0aWxzL2lzLmpzJztcblxuY29uc3QgcGlwZWxpbmUgPSBwcm9taXNpZnkoU3RyZWFtLnBpcGVsaW5lKTtcbmNvbnN0IElOVEVSTkFMUyA9IFN5bWJvbCgnQm9keSBpbnRlcm5hbHMnKTtcblxuLyoqXG4gKiBCb2R5IG1peGluXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jYm9keVxuICpcbiAqIEBwYXJhbSAgIFN0cmVhbSAgYm9keSAgUmVhZGFibGUgc3RyZWFtXG4gKiBAcGFyYW0gICBPYmplY3QgIG9wdHMgIFJlc3BvbnNlIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9keSB7XG5cdGNvbnN0cnVjdG9yKGJvZHksIHtcblx0XHRzaXplID0gMFxuXHR9ID0ge30pIHtcblx0XHRsZXQgYm91bmRhcnkgPSBudWxsO1xuXG5cdFx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHRcdC8vIEJvZHkgaXMgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRcdGJvZHkgPSBudWxsO1xuXHRcdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbWV0ZXJzKGJvZHkpKSB7XG5cdFx0XHQvLyBCb2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS50b1N0cmluZygpKTtcblx0XHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdFx0Ly8gQm9keSBpcyBibG9iXG5cdFx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHRcdC8vIEJvZHkgaXMgQnVmZmVyXG5cdFx0fSBlbHNlIGlmICh0eXBlcy5pc0FueUFycmF5QnVmZmVyKGJvZHkpKSB7XG5cdFx0XHQvLyBCb2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keSk7XG5cdFx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoYm9keSkpIHtcblx0XHRcdC8vIEJvZHkgaXMgQXJyYXlCdWZmZXJWaWV3XG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS5idWZmZXIsIGJvZHkuYnl0ZU9mZnNldCwgYm9keS5ieXRlTGVuZ3RoKTtcblx0XHR9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcblx0XHRcdC8vIEJvZHkgaXMgc3RyZWFtXG5cdFx0fSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcblx0XHRcdC8vIEJvZHkgaXMgRm9ybURhdGFcblx0XHRcdGJvZHkgPSBmb3JtRGF0YVRvQmxvYihib2R5KTtcblx0XHRcdGJvdW5kYXJ5ID0gYm9keS50eXBlLnNwbGl0KCc9JylbMV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIE5vbmUgb2YgdGhlIGFib3ZlXG5cdFx0XHQvLyBjb2VyY2UgdG8gc3RyaW5nIHRoZW4gYnVmZmVyXG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oU3RyaW5nKGJvZHkpKTtcblx0XHR9XG5cblx0XHRsZXQgc3RyZWFtID0gYm9keTtcblxuXHRcdGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHRcdHN0cmVhbSA9IFN0cmVhbS5SZWFkYWJsZS5mcm9tKGJvZHkpO1xuXHRcdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0XHRzdHJlYW0gPSBTdHJlYW0uUmVhZGFibGUuZnJvbShib2R5LnN0cmVhbSgpKTtcblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMU10gPSB7XG5cdFx0XHRib2R5LFxuXHRcdFx0c3RyZWFtLFxuXHRcdFx0Ym91bmRhcnksXG5cdFx0XHRkaXN0dXJiZWQ6IGZhbHNlLFxuXHRcdFx0ZXJyb3I6IG51bGxcblx0XHR9O1xuXHRcdHRoaXMuc2l6ZSA9IHNpemU7XG5cblx0XHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdFx0Ym9keS5vbignZXJyb3InLCBlcnJvcl8gPT4ge1xuXHRcdFx0XHRjb25zdCBlcnJvciA9IGVycm9yXyBpbnN0YW5jZW9mIEZldGNoQmFzZUVycm9yID9cblx0XHRcdFx0XHRlcnJvcl8gOlxuXHRcdFx0XHRcdG5ldyBGZXRjaEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGJvZHkgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7dGhpcy51cmx9OiAke2Vycm9yXy5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnJvcl8pO1xuXHRcdFx0XHR0aGlzW0lOVEVSTkFMU10uZXJyb3IgPSBlcnJvcjtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGdldCBib2R5KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uc3RyZWFtO1xuXHR9XG5cblx0Z2V0IGJvZHlVc2VkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlY29kZSByZXNwb25zZSBhcyBBcnJheUJ1ZmZlclxuXHQgKlxuXHQgKiBAcmV0dXJuICBQcm9taXNlXG5cdCAqL1xuXHRhc3luYyBhcnJheUJ1ZmZlcigpIHtcblx0XHRjb25zdCB7YnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RofSA9IGF3YWl0IGNvbnN1bWVCb2R5KHRoaXMpO1xuXHRcdHJldHVybiBidWZmZXIuc2xpY2UoYnl0ZU9mZnNldCwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGgpO1xuXHR9XG5cblx0YXN5bmMgZm9ybURhdGEoKSB7XG5cdFx0Y29uc3QgY3QgPSB0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcblxuXHRcdGlmIChjdC5zdGFydHNXaXRoKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSkge1xuXHRcdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdGNvbnN0IHBhcmFtZXRlcnMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGF3YWl0IHRoaXMudGV4dCgpKTtcblxuXHRcdFx0Zm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIHBhcmFtZXRlcnMpIHtcblx0XHRcdFx0Zm9ybURhdGEuYXBwZW5kKG5hbWUsIHZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZvcm1EYXRhO1xuXHRcdH1cblxuXHRcdGNvbnN0IHt0b0Zvcm1EYXRhfSA9IGF3YWl0IGltcG9ydCgnLi91dGlscy9tdWx0aXBhcnQtcGFyc2VyLmpzJyk7XG5cdFx0cmV0dXJuIHRvRm9ybURhdGEodGhpcy5ib2R5LCBjdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHJhdyByZXNwb25zZSBhcyBCbG9iXG5cdCAqXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxuXHQgKi9cblx0YXN5bmMgYmxvYigpIHtcblx0XHRjb25zdCBjdCA9ICh0aGlzLmhlYWRlcnMgJiYgdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHx8ICh0aGlzW0lOVEVSTkFMU10uYm9keSAmJiB0aGlzW0lOVEVSTkFMU10uYm9keS50eXBlKSB8fCAnJztcblx0XHRjb25zdCBidWYgPSBhd2FpdCB0aGlzLmFycmF5QnVmZmVyKCk7XG5cblx0XHRyZXR1cm4gbmV3IEJsb2IoW2J1Zl0sIHtcblx0XHRcdHR5cGU6IGN0XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogRGVjb2RlIHJlc3BvbnNlIGFzIGpzb25cblx0ICpcblx0ICogQHJldHVybiAgUHJvbWlzZVxuXHQgKi9cblx0YXN5bmMganNvbigpIHtcblx0XHRjb25zdCB0ZXh0ID0gYXdhaXQgdGhpcy50ZXh0KCk7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVjb2RlIHJlc3BvbnNlIGFzIHRleHRcblx0ICpcblx0ICogQHJldHVybiAgUHJvbWlzZVxuXHQgKi9cblx0YXN5bmMgdGV4dCgpIHtcblx0XHRjb25zdCBidWZmZXIgPSBhd2FpdCBjb25zdW1lQm9keSh0aGlzKTtcblx0XHRyZXR1cm4gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGJ1ZmZlcik7XG5cdH1cblxuXHQvKipcblx0ICogRGVjb2RlIHJlc3BvbnNlIGFzIGJ1ZmZlciAobm9uLXNwZWMgYXBpKVxuXHQgKlxuXHQgKiBAcmV0dXJuICBQcm9taXNlXG5cdCAqL1xuXHRidWZmZXIoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5KHRoaXMpO1xuXHR9XG59XG5cbkJvZHkucHJvdG90eXBlLmJ1ZmZlciA9IGRlcHJlY2F0ZShCb2R5LnByb3RvdHlwZS5idWZmZXIsICdQbGVhc2UgdXNlIFxcJ3Jlc3BvbnNlLmFycmF5QnVmZmVyKClcXCcgaW5zdGVhZCBvZiBcXCdyZXNwb25zZS5idWZmZXIoKVxcJycsICdub2RlLWZldGNoI2J1ZmZlcicpO1xuXG4vLyBJbiBicm93c2VycywgYWxsIHByb3BlcnRpZXMgYXJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCb2R5LnByb3RvdHlwZSwge1xuXHRib2R5OiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGJvZHlVc2VkOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGFycmF5QnVmZmVyOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGJsb2I6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0anNvbjoge2VudW1lcmFibGU6IHRydWV9LFxuXHR0ZXh0OiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGRhdGE6IHtnZXQ6IGRlcHJlY2F0ZSgoKSA9PiB7fSxcblx0XHQnZGF0YSBkb2VzblxcJ3QgZXhpc3QsIHVzZSBqc29uKCksIHRleHQoKSwgYXJyYXlCdWZmZXIoKSwgb3IgYm9keSBpbnN0ZWFkJyxcblx0XHQnaHR0cHM6Ly9naXRodWIuY29tL25vZGUtZmV0Y2gvbm9kZS1mZXRjaC9pc3N1ZXMvMTAwMCAocmVzcG9uc2UpJyl9XG59KTtcblxuLyoqXG4gKiBDb25zdW1lIGFuZCBjb252ZXJ0IGFuIGVudGlyZSBCb2R5IHRvIGEgQnVmZmVyLlxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS1jb25zdW1lLWJvZHlcbiAqXG4gKiBAcmV0dXJuIFByb21pc2VcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY29uc3VtZUJvZHkoZGF0YSkge1xuXHRpZiAoZGF0YVtJTlRFUk5BTFNdLmRpc3R1cmJlZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGJvZHkgdXNlZCBhbHJlYWR5IGZvcjogJHtkYXRhLnVybH1gKTtcblx0fVxuXG5cdGRhdGFbSU5URVJOQUxTXS5kaXN0dXJiZWQgPSB0cnVlO1xuXG5cdGlmIChkYXRhW0lOVEVSTkFMU10uZXJyb3IpIHtcblx0XHR0aHJvdyBkYXRhW0lOVEVSTkFMU10uZXJyb3I7XG5cdH1cblxuXHRjb25zdCB7Ym9keX0gPSBkYXRhO1xuXG5cdC8vIEJvZHkgaXMgbnVsbFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBCdWZmZXIuYWxsb2MoMCk7XG5cdH1cblxuXHQvKiBjOCBpZ25vcmUgbmV4dCAzICovXG5cdGlmICghKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pKSB7XG5cdFx0cmV0dXJuIEJ1ZmZlci5hbGxvYygwKTtcblx0fVxuXG5cdC8vIEJvZHkgaXMgc3RyZWFtXG5cdC8vIGdldCByZWFkeSB0byBhY3R1YWxseSBjb25zdW1lIHRoZSBib2R5XG5cdGNvbnN0IGFjY3VtID0gW107XG5cdGxldCBhY2N1bUJ5dGVzID0gMDtcblxuXHR0cnkge1xuXHRcdGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgYm9keSkge1xuXHRcdFx0aWYgKGRhdGEuc2l6ZSA+IDAgJiYgYWNjdW1CeXRlcyArIGNodW5rLmxlbmd0aCA+IGRhdGEuc2l6ZSkge1xuXHRcdFx0XHRjb25zdCBlcnJvciA9IG5ldyBGZXRjaEVycm9yKGBjb250ZW50IHNpemUgYXQgJHtkYXRhLnVybH0gb3ZlciBsaW1pdDogJHtkYXRhLnNpemV9YCwgJ21heC1zaXplJyk7XG5cdFx0XHRcdGJvZHkuZGVzdHJveShlcnJvcik7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXG5cdFx0XHRhY2N1bUJ5dGVzICs9IGNodW5rLmxlbmd0aDtcblx0XHRcdGFjY3VtLnB1c2goY2h1bmspO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zdCBlcnJvcl8gPSBlcnJvciBpbnN0YW5jZW9mIEZldGNoQmFzZUVycm9yID8gZXJyb3IgOiBuZXcgRmV0Y2hFcnJvcihgSW52YWxpZCByZXNwb25zZSBib2R5IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke2RhdGEudXJsfTogJHtlcnJvci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnJvcik7XG5cdFx0dGhyb3cgZXJyb3JfO1xuXHR9XG5cblx0aWYgKGJvZHkucmVhZGFibGVFbmRlZCA9PT0gdHJ1ZSB8fCBib2R5Ll9yZWFkYWJsZVN0YXRlLmVuZGVkID09PSB0cnVlKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChhY2N1bS5ldmVyeShjID0+IHR5cGVvZiBjID09PSAnc3RyaW5nJykpIHtcblx0XHRcdFx0cmV0dXJuIEJ1ZmZlci5mcm9tKGFjY3VtLmpvaW4oJycpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEJ1ZmZlci5jb25jYXQoYWNjdW0sIGFjY3VtQnl0ZXMpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aHJvdyBuZXcgRmV0Y2hFcnJvcihgQ291bGQgbm90IGNyZWF0ZSBCdWZmZXIgZnJvbSByZXNwb25zZSBib2R5IGZvciAke2RhdGEudXJsfTogJHtlcnJvci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnJvcik7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBGZXRjaEVycm9yKGBQcmVtYXR1cmUgY2xvc2Ugb2Ygc2VydmVyIHJlc3BvbnNlIHdoaWxlIHRyeWluZyB0byBmZXRjaCAke2RhdGEudXJsfWApO1xuXHR9XG59XG5cbi8qKlxuICogQ2xvbmUgYm9keSBnaXZlbiBSZXMvUmVxIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnN0YW5jZSAgICAgICBSZXNwb25zZSBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICBTdHJpbmcgIGhpZ2hXYXRlck1hcmsgIGhpZ2hXYXRlck1hcmsgZm9yIGJvdGggUGFzc1Rocm91Z2ggYm9keSBzdHJlYW1zXG4gKiBAcmV0dXJuICBNaXhlZFxuICovXG5leHBvcnQgY29uc3QgY2xvbmUgPSAoaW5zdGFuY2UsIGhpZ2hXYXRlck1hcmspID0+IHtcblx0bGV0IHAxO1xuXHRsZXQgcDI7XG5cdGxldCB7Ym9keX0gPSBpbnN0YW5jZVtJTlRFUk5BTFNdO1xuXG5cdC8vIERvbid0IGFsbG93IGNsb25pbmcgYSB1c2VkIGJvZHlcblx0aWYgKGluc3RhbmNlLmJvZHlVc2VkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgY2xvbmUgYm9keSBhZnRlciBpdCBpcyB1c2VkJyk7XG5cdH1cblxuXHQvLyBDaGVjayB0aGF0IGJvZHkgaXMgYSBzdHJlYW0gYW5kIG5vdCBmb3JtLWRhdGEgb2JqZWN0XG5cdC8vIG5vdGU6IHdlIGNhbid0IGNsb25lIHRoZSBmb3JtLWRhdGEgb2JqZWN0IHdpdGhvdXQgaGF2aW5nIGl0IGFzIGEgZGVwZW5kZW5jeVxuXHRpZiAoKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pICYmICh0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHQvLyBUZWUgaW5zdGFuY2UgYm9keVxuXHRcdHAxID0gbmV3IFBhc3NUaHJvdWdoKHtoaWdoV2F0ZXJNYXJrfSk7XG5cdFx0cDIgPSBuZXcgUGFzc1Rocm91Z2goe2hpZ2hXYXRlck1hcmt9KTtcblx0XHRib2R5LnBpcGUocDEpO1xuXHRcdGJvZHkucGlwZShwMik7XG5cdFx0Ly8gU2V0IGluc3RhbmNlIGJvZHkgdG8gdGVlZCBib2R5IGFuZCByZXR1cm4gdGhlIG90aGVyIHRlZWQgYm9keVxuXHRcdGluc3RhbmNlW0lOVEVSTkFMU10uc3RyZWFtID0gcDE7XG5cdFx0Ym9keSA9IHAyO1xuXHR9XG5cblx0cmV0dXJuIGJvZHk7XG59O1xuXG5jb25zdCBnZXROb25TcGVjRm9ybURhdGFCb3VuZGFyeSA9IGRlcHJlY2F0ZShcblx0Ym9keSA9PiBib2R5LmdldEJvdW5kYXJ5KCksXG5cdCdmb3JtLWRhdGEgZG9lc25cXCd0IGZvbGxvdyB0aGUgc3BlYyBhbmQgcmVxdWlyZXMgc3BlY2lhbCB0cmVhdG1lbnQuIFVzZSBhbHRlcm5hdGl2ZSBwYWNrYWdlJyxcblx0J2h0dHBzOi8vZ2l0aHViLmNvbS9ub2RlLWZldGNoL25vZGUtZmV0Y2gvaXNzdWVzLzExNjcnXG4pO1xuXG4vKipcbiAqIFBlcmZvcm1zIHRoZSBvcGVyYXRpb24gXCJleHRyYWN0IGEgYENvbnRlbnQtVHlwZWAgdmFsdWUgZnJvbSB8b2JqZWN0fFwiIGFzXG4gKiBzcGVjaWZpZWQgaW4gdGhlIHNwZWNpZmljYXRpb246XG4gKiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5aW5pdC1leHRyYWN0XG4gKlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgaW5zdGFuY2UuYm9keSBpcyBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7YW55fSBib2R5IEFueSBvcHRpb25zLmJvZHkgaW5wdXRcbiAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfVxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdENvbnRlbnRUeXBlID0gKGJvZHksIHJlcXVlc3QpID0+IHtcblx0Ly8gQm9keSBpcyBudWxsIG9yIHVuZGVmaW5lZFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBzdHJpbmdcblx0aWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcblx0fVxuXG5cdC8vIEJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcblx0aWYgKGlzVVJMU2VhcmNoUGFyYW1ldGVycyhib2R5KSkge1xuXHRcdHJldHVybiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBibG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRyZXR1cm4gYm9keS50eXBlIHx8IG51bGw7XG5cdH1cblxuXHQvLyBCb2R5IGlzIGEgQnVmZmVyIChCdWZmZXIsIEFycmF5QnVmZmVyIG9yIEFycmF5QnVmZmVyVmlldylcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSB8fCB0eXBlcy5pc0FueUFycmF5QnVmZmVyKGJvZHkpIHx8IEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0aWYgKGJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuXHRcdHJldHVybiBgbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9JHtyZXF1ZXN0W0lOVEVSTkFMU10uYm91bmRhcnl9YDtcblx0fVxuXG5cdC8vIERldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdGlmIChib2R5ICYmIHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGBtdWx0aXBhcnQvZm9ybS1kYXRhO2JvdW5kYXJ5PSR7Z2V0Tm9uU3BlY0Zvcm1EYXRhQm91bmRhcnkoYm9keSl9YDtcblx0fVxuXG5cdC8vIEJvZHkgaXMgc3RyZWFtIC0gY2FuJ3QgcmVhbGx5IGRvIG11Y2ggYWJvdXQgdGhpc1xuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gQm9keSBjb25zdHJ1Y3RvciBkZWZhdWx0cyBvdGhlciB0aGluZ3MgdG8gc3RyaW5nXG5cdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcbn07XG5cbi8qKlxuICogVGhlIEZldGNoIFN0YW5kYXJkIHRyZWF0cyB0aGlzIGFzIGlmIFwidG90YWwgYnl0ZXNcIiBpcyBhIHByb3BlcnR5IG9uIHRoZSBib2R5LlxuICogRm9yIHVzLCB3ZSBoYXZlIHRvIGV4cGxpY2l0bHkgZ2V0IGl0IHdpdGggYSBmdW5jdGlvbi5cbiAqXG4gKiByZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHktdG90YWwtYnl0ZXNcbiAqXG4gKiBAcGFyYW0ge2FueX0gb2JqLmJvZHkgQm9keSBvYmplY3QgZnJvbSB0aGUgQm9keSBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIHtudW1iZXIgfCBudWxsfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VG90YWxCeXRlcyA9IHJlcXVlc3QgPT4ge1xuXHRjb25zdCB7Ym9keX0gPSByZXF1ZXN0W0lOVEVSTkFMU107XG5cblx0Ly8gQm9keSBpcyBudWxsIG9yIHVuZGVmaW5lZFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBCbG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRyZXR1cm4gYm9keS5zaXplO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBCdWZmZXJcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdHJldHVybiBib2R5Lmxlbmd0aDtcblx0fVxuXG5cdC8vIERldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdGlmIChib2R5ICYmIHR5cGVvZiBib2R5LmdldExlbmd0aFN5bmMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gYm9keS5oYXNLbm93bkxlbmd0aCAmJiBib2R5Lmhhc0tub3duTGVuZ3RoKCkgPyBib2R5LmdldExlbmd0aFN5bmMoKSA6IG51bGw7XG5cdH1cblxuXHQvLyBCb2R5IGlzIHN0cmVhbVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogV3JpdGUgYSBCb2R5IHRvIGEgTm9kZS5qcyBXcml0YWJsZVN0cmVhbSAoZS5nLiBodHRwLlJlcXVlc3QpIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmVhbS5Xcml0YWJsZX0gZGVzdCBUaGUgc3RyZWFtIHRvIHdyaXRlIHRvLlxuICogQHBhcmFtIG9iai5ib2R5IEJvZHkgb2JqZWN0IGZyb20gdGhlIEJvZHkgaW5zdGFuY2UuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdyaXRlVG9TdHJlYW0gPSBhc3luYyAoZGVzdCwge2JvZHl9KSA9PiB7XG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gQm9keSBpcyBudWxsXG5cdFx0ZGVzdC5lbmQoKTtcblx0fSBlbHNlIHtcblx0XHQvLyBCb2R5IGlzIHN0cmVhbVxuXHRcdGF3YWl0IHBpcGVsaW5lKGJvZHksIGRlc3QpO1xuXHR9XG59O1xuIiwgImV4cG9ydCBjbGFzcyBGZXRjaEJhc2VFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IobWVzc2FnZSwgdHlwZSkge1xuXHRcdHN1cGVyKG1lc3NhZ2UpO1xuXHRcdC8vIEhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcblx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcblxuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXHR9XG5cblx0Z2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG5cdH1cbn1cbiIsICJcbmltcG9ydCB7RmV0Y2hCYXNlRXJyb3J9IGZyb20gJy4vYmFzZS5qcyc7XG5cbi8qKlxuICogQHR5cGVkZWYge3sgYWRkcmVzcz86IHN0cmluZywgY29kZTogc3RyaW5nLCBkZXN0Pzogc3RyaW5nLCBlcnJubzogbnVtYmVyLCBpbmZvPzogb2JqZWN0LCBtZXNzYWdlOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcsIHBvcnQ/OiBudW1iZXIsIHN5c2NhbGw6IHN0cmluZ319IFN5c3RlbUVycm9yXG4qL1xuXG4vKipcbiAqIEZldGNoRXJyb3IgaW50ZXJmYWNlIGZvciBvcGVyYXRpb25hbCBlcnJvcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEZldGNoRXJyb3IgZXh0ZW5kcyBGZXRjaEJhc2VFcnJvciB7XG5cdC8qKlxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IG1lc3NhZ2UgLSAgICAgIEVycm9yIG1lc3NhZ2UgZm9yIGh1bWFuXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gW3R5cGVdIC0gICAgICAgIEVycm9yIHR5cGUgZm9yIG1hY2hpbmVcblx0ICogQHBhcmFtICB7U3lzdGVtRXJyb3J9IFtzeXN0ZW1FcnJvcl0gLSBGb3IgTm9kZS5qcyBzeXN0ZW0gZXJyb3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHR5cGUsIHN5c3RlbUVycm9yKSB7XG5cdFx0c3VwZXIobWVzc2FnZSwgdHlwZSk7XG5cdFx0Ly8gV2hlbiBlcnIudHlwZSBpcyBgc3lzdGVtYCwgZXJyLmVycm9yZWRTeXNDYWxsIGNvbnRhaW5zIHN5c3RlbSBlcnJvciBhbmQgZXJyLmNvZGUgY29udGFpbnMgc3lzdGVtIGVycm9yIGNvZGVcblx0XHRpZiAoc3lzdGVtRXJyb3IpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1tdWx0aS1hc3NpZ25cblx0XHRcdHRoaXMuY29kZSA9IHRoaXMuZXJybm8gPSBzeXN0ZW1FcnJvci5jb2RlO1xuXHRcdFx0dGhpcy5lcnJvcmVkU3lzQ2FsbCA9IHN5c3RlbUVycm9yLnN5c2NhbGw7XG5cdFx0fVxuXHR9XG59XG4iLCAiLyoqXG4gKiBJcy5qc1xuICpcbiAqIE9iamVjdCB0eXBlIGNoZWNrcy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sLnRvU3RyaW5nVGFnO1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICogcmVmOiBodHRwczovL2dpdGh1Yi5jb20vbm9kZS1mZXRjaC9ub2RlLWZldGNoL2lzc3Vlcy8yOTYjaXNzdWVjb21tZW50LTMwNzU5ODE0M1xuICogQHBhcmFtIHsqfSBvYmplY3QgLSBPYmplY3QgdG8gY2hlY2sgZm9yXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNVUkxTZWFyY2hQYXJhbWV0ZXJzID0gb2JqZWN0ID0+IHtcblx0cmV0dXJuIChcblx0XHR0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuYXBwZW5kID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5kZWxldGUgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmdldCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuZ2V0QWxsID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5oYXMgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LnNldCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3Quc29ydCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdG9iamVjdFtOQU1FXSA9PT0gJ1VSTFNlYXJjaFBhcmFtcydcblx0KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamVjdGAgaXMgYSBXM0MgYEJsb2JgIG9iamVjdCAod2hpY2ggYEZpbGVgIGluaGVyaXRzIGZyb20pXG4gKiBAcGFyYW0geyp9IG9iamVjdCAtIE9iamVjdCB0byBjaGVjayBmb3JcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBpc0Jsb2IgPSBvYmplY3QgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdG9iamVjdCAmJlxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIG9iamVjdC5hcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QudHlwZSA9PT0gJ3N0cmluZycgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LnN0cmVhbSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiZcblx0XHQvXihCbG9ifEZpbGUpJC8udGVzdChvYmplY3RbTkFNRV0pXG5cdCk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIGluc3RhbmNlIG9mIEFib3J0U2lnbmFsLlxuICogQHBhcmFtIHsqfSBvYmplY3QgLSBPYmplY3QgdG8gY2hlY2sgZm9yXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNBYm9ydFNpZ25hbCA9IG9iamVjdCA9PiB7XG5cdHJldHVybiAoXG5cdFx0dHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgKFxuXHRcdFx0b2JqZWN0W05BTUVdID09PSAnQWJvcnRTaWduYWwnIHx8XG5cdFx0XHRvYmplY3RbTkFNRV0gPT09ICdFdmVudFRhcmdldCdcblx0XHQpXG5cdCk7XG59O1xuXG4vKipcbiAqIGlzRG9tYWluT3JTdWJkb21haW4gcmVwb3J0cyB3aGV0aGVyIHN1YiBpcyBhIHN1YmRvbWFpbiAob3IgZXhhY3QgbWF0Y2gpIG9mXG4gKiB0aGUgcGFyZW50IGRvbWFpbi5cbiAqXG4gKiBCb3RoIGRvbWFpbnMgbXVzdCBhbHJlYWR5IGJlIGluIGNhbm9uaWNhbCBmb3JtLlxuICogQHBhcmFtIHtzdHJpbmd8VVJMfSBvcmlnaW5hbFxuICogQHBhcmFtIHtzdHJpbmd8VVJMfSBkZXN0aW5hdGlvblxuICovXG5leHBvcnQgY29uc3QgaXNEb21haW5PclN1YmRvbWFpbiA9IChkZXN0aW5hdGlvbiwgb3JpZ2luYWwpID0+IHtcblx0Y29uc3Qgb3JpZyA9IG5ldyBVUkwob3JpZ2luYWwpLmhvc3RuYW1lO1xuXHRjb25zdCBkZXN0ID0gbmV3IFVSTChkZXN0aW5hdGlvbikuaG9zdG5hbWU7XG5cblx0cmV0dXJuIG9yaWcgPT09IGRlc3QgfHwgb3JpZy5lbmRzV2l0aChgLiR7ZGVzdH1gKTtcbn07XG5cbi8qKlxuICogaXNTYW1lUHJvdG9jb2wgcmVwb3J0cyB3aGV0aGVyIHRoZSB0d28gcHJvdmlkZWQgVVJMcyB1c2UgdGhlIHNhbWUgcHJvdG9jb2wuXG4gKlxuICogQm90aCBkb21haW5zIG11c3QgYWxyZWFkeSBiZSBpbiBjYW5vbmljYWwgZm9ybS5cbiAqIEBwYXJhbSB7c3RyaW5nfFVSTH0gb3JpZ2luYWxcbiAqIEBwYXJhbSB7c3RyaW5nfFVSTH0gZGVzdGluYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2FtZVByb3RvY29sID0gKGRlc3RpbmF0aW9uLCBvcmlnaW5hbCkgPT4ge1xuXHRjb25zdCBvcmlnID0gbmV3IFVSTChvcmlnaW5hbCkucHJvdG9jb2w7XG5cdGNvbnN0IGRlc3QgPSBuZXcgVVJMKGRlc3RpbmF0aW9uKS5wcm90b2NvbDtcblxuXHRyZXR1cm4gb3JpZyA9PT0gZGVzdDtcbn07XG4iLCAiLyoqXG4gKiBIZWFkZXJzLmpzXG4gKlxuICogSGVhZGVycyBjbGFzcyBvZmZlcnMgY29udmVuaWVudCBoZWxwZXJzXG4gKi9cblxuaW1wb3J0IHt0eXBlc30gZnJvbSAnbm9kZTp1dGlsJztcbmltcG9ydCBodHRwIGZyb20gJ25vZGU6aHR0cCc7XG5cbi8qIGM4IGlnbm9yZSBuZXh0IDkgKi9cbmNvbnN0IHZhbGlkYXRlSGVhZGVyTmFtZSA9IHR5cGVvZiBodHRwLnZhbGlkYXRlSGVhZGVyTmFtZSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdGh0dHAudmFsaWRhdGVIZWFkZXJOYW1lIDpcblx0bmFtZSA9PiB7XG5cdFx0aWYgKCEvXltcXF5gXFwtXFx3ISMkJSYnKisufH5dKyQvLnRlc3QobmFtZSkpIHtcblx0XHRcdGNvbnN0IGVycm9yID0gbmV3IFR5cGVFcnJvcihgSGVhZGVyIG5hbWUgbXVzdCBiZSBhIHZhbGlkIEhUVFAgdG9rZW4gWyR7bmFtZX1dYCk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyb3IsICdjb2RlJywge3ZhbHVlOiAnRVJSX0lOVkFMSURfSFRUUF9UT0tFTid9KTtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblx0fTtcblxuLyogYzggaWdub3JlIG5leHQgOSAqL1xuY29uc3QgdmFsaWRhdGVIZWFkZXJWYWx1ZSA9IHR5cGVvZiBodHRwLnZhbGlkYXRlSGVhZGVyVmFsdWUgPT09ICdmdW5jdGlvbicgP1xuXHRodHRwLnZhbGlkYXRlSGVhZGVyVmFsdWUgOlxuXHQobmFtZSwgdmFsdWUpID0+IHtcblx0XHRpZiAoL1teXFx0XFx1MDAyMC1cXHUwMDdFXFx1MDA4MC1cXHUwMEZGXS8udGVzdCh2YWx1ZSkpIHtcblx0XHRcdGNvbnN0IGVycm9yID0gbmV3IFR5cGVFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGNvbnRlbnQgW1wiJHtuYW1lfVwiXWApO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGVycm9yLCAnY29kZScsIHt2YWx1ZTogJ0VSUl9JTlZBTElEX0NIQVInfSk7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cdH07XG5cbi8qKlxuICogQHR5cGVkZWYge0hlYWRlcnMgfCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgSXRlcmFibGU8cmVhZG9ubHkgW3N0cmluZywgc3RyaW5nXT4gfCBJdGVyYWJsZTxJdGVyYWJsZTxzdHJpbmc+Pn0gSGVhZGVyc0luaXRcbiAqL1xuXG4vKipcbiAqIFRoaXMgRmV0Y2ggQVBJIGludGVyZmFjZSBhbGxvd3MgeW91IHRvIHBlcmZvcm0gdmFyaW91cyBhY3Rpb25zIG9uIEhUVFAgcmVxdWVzdCBhbmQgcmVzcG9uc2UgaGVhZGVycy5cbiAqIFRoZXNlIGFjdGlvbnMgaW5jbHVkZSByZXRyaWV2aW5nLCBzZXR0aW5nLCBhZGRpbmcgdG8sIGFuZCByZW1vdmluZy5cbiAqIEEgSGVhZGVycyBvYmplY3QgaGFzIGFuIGFzc29jaWF0ZWQgaGVhZGVyIGxpc3QsIHdoaWNoIGlzIGluaXRpYWxseSBlbXB0eSBhbmQgY29uc2lzdHMgb2YgemVybyBvciBtb3JlIG5hbWUgYW5kIHZhbHVlIHBhaXJzLlxuICogWW91IGNhbiBhZGQgdG8gdGhpcyB1c2luZyBtZXRob2RzIGxpa2UgYXBwZW5kKCkgKHNlZSBFeGFtcGxlcy4pXG4gKiBJbiBhbGwgbWV0aG9kcyBvZiB0aGlzIGludGVyZmFjZSwgaGVhZGVyIG5hbWVzIGFyZSBtYXRjaGVkIGJ5IGNhc2UtaW5zZW5zaXRpdmUgYnl0ZSBzZXF1ZW5jZS5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlcnMgZXh0ZW5kcyBVUkxTZWFyY2hQYXJhbXMge1xuXHQvKipcblx0ICogSGVhZGVycyBjbGFzc1xuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtIZWFkZXJzSW5pdH0gW2luaXRdIC0gUmVzcG9uc2UgaGVhZGVyc1xuXHQgKi9cblx0Y29uc3RydWN0b3IoaW5pdCkge1xuXHRcdC8vIFZhbGlkYXRlIGFuZCBub3JtYWxpemUgaW5pdCBvYmplY3QgaW4gW25hbWUsIHZhbHVlKHMpXVtdXG5cdFx0LyoqIEB0eXBlIHtzdHJpbmdbXVtdfSAqL1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAoaW5pdCBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcblx0XHRcdGNvbnN0IHJhdyA9IGluaXQucmF3KCk7XG5cdFx0XHRmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZXNdIG9mIE9iamVjdC5lbnRyaWVzKHJhdykpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLi4udmFsdWVzLm1hcCh2YWx1ZSA9PiBbbmFtZSwgdmFsdWVdKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChpbml0ID09IG51bGwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lcS1udWxsLCBlcWVxZXFcblx0XHRcdC8vIE5vIG9wXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgaW5pdCA9PT0gJ29iamVjdCcgJiYgIXR5cGVzLmlzQm94ZWRQcmltaXRpdmUoaW5pdCkpIHtcblx0XHRcdGNvbnN0IG1ldGhvZCA9IGluaXRbU3ltYm9sLml0ZXJhdG9yXTtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLCBlcWVxZXFcblx0XHRcdGlmIChtZXRob2QgPT0gbnVsbCkge1xuXHRcdFx0XHQvLyBSZWNvcmQ8Qnl0ZVN0cmluZywgQnl0ZVN0cmluZz5cblx0XHRcdFx0cmVzdWx0LnB1c2goLi4uT2JqZWN0LmVudHJpZXMoaW5pdCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdIZWFkZXIgcGFpcnMgbXVzdCBiZSBpdGVyYWJsZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2VxdWVuY2U8c2VxdWVuY2U8Qnl0ZVN0cmluZz4+XG5cdFx0XHRcdC8vIE5vdGU6IHBlciBzcGVjIHdlIGhhdmUgdG8gZmlyc3QgZXhoYXVzdCB0aGUgbGlzdHMgdGhlbiBwcm9jZXNzIHRoZW1cblx0XHRcdFx0cmVzdWx0ID0gWy4uLmluaXRdXG5cdFx0XHRcdFx0Lm1hcChwYWlyID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0dHlwZW9mIHBhaXIgIT09ICdvYmplY3QnIHx8IHR5cGVzLmlzQm94ZWRQcmltaXRpdmUocGFpcilcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgYW4gaXRlcmFibGUgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBbLi4ucGFpcl07XG5cdFx0XHRcdFx0fSkubWFwKHBhaXIgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHBhaXIubGVuZ3RoICE9PSAyKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0VhY2ggaGVhZGVyIHBhaXIgbXVzdCBiZSBhIG5hbWUvdmFsdWUgdHVwbGUnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIFsuLi5wYWlyXTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdIZWFkZXJzXFwnOiBUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IG9mIHR5cGUgXFwnKHNlcXVlbmNlPHNlcXVlbmNlPEJ5dGVTdHJpbmc+PiBvciByZWNvcmQ8Qnl0ZVN0cmluZywgQnl0ZVN0cmluZz4pJyk7XG5cdFx0fVxuXG5cdFx0Ly8gVmFsaWRhdGUgYW5kIGxvd2VyY2FzZVxuXHRcdHJlc3VsdCA9XG5cdFx0XHRyZXN1bHQubGVuZ3RoID4gMCA/XG5cdFx0XHRcdHJlc3VsdC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IHtcblx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlck5hbWUobmFtZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJWYWx1ZShuYW1lLCBTdHJpbmcodmFsdWUpKTtcblx0XHRcdFx0XHRyZXR1cm4gW1N0cmluZyhuYW1lKS50b0xvd2VyQ2FzZSgpLCBTdHJpbmcodmFsdWUpXTtcblx0XHRcdFx0fSkgOlxuXHRcdFx0XHR1bmRlZmluZWQ7XG5cblx0XHRzdXBlcihyZXN1bHQpO1xuXG5cdFx0Ly8gUmV0dXJuaW5nIGEgUHJveHkgdGhhdCB3aWxsIGxvd2VyY2FzZSBrZXkgbmFtZXMsIHZhbGlkYXRlIHBhcmFtZXRlcnMgYW5kIHNvcnQga2V5c1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKSB7XG5cdFx0XHRcdHN3aXRjaCAocCkge1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6XG5cdFx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0XHRcdHJldHVybiAobmFtZSwgdmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJOYW1lKG5hbWUpO1xuXHRcdFx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlclZhbHVlKG5hbWUsIFN0cmluZyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZVtwXS5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdHRhcmdldCxcblx0XHRcdFx0XHRcdFx0XHRTdHJpbmcobmFtZSkudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdFx0XHRTdHJpbmcodmFsdWUpXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y2FzZSAnZGVsZXRlJzpcblx0XHRcdFx0XHRjYXNlICdoYXMnOlxuXHRcdFx0XHRcdGNhc2UgJ2dldEFsbCc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRcdHZhbGlkYXRlSGVhZGVyTmFtZShuYW1lKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGVbcF0uY2FsbChcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXQsXG5cdFx0XHRcdFx0XHRcdFx0U3RyaW5nKG5hbWUpLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjYXNlICdrZXlzJzpcblx0XHRcdFx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRhcmdldC5zb3J0KCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXcgU2V0KFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUua2V5cy5jYWxsKHRhcmdldCkpLmtleXMoKTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0LyogYzggaWdub3JlIG5leHQgKi9cblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXHR9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzKTtcblx0fVxuXG5cdGdldChuYW1lKSB7XG5cdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5nZXRBbGwobmFtZSk7XG5cdFx0aWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGxldCB2YWx1ZSA9IHZhbHVlcy5qb2luKCcsICcpO1xuXHRcdGlmICgvXmNvbnRlbnQtZW5jb2RpbmckL2kudGVzdChuYW1lKSkge1xuXHRcdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcgPSB1bmRlZmluZWQpIHtcblx0XHRmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5rZXlzKCkpIHtcblx0XHRcdFJlZmxlY3QuYXBwbHkoY2FsbGJhY2ssIHRoaXNBcmcsIFt0aGlzLmdldChuYW1lKSwgbmFtZSwgdGhpc10pO1xuXHRcdH1cblx0fVxuXG5cdCogdmFsdWVzKCkge1xuXHRcdGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLmtleXMoKSkge1xuXHRcdFx0eWllbGQgdGhpcy5nZXQobmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlIHsoKSA9PiBJdGVyYWJsZUl0ZXJhdG9yPFtzdHJpbmcsIHN0cmluZ10+fVxuXHQgKi9cblx0KiBlbnRyaWVzKCkge1xuXHRcdGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLmtleXMoKSkge1xuXHRcdFx0eWllbGQgW25hbWUsIHRoaXMuZ2V0KG5hbWUpXTtcblx0XHR9XG5cdH1cblxuXHRbU3ltYm9sLml0ZXJhdG9yXSgpIHtcblx0XHRyZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG5cdH1cblxuXHQvKipcblx0ICogTm9kZS1mZXRjaCBub24tc3BlYyBtZXRob2Rcblx0ICogcmV0dXJuaW5nIGFsbCBoZWFkZXJzIGFuZCB0aGVpciB2YWx1ZXMgYXMgYXJyYXlcblx0ICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIHN0cmluZ1tdPn1cblx0ICovXG5cdHJhdygpIHtcblx0XHRyZXR1cm4gWy4uLnRoaXMua2V5cygpXS5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMuZ2V0QWxsKGtleSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3IgYmV0dGVyIGNvbnNvbGUubG9nKGhlYWRlcnMpIGFuZCBhbHNvIHRvIGNvbnZlcnQgSGVhZGVycyBpbnRvIE5vZGUuanMgUmVxdWVzdCBjb21wYXRpYmxlIGZvcm1hdFxuXHQgKi9cblx0W1N5bWJvbC5mb3IoJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJyldKCkge1xuXHRcdHJldHVybiBbLi4udGhpcy5rZXlzKCldLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcblx0XHRcdGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0QWxsKGtleSk7XG5cdFx0XHQvLyBIdHRwLnJlcXVlc3QoKSBvbmx5IHN1cHBvcnRzIHN0cmluZyBhcyBIb3N0IGhlYWRlci5cblx0XHRcdC8vIFRoaXMgaGFjayBtYWtlcyBzcGVjaWZ5aW5nIGN1c3RvbSBIb3N0IGhlYWRlciBwb3NzaWJsZS5cblx0XHRcdGlmIChrZXkgPT09ICdob3N0Jykge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHZhbHVlc1swXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdmFsdWVzLmxlbmd0aCA+IDEgPyB2YWx1ZXMgOiB2YWx1ZXNbMF07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSwge30pO1xuXHR9XG59XG5cbi8qKlxuICogUmUtc2hhcGluZyBvYmplY3QgZm9yIFdlYiBJREwgdGVzdHNcbiAqIE9ubHkgbmVlZCB0byBkbyBpdCBmb3Igb3ZlcnJpZGRlbiBtZXRob2RzXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFxuXHRIZWFkZXJzLnByb3RvdHlwZSxcblx0WydnZXQnLCAnZW50cmllcycsICdmb3JFYWNoJywgJ3ZhbHVlcyddLnJlZHVjZSgocmVzdWx0LCBwcm9wZXJ0eSkgPT4ge1xuXHRcdHJlc3VsdFtwcm9wZXJ0eV0gPSB7ZW51bWVyYWJsZTogdHJ1ZX07XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSwge30pXG4pO1xuXG4vKipcbiAqIENyZWF0ZSBhIEhlYWRlcnMgb2JqZWN0IGZyb20gYW4gaHR0cC5JbmNvbWluZ01lc3NhZ2UucmF3SGVhZGVycywgaWdub3JpbmcgdGhvc2UgdGhhdCBkb1xuICogbm90IGNvbmZvcm0gdG8gSFRUUCBncmFtbWFyIHByb2R1Y3Rpb25zLlxuICogQHBhcmFtIHtpbXBvcnQoJ2h0dHAnKS5JbmNvbWluZ01lc3NhZ2VbJ3Jhd0hlYWRlcnMnXX0gaGVhZGVyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJhd0hlYWRlcnMoaGVhZGVycyA9IFtdKSB7XG5cdHJldHVybiBuZXcgSGVhZGVycyhcblx0XHRoZWFkZXJzXG5cdFx0XHQvLyBTcGxpdCBpbnRvIHBhaXJzXG5cdFx0XHQucmVkdWNlKChyZXN1bHQsIHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcblx0XHRcdFx0aWYgKGluZGV4ICUgMiA9PT0gMCkge1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGFycmF5LnNsaWNlKGluZGV4LCBpbmRleCArIDIpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LCBbXSlcblx0XHRcdC5maWx0ZXIoKFtuYW1lLCB2YWx1ZV0pID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlck5hbWUobmFtZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJWYWx1ZShuYW1lLCBTdHJpbmcodmFsdWUpKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdCk7XG59XG4iLCAiY29uc3QgcmVkaXJlY3RTdGF0dXMgPSBuZXcgU2V0KFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF0pO1xuXG4vKipcbiAqIFJlZGlyZWN0IGNvZGUgbWF0Y2hpbmdcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZSAtIFN0YXR1cyBjb2RlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNSZWRpcmVjdCA9IGNvZGUgPT4ge1xuXHRyZXR1cm4gcmVkaXJlY3RTdGF0dXMuaGFzKGNvZGUpO1xufTtcbiIsICIvKipcbiAqIFJlc3BvbnNlLmpzXG4gKlxuICogUmVzcG9uc2UgY2xhc3MgcHJvdmlkZXMgY29udGVudCBkZWNvZGluZ1xuICovXG5cbmltcG9ydCBIZWFkZXJzIGZyb20gJy4vaGVhZGVycy5qcyc7XG5pbXBvcnQgQm9keSwge2Nsb25lLCBleHRyYWN0Q29udGVudFR5cGV9IGZyb20gJy4vYm9keS5qcyc7XG5pbXBvcnQge2lzUmVkaXJlY3R9IGZyb20gJy4vdXRpbHMvaXMtcmVkaXJlY3QuanMnO1xuXG5jb25zdCBJTlRFUk5BTFMgPSBTeW1ib2woJ1Jlc3BvbnNlIGludGVybmFscycpO1xuXG4vKipcbiAqIFJlc3BvbnNlIGNsYXNzXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2UtY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIGV4dGVuZHMgQm9keSB7XG5cdGNvbnN0cnVjdG9yKGJvZHkgPSBudWxsLCBvcHRpb25zID0ge30pIHtcblx0XHRzdXBlcihib2R5LCBvcHRpb25zKTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLCBlcWVxZXEsIG5vLW5lZ2F0ZWQtY29uZGl0aW9uXG5cdFx0Y29uc3Qgc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgIT0gbnVsbCA/IG9wdGlvbnMuc3RhdHVzIDogMjAwO1xuXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG5cblx0XHRpZiAoYm9keSAhPT0gbnVsbCAmJiAhaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShib2R5LCB0aGlzKTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTXSA9IHtcblx0XHRcdHR5cGU6ICdkZWZhdWx0Jyxcblx0XHRcdHVybDogb3B0aW9ucy51cmwsXG5cdFx0XHRzdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiBvcHRpb25zLnN0YXR1c1RleHQgfHwgJycsXG5cdFx0XHRoZWFkZXJzLFxuXHRcdFx0Y291bnRlcjogb3B0aW9ucy5jb3VudGVyLFxuXHRcdFx0aGlnaFdhdGVyTWFyazogb3B0aW9ucy5oaWdoV2F0ZXJNYXJrXG5cdFx0fTtcblx0fVxuXG5cdGdldCB0eXBlKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10udHlwZTtcblx0fVxuXG5cdGdldCB1cmwoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS51cmwgfHwgJyc7XG5cdH1cblxuXHRnZXQgc3RhdHVzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uc3RhdHVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlbmllbmNlIHByb3BlcnR5IHJlcHJlc2VudGluZyBpZiB0aGUgcmVxdWVzdCBlbmRlZCBub3JtYWxseVxuXHQgKi9cblx0Z2V0IG9rKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uc3RhdHVzID49IDIwMCAmJiB0aGlzW0lOVEVSTkFMU10uc3RhdHVzIDwgMzAwO1xuXHR9XG5cblx0Z2V0IHJlZGlyZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5jb3VudGVyID4gMDtcblx0fVxuXG5cdGdldCBzdGF0dXNUZXh0KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uc3RhdHVzVGV4dDtcblx0fVxuXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uaGVhZGVycztcblx0fVxuXG5cdGdldCBoaWdoV2F0ZXJNYXJrKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uaGlnaFdhdGVyTWFyaztcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZSB0aGlzIHJlc3BvbnNlXG5cdCAqXG5cdCAqIEByZXR1cm4gIFJlc3BvbnNlXG5cdCAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKGNsb25lKHRoaXMsIHRoaXMuaGlnaFdhdGVyTWFyayksIHtcblx0XHRcdHR5cGU6IHRoaXMudHlwZSxcblx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzLFxuXHRcdFx0b2s6IHRoaXMub2ssXG5cdFx0XHRyZWRpcmVjdGVkOiB0aGlzLnJlZGlyZWN0ZWQsXG5cdFx0XHRzaXplOiB0aGlzLnNpemUsXG5cdFx0XHRoaWdoV2F0ZXJNYXJrOiB0aGlzLmhpZ2hXYXRlck1hcmtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdXJsICAgIFRoZSBVUkwgdGhhdCB0aGUgbmV3IHJlc3BvbnNlIGlzIHRvIG9yaWdpbmF0ZSBmcm9tLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzIEFuIG9wdGlvbmFsIHN0YXR1cyBjb2RlIGZvciB0aGUgcmVzcG9uc2UgKGUuZy4sIDMwMi4pXG5cdCAqIEByZXR1cm5zIHtSZXNwb25zZX0gICAgQSBSZXNwb25zZSBvYmplY3QuXG5cdCAqL1xuXHRzdGF0aWMgcmVkaXJlY3QodXJsLCBzdGF0dXMgPSAzMDIpIHtcblx0XHRpZiAoIWlzUmVkaXJlY3Qoc3RhdHVzKSkge1xuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ZhaWxlZCB0byBleGVjdXRlIFwicmVkaXJlY3RcIiBvbiBcInJlc3BvbnNlXCI6IEludmFsaWQgc3RhdHVzIGNvZGUnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0bG9jYXRpb246IG5ldyBVUkwodXJsKS50b1N0cmluZygpXG5cdFx0XHR9LFxuXHRcdFx0c3RhdHVzXG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgZXJyb3IoKSB7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KTtcblx0XHRyZXNwb25zZVtJTlRFUk5BTFNdLnR5cGUgPSAnZXJyb3InO1xuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gJ1Jlc3BvbnNlJztcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXNwb25zZS5wcm90b3R5cGUsIHtcblx0dHlwZToge2VudW1lcmFibGU6IHRydWV9LFxuXHR1cmw6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0c3RhdHVzOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdG9rOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHJlZGlyZWN0ZWQ6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0c3RhdHVzVGV4dDoge2VudW1lcmFibGU6IHRydWV9LFxuXHRoZWFkZXJzOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGNsb25lOiB7ZW51bWVyYWJsZTogdHJ1ZX1cbn0pO1xuIiwgIi8qKlxuICogUmVxdWVzdC5qc1xuICpcbiAqIFJlcXVlc3QgY2xhc3MgY29udGFpbnMgc2VydmVyIG9ubHkgb3B0aW9uc1xuICpcbiAqIEFsbCBzcGVjIGFsZ29yaXRobSBzdGVwIG51bWJlcnMgYXJlIGJhc2VkIG9uIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnL2NvbW1pdC1zbmFwc2hvdHMvYWU3MTY4MjJjYjNhNjE4NDMyMjZjZDA5MGVlZmM2NTg5NDQ2YzFkMi8uXG4gKi9cblxuaW1wb3J0IHtmb3JtYXQgYXMgZm9ybWF0VXJsfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQge2RlcHJlY2F0ZX0gZnJvbSAnbm9kZTp1dGlsJztcbmltcG9ydCBIZWFkZXJzIGZyb20gJy4vaGVhZGVycy5qcyc7XG5pbXBvcnQgQm9keSwge2Nsb25lLCBleHRyYWN0Q29udGVudFR5cGUsIGdldFRvdGFsQnl0ZXN9IGZyb20gJy4vYm9keS5qcyc7XG5pbXBvcnQge2lzQWJvcnRTaWduYWx9IGZyb20gJy4vdXRpbHMvaXMuanMnO1xuaW1wb3J0IHtnZXRTZWFyY2h9IGZyb20gJy4vdXRpbHMvZ2V0LXNlYXJjaC5qcyc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZVJlZmVycmVyUG9saWN5LCBkZXRlcm1pbmVSZXF1ZXN0c1JlZmVycmVyLCBERUZBVUxUX1JFRkVSUkVSX1BPTElDWVxufSBmcm9tICcuL3V0aWxzL3JlZmVycmVyLmpzJztcblxuY29uc3QgSU5URVJOQUxTID0gU3ltYm9sKCdSZXF1ZXN0IGludGVybmFscycpO1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIGluc3RhbmNlIG9mIFJlcXVlc3QuXG4gKlxuICogQHBhcmFtICB7Kn0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc1JlcXVlc3QgPSBvYmplY3QgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIG9iamVjdFtJTlRFUk5BTFNdID09PSAnb2JqZWN0J1xuXHQpO1xufTtcblxuY29uc3QgZG9CYWREYXRhV2FybiA9IGRlcHJlY2F0ZSgoKSA9PiB7fSxcblx0Jy5kYXRhIGlzIG5vdCBhIHZhbGlkIFJlcXVlc3RJbml0IHByb3BlcnR5LCB1c2UgLmJvZHkgaW5zdGVhZCcsXG5cdCdodHRwczovL2dpdGh1Yi5jb20vbm9kZS1mZXRjaC9ub2RlLWZldGNoL2lzc3Vlcy8xMDAwIChyZXF1ZXN0KScpO1xuXG4vKipcbiAqIFJlcXVlc3QgY2xhc3NcbiAqXG4gKiBSZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXF1ZXN0LWNsYXNzXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dCAgVXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIE9iamVjdCAgaW5pdCAgIEN1c3RvbSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBCb2R5IHtcblx0Y29uc3RydWN0b3IoaW5wdXQsIGluaXQgPSB7fSkge1xuXHRcdGxldCBwYXJzZWRVUkw7XG5cblx0XHQvLyBOb3JtYWxpemUgaW5wdXQgYW5kIGZvcmNlIFVSTCB0byBiZSBlbmNvZGVkIGFzIFVURi04IChodHRwczovL2dpdGh1Yi5jb20vbm9kZS1mZXRjaC9ub2RlLWZldGNoL2lzc3Vlcy8yNDUpXG5cdFx0aWYgKGlzUmVxdWVzdChpbnB1dCkpIHtcblx0XHRcdHBhcnNlZFVSTCA9IG5ldyBVUkwoaW5wdXQudXJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyc2VkVVJMID0gbmV3IFVSTChpbnB1dCk7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblxuXHRcdGlmIChwYXJzZWRVUkwudXNlcm5hbWUgIT09ICcnIHx8IHBhcnNlZFVSTC5wYXNzd29yZCAhPT0gJycpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7cGFyc2VkVVJMfSBpcyBhbiB1cmwgd2l0aCBlbWJlZGRlZCBjcmVkZW50aWFscy5gKTtcblx0XHR9XG5cblx0XHRsZXQgbWV0aG9kID0gaW5pdC5tZXRob2QgfHwgaW5wdXQubWV0aG9kIHx8ICdHRVQnO1xuXHRcdGlmICgvXihkZWxldGV8Z2V0fGhlYWR8b3B0aW9uc3xwb3N0fHB1dCkkL2kudGVzdChtZXRob2QpKSB7XG5cdFx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cblx0XHRpZiAoIWlzUmVxdWVzdChpbml0KSAmJiAnZGF0YScgaW4gaW5pdCkge1xuXHRcdFx0ZG9CYWREYXRhV2FybigpO1xuXHRcdH1cblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLCBlcWVxZXFcblx0XHRpZiAoKGluaXQuYm9keSAhPSBudWxsIHx8IChpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwpKSAmJlxuXHRcdFx0KG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnSEVBRCcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdSZXF1ZXN0IHdpdGggR0VUL0hFQUQgbWV0aG9kIGNhbm5vdCBoYXZlIGJvZHknKTtcblx0XHR9XG5cblx0XHRjb25zdCBpbnB1dEJvZHkgPSBpbml0LmJvZHkgP1xuXHRcdFx0aW5pdC5ib2R5IDpcblx0XHRcdChpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwgP1xuXHRcdFx0XHRjbG9uZShpbnB1dCkgOlxuXHRcdFx0XHRudWxsKTtcblxuXHRcdHN1cGVyKGlucHV0Qm9keSwge1xuXHRcdFx0c2l6ZTogaW5pdC5zaXplIHx8IGlucHV0LnNpemUgfHwgMFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKGluaXQuaGVhZGVycyB8fCBpbnB1dC5oZWFkZXJzIHx8IHt9KTtcblxuXHRcdGlmIChpbnB1dEJvZHkgIT09IG51bGwgJiYgIWhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKSkge1xuXHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSBleHRyYWN0Q29udGVudFR5cGUoaW5wdXRCb2R5LCB0aGlzKTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBzaWduYWwgPSBpc1JlcXVlc3QoaW5wdXQpID9cblx0XHRcdGlucHV0LnNpZ25hbCA6XG5cdFx0XHRudWxsO1xuXHRcdGlmICgnc2lnbmFsJyBpbiBpbml0KSB7XG5cdFx0XHRzaWduYWwgPSBpbml0LnNpZ25hbDtcblx0XHR9XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCwgZXFlcWVxXG5cdFx0aWYgKHNpZ25hbCAhPSBudWxsICYmICFpc0Fib3J0U2lnbmFsKHNpZ25hbCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNpZ25hbCB0byBiZSBhbiBpbnN0YW5jZW9mIEFib3J0U2lnbmFsIG9yIEV2ZW50VGFyZ2V0Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gXHUwMEE3NS40LCBSZXF1ZXN0IGNvbnN0cnVjdG9yIHN0ZXBzLCBzdGVwIDE1LjFcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCwgZXFlcWVxXG5cdFx0bGV0IHJlZmVycmVyID0gaW5pdC5yZWZlcnJlciA9PSBudWxsID8gaW5wdXQucmVmZXJyZXIgOiBpbml0LnJlZmVycmVyO1xuXHRcdGlmIChyZWZlcnJlciA9PT0gJycpIHtcblx0XHRcdC8vIFx1MDBBNzUuNCwgUmVxdWVzdCBjb25zdHJ1Y3RvciBzdGVwcywgc3RlcCAxNS4yXG5cdFx0XHRyZWZlcnJlciA9ICduby1yZWZlcnJlcic7XG5cdFx0fSBlbHNlIGlmIChyZWZlcnJlcikge1xuXHRcdFx0Ly8gXHUwMEE3NS40LCBSZXF1ZXN0IGNvbnN0cnVjdG9yIHN0ZXBzLCBzdGVwIDE1LjMuMSwgMTUuMy4yXG5cdFx0XHRjb25zdCBwYXJzZWRSZWZlcnJlciA9IG5ldyBVUkwocmVmZXJyZXIpO1xuXHRcdFx0Ly8gXHUwMEE3NS40LCBSZXF1ZXN0IGNvbnN0cnVjdG9yIHN0ZXBzLCBzdGVwIDE1LjMuMywgMTUuMy40XG5cdFx0XHRyZWZlcnJlciA9IC9eYWJvdXQ6KFxcL1xcLyk/Y2xpZW50JC8udGVzdChwYXJzZWRSZWZlcnJlcikgPyAnY2xpZW50JyA6IHBhcnNlZFJlZmVycmVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWZlcnJlciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMU10gPSB7XG5cdFx0XHRtZXRob2QsXG5cdFx0XHRyZWRpcmVjdDogaW5pdC5yZWRpcmVjdCB8fCBpbnB1dC5yZWRpcmVjdCB8fCAnZm9sbG93Jyxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRwYXJzZWRVUkwsXG5cdFx0XHRzaWduYWwsXG5cdFx0XHRyZWZlcnJlclxuXHRcdH07XG5cblx0XHQvLyBOb2RlLWZldGNoLW9ubHkgb3B0aW9uc1xuXHRcdHRoaXMuZm9sbG93ID0gaW5pdC5mb2xsb3cgPT09IHVuZGVmaW5lZCA/IChpbnB1dC5mb2xsb3cgPT09IHVuZGVmaW5lZCA/IDIwIDogaW5wdXQuZm9sbG93KSA6IGluaXQuZm9sbG93O1xuXHRcdHRoaXMuY29tcHJlc3MgPSBpbml0LmNvbXByZXNzID09PSB1bmRlZmluZWQgPyAoaW5wdXQuY29tcHJlc3MgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5jb21wcmVzcykgOiBpbml0LmNvbXByZXNzO1xuXHRcdHRoaXMuY291bnRlciA9IGluaXQuY291bnRlciB8fCBpbnB1dC5jb3VudGVyIHx8IDA7XG5cdFx0dGhpcy5hZ2VudCA9IGluaXQuYWdlbnQgfHwgaW5wdXQuYWdlbnQ7XG5cdFx0dGhpcy5oaWdoV2F0ZXJNYXJrID0gaW5pdC5oaWdoV2F0ZXJNYXJrIHx8IGlucHV0LmhpZ2hXYXRlck1hcmsgfHwgMTYzODQ7XG5cdFx0dGhpcy5pbnNlY3VyZUhUVFBQYXJzZXIgPSBpbml0Lmluc2VjdXJlSFRUUFBhcnNlciB8fCBpbnB1dC5pbnNlY3VyZUhUVFBQYXJzZXIgfHwgZmFsc2U7XG5cblx0XHQvLyBcdTAwQTc1LjQsIFJlcXVlc3QgY29uc3RydWN0b3Igc3RlcHMsIHN0ZXAgMTYuXG5cdFx0Ly8gRGVmYXVsdCBpcyBlbXB0eSBzdHJpbmcgcGVyIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LXJlcXVlc3QtcmVmZXJyZXItcG9saWN5XG5cdFx0dGhpcy5yZWZlcnJlclBvbGljeSA9IGluaXQucmVmZXJyZXJQb2xpY3kgfHwgaW5wdXQucmVmZXJyZXJQb2xpY3kgfHwgJyc7XG5cdH1cblxuXHQvKiogQHJldHVybnMge3N0cmluZ30gKi9cblx0Z2V0IG1ldGhvZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLm1ldGhvZDtcblx0fVxuXG5cdC8qKiBAcmV0dXJucyB7c3RyaW5nfSAqL1xuXHRnZXQgdXJsKCkge1xuXHRcdHJldHVybiBmb3JtYXRVcmwodGhpc1tJTlRFUk5BTFNdLnBhcnNlZFVSTCk7XG5cdH1cblxuXHQvKiogQHJldHVybnMge0hlYWRlcnN9ICovXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uaGVhZGVycztcblx0fVxuXG5cdGdldCByZWRpcmVjdCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLnJlZGlyZWN0O1xuXHR9XG5cblx0LyoqIEByZXR1cm5zIHtBYm9ydFNpZ25hbH0gKi9cblx0Z2V0IHNpZ25hbCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLnNpZ25hbDtcblx0fVxuXG5cdC8vIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNkb20tcmVxdWVzdC1yZWZlcnJlclxuXHRnZXQgcmVmZXJyZXIoKSB7XG5cdFx0aWYgKHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlciA9PT0gJ25vLXJlZmVycmVyJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzW0lOVEVSTkFMU10ucmVmZXJyZXIgPT09ICdjbGllbnQnKSB7XG5cdFx0XHRyZXR1cm4gJ2Fib3V0OmNsaWVudCc7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlcikge1xuXHRcdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlci50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRnZXQgcmVmZXJyZXJQb2xpY3koKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlclBvbGljeTtcblx0fVxuXG5cdHNldCByZWZlcnJlclBvbGljeShyZWZlcnJlclBvbGljeSkge1xuXHRcdHRoaXNbSU5URVJOQUxTXS5yZWZlcnJlclBvbGljeSA9IHZhbGlkYXRlUmVmZXJyZXJQb2xpY3kocmVmZXJyZXJQb2xpY3kpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lIHRoaXMgcmVxdWVzdFxuXHQgKlxuXHQgKiBAcmV0dXJuICBSZXF1ZXN0XG5cdCAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlcXVlc3QodGhpcyk7XG5cdH1cblxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG5cdFx0cmV0dXJuICdSZXF1ZXN0Jztcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHRtZXRob2Q6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0dXJsOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGhlYWRlcnM6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0cmVkaXJlY3Q6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0Y2xvbmU6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0c2lnbmFsOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHJlZmVycmVyOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHJlZmVycmVyUG9saWN5OiB7ZW51bWVyYWJsZTogdHJ1ZX1cbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBSZXF1ZXN0IHRvIE5vZGUuanMgaHR0cCByZXF1ZXN0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0IC0gQSBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuIFRoZSBvcHRpb25zIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gaHR0cC5yZXF1ZXN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXROb2RlUmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0ID0+IHtcblx0Y29uc3Qge3BhcnNlZFVSTH0gPSByZXF1ZXN0W0lOVEVSTkFMU107XG5cdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXF1ZXN0W0lOVEVSTkFMU10uaGVhZGVycyk7XG5cblx0Ly8gRmV0Y2ggc3RlcCAxLjNcblx0aWYgKCFoZWFkZXJzLmhhcygnQWNjZXB0JykpIHtcblx0XHRoZWFkZXJzLnNldCgnQWNjZXB0JywgJyovKicpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXBzIDIuNC0yLjdcblx0bGV0IGNvbnRlbnRMZW5ndGhWYWx1ZSA9IG51bGw7XG5cdGlmIChyZXF1ZXN0LmJvZHkgPT09IG51bGwgJiYgL14ocG9zdHxwdXQpJC9pLnRlc3QocmVxdWVzdC5tZXRob2QpKSB7XG5cdFx0Y29udGVudExlbmd0aFZhbHVlID0gJzAnO1xuXHR9XG5cblx0aWYgKHJlcXVlc3QuYm9keSAhPT0gbnVsbCkge1xuXHRcdGNvbnN0IHRvdGFsQnl0ZXMgPSBnZXRUb3RhbEJ5dGVzKHJlcXVlc3QpO1xuXHRcdC8vIFNldCBDb250ZW50LUxlbmd0aCBpZiB0b3RhbEJ5dGVzIGlzIGEgbnVtYmVyICh0aGF0IGlzIG5vdCBOYU4pXG5cdFx0aWYgKHR5cGVvZiB0b3RhbEJ5dGVzID09PSAnbnVtYmVyJyAmJiAhTnVtYmVyLmlzTmFOKHRvdGFsQnl0ZXMpKSB7XG5cdFx0XHRjb250ZW50TGVuZ3RoVmFsdWUgPSBTdHJpbmcodG90YWxCeXRlcyk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGNvbnRlbnRMZW5ndGhWYWx1ZSkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb250ZW50LUxlbmd0aCcsIGNvbnRlbnRMZW5ndGhWYWx1ZSk7XG5cdH1cblxuXHQvLyA0LjEuIE1haW4gZmV0Y2gsIHN0ZXAgMi42XG5cdC8vID4gSWYgcmVxdWVzdCdzIHJlZmVycmVyIHBvbGljeSBpcyB0aGUgZW1wdHkgc3RyaW5nLCB0aGVuIHNldCByZXF1ZXN0J3MgcmVmZXJyZXIgcG9saWN5IHRvIHRoZVxuXHQvLyA+IGRlZmF1bHQgcmVmZXJyZXIgcG9saWN5LlxuXHRpZiAocmVxdWVzdC5yZWZlcnJlclBvbGljeSA9PT0gJycpIHtcblx0XHRyZXF1ZXN0LnJlZmVycmVyUG9saWN5ID0gREVGQVVMVF9SRUZFUlJFUl9QT0xJQ1k7XG5cdH1cblxuXHQvLyA0LjEuIE1haW4gZmV0Y2gsIHN0ZXAgMi43XG5cdC8vID4gSWYgcmVxdWVzdCdzIHJlZmVycmVyIGlzIG5vdCBcIm5vLXJlZmVycmVyXCIsIHNldCByZXF1ZXN0J3MgcmVmZXJyZXIgdG8gdGhlIHJlc3VsdCBvZiBpbnZva2luZ1xuXHQvLyA+IGRldGVybWluZSByZXF1ZXN0J3MgcmVmZXJyZXIuXG5cdGlmIChyZXF1ZXN0LnJlZmVycmVyICYmIHJlcXVlc3QucmVmZXJyZXIgIT09ICduby1yZWZlcnJlcicpIHtcblx0XHRyZXF1ZXN0W0lOVEVSTkFMU10ucmVmZXJyZXIgPSBkZXRlcm1pbmVSZXF1ZXN0c1JlZmVycmVyKHJlcXVlc3QpO1xuXHR9IGVsc2Uge1xuXHRcdHJlcXVlc3RbSU5URVJOQUxTXS5yZWZlcnJlciA9ICduby1yZWZlcnJlcic7XG5cdH1cblxuXHQvLyA0LjUuIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCwgc3RlcCA2Ljlcblx0Ly8gPiBJZiBodHRwUmVxdWVzdCdzIHJlZmVycmVyIGlzIGEgVVJMLCB0aGVuIGFwcGVuZCBgUmVmZXJlcmAvaHR0cFJlcXVlc3QncyByZWZlcnJlciwgc2VyaWFsaXplZFxuXHQvLyA+ICBhbmQgaXNvbW9ycGhpYyBlbmNvZGVkLCB0byBodHRwUmVxdWVzdCdzIGhlYWRlciBsaXN0LlxuXHRpZiAocmVxdWVzdFtJTlRFUk5BTFNdLnJlZmVycmVyIGluc3RhbmNlb2YgVVJMKSB7XG5cdFx0aGVhZGVycy5zZXQoJ1JlZmVyZXInLCByZXF1ZXN0LnJlZmVycmVyKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwIDIuMTFcblx0aWYgKCFoZWFkZXJzLmhhcygnVXNlci1BZ2VudCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnbm9kZS1mZXRjaCcpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xNVxuXHRpZiAocmVxdWVzdC5jb21wcmVzcyAmJiAhaGVhZGVycy5oYXMoJ0FjY2VwdC1FbmNvZGluZycpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdC1FbmNvZGluZycsICdnemlwLCBkZWZsYXRlLCBicicpO1xuXHR9XG5cblx0bGV0IHthZ2VudH0gPSByZXF1ZXN0O1xuXHRpZiAodHlwZW9mIGFnZW50ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0YWdlbnQgPSBhZ2VudChwYXJzZWRVUkwpO1xuXHR9XG5cblx0aWYgKCFoZWFkZXJzLmhhcygnQ29ubmVjdGlvbicpICYmICFhZ2VudCkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb25uZWN0aW9uJywgJ2Nsb3NlJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCA0LjJcblx0Ly8gY2h1bmtlZCBlbmNvZGluZyBpcyBoYW5kbGVkIGJ5IE5vZGUuanNcblxuXHRjb25zdCBzZWFyY2ggPSBnZXRTZWFyY2gocGFyc2VkVVJMKTtcblxuXHQvLyBQYXNzIHRoZSBmdWxsIFVSTCBkaXJlY3RseSB0byByZXF1ZXN0KCksIGJ1dCBvdmVyd3JpdGUgdGhlIGZvbGxvd2luZ1xuXHQvLyBvcHRpb25zOlxuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdC8vIE92ZXJ3cml0ZSBzZWFyY2ggdG8gcmV0YWluIHRyYWlsaW5nID8gKGlzc3VlICM3NzYpXG5cdFx0cGF0aDogcGFyc2VkVVJMLnBhdGhuYW1lICsgc2VhcmNoLFxuXHRcdC8vIFRoZSBmb2xsb3dpbmcgb3B0aW9ucyBhcmUgbm90IGV4cHJlc3NlZCBpbiB0aGUgVVJMXG5cdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRoZWFkZXJzOiBoZWFkZXJzW1N5bWJvbC5mb3IoJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJyldKCksXG5cdFx0aW5zZWN1cmVIVFRQUGFyc2VyOiByZXF1ZXN0Lmluc2VjdXJlSFRUUFBhcnNlcixcblx0XHRhZ2VudFxuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0LyoqIEB0eXBlIHtVUkx9ICovXG5cdFx0cGFyc2VkVVJMLFxuXHRcdG9wdGlvbnNcblx0fTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGdldFNlYXJjaCA9IHBhcnNlZFVSTCA9PiB7XG5cdGlmIChwYXJzZWRVUkwuc2VhcmNoKSB7XG5cdFx0cmV0dXJuIHBhcnNlZFVSTC5zZWFyY2g7XG5cdH1cblxuXHRjb25zdCBsYXN0T2Zmc2V0ID0gcGFyc2VkVVJMLmhyZWYubGVuZ3RoIC0gMTtcblx0Y29uc3QgaGFzaCA9IHBhcnNlZFVSTC5oYXNoIHx8IChwYXJzZWRVUkwuaHJlZltsYXN0T2Zmc2V0XSA9PT0gJyMnID8gJyMnIDogJycpO1xuXHRyZXR1cm4gcGFyc2VkVVJMLmhyZWZbbGFzdE9mZnNldCAtIGhhc2gubGVuZ3RoXSA9PT0gJz8nID8gJz8nIDogJyc7XG59O1xuIiwgImltcG9ydCB7aXNJUH0gZnJvbSAnbm9kZTpuZXQnO1xuXG4vKipcbiAqIEBleHRlcm5hbCBVUkxcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkx8VVJMfVxuICovXG5cbi8qKlxuICogQG1vZHVsZSB1dGlscy9yZWZlcnJlclxuICogQHByaXZhdGVcbiAqL1xuXG4vKipcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJhcHBzZWMtcmVmZXJyZXItcG9saWN5LyNzdHJpcC11cmx8UmVmZXJyZXIgUG9saWN5IFx1MDBBNzguNC4gU3RyaXAgdXJsIGZvciB1c2UgYXMgYSByZWZlcnJlcn1cbiAqIEBwYXJhbSB7c3RyaW5nfSBVUkxcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29yaWdpbk9ubHk9ZmFsc2VdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcFVSTEZvclVzZUFzQVJlZmVycmVyKHVybCwgb3JpZ2luT25seSA9IGZhbHNlKSB7XG5cdC8vIDEuIElmIHVybCBpcyBudWxsLCByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdGlmICh1cmwgPT0gbnVsbCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVxLW51bGwsIGVxZXFlcVxuXHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHR9XG5cblx0dXJsID0gbmV3IFVSTCh1cmwpO1xuXG5cdC8vIDIuIElmIHVybCdzIHNjaGVtZSBpcyBhIGxvY2FsIHNjaGVtZSwgdGhlbiByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdGlmICgvXihhYm91dHxibG9ifGRhdGEpOiQvLnRlc3QodXJsLnByb3RvY29sKSkge1xuXHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHR9XG5cblx0Ly8gMy4gU2V0IHVybCdzIHVzZXJuYW1lIHRvIHRoZSBlbXB0eSBzdHJpbmcuXG5cdHVybC51c2VybmFtZSA9ICcnO1xuXG5cdC8vIDQuIFNldCB1cmwncyBwYXNzd29yZCB0byBudWxsLlxuXHQvLyBOb3RlOiBgbnVsbGAgYXBwZWFycyB0byBiZSBhIG1pc3Rha2UgYXMgdGhpcyBhY3R1YWxseSByZXN1bHRzIGluIHRoZSBwYXNzd29yZCBiZWluZyBgXCJudWxsXCJgLlxuXHR1cmwucGFzc3dvcmQgPSAnJztcblxuXHQvLyA1LiBTZXQgdXJsJ3MgZnJhZ21lbnQgdG8gbnVsbC5cblx0Ly8gTm90ZTogYG51bGxgIGFwcGVhcnMgdG8gYmUgYSBtaXN0YWtlIGFzIHRoaXMgYWN0dWFsbHkgcmVzdWx0cyBpbiB0aGUgZnJhZ21lbnQgYmVpbmcgYFwiI251bGxcImAuXG5cdHVybC5oYXNoID0gJyc7XG5cblx0Ly8gNi4gSWYgdGhlIG9yaWdpbi1vbmx5IGZsYWcgaXMgdHJ1ZSwgdGhlbjpcblx0aWYgKG9yaWdpbk9ubHkpIHtcblx0XHQvLyA2LjEuIFNldCB1cmwncyBwYXRoIHRvIG51bGwuXG5cdFx0Ly8gTm90ZTogYG51bGxgIGFwcGVhcnMgdG8gYmUgYSBtaXN0YWtlIGFzIHRoaXMgYWN0dWFsbHkgcmVzdWx0cyBpbiB0aGUgcGF0aCBiZWluZyBgXCIvbnVsbFwiYC5cblx0XHR1cmwucGF0aG5hbWUgPSAnJztcblxuXHRcdC8vIDYuMi4gU2V0IHVybCdzIHF1ZXJ5IHRvIG51bGwuXG5cdFx0Ly8gTm90ZTogYG51bGxgIGFwcGVhcnMgdG8gYmUgYSBtaXN0YWtlIGFzIHRoaXMgYWN0dWFsbHkgcmVzdWx0cyBpbiB0aGUgcXVlcnkgYmVpbmcgYFwiP251bGxcImAuXG5cdFx0dXJsLnNlYXJjaCA9ICcnO1xuXHR9XG5cblx0Ly8gNy4gUmV0dXJuIHVybC5cblx0cmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjLXJlZmVycmVyLXBvbGljeS8jZW51bWRlZi1yZWZlcnJlcnBvbGljeXxlbnVtIFJlZmVycmVyUG9saWN5fVxuICovXG5leHBvcnQgY29uc3QgUmVmZXJyZXJQb2xpY3kgPSBuZXcgU2V0KFtcblx0JycsXG5cdCduby1yZWZlcnJlcicsXG5cdCduby1yZWZlcnJlci13aGVuLWRvd25ncmFkZScsXG5cdCdzYW1lLW9yaWdpbicsXG5cdCdvcmlnaW4nLFxuXHQnc3RyaWN0LW9yaWdpbicsXG5cdCdvcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nLFxuXHQnc3RyaWN0LW9yaWdpbi13aGVuLWNyb3NzLW9yaWdpbicsXG5cdCd1bnNhZmUtdXJsJ1xuXSk7XG5cbi8qKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmFwcHNlYy1yZWZlcnJlci1wb2xpY3kvI2RlZmF1bHQtcmVmZXJyZXItcG9saWN5fGRlZmF1bHQgcmVmZXJyZXIgcG9saWN5fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9SRUZFUlJFUl9QT0xJQ1kgPSAnc3RyaWN0LW9yaWdpbi13aGVuLWNyb3NzLW9yaWdpbic7XG5cbi8qKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmFwcHNlYy1yZWZlcnJlci1wb2xpY3kvI3JlZmVycmVyLXBvbGljaWVzfFJlZmVycmVyIFBvbGljeSBcdTAwQTczLiBSZWZlcnJlciBQb2xpY2llc31cbiAqIEBwYXJhbSB7c3RyaW5nfSByZWZlcnJlclBvbGljeVxuICogQHJldHVybnMge3N0cmluZ30gcmVmZXJyZXJQb2xpY3lcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUmVmZXJyZXJQb2xpY3kocmVmZXJyZXJQb2xpY3kpIHtcblx0aWYgKCFSZWZlcnJlclBvbGljeS5oYXMocmVmZXJyZXJQb2xpY3kpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCByZWZlcnJlclBvbGljeTogJHtyZWZlcnJlclBvbGljeX1gKTtcblx0fVxuXG5cdHJldHVybiByZWZlcnJlclBvbGljeTtcbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjLXNlY3VyZS1jb250ZXh0cy8jaXMtb3JpZ2luLXRydXN0d29ydGh5fFJlZmVycmVyIFBvbGljeSBcdTAwQTczLjIuIElzIG9yaWdpbiBwb3RlbnRpYWxseSB0cnVzdHdvcnRoeT99XG4gKiBAcGFyYW0ge2V4dGVybmFsOlVSTH0gdXJsXG4gKiBAcmV0dXJucyBgdHJ1ZWA6IFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIiwgYGZhbHNlYDogXCJOb3QgVHJ1c3R3b3J0aHlcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPcmlnaW5Qb3RlbnRpYWxseVRydXN0d29ydGh5KHVybCkge1xuXHQvLyAxLiBJZiBvcmlnaW4gaXMgYW4gb3BhcXVlIG9yaWdpbiwgcmV0dXJuIFwiTm90IFRydXN0d29ydGh5XCIuXG5cdC8vIE5vdCBhcHBsaWNhYmxlXG5cblx0Ly8gMi4gQXNzZXJ0OiBvcmlnaW4gaXMgYSB0dXBsZSBvcmlnaW4uXG5cdC8vIE5vdCBmb3IgaW1wbGVtZW50YXRpb25zXG5cblx0Ly8gMy4gSWYgb3JpZ2luJ3Mgc2NoZW1lIGlzIGVpdGhlciBcImh0dHBzXCIgb3IgXCJ3c3NcIiwgcmV0dXJuIFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIi5cblx0aWYgKC9eKGh0dHB8d3MpczokLy50ZXN0KHVybC5wcm90b2NvbCkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIDQuIElmIG9yaWdpbidzIGhvc3QgY29tcG9uZW50IG1hdGNoZXMgb25lIG9mIHRoZSBDSURSIG5vdGF0aW9ucyAxMjcuMC4wLjAvOCBvciA6OjEvMTI4IFtSRkM0NjMyXSwgcmV0dXJuIFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIi5cblx0Y29uc3QgaG9zdElwID0gdXJsLmhvc3QucmVwbGFjZSgvKF5cXFspfChdJCkvZywgJycpO1xuXHRjb25zdCBob3N0SVBWZXJzaW9uID0gaXNJUChob3N0SXApO1xuXG5cdGlmIChob3N0SVBWZXJzaW9uID09PSA0ICYmIC9eMTI3XFwuLy50ZXN0KGhvc3RJcCkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlmIChob3N0SVBWZXJzaW9uID09PSA2ICYmIC9eKCgoMCs6KXs3fSl8KDo6KDArOil7MCw2fSkpMCoxJC8udGVzdChob3N0SXApKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyA1LiBJZiBvcmlnaW4ncyBob3N0IGNvbXBvbmVudCBpcyBcImxvY2FsaG9zdFwiIG9yIGZhbGxzIHdpdGhpbiBcIi5sb2NhbGhvc3RcIiwgYW5kIHRoZSB1c2VyIGFnZW50IGNvbmZvcm1zIHRvIHRoZSBuYW1lIHJlc29sdXRpb24gcnVsZXMgaW4gW2xldC1sb2NhbGhvc3QtYmUtbG9jYWxob3N0XSwgcmV0dXJuIFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIi5cblx0Ly8gV2UgYXJlIHJldHVybmluZyBGQUxTRSBoZXJlIGJlY2F1c2Ugd2UgY2Fubm90IGVuc3VyZSBjb25mb3JtYW5jZSB0b1xuXHQvLyBsZXQtbG9jYWxob3N0LWJlLWxvYWxob3N0IChodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtd2VzdC1sZXQtbG9jYWxob3N0LWJlLWxvY2FsaG9zdClcblx0aWYgKHVybC5ob3N0ID09PSAnbG9jYWxob3N0JyB8fCB1cmwuaG9zdC5lbmRzV2l0aCgnLmxvY2FsaG9zdCcpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gNi4gSWYgb3JpZ2luJ3Mgc2NoZW1lIGNvbXBvbmVudCBpcyBmaWxlLCByZXR1cm4gXCJQb3RlbnRpYWxseSBUcnVzdHdvcnRoeVwiLlxuXHRpZiAodXJsLnByb3RvY29sID09PSAnZmlsZTonKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyA3LiBJZiBvcmlnaW4ncyBzY2hlbWUgY29tcG9uZW50IGlzIG9uZSB3aGljaCB0aGUgdXNlciBhZ2VudCBjb25zaWRlcnMgdG8gYmUgYXV0aGVudGljYXRlZCwgcmV0dXJuIFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIi5cblx0Ly8gTm90IHN1cHBvcnRlZFxuXG5cdC8vIDguIElmIG9yaWdpbiBoYXMgYmVlbiBjb25maWd1cmVkIGFzIGEgdHJ1c3R3b3J0aHkgb3JpZ2luLCByZXR1cm4gXCJQb3RlbnRpYWxseSBUcnVzdHdvcnRoeVwiLlxuXHQvLyBOb3Qgc3VwcG9ydGVkXG5cblx0Ly8gOS4gUmV0dXJuIFwiTm90IFRydXN0d29ydGh5XCIuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjLXNlY3VyZS1jb250ZXh0cy8jaXMtdXJsLXRydXN0d29ydGh5fFJlZmVycmVyIFBvbGljeSBcdTAwQTczLjMuIElzIHVybCBwb3RlbnRpYWxseSB0cnVzdHdvcnRoeT99XG4gKiBAcGFyYW0ge2V4dGVybmFsOlVSTH0gdXJsXG4gKiBAcmV0dXJucyBgdHJ1ZWA6IFwiUG90ZW50aWFsbHkgVHJ1c3R3b3J0aHlcIiwgYGZhbHNlYDogXCJOb3QgVHJ1c3R3b3J0aHlcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KHVybCkge1xuXHQvLyAxLiBJZiB1cmwgaXMgXCJhYm91dDpibGFua1wiIG9yIFwiYWJvdXQ6c3JjZG9jXCIsIHJldHVybiBcIlBvdGVudGlhbGx5IFRydXN0d29ydGh5XCIuXG5cdGlmICgvXmFib3V0OihibGFua3xzcmNkb2MpJC8udGVzdCh1cmwpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyAyLiBJZiB1cmwncyBzY2hlbWUgaXMgXCJkYXRhXCIsIHJldHVybiBcIlBvdGVudGlhbGx5IFRydXN0d29ydGh5XCIuXG5cdGlmICh1cmwucHJvdG9jb2wgPT09ICdkYXRhOicpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIE5vdGU6IFRoZSBvcmlnaW4gb2YgYmxvYjogYW5kIGZpbGVzeXN0ZW06IFVSTHMgaXMgdGhlIG9yaWdpbiBvZiB0aGUgY29udGV4dCBpbiB3aGljaCB0aGV5IHdlcmVcblx0Ly8gY3JlYXRlZC4gVGhlcmVmb3JlLCBibG9icyBjcmVhdGVkIGluIGEgdHJ1c3R3b3J0aHkgb3JpZ2luIHdpbGwgdGhlbXNlbHZlcyBiZSBwb3RlbnRpYWxseVxuXHQvLyB0cnVzdHdvcnRoeS5cblx0aWYgKC9eKGJsb2J8ZmlsZXN5c3RlbSk6JC8udGVzdCh1cmwucHJvdG9jb2wpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyAzLiBSZXR1cm4gdGhlIHJlc3VsdCBvZiBleGVjdXRpbmcgXHUwMEE3My4yIElzIG9yaWdpbiBwb3RlbnRpYWxseSB0cnVzdHdvcnRoeT8gb24gdXJsJ3Mgb3JpZ2luLlxuXHRyZXR1cm4gaXNPcmlnaW5Qb3RlbnRpYWxseVRydXN0d29ydGh5KHVybCk7XG59XG5cbi8qKlxuICogTW9kaWZpZXMgdGhlIHJlZmVycmVyVVJMIHRvIGVuZm9yY2UgYW55IGV4dHJhIHNlY3VyaXR5IHBvbGljeSBjb25zaWRlcmF0aW9ucy5cbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJhcHBzZWMtcmVmZXJyZXItcG9saWN5LyNkZXRlcm1pbmUtcmVxdWVzdHMtcmVmZXJyZXJ8UmVmZXJyZXIgUG9saWN5IFx1MDBBNzguMy4gRGV0ZXJtaW5lIHJlcXVlc3QncyBSZWZlcnJlcn0sIHN0ZXAgN1xuICogQGNhbGxiYWNrIG1vZHVsZTp1dGlscy9yZWZlcnJlcn5yZWZlcnJlclVSTENhbGxiYWNrXG4gKiBAcGFyYW0ge2V4dGVybmFsOlVSTH0gcmVmZXJyZXJVUkxcbiAqIEByZXR1cm5zIHtleHRlcm5hbDpVUkx9IG1vZGlmaWVkIHJlZmVycmVyVVJMXG4gKi9cblxuLyoqXG4gKiBNb2RpZmllcyB0aGUgcmVmZXJyZXJPcmlnaW4gdG8gZW5mb3JjZSBhbnkgZXh0cmEgc2VjdXJpdHkgcG9saWN5IGNvbnNpZGVyYXRpb25zLlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmFwcHNlYy1yZWZlcnJlci1wb2xpY3kvI2RldGVybWluZS1yZXF1ZXN0cy1yZWZlcnJlcnxSZWZlcnJlciBQb2xpY3kgXHUwMEE3OC4zLiBEZXRlcm1pbmUgcmVxdWVzdCdzIFJlZmVycmVyfSwgc3RlcCA3XG4gKiBAY2FsbGJhY2sgbW9kdWxlOnV0aWxzL3JlZmVycmVyfnJlZmVycmVyT3JpZ2luQ2FsbGJhY2tcbiAqIEBwYXJhbSB7ZXh0ZXJuYWw6VVJMfSByZWZlcnJlck9yaWdpblxuICogQHJldHVybnMge2V4dGVybmFsOlVSTH0gbW9kaWZpZWQgcmVmZXJyZXJPcmlnaW5cbiAqL1xuXG4vKipcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJhcHBzZWMtcmVmZXJyZXItcG9saWN5LyNkZXRlcm1pbmUtcmVxdWVzdHMtcmVmZXJyZXJ8UmVmZXJyZXIgUG9saWN5IFx1MDBBNzguMy4gRGV0ZXJtaW5lIHJlcXVlc3QncyBSZWZlcnJlcn1cbiAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxdWVzdFxuICogQHBhcmFtIHtvYmplY3R9IG9cbiAqIEBwYXJhbSB7bW9kdWxlOnV0aWxzL3JlZmVycmVyfnJlZmVycmVyVVJMQ2FsbGJhY2t9IG8ucmVmZXJyZXJVUkxDYWxsYmFja1xuICogQHBhcmFtIHttb2R1bGU6dXRpbHMvcmVmZXJyZXJ+cmVmZXJyZXJPcmlnaW5DYWxsYmFja30gby5yZWZlcnJlck9yaWdpbkNhbGxiYWNrXG4gKiBAcmV0dXJucyB7ZXh0ZXJuYWw6VVJMfSBSZXF1ZXN0J3MgcmVmZXJyZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluZVJlcXVlc3RzUmVmZXJyZXIocmVxdWVzdCwge3JlZmVycmVyVVJMQ2FsbGJhY2ssIHJlZmVycmVyT3JpZ2luQ2FsbGJhY2t9ID0ge30pIHtcblx0Ly8gVGhlcmUgYXJlIDIgbm90ZXMgaW4gdGhlIHNwZWNpZmljYXRpb24gYWJvdXQgaW52YWxpZCBwcmUtY29uZGl0aW9ucy4gIFdlIHJldHVybiBudWxsLCBoZXJlLCBmb3Jcblx0Ly8gdGhlc2UgY2FzZXM6XG5cdC8vID4gTm90ZTogSWYgcmVxdWVzdCdzIHJlZmVycmVyIGlzIFwibm8tcmVmZXJyZXJcIiwgRmV0Y2ggd2lsbCBub3QgY2FsbCBpbnRvIHRoaXMgYWxnb3JpdGhtLlxuXHQvLyA+IE5vdGU6IElmIHJlcXVlc3QncyByZWZlcnJlciBwb2xpY3kgaXMgdGhlIGVtcHR5IHN0cmluZywgRmV0Y2ggd2lsbCBub3QgY2FsbCBpbnRvIHRoaXNcblx0Ly8gPiBhbGdvcml0aG0uXG5cdGlmIChyZXF1ZXN0LnJlZmVycmVyID09PSAnbm8tcmVmZXJyZXInIHx8IHJlcXVlc3QucmVmZXJyZXJQb2xpY3kgPT09ICcnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyAxLiBMZXQgcG9saWN5IGJlIHJlcXVlc3QncyBhc3NvY2lhdGVkIHJlZmVycmVyIHBvbGljeS5cblx0Y29uc3QgcG9saWN5ID0gcmVxdWVzdC5yZWZlcnJlclBvbGljeTtcblxuXHQvLyAyLiBMZXQgZW52aXJvbm1lbnQgYmUgcmVxdWVzdCdzIGNsaWVudC5cblx0Ly8gbm90IGFwcGxpY2FibGUgdG8gbm9kZS5qc1xuXG5cdC8vIDMuIFN3aXRjaCBvbiByZXF1ZXN0J3MgcmVmZXJyZXI6XG5cdGlmIChyZXF1ZXN0LnJlZmVycmVyID09PSAnYWJvdXQ6Y2xpZW50Jykge1xuXHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHR9XG5cblx0Ly8gXCJhIFVSTFwiOiBMZXQgcmVmZXJyZXJTb3VyY2UgYmUgcmVxdWVzdCdzIHJlZmVycmVyLlxuXHRjb25zdCByZWZlcnJlclNvdXJjZSA9IHJlcXVlc3QucmVmZXJyZXI7XG5cblx0Ly8gNC4gTGV0IHJlcXVlc3QncyByZWZlcnJlclVSTCBiZSB0aGUgcmVzdWx0IG9mIHN0cmlwcGluZyByZWZlcnJlclNvdXJjZSBmb3IgdXNlIGFzIGEgcmVmZXJyZXIuXG5cdGxldCByZWZlcnJlclVSTCA9IHN0cmlwVVJMRm9yVXNlQXNBUmVmZXJyZXIocmVmZXJyZXJTb3VyY2UpO1xuXG5cdC8vIDUuIExldCByZWZlcnJlck9yaWdpbiBiZSB0aGUgcmVzdWx0IG9mIHN0cmlwcGluZyByZWZlcnJlclNvdXJjZSBmb3IgdXNlIGFzIGEgcmVmZXJyZXIsIHdpdGggdGhlXG5cdC8vICAgIG9yaWdpbi1vbmx5IGZsYWcgc2V0IHRvIHRydWUuXG5cdGxldCByZWZlcnJlck9yaWdpbiA9IHN0cmlwVVJMRm9yVXNlQXNBUmVmZXJyZXIocmVmZXJyZXJTb3VyY2UsIHRydWUpO1xuXG5cdC8vIDYuIElmIHRoZSByZXN1bHQgb2Ygc2VyaWFsaXppbmcgcmVmZXJyZXJVUkwgaXMgYSBzdHJpbmcgd2hvc2UgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiA0MDk2LCBzZXRcblx0Ly8gICAgcmVmZXJyZXJVUkwgdG8gcmVmZXJyZXJPcmlnaW4uXG5cdGlmIChyZWZlcnJlclVSTC50b1N0cmluZygpLmxlbmd0aCA+IDQwOTYpIHtcblx0XHRyZWZlcnJlclVSTCA9IHJlZmVycmVyT3JpZ2luO1xuXHR9XG5cblx0Ly8gNy4gVGhlIHVzZXIgYWdlbnQgTUFZIGFsdGVyIHJlZmVycmVyVVJMIG9yIHJlZmVycmVyT3JpZ2luIGF0IHRoaXMgcG9pbnQgdG8gZW5mb3JjZSBhcmJpdHJhcnlcblx0Ly8gICAgcG9saWN5IGNvbnNpZGVyYXRpb25zIGluIHRoZSBpbnRlcmVzdHMgb2YgbWluaW1pemluZyBkYXRhIGxlYWthZ2UuIEZvciBleGFtcGxlLCB0aGUgdXNlclxuXHQvLyAgICBhZ2VudCBjb3VsZCBzdHJpcCB0aGUgVVJMIGRvd24gdG8gYW4gb3JpZ2luLCBtb2RpZnkgaXRzIGhvc3QsIHJlcGxhY2UgaXQgd2l0aCBhbiBlbXB0eVxuXHQvLyAgICBzdHJpbmcsIGV0Yy5cblx0aWYgKHJlZmVycmVyVVJMQ2FsbGJhY2spIHtcblx0XHRyZWZlcnJlclVSTCA9IHJlZmVycmVyVVJMQ2FsbGJhY2socmVmZXJyZXJVUkwpO1xuXHR9XG5cblx0aWYgKHJlZmVycmVyT3JpZ2luQ2FsbGJhY2spIHtcblx0XHRyZWZlcnJlck9yaWdpbiA9IHJlZmVycmVyT3JpZ2luQ2FsbGJhY2socmVmZXJyZXJPcmlnaW4pO1xuXHR9XG5cblx0Ly8gOC5FeGVjdXRlIHRoZSBzdGF0ZW1lbnRzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHZhbHVlIG9mIHBvbGljeTpcblx0Y29uc3QgY3VycmVudFVSTCA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xuXG5cdHN3aXRjaCAocG9saWN5KSB7XG5cdFx0Y2FzZSAnbm8tcmVmZXJyZXInOlxuXHRcdFx0cmV0dXJuICduby1yZWZlcnJlcic7XG5cblx0XHRjYXNlICdvcmlnaW4nOlxuXHRcdFx0cmV0dXJuIHJlZmVycmVyT3JpZ2luO1xuXG5cdFx0Y2FzZSAndW5zYWZlLXVybCc6XG5cdFx0XHRyZXR1cm4gcmVmZXJyZXJVUkw7XG5cblx0XHRjYXNlICdzdHJpY3Qtb3JpZ2luJzpcblx0XHRcdC8vIDEuIElmIHJlZmVycmVyVVJMIGlzIGEgcG90ZW50aWFsbHkgdHJ1c3R3b3J0aHkgVVJMIGFuZCByZXF1ZXN0J3MgY3VycmVudCBVUkwgaXMgbm90IGFcblx0XHRcdC8vICAgIHBvdGVudGlhbGx5IHRydXN0d29ydGh5IFVSTCwgdGhlbiByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdFx0XHRpZiAoaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KHJlZmVycmVyVVJMKSAmJiAhaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KGN1cnJlbnRVUkwpKSB7XG5cdFx0XHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAyLiBSZXR1cm4gcmVmZXJyZXJPcmlnaW4uXG5cdFx0XHRyZXR1cm4gcmVmZXJyZXJPcmlnaW4udG9TdHJpbmcoKTtcblxuXHRcdGNhc2UgJ3N0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nOlxuXHRcdFx0Ly8gMS4gSWYgdGhlIG9yaWdpbiBvZiByZWZlcnJlclVSTCBhbmQgdGhlIG9yaWdpbiBvZiByZXF1ZXN0J3MgY3VycmVudCBVUkwgYXJlIHRoZSBzYW1lLCB0aGVuXG5cdFx0XHQvLyAgICByZXR1cm4gcmVmZXJyZXJVUkwuXG5cdFx0XHRpZiAocmVmZXJyZXJVUkwub3JpZ2luID09PSBjdXJyZW50VVJMLm9yaWdpbikge1xuXHRcdFx0XHRyZXR1cm4gcmVmZXJyZXJVUkw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIDIuIElmIHJlZmVycmVyVVJMIGlzIGEgcG90ZW50aWFsbHkgdHJ1c3R3b3J0aHkgVVJMIGFuZCByZXF1ZXN0J3MgY3VycmVudCBVUkwgaXMgbm90IGFcblx0XHRcdC8vICAgIHBvdGVudGlhbGx5IHRydXN0d29ydGh5IFVSTCwgdGhlbiByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdFx0XHRpZiAoaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KHJlZmVycmVyVVJMKSAmJiAhaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KGN1cnJlbnRVUkwpKSB7XG5cdFx0XHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAzLiBSZXR1cm4gcmVmZXJyZXJPcmlnaW4uXG5cdFx0XHRyZXR1cm4gcmVmZXJyZXJPcmlnaW47XG5cblx0XHRjYXNlICdzYW1lLW9yaWdpbic6XG5cdFx0XHQvLyAxLiBJZiB0aGUgb3JpZ2luIG9mIHJlZmVycmVyVVJMIGFuZCB0aGUgb3JpZ2luIG9mIHJlcXVlc3QncyBjdXJyZW50IFVSTCBhcmUgdGhlIHNhbWUsIHRoZW5cblx0XHRcdC8vICAgIHJldHVybiByZWZlcnJlclVSTC5cblx0XHRcdGlmIChyZWZlcnJlclVSTC5vcmlnaW4gPT09IGN1cnJlbnRVUkwub3JpZ2luKSB7XG5cdFx0XHRcdHJldHVybiByZWZlcnJlclVSTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gMi4gUmV0dXJuIG5vIHJlZmVycmVyLlxuXHRcdFx0cmV0dXJuICduby1yZWZlcnJlcic7XG5cblx0XHRjYXNlICdvcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nOlxuXHRcdFx0Ly8gMS4gSWYgdGhlIG9yaWdpbiBvZiByZWZlcnJlclVSTCBhbmQgdGhlIG9yaWdpbiBvZiByZXF1ZXN0J3MgY3VycmVudCBVUkwgYXJlIHRoZSBzYW1lLCB0aGVuXG5cdFx0XHQvLyAgICByZXR1cm4gcmVmZXJyZXJVUkwuXG5cdFx0XHRpZiAocmVmZXJyZXJVUkwub3JpZ2luID09PSBjdXJyZW50VVJMLm9yaWdpbikge1xuXHRcdFx0XHRyZXR1cm4gcmVmZXJyZXJVUkw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiByZWZlcnJlck9yaWdpbi5cblx0XHRcdHJldHVybiByZWZlcnJlck9yaWdpbjtcblxuXHRcdGNhc2UgJ25vLXJlZmVycmVyLXdoZW4tZG93bmdyYWRlJzpcblx0XHRcdC8vIDEuIElmIHJlZmVycmVyVVJMIGlzIGEgcG90ZW50aWFsbHkgdHJ1c3R3b3J0aHkgVVJMIGFuZCByZXF1ZXN0J3MgY3VycmVudCBVUkwgaXMgbm90IGFcblx0XHRcdC8vICAgIHBvdGVudGlhbGx5IHRydXN0d29ydGh5IFVSTCwgdGhlbiByZXR1cm4gbm8gcmVmZXJyZXIuXG5cdFx0XHRpZiAoaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KHJlZmVycmVyVVJMKSAmJiAhaXNVcmxQb3RlbnRpYWxseVRydXN0d29ydGh5KGN1cnJlbnRVUkwpKSB7XG5cdFx0XHRcdHJldHVybiAnbm8tcmVmZXJyZXInO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAyLiBSZXR1cm4gcmVmZXJyZXJVUkwuXG5cdFx0XHRyZXR1cm4gcmVmZXJyZXJVUkw7XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCByZWZlcnJlclBvbGljeTogJHtwb2xpY3l9YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjLXJlZmVycmVyLXBvbGljeS8jcGFyc2UtcmVmZXJyZXItcG9saWN5LWZyb20taGVhZGVyfFJlZmVycmVyIFBvbGljeSBcdTAwQTc4LjEuIFBhcnNlIGEgcmVmZXJyZXIgcG9saWN5IGZyb20gYSBSZWZlcnJlci1Qb2xpY3kgaGVhZGVyfVxuICogQHBhcmFtIHtIZWFkZXJzfSBoZWFkZXJzIFJlc3BvbnNlIGhlYWRlcnNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBvbGljeVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSZWZlcnJlclBvbGljeUZyb21IZWFkZXIoaGVhZGVycykge1xuXHQvLyAxLiBMZXQgcG9saWN5LXRva2VucyBiZSB0aGUgcmVzdWx0IG9mIGV4dHJhY3RpbmcgaGVhZGVyIGxpc3QgdmFsdWVzIGdpdmVuIGBSZWZlcnJlci1Qb2xpY3lgXG5cdC8vICAgIGFuZCByZXNwb25zZVx1MjAxOXMgaGVhZGVyIGxpc3QuXG5cdGNvbnN0IHBvbGljeVRva2VucyA9IChoZWFkZXJzLmdldCgncmVmZXJyZXItcG9saWN5JykgfHwgJycpLnNwbGl0KC9bLFxcc10rLyk7XG5cblx0Ly8gMi4gTGV0IHBvbGljeSBiZSB0aGUgZW1wdHkgc3RyaW5nLlxuXHRsZXQgcG9saWN5ID0gJyc7XG5cblx0Ly8gMy4gRm9yIGVhY2ggdG9rZW4gaW4gcG9saWN5LXRva2VucywgaWYgdG9rZW4gaXMgYSByZWZlcnJlciBwb2xpY3kgYW5kIHRva2VuIGlzIG5vdCB0aGUgZW1wdHlcblx0Ly8gICAgc3RyaW5nLCB0aGVuIHNldCBwb2xpY3kgdG8gdG9rZW4uXG5cdC8vIE5vdGU6IFRoaXMgYWxnb3JpdGhtIGxvb3BzIG92ZXIgbXVsdGlwbGUgcG9saWN5IHZhbHVlcyB0byBhbGxvdyBkZXBsb3ltZW50IG9mIG5ldyBwb2xpY3lcblx0Ly8gdmFsdWVzIHdpdGggZmFsbGJhY2tzIGZvciBvbGRlciB1c2VyIGFnZW50cywgYXMgZGVzY3JpYmVkIGluIFx1MDBBNyAxMS4xIFVua25vd24gUG9saWN5IFZhbHVlcy5cblx0Zm9yIChjb25zdCB0b2tlbiBvZiBwb2xpY3lUb2tlbnMpIHtcblx0XHRpZiAodG9rZW4gJiYgUmVmZXJyZXJQb2xpY3kuaGFzKHRva2VuKSkge1xuXHRcdFx0cG9saWN5ID0gdG9rZW47XG5cdFx0fVxuXHR9XG5cblx0Ly8gNC4gUmV0dXJuIHBvbGljeS5cblx0cmV0dXJuIHBvbGljeTtcbn1cbiIsICJpbXBvcnQge0ZldGNoQmFzZUVycm9yfSBmcm9tICcuL2Jhc2UuanMnO1xuXG4vKipcbiAqIEFib3J0RXJyb3IgaW50ZXJmYWNlIGZvciBjYW5jZWxsZWQgcmVxdWVzdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEFib3J0RXJyb3IgZXh0ZW5kcyBGZXRjaEJhc2VFcnJvciB7XG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHR5cGUgPSAnYWJvcnRlZCcpIHtcblx0XHRzdXBlcihtZXNzYWdlLCB0eXBlKTtcblx0fVxufVxuIiwgImltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbmV4cG9ydCBlbnVtIFN0YXRlIHtcbiAgQXZhaWxhYmxlID0gXCJhdmFpbGFibGVcIixcbiAgQ3Jhc2hpbmcgPSBcImNyYXNoaW5nXCIsXG4gIENyZWF0aW5nID0gXCJjcmVhdGluZ1wiLFxuICBTdXNwZW5kZWQgPSBcInN1c3BlbmRlZFwiLFxufVxuXG5leHBvcnQgZW51bSBTZXJ2aWNlU3RhdGUge1xuICBBY3RpdmUgPSBcImFjdGl2ZVwiLFxuICBBY3RpdmF0aW5nID0gXCJhY3RpdmF0aW5nXCIsXG4gIFVua25vd24gPSBcInVua25vd25cIixcbn1cblxuZXhwb3J0IGVudW0gU3Bpbkluc3RhbmNlVHlwZSB7XG4gIEluc3RhbmNlID0gXCJJbnN0YW5jZVwiLFxufVxuXG5leHBvcnQgZW51bSBJbnN0YW5jZURhdGFTb3VyY2Uge1xuICBMaXN0ID0gXCJsaXN0XCIsXG4gIFNob3cgPSBcInNob3dcIixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXBvIHtcbiAgbmFtZTogc3RyaW5nO1xuICBicmFuY2g6IHN0cmluZztcbiAgcmVtb3RlX3VybDogc3RyaW5nO1xuICByZXZpc2lvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbmNlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHN1c3BlbmRlZDogYm9vbGVhbjtcbiAgZnFkbjogc3RyaW5nO1xuICBzdGF0dXM6IFN0YXRlO1xuICB0aW1lem9uZT86IHN0cmluZztcbiAgcmVwb3M6IFJlcG9bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaXN0SW5zdGFuY2Uge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcG9zaXRvcmllczogUmVwb1tdO1xuICBzdGF0dXM6IFN0YXRlO1xuICBhZ2U6IHN0cmluZztcbiAgZnFkbjogc3RyaW5nO1xuICBzdXNwZW5kZWQ6IGJvb2xlYW47XG4gIGNyZWF0ZWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTcGluVXJsQ29uZmlnIHtcbiAgZnFkbj86IHN0cmluZztcbiAgdXJsczogU3BpblVybFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNwaW5Vcmwge1xuICBzZXJ2aWNlOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xuICBzaG9ydGN1dD86IEtleWJvYXJkU2hvcnRjdXQ7XG4gIHBvc2l0aW9uPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJbnN0YW5jZURhdGFUeXBlQnlTb3VyY2U8UyBleHRlbmRzIEluc3RhbmNlRGF0YVNvdXJjZT4gPSB7XG4gIFtJbnN0YW5jZURhdGFTb3VyY2UuTGlzdF06IExpc3RJbnN0YW5jZTtcbiAgW0luc3RhbmNlRGF0YVNvdXJjZS5TaG93XTogSW5zdGFuY2U7XG59W1NdO1xuXG5leHBvcnQgdHlwZSBJbnN0YW5jZURhdGFUeXBlcyA9IEluc3RhbmNlIHwgTGlzdEluc3RhbmNlO1xuZXhwb3J0IHR5cGUgU2VydmljZURhdGFUeXBlcyA9IFJlcG87XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BpbkVycm9yIHtcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFNwaW5MaXN0UmVzcG9uc2UgPSBMaXN0SW5zdGFuY2VbXTtcblxuZXhwb3J0IHR5cGUgU3BpblNob3dSZXNwb25zZSA9IEluc3RhbmNlO1xuXG5leHBvcnQgdHlwZSBTcGluQ3JlYXRlUmVzcG9uc2UgPSBJbnN0YW5jZTtcbiIsICJleHBvcnQgY29uc3QgUkVGUkVTSF9JTlRFUlZBTCA9IDEwOyAvLyAxMCBzZWNzXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NRTF9QT1JUID0gMzMwNjtcbiIsICJpbXBvcnQgeyBMaXN0SW5zdGFuY2UgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBpbXBvcnRhbnRTaG9waWZ5U2VydmljZXMgPSBbXCJzaG9waWZ5XCIsIFwid2ViXCJdO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNsdWcge1xuICBvd25lcjogc3RyaW5nO1xuICByZXBvOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBwYXJzZVJlcG9TbHVnID0gKHNsdWc6IHN0cmluZyk6IFNsdWcgPT4ge1xuICBjb25zdCByZXBvc2l0b3J5UGFydHMgPSBzbHVnLnRyaW0oKS5zcGxpdChcIi0tXCIpO1xuXG4gIHJldHVybiByZXBvc2l0b3J5UGFydHMubGVuZ3RoID09PSAxICYmIHJlcG9zaXRvcnlQYXJ0c1swXSAhPT0gXCJcIlxuICAgID8ge1xuICAgICAgICBvd25lcjogXCJTaG9waWZ5XCIsXG4gICAgICAgIHJlcG86IHJlcG9zaXRvcnlQYXJ0c1swXSxcbiAgICAgIH1cbiAgICA6IHtcbiAgICAgICAgb3duZXI6IHJlcG9zaXRvcnlQYXJ0c1swXSxcbiAgICAgICAgcmVwbzogcmVwb3NpdG9yeVBhcnRzWzFdLFxuICAgICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBzbHVnVG9OYW1lID0gKHNsdWc6IFNsdWcpID0+IHtcbiAgcmV0dXJuIGAke3NsdWcub3duZXJ9LS0ke3NsdWcucmVwb31gLnRvTG93ZXJDYXNlKCk7XG59O1xuXG4vLyBzb3J0IGZpcnN0IGlmIGltcG9ydGFudCBhbmQgdGhlbiBhbHBoYWJldGljYWxseVxuZXhwb3J0IGNvbnN0IHNvcnRTaG9waWZ5U2VydmljZU5hbWVzID0gKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiB7XG4gIC8vIHJlbW92ZSB0aGUgYHNob3BpZnktLWAgZnJvbSBgc2hvcGlmeS0td2ViYGBcbiAgY29uc3QgcmVwb0EgPSBwYXJzZVJlcG9TbHVnKGEpLnJlcG87XG4gIGNvbnN0IHJlcG9CID0gcGFyc2VSZXBvU2x1ZyhiKS5yZXBvO1xuXG4gIGNvbnN0IGhhc0EgPSBpbXBvcnRhbnRTaG9waWZ5U2VydmljZXMuaW5kZXhPZihyZXBvQSkgKyAxO1xuICBjb25zdCBoYXNCID0gaW1wb3J0YW50U2hvcGlmeVNlcnZpY2VzLmluZGV4T2YocmVwb0IpICsgMTtcbiAgaWYgKGhhc0EgJiYgaGFzQikgcmV0dXJuIGhhc0EgLSBoYXNCO1xuXG4gIGlmIChoYXNBKSByZXR1cm4gLTE7XG4gIGlmIChoYXNCKSByZXR1cm4gMTtcbiAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzb3J0U3BpbnNCeURhdGUgPSAoYTogTGlzdEluc3RhbmNlLCBiOiBMaXN0SW5zdGFuY2UpID0+ICtuZXcgRGF0ZShiLmNyZWF0ZWQpIC0gK25ldyBEYXRlKGEuY3JlYXRlZCk7XG4iLCAiaW1wb3J0IFNlcnZpY2UgZnJvbSBcIi4vc2VydmljZVwiO1xuXG5pbXBvcnQgdHlwZSB7IFJlcG8gYXMgUmVwb0RhdGEgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IEluc3RhbmNlIH0gZnJvbSBcIi4uL3NwaW4tdHlwZVwiO1xuaW1wb3J0IHsgc3BpblNlcnZpY2VTdGF0dXMgfSBmcm9tIFwiLi4vaGVscGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnN0YW5jZVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlPFJlcG9EYXRhLCBJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihkYXRhOiBSZXBvRGF0YSwgc3BpbjogSW5zdGFuY2UpIHtcbiAgICBzdXBlcihkYXRhLCBzcGluKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZnFkbigpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zbHVnLnJlcG99LiR7dGhpcy5zcGluLmRhdGEuZnFkbn1gO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBzcGluU2VydmljZVN0YXR1cyh0aGlzLnNwaW4sIHRoaXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHNxbFBvcnQoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBzbHVnID0gdGhpcy5uYW1lO1xuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL1Nob3BpZnkvc3Bpbi9ibG9iL21hc3Rlci9kb2NzL2lzb3NwaW4vY29uY2VwdC5tZCNwb3J0LXNlbGVjdGlvblxuICAgIGNvbnN0IHBvcnROdW1iZXJDbWQgPSBhd2FpdCB0aGlzLnNwaW4uc2hlbGxDb21tYW5kKGBjYXQgL3J1bi9wb3J0cy8ke3NsdWd9L3N2Yy9teXNxbGApLmNhdGNoKChlKSA9PiBlKTtcblxuICAgIGlmICghcG9ydE51bWJlckNtZC5zdGRvdXQgfHwgaXNOYU4ocG9ydE51bWJlckNtZC5zdGRvdXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb3VsZCBub3QgZ2V0IG15c3FsIHBvcnRcIik7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIocG9ydE51bWJlckNtZC5zdGRvdXQpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgc3BpbkNvbW1hbmQgfSBmcm9tIFwiLi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSW5zdGFuY2VEYXRhVHlwZXMsIFN0YXRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZpY2VUeXBlcyB9IGZyb20gXCIuLi9zZXJ2aWNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFNwaW48RCBleHRlbmRzIEluc3RhbmNlRGF0YVR5cGVzLCBTIGV4dGVuZHMgU2VydmljZVR5cGVzPiB7XG4gIHB1YmxpYyBkYXRhOiBEO1xuXG4gIHB1YmxpYyBzZXJ2aWNlczogU1tdO1xuXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBmcWRuOiBzdHJpbmc7XG4gIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGVkPzogRGF0ZTtcblxuICBwdWJsaWMgYWJzdHJhY3Qgc2VydmljZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGFic3RyYWN0IHN0YXRlOiBTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBEKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLmZxZG4gPSBkYXRhLmZxZG47XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHRoaXMuZ2V0U2VydmljZXMoZGF0YSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0U2VydmljZXMoZGF0YTogRCk6IFNbXTtcblxuICAvLyBwdWJsaWMgYXN5bmMgdXNlKCkge1xuICAvLyAgIGF3YWl0IGV4ZWNwKGBzcGluIHVzZSAke3RoaXMubmFtZX1gKTtcbiAgLy8gfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGNvbnN0IGRlc3Ryb3kgPSAoYXdhaXQgc3BpbkNvbW1hbmQoYGRlc3Ryb3lgLCB0aGlzLm5hbWUsIHRydWUpKS5zdGRvdXQ7XG4gICAgY29uc3QgZGVzdHJveVJlc3AgPSBKU09OLnBhcnNlKGRlc3Ryb3kpO1xuICAgIHJldHVybiBkZXN0cm95UmVzcDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaGVsbENvbW1hbmQoY21kOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYXdhaXQgc3BpbkNvbW1hbmQoYHNoZWxsIC0tIFwiJHtjbWR9XCJgLCB0aGlzLm5hbWUsIGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRTc2hDb21tYW5kKCkge1xuICAgIHJldHVybiAoYXdhaXQgc3BpbkNvbW1hbmQoXCJzaGVsbCAtLXNob3dcIiwgdGhpcy5uYW1lLCBmYWxzZSkpLnN0ZG91dDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBoYXNTZXJ2aWNlKG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgcHVibGljIGlzUmVhZHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IFN0YXRlLkF2YWlsYWJsZTtcbiAgfVxufVxuIiwgImltcG9ydCBTcGluIGZyb20gXCIuL3NwaW5cIjtcblxuaW1wb3J0IHtcbiAgSW5zdGFuY2UgYXMgSW5zdGFuY2VUeXBlLFxuICBMaXN0SW5zdGFuY2UgYXMgTGlzdEluc3RhbmNlVHlwZSxcbiAgSW5zdGFuY2VEYXRhVHlwZXMsXG4gIFNwaW5VcmwsXG4gIFNwaW5VcmxDb25maWcsXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgSW5zdGFuY2VTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VcIjtcbmltcG9ydCB7IHNvcnRTaG9waWZ5U2VydmljZU5hbWVzIH0gZnJvbSBcIi4uL3V0aWxcIjtcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBmZXRjaFVuYXV0aG9yaXplZCB9IGZyb20gXCIuLi9oZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc3RhbmNlIGV4dGVuZHMgU3BpbjxJbnN0YW5jZURhdGFUeXBlcywgSW5zdGFuY2VTZXJ2aWNlPiB7XG4gIGNvbnN0cnVjdG9yKGRhdGE6IEluc3RhbmNlRGF0YVR5cGVzKSB7XG4gICAgc3VwZXIoZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNyZWF0ZWQoKSB7XG4gICAgY29uc3QgY3JlYXRpb25UaW1lID0gKHRoaXMuZGF0YSBhcyBMaXN0SW5zdGFuY2VUeXBlKS5jcmVhdGVkIHx8ICh0aGlzLmRhdGEgYXMgSW5zdGFuY2VUeXBlKS5jcmVhdGVkX2F0O1xuICAgIGlmIChjcmVhdGlvblRpbWUpIHJldHVybiBuZXcgRGF0ZShjcmVhdGlvblRpbWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5kYXRhLnN1c3BlbmRlZCkgcmV0dXJuIFN0YXRlLlN1c3BlbmRlZDtcbiAgICByZXR1cm4gdGhpcy5kYXRhLnN0YXR1cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMubWFwKCh7IHNsdWc6IHsgcmVwbyB9IH0pID0+IHJlcG8pLmpvaW4oXCIsIFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNTZXJ2aWNlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLnNvbWUoKHNlcnZpY2UpID0+IHNlcnZpY2Uuc2x1Zy5yZXBvID09PSBuYW1lKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZXJ2aWNlcyhkYXRhOiBJbnN0YW5jZURhdGFUeXBlcykge1xuICAgIGNvbnN0IHJlcG9zID0gKChkYXRhIGFzIEluc3RhbmNlVHlwZSk/LnJlcG9zIHx8IChkYXRhIGFzIExpc3RJbnN0YW5jZVR5cGUpPy5yZXBvc2l0b3JpZXMpID8/IFtdO1xuICAgIHJlcG9zLnNvcnQoKHsgbmFtZTogYSB9LCB7IG5hbWU6IGIgfSkgPT4gc29ydFNob3BpZnlTZXJ2aWNlTmFtZXMoYSwgYikpO1xuICAgIHJldHVybiByZXBvcy5tYXAoKHJlcG8pID0+IG5ldyBJbnN0YW5jZVNlcnZpY2UocmVwbywgdGhpcykpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFNwaW5VcmxzKCk6IFByb21pc2U8U3BpblVybENvbmZpZz4ge1xuICAgIGxldCB1cmxzOiBTcGluVXJsW10gPSBbXTtcblxuICAgIC8vIGRlZmF1bHQgdXJsc1xuICAgIGlmICh0aGlzLmhhc1NlcnZpY2UoXCJzaG9waWZ5XCIpKSB7XG4gICAgICBjb25zdCB7IGZxZG4gfSA9IHRoaXM7XG4gICAgICB1cmxzID0gW1xuICAgICAgICB7IHNlcnZpY2U6IFwiU2hvcGlmeVwiLCB1cmw6IGBodHRwczovL3Nob3AxLnNob3BpZnkuJHtmcWRufS9gIH0sXG4gICAgICAgIHsgc2VydmljZTogXCJTaG9waWZ5IEFkbWluXCIsIHVybDogYGh0dHBzOi8vc2hvcDEuc2hvcGlmeS4ke2ZxZG59L2FkbWluL2AgfSxcbiAgICAgICAgeyBzZXJ2aWNlOiBcIlNlcnZpY2VzIEludGVybmFsXCIsIHVybDogYGh0dHBzOi8vYXBwLnNob3BpZnkuJHtmcWRufS9zZXJ2aWNlcy9pbnRlcm5hbC9gIH0sXG4gICAgICAgIHsgc2VydmljZTogXCJTaG9waWZ5IEdyYXBoaVFMXCIsIHVybDogYGh0dHBzOi8vYXBwLnNob3BpZnkuJHtmcWRufS9zZXJ2aWNlcy9pbnRlcm5hbC9zaG9wcy8xL2dyYXBocWwvYCB9LFxuICAgICAgXTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3Bpbm5lcmFtYVVybCA9IGBodHRwczovL3NwaW5uZXJhbWEuJHt0aGlzLmZxZG59L2FwaS92MS9zcGluL3VybHNgO1xuICAgICAgY29uc3QgcmVzcCA9IChhd2FpdCAoYXdhaXQgZmV0Y2hVbmF1dGhvcml6ZWQoc3Bpbm5lcmFtYVVybCkpLmpzb24oKSkgYXMgeyB1cmxzOiBTcGluVXJsW10gfTtcbiAgICAgIHVybHMgPSByZXNwLnVybHM7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZnFkbjogdGhpcy5mcWRuLFxuICAgICAgdXJsczogdXJscyxcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgSWNvbiwgQWN0aW9uUGFuZWwsIHNob3dUb2FzdCwgQ29sb3IsIHNob3dIVUQsIGNvbmZpcm1BbGVydCwgQWN0aW9uLCBBbGVydCwgVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbmltcG9ydCB7IFNwaW5UeXBlcywgU2VydmljZVR5cGVzIH0gZnJvbSBcIi4uL2xpYi9zcGluXCI7XG5pbXBvcnQgdXNlU3BpblVybHMgZnJvbSBcIi4uL2hvb2tzL3VzZS1zcGluLXVybHNcIjtcblxuaW1wb3J0IFNwaW5EZXRhaWxzTGlzdCBmcm9tIFwiLi9kZXRhaWxzLWxpc3RcIjtcbmltcG9ydCBTcGluQnJvd3Nlckxpc3QgZnJvbSBcIi4vYnJvd3Nlci1saXN0XCI7XG5cbmltcG9ydCB7IFNwaW5PcGVuVXJsSW5Ccm93c2VyQWN0aW9uIH0gZnJvbSBcIi4vYnJvd3Nlci1saXN0L29wZW4tdXJsLWluLWJyb3dzZXItYWN0aW9uXCI7XG5cbmNvbnN0IHNob3dFcnJvciA9IGFzeW5jIChhY3Rpb246IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgdGl0bGU6IGBDb3VsZCBub3QgJHthY3Rpb259YCxcbiAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICB9KTtcbn07XG5cbmNvbnN0IGVuc3VyZVNwaW5SZWFkeSA9IGFzeW5jIChzcGluOiBTcGluVHlwZXMsIGFjdGlvbjogc3RyaW5nKSA9PiB7XG4gIGlmICghc3Bpbi5pc1JlYWR5KCkpIHtcbiAgICBhd2FpdCBzaG93RXJyb3IoYWN0aW9uLCAnU3RhdHVzIGlzIG5vdCBcImF2YWlsYWJsZVwiJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuaW50ZXJmYWNlIFNwaW5BY3Rpb25Qcm9wcyB7XG4gIHNwaW46IFNwaW5UeXBlcztcbn1cblxuaW50ZXJmYWNlIFNwaW5BY3Rpb25XaXRoU2VydmljZVByb3BzIGV4dGVuZHMgU3BpbkFjdGlvblByb3BzIHtcbiAgc2VydmljZTogU2VydmljZVR5cGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3Bpbk9wZW5BY3Rpb24oeyBzcGluLCBzZXJ2aWNlIH06IFNwaW5BY3Rpb25XaXRoU2VydmljZVByb3BzKSB7XG4gIGNvbnN0IGRvT3BlbiA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoYXdhaXQgZW5zdXJlU3BpblJlYWR5KHNwaW4sIFwib3BlbiBpbiBicm93c2VyXCIpKSB7XG4gICAgICBhd2FpdCBzZXJ2aWNlLm9wZW4oKTtcbiAgICAgIGF3YWl0IHNob3dIVUQoYE9wZW5lZCBcIiR7c2VydmljZS5uYW1lfVwiYCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiA8QWN0aW9uIGljb249e0ljb24uR2xvYmV9IHRpdGxlPXtcIk9wZW4gaW4gQnJvd3NlclwifSBvbkFjdGlvbj17ZG9PcGVufSAvPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5Db2RlQWN0aW9uKHsgc3Bpbiwgc2VydmljZSB9OiBTcGluQWN0aW9uV2l0aFNlcnZpY2VQcm9wcykge1xuICBjb25zdCBhY3Rpb24gPSBcIm9wZW4gaW4gVlNDb2RlXCI7XG4gIGNvbnN0IGRvQ29kZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoYXdhaXQgZW5zdXJlU3BpblJlYWR5KHNwaW4sIGFjdGlvbikpIHtcbiAgICAgIGNvbnN0IGxvYWRpbmdUb2FzdCA9IGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5BbmltYXRlZCxcbiAgICAgICAgdGl0bGU6IFwiT3BlbmluZyB3aXRoIFZTQ29kZS4uLlwiLFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgc2VydmljZS5jb2RlKCk7XG4gICAgICBhd2FpdCBsb2FkaW5nVG9hc3QuaGlkZSgpO1xuICAgICAgaWYgKCFyZXNwLmVycm9yKSB7XG4gICAgICAgIGF3YWl0IHNob3dIVUQoYE9wZW5lZCBWU0NvZGUgZm9yIFwiJHtzZXJ2aWNlLm5hbWV9XCJgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHNob3dFcnJvcihhY3Rpb24sIHJlc3AuZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gPEFjdGlvbiBpY29uPXtJY29uLkhhbW1lcn0gdGl0bGU9e1wiT3BlbiBpbiBWU0NvZGVcIn0gb25BY3Rpb249e2RvQ29kZX0gLz47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPcGVuSW5zb21uaWFBY3Rpb24oeyBzcGluLCBzZXJ2aWNlIH06IFNwaW5BY3Rpb25XaXRoU2VydmljZVByb3BzKSB7XG4gIGNvbnN0IGFjdGlvbiA9IFwib3BlbiBpbiBJbnNvbW5pYVwiO1xuICBjb25zdCBkb0NvZGUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGF3YWl0IGVuc3VyZVNwaW5SZWFkeShzcGluLCBhY3Rpb24pKSB7XG4gICAgICBjb25zdCBsb2FkaW5nVG9hc3QgPSBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuQW5pbWF0ZWQsXG4gICAgICAgIHRpdGxlOiBcIk9wZW5pbmcgd2l0aCBJbnNvbW5pYS4uLlwiLFxuICAgICAgfSk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBzZXJ2aWNlLmluc29tbmlhKCk7XG4gICAgICB9IGNhdGNoIChlOiB1bmtub3duKSB7XG4gICAgICAgIGxldCBtc2c7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIG1zZyA9IGUubWVzc2FnZTtcblxuICAgICAgICBhd2FpdCBsb2FkaW5nVG9hc3QuaGlkZSgpO1xuICAgICAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgICAgIHRpdGxlOiBcIkNvdWxkIG5vdCBvcGVuIEluc29tbmlhXCIsXG4gICAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBzaG93SFVEKGBPcGVuZWQgSW5zb21uaWEgZm9yIFwiJHtzZXJ2aWNlLm5hbWV9XCJgKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QWN0aW9uXG4gICAgICBpY29uPXtcImluc29tbmlhLWxvZ28ucG5nXCJ9XG4gICAgICBzaG9ydGN1dD17eyBtb2RpZmllcnM6IFtcImNtZFwiXSwga2V5OiBcImlcIiB9fVxuICAgICAgdGl0bGU9e1wiT3BlbiBpbiBJbnNvbW5pYVwifVxuICAgICAgb25BY3Rpb249e2RvQ29kZX1cbiAgICAvPlxuICApO1xufVxuXG5pbnRlcmZhY2UgU3BpbkRlc3Ryb3lBY3Rpb25Qcm9wcyBleHRlbmRzIFNwaW5BY3Rpb25Qcm9wcyB7XG4gIG9uRGVzdHJveTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5EZXN0cm95QWN0aW9uKHsgc3Bpbiwgb25EZXN0cm95IH06IFNwaW5EZXN0cm95QWN0aW9uUHJvcHMpIHtcbiAgY29uc3QgZG9EZXN0cm95ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGFsZXJ0T3B0aW9uczogQWxlcnQuT3B0aW9ucyA9IHtcbiAgICAgIHRpdGxlOiBcIkRlc3Ryb3kgU3Bpbj9cIixcbiAgICAgIGljb246IHsgc291cmNlOiBJY29uLlRyYXNoLCB0aW50Q29sb3I6IENvbG9yLlJlZCB9LFxuICAgICAgbWVzc2FnZTogYFNwaW4gXCIke3NwaW4ubmFtZX1cIiB3aWxsIGJlIGRlc3Ryb3llZGAsXG4gICAgICBwcmltYXJ5QWN0aW9uOiB7IHRpdGxlOiBcIkRlc3Ryb3lcIiB9LFxuICAgIH07XG4gICAgaWYgKGF3YWl0IGNvbmZpcm1BbGVydChhbGVydE9wdGlvbnMpKSB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgc3Bpbi5kZXN0cm95KCk7XG4gICAgICBpZiAoIXJlc3AuZXJyb3IpIHtcbiAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuU3VjY2VzcyxcbiAgICAgICAgICB0aXRsZTogYERlc3Ryb3llZCBTcGluIFwiJHtzcGluLm5hbWV9XCJgLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgb25EZXN0cm95KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBzaG93RXJyb3IoXCJkZXN0cm95IHNwaW5cIiwgcmVzcC5lcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEFjdGlvblxuICAgICAgaWNvbj17eyBzb3VyY2U6IEljb24uVHJhc2gsIHRpbnRDb2xvcjogQ29sb3IuUmVkIH19XG4gICAgICB0aXRsZT17XCJEZXN0cm95IFNwaW5cIn1cbiAgICAgIG9uQWN0aW9uPXtkb0Rlc3Ryb3l9XG4gICAgICBzaG9ydGN1dD17eyBtb2RpZmllcnM6IFtcImNtZFwiXSwga2V5OiBcImRlbGV0ZVwiIH19XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9wZW5TUUxDbGllbnRBY3Rpb24oeyBzZXJ2aWNlIH06IFNwaW5BY3Rpb25XaXRoU2VydmljZVByb3BzKSB7XG4gIGNvbnN0IGRvT3BlbiA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBsb2FkaW5nVG9hc3QgPSBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkFuaW1hdGVkLFxuICAgICAgdGl0bGU6IFwiR2V0dGluZyBNeVNRTCBwb3J0Li4uXCIsXG4gICAgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNlcnZpY2Uub3BlblNxbCgpO1xuICAgIH0gY2F0Y2ggKGU6IHVua25vd24pIHtcbiAgICAgIGxldCBtc2c7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSBtc2cgPSBlLm1lc3NhZ2U7XG5cbiAgICAgIGF3YWl0IGxvYWRpbmdUb2FzdC5oaWRlKCk7XG4gICAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgICAgdGl0bGU6IFwiQ291bGQgbm90IG9wZW4gU1FMIGNsaWVudFwiLFxuICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgc2hvd0hVRChgT3BlbmVkIFNRTCBDbGllbnQgZm9yIFwiJHtzZXJ2aWNlLm5hbWV9XCJgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBY3Rpb25cbiAgICAgIGljb249e1wic2VxdWVsX2FjZS5wbmdcIn1cbiAgICAgIHRpdGxlPXtcIk9wZW4gU1FMIENsaWVudFwifVxuICAgICAgb25BY3Rpb249e2RvT3Blbn1cbiAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwic1wiIH19XG4gICAgLz5cbiAgKTtcbn1cblxuaW50ZXJmYWNlIFNwaW5EZXRhaWxzQWN0aW9uc1Byb3BzIGV4dGVuZHMgU3BpbkFjdGlvblByb3BzIHtcbiAgdXBkYXRlTGlzdDogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5EZXRhaWxzQWN0aW9uKHsgc3BpbiB9OiBTcGluRGV0YWlsc0FjdGlvbnNQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxBY3Rpb24uUHVzaFxuICAgICAgaWNvbj17eyBzb3VyY2U6IEljb24uUXVlc3Rpb25NYXJrIH19XG4gICAgICB0aXRsZT17XCJWaWV3IERldGFpbHNcIn1cbiAgICAgIHRhcmdldD17PFNwaW5EZXRhaWxzTGlzdCBzcGluPXtzcGlufSAvPn1cbiAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwiZFwiIH19XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5Ccm93c2VyTGlzdEFjdGlvbih7IHNwaW4gfTogU3BpbkRldGFpbHNBY3Rpb25zUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8QWN0aW9uLlB1c2hcbiAgICAgIHRpdGxlPXtcIlZpZXcgQnJvd3NlciBMaW5rc1wifVxuICAgICAgaWNvbj17SWNvbi5HbG9iZX1cbiAgICAgIHRhcmdldD17PFNwaW5Ccm93c2VyTGlzdCBzcGluPXtzcGlufSAvPn1cbiAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwiYlwiIH19XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNwaW5Ccm93c2VyQWN0aW9ucyh7IHNwaW4gfTogU3BpbkFjdGlvblByb3BzKSB7XG4gIGNvbnN0IHsgdXJscyB9ID0gdXNlU3BpblVybHMoc3Bpbik7XG5cbiAgcmV0dXJuIChcbiAgICA8QWN0aW9uUGFuZWwuU2VjdGlvbiB0aXRsZT1cIkJyb3dzZXIgQWN0aW9uc1wiPlxuICAgICAge3VybHMubWFwKCh1cmwpID0+IHtcbiAgICAgICAgcmV0dXJuIDxTcGluT3BlblVybEluQnJvd3NlckFjdGlvbiBrZXk9e2BzZXJ2aWNlLSR7dXJsLnNlcnZpY2V9YH0gdXJsPXt1cmx9IC8+O1xuICAgICAgfSl9XG4gICAgPC9BY3Rpb25QYW5lbC5TZWN0aW9uPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3BpblNoZWxsQWN0aW9uKHsgc3BpbiB9OiBTcGluQWN0aW9uUHJvcHMpIHtcbiAgY29uc3Qgb3BlbldpdGhJdGVybSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29tbWFuZCA9IGBzcGluIHNoZWxsIFxcXFxcIiR7c3Bpbi5uYW1lfVxcXFxcImA7XG4gICAgICBleGVjU3luYyhgXG5vc2FzY3JpcHQgPDxFTkRcbnRlbGwgYXBwbGljYXRpb24gXCJpVGVybVwiXG4gIHNldCBuZXdXaW5kb3cgdG8gKGNyZWF0ZSB3aW5kb3cgd2l0aCBkZWZhdWx0IHByb2ZpbGUpXG4gIHRlbGwgY3VycmVudCBzZXNzaW9uIG9mIG5ld1dpbmRvd1xuICAgIHdyaXRlIHRleHQgXCIke2NvbW1hbmR9XCJcbiAgZW5kIHRlbGxcbmVuZCB0ZWxsXG5FTkRgKTtcbiAgICAgIGF3YWl0IHNob3dIVUQoXCJPcGVuZWQgaVRlcm1cIik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICAgIHRpdGxlOiBcIkNvdWxkIG5vdCBvcGVuIGlUZXJtXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QWN0aW9uXG4gICAgICBpY29uPXt7IHNvdXJjZTogSWNvbi5UZXJtaW5hbCB9fVxuICAgICAgc2hvcnRjdXQ9e3sgbW9kaWZpZXJzOiBbXCJjbWRcIl0sIGtleTogXCJzXCIgfX1cbiAgICAgIHRpdGxlPXtcIk9wZW4gc2hlbGwgd2l0aCBpVGVybVwifVxuICAgICAgb25BY3Rpb249e29wZW5XaXRoSXRlcm19XG4gICAgLz5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgU3BpblR5cGVzLCBTcGluVXJsIH0gZnJvbSBcIi4uL2xpYi9zcGluXCI7XG5pbXBvcnQgeyBTcGluVXJsQ29uZmlnIH0gZnJvbSBcIi4uL2xpYi9zcGluL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVNwaW5VcmxzKHNwaW4/OiBTcGluVHlwZXMpIHtcbiAgY29uc3QgW3VybHMsIHNldFVybHNdID0gdXNlU3RhdGU8U3BpblVybFtdPihbXSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGZ1bmN0aW9uIGlzU3RvcmVmcm9udFVybChzcGluVXJsOiBTcGluVXJsLCBmcWRuPzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHNwaW5VcmwudXJsID09PSBgaHR0cHM6Ly9zaG9wMS5zaG9waWZ5LiR7ZnFkbn0vYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQWRtaW5Vcmwoc3BpblVybDogU3BpblVybCwgZnFkbj86IHN0cmluZykge1xuICAgIHJldHVybiBzcGluVXJsLnVybC5zdGFydHNXaXRoKGBodHRwczovL3Nob3AxLnNob3BpZnkuJHtmcWRufS9hZG1pbmApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTZXJ2aWNlc0ludGVybmFsVXJsKHNwaW5Vcmw6IFNwaW5VcmwsIGZxZG4/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgc3BpblVybC51cmwuc3RhcnRzV2l0aChgaHR0cHM6Ly9hcHAuc2hvcGlmeS4ke2ZxZG59L3NlcnZpY2VzL2ludGVybmFsYCkgJiZcbiAgICAgICFzcGluVXJsLnVybC5lbmRzV2l0aChcIm1haWxcIikgJiZcbiAgICAgICFzcGluVXJsLnVybC5lbmRzV2l0aChcImdyYXBocWxcIilcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNYWlsUHJldmlld1VybChzcGluVXJsOiBTcGluVXJsLCBmcWRuPzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHNwaW5VcmwudXJsLnN0YXJ0c1dpdGgoYGh0dHBzOi8vYXBwLnNob3BpZnkuJHtmcWRufS9zZXJ2aWNlcy9pbnRlcm5hbC9tYWlsYCk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0dyYXBocWxVcmwoc3BpblVybDogU3BpblVybCwgZnFkbj86IHN0cmluZykge1xuICAgIHJldHVybiBzcGluVXJsLnVybC5zdGFydHNXaXRoKGBodHRwczovL2FwcC5zaG9waWZ5LiR7ZnFkbn0vc2VydmljZXMvaW50ZXJuYWwvc2hvcHMvMS9ncmFwaHFsYCk7XG4gIH1cblxuICBmdW5jdGlvbiBhdWdtZW50VXJscyh1cmxDb25maWc6IFNwaW5VcmxDb25maWcpIHtcbiAgICBjb25zdCBhdWdtZW50ZWRVcmxzID0gdXJsQ29uZmlnLnVybHMubWFwKChzcGluVXJsKSA9PiB7XG4gICAgICBpZiAoaXNTdG9yZWZyb250VXJsKHNwaW5VcmwsIHVybENvbmZpZy5mcWRuKSkge1xuICAgICAgICBjb25zdCBzaG9ydGN1dDogS2V5Ym9hcmQuU2hvcnRjdXQgPSB7XG4gICAgICAgICAgbW9kaWZpZXJzOiBbXCJjbWRcIl0sXG4gICAgICAgICAga2V5OiBcImZcIixcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3BpblVybCwgaWNvbjogXCJzaG9waWZ5LnN2Z1wiLCBzaG9ydGN1dDogc2hvcnRjdXQsIHBvc2l0aW9uOiAxIH07XG4gICAgICB9IGVsc2UgaWYgKGlzQWRtaW5Vcmwoc3BpblVybCwgdXJsQ29uZmlnLmZxZG4pKSB7XG4gICAgICAgIGNvbnN0IHNob3J0Y3V0OiBLZXlib2FyZC5TaG9ydGN1dCA9IHtcbiAgICAgICAgICBtb2RpZmllcnM6IFtcImNtZFwiXSxcbiAgICAgICAgICBrZXk6IFwiblwiLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4geyAuLi5zcGluVXJsLCBpY29uOiBcImFkbWluLnN2Z1wiLCBzaG9ydGN1dDogc2hvcnRjdXQsIHBvc2l0aW9uOiAyIH07XG4gICAgICB9IGVsc2UgaWYgKGlzU2VydmljZXNJbnRlcm5hbFVybChzcGluVXJsLCB1cmxDb25maWcuZnFkbikpIHtcbiAgICAgICAgY29uc3Qgc2hvcnRjdXQ6IEtleWJvYXJkLlNob3J0Y3V0ID0ge1xuICAgICAgICAgIG1vZGlmaWVyczogW1wiY21kXCJdLFxuICAgICAgICAgIGtleTogXCJpXCIsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7IC4uLnNwaW5VcmwsIGljb246IFwibWFnbmlmeWluZ19nbGFzcy5zdmdcIiwgc2hvcnRjdXQ6IHNob3J0Y3V0LCBwb3NpdGlvbjogMyB9O1xuICAgICAgfSBlbHNlIGlmIChpc01haWxQcmV2aWV3VXJsKHNwaW5VcmwsIHVybENvbmZpZy5mcWRuKSkge1xuICAgICAgICBjb25zdCBzaG9ydGN1dDogS2V5Ym9hcmQuU2hvcnRjdXQgPSB7XG4gICAgICAgICAgbW9kaWZpZXJzOiBbXCJjbWRcIl0sXG4gICAgICAgICAga2V5OiBcIm1cIixcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3BpblVybCwgaWNvbjogXCJtYWlsYm94LnN2Z1wiLCBzaG9ydGN1dDogc2hvcnRjdXQsIHBvc2l0aW9uOiA0IH07XG4gICAgICB9IGVsc2UgaWYgKGlzR3JhcGhxbFVybChzcGluVXJsLCB1cmxDb25maWcuZnFkbikpIHtcbiAgICAgICAgY29uc3Qgc2hvcnRjdXQ6IEtleWJvYXJkLlNob3J0Y3V0ID0ge1xuICAgICAgICAgIG1vZGlmaWVyczogW1wiY21kXCJdLFxuICAgICAgICAgIGtleTogXCJnXCIsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7IC4uLnNwaW5VcmwsIGljb246IFwiZ3JhcGhxbC5zdmdcIiwgc2hvcnRjdXQ6IHNob3J0Y3V0LCBwb3NpdGlvbjogNSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3BpblVybCwgcG9zaXRpb246IDYgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBhdWdtZW50ZWRVcmxzLnNvcnQoKGEsIGIpID0+IChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbiA/IDEgOiAtMSkpO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgICAgaWYgKHNwaW4pIHtcbiAgICAgICAgY29uc3QgdXJsQ29uZmlnID0gYXdhaXQgc3Bpbi5nZXRTcGluVXJscygpO1xuICAgICAgICBzZXRVcmxzKGF1Z21lbnRVcmxzKHVybENvbmZpZykpO1xuICAgICAgfVxuXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9KSgpO1xuICB9LCBbc3Bpbl0pO1xuXG4gIHJldHVybiB7IHVybHMsIGxvYWRpbmcgfTtcbn1cbiIsICJpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgU3BpblR5cGVzIH0gZnJvbSBcIi4uLy4uL2xpYi9zcGluXCI7XG5cbmltcG9ydCBTcGluRGV0YWlsc0xpc3RJdGVtIGZyb20gXCIuL2RldGFpbHMtbGlzdC1pdGVtXCI7XG5cbmludGVyZmFjZSBTcGluRGV0YWlsc0xpc3RQcm9wcyB7XG4gIHNwaW4/OiBTcGluVHlwZXM7XG4gIGxvYWRpbmc/OiBib29sZWFuO1xufVxuXG4vLyB0aGlzIHZpZXcgd2lsbCBub3QgdXBkYXRlIHNpbmNlIHRoZSBwcm9wcyBvZiB0aGlzIGNvbXBvbmVudFxuLy8gYXJlIG5vdCB1cGRhdGVkIG9uY2UgdGhpcyB2aWV3IGlzIHB1c2hlZCB0byB0aGUgc3RhY2tcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNwaW5EZXRhaWxzTGlzdCh7IHNwaW4sIGxvYWRpbmcgPSBmYWxzZSB9OiBTcGluRGV0YWlsc0xpc3RQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxMaXN0IHsuLi4oc3Bpbj8ubmFtZSAmJiB7IG5hdmlnYXRpb25UaXRsZTogYFNwaW4gXCIke3NwaW4ubmFtZX1cImAgfSl9IGlzTG9hZGluZz17bG9hZGluZ30+XG4gICAgICB7KHNwaW4/LnNlcnZpY2VzID8/IFtdKS5tYXAoKHNlcnZpY2UpID0+IChcbiAgICAgICAgPFNwaW5EZXRhaWxzTGlzdEl0ZW0ga2V5PXtzZXJ2aWNlLm5hbWV9IHNwaW49e3NwaW4gYXMgU3BpblR5cGVzfSBzZXJ2aWNlPXtzZXJ2aWNlfSAvPlxuICAgICAgKSl9XG4gICAgPC9MaXN0PlxuICApO1xufVxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgTGlzdCwgQWN0aW9uUGFuZWwgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbmltcG9ydCB7IFNwaW5UeXBlcywgU2VydmljZVR5cGVzLCBTZXJ2aWNlU3RhdGUsIGljb25Gcm9tU3BpblNlcnZpY2VTdGF0ZSB9IGZyb20gXCIuLi8uLi9saWIvc3BpblwiO1xuXG5pbXBvcnQgeyBTcGluQ29kZUFjdGlvbiwgU3Bpbk9wZW5BY3Rpb24sIE9wZW5TUUxDbGllbnRBY3Rpb24sIE9wZW5JbnNvbW5pYUFjdGlvbiB9IGZyb20gXCIuLi9hY3Rpb25zXCI7XG5cbmludGVyZmFjZSBTcGluRGV0YWlsc0xpc3RJdGVtUHJvcHMge1xuICBzZXJ2aWNlOiBTZXJ2aWNlVHlwZXM7XG4gIHNwaW46IFNwaW5UeXBlcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3BpbkRldGFpbHNMaXN0SXRlbSh7IHNwaW4sIHNlcnZpY2UgfTogU3BpbkRldGFpbHNMaXN0SXRlbVByb3BzKSB7XG4gIGNvbnN0IHN1YnRpdGxlID0gc2VydmljZS5icmFuY2g7XG5cbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlPFNlcnZpY2VTdGF0ZSB8IHVuZGVmaW5lZD4oKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBzZXRTdGF0dXMoYXdhaXQgc2VydmljZS5nZXRTdGF0ZSgpKTtcbiAgICB9KSgpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdC5JdGVtXG4gICAgICB0aXRsZT17c2VydmljZS5uYW1lfVxuICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxuICAgICAgey4uLihzdGF0dXMgJiYgeyBhY2Nlc3NvcnlUaXRsZTogc3RhdHVzLCBhY2Nlc3NvcnlJY29uOiBpY29uRnJvbVNwaW5TZXJ2aWNlU3RhdGUoc3RhdHVzKSB9KX1cbiAgICAgIGFjdGlvbnM9e1xuICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgPFNwaW5Db2RlQWN0aW9uIHNlcnZpY2U9e3NlcnZpY2V9IHNwaW49e3NwaW59IC8+XG4gICAgICAgICAgPFNwaW5PcGVuQWN0aW9uIHNlcnZpY2U9e3NlcnZpY2V9IHNwaW49e3NwaW59IC8+XG4gICAgICAgICAgPE9wZW5TUUxDbGllbnRBY3Rpb24gc2VydmljZT17c2VydmljZX0gc3Bpbj17c3Bpbn0gLz5cbiAgICAgICAgICA8T3Blbkluc29tbmlhQWN0aW9uIHNlcnZpY2U9e3NlcnZpY2V9IHNwaW49e3NwaW59IC8+XG4gICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICB9XG4gICAgLz5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5pbXBvcnQgdXNlU3BpblVybHMgZnJvbSBcIi4uLy4uL2hvb2tzL3VzZS1zcGluLXVybHNcIjtcbmltcG9ydCB7IFNwaW5UeXBlcyB9IGZyb20gXCIuLi8uLi9saWIvc3BpblwiO1xuXG5pbXBvcnQgU3BpbkJyb3dzZXJMaXN0SXRlbSBmcm9tIFwiLi9icm93c2VyLWxpc3QtaXRlbVwiO1xuXG5pbnRlcmZhY2UgU3BpbkJyb3dzZXJMaXN0UHJvcHMge1xuICBzcGluPzogU3BpblR5cGVzO1xuICBsb2FkaW5nPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3BpbkJyb3dzZXJMaXN0KHsgc3BpbiwgbG9hZGluZyA9IGZhbHNlIH06IFNwaW5Ccm93c2VyTGlzdFByb3BzKSB7XG4gIGNvbnN0IHsgdXJscywgbG9hZGluZzogdXJsc0xvYWRpbmcgfSA9IHVzZVNwaW5VcmxzKHNwaW4pO1xuXG4gIHJldHVybiAoXG4gICAgPExpc3RcbiAgICAgIGlzTG9hZGluZz17bG9hZGluZyB8fCB1cmxzTG9hZGluZ31cbiAgICAgIHsuLi4oc3Bpbj8ubmFtZSAmJiB7IG5hdmlnYXRpb25UaXRsZTogYFNwaW4gXCIke3NwaW4ubmFtZX1cIiBCcm93c2VyIExpbmtzYCB9KX1cbiAgICA+XG4gICAgICB7dXJscy5tYXAoKHVybCkgPT4ge1xuICAgICAgICByZXR1cm4gPFNwaW5Ccm93c2VyTGlzdEl0ZW0ga2V5PXtgaXRlbS0ke3VybC5zZXJ2aWNlfWB9IHVybD17dXJsfSAvPjtcbiAgICAgIH0pfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBMaXN0LCBBY3Rpb24sIEFjdGlvblBhbmVsIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5pbXBvcnQgeyBTcGluVXJsIH0gZnJvbSBcIi4uLy4uL2xpYi9zcGluXCI7XG5cbmltcG9ydCB7IFNwaW5PcGVuVXJsSW5Ccm93c2VyQWN0aW9uIH0gZnJvbSBcIi4vb3Blbi11cmwtaW4tYnJvd3Nlci1hY3Rpb25cIjtcblxuaW50ZXJmYWNlIEJyb3dzZXJMaXN0SXRlbVByb3BzIHtcbiAgdXJsOiBTcGluVXJsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTcGluQnJvd3Nlckxpc3RJdGVtKHsgdXJsIH06IEJyb3dzZXJMaXN0SXRlbVByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPExpc3QuSXRlbVxuICAgICAgdGl0bGU9e3VybC5zZXJ2aWNlfVxuICAgICAga2V5PXtgc2VydmljZS0ke3VybC5zZXJ2aWNlfWB9XG4gICAgICB7Li4uKHVybC5pY29uICYmIHsgaWNvbjogdXJsLmljb24gfSl9XG4gICAgICBhY3Rpb25zPXtcbiAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgIDxTcGluT3BlblVybEluQnJvd3NlckFjdGlvbiBrZXk9e2BzZXJ2aWNlLSR7dXJsLnNlcnZpY2V9YH0gdXJsPXt1cmx9IC8+XG4gICAgICAgICAgPEFjdGlvbi5Db3B5VG9DbGlwYm9hcmQgdGl0bGU9XCJDb3B5IFVSTCB0byBDbGlwYm9hcmRcIiBjb250ZW50PXt1cmwudXJsfSAvPlxuICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgfVxuICAgIC8+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5pbXBvcnQgeyBTcGluVXJsIH0gZnJvbSBcIi4uLy4uL2xpYi9zcGluXCI7XG5cbmludGVyZmFjZSBTcGluT3BlblVybEluQnJvd3NlckFjdGlvblByb3BzIHtcbiAgdXJsOiBTcGluVXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3Bpbk9wZW5VcmxJbkJyb3dzZXJBY3Rpb24oeyB1cmwgfTogU3Bpbk9wZW5VcmxJbkJyb3dzZXJBY3Rpb25Qcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxBY3Rpb24uT3BlbkluQnJvd3NlclxuICAgICAgdGl0bGU9e2BPcGVuICR7dXJsLnNlcnZpY2V9YH1cbiAgICAgIHVybD17dXJsLnVybH1cbiAgICAgIHsuLi4odXJsLnNob3J0Y3V0ICYmIHsgc2hvcnRjdXQ6IHVybC5zaG9ydGN1dCB9KX1cbiAgICAgIHsuLi4odXJsLmljb24gJiYgeyBpY29uOiB1cmwuaWNvbiB9KX1cbiAgICAvPlxuICApO1xufVxuIiwgImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgc2hvd1RvYXN0LCB1c2VOYXZpZ2F0aW9uLCBUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcblxuaW1wb3J0IHsgSW5zdGFuY2UsIFNwaW5MaXN0UmVzcG9uc2UsIHNwaW5MaXN0LCBzb3J0U3BpbnNCeURhdGUsIFNwaW5FcnJvciB9IGZyb20gXCIuLi9saWIvc3BpblwiO1xuaW1wb3J0IHsgUkVGUkVTSF9JTlRFUlZBTCB9IGZyb20gXCIuLi9saWIvc3Bpbi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlU3Bpbkxpc3QoKSB7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc3Bpbkxpc3REYXRhLCBzZXRTcGluTGlzdERhdGFdID0gdXNlU3RhdGU8SW5zdGFuY2VbXSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHsgcG9wIH0gPSB1c2VOYXZpZ2F0aW9uKCk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZXJyb3JBbmRRdWl0KG1zZz86IHN0cmluZykge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBcIkNvdWxkIG5vdCBnZXQgU3BpbiBkYXRhXCIsXG4gICAgICBtZXNzYWdlOiBtc2cgPz8gXCJcIixcbiAgICB9KTtcbiAgICAvLyBwb3AgdGhlIGN1cnJlbnQgdmlldyBvZmYgb2YgdGhlIHN0YWNrXG4gICAgcG9wKCk7XG4gIH1cblxuICBjb25zdCB1cGRhdGVTcGluTGlzdCA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuXG4gICAgbGV0IHNwaW5MaXN0UmVzcG9uc2U6IFNwaW5MaXN0UmVzcG9uc2UgfCBudWxsID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgc3Bpbkxpc3RSZXNwb25zZSA9IGF3YWl0IHNwaW5MaXN0KCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYXdhaXQgZXJyb3JBbmRRdWl0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKChzcGluTGlzdFJlc3BvbnNlIGFzIFNwaW5FcnJvcikuZXJyb3IpIHtcbiAgICAgIGF3YWl0IGVycm9yQW5kUXVpdCgoc3Bpbkxpc3RSZXNwb25zZSBhcyBTcGluRXJyb3IpPy5lcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwaW5MaXN0UmVzcG9uc2Uuc29ydCgoYSwgYikgPT4gc29ydFNwaW5zQnlEYXRlKGEsIGIpKTtcblxuICAgICAgY29uc3QgaW5zdGFuY2VzID0gc3Bpbkxpc3RSZXNwb25zZS5tYXAoKGluc3RhbmNlKSA9PiBuZXcgSW5zdGFuY2UoaW5zdGFuY2UpKTtcbiAgICAgIHNldFNwaW5MaXN0RGF0YShpbnN0YW5jZXMpO1xuICAgIH1cbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdXBkYXRlU3Bpbkxpc3QoKSwgMTAwMCAqIFJFRlJFU0hfSU5URVJWQUwpO1xuICAgIHVwZGF0ZVNwaW5MaXN0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7IGxvYWRpbmcsIGRhdGE6IHNwaW5MaXN0RGF0YSwgdXBkYXRlOiB1cGRhdGVTcGluTGlzdCB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFlBQU0saUJBQ0osT0FBTyxXQUFXLGNBQWMsT0FBTyxPQUFPLGFBQWEsV0FDekQsU0FDQSxpQkFBZSxVQUFVO3VCQ0hUO0FBQ2xCLGVBQU87O0FBR1QsNEJBQW1CO0FBQ2pCLFlBQUksT0FBTyxTQUFTLGFBQWE7QUFDL0IsaUJBQU87bUJBQ0UsT0FBTyxXQUFXLGFBQWE7QUFDeEMsaUJBQU87bUJBQ0UsT0FBTyxXQUFXLGFBQWE7QUFDeEMsaUJBQU87O0FBRVQsZUFBTzs7QUFHRixZQUFNLFVBQVU7NEJDZE0sSUFBTTtBQUNqQyxlQUFRLE9BQU8sT0FBTSxZQUFZLE9BQU0sUUFBUyxPQUFPLE9BQU07O0FBR3hELFlBQU0saUNBVVA7QUNiTixZQUFNLGtCQUFrQjtBQUN4QixZQUFNLHNCQUFzQixRQUFRLFVBQVU7QUFDOUMsWUFBTSx5QkFBeUIsUUFBUSxRQUFRLEtBQUs7QUFDcEQsWUFBTSx3QkFBd0IsUUFBUSxPQUFPLEtBQUs7MEJBRXBCLFVBR3JCO0FBQ1AsZUFBTyxJQUFJLGdCQUFnQjs7bUNBR1UsT0FBeUI7QUFDOUQsZUFBTyx1QkFBdUI7O21DQUdlLFFBQVc7QUFDeEQsZUFBTyxzQkFBc0I7O2tDQUk3QixTQUNBLGFBQ0EsWUFBOEQ7QUFHOUQsZUFBTyxvQkFBb0IsS0FBSyxTQUFTLGFBQWE7OzJCQUl0RCxTQUNBLGFBQ0EsWUFBc0Q7QUFD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
