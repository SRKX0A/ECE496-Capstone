import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/reduxStore";

// Use throughout your app instead of plain `useDispatch`
const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
