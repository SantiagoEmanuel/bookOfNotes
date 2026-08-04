import Editor from "@monaco-editor/react";
import "katex/dist/katex.min.css";
import type { editor, languages } from "monaco-editor";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// Importamos nuestra data cruda
import { useLoaderData, useNavigate } from "react-router";
import { getMaterias, upsertNote } from "../db/queries";
import { createSlug } from "../utils/createSlug";
import { MATH_SNIPPETS } from "../utils/mathSnippets";

export default function MathEditorWrapper() {
  const initialNote = useLoaderData() as any;

  // Si estamos editando, usamos el slug como llave única.
  // Si estamos creando una nueva, usamos "new-note".
  const uniqueKey = initialNote ? initialNote.slug : "new-note";

  // Al pasarle el uniqueKey, obligamos a React a matar y recrear
  // el editor interno cada vez que cambiamos de materia.
  return <MathEditor key={uniqueKey} initialNote={initialNote} />;
}

export function MathEditor({ initialNote }: { initialNote: any }) {
  const navigate = useNavigate();

  const [content, setContent] = useState(
    initialNote?.content || "# Nueva nota\n",
  );
  const [title, setTitle] = useState(initialNote?.title || "Sin título");
  const [subject, setSubject] = useState(
    initialNote?.subject || "matematica_1",
  );
  const [materias, setMaterias] = useState<{ id: number; subject: string }[]>();
  const deferredContent = useDeferredValue(content);

  const metaRef = useRef({ title, subject, slug: initialNote?.slug });

  useEffect(() => {
    getMaterias().then((data) => setMaterias(data));
  }, []);

  useEffect(() => {
    metaRef.current = { title, subject, slug: initialNote?.slug };
  }, [title, subject, initialNote]);

  const handleSave = async (currentContent: string) => {
    const currentMeta = metaRef.current;

    // Validación básica
    if (!currentMeta.title.trim()) {
      alert("Por favor, ponle un título a tu nota.");
      return;
    }

    // Si es nota nueva, creamos el slug. Si ya existe, usamos el que tiene.
    const slugToSave = currentMeta.slug || createSlug(currentMeta.title);

    const noteData = {
      slug: slugToSave,
      title: currentMeta.title,
      content: currentContent,
      subject: currentMeta.subject,
    };

    try {
      // Llamamos a Drizzle para guardar en Turso
      await upsertNote(noteData);

      // LA REDIRECCIÓN
      // Si la nota era nueva, cambiamos la URL silenciosamente (replace: true)
      // para no ensuciar el historial del navegador.
      if (!currentMeta.slug) {
        navigate(`/nota/${slugToSave}`, { replace: true });
      } else {
        // Un feedback visual simple para cuando actualizamos una nota existente
        console.log("Nota actualizada correctamente");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar en la base de datos.");
    }
  };

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor"),
  ) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave(editor.getValue());
    });
    editor.addCommand(monaco.KeyCode.Escape, () => {
      navigate(`/materia/${metaRef.current.subject}`, { replace: true });
    });

    // Registramos nuestro autocompletado
    monaco.languages.registerCompletionItemProvider("markdown", {
      provideCompletionItems: (model, position) => {
        // 1. Averiguamos qué palabra está tipeando el usuario justo ahora
        // Si escribió "frac", word.word será "frac"
        const word = model.getWordUntilPosition(position);

        // 2. Calculamos el RANGO exacto que vamos a reemplazar en esta línea
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        // 3. Mapeamos nuestra DATA CRUDA al formato estricto que exige Monaco
        const suggestions: languages.CompletionItem[] = MATH_SNIPPETS.map(
          (snippet) => ({
            label: snippet.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: snippet.insertText,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: snippet.documentation,
            range: range, // Inyectamos el rango dinámico aquí
          }),
        );

        return { suggestions };
      },
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-50 text-neutral-900">
      {/* LA NUEVA BARRA DE METADATOS */}
      <div className="flex gap-4 p-4 border-b border-neutral-700 bg-neutral-800 shrink-0 text-white">
        <input
          type="text"
          placeholder="Título de la nota..."
          className="flex-1 bg-neutral-900 border border-neutral-600 rounded px-4 py-2 focus:outline-none focus:border-cyan-400 font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          name="material"
          id="material"
          className="bg-neutral-900 border border-neutral-600 rounded px-4 py-2 focus:outline-none focus:border-cyan-400"
          value={subject}
          onChange={(e) => {
            const text = e.target.value.replaceAll(" ", "_");
            setSubject(text);
          }}
          autoComplete="off"
          list="material_list"
        />

        <datalist id="material_list">
          {materias?.map(({ id, subject }) => (
            <option value={subject} key={id} />
          ))}
        </datalist>

        <button
          onClick={() => handleSave(content)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded transition-colors"
        >
          Guardar
        </button>
      </div>

      {/* EL ÁREA DE TRABAJO (Dividida en 2 columnas) */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-neutral-700 flex flex-col relative">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            theme="vs-dark"
            value={content}
            onChange={(value) => setContent(value || "")}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              fontSize: 14,
            }}
          />
        </div>

        <div
          className={`w-1/2 p-8 overflow-y-auto bg-neutral-800 text-white transition-opacity ${content !== deferredContent ? "opacity-50" : "opacity-100"}`}
        >
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {deferredContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
