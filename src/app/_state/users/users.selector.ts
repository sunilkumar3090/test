import { createSelector } from '@ngrx/store';
import { UserState, UsersReducer } from './users.reducer';

export const selectUserState = (state: any) => state.users as UserState;



export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);
