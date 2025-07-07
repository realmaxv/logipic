import type { Employee } from "@/components/AddEmployee";
import { ScrollArea } from "@/components/ui/scroll-area";
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

import { BadgeMinus } from "lucide-react";
import { useEffect, useState } from "react";

function Employees() {
  const [employee, setEmployee] = useState<Employee[] | null>();
  const [markedEmployees, setMarkedEmployees] = useState<string[]>([]);
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      const parsedEmployees: Employee[] = JSON.parse(storedEmployees);
      setEmployee(parsedEmployees);
    }
  }, []);

  const handleMarkClick = (
    _e: React.MouseEvent<HTMLTableRowElement>,
    employee: { lastname: string }
  ) => {
    setMarkedEmployees((prev) =>
      prev.includes(employee.lastname)
        ? prev.filter((name) => name !== employee.lastname)
        : [...prev, employee.lastname]
    );
  };
  return (
    <section className="pt-2 pb-2 overflow-x-hidden">
      <div className="flex justify-end px-4 mb-2"></div>
      <Table className="flex flex-col items-center gap-2">
        <TableCaption>Liste aller Mitarbeiter</TableCaption>
        <TableHeader className="w-80">
          <TableRow className="flex items-center justify-between w-full">
            <TableHead className="w-[100px]">Nachname</TableHead>
            <TableHead>Vorname</TableHead>

            <TableHead className="text-right">Pics/h</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-80">
          <ScrollArea className="h-100 w-fullrounded-md border px-2 overflow-scroll ">
            {employee?.map((employee) => (
              <TableRow
                className=" flex items-center justify-between"
                onClick={(e) => handleMarkClick(e, employee)}
                key={crypto.randomUUID()}
                id={employee.lastname}
              >
                <TableCell className="font-medium">
                  {employee.lastname}
                </TableCell>
                <TableCell>{employee.name}</TableCell>

                <TableCell className="text-right">{employee.average}</TableCell>
                <TableCell className="">
                  {" "}
                  {markedEmployees.includes(employee.lastname) && (
                    <button>
                      <BadgeMinus className="fill-red-500" size={20} />
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </ScrollArea>
        </TableBody>
        <TableFooter className="flex items-center gap-10">
          <TableRow>
            <TableCell colSpan={2}>Total:</TableCell>
            <TableCell className="text-right">{employee?.length}</TableCell>

            <TableCell colSpan={2}>Markiert:</TableCell>
            <TableCell className="text-right">
              {markedEmployees.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex items-center justify-center p-8">
        {" "}
        {markedEmployees.length > 0 ? (
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Markierte entfernen
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Employees;
