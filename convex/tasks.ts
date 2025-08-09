// This file is for scheduled tasks and background jobs
// Currently empty - add cron jobs and scheduled tasks here as needed

import { cronJobs } from "convex/server";

const crons = cronJobs();

// Example cron job (uncomment when needed):
// crons.interval("cleanup old submissions", { hours: 24 }, internal.tasks.cleanupOldSubmissions, {});

export default crons;