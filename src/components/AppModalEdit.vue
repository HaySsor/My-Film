<template>
  <div class="absolute inset-0">
    <div
      class="bg-gray-800 w-full h-full opacity-60 absolute"
      @click="closeModal"></div>

    <form class="window" @submit.prevent="submit">
      <h2 class="text-center pb-5 font-bold">Edytuj film</h2>
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
        <span
          class="w-full text-center text-amber-600 text-sm"
          v-if="v$.title.$error"
          >Pole nie może być puste ale nie większe niż <br />200 znaków</span
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
      <AppButton text="Edytuj" color="indigo" />
    </form>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import {computed, reactive} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {required, minValue, maxValue, maxLength} from '@vuelidate/validators';

export default {
  name: 'AppEditModal',
  props: {
    move: {
      required: true,
      type: Object,
    },
    closeModal: {
      required: true,
    },
    changeMove: {
      required: true,
    },
  },
  components: {AppButton},

  setup(props) {
    const move = reactive({
      id: props.id,
      title: props.move.title,
      director: props.move.director,
      year: props.move.year,
      rate: props.move.rate,
      idx: props.move.idx,
    });
    const rules = computed(() => ({
      title: {
        required,
        maxLengthValue: maxLength(200),
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
      props.changeMove(move);
      props.closeModal();
    }

    return {move, v$, submit};
  },
};
</script>

<style scoped></style>
