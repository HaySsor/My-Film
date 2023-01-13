import { ref } from 'vue'

const idxArray = ref([]);

function getIdX() {
    let x = Math.floor(Math.random() * 200);
    if (idxArray.value.indexOf(x) !== 1) {
        idxArray.value.push(x);
        return x;
    }
    getIdX();
}

export default getIdX