import JoinEvent from "@/components/join-event";
import React from "react";

const JoinEventPage: React.FC = () => {
  return (
    <section className="h-screen bg-violet-400 grid place-items-center flex-1 rounded-lg relative">
      <JoinEvent />
    </section>
  );
};

export default JoinEventPage;
