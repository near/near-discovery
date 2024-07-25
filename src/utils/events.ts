import { googleCalendarApiKey, lumaApiUrl } from './config';
import type { GoogleCalendarEvent, GoogleEventsListData, LumaEventItem, LumaEventsListData } from './types';

export const fetchLumaEvents = async (
  calendarApiId: string,
  limit: number,
  offset: number,
): Promise<LumaEventsListData> => {
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
    throw new Error('Failed to fetch Luma Calendar data');
  }

  const data = (await res.json()) as {
    entries: LumaEventItem[];
    has_more: boolean;
  };

  return { entries: data.entries, hasMore: data.has_more };
};

export const fetchGoogleCalendarEvents = async (
  calendarId: string,
  startFrom: string,
  limit: number,
): Promise<GoogleEventsListData> => {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${googleCalendarApiKey}&maxResults=${limit}&timeMin=${startFrom}&singleEvents=true&orderBy=startTime`,
    {},
  );

  if (!res.ok) {
    throw new Error('Failed to fetch Google Calendar data');
  }

  const data = (await res.json()) as {
    items: GoogleCalendarEvent[];
  };

  return { items: data.items };
};
