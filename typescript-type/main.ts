function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface Obj {
  foo: string;
  bar: number;
}

const obj: Obj = {
  foo: "nyann",
  bar: 123,
};

const str = pick(obj, "foo");
