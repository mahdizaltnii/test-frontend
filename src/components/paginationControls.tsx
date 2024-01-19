"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import ArrowLeftIcon from "../../public/arrow-left.svg";
import ArrowRightIcon from "../../public/arrow-right.svg";
import Image from "next/image";

type paginationControlsProps = {
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
};
const PaginationControls: FC<paginationControlsProps> = ({
  limit = 10,
  offset,
  previous,
  next,
}) => {
  const router = useRouter();
  return (
    <div className="inline-flex justify-center items-center  gap-1">
      {/* Previous Button */}
      <a className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
        <button
          className={
            previous === null
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }
          disabled={previous === null}
          onClick={() => {
            router.push(
              `/?limit=${limit}&offset=${
                offset - limit > 0 ? offset - limit : 0
              }`
            );
          }}
        >
          <Image src={ArrowLeftIcon} alt="Left Arrow"></Image>
        </button>
      </a>

      {/* Page Number Display */}

      <div className="h-8 w-12 justify-center  p-0 flex items-center text-xs font-medium text-gray-900">
        Page {Math.ceil(offset / limit) + 1}
      </div>
      {/* Next Button */}

      <a className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
        <button
          className="btn-secondary max-w-fit text-black p-1"
          disabled={next === null}
          onClick={() => {
            router.push(`/?limit=${limit}&offset=${offset + limit}`);
          }}
        >
          <Image src={ArrowRightIcon} alt="Right Arrow"></Image>
        </button>
      </a>
    </div>
  );
};

export default PaginationControls;
