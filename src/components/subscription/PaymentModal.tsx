
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubscription } from "./SubscriptionContext";
import { CheckCircle, CreditCard, Lock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onOpenChange }) => {
  const { upgradeAccount } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast({
        title: "Missing Information",
        description: "Please fill out all payment details.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      upgradeAccount();
      setIsProcessing(false);
      onOpenChange(false);
      
      // Reset form
      setCardNumber("");
      setCardName("");
      setExpiryDate("");
      setCvv("");
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add slash after 2 digits (MM/YY format)
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upgrade to Premium - $20</DialogTitle>
          <DialogDescription>
            Upgrade your account to apply for unlimited jobs.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-brand-50 p-3 rounded-md mb-4 border border-brand-100">
          <h3 className="font-semibold text-brand-700 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-brand-600" />
            Premium Benefits
          </h3>
          <ul className="text-sm text-brand-800 mt-2 space-y-1">
            <li>• Apply for unlimited job positions</li>
            <li>• Get priority application processing</li>
            <li>• Access to exclusive job listings</li>
            <li>• Advanced resume builder tools</li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className="pl-10"
                maxLength={19}
              />
              <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay $20 & Upgrade"}
            </Button>
          </DialogFooter>
        </form>
        
        <div className="text-center text-sm text-gray-500 flex items-center justify-center mt-2">
          <Lock className="h-4 w-4 mr-1" />
          Secured by Stripe
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
