import { getFirstColumnIndexToRender } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";

let items = [
    {id: 100, code: "c001", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.36784, priceStatus: "fixed", cost: 12345.45, provider: "Llucbeton"},
    {id: 200, code: "c002", type: "mano de obra", unit: "m2", name: "Hormigón HA-25", quantity: 52.35, price: 123.378674, priceStatus: "calculated", cost: 12345.45, provider: "Llucbeton"},
    {id: 300, code: "c003", type: "mano de obra", unit: "m", name: "Hormigón HA-25", quantity: 53.35, price: 123.3784, priceStatus: "fixed", cost: 12345.45, provider: "Llucbeton"},
    {id: 400, code: "c004", type: "mano de obra", unit: "l", name: "Hormigón HA-25", quantity: 54.35, price: 123.3124, priceStatus: "calculated", cost: 12345.45, provider: "Llucbeton"},
    {id: 500, code: "c005", type: "mano de obra", unit: "h", name: "Hormigón HA-25", quantity: 55.35, price: 123.3554, priceStatus: "calculated", cost: 12345.45, provider: "Llucbeton"},
    {id: 600, code: "c006", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.3344, priceStatus: "high", cost: 12345.45, provider: "Llucbeton"},
    {id: 700, code: "c007", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.3774, priceStatus: "fixed", cost: 12345.45, provider: "Llucbeton"},
    {id: 800, code: "c008", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.378784, priceStatus: "calculated", cost: 12345.45, provider: "Llucbeton"},
    {id: 900, code: "c009", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.38774, priceStatus: "fixed", cost: 12345.45, provider: "Llucbeton"},
    {id: 1000, code: "c010", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.3874, priceStatus: "fixed", cost: 12345.45, provider: "Llucbeton"},
    {id: 1200, code: "c011", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.36784, priceStatus: "calculated", cost: 12345.45, provider: "Llucbeton"},
    {id: 1300, code: "c012", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.3884, priceStatus: "calculated", cost: 12345.45, provider: "Llucbeton"},
    {id: 1400, code: "c013", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.3774, priceStatus: "fixed", cost: 12345.45, provider: "Llucbeton"},
    {id: 1500, code: "c014", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.38784, priceStatus: "calculated", cost: 12345.45, provider: "Llucbeton"},
    {id: 1600, code: "c015", type: "mano de obra", unit: "m3", name: "Hormigón HA-25", quantity: 55.35, price: 123.3784, priceStatus: "fixed", cost: 12345.45, provider: "Llucbeton"}
];

export default items;