import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as PokemonService from '../../service/PokemonService';
import { Pokemon } from "../../interface";

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.css']
})
export class InfoPokemonComponent implements OnInit {
  
  pokemon: Pokemon | undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe( async params => {
      let pokemonName = params['name']
      const pokemon = await PokemonService.getPokemonName(pokemonName)
      this.pokemon = pokemon
    });
  }

  backToList(){
    this.router.navigate([``]);
  }

}
