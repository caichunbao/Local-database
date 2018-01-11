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
 *  length: int
 *  key: function(i) //读取第i个数据的名字或称为键值(从0开始计数)
 */

(function(window){
  var 
    // 核心API
    ls = window.localStorage,

    // /**
    //  * 所有的数据
    //  * 如果本地有数据，则保存本地的数据，如果没有则创建空的数据库
    //  */
    // DB = ls.getItem("DB")===null ? {collectionArr: [],data:{}} : JSON.parse(ls.getItem("DB")),
    
    // 版本
    localdb_version = "1.0.0",
    
    /**
     * 核心函数，包含一些函数和属性
     * 
     * 1.保存本地数据
     * 2.清除本地数据库数据
     * 3.检查集合是否存在
     * 4.
     * 
     */ 
    localdb = function(data){
      var _this = this;
      
      _this.setItem = function(key,value){
        ls.setItem(key,value);
      },

      _this.getItem = function(key){
        ls.getItem(key);
      },

      _this.removeItem = function(key){
        ls.removeItem(key);
      }

      _this.clear = function(){
        ls.clear();
      }

    };
  
  /**
   * 核心函数原型上的属性和方法
   * 
   * 1.myData属性(本地数据库中的所有数据)
   * 2.创建集合、删除集合
   * 3.获取集合的数据
   * 4.向集合中保存数据
   * 5.
   * 
   * 
   */
  localdb.prototype = {
    constructor: localdb,
    getData: function(info){
      var info = info || {};
      if(info.collectionName){
        return DB.data[info.collectionName]
      }else{
        error("请填入要获取那个集合数据的名称")
      }
    },
    saveData: function(name,data){
      this.setItem(name,JSON.stringify(data.data))
    },
    updateData: function(data){
      var data = data || {};
      if(data.collectionName){
        var collectionData = DB.data[data.collectionName].result;
        if(collectionData.length === 0){
          error("集合中没有数据")
        }else{
          for(var i = 0 ; i < collectionData.length ; i++){
            if(collectionData[i].id === data.collectionData.id){
              for(key in data.collectionData){
                collectionData[i][key] = data.collectionData[key]
              }
            }
          }
        }
        this.save()
      }else{
        error("请填入要修改数据的集合名称")
      }
    },
    deleteCollection: function(name){
      console.log()
    }
  };

  // 抛出错误
  function error(str){
    throw new Error(str)
  }

  /**
   * 队列的类
   * 队列是遵循先进先出原则的一组有序的项
   */
  function Queue() {
    var items = [];
    this.enqueue = function(element) {
        items.push(element);
    };
    this.dequeue = function() {
        return items.shift();
    };
    this.front = function() {
        return items[0];
    };
    this.isEmpty = function() {
        return items.length == 0;
    };
    this.clear = function() {
        items = [];
    };
    this.size = function() {
        return items.length;
    };
    this.print = function() {
        console.log(items.toString());
    }
}
  
  // 对外提供接口
  window.localdb = new localdb();

})(window)