import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/roles";

export function useUserRole() {
  const queryClient = useQueryClient();

  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data?.role as UserRole | null;
    },
  });

  const assignRole = useMutation({
    mutationFn: async (newRole: UserRole) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: user.id, role: newRole });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRole"] });
    },
  });

  return {
    role,
    isLoading,
    assignRole: assignRole.mutate,
    isAssigning: assignRole.isPending,
  };
}
