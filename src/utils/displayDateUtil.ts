export const displayDate = (
  otherDate: Date,
  options?: Intl.DateTimeFormatOptions | undefined
) => {
  const date = new Date(otherDate);
  return date.toLocaleDateString(
    'pt-br',
    options || {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    }
  );
};
