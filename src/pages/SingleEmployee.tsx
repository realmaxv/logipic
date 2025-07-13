const WORKDAYS: Workday[] = [
  { day: "Montag", start: "", end: "", hours: 0 },
  { day: "Dienstag", start: "", end: "", hours: 0 },
  { day: "Mittwoch", start: "", end: "", hours: 0 },
  { day: "Donnerstag", start: "", end: "", hours: 0 },
  { day: "Freitag", start: "", end: "", hours: 0 },
  { day: "Samstag", start: "", end: "", hours: 0 },
  { day: "Sonntag", start: "", end: "", hours: 0 },
];
import type { Employee, Workday } from "@/components/AddEmployee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function SingleEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee[] | null>(null);
  const [update, setUpdate] = useState<{
    name: string;
    lastname: string;
    average: number;
    weekdays: Workday[];
  }>({
    name: "",
    lastname: "",
    average: 0,
    weekdays: [],
  });

  const { id } = useParams();

  // Berechnet Arbeitsstunden inkl. Pausen (30 Min ab 6h, 45 Min ab 9h)
  function getTimeDifferenceInHours(start: string, end: string): number {
    if (!start || !end) return 0;

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startH, startM, 0, 0);

    const endDate = new Date();
    endDate.setHours(endH, endM, 0, 0);

    // Wenn Endzeit vor Startzeit, z.B. über Mitternacht, dann 1 Tag addieren
    if (endDate <= startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diffMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

    let pause = 0;
    if (diffMinutes >= 540) {
      // 9 Stunden = 540 Min => 45 Min Pause
      pause = 45;
    } else if (diffMinutes >= 360) {
      // 6 Stunden = 360 Min => 30 Min Pause
      pause = 30;
    }

    const netMinutes = diffMinutes - pause;
    const hours = netMinutes / 60;
    return hours > 0 ? hours : 0;
  }

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      const parsedEmployees: Employee[] = JSON.parse(storedEmployees);
      const foundEmployee = parsedEmployees.find((emp) => emp.id === id);
      if (foundEmployee) {
        setEmployee([foundEmployee]);
        setUpdate({
          name: foundEmployee.name,
          lastname: foundEmployee.lastname,
          average: foundEmployee.average,
          weekdays: foundEmployee.weekdays || [],
        });
      }
    }
  }, [id]);

  if (!employee) {
    return null;
  }

  const handleSaveClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const storedEmployees = localStorage.getItem("employees");
    if (!storedEmployees) return;

    const parsedEmployees: Employee[] = JSON.parse(storedEmployees);

    // Neues Array mit aktualisiertem Eintrag
    const updatedEmployees = parsedEmployees.map((emp) => {
      if (emp.id === id) {
        return {
          ...emp,
          name: update.name,
          lastname: update.lastname,
          average: update.average,
          weekdays: update.weekdays,
        };
      }
      return emp;
    });
    // Zurück in den localStorage speichern
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    alert("Mitarbeiter aktualisiert!");
    navigate("/employees");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Mitarbeiter bearbeiten
      </h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Vorname</label>
          <Input
            value={update.name}
            className="w-full"
            onChange={(e) =>
              setUpdate((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nachname</label>
          <Input
            value={update.lastname}
            className="w-full"
            onChange={(e) =>
              setUpdate((prev) => ({ ...prev, lastname: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            ⏱ Durchschnittliche Leistung (Etiketten/Stunde)
          </label>
          <Input
            type="number"
            onChange={(e) =>
              setUpdate((prev) => ({
                ...prev,
                average: Number(e.target.value),
              }))
            }
            value={update.average || ""}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            📅 Arbeitstage
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {WORKDAYS.map((workday) => {
              return (
                <div key={workday.day}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={update.weekdays.some(
                        (d) => d.day === workday.day
                      )}
                      onChange={(e) => {
                        setUpdate((prev) => {
                          if (e.target.checked) {
                            // Add workday with existing values if present, else default
                            const existing = prev.weekdays.find(
                              (d) => d.day === workday.day
                            );
                            if (existing) {
                              // Bereits vorhanden, keine Änderung nötig
                              return prev;
                            } else {
                              // Neu hinzufügen mit Defaultwerten
                              const newDay: Workday = {
                                day: workday.day,
                                start: "",
                                end: "",
                                hours: 0,
                              };
                              return {
                                ...prev,
                                weekdays: [...prev.weekdays, newDay],
                              };
                            }
                          } else {
                            // Entfernen
                            return {
                              ...prev,
                              weekdays: prev.weekdays.filter(
                                (d) => d.day !== workday.day
                              ),
                            };
                          }
                        });
                      }}
                    />
                    <span>{String(workday.day)}</span>
                  </label>
                  {update.weekdays.some((d) => d.day === workday.day) && (
                    <div className="ml-6 mt-2 space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <label className="w-16">Start</label>
                        <Input
                          type="time"
                          value={
                            update.weekdays.find((d) => d.day === workday.day)
                              ?.start || ""
                          }
                          onChange={(e) => {
                            const newStart = e.target.value;
                            setUpdate((prev) => ({
                              ...prev,
                              weekdays: prev.weekdays.map((d) =>
                                d.day === workday.day
                                  ? {
                                      ...d,
                                      start: newStart,
                                      hours: getTimeDifferenceInHours(
                                        newStart,
                                        d.end
                                      ),
                                    }
                                  : d
                              ),
                            }));
                          }}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="w-16">Ende</label>
                        <Input
                          type="time"
                          value={
                            update.weekdays.find((d) => d.day === workday.day)
                              ?.end || ""
                          }
                          onChange={(e) => {
                            const newEnd = e.target.value;
                            setUpdate((prev) => ({
                              ...prev,
                              weekdays: prev.weekdays.map((d) =>
                                d.day === workday.day
                                  ? {
                                      ...d,
                                      end: newEnd,
                                      hours: getTimeDifferenceInHours(
                                        d.start,
                                        newEnd
                                      ),
                                    }
                                  : d
                              ),
                            }));
                          }}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Button onClick={handleSaveClick} className="w-full mt-4">
          💾 Speichern
        </Button>
      </form>
    </main>
  );
}

export default SingleEmployee;
