import { createAction, props } from '@ngrx/store';
import { User } from './users-store';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const updateUsers = createAction(
  '[User] update Users ',
  props<{  users: User[]  }>()
);