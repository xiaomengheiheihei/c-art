<template>
  <c-switch
    v-on="$listeners"
    @click="_onClick">
    <div class="c-switch-wrapper">
      <div
        v-show="type === 'switch'"
        :class="[switchChecked ? 'c-switch-input-checked' : '']"
        :style="{backgroundColor: switchChecked ? color : '#DFDFDF',borderColor:switchChecked ? color : '#DFDFDF'}"
        class="c-switch-input" />
      <div
        v-show="type === 'checkbox'"
        :class="[switchChecked ? 'c-checkbox-input-checked' : '']"
        :style="{color: color}"
        class="c-checkbox-input" />
    </div>
  </c-switch>
</template>
<script>
import {
  emitter,
  listeners
} from 'uni-mixins'

export default {
  name: 'Switch',
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ''
    },
    checked: {
      type: [Boolean, String],
      default: false
    },
    type: {
      type: String,
      default: 'switch'
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
      default: '#007aff'
    }
  },
  data () {
    return {
      switchChecked: this.checked
    }
  },
  watch: {
    checked (val) {
      this.switchChecked = val
    }
  },
  created () {
    this.$dispatch('Form', 'c-form-group-update', {
      type: 'add',
      vm: this
    })
  },
  beforeDestroy () {
    this.$dispatch('Form', 'c-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  },
  methods: {
    _onClick ($event) {
      if (this.disabled) {
        return
      }
      this.switchChecked = !this.switchChecked
      this.$trigger('change', $event, {
        value: this.switchChecked
      })
    },
    _resetFormData () {
      this.switchChecked = false
    },
    _getFormData () {
      let data = {}
      if (this.name !== '') {
        data['value'] = this.switchChecked
        data['key'] = this.name
      }
      return data
    }
  }
}
</script>
<style>
	c-switch {
		-webkit-tap-highlight-color: transparent;
		display: inline-block;
	}

	c-switch[hidden] {
		display: none;
	}

	c-switch .c-switch-wrapper {
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-align-items: center;
		align-items: center;
		vertical-align: middle;
	}

	c-switch .c-switch-input {
		-webkit-appearance: none;
		appearance: none;
		position: relative;
		width: 52px;
		height: 32px;
		margin-right: 5px;
		border: 1px solid #DFDFDF;
		outline: 0;
		border-radius: 16px;
		box-sizing: border-box;
		background-color: #DFDFDF;
		transition: background-color 0.1s, border 0.1s;
	}

	c-switch .c-switch-input:before {
		content: " ";
		position: absolute;
		top: 0;
		left: 0;
		width: 50px;
		height: 30px;
		border-radius: 15px;
		background-color: #FDFDFD;
		transition: -webkit-transform 0.3s;
		transition: transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
	}

	c-switch .c-switch-input:after {
		content: " ";
		position: absolute;
		top: 0;
		left: 0;
		width: 30px;
		height: 30px;
		border-radius: 15px;
		background-color: #FFFFFF;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
		transition: -webkit-transform 0.3s;
		transition: transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
	}

	c-switch .c-switch-input.c-switch-input-checked {
		border-color: #007aff;
		background-color: #007aff;
	}

	c-switch .c-switch-input.c-switch-input-checked:before {
		-webkit-transform: scale(0);
		transform: scale(0);
	}

	c-switch .c-switch-input.c-switch-input-checked:after {
		-webkit-transform: translateX(20px);
		transform: translateX(20px);
	}

	c-switch .c-checkbox-input {
		margin-right: 5px;
		-webkit-appearance: none;
		appearance: none;
		outline: 0;
		border: 1px solid #D1D1D1;
		background-color: #FFFFFF;
		border-radius: 3px;
		width: 22px;
		height: 22px;
		position: relative;
		color: #007aff;
	}

	c-switch .c-checkbox-input.c-checkbox-input-checked:before {
		font: normal normal normal 14px/1 "uni";
		content: "\EA08";
		color: inherit;
		font-size: 22px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -48%) scale(0.73);
		-webkit-transform: translate(-50%, -48%) scale(0.73);
	}

	c-switch .c-checkbox-input.c-checkbox-input-disabled {
		background-color: #E1E1E1;
	}

	c-switch .c-checkbox-input.c-checkbox-input-disabled:before {
		color: #ADADAD;
	}
</style>
