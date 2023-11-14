import React, { createContext, useEffect, useState } from "react";

import IConfig from "../models/interfaces/Config";
import Config from "../models/schemas/ConfigSchema";
import Category from "../models/schemas/CategorySchema";

import { RealmContext } from "../configs/RealmContext"
import { getNextMonthDate } from "../utils/date.util";

const { useRealm, useQuery } = RealmContext;

export const AppConfigContext = createContext({
  appConfig: {
    dateToRenewBalance: ''
  },
  clearDatabase: () => {},
  createNewBalances: () => {},
});

interface AppConfigContextProviderProps {
  children: React.ReactNode;
}

const AppConfigContextProvider: React.FC<AppConfigContextProviderProps> = ({ children }) => {
  const realm = useRealm();
  const response = useQuery(Config);
  const listCategory = useQuery(Category);

  const [appConfig, setAppConfig] = useState<IConfig>();

  useEffect(() => {
    // clearDatabase();
    createConfigIfDoesntExist();
  }, [])

  // useEffect(() => {
  //   // appConfig && isDateSameOrAfterToday(appConfig.dateToRenewBalance) && createNewBalances();
  // }, [appConfig])

  const createConfigIfDoesntExist = () => {
    if(response.length > 0){
      setAppConfig(response[0]);
      return
    }

    realm.write(() => {
      const newAppConfig = realm.create<Config>('Config', {
        darkTheme: true,
        dayToRenewBalance: '20',
        dateToRenewBalance: getNextMonthDate()
      });
      setAppConfig(newAppConfig);
    })
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
          _id: new Realm.BSON.UUID(),
          category: category,
          budget: category.budget,
          totalExpenses: 0,
          dueDate: newDueDate
        });
      });
      setAppConfig(config!);
    });
  }

  return (
    <AppConfigContext.Provider value={{ appConfig: appConfig!, createNewBalances, clearDatabase }}>
      {children}
    </AppConfigContext.Provider>
  )
}

export default AppConfigContextProvider;