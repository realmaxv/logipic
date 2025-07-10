import { useEffect, useState } from "react";
import type { Employee } from "@/components/AddEmployee";

function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [weekPlan, setWeekPlan] = useState<{ [key: string]: number }>({});
  const [avgPicsPerHour, setAvgPicsPerHour] = useState<number>(60); // mindestschnitt selbst festlegen

  // Lade employees aus localStorage
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // Lade Wochenplanung aus localStorage
  useEffect(() => {
    const storedWeekPlan = localStorage.getItem("weekPlan");
    if (storedWeekPlan) {
      setWeekPlan(JSON.parse(storedWeekPlan));
    }
  }, []);

  const filteredEmployees = selectedDay
    ? employees.filter((emp) =>
        emp.weekdays?.some((w) => w.day === selectedDay)
      )
    : [];

  const sumHours = filteredEmployees.reduce((acc, emp) => {
    const day = emp.weekdays?.find((w) => w.day === selectedDay);
    return acc + (day?.hours ?? 0);
  }, 0);

  const totalPics = filteredEmployees.reduce((acc, emp) => {
    const day = emp.weekdays?.find((w) => w.day === selectedDay);
    return acc + (day?.hours ?? 0) * emp.average;
  }, 0);

  const expectedLabels = selectedDay ? weekPlan[selectedDay] ?? 0 : 0;

  // Neue Berechnungen
  const diffPics = expectedLabels - totalPics;
  const missingHours = diffPics > 0 ? diffPics / avgPicsPerHour : 0;
  const neededEmployees = missingHours > 0 ? Math.ceil(missingHours / 8) : 0;

  return (
    <main className="w-full max-w-lg mx-auto p-4 flex flex-col gap-6 pt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Dashboard</h1>

      <label htmlFor="weekday" className="font-semibold mb-2 block">
        Wähle einen Wochentag
      </label>
      <select
        id="weekday"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        <option value="">-- Tag auswählen --</option>
        {[
          "Montag",
          "Dienstag",
          "Mittwoch",
          "Donnerstag",
          "Freitag",
          "Samstag",
          "Sonntag",
        ].map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <label htmlFor="avgPicsPerHour" className="font-semibold mt-4 mb-2 block">
        Mindestschnitt an Pics pro Stunde festlegen
      </label>
      <input
        id="avgPicsPerHour"
        type="number"
        min={1}
        step={1}
        value={avgPicsPerHour}
        onChange={(e) => setAvgPicsPerHour(Number(e.target.value))}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
        <p className="font-semibold">
          Erwartete Etiketten für {selectedDay || "—"}:
        </p>
        <p className="text-xl">{expectedLabels}</p>
      </div>

      {!selectedDay && (
        <p className="text-center text-red-600 font-semibold">
          Bitte wähle einen Wochentag aus.
        </p>
      )}

      {selectedDay && filteredEmployees.length === 0 && (
        <p className="text-center text-gray-500">
          Keine Mitarbeiter an diesem Tag geplant.
        </p>
      )}

      {filteredEmployees.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">
            Geplante Mitarbeiter ({filteredEmployees.length})
          </h2>

          <ul className="space-y-4">
            {filteredEmployees.map((emp) => {
              const dayData = emp.weekdays?.find((w) => w.day === selectedDay);
              if (!dayData) return null;

              const personalPics = dayData.hours * emp.average;

              return (
                <li
                  key={emp.id}
                  className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
                >
                  <h3 className="font-bold text-lg mb-1">
                    {emp.lastname}, {emp.name}
                  </h3>
                  <p>
                    <strong>Arbeitszeit:</strong> {dayData.start} -{" "}
                    {dayData.end} ({dayData.hours}h)
                  </p>
                  <p>
                    <strong>Pics/h:</strong> {emp.average}
                  </p>
                  <p>
                    <strong>Geplante Pics:</strong> {Math.floor(personalPics)}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-center space-y-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-inner">
            <p className="font-semibold text-lg">
              Stunden gesamt: <span className="font-bold">{sumHours}</span>
            </p>
            <p className="font-semibold text-lg">
              Zu schaffende Pics:{" "}
              <span className="font-bold">{Math.floor(totalPics)}</span>
            </p>
            {expectedLabels > 0 && (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Erwartete Etiketten aus Wochenplanung: {expectedLabels}
                </p>
                {diffPics > 0 ? (
                  <>
                    <p className="text-red-600 font-semibold">
                      Noch {missingHours.toFixed(2)} Arbeitsstunden nötig.
                    </p>
                    <p className="text-red-600 font-semibold">
                      Dafür werden ca. {neededEmployees} weitere Mitarbeiter
                      benötigt bei einem Mindestdurchschnitt von{" "}
                      {avgPicsPerHour} Pics/h.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-green-600 font-semibold">
                      Du schaffst die Etikettenmenge!
                    </p>
                    <p className="text-green-600">
                      Du kannst bis zu{" "}
                      {Math.floor(sumHours - expectedLabels / avgPicsPerHour)}{" "}
                      Arbeitsstunden abgeben, ohne die Menge zu unterschreiten.
                    </p>
                    <p className="text-green-600">
                      Zum Beispiel ein Mitarbeiter mit mindestens{" "}
                      {Math.ceil(
                        expectedLabels /
                          (sumHours -
                            Math.floor(
                              sumHours - expectedLabels / avgPicsPerHour
                            ))
                      )}{" "}
                      Pics/h könnte diese übernehmen.
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default Dashboard;
