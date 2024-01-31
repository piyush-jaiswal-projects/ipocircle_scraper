import getUpdatedIpoCount from "./utils/getUpdatedIpoCount";
import dotenv from "dotenv";
import getCurrentIpoCount from "./utils/getCurrentIpoCount";
import getIpodetails from "./utils/getIpoDetails";
import formatData from "./utils/formatIpoData";
import saveDataToDb from "./utils/saveDataToDb";

dotenv.config();

// setInterval(scrapeIpoDetails,  5000); // 5 hrs -> 18000000)

export default async function scrapeIpoDetails() {

    const currLength = await getCurrentIpoCount();
    if(currLength === -1) throw Error()
    const updatedLength: number = await getUpdatedIpoCount(2020, 2024);
    console.log(`Curr length: ${currLength} | Updatedlength: ${updatedLength}`);
    

    if (currLength < updatedLength) {
      const countDiff = updatedLength - currLength;
      const ipoData: any[] = await getIpodetails();
      const requiredRawData = ipoData.slice(0, countDiff);
      const formattedData = await formatData(requiredRawData);
      saveDataToDb(formattedData)
        .then(() => {
          console.log("Database Updated");
        })
        .catch((err) => {
          throw new Error(err);
        });

      return;
    }

    if (currLength > updatedLength) {
      console.log("Data Mismatch detected!");
      throw Error("Curr IPO list length is greater than the list fetched from Source")
      return;
    }
}