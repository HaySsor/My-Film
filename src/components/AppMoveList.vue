<template>
  <TransitionGroup
    name="list"
    class="flex flex-col gap-2 mb-20"
    tag="ul"
    mode="out-in">
    <AppMoveListItem
      v-for="move in moveLisWithNoDuplication"
      :key="move.idx"
      :move="move"
      :editMove="edit"
      :delateMove="delMove" />
  </TransitionGroup>
  <AppModalEdit
    v-if="showModal"
    :move="eMove"
    :closeModal="closeModal"
    :changeMove="changeMove" />
  <AppModalAdd
    v-if="showModalAdd"
    :addMoveToList="addMoveToList"
    :closeModalAdd="closeModalAdd" />

  <AppDeleteModal
    v-if="showModalDelete"
    :deleteMoveF="deleteMoveF"
    :closeDelModal="closeDelModal" />
</template>

<script>
import AppMoveListItem from './AppMoveListItem.vue';
import AppModalEdit from './AppModalEdit.vue';
import AppModalAdd from './AppModalAdd.vue';
import {ref, computed, watch, TransitionGroup} from 'vue';
import getIdX from '../helper/moveIndex';
import getFilm from '../composables/getData';
import AppDeleteModal from '../components/AppDeleteModal.vue';

export default {
  name: 'AppMoveList',
  components: {
    AppMoveListItem,
    AppModalEdit,
    AppModalAdd,
    TransitionGroup,
    AppDeleteModal,
  },
  props: {
    showModalAdd: {
      required: true,
      type: Boolean,
    },
    closeModalAdd: {
      required: true,
      type: Function,
    },
    flag: {
      required: true,
    },
  },
  setup(props) {
    const {moveListFromAPI, getData} = getFilm();

    const moveList = ref([]);

    const moveLisWithNoDuplication = computed(() => {
      const ArrayMoveList = moveList.value.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.title === value.title
          )
      );
      return ArrayMoveList;
    });

    const flag = computed(() => {
      return props.flag;
    });
    watch(flag, async () => {
      await getData();
      moveListFromAPI.value.forEach((item) => {
        moveList.value.push(item);
      });
    });

    const showModal = ref(false);
    const eMove = ref();

    function edit(move) {
      eMove.value = {};
      eMove.value = {...move};
      showModal.value = true;
    }
    function closeModal() {
      showModal.value = false;
    }
    function changeMove(chMove) {
      let editedMove = moveList.value.filter((item) => {
        return item.idx === chMove.idx;
      });
      Object.assign(editedMove[0], chMove);
    }
    function addMoveToList(move) {
      const newMove = {...move, idx: getIdX()};

      moveList.value.push(newMove);
    }

    const showModalDelete = ref(false);
    const delMoveHandler = ref();

    function delMove(move) {
      delMoveHandler.value = {};
      delMoveHandler.value = {...move};
      showModalDelete.value = true;
    }
    function deleteMoveF(declaration) {
      if (declaration) {
        let x = moveList.value.filter(
          (item) => item.idx !== delMoveHandler.value.idx
        ); //
        moveList.value = x;
      }
      return;
    }
    function closeDelModal() {
      showModalDelete.value = false;
    }

    return {
      delMove,
      moveList,
      edit,
      showModal,
      eMove,
      closeModal,
      changeMove,
      addMoveToList,
      showModalDelete,
      deleteMoveF,
      closeDelModal,
      moveLisWithNoDuplication,
    };
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
</style>
