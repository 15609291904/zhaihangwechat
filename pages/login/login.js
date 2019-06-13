// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusinput1: false,
    focusinput2: false,
    mobilephone:"",
    yanzhengnum:"",
    captchaTime: 0,
    captcha:false,
    userinfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getmobile(e) {
    let mobile = e.currentTarget.dataset.mobile;
    let nameMap = {}
    nameMap[mobile] = e.detail && e.detail.value
    this.setData({
      mobilephone: nameMap.mobilephone
    })
    // console.log(this.data.mobilephone)
  },
  focus1(e){
    this.setData({
      focusinput1: true,
    })
  },
  blur1(e){
    this.setData({
      focusinput1: false,
    })
    // console.log(this.data.mobilephone)
    if (this.data.mobilephone == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })

      return false
    }
    else if (this.data.mobilephone.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
     var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.mobilephone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },
  focus2(e) {
    this.setData({
      focusinput2: true
    })
  },
  changebtn(e) {
    let yanzheng = e.currentTarget.dataset.yanzheng;
    let nameMap = {}
    nameMap[yanzheng] = e.detail && e.detail.value
    this.setData({
      yanzhengnum: nameMap.yanzhengnum,
      background: "#F6A802"
    })
    // console.log(this.data.yanzhengnum);
  },
  blur2(e) {
    this.setData({
      focusinput2: false,
    })
    if (this.data.yanzhengnum == '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1500
      })

      return false
    }
    else if (this.data.yanzhengnum.length != 4) {
      wx.showToast({
        title: '验证码长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    var regyanzheng = /^[0-9]{4}$/;
    if (!regyanzheng.test(this.data.yanzhengnum)) {
      wx.showToast({
        title: '验证码有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  }, 
  toregagreement(){
    wx.navigateTo({
      url: '/pages/regagreement/regagreement'
    })
  },
  //获取验证码
  getyzm(e){
    var that = this;
    if(that.data.mobilephone==""){
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.request({
        url: 'https://app.zhaihang.com/api/sms/send?mobile=' + that.data.mobilephone,
        data: {

        },
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 1500
            })
            that.setData({
              captchaTime:60,
              captcha:true
            })
            if (that.data.captcha == true) {
              console.log(that.data.captchaTime)
              var captchaTime1 = setInterval(() => {
                    // var captchaTime = that.data.captchaTime - 1
                    that.setData({
                      // captchaTime: that.data.captchaTime.push(captchaTime) 
                      captchaTime: that.data.captchaTime - 1
                      });
                    if (that.data.captchaTime <= 0){
                      window.clearInterval(captchaTime1);
                      that.data.captcha=false
                    } else if (that.data.userinfo != "") {
                      window.clearInterval(captchaTime1);
                      that.data.captcha = false
                    }

                }, 1000)
            }
          } else if (res.data.code == 0) {
            wx.showToast({
              title: '发送频繁',
              icon: 'none',
              duration: 1500
            })
          }
          // this.setData({

          // })
        },
        fail: function () {
          console.log("error")
        }
      })
    }
  },
  loginbtn(){
    var that = this;
    wx.request({
      url: 'https://app.zhaihang.com/api/user/mobilelogin',
      data: {
        mobile: that.data.mobilephone,
        captcha: that.data.yanzhengnum
      },
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        console.log(res)
        that.setData({
          userinfo: res.data.data.userinfo
        })
        if(res.data.code==1){
          wx.setStorage({
            key: 'userinfo',
            data: that.data.userinfo
          })
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500
          });

          wx.setStorage({
            key: 'token',
            data: that.data.userinfo.token
          })
          that.tomine();
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 1500
          })
        }
        // this.setData({

        // })
      },
      fail: function () {
        console.log("error")
      }
    })
  },
  tomine() {
    wx.navigateBack({
      url: 'pages/mine/mine'
    })
  }

})