import { User } from "../model/anilistModels";

const userGql = `query($username:String!){
  User(search: $username){
    id
    name
    statistics{
      anime{
        count
        meanScore
        episodesWatched
        minutesWatched
      }
      manga{
        count
        meanScore
        chaptersRead
        volumesRead
      }
    }
    avatar{
      large
    }
  }
}`;//.replace(/\n/g, ' ');

// query for Anilist user and map to model
export async function getUser(username: string): Promise<User> {
  const data = await gqlRequest(userGql, {username});
  if(data === null) {
    return null;
  }
  console.log(data);

  const user = {} as User;

  return user;
}

// Request Anilist using GraphQL and variables
async function gqlRequest(query: string, variables: object) {
  try{
    const resp = await fetch('https://graphql.anilist.co', {
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
