import {
  getAllEntries,
  getFeaturedEntries,
  getTypeCounts,
} from "@/lib/entries";
import { HomeContent } from "./home-content";

export default function Home() {
  return (
    <HomeContent
      allEntries={getAllEntries()}
      featuredEntries={getFeaturedEntries()}
      typeCounts={getTypeCounts()}
    />
  );
}
