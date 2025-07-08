import type { Employee } from "@/components/AddEmployee";
import { useEffect, useState } from "react";

function Dashboard() {
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [sum, setSum] = useState(0);
  const [picsCount, setPicsCount] = useState(0);
  const [awaitedPics, setAwaitedPics] = useState("");
  const [employees, setEmployee] = useState<Employee[] | null>();
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      const parsedEmployees: Employee[] = JSON.parse(storedEmployees);
      setEmployee(parsedEmployees);
    }
  }, []);

  const handleWeekdayChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    e.preventDefault();

    const weekday = e.target.value;

    const filter = employees?.filter((emp) => {
      if (emp.weekdays.includes(weekday)) {
        return { emp };
      }
    });
    if (filter) {
      setFilteredEmployees(filter);
      const summary = filter.reduce((sum, i) => sum + i.daylyWorkTime, 0);
      setSum(summary);
      const picsSummary = filter.reduce((sum, i) => sum + i.average, 0);
      console.log("pics summary: " + picsSummary);

      const sumOfAll = summary * picsSummary;
      console.log("pics all: " + sumOfAll);
      setPicsCount(sumOfAll);
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-start gap-3.5">
      {" "}
      <section className="flex flex-col items-center justify-start gap-4   w-80  py-6">
        <div className="flex flex-col gap-4 items-center justify-start">
          {" "}
          <label className=" font-bold" htmlFor="weekday">
            Auswahl Wochentag
          </label>
          <select
            className="outline  py-1 px-4 rounded-2xl w-full text-center shadow-sm shadow-stone-500"
            name="weekday"
            id="weekday"
            defaultValue={"day"}
            onChange={handleWeekdayChange}
          >
            <option value={"day"}>Tag auswählen...</option>
            <option value="Montag">Montag</option>
            <option value="Dienstag">Dienstag</option>
            <option value="Mittwoch">Mittwoch</option>
            <option value="Donnerstag">Donnerstag</option>
            <option value="Freitag">Freitag</option>
            <option value="Samstag">Samstag</option>
            <option value="Sonntag">Sonntag</option>
          </select>
          <article>
            <div>
              <input
                className="py-2 px-6  outline rounded-4xl placeholder:font-extralight"
                type="number"
                placeholder="Erwartete Etiketten..."
                onChange={(e) => setAwaitedPics(e.target.value)}
                value={awaitedPics}
              />
            </div>
            <p className="font-bold text-2xl"></p>
          </article>
        </div>
        <h2 className="font-bold">
          Geplante Mitarbeiter: {filteredEmployees.length}
        </h2>
        <ul className="flex flex-col items-center justify-start gap-4 rounded-2xl   w-80 border inset-1  py-6">
          {filteredEmployees?.map((emp: Employee) => (
            <li
              onClick={() => "handleDelete(single.lastname)"}
              className="w-full text-center"
              key={emp.id}
            >
              {emp.lastname + ", " + emp.name}
            </li>
          ))}
        </ul>
        <div className="flex items-center flex-col  justify-center gap-2 w-full">
          <h3 className="font-bold">Stunden gesamt: {sum} </h3>
          <h3 className="font-semibold">{` Zu schaffende pics:`}</h3>
          <p className="font-bold">{Math.floor(picsCount)}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold">Zu schaffende pics:</h3>
          <p className="font-bold">{picsCount}</p>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
