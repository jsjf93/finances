export function Menu() {
  return (
    <div className="flex flex-col gap-10 m-4">
      <span className="m-auto font-bold">Finance App</span>
      <nav className="flex flex-col">
        <ul>
          <li>
            <a
              className="w-full p-3 rounded-xl hover:bg-slate-100 block font-bold"
              href="/"
            >
              Dashboard
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
