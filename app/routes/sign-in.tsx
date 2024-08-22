import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Entrar" },
  ];
};

export default function SignIn() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Entrar</h1>
    </div>
  );
}
