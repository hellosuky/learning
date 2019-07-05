#### 注意点
+ `setTimeout`中的`this`是对全局的`this`的引用
解决方法:

```
//bind方法
setTimeout(function(){ this.tip.destroy() }.bind(this), 1000);


//箭头函数
setTimeout(() => { this.tip.destroy() }, 1000);

//that传递
var that = this
setTimeout(function(that){ that.tip.destroy() }, 1000);
```

#### 转盘逻辑
+ 获取节点
+ 每次都会移动我们的位置，通过删除及添加class来展示效果，超过所有子元素的个数时要及时归0处理
+ 使用计时器不断移动位置并记录好
    + 当走过的格数等于我们设定的值时，应该随机或者调取接口获得我们中奖位置
    + 当走过的格数少于我们设定的值时，加快我们的转盘速度（计时器调用速度）
    + 当走过的格数超过我们设定的值时，减慢转盘速度
    + 转盘速度保持一个最大及最小值
