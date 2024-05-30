import { createApp } from 'vue'
import App from './App.vue'
import 'vant/es/toast/style';
import * as VueRouter from 'vue-router';
import routes from './config/route';


// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(router)
app.mount('#app')

// import { createApp } from 'vue'
// // import './style.css' //不能引入这个
// import App from './App.vue'
// import {NavBar, Button} from 'vant'

// const app = createApp(App);
// app.use(Button);
// app.use(NavBar);

// app.mount('#app')
