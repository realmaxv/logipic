"use client";
import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type Employee = {
  name: string;
  lastname: string;
  average: number;
  weekdays: string[];
  daylyWorkTime: number;
  id: string;
};

function AddEmployee() {
  const [days, setDays] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pics, setPics] = useState(0);
  const [hour, setHour] = useState(0);
  const [employee, setEmployee] = useState<Employee[]>([]);
  const navigate = useNavigate();
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
      navigate("/employees");
    } else {
      alert("Bitte fülle erst alle Felder aus.");
    }
  };
  console.log(employee);

  const handleWeekdayChange = (value: string) => {
    const day = value;
    if (value != "") {
      console.log(day);

      setOpen((prev) => !prev);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center  py-2 ">
      <Card className="text-center flex items-start justify-start h-160">
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
        <CardFooter className="flex flex-col items-center text-center w-full gap-4">
          <p>Einsatzplanung:</p>
          <div className="flex flex-col items-center gap-4">
            {" "}
            <Select onValueChange={handleWeekdayChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Wähle einen Tag..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-center">Wochentage</SelectLabel>
                  <SelectItem value="Montag">Montag</SelectItem>
                  <SelectItem value="Dienstag">Dienstag</SelectItem>
                  <SelectItem value="Mittwoch">Mittwoch</SelectItem>
                  <SelectItem value="Donnerstag">Donnerstag</SelectItem>
                  <SelectItem value="Freitag">Freitag</SelectItem>
                  <SelectItem value="Samstag">Samstag</SelectItem>
                  <SelectItem value="Sonntag">Sonntag</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {date && (
              <div className="flex items-center gap-2 flex-col w-full">
                <div className="flex items-center justify-between w-full gap-1">
                  <Label htmlFor="time-picker" className="px-1">
                    Beginn:
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="07:00:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
                <div className="flex items-center justify-between w-full gap-1">
                  <Label htmlFor="time-picker" className="px-1">
                    Ende:
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="15:45:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>
            )}
          </div>
        </CardFooter>

        <div className="flex items-center justify-center w-full">
          <Button className="w-[200px]" onClick={handleSaveEmployee}>
            Mitarbeiter Speichern
          </Button>
        </div>
      </Card>
    </section>
  );
}

export default AddEmployee;
