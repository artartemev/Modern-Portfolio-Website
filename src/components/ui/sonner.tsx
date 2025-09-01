import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "rgba(255, 255, 255, 0.9)",
          "--normal-text": "#323232",
          "--normal-border": "rgba(255, 255, 255, 0.3)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };