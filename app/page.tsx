"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md w-full flex-1 border-border border-x px-4 py-8 flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <Avatar>
            <AvatarImage src="https://github.com/blusrc" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle>My Todos</CardTitle>
          </CardHeader>
          <CardContent>
            <Card>
              <CardHeader>
                <CardTitle>Task #1</CardTitle>
              </CardHeader>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
