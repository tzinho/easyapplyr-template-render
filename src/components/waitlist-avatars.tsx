export function WaitlistAvatars() {
  const avatars = [
    { initials: "JD", color: "bg-purple-500" },
    { initials: "AS", color: "bg-blue-500" },
    { initials: "MK", color: "bg-indigo-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-1">
      <div className="flex -space-x-3">
        {avatars.map((avatar, i) => (
          <div
            key={avatar.initials}
            className={`h-8 w-8 rounded-full ${avatar.color} flex items-center justify-center text-xs font-medium text-white ring-2 ring-black`}
          >
            {avatar.initials}
          </div>
        ))}
      </div>
      <span className="ml-4 whitespace-nowrap text-sm text-gray-200">
        100+ pessoas entraram na lista de espera
      </span>
    </div>
  );
}
