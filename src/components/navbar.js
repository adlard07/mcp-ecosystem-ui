'use client';

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-6 py-3 flex items-center justify-between gap-6 shadow-md">
      {/* Left: heading */}
      <h1 className="text-lg md:text-xl font-semibold tracking-tight whitespace-nowrap">KnowAll</h1>

      {/* Center: search bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            {/* magnifier icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0z"
              />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search chats, prompts, people…"
            className="w-full bg-white text-black placeholder-gray-500 rounded-full pl-9 pr-4 py-2 text-sm border border-white focus:outline-none focus:ring-2 focus:ring-[#F24405]"
          />
        </div>
      </div>

      {/* Right: profile bar */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-sm font-medium">Jane Doe</span>
          <span className="text-[11px] text-gray-400">jane@example.com</span>
        </div>
        <button
          type="button"
          className="h-9 w-9 rounded-full bg-[#F24405] text-white font-semibold flex items-center justify-center ring-2 ring-white/20 hover:ring-[#F24405] transition"
          aria-label="Open profile menu"
        >
          JD
        </button>
      </div>
    </nav>
  );
}