interface iVehicle {
  cargo_capacity: number;
  consumables: string;
  cost_in_credits: number;
  created: Date | string;
  crew: number;
  edited: Date | string;
  length: number;
  manufacturer: string;
  max_atmosphering_speed: number;
  model: string;
  name: string;
  passengers: number;
  pilots: string[];
  films: string[];
  url: string;
  vehicle_class: string;
}

export default iVehicle;
