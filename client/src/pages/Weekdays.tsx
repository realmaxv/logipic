import { useEffect, useState } from "react";
import { getWeekPlan, saveWeekPlan, type WeekPlan } from "@/lib/api";

const defaultPlan = {
  Montag: 0,
  Dienstag: 0,
  Mittwoch: 0,
  Donnerstag: 0,
  Freitag: 0,
  Samstag: 0,
  Sonntag: 0,
};

function Weekdays() {
  const [plan, setPlan] = useState<WeekPlan>(defaultPlan);

  useEffect(() => {
    getWeekPlan().then((wp) => setPlan({ ...defaultPlan, ...wp }));
  }, []);

  const handleChange = (day: string, value: number) => {
    const updated = { ...plan, [day]: value };
    setPlan(updated);
  };

  const handleSave = () => {
    saveWeekPlan(plan).then(() => {
      alert("Wochenplanung gespeichert.");
    });
  };

  const handleReset = () => {
    setPlan(defaultPlan);
    saveWeekPlan(defaultPlan);
  };

  return (
    <main className="w-full max-w-md mx-auto p-4 space-y-4 mt-10">
      <h1 className="text-xl font-bold text-center">{`Wöchtenliche Planung (Pics/Tag)`}</h1>
      {Object.entries(plan).map(([day, value]) => (
        <div key={day} className="flex justify-between items-center">
          <label className="font-medium">{day}</label>
          <input
            type="number"
            value={value || ""}
            onChange={(e) => handleChange(day, Number(e.target.value))}
            className="w-32 px-2 py-1 rounded border outline-none"
          />{" "}
        </div>
      ))}
      <div className="flex justify-between gap-4 pt-4">
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Speichern
        </button>
        <button
          onClick={handleReset}
          className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Zurücksetzen
        </button>
      </div>
    </main>
  );
}

export default Weekdays;
