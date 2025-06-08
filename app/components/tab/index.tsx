import React, { createContext, useContext, useState } from "react"
import { Dimensions, Text, TouchableOpacity, View } from "react-native"

import { useStyle } from "./styles"
import { ContentProps, TabComponentProps, TitleProps } from "./types";

const windowWidth = Dimensions.get('window').width 

const TabContext = createContext<{
  totalTabs: number,
  selectedTab: number,
  setSelectedTab: (selectedTab: number) => void
} | null>(null);

const TabCompoment: React.FC<TabComponentProps> = ({ totalTabs, children }) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  return (
    <TabContext.Provider value={{ totalTabs, selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  )
}

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const styles = useStyle();
  return (
    <View style={styles.viewContainer}>
      {children}
    </View>
  )
}

const Title: React.FC<TitleProps> = ({ opensTab, children }) => {
  const styles = useStyle();
  const { totalTabs, selectedTab, setSelectedTab } = useContext(TabContext)!;

  const tabViewStyle = selectedTab === opensTab ? styles.selectedTabView : styles.tabView;
  const tabTextStyle = selectedTab === opensTab ? styles.selectedTabText : styles.tabText;

  return (
    <TouchableOpacity onPress={() => { setSelectedTab(opensTab) }}>
      <View style={{ ...tabViewStyle, width: windowWidth / totalTabs }}>
        <Text style={tabTextStyle}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const Content: React.FC<ContentProps> = ({ tabId, children }) => {
  const { selectedTab } = useContext(TabContext)!;

  if(tabId !== selectedTab) return null;
  return children;
}

export default {
  Root: TabCompoment,
  Header,
  Title,
  Content
};