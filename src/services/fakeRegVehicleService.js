//import Like from "../components/common/like";
import * as vehiclesAPI from "./fakeVehicleService";
import * as fuelTypeAPI from "./fakeFuelTypeService";
const regVehicles = [
  {
    _id: "15",
    owner: "Momamed",
    vehicle: { _id: "001", name: "car" },
    vehicleNumber:"FF-6985",
    makersClass: "Toyota",
    vehicleClass: "Auto",
    fuelUsed: {_id: "111", name: "Petrol"},
    EngineCC: 2000,
    liked : true
  
  },
  {
    _id: "16",
    owner: "Rabeez",
    vehicle: { _id: "002", name: "van" },
    vehicleNumber:"HH-5698",
    makersClass: "Hyunda",
    vehicleClass: "Auto",
    fuelUsed: {_id: "111", name: "Petrol"},
    EngineCC: 1800,
  },
  {
    _id: "17",
    owner: "Ayman",
    vehicle: { _id: "003", name: "moterbike" },
    vehicleNumber:"SX-5698",
    makersClass: "Bajaj",
    vehicleClass: "Manual",
    fuelUsed: {_id: "111", name: "Petrol"},
    EngineCC: 200,
  },
  {
    _id: "18",
    owner: "Usman",
    vehicle: { _id: "003", name: "moterbike" },
    vehicleNumber:"GGD-7865",
    makersClass: "Bajaj",
    vehicleClass: "Manual",
    fuelUsed: {_id: "111", name: "Petrol"},
    EngineCC: 160,
  },
  {
    _id: "19",
    owner: "Bilal",
    vehicle: { _id: "001", name: "car" },
    vehicleNumber:"CGG-1526",
    makersClass: "Toyota",
    vehicleClass: "Manual",
    fuelUsed: {_id: "222", name: "Desal"},
    EngineCC: 1800,
  },
  {
    _id: "20",
    owner: "Kaleel",
    vehicle: { _id: "002", name: "van" },
    vehicleNumber:"WP CAG-0005",
    makersClass: "Hyunda",
    vehicleClass: "Auto",
    fuelUsed: {_id: "222", name: "Desal"},
    EngineCC: 1500,
  },
  {
    _id: "21",
    owner: "Saskeer",
    vehicle: { _id: "002", name: "van" },
    vehicleNumber:"205-5005",
    makersClass: "Toyota",
    vehicleClass: "Manual",
    fuelUsed: {_id: "222", name: "Desal"},
    EngineCC: 1800,
  },
  {
    _id: "22",
    owner: "Kabeer",
    vehicle: { _id: "003", name: "motorbike" },
    vehicleNumber:"EX-4585",
    makersClass: "bajaj",
    vehicleClass: "Manual",
    fuelUsed: {_id: "222", name: "Desal"},
    EngineCC: 135,
  },
  {
    _id: "23",
    owner: "sajith",
    vehicle: { _id: "004", name: "threeWeelar" },
    vehicleNumber:"ABC-5555",
    makersClass: "bajaj",
    vehicleClass: "Auto",
    fuelUsed: {_id: "222", name: "Petrol"},
    EngineCC: 350,
  }
];

export function getRegVehicles() {
  return regVehicles;
}

export function getRegVehicle(id) {
  return regVehicles.find(m => m._id === id);
}

export function saveVehicle(rvehicle) {
  let regVehicleInDb = regVehicles.find(m => m._id === rvehicle._id) || {};
  regVehicleInDb.owner = rvehicle.owner;
  regVehicleInDb.vehicle = vehiclesAPI.vehicles.find(v => v._id === rvehicle.vehicleId);
  regVehicleInDb.vehicleNumber = rvehicle.vehicleNumber;
  regVehicleInDb.makersClass = rvehicle.makersClass;
  regVehicleInDb.vehicleClass = rvehicle.vehicleClass;
  regVehicleInDb.fuelUsed = fuelTypeAPI.fueltype.find(f => f._id === rvehicle.fuelId);
  regVehicleInDb.EngineCC = rvehicle.EngineCC;

  if (!regVehicleInDb._id) {
    regVehicleInDb._id = Date.now().toString();
    regVehicles.push(regVehicleInDb);
  }

  return regVehicleInDb;
}

export function deleteVehicle(id) {
  let regVehicleInDb = regVehicles.find(m => m._id === id);
  regVehicles.splice(regVehicles.indexOf(regVehicleInDb), 1);
  return regVehicleInDb;
}
