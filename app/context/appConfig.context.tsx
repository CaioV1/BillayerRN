import React, { createContext, useEffect, useState } from "react";

import IConfig from "../models/interfaces/Config";
import Config from "../models/schemas/ConfigSchema";
import Category from "../models/schemas/CategorySchema";
import ContextProviderProps from "../models/interfaces/ContextProviderProps";

import { RealmContext } from "../configs/RealmContext"
import { getNextMonthDate } from "../utils/date.util";

const { useRealm, useQuery } = RealmContext;

export const AppConfigContext = createContext({
  appConfig: {
    dateToRenewBalance: ''
  },
  clearDatabase: () => {},
  createNewBalances: () => {},
  createConfigIfDoesntExist: () => {},
  setAppConfig: (_config: IConfig) => {},
});

const AppConfigContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const realm = useRealm();
  const response = useQuery(Config);
  const listCategory = useQuery(Category);

  const [appConfig, setAppConfig] = useState<IConfig>(() => response.length > 0 ? response[0] : {} as IConfig);

  useEffect(() => {
    createConfigIfDoesntExist();
  }, [])

  const createConfigIfDoesntExist = () => {
    if(appConfig?.dateToRenewBalance) {
      return
    }

    realm.write(() => {
      const newAppConfig = realm.create<Config>('Config', {
        darkTheme: true,
        dayToRenewBalance: '20',
        dateToRenewBalance: getNextMonthDate()
      });
      setAppConfig(newAppConfig);
    });
  }

  const clearDatabase = () => {
    realm.write(() => {
      realm.deleteAll()
    });
  }

  const createNewBalances = () => {
    const config = realm.objectForPrimaryKey<Config>('Config', appConfig!._id!);
    const newDueDate = getNextMonthDate();
    
    realm.write(() => {
      config!.dateToRenewBalance = newDueDate;
      listCategory.forEach((category) => {
        realm.create('Balance', {
          category,
          totalExpenses: 0,
          dueDate: newDueDate,
          budget: category.budget,
          _id: new Realm.BSON.UUID(),
        });
      });
      setAppConfig(config!);
    });
  }

  return (
    <AppConfigContext.Provider value={{ appConfig: appConfig!, createNewBalances, clearDatabase, createConfigIfDoesntExist, setAppConfig }}>
      {children}
    </AppConfigContext.Provider>
  )
}

export default AppConfigContextProvider;