import { useEffect, useMemo, useState } from 'react';

import { fetchGoogleCalendarEvents } from '@/utils/events';
import type { FormatedEvent } from '@/utils/types';

export function useGoogleEvents(calendarId: string, limit = 9) {
  const [googleEvents, setGoogleEvents] = useState<FormatedEvent[]>([]);

  const startFrom = useMemo(() => {
    return new Date().toISOString();
  }, []);

  const loadData = async () => {
    try {
      const { items } = await fetchGoogleCalendarEvents(calendarId, startFrom, limit, '');

      const formattedEvents = items.map((event) => {
        return {
          id: event.id,
          title: event.summary,
          start: event.start.dateTime,
          thumbnail: `https://lh3.googleusercontent.com/d/${event.attachments?.[0]?.fileId}=w1000`,
          location: '',
          url: event.htmlLink,
        };
      });

      setGoogleEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { googleEvents };
}
