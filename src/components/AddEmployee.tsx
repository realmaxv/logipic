import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useNavigate } from "react-router";

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
        <div className="flex flex-col items-center justify-center outline p-4 shadow-md shadow-accent mx-6 rounded-2xl gap-4">
          <h2>Anzahl tägl. Arbeitsstunden:</h2>
          <p className="font-bold">{hour + " Stunden"}</p>
          <Slider
            className="w-[250px]"
            defaultValue={[0]}
            max={10}
            step={1}
            onValueChange={(value) => setHour(value[0])}
          />
        </div>
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
