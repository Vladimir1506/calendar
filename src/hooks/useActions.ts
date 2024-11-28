import {useAppDispatch} from './useAppHooks';
import {actionCreators} from '../store/reducers/action-creators';
import {bindActionCreators} from 'redux';

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(actionCreators, dispatch)
}
