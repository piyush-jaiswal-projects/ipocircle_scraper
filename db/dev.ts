import { DataSource } from "typeorm";
import dotenv from "dotenv";
import ipoEntity from "../models/ipo.entity";
import company_financeEntity from "../models/company_finance.entity";
import lotsEntity from "../models/lots.entity";
import reservationsEntity from "../models/reservations.entity";
import subscriptionsEntity from "../models/subscriptions.entity";
import trackerEntity from "../models/tracker.entity";
import gmpEntity from "../models/gmp.entity";
import review from "../models/review.entity";
import user_email from "../models/users/user_email";

dotenv.config();
console.log(`${process.env.ENV} ENVIRONMENT`);

// DB Hosted on ElephantSQL -> PRODUCTION
export const myProdDataSource = new DataSource({
  type: "postgres",
  host: "satao.db.elephantsql.com",
  port: 5432,
  database: "fgkrjctz",
  username: "fgkrjctz",
  password: "tRD4x0tlOCOO0Ag8fbtyyDFVrhP8pkoG",
  entities: [
    ipoEntity,
    company_financeEntity,
    lotsEntity,
    reservationsEntity,
    subscriptionsEntity,
    trackerEntity,
    gmpEntity,
    review,
    user_email,
  ],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

// DB Hosted on ElephantSQL -> DEVELOPMENT
export const myDevDataSource = new DataSource({
  type: "postgres",
  host: "isabelle.db.elephantsql.com",
  port: 5432,
  database: "dowdsobs",
  username: "dowdsobs",
  password: "3YRsS2oolYe03oodqSeucs_xkCyqFnLq",
  entities: [
    ipoEntity,
    company_financeEntity,
    lotsEntity,
    reservationsEntity,
    subscriptionsEntity,
    trackerEntity,
    gmpEntity,
    review,
    user_email,
  ],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

// DB Hosted on AWS RDS
export const myProdAWSDataSource = new DataSource({
  type: "postgres",
  host: "ipocircle.cu2g5h3kehan.eu-north-1.rds.amazonaws.com",
  port: 5432,
  database: "ipocircle_db",
  username: "db_admin",
  password: "s(D2&Y7y8&6",
  entities: [
    ipoEntity,
    company_financeEntity,
    lotsEntity,
    reservationsEntity,
    subscriptionsEntity,
    trackerEntity,
    gmpEntity,
    review,
    user_email,
  ],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function connectDb(
  prod: boolean,
  dev: boolean,
  prodAws: boolean
) {
  console.log("Connecting to DB ...");

  if (prod)
    await myProdDataSource
      .initialize()
      .then(() => {
        console.log("Production DB Connected");
      })
      .catch((err) => {
        console.log(`Connection to db failed! Error: \n ${err}`);
        throw err;
      });

  if (dev)
    await myDevDataSource
      .initialize()
      .then(() => {
        console.log("Development DB Connected");
      })
      .catch((err) => {
        console.log(`Connection to db failed! Error: \n ${err}`);
        throw err;
      });

  if (prodAws)
    await myProdAWSDataSource
      .initialize()
      .then(() => {
        console.log("Prod AWS DB Connected");
      })
      .catch((err) => {
        console.log(`Connection to db failed! Error: \n ${err}`);
        throw err;
      });
}
