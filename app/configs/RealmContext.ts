import Realm from "realm";
import { createRealmContext } from "@realm/react";

import Transaction from "../models/schemas/TransactionSchema";

const realmConfig: Realm.Configuration = {
  schema: [Transaction]
}

export const RealContext = createRealmContext(realmConfig);