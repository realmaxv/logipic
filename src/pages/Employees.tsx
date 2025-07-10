import type { Employee } from "@/components/AddEmployee";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Employees() {
  const [employee, setEmployee] = useState<Employee[] | null>();
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

  return (
    <section className="pt-6 pb-2 overflow-x-hidden flex flex-col items-center ">
      <div className="md:block flex items-start justify-center w-full">
        <Table className="overflow-y-scroll bg-accent rounded-2xl w-full max-w-5xl dark:bg-gray-900">
          <TableCaption className="dark:text-gray-300">
            Liste aller Mitarbeiter
          </TableCaption>
          <TableHeader>
            <TableRow className="dark:border-gray-700">
              <TableHead className="w-[100px] font-black dark:text-gray-100">
                Name
              </TableHead>
              <TableHead className="font-black dark:text-gray-100">
                Pics/h
              </TableHead>
              <TableHead className="font-black dark:text-gray-100">
                Arbeitstage
              </TableHead>
              <TableHead className="font-black dark:text-gray-100">
                Gesamtstunden
              </TableHead>
              <TableHead className="font-black dark:text-gray-100">
                Aktion
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee
              ?.sort((a, b) => a.lastname.localeCompare(b.lastname))
              .map((emp) => {
                const totalHours =
                  emp.weekdays?.reduce((sum, day) => sum + day.hours, 0) ?? 0;
                return (
                  <TableRow
                    key={emp.id}
                    className="dark:border-gray-700 dark:text-gray-300"
                  >
                    <TableCell>{`${emp.lastname}, ${emp.name}`}</TableCell>

                    <TableCell>{emp.average}</TableCell>
                    <TableCell>
                      {emp.weekdays && emp.weekdays.length > 0
                        ? emp.weekdays.map((day, index) => (
                            <div key={index}>
                              {day.day}: {day.start} - {day.end} ({day.hours}h)
                            </div>
                          ))
                        : ""}
                    </TableCell>
                    <TableCell>{totalHours}</TableCell>
                    <TableCell>
                      <button
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 dark:hover:bg-red-800"
                        onClick={() =>
                          handleDeleteEmployee(emp.id, emp.name, emp.lastname)
                        }
                      >
                        Löschen
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-bold dark:text-gray-100">
                Total
              </TableCell>
              <TableCell className="text-right dark:text-gray-300">
                {employee?.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="block md:hidden w-full max-w-md mx-auto space-y-4">
        {employee
          ?.sort((a, b) => a.lastname.localeCompare(b.lastname))
          .map((emp) => {
            const totalHours =
              emp.weekdays?.reduce((sum, day) => sum + day.hours, 0) ?? 0;
            return (
              <div
                key={emp.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-800"
              >
                <h3 className="text-lg font-bold dark:text-gray-100">
                  {emp.lastname}, {emp.name}
                </h3>
                <p className="dark:text-gray-300">
                  <strong>Pics/h:</strong> {emp.average}
                </p>
                {emp.weekdays && emp.weekdays.length > 0 && (
                  <>
                    <p className="mt-2 font-semibold dark:text-gray-200">
                      Arbeitstage:
                    </p>
                    <ul className="list-disc list-inside dark:text-gray-300">
                      {emp.weekdays.map((day, i) => (
                        <li key={i}>
                          {day.day}: {day.start} - {day.end} ({day.hours}h)
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 dark:text-gray-300">
                      <strong>Gesamtstunden:</strong> {totalHours}
                    </p>
                  </>
                )}
                <button
                  className="mt-4 w-full py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 dark:hover:bg-red-800"
                  onClick={() =>
                    handleDeleteEmployee(emp.id, emp.name, emp.lastname)
                  }
                >
                  Löschen
                </button>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Employees;
