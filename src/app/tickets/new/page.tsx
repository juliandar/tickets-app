"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface";
import { Button } from "@/components/ui/button";
import { createTicket, getTicket } from "@/app/tickets/tickets.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { TicketForm } from "@/components/ticket-form";
import { ticket } from "@/generated/prisma";

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
