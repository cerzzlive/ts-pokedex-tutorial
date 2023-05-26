import {SpriteType} from "../enums/sprite-type.enum.ts";
import {PokemonListResponse, PokemonListResult} from "../models/response.model.ts";

let mainView: HTMLDivElement;

export function setMainView(view: HTMLDivElement) {
    mainView = view;
}

export async function fetchPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
    const pokemonListEndPoint = 'https://pokeapi.co/api/v2/pokemon';
    return await fetch(`${pokemonListEndPoint}?limit=${limit}&offset=${offset}`)
        .then(response => response.json());
}

export function getPokemonIdFromUrl(url: string): number {
    const pathArray = url.split('/');
    let pokemonId = 0;
    try {
        const pokemonIdPath = pathArray.at(-2);
        if (pokemonIdPath) {
            pokemonId = +pokemonIdPath
        }
    } catch (error) {
        console.log(error);
    }
    return pokemonId;
}

export function getPokemonImageUrlFromId(id: number, spriteType: SpriteType = SpriteType.OFFICIAL_ARTWORK_DEFAULT): string {
    switch (spriteType) {
        case 'front_default':
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        case 'back_default':
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
        default:
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }
}

export function generatePokemonList(pokemonList: PokemonListResult[]) {
    const pokemonListElement = document.createElement('ul');
    pokemonListElement.classList.add('pokemon-list');
    pokemonList.forEach(pokemon => {
        pokemonListElement.appendChild(generatePokemonListItem(pokemon));
    });
    return pokemonListElement;
}

export function generatePokemonListItem(pokemon: PokemonListResult): HTMLLIElement {

    const pokemonId = getPokemonIdFromUrl(pokemon.url);
    const pokemonName = pokemon.name;
    const pokemonImageUrl = getPokemonImageUrlFromId(pokemonId, SpriteType.FRONT_DEFAULT);

    const pokemonListItemElement = document.createElement('li');
    pokemonListItemElement.classList.add('pokemon-list-item');
    pokemonListItemElement.addEventListener('click', () => viewPokemon(pokemonId))
    pokemonListItemElement.innerHTML = `
    <img class="pokemon-avatar" src="${pokemonImageUrl}" alt="${pokemonName}" width="64" height="64">
    <span class="pokemon-name">${pokemonName}</span>
    `;
    return pokemonListItemElement;
}

export function viewPokemon(id: number) {
    mainView.innerHTML = id + '';
}
