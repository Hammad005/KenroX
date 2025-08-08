import React, { useState } from "react";
import { Card } from "./ui/card";
import { planStore } from "@/store/planStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Apple, Calendar, CalendarDays, Dumbbell } from "lucide-react";

const Plans = () => {
  const { plans } = planStore();

  const [active, setActive] = useState(
    plans.filter((plan) => plan?.isActive)[0] || plans[0]
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        <Card className={"w-full px-6"}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary-foreground uppercase">
              Your Plans:
            </h3>
            <p className="text-sm text-muted-foreground">
              Total Plans: {plans?.length}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {plans?.map((plan) => (
              <Button
                key={plan?._id}
                variant={active?._id === plan?._id ? "default" : "outline"}
                onClick={() => setActive(plan)}
                className={
                  "border border-primary-foreground px-4 whitespace-normal  font-semibold"
                }
                size={"lg"}
              >
                {plan?.name}
                {plan?.isActive && (
                  <div className="ml-2 flex items-center gap-1 px-2 py-0.5 text-sm text-primary-foreground bg-secondary rounded-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Active
                  </div>
                )}
              </Button>
            ))}
          </div>
          <Accordion
            type="single"
            collapsible
            className="flex flex-col p-4 rounded-md bg-input gap-2 w-full py-0"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold text-primary-foreground uppercase">
                What You Gave Us:
              </AccordionTrigger>
              <AccordionContent>
                <Table className={"border border-foreground"}>
                  <TableHeader
                    className={"bg-primary border border-foreground"}
                  >
                    <TableRow
                      className={"border border-foreground hover:bg-primary"}
                    >
                      <TableHead
                        className={
                          "font-bold font-sans border-r border-foreground text-white"
                        }
                      >
                        Question
                      </TableHead>
                      <TableHead className={"font-bold font-sans text-white"}>
                        Answer
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      className={"border border-foreground whitespace-pre-wrap"}
                    >
                      <TableCell
                        className={
                          "whitespace-pre-wrap border-r border-foreground"
                        }
                      >
                        Age
                      </TableCell>
                      <TableCell className={"whitespace-pre-wrap"}>
                        {active?.data?.age}
                      </TableCell>
                    </TableRow>
                    <TableRow className={"border border-foreground"}>
                      <TableCell
                        className={
                          "whitespace-pre-wrap border-r border-foreground"
                        }
                      >
                        Height
                      </TableCell>
                      <TableCell className={"whitespace-pre-wrap"}>
                        {active?.data?.height}
                      </TableCell>
                    </TableRow>
                    <TableRow className={"border border-foreground"}>
                      <TableCell
                        className={
                          "whitespace-pre-wrap border-r border-foreground"
                        }
                      >
                        Weight
                      </TableCell>
                      <TableCell className={"whitespace-pre-wrap"}>
                        {active?.data?.weight}
                      </TableCell>
                    </TableRow>
                    <TableRow className={"border border-foreground"}>
                      <TableCell
                        className={
                          "whitespace-pre-wrap border-r border-foreground"
                        }
                      >
                        Injuries or Allergies
                      </TableCell>
                      <TableCell className={"whitespace-pre-wrap"}>
                        {active?.data?.injuries}
                      </TableCell>
                    </TableRow>
                    <TableRow className={"border border-foreground"}>
                      <TableCell
                        className={
                          "whitespace-pre-wrap border-r border-foreground"
                        }
                      >
                        Workout Days
                      </TableCell>
                      <TableCell className={"whitespace-pre-wrap"}>
                        {active?.data?.workout_days?.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow className={"border border-foreground"}>
                      <TableCell
                        className={
                          "whitespace-pre-wrap border-r border-foreground"
                        }
                      >
                        Fitness Goal
                      </TableCell>
                      <TableCell className={"whitespace-pre-wrap"}>
                        {active?.data?.fitness_goal}
                      </TableCell>
                    </TableRow>
                    <TableRow className={"border border-foreground"}>
                      <TableCell
                        className={
                          "whitespace-pre-wrap border-r border-foreground"
                        }
                      >
                        Fitness Level
                      </TableCell>
                      <TableCell className={"whitespace-pre-wrap"}>
                        {active?.data?.fitness_level}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
        <Card className={"w-full px-6"}>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-primary-foreground uppercase tracking-tighter">
              <span className="text-muted-foreground">Plan:</span>{" "}
              {active?.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {new Date(active?.createdAt).toDateString()}
            </p>
            {active?.isActive && (
              <span className="mt-2 flex items-center gap-1 px-2 py-0.5 text-sm text-primary-foreground bg-secondary rounded-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Active
              </span>
            )}
          </div>

          <div className="flex flex-col p-4 rounded-md bg-input gap-2 w-full">
            <Tabs defaultValue="workout" className="w-full">
              <TabsList className={"w-full"}>
                <TabsTrigger value="workout" className={"text-xs"}>
                  <Dumbbell /> Workout Plan
                </TabsTrigger>
                <TabsTrigger value="diet" className={"text-xs"}>
                  <Apple /> Diet Plan
                </TabsTrigger>
              </TabsList>
              <TabsContent value="workout">
                <p className="font-bold text-muted-foreground uppercase flex items-center gap-1 my-3">
                  <CalendarDays className="size-5 text-primary-foreground" />{" "}
                  SCHEDULE: {active?.workoutPlan?.schedule?.join(", ")}
                </p>
                <div className="flex flex-col gap-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-md flex flex-col gap-4"
                  >
                    {active?.workoutPlan?.exercises.map((exercise, index) => (
                      <AccordionItem value={`item-${index + 1}`} key={index} className={"bg-card rounded-md"}>
                        <AccordionTrigger
                          className={
                            "hover:bg-secondary text-primary-foreground font-semibold tracking-wide py-3 px-4"
                          }
                        >
                          {exercise.day}
                        </AccordionTrigger>
                        <AccordionContent className={"p-4 flex flex-col gap-8"}>
                          {exercise.routines.map((routine, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-input p-4 rounded-md"
                            >
                              <p>{routine.name}</p>
                              <div className="flex gap-2">
                                <p className="text-primary-foreground text-sm bg-primary py-1 px-4 rounded-md">
                                  {routine.sets} sets
                                </p>
                                <p className="text-primary text-sm bg-primary-foreground py-1 px-4 rounded-md">
                                  {routine.reps} reps
                                </p>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              <TabsContent value="diet">Change your password here.</TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Plans;
