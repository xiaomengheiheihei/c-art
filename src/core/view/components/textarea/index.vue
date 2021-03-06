<template>
  <c-textarea v-on="$listeners">
    <div
      ref="wrapped"
      class="c-textarea-wrapped">
      <div
        v-show="!(composition||valueSync.length)"
        ref="placeholder"
        :style="placeholderStyle"
        :class="placeholderClass"
        class="c-textarea-placeholder"
      >{{ placeholder }}</div>
      <div class="c-textarea-compute">
        <div
          v-for="(item,index) in valueCompute"
          :key="index">{{ item||'.' }}</div>
        <v-uni-resize-sensor
          ref="sensor"
          @resize="_resize"/>
      </div>
      <textarea
        ref="textarea"
        v-model="valueSync"
        :disabled="disabled"
        :maxlength="maxlengthNumber"
        :placeholder="placeholder"
        :autofocus="autoFocus"
        class="c-textarea-textarea"
        @compositionstart="_compositionstart"
        @compositionend="_compositionend"
        @input.stop="_input"
        @focus="_focus"
        @blur="_blur"
        @touchstart.passive="_touchstart"
      />
    </div>
  </c-textarea>
</template>
<script>
import {
  emitter
} from 'uni-mixins'
export default {
  name: 'Textarea',
  mixins: [emitter],
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    autoFocus: {
      type: [Boolean, String],
      default: false
    },
    placeholderClass: {
      type: String,
      default: ''
    },
    placeholderStyle: {
      type: String,
      default: ''
    },
    autoHeight: {
      type: [Boolean, String],
      default: false
    },
    bindinput: {
      type: String,
      default: ''
    },
    cursor: {
      type: [Number, String],
      default: -1
    },
    selectionStart: {
      type: [Number, String],
      default: -1
    },
    selectionEnd: {
      type: [Number, String],
      default: -1
    }
  },
  data () {
    return {
      valueSync: String(this.value),
      valueComposition: '',
      composition: false,
      focusSync: this.focus,
      height: 0,
      focusChangeSource: ''
    }
  },
  computed: {
    maxlengthNumber () {
      var maxlength = Number(this.maxlength)
      return isNaN(maxlength) ? 140 : maxlength
    },
    cursorNumber () {
      var cursor = Number(this.cursor)
      return isNaN(cursor) ? -1 : cursor
    },
    selectionStartNumber () {
      var selectionStart = Number(this.selectionStart)
      return isNaN(selectionStart) ? -1 : selectionStart
    },
    selectionEndNumber () {
      var selectionEnd = Number(this.selectionEnd)
      return isNaN(selectionEnd) ? -1 : selectionEnd
    },
    valueCompute () {
      return (this.composition ? this.valueComposition : this.valueSync).split('\n')
    }
  },
  watch: {
    value (val) {
      this.valueSync = String(val)
    },
    valueSync (val) {
      if (val !== this.value) {
        this.$trigger('input', {}, {
          value: val,
          cursor: this.$refs.textarea.selectionEnd
        })
        this.$emit('update:value', val)
      }
    },
    focus (val) {
      if (val) {
        this.focusChangeSource = 'focus'
        if (this.$refs.textarea) {
          this.$refs.textarea.focus()
        }
      } else {
        if (this.$refs.textarea) {
          this.$refs.textarea.blur()
        }
      }
    },
    focusSync (val) {
      this.$emit('update:focus', val)
      this._checkSelection()
      this._checkCursor()
    },
    cursorNumber () {
      this._checkCursor()
    },
    selectionStartNumber () {
      this._checkSelection()
    },
    selectionEndNumber () {
      this._checkSelection()
    },
    height (height) {
      const lineHeight = getComputedStyle(this.$el).lineHeight.replace('px', '')
      var lineCount = Math.round(height / lineHeight)
      this.$trigger('linechange', {}, {
        height,
        heightRpx: 750 / window.innerWidth * height,
        lineCount
      })
      if (this.autoHeight) {
        this.$el.style.height = this.height + 'px'
      }
    }
  },
  created () {
    this.$dispatch('Form', 'c-form-group-update', {
      type: 'add',
      vm: this
    })
  },
  mounted () {
    this.$refs.textarea.value = this.valueSync
    this._resize({
      height: this.$refs.sensor.$el.offsetHeight
    })
  },
  beforeDestroy () {
    this.$dispatch('Form', 'c-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _focus: function ($event) {
      this.focusSync = true
      this.$trigger('focus', $event, {
        value: this.valueSync
      })
    },
    _checkSelection () {
      if (this.focusSync && (!this.focusChangeSource) && this.selectionStartNumber > -1 && this.selectionEndNumber > -1) {
        this.$refs.textarea.selectionStart = this.selectionStartNumber
        this.$refs.textarea.selectionEnd = this.selectionEndNumber
      }
    },
    _checkCursor () {
      if (this.focusSync && (this.focusChangeSource === 'focus' || ((!this.focusChangeSource) && this.selectionStartNumber < 0 && this.selectionEndNumber < 0)) && this.cursorNumber > -1) {
        this.$refs.textarea.selectionEnd = this.$refs.textarea.selectionStart = this.cursorNumber
      }
    },
    _blur: function ($event) {
      this.focusSync = false
      this.$trigger('blur', $event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      })
    },
    _compositionstart ($event) {
      this.composition = true
    },
    _compositionend ($event) {
      this.composition = false
    },
    // 暂无完成按钮，此功能未实现
    _confirm ($event) {
      this.$trigger('confirm', $event, {
        value: this.valueSync
      })
    },
    _linechange ($event) {
      this.$trigger('linechange', $event, {
        value: this.valueSync
      })
    },
    _touchstart () {
      this.focusChangeSource = 'touch'
    },
    _resize ({ height }) {
      this.height = height
    },
    _input ($event) {
      if (this.composition) {
        this.valueComposition = $event.target.value
      }
    },
    _getFormData () {
      return {
        value: this.valueSync,
        key: this.name
      }
    },
    _resetFormData () {
      this.valueSync = ''
    }
  }
}
</script>

<style>
c-textarea {
  width: 300px;
  height: 150px;
  display: block;
  position: relative;
  font-size: 16px;
  line-height: 1.2;
}
.c-textarea-wrapped {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font: inherit;
  font-size: inherit;
  font-family: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-indent: inherit;
  color: inherit;
}
.c-textarea-placeholder,
.c-textarea-compute,
.c-textarea-textarea {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  word-break: break-all;
  font: inherit;
  font-size: inherit;
  font-family: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-indent: inherit;
  color: inherit;
}
.c-textarea-placeholder {
  color: grey;
}
.c-textarea-compute {
  visibility: hidden;
  height: auto;
}
.c-textarea-textarea {
  outline: none;
  border: none;
  padding: 0;
  resize: none;
  background-color: transparent;
  opacity: inherit;
}
.c-textarea-textarea::-webkit-input-placeholder {
  color: transparent;
}
.c-textarea-textarea:-moz-placeholder {
  color: transparent;
}
.c-textarea-textarea::-moz-placeholder {
  color: transparent;
}
.c-textarea-textarea:-ms-input-placeholder {
  color: transparent;
}
</style>
