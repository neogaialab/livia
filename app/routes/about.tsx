import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/services/user";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
  ];
};

export async function loader() {
  const users = await getUsers()
  return json(users)
}

export default function About() {
  const users = useLoaderData<typeof loader>()

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">About</h1>

      <p>User amount: {users.length}</p>
    </div>
  );
}
