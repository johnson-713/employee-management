import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

interface AppSearchInputProps {
  placeholder: string;
  handleSearch: (value: string) => void;
  value?: string;
}

const AppSearchInput = ({
  placeholder,
  handleSearch,
  value,
}: AppSearchInputProps) => {
  return (
    <div className="relative max-w-[400px] w-full">
      <Input
        className="p-2.5 pl-10 rounded-[11px] w-full max-w-100"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default AppSearchInput;
