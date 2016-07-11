import React from 'react';
import {Router, browserHistory} from 'react-router';
import {render} from 'react-dom';

import routes from './routes';

import ContextWrapper from './components/common/ContextWrapper';

render((
    <ContextWrapper data={window.APP_STATE || {}}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </ContextWrapper>
), document.querySelectorAll('[data-ui-role="content"]')[0]);
