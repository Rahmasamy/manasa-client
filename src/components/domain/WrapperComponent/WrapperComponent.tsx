import Link from "next/link";

export default function WrapperComponent({
  order,
  title,
  knowMore,
  knowMoreLink,
}: {
  order: string;
  title: string;
  knowMore: string;
  knowMoreLink?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
      <h1 className="font-bold py-2 sm:py-3 text-lg sm:text-xl lg:text-2xl">
        <span className="px-2">{order} :</span>
        {title}
      </h1>
      {knowMoreLink ? (
        <Link
          href={knowMoreLink}
          className="underline py-2 hover:text-[#2885AC] transition-colors cursor-pointer text-sm sm:text-base"
        >
          {knowMore}
        </Link>
      ) : (
        <p className="underline py-2 text-sm sm:text-base">{knowMore}</p>
      )}
    </div>
  );
}
