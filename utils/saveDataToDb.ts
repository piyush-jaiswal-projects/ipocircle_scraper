import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const saveDataToDb = async (formattedData: any[]) => {
  console.log('Storing data in DB...');
  return
  
  formattedData.forEach(async (ipo) => {
    try {
      await axios.post(
        `${process.env.WEBSERVICE_API_URL}/api/admin/v1/ipo/create`,
        ipo,
      );
    } catch (error) {
      console.log(`Error Saving IPO to db \n ${error}`);
    }
  });
};

export default saveDataToDb;
