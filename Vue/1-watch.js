// 引用完整版 Vue
import Vue from "vue/dist/vue.js";

Vue.config.productionTip = false;

new Vue({
  data: {
    n: 0,
    history: [],
    inUndoMode: false // 设置变量是否处在撤销模式
  },
  watch: {
    n(newValue, oldValue) {
      // 不处于撤销模式的时候才进行更新
      if (!this.inUndoMode) {
        this.history.push({ from: oldValue, to: newValue });
      }
    }
  },

  template: `
    <div>
      {{n}}
      <hr />
      <button @click="add1">+1</button>
      <button @click="add2">+2</button>
      <button @click="minus1">-1</button>
      <button @click="minus2">-2</button>
      <hr/>
      <button @click="undo">撤销</button>
      <hr/>
      {{history}}
    </div>
  `,
  methods: {
    add1() {
      this.n += 1;
    },
    add2() {
      this.n += 2;
    },
    minus1() {
      this.n -= 1;
    },
    minus2() {
      this.n -= 2;
    },
    undo() {
      const last = this.history.pop();
      const old = last.from;
      /**
       * 触发撤销事件原本是想删除history数组中的最后一项
       * 但是因为要记录最后一项的oldValue值进而更新n
       * 更新n的时候，又会自动触发watch事件，需要设置一个变量来控制不监听watch事件
       * 更新n之前设置为撤销模式
       */
      this.inUndoMode = true;
      this.n = old; // watch是异步的！！
      // n更新后再转为非撤销模式
      // this.inUndoMode = false
      this.$nextTick(() => {
        this.inUndoMode = false;
      });

      /**
       * 更新n之前设置为撤销模式
       * this.inUndoMode = true
       * this.n = old
       * n更新后再转为非撤销模式
       * this.inUndoMode = false
       * 上述代码符合常规思想 但是watch监听是异步的！！！！！
       * 它会等undo函数全部执行完再去执行 此时inUndoMode又变成false了
       * 所以依旧会往history中push数据
       * 解决办法：
       * 可以将this.inUndoMode=false放入异步函数中
       * this.n=old会触发watch watch的异步在vue中是通过$nextTick实现的
       * 同理将this.inUndoMode=false放在$nextTick异步函数中
       * 因为this.n=old异步在前面会先执行完 再执行异步this.inUndoMode=false
       */
    }
  }
}).$mount("#app");
