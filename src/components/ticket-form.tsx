"use client";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface";
import Link from "next/link";
import { createTicket, updateTicket } from "@/app/tickets/tickets.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

interface Inputs {
  title: string;
  assignedTo: string;
  status: TicketStatus;
  description: string;
}

export const TicketForm = ({ ticket }: { ticket?: Ticket }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      title: ticket?.title,
      assignedTo: ticket?.description,
      status: ticket?.status,
      description: ticket?.description,
    },
  });
  const handleChange = (status: string) => {
    setValue("status", status as TicketStatus);
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let response: any;
      if (ticket?.id) {
        response = await updateTicket(ticket.id, {
          assignedTo: data.assignedTo,
          status: data.status,
          title: data.title,
          description: data.description,
        });
      } else {
        response = await createTicket({
          assignedTo: data.assignedTo,
          status: data.status,
          title: data.title,
          description: data.description,
        });
      }
      router.push("/tickets");
      toast(response.message);
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label className="block mb-2" htmlFor="title">
          Title
        </Label>
        <Input {...register("title", { required: true })} id="Title"></Input>
      </div>
      <div>
        <Label className="block mb-2" htmlFor="assigned">
          Assigned To
        </Label>
        <Input
          {...register("assignedTo", { required: true })}
          id="assigned"
        ></Input>
      </div>
      <div>
        <Label className="block mb-2" htmlFor="assigned">
          Status
        </Label>
        <Select defaultValue={ticket?.status} onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO">To Do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="block mb-2" htmlFor="description">
          Description
        </Label>
        <Textarea
          {...register("description", { required: true })}
          id="description"
        />
      </div>
      <div className="flex justify-between gap-4">
        <Button type="submit">
          {ticket?.id ? "Update Ticket" : "Create Ticket"}
        </Button>

        <Button asChild variant="secondary">
          <Link href={"/tickets"}>Back</Link>
        </Button>
      </div>
    </form>
  );
};
