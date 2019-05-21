<script>
import {
  hover,
  emitter,
  listeners
} from 'uni-mixins'
export default {
  name: 'Button',
  mixins: [hover, emitter, listeners],
  props: {
    hoverClass: {
      type: String,
      default: 'button-hover'
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: Number,
      default: 20
    },
    hoverStayTime: {
      type: Number,
      default: 70
    },
    formType: {
      type: String,
      default: '',
      validator (value) {
        // 只有这几个可取值，其它都是非法的。
        return ~['', 'submit', 'reset'].indexOf(value)
      }
    }
  },
  data () {
    return {
      clickFunction: null
    }
  },
  methods: {
    _onClick ($event, isLabelClick) {
      if (this.disabled) {
        return
      }
      if (isLabelClick) {
        this.$el.click()
      }
      // TODO 通知父表单执行相应的行为
      if (this.formType) {
        this.$dispatch('Form', this.formType === 'submit' ? 'c-form-submit' : 'c-form-reset', {
          type: this.formType
        })
      }
    },
    _bindObjectListeners (data, value) {
      if (value) {
        for (let key in value) {
          let existing = data.on[key]
          let ours = value[key]
          data.on[key] = existing ? [].concat(existing, ours) : ours
        }
      }
      return data
    }
  },
  render (createElement) {
    let $listeners = Object.create(null)
    if (this.$listeners) {
      Object.keys(this.$listeners).forEach(e => {
        if (this.disabled && (e === 'click' || e === 'tap')) {
          return
        }
        $listeners[e] = this.$listeners[e]
      })
    }
    if (this.hoverClass && this.hoverClass !== 'none') {
      return createElement('c-button', this._bindObjectListeners({
        class: [this.hovering ? this.hoverClass : ''],
        attrs: {
          'disabled': this.disabled
        },
        on: {
          touchstart: this._hoverTouchStart,
          touchend: this._hoverTouchEnd,
          touchcancel: this._hoverTouchCancel,
          click: this._onClick
        }
      }, $listeners), this.$slots.default)
    } else {
      return createElement('c-button', this._bindObjectListeners({
        class: [this.hovering ? this.hoverClass : ''],
        attrs: {
          'disabled': this.disabled
        },
        on: {
          click: this._onClick
        }
      }, $listeners), this.$slots.default)
    }
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  }
}
</script>
<style>
	c-button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 14px;
		padding-right: 14px;
		box-sizing: border-box;
		font-size: 18px;
		text-align: center;
		text-decoration: none;
		line-height: 2.55555556;
		border-radius: 5px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background-color: #F8F8F8;
	}

	c-button[hidden] {
		display: none !important;
	}

	c-button:after {
		content: " ";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid rgba(0, 0, 0, 0.2);
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		box-sizing: border-box;
		border-radius: 10px;
	}

	c-button[native] {
		padding-left: 0;
		padding-right: 0;
	}

	c-button[native] .c-button-cover-view-wrapper {
		border: inherit;
		border-color: inherit;
		border-radius: inherit;
		background-color: inherit;
	}

	c-button[native] .c-button-cover-view-inner {
		padding-left: 14px;
		padding-right: 14px;
	}

	c-button c-cover-view {
		line-height: inherit;
		white-space: inherit;
	}

	c-button[type=default] {
		color: #000000;
		background-color: #F8F8F8;
	}

	c-button[type=primary] {
		color: #FFFFFF;
		background-color: #007aff;
	}

	c-button[type=warn] {
		color: #FFFFFF;
		background-color: #E64340;
	}

	c-button[disabled] {
		color: rgba(255, 255, 255, 0.6);
	}

	c-button[disabled][type=default],
	c-button[disabled]:not([type]) {
		color: rgba(0, 0, 0, 0.3);
		background-color: #F7F7F7;
	}

	c-button[disabled][type=primary] {
		background-color: rgba(0, 122, 255, 0.6);
	}

	c-button[disabled][type=warn] {
		background-color: #EC8B89;
	}

	c-button[type=primary][plain] {
		color: #007aff;
		border: 1px solid #007aff;
		background-color: transparent;
	}

	c-button[type=primary][plain][disabled] {
		color: rgba(0, 0, 0, 0.2);
		border-color: rgba(0, 0, 0, 0.2);
	}

	c-button[type=primary][plain]:after {
		border-width: 0;
	}

	c-button[type=default][plain] {
		color: #353535;
		border: 1px solid #353535;
		background-color: transparent;
	}

	c-button[type=default][plain][disabled] {
		color: rgba(0, 0, 0, 0.2);
		border-color: rgba(0, 0, 0, 0.2);
	}

	c-button[type=default][plain]:after {
		border-width: 0;
	}

	c-button[plain] {
		color: #353535;
		border: 1px solid #353535;
		background-color: transparent;
	}

	c-button[plain][disabled] {
		color: rgba(0, 0, 0, 0.2);
		border-color: rgba(0, 0, 0, 0.2);
	}

	c-button[plain]:after {
		border-width: 0;
	}

	c-button[plain][native] .c-button-cover-view-inner {
		padding: 0;
	}

	c-button[type=warn][plain] {
		color: #e64340;
		border: 1px solid #e64340;
		background-color: transparent;
	}

	c-button[type=warn][plain][disabled] {
		color: rgba(0, 0, 0, 0.2);
		border-color: rgba(0, 0, 0, 0.2);
	}

	c-button[type=warn][plain]:after {
		border-width: 0;
	}

	c-button[size=mini] {
		display: inline-block;
		line-height: 2.3;
		font-size: 13px;
		padding: 0 1.34em;
	}

	c-button[size=mini][native] {
		padding: 0;
	}

	c-button[size=mini][native] .c-button-cover-view-inner {
		padding: 0 1.34em;
	}

	c-button[loading]:before {
		content: " ";
		display: inline-block;
		width: 18px;
		height: 18px;
		vertical-align: middle;
		-webkit-animation: c-loading 1s steps(12, end) infinite;
		animation: c-loading 1s steps(12, end) infinite;
		background-size: 100%;
	}

	c-button[loading][type=primary] {
		color: rgba(255, 255, 255, 0.6);
		background-color: #0062cc;
	}

	c-button[loading][type=primary][plain] {
		color: #007aff;
		background-color: transparent;
	}

	c-button[loading][type=default] {
		color: rgba(0, 0, 0, 0.6);
		background-color: #DEDEDE;
	}

	c-button[loading][type=default][plain] {
		color: #353535;
		background-color: transparent;
	}

	c-button[loading][type=warn] {
		color: rgba(255, 255, 255, 0.6);
		background-color: #CE3C39;
	}

	c-button[loading][type=warn][plain] {
		color: #e64340;
		background-color: transparent;
	}

	c-button[loading][native]:before {
		content: none;
	}

	.button-hover {
		color: rgba(0, 0, 0, 0.6);
		background-color: #DEDEDE;
	}

	.button-hover[plain] {
		color: rgba(53, 53, 53, 0.6);
		border-color: rgba(53, 53, 53, 0.6);
		background-color: transparent;
	}

	.button-hover[type=primary] {
		color: rgba(255, 255, 255, 0.6);
		background-color: #0062cc;
	}

	.button-hover[type=primary][plain] {
		color: rgba(26, 173, 25, 0.6);
		border-color: rgba(26, 173, 25, 0.6);
		background-color: transparent;
	}

	.button-hover[type=default] {
		color: rgba(0, 0, 0, 0.6);
		background-color: #DEDEDE;
	}

	.button-hover[type=default][plain] {
		color: rgba(53, 53, 53, 0.6);
		border-color: rgba(53, 53, 53, 0.6);
		background-color: transparent;
	}

	.button-hover[type=warn] {
		color: rgba(255, 255, 255, 0.6);
		background-color: #CE3C39;
	}

	.button-hover[type=warn][plain] {
		color: rgba(230, 67, 64, 0.6);
		border-color: rgba(230, 67, 64, 0.6);
		background-color: transparent;
	}
</style>
