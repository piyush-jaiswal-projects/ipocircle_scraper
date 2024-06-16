import axios, { Axios } from "axios";
import dotenv from "dotenv";

dotenv.config();

const saveDataToDb = async (formattedData: any[]) => {
  console.log("Storing data in DB...");

  formattedData.forEach((item, index) => {
    setInterval(() => {
      console.log("intentional delay");
      try {
        axios.post(`${process.env.WEBSERVICE_API_URL}/api/v1/ipo/create`, item);
        console.log(`Saved IPO: ${item?.ipo?.name}`);
      } catch (error) {
        console.log(error);
        console.log(`Error saving IPO: ${item?.ipo?.name}`);
      }
    }, 20000);
  });
};

const introduceDelay = async () => {
  setInterval(() => {
    console.log("intentional delay");
  }, 10000);
};

export default saveDataToDb;
