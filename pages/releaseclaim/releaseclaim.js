// pages/releaseclaim/releaseclaim.js
var citys = require('../../utils/city.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      {
        id: 1, name: '债权人'
      },
      {
        id: 2, name: '债务人'
      },
      {
        id: 3, name: '经纪人'
      }
    ],
    date: '2016-09-01',
    region: ['陕西省', '西安市', '新城区'],
    customItem: '全部',
    brokerlists:[],
    claimType: {},
    appealType: {},
    form: {
      type:1,
      debt_man: '',
      debt_mobile: '',
      claim_man: '',
      claim_mobile: '',
      claim_type_ids: [],
      appeal_type_ids: [],
      amount: '',
      interest: '',
      expire_type: '1',
      expire_text:"年",
      loan_expire: '',
      reward_type: '',
      reward_amount: '',
      province_id: '',
      city_id: '',
      area_id: '',
      memo: '',
      front_cover: '',
      back_cover: '',
      files: [],
      is_publish: '',
      is_invite: '',
      brokers: '',
      loan_time: '',
      loan_purpose: '',
      overdue_memo: ''
    },
    agreementzr:false,
    publish:1,
    invite:1,
    file1: {
      loading: false,
      url: ''
    },
    file2: {
      loading: false,
      url: ''
    },
    file:{
      file1url:"",
      file2url:""
    },
    step_1:true,
    step_2:false,
    step_3:false,
    viewagree:false,
    claim_type_ids_1:"",
    claim_type_ids_2:'',


    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //获取标签
    wx.getStorage({
      key: 'token',
      success: function(res) {
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/getClaimType', 
          data: {
            
          },
          header: {
            'content-type': 'application/json', // 默认值
            'token':res.data
          },
          success(res) {
            console.log(res.data.data);
            that.setData({
              claimType: res.data.data,
            })
            // console.log(that.data.claimType)
          }
        })
      },
    })
    //claim/getAppealType
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/getAppealType',
          data: {

          },
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            that.setData({
              appealType:res.data.data
            })
            // console.log(that.data.appealType)
          }
        })
      },
    })
  },
  //省市区

  getcode() {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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
  bindtype(e){
    var that = this;
    // that.data.form.type=e.currentTarget.dataset.type;
    that.setData({
      'form.type': e.currentTarget.dataset.type
    })
  },
  claimmanblur(e){
    var that = this
    that.setData({
      'form.claim_man':e.detail.value
    })
    // console.log(that.data.form.claim_man)
  },
  claimmobileblur(e) {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (myreg.test(e.detail.value)){
      that.setData({
        'form.claim_mobile': e.detail.value
      })
      // console.log(that.data.form.claim_mobile)
    }else{
      wx.showToast({
        title: '手机号码有误，请重新输入',
        icon:'none'
      })
    }
    
  },
  debtmanblur(e) {
    var that = this
    that.setData({
      'form.debt_man':e.detail.value
    })
    // console.log(that.data.form.debt_man)
  },
  debtmobileblur(e) {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (myreg.test(e.detail.value)) {
      that.setData({
        'form.debt_mobile': e.detail.value
      })
      // console.log(that.data.form.debt_mobile)
    } else {
      wx.showToast({
        title: '手机号码有误，请重新输入',
        icon: 'none'
      })
    }
  },
  loantime(e) {
    var that = this
    that.setData({
      'form.loan_time':that.data.date
    })
  },
  //地点
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.getcode()
  },
  //日期
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //post1
  post1(){
    var that = this;
    // console.log(that.data.form)
    if (that.data.form.claim_man==""){
      wx.showToast({
        title: '请输入债权人姓名',
        icon:'none'
      })
    }else if(that.data.form.claim_mobile==""){
      wx.showToast({
        title: '请输入债权人手机号码',
        icon: 'none'
      })
    }else if(that.data.form.debt_man==""){
      wx.showToast({
        title: '请输入债务人姓名',
        icon: 'none'
      })
    }else if(that.data.form.debt_mobile==""){
      wx.showToast({
        title: '请输入债务人手机号码',
        icon: 'none'
      })
    } else if (that.data.form.loan_time==""){
      wx.showToast({
        title: '请选择借款日期',
        icon: 'none'
      })
    }else if(that.data.form.province_id==""||that.data.form.city_id==""||that.data.area_id==""){
      wx.showToast({
        title: '请选择借款地点',
        icon: 'none'
      })
    }else{
      that.setData({
        step_1:false,
        step_2:true
      })
    }
  },
  amountblur(e){
    var that = this;
    that.setData({
      'form.amount':e.detail.value
    })
  },
  interestblur(e){
    var that = this;
    that.setData({
      'form.interest':e.detail.value
    })
  },
  selectexpiretype(e){
    console.log(e.currentTarget.dataset.type)
    this.setData({
      'form.expire_type': e.currentTarget.dataset.type
    })
    if(this.data.form.expire_type==1){
      this.setData({
        'form.expire_text':"年"
      })
    } else if (this.data.form.expire_type ==2){
      this.setData({
        'form.expire_text': "月"
      })
    }else{
      this.setData({
        'form.expire_text': "日"
      })
    }
  },
  loanexpireblur(e){
    this.setData({
      'form.loan_expire':e.detail.value
    })
  },
  loanpurposeblur(e){
    this.setData({
      'form.loan_purpose':e.detail.value
    })
  },
  overduememoblur(e){
    this.setData({
      'form.overdue_memo':e.detail.value
    })
  },
  post2(){
    if (this.data.form.amount==""){
      wx.showToast({
        title: '请输入借款金额',
        icon:'none'
      })
    } else if (this.data.form.interest==""){
      wx.showToast({
        title: '请输入利息',
        icon: 'none'
      })
    } else if (this.data.form.expire_type==""){
      wx.showToast({
        title: '请选择借款周期类型',
        icon: 'none'
      })
    } else if (this.data.form.loan_expire==""){
      wx.showToast({
        title: '请输入借款周期',
        icon: 'none'
      })
    }else{
      this.setData({
        step_2:false,
        step_3:true
      })
    }
  },
  claimtype1(e){
    this.setData({
      'form.claim_type_ids_1':e.currentTarget.dataset.id,
      // 'form.claim_type_ids': [this.data.form.claim_type_ids_1]
    })
  },
  claimtype2(e){
    this.setData({
      'form.claim_type_ids_2': e.currentTarget.dataset.id,
      'form.claim_type_ids': [this.data.form.claim_type_ids_1, e.currentTarget.dataset.id]
    })
  },
  // appealbtn(e){
  //   console.log(e.currentTarget.dataset.id)
  //   var Index = e.currentTarget.dataset.key;
  //   for (var i = 0; i < this.data.form.appeal_type_ids.length;i++){
  //     if (this.data.form.appeal_type_ids[i] == e.currentTarget.dataset.id){
  //       this.setData({
  //         appeal_type_ids:this.data.appeal_type_ids.splice(Index, 1)
  //       })
  //     }else{
  //       this.setData({
  //         appeal_type_ids: this.data.appeal_type_ids.concat(e.currentTarget.dataset.id)
  //       })
  //       console.log(this.data.form.appeal_type_ids)
  //     }
  //   }
  // }
  appealbtn(e){
    var appeal =[];
    appeal.push(e.currentTarget.dataset.id)
    this.setData({
      'form.appeal_type_ids': appeal
    })
    console.log(appeal)
    
  },
  selectfujian(e){
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
                'file1.url':  resdata.data.url
              })
            } else if (type == 2) {
              that.setData({
                'file2.url':  resdata.data.url
              })
            }
            that.setData({
              'form.files': [that.data.file1.url, that.data.file2.url],
              "file.file1url": 'http://pic12.zhaihang.com' + that.data.file1.url,
              "file.file2url": 'http://pic12.zhaihang.com' + that.data.file2.url,
            })

          }
        })
      }
    })
  },
  memoblur(e){
    this.setData({
      memo:e.detail.value
    })
  },
  ispublish(e){
    if(e.currentTarget.dataset.type==1){
      this.setData({
        is_publish:true,
        publish:1
      })
    }else{
      this.setData({
        is_publish: false,
        publish:2
      })
    }
  },
  isinvite(e){
    if(e.currentTarget.dataset.type==1){
      this.setData({
        is_invite: true,
        invite:1
      })
    }else{
      this.setData({
        is_invite: false,
        invite:2
      })
    }
  },
  agreementzr(){
    this.setData({
      agreementzr:true
    })
  },
  is_invitebroker(){
    if (this.data.form.claim_type_ids==""){
      wx.showToast({
        title: '请选择债权种类',
        icon: 'none'
      })
    } else if (this.data.form.appeal_type_ids==""){
      wx.showToast({
        title: '请选择诉求方式',
        icon: 'none'
      })
    }else if(this.data.form.files==""){
      wx.showToast({
        title: '请上传附件',
        icon: 'none'
      })
    } else if (this.data.agreementzr==false){
      wx.showToast({
        title: '请选择是否同意债权转让相关协议',
        icon:'none'
      })
    }else{
      if (this.data.form.is_invite == true || this.data.invite==1){
        var form = this.data.form;
        var that = this;
        console.log(form)
        wx.getStorage({
          key: 'token',
          success: function (res) {
            console.log(res.data)
            console.log(that.data.form)
            var data1 = {}
            data1.type = that.data.form.type;
            data1.claim_man = that.data.form.claim_man;
            data1.claim_mobile = that.data.form.claim_mobile;
            data1.debt_man = that.data.form.debt_man;
            data1.debt_mobile = that.data.form.debt_mobile;
            data1.loan_time = that.data.form.loan_time;
            data1.province_id = that.data.form.province_id;
            data1.city_id = that.data.form.city_id;
            data1.area_id = that.data.form.area_id;
            data1.amount = that.data.form.amount;
            data1.interest = that.data.form.interest;
            data1.expire_type = that.data.form.expire_type;
            data1.loan_expire = that.data.form.loan_expire;
            data1.loan_purpose = that.data.form.loan_purpose;
            data1.overdue_memo = that.data.form.overdue_memo;
            // data1.appeal_type_ids=that.data.form.appeal_type_ids;
            // data1.files=that.data.form.files;
            data1.memo = that.data.form.memo;
            data1.reward_type = that.data.form.reward_type;
            data1.reward_amount = that.data.form.reward_amount;
            data1.is_publish = that.data.form.is_publish;
            data1.is_invite = that.data.form.is_invite
            for (var i = 0; i < that.data.form.claim_type_ids.length; i++) {
              data1["claim_type_ids[" + i + "]"] = that.data.form.claim_type_ids[i];
            }
            for (var j = 0; j < that.data.form.files.length; j++) {
              data1["files[" + j + "]"] = that.data.form.files[j];
            }
            for (var k = 0; k < that.data.form.appeal_type_ids.length; k++) {
              data1["appeal_type_ids[" + k + "]"] = that.data.form.appeal_type_ids[k];
            }
            wx.request({
              url: 'https://app.zhaihang.com/api/claim/publish',
              data: data1,
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'token': res.data
              },
              success(res) {
                console.log(res.data)
                console.log('债事id='+res.data.data)
                wx.navigateTo({
                  url: '/pages/choosebroker/choosebroker?claim_id=' + res.data.data,
                })
              }
            })
          },
        })

      } else if (this.data.form.is_invite == false) {
        var form = this.data.form;
        var that = this;
        console.log(form)
        wx.getStorage({
          key: 'token',
          success: function(res) {
            console.log(res.data)
            console.log(that.data.form)
            var data1 = {}
            data1.type = that.data.form.type;
            data1.claim_man=that.data.form.claim_man;
            data1.claim_mobile=that.data.form.claim_mobile;
            data1.debt_man=that.data.form.debt_man;
            data1.debt_mobile=that.data.form.debt_mobile;
            data1.loan_time=that.data.form.loan_time;
            data1.province_id=that.data.form.province_id;
            data1.city_id=that.data.form.city_id;
            data1.area_id=that.data.form.area_id;
            data1.amount=that.data.form.amount;
            data1.interest=that.data.form.interest;
            data1.expire_type=that.data.form.expire_type;
            data1.loan_expire=that.data.form.loan_expire;
            data1.loan_purpose=that.data.form.loan_purpose;
            data1.overdue_memo=that.data.form.overdue_memo;
            // data1.appeal_type_ids=that.data.form.appeal_type_ids;
            // data1.files=that.data.form.files;
            data1.memo=that.data.form.memo;
            data1.reward_type=that.data.form.reward_type;
            data1.reward_amount=that.data.form.reward_amount;
            data1.is_publish=that.data.form.is_publish;
            data1.is_invite=that.data.form.is_invite
            for (var i = 0; i < that.data.form.claim_type_ids.length; i++) {
              data1["claim_type_ids[" + i + "]"] = that.data.form.claim_type_ids[i];
            }
            for(var j=0;j<that.data.form.files.length;j++){
              data1["files[" + j + "]"] = that.data.form.files[j];
            }
            for (var k = 0; k < that.data.form.appeal_type_ids.length; k++) {
              data1["appeal_type_ids[" + k + "]"] = that.data.form.appeal_type_ids[k];
            }
            wx.request({
              url: 'https://app.zhaihang.com/api/claim/publish', 
              data: data1,
              method:'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'token':res.data
              },
              success(res) {
                console.log(res.data)

                wx.showToast({
                  title: '添加成功',
                })
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          },
        })
      }
    }
  }
})