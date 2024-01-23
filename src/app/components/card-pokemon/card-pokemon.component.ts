import { Component, Input, OnInit } from '@angular/core';
import * as PokemonService from '../../service/PokemonService';
import { Pokemon } from "../../interface";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css'],
})
export class CardPokemonComponent implements OnInit {

  @Input() pokeName: string | undefined;
  pokemons: (Pokemon | undefined)[] = [];
  currentPage: number = 1
  pageSize: number = 8
  totalPages: number = 0;


  constructor(private router: Router, private active: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await this.loadPokemonList()
  }

  async loadPokemonList(): Promise<void> {
    const pokemonArray: (Pokemon | undefined)[] = await PokemonService.getAllPokemon(this.currentPage, this.pageSize)
    console.log(pokemonArray.length)
    this.totalPages = Math.ceil(pokemonArray.length * this.pageSize);
    this.pokemons = pokemonArray;
  }

  async searchPokemon(): Promise<(Pokemon | undefined)[]> {
    this.pokemons = !!this.pokeName?.toLocaleLowerCase() ? [await PokemonService.searchPokemon(this.pokeName?.toLocaleLowerCase())] : await PokemonService.getAllPokemon(this.currentPage, this.pageSize) //Coloca um unico pokemon em um array, para que não de problema na func
    return this.pokemons;
  }

  selectPokemon(pokemon: Pokemon | undefined) {
    this.router.navigate([`/pokemon`, `${pokemon?.name}`]);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPokemonList()
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPokemonList();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemonList()
    }
  }

  getPageNumbers(): number[] {
    return new Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

}
