"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useState } from "react";
import { Button } from "./ui/button";

export type Employee = {
  name: string;
  lastname: string;
  average: number;
  weekdays: string[];
  daylyWorkTime: number;
  id: string;
};

function AddEmployee() {
  const hours = [
    {
      hour: 1,
    },
    {
      hour: 2,
    },
    {
      hour: 3,
    },
    {
      hour: 4,
    },
    {
      hour: 5,
    },
    {
      hour: 6,
    },
    {
      hour: 7,
    },
    {
      hour: 8,
    },
    {
      hour: 9,
    },
    {
      hour: 10,
    },
  ];
  const [days, setDays] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pics, setPics] = useState(0);
  const [hour, setHour] = useState(0);
  const [employee, setEmployee] = useState<Employee[]>([]);

  const handleSaveEmployee: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    if (
      days.length >= 1 &&
      firstName.length >= 3 &&
      lastName.length >= 3 &&
      hour >= 1 &&
      pics >= 1
    ) {
      const sum: Employee = {
        average: pics,
        daylyWorkTime: hour,
        id: crypto.randomUUID(),
        lastname: lastName,
        name: firstName,
        weekdays: days,
      };

      setEmployee((prev) => [...prev, sum]);
      const stored = localStorage.getItem("employees");
      const updatedEmployees = stored ? [...JSON.parse(stored), sum] : [sum];
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setDays([]);
      setFirstName("");
      setLastName("");
      setPics(0);
      setHour(0);
      alert("Mitarbeiter erfolgreich hinzugefügt.");
    } else {
      alert("Bitte fülle erst alle Felder aus.");
    }
  };
  console.log(employee);
  function onClick(adjustment: number) {
    setHour((prev) => prev + adjustment);
  }
  const handleCheckboxChange: React.FormEventHandler<HTMLButtonElement> = (
    e
  ) => {
    const target = e.target as HTMLButtonElement;

    switch (target.id) {
      case "monday":
        if (days.includes("Montag")) {
          setDays((prev) => prev.filter((day) => day !== "Montag"));
        } else {
          setDays((prev) => [...prev, "Montag"]);
        }

        break;
      case "tuesday":
        if (days.includes("Dienstag")) {
          setDays((prev) => prev.filter((day) => day !== "Dienstag"));
        } else {
          setDays((prev) => [...prev, "Dienstag"]);
        }
        break;
      case "wednesday":
        if (days.includes("Mittwoch")) {
          setDays((prev) => prev.filter((day) => day !== "Mittwoch"));
        } else {
          setDays((prev) => [...prev, "Mittwoch"]);
        }
        break;

      case "thursday":
        if (days.includes("Donnerstag")) {
          setDays((prev) => prev.filter((day) => day !== "Donnerstag"));
        } else {
          setDays((prev) => [...prev, "Donnerstag"]);
        }
        break;
      case "friday":
        if (days.includes("Freitag")) {
          setDays((prev) => prev.filter((day) => day !== "Freitag"));
        } else {
          setDays((prev) => [...prev, "Freitag"]);
        }
        break;
      case "saturday":
        if (days.includes("Samstag")) {
          setDays((prev) => prev.filter((day) => day !== "Samstag"));
        } else {
          setDays((prev) => [...prev, "Samstag"]);
        }
        break;
      case "sunday":
        if (days.includes("Sonntag")) {
          setDays((prev) => prev.filter((day) => day !== "Sonntag"));
        } else {
          setDays((prev) => [...prev, "Sonntag"]);
        }
        break;
      default:
        setDays([]);
        break;
    }
  };

  return (
    <section className="flex flex-col items-center justify-center  gap-4 px-4">
      <Card className="text-center m-8">
        <CardHeader>
          <CardTitle>Neuer Mitarbeiter</CardTitle>
        </CardHeader>
        <CardContent className="text-left ">
          <p className="py-2">Nachname:</p>
          <Input
            className="placeholder:font-stretch-75% placeholder:font-extralight"
            required
            placeholder="Mustermann..."
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></Input>
          <p className="py-2">Vorname:</p>
          <Input
            className="placeholder:font-stretch-75% placeholder:font-extralight"
            required
            placeholder="Max..."
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          ></Input>
          <p className="py-2">Pics/h - Ø:</p>
          <Input
            className="placeholder:font-stretch-75% placeholder:font-extralight"
            placeholder="60.0..."
            type="number"
            required
            onChange={(e) =>
              setPics(parseFloat(parseFloat(e.target.value).toFixed(2)))
            }
            value={pics}
          ></Input>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <p>Einsatzplanung:</p>
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              {" "}
              <Checkbox
                onClick={handleCheckboxChange}
                value={""}
                id="monday"
                checked={days.includes("Montag")}
              />
              <Label htmlFor="monday">Montag</Label>
              <Checkbox
                onClick={handleCheckboxChange}
                id="tuesday"
                checked={days.includes("Dienstag")}
              />
              <Label htmlFor="tuesday">Dienstag</Label>
              <Checkbox
                onClick={handleCheckboxChange}
                id="wednesday"
                checked={days.includes("Mittwoch")}
              />
              <Label htmlFor="wednesday">Mittwoch</Label>
            </div>
            <div className="flex items-start gap-2">
              {" "}
              <Checkbox
                onClick={handleCheckboxChange}
                id="thursday"
                checked={days.includes("Donnerstag")}
              />
              <Label htmlFor="thursday">Donnerstag</Label>
              <Checkbox
                onClick={handleCheckboxChange}
                id="friday"
                checked={days.includes("Freitag")}
              />
              <Label htmlFor="friday">Freitag</Label>
              <Checkbox
                onClick={handleCheckboxChange}
                id="saturday"
                checked={days.includes("Samstag")}
              />
              <Label htmlFor="saturday">Samstag</Label>
            </div>
            <div className="flex items-start gap-4">
              {" "}
              <Checkbox
                onClick={handleCheckboxChange}
                id="sunday"
                checked={days.includes("Sonntag")}
              />
              <Label htmlFor="sunday">Sonntag</Label>
            </div>
          </div>
        </CardFooter>
        {/* Drawer should be rendered outside the Card to avoid z-index/overflow issues */}
      </Card>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex items-center justify-center z-50">
            <Button className="max-w-80 " variant="outline">
              Arbeitsstunden/Tag
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="pb-32 pt-4 sm:pt-0">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Täglicher Arbeitseinsatz</DrawerTitle>
              <DrawerDescription>
                Für Wieviele Stunden am Tag wurde der Mitarbeiter eingeplant?
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(-1)}
                  disabled={hour <= 0}
                >
                  <Minus />
                  <span className="sr-only">minus</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {hour}
                  </div>
                  <div className="text-muted-foreground text-[0.70rem] uppercase">
                    Stunden/Tag
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(1)}
                  disabled={hour >= 10}
                >
                  <Plus />
                  <span className="sr-only">plus</span>
                </Button>
              </div>
              <div className="mt-3 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hours}>
                    <Bar
                      dataKey="hour"
                      style={
                        {
                          fill: "hsl(var(--foreground))",
                          opacity: 0.9,
                        } as React.CSSProperties
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Speichern</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      <Button onClick={handleSaveEmployee}>Mitarbeiter Speichern</Button>
    </section>
  );
}

export default AddEmployee;
