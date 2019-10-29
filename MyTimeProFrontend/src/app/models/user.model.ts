export class User {

  constructor(
    public id?: number,
    public email?: String,
    public password?: String,
    public manager: boolean = false,
    public active: boolean = false
  ) {
  }

}
