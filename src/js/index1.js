console.log('index')
import P from './_modules/P'
import '@/css/home/home.css'
import '@/css/home/home.scss'
import './_modules/customized'
var p = new P('fly')
p.getName()
console.log(process.env.NODE_ENV)
var $ = require('jquery')
console.log($)
const obj = {
  name: 'mirror',
  age: 18
}

console.show('obj',obj);
// 按需加载，懒加载
document.onclick = function () {
  require.ensure(['./_modules/async'], function (require) {
    let a = require('./_modules/async');
    console.log(a)
  });
}

