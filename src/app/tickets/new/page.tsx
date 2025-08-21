
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface";
import { createTicket, getTicket } from "@/app/tickets/tickets.api";

import { TicketForm } from "@/components/ticket-form";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function newTicket({ params }: Params) {
  const id = (await params)?.id;

  let data: { ticket: Ticket } | undefined;

  if (id) {
    data = await getTicket(id);
  }

  return (
    <div className="max-w-[400px] w-full p-8 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle> New Ticket </CardTitle>
        </CardHeader>
        <CardContent>
          <TicketForm ticket={data?.ticket}></TicketForm>
        </CardContent>
      </Card>
    </div>
  );
}
