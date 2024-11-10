import { start } from "node:repl";

export default defineEventHandler(async (event) => {
  const { origin, destination, startDate, endDate } = await getQuery(event);
  if (!origin || !destination || !startDate)
    throw createError({
      statusCode: 400,
      message: "Missing query parameters",
    });
  return await $fetch(
    `https://www.amtrak.com/dotcom/travel-service/schedules?origin=${origin}&destination=${destination}&startDate=${startDate}${endDate ? `&endDate=${endDate}` : ""}`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        /*"x-amtrak-trace-id": "<REDACTED>",*/
        /* cookie: "<REDACTED>",*/
        Referer: "https://www.amtrak.com/tickets/schedule-results.html",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    },
  );
});
