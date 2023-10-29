interface iCharacter {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string | number;
  homeworld: string;
  mass: string | number;
  name: string;
  skin_color: string;
  created: string | Date;
  edited: string | Date;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export default iCharacter;
