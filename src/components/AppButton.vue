<template>
  <button class="p-2 px-3.5 rounded-lg">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    text: {
      required: true,
      type: String,
    },
  },
  setup() {},
};
</script>
<style scoped>
button {
  font-family: 'Montserrat', sans-serif;
}
</style>
