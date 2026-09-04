import { redirect } from 'next/navigation';

// For dynamic deployments, the middleware will intercept requests to `/`
// and redirect to the default locale (e.g. `/pl`).
export default function RootPage() {
  redirect('/pl');
}