/**
 * database javascript libaray
 * 
 * @description: 
 *  基于HTML5的localstorage本地数据库，全部数据存放在DB这个字段中，不影响其他本地存储的使用，防止混淆
 *  对外提供接口API，方便数据的存储
 * 
 * @author: caichunbao
 * @email: vipcaichunbao@163.com
 * @date: Wed Jan 10 2018 15:51:18 GMT_0800
 * 
 *[功能描述]
 *  HTML5提供的 window.localStorage 对象，支持以下方法和属性:
 *  setItem: function(key, value)
 *  getItem: function(key)
 *  removeItem: function(key)
 *  clear: function()
 *  hasOwnProperty: 检查localStorage上是否保存了变量x，需要传入x
 *  length: int
 *  key: function(i) //读取第i个数据的名字或称为键值(从0开始计数)
 * 
 */

(function(window){
  var 
    // 核心API
    ls = window.localStorage,

    // 所有的数据的索引
    keyArr = ls.getItem("keyArr")===null ? [] : JSON.parse(ls.getItem("keyArr")),
    
    // 版本
    localdb_version = "1.0.0",
    
    /**
     * 核心函数，包含一些方法和属性
     * 
     * 1.保存本地数据
     * 2.获取本地数据
     * 3.删除本地数据
     * 4.检测是否存在
     * 5.清除所有本地数据
     * 6....
     * 
     */ 
    localdb = function(data){

      var _this = this;
      
      // 保存本地数据，保存数据索引数组(内部使用)
      _this.setItem = function(key,value){
        ls.setItem(key,value);
        if(keyArr.indexOf(key) === -1){
          keyArr.push(key);
          ls.setItem("keyArr",JSON.stringify(keyArr))
        }
      },

      // 获取本地数据(内部使用)
      _this.getItem = function(key){
        return ls.getItem(key);
      },

      // 删除本地数据，删除数据索引数组(内部使用)
      _this.removeItem = function(key){
        ls.removeItem(key);
        keyArr.removeByValue(key)
        ls.setItem("keyArr",JSON.stringify(keyArr))
      }

      // 检测是否存在(内部使用)
      _this.hasItem = function(key){
        return ls.hasOwnProperty(key)
      }

      // 清空本地存储(内部使用)
      _this.clear = function(){
        ls.clear();
      }

    };
  
  /**
   * 核心函数原型上的属性和方法
   * 
   * [功能]
   *  1.对数据进行格式化之后再做操作
   *  2.保存本地数据
   *  3.获取本地数据
   *  4.更新本地数据
   *  5.删除本地数据
   *  6....
   * 
   * 
   */
  localdb.prototype = {
    constructor: localdb,
    
    // 所有的数组索引数组
    getKey: function(){
      return JSON.parse(this.getItem("keyArr"))
    },

    // 返回所有数据
    getAllData: function(){
      var allData = {};
      var allKey = JSON.parse(this.getItem("keyArr")) || [];
      for(var i = 0 ; i < allKey.length ; i++){
        allData[allKey[i]] = this.getItem(allKey[i])
      }
      return allData;
    },

    // 获取本地数据
    getData: function(key){
      if(this.hasItem(key)){
        return JSON.parse(this.getItem(key))
      }
    },

    // 保存本地数据
    saveData: function(key,data){
      if(!this.hasItem(key)){
        this.setItem(key,JSON.stringify(data.data))
      }
    },

    // 更新本地数据
    updateData: function(key,data){
      if(this.hasItem(key)){
        this.setItem(key,JSON.stringify(data.data))
      }
    },

    // 删除本地数据
    deleteData: function(key){
      if(this.hasItem(key)){
        this.removeItem(key);
      }
    }
  };


  /**
   * 给数组添加一个系统方法 
   * 删除指定的值
   * 
   * @param val 
   */

  Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
      if(this[i] == val) {
        this.splice(i, 1);
        break;
      }
    }
  }
  
  // 对外提供接口
  window.localdb = new localdb();

})(window)