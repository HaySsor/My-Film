<template>
  <button :class="cl">
    {{ text }}
  </button>
</template>

<script>
import {computed} from '@vue/reactivity';

export default {
  name: 'AppButton',
  props: {
    text: {
      required: true,
      type: String,
    },
    color: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    console.log(props.color)
    const cl = computed(() => {
      return `p-2 px-3.5 rounded-lg bg-${props.color}-500 shadow-lg shadow-${props.color}-500/50 text-white font-bold hover:bg-${props.color}-800 hover:shadow-${props.color}-800/50"`;
    });
    return {cl};
  },
};
</script>
<style scoped>
button {
  font-family: 'Montserrat', sans-serif;
}
</style>
