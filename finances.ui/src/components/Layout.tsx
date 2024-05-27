type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="w-full h-full min-h-screen bg-green-50">
      <div className="p-4 m-auto max-w-4xl">{children}</div>
    </div>
  );
}
