type UserStats = {
  loginCount: number;
  coursesStarted: number;
  coursesCompleted: number;
  streak: number;
  studiedAtNight: boolean;
};

const userStats: UserStats = {
  loginCount: 3,
  coursesStarted: 2,
  coursesCompleted: 1,
  streak: 9,
  studiedAtNight: true,
};

const BADGES = [
  {
    id: "first-login",
    name: "First Launch",
    description: "Logged in for the first time",
    condition: (stats: UserStats) => stats.loginCount >= 1,
  },
  {
    id: "course-starter",
    name: "Course Starter",
    description: "Started your first course",
    condition: (stats: UserStats) => stats.coursesStarted >= 1,
  },
  {
    id: "consistent-learner",
    name: " Consistency King",
    description: "Maintained a 7-day learning streak",
    condition: (stats: UserStats) => stats.streak >= 7,
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Studied after midnight",
    condition: (stats: UserStats) => stats.studiedAtNight,
  },
  {
    id: "course-finisher",
    name: "🏁 Finisher",
    description: "Completed a full course",
    condition: (stats: UserStats) => stats.coursesCompleted >= 1,
  },
];

export function GamificationPanel() {
  const badgesWithStatus = BADGES.map((badge) => ({
    ...badge,
    unlocked: badge.condition(userStats),
  }));

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {badgesWithStatus.map((badge) => (
        <div
          key={badge.id}
          className={`rounded-lg border p-4 text-center transition ${
            badge.unlocked
              ? "border-green-400 bg-green-50"
              : "bg-gray-100 opacity-50"
          }`}
        >
          <div className="mb-2 text-2xl">{badge.name}</div>
          <p className="text-sm text-muted-foreground">
            {badge.unlocked ? badge.description : "🔒 Locked"}
          </p>
        </div>
      ))}
    </div>
  );
}
export default function BadgesPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">My Badges</h1>
      <GamificationPanel />
    </div>
  );
}