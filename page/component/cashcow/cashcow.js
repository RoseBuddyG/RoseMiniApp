Page({
  data: {
    listData: [],
    arrIndex: 0,
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
    let that = this;
    dd.httpRequest({
      url:"http://42.192.51.240:8090/stocks/dividend",
      method: "POST",
      data: e.detail.value,
      dataType: 'json',
      success: function(res) {
        if (Object.keys(JSON.parse(res.originalData)).length > 0) {
          var oriData = JSON.parse(res.originalData);
          that.setData({
            'listData': oriData,
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

   onLoad() {
    console.log("onLoad");
    var date = new Date();
    date.setTime(date.getTime()-91*24*60*60*1000);
    var myYear = date.getFullYear()-1;
    this.setData({
      year: myYear,
    });
  },

  onClickDC(e) {
    dd.navigateTo({
      url: `../webview/webview?ref=${e.target.dataset.ref}`
    })
  }
});