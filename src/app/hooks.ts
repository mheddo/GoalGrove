import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

// Typed versions of the hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
