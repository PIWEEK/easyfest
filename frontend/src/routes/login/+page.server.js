import { redirect } from '@sveltejs/kit';
import { apiClient } from '../../services/api';

let data = {}

export async function load({ url, cookies }) {
  const loginToken = url.searchParams.get("loginToken");
  console.log("loginToken", loginToken);

  if (loginToken) {
      const res = await apiClient(
        "GET", "passwordless/login?loginToken=" + loginToken, {}, null
      )

      console.log("====result", res)
      if (res && res.jwt) {
        cookies.set("easyfest-auth", res.jwt, {path: "/"})
        redirect(302, "/me");
      }

  }
}