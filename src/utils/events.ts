import moment from 'moment';

import { eventsApiKey, eventsApiUrl } from './config';

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

type EventsListData = {
  entries: EventData[];
  hasMore: boolean;
};

export const fetchEventsList = async (limit: number, offset: number): Promise<EventsListData> => {
  const currentDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
  const queryFrom = `after=${currentDate}`;
  const queryLimit = `pagination_limit=${limit ?? 10}`;
  const queryOffset = offset ? `pagination_offset=${offset}` : '';
  const queryParams = [queryFrom, queryLimit, queryOffset].filter(Boolean).join('&');
  const res = await fetch(`${eventsApiUrl}/calendar/list-events?${queryParams}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-luma-api-key': eventsApiKey as string,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await res.json()) as { entries: EventData[]; has_more: boolean };
  return { entries: data.entries, hasMore: data.has_more };
};
