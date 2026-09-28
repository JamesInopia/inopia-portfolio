import Image from "next/image";
import { notFound } from "next/navigation";
import { readProject } from "@/app/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await readProject(slug);
  if (!project) notFound();

  return (
    <main className="px-16 py-8">
      <h1 className="text-4xl font-bold">{project.title}</h1>
      <p className="mt-2 text-neutral-500">{project.year}</p>
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={960}
          height={540}
          className="mt-6 h-80 w-auto rounded border object-contain"
        />
      )}
      <p className="mt-6 text-xl">{project.description}</p>
    </main>
  );
}