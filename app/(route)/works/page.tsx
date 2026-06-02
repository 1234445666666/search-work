import StoryList from "@/features/story-list/StoryList";
import WorkFilters from "@/features/works/work-filter/WorkFilters";
import WorkList from "@/features/works/work-list/WorkList";

export default function Works() {
  return (
    <div>
      <StoryList />
      <WorkFilters />
      <WorkList />
    </div>
  );
}
