import { AnimeStats, MangaStats, User } from "../model/anilistModels";
import { ANILIST_API } from "../global/resources";
import { USER_GQL } from "../global/gql";

// query for Anilist user and map to model
export async function getUser(username: string): Promise<User> {
  const resp = await gqlRequest(USER_GQL, {username});
  if(resp === null) {
    return null;
  }
  const userData = resp['data']['User'];
  return {
    username: userData['name'],
    id: userData['id'],
    avatar: userData['avatar']['large'],
    anime: {...userData['statistics']['anime']} as AnimeStats,
    manga: {...userData['statistics']['manga']} as MangaStats,
  } as User;
}

// send request to Anilist API using GraphQL query and variables
async function gqlRequest(query: string, variables: object) {
  try{
    const resp = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query, variables}),
    });
    return await resp.json();
  } catch(e) {
    console.error(e);
    return null;
  }
}
