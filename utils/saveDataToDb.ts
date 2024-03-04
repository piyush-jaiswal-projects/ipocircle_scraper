import axios, { Axios } from "axios";
import dotenv from "dotenv";

dotenv.config();

const saveDataToDb = async (formattedData: any[]) => {
  console.log("Storing data in DB...");
  let promises: any[] = [];

  formattedData.forEach(async (data) => {
    promises.push(
      axios.post(`${process.env.WEBSERVICE_API_URL}/api/v1/ipo/create`, data)
    );
  });

  Promise.all(promises)
    .then(() => {})
    .catch((err) => {
      console.log(`Some error occurred \n ${err}`);
      throw Error();
    });
};

export default saveDataToDb;
