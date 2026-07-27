export function RichCopy({ body }: { body: string }) {
  return (
    <div className="rich-copy">
      {body.split(/\n\n+/).map((block, index) => {
        if (block.startsWith("## ")) return <h2 key={index}>{block.slice(3)}</h2>;
        if (block.startsWith("# ")) return <h2 key={index}>{block.slice(2)}</h2>;
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}
