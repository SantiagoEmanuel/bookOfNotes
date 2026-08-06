import { MathEditor } from "@/components/mathEditor";
import { getUserData } from "@/db/queries";
import { getCurrentUserId } from "@/utils/clerk";
import "katex/dist/katex.min.css";

export const dynamic = "force-dynamic";

export default async function MathEditorWrapper({
  params,
}: {
  params: Promise<{ note: string }>;
}) {
  const { note } = await params;
  const userId = await getCurrentUserId();

  if (!userId) {
    return <div className="p-8">Inicia sesión para editar tus notas.</div>;
  }

  const data = await getUserData(note, userId);

  return (
    <MathEditor
      key={note}
      slug={note}
      initialNote={{
        content: data.note.content ?? "",
        subject: data.note.subject ?? "",
        slug: data.note.slug ?? "",
        title: data.note.title ?? "",
        materias: data.subject ?? [],
      }}
    />
  );
}
