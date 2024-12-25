import React from "react";
import ChatBlock from "@/components/Chatblock";

import Toggel from "@/components/toggel";
const Chat = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <ChatBlock  />
      </div>
    </div>
  );
};

export default Chat;
