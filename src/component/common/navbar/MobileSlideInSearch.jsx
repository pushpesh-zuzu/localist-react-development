import React, { useRef, useState, useEffect } from "react";

export default function MobileSlideInSearch({
  isOpen,
  setIsOpen,
  services,
  handleServiceSelect,
  dispatch,
  searchService,
  setMobileSearchText,
  mobileSearchText,
}) {
  const [mobileDebouncedText, setMobileDebouncedText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);

  console.log(services, "serviceItems");

  const closeSearch = () => {
    setIsOpen(false);
    setMobileSearchText("");
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMobileSearchText(value);
    setShowSuggestions(true);
  };

  const handleServiceClickLocal = (serviceItem) => {
    console.log("Service selected:", serviceItem);
    handleServiceSelect(serviceItem);
    setMobileSearchText(serviceItem.name);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setMobileDebouncedText(mobileSearchText);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [mobileSearchText]);

  // API call
  useEffect(() => {
    if (mobileDebouncedText.trim() !== "") {
      dispatch(searchService({ search: mobileDebouncedText }));
    } else {
      // Clear search results if input is empty
      dispatch(searchService({ search: "" }));
    }
  }, [mobileDebouncedText, dispatch, searchService]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <>
      <div className="relative md:hidden font-poppins">
        {/* Modal Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSearch}
          />
        )}

        <div
          className={`fixed inset-0 bg-white z-50 transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="h-full flex flex-col px-4 pt-6 pb-6 font-poppins">
            {/* Search Input Row */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={closeSearch}
                className="text-gray-600 focus:outline-none p-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 18l-6-6 6-6"
                  />
                </svg>
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for a service"
                className="flex-1 p-3 text-base  outline-none font-[poppins]"
                value={mobileSearchText}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
              />
            </div>

            {/* Suggestions List */}
            {showSuggestions && (
              <div className="border-t border-gray-200 flex-1 overflow-hidden">
                <ul className="h-full overflow-y-auto">
                  {services && services.length > 0 ? (
                    services.map((serviceItem, index) => (
                      <li
                        key={index}
                        onClick={() => handleServiceClickLocal(serviceItem)}
                        className="py-3 px-3 text-[15px] text-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:font-semibold rounded-md border-b border-gray-100"
                      >
                        {serviceItem.name}
                      </li>
                    ))
                  ) : (
                    <li className="text-center text-gray-400 py-6 font-poppins">
                      {mobileSearchText && mobileSearchText.trim() !== ""
                        ? "No services found"
                        : "Start typing to search services. example: patio, business,home etc."}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
