import express from 'express';
import nconf from 'nconf';

import configManager from './managers/config-manager';
import middlewareManager from './managers/middleware-manager';
import routeManager from './managers/route-manager';
import assetsManager from './managers/assets-manager';
import dbManager from './managers/db-manager';

const app = express();

configManager.handle(app);
middlewareManager.handle(app);
assetsManager.handle(app);
routeManager.handle(app);
dbManager.handle(app);

app.listen(nconf.get('port'), () => {
    console.log('Listening on http://' + nconf.get('host') + ':' + nconf.get('port'));    
});
