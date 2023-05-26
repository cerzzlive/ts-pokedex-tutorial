import './style.css'
import {fetchPokemonList, generatePokemonList, setMainView} from "./services/pokemon.service.ts";
import {PokemonListResponse} from "./models/response.model.ts";

let limit = 20;
let current_page = 1;

const pokemonListElement: HTMLDivElement = document.querySelector('#pokemon_list')!;
const pokemonViewElement: HTMLDivElement = document.querySelector('#main_view')!;
const currentRangeTextElement: HTMLSpanElement = document.querySelector('#current_range_pokemon')!;
const totalPokemonTextElement: HTMLSpanElement = document.querySelector('#total_pokemon')!;
const previousButton: HTMLButtonElement = document.querySelector('#to_previous_page')!;
const nextButton: HTMLButtonElement = document.querySelector('#to_next_page')!;

setMainView(pokemonViewElement);

previousButton.addEventListener('click', () => toPreviousPage());
nextButton.addEventListener('click', () => toNextPage());

renderPokemonList().then();

async function renderPokemonList() {
    let pokemonListResponse = await loadPokemonList();

    let total_pokemon = pokemonListResponse.count ?? 0;

    let rangeFrom = (current_page * limit) - limit + 1;
    let rangeTo = current_page * limit < total_pokemon ? current_page * limit : total_pokemon;

    currentRangeTextElement.innerText = rangeFrom + ' - ' + rangeTo;
    totalPokemonTextElement.innerText = total_pokemon + '';

    previousButton.disabled = current_page === 1;
    nextButton.disabled = current_page === (Math.round(total_pokemon / limit) + 1);

    pokemonListElement.replaceChildren(generatePokemonList(pokemonListResponse.results));
}

async function loadPokemonList(): Promise<PokemonListResponse> {
    return await fetchPokemonList(limit, limit * current_page - limit);
}


function toPreviousPage() {
    current_page -= 1;
    renderPokemonList().then();
}

function toNextPage() {
    current_page += 1;
    renderPokemonList().then();
}
