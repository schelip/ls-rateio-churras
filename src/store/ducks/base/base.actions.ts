/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { PersonTypes } from '../person/person.types';
import { ExpenseTypes } from '../expense/expense.types';
import { BaseTypes } from './base.types';

export const loadRequest = () => action(BaseTypes.LOAD_REQUEST);
export const createRequest = (data: any) => action(BaseTypes.CREATE_REQUEST, data);
export const createPersonRequest = (data: any) => action(PersonTypes.PERSON_CREATE_REQUEST, data);
export const createExpenseRequest = (data: any) => action(ExpenseTypes.EXPENSE_CREATE, data);
