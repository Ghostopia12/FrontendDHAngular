import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/shared/enums/status.enum';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() itemCreated = new EventEmitter<Item>();
  @Output() itemUpdated = new EventEmitter<Item>();
  @Output('isEdit') edit = new EventEmitter<
    boolean
  >();
  isEditMode = false; // Para saber si estamos editando o creando
  currentItem: Item | null = null; // Ítem que se está editando

  itemForm: FormGroup;
  statuses = Object.values(Status); // Convierte el enum en un array

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required], // Enum para el status
      creation_date: [new Date().toISOString(), Validators.required], // Fecha de creación
      update_date: [new Date().toISOString(), Validators.required], // Fecha de actualización
    });
  }

  ngOnInit(): void {}

  loadItem(item: Item): void {
    this.isEditMode = true;
    this.currentItem = item;
    this.itemForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status,
      creation_date: item.creation_date,
      update_date: new Date().toISOString(), // Actualiza la fecha de modificación
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const itemData = this.itemForm.value;

      if (this.isEditMode && this.currentItem) {
        // Modo edición
        const updatedItem = { ...this.currentItem, ...itemData };
        this.itemService.updateItemInBackend(updatedItem).subscribe((response) => {
          this.itemUpdated.emit(response); // Emite el ítem actualizado
          this.onClose();
        });
      } else {
        // Modo creación
        this.itemService.createItemInBackend(itemData).subscribe((response) => {
          this.itemCreated.emit(response); // Emite el nuevo ítem
          this.onClose();
        });
      }
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
