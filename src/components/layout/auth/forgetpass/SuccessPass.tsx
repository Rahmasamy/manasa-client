import { Button } from "@/components/ui/button";
import BackgroundWrapper from "@/src/components/domain/BackgroundWrapper/BackgroundWrapper";
import BoxAuth from "@/src/components/domain/BoxAuth/BoxAuth";


export default function SuccessPass() {
  return (
    <BackgroundWrapper>
      <BoxAuth className= "h-[340px]">
        <div className="flex flex-col gap-4 justify-center items-center">
          <span>
            <svg
              width="135"
              height="135"
              viewBox="0 0 155 155"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M115.596 48.1456C117.888 50.4283 117.896 54.1368 115.613 56.4288L66.2605 105.982C63.9778 108.274 60.2694 108.281 57.9774 105.999L39.9788 88.075C37.6867 85.7924 37.679 82.0838 39.9616 79.7917C42.2442 77.4996 45.9527 77.4919 48.2448 79.7745L62.0935 93.5657L107.313 48.1624C109.596 45.8704 113.304 45.8629 115.596 48.1456Z"
                fill="#2885AC"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M77.1586 11.7143C46.1114 11.7143 20.065 33.3937 13.379 62.4361L13.379 62.4362C12.2906 67.1635 11.7143 72.0909 11.7143 77.1586C11.7143 113.275 41.0421 142.603 77.1586 142.603C113.275 142.603 142.603 113.275 142.603 77.1586C142.603 41.0421 113.275 11.7143 77.1586 11.7143ZM1.96331 59.808C9.8455 25.5697 40.53 0 77.1586 0C119.745 0 154.317 34.5725 154.317 77.1586C154.317 119.745 119.745 154.317 77.1586 154.317C34.5725 154.317 0 119.745 0 77.1586C0 71.1999 0.677961 65.3909 1.96331 59.808Z"
                fill="#83C6E2"
              />
            </svg>
          </span>
          <h1 className="text-[#2885AC]  text-lg font-bold">
            تم بنجاح
          </h1>
          <p className="p-2 text-gray-400">
            تم تغير كلمة السر بنجاح
          </p>
            <Button className="w-full text-white text-center bg-[#2885AC] py-3">
              استمرار{" "}
            </Button>
        </div>
      </BoxAuth>
    </BackgroundWrapper>
  );
}
