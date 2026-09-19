type Payment =
  | {
      type: "card";
      cardNumber: string;
    }
  | {
      type: "paypal";
      email: string;
    }
  | {
      type: "cash";
      amount: number;
    };
function processPayment(paymentType: Payment) {
  switch (paymentType.type) {
    case "card":
      console.log("payment process is card");
      break;
    case "paypal":
      console.log("payment porcess in paypal");
      break;
    case "cash":
      console.log(" payment process is cash");
      break;
    default:
      break;
  }
}

// console.log(getUserStatus(true));
// console.log(getUserCount());
// console.log(getCurrentUserInfo("jayed", 10));

// type Shape =
//   | { kind: "circle"; radius: number }
//   | { kind: "square"; side: number }
//   | { kind: "triangle"; base: number; height: number }
//   | { kind: "rectangle"; width: number; height: number }
//   | { kind: "rectangle"; width: number; height: number };
// function getArea(shape: Shape): number {
//   switch (shape.kind) {
//     case "circle":
//     case "square":
//     case "triangle":
//     default:
//       const exhaustiveCheck: never = shape;
//       return exhaustiveCheck;
//   }
// }

// function crash(): never {
//   throw new Error("something broke");
// }

// const result = crash();
// console.log(result);

// function getCUrrentUserData(name: string = "nahian") {
//   return name ?? undefined;
// }

// console.log(getCUrrentUserData());
// const names: readonly string[] = ["Dylan"];
// names.push("Jack");

// const names: readonly string[] = ["Dylan"];
// let testTuple: [number, boolean, string];
// testTuple = [5, false, "Coding God was here"];

// const point: [number, string, 222] = [10, "jayed", 222];
// console.log(typeof point[1]);

// const car: { type: string; model?: string; year?: number } = {
//   type: "Toyota",
// };

// console.log(car);

// const test = {
//   name: "jayed",
//   age: 22,
//   isStudent: true,
// };

// const nameAgeMap: { [name: string]: number } = {};
// nameAgeMap.Jack = 25;
// nameAgeMap.Mark = 30;
// nameAgeMap.Mark = "Fifty";

// console.log(nameAgeMap);

// type Inventory = {
//   [productName: string]: number;
// };

// const inventory: Inventory = {
//   apple: 1000,
//   banana: 200,
// };

// console.log(inventory);
