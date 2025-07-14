import type { Employee } from "@/components/AddEmployee";
import { Input } from "@/components/ui/input";
import { Search, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Employees() {
  const WEEKDAY_ORDER = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];
  const [employee, setEmployee] = useState<Employee[] | null>();
  const [search, setSearch] = useState<Employee[] | null>();

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      const parsedEmployees: Employee[] = JSON.parse(storedEmployees);
      setEmployee(parsedEmployees);
    }
  }, []);

  const handleDeleteEmployee = (id: string, name: string, lastname: string) => {
    const confirmDelete = window.confirm(
      `Sicher Mitarbeiter "${name} ${lastname}" löschen?`
    );
    if (!confirmDelete) return;
    const updated = employee?.filter((emp) => emp.id !== id) || [];
    setEmployee(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  const handleFilterEmployee = (value: string) => {
    const filtered = employee?.filter((emp) => {
      const fullName = `${emp.name} ${emp.lastname}`.toLowerCase();
      return fullName.includes(value.toLowerCase());
    });
    setSearch(filtered ?? []);
  };
  const displayedEmployees = search ?? employee;

  return (
    <section className="pt-6 pb-2 overflow-x-hidden flex flex-col items-center p-4 ">
      <div className="flex items-center justify-center  gap-4 p-4 overflow-hidden">
        <Search size={35} />
        <Input
          onChange={(e) => handleFilterEmployee(e.target.value)}
          placeholder="Mitarbeiter suchen..."
        />
      </div>
      <ul className="block w-full max-w-md mx-auto space-y-4 overflow-hidden">
        {displayedEmployees
          ?.sort((a, b) => a.lastname.localeCompare(b.lastname))
          .map((emp) => {
            const totalHours =
              emp.weekdays?.reduce((sum, day) => sum + day.hours, 0) ?? 0;
            return (
              <li
                key={emp.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    {" "}
                    <h3 className="text-lg font-bold dark:text-gray-100">
                      {emp.lastname}, {emp.name}
                    </h3>
                    <p className="dark:text-gray-300">
                      <strong>Pics/h:</strong> {emp.average}
                    </p>
                  </div>
                  <div>
                    <Link
                      className=" border p-2  rounded-2xl flex  gap-1 text-sm shadow items-center "
                      to={`/employees/${emp.id}`}
                    >
                      <UserRoundPen className="" />
                      <p className="">Edit</p>
                    </Link>
                  </div>
                </div>

                {emp.weekdays && emp.weekdays.length > 0 && (
                  <Link to={`/employees/${emp.id}`}>
                    <p className="mt-2 font-semibold dark:text-gray-200">
                      Arbeitstage:
                    </p>
                    <ul className="list-disc list-inside dark:text-gray-300">
                      {emp.weekdays
                        .sort(
                          (a, b) =>
                            WEEKDAY_ORDER.indexOf(a.day) -
                            WEEKDAY_ORDER.indexOf(b.day)
                        )
                        .map((day, i) => (
                          <li key={i}>
                            {day.day}: {day.start} - {day.end} ({day.hours}h)
                          </li>
                        ))}
                    </ul>
                    <p className="mt-2 dark:text-gray-300">
                      <strong>Gesamtstunden:</strong> {totalHours}
                    </p>
                  </Link>
                )}
                <div className="flex items-center justify-center gap-4">
                  <button
                    className="mt-4 w-full py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 dark:hover:bg-red-800"
                    onClick={() =>
                      handleDeleteEmployee(emp.id, emp.name, emp.lastname)
                    }
                  >
                    Löschen
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default Employees;
