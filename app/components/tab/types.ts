export interface TabComponentProps {
  totalTabs: number;
  children: React.ReactNode;
}

export interface TitleProps {
  opensTab: number;
  children: React.ReactNode;
}

export interface ContentProps {
  tabId: number;
  children: React.ReactNode;
}