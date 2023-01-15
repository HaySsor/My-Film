<template>
  <div class="absolute inset-0">
    <div
      class="bg-gray-800 w-full h-full opacity-60 absolute"
      @click="closeModalAdd"></div>
    <form class="window" @submit.prevent="submit">
      <h2 class="text-center pb-5 font-bold text-lg">Edytuj film</h2>
      <div class="flex items-center justify-around flex-wrap">
        <label class="flex-1 text-center">Tytuł</label>
        <input
          type="text"
          class="border-indigo-500 border rounded-xl text-center"
          :style="{
            border: v$.title.$error
              ? '1px solid  rgb(217, 119, 6 )'
              : '1px solid rgb(99,102, 241 )',
          }"
          v-model="move.title" />
        <span class="w-full text-center text-amber-600" v-if="v$.title.$error"
          >Pole nie może być puste</span
        >
      </div>
      <div class="flex items-center justify-around flex-wrap">
        <label class="flex-1 text-center">Reżyser</label>
        <input
          type="text"
          class="border-indigo-500 border rounded-xl text-center"
          :style="{
            border: v$.director.$error
              ? '1px solid  rgb(217, 119, 6 )'
              : '1px solid rgb(99,102, 241 )',
          }"
          v-model="move.director" />
        <span
          class="w-full text-center text-amber-600"
          v-if="v$.director.$error"
          >Pole nie może być puste</span
        >
      </div>
      <div class="flex items-center justify-around flex-wrap">
        <label class="flex-1 text-center">Rok Produkcji</label>
        <input
          type="text"
          class="border-indigo-500 border rounded-xl text-center"
          :style="{
            border: v$.year.$error
              ? '1px solid  rgb(217, 119, 6 )'
              : '1px solid rgb(99,102, 241 )',
          }"
          v-model="move.year" />
        <span class="w-full text-center text-amber-600" v-if="v$.year.$error"
          >Rok musi być między latami 1900-2200</span
        >
      </div>
      <div class="flex items-center justify-around flex-wrap">
        <label class="flex-1 text-center">Ocena</label>
        <input
          type="text"
          class="border-indigo-500 border rounded-xl text-center"
          :style="{
            border: v$.rate.$error
              ? '1px solid  rgb(217, 119, 6 )'
              : '1px solid rgb(99,102, 241 )',
          }"
          v-model="move.rate" />
        <span class="w-full text-center text-amber-600" v-if="v$.rate.$error"
          >Ocena między 1-10</span
        >
      </div>
      <AppButton
        class="mt-auto mb-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white font-bold hover:bg-indigo-800 hover:shadow-indigo-800/50"
        text="Edytuj" />
    </form>
  </div>
</template>

<script>
import {computed, reactive} from 'vue'; // or '@vue/composition-api' in Vue 2.x
import {useVuelidate} from '@vuelidate/core';
import {required, minValue, maxValue} from '@vuelidate/validators';
import AppButton from '@/components/AppButton.vue';
export default {
  neme: 'AppModalAdd',
  props: {
    closeModalAdd: {
      required: true,
    },
    addMoveToList: {
      required: true,
    },
  },
  components: {
    AppButton,
  },
  setup(props) {
    const move = reactive({
      title: '',
      director: '',
      year: '',
      rate: '',
      idx: '',
    });
    const rules = computed(() => ({
      title: {
        required,
      },
      director: {
        required,
      },
      year: {
        required,
        minValue: minValue(1900),
        maxValue: maxValue(2200),
      },
      rate: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(10),
      },
    }));

    const v$ = useVuelidate(rules, move);

    async function submit() {
      const result = await this.v$.$validate();
      if (!result) {
        console.log('pusto');
        return;
      }
      props.addMoveToList(move);
      props.closeModalAdd();
    }

    return {move, v$, submit};
  },
};
</script>

<style scoped></style>
