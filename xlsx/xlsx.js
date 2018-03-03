var xlsx = require('node-xlsx');
var fs = require('fs');


/**
 *
 * @param {*} name 文件名
 * @param {*} data 内容
 */
function buildExcle(name, data) {
    // data的格式
    // [
    //     {
    //         name: 'sheet1',
    //         data: [[1, 2, 3, 4, 5], ['one', 'two', 'three', 'four', 'five']]
    //     },
    // {
    //     name: 'sheet2',
    //     data: [[1, 2, 3, 4, 5], ['one', 'two', 'three', 'four', 'five']]
    // }
    // ]
    var buffer = xlsx.build(data);

    //将文件内容插入新的文件中
    fs.writeFileSync(name, buffer, { 'flag': 'w' });


    return __dirname + '\\' + name;
}

module.exports = buildExcle;

var a = [{ name: "ddd", data: [[1, 2, 3, 4][1, 2]] }]
buildExcle('aaa.xlsx', a);