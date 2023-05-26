export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListResult[];
}

export interface PokemonListResult {
    name: string;
    url: string;
}
