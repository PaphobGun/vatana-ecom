import Vue from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret, faHeart, faBars } from '@fortawesome/free-solid-svg-icons'

import { faFacebookF, faFacebookMessenger, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret, faFacebookF, faFacebookMessenger, faTwitter, faInstagram, faHeart)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false