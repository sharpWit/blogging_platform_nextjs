import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function CategoryLabel({ category }: { category?: string }) {
  return (
    <div className="flex gap-3">
      <Link href={`/`}>
        <Label className="underline decoration-pink-500 decoration-wavy cursor-pointer">
          {category || "Tech"}
        </Label>
      </Link>
    </div>
  );
}
