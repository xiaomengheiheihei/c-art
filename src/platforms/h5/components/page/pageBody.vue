<template>
  <c-page-wrapper>
    <c-page-body>
      <slot />
    </c-page-body>
  </c-page-wrapper>
</template>
<style>
c-page-wrapper {
  display: block;
  height: 100%;
  position: relative;
}

c-page-head[c-page-head-type="default"] ~ c-page-wrapper {
  height: calc(100% - 44px);
}

.c-app--showtabbar c-page-wrapper {
  display: block;
  height: calc(100% - 50px);
  height: calc(100% - 50px - constant(safe-area-inset-bottom));
  height: calc(100% - 50px - env(safe-area-inset-bottom));
}

.c-app--showtabbar c-page-wrapper::after {
  content: "";
  display: block;
  width: 100%;
  height: 50px;
  height: calc(50px + constant(safe-area-inset-bottom));
  height: calc(50px + env(safe-area-inset-bottom));
}

.c-app--showtabbar c-page-head[c-page-head-type="default"] ~ c-page-wrapper {
  height: calc(100% - 44px - 50px);
  height: calc(100% - 44px - 50px - constant(safe-area-inset-bottom));
  height: calc(100% - 44px - 50px - env(safe-area-inset-bottom));
}

c-page-body {
  display: block;
  box-sizing: border-box;
  width: 100%;
}
</style>
<script>
export default {
  name: 'PageBody'
}
</script>
