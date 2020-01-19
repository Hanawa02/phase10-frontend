export interface IUser {
  id: string;
  name: string;
}

export class User implements IUser {
  constructor(public id: string, public name: string) {}
}

export const nullUser = new User("", "");
