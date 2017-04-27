/**
 * @flow
 * @file Created by zhangyatao on 2017/4/26.
 */
import 'polyfill'
import EventEmitter from 'eventEmitter';

let eventEmitter: EventEmitter = new EventEmitter();
eventEmitter.on('test', (data: number) => {
    console.log(data);
});

export default function () {
    eventEmitter.emit('test', 1);
}