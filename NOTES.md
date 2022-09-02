
# 项目特色： 网易云移动端

    [首页]：vant组件库 vue3组合式api 封装axios
    [个人中心]：使用路由守卫：全局路由守卫 独享路由守卫。使用浏览器本地存储服务
    [歌曲详情页]：使用vant的抽屉组件，vue3Marquee组件实现页面的跑马灯、CSS3的中间磁盘和磁针动画效果、使用CSS3的透明属性backdrop-filter 、使用多种组件之间通信、使用路由传参、vuex数据管理、vue的数据监听实现播放功能。
    [搜索页面]：使用es6的数组去重与promise、使用localstorage数据缓存



# 1.项目构建过程：

     ①. 先运行本地的数据服务： node app.js
    
     ②. 使用vue-cli3的语法初始化vue： vue create wangyiyum-app
        注意创建过程中选择自定义创建： 
        babel router  vuex css   history  vue3（兼容2的语法  


     ③. 使用npm run serve 进行开启服务。


​    
# 2.页面构建流程：

## 2.1 为页面适配移动端布局 rem，在public的js文件下书写rem.js


## 2.2 引入symbol的字体图标


## 2.3 对top nav部分使用flex布局
      dispaly:flex
    
      水平居中：justify-content: space-between   space-around
    
      垂直居中：align-items:center;

## 2.4 安装vant移动端组件库。
    https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart

## 2.5 自定义封装插件plugins下的 getVant，对所有按需引入的组件进行app.use()操作。


## 2.6使用vant中的swiper封装组件Swiper，并使用其图片懒加载的方式。


## 2.7 安装axios，用于服务器数据请求
      1.安装axios： npm install axios
    
      2.沿用尚品汇的api请求： 拆分为 request.js  和 index.js
                    
      3.将reuqest.js中的axios.create()创建实例部分的baseUrl修改为服务器数据地址。              
          baseURL: " http://localhost:3000",
    
      4.在vuex中发送数据请求。



## 2.8 使用vue3的全局挂载，将所有数据请求api挂载到  $API 上面，可以全局组件调用。

1.挂载全局api-vue3新语法，统一引入api中的所有接口函数
    import * as API from '@/api';
    app.config.globalProperties.$API = API;

2.组件使用方法： this.$API.请求函数

## 2.9 快捷导入vue模板
   键入：<vue


## 2.10 点击歌单跳转到对应的详情页面，应该如何设置流程？

### 1.点击对应歌单进行携带参数：params或者query路由跳转：

    ① 设置路由router：如果使用params传参，还需要设置占位符如： /:id
        {
        path: '/itemMusic/:id',
        name: 'ItemMusic',
        component: () => import(/* webpackChunkName: "itemmusic" */ '../views/ItemMusic.vue')
        }
        
    ② 点击item进行路由跳转，携带参数：item的歌单id。
       this.$route.push({name:'ItemMusic',params:{id:itemId}})

### 2.路由成功跳转，在页面的mouted中发送请求，获取数据。

    ①.从$route的对应params参数中获取对应的key得到携带的参数itemId
       let itemId = this.$route.params.id;
    
    ②.根据itemId向vuex派发actions，在actions中等待数据请求完毕向mutations转发数据，并在mutations对state的数据进行存储。
    
    ③.在组件中的computed计算属性中使用...mapstate({})得到对应的state值。
    
    ④.组件页面开始根据获取的state数据进行渲染。


## 2.11 歌单详情ItemMusic.vue拆分为上下两部分，在components中分别书写两部分组件。

### 3.其他事项：对应其他类似业务，可能还包含身份认证，需要在路由守卫中进行token验证。


## 2.12 在页面数据刷新时候放置数据丢失有什么解决办法？为什么子组件刷新时候props传递的对象数据能够获取到基本数据，而不能获取到其引用数据类型？如可以拿到obj.name，而不能拿到obj.obj1.name或者obj.arr[1]?

