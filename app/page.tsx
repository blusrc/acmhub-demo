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
import { Check, PlusIcon, Undo } from "lucide-react";
import { useState } from "react";

type Task = {
  name: string;
  due: number;
  complete: boolean;
};

const sample_tasks = [
  {
    name: "tuda suda",
    due: Date.now(),
    complete: false,
  },
  {
    name: "million",
    due: Date.now(),
    complete: false,
  },
  {
    name: "1",
    due: Date.now(),
    complete: false,
  },
  {
    name: "maoseuht",
    due: Date.now(),
    complete: false,
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(sample_tasks);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleComplete = (taskToRemove: Task) => {
    setCompletedTasks((completedTasks) => [taskToRemove, ...completedTasks]);
    setTasks(tasks.filter((task) => task !== taskToRemove));
  };

  const undoTask = (taskToReturn: Task) => {
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
                    <div
                      key={`${task.name}${index}`}
                      className="border p-4 rounded-md flex items-center justify-between"
                    >
                      <span className="font-bold">{task.name}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleComplete(task)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
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
                          <div
                            key={`${task.name}${index}`}
                            className="border p-4 rounded-md flex items-center justify-between bg-secondary"
                          >
                            <span className="font-bold">{task.name}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => undoTask(task)}
                            >
                              <Undo className="w-4 h-4" />
                            </Button>
                          </div>
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
