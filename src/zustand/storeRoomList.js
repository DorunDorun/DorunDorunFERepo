import {create} from "zustand";
import {api} from '../shared/api'



const useStoreRoomList = create((set) => ({
  data: [],
  roomList:[],
  loading: false,
  hasErrors: false,
  fetchGetRoomList: async (payload) => {
    set(() => ({ loading: true }));
    try {
      console.log("방 불러오기 payload:", payload)
      const data = await api.get(
        `api/rooms/${payload}`
      );
      set((state) => ({ data: (state.data = data.data), loading: false }));
      set((state) => ({ roomList: (state.roomList = data.data.data.chattingRoomList), loading: false }));
      return data
      
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
      console.log('방 목록 불러오기 에러 : ' , err.response.data)
    }
  },
}));

export default useStoreRoomList;