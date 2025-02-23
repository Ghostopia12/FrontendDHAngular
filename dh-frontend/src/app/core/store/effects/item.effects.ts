import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { ItemService } from 'src/app/shared/services/item.service';
import * as ItemActions from '../actions/item.actions';

@Injectable()
export class ItemEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      switchMap(() =>
        this.itemService.getItemsFromBackend().pipe(
          map(response => ItemActions.loadItemsSuccess({ items: response })), // Accede a la propiedad "items" del JSON
          catchError(error => of(ItemActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.deleteItem), // Escucha la acción deleteItem
      mergeMap((action) =>
        this.itemService.deleteItemInBackend(action.itemId).pipe(
          map(() => ItemActions.deleteItemSuccess({ itemId: action.itemId })), // Despacha éxito
          catchError((error) => of(ItemActions.deleteItemFailure({ error }))) // Despacha error
      )
    )
  )
  );

  

  constructor(private actions$: Actions, private itemService: ItemService) {}
}