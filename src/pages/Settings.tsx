import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { ShieldAlert, Shield } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [nasaApiKey, setNasaApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setCheckingAuth(false);
        return;
      }

      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
      }

      setIsAdmin(!!roles);
      
      if (roles) {
        fetchSettings();
      }
    } catch (error: any) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setNasaApiKey(data.nasa_api_key || "");
      }
    } catch (error: any) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: existing } = await supabase
        .from("settings")
        .select("id")
        .limit(1)
        .single();

      if (existing) {
        const { error } = await supabase
          .from("settings")
          .update({ nasa_api_key: nasaApiKey, updated_at: new Date().toISOString() })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("settings")
          .insert({ nasa_api_key: nasaApiKey });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-heading font-bold">Settings</h1>
        <Card className="bg-card/50 backdrop-blur">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Checking permissions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-heading font-bold">Settings</h1>
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertDescription>
            <strong>Access Denied:</strong> This page requires administrator privileges. 
            NASA API keys are sensitive credentials that should only be managed by administrators.
          </AlertDescription>
        </Alert>
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              To protect your NASA API credentials, only users with the admin role can view and modify system settings.
              Contact your system administrator if you need access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Settings</h1>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Administrator Access
        </p>
      </div>
      
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Security:</strong> API keys stored here are protected by admin-only access controls. 
          Only users with the admin role can view or modify these credentials.
        </AlertDescription>
      </Alert>

      <Card className="bg-card/50 backdrop-blur">
        <CardHeader><CardTitle>API Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>NASA API Key</Label>
            <Input 
              type="password" 
              placeholder="Enter API key" 
              value={nasaApiKey}
              onChange={(e) => setNasaApiKey(e.target.value)}
              disabled={fetching}
            />
            <p className="text-xs text-muted-foreground mt-1">
              This key is used by backend services to fetch data from NASA APIs.
            </p>
          </div>
          <Button onClick={handleSave} disabled={loading || fetching}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
