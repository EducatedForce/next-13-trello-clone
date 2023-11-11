"use client";

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import {useBoardStore} from "@/store/boardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString
  ]);

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };
    fetchSuggestionFunc().catch((err) => {
      console.log(err);
      setLoading(false);
      setSuggestion("");
    });

  }, [board]);

  return (
    <header>
      <div className="
      absolute
      top-0
      left-0
      w-full
      h-96
      bg-gradient-to-br
      from-pink-400
      to-[#0055D1]
      rounded-md
      filter
      blur-3xl
      opacity-50
      -z-50
      "/>
      <div
        className="flex flex-col md:flex-row md:justify-between items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello Logo"
          width={300}
          height={100}
          priority
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form
            className="flex items-center space-x-5 bg-white rounded-md shadow-md flex-1 md:flex-initial p-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400"/>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>Search</button>
          </form>
          <Avatar name="EducatedForce" round color="#0055D1" size="50"/>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <span
          className="flex items-center p-5 max-w-3xl shadow-xl rounded-xl bg-white w-fit">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1
            ${loading && "animate-spin"}
            `}/>
          <p className="text-sm font-light italic text-[#0055D1]">{
            suggestion
              ? suggestion
              : "GPT is summarising your tasks for the day..."
          }</p>
        </span>
      </div>
    </header>
  );
};

export default Header;
