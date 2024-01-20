import { Router } from 'express';

import users from './users/users.route';
import user from './google/user/user.route';
import time_logs from './timeLogs/timeLogs.route';


const router: Router = Router();

router.use('/users', users);
router.use('/google/user', user);
router.use('/logs', time_logs);
// router.use("/projects", projects);

export default router;
