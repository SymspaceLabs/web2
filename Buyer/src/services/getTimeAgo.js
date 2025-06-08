export function getTimeAgo(isoString) {
  const now = new Date();
  const created = new Date(isoString);
  const diffMs = now - created;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 4) return `${days} day${days !== 1 ? "s" : ""} ago`;

  // Otherwise, show formatted date like "8th June 2025"
  const day = created.getDate();
  const month = created.toLocaleString('default', { month: 'long' });
  const year = created.getFullYear();

  const ordinal =
    day % 10 === 1 && day !== 11 ? 'st' :
    day % 10 === 2 && day !== 12 ? 'nd' :
    day % 10 === 3 && day !== 13 ? 'rd' : 'th';

  return `${day}${ordinal} ${month} ${year}`;
}