/**
 * @flow
 * Created by zhangyatao on 2017/4/27.
 */

function isType(type: string): (data: any)=>boolean {
    return (data: any): boolean => {
        return Object.prototype.toString.call(data) === '[object ' + type + ']';
    }
}
const isFunction = isType('Function');
const isString = isType('String');
const isArray = isType('Array');
const isObject = isType('Object');
const isNumber = isType('Number');
const isUndefined = (data: any): boolean => {
    return data === undefined;
};

export {
    isFunction,
    isString,
    isArray,
    isObject,
    isNumber,
    isUndefined
}