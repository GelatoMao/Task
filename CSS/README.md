# 知识点总结

## 2
- 设置 `ul` 中的 `li` 的 `padding` 值的时候 一开始用的 `padding: 0.5em` 但是因为后期高度是要确定的值 所以垂直方向上的 `padding` 值不要用 `em` 做单位 
  ```
   ul > li {
    float: left;
    border: 1px solid red;
    padding: 4px 0.5em;
  }
  ```
- 如果发现图片下面有多余的东西 就在图片上写 `vertical-align: top` 或者 `vertical-align: middle` 
- 有的时候用 `border` 调试会干扰, 可以将 `border` 换成 `outline`
- 做平均布局 只需要在布局外面再套一个 `div` 然后在这个 `div` 上设置 `margin` 负值 记住 平均布局需要使用负 `margin`
- 平均布局 假设外层容器宽度是800 里面每个子容器的宽度需要计算 设宽度是x 容器之间的距离是y 则 4x+3y=800 随便凑出 x可以为191 y为12 然后每个子元素设置 `margin-right: 12px` 外层套的容器设置 `margin-right: -12px`
