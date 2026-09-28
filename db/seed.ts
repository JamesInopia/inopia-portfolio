import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function seed() {
  const { db } = await import("./index");
  const { projects } = await import("./schema");
  await db
    .insert(projects)
    .values([
      { slug: "kawaii-count", title: "Kawaii Count", year: 2025, image: "/KawaiiCount.png",
        description: "Kawaii Count is a Restaurant Inventory System application that is designed for cafes or small coffee shops. The app combines functionality such as an analytics page, an inventory page, a Menu system, and a login and sign-up page for employees and administrators to access the application.",
        repo: "https://github.com/5mhmyhead/Kawaii-Count"},
    { slug: "spellaria", title: "Spellaria", year: 2026, image: "/Spellaria.png",
        description: "Spellaria is a turn-based strategy puzzle game in which players must spell words from a given set of letters in order to defeat their enemies in a limited amount of time. This game is highly inspired by the game Bookworm Adventures. The game challenges players to think critically by combining word‑building with tactical decision‑making.",
        repo: "https://github.com/JamesInopia/JavaBookwormesque"},
    { slug: "yaw8", title: "YAW8", year: 2026, image: "/YAW8.jpg",
        description: "This project is a web-based platform that allows users to play browser-based mini games created by students of the school. The platform serves as a centralized hub where players can easily access games while student developers can showcase their projects to a larger audience.",
        repo: "https://github.com/JamesInopia/Yaw8"},
    { slug: "grace-p", title: "Grace.", year: 2026, image: "/Grace.png",
        description: "Grace. is a productivity app that can block applications or websites, or set timers for applications to help users focus on important tasks and practice better time management.",
        repo: "https://github.com/JamesInopia/grace."},
    ])
    .onConflictDoNothing();
  console.log("Seeded projects");
  process.exit(0);
}

seed();