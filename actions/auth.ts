"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { LoginSchema } from "@/types/domain";
import { ROUTES } from "@/utils/constants";

export async function signIn(formData: FormData) {
  const rawFormData = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = LoginSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten();

    return {
      errors: fieldErrors.fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    return {
      errors: {
        general: [error.message],
      },
    };
  }

  redirect(ROUTES.HOME);
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      errors: {
        general: [error.message],
      },
    };
  }

  redirect(ROUTES.LOGIN);
}

export async function getSession() {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return {
      session: null,
      error: error.message,
    };
  }

  return {
    session,
    error: null,
  };
}
