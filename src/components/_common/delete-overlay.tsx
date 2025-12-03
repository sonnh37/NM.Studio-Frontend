import { Button } from "../ui/button";

interface DeleteOverlayProps {
  onRestore: () => void;
  onDelete: () => void;
}

export const DeleteOverlay: React.FC<DeleteOverlayProps> = ({
  onRestore,
  onDelete,
}) => {
  return (
    <div className="pointer-events-auto flex h-full w-full items-center justify-center gap-1 bg-white/50 opacity-0 hover:opacity-100 dark:bg-black/50 absolute inset-0">
      <Button type="button" variant="outline" size="sm" onClick={onRestore}>
        Restore
      </Button>
      <Button type="button" variant="destructive" size="sm" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};
