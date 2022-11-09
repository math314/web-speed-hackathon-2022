import "regenerator-runtime/runtime";

import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { faHandPeace } from '@fortawesome/free-regular-svg-icons'

library.add(faInfoCircle, faTicketAlt, faHandPeace);
dom.watch();