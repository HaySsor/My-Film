<template>
  <li class="flex items-center relative bg-slate-100 rounded-xl p-2">
    <div class="w-7/12 px-0 pl-1">
      <p class="text-lg font-bold">{{ move.title }}</p>
      <div class="flex items-center gap-2">
        <p class="text-xs text-indigo-500">{{ move.year }}</p>
        <p class="text-xs text-indigo-700">{{ move.director }}</p>
      </div>
    </div>
    <div class="w-1/4">
      <p class="text-lg">
        <span class="text-indigo-700">{{ move.rate }} </span> / 10
      </p>
    </div>
    <div class="flex gap-3">
      <AppButton
        class="mt-auto mb-2"
        text="Usuń"
        color="red"
        @click="delateMove(move)" />
      <AppButton
        class="mt-auto mb-2"
        text="Edytuj"
        color="indigo"
        @click="editMove(move)" />
    </div>
  </li>
</template>

<script>
import AppButton from './AppButton.vue';
export default {
  name: 'MoveListItem',
  components: {AppButton},
  props: {
    move: {
      required: true,
      type: Object,
    },
    editMove: {
      required: true,
    },
    delateMove: {
      required: true,
    },
  },
  setup() {},
};
</script>

<style scoped></style>
