import Link from "next/link";
import { ICats } from "../__types/posts";
import { Label } from "@/components/ui/label";

export default function CategoryLabel({
  categories,
}: {
  categories: ICats | null;
}) {
  return (
    <div className="flex gap-3">
      <Link href={`/`}>
        <Label className="underline decoration-pink-500 decoration-wavy cursor-pointer">
          {categories?.name || "Tech"}
        </Label>
      </Link>
    </div>
  );
}
