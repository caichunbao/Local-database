# Local-database
基于html5的localstorage的本地存储数据库，支持json数据的存储，但是由于系统的限制，存储的大小有限，存一些简单的数据还是没有问题的

![测试图片](https://github.com/caichunbao/Local-database/raw/master/img/index.png)

# API文档
### saveData( key , { data : data } )
> key为键值名，data为要存储的数据

### updateData( key , { data : data } )
> key为键值名，data为要更新的数据

### deleteData( key )
> key为键值名，删除比传字段

### getData( key )
> key为键值名，返回值为储存的值

### getKey( )
> 不需要传参数，返回值为储存所有key的数组

### getAllData( )
> 不需要传参数，返回值为一个json对象
```bash
{ key1 : value1 , key2 : value2 }
```
