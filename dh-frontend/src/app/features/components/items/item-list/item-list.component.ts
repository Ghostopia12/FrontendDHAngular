import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/shared/services/item.service';
import { Item } from 'src/app/shared/models/item.model';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { Store } from '@ngrx/store';
import * as ItemActions from '../../../../core/store/actions/item.actions';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @ViewChild(ItemModalComponent) modalComponent!: ItemModalComponent; // Referencia al modal
  items: Item[] = [];
  isModalOpen = false;
  checkedItems = new Map<number, boolean>();
  searchText = '';
  hasSelectedItems = false;
  isEdit = false;


  constructor(private itemService: ItemService, private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select("items").subscribe((items) => {
      console.log('Items from store:', items.items);
      this.items = items.items;
    });
  
    this.store.dispatch(ItemActions.loadItems());
  }

  updateItem(updatedItem: Item): void {
    this.store.dispatch(ItemActions.updateItem({ item: updatedItem }));
  }

  openModal(item?: Item): void {
    if (item) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    this.isModalOpen = true;
  }


  closeModal(): void {
    this.isModalOpen = false;
  }

  getTagClass(category: string): string {
    return category;
  }


  isItemChecked(index: number): boolean {
    return this.checkedItems.get(index) || false;
  }

  onCheckboxChange(index: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checkedItems.set(index, isChecked);

    this.hasSelectedItems = this.checkedItems.size > 0;
  }


  getSelectedItems(): Item[] {
    return this.items.filter((item, index) => this.checkedItems.get(index));
  }

/*   onItemCreated(newItem: any): void {
    this.items.push(newItem); // Agrega el nuevo ítem a la lista
    console.log('New item added:', newItem);
  } */

    get filteredItems(): Item[] {
      if (!this.searchText) {
        console.log('Items:', this.items);
        return this.items;
      }
      const searchTextLower = this.searchText.toLowerCase();
      const filtered = this.items.filter(item =>
        item.title.toLowerCase().includes(searchTextLower) ||
        item.description.toLowerCase().includes(searchTextLower)
      );
      console.log('Filtered Items:', filtered);
      return filtered;
    }

  printSelectedItems() {
    const selectedItems = this.getSelectedItems();
    console.log('Ítems seleccionados:', selectedItems);
    this.checkedItems.clear();
    this.hasSelectedItems = false;
  }

    loadItems(): void {
      this.store.dispatch(ItemActions.loadItems()); 
    }
  
    deleteItem(itemId: number): void {
      this.store.dispatch(ItemActions.deleteItem({ itemId })); 
    }
  
    onItemCreated(newItem: Item): void {
      this.store.dispatch(ItemActions.addItem({ item: newItem })); 
    }
  
    onItemUpdated(updatedItem: Item): void {
      this.store.dispatch(ItemActions.updateItem({ item: updatedItem }));
    }
}
