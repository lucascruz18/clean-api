import { Router } from 'express'
import { makeLoginController } from '../factories/login/login-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter.'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
