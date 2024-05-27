type Props = {
  title?: string;
  children: React.ReactNode;
};

export function Card({ title, children }: Props) {
  return (
    <div className="bg-white border border-green-100 rounded-lg p-4 w-full">
      {title && <h2 className="text-sm text-slate-400 mb-2">{title}</h2>}
      {children}
    </div>
  );
}
