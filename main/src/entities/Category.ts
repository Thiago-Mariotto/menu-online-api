import CategoryName from './valueObjects/CategoryName';

export default class Category {
  private _id?: string;
  private _name: CategoryName;

  constructor(name: string) {
    this._name = CategoryName.fromString(name);
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id;
  }

  get name(): CategoryName {
    return this._name;
  }
}