import { useEffect, useState } from 'react';

import { fetchLumaEvents } from '@/utils/events';

export type MappedEvent = {
  date: string;
  description: string;
  location: any;
  thumbnail: string;
  title: string;
  url: string;
};

export function useEvents(calendarApiIds: string[], limit = 3) {
  const aiEventsUrl = 'https://lu.ma';
  const [events, setEvents] = useState<MappedEvent[]>([]);
  const [hasMoreEvents, setHasMoreEvents] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allEvents = await Promise.all(calendarApiIds.map((id) => fetchLumaEvents(id, limit, 0)));

        const combinedEvents = allEvents.flatMap((result) => result.entries);

        const sortedEvents = [...combinedEvents]
          .sort((a, b) => new Date(a.event.start_at).getTime() - new Date(b.event.start_at).getTime())
          .slice(0, limit);

        const mappedEvents = sortedEvents.map((item) => {
          return {
            date: formatDate(item.event.start_at, item.event.end_at),
            description: item.event.description,
            location: formatLocation(item.event.geo_address_json ?? item.event.geo_address_info),
            thumbnail: item.event.cover_url,
            title: item.event.name,
            url: `${aiEventsUrl}/${item.event.url}`,
          };
        });

        setEvents(mappedEvents);
        setHasMoreEvents(combinedEvents.length > limit);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(calendarApiIds), limit]);

  const formatDate = (startAt: string, endAt: string) => {
    // Example Format: "Jul 21 - Jul 23, 2023"

    const startAtDate = new Date(startAt);
    const endAtDate = new Date(endAt);

    const startAtDateFormatted = startAtDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });

    const endAtDateFormatted = endAtDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `${startAtDateFormatted} - ${endAtDateFormatted}`;
  };

  const formatLocation = (location: any) => {
    if (location.city || location.city_state) {
      return `${location.city ?? location.city_state}, ${location.country}`;
      // Luma API returns "mode" as "obfuscated" when the address is hidden
    } else if (location && location?.mode === 'obfuscated') {
      return 'Register to See Address';
    }
    return location.address;
  };

  return {
    events,
    hasMoreEvents,
  };
}
