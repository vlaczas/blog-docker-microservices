<template>
  <div class="col">
    <div class="border border-info rounded-3 aspratio-3x2 text-center p-2">
      <h2>{{ info.title }}</h2>
      <hr>
      <PostComment :post="info" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style>
.aspratio-3x2 {
  aspect-ratio: 3 / 2;
}
</style>
