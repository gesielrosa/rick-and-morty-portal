export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: {name: string; url: string};
  location: {name: string; url: string};
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type CharacterStatus = 'Alive' | 'Dead' | 'Unknown';

export type CharacterGender = 'Male' | 'Female' | 'Genderless' | 'Unknown';

export interface CharacterFilter {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
}
