interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

let user: User = new UserAccount("Murphy", 1);

type MyBool = true | false;
type StringArray = Array<string>;
type ObjectWithNameArray = Array<{ name: string }>;

let obj: ObjectWithNameArray = [{ name: "ADS" }, { name: "another" }];

interface Backpack<T> {
  add: (obj: T) => void;
  get: () => T;
}

let b: Backpack<string> = {
  add: (obj: string) => console.log(obj),
  get: () => "asd"
};