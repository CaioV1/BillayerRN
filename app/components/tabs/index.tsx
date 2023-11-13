import React, { useState } from "react"
import { Dimensions, Text, TouchableOpacity, View } from "react-native"

import { styles } from "./styles"
import Tab from "../../models/interfaces/Tab";

interface TabComponentProps {
  tabs: Array<Tab>;
  seletedTabParam?: Tab;
  onPress: (tab: Tab) => void;
}

const windowWidth = Dimensions.get('window').width 

const Tabs: React.FC<TabComponentProps> = ({ tabs, seletedTabParam, onPress }) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(seletedTabParam || tabs[0]);

  const tabViewStyle = (tab: Tab) => selectedTab.id === tab.id ? styles.selectedTabView : styles.tabView;
  const tabTextStyle = (tab: Tab) => selectedTab.id === tab.id ? styles.selectedTabText : styles.tabText;

  return (
    <View style={styles.viewContainer}>
      {
        tabs.map((tab) => (
          <TouchableOpacity key={tab.id} onPress={() => { onPress(tab), setSelectedTab(tab) }}>
            <View style={{ ...tabViewStyle(tab), width: windowWidth / tabs.length }}>
              <Text style={tabTextStyle(tab)}>
                {tab.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default Tabs;