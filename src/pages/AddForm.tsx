import AddEmployee from "@/components/AddEmployee";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router";

function AddForm() {
  return (
    <div className="mt-5">
      <AddEmployee />
      <Link to={"/weekdays"}>
        <div className="p-2 shadow-md border shadow-black/35 m-4 rounded-md">
          <div className="flex items-center justify-center gap-2">
            {" "}
            <CalendarDays size={45} className="border p-1 rounded shadow " />
            <p>Wochentage bearbeiten</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AddForm;
