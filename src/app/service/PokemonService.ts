import { Pokemon } from "../interface";

const apiUrlBase = `https://pokeapi.co/api/v2`;


export async function searchPokemon(pokemonName: string | undefined): Promise<Pokemon | undefined> {
    let pokemon: Pokemon | undefined;
    try {
        if (!!pokemonName) {
            await fetch(`${apiUrlBase}/pokemon/${pokemonName}/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro na requisição: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(pokemonData => {
                    if (!!pokemonData) {
                        return pokemon = {
                            id: pokemonData.id,
                            name: pokemonData.name,
                            types: pokemonData.types.map((type: any) => type.type.name).join(', '),
                            img: pokemonData.sprites.front_default,
                        }
                    } else {
                        return undefined;
                    }
                })
                .catch(error => {
                    console.error(`Erro: ${error.message}`);
                    return undefined;
                });
        }
    } catch (erro) {
        console.error(erro)
    }

    return pokemon;
}

export async function getAllPokemon(page: number, pageSize: number): Promise<(Pokemon | undefined)[]> {
    try {
        const offset = (page - 1) * pageSize;
        const response = await fetch(`${apiUrlBase}/pokemon?limit=${pageSize}&offset=${offset}`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const pokemonData = await response.json();
        let pokemonArray: Array<any> = pokemonData.results || [];

        const updatedPokemonArray = await Promise.all(
            pokemonArray.map(async (pokemonElement) => {
                const updatedPokemon = await getPokemonUrl(pokemonElement?.url);
                return updatedPokemon;
            })
        );

        return updatedPokemonArray;
    } catch (error) {
        console.error(`Erro: ${error}`);
        return [undefined];  // Rejeitar a promise em caso de erro
    }
}

async function getPokemonUrl(urlPokemon: string): Promise<Pokemon | undefined> {
    try {
        let pokemon: Pokemon | undefined;
        const response = await fetch(urlPokemon);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const pokemonData = await response.json();

        return pokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            types: pokemonData.types.map((type: any) => type.type.name).join(', '),
            img: pokemonData.sprites.front_default,
        }

    } catch (error) {
        console.error(`Erro: ${error}`);
        return undefined
    }
}

export async function getPokemonName(namePokemon: string): Promise<Pokemon | undefined> {
    try {
        let pokemon: Pokemon | undefined;
        const response = await fetch(`${apiUrlBase}/pokemon/${namePokemon}`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const pokemonData = await response.json();

        return pokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            types: pokemonData.types.map((type: any) => type.type.name).join(', '),
            img: pokemonData.sprites.front_default,
        }

    } catch (error) {
        console.error(`Erro: ${error}`);
        return undefined
    }
}