// store/hooks.ts
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';

// Sử dụng kiểu cụ thể cho useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Sử dụng kiểu cụ thể cho useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
