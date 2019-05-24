<template>
  <div class="c-async-loading">
    <i class="c-loading" />
  </div>
</template>
<style>
	.c-async-loading {
    box-sizing: border-box;
		width: 100%;
		padding: 50px;
		text-align: center;
	}

	.c-async-loading .c-loading {
		width: 30px;
		height: 30px;
	}
</style>
<script>
export default {
  name: 'AsyncLoading'
}
</script>
