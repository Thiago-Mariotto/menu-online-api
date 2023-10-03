import Name from './valueObjects/Name';

export default class Category {
  private _id?: string;
  private _name: Name;

  constructor(name: string) {
    this._name = Name.fromString(name);
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id;
  }

  get name(): Name {
    return this._name;
  }
}