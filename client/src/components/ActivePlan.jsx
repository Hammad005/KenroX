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

const ActivePlan = ({openActive, setOpenActive, selectedPlan, setSelectedPlan}) => {
     const { activePlan, planLoading } = planStore();
    const handleActive = async () => {
        const response = await activePlan(selectedPlan?._id);
        if (response?.success) {
            setOpenActive(false);
            setSelectedPlan(null);
        }
    }
    
  return (
    <>
      <AlertDialog open={openActive}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will activate <span className="font-black font-sans">{selectedPlan?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={planLoading} onClick={() => {
              setOpenActive(false);
            setSelectedPlan(null);
            }}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={planLoading} onClick={handleActive}>{
                planLoading ? <Loader2 className="animate-spin"/> : "Activate"
                }</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ActivePlan