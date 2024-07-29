import { useEffect, useMemo, useState } from 'react';

import { fetchGoogleCalendarEvents } from '@/utils/events';
import type { GoogleCalendarEvent } from '@/utils/types';

export function useGoogleEvents(calendarId: string, limit = 9) {
  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [lastElements, setLastElements] = useState<GoogleCalendarEvent[]>([]);

  const startFrom = useMemo(() => {
    return new Date().toISOString();
  }, []);

  const fetchData = async () => {
    try {
      const { items, nextPageToken: newToken } = await fetchGoogleCalendarEvents(
        calendarId,
        startFrom,
        limit,
        nextPageToken,
      );

      const mappedEvents = items.map((event) => {
        return {
          ...event,
          start: {
            dateTime: formatDevHubEventsDate(event.start.dateTime),
          },
        };
      });

      setNextPageToken(newToken);
      if (googleEvents.length === 0 && lastElements.length === 0) {
        setLastElements(mappedEvents);
      } else {
        setGoogleEvents((events) => [...events, ...lastElements]);
        setLastElements(mappedEvents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return { googleEvents, lastElements, fetchData };
}
