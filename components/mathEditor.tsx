"use client";

import { saveNoteAction } from "@/app/actions/notes";
import { createSlug } from "@/utils/createSlug";
import { MATH_SNIPPETS } from "@/utils/mathSnippets";
import { Editor } from "@monaco-editor/react";
import { editor, languages } from "monaco-editor";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

type InitialNote = {
  content: string;
  subject: string;
  slug: string;
  title: string;
  materias: { subject: string }[];
};

export function MathEditor({
  initialNote: initialNoteProp,
}: {
  initialNote?: InitialNote;
  slug: string;
}) {
  const router = useRouter();
  const [initialNote, setInitialNote] = useState<InitialNote>(() => ({
    content: initialNoteProp?.content ?? "",
    subject: initialNoteProp?.subject ?? "",
    slug: initialNoteProp?.slug ?? "",
    title: initialNoteProp?.title ?? "",
    materias: initialNoteProp?.materias ?? [],
  }));

  const deferredContent = useDeferredValue(initialNote.content);

  const metaRef = useRef({
    title: initialNote.title,
    subject: initialNote.subject,
    slug: initialNote.slug,
  });

  useEffect(() => {
    metaRef.current = {
      title: initialNote.title,
      subject: initialNote.subject,
      slug: initialNote.slug,
    };
  }, [initialNote]);

  const handleSave = async (currentContent: string) => {
    const currentMeta = metaRef.current;

    if (!currentMeta.title.trim()) {
      alert("Por favor, ponle un título a tu nota.");
      return;
    }

    const slugToSave = currentMeta.slug || createSlug(currentMeta.title);

    try {
      const result = await saveNoteAction({
        title: currentMeta.title,
        subject: currentMeta.subject,
        content: currentContent,
        slug: currentMeta.slug || undefined,
      });

      if (!currentMeta.slug) {
        router.replace(`/notes/${result.slug}`);
      }

      metaRef.current = {
        ...metaRef.current,
        slug: slugToSave,
      };
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
      editor.focus();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE, () => {
      handleSave(editor.getValue());
      router.replace(`/materia/${metaRef.current.subject}`);
    });

    monaco.languages.registerCompletionItemProvider("markdown", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions: languages.CompletionItem[] = MATH_SNIPPETS.map(
          (snippet) => ({
            label: snippet.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: snippet.insertText,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: snippet.documentation,
            range,
          }),
        );

        return { suggestions };
      },
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex gap-4 p-4 shrink-0">
        <input
          type="text"
          placeholder="Título de la nota..."
          className="flex-1 rounded px-4 py-2 focus:outline-none focus:border-primary-400 font-bold border border-border bg-surface text-text-primary"
          value={initialNote.title}
          onChange={(e) =>
            setInitialNote((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />

        <input
          type="text"
          name="material"
          id="material"
          className="border border-border rounded px-4 py-2 bg-surface text-text-primary focus:outline-none focus:border-primary-400"
          value={initialNote.subject}
          onChange={(e) => {
            const text = e.target.value.replaceAll(" ", "_");
            setInitialNote((prev) => ({ ...prev, subject: text }));
          }}
          autoComplete="off"
          list="material_list"
        />

        <datalist id="material_list">
          {initialNote.materias?.map(({ subject }) => (
            <option value={subject} key={subject} />
          ))}
        </datalist>

        <button
          onClick={() => handleSave(initialNote.content ?? "")}
          className="bg-primary-600 hover:bg-primary-700 text-surface font-bold px-6 py-2 rounded transition-colors"
        >
          Guardar
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-2xl">
        <div className="w-1/2 border-r border-code-border bg-editor-code text-code-text flex flex-col relative">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={initialNote.content}
            theme="vs-dark"
            onChange={(value) =>
              setInitialNote((prev) => ({ ...prev, content: value ?? "" }))
            }
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              fontSize: 14,
              fontLigatures: true,
              fontFamily: "Cascadia Code",
              tabSize: 2,
            }}
          />
        </div>

        <div
          className={`w-1/2 p-8 overflow-y-auto bg-surface text-text-primary transition-opacity ${initialNote.content !== deferredContent ? "opacity-50" : "opacity-100"}`}
        >
          <div className="prose max-w-none prose-headings:text-text-primary prose-p:text-text-primary prose-strong:text-text-primary prose-code:text-code-text prose-a:text-primary-600 flex flex-col gap-4">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
            >
              {deferredContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
