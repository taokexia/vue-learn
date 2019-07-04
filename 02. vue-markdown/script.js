// 创建新的 Vue 实例
new Vue({
  name: 'notebook',
  // 使用 CSS 选择器绑定根元素
  el: '#notebook',
  data () {
    return {
      // content: 'This is a note',
      content: localStorage.getItem('content') || 'You can write in **markdown**',
    }
  },
  // 计算属性
  computed: {
    notePreview () {
      // Markdown 渲染为 HTML
      return marked(this.content)
    },
  },

  // 修改监听器
  watch: {
	// 侦听 content 数据属性 
    /*content: {
      handler (val, oldVal) {
        console.log('new note:', val, 'old note:', oldVal)
        localStorage.setItem('content', val)
      },
      immediate: true,
    },*/
    /*content (val) {
      localStorage.setItem('content', val)
    },*/
    /*content: {
      handler: 'saveNote',
    },*/
    content: 'saveNote', // 简写方法
  },

  methods: {
    saveNote (val, oldVal) {
      console.log('new note:', val, 'old note:', oldVal)
      console.log('saving note:', this.content)
      localStorage.setItem('content', this.content)
      this.reportOperation('saving')
    },
    reportOperation (opName) {
      console.log('The', opName, 'operation was completed!')
    },
  },
  // 当实例准备就绪就会调用这个钩子
  /* created () {
	// 将 content 设置为存储的内容
    // 如果没有保存任何内容则设立为一个默认字符串
    this.content = localStorage.getItem('content') || 'You can write in **markdown**'
  }, */
})
