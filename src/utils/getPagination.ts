export const getPagination = (limit: number, offset: number): { start: number; end: number } => {
  const perPage = limit ? limit : 10;
  const start = offset ? offset * perPage : 0;
  const end = perPage;

  return { start, end };
};
