import { json, useLoaderData, useParams } from "@remix-run/react";

export async function loader() {
    return json({ message: "Hello (serialized)" })
}

export default function User() {
    const { id } = useParams();
    const data = useLoaderData<typeof loader>()

    return (
        <div className="font-sans p-4">
            <h1 className="text-3xl">User: {id}</h1>

            <p>{data.message}</p>
        </div>
    );
}
