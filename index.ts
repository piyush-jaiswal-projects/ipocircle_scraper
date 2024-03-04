import getUpdatedIpoCount from "./utils/getUpdatedIpoCount";
import dotenv from "dotenv";
import getCurrentIpoCount from "./utils/getCurrentIpoCount";
import getIpodetails from "./utils/getIpoDetails";
import formatData from "./utils/formatIpoData";
import saveDataToDb from "./utils/saveDataToDb";
import { deleteAllRecords } from "./utils/deleteAllRecords";

dotenv.config();

// setInterval(scrapeIpoDetails,  5000); // 5 hrs -> 18000000)

export default async function scrapeIpoDetails() {
  try {
    await deleteAllRecords();
    const ipoData: any[] = await getIpodetails();
    const formattedData = await formatData(ipoData);
    console.log(formattedData.length);
    const res = await saveDataToDb(formattedData);
  } catch (error) {
    throw new Error();
  }
}
