import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import { Ticket } from "./tickets.interface";
import { TicketCard } from "@/components/ticket-card";

export default function Home() {
  const tickets: Ticket[] = [
    {
      id: "1",
      title: "Ticket 1",
      description: "This is ticket 1",
      status: "TODO",
      assignedTo: "Me",
    },
    {
      id: "2",
      title: "Ticket 2",
      description: "This is ticket 2",
      status: "DONE",
      assignedTo: "John",
    },
    {
      id: "3",
      title: "Ticket 3",
      description: "This is ticket 3",
      status: "TODO",
      assignedTo: "Jane",
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tickets</h1>
        <Button>
          Add new ticket <LucidePlusCircle />
        </Button>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
