import {PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteAllRecords = async () => {
    try {
        await prisma.ipo_Anchor.deleteMany()
    await prisma.ipo_ContactDetails.deleteMany()
    await prisma.ipo_Dates.deleteMany()
    await prisma.ipo_FinProgress.deleteMany()
    await prisma.ipo_Finances.deleteMany()
    await prisma.ipo_Gmp.deleteMany()
    await prisma.ipo_Lots.deleteMany()
    await prisma.ipo_OtherDetails.deleteMany()
    await prisma.ipo_Prices.deleteMany()
    await prisma.ipo_Reservations.deleteMany()
    await prisma.ipo_Review.deleteMany()
    await prisma.ipo_Shares.deleteMany()
    await prisma.ipo_Subscriptions.deleteMany()
    await prisma.ipo_Tracker.deleteMany()
    await prisma.ipo.deleteMany()

  
    console.log("All records deleted successfully.");
    } catch (error) {
        console.log(`Error deleting records \n ${error}`);
        // process.exit(1)
    }
    finally {
        return
    }
    
  };