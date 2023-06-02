import { addMinutes, formatISO } from 'date-fns';

export function convertToInterval(value: number) {
  const minutesValue = addMinutes(new Date(), value);
  console.log('minutesValue', minutesValue);
  return formatISO(minutesValue);
}

export function formatDuration(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  // Calculate remaining minutes after subtracting the hours
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  let duration = '';

  if (hours > 0) {
    duration += hours + ' hour' + (hours > 1 ? 's' : '') + ' ';
  }

  if (minutes > 0) {
    duration += minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ';
  }

  return duration.trim();
}

export function getTimeInMinutes(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);

  return minutes % 60;
}
