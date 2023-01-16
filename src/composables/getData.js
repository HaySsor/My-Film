import axios from 'axios'
import { ref } from 'vue'
import getIdX from '../helper/moveIndex'

const getFilm = () => {
    const moveListFromAPI = ref()
    const loading = ref(false)
    const fallingGetData = ref(false)
    const getData = async () => {
        try {
            loading.value = true
            const res = await axios.get("http://localhost:3000/move")
            const data = await res.data;
            const moveL = data.map(item => {
                return { ...item, idx: getIdX() }
            })
            moveListFromAPI.value = moveL
            loading.value = false
        } catch (err) {
            fallingGetData.value = true
            loading.value = false
        }

    }
    return { loading, fallingGetData, moveListFromAPI, getData }
}

export default getFilm