----->产生原因应该是：传递的数据太深了，然后页面渲染时间早于深层数据获取时间！！！！！！！！！！

    【问题描述】：在父组件中发送了数据请求，父组件给子组件使用props进行传值时候，第一次组件跳转没有问题，但是对子组件进行刷新存在props的数据obj的引用数据属性值 undefined 的情况(obj.obj1.name)，


    1.[分别将obj与使用的obj.obj1传递给子组件]
    
    在父组件mouted钩子使用vuex进行actions数据请求，请求的数据存储在state之中，然后将state数据使用mapstate解析，再使用props传递给子组件。考虑到解析的数据obj还有内层引用数据类型 obj.obj1情况。这种数据可以分别进obj与obj1使用props传递给子组件，可以解决在子组件使用obj.obj1.name刷新时候出现 undefined情况。当将obj.obj1传递给子组件时候，子组件中直接使用obj1.name进行数据渲染！还要注意为了防止出现页面渲染时候数据还没有更新的情况，对象或在数组属性方式取值时候会使用 || '' 来进行规避undefined。


    2.第二种方式是在父组件之中将请求的数据进行本地存储，使用localstorage或者sessionstorage进行本地存储，然后使用时候从本地加载即可！。
    
       ==> 在父组件使用props传值obj给子组件之前，将对应数据保存到sessionstorage之中。
    
       ==> 在子组件使用该数据时候，使用计算属性先判断props是否接受到了值（主要是判断深层对象的值如obj.obj1），如果没有那么就使用本地保存的数据。一般不能修改props数据，特别是引用数据类型父子组件是共用该props数据的，因此可以对该props数据进行深拷贝，然后如果obj.obj1没有传递过滤，那么就是用本地数据对obj.obj1的obj1进行赋值。
    
       ===> 完整流程： 父组件请求数据-->保存到session之中--->传递数据给子组件--->使用计算属性获取obj.obj1的属性值，如果不能获取就使用本地存储得值进行赋值/或者设置定时器等待数据传递完毕---->页面渲染数据






## 2.13 数据赋值 浅拷贝 深拷贝区别？如何实现浅拷贝与深拷贝？
    1.赋值、浅拷贝、深拷贝三个的区别在于对基本数据类型和引用数据类型的区别。
    对于基本数据类型而言：三者均是将该值传递给新变量，两个变量之间不会相互影响。
    对于引用数据类型obj： 赋值是传递的引用数据类型的栈的地址，而非堆中数据，因此两个变量会对obj.name以及obj.obj1相互影响。
    
                        浅拷贝重新在堆中创建内存，拷贝前后obj的基本数据类型如obj.name不会影响，而obj.obj1会相互影响。
                        
                        深拷贝在堆中重新开辟内存存放新对象，对对象的子对象进行递归拷贝，拷贝前后obj的索引数据类型都不影响。
    
    2.浅拷贝和深拷贝实现方法？
      浅拷贝：①.Object.assign()方法： let obj2 = Object.assign({},obj1);
             ②.lodash中的_.clone：var obj2 = _.clone(obj1);
             ③.es6特性-展开运算符...: let obj2 = {... obj1}；
             ④.Array.prototype.contact()与Array.prototype.slice()
               let arr2 = arr1.contact();
               let arr2 = arr1.slice();
      深拷贝：①.JSON.parse(JSON.stringify())方法：里面将对象转化为字符串，外层将字符串还原为对象。
      let obj2 = JSON.parse(JSON.stringify(obj1))
             上述方法：不能处理函数和正则，处理之后函数->null 正则->空对象
            
            ②.lodash中的_.cloneDeep：var obj2 = _.cloneDeep(obj1);


## 2.14 如何注册全局可用组件 FooterMusic.vue？

    // 注册全局组件 FooterMusic.vue
    import FooterMusic from "@/components/item/FooterMusic";
    app.component('FooterMusic', FooterMusic);
    
    // 注册的全局组件需要定位在最底部,那么如何实现该布局？
      ===>直接在组件FooterMusic的样式中进行position定位即可，如定位到下边界，直接bottom为0即可，那么在使用该组件的地方就会自动的以body为relative进行相对定位。
    
    // 如何在不同组件页面使用全局组件时候设置不同的定位？或者个性化添加功能？
       
       1.【改定位】针对不同组件内共用组件定位情况：可使用外层的盒子包裹该共用组件，然后依赖外层盒子进行定位布局。
    
       2.【改功能】针对不同组件内共用组件特点功能情况：可以使用每个页面在调用组件时传入对应的方法，然后组件内部执行传入的方法，而不用关心是哪个页面。
    
       3.【改样式】一般不会对该公用组件进行大小形状进行更改，否则就不叫共用组件，而考虑重新定义该组件，如果仅仅需要更改颜色外观样式或者背景颜色，使用props父子组件通信即可。

## 2.15 home 以及itemMusic组件底部的footermusic组件如何实现音乐的播放？
    描述：1.在home组件页面时候，可以点击进行播放。
          2.在itemmusic组件时候，点击到对应歌单的歌曲应该立马播放。
          3.在home itemmusic组件没有点击时候应该自动进行播放。
    
    总结： 1.需要一个状态管理来存储当前待播放的歌曲列表(使用全局的vuex)
           2.当点击itemmusic页面的歌曲时候应该优先播放该歌曲。
           3.默认状态下，footermusic应该有对应的播放列表信息。同时有函数提供播放选定音乐。
    
    涉及：
          兄弟组件通信：itemMusic-footermusic ====>点击歌曲触发事件，函数中向footermusic组件传递歌曲信息，并进行播放（函数接收歌曲西信息，并自动播放）
          <!-- 父子组件通信：  -->

====> 目前的状态：
     【itemMusic组件】：内使用了【footerMusic组件】，二者为父子关系。
     【footerMusic组件】：内部存储了一个待播放列表，和一个列表索引。
     【home组件】：内使用了【footerMusic组件】，二者为父子关系。
     【itemMusicContent组件】：与【footerMusic组件】互为兄弟组件。

     ====>业务需求： vuex 万能数据管理器。
    
         1.在歌单详情页面，渲染对应的歌单数据时候，需要将对应的歌单列表保存到【footerMusic组件】的播放列表之中，并设置默认的索引index为0--->在【itemMusic组件】向子组件发送歌单id进行数据请求。或者直接从vuex中获取歌单数据。
        
         ===> 在itemmusic的vuex中使用getters将数据进行重新计算得到footermusic组件需要的数据形式getPlayList。
        
         ===> 然后在footermusic组件中使用mapgetters获取对应数据getPlayList，并在watch中对getPlayList进行监视，进行赋值给data中的playList进行渲染。
    
         2.当在【itemMusicContent组件】中点击需要播放的item时候，立马将【footerMusic组件】的index换为对应id。然后自动进行播放（发送歌曲id请求播放。）
    
         3.在【home】组件之中，需要为【footerMusic组件】默认请求播放数据。（可以是推荐歌单返回的第一个数据作为播放列表，从vuex中拿去数据。）

## 2.16 在vue中如何在一个元素的点击事件中对另一个元素进行属性操作？
        我们知道vue中不会直接对元素进行操作，也就不会使用doucument进行元素选择，而在css样式中可以对元素进行选择，那么我们需要在js的语法中对某一个元素进行属性操作，应该如何选择该元素呢？
    
        1.对待选择元素使用ref属性。
         <audio ref="audio" :src="`https:/.../url?id=${ }.mp3`"></audio>
         获取该元素： this.refs.audio
         然后对该属性进行播放暂停操作。

## 2.17.跑马灯效果使用 
// 注册全局组件跑马灯效果
import Vue3Marquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

app.use(Vue3Marquee).mount('#app')
// 使用
<Vue3Marquee>
    <img height="200" width="300" src="...img" />
    <img height="200" width="300" src="...img" />
    <img height="200" width="300" src="...img" />
  </Vue3Marquee>

## 2.18如何在js中控制元素的样式动画？
### 使用动态css和refs进行css变化的异同和优缺点？   一般使用动态class比较稳定，可以包括所有触发事件。
### 原因：使用动态class在元素渲染时候进行条件判断，可以检测到属性的值，而属性的值涵盖了所有触发事件。而使用ref的值进行元素的css设置，只能通过某一个事件或者在生命周期中进行调用ref处理，这种容易遗漏额外的触发事件。
    ===> ref属性+watch+mounted：为元素设置ref属性，然后通过绑定事件或者数据监听触发设置ref的相关样式，这种方式需要考虑到触发条件的多种可能性，需要考虑全面。优点就是书写相对方便。不适用于触发条件过多的情况,如音乐播放时候图片旋转。
    
    ===> 为元素添加额外的动态css样式，如:class="{'key':value}"的形式。这种需要书写元素两种不同状态的样式，来根据属性值进行动态绑定，好处是可以兼顾所有的绑定情况。


    方法一：通过refs来获取元素，使用style进行动态修改。
      1.首先获取到该元素。对该元素绑定ref属性，然后使用：
            this.$refs.ref属性   获取该元素。
     
      2.通过style.属性名 = '属性值';进行更改
            this.$refs.cizheng.style.transform = 'rotate(60deg)';
    
     还可以直接添加class类名：
         this.$refs.cizheng.$el.classList.add('className');
    
    方法二：给元素额为动态绑定一个class，当触发条件isplay时候使用该class。
           :class ="{'class名称':bool值}"
           
           eg：
           <img  class="img-zhizheng" :class="{'img-zhizheng-active':isplay}" src="@/assets/zhizheng.png" alt="">

   这里考虑到播放音乐有多个按钮可以实现： 播放 上一首 下一首 随机播放等等，如果通过点击按钮事件来进行ref属性的操作是不可取的，因为这样有许多按钮都有设置触发ref属性进行设定css。

   ===>可以尝试使用watch监听isplay，如果isplay发生改变，那么为ref进行css绑定样式。
       this.changePause()：
            this.$refs.cizheng.style.transform = 'rotate(72deg)';
            this.$refs.imgurl.style.animationPlayState = 'paused';
       this.changePlay () :
            this.$refs.cizheng.style.transform = 'rotate(60deg)';
            this.$refs.imgurl.style.animationPlayState = 'running';
       
       同时：当父组件footerMusic播放音乐时候进入到detail页面，而此时页面却没有进入播放状态，是因为此时isplay监听到先后没有发送变化（都为true），所有需要在detail的mounted中进行初始化判断。
            this.isplay == true ? this.changePlay() : this.changePause();

