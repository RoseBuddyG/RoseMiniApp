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
    day: "20",
  },

  onInitChart(F2, config, optsData) {
    console.log("onInitChart");
    console.log(optsData);
    const chart = new F2.Chart(config);
    var data = optsData.props.opts;
    var min_price = data[0].price_end;
    var max_price = data[0].price_end;
    for (let i in data) {
      if (min_price > data[i].price_end) {
        min_price = data[i].price_end
      }
      if (max_price < data[i].price_end) {
        max_price = data[i].price_end
      }
    }
    var offset = (max_price-min_price) * 0.15
    console.log(min_price, max_price, offset);

    chart.source(data, {
      date: {
        range: [0, 1],
        alias: '日期',
        type: 'timeCat',
        tickCount: 5,
        mask: 'MMDD'
      },
      price_end: {
        range: [0, 1],
        alias: '收盘价',
        type: 'linear',
        min: min_price-offset,
        max: max_price+offset,
        tickCount: 5
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      onShow: function onShow(ev) {
        var items = ev.items;
        var date = items[0].title;
        var price = items[0].value;
        items[0].name = '日期';
        items[0].value = date;
        items[1] = {
          marker: {
            fill: 'black',
            radius: 3,
            symbol: "circle",
            lineWidth: 1,
            stroke: "#fff"
          },
          x: items[0].x,
          y: items[0].y,
          name: '收盘价',
          value: price
        }
        items[2] = {
          marker: {
            fill: 'gray',
            radius: 3,
            symbol: "circle",
            lineWidth: 1,
            stroke: "#fff"
          },
          x: items[0].x,
          y: items[0].y,
          name: 'ma20',
          value: items[0].origin.ma20 + " "
        }

        console.log("tooltip");
        console.log(items);

        // items[0].name = items[0].title;
      }
    });

    chart.line().position('date*price_end').color('red');
    chart.line().position('date*ma20').color('gray');
    chart.render();
    // 注意：需要把chart return 出来
    return chart;
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
      url:"http://42.192.51.240:8090/stocks/trend",
      method: "POST",
      data: e.detail.value,
      dataType: 'json',
      success: function(res) {
        // console.log("ret length:" + JSON.parse(res.originalData)["002258"].data.length());
        console.log(JSON.parse(res.originalData));
        
        if (Object.keys(JSON.parse(res.originalData)).length > 0) {
          console.log("success");
          var data = [];
          var oriData = JSON.parse(res.originalData);
          for (var key in oriData) {
            data.push(oriData[key].data)
          }
          console.log(data);
          that.setData({
            'listData': data,
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