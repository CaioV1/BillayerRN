import Realm from "realm";
import { createRealmContext } from "@realm/react";

import Config from "../models/schemas/ConfigSchema";
import Balance from "../models/schemas/BalanceSchema";
import Category from "../models/schemas/CategorySchema";
import Transaction from "../models/schemas/TransactionSchema";

const realmConfig: Realm.Configuration = {
  schema: [Transaction, Category, Balance, Config],
  deleteRealmIfMigrationNeeded: true
}

export const RealmContext = createRealmContext(realmConfig);