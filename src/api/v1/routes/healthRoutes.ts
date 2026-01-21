import { Router, Request, Response } from "express";
// import router + types

// Primary data type annotations
const router: Router = Router();
const version: string = "v1";
const okStatus: string = "OK";

/**
 * Builds health response payload
 * @param uptimeSeconds - server uptime (seconds)
 * @returns health object
 */
const buildHealthPayload = (
  uptimeSeconds: number
): { status: string; uptime: number; timestamp: string; version: string } => {
  return {
    status: okStatus,
    uptime: Math.round(uptimeSeconds * 100) / 100,
    timestamp: new Date().toISOString(),
    version
  };
};

// GET /api/v1/health
router.get("/", (_req: Request, res: Response) => {
  const uptimeSeconds: number = process.uptime();
  const payload = buildHealthPayload(uptimeSeconds);

  res.status(200).json(payload);
});

export default router;
