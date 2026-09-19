# TypeScript নোটস — টপিক অনুযায়ী সাজানো

## ভেরিয়েবল ডিক্লেয়ারেশন ও টাইপিং বেসিক্স

- **const** মানে "variable-এর নাম নতুন কোনো কিছুর দিকে point করতে পারবে না" — অর্থাৎ reference বদলানো যাবে না।
- **"Loosely typed"**: শব্দটা প্রোগ্রামিং-এ আরেকটা সাধারণ অর্থেও ব্যবহার হয় — এমন কোনো language বোঝাতে (যেমন JavaScript, Python, PHP) যেখানে variable-এর type সহজেই বদলে যেতে পারে এবং language খুব কম type checking করে।
- এর বিপরীতে TypeScript, Java, Rust-এর মতো ভাষাগুলোকে বলা হয় **"strongly typed"**।

## Explicit Typing ও Type Inference

TypeScript-এ দুইভাবে type নিয়ে কাজ করা যায়:

- **Explicit Typing**: যখন initial value শেষ পর্যন্ত একই type নাও থাকতে পারে, তখন type সরাসরি লিখে দেওয়া হয়।
- **Type Inference**: TypeScript নিজে থেকেই variable-এর initial value দেখে তার type অনুমান (infer) করে নিতে পারে।

## Type Assertion ও Runtime Validation

TypeScript যখন নিজে থেকে type বুঝতে পারে না (যেমন `JSON.parse`-এর result), তখন `as` দিয়ে type assert করা যায়:

```ts
type User = {
  name: string;
  age: number;
};

const data = JSON.parse('{ "name": "Alice", "age": 30 }') as User;

console.log(data.name); // ✅ string হিসেবে জানে, autocomplete পাবেন
console.log(data.email); // ❌ Error! User type-এ "email" নেই
```

⚠️ সতর্কতা: `as User` মানে হলো TypeScript-কে বলা "আমাকে বিশ্বাস করো, এটা User shape-এরই হবে" — কিন্তু TypeScript নিজে থেকে এটা verify করে না। JSON আসলে ভিন্ন shape-এর হলেও (যেমন `age`-এর বদলে `years` থাকলে) compile time-এ কোনো error আসবে না — runtime-এ ভুল data পাওয়া যাবে।

এই সমস্যা সমাধানে `zod`-এর মতো library দিয়ে runtime-এ সত্যিকারের validation করা যায়:

```ts
import { z } from "zod"; // একটা popular library

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
});

const parsed = JSON.parse('{ "name": "Alice", "age": 30 }');
const data = UserSchema.parse(parsed); // এখন সত্যিই check হয়, ভুল হলে throw করবে

console.log(data.name); // ✅ TypeScript-ও জানে, runtime-এও validated
```

## Any Type

কখন `any` ব্যবহার করা হয়:

```ts
// ১. পুরনো JS code ধীরে ধীরে TS-এ migrate করার সময়
let legacyData: any = getDataFromOldSystem();

// ২. তৃতীয় পক্ষের (third-party) library, যেখানে type definition নেই
const result: any = someUntypedLibraryFunction();

// ৩. একদম generic/dynamic data (তবে এক্ষেত্রে 'unknown' বেশি ভালো, নিচে দেখুন)
function processAnything(data: any) {
  console.log(data);
}
```

## Any vs Unknown

`any` আর `unknown`-এর মূল পার্থক্য — practically দেখা যাক:

```ts
// any দিয়ে — কোনো বাধা নেই, কিন্তু বিপজ্জনক
let a: any = true;
console.log(a.toUpperCase()); // ✅ TypeScript চুপ, কিন্তু runtime-এ crash:
// "TypeError: a.toUpperCase is not a function"

// unknown দিয়ে — TypeScript বাধ্য করবে
let u: unknown = true;
console.log(u.toUpperCase()); // ❌ Compile time-এই error:
// "Object is of type 'unknown'"
```

আগে (পুরনো TS-এ) `catch (error)`-এর type ছিল `any`, তাই সরাসরি `error.message` লেখা যেত — কিন্তু বিপজ্জনক ছিল, কারণ কেউ `throw "just a string"` করলে `.message` crash করত। এখন default type `unknown` হওয়ায় TypeScript ব্যবহার করার আগে check করতে বাধ্য করে।

## Array vs Tuple

```ts
// Array — same type, unlimited length
const scores: number[] = [90, 85, 77, 60, 95]; // যত item ইচ্ছা

// Tuple — different types, fixed length
const point: [number, number] = [10, 20]; // ঠিক ২টা, দুটোই number
const entry: [string, number, boolean] = ["Nahian", 25, true];
```

Tuple destructuring:

```ts
const graph: [number, number] = [55.2, 41.3];
const [x, y] = graph;
```

## ফাংশন প্যারামিটার ও রিটার্ন টাইপ

Default parameter:

```ts
function getCurrentUserData(name: string = "nahian") {
  return name ?? undefined;
}
```

Optional parameter:

```ts
function getCurrentUserData(name?: string) {
  return name ?? undefined;
}
```

Return type define করা:

```ts
function getUserStatus(status: boolean): boolean {
  if (status) return true;
  else return false;
}

function getUserCount(): number {
  return 1;
}

type User = {
  name: string;
  age: number;
};

function getCurrentUserInfo(name: string, age: number): User {
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

**void vs never** — মূল পার্থক্য: `void` মানে "function শেষ হয়, কিন্তু কিছু return করে না"; `never` মানে "function কখনো স্বাভাবিকভাবে শেষই হয় না"।

```ts
let age: number = 25;

if (typeof age === "number") {
  console.log("এটা সবসময় true হবে");
} else {
  // এই else block-এ কখনো আসাই সম্ভব না, কারণ age তো number-ই
  // তাই TypeScript এখানে age-এর type ধরে নেয়: never
}
```

এখানে `age` variable `number` হিসেবে define করা, তাই `typeof age === "number"` সবসময় true হবে। `else` অংশে কখনো code আসবেই না — TypeScript সেই "কখনো না আসা" জায়গার type ধরে নেয় `never`।

## Object Types ও Index Signature

Type সহ object define করা:

```ts
const car: { type: string; model: string; year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009,
};
```

Optional property define করা:

```ts
const car: { type: string; mileage?: number } = {
  // no error
  type: "Toyota",
};
car.mileage = 2000;
```

**Index Signature** — property-এর নাম আগে থেকে জানা না থাকলে:

```ts
const nameAgeMap: {
  [name: string]: number;
} = {};
```

```
[name: string]: number
   ↑       ↑       ↑
   |       |       |
  key    key-এর   value-এর
  name    type      type
// Object-এর property name/key যেকোনো string হতে পারে, কিন্তু তার value অবশ্যই number হতে হবে।
```

Dynamic property model করতে Index Signature যেভাবে সাহায্য করে:

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

## Discriminated Union

Discriminated Union হলো TypeScript-এর একটি feature, যার মাধ্যমে একাধিক সম্ভাব্য object type একসাথে define করা যায়।

Discriminated Union Type হলো এমন একটি union type, যেখানে প্রতিটি object-এর একটি common literal property থাকে, যার মাধ্যমে TypeScript বুঝতে পারে ঠিক কোন type-এর object ব্যবহার হচ্ছে।

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

এখানে `type` হলো discriminator (বৈষম্যকারী) — কারণ `type`-এর value দেখেই বোঝা যায় payment কোন ধরনের।

## পরবর্তী পড়ার জন্য টপিক ও প্রশ্ন

নিচের টপিকগুলো এখনো পড়া বাকি — ইন্টারভিউতে প্রায় guaranteed জিজ্ঞেস করা হয়:

1. [Type Aliases and Interfaces](https://www.w3schools.com/typescript/typescript_aliases_and_interfaces.php)
2. Shallow copy vs Deep copy — পার্থক্য কী?
3. Prototypal inheritance কীভাবে কাজ করে?
4. Prototype chain ও this binding — এই দুইটা প্রায় guaranteed
5. Object.freeze() vs Object.seal()
6. Object compare করার উপায় কী কী?
7. Map vs plain Object — কখন কোনটা ব্যবহার করবেন?
8. Optional chaining ও Nullish coalescing
