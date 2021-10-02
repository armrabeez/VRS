export const vehicles = [
  { _id: "001", name: "car" },
  { _id: "002", name: "van" },
  { _id: "003", name: "moterbike" },
  { _id: "004", name: "threewheeler" }
];

export function getVehicles() {
  return vehicles.filter(v => v);
}