## 2.18 不要将异步数据请求和赋值放在beforeUpdate和updated钩子函数中,使用路有钩子要小心。
    如果组件updated中使用数据请求，同时页面又接收请求的数据进行渲染，那么将会陷入死循环，
    解决办法是：可以在updated的数据请求时候进行判断，如果和上次相同那就不请求。

## 2.19 如何获取在footermusic组件中的audio播放元素的实施播放时间信息？然后用于Detail组件的歌词展示功能？

   ===>思路：在vuex状态中设置currentTime来进行播放时间管理，然后在footermusic组件中的播放状态下，定时的向vuex发送当前audio的播放时间。然后在detail组件实时的使用vuex的currentTime进行歌词展示。

   ===>注意：在footer组件中考虑到 时间发生定时器 的触发条件为所有的播放歌曲和暂停歌曲，而播放·歌曲的方式过多，如果在每一个事件中都设置定时器比较麻烦。因此，考虑在控制radio播放状态时候进行判断，如果radio为播放状态那么就打开定时器发送播放时间，否则清除定时器。

   【总结】：组件内部进行数据响应时候===>所有事件控制数据请求、参数更新，而在updated中对返回的数据进行判断操作。既不考虑中间过程的数据状态，而只在末尾对数据进行检测来影响元素状态。

## 2.20 如何根据当前播放播放时间和每句歌词的开始显示时间来进行歌词显示？
   ===> 当前歌词包含了开始显示时间，然后在使用foreach为每一个歌词obj添加歌词结束时间(在后一句歌词obj)，之后每一个歌词obj都有了开始时间和结束时间，然后在渲染时候对歌词进行v-show进行判断显示即可。

   ===> 如何判断： 添加动态css

   :class="{'active':isShowCurrent(item)}"

   isShowCurrent (item) {
      if (item.millTime <= (this.currentTime * 1000) && (this.currentTime * 1000) < item.nextTime) {
        return true;
      }
      return false;
    }

## 2.21 如何显示滚动歌词？
    对当前的currentTime进行watch监视，只要发送变化那么就更新scroll的距离，始终保持active的p元素距离父元素上边界为367
    
    currentTime () {
      let activeP = document.querySelector("p.active");
      if ( activeP && activeP.offsetTop > 367) {
          // 动态设置父盒子的滚动距离：scrollTop=当前高度-367.
          this.$refs.lyricBox.scrollTop = activeP.offsetTop - 367;
      }
    }

## 2.22如何显示进度条？ 使用input 的range属性
   ====> ref的redio播放在footer组件之中，因此我们在footer组件获取当前radio的播放时长和总长度存储到vuex中，然后detail组件获取vuex中的进度信息，在mounted于updated中进行更新！！

   【问题1】：当footer组件发送歌曲更新之后，不能立马获取到radio上面的duration歌曲总时长信息，这时候需要我们设置延迟器，延迟处理获取refs的radio的信息。
        addTotalTime(){
            // 加一个延迟器防止radio数据为空
            setTimeout(()=>{
                let time = this.$refs.radio.duration;
                console.log('我发送请求获取当前的时间啦'+ time);
                this.$store.commit('setCurrentTime',time); 
            },500)
            }


# 2.23 当前盒子使用了百分比继承父盒子的宽高时候，尽量避免使用margin的对应宽高进行盒子间距设置，容易撑开父盒子的宽度或者高度，从而影响父盒子内其他子盒子的 百分比宽高内容！！！！！！！！！！！应该使用padding来代替间距设置。

