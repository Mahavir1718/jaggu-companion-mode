import { createFileRoute } from "@tanstack/react-router";
import { CompanionScreen } from "@/components/companion/CompanionScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jaggu · Your MyOS Companion" },
      {
        name: "description",
        content:
          "Jaggu — your AI panda companion in MyOS. A friend, mentor, memory keeper and life assistant that understands your life.",
      },
      { property: "og:title", content: "Jaggu · Your MyOS Companion" },
      {
        property: "og:description",
        content: "A premium AI life companion that keeps your memories, goals and reflections.",
      },
    ],
  }),
  component: CompanionScreen,
});
