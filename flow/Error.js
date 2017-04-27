/**
 * Created by zhangyatao on 2017/4/27.
 */
declare class Error {
    constructor(msg: string, id: ?string):void;
    toString(): string;

    context:any;
}