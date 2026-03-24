"use client";

import { Suspense } from "react";
import SearchContent from "../../../components/ui/Search";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SearchContent/>
    </Suspense>
  );
}