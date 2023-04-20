import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { User } from './users-store';
export const userFeatureKey = 'user';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};



export const UsersReducer = createReducer(
  initialState,

  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.updateUsers, (state,  { users } ) => ({
      ...state,
      users,
      loading: false,
      error: null,
    })),
);
