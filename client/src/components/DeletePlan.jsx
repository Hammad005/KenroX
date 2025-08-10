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
import { useEffect } from "react";

const DeletePlan = ({
  open,
  setOpen,
  selectedPlan,
  setSelectedPlan,
  setActive,
}) => {
  const { deletePlan, planLoading, plans } = planStore();
  const handleDelete = async () => {
    const res = await deletePlan(selectedPlan?._id);
    if (res?.success) {
      setOpen(false);
      setSelectedPlan(null);
    }
  };
  useEffect(() => {
    if (plans.length && !plans.includes(selectedPlan)) {
      setActive(plans[0]);
    }
  }, [plans]);

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-black font-sans">{selectedPlan?.name}</span> from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={planLoading}
              onClick={() => {
                setOpen(false);
                setSelectedPlan(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={planLoading} onClick={handleDelete}>
              {planLoading ? <Loader2 className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeletePlan;
