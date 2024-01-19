// "use client";
// import { useRouter } from "next/navigation";
// import Pinpoint from "@/components/Pinpoint";
// import PaginationControls from "@/components/paginationControls";
// import { useDebounce } from "@/hooks/useDebounce";
// import useGetProducts from "@/hooks/useGetPinpoints";
// import { getPagination } from "@/utils/getPagination";
// import Image from "next/image";
// import { ChangeEvent, useEffect, useState } from "react";

// type PageProps = {
//   searchParams: {
//     [key: string]: string | string[] | undefined;
//   };
// };
// export default function Page({ searchParams }: PageProps) {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce(
//     searchTerm,
//     500
//   );
//   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value.toString());
//   };
//   console.log(searchParams);
//   const query = searchParams.query ?? "";
//   const limit = searchParams.limit
//     ? parseInt(searchParams.limit as string, 10)
//     : 10;
//   const offset = searchParams.offset
//     ? parseInt(searchParams.offset as string, 10)
//     : 0;

//   useEffect(() => {
//     router.push(
//       `/?limit=${limit}&offset=${offset}&query=${debouncedSearchTerm}`
//     );
//   }, [debouncedSearchTerm]);
//   const { start, end } = getPagination(limit, offset);
//   const { data, isError, error, isLoading } = useGetProducts({
//     query: query.toString(),
//     limit: end,
//     offset: start,
//   });
//   if (isLoading) return <div className="container mx-auto p-4">isLoading</div>;
//   if (isError) return <p>{error?.message}</p>;
//   return (
//     <div className="container  mx-auto p-4 flex flex-col justify-between min-h-screen">
//       <div className="flex items-center my-2 gap-4 pl-4">
//         <Image src="/wemap.svg" alt="wemap" width={80} height={80} />{" "}
//         <span className="text-3xl text-black font-extrabold">
//           Les derniers pinpoints de wemap
//         </span>
//       </div>
//       <input
//         placeholder="Recherche ..."
//         value={searchTerm}
//         type="text"
//         onChange={(e) => handleInput(e)}
//         className="mx-auto min-w-40 max-w-7 p-1 rounded-md  text-black"
//       />
//       <main className="flex flex-col w-fit mx-auto my-6 gap-8">
//         {data.results?.map((pinpoint) => (
//           <Pinpoint key={pinpoint.id} pinpoint={pinpoint} />
//         ))}
//       </main>
//       <PaginationControls
//         limit={+limit > 0 ? +limit : 10}
//         offset={+offset}
//         next={data.next}
//         previous={data.previous}
//       />
//     </div>
//   );
// }

"use client";
import SearchBar from "@/components/search";
import Pinpoint from "@/components/Pinpoint";
import PaginationControls from "@/components/paginationControls";
import useGetProducts from "@/hooks/useGetPinpoints";
import { getPagination } from "@/utils/getPagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Page({ searchParams }: PageProps) {
  const router = useRouter();
  const query = searchParams.query ?? "";
  const limit = searchParams.limit
    ? parseInt(searchParams.limit as string, 10)
    : 10;
  const offset = searchParams.offset
    ? parseInt(searchParams.offset as string, 10)
    : 0;

  const { start, end } = getPagination(limit, offset);
  const { data, isError, error, isLoading } = useGetProducts({
    query: query.toString(),
    limit: end,
    offset: start,
  });

  return (
    <div className="container  mx-auto p-4 flex flex-col justify-between min-h-screen">
      <div className="flex items-center my-2 gap-4 pl-4">
        <Image src="/wemap.svg" alt="wemap" width={80} height={80} />{" "}
        <span className="text-3xl text-black font-extrabold">
          Les derniers pinpoints de wemap
        </span>
      </div>
      <SearchBar initialQuery={query} initialLimit={limit} initialOffset={0} />
      <main className="flex flex-col w-fit mx-auto my-6 gap-8">
        {data.results?.map((pinpoint) => (
          <Pinpoint key={pinpoint.id} pinpoint={pinpoint} />
        ))}
      </main>
      <PaginationControls
        limit={limit}
        offset={offset}
        next={data.next}
        previous={data.previous}
      />
    </div>
  );
}
