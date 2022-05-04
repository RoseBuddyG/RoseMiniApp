import lifecycle from '/util/lifecycle';
import animModal from '/util/items';

const lastComponents = [
  {
    icon: '/image/canvas.png',
    title: '画布',
    entitle: 'Canvas',
    page: 'canvas',
  },
];

Page({
  ...lifecycle,
  ...animModal.animOp,
  data: {
    ...animModal.data,
    pageName: 'component/index',
    pageInfo: {
      pageId: 0,
    },
    hidden: true,
    curIndex: 0,
    arr: {
      onItemTap: 'onGridItemTap',
      onChildItemTap: 'onChildItemTap',
      list: [
        {
          icon: '/image/stock_select.png',
          title: '价格低估型',
          entitle: 'Form',
          page: 'form',
          // subs: [
          //   {
          //     title: '基础视图',
          //     entitle: 'View',
          //     page: 'view',
          //   },
          //   {
          //     title: '滚动视图',
          //     entitle: 'ScrollView',
          //     page: 'scroll-view',
          //   },
          //   {
          //     title: '滑动视图',
          //     entitle: 'Swiper',
          //     page: 'swiper',
          //   },
          // ],
        }, {
          icon: '/image/stock_arise.png',
          title: '趋势筛选',
          entitle: 'Trend',
          page: 'trend',
          // subs: [
          //   {
          //     title: '文字',
          //     entitle: 'Text',
          //     page: 'text',
          //   },
          //   {
          //     title: '图标',
          //     entitle: 'Icon',
          //     page: 'icon',
          //   },
          //   {
          //     title: '进度条',
          //     entitle: 'Progress',
          //     page: 'progress',
          //   },
          // ],
        }, {
          icon: '/image/bond.png',
          title: '可转债',
          entitle: 'Kzz',
          page: 'kzz',
        }, {
          icon: '/image/catch.png',
          title: 'A股打新',
          entitle: 'Feedback',
          subs: [
            {
              title: '动作面板',
              entitle: 'ActionSheet',
              page: 'action-sheet',
            },
            {
              title: '对话框',
              entitle: 'Modal',
              page: 'modal',
            },
            {
              title: '轻提示',
              entitle: 'Toast',
              page: 'toast',
            },
            {
              title: '加载提示',
              entitle: 'Loading',
              page: 'loading',
            },
          ],
        }, 
      ],
    },
  },
  onGridItemTap(e) {
    const curIndex = e.currentTarget.dataset.index;
    const childList = this.data.arr.list[curIndex];
    if (childList.subs) {
      this.setData({
        hidden: !this.data.hidden,
        curIndex,
      });
      this.createMaskShowAnim();
      this.createContentShowAnim();
    } else {
      this.onChildItemTap({
        currentTarget: {
          dataset: { page: childList.page },
        },
      });
    }
  },
  onChildItemTap(e) {
    const { page } = e.currentTarget.dataset;
    dd.navigateTo({
      url: `${page}/${page}`,
    });
  },
  onModalCloseTap() {
    this.createMaskHideAnim();
    this.createContentHideAnim();
    setTimeout(() => {
      this.setData({
        hidden: true,
      });
    }, 210);
  },
});
