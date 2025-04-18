import React, { useRef, useState } from "react";

import toast from "react-hot-toast";

import { countries } from "@/constants";
import { toastOptions } from "@/helpers";

interface EditFormFourProps {
  nextPage: () => void;
  prevPage: () => void;
  businessCountry: string;
  setBusinessCountry: (country: string) => void;
  businessData: any;
  setBusinessData: any;
}

interface Option {
  label: string;
  value: string;
}

const EditFormFour = ({
  businessCountry,
  setBusinessCountry,
  businessData,
  setBusinessData,
  nextPage,
  prevPage,
}: EditFormFourProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountryClick = (option: string) => {
    setBusinessCountry(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBusinessData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (
      !businessData.businessName ||
      !businessData.yearFounded ||
      !businessCountry ||
      !businessData.numberOfEmployee ||
      !businessData?.businessCity ||
      !businessData.businessState ||
      !businessData.startingPrice ||
      !businessData.noticePeriod ||
      !businessData?.currency
    ) {
      return toast.error("Please fill all fields", toastOptions);
    }
    nextPage();
  };

  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 px-10 w-full max-md:px-5 max-sm:px-3">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">
              Edit your about business profile
            </h1>
            <p className="py-4 max-w-[550px]">
              Additional business and service profile information below
            </p>
            <div className="grid grid-cols-5 gap-6 w-full ">
              <div className="flex flex-col gap-6 col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5">
                <div className="w-full">
                  <p className="input-label">Business name</p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      value={businessData?.businessName}
                      onChange={handleChange}
                      name="businessName"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Year Founded</p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="number"
                      className="expert-reg-input"
                      name="yearFounded"
                      value={businessData?.yearFounded}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Number of employees</p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="number"
                      className="expert-reg-input"
                      name="numberOfEmployee"
                      value={businessData?.numberOfEmployee}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Business address</p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      name="businessAddress"
                      value={businessData?.businessAddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Business city</p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      name="businessCity"
                      value={businessData?.businessCity}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">State</p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      value={businessData?.businessState}
                      onChange={handleChange}
                      name="businessState"
                    />
                  </div>
                </div>
                {/* dropdown */}
                <div className="input__container ">
                  <p className="input-label">Country</p>
                  <div className="relative w-full" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      type="button"
                      className="expert-reg-input-div flex-c-b"
                    >
                      <p>
                        {businessCountry ? businessCountry : "Select an option"}
                      </p>
                      {/* Heroicon name: chevron-down */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                        <div className="p-2">
                          <input
                            style={{ fontSize: "16px" }}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search country..."
                            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-green bg-white"
                          />
                        </div>
                        <div className="max-h-36 overflow-y-auto">
                          <ul role="list" className="py-1 w-full">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((option: Option) => (
                                <li key={option.value} className="w-full">
                                  <button
                                    onClick={() =>
                                      handleCountryClick(option.value)
                                    }
                                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  >
                                    {option.label}
                                  </button>
                                </li>
                              ))
                            ) : (
                              <li className="px-4 py-2 text-sm text-gray-500">
                                No results found
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Currency</p>
                  <div className="w-full">
                    <div className="expert-reg-input-div">
                      <select
                        style={{ fontSize: "16px" }}
                        className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                        name="currency"
                        value={businessData?.currency}
                        onChange={handleChange}
                      >
                        <option defaultValue="">Select currency</option>

                        <option value="NGN" className="capitalize">
                          NGN
                        </option>
                        <option value="USD" className="capitalize">
                          USD
                        </option>
                        <option value="GBP" className="capitalize">
                          GBP
                        </option>
                        <option value="EUR" className="capitalize">
                          EUR
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Your Start Price</p>
                  <div className="w-full">
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      className="expert-reg-input"
                      name="startingPrice"
                      value={businessData?.startingPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="input-label">Notice Period</p>
                  <div className="w-full">
                    <div className="expert-reg-input-div flex-c-b">
                      <input
                        style={{ fontSize: "16px" }}
                        type="number"
                        name="noticePeriod"
                        className="h-full flex-1 outline-none bg-[#ececec] max-sm:text-[14px]"
                        value={businessData?.noticePeriod}
                        onChange={handleChange}
                      />
                      <p className="border-l-1 border-primary-green px-3">
                        days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 max-lg:hidden  max-md:flex max-sm:hidden col-span-2  max-md:col-span-2 max-sm:col-span-5">
                <div className="w-full shadow-lg flex flex-col justify-center py-5 rounded-lg border-l-8 border-primary-green px-4">
                  <h3 className="sm:text-lg font-medium">
                    Dont have a business name?
                  </h3>

                  <p className="py-3 max-sm:text-sm">
                    No worries - just use your own name
                  </p>
                </div>
              </div>

              <div className="flex justify-end mb-28 gap-5 col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5">
                <button className="custom-btn" onClick={prevPage}>
                  Back
                </button>
                <button className="custom-btn" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditFormFour;
