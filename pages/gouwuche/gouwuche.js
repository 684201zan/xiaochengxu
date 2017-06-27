var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data:{
    // 购物车数据
    shops: [], //商品数据
    tabs: ["商品", "商家", "评论"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    src:"../../images/ci_01.jpg",
    src1:"../../images/invoice_b.png",
    src2: "../../images/bright_kitchen_b.png",
    src3: "../../images/certification_b.png",
    src4: "../../images/pay_b.png",
    title:"玺之家",
    total: {
      counts:0,
      money: 0
    }
    },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  // 购物车
  onShow: function () {
    this.setData({
      hasList: true,
      shops: [
        {id: 1, title: '三军大会师国玺', num:0, price:8000, src: "../../images/ci_01.jpg",count:0},
        {id: 2, title: '长征宝玺', num:0, price:3000, src: "../../images/ci_01.jpg",count:0 }
      ]
    });
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
//  打电话
phonecall:function(e){
  wx.makePhoneCall({
     phoneNumber: '15735804259' 
  })
},


selectMenu: function (event) {
  let data = event.currentTarget.dataset
  this.setData({
    toView: data.tag,
    selectedMenuId: data.id
  })
  // this.data.toView = 'red'
},
addCount: function (event) {
  let data = event.currentTarget.dataset
  let total = this.data.total
  let menus=this.data.shops
  let menu=menus.find(function(v){
    return v.id == data.id
  })
    menu.count += 1
    total.counts+=1
    total.money += menu.price
  this.setData({
      'shops':menus,
      'total': total
 })
  console.log(menu)
  
},
minusCount: function (event) {
  let data = event.currentTarget.dataset
  let total = this.data.total
  let menus = this.data.shops
  let menu = menus.find(function (v) {
    return v.id == data.id
  })
  if (menu.count <=0){
    return;
  }
    
  menu.count -= 1;
  total.counts -= 1
  total.money -= menu.price
  this.setData({
    'shops':menus,
    'total': total
  })
},
  tiaozhuan:function(e){
    let total = this.data.total
    console.log()
    wx.navigateTo({
      url:'map/map?money=total.money'
    })
  }

})



