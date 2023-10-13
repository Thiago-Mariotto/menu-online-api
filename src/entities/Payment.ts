import Name from './valueObjects/Name';

export default class Payment {
  private _id?: string;
  private _name: Name;

  constructor(name: string) {
    this._name = Name.fromString(name);
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(id: string) {
    if (!this._id) {
      this._id = id;
    }
    return;
  }

  public get name(): string {
    return this._name.value;
  }
}