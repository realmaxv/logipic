import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { createEmployee, type Employee, type Workday } from "@/lib/api";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SaveIcon } from "lucide-react";

function AddEmployee() {
  const [form, setForm] = useState({
    day: "",
    startTime: "07:00:00",
    endTime: "15:45:00",
    open: false,
    firstName: "",
    lastName: "",
    pics: 0,
    hour: 0,
  });

  const [days, setDays] = useState<Workday[]>([]);

  const navigate = useNavigate();

  const handleSaveEmployee: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    if (
      days.length >= 1 &&
      form.firstName.length >= 3 &&
      form.lastName.length >= 3 &&
      form.hour >= 1 &&
      form.pics >= 1
    ) {
      const payload: Employee = {
        id: crypto.randomUUID(),
        name: form.firstName,
        lastname: form.lastName,
        average: form.pics,
        weekdays: days,
      };
      await createEmployee(payload);
      setDays([]);
      setForm({
        day: "",
        startTime: "07:00:00",
        endTime: "15:45:00",
        open: false,
        firstName: "",
        lastName: "",
        pics: 0,
        hour: 0,
      });
      alert("Mitarbeiter erfolgreich hinzugefügt.");
      navigate("/employees");
    } else {
      alert("Bitte fülle erst alle Felder aus.");
    }
  };

  const handleWeekdayChange = (value: string) => {
    if (value !== "") {
      setForm((prev) => ({
        ...prev,
        day: value,
        open: !prev.open,
      }));
    }
  };
  const getTimeDifferenceInHours = (start: string, end: string): number => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;

    let diffMinutes = endTotal - startTotal;

    // Gesetzliche Pausenregelung nach Arbeitszeitgesetz
    if (diffMinutes > 360 && diffMinutes <= 540) {
      // über 6h bis 9h => 30 Minuten Pause
      diffMinutes -= 30;
    } else if (diffMinutes > 540) {
      // über 9h => 45 Minuten Pause
      diffMinutes -= 45;
    }

    return parseFloat((diffMinutes / 60).toFixed(2));
  };

  const handlePresaveButton: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    if (form.day !== "") {
      const hours = getTimeDifferenceInHours(form.startTime, form.endTime);
      const newWorkday: Workday = {
        day: form.day,
        start: form.startTime,
        end: form.endTime,
        hours: hours,
      };
      setDays((prev) => [...prev, newWorkday]);
      setForm((prev) => ({
        ...prev,
        day: "",
      }));
    }
  };

  const handleRemoveDay = (index: number) => {
    setDays((prev) => prev.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    const result = getTimeDifferenceInHours(form.startTime, form.endTime);
    setForm((prev) => ({
      ...prev,
      hour: result,
    }));
  }, [form.startTime, form.endTime]);

  return (
    <section className="flex flex-col items-center justify-center w-full py-2 px-4 dark:bg-gray-900 dark:text-gray-100">
      <Card className="w-full max-w-md mx-auto text-center dark:bg-gray-800">
        <CardContent className="text-left space-y-4 px-4 pt-4">
          <p className="py-2">Nachname:</p>
          <Input
            className="w-full placeholder:font-stretch-75% placeholder:font-extralight dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            required
            placeholder="Mustermann..."
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            value={form.lastName}
          ></Input>
          <p className="py-2">Vorname:</p>
          <Input
            className="w-full placeholder:font-stretch-75% placeholder:font-extralight dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            required
            placeholder="Max..."
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            value={form.firstName}
          ></Input>
          <p className="py-2">Pics/h - Ø:</p>
          <Input
            className="w-full placeholder:font-stretch-75% placeholder:font-extralight dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            placeholder="60.0..."
            type="number"
            required
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                pics: parseFloat(parseFloat(e.target.value).toFixed(2)),
              }))
            }
            value={form.pics || ""}
          ></Input>
        </CardContent>
        <CardFooter className="flex flex-col items-start justify-center text-center w-full gap-6 px-4 pb-4">
          <p>Einsatzplanung:</p>
          <div className="flex flex-col items-center justify-center shadow-md dark:shadow-accent border rounded-3xl gap-4  p-2 w-full">
            {" "}
            <div className="flex items-center justify-evenly w-full">
              <Select onValueChange={handleWeekdayChange}>
                <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectValue placeholder="Wähle einen Tag..." />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectGroup>
                    <SelectLabel className="text-center">
                      Wochentage
                    </SelectLabel>
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
              <button
                onClick={handlePresaveButton}
                className="hover:outline p-2 rounded-2xl shadow-sm shadow-accent dark:hover:bg-accent-foreground/20"
              >
                {" "}
                <SaveIcon />
              </button>
            </div>
            {
              <div className="flex items-center gap-2 flex-col w-full">
                <div className="flex items-center justify-between w-full gap-1 border p-2 rounded-2xl shadow-2xl">
                  <Label htmlFor="time-picker" className="px-1">
                    Beginn:
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="60"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />

                  <Label htmlFor="time-picker" className="px-1">
                    Ende:
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="60"
                    value={form.endTime}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                </div>
              </div>
            }
          </div>
        </CardFooter>
      </Card>
      <div className="w-full max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 dark:border-gray-700 p-4 rounded-2xl shadow-lg border border-border">
        <h3 className="text-xl font-bold text-center mb-2 underline underline-offset-4">
          Geplante Arbeitstage
        </h3>
        <ul className="flex flex-col gap-2">
          {days.map((day, i) => (
            <li
              className="p-3 bg-accent text-accent-foreground rounded-xl shadow-sm flex justify-between items-center dark:bg-accent/80 dark:text-accent-foreground"
              key={i}
            >
              <span className="font-medium">
                {day.day}: {day.start} - {day.end} ({day.hours}h)
              </span>
              <button
                className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-700"
                onClick={() => handleRemoveDay(i)}
              >
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center w-full py-4">
        <Button
          className="w-full max-w-xs mx-auto mt-6 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          onClick={handleSaveEmployee}
        >
          Mitarbeiter Speichern
        </Button>
      </div>
      <Button
        variant="outline"
        className="w-full max-w-xs mx-auto mt-2 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        onClick={() => {
          setDays([]);
          setForm({
            day: "",
            startTime: "07:00:00",
            endTime: "15:45:00",
            open: false,
            firstName: "",
            lastName: "",
            pics: 0,
            hour: 0,
          });
        }}
      >
        Zurücksetzen
      </Button>
    </section>
  );
}

export default AddEmployee;
