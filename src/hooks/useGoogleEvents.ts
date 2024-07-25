import { useEffect, useState } from 'react';

import { fetchGoogleCalendarEvents } from '@/utils/events';
import type { GoogleCalendarEvent } from '@/utils/types';

export function useGoogleEvents(calendarId: string, startFrom: string, limit = 9) {
  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { items } = await fetchGoogleCalendarEvents(calendarId, startFrom, limit);
        setGoogleEvents(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [calendarId, startFrom, limit]);

  const mappedEvent = googleEvents.map((event) => {
    return {
      ...event,
      start: {
        dateTime: formatDevHubEventsDate(event.start.dateTime),
      },
    };
  });

  return mappedEvent;
}

function formatDevHubEventsDate(dateString: string) {
  // eg. Thu, 15 August 4:00 PM UTC
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert 0 hours to 12 and 13+ hours to 1-12

  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;

  return `${formattedDate} ${formattedTime} UTC`;
}
