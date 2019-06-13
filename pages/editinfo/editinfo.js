// pages/editinfo/editinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:"",
    token:"",
    photo:"",
    form:{
      pic:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getuserinfo();
  },
  getuserinfo() {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success(res) {
        // console.log(res.data)
        that.setData({
          userinfo: res.data
        })
      }
    })
    
  },
  setuserinfostorage(){
    var that = this;
    wx.setStorage({
      key: 'userinfo',
      data: that.data.userinfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getuserinfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getuserinfo();

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
  getheadimg(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          photo: res.tempFilePaths
        })
        // console.log(res.tempFilePaths)
        wx.getStorage({
          key: 'token',
          success: function (res) {
            // console.log(res.data)
            wx.uploadFile({
              url: 'https://app.zhaihang.com/api/common/upload',
              filePath: that.data.photo[0],
              name: 'file',
              formData: {
                userinfo: that.data.userinfo
              },
              header: {
                'content-type': 'application/json', // 默认值
                'token': res.data
              },
              success(res) {
                // console.log(res)
                var resdata = JSON.parse(res.data);
                that.setData({
                  'form.pic': resdata.data.url,
                  'userinfo.avatar': 'http://pic12.zhaihang.com' + resdata.data.url
                })
                that.setuserinfostorage();
                that.resetuserinfo();
                that.onLoad()
              }
            })
          }
        })
      }
    })
  },
  resetuserinfo(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          token: res.data
        })
        wx.request({
          url: 'https://app.zhaihang.com/api/user/profile',
          data: {
            avatar: that.data.form.pic,
            nickname: that.data.userinfo.nickname,
            bio: that.data.userinfo.bio,
            gender: that.data.userinfo.gender
          },
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token':res.data
          },
          success(res) {
            // console.log(res.data)
            that.onLoad();
          }
        })
      },
    })
    
  },
  setsex(){
    var that = this
    wx.showActionSheet({
      itemList: ['男', '女'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex==0){
          that.data.userinfo.gender = 1
          that.setuserinfostorage();
          that.onLoad();
          that.resetuserinfo();
        }else if(res.tapIndex==1){
          that.data.userinfo.gender = 2
          that.setuserinfostorage();
          that.onLoad();
          that.resetuserinfo();
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  editnickname(){
    wx.navigateTo({
      url: '/pages/editnickname/editnickname',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  setbio(){
    wx.navigateTo({
      url: '/pages/editownbio/editownbio',
    })
  }

})