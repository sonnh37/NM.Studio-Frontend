import { toast } from "sonner";

export const toastPrintJSON = (value: any) => {
  toast(
    <div>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: 12,
          maxHeight: 300,
          overflow: "auto",
        }}
      >
        {JSON.stringify(value, null, 2)}
      </pre>
      <button
        onClick={() => {
          toast.success("Copied to clipboard!");
          navigator.clipboard.writeText(JSON.stringify(value, null, 2));
        }}
      >
        Copy
      </button>
    </div>
  );
};
