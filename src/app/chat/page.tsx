import { Suspense } from "react";
import { ChatScreen } from "./ChatScreen";

export const metadata = {
  title: "Chat — ACHUZI#1",
};

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatScreen />
    </Suspense>
  );
}
