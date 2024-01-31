import connectDb from "../db/dev";
import { myProdAWSDataSource, myBackupDataSource } from "../db/dev";
import trackerEntity from "../models/tracker.entity";

export default async function () {
    await connectDb();
    const sourceRepository = await myProdAWSDataSource.getRepository(trackerEntity);
    const destRepository = await myBackupDataSource.getRepository(trackerEntity);
  
    const dataToCopy = await sourceRepository.find();
    console.log(dataToCopy.toString());
  
    const newData = dataToCopy.map((item) => {
      console.log(item.id);
      return destRepository.create(item);
    });
  
    destRepository
      .save(newData)
      .then((res) => {
        console.log(res);
        console.log("Ho gya bhai");
      })
      .catch((err) => {
        console.log("Error occurred!");
      });
  }