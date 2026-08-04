export default function TextareaMarkdown({
  content,
  onChange,
}: {
  content: string;
  onChange: (e: string) => void;
}) {
  return (
    <textarea
      name="markdown"
      id="markdown"
      className="w-full h-[90%] p-6 bg-neutral-900 text-neutral-100 font-mono text-sm resize-none focus:outline-none"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Escribe tu Markdown y LaTeX aquí..."
    />
  );
}
