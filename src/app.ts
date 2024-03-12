import cors from "cors";
import nocache from "nocache";
import express from "express";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
// import passport from "passport";
import helmet from "helmet";
import morgan from "morgan";
import expressJSDocSwagger from "express-jsdoc-swagger";
import home from "./home";
import environment from "./lib/environment";
import expressJSDocSwaggerConfig from "./config/express-jsdoc-swagger.config";
import appConfig from "./config/app.config";
import errorHandler from "@/middlewares/error-handler";
import routes from "@/modules/index";
import prismaClient from "@/lib/prisma";

// require("@/config/passport.ts");

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.cookieSession();
    this.cookieParser();
    // this.passport();
    this.setMiddlewares();
    this.disableSettings();
    this.setRoutes();
    this.setErrorHandler();
    this.initializeDocs();
  }

  private cookieSession(): void {
    this.express.use(
      cookieSession({
        name: "session",
        keys: ["codebility"],
        maxAge: 24 * 60 * 60 * 100,
      }),
    );
  }
  private cookieParser(): void {
    this.express.use(cookieParser());
  }

  // private passport() {
  //   this.express.use(passport.initialize());
  //   this.express.use(passport.session());
  // }

  private setMiddlewares(): void {
    this.express.use(
      "*",
      cors({
        // origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
        // allowedHeaders: "your-custom-headers",
      }),
    );
    this.express.use(
      cookieSession({
        name: "session",
        keys: ["codebility"],
        maxAge: 24 * 60 * 60 * 100,
      }),
    );
    this.express.use(cookieParser());
    // this.express.use(passport.initialize());
    // this.express.use(passport.session());
    this.express.use(morgan("dev"));
    this.express.use(nocache());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(express.static("public"));
  }

  private disableSettings(): void {
    this.express.disable("x-powered-by");
  }

  private setRoutes(): void {
    const {
      api: { version },
    } = appConfig;
    const { env } = environment;
    this.express.use("/", home);
    this.express.use(`/api/${version}/${env}`, routes);
  }

  private setErrorHandler(): void {
    this.express.use(errorHandler);
  }

  private initializeDocs(): void {
    expressJSDocSwagger(this.express)(expressJSDocSwaggerConfig);
  }

  public async connectPrisma(): Promise<void> {
    await prismaClient.$connect();
  }
}

export default App;
