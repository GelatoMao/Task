// 引用完整版 Vue
import Vue from "vue/dist/vue.js";

Vue.config.productionTip = false;

new Vue({
  data: {
    n: 0,
    obj: {
      a: "a"
    }
  },
  /**
   * obj={a:'a'} 会将obj指向一个新对象 所以点击之后控制台会输出obj 变了
   * 单纯改变obj.a+='hi' 不改变obj指向 但是如果有需求只要对象里面的值改变了
   * 就算这个对象改变 添加deep:true
   */
  template: `
    <div>
      <button @click="n += 1">n+1</button>
      <button @click="obj.a += 'hi'">obj.a + 'hi'</button>
      <button @click="obj = {a:'a'}">obj = 新对象</button>
    </div>
  `,
  watch: {
    n() {
      console.log("n 变了");
    },
    obj: {
      handler() {
        console.log("obj 变了");
      },
      deep: true,
      immediate: true // 是否在第一次渲染的时候执行该函数
    }
    /**
     * 在obj中添加deep:true后 下面的"obj.a"其实不需要再单独
     * 监听了
     */
    // "obj.a": function () {
    //   console.log("obj.a 变了");
    // }
  }
}).$mount("#app");
