import React, { createContext, useEffect, useState } from "react";

import IConfig from "../models/interfaces/Config";
import Config from "../models/schemas/ConfigSchema";
import Category from "../models/schemas/CategorySchema";

import { RealmContext } from "../configs/RealmContext"
import { getCurrentMonthYear, getDateToRenewBalance, isDateSameOrAfterToday } from "../utils/date.util";

const { useRealm, useQuery } = RealmContext;

export const AppConfigContext = createContext({
  appConfig: {
    dateToRenewBalance: ''
  }
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
    createConfigIfDoesntExist();
    // realm.write(() => {
    //   realm.deleteAll()
    // });
  }, [])

  useEffect(() => {
    console.log(appConfig);
    appConfig && console.log(isDateSameOrAfterToday(appConfig.dateToRenewBalance))
    appConfig && isDateSameOrAfterToday(appConfig.dateToRenewBalance) && createNewBalances();
  }, [appConfig])

  const createConfigIfDoesntExist = () => {
    if(response.length > 0){
      setAppConfig(response[0]);
      return
    }

    realm.write(() => {
      const newAppConfig = realm.create<Config>('Config', {
        darkTheme: true,
        dayToRenewBalance: '20',
        dateToRenewBalance: `20/${getCurrentMonthYear()}`
      });
      setAppConfig(newAppConfig);
    })
  }

  const createNewBalances = () => {
    const config = realm.objectForPrimaryKey<Config>('Config', appConfig!._id!);
    const newDueDate = getDateToRenewBalance(config!.dayToRenewBalance, config!.dateToRenewBalance);
    
    realm.write(() => {
      config!.dateToRenewBalance = newDueDate;
      listCategory.forEach((category) => {
        realm.create('Balance', {
          _id: new Realm.BSON.ObjectID(),
          category: category,
          balance: 0,
          totalExpenses: 0,
          dueDate: newDueDate
        });
      });
    });
  }

  return (
    <AppConfigContext.Provider value={{ appConfig: appConfig! }}>
      {children}
    </AppConfigContext.Provider>
  )
}

export default AppConfigContextProvider;