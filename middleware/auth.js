export default function ({ redirect }) {
  const allowedRoute = "/";
  const currentRoute = window.location.pathname;
  if (
    !localStorage.getItem("accessToken") &&
    !currentRoute.includes(allowedRoute)
  ) {
    return redirect("/login");
  }
}
