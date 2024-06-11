import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const DevMode = () => (
    <Dialog defaultOpen>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Is this ready?</DialogTitle>
                <DialogDescription>
                    This portfolio is still under development. Some feature may
                    not be stable. Keep going to beta version.
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
);
