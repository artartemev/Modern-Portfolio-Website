declare const Deno: any;

export const devLog = (...args: unknown[]): void => {
  if (
    (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') ||
    (typeof Deno !== 'undefined' && Deno.env.get('NODE_ENV') === 'development')
  ) {
    console.log(...args);
  }
};

export default devLog;
