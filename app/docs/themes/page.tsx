"use client";

import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { useRouter } from "next/navigation";

export default function themes() {
    const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center">

<Card variant="minimal" className="max-w-sm">
  <CardHeader>
    <CardTitle>Coming soon</CardTitle>
    <CardDescription>Soon, here you can create, edit, modify themes.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Experiment with different color schemes, typography, and spacing to craft a unique look for your project. 
    </p>
  </CardContent>
  <CardFooter className="justify-end">
    <Button size="sm" onClick={() => router.push("/docs/introduction")}>
      Visit Later?
    </Button>
  </CardFooter>
</Card>
    </div>
  );
}