import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import { InfoPokemonComponent } from './components/info-pokemon/info-pokemon.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CardPokemonComponent },
  { path: 'pokemon/:name', component: InfoPokemonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CardPokemonComponent,
    InfoPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
