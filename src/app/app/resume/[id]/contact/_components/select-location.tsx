"use client";

import { useMemo } from "react";
import { City, Country, State } from "country-state-city";
import { useFormContext } from "react-hook-form";

import { SelectItem } from "~/components/ui/select";
import { Select } from "~/components/form/select";

interface SelectCountryProps {
  name: string;
  placeholder?: string;
}

interface SelectStateProps {
  name: string;
  placeholder?: string;
}

interface SelectCityProps {
  name: string;
  placeholder?: string;
}

export const SelectCity = ({ name, placeholder }: SelectCityProps) => {
  const { watch } = useFormContext();
  const country = watch("country") as string;
  const state = watch("state") as string;

  const cities = useMemo(
    () => City.getCitiesOfState(country, state),
    [country, state],
  );

  return (
    <Select
      name={name}
      placeholder={placeholder}
      label="Cidade"
      className="flex-1"
    >
      {cities.map((city) => (
        <SelectItem key={city.name} value={city.name}>
          {city.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export const SelectState = ({ name, placeholder }: SelectStateProps) => {
  const { watch } = useFormContext();
  const country = watch("country") as string;
  const states = State.getStatesOfCountry(country);

  return (
    <Select
      name={name}
      placeholder={placeholder}
      label="Estado"
      className="flex-1"
    >
      {states.map((state) => (
        <SelectItem key={state.isoCode} value={state.isoCode}>
          {state.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export const SelectCountry = ({ name, placeholder }: SelectCountryProps) => {
  const countries = Country.getAllCountries();

  return (
    <Select
      name={name}
      placeholder={placeholder}
      label="País"
      className="flex-1"
    >
      {countries.map((country) => (
        <SelectItem key={country.isoCode} value={country.isoCode}>
          {country.name}
        </SelectItem>
      ))}
    </Select>
  );
};
