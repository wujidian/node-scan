import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/container'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/pages/home'),
          meta: {
            active: 'home',
            needLogin: false,
            label: "首页"
          }
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/pages/personalCenter/login'),
          meta: {
            active: 'login',
            needLogin: false,
          }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/pages/personalCenter/register'),
          meta: {
            active: 'register',
            needLogin: false,
          }
        },
        {
          path: '/forgetPassword',
          name: 'forgetPassword',
          component: () => import('@/pages/personalCenter/forgetPassword'),
          meta: {
            active: 'forgetPassword',
            needLogin: false,
          }
        },
        // {
        //   path: '/cloudPower',
        //   name: 'hashPowerMall',
        //   component: () => import('@/pages/cloudPower/cloudPower'),
        //   meta: {
        //     active: 'cloudPower',
        //     needLogin: false,
        //   }
        // },
        // {
        //   path: '/cloudPowerDetails/:id',
        //   name: 'hashPowerDetails',
        //   component: () => import('@/pages/cloudPower/cloudPowerDetails'),
        //   meta: {
        //     active: 'cloudPower',
        //     needLogin: true,
        //     needRealNameAuth: true,
        //     needPayPassword: true,
        //   }
        // },
        // {
        //   path: '/payment/:uuid',
        //   name: 'payment',
        //   component: () => import('@/pages/order/payment'),
        //   meta: {
        //     active: 'payment',
        //     needLogin: true,
        //     needRealNameAuth: true,
        //     needPayPassword: true,
        //   }
        // },
        // {
        //   path: '/orderDetails/:uuid',
        //   name: 'orderDetails',
        //   component: () => import('@/pages/order/orderDetails'),
        //   meta: {
        //     active: 'payment',
        //     needLogin: true,
        //     needRealNameAuth: true,
        //     needPayPassword: true,
        //   }
        // },
        {
          path: '/staking',
          name: 'staking',
          component: () => import('@/pages/staking/staking'),
          meta: {
            needLogin: false,
            active: 'staking',
          }
        },
        {
          path: '/servers/:id?',
          name: 'servers',
          component: () => import('@/pages/servers/servers'),
          meta: {
            needLogin: false,
            active: 'servers',
          }
        },
        {
          path: '/serversNode/:id',
          name: 'serversNode',
          component: () => import('@/pages/servers/serversNode'),
          meta: {
            needLogin: false,
            active: 'servers',
          }
        },
        {
          path: '/construction',
          name: 'construction',
          component: () => import('@/pages/construction'),
          meta: {
            active: 'construction',
            needLogin: false
          }
        },
        {
          path: '/recordsCenter',
          name: 'recordsCenter',
          component: () => import('@/pages/recordsCenter'),
          meta: {
            active: 'recordsCenter',
            needLogin: false
          }
        },
        {
          path: '/nodeVote/:id',
          name: 'nodeVote',
          component: () => import('@/pages/staking/nodeVote'),
          meta: {
            active: 'staking',
            needLogin: false,
          }
        },
        {
          path: '/aboutUs',
          name: 'aboutUs',
          component: () => import('@/pages/aboutUs/aboutUs'),
          meta: {
            active: 'aboutUsCon',
            needLogin: false,
          }
        },
        {
          path: '/aboutUsComp',
          name: 'aboutUsComp',
          component: () => import('@/pages/aboutUs/aboutUsComp'),
          redirect: '/home',
          meta: {
            active: 'homeComp',
            needLogin: false,
          },
          children: [
            {
              path: '/bulletin',
              name: 'bulletin',
              component: () => import('@/pages/aboutUs/bulletin'),
              meta: {
                active: 'home/bulletin',
                needLogin: false,
                label: "资讯&公告"
              }
            },
            {
              path: '/bulletinDetails/:id',
              name: 'bulletinDetails',
              component: () => import('@/pages/aboutUs/bulletinDetails'),
              meta: {
                active: 'home/bulletin',
                needLogin: false,
              }
            },
          ]
        },
        {
          path: '/userCenter',
          name: 'userCenter',
          component: () => import('@/components/userCenterComp'),
          redirect: '/assets',
          meta: {
            active: 'userCenterComp',
            needLogin: true,
          },
          children: [
            // {
            //   path: "/assets",
            //   name: "assets",
            //   component: () => import('@/pages/userToken/assets'),
            //   meta: {
            //     active: 'assets',
            //     needLogin: true
            //   }
            // },
            // {
            //   path: "/recharge",
            //   name: "recharge",
            //   component: () => import('@/pages/userToken/recharge'),
            //   meta: {
            //     active: 'assets',
            //     needLogin: true
            //   }
            // },
            // {
            //   path: "/withdraw",
            //   name: "withdraw",
            //   component: () => import('@/pages/userToken/withdraw'),
            //   meta: {
            //     active: 'assets',
            //     needLogin: true,
            //     needRealNameAuth: true,
            //     needPayPassword: true,
            //   }
            // },
            {
              path: "/userCloudPower",
              name: "userCloudPower ",
              component: () => import('@/pages/userCloudPower/userCloudPower'),
              meta: {
                active: 'userCloudPower',
                needLogin: true
              }
            },
            {
              path: "/userCloudPowerDetail",
              name: "userCloudPowerDetail ",
              component: () => import('@/pages/userCloudPower/userCloudPowerDetail'),
              meta: {
                active: 'userCloudPower',
                needLogin: true
              }
            },
            // {
            //   path: "/userOrder",
            //   name: "userOrder",
            //   component: () => import('@/pages/order/userOrder'),
            //   meta: {
            //     active: 'userOrder',
            //     needLogin: true
            //   }
            // },
            {
              path: "/userSafety",
              name: "userSafety",
              component: () => import('@/pages/personalCenter/userSafetyComp'),
              redirect: '/userInfo',
              meta: {
                active: 'userSafety',
                needLogin: true
              },
              children: [
                {
                  path: "/userInfo",
                  name: "userInfo",
                  component: () => import('@/pages/personalCenter/userInfo'),
                  meta: {
                    active: 'userSafety/userInfo',
                    needLogin: true
                  },
                },
                {
                  path: "/changePassword",
                  name: "changePassword",
                  component: () => import('@/pages/personalCenter/changePassword'),
                  meta: {
                    active: 'userSafety/changePassword',
                    needLogin: true
                  },
                },
                {
                  path: "/fundPassword",
                  name: "fundPassword",
                  component: () => import('@/pages/personalCenter/fundPassword'),
                  meta: {
                    active: 'userSafety/fundPassword',
                    needLogin: true
                  },
                }
              ]
            },
            {
              path: "/userVerification",
              name: "userVerification",
              component: () => import('@/pages/personalCenter/userVerification'),
              meta: {
                active: 'userVerification',
                needLogin: true
              }
            },


          ]
        },
      ]
    },
    // {
    //   path: '/protocol/:id',
    //   name: 'protocol',
    //   component: () => import('@/pages/cloudPower/protocol'),
    // },
    {
      path: '/download',
      name: 'download',
      component: () => import('@/pages/download'),
      meta: {
        active: '',
        needLogin: false
      }
    },
  ]

})

router.beforeEach((to, from, next) => {
  let authority = ['login', 'register', 'forgotPassword'];
  if (to.matched.length === 0 && to.path !== '/') {   //未匹配到路由
    from.name ? next({ name: from.name }) : next('/');
  } else {
    let userInfo = store.state.info;
    if (userInfo == '' && to.meta.needLogin) {  // 页面需要登录且用户未登录
      next('/login');
    } else if (userInfo !== '' && to.meta.needLogin) {  // 页面需要登录且用户已经登录
      let isRealNameAuth = userInfo.isRealNameAuth;
      let hasPayPassword = userInfo.hasPayPassword;
      if (to.meta.needPayPassword == true && isRealNameAuth !== 1) { // 页面需要用户实名认证权限
        next(from.path);
      } else if (to.meta.needRealNameAuth == true && hasPayPassword != 1) { // 页面需要用户资金密码权限
        next(from.path);
      } else {
        next();
      }
      next()
    } else if (userInfo !== '' && authority.indexOf(to.name) >= 0) { // 用户已经登录访问login、register、forgotPassword等页面
      next(from.path);
    } else {
      next();
    }
  }
});

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