===> 当页面出现左右和上下的滚动条时候优先考虑是不是盒子设置了百分比宽度，然后使用margin撑开了盒子。

## 2.23 使用splice进行删除数组的值
    // 使用splice(index,num) 从index开始删除num个值
      this.historyList.splice(index,1);



## 2.24 使用set进行数组去
      this.historyList = Array.from(new Set(this.historyList))

 或者 this.historyList = [...new Set(this.historyList))];



## 2.25 事件代理  
    vue中click方法传入 goSearch（$event)
    event.target可以准确地获取事件源(指的是真正触发事件的那个元素)，
    
        event.target属性：
        event.target.nodeName      //获取事件触发元素标签name
        event.target.id            //获取事件触发元素id
        event.target.className     //获取事件触发元素classname
        event.target.innerHTML     //获取事件触发元素的内容
    
    注意：  event.target.nodeName 得到大写内容  LI  DIV等等
    event.currentTarget : 指的是绑定了事件监听的元素，绑定元素。
                         （可以理解为触发事件元素的父级元素）

## 2.26 z-index的使用方式： 与 【所属的层叠上下文】和【元素本身的层叠级别】有关。

    【所属的层叠上下文】：当前元素的父盒子z-index级别，默认为同一层次。
                        ===>父元素不设置z-index:默认父元素同一级别.
                        ===>父元素均设置z-index为auto:表示它们子元素均为同一层次。
                        ===>父元素均设置z-index:那么子元素是在父元素的index下面显示。
    
    【元素本身的层叠级别】：设置当前元素的z-index大小，默认为auto同一层次显示。

一、如何判断多个元素的对应子元素的层叠优先级？(元素必须为:relative absolute fixed)
         
         1.如果父元素均不设置z-index或者为auto，那么它们子元素层叠由其值大小决定。
         
         2.如果一个父元素不设置z-index，另一个设置了z-index，那么不设置z-index的元素的子元素与设置了z-index的父元素同层级，同时设置了z-index的子元素不会超出父元素层级。
         
         3.如果两个父元素均设置了z-index大小，那么先比较其父元素z-index大小进行区分层级，然后在对应父元素内部对其子元素进行比较。
         
         参考：https://blog.csdn.net/qq_39643546/article/details/124729278

二、z-index不设置和设置为0有什么区别？

    ===> z-index如果不设置就是默认值auto，那么它就不处于堆叠上下文中,其子元素才无需从父元素继承优先级，可以随意地和其它元素比z-index值了。
    
    ===> 如果z-index的值设置为0的话，该元素依然会处于堆叠上下文中，它会处于z-index为正数的元素后面，负数的前面。

三、z-index为负值、没有定位元素(position:static和z-index:auto)、z-index为正值如何排序？
    
    ===> z-index为负值的元素不仅处于z-index为0的元素的后面，而且还处于其它普通元素（没有堆叠的元素position:static和z-index:auto）的后面。


【总结】：
    1.z-index堆叠上下文只有在relative/absolute/fixed脱离文档流控制时才生效，static时无效。
    2.z-index为0时依然处于堆叠上下文中，比负值高，比正值低。
    3.z-index为负值时不仅会处于z-index为0和正值元素的后面，还会处于非堆叠元素的后面。
    4.当父元素和子元素都处于堆叠上下文时，子元素继承父元素的优先级，故父元素大的就大，如果父元素没有处于堆叠上下文时，即z-index:auto;或者position:static;时，子元素不会继承父元素的优先级。

## 2.25 组件内部当对元素A使用fixed进行固定定位之后，如果想要遮挡住下面层次的内容B不显示，应该如何设置z-index？---> 父设置relative，z-index为0。

    ===> 首先：为了让元素A遮挡元素B的内容，那么A的层叠型一定要比元素B的高，我们可以为元素A设置z-index为1，那么现在A的层叠型高于普通元素B。
    
    ===> 此时：组件并没有设置层叠性，那么元素A的z-index就没有受到约束，就会和组件外部的元素进行层叠性比较。就会出现元素A遮盖其他组件元素的情况。
    
    ===> 所有：我们需要对当前组件设置其z-index属性来约束A在其内部显示优先级即可。我们可以为当前组件设置relative定位，然后设置z-index为0（相对于其他同等级组件），这时候组件外部会议0进行层级比较，而内部元素A仅仅影响元素B的遮挡而已。
    
    ===> 注意：当前组件z-index不能设置为auto，如果设置为auto，那么其子元素依然不会受到约束，会与其他组件进行层叠比较，因为z-index的默认值就为auto。

