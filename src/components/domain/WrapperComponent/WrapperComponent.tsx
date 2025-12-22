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
    <div className="flex items-center justify-between ">
      <h1 className="font-bold py-3 text-2xl">
        <span className="px-2">{order} :</span>
        {title}
      </h1>
      {knowMoreLink ? (
        <Link
          href={knowMoreLink}
          className="underline py-2 hover:text-[#2885AC] transition-colors cursor-pointer"
        >
          {knowMore}
        </Link>
      ) : (
        <p className="underline py-2">{knowMore}</p>
      )}
    </div>
  );
}
