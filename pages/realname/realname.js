// pages/realname/realname.js

// const uploadimg = require("../../utils/index.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    form: {
      cert_type: '1',
      real_name: '',
      cert_code: '',
      front_cover: '',
      back_cover: '',
      hand_cover: ''
    },
    errMsg: '',
    file1: {
      loading: false,
      url: ''
    },
    file2: {
      loading: false,
      url: ''
    },
    file3: {
      loading: false,
      url: ''
    },
    isSuccess: true,
    // photo:"",
    userinfo:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const state = options.state;
    console.log(state);
    that.setData({
      isSuccess:state
    })
   
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          userinfo:res.data
        })
      },
    })
    wx.getStorage({
      key: 'isSuccess',
      success: function(res) {
        that.setData({
          isSuccess:res.data
        })
      },
    })
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
  //姓名失焦
  nameblur(e){
    var that = this;
    that.setData({
      'form.real_name':e.detail.value
    })
    // console.log(that.data.form.real_name)
  },
  codeblur(e){
    var that = this;
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e.detail.value))) {
      wx.showToast({
        title: '身份证号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }else{
      that.setData({
        'form.cert_code': e.detail.value
      })
    }
    console.log(that.data.form.cert_code)
  },
  //返回
  backtoprev(){
    wx.navigateBack({
      delta: 1,
    })
  },
  //选择身份证照片
  selectedimg(e,type){
    var that = this
    var type = e.currentTarget.dataset['type'];
    console.log(type)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        if(type==1){
          that.setData({
            'file1.url': tempFilePaths[0],
          })
          that.uploadimg(that.data.file1.url,type)
        } else if (type == 2) {
          that.setData({
            'file2.url': tempFilePaths[0],
          })
          that.uploadimg(that.data.file2.url, type)
        } else {
          that.setData({
            'file3.url': tempFilePaths[0],
          })
          that.uploadimg(that.data.file3.url, type)
        }
      }
    })
  },
  uploadimg(imgurl,type){
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        wx.uploadFile({
          url: 'https://app.zhaihang.com/api/common/upload',
          filePath: imgurl,
          name: 'file',
          formData: {
            userinfo: that.data.userinfo
          },
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            console.log(res)
            var resdata = JSON.parse(res.data);
            if(type==1){
              that.setData({
                'form.front_cover': 'http://pic12.zhaihang.com'+resdata.data.url
              })
            }else if(type==2){
              that.setData({
                'form.back_cover': 'http://pic12.zhaihang.com' +resdata.data.url
              })
            }else{
              that.setData({
                'form.hand_cover': 'http://pic12.zhaihang.com' +resdata.data.url
              })
            }

          }
        })
      }
    })
  },
  sendrealname(){
    var that = this;
    wx.setStorage({
      key: 'isSuccess',
      data: that.data.isSuccess,
    })
    if (that.data.form.real_name==""){
      wx.showToast({
        title: '请填写姓名',
        icon:'none'
      })
    } else if (that.data.form.cert_code==""){
      wx.showToast({
        title: '请填写身份证号',
        icon: 'none'
      })
    } else if (that.data.form.front_cover==""){
      wx.showToast({
        title: '请上传身份证正面照片',
        icon: 'none'
      })
    }else if(that.data.form.back_cover==""){
      wx.showToast({
        title: '请上传身份证反面照片',
        icon: 'none'
      })
    } else if (that.data.form.hand_cover == ""){
      wx.showToast({
        title: '请上传手持身份证照片',
        icon: 'none'
      })
    }else{
      wx.getStorage({
        key: 'token',
        success: function (res) {
          // console.log(res.data)
          that.setData({
            token: res.data
          })
          wx.request({
            url: 'https://app.zhaihang.com/api/cert/publish',
            data: {
              cert_type: that.data.form.cert_type,
              real_name: that.data.form.real_name,
              cert_code: that.data.form.cert_code,
              front_cover: that.data.form.front_cover,
              back_cover: that.data.form.back_cover,
              hand_cover: that.data.form.hand_cover
            },
            method: "GET",
            header: {
              'content-type': 'application/json', // 默认值
              'token': res.data
            },
            success(res) {
              console.log(res.data)
              if(res.data.code==1){
                that.setData({
                  isSuccess: false,
                })
                if(userinfo){
                  wx.setStorage({
                    key: 'isSuccess',
                    data: that.data.isSuccess,
                  })
                }
              }
            }
          })
        },
      })
    }
    
  }

})