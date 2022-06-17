export type AppTabsParams = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
  MyNewsScreen: undefined;
  ExploreScreen: undefined;
};

export type AppStackParams = {
  OnboardingWelcomeScreen: undefined;
  OnboardingCategoriesSelectionScreen: undefined;
  OnboardingCountrySelectionScreen: undefined;
  AppTabs: undefined;
  SettingsScreen: undefined;
  SettingsThemeSelectionScreen: undefined;
  SettingsCountrySelectionScreen: undefined;
  SettingsCategoriesSelectionScreen: undefined;
  SettingsBrowserSelectionScreen: undefined;
  BookmarkedNewsScreen: undefined;
  NewsByCategoryScreen: {
    category: string;
  };
};
