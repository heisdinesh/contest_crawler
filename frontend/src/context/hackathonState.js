import React, { useState, useEffect, useContext } from "react";
import HackathonContext from "./hackathonContext";
import Axios from "axios";

const HackathonState = (props) => {
  const [hackathons, setHackathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const modifyHackathon = (hack) => {
    setHackathons(hack);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log(term);
    if (searchTerm != "") {
      const newHackathonList = hackathons.filter((hackathon) => {
        return Object.values(hackathon)
          .join(" ")
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
      setSearchResults(newHackathonList);
      // console.log(newHackathonList)
    } else {
      setSearchResults(hackathons);
    }
  };

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await Axios.get(
          "https://contest-crawler.vercel.app/api/v1/allHackathons"
        );
        console.log(response);
        const apiHackathons = [
          {
            _id: "648476088522ff3f8c7ea442",
            name: "Salesforce",
            link: "https://careers.salesforce.com/",
            date: "15/06/24",
            source: "nagesh",
            isbookMarked: false,
            bookMarkCount: 8,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea443",
            name: "Google",
            link: "https://careers.google.com/",
            date: "15/05/24",
            source: "nagesh",
            isbookMarked: true,
            bookMarkCount: 12,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea444",
            name: "Microsoft",
            link: "https://careers.microsoft.com/",
            date: "21/05/24",
            source: "nagesh",
            isbookMarked: false,
            bookMarkCount: 5,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea445",
            name: "Amazon",
            link: "https://www.amazon.jobs/",
            date: "24/05/24",
            source: "nagesh",
            isbookMarked: true,
            bookMarkCount: 10,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea446",
            name: "Apple",
            link: "https://www.apple.com/jobs/us/",
            date: "23/05/24",
            source: "nagesh",
            isbookMarked: false,
            bookMarkCount: 7,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea447",
            name: "Facebook",
            link: "https://www.facebook.com/careers/",
            date: "12/05/24",
            source: "nagesh",
            isbookMarked: true,
            bookMarkCount: 15,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea448",
            name: "Tesla",
            link: "https://www.tesla.com/careers",
            date: "1/06/24",
            source: "nagesh",
            isbookMarked: false,
            bookMarkCount: 6,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea449",
            name: "IBM",
            link: "https://www.ibm.com/employment/",
            date: "15/06/24",
            source: "nagesh",
            isbookMarked: true,
            bookMarkCount: 9,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea450",
            name: "Intel",
            link: "https://www.intel.com/content/www/us/en/jobs/jobs-at-intel.html",
            date: "8/06/24",
            source: "nagesh",
            isbookMarked: false,
            bookMarkCount: 11,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea451",
            name: "Cisco",
            link: "https://www.cisco.com/c/en/us/about/careers.html",
            date: "17/06/24",
            source: "nagesh",
            isbookMarked: true,
            bookMarkCount: 14,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea452",
            name: "Adobe",
            link: "https://www.adobe.com/careers.html",
            date: "18/07/24",
            source: "nagesh",
            isbookMarked: false,
            bookMarkCount: 8,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea453",
            name: "Oracle",
            link: "https://www.oracle.com/corporate/careers/",
            date: "4/06/24",
            source: "nagesh",
            isbookMarked: true,
            bookMarkCount: 13,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea454",
            name: "Netflix",
            link: "https://jobs.netflix.com/",
            date: "15/08/24",
            source: "nagesh",
            isbookMarked: false,
            bookMarkCount: 7,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea455",
            name: "HP",
            link: "https://www8.hp.com/us/en/jobs/index.html",
            date: "11/06/24",
            source: "nagesh",
            isbookMarked: true,
            bookMarkCount: 10,
            highestBookMarkCount: 0,
            __v: 0,
          },
          {
            _id: "648476088522ff3f8c7ea456",
            name: "Uber",
            link: "https://www.uber.com/us/en/careers/",
            date: "12/06/24",
            source: "nagesh",
            isbookMarked: false,
            bookMarkCount: 6,
            highestBookMarkCount: 0,
            __v: 0,
          },
        ];

        // console.log(apiHackathons)

        const localStorageHackathons =
          JSON.parse(localStorage.getItem("bookmarks")) || [];

        const mergedHackathons = apiHackathons.map((apiHackathon) => {
          const localStorageHackathon = localStorageHackathons.find(
            (h) => h.name === apiHackathon.name
          );

          if (localStorageHackathon) {
            return {
              ...apiHackathon,
              // bookMarkCount: localStorageHackathon.bookMarkCount,
              isBookMarked: true,
            };
          }

          return apiHackathon;
        });
        // console.log("merged",mergedHackathons)
        modifyHackathon(mergedHackathons);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <HackathonContext.Provider
      value={{
        hackathons,
        modifyHackathon,
        searchResults,
        handleSearch,
        searchTerm,
      }}
    >
      {props.children}
    </HackathonContext.Provider>
  );
};

export default HackathonState;
