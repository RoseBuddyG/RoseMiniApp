Page({
  data: {
    array: ['市值', 'PE', 'ROE', '换手率'],
    crossArray: ['无', '一天前', '两天前', '三天前', '四天前', '五天前'],
    listData: [],
    arrIndex: 0,
    index: 0,
    crossIndex: 0,
    year: "2022",
    month: "03",
    day: "20"
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value,
    });
  },
  bindCrossPickerChange(e) {
    console.log('cross picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      crossIndex: e.detail.value,
    });
  },
  onSubmit(e) {
    var array = ['value', 'PE', 'ROE', 'change_per'];
    var month = e.detail.value.date_m.toString();
    if (e.detail.value.date_m < 10) {
      month = "0"+e.detail.value.date_m.toString();
    }
    var day = e.detail.value.date_d.toString();
    if (e.detail.value.date_d < 10) {
      day = "0" + e.detail.value.date_d.toString();
    }
    e.detail.value.date = e.detail.value.date_y + month + day;
    if (e.detail.value.switch) {
      e.detail.value.desc = 1;
    }
    e.detail.value.order = array[e.detail.value.order];
    let that = this;
    dd.httpRequest({
      url:"http://42.192.51.240:8090/stocks/select",
      method: "POST",
      data: e.detail.value,
      dataType: 'json',
      success: function(res) {
        if (JSON.parse(res.originalData).length > 0) {
          that.setData({
            'listData': JSON.parse(res.originalData),
          });
        } else {
          dd.alert({content:"response is empty"});
        }
        
      },
      fail: function(res) {
        dd.alert({content: 'request failed: ' + JSON.stringify(res)});
      }
    });
    
  },
  onReset() {
    this.setData({
      index: 0,
      crossIndex: 0,
    });
  },
  onClick(e) {
    
  },
  tap() {
    console.log('tap');
  },
  onLoad() {
    console.log("onLoad");
    var date = new Date();
    date.setTime(date.getTime()-24*60*60*1000);
    var myYear = date.getFullYear();
    var myMonth = date.getMonth()+1;
    var myDay = date.getDate();
    this.setData({
      year: myYear,
      month: myMonth,
      day: myDay
    });
  },
  onClickDC(e) {
    dd.navigateTo({
      url: `../webview/webview?ref=${e.target.dataset.ref}`
    })
  }
});
