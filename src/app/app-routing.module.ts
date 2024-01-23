import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPokemonComponent } from './components/info-pokemon/info-pokemon.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';

const routes: Routes = [ 
  { path: '', component: CardPokemonComponent },
  { path: 'pokemon/:name', component: InfoPokemonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
