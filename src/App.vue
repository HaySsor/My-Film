<template>
  <main class="main">
    <section
      class="bg-zinc-50 rounded-xl screen border-none p-4 overflow-hidden">
      <header
        class="border-b-2 pb-3 flex items-center justify-between relative">
        <AppButton
          text="Pobierz"
          class="bg-green-500 shadow-lg shadow-green-500/50 text-white font-bold hover:bg-green-800 hover:shadow-green-800/50"
          @click="getDataFromAPI" />
        <h1 class="font-bold text-4xl text-center flex-1 Font">Move-App</h1>
        <AppButton
          @click="addMove"
          text="Dodaj"
          color="indigo"
          class="bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white font-bold hover:bg-indigo-800 hover:shadow-indigo-800/50" />
      </header>
      <main class="h-full pt-5 overflow-scroll">
        <AppMoveList
          :showModalAdd="showModalAdd"
          :closeModalAdd="closeModal"
          :flag="flag" />
      </main>
    </section>
  </main>
</template>
<script>
import AppButton from './components/AppButton.vue';
import AppMoveList from '@/components/AppMoveList.vue';
import {ref} from 'vue';
export default {
  name: 'App',
  components: {AppButton, AppMoveList},
  setup() {
    const showModalAdd = ref(false);
    const flag = ref(true);

    function addMove() {
      showModalAdd.value = true;
    }
    function closeModal() {
      showModalAdd.value = false;
    }
    function getDataFromAPI() {
      flag.value = !flag.value;
    }

    return {showModalAdd, addMove, closeModal, getDataFromAPI, flag};
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.Font {
  font-family: 'Moon Dance', cursive;
}
.screen {
  width: 600px;
  height: 600px;
  position: relative;
}
.screen::after,
.screen::before {
  position: absolute;
  content: '';
  width: 60%;
  left: 50%;
  transform: translateX(-50%);
}
.screen::before {
  height: 200px;
  background-color: #121111;
  bottom: 100px;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  animation: claps-bottom 5s cubic-bezier(0.4, 0, 1, 1) forwards;
  content: 'Moje filmy';
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
}
.screen::after {
  height: 100px;
  background-color: #a1a1a1;
  bottom: 300px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  animation: claps-top 5s cubic-bezier(0.4, 0, 1, 1) forwards;
  transform-origin: bottom right;
}

@keyframes claps-top {
  0% {
    transform: translateX(-50%);
  }
  20% {
    transform: translateX(-50%) rotate(30deg);
  }
  40% {
    transform: translateX(-50%) rotate(0deg);
  }
  60% {
    transform: translateX(300px);
  }
  80% {
    transform: translateX(300px);
  }
  100% {
    transform: translateX(300px);
    opacity: 0;
  }
}
@keyframes claps-bottom {
  0% {
    transform: translateX(-50%);
  }
  20% {
    transform: translateX(-50%);
  }
  40% {
    transform: translateX(-50%);
  }
  60% {
    transform: translateX(300px);
  }
  80% {
    transform: translateX(300px);
  }
  100% {
    transform: translateX(300px);
    opacity: 0;
  }
}
</style>
