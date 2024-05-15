import CarForm from "@/forms/cars/CarForm";
import { CocktailApp } from "@/forms/cocktails/CocktailApp";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CocktailApp />
      <CarForm />
    </main>
  );
}
