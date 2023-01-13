import axios from 'axios'
import { ref } from 'vue'
import getIdX from '../helper/moveIndex'

const getFilm = () => {
    const moveListFromAPI = ref()
    const getData = async () => {
        const res = await axios.get("http://localhost:3000/move")
        const data = await res.data;
        const moveL = data.map(item => {
            return { ...item, idx: getIdX() }
        })
        moveListFromAPI.value = moveL
    }
    return { moveListFromAPI, getData }
}

export default getFilm