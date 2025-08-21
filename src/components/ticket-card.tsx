"use client";
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
import { Button } from "./ui/button";
import { LucideTrash2 } from "lucide-react";
import { deleteTicket } from "@/app/tickets/tickets.api";
import { Console } from "console";
import { toast } from "sonner";
import { revalidate } from "@/lib/actions";
import Link from "next/link";
import { MouseEvent } from "react";

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

const getStatusName = (status: TicketStatus) => {
  const names = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
    REJECTED: "Rejected",
  };

  return names[status] ?? "Unknown";
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const handleDelete = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const response = await deleteTicket(ticket.id);
      await revalidate("/tickets");
      toast(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link href={`/tickets/${ticket.id}/edit`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {ticket.title}
            <Button
              onClick={(event) => handleDelete(event)}
              size={"sm"}
              variant={"ghost"}
            >
              <LucideTrash2></LucideTrash2>
            </Button>{" "}
          </CardTitle>
          <CardDescription>{ticket.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant={getStatusVariant(ticket.status)}>
            {getStatusName(ticket.status)}
          </Badge>
        </CardContent>
        <CardFooter>
          <p className="font-bold">Assigned To {ticket.assignedTo}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
