import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import { mongoConnectionString } from './config';

class App {

    public ExpressApp: express.Application;
    public Router: express.Router;
    public ConnectionString: string ;

    constructor() {

        this.ExpressApp = express();
        this.Router = express.Router();
        this.Config();
    }

    private Config(): void {

        this.MongoSetup();
        this.CorsMiddleware();
        this.BodyParserMiddleware();
        this.PassportMiddleware();
        this.ExpressApp.use('/api', this.Router);
    }

    private MongoSetup(): void {

        if(process.env.NODE_ENV == 'production') {
            
            this.ConnectionString = process.env.DB_PROD;
        }
        else {

            this.ConnectionString = process.env.DB_TEST;
        }

        mongoose.connect(this.ConnectionString, { useNewUrlParser: true });
    }

    private CorsMiddleware(): void {

        this.ExpressApp.use(cors());
    }

    private BodyParserMiddleware(): void {

        this.ExpressApp.use(bodyParser.json());
        this.ExpressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    private PassportMiddleware(): void {

        this.ExpressApp.use(passport.initialize());
        this.ExpressApp.use(passport.session());
    }
}

const app = new App();

export const ExpressApp = app.ExpressApp;
export const Router = app.Router;
