"use client";

import { useSearchParams } from "next/navigation";
function DetailTrackPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("audio");
  return (
    <div>
      My Post: {params.slug} <br></br>
      param : {search}
    </div>
  );
}
export default DetailTrackPage;
