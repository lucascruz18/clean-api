import { Router } from 'express'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey-controller-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter.'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}