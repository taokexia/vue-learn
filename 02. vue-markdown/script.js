// 创建全局过滤器
Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'))
// 创建新的 Vue 实例
new Vue({
  name: 'notebook',
  // 使用 CSS 选择器绑定根元素
  el: '#notebook',
  data () {
    return {
      // content: 'This is a note',
      // content: localStorage.getItem('content') || 'You can write in **markdown**',
	  notes: JSON.parse(localStorage.getItem('notes')) || [], // 保存笔记数组
	  selectId: localStorage.getItem('selected-id') || null, // 选中笔记的 Id
    }
  },
  // 计算属性
  computed: {
    notePreview () {
      // Markdown 渲染为 HTML
      return marked(this.selectedNote.content)
    },
	addButtonTitle () {
	  return this.notes.length + ' note(s) already'
	},
	selectedNote () {
	  // 返回与 selectedid 匹配的笔记
	  let note = this.notes.find(note => note.id === this.selectId)
	  return note 
	},
	sortedNotes () {
        return this.notes.slice() // 由于 sort 方法会直接修改源数组，这里使用 slice 方法创建新的副本。这样以防止触发 notes 侦听器
        	.sort((a, b) => a.created - b.created)
        	.sort((a, b) => (a.favorite === b.favorite) ? 0
                 : a.favorite ? -1
                 : 1)
    },
	linesCount () {
        if (this.selectedNote) {
            // 计算换行符的个数
            return this.selectedNote.content.split(/\r\n|\r|\n/).length
        }
    },
    wordsCount() {
        if (this.selectedNote) {
            var s = this.selectedNote.content
            // 将换行符转换为空格
            s = s.replace(/\n/g, ' ')
            // 排除开头和结尾的空格
            s = s.replace(/(^\s*)|(\s*$)/gi, '')
            // 将多个重复空格转换为一个
            s = s.replace(/\s\s+/gi, ' ')
            // 返回空格数
            return s.split(' ').length
        }
    },
    charactersCount() {
        if (this.selectedNote) {
            return this.selectedNote.content.split('').length
        }
    }
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
    notes: {
		handler: 'saveNotes', // 方法名
		deep: true //需要使用这个选项来侦听数组中每个笔记属性的变化
	}, // 简写方法
	selectId (val) { // 保存选中项
		localStorage.setItem("selected-id", val)
	}
  }, 

  methods: {
    saveNotes () {
      localStorage.setItem('notes', JSON.stringify(this.notes))
	  console.log('Notes saved！', new Date())
    }, 
	// 用一些默认值添加一条契机，并将其添加到笔记数组中
    addNote () {
        const time = Date.now()
        // 新笔记的默认值
        const note = {
            id: String(time),
            title: 'New note' + (this.notes.length + 1),
            content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
            created: time,
            favorite: false,
        }
        // 添加到列表中
        this.notes.push(note)
    },
	selectNote (note) {
		this.selectId = note.id
	},
	removeNote() {
		if (this.selectedNote && confirm('Delete the note?')) {
			// 将选中的笔记从笔记列表中移除
			const index = this.notes.indexOf(this.selectedNote)
			if (index !== -1) {
				this.notes.splice(index, 1)
			}
		}
	},
	favoriteNote() {
		this.selectedNote.favorite = !this.selectedNote.favorite
	}
  },
  // 当实例准备就绪就会调用这个钩子
  /* created () {
	// 将 content 设置为存储的内容
    // 如果没有保存任何内容则设立为一个默认字符串
    this.content = localStorage.getItem('content') || 'You can write in **markdown**'
  }, */
})
