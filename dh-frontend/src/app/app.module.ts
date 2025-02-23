import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './features/components/items/item-list/item-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemModalComponent } from './features/components/items/item-modal/item-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { itemReducer } from './core/store/reducers/item.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './core/store/effects/item.effects'; // Importa los efectos
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Importa el entorno

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ items: itemReducer }), // Configura el store
    EffectsModule.forRoot([ItemEffects]), // Configura los efectos
    StoreDevtoolsModule.instrument({ // Configura las herramientas de desarrollo
      maxAge: 25, // Retiene las últimas 25 acciones
      logOnly: environment.production, // Solo en modo producción
    }),
  ],
  exports: [
    ItemModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}