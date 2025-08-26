"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "@/actions/auth";
import { getFieldError } from "@/utils/form";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      setErrors({});

      const result = await signIn(formData);

      if (result?.errors) {
        setErrors(result.errors);
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              disabled={isPending}
              placeholder="Enter your username"
            />
            {getFieldError(errors, "username") && (
              <p className="text-sm text-red-600">{getFieldError(errors, "username")}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              placeholder="Enter your password"
            />
            {getFieldError(errors, "password") && (
              <p className="text-sm text-red-600">{getFieldError(errors, "password")}</p>
            )}
          </div>

          {getFieldError(errors, "general") && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-600">{getFieldError(errors, "general")}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>For demo purposes, you can use any username/password combination.</p>
          <p className="mt-1">The app will create a session for testing.</p>
        </div>
      </CardContent>
    </Card>
  );
}
