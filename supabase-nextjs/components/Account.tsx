import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { definitions } from "../types/supabase";
import Avatar from "./Avatar";

export default function Account({
  session,
}: {
  session: Session | null;
}): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (user === null) return;

      const { data, error, status } = await supabase
        .from<definitions["profiles"]>("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username ?? "");
        setWebsite(data.website ?? "");
        setAvatarUrl(data.avatar_url ?? "");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatarUrl,
  }: {
    username: string;
    website: string;
    avatarUrl: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (user === null) return;

      const updates = {
        id: user.id,
        username: username,
        website: website,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        url={avatarUrl}
        size={150}
        onUpload={(url: string) => {
          setAvatarUrl(url);
          updateProfile({
            username,
            website,
            avatarUrl,
          });
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session!.user?.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, website, avatarUrl })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
