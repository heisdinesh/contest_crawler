import React, { useState, useEffect, useContext } from "react";
import Hackathon_card from "./Hackathon_card";
import Telegram from "./Telegram.jsx";
import Axios from "axios";
import hackathonContext from "../context/hackathonContext";

const Hackthon_list = () => {
  const { searchResults, searchTerm } = useContext(hackathonContext);
  // console.log(searchTerm.length)

  const { hackathons, modifyHackathon } = useContext(hackathonContext);

  const toggleBookmark = (
    _id,
    hackathonName,
    link,
    date,
    source,
    bookMarkCount
  ) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const isAlreadyBookmarked = bookmarks.some(
      (item) => item.name === hackathonName
    );

    if (isAlreadyBookmarked) {
      // Remove the hackathon from bookmarks
      const updatedBookmarks = bookmarks.filter(
        (item) => item.name !== hackathonName
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      const updatedHackathons = hackathons.map((hackathon) => {
        if (hackathon.name === hackathonName) {
          return {
            ...hackathon,
            isBookMarked: !hackathon.isBookMarked,
            bookMarkCount: hackathon.bookMarkCount - 1,
          };
        }
        return hackathon;
      });
      Axios.post(
        "https://contest-crawler.vercel.app/api/v1/decrementBookMarkCount",
        { _id: _id }
      )
        .then((res) => {
          console.log(res);
          modifyHackathon(updatedHackathons);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Add the hackathon to bookmarks
      const newBookmark = {
        name: hackathonName,
        link,
        date,
        source,
        bookMarkCount: bookMarkCount + 1,
        isBookmarked: true,
      };
      bookmarks.push(newBookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      const updatedHackathons = hackathons.map((hackathon) => {
        if (hackathon.name === hackathonName) {
          return {
            ...hackathon,
            isBookMarked: !hackathon.isBookMarked,
            bookMarkCount: hackathon.bookMarkCount + 1,
          };
        }
        return hackathon;
      });
      Axios.post(
        "https://contest-crawler.vercel.app/api/v1/incrementBookMarkCount",
        { _id: _id }
      )
        .then((res) => {
          // console.log(res)
          modifyHackathon(updatedHackathons);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className=" px-4 items-center justify-center flex flex-wrap gap-12 ">
        {(searchTerm && searchTerm.length > 0 ? searchResults : hackathons).map(
          (hackathon) => (
            <Hackathon_card
              name={hackathon.name}
              link={hackathon.link}
              bookMarkCount={hackathon.bookMarkCount}
              isBookmarked={hackathon.isBookMarked}
              date={hackathon.date}
              source={hackathon.source}
              toggleBookmark={toggleBookmark}
              _id={hackathon._id}
            />
          )
        )}
      </div>
      <Telegram />
    </div>
  );
};

export default Hackthon_list;
