import connectDb, {
  myDevDataSource,
  myProdAWSDataSource,
  myProdDataSource,
} from "../db/dev";
import company_financeEntity from "../models/company_finance.entity";
import gmpEntity from "../models/gmp.entity";
import ipoEntity from "../models/ipo.entity";
import lotsEntity from "../models/lots.entity";
import reservationsEntity from "../models/reservations.entity";
import reviewEntity from "../models/review.entity";
import subscriptionsEntity from "../models/subscriptions.entity";
import trackerEntity from "../models/tracker.entity";

const entities = [
  {
    name: "IPO Tracker",
    entity: trackerEntity,
  },
  {
    name: "Company Finance",
    entity: company_financeEntity,
  },
  {
    name: "GMP",
    entity: gmpEntity,
  },
  {
    name: "IPO",
    entity: ipoEntity,
  },
  {
    name: "Lots",
    entity: lotsEntity,
  },
  {
    name: "Reservation",
    entity: reservationsEntity,
  },
  {
    name: "Review",
    entity: reviewEntity,
  },
  {
    name: "Subscription",
    entity: subscriptionsEntity,
  },
];

export default async function (transferTo: "prod_DB" | "dev_DB") {
  await connectDb(true, true, false);
  console.log("Transferring Data ...");

  entities
    .slice(0, 4)
    .forEach((item) => handleEachRepository(item, transferTo));
  entities.slice(4).forEach((item) => handleEachRepository(item, transferTo));
}

async function handleEachRepository(item: any, transferTo: string) {
  const prodRepo = await getRepo(myProdDataSource, item.entity);
  const devRepo = await getRepo(myDevDataSource, item.entity);
  const source = transferTo === "prod_DB" ? devRepo : prodRepo;
  const destination = transferTo === "prod_DB" ? prodRepo : devRepo;
  await transferData(item.name, source, destination);
}

async function transferData(name: string, from: any, to: any) {
  const dataToCopy = await from.find();

  const newData = dataToCopy.map((item: any) => {
    return to.create(item);
  });

  to.save(newData)
    .then(() => {
      console.log(`Transferred data of ${name}`);
    })
    .catch((err: Error) => {
      console.log("Error occurred!");
    });
}

async function getRepo(dataSource: any, entity: any) {
  return await dataSource.getRepository(entity);
}
