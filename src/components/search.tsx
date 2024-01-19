"use client";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { ChangeEvent, useState, useEffect } from "react";

type SearchBarProps = {
  initialQuery?: string | string[];
  initialLimit?: number;
  initialOffset?: number;
};

export default function SearchBar({
  initialQuery = "",
  initialLimit = 10,
  initialOffset = 0,
}: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce(
    searchTerm,
    500
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toString());
  };

  useEffect(() => {
    router.push(
      `/?limit=${initialLimit}&offset=${initialOffset}&query=${debouncedSearchTerm}`
    );
  }, [debouncedSearchTerm]);

  return (
    <input
      placeholder="Recherche ..."
      value={searchTerm}
      type="text"
      onChange={(e) => handleInput(e)}
      className="mx-auto min-w-40 max-w-7 p-1 rounded-md  text-black"
    />
  );
}
