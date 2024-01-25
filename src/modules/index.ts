import { Router } from "express";

import users from "./users/users.route";
import user from "./google/user/user.route";
import time_logs from "./timeLogs/timeLogs.route";
import projects from "./projects/projects.route";

const router: Router = Router();

router.use("/users", users);
router.use("/user", user);
router.use("/logs", time_logs);
router.use("/projects", projects);
// router.use("/projects", projects);

export default router;
