/*
  created by suky 19/07/05
  父元素及子元素及点击按钮的元素都能够自己定义
  抽奖次数也是我们自己定义
  但 我们物体运动时动画类名设定为active
*/
var lottery = {
  count:0,//一共有多少个子元素
  index:-1,//当前位置
  cycle:50,//抽奖前应该转多少格
  times:0,//计算走过的格数
  speed:200,//控制转盘的速度
  originSpeed:200,//原始速度
  timer:0,//记录计数器的id
  prize:-1,//中奖位置
  click:true,//能否被点击
  drawsNum:0,//设置用户能抽奖的次数
  init:function(parent,children,clickBtn,drawsNum){
    this.$lottery = $(parent)
    this.$lotteryUnit = $(children)
    this.count = this.$lotteryUnit.length
    //add listener
    $(clickBtn).on('click',() => {
      this.roll()
    })
  },
  moveIndex:function(){
    this.$lotteryUnit.eq(this.index).removeClass('active')
    this.index += 1
    if(this.index > this.count - 1){
      this.index = 0
    }
    this.$lotteryUnit.eq(this.index).addClass('active')
  },
  roll:function(){
    if(drawsNum = 0 ){
      alert('你没有抽奖次数了')
    }
    this.times += 1
    this.moveIndex()
    this.click = false
    //转动圈圈
    if(this.times > this.cycle + 10 && this.prize==this.index){
      clearTimeout(this.timer)
      this.click = true
      this.prize = -1
      this.times = 0
      this.speed = this.originSpeed
      this.drawsNum -= 1
    }else{
      if(this.times < this.cycle){
        this.speed -= 10
      }
      if(this.times == this.cycle){
        this.prize = getPrize()
      }
      if(this.times > this.cycle){
        this.speed += 80
      }
      if(this.speed < 40){
        this.speed = 40
      }
      if(this.speed > 300){
        this.speed = 300
      }
      this.timer = setTimeout(() => {
        this.roll()
      },this.speed)
    }
    return
  }
}

function getPrize(){
  return Math.random()*(lottery.count)|0
}


lottery.init('#lottery','.lottery-unit','#getPrize',2)
