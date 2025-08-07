import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const TICKET_STATUS_COLORS = {
  TODO: "default",
  IN_PROGRESS: "secondary",
  DONE: "success",
  REJECTED: "destructive",
} as const;

const getStatusVariant = (
  status: TicketStatus
): "default" | "secondary" | "success" | "destructive" => {
  return TICKET_STATUS_COLORS[status];
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ticket.title}</CardTitle>
        <CardDescription>
          {ticket.description} || 'No description.'
        </CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Status </p>
        <Badge variant={getStatusVariant(ticket.status)}>{ticket.status}</Badge>
      </CardContent>
      <CardFooter>
        <p className="font-bold">Assigned To {ticket.assignedTo}</p>
      </CardFooter>
    </Card>
  );
}