## 2.26 父元素为普通元素、设置了relative不设置z-index，设置了z-index为0有什么影响？
    ===>首先：父元素如果设置了z-index的值(正、0、负)，那么就会把子元素约束。
    ===>其次：如果父元素设置了定位属型-relative、absolute、fixed，而不设置z-index，那么此时相当于设置z-index:auto.此时其子元素会脱离父元素层级约束，参与外部的层级比较。
    ===>最后：如果父元素不设置position，那么此时其子元素依然会脱离父元素的约束，而进行外部的层级比较。

## 2.27 如何控制footer在某一个组件显示，在另一个组件不显示？

     ===>路由元信息 meta。可以在路由配置文件为每一个路由设置  meta: { showFooter: true }来控制。
    
     路由配置：  
                {
                    path: '/addcartsuccess',
                    name: 'addcartsuccess',
                    component: AddCartSuccess,
                    meta: { showFooter: true }
                },
     在vue.app中进行路由元信息判断：
    
       <Footer v-show="$route.meta.showFooter"></Footer>
    
    ====> 通过this.$route.path != '/login'  进行判断。
          在app.vue注册了router，在每一个组件中都可以获取到该路由信息。

## 2.28 当vuex使用模块化管理时候，如果在路由中进行vuex的state判断，那么需要加上模块名称
 store.state.user.isLogin



## 2.19 css3动画 @keyframes 使用方法？



## 2.20 transform transtation  ...的区别？







# note:

## 报错1：当初次构建vue项目之后，刷新页面会加载错误。
         修改方法：将route.js中的history: createWebHistory(process.env.BASE_URL),
         修改为createWebHashHistory(process.env.BASE_URL),
    
         原因：vue3中历史模式默认改为了HTML5模式：createWebHistory()

## 路由传递参数
      // 方式一：字符串形式：传递params参数 this.keyword和query参数：this.keyword.toUpperCase()
      // this.$router.push("/search/" + this.keyword + "?k=" + this.keyword.toUpperCase())
    
      // 方式二：模板字符串：传递params参数 this.keyword和query参数：this.keyword.toUpperCase()
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
    
      // 方式三：对象写法,注意params只能和name使用，query可以和path与name使用。
      // this.$router.push({ name: 'search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } })
    
      /* **************************************** 面试题总结 ****************************************** */
      // 面试题1.使用路由传参 对象 写法时候，是否可以将path和params一起使用？ 
      //       答：不可以。params参数需要在路由配置文件中的path中设置占位符来保证页面刷新之后依然有params数据，因此params使用对象传参时候必须使用name属性。
      // this.$router.push({ path: '/search', params: { keyword: this.keyword }, query: { k: this.keyword } })


      // 面试题2.传递params参数时候需要在路由配置path中添加占位符，那么如何控制可传递可不传递呢？
      // 答：当路由配置path添加了占位符之后，使用push传递参数时候不传递params参数时候会出现以下问题：
      //   ①.路由跳转问题：此时地址url变为：http://localhost:8080/?k=iphone
      //                  正常为：http://localhost:8080/search?k=iphone
      //   ②.实现params参数是否传递的管理。
      //                       在路由配置文件path中的占位符末尾添加？问号即可。path: "/search/:keyword?",
      // this.$router.push({ name: 'search', query: { k: this.keyword } })



      // 面试题3：params参数可以传递也可以不传递(通过path中占位符添加?实现)，那么如何解决传递空串问题？
      //      答：使用undefined解决。params可以传递、不传递(空字符串)
    
      // this.$router.push({ name: "search", params: { keyword: "" || undefined }, query: { k: this.keyword } })
    
      // 面试题4：路由组件能否传递props数据？
    
      //       答：可以的，总共有三种写法。 布尔值、对象、函数
    
      // 方式1：布尔值写法：只包括params参数。将params参数传递到路由组件的props属性中。需要在跳转路由中设置同名参数接收
      // props: true,
    
      // 方式2：对象写法。额外的给路由传递一些props属性。 需要在跳转路由中设置同名参数接收
      // props: { a: 1, b: 2 },
    
      // 方式3：函数写法，可以给params参数、query参数，通过params传递给路由组件。
      // props: ($route) => {
      //   return { keyword: $route.params.keyword, k: $route.query.k };
      // }
