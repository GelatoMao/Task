// App.vue
<template>
  <div class="app">
    App.vue 我现在有 {{ total }}
    <hr />
    <!-- $event可以接受传过来的参数 -->
    <!-- 在vue中将一个数据传递给另一个组件 如果另一个组件要修改该数据 必须要通知拥有该数据的组件 -->
    <!-- 该种方式有一点方法 可以用.sync直接替代 -->
    <Child :money="total" v-on:update:money="total = $event" />
    <child :money.sync="total" />
  </div>
</template>

<script>
import Child from "./Child.vue"
export default {
  data() {
    return { total: 10000 }
  },
  components: { Child: Child },
}
</script>

<style>
.app {
  border: 3px solid red;
  padding: 10px;
}
</style>





// Child.vue
<template>
  <div class="child">
    {{ money }}
    <button @click="$emit('update:money', money - 100)">
      <span>花钱</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["money"],
}
</script>

<style>
.child {
  border: 3px solid green;
}
</style>
