import lifecycle from '/util/lifecycle';

Page({
  ...lifecycle,
  data: {
    pageName: 'component/webview',
    ref: ''
  },
  onLoad(data) {
    console.log(data);
    let uri = data.ref;
    Object.keys(data).map(key=>{
      if (key !== 'ref') {
        item = encodeURI(data[key])
        uri += `&${key}=${item}`
      }
    });
    console.log(uri)
    this.setData({
      returnIndex: getCurrentPages().length === 1,
      ref: uri
    })
  },
  returnIndex() {
    dd.switchTab({ url: '/page/component/index' });
  },
});