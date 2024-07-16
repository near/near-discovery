import { lumaApiUrl } from './config';

export type EventItem = {
  api_id: string;
  event: {
    api_id: string;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    cover_url: string;
    url: string;
    geo_address_json: any;
    geo_address_info?: any;
  };
};

type EventsListData = {
  entries: EventItem[];
  hasMore: boolean;
};

export const fetchLumaEvents = async (
  calendarApiId: string,
  limit: number,
  offset: number,
): Promise<EventsListData> => {
  const queryFrom = `period=future`;
  const queryLimit = `pagination_limit=${limit ?? 10}`;
  const queryOffset = offset ? `pagination_offset=${offset}` : '';
  const queryParams = [queryFrom, queryLimit, queryOffset].filter(Boolean).join('&');

  const res = await fetch(`${lumaApiUrl}/calendar/get-items?calendar_api_id=${calendarApiId}&${queryParams}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await res.json()) as {
    entries: EventItem[];
    has_more: boolean;
  };

  return { entries: data.entries, hasMore: data.has_more };
};
