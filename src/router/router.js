import {
  HOME,
  SETTINGS,
} from '../constants/routes'

import Home from '../layouts/Home'
import Settings from '../layouts/Settings'

const routing = {
  [HOME]: Home,
  [SETTINGS]: Settings,
}

export default route => routing[route]
