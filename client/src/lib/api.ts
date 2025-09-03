const API = import.meta.env.VITE_API_URL as string;

export type Workday = {
  day: string;
  start: string;
  end: string;
  hours: number;
};
export type Employee = {
  id: string;
  name: string;
  lastname: string;
  average: number; // pics/h
  weekdays: Workday[];
};
export type WeekPlan = Record<string, number>;

// ------- Employees -------
export async function getEmployees(): Promise<Employee[]> {
  const r = await fetch(`${API}/employees`, { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to load employees");
  return r.json();
}
export async function getEmployee(id: string): Promise<Employee> {
  const r = await fetch(`${API}/employees/${id}`, { cache: "no-store" });
  if (!r.ok) throw new Error("Employee not found");
  return r.json();
}
export async function createEmployee(e: Employee): Promise<Employee> {
  const r = await fetch(`${API}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e),
  });
  if (!r.ok) throw new Error("Create failed");
  return r.json();
}
export async function updateEmployee(
  id: string,
  data: Partial<Employee>
): Promise<Employee> {
  const r = await fetch(`${API}/employees/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("Update failed");
  return r.json();
}
export async function deleteEmployee(id: string): Promise<void> {
  const r = await fetch(`${API}/employees/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Delete failed");
}

// ------- Weekplan -------
export async function getWeekPlan(): Promise<WeekPlan> {
  const r = await fetch(`${API}/weekplan`, { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to load weekplan");
  return r.json();
}
export async function saveWeekPlan(plan: WeekPlan): Promise<void> {
  const r = await fetch(`${API}/weekplan`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });
  if (!r.ok) throw new Error("Save failed");
}
