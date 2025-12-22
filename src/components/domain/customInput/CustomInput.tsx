import React, {
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";

interface CustomOTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export const CustomOTPInput: React.FC<CustomOTPInputProps> = ({
  length = 6,
  onComplete,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    // Handle single character input
    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    // Handle when user deletes
    else if (value.length === 0) {
      newOtp[index] = "";
      setOtp(newOtp);
    }
    
    // Check if OTP is complete
    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, i) => {
      if (/^\d$/.test(char) && i < length) {
        newOtp[i] = char;
      }
    });

    setOtp(newOtp);
    const lastFilledIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();

    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  return (
    <div className="flex items-center gap-2 dir-ltr">
      <div className="flex gap-2">
        {otp.slice(0, 3).map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-xl font-semibold text-gray-900 bg-gray-300 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
        ))}
      </div>

      <span className="text-2xl text-gray-400">-</span>

      <div className="flex gap-2">
        {otp.slice(3, 6).map((digit, index) => {
          const actualIndex = index + 3;
          return (
            <input
              key={actualIndex}
              ref={(el) => {
                inputRefs.current[actualIndex] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(actualIndex, e.target.value)}
              onKeyDown={(e) => handleKeyDown(actualIndex, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-semibold text-gray-900 bg-gray-300 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            />
          );
        })}
      </div>
    </div>
  );
};
