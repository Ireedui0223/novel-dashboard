export default function ({ app, redirect, store }) {
  const token = app.$apolloHelpers.getToken();
  if (!token) redirect("/login");
}
