import { SelectContent, SelectItem } from "@/components/ui/select";
import {categories} from "@/constant"


export default function CategorySelectContent() {
  return (
    <SelectContent>
      {Object.entries(categories).map(([value, label]) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  );
}
