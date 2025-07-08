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

  return (
    <section className="pt-2 pb-2 overflow-x-hidden flex flex-col items-center">
      <div className="flex items-start justify-center ">
        <Table className="overflow-y-scroll bg-accent rounded-2xl">
          <TableCaption>Liste aller Mitarbeiter</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-black">Name</TableHead>
              <TableHead className="font-black">Work h/day</TableHead>
              <TableHead className="font-black">Pics/h</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee
              ?.sort((a, b) => a.lastname.localeCompare(b.lastname))
              .map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{`${emp.lastname}, ${emp.name}`}</TableCell>
                  <TableCell>{emp.daylyWorkTime}</TableCell>
                  <TableCell className="text-right">{emp.average}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{employee?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}

export default Employees;
