import { Fragment, memo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useEffect } from "react";
import cities from "cities.json";
import { ICity } from "../../interfaces/city.interface";

interface SelectCityDropdownProps {
  setCity: (city: ICity) => void;
}

const SelectCityDropdownComponent: React.FC<SelectCityDropdownProps> = (
  props
) => {
  const [selected, setSelected] = useState<ICity[]>(cities[105949]);
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<ICity[]>(
    (cities as ICity[]).slice(0, 100)
  );

  useEffect(() => {
    const filteredCities =
      query === ""
        ? cities
        : cities.filter((city: string) =>
            city.name
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(query?.toLowerCase().replace(/\s+/g, ""))
          );
    setFilteredCities(filteredCities.slice(0, 100));
  }, [query]);

  useEffect(() => {
    props.setCity(selected);
  }, [selected]);

  useEffect(() => {
    props.setCity(selected);
  }, [selected]);

  return (
    <div className="w-72 z-50">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Combobox.Input
              className="w-full focus:outline-none border-none py-2 pl-10 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(city: ICity) => city.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="focus:outline-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredCities.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCities?.map((city: ICity, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={city}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {city.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

const SelectCityDropdown = memo(SelectCityDropdownComponent);
export default SelectCityDropdown;
