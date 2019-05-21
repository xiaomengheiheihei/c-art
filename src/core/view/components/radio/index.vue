<template>
  <c-radio
    v-on="$listeners"
    @click="_onClick">
    <div class="c-radio-wrapper">
      <div
        :class="radioChecked ? 'c-radio-input-checked' : ''"
        :style="radioChecked ? checkedStyle : ''"
        class="c-radio-input" />
      <slot />
    </div>
  </c-radio>
</template>
<script>
import {
  emitter,
  listeners
} from 'uni-mixins'
export default {
  name: 'Radio',
  mixins: [emitter, listeners],
  props: {
    checked: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: '#007AFF'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      radioChecked: this.checked,
      radioValue: this.value
    }
  },
  computed: {
    checkedStyle () {
      return `background-color: ${this.color};border-color: ${this.color};`
    }
  },
  watch: {
    checked (val) {
      this.radioChecked = val
    },
    value (val) {
      this.radioValue = val
    }
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  },
  created () {
    this.$dispatch('RadioGroup', 'c-radio-group-update', {
      type: 'add',
      vm: this
    })
    this.$dispatch('Form', 'c-form-group-update', {
      type: 'add',
      vm: this
    })
  },
  beforeDestroy () {
    this.$dispatch('RadioGroup', 'c-radio-group-update', {
      type: 'remove',
      vm: this
    })
    this.$dispatch('Form', 'c-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _onClick ($event) {
      if (this.disabled || this.radioChecked) {
        return
      }
      this.radioChecked = true
      this.$dispatch('RadioGroup', 'c-radio-change', $event, this)
    },
    _resetFormData () {
      this.radioChecked = this.min
    }
  }
}
</script>
<style>
	c-radio {
		-webkit-tap-highlight-color: transparent;
		display: inline-block;
	}

	c-radio[hidden] {
		display: none;
	}

	c-radio .c-radio-wrapper {
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-align-items: center;
		align-items: center;
		vertical-align: middle;
	}

	c-radio .c-radio-input {
		-webkit-appearance: none;
		appearance: none;
		margin-right: 5px;
		outline: 0;
		border: 1px solid #D1D1D1;
		background-color: #ffffff;
		border-radius: 50%;
		width: 22px;
		height: 22px;
		position: relative;
	}

	c-radio .c-radio-input.c-radio-input-checked:before {
		font: normal normal normal 14px/1 "uni";
		content: "\EA08";
		color: #ffffff;
		font-size: 18px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -48%) scale(0.73);
		-webkit-transform: translate(-50%, -48%) scale(0.73);
	}

	c-radio .c-radio-input.c-radio-input-disabled {
		background-color: #E1E1E1;
		border-color: #D1D1D1;
	}

	c-radio .c-radio-input.c-radio-input-disabled:before {
		color: #ADADAD;
	}

	c-radio-group {
		display: block;
	}
</style>
