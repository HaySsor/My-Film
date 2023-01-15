<template>
  <div
    class="modal absolute w-64 h-32 bg-slate-300 rounded-xl p-2 flex justify-center items-center flex-col gap-2">
    <h3 class="text-center text-xl">Potwierdź usunięcie</h3>
    <div class="flex gap-5">
      <AppButton
        class="mt-auto mb-2 bg-green-500 shadow-lg shadow-green-500/50 text-white font-bold hover:bg-green-800 hover:shadow-green-800/50"
        text="Tak"
        color="indigo"
        @click="handleConfirm(true)" />
      <AppButton
        class="mt-auto mb-2 bg-red-500 shadow-lg shadow-red-500/50 text-white font-bold hover:bg-red-800 hover:shadow-red-800/50"
        text="Nie"
        @click="handleConfirm(false)" />
    </div>
  </div>
</template>

<script>
import AppButton from './AppButton.vue';
export default {
  name: 'DeleteModal',
  props: {
    closeDelModal: {
      required: true,
    },
    deleteMoveF: {
      required: true,
    },
  },
  components: {AppButton},
  setup(props) {
    function handleConfirm(declaration) {
      props.deleteMoveF(declaration);
      props.closeDelModal();
    }

    return {handleConfirm};
  },
};
</script>

<style scoped>
.modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
