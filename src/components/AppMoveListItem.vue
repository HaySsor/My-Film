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
        class="mt-auto mb-2 bg-red-500 shadow-lg shadow-red-500/50 text-white font-bold hover:bg-red-800 hover:shadow-red-800/50"
        text="Usuń"
        @click="delateMove(move)" />
      <AppButton
        text="Edytuj"
        class="mt-auto mb-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white font-bold hover:bg-indigo-800 hover:shadow-indigo-800/50"
        @click="editMove(move)" />
    </div>
  </li>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
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
