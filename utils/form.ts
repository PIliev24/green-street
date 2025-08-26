export function getFieldError(
  errors: Record<string, string[] | undefined> | undefined,
  field: string
): string | undefined {
  return errors?.[field]?.[0];
}

export function hasFieldError(errors: Record<string, string[] | undefined> | undefined, field: string): boolean {
  return Boolean(errors?.[field]?.length);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    // eslint-disable-next-line prefer-spread
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}
