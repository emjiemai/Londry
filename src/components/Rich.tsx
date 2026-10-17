/** Renders `**bold**` markers from the dictionaries as <strong>. Plain React nodes, never raw HTML. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part))}
    </>
  )
}
