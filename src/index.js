/**
 * @flow
 * @file Created by zhangyatao on 2017/4/26.
 */
import foo from './foo.js';

export default function () {

    let list = foo([1, 2, 3, 4, 5], 3);
    console.log(list);
}