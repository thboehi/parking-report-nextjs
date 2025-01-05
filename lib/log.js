import Log from '../models/Log';
import dbConnect from './mongodb';

export async function logAction({ action, endpoint, method, ip, payload }) {
  await dbConnect();

  const log = new Log({
    action,
    endpoint,
    method,
    ip,
    payload,
  });

  await log.save();
}