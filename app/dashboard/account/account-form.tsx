"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { logout } from "../action";
import Avatar from "@/components/dashboard/account/avatar";
import { useToast } from "@/hooks/use-toast"


export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast()

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        throw new Error("User ID is not available");
      }

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setError("Failed to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        throw new Error("User ID is not available");
      }

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      toast({
        title: "Profile updated successfully!",
      })
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          User not found. Please sign in to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form className="space-y-6">
        <Avatar
          uid={user?.id ?? null}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, website, avatar_url: url });
          }}
        />
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="text"
              value={user.email || ""}
              disabled
              className="mt-1 bg-gray-100"
            />
          </div>
          <div>
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={fullname || ""}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="website"
              className="text-sm font-medium text-gray-700"
            >
              Website
            </Label>
            <Input
              id="website"
              type="url"
              value={website || ""}
              onChange={(e) => setWebsite(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-6">
          <Button
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
          <Button type="submit" variant="outline" onClick={() => logout()}>
            Sign out
          </Button>
        </div>
      </form>
    </div>
  );
}
