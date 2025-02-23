import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { deleteItem } from '../../core/store/actions/item.actions';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');
  private apiUrl = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) {}


  getItems(): Item[] {
    return this.items;
  }

  createItem(item: Item): void {
    this.addItem
}

  addItem(item: Item): void {
    this.items.push(item);
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  updateItem(updatedItem: Item): void {
    this.items = this.items.map(item =>
      item.title === updatedItem.title ? { ...item, ...updatedItem } : item
    );
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  deleteItem(itemId: number): void {
    this.items.splice(itemId, 1);
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  getItemsFromBackend(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  createItemInBackend(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItemInBackend(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItemInBackend(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }
}
