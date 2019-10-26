export class LoginResponseModel {

  constructor(
    public email: String,
    public authorize: boolean = false,
    public manager: boolean = false
  ) {
  }
}
