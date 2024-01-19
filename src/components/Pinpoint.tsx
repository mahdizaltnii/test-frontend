import { pinpoint } from "@/types";
import Image from "next/image";
import React from "react";

type PinpointProps = {
  pinpoint: pinpoint;
};
function Pinpoint({ pinpoint }: PinpointProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex  items-center gap-x-2">
        <Image
          src={pinpoint.image_url}
          alt={pinpoint.image_url}
          width={60}
          height={60}
        />
        <div className="flex flex-col text-black">
          <div className="font-bold text-lg">{pinpoint.name}</div>
          <div className="text-sm">{pinpoint.address}</div>
        </div>
      </div>
      <button className="bg-white rounded-md text-blue-400 p-1.5 max-w-fit whitespace-nowrap">
        <a
          target="_blank"
          href={`https://livemap.getwemap.com/#/pinpoints/${pinpoint.id}`}
        >
          Voir sur la carte
        </a>
      </button>
    </div>
  );
}

export default Pinpoint;
