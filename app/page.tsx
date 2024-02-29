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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Task = {
  name: string;
  due: Date;
  complete: boolean;
};

const sample_tasks = [
  {
    name: "tuda suda asoetuhoasnteuhsantoehusn hasonteuhs naohesu tnh",
    due: new Date(),
    complete: false,
  },
  {
    name: "million",
    due: new Date(),
    complete: false,
  },
  {
    name: "1",
    due: new Date(),
    complete: false,
  },
  {
    name: "maoseuht",
    due: new Date(),
    complete: false,
  },
];

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JavaScript months are 0-based.
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month} ${hours}:${minutes}`;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(sample_tasks);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

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

  const handleComplete = (taskToRemove: Task) => {
    toast(`Congrats! You've completed the task`, {
      description: `${taskToRemove.name}`,
    });
    setCompletedTasks((completedTasks) => [taskToRemove, ...completedTasks]);
    setTasks(tasks.filter((task) => task !== taskToRemove));
  };

  const undoTask = (taskToReturn: Task) => {
    toast("Task returned to active", {
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
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add task
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
