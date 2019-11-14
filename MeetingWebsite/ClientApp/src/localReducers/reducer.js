import {combineReducers} from 'redux'
import RecipientReducer from './activeRecipient'
var allReducers= combineReducers(
{
    ActiveRecipient:RecipientReducer
});
export default allReducers;