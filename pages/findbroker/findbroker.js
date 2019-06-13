// pages/findbroker/findbroker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brokerlists:[],
    currentId: '1',
    section: [{
      name: '全部',
      typeId: '1'
    }, {
      name: '价格',
      typeId: '2'
    }, {
      name: '评价',
      typeId: '3'
    }],
    showprice:true,
    showlist:false
  }, 
  // tabChange({ detail }) {
  //   this.setData({
  //     currentId: detail.key
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getbrokerlists();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getbrokerlists(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'https://app.zhaihang.com/api/broker/lists',
          data: {
           
          },
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            // console.log(res.data.data.list)
            that.setData({
              brokerlists: res.data.data.list
            })
          }
        })
      },
    })
  },
  // 跳转到经纪人详情
  tobrokerdetail(e){
    wx.navigateTo({
      url: '/pages/brokerdetail/brokerdetail?id='+e.currentTarget.dataset.id,
    })
  },
  //点击每个导航的点击事件
  handleTap: function (e) {
    let id = e.currentTarget.dataset.id;
      this.setData({
        currentId: id
      })
    if (id=2){
      this.setData({
        showprice:true,
        showlist:false
      })
    }
  },
  priceselect(e){
    this.setData({
      showprice:false,
      showlist:true
    })
    
  }
})