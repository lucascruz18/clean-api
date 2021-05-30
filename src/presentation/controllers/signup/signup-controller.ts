import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation,
  Authentication
} from './signup-controller-protocols'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helpers'
import { EmailInUseError } from '../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const checkErrorValidation = this.validation.validate(httpRequest.body)
      if (checkErrorValidation) {
        return badRequest(checkErrorValidation)
      }
      const { name, email, password } = httpRequest.body
      const user = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!user) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({ email, password })

      return ok({ user, accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
