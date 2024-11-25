import CreateEvent from "@/components/create-event";
import React from "react";

const CreateEventPage: React.FC = () => {
  return (
    <section className="h-screen bg-violet-400 grid place-items-center flex-1 rounded-lg relative">
      <CreateEvent />
    </section>
  );
};

export default CreateEventPage;