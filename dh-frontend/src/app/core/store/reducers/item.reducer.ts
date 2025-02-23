import { createReducer, on } from '@ngrx/store';
import { Item } from 'src/app/shared/models/item.model';
import * as ItemActions from '../actions/item.actions';

export interface State {
  items: Item[]; // El estado contiene un array de ítems
}

export const initialState: State = {
  items: [] // Inicializado como un array vacío
};

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items // Actualiza la lista de ítems
  })),
  on(ItemActions.addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item] // Añade un nuevo ítem
  })),
  on(ItemActions.updateItem, (state, { item }) => ({
    ...state,
    items: state.items.map(i => (i.id === item.id ? { ...i, ...item } : i)) // Actualiza un ítem
  })),
  on(ItemActions.deleteItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((_, index) => index !== itemId) // Elimina un ítem
  }))
);