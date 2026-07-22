export const hours = [
  { name: 'Montag', opens: '09:00', closes: '19:00' },
  { name: 'Dienstag', opens: '09:00', closes: '19:00' },
  { name: 'Mittwoch', opens: '09:00', closes: '19:00' },
  { name: 'Donnerstag', opens: '09:00', closes: '19:00' },
  { name: 'Freitag', opens: '09:00', closes: '19:00' },
  { name: 'Samstag', opens: '09:30', closes: '18:00' },
  { name: 'Sonntag', opens: null, closes: null },
]

export function getBerlinStatus(date = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]))
  const index = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(parts.weekday)
  const today = hours[index]
  if (!today.opens) return { dayIndex: index, label: 'Heute geschlossen', open: false }
  const now = `${parts.hour}:${parts.minute}`
  if (now < today.opens) return { dayIndex: index, label: `Öffnet um ${today.opens} Uhr`, open: false }
  if (now >= today.closes) return { dayIndex: index, label: 'Heute geschlossen', open: false }
  return { dayIndex: index, label: 'Jetzt geöffnet', open: true }
}
