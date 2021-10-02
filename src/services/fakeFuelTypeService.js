export const fueltype=[
  { _id:"111", name:"Petrol"},
  { _id:"222", name:"Desal"}
];

export function getFuelType(){
  return fueltype.filter(f => f);
}