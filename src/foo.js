/**
 * @flow
 * Created by zhangyatao on 2017/4/26.
 */


function without(list: Array<number>, item: number): Array<number> {
    return list.filter((i: number): boolean => {
        return i !== item;
    })
}


export default without;