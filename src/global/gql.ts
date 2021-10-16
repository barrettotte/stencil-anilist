// GraphQL queries

// Fetch Anilist user details
export const USER_GQL = `
  query($username:String!){
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
  }
`;
