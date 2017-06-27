//logs.js
Page({
  data: {
    logs: []
  },
  onLoad: function () {
   
  },
  open: function () {
    wx.showActionSheet({
      itemList: ['确认拨打'],
      success: function (res) {
        wx.makePhoneCall({
          phoneNumber: '15735804259' 
        })
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  }
})
