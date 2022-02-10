import { browser } from "protractor";

import { User } from "../../page-objects/pages/models/user.model";

export class CredentialsHelper {
  private static readonly users = browser.params.users;

  static readonly mcesar: User = {
    name: CredentialsHelper.users.mcesar.name,
    email: CredentialsHelper.users.mcesar.email,
    password: CredentialsHelper.users.mcesar.password,
  };
}
