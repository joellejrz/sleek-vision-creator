
// Mock data for tasks with timeline information
export const tasksData = [
  {
    id: 1,
    title: "5min GRATITUDE (breath) work",
    completed: false,
    priority: "medium" as const,
    due: "Today",
    startTime: "07:30",
    endTime: "07:40",
    duration: "10 min",
    category: "wellness",
    aiSuggested: false,
    color: "green",
  },
  {
    id: 2,
    title: "Morning stretch",
    completed: false,
    priority: "low" as const,
    due: "Today",
    startTime: "07:40",
    endTime: "07:45",
    duration: "5 min",
    category: "wellness",
    aiSuggested: false,
    color: "green",
  },
  {
    id: 3,
    title: "Scalp hair massage + skin care",
    completed: false,
    priority: "medium" as const,
    due: "Today",
    startTime: "07:45",
    endTime: "08:05",
    duration: "20 min",
    category: "selfcare",
    aiSuggested: true,
    color: "green",
  },
  {
    id: 4,
    title: "University lecture",
    completed: false,
    priority: "high" as const,
    due: "Today",
    startTime: "09:30",
    endTime: "11:00",
    duration: "1 hr, 30 min",
    category: "education",
    aiSuggested: false,
    color: "orange",
  },
  {
    id: 5,
    title: "Create Instagram carousel post on feature benefits",
    completed: false,
    priority: "high" as const,
    due: "Today, 2:00 PM",
    startTime: "14:00",
    endTime: "15:00",
    duration: "1 hr",
    category: "content",
    aiSuggested: true,
    color: "blue",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Film short tutorial video for TikTok",
    completed: false,
    priority: "medium" as const,
    due: "Today, 5:00 PM",
    startTime: "17:00",
    endTime: "17:30",
    duration: "30 min",
    category: "content",
    aiSuggested: true,
    color: "purple",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 7,
    title: "Research trending hashtags for next campaign",
    completed: true,
    priority: "medium" as const,
    due: "Completed yesterday",
    startTime: "09:00",
    endTime: "10:00",
    duration: "1 hr",
    category: "research",
    aiSuggested: false,
    color: "yellow",
  },
];

// AI suggested tasks with more context
export const aiSuggestedTasks = [
  {
    title: "Repurpose your top performing blog post into a carousel for Instagram",
    reasoning: "This content performed 47% better than average on your blog",
    priority: "high" as const,
    image: "/placeholder.svg",
  },
  {
    title: "Create a poll asking followers about their biggest challenge",
    reasoning: "Polls increase engagement by 23% on average",
    priority: "medium" as const,
  },
  {
    title: "Take a 15-minute mindfulness break before your afternoon tasks",
    reasoning: "Breaks improve productivity by 34%",
    priority: "medium" as const,
  },
];
