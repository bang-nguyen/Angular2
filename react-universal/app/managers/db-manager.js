import mongoose from 'mongoose';
import nconf from 'nconf';
import baseManager from './base-manager';

const dbManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        var mongoDbUrl = nconf.get('mongoDbUrl');

        mongoose.connect(mongoDbUrl, (error) => {
            if (error) {
                console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
                throw error;
            }

            console.log('Db is connected !');

            // feed some dummy data in DB.
        });
    }
});

export default dbManager;