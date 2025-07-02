import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";

/**
 * ConfirmDeleteDialog
 *
 * Props:
 * - title: string (judul dialog)
 * - description: string (deskripsi dialog)
 * - onConfirm: function (fungsi yang dipanggil saat konfirmasi)
 * - triggerLabel: ReactNode (opsional, konten trigger, default ikon trash)
 */
export function ConfirmDeleteDialog({
  title = "Yakin ingin menghapus item ini?",
  description = "Item akan dihapus secara permanen.",
  onConfirm,
  triggerLabel,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerLabel ? (
          triggerLabel
        ) : (
          <Button size="icon">
            <IconTrash />
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-rose-500 hover:bg-rose-700"
            onClick={onConfirm}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
