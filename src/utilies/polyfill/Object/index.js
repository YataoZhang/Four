/**
 * Created by yataozhang on 2017/4/26.
 */
if (typeof Object.assign != 'function') {
    Object.assign = function (target: Object | null, ...varArgs: Array<Object>): Object {
        'use strict';
        if (target == null) { 
            throw new TypeError('Cannot convert undefined or null to object');
        }
        let to = Object(target);
        for (let index = 1; index < arguments.length; index++) {
            let nextSource = arguments[index];
            if (nextSource != null) { 
                for (let nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}