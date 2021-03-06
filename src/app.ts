import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

class App {

    public ExpressApp: express.Application;
    public Router: express.Router;
    public mongoUrl: string ;

    constructor() {

        this.ExpressApp = express();
        this.Router = express.Router();
        this.Config();
    }

    private Config(): void {

        this.MongoSetup();
        this.Middleware();
        this.ExpressApp.use('/api', this.Router);
    }

    private MongoSetup(): void {

        if(process.env.NODE_ENV == 'production') {
            
            this.mongoUrl = process.env.DB_PROD;
        }
        else {

            this.mongoUrl = 'mongodb://localhost:27017/pocket-sets';
        }

        mongoose.connect(this.mongoUrl);
    }

    private Middleware() : void {

        this.ExpressApp.use(bodyParser.json());
        this.ExpressApp.use(bodyParser.urlencoded({ extended: false }));
    }
}

const app = new App();

export const ExpressApp = app.ExpressApp;
export const Router = app.Router;
