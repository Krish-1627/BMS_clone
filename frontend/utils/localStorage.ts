
import { Booking, EmailLog, WebhookLog } from '../types.ts';

const BOOKINGS_KEY = 'bms_bookings';
const EMAIL_LOGS_KEY = 'bms_email_logs';
const WEBHOOK_LOGS_KEY = 'bms_webhook_logs';

// Bookings
export const getBookings = (): Booking[] => {
  const bookingsJson = localStorage.getItem(BOOKINGS_KEY);
  return bookingsJson ? JSON.parse(bookingsJson) : [];
};

export const saveBookings = (bookings: Booking[]): void => {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

export const addBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.unshift(booking);
  saveBookings(bookings);
};

// Email Logs
export const getEmailLogs = (): EmailLog[] => {
  const logsJson = localStorage.getItem(EMAIL_LOGS_KEY);
  return logsJson ? JSON.parse(logsJson) : [];
};

export const addEmailLog = (log: EmailLog): void => {
  const logs = getEmailLogs();
  logs.unshift(log);
  localStorage.setItem(EMAIL_LOGS_KEY, JSON.stringify(logs));
};

// Webhook Logs
export const getWebhookLogs = (): WebhookLog[] => {
  const logsJson = localStorage.getItem(WEBHOOK_LOGS_KEY);
  return logsJson ? JSON.parse(logsJson) : [];
};

export const addWebhookLog = (log: WebhookLog): void => {
  const logs = getWebhookLogs();
  logs.unshift(log);
  localStorage.setItem(WEBHOOK_LOGS_KEY, JSON.stringify(logs));
};