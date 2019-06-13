//获取应用实例
var app =getApp();
Page({
    data: {
        
    },

    todiscoverDetail(e) {
      var discoverid = e.currentTarget.dataset.discoverid;
      wx.navigateTo({
        url: '/pages/discoverdetail/discoverdetail?id=' + discoverid
      })
    },
    onLoad:function(){
      var that=this;
      that.getdiscoverlist();
    },
    getdiscoverlist: function () {
      var that = this;
      wx.request({
        url: 'https://app.zhaihang.com/api/article/articleList',
        data: {

        },
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
        success: function (res) {
          app.globalData.article = res.data.data;
          console.log(res.data.data.list)
          that.setData({
            articlelist: res.data.data.list
          })
        },
        fail: function () {
          console.log("error")
        }
      })
    },
});
