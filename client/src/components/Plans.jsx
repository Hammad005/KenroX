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
import {
  Apple,
  CalendarDays,
  Dumbbell,
  Trash2,
  Vegan,
} from "lucide-react";
import DeletePlan from "./DeletePlan";
import ActivePlan from "./ActivePlan";

const Plans = () => {
  const { plans } = planStore();

  const [active, setActive] = useState(
    plans.filter((plan) => plan?.isActive)[0] || plans[0]
  );

  const [open, setOpen] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <>
      <ActivePlan
        openActive={openActive}
        setOpenActive={setOpenActive}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
      <DeletePlan
        open={open}
        setOpen={setOpen}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        setActive={setActive}
      />
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
                  "border border-primary-foreground px-4 whitespace-normal  font-semibold min-h-10 h-auto md:text-base text-xs"
                }
              >
                {plan?.name}
                {plan?.isActive && (
                  <div className="ml-2 flex items-center gap-1 px-2 py-0.5 md:text-sm text-xs text-primary-foreground bg-secondary rounded-sm">
                    <span className="md:size-2 size-1.5 bg-green-500 rounded-full" />
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
              <AccordionTrigger className="md:text-lg font-bold text-primary-foreground uppercase">
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
                  <TableBody className={"text-xs"}>
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
          <div className="flex flex-col items-center justify-center w-full">
            <h3 className="md:text-lg text-sm font-bold text-primary-foreground uppercase tracking-tighter">
              <span className="text-muted-foreground">Plan:</span>{" "}
              {active?.name}
            </h3>
            <p className="text-muted-foreground md:text-sm text-xs">
              {new Date(active?.createdAt).toDateString()}
            </p>
            <p className="font-bold text-muted-foreground uppercase flex md:items-center mt-3 text-xs text-center">
              <CalendarDays className="size-3.5 text-primary-foreground mr-1 md:flex hidden" />
              SCHEDULE: {active?.workoutPlan?.schedule?.join(", ")}
            </p>
            {active?.isActive && (
              <span className="mt-2 flex items-center gap-1 px-2 py-0.5 md:text-sm text-xs text-primary-foreground bg-secondary rounded-sm">
                <span className="md:size-2 size-1.5 bg-green-500 rounded-full" />
                Active
              </span>
            )}
            <div className="flex items-center justify-center gap-2 md:justify-end w-full md:mt-0 mt-2">
              {!active?.isActive && (
                <Button
                  onClick={() => {
                    setSelectedPlan(active);
                    setOpenActive(true);
                  }}
                  className={"px-3"}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full" /> Active
                </Button>
              )}
              <Button
                variant={"secondary"}
                onClick={() => {
                  setSelectedPlan(active);
                  setOpen(true);
                }}
              >
                <Trash2 /> Delete
              </Button>
            </div>
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
                <div className="flex flex-col gap-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-md flex flex-col gap-4"
                  >
                    {active?.workoutPlan?.exercises.map((exercise, index) => (
                      <AccordionItem
                        value={`item-${index + 1}`}
                        key={index}
                        className={"bg-card rounded-md"}
                      >
                        <AccordionTrigger
                          className={
                            "hover:bg-secondary text-primary-foreground font-semibold tracking-wide py-3 px-4   w-full"
                          }
                        >
                          <p className="text-xs">{exercise.day}</p>
                          <p className="text-xs text-muted-foreground flex justify-end w-full">
                            {exercise.routines.length} Exercise
                          </p>
                        </AccordionTrigger>
                        <AccordionContent className={"p-4 flex flex-col gap-8"}>
                          {exercise.routines.map((routine, index) => (
                            <div
                              key={index}
                              className="flex md:flex-row flex-col items-center md:justify-between justify-center bg-input p-4 rounded-md gap-2"
                            >
                              <p className="text-sm text-center">
                                {routine.name}
                              </p>
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
              <TabsContent value="diet">
                <div className="font-bold text-muted-foreground uppercase flex md:flex-row flex-col items-center justify-between mb-5 py-3 border-b border-b-muted-foreground">
                  <p className="flex items-center gap-1 md:text-base text-sm font-semibold">
                    <Vegan className="size-5 text-primary-foreground" /> Daily
                    Calories Target:
                  </p>
                  <p className="text-primary-foreground md:text-xl text-lg font-black font-sans">
                    {active?.dietPlan?.dailyCalories} calories
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {active?.dietPlan?.meals.map((meal, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 bg-card p-4 rounded-md"
                    >
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-2 uppercase text-primary-foreground font-semibold tracking-wide md:text-base text-xs">
                          <span className="md:size-3 size-2 bg-primary-foreground rounded-full" />{" "}
                          {meal.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {meal.foods.length} Meals
                        </p>
                      </div>

                      {meal.foods.map((food, index) => (
                        <p
                          key={index}
                          className="md:text-sm text-xs border-b pb-3"
                        >
                          <span className="text-primary-foreground font-sans font-semibold mr-2">
                            {index + 1}.
                          </span>
                          {food}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Plans;
