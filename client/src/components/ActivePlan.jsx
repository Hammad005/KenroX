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

const ActivePlan = ({open, setOpen, selectedPlan, setSelectedPlan}) => {
     const { activePlan, planLoading } = planStore();
    const handleActive = async () => {
        const res = await activePlan(selectedPlan?._id);
        if (res?.success) {
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
              This action cannot be undone. This will activate {
                selectedPlan?.name
              }.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disable={planLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction disable={planLoading} onClick={handleActive}>{
                planLoading ? <Loader2 className="animate-spin"/> : "Activate"
                }</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ActivePlan