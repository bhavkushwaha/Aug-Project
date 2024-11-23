import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eachDayOfInterval,format, subDays } from "date-fns";

import { categories,accounts,transactions } from "@/db/schema";
import {  covertAmountToMilliunits } from "@/lib/utils";

config({ path: ".env.local"});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2oyJ7tz8Nr2P30EJEh6GA8dcLgS";
const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID, plaidId: null },
  { id: "category_2", name: "Transportation", userId: SEED_USER_ID, plaidId: null },
  { id: "category_3", name: "Utilities", userId: SEED_USER_ID, plaidId: null },
  { id: "category_4", name: "Entertainment", userId: SEED_USER_ID, plaidId: null },
  { id: "category_5", name: "Clothing", userId: SEED_USER_ID, plaidId: null },
  { id: "category_6", name: "Miscellaneous", userId: SEED_USER_ID, plaidId: null },
  { id: "category_7", name: "Rent", userId: SEED_USER_ID, plaidId: null },  
];
const SEED_TRANSACTIONS: typeof transactions.$inferInsert[] = [];
const SEED_ACCOUNTS = [
  { id: "account_1", name: "Cash", userId: SEED_USER_ID, plaidId: null},
  { id: "account_2", name: "Saving", userId: SEED_USER_ID, plaidId: null},
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch( category.name){
    case "Transportation":
    case "Miscellaneous":  
      return Math.random()* 50 + 15;
    case "Utilities":
      return Math.random()* 200 + 10;
    case "Food":
      return Math.random()* 30 + 10;
    case "Entertainment":
    case "Clothing":  
      return Math.random()* 100 + 10;
    case "Rent":
      return Math.random()* 400 + 90;    
    default:
      return Math.random()* 50 + 10; 
  }
}

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random()*9) + 1 // 1 to 9 transactions per day

  for(let i = 0; i < numTransactions; i++) {
    const category = SEED_CATEGORIES[Math.floor(Math.random()* SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6; // 60% chance of being an expense
    const amount = generateRandomAmount(category);
    const formattedAmount = covertAmountToMilliunits(isExpense ? -amount : amount);

    //console.log(i + " " + formattedAmount);

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day,"yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id, //Always use first Account
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Merchant",
      notes: "Random transaction",
    })
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval( { start: defaultFrom, end: defaultTo });
  days.forEach( day => generateTransactionsForDay(day));
}

generateTransactions();

const main = async () =>{
  try {
    // Reset database
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();
    // Seed categories
    await db.insert(categories).values(SEED_CATEGORIES).execute();
    // Seed accounts
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    // Seed transactions
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();

  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1)
  };
};

main();