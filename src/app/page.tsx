"use client";
import SearchBar from "@/components/search";
import Pinpoint from "@/components/Pinpoint";
import PaginationControls from "@/components/paginationControls";
import useGetProducts from "@/hooks/useGetPinpoints";
import { getPagination } from "@/utils/getPagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define the props for the page
type PageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Page({ searchParams }: PageProps) {
  const router = useRouter();

  // Extract query, limit, and offset from searchParams
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
      {/* SearchBar component with initial values */}
      <SearchBar initialQuery={query} initialLimit={limit} initialOffset={0} />
      {/* Main content section with Pinpoint components */}
      <main className="flex flex-col w-fit mx-auto my-6 gap-8">
        {data.results?.map((pinpoint) => (
          <Pinpoint key={pinpoint.id} pinpoint={pinpoint} />
        ))}
      </main>
      {/* PaginationControls component */}
      <PaginationControls
        limit={limit}
        offset={offset}
        next={data.next}
        previous={data.previous}
      />
    </div>
  );
}
