
// 调用window的onresize事件
function remSize () {

  // 获取设备的宽度
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320;
  }

  // 设置html的fontsize大小，也就是rem：根据设置的宽度调整html的font-size, 1rem---->[50px,100px]
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + "px";

  // 设置默认字体大小:    [15px,30px]
  document.querySelector('body').style.fontSize = 0.3 + "rem";


}

// 1.首次加载初始化
remSize();

// 2.窗口变化时候调用
window.onresize = function () {
  remSize();
}