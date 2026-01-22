
export interface TopSite {
  title: string;
  url: string;
  icon?: string;
}

export const AppView = {
  HOME: 'HOME',
  SEARCH: 'SEARCH'
} as const;

export type AppViewType = typeof AppView[keyof typeof AppView];
