export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      data_sources: {
        Row: {
          auth_type: string | null
          base_url: string
          cadence_sec: number | null
          chart_type: string | null
          created_at: string | null
          enabled: boolean | null
          id: string
          last_error: string | null
          last_fetched_at: string | null
          last_status: string | null
          name: string
          secret_name: string | null
          slug: string | null
          type: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          auth_type?: string | null
          base_url: string
          cadence_sec?: number | null
          chart_type?: string | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          last_error?: string | null
          last_fetched_at?: string | null
          last_status?: string | null
          name: string
          secret_name?: string | null
          slug?: string | null
          type: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          auth_type?: string | null
          base_url?: string
          cadence_sec?: number | null
          chart_type?: string | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          last_error?: string | null
          last_fetched_at?: string | null
          last_status?: string | null
          name?: string
          secret_name?: string | null
          slug?: string | null
          type?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      fetch_logs: {
        Row: {
          created_at: string | null
          duration_ms: number | null
          error: string | null
          id: string
          ok: boolean
          source_slug: string | null
          status_code: number | null
          url: string
        }
        Insert: {
          created_at?: string | null
          duration_ms?: number | null
          error?: string | null
          id?: string
          ok: boolean
          source_slug?: string | null
          status_code?: number | null
          url: string
        }
        Update: {
          created_at?: string | null
          duration_ms?: number | null
          error?: string | null
          id?: string
          ok?: boolean
          source_slug?: string | null
          status_code?: number | null
          url?: string
        }
        Relationships: []
      }
      investors: {
        Row: {
          created_at: string | null
          focus_areas: string[] | null
          geo: string | null
          id: string
          link: string | null
          name: string
          notes: string | null
          ticket_size_max_usd: number | null
          ticket_size_min_usd: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          focus_areas?: string[] | null
          geo?: string | null
          id?: string
          link?: string | null
          name: string
          notes?: string | null
          ticket_size_max_usd?: number | null
          ticket_size_min_usd?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          focus_areas?: string[] | null
          geo?: string | null
          id?: string
          link?: string | null
          name?: string
          notes?: string | null
          ticket_size_max_usd?: number | null
          ticket_size_min_usd?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      kpi_timeseries: {
        Row: {
          id: number
          kpi_key: string
          kpi_value: number
          observed_at: string
          source: string
        }
        Insert: {
          id?: number
          kpi_key: string
          kpi_value: number
          observed_at?: string
          source: string
        }
        Update: {
          id?: number
          kpi_key?: string
          kpi_value?: number
          observed_at?: string
          source?: string
        }
        Relationships: []
      }
      launches: {
        Row: {
          details_url: string | null
          fetched_at: string | null
          id: string
          image_url: string | null
          location: string | null
          mission: string | null
          name: string
          pad: string | null
          provider: string | null
          status: string | null
          window_start: string | null
        }
        Insert: {
          details_url?: string | null
          fetched_at?: string | null
          id: string
          image_url?: string | null
          location?: string | null
          mission?: string | null
          name: string
          pad?: string | null
          provider?: string | null
          status?: string | null
          window_start?: string | null
        }
        Update: {
          details_url?: string | null
          fetched_at?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          mission?: string | null
          name?: string
          pad?: string | null
          provider?: string | null
          status?: string | null
          window_start?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          organization: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          organization?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          organization?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          created_at: string | null
          id: string
          roi_inputs: Json | null
          roi_outputs: Json | null
          sustain_inputs: Json | null
          sustain_score: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          roi_inputs?: Json | null
          roi_outputs?: Json | null
          sustain_inputs?: Json | null
          sustain_score?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          roi_inputs?: Json | null
          roi_outputs?: Json | null
          sustain_inputs?: Json | null
          sustain_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string | null
          data_sources: Json | null
          id: string
          nasa_api_key: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data_sources?: Json | null
          id?: string
          nasa_api_key?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data_sources?: Json | null
          id?: string
          nasa_api_key?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tenders: {
        Row: {
          agency: string
          created_at: string | null
          due_date: string
          id: string
          link: string | null
          posted_at: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          agency: string
          created_at?: string | null
          due_date: string
          id?: string
          link?: string | null
          posted_at?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          agency?: string
          created_at?: string | null
          due_date?: string
          id?: string
          link?: string | null
          posted_at?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      ventures: {
        Row: {
          country: string
          created_at: string | null
          id: string
          last_funding_usd: number | null
          name: string
          sector: string
          short_pitch: string | null
          stage: string
          sustainability_score: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          country: string
          created_at?: string | null
          id?: string
          last_funding_usd?: number | null
          name: string
          sector: string
          short_pitch?: string | null
          stage: string
          sustainability_score?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          country?: string
          created_at?: string | null
          id?: string
          last_funding_usd?: number | null
          name?: string
          sector?: string
          short_pitch?: string | null
          stage?: string
          sustainability_score?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      kpi_latest: {
        Row: {
          kpi_key: string | null
          kpi_value: number | null
          observed_at: string | null
          source: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      refresh_kpi_latest: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "user"
        | "agency"
        | "investor"
        | "entrepreneur"
        | "business"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "user",
        "agency",
        "investor",
        "entrepreneur",
        "business",
      ],
    },
  },
} as const
