import { useLocalStorage } from "react-use";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { FC } from "react";

export const WithDevAlert: FC = () => {
    const [accept, setAccept] = useLocalStorage("devMode", false);

    return (
        <Dialog
            defaultOpen={!accept}
            onOpenChange={() => {
                setAccept(true);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Is this ready?</DialogTitle>
                    <DialogDescription>
                        This portfolio is still under development. Some feature
                        may not stable. Keep going to beta version.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
