// pages/tobebroker/tobebroker.js
var citys= require('../../utils/city.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['陕西省','西安市','新城区'],
    customItem: '全部',
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [], //下拉列表的数据
    index: -1, //选择的下拉列 表下标,
    storeshow: false,
    checked:false,
    form: {
      $type: '',
      province_id: '',
      city_id: '',
      area_id: '',
      store_id: '',
      cert_cover: '',
      hand_cover: ''
    },
    file1: {
      loading: false,
      url: ''
    },
    file2: {
      loading: false,
      url: ''
    },
    agreement: false,
    brokerisSuccess:false,
    userinfo:""
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
      'form.store_id':e.currentTarget.dataset.id
    });
    console.log(this.data.selectData)
  },
  //显示选择门店
  radioChange(){
    var that =this
    that.setData({
      storeshow:true,
      checked:true
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        wx.request({
          url: 'https://app.zhaihang.com/api/cert/getStore', 
          data: {
            area_id: that.data.form.area_id
          },
          header: {
            'content-type': 'application/json',
            'token' : res.data
          },
          success(res) {
            console.log(res.data.data)
            that.setData({
              selectData:res.data.data
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          userinfo:res.data
        })
      },
    })
    wx.getStorage({
      key: 'brokerisSuccess',
      success: function(res) {
        that.setData({
          brokerisSuccess:res.data
        })
        console.log(that.data.brokerisSuccess)
      },
    })
    this.getcode()
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.getcode()
  },
  getcode(){
    var prov = this.data.region[0];
    var city = this.data.region[1];
    var area = this.data.region[2];
    // console.log(citys.prov)
    // console.log(citys.city)
    // console.log(citys.area)
    for (var i = 0; i < citys.prov.length; i++) {
      if (prov == citys.prov[i].name) {
        // console.log(citys.prov[i].code)
        this.setData({
          'form.province_id': citys.prov[i].code
        })
      }
    }
    for (var i = 0; i < citys.city.length; i++) {
      if (city == citys.city[i].name && citys.city[i].provinceCode == this.data.form.province_id) {
        // console.log(citys.city[i].code)
        this.setData({
          'form.city_id': citys.city[i].code
        })
      }
    }
    for (var i = 0; i < citys.area.length; i++) {
      if (area == citys.area[i].name && citys.area[i].provinceCode == this.data.form.province_id && citys.area[i].cityCode == this.data.form.city_id) {
        // console.log(citys.area[i].code)
        this.setData({
          'form.area_id': citys.area[i].code
        })
      }
    }
  },
  //选择身份证照片
  selectedimg(e, type) {
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
        // console.log(tempFilePaths)
        if (type == 1) {
          that.setData({
            'file1.url': tempFilePaths[0],
          })
          that.uploadimg(that.data.file1.url, type)
        } else if (type == 2) {
          that.setData({
            'file2.url': tempFilePaths[0],
          })
          that.uploadimg(that.data.file2.url, type)
        }
      }
    })
  },
  uploadimg(imgurl, type) {
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
            // console.log(res)
            var resdata = JSON.parse(res.data);
            if (type == 1) {
              that.setData({
                'form.cert_cover': 'http://pic12.zhaihang.com' + resdata.data.url
              })
            } else if (type == 2) {
              that.setData({
                'form.hand_cover': 'http://pic12.zhaihang.com' + resdata.data.url
              })
            }

          }
        })
      }
    })
  },
  //agreementbtn
  agreementbtn(){
    this.setData({
      agreement:true
    })
  },
  // 发送
  sendtobebroker(){
    var that = this;
    if (that.data.form.province_id==""||that.data.form.city_id==""||that.data.form.area_id==""){
      wx.showToast({
        title: '请选择省市区',
        icon:'none'
      })
    } else if (that.data.form.store_id == ""){
      wx.showToast({
        title: '请选择所在门店',
        icon:'none'
      })
    } else if (that.data.form.cert_cover==""||that.data.form.hand_cover==""){
      wx.showToast({
        title: '请选择从业资格证',
        icon:'none'
      })
    }else if(that.data.agreement==false){
      wx.showToast({
        title: '请选择是否同意经纪人相关协议',
        icon:'none'
      })
    }else{
      wx.getStorage({
        key: 'token',
        success: function (res) {
          // console.log(res.data)
          wx.request({
            url: 'https://app.zhaihang.com/api/cert/broker',
            data: {
              province_id:that.data.form.province_id,
              city_id :that.data.form.city_id,
              area_id :that.data.form.area_id,
              store_id :that.data.form.store_id,
              cert_cover :that.data.form.cert_cover,
              hand_cover :that.data.form.hand_cover
            },
            header: {
              'content-type': 'application/json',
              'token': res.data
            },
            success(res) {
              console.log(res.data)
              that.setData({
                brokerisSuccess:true
              })
              wx.setStorage({
                key: 'brokerisSuccess',
                data: that.data.brokerisSuccess,
              })
              wx.showToast({
                title: '您的资料已发布，请等待审核',
              })
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        }
      })
    }
  },
  backtoprev(){
    wx.navigateBack({
      delta: 1,
    })
  }
})
