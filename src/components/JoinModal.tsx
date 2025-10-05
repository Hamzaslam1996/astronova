import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

interface JoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinModal({ open, onOpenChange }: JoinModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [tags, setTags] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    const signup = {
      email,
      role,
      tags,
      ts: Date.now(),
    };

    const existing = localStorage.getItem("astronova_signups");
    const signups = existing ? JSON.parse(existing) : [];
    signups.push(signup);
    localStorage.setItem("astronova_signups", JSON.stringify(signups));

    setSubmitted(true);
  };

  const handleClose = () => {
    setEmail("");
    setRole("");
    setTags("");
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" onEscapeKeyDown={handleClose}>
        <DialogHeader>
          <DialogTitle>Get Opportunity Alerts</DialogTitle>
          <DialogDescription>
            {submitted
              ? "You'll receive 3 curated opportunities this week."
              : "Enter your details to receive curated LEO opportunities."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="space-y-4 pt-4">
            <div className="flex gap-3">
              <Link to="/" className="flex-1">
                <Button className="w-full" variant="outline" aria-label="Back to Home">
                  Back to Home
                </Button>
              </Link>
              <Button onClick={handleClose} className="flex-1" aria-label="Close modal">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" aria-label="Select your role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="engineer">Engineer</SelectItem>
                  <SelectItem value="policymaker">Policymaker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Interests (comma-separated)</Label>
              <Input
                id="tags"
                placeholder="e.g., satellite deployment, rideshare, tech transfer"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" aria-label="Submit to join alerts">
              Join Alerts
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
