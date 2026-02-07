import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    price: number;
    courseTitle: string;
}

export function PaymentModal({
    isOpen,
    onClose,
    onConfirm,
    price,
    courseTitle,
}: PaymentModalProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onConfirm();
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && !isProcessing && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Secure Checkout</DialogTitle>
                    <DialogDescription>
                        Complete your purchase for "{courseTitle}"
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                        <span className="font-medium">Total Amount</span>
                        <span className="text-xl font-bold">₹{price}</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="pl-9" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="cvc" placeholder="123" className="pl-9" />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button onClick={handlePay} disabled={isProcessing} className="w-full sm:w-auto">
                        {isProcessing ? "Processing..." : `Pay ₹${price}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
