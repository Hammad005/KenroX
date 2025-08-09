import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { planStore } from "@/store/planStore";
import { Loader2 } from "lucide-react";

const DeletePlan = ({ open, setOpen, selectedPlan, setSelectedPlan, setActive }) => {
    const { deletePlan, planLoading, plans } = planStore();
    const handleDelete = async () => {
        const res = await deletePlan(selectedPlan?._id);
        if (res?.success) {
            setActive(plans[0]);
            setOpen(false);
            setSelectedPlan(null);
        }
    }
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {
                selectedPlan?.name
              } from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disable={planLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction disable={planLoading} onClick={handleDelete}>{
                planLoading ? <Loader2 className="animate-spin"/> : "Delete"
                }</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeletePlan;
