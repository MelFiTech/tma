// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { client } from '@/lib/sanity'

// Temporary fallback to avoid type conflicts
export const sanityFetch = client.fetch.bind(client)
export const SanityLive = () => null

// TODO: Re-enable when type conflicts are resolved
// import { defineLive } from "next-sanity";
// export const { sanityFetch, SanityLive } = defineLive({ 
//   client: client.withConfig({ 
//     // Live content is currently only available on the experimental API
//     // https://www.sanity.io/docs/api-versioning
//     apiVersion: 'vX' 
//   }) 
// });
