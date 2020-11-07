import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation
} from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helpers'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const checkErrorValidation = this.validation.validate(httpRequest.body)
      if (checkErrorValidation) {
        return badRequest(checkErrorValidation)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
