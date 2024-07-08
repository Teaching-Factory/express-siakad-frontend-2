import { createData, getData } from "../../utiils/request"
const base_url = 'jenis-tagihan';

export const getJenisTagihan = async () => {
    try {
        const res = await getData(`${base_url}`);
        
        return res
    } catch (err) {
        throw err
    }    
}

export const createJenisTagihan =  async (payload) => {
    try {
        const res = await createData(`${base_url}/create`, payload)
        
        return res
    } catch (err) {
        throw err
    }    

}
