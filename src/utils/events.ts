import { eventsApiUrl, eventsApiKey } from './config';

type EventData = {
  api_id: string;
  event: {
    api_id: string;
    name: string;
    start_at: string;
    cover_url: string;
    url: string;
  };
};

export const fetchEventsList = async (): Promise<EventData[]> => {
  const res = await fetch(`${eventsApiUrl}/calendar/list-events`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-luma-api-key': eventsApiKey as string,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await res.json()) as { entries: EventData[] };
  return data.entries;
};
