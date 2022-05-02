import React, { FC, useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Category, Country } from "../types/types";
import { categories } from "../data/categories";
import { countries } from "../data/countries";

type SettingsContextState = {
  categories: Category[];
  selectedCategories: Category[];
  countries: Country[];
  selectedCountry: Country;
  isFirstVisitLoading: boolean;
  isFirstVisit: boolean;
  addCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
  selectCountry: (country: Country) => void;
  setFirstVisitFalse: () => void;
};

const contextDefaultValue: SettingsContextState = {
  isFirstVisitLoading: false,
  isFirstVisit: true,
  categories: categories,
  countries: countries,
  selectedCategories: [] as Category[],
  selectedCountry: {} as Country,
  selectCountry: () => {},
  addCategory: () => {},
  removeCategory: () => {},
  setFirstVisitFalse: () => {},
};

export const SettingsContext =
  createContext<SettingsContextState>(contextDefaultValue);

export const SettingsContextProvider: FC = ({ children }) => {
  const [isFirstVisitLoading, setIsFirstVisitLoading] = useState<boolean>(
    contextDefaultValue.isFirstVisitLoading
  );
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(
    contextDefaultValue.isFirstVisit
  );

  const [countries, setCountries] = useState<Country[]>(
    contextDefaultValue.countries
  );

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    contextDefaultValue.selectedCountry
  );

  const [categories, setCategories] = useState<Category[]>(
    contextDefaultValue.categories
  );

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    contextDefaultValue.selectedCategories
  );

  const addCategory = (category: Category) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeCategory = (category: Category) => {
    setSelectedCategories(
      selectedCategories.filter((c) => c.name !== category.name)
    );
  };

  const selectCountry = (country: Country) => setSelectedCountry(country);

  const setFirstVisitFalse = () => {
    setIsFirstVisit(false);
  };

  const loadCategories = async () => {
    try {
      const value = await AsyncStorage.getItem("@avis/selectedCategories");
      if (value !== null) {
        setSelectedCategories(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveCategories = async (value: Category[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@avis/selectedCategories", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSelectedCountry = async () => {
    try {
      const value = await AsyncStorage.getItem("@avis/selectedCountry");
      if (value !== null) {
        setSelectedCountry(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveSelectedCountry = async (value: Country) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@avis/selectedCountry", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const saveFirstVisit = async (value: boolean) => {
    try {
      const jsonValue = value === true ? "true" : "false";
      await AsyncStorage.setItem("@avis/firstVisit", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFirstVisit = async () => {
    setIsFirstVisitLoading(true);
    try {
      const value = await AsyncStorage.getItem("@avis/firstVisit");

      if (value === "false") {
        setIsFirstVisit(false);
      } else {
        setIsFirstVisit(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsFirstVisitLoading(false);
  };

  useEffect(() => {
    loadFirstVisit();
  }, []);

  useEffect(() => {
    loadSelectedCountry();
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    saveFirstVisit(isFirstVisit!);
  }, [isFirstVisit]);

  useEffect(() => {
    saveSelectedCountry(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    saveCategories(selectedCategories!);
  }, [selectedCategories]);

  return (
    <SettingsContext.Provider
      value={{
        countries,
        selectedCountry,
        categories,
        selectedCategories,
        isFirstVisit,
        isFirstVisitLoading,
        addCategory,
        removeCategory,
        selectCountry,
        setFirstVisitFalse,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
