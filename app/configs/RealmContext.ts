import Realm from "realm";
import { createRealmContext } from "@realm/react";

import Category from "../models/schemas/CategorySchema";
import Transaction from "../models/schemas/TransactionSchema";

const realmConfig: Realm.Configuration = {
  schema: [Transaction, Category],
  deleteRealmIfMigrationNeeded: true
}

export const RealmContext = createRealmContext(realmConfig);