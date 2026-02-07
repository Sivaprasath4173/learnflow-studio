<<<<<<< HEAD
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
=======
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
>>>>>>> 88d8ff07062df7884bfb954e511032d4a46d87df

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
<<<<<<< HEAD

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
=======
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardName, setCardName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsProcessing(false);
        onConfirm();
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Complete Your Purchase
                    </DialogTitle>
                    <DialogDescription>
                        You're enrolling in <span className="font-semibold">{courseTitle}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {/* Price Display */}
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-3xl font-bold text-primary">${price.toFixed(2)}</p>
                    </div>

                    {/* Card Details */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input
                                id="cardName"
                                placeholder="John Doe"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="relative">
                                <Input
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                    maxLength={19}
                                    required
                                />
                                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                    id="expiryDate"
                                    placeholder="MM/YY"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                    maxLength={5}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                    id="cvv"
                                    type="password"
                                    placeholder="•••"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                    maxLength={3}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        <span>Your payment information is secure and encrypted</span>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isProcessing} className="gap-2">
                            {isProcessing ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="h-4 w-4" />
                                    Pay ${price.toFixed(2)}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
>>>>>>> 88d8ff07062df7884bfb954e511032d4a46d87df
            </DialogContent>
        </Dialog>
    );
}
