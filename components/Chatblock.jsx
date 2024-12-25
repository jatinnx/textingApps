'use client'
import React from "react";
import Texting from "@/components/texting";
import Users from "@/components/users";
import { useState } from "react";
const ChatBlock = () => {

  const [chatSelect, setChatSelect] = useState(false)
  const [user, setUser] = useState(null)


  return (
    <div>
      <div className="flex items-center justify-center w-full gap-8">
        <div className="border-2 rounded-md p-2">
          <Users 
          className="flex-1"
          chatSelect={chatSelect}
          setChatSelect={setChatSelect}
          setUser={setUser}
          />
        </div>
        <div className="border-2 rounded-md p-2">
          <Texting 
          className="flex-1"
          chatSelect={chatSelect}
          user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBlock;
