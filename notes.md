- const মানে "variable এর নাম নতুন কিছুর দিকে point করতে পারবে না"
- "loosely typed": শব্দটা programming এ আরেকটা সাধারণ অর্থেও ব্যবহার হয় — কোনো language কে বোঝাতে, যেমন JavaScript, Python, PHP — যেখানে variable এর type সহজেই বদলে যেতে পারে আর language খুব কম type checking করে
- strongly type: এর বিপরীতে TypeScript, Java, Rust এর মতো "strongly typed" language

- TypeScript offers two ways to work with types:
  Explicit Typing:
  When the initial value might not be the final type

Type Inference:
TypeScript can automatically determine (infer) the type of a variable based on its initial value:

- When TypeScript Can't Infer Types

- define Can't Infer Types data

```js
type User = {
  name: string;
  age: number;
};

const data = JSON.parse('{ "name": "Alice", "age": 30 }') as User;

console.log(data.name);  // ✅ string হিসেবে জানে, autocomplete পাবেন
console.log(data.email); // ❌ Error! User type এ "email" নেই
```

⚠️ সতর্কতা: as User মানে আপনি TypeScript কে বলছেন "আমাকে বিশ্বাস করো, এটা User shape এর ই হবে" — কিন্তু TypeScript নিজে verify করে না। যদি JSON টা আসলে ভিন্ন shape এর হয় (যেমন age না থেকে years থাকে), তাও কোনো error দিবে না compile time এ — runtime এ ভুল data পাবেন।
use import { z } from 'zod';

```js
import { z } from "zod"; // একটা popular library

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
});

const parsed = JSON.parse('{ "name": "Alice", "age": 30 }');
const data = UserSchema.parse(parsed); // এখন সত্যিই check হয়, ভুল হলে throw করবে

console.log(data.name); // ✅ TypeScript ও জানে, runtime এও validated
```

- when we use any , like this

```js
// ১. পুরনো JS code কে ধীরে ধীরে TS এ migrate করার সময়
let legacyData: any = getDataFromOldSystem();

// ২. তৃতীয় পক্ষের (third-party) library যেখানে type definition নেই
const result: any = someUntypedLibraryFunction();

// ৩. একদম generic/dynamic data (কিন্তু এক্ষেত্রে 'unknown' বেশি ভালো, নিচে দেখুন)
function processAnything(data: any) {
  console.log(data);
}
```

- any আর unknown এর মূল পার্থক্য — practically দেখি

```js
// any দিয়ে — কোনো বাধা নেই, কিন্তু বিপদজনক
let a: any = true;
console.log(a.toUpperCase()); // ✅ TypeScript চুপ, কিন্তু runtime এ crash:
                                // "TypeError: a.toUpperCase is not a function"

// unknown দিয়ে — TypeScript বাধ্য করবে
let u: unknown = true;
console.log(u.toUpperCase()); // ❌ Compile time এ ই error:
                                // "Object is of type 'unknown'"
```

আগে (পুরনো TS এ) catch (error) এর type ছিল any, তাই সরাসরি error.message লেখা যেত (কিন্তু বিপদজনক ছিল, কারণ কেউ যদি throw "just a string" করে, তাহলে .message crash করত)। এখন unknown হওয়ায় TypeScript বাধ্য করে আগে check করতে।

- array vs touples

```ts
// Array — same type, unlimited length
const scores: number[] = [90, 85, 77, 60, 95]; // যত item ইচ্ছা

// Tuple — different types, fixed length
const point: [number, number] = [10, 20]; // ঠিক ২টা, দুইটাই number
const entry: [string, number, boolean] = ["Nahian", 25, true];
```

- distructing topules

```ts
const graph: [number, number] = [55.2, 41.3];
const [x, y] = graph;
```

- function defult param

```ts
function getCUrrentUserData(name: string = "nahian") {
  return name ?? undefined;
}
```

- define object with type in ta

```ts
const car: { type: string; model: string; year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009,
};
```

- define optional properties in object

```ts
const car: { type: string; mileage?: number } = {
  // no error
  type: "Toyota",
};
car.mileage = 2000;
```

- Index Signatures

```ts
const nameAgeMap: {
  [name: string]: number;
} = {};
```

কিন্তু যদি Property Name আগে থেকে না জানি?

```ts
[name: string]: number

[name: string]: number
   ↑       ↑       ↑
   |       |       |
  key    key-এর   value-এর
  name    type      type
//Object-এর property name/key যেকোনো string হতে পারে, কিন্তু তার value অবশ্যই number হতে হবে।
//
```

- how ndex Signatures helps on model /Dynamic properties

```ts
type Inventory = {
  [productName: string]: number;
};

const inventory: Inventory = {
  apple: 1000,
  banana: 200,
};

console.log(inventory);
```

- function optinal param

```ts
function getCUrrentUserData(name?: string) {
  return name ?? undefined;
}
```

- how can we define return function type in ts

```ts
function getUserStatus(status: boolean): boolean {
  if (status) return true;
  else return false;
}

function getUserCount(): number {
  return 1;
}

type user = {
  name: string;
  age: number;
};

function getCurrentUserInfo(name: string, age: number): user {
  return {
    name: name,
    age: age,
  };
}

function printMessage(): void {
  console.log("Hello");
}

console.log(getUserStatus(true));
console.log(getUserCount());
console.log(getCurrentUserInfo("jayed", 10));
```

- void vs never
  মূল পার্থক্য: void মানে "function শেষ হয়, কিন্তু কিছু return করে না" — never মানে "function কখনো শেষই হয় না (স্বাভাবিকভাবে)।"

```ts
let age: number = 25;

if (typeof age === "number") {
  console.log("এটা সবসময় true হবে");
} else {
  // এই else block এ কখনো আসাই সম্ভব না, কারণ age তো number ই
  // তাই TypeScript এখানে age এর type ধরে নেয়: never
}
```

মানে — age variable টা number বলে define করা, তাই typeof age === "number" সবসময় true হবে। else অংশে কখনো code আসবেই না। TypeScript সেই "কখনো না আসা" জায়গাটাকে বলে — এই জায়গায় type হলো never।

- Discriminated Union
  Discriminated Union হলো TypeScript-এর একটি feature, যার মাধ্যমে আমরা একাধিক সম্ভাব্য object type একসাথে define করতে পারি।
  Discriminated Union Type হলো TypeScript-এর একটি union type যেখানে প্রতিটি object-এর একটি common literal property থাকে, যার মাধ্যমে TypeScript বুঝতে পারে কোন নির্দিষ্ট type-এর object ব্যবহার করা হচ্ছে।

```ts
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
```

এখানে type হলো Discriminator(বৈষম্যকারী)।
কারণ type এর value দেখে বোঝা যাচ্ছে payment কোন ধরনের:

<!-- -- need to see -->

stop on : aliases_and_interface
https://www.w3schools.com/typescript/typescript_aliases_and_interfaces.php

2. Shallow copy vs Deep copy — পার্থক্য কী?
3. Prototypal inheritance কীভাবে কাজ করে?
4. (prototype chain) আর #4 (this binding) — এই দুইটা প্রায় guaranteed
5. Object.freeze() vs Object.seal()
6. Object কম্পেয়ার (compare) করা যায় কীভাবে?
7. Map vs plain Object — কখন কোনটা?
8. Optional chaining আর Nullish coalescing
