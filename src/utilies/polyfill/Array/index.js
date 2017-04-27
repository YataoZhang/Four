/**
 * @flow
 * Created by yataozhang on 2017/4/26.
 */
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback: () => void) {
        let T, k;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        let O = Object(this);
        let len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = arguments[1];
        }
        k = 0;
        while (k < len) {
            let kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}


if (!Array.prototype.map) {
    Array.prototype.map = function (callback: () => mixed): Array<mixed> {
        let T, A, k;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        let O = Object(this);
        let len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = arguments[1];
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
            let kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };
}


if (!Array.prototype.find) {
    Array.prototype.find = function (predicate: () => boolean): Array<mixed> | undefined {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        let o = Object(this);
        let len = o.length >>> 0;
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        let thisArg = arguments[1];
        let k = 0;
        while (k < len) {
            let kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
            }
            k++;
        }
        return undefined;
    }

}


if (!Array.prototype.some) {
    Array.prototype.some = function (fun: () => boolean): boolean {
        'use strict';
        if (this == null) {
            throw new TypeError('Array.prototype.some called on null or undefined');
        }
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        let t = Object(this);
        let len = t.length >>> 0;
        let thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (let i = 0; i < len; i++) {
            if (i in t && fun.call(thisArg, t[i], i, t)) {
                return true;
            }
        }
        return false;
    };
}
