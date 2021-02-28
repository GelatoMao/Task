import './app2.css'
import $ from 'jquery'

const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')
const localKey = 'app2.index'
// 防止没有Key值
const index = localStorage.getItem(localKey) || 0

$tabBar.on('click', 'li', (e) => {
  const $li = $(e.currentTarget)
  $li.addClass('selected').siblings().removeClass('selected')
  const index = $li.index()
  localStorage.setItem('app2.index', index)
  $tabContent.children().eq(index).addClass('active').siblings().removeClass('active')
})

// 默认触发点击第一个导航条的事件
$tabBar.children().eq(index).trigger('click')

