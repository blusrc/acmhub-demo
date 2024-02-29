"use client";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Task = {
  name: string;
  due: Date;
  complete: boolean;
};

const formSchema = z.object({
  name: z.string().min(2).max(50),
  due: z.date(),
});

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JavaScript months are 0-based.
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month} ${hours}:${minutes}`;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      due: new Date(),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const task: Task = {
      name: values.name,
      due: values.due,
      complete: false,
    };
    console.log(values);
    undoTask(task);
  }

  const TaskComponent = ({
    task,
    complete,
  }: {
    task: Task;
    complete: boolean;
  }) => (
    <div className="border p-4 rounded-md flex items-center justify-between">
      <div className="flex flex-col max-w-48">
        <span className="font-bold truncate">{task.name}</span>
        <span className="font-light text-xs">Due: {formatDate(task.due)}</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => (complete ? handleComplete(task) : undoTask(task))}
      >
        <Check className="w-4 h-4" />
      </Button>
    </div>
  );

  const AddTaskDialog = () => (
    <Dialog>
      <DialogTrigger>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input placeholder="Cook dinner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="due"
              render={({ field }) => (
                <FormItem className="flex gap-2 flex-col">
                  <FormLabel>Due</FormLabel>
                  <FormControl>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

  const handleComplete = (taskToRemove: Task) => {
    toast(`Congrats! You've completed the task`, {
      description: `${taskToRemove.name}`,
    });
    setCompletedTasks((completedTasks) => [taskToRemove, ...completedTasks]);
    setTasks(tasks.filter((task) => task !== taskToRemove));
  };

  const undoTask = (taskToReturn: Task) => {
    toast.success("Task added!", {
      description: `${taskToReturn.name}`,
    });
    setTasks((tasks) => [taskToReturn, ...tasks]);
    setCompletedTasks(completedTasks.filter((task) => task !== taskToReturn));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md max-h-screen overflow-hidden w-full flex-1 px-4 py-8 flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <Avatar>
            <AvatarImage src="https://github.com/blusrc.png" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
        <Card className="w-full flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>My Todos</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <ScrollArea className="h-96">
              <section className="flex-1 flex flex-col gap-2">
                {tasks.map((task, index) => {
                  return (
                    <TaskComponent
                      complete={true}
                      task={task}
                      key={`${task.name}${index}`}
                    />
                  );
                })}
              </section>
            </ScrollArea>
            <Accordion type="single" collapsible>
              <AccordionItem value="completed">
                <AccordionTrigger>Completed Tasks</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className="h-48">
                    <section className=" flex flex-col gap-2">
                      {completedTasks.map((task, index) => {
                        return (
                          <TaskComponent
                            complete={false}
                            task={task}
                            key={`${task.name}${index}`}
                          />
                        );
                      })}
                    </section>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <AddTaskDialog />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
