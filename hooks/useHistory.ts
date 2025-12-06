import { useHistoryStore } from "./useStore";

const useHistory = () => {
    const data = useHistoryStore((state) => state.history);
    
    return {
        data
    };
};

export default useHistory;