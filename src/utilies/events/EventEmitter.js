/**
 * @flow
 * Created by zhangyatao on 2017/4/27.
 */

import {isNumber, isObject, isFunction, isUndefined} from 'utilies';

class EventEmitter {
    _events: Object;
    _maxListeners: ?number;

    constructor() {
        this._events = {};
        this._maxListeners = undefined;
    }

    static EventEmitter: EventEmitter = EventEmitter;
    static defaultMaxListeners: number = 10;

    static listenerCount(emitter: EventEmitter, type: string): number {
        return emitter.listenerCount(type);
    }

    setMaxListeners(n: number): ?EventEmitter {
        if (!isNumber(n) || n < 0 || isNaN(n)) {
            return;
        }
        this._maxListeners = n;
        return this;
    }

    emit(type: string): boolean {
        if (!this._events) {
            this._events = {};
        }


        if (type === 'error') {
            if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
                let er = arguments[1];
                if (er instanceof Error) {
                    throw er;
                } else {
                    let err: Error = new Error('Uncaught, unspecified "error" event. (' + er + ')');
                    err.context = er;
                    throw err;
                }
            }
        }

        let handler = this._events[type];

        if (isUndefined(handler)) {
            return false;
        }


        if (isFunction(handler)) {
            switch (arguments.length) {
                // fast cases
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                // slower
                default:
                    let args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args);
            }
        } else if (isObject(handler)) {
            let args = Array.prototype.slice.call(arguments, 1);
            let listeners = handler.slice();
            let len = listeners.length;
            for (let i = 0; i < len; i++) {
                listeners[i].apply(this, args);
            }

        }

        return true;
    }

    on(type: string, listener: (...arg: any) => void): ?EventEmitter {
        let m;

        if (!isFunction(listener)) {
            return;
        }


        if (!this._events) {
            this._events = {};
        }

        if (this._events.newListener) {
            this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
        }


        if (!this._events[type]) {
            this._events[type] = listener;
        } else if (isObject(this._events[type])) {
            this._events[type].push(listener);
        } else {
            this._events[type] = [this._events[type], listener];
        }


        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
            } else {
                m = EventEmitter.defaultMaxListeners;
            }

            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error('(node) warning: possible EventEmitter memory '
                    + 'leak detected. %d listeners added. '
                    + 'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
                if (typeof console.trace === 'function') {
                    // not supported in IE 10
                    console.trace();
                }
            }
        }

        return this;
    }

    once(type: string, listener: () => void): ?EventEmitter {
        if (!isFunction(listener)) {
            return
        }


        let fired = false;

        function g() {
            this.removeListener(type, g);

            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
    }

    removeListener(type: string, listener: () => void): ?EventEmitter {
        var list;
        var position;
        var length;
        var i;

        if (!isFunction(listener)) {
            return;
        }

        if (!this._events || !this._events[type]) {
            return this;
        }

        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
            delete this._events[type];
            if (this._events.removeListener) {
                this.emit('removeListener', type, listener);
            }
        } else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }

            if (position < 0) {
                return this;
            }

            if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
            } else {
                list.splice(position, 1);
            }

            if (this._events.removeListener) {
                this.emit('removeListener', type, listener);
            }

        }

        return this;
    }

    removeAllListeners(type: string): EventEmitter {
        var key;
        var listeners;

        if (!this._events) {
            return this;
        }

        if (!this._events.removeListener) {
            if (arguments.length === 0) {
                this._events = {};
            } else if (this._events[type]) {
                delete this._events[type];
            }
            return this;
        }

        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === 'removeListener') continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = {};
            return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
            this.removeListener(type, listeners);
        } else if (listeners) {
            while (listeners.length) {
                this.removeListener(type, listeners[listeners.length - 1]);
            }
        }
        delete this._events[type];

        return this;
    }

    listeners(type: string): Array<Function> {
        if (!this._events || !this._events[type]) {
            return [];
        }
        if (isFunction(this._events[type])) {
            return [this._events[type]];
        }
        return this._events[type].slice();
    }

    listenerCount(type: string): number {
        if (this._events) {
            let evlistener = this._events[type];

            if (isFunction(evlistener)) {
                return 1;
            }
            if (evlistener) {
                return evlistener.length;
            }
        }
        return 0;
    }
}

export default EventEmitter